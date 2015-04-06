var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var projectSchema = new Schema({
	user: String, // name
	photo: String, // url to the photo
	color: String,
	dateAdded : { type: Date, default: Date.now },
	pattern: {type:Schema.ObjectId, ref:'Pattern'}
})

// 'Person' model
var Project = mongoose.model('Project',projectSchema);

var patternSchema = new Schema({
	name: String,
	source: String,
	sourceURL: String,
	type: String, // hat, scarf
	needles: [{ 
		type: String, 
		size: String // '5 millimeter' 
	}],
	yarns: [{
		weight: String
	}],
	description: String,
	projects: [{type:Schema.ObjectId, ref:'Project'}]
})

// Pattern model
var Pattern = mongoose.model('Pattern',patternSchema);

// exports the models for use in other files
module.exports = {
	Pattern: Pattern,
	Project: Project
}