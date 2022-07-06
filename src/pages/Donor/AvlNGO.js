import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import NavBar from "./NavBar";

export default function AvlNGO() {
  const [NGODetails, setNGODetails] = useState();

  async function getDetails() {
    await axios
      .get("http://localhost:5000/getdetails")
      .then((response) => {
        setNGODetails(response.data.allDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <h1 className="mb-3 fs-3 fw-normal text-center ">
          List of Available NGOs
        </h1>
        <Table striped bordered hover variant="dark">
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>NGO Name</th>
              <th>Wallet Address</th>
              <th>Cause Name</th>
              <th>Amount Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {NGODetails?.map((item, id = 1) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{item.orgName}</td>
                  <td>{item.causeName}</td>
                  <td>{item.causeDescription}</td>
                  <td>{item.amount}</td>
                  <td>{item.orgAdsress}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
