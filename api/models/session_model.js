const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    analystInitials: {
        type: String,
        required: true
    },
    canConnectorID: {
		type: Number,
		required: true
	},
    vehicleID: {
        type: Number,
        required: true
    },
    baudRate: {
        type: Number,
    },
    dbcFileName: {
        type: String,
        required: true
    },
    blacklistFileName: {
        type: String
    },
    sessionRef: {
        type: Schema.Types.ObjectId, ref: "Project"
    },
});

//Export Model
const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;