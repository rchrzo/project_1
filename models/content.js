var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ContentSchema = new Schema({
	// TODO: Consider defining coordinates like you did in trailheads.js for consistency.
	// 	coordinates: {lat: Number, lng: Number} -jc
	coordinates: {},
	typePhoto: Boolean,
	url: String,
	description: String,
	park: String
});

var Content = mongoose.model('Content', ContentSchema);
module.exports = Content;
