const initialState = {
    clientMessages: [],
};

const SET_CLIENT_MESSAGE = 'SET_CLIENT_MESSAGE';
const REMOVE_CLIENT_MESSAGE = 'REMOVE_CLIENT_MESSAGE';

export const setClientMessage = (msg, type, timeout = 5000) => async (dispatch) => {
    const id = new Date().toISOString();

    dispatch({
            type: SET_CLIENT_MESSAGE,
            payload: {
                msg, type, id
            }
        });
       
    setTimeout(() => {
        dispatch({
            type: REMOVE_CLIENT_MESSAGE,
            payload: id,
        });
    }, timeout)    
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CLIENT_MESSAGE:
            return {
                ...state,
                clientMessages: [...state.clientMessages, action.payload],
            };
        case REMOVE_CLIENT_MESSAGE:
            return {
                ...state,
                clientMessages: state.clientMessages.filter(item => item.id !== action.payload),
            };    
        default:
            return state;
    }
};