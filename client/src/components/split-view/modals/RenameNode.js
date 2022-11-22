// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";
import './RenameNode.css'

function RenameNode() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item href="#action/Rename" onClick={handleShow}> Rename Node </NavDropdown.Item>
      
      <Modal 
      show={show} 
      onHide={handleClose}
      size = "lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Rename Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Node ID :</Form.Label>
              <Form.Control
                type="number"
                // placeholder="%"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>New Node Name:</Form.Label>
              <Form.Control
                type="number"
                // placeholder="%"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant= "primary" onClick={handleClose}>
            Save Changes
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RenameNode;
