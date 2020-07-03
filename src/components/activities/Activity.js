import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import CustomerList from '../customers/CustomerList';
import ActivityList from './ActivityList';

export default class Activity extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row className="titleTop">
                        <Col sm={3}>
                            <CustomerList />
                        </Col>
                        <Col sm={9}>
                            <ActivityList />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
