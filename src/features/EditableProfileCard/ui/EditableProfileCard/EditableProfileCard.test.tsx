import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { Profile } from 'entities/Profile'
import { profileReducer } from 'features/EditableProfileCard/model/slice/profileSlice'
import { $api } from 'shared/api/api'
import { componentRender } from 'shared/config/tests/componentRender/componentRender'

import { EditableProfileCard } from './EditableProfileCard'

const profile: Profile = {
  id: '2',
  name: 'Alexey',
  lastname: 'Sladkov',
  age: 36,
  currency: Currency.USD,
  country: Country.Russia,
  city: 'Saint-Petersburg',
  username: 'twils',
  avatar: 'https://coolsen.ru/wp-content/uploads/2021/06/74-8.jpg',
}

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: {
        id: '2',
        username: 'twils',
      },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
}

describe('EditableProfileCard', () => {
  test('switch readonly', async () => {
    componentRender(<EditableProfileCard id={'2'} />, options)
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    )
    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelButton')
    ).toBeInTheDocument()
  })

  test('values return to defaults', async () => {
    componentRender(<EditableProfileCard id={'2'} />, options)
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    )
    await userEvent.clear(screen.getByTestId('ProfileCard.name'))
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

    await userEvent.type(screen.getByTestId('ProfileCard.name'), 'user')
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')

    expect(screen.getByTestId('ProfileCard.name')).toHaveValue('user')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.CancelButton')
    )

    expect(screen.getByTestId('ProfileCard.name')).toHaveValue('Alexey')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('Sladkov')
  })

  test('Test validation', async () => {
    componentRender(<EditableProfileCard id={'2'} />, options)
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    )
    await userEvent.clear(screen.getByTestId('ProfileCard.name'))

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton')
    )
    expect(
      screen.getByTestId('EditableProfileCard.Error.Paragraph')
    ).toBeInTheDocument()
  })

  test('If there is not error we should see PUT query', async () => {
    const mockPutQuery = jest.spyOn($api, 'put')
    componentRender(<EditableProfileCard id={'2'} />, options)
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    )
    await userEvent.type(screen.getByTestId('ProfileCard.name'), 'Alexey')

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton')
    )
    expect(mockPutQuery).toHaveBeenCalled()
  })
})
