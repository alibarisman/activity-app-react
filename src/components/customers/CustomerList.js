import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as customerActions from '../../redux/actions/customerActions';
import * as activityActions from '../../redux/actions/activityActions';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class CustomerList extends Component {

    componentDidMount() {
        this.props.actions.getCustomers();
    }

    selectCustomer(customer) {
        this.props.actions.changeCustomer(customer);
        this.props.actions.getActivities(customer.id);
    }

    render() {
        return (
            <div>
                <h3><Badge color="warning">Customers ({this.props.customers.length})</Badge></h3>
                <ListGroup>
                    {
                        this.props.customers.map(customer => (
                            <ListGroupItem
                                key={customer.id}
                                onClick={() => this.selectCustomer(customer)}
                                active={customer.id === this.props.currentCustomer.id}>
                                {customer.customerName}
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>
                {/* <h5>Selected Customer: {this.props.currentCustomer.customerName}</h5> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentCustomer: state.changeCustomerReducer,
        customers: state.customerListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getCustomers: bindActionCreators(customerActions.getCustomers, dispatch),
            changeCustomer: bindActionCreators(customerActions.changeCustomer, dispatch),
            getActivities: bindActionCreators(activityActions.getActivities, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);