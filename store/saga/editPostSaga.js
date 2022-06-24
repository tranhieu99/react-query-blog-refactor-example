import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from 'axios'
import { getSinglePostStart } from "../reducers/singlePostSlice";
import { editPostStart, editPostSuccess } from "../reducers/editPostSlice";

const  editPostApi = async (values) =>{
    const response = await  axios.patch(`/api/posts/${values.id}`, values)
    return response
}
function* editPostsStartWork(action) {
    const values = action.payload
    try {
      const respone = yield call(editPostApi, values);
      console.log(respone, values)
      if(respone){
      yield put(
        {
            type: editPostSuccess.type,
        }
      )
      yield put(
        {
            type: getSinglePostStart.type,
            payload: values.id
        })
    }
      
    } catch (error) {
        yield put(
            {
                type: editPostStart.type,
                payload: error
            })
    }
  }
  
  function* wathPosts() {
    yield takeLatest(editPostStart.type, editPostsStartWork);
  } 


  export default function* postsSaga() {
    yield all([wathPosts()]);
  }