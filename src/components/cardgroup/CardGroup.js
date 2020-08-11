import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activityActions from '../../redux/actions/activityActions';
import * as userActions from '../../redux/actions/userActions';
import * as customerActions from '../../redux/actions/customerActions';
import * as projectActions from '../../redux/actions/projectActions';
import { Button } from 'reactstrap';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBIcon } from "mdbreact";

class CardGroup extends Component {

    componentDidMount() {
        this.props.actions.getActivities();
        this.props.actions.getUsers();
        this.props.actions.getCustomers();
        this.props.actions.getProjects();
    }

    render() {
        return (
            <div>
                <MDBRow className="mb-4">
                    <MDBCol xl="4" md="4" className="mb-r cardTop">
                        <MDBCard style={{ marginLeft: 60 }} className="cascading-admin-card">
                            <div className="admin-up">
                                <MDBIcon icon="edit" className="primary-color" />
                                <div className="data">
                                    <h5>ACTIVITIES</h5>
                                    <h4>
                                        <strong>{this.props.activities.length}</strong>
                                    </h4>
                                </div>
                            </div>
                            <MDBCardBody>
                                <Button color="info" tag={Link} to={'/activities'} size="md">See Details</Button>   
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol xl="4" md="4" className="mb-r cardTop">
                        <MDBCard style={{ marginLeft: 60 }} className="cascading-admin-card">
                            <div className="admin-up">
                                <MDBIcon icon="fas fa-building" className="warning-color" />
                                <div className="data">
                                    <h5>CUSTOMERS</h5>
                                    <h4>
                                        <strong>{this.props.customers.length}</strong>
                                    </h4>
                                </div>
                            </div>
                            <MDBCardBody>
                                <Button color="info" tag={Link} to={'/customers'} size="md">See Details</Button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol xl="4" md="4" className="mb-r cardTop">
                        <MDBCard style={{ marginLeft: 60 }} className="cascading-admin-card">
                            <div className="admin-up">
                                <MDBIcon icon="user-edit" className="red accent-2" />
                                <div className="data">
                                    <h5>USERS</h5>
                                    <h4>
                                        <strong>{this.props.users.length}</strong>
                                    </h4>
                                </div>
                            </div>
                            <MDBCardBody>
                                <Button color="info" tag={Link} to={'/users'} size="md">See Details</Button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                    <MDBCol xl="4" md="4" className="mb-r cardTop">
                        <MDBCard style={{ marginLeft: 60, marginTop: 20 }} className="cascading-admin-card">
                            <div className="admin-up">
                                <MDBIcon icon="copy" className="red accent-2" />
                                <div className="data">
                                    <h5>PROJECTS</h5>
                                    <h4>
                                        <strong>{this.props.projects.length}</strong>
                                    </h4>
                                </div>
                            </div>
                            <MDBCardBody>
                                <Button color="info" tag={Link} to={'/projects'} size="md">See Details</Button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activities: state.activityListReducer,
        users: state.userListReducer,
        customers: state.customerListReducer,
        projects: state.projectListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getActivities: bindActionCreators(activityActions.getActivities, dispatch),
            getUsers: bindActionCreators(userActions.getUsers, dispatch),
            getCustomers: bindActionCreators(customerActions.getCustomers, dispatch),
            getProjects: bindActionCreators(projectActions.getProjects, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardGroup);