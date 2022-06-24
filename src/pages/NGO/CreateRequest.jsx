import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import { tokenAddress } from '../../constants';
import { ethers } from 'ethers'
import axios from 'axios';
import donation from '../../artifacts/contracts/DonationToOrganization.sol/DonationToOrganization.json'

export default function CreateRequest() {
    const navigate = useNavigate()
    const [orgName, setOrgName] = React.useState()
    const [orgAdsress, setOrgAddress] = React.useState()
    const [causeName, setCauseName] = React.useState()
    const [causeDescription, setCauseDescription] = React.useState()
    const [amount, setAmount] = React.useState(0)

    

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }

    async function createNewRequest(e) {
        e.preventDefault()
        if (typeof window.ethereum !== 'undefined') {
          await requestAccount()
          
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(tokenAddress, donation.abi, signer);
          console.log(amount);
          const transaction = await contract.createNewRequest(orgName,orgAdsress, causeName, causeDescription, amount);
          await transaction.wait();
          
          alert(`${amount} Coin/s successfully sent to create your donation to address ${orgAdsress}`);
        }
      }

      const onSubmitHandler = (e) => {
        e.preventDefault();
        const user ={
            orgName,
            orgAdsress,
            causeName,
            causeDescription,
            amount,
            
        }
    if(amount){
        if (orgName && orgAdsress && causeName && causeDescription && amount) {
          axios.post("http://localhost:5000/CreateRequest", user)
              .then((res) => {console.log(res)
                  
                alert("Registered Successfully,Please Login ")
                navigate('/');
              })
      }
    }
}


    

    return (
        <div>
            <NavBar />
            <br />
            <Container fluid="md">
                <h1 className="mb-3 fs-3 fw-normal text-center ">Create New Request</h1>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicOrg">
                        <Form.Label column sm="3">Organization Name</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeholder="Enter the organization name" 
                            onChange={e => setOrgName(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicAddress">
                        <Form.Label column sm="3">Organization Wallet Address</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeholder="Wallet Address"
                            onChange={e => setOrgAddress(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicCause">
                        <Form.Label column sm="3">Cause Name</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeholder="Cause Name"
                            onChange={e => setCauseName(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicDescription">
                        <Form.Label column sm="3">Cause Description</Form.Label>
                        <Col sm="8">
                            <Form.Control as="textarea" rows={3} placeholder="Description"
                            onChange={e => setCauseDescription(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicAmount">
                        <Form.Label column sm="3">Amount Required</Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" placeholder="Amount"
                            onChange={e => setAmount(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <br/>
                    <br/>
                    <div className='d-flex justify-content-lg-between'>
                        <Button variant="success" type="success" onClick={onSubmitHandler}>
                            Create Request
                        </Button>
                        
                        <Button variant="danger" type="danger" onClick={() => { navigate('/ngo') }}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Container>
            <br />
        </div>
    )
}
