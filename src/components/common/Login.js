import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import Footer from '../footer/Footer';

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  submitHandler = event => {
    event.preventDefault();
    event.target.className += ' was-validated';
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <MDBContainer className="d-flex justify-content-center mt-6">
          <MDBCol md='5' style={{ marginTop: 50 }}>
            <h3 className="d-flex justify-content-center mt-6">Sign In</h3>
            <form
              className='needs-validation'
              onSubmit={this.submitHandler}
              noValidate>
              <MDBRow>
                <MDBCol md='12'>
                  <MDBInput
                    icon='envelope-open'
                    value={this.state.email}
                    onChange={this.changeHandler}
                    type='email'
                    id='email'
                    name='email'
                    label='Your Email Address'
                    outline
                    required>
                    {/* <small id='emailHelp' className='form-text text-muted'>
                      We'll never share your email with anyone else.
                    </small> */}
                    <div className='invalid-feedback ml-3 pl-3'>
                      Please provide a valid email.
                    </div>
                    <div className='valid-feedback ml-3 pl-3'>Looks good!</div>
                  </MDBInput>
                  <MDBInput
                    icon='lock'
                    value={this.state.password}
                    onChange={this.changeHandler}
                    type='password'
                    id='password'
                    name='password'
                    label='Password'
                    outline
                    required>
                    <div className='invalid-feedback ml-3 pl-3'>
                      Please provide a valid password.
                    </div>
                    <div className='valid-feedback ml-3 pl-3'>Looks good!</div>
                  </MDBInput>
                </MDBCol>
              </MDBRow>
              <div className='text-center'>
                <MDBBtn className="borderRadius" color='primary' type='submit'>
                  Login
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

export default Login;