import React, { Component } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBBtn,
  MDBRow
} from 'mdbreact';
import Footer from '../footer/Footer';

class Register extends Component {

  state = {
    name: "",
    email: "",
    password: "",
    type: "user",
    status: "Active"
  };

  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    return (
      <div>
        <MDBContainer className="d-flex justify-content-center mt-6">
          <MDBCol md='5' style={{ marginTop: 50 }}>
            <form
              className="needs-validation"
              onSubmit={this.submitHandler}
              noValidate>
              <h3 className="d-flex justify-content-center mt-6">Sign Up</h3>
              <MDBRow>
                <MDBCol md="12" className="mb-3">
                  <label htmlFor="name" className="grey-text">Your Name</label>
                  <input
                    value={this.state.name}
                    name="name"
                    onChange={this.changeHandler}
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder=""
                    required
                  />
                  <div className="invalid-tooltip right">Please enter your name.</div>
                  <div className="valid-tooltip">Looks good!</div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12" className="mb-3">
                  <label htmlFor="email" className="grey-text">Your Email</label>
                  <input
                    icon='envelope-open'
                    value={this.state.email}
                    onChange={this.changeHandler}
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    placeholder=""
                    required
                  />
                  <div className="invalid-tooltip">Please enter a valid email.</div>
                  <div className="valid-tooltip">Looks good!</div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12" className="mb-3">
                  <label htmlFor="password" className="grey-text">Your Password</label>
                  <input
                    value={this.state.password}
                    onChange={this.changeHandler}
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    placeholder=""
                    required
                  />
                  <div className="invalid-tooltip">Please enter a valid password.</div>
                  <div className="valid-tooltip">Looks good!</div>
                </MDBCol>
              </MDBRow>
              <div className='text-center mt-4'>
                <MDBBtn color="primary" type="submit">
                  Register
              </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBContainer>
        <Footer />
      </div>
    );
  }
}

export default Register;