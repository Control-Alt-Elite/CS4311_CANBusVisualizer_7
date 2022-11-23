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

  diagram.nodeTemplate =
  $(go.Node, "Auto",
    { locationSpot: go.Spot.Center },
    $(go.Shape, "RoundedRectangle",
      {
        fill: "white", // the default fill, if there is no data bound value
        portId: "", cursor: "pointer",  // the Shape is the port, not the whole Node
        // allow all kinds of links from and to this port
        fromLinkable: true, fromLinkableSelfNode: false, fromLinkableDuplicates: true,
        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
      },
      new go.Binding("fill", "isHighlighted", highlight => highlight ? "#2378DA" : "#ffffff").ofObject()),
    $(go.TextBlock,
      {
        font: "bold 14px sans-serif",
        stroke: '#333',
        margin: 6,  // make some extra space for the shape around the text
        isMultiline: false,  // don't allow newlines in text
        editable: true  // allow in-place editing by user
      },
      new go.Binding("text", "text").makeTwoWay()),  // the label shows the node data's text
    { // this tooltip Adornment is shared by all nodes
      toolTip:
        $("ToolTip",
          $(go.TextBlock, { margin: 5 },  // the tooltip shows the result of calling nodeInfo(data)
            new go.Binding("text", "", nodeInfo))
        ),
      // this context menu Adornment is shared by all nodes
      contextMenu: partContextMenu
    }
  );
  diagram.linkTemplate =
        $(go.Link,
          { toShortLength: 3, relinkableFrom: true, relinkableTo: true },  // allow the user to relink existing links
          $(go.Shape,
            { strokeWidth: 2 },
            new go.Binding("stroke", "color")),
          $(go.Shape,
            { toArrow: "Standard", stroke: null },
            new go.Binding("fill", "color")),
          { // this tooltip Adornment is shared by all links
            toolTip:
              $("ToolTip",
                $(go.TextBlock, { margin: 4 },  // the tooltip shows the result of calling linkInfo(data)
                  new go.Binding("text", "", linkInfo))
              ),
            // the same context menu Adornment is shared by all links
            contextMenu: partContextMenu
          }
        );

  // define a simple Node template ORIGINAL
  // diagram.nodeTemplate = 
  // $(go.Node, "Auto", // the Shape will go around the TextBlock
  //   new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
  //   $(go.Shape, "RoundedRectangle",
  //     { name: "SHAPE", fill: "#CDCDCD", strokeWidth: 0, fromLinkable: true },
  //     new go.Binding("fill", "color") // Shape.fill is bound to Node.data.color
  //   ),
  //   $(go.TextBlock, { margin: 8, editable: true }, // some room around the text
  //     new go
  //     .Binding("text").makeTwoWay()
  //   )
  // );

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
  document.querySelector('[id="exportDiagram"]').addEventListener("click", makeBlob);
  //Locates the button that will handle importing node attributes
      document.querySelector('[id="nodeSearchButton"]').addEventListener("click", searchDiagram);
      document.querySelector('[id="nodeSearchBar"]').addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            searchDiagram();
          }
        });

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

// TODO context menu for nodes
      // diagram.nodeTemplate.contextMenu =
      //   $("ContextMenu",
      //     $("ContextMenuButton",
      //       $(go.TextBlock, "Copy"),
      //       { click: (e, obj) => e.diagram.commandHandler.copySelection() }),
      //     $("ContextMenuButton",
      //       $(go.TextBlock, "Delete"),
      //       { click: (e, obj) => e.diagram.commandHandler.deleteSelection() }),
      //     $("ContextMenuButton",
      //       $(go.TextBlock, "Undo"),
      //       { click: (e, obj) => e.diagram.commandHandler.undo() }),
      //     $("ContextMenuButton",
      //       $(go.TextBlock, "Redo"),
      //       { click: (e, obj) => e.diagram.commandHandler.redo() }),
         
      //   );
    // Context Menu for the map
    diagram.contextMenu =
    $("ContextMenu",
      $("ContextMenuButton",
        $(go.TextBlock, "Save"),
        { click: (e, obj) => save() }),
      $("ContextMenuButton",
        $(go.TextBlock, "Load"),
        { click: (e, obj) => load() })
    );
    // To simplify this code we define a function for creating a context menu button:
    function makeButton(text, action, visiblePredicate) {
      return $("ContextMenuButton",
        $(go.TextBlock, text),
        { click: action },
        // don't bother with binding GraphObject.visible if there's no predicate
        visiblePredicate ? new go.Binding("visible", "", (o, e) => o.diagram ? visiblePredicate(o, e) : false).ofObject() : {});
    }
    function linkInfo(d) {  // Tooltip info for a link data object
      return "Link:\nfrom " + d.from + " to " + d.to;
    }
    function groupInfo(adornment) {  // takes the tooltip or context menu, not a group node data object
      var g = adornment.adornedPart;  // get the Group that the tooltip adorns
      var mems = g.memberParts.count;
      var links = 0;
      g.memberParts.each(part => {
        if (part instanceof go.Link) links++;
      });
      return "Group " + g.data.key + ": " + g.data.text + "\n" + mems + " members including " + links + " links";
    }
    function nodeInfo(d) {  // Tooltip info for a node data object
      var str = "Node " + d.key + ": " + d.text + "\n";
      if (d.group)
        str += "member of " + d.group;
      else
        str += "top-level node";
      return str;
    }
     // a context menu is an Adornment with a bunch of buttons in them
     var partContextMenu =
     $("ContextMenu",
       makeButton("Properties",
         (e, obj) => {  // OBJ is this Button
           var contextmenu = obj.part;  // the Button is in the context menu Adornment
           var part = contextmenu.adornedPart;  // the adornedPart is the Part that the context menu adorns
           // now can do something with PART, or with its data, or with the Adornment (the context menu)
           if (part instanceof go.Link) alert(linkInfo(part.data));
           else if (part instanceof go.Group) alert(groupInfo(contextmenu));
           else alert(nodeInfo(part.data));
         }),
       makeButton("Cut",
         (e, obj) => e.diagram.commandHandler.cutSelection(),
         o => o.diagram.commandHandler.canCutSelection()),
       makeButton("Copy",
         (e, obj) => e.diagram.commandHandler.copySelection(),
         o => o.diagram.commandHandler.canCopySelection()),
       makeButton("Paste",
         (e, obj) => e.diagram.commandHandler.pasteSelection(e.diagram.toolManager.contextMenuTool.mouseDownPoint),
         o => o.diagram.commandHandler.canPasteSelection(o.diagram.toolManager.contextMenuTool.mouseDownPoint)),
       makeButton("Delete",
         (e, obj) => e.diagram.commandHandler.deleteSelection(),
         o => o.diagram.commandHandler.canDeleteSelection()),
       makeButton("Undo",
         (e, obj) => e.diagram.commandHandler.undo(),
         o => o.diagram.commandHandler.canUndo()),
       makeButton("Redo",
         (e, obj) => e.diagram.commandHandler.redo(),
         o => o.diagram.commandHandler.canRedo()),
       makeButton("Group",
         (e, obj) => e.diagram.commandHandler.groupSelection(),
         o => o.diagram.commandHandler.canGroupSelection()),
       makeButton("Ungroup",
         (e, obj) => e.diagram.commandHandler.ungroupSelection(),
         o => o.diagram.commandHandler.canUngroupSelection())
     );
  

     function searchDiagram() {  // called by button
      var input = document.getElementById("nodeSearchBar");

      if (!input) return;
      diagram.focus();

      diagram.startTransaction("highlight search");

      if (input.value) {
        // search four different data properties for the string, any of which may match for success
        // create a case insensitive RegExp from what the user typed
        var safe = input.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var regex = new RegExp(safe, "i");
        var results = diagram.findNodesByExample(
          { key: regex },
          { text: regex },
          { category: regex },
          // { headOf: regex }
          );
        diagram.highlightCollection(results);
        // try to center the diagram at the first node that was found
        if (results.count > 0) diagram.centerRect(results.first().actualBounds);
      } else {  // empty string only clears highlighteds collection
        diagram.clearHighlighteds();
      }

      diagram.commitTransaction("highlight search");
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
