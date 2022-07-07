import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import Header from './Header';
import validator from 'validator';
import './Style.css';

export default function BeneficiarySignUp() {

    const [beneficiary, setBeneficiary] = useState("");
    const [email, setEmail] = useState("");
    const [aadhar, setAdhaar] = useState("");
    const [walletAddress, setwalletAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [orgAdsress,] = useState('');
    const [causeName] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [aadharError, setAdhaarError] = useState("");


    const navigate = useNavigate();

    const validateEmail = (e) => {
        e.preventDefault();

        setEmail(e.target.value);
        if (!validator.isEmail(email)) {
            setEmailError(true)
        }
        else {
            setEmailError(false)
        }
    }

    const validateAadhar = (e) => {
        e.preventDefault();

        setAdhaar(e.target.value);
        if (!validator.isNumeric(e.target.value)) {
            setAdhaarError(true)
        }
        else {
            setAdhaarError(false)
        }
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();

        const user = {
            beneficiary,
            email,
            aadhar,
            walletAddress,
            password,
            orgAdsress, 
            causeName
        }

        if (confirmPassword === password) {

            if (beneficiary && email && aadhar.length === 16 && walletAddress && password) {
                axios.post("http://localhost:5000/RegisterBeneficiary", user)
                    .then((res) => {
                        console.log(res)
                        alert("Registered Successfully,Please Login ")
                        navigate('/');
                    })
            }
            else if (aadhar.length !== 16) {
                alert("Aadhar number should have 16 digits")
            }
            else {
                alert("Please enter all the details");
            }
        } else {
            alert("Password didnt match");
        }


    }

    return (
        <>
            <Header />
            <br />
            <Container>
                <h1 className="mb-3 fs-3 fw-normal text-center ">Register As Donor</h1>
                <Form>

                    <Form.Group className="mb-3" controlId="formBasicDonor">
                        <Form.Label>Donor Name</Form.Label>
                        <Form.Control type="text" value={beneficiary} onChange={(e) => setBeneficiary(e.target.value)} placeholder="Enter Donor Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Donor Email Id</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => validateEmail(e)} placeholder="Enter Donor email id" />
                        {emailError ? <div className='error-text'>{'Enter a valid email id'}</div> : <></>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='formBasicId'>
                        <Form.Label>Addhaar Number</Form.Label>
                        <Form.Control type="text" value={aadhar} onChange={(e) => validateAadhar(e)} placeholder='Enter Addhaar Number' />
                        {aadharError ? <div className='error-text'>{'Enter a valid Aadhar number'}</div> : <></>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicWallet">
                        <Form.Label>Wallet address</Form.Label>
                        <Form.Control type="text" value={walletAddress} onChange={(e) => setwalletAddress(e.target.value)} placeholder="Enter your wallet address" />
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
