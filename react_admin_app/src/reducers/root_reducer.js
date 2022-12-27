import authReducer from './auth_reducer';
import catReducer from './category_reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    categories: catReducer
});

export default rootReducer;
