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

var winner = function(g) {
	//rows
	if (g[0][0] + g[0][1] + g[0][2] === 3) { return true; } 
	if (g[1][0] + g[1][1] + g[1][2] === 3) { return true; } 
	if (g[2][0] + g[2][1] + g[2][2] === 3) { return true; } 
	//cols
	if (g[0][0] + g[1][0] + g[2][0] === 3) { return true; } 
	if (g[0][1] + g[1][1] + g[2][1] === 3) { return true; } 
	if (g[0][2] + g[1][2] + g[2][2] === 3) { return true; } 
	//diagonal
	if (g[0][0] + g[1][1] + g[2][2] === 3) { return true; }
	if (g[2][0] + g[1][1] + g[0][2] === 3) { return true; }
	return false;
};

app.use(express.static(__dirname + '/compiled/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/boardstate', function(req, res, next) {
	if (games[req.cookies.game]) {
		res.json(games[req.cookies.game]);
	} else {
		res.end('Game not Found!')
	}
});

app.post('/creategame', function(req, res, next) {
	games[req.body.name] = {};
	games[req.body.name].game =
	[
	 [0, 0, 0],
	 [0, 0, 0],
	 [0, 0, 0]
	];
	games[req.body.name].turn = '1'
	res.cookie('game', req.body.name);
	res.cookie('player', 1);
	res.end('Game Created');
});

app.post('/joingame', function(req, res, next) {
	res.cookie('game', req.body.name);
	res.cookie('player', 2);
	res.end('Game Joined');
});

app.post('/move', function(req, res, next) {
	if (req.cookies.player === games[req.cookies.game].turn) {
		games[req.cookies.game].turn = games[req.cookies.game].turn === '1' ? '2' : '1';
		games[req.cookies.game].game[req.body.row][req.body.col] = 1
		if (winner(games[req.cookies.game].game)) {
			games[req.cookies.game].game.forEach(function(row) {
				for (var i = 0; i < row.length; i++) {
					row[i] = req.cookies.player === '1' ? 'p2' : 'p1';
				}
			});
		}
	}
	res.json(games[req.cookies.game]);
});


module.exports = app;