import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/userActions';
import { MDBContainer, MDBCol, MDBBtn, MDBRow } from 'mdbreact';
import Footer from '../footer/Footer';
import alertify from 'alertifyjs';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      type: "user",
      status: "Active"
    };
  };

  submitHandler = event => {
    
    debugger;
    event.preventDefault();
    event.target.className += " was-validated";

    if (this.state.email === "" || this.state.name === "" || this.state.password === "") {
      return;
    }

    const user = {
      id: "",
      userName: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      type: this.state.type,
      status: this.state.status
    }

    this.props.actions.saveUser(user).then(() => {
      alertify.alert('Successful', 'The user has been successfully saved');
      this.props.history.push('/login');

    });
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

export function getUserById(users, userId) {
  let user = users.find(user => user.id === Number(userId)) || null;
  return user;
}

function mapStateToProps(state, ownProps) {
  const userId = ownProps.match.params.userId;
  const user =
    userId && state.userListReducer.length > 0
      ? getUserById(state.userListReducer, userId)
      : {};
  return {
    user,
    users: state.userListReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUsers: bindActionCreators(userActions.getUsers, dispatch),
      saveUser: bindActionCreators(userActions.saveUser, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);