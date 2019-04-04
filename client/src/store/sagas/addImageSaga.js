import { IMAGE } from "../constants";
import { loadUserImages, setError } from "../actions";
import { put, takeLatest, call } from "redux-saga/effects";
import { addImage } from "../../api";

export function* handleImageAdd({value}) {
  try {
    yield call(addImage, value);
    yield put(loadUserImages());
  } catch (error) {
    yield put(setError(error.toString()));
  }
}

export default function* watchedPostListLoad() {
  yield takeLatest(IMAGE.ADD, handleImageAdd);
}


