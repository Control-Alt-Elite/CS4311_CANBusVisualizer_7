const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    analyst_initials: {
        type: String,
        required: true
    },
    CANConnectorID: {
		type: Number,
		required: true
	},
    vehicle_ID: {
        type: Number,
        required: true
    },
    baud_rate: {
        type: Number,
        required: true
    },
    event_name: {
        type: String,
        required: true
    },
    event_date: {
        type: Date,
        default: Date.now()
    },
    DBC_filename: {
        type: String,
        required: true
    },
    black_list_filename: {
        type: String
    }
});

const Project = mongoose.model("Project", mySchema);

module.exports = Project;