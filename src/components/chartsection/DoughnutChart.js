import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact';
import { Doughnut} from 'react-chartjs-2';

class ChartSection2 extends Component {
    render() {
        const dataDoughnut = {
            labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
            datasets: [{
                data: [300, 50, 100, 40, 120],
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
            }]
        };

        return (
            <MDBCard className="mb-3">
                <MDBCardHeader>User's Activities</MDBCardHeader>
                <MDBCardBody >
                    <Doughnut data={dataDoughnut} height={400} options={{ responsive: true }} />
                </MDBCardBody>
            </MDBCard>
        )
    }
}

export default ChartSection2;