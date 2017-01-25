"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define(["../core", "../core/stripAndCollapse", "../core/parseHTML", "../ajax", "../traversing", "../manipulation", "../selector"], function (jQuery, stripAndCollapse) {

	"use strict";

	/**
  * Load a url into a page
  */

	jQuery.fn.load = function (url, params, callback) {
		var selector,
		    type,
		    response,
		    self = this,
		    off = url.indexOf(" ");

		if (off > -1) {
			selector = stripAndCollapse(url.slice(off));
			url = url.slice(0, off);
		}

		// If it's a function
		if (jQuery.isFunction(params)) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

			// Otherwise, build a param string
		} else if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			}).done(function (responseText) {

				// Save response for use in complete callback
				response = arguments;

				self.html(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && function (jqXHR, status) {
				self.each(function () {
					callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
				});
			});
		}

		return this;
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9hamF4L2xvYWQuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwialF1ZXJ5Iiwic3RyaXBBbmRDb2xsYXBzZSIsImZuIiwibG9hZCIsInVybCIsInBhcmFtcyIsImNhbGxiYWNrIiwic2VsZWN0b3IiLCJ0eXBlIiwicmVzcG9uc2UiLCJzZWxmIiwib2ZmIiwiaW5kZXhPZiIsInNsaWNlIiwiaXNGdW5jdGlvbiIsInVuZGVmaW5lZCIsImxlbmd0aCIsImFqYXgiLCJkYXRhVHlwZSIsImRhdGEiLCJkb25lIiwicmVzcG9uc2VUZXh0IiwiYXJndW1lbnRzIiwiaHRtbCIsImFwcGVuZCIsInBhcnNlSFRNTCIsImZpbmQiLCJhbHdheXMiLCJqcVhIUiIsInN0YXR1cyIsImVhY2giLCJhcHBseSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBQSxPQUFRLENBQ1AsU0FETyxFQUVQLDBCQUZPLEVBR1AsbUJBSE8sRUFJUCxTQUpPLEVBS1AsZUFMTyxFQU1QLGlCQU5PLEVBT1AsYUFQTyxDQUFSLEVBUUcsVUFBVUMsTUFBVixFQUFrQkMsZ0JBQWxCLEVBQXFDOztBQUV4Qzs7QUFFQTs7OztBQUdBRCxRQUFPRSxFQUFQLENBQVVDLElBQVYsR0FBaUIsVUFBVUMsR0FBVixFQUFlQyxNQUFmLEVBQXVCQyxRQUF2QixFQUFrQztBQUNsRCxNQUFJQyxRQUFKO0FBQUEsTUFBY0MsSUFBZDtBQUFBLE1BQW9CQyxRQUFwQjtBQUFBLE1BQ0NDLE9BQU8sSUFEUjtBQUFBLE1BRUNDLE1BQU1QLElBQUlRLE9BQUosQ0FBYSxHQUFiLENBRlA7O0FBSUEsTUFBS0QsTUFBTSxDQUFDLENBQVosRUFBZ0I7QUFDZkosY0FBV04saUJBQWtCRyxJQUFJUyxLQUFKLENBQVdGLEdBQVgsQ0FBbEIsQ0FBWDtBQUNBUCxTQUFNQSxJQUFJUyxLQUFKLENBQVcsQ0FBWCxFQUFjRixHQUFkLENBQU47QUFDQTs7QUFFRDtBQUNBLE1BQUtYLE9BQU9jLFVBQVAsQ0FBbUJULE1BQW5CLENBQUwsRUFBbUM7O0FBRWxDO0FBQ0FDLGNBQVdELE1BQVg7QUFDQUEsWUFBU1UsU0FBVDs7QUFFRDtBQUNDLEdBUEQsTUFPTyxJQUFLVixVQUFVLFFBQU9BLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBakMsRUFBNEM7QUFDbERHLFVBQU8sTUFBUDtBQUNBOztBQUVEO0FBQ0EsTUFBS0UsS0FBS00sTUFBTCxHQUFjLENBQW5CLEVBQXVCO0FBQ3RCaEIsVUFBT2lCLElBQVAsQ0FBYTtBQUNaYixTQUFLQSxHQURPOztBQUdaO0FBQ0E7QUFDQTtBQUNBSSxVQUFNQSxRQUFRLEtBTkY7QUFPWlUsY0FBVSxNQVBFO0FBUVpDLFVBQU1kO0FBUk0sSUFBYixFQVNJZSxJQVRKLENBU1UsVUFBVUMsWUFBVixFQUF5Qjs7QUFFbEM7QUFDQVosZUFBV2EsU0FBWDs7QUFFQVosU0FBS2EsSUFBTCxDQUFXaEI7O0FBRVY7QUFDQTtBQUNBUCxXQUFRLE9BQVIsRUFBa0J3QixNQUFsQixDQUEwQnhCLE9BQU95QixTQUFQLENBQWtCSixZQUFsQixDQUExQixFQUE2REssSUFBN0QsQ0FBbUVuQixRQUFuRSxDQUpVOztBQU1WO0FBQ0FjLGdCQVBEOztBQVNEO0FBQ0E7QUFDQTtBQUNDLElBMUJELEVBMEJJTSxNQTFCSixDQTBCWXJCLFlBQVksVUFBVXNCLEtBQVYsRUFBaUJDLE1BQWpCLEVBQTBCO0FBQ2pEbkIsU0FBS29CLElBQUwsQ0FBVyxZQUFXO0FBQ3JCeEIsY0FBU3lCLEtBQVQsQ0FBZ0IsSUFBaEIsRUFBc0J0QixZQUFZLENBQUVtQixNQUFNUCxZQUFSLEVBQXNCUSxNQUF0QixFQUE4QkQsS0FBOUIsQ0FBbEM7QUFDQSxLQUZEO0FBR0EsSUE5QkQ7QUErQkE7O0FBRUQsU0FBTyxJQUFQO0FBQ0EsRUExREQ7QUE0REMsQ0EzRUQiLCJmaWxlIjoibG9hZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZSggW1xuXHRcIi4uL2NvcmVcIixcblx0XCIuLi9jb3JlL3N0cmlwQW5kQ29sbGFwc2VcIixcblx0XCIuLi9jb3JlL3BhcnNlSFRNTFwiLFxuXHRcIi4uL2FqYXhcIixcblx0XCIuLi90cmF2ZXJzaW5nXCIsXG5cdFwiLi4vbWFuaXB1bGF0aW9uXCIsXG5cdFwiLi4vc2VsZWN0b3JcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgc3RyaXBBbmRDb2xsYXBzZSApIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogTG9hZCBhIHVybCBpbnRvIGEgcGFnZVxuICovXG5qUXVlcnkuZm4ubG9hZCA9IGZ1bmN0aW9uKCB1cmwsIHBhcmFtcywgY2FsbGJhY2sgKSB7XG5cdHZhciBzZWxlY3RvciwgdHlwZSwgcmVzcG9uc2UsXG5cdFx0c2VsZiA9IHRoaXMsXG5cdFx0b2ZmID0gdXJsLmluZGV4T2YoIFwiIFwiICk7XG5cblx0aWYgKCBvZmYgPiAtMSApIHtcblx0XHRzZWxlY3RvciA9IHN0cmlwQW5kQ29sbGFwc2UoIHVybC5zbGljZSggb2ZmICkgKTtcblx0XHR1cmwgPSB1cmwuc2xpY2UoIDAsIG9mZiApO1xuXHR9XG5cblx0Ly8gSWYgaXQncyBhIGZ1bmN0aW9uXG5cdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHBhcmFtcyApICkge1xuXG5cdFx0Ly8gV2UgYXNzdW1lIHRoYXQgaXQncyB0aGUgY2FsbGJhY2tcblx0XHRjYWxsYmFjayA9IHBhcmFtcztcblx0XHRwYXJhbXMgPSB1bmRlZmluZWQ7XG5cblx0Ly8gT3RoZXJ3aXNlLCBidWlsZCBhIHBhcmFtIHN0cmluZ1xuXHR9IGVsc2UgaWYgKCBwYXJhbXMgJiYgdHlwZW9mIHBhcmFtcyA9PT0gXCJvYmplY3RcIiApIHtcblx0XHR0eXBlID0gXCJQT1NUXCI7XG5cdH1cblxuXHQvLyBJZiB3ZSBoYXZlIGVsZW1lbnRzIHRvIG1vZGlmeSwgbWFrZSB0aGUgcmVxdWVzdFxuXHRpZiAoIHNlbGYubGVuZ3RoID4gMCApIHtcblx0XHRqUXVlcnkuYWpheCgge1xuXHRcdFx0dXJsOiB1cmwsXG5cblx0XHRcdC8vIElmIFwidHlwZVwiIHZhcmlhYmxlIGlzIHVuZGVmaW5lZCwgdGhlbiBcIkdFVFwiIG1ldGhvZCB3aWxsIGJlIHVzZWQuXG5cdFx0XHQvLyBNYWtlIHZhbHVlIG9mIHRoaXMgZmllbGQgZXhwbGljaXQgc2luY2Vcblx0XHRcdC8vIHVzZXIgY2FuIG92ZXJyaWRlIGl0IHRocm91Z2ggYWpheFNldHVwIG1ldGhvZFxuXHRcdFx0dHlwZTogdHlwZSB8fCBcIkdFVFwiLFxuXHRcdFx0ZGF0YVR5cGU6IFwiaHRtbFwiLFxuXHRcdFx0ZGF0YTogcGFyYW1zXG5cdFx0fSApLmRvbmUoIGZ1bmN0aW9uKCByZXNwb25zZVRleHQgKSB7XG5cblx0XHRcdC8vIFNhdmUgcmVzcG9uc2UgZm9yIHVzZSBpbiBjb21wbGV0ZSBjYWxsYmFja1xuXHRcdFx0cmVzcG9uc2UgPSBhcmd1bWVudHM7XG5cblx0XHRcdHNlbGYuaHRtbCggc2VsZWN0b3IgP1xuXG5cdFx0XHRcdC8vIElmIGEgc2VsZWN0b3Igd2FzIHNwZWNpZmllZCwgbG9jYXRlIHRoZSByaWdodCBlbGVtZW50cyBpbiBhIGR1bW15IGRpdlxuXHRcdFx0XHQvLyBFeGNsdWRlIHNjcmlwdHMgdG8gYXZvaWQgSUUgJ1Blcm1pc3Npb24gRGVuaWVkJyBlcnJvcnNcblx0XHRcdFx0alF1ZXJ5KCBcIjxkaXY+XCIgKS5hcHBlbmQoIGpRdWVyeS5wYXJzZUhUTUwoIHJlc3BvbnNlVGV4dCApICkuZmluZCggc2VsZWN0b3IgKSA6XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIHVzZSB0aGUgZnVsbCByZXN1bHRcblx0XHRcdFx0cmVzcG9uc2VUZXh0ICk7XG5cblx0XHQvLyBJZiB0aGUgcmVxdWVzdCBzdWNjZWVkcywgdGhpcyBmdW5jdGlvbiBnZXRzIFwiZGF0YVwiLCBcInN0YXR1c1wiLCBcImpxWEhSXCJcblx0XHQvLyBidXQgdGhleSBhcmUgaWdub3JlZCBiZWNhdXNlIHJlc3BvbnNlIHdhcyBzZXQgYWJvdmUuXG5cdFx0Ly8gSWYgaXQgZmFpbHMsIHRoaXMgZnVuY3Rpb24gZ2V0cyBcImpxWEhSXCIsIFwic3RhdHVzXCIsIFwiZXJyb3JcIlxuXHRcdH0gKS5hbHdheXMoIGNhbGxiYWNrICYmIGZ1bmN0aW9uKCBqcVhIUiwgc3RhdHVzICkge1xuXHRcdFx0c2VsZi5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y2FsbGJhY2suYXBwbHkoIHRoaXMsIHJlc3BvbnNlIHx8IFsganFYSFIucmVzcG9uc2VUZXh0LCBzdGF0dXMsIGpxWEhSIF0gKTtcblx0XHRcdH0gKTtcblx0XHR9ICk7XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbn0gKTtcbiJdfQ==