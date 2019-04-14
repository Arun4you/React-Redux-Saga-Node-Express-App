import { setImageDetail, setImages, setImagesError, setImageDetailError } from "../actions";
import { put, takeEvery, call } from "redux-saga/effects";
import { addLikes, fetchImageDetail, fetchImages } from "./../../api";
import { IMAGEDETAIL } from "./../constants";

export function* handleLikes({ id, page }) {
  try {
    yield call(addLikes, id, page);
    switch (page) {
      case 'IMAGES':
        let images = yield call(fetchImages);
        yield put(setImages(images));
      case 'IMAGEDETAIL':
        const image = yield call(fetchImageDetail, id);
        yield put(setImageDetail(image));
      default:
        return "NO mATCH"
    }
  } catch (error) {
    yield put(setImagesError(error.toString()))
    yield put(setImageDetailError(error.toString()))
  }
}

export default function* watchedLikes() {
  yield takeEvery(IMAGEDETAIL.INC, handleLikes);
}