const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
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
    },
    project: {
        type: Schema.Types.ObjectId, ref: "Project", required: true
    },
});

/* Virtual for session's URL
sessionSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/projects/session/${this._id}`;
  });
*/
//Export Model
const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;