import { all } from "redux-saga/effects";
import postsSaga from "./saga/postsSaga"
import createPostSaga from "./saga/createPostSaga"
import singlePostSaga from "./saga/singlePostSaga"
import editPostSaga from "./saga/editPostSaga"
export default function* rootSaga() {
    yield all([
      postsSaga(),
      createPostSaga(),
      singlePostSaga(),
      editPostSaga()
    ]);
  }
  