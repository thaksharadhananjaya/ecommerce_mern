import authReducer from './auth_reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;
