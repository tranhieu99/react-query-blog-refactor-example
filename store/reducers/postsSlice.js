import { createSlice } from '@reduxjs/toolkit'
import {STATUS_TYPE} from "../types"
const initialState = {
  posts: null,
  loading: STATUS_TYPE.IDLE,
  error: false
}

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPostsStart: (state, action) => {
        state.loading = STATUS_TYPE.LOADING
    },
    getPostsSuccess: (state, action) => {
        state.loading = STATUS_TYPE.SUCCESS
        state.posts = action.payload
        state.error = false
    },
    getPostsFailed: (state, action) => {
        state.loading = STATUS_TYPE.ERROR
        state.error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getPostsStart, getPostsSuccess, getPostsFailed } = PostsSlice.actions

export default PostsSlice.reducer