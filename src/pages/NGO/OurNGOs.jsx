import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import NavBar from "./NavBar";
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';


export default function OurNGOs() {
  const navigate = useNavigate()
  const [causes, setAllCauses] = useState();
  const [walletAddress, setWalletAddress] = useState(null);

  const detailsOn = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    setWalletAddress(addr.toString());
  };

  async function getDetails() {
    if (walletAddress) {
      await axios
        .get(`http://localhost:5000/getdetails/${walletAddress}`)
        .then((response) => {
          setAllCauses(response.data.allDetails);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    detailsOn();
  }, []);

  useEffect(() => {
    getDetails();
  }, [walletAddress]);

  async function fundingPage(item){
    navigate(`/Fund/${item.causeName}/${item.orgAdsress}`)
  }
  return (
    <>
      <NavBar />
      <Container>
        <h1 className="mb-3 fs-3 fw-normal text-center ">
          List of Available NGOs
        </h1>
        {causes ? (
          <Table striped bordered hover variant="dark">
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th>Cause Name</th>
                <th>Cause Description</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {causes?.map((item, id = 1) => {
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{item.causeName}</td>
                    <td>{item.causeDescription}</td>
                    <td>
                      <button onClick={() => fundingPage(item)}>DISTRIBUTE FUNDS</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <Table>YOU DO NOT HAVE ANY ACTIVE CAUSES</Table>
        )}
      </Container>
    </>
  );
}
