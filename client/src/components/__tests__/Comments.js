import React from 'react'
import { mount } from "enzyme";
import { mountToJson } from 'enzyme-to-json'
import List from "@material-ui/core/List";
import Comments from './../Comments'

describe('<Comments />', () => {

    let wrapper
    beforeEach(() => {
        const props = {
            allComments: {
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
                        _id: "5c9ce22be0b347189c6113b9"
                    }
                ]
            },
            handleCommentDelete: jest.fn(),
            handleOut: jest.fn(),
            handleOut: jest.fn()
        }
        wrapper = mount(<Comments {...props} />)
    })

    it('should be defined', () => {
        expect(wrapper).toBeDefined();
    })

    it('should shallow toMatchSnapshot', () => {
        expect(mountToJson(wrapper)).toMatchSnapshot();
    })

    it('Should render two comments', () => {
        expect(wrapper.find(List).length).toBe(2)
    })
})

describe('<Comments /> - Should not render', () => {

    let wrapper;
    beforeEach(() => {
        const props = {
            allComments: {
                comments: []
            },
            handleCommentDelete: jest.fn(),
            handleOut: jest.fn(),
            handleOut: jest.fn()
        }
        wrapper = mount(<Comments {...props} />)
    })
    it('+++ Home component should render "No Commnets here" if no comments were supplied', () => {
        expect(wrapper.find(List).length).toBe(0)
        expect(wrapper.contains('No Comments yet')).toBe(true)
    })
})
