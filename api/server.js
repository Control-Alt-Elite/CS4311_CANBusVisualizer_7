const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/canbusdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true 

}).then(() => console.log("Connected to the database")).catch(console.error);

//Models
const Project = require('./models/model');

app.get('/projects', async (req, res) => {
	const projects = await Project.find();

	res.json(projects);
});

app.post('/project/new', (req, res) => {
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
});

/*
app.delete('/project/delete/:id', async (req, res) => {
	const result = await Project.findByIdAndDelete(req.params.id);

	res.json({result});
});
*/

app.listen(3001);