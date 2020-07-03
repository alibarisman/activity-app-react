import React from 'react';
import { MDBCol, MDBBtn, MDBRow } from 'mdbreact';

const UserModal = ({ name, email, phone, type, status, submitHandler, changeHandler }) => {
    return (
        <div>
            <form
                className="needs-validation"
                onSubmit={submitHandler}
                noValidate>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="name" className="grey-text">User Name</label>
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
                        <label htmlFor="email" className="grey-text">Email</label>
                        <input
                            value={email}
                            onChange={changeHandler}
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            required />
                        <div className="invalid-tooltip">Please enter a valid email.</div>
                        {/* <div className="valid-tooltip">Looks good!</div> */}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="phone" className="grey-text">Phone</label>
                        <input
                            value={phone}
                            onChange={changeHandler}
                            type="phone"
                            id="phone"
                            name="phone"
                            className="form-control"
                            placeholder="05012345678"
                            required />
                        <div className="invalid-tooltip">Please enter a valid phone.</div>
                        {/* <div className="valid-tooltip">Looks good!</div> */}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-3">
                        <label htmlFor="type" className="grey-text">User Type</label>
                        <select
                            value={type}
                            onChange={changeHandler}
                            id="type"
                            name="type"
                            className="form-control"
                            required>
                            <option value=""></option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <div className="invalid-tooltip">Please select a user type.</div>
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
                    <MDBBtn color="primary" type="submit">Save User</MDBBtn>
                </div>
            </form>
        </div>
    )
}

export default UserModal;
