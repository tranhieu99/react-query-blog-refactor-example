import { createSlice } from '@reduxjs/toolkit'
import {STATUS_TYPE} from "../types"
const initialState = {
  post: null,
  loading: STATUS_TYPE.IDLE,
  error: false
}

export const SinglePostSlice = createSlice({
  name: 'singlePost',
  initialState,
  reducers: {
    getSinglePostStart: (state, action) => {
        state.loading = STATUS_TYPE.LOADING
    },
    getSinglePostSuccess: (state, action) => {
        state.loading = STATUS_TYPE.SUCCESS
        state.post = action.payload
        state.error = false
    },
    getSinglePostFailed: (state, action) => {
        state.loading = STATUS_TYPE.ERROR
        state.error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getSinglePostStart, getSinglePostSuccess, getSinglePostFailed } = SinglePostSlice.actions

export default SinglePostSlice.reducer