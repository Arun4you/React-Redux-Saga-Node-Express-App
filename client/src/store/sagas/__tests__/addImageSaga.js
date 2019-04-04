import { runSaga } from 'redux-saga'

import { handleImageAdd } from './../addImageSaga'
import * as api from '../../../api'; // we'll mock the fetchImages api
import { loadUserImages, setImagesError } from '../../actions';

test('should load and handle images in case of success', async () => {

    const dispatchedActions = [];
    const likeObj = {
        value: {
            caption: "#youth land",
            display_src: "https://picsum.photos/400/400?image=330",
            username: "xux"
        }
    }
    const mockedImages = [
        {
            caption: "am watinggggg !! #Yummy",
            created: "2019-03-20T18:17:37.212Z",
            created_at: "2019-04-03T15:27:59.722Z",
            display_src: "https://picsum.photos/400/400?image=127",
            likes: 25,
            username: "Arun",
            __v: 0,
            _id: "5c9283c13bd4543164bd6507"
        },
        {
            caption: "am watinggggg !! #Yummy",
            created: "2019-03-20T18:17:37.212Z",
            created_at: "2019-04-03T15:27:59.722Z",
            display_src: "https://picsum.photos/400/400?image=127",
            likes: 25,
            username: "ccc",
            __v: 0,
            _id: "5c9283c13bd4543164bd6507"
        }
    ]
    api.addImage = jest.fn(() => Promise.resolve(mockedImages));

    const fakeStore = {
        dispatch: action => dispatchedActions.push(action),
    };

    // wait for saga to complete
    await runSaga(fakeStore, handleImageAdd, likeObj).done;

    expect(api.addImage.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(loadUserImages());
});
