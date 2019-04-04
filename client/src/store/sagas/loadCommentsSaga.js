import { loadComments, setError } from "../actions";
import { put, takeEvery, call } from "redux-saga/effects";
import { loadComment } from "./../../api";
import { COMMENT } from "./../constants";

export function* handleCommentLoad({id}) {
  try {
    console.log("comments.SUBMIT handler called", id);
    const comments = yield call(loadComment, id);
    console.log("commentsObj", comments)
    yield put(loadComments(comments));
  } catch (error) {
    console.log(error)
    yield put(setError(error.toString()));
  }
}

export default function* watchedCommentslLoad() {
  console.log("watchedCommentslLoad")
  yield takeEvery(COMMENT.LOAD, handleCommentLoad);
}