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

// import './AssignIcon.css';

function ChangeIcon(src){
  console.log("Icon");
  let newIcon = src;


}

// upImage = new Image();
// upImage.src = "buyit15u.jpg";

// function changeImage()
// {
//   document.images["jsbutton"].src= upImage.src;
//   return true;
// }

function AssignIcon() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
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
            <Col >
              <img src={laptop} className = "img-fluid" onClick={ChangeIcon(laptop)}/>
            </Col>
            <Col>
              <img src={abs} className = "img-fluid" onClick={ChangeIcon(abs)}/>
            </Col>
            <Col>
              <img src={battery} className = "img-fluid" onClick={ChangeIcon(battery)}/>
            </Col>
            <Col>
              <img src={car_cpu} className = "img-fluid" onClick={ChangeIcon(car_cpu)}/>
            </Col>
          </Row>
           
          <Row>
          <Col>
              <img src={car_frame} className = "img-fluid" onClick={ChangeIcon(car_frame)}/>
            </Col>
            <Col>
              <img src={door} className = "img-fluid" onClick={ChangeIcon(door)}/>
            </Col>
            <Col>
              <img src={engine} className = "img-fluid" onClick={ChangeIcon(engine)}/>
            </Col>
            <Col>
              <img src={hvac} className = "img-fluid" onClick={ChangeIcon(hvac)}/>
            </Col>
            <Col>
              <img src={odometer} className = "img-fluid" onClick={ChangeIcon(odometer)}/>
            </Col>
          </Row>
          <Row>
          <Col>
              <img src={seat} className = "img-fluid"onClick={ChangeIcon}/>
            </Col>
            <Col>
            {/* <Button> */}
              <img src={side_mirror} className = "img-fluid" onClick={ChangeIcon}/>
              {/* </Button> */}
            </Col>
            <Col>
              <img src={suspension} className = "img-fluid" onClick={ChangeIcon}/>
            </Col>
            <Col>
              <img src={transmission} className = "img-fluid" onClick={ChangeIcon}/>
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