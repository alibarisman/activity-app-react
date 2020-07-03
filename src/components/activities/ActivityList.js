import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activityActions from '../../redux/actions/activityActions';
import { saveActivity } from "../../redux/actions/activityActions";
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { MDBDataTableV5, MDBIcon } from 'mdbreact';

class ActivityList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabledata: ''
        };
    };

    componentDidMount() {
        this.props.actions.getActivities();
    };

    checkbox1 = [];

    setCheckbox1 = event => {
        this.checkbox1 = event;
    };

    showLogs2 = event => {
        this.setCheckbox1(event);
    };

    render() {
        
        if (this.props.activities.length > 0) {
            const tableRows = []

            for (let i = 0; i < this.props.activities.length; i++) {

                const tableRow = {
                    edit: <Button size="sm" style={{ borderRadius: 24 }} color="primary" tag={Link} to={"/saveactivity/" + this.props.activities[i].id}><MDBIcon icon="edit" />Edit</Button>,
                    id: this.props.activities[i].id,
                    activityName: this.props.activities[i].activityName,
                    activityDate: <p style={{ width: 100 }}>{this.props.activities[i].activityDate}</p>,
                    duration: this.props.activities[i].duration,
                    explanation: this.props.activities[i].explanation,
                }

                tableRows.push(tableRow);
            }

            const datatable = {
                columns: [
                    {
                        label: 'Id',
                        field: 'id',
                        attributes: {
                            'aria-controls': 'DataTable',
                            'aria-label': 'Id',
                        },
                    },
                    {
                        label: 'Edit',
                        field: 'edit',
                    },
                    {
                        label: 'Activity Name',
                        field: 'activityName',

                    },
                    {
                        label: 'Activity Date',
                        field: 'activityDate',

                    },
                    {
                        label: 'Duration',
                        field: 'duration',

                    },
                    {
                        label: 'Explanation',
                        field: 'explanation',

                    },
                ],

                rows: tableRows
            }

            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.tabledata = datatable
        }

        return (
            <div>
                <h3 className="titleMobile">Activitiy List <Badge color="success">{this.props.currentCustomer.customerName}</Badge></h3>
                <hr />
                <Button className="borderRadius" color='danger' tag={Link} to={'/saveactivity'}>Add Activity</Button>
                <MDBDataTableV5
                    responsive
                    striped
                    bordered
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={this.state.tabledata}
                    searchTop
                    searchBottom={false}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentCustomer: state.changeCustomerReducer,
        activities: state.activityListReducer,
        saveActivity
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getActivities: bindActionCreators(activityActions.getActivities, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
