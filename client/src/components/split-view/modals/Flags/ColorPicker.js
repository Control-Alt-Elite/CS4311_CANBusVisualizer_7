import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavDropdown from "react-bootstrap/NavDropdown";
import { SketchPicker } from 'react-color';
import colorPickerCSS from './ColorPicker.css';

// import ColorPicker from "./ColorPicker.js";
 
// var state = {
//   displayColorPicker: false,
//   color: {
//     r: '241',
//     g: '112',
//     b: '19',
//     a: '1',
//   },
// };

// handleChange = (color) => {
//   this.setState({ color: color.rgb })
// };
// handleChange(color, event) {
//   // color = {
//   //   hex: '#333',
//   //   rgb: {
//   //     r: 51,
//   //     g: 51,
//   //     b: 51,
//   //     a: 1,
//   //   },
//   //   hsl: {
//   //     h: 0,
//   //     s: 0,
//   //     l: .20,
//   //     a: 1,
//   //   },
//   // }
// }

// render() {
//   return <SwatchesPicker onChange={ this.handleChange } />;
// }


// //render() {

//   const styles = colorPickerCSS({
//     'default': {
//       color: {
//         width: '36px',
//         height: '14px',
//         borderRadius: '2px',
//         background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
//       },
//       swatch: {
//         padding: '5px',
//         background: '#fff',
//         borderRadius: '1px',
//         boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
//         display: 'inline-block',
//         cursor: 'pointer',
//       },
//       popover: {
//         position: 'absolute',
//         zIndex: '2',
//       },
//       cover: {
//         position: 'fixed',
//         top: '0px',
//         right: '0px',
//         bottom: '0px',
//         left: '0px',
//       },
//     },
//   });
// //}

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
  