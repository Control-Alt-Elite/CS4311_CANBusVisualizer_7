import React, { useState } from 'react';
import { Form, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./SelectCANBus.css";


function SelectCAN() {
     const [CAN, setCAN] = useState('can0');
     const [rate, setRate] = useState('125000')

     const handleSubmit = (event) => {
          // prevents the submit button from refreshing the page
          event.preventDefault();
          console.log(CAN);
          console.log(rate);
          const data = {params: {CAN: CAN, rate: rate}};
          axios.get('http://localhost:3001/can', data).then((response) => {
               window.location.replace('/ProjectConfigurationHolder')
           });
      };

     function handleChange(event) {
          setCAN(event.target.value);
     }

     function handleChangeCheck(event) {
          setRate(event.target.value);
        }

     return (
          <Form className="can-form" onSubmit={handleSubmit}>
               <Form.Group controlId="custom-select">
                    <Form.Label>Select CAN Bus</Form.Label>
                    <Form.Control as="select" className="rounded-0 shadow" onChange={handleChange} value={CAN.CAN}>
                         <option value={'can0'}>CAN Bus #1</option>
                         <option value={'can1'}>CAN Bus #2</option>
                         <option value={'can2'}>CAN Bus #3</option>
                    </Form.Control>
               </Form.Group>
               <br></br><br></br>
               <hr />
               <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={2}>
                          Rate
                    </Form.Label>
                    <Col sm={2}>
                         <Form.Check
                              type="radio"
                              label="125 kbps"
                              name="radios"
                              id="formHorizontalRadios1"
                              value='125000'
                              checked={rate === '125000'}
                              onChange={handleChangeCheck}
                         />
                         <Form.Check
                              type="radio"
                              label="250 kbps"
                              name="radios"
                              id="formHorizontalRadios2"
                              value='250000'
                              checked={rate === '250000'}
                              onChange={handleChangeCheck}
                         />
                         <Form.Check
                              type="radio"
                              label="500 kbps"
                              name="radios"
                              id="formHorizontalRadios3"
                              value='500000'
                              checked={rate === '500000'}
                              onChange={handleChangeCheck}
                         />
                         <Form.Check
                              type="radio"
                              label="1 Mbps"
                              name="radios"
                              id="formHorizontalRadios3"
                              value='1000000'
                              checked={rate === '1000000'}
                              onChange={handleChangeCheck}
                         />
                    </Col>
               </Form.Group>
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
export default SelectCAN;