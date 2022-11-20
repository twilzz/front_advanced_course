import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails'
import { Comment } from 'entities/Comment'
import { getUserAuthData } from 'entities/User'
import { fetchArticleCommentsById } from '../fetchArticleCommentsById/fetchArticleCommentsById'

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>(
  'articleDetails/AddCommentForArticle',
  async (text, { dispatch, extra, rejectWithValue, getState }) => {
    const userData = getUserAuthData(getState())
    const article = getArticleDetailsData(getState())

    if (!userData || !text || !article) {
      return rejectWithValue('Error in UserData || text || articleId')
    }

    try {
      const response = await extra.api.post<Comment>('/comments', {
        articleId: article.id,
        userId: userData.id,
        text,
      })

      if (!response.data) {
        throw new Error()
      }

      dispatch(fetchArticleCommentsById(article.id))

      return response.data
    } catch (error) {
      return rejectWithValue('Неверный логин или пароль')
    }
  }
)
