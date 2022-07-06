import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import NavBar from "./NavBar";
import axios from "axios";
import { ethers } from "ethers";

export default function HistoryOfDonation() {
  const [allDonation, setAllDonations] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  async function getDetails() {
    await axios
      .get("http://localhost:5000/Donations")
      .then((response) => {
        setAllDonations(response.data.allDonations);
        console.log(response.data.allDonations);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const detailsOn = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    setWalletAddress(addr.toString());
  };

  useEffect(() => {
    detailsOn();
  }, [walletAddress]);

  useEffect(() => {
    getDetails();
  }, [allDonation]);

  return (
    <>
      <NavBar></NavBar>
      <Container>
        <h1 className="mb-3 fs-3 fw-normal text-center ">
          History of Donations
        </h1>
        <Table striped bordered hover variant="dark">
          {/* {allDonation?.map((item) => {
            if (item.walletAddress === walletAddress) return item;
            return null;
          })} */}
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>NGO Name</th>
              <th>Cause Name</th>
              <th>Wallet Address</th>
              <th>Amount Donated</th>
            </tr>
          </thead>
          <tbody>
            {allDonation?.map((item, id) => {
              return item.walletAddress === walletAddress ? (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{item.orgName}</td>
                  <td>{item.causeName}</td>
                  <td>{item.tokenAddress}</td>
                </tr>
              ) : null;
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
