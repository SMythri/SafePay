import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Card, Button, Modal } from 'react-bootstrap'

export default function DonorProfile(props) {
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate('/DonorHomePage');
        props.onHide();
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Donor Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <p>Donor Name</p>
                        <p>Wallet Address</p>
                    </Card.Body>
                </Card>
                <br/>
                <Button variant="danger" type="submit" onClick={onClickHandler}>
                    Cancel
                </Button>
                <br/>
            </Modal.Body>
        </Modal>
    )
}
