var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TrailheadsSchema = new Schema({
	coordinates: String, 
	name: String,
	description: String
});

var Trailheads = mongoose.model('Trailheads', TrailheadSchema);

module.exports = Trailheads;