var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
	coordinates: String,
	typePhoto: Boolean,
	url: String
});

var Content = mongoose.model('Content', ContentSchema);
module.exports = Content; 