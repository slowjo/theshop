const initialState = {
    token: null,
    isLoggedIn: false,
    products: [],
    editableProducts: [],
    selectedProduct: null,
    modalProduct: null,
    message: null,
    orders: null,
};

const theUrl = 'https://damp-garden-52954.herokuapp.com/'

// const theUrl = 'http://localhost:4242/';

export const isBrowser = () => typeof window !== undefined;

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGOUT = 'LOGOUT';
const GET_PRODUCTS = 'GET_PRODUCTS';
const PRODUCTS_ERROR = 'PRODUCTS_ERROR';
const SELECT_PRODUCT = 'SELECT_PRODUCT';
const SEND_EDIT = 'SEND_EDIT';
const SEND_ADDED = 'SEND_ADDED';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const SET_EDIT_STATE = 'SET_EDIT_STATE';
const SET_MODAL_PRODUCT = 'SET_MODAL_PRODUCT';
const CLEAR_MODAL_PRODUCT = 'CLEAR_MODAL_PRODUCT';
const SET_MESSAGE = 'SET_MESSAGE';
const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
const GET_ORDERS = 'GET_ORDERS';
const REMOVE_ORDER = 'REMOVE_ORDER';
const REBUILD = 'REBUILD';


export const login = ({ username, password }) => async dispatch => {
    try {
        const res = await fetch(`${theUrl}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        if (res.status !== 200) {
            throw new Error('Error logging in');
        }

        const resData = await res.json();

        dispatch({
            type: LOGIN_SUCCESS,
            payload: resData,
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.message,
        });
    }
};

export const logout = () => ({
    type: LOGOUT,
});

export const getProducts = () => async dispatch => {
    try {
        const res = await fetch(`${theUrl}products`);

        if (res.status !== 200) {
            throw new Error('Error getting products');
        }

        const resData = await res.json();

        dispatch({
            type: GET_PRODUCTS,
            payload: resData.products,
        });
    } catch (err) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: err.message,
        });
    }
};

export const selectProduct = (product) => ({
    type: SELECT_PRODUCT,
    payload: {
        product,
        }
});

export const sendEdit = editedProduct => async (dispatch) => {
    try {
        const res = await fetch(`${theUrl}products/${editedProduct._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                editedProduct
            }),
        });

        if (res.status !== 200) {
            throw new Error('Error sending edited products');
        }

        const resData = await res.json();

        console.log(resData);

        dispatch({
            type: SEND_EDIT,
            payload: resData.editedProd,
        });
    } catch (err) {
        console.log(err);
    }
};

export const sendAdded = addedProduct => async (dispatch) => {
    try {
        const res = await fetch(`${theUrl}products/makeproduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                addedProduct,
            })
        });

        if (res.status !== 201) {
            throw new Error('Error adding post');
        }

        const resData = await res.json();

        dispatch({
            type: SEND_ADDED,
            payload: resData.addedProduct,
        });
    } catch (err) {
        console.log(err);
    }
};

export const removeProduct = id => async (dispatch) => {
    try {
        const res = await fetch(`${theUrl}products/${id}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            }
        });

        if (res.status !== 200) {
            throw new Error('Error deleting product');
        }

        dispatch({
            type: REMOVE_PRODUCT,
            payload: id,
        });
    } catch (err) {
        console.log(err);
    }
};

export const setEditState = editMode => ({
    type: SET_EDIT_STATE,
    payload: editMode,
});

export const setModalProduct = product => ({
    type: SET_MODAL_PRODUCT,
    payload: product,
});

export const clearModalProduct = () => ({
    type: CLEAR_MODAL_PRODUCT,
});

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message,
});

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});

export const getOrders = () => async (dispatch) => {
    try {
        const res = await fetch(`${theUrl}orders`, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            }
        });

        if (res.status !== 200) {
            throw new Error('Error getting orders');
        }

        const resData = await res.json();

        dispatch({
            type: GET_ORDERS,
            payload: resData.orders,
        })
    } catch (err) {
        console.log(err);
    }
};

export const removeOrder = (id) => async (dispatch) => {
    try {
        const res = await fetch(`${theUrl}orders/${id}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            }
        });

        if (res.status !== 200) {
            throw new Error('Error removing order');
        }

        dispatch({
            type: REMOVE_ORDER,
            payload: id,
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const rebuild = () => async (dispatch) => {
    try {
        const res = await fetch(`${theUrl}rebuild`, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            }
        });

        if (res.status !== 200) {
            throw new Error('Error triggering rebuild');
        }

        const resData = await res.json();

        dispatch({
            type: REBUILD,
            payload: resData.products,
        });
    } catch (err) {
        console.log(err.message);
    }
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true,
            };
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');    
            return {
                ...state,
                token: null,
                isLoggedIn: false,
                products: [],
                editableProducts: [],
                selectedProduct: null,
                editMode: false,
            };    
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                editableProducts: action.payload,
            };
        case SELECT_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload.product,
            };    
        case SEND_EDIT:
            return {
                ...state,
                products: state.products.map(prod => prod._id === action.payload._id ? action.payload : prod),
                editableProducts: state.editableProducts.map(prod => prod._id === action.payload._id ? action.payload : prod),
            };    
        case SEND_ADDED:
            return {
                ...state,
                products: [...state.products, action.payload],
                editableProducts: [...state.editableProducts, action.payload],
            };
        case REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(prod => prod._id !== action.payload),
                editableProducts: state.editableProducts.filter(prod => prod._id !== action.payload),
            };
        case SET_EDIT_STATE:
            return {
                ...state,
                editMode: action.payload,
            };     
        case SET_MODAL_PRODUCT:
            return {
                ...state,
                modalProduct: action.payload,
            };
        case CLEAR_MODAL_PRODUCT:
            return {
                ...state,
                modalProduct: null,
            };
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload,
            };
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: null,
            };
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
            };
        case REMOVE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(item => item._id !== action.payload),
            };  
        case REBUILD:
            return {
                ...state,
                products: action.payload,
                editableProducts: action.payload,
            };
        default:
            return state;
    }
};