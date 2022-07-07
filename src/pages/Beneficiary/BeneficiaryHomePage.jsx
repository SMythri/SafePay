import React, { useState } from "react";
// import image from "../../assets/oneee.jpg";
import NavBar from "./NavBar";
import { Card } from "react-bootstrap";
import BeneficiaryProfile from "./BeneficiaryProfile";

function BeneficiaryHome() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <div>
        <NavBar setModalShow={setModalShow} />
        <BeneficiaryProfile show={modalShow} onHide={() => setModalShow(false)} />
      </div>
      <br></br>
      <div className="d-flex justify-content-around">
        <Card style={{ width: "20rem", height: "16rem" }}>
          <Card.Body>
            <Card.Title>Register to a cause</Card.Title>
            <br />
            <Card.Subtitle>Get the help you require by registering to one of the causes</Card.Subtitle>
            <br/>
            <Card.Text>Please Note: To reach more people through our website, You can register for only one cause at a time</Card.Text>
          
          </Card.Body>
          <Card.Footer>
            <Card.Link href="/registerToCause">Click here</Card.Link>
          </Card.Footer>
        </Card>
      </div>
      
    </div>
  );
}
export default BeneficiaryHome;
