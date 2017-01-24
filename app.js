var express = require('express');
var cors = require('cors');
var path = require('path');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json());

var games = {};

app.use(express.static(__dirname + '/compiled/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/boardstate', function(req, res, next) {
	res.json(games[req.cookies.game]);
});

app.post('/creategame', function(req, res, next) {
	games[req.body.name] = 
	[
	 [0, 0, 0],
	 [0, 0, 0],
	 [0, 0, 0]
	];
	res.cookie('game', req.body.name);
	res.json('Game Created');
});

app.post('/joingame', function(req, res, next) {
	res.cookie('game', req.body.name);
	res.end('Game Joined');
});

app.post('/move', function(req, res, next) {
	games[req.cookies.game][req.body.row][req.body.col] = 1
	res.json(games[req.cookies.game]);
});


module.exports = app;