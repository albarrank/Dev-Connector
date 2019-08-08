// Creation of the Redux store that allows state to be accessed throughout the app and not just components
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;