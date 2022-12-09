# Installation instructions

1. Clone the repo or download the zip to a directory of your choosing

2. Download [Mongo DB Community Server](https://www.mongodb.com/try/download/community) for your OS along with [Mongo DB Shell (mongosh)](https://www.mongodb.com/try/download/shell?jmp=docs)

3. Download [Node.js](https://nodejs.org/en/) for your OS. You can keep clicking next since you do not need to select any extra modules with this installer

4. After the initial installations complete, restart your machine and proceed to the setup steps

### Please Note
- When downloading MongoDB Community, ensure that you enable "Run service as Network Service User"

- You can choose to download MongoDB Compass for viewing the database in a GUI format, otherwise 
it can be viewed on the shell
<br></br>

## Front-End Setup
1. Open your command line/terminal and navigate to the "client" folder using the command line.
use the following commands:
```
npm init -y
npx create-react-app
npm install axios react react-dom react-router-dom react-scripts web-vitals react-bootstrap bootstrap framer-motion react-native-web gojs-react styled-components
```
<br></br>
## Back-End Setup
1. Using the command line, navigate to the "api" folder.
Use the following commands:
```
npm init -y
npm install body-parser cors dotenv ejs express mongoose multer nodemon socketcan
```
2. Double check if you have the latest version of nodemon with this command and update if needed
```
npx nodemon@latest --version
```
<br></br>
<br></br>
# Usage Instructions
1. Open two terminals and navigate to the "api" and "client" folders respectively.
2. Use the following command on both terminals:
```
npm start

For linux users, use the following command to start the database:
sudo service mongod start
```

- Using on the "api" folder will connect to the database
- Using on the "client" folder will open the site

<br></br>
<br></br>

# Runner and installation Script
1. Put runner.sh in a directory one level above this repo. For example `/home/kali/Downloads` where runner.sh is in `/home/kali/Downloads/CS4311_CANBusVisualizer_7`.
2. Open a terminal and navigate to `/Downloads`
3. Run it by typing the following command:

```
./runner.sh
```
If it doesn't start immediately or denies you due to permissions run the following in your terminal:
```
chmod +x runner.sh
```
**Now sit back and watch it go.**

**Everything is all set for normal use.**

<br></br>
<br></br>

# Feature Usage
## Usage for Archive Functionality
In order to use the archive functionality in the `Archive Project` tab, follow these steps:
1. Input the project path such as `/home/kali/PathToProject/`
2. Click `Continue`

No prompt is currently given to determine the status of the archive, but upon completion, a default folder in `/home/kali/Archives/` is generated which it will store existing archived projects.
<br></br>

## Usage for the Sync Functionality
 
### Setting up VM for proper usage (If in use)
If VM is used for the sync functionality, you will have to find a way to use your host IP address for **BOTH** systems. A wired connection is not required, but both systems must be connected to the same network. *Note: There might be other ways of setting up the network settings for Sync in which we have no knowledge of.*


If using VirtualBox: 
- Navigate to VM network settings
- Attach to Bridged Adapter (Make sure it is attached to Wifi)
- Select Allow all connections
- Enable Cable connected option

If using other VM:
- Follow similar settings..
### Using Sync
In order to use the sync functionality in the `Sync` tab, follow these steps:
1. Input the root username of the system that will be receiving the files
2. Input the root password of the system that will be receiving the files
3. Input the IP address of the system that will be receiving the files
4. Input the path to the project that is going to be sent e.g., `/home/kali/PathToProject`
5. Input the path for the project to be saved in the receiving system e.g., `/home/user2/PathToProject`

No status bar will be displayed as of now, but to check progress, you can check the receiver System and ensure their project info exists in their input path e.g., `/home/user2/PathToProject`.

### Issues with Sync
**Something to note**: 
Sync works well under these conditions, but will crash after completing a sync command. Cause is unknown, but most likely due to a termination of a necessary process/thread for rendering the backend connection in `DataSynchronizer.js` file.
<br></br>
***
## Usage for the Map Functionality
In order to use the map functionality in the `CAN MAP Visualizer`  tab,  firefox must be used instead of google chrome. The map functionality is located on the left side of the screen.
 * Create new node 
    * Double click the left button on the mouse anywhere in the map container to populate a new node.  
* Set Off Limits
    * Right click on any node for context menu to display. Then click on `Set Off-Limits`.
    * Node will be greyed out once it is set to off-limits.
* Search Node
    * The left navigation bar has a search input with a `search` button. Type in any character/substring on the input component. Once character/substring is typed, click on the `search` button to begin the seaching.
    * A node can be searched by a character, substring, or string. * When input typed matches a node, the node will be highlighted in blue.  
* Rename Node
    * Click on the name of any node, type in the new node name and press enter or click outside of the node to apply the change.
* Linking Nodes
    * To link two nodes click on one node and then drag the link to the node it is going to be connected to. Releasing the mouse click will apply the link.
* Resize Bus Line
    * Click on the bus line to highlight it then use the edges to drag the line to make it bigger or smaller as necessary.

## Usage for the Map Functionality
In order to use the map functionality in the `CAN MAP Visualizer`  tab,  firefox must be used instead of google chrome.

<br></br>
<br></br>
---
# Features Left To Address
The following is a list of all of the product features specified in the SRS that our team has left to address. Each feature listed will have further specification about what is missing if they are partially implemented.

2.2.2.1.2. Open Existing Project **TODO**
* The popup for this use case is not implemented visually or functionally
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.

2.2.2.1.5. Configure Project **TODO**

2.2.2.1.6. Save Project **TODO**

2.2.2.1.7. Modify Black-list nodes ***(Partially Implemented)***
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.


2.2.2.2.6. Edit Node(s) ***(Partially Implemented)***
* Missing 
    * Assign Icon
    * Flagging
    * Annotation

3.2.3.1.6. Edit Packets ***(Partially Implemented)***
* The popup for this use case is not implemented visually or functionally.
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.

3.2.3.1.7. Replay Packets ***(Partially Implemented)***
* The popup for this use case is not implemented visually or functionally.
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.

3.2.3.1.8. Rename Node ***(Partially Implemented)***
* Popup is implemented visually but lacks functionality.
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.

3.2.3.1.9. Assign Icon ***(Partially Implemented)***
* Popup is implemented visually but lacks functionality.
* Map does not have ability to retrieve icons and assign them to nodes

3.2.3.1.10. Change Visibility ***(Partially Implemented)***
* Popup is implemented visually but lacks functionality.
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.

3.2.3.1.11.Add Relationship ***(Partially Implemented)***
* Popup exists on the system but we opted to remove the dropdown button that would trigger the display of it.
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.

3.2.3.1.13. Traffic View Dropdown Menu with Filter Packets Sub-Dropdown ***(Partially Implemented)***
* Exists on the system and is visually present but the dropdown button lacks functionality.
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.

3.2.3.1.14. Traffic View Dropdown Menu with Sort Packets Sub-Dropdown ***(Partially Implemented)***
* Exists on the system and is visually present but the dropdown button lacks functionality.
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.


3.2.3.1.17. Map Edit Dropdown Menu ***(Partially Implemented)***
* Rename Node - Lacks popup, however, it is achieved by double clicking on the node and typing in a name.
* Assign Icon
* Change Visibility 

3.2.3.1.18. Map Nodes Dropdown Menu ***(Partially Implemented)***
* Exists on the system and is visually present but the dropdown button lacks functionality.
* Search node is achieved through the search bar located on the top right of the map view.
* Selecting all nodes can be achieved by clicking on the map to focus on it and then pressing 'ctrl + a'.
* Add relationship popup exists on the system without functionality however, we removed the button that brings it up due to it being achieved by dragging a link from one node to another on the map.

3.2.3.1.19.Annotation Menu

3.2.3.1.20. Color Picker ***(Partially Implemented)***
 * Exists visually within "Add/Remove Flags" popup using the button "Create Flag".
 * Lacks functionality.