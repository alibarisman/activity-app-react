import * as actionTypes from './actionTypes';

export function changeCustomer(customer) {
    return { type: actionTypes.CHANGE_CUSTOMER, payload: customer }
}

export function getCustomersSuccess(customers) {
    return { type: actionTypes.GET_CUSTOMERS_SUCCESS, payload: customers }
}

export function getCustomers() {
    return function (dispatch) {
        let url = "http://localhost:3000/customers";
        return fetch(url).then(response => response.json())
            .then(result => dispatch(getCustomersSuccess(result)))
    }
}