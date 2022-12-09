import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";


function AddRelationship() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item href="#action/3.2" onClick={handleShow}> Add Relationship</NavDropdown.Item>
      
      <Modal 
      show={show} 
      onHide={handleClose}
      size = "lg"
      >
        <Modal.Header class="modal-header" closeButton>
          <Modal.Title>Add Relationship</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Node A ID</Form.Label>
              <Form.Control
                type="string"
                placeholder="ID"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput2">
              <Form.Label>Node B ID</Form.Label>
              <Form.Control
                type="string"
                placeholder="ID"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
// Test
export default AddRelationship;
