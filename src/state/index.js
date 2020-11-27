import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import messages from './messages';

export default combineReducers({
    app,
    auth,
    messages,
});