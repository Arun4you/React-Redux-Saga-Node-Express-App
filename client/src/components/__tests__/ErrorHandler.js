import ErrorHandler from "./../ErrorHandler";
import React from 'react'
import { shallow, mount } from "enzyme";
// Let's create a Child functional component which does
// nothing but throw an error. This way we can ensure we'll trigger
// an error and have our Error Boundary called.
const Child = () => {
  throw "error";
};

// The error being logged was driving me crazy, so this is very hacky
// but will stop the error from being displayed during the running
// of this test.
const pauseErrorLogging = codeToRun => {
  // capture error function
  const logger = console.error;
  // replace with stub function
  console.error = () => {};

  // execute code
  codeToRun();

  // add back the console error function
  console.error = logger;
};

it("catches error and renders message", () => {
  // stop error within from logging error to console
  pauseErrorLogging(() => {
    // use mount from enzyme to mount/render error boundary and child
    const wrapper = mount(
      <ErrorHandler render={() => <div>Error has occurred</div>}>
        <Child />
      </ErrorHandler>
    );

    // because an error has occured in the Child
    // let's make sure our error boundary has displayed the error
    // which was provided in the render prop
    expect(wrapper.text()).toEqual("Error has occurred");
  });
});