
$('.lucky-button').on('click', function() {
	$.getJSON('/api/random/city', function(city) {
		$('#destination').text(city.name);
	});
});

$('.done-button').on('click', function() {
	//?budget=expensive&tripType=beach
	var querystring = '?budget=' + $('#budget').val() + '&tripType=' + $('#tripType').val();

	$.getJSON('/api/random/city' + querystring, function(city) {
		$('#advanced-destination').text(city.name);
	});
});



$(document).ready(function(){
    $('.mySelectBoxClass').customSelect();
});