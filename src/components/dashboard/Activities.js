import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activityActions from '../../redux/actions/activityActions';
import * as customerActions from '../../redux/actions/customerActions';
import * as projectActions from '../../redux/actions/projectActions';
import { Container, Button, Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MDBDataTableV5, MDBIcon } from 'mdbreact';
import SideNav from '../sidenav/SideNav';
import ActivityModal from '../modals/ActivityModal';
import alertify from "alertifyjs";

class Activities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabledata: '',
            modalTitle: 'Add Activity',
            id: '',
            name: '',
            customer: '',
            project: '',
            date: '',
            duration: '',
            explanation: '',
            projects: []
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    };

    tableColumns = [
        {
            label: 'Activity Id',
            field: 'id',
            attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Id'
            },
        },
        {
            label: 'Edit',
            field: 'edit'
        },
        {
            label: 'Activity Name',
            field: 'activityName'

        },
        {
            label: 'Activity Date',
            field: 'activityDate'
        },
        {
            label: 'Duration',
            field: 'duration'

        },
        {
            label: 'Explanation',
            field: 'explanation'
        }
    ];

    handleOpenModal(id) {
        this.setState({ modal: true });

        if (!isNaN(id)) {
            let activity = this.props.activities.find(activity => activity.id === id);
            debugger;
            this.setState({
                modalTitle: 'Update Activity',
                id: activity.id,
                name: activity.activityName,
                customer: activity.customerId,
                project: activity.projectId,
                date: activity.activityDate,
                duration: activity.duration,
                explanation: activity.explanation,
            });

            let projectList = this.props.projects.filter(projects => projects.id === activity.projectId) || null;
            this.setState({ projects: projectList });
        }
        else {
            this.setState({
                modalTitle: 'Add Activity',
                id: '',
                name: '',
                customer: '',
                project: '',
                date: '',
                duration: '',
                explanation: ''
            });
        }
    }

    handleCloseModal() {
        this.setState({ modal: false });
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
        
        if(event.target.name === "customer") {
            let projectList = this.props.projects.filter(projects => projects.customerId === Number(event.target.value)) || null;
            this.setState({ projects: projectList });
        }
    };

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";

        if (this.state.name === "" || this.state.customer === "" || this.state.date === "" || this.state.duration === "" || this.state.explanation === "") {
            return;
        }

        const activity = {
            id: this.state.id,
            activityName: this.state.name,
            customerId: parseInt(this.state.customer),
            projectId: parseInt(this.state.project),
            activityDate: this.state.date,
            duration: this.state.duration,
            explanation: this.state.explanation
        }

        this.props.actions.saveActivity(activity).then(() => {
            this.props.actions.getActivities();
        });

        this.handleCloseModal();
        alertify.alert('Successful', 'The activity has been successfully saved');

        if (this.props.activities.length > 0) {
            const tableRows = []

            for (let i = 0; i < this.props.activities.length; i++) {

                let id = this.props.activities[i].id;

                const tableRow = {
                    edit: <Button size="sm" style={{ borderRadius: 24 }} color="primary" onClick={() => this.handleOpenModal(id)}><MDBIcon icon="edit" />Edit</Button>,
                    id: this.props.activities[i].id,
                    activityName: this.props.activities[i].activityName,
                    activityDate: <p style={{ width: 100 }}>{this.props.activities[i].activityDate}</p>,
                    duration: this.props.activities[i].duration,
                    explanation: this.props.activities[i].explanation
                }

                tableRows.push(tableRow);
            }

            const datatable = {
                columns: this.tableColumns,
                rows: tableRows
            }

            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.tabledata = datatable
        }

    };

    componentDidMount() {
        this.props.actions.getActivities();
        this.props.actions.getCustomers();
        this.props.actions.getProjects();
    }

    render() {
        if (this.props.activities.length > 0) {
            const tableRows = [];

            for (let i = 0; i < this.props.activities.length; i++) {

                let id = this.props.activities[i].id;

                const tableRow = {
                    edit: <Button size="sm" style={{ borderRadius: 24 }} color="primary" onClick={() => this.handleOpenModal(id)}><MDBIcon icon="edit" />Edit</Button>,
                    id: this.props.activities[i].id,
                    activityName: this.props.activities[i].activityName,
                    activityDate: <p style={{ width: 100 }}>{this.props.activities[i].activityDate}</p>,
                    duration: this.props.activities[i].duration,
                    explanation: this.props.activities[i].explanation
                }

                tableRows.push(tableRow);
            }

            const datatable = {
                columns: this.tableColumns,
                rows: tableRows
            }

            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.tabledata = datatable
        }

        return (
            <div>
                <SideNav />
                <Container>
                    <Row>
                        <Col xs="2"></Col>
                        <Col xs="10">
                            <h2 className="titleTop">Activity List</h2>
                            <hr />
                            <Button className="borderRadius" color='primary' onClick={this.handleOpenModal}>Add Activity</Button>
                            <Modal isOpen={this.state.modal} className={this.props.className}>
                                <ModalHeader toggle={this.handleCloseModal}>{this.state.modalTitle}</ModalHeader>
                                <ModalBody>
                                    <ActivityModal
                                        id={this.state.id}
                                        name={this.state.name}
                                        customer={this.state.customer}
                                        project={this.state.project}
                                        date={this.state.date}
                                        duration={this.state.duration}
                                        explanation={this.state.explanation}
                                        customers={this.props.customers}
                                        projects={this.state.projects}
                                        submitHandler={this.submitHandler}
                                        changeHandler={this.changeHandler}/>
                                </ModalBody>
                            </Modal>
                            <MDBDataTableV5
                                responsive
                                striped
                                bordered
                                hover
                                entriesOptions={[10, 20, 50]}
                                entries={10}
                                pagesAmount={4}
                                data={this.state.tabledata}
                                searchTop
                                searchBottom={false}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export function getActivityById(activities, activityId) {
    let activity = activities.find(activity => activity.id === Number(activityId)) || null;
    return activity;
}

function mapStateToProps(state, ownProps) {
    const activityId = ownProps.match.params.activityId;
    const activity =
        activityId && state.activityListReducer.length > 0
            ? getActivityById(state.activityListReducer, activityId)
            : {};
    return {
        activity,
        customers: state.customerListReducer,
        activities: state.activityListReducer,
        projects: state.projectListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getCustomers: bindActionCreators(customerActions.getCustomers, dispatch),
            getProjects: bindActionCreators(projectActions.getProjects, dispatch),
            getActivities: bindActionCreators(activityActions.getActivities, dispatch),
            saveActivity: bindActionCreators(activityActions.saveActivity, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
