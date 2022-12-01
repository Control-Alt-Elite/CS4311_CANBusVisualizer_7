import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AssignIcon from "../../modals/AssignIcon";
import ChangeVisibility from "../../modals/ChangeVisibility";
import EditBlacklist from "../../modals/EditBlacklist";
import Flags from "../../modals/Flags";
import RenameNode from "../../modals/RenameNode";

import "./MapNav.css";

function MapNav() {
  return (
    <div className="MapDropdowns">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Collapse>
          <div className="MapRibbon">
            <Nav>
              <NavDropdown title="File" menuVariant="dark">
                <NavDropdown.Item href="#action/1.1" id="item1">
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
              <input
                id="nodeSearchBar"
                className="searchInput"
                type="search"
                variant="dark"
                onkeypress="if (event.keyCode === 13) searchDiagram()"
              ></input>
              <Button
                id="nodeSearchButton"
                className="searchButton"
                variant="dark"
                onclick="searchDiagram()"
              >
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
