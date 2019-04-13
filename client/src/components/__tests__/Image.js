
import React from "react";
import Image from "./../Image";
import Button from '@material-ui/core/Button';
import { findByTestAtrr, findByAttr } from './../../../utils'
import { shallow, mount } from "enzyme";

describe(">>> <Image /> - SHOULD RENDER", () => {

    let wrapper;
    beforeEach(() => {
        const props = {
            image: {
                caption: "am watinggggg !! #Yummy",
                created: "2019-03-20T18:17:37.212Z",
                created_at: "2019-04-03T15:27:59.722Z",
                display_src: "https://picsum.photos/400/400?image=127",
                likes: 25,
                username: "Arun",
                __v: 0,
                _id: "5c9283c13bd4543164bd6507"
            },
            handleLikes: jest.fn(() => Promise.resolve())
        };
        wrapper = shallow(<Image {...props} />);
    });

    it("+++ SHOULD RENDER WITH PROPS", () => {
        expect(wrapper).toHaveLength(1)
    })

    // const component = findByTestAtrr(wrapper, Button);        
    // console.log(wrapper.instance().props)
    // expect(wrapper.find('Button')).toBe(1);
    // button.first().props().click()
    // console.log(button.first().props().handleLikes.calls.length)
    // expect(handleLikes.mock.calls.length).toBe(1);
})

describe(">>> <Image /> -  Testing Functionality ", () => {
    let wrapper
    const handleLikes = jest.fn()
    beforeEach(() => {
        const props = {
            image: {
                caption: "am watinggggg !! #Yummy",
                created: "2019-03-20T18:17:37.212Z",
                created_at: "2019-04-03T15:27:59.722Z",
                display_src: "https://picsum.photos/400/400?image=127",
                likes: 25,
                username: "Arun",
                __v: 0,
                _id: "5c9283c13bd4543164bd6507"
            },
            redirectTo: jest.fn(() => Promise.resolve()),
        };
        //Mount is used just to find Button Component inside Image Component
        wrapper = mount(<Image {...props} handleLikes={handleLikes} />);
    });

    it("--- SHOULD MATCH SNAPSHOT", () => {
        expect(wrapper).toMatchSnapshot();
    })

    it("+++ find two buttons ", () => {
        const button = wrapper.find(Button)
        // const button = findByTestAtrr(wrapper, 'favouriteButtonComponent')
        expect(button.length).toBe(2);
    })

    it("+++ click like buttons ", () => {        
        const button = wrapper.find(Button)
        button
            .first()
            .simulate('click')
        expect(handleLikes).toHaveBeenCalled();
    })
});

describe(">>> <Image /> - SHOULD NOT RENDER", () => {
    let wrapper
    beforeEach(() => {
        const props = {
            image: {
                caption: "am watinggggg !! #Yummy",
                created: "2019-03-20T18:17:37.212Z",
                created_at: "2019-04-03T15:27:59.722Z",
                likes: 25,
                username: "Arun",
                __v: 0,
                _id: "5c9283c13bd4543164bd6507"
            },
            handleLikes: jest.fn(() => Promise.resolve()),
            redirectTo: jest.fn(() => Promise.resolve())
        };
        wrapper = mount(<Image {...props} />);
    });

    it("--- props without image url", () => {
        const button = wrapper.find(Button)
        expect(button.length).toBe(0);
    })
})