import React from 'react';
import { MDBCol, MDBBtn, MDBRow } from 'mdbreact';

const CustomerModal = ({ name, logo, city, status, submitHandler, changeHandler }) => {
    return (
        <div>
            <form
                className="needs-validation"
                onSubmit={submitHandler}
                noValidate>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="name" className="grey-text">Company Name</label>
                        <input
                            value={name}
                            onChange={changeHandler}
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            required />
                        <div className="invalid-tooltip right">Please enter company name.</div>
                        {/* <div className="valid-tooltip">Looks good!</div> */}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="logo" className="grey-text">Logo</label>
                        <input
                            value={logo}
                            onChange={changeHandler}
                            type="file"
                            id="logo"
                            name="logo"
                            className="form-control"
                            required />
                        <div className="invalid-tooltip right">Please select a logo.</div>
                        {/* <div className="valid-tooltip">Looks good!</div> */}
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
                    <MDBBtn className="borderRadius" color="primary" type="submit">Save Company</MDBBtn>
                </div>
            </form>
        </div>
    )
}

export default CustomerModal;
