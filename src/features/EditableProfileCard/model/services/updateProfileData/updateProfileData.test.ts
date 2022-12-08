import axios from 'axios'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk'
import { ValidateProfileError } from '../../types/editableProfileCardSchema'
import { updateProfileData } from './updateProfileData'

jest.mock('axios')

const mockedAxios = jest.mocked(axios, true)

const data = {
  username: 'admin',
  age: 24,
  country: Country.Armenia,
  name: 'Alexey',
  lastname: 'Nevagno',
  currency: Currency.RUB,
  city: 'Spb',
  id: '1',
}

describe('validateProfileData', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data },
    })
    thunk.api.put.mockReturnValue(Promise.resolve({ data }))

    const result = await thunk.callThunk()

    expect(thunk.api.put).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(data)
  })
  test('unsuccess', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data },
    })

    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }))

    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR])
  })
  test('validate error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: { ...data, lastname: '' } },
    })

    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR])
  })
})
