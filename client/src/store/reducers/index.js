import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from 'redux-form';
import imagesReducer from './imagesReducer'
import imageReducer from './imageReducer'
import commentsReducer from './commentsReducer'
import errorReducer from './errorReducer'
import loadingReducer from './loadingReducer'

const rootReducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  images: imagesReducer,
  image: imageReducer,
  comments: commentsReducer,
  isError: errorReducer,
  isLoading:loadingReducer
});

export default rootReducer;