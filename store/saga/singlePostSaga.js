import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from 'axios'
import { getSinglePostFailed, getSinglePostStart, getSinglePostSuccess } from "../reducers/singlePostSlice";
const  callPost = async (postId) =>{
    const response = await axios.get(`/api/posts/${postId}`).then((res) => res.data)
    return response
}
function* getPostsStartWork(action) {
   const postId = action.payload 
   
    try {
      const respone = yield call(callPost, postId);
      
      yield put(
        {
            type: getSinglePostSuccess.type,
            payload: respone
        }
      )
    } catch (error) {
        yield put(
            {
                type: getSinglePostFailed.type,
                payload: error
            })
    }
  }
  
  function* wathPosts() {
    yield takeLatest(getSinglePostStart.type, getPostsStartWork);
  }


  export default function* postsSaga() {
    yield all([wathPosts()]);
  }