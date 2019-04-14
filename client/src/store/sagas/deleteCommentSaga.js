import { onLoadComments, setError } from "../actions";
import { put, takeEvery, call } from "redux-saga/effects";
import { deleteComment } from "./../../api";
import { COMMENT } from "./../constants";

export function* handleCommentDelete({commentId, photoId}) {
  try {
    const comments = yield call(deleteComment, commentId, photoId);
    yield put(onLoadComments(photoId));
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

export default function* watchedCommentslLoad() {
  yield takeEvery(COMMENT.DELETE, handleCommentDelete);
}