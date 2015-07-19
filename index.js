var express = require ('express');
var stormpath = require ('express-stormpath');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/' function (req, res) {
	res.render('home', {
		title: 'peerWork'
	});
});