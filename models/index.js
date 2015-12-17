var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/national_parks');
mongoose.connect( process.env.MONGOLAB_URI ||
                   process.env.MONGOHQ_URL || 
                   "mongodb://localhost/national_parks" );

var NationalParks = require('./nationalParks');
var Content = require('./content');
var Trailheads = require('./trailheads');

module.exports.NationalParks = NationalParks;
module.exports.Content = Content;
module.exports.Trailheads = Trailheads;