import { createSlice } from '@reduxjs/toolkit'
import {STATUS_TYPE} from "../types"
const initialState = {
  loading: STATUS_TYPE.IDLE,
  error: false
}

export const EditPostSlice = createSlice({
  name: 'editPost',
  initialState,
  reducers: {
    editPostStart: (state, action) => {
        state.loading = STATUS_TYPE.LOADING
    },
    editPostSuccess: (state, action) => {
        state.loading = STATUS_TYPE.SUCCESS
        state.error = false
    },
    editPostFailed: (state, action) => {
        state.loading = STATUS_TYPE.ERROR
        state.error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { editPostStart, editPostSuccess, editPostFailed } = EditPostSlice.actions

export default EditPostSlice.reducer