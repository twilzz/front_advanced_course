import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Comment } from 'entities/Comment'
import { fetchArticleCommentsById } from '../services/fetchArticleCommentsById/fetchArticleCommentsById'
import { ArticleCommentsSchema } from '../types/ArticleCommentsSchema'

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleComments || commentsAdapter.getInitialState()
)

const articleCommentsSlice = createSlice({
  name: 'articleCommentsSlice',
  initialState: commentsAdapter.getInitialState<ArticleCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleCommentsById.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchArticleCommentsById.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.isLoading = false
          commentsAdapter.setAll(state, action.payload)
        }
      )
      .addCase(fetchArticleCommentsById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { reducer: articleCommentsReducer } = articleCommentsSlice
