import { StateSchema } from 'app/providers/StoreProvider'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from './articleDetails'

describe('ArticleDetailsSelectors', () => {
  test('Should return data', () => {
    const data = {
      id: '1',
      title: 'title',
    }
    const state: DeepPartial<StateSchema> = {
      articleDetails: { data },
    }
    expect(getArticleDetailsData(state as StateSchema)).toEqual(data)
  })

  test('Should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: { isLoading: true },
    }
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true)
  })
  test('Should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: { error: 'sdfsdf' },
    }
    expect(getArticleDetailsError(state as StateSchema)).toEqual('sdfsdf')
  })
})
