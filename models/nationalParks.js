var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Trailheads = require('./trailheads');
var Content = require('./content');

var nationalParkSchema = new Schema({
	name: String,
	// TODO: Consider defining coordinates like you did in trailheads.js for consistency.
	// 	coordinates: {lat: Number, lng: Number} -jc
	coordinates: {},
	yearEstablished: String,
	annualVisitors: String,
	description: String,
	trails: [Trailheads.schema],
	content: [Content.schema]
});

var NationalParks = mongoose.model('NationalParks', nationalParkSchema);
module.exports = NationalParks;
