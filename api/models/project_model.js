const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema definition
const projectSchema = new Schema({
    _id: Schema.Types.ObjectId,
    projectName: {
        type: String,
        unique: true,
        required: true,
    },
    storedLocation: {
		  type: String,
		  required: true
	},
    sessions: [{type:Schema.Types.ObjectId, ref: "Session"}]
})

//Export model
const Project = mongoose.model("Project", projectSchema)
module.exports = Project;