/*jshint node:true */
/*jslint browser: true*/
/*global $, jQuery*/

var express = require('express'),
	redis = require('redis'),
	cookieParser = require('cookie-parser'),
	stormpath = require('express-stormpath'),
	randomstring = require('randomstring'),
	session = require('express-session'),
	redisStore = require('connect-redis')(session);

var client = redis.createClient(), //CREATE REDIS CLIENT
	app = express();

/* Session variables */
app.use(cookieParser('r30kKwv3sA6ExrJ9OmLSm4Wo3n'));

app.use(session({
	secret: 'cookie_secret',
	resave: true,
	saveUninitialized: true
}));

/* Assets folder */
app.use("/assets", express.static(__dirname + '/assets'));

/* Jade - tempalte engine setup */
app.set('views', './views');
app.set('view engine', 'jade');

/* Routing */
app.get('/', function (req, res) {
	if (req.session.logged != 1) {
		console.log('not logged');
		req.session.code = randomstring.generate(7);
		url = 'http://' + req.get('host') + '/' + req.session.code;
		res.render('home', {
			title: 'peerWork',
			description: 'increase your productivity by working peer to peer',
			url: url
		});
	}
	else {
		console.log('logged');
		url = 'http://' + req.get('host') + '/' + req.session.code;
		res.render('home', {
			title: 'peerWork',
			description: 'increase your productivity by working peer to peer',
			url: url
		});
	}
});

app.get('/:code', function (req, res) {
	code = req.params.code;
	if (code == req.session.code) {
		req.session.logged = 1;
		res.render('friend', {
			title: 'peerWork',
			description: 'increase your productivity by working peer to peer',
			author: 'me'
		});
	}
	else {
		req.session.loggedAsFriend = 1;
		res.render('friend', {
			title: 'peerWork',
			description: 'increase your productivity by working peer to peer',
			author: 'me'
		});
	}
});

app.get('/tubular', function (req, res) {
	lastPage = '';
	if(req.session.lastPage) {
		lastPage = req.session.lastPage;
	}

	res.write('Last page was: ' + lastPage + '. ', function () {
		req.session.lastPage = '/tubular';
		res.write('Are you a surfer?', function() {
			res.end();
		});
	});
	
});

app.listen(3000);