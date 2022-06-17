import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";

export default function DonorSignIn(props) {
  const [walletAddress, setWalletAddress] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/donorRegistration");
    props.onHide();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const user = {
      walletAddress,
      password,
    };
    if (walletAddress && password) {
      axios
        .post("http://localhost:5000/LoginDonor", user)
        .then((res) => {
            navigate("/donorHomePage");
            props.onHide();
        })
        .catch((e) => {
          alert("Invaid username or password")
          navigate("/");
        })
        .finally(() => {
          setWalletAddress("");
          setPassword("");
        });
    } else {
        navigate("/");
        alert("invalid input");
        setWalletAddress("");
        setPassword("");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Signin as Donor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicWallet">
            <Form.Label>Wallet address</Form.Label>
            <Form.Control
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter your wallet address"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={onSubmitHandler}>
            Sign In
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        Don't have an account?
        <Button variant="link" onClick={onClickHandler}>
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
