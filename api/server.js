const PORT = 3001
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require("path");
var bodyParser = require('body-parser')
var can = require('socketcan');
var channel = can.createRawChannel("vcan0", true);

/*
const filePath = './dbc-files/j1939.dbc'

dbc = Dbc();

dbc.load(filePath)
.then(data => {
    console.log(data);
})*/

//Decoding with candump and cantools
var spawn = require('child_process').spawn;
//We can use candump filters e.g. 'candump vcan0,9803FEFE:1fffffff' (extended version 29-bits) or 201:7ff (11-bit)
var child = spawn('candump', ['vcan0,9803FEFE:1fffffff | python3 -m cantools decode ./dbc-files/j1939.dbc'], {shell: true});

//Decoding using a kcd file
// Parse database
//var network = can.parseNetworkDescription("./dbc-files/j1939.kcd");
//var db_motor = new can.DatabaseService(channel, network.buses["Motor"]);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


mongoose.connect('mongodb://127.0.0.1:27017/canbusdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true 

}).then(() => console.log("Connected to the database")).catch(console.error);

/*
app.get('/', async (req,res) => {
  res.render("index");
});*/

// Method to Sending data to browser
app.get('/', (req,res) => {
  child.stdout.on('data',function (data) {
    res.send(`${data}`);
    res.end();
  });
});

//Models
const Project = require('./models/model');
const Session = require('./models/session_model');

//Get data from the database
app.get('/projects', async (req, res) => {
	const projects = await Project.find();

	res.json(projects);
}); 

app.post('/project/new', (req, res) => {
	const project = new Project({ 
    _id: new mongoose.Types.ObjectId(),
    projectName: req.body.projectName,
    storedLocation: req.body.storedLocation
	})
	project.save((err) => {
    if (err) return handleError(err);
    const session1 = new Session({
      analyst_initials: req.body.analyst_initials,
      CANConnectorID: req.body.CANConnectorID,
      vehicle_ID: req.body.vehicle_ID,
      baud_rate: req.body.baud_rate,
      event_name: req.body.event_name,
      DBC_filename: req.body.DBC_filename,
      black_list_filename: req.body.black_list_filename,
      project: project._id,
    });
    session1.save((err) => { if (err) return handlError(err);
    });
  });

	res.json(project);
});
/*
app.post('project/new', (req, res) => {
  const session = new Session({
    analyst_initials: req.body.analyst_initials,
    CANConnectorID: req.body.CANConnectorID,
    vehicle_ID: req.body.vehicle_ID,
    baud_rate: req.body.baud_rate,
    event_name: req.body.event_name,
    DBC_filename: req.body.DBC_filename,
    black_list_filename: req.body.black_list_filename,
    project: project._id,
  })
  session.save((err) => {
    if (err) return handleError(err);
    // Project now has a session
  });

  res.json(project);
});*/

/*
app.post('/project/new', (req, res) => {
	const project = new Project({
        projectName: req.body.projectName,
        storedLocation: req.body.storedLocation
	});
	project.save((err) => {
    if (err) return handleError(err);
    // Project exists inside the DB, so lets create a session
    const session = new Session({
      analyst_initials: req.body.analyst_initials,
      CANConnectorID: req.body.CANConnectorID,
      vehicle_ID: req.body.vehicle_ID,
      baud_rate: req.body.baud_rate,
      event_name: req.body.event_name,
      DBC_filename: req.body.DBC_filename,
      black_list_filename: req.body.black_list_filename,
      project: project._id,
    });
    session.save((err) => {
      if (err) return handleError(err);
      // Project now has a session
    });
  });
	  res.json(project);
});*/


/*To test with file request.rest
app.post('/project/new/sessionConfig', (req, res) => {
	const project = new Project({
        analyst_initials: req.body.analyst_initials,
        CANConnectorID: req.body.CANConnectorID,
        vehicle_ID: req.body.vehicle_ID,
        baud_rate: req.body.baud_rate,
        event_name: req.body.event_name,
        DBC_filename: req.body.DBC_filename,
        black_list_filename: req.body.black_list_filename
	})

	project.save();

	res.json(project);
});*/

//To test with file request.rest
app.delete('/project/delete/:id', async (req, res) => {
	const result = await Project.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

/*
// Listening packets 
// Log any message in Terminal
channel.addListener("onMessage", function(msg) { 
    console.log("Message");
    console.log("Id: " + msg.id);
    var data = [...msg.data]
    console.log("Data: " + data);
});*/
channel.start();

/*
//Using the kcd file
// Register a listener to get any value changes
db_motor.messages["CruiseControlStatus"].signals["SpeedKm"].onChange(function(s) {
   console.log("SpeedKm " + s.value);
});

channel.stop();
*/

/*
//This function emulates candump -L 
function toHex(number) {
    return ("00000000" + number.toString(16)).slice(-8);
}
  
function dumpPacket(msg) {
    console.log('(' + (msg.ts_sec + msg.ts_usec / 1000000).toFixed(6) + ') ' +
    toHex(msg.id).toUpperCase() + '#' + msg.data.toString('hex').toUpperCase());
}

channel.addListener("onMessage", dumpPacket);
*/

// Reading packets from candump
child.stdout.on('data',function (data) {
    console.log(`${data}`);
  });
/*  
  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
*/