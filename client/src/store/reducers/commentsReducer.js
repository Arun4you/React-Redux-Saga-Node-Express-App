import { COMMENT } from './../constants'

const commentsReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMENT.SUCCESS:
            console.log('IMAGES_SUCCESS', {...state, ...action.comments});
            return {...state, ...action.comments}
        default:
            return state;
    }
};
export default commentsReducer;
