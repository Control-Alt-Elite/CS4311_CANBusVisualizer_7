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
         console.log(CAN);
         const data = {params: {CAN: CAN}};
         axios.get('http://localhost:3001/vcan', data).then((response) => {
              console.log(response);
          })
     };

     function handleChange(evt) {
        setCAN(evt.target.value);
    }

     return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="custom-select">
                <Form.Label>Select Virtual CAN Bus (Testing Purposes Only)</Form.Label>
                <Form.Control as="select" className="rounded-0 shadow" onChange={handleChange} value={CAN}>
                    <option value={'vcan0'}>Virtual CAN Bus #1</option>
                    <option value={'vcan1'}>Virtual CAN Bus #2</option>
                </Form.Control>
            </Form.Group>
            <br></br><br></br>
            <hr />
            <div className='Buttons'>
                <button className= "continue" type = "submit"> Confirm </button>
                <Link to="/">
                    <button className="cancel"> Cancel </button>  
                </Link>
            </div>
        </Form>
     );
};
export default SelectVirtualCAN;
