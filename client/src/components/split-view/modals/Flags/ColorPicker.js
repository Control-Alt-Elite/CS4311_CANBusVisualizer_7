import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";
import { SketchPicker } from "react-color";
import colorPickerCSS from "./ColorPicker.css";

function ColorPicker() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item href="#action/3.5" onClick={handleShow}>
        {" "}
        Create Flag
      </NavDropdown.Item>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Create Custom Flag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SketchPicker />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Flag
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ColorPicker;
