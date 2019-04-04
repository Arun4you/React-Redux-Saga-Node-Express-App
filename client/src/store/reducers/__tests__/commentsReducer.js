import { loadComments } from '../../actions';
import commentsReducer from '../commentsReducer';

describe('Image Reducer', () => {
    it('Should return default state', () => {
        const newState = commentsReducer(undefined, {});
        expect(newState).toEqual({});
    });
    it('Should return new state if receiving type', () => {
        const mockCommentResponse = {
            comments: [
                {
                    comment: "comment from user2",
                    created: "2019-03-28T15:03:07.605Z",
                    username: "user1",
                    _id: "5c9ce22be0b347189c6113b8"
                },
                {
                    comment: "comment from user2",
                    created: "2019-03-28T15:03:07.605Z",
                    username: "user1",
                    _id: "5c9ce22be0b347189c6113b8"
                }
            ],
            photo: "5c92840d3bd4543164bd6509",
            __v: 0,
            _id: "5c92840d3bd4543164bd650a"
        }

        const newState = commentsReducer(undefined, loadComments(mockCommentResponse));
        expect(newState).toEqual(mockCommentResponse);
    });
});