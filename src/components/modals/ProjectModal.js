import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as customerActions from '../../redux/actions/customerActions';
import { MDBCol, MDBBtn, MDBRow } from 'mdbreact';

const ActivityModal = ({ projectName, customerId, city, sector, status, customers, submitHandler, changeHandler }) => {
    return (
        <div>
            <form
                className="needs-validation"
                onSubmit={submitHandler}
                noValidate>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="projectName" className="grey-text">Project Name</label>
                        <input
                            value={projectName}
                            onChange={changeHandler}
                            type="text"
                            id="projectName"
                            name="projectName"
                            className="form-control"
                            required />
                        <div className="invalid-tooltip right">Please enter project name.</div>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="customerId" className="grey-text">Customer</label>
                        <select
                            value={customerId}
                            onChange={changeHandler}
                            id="customerId"
                            name="customerId"
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
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="city" className="grey-text">City</label>
                        <input
                            value={city}
                            onChange={changeHandler}
                            type="text"
                            id="city"
                            name="city"
                            className="form-control"
                            required />
                        <div className="invalid-tooltip right">Please enter a city.</div>
                        {/* <div className="valid-tooltip">Looks good!</div> */}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="sector" className="grey-text">Sector</label>
                        <input
                            value={sector}
                            onChange={changeHandler}
                            type="text"
                            id="sector"
                            name="sector"
                            className="form-control"
                            required />
                        <div className="invalid-tooltip">Please enter a sector.</div>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                    <label htmlFor="status" className="grey-text">Status</label>
                        <select
                            value={status}
                            onChange={changeHandler}
                            id="status"
                            name="status"
                            className="form-control"
                            required>
                            <option value=""></option>
                            <option value="Active">Active</option>
                            <option value="Passive">Passive</option>
                        </select>
                        <div className="invalid-tooltip">Please select a status.</div>
                        {/* <div className="valid-tooltip">Looks good!</div> */}
                    </MDBCol>
                </MDBRow>
                <div className='text-center mt-4'>
                    <MDBBtn color="primary" type="submit">Save Project</MDBBtn>
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
