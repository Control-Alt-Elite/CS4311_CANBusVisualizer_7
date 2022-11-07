import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from 'react-bootstrap/Button';
import {Modal} from "react-bootstrap";
import MapDisplayer from "./split-view/MapDisplayer";
import { ReactDiagram } from "gojs-react";
import CANTable from "./split-view/Table"
import "./SplitView.css";
import AssignIcon from "./split-view/modals/AssignIcon"
import ChangeVisibility from "./split-view/modals/ChangeVisibility";
import EditBlacklist from "./split-view/modals/EditBlacklist";
import RenameNode from "./split-view/modals/RenameNode";

<MapDisplayer />;

function SplitView() {
  
  const handleClose = () => {
    // setShow(true);
  };

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
                      <RenameNode/>
                      <AssignIcon/>
                      <ChangeVisibility/>
                      <EditBlacklist/>
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
         {/* TABLE */}
        <div className="rawTable">
          <CANTable />
        </div>
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
