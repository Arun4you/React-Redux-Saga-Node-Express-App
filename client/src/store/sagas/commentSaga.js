import { loadComments, setError } from "../actions";
import { put, takeEvery, call } from "redux-saga/effects";
import { addComment } from "./../../api";
import { COMMENT } from "./../constants";

export function* handleCommentsLoad({id, comment}) {
  try {
    const comments = yield call(addComment, id, comment);
    console.log("commentsObj", comments)
    yield put(loadComments(comments));
  } catch (error) {
    console.log(error)
    yield put(setError(error.toString()));
  }
}

export default function* watchedCommentslLoad() {
  console.log("watchedCommentslLoad")
  yield takeEvery(COMMENT.SUBMIT, handleCommentsLoad);
}