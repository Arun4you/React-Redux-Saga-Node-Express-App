import { IMAGEDETAIL } from './../constants'

const imageReducer = (state = {}, action) => {
    switch (action.type) {
        case IMAGEDETAIL.SUCCESS:
            return {...state, ...action.image}
        default:
            return state;
    }
};
export default imageReducer;
