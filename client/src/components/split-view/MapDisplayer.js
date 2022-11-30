import * as go from "gojs";
import "./MapDisplayer.css";

//This will render the GOJS map
function MapDisplayer() {
  const $ = go.GraphObject.make;
  const diagram = $(go.Diagram,
    {
      //This section effectively allows extensions to be added to the canvas
      "undoManager.isEnabled": true, // must be set to allow for model change listening
      "clickCreatingTool.archetypeNodeData": { text: "Node", color: "#CDCDCD" }, //Allows double clicking to create node
      "commandHandler.archetypeGroupData": { text: "Group", isGroup: true, color: "blue" },

      model: new go.GraphLinksModel({ // IMPORTANT! Necessary otherwise nodes will not display
        linkKeyProperty: "key",
      }),
    });


  // Dont think this does anything
  // diagram.linkTemplate = $(go.Link,
  //   { toShortLength: 3, relinkableFrom: true, relinkableTo: true }, // allow the user to relink existing links
  //   $(go.Shape, { strokeWidth: 2 }, new go.Binding("stroke", "color")),
  //   $(
  //     go.Shape,
  //     { toArrow: "Standard", stroke: null },
  //     new go.Binding("fill", "color")
  //   ),
  //   {
  //     // this tooltip Adornment is shared by all links
  //     toolTip: $(
  //       "ToolTip",
  //       $(
  //         go.TextBlock,
  //         { margin: 4 }, // the tooltip shows the result of calling linkInfo(data)
  //         new go.Binding("text", "", linkInfo)
  //       )
  //     ),
  //     // the same context menu Adornment is shared by all links
  //     contextMenu: partContextMenu,
  //   }
  // );

  //-----------------TEST------------------------------
  // This function provides a common style for most of the TextBlocks.
  // Some of these values may be overridden in a particular TextBlock.
  function textStyle() {
    return { font: "9pt  Segoe UI,sans-serif", stroke: "white" };
  }
  // this is used to determine feedback during drags
  function mayWorkFor(node1, node2) {
    if (!(node1 instanceof go.Node)) return false;  // must be a Node
    if (node1 === node2) return false;  // cannot work for yourself
    if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
    return true;
  }
  // This converter is used by the Picture.
  function findHeadShot(pic) {
    if (!pic) return "pc.png"; // There are only 16 images on the server
    return "" + pic;
  }
  function addEmployee(node) {
    if (!node) return;
    const thisemp = node.data;
    diagram.startTransaction("add employee");
    const newemp = { name: "(new person)", title: "(title)", comments: "", parent: thisemp.key };
    diagram.model.addNodeData(newemp);
    const newnode = diagram.findNodeForData(newemp);
    if (newnode) newnode.location = node.location;
    diagram.commitTransaction("add employee");
    diagram.commandHandler.scrollToPart(newnode);
  }

  //--------------------END TEST-----------------------------------------
  // NEWEST NICE LOOKING NODE TEMPLATE. MUST BE THE FINAL VERSION
  // diagram.nodeTemplate =$(go.Node, "Spot",
  //     {
  //       selectionObjectName: "BODY",
  //       mouseEnter: (e, node) => node.findObject("BUTTON").opacity = node.findObject("BUTTONX").opacity = 1,
  //       mouseLeave: (e, node) => node.findObject("BUTTON").opacity = node.findObject("BUTTONX").opacity = 0,
  //       // handle dragging a Node onto a Node to (maybe) change the reporting relationship
  //       mouseDragEnter: (e, node, prev) => {
  //         const diagram = node.diagram;
  //         const selnode = diagram.selection.first();
  //         if (!mayWorkFor(selnode, node)) return;
  //         const shape = node.findObject("SHAPE");
  //         if (shape) {
  //           shape._prevFill = shape.fill;  // remember the original brush
  //           shape.fill = "darkred";
  //         }
  //       },
  //       mouseDragLeave: (e, node, next) => {
  //         const shape = node.findObject("SHAPE");
  //         if (shape && shape._prevFill) {
  //           shape.fill = shape._prevFill;  // restore the original brush
  //         }
  //       },
  //       mouseDrop: (e, node) => {
  //         const diagram = node.diagram;
  //         const selnode = diagram.selection.first();  // assume just one Node in selection
  //         if (mayWorkFor(selnode, node)) {
  //           // find any existing link into the selected node
  //           const link = selnode.findTreeParentLink();
  //           if (link !== null) {  // reconnect any existing link
  //             link.fromNode = node;
  //           } else {  // else create a new link
  //             diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
  //           }
  //         }
  //       }
  //     },
  //     // for sorting, have the Node.text be the data.name
  //     new go.Binding("text", "name"),
  //     // bind the Part.layerName to control the Node's layer depending on whether it isSelected
  //     new go.Binding("layerName", "isSelected", sel => sel ? "Foreground" : "").ofObject(),
  //     $(go.Panel, "Auto",
  //       { name: "BODY" },
  //       // define the node's outer shape
  //       $(go.Shape, "Rectangle",
  //         { name: "SHAPE", fill: "#333333", stroke: 'white', strokeWidth: 3.5, portId: "" }),
  //       $(go.Panel, "Horizontal",
  //         $(go.Picture,
  //           {
  //             name: "Picture",
  //             desiredSize: new go.Size(70, 70),
  //             margin: 1.5,
  //             source: "./images/node_car-cpu.png"  // the default image
  //           },
  //           new go.Binding("source", "pic", findHeadShot)),
  //         // define the panel where the text will appear
  //         $(go.Panel, "Table",
  //           {
  //             minSize: new go.Size(130, NaN),
  //             maxSize: new go.Size(150, NaN),
  //             margin: new go.Margin(6, 10, 0, 6),
  //             defaultAlignment: go.Spot.Left
  //           },
  //           $(go.RowColumnDefinition, { column: 2, width: 4 }),
  //           $(go.TextBlock, textStyle(),  // the name
  //             {
  //               name: "NAMETB",
  //               row: 0, column: 0, columnSpan: 5,
  //               font: "12pt Segoe UI,sans-serif",
  //               editable: true, isMultiline: false,
  //               minSize: new go.Size(50, 16)
  //             },
  //             new go.Binding("text", "name").makeTwoWay()),
  //           $(go.TextBlock, "Title: ", textStyle(),
  //             { row: 1, column: 0 }),
  //           $(go.TextBlock, textStyle(),
  //             {
  //               row: 1, column: 1, columnSpan: 4,
  //               editable: true, isMultiline: false,
  //               minSize: new go.Size(50, 14),
  //               margin: new go.Margin(0, 0, 0, 3)
  //             },
  //             new go.Binding("text", "title").makeTwoWay()),
  //           $(go.TextBlock, textStyle(),
  //             { row: 2, column: 0 },
  //             new go.Binding("text", "key", v => "ID: " + v)),
  //           $(go.TextBlock, textStyle(),  // the comments
  //             {
  //               row: 3, column: 0, columnSpan: 5,
  //               font: "italic 9pt sans-serif",
  //               wrap: go.TextBlock.WrapFit,
  //               editable: true,  // by default newlines are allowed
  //               minSize: new go.Size(100, 14)
  //             },
  //             new go.Binding("text", "comments").makeTwoWay())
  //         ) // end Table Panel
  //       ) // end Horizontal Panel
  //     ), // end Auto Panel

  // );


  // Reference ICON TEMPLATE
  // diagram.nodeTemplateMap.add( "Consumer", $(go.Node,"Spot", {
  //     locationSpot: go.Spot.Center,
  //     locationObjectName: "BODY",
  //     selectionObjectName: "BODY",
  //   },
  //   new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
  //   $(go.Picture, "./images/laptop.png", {
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



  //------------------------------------- ALL WORKING TEMPATES FOR THE MAP ARE DEFINED BELOW vvvv --------------------------------------------

  //BUS LINE
  diagram.nodeTemplateMap.add(
    "HBar", $(go.Node, "Spot", new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
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
  //DEFINE CONTEXT MENU. Migrated into the working node template TODO REMOVE
  // var partContextMenu = $(
  //     "ContextMenu",
  //     makeButton("Properties", (e, obj) => {
  //       // OBJ is this Button
  //       var contextmenu = obj.part; // the Button is in the context menu Adornment
  //       var part = contextmenu.adornedPart; // the adornedPart is the Part that the context menu adorns
  //       // now can do something with PART, or with its data, or with the Adornment (the context menu)
  //       if (part instanceof go.Link) alert(linkInfo(part.data));
  //       else if (part instanceof go.Group) alert(groupInfo(contextmenu));
  //       else alert(nodeInfo(part.data));
  //     }),
  //     makeButton(
  //       "Cut",
  //       (e, obj) => e.diagram.commandHandler.cutSelection(),
  //       (o) => o.diagram.commandHandler.canCutSelection()
  //     ),
  //     makeButton(
  //       "Copy",
  //       (e, obj) => e.diagram.commandHandler.copySelection(),
  //       (o) => o.diagram.commandHandler.canCopySelection()
  //     ),
  //     makeButton(
  //       "Paste",
  //       (e, obj) =>
  //         e.diagram.commandHandler.pasteSelection(
  //           e.diagram.toolManager.contextMenuTool.mouseDownPoint
  //         ),
  //       (o) =>
  //         o.diagram.commandHandler.canPasteSelection(
  //           o.diagram.toolManager.contextMenuTool.mouseDownPoint
  //         )
  //     ),
  //     makeButton(
  //       "Delete",
  //       (e, obj) => e.diagram.commandHandler.deleteSelection(),
  //       (o) => o.diagram.commandHandler.canDeleteSelection()
  //     ),
  //     makeButton(
  //       "Undo",
  //       (e, obj) => e.diagram.commandHandler.undo(),
  //       (o) => o.diagram.commandHandler.canUndo()
  //     ),
  //     makeButton(
  //       "Redo",
  //       (e, obj) => e.diagram.commandHandler.redo(),
  //       (o) => o.diagram.commandHandler.canRedo()
  //     ),
  //     makeButton(
  //       "Group",
  //       (e, obj) => e.diagram.commandHandler.groupSelection(),
  //       (o) => o.diagram.commandHandler.canGroupSelection()
  //     ),
  //     makeButton(
  //       "Ungroup",
  //       (e, obj) => e.diagram.commandHandler.ungroupSelection(),
  //       (o) => o.diagram.commandHandler.canUngroupSelection()
  //     ),
  //    makeButton(
  //     "Set Off-Limits",
  //     (e, obj) => SetOffLimitsColor(),
  //     (o) => SetOffLimitsColor()
  //    )
  // );

  // Changes color for off-limits nodes used in map context menu
  function SetOffLimitsColor(e, obj) {
    diagram.commit(function (d) {

      var contextmenu = obj.part; // retrieve context menu that has the button that triggered this method
      var nodedata = contextmenu.data; // retrieve data of the node that the context menu was used on
      var newcolor = "#CDCDCD";
      switch (nodedata.color) {
        case "#CDCDCD": newcolor = "#727476"; break;
        case "#727476": newcolor = "#CDCDCD"; break;
      }
      // modify the node data
      // this evaluates data Bindings and records changes in the UndoManager
      d.model.set(nodedata, "color", newcolor);
    }, "changed color");
  }

  //********************NODE TEMPLATE GOES HERE*******************************************
  //CONTAINS PICTURE, NODE ATTRIBUTES, CONTEXT MENU, AND SEARCH
  diagram.nodeTemplate = $(go.Node, "Auto", // the Shape will go around the TextBlock
    new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify), //Allows for coordinates to be used
    $(go.Shape, "RoundedRectangle",
      {
        fill: "#CDCDCD", // the default fill, if there is no data bound value
        cursor: "pointer", // the Shape is the port, not the whole Node
      },
      new go.Binding("fill", "color"),
      new go.Binding("fill", "isHighlighted", (highlight) => highlight ? "#2378DA" : "#CDCDCD").ofObject(),
      new go.Binding("visible", "visible"),

    ),
    // $(go.Picture, "https://cdn.7tv.app/emote/60aecb385174a619dbc175be/2x.webp"),
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
            $(go.TextBlock, "Change Color"),
            { click: SetOffLimitsColor })
          // more ContextMenuButtons would go here
        )  // end Adornment
    }
  );
  //***************************************************************



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
  //Should use JSON
  // {key, ecuName, location, offlimits, isVisible, annotation, flags,iconFilePath}
  // GOJS MAY NOT ALLOW LOCAL IMAGES
  // CURRENTLY USING ONLINE IMAGE
  var nodeDataArray = [
    { key: 0, text: "", category: "HBar", location: "100 100", size: "500 4", fill: "#C4C4C4", },
    // { key: 1, text: "Suspension", category: "Generator", location: "250 -50" },
    // { key: 2, text: "ABS", location: "150 10" },
    // { key: 3, text: "Engine", category: "Generator", location: "500 30" },
    // { key: 5, text: "Air Conditioner", category: "Generator", location: "400 260"},
    // { key: 6, text: "Window", category: "Generator", location: "200 250" },
    // { key: 7, text: "Battery", category: "Generator", location: "310 180" },
    // { key: 8, text: "Outside Mirror", category: "Generator", location: "380 -40",
    // },
  ];

  //Should also use JSON
  var linkDataArray = [
    // { from: 1, to: 0 },
    // { from: 2, to: 0 },
    // { from: 3, to: 0 },
    // { from: 4, to: 0 },
    // { from: 5, to: 0 },
    // { from: 6, to: 0 },
    // { from: 7, to: 0 },
    // { from: 8, to: 0 },
    // { from: 1, to: 2, fill: "#C4C4C4" },
  ];

  //USES BOTH ARRAYS ABOVE TO GENERATE MAP
  diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

  //Locates the button that will handle exporting node attributes
  document.querySelector('[id="SaveButton"]').addEventListener("click", save);
  // Locates the button that will handle exporting network map
  document.querySelector('[id="exportDiagram"]').addEventListener("click", makeBlob);
  //TODO Locates the button that will handle importing node attributes

  //Locates the elements on the page that will handle searching nodes
  document.querySelector('[id="nodeSearchButton"]').addEventListener("click", searchDiagram);
  document.querySelector('[id="nodeSearchBar"]').addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchDiagram();
    }
  });

  // TODO Discuss removal... USEFUL BUT UNNECESSARY
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

  // ------------------------------- Dynamic Nodes --------------------------
  let eventSource;
  var playing = false;
  document.querySelector('[id="playtraffic"]').addEventListener("click", createLiveNodes);
  document.querySelector('[id="stoptraffic"]').addEventListener("click", stopLiveNodes);


  // ------------------------------ DYNAMIC NODE FUNCTIONS --------------------------
  function createLiveNodes() {
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
          diagram.model.addNodeData(
            { key: parsedData.id, text: `${parsedData.ecu}`, category: "Category", location: "0 0" },
          );
          diagram.model.addLinkData(
            { from: parsedData.id, to: 0 }
          );
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

  //-------------------------------------vvvv ALL FUNCTIONS USED FOR THE MAP ARE DEFINED BELOW vvvv --------------------------------------------

  //Original export Node Attributes
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

  //Import node attributes
  function load() {
    diagram.model = go.Model.fromJson(
      //Logic for Open/Browse "node attributes".json here
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

  function zoomIn() {
    if (diagram.commandHandler.canIncreaseZoom()) {
      diagram.commandHandler.increaseZoom(1.2);
    }

  }
  //TODO: test zoom out
  function zoomOut() {
    if (diagram.commandHandler.canDecreaseZoom()) {
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

  //CONTEXT MENU TESTS----------------------------------------

  //define a function for creating a context menu button:
  function makeButton(text, action, visiblePredicate) {
    return $(
      "ContextMenuButton",
      $(go.TextBlock, text),
      { click: action },
      // don't bother with binding GraphObject.visible if there's no predicate
      visiblePredicate
        ? new go.Binding("visible", "", (o, e) =>
          o.diagram ? visiblePredicate(o, e) : false
        ).ofObject()
        : {}
    );
  }


  //TODO remove
  function linkInfo(d) {
    // Tooltip info for a link data object
    return "Link:\nfrom " + d.from + " to " + d.to;
  }
  // Activates on node hover. Will show annotation and node info
  function nodeInfo(d) {
    // Tooltip info for a node data object
    var str = "Node " + d.key + ": " + d.text;
    return str;
  }
  //TODO remove
  function groupInfo(adornment) {
    // takes the tooltip or context menu, not a group node data object
    var g = adornment.adornedPart; // get the Group that the tooltip adorns
    var mems = g.memberParts.count;
    var links = 0;
    g.memberParts.each((part) => {
      if (part instanceof go.Link) links++;
    });
    return (
      "Group " +
      g.data.key +
      ": " +
      g.data.text +
      "\n" +
      mems +
      " members including " +
      links +
      " links"
    );
  }
  //TODO Discuss if we need to keep or remove
  // Context Menu that shows up while not hovering over nodes.
  diagram.contextMenu = $(
    "ContextMenu",
    $("ContextMenuButton", $(go.TextBlock, "Save"), {
      click: (e, obj) => save(),
    }),
    $("ContextMenuButton", $(go.TextBlock, "Load"), {
      click: (e, obj) => load(),
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

  //End of MapDisplayer functionality
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
      var op = super.getLinkPoint(othernode, otherport, this.computeSpot(!from), !from, ortho, node, port);
      var r = port.getDocumentBounds();
      var y = op.y > r.centerY ? r.bottom : r.top;
      if (op.x < r.left) return new go.Point(r.left, y);
      if (op.x > r.right) return new go.Point(r.right, y);
      return new go.Point(op.x, y);
    } else {
      return super.getLinkPoint(node, port, spot, from, ortho, othernode, otherport);
    }
  }

  getLinkDirection(node, port, linkpoint, spot, from, ortho, othernode, otherport
  ) {
    if (node.category === "HBar" || othernode.category === "HBar") {
      var p = port.getDocumentPoint(go.Spot.Center);
      var op = otherport.getDocumentPoint(go.Spot.Center);
      var below = op.y > p.y;
      return below ? 90 : 270;
    } else {
      return super.getLinkDirection(node, port, linkpoint, spot, from, ortho, othernode, otherport
      );
    }
  }
}
