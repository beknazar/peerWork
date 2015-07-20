var express = require ('express');
var stormpath = require ('express-stormpath');

var app = express();

app.use("/assets", express.static(__dirname + '/assets'));

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	res.render('home', {
		title: 'peerWork',
		description: 'increase your productivity by working peer to peer'
	});
});

app.listen(3000);