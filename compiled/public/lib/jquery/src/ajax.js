"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define(["./core", "./var/document", "./var/rnothtmlwhite", "./ajax/var/location", "./ajax/var/nonce", "./ajax/var/rquery", "./core/init", "./ajax/parseXML", "./event/trigger", "./deferred", "./serialize" // jQuery.param
], function (jQuery, document, rnothtmlwhite, location, nonce, rquery) {

	"use strict";

	var r20 = /%20/g,
	    rhash = /#.*$/,
	    rantiCache = /([?&])_=[^&]*/,
	    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,


	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	    rnoContent = /^(?:GET|HEAD)$/,
	    rprotocol = /^\/\//,


	/* Prefilters
  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
  * 2) These are called:
  *    - BEFORE asking for a transport
  *    - AFTER param serialization (s.data is a string if s.processData is true)
  * 3) key is the dataType
  * 4) the catchall symbol "*" can be used
  * 5) execution will start with transport dataType and THEN continue down to "*" if needed
  */
	prefilters = {},


	/* Transports bindings
  * 1) key is the dataType
  * 2) the catchall symbol "*" can be used
  * 3) selection will start with transport dataType and THEN go to "*" if needed
  */
	transports = {},


	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*"),


	// Anchor tag for parsing the document origin
	originAnchor = document.createElement("a");
	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {

		// dataTypeExpression is optional and defaults to "*"
		return function (dataTypeExpression, func) {

			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
			    i = 0,
			    dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

			if (jQuery.isFunction(func)) {

				// For each dataType in the dataTypeExpression
				while (dataType = dataTypes[i++]) {

					// Prepend if requested
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

		var inspected = {},
		    seekingTransport = structure === transports;

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		var key,
		    deep,
		    flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
  * - finds the right dataType (mediates between content-type and expected dataType)
  * - returns the corresponding response
  */
	function ajaxHandleResponses(s, jqXHR, responses) {

		var ct,
		    type,
		    finalDataType,
		    firstDataType,
		    contents = s.contents,
		    dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {

			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
  * Also sets the responseXXX fields on the jqXHR instance
  */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2,
		    current,
		    conv,
		    tmp,
		    prev,
		    converters = {},


		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current) {

			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			prev = current;
			current = dataTypes.shift();

			if (current) {

				// There's only work to do if current dataType is non-auto
				if (current === "*") {

					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current) {

					// Seek a direct converter
					conv = converters[prev + " " + current] || converters["* " + current];

					// If none found, seek a pair
					if (!conv) {
						for (conv2 in converters) {

							// If conv2 outputs current
							tmp = conv2.split(" ");
							if (tmp[1] === current) {

								// If prev can be converted to accepted input
								conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
								if (conv) {

									// Condense equivalence converters
									if (conv === true) {
										conv = converters[conv2];

										// Otherwise, insert the intermediate dataType
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.unshift(tmp[1]);
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if (conv !== true) {

						// Unless errors are allowed to bubble, catch and return them
						if (conv && s.throws) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (e) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",

			/*
   timeout: 0,
   data: null,
   dataType: null,
   username: null,
   password: null,
   cache: null,
   throws: false,
   traditional: false,
   headers: {},
   */

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": JSON.parse,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function ajaxSetup(target, settings) {
			return settings ?

			// Building a settings object
			ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

			// Extending ajaxSettings
			ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax: function ajax(url, options) {

			// If url is an object, simulate pre-1.5 signature
			if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,


			// URL without anti-cache param
			cacheURL,


			// Response headers
			responseHeadersString,
			    responseHeaders,


			// timeout handle
			timeoutTimer,


			// Url cleanup var
			urlAnchor,


			// Request state (becomes false upon send and true upon completion)
			completed,


			// To know if global events are to be dispatched
			fireGlobals,


			// Loop variable
			i,


			// uncached part of the url
			uncached,


			// Create the final options object
			s = jQuery.ajaxSetup({}, options),


			// Callbacks context
			callbackContext = s.context || s,


			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


			// Deferreds
			deferred = jQuery.Deferred(),
			    completeDeferred = jQuery.Callbacks("once memory"),


			// Status-dependent callbacks
			_statusCode = s.statusCode || {},


			// Headers (they are sent all at once)
			requestHeaders = {},
			    requestHeadersNames = {},


			// Default abort message
			strAbort = "canceled",


			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function getResponseHeader(key) {
					var match;
					if (completed) {
						if (!responseHeaders) {
							responseHeaders = {};
							while (match = rheaders.exec(responseHeadersString)) {
								responseHeaders[match[1].toLowerCase()] = match[2];
							}
						}
						match = responseHeaders[key.toLowerCase()];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function getAllResponseHeaders() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function setRequestHeader(name, value) {
					if (completed == null) {
						name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
						requestHeaders[name] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function overrideMimeType(type) {
					if (completed == null) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function statusCode(map) {
					var code;
					if (map) {
						if (completed) {

							// Execute the appropriate callbacks
							jqXHR.always(map[jqXHR.status]);
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for (code in map) {
								_statusCode[code] = [_statusCode[code], map[code]];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function abort(statusText) {
					var finalText = statusText || strAbort;
					if (transport) {
						transport.abort(finalText);
					}
					done(0, finalText);
					return this;
				}
			};

			// Attach deferreds
			deferred.promise(jqXHR);

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement("a");

				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
				} catch (e) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (completed) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace(rhash, "");

			// More options handling for requests with no content
			if (!s.hasContent) {

				// Remember the hash so we can put it back
				uncached = s.url.slice(cacheURL.length);

				// If data is available, append data to url
				if (s.data) {
					cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add or update anti-cache param if needed
				if (s.cache === false) {
					cacheURL = cacheURL.replace(rantiCache, "$1");
					uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

				// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
				s.data = s.data.replace(r20, "+");
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			completeDeferred.add(s.complete);
			jqXHR.done(s.success);
			jqXHR.fail(s.error);

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}

				// If request was aborted inside ajaxSend, stop there
				if (completed) {
					return jqXHR;
				}

				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(function () {
						jqXHR.abort("timeout");
					}, s.timeout);
				}

				try {
					completed = false;
					transport.send(requestHeaders, done);
				} catch (e) {

					// Rethrow post-completion exceptions
					if (completed) {
						throw e;
					}

					// Propagate others as results
					done(-1, e);
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess,
				    success,
				    error,
				    response,
				    modified,
				    statusText = nativeStatusText;

				// Ignore repeat invocations
				if (completed) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}

					// if no content
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";

						// if not modified
					} else if (status === 304) {
						statusText = "notmodified";

						// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";

				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(_statusCode);
				_statusCode = undefined;

				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

					// Handle the global AJAX counter
					if (! --jQuery.active) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function getJSON(url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},

		getScript: function getScript(url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		}
	});

	jQuery.each(["get", "post"], function (i, method) {
		jQuery[method] = function (url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject(url) && url));
		};
	});

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9hamF4LmpzIl0sIm5hbWVzIjpbImRlZmluZSIsImpRdWVyeSIsImRvY3VtZW50Iiwicm5vdGh0bWx3aGl0ZSIsImxvY2F0aW9uIiwibm9uY2UiLCJycXVlcnkiLCJyMjAiLCJyaGFzaCIsInJhbnRpQ2FjaGUiLCJyaGVhZGVycyIsInJsb2NhbFByb3RvY29sIiwicm5vQ29udGVudCIsInJwcm90b2NvbCIsInByZWZpbHRlcnMiLCJ0cmFuc3BvcnRzIiwiYWxsVHlwZXMiLCJjb25jYXQiLCJvcmlnaW5BbmNob3IiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsImFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyIsInN0cnVjdHVyZSIsImRhdGFUeXBlRXhwcmVzc2lvbiIsImZ1bmMiLCJkYXRhVHlwZSIsImkiLCJkYXRhVHlwZXMiLCJ0b0xvd2VyQ2FzZSIsIm1hdGNoIiwiaXNGdW5jdGlvbiIsInNsaWNlIiwidW5zaGlmdCIsInB1c2giLCJpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyIsIm9wdGlvbnMiLCJvcmlnaW5hbE9wdGlvbnMiLCJqcVhIUiIsImluc3BlY3RlZCIsInNlZWtpbmdUcmFuc3BvcnQiLCJpbnNwZWN0Iiwic2VsZWN0ZWQiLCJlYWNoIiwiXyIsInByZWZpbHRlck9yRmFjdG9yeSIsImRhdGFUeXBlT3JUcmFuc3BvcnQiLCJhamF4RXh0ZW5kIiwidGFyZ2V0Iiwic3JjIiwia2V5IiwiZGVlcCIsImZsYXRPcHRpb25zIiwiYWpheFNldHRpbmdzIiwidW5kZWZpbmVkIiwiZXh0ZW5kIiwiYWpheEhhbmRsZVJlc3BvbnNlcyIsInMiLCJyZXNwb25zZXMiLCJjdCIsInR5cGUiLCJmaW5hbERhdGFUeXBlIiwiZmlyc3REYXRhVHlwZSIsImNvbnRlbnRzIiwic2hpZnQiLCJtaW1lVHlwZSIsImdldFJlc3BvbnNlSGVhZGVyIiwidGVzdCIsImNvbnZlcnRlcnMiLCJhamF4Q29udmVydCIsInJlc3BvbnNlIiwiaXNTdWNjZXNzIiwiY29udjIiLCJjdXJyZW50IiwiY29udiIsInRtcCIsInByZXYiLCJyZXNwb25zZUZpZWxkcyIsImRhdGFGaWx0ZXIiLCJzcGxpdCIsInRocm93cyIsImUiLCJzdGF0ZSIsImVycm9yIiwiZGF0YSIsImFjdGl2ZSIsImxhc3RNb2RpZmllZCIsImV0YWciLCJ1cmwiLCJpc0xvY2FsIiwicHJvdG9jb2wiLCJnbG9iYWwiLCJwcm9jZXNzRGF0YSIsImFzeW5jIiwiY29udGVudFR5cGUiLCJhY2NlcHRzIiwidGV4dCIsImh0bWwiLCJ4bWwiLCJqc29uIiwiU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwicGFyc2VYTUwiLCJjb250ZXh0IiwiYWpheFNldHVwIiwic2V0dGluZ3MiLCJhamF4UHJlZmlsdGVyIiwiYWpheFRyYW5zcG9ydCIsImFqYXgiLCJ0cmFuc3BvcnQiLCJjYWNoZVVSTCIsInJlc3BvbnNlSGVhZGVyc1N0cmluZyIsInJlc3BvbnNlSGVhZGVycyIsInRpbWVvdXRUaW1lciIsInVybEFuY2hvciIsImNvbXBsZXRlZCIsImZpcmVHbG9iYWxzIiwidW5jYWNoZWQiLCJjYWxsYmFja0NvbnRleHQiLCJnbG9iYWxFdmVudENvbnRleHQiLCJub2RlVHlwZSIsImpxdWVyeSIsImV2ZW50IiwiZGVmZXJyZWQiLCJEZWZlcnJlZCIsImNvbXBsZXRlRGVmZXJyZWQiLCJDYWxsYmFja3MiLCJzdGF0dXNDb2RlIiwicmVxdWVzdEhlYWRlcnMiLCJyZXF1ZXN0SGVhZGVyc05hbWVzIiwic3RyQWJvcnQiLCJyZWFkeVN0YXRlIiwiZXhlYyIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInNldFJlcXVlc3RIZWFkZXIiLCJuYW1lIiwidmFsdWUiLCJvdmVycmlkZU1pbWVUeXBlIiwibWFwIiwiY29kZSIsImFsd2F5cyIsInN0YXR1cyIsImFib3J0Iiwic3RhdHVzVGV4dCIsImZpbmFsVGV4dCIsImRvbmUiLCJwcm9taXNlIiwicmVwbGFjZSIsIm1ldGhvZCIsImNyb3NzRG9tYWluIiwiaG9zdCIsInBhcmFtIiwidHJhZGl0aW9uYWwiLCJ0cmlnZ2VyIiwidG9VcHBlckNhc2UiLCJoYXNDb250ZW50IiwibGVuZ3RoIiwiY2FjaGUiLCJpbmRleE9mIiwiaWZNb2RpZmllZCIsImhlYWRlcnMiLCJiZWZvcmVTZW5kIiwiY2FsbCIsImFkZCIsImNvbXBsZXRlIiwic3VjY2VzcyIsImZhaWwiLCJ0aW1lb3V0Iiwid2luZG93Iiwic2V0VGltZW91dCIsInNlbmQiLCJuYXRpdmVTdGF0dXNUZXh0IiwibW9kaWZpZWQiLCJjbGVhclRpbWVvdXQiLCJyZXNvbHZlV2l0aCIsInJlamVjdFdpdGgiLCJmaXJlV2l0aCIsImdldEpTT04iLCJjYWxsYmFjayIsImdldCIsImdldFNjcmlwdCIsImlzUGxhaW5PYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQUEsT0FBUSxDQUNQLFFBRE8sRUFFUCxnQkFGTyxFQUdQLHFCQUhPLEVBSVAscUJBSk8sRUFLUCxrQkFMTyxFQU1QLG1CQU5PLEVBUVAsYUFSTyxFQVNQLGlCQVRPLEVBVVAsaUJBVk8sRUFXUCxZQVhPLEVBWVAsYUFaTyxDQVlPO0FBWlAsQ0FBUixFQWFHLFVBQVVDLE1BQVYsRUFBa0JDLFFBQWxCLEVBQTRCQyxhQUE1QixFQUEyQ0MsUUFBM0MsRUFBcURDLEtBQXJELEVBQTREQyxNQUE1RCxFQUFxRTs7QUFFeEU7O0FBRUEsS0FDQ0MsTUFBTSxNQURQO0FBQUEsS0FFQ0MsUUFBUSxNQUZUO0FBQUEsS0FHQ0MsYUFBYSxlQUhkO0FBQUEsS0FJQ0MsV0FBVyw0QkFKWjs7O0FBTUM7QUFDQUMsa0JBQWlCLDJEQVBsQjtBQUFBLEtBUUNDLGFBQWEsZ0JBUmQ7QUFBQSxLQVNDQyxZQUFZLE9BVGI7OztBQVdDOzs7Ozs7Ozs7QUFTQUMsY0FBYSxFQXBCZDs7O0FBc0JDOzs7OztBQUtBQyxjQUFhLEVBM0JkOzs7QUE2QkM7QUFDQUMsWUFBVyxLQUFLQyxNQUFMLENBQWEsR0FBYixDQTlCWjs7O0FBZ0NDO0FBQ0FDLGdCQUFlaEIsU0FB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TmQsQ0FBYixDQUFQO0FBT0EsR0FqQkQ7QUFrQkEsRUFuQkQ7O0FBcUJBLFFBQU90RixNQUFQO0FBQ0MsQ0F0MUJEIiwiZmlsZSI6ImFqYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuL2NvcmVcIixcblx0XCIuL3Zhci9kb2N1bWVudFwiLFxuXHRcIi4vdmFyL3Jub3RodG1sd2hpdGVcIixcblx0XCIuL2FqYXgvdmFyL2xvY2F0aW9uXCIsXG5cdFwiLi9hamF4L3Zhci9ub25jZVwiLFxuXHRcIi4vYWpheC92YXIvcnF1ZXJ5XCIsXG5cblx0XCIuL2NvcmUvaW5pdFwiLFxuXHRcIi4vYWpheC9wYXJzZVhNTFwiLFxuXHRcIi4vZXZlbnQvdHJpZ2dlclwiLFxuXHRcIi4vZGVmZXJyZWRcIixcblx0XCIuL3NlcmlhbGl6ZVwiIC8vIGpRdWVyeS5wYXJhbVxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgZG9jdW1lbnQsIHJub3RodG1sd2hpdGUsIGxvY2F0aW9uLCBub25jZSwgcnF1ZXJ5ICkge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyXG5cdHIyMCA9IC8lMjAvZyxcblx0cmhhc2ggPSAvIy4qJC8sXG5cdHJhbnRpQ2FjaGUgPSAvKFs/Jl0pXz1bXiZdKi8sXG5cdHJoZWFkZXJzID0gL14oLio/KTpbIFxcdF0qKFteXFxyXFxuXSopJC9tZyxcblxuXHQvLyAjNzY1MywgIzgxMjUsICM4MTUyOiBsb2NhbCBwcm90b2NvbCBkZXRlY3Rpb25cblx0cmxvY2FsUHJvdG9jb2wgPSAvXig/OmFib3V0fGFwcHxhcHAtc3RvcmFnZXwuKy1leHRlbnNpb258ZmlsZXxyZXN8d2lkZ2V0KTokLyxcblx0cm5vQ29udGVudCA9IC9eKD86R0VUfEhFQUQpJC8sXG5cdHJwcm90b2NvbCA9IC9eXFwvXFwvLyxcblxuXHQvKiBQcmVmaWx0ZXJzXG5cdCAqIDEpIFRoZXkgYXJlIHVzZWZ1bCB0byBpbnRyb2R1Y2UgY3VzdG9tIGRhdGFUeXBlcyAoc2VlIGFqYXgvanNvbnAuanMgZm9yIGFuIGV4YW1wbGUpXG5cdCAqIDIpIFRoZXNlIGFyZSBjYWxsZWQ6XG5cdCAqICAgIC0gQkVGT1JFIGFza2luZyBmb3IgYSB0cmFuc3BvcnRcblx0ICogICAgLSBBRlRFUiBwYXJhbSBzZXJpYWxpemF0aW9uIChzLmRhdGEgaXMgYSBzdHJpbmcgaWYgcy5wcm9jZXNzRGF0YSBpcyB0cnVlKVxuXHQgKiAzKSBrZXkgaXMgdGhlIGRhdGFUeXBlXG5cdCAqIDQpIHRoZSBjYXRjaGFsbCBzeW1ib2wgXCIqXCIgY2FuIGJlIHVzZWRcblx0ICogNSkgZXhlY3V0aW9uIHdpbGwgc3RhcnQgd2l0aCB0cmFuc3BvcnQgZGF0YVR5cGUgYW5kIFRIRU4gY29udGludWUgZG93biB0byBcIipcIiBpZiBuZWVkZWRcblx0ICovXG5cdHByZWZpbHRlcnMgPSB7fSxcblxuXHQvKiBUcmFuc3BvcnRzIGJpbmRpbmdzXG5cdCAqIDEpIGtleSBpcyB0aGUgZGF0YVR5cGVcblx0ICogMikgdGhlIGNhdGNoYWxsIHN5bWJvbCBcIipcIiBjYW4gYmUgdXNlZFxuXHQgKiAzKSBzZWxlY3Rpb24gd2lsbCBzdGFydCB3aXRoIHRyYW5zcG9ydCBkYXRhVHlwZSBhbmQgVEhFTiBnbyB0byBcIipcIiBpZiBuZWVkZWRcblx0ICovXG5cdHRyYW5zcG9ydHMgPSB7fSxcblxuXHQvLyBBdm9pZCBjb21tZW50LXByb2xvZyBjaGFyIHNlcXVlbmNlICgjMTAwOTgpOyBtdXN0IGFwcGVhc2UgbGludCBhbmQgZXZhZGUgY29tcHJlc3Npb25cblx0YWxsVHlwZXMgPSBcIiovXCIuY29uY2F0KCBcIipcIiApLFxuXG5cdC8vIEFuY2hvciB0YWcgZm9yIHBhcnNpbmcgdGhlIGRvY3VtZW50IG9yaWdpblxuXHRvcmlnaW5BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImFcIiApO1xuXHRvcmlnaW5BbmNob3IuaHJlZiA9IGxvY2F0aW9uLmhyZWY7XG5cbi8vIEJhc2UgXCJjb25zdHJ1Y3RvclwiIGZvciBqUXVlcnkuYWpheFByZWZpbHRlciBhbmQgalF1ZXJ5LmFqYXhUcmFuc3BvcnRcbmZ1bmN0aW9uIGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlICkge1xuXG5cdC8vIGRhdGFUeXBlRXhwcmVzc2lvbiBpcyBvcHRpb25hbCBhbmQgZGVmYXVsdHMgdG8gXCIqXCJcblx0cmV0dXJuIGZ1bmN0aW9uKCBkYXRhVHlwZUV4cHJlc3Npb24sIGZ1bmMgKSB7XG5cblx0XHRpZiAoIHR5cGVvZiBkYXRhVHlwZUV4cHJlc3Npb24gIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRmdW5jID0gZGF0YVR5cGVFeHByZXNzaW9uO1xuXHRcdFx0ZGF0YVR5cGVFeHByZXNzaW9uID0gXCIqXCI7XG5cdFx0fVxuXG5cdFx0dmFyIGRhdGFUeXBlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRkYXRhVHlwZXMgPSBkYXRhVHlwZUV4cHJlc3Npb24udG9Mb3dlckNhc2UoKS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggZnVuYyApICkge1xuXG5cdFx0XHQvLyBGb3IgZWFjaCBkYXRhVHlwZSBpbiB0aGUgZGF0YVR5cGVFeHByZXNzaW9uXG5cdFx0XHR3aGlsZSAoICggZGF0YVR5cGUgPSBkYXRhVHlwZXNbIGkrKyBdICkgKSB7XG5cblx0XHRcdFx0Ly8gUHJlcGVuZCBpZiByZXF1ZXN0ZWRcblx0XHRcdFx0aWYgKCBkYXRhVHlwZVsgMCBdID09PSBcIitcIiApIHtcblx0XHRcdFx0XHRkYXRhVHlwZSA9IGRhdGFUeXBlLnNsaWNlKCAxICkgfHwgXCIqXCI7XG5cdFx0XHRcdFx0KCBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gPSBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gfHwgW10gKS51bnNoaWZ0KCBmdW5jICk7XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIGFwcGVuZFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCggc3RydWN0dXJlWyBkYXRhVHlwZSBdID0gc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdICkucHVzaCggZnVuYyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuXG4vLyBCYXNlIGluc3BlY3Rpb24gZnVuY3Rpb24gZm9yIHByZWZpbHRlcnMgYW5kIHRyYW5zcG9ydHNcbmZ1bmN0aW9uIGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBzdHJ1Y3R1cmUsIG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywganFYSFIgKSB7XG5cblx0dmFyIGluc3BlY3RlZCA9IHt9LFxuXHRcdHNlZWtpbmdUcmFuc3BvcnQgPSAoIHN0cnVjdHVyZSA9PT0gdHJhbnNwb3J0cyApO1xuXG5cdGZ1bmN0aW9uIGluc3BlY3QoIGRhdGFUeXBlICkge1xuXHRcdHZhciBzZWxlY3RlZDtcblx0XHRpbnNwZWN0ZWRbIGRhdGFUeXBlIF0gPSB0cnVlO1xuXHRcdGpRdWVyeS5lYWNoKCBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gfHwgW10sIGZ1bmN0aW9uKCBfLCBwcmVmaWx0ZXJPckZhY3RvcnkgKSB7XG5cdFx0XHR2YXIgZGF0YVR5cGVPclRyYW5zcG9ydCA9IHByZWZpbHRlck9yRmFjdG9yeSggb3B0aW9ucywgb3JpZ2luYWxPcHRpb25zLCBqcVhIUiApO1xuXHRcdFx0aWYgKCB0eXBlb2YgZGF0YVR5cGVPclRyYW5zcG9ydCA9PT0gXCJzdHJpbmdcIiAmJlxuXHRcdFx0XHQhc2Vla2luZ1RyYW5zcG9ydCAmJiAhaW5zcGVjdGVkWyBkYXRhVHlwZU9yVHJhbnNwb3J0IF0gKSB7XG5cblx0XHRcdFx0b3B0aW9ucy5kYXRhVHlwZXMudW5zaGlmdCggZGF0YVR5cGVPclRyYW5zcG9ydCApO1xuXHRcdFx0XHRpbnNwZWN0KCBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZSBpZiAoIHNlZWtpbmdUcmFuc3BvcnQgKSB7XG5cdFx0XHRcdHJldHVybiAhKCBzZWxlY3RlZCA9IGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdFx0cmV0dXJuIHNlbGVjdGVkO1xuXHR9XG5cblx0cmV0dXJuIGluc3BlY3QoIG9wdGlvbnMuZGF0YVR5cGVzWyAwIF0gKSB8fCAhaW5zcGVjdGVkWyBcIipcIiBdICYmIGluc3BlY3QoIFwiKlwiICk7XG59XG5cbi8vIEEgc3BlY2lhbCBleHRlbmQgZm9yIGFqYXggb3B0aW9uc1xuLy8gdGhhdCB0YWtlcyBcImZsYXRcIiBvcHRpb25zIChub3QgdG8gYmUgZGVlcCBleHRlbmRlZClcbi8vIEZpeGVzICM5ODg3XG5mdW5jdGlvbiBhamF4RXh0ZW5kKCB0YXJnZXQsIHNyYyApIHtcblx0dmFyIGtleSwgZGVlcCxcblx0XHRmbGF0T3B0aW9ucyA9IGpRdWVyeS5hamF4U2V0dGluZ3MuZmxhdE9wdGlvbnMgfHwge307XG5cblx0Zm9yICgga2V5IGluIHNyYyApIHtcblx0XHRpZiAoIHNyY1sga2V5IF0gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdCggZmxhdE9wdGlvbnNbIGtleSBdID8gdGFyZ2V0IDogKCBkZWVwIHx8ICggZGVlcCA9IHt9ICkgKSApWyBrZXkgXSA9IHNyY1sga2V5IF07XG5cdFx0fVxuXHR9XG5cdGlmICggZGVlcCApIHtcblx0XHRqUXVlcnkuZXh0ZW5kKCB0cnVlLCB0YXJnZXQsIGRlZXAgKTtcblx0fVxuXG5cdHJldHVybiB0YXJnZXQ7XG59XG5cbi8qIEhhbmRsZXMgcmVzcG9uc2VzIHRvIGFuIGFqYXggcmVxdWVzdDpcbiAqIC0gZmluZHMgdGhlIHJpZ2h0IGRhdGFUeXBlIChtZWRpYXRlcyBiZXR3ZWVuIGNvbnRlbnQtdHlwZSBhbmQgZXhwZWN0ZWQgZGF0YVR5cGUpXG4gKiAtIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgcmVzcG9uc2VcbiAqL1xuZnVuY3Rpb24gYWpheEhhbmRsZVJlc3BvbnNlcyggcywganFYSFIsIHJlc3BvbnNlcyApIHtcblxuXHR2YXIgY3QsIHR5cGUsIGZpbmFsRGF0YVR5cGUsIGZpcnN0RGF0YVR5cGUsXG5cdFx0Y29udGVudHMgPSBzLmNvbnRlbnRzLFxuXHRcdGRhdGFUeXBlcyA9IHMuZGF0YVR5cGVzO1xuXG5cdC8vIFJlbW92ZSBhdXRvIGRhdGFUeXBlIGFuZCBnZXQgY29udGVudC10eXBlIGluIHRoZSBwcm9jZXNzXG5cdHdoaWxlICggZGF0YVR5cGVzWyAwIF0gPT09IFwiKlwiICkge1xuXHRcdGRhdGFUeXBlcy5zaGlmdCgpO1xuXHRcdGlmICggY3QgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGN0ID0gcy5taW1lVHlwZSB8fCBqcVhIUi5nZXRSZXNwb25zZUhlYWRlciggXCJDb250ZW50LVR5cGVcIiApO1xuXHRcdH1cblx0fVxuXG5cdC8vIENoZWNrIGlmIHdlJ3JlIGRlYWxpbmcgd2l0aCBhIGtub3duIGNvbnRlbnQtdHlwZVxuXHRpZiAoIGN0ICkge1xuXHRcdGZvciAoIHR5cGUgaW4gY29udGVudHMgKSB7XG5cdFx0XHRpZiAoIGNvbnRlbnRzWyB0eXBlIF0gJiYgY29udGVudHNbIHR5cGUgXS50ZXN0KCBjdCApICkge1xuXHRcdFx0XHRkYXRhVHlwZXMudW5zaGlmdCggdHlwZSApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBDaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBhIHJlc3BvbnNlIGZvciB0aGUgZXhwZWN0ZWQgZGF0YVR5cGVcblx0aWYgKCBkYXRhVHlwZXNbIDAgXSBpbiByZXNwb25zZXMgKSB7XG5cdFx0ZmluYWxEYXRhVHlwZSA9IGRhdGFUeXBlc1sgMCBdO1xuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gVHJ5IGNvbnZlcnRpYmxlIGRhdGFUeXBlc1xuXHRcdGZvciAoIHR5cGUgaW4gcmVzcG9uc2VzICkge1xuXHRcdFx0aWYgKCAhZGF0YVR5cGVzWyAwIF0gfHwgcy5jb252ZXJ0ZXJzWyB0eXBlICsgXCIgXCIgKyBkYXRhVHlwZXNbIDAgXSBdICkge1xuXHRcdFx0XHRmaW5hbERhdGFUeXBlID0gdHlwZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoICFmaXJzdERhdGFUeXBlICkge1xuXHRcdFx0XHRmaXJzdERhdGFUeXBlID0gdHlwZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBPciBqdXN0IHVzZSBmaXJzdCBvbmVcblx0XHRmaW5hbERhdGFUeXBlID0gZmluYWxEYXRhVHlwZSB8fCBmaXJzdERhdGFUeXBlO1xuXHR9XG5cblx0Ly8gSWYgd2UgZm91bmQgYSBkYXRhVHlwZVxuXHQvLyBXZSBhZGQgdGhlIGRhdGFUeXBlIHRvIHRoZSBsaXN0IGlmIG5lZWRlZFxuXHQvLyBhbmQgcmV0dXJuIHRoZSBjb3JyZXNwb25kaW5nIHJlc3BvbnNlXG5cdGlmICggZmluYWxEYXRhVHlwZSApIHtcblx0XHRpZiAoIGZpbmFsRGF0YVR5cGUgIT09IGRhdGFUeXBlc1sgMCBdICkge1xuXHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIGZpbmFsRGF0YVR5cGUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3BvbnNlc1sgZmluYWxEYXRhVHlwZSBdO1xuXHR9XG59XG5cbi8qIENoYWluIGNvbnZlcnNpb25zIGdpdmVuIHRoZSByZXF1ZXN0IGFuZCB0aGUgb3JpZ2luYWwgcmVzcG9uc2VcbiAqIEFsc28gc2V0cyB0aGUgcmVzcG9uc2VYWFggZmllbGRzIG9uIHRoZSBqcVhIUiBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBhamF4Q29udmVydCggcywgcmVzcG9uc2UsIGpxWEhSLCBpc1N1Y2Nlc3MgKSB7XG5cdHZhciBjb252MiwgY3VycmVudCwgY29udiwgdG1wLCBwcmV2LFxuXHRcdGNvbnZlcnRlcnMgPSB7fSxcblxuXHRcdC8vIFdvcmsgd2l0aCBhIGNvcHkgb2YgZGF0YVR5cGVzIGluIGNhc2Ugd2UgbmVlZCB0byBtb2RpZnkgaXQgZm9yIGNvbnZlcnNpb25cblx0XHRkYXRhVHlwZXMgPSBzLmRhdGFUeXBlcy5zbGljZSgpO1xuXG5cdC8vIENyZWF0ZSBjb252ZXJ0ZXJzIG1hcCB3aXRoIGxvd2VyY2FzZWQga2V5c1xuXHRpZiAoIGRhdGFUeXBlc1sgMSBdICkge1xuXHRcdGZvciAoIGNvbnYgaW4gcy5jb252ZXJ0ZXJzICkge1xuXHRcdFx0Y29udmVydGVyc1sgY29udi50b0xvd2VyQ2FzZSgpIF0gPSBzLmNvbnZlcnRlcnNbIGNvbnYgXTtcblx0XHR9XG5cdH1cblxuXHRjdXJyZW50ID0gZGF0YVR5cGVzLnNoaWZ0KCk7XG5cblx0Ly8gQ29udmVydCB0byBlYWNoIHNlcXVlbnRpYWwgZGF0YVR5cGVcblx0d2hpbGUgKCBjdXJyZW50ICkge1xuXG5cdFx0aWYgKCBzLnJlc3BvbnNlRmllbGRzWyBjdXJyZW50IF0gKSB7XG5cdFx0XHRqcVhIUlsgcy5yZXNwb25zZUZpZWxkc1sgY3VycmVudCBdIF0gPSByZXNwb25zZTtcblx0XHR9XG5cblx0XHQvLyBBcHBseSB0aGUgZGF0YUZpbHRlciBpZiBwcm92aWRlZFxuXHRcdGlmICggIXByZXYgJiYgaXNTdWNjZXNzICYmIHMuZGF0YUZpbHRlciApIHtcblx0XHRcdHJlc3BvbnNlID0gcy5kYXRhRmlsdGVyKCByZXNwb25zZSwgcy5kYXRhVHlwZSApO1xuXHRcdH1cblxuXHRcdHByZXYgPSBjdXJyZW50O1xuXHRcdGN1cnJlbnQgPSBkYXRhVHlwZXMuc2hpZnQoKTtcblxuXHRcdGlmICggY3VycmVudCApIHtcblxuXHRcdFx0Ly8gVGhlcmUncyBvbmx5IHdvcmsgdG8gZG8gaWYgY3VycmVudCBkYXRhVHlwZSBpcyBub24tYXV0b1xuXHRcdFx0aWYgKCBjdXJyZW50ID09PSBcIipcIiApIHtcblxuXHRcdFx0XHRjdXJyZW50ID0gcHJldjtcblxuXHRcdFx0Ly8gQ29udmVydCByZXNwb25zZSBpZiBwcmV2IGRhdGFUeXBlIGlzIG5vbi1hdXRvIGFuZCBkaWZmZXJzIGZyb20gY3VycmVudFxuXHRcdFx0fSBlbHNlIGlmICggcHJldiAhPT0gXCIqXCIgJiYgcHJldiAhPT0gY3VycmVudCApIHtcblxuXHRcdFx0XHQvLyBTZWVrIGEgZGlyZWN0IGNvbnZlcnRlclxuXHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgY3VycmVudCBdIHx8IGNvbnZlcnRlcnNbIFwiKiBcIiArIGN1cnJlbnQgXTtcblxuXHRcdFx0XHQvLyBJZiBub25lIGZvdW5kLCBzZWVrIGEgcGFpclxuXHRcdFx0XHRpZiAoICFjb252ICkge1xuXHRcdFx0XHRcdGZvciAoIGNvbnYyIGluIGNvbnZlcnRlcnMgKSB7XG5cblx0XHRcdFx0XHRcdC8vIElmIGNvbnYyIG91dHB1dHMgY3VycmVudFxuXHRcdFx0XHRcdFx0dG1wID0gY29udjIuc3BsaXQoIFwiIFwiICk7XG5cdFx0XHRcdFx0XHRpZiAoIHRtcFsgMSBdID09PSBjdXJyZW50ICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIElmIHByZXYgY2FuIGJlIGNvbnZlcnRlZCB0byBhY2NlcHRlZCBpbnB1dFxuXHRcdFx0XHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgdG1wWyAwIF0gXSB8fFxuXHRcdFx0XHRcdFx0XHRcdGNvbnZlcnRlcnNbIFwiKiBcIiArIHRtcFsgMCBdIF07XG5cdFx0XHRcdFx0XHRcdGlmICggY29udiApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIENvbmRlbnNlIGVxdWl2YWxlbmNlIGNvbnZlcnRlcnNcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGNvbnYgPT09IHRydWUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgY29udjIgXTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIE90aGVyd2lzZSwgaW5zZXJ0IHRoZSBpbnRlcm1lZGlhdGUgZGF0YVR5cGVcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBjb252ZXJ0ZXJzWyBjb252MiBdICE9PSB0cnVlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3VycmVudCA9IHRtcFsgMCBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIHRtcFsgMSBdICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQXBwbHkgY29udmVydGVyIChpZiBub3QgYW4gZXF1aXZhbGVuY2UpXG5cdFx0XHRcdGlmICggY29udiAhPT0gdHJ1ZSApIHtcblxuXHRcdFx0XHRcdC8vIFVubGVzcyBlcnJvcnMgYXJlIGFsbG93ZWQgdG8gYnViYmxlLCBjYXRjaCBhbmQgcmV0dXJuIHRoZW1cblx0XHRcdFx0XHRpZiAoIGNvbnYgJiYgcy50aHJvd3MgKSB7XG5cdFx0XHRcdFx0XHRyZXNwb25zZSA9IGNvbnYoIHJlc3BvbnNlICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gY29udiggcmVzcG9uc2UgKTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdHN0YXRlOiBcInBhcnNlcmVycm9yXCIsXG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGNvbnYgPyBlIDogXCJObyBjb252ZXJzaW9uIGZyb20gXCIgKyBwcmV2ICsgXCIgdG8gXCIgKyBjdXJyZW50XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHsgc3RhdGU6IFwic3VjY2Vzc1wiLCBkYXRhOiByZXNwb25zZSB9O1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0Ly8gQ291bnRlciBmb3IgaG9sZGluZyB0aGUgbnVtYmVyIG9mIGFjdGl2ZSBxdWVyaWVzXG5cdGFjdGl2ZTogMCxcblxuXHQvLyBMYXN0LU1vZGlmaWVkIGhlYWRlciBjYWNoZSBmb3IgbmV4dCByZXF1ZXN0XG5cdGxhc3RNb2RpZmllZDoge30sXG5cdGV0YWc6IHt9LFxuXG5cdGFqYXhTZXR0aW5nczoge1xuXHRcdHVybDogbG9jYXRpb24uaHJlZixcblx0XHR0eXBlOiBcIkdFVFwiLFxuXHRcdGlzTG9jYWw6IHJsb2NhbFByb3RvY29sLnRlc3QoIGxvY2F0aW9uLnByb3RvY29sICksXG5cdFx0Z2xvYmFsOiB0cnVlLFxuXHRcdHByb2Nlc3NEYXRhOiB0cnVlLFxuXHRcdGFzeW5jOiB0cnVlLFxuXHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOFwiLFxuXG5cdFx0Lypcblx0XHR0aW1lb3V0OiAwLFxuXHRcdGRhdGE6IG51bGwsXG5cdFx0ZGF0YVR5cGU6IG51bGwsXG5cdFx0dXNlcm5hbWU6IG51bGwsXG5cdFx0cGFzc3dvcmQ6IG51bGwsXG5cdFx0Y2FjaGU6IG51bGwsXG5cdFx0dGhyb3dzOiBmYWxzZSxcblx0XHR0cmFkaXRpb25hbDogZmFsc2UsXG5cdFx0aGVhZGVyczoge30sXG5cdFx0Ki9cblxuXHRcdGFjY2VwdHM6IHtcblx0XHRcdFwiKlwiOiBhbGxUeXBlcyxcblx0XHRcdHRleHQ6IFwidGV4dC9wbGFpblwiLFxuXHRcdFx0aHRtbDogXCJ0ZXh0L2h0bWxcIixcblx0XHRcdHhtbDogXCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsXG5cdFx0XHRqc29uOiBcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdFwiXG5cdFx0fSxcblxuXHRcdGNvbnRlbnRzOiB7XG5cdFx0XHR4bWw6IC9cXGJ4bWxcXGIvLFxuXHRcdFx0aHRtbDogL1xcYmh0bWwvLFxuXHRcdFx0anNvbjogL1xcYmpzb25cXGIvXG5cdFx0fSxcblxuXHRcdHJlc3BvbnNlRmllbGRzOiB7XG5cdFx0XHR4bWw6IFwicmVzcG9uc2VYTUxcIixcblx0XHRcdHRleHQ6IFwicmVzcG9uc2VUZXh0XCIsXG5cdFx0XHRqc29uOiBcInJlc3BvbnNlSlNPTlwiXG5cdFx0fSxcblxuXHRcdC8vIERhdGEgY29udmVydGVyc1xuXHRcdC8vIEtleXMgc2VwYXJhdGUgc291cmNlIChvciBjYXRjaGFsbCBcIipcIikgYW5kIGRlc3RpbmF0aW9uIHR5cGVzIHdpdGggYSBzaW5nbGUgc3BhY2Vcblx0XHRjb252ZXJ0ZXJzOiB7XG5cblx0XHRcdC8vIENvbnZlcnQgYW55dGhpbmcgdG8gdGV4dFxuXHRcdFx0XCIqIHRleHRcIjogU3RyaW5nLFxuXG5cdFx0XHQvLyBUZXh0IHRvIGh0bWwgKHRydWUgPSBubyB0cmFuc2Zvcm1hdGlvbilcblx0XHRcdFwidGV4dCBodG1sXCI6IHRydWUsXG5cblx0XHRcdC8vIEV2YWx1YXRlIHRleHQgYXMgYSBqc29uIGV4cHJlc3Npb25cblx0XHRcdFwidGV4dCBqc29uXCI6IEpTT04ucGFyc2UsXG5cblx0XHRcdC8vIFBhcnNlIHRleHQgYXMgeG1sXG5cdFx0XHRcInRleHQgeG1sXCI6IGpRdWVyeS5wYXJzZVhNTFxuXHRcdH0sXG5cblx0XHQvLyBGb3Igb3B0aW9ucyB0aGF0IHNob3VsZG4ndCBiZSBkZWVwIGV4dGVuZGVkOlxuXHRcdC8vIHlvdSBjYW4gYWRkIHlvdXIgb3duIGN1c3RvbSBvcHRpb25zIGhlcmUgaWZcblx0XHQvLyBhbmQgd2hlbiB5b3UgY3JlYXRlIG9uZSB0aGF0IHNob3VsZG4ndCBiZVxuXHRcdC8vIGRlZXAgZXh0ZW5kZWQgKHNlZSBhamF4RXh0ZW5kKVxuXHRcdGZsYXRPcHRpb25zOiB7XG5cdFx0XHR1cmw6IHRydWUsXG5cdFx0XHRjb250ZXh0OiB0cnVlXG5cdFx0fVxuXHR9LFxuXG5cdC8vIENyZWF0ZXMgYSBmdWxsIGZsZWRnZWQgc2V0dGluZ3Mgb2JqZWN0IGludG8gdGFyZ2V0XG5cdC8vIHdpdGggYm90aCBhamF4U2V0dGluZ3MgYW5kIHNldHRpbmdzIGZpZWxkcy5cblx0Ly8gSWYgdGFyZ2V0IGlzIG9taXR0ZWQsIHdyaXRlcyBpbnRvIGFqYXhTZXR0aW5ncy5cblx0YWpheFNldHVwOiBmdW5jdGlvbiggdGFyZ2V0LCBzZXR0aW5ncyApIHtcblx0XHRyZXR1cm4gc2V0dGluZ3MgP1xuXG5cdFx0XHQvLyBCdWlsZGluZyBhIHNldHRpbmdzIG9iamVjdFxuXHRcdFx0YWpheEV4dGVuZCggYWpheEV4dGVuZCggdGFyZ2V0LCBqUXVlcnkuYWpheFNldHRpbmdzICksIHNldHRpbmdzICkgOlxuXG5cdFx0XHQvLyBFeHRlbmRpbmcgYWpheFNldHRpbmdzXG5cdFx0XHRhamF4RXh0ZW5kKCBqUXVlcnkuYWpheFNldHRpbmdzLCB0YXJnZXQgKTtcblx0fSxcblxuXHRhamF4UHJlZmlsdGVyOiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHByZWZpbHRlcnMgKSxcblx0YWpheFRyYW5zcG9ydDogYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzICksXG5cblx0Ly8gTWFpbiBtZXRob2Rcblx0YWpheDogZnVuY3Rpb24oIHVybCwgb3B0aW9ucyApIHtcblxuXHRcdC8vIElmIHVybCBpcyBhbiBvYmplY3QsIHNpbXVsYXRlIHByZS0xLjUgc2lnbmF0dXJlXG5cdFx0aWYgKCB0eXBlb2YgdXJsID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0b3B0aW9ucyA9IHVybDtcblx0XHRcdHVybCA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHQvLyBGb3JjZSBvcHRpb25zIHRvIGJlIGFuIG9iamVjdFxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0dmFyIHRyYW5zcG9ydCxcblxuXHRcdFx0Ly8gVVJMIHdpdGhvdXQgYW50aS1jYWNoZSBwYXJhbVxuXHRcdFx0Y2FjaGVVUkwsXG5cblx0XHRcdC8vIFJlc3BvbnNlIGhlYWRlcnNcblx0XHRcdHJlc3BvbnNlSGVhZGVyc1N0cmluZyxcblx0XHRcdHJlc3BvbnNlSGVhZGVycyxcblxuXHRcdFx0Ly8gdGltZW91dCBoYW5kbGVcblx0XHRcdHRpbWVvdXRUaW1lcixcblxuXHRcdFx0Ly8gVXJsIGNsZWFudXAgdmFyXG5cdFx0XHR1cmxBbmNob3IsXG5cblx0XHRcdC8vIFJlcXVlc3Qgc3RhdGUgKGJlY29tZXMgZmFsc2UgdXBvbiBzZW5kIGFuZCB0cnVlIHVwb24gY29tcGxldGlvbilcblx0XHRcdGNvbXBsZXRlZCxcblxuXHRcdFx0Ly8gVG8ga25vdyBpZiBnbG9iYWwgZXZlbnRzIGFyZSB0byBiZSBkaXNwYXRjaGVkXG5cdFx0XHRmaXJlR2xvYmFscyxcblxuXHRcdFx0Ly8gTG9vcCB2YXJpYWJsZVxuXHRcdFx0aSxcblxuXHRcdFx0Ly8gdW5jYWNoZWQgcGFydCBvZiB0aGUgdXJsXG5cdFx0XHR1bmNhY2hlZCxcblxuXHRcdFx0Ly8gQ3JlYXRlIHRoZSBmaW5hbCBvcHRpb25zIG9iamVjdFxuXHRcdFx0cyA9IGpRdWVyeS5hamF4U2V0dXAoIHt9LCBvcHRpb25zICksXG5cblx0XHRcdC8vIENhbGxiYWNrcyBjb250ZXh0XG5cdFx0XHRjYWxsYmFja0NvbnRleHQgPSBzLmNvbnRleHQgfHwgcyxcblxuXHRcdFx0Ly8gQ29udGV4dCBmb3IgZ2xvYmFsIGV2ZW50cyBpcyBjYWxsYmFja0NvbnRleHQgaWYgaXQgaXMgYSBET00gbm9kZSBvciBqUXVlcnkgY29sbGVjdGlvblxuXHRcdFx0Z2xvYmFsRXZlbnRDb250ZXh0ID0gcy5jb250ZXh0ICYmXG5cdFx0XHRcdCggY2FsbGJhY2tDb250ZXh0Lm5vZGVUeXBlIHx8IGNhbGxiYWNrQ29udGV4dC5qcXVlcnkgKSA/XG5cdFx0XHRcdFx0alF1ZXJ5KCBjYWxsYmFja0NvbnRleHQgKSA6XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LFxuXG5cdFx0XHQvLyBEZWZlcnJlZHNcblx0XHRcdGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG5cdFx0XHRjb21wbGV0ZURlZmVycmVkID0galF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksXG5cblx0XHRcdC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG5cdFx0XHRzdGF0dXNDb2RlID0gcy5zdGF0dXNDb2RlIHx8IHt9LFxuXG5cdFx0XHQvLyBIZWFkZXJzICh0aGV5IGFyZSBzZW50IGFsbCBhdCBvbmNlKVxuXHRcdFx0cmVxdWVzdEhlYWRlcnMgPSB7fSxcblx0XHRcdHJlcXVlc3RIZWFkZXJzTmFtZXMgPSB7fSxcblxuXHRcdFx0Ly8gRGVmYXVsdCBhYm9ydCBtZXNzYWdlXG5cdFx0XHRzdHJBYm9ydCA9IFwiY2FuY2VsZWRcIixcblxuXHRcdFx0Ly8gRmFrZSB4aHJcblx0XHRcdGpxWEhSID0ge1xuXHRcdFx0XHRyZWFkeVN0YXRlOiAwLFxuXG5cdFx0XHRcdC8vIEJ1aWxkcyBoZWFkZXJzIGhhc2h0YWJsZSBpZiBuZWVkZWRcblx0XHRcdFx0Z2V0UmVzcG9uc2VIZWFkZXI6IGZ1bmN0aW9uKCBrZXkgKSB7XG5cdFx0XHRcdFx0dmFyIG1hdGNoO1xuXHRcdFx0XHRcdGlmICggY29tcGxldGVkICkge1xuXHRcdFx0XHRcdFx0aWYgKCAhcmVzcG9uc2VIZWFkZXJzICkge1xuXHRcdFx0XHRcdFx0XHRyZXNwb25zZUhlYWRlcnMgPSB7fTtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKCAoIG1hdGNoID0gcmhlYWRlcnMuZXhlYyggcmVzcG9uc2VIZWFkZXJzU3RyaW5nICkgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZUhlYWRlcnNbIG1hdGNoWyAxIF0udG9Mb3dlckNhc2UoKSBdID0gbWF0Y2hbIDIgXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bWF0Y2ggPSByZXNwb25zZUhlYWRlcnNbIGtleS50b0xvd2VyQ2FzZSgpIF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBtYXRjaCA9PSBudWxsID8gbnVsbCA6IG1hdGNoO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFJhdyBzdHJpbmdcblx0XHRcdFx0Z2V0QWxsUmVzcG9uc2VIZWFkZXJzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gY29tcGxldGVkID8gcmVzcG9uc2VIZWFkZXJzU3RyaW5nIDogbnVsbDtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBDYWNoZXMgdGhlIGhlYWRlclxuXHRcdFx0XHRzZXRSZXF1ZXN0SGVhZGVyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0XHRcdFx0aWYgKCBjb21wbGV0ZWQgPT0gbnVsbCApIHtcblx0XHRcdFx0XHRcdG5hbWUgPSByZXF1ZXN0SGVhZGVyc05hbWVzWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSA9XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RIZWFkZXJzTmFtZXNbIG5hbWUudG9Mb3dlckNhc2UoKSBdIHx8IG5hbWU7XG5cdFx0XHRcdFx0XHRyZXF1ZXN0SGVhZGVyc1sgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIE92ZXJyaWRlcyByZXNwb25zZSBjb250ZW50LXR5cGUgaGVhZGVyXG5cdFx0XHRcdG92ZXJyaWRlTWltZVR5cGU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdFx0XHRcdGlmICggY29tcGxldGVkID09IG51bGwgKSB7XG5cdFx0XHRcdFx0XHRzLm1pbWVUeXBlID0gdHlwZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3Ncblx0XHRcdFx0c3RhdHVzQ29kZTogZnVuY3Rpb24oIG1hcCApIHtcblx0XHRcdFx0XHR2YXIgY29kZTtcblx0XHRcdFx0XHRpZiAoIG1hcCApIHtcblx0XHRcdFx0XHRcdGlmICggY29tcGxldGVkICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEV4ZWN1dGUgdGhlIGFwcHJvcHJpYXRlIGNhbGxiYWNrc1xuXHRcdFx0XHRcdFx0XHRqcVhIUi5hbHdheXMoIG1hcFsganFYSFIuc3RhdHVzIF0gKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gTGF6eS1hZGQgdGhlIG5ldyBjYWxsYmFja3MgaW4gYSB3YXkgdGhhdCBwcmVzZXJ2ZXMgb2xkIG9uZXNcblx0XHRcdFx0XHRcdFx0Zm9yICggY29kZSBpbiBtYXAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZVsgY29kZSBdID0gWyBzdGF0dXNDb2RlWyBjb2RlIF0sIG1hcFsgY29kZSBdIF07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gQ2FuY2VsIHRoZSByZXF1ZXN0XG5cdFx0XHRcdGFib3J0OiBmdW5jdGlvbiggc3RhdHVzVGV4dCApIHtcblx0XHRcdFx0XHR2YXIgZmluYWxUZXh0ID0gc3RhdHVzVGV4dCB8fCBzdHJBYm9ydDtcblx0XHRcdFx0XHRpZiAoIHRyYW5zcG9ydCApIHtcblx0XHRcdFx0XHRcdHRyYW5zcG9ydC5hYm9ydCggZmluYWxUZXh0ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRvbmUoIDAsIGZpbmFsVGV4dCApO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0Ly8gQXR0YWNoIGRlZmVycmVkc1xuXHRcdGRlZmVycmVkLnByb21pc2UoIGpxWEhSICk7XG5cblx0XHQvLyBBZGQgcHJvdG9jb2wgaWYgbm90IHByb3ZpZGVkIChwcmVmaWx0ZXJzIG1pZ2h0IGV4cGVjdCBpdClcblx0XHQvLyBIYW5kbGUgZmFsc3kgdXJsIGluIHRoZSBzZXR0aW5ncyBvYmplY3QgKCMxMDA5MzogY29uc2lzdGVuY3kgd2l0aCBvbGQgc2lnbmF0dXJlKVxuXHRcdC8vIFdlIGFsc28gdXNlIHRoZSB1cmwgcGFyYW1ldGVyIGlmIGF2YWlsYWJsZVxuXHRcdHMudXJsID0gKCAoIHVybCB8fCBzLnVybCB8fCBsb2NhdGlvbi5ocmVmICkgKyBcIlwiIClcblx0XHRcdC5yZXBsYWNlKCBycHJvdG9jb2wsIGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICk7XG5cblx0XHQvLyBBbGlhcyBtZXRob2Qgb3B0aW9uIHRvIHR5cGUgYXMgcGVyIHRpY2tldCAjMTIwMDRcblx0XHRzLnR5cGUgPSBvcHRpb25zLm1ldGhvZCB8fCBvcHRpb25zLnR5cGUgfHwgcy5tZXRob2QgfHwgcy50eXBlO1xuXG5cdFx0Ly8gRXh0cmFjdCBkYXRhVHlwZXMgbGlzdFxuXHRcdHMuZGF0YVR5cGVzID0gKCBzLmRhdGFUeXBlIHx8IFwiKlwiICkudG9Mb3dlckNhc2UoKS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXG5cdFx0Ly8gQSBjcm9zcy1kb21haW4gcmVxdWVzdCBpcyBpbiBvcmRlciB3aGVuIHRoZSBvcmlnaW4gZG9lc24ndCBtYXRjaCB0aGUgY3VycmVudCBvcmlnaW4uXG5cdFx0aWYgKCBzLmNyb3NzRG9tYWluID09IG51bGwgKSB7XG5cdFx0XHR1cmxBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImFcIiApO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTggLSAxMSwgRWRnZSAxMiAtIDEzXG5cdFx0XHQvLyBJRSB0aHJvd3MgZXhjZXB0aW9uIG9uIGFjY2Vzc2luZyB0aGUgaHJlZiBwcm9wZXJ0eSBpZiB1cmwgaXMgbWFsZm9ybWVkLFxuXHRcdFx0Ly8gZS5nLiBodHRwOi8vZXhhbXBsZS5jb206ODB4L1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dXJsQW5jaG9yLmhyZWYgPSBzLnVybDtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTggLSAxMSBvbmx5XG5cdFx0XHRcdC8vIEFuY2hvcidzIGhvc3QgcHJvcGVydHkgaXNuJ3QgY29ycmVjdGx5IHNldCB3aGVuIHMudXJsIGlzIHJlbGF0aXZlXG5cdFx0XHRcdHVybEFuY2hvci5ocmVmID0gdXJsQW5jaG9yLmhyZWY7XG5cdFx0XHRcdHMuY3Jvc3NEb21haW4gPSBvcmlnaW5BbmNob3IucHJvdG9jb2wgKyBcIi8vXCIgKyBvcmlnaW5BbmNob3IuaG9zdCAhPT1cblx0XHRcdFx0XHR1cmxBbmNob3IucHJvdG9jb2wgKyBcIi8vXCIgKyB1cmxBbmNob3IuaG9zdDtcblx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdC8vIElmIHRoZXJlIGlzIGFuIGVycm9yIHBhcnNpbmcgdGhlIFVSTCwgYXNzdW1lIGl0IGlzIGNyb3NzRG9tYWluLFxuXHRcdFx0XHQvLyBpdCBjYW4gYmUgcmVqZWN0ZWQgYnkgdGhlIHRyYW5zcG9ydCBpZiBpdCBpcyBpbnZhbGlkXG5cdFx0XHRcdHMuY3Jvc3NEb21haW4gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENvbnZlcnQgZGF0YSBpZiBub3QgYWxyZWFkeSBhIHN0cmluZ1xuXHRcdGlmICggcy5kYXRhICYmIHMucHJvY2Vzc0RhdGEgJiYgdHlwZW9mIHMuZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHMuZGF0YSA9IGpRdWVyeS5wYXJhbSggcy5kYXRhLCBzLnRyYWRpdGlvbmFsICk7XG5cdFx0fVxuXG5cdFx0Ly8gQXBwbHkgcHJlZmlsdGVyc1xuXHRcdGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBwcmVmaWx0ZXJzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG5cdFx0Ly8gSWYgcmVxdWVzdCB3YXMgYWJvcnRlZCBpbnNpZGUgYSBwcmVmaWx0ZXIsIHN0b3AgdGhlcmVcblx0XHRpZiAoIGNvbXBsZXRlZCApIHtcblx0XHRcdHJldHVybiBqcVhIUjtcblx0XHR9XG5cblx0XHQvLyBXZSBjYW4gZmlyZSBnbG9iYWwgZXZlbnRzIGFzIG9mIG5vdyBpZiBhc2tlZCB0b1xuXHRcdC8vIERvbid0IGZpcmUgZXZlbnRzIGlmIGpRdWVyeS5ldmVudCBpcyB1bmRlZmluZWQgaW4gYW4gQU1ELXVzYWdlIHNjZW5hcmlvICgjMTUxMTgpXG5cdFx0ZmlyZUdsb2JhbHMgPSBqUXVlcnkuZXZlbnQgJiYgcy5nbG9iYWw7XG5cblx0XHQvLyBXYXRjaCBmb3IgYSBuZXcgc2V0IG9mIHJlcXVlc3RzXG5cdFx0aWYgKCBmaXJlR2xvYmFscyAmJiBqUXVlcnkuYWN0aXZlKysgPT09IDAgKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggXCJhamF4U3RhcnRcIiApO1xuXHRcdH1cblxuXHRcdC8vIFVwcGVyY2FzZSB0aGUgdHlwZVxuXHRcdHMudHlwZSA9IHMudHlwZS50b1VwcGVyQ2FzZSgpO1xuXG5cdFx0Ly8gRGV0ZXJtaW5lIGlmIHJlcXVlc3QgaGFzIGNvbnRlbnRcblx0XHRzLmhhc0NvbnRlbnQgPSAhcm5vQ29udGVudC50ZXN0KCBzLnR5cGUgKTtcblxuXHRcdC8vIFNhdmUgdGhlIFVSTCBpbiBjYXNlIHdlJ3JlIHRveWluZyB3aXRoIHRoZSBJZi1Nb2RpZmllZC1TaW5jZVxuXHRcdC8vIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciBsYXRlciBvblxuXHRcdC8vIFJlbW92ZSBoYXNoIHRvIHNpbXBsaWZ5IHVybCBtYW5pcHVsYXRpb25cblx0XHRjYWNoZVVSTCA9IHMudXJsLnJlcGxhY2UoIHJoYXNoLCBcIlwiICk7XG5cblx0XHQvLyBNb3JlIG9wdGlvbnMgaGFuZGxpbmcgZm9yIHJlcXVlc3RzIHdpdGggbm8gY29udGVudFxuXHRcdGlmICggIXMuaGFzQ29udGVudCApIHtcblxuXHRcdFx0Ly8gUmVtZW1iZXIgdGhlIGhhc2ggc28gd2UgY2FuIHB1dCBpdCBiYWNrXG5cdFx0XHR1bmNhY2hlZCA9IHMudXJsLnNsaWNlKCBjYWNoZVVSTC5sZW5ndGggKTtcblxuXHRcdFx0Ly8gSWYgZGF0YSBpcyBhdmFpbGFibGUsIGFwcGVuZCBkYXRhIHRvIHVybFxuXHRcdFx0aWYgKCBzLmRhdGEgKSB7XG5cdFx0XHRcdGNhY2hlVVJMICs9ICggcnF1ZXJ5LnRlc3QoIGNhY2hlVVJMICkgPyBcIiZcIiA6IFwiP1wiICkgKyBzLmRhdGE7XG5cblx0XHRcdFx0Ly8gIzk2ODI6IHJlbW92ZSBkYXRhIHNvIHRoYXQgaXQncyBub3QgdXNlZCBpbiBhbiBldmVudHVhbCByZXRyeVxuXHRcdFx0XHRkZWxldGUgcy5kYXRhO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgb3IgdXBkYXRlIGFudGktY2FjaGUgcGFyYW0gaWYgbmVlZGVkXG5cdFx0XHRpZiAoIHMuY2FjaGUgPT09IGZhbHNlICkge1xuXHRcdFx0XHRjYWNoZVVSTCA9IGNhY2hlVVJMLnJlcGxhY2UoIHJhbnRpQ2FjaGUsIFwiJDFcIiApO1xuXHRcdFx0XHR1bmNhY2hlZCA9ICggcnF1ZXJ5LnRlc3QoIGNhY2hlVVJMICkgPyBcIiZcIiA6IFwiP1wiICkgKyBcIl89XCIgKyAoIG5vbmNlKysgKSArIHVuY2FjaGVkO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBQdXQgaGFzaCBhbmQgYW50aS1jYWNoZSBvbiB0aGUgVVJMIHRoYXQgd2lsbCBiZSByZXF1ZXN0ZWQgKGdoLTE3MzIpXG5cdFx0XHRzLnVybCA9IGNhY2hlVVJMICsgdW5jYWNoZWQ7XG5cblx0XHQvLyBDaGFuZ2UgJyUyMCcgdG8gJysnIGlmIHRoaXMgaXMgZW5jb2RlZCBmb3JtIGJvZHkgY29udGVudCAoZ2gtMjY1OClcblx0XHR9IGVsc2UgaWYgKCBzLmRhdGEgJiYgcy5wcm9jZXNzRGF0YSAmJlxuXHRcdFx0KCBzLmNvbnRlbnRUeXBlIHx8IFwiXCIgKS5pbmRleE9mKCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiICkgPT09IDAgKSB7XG5cdFx0XHRzLmRhdGEgPSBzLmRhdGEucmVwbGFjZSggcjIwLCBcIitcIiApO1xuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgSWYtTW9kaWZpZWQtU2luY2UgYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyLCBpZiBpbiBpZk1vZGlmaWVkIG1vZGUuXG5cdFx0aWYgKCBzLmlmTW9kaWZpZWQgKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gKSB7XG5cdFx0XHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiSWYtTW9kaWZpZWQtU2luY2VcIiwgalF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSApIHtcblx0XHRcdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJJZi1Ob25lLU1hdGNoXCIsIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBjb3JyZWN0IGhlYWRlciwgaWYgZGF0YSBpcyBiZWluZyBzZW50XG5cdFx0aWYgKCBzLmRhdGEgJiYgcy5oYXNDb250ZW50ICYmIHMuY29udGVudFR5cGUgIT09IGZhbHNlIHx8IG9wdGlvbnMuY29udGVudFR5cGUgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIkNvbnRlbnQtVHlwZVwiLCBzLmNvbnRlbnRUeXBlICk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBBY2NlcHRzIGhlYWRlciBmb3IgdGhlIHNlcnZlciwgZGVwZW5kaW5nIG9uIHRoZSBkYXRhVHlwZVxuXHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoXG5cdFx0XHRcIkFjY2VwdFwiLFxuXHRcdFx0cy5kYXRhVHlwZXNbIDAgXSAmJiBzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWyAwIF0gXSA/XG5cdFx0XHRcdHMuYWNjZXB0c1sgcy5kYXRhVHlwZXNbIDAgXSBdICtcblx0XHRcdFx0XHQoIHMuZGF0YVR5cGVzWyAwIF0gIT09IFwiKlwiID8gXCIsIFwiICsgYWxsVHlwZXMgKyBcIjsgcT0wLjAxXCIgOiBcIlwiICkgOlxuXHRcdFx0XHRzLmFjY2VwdHNbIFwiKlwiIF1cblx0XHQpO1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIGhlYWRlcnMgb3B0aW9uXG5cdFx0Zm9yICggaSBpbiBzLmhlYWRlcnMgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBzLmhlYWRlcnNbIGkgXSApO1xuXHRcdH1cblxuXHRcdC8vIEFsbG93IGN1c3RvbSBoZWFkZXJzL21pbWV0eXBlcyBhbmQgZWFybHkgYWJvcnRcblx0XHRpZiAoIHMuYmVmb3JlU2VuZCAmJlxuXHRcdFx0KCBzLmJlZm9yZVNlbmQuY2FsbCggY2FsbGJhY2tDb250ZXh0LCBqcVhIUiwgcyApID09PSBmYWxzZSB8fCBjb21wbGV0ZWQgKSApIHtcblxuXHRcdFx0Ly8gQWJvcnQgaWYgbm90IGRvbmUgYWxyZWFkeSBhbmQgcmV0dXJuXG5cdFx0XHRyZXR1cm4ganFYSFIuYWJvcnQoKTtcblx0XHR9XG5cblx0XHQvLyBBYm9ydGluZyBpcyBubyBsb25nZXIgYSBjYW5jZWxsYXRpb25cblx0XHRzdHJBYm9ydCA9IFwiYWJvcnRcIjtcblxuXHRcdC8vIEluc3RhbGwgY2FsbGJhY2tzIG9uIGRlZmVycmVkc1xuXHRcdGNvbXBsZXRlRGVmZXJyZWQuYWRkKCBzLmNvbXBsZXRlICk7XG5cdFx0anFYSFIuZG9uZSggcy5zdWNjZXNzICk7XG5cdFx0anFYSFIuZmFpbCggcy5lcnJvciApO1xuXG5cdFx0Ly8gR2V0IHRyYW5zcG9ydFxuXHRcdHRyYW5zcG9ydCA9IGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG5cdFx0Ly8gSWYgbm8gdHJhbnNwb3J0LCB3ZSBhdXRvLWFib3J0XG5cdFx0aWYgKCAhdHJhbnNwb3J0ICkge1xuXHRcdFx0ZG9uZSggLTEsIFwiTm8gVHJhbnNwb3J0XCIgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0anFYSFIucmVhZHlTdGF0ZSA9IDE7XG5cblx0XHRcdC8vIFNlbmQgZ2xvYmFsIGV2ZW50XG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4U2VuZFwiLCBbIGpxWEhSLCBzIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgcmVxdWVzdCB3YXMgYWJvcnRlZCBpbnNpZGUgYWpheFNlbmQsIHN0b3AgdGhlcmVcblx0XHRcdGlmICggY29tcGxldGVkICkge1xuXHRcdFx0XHRyZXR1cm4ganFYSFI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRpbWVvdXRcblx0XHRcdGlmICggcy5hc3luYyAmJiBzLnRpbWVvdXQgPiAwICkge1xuXHRcdFx0XHR0aW1lb3V0VGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0anFYSFIuYWJvcnQoIFwidGltZW91dFwiICk7XG5cdFx0XHRcdH0sIHMudGltZW91dCApO1xuXHRcdFx0fVxuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb21wbGV0ZWQgPSBmYWxzZTtcblx0XHRcdFx0dHJhbnNwb3J0LnNlbmQoIHJlcXVlc3RIZWFkZXJzLCBkb25lICk7XG5cdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHQvLyBSZXRocm93IHBvc3QtY29tcGxldGlvbiBleGNlcHRpb25zXG5cdFx0XHRcdGlmICggY29tcGxldGVkICkge1xuXHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBQcm9wYWdhdGUgb3RoZXJzIGFzIHJlc3VsdHNcblx0XHRcdFx0ZG9uZSggLTEsIGUgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWxsYmFjayBmb3Igd2hlbiBldmVyeXRoaW5nIGlzIGRvbmVcblx0XHRmdW5jdGlvbiBkb25lKCBzdGF0dXMsIG5hdGl2ZVN0YXR1c1RleHQsIHJlc3BvbnNlcywgaGVhZGVycyApIHtcblx0XHRcdHZhciBpc1N1Y2Nlc3MsIHN1Y2Nlc3MsIGVycm9yLCByZXNwb25zZSwgbW9kaWZpZWQsXG5cdFx0XHRcdHN0YXR1c1RleHQgPSBuYXRpdmVTdGF0dXNUZXh0O1xuXG5cdFx0XHQvLyBJZ25vcmUgcmVwZWF0IGludm9jYXRpb25zXG5cdFx0XHRpZiAoIGNvbXBsZXRlZCApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb21wbGV0ZWQgPSB0cnVlO1xuXG5cdFx0XHQvLyBDbGVhciB0aW1lb3V0IGlmIGl0IGV4aXN0c1xuXHRcdFx0aWYgKCB0aW1lb3V0VGltZXIgKSB7XG5cdFx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoIHRpbWVvdXRUaW1lciApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBEZXJlZmVyZW5jZSB0cmFuc3BvcnQgZm9yIGVhcmx5IGdhcmJhZ2UgY29sbGVjdGlvblxuXHRcdFx0Ly8gKG5vIG1hdHRlciBob3cgbG9uZyB0aGUganFYSFIgb2JqZWN0IHdpbGwgYmUgdXNlZClcblx0XHRcdHRyYW5zcG9ydCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0Ly8gQ2FjaGUgcmVzcG9uc2UgaGVhZGVyc1xuXHRcdFx0cmVzcG9uc2VIZWFkZXJzU3RyaW5nID0gaGVhZGVycyB8fCBcIlwiO1xuXG5cdFx0XHQvLyBTZXQgcmVhZHlTdGF0ZVxuXHRcdFx0anFYSFIucmVhZHlTdGF0ZSA9IHN0YXR1cyA+IDAgPyA0IDogMDtcblxuXHRcdFx0Ly8gRGV0ZXJtaW5lIGlmIHN1Y2Nlc3NmdWxcblx0XHRcdGlzU3VjY2VzcyA9IHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwIHx8IHN0YXR1cyA9PT0gMzA0O1xuXG5cdFx0XHQvLyBHZXQgcmVzcG9uc2UgZGF0YVxuXHRcdFx0aWYgKCByZXNwb25zZXMgKSB7XG5cdFx0XHRcdHJlc3BvbnNlID0gYWpheEhhbmRsZVJlc3BvbnNlcyggcywganFYSFIsIHJlc3BvbnNlcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb252ZXJ0IG5vIG1hdHRlciB3aGF0ICh0aGF0IHdheSByZXNwb25zZVhYWCBmaWVsZHMgYXJlIGFsd2F5cyBzZXQpXG5cdFx0XHRyZXNwb25zZSA9IGFqYXhDb252ZXJ0KCBzLCByZXNwb25zZSwganFYSFIsIGlzU3VjY2VzcyApO1xuXG5cdFx0XHQvLyBJZiBzdWNjZXNzZnVsLCBoYW5kbGUgdHlwZSBjaGFpbmluZ1xuXHRcdFx0aWYgKCBpc1N1Y2Nlc3MgKSB7XG5cblx0XHRcdFx0Ly8gU2V0IHRoZSBJZi1Nb2RpZmllZC1TaW5jZSBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIsIGlmIGluIGlmTW9kaWZpZWQgbW9kZS5cblx0XHRcdFx0aWYgKCBzLmlmTW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0bW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlciggXCJMYXN0LU1vZGlmaWVkXCIgKTtcblx0XHRcdFx0XHRpZiAoIG1vZGlmaWVkICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRtb2RpZmllZCA9IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKCBcImV0YWdcIiApO1xuXHRcdFx0XHRcdGlmICggbW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGlmIG5vIGNvbnRlbnRcblx0XHRcdFx0aWYgKCBzdGF0dXMgPT09IDIwNCB8fCBzLnR5cGUgPT09IFwiSEVBRFwiICkge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSBcIm5vY29udGVudFwiO1xuXG5cdFx0XHRcdC8vIGlmIG5vdCBtb2RpZmllZFxuXHRcdFx0XHR9IGVsc2UgaWYgKCBzdGF0dXMgPT09IDMwNCApIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gXCJub3Rtb2RpZmllZFwiO1xuXG5cdFx0XHRcdC8vIElmIHdlIGhhdmUgZGF0YSwgbGV0J3MgY29udmVydCBpdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0ZTtcblx0XHRcdFx0XHRzdWNjZXNzID0gcmVzcG9uc2UuZGF0YTtcblx0XHRcdFx0XHRlcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuXHRcdFx0XHRcdGlzU3VjY2VzcyA9ICFlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBFeHRyYWN0IGVycm9yIGZyb20gc3RhdHVzVGV4dCBhbmQgbm9ybWFsaXplIGZvciBub24tYWJvcnRzXG5cdFx0XHRcdGVycm9yID0gc3RhdHVzVGV4dDtcblx0XHRcdFx0aWYgKCBzdGF0dXMgfHwgIXN0YXR1c1RleHQgKSB7XG5cdFx0XHRcdFx0c3RhdHVzVGV4dCA9IFwiZXJyb3JcIjtcblx0XHRcdFx0XHRpZiAoIHN0YXR1cyA8IDAgKSB7XG5cdFx0XHRcdFx0XHRzdGF0dXMgPSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgZGF0YSBmb3IgdGhlIGZha2UgeGhyIG9iamVjdFxuXHRcdFx0anFYSFIuc3RhdHVzID0gc3RhdHVzO1xuXHRcdFx0anFYSFIuc3RhdHVzVGV4dCA9ICggbmF0aXZlU3RhdHVzVGV4dCB8fCBzdGF0dXNUZXh0ICkgKyBcIlwiO1xuXG5cdFx0XHQvLyBTdWNjZXNzL0Vycm9yXG5cdFx0XHRpZiAoIGlzU3VjY2VzcyApIHtcblx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBzdWNjZXNzLCBzdGF0dXNUZXh0LCBqcVhIUiBdICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWZlcnJlZC5yZWplY3RXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQsIGVycm9yIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3Ncblx0XHRcdGpxWEhSLnN0YXR1c0NvZGUoIHN0YXR1c0NvZGUgKTtcblx0XHRcdHN0YXR1c0NvZGUgPSB1bmRlZmluZWQ7XG5cblx0XHRcdGlmICggZmlyZUdsb2JhbHMgKSB7XG5cdFx0XHRcdGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBpc1N1Y2Nlc3MgPyBcImFqYXhTdWNjZXNzXCIgOiBcImFqYXhFcnJvclwiLFxuXHRcdFx0XHRcdFsganFYSFIsIHMsIGlzU3VjY2VzcyA/IHN1Y2Nlc3MgOiBlcnJvciBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbXBsZXRlXG5cdFx0XHRjb21wbGV0ZURlZmVycmVkLmZpcmVXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQgXSApO1xuXG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4Q29tcGxldGVcIiwgWyBqcVhIUiwgcyBdICk7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIHRoZSBnbG9iYWwgQUpBWCBjb3VudGVyXG5cdFx0XHRcdGlmICggISggLS1qUXVlcnkuYWN0aXZlICkgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIFwiYWpheFN0b3BcIiApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGpxWEhSO1xuXHR9LFxuXG5cdGdldEpTT046IGZ1bmN0aW9uKCB1cmwsIGRhdGEsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ2V0KCB1cmwsIGRhdGEsIGNhbGxiYWNrLCBcImpzb25cIiApO1xuXHR9LFxuXG5cdGdldFNjcmlwdDogZnVuY3Rpb24oIHVybCwgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5nZXQoIHVybCwgdW5kZWZpbmVkLCBjYWxsYmFjaywgXCJzY3JpcHRcIiApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCBbIFwiZ2V0XCIsIFwicG9zdFwiIF0sIGZ1bmN0aW9uKCBpLCBtZXRob2QgKSB7XG5cdGpRdWVyeVsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjaywgdHlwZSApIHtcblxuXHRcdC8vIFNoaWZ0IGFyZ3VtZW50cyBpZiBkYXRhIGFyZ3VtZW50IHdhcyBvbWl0dGVkXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggZGF0YSApICkge1xuXHRcdFx0dHlwZSA9IHR5cGUgfHwgY2FsbGJhY2s7XG5cdFx0XHRjYWxsYmFjayA9IGRhdGE7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIFRoZSB1cmwgY2FuIGJlIGFuIG9wdGlvbnMgb2JqZWN0ICh3aGljaCB0aGVuIG11c3QgaGF2ZSAudXJsKVxuXHRcdHJldHVybiBqUXVlcnkuYWpheCggalF1ZXJ5LmV4dGVuZCgge1xuXHRcdFx0dXJsOiB1cmwsXG5cdFx0XHR0eXBlOiBtZXRob2QsXG5cdFx0XHRkYXRhVHlwZTogdHlwZSxcblx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRzdWNjZXNzOiBjYWxsYmFja1xuXHRcdH0sIGpRdWVyeS5pc1BsYWluT2JqZWN0KCB1cmwgKSAmJiB1cmwgKSApO1xuXHR9O1xufSApO1xuXG5yZXR1cm4galF1ZXJ5O1xufSApO1xuIl19