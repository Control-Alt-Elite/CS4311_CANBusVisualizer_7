import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./SplitView.css";
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';

const url = 'http://localhost:3001/packets';


// const handleRowClick = () => {
//   console.log("Row clicked");
// };

// const handleIDClick = () =>{
//   console.log("ID clicked");
// };

// const handleTimeClick = () =>{
//   console.log("Time clicked");
// };

// const handleDataClick = () =>{
//   console.log("Data clicked");
// };

// const handleClose = () => {
//   // setShow(false);
// };

// const handleClick = () => {
//   // implementation details
// };
const handleShow = () => {
  // setShow(true);
};



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
  /*
  // Listening packets 
// Log any message in Terminal
channel.addListener("onMessage", function(msg) { 
  console.log("Message");
  console.log("Id: " + msg.id);
  var data = [...msg.data]
  console.log("Data: " + data);
});
channel.start(); */

  return (
    <>
      {/* <div className="TopButtons">
        <ButtonGroup>
          <Button variant="warning">Traffic</Button>
          <Button variant="warning">CAN MAP</Button>
        </ButtonGroup>
      </div> */}

      <div className="MapDropdowns">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Container>
            <Navbar.Collapse>
              <div className="navigationTopBar">
                <Nav>
                  <NavDropdown title="File" id="file-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Save Project
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item href="#action/3.2">
                      ???
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Open Saved Packets
                    </NavDropdown.Item> */}
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Placeholder
                    </NavDropdown.Item> */}
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
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item> */}
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
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated Link
                    </NavDropdown.Item> */}
                  </NavDropdown>

                  {/* <Nav.Link className="mapButton" href="#home">
                    Map
                  </Nav.Link> */}
                </Nav>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>


      <div className="map" >
        {/* <MapLine  className="mapLine"/> */}
        <div className="rectangle" />
      </div>

      <div className="packetDropdowns">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Container>
            <Navbar.Collapse>
              <div className="navigationTopBar">
                <Nav>
                  <NavDropdown title="File" id="file-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Save Project
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Open Saved Packets
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item href="#action/3.3">
                      ???
                    </NavDropdown.Item> */}
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item> */}
                  </NavDropdown>

                  <NavDropdown title="View" id="view-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Filter Packets
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Sort Packets
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item href="#action/3.3">
                      Sort Packets
                    </NavDropdown.Item> */}
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      ???
                    </NavDropdown.Item> */}
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
                    {/* <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item> */}
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Archive
                    </NavDropdown.Item> */}
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

      {/* <div className="dataPacketButtons">
        <ButtonGroup>
          <Button variant="warning">ID</Button>
          <Button variant="warning">Time</Button>
          <Button variant="warning">Data</Button>
        </ButtonGroup>     
      </div> */}

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

      {/*  
    <Modal show = {show} onHide = {handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Packets</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Edit
      </Modal.Body>
      <Modal.Footer>
        <Button variant = "dark" onClick = {handleClose}> 
        Save 
        </Button>
      </Modal.Footer>
    </Modal>
    */}
    </>
  );
}

export default SplitView;