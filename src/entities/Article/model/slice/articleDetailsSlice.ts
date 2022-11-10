import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchArticleByID } from '../services/fetchArticleByID/fetchArticleByID'
import { Article } from '../types/article'
import { ArticleDetailsSchema } from '../types/ArticleDetailsSchema'

const initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
}

const articleDetailsSlice = createSlice({
  name: 'articleDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleByID.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchArticleByID.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.isLoading = false
          state.data = action.payload
        }
      )
      .addCase(fetchArticleByID.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { actions: articleDetailsActions } = articleDetailsSlice
export const { reducer: articleDetailsReducer } = articleDetailsSlice
