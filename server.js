var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


/************
 * DATABASE *
 ************/
var db = require('./models');

//get the parks 
app.get('/api/parks', function getParkID (req, res) {
	db.NationalParks.find({}, function(err, parks) {
 	res.json(parks);
 });
});

// //get the content
app.get('/api/parks/content', function getMediaContent (req, res) {
	var parkContent = [];
	db.NationalParks.find({}, function (err, parks) {
	if(err) {
		console.log("error", err);
	}
	console.log(parks);
		parks.forEach(function (elem) {
			parkContent.push(elem.content);
		});
	res.json(parkContent);
	});
});

// //get the trailheads
// app.get('api/parks/trailheads', function indexTrailheads (req, res) {

// });

// //create a trailhead
// app.post('/api/parks/trailheads', function createTrailhead (req, res) {

// });

// //update a trailhead
// app.update('/api/parks/trailheads/:id', function updateTrailhead (req, res) {

// });

// //destroy a trailhead
// app.delete('/api/parks/trailheads/:id', function deleteTrailhead (req, res) {

// });



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
