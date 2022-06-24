import { all, call, put, takeLatest } from "redux-saga/effects";
import { getPostsFailed, getPostsStart, getPostsSuccess } from "../reducers/postsSlice";
import axios from 'axios'
const  callPost = async () =>{
    const response = await axios.get('/api/posts').then((result) => result)
    return response?.data
}
function* getPostsStartWork() {
    try {
      const respone = yield call(callPost);
      yield put(
        {
            type: getPostsSuccess.type,
            payload: respone
        }
      )
    } catch (error) {
        yield put(
            {
                type: getPostsFailed.type,
                payload: error
            })
    }
  }
  
  function* wathPosts() {
    yield takeLatest(getPostsStart.type, getPostsStartWork);
  }


  export default function* postsSaga() {
    yield all([wathPosts()]);
  }