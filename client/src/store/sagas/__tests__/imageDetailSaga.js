import { runSaga } from 'redux-saga'
import { handleImageLoad } from './../imageDetailSaga'
import * as api from '../../../api'; // we'll mock the fetchImages api
import { setImageDetail, setImageDetailError } from '../../actions';

test('should load and handle image detail in case of success', async () => {

    const dispatchedActions = [];
    const mockedImages = {
        "_id": {
            "$oid": "5c9118d6fb6fc0465d48efb2"
        },
        "code": "BAcyDyQwcXX",
        "caption": "Lunch #hamont",
        "likes": 56,
        "display_src": "https://picsum.photos/400/400/?image=100",
        "_id": {
            "$oid": "5c9dc9249af3f6163fa56116"
        },
        "photo": {
            "$oid": "5c92840d3bd4543164bd650a"
        },
        "__v": 0,
        "comments": [
            {
                "_id": {
                    "$oid": "5c9dc9242f0e233780a8ea41"
                },
                "created": {
                    "$date": "2019-03-29T07:28:36.442Z"
                }
            },
            {
                "_id": {
                    "$oid": "5c9dc92c2f0e233780a8ea42"
                },
                "created": {
                    "$date": "2019-03-29T07:28:44.197Z"
                }
            }
        ]
    }
    const mockObj = {
        id: "1",
    }
    api.fetchImageDetail = jest.fn(() => Promise.resolve(mockedImages));

    const fakeStore = {
        dispatch: action => dispatchedActions.push(action),
    };

    // wait for saga to complete
    await runSaga(fakeStore, handleImageLoad, mockObj).done;

    expect(api.fetchImageDetail.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setImageDetail(mockedImages));
});

test('should handle image detail load errors in case of failure', async () => {
    const dispatchedActions = [];
    const error = 'API server is down';
    const mockObj = {
        id: "1",
    }
    api.fetchImageDetail = jest.fn(() => Promise.reject(error));

    const fakeStore = {
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, handleImageLoad, mockObj).done;

    expect(api.fetchImageDetail.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setImageDetailError(error));
});
