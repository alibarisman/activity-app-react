import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../../redux/actions/projectActions';
import * as customerActions from '../../redux/actions/customerActions';
import { Container, Button, Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MDBDataTableV5, MDBIcon } from 'mdbreact';
import SideNav from '../sidenav/SideNav';
import ProjectModal from '../modals/ProjectModal';
import alertify from "alertifyjs";

class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabledata: '',
            modalTitle: 'Add Project',
            id: '',
            projectName:'',
            customerId: '',
            city: '',
            sector: '',
            status: '',
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    };

    tableColumns = [
        {
            label: 'Project Id',
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
            label: 'Project Name',
            field: 'projectName'
        },
        {
            label: 'Customer',
            field: 'customerId'
        },
        {
            label: 'City',
            field: 'city'
        },
        {
            label: 'Sector',
            field: 'sector'
        },
        {
            label: 'Status',
            field: 'status'
        }
    ];

    handleOpenModal(id) {
        this.setState({ modal: true });

        if (!isNaN(id)) {
            let project = this.props.projects.find(project => project.id === id);
            debugger;
            this.setState({
                modalTitle: 'Update Project',
                id: project.id,
                projectName: project.projectName,
                customerId: project.customerId,
                city: project.city,
                sector: project.sector,
                status: project.status
            });
        }
        else {
            this.setState({
                modalTitle: 'Add Project',
                id: '',
                projectName: '',
                customerId: '',
                city: '',
                sector: '',
                status: ''
            });
        }
    }

    handleCloseModal() {
        this.setState({ modal: false });
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";

        if (this.state.projectName === "" || this.state.customerId === "" || this.state.city === "" || this.state.sector === "" || this.state.status === "") {
            return;
        }

        const project = {
            id: this.state.id,
            projectName: this.state.projectName,
            customerId: parseInt(this.state.customerId),
            city: this.state.city,
            sector: this.state.sector,
            status: this.state.status
        }

        this.props.actions.saveProject(project).then(() => {
            this.props.actions.getProjects();
        });

        this.handleCloseModal();
        alertify.alert('Successful', 'The project has been successfully saved');

        if (this.props.projects.length > 0) {
            const tableRows = []

            for (let i = 0; i < this.props.projects.length; i++) {

                let id = this.props.projects[i].id;

                const tableRow = {
                    edit: <Button size="sm" style={{ borderRadius: 24 }} color="primary" onClick={() => this.handleOpenModal(id)}><MDBIcon icon="edit" />Edit</Button>,
                    id: this.props.projects[i].id,
                    projectName: this.props.projects[i].projectName,
                    customerId: this.props.projects[i].customerId,
                    city: <p style={{ width: 100 }}>{this.props.projects[i].city}</p>,
                    sector: this.props.projects[i].sector,
                    status: this.props.projects[i].status
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
        this.props.actions.getCustomers();
        this.props.actions.getProjects();
    }

    render() {
        if (this.props.projects.length > 0) {
            const tableRows = [];

            for (let i = 0; i < this.props.projects.length; i++) {

                let id = this.props.projects[i].id;
                let customer = this.props.customers.find(customer => customer.id === this.props.projects[i].customerId) || null;
                debugger;
                const tableRow = {
                    edit: <Button size="sm" style={{ borderRadius: 24 }} color="primary" onClick={() => this.handleOpenModal(id)}><MDBIcon icon="edit" />Edit</Button>,
                    id: this.props.projects[i].id,
                    projectName: this.props.projects[i].projectName,
                    customerId: this.props.projects[i].customerId + " - " + customer.customerName,
                    city: this.props.projects[i].city,
                    sector: this.props.projects[i].sector,
                    status: this.props.projects[i].status
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
                            <h2 className="titleTop">Project List</h2>
                            <hr />
                            <Button className="borderRadius" color='danger' onClick={this.handleOpenModal}>Add Project</Button>
                            <Modal isOpen={this.state.modal} className={this.props.className}>
                                <ModalHeader toggle={this.handleCloseModal}>{this.state.modalTitle}</ModalHeader>
                                <ModalBody>
                                    <ProjectModal
                                        id={this.state.id}
                                        projectName={this.state.projectName}
                                        customerId={this.state.customerId}
                                        city={this.state.city}
                                        sector={this.state.sector}
                                        status={this.state.status}
                                        customers={this.props.customers}
                                        submitHandler={this.submitHandler}
                                        changeHandler={this.changeHandler} />
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

export function getProjectById(projects, projectId) {
    let project = projects.find(project => project.id === Number(projectId)) || null;
    return project;
}

function mapStateToProps(state, ownProps) {
    const projectId = ownProps.match.params.projectId;
    const project =
        projectId && state.projectListReducer.length > 0
            ? getProjectById(state.projectListReducer, projectId)
            : {};
    return {
        project,
        customers: state.customerListReducer,
        projects: state.projectListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getCustomers: bindActionCreators(customerActions.getCustomers, dispatch),
            getProjects: bindActionCreators(projectActions.getProjects, dispatch),
            saveProject: bindActionCreators(projectActions.saveProject, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
