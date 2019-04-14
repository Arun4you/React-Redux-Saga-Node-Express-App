import React from 'react'
import configureStore from './../../store';
import * as api from '../../../src/api'; // we'll mock the fetchImages api
import { loadUserImages, incrementLikes, submitComments, addImage } from './../../store/actions'
import { shallow, mount } from "enzyme";
import { Home } from './../../containers/Home'
import { Provider } from 'react-redux';
import { IMAGES, IMAGEDETAIL, COMMENT, IMAGE } from './../../store/constants'

// const setUp = (initialState = {}) => {
//     const store = testStore(initialState);
//     const wrapper = shallow(<App store={store} />).childAt(0).dive();
//     return wrapper;
// };

describe(">>> <Home /> ", () => {

    const mockedImages = [{
        caption: "am watinggggg !! #Yummy",
        created: "2019-03-20T18:17:37.212Z",
        created_at: "2019-04-03T15:27:59.722Z",
        display_src: "https://picsum.photos/400/400?image=127",
        likes: 25,
        username: "Arun",
        __v: 0,
        _id: "5c9283c13bd4543164bd6507"
    }, {
        caption: "am watinggggg !! #Yummy",
        created: "2019-03-20T18:17:37.212Z",
        created_at: "2019-04-03T15:27:59.722Z",
        display_src: "https://picsum.photos/400/400?image=127",
        likes: 25,
        username: "Arun",
        __v: 0,
        _id: "5c9283c13bd4543164bd6508"
    }]

    const classes = {
        fab: {
            margin: "auto",
        },
        root: {
            flexGrow: 1,
        },
        form: {
            padding: 15
        }
    }
    const isLoading = {
        IMAGES: []
    }
    const isError = {
        IMAGES: []
    }
    const initialState = {
        isLoading: {
            IMAGES: []
        },
        isError: {
            IMAGES: []
        }
    }
    const store = configureStore();
    let wrapper
    beforeEach(() => {
        const wrapper = shallow(
            <Provider store={store}>
                <Home params={{ query: 'somequery' }} loadUserImages={loadUserImages} classes={classes} />);
            </Provider>
        )
    });

    afterEach(() => {
        api.fetchImages.mockReset(); // To clear the mock function call on each test
    });

    it('Store is updated correctly', (done) => {
        api.fetchImages = jest.fn(() => Promise.resolve(mockedImages));

        store.dispatch(loadUserImages())
        //then
        setTimeout(() => {
            const newState = store.getState();
            expect(newState.images).toEqual(mockedImages);
            done();
        }, 10);
    });
});