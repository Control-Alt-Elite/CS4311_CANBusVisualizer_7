# Installation instructions

1. Clone the repo or download the zip to a directory of your choosing

2. Download [Mongo DB Community Server](https://www.mongodb.com/try/download/community) for your OS along with [Mongo DB Shell (mongosh)](https://www.mongodb.com/try/download/shell?jmp=docs)

3. Download [Node.js](https://nodejs.org/en/) for your OS. You can keep clicking next since you do not need to select any extra modules with this installer

4. After the initial installations complete, restart your machine and proceed to the setup steps

### Please Note
- When downloading MongoDB Community, ensure that you enable "Run service as Network Service User"

- You can choose to download MongoDB Compass for viewing the database in a GUI format, otherwise 
it can be viewed on the shell



## Front-End Setup
1. Open your command line/terminal and navigate to the "client" folder using the command line.
use the following commands:
```
npm init -y
npx create-react-app
npm install axios react react-dom react-router-dom react-scripts web-vitals react-bootstrap bootstrap framer-motion react-native-web gojs-react styled-components
```
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


**Now everything is all set for normal use.**

***
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
