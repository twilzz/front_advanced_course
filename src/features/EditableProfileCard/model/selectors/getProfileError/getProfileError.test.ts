import { StateSchema } from 'app/providers/StoreProvider'
import { getProfileError } from './getProfileError'

describe('getProfileError', () => {
  test('Should return error', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: 'errooooor',
      },
    }
    expect(getProfileError(state as StateSchema)).toEqual('errooooor')
  })
  test('Should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileError(state as StateSchema)).toEqual(undefined)
  })
})
