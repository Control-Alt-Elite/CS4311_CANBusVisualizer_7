import React from 'react'
import Transitions from '/home/kali/CS4311_CANBusVisualizer_7/client/src/components/Transitions';
import './CANBusManager.css'
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import SelectVirtualCAN from './SelectVirtualCANBus';
import SelectCAN from "./SelectCANBus";

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