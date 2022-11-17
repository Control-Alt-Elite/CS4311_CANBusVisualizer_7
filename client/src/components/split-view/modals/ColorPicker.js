import React, {useState} from 'react';
import { SketchPicker } from 'react-color';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";

// import ColorPicker from "./ColorPicker.js";
 
// class Component extends React.Component {
 
//   render() {
//     return <SketchPicker />;
//   }
// }
function ColorPicker() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <NavDropdown.Item href="#action/3.5" onClick={handleShow}> Create Flag</NavDropdown.Item>
        {/* <NavDropdown.Item href="#action/3.4"onClick={handleShow}>Modify Off-limits</NavDropdown.Item> */}
        
        <Modal 
        show={show} 
        onHide={handleClose}
        size = "sm"
        >
          <Modal.Header closeButton>
            <Modal.Title >Create Custom Flag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SketchPicker 
            // Breaks the code vv
            // color={ this.state.background }
            // onChangeComplete={ this.handleChangeComplete }
        />
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
  