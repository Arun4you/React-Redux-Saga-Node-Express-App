import "@babel/polyfill";
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from './store/'
import { ErrorHandler } from "./components";

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

render(
    <Provider store={store}>
        <ErrorHandler render={() => <div className="error">Something went wrong</div>}>
            <App />
        </ErrorHandler>
    </Provider>, document.getElementById('root'));