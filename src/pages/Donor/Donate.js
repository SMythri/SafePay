import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import {donateFund} from '../../utils/Ngo'

function Donate(props) {

  const navigate = useNavigate();
  const [amount,setAmount] = useState();
  const onSubmitHandler = (e) => {
    e.preventDefault()
    donateFund(props.orgname,props.causename,amount)
    props.onHide();
  };
  return (
    <>
    <Modal
    {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Donate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.orgname}</p>
        <p>{props.causename}</p>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Amount to Donate</Form.Label>
            <Form.Control 
            type="number" 
            placeholder="Ethers"
            value={amount}
            onChange={e => setAmount(e.target.value)} 
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={onSubmitHandler}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
}

export default Donate;
