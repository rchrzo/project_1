$(document).ready(function() {
	console.log("Sanity check is working!");

//when clicking one of the buttons
	//grab the id of the button clicked
	//get park.html
$('.btn.btn-default.indexButtons').on("click", function (e) {
   e.preventDefault();
   var parkClicked = $(this).attr('id');
   console.log(parkClicked);
   window.location.href='/park.html';
});

});