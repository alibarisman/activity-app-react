import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activityActions from '../../redux/actions/activityActions';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextInput from '../toolbox/TextInput'
import { AvForm, AvField } from 'availity-reactstrap-validation';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

class ActivityList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        this.props.actions.getActivities();
    }

    render() {
        return (
            <div>
                <h3>Activitiy List <Badge color="success">{this.props.currentCustomer.customerName}</Badge></h3>

                <Button color='danger' tag={Link} to={'/saveactivity'}>Add User</Button>
                <Button color='primary' style={{ marginLeft: 10 }} onClick={this.toggle}>Add User Modal</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Activity</ModalHeader>
                    <ModalBody>
                        <AvForm>
                            <AvField name="activityName" label="Activity Name" type="text" required/>
                            <AvField name="activityDate" label="Activity Date" type="date" required/>
                            <AvField name="duration" label="Duration" type="number" required/>
                            <AvField name="explanation" label="Explanation" type="text" required/>
                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={this.toggle}>Save</Button>{' '}
                        <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <TableContainer style={{ minWidth: 650, marginTop: 10 }} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Activity Name</StyledTableCell>
                                <StyledTableCell>Activity Date</StyledTableCell>
                                <StyledTableCell>Duration</StyledTableCell>
                                <StyledTableCell style={{ maxWidth: 100 }}>Explanation</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.activities.map(activity => (
                                <StyledTableRow key={activity.id}>
                                    <StyledTableCell component="th" scope="row">{activity.id}</StyledTableCell>
                                    <StyledTableCell><Link to={"/saveactivity/" + activity.id}>{activity.activityName}</Link></StyledTableCell>
                                    <StyledTableCell>{activity.activityDate}</StyledTableCell>
                                    <StyledTableCell>{activity.duration}</StyledTableCell>
                                    <StyledTableCell style={{ maxWidth: 300 }}>{activity.explanation}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentCustomer: state.changeCustomerReducer,
        activities: state.activityListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getActivities: bindActionCreators(activityActions.getActivities, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
