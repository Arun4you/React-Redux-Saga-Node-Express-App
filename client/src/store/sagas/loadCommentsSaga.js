import { loadComments, setError } from "../actions";
import { put, takeEvery, call } from "redux-saga/effects";
import { loadComment } from "./../../api";
import { COMMENT } from "./../constants";

export function* handleCommentLoad({id}) {
  try {
    const comments = yield call(loadComment, id);
    yield put(loadComments(comments));
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

export default function* watchedCommentslLoad() {
  yield takeEvery(COMMENT.LOAD, handleCommentLoad);
}