import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, prob

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <SideNav style={{ marginTop: 50 }}>
          <SideNav.Toggle />
          <SideNav.Nav>
            <NavItem eventKey="addActivity">
              <NavIcon>
                <i className="fas fa-tachometer-alt" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              <Link style={{ fontSize: 15 }} to="/saveactivity" >Add Activity</Link>
            </NavText>
            </NavItem>
            <NavItem eventKey="activityList">
              <NavIcon>
                <i className="fas fa-tachometer-alt" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              <Link style={{ fontSize: 15 }} to="/activity">Activity List</Link>
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </div>
    )
  }
}

