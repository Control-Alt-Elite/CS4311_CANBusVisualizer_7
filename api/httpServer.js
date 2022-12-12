const HTTPPORT = 8080
const can = require('socketcan');
var fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const httpServer = require('http').createServer(app);
const player = require("./modules/Player")
const io = require("socket.io")(httpServer, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true
	  }
	});

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
	console.log(`Client Connected: ${socket.id}`);

	socket.on('disconnect', ()=> {
		console.log("Client Disconnected")
	});

	setInterval(() => {
		socket.emit('message', decodedInfo)
	}, 2.75);
});

// Parse database
var network = can.parseNetworkDescription("./dbc-files/j1939.kcd")
//Create channel to listen interface vcan0
var channel = can.createRawChannel("vcan0", true);
var db_bus = new can.DatabaseService(channel, network.buses["j1939"]);

channel.start();

var packetInfo = {};
packetInfo.data = '';

//Decoded Information
var decodedInfo ={};
decodedInfo.revs = 0;
decodedInfo.dist = 0;
decodedInfo.torque = 0;
decodedInfo.additional = 0;
decodedInfo.drv = 0;
decodedInfo.starter = 0;
decodedInfo.tmode = 0;
decodedInfo.address = 0;
decodedInfo.demand = 0;
decodedInfo.trip = 0;
decodedInfo.speed = 0;


//Initializing player function to replay packets
//player.player();

/* Emulates Candump */
function toHex(number) {
    return ("00000000" + number.toString(16)).slice(-8);
}
/*
//Log packets
channel.addListener("onMessage", function dumpPacket(msg) {
   packetInfo.data = '(' + (msg.ts_sec + msg.ts_usec / 1000000).toFixed(6) + ')  ' + 'vcan0  ' +
          toHex(msg.id).toUpperCase() + '  [8]  ' + msg.data.toString('hex').toUpperCase();
          console.log(packetInfo.data)
});
*/
//Register a listener to get any value updates
db_bus.messages["EEC1"].signals["ActualEnginePercentTorque"].onUpdate(function(s) {
   decodedInfo.torque=(s.value);
});

db_bus.messages["EEC1"].signals["AtlEngnPrntTrqFrtnl"].onUpdate(function(s) {
   decodedInfo.additional=(s.value);
});

db_bus.messages["EEC1"].signals["DrvrsDmndEngnPrntTrq"].onUpdate(function(s) {
   decodedInfo.drv=(s.value);
});

db_bus.messages["EEC1"].signals["EngineSpeed"].onUpdate(function(s) {
    decodedInfo.revs=(s.value);
 });

 db_bus.messages["EEC1"].signals["EngineStarterMode"].onUpdate(function(s) {
   decodedInfo.starter=(s.value);
});

db_bus.messages["EEC1"].signals["EngineTorqueMode"].onUpdate(function(s) {
   decodedInfo.tmode=(s.value);
});

db_bus.messages["EEC1"].signals["SrAddrssfCntrllngDvfrEngnCntrl"].onUpdate(function(s) {
   decodedInfo.address=(s.value);
});

db_bus.messages["EEC1"].signals["EngineDemandPercentTorque"].onUpdate(function(s) {
   decodedInfo.demand=(s.value);
});

db_bus.messages["VDHR"].signals["TtlVhlDstnHghRsltn"].onUpdate(function(s) {
	decodedInfo.dist=(s.value);
 });

 db_bus.messages["VDHR"].signals["TripDistanceHighResolution"].onUpdate(function(s) {
   decodedInfo.trip=(s.value);
});

db_bus.messages["CCVS1"].signals["WheelBasedVehicleSpeed"].onUpdate(function(s) {
   decodedInfo.speed=(s.value);
});
/*
 db_bus.messages["EEC2"].signals["AcceleratorPedalPosition1"].onUpdate(function(s) {
    console.log("AcceleratorPedalPosition1: " + s.value);
 });

 db_bus.messages["EEC2"].signals["AcceleratorPedal2Position"].onUpdate(function(s) {
    console.log("AcceleratorPedal2Position: " + s.value);
 });

 db_bus.messages["EEC2"].signals["RemoteAcceleratorPedalPosition"].onUpdate(function(s) {
    console.log("RemoteAcceleratorPedalPosition: " + s.value);
 });

 db_bus.messages["EEC2"].signals["RemoteAcceleratorPedalPosition"].onUpdate(function(s) {
    console.log("RemoteAcceleratorPedalPosition: " + s.value);
 });
 
 db_bus.messages["ETC1"].signals["PercentClutchSlip"].onUpdate(function(s) {
    console.log("PercentClutchSlip: " + s.value);
 });

 db_bus.messages["CCVS1"].signals["WheelBasedVehicleSpeed"].onUpdate(function(s) {
    console.log("WheelBasedVehicleSpeed: " + s.value);
 });

 db_bus.messages["CCVS1"].signals["CruiseControlSetSpeed"].onUpdate(function(s) {
    console.log("CruiseControlSetSpeed: " + s.value);
 });

 db_bus.messages["VD"].signals["TotalVehicleDistance"].onUpdate(function(s) {
    console.log("TotalVehicleDistance: " + s.value);
 });

 db_bus.messages["VD"].signals["TripDistance"].onUpdate(function(s) {
    console.log("TripDistance: " + s.value);
 });
*/
httpServer.listen(HTTPPORT, () => console.log(`HTTP Server running on port: ${HTTPPORT}`))