import { loadComments, setError } from "../actions";
import { put, takeEvery, call } from "redux-saga/effects";
import { addComment } from "./../../api";
import { COMMENT } from "./../constants";

export function* handleCommentsLoad({id, comment}) {
  try {
    const comments = yield call(addComment, id, comment);
    yield put(loadComments(comments));
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

export default function* watchedCommentslLoad() {
  yield takeEvery(COMMENT.SUBMIT, handleCommentsLoad);
}