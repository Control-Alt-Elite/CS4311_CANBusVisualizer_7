import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import PacketTable from "./PacketTable";
import "./SplitView.css";
import Table from "react-bootstrap/Table";


const handleClick = () => {
  // implementation details
};

function SplitView() {
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
      <div className="screen">
        <h4 className="titleName">CAN Map Visualizer</h4>
        <ButtonGroup className="TopButtons">
          <Button variant="warning">Traffic
            
          </Button>
          <Button variant="warning">CAN MAP</Button>
        </ButtonGroup>

        <Navbar
          className="MapDropdowns"
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Container>
            <Navbar.Collapse>
              <Nav className="navigationTopBar">
                <NavDropdown title="File" id="file-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Edit" id="view-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Nodes" id="packets-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link className="mapButton" href="#home">
                  Map
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="map">
          <div className="carBack"></div>
        </div>

        <Navbar
          className="packetDropdowns"
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Container>
            <Navbar.Collapse>
              <Nav className="navigationTopBar">
                <NavDropdown title="File" id="file-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="View" id="view-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Packets" id="packets-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link className="playTrafficButton" href="#home">
                  Play Traffic
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <ButtonGroup className="dataPacketButtons">
          <Button variant="warning">ID</Button>
          <Button variant="warning">Time</Button>
          <Button variant="warning">Data</Button>
        </ButtonGroup>

        {/* TABLE */}
        <div>
          <PacketTable />
        </div>
      </div>
    </>
  );
}

export default SplitView;