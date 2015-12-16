var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TrailheadsSchema = new Schema({
	coordinates: {lat: Number, lng: Number}, 
	name: String,
	description: String,
	park: String
});

var Trailheads = mongoose.model('Trailheads', TrailheadsSchema);

module.exports = Trailheads;