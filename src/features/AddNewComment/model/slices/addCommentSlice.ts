import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AddNewCommentSchema } from '../types/addComment'

const initialState: AddNewCommentSchema = {
  text: '',
  error: undefined,
}

const addCommentSlice = createSlice({
  name: 'addComment',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchProfileData.pending, (state) => {
    //     state.error = undefined
    //     state.isLoading = true
    //   })
    //   .addCase(
    //     fetchProfileData.fulfilled,
    //     (state, action: PayloadAction<Profile>) => {
    //       state.isLoading = false
    //       state.data = action.payload
    //       state.form = action.payload
    //     }
    //   )
    //   .addCase(fetchProfileData.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.error = action.payload
    //   })
    //   .addCase(updateProfileData.pending, (state) => {
    //     state.error = undefined
    //     state.isLoading = true
    //   })
  },
})

export const { actions: addCommentActions } = addCommentSlice
export const { reducer: addCommentReducer } = addCommentSlice
