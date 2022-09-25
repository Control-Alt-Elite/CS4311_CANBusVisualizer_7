const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    projectName: {
        type: String,
        required: false
    },
    storedLocation: {
		type: String,
		required: false
	},
});

const Project = mongoose.model("Project", mySchema);

module.exports = Project;