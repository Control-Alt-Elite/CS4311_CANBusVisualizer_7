import { ReactDiagram } from "gojs-react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MapDisplayer from "./MapDisplayer";
import MapRibbon from "./ribbons/MapRibbon/MapNav";

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
                <div className="MapRibbon">
                  <MapRibbon/>
                </div>
              </Navbar.Collapse>
            </Navbar>
          </div>

          {/* MAP DIAGRAM */}

          <div className = "MapSection">
            {/* <Button id="blobButton" >Export Node Network Diagram(Not Working)</Button> */}

            <ReactDiagram
              divClassName="diagram-component"
              initDiagram={MapDisplayer}

              //Node Data array can go here
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
        <div className="PacketSection">
          {/* TABLE */}
          <div className="rawTable">
            <CANTable />
          </div>
        </div>
      </div>
  );
}

export default SplitView;
