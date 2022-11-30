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
    <div className="VisualizerPage">
      {/* MAP REGION */}
      <div className="MapSection">
        {/* Map Ribbon*/}
        <MapRibbon />

        {/* Map Diagarm*/}
        <div className="CANMap">
          <ReactDiagram
            divClassName="diagram-component"
            initDiagram={MapDisplayer}
            //Node Data and Link Data arrays can go here instead of being in MapDisplayer
          />
        </div>
        {/* Export Buttons */}
        <Navbar expand="lg" bg="dark" variant="dark">
          <div className="diagramButton">
            <Button id="exportDiagram">Export Network Diagram</Button>
          </div>
          <div className="nodeAttrButton">
            <Button id="SaveButton" className="save-btn" disabled="">
              Export Node Attributes
            </Button>
            <Button id="LoadButton" className="import-btn">
              Import Node Attributes
            </Button>
          </div>
        </Navbar>

        {/* <textarea id="mySavedModel">{}</textarea> */}
      </div>

      {/** PACKETS REGION **/}
      <div className="PacketTable">
        <CANTable />
      </div>
    </div>
  );
}

export default SplitView;
