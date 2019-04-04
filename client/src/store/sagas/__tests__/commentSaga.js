import { runSaga } from 'redux-saga'
import { handleCommentsLoad } from './../commentSaga'
import * as api from '../../../api'; // we'll mock the fetchImages api
import { loadComments } from '../../actions';

test('should load and handle image detail in case of success', async () => {

    const dispatchedActions = [];
    const mockObj = {
        id: "1",
        comment: {
            username: "Arun",
            comment: "comment from Arun"
        }
    }

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

    api.addComment = jest.fn(() => Promise.resolve(mockCommentResponse));

    const fakeStore = {
        dispatch: action => dispatchedActions.push(action),
    };

    // wait for saga to complete
    await runSaga(fakeStore, handleCommentsLoad, mockObj).done;

    expect(api.addComment.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(loadComments(mockCommentResponse));
});

