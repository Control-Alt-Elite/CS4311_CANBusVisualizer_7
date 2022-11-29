const PORT = 3001
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const packets = require("./modules/CANUtils");
const logfile = require("./modules/DumpPlayPckt")
const vcanconfig = require("./vcanconfig");
const canconfig = require("./canconfig");
const startcangen = require("./modules/Cangen");
const startcangen11 = require("./modules/Cangen11");
const killprocesses = require("./modules/KillProcess");
const archive = require("./modules/Archive");
global.globalProjectName = ''; //To temporarily save project name
let pid = '';

app.use(express.json());
app.use(cors());

//Sending packets
app.get('/packets', packets);

//Listen for replied packets
app.get('/logs', logfile);

//For archive project
app.get('/archive',archive)

//Connecting to virtual can bus interface 29-bit
app.get('/vcan', (req,res) => {
	const device = req.query.CAN;
	vcanconfig.initializeVirtualCAN(device);
	pid = startcangen.cangen(device);
	res.send("Virtual CAN Bus 29-bits initialized");
});

//Connecting to virtual can bus interface 11-bit
app.get('/vcan11', (req,res) => {
	const device = req.query.CAN;
	vcanconfig.initializeVirtualCAN(device);
	pid = startcangen11.cangen11(device);
	res.send("Virtual CAN Bus 11-bits initialized");
});

//Connecting to real can bus interface
app.get('/can', (req,res) => {
	const device = req.query.CAN;
	const rate = req.query.rate;
	canconfig.initializeCAN(device, rate);
	res.send("CAN Bus initialized");
});

/* Manage subprocess */
//Kill process
app.get('/kill', (req,res) => {
	const receive = req.query.message;
	console.log(receive);
	killprocesses.killProcess(pid);
	res.send("Process killed");
});

//Writing raw packets to file
//channel.addListener("onMessage", decodedFile.DataSaver());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/candb', {
    useNewUrlParser: true,
    useUnifiedTopology: true 

}).then(() => console.log("Connected to database")).catch(console.error);

//Database Models
const Project = require('./models/project_model');
const Session = require('./models/session_model');
const File = require('./models/file_model');

//Get all projects from database
app.get('/projects', async (req, res) => {
	const projects = await Project.find();
	res.json(projects);
});

//Get specific project from the database by project name (Used by OpenProject.js)
app.get('/project/new', async (req, res) => {
	const projectName = req.query.projectName;
	const project = await Project.find({projectName}).populate('sessions');
	res.json(project);
}); 

/* Saving Project/Session to database using a global variable*/
//Saving Project to datase (Used by ProjectConfigurationHolder.js)
app.post('/project/new', async (req, res) => {
	const project = new Project({ 
    _id: new mongoose.Types.ObjectId(),
    projectName: req.body.projectName,
    storedLocation: req.body.storedLocation
	})
  	globalProjectName = project.projectName;
	await project.save();
	res.json(project);
});

//Saving Session to database (Used by ProjectInfoHolder.js)
app.post('/project/session', async (req, res) => {
	const session = new Session({ 
    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
    analystInitials: req.body.analystInitials,
    canConnectorID: req.body.canConnectorID,
    vehicleID: req.body.vehicleID,
    baudRate: req.body.baudRate,
    dbcFileName: req.body.dbcFileName,
    blacklistFileName: req.body.blacklistFileName,
    sessions: req.body.sessions,
	})
	const savedSession = await session.save();

  // Adds session to project
  // Then saves project to database
  const project = await Project.findOne({ projectName: globalProjectName });
  project.sessions.push(savedSession._id);
  await project.save();
	res.json(session);
});

//end pt for archive
app.post('/project/archive', async (req, res) => {
	
	try{
		
		const {projectFileName} = await req.body;
		console.log("in post endpt",projectFileName);
		archive(projectFileName)
		res.json({projectFileName});

	}
	catch(error){
		console.log(error);
	}
	
});

// Sync project files
//Saving Session to database (Used by ProjectInfoHolder.js)
app.post('/Sync', async (req, res) => {
	var sync = {
		username: req.body.username,
		password: req.body.password,
		receiverIp: req.body.receiverIp,
		senderFilePath: req.body.senderFilePath,
		receiverFilePath: req.body.receiverFilePath
	}
	const dataSync = require("./modules/DataSynchronizer")(sync, req, res);
	res.json(dataSync);
});

/* Saving file name used by canplayer in Player.js to the database */
//Get all files names from database
/*
app.get('/project/file', async (req, res) => {
	const fileName = await File.find();
	res.json(fileName);
}); 
*/
//Getting the file name from database (Used by Table.js)
app.get('/file', (req, res) => {
	const rec = req.query.fileName;
	console.log(rec);
	res.json(rec);
});

/*
/** Do not delete, uncomment or modify these functions. **/
//They are meant for tests using the REST Client.

/* Functions to test database models. Use 'request.rest' file. (Requires REST Client Extension in VS Code )
//Get all projects from database
app.get('/projects', async (req, res) => {
	const projects = await Project.find();
	res.json(projects);
});

//Get all sessions from database
app.get('/project/session', async (req, res) => {
	const sessions = await Session.find();
	res.json(sessions);
}); 

//Save new project to database
app.post('/project/new', async (req, res) => {
	const project = new Project({ 
    _id: new mongoose.Types.ObjectId(),
    projectName: req.body.projectName,
    storedLocation: req.body.storedLocation
	})
	await project.save();
	res.json(project);
});

//Save a session for a project
app.post('/project/session', async (req, res) => {
	const session = new Session({ 
    _id: new mongoose.Types.ObjectId(),
    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
	analystInitials: req.body.analystInitials,
	canConnectorID: req.body.canConnectorID,
	vehicleID: req.body.vehicleID,
	baudRate: req.body.baudRate,
	dbcFileName: req.body.dbcFileName,
	blacklistFileName: req.body.blackListFileName,
	sessionRef:req.body.sessionID
	})
	await session.save();
	res.json(session);
});
*/

//Delete specific project by id
app.delete('/project/delete-project/:id', async (req, res) => {
	const result = await Project.findByIdAndDelete(req.params.id);
	res.json({result});
});

//Delete specific session by id
app.delete('/project/delete-session/:id', async (req, res) => {
	const result = await Session.findByIdAndDelete(req.params.id);
	res.json({result});
});

//Delete all filenames
app.delete('/project/delete-file', async (req, res) => {
	const result = await File.deleteMany({});
	res.json({result});
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

//channel.start();
