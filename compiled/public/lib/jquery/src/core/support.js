"use strict";

define(["../var/document", "../var/support"], function (document, support) {

	"use strict";

	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337

	support.createHTMLDocument = function () {
		var body = document.implementation.createHTMLDocument("").body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	}();

	return support;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9jb3JlL3N1cHBvcnQuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwiZG9jdW1lbnQiLCJzdXBwb3J0IiwiY3JlYXRlSFRNTERvY3VtZW50IiwiYm9keSIsImltcGxlbWVudGF0aW9uIiwiaW5uZXJIVE1MIiwiY2hpbGROb2RlcyIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsT0FBUSxDQUNQLGlCQURPLEVBRVAsZ0JBRk8sQ0FBUixFQUdHLFVBQVVDLFFBQVYsRUFBb0JDLE9BQXBCLEVBQThCOztBQUVqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBQSxTQUFRQyxrQkFBUixHQUErQixZQUFXO0FBQ3pDLE1BQUlDLE9BQU9ILFNBQVNJLGNBQVQsQ0FBd0JGLGtCQUF4QixDQUE0QyxFQUE1QyxFQUFpREMsSUFBNUQ7QUFDQUEsT0FBS0UsU0FBTCxHQUFpQiw0QkFBakI7QUFDQSxTQUFPRixLQUFLRyxVQUFMLENBQWdCQyxNQUFoQixLQUEyQixDQUFsQztBQUNBLEVBSjRCLEVBQTdCOztBQU1BLFFBQU9OLE9BQVA7QUFDQyxDQW5CRCIsImZpbGUiOiJzdXBwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKCBbXG5cdFwiLi4vdmFyL2RvY3VtZW50XCIsXG5cdFwiLi4vdmFyL3N1cHBvcnRcIlxuXSwgZnVuY3Rpb24oIGRvY3VtZW50LCBzdXBwb3J0ICkge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLy8gU3VwcG9ydDogU2FmYXJpIDggb25seVxuLy8gSW4gU2FmYXJpIDggZG9jdW1lbnRzIGNyZWF0ZWQgdmlhIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudFxuLy8gY29sbGFwc2Ugc2libGluZyBmb3JtczogdGhlIHNlY29uZCBvbmUgYmVjb21lcyBhIGNoaWxkIG9mIHRoZSBmaXJzdCBvbmUuXG4vLyBCZWNhdXNlIG9mIHRoYXQsIHRoaXMgc2VjdXJpdHkgbWVhc3VyZSBoYXMgdG8gYmUgZGlzYWJsZWQgaW4gU2FmYXJpIDguXG4vLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM3MzM3XG5zdXBwb3J0LmNyZWF0ZUhUTUxEb2N1bWVudCA9ICggZnVuY3Rpb24oKSB7XG5cdHZhciBib2R5ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCBcIlwiICkuYm9keTtcblx0Ym9keS5pbm5lckhUTUwgPSBcIjxmb3JtPjwvZm9ybT48Zm9ybT48L2Zvcm0+XCI7XG5cdHJldHVybiBib2R5LmNoaWxkTm9kZXMubGVuZ3RoID09PSAyO1xufSApKCk7XG5cbnJldHVybiBzdXBwb3J0O1xufSApO1xuIl19