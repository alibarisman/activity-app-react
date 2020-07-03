import React, { Component } from 'react';
import { withRouter } from 'react-router';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

class Sidenav extends Component {

  state = {
    expanded: true
  };

  onToggle = (expanded) => {
    this.setState({ expanded: expanded });
  };

  render() {
    return (
      <div>
        <SideNav
          style={{ marginTop: 50, background: "#37474f", position: "fixed" }}
          expanded={this.state.expanded}
          onToggle={() => this.onToggle()}
          onSelect={(selected) => {
            const to = '/' + selected;
            this.props.history.push(to);
          }}>
          <SideNav.Toggle expanded />
          <SideNav.Nav>
            <NavItem eventKey="activities">
              <NavIcon>
                <i className="fas fa-tachometer-alt" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText style={{ fontSize: 15 }}><strong>Activity List</strong></NavText>
            </NavItem>
            <NavItem eventKey="users">
              <NavIcon>
                <i className="fas fa-tachometer-alt" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText style={{ fontSize: 15 }}><strong>User List</strong></NavText>
            </NavItem>
            <NavItem eventKey="customers">
              <NavIcon>
                <i className="fas fa-tachometer-alt" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText style={{ fontSize: 15 }}><strong>Customer List</strong></NavText>
            </NavItem>
            <NavItem eventKey="datatable">
              <NavIcon>
                <i className="fas fa-tachometer-alt" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText style={{ fontSize: 15 }}><strong>Datatable</strong></NavText>
            </NavItem>
            <NavItem eventKey="uploadaws">
              <NavIcon>
                <i className="fas fa-tachometer-alt" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText style={{ fontSize: 15 }}><strong>Upload Aws</strong></NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </div>
    )
  }
}

export default withRouter(Sidenav);

