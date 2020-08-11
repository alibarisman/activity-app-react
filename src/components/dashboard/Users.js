import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/userActions';
import { Container, Button, Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MDBDataTableV5, MDBIcon } from 'mdbreact';
import SideNav from '../sidenav/SideNav';
import UserModal from '../modals/UserModal';
import alertify from "alertifyjs";

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            tabledata: '',
            modalTitle: 'Add User',
            id: '',
            name: '',
            email: '',
            phone: '',
            type: '',
            status: ''
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    };

    tableColumns = [
        {
            label: 'User Id',
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
            label: 'User Name',
            field: 'userName'

        },
        {
            label: 'User Email',
            field: 'email'

        },
        {
            label: 'User Phone',
            field: 'phone'

        },
        {
            label: 'User Type',
            field: 'type'
        },
        {
            label: 'Status',
            field: 'status'
        },
    ];

    handleOpenModal(id) {
        this.setState({ modal: true });

        if (!isNaN(id)) {
            let user = this.props.users.find(user => user.id === id);

            this.setState({
                modalTitle: 'Update User',
                id: user.id,
                name: user.userName,
                email: user.email,
                phone: user.phone,
                type: user.type,
                status: user.status
            });
        }
        else{
            this.setState({
                modalTitle: 'Add User',
                id: '',
                name: '',
                email: '',
                phone: '',
                type: '',
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

        if(this.state.name === "" || this.state.email === "" || this.state.phone === "" || this.state.type === "" || this.state.status === "") {
            return;
        }

        const user = {
            id: this.state.id,
            userName: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            type: this.state.type,
            status: this.state.status
        }

        this.props.actions.saveUser(user).then(() => {
            this.props.actions.getUsers();
        });

        this.handleCloseModal();
        alertify.alert('Successful', 'The user has been successfully saved');

        if (this.props.users.length > 0) {
            const tableRows = []

            for (let i = 0; i < this.props.users.length; i++) {

                let id = this.props.users[i].id;

                const tableRow = {
                    edit: <Button size="sm" style={{ borderRadius: 24 }} color="primary" onClick={() => this.handleOpenModal(id)}><MDBIcon icon="edit" />Edit</Button>,
                    id: this.props.users[i].id,
                    userName: this.props.users[i].userName,
                    email: this.props.users[i].email,
                    phone: this.props.users[i].phone,
                    type: this.props.users[i].type,
                    status: this.props.users[i].status
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
        this.props.actions.getUsers();
    };

    render() {
        if (this.props.users.length > 0) {
            const tableRows = []

            for (let i = 0; i < this.props.users.length; i++) {

                let id = this.props.users[i].id;

                const tableRow = {
                    edit: <Button size="sm" style={{ borderRadius: 24 }} color="primary" onClick={() => this.handleOpenModal(id)}><MDBIcon icon="edit" />Edit</Button>,
                    id: this.props.users[i].id,
                    userName: this.props.users[i].userName,
                    email: this.props.users[i].email,
                    phone: this.props.users[i].phone,
                    type: this.props.users[i].type,
                    status: this.props.users[i].status
                }

                tableRows.push(tableRow);
            }

            const datatable = {
                columns: this.tableColumns,
                rows: tableRows
            }

            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.tabledata = datatable;
        }

        return (
            <div>
                <SideNav />
                <Container>
                    <Row>
                        <Col xs="2"></Col>
                        <Col xs="10">
                            <h2 className="titleTop">User List</h2>
                            <hr />
                            <Button className="borderRadius" color='warning' onClick={this.handleOpenModal}>Add User</Button>
                            <Modal isOpen={this.state.modal} className={this.props.className}>
                                <ModalHeader toggle={this.handleCloseModal}>{this.state.modalTitle}</ModalHeader>
                                <ModalBody>
                                    <UserModal
                                        name={this.state.name}
                                        email={this.state.email}
                                        phone={this.state.phone}
                                        type={this.state.type}
                                        status={this.state.status}
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
            </div >
        )
    }
}

export function getUserById(users, userId) {
    let user = users.find(user => user.id === Number(userId)) || null;
    return user;
}

function mapStateToProps(state, ownProps) {
    const userId = ownProps.match.params.userId;
    const user =
        userId && state.userListReducer.length > 0
            ? getUserById(state.userListReducer, userId)
            : {};
    return {
        user,
        users: state.userListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getUsers: bindActionCreators(userActions.getUsers, dispatch),
            saveUser: bindActionCreators(userActions.saveUser, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);