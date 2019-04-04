import { runSaga } from 'redux-saga'
import { handleLikes } from './../likesSaga'
import * as api from '../../../api'; // we'll mock the fetchImages api
import { setImageDetail, setImageDetailError, setImagesError } from '../../actions';

test('should load and handle image detail in case of success', async () => {

    const dispatchedActions = [];
    const mockedImages = {
        "_id": {
            "$oid": "5c9118d6fb6fc0465d48efb2"
        },
        "code": "BAcyDyQwcXX",
        "caption": "Lunch #hamont",
        "likes": 56        
    }
    const mockObj = {
        id:"1",
        page:"IMAGEDETAIL"
    }

    api.addLikes = jest.fn(() => Promise.resolve(mockedImages));
    api.fetchImageDetail = jest.fn(() => Promise.resolve(mockedImages));

    const fakeStore = {
        dispatch: action => dispatchedActions.push(action),
    };

    // wait for saga to complete
    await runSaga(fakeStore, handleLikes, mockObj).done; 

    expect(api.addLikes.mock.calls.length).toBe(1);
    expect(api.fetchImageDetail.mock.calls.length).toBe(1);

    // expect(dispatchedActions).toContainEqual(setImageDetail([]));
});

test('should handle image detail load errors in case of failure', async () => {
    const dispatchedActions = [];

    const error = 'API server is down';
    const id = "1"
    const page = "IMAGEDETAIL"
    api.addLikes = jest.fn(() => Promise.reject("error"));
    api.fetchImageDetail = jest.fn(() => Promise.reject("error"));

    const fakeStore = {
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, handleLikes, id, page).done;

    expect(api.addLikes.mock.calls.length).toBe(1);
    expect(api.fetchImageDetail.mock.calls.length).toBe(0);
    
    // expect(dispatchedActions).toContainEqual(setImagesError("error"), setImageDetailError("error"));
});