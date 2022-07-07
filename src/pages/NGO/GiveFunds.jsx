import React, { useEffect, useState  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import NavBar from "./NavBar";
import { ethers } from "ethers";
import axios from "axios";

function GiveFunds({ navigations }) {
  const navigate = useNavigate();
  const [ngoAddress, setNgoAddress] = useState("");
  const [allDonations, setAllDonations] = useState("");

  let {cause, walletAddress} = useParams();

  const detailsOn = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    setNgoAddress(addr.toString());
  };

  useEffect(() => {
    detailsOn();
  }, [ngoAddress]);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function handleSendTransaction(sender, receiver, amount) {
    let gasPrice = "0x5208";
    let amountHex = (amount * Math.pow(10, 18)).toString(16);

    const tx = {
      from: sender,
      to: receiver,
      value: amountHex,
      gas: gasPrice,
    };
    await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [tx],
    });
  }

  async function distribute() {
    if (ngoAddress) {
      await axios
        .get(`http://localhost:5000/getBeneficiary/${walletAddress}/${cause}`)
        .then((response) => {
          setAllDonations(response.data.allDonations);
          console.log(response.data.allDonations)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    allDonations?.map((donate)=>{
      handleSendTransaction(ngoAddress,donate.walletAddress , 0.00000001)
    })
  }

  return (
    <div>
      <NavBar />
      <br></br>
      <div className="d-flex justify-content-around">
        <Card style={{ width: "20rem", height: "16rem" }}>
          <Card.Body>
            <Card.Title>DISTRIBUTE FUNDS</Card.Title>
            <br />
            <Button variant="success" type="success" onClick={distribute}>
              DISTRIBUTE
            </Button>
            <br /> <br />
            <Button
              variant="success"
              type="success"
              onClick={() => navigate("/ngo")}
            >
              CANCEL
            </Button>
            <br />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default GiveFunds;
