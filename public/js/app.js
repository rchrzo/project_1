$(document).ready(function() {
	console.log("Sanity check is working!");


  var path = window.location.pathname;
  var iD = path.substring(path.length-1, path.length);

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

var dataStore = {};
var trailStore = [];

$.ajax({
  method: "GET",
  url: "/api/parks/json/" + iD,
  success: function (data) {
    console.log("your data: ", data);
    dataStore = data;
    trailStore = data.trails;
    var centerPoint = data.coordinates;
    map = new google.maps.Map(document.getElementById('map'), {
    center: centerPoint,
    zoom: 10
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
              //function for media change
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
          var contentId = elem._id;
          var type = elem.typePhoto;
          var url = elem.url;
          console.log("here is your content id:", contentId);
          var infowindow = new google.maps.InfoWindow({
              content: contentString,  
              maxWidth: 300,
              id: contentId
          });
          var marker = new google.maps.Marker({
            position: elem.coordinates,
            map: map,
            title: elem.name
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
            renderMedia(contentId, url, type);
          });
      });
    }
});

//create trail
$('#addTrailButton').on("click", function (e) {
   $('#createTrailModal').modal();
});

$('#submitTrail').on("click", handleTrailCreate);

//delete trail
var trailToDelete = "";

$('#deleteTrailButton').on("click", function (e){
    $('#deleteTrailModal').modal();
    $('.dropdown-menu a').on("click", function (e){    
      $('.dropdown-toggle').html($(this).html() + '<span class="caret"></span>');
      $('#dropdownMenu1delete').text()    
    });
    $('#deleteTrail').on("click", function (e) {
      trailToDelete = $('#dropdownMenu1delete').text();
      console.log("expecting trailToDelete to be :", trailToDelete);
      handleDeleteTrail();
    });
});

var trailToUpdate = "";

//update trail

function updateTrailModal() {
  $('#updateModal').modal();
  $('.dropdown-menu a').on("click", function (e){    
      $('.dropdown-toggle').html($(this).html() + '<span class="caret"></span>');
        var selectedTrail = $('#dropdownMenu1update').text(); 
        console.log("expecting trail store", trailStore);
        trailStore.forEach( function (elem) {
            console.log("logging elem names", elem.name);
            if(elem.name === selectedTrail) {
              $('#trailNameU').val(elem.name);
              $('#trailLatU').val(elem.coordinates.lat);
              $('#trailLngU').val(elem.coordinates.lng);
              $('#trailDescriptionU').val(elem.description);
            }
        });  
  });
  $('#updateTrail').on("click", function (e) {
    trailToUpdate = $('#dropdownMenu1update').text();
    console.log("Expecting trail string: ", trailToDelete);
    handleUpdateTrail();
});
}

$('#updateButton').on("click", function (e) {
  updateTrailModal();
});


function handleTrailCreate (e) {
    var trailName = $('#trailName').val();
    var latitude = $('#trailLat').val();
    var longitude = $('#trailLng').val();
    var trailDescription = $('#trailDescription').val();
    parkId = idNumToName(iD);
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

    //input validation
    console.log(typeof formData.coordinates.lat === 'number');
    console.log(typeof formData.coordinates.lng === 'number');

    var goodToGo = checkInput(formData);
    if(goodToGo === false) {
      alert("Invalid input, please try again");
    } else {
    
    $.ajax({
        method: "POST",
        url: "/api/parks/" + iD + "/trailheads/" + trailName,
        data: formData,
        success: function (result) {
          console.log("expecting a successul post result to trailheads: ", result);
        }
    });

    $('#trailName').val('');
    $('#trailLat').val('');
    $('#traiLng').val('');
    $('#trailDescription').val('');
    // location.reload();
}
}

function handleDeleteTrail (e) {
  console.log("Expecting trailToDelete to be a string of a park: ", trailToDelete);

  $.ajax({
      method: "DELETE",
      url: "/api/parks/" + iD + "/trailheads/" + trailToDelete,
      success: function (data) {
        console.log("expecting a delete confirmation", data);
      }
  });

  $('#dropdownMenu1delete').text('Current Trails');
  $('#albumModal').modal('hide');
  // location.reload();
}

function handleUpdateTrail (e) {
console.log("Expecting trailToUpdate to be a string of a park", trailToUpdate);
    var parkId = idNumToName(iD);
    var trailName = $('#trailNameU').val();
    var latitude = $('#trailLatU').val();
    var longitude = $('#trailLngU').val();
    var trailDescription = $('#trailDescriptionU').val();


var trailUpdate = {
    name: trailName,
    park: parkId,
    coordinates: {lat: latitude , lng: longitude},
    description: trailDescription
}

var formGoodToGo = checkInput(trailUpdate);
console.log("is form data valid?", formGoodToGo);
if(formGoodToGo === false) {
  alert("Invalid input, please try again");
} else {

console.log("Expecting full trailUpdate object: ", trailUpdate);
$.ajax({
  method: "PUT",
  url: "/api/parks/" + iD + "/trailheads/" + trailToUpdate,
  data: trailUpdate,
  success: function (data) {
    console.log("expecting some kind of server response: ", data);
  }
});
}
}

function renderMedia (contentId, url, type) {
console.log("Expecting content id string", contentId);
  if(type) {
    //description append with img scr
    $('#descriptionBox').html("<img src=" + url + ">");
  } else {
    //description append with iframe 
    $('#descriptionBox').html("<iframe width='560' height= '315' src='" + url + "' frameborder='0' allowfullscreen></iframe>");
  }
}

function checkInput(formObject) {
  for (var key in formObject) {
    if(formObject[key] === "" || formObject[key] === undefined || formObject[key] === null || formObject[key] === NaN) {
      return false; 
    }
  }
return true;
}





});
