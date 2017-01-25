"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module

define(["./var/arr", "./var/document", "./var/getProto", "./var/slice", "./var/concat", "./var/push", "./var/indexOf", "./var/class2type", "./var/toString", "./var/hasOwn", "./var/fnToString", "./var/ObjectFunctionString", "./var/support", "./core/DOMEval"], function (arr, document, getProto, _slice, concat, push, indexOf, class2type, toString, hasOwn, fnToString, ObjectFunctionString, support, DOMEval) {

	"use strict";

	var version = "3.1.1",


	// Define a local copy of jQuery
	jQuery = function jQuery(selector, context) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init(selector, context);
	},


	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	    rdashAlpha = /-([a-z])/g,


	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function fcamelCase(all, letter) {
		return letter.toUpperCase();
	};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function toArray() {
			return _slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function get(num) {

			// Return all the elements in a clean array
			if (num == null) {
				return _slice.call(this);
			}

			// Return just the one element from the set
			return num < 0 ? this[num + this.length] : this[num];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function pushStack(elems) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function each(callback) {
			return jQuery.each(this, callback);
		},

		map: function map(callback) {
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		slice: function slice() {
			return this.pushStack(_slice.apply(this, arguments));
		},

		first: function first() {
			return this.eq(0);
		},

		last: function last() {
			return this.eq(-1);
		},

		eq: function eq(i) {
			var len = this.length,
			    j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function end() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function () {
		var options,
		    name,
		    src,
		    copy,
		    copyIsArray,
		    clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function error(msg) {
			throw new Error(msg);
		},

		noop: function noop() {},

		isFunction: function isFunction(obj) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function isWindow(obj) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function isNumeric(obj) {

			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type(obj);
			return (type === "number" || type === "string") &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN(obj - parseFloat(obj));
		},

		isPlainObject: function isPlainObject(obj) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if (!obj || toString.call(obj) !== "[object Object]") {
				return false;
			}

			proto = getProto(obj);

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if (!proto) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
			return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
		},

		isEmptyObject: function isEmptyObject(obj) {

			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;

			for (name in obj) {
				return false;
			}
			return true;
		},

		type: function type(obj) {
			if (obj == null) {
				return obj + "";
			}

			// Support: Android <=2.3 only (functionish RegExp)
			return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
		},

		// Evaluates a script in a global context
		globalEval: function globalEval(code) {
			DOMEval(code);
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function camelCase(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},

		nodeName: function nodeName(elem, name) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function each(obj, callback) {
			var length,
			    i = 0;

			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android <=4.0 only
		trim: function trim(text) {
			return text == null ? "" : (text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function makeArray(arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function inArray(elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function merge(first, second) {
			var len = +second.length,
			    j = 0,
			    i = first.length;

			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function grep(elems, callback, invert) {
			var callbackInverse,
			    matches = [],
			    i = 0,
			    length = elems.length,
			    callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function map(elems, callback, arg) {
			var length,
			    value,
			    i = 0,
			    ret = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function proxy(fn, context) {
			var tmp, args, proxy;

			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = _slice.call(arguments, 2);
			proxy = function proxy() {
				return fn.apply(context || this, args.concat(_slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArrayLike(obj) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
		    type = jQuery.type(obj);

		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}

		return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	}

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L2Rpc3QvY29yZS5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCJhcnIiLCJkb2N1bWVudCIsImdldFByb3RvIiwic2xpY2UiLCJjb25jYXQiLCJwdXNoIiwiaW5kZXhPZiIsImNsYXNzMnR5cGUiLCJ0b1N0cmluZyIsImhhc093biIsImZuVG9TdHJpbmciLCJPYmplY3RGdW5jdGlvblN0cmluZyIsInN1cHBvcnQiLCJET01FdmFsIiwidmVyc2lvbiIsImpRdWVyeSIsInNlbGVjdG9yIiwiY29udGV4dCIsImZuIiwiaW5pdCIsInJ0cmltIiwicm1zUHJlZml4IiwicmRhc2hBbHBoYSIsImZjYW1lbENhc2UiLCJhbGwiLCJsZXR0ZXIiLCJ0b1VwcGVyQ2FzZSIsInByb3RvdHlwZSIsImpxdWVyeSIsImNvbnN0cnVjdG9yIiwibGVuZ3RoIiwidG9BcnJheSIsImNhbGwiLCJnZXQiLCJudW0iLCJwdXNoU3RhY2siLCJlbGVtcyIsInJldCIsIm1lcmdlIiwicHJldk9iamVjdCIsImVhY2giLCJjYWxsYmFjayIsIm1hcCIsImVsZW0iLCJpIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJmaXJzdCIsImVxIiwibGFzdCIsImxlbiIsImoiLCJlbmQiLCJzb3J0Iiwic3BsaWNlIiwiZXh0ZW5kIiwib3B0aW9ucyIsIm5hbWUiLCJzcmMiLCJjb3B5IiwiY29weUlzQXJyYXkiLCJjbG9uZSIsInRhcmdldCIsImRlZXAiLCJpc0Z1bmN0aW9uIiwiaXNQbGFpbk9iamVjdCIsImlzQXJyYXkiLCJ1bmRlZmluZWQiLCJleHBhbmRvIiwiTWF0aCIsInJhbmRvbSIsInJlcGxhY2UiLCJpc1JlYWR5IiwiZXJyb3IiLCJtc2ciLCJFcnJvciIsIm5vb3AiLCJvYmoiLCJ0eXBlIiwiQXJyYXkiLCJpc1dpbmRvdyIsIndpbmRvdyIsImlzTnVtZXJpYyIsImlzTmFOIiwicGFyc2VGbG9hdCIsInByb3RvIiwiQ3RvciIsImlzRW1wdHlPYmplY3QiLCJnbG9iYWxFdmFsIiwiY29kZSIsImNhbWVsQ2FzZSIsInN0cmluZyIsIm5vZGVOYW1lIiwidG9Mb3dlckNhc2UiLCJpc0FycmF5TGlrZSIsInRyaW0iLCJ0ZXh0IiwibWFrZUFycmF5IiwicmVzdWx0cyIsIk9iamVjdCIsImluQXJyYXkiLCJzZWNvbmQiLCJncmVwIiwiaW52ZXJ0IiwiY2FsbGJhY2tJbnZlcnNlIiwibWF0Y2hlcyIsImNhbGxiYWNrRXhwZWN0IiwiYXJnIiwidmFsdWUiLCJndWlkIiwicHJveHkiLCJ0bXAiLCJhcmdzIiwibm93IiwiRGF0ZSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwic3BsaXQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUFBLE9BQVEsQ0FDUCxXQURPLEVBRVAsZ0JBRk8sRUFHUCxnQkFITyxFQUlQLGFBSk8sRUFLUCxjQUxPLEVBTVAsWUFOTyxFQU9QLGVBUE8sRUFRUCxrQkFSTyxFQVNQLGdCQVRPLEVBVVAsY0FWTyxFQVdQLGtCQVhPLEVBWVAsNEJBWk8sRUFhUCxlQWJPLEVBY1AsZ0JBZE8sQ0FBUixFQWVHLFVBQVVDLEdBQVYsRUFBZUMsUUFBZixFQUF5QkMsUUFBekIsRUFBbUNDLE1BQW5DLEVBQTBDQyxNQUExQyxFQUFrREMsSUFBbEQsRUFBd0RDLE9BQXhELEVBQ0ZDLFVBREUsRUFDVUMsUUFEVixFQUNvQkMsTUFEcEIsRUFDNEJDLFVBRDVCLEVBQ3dDQyxvQkFEeEMsRUFFRkMsT0FGRSxFQUVPQyxPQUZQLEVBRWlCOztBQUVwQjs7QUFFQSxLQUNDQyxVQUFVLE9BRFg7OztBQUdDO0FBQ0FDLFVBQVMsU0FBVEEsTUFBUyxDQUFVQyxRQUFWLEVBQW9CQyxPQUFwQixFQUE4Qjs7QUFFdEM7QUFDQTtBQUNBLFNBQU8sSUFBSUYsT0FBT0csRUFBUCxDQUFVQyxJQUFkLENBQW9CSCxRQUFwQixFQUE4QkMsT0FBOUIsQ0FBUDtBQUNBLEVBVEY7OztBQVdDO0FBQ0E7QUFDQUcsU0FBUSxvQ0FiVDs7O0FBZUM7QUFDQUMsYUFBWSxPQWhC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QUNBckcsV0FBU0E7QUEzUEssRUFBZjs7QUE4UEEsS0FBSyxPQUFPdUcsTUFBUCxLQUFrQixVQUF2QixFQUFvQztBQUNuQ3BHLFNBQU9HLEVBQVAsQ0FBV2lHLE9BQU9DLFFBQWxCLElBQStCcEgsSUFBS21ILE9BQU9DLFFBQVosQ0FBL0I7QUFDQTs7QUFFRDtBQUNBckcsUUFBT3lCLElBQVAsQ0FBYSx1RUFBdUU2RSxLQUF2RSxDQUE4RSxHQUE5RSxDQUFiLEVBQ0EsVUFBVXpFLENBQVYsRUFBYWEsSUFBYixFQUFvQjtBQUNuQmxELGFBQVksYUFBYWtELElBQWIsR0FBb0IsR0FBaEMsSUFBd0NBLEtBQUtvQyxXQUFMLEVBQXhDO0FBQ0EsRUFIRDs7QUFLQSxVQUFTQyxXQUFULENBQXNCakIsR0FBdEIsRUFBNEI7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSS9DLFNBQVMsQ0FBQyxDQUFDK0MsR0FBRixJQUFTLFlBQVlBLEdBQXJCLElBQTRCQSxJQUFJL0MsTUFBN0M7QUFBQSxNQUNDZ0QsT0FBTy9ELE9BQU8rRCxJQUFQLENBQWFELEdBQWIsQ0FEUjs7QUFHQSxNQUFLQyxTQUFTLFVBQVQsSUFBdUIvRCxPQUFPaUUsUUFBUCxDQUFpQkgsR0FBakIsQ0FBNUIsRUFBcUQ7QUFDcEQsVUFBTyxLQUFQO0FBQ0E7O0FBRUQsU0FBT0MsU0FBUyxPQUFULElBQW9CaEQsV0FBVyxDQUEvQixJQUNOLE9BQU9BLE1BQVAsS0FBa0IsUUFBbEIsSUFBOEJBLFNBQVMsQ0FBdkMsSUFBOENBLFNBQVMsQ0FBWCxJQUFrQitDLEdBRC9EO0FBRUE7O0FBRUQsUUFBTzlELE1BQVA7QUFDQyxDQTdkRCIsImZpbGUiOiJjb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIFN5bWJvbCAqL1xuLy8gRGVmaW5pbmcgdGhpcyBnbG9iYWwgaW4gLmVzbGludHJjLmpzb24gd291bGQgY3JlYXRlIGEgZGFuZ2VyIG9mIHVzaW5nIHRoZSBnbG9iYWxcbi8vIHVuZ3VhcmRlZCBpbiBhbm90aGVyIHBsYWNlLCBpdCBzZWVtcyBzYWZlciB0byBkZWZpbmUgZ2xvYmFsIG9ubHkgZm9yIHRoaXMgbW9kdWxlXG5cbmRlZmluZSggW1xuXHRcIi4vdmFyL2FyclwiLFxuXHRcIi4vdmFyL2RvY3VtZW50XCIsXG5cdFwiLi92YXIvZ2V0UHJvdG9cIixcblx0XCIuL3Zhci9zbGljZVwiLFxuXHRcIi4vdmFyL2NvbmNhdFwiLFxuXHRcIi4vdmFyL3B1c2hcIixcblx0XCIuL3Zhci9pbmRleE9mXCIsXG5cdFwiLi92YXIvY2xhc3MydHlwZVwiLFxuXHRcIi4vdmFyL3RvU3RyaW5nXCIsXG5cdFwiLi92YXIvaGFzT3duXCIsXG5cdFwiLi92YXIvZm5Ub1N0cmluZ1wiLFxuXHRcIi4vdmFyL09iamVjdEZ1bmN0aW9uU3RyaW5nXCIsXG5cdFwiLi92YXIvc3VwcG9ydFwiLFxuXHRcIi4vY29yZS9ET01FdmFsXCJcbl0sIGZ1bmN0aW9uKCBhcnIsIGRvY3VtZW50LCBnZXRQcm90bywgc2xpY2UsIGNvbmNhdCwgcHVzaCwgaW5kZXhPZixcblx0Y2xhc3MydHlwZSwgdG9TdHJpbmcsIGhhc093biwgZm5Ub1N0cmluZywgT2JqZWN0RnVuY3Rpb25TdHJpbmcsXG5cdHN1cHBvcnQsIERPTUV2YWwgKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXJcblx0dmVyc2lvbiA9IFwiMy4xLjFcIixcblxuXHQvLyBEZWZpbmUgYSBsb2NhbCBjb3B5IG9mIGpRdWVyeVxuXHRqUXVlcnkgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG5cblx0XHQvLyBUaGUgalF1ZXJ5IG9iamVjdCBpcyBhY3R1YWxseSBqdXN0IHRoZSBpbml0IGNvbnN0cnVjdG9yICdlbmhhbmNlZCdcblx0XHQvLyBOZWVkIGluaXQgaWYgalF1ZXJ5IGlzIGNhbGxlZCAoanVzdCBhbGxvdyBlcnJvciB0byBiZSB0aHJvd24gaWYgbm90IGluY2x1ZGVkKVxuXHRcdHJldHVybiBuZXcgalF1ZXJ5LmZuLmluaXQoIHNlbGVjdG9yLCBjb250ZXh0ICk7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5XG5cdC8vIE1ha2Ugc3VyZSB3ZSB0cmltIEJPTSBhbmQgTkJTUFxuXHRydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZyxcblxuXHQvLyBNYXRjaGVzIGRhc2hlZCBzdHJpbmcgZm9yIGNhbWVsaXppbmdcblx0cm1zUHJlZml4ID0gL14tbXMtLyxcblx0cmRhc2hBbHBoYSA9IC8tKFthLXpdKS9nLFxuXG5cdC8vIFVzZWQgYnkgalF1ZXJ5LmNhbWVsQ2FzZSBhcyBjYWxsYmFjayB0byByZXBsYWNlKClcblx0ZmNhbWVsQ2FzZSA9IGZ1bmN0aW9uKCBhbGwsIGxldHRlciApIHtcblx0XHRyZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG5cdH07XG5cbmpRdWVyeS5mbiA9IGpRdWVyeS5wcm90b3R5cGUgPSB7XG5cblx0Ly8gVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiBqUXVlcnkgYmVpbmcgdXNlZFxuXHRqcXVlcnk6IHZlcnNpb24sXG5cblx0Y29uc3RydWN0b3I6IGpRdWVyeSxcblxuXHQvLyBUaGUgZGVmYXVsdCBsZW5ndGggb2YgYSBqUXVlcnkgb2JqZWN0IGlzIDBcblx0bGVuZ3RoOiAwLFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG5cdH0sXG5cblx0Ly8gR2V0IHRoZSBOdGggZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBlbGVtZW50IHNldCBPUlxuXHQvLyBHZXQgdGhlIHdob2xlIG1hdGNoZWQgZWxlbWVudCBzZXQgYXMgYSBjbGVhbiBhcnJheVxuXHRnZXQ6IGZ1bmN0aW9uKCBudW0gKSB7XG5cblx0XHQvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBpbiBhIGNsZWFuIGFycmF5XG5cdFx0aWYgKCBudW0gPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIGp1c3QgdGhlIG9uZSBlbGVtZW50IGZyb20gdGhlIHNldFxuXHRcdHJldHVybiBudW0gPCAwID8gdGhpc1sgbnVtICsgdGhpcy5sZW5ndGggXSA6IHRoaXNbIG51bSBdO1xuXHR9LFxuXG5cdC8vIFRha2UgYW4gYXJyYXkgb2YgZWxlbWVudHMgYW5kIHB1c2ggaXQgb250byB0aGUgc3RhY2tcblx0Ly8gKHJldHVybmluZyB0aGUgbmV3IG1hdGNoZWQgZWxlbWVudCBzZXQpXG5cdHB1c2hTdGFjazogZnVuY3Rpb24oIGVsZW1zICkge1xuXG5cdFx0Ly8gQnVpbGQgYSBuZXcgalF1ZXJ5IG1hdGNoZWQgZWxlbWVudCBzZXRcblx0XHR2YXIgcmV0ID0galF1ZXJ5Lm1lcmdlKCB0aGlzLmNvbnN0cnVjdG9yKCksIGVsZW1zICk7XG5cblx0XHQvLyBBZGQgdGhlIG9sZCBvYmplY3Qgb250byB0aGUgc3RhY2sgKGFzIGEgcmVmZXJlbmNlKVxuXHRcdHJldC5wcmV2T2JqZWN0ID0gdGhpcztcblxuXHRcdC8vIFJldHVybiB0aGUgbmV3bHktZm9ybWVkIGVsZW1lbnQgc2V0XG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHQvLyBFeGVjdXRlIGEgY2FsbGJhY2sgZm9yIGV2ZXJ5IGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgc2V0LlxuXHRlYWNoOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5lYWNoKCB0aGlzLCBjYWxsYmFjayApO1xuXHR9LFxuXG5cdG1hcDogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5Lm1hcCggdGhpcywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG5cdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbCggZWxlbSwgaSwgZWxlbSApO1xuXHRcdH0gKSApO1xuXHR9LFxuXG5cdHNsaWNlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHNsaWNlLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKSApO1xuXHR9LFxuXG5cdGZpcnN0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5lcSggMCApO1xuXHR9LFxuXG5cdGxhc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAtMSApO1xuXHR9LFxuXG5cdGVxOiBmdW5jdGlvbiggaSApIHtcblx0XHR2YXIgbGVuID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRqID0gK2kgKyAoIGkgPCAwID8gbGVuIDogMCApO1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggaiA+PSAwICYmIGogPCBsZW4gPyBbIHRoaXNbIGogXSBdIDogW10gKTtcblx0fSxcblxuXHRlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnByZXZPYmplY3QgfHwgdGhpcy5jb25zdHJ1Y3RvcigpO1xuXHR9LFxuXG5cdC8vIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cblx0Ly8gQmVoYXZlcyBsaWtlIGFuIEFycmF5J3MgbWV0aG9kLCBub3QgbGlrZSBhIGpRdWVyeSBtZXRob2QuXG5cdHB1c2g6IHB1c2gsXG5cdHNvcnQ6IGFyci5zb3J0LFxuXHRzcGxpY2U6IGFyci5zcGxpY2Vcbn07XG5cbmpRdWVyeS5leHRlbmQgPSBqUXVlcnkuZm4uZXh0ZW5kID0gZnVuY3Rpb24oKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbIDAgXSB8fCB7fSxcblx0XHRpID0gMSxcblx0XHRsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdGRlZXAgPSBmYWxzZTtcblxuXHQvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG5cdGlmICggdHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblxuXHRcdC8vIFNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbIGkgXSB8fCB7fTtcblx0XHRpKys7XG5cdH1cblxuXHQvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcblx0aWYgKCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmICFqUXVlcnkuaXNGdW5jdGlvbiggdGFyZ2V0ICkgKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdH1cblxuXHQvLyBFeHRlbmQgalF1ZXJ5IGl0c2VsZiBpZiBvbmx5IG9uZSBhcmd1bWVudCBpcyBwYXNzZWRcblx0aWYgKCBpID09PSBsZW5ndGggKSB7XG5cdFx0dGFyZ2V0ID0gdGhpcztcblx0XHRpLS07XG5cdH1cblxuXHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblxuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAoICggb3B0aW9ucyA9IGFyZ3VtZW50c1sgaSBdICkgIT0gbnVsbCApIHtcblxuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuXHRcdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdFx0XHRzcmMgPSB0YXJnZXRbIG5hbWUgXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbIG5hbWUgXTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICggdGFyZ2V0ID09PSBjb3B5ICkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdGlmICggZGVlcCAmJiBjb3B5ICYmICggalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvcHkgKSB8fFxuXHRcdFx0XHRcdCggY29weUlzQXJyYXkgPSBqUXVlcnkuaXNBcnJheSggY29weSApICkgKSApIHtcblxuXHRcdFx0XHRcdGlmICggY29weUlzQXJyYXkgKSB7XG5cdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgalF1ZXJ5LmlzQXJyYXkoIHNyYyApID8gc3JjIDogW107XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIHNyYyApID8gc3JjIDoge307XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBqUXVlcnkuZXh0ZW5kKCBkZWVwLCBjbG9uZSwgY29weSApO1xuXG5cdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0fSBlbHNlIGlmICggY29weSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHRhcmdldFsgbmFtZSBdID0gY29weTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0Ly8gVW5pcXVlIGZvciBlYWNoIGNvcHkgb2YgalF1ZXJ5IG9uIHRoZSBwYWdlXG5cdGV4cGFuZG86IFwialF1ZXJ5XCIgKyAoIHZlcnNpb24gKyBNYXRoLnJhbmRvbSgpICkucmVwbGFjZSggL1xcRC9nLCBcIlwiICksXG5cblx0Ly8gQXNzdW1lIGpRdWVyeSBpcyByZWFkeSB3aXRob3V0IHRoZSByZWFkeSBtb2R1bGVcblx0aXNSZWFkeTogdHJ1ZSxcblxuXHRlcnJvcjogZnVuY3Rpb24oIG1zZyApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIG1zZyApO1xuXHR9LFxuXG5cdG5vb3A6IGZ1bmN0aW9uKCkge30sXG5cblx0aXNGdW5jdGlvbjogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRyZXR1cm4galF1ZXJ5LnR5cGUoIG9iaiApID09PSBcImZ1bmN0aW9uXCI7XG5cdH0sXG5cblx0aXNBcnJheTogQXJyYXkuaXNBcnJheSxcblxuXHRpc1dpbmRvdzogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRyZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09PSBvYmoud2luZG93O1xuXHR9LFxuXG5cdGlzTnVtZXJpYzogZnVuY3Rpb24oIG9iaiApIHtcblxuXHRcdC8vIEFzIG9mIGpRdWVyeSAzLjAsIGlzTnVtZXJpYyBpcyBsaW1pdGVkIHRvXG5cdFx0Ly8gc3RyaW5ncyBhbmQgbnVtYmVycyAocHJpbWl0aXZlcyBvciBvYmplY3RzKVxuXHRcdC8vIHRoYXQgY2FuIGJlIGNvZXJjZWQgdG8gZmluaXRlIG51bWJlcnMgKGdoLTI2NjIpXG5cdFx0dmFyIHR5cGUgPSBqUXVlcnkudHlwZSggb2JqICk7XG5cdFx0cmV0dXJuICggdHlwZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlID09PSBcInN0cmluZ1wiICkgJiZcblxuXHRcdFx0Ly8gcGFyc2VGbG9hdCBOYU5zIG51bWVyaWMtY2FzdCBmYWxzZSBwb3NpdGl2ZXMgKFwiXCIpXG5cdFx0XHQvLyAuLi5idXQgbWlzaW50ZXJwcmV0cyBsZWFkaW5nLW51bWJlciBzdHJpbmdzLCBwYXJ0aWN1bGFybHkgaGV4IGxpdGVyYWxzIChcIjB4Li4uXCIpXG5cdFx0XHQvLyBzdWJ0cmFjdGlvbiBmb3JjZXMgaW5maW5pdGllcyB0byBOYU5cblx0XHRcdCFpc05hTiggb2JqIC0gcGFyc2VGbG9hdCggb2JqICkgKTtcblx0fSxcblxuXHRpc1BsYWluT2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHZhciBwcm90bywgQ3RvcjtcblxuXHRcdC8vIERldGVjdCBvYnZpb3VzIG5lZ2F0aXZlc1xuXHRcdC8vIFVzZSB0b1N0cmluZyBpbnN0ZWFkIG9mIGpRdWVyeS50eXBlIHRvIGNhdGNoIGhvc3Qgb2JqZWN0c1xuXHRcdGlmICggIW9iaiB8fCB0b1N0cmluZy5jYWxsKCBvYmogKSAhPT0gXCJbb2JqZWN0IE9iamVjdF1cIiApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRwcm90byA9IGdldFByb3RvKCBvYmogKTtcblxuXHRcdC8vIE9iamVjdHMgd2l0aCBubyBwcm90b3R5cGUgKGUuZy4sIGBPYmplY3QuY3JlYXRlKCBudWxsIClgKSBhcmUgcGxhaW5cblx0XHRpZiAoICFwcm90byApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIE9iamVjdHMgd2l0aCBwcm90b3R5cGUgYXJlIHBsYWluIGlmZiB0aGV5IHdlcmUgY29uc3RydWN0ZWQgYnkgYSBnbG9iYWwgT2JqZWN0IGZ1bmN0aW9uXG5cdFx0Q3RvciA9IGhhc093bi5jYWxsKCBwcm90bywgXCJjb25zdHJ1Y3RvclwiICkgJiYgcHJvdG8uY29uc3RydWN0b3I7XG5cdFx0cmV0dXJuIHR5cGVvZiBDdG9yID09PSBcImZ1bmN0aW9uXCIgJiYgZm5Ub1N0cmluZy5jYWxsKCBDdG9yICkgPT09IE9iamVjdEZ1bmN0aW9uU3RyaW5nO1xuXHR9LFxuXG5cdGlzRW1wdHlPYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG5cblx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZXNsaW50L2VzbGludC9pc3N1ZXMvNjEyNVxuXHRcdHZhciBuYW1lO1xuXG5cdFx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdHR5cGU6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0aWYgKCBvYmogPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiBvYmogKyBcIlwiO1xuXHRcdH1cblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD0yLjMgb25seSAoZnVuY3Rpb25pc2ggUmVnRXhwKVxuXHRcdHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiA/XG5cdFx0XHRjbGFzczJ0eXBlWyB0b1N0cmluZy5jYWxsKCBvYmogKSBdIHx8IFwib2JqZWN0XCIgOlxuXHRcdFx0dHlwZW9mIG9iajtcblx0fSxcblxuXHQvLyBFdmFsdWF0ZXMgYSBzY3JpcHQgaW4gYSBnbG9iYWwgY29udGV4dFxuXHRnbG9iYWxFdmFsOiBmdW5jdGlvbiggY29kZSApIHtcblx0XHRET01FdmFsKCBjb2RlICk7XG5cdH0sXG5cblx0Ly8gQ29udmVydCBkYXNoZWQgdG8gY2FtZWxDYXNlOyB1c2VkIGJ5IHRoZSBjc3MgYW5kIGRhdGEgbW9kdWxlc1xuXHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSwgRWRnZSAxMiAtIDEzXG5cdC8vIE1pY3Jvc29mdCBmb3Jnb3QgdG8gaHVtcCB0aGVpciB2ZW5kb3IgcHJlZml4ICgjOTU3Milcblx0Y2FtZWxDYXNlOiBmdW5jdGlvbiggc3RyaW5nICkge1xuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSggcm1zUHJlZml4LCBcIm1zLVwiICkucmVwbGFjZSggcmRhc2hBbHBoYSwgZmNhbWVsQ2FzZSApO1xuXHR9LFxuXG5cdG5vZGVOYW1lOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRyZXR1cm4gZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKTtcblx0fSxcblxuXHRlYWNoOiBmdW5jdGlvbiggb2JqLCBjYWxsYmFjayApIHtcblx0XHR2YXIgbGVuZ3RoLCBpID0gMDtcblxuXHRcdGlmICggaXNBcnJheUxpa2UoIG9iaiApICkge1xuXHRcdFx0bGVuZ3RoID0gb2JqLmxlbmd0aDtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKCBpIGluIG9iaiApIHtcblx0XHRcdFx0aWYgKCBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpIF0gKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seVxuXHR0cmltOiBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRyZXR1cm4gdGV4dCA9PSBudWxsID9cblx0XHRcdFwiXCIgOlxuXHRcdFx0KCB0ZXh0ICsgXCJcIiApLnJlcGxhY2UoIHJ0cmltLCBcIlwiICk7XG5cdH0sXG5cblx0Ly8gcmVzdWx0cyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRtYWtlQXJyYXk6IGZ1bmN0aW9uKCBhcnIsIHJlc3VsdHMgKSB7XG5cdFx0dmFyIHJldCA9IHJlc3VsdHMgfHwgW107XG5cblx0XHRpZiAoIGFyciAhPSBudWxsICkge1xuXHRcdFx0aWYgKCBpc0FycmF5TGlrZSggT2JqZWN0KCBhcnIgKSApICkge1xuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIHJldCxcblx0XHRcdFx0XHR0eXBlb2YgYXJyID09PSBcInN0cmluZ1wiID9cblx0XHRcdFx0XHRbIGFyciBdIDogYXJyXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwdXNoLmNhbGwoIHJldCwgYXJyICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHRpbkFycmF5OiBmdW5jdGlvbiggZWxlbSwgYXJyLCBpICkge1xuXHRcdHJldHVybiBhcnIgPT0gbnVsbCA/IC0xIDogaW5kZXhPZi5jYWxsKCBhcnIsIGVsZW0sIGkgKTtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRtZXJnZTogZnVuY3Rpb24oIGZpcnN0LCBzZWNvbmQgKSB7XG5cdFx0dmFyIGxlbiA9ICtzZWNvbmQubGVuZ3RoLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRpID0gZmlyc3QubGVuZ3RoO1xuXG5cdFx0Zm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG5cdFx0XHRmaXJzdFsgaSsrIF0gPSBzZWNvbmRbIGogXTtcblx0XHR9XG5cblx0XHRmaXJzdC5sZW5ndGggPSBpO1xuXG5cdFx0cmV0dXJuIGZpcnN0O1xuXHR9LFxuXG5cdGdyZXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGludmVydCApIHtcblx0XHR2YXIgY2FsbGJhY2tJbnZlcnNlLFxuXHRcdFx0bWF0Y2hlcyA9IFtdLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGgsXG5cdFx0XHRjYWxsYmFja0V4cGVjdCA9ICFpbnZlcnQ7XG5cblx0XHQvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgb25seSBzYXZpbmcgdGhlIGl0ZW1zXG5cdFx0Ly8gdGhhdCBwYXNzIHRoZSB2YWxpZGF0b3IgZnVuY3Rpb25cblx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdGNhbGxiYWNrSW52ZXJzZSA9ICFjYWxsYmFjayggZWxlbXNbIGkgXSwgaSApO1xuXHRcdFx0aWYgKCBjYWxsYmFja0ludmVyc2UgIT09IGNhbGxiYWNrRXhwZWN0ICkge1xuXHRcdFx0XHRtYXRjaGVzLnB1c2goIGVsZW1zWyBpIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbWF0Y2hlcztcblx0fSxcblxuXHQvLyBhcmcgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcblx0bWFwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBhcmcgKSB7XG5cdFx0dmFyIGxlbmd0aCwgdmFsdWUsXG5cdFx0XHRpID0gMCxcblx0XHRcdHJldCA9IFtdO1xuXG5cdFx0Ly8gR28gdGhyb3VnaCB0aGUgYXJyYXksIHRyYW5zbGF0aW5nIGVhY2ggb2YgdGhlIGl0ZW1zIHRvIHRoZWlyIG5ldyB2YWx1ZXNcblx0XHRpZiAoIGlzQXJyYXlMaWtlKCBlbGVtcyApICkge1xuXHRcdFx0bGVuZ3RoID0gZWxlbXMubGVuZ3RoO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG5cdFx0XHRcdGlmICggdmFsdWUgIT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXQucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gR28gdGhyb3VnaCBldmVyeSBrZXkgb24gdGhlIG9iamVjdCxcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICggaSBpbiBlbGVtcyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuXHRcdHJldHVybiBjb25jYXQuYXBwbHkoIFtdLCByZXQgKTtcblx0fSxcblxuXHQvLyBBIGdsb2JhbCBHVUlEIGNvdW50ZXIgZm9yIG9iamVjdHNcblx0Z3VpZDogMSxcblxuXHQvLyBCaW5kIGEgZnVuY3Rpb24gdG8gYSBjb250ZXh0LCBvcHRpb25hbGx5IHBhcnRpYWxseSBhcHBseWluZyBhbnlcblx0Ly8gYXJndW1lbnRzLlxuXHRwcm94eTogZnVuY3Rpb24oIGZuLCBjb250ZXh0ICkge1xuXHRcdHZhciB0bXAsIGFyZ3MsIHByb3h5O1xuXG5cdFx0aWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHRtcCA9IGZuWyBjb250ZXh0IF07XG5cdFx0XHRjb250ZXh0ID0gZm47XG5cdFx0XHRmbiA9IHRtcDtcblx0XHR9XG5cblx0XHQvLyBRdWljayBjaGVjayB0byBkZXRlcm1pbmUgaWYgdGFyZ2V0IGlzIGNhbGxhYmxlLCBpbiB0aGUgc3BlY1xuXHRcdC8vIHRoaXMgdGhyb3dzIGEgVHlwZUVycm9yLCBidXQgd2Ugd2lsbCBqdXN0IHJldHVybiB1bmRlZmluZWQuXG5cdFx0aWYgKCAhalF1ZXJ5LmlzRnVuY3Rpb24oIGZuICkgKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIFNpbXVsYXRlZCBiaW5kXG5cdFx0YXJncyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMiApO1xuXHRcdHByb3h5ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZm4uYXBwbHkoIGNvbnRleHQgfHwgdGhpcywgYXJncy5jb25jYXQoIHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApICkgKTtcblx0XHR9O1xuXG5cdFx0Ly8gU2V0IHRoZSBndWlkIG9mIHVuaXF1ZSBoYW5kbGVyIHRvIHRoZSBzYW1lIG9mIG9yaWdpbmFsIGhhbmRsZXIsIHNvIGl0IGNhbiBiZSByZW1vdmVkXG5cdFx0cHJveHkuZ3VpZCA9IGZuLmd1aWQgPSBmbi5ndWlkIHx8IGpRdWVyeS5ndWlkKys7XG5cblx0XHRyZXR1cm4gcHJveHk7XG5cdH0sXG5cblx0bm93OiBEYXRlLm5vdyxcblxuXHQvLyBqUXVlcnkuc3VwcG9ydCBpcyBub3QgdXNlZCBpbiBDb3JlIGJ1dCBvdGhlciBwcm9qZWN0cyBhdHRhY2ggdGhlaXJcblx0Ly8gcHJvcGVydGllcyB0byBpdCBzbyBpdCBuZWVkcyB0byBleGlzdC5cblx0c3VwcG9ydDogc3VwcG9ydFxufSApO1xuXG5pZiAoIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0alF1ZXJ5LmZuWyBTeW1ib2wuaXRlcmF0b3IgXSA9IGFyclsgU3ltYm9sLml0ZXJhdG9yIF07XG59XG5cbi8vIFBvcHVsYXRlIHRoZSBjbGFzczJ0eXBlIG1hcFxualF1ZXJ5LmVhY2goIFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvciBTeW1ib2xcIi5zcGxpdCggXCIgXCIgKSxcbmZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHRjbGFzczJ0eXBlWyBcIltvYmplY3QgXCIgKyBuYW1lICsgXCJdXCIgXSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbn0gKTtcblxuZnVuY3Rpb24gaXNBcnJheUxpa2UoIG9iaiApIHtcblxuXHQvLyBTdXBwb3J0OiByZWFsIGlPUyA4LjIgb25seSAobm90IHJlcHJvZHVjaWJsZSBpbiBzaW11bGF0b3IpXG5cdC8vIGBpbmAgY2hlY2sgdXNlZCB0byBwcmV2ZW50IEpJVCBlcnJvciAoZ2gtMjE0NSlcblx0Ly8gaGFzT3duIGlzbid0IHVzZWQgaGVyZSBkdWUgdG8gZmFsc2UgbmVnYXRpdmVzXG5cdC8vIHJlZ2FyZGluZyBOb2RlbGlzdCBsZW5ndGggaW4gSUVcblx0dmFyIGxlbmd0aCA9ICEhb2JqICYmIFwibGVuZ3RoXCIgaW4gb2JqICYmIG9iai5sZW5ndGgsXG5cdFx0dHlwZSA9IGpRdWVyeS50eXBlKCBvYmogKTtcblxuXHRpZiAoIHR5cGUgPT09IFwiZnVuY3Rpb25cIiB8fCBqUXVlcnkuaXNXaW5kb3coIG9iaiApICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiB0eXBlID09PSBcImFycmF5XCIgfHwgbGVuZ3RoID09PSAwIHx8XG5cdFx0dHlwZW9mIGxlbmd0aCA9PT0gXCJudW1iZXJcIiAmJiBsZW5ndGggPiAwICYmICggbGVuZ3RoIC0gMSApIGluIG9iajtcbn1cblxucmV0dXJuIGpRdWVyeTtcbn0gKTtcbiJdfQ==