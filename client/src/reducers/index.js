// Takes in the reducers from within the folder and exports them all at once
import { combineReducers } from 'redux';
import alert from './alert';

export default combineReducers({
    alert
});