var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
	coordinates: {},
	typePhoto: Boolean,
	url: String,
	description: String,
	park: String
});

var Content = mongoose.model('Content', ContentSchema);
module.exports = Content; 