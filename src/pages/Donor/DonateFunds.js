import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Container } from "react-bootstrap";
import NavBar from "./NavBar";
import { ethers } from "ethers";
import donation from "../../artifacts/contracts/DonationToOrganization.sol/DonationToOrganization.json";
import axios from "axios";

function DonateFunds() {
  const [orgName, setOrgName] = useState();
  const [causeName, setCauseName] = useState();
  const [NGODetails, setNGODetails] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [beforeTransactionBalance, setBeforeBalance] = useState("");
  const [afterTransactionBalance, setAfterBalance] = useState("");

  async function getDetails() {
    await axios
      .get("http://localhost:5000/getdetails")
      .then((response) => {
        setNGODetails(response.data.allDetails);
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
  }, [NGODetails]);

  async function setOrgNameFun(e) {
    setCauseName(null);
    e.preventDefault();
    setOrgName(e.target.value);
  }
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getBalance() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    });
    let amountBalance = parseInt(balance, 16) / Math.pow(10, 18);
    return amountBalance;
  }

  async function donate(e) {
    e.preventDefault();
    if (typeof window.ethereum !== "undefined") {
      let tokenAddress;

      NGODetails.forEach((item) => {
        if (item.orgName === orgName && item.causeName === causeName) {
          tokenAddress = item.orgAdsress;
        }
      });
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      setBeforeBalance(getBalance());
      console.log("tokenAddress", tokenAddress);
      const contract = new ethers.Contract(tokenAddress, donation.abi, signer);
      const transaction = await contract.donate(orgName, causeName);
      await transaction.wait();
      if (!alert("Alert For your User!")) {
        const userDonationDetails = {
          walletAddress,
          orgName,
          causeName,
          tokenAddress,
        };
        axios
          .post("http://localhost:5000/Donations", userDonationDetails)
          .then((res) => {
            console.log(res);
            // remove after sucess
            alert("User donation details stored");
          });
      }
    }
    setAfterBalance(getBalance());

    console.log(
      "Hello",
      beforeTransactionBalance,
      afterTransactionBalance,
      beforeTransactionBalance - afterTransactionBalance
    );
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
              <Form.Select value={orgName} onChange={(e) => setOrgNameFun(e)}>
                <option selected disabled>
                  Available NGOs
                </option>
                {NGODetails?.map((item) => {
                  return <option>{item?.orgName}</option>;
                })}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="orgName">
            <Form.Label column sm="3">
              Cause
            </Form.Label>
            <Col sm="8">
              <Form.Select
                value={causeName}
                onChange={(e) => setCauseName(e.target.value)}
              >
                <option selected disabled>
                  Cause
                </option>
                {NGODetails?.map((item) => {
                  return item.orgName === orgName ? (
                    <option>{item.causeName}</option>
                  ) : null;
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
