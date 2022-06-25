import React, { useEffect, useState } from 'react';
import image from "../../assets/oneee.jpg";
import { Card, Container } from "react-bootstrap";

import axios from "axios";

export default function DashBoard() {

  const [NGODetails, setNGODetails] = useState();

  async function getDetails() {
    await axios.get("http://localhost:5000/getdetails").then((response) => {
      setNGODetails(response.data.allDetails)
    }).catch((error) => { console.log(error) })
  }

  useEffect(() => {
    getDetails();
    console.log("in dashboard")
  }, [NGODetails])
  return (
    <>
      <Container>
        <h1 className="mb-3 fs-3 fw-normal text-center ">Active Request</h1>
        <div className="d-flex bd-highlight justify-content-sm-center flex-wrap">
          {NGODetails?.map((item) => {
            return (<>
              <Card style={{ width: "20rem", height: "18rem" }} className="m-2 bd-highlight">
                <Card.Body>
                  <Card.Img variant="top" src="oneee.jpg" />

                  <Card.Title>{item.causeName}</Card.Title>
                  <Card.Text>
                    {item.causeDescription}
                  </Card.Text>
                  <Card.Text>
                    {item.amount}
                  </Card.Text>


              </Card.Body>
            </Card></>)
          })}



        </div>
      </Container>
      <br />
    </>
  )
}
