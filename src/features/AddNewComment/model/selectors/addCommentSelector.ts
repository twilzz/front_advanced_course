import { StateSchema } from 'app/providers/StoreProvider'

export const getAddCommentText = (state: StateSchema) =>
  state.addNewComment?.text ?? ''
export const getAddCommentError = (state: StateSchema) =>
  state.addNewComment?.error
