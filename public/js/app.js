$(document).ready(function() {
	console.log("Sanity check is working!");


  var path = window.location.pathname;
  var iD = path.substring(path.length-1, path.length);

$.ajax({
    method: "GET",
    url: "/api/parks/" + iD + "/trailheads",
    success: function (data) {
      console.log(iD);
      var myLatLng;
      mapData = data; 
      myLatLng = data[0].coordinates;
      console.log(myLatLng);
      map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 11
      });
    }
});

});