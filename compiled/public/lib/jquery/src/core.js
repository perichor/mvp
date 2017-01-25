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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9jb3JlLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsImFyciIsImRvY3VtZW50IiwiZ2V0UHJvdG8iLCJzbGljZSIsImNvbmNhdCIsInB1c2giLCJpbmRleE9mIiwiY2xhc3MydHlwZSIsInRvU3RyaW5nIiwiaGFzT3duIiwiZm5Ub1N0cmluZyIsIk9iamVjdEZ1bmN0aW9uU3RyaW5nIiwic3VwcG9ydCIsIkRPTUV2YWwiLCJ2ZXJzaW9uIiwialF1ZXJ5Iiwic2VsZWN0b3IiLCJjb250ZXh0IiwiZm4iLCJpbml0IiwicnRyaW0iLCJybXNQcmVmaXgiLCJyZGFzaEFscGhhIiwiZmNhbWVsQ2FzZSIsImFsbCIsImxldHRlciIsInRvVXBwZXJDYXNlIiwicHJvdG90eXBlIiwianF1ZXJ5IiwiY29uc3RydWN0b3IiLCJsZW5ndGgiLCJ0b0FycmF5IiwiY2FsbCIsImdldCIsIm51bSIsInB1c2hTdGFjayIsImVsZW1zIiwicmV0IiwibWVyZ2UiLCJwcmV2T2JqZWN0IiwiZWFjaCIsImNhbGxiYWNrIiwibWFwIiwiZWxlbSIsImkiLCJhcHBseSIsImFyZ3VtZW50cyIsImZpcnN0IiwiZXEiLCJsYXN0IiwibGVuIiwiaiIsImVuZCIsInNvcnQiLCJzcGxpY2UiLCJleHRlbmQiLCJvcHRpb25zIiwibmFtZSIsInNyYyIsImNvcHkiLCJjb3B5SXNBcnJheSIsImNsb25lIiwidGFyZ2V0IiwiZGVlcCIsImlzRnVuY3Rpb24iLCJpc1BsYWluT2JqZWN0IiwiaXNBcnJheSIsInVuZGVmaW5lZCIsImV4cGFuZG8iLCJNYXRoIiwicmFuZG9tIiwicmVwbGFjZSIsImlzUmVhZHkiLCJlcnJvciIsIm1zZyIsIkVycm9yIiwibm9vcCIsIm9iaiIsInR5cGUiLCJBcnJheSIsImlzV2luZG93Iiwid2luZG93IiwiaXNOdW1lcmljIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwicHJvdG8iLCJDdG9yIiwiaXNFbXB0eU9iamVjdCIsImdsb2JhbEV2YWwiLCJjb2RlIiwiY2FtZWxDYXNlIiwic3RyaW5nIiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImlzQXJyYXlMaWtlIiwidHJpbSIsInRleHQiLCJtYWtlQXJyYXkiLCJyZXN1bHRzIiwiT2JqZWN0IiwiaW5BcnJheSIsInNlY29uZCIsImdyZXAiLCJpbnZlcnQiLCJjYWxsYmFja0ludmVyc2UiLCJtYXRjaGVzIiwiY2FsbGJhY2tFeHBlY3QiLCJhcmciLCJ2YWx1ZSIsImd1aWQiLCJwcm94eSIsInRtcCIsImFyZ3MiLCJub3ciLCJEYXRlIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJzcGxpdCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQUEsT0FBUSxDQUNQLFdBRE8sRUFFUCxnQkFGTyxFQUdQLGdCQUhPLEVBSVAsYUFKTyxFQUtQLGNBTE8sRUFNUCxZQU5PLEVBT1AsZUFQTyxFQVFQLGtCQVJPLEVBU1AsZ0JBVE8sRUFVUCxjQVZPLEVBV1Asa0JBWE8sRUFZUCw0QkFaTyxFQWFQLGVBYk8sRUFjUCxnQkFkTyxDQUFSLEVBZUcsVUFBVUMsR0FBVixFQUFlQyxRQUFmLEVBQXlCQyxRQUF6QixFQUFtQ0MsTUFBbkMsRUFBMENDLE1BQTFDLEVBQWtEQyxJQUFsRCxFQUF3REMsT0FBeEQsRUFDRkMsVUFERSxFQUNVQyxRQURWLEVBQ29CQyxNQURwQixFQUM0QkMsVUFENUIsRUFDd0NDLG9CQUR4QyxFQUVGQyxPQUZFLEVBRU9DLE9BRlAsRUFFaUI7O0FBRXBCOztBQUVBLEtBQ0NDLFVBQVUsT0FEWDs7O0FBR0M7QUFDQUMsVUFBUyxTQUFUQSxNQUFTLENBQVVDLFFBQVYsRUFBb0JDLE9BQXBCLEVBQThCOztBQUV0QztBQUNBO0FBQ0EsU0FBTyxJQUFJRixPQUFPRyxFQUFQLENBQVVDLElBQWQsQ0FBb0JILFFBQXBCLEVBQThCQyxPQUE5QixDQUFQO0FBQ0EsRUFURjs7O0FBV0M7QUFDQTtBQUNBRyxTQUFRLG9DQWJUOzs7QUFlQztBQUNBQyxhQUFZLE9BaEJi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Q0FyRyxXQUFTQTtBQTNQSyxFQUFmOztBQThQQSxLQUFLLE9BQU91RyxNQUFQLEtBQWtCLFVBQXZCLEVBQW9DO0FBQ25DcEcsU0FBT0csRUFBUCxDQUFXaUcsT0FBT0MsUUFBbEIsSUFBK0JwSCxJQUFLbUgsT0FBT0MsUUFBWixDQUEvQjtBQUNBOztBQUVEO0FBQ0FyRyxRQUFPeUIsSUFBUCxDQUFhLHVFQUF1RTZFLEtBQXZFLENBQThFLEdBQTlFLENBQWIsRUFDQSxVQUFVekUsQ0FBVixFQUFhYSxJQUFiLEVBQW9CO0FBQ25CbEQsYUFBWSxhQUFha0QsSUFBYixHQUFvQixHQUFoQyxJQUF3Q0EsS0FBS29DLFdBQUwsRUFBeEM7QUFDQSxFQUhEOztBQUtBLFVBQVNDLFdBQVQsQ0FBc0JqQixHQUF0QixFQUE0Qjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFJL0MsU0FBUyxDQUFDLENBQUMrQyxHQUFGLElBQVMsWUFBWUEsR0FBckIsSUFBNEJBLElBQUkvQyxNQUE3QztBQUFBLE1BQ0NnRCxPQUFPL0QsT0FBTytELElBQVAsQ0FBYUQsR0FBYixDQURSOztBQUdBLE1BQUtDLFNBQVMsVUFBVCxJQUF1Qi9ELE9BQU9pRSxRQUFQLENBQWlCSCxHQUFqQixDQUE1QixFQUFxRDtBQUNwRCxVQUFPLEtBQVA7QUFDQTs7QUFFRCxTQUFPQyxTQUFTLE9BQVQsSUFBb0JoRCxXQUFXLENBQS9CLElBQ04sT0FBT0EsTUFBUCxLQUFrQixRQUFsQixJQUE4QkEsU0FBUyxDQUF2QyxJQUE4Q0EsU0FBUyxDQUFYLElBQWtCK0MsR0FEL0Q7QUFFQTs7QUFFRCxRQUFPOUQsTUFBUDtBQUNDLENBN2REIiwiZmlsZSI6ImNvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgU3ltYm9sICovXG4vLyBEZWZpbmluZyB0aGlzIGdsb2JhbCBpbiAuZXNsaW50cmMuanNvbiB3b3VsZCBjcmVhdGUgYSBkYW5nZXIgb2YgdXNpbmcgdGhlIGdsb2JhbFxuLy8gdW5ndWFyZGVkIGluIGFub3RoZXIgcGxhY2UsIGl0IHNlZW1zIHNhZmVyIHRvIGRlZmluZSBnbG9iYWwgb25seSBmb3IgdGhpcyBtb2R1bGVcblxuZGVmaW5lKCBbXG5cdFwiLi92YXIvYXJyXCIsXG5cdFwiLi92YXIvZG9jdW1lbnRcIixcblx0XCIuL3Zhci9nZXRQcm90b1wiLFxuXHRcIi4vdmFyL3NsaWNlXCIsXG5cdFwiLi92YXIvY29uY2F0XCIsXG5cdFwiLi92YXIvcHVzaFwiLFxuXHRcIi4vdmFyL2luZGV4T2ZcIixcblx0XCIuL3Zhci9jbGFzczJ0eXBlXCIsXG5cdFwiLi92YXIvdG9TdHJpbmdcIixcblx0XCIuL3Zhci9oYXNPd25cIixcblx0XCIuL3Zhci9mblRvU3RyaW5nXCIsXG5cdFwiLi92YXIvT2JqZWN0RnVuY3Rpb25TdHJpbmdcIixcblx0XCIuL3Zhci9zdXBwb3J0XCIsXG5cdFwiLi9jb3JlL0RPTUV2YWxcIlxuXSwgZnVuY3Rpb24oIGFyciwgZG9jdW1lbnQsIGdldFByb3RvLCBzbGljZSwgY29uY2F0LCBwdXNoLCBpbmRleE9mLFxuXHRjbGFzczJ0eXBlLCB0b1N0cmluZywgaGFzT3duLCBmblRvU3RyaW5nLCBPYmplY3RGdW5jdGlvblN0cmluZyxcblx0c3VwcG9ydCwgRE9NRXZhbCApIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhclxuXHR2ZXJzaW9uID0gXCIzLjEuMVwiLFxuXG5cdC8vIERlZmluZSBhIGxvY2FsIGNvcHkgb2YgalF1ZXJ5XG5cdGpRdWVyeSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcblxuXHRcdC8vIFRoZSBqUXVlcnkgb2JqZWN0IGlzIGFjdHVhbGx5IGp1c3QgdGhlIGluaXQgY29uc3RydWN0b3IgJ2VuaGFuY2VkJ1xuXHRcdC8vIE5lZWQgaW5pdCBpZiBqUXVlcnkgaXMgY2FsbGVkIChqdXN0IGFsbG93IGVycm9yIHRvIGJlIHRocm93biBpZiBub3QgaW5jbHVkZWQpXG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuZm4uaW5pdCggc2VsZWN0b3IsIGNvbnRleHQgKTtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHlcblx0Ly8gTWFrZSBzdXJlIHdlIHRyaW0gQk9NIGFuZCBOQlNQXG5cdHJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLFxuXG5cdC8vIE1hdGNoZXMgZGFzaGVkIHN0cmluZyBmb3IgY2FtZWxpemluZ1xuXHRybXNQcmVmaXggPSAvXi1tcy0vLFxuXHRyZGFzaEFscGhhID0gLy0oW2Etel0pL2csXG5cblx0Ly8gVXNlZCBieSBqUXVlcnkuY2FtZWxDYXNlIGFzIGNhbGxiYWNrIHRvIHJlcGxhY2UoKVxuXHRmY2FtZWxDYXNlID0gZnVuY3Rpb24oIGFsbCwgbGV0dGVyICkge1xuXHRcdHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcblx0fTtcblxualF1ZXJ5LmZuID0galF1ZXJ5LnByb3RvdHlwZSA9IHtcblxuXHQvLyBUaGUgY3VycmVudCB2ZXJzaW9uIG9mIGpRdWVyeSBiZWluZyB1c2VkXG5cdGpxdWVyeTogdmVyc2lvbixcblxuXHRjb25zdHJ1Y3RvcjogalF1ZXJ5LFxuXG5cdC8vIFRoZSBkZWZhdWx0IGxlbmd0aCBvZiBhIGpRdWVyeSBvYmplY3QgaXMgMFxuXHRsZW5ndGg6IDAsXG5cblx0dG9BcnJheTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHNsaWNlLmNhbGwoIHRoaXMgKTtcblx0fSxcblxuXHQvLyBHZXQgdGhlIE50aCBlbGVtZW50IGluIHRoZSBtYXRjaGVkIGVsZW1lbnQgc2V0IE9SXG5cdC8vIEdldCB0aGUgd2hvbGUgbWF0Y2hlZCBlbGVtZW50IHNldCBhcyBhIGNsZWFuIGFycmF5XG5cdGdldDogZnVuY3Rpb24oIG51bSApIHtcblxuXHRcdC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIGluIGEgY2xlYW4gYXJyYXlcblx0XHRpZiAoIG51bSA9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIHNsaWNlLmNhbGwoIHRoaXMgKTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4ganVzdCB0aGUgb25lIGVsZW1lbnQgZnJvbSB0aGUgc2V0XG5cdFx0cmV0dXJuIG51bSA8IDAgPyB0aGlzWyBudW0gKyB0aGlzLmxlbmd0aCBdIDogdGhpc1sgbnVtIF07XG5cdH0sXG5cblx0Ly8gVGFrZSBhbiBhcnJheSBvZiBlbGVtZW50cyBhbmQgcHVzaCBpdCBvbnRvIHRoZSBzdGFja1xuXHQvLyAocmV0dXJuaW5nIHRoZSBuZXcgbWF0Y2hlZCBlbGVtZW50IHNldClcblx0cHVzaFN0YWNrOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cblx0XHQvLyBCdWlsZCBhIG5ldyBqUXVlcnkgbWF0Y2hlZCBlbGVtZW50IHNldFxuXHRcdHZhciByZXQgPSBqUXVlcnkubWVyZ2UoIHRoaXMuY29uc3RydWN0b3IoKSwgZWxlbXMgKTtcblxuXHRcdC8vIEFkZCB0aGUgb2xkIG9iamVjdCBvbnRvIHRoZSBzdGFjayAoYXMgYSByZWZlcmVuY2UpXG5cdFx0cmV0LnByZXZPYmplY3QgPSB0aGlzO1xuXG5cdFx0Ly8gUmV0dXJuIHRoZSBuZXdseS1mb3JtZWQgZWxlbWVudCBzZXRcblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdC8vIEV4ZWN1dGUgYSBjYWxsYmFjayBmb3IgZXZlcnkgZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBzZXQuXG5cdGVhY2g6IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmVhY2goIHRoaXMsIGNhbGxiYWNrICk7XG5cdH0sXG5cblx0bWFwOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkubWFwKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKCBlbGVtLCBpLCBlbGVtICk7XG5cdFx0fSApICk7XG5cdH0sXG5cblx0c2xpY2U6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggc2xpY2UuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApICk7XG5cdH0sXG5cblx0Zmlyc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAwICk7XG5cdH0sXG5cblx0bGFzdDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZXEoIC0xICk7XG5cdH0sXG5cblx0ZXE6IGZ1bmN0aW9uKCBpICkge1xuXHRcdHZhciBsZW4gPSB0aGlzLmxlbmd0aCxcblx0XHRcdGogPSAraSArICggaSA8IDAgPyBsZW4gOiAwICk7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqID49IDAgJiYgaiA8IGxlbiA/IFsgdGhpc1sgaiBdIF0gOiBbXSApO1xuXHR9LFxuXG5cdGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJldk9iamVjdCB8fCB0aGlzLmNvbnN0cnVjdG9yKCk7XG5cdH0sXG5cblx0Ly8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxuXHQvLyBCZWhhdmVzIGxpa2UgYW4gQXJyYXkncyBtZXRob2QsIG5vdCBsaWtlIGEgalF1ZXJ5IG1ldGhvZC5cblx0cHVzaDogcHVzaCxcblx0c29ydDogYXJyLnNvcnQsXG5cdHNwbGljZTogYXJyLnNwbGljZVxufTtcblxualF1ZXJ5LmV4dGVuZCA9IGpRdWVyeS5mbi5leHRlbmQgPSBmdW5jdGlvbigpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sgMCBdIHx8IHt9LFxuXHRcdGkgPSAxLFxuXHRcdGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0ZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKCB0eXBlb2YgdGFyZ2V0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXG5cdFx0Ly8gU2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sgaSBdIHx8IHt9O1xuXHRcdGkrKztcblx0fVxuXG5cdC8vIEhhbmRsZSBjYXNlIHdoZW4gdGFyZ2V0IGlzIGEgc3RyaW5nIG9yIHNvbWV0aGluZyAocG9zc2libGUgaW4gZGVlcCBjb3B5KVxuXHRpZiAoIHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIgJiYgIWpRdWVyeS5pc0Z1bmN0aW9uKCB0YXJnZXQgKSApIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdC8vIEV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxuXHRpZiAoIGkgPT09IGxlbmd0aCApIHtcblx0XHR0YXJnZXQgPSB0aGlzO1xuXHRcdGktLTtcblx0fVxuXG5cdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmICggKCBvcHRpb25zID0gYXJndW1lbnRzWyBpIF0gKSAhPSBudWxsICkge1xuXG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKCB0YXJnZXQgPT09IGNvcHkgKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0aWYgKCBkZWVwICYmIGNvcHkgJiYgKCBqUXVlcnkuaXNQbGFpbk9iamVjdCggY29weSApIHx8XG5cdFx0XHRcdFx0KCBjb3B5SXNBcnJheSA9IGpRdWVyeS5pc0FycmF5KCBjb3B5ICkgKSApICkge1xuXG5cdFx0XHRcdFx0aWYgKCBjb3B5SXNBcnJheSApIHtcblx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNBcnJheSggc3JjICkgPyBzcmMgOiBbXTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdCggc3JjICkgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHR0YXJnZXRbIG5hbWUgXSA9IGpRdWVyeS5leHRlbmQoIGRlZXAsIGNsb25lLCBjb3B5ICk7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBjb3B5ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBjb3B5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBVbmlxdWUgZm9yIGVhY2ggY29weSBvZiBqUXVlcnkgb24gdGhlIHBhZ2Vcblx0ZXhwYW5kbzogXCJqUXVlcnlcIiArICggdmVyc2lvbiArIE1hdGgucmFuZG9tKCkgKS5yZXBsYWNlKCAvXFxEL2csIFwiXCIgKSxcblxuXHQvLyBBc3N1bWUgalF1ZXJ5IGlzIHJlYWR5IHdpdGhvdXQgdGhlIHJlYWR5IG1vZHVsZVxuXHRpc1JlYWR5OiB0cnVlLFxuXG5cdGVycm9yOiBmdW5jdGlvbiggbXNnICkge1xuXHRcdHRocm93IG5ldyBFcnJvciggbXNnICk7XG5cdH0sXG5cblx0bm9vcDogZnVuY3Rpb24oKSB7fSxcblxuXHRpc0Z1bmN0aW9uOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiBqUXVlcnkudHlwZSggb2JqICkgPT09IFwiZnVuY3Rpb25cIjtcblx0fSxcblxuXHRpc0FycmF5OiBBcnJheS5pc0FycmF5LFxuXG5cdGlzV2luZG93OiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT09IG9iai53aW5kb3c7XG5cdH0sXG5cblx0aXNOdW1lcmljOiBmdW5jdGlvbiggb2JqICkge1xuXG5cdFx0Ly8gQXMgb2YgalF1ZXJ5IDMuMCwgaXNOdW1lcmljIGlzIGxpbWl0ZWQgdG9cblx0XHQvLyBzdHJpbmdzIGFuZCBudW1iZXJzIChwcmltaXRpdmVzIG9yIG9iamVjdHMpXG5cdFx0Ly8gdGhhdCBjYW4gYmUgY29lcmNlZCB0byBmaW5pdGUgbnVtYmVycyAoZ2gtMjY2Milcblx0XHR2YXIgdHlwZSA9IGpRdWVyeS50eXBlKCBvYmogKTtcblx0XHRyZXR1cm4gKCB0eXBlID09PSBcIm51bWJlclwiIHx8IHR5cGUgPT09IFwic3RyaW5nXCIgKSAmJlxuXG5cdFx0XHQvLyBwYXJzZUZsb2F0IE5hTnMgbnVtZXJpYy1jYXN0IGZhbHNlIHBvc2l0aXZlcyAoXCJcIilcblx0XHRcdC8vIC4uLmJ1dCBtaXNpbnRlcnByZXRzIGxlYWRpbmctbnVtYmVyIHN0cmluZ3MsIHBhcnRpY3VsYXJseSBoZXggbGl0ZXJhbHMgKFwiMHguLi5cIilcblx0XHRcdC8vIHN1YnRyYWN0aW9uIGZvcmNlcyBpbmZpbml0aWVzIHRvIE5hTlxuXHRcdFx0IWlzTmFOKCBvYmogLSBwYXJzZUZsb2F0KCBvYmogKSApO1xuXHR9LFxuXG5cdGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0dmFyIHByb3RvLCBDdG9yO1xuXG5cdFx0Ly8gRGV0ZWN0IG9idmlvdXMgbmVnYXRpdmVzXG5cdFx0Ly8gVXNlIHRvU3RyaW5nIGluc3RlYWQgb2YgalF1ZXJ5LnR5cGUgdG8gY2F0Y2ggaG9zdCBvYmplY3RzXG5cdFx0aWYgKCAhb2JqIHx8IHRvU3RyaW5nLmNhbGwoIG9iaiApICE9PSBcIltvYmplY3QgT2JqZWN0XVwiICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHByb3RvID0gZ2V0UHJvdG8oIG9iaiApO1xuXG5cdFx0Ly8gT2JqZWN0cyB3aXRoIG5vIHByb3RvdHlwZSAoZS5nLiwgYE9iamVjdC5jcmVhdGUoIG51bGwgKWApIGFyZSBwbGFpblxuXHRcdGlmICggIXByb3RvICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gT2JqZWN0cyB3aXRoIHByb3RvdHlwZSBhcmUgcGxhaW4gaWZmIHRoZXkgd2VyZSBjb25zdHJ1Y3RlZCBieSBhIGdsb2JhbCBPYmplY3QgZnVuY3Rpb25cblx0XHRDdG9yID0gaGFzT3duLmNhbGwoIHByb3RvLCBcImNvbnN0cnVjdG9yXCIgKSAmJiBwcm90by5jb25zdHJ1Y3Rvcjtcblx0XHRyZXR1cm4gdHlwZW9mIEN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBmblRvU3RyaW5nLmNhbGwoIEN0b3IgKSA9PT0gT2JqZWN0RnVuY3Rpb25TdHJpbmc7XG5cdH0sXG5cblx0aXNFbXB0eU9iamVjdDogZnVuY3Rpb24oIG9iaiApIHtcblxuXHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lc2xpbnQvZXNsaW50L2lzc3Vlcy82MTI1XG5cdFx0dmFyIG5hbWU7XG5cblx0XHRmb3IgKCBuYW1lIGluIG9iaiApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0dHlwZTogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRpZiAoIG9iaiA9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIG9iaiArIFwiXCI7XG5cdFx0fVxuXG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTIuMyBvbmx5IChmdW5jdGlvbmlzaCBSZWdFeHApXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID9cblx0XHRcdGNsYXNzMnR5cGVbIHRvU3RyaW5nLmNhbGwoIG9iaiApIF0gfHwgXCJvYmplY3RcIiA6XG5cdFx0XHR0eXBlb2Ygb2JqO1xuXHR9LFxuXG5cdC8vIEV2YWx1YXRlcyBhIHNjcmlwdCBpbiBhIGdsb2JhbCBjb250ZXh0XG5cdGdsb2JhbEV2YWw6IGZ1bmN0aW9uKCBjb2RlICkge1xuXHRcdERPTUV2YWwoIGNvZGUgKTtcblx0fSxcblxuXHQvLyBDb252ZXJ0IGRhc2hlZCB0byBjYW1lbENhc2U7IHVzZWQgYnkgdGhlIGNzcyBhbmQgZGF0YSBtb2R1bGVzXG5cdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExLCBFZGdlIDEyIC0gMTNcblx0Ly8gTWljcm9zb2Z0IGZvcmdvdCB0byBodW1wIHRoZWlyIHZlbmRvciBwcmVmaXggKCM5NTcyKVxuXHRjYW1lbENhc2U6IGZ1bmN0aW9uKCBzdHJpbmcgKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKCBybXNQcmVmaXgsIFwibXMtXCIgKS5yZXBsYWNlKCByZGFzaEFscGhhLCBmY2FtZWxDYXNlICk7XG5cdH0sXG5cblx0bm9kZU5hbWU6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHR9LFxuXG5cdGVhY2g6IGZ1bmN0aW9uKCBvYmosIGNhbGxiYWNrICkge1xuXHRcdHZhciBsZW5ndGgsIGkgPSAwO1xuXG5cdFx0aWYgKCBpc0FycmF5TGlrZSggb2JqICkgKSB7XG5cdFx0XHRsZW5ndGggPSBvYmoubGVuZ3RoO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAoIGkgaW4gb2JqICkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmo7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5XG5cdHRyaW06IGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdHJldHVybiB0ZXh0ID09IG51bGwgP1xuXHRcdFx0XCJcIiA6XG5cdFx0XHQoIHRleHQgKyBcIlwiICkucmVwbGFjZSggcnRyaW0sIFwiXCIgKTtcblx0fSxcblxuXHQvLyByZXN1bHRzIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG5cdG1ha2VBcnJheTogZnVuY3Rpb24oIGFyciwgcmVzdWx0cyApIHtcblx0XHR2YXIgcmV0ID0gcmVzdWx0cyB8fCBbXTtcblxuXHRcdGlmICggYXJyICE9IG51bGwgKSB7XG5cdFx0XHRpZiAoIGlzQXJyYXlMaWtlKCBPYmplY3QoIGFyciApICkgKSB7XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggcmV0LFxuXHRcdFx0XHRcdHR5cGVvZiBhcnIgPT09IFwic3RyaW5nXCIgP1xuXHRcdFx0XHRcdFsgYXJyIF0gOiBhcnJcblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHB1c2guY2FsbCggcmV0LCBhcnIgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdGluQXJyYXk6IGZ1bmN0aW9uKCBlbGVtLCBhcnIsIGkgKSB7XG5cdFx0cmV0dXJuIGFyciA9PSBudWxsID8gLTEgOiBpbmRleE9mLmNhbGwoIGFyciwgZWxlbSwgaSApO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdG1lcmdlOiBmdW5jdGlvbiggZmlyc3QsIHNlY29uZCApIHtcblx0XHR2YXIgbGVuID0gK3NlY29uZC5sZW5ndGgsXG5cdFx0XHRqID0gMCxcblx0XHRcdGkgPSBmaXJzdC5sZW5ndGg7XG5cblx0XHRmb3IgKCA7IGogPCBsZW47IGorKyApIHtcblx0XHRcdGZpcnN0WyBpKysgXSA9IHNlY29uZFsgaiBdO1xuXHRcdH1cblxuXHRcdGZpcnN0Lmxlbmd0aCA9IGk7XG5cblx0XHRyZXR1cm4gZmlyc3Q7XG5cdH0sXG5cblx0Z3JlcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgaW52ZXJ0ICkge1xuXHRcdHZhciBjYWxsYmFja0ludmVyc2UsXG5cdFx0XHRtYXRjaGVzID0gW10sXG5cdFx0XHRpID0gMCxcblx0XHRcdGxlbmd0aCA9IGVsZW1zLmxlbmd0aCxcblx0XHRcdGNhbGxiYWNrRXhwZWN0ID0gIWludmVydDtcblxuXHRcdC8vIEdvIHRocm91Z2ggdGhlIGFycmF5LCBvbmx5IHNhdmluZyB0aGUgaXRlbXNcblx0XHQvLyB0aGF0IHBhc3MgdGhlIHZhbGlkYXRvciBmdW5jdGlvblxuXHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0Y2FsbGJhY2tJbnZlcnNlID0gIWNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpICk7XG5cdFx0XHRpZiAoIGNhbGxiYWNrSW52ZXJzZSAhPT0gY2FsbGJhY2tFeHBlY3QgKSB7XG5cdFx0XHRcdG1hdGNoZXMucHVzaCggZWxlbXNbIGkgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBtYXRjaGVzO1xuXHR9LFxuXG5cdC8vIGFyZyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRtYXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGFyZyApIHtcblx0XHR2YXIgbGVuZ3RoLCB2YWx1ZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0cmV0ID0gW107XG5cblx0XHQvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgdHJhbnNsYXRpbmcgZWFjaCBvZiB0aGUgaXRlbXMgdG8gdGhlaXIgbmV3IHZhbHVlc1xuXHRcdGlmICggaXNBcnJheUxpa2UoIGVsZW1zICkgKSB7XG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGg7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBHbyB0aHJvdWdoIGV2ZXJ5IGtleSBvbiB0aGUgb2JqZWN0LFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKCBpIGluIGVsZW1zICkge1xuXHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpLCBhcmcgKTtcblxuXHRcdFx0XHRpZiAoIHZhbHVlICE9IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0LnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG5cdFx0cmV0dXJuIGNvbmNhdC5hcHBseSggW10sIHJldCApO1xuXHR9LFxuXG5cdC8vIEEgZ2xvYmFsIEdVSUQgY291bnRlciBmb3Igb2JqZWN0c1xuXHRndWlkOiAxLFxuXG5cdC8vIEJpbmQgYSBmdW5jdGlvbiB0byBhIGNvbnRleHQsIG9wdGlvbmFsbHkgcGFydGlhbGx5IGFwcGx5aW5nIGFueVxuXHQvLyBhcmd1bWVudHMuXG5cdHByb3h5OiBmdW5jdGlvbiggZm4sIGNvbnRleHQgKSB7XG5cdFx0dmFyIHRtcCwgYXJncywgcHJveHk7XG5cblx0XHRpZiAoIHR5cGVvZiBjb250ZXh0ID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0dG1wID0gZm5bIGNvbnRleHQgXTtcblx0XHRcdGNvbnRleHQgPSBmbjtcblx0XHRcdGZuID0gdG1wO1xuXHRcdH1cblxuXHRcdC8vIFF1aWNrIGNoZWNrIHRvIGRldGVybWluZSBpZiB0YXJnZXQgaXMgY2FsbGFibGUsIGluIHRoZSBzcGVjXG5cdFx0Ly8gdGhpcyB0aHJvd3MgYSBUeXBlRXJyb3IsIGJ1dCB3ZSB3aWxsIGp1c3QgcmV0dXJuIHVuZGVmaW5lZC5cblx0XHRpZiAoICFqUXVlcnkuaXNGdW5jdGlvbiggZm4gKSApIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gU2ltdWxhdGVkIGJpbmRcblx0XHRhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzLCAyICk7XG5cdFx0cHJveHkgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBmbi5hcHBseSggY29udGV4dCB8fCB0aGlzLCBhcmdzLmNvbmNhdCggc2xpY2UuY2FsbCggYXJndW1lbnRzICkgKSApO1xuXHRcdH07XG5cblx0XHQvLyBTZXQgdGhlIGd1aWQgb2YgdW5pcXVlIGhhbmRsZXIgdG8gdGhlIHNhbWUgb2Ygb3JpZ2luYWwgaGFuZGxlciwgc28gaXQgY2FuIGJlIHJlbW92ZWRcblx0XHRwcm94eS5ndWlkID0gZm4uZ3VpZCA9IGZuLmd1aWQgfHwgalF1ZXJ5Lmd1aWQrKztcblxuXHRcdHJldHVybiBwcm94eTtcblx0fSxcblxuXHRub3c6IERhdGUubm93LFxuXG5cdC8vIGpRdWVyeS5zdXBwb3J0IGlzIG5vdCB1c2VkIGluIENvcmUgYnV0IG90aGVyIHByb2plY3RzIGF0dGFjaCB0aGVpclxuXHQvLyBwcm9wZXJ0aWVzIHRvIGl0IHNvIGl0IG5lZWRzIHRvIGV4aXN0LlxuXHRzdXBwb3J0OiBzdXBwb3J0XG59ICk7XG5cbmlmICggdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRqUXVlcnkuZm5bIFN5bWJvbC5pdGVyYXRvciBdID0gYXJyWyBTeW1ib2wuaXRlcmF0b3IgXTtcbn1cblxuLy8gUG9wdWxhdGUgdGhlIGNsYXNzMnR5cGUgbWFwXG5qUXVlcnkuZWFjaCggXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yIFN5bWJvbFwiLnNwbGl0KCBcIiBcIiApLFxuZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xufSApO1xuXG5mdW5jdGlvbiBpc0FycmF5TGlrZSggb2JqICkge1xuXG5cdC8vIFN1cHBvcnQ6IHJlYWwgaU9TIDguMiBvbmx5IChub3QgcmVwcm9kdWNpYmxlIGluIHNpbXVsYXRvcilcblx0Ly8gYGluYCBjaGVjayB1c2VkIHRvIHByZXZlbnQgSklUIGVycm9yIChnaC0yMTQ1KVxuXHQvLyBoYXNPd24gaXNuJ3QgdXNlZCBoZXJlIGR1ZSB0byBmYWxzZSBuZWdhdGl2ZXNcblx0Ly8gcmVnYXJkaW5nIE5vZGVsaXN0IGxlbmd0aCBpbiBJRVxuXHR2YXIgbGVuZ3RoID0gISFvYmogJiYgXCJsZW5ndGhcIiBpbiBvYmogJiYgb2JqLmxlbmd0aCxcblx0XHR0eXBlID0galF1ZXJ5LnR5cGUoIG9iaiApO1xuXG5cdGlmICggdHlwZSA9PT0gXCJmdW5jdGlvblwiIHx8IGpRdWVyeS5pc1dpbmRvdyggb2JqICkgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIHR5cGUgPT09IFwiYXJyYXlcIiB8fCBsZW5ndGggPT09IDAgfHxcblx0XHR0eXBlb2YgbGVuZ3RoID09PSBcIm51bWJlclwiICYmIGxlbmd0aCA+IDAgJiYgKCBsZW5ndGggLSAxICkgaW4gb2JqO1xufVxuXG5yZXR1cm4galF1ZXJ5O1xufSApO1xuIl19