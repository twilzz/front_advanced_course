import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from '../selectors/articlesPageSelectors'
import { articlePageActions } from '../slices/articlePageSlice'
import { fetchArticlesList } from './fetchArticlesList'

export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('articlePage/fetchNextArticlesPage', async (args, thunkApi) => {
  const { getState, dispatch } = thunkApi
  const hasMore = getArticlesPageHasMore(getState())
  const page = getArticlesPageNum(getState())
  const isLoading = getArticlesPageIsLoading(getState())

  if (hasMore && !isLoading) {
    dispatch(articlePageActions.setPage(page + 1))
    dispatch(fetchArticlesList({}))
  }
})
