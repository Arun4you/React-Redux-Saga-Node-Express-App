import { IMAGES } from "./../constants";
import { setImages, setImagesError } from "../actions";
import { put, takeLatest, call } from "redux-saga/effects";
import { fetchImages } from "./../../api";

export function* handleImagesLoad() {
  try {
    let images = yield call(fetchImages);
    yield put(setImages(images));
  } catch (error) {
    yield put(setImagesError(error.toString()))
  }
}

export default function* watchedPostListLoad() {
  yield takeLatest(IMAGES.LOAD, handleImagesLoad);
}
