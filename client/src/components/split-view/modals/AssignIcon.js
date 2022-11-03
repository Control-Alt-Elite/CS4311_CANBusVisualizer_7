import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";


import './AssignIcon.css';

function AssignIcon() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <NavDropdown.Item href="#action/3.3" onClick={handleShow}> Change Visibility</NavDropdown.Item> */}
      {/* <NavDropdown.Item href="#action/3.4"onClick={handleShow}>Modify Off-limits</NavDropdown.Item> */}
      <NavDropdown.Item href="#action/3.2" onClick={handleShow}> Assign Icon </NavDropdown.Item>
      
      <Modal 
      show={show} 
      onHide={handleClose}
      size = "md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Icon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <p class="text-warning">Icons</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleClose}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AssignIcon;