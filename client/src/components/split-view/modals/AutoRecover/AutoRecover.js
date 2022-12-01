import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";

function AutoRecover() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>


      {/* <Button variant="primary" id = "playtraffic" href="#action/Recovery" onClick={handleShow}>
        Auto Recover
      </Button> */}

      <Modal className = "RecoveryModal" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Auto-Recovery</Modal.Title>
        </Modal.Header>
        <Modal.Body className = "RecoveryBody" >
         Project data recovered. Would you like to continue your last session?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary">Yes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AutoRecover;
