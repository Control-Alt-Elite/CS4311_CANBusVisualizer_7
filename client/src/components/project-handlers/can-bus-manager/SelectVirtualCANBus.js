import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./SelectVirtualCANBus.css";

const SelectVirtualCAN = () => {

    const [CAN, setCAN] = useState('vcan0');

    const handleSubmit = (event) => {
         // prevents the submit button from refreshing the page
         event.preventDefault();
         const data = {params: {CAN: CAN}};
         axios.get('http://localhost:3001/vcan', data).then((response) => {
              console.log(JSON.stringify(response.data));
          })
     };

     function handleChange(evt) {
        setCAN(evt.target.value);
    }

     return (
        <Form className='vcan-form' onSubmit={handleSubmit}>
            <Form.Group controlId="custom-select">
                <Form.Label>Select Virtual CAN Bus (Testing Purposes Only)</Form.Label>
                <Form.Control as="select" className="rounded-0 shadow" onChange={handleChange} value={CAN}>
                    <option value={'vcan0'}>Virtual CAN Bus #1 (29-bit Extended Format)</option>
                    <option value={'vcan1'}>Virtual CAN Bus #2 (11-bit Standard Format)</option>
                </Form.Control>
            </Form.Group>
            <br></br><br></br>
            <hr />
            <div className='Buttons'>
                <Link to="/ProjectConfigurationHolder">
                    <button className= "continue" type = "submit"> Confirm </button>
                </Link>
                
                <Link to="/">
                    <button className="cancel"> Cancel </button>  
                </Link>
            </div>
        </Form>
     );
};
export default SelectVirtualCAN;
