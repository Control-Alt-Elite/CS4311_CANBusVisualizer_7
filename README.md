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
1. Open your command line/terminal and navigate to the "Client" folder using the command line.
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
3. Make sure to install python cantools for decoding packets - using pip.
```
python3 -m pip install cantools
```
### DataSynchronizer set-up
In order to use rsync, we must first set it up on the system.
1. Navigate to /api folder (backend)
2. run `npm install rsync`

We must also enable rsync service for our machines:
1. In this same folder, run 
```
sudo systemctl enable rsync.service 
sudo systemctl start rsync.service 
``` 
2. Check if service is enabled: `systemctl | grep rsync`      

We must also enable ssh service for our machines:
1. run `sudo apt install ssh`
2. In this same folder, run 
```
sudo systemctl enable ssh.service 
sudo systemctl start ssh.service 
sudo systemctl enable ssh.socket 
sudo systemctl start ssh.socket 
``` 
2. Check if service is enabled: `systemctl | grep rsync`     

For password authentication between ssh, we will be using sshpass. 
1. ```$ sudo apt install sshpass```

# Usage Instructions
1. Open two terminals and navigate to the "api" and "Client" folders respectively.
2. Use the following command on both terminals:
```
npm start
```

For linux users, use the following command to start the database:
```
sudo service mongod start
```


- Using on the "api" folder will connect to the database
- Using on the "Client" folder will open the site

To simulate virtual CAN (For testing):
- run `sudo ./simulation.sh` on base directory
- on a separate terminal, run `cangen vcan0 -e -L 8 -g 1000 -v`


**Now everything is all set for normal use.**
