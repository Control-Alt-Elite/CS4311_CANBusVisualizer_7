import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import laptop from '../../../images/laptop.png';
import abs from '../../../images/node_abs.png';
import battery from '../../../images/node_battery.png';
import car_cpu from '../../../images/node_car-cpu.png';
import car_frame from '../../../images/node_car-frame.png';
import door from '../../../images/node_door.png';
import engine from '../../../images/node_engine.png';
import hvac from '../../../images/node_hvac.png';
import odometer from '../../../images/node_odometer.png';
import seat from '../../../images/node_seat.png';
import side_mirror from '../../../images/node_side-mirror.png';
import suspension from '../../../images/node_suspension.png';
import transmission from '../../../images/node_transmission1.png';
import '../modals.css';
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
      size = "lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Icon</Modal.Title>
        </Modal.Header>
        <Modal.Body className= "show-grid">
          
        
        
        <Container>
          <Row>
            <Col xs={4} md={4}>
              <img src={laptop} className = "img-fluid"/>
            </Col>
            <Col>
              <img src={abs} className = "img-fluid"/>
            </Col>
            <Col>
              <img src={battery} className = "img-fluid"/>
            </Col>
            <Col>
              <img src={car_cpu} className = "img-fluid"/>
            </Col>
          </Row>
          <Row>   _________________________________________________________________________________________________</Row>
          <Row>
          <Col>
              <img src={car_frame} className = "img-fluid"/>
            </Col>
            <Col>
              <img src={door} className = "img-fluid"/>
            </Col>
            <Col>
              <img src={engine} className = "img-fluid"/>
            </Col>
            <Col>
              <img src={hvac} className = "img-fluid"/>
            </Col>
            <Col>
              <img src={odometer} className = "img-fluid"/>
            </Col>
          </Row>
          <Row>   _________________________________________________________________________________________________</Row>
          <Row>
          <Col>
              <img src={seat} className = "img-fluid"/>
            </Col>
            <Col>
            {/* <Button> */}
              <img src={side_mirror} className = "img-fluid" />
              {/* </Button> */}
            </Col>
            <Col>
              <img src={suspension} className = "img-fluid"/>
            </Col>
            <Col>
              <img src={transmission} className = "img-fluid"/>
            </Col>
            
          </Row>
        </Container>
      

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AssignIcon;