"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Join = function (_React$Component) {
	_inherits(Join, _React$Component);

	function Join(props) {
		_classCallCheck(this, Join);

		return _possibleConstructorReturn(this, (Join.__proto__ || Object.getPrototypeOf(Join)).call(this, props));
	}

	_createClass(Join, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement("input", { type: "text", value: this.props.gameName, onChange: this.props.setGameName }),
				React.createElement(
					"h3",
					null,
					"Create Game"
				),
				React.createElement(
					"button",
					{ onClick: this.props.create },
					"Create"
				),
				React.createElement(
					"h3",
					null,
					"Join Game"
				),
				React.createElement(
					"button",
					{ onClick: this.props.join },
					"Join"
				)
			);
		}
	}]);

	return Join;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpYy9Kb2luLmpzeCJdLCJuYW1lcyI6WyJKb2luIiwicHJvcHMiLCJnYW1lTmFtZSIsInNldEdhbWVOYW1lIiwiY3JlYXRlIiwiam9pbiIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBRU1BLEk7OztBQUNMLGVBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxxR0FDWkEsS0FEWTtBQUVsQjs7OzsyQkFFUTtBQUNSLFVBQ0M7QUFBQTtBQUFBO0FBQ0MsbUNBQU8sTUFBSyxNQUFaLEVBQW1CLE9BQU8sS0FBS0EsS0FBTCxDQUFXQyxRQUFyQyxFQUErQyxVQUFVLEtBQUtELEtBQUwsQ0FBV0UsV0FBcEUsR0FERDtBQUVDO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGRDtBQUdDO0FBQUE7QUFBQSxPQUFRLFNBQVMsS0FBS0YsS0FBTCxDQUFXRyxNQUE1QjtBQUFBO0FBQUEsS0FIRDtBQUlDO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FKRDtBQUtDO0FBQUE7QUFBQSxPQUFRLFNBQVMsS0FBS0gsS0FBTCxDQUFXSSxJQUE1QjtBQUFBO0FBQUE7QUFMRCxJQUREO0FBU0E7Ozs7RUFmaUJDLE1BQU1DLFMiLCJmaWxlIjoiSm9pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5jbGFzcyBKb2luIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnByb3BzLmdhbWVOYW1lfSBvbkNoYW5nZT17dGhpcy5wcm9wcy5zZXRHYW1lTmFtZX0+PC9pbnB1dD5cblx0XHRcdFx0PGgzPkNyZWF0ZSBHYW1lPC9oMz5cblx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLmNyZWF0ZX0+Q3JlYXRlPC9idXR0b24+XG5cdFx0XHRcdDxoMz5Kb2luIEdhbWU8L2gzPlxuXHRcdFx0XHQ8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMuam9pbn0+Sm9pbjwvYnV0dG9uPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSJdfQ==