import React, { Component } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBInput,
  MDBBtn
} from 'mdbreact';

class Register extends Component {
  render() {

    return (
      <MDBContainer className="d-flex justify-content-center mt-6">
        <MDBCol md='5' style={{ marginTop: 50 }}>
          {/* <SectionContainer> */}
          <form>
            <h3 className="d-flex justify-content-center mt-6">Sign Up</h3>
            <label
              htmlFor='name'
              className='grey-text'>
              Your name
            </label>
            <input
              type='text'
              id='name'
              className='form-control'
            />
            <br />
            <label
              htmlFor='email'
              className='grey-text'>
              Your email
            </label>
            <input
              type='email'
              id='email'
              className='form-control'
            />
            <br />
            <label
              htmlFor='password'
              className='grey-text'>
              Your password
            </label>
            <input
              type='password'
              id='password'
              className='form-control'
            />
            <div className='text-center mt-4'>
              <MDBBtn color="default">Register</MDBBtn>
            </div>
          </form>
          {/* </SectionContainer> */}
        </MDBCol>
      </MDBContainer>
    );
  }
}

export default Register;