console.log('hola');

var express = require('express');
var app = express();
var cities = require('./cities.json').cities;

cities.forEach(function(city) {
	city._link = 'http://localhost:3000/api/cities/' + escape(city.name);
});

app.get('/', function(req, res) {
	console.log('Me pidieron hello world, para ', req.query);
	res.send('hello world');
});

app.get('/api/cities', function(req, res) {
	res.send({
		items: cities
	});
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