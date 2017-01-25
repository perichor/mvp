"use strict";

define(["../core"], function (jQuery, noGlobal) {

	"use strict";

	var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,


	// Map over the $ in case of overwrite
	_$ = window.$;

	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9leHBvcnRzL2dsb2JhbC5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCJqUXVlcnkiLCJub0dsb2JhbCIsIl9qUXVlcnkiLCJ3aW5kb3ciLCJfJCIsIiQiLCJub0NvbmZsaWN0IiwiZGVlcCJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsT0FBUSxDQUNQLFNBRE8sQ0FBUixFQUVHLFVBQVVDLE1BQVYsRUFBa0JDLFFBQWxCLEVBQTZCOztBQUVoQzs7QUFFQTs7QUFFQztBQUNBQyxXQUFVQyxPQUFPSCxNQUhsQjs7O0FBS0M7QUFDQUksTUFBS0QsT0FBT0UsQ0FOYjs7QUFRQUwsUUFBT00sVUFBUCxHQUFvQixVQUFVQyxJQUFWLEVBQWlCO0FBQ3BDLE1BQUtKLE9BQU9FLENBQVAsS0FBYUwsTUFBbEIsRUFBMkI7QUFDMUJHLFVBQU9FLENBQVAsR0FBV0QsRUFBWDtBQUNBOztBQUVELE1BQUtHLFFBQVFKLE9BQU9ILE1BQVAsS0FBa0JBLE1BQS9CLEVBQXdDO0FBQ3ZDRyxVQUFPSCxNQUFQLEdBQWdCRSxPQUFoQjtBQUNBOztBQUVELFNBQU9GLE1BQVA7QUFDQSxFQVZEOztBQVlBO0FBQ0E7QUFDQTtBQUNBLEtBQUssQ0FBQ0MsUUFBTixFQUFpQjtBQUNoQkUsU0FBT0gsTUFBUCxHQUFnQkcsT0FBT0UsQ0FBUCxHQUFXTCxNQUEzQjtBQUNBO0FBRUEsQ0FqQ0QiLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKCBbXG5cdFwiLi4vY29yZVwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCBub0dsb2JhbCApIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhclxuXG5cdC8vIE1hcCBvdmVyIGpRdWVyeSBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxuXHRfalF1ZXJ5ID0gd2luZG93LmpRdWVyeSxcblxuXHQvLyBNYXAgb3ZlciB0aGUgJCBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxuXHRfJCA9IHdpbmRvdy4kO1xuXG5qUXVlcnkubm9Db25mbGljdCA9IGZ1bmN0aW9uKCBkZWVwICkge1xuXHRpZiAoIHdpbmRvdy4kID09PSBqUXVlcnkgKSB7XG5cdFx0d2luZG93LiQgPSBfJDtcblx0fVxuXG5cdGlmICggZGVlcCAmJiB3aW5kb3cualF1ZXJ5ID09PSBqUXVlcnkgKSB7XG5cdFx0d2luZG93LmpRdWVyeSA9IF9qUXVlcnk7XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5O1xufTtcblxuLy8gRXhwb3NlIGpRdWVyeSBhbmQgJCBpZGVudGlmaWVycywgZXZlbiBpbiBBTURcbi8vICgjNzEwMiNjb21tZW50OjEwLCBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9wdWxsLzU1Nylcbi8vIGFuZCBDb21tb25KUyBmb3IgYnJvd3NlciBlbXVsYXRvcnMgKCMxMzU2NilcbmlmICggIW5vR2xvYmFsICkge1xuXHR3aW5kb3cualF1ZXJ5ID0gd2luZG93LiQgPSBqUXVlcnk7XG59XG5cbn0gKTtcbiJdfQ==