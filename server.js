/***********************
Rich, Overall I'm pleased with your project.  Embedded Data is conceptually simply yet can be difficult to implement.  I'm glad you have commented above each route and provided clear steps and variable declarations to allow someone else to peek into your code.  Some future refactoring (ability to add new parks) and utilization of DB ids for your parks would make your project cleaner and more efficient.  When deploying production-level code for use by the public, remove any 'helpful' console logs, as this will slow down performance on your server side as well as provide the user with unencessary console logs on their browser.

Consider refactoring your api endpoints to remove possible duplicates.

Great work!

-jc

***********************/
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

//handlebars
app.set('view engine', 'hbs');

/************
 * DATABASE *
 ************/
var db = require('./models');


// TODO: This works for only three parks, and we agreed this would work; I would however like to see this eventually refactored to allow you to add/remove as many parks as you would like.  Imagine RizzoMaps taking off for all hiking adventures and having 50k users inputting data!  For this instance you did a good job. Love the vintage switch case! -jc

//reference function
function idNumToName(idNum) {
    var parkName = "";
    switch(idNum) {
        case "1":
            // TODO: You can actually just return parkName within the cases instead of changing the string here and returning it below. Make this change for production versions -jc
            parkName = "Joshua Tree National Park";
            break;
        case "2":
            parkName = "Haleakala National Park";
            break;
        case "3":
            parkName = "Grand Canyon National Park";
            break;
        default:
            parkName = "undefined";
    }
    // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
    console.log("the park you're looking for", parkName);
    return parkName;
}

//landing page
app.get('/', function homepage(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

//old park page, ignore for now
app.get('/park.html', function parkPage(req, res) {
    res.sendFile(__dirname + '/views/park.html');
});

// get the parks by id + server side handlebars
app.get('/parks/:id', function getParkID(req, res) {
    var parkId = req.params.id;
    var parkName = idNumToName(parkId);
    // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
    console.log("Expecting park name: ", parkName);
    db.NationalParks.findOne({name: parkName}, function(err, park) {
      // TODO: Please consider adding an error handler for (err) in the event that your database doesn't find the proper park. -jc
      // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
    	console.log("expecting park object:", park);
        res.render('park', {park: park});
    });
});

// TODO: This seems a bit of a repeat of the above route - jc
//get the park json by id
app.get('/api/parks/json/:id', function getParkID(req, res) {
    var parkId = req.params.id;
    var parkName = idNumToName(parkId);
    // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
    console.log("Expecting park name: ", parkName);
    db.NationalParks.findOne({name: parkName}, function (err, park) {
        // TODO: Please consider adding an error handler for (err) in the event that your database doesn't find the proper park. -jc
        // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
        console.log("expecting park object:", park);
        res.json(park);
        });
    });

//get all of the parks
app.get('/api/parks', function getParkID(req, res) {
    db.NationalParks.find({}, function(err, parks) {
        // TODO: Please consider adding an error handler for (err) in the event that your database doesn't find the proper park. -jc
        res.json(parks);
    });
});


//get park content by park id
app.get('/api/parks/:id/content', function getParkContent (req, res) {
    // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
    console.log("YOU ARE IN GET CONTENT");
    console.log("expecting a park id number: ", req.params.id)
    var parkId = req.params.id;
    var parkName = idNumToName(parkId);
    //FIND ONE NOT ALL
    db.NationalParks.findOne({name: parkName}, function(err, park) {
        if (err) {
            return console.log("error could not find matching park", err);
        }
        // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
        console.log(park);
        res.json(park.content);
    });
});

// THIS WILL GET ALL TRAILHEADS FROM ONE specific PARK
app.get('/api/parks/:id/trailheads', function indexTrailheads(req, res) {
    // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
    console.log("YOU ARE IN GET");
    console.log("expecting a park id number: ", req.params.id)
    var parkId = req.params.id;
    var parkName = idNumToName(parkId);
    //FIND ONE NOT ALL
    db.NationalParks.findOne({name: parkName}, function(err, park) {
        if (err) {
            return console.log("error could not find matching park", err);
        }
        // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
        console.log("PARK: ",park);
        res.json(park.trails);
    });
});

//create a trailhead FOR PARK :ID
app.post('/api/parks/:id/trailheads/:id2', function createTrailhead(req, res) {
    var trailBody = req.body;
    var trailToCreate = req.params.id2;
    var parkToCreateItIn = idNumToName(req.params.id);
    // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
    console.log("expecting trailBody to be an object: ", trailBody);
    console.log("expecting trailToCreate to be an String: ", trailToCreate);
    console.log("expecting trailToCreateItIn to be an String: ", parkToCreateItIn);

    db.Trailheads.create(trailBody, function (err, trail) {
        if(err) {
            console.log("error creating trail in TRAILHEADS: ", trail);
        }
        var yourNewTrail = trail;
        // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
        console.log("SUCCESSFULLY CREATED TRAIL IN TRAILHEADS: ", trail);
        db.NationalParks.findOneAndUpdate({'name': parkToCreateItIn}, {$push: {"trails": trailBody}}, {safe: true, upsert: true}, function (err, trailInPark) {
            if(err) {
                console.log("error creating new trail in PARK: ", trailInPark);
            }
            // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
            console.log("SUCCESSFULLY CREATED TRAIL IN PARK", trailInPark);
            res.send("You hit post.");
        });
    });
});

//delete a trailhead from a park
app.delete('/api/parks/:id/trailheads/:id2', function deleteTrailhead(req, res) {
    // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
    console.log("YOU ARE IN DELETE");
    var trailToDestroy = req.params.id2;
    var parkItsIn = idNumToName(req.params.id);
    // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
    console.log("This is the trail you want to destroy: ", trailToDestroy);
    console.log("Should be a string that we can search with? ", typeof trailToDestroy === 'string');
    console.log("This is the park that it's in: ", parkItsIn);

    db.NationalParks.findOneAndUpdate({'name': parkItsIn, 'trails.name': trailToDestroy}, {$pull: { trails: {"name": trailToDestroy}}}, function (err, park) {
        if(err) {
            console.log("UNABLE TO DESTROY", err);
        }
        // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
        console.log("FOUND AND DELETED TRAIL WITHIN THE PARK OBJECT", park);
        db.Trailheads.findOneAndRemove({'name': trailToDestroy}, function (err, trailhead) {
            if(err) {
                console.log("Error destroying trailhead", err);
            }
            // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
            console.log("FOUND TRAILHEAD AND DELETED IT IN TRAILHEADS: ", trailhead);
            res.send("you hit delete!");
        });
    });
});

//get all of the trailheads in json
app.get('/api/trailheads', function showTrailheads (req, res) {
    db.Trailheads.find({}, function (err, trailheads) {
        if(err) {
            console.log("Error finding trailheads", err);
        }
        // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
        console.log("EXPECTING ARRAY FULL OF TRAILHEAD OBJECTS: ", trailheads);
        res.json(trailheads);
    });
});

//update a park trailhead
app.put('/api/parks/:id/trailheads/:id2', function updateTrailhead (req, res) {
    var newBody = req.body;
    var uniqueId = req.params.id2;
    var parkId = idNumToName(req.params.id);
    // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
    console.log("park id is ", parkId);

    console.log("Expecting string name ", uniqueId);
    console.log(typeof uniqueId === 'string');

    console.log("Expecting updated information obj ", newBody);
    db.NationalParks.findOneAndUpdate({'name': parkId, 'trails.name': uniqueId}, {$set: {"trails.$" : newBody}}, function (err, park) {
        if(err) {
            console.log("unable to update", err);
        }
        // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
        console.log("FOUND AND UPDATED TRAIL WITHIN THE PARK OBJECT", park);
        db.Trailheads.findOneAndUpdate({name: uniqueId}, newBody, function (err, trailhead) {
            if(err) {
                console.log("Error finding corresponding trailhead", err);
            }
            // TODO: Please remove unecessary console.logs from production versions as it will slow down performance. -jc
            console.log("FOUND TRAILHEAD AND UPDATED IT IN TRAILHEADS: ", trailhead);
            res.send("you hit put!");
        });
    });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000);
// TODO: Please remove unecessary unused and commented-out code  from production versions as it will slow down performance. -jc
    // app.listen(process.env.PORT || 3000, function() {
    // console.log('Express server is running on http://localhost:3000/');
// });
