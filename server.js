console.log('hola');

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	console.log('Me pidieron hello world');
	res.send('hello world');
});

app.listen(3000, function() {
	console.log('El servidor arrancó en el puerto 3000');
});