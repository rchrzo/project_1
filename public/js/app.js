$(document).ready(function() {
	console.log("Sanity check is working!");


  var path = window.location.pathname;
  var iD = path.substring(path.length-1, path.length);

$.ajax({
  method: "GET",
  url: "/api/parks/json/" + iD,
  success: function (data) {
    console.log("your data: ", data);
    var centerPoint = data.coordinates;
    map = new google.maps.Map(document.getElementById('map'), {
    center: centerPoint,
    zoom: 14
    });
  }
});  

$.ajax({
    method: "GET",
    url: "/api/parks/" + iD + "/trailheads",
    success: function (dataTrails) {
      console.log(iD);
      console.log("trailheads data", dataTrails);
      dataTrails.forEach(function (elem){
          var contentString = elem.description;
          var infowindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 300
          });
          var marker = new google.maps.Marker({
            position: elem.coordinates,
            map: map,
            title: elem.name,
            icon: {
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 4
              }
            });
            marker.addListener('click', function() {
              infowindow.open(map, marker);
          });
      });
    }
});

$.ajax({
    method: "GET",
    url: "/api/parks/" + iD + "/content",
    success: function (dataContent) {
      console.log("expecting an array full of Content objects: ", dataContent)
          dataContent.forEach(function (elem){
          var contentString = elem.description;
          var infowindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 300
          });
          var marker = new google.maps.Marker({
            position: elem.coordinates,
            map: map,
            title: elem.name
            });
            marker.addListener('click', function() {
              infowindow.open(map, marker);
          });
      });
    }
});

//create trail
$('#addTrailButton').on("click", function (e) {
   $('#createTrailModal').modal();
});

$('#submitTrail').on("click", handleTrailCreate);




//I know this is hackey
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

function handleTrailCreate (e) {
    var parkId = iD;
    var trailName = $('#trailName').val();
    var latitude = $('#trailLat').val();
    var longitude = $('#trailLng').val();
    var trailDescription = $('#trailDescription').val();
    parkId = idNumToName(parkId);
    console.log("expecting park id string: ", parkId)
    
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);
    console.log(typeof longitude === 'number');
    console.log(typeof latitude === 'number');
    console.log("lat" + latitude + "lng" + longitude);

    var formData = {
      coordinates: {lat: latitude, lng: longitude},
      name: trailName,
      description: trailDescription,
      park: parkId
    }

     console.log(typeof formData.coordinates.lat === 'number');
    console.log(typeof formData.coordinates.lng === 'number');

    console.log("expecting full trail object ready for post: ", formData);
    function urlConcat(iD) {
      var url = "/api/parks/";
      url += iD + "/trailheads";
      return url;
    }
    var expectedUrl = urlConcat(iD);
    console.log("our expected url is: ", expectedUrl);
    $.ajax({
        method: "POST",
        url: expectedUrl,
        data: formData,
        success: function (result) {
          console.log("expecting a successul post result to trailheads: ", result);
        }
    });

    $('#trailName').val('');
    $('#trailLat').val('');
    $('#traiLng').val('');
    $('#trailDescription').val('');
}











});
