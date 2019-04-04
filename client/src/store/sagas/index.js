import { all } from "redux-saga/effects";
import imagesSaga from "./imagesSaga";
import imagesDetailSaga from "./imageDetailSaga";
import commentSaga from "./commentSaga";
import loadCommentsSaga from './loadCommentsSaga'
import deleteCommentsSaga from './deleteCommentSaga'
import likesSaga from './likesSaga'
import addImageSaga from './addImageSaga'


export default function* rootSaga() {
  console.log("saga called")
  yield all([
    imagesSaga(), 
    imagesDetailSaga(), 
    commentSaga(), 
    loadCommentsSaga(), 
    deleteCommentsSaga(), 
    likesSaga(),
    addImageSaga()]);
}