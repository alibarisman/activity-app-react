import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as customerActions from '../../redux/actions/customerActions';
import { Container, Button, Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MDBDataTableV5, MDBIcon } from 'mdbreact';
import Image from 'react-bootstrap/Image';
import SideNav from '../sidenav/SideNav';
import CustomerModal from '../modals/CustomerModal';
import alertify from "alertifyjs";

class Customers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabledata: '',
            modalTitle: 'Add Customer',
            id: '',
            name: '',
            logo: '',
            city: '',
            status: ''
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    tableColumns = [
        {
            label: 'Company Id',
            field: 'id',
            attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Id'
            }
        },
        {
            label: 'Edit',
            field: 'edit'
        },
        {
            label: 'Logo',
            field: 'logo'

        },
        {
            label: 'Company Name',
            field: 'customerName'

        },
        {
            label: 'City',
            field: 'city'

        },
        {
            label: 'Status',
            field: 'status'
        }
    ];

    handleOpenModal(id) {
        this.setState({ modal: true });

        if (!isNaN(id)) {
            let customer = this.props.customers.find(customer => customer.id === id);

            this.setState({
                modalTitle: 'Update Customer',
                id: customer.id,
                name: customer.customerName,
                // logo: customer.logo,
                city: customer.city,
                status: customer.status
            });
        }
        else {
            this.setState({
                modalTitle: 'Add Customer',
                id: '',
                name: '',
                // logo: '',
                city: '',
                status: ''
            });
        }
    }

    handleCloseModal() {
        this.setState({ modal: false });
    }

    changeHandler = event => {
        debugger;
        this.setState({ [event.target.name]: event.target.value });

        if (event.target.name === "logo") {
            const logo = event.target.files[0];
            console.log(logo);

        }
    };

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";

        if (this.state.name === "" || this.state.city === "" || this.state.status === "") {
            return;
        }

        const customer = {
            id: this.state.id,
            customerName: this.state.name,
            city: this.state.city,
            status: this.state.status
        }

        this.props.actions.saveCustomer(customer).then(() => {
            this.props.actions.getCustomers();
        });

        this.handleCloseModal();
        alertify.alert('Successful', 'The customer has been successfully saved');

        if (this.props.customers.length > 0) {
            const tableRows = []

            for (let i = 0; i < this.props.customers.length; i++) {

                let id = this.props.customers[i].id;

                const tableRow = {
                    edit: <Button size="sm" style={{ borderRadius: 24 }} color="primary" onClick={() => this.handleOpenModal(id)}><MDBIcon icon="edit" />Edit</Button>,
                    id: this.props.customers[i].id,
                    logo: <Image style={{ cursor: 'pointer' }} onClick={this.onClickImage} width="50" height="50" src={'../../logo/' + this.props.customers[i].customerName + '.png'} thumbnail />,
                    customerName: this.props.customers[i].customerName,
                    city: this.props.customers[i].city,
                    status: this.props.customers[i].status,
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

    }

    componentDidMount() {
        this.props.actions.getCustomers();
    }

    render() {
        if (this.props.customers.length > 0) {
            const tableRows = []

            for (let i = 0; i < this.props.customers.length; i++) {

                let id = this.props.customers[i].id;

                const tableRow = {
                    edit: <Button size="sm" style={{ borderRadius: 24 }} color="primary" onClick={() => this.handleOpenModal(id)}><MDBIcon icon="edit" />Edit</Button>,
                    id: this.props.customers[i].id,
                    logo: <Image style={{ cursor: 'pointer' }} onClick={this.onClickImage} width="50" height="50" src={'../../logo/' + this.props.customers[i].customerName + '.png'} thumbnail />,
                    customerName: this.props.customers[i].customerName,
                    city: this.props.customers[i].city,
                    status: this.props.customers[i].status,
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
                            <h2 className="titleTop">Customer List</h2>
                            <hr />
                            <Button className="borderRadius" color='success' onClick={this.handleOpenModal}>Add Customer Modal</Button>
                            <Modal isOpen={this.state.modal} className={this.props.className}>
                                <ModalHeader toggle={this.handleCloseModal}>{this.state.modalTitle}</ModalHeader>
                                <ModalBody>
                                    <CustomerModal
                                        name={this.state.name}
                                        logo={this.state.logo}
                                        city={this.state.city}
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
            </div>
        )
    }
}

export function getCustomerById(customers, customerId) {
    let customer = customers.find(customer => customer.id === Number(customerId)) || null;
    return customer;
}

function mapStateToProps(state, ownProps) {
    const customerId = ownProps.match.params.customerId;
    const customer =
        customerId && state.customerListReducer.length > 0
            ? getCustomerById(state.customerListReducer, customerId)
            : {};
    return {
        customer,
        customers: state.customerListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getCustomers: bindActionCreators(customerActions.getCustomers, dispatch),
            saveCustomer: bindActionCreators(customerActions.saveCustomer, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);