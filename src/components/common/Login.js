import React, { Component } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBInput,
  MDBBtn
} from 'mdbreact';

class FormsPage extends Component {
  render() {

    return (
      <MDBContainer className="d-flex justify-content-center mt-6">
        <MDBCol md='5' style={{ marginTop: 50 }}>
          {/* <SectionContainer> */}
            <form>
            <h3 className="d-flex justify-content-center mt-6">Sign In</h3>
              <div className='grey-text'>
                <MDBInput
                  label='Type your email'
                  icon='envelope'
                  group
                  type='email'
                  validate
                  error='wrong'
                  success='right'
                />
                <MDBInput
                  label='Type your password'
                  icon='lock'
                  group
                  type='password'
                  validate
                />
              </div>
              <div className='text-center'>
                <MDBBtn style={{ borderRadius: 10 }} color="primary" >Login</MDBBtn>
              </div>
            </form>
          {/* </SectionContainer> */}
        </MDBCol>
      </MDBContainer>
    );
  }
}

export default FormsPage;
