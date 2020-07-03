import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="special-color" className="fixed-bottom font-small pt-4 mt-4 footer-copyright text-center py-3">
      <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright <a href="https://www.ploud.com.tr" target="_blank" rel="noopener noreferrer"> Ploud </a>
      </MDBContainer>
    </MDBFooter>
  );
}

export default FooterPage;