$(document).ready(function() {
	console.log("Sanity check is working!");

//when clicking one of the buttons
	//grab the id of the button clicked
	//get park.html
 var parkClicked = "";
 

$('.btn.btn-default.indexButtons').on("click", function (e) {
   e.preventDefault();
   parkClicked = $(this).attr('id');
   console.log(parkClicked);
   //localStorage.setItem("parkClicked", parkClicked);
   $.ajax({
	   	method: 'GET',
	   	url: '/api/parks/' + parkClicked,
	   	data: parkClicked,
	   	success: function(data){
	   		console.log("I've gotten a successful response of " , data);
	   		$('#parkList').append(data[0].name);
	   	}
   })
   //AJAX for park clicked
   //AJAX w/ redirect to park.html
   //window.location.href='/park.html';
   //console.log("Well that just happened");
});


var myLatLng = {lat: 33.992761, lng: -116.207886};

  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 10
});


});