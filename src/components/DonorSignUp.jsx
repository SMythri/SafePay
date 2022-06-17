import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import Header from './Header';

export default function NGOSignUp() {

    const [donor, setDonor] = useState("");
    const [email, setEmail] = useState("");
    const [aadhar, setAdhaar] = useState("");
    const [walletAddress, setwalletAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const user ={
            donor,
            email,
            aadhar,
            walletAddress,
            password
        }

        if(confirmPassword === password){

            if (donor && email && aadhar && walletAddress && password) {
                axios.post("http://localhost:5000/RegisterDonor", user)
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
        <Header/>
        <br />
        <Container>
            <h1 className="mb-3 fs-3 fw-normal text-center ">Register As Donor</h1>
            <Form>
                
                <Form.Group className="mb-3" controlId="formBasicDonor">
                    <Form.Label>Donor Name</Form.Label>
                    <Form.Control type="text" value={donor} onChange={(e) => setDonor(e.target.value)} placeholder="Enter Donor Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Donor Email Id</Form.Label>
                    <Form.Control type="email"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Donor email id" />
                </Form.Group>

                <Form.Group className="mb-3" controlId='formBasicId'>
                    <Form.Label>Addhaar Number</Form.Label>
                    <Form.Control type="text" value={aadhar} onChange={(e) => setAdhaar(e.target.value)} placeholder='Enter Addhaar Number'/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicWallet">
                    <Form.Label>Wallet address</Form.Label>
                    <Form.Control type="text" value={walletAddress} onChange={(e) => setwalletAddress(e.target.value)} placeholder="Enter your wallet address" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
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
