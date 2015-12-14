var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TrailheadsSchema = new Schema({
	coordinates: String, 
	name: String,
	description: String,
	park: String
});

var Trailheads = mongoose.model('Trailheads', TrailheadsSchema);

module.exports = Trailheads;