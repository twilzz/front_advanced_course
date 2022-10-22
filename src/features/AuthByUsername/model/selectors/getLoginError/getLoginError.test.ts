import { StateSchema } from 'app/providers/StoreProvider'
import { getLoginError } from './getLoginError'

describe('get Login Error', () => {
  test('Should return error', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        error: 'error',
      },
    }
    expect(getLoginError(state as StateSchema)).toEqual('error')
  })
  test('Should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLoginError(state as StateSchema)).toEqual(undefined)
  })
})
