import React from 'react'
import { shallow, mount } from "enzyme";
import { shallowToJson, mountToJson } from 'enzyme-to-json'
import List from "@material-ui/core/List";
import CommentFields from './../CommentFields'
import TextField from '@material-ui/core/TextField';

describe('<CommentFields />', () => {

    let wrapper
    beforeEach(() => {
        const props = {
            username: "Arun",
            comment: "Hello comment",
            handleChange: jest.fn(),
            onCommentSubmit: jest.fn()
        }
        wrapper = mount(<CommentFields {...props} />)
    })

    it('should be defined', () => {
        expect(wrapper).toBeDefined();
    })

    it('should shallow toMatchSnapshot', () => {
        expect(mountToJson(wrapper)).toMatchSnapshot();
    })

    it('count two testFields', () => {
        expect(wrapper.find(TextField).length).toBe(2)
    })

    it('Should capture firstname from props', function () {
        const input = wrapper.find(TextField).at(0);
        expect(input.props().value).toEqual('Arun');
    })

    it('Should capture username onChange', function () {
        const input = wrapper.find(TextField).at(0);
        const expectedArg = {
            username: 'new username'
        }
        input.props().onChange(expectedArg)
        expect(wrapper.props().handleChange).toHaveBeenCalled();
        expect(wrapper.props().handleChange).toHaveBeenCalledWith(expectedArg);
    })

    it('Should capture comment from props', function () {
        const input = wrapper.find(TextField).at(1);
        expect(input.props().value).toEqual('Hello comment');
    })

    it('Should capture comment onChange', function () {
        const input = wrapper.find(TextField).at(1);
        const expectedArg = {
            comment: 'new comment'
        }
        input.props().onChange(expectedArg)
        expect(wrapper.props().handleChange).toHaveBeenCalled();
        expect(wrapper.props().handleChange).toHaveBeenCalledWith(expectedArg);
    })

    it('Should capture form submit', function () {
        const form = wrapper.find('form');
        form.simulate('submit')
        expect(wrapper.props().onCommentSubmit).toHaveBeenCalled();
    })


    // it('should be called with the username and comment in the state as arguments', () => {
    //     // fill in email field with blah@gmail.com     
    //     const username = wrapper.find(TextField).at(0);
    //     const expectedName = {
    //         username: 'new username'
    //     }
    //     username.props().onChange(expectedName)

    //     const comment = wrapper.find(TextField).at(1);
    //     const expectedArg = {
    //         comment: 'new comment'
    //     }
    //     comment.props().onChange(expectedArg)

    //     // simulate form submission   
    //     wrapper.find('form').simulate(
    //         'submit',
    //         { preventDefault() { } }
    //     )
    //     // test to see arguments used after its been submitted 
    //     expect(wrapper.props().onCommentSubmit.mock.calls[1][0]).toEqual(
    //         { username: 'blah@gmail.com', comment: 'cats' }
    //     )
    // })

})
