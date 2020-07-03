import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";

class Navi extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <MDBNavbar color="indigo" className="sticky-top" dark expand="md">
        <MDBNavbarBrand href={'/'}>
          <strong className="white-text">React Activity App</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/dashboard">Dashboard</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>Activity
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem><Link  to="/saveactivity">Add Activity</Link></MDBDropdownItem>
                  <MDBDropdownItem><Link to="/activity">Activity List</Link></MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="/register">Register</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/login">Login</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Navi;