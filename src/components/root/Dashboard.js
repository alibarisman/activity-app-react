import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import CustomerList from '../customers/CustomerList';
import ActivityList from '../activities/ActivityList';

export default class DashBoard extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={2}>
                            <CustomerList />
                        </Col>
                        <Col sm={10}>
                            <ActivityList />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
