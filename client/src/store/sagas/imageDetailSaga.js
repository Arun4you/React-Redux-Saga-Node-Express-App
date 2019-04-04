import { setImageDetail, setImageDetailError } from "../actions";
import { put, takeLatest, call } from "redux-saga/effects";
import { fetchImageDetail } from "./../../api";
import { IMAGEDETAIL } from "./../constants";

export function* handleImageLoad({id}) {
  try {
    const image = yield call(fetchImageDetail, id);
    yield put(setImageDetail(image));
  } catch (error) { 
    yield put(setImageDetailError(error.toString()));
  }
}

export default function* watchedImageDetailLoad() {
  yield takeLatest(IMAGEDETAIL.LOAD, handleImageLoad);
}