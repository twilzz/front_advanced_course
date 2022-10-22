import { StateSchema } from 'app/providers/StoreProvider'
import { getLoginIsLoading } from './getLoginIsLoading'

describe('get Login Loading', () => {
  test('Should return true', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: true,
      },
    }
    expect(getLoginIsLoading(state as StateSchema)).toEqual(true)
  })
  test('Should return false', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLoginIsLoading(state as StateSchema)).toEqual(false)
  })
})
