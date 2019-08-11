// Takes in the reducers from within the folder and exports them all at once
import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

export default combineReducers({
    alert,
    auth
});