import * as go from "gojs";
import "./MapDisplayer.css";

// add gojs stuff here
function MapDisplayer() {
  const $ = go.GraphObject.make; // defines template for map
  const diagram = $(go.Diagram, {
    //Setting params for methods that will be used in the map
    "undoManager.isEnabled": true, // must be set to allow for model change listening
    "linkingTool.direction": go.LinkingTool.Either, //not sure what this does yet
    "clickCreatingTool.archetypeNodeData": {
      //Allows double clicking to create node
      text: "Node",
      color: "#CDCDCD",
    },
    "commandHandler.archetypeGroupData": {
      text: "Group",
      isGroup: true,
      color: "blue",
    },

    model: new go.GraphLinksModel({
      //necessary otherwise nodes will not display
      linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  //BUS LINE
  diagram.nodeTemplateMap.add(
    "HBar",$(go.Node,"Spot", new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
      {
        layerName: "Background",
        // special resizing: just at the ends
        resizable: true,
        resizeObjectName: "SHAPE",
        resizeAdornmentTemplate: $(
          go.Adornment,
          "Spot",
          $(go.Placeholder),
          $(go.Shape, {
            // when line is selected, this is the left resize handle button that displays
            alignment: go.Spot.Left, cursor: "col-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "dodgerblue",
          }),
          $(go.Shape, {
            // when line is selected, this is the right resize handle button that displays
            alignment: go.Spot.Right, cursor: "col-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "dodgerblue",
          })
        ),
      },
      $(
        go.Shape,
        "Rectangle",
        {
          name: "SHAPE",
          fill: "black",
          stroke: null,
          strokeWidth: 0, //selection rectangle
          width: 4,
          height: 4,
          //ONLY VISUAL REPRESENTATIONS, THE NODES WILL NOT ALIGN IN THE CENTER IF YOU DO NOT DRAG THE BUS 'HANDLE'
          minSize: new go.Size(100, 4), //rectangle min sizes (horizontal, vertical)
          maxSize: new go.Size(Infinity, 4), //rectangle max sizes (horizontal, vertical)
        },
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
          go.Size.stringify
        ),
        new go.Binding("fill"),
        { portId: "", toLinkable: true }
      ),
      $(
        go.TextBlock,
        {
          alignment: go.Spot.Right,
          alignmentFocus: go.Spot.Left,
          editable: true,
        },
        new go.Binding("text").makeTwoWay()
      )
    )
  );

  // define a simple Node template ORIGINAL
  diagram.nodeTemplate = $(
    go.Node, "Auto", // the Shape will go around the TextBlock
    new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
    $(
      go.Shape, "RoundedRectangle",
      { name: "SHAPE", fill: "#CDCDCD", strokeWidth: 0, fromLinkable: true },
      new go.Binding("fill", "color") // Shape.fill is bound to Node.data.color
    ),
    $(
      go.TextBlock, { margin: 8, editable: true }, // some room around the text
      new go.Binding("text").makeTwoWay()
    )
  );

  // //NEW NODE SPECIFICATIONS
  // diagram.nodeTemplateMap.add( "Consumer",
  // $(go.Node,"Spot", {
  //     locationSpot: go.Spot.Center,
  //     locationObjectName: "BODY",
  //     selectionObjectName: "BODY",
  //   },
  //   new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
  //   $(go.Picture, "./images/pc.png", {
  //     name: "BODY",
  //     width: 50,
  //     height: 40,
  //     margin: 2,
  //     portId: "",
  //     fromLinkable: true,
  //     cursor: "pointer",
  //     fromSpot: go.Spot.TopBottomSides,
  //     toSpot: go.Spot.TopBottomSides,
  //   }),
  //   $(go.TextBlock, {
  //       // alignment: go.Spot.Right,
  //       // alignmentFocus: go.Spot.Left,
  //       editable: true,
  //     },
  //     new go.Binding("text").makeTwoWay()
  //   )
  // )
  // );

  //HANDLES ALL LINKING
  diagram.linkTemplate = $(
    BarLink, // subclass defined below
    {
      routing: go.Link.Orthogonal,
      relinkableFrom: true,
      relinkableTo: true,
      toPortChanged: (link, oldport, newport) => {
        if (newport instanceof go.Shape) link.path.stroke = newport.fill;
      },
    },
    $(go.Shape, { strokeWidth: 2 })
  );

  //DEFINE NODES AND LINKS
  diagram.model = new go.GraphLinksModel( //Should use JSON
    [
      { key: 0, text: "", category: "HBar", location: "100 100", size: "500 4", fill: "#C4C4C4" },
      { key: 1, text: "Suspension", category: "Generator", location: "250 -50" },
      { key: 2, text: "ABS", location: "150 10" },
      { key: 3, text: "Engine", category: "Generator", location: "500 30" },
      { key: 5, text: "Air Conditioner", category: "Generator", location: "400 260",},
      { key: 6, text: "Window", category: "Generator", location: "200 250" },
      { key: 7, text: "Battery", category: "Generator", location: "310 180" },
      { key: 8, text: "Outside Mirror", category: "Generator", location: "380 -40",},
    ],
    //Should also use JSON
    [
      { from: 1, to: 0 },
      { from: 2, to: 0 },
      { from: 3, to: 0 },
      { from: 4, to: 0 },
      { from: 5, to: 0 },
      { from: 6, to: 0 },
      { from: 7, to: 0 },
      { from: 8, to: 0 },
      { from: 1, to: 2, fill: "#C4C4C4" },
    ]
  );
  
  //Locates the button that will handle exporting node attributes
  document.querySelector('[id="SaveButton"]').addEventListener("click", save);
  // Locates the button that will handle exporting network map
  document.querySelector('[id="LoadButton"]').addEventListener("click", load);
  document.querySelector('[id="exportDiagram"]').addEventListener("click", makeBlob);
  
  //Locates the button that will handle importing node attributes
 

  // USEFUL BUT UNNECESSARY, does not break code
  // when the document is modified, add a "*" to the title and enable the "Save" button
  diagram.addDiagramListener("Modified", (e) => {
    var button = document.getElementById("SaveButton");
    if (button) button.disabled = !diagram.isModified;
    var idx = document.title.indexOf("*");
    if (diagram.isModified) {
      if (idx < 0) document.title += "*";
    } else {
      if (idx >= 0) document.title = document.title.slice(0, idx);
    }
  });

  //download

  //Export Node Attributes
  // function save() {
  //     document.getElementById("mySavedModel").value = diagram.model.toJson();
  //     diagram.isModified = false;
  // }
  //Export JSON to file
  function save() {
    diagram.isModified = false;
    
    var currentDate = getTime();
    var content = diagram.model.toJson();
    var fileName = "NodeAttributes" + currentDate + ".json";
    var a = document.createElement("a");
    var file = new Blob([content], { type: "text/json" });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  function load() {
    diagram.model = go.Model.fromJson(
      document.getElementById("mySavedModel").value
    );
  }

  function getTime() {
    const dateObj = new Date();
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();

    let hour = dateObj.getHours();
    let mins = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();
    
    var currentDate = `${day}-${month}-${year}_${hour}${mins}${seconds}`;

    return currentDate;
  }

  // Generate data for Network Diagram
  function imageCallback(blob) {
    var url = window.URL.createObjectURL(blob);
    var currentDate = getTime();
    var filename = "NetworkDiagram" + currentDate;

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    // IE 11
    if (window.navigator.msSaveBlob !== undefined) {
      window.navigator.msSaveBlob(blob, filename);
      return;
    }

    document.body.appendChild(a);
    requestAnimationFrame(() => {
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }
  // Create Network Diagram
  function makeBlob() {
    var blob = diagram.makeImageData({ background: "", type: "image/png", returnType: "blob", callback: imageCallback});
  }
  
  window.addEventListener("DOMContentLoaded", MapDisplayer);
  return diagram;
}



export default MapDisplayer;

// A custom Link class that routes directly to the closest horizontal point of an "HBar" node.
// If the regular node is too far to the left or right of the "HBar" node, the link connects
// with the closest end of the "HBar" node.
class BarLink extends go.Link {
  computeSpot(from, port) {
    if (from && this.toNode && this.toNode.category === "HBar")
      return go.Spot.TopBottomSides;
    if (!from && this.fromNode && this.fromNode.category === "HBar")
      return go.Spot.TopBottomSides;
    return super.computeSpot(from, port);
  }

  getLinkPoint(node, port, spot, from, ortho, othernode, otherport) {
    if (!from && node.category === "HBar") {
      var op = super.getLinkPoint( othernode, otherport, this.computeSpot(!from), !from, ortho, node, port);
      var r = port.getDocumentBounds();
      var y = op.y > r.centerY ? r.bottom : r.top;
      if (op.x < r.left) return new go.Point(r.left, y);
      if (op.x > r.right) return new go.Point(r.right, y);
      return new go.Point(op.x, y);
    } else {
      return super.getLinkPoint( node, port, spot, from, ortho, othernode, otherport);
    }
  }

  getLinkDirection( node, port, linkpoint, spot, from, ortho, othernode, otherport
  ) {
    if (node.category === "HBar" || othernode.category === "HBar") {
      var p = port.getDocumentPoint(go.Spot.Center);
      var op = otherport.getDocumentPoint(go.Spot.Center);
      var below = op.y > p.y;
      return below ? 90 : 270;
    } else {
      return super.getLinkDirection( node, port, linkpoint, spot, from, ortho, othernode, otherport
      );
    }
  }
}
