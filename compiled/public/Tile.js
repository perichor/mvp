"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tile = function (_React$Component) {
	_inherits(Tile, _React$Component);

	function Tile(props) {
		_classCallCheck(this, Tile);

		var _this = _possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).call(this, props));

		_this.state = {
			clicked: false
		};
		return _this;
	}

	_createClass(Tile, [{
		key: "clicked",
		value: function clicked() {
			this.props.handleClick(this.props.row, this.props.col);
		}
	}, {
		key: "render",
		value: function render() {
			if (this.props.toggle === 1) {
				return React.createElement("div", { className: "tile placed", onClick: this.clicked.bind(this) });
			} else if (this.props.toggle === 0) {
				return React.createElement("div", { className: "tile unplaced", onClick: this.clicked.bind(this) });
			} else if (this.props.toggle === 'p1') {
				if (this.props.player === '1') {
					return React.createElement(
						"div",
						{ className: "tile winner" },
						React.createElement(
							"div",
							{ className: "lose" },
							"You Lose!"
						)
					);
				}
				if (this.props.player === '2') {
					return React.createElement(
						"div",
						{ className: "tile loser" },
						React.createElement(
							"div",
							{ className: "win" },
							"You Win!"
						)
					);
				}
			} else if (this.props.toggle === 'p2') {
				if (this.props.player === '2') {
					return React.createElement(
						"div",
						{ className: "tile winner" },
						React.createElement(
							"div",
							{ className: "win" },
							"You Win!"
						)
					);
				}
				if (this.props.player === '1') {
					return React.createElement(
						"div",
						{ className: "tile loser" },
						React.createElement(
							"div",
							{ className: "lose" },
							"You Lose!"
						)
					);
				}
			}
		}
	}]);

	return Tile;
}(React.Component);

;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpYy9UaWxlLmpzeCJdLCJuYW1lcyI6WyJUaWxlIiwicHJvcHMiLCJzdGF0ZSIsImNsaWNrZWQiLCJoYW5kbGVDbGljayIsInJvdyIsImNvbCIsInRvZ2dsZSIsImJpbmQiLCJwbGF5ZXIiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUVNQSxJOzs7QUFDTCxlQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMEdBQ1pBLEtBRFk7O0FBRWxCLFFBQUtDLEtBQUwsR0FBYTtBQUNaQyxZQUFTO0FBREcsR0FBYjtBQUZrQjtBQUtsQjs7Ozs0QkFFUztBQUNULFFBQUtGLEtBQUwsQ0FBV0csV0FBWCxDQUF1QixLQUFLSCxLQUFMLENBQVdJLEdBQWxDLEVBQXVDLEtBQUtKLEtBQUwsQ0FBV0ssR0FBbEQ7QUFDQTs7OzJCQUVRO0FBQ1IsT0FBSSxLQUFLTCxLQUFMLENBQVdNLE1BQVgsS0FBc0IsQ0FBMUIsRUFBNkI7QUFDNUIsV0FDQyw2QkFBSyxXQUFVLGFBQWYsRUFBNkIsU0FBUyxLQUFLSixPQUFMLENBQWFLLElBQWIsQ0FBa0IsSUFBbEIsQ0FBdEMsR0FERDtBQUdBLElBSkQsTUFJTyxJQUFJLEtBQUtQLEtBQUwsQ0FBV00sTUFBWCxLQUFzQixDQUExQixFQUE2QjtBQUNuQyxXQUNDLDZCQUFLLFdBQVUsZUFBZixFQUErQixTQUFTLEtBQUtKLE9BQUwsQ0FBYUssSUFBYixDQUFrQixJQUFsQixDQUF4QyxHQUREO0FBR0EsSUFKTSxNQUlBLElBQUksS0FBS1AsS0FBTCxDQUFXTSxNQUFYLEtBQXNCLElBQTFCLEVBQWdDO0FBQ3RDLFFBQUksS0FBS04sS0FBTCxDQUFXUSxNQUFYLEtBQXNCLEdBQTFCLEVBQStCO0FBQzlCLFlBQ0M7QUFBQTtBQUFBLFFBQUssV0FBVSxhQUFmO0FBQTZCO0FBQUE7QUFBQSxTQUFLLFdBQVUsTUFBZjtBQUFBO0FBQUE7QUFBN0IsTUFERDtBQUdBO0FBQ0QsUUFBSSxLQUFLUixLQUFMLENBQVdRLE1BQVgsS0FBc0IsR0FBMUIsRUFBK0I7QUFDOUIsWUFDQztBQUFBO0FBQUEsUUFBSyxXQUFVLFlBQWY7QUFBNEI7QUFBQTtBQUFBLFNBQUssV0FBVSxLQUFmO0FBQUE7QUFBQTtBQUE1QixNQUREO0FBR0E7QUFDRCxJQVhNLE1BV0EsSUFBSSxLQUFLUixLQUFMLENBQVdNLE1BQVgsS0FBc0IsSUFBMUIsRUFBZ0M7QUFDdEMsUUFBSSxLQUFLTixLQUFMLENBQVdRLE1BQVgsS0FBc0IsR0FBMUIsRUFBK0I7QUFDOUIsWUFDQztBQUFBO0FBQUEsUUFBSyxXQUFVLGFBQWY7QUFBNkI7QUFBQTtBQUFBLFNBQUssV0FBVSxLQUFmO0FBQUE7QUFBQTtBQUE3QixNQUREO0FBR0E7QUFDRCxRQUFJLEtBQUtSLEtBQUwsQ0FBV1EsTUFBWCxLQUFzQixHQUExQixFQUErQjtBQUM5QixZQUNDO0FBQUE7QUFBQSxRQUFLLFdBQVUsWUFBZjtBQUE0QjtBQUFBO0FBQUEsU0FBSyxXQUFVLE1BQWY7QUFBQTtBQUFBO0FBQTVCLE1BREQ7QUFHQTtBQUNEO0FBQ0Q7Ozs7RUE1Q2lCQyxNQUFNQyxTOztBQTZDeEIiLCJmaWxlIjoiVGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5jbGFzcyBUaWxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGNsaWNrZWQ6IGZhbHNlXG5cdFx0fVxuXHR9XG5cblx0Y2xpY2tlZCgpIHtcblx0XHR0aGlzLnByb3BzLmhhbmRsZUNsaWNrKHRoaXMucHJvcHMucm93LCB0aGlzLnByb3BzLmNvbCk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMudG9nZ2xlID09PSAxKSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRpbGUgcGxhY2VkXCIgb25DbGljaz17dGhpcy5jbGlja2VkLmJpbmQodGhpcyl9PjwvZGl2PlxuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMudG9nZ2xlID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRpbGUgdW5wbGFjZWRcIiBvbkNsaWNrPXt0aGlzLmNsaWNrZWQuYmluZCh0aGlzKX0+PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5wcm9wcy50b2dnbGUgPT09ICdwMScpIHtcblx0XHRcdGlmICh0aGlzLnByb3BzLnBsYXllciA9PT0gJzEnKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ0aWxlIHdpbm5lclwiPjxkaXYgY2xhc3NOYW1lPVwibG9zZVwiPllvdSBMb3NlITwvZGl2PjwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMucHJvcHMucGxheWVyID09PSAnMicpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRpbGUgbG9zZXJcIj48ZGl2IGNsYXNzTmFtZT1cIndpblwiPllvdSBXaW4hPC9kaXY+PC9kaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0aGlzLnByb3BzLnRvZ2dsZSA9PT0gJ3AyJykge1xuXHRcdFx0aWYgKHRoaXMucHJvcHMucGxheWVyID09PSAnMicpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRpbGUgd2lubmVyXCI+PGRpdiBjbGFzc05hbWU9XCJ3aW5cIj5Zb3UgV2luITwvZGl2PjwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMucHJvcHMucGxheWVyID09PSAnMScpIHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRpbGUgbG9zZXJcIj48ZGl2IGNsYXNzTmFtZT1cImxvc2VcIj5Zb3UgTG9zZSE8L2Rpdj48L2Rpdj5cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07Il19