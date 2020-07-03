import * as actionTypes from './actionTypes';

export function changeCustomer(customer) {
    return { type: actionTypes.CHANGE_CUSTOMER, payload: customer }
}

export function getCustomersSuccess(customers) {
    return { type: actionTypes.GET_CUSTOMERS_SUCCESS, payload: customers }
}

export function createCustomerSuccess(customer) {
    return { type: actionTypes.CREATE_CUSTOMER_SUCCESS, payload: customer }
}

export function updateCustomerSuccess(customer) {
    return { type: actionTypes.UPDATE_CUSTOMER_SUCCESS, payload: customer }
}

export function saveCustomerApi(customer) {
    return fetch("http://localhost:3000/customers/" + (customer.id || ""), {
        method: customer.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(customer)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function saveCustomer(customer) {
    return function (dispatch) {
        return saveCustomerApi(customer).then(savedCustomer => {
            customer.id
                ? dispatch(updateCustomerSuccess(savedCustomer))
                : dispatch(createCustomerSuccess(savedCustomer))
        })
            .catch(error => {
                throw error
            });
    };
}

export async function handleResponse(response) {
    if (response.ok) {
        return response.json();
    }

    const error = await response.text();
    throw new Error(error)
}

export function handleError(error) {
    console.error("Bir hata oluştu");
    alert("Bir hata oluştu");
    throw error;
}

export function getCustomers() {
    return function (dispatch) {
        let url = "http://localhost:3000/customers";
        return fetch(url).then(response => response.json())
            .then(result => dispatch(getCustomersSuccess(result)))
    }
}