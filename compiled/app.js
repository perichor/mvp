'use strict';

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

var winner = function winner(g) {
	//rows
	if (g[0][0] + g[0][1] + g[0][2] === 3) {
		return true;
	}
	if (g[1][0] + g[1][1] + g[1][2] === 3) {
		return true;
	}
	if (g[2][0] + g[2][1] + g[2][2] === 3) {
		return true;
	}
	//cols
	if (g[0][0] + g[1][0] + g[2][0] === 3) {
		return true;
	}
	if (g[0][1] + g[1][1] + g[2][1] === 3) {
		return true;
	}
	if (g[0][2] + g[1][2] + g[2][2] === 3) {
		return true;
	}
	//diagonal
	if (g[0][0] + g[1][1] + g[2][2] === 3) {
		return true;
	}
	if (g[2][0] + g[1][1] + g[0][2] === 3) {
		return true;
	}
	return false;
};

app.use(express.static(__dirname + '/compiled/public'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/boardstate', function (req, res, next) {
	if (games[req.cookies.game]) {
		res.json(games[req.cookies.game]);
	} else {
		res.end('Game not Found!');
	}
});

app.post('/creategame', function (req, res, next) {
	games[req.body.name] = {};
	games[req.body.name].game = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
	games[req.body.name].turn = '1';
	res.cookie('game', req.body.name);
	res.cookie('player', 1);
	res.end('Game Created');
});

app.post('/joingame', function (req, res, next) {
	res.cookie('game', req.body.name);
	res.cookie('player', 2);
	res.end('Game Joined');
});

app.post('/move', function (req, res, next) {
	if (req.cookies.player === games[req.cookies.game].turn) {
		games[req.cookies.game].turn = games[req.cookies.game].turn === '1' ? '2' : '1';
		games[req.cookies.game].game[req.body.row][req.body.col] = 1;
		if (winner(games[req.cookies.game].game)) {
			games[req.cookies.game].game.forEach(function (row) {
				for (var i = 0; i < row.length; i++) {
					row[i] = req.cookies.player === '1' ? 'p2' : 'p1';
				}
			});
		}
	}
	res.json(games[req.cookies.game]);
});

module.exports = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC5qcyJdLCJuYW1lcyI6WyJleHByZXNzIiwicmVxdWlyZSIsImNvcnMiLCJwYXRoIiwiY29va2llUGFyc2VyIiwiYm9keVBhcnNlciIsImFwcCIsInVzZSIsImpzb24iLCJnYW1lcyIsIndpbm5lciIsImciLCJzdGF0aWMiLCJfX2Rpcm5hbWUiLCJnZXQiLCJyZXEiLCJyZXMiLCJzZW5kRmlsZSIsImpvaW4iLCJuZXh0IiwiY29va2llcyIsImdhbWUiLCJlbmQiLCJwb3N0IiwiYm9keSIsIm5hbWUiLCJ0dXJuIiwiY29va2llIiwicGxheWVyIiwicm93IiwiY29sIiwiZm9yRWFjaCIsImkiLCJsZW5ndGgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFVBQVVDLFFBQVEsU0FBUixDQUFkO0FBQ0EsSUFBSUMsT0FBT0QsUUFBUSxNQUFSLENBQVg7QUFDQSxJQUFJRSxPQUFPRixRQUFRLE1BQVIsQ0FBWDs7QUFFQSxJQUFJRyxlQUFlSCxRQUFRLGVBQVIsQ0FBbkI7QUFDQSxJQUFJSSxhQUFhSixRQUFRLGFBQVIsQ0FBakI7O0FBRUEsSUFBSUssTUFBTU4sU0FBVjtBQUNBTSxJQUFJQyxHQUFKLENBQVFMLE1BQVI7O0FBRUFJLElBQUlDLEdBQUosQ0FBUUgsY0FBUjtBQUNBRSxJQUFJQyxHQUFKLENBQVFGLFdBQVdHLElBQVgsRUFBUjs7QUFFQSxJQUFJQyxRQUFRLEVBQVo7O0FBRUEsSUFBSUMsU0FBUyxTQUFUQSxNQUFTLENBQVNDLENBQVQsRUFBWTtBQUN4QjtBQUNBLEtBQUlBLEVBQUUsQ0FBRixFQUFLLENBQUwsSUFBVUEsRUFBRSxDQUFGLEVBQUssQ0FBTCxDQUFWLEdBQW9CQSxFQUFFLENBQUYsRUFBSyxDQUFMLENBQXBCLEtBQWdDLENBQXBDLEVBQXVDO0FBQUUsU0FBTyxJQUFQO0FBQWM7QUFDdkQsS0FBSUEsRUFBRSxDQUFGLEVBQUssQ0FBTCxJQUFVQSxFQUFFLENBQUYsRUFBSyxDQUFMLENBQVYs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O0FBQ3BDSCxTQUFJRyxDQUFKLElBQVNqQixJQUFJSyxPQUFKLENBQVlRLE1BQVosS0FBdUIsR0FBdkIsR0FBNkIsSUFBN0IsR0FBb0MsSUFBN0M7QUFDQTtBQUNELElBSkQ7QUFLQTtBQUNEO0FBQ0RaLEtBQUlSLElBQUosQ0FBU0MsTUFBTU0sSUFBSUssT0FBSixDQUFZQyxJQUFsQixDQUFUO0FBQ0EsQ0FiRDs7QUFnQkFhLE9BQU9DLE9BQVAsR0FBaUI3QixHQUFqQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbnZhciBjb3JzID0gcmVxdWlyZSgnY29ycycpO1xudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbnZhciBjb29raWVQYXJzZXIgPSByZXF1aXJlKCdjb29raWUtcGFyc2VyJyk7XG52YXIgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJyk7XG5cbnZhciBhcHAgPSBleHByZXNzKCk7XG5hcHAudXNlKGNvcnMoKSk7XG5cbmFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5cbnZhciBnYW1lcyA9IHt9O1xuXG52YXIgd2lubmVyID0gZnVuY3Rpb24oZykge1xuXHQvL3Jvd3Ncblx0aWYgKGdbMF1bMF0gKyBnWzBdWzFdICsgZ1swXVsyXSA9PT0gMykgeyByZXR1cm4gdHJ1ZTsgfSBcblx0aWYgKGdbMV1bMF0gKyBnWzFdWzFdICsgZ1sxXVsyXSA9PT0gMykgeyByZXR1cm4gdHJ1ZTsgfSBcblx0aWYgKGdbMl1bMF0gKyBnWzJdWzFdICsgZ1syXVsyXSA9PT0gMykgeyByZXR1cm4gdHJ1ZTsgfSBcblx0Ly9jb2xzXG5cdGlmIChnWzBdWzBdICsgZ1sxXVswXSArIGdbMl1bMF0gPT09IDMpIHsgcmV0dXJuIHRydWU7IH0gXG5cdGlmIChnWzBdWzFdICsgZ1sxXVsxXSArIGdbMl1bMV0gPT09IDMpIHsgcmV0dXJuIHRydWU7IH0gXG5cdGlmIChnWzBdWzJdICsgZ1sxXVsyXSArIGdbMl1bMl0gPT09IDMpIHsgcmV0dXJuIHRydWU7IH0gXG5cdC8vZGlhZ29uYWxcblx0aWYgKGdbMF1bMF0gKyBnWzFdWzFdICsgZ1syXVsyXSA9PT0gMykgeyByZXR1cm4gdHJ1ZTsgfVxuXHRpZiAoZ1syXVswXSArIGdbMV1bMV0gKyBnWzBdWzJdID09PSAzKSB7IHJldHVybiB0cnVlOyB9XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoX19kaXJuYW1lICsgJy9jb21waWxlZC9wdWJsaWMnKSk7XG5cbmFwcC5nZXQoJy8nLCBmdW5jdGlvbihyZXEsIHJlcykge1xuICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgJy9pbmRleC5odG1sJykpO1xufSk7XG5cbmFwcC5nZXQoJy9ib2FyZHN0YXRlJywgZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcblx0aWYgKGdhbWVzW3JlcS5jb29raWVzLmdhbWVdKSB7XG5cdFx0cmVzLmpzb24oZ2FtZXNbcmVxLmNvb2tpZXMuZ2FtZV0pO1xuXHR9IGVsc2Uge1xuXHRcdHJlcy5lbmQoJ0dhbWUgbm90IEZvdW5kIScpXG5cdH1cbn0pO1xuXG5hcHAucG9zdCgnL2NyZWF0ZWdhbWUnLCBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuXHRnYW1lc1tyZXEuYm9keS5uYW1lXSA9IHt9O1xuXHRnYW1lc1tyZXEuYm9keS5uYW1lXS5nYW1lID1cblx0W1xuXHQgWzAsIDAsIDBdLFxuXHQgWzAsIDAsIDBdLFxuXHQgWzAsIDAsIDBdXG5cdF07XG5cdGdhbWVzW3JlcS5ib2R5Lm5hbWVdLnR1cm4gPSAnMSdcblx0cmVzLmNvb2tpZSgnZ2FtZScsIHJlcS5ib2R5Lm5hbWUpO1xuXHRyZXMuY29va2llKCdwbGF5ZXInLCAxKTtcblx0cmVzLmVuZCgnR2FtZSBDcmVhdGVkJyk7XG59KTtcblxuYXBwLnBvc3QoJy9qb2luZ2FtZScsIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG5cdHJlcy5jb29raWUoJ2dhbWUnLCByZXEuYm9keS5uYW1lKTtcblx0cmVzLmNvb2tpZSgncGxheWVyJywgMik7XG5cdHJlcy5lbmQoJ0dhbWUgSm9pbmVkJyk7XG59KTtcblxuYXBwLnBvc3QoJy9tb3ZlJywgZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcblx0aWYgKHJlcS5jb29raWVzLnBsYXllciA9PT0gZ2FtZXNbcmVxLmNvb2tpZXMuZ2FtZV0udHVybikge1xuXHRcdGdhbWVzW3JlcS5jb29raWVzLmdhbWVdLnR1cm4gPSBnYW1lc1tyZXEuY29va2llcy5nYW1lXS50dXJuID09PSAnMScgPyAnMicgOiAnMSc7XG5cdFx0Z2FtZXNbcmVxLmNvb2tpZXMuZ2FtZV0uZ2FtZVtyZXEuYm9keS5yb3ddW3JlcS5ib2R5LmNvbF0gPSAxXG5cdFx0aWYgKHdpbm5lcihnYW1lc1tyZXEuY29va2llcy5nYW1lXS5nYW1lKSkge1xuXHRcdFx0Z2FtZXNbcmVxLmNvb2tpZXMuZ2FtZV0uZ2FtZS5mb3JFYWNoKGZ1bmN0aW9uKHJvdykge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJvdy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHJvd1tpXSA9IHJlcS5jb29raWVzLnBsYXllciA9PT0gJzEnID8gJ3AyJyA6ICdwMSc7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXHRyZXMuanNvbihnYW1lc1tyZXEuY29va2llcy5nYW1lXSk7XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcDsiXX0=