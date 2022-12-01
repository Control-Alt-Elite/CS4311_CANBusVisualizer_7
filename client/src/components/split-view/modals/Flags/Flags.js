// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import '../modals.css';
import ColorPicker from "./ColorPicker.js";
import "./Flags.css";

function Flags() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item href="#action/3.3" onClick={handleShow}>Add/Remove Flags</NavDropdown.Item>

      <Modal className = "FlagsModal" show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Select Flags</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ColorPicker />
          <p>Alive</p>
          <p>DoSed</p>
          <p>Enumerated</p>
          <p>Notes</p>
          <p>Off Limits</p>
          <p>Scanned</p>
          <p>Custom Flags</p>
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

export default Flags;
