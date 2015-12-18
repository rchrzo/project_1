#Welcome to my maps project! 

Users can see photos and videos of the places I've visited by exploring their coordinates on a map. Users can also add,  delete, or update the trailheads at these places by using the handy GUI I've provided on the page.  

It was super challenging and fun to build it. This past year I visited three awesome National Parks. Basically, I wanted to create a way for me to showcase the photos and video I took at each park. I've also wanted an excuse to use the Google Maps API for some time now. 

To access the data I've put in my Mongo database, follow these instructions: 

Since there are only theree parks, you should know them by their IDs

###Joshua Tree National Park is 1

###Haleakala National Park is 2

###Grand Canyon National Park is 3

Simple enough, right? 


<!-- Routes -->

###To GET a json object of specific park use 

'/api/parks/json/:id'


###To GET all of the parks in json, don't worry about an :id, just use 

'/api/parks'

as your path. 


As you will see on the app, there are two kinds of markers. One denotes the trailheads in the park, the other is for the locations of the various photo and video conent I've embedded.

###To GET all of the trailheads in a park in json use the corresponding park ID number with this path

'/api/parks/:id/trailheads'


###I set up my schema so that trailheads is separate schema which is eventually embedded inside of the National Parks schema. 
So in order to GET ALL of the TRAILHEADS from all parks, use the path

'/api/trailheads'


###Since the Content is my own, I have chose to exclude a GET for all of it, however you are able to look it up by park, using this path

'/api/parks/:id/content'




###Challenges
I encountered many challenges for this project, some of which still persist. 

1) Wrapping my head around the Mongo database structure was difficult because when you have separate schema embedded inside of one another, you have to update the schema and also the schema that they are being held in. This concept was confusing, but makes sense when considering that Mongo is a non-relational database.

![screenshot]
(http://i.imgur.com/Rub9LXZ.png)

2) Mongoose is hard because even though it's designed to make managing Mongo easier, it has its own weird idiosyncrasies.

3) Wiping the DB and then seeding it

![screenshot]
(http://i.imgur.com/Ur1i1XC.png)

How about those nested functions? 

![screenshot]
(http://i.imgur.com/QpHSn7i.jpg)

4) I really wanted to spend more time on the client side, make my html and css look really beautiful but I spent most of that time connecting the server.js and the app.js or wrangling with a bug.


##I'm pleased with my input checker
![screenshot]
(http://i.imgur.com/9BaFyHZ.png)


###Moving Forward
I have a laundry list of things I'd like to fix/accomplish moving forward, and I'm excited to work on them.

1) Adding trailhead geo-fencing within the park, so new trails or updated trails aren't spammed anywhere onto my map.
![screenshot]
(https://media.giphy.com/media/CEqagLI1QmnYI/giphy.gif)

2) Fixing reloading problems. When deploying my app to heroku, my database seemed slow. 

3) Consolidating some of the "GET" Ajax requests in my app.js. I don't think I need to grab data as often as I do, since that is the first thing I do when I load the page anyways. 

4) I'd love to make my Content more specific, with fields indicating what trail, what time of year the photo or video was taken, etc.

5) FIX MY LANDING PAGE! The reason why I have three differently colored boxes on my landing page is because I wanted them to be clean looking images of each park, that upon click will direct you to the corresponding page.

6) A friendly lat/lng finder that allows users to drop a pin on the map which will fill in the lat and long fields of a create new trail form. 

7) Add a private content creation CRUD for me to put in new content more easily instead of hard coding it. 

8) Make the site more pretty and fix the html and css. 








