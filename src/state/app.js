import { setClientMessage } from './messages';

const initialState = {
    items: [],
};

const theUrl = 'https://damp-garden-52954.herokuapp.com/'

// const theUrl = 'http://localhost:4242/';

const GET_ITEMS_FROM_STORAGE = 'GET_ITEMS_FROM_STORAGE';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CHANGE_QTY = 'CHANGE_QTY';
const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
const SEND_ORDER_FAIL = 'SEND_ORDER_FAIL';

export const getItemsFromStorage = () => ({
    type: GET_ITEMS_FROM_STORAGE,
});

export const addItem = item => async (dispatch, getState) => {
    dispatch({
        type: ADD_ITEM, payload: item
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().app.items));
}

export const removeItem = id => async (dispatch, getState) => {
    dispatch ({
        type: REMOVE_ITEM, payload: id
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().app.items));
}

export const changeQty = (id, newQty) => async (dispatch, getState) => {
    dispatch({
        type: CHANGE_QTY,
        payload: {
            id,
            newQty,
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().app.items));
};

export const sendOrder = (customerDetails, cartItems, callback) => async (dispatch) => {
    try {
        const res = await fetch(`${theUrl}orders/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerDetails,
                products: cartItems,
            })
        });

        if (res.status !== 201) {
            throw new Error('Error sending order');
        }

        const resData = await res.json();

        console.log(resData.msg);

        dispatch({
            type: SEND_ORDER_SUCCESS,
            payload: resData.msg,
        });

        if (callback) {
            callback();
            console.log('callback invoked');
        }
    } catch (err) {
        dispatch({
            type: SEND_ORDER_FAIL,
            payload: err.message,
        });

        dispatch(setClientMessage('Something went wrong', 'alert'));
    }
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_ITEMS_FROM_STORAGE:
            return {
                ...state,
                items: JSON.parse(localStorage.getItem('cartItems')),
            }
        case ADD_ITEM:
            const itemToAdd = action.payload;

            const existItem = state.items.find(x => x.id === itemToAdd.id);

            if (existItem) {
                itemToAdd.qty = itemToAdd.qty + existItem.qty;
                return {
                    ...state,
                    items: state.items.map(x => x.id === existItem.id ? itemToAdd : x)
                };
            } else {
                return {
                    ...state,
                    items: [action.payload, ...state.items],
                };
            }
        case REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        case CHANGE_QTY:
            return {
                ...state,
                items: state.items.map(item => item.id === action.payload.id ? {...item, qty: action.payload.newQty} : item)
            };        
        case SEND_ORDER_SUCCESS:
            localStorage.removeItem('cartItems');
            return {
                ...state,
                items: [],
            };    
        default:
            return state;    
    }
};