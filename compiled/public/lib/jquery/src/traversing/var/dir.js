"use strict";

define(["../../core"], function (jQuery) {

	"use strict";

	return function (elem, dir, until) {
		var matched = [],
		    truncate = until !== undefined;

		while ((elem = elem[dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy90cmF2ZXJzaW5nL3Zhci9kaXIuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwialF1ZXJ5IiwiZWxlbSIsImRpciIsInVudGlsIiwibWF0Y2hlZCIsInRydW5jYXRlIiwidW5kZWZpbmVkIiwibm9kZVR5cGUiLCJpcyIsInB1c2giXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQVEsQ0FDUCxZQURPLENBQVIsRUFFRyxVQUFVQyxNQUFWLEVBQW1COztBQUV0Qjs7QUFFQSxRQUFPLFVBQVVDLElBQVYsRUFBZ0JDLEdBQWhCLEVBQXFCQyxLQUFyQixFQUE2QjtBQUNuQyxNQUFJQyxVQUFVLEVBQWQ7QUFBQSxNQUNDQyxXQUFXRixVQUFVRyxTQUR0Qjs7QUFHQSxTQUFRLENBQUVMLE9BQU9BLEtBQU1DLEdBQU4sQ0FBVCxLQUEwQkQsS0FBS00sUUFBTCxLQUFrQixDQUFwRCxFQUF3RDtBQUN2RCxPQUFLTixLQUFLTSxRQUFMLEtBQWtCLENBQXZCLEVBQTJCO0FBQzFCLFFBQUtGLFlBQVlMLE9BQVFDLElBQVIsRUFBZU8sRUFBZixDQUFtQkwsS0FBbkIsQ0FBakIsRUFBOEM7QUFDN0M7QUFDQTtBQUNEQyxZQUFRSyxJQUFSLENBQWNSLElBQWQ7QUFDQTtBQUNEO0FBQ0QsU0FBT0csT0FBUDtBQUNBLEVBYkQ7QUFlQyxDQXJCRCIsImZpbGUiOiJkaXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuLi8uLi9jb3JlXCJcbl0sIGZ1bmN0aW9uKCBqUXVlcnkgKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5yZXR1cm4gZnVuY3Rpb24oIGVsZW0sIGRpciwgdW50aWwgKSB7XG5cdHZhciBtYXRjaGVkID0gW10sXG5cdFx0dHJ1bmNhdGUgPSB1bnRpbCAhPT0gdW5kZWZpbmVkO1xuXG5cdHdoaWxlICggKCBlbGVtID0gZWxlbVsgZGlyIF0gKSAmJiBlbGVtLm5vZGVUeXBlICE9PSA5ICkge1xuXHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdGlmICggdHJ1bmNhdGUgJiYgalF1ZXJ5KCBlbGVtICkuaXMoIHVudGlsICkgKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0bWF0Y2hlZC5wdXNoKCBlbGVtICk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBtYXRjaGVkO1xufTtcblxufSApO1xuIl19