import { onLoadComments, setError } from "../actions";
import { put, takeEvery, call } from "redux-saga/effects";
import { deleteComment } from "./../../api";
import { COMMENT } from "./../constants";

export function* handleCommentDelete({commentId, photoId}) {
  try {
    console.log("comments.DELETE handler called", commentId);
    const comments = yield call(deleteComment, commentId, photoId);
    console.log("commentsObj", comments)
    yield put(onLoadComments(photoId));
  } catch (error) {
    console.log(error)
    yield put(setError(error.toString()));
  }
}

export default function* watchedCommentslLoad() {
  console.log("watchedCommentsDelete")
  yield takeEvery(COMMENT.DELETE, handleCommentDelete);
}