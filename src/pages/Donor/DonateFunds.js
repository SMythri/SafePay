import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Container } from "react-bootstrap";
import NavBar from "./NavBar";
import { tokenAddress } from '../../constants';
import { ethers } from 'ethers'
import donation from '../../artifacts/contracts/DonationToOrganization.sol/DonationToOrganization.json'
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";


function DonateFunds() {
  const [orgName, setOrgName] = useState();
  const [causeName, setCauseName] = useState();
  const [NGODetails, setNGODetails] = useState();

  async function getDetails() {
    await axios.get("http://localhost:5000/getdetails").then((response) => {
      setNGODetails(response.data.allDetails)
    }).catch((error) => { console.log(error) })
  }

  useEffect(()=>{
    getDetails();
    
  },[NGODetails])

  // async function fetchGreeting() {
  //   if (typeof window.ethereum !== 'undefined') {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     console.log({ provider })
  //     const contract = new ethers.Contract(tokenAddress, donation.abi, provider)
  //     console.log({ contract })
  //     try {
  //       console.log("Hi")
  //       data = await contract.requests(0);
  //       console.log('data: ', JSON.stringify(data))
  //     } catch (err) {
  //       console.log("Error: ", err)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   fetchGreeting()
  // }, [])

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function donate(e) {
    e.preventDefault()
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const contract = new ethers.Contract(tokenAddress, donation.abi, signer);
      const transaction = await contract.donate(orgName,causeName);
      await transaction.wait();
      alert(` Donation successfully sent!!!`);
    }
  }
  return (
    <>
      <NavBar />      
      <br></br>
      <Container fluid="md">
        <h1 className="mb-3 fs-3 fw-normal text-center ">DONATE HERE</h1>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="orgName">
            <Form.Label column sm="3">
              Name of the Organization
            </Form.Label>
            <Col sm="8">
              <Form.Select value={orgName} onChange={e => setOrgName(e.target.value)}>
                <option selected disabled>
                  Available NGOs
                </option>
                {NGODetails?.map((item)=>{
                  return (<option>{item?.orgName}</option>)
                  
                })}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="orgName">
            <Form.Label column sm="3">
              Cause
            </Form.Label>
            <Col sm="8">
              <Form.Select value={causeName} onChange={e => setCauseName(e.target.value)}>
                <option selected disabled>
                  Cause
                </option>
               {NGODetails?.map((item)=>{
                return <option>{item.causeName}</option>
               })}
              </Form.Select>
            </Col>
          </Form.Group>

          <br></br>
          <div class="d-grid col-2 mx-auto">
            <button class="btn btn-success" type="button" onClick={donate}>
              Donate
            </button>
          </div>
        </Form>
        <br></br>
      </Container>
    </>
  );
}

export default DonateFunds;
