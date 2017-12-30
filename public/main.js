
$('.lucky-button').on('click', function() {
	$.getJSON('http://localhost:3000/api/random/city', function(city) {
		$('#destination').text(city.name);
	});
});

$('.done-button').on('click', function() {
	//?budget=expensive&tripType=beach
	var querystring = '?budget=' + $('#budget').val() + '&tripType=' + $('#tripType').val();

	$.getJSON('http://localhost:3000/api/random/city' + querystring, function(city) {
		$('#advanced-destination').text(city.name);
	});
});



$(document).ready(function(){
    $('.mySelectBoxClass').customSelect();
});