import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AutoRecover from "../../modals/AutoRecover/AutoRecover";
import EditBlacklist from "../../modals/EditOffLimits/EditBlacklist";
import Flags from "../../modals/Flags/Flags";
import AssignIcon from "../../modals/IconModal/AssignIcon";
import LinkNodes from "../../modals/Relationships/LinkNodes";
import RenameNode from "../../modals/Rename/RenameNode";
import ChangeVisibility from "../../modals/Visibility/ChangeVisibility";

import "./MapNav.css";

function MapNav() {
  function deleteTemp(){
    localStorage.removeItem("packetInfo")
  }
  return (
    <div className="MapDropdowns">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Collapse>
          <div className="MapRibbon">
            <Nav>
              <NavDropdown title="File" menuVariant="dark">
                <NavDropdown.Item href="#action/1.1" id="item1" onClick={deleteTemp}>
                  Save Project
                </NavDropdown.Item>
                <NavDropdown.Item href="/">Close Session</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Edit" id="edit-dropdown" menuVariant="dark">
                <RenameNode />
                <AssignIcon />
                <ChangeVisibility />
                <EditBlacklist />
                <Flags />
              </NavDropdown>
              <NavDropdown title="Nodes" id="nodes-dropdown" menuVariant="dark">
                <AutoRecover/>
                <LinkNodes/>
                <NavDropdown.Item href="#action/3.3">
                  Search Node
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  Select All
                </NavDropdown.Item>
              </NavDropdown>
              <input id="nodeSearchBar" className="searchInput" type="search" variant="dark" onkeypress="if (event.keyCode === 13) searchDiagram()"></input>
              <Button id="nodeSearchButton" className="searchButton" variant="dark" onclick="searchDiagram()">
                Search
              </Button>
              {/* <button id = "nodeSearchButton" className="searchButton" variant="dark" onclick="searchDiagram()">Search Node</button> */}
              {/* <input className = "searchInput"/> */}
              {/* <Button className = 'searchButton' variant="dark">Search</Button> */}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MapNav;
