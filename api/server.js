const PORT = 3001
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = express.Router();
const packets = require("./modules/CANUtils");
const logfile = require("./modules/DumpPlayPckt")
const dataSync = require("./modules/DataSynchronizer");
const logs = require("./modules/Player");
global.globalProjectName = ''; //To temporarily save project name 

//Sending packets
app.get('/packets', packets);

// Syncing files via rsync
app.get('/Sync', dataSync);

//Listen for replied packets
app.get('/logs', logfile);


//Writing raw packets to file
//channel.addListener("onMessage", decodedFile.DataSaver());

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/candb', {
    useNewUrlParser: true,
    useUnifiedTopology: true 

}).then(() => console.log("Connected to database")).catch(console.error);

//Database Models
const Project = require('./models/project_model');
const Session = require('./models/session_model');

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

/* Savin Project/Session to database using a global variable*/
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

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

//channel.start();
