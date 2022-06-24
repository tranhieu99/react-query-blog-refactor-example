import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from 'axios'
import { createPostFailed, createPostStart, createPostSuccess } from "../reducers/createPostSlice";
import { getPostsStart } from "../reducers/postsSlice";
const  createPostApi = async (values) =>{
    const response = await axios.post('/api/posts', values)
    return response?.data
}
function* createPostStartWork(action) {
  const values = action.payload
    try {
      const respone = yield call(createPostApi, values);
      if(respone){
      yield put(
        {
            type: createPostSuccess.type,
        }
      )
      yield put(
        {
            type: getPostsStart.type,
        })
    }
      
    } catch (error) {
        yield put(
            {
                type: createPostFailed.type,
                payload: error
            })
    }
  }
  
  function* wathCreatePost() {
    yield takeLatest(createPostStart.type, createPostStartWork);
  }


  export default function* postsSaga() {
    yield all([wathCreatePost()]);
  }