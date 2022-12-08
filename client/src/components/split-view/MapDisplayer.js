import * as go from "gojs";
import blacklist from "./blacklist.csv";
import "./MapDisplayer.css";

//This will render the GOJS map
function MapDisplayer() {
  const $ = go.GraphObject.make; 
  const diagram = $(go.Diagram, 
    {
    //This section effectively allows extensions to be added to the canvas
    "undoManager.isEnabled": true, // must be set to allow for model change listening
    "clickCreatingTool.archetypeNodeData": {text: "Node", color: "#CDCDCD"}, //Allows double clicking to create node
    "commandHandler.archetypeGroupData": {text: "Group", isGroup: true, color: "blue"},

    model: new go.GraphLinksModel({ // IMPORTANT! Necessary otherwise nodes will not display
      linkKeyProperty: "key",
    }),
  });

  //------------------------------------- ALL TEMPATES FOR THE MAP ARE DEFINED BELOW vvvv --------------------------------------------
  //MAP BUS LINE
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
      $(go.Shape,"Rectangle",
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
  // Changes color for off-limits nodes used in map context menu
  function SetOffLimitsColor(e, obj) {
    diagram.commit(function (d) {

      var contextmenu = obj.part; // retrieve context menu that has the button that triggered this method
      var nodedata = contextmenu.data; // retrieve data of the node that the context menu was used on
      var newcolor = "#727476";
      switch (nodedata.color) {
        case "#CDCDCD": newcolor = "#727476"; break;
        case "#727476": newcolor = "#CDCDCD"; break;
      }
      // modify the node data
      // this evaluates data Bindings and records changes in the UndoManager
      d.model.set(nodedata, "color", newcolor);
    }, "changed color");
  }
  //CONTAINS PICTURE, NODE ATTRIBUTES, CONTEXT MENU, AND SEARCH
  diagram.nodeTemplate = $( go.Node,"Auto", // the Shape will go around the TextBlock
  new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify), //Allows for coordinates to be used
  $(go.Shape, "RoundedRectangle",
    {
      name: "SHAPE",
      fill: "#CDCDCD", // the default fill, if there is no data bound value
      cursor: "pointer", // the Shape is the port, not the whole Node
      portId: "",
      fromLinkable: true,
      toLinkable: true,
    },
    new go.Binding("fill", "color"),
    new go.Binding("fill", "isHighlighted", (highlight) =>highlight ? "#2378DA" : "#CDCDCD").ofObject(),
    new go.Binding("visible", "visible"),

  ),
  $(go.Picture, { maxSize: new go.Size(50, 50) },
    new go.Binding("source", "img")),
  $(go.TextBlock,
    {
      font: "bold 14px sans-serif",
      margin: 8, // space arount text
      isMultiline: false, //disallow newlines
      editable: true, //edit by double clicking
    },
    new go.Binding("text", "text").makeTwoWay()
  ), // the label shows the node data's text
  {
    // this tooltip Adornment is shared by all nodes
    toolTip: $("ToolTip",
      $(go.TextBlock,
        { margin: 5 }, // the tooltip shows the result of calling nodeInfo(data)
        new go.Binding("text", "", nodeInfo)
      )
    ),
    // this context menu Adornment is shared by all nodes
    contextMenu:
    $("ContextMenu",  // that has one button
      $("ContextMenuButton", {
        "ButtonBorder.fill": "white",
        "_buttonFillOver": "skyblue"
      },
      $(go.TextBlock, "Set Off-Limits"),
      
      { click: SetOffLimitsColor }),
      $("ContextMenuButton", {
       "ButtonBorder.fill": "white",
       "_buttonFillOver": "skyblue"
     },
     $(go.TextBlock, "toggle visibility"),
     { click: SetOffLimitsColor })
    // more ContextMenuButtons can go here
  ) 
  }
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
    $(go.Shape, { strokeWidth: 2,})
  );

  //DEFINE NODES AND LINKS
  // {key, ecuName, location, offlimits, isVisible, annotation, flags,iconFilePath}
  var nodeDataArray = [
    { key: 0, text: "", category: "HBar", location: "100 100", size: "1000 4", fill: "#C4C4C4", },
  ];
  var linkDataArray = [];
  //USES BOTH ARRAYS ABOVE TO GENERATE MAP
  diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);


  //Locates the button that will handle exporting node attributes
  document.querySelector('[id="SaveButton"]').addEventListener("click", save);
  // Locates the button that will handle exporting network map
  document.querySelector('[id="exportDiagram"]').addEventListener("click", makeBlob);
  // Locates the button that will handle importing node attributes
  document.querySelector('[id="LoadButton"]').addEventListener("click", openFileDialog);
  //Locates the elements on the page that will handle searching nodes
  document.querySelector('[id="nodeSearchButton"]').addEventListener("click", searchDiagram);
  document.querySelector('[id="nodeSearchBar"]').addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        searchDiagram();
      }
    });

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

  // ------------------------------- Dynamic NODES --------------------------
  let eventSource;
  var playing = false;
  document.querySelector('[id="playtraffic"]').addEventListener("click", createLiveNodes);
  document.querySelector('[id="stoptraffic"]').addEventListener("click", stopLiveNodes);

  // ------------------------------ DYNAMIC NODE FUNCTIONS --------------------------
  function readBlacklist() {
    var blackListMap = [];
    fetch(blacklist).then(r => r.text()).then(text => {
      var nodes = text.split("\n");
      nodes.shift();//remove header line

      nodes.forEach((node) => {
        var data = node.split(',');
        blackListMap.push({ id: data[0], ecu: data[1] });
      });
    });
    return blackListMap;
  }

  function createLiveNodes() {
    var blacklistedNodes = readBlacklist();

    if (!playing) {
      playing = true; // set state of live nodes

      console.log('Starting live nodes');
      const url1 = 'http://localhost:3001/packets';

      eventSource = new EventSource(url1)
      eventSource.onmessage = (e) => {
        const parsedData = JSON.parse(e.data);
        // Check if node exists in the map
        const isFound = diagram.model.findNodeDataForKey(`${parsedData.id}`);

        // If node not found, add to the model
        if (isFound == null && !parsedData.ecu.includes('unpack requires')) {
          console.log(`Adding node data`);

          // Check if current message node is part of blacklist
          var isBlacklisted = false;
          blacklistedNodes.forEach((node) => {
              if(node.id == parsedData.id){
                isBlacklisted = true;
              }
          });

          // Add node data to map and links
          diagram.model.addNodeData(
            { key: parsedData.id, text: `${parsedData.ecu}`},
          );
          diagram.model.addLinkData(
            { from: parsedData.id, to: 0 }
          );
        }

        // if node is black listed, change color
        if(isBlacklisted){// TODO CHANGE THIS TO ACTUALLY CHANGE THE COLOR
          const node = diagram.findNodeForKey(parsedData.id);
          const shape = node.findObject("SHAPE");
          shape.fill = "#727476";
        }
      }
    }
  }

  function stopLiveNodes() {
    if (playing) {
      eventSource.close();
      playing = false; // set statue for live nodes
      console.log('Closing live nodes');
    }
  }

  //-------------------------------------ALL FUNCTIONS USED FOR THE MAP ARE DEFINED BELOW--------------------------------------------


  // Function for zooming in 
  function zoomIn(){
    if(diagram.commandHandler.canIncreaseZoom()){
      diagram.commandHandler.increaseZoom(1.2);
    }

  }
  // Function for zoom out
  function zoomOut(){
    if(diagram.commandHandler.canDecreaseZoom()){
      diagram.commandHandler.decreaseZoom(.5);
    }

  }


  // Import node attributes
  function openFileDialog () {  // this function must be called from  a user
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => { 

       // getting a hold of the file reference
       var file = e.target.files[0]; 

       // setting up the reader
       var reader = new FileReader();
       reader.readAsText(file,'UTF-8');

       // here we tell the reader what to do when it's done reading...
       reader.onload = readerEvent => {
          var content = readerEvent.target.result; // this is the content!
          console.log( content ); //Print the content
          diagram.model = go.Model.fromJson(content);
       }

    }

    input.click();
  }

  // Export JSON to file
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
  //TODO: Function for zooming in 
  function zoomIn(){
    if(diagram.commandHandler.canIncreaseZoom()){
      diagram.commandHandler.increaseZoom(1.2);
    }
    
  }
  //TODO: test zoom out
  function zoomOut(){
    if(diagram.commandHandler.canDecreaseZoom()){
      diagram.commandHandler.decreaseZoom(.5);
    }
    
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
    var blob = diagram.makeImageData({
      background: "",
      type: "image/png",
      returnType: "blob",
      callback: imageCallback,
    });
  }


  // Activates on node hover. Will show node count
  function diagramInfo(model) {
    // Tooltip info for the diagram's model
    return (
      "Model:\n" +
      model.nodeDataArray.length +
      " nodes, "
    );
  }
  diagram.toolTip = $(
    "ToolTip",
    $(go.TextBlock, { margin: 4 }, new go.Binding("text", "", diagramInfo))
  );

  // Activates on node hover. Will show node info, ID and Name
  function nodeInfo(d) {
    // Tooltip info for a node data object
    var str = "Node " + d.key + ": " + d.text;
    return str;
  }

  // Context Menu that shows up while not hovering over nodes.
  diagram.contextMenu = $(
    "ContextMenu",
    $("ContextMenuButton", $(go.TextBlock, "Save"), {
      click: (e, obj) => save(),
    }),
    $("ContextMenuButton", $(go.TextBlock, "Load"), {
      click: (e, obj) => openFileDialog(),
    }),
    $("ContextMenuButton", $(go.TextBlock, "Zoom in"), {
      click: (e, obj) => zoomIn(),
    }),
    $("ContextMenuButton", $(go.TextBlock, "Zoom out"), {
      click: (e, obj) => zoomOut(),
    })
  );



  function searchDiagram() {
    var input = document.getElementById("nodeSearchBar");

    if (!input) return;
    diagram.focus();

    diagram.startTransaction("highlight search");

    if (input.value) {
      // Below we will provide the criteria that the map will search for
      // The regex is not case sensitive
      var safe = input.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var regex = new RegExp(safe, "i");
      var results = diagram.findNodesByExample(
        { key: regex },
        { text: regex },
      );
      diagram.highlightCollection(results);
      // try to center the diagram at the first node that was found
      if (results.count > 0) diagram.centerRect(results.first().actualBounds);
    } else {
      // empty string only clears highlighteds collection
      diagram.clearHighlighteds();
    }

    diagram.commitTransaction("highlight search");
  }

  // End of MapDisplayer functionality
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
