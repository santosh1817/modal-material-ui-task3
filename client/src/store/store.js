// import {createStore,combineReducers} from 'redux'
// import modalwindowReducer from '../reducers/modalwindow'

// const configureStore=()=>{

//     const store=createStore(combineReducers({
//         modalwindow : modalwindowReducer
//     }))
//     return store

// }

// export default configureStore

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
