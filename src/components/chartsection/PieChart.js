import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activityActions from '../../redux/actions/activityActions';
import * as customerActions from '../../redux/actions/customerActions';
import initialState from '../../redux/reducers/initialState';

class ChartSection1 extends Component {

    componentDidMount() {
        this.props.actions.getActivities();
        this.props.actions.getCustomers();
    }

    state = {
        activities: initialState.activities.length,
        customers: initialState.customers.length
    };

    render() {
        const dataPieLabels = [];
        const dataPieCounts = [];

        for (let i = 0; i < this.props.customers.length; i++) {
            dataPieLabels.push(this.props.customers[i].customerName)
                      
            let activities = this.props.activities.filter(activity => activity.customerId === this.props.customers[i].id);
            dataPieCounts.push(activities.length);
        }

        const dataPie = {
            labels: dataPieLabels,
            datasets: [
                {
                    data: dataPieCounts,
                    backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad', '#3f51b5'],
                    hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db', '#3f51b5']
                }
            ]
        }
        return (
            <MDBCard className="mb-3">
                <MDBCardHeader>Customer's Activities</MDBCardHeader>
                <MDBCardBody>
                    <Pie data={dataPie} height={400} options={{ responsive: true }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChartSection1);