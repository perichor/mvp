var express = require('express');
var cors = require('cors');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json());

var games = {};

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/creategame', function(req, res, next) {
	games[req.body.name] = 
	[
	 [0, 0, 0],
	 [0, 0, 0],
	 [0, 0, 0]
	];
	res.cookie('game', req.body.name, {path: '/move'});
	res.json({'Game Created': true});
});

app.post('/joingame', function(req, res, next) {
	res.cookie('game', req.body.name);
	res.end('Game Joined');
});

app.post('/move', function(req, res, next) {
	console.log(req.body);
	console.log(req.cookies);
	console.log('games: ', games)
	games['testgame'][req.body.row][req.body.col] = 1
	res.json(games['testgame']);
});


module.exports = app;