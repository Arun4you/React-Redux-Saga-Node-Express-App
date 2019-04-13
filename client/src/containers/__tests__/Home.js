import React from 'react'
import { Home } from './../Home'
import { shallow, mount } from "enzyme";
import { Image, AddImageForm, showResults } from './../../components'


describe(">>> <Home /> ", () => {

    let wrapper;
    const images = [{
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
    const loadUserImages = jest.fn(() => Promise.resolve(images))
    beforeEach(() => {

        const props = {
            images: [{
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
            }],
            incrementLikes: jest.fn(() => Promise.resolve()),
            submitComments: jest.fn(() => Promise.resolve()),
            addImage: jest.fn(() => Promise.resolve()),
            isLoading: { IMAGE: false },
            isError: { IMAGE: true }
        }
        wrapper = shallow(<Home {...props} loadUserImages={loadUserImages} classes={classes} />);
    });

    afterEach(() => {
        loadUserImages.mockReset(); // To clear the mock function call on each test
    });

    it("+++ SHOULD RENDER WITH PROPS", () => {
        expect(wrapper).toHaveLength(1)
    })

    it("+++ Should call loadUserImages() from props", () => {
        expect(loadUserImages.mock.calls.length).toBe(1)
    })

    it('+++ Should render two images', () => {
        expect(wrapper.find(Image).length).toBe(2)
    })

    it('+++ Should not render AddImageForm Component', () => {
        wrapper.setState({ addImage: false })
        expect(wrapper.find(AddImageForm).length).toBe(0)
    })

    it('+++ Should render AddImageForm Component', () => {
        wrapper.setState({ addImage: true })
        expect(wrapper.find(AddImageForm).length).toBe(1)
    })

    it("+++ Add image button handleclick ", () => {        
        const addButton = wrapper.find(`[data-test='addImage']`); 
        expect(wrapper.state().addImage).toEqual(false);
        addButton
            .simulate('click')
        expect(wrapper.state().addImage).toEqual(true);
    })
})