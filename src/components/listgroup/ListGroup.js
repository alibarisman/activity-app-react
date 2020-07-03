import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activityActions from '../../redux/actions/activityActions';
import * as customerActions from '../../redux/actions/customerActions';
import initialState from '../../redux/reducers/initialState';

class List extends Component {

    componentDidMount() {
        this.props.actions.getActivities();
        this.props.actions.getCustomers();
    }

    state = {
        activities: initialState.activities.length,
        customers: initialState.customers.length
    };

    render() {
        return (
            <MDBCard className="mb-4">
                <MDBCardBody>
                    <h3>Customer List</h3>
                    <hr />
                    <MDBListGroup className="list-group-flush">
                        <MDBListGroupItem hover>
                            Sales
                            <MDBBadge color="success" pill className="float-right">
                                22%
                                <MDBIcon icon="arrow-up" className="ml-1" />
                            </MDBBadge>
                        </MDBListGroupItem>
                        <MDBListGroupItem hover>
                            Traffic
                            <MDBBadge color="danger" pill className="float-right">
                                5%
                                <MDBIcon icon="arrow-down" className="ml-1" />
                            </MDBBadge>
                        </MDBListGroupItem>
                        <MDBListGroupItem hover>
                            Orders
                            <MDBBadge color="primary" pill className="float-right">14</MDBBadge>
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                            Issues
                            <MDBBadge color="secondary" pill className="float-right">123</MDBBadge>
                        </MDBListGroupItem>
                        <MDBListGroupItem hover>
                            Messages
                            <MDBBadge color="light" pill className="float-right">8</MDBBadge>
                        </MDBListGroupItem>
                        <MDBListGroupItem hover>
                            Customers
                            <MDBBadge color="info" pill className="float-right">101</MDBBadge>
                        </MDBListGroupItem>
                        <MDBListGroupItem hover>
                            Users
                            <MDBBadge color="dark" pill className="float-right">25</MDBBadge>
                        </MDBListGroupItem>
                    </MDBListGroup>
                </MDBCardBody>
            </MDBCard>
        )
    }
}

function mapStateToProps(state) {
    return {
        activities: state.activityListReducer,
        customers: state.customerListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getActivities: bindActionCreators(activityActions.getActivities, dispatch),
            getCustomers: bindActionCreators(customerActions.getCustomers, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);