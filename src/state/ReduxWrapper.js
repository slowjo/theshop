import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '.';

let cartItemsFromStorage = [];

// const loadStorage = () => {
//     if (localStorage.getItems('cartItems')) {
//         cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems'));
// }
// if (typeof localStorage !== undefined) {
//     loadStorage();
// }}
// const cartItemsFromStorage = localStorage && localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

// const initialState = {
//     app: {
//         items: [],
//     }
// };
const initialState = {
    app: {
        items: cartItemsFromStorage,
    }
};

const createStore = () => reduxCreateStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default ({ element }) => (
    <Provider store={createStore()}>{element}</Provider>
);