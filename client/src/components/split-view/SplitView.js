import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
// import Modal from "react-bootstrap/Modal";
import MapDisplayer from "./MapDisplayer";
import Table from 'react-bootstrap/Table';

import { ReactDiagram } from "gojs-react";
import "./SplitView.css";

import React, { useState, useEffect } from 'react';
const url = 'http://localhost:3001/packets';


const handleShow = () => {
  // setShow(true);
};

//Notify when map is updated
// function handleModelChange(changes) {
//   alert("GoJS model changed!");
// }

<MapDisplayer />;
function SplitView() {
    const [data, setData] = useState([]);

        // This works perfectly, but we will have to change it for a handler
    useEffect(() => {
        const eventSource = new EventSource(url);
        eventSource.onmessage = (e) => {
        console.log(e.data);
        const parsedData = JSON.parse(e.data);
        setData((data) => [...data,parsedData])
        }
    }, []);

  return (
    <>

      {/* MAP DROPDOWNS */}
      <div className="mapNodeAndDrop">
        <div className="MapDropdowns">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Collapse>
                <div className="navigationTopBar">
                  <Nav>
                    <NavDropdown title="File" id="file-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        Save Project
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Edit" id="view-dropdown">
                      <NavDropdown.Item href="#action/3.1">
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
                  </Nav>
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>

        {/* MAP REGION */}
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

      {/* PACKET REGION */}
      <div className="packetTableAndDrop">
        <div className="packetDropdowns">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
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
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Sort Packets
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Packets" id="packets-dropdown">
                      <NavDropdown.Item href="#action/3.1" onClick={handleShow}>
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

                    <Nav.Link className="playTrafficButton" href="#home">
                      Play Traffic
                    </Nav.Link>
                  </Nav>
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>

        {/* TABLE */}
      <div className="packetTable">
        <Table overflow-auto striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Raw Data</th>
                      <th>Decoded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(({raw,decoded}, index) => (
                    <tr>
                      <td>{raw}</td>
                      <td>{decoded}</td>
                    </tr>
                    ))}
                  </tbody>
        </Table>
      </div>
      </div>
    </>
  );
}

export default SplitView;
