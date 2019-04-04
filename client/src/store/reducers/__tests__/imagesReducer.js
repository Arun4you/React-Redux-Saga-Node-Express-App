import { setImages } from '../../actions';
import imagesReducer from '../imagesReducer';

describe('Images Reducer', () => {

    it('Should return default state', () => {
        const newState = imagesReducer(undefined, {});
        expect(newState).toEqual([]);
    });

    it('Should return new state if receiving type', () => {

        const images = [
            {
                caption: "am watinggggg !! #Yummy",
                created: "2019-03-20T18:17:37.212Z",
                created_at: "2019-04-03T16:19:29.858Z",
                display_src: "https://picsum.photos/400/400?image=127",
                likes: 25,
                username: "User1",
                __v: 0,
                _id: "5c9283c13bd4543164bd6507"
            },
            {
                caption: "am watinggggg !! #Yummy",
                created: "2019-03-20T18:17:37.212Z",
                created_at: "2019-04-03T16:19:29.858Z",
                display_src: "https://picsum.photos/400/400?image=127",
                likes: 25,
                username: "User2",
                __v: 0,
                _id: "5c9283c13bd4543164bd6508"
            }
        ]
        const newState = imagesReducer(undefined, setImages(images));
        expect(newState).toEqual(images);
    });

});