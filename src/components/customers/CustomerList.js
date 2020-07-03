import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as customerActions from '../../redux/actions/customerActions';
import * as activityActions from '../../redux/actions/activityActions';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import Image from 'react-bootstrap/Image';

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
                <ListGroup >
                    {
                        this.props.customers.map(customer => (
                            <ListGroupItem
                                tag="a"
                                action
                                key={customer.id}
                                onClick={() => this.selectCustomer(customer)}>
                                <Image width="60" height="40" src={ '../../logo/' + customer.customerName + '.png'} />
                                {' '}{customer.customerName}
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>
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