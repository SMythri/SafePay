import React from "react";
import {
  Button,
  Stack,
  Container,
  Table,
} from "react-bootstrap";
import NavBar from "./NavBar";

export default function ApproveReject() {
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <h1 className="mb-3 fs-3 fw-normal text-center ">Approve/Reject</h1>
        <Table bordered hover>
          <thead className='text-center'>
            <tr>
              <th>#</th>
              <th>NGO Name</th>
              <th>Wallet Address</th>
              <th>Cause Name</th>
              <th>Amount Required</th>
              <th>Description</th>
              <th>Approve/Reject</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Smile Foundation</td>
              <td>wert234shjitjk</td>
              <td>Education</td>
              <td>120 Ether</td>
              <td>
                voluntary group or institution with a social mission, which
                operates independently from the government
              </td>
              <td>
                {" "}
                <Stack direction="horizontal" gap={3}>
                  <Button variant="outline-success">Approve</Button>
                  <div className="vr" />
                  <Button variant="outline-danger">Reject</Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Give India Foundation</td>
              <td>1wcfgmjksldjun</td>
              <td>Covid-19</td>
              <td>130 Ether</td>
              <td>
                voluntary group or institution with a social mission, which
                operates independently from the government
              </td>
              <td>
                {" "}
                <Stack direction="horizontal" gap={3}>
                  <Button variant="outline-success">Approve</Button>
                  <div className="vr" />
                  <Button variant="outline-danger">Reject</Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Care India</td>
              <td>carpoytg567vfrt</td>
              <td>Girl Eduaction</td>
              <td>100 Ether</td>
              <td>
                voluntary group or institution with a social mission, which
                operates independently from the government
              </td>
              <td>
                {" "}
                <Stack direction="horizontal" gap={3}>
                  <Button variant="outline-success">Approve</Button>
                  <div className="vr" />
                  <Button variant="outline-danger">Reject</Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Smile Foundation</td>
              <td>wert234shjitjk</td>
              <td>Education</td>
              <td>120 Ether</td>
              <td>
                voluntary group or institution with a social mission, which
                operates independently from the government
              </td>
              <td>
                {" "}
                <Stack direction="horizontal" gap={3}>
                  <Button variant="outline-success">Approve</Button>
                  <div className="vr" />
                  <Button variant="outline-danger">Reject</Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Give India Foundation</td>
              <td>1wcfgmjksldjun</td>
              <td>Covid-19</td>
              <td>130 Ether</td>
              <td>
                voluntary group or institution with a social mission, which
                operates independently from the government
              </td>
              <td>
                {" "}
                <Stack direction="horizontal" gap={3}>
                  <Button variant="outline-success">Approve</Button>
                  <div className="vr" />
                  <Button variant="outline-danger">Reject</Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>Care India</td>
              <td>carpoytg567vfrt</td>
              <td>Girl Eduaction</td>
              <td>100 Ether</td>
              <td>
                voluntary group or institution with a social mission, which
                operates independently from the government
              </td>
              <td>
                {" "}
                <Stack direction="horizontal" gap={3}>
                  <Button variant="outline-success">Approve</Button>
                  <div className="vr" />
                  <Button variant="outline-danger">Reject</Button>
                </Stack>
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>Smile Foundation</td>
              <td>wert234shjitjk</td>
              <td>Education</td>
              <td>120 Ether</td>
              <td>
                voluntary group or institution with a social mission, which
                operates independently from the government
              </td>
              <td>
                {" "}
                <Stack direction="horizontal" gap={3}>
                  <Button variant="outline-success">Approve</Button>
                  <div className="vr" />
                  <Button variant="outline-danger">Reject</Button>
                </Stack>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
