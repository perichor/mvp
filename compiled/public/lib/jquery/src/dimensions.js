"use strict";

define(["./core", "./core/access", "./css"], function (jQuery, access) {

	"use strict";

	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods

	jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
		jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function (margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
				    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

				return access(this, function (elem, type, value) {
					var doc;

					if (jQuery.isWindow(elem)) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
					}

					// Get document width or height
					if (elem.nodeType === 9) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
					}

					return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css(elem, type, extra) :

					// Set width or height on the element
					jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable);
			};
		});
	});

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9kaW1lbnNpb25zLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsImpRdWVyeSIsImFjY2VzcyIsImVhY2giLCJIZWlnaHQiLCJXaWR0aCIsIm5hbWUiLCJ0eXBlIiwicGFkZGluZyIsImNvbnRlbnQiLCJkZWZhdWx0RXh0cmEiLCJmdW5jTmFtZSIsImZuIiwibWFyZ2luIiwidmFsdWUiLCJjaGFpbmFibGUiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJleHRyYSIsImVsZW0iLCJkb2MiLCJpc1dpbmRvdyIsImluZGV4T2YiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsIm5vZGVUeXBlIiwiTWF0aCIsIm1heCIsImJvZHkiLCJ1bmRlZmluZWQiLCJjc3MiLCJzdHlsZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsT0FBUSxDQUNQLFFBRE8sRUFFUCxlQUZPLEVBR1AsT0FITyxDQUFSLEVBSUcsVUFBVUMsTUFBVixFQUFrQkMsTUFBbEIsRUFBMkI7O0FBRTlCOztBQUVBOztBQUNBRCxRQUFPRSxJQUFQLENBQWEsRUFBRUMsUUFBUSxRQUFWLEVBQW9CQyxPQUFPLE9BQTNCLEVBQWIsRUFBbUQsVUFBVUMsSUFBVixFQUFnQkMsSUFBaEIsRUFBdUI7QUFDekVOLFNBQU9FLElBQVAsQ0FBYSxFQUFFSyxTQUFTLFVBQVVGLElBQXJCLEVBQTJCRyxTQUFTRixJQUFwQyxFQUEwQyxJQUFJLFVBQVVELElBQXhELEVBQWIsRUFDQyxVQUFVSSxZQUFWLEVBQXdCQyxRQUF4QixFQUFtQzs7QUFFbkM7QUFDQVYsVUFBT1csRUFBUCxDQUFXRCxRQUFYLElBQXdCLFVBQVVFLE1BQVYsRUFBa0JDLEtBQWxCLEVBQTBCO0FBQ2pELFFBQUlDLFlBQVlDLFVBQVVDLE1BQVYsS0FBc0JQLGdCQUFnQixPQUFPRyxNQUFQLEtBQWtCLFNBQXhELENBQWhCO0FBQUEsUUFDQ0ssUUFBUVIsaUJBQWtCRyxXQUFXLElBQVgsSUFBbUJDLFVBQVUsSUFBN0IsR0FBb0MsUUFBcEMsR0FBK0MsUUFBakUsQ0FEVDs7QUFHQSxXQUFPWixPQUFRLElBQVIsRUFBYyxVQUFVaUIsSUFBVixFQUFnQlosSUFBaEIsRUFBc0JPLEtBQXRCLEVBQThCO0FBQ2xELFNBQUlNLEdBQUo7O0FBRUEsU0FBS25CLE9BQU9vQixRQUFQLENBQWlCRixJQUFqQixDQUFMLEVBQStCOztBQUU5QjtBQUNBLGFBQU9SLFNBQVNXLE9BQVQsQ0FBa0IsT0FBbEIsTUFBZ0MsQ0FBaEMsR0FDTkgsS0FBTSxVQUFVYixJQUFoQixDQURNLEdBRU5hLEtBQUtJLFFBQUwsQ0FBY0MsZUFBZCxDQUErQixXQUFXbEIsSUFBMUMsQ0FGRDtBQUdBOztBQUVEO0FBQ0EsU0FBS2EsS0FBS00sUUFBTCxLQUFrQixDQUF2QixFQUEyQjtBQUMxQkwsWUFBTUQsS0FBS0ssZUFBWDs7QUFFQTtBQUNBO0FBQ0EsYUFBT0UsS0FBS0MsR0FBTCxDQUNOUixLQUFLUyxJQUFMLENBQVcsV0FBV3RCLElBQXRCLENBRE0sRUFDd0JjLElBQUssV0FBV2QsSUFBaEIsQ0FEeEIsRUFFTmEsS0FBS1MsSUFBTCxDQUFXLFdBQVd0QixJQUF0QixDQUZNLEVBRXdCYyxJQUFLLFdBQVdkLElBQWhCLENBRnhCLEVBR05jLElBQUssV0FBV2QsSUFBaEIsQ0FITSxDQUFQO0FBS0E7O0FBRUQsWUFBT1EsVUFBVWUsU0FBVjs7QUFFTjtBQUNBNUIsWUFBTzZCLEdBQVAsQ0FBWVgsSUFBWixFQUFrQlosSUFBbEIsRUFBd0JXLEtBQXhCLENBSE07O0FBS047QUFDQWpCLFlBQU84QixLQUFQLENBQWNaLElBQWQsRUFBb0JaLElBQXBCLEVBQTBCTyxLQUExQixFQUFpQ0ksS0FBakMsQ0FORDtBQU9BLEtBL0JNLEVBK0JKWCxJQS9CSSxFQStCRVEsWUFBWUYsTUFBWixHQUFxQmdCLFNBL0J2QixFQStCa0NkLFNBL0JsQyxDQUFQO0FBZ0NBLElBcENEO0FBcUNBLEdBekNEO0FBMENBLEVBM0NEOztBQTZDQSxRQUFPZCxNQUFQO0FBQ0MsQ0F2REQiLCJmaWxlIjoiZGltZW5zaW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZSggW1xuXHRcIi4vY29yZVwiLFxuXHRcIi4vY29yZS9hY2Nlc3NcIixcblx0XCIuL2Nzc1wiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCBhY2Nlc3MgKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBDcmVhdGUgaW5uZXJIZWlnaHQsIGlubmVyV2lkdGgsIGhlaWdodCwgd2lkdGgsIG91dGVySGVpZ2h0IGFuZCBvdXRlcldpZHRoIG1ldGhvZHNcbmpRdWVyeS5lYWNoKCB7IEhlaWdodDogXCJoZWlnaHRcIiwgV2lkdGg6IFwid2lkdGhcIiB9LCBmdW5jdGlvbiggbmFtZSwgdHlwZSApIHtcblx0alF1ZXJ5LmVhY2goIHsgcGFkZGluZzogXCJpbm5lclwiICsgbmFtZSwgY29udGVudDogdHlwZSwgXCJcIjogXCJvdXRlclwiICsgbmFtZSB9LFxuXHRcdGZ1bmN0aW9uKCBkZWZhdWx0RXh0cmEsIGZ1bmNOYW1lICkge1xuXG5cdFx0Ly8gTWFyZ2luIGlzIG9ubHkgZm9yIG91dGVySGVpZ2h0LCBvdXRlcldpZHRoXG5cdFx0alF1ZXJ5LmZuWyBmdW5jTmFtZSBdID0gZnVuY3Rpb24oIG1hcmdpbiwgdmFsdWUgKSB7XG5cdFx0XHR2YXIgY2hhaW5hYmxlID0gYXJndW1lbnRzLmxlbmd0aCAmJiAoIGRlZmF1bHRFeHRyYSB8fCB0eXBlb2YgbWFyZ2luICE9PSBcImJvb2xlYW5cIiApLFxuXHRcdFx0XHRleHRyYSA9IGRlZmF1bHRFeHRyYSB8fCAoIG1hcmdpbiA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gdHJ1ZSA/IFwibWFyZ2luXCIgOiBcImJvcmRlclwiICk7XG5cblx0XHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCB2YWx1ZSApIHtcblx0XHRcdFx0dmFyIGRvYztcblxuXHRcdFx0XHRpZiAoIGpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuXG5cdFx0XHRcdFx0Ly8gJCggd2luZG93ICkub3V0ZXJXaWR0aC9IZWlnaHQgcmV0dXJuIHcvaCBpbmNsdWRpbmcgc2Nyb2xsYmFycyAoZ2gtMTcyOSlcblx0XHRcdFx0XHRyZXR1cm4gZnVuY05hbWUuaW5kZXhPZiggXCJvdXRlclwiICkgPT09IDAgP1xuXHRcdFx0XHRcdFx0ZWxlbVsgXCJpbm5lclwiICsgbmFtZSBdIDpcblx0XHRcdFx0XHRcdGVsZW0uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50WyBcImNsaWVudFwiICsgbmFtZSBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gR2V0IGRvY3VtZW50IHdpZHRoIG9yIGhlaWdodFxuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdFx0ZG9jID0gZWxlbS5kb2N1bWVudEVsZW1lbnQ7XG5cblx0XHRcdFx0XHQvLyBFaXRoZXIgc2Nyb2xsW1dpZHRoL0hlaWdodF0gb3Igb2Zmc2V0W1dpZHRoL0hlaWdodF0gb3IgY2xpZW50W1dpZHRoL0hlaWdodF0sXG5cdFx0XHRcdFx0Ly8gd2hpY2hldmVyIGlzIGdyZWF0ZXN0XG5cdFx0XHRcdFx0cmV0dXJuIE1hdGgubWF4KFxuXHRcdFx0XHRcdFx0ZWxlbS5ib2R5WyBcInNjcm9sbFwiICsgbmFtZSBdLCBkb2NbIFwic2Nyb2xsXCIgKyBuYW1lIF0sXG5cdFx0XHRcdFx0XHRlbGVtLmJvZHlbIFwib2Zmc2V0XCIgKyBuYW1lIF0sIGRvY1sgXCJvZmZzZXRcIiArIG5hbWUgXSxcblx0XHRcdFx0XHRcdGRvY1sgXCJjbGllbnRcIiArIG5hbWUgXVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/XG5cblx0XHRcdFx0XHQvLyBHZXQgd2lkdGggb3IgaGVpZ2h0IG9uIHRoZSBlbGVtZW50LCByZXF1ZXN0aW5nIGJ1dCBub3QgZm9yY2luZyBwYXJzZUZsb2F0XG5cdFx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgdHlwZSwgZXh0cmEgKSA6XG5cblx0XHRcdFx0XHQvLyBTZXQgd2lkdGggb3IgaGVpZ2h0IG9uIHRoZSBlbGVtZW50XG5cdFx0XHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCB0eXBlLCB2YWx1ZSwgZXh0cmEgKTtcblx0XHRcdH0sIHR5cGUsIGNoYWluYWJsZSA/IG1hcmdpbiA6IHVuZGVmaW5lZCwgY2hhaW5hYmxlICk7XG5cdFx0fTtcblx0fSApO1xufSApO1xuXG5yZXR1cm4galF1ZXJ5O1xufSApO1xuIl19