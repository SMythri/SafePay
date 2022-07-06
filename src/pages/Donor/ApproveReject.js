import React, { useEffect, useState } from "react";
import { Button, Stack, Container, Table } from "react-bootstrap";
import NavBar from "./NavBar";
import axios from "axios";

export default function ApproveReject() {
  const [NGODetails, setNGODetails] = useState();
  const [vote, setVote] = useState(false);

  useEffect(() => {
    getDetails();
  }, []);

  async function upVote(cause) {
    setVote(!vote);
    axios.post("http://localhost:5000/approve", cause).then((res) => {
      console.log(res);
    });
    if (!alert("Alert For your User!")) {
      window.location.reload();
    }
  }

  async function downVote(cause) {
    setVote(!vote);
    axios.post("http://localhost:5000/reject", cause).then((res) => {
      console.log(res);
    });
    if (!alert("Alert For your User!")) {
      window.location.reload();
    }
  }

  async function getDetails() {
    await axios
      .get("http://localhost:5000/getdetails")
      .then((response) => {
        setNGODetails(response.data.allDetails);
        console.log(response.data.allDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <NavBar></NavBar>
      <Container>
        <h1 className="mb-3 fs-3 fw-normal text-center ">Approve/Reject</h1>
        <Table bordered hover>
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>NGO Name</th>
              <th>Cause Name</th>
              <th>Description</th>
              <th>Amount Required</th>
              <th>Wallet Address</th>
              <th>Total Votes</th>
              <th>Upvote/Downvote</th>
            </tr>
          </thead>
          <tbody>
            {NGODetails?.map((item, id) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{item.orgName}</td>
                  <td>{item.causeName}</td>
                  <td>{item.causeDescription}</td>
                  <td>{item.amount}</td>
                  <td>{item.orgAdsress}</td>
                  <td>{item.vote}</td>
                  <td>
                    <Stack direction="horizontal" gap={3}>
                      <Button
                        variant="outline-success"
                        onClick={() => upVote(item)}
                      >
                        UpVote
                      </Button>
                      <div className="vr" />
                      <Button
                        variant="outline-danger"
                        onClick={() => downVote(item)}
                      >
                        DownVote
                      </Button>
                    </Stack>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
