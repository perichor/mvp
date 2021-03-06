"use strict";

define(["../core", "../var/document", "./var/rsingleTag", "../manipulation/buildFragment",

// This is the only module that needs core/support
"./support"], function (jQuery, document, rsingleTag, buildFragment, support) {

	"use strict";

	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string

	jQuery.parseHTML = function (data, context, keepScripts) {
		if (typeof data !== "string") {
			return [];
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}

		var base, parsed, scripts;

		if (!context) {

			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if (support.createHTMLDocument) {
				context = document.implementation.createHTMLDocument("");

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement("base");
				base.href = document.location.href;
				context.head.appendChild(base);
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec(data);
		scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = buildFragment([data], context, scripts);

		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};

	return jQuery.parseHTML;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9jb3JlL3BhcnNlSFRNTC5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCJqUXVlcnkiLCJkb2N1bWVudCIsInJzaW5nbGVUYWciLCJidWlsZEZyYWdtZW50Iiwic3VwcG9ydCIsInBhcnNlSFRNTCIsImRhdGEiLCJjb250ZXh0Iiwia2VlcFNjcmlwdHMiLCJiYXNlIiwicGFyc2VkIiwic2NyaXB0cyIsImNyZWF0ZUhUTUxEb2N1bWVudCIsImltcGxlbWVudGF0aW9uIiwiY3JlYXRlRWxlbWVudCIsImhyZWYiLCJsb2NhdGlvbiIsImhlYWQiLCJhcHBlbmRDaGlsZCIsImV4ZWMiLCJsZW5ndGgiLCJyZW1vdmUiLCJtZXJnZSIsImNoaWxkTm9kZXMiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQVEsQ0FDUCxTQURPLEVBRVAsaUJBRk8sRUFHUCxrQkFITyxFQUlQLCtCQUpPOztBQU1QO0FBQ0EsV0FQTyxDQUFSLEVBUUcsVUFBVUMsTUFBVixFQUFrQkMsUUFBbEIsRUFBNEJDLFVBQTVCLEVBQXdDQyxhQUF4QyxFQUF1REMsT0FBdkQsRUFBaUU7O0FBRXBFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBSixRQUFPSyxTQUFQLEdBQW1CLFVBQVVDLElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCQyxXQUF6QixFQUF1QztBQUN6RCxNQUFLLE9BQU9GLElBQVAsS0FBZ0IsUUFBckIsRUFBZ0M7QUFDL0IsVUFBTyxFQUFQO0FBQ0E7QUFDRCxNQUFLLE9BQU9DLE9BQVAsS0FBbUIsU0FBeEIsRUFBb0M7QUFDbkNDLGlCQUFjRCxPQUFkO0FBQ0FBLGFBQVUsS0FBVjtBQUNBOztBQUVELE1BQUlFLElBQUosRUFBVUMsTUFBVixFQUFrQkMsT0FBbEI7O0FBRUEsTUFBSyxDQUFDSixPQUFOLEVBQWdCOztBQUVmO0FBQ0E7QUFDQSxPQUFLSCxRQUFRUSxrQkFBYixFQUFrQztBQUNqQ0wsY0FBVU4sU0FBU1ksY0FBVCxDQUF3QkQsa0JBQXhCLENBQTRDLEVBQTVDLENBQVY7O0FBRUE7QUFDQTtBQUNBO0FBQ0FILFdBQU9GLFFBQVFPLGFBQVIsQ0FBdUIsTUFBdkIsQ0FBUDtBQUNBTCxTQUFLTSxJQUFMLEdBQVlkLFNBQVNlLFFBQVQsQ0FBa0JELElBQTlCO0FBQ0FSLFlBQVFVLElBQVIsQ0FBYUMsV0FBYixDQUEwQlQsSUFBMUI7QUFDQSxJQVRELE1BU087QUFDTkYsY0FBVU4sUUFBVjtBQUNBO0FBQ0Q7O0FBRURTLFdBQVNSLFdBQVdpQixJQUFYLENBQWlCYixJQUFqQixDQUFUO0FBQ0FLLFlBQVUsQ0FBQ0gsV0FBRCxJQUFnQixFQUExQjs7QUFFQTtBQUNBLE1BQUtFLE1BQUwsRUFBYztBQUNiLFVBQU8sQ0FBRUgsUUFBUU8sYUFBUixDQUF1QkosT0FBUSxDQUFSLENBQXZCLENBQUYsQ0FBUDtBQUNBOztBQUVEQSxXQUFTUCxjQUFlLENBQUVHLElBQUYsQ0FBZixFQUF5QkMsT0FBekIsRUFBa0NJLE9BQWxDLENBQVQ7O0FBRUEsTUFBS0EsV0FBV0EsUUFBUVMsTUFBeEIsRUFBaUM7QUFDaENwQixVQUFRVyxPQUFSLEVBQWtCVSxNQUFsQjtBQUNBOztBQUVELFNBQU9yQixPQUFPc0IsS0FBUCxDQUFjLEVBQWQsRUFBa0JaLE9BQU9hLFVBQXpCLENBQVA7QUFDQSxFQTVDRDs7QUE4Q0EsUUFBT3ZCLE9BQU9LLFNBQWQ7QUFFQyxDQWhFRCIsImZpbGUiOiJwYXJzZUhUTUwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuLi9jb3JlXCIsXG5cdFwiLi4vdmFyL2RvY3VtZW50XCIsXG5cdFwiLi92YXIvcnNpbmdsZVRhZ1wiLFxuXHRcIi4uL21hbmlwdWxhdGlvbi9idWlsZEZyYWdtZW50XCIsXG5cblx0Ly8gVGhpcyBpcyB0aGUgb25seSBtb2R1bGUgdGhhdCBuZWVkcyBjb3JlL3N1cHBvcnRcblx0XCIuL3N1cHBvcnRcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgZG9jdW1lbnQsIHJzaW5nbGVUYWcsIGJ1aWxkRnJhZ21lbnQsIHN1cHBvcnQgKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBBcmd1bWVudCBcImRhdGFcIiBzaG91bGQgYmUgc3RyaW5nIG9mIGh0bWxcbi8vIGNvbnRleHQgKG9wdGlvbmFsKTogSWYgc3BlY2lmaWVkLCB0aGUgZnJhZ21lbnQgd2lsbCBiZSBjcmVhdGVkIGluIHRoaXMgY29udGV4dCxcbi8vIGRlZmF1bHRzIHRvIGRvY3VtZW50XG4vLyBrZWVwU2NyaXB0cyAob3B0aW9uYWwpOiBJZiB0cnVlLCB3aWxsIGluY2x1ZGUgc2NyaXB0cyBwYXNzZWQgaW4gdGhlIGh0bWwgc3RyaW5nXG5qUXVlcnkucGFyc2VIVE1MID0gZnVuY3Rpb24oIGRhdGEsIGNvbnRleHQsIGtlZXBTY3JpcHRzICkge1xuXHRpZiAoIHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiICkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRpZiAoIHR5cGVvZiBjb250ZXh0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRrZWVwU2NyaXB0cyA9IGNvbnRleHQ7XG5cdFx0Y29udGV4dCA9IGZhbHNlO1xuXHR9XG5cblx0dmFyIGJhc2UsIHBhcnNlZCwgc2NyaXB0cztcblxuXHRpZiAoICFjb250ZXh0ICkge1xuXG5cdFx0Ly8gU3RvcCBzY3JpcHRzIG9yIGlubGluZSBldmVudCBoYW5kbGVycyBmcm9tIGJlaW5nIGV4ZWN1dGVkIGltbWVkaWF0ZWx5XG5cdFx0Ly8gYnkgdXNpbmcgZG9jdW1lbnQuaW1wbGVtZW50YXRpb25cblx0XHRpZiAoIHN1cHBvcnQuY3JlYXRlSFRNTERvY3VtZW50ICkge1xuXHRcdFx0Y29udGV4dCA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCggXCJcIiApO1xuXG5cdFx0XHQvLyBTZXQgdGhlIGJhc2UgaHJlZiBmb3IgdGhlIGNyZWF0ZWQgZG9jdW1lbnRcblx0XHRcdC8vIHNvIGFueSBwYXJzZWQgZWxlbWVudHMgd2l0aCBVUkxzXG5cdFx0XHQvLyBhcmUgYmFzZWQgb24gdGhlIGRvY3VtZW50J3MgVVJMIChnaC0yOTY1KVxuXHRcdFx0YmFzZSA9IGNvbnRleHQuY3JlYXRlRWxlbWVudCggXCJiYXNlXCIgKTtcblx0XHRcdGJhc2UuaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG5cdFx0XHRjb250ZXh0LmhlYWQuYXBwZW5kQ2hpbGQoIGJhc2UgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29udGV4dCA9IGRvY3VtZW50O1xuXHRcdH1cblx0fVxuXG5cdHBhcnNlZCA9IHJzaW5nbGVUYWcuZXhlYyggZGF0YSApO1xuXHRzY3JpcHRzID0gIWtlZXBTY3JpcHRzICYmIFtdO1xuXG5cdC8vIFNpbmdsZSB0YWdcblx0aWYgKCBwYXJzZWQgKSB7XG5cdFx0cmV0dXJuIFsgY29udGV4dC5jcmVhdGVFbGVtZW50KCBwYXJzZWRbIDEgXSApIF07XG5cdH1cblxuXHRwYXJzZWQgPSBidWlsZEZyYWdtZW50KCBbIGRhdGEgXSwgY29udGV4dCwgc2NyaXB0cyApO1xuXG5cdGlmICggc2NyaXB0cyAmJiBzY3JpcHRzLmxlbmd0aCApIHtcblx0XHRqUXVlcnkoIHNjcmlwdHMgKS5yZW1vdmUoKTtcblx0fVxuXG5cdHJldHVybiBqUXVlcnkubWVyZ2UoIFtdLCBwYXJzZWQuY2hpbGROb2RlcyApO1xufTtcblxucmV0dXJuIGpRdWVyeS5wYXJzZUhUTUw7XG5cbn0gKTtcbiJdfQ==