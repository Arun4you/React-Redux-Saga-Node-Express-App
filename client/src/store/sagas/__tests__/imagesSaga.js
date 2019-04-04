import { runSaga } from 'redux-saga'

import { handleImagesLoad } from './../imagesSaga'
import * as api from '../../../api'; // we'll mock the fetchImages api
import { setImages, setImagesError } from '../../actions';

test('should load and handle images in case of success', async () => {

    const dispatchedActions = [];
    const mockedImages = [{
        "_id": {
            "$oid": "5c9283c13bd4543164bd6507"
        },
        "caption": "am watinggggg !! #Yummy",
        "display_src": "https://picsum.photos/400/400?image=127",
        "username": "Arun",
        "created": {
            "$date": "2019-03-20T18:17:37.212Z"
        },
        "likes": 24,
        "__v": 0
    }];
    api.fetchImages = jest.fn(() => Promise.resolve(mockedImages));

    const fakeStore = {
        dispatch: action => dispatchedActions.push(action),
    };

    // wait for saga to complete
    await runSaga(fakeStore, handleImagesLoad).done;

    expect(api.fetchImages.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setImages(mockedImages));
});

test('should handle image load errors in case of failure', async () => {
    const dispatchedActions = [];
    const error = 'API server is down';
    api.fetchImages = jest.fn(() => Promise.reject(error));

    const fakeStore = {
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, handleImagesLoad).done;

    expect(api.fetchImages.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setImagesError(error));
});
