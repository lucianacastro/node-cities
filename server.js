console.log('hola');

var express = require('express');
var app = express();
var cities = require('./cities.json').cities;

cities.forEach(function(city) {
	city._link = 'http://localhost:3000/api/cities/' + escape(city.name);
});

app.use(express.static('./public'));

app.get('/', function(req, res) {
	console.log('Me pidieron hello world, para ', req.query);
	res.send('hello world');
});

var getCitiesFiltered = function(budget, tripType, characteristics) {
	var citiesFiltered = cities;
	if (budget) {
		citiesFiltered = citiesFiltered.filter(function(city) {
			return city.budget === budget;
		});
	}
	if (tripType) {
		citiesFiltered = citiesFiltered.filter(function(city) {
			return city.tripType === tripType;
		});
	}
	if(characteristics) {
		citiesFiltered = citiesFiltered.filter( function(city) {
			return city.characteristics.find(function(characteristic) {
				return characteristic === characteristics;
			});
		});
	}
	return citiesFiltered;
}

app.get('/api/cities', function(req, res) {
	var budget = req.query.budget;
	var tripType = req.query.tripType;
	var characteristics = req.query.characteristics;
	var citiesFiltered = getCitiesFiltered(budget, tripType, characteristics);
	
	res.send({
		_total: citiesFiltered.length,
		items: citiesFiltered
	});
});

app.get('/api/random/city', function(req, res) {
	var budget = req.query.budget;
	var tripType = req.query.tripType;
	var characteristics = req.query.characteristics;
	var citiesFiltered = getCitiesFiltered(budget, tripType, characteristics);

	res.send(citiesFiltered[Math.floor(Math.random()*citiesFiltered.length)]);
});

app.get('/api/cities/:cityName', function(req, res) {
	var cityName = req.params.cityName;
	var city = cities.find(function(city){
		return city.name === cityName;
	});
	if (city) {
		res.send(city);	
	} else {
		res.status(404).send({ error: 'not found' });
	}
});

app.listen(3000, function() {
	console.log('El servidor arrancó en el puerto 3000');
});






