import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";
import DraggableModalDialog from "./DraggableModalDialog";
import './Editor.css';

function Editor() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item href="#action/3.3" onClick={handleShow}>CAN DBC Editor</NavDropdown.Item>
      <Modal id="dragable_modal" dialogAs={DraggableModalDialog} show={show} onHide={handleClose} size = "xl">
        <Modal.Header closeButton>
          <Modal.Title>CAN DBC Editor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe title="Editor" width="1100" height="600" src="https://docs.google.com/spreadsheets/d/19q8Zlcpbbkey-z5dYo3Lb9jfTWiIprP4CGL2RUK1teI/edit?usp=sharing&amp;rm=minimal&amp;single=true&amp;widget=false&amp;chrome=false"></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Editor;