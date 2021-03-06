import { setImageDetail, setImages, setImagesError, setImageDetailError } from "../actions";
import { put, takeEvery, call } from "redux-saga/effects";
import { addLikes, fetchImageDetail, fetchImages } from "./../../api";
import { IMAGEDETAIL } from "./../constants";

export function* handleLikes({ id, page }) {
  try {
    console.log("id", id, "page", page)
    yield call(addLikes, id, page);
    switch (page) {
      case 'IMAGES':
        let images = yield call(fetchImages);
        yield put(setImages(images));
      case 'IMAGEDETAIL':
        console.log("id", id, "page", page)
        const image = yield call(fetchImageDetail, id);
        yield put(setImageDetail(image));
      default:
        return "NO mATCH"
    }
  } catch (error) {
    console.log(error)
    yield put(setImagesError(error.toString()))
    yield put(setImageDetailError(error.toString()))
  }
}

export default function* watchedLikes() {
  console.log("watchedCommentslLoad")
  yield takeEvery(IMAGEDETAIL.INC, handleLikes);
}