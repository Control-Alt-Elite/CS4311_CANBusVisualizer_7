import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";
import '../modals.css';
import "./LinkNodes.css";


function Link() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item href="#action/Link" onClick={handleShow}>Add Relationship</NavDropdown.Item>
      
      <Modal className ="LinkModal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Relationship</Modal.Title>
        </Modal.Header>
        <Modal.Body className = "LinkModalBody">
          <Form className = "NodeInputs">
            <Form.Group>
              <Form.Label >Node 1:</Form.Label>
              <Form.Control autoFocus/>
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label>Node 2:</Form.Label>
              <Form.Control/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className = "CloseButton" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className = "SaveButton"variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
}

export default Link;
