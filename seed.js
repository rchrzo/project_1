var db = require("./models");

var parkList = [];

parkList.push({
	name: "Joshua Tree National Park",
	coordinates: "lat: 34.079500, lng: -116.256638",
	yearEstablished: "1994",
	annualVisitors: "1383340",
	description: "Joshua Tree National Park is a desert wilderness located in Southern California. It is known for its distinctive trees which seems to reference biblical figure Joshua leading his people to the promised land with upstreched arms.",
	content: [{coordinates: "lat: 34.0241794, lng: -116.1585505", typePhoto: true, url: "http://images.summitpost.org/medium/631269.JPG", description: "this is a cool rock"}],
	trails: [{coordinates: "lat: 34.040196, lng: -116.186342", name: "Boy Scouts Trail", description: "medium difficulty trail, bring lots of water"}]
});

parkList.push({
	name: "Haleakala National Park",
	coordinates: "lat: 20.709722, lng: -156.253333",
	yearEstablished: "1961",
	annualVisitors: "1142040",
	description: "Haleakala National Park is volcano located on the Hawaiian Island of Maui. The last time the volcano erupted was more than 400 years ago. Today the crater is home to many rare species of flora and fauna.",
	content: [{coordinates: "lat: 20.710346, lng: -156.252912", typePhoto: true, url: "http://www.gohawaii.com/en/assets/Image/MAUI/18631_mauiResized.rar/resized/Haleakala-Sunrise.jpg", description: "amazing sunrise from the observatory"}],
	trails: [{coordinates: "lat: 20.714400, lng: -156.250981", name: "Keoneheehee Trail", description: "walk the edge of the crater"}]
});

parkList.push({
	name: "Grand Canyon National Park",
	coordinates: "lat: 36.055160, lng: -112.122613",
	yearEstablished: "1919",
	annualVisitors: "4756771",
	description: "Known as one of the Seven Natural Wonders of the World, the Grand Canyon is a large gorge of the Colorado River.",
	content: [{coordinates: "lat: 36.055160, lng: -112.144296", typePhoto: true, url: "http://www.nps.gov/brca/learn/nature/images/111birdcount2a.jpg", description: "cool blue bird on the trail"}],
	trails: [{coordinates: "lat: 36.060902, lng: -112.212188", name: "Hermit Trail", description: "Awesome trail on the west end of the canyon that extends down through the canyon walls."}]
});

// db.NationalParks.remove({}, function (err, parks){
// 	if(err) {
// 		return console.log("Error", err);
// 	}
// 	console.log("delete all parks from your database");
// });


// db.NationalParks.create(parkList, function (err, parks) {
// 	if(err) {
// 		return console.log('Error', err);
// 	}
// 	console.log("all parks: ", parks);
// 	process.exit();

// });


// var idToFind = "566b631b16f9a7a9a046f102";
// db.NationalParks.update({"_id": idToFind}, {name: "Whatever National Park", coordinates: "your mom", yearEstablished: "HACKZORRRZ"}, function (err, parks) {
// 	if(err) {
// 		return console.log('Error', err);
// 	}
// 	console.log("all parks: ", parks);
// 	process.exit();

// });

// var thisPark = {name: "Grand Canyon National Park"};
// db.NationalParks.remove(thisPark, function (err, parks) {
// 	if(err) {
// 		return console.log('Error', err);
// 	}
// 	console.log("you deleted a park");
// });

// db.NationalParks.find({}, function (err, parks) {
// 	if(err) {
// 		return console.log('Error', err);
// 	}
// 	console.log("here are all your parks", parks);
// });

// var id = "566b54d1d3db4ba996b0666d";
// var updateThisPark = {name: "Haleakala National Park", description: "isn't this a funny description lmaooooo"};
// db.NationalParks.update(id, updateThisPark, function (err, parks){
// 	if(err) {
// 		return console.log('Error', err);
// 	}
// 	console.log("your park has been updated", parks);
// });

// var fakePark = {name: "Anonymous National Park", coordinates: "I dunno", yearEstablished: "who really knows", annualVisitors: "Illuminati", description: "n/a"};
// db.NationalParks.create(fakePark, function (err, parks){
// 	if(err) {
// 		return console.log("Error!", err);
// 	}
// 	console.log("Congrats you created this park: ", parks);
// });

// var deleteThisPark = "566b652929fe1c6da21ea8f0";
// db.NationalParks.remove({name: "Anonymous National Park"}, function (err, parks) {
// 	if(err) {
// 		return console.log("Error!", err);
// 	}
// 	console.log("You deleted a park");
// });

// db.NationalParks.find({}, function (err, parks) {
// 	if(err) {
// 		return console.log('Error', err);
// 	}
// 	console.log("here are all your parks", parks);
// });



