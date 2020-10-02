import { combineReducers } from 'redux';
import modalwindowReducer from './modalwindow';

export default combineReducers({
    modalwindow : modalwindowReducer
});