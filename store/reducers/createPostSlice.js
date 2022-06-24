import { createSlice } from '@reduxjs/toolkit'
import {STATUS_TYPE} from "../types"
const initialState = {
  loading: STATUS_TYPE.IDLE,
  error: false
}

export const CreateSlice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    createPostStart: (state, action) => {
        state.loading = STATUS_TYPE.LOADING
    },
    createPostSuccess: (state, action) => {
        state.loading = STATUS_TYPE.SUCCESS
        state.error = false
    },
    createPostFailed: (state, action) => {
        state.loading = STATUS_TYPE.ERROR
        state.error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { createPostStart, createPostSuccess, createPostFailed } = CreateSlice.actions

export default CreateSlice.reducer