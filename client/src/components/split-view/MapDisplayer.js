import * as go from "gojs";
import "./MapDisplayer.css";

// add gojs stuff here
function MapDisplayer() {
  const $ = go.GraphObject.make; // defines demplate for map

  const diagram = $(go.Diagram, { //Setting params for methods that will be used in the map
    

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

  //USEFUL BUT UNNECESSARY, does not break code
  // when the document is modified, add a "*" to the title and enable the "Save" button
  diagram.addDiagramListener("Modified", (e) => {
    var button = document.getElementById("saveModel");
    if (button) button.disabled = !diagram.isModified;
    var idx = document.title.indexOf("*");
    if (diagram.isModified) {
      if (idx < 0) document.title += "*";
    } else {
      if (idx >= 0) document.title = document.title.slice(0, idx);
    }
  });


  // define a simple Node template ORIGINAL
  diagram.nodeTemplate = $(
    go.Node, "Auto", // the Shape will go around the TextBlock
    new go.Binding("location", "location", go.Point.parse).makeTwoWay( go.Point.stringify),
    $( go.Shape, "RoundedRectangle",
      { name: "SHAPE", fill: "#CDCDCD", strokeWidth: 0, fromLinkable: true,},
      new go.Binding("fill", "color") // Shape.fill is bound to Node.data.color
    ),
    $(go.TextBlock,
      { margin: 8, editable: true }, // some room around the text
      new go.Binding("text").makeTwoWay()
    )
  );
  //NEW NODE SPECIFICATIONS
  diagram.nodeTemplateMap.add( "Consumer",
    $(go.Node,"Spot", {
        locationSpot: go.Spot.Center,
        locationObjectName: "BODY",
        selectionObjectName: "BODY",
      },
      new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Picture, "./images/pc.png", {
        name: "BODY",
        width: 50,
        height: 40,
        margin: 2,
        portId: "",
        fromLinkable: true,
        cursor: "pointer",
        fromSpot: go.Spot.TopBottomSides,
        toSpot: go.Spot.TopBottomSides,
      }),
      $(go.TextBlock, {
          // alignment: go.Spot.Right,
          // alignmentFocus: go.Spot.Left,
          editable: true,
        },
        new go.Binding("text").makeTwoWay()
      )
    )
  );

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

  //BUS LINE
  diagram.nodeTemplateMap.add("HBar",
    $(go.Node, "Spot",
      new go.Binding("location", "location", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
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
            alignment: go.Spot.Left,
            cursor: "col-resize",
            desiredSize: new go.Size(6, 6),
            fill: "lightblue",
            stroke: "dodgerblue",
          }),
          $(go.Shape, {
            // when line is selected, this is the right resize handle button that displays
            alignment: go.Spot.Right,
            cursor: "col-resize",
            desiredSize: new go.Size(6, 6),
            fill: "lightblue",
            stroke: "dodgerblue",
          })
        ),
      },
      $(go.Shape, "Rectangle",{
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
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
      new go.Binding("fill"),{ 
          portId: "", 
          toLinkable: true 
        }
      ),
      $(go.TextBlock,{
          alignment: go.Spot.Right,
          alignmentFocus: go.Spot.Left,
          editable: true,
        },
      new go.Binding("text").makeTwoWay()
      )
    )
  );

  //   load();

  //   all pallete stuff breaks code
  // const palette = $(go.Palette, "myPaletteDiv", {
  //   nodeTemplateMap: diagram.nodeTemplateMap,
  //   layout: $(go.GridLayout, {
  //     cellSize: new go.Size(2, 2),
  //     isViewportSized: true,
  //   }),
  // });

  //   palette.model.nodeDataArray = [
  //     { text: "Generator", category: "Generator" },
  //     { text: "Consumer", category: "Consumer" },
  //     { text: "Connector", category: "Connector" },
  //     { text: "Bar", category: "HBar", size: "100 4" },
  //   ];

  //   remove cursors on all ports in the Palette
  //   make TextBlocks invisible, to reduce size of Nodes
  //   palette.nodes.each((node) => {
  //     node.ports.each((port) => (port.cursor = ""));
  //     node.elements.each((tb) => {
  //       if (tb instanceof go.TextBlock) tb.visible = false;
  //     });
  //   });

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
      var op = super.getLinkPoint(
        othernode,
        otherport,
        this.computeSpot(!from),
        !from,
        ortho,
        node,
        port
      );
      var r = port.getDocumentBounds();
      var y = op.y > r.centerY ? r.bottom : r.top;
      if (op.x < r.left) return new go.Point(r.left, y);
      if (op.x > r.right) return new go.Point(r.right, y);
      return new go.Point(op.x, y);
    } else {
      return super.getLinkPoint(
        node,
        port,
        spot,
        from,
        ortho,
        othernode,
        otherport
      );
    }
  }

  getLinkDirection(
    node,
    port,
    linkpoint,
    spot,
    from,
    ortho,
    othernode,
    otherport
  ) {
    if (node.category === "HBar" || othernode.category === "HBar") {
      var p = port.getDocumentPoint(go.Spot.Center);
      var op = otherport.getDocumentPoint(go.Spot.Center);
      var below = op.y > p.y;
      return below ? 90 : 270;
    } else {
      return super.getLinkDirection(
        node,
        port,
        linkpoint,
        spot,
        from,
        ortho,
        othernode,
        otherport
      );
    }
  }
}

// Following functions are useful for system persistence, currently do not work
// save a model to and load a model from JSON text, displayed below the Diagram

// function save() {
//   document.getElementById("mySavedModel").value = diagram.model.toJson();
//   diagram.isModified = false;
// }

// function load() {
//   diagram.model = go.Model.fromJson(
//     document.getElementById("mySavedModel").value
//   );
// }
