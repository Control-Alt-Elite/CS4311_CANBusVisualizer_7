import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";
import '../modals.css';
import './RenameNode.css';

function RenameNode() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item href="#action/Rename" onClick={handleShow}> Rename Node </NavDropdown.Item>
      
      <Modal className ="RenameModal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rename Node</Modal.Title>
        </Modal.Header>
        <Modal.Body className = "RenameModalBody">
          <Form className = "RenameInputs">
            <Form.Group className="textInput1">
              <Form.Label className = "IDInput">Node ID:</Form.Label>
              <Form.Control type="input1"/>
            </Form.Group>
            <br></br>
            <Form.Group className="textInput2">
              <Form.Label className = "NameInput">New Node Name:</Form.Label>
              <Form.Control type="input2"/>
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
