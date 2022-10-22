import { StateSchema } from 'app/providers/StoreProvider'
import { getLoginPassword } from './getLoginPassword'

describe('get Login Password', () => {
  test('Should return value', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: '123321',
      },
    }
    expect(getLoginPassword(state as StateSchema)).toEqual('123321')
  })
  test('Should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLoginPassword(state as StateSchema)).toEqual('')
  })
})
