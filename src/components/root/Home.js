import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Jumbotron from './Jumbotron';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Jumbotron />
                </Container>
            </div>
        )
    }
}