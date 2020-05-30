import  { combineReducers } from 'redux';
import changeCustomerReducer from './changeCustomerReducer';
import customerListReducer from './customerListReducer';
import activityListReducer from './activityListReducer';
import saveActivityReducer from './saveActivityReducer'

const rootReducer = combineReducers({
    changeCustomerReducer,
    customerListReducer,
    activityListReducer,
    saveActivityReducer
})

export default rootReducer;