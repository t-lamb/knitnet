var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var patternSchema = new Schema({
	needleSize: String, // '5 millimeter'
	yarnSize: String,
	color: String,
	dateAdded : { type: Date, default: Date.now },
	type: String
})

// export 'Person' model so we can interact with it in other files
module.exports = mongoose.model('Pattern',patternSchema);