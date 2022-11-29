import React from 'react';
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Transitions from '../../Transitions';
import './CANBusManager.css';
import SelectCAN from "./SelectCANBus";
import SelectVirtualCAN from './SelectVirtualCANBus';

export default function CANBusManager() {
    return (
        <>
        <Transitions>
          <div className="container">
               <div className='header'> 
                    <h3 className='text'>CAN Bus Manager</h3>
               </div>
               <Row className="card">
                    <Col className="mx-auto">
                         <h2 className="menu">
                              CAN Bus Menu
                         </h2>
                         <hr />
                         <Tabs className='tabs' defaultActiveKey="select" id="tab">
                              <Tab eventKey="select" title="CAN Bus">
                                   <SelectCAN />
                              </Tab>
                              <Tab eventKey="virtual" title="Virtual CAN Bus">
                                   <SelectVirtualCAN />
                              </Tab>
                         </Tabs>
                    </Col>
               </Row>
          </div>
        </Transitions>
        </>
    )
}