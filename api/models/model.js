const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: false
    },
    storedLocation: {
		type: String,
		required: false
	},
});
const sessionSchema = new Schema({
    analystInitials: {
        type: String,
        required: false
    },
    projectDate: {
		type: String,
		required: false
	},
    canConnectorID: {
		type: String,
		required: false
	},
    vehicleID: {
		type: String,
		required: false
	},
    baudRate: {
		type: String,
		required: false
	},
    blacklistFileName: {
		type: String,
		required: false
	},
    dbc_file_name: {
		type: String,
		required: false
	},
});

const Project = mongoose.model("Project", projectSchema);
const Session = mongoose.model("Session", sessionSchema);

module.exports = Project;
module.exports = Session;