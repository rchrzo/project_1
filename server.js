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

function idNumToName(idNum) {
    var parkName = ""; 
        switch(idNum) {
            case "1": 
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
    console.log("the park you're looking for", parkName);
    return parkName;
}

app.get('/', function homepage(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/park.html', function parkPage(req, res) {
    res.sendFile(__dirname + '/views/park.html');
});

// get the parks by id
app.get('/parks/:id', function getParkID(req, res) {
    var parkId = req.params.id;
    var parkName = idNumToName(parkId);
    console.log("Expecting park name: ", parkName);
    db.NationalParks.findOne({name: parkName}, function(err, park) {
    	console.log("expecting park object:", park);
        res.render('park', {park: park});
    });
});

//get the parks by id
app.get('/api/parks/json/:id', function getParkID(req, res) {
    var parkId = req.params.id;
    var parkName = idNumToName(parkId);
    console.log("Expecting park name: ", parkName);
    db.NationalParks.findOne({name: parkName}, function (err, park) {
        console.log("expecting park object:", park);
        res.json(park);
    });
});

//get all of the parks 
app.get('/api/parks', function getParkID(req, res) {
    db.NationalParks.find({}, function(err, parks) {
        res.json(parks);
    });
});



app.get('/api/parks/:id/content', function getParkContent (req, res) {
     console.log("YOU ARE IN GET CONTENT");
     console.log("expecting a park id number: ", req.params.id)
    var parkId = req.params.id;
    var parkName = idNumToName(parkId);
    //FIND ONE NOT ALL
    db.NationalParks.findOne({name: parkName}, function(err, park) {
        if (err) {
            return console.log("error could not find matching park", err);
        }
        console.log(park);
        res.json(park.content);
    });
});

// //get the content
// app.get('/api/content', function getMediaContent(req, res) {
//     var parkContent = [];
//     db.NationalParks.find({}, function(err, parks) {
//         if (err) {
//             console.log("error", err);
//         }
//         console.log(parks);
//         parks.forEach(function(elem) {
//             parkContent.push(elem.content);
//         });
//         //res.json(parkContent);

//     });
// });

// THIS WILL GET ALL TRAILHEADS FROM ONE PARK
// //get the trailheads
app.get('/api/parks/:id/trailheads', function indexTrailheads(req, res) {
    console.log("YOU ARE IN GET");
    console.log("expecting a park id number: ", req.params.id)
    var parkId = req.params.id;
    var parkName = idNumToName(parkId);
    //FIND ONE NOT ALL
    db.NationalParks.findOne({name: parkName}, function(err, park) {
        if (err) {
            return console.log("error could not find matching park", err);
        }
        console.log(park);
        res.json(park.trails);
    });
});

// //create a trailhead FOR PARK :ID
app.post('/api/parks/:id/trailheads/:id2', function createTrailhead(req, res) {
    var trailBody = req.body;
    var trailToCreate = req.params.id2;
    var parkToCreateItIn = idNumToName(req.params.id);
    console.log("expecting trailBody to be an object: ", trailBody);
    console.log("expecting trailToCreate to be an String: ", trailToCreate);
    console.log("expecting trailToCreateItIn to be an String: ", parkToCreateItIn);
    db.Trailheads.create(trailBody, function (err, trail) {
        if(err) {
            console.log("error creating trail in TRAILHEADS: ", trail);
        }
        var yourNewTrail = trail;
        console.log("SUCCESSFULLY CREATED TRAIL IN TRAILHEADS: ", trail);
        db.NationalParks.findOneAndUpdate({'name': parkToCreateItIn}, {$push: {"trails": trailBody}}, {safe: true, upsert: true}, function (err, trailInPark) {
            if(err) {
                console.log("error creating new trail in PARK: ", trailInPark);
            }
            console.log("SUCCESSFULLY CREATED TRAIL IN PARK", trailInPark);
            res.send("You hit post.");
        });
    });
});
    // console.log("trailBody: ", trailBody);
    //     db.NationalParks.findOne({name: trailBody.park}, function (err, park) {
    //         if(err) {
    //             console.log("ERROR FINDING PARK: ", park);
    //         }
    //         var trailhead = new db.Trailheads(trailBody);
    //         park.trails.push(trailhead);
    //         park.save(function (err, savedEvent) {
    //             if(err) {
    //                 console.log("ERROR SAVING: ", err);
    //             }
    //             console.log("NEW TRAILHEAD CREATED WITHIN PARK", savedEvent);
    //             db.Trailheads.create(trailhead, function (err, trail) {
    //                 if(err) {
    //                     console.log("error crrating new trailhead", err)
    //                 }
    //                 console.log("CREATED TRAILHEAD WITHIN TRAILHEAD ", trail);
    //                 res.send(trail);
    //             });
    //         });
    //     });


app.delete('/api/parks/:id/trailheads/:id2', function deleteTrailhead(req, res) {
    console.log("YOU ARE IN DELETE");
    var trailToDestroy = req.params.id2;
    var parkItsIn = idNumToName(req.params.id);
    console.log("This is the trail you want to destroy: ", trailToDestroy);
    console.log("Should be a string that we can search with? ", typeof trailToDestroy === 'string');
    console.log("This is the park that it's in: ", parkItsIn);
    db.NationalParks.findOneAndUpdate({'name': parkItsIn, 'trails.name': trailToDestroy}, {$pull: { trails: {"name": trailToDestroy}}}, function (err, park) {
                if(err) {
                    console.log("UNABLE TO DESTROY", err);
                }
                console.log("FOUND AND DELETED TRAIL WITHIN THE PARK OBJECT", park);
                db.Trailheads.findOneAndRemove({'name': trailToDestroy}, function (err, trailhead) {
                    if(err) {
                        console.log("Error destroying trailhead", err);
                    } 
                    console.log("FOUND TRAILHEAD AND DELETED IT IN TRAILHEADS: ", trailhead);
                    res.send("you hit put!");   
                });
   });

    // db.Trailheads.findOne({name: trailToDestroy}, function (err, trail) {
    //     if(err) {
    //         console.log(err);
    //     }
    //     console.log("EXPECTING TRAIL OBJECT: ", trail);
    //     var trailId = trail._id;
    //     console.log("EXPECTING TRAIL ID:", trailId);
    //     db.NationalParks.findOneAndUpdate({'trails._id': trailId}, {$pull: { trails: {"_id": trailId}}}, function (err, park) {
    //         if(err) {
    //             console.log("unable to find park and destroy trail", err);
    //         }
    //         console.log("FOUND AND DESTROYED TRAIL WITHIN PARK OBJECT", park);
    //         db.Trailheads.findOneAndRemove({"_id": trailId}, function (err, trailDeleted){
    //             if(err) {
    //                 console.log("unable to remove trail from trailheads", err);
    //             }
    //             console.log("SUCCESSFULLY DESTROYED TRAIL FROM TRAILHEADS", trailDeleted);
    //             res.send("you hit delete!");
    //         });   
    //     });
    // });
});


app.get('/api/trailheads', function showTrailheads (req, res) {
    db.Trailheads.find({}, function (err, trailheads) {
        if(err) {
            console.log("Error finding trailheads", err);
        }
        console.log("EXPECTING ARRAY FULL OF TRAILHEAD OBJECTS: ", trailheads);
        res.json(trailheads);
    });
});


app.put('/api/parks/:id/trailheads/:id2', function updateTrailhead (req, res) {
    var newBody = req.body;
    var uniqueId = req.params.id2;
    var parkId = idNumToName(req.params.id); 
    console.log("park id is ", parkId);

    console.log("Expecting string name ", uniqueId);
    console.log(typeof uniqueId === 'string'); 

    console.log("Expecting updated information obj ", newBody);
    db.NationalParks.findOneAndUpdate({'name': parkId, 'trails.name': uniqueId}, {$set: {"trails.$" : newBody}}, function (err, park) {
                if(err) {
                    console.log("unable to update", err);
                }
                console.log("FOUND AND UPDATED TRAIL WITHIN THE PARK OBJECT", park);
                db.Trailheads.findOneAndUpdate({name: uniqueId}, newBody, function (err, trailhead) {
                    if(err) {
                        console.log("Error finding corresponding trailhead", err);
                    } 
                    console.log("FOUND TRAILHEAD AND UPDATED IT IN TRAILHEADS: ", trailhead);
                    res.send("you hit put!");    
                });
        });
});

//backup
// app.put('/api/parks/:id/trailheads/:id2', function updateTrailhead (req, res) {
//     var newBody = req.body;
//     var uniqueId = req.params.id2;
//     var parkId = idNumToName(req.params.id); 
//     console.log("park id is ", parkId);

//     console.log("Expecting string name ", uniqueId);
//     console.log(typeof uniqueId === 'string'); 

//     console.log("Expecting updated information obj ", newBody);
//     db.Trailheads.findOneAndUpdate({name: uniqueId}, newBody, function (err, trailhead) {
//         if(err) {
//             console.log("Error finding corresponding trailhead", err);
//         } 
//         console.log("FOUND TRAILHEAD AND UPDATED IT IN TRAILHEADS: ", trailhead);
//             console.log("trails._id")
//             db.NationalParks.findOneAndUpdate({'name': parkId, 'trails._id': trailhead._id}, {$set: {"trails.$" : newBody}}, function (err, park) {
//                 if(err) {
//                     console.log("unable to update", err);
//                 }
//                 console.log("FOUND AND UPDATED TRAIL WITHIN THE PARK OBJECT", park);
//             res.send("you hit put!");
//         });
//     });
// });





    // db.Trailheads.create(trailBody, function(err, trail) {
    //     if (err) {
    //         console.log("error on create", err);
    //     }
    //     console.log("expecting a trail object to be created, " + "created new trail", trail);
    //     db.NationalParks.update({name: trail.park}, {$addToSet: {trails: trail}}, function (err, park) {
    //         if(err) {
    //             console.log("error finding and updating", err);
    //         }
    //         console.log("expecting updated park object", park);
    //         res.send("done");
    //         });
    //     });
            //find the park ONE
            //in callback push new trail onto park.trail
            //db.parks.save


    //was this put?
    // var newTrail = {
    //     coordinates: "lat: 20.714861, lng: -156.249868",
    //     name: "Pa Ka'oao Trail",
    //     description: "view the inside of the crater",
    //     park: "Haleakala National Park"
    // };
    // // create a Trailhead 
    // db.Trailheads.create(newTrail, function(err, trail) {
    //     if (err) {
    //         console.log("error on create", err);
    //     }
    //     console.log("expecting a trail object to be created, " + "created new trail", trail);
    //     // if it matches the park 
    //     db.NationalParks.find({
    //         name: newTrail.park
    //     }, function(err, parks) {
    //         if (err) {
    //             console.log("could not find matching park", err);
    //         }
    //         console.log("found your matching park ", parks.name);
    //         var parkId = parks.id;
    //         parks.trails.push(trail);
    //         db.NationalParks.findOneAndUpdate({
    //             "_id": parkId
    //         }, {
    //             trails: trail
    //         }, function(err, aTrail) {
    //             if (err) {
    //                 console.log("error adding trail to park", err);
    //             }
    //             console.log("added this trail to your park, ", aTrail);
    //             res.send("200, okay");
    //         });
    //     });
    // });

//update a trailhead
// app.put('/api/parks/:id/trailheads/:id2', function updateTrailhead(req, res) {
//     //get the trail id and body
//     var trailBody = {
//         name: "Secret Trail",
//         description: "I'll never tell."
//     };
//     var trailId = "566e64a57610e0a36ccb784b";
//     //update that trail in Trailheads
//     db.Trailheads.update({
//         "_id": trailId
//     }, trailBody, function(err, trail) {
//         if (err) {
//             console.log("error updating trail ", err)
//         }
//         console.log("expecting an updated trail object: ", trail);
//         //find corresponding National Park
//         db.NationalParks.find({
//             "_id": trail.park
//         }, function(err, park) {
//             if (err) {
//                 console.log("Error finding corresponding park ", park);
//             }
//             console.log("expecting park object: ", park);
//             //update it with new information
//             console.log("expecting to update with park id of " + park.id + " and a trail id " + trail.id);
//             db.NationalParks.findOneAndUpdate({
//                 "_id": park.id,
//                 trails: {
//                     "_id": trail.id
//                 }
//             }, trail, function(err, aTrail) {
//                 if (err) {
//                     console.log("error finding and updating trail ", err);
//                 }
//                 console.log("successfully updated your trail");
//                 res.send("200, okay");
//             });
//         });
//     });
// });

//NEEDS TO KNOW WHICH PARK AND WHICH TRAILHEAD TO DESTROY
//destroy a trailhead
// app.delete('/api/parks/:id/trailheads/:id2', function deleteTrailhead(req, res) {
//     //get id
//     var trailId = "566e64a57610e0a36ccb784b";
//     //find that in Trailheads
//     db.Trailheads.find({
//         "_id": trailId
//     }, function(err, trail) {
//         if (err) {
//             console.log("Unable to find trail ", err);
//         }
//         console.log("expecting trail object, found: ", trail);
//         //delete it 
//         db.Trailheads.remove({
//             "_id": trail.id
//         }, function(err, deletedTrail) {
//             if (err) {
//                 console.log("error removing your trail from Trailheads ", err);
//             }
//             console.log("removed your trail from trailheads ", deletedTrail);
//             //find that in NationalParks and remove it 
//             console.log("expecting to find a park now by using trail.park which is: ", trail.park);
//             db.NationalParks.find({
//                 "_id": trail.park
//             }, function(err, park) {
//                 if (err) {
//                     console.log("error finding your park", err);
//                 }
//                 console.log("expecting park object, found: ", park);
//                 //remove it 
//                 console.log("using park id to remove, it should be: " + park.id + " plus a trail id" + trail.id);
//                 db.NationalParks.findOneAndRemove({
//                     "_id": park.id,
//                     trails: {
//                         "_id": trail.id
//                     }
//                 }, function(err, deleteSuccess) {
//                     if (err) {
//                         console.log("unable to remove trail from parks: ", err);
//                     }
//                     console.log("successfully removed the trail from parks", deleteSuccess);
//                 });
//             });
//         });
//     });
// });




/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is running on http://localhost:3000/');
});