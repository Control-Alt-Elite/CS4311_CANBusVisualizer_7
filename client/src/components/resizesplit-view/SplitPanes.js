import { ReactDiagram } from "gojs-react";
import { default as React, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Table from "react-bootstrap/Table";
import ReactDOM from "react-dom";
import Split from "react-split";
import { default as MapDisplayer } from "./MapDisplayer";
import PacketTable from "./PacketTable";
import "./SplitView.css";
import "./styles.css";
const url = "http://localhost:3001/packets";

const handleClose = () => {
  // setShow(true);
};

const handleShow = () => {
  // show={true};
};

const minSize = 0;
const dragInterval = 0;

// function Display() {
//     return (
//     <div style={{ height: 500, width: 500 }} />
//     );
//   }

function SplitPanes() {
  const [data, setData] = useState([]);

  // This works perfectly, but we will have to change it for a handler
//   useEffect(() => {
//     const eventSource = new EventSource(url);
//     eventSource.onmessage = (e) => {
//       console.log(e.data);
//       const parsedData = JSON.parse(e.data);
//       setData((data) => [...data, parsedData]);
//     };
//   }, []);
  return (
    <div className="App">
      <Split
        className="container"
        direction="vertical"
        minSize={minSize}
        dragInterval={dragInterval}
      >
        <div className="splitted">
          <div>
            <ReactDiagram
              divClassName="diagram-component"
              initDiagram={MapDisplayer}
              nodeDataArray={[
                {key: 0,text: "",category: "HBar",location: "100 100",size: "500 4",fill: "#C4C4C4"},
                {key: 1,text: "Suspension",category: "Generator",location: "250 -50"},
                {key: 2,text: "ABS", location: "150 10" },
                {key: 3,text: "Engine",category: "Generator",location: "500 30"},
                {key: 5,text: "Air Conditioner",category: "Generator",location: "400 260"},
                {key: 6,text: "Window",category: "Generator",location: "200 250"},
                {key: 7,text: "Battery",category: "Generator",location: "310 180"},
                {key: 8,text: "Outside Mirror",category: "Generator",location: "380 -40"},
              ]}
              linkDataArray={[
                { from: 1, to: 0 },
                { from: 2, to: 0 },
                { from: 3, to: 0 },
                { from: 4, to: 0 },
                { from: 5, to: 0 },
                { from: 6, to: 0 },
                { from: 7, to: 0 },
                { from: 8, to: 0 },

                { from: 1, to: 2, fill: "#C4C4C4" },
              ]}
            />
          </div>
        </div>
        {/* Packet View Split */}
        <div className="splitted">
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
                          <NavDropdown.Item
                            href="#Modal"
                            data-toggle="Modal"
                            onClick={handleShow}
                          >
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
                  {data.map(({ raw, decoded }, index) => (
                    <tr>
                      <td>{raw}</td>
                      <td>{decoded}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <Modal
              show={false}
              onHide={handleClose}
              backdrop="static"
              className="modal-box"
            >
              <Modal.Header closeButton>
                <Modal.Title> Edit Packets </Modal.Title>
              </Modal.Header>

              <Modal.Body>Packet editing</Modal.Body>

              <Modal.Footer>
                <button variant="dark" onClick={handleClose}>
                  Save
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </Split>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<SplitPanes />, rootElement);
export default SplitPanes;
