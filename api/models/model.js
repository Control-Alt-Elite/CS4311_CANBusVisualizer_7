const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    _id: Schema.Types.ObjectId,
    projectName: {
        type: String,
        required: true,
    },
    storedLocation: {
		type: String,
		required: true
	},
    sessions: [{type:Schema.Types.ObjectId, ref: "Session"}]
})

// Virtual for project's URL
projectSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/projects/new/${this._id}`;
  });

  //Export model
const Project = mongoose.model("Project", projectSchema)
module.exports = Project;
