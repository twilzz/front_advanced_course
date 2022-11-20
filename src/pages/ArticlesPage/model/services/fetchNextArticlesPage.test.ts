import axios from 'axios'
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk'
import { fetchArticlesList } from './fetchArticlesList'
import { fetchNextArticlesPage } from './fetchNextArticlesPage'

jest.mock('./fetchArticlesList')

const mockedAxios = jest.mocked(axios, true)

describe('fetchNextArticlesPage', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
      },
    })

    const result = await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(4)
    expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 })
  }),
    test('fetchArticlesList not called', async () => {
      const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
        articlesPage: {
          page: 2,
          ids: [],
          entities: {},
          limit: 5,
          isLoading: false,
          hasMore: false,
        },
      })

      const result = await thunk.callThunk()

      expect(thunk.dispatch).toBeCalledTimes(2)
      expect(fetchArticlesList).not.toHaveBeenCalled()
    })
})
