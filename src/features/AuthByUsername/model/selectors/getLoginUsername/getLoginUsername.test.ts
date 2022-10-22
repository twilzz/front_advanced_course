import { StateSchema } from 'app/providers/StoreProvider'
import { getLoginUsername } from './getLoginUsername'

describe('get Login Username', () => {
  test('Should return value', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: 'Admin',
      },
    }
    expect(getLoginUsername(state as StateSchema)).toEqual('Admin')
  })
  test('Should return empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLoginUsername(state as StateSchema)).toEqual('')
  })
})
