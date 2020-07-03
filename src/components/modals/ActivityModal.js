import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as customerActions from '../../redux/actions/customerActions';
import { MDBCol, MDBBtn, MDBRow } from 'mdbreact';

const ActivityModal = ({ name, customer, date, duration, explanation, customers, submitHandler, changeHandler }) => {
    return (
        <div>
            <form
                className="needs-validation"
                onSubmit={submitHandler}
                noValidate>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="name" className="grey-text">Activity Name</label>
                        <input
                            value={name}
                            onChange={changeHandler}
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            required />
                        <div className="invalid-tooltip right">Please enter user name.</div>
                        {/* <div className="valid-tooltip">Looks good!</div> */}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="name" className="grey-text">Customer</label>
                        <select
                            value={customer}
                            onChange={changeHandler}
                            id="customer"
                            name="customer"
                            className="form-control"
                            required>
                            <option value="">Select Customer</option>
                            {customers.map(customer => {
                                return (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.customerName}
                                    </option>
                                )
                            })}
                        </select>
                        <div className="invalid-tooltip right">Please select customer.</div>
                        {/* <div className="valid-tooltip">Looks good!</div> */}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="date" className="grey-text">Activity Date</label>
                        <input
                            value={date}
                            onChange={changeHandler}
                            type="date"
                            id="date"
                            name="date"
                            className="form-control"
                            required />
                        <div className="invalid-tooltip">Please enter a valid date.</div>
                        {/* <div className="valid-tooltip">Looks good!</div> */}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="duration" className="grey-text">Duration</label>
                        <input
                            value={duration}
                            onChange={changeHandler}
                            type="text"
                            id="duration"
                            name="duration"
                            className="form-control"
                            required />
                        <div className="invalid-tooltip">Please enter a valid duration.</div>
                        {/* <div className="valid-tooltip">Looks good!</div> */}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="explanation" className="grey-text">Explanation</label>
                        <textarea
                            rows="3"
                            value={explanation}
                            onChange={changeHandler}
                            type="text"
                            id="explanation"
                            name="explanation"
                            className="form-control"
                            required />
                        <div className="invalid-tooltip">Please enter a explanation.</div>
                        {/* <div className="valid-tooltip">Looks good!</div> */}
                    </MDBCol>
                </MDBRow>
                <div className='text-center mt-4'>
                    <MDBBtn color="primary" type="submit">Save Activity</MDBBtn>
                </div>
            </form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        customers: state.customerListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getCustomers: bindActionCreators(customerActions.getCustomers, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityModal);
