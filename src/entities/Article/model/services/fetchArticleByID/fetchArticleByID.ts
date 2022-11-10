import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from '../../types/article'

export const fetchArticleByID = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>('profile/fetchProfileData', async (articleId, { extra, rejectWithValue }) => {
  try {
    const response = await extra.api.get<Article>(`/articles/${articleId}`)

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (error) {
    return rejectWithValue('Error')
  }
})
