var db = require("./models");

var parkList = [];

parkList.push({
	name: "Joshua Tree National Park",
	coordinates: {lat: 34.079500, lng: -116.256638},
	yearEstablished: "1994",
	annualVisitors: "1383340",
	description: "Joshua Tree National Park is a desert wilderness located in Southern California. It is known for its distinctive trees which seem to reference the biblical figure Joshua leading his people to the promised land with upstreched arms."
});

parkList.push({
	name: "Haleakala National Park",
	coordinates: {lat: 20.709722, lng: -156.253333},
	yearEstablished: "1961",
	annualVisitors: "1142040",
	description: "Haleakala National Park is a volcano located on the Hawaiian Island of Maui. The last time the volcano erupted was more than 300 years ago. Today the crater is home to many rare species of flora and fauna."
});

parkList.push({
	name: "Grand Canyon National Park",
	coordinates: {lat: 36.055160, lng: -112.122613},
	yearEstablished: "1919",
	annualVisitors: "4756771",
	description: "Known as one of the Seven Natural Wonders of the World, the Grand Canyon is a large gorge of the Colorado River."
});

var myContent = [];

myContent.push({coordinates: {lat: 36.055160, lng: -112.144296}, typePhoto: true, url: "http://www.nps.gov/brca/learn/nature/images/111birdcount2a.jpg", description: "cool blue bird on the trail", park: "Grand Canyon National Park"});
myContent.push({coordinates: {lat: 36.063870, lng: -112.138385}, typePhoto: false, url: "https://www.youtube.com/embed/53O2UUGWriY", description: "Red stone on the Bright Angel Trail", park: "Grand Canyon National Park"});
myContent.push({coordinates: {lat: 36.055694, lng: -112.218883}, typePhoto: false, url: "https://www.youtube.com/embed/KYtoiZyUa7o", description: "Rain on the Hermit Trail.", park: "Grand Canyon National Park"});
myContent.push({coordinates: {lat: 36.060207, lng: -112.213905}, typePhoto: false, url: "https://www.youtube.com/embed/YoU0qlBxSpU", description: "An opportune moment", park: "Grand Canyon National Park"});
myContent.push({coordinates: {lat: 36.056179, lng: -112.228802}, typePhoto: false, url: "https://www.youtube.com/embed/AmZATFHFKXc", description: "Farther down the canyon", park: "Grand Canyon National Park"});
myContent.push({coordinates: {lat: 36.061599, lng: -112.108271}, typePhoto: false, url: "https://www.youtube.com/embed/zFhPhaKOC60", description: "Sunset at the canyon", park: "Grand Canyon National Park"});

myContent.push({coordinates: {lat: 20.751890, lng: -156.274252}, typePhoto: false, url: "https://www.youtube.com/embed/2B0aFlng_uM", description: "Coasting down the volcano", park: "Haleakala National Park"});
myContent.push({coordinates: {lat: 20.714983, lng: -156.249551}, typePhoto: false, url: "https://www.youtube.com/embed/sXfhyFqsMvE", description: "Watching the sun come up", park: "Haleakala National Park"});
myContent.push({coordinates: {lat: 20.715179, lng: -156.249813}, typePhoto: false, url: "https://www.youtube.com/embed/IgszTdOLrGg", description: "Visitor center at 9,470 feet up", park: "Haleakala National Park"});
myContent.push({coordinates: {lat: 20.714974, lng: -156.249818}, typePhoto: false, url: "https://www.youtube.com/embed/FguzJqiH9L4", description: "Before the dawn", park: "Haleakala National Park"});
myContent.push({coordinates: {lat: 20.854920, lng: -156.311255}, typePhoto: false, url: "https://www.youtube.com/embed/wJ1jc_85VYg", description: "Fourth of July in Makawao", park: "Haleakala National Park"});
myContent.push({coordinates: {lat: 20.860924, lng: -156.313597}, typePhoto: false, url: "https://www.youtube.com/embed/vxpYUATrIrQ", description: "Getting ready for the rodeo", park: "Haleakala National Park"});

myContent.push({coordinates: {lat: 34.058947, lng: -116.179111}, typePhoto: false, url: "https://www.youtube.com/embed/rwD5feJk-s0", description: "This bug is the coolest dude.", park: "Joshua Tree National Park"});
myContent.push({coordinates: {lat: 34.066727, lng: -116.157138}, typePhoto: false, url: "https://www.youtube.com/embed/05-o80xRHQQ", description: "Worms!", park: "Joshua Tree National Park"});
myContent.push({coordinates: {lat: 34.080490, lng: -116.243881}, typePhoto: true, url: "https://www.dropbox.com/s/km50g0jvm7b05i5/MP4A4493.jpg?raw=1", description: "Desert road", park: "Joshua Tree National Park"});
myContent.push({coordinates: {lat: 34.048844, lng: -116.181107}, typePhoto: true, url: "https://www.dropbox.com/s/7gx654rdxrzrjku/MP4A4682.jpg?raw=1", description: "Joshua Trees at sunset", park: "Joshua Tree National Park"});
myContent.push({coordinates: {lat: 34.045290, lng: -116.183939}, typePhoto: true, url: "https://www.dropbox.com/s/ch9bqqj01w2xxc8/MP4A4544.jpg?raw=1", description: "ca-caw!", park: "Joshua Tree National Park"});
myContent.push({coordinates: {lat: 34.058920, lng: -116.226082}, typePhoto: true, url: "https://www.dropbox.com/s/apxjohz7xcb195c/MP4A4485.jpg?raw=1", description: "D'oh!", park: "Joshua Tree National Park"});
myContent.push({coordinates: {lat: 34.047126, lng: -116.181364}, typePhoto: true, url: "https://www.dropbox.com/s/e9vmyro9xyeswlc/MP4A4691.jpg?raw=1", description: "Beautiful desert at dusk", park: "Joshua Tree National Park"});

var myTrails = [];

myTrails.push({
	coordinates: {lat: 36.060902, lng: -112.212188}, name: "Hermit Trail", description: "Awesome trail on the west end of the canyon that extends down through the canyon walls.", park: "Grand Canyon National Park"
});

myTrails.push({
	coordinates: {lat: 20.714400, lng: -156.250981}, name: "Keoneheehee Trail", description: "walk the edge of the crater", park: "Haleakala National Park"
});

myTrails.push({
	coordinates: {lat: 20.712193, lng: -156.254854}, name: "Crater Trail", description: "don't try to hike this, bro", park: "Haleakala National Park"
});

myTrails.push({
	coordinates: {lat: 34.040196, lng: -116.186342}, name: "Boy Scouts Trail", description: "Medium difficulty trail, bring lots of water", park: "Joshua Tree National Park"
});

myTrails.push({
	coordinates: {lat: 36.052902, lng: -112.084161}, name: "South Kaibab Trail", description: "Strenous hike, very steep", park: "Grand Canyon National Park"
});

myTrails.push({
	coordinates: {lat: 36.057219, lng: -112.143711}, name: "Bright Angel Trail", description: "Steep hike leading to Indian Gardens", park: "Grand Canyon National Park"
});

myTrails.push({
	coordinates: {lat: 34.012627, lng: -116.167717}, name: "Hidden Valley Nature Trail", description: "Cool formations, good area for rock climbing.", park: "Joshua Tree National Park"
});

 // Create, delete, update, find for National Parks 
var trailStorage = [];
var contentStorage = [];

// remove the parks then create them with all their data again
db.NationalParks.remove({}, function (err, parks){
	if(err) {
		return console.log("Error", err);
	}
	console.log("deleted all parks from your database");
	//create the parks
	db.NationalParks.create(parkList, function (err, newParks) {
		if(err) {
			return console.log('Error, unable to remove parks', err);
		}
		console.log("all parks: ", newParks);
		//remove all trails
		db.Trailheads.remove(myTrails, function (err, trails) {
			if(err) {
				return console.log("error, unable to remove trails", err);
			}
			console.log("removed all trails");
			//create trails
			db.Trailheads.create(myTrails, function (err, trails) {
			if(err) {
				return console.log("error", err);
			}
			console.log("created your trails", trails);
			trailStorage = trails;
			//remove content
			db.Content.remove({}, function (err, content){
				if(err) {
					return console.log("Error, content not removed", err);
				}
				console.log("successfully removed content...creating now...");
				db.Content.create(myContent, function (err, content) {
					if(err) {
						return console.log("Error, content not created", err);
					}
					console.log("created your content");
					contentStorage = content;
					db.NationalParks.find({}, function (err, parks) {
						if(err) {
							return console.log("error", err);
						}
						//push trails onto parks
						console.log("The length of trails is " + trailStorage.length);						
						parks.forEach(function (elem) {
							for(i = 0; i < trailStorage.length; i++) {
								console.log("(Trails) Looking for " + trailStorage[i].park + " against " + elem.name);								
								if(elem.name === trailStorage[i].park) {
									elem.trails.push(trailStorage[i]);
									console.log(elem.trails);
									console.log("match");
								}
							}
							db.NationalParks.findOneAndUpdate({"_id": elem.id}, {trails: elem.trails}, function (err, updatedPark) {
									console.log("Trails added to parks");
							});
						});	

						console.log("The length of contentStorage is " + contentStorage.length);
						console.log("Content looks like: " + contentStorage);
						parks.forEach(function (elem) {
							for(j = 0; j < contentStorage.length; j++) {
								console.log("(Content) Looking for " + contentStorage[j].park + " against " + elem.name);
								if(elem.name === contentStorage[j].park) {
									console.log("matching content");
									elem.content.push(contentStorage[j]);
									console.log("matching content", elem.content);
								}
							}
							db.NationalParks.findOneAndUpdate({"_id": elem.id}, {content: elem.content}, function (err, updatedContent) {
								console.log("Content added to parks");
							});
						});
					});
				});
			});
			});
		});
	});
});







