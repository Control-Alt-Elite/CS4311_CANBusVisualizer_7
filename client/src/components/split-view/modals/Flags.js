// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from "react-bootstrap/Table";
import ColorPicker from "./ColorPicker.js";
 
import './Flags.css';
 
function Flags() {
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  return (
    <>
      <NavDropdown.Item href="#action/3.3" onClick={handleShow}> Add/Remove Flags</NavDropdown.Item>
      {/* <NavDropdown.Item href="#action/3.4"onClick={handleShow}>Modify Off-limits</NavDropdown.Item> */}
     
      <Modal
      show={show}
      onHide={handleClose}
      size = "sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Flags</Modal.Title>
        </Modal.Header>
       
        <Modal.Body>
            {/* <Form> */}
                {/* <select id = "framework"> */}
                    {/* <p class="text-white">Create Custom Flag</p> */}
                    <ColorPicker/>
                    <p>Alive</p>
                    <p >DoSed</p>
                    <p>Enumerated</p>
                    <p >Notes</p>
                    <p>Off Limits</p>
                    <p>Scanned</p>
                    <p>Custom Flags</p>
            {/* </select> */}
          {/* </Form>  */}
          {/*
        <Table striped bordered hover>
        <tbody>
        <tr>
            <td colSpan={3}>Create Custom Flag</td>
          </tr>
          <tr>
            <td colSpan={3}>Alive</td>
          </tr>  
          <tr>
            <td colSpan={3}>DoSed</td>
          </tr>
          <tr>
            <td colSpan={3}>Enumerated</td>
          </tr>  
          <tr>
            <td colSpan={3}>Notes</td>
          </tr>
          <tr>
            <td colSpan={3}>Off Limits</td>
          </tr>
          <tr>
            <td colSpan={3}>Scanned</td>
          </tr>
          <tr>
            <td colSpan={3}>Custom Flags</td>
          </tr>
        </tbody>
      </Table>
       */}
         
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
