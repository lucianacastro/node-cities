console.log('hola');

var express = require('express');
var app = express();
var cities = require('./cities.json').cities;

cities.forEach(function(city) {
	city._link = '/api/cities/' + escape(city.name);
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

var paginateList = function(items, p, ipp, query) {
	
	p = parseInt(p);
	var final = p * ipp;
	console.log("final value: " + final);

	var initial = final - ipp;
	console.log("initial value: " + initial);
	return {
		_total: items.length,
		_p: p,
		_ipp: ipp,
		_next: getNextUrl(query),
		_prev: getPrevUrl(query),
		items: items.slice(initial, final)
	}
}

var getNextUrl = function(query) {
	var url = 'http://localhost:3000/api/cities?';
	console.log('query length: ' + Object.keys(query).length);
 	Object.keys(query).forEach(function(key, i) {
 		console.log('indice: ' + i);
 		if(Object.keys(query).length - 1 > i) {
 			if(key === 'p') {
 				var pValue =  parseInt(query[key]) + 1;
 				url = url.concat(key + '=' + pValue + '&');
 				console.log(url);
 			} else {
 				url = url.concat(key + '=' + query[key] + '&');
 				console.log(url);
 			}
 		} else {
 			if(key === 'p') {
 				var pValue =  parseInt(query[key]) + 1;
 				url = url.concat(key + '=' + pValue );
 				console.log(url);
 			} else {
 				url = url.concat(key + '=' + query[key]);
 				console.log(url);
 			}
 		}
 	});
 	return url;
}

var getPrevUrl = function(query) {
	var url = 'http://localhost:3000/api/cities?';
	console.log('query length: ' + Object.keys(query).length);
 	Object.keys(query).forEach(function(key, i) {
 		console.log('indice: ' + i);
 		if(Object.keys(query).length - 1 > i) {
 			if(key === 'p') {
 				if(parseInt(query[key]) > 1) {
 					var pValue =  parseInt(query[key]) - 1;
 					url = url.concat(key + '=' + pValue + '&');
 					console.log(url);
 				} else {
 					var pValue =  1;
 					url = url.concat(key + '=' + pValue + '&');
 					console.log(url);
 				}
 				
 			} else {
 				url = url.concat(key + '=' + query[key] + '&');
 				console.log(url);
 			}
 		} else {
 			if(key === 'p') {
 				if(parseInt(query[key]) > 1) {
 					var pValue =  parseInt(query[key]) - 1;
 					url = url.concat(key + '=' + pValue );
 					console.log(url);
 				} else {
 					var pValue =  1;
 					url = url.concat(key + '=' + pValue );
 					console.log(url);
 				}
 				
 			} else {
 				url = url.concat(key + '=' + query[key]);
 				console.log(url);
 			}
 		}
 	});
 	return url;
}






/**
 * req.query.ipp = 3
 * req.query.p = 1
 * {
	_total: (cant items antes de paginar),
	_count: (cant en la página),
	_p: 1,
	_ipp: y,
	_next: 'http://localhost....?p=2&budget=expensive&...', (opcional)
	_prev: null, (opcional)
	items: [ ... ],
 }
 */
app.get('/api/cities', function(req, res) {
	var budget = req.query.budget;
	var tripType = req.query.tripType;
	var characteristics = req.query.characteristics;
	var citiesFiltered = getCitiesFiltered(budget, tripType, characteristics);
	var p = req.query.p;
	var ipp = req.query.ipp = 3;
	
	//res.send(paginateList(citiesFiltered, ipp, p, req.query));
	res.send(paginateList(citiesFiltered, p, ipp, req.query));

	/*res.send({
		_total: citiesFiltered.length,
		items: citiesFiltered
		
		
	});*/
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






