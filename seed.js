var db = require("./models");

var parkList = [];

parkList.push({
	name: "Joshua Tree National Park",
	coordinates: "lat: 34.079500, lng: -116.256638",
	yearEstablished: "1994",
	annualVisitors: "1383340",
	description: "Joshua Tree National Park is a desert wilderness located in Southern California. It is known for its distinctive trees which seems to reference biblical figure Joshua leading his people to the promised land with upstreched arms.",
	// content: [{coordinates: "lat: 34.0241794, lng: -116.1585505", typePhoto: true, url: "http://images.summitpost.org/medium/631269.JPG", description: "this is a cool rock"}],
	// trails: [{coordinates: "lat: 34.040196, lng: -116.186342", name: "Boy Scouts Trail", description: "medium difficulty trail, bring lots of water"}]
});

parkList.push({
	name: "Haleakala National Park",
	coordinates: "lat: 20.709722, lng: -156.253333",
	yearEstablished: "1961",
	annualVisitors: "1142040",
	description: "Haleakala National Park is volcano located on the Hawaiian Island of Maui. The last time the volcano erupted was more than 400 years ago. Today the crater is home to many rare species of flora and fauna.",
	// content: [{coordinates: "lat: 20.710346, lng: -156.252912", typePhoto: true, url: "http://www.gohawaii.com/en/assets/Image/MAUI/18631_mauiResized.rar/resized/Haleakala-Sunrise.jpg", description: "amazing sunrise from the observatory"}],
	// trails: [{coordinates: "lat: 20.714400, lng: -156.250981", name: "Keoneheehee Trail", description: "walk the edge of the crater"}]
});

parkList.push({
	name: "Grand Canyon National Park",
	coordinates: "lat: 36.055160, lng: -112.122613",
	yearEstablished: "1919",
	annualVisitors: "4756771",
	description: "Known as one of the Seven Natural Wonders of the World, the Grand Canyon is a large gorge of the Colorado River.",
	// content: [{coordinates: "lat: 36.055160, lng: -112.144296", typePhoto: true, url: "http://www.nps.gov/brca/learn/nature/images/111birdcount2a.jpg", description: "cool blue bird on the trail"}],
	// trails: [{coordinates: "lat: 36.060902, lng: -112.212188", name: "Hermit Trail", description: "Awesome trail on the west end of the canyon that extends down through the canyon walls."}]
	// Trailheads.push({coordinates: "lat: 36.060902, lng: -112.212188", name: "Hermit Trail", description: "Awesome trail on the west end of the canyon that extends down through the canyon walls."})
});

var myContent = [];

myContent.push({coordinates: "lat: 36.055160, lng: -112.144296", typePhoto: true, url: "http://www.nps.gov/brca/learn/nature/images/111birdcount2a.jpg", description: "cool blue bird on the trail", park: "Grand Canyon National Park"});
myContent.push({coordinates: "lat: 20.710346, lng: -156.252912", typePhoto: true, url: "http://www.gohawaii.com/en/assets/Image/MAUI/18631_mauiResized.rar/resized/Haleakala-Sunrise.jpg", description: "amazing sunrise from the observatory", park: "Haleakala National Park"});
myContent.push({coordinates: "lat: 34.0241794, lng: -116.1585505", typePhoto: true, url: "http://images.summitpost.org/medium/631269.JPG", description: "this is a cool rock", park: "Joshua Tree National Park"});



var myTrails = [];

myTrails.push({
	coordinates: "lat: 36.060902, lng: -112.212188", name: "Hermit Trail", description: "Awesome trail on the west end of the canyon that extends down through the canyon walls.", park: "Grand Canyon National Park"
});

myTrails.push({
	coordinates: "lat: 20.714400, lng: -156.250981", name: "Keoneheehee Trail", description: "walk the edge of the crater", park: "Haleakala National Park"
});

myTrails.push({
	coordinates: "lat: 34.040196, lng: -116.186342", name: "Boy Scouts Trail", description: "medium difficulty trail, bring lots of water", park: "Joshua Tree National Park"
});

 // Create, delete, update, find for National Parks 

var trailStorage = [];
var contentStorage = [];

// remove the parks 

// db.NationalParks.remove({}, function (err, parks){
// 	if(err) {
// 		return console.log("Error", err);
// 	}
// 	console.log("deleted all parks from your database");
// 	//create the parks
// 	db.NationalParks.create(parkList, function (err, newParks) {
// 		if(err) {
// 			return console.log('Error, unable to remove parks', err);
// 		}
// 		console.log("all parks: ", newParks);
// 		//remove all trails
// 		db.Trailheads.remove(myTrails, function (err, trails) {
// 			if(err) {
// 				return console.log("error, unable to remove trails", err);
// 			}
// 			console.log("removed all trails");
// 			//create trails
// 			db.Trailheads.create(myTrails, function (err, trails) {
// 			if(err) {
// 				return console.log("error", err);
// 			}
// 			console.log("created your trails", trails);
// 			trailStorage = trails;
// 			//remove content
// 			db.Content.remove({}, function (err, content){
// 				if(err) {
// 					return console.log("Error, content not removed", err);
// 				}
// 				console.log("successfully removed content...creating now...");
// 				db.Content.create(myContent, function (err, content) {
// 					if(err) {
// 						return console.log("Error, content not created", err);
// 					}
// 					console.log("created your content");
// 					contentStorage = content;
// 					db.NationalParks.find({}, function (err, parks) {
// 						if(err) {
// 							return console.log("error", err);
// 						}
// 						//push trails onto parks
// 						console.log("The length of trails is " + trailStorage.length);						
// 						parks.forEach(function (elem) {
// 							for(i = 0; i < trailStorage.length; i++) {
// 								console.log("(Trails) Looking for " + trailStorage[i].park + " against " + elem.name);								
// 								if(elem.name === trailStorage[i].park) {
// 									elem.trails.push(trailStorage[i]);
// 									console.log(elem.trails);
// 									console.log("match");
// 								}
// 							}
// 							db.NationalParks.findOneAndUpdate({"_id": elem.id}, {trails: elem.trails}, function (err, updatedPark) {
// 									console.log("Trails added to parks");
// 							});
// 						});	

// 						console.log("The length of contentStorage is " + contentStorage.length);
// 						console.log("Content looks like: " + contentStorage);
// 						parks.forEach(function (elem) {
// 							for(j = 0; j < contentStorage.length; j++) {
// 								console.log("(Content) Looking for " + contentStorage[j].park + " against " + elem.name);
// 								if(elem.name === contentStorage[j].park) {
// 									console.log("matching content");
// 									elem.content.push(contentStorage[j]);
// 									console.log("matching content", elem.content);
// 								}
// 							}
// 							db.NationalParks.findOneAndUpdate({"_id": elem.id}, {content: elem.content}, function (err, updatedContent) {
// 								console.log("Content added to parks");
// 							});
// 						});
// 					});
// 				});
// 			});
// 			});
// 		});
// 	});
// });
var newTrail = {coordinates: "lat: 20.714861, lng: -156.249868", name: "Pa Ka'oao Trail", description: "view the inside of the crater", park: "Haleakala National Park"};
db.NationalParks.find({name: newTrail.park}, function (err, parks) {
	if(err) {
		return console.log("error", err);
	}
	console.log("found your matching park ", parks);
});
 // db.NationalParks.find({}, function(err, parks) {
 // 	console.log("these are your parks", parks);
 // });

// db.NationalParks.find({}, function (err, parks) {
// 	if(err) {
// 		return console.log("error", err);
// 	}
// 	parks.forEach(function (elem) {
// 		elem.trails = []; 
// 		db.NationalParks.findOneAndUpdate({"_id": elem.id}, {trails: elem.trails}, function (err, updatedPark) {
// 		console.log("deleted all deez trailsssss");
// 		});
// 	});
// });

// db..find({}, function (err, trails) {
// 	if(err) {
// 		return console.log("sorry no trails to find", err);
// 	}
// 	console.log("your trails, sir", trails);
// });

// db.Trailheads.remove({}, function (err, trails) {
// 	if(err) {
// 		return console.loG("err", err);
// 	}
// 	console.log("deleted trails");
// });

// db.NationalParks.update({}, {$unset: {trails: 1}}, function (err, parks) {
// 	if(err) {
// 		return console.log("nope", err);
// 	}
// 	console.log("removed the trails");
// });


// db.Trailheads.find({}, function (err, trails) {
// 	console.log("your trailheads: ", trails);
// });

// db.NationalParks.find({}, function (err, parks) {
// 	if(err) {
// 		return console.log("nope", err);
// 	}
// 	console.log("your parks, sir", parks);
// });

// // // // // //create all trails after removing them
// db.Trailheads.remove(myTrails, function(err, trails) {
// 	if(err) {
// 		return console.log("error", err);
// 	}
// 	console.log("removed all trails");
	
// 	db.Trailheads.create(myTrails, function(err, trails) {
// 		if(err) {
// 			return console.log("error", err);
// 		}
// 		console.log("created your trails", trails);
// 		trailStorage = trails;

// 		db.NationalParks.find({}, function (err, parks) {
// 			if(err) {
// 				return console.log("error", err);
// 			}
// 			parks.forEach(function (elem) {
// 				for(i = 0; i < trailStorage.length; i++) {
// 					if(elem.name === trailStorage[i].park) {
// 						elem.trails.push(trailStorage[i]);
// 					}
// 				}
// 			});
// 		});
// 		db.NationalParks.save;
// 	});
// });

// db.NationalParks.find({}, function(err, parks){
// 	if(err) {
// 		return console.log("error", err);
// 	}
// 	console.log("found your parks: ", parks);
// });

// db.Trailheads.find({}, function(err, trails){
// 	if(err) {
// 		return console.log("error", err);
// 	}
// 	console.log("found your trailheads: ", trails);
// });

// update a park
// var idToFind = "566dedf807c0519215e02469";
// db.NationalParks.update({"_id": idToFind}, {name: "Whatever National Park", coordinates: "your mom", yearEstablished: "HACKZORRRZ"}, function (err, parks) {
// 	if(err) {
// 		return console.log('Error', err);
// 	}
// 	console.log("all parks: ", parks);
// 	// process.exit();

// });

//remove a park
// var thisPark = {name: "Grand Canyon National Park"};
// db.NationalParks.remove(thisPark, function (err, parks) {
// 	if(err) {
// 		return console.log('Error', err);
// 	}
// 	console.log("you deleted a park");
// });

// find all of the parks
// db.NationalParks.find({}, function (err, parks) {
// 	if(err) {
// 		return console.log('Error', err);
// 	}
// 	console.log("here are all your parks", parks);
// 	// process.exit();
// });

// //find one park by id
// var findThisPark = "";
// db.NationalParks.find({"_id": findThisPark}, function (err, parks) {
// 	if(err) {
// 		return console.log('Error', err);
// 	}
// 	console.log("here are all your parks", parks);
// });

//delete one park by id
// var deleting = "566dedf807c0519215e02469";
// db.NationalParks.remove({"_id": deleting}, function (err, parks) {
// 	if(err) {
// 		return console.log("Error!", err);
// 	}
// 	console.log("You deleted a park!");
// });

//create one park by id
// var fakePark = {name: "Anonymous National Park", coordinates: "I dunno", yearEstablished: "who really knows", annualVisitors: "Illuminati", description: "n/a"};
// db.NationalParks.create(fakePark, function (err, parks){
// 	if(err) {
// 		return console.log("Error!", err);
// 	}
// 	console.log("Congrats you created this park: ", parks);
// });


/* Create, delete, update, find for Trailheads*/
// db.NationalParks.find({"_id": "566df2f561a5b6601fa55285", trails:}, function (err, parks) {
// 	if(err) {
// 		return console.log("Error!", err);
// 	}
// 	console.log("Here is a list of your trails: ", parks);
// });

// db.Trailhead.find({}, function (err, trails) {
// 	if(err) {
// 		return console.log("Error!", err);
// 	}
// 	console.log("here are your trails", trails);
// });

//create trailheads
//create parks

//for each park, embed trails 
//find them





