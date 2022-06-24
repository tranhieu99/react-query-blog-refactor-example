import { combineReducers } from "@reduxjs/toolkit";
import posts from "./reducers/postsSlice"
import createPost from "./reducers/createPostSlice"
import singlePost from "./reducers/singlePostSlice"
import editPost from "./reducers/editPostSlice"

export default combineReducers({
    posts:posts,
    createPost: createPost,
    singlePost: singlePost,
    editPost: editPost
})