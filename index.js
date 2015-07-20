var express = require ('express'),
	redis = require('redis'),
	cookieParser = require('cookie-parser'),
	stormpath = require ('express-stormpath'),
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
	
	res.render('home', {
		title: 'peerWork',
		description: 'increase your productivity by working peer to peer',
		lastPage: req.session.lastPage
	});
	req.session.lastPage = 'home';
	// console.log(req.session.lastPage);
});

app.get('/tubular', function(req, res) {
  

  req.session.lastPage = '/tubular';
  if(req.session.lastPage) {
    res.write('Last page was: ' + req.session.lastPage + '. ');
  }
  res.write('Are you a surfer?');
  res.end();
});

app.get('/radical', function(req, res) {
  if(req.session.lastPage) {
    res.write('Last page was: ' + req.session.lastPage + '. ');
  }

  req.session.lastPage = '/radical';
  res.write('What a radical visit!');
  res.end();
});

// randomstring.generate(7);
// >> "xqm5wXX"

app.listen(3000);