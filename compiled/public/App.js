'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

		_this.state = {
			playing: false,
			boardScreen: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
			turn: '1',
			player: '0',
			gameName: ''
		};
		return _this;
	}

	_createClass(App, [{
		key: 'setGameName',
		value: function setGameName(e) {
			this.setState({ gameName: e.target.value });
		}
	}, {
		key: 'getBoardState',
		value: function getBoardState() {
			var context = this;
			$.ajax({
				url: 'http://localhost:3000/boardstate',
				type: 'GET',
				contentType: 'application/json',
				success: function success(data) {
					context.setState({ boardScreen: data.game, turn: data.turn });
				},
				error: function error(err) {
					console.error(err);
				}
			});
		}
	}, {
		key: 'move',
		value: function move(row, col) {
			var context = this;
			$.ajax({
				url: 'http://localhost:3000/move',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({ row: row, col: col }),
				success: function success(data) {
					context.getBoardState();
				},
				error: function error(err) {
					console.error(err);
				}
			});
		}
	}, {
		key: 'createGame',
		value: function createGame() {
			var context = this;
			$.ajax({
				url: 'http://localhost:3000/creategame',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({ 'name': context.state.gameName }),
				success: function success(data) {
					context.setState({ playing: true, player: '1' });
				},
				error: function error(err) {
					console.error(err);
				}
			});
		}
	}, {
		key: 'joinGame',
		value: function joinGame() {
			var context = this;
			$.ajax({
				url: 'http://localhost:3000/joingame',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({ 'name': context.state.gameName }),
				success: function success(data) {
					context.setState({ playing: true, player: '2' });
				},
				error: function error(err) {
					console.error(err);
				}
			});
		}
	}, {
		key: 'stopPlaying',
		value: function stopPlaying() {
			this.setState({ playing: false });
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.state.playing) {
				setInterval(this.getBoardState.bind(this), 5000);
				return React.createElement(Board, { handleClick: this.move.bind(this), boardState: this.state.boardScreen, turn: this.state.turn, player: this.state.player, stopPlaying: this.stopPlaying.bind(this) });
			} else {
				return React.createElement(Join, { create: this.createGame.bind(this), join: this.joinGame.bind(this), gameName: this.state.gameName, setGameName: this.setGameName.bind(this) });
			}
		}
	}]);

	return App;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpYy9BcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsInN0YXRlIiwicGxheWluZyIsImJvYXJkU2NyZWVuIiwidHVybiIsInBsYXllciIsImdhbWVOYW1lIiwiZSIsInNldFN0YXRlIiwidGFyZ2V0IiwidmFsdWUiLCJjb250ZXh0IiwiJCIsImFqYXgiLCJ1cmwiLCJ0eXBlIiwiY29udGVudFR5cGUiLCJzdWNjZXNzIiwiZGF0YSIsImdhbWUiLCJlcnJvciIsImVyciIsImNvbnNvbGUiLCJyb3ciLCJjb2wiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0Qm9hcmRTdGF0ZSIsInNldEludGVydmFsIiwiYmluZCIsIm1vdmUiLCJzdG9wUGxheWluZyIsImNyZWF0ZUdhbWUiLCJqb2luR2FtZSIsInNldEdhbWVOYW1lIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsRzs7O0FBQ0wsZ0JBQWM7QUFBQTs7QUFBQTs7QUFFYixRQUFLQyxLQUFMLEdBQWE7QUFDWkMsWUFBUyxLQURHO0FBRVpDLGdCQUNBLENBQ0EsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FEQSxFQUVBLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBRkEsRUFHQSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUhBLENBSFk7QUFRWkMsU0FBTSxHQVJNO0FBU1pDLFdBQVEsR0FUSTtBQVVaQyxhQUFVO0FBVkUsR0FBYjtBQUZhO0FBY2I7Ozs7OEJBRVdDLEMsRUFBRztBQUNkLFFBQUtDLFFBQUwsQ0FBYyxFQUFDRixVQUFVQyxFQUFFRSxNQUFGLENBQVNDLEtBQXBCLEVBQWQ7QUFDQTs7O2tDQUVlO0FBQ2YsT0FBSUMsVUFBVSxJQUFkO0FBQ0FDLEtBQUVDLElBQUYsQ0FBTztBQUNMQyxTQUFLLGtDQURBO0FBRUxDLFVBQU0sS0FGRDtBQUdMQyxpQkFBYSxrQkFIUjtBQUlMQyxhQUFTLGlCQUFVQyxJQUFWLEVB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QkwsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBdEgsR0FERDtBQUdBO0FBQ0Q7Ozs7RUFuR2dCTSxNQUFNQyxTIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdHBsYXlpbmc6IGZhbHNlLFxuXHRcdFx0Ym9hcmRTY3JlZW46IFxuXHRcdFx0W1xuXHRcdFx0WzAsIDAsIDBdLFxuXHRcdFx0WzAsIDAsIDBdLFxuXHRcdFx0WzAsIDAsIDBdXG5cdFx0XHRdLFxuXHRcdFx0dHVybjogJzEnLFxuXHRcdFx0cGxheWVyOiAnMCcsXG5cdFx0XHRnYW1lTmFtZTogJydcblx0XHR9XG5cdH1cblxuXHRzZXRHYW1lTmFtZShlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7Z2FtZU5hbWU6IGUudGFyZ2V0LnZhbHVlfSk7XG5cdH1cblxuXHRnZXRCb2FyZFN0YXRlKCkge1xuXHRcdHZhciBjb250ZXh0ID0gdGhpcztcblx0XHQkLmFqYXgoe1xuXHRcdCAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2JvYXJkc3RhdGUnLFxuXHRcdCAgdHlwZTogJ0dFVCcsXG5cdFx0ICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdCAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHQgIFx0Y29udGV4dC5zZXRTdGF0ZSh7Ym9hcmRTY3JlZW46IGRhdGEuZ2FtZSwgdHVybjogZGF0YS50dXJufSk7XG5cdFx0ICB9LFxuXHRcdCAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0ICB9XG5cdFx0fSk7XG5cdH1cblxuXHRtb3ZlKHJvdywgY29sKSB7XG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzO1xuXHRcdCQuYWpheCh7XG5cdFx0ICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvbW92ZScsXG5cdFx0ICB0eXBlOiAnUE9TVCcsXG5cdFx0ICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdCAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3Jvdzogcm93LCBjb2w6IGNvbH0pLFxuXHRcdCAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHQgIFx0Y29udGV4dC5nZXRCb2FyZFN0YXRlKCk7XG5cdFx0ICB9LFxuXHRcdCAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0ICB9XG5cdFx0fSk7XG5cdH1cblxuXHRjcmVhdGVHYW1lKCkge1xuXHRcdHZhciBjb250ZXh0ID0gdGhpcztcblx0XHQkLmFqYXgoe1xuXHRcdCAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2NyZWF0ZWdhbWUnLFxuXHRcdCAgdHlwZTogJ1BPU1QnLFxuXHRcdCAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0XHQgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsnbmFtZSc6IGNvbnRleHQuc3RhdGUuZ2FtZU5hbWV9KSxcblx0XHQgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0ICBcdGNvbnRleHQuc2V0U3RhdGUoe3BsYXlpbmc6IHRydWUsIHBsYXllcjogJzEnfSk7XG5cdFx0ICB9LFxuXHRcdCAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0ICB9XG5cdFx0fSk7XG5cdH1cblxuXHRqb2luR2FtZSgpIHtcblx0XHR2YXIgY29udGV4dCA9IHRoaXM7XG5cdFx0JC5hamF4KHtcblx0XHQgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9qb2luZ2FtZScsXG5cdFx0ICB0eXBlOiAnUE9TVCcsXG5cdFx0ICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdCAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyduYW1lJzogY29udGV4dC5zdGF0ZS5nYW1lTmFtZX0pLFxuXHRcdCAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHQgIFx0Y29udGV4dC5zZXRTdGF0ZSh7cGxheWluZzogdHJ1ZSwgcGxheWVyOiAnMid9KTtcblx0XHQgIH0sXG5cdFx0ICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHQgIH1cblx0XHR9KTtcblx0fVxuXG5cdHN0b3BQbGF5aW5nKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe3BsYXlpbmc6IGZhbHNlfSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUucGxheWluZykge1xuXHRcdFx0c2V0SW50ZXJ2YWwodGhpcy5nZXRCb2FyZFN0YXRlLmJpbmQodGhpcyksIDUwMDApO1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PEJvYXJkIGhhbmRsZUNsaWNrPXt0aGlzLm1vdmUuYmluZCh0aGlzKX0gYm9hcmRTdGF0ZT17dGhpcy5zdGF0ZS5ib2FyZFNjcmVlbn0gdHVybj17dGhpcy5zdGF0ZS50dXJufSBwbGF5ZXI9e3RoaXMuc3RhdGUucGxheWVyfSBzdG9wUGxheWluZz17dGhpcy5zdG9wUGxheWluZy5iaW5kKHRoaXMpfS8+XG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8Sm9pbiBjcmVhdGU9e3RoaXMuY3JlYXRlR2FtZS5iaW5kKHRoaXMpfSBqb2luPXt0aGlzLmpvaW5HYW1lLmJpbmQodGhpcyl9IGdhbWVOYW1lPXt0aGlzLnN0YXRlLmdhbWVOYW1lfSBzZXRHYW1lTmFtZT17dGhpcy5zZXRHYW1lTmFtZS5iaW5kKHRoaXMpfS8+XG5cdFx0XHQpO1xuXHRcdH1cblx0fVxufSJdfQ==