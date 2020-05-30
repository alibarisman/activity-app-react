import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function changeCustomerReducer(state = initialState.customers, action){
    switch (action.type) {
        case actionTypes.GET_CUSTOMERS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}