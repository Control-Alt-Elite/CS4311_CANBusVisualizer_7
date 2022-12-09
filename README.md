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

# Runner and installation script
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
***

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
**Something to note**: Sync works well under these conditions, but will crash after completing a sync command. Cause is unknown, but most likely due to a termination of a necessary process/thread for rendering the backend connection in `DataSynchronizer.js` file.
***
## Usage for the Map Functionality
In order to use the map functionality in the `CAN MAP Visualizer`  tab,  firefox must be used instead of google chrome.

<br></br>
<br></br>
---
# Features Left To Address
The following is a list of all of the product features specified in the SRS that our team has left to address. Each feature listed will have further specification about what is missing if they are partially implemented.

3.2.3.1.6. Edit Packets ***(Partially Implemented)***
*  The popup for this use case is not implemented visually or functionally
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.

3.2.3.1.7. Replay Packets ***(Partially Implemented)***
* The popup for this use case is not implemented visually or functionally
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.

3.2.3.1.8. Rename Node ***(Partially Implemented)***
* Popup is implemented visually but lacks functionality
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.

3.2.3.1.9. Assign Icon
* Popup is implemented visually but lacks functionality
* Map does not have ability to retrieve icons and assign them to nodes

3.2.3.1.10. Change Visibility ***(Partially Implemented)***
* Popup is implemented visually but lacks functionality
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.

3.2.3.1.11.Add Relationship ***(Partially Implemented)***
* Popup exists on the system but we opted to remove the dropwodn button that would trigger the display of it.
* The overall use case is achievable through other means, refer to the usage section of the readme for further information.

3.2.3.1.12. Traffic File Dropdown Menu ***(Partially Implemented)***
* Exists on the system and is visually present but the dropdown buttons lack functionality

3.2.3.1.13. Traffic View Dropdown Menu with Filter Packets Sub-Dropdown

3.2.3.1.14. Traffic View Dropdown Menu with Sort Packets Sub-Dropdown

3.2.3.1.15. Traffic Packets Dropdown Menu

3.2.3.1.16. Map File Dropdown Menu

3.2.3.1.17. Map Edit Dropdown Menu

3.2.3.1.18. Map Nodes Dropdown Menu

3.2.3.1.19.Annotation Menu

3.2.3.1.20. Color Picker