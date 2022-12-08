import { StateSchema } from 'app/providers/StoreProvider'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { getProfileData } from './getProfileData'

describe('getProfileData', () => {
  test('Should return error', () => {
    const data = {
      username: 'admin',
      age: 24,
      country: Country.Armenia,
      name: 'Alexey',
      lastname: 'Nevagno',
      currency: Currency.RUB,
      city: 'Spb',
    }
    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    }
    expect(getProfileData(state as StateSchema)).toEqual(data)
  })
  test('Should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileData(state as StateSchema)).toEqual(undefined)
  })
})
