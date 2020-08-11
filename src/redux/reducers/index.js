import  { combineReducers } from 'redux';
import changeCustomerReducer from './changeCustomerReducer';
import customerListReducer from './customerListReducer';
import activityListReducer from './activityListReducer';
import saveActivityReducer from './saveActivityReducer'
import userListReducer from './userListReducer';
import projectListReducer from './projectListReducer';

const rootReducer = combineReducers({
    changeCustomerReducer,
    customerListReducer,
    activityListReducer,
    saveActivityReducer,
    userListReducer,
    projectListReducer
})

export default rootReducer;