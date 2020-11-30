const initialState = {
    clientMessages: [],
};

const SET_CLIENT_MESSAGE = 'SET_CLIENT_MESSAGE';
const SET_FADE_OUT = 'SET_FADE_OUT'; 
const REMOVE_CLIENT_MESSAGE = 'REMOVE_CLIENT_MESSAGE';

export const setClientMessage = (msg, type, timeout = 5000) => async (dispatch) => {
    const id = new Date().toISOString();

    dispatch({
            type: SET_CLIENT_MESSAGE,
            payload: {
                msg, type, id, 
                fading: 'fading-in',
            }
        });
       
    setTimeout(() => {
        dispatch({
            type: SET_FADE_OUT,
            payload: id,
        });

        setTimeout(() => {
            dispatch({
                type: REMOVE_CLIENT_MESSAGE,
                payload: id,
            });
        }, 120)
    }, 4850)    
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CLIENT_MESSAGE:
            return {
                ...state,
                clientMessages: [...state.clientMessages, action.payload],
            };
        case SET_FADE_OUT:
            return {
                ...state,
                clientMessages: state.clientMessages.map(item => item.id === action.payload ? {...item, fading: 'fading-out'} : item)
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