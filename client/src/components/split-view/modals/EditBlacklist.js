// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";
import Table from "react-bootstrap/Table";

import './EditBlacklist.css';
function EditBlacklist() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item href="#action/3.4"onClick={handleShow}>Modify Off-limits</NavDropdown.Item>
      
      <Modal
        show={show}
        onHide={handleClose}
        // backdrop="static"
        keyboard={false}
        size = "lg"

      >
        <Modal.Header closeButton>
          <Modal.Title>Modify Off-Limit</Modal.Title>
        </Modal.Header>

        <Modal.Body className="show-grid">
          {/* //
        <Container>
          <Row>
            <Col xs={3} md={2}>
            ID
            </Col>
            <Col xs={4} md={3}>
              Name
            </Col>
            <Col xs={6} md={4}>
              Description
            </Col>
          </Row>

          <Row>
            <Col xs={3} md={2}>
            200
            </Col>
            <Col xs={4} md={3}>
              Air Conditioner
            </Col>
            <Col xs={6} md={4}>
              Description
            </Col>
          </Row>

          <Row>
            <Col xs={3} md={2}>
            48
            </Col>
            <Col xs={4} md={3}>
             Transmission
            </Col>
            <Col xs={6} md={4}>
              Description
            </Col>
          </Row>

          
        </Container>
  */}
        
        <Table>
       
          {/* Table Header */}
          <tr>
            <th>Node ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
          </tr>
          <tr >
            <td>58</td>
            <td>Transmission</td>
            <td>Desc</td>
          </tr>
          <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
          </tr>
          <tr>
            <td>58</td>
            <td>Transmission</td>
            <td>Desc</td>     
          </tr>
          <tr>
            <td>200</td>
            <td>Air Conditioning</td>
            <td>Desc</td>
          </tr>  
       
      </Table>
         <Button id = "add-entry" variant = "success" class = "btn btn-success "  >
            Add Entry
          </Button>
          <Button id= "remove-entry" variant="danger" class = "btn btn-danger" >
            Remove Entry
            </Button>        

      </Modal.Body>

        <Modal.Footer justify-content_between>  
         
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Save</Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditBlacklist;
