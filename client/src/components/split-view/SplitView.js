import { ReactDiagram } from "gojs-react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import MapDisplayer from "./MapDisplayer";
import AssignIcon from "./modals/AssignIcon";
import ChangeVisibility from "./modals/ChangeVisibility";
import EditBlacklist from "./modals/EditBlacklist";
import Flags from "./modals/Flags";
import RenameNode from "./modals/RenameNode";
import "./SplitView.css";
import CANTable from "./table/Table";

<MapDisplayer />;

function SplitView() {
  return (
      <div className="Visualizer">
        {/* GRAPHICS REGION */}
        <div className="graphics">
          {/* MAP MENU */}
          <div className="MapDropdowns">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Collapse>
                <div className="navigationTopBar">
                  <Nav>
                    <NavDropdown title="File" menuVariant = "dark">
                      <NavDropdown.Item href="#action/1.1" id="item1">
                        Save Project
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/">
                        Close Session
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Edit" id="edit-dropdown"  menuVariant = "dark">
                      <RenameNode />
                      <AssignIcon />
                      <ChangeVisibility />
                      <EditBlacklist />
                      <Flags/>
                    </NavDropdown>
                    <NavDropdown title="Nodes" id="nodes-dropdown" menuVariant = "dark">
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
                    <input id="nodeSearchBar"className = "searchInput" type="search"  variant="dark"></input>
                    <Button id = "nodeSearchButton" className="searchButton" variant="dark">Search</Button>
                    {/* <button id = "nodeSearchButton" className="searchButton" variant="dark" onclick="searchDiagram()">Search Node</button> */}
                    {/* <input className = "searchInput"/> */}
                    {/* <Button className = 'searchButton' variant="dark">Search</Button> */}
                  </Nav>
                </div>
              </Navbar.Collapse>
            </Navbar>
          </div>

          {/* MAP DIAGRAM */}

          <div>
            {/* <Button id="blobButton" >Export Node Network Diagram(Not Working)</Button> */}

            <ReactDiagram
              divClassName="diagram-component"
              initDiagram={MapDisplayer}
            />
          </div>
          <Navbar expand="lg" bg="dark" variant="dark">
          <Nav>
            <div className = "export-flex-container">
              
              <div className = "mapButtons">
                <div className = "diagramButton">
                  <Button id="exportDiagram">Export Network Diagram</Button>
                </div>
                <div className = "nodeAttrButton">
                  <Button id="SaveButton" className = "save-btn" disabled="">Export Node Attributes</Button>
                  <Button id="LoadButton" className = "import-btn">Import Node Attributes</Button>
                </div>
              </div>
              
            </div>
          </Nav>
          </Navbar>
        
          {/* <textarea id="mySavedModel">{}</textarea> */}
       
       
        </div>
        {/** DATA REGION **/}
        <div className="data">
          {/* TABLE */}
          <div className="rawTable">
            <CANTable />
          </div>
        </div>
      </div>
  );
}

export default SplitView;
