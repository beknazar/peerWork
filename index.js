/*jshint node:true */
/*jslint browser: true*/
/*global $, jQuery*/

var express = require('express'),
	redis = require('redis'),
	cookieParser = require('cookie-parser'),
	stormpath = require('express-stormpath'),
	randomstring = require('randomstring'),
	session = require('express-session'),
	redisStore = require('connect-redis')(session),
	qs = require('querystring'),
	vars = require('./vars');

var client = redis.createClient(), // Create redis client
	app = express();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./task.db');


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
			title: vars.name,
			description: 'increase your productivity by working peer to peer',
			url: url
		});
	}
	else {
		console.log('logged');
		url = 'http://' + req.get('host') + '/' + req.session.code;
		res.render('home', {
			title: vars.name,
			description: vars.description,
			url: url
		});
	}
});

app.get('/:code', function (req, res) {
	var code = req.params.code;
	if (code == req.session.code) {
		req.session.author = 1;
	}
	else {
		req.session.author = 0;
	}
	var author = req.session.author;
	var sqlQuery = "SELECT * FROM sessionList WHERE sessionName = '" + String(code) + "';";
	db.get(sqlQuery, function(err, row) {
		if (err) {
			console.log(err);
		}
		else {
			if (!row) {
				db.run("INSERT INTO sessionList (sessionName) VALUES ('" + code + "')");
			}
			else {
				console.log(rows);
			}
			db.get("SELECT rowid FROM sessionList WHERE sessionName = '" + String(code) + "';", function (err, row) {
				req.session.sessionID = row.rowid;
			})
		}
	});

	res.render('friend', {
		title: vars.name,
		description: vars.description,
		myTasks: myTasks,
		myTasks: friendTasks,
		author: author
	});
});

app.post('/add', function (req, res) {
	if (req.session.myTasks)
		myTasks = req.session.myTasks;
	var body = '';
	var author = req.session.author;
	var sessionID = req.session.sessionID;
	req.on('data', function (data) {
		body += data;
		// Too much data -> destroy the connection
		if (body.length > 1e3)
			req.connection.destroy();
	});
	req.on('end', function() {
		var taskName = qs.parse(body)['taskName'];
		console.log('put: ' + taskName);
		db.run("INSERT INTO taskList(sessionID, taskName, me) VALUES ('" + sessionID + "', '" + taskName + "', '" + author + "');");
		res.send('successful');
	});
});

app.delete('/del?id=:id', function (req, res) {
	console.log('delete: '+id);
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