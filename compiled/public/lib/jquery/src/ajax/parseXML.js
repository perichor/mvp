"use strict";

define(["../core"], function (jQuery) {

	"use strict";

	// Cross-browser xml parsing

	jQuery.parseXML = function (data) {
		var xml;
		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = new window.DOMParser().parseFromString(data, "text/xml");
		} catch (e) {
			xml = undefined;
		}

		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};

	return jQuery.parseXML;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9hamF4L3BhcnNlWE1MLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsImpRdWVyeSIsInBhcnNlWE1MIiwiZGF0YSIsInhtbCIsIndpbmRvdyIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImUiLCJ1bmRlZmluZWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImxlbmd0aCIsImVycm9yIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFRLENBQ1AsU0FETyxDQUFSLEVBRUcsVUFBVUMsTUFBVixFQUFtQjs7QUFFdEI7O0FBRUE7O0FBQ0FBLFFBQU9DLFFBQVAsR0FBa0IsVUFBVUMsSUFBVixFQUFpQjtBQUNsQyxNQUFJQyxHQUFKO0FBQ0EsTUFBSyxDQUFDRCxJQUFELElBQVMsT0FBT0EsSUFBUCxLQUFnQixRQUE5QixFQUF5QztBQUN4QyxVQUFPLElBQVA7QUFDQTs7QUFFRDtBQUNBO0FBQ0EsTUFBSTtBQUNIQyxTQUFRLElBQUlDLE9BQU9DLFNBQVgsRUFBRixDQUEyQkMsZUFBM0IsQ0FBNENKLElBQTVDLEVBQWtELFVBQWxELENBQU47QUFDQSxHQUZELENBRUUsT0FBUUssQ0FBUixFQUFZO0FBQ2JKLFNBQU1LLFNBQU47QUFDQTs7QUFFRCxNQUFLLENBQUNMLEdBQUQsSUFBUUEsSUFBSU0sb0JBQUosQ0FBMEIsYUFBMUIsRUFBMENDLE1BQXZELEVBQWdFO0FBQy9EVixVQUFPVyxLQUFQLENBQWMsa0JBQWtCVCxJQUFoQztBQUNBO0FBQ0QsU0FBT0MsR0FBUDtBQUNBLEVBbEJEOztBQW9CQSxRQUFPSCxPQUFPQyxRQUFkO0FBRUMsQ0E3QkQiLCJmaWxlIjoicGFyc2VYTUwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuLi9jb3JlXCJcbl0sIGZ1bmN0aW9uKCBqUXVlcnkgKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBDcm9zcy1icm93c2VyIHhtbCBwYXJzaW5nXG5qUXVlcnkucGFyc2VYTUwgPSBmdW5jdGlvbiggZGF0YSApIHtcblx0dmFyIHhtbDtcblx0aWYgKCAhZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8vIFN1cHBvcnQ6IElFIDkgLSAxMSBvbmx5XG5cdC8vIElFIHRocm93cyBvbiBwYXJzZUZyb21TdHJpbmcgd2l0aCBpbnZhbGlkIGlucHV0LlxuXHR0cnkge1xuXHRcdHhtbCA9ICggbmV3IHdpbmRvdy5ET01QYXJzZXIoKSApLnBhcnNlRnJvbVN0cmluZyggZGF0YSwgXCJ0ZXh0L3htbFwiICk7XG5cdH0gY2F0Y2ggKCBlICkge1xuXHRcdHhtbCA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdGlmICggIXhtbCB8fCB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwicGFyc2VyZXJyb3JcIiApLmxlbmd0aCApIHtcblx0XHRqUXVlcnkuZXJyb3IoIFwiSW52YWxpZCBYTUw6IFwiICsgZGF0YSApO1xuXHR9XG5cdHJldHVybiB4bWw7XG59O1xuXG5yZXR1cm4galF1ZXJ5LnBhcnNlWE1MO1xuXG59ICk7XG4iXX0=