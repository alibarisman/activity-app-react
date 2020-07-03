import React, { Component } from 'react'
import SideNav from '../sidenav/SideNav';
import CardGroup from '../cardgroup/CardGroup';
import PieChart from '../chartsection/PieChart';
// import DoughnutChart from '../chartsection/DoughnutChart';
import ListGroup from '../listgroup/ListGroup';
import { Container, Row, Col } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <SideNav />
                <Container className="d-flex justify-content-center mt-6">
                    <Row>
                        <Col md='12' style={{ marginTop: 15 }}>
                            <h3 style={{ marginLeft: 10 }} className="d-flex justify-content-center mt-6">Dashboard Menu</h3>
                            <hr style={{ marginLeft: 60 }} />
                            <CardGroup />
                        </Col>
                        <Col md="12" lg="4" className="mb-4 chart">
                            <PieChart />
                        </Col>
                        {/* <Col md="12" lg="3" className="mb-4 chart">
                            <DoughnutChart />
                        </Col> */}
                        <Col md="12" lg="4" className="mb-4" style={{ marginLeft: 60 }}>
                            <ListGroup />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;
