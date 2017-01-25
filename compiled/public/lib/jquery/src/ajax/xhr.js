"use strict";

define(["../core", "../var/support", "../ajax"], function (jQuery, support) {

	"use strict";

	jQuery.ajaxSettings.xhr = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	};

	var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	    xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function (options) {
		var _callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function send(headers, complete) {
					var i,
					    xhr = options.xhr();

					xhr.open(options.type, options.url, options.async, options.username, options.password);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					_callback = function callback(type) {
						return function () {
							if (_callback) {
								_callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if (type === "abort") {
									xhr.abort();
								} else if (type === "error") {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== "number") {
										complete(0, "error");
									} else {
										complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status, xhr.statusText);
									}
								} else {
									complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									(xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
								}
							}
						};
					};

					// Listen to events
					xhr.onload = _callback();
					errorCallback = xhr.onerror = _callback("error");

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function () {

							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function () {
									if (_callback) {
										errorCallback();
									}
								});
							}
						};
					}

					// Create the abort callback
					_callback = _callback("abort");

					try {

						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (_callback) {
							throw e;
						}
					}
				},

				abort: function abort() {
					if (_callback) {
						_callback();
					}
				}
			};
		}
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9hamF4L3hoci5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCJqUXVlcnkiLCJzdXBwb3J0IiwiYWpheFNldHRpbmdzIiwieGhyIiwid2luZG93IiwiWE1MSHR0cFJlcXVlc3QiLCJlIiwieGhyU3VjY2Vzc1N0YXR1cyIsInhoclN1cHBvcnRlZCIsImNvcnMiLCJhamF4IiwiYWpheFRyYW5zcG9ydCIsIm9wdGlvbnMiLCJjYWxsYmFjayIsImVycm9yQ2FsbGJhY2siLCJjcm9zc0RvbWFpbiIsInNlbmQiLCJoZWFkZXJzIiwiY29tcGxldGUiLCJpIiwib3BlbiIsInR5cGUiLCJ1cmwiLCJhc3luYyIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ4aHJGaWVsZHMiLCJtaW1lVHlwZSIsIm92ZXJyaWRlTWltZVR5cGUiLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25sb2FkIiwib25lcnJvciIsIm9uYWJvcnQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJhYm9ydCIsInN0YXR1cyIsInN0YXR1c1RleHQiLCJyZXNwb25zZVR5cGUiLCJyZXNwb25zZVRleHQiLCJiaW5hcnkiLCJyZXNwb25zZSIsInRleHQiLCJnZXRBbGxSZXNwb25zZUhlYWRlcnMiLCJ1bmRlZmluZWQiLCJyZWFkeVN0YXRlIiwic2V0VGltZW91dCIsImhhc0NvbnRlbnQiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFRLENBQ1AsU0FETyxFQUVQLGdCQUZPLEVBR1AsU0FITyxDQUFSLEVBSUcsVUFBVUMsTUFBVixFQUFrQkMsT0FBbEIsRUFBNEI7O0FBRS9COztBQUVBRCxRQUFPRSxZQUFQLENBQW9CQyxHQUFwQixHQUEwQixZQUFXO0FBQ3BDLE1BQUk7QUFDSCxVQUFPLElBQUlDLE9BQU9DLGNBQVgsRUFBUDtBQUNBLEdBRkQsQ0FFRSxPQUFRQyxDQUFSLEVBQVksQ0FBRTtBQUNoQixFQUpEOztBQU1BLEtBQUlDLG1CQUFtQjs7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QUMscUJBQWdCWCxJQUFJNEIsT0FBSixHQUFjbEIsVUFBVSxPQUFWLENBQTlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQUtWLElBQUk2QixPQUFKLEtBQWdCVyxTQUFyQixFQUFpQztBQUNoQ3hDLFVBQUk2QixPQUFKLEdBQWNsQixhQUFkO0FBQ0EsTUFGRCxNQUVPO0FBQ05YLFVBQUk4QixrQkFBSixHQUF5QixZQUFXOztBQUVuQztBQUNBLFdBQUs5QixJQUFJeUMsVUFBSixLQUFtQixDQUF4QixFQUE0Qjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQXhDLGVBQU95QyxVQUFQLENBQW1CLFlBQVc7QUFDN0IsYUFBS2hDLFNBQUwsRUFBZ0I7QUFDZkM7QUFDQTtBQUNELFNBSkQ7QUFLQTtBQUNELE9BZkQ7QUFnQkE7O0FBRUQ7QUFDQUQsaUJBQVdBLFVBQVUsT0FBVixDQUFYOztBQUVBLFNBQUk7O0FBRUg7QUFDQVYsVUFBSWEsSUFBSixDQUFVSixRQUFRa0MsVUFBUixJQUFzQmxDLFFBQVFtQyxJQUE5QixJQUFzQyxJQUFoRDtBQUNBLE1BSkQsQ0FJRSxPQUFRekMsQ0FBUixFQUFZOztBQUViO0FBQ0EsVUFBS08sU0FBTCxFQUFnQjtBQUNmLGFBQU1QLENBQU47QUFDQTtBQUNEO0FBQ0QsS0E1SEs7O0FBOEhONEIsV0FBTyxpQkFBVztBQUNqQixTQUFLckIsU0FBTCxFQUFnQjtBQUNmQTtBQUNBO0FBQ0Q7QUFsSUssSUFBUDtBQW9JQTtBQUNELEVBMUlEO0FBNElDLENBeEtEIiwiZmlsZSI6Inhoci5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZSggW1xuXHRcIi4uL2NvcmVcIixcblx0XCIuLi92YXIvc3VwcG9ydFwiLFxuXHRcIi4uL2FqYXhcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgc3VwcG9ydCApIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmpRdWVyeS5hamF4U2V0dGluZ3MueGhyID0gZnVuY3Rpb24oKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcblx0fSBjYXRjaCAoIGUgKSB7fVxufTtcblxudmFyIHhoclN1Y2Nlc3NTdGF0dXMgPSB7XG5cblx0XHQvLyBGaWxlIHByb3RvY29sIGFsd2F5cyB5aWVsZHMgc3RhdHVzIGNvZGUgMCwgYXNzdW1lIDIwMFxuXHRcdDA6IDIwMCxcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG5cdFx0Ly8gIzE0NTA6IHNvbWV0aW1lcyBJRSByZXR1cm5zIDEyMjMgd2hlbiBpdCBzaG91bGQgYmUgMjA0XG5cdFx0MTIyMzogMjA0XG5cdH0sXG5cdHhoclN1cHBvcnRlZCA9IGpRdWVyeS5hamF4U2V0dGluZ3MueGhyKCk7XG5cbnN1cHBvcnQuY29ycyA9ICEheGhyU3VwcG9ydGVkICYmICggXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHJTdXBwb3J0ZWQgKTtcbnN1cHBvcnQuYWpheCA9IHhoclN1cHBvcnRlZCA9ICEheGhyU3VwcG9ydGVkO1xuXG5qUXVlcnkuYWpheFRyYW5zcG9ydCggZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdHZhciBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaztcblxuXHQvLyBDcm9zcyBkb21haW4gb25seSBhbGxvd2VkIGlmIHN1cHBvcnRlZCB0aHJvdWdoIFhNTEh0dHBSZXF1ZXN0XG5cdGlmICggc3VwcG9ydC5jb3JzIHx8IHhoclN1cHBvcnRlZCAmJiAhb3B0aW9ucy5jcm9zc0RvbWFpbiApIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c2VuZDogZnVuY3Rpb24oIGhlYWRlcnMsIGNvbXBsZXRlICkge1xuXHRcdFx0XHR2YXIgaSxcblx0XHRcdFx0XHR4aHIgPSBvcHRpb25zLnhocigpO1xuXG5cdFx0XHRcdHhoci5vcGVuKFxuXHRcdFx0XHRcdG9wdGlvbnMudHlwZSxcblx0XHRcdFx0XHRvcHRpb25zLnVybCxcblx0XHRcdFx0XHRvcHRpb25zLmFzeW5jLFxuXHRcdFx0XHRcdG9wdGlvbnMudXNlcm5hbWUsXG5cdFx0XHRcdFx0b3B0aW9ucy5wYXNzd29yZFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdC8vIEFwcGx5IGN1c3RvbSBmaWVsZHMgaWYgcHJvdmlkZWRcblx0XHRcdFx0aWYgKCBvcHRpb25zLnhockZpZWxkcyApIHtcblx0XHRcdFx0XHRmb3IgKCBpIGluIG9wdGlvbnMueGhyRmllbGRzICkge1xuXHRcdFx0XHRcdFx0eGhyWyBpIF0gPSBvcHRpb25zLnhockZpZWxkc1sgaSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE92ZXJyaWRlIG1pbWUgdHlwZSBpZiBuZWVkZWRcblx0XHRcdFx0aWYgKCBvcHRpb25zLm1pbWVUeXBlICYmIHhoci5vdmVycmlkZU1pbWVUeXBlICkge1xuXHRcdFx0XHRcdHhoci5vdmVycmlkZU1pbWVUeXBlKCBvcHRpb25zLm1pbWVUeXBlICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBYLVJlcXVlc3RlZC1XaXRoIGhlYWRlclxuXHRcdFx0XHQvLyBGb3IgY3Jvc3MtZG9tYWluIHJlcXVlc3RzLCBzZWVpbmcgYXMgY29uZGl0aW9ucyBmb3IgYSBwcmVmbGlnaHQgYXJlXG5cdFx0XHRcdC8vIGFraW4gdG8gYSBqaWdzYXcgcHV6emxlLCB3ZSBzaW1wbHkgbmV2ZXIgc2V0IGl0IHRvIGJlIHN1cmUuXG5cdFx0XHRcdC8vIChpdCBjYW4gYWx3YXlzIGJlIHNldCBvbiBhIHBlci1yZXF1ZXN0IGJhc2lzIG9yIGV2ZW4gdXNpbmcgYWpheFNldHVwKVxuXHRcdFx0XHQvLyBGb3Igc2FtZS1kb21haW4gcmVxdWVzdHMsIHdvbid0IGNoYW5nZSBoZWFkZXIgaWYgYWxyZWFkeSBwcm92aWRlZC5cblx0XHRcdFx0aWYgKCAhb3B0aW9ucy5jcm9zc0RvbWFpbiAmJiAhaGVhZGVyc1sgXCJYLVJlcXVlc3RlZC1XaXRoXCIgXSApIHtcblx0XHRcdFx0XHRoZWFkZXJzWyBcIlgtUmVxdWVzdGVkLVdpdGhcIiBdID0gXCJYTUxIdHRwUmVxdWVzdFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2V0IGhlYWRlcnNcblx0XHRcdFx0Zm9yICggaSBpbiBoZWFkZXJzICkge1xuXHRcdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBoZWFkZXJzWyBpIF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENhbGxiYWNrXG5cdFx0XHRcdGNhbGxiYWNrID0gZnVuY3Rpb24oIHR5cGUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSBlcnJvckNhbGxiYWNrID0geGhyLm9ubG9hZCA9XG5cdFx0XHRcdFx0XHRcdFx0eGhyLm9uZXJyb3IgPSB4aHIub25hYm9ydCA9IHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuXG5cdFx0XHRcdFx0XHRcdGlmICggdHlwZSA9PT0gXCJhYm9ydFwiICkge1xuXHRcdFx0XHRcdFx0XHRcdHhoci5hYm9ydCgpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCB0eXBlID09PSBcImVycm9yXCIgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuXHRcdFx0XHRcdFx0XHRcdC8vIE9uIGEgbWFudWFsIG5hdGl2ZSBhYm9ydCwgSUU5IHRocm93c1xuXHRcdFx0XHRcdFx0XHRcdC8vIGVycm9ycyBvbiBhbnkgcHJvcGVydHkgYWNjZXNzIHRoYXQgaXMgbm90IHJlYWR5U3RhdGVcblx0XHRcdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiB4aHIuc3RhdHVzICE9PSBcIm51bWJlclwiICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29tcGxldGUoIDAsIFwiZXJyb3JcIiApO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZShcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBGaWxlOiBwcm90b2NvbCBhbHdheXMgeWllbGRzIHN0YXR1cyAwOyBzZWUgIzg2MDUsICMxNDIwN1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR4aHIuc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR4aHIuc3RhdHVzVGV4dFxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29tcGxldGUoXG5cdFx0XHRcdFx0XHRcdFx0XHR4aHJTdWNjZXNzU3RhdHVzWyB4aHIuc3RhdHVzIF0gfHwgeGhyLnN0YXR1cyxcblx0XHRcdFx0XHRcdFx0XHRcdHhoci5zdGF0dXNUZXh0LFxuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gSUU5IGhhcyBubyBYSFIyIGJ1dCB0aHJvd3Mgb24gYmluYXJ5ICh0cmFjLTExNDI2KVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gRm9yIFhIUjIgbm9uLXRleHQsIGxldCB0aGUgY2FsbGVyIGhhbmRsZSBpdCAoZ2gtMjQ5OClcblx0XHRcdFx0XHRcdFx0XHRcdCggeGhyLnJlc3BvbnNlVHlwZSB8fCBcInRleHRcIiApICE9PSBcInRleHRcIiAgfHxcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGVvZiB4aHIucmVzcG9uc2VUZXh0ICE9PSBcInN0cmluZ1wiID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0eyBiaW5hcnk6IHhoci5yZXNwb25zZSB9IDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0eyB0ZXh0OiB4aHIucmVzcG9uc2VUZXh0IH0sXG5cdFx0XHRcdFx0XHRcdFx0XHR4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHQvLyBMaXN0ZW4gdG8gZXZlbnRzXG5cdFx0XHRcdHhoci5vbmxvYWQgPSBjYWxsYmFjaygpO1xuXHRcdFx0XHRlcnJvckNhbGxiYWNrID0geGhyLm9uZXJyb3IgPSBjYWxsYmFjayggXCJlcnJvclwiICk7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgOSBvbmx5XG5cdFx0XHRcdC8vIFVzZSBvbnJlYWR5c3RhdGVjaGFuZ2UgdG8gcmVwbGFjZSBvbmFib3J0XG5cdFx0XHRcdC8vIHRvIGhhbmRsZSB1bmNhdWdodCBhYm9ydHNcblx0XHRcdFx0aWYgKCB4aHIub25hYm9ydCAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHhoci5vbmFib3J0ID0gZXJyb3JDYWxsYmFjaztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdC8vIENoZWNrIHJlYWR5U3RhdGUgYmVmb3JlIHRpbWVvdXQgYXMgaXQgY2hhbmdlc1xuXHRcdFx0XHRcdFx0aWYgKCB4aHIucmVhZHlTdGF0ZSA9PT0gNCApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBBbGxvdyBvbmVycm9yIHRvIGJlIGNhbGxlZCBmaXJzdCxcblx0XHRcdFx0XHRcdFx0Ly8gYnV0IHRoYXQgd2lsbCBub3QgaGFuZGxlIGEgbmF0aXZlIGFib3J0XG5cdFx0XHRcdFx0XHRcdC8vIEFsc28sIHNhdmUgZXJyb3JDYWxsYmFjayB0byBhIHZhcmlhYmxlXG5cdFx0XHRcdFx0XHRcdC8vIGFzIHhoci5vbmVycm9yIGNhbm5vdCBiZSBhY2Nlc3NlZFxuXHRcdFx0XHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGVycm9yQ2FsbGJhY2soKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQ3JlYXRlIHRoZSBhYm9ydCBjYWxsYmFja1xuXHRcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrKCBcImFib3J0XCIgKTtcblxuXHRcdFx0XHR0cnkge1xuXG5cdFx0XHRcdFx0Ly8gRG8gc2VuZCB0aGUgcmVxdWVzdCAodGhpcyBtYXkgcmFpc2UgYW4gZXhjZXB0aW9uKVxuXHRcdFx0XHRcdHhoci5zZW5kKCBvcHRpb25zLmhhc0NvbnRlbnQgJiYgb3B0aW9ucy5kYXRhIHx8IG51bGwgKTtcblx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cblx0XHRcdFx0XHQvLyAjMTQ2ODM6IE9ubHkgcmV0aHJvdyBpZiB0aGlzIGhhc24ndCBiZWVuIG5vdGlmaWVkIGFzIGFuIGVycm9yIHlldFxuXHRcdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0YWJvcnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9XG59ICk7XG5cbn0gKTtcbiJdfQ==