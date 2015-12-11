var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Trailheads = require('./trailheads');
var Content = require('./content');

var nationalParkSchema = new Schema({
	coordinates: String,
	yearEstablished: String,
	annualVisitors: String,
	description: String,
	trails: [Trailheads.schema],
	content: [Content.schema]
});

var NationalParks = mongoose.model('NationalParks', nationalParkSchema);
module.exports = NationalParks;