import React from "react";
import { Table, Container } from "react-bootstrap";
import NavBar from "./NavBar";

export default function HistoryOfDonation() {
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <h1 className="mb-3 fs-3 fw-normal text-center ">
          History of Donations
        </h1>
        <Table striped bordered hover variant="dark">
          <thead className='text-center'>
            <tr>
              <th>#</th>
              <th>NGO Name</th>
              <th>Wallet Address</th>
              <th>Cause Name</th>
              <th>Amount Donated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Smile Foundation</td>
              <td>wert234shjitjk</td>
              <td>Education</td>
              <td>120 Ether</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Give India Foundation</td>
              <td>1wcfgmjksldjun</td>
              <td>Covid-19</td>
              <td>130 Ether</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Care India</td>
              <td>carpoytg567vfrt</td>
              <td>Girl Eduaction</td>
              <td>100 Ether</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Smile Foundation</td>
              <td>wert234shjitjk</td>
              <td>Education</td>
              <td>120 Ether</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Give India Foundation</td>
              <td>1wcfgmjksldjun</td>
              <td>Covid-19</td>
              <td>130 Ether</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Care India</td>
              <td>carpoytg567vfrt</td>
              <td>Girl Eduaction</td>
              <td>100 Ether</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Smile Foundation</td>
              <td>wert234shjitjk</td>
              <td>Education</td>
              <td>120 Ether</td>
            </tr>
            <tr>
              <td>8</td>
              <td>Give India Foundation</td>
              <td>1wcfgmjksldjun</td>
              <td>Covid-19</td>
              <td>130 Ether</td>
            </tr>
            <tr>
              <td>9</td>
              <td>Care India</td>
              <td>carpoytg567vfrt</td>
              <td>Girl Eduaction</td>
              <td>100 Ether</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Smile Foundation</td>
              <td>wert234shjitjk</td>
              <td>Education</td>
              <td>120 Ether</td>
            </tr>
            <tr>
              <td>11</td>
              <td>Give India Foundation</td>
              <td>1wcfgmjksldjun</td>
              <td>Covid-19</td>
              <td>130 Ether</td>
            </tr>
            <tr>
              <td>12</td>
              <td>Care India</td>
              <td>carpoytg567vfrt</td>
              <td>Girl Eduaction</td>
              <td>100 Ether</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
