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





});
