import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {Modal} from "react-bootstrap";
import MapDisplayer from "./split-view/MapDisplayer";
import { ReactDiagram } from "gojs-react";
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import "./SplitView.css";

<MapDisplayer />;

function SplitView() {

  const url = 'http://localhost:3001/packets';
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  const handleClose = () => {
    // setShow(true);
  };
  
  const handleShow = () => {
    // show={true};
  };
  
  const handleMessage = (msg) => {
    const parsedMessage = {
      Message: msg.decoded,
    };
    setMessage(JSON.stringify(parsedMessage));
  };
  
  const handleIDClick = () =>{
    console.log("ID clicked");
  };

  function handlePlayTraffic () {
    const eventSource = new EventSource(url);
    eventSource.onmessage = (e) => {
      console.log(e.decoded);
  
      const parsedData = JSON.parse(e.data);
      setData((data) => [...data,parsedData]);
    }
    return () => {
      eventSource.close(); 
    };
  }


  function handleStopTraffic () {
    console.log("Stoping traffic")
  }

  return (
    <>
    <div className="Visualizer">
       {/* GRAPHICS REGION */}
      <div className="graphics">
        {/* MAP MENU */}
        <div className="MapDropdowns">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Collapse>
                <div className="navigationTopBar">
                  <Nav>
                    <NavDropdown title="File" id="file-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        Save Project
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/">
                        Close Session
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Edit" id="view-dropdown">
                      <NavDropdown.Item href="#action/Rename">
                        Rename Node
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Assign Icon
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Change Visibility
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Nodes" id="packets-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        Drag Nodes
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Add Relationship
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Search Node
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.4">
                        Select All
                      </NavDropdown.Item>
                    </NavDropdown>
                    <input className = "searchInput"/>
                    <Button className = 'searchButton' variant="dark">Search</Button>
                  </Nav>
                  
                </div>
              </Navbar.Collapse>
          </Navbar>
        </div>

        {/* MAP DIAGRAM */}
        <div>
          <ReactDiagram
            divClassName="diagram-component"
            initDiagram={MapDisplayer}
            nodeDataArray={[
              
              {"key":0,"text":"","category":"HBar","location":"100 100","size":"500 4","fill":"#C4C4C4"},
              {"key":1,"text":"Suspension","category":"Generator","location":"250 -50"},
              {"key":2,"text":"ABS","location":"150 10"},
              {"key":3,"text":"Engine","category":"Generator","location":"500 30"},
              {"key":5,"text":"Air Conditioner","category":"Generator","location":"400 260"},
              {"key":6,"text":"Window","category":"Generator","location":"200 250"},
              {"key":7,"text":"Battery","category":"Generator","location":"310 180"},
              {"key":8,"text":"Outside Mirror","category":"Generator","location":"380 -40"},
            ]}
            linkDataArray={[
              {"from":1,"to":0},
              {"from":2,"to":0},
              {"from":3,"to":0},
              {"from":4,"to":0},
              {"from":5,"to":0},
              {"from":6,"to":0},
              {"from":7,"to":0},
              {"from":8,"to":0},

              
              {"from":1,"to":2, "fill": "#C4C4C4"},
            ]}
          />
        </div>
      </div>

      {/** DATA REGION **/}
      <div className="data">
         {/* TABLE MENU */}
        <div className="packetDropdowns">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Collapse>
                <div className="navigationBottomBar">
                  <Nav>
                    <NavDropdown title="File" id="file-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        Save Project
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Open Saved Packets
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="View" id="view-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        Filter Packets
                        <ul>
                          <NavDropdown.Item href="#action3">Node</NavDropdown.Item>
                        </ul>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Sort Packets
                        <ul>
                          <NavDropdown.Item href="#action3">Most Recent</NavDropdown.Item>
                          <NavDropdown.Item href="#action3">Oldest</NavDropdown.Item>
                          <NavDropdown.Item href="#action3">Highest ID</NavDropdown.Item>
                          <NavDropdown.Item href="#action3">Smallest ID</NavDropdown.Item>
                        </ul>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Packets" id="packets-dropdown">
                      <NavDropdown.Item href="#Modal" data-toggle="Modal" onClick={handleShow} >
                        Edit Packets
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Replay Packets
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Save Packets
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.4">
                        Annotate Packets
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Play Traffic">
                    <NavDropdown.Item onClick = {handlePlayTraffic}>
                      Start
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick = {handleStopTraffic}>
                      Stop
                    </NavDropdown.Item>
                    </NavDropdown>

                    <input className = "searchInput"/>
                    <Button className = 'searchButton' variant="dark">Search</Button>

                  </Nav>
                </div>
              </Navbar.Collapse>
          </Navbar>
        </div>

         {/* TABLE */}
        <div className="rawTable">
          <Table striped bordered hover responsive variant = "dark" className="tTable">
          <thead>
            <tr>
              <th width='155'>Time</th>
              <th width='80'>Interface</th>
              <th className = 'clickable-id' onClick = {handleIDClick} width='85'>ID</th>
              <th width='80'>00</th>
              <th width='80'>01</th>
              <th width='80'>02</th>
              <th width='80'>03</th>
              <th width='80'>04</th>
              <th width='80'>05</th>
              <th width='80'>06</th>
              <th width='80'>07</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({time,can,id,dt1,dt2,dt3,dt4,dt5,dt6,dt7,dt8, decoded}, index) => (
              <tr key={index} className= 'clickable-row' onClick = {() => handleMessage({decoded})}>
                <td width='170'>{time}</td>
                <td width='90'>{can}</td>
                <td width='100'>{id}</td>
                <td width='40'>{dt1}</td>
                <td width='40'>{dt2}</td>
                <td width='40'>{dt3}</td>
                <td width='40'>{dt4}</td>
                <td width='40'>{dt5}</td>
                <td width='40'>{dt6}</td>
                <td width='40'>{dt7}</td>
                <td width='40'>{dt8}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
        { message && <div className="alert alert-primary" role="alert"><pre><p>{message}</p></pre></div> }
      </div>
    </div>
    <Modal
        show = {false}
        onHide={handleClose}
        backdrop="static"
        className = "modal-box"
        >
          <Modal.Header closeButton>
            <Modal.Title> Edit Packets </Modal.Title>
          </Modal.Header>
 
          <Modal.Body>
            Packet editing
          </Modal.Body>
 
          <Modal.Footer>
            <button variant = "dark" onClick = {handleClose}>
              Save
            </button>         
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default SplitView;
