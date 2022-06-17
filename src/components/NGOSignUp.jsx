import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import Header from './Header';

export default function NGOSignUp() {
    const [orgName, setOrgName] = useState("");
    const [owner, setOwnerName] = useState("");
    const [aadhar, setAdhaar] = useState("");
    const [certificate, setCertificate] = useState("");
    const [orgAddress, setWallet] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const user ={
            orgName,
            owner,
            aadhar,
            certificate,
            orgAddress,
            password
        }

        if(confirmPassword === password){

            if (orgName && owner && aadhar && certificate && orgAddress && password) {
                axios.post("http://localhost:5000/RegisterNGO", user)
                    .then((res) => {console.log(res)
                        alert("Registered Successfully,Please Login ")
                        navigate('/');
                    })
            }
            else {
                alert("invalid input");
            }
        }else{
            alert("Password didnt match");
        }

        
    }
        return (
            <>
                <Header />
                <br />
                <Container>
                    <h1 className="mb-3 fs-3 fw-normal text-center ">Register As NGO</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formOrganizationName">
                            <Form.Label>Organiation Name</Form.Label>
                            <Form.Control type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="Enter your Organization" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicOwner">
                            <Form.Label>Owner Name</Form.Label>
                            <Form.Control type="text" value={owner} onChange={(e) => setOwnerName(e.target.value)} placeholder="Enter Owner Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId='formBasicId'>
                            <Form.Label>Addhaar Number</Form.Label>
                            <Form.Control type="text" value={aadhar} onChange={(e) => setAdhaar(e.target.value)} placeholder='Enter Addhaar Number' />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId='formBasicCerificate'>
                            <Form.Label>Certificate Number</Form.Label>
                            <Form.Control type="text" value={certificate} onChange={(e) => setCertificate(e.target.value)} placeholder='Enter Certificate Number' />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicWallet">
                            <Form.Label>Wallet address</Form.Label>
                            <Form.Control type="text" value={orgAddress} onChange={(e) => setWallet(e.target.value)} placeholder="Enter your wallet address" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={onSubmitHandler}>
                            Sign Up
                        </Button>
                    </Form>
                </Container>
                <br />
            </>
        )
    }
