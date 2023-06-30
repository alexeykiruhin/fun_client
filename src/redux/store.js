import {composeWithDevTools} from 'redux-devtools-extension';
import {combineReducers, legacy_createStore as createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
//Reducers
import menuReducer from './reducers/menuReducer';

let rootReducers = combineReducers({
    menu: menuReducer,
})

let store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))

export default store;