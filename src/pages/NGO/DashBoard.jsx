import React from 'react'
import image from "../../assets/oneee.jpg";
import { Card, Container } from "react-bootstrap";

export default function DashBoard() {
  return (
    <>
      <Container>
      <h1 className="mb-3 fs-3 fw-normal text-center ">Active Request</h1>
      <div className="d-flex bd-highlight justify-content-sm-center flex-wrap">
        <Card style={{ width: "20rem", height: "18rem" }} className="m-2 bd-highlight">
          <Card.Body>
            <Card.Img variant="top" src="oneee.jpg" />
            <Card.Title>Cause Name</Card.Title>
            <Card.Text>
              Cause Description
            </Card.Text>
            <Card.Text>
              Amount Required
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "20rem", height: "18rem" }} className="m-2 bd-highlight">
          <Card.Body>
            <Card.Img variant="top" src="oneee.jpg" />
            <Card.Title>Cause Name</Card.Title>
            <Card.Text>
              Cause Description
            </Card.Text>
            <Card.Text>
              Amount Required
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "20rem", height: "18rem" }} className="m-2 bd-highlight">
          <Card.Body>
            <Card.Img variant="top" src="oneee.jpg" />
            <Card.Title>Cause Name</Card.Title>
            <Card.Text>
              Cause Description
            </Card.Text>
            <Card.Text>
              Amount Required
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "20rem", height: "18rem" }} className="m-2 bd-highlight">
          <Card.Body>
            <Card.Img variant="top" src="oneee.jpg" />
            <Card.Title>Cause Name</Card.Title>
            <Card.Text>
              Cause Description
            </Card.Text>
            <Card.Text>
              Amount Required
            </Card.Text>
          </Card.Body>
        </Card>
        
        <Card style={{ width: "20rem", height: "18rem" }} className="m-2 bd-highlight">
          <Card.Body>
            <Card.Img variant="top" src="oneee.jpg" />
            <Card.Title>Cause Name</Card.Title>
            <Card.Text>
              Cause Description
            </Card.Text>
            <Card.Text>
              Amount Required
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "20rem", height: "18rem" }} className="m-2 bd-highlight">
          <Card.Body>
            <Card.Img variant="top" src="oneee.jpg" />
            <Card.Title>Cause Name</Card.Title>
            <Card.Text>
              Cause Description
            </Card.Text>
            <Card.Text>
              Amount Required
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
      </Container>
    <br/>
    </>
  )
}
