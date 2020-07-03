import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Jumbotron from './Jumbotron';
import Footer from '../footer/Footer';

export default class Home extends Component {
    render() {
        return (
            <div style={{ paddingBottom: 50 }}>
                <Container>
                    <Jumbotron />
                </Container>
                <Footer />
            </div>
        )
    }
}