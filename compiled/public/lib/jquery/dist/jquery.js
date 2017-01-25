"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */
(function (global, factory) {

	"use strict";

	if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("jQuery requires a window with a document");
			}
			return factory(w);
		};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";

	var arr = [];

	var document = window.document;

	var getProto = Object.getPrototypeOf;

	var _slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call(Object);

	var support = {};

	function DOMEval(code, doc) {
		doc = doc || document;

		var script = doc.createElement("script");

		script.text = code;
		doc.head.appendChild(script).parentNode.removeChild(script);
	}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module


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
	var Sizzle =
	/*!
  * Sizzle CSS Selector Engine v2.3.3
  * https://sizzlejs.com/
  *
  * Copyright jQuery Foundation and other contributors
  * Released under the MIT license
  * http://jquery.org/license
  *
  * Date: 2016-08-08
  */
	function (window) {

		var i,
		    support,
		    Expr,
		    getText,
		    isXML,
		    tokenize,
		    compile,
		    select,
		    outermostContext,
		    sortInput,
		    hasDuplicate,


		// Local document vars
		setDocument,
		    document,
		    docElem,
		    documentIsHTML,
		    rbuggyQSA,
		    rbuggyMatches,
		    matches,
		    contains,


		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		    preferredDoc = window.document,
		    dirruns = 0,
		    done = 0,
		    classCache = createCache(),
		    tokenCache = createCache(),
		    compilerCache = createCache(),
		    sortOrder = function sortOrder(a, b) {
			if (a === b) {
				hasDuplicate = true;
			}
			return 0;
		},


		// Instance methods
		hasOwn = {}.hasOwnProperty,
		    arr = [],
		    pop = arr.pop,
		    push_native = arr.push,
		    push = arr.push,
		    slice = arr.slice,

		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function indexOf(list, elem) {
			var i = 0,
			    len = list.length;
			for (; i < len; i++) {
				if (list[i] === elem) {
					return i;
				}
			}
			return -1;
		},
		    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",


		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",


		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
		    pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" + ")\\)|)",


		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp(whitespace + "+", "g"),
		    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
		    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
		    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
		    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
		    rpseudo = new RegExp(pseudos),
		    ridentifier = new RegExp("^" + identifier + "$"),
		    matchExpr = {
			"ID": new RegExp("^#(" + identifier + ")"),
			"CLASS": new RegExp("^\\.(" + identifier + ")"),
			"TAG": new RegExp("^(" + identifier + "|[*])"),
			"ATTR": new RegExp("^" + attributes),
			"PSEUDO": new RegExp("^" + pseudos),
			"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
			"bool": new RegExp("^(?:" + booleans + ")$", "i"),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
		},
		    rinputs = /^(?:input|select|textarea|button)$/i,
		    rheader = /^h\d$/i,
		    rnative = /^[^{]+\{\s*\[native \w/,


		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		    rsibling = /[+~]/,


		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
		    funescape = function funescape(_, escaped, escapedWhitespace) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ? escaped : high < 0 ?
			// BMP codepoint
			String.fromCharCode(high + 0x10000) :
			// Supplemental Plane codepoint (surrogate pair)
			String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
		},


		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		    fcssescape = function fcssescape(ch, asCodePoint) {
			if (asCodePoint) {

				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if (ch === "\0") {
					return "\uFFFD";
				}

				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
			}

			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},


		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function unloadHandler() {
			setDocument();
		},
		    disabledAncestor = addCombinator(function (elem) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		}, { dir: "parentNode", next: "legend" });

		// Optimize for push.apply( _, NodeList )
		try {
			push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
			// Support: Android<4.0
			// Detect silently failing push.apply
			arr[preferredDoc.childNodes.length].nodeType;
		} catch (e) {
			push = { apply: arr.length ?

				// Leverage slice if possible
				function (target, els) {
					push_native.apply(target, slice.call(els));
				} :

				// Support: IE<9
				// Otherwise append directly
				function (target, els) {
					var j = target.length,
					    i = 0;
					// Can't trust NodeList.length
					while (target[j++] = els[i++]) {}
					target.length = j - 1;
				}
			};
		}

		function Sizzle(selector, context, results, seed) {
			var m,
			    i,
			    elem,
			    nid,
			    match,
			    groups,
			    newSelector,
			    newContext = context && context.ownerDocument,


			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

			results = results || [];

			// Return early from calls with invalid selector or context
			if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

				return results;
			}

			// Try to shortcut find operations (as opposed to filters) in HTML documents
			if (!seed) {

				if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
					setDocument(context);
				}
				context = context || document;

				if (documentIsHTML) {

					// If the selector is sufficiently simple, try using a "get*By*" DOM method
					// (excepting DocumentFragment context, where the methods don't exist)
					if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

						// ID selector
						if (m = match[1]) {

							// Document context
							if (nodeType === 9) {
								if (elem = context.getElementById(m)) {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}

								// Element context
							} else {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

									results.push(elem);
									return results;
								}
							}

							// Type selector
						} else if (match[2]) {
							push.apply(results, context.getElementsByTagName(selector));
							return results;

							// Class selector
						} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

							push.apply(results, context.getElementsByClassName(m));
							return results;
						}
					}

					// Take advantage of querySelectorAll
					if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

						if (nodeType !== 1) {
							newContext = context;
							newSelector = selector;

							// qSA looks outside Element context, which is not what we want
							// Thanks to Andrew Dupont for this workaround technique
							// Support: IE <=8
							// Exclude object elements
						} else if (context.nodeName.toLowerCase() !== "object") {

							// Capture the context ID, setting it first if necessary
							if (nid = context.getAttribute("id")) {
								nid = nid.replace(rcssescape, fcssescape);
							} else {
								context.setAttribute("id", nid = expando);
							}

							// Prefix every selector in the list
							groups = tokenize(selector);
							i = groups.length;
							while (i--) {
								groups[i] = "#" + nid + " " + toSelector(groups[i]);
							}
							newSelector = groups.join(",");

							// Expand context for sibling selectors
							newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
						}

						if (newSelector) {
							try {
								push.apply(results, newContext.querySelectorAll(newSelector));
								return results;
							} catch (qsaError) {} finally {
								if (nid === expando) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}
			}

			// All others
			return select(selector.replace(rtrim, "$1"), context, results, seed);
		}

		/**
   * Create key-value caches of limited size
   * @returns {function(string, object)} Returns the Object data after storing it on itself with
   *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
   *	deleting the oldest entry
   */
		function createCache() {
			var keys = [];

			function cache(key, value) {
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if (keys.push(key + " ") > Expr.cacheLength) {
					// Only keep the most recent entries
					delete cache[keys.shift()];
				}
				return cache[key + " "] = value;
			}
			return cache;
		}

		/**
   * Mark a function for special use by Sizzle
   * @param {Function} fn The function to mark
   */
		function markFunction(fn) {
			fn[expando] = true;
			return fn;
		}

		/**
   * Support testing using an element
   * @param {Function} fn Passed the created element and returns a boolean result
   */
		function assert(fn) {
			var el = document.createElement("fieldset");

			try {
				return !!fn(el);
			} catch (e) {
				return false;
			} finally {
				// Remove from its parent by default
				if (el.parentNode) {
					el.parentNode.removeChild(el);
				}
				// release memory in IE
				el = null;
			}
		}

		/**
   * Adds the same handler for all of the specified attrs
   * @param {String} attrs Pipe-separated list of attributes
   * @param {Function} handler The method that will be applied
   */
		function addHandle(attrs, handler) {
			var arr = attrs.split("|"),
			    i = arr.length;

			while (i--) {
				Expr.attrHandle[arr[i]] = handler;
			}
		}

		/**
   * Checks document order of two siblings
   * @param {Element} a
   * @param {Element} b
   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
   */
		function siblingCheck(a, b) {
			var cur = b && a,
			    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;

			// Use IE sourceIndex if available on both nodes
			if (diff) {
				return diff;
			}

			// Check if b follows a
			if (cur) {
				while (cur = cur.nextSibling) {
					if (cur === b) {
						return -1;
					}
				}
			}

			return a ? 1 : -1;
		}

		/**
   * Returns a function to use in pseudos for input types
   * @param {String} type
   */
		function createInputPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for buttons
   * @param {String} type
   */
		function createButtonPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for :enabled/:disabled
   * @param {Boolean} disabled true for :disabled; false for :enabled
   */
		function createDisabledPseudo(disabled) {

			// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
			return function (elem) {

				// Only certain elements can match :enabled or :disabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
				if ("form" in elem) {

					// Check for inherited disabledness on relevant non-disabled elements:
					// * listed form-associated elements in a disabled fieldset
					//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
					// * option elements in a disabled optgroup
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
					// All such elements have a "form" property.
					if (elem.parentNode && elem.disabled === false) {

						// Option elements defer to a parent optgroup if present
						if ("label" in elem) {
							if ("label" in elem.parentNode) {
								return elem.parentNode.disabled === disabled;
							} else {
								return elem.disabled === disabled;
							}
						}

						// Support: IE 6 - 11
						// Use the isDisabled shortcut property to check for disabled fieldset ancestors
						return elem.isDisabled === disabled ||

						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled;
					}

					return elem.disabled === disabled;

					// Try to winnow out elements that can't be disabled before trusting the disabled property.
					// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
					// even exist on them, let alone have a boolean value.
				} else if ("label" in elem) {
					return elem.disabled === disabled;
				}

				// Remaining elements are neither :enabled nor :disabled
				return false;
			};
		}

		/**
   * Returns a function to use in pseudos for positionals
   * @param {Function} fn
   */
		function createPositionalPseudo(fn) {
			return markFunction(function (argument) {
				argument = +argument;
				return markFunction(function (seed, matches) {
					var j,
					    matchIndexes = fn([], seed.length, argument),
					    i = matchIndexes.length;

					// Match elements found at the specified indexes
					while (i--) {
						if (seed[j = matchIndexes[i]]) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}

		/**
   * Checks a node for validity as a Sizzle context
   * @param {Element|Object=} context
   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
   */
		function testContext(context) {
			return context && typeof context.getElementsByTagName !== "undefined" && context;
		}

		// Expose support vars for convenience
		support = Sizzle.support = {};

		/**
   * Detects XML nodes
   * @param {Element|Object} elem An element or a document
   * @returns {Boolean} True iff elem is a non-HTML XML node
   */
		isXML = Sizzle.isXML = function (elem) {
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};

		/**
   * Sets document-related variables once based on the current document
   * @param {Element|Object} [doc] An element or document object to use to set the document
   * @returns {Object} Returns the current document
   */
		setDocument = Sizzle.setDocument = function (node) {
			var hasCompare,
			    subWindow,
			    doc = node ? node.ownerDocument || node : preferredDoc;

			// Return early if doc is invalid or already selected
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
				return document;
			}

			// Update global variables
			document = doc;
			docElem = document.documentElement;
			documentIsHTML = !isXML(document);

			// Support: IE 9-11, Edge
			// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
			if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {

				// Support: IE 11, Edge
				if (subWindow.addEventListener) {
					subWindow.addEventListener("unload", unloadHandler, false);

					// Support: IE 9 - 10 only
				} else if (subWindow.attachEvent) {
					subWindow.attachEvent("onunload", unloadHandler);
				}
			}

			/* Attributes
   ---------------------------------------------------------------------- */

			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties
			// (excepting IE8 booleans)
			support.attributes = assert(function (el) {
				el.className = "i";
				return !el.getAttribute("className");
			});

			/* getElement(s)By*
   ---------------------------------------------------------------------- */

			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert(function (el) {
				el.appendChild(document.createComment(""));
				return !el.getElementsByTagName("*").length;
			});

			// Support: IE<9
			support.getElementsByClassName = rnative.test(document.getElementsByClassName);

			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programmatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert(function (el) {
				docElem.appendChild(el).id = expando;
				return !document.getElementsByName || !document.getElementsByName(expando).length;
			});

			// ID filter and find
			if (support.getById) {
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						return elem.getAttribute("id") === attrId;
					};
				};
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var elem = context.getElementById(id);
						return elem ? [elem] : [];
					}
				};
			} else {
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};

				// Support: IE 6 - 7 only
				// getElementById is not reliable as a find shortcut
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var node,
						    i,
						    elems,
						    elem = context.getElementById(id);

						if (elem) {

							// Verify the id attribute
							node = elem.getAttributeNode("id");
							if (node && node.value === id) {
								return [elem];
							}

							// Fall back on getElementsByName
							elems = context.getElementsByName(id);
							i = 0;
							while (elem = elems[i++]) {
								node = elem.getAttributeNode("id");
								if (node && node.value === id) {
									return [elem];
								}
							}
						}

						return [];
					}
				};
			}

			// Tag
			Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
				if (typeof context.getElementsByTagName !== "undefined") {
					return context.getElementsByTagName(tag);

					// DocumentFragment nodes don't have gEBTN
				} else if (support.qsa) {
					return context.querySelectorAll(tag);
				}
			} : function (tag, context) {
				var elem,
				    tmp = [],
				    i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName(tag);

				// Filter out possible comments
				if (tag === "*") {
					while (elem = results[i++]) {
						if (elem.nodeType === 1) {
							tmp.push(elem);
						}
					}

					return tmp;
				}
				return results;
			};

			// Class
			Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
				if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
					return context.getElementsByClassName(className);
				}
			};

			/* QSA/matchesSelector
   ---------------------------------------------------------------------- */

			// QSA and matchesSelector support

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];

			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See https://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];

			if (support.qsa = rnative.test(document.querySelectorAll)) {
				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert(function (el) {
					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// https://bugs.jquery.com/ticket/12359
					docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if (el.querySelectorAll("[msallowcapture^='']").length) {
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
					}

					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if (!el.querySelectorAll("[selected]").length) {
						rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
					}

					// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
					if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
						rbuggyQSA.push("~=");
					}

					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if (!el.querySelectorAll(":checked").length) {
						rbuggyQSA.push(":checked");
					}

					// Support: Safari 8+, iOS 8+
					// https://bugs.webkit.org/show_bug.cgi?id=136851
					// In-page `selector#id sibling-combinator selector` fails
					if (!el.querySelectorAll("a#" + expando + "+*").length) {
						rbuggyQSA.push(".#.+[+~]");
					}
				});

				assert(function (el) {
					el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";

					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = document.createElement("input");
					input.setAttribute("type", "hidden");
					el.appendChild(input).setAttribute("name", "D");

					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if (el.querySelectorAll("[name=d]").length) {
						rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
					}

					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if (el.querySelectorAll(":enabled").length !== 2) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Support: IE9-11+
					// IE's :disabled selector does not pick up the children of disabled fieldsets
					docElem.appendChild(el).disabled = true;
					if (el.querySelectorAll(":disabled").length !== 2) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Opera 10-11 does not throw on post-comma invalid pseudos
					el.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}

			if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

				assert(function (el) {
					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call(el, "*");

					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call(el, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos);
				});
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

			/* Contains
   ---------------------------------------------------------------------- */
			hasCompare = rnative.test(docElem.compareDocumentPosition);

			// Element contains another
			// Purposefully self-exclusive
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
				    bup = b && b.parentNode;
				return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
			} : function (a, b) {
				if (b) {
					while (b = b.parentNode) {
						if (b === a) {
							return true;
						}
					}
				}
				return false;
			};

			/* Sorting
   ---------------------------------------------------------------------- */

			// Document order sorting
			sortOrder = hasCompare ? function (a, b) {

				// Flag for duplicate removal
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if (compare) {
					return compare;
				}

				// Calculate position if both inputs belong to the same document
				compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

				// Otherwise we know they are disconnected
				1;

				// Disconnected nodes
				if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

					// Choose the first element that is related to our preferred document
					if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
						return -1;
					}
					if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
						return 1;
					}

					// Maintain original order
					return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
				}

				return compare & 4 ? -1 : 1;
			} : function (a, b) {
				// Exit early if the nodes are identical
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				var cur,
				    i = 0,
				    aup = a.parentNode,
				    bup = b.parentNode,
				    ap = [a],
				    bp = [b];

				// Parentless nodes are either documents or disconnected
				if (!aup || !bup) {
					return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

					// If the nodes are siblings, we can do a quick check
				} else if (aup === bup) {
					return siblingCheck(a, b);
				}

				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while (cur = cur.parentNode) {
					ap.unshift(cur);
				}
				cur = b;
				while (cur = cur.parentNode) {
					bp.unshift(cur);
				}

				// Walk down the tree looking for a discrepancy
				while (ap[i] === bp[i]) {
					i++;
				}

				return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck(ap[i], bp[i]) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
			};

			return document;
		};

		Sizzle.matches = function (expr, elements) {
			return Sizzle(expr, null, null, elements);
		};

		Sizzle.matchesSelector = function (elem, expr) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			// Make sure that attribute selectors are quoted
			expr = expr.replace(rattributeQuotes, "='$1']");

			if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

				try {
					var ret = matches.call(elem, expr);

					// IE 9's matchesSelector returns false on disconnected nodes
					if (ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11) {
						return ret;
					}
				} catch (e) {}
			}

			return Sizzle(expr, document, null, [elem]).length > 0;
		};

		Sizzle.contains = function (context, elem) {
			// Set document vars if needed
			if ((context.ownerDocument || context) !== document) {
				setDocument(context);
			}
			return contains(context, elem);
		};

		Sizzle.attr = function (elem, name) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			var fn = Expr.attrHandle[name.toLowerCase()],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

			return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
		};

		Sizzle.escape = function (sel) {
			return (sel + "").replace(rcssescape, fcssescape);
		};

		Sizzle.error = function (msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};

		/**
   * Document sorting and removing duplicates
   * @param {ArrayLike} results
   */
		Sizzle.uniqueSort = function (results) {
			var elem,
			    duplicates = [],
			    j = 0,
			    i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);

			if (hasDuplicate) {
				while (elem = results[i++]) {
					if (elem === results[i]) {
						j = duplicates.push(i);
					}
				}
				while (j--) {
					results.splice(duplicates[j], 1);
				}
			}

			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;

			return results;
		};

		/**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param {Array|Element} elem
   */
		getText = Sizzle.getText = function (elem) {
			var node,
			    ret = "",
			    i = 0,
			    nodeType = elem.nodeType;

			if (!nodeType) {
				// If no nodeType, this is expected to be an array
				while (node = elem[i++]) {
					// Do not traverse comment nodes
					ret += getText(node);
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if (typeof elem.textContent === "string") {
					return elem.textContent;
				} else {
					// Traverse its children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText(elem);
					}
				}
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes

			return ret;
		};

		Expr = Sizzle.selectors = {

			// Can be adjusted by the user
			cacheLength: 50,

			createPseudo: markFunction,

			match: matchExpr,

			attrHandle: {},

			find: {},

			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},

			preFilter: {
				"ATTR": function ATTR(match) {
					match[1] = match[1].replace(runescape, funescape);

					// Move the given value to match[3] whether quoted or unquoted
					match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

					if (match[2] === "~=") {
						match[3] = " " + match[3] + " ";
					}

					return match.slice(0, 4);
				},

				"CHILD": function CHILD(match) {
					/* matches from matchExpr["CHILD"]
     	1 type (only|nth|...)
     	2 what (child|of-type)
     	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
     	4 xn-component of xn+y argument ([+-]?\d*n|)
     	5 sign of xn-component
     	6 x of xn-component
     	7 sign of y-component
     	8 y of y-component
     */
					match[1] = match[1].toLowerCase();

					if (match[1].slice(0, 3) === "nth") {
						// nth-* requires argument
						if (!match[3]) {
							Sizzle.error(match[0]);
						}

						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +(match[7] + match[8] || match[3] === "odd");

						// other types prohibit arguments
					} else if (match[3]) {
						Sizzle.error(match[0]);
					}

					return match;
				},

				"PSEUDO": function PSEUDO(match) {
					var excess,
					    unquoted = !match[6] && match[2];

					if (matchExpr["CHILD"].test(match[0])) {
						return null;
					}

					// Accept quoted arguments as-is
					if (match[3]) {
						match[2] = match[4] || match[5] || "";

						// Strip excess characters from unquoted arguments
					} else if (unquoted && rpseudo.test(unquoted) && (
					// Get excess from tokenize (recursively)
					excess = tokenize(unquoted, true)) && (
					// advance to the next closing parenthesis
					excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

						// excess is a negative index
						match[0] = match[0].slice(0, excess);
						match[2] = unquoted.slice(0, excess);
					}

					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice(0, 3);
				}
			},

			filter: {

				"TAG": function TAG(nodeNameSelector) {
					var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
					return nodeNameSelector === "*" ? function () {
						return true;
					} : function (elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
				},

				"CLASS": function CLASS(className) {
					var pattern = classCache[className + " "];

					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
						return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
					});
				},

				"ATTR": function ATTR(name, operator, check) {
					return function (elem) {
						var result = Sizzle.attr(elem, name);

						if (result == null) {
							return operator === "!=";
						}
						if (!operator) {
							return true;
						}

						result += "";

						return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
					};
				},

				"CHILD": function CHILD(type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
					    forward = type.slice(-4) !== "last",
					    ofType = what === "of-type";

					return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function (elem) {
						return !!elem.parentNode;
					} : function (elem, context, xml) {
						var cache,
						    uniqueCache,
						    outerCache,
						    node,
						    nodeIndex,
						    start,
						    dir = simple !== forward ? "nextSibling" : "previousSibling",
						    parent = elem.parentNode,
						    name = ofType && elem.nodeName.toLowerCase(),
						    useCache = !xml && !ofType,
						    diff = false;

						if (parent) {

							// :(first|last|only)-(child|of-type)
							if (simple) {
								while (dir) {
									node = elem;
									while (node = node[dir]) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [forward ? parent.firstChild : parent.lastChild];

							// non-xml :nth-child(...) stores cache data on `parent`
							if (forward && useCache) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[expando] || (node[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

								cache = uniqueCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = nodeIndex && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];

								while (node = ++nodeIndex && node && node[dir] || (

								// Fallback to seeking `elem` from the start
								diff = nodeIndex = 0) || start.pop()) {

									// When found, cache indexes on `parent` and break
									if (node.nodeType === 1 && ++diff && node === elem) {
										uniqueCache[type] = [dirruns, nodeIndex, diff];
										break;
									}
								}
							} else {
								// Use previously-cached element index if available
								if (useCache) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[expando] || (node[expando] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

									cache = uniqueCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if (diff === false) {
									// Use the same loop as above to seek `elem` from the start
									while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

										if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

											// Cache the index of each encountered element
											if (useCache) {
												outerCache = node[expando] || (node[expando] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

												uniqueCache[type] = [dirruns, diff];
											}

											if (node === elem) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || diff % first === 0 && diff / first >= 0;
						}
					};
				},

				"PSEUDO": function PSEUDO(pseudo, argument) {
					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
					    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if (fn[expando]) {
						return fn(argument);
					}

					// But maintain support for old signatures
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
							var idx,
							    matched = fn(seed, argument),
							    i = matched.length;
							while (i--) {
								idx = indexOf(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i]);
							}
						}) : function (elem) {
							return fn(elem, 0, args);
						};
					}

					return fn;
				}
			},

			pseudos: {
				// Potentially complex pseudos
				"not": markFunction(function (selector) {
					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
					    results = [],
					    matcher = compile(selector.replace(rtrim, "$1"));

					return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
						var elem,
						    unmatched = matcher(seed, null, xml, []),
						    i = seed.length;

						// Match elements unmatched by `matcher`
						while (i--) {
							if (elem = unmatched[i]) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) : function (elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
				}),

				"has": markFunction(function (selector) {
					return function (elem) {
						return Sizzle(selector, elem).length > 0;
					};
				}),

				"contains": markFunction(function (text) {
					text = text.replace(runescape, funescape);
					return function (elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
					};
				}),

				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction(function (lang) {
					// lang value must be a valid identifier
					if (!ridentifier.test(lang || "")) {
						Sizzle.error("unsupported lang: " + lang);
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function (elem) {
						var elemLang;
						do {
							if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false;
					};
				}),

				// Miscellaneous
				"target": function target(elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id;
				},

				"root": function root(elem) {
					return elem === docElem;
				},

				"focus": function focus(elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
				},

				// Boolean properties
				"enabled": createDisabledPseudo(false),
				"disabled": createDisabledPseudo(true),

				"checked": function checked(elem) {
					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
				},

				"selected": function selected(elem) {
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if (elem.parentNode) {
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				// Contents
				"empty": function empty(elem) {
					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeType < 6) {
							return false;
						}
					}
					return true;
				},

				"parent": function parent(elem) {
					return !Expr.pseudos["empty"](elem);
				},

				// Element/input types
				"header": function header(elem) {
					return rheader.test(elem.nodeName);
				},

				"input": function input(elem) {
					return rinputs.test(elem.nodeName);
				},

				"button": function button(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},

				"text": function text(elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
				},

				// Position-in-collection
				"first": createPositionalPseudo(function () {
					return [0];
				}),

				"last": createPositionalPseudo(function (matchIndexes, length) {
					return [length - 1];
				}),

				"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument];
				}),

				"even": createPositionalPseudo(function (matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"odd": createPositionalPseudo(function (matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				})
			}
		};

		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		// Add button/input type pseudos
		for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
			Expr.pseudos[i] = createInputPseudo(i);
		}
		for (i in { submit: true, reset: true }) {
			Expr.pseudos[i] = createButtonPseudo(i);
		}

		// Easy API for creating new setFilters
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		tokenize = Sizzle.tokenize = function (selector, parseOnly) {
			var matched,
			    match,
			    tokens,
			    type,
			    soFar,
			    groups,
			    preFilters,
			    cached = tokenCache[selector + " "];

			if (cached) {
				return parseOnly ? 0 : cached.slice(0);
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;

			while (soFar) {

				// Comma and first run
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) {
						// Don't consume trailing commas as valid
						soFar = soFar.slice(match[0].length) || soFar;
					}
					groups.push(tokens = []);
				}

				matched = false;

				// Combinators
				if (match = rcombinators.exec(soFar)) {
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length);
				}

				// Filters
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length);
					}
				}

				if (!matched) {
					break;
				}
			}

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
			// Cache the tokens
			tokenCache(selector, groups).slice(0);
		};

		function toSelector(tokens) {
			var i = 0,
			    len = tokens.length,
			    selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value;
			}
			return selector;
		}

		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
			    skip = combinator.next,
			    key = skip || dir,
			    checkNonElements = base && key === "parentNode",
			    doneName = done++;

			return combinator.first ?
			// Check against closest ancestor/preceding element
			function (elem, context, xml) {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						return matcher(elem, context, xml);
					}
				}
				return false;
			} :

			// Check against all ancestor/preceding elements
			function (elem, context, xml) {
				var oldCache,
				    uniqueCache,
				    outerCache,
				    newCache = [dirruns, doneName];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if (xml) {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) {
								return true;
							}
						}
					}
				} else {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

							if (skip && skip === elem.nodeName.toLowerCase()) {
								elem = elem[dir] || elem;
							} else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

								// Assign to newCache so results back-propagate to previous elements
								return newCache[2] = oldCache[2];
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[key] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if (newCache[2] = matcher(elem, context, xml)) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
		}

		function elementMatcher(matchers) {
			return matchers.length > 1 ? function (elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) {
						return false;
					}
				}
				return true;
			} : matchers[0];
		}

		function multipleContexts(selector, contexts, results) {
			var i = 0,
			    len = contexts.length;
			for (; i < len; i++) {
				Sizzle(selector, contexts[i], results);
			}
			return results;
		}

		function condense(unmatched, map, filter, context, xml) {
			var elem,
			    newUnmatched = [],
			    i = 0,
			    len = unmatched.length,
			    mapped = map != null;

			for (; i < len; i++) {
				if (elem = unmatched[i]) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) {
							map.push(i);
						}
					}
				}
			}

			return newUnmatched;
		}

		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) {
				postFilter = setMatcher(postFilter);
			}
			if (postFinder && !postFinder[expando]) {
				postFinder = setMatcher(postFinder, postSelector);
			}
			return markFunction(function (seed, results, context, xml) {
				var temp,
				    i,
				    elem,
				    preMap = [],
				    postMap = [],
				    preexisting = results.length,


				// Get initial elements from seed or context
				elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
				    matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || (seed ? preFilter : preexisting || postFilter) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results : matcherIn;

				// Find primary matches
				if (matcher) {
					matcher(matcherIn, matcherOut, context, xml);
				}

				// Apply postFilter
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);

					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while (i--) {
						if (elem = temp[i]) {
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
						}
					}
				}

				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if (elem = matcherOut[i]) {
									// Restore matcherIn since elem is not yet a final match
									temp.push(matcherIn[i] = elem);
								}
							}
							postFinder(null, matcherOut = [], temp, xml);
						}

						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

								seed[temp] = !(results[temp] = elem);
							}
						}
					}

					// Add elements to results, through postFinder if defined
				} else {
					matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
					if (postFinder) {
						postFinder(null, results, matcherOut, xml);
					} else {
						push.apply(results, matcherOut);
					}
				}
			});
		}

		function matcherFromTokens(tokens) {
			var checkContext,
			    matcher,
			    j,
			    len = tokens.length,
			    leadingRelative = Expr.relative[tokens[0].type],
			    implicitRelative = leadingRelative || Expr.relative[" "],
			    i = leadingRelative ? 1 : 0,


			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator(function (elem) {
				return elem === checkContext;
			}, implicitRelative, true),
			    matchAnyContext = addCombinator(function (elem) {
				return indexOf(checkContext, elem) > -1;
			}, implicitRelative, true),
			    matchers = [function (elem, context, xml) {
				var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			}];

			for (; i < len; i++) {
				if (matcher = Expr.relative[tokens[i].type]) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)];
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

					// Return special upon seeing a positional matcher
					if (matcher[expando]) {
						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break;
							}
						}
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
					}
					matchers.push(matcher);
				}
			}

			return elementMatcher(matchers);
		}

		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var bySet = setMatchers.length > 0,
			    byElement = elementMatchers.length > 0,
			    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
				var elem,
				    j,
				    matcher,
				    matchedCount = 0,
				    i = "0",
				    unmatched = seed && [],
				    setMatched = [],
				    contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]("*", outermost),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
				    len = elems.length;

				if (outermost) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for (; i !== len && (elem = elems[i]) != null; i++) {
					if (byElement && elem) {
						j = 0;
						if (!context && elem.ownerDocument !== document) {
							setDocument(elem);
							xml = !documentIsHTML;
						}
						while (matcher = elementMatchers[j++]) {
							if (matcher(elem, context || document, xml)) {
								results.push(elem);
								break;
							}
						}
						if (outermost) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if (bySet) {
						// They will have gone through all possible matchers
						if (elem = !matcher && elem) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if (seed) {
							unmatched.push(elem);
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if (bySet && i !== matchedCount) {
					j = 0;
					while (matcher = setMatchers[j++]) {
						matcher(unmatched, setMatched, context, xml);
					}

					if (seed) {
						// Reintegrate element matches to eliminate the need for sorting
						if (matchedCount > 0) {
							while (i--) {
								if (!(unmatched[i] || setMatched[i])) {
									setMatched[i] = pop.call(results);
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense(setMatched);
					}

					// Add matches to results
					push.apply(results, setMatched);

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

						Sizzle.uniqueSort(results);
					}
				}

				// Override manipulation of globals by nested matchers
				if (outermost) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

			return bySet ? markFunction(superMatcher) : superMatcher;
		}

		compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
			var i,
			    setMatchers = [],
			    elementMatchers = [],
			    cached = compilerCache[selector + " "];

			if (!cached) {
				// Generate a function of recursive functions that can be used to check each element
				if (!match) {
					match = tokenize(selector);
				}
				i = match.length;
				while (i--) {
					cached = matcherFromTokens(match[i]);
					if (cached[expando]) {
						setMatchers.push(cached);
					} else {
						elementMatchers.push(cached);
					}
				}

				// Cache the compiled function
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};

		/**
   * A low-level selection function that works with Sizzle's compiled
   *  selector functions
   * @param {String|Function} selector A selector or a pre-compiled
   *  selector function built with Sizzle.compile
   * @param {Element} context
   * @param {Array} [results]
   * @param {Array} [seed] A set of elements to match against
   */
		select = Sizzle.select = function (selector, context, results, seed) {
			var i,
			    tokens,
			    token,
			    type,
			    find,
			    compiled = typeof selector === "function" && selector,
			    match = !seed && tokenize(selector = compiled.selector || selector);

			results = results || [];

			// Try to minimize operations if there is only one selector in the list and no seed
			// (the latter of which guarantees us context)
			if (match.length === 1) {

				// Reduce context if the leading compound selector is an ID
				tokens = match[0] = match[0].slice(0);
				if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

					context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
					if (!context) {
						return results;

						// Precompiled matchers will still verify ancestry, so step up a level
					} else if (compiled) {
						context = context.parentNode;
					}

					selector = selector.slice(tokens.shift().value.length);
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
				while (i--) {
					token = tokens[i];

					// Abort if we hit a combinator
					if (Expr.relative[type = token.type]) {
						break;
					}
					if (find = Expr.find[type]) {
						// Search, expanding context for leading sibling combinators
						if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice(i, 1);
							selector = seed.length && toSelector(tokens);
							if (!selector) {
								push.apply(results, seed);
								return results;
							}

							break;
						}
					}
				}
			}

			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
			return results;
		};

		// One-time assignments

		// Sort stability
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

		// Support: Chrome 14-35+
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;

		// Initialize against the default document
		setDocument();

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function (el) {
			// Should return 1, but returns 4 (following)
			return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
		});

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!assert(function (el) {
			el.innerHTML = "<a href='#'></a>";
			return el.firstChild.getAttribute("href") === "#";
		})) {
			addHandle("type|href|height|width", function (elem, name, isXML) {
				if (!isXML) {
					return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
				}
			});
		}

		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if (!support.attributes || !assert(function (el) {
			el.innerHTML = "<input/>";
			el.firstChild.setAttribute("value", "");
			return el.firstChild.getAttribute("value") === "";
		})) {
			addHandle("value", function (elem, name, isXML) {
				if (!isXML && elem.nodeName.toLowerCase() === "input") {
					return elem.defaultValue;
				}
			});
		}

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if (!assert(function (el) {
			return el.getAttribute("disabled") == null;
		})) {
			addHandle(booleans, function (elem, name, isXML) {
				var val;
				if (!isXML) {
					return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
				}
			});
		}

		return Sizzle;
	}(window);

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;

	var dir = function dir(elem, _dir, until) {
		var matched = [],
		    truncate = until !== undefined;

		while ((elem = elem[_dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};

	var _siblings = function _siblings(n, elem) {
		var matched = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				matched.push(n);
			}
		}

		return matched;
	};

	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}

		// Single element
		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return elem === qualifier !== not;
			});
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if (typeof qualifier !== "string") {
			return jQuery.grep(elements, function (elem) {
				return indexOf.call(qualifier, elem) > -1 !== not;
			});
		}

		// Simple selector that can be filtered directly, removing non-Elements
		if (risSimple.test(qualifier)) {
			return jQuery.filter(qualifier, elements, not);
		}

		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter(qualifier, elements);
		return jQuery.grep(elements, function (elem) {
			return indexOf.call(qualifier, elem) > -1 !== not && elem.nodeType === 1;
		});
	}

	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];

		if (not) {
			expr = ":not(" + expr + ")";
		}

		if (elems.length === 1 && elem.nodeType === 1) {
			return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
		}

		return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
			return elem.nodeType === 1;
		}));
	};

	jQuery.fn.extend({
		find: function find(selector) {
			var i,
			    ret,
			    len = this.length,
			    self = this;

			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			ret = this.pushStack([]);

			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}

			return len > 1 ? jQuery.uniqueSort(ret) : ret;
		},
		filter: function filter(selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function not(selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function is(selector) {
			return !!winnow(this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
		}
	});

	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,


	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	    init = jQuery.fn.init = function (selector, context, root) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if (typeof selector === "string") {
			if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];
			} else {
				match = rquickExpr.exec(selector);
			}

			// Match html or make sure no context is specified for #id
			if (match && (match[1] || !context)) {

				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
						for (match in context) {

							// Properties of context are called as methods if possible
							if (jQuery.isFunction(this[match])) {
								this[match](context[match]);

								// ...and otherwise set as attributes
							} else {
								this.attr(match, context[match]);
							}
						}
					}

					return this;

					// HANDLE: $(#id)
				} else {
					elem = document.getElementById(match[2]);

					if (elem) {

						// Inject the element directly into the jQuery object
						this[0] = elem;
						this.length = 1;
					}
					return this;
				}

				// HANDLE: $(expr, $(...))
			} else if (!context || context.jquery) {
				return (context || root).find(selector);

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor(context).find(selector);
			}

			// HANDLE: $(DOMElement)
		} else if (selector.nodeType) {
			this[0] = selector;
			this.length = 1;
			return this;

			// HANDLE: $(function)
			// Shortcut for document ready
		} else if (jQuery.isFunction(selector)) {
			return root.ready !== undefined ? root.ready(selector) :

			// Execute immediately if ready is not present
			selector(jQuery);
		}

		return jQuery.makeArray(selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	var rparentsprev = /^(?:parents|prev(?:Until|All))/,


	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

	jQuery.fn.extend({
		has: function has(target) {
			var targets = jQuery(target, this),
			    l = targets.length;

			return this.filter(function () {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest: function closest(selectors, context) {
			var cur,
			    i = 0,
			    l = this.length,
			    matched = [],
			    targets = typeof selectors !== "string" && jQuery(selectors);

			// Positional selectors never match, since there's no _selection_ context
			if (!rneedsContext.test(selectors)) {
				for (; i < l; i++) {
					for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

						// Always skip document fragments
						if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

							matched.push(cur);
							break;
						}
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index: function index(elem) {

			// No argument, return index in parent
			if (!elem) {
				return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem);
		},

		add: function add(selector, context) {
			return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
		},

		addBack: function addBack(selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	jQuery.each({
		parent: function parent(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function parents(elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function parentsUntil(elem, i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function next(elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function prev(elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function nextAll(elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function prevAll(elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function nextUntil(elem, i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function prevUntil(elem, i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function siblings(elem) {
			return _siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function children(elem) {
			return _siblings(elem.firstChild);
		},
		contents: function contents(elem) {
			return elem.contentDocument || jQuery.merge([], elem.childNodes);
		}
	}, function (name, fn) {
		jQuery.fn[name] = function (until, selector) {
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until") {
				selector = until;
			}

			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {

				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

	// Convert String-formatted options into Object-formatted ones
	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}

	/*
  * Create a callback list using the following parameters:
  *
  *	options: an optional list of space-separated options that will change how
  *			the callback list behaves or a more traditional option object
  *
  * By default a callback list will act like an event callback list and can be
  * "fired" multiple times.
  *
  * Possible options:
  *
  *	once:			will ensure the callback list can only be fired once (like a Deferred)
  *
  *	memory:			will keep track of previous values and will call any callback added
  *					after the list has been fired right away with the latest "memorized"
  *					values (like a Deferred)
  *
  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
  *
  *	stopOnFalse:	interrupt callings when a callback returns false
  *
  */
	jQuery.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

		var // Flag to know if list is currently firing
		firing,


		// Last fire value for non-forgettable lists
		memory,


		// Flag to know if list was already fired
		_fired,


		// Flag to prevent firing
		_locked,


		// Actual callback list
		list = [],


		// Queue of execution data for repeatable lists
		queue = [],


		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,


		// Fire callbacks
		fire = function fire() {

			// Enforce single-firing
			_locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			_fired = firing = true;
			for (; queue.length; firingIndex = -1) {
				memory = queue.shift();
				while (++firingIndex < list.length) {

					// Run callback and check for early termination
					if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if (!options.memory) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if (_locked) {

				// Keep an empty list if we have data for future add calls
				if (memory) {
					list = [];

					// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},


		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function add() {
				if (list) {

					// If we have memory from a past run, we should fire after adding
					if (memory && !firing) {
						firingIndex = list.length - 1;
						queue.push(memory);
					}

					(function add(args) {
						jQuery.each(args, function (_, arg) {
							if (jQuery.isFunction(arg)) {
								if (!options.unique || !self.has(arg)) {
									list.push(arg);
								}
							} else if (arg && arg.length && jQuery.type(arg) !== "string") {

								// Inspect recursively
								add(arg);
							}
						});
					})(arguments);

					if (memory && !firing) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function remove() {
				jQuery.each(arguments, function (_, arg) {
					var index;
					while ((index = jQuery.inArray(arg, list, index)) > -1) {
						list.splice(index, 1);

						// Handle firing indexes
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function has(fn) {
				return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function empty() {
				if (list) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function disable() {
				_locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function disabled() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function lock() {
				_locked = queue = [];
				if (!memory && !firing) {
					list = memory = "";
				}
				return this;
			},
			locked: function locked() {
				return !!_locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function fireWith(context, args) {
				if (!_locked) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					queue.push(args);
					if (!firing) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function fire() {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function fired() {
				return !!_fired;
			}
		};

		return self;
	};

	function Identity(v) {
		return v;
	}
	function Thrower(ex) {
		throw ex;
	}

	function adoptValue(value, resolve, reject) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if (value && jQuery.isFunction(method = value.promise)) {
				method.call(value).done(resolve).fail(reject);

				// Other thenables
			} else if (value && jQuery.isFunction(method = value.then)) {
				method.call(value, resolve, reject);

				// Other non-thenables
			} else {

				// Support: Android 4.0 only
				// Strict mode functions invoked without .call/.apply get global-object context
				resolve.call(undefined, value);
			}

			// For Promises/A+, convert exceptions into rejections
			// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
			// Deferred#then to conditionally suppress rejection.
		} catch (value) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.call(undefined, value);
		}
	}

	jQuery.extend({

		Deferred: function Deferred(func) {
			var tuples = [

			// action, add listener, callbacks,
			// ... .then handlers, argument index, [final state]
			["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
			    _state = "pending",
			    _promise = {
				state: function state() {
					return _state;
				},
				always: function always() {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				"catch": function _catch(fn) {
					return _promise.then(null, fn);
				},

				// Keep pipe for back-compat
				pipe: function pipe() /* fnDone, fnFail, fnProgress */{
					var fns = arguments;

					return jQuery.Deferred(function (newDefer) {
						jQuery.each(tuples, function (i, tuple) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[tuple[1]](function () {
								var returned = fn && fn.apply(this, arguments);
								if (returned && jQuery.isFunction(returned.promise)) {
									returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
								} else {
									newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
								}
							});
						});
						fns = null;
					}).promise();
				},
				then: function then(onFulfilled, onRejected, onProgress) {
					var maxDepth = 0;
					function resolve(depth, deferred, handler, special) {
						return function () {
							var that = this,
							    args = arguments,
							    mightThrow = function mightThrow() {
								var returned, then;

								// Support: Promises/A+ section 2.3.3.3.3
								// https://promisesaplus.com/#point-59
								// Ignore double-resolution attempts
								if (depth < maxDepth) {
									return;
								}

								returned = handler.apply(that, args);

								// Support: Promises/A+ section 2.3.1
								// https://promisesaplus.com/#point-48
								if (returned === deferred.promise()) {
									throw new TypeError("Thenable self-resolution");
								}

								// Support: Promises/A+ sections 2.3.3.1, 3.5
								// https://promisesaplus.com/#point-54
								// https://promisesaplus.com/#point-75
								// Retrieve `then` only once
								then = returned && (

								// Support: Promises/A+ section 2.3.4
								// https://promisesaplus.com/#point-64
								// Only check objects and functions for thenability
								(typeof returned === "undefined" ? "undefined" : _typeof(returned)) === "object" || typeof returned === "function") && returned.then;

								// Handle a returned thenable
								if (jQuery.isFunction(then)) {

									// Special processors (notify) just wait for resolution
									if (special) {
										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));

										// Normal processors (resolve) also hook into progress
									} else {

										// ...and disregard older resolution values
										maxDepth++;

										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
									}

									// Handle all other returned values
								} else {

									// Only substitute handlers pass on context
									// and multiple values (non-spec behavior)
									if (handler !== Identity) {
										that = undefined;
										args = [returned];
									}

									// Process the value(s)
									// Default process is resolve
									(special || deferred.resolveWith)(that, args);
								}
							},


							// Only normal processors (resolve) catch and reject exceptions
							process = special ? mightThrow : function () {
								try {
									mightThrow();
								} catch (e) {

									if (jQuery.Deferred.exceptionHook) {
										jQuery.Deferred.exceptionHook(e, process.stackTrace);
									}

									// Support: Promises/A+ section 2.3.3.3.4.1
									// https://promisesaplus.com/#point-61
									// Ignore post-resolution exceptions
									if (depth + 1 >= maxDepth) {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if (handler !== Thrower) {
											that = undefined;
											args = [e];
										}

										deferred.rejectWith(that, args);
									}
								}
							};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if (depth) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if (jQuery.Deferred.getStackHook) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout(process);
							}
						};
					}

					return jQuery.Deferred(function (newDefer) {

						// progress_handlers.add( ... )
						tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

						// fulfilled_handlers.add( ... )
						tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));

						// rejected_handlers.add( ... )
						tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function promise(obj) {
					return obj != null ? jQuery.extend(obj, _promise) : _promise;
				}
			},
			    deferred = {};

			// Add list-specific methods
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
				    stateString = tuple[5];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				_promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						_state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[3 - i][2].disable,

					// progress_callbacks.lock
					tuples[0][2].lock);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add(tuple[3].fire);

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			_promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function when(singleValue) {
			var

			// count of uncompleted subordinates
			remaining = arguments.length,


			// count of unprocessed arguments
			i = remaining,


			// subordinate fulfillment data
			resolveContexts = Array(i),
			    resolveValues = _slice.call(arguments),


			// the master Deferred
			master = jQuery.Deferred(),


			// subordinate callback factory
			updateFunc = function updateFunc(i) {
				return function (value) {
					resolveContexts[i] = this;
					resolveValues[i] = arguments.length > 1 ? _slice.call(arguments) : value;
					if (! --remaining) {
						master.resolveWith(resolveContexts, resolveValues);
					}
				};
			};

			// Single- and empty arguments are adopted like Promise.resolve
			if (remaining <= 1) {
				adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject);

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if (master.state() === "pending" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {

					return master.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while (i--) {
				adoptValue(resolveValues[i], updateFunc(i), master.reject);
			}

			return master.promise();
		}
	});

	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	jQuery.Deferred.exceptionHook = function (error, stack) {

		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
			window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
		}
	};

	jQuery.readyException = function (error) {
		window.setTimeout(function () {
			throw error;
		});
	};

	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();

	jQuery.fn.ready = function (fn) {

		readyList.then(fn)

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch(function (error) {
			jQuery.readyException(error);
		});

		return this;
	};

	jQuery.extend({

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function holdReady(hold) {
			if (hold) {
				jQuery.readyWait++;
			} else {
				jQuery.ready(true);
			}
		},

		// Handle when the DOM is ready
		ready: function ready(wait) {

			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);
		}
	});

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener("DOMContentLoaded", completed);
		window.removeEventListener("load", completed);
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout(jQuery.ready);
	} else {

		// Use the handy event callback
		document.addEventListener("DOMContentLoaded", completed);

		// A fallback to window.onload, that will always work
		window.addEventListener("load", completed);
	}

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
		var i = 0,
		    len = elems.length,
		    bulk = key == null;

		// Sets many values
		if (jQuery.type(key) === "object") {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined) {
			chainable = true;

			if (!jQuery.isFunction(value)) {
				raw = true;
			}

			if (bulk) {

				// Bulk operations run against the entire set
				if (raw) {
					fn.call(elems, value);
					fn = null;

					// ...except when executing function values
				} else {
					bulk = fn;
					fn = function fn(elem, key, value) {
						return bulk.call(jQuery(elem), value);
					};
				}
			}

			if (fn) {
				for (; i < len; i++) {
					fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
				}
			}
		}

		if (chainable) {
			return elems;
		}

		// Gets
		if (bulk) {
			return fn.call(elems);
		}

		return len ? fn(elems[0], key) : emptyGet;
	};
	var acceptData = function acceptData(owner) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
	};

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function cache(owner) {

			// Check if the owner object already has a cache
			var value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
						Object.defineProperty(owner, this.expando, {
							value: value,
							configurable: true
						});
					}
				}
			}

			return value;
		},
		set: function set(owner, data, value) {
			var prop,
			    cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if (typeof data === "string") {
				cache[jQuery.camelCase(data)] = value;

				// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for (prop in data) {
					cache[jQuery.camelCase(prop)] = data[prop];
				}
			}
			return cache;
		},
		get: function get(owner, key) {
			return key === undefined ? this.cache(owner) :

			// Always use camelCase key (gh-2257)
			owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
		},
		access: function access(owner, key, value) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined || key && typeof key === "string" && value === undefined) {

				return this.get(owner, key);
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function remove(owner, key) {
			var i,
			    cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key !== undefined) {

				// Support array or space separated string of keys
				if (jQuery.isArray(key)) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map(jQuery.camelCase);
				} else {
					key = jQuery.camelCase(key);

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
				}

				i = key.length;

				while (i--) {
					delete cache[key[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function hasData(owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();

	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function getData(data) {
		if (data === "true") {
			return true;
		}

		if (data === "false") {
			return false;
		}

		if (data === "null") {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if (data === +data + "") {
			return +data;
		}

		if (rbrace.test(data)) {
			return JSON.parse(data);
		}

		return data;
	}

	function dataAttr(elem, key, data) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string") {
				try {
					data = getData(data);
				} catch (e) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function hasData(elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},

		data: function data(elem, name, _data) {
			return dataUser.access(elem, name, _data);
		},

		removeData: function removeData(elem, name) {
			dataUser.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function _data(elem, name, data) {
			return dataPriv.access(elem, name, data);
		},

		_removeData: function _removeData(elem, name) {
			dataPriv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function data(key, value) {
			var i,
			    name,
			    data,
			    elem = this[0],
			    attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);

					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {

							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = jQuery.camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get(elem, key);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, key);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function () {

					// We always store the camelCased key
					dataUser.set(this, key, value);
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function removeData(key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		}
	});

	jQuery.extend({
		queue: function queue(elem, type, data) {
			var queue;

			if (elem) {
				type = (type || "fx") + "queue";
				queue = dataPriv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || jQuery.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

		dequeue: function dequeue(elem, type) {
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
			    startLength = queue.length,
			    fn = queue.shift(),
			    hooks = jQuery._queueHooks(elem, type),
			    next = function next() {
				jQuery.dequeue(elem, type);
			};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function _queueHooks(elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function () {
					dataPriv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function queue(type, data) {
			var setter = 2;

			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ? this : this.each(function () {
				var queue = jQuery.queue(this, type, data);

				// Ensure a hooks for this queue
				jQuery._queueHooks(this, type);

				if (type === "fx" && queue[0] !== "inprogress") {
					jQuery.dequeue(this, type);
				}
			});
		},
		dequeue: function dequeue(type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function clearQueue(type) {
			return this.queue(type || "fx", []);
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function promise(type, obj) {
			var tmp,
			    count = 1,
			    defer = jQuery.Deferred(),
			    elements = this,
			    i = this.length,
			    resolve = function resolve() {
				if (! --count) {
					defer.resolveWith(elements, [elements]);
				}
			};

			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--) {
				tmp = dataPriv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

	var cssExpand = ["Top", "Right", "Bottom", "Left"];

	var isHiddenWithinTree = function isHiddenWithinTree(elem, el) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" || elem.style.display === "" &&

		// Otherwise, check computed style
		// Support: Firefox <=43 - 45
		// Disconnected elements can have computed display: none, so first confirm that elem is
		// in the document.
		jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
	};

	var swap = function swap(elem, options, callback, args) {
		var ret,
		    name,
		    old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}

		return ret;
	};

	function adjustCSS(elem, prop, valueParts, tween) {
		var adjusted,
		    scale = 1,
		    maxIterations = 20,
		    currentValue = tween ? function () {
			return tween.cur();
		} : function () {
			return jQuery.css(elem, prop, "");
		},
		    initial = currentValue(),
		    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


		// Starting value computation is required for potential unit mismatches
		initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

		if (initialInUnit && initialInUnit[3] !== unit) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style(elem, prop, initialInUnit + unit);

				// Update scale, tolerating zero or NaN from tween.cur()
				// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
		}

		if (valueParts) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}

	var defaultDisplayMap = {};

	function getDefaultDisplay(elem) {
		var temp,
		    doc = elem.ownerDocument,
		    nodeName = elem.nodeName,
		    display = defaultDisplayMap[nodeName];

		if (display) {
			return display;
		}

		temp = doc.body.appendChild(doc.createElement(nodeName));
		display = jQuery.css(temp, "display");

		temp.parentNode.removeChild(temp);

		if (display === "none") {
			display = "block";
		}
		defaultDisplayMap[nodeName] = display;

		return display;
	}

	function showHide(elements, show) {
		var display,
		    elem,
		    values = [],
		    index = 0,
		    length = elements.length;

		// Determine new display value for elements that need to change
		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}

			display = elem.style.display;
			if (show) {

				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if (display === "none") {
					values[index] = dataPriv.get(elem, "display") || null;
					if (!values[index]) {
						elem.style.display = "";
					}
				}
				if (elem.style.display === "" && isHiddenWithinTree(elem)) {
					values[index] = getDefaultDisplay(elem);
				}
			} else {
				if (display !== "none") {
					values[index] = "none";

					// Remember what we're overwriting
					dataPriv.set(elem, "display", display);
				}
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for (index = 0; index < length; index++) {
			if (values[index] != null) {
				elements[index].style.display = values[index];
			}
		}

		return elements;
	}

	jQuery.fn.extend({
		show: function show() {
			return showHide(this, true);
		},
		hide: function hide() {
			return showHide(this);
		},
		toggle: function toggle(state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}

			return this.each(function () {
				if (isHiddenWithinTree(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		}
	});
	var rcheckableType = /^(?:checkbox|radio)$/i;

	var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;

	var rscriptType = /^$|\/(?:java|ecma)script/i;

	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE <=9 only
		option: [1, "<select multiple='multiple'>", "</select>"],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

		_default: [0, "", ""]
	};

	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll(context, tag) {

		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;

		if (typeof context.getElementsByTagName !== "undefined") {
			ret = context.getElementsByTagName(tag || "*");
		} else if (typeof context.querySelectorAll !== "undefined") {
			ret = context.querySelectorAll(tag || "*");
		} else {
			ret = [];
		}

		if (tag === undefined || tag && jQuery.nodeName(context, tag)) {
			return jQuery.merge([context], ret);
		}

		return ret;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		var i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
		}
	}

	var rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		var elem,
		    tmp,
		    tag,
		    wrap,
		    contains,
		    j,
		    fragment = context.createDocumentFragment(),
		    nodes = [],
		    i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			elem = elems[i];

			if (elem || elem === 0) {

				// Add nodes directly
				if (jQuery.type(elem) === "object") {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
					nodes.push(context.createTextNode(elem));

					// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild(context.createElement("div"));

					// Deserialize a standard representation
					tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;
					tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while (j--) {
						tmp = tmp.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, tmp.childNodes);

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while (elem = nodes[i++]) {

			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem);
				}
				continue;
			}

			contains = jQuery.contains(elem.ownerDocument, elem);

			// Append to fragment
			tmp = getAll(fragment.appendChild(elem), "script");

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(tmp);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while (elem = tmp[j++]) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}

		return fragment;
	}

	(function () {
		var fragment = document.createDocumentFragment(),
		    div = fragment.appendChild(document.createElement("div")),
		    input = document.createElement("input");

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();
	var documentElement = document.documentElement;

	var rkeyEvent = /^key/,
	    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}

	function _on(elem, types, selector, data, fn, one) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

			// ( types-Object, selector, data )
			if (typeof selector !== "string") {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				_on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}

		if (data == null && fn == null) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}

		if (one === 1) {
			origFn = fn;
			fn = function fn(event) {

				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
  * Helper functions for managing events -- not part of the public interface.
  * Props to Dean Edwards' addEvent library for many of the ideas.
  */
	jQuery.event = {

		global: {},

		add: function add(elem, types, handler, data, selector) {

			var handleObjIn,
			    eventHandle,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if (selector) {
				jQuery.find.matchesSelector(documentElement, selector);
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove: function remove(elem, types, handler, selector, mappedTypes) {

			var j,
			    origCount,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

			if (!elemData || !(events = elemData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);

						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},

		dispatch: function dispatch(nativeEvent) {

			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix(nativeEvent);

			var i,
			    j,
			    ret,
			    matched,
			    handleObj,
			    handlerQueue,
			    args = new Array(arguments.length),
			    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
			    special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;

			for (i = 1; i < arguments.length; i++) {
				args[i] = arguments[i];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function handlers(event, _handlers) {
			var i,
			    handleObj,
			    sel,
			    matchedHandlers,
			    matchedSelectors,
			    handlerQueue = [],
			    delegateCount = _handlers.delegateCount,
			    cur = event.target;

			// Find delegate handlers
			if (delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!(event.type === "click" && event.button >= 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
						matchedHandlers = [];
						matchedSelectors = {};
						for (i = 0; i < delegateCount; i++) {
							handleObj = _handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matchedSelectors[sel] === undefined) {
								matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
							}
							if (matchedSelectors[sel]) {
								matchedHandlers.push(handleObj);
							}
						}
						if (matchedHandlers.length) {
							handlerQueue.push({ elem: cur, handlers: matchedHandlers });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if (delegateCount < _handlers.length) {
				handlerQueue.push({ elem: cur, handlers: _handlers.slice(delegateCount) });
			}

			return handlerQueue;
		},

		addProp: function addProp(name, hook) {
			Object.defineProperty(jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: jQuery.isFunction(hook) ? function () {
					if (this.originalEvent) {
						return hook(this.originalEvent);
					}
				} : function () {
					if (this.originalEvent) {
						return this.originalEvent[name];
					}
				},

				set: function set(value) {
					Object.defineProperty(this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					});
				}
			});
		},

		fix: function fix(originalEvent) {
			return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function trigger() {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function trigger() {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function trigger() {
					if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function _default(event) {
					return jQuery.nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function postDispatch(event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function (elem, type, handle) {

		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

			// Support: Android <=2.3 only
			src.returnValue === false ? returnTrue : returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

			// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function preventDefault() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e && !this.isSimulated) {
				e.preventDefault();
			}
		},
		stopPropagation: function stopPropagation() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function stopImmediatePropagation() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each({
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which: function which(event) {
			var button = event.button;

			// Add which for key events
			if (event.which == null && rkeyEvent.test(event.type)) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
				if (button & 1) {
					return 1;
				}

				if (button & 2) {
					return 3;
				}

				if (button & 4) {
					return 2;
				}

				return 0;
			}

			return event.which;
		}
	}, jQuery.event.addProp);

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function handle(event) {
				var ret,
				    target = this,
				    related = event.relatedTarget,
				    handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || related !== target && !jQuery.contains(target, related)) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	jQuery.fn.extend({

		on: function on(types, selector, data, fn) {
			return _on(this, types, selector, data, fn);
		},
		one: function one(types, selector, data, fn) {
			return _on(this, types, selector, data, fn, 1);
		},
		off: function off(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this;
			}
			if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});

	var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,


	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,


	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    rscriptTypeMasked = /^true\/(.*)/,
	    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	function manipulationTarget(elem, content) {
		if (jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

			return elem.getElementsByTagName("tbody")[0] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);

		if (match) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip(collection, args, callback, ignored) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var fragment,
		    first,
		    scripts,
		    hasScripts,
		    node,
		    doc,
		    i = 0,
		    l = collection.length,
		    iNoClone = l - 1,
		    value = args[0],
		    isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
			return collection.each(function (index) {
				var self = collection.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

							if (node.src) {

								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								DOMEval(node.textContent.replace(rcleanScript, ""), doc);
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function _remove(elem, selector, keepData) {
		var node,
		    nodes = selector ? jQuery.filter(selector, elem) : elem,
		    i = 0;

		for (; (node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}

		return elem;
	}

	jQuery.extend({
		htmlPrefilter: function htmlPrefilter(html) {
			return html.replace(rxhtmlTag, "<$1></$2>");
		},

		clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
			var i,
			    l,
			    srcElements,
			    destElements,
			    clone = elem.cloneNode(true),
			    inPage = jQuery.contains(elem.ownerDocument, elem);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function cleanData(elems) {
			var data,
			    elem,
			    type,
			    special = jQuery.event.special,
			    i = 0;

			for (; (elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if (data = elem[dataPriv.expando]) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});

	jQuery.fn.extend({
		detach: function detach(selector) {
			return _remove(this, selector, true);
		},

		remove: function remove(selector) {
			return _remove(this, selector);
		},

		text: function text(value) {
			return access(this, function (value) {
				return value === undefined ? jQuery.text(this) : this.empty().each(function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value;
					}
				});
			}, null, value, arguments.length);
		},

		append: function append() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function prepend() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function before() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function after() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		empty: function empty() {
			var elem,
			    i = 0;

			for (; (elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {

					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function clone(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function html(value) {
			return access(this, function (value) {
				var elem = this[0] || {},
				    i = 0,
				    l = this.length;

				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) {}
				}

				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function replaceWith() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (elem) {
				var parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}

				// Force callback invocation
			}, ignored);
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (name, original) {
		jQuery.fn[name] = function (selector) {
			var elems,
			    ret = [],
			    insert = jQuery(selector),
			    last = insert.length - 1,
			    i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});
	var rmargin = /^margin/;

	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	var getStyles = function getStyles(elem) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(elem);
	};

	(function () {

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {

			// This is a singleton, we need to execute it only once
			if (!div) {
				return;
			}

			div.style.cssText = "box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild(container);

			var divStyle = window.getComputedStyle(div);
			pixelPositionVal = divStyle.top !== "1%";

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild(container);

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		var pixelPositionVal,
		    boxSizingReliableVal,
		    pixelMarginRightVal,
		    reliableMarginLeftVal,
		    container = document.createElement("div"),
		    div = document.createElement("div");

		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
		container.appendChild(div);

		jQuery.extend(support, {
			pixelPosition: function pixelPosition() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function boxSizingReliable() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function pixelMarginRight() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function reliableMarginLeft() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		});
	})();

	function curCSS(elem, name, computed) {
		var width,
		    minWidth,
		    maxWidth,
		    ret,
		    style = elem.style;

		computed = computed || getStyles(elem);

		// Support: IE <=9 only
		// getPropertyValue is only needed for .css('filter') (#12537)
		if (computed) {
			ret = computed.getPropertyValue(name) || computed[name];

			if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
				ret = jQuery.style(elem, name);
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" : ret;
	}

	function addGetHookIf(conditionFn, hookFn) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function get() {
				if (conditionFn()) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}

	var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	    cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	    cssPrefixes = ["Webkit", "Moz", "ms"],
	    emptyStyle = document.createElement("div").style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {

		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
		    i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	function setPositiveNumber(elem, value, subtract) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i,
		    val = 0;

		// If we already have the right measurement, avoid augmentation
		if (extra === (isBorderBox ? "border" : "content")) {
			i = 4;

			// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === "width" ? 1 : 0;
		}

		for (; i < 4; i += 2) {

			// Both box models exclude margin, so add it if we want it
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox) {

				// border-box includes padding, so remove it if we want content
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// At this point, extra isn't border nor margin, so remove border
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// At this point, extra isn't content nor padding, so add border
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		return val;
	}

	function getWidthOrHeight(elem, name, extra) {

		// Start with offset property, which is equivalent to the border-box value
		var val,
		    valueIsBorderBox = true,
		    styles = getStyles(elem),
		    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

		// Support: IE <=11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if (elem.getClientRects().length) {
			val = elem.getBoundingClientRect()[name];
		}

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if (val <= 0 || val == null) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS(elem, name, styles);
			if (val < 0 || val == null) {
				val = elem.style[name];
			}

			// Computed unit is not pixels. Stop here and return.
			if (rnumnonpx.test(val)) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

			// Normalize "", auto, and prepare for extra
			val = parseFloat(val) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function get(elem, computed) {
					if (computed) {

						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function style(elem, name, value, extra) {

			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			// Make sure that we're working with the right name
			var ret,
			    type,
			    hooks,
			    origName = jQuery.camelCase(name),
			    style = elem.style;

			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value === "undefined" ? "undefined" : _typeof(value);

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === "number") {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}

				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

					style[name] = value;
				}
			} else {

				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function css(elem, name, extra, styles) {
			var val,
			    num,
			    hooks,
			    origName = jQuery.camelCase(name);

			// Make sure that we're working with the right name
			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each(["height", "width"], function (i, name) {
		jQuery.cssHooks[name] = {
			get: function get(elem, computed, extra) {
				if (computed) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) && (

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
						return getWidthOrHeight(elem, name, extra);
					}) : getWidthOrHeight(elem, name, extra);
				}
			},

			set: function set(elem, value, extra) {
				var matches,
				    styles = extra && getStyles(elem),
				    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

					elem.style[name] = value;
					value = jQuery.css(elem, name);
				}

				return setPositiveNumber(elem, value, subtract);
			}
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
		if (computed) {
			return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
				return elem.getBoundingClientRect().left;
			})) + "px";
		}
	});

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function expand(value) {
				var i = 0,
				    expanded = {},


				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function css(name, value) {
			return access(this, function (elem, name, value) {
				var styles,
				    len,
				    map = {},
				    i = 0;

				if (jQuery.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		}
	});

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function init(elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function cur() {
			var hooks = Tween.propHooks[this.prop];

			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
		},
		run: function run(percent) {
			var eased,
			    hooks = Tween.propHooks[this.prop];

			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;

			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}

			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function get(tween) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, "");

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function set(tween) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function set(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function linear(p) {
			return p;
		},
		swing: function swing(p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};

	var fxNow,
	    timerId,
	    rfxtypes = /^(?:toggle|show|hide)$/,
	    rrun = /queueHooks$/;

	function raf() {
		if (timerId) {
			window.requestAnimationFrame(raf);
			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function () {
			fxNow = undefined;
		});
		return fxNow = jQuery.now();
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
		    i = 0,
		    attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
		    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
		    index = 0,
		    length = collection.length;
		for (; index < length; index++) {
			if (tween = collection[index].call(animation, prop, value)) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		var prop,
		    value,
		    toggle,
		    hooks,
		    oldfire,
		    propTween,
		    restoreDisplay,
		    display,
		    isBox = "width" in props || "height" in props,
		    anim = this,
		    orig = {},
		    style = elem.style,
		    hidden = elem.nodeType && isHiddenWithinTree(elem),
		    dataShow = dataPriv.get(elem, "fxshow");

		// Queue-skipping animations hijack the fx hooks
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function () {

				// Ensure the complete handler is called before this completes
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Detect show/hide animations
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.test(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;

						// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject(props);
		if (!propTween && jQuery.isEmptyObject(orig)) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if (isBox && elem.nodeType === 1) {

			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if (restoreDisplay == null) {
				restoreDisplay = dataPriv.get(elem, "display");
			}
			display = jQuery.css(elem, "display");
			if (display === "none") {
				if (restoreDisplay) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide([elem], true);
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css(elem, "display");
					showHide([elem]);
				}
			}

			// Animate inline elements as inline-block
			if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
				if (jQuery.css(elem, "float") === "none") {

					// Restore the original display value at the end of pure show/hide animations
					if (!propTween) {
						anim.done(function () {
							style.display = restoreDisplay;
						});
						if (restoreDisplay == null) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}

		// Implement show/hide animations
		propTween = false;
		for (prop in orig) {

			// General show/hide setup for this element animation
			if (!propTween) {
				if (dataShow) {
					if ("hidden" in dataShow) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if (toggle) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if (hidden) {
					showHide([elem], true);
				}

				/* eslint-disable no-loop-func */

				anim.done(function () {

					/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if (!hidden) {
						showHide([elem]);
					}
					dataPriv.remove(elem, "fxshow");
					for (prop in orig) {
						jQuery.style(elem, prop, orig[prop]);
					}
				});
			}

			// Per-property setup
			propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
			if (!(prop in dataShow)) {
				dataShow[prop] = propTween.start;
				if (hidden) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (jQuery.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
		    stopped,
		    index = 0,
		    length = Animation.prefilters.length,
		    deferred = jQuery.Deferred().always(function () {

			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		    tick = function tick() {
			if (stopped) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
			    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


			// Support: Android 2.3 only
			// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
			temp = remaining / animation.duration || 0,
			    percent = 1 - temp,
			    index = 0,
			    length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(elem, [animation, percent, remaining]);

			if (percent < 1 && length) {
				return remaining;
			} else {
				deferred.resolveWith(elem, [animation]);
				return false;
			}
		},
		    animation = deferred.promise({
			elem: elem,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function createTween(prop, end) {
				var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop: function stop(gotoEnd) {
				var index = 0,


				// If we are going to the end, we want to run all the tweens
				// otherwise we skip this part
				length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}
				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// Resolve when we played the last frame; otherwise, reject
				if (gotoEnd) {
					deferred.notifyWith(elem, [animation, 1, 0]);
					deferred.resolveWith(elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(elem, [animation, gotoEnd]);
				}
				return this;
			}
		}),
		    props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (jQuery.isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
				}
				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}

		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));

		// attach callbacks from options
		return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
	}

	jQuery.Animation = jQuery.extend(Animation, {

		tweeners: {
			"*": [function (prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},

		tweener: function tweener(props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnothtmlwhite);
			}

			var prop,
			    index = 0,
			    length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter: function prefilter(callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});

	jQuery.speed = function (speed, easing, fn) {
		var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		// Go to the end state if fx are off or if document is hidden
		if (jQuery.fx.off || document.hidden) {
			opt.duration = 0;
		} else {
			if (typeof opt.duration !== "number") {
				if (opt.duration in jQuery.fx.speeds) {
					opt.duration = jQuery.fx.speeds[opt.duration];
				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function fadeTo(speed, to, easing, callback) {

			// Show any hidden elements after setting opacity to 0
			return this.filter(isHiddenWithinTree).css("opacity", 0).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback);
		},
		animate: function animate(prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
			    optall = jQuery.speed(speed, easing, callback),
			    doAnimation = function doAnimation() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || dataPriv.get(this, "finish")) {
					anim.stop(true);
				}
			};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
		},
		stop: function stop(type, clearQueue, gotoEnd) {
			var stopQueue = function stopQueue(hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}

			return this.each(function () {
				var dequeue = true,
				    index = type != null && type + "queueHooks",
				    timers = jQuery.timers,
				    data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function finish(type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
				    data = dataPriv.get(this),
				    queue = data[type + "queue"],
				    hooks = data[type + "queueHooks"],
				    timers = jQuery.timers,
				    length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function (name, props) {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
		    i = 0,
		    timers = jQuery.timers;

		fxNow = jQuery.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Checks the timer has not already been removed
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		if (timer()) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (!timerId) {
			timerId = window.requestAnimationFrame ? window.requestAnimationFrame(raf) : window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
		}
	};

	jQuery.fx.stop = function () {
		if (window.cancelAnimationFrame) {
			window.cancelAnimationFrame(timerId);
		} else {
			window.clearInterval(timerId);
		}

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};

	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue(type, function (next, hooks) {
			var timeout = window.setTimeout(next, time);
			hooks.stop = function () {
				window.clearTimeout(timeout);
			};
		});
	};

	(function () {
		var input = document.createElement("input"),
		    select = document.createElement("select"),
		    opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();

	var boolHook,
	    attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function attr(name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr: function removeAttr(name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		}
	});

	jQuery.extend({
		attr: function attr(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}

				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				elem.setAttribute(name, value + "");
				return value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function set(elem, value) {
					if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function removeAttr(elem, value) {
			var name,
			    i = 0,


			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match(rnothtmlwhite);

			if (attrNames && elem.nodeType === 1) {
				while (name = attrNames[i++]) {
					elem.removeAttribute(name);
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function set(elem, value, name) {
			if (value === false) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};

	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (elem, name, isXML) {
			var ret,
			    handle,
			    lowercaseName = name.toLowerCase();

			if (!isXML) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[lowercaseName];
				attrHandle[lowercaseName] = ret;
				ret = getter(elem, name, isXML) != null ? lowercaseName : null;
				attrHandle[lowercaseName] = handle;
			}
			return ret;
		};
	});

	var rfocusable = /^(?:input|select|textarea|button)$/i,
	    rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function prop(name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp: function removeProp(name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});

	jQuery.extend({
		prop: function prop(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				return elem[name] = value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			return elem[name];
		},

		propHooks: {
			tabIndex: {
				get: function get(elem) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");

					if (tabindex) {
						return parseInt(tabindex, 10);
					}

					if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
						return 0;
					}

					return -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function get(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function set(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;

					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});

	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse(value) {
		var tokens = value.match(rnothtmlwhite) || [];
		return tokens.join(" ");
	}

	function getClass(elem) {
		return elem.getAttribute && elem.getAttribute("class") || "";
	}

	jQuery.fn.extend({
		addClass: function addClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnothtmlwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		removeClass: function removeClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}

			if (!arguments.length) {
				return this.attr("class", "");
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnothtmlwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {

							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") > -1) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		toggleClass: function toggleClass(value, stateVal) {
			var type = typeof value === "undefined" ? "undefined" : _typeof(value);

			if (typeof stateVal === "boolean" && type === "string") {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}

			if (jQuery.isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
				});
			}

			return this.each(function () {
				var className, i, self, classNames;

				if (type === "string") {

					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = value.match(rnothtmlwhite) || [];

					while (className = classNames[i++]) {

						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === "boolean") {
					className = getClass(this);
					if (className) {

						// Store className if set
						dataPriv.set(this, "__className__", className);
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if (this.setAttribute) {
						this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
					}
				}
			});
		},

		hasClass: function hasClass(selector) {
			var className,
			    elem,
			    i = 0;

			className = " " + selector + " ";
			while (elem = this[i++]) {
				if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
					return true;
				}
			}

			return false;
		}
	});

	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function val(value) {
			var hooks,
			    ret,
			    isFunction,
			    elem = this[0];

			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
						return ret;
					}

					ret = elem.value;

					// Handle most common string cases
					if (typeof ret === "string") {
						return ret.replace(rreturn, "");
					}

					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction(value);

			return this.each(function (i) {
				var val;

				if (this.nodeType !== 1) {
					return;
				}

				if (isFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (jQuery.isArray(val)) {
					val = jQuery.map(val, function (value) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function get(elem) {

					var val = jQuery.find.attr(elem, "value");
					return val != null ? val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse(jQuery.text(elem));
				}
			},
			select: {
				get: function get(elem) {
					var value,
					    option,
					    i,
					    options = elem.options,
					    index = elem.selectedIndex,
					    one = elem.type === "select-one",
					    values = one ? null : [],
					    max = one ? index + 1 : options.length;

					if (index < 0) {
						i = max;
					} else {
						i = one ? index : 0;
					}

					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) &&

						// Don't return options that are disabled or in a disabled optgroup
						!option.disabled && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one) {
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set: function set(elem, value) {
					var optionSet,
					    option,
					    options = elem.options,
					    values = jQuery.makeArray(value),
					    i = options.length;

					while (i--) {
						option = options[i];

						/* eslint-disable no-cond-assign */

						if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function () {
		jQuery.valHooks[this] = {
			set: function set(elem, value) {
				if (jQuery.isArray(value)) {
					return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});

	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend(jQuery.event, {

		trigger: function trigger(event, data, elem, onlyHandlers) {

			var i,
			    cur,
			    tmp,
			    bubbleType,
			    ontype,
			    handle,
			    special,
			    eventPath = [elem || document],
			    type = hasOwn.call(event, "type") ? event.type : event,
			    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.indexOf(".") > -1) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] : jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

				event.type = i > 1 ? bubbleType : special.bindType || type;

				// jQuery handler
				handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {

				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp) {
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;

						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function simulate(type, elem, event) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true
			});

			jQuery.event.trigger(e, null, elem);
		}

	});

	jQuery.fn.extend({

		trigger: function trigger(type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function triggerHandler(type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});

	jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {

		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});

	jQuery.fn.extend({
		hover: function hover(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});

	support.focusin = "onfocusin" in window;

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function handler(event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};

			jQuery.event.special[fix] = {
				setup: function setup() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix);

					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function teardown() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix) - 1;

					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);
					} else {
						dataPriv.access(doc, fix, attaches);
					}
				}
			};
		});
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = /\?/;

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

	var rbracket = /\[\]$/,
	    rCRLF = /\r?\n/g,
	    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	    rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;

		if (jQuery.isArray(obj)) {

			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {

					// Treat each array item as a scalar.
					add(prefix, v);
				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
				}
			});
		} else if (!traditional && jQuery.type(obj) === "object") {

			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {

			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		var prefix,
		    s = [],
		    add = function add(key, valueOrFunction) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;

			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
		};

		// If an array was passed in, assume that it is an array of form elements.
		if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&");
	};

	jQuery.fn.extend({
		serialize: function serialize() {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function serializeArray() {
			return this.map(function () {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			}).filter(function () {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
			}).map(function (i, elem) {
				var val = jQuery(this).val();

				if (val == null) {
					return null;
				}

				if (jQuery.isArray(val)) {
					return jQuery.map(val, function (val) {
						return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
					});
				}

				return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		}
	});

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

	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		});
	};

	jQuery.fn.extend({
		wrapAll: function wrapAll(html) {
			var wrap;

			if (this[0]) {
				if (jQuery.isFunction(html)) {
					html = html.call(this[0]);
				}

				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}

				wrap.map(function () {
					var elem = this;

					while (elem.firstElementChild) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append(this);
			}

			return this;
		},

		wrapInner: function wrapInner(html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}

			return this.each(function () {
				var self = jQuery(this),
				    contents = self.contents();

				if (contents.length) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},

		wrap: function wrap(html) {
			var isFunction = jQuery.isFunction(html);

			return this.each(function (i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},

		unwrap: function unwrap(selector) {
			this.parent(selector).not("body").each(function () {
				jQuery(this).replaceWith(this.childNodes);
			});
			return this;
		}
	});

	jQuery.expr.pseudos.hidden = function (elem) {
		return !jQuery.expr.pseudos.visible(elem);
	};
	jQuery.expr.pseudos.visible = function (elem) {
		return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
	};

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

	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter(function (s) {
		if (s.crossDomain) {
			s.contents.script = false;
		}
	});

	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function textScript(text) {
				jQuery.globalEval(text);
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter("script", function (s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport("script", function (s) {

		// This transport only deals with cross domain requests
		if (s.crossDomain) {
			var script, _callback2;
			return {
				send: function send(_, complete) {
					script = jQuery("<script>").prop({
						charset: s.scriptCharset,
						src: s.url
					}).on("load error", _callback2 = function callback(evt) {
						script.remove();
						_callback2 = null;
						if (evt) {
							complete(evt.type === "error" ? 404 : 200, evt.type);
						}
					});

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function abort() {
					if (_callback2) {
						_callback2();
					}
				}
			};
		}
	});

	var oldCallbacks = [],
	    rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function jsonpCallback() {
			var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			this[callback] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

		var callbackName,
		    overwritten,
		    responseContainer,
		    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === "jsonp") {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};

			// Force json dataType
			s.dataTypes[0] = "json";

			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function () {

				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);

					// Otherwise restore preexisting value
				} else {
					window[callbackName] = overwritten;
				}

				// Save back as free
				if (s[callbackName]) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}

				// Call if it was a function and we have a response
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});

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

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
		jQuery.fn[type] = function (fn) {
			return this.on(type, fn);
		};
	});

	jQuery.expr.pseudos.animated = function (elem) {
		return jQuery.grep(jQuery.timers, function (fn) {
			return elem === fn.elem;
		}).length;
	};

	/**
  * Gets a window from an element
  */
	function getWindow(elem) {
		return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function setOffset(elem, options, i) {
			var curPosition,
			    curLeft,
			    curCSSTop,
			    curTop,
			    curOffset,
			    curCSSLeft,
			    calculatePosition,
			    position = jQuery.css(elem, "position"),
			    curElem = jQuery(elem),
			    props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === "static") {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if (jQuery.isFunction(options)) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(elem, i, jQuery.extend({}, curOffset));
			}

			if (options.top != null) {
				props.top = options.top - curOffset.top + curTop;
			}
			if (options.left != null) {
				props.left = options.left - curOffset.left + curLeft;
			}

			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};

	jQuery.fn.extend({
		offset: function offset(options) {

			// Preserve chaining for setter
			if (arguments.length) {
				return options === undefined ? this : this.each(function (i) {
					jQuery.offset.setOffset(this, options, i);
				});
			}

			var docElem,
			    win,
			    rect,
			    doc,
			    elem = this[0];

			if (!elem) {
				return;
			}

			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if (!elem.getClientRects().length) {
				return { top: 0, left: 0 };
			}

			rect = elem.getBoundingClientRect();

			// Make sure element is not hidden (display: none)
			if (rect.width || rect.height) {
				doc = elem.ownerDocument;
				win = getWindow(doc);
				docElem = doc.documentElement;

				return {
					top: rect.top + win.pageYOffset - docElem.clientTop,
					left: rect.left + win.pageXOffset - docElem.clientLeft
				};
			}

			// Return zeros for disconnected and hidden elements (gh-2310)
			return rect;
		},

		position: function position() {
			if (!this[0]) {
				return;
			}

			var offsetParent,
			    offset,
			    elem = this[0],
			    parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if (jQuery.css(elem, "position") === "fixed") {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if (!jQuery.nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
					left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
				};
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function offsetParent() {
			return this.map(function () {
				var offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
		var top = "pageYOffset" === prop;

		jQuery.fn[method] = function (val) {
			return access(this, function (elem, method, val) {
				var win = getWindow(elem);

				if (val === undefined) {
					return win ? win[prop] : elem[method];
				}

				if (win) {
					win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length);
		};
	});

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(["top", "left"], function (i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
			}
		});
	});

	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
		jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function (margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
				    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

				return access(this, function (elem, type, value) {
					var doc;

					if (jQuery.isWindow(elem)) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
					}

					// Get document width or height
					if (elem.nodeType === 9) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
					}

					return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css(elem, type, extra) :

					// Set width or height on the element
					jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable);
			};
		});
	});

	jQuery.fn.extend({

		bind: function bind(types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function unbind(types, fn) {
			return this.off(types, null, fn);
		},

		delegate: function delegate(selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function undelegate(selector, types, fn) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
		}
	});

	jQuery.parseJSON = JSON.parse;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if (typeof define === "function" && define.amd) {
		define("jquery", [], function () {
			return jQuery;
		});
	}

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

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L2Rpc3QvanF1ZXJ5LmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsImZhY3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIiwiZG9jdW1lbnQiLCJ3IiwiRXJyb3IiLCJ3aW5kb3ciLCJub0dsb2JhbCIsImFyciIsImdldFByb3RvIiwiT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJzbGljZSIsImNvbmNhdCIsInB1c2giLCJpbmRleE9mIiwiY2xhc3MydHlwZSIsInRvU3RyaW5nIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJmblRvU3RyaW5nIiwiT2JqZWN0RnVuY3Rpb25TdHJpbmciLCJjYWxsIiwic3VwcG9ydCIsIkRPTUV2YWwiLCJjb2RlIiwiZG9jIiwic2NyaXB0IiwiY3JlYXRlRWxlbWVudCIsInRleHQiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJ2ZXJzaW9uIiwialF1ZXJ5Iiwic2VsZWN0b3IiLCJjb250ZXh0IiwiZm4iLCJpbml0IiwicnRyaW0iLCJybXNQcmVmaXgiLCJyZGFzaEFscGhhIiwiZmNhbWVsQ2FzZSIsImFsbCIsImxldHRlciIsInRvVXBwZXJDYXNlIiwicHJvdG90eXBlIiwianF1ZXJ5IiwiY29uc3RydWN0b3IiLCJsZW5ndGgiLCJ0b0FycmF5IiwiZ2V0IiwibnVtIiwicHVzaFN0YWNrIiwiZWxlbXMiLCJyZXQiLCJtZXJnZSIsInByZXZPYmplY3QiLCJlYWNoIiwiY2FsbGJhY2siLCJtYXAiLCJlbGVtIiwiaSIsImFwcGx5IiwiYXJndW1lbnRzIiwiZmlyc3QiLCJlcSIsImxhc3QiLCJsZW4iLCJqIiwiZW5kIiwic29ydCIsInNwbGljZSIsImV4dGVuZCIsIm9wdGlvbnMiLCJuYW1lIiwic3JjIiwiY29weSIsImNvcHlJc0FycmF5IiwiY2xvbmUiLCJ0YXJnZXQiLCJkZWVwIiwiaXNGdW5jdGlvbiIsImlzUGxhaW5PYmplY3QiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiZXhwYW5kbyIsIk1hdGgiLCJyYW5kb20iLCJyZXBsYWNlIiwiaXNSZWFkeSIsImVycm9yIiwibXNnIiwibm9vcCIsIm9iaiIsInR5cGUiLCJBcnJheSIsImlzV2luZG93IiwiaXNOdW1lcmljIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwicHJvdG8iLCJDdG9yIiwiaXNFbXB0eU9iamVjdCIsImdsb2JhbEV2YWwiLCJjYW1lbENhc2UiLCJzdHJpbmciLCJub2RlTmFtZSIsInRvTG93ZXJDYXNlIiwiaXNBcnJheUxpa2UiLCJ0cmltIiwibWFrZUFycmF5IiwicmVzdWx0cyIsImluQXJyYXkiLCJzZWNvbmQiLCJncmVwIiwiaW52ZXJ0IiwiY2FsbGJhY2tJbnZlcnNlIiwibWF0Y2hlcyIsImNhbGxiYWNrRXhwZWN0IiwiYXJnIiwidmFsdWUiLCJndWlkIiwicHJveHkiLCJ0bXAiLCJhcmdzIiwibm93IiwiRGF0ZSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwic3BsaXQiLCJTaXp6bGUiLCJFeHByIiwiZ2V0VGV4dCIsImlzWE1MIiwidG9rZW5pemUiLCJjb21waWxlIiwic2VsZWN0Iiwib3V0ZXJtb3N0Q29udGV4dCIsInNvcnRJbnB1dCIsImhhc0R1cGxpY2F0ZSIsInNldERvY3VtZW50IiwiZG9jRWxlbSIsImRvY3VtZW50SXNIVE1MIiwicmJ1Z2d5UVNBIiwicmJ1Z2d5TWF0Y2hlcyIsImNvbnRhaW5zIiwicHJlZmVycmVkRG9jIiwiZGlycnVucyIsImRvbmUiLCJjbGFzc0NhY2hlIiwiY3JlYXRlQ2FjaGUiLCJ0b2tlbkNhY2hlIiwiY29tcGlsZXJDYWNoZSIsInNvcnRPcmRlciIsImEiLCJiIiwicG9wIiwicHVzaF9uYXRpdmUiLCJsaXN0IiwiYm9vbGVhbnMiLCJ3aGl0ZXNwYWNlIiwiaWRlbnRpZmllciIsImF0dHJpYnV0ZXMiLCJwc2V1ZG9zIiwicndoaXRlc3BhY2UiLCJSZWdFeHAiLCJyY29tbWEiLCJyY29tYmluYXRvcnMiLCJyYXR0cmlidXRlUXVvdGVzIiwicnBzZXVkbyIsInJpZGVudGlmaWVyIiwibWF0Y2hFeHByIiwicmlucHV0cyIsInJoZWFkZXIiLCJybmF0aXZlIiwicnF1aWNrRXhwciIsInJzaWJsaW5nIiwicnVuZXNjYXBlIiwiZnVuZXNjYXBlIiwiXyIsImVzY2FwZWQiLCJlc2NhcGVkV2hpdGVzcGFjZSIsImhpZ2giLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJyY3NzZXNjYXBlIiwiZmNzc2VzY2FwZSIsImNoIiwiYXNDb2RlUG9pbnQiLCJjaGFyQ29kZUF0IiwidW5sb2FkSGFuZGxlciIsImRpc2FibGVkQW5jZXN0b3IiLCJhZGRDb21iaW5hdG9yIiwiZGlzYWJsZWQiLCJkaXIiLCJuZXh0IiwiY2hpbGROb2RlcyIsIm5vZGVUeXBlIiwiZSIsImVscyIsInNlZWQiLCJtIiwibmlkIiwibWF0Y2giLCJncm91cHMiLCJuZXdTZWxlY3RvciIsIm5ld0NvbnRleHQiLCJvd25lckRvY3VtZW50IiwiZXhlYyIsImdldEVsZW1lbnRCeUlkIiwiaWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJxc2EiLCJ0ZXN0IiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwidG9TZWxlY3RvciIsImpvaW4iLCJ0ZXN0Q29udGV4dCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJxc2FFcnJvciIsInJlbW92ZUF0dHJpYnV0ZSIsImtleXMiLCJjYWNoZSIsImtleSIsImNhY2hlTGVuZ3RoIiwic2hpZnQiLCJtYXJrRnVuY3Rpb24iLCJhc3NlcnQiLCJlbCIsImFkZEhhbmRsZSIsImF0dHJzIiwiaGFuZGxlciIsImF0dHJIYW5kbGUiLCJzaWJsaW5nQ2hlY2siLCJjdXIiLCJkaWZmIiwic291cmNlSW5kZXgiLCJuZXh0U2libGluZyIsImNyZWF0ZUlucHV0UHNldWRvIiwiY3JlYXRlQnV0dG9uUHNldWRvIiwiY3JlYXRlRGlzYWJsZWRQc2V1ZG8iLCJpc0Rpc2FibGVkIiwiY3JlYXRlUG9zaXRpb25hbFBzZXVkbyIsImFyZ3VtZW50IiwibWF0Y2hJbmRleGVzIiwiZG9jdW1lbnRFbGVtZW50Iiwibm9kZSIsImhhc0NvbXBhcmUiLCJzdWJXaW5kb3ciLCJkZWZhdWx0VmlldyIsInRvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImNsYXNzTmFtZSIsImNyZWF0ZUNvbW1lbnQiLCJnZXRCeUlkIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJmaWx0ZXIiLCJhdHRySWQiLCJmaW5kIiwiZ2V0QXR0cmlidXRlTm9kZSIsInRhZyIsImlubmVySFRNTCIsImlucHV0IiwibWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwib01hdGNoZXNTZWxlY3RvciIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwiZGlzY29ubmVjdGVkTWF0Y2giLCJjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiIsImFkb3duIiwiYnVwIiwiY29tcGFyZSIsInNvcnREZXRhY2hlZCIsImF1cCIsImFwIiwiYnAiLCJ1bnNoaWZ0IiwiZXhwciIsImVsZW1lbnRzIiwiYXR0ciIsInZhbCIsInNwZWNpZmllZCIsImVzY2FwZSIsInNlbCIsInVuaXF1ZVNvcnQiLCJkdXBsaWNhdGVzIiwiZGV0ZWN0RHVwbGljYXRlcyIsInNvcnRTdGFibGUiLCJ0ZXh0Q29udGVudCIsImZpcnN0Q2hpbGQiLCJub2RlVmFsdWUiLCJzZWxlY3RvcnMiLCJjcmVhdGVQc2V1ZG8iLCJyZWxhdGl2ZSIsInByZUZpbHRlciIsImV4Y2VzcyIsInVucXVvdGVkIiwibm9kZU5hbWVTZWxlY3RvciIsInBhdHRlcm4iLCJvcGVyYXRvciIsImNoZWNrIiwicmVzdWx0Iiwid2hhdCIsInNpbXBsZSIsImZvcndhcmQiLCJvZlR5cGUiLCJ4bWwiLCJ1bmlxdWVDYWNoZSIsIm91dGVyQ2FjaGUiLCJub2RlSW5kZXgiLCJzdGFydCIsInBhcmVudCIsInVzZUNhY2hlIiwibGFzdENoaWxkIiwidW5pcXVlSUQiLCJwc2V1ZG8iLCJzZXRGaWx0ZXJzIiwiaWR4IiwibWF0Y2hlZCIsIm1hdGNoZXIiLCJ1bm1hdGNoZWQiLCJpbm5lclRleHQiLCJsYW5nIiwiZWxlbUxhbmciLCJoYXNoIiwibG9jYXRpb24iLCJhY3RpdmVFbGVtZW50IiwiaGFzRm9jdXMiLCJocmVmIiwidGFiSW5kZXgiLCJjaGVja2VkIiwic2VsZWN0ZWQiLCJzZWxlY3RlZEluZGV4IiwicmFkaW8iLCJjaGVja2JveCIsImZpbGUiLCJwYXNzd29yZCIsImltYWdlIiwic3VibWl0IiwicmVzZXQiLCJmaWx0ZXJzIiwicGFyc2VPbmx5IiwidG9rZW5zIiwic29GYXIiLCJwcmVGaWx0ZXJzIiwiY2FjaGVkIiwiY29tYmluYXRvciIsImJhc2UiLCJza2lwIiwiY2hlY2tOb25FbGVtZW50cyIsImRvbmVOYW1lIiwib2xkQ2FjaGUiLCJuZXdDYWNoZSIsImVsZW1lbnRNYXRjaGVyIiwibWF0Y2hlcnMiLCJtdWx0aXBsZUNvbnRleHRzIiwiY29udGV4dHMiLCJjb25kZW5zZSIsIm5ld1VubWF0Y2hlZCIsIm1hcHBlZCIsInNldE1hdGNoZXIiLCJwb3N0RmlsdGVyIiwicG9zdEZpbmRlciIsInBvc3RTZWxlY3RvciIsInRlbXAiLCJwcmVNYXAiLCJwb3N0TWFwIiwicHJlZXhpc3RpbmciLCJtYXRjaGVySW4iLCJtYXRjaGVyT3V0IiwibWF0Y2hlckZyb21Ub2tlbnMiLCJjaGVja0NvbnRleHQiLCJsZWFkaW5nUmVsYXRpdmUiLCJpbXBsaWNpdFJlbGF0aXZlIiwibWF0Y2hDb250ZXh0IiwibWF0Y2hBbnlDb250ZXh0IiwibWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzIiwiZWxlbWVudE1hdGNoZXJzIiwic2V0TWF0Y2hlcnMiLCJieVNldCIsImJ5RWxlbWVudCIsInN1cGVyTWF0Y2hlciIsIm91dGVybW9zdCIsIm1hdGNoZWRDb3VudCIsInNldE1hdGNoZWQiLCJjb250ZXh0QmFja3VwIiwiZGlycnVuc1VuaXF1ZSIsInRva2VuIiwiY29tcGlsZWQiLCJkZWZhdWx0VmFsdWUiLCJ1bmlxdWUiLCJpc1hNTERvYyIsImVzY2FwZVNlbGVjdG9yIiwidW50aWwiLCJ0cnVuY2F0ZSIsImlzIiwic2libGluZ3MiLCJuIiwicm5lZWRzQ29udGV4dCIsIm5lZWRzQ29udGV4dCIsInJzaW5nbGVUYWciLCJyaXNTaW1wbGUiLCJ3aW5ub3ciLCJxdWFsaWZpZXIiLCJub3QiLCJzZWxmIiwicm9vdGpRdWVyeSIsInJvb3QiLCJwYXJzZUhUTUwiLCJyZWFkeSIsInJwYXJlbnRzcHJldiIsImd1YXJhbnRlZWRVbmlxdWUiLCJjaGlsZHJlbiIsImNvbnRlbnRzIiwicHJldiIsImhhcyIsInRhcmdldHMiLCJsIiwiY2xvc2VzdCIsImluZGV4IiwicHJldkFsbCIsImFkZCIsImFkZEJhY2siLCJzaWJsaW5nIiwicGFyZW50cyIsInBhcmVudHNVbnRpbCIsIm5leHRBbGwiLCJuZXh0VW50aWwiLCJwcmV2VW50aWwiLCJjb250ZW50RG9jdW1lbnQiLCJyZXZlcnNlIiwicm5vdGh0bWx3aGl0ZSIsImNyZWF0ZU9wdGlvbnMiLCJvYmplY3QiLCJmbGFnIiwiQ2FsbGJhY2tzIiwiZmlyaW5nIiwibWVtb3J5IiwiZmlyZWQiLCJsb2NrZWQiLCJxdWV1ZSIsImZpcmluZ0luZGV4IiwiZmlyZSIsIm9uY2UiLCJzdG9wT25GYWxzZSIsInJlbW92ZSIsImVtcHR5IiwiZGlzYWJsZSIsImxvY2siLCJmaXJlV2l0aCIsIklkZW50aXR5IiwidiIsIlRocm93ZXIiLCJleCIsImFkb3B0VmFsdWUiLCJyZXNvbHZlIiwicmVqZWN0IiwibWV0aG9kIiwicHJvbWlzZSIsImZhaWwiLCJ0aGVuIiwiRGVmZXJyZWQiLCJmdW5jIiwidHVwbGVzIiwic3RhdGUiLCJhbHdheXMiLCJkZWZlcnJlZCIsInBpcGUiLCJmbnMiLCJuZXdEZWZlciIsInR1cGxlIiwicmV0dXJuZWQiLCJwcm9ncmVzcyIsIm5vdGlmeSIsIm9uRnVsZmlsbGVkIiwib25SZWplY3RlZCIsIm9uUHJvZ3Jlc3MiLCJtYXhEZXB0aCIsImRlcHRoIiwic3BlY2lhbCIsInRoYXQiLCJtaWdodFRocm93IiwiVHlwZUVycm9yIiwibm90aWZ5V2l0aCIsInJlc29sdmVXaXRoIiwicHJvY2VzcyIsImV4Y2VwdGlvbkhvb2siLCJzdGFja1RyYWNlIiwicmVqZWN0V2l0aCIsImdldFN0YWNrSG9vayIsInNldFRpbWVvdXQiLCJzdGF0ZVN0cmluZyIsIndoZW4iLCJzaW5nbGVWYWx1ZSIsInJlbWFpbmluZyIsInJlc29sdmVDb250ZXh0cyIsInJlc29sdmVWYWx1ZXMiLCJtYXN0ZXIiLCJ1cGRhdGVGdW5jIiwicmVycm9yTmFtZXMiLCJzdGFjayIsImNvbnNvbGUiLCJ3YXJuIiwibWVzc2FnZSIsInJlYWR5RXhjZXB0aW9uIiwicmVhZHlMaXN0IiwiY2F0Y2giLCJyZWFkeVdhaXQiLCJob2xkUmVhZHkiLCJob2xkIiwid2FpdCIsImNvbXBsZXRlZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZWFkeVN0YXRlIiwiZG9TY3JvbGwiLCJhY2Nlc3MiLCJjaGFpbmFibGUiLCJlbXB0eUdldCIsInJhdyIsImJ1bGsiLCJhY2NlcHREYXRhIiwib3duZXIiLCJEYXRhIiwidWlkIiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJzZXQiLCJkYXRhIiwicHJvcCIsImhhc0RhdGEiLCJkYXRhUHJpdiIsImRhdGFVc2VyIiwicmJyYWNlIiwicm11bHRpRGFzaCIsImdldERhdGEiLCJKU09OIiwicGFyc2UiLCJkYXRhQXR0ciIsInJlbW92ZURhdGEiLCJfZGF0YSIsIl9yZW1vdmVEYXRhIiwiZGVxdWV1ZSIsInN0YXJ0TGVuZ3RoIiwiaG9va3MiLCJfcXVldWVIb29rcyIsInN0b3AiLCJzZXR0ZXIiLCJjbGVhclF1ZXVlIiwiY291bnQiLCJkZWZlciIsInBudW0iLCJzb3VyY2UiLCJyY3NzTnVtIiwiY3NzRXhwYW5kIiwiaXNIaWRkZW5XaXRoaW5UcmVlIiwic3R5bGUiLCJkaXNwbGF5IiwiY3NzIiwic3dhcCIsIm9sZCIsImFkanVzdENTUyIsInZhbHVlUGFydHMiLCJ0d2VlbiIsImFkanVzdGVkIiwic2NhbGUiLCJtYXhJdGVyYXRpb25zIiwiY3VycmVudFZhbHVlIiwiaW5pdGlhbCIsInVuaXQiLCJjc3NOdW1iZXIiLCJpbml0aWFsSW5Vbml0IiwiZGVmYXVsdERpc3BsYXlNYXAiLCJnZXREZWZhdWx0RGlzcGxheSIsImJvZHkiLCJzaG93SGlkZSIsInNob3ciLCJ2YWx1ZXMiLCJoaWRlIiwidG9nZ2xlIiwicmNoZWNrYWJsZVR5cGUiLCJydGFnTmFtZSIsInJzY3JpcHRUeXBlIiwid3JhcE1hcCIsIm9wdGlvbiIsInRoZWFkIiwiY29sIiwidHIiLCJ0ZCIsIl9kZWZhdWx0Iiwib3B0Z3JvdXAiLCJ0Ym9keSIsInRmb290IiwiY29sZ3JvdXAiLCJjYXB0aW9uIiwidGgiLCJnZXRBbGwiLCJzZXRHbG9iYWxFdmFsIiwicmVmRWxlbWVudHMiLCJyaHRtbCIsImJ1aWxkRnJhZ21lbnQiLCJzY3JpcHRzIiwic2VsZWN0aW9uIiwiaWdub3JlZCIsIndyYXAiLCJmcmFnbWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJub2RlcyIsImNyZWF0ZVRleHROb2RlIiwiaHRtbFByZWZpbHRlciIsImRpdiIsImNoZWNrQ2xvbmUiLCJjbG9uZU5vZGUiLCJub0Nsb25lQ2hlY2tlZCIsInJrZXlFdmVudCIsInJtb3VzZUV2ZW50IiwicnR5cGVuYW1lc3BhY2UiLCJyZXR1cm5UcnVlIiwicmV0dXJuRmFsc2UiLCJzYWZlQWN0aXZlRWxlbWVudCIsImVyciIsIm9uIiwidHlwZXMiLCJvbmUiLCJvcmlnRm4iLCJldmVudCIsIm9mZiIsImhhbmRsZU9iakluIiwiZXZlbnRIYW5kbGUiLCJldmVudHMiLCJ0IiwiaGFuZGxlT2JqIiwiaGFuZGxlcnMiLCJuYW1lc3BhY2VzIiwib3JpZ1R5cGUiLCJlbGVtRGF0YSIsImhhbmRsZSIsInRyaWdnZXJlZCIsImRpc3BhdGNoIiwiZGVsZWdhdGVUeXBlIiwiYmluZFR5cGUiLCJuYW1lc3BhY2UiLCJkZWxlZ2F0ZUNvdW50Iiwic2V0dXAiLCJtYXBwZWRUeXBlcyIsIm9yaWdDb3VudCIsInRlYXJkb3duIiwicmVtb3ZlRXZlbnQiLCJuYXRpdmVFdmVudCIsImZpeCIsImhhbmRsZXJRdWV1ZSIsImRlbGVnYXRlVGFyZ2V0IiwicHJlRGlzcGF0Y2giLCJpc1Byb3BhZ2F0aW9uU3RvcHBlZCIsImN1cnJlbnRUYXJnZXQiLCJpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCIsInJuYW1lc3BhY2UiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInBvc3REaXNwYXRjaCIsIm1hdGNoZWRIYW5kbGVycyIsIm1hdGNoZWRTZWxlY3RvcnMiLCJidXR0b24iLCJhZGRQcm9wIiwiaG9vayIsIkV2ZW50IiwiZW51bWVyYWJsZSIsIm9yaWdpbmFsRXZlbnQiLCJ3cml0YWJsZSIsImxvYWQiLCJub0J1YmJsZSIsImZvY3VzIiwidHJpZ2dlciIsImJsdXIiLCJjbGljayIsImJlZm9yZXVubG9hZCIsInJldHVyblZhbHVlIiwicHJvcHMiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJkZWZhdWx0UHJldmVudGVkIiwicmVsYXRlZFRhcmdldCIsInRpbWVTdGFtcCIsImlzU2ltdWxhdGVkIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiYWx0S2V5IiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJjaGFuZ2VkVG91Y2hlcyIsImN0cmxLZXkiLCJkZXRhaWwiLCJldmVudFBoYXNlIiwibWV0YUtleSIsInBhZ2VYIiwicGFnZVkiLCJzaGlmdEtleSIsInZpZXciLCJjaGFyQ29kZSIsImtleUNvZGUiLCJidXR0b25zIiwiY2xpZW50WCIsImNsaWVudFkiLCJvZmZzZXRYIiwib2Zmc2V0WSIsInBvaW50ZXJJZCIsInBvaW50ZXJUeXBlIiwic2NyZWVuWCIsInNjcmVlblkiLCJ0YXJnZXRUb3VjaGVzIiwidG9FbGVtZW50IiwidG91Y2hlcyIsIndoaWNoIiwibW91c2VlbnRlciIsIm1vdXNlbGVhdmUiLCJwb2ludGVyZW50ZXIiLCJwb2ludGVybGVhdmUiLCJvcmlnIiwicmVsYXRlZCIsInJ4aHRtbFRhZyIsInJub0lubmVyaHRtbCIsInJjaGVja2VkIiwicnNjcmlwdFR5cGVNYXNrZWQiLCJyY2xlYW5TY3JpcHQiLCJtYW5pcHVsYXRpb25UYXJnZXQiLCJjb250ZW50IiwiZGlzYWJsZVNjcmlwdCIsInJlc3RvcmVTY3JpcHQiLCJjbG9uZUNvcHlFdmVudCIsImRlc3QiLCJwZGF0YU9sZCIsInBkYXRhQ3VyIiwidWRhdGFPbGQiLCJ1ZGF0YUN1ciIsImZpeElucHV0IiwiZG9tTWFuaXAiLCJjb2xsZWN0aW9uIiwiaGFzU2NyaXB0cyIsImlOb0Nsb25lIiwiaHRtbCIsIl9ldmFsVXJsIiwia2VlcERhdGEiLCJjbGVhbkRhdGEiLCJkYXRhQW5kRXZlbnRzIiwiZGVlcERhdGFBbmRFdmVudHMiLCJzcmNFbGVtZW50cyIsImRlc3RFbGVtZW50cyIsImluUGFnZSIsImRldGFjaCIsImFwcGVuZCIsInByZXBlbmQiLCJpbnNlcnRCZWZvcmUiLCJiZWZvcmUiLCJhZnRlciIsInJlcGxhY2VXaXRoIiwicmVwbGFjZUNoaWxkIiwiYXBwZW5kVG8iLCJwcmVwZW5kVG8iLCJpbnNlcnRBZnRlciIsInJlcGxhY2VBbGwiLCJvcmlnaW5hbCIsImluc2VydCIsInJtYXJnaW4iLCJybnVtbm9ucHgiLCJnZXRTdHlsZXMiLCJvcGVuZXIiLCJnZXRDb21wdXRlZFN0eWxlIiwiY29tcHV0ZVN0eWxlVGVzdHMiLCJjc3NUZXh0IiwiY29udGFpbmVyIiwiZGl2U3R5bGUiLCJwaXhlbFBvc2l0aW9uVmFsIiwicmVsaWFibGVNYXJnaW5MZWZ0VmFsIiwibWFyZ2luTGVmdCIsImJveFNpemluZ1JlbGlhYmxlVmFsIiwid2lkdGgiLCJtYXJnaW5SaWdodCIsInBpeGVsTWFyZ2luUmlnaHRWYWwiLCJiYWNrZ3JvdW5kQ2xpcCIsImNsZWFyQ2xvbmVTdHlsZSIsInBpeGVsUG9zaXRpb24iLCJib3hTaXppbmdSZWxpYWJsZSIsInBpeGVsTWFyZ2luUmlnaHQiLCJyZWxpYWJsZU1hcmdpbkxlZnQiLCJjdXJDU1MiLCJjb21wdXRlZCIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiYWRkR2V0SG9va0lmIiwiY29uZGl0aW9uRm4iLCJob29rRm4iLCJyZGlzcGxheXN3YXAiLCJjc3NTaG93IiwicG9zaXRpb24iLCJ2aXNpYmlsaXR5IiwiY3NzTm9ybWFsVHJhbnNmb3JtIiwibGV0dGVyU3BhY2luZyIsImZvbnRXZWlnaHQiLCJjc3NQcmVmaXhlcyIsImVtcHR5U3R5bGUiLCJ2ZW5kb3JQcm9wTmFtZSIsImNhcE5hbWUiLCJzZXRQb3NpdGl2ZU51bWJlciIsInN1YnRyYWN0IiwibWF4IiwiYXVnbWVudFdpZHRoT3JIZWlnaHQiLCJleHRyYSIsImlzQm9yZGVyQm94Iiwic3R5bGVzIiwiZ2V0V2lkdGhPckhlaWdodCIsInZhbHVlSXNCb3JkZXJCb3giLCJnZXRDbGllbnRSZWN0cyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNzc0hvb2tzIiwib3BhY2l0eSIsImNzc1Byb3BzIiwib3JpZ05hbWUiLCJpc0Zpbml0ZSIsImxlZnQiLCJtYXJnaW4iLCJwYWRkaW5nIiwiYm9yZGVyIiwicHJlZml4Iiwic3VmZml4IiwiZXhwYW5kIiwiZXhwYW5kZWQiLCJwYXJ0cyIsIlR3ZWVuIiwiZWFzaW5nIiwicHJvcEhvb2tzIiwicnVuIiwicGVyY2VudCIsImVhc2VkIiwiZHVyYXRpb24iLCJwb3MiLCJzdGVwIiwiZngiLCJzY3JvbGxUb3AiLCJzY3JvbGxMZWZ0IiwibGluZWFyIiwicCIsInN3aW5nIiwiY29zIiwiUEkiLCJmeE5vdyIsInRpbWVySWQiLCJyZnh0eXBlcyIsInJydW4iLCJyYWYiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0aWNrIiwiY3JlYXRlRnhOb3ciLCJnZW5GeCIsImluY2x1ZGVXaWR0aCIsImhlaWdodCIsImNyZWF0ZVR3ZWVuIiwiYW5pbWF0aW9uIiwiQW5pbWF0aW9uIiwidHdlZW5lcnMiLCJkZWZhdWx0UHJlZmlsdGVyIiwib3B0cyIsIm9sZGZpcmUiLCJwcm9wVHdlZW4iLCJyZXN0b3JlRGlzcGxheSIsImlzQm94IiwiYW5pbSIsImhpZGRlbiIsImRhdGFTaG93IiwidW5xdWV1ZWQiLCJvdmVyZmxvdyIsIm92ZXJmbG93WCIsIm92ZXJmbG93WSIsInByb3BGaWx0ZXIiLCJzcGVjaWFsRWFzaW5nIiwicHJvcGVydGllcyIsInN0b3BwZWQiLCJwcmVmaWx0ZXJzIiwiY3VycmVudFRpbWUiLCJzdGFydFRpbWUiLCJ0d2VlbnMiLCJvcmlnaW5hbFByb3BlcnRpZXMiLCJvcmlnaW5hbE9wdGlvbnMiLCJnb3RvRW5kIiwidGltZXIiLCJjb21wbGV0ZSIsInR3ZWVuZXIiLCJwcmVmaWx0ZXIiLCJzcGVlZCIsIm9wdCIsInNwZWVkcyIsImZhZGVUbyIsInRvIiwiYW5pbWF0ZSIsIm9wdGFsbCIsImRvQW5pbWF0aW9uIiwiZmluaXNoIiwic3RvcFF1ZXVlIiwidGltZXJzIiwiY3NzRm4iLCJzbGlkZURvd24iLCJzbGlkZVVwIiwic2xpZGVUb2dnbGUiLCJmYWRlSW4iLCJmYWRlT3V0IiwiZmFkZVRvZ2dsZSIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImNsZWFySW50ZXJ2YWwiLCJzbG93IiwiZmFzdCIsImRlbGF5IiwidGltZSIsInRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJjaGVja09uIiwib3B0U2VsZWN0ZWQiLCJyYWRpb1ZhbHVlIiwiYm9vbEhvb2siLCJyZW1vdmVBdHRyIiwiblR5cGUiLCJhdHRySG9va3MiLCJib29sIiwiYXR0ck5hbWVzIiwiZ2V0dGVyIiwibG93ZXJjYXNlTmFtZSIsInJmb2N1c2FibGUiLCJyY2xpY2thYmxlIiwicmVtb3ZlUHJvcCIsInByb3BGaXgiLCJ0YWJpbmRleCIsInBhcnNlSW50Iiwic3RyaXBBbmRDb2xsYXBzZSIsImdldENsYXNzIiwiYWRkQ2xhc3MiLCJjbGFzc2VzIiwiY3VyVmFsdWUiLCJjbGF6eiIsImZpbmFsVmFsdWUiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUNsYXNzIiwic3RhdGVWYWwiLCJjbGFzc05hbWVzIiwiaGFzQ2xhc3MiLCJycmV0dXJuIiwidmFsSG9va3MiLCJvcHRpb25TZXQiLCJyZm9jdXNNb3JwaCIsIm9ubHlIYW5kbGVycyIsImJ1YmJsZVR5cGUiLCJvbnR5cGUiLCJldmVudFBhdGgiLCJpc1RyaWdnZXIiLCJwYXJlbnRXaW5kb3ciLCJzaW11bGF0ZSIsInRyaWdnZXJIYW5kbGVyIiwiaG92ZXIiLCJmbk92ZXIiLCJmbk91dCIsImZvY3VzaW4iLCJhdHRhY2hlcyIsIm5vbmNlIiwicnF1ZXJ5IiwicGFyc2VYTUwiLCJET01QYXJzZXIiLCJwYXJzZUZyb21TdHJpbmciLCJyYnJhY2tldCIsInJDUkxGIiwicnN1Ym1pdHRlclR5cGVzIiwicnN1Ym1pdHRhYmxlIiwiYnVpbGRQYXJhbXMiLCJ0cmFkaXRpb25hbCIsInBhcmFtIiwicyIsInZhbHVlT3JGdW5jdGlvbiIsImVuY29kZVVSSUNvbXBvbmVudCIsInNlcmlhbGl6ZSIsInNlcmlhbGl6ZUFycmF5IiwicjIwIiwicmhhc2giLCJyYW50aUNhY2hlIiwicmhlYWRlcnMiLCJybG9jYWxQcm90b2NvbCIsInJub0NvbnRlbnQiLCJycHJvdG9jb2wiLCJ0cmFuc3BvcnRzIiwiYWxsVHlwZXMiLCJvcmlnaW5BbmNob3IiLCJhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMiLCJzdHJ1Y3R1cmUiLCJkYXRhVHlwZUV4cHJlc3Npb24iLCJkYXRhVHlwZSIsImRhdGFUeXBlcyIsImluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzIiwianFYSFIiLCJpbnNwZWN0ZWQiLCJzZWVraW5nVHJhbnNwb3J0IiwiaW5zcGVjdCIsInByZWZpbHRlck9yRmFjdG9yeSIsImRhdGFUeXBlT3JUcmFuc3BvcnQiLCJhamF4RXh0ZW5kIiwiZmxhdE9wdGlvbnMiLCJhamF4U2V0dGluZ3MiLCJhamF4SGFuZGxlUmVzcG9uc2VzIiwicmVzcG9uc2VzIiwiY3QiLCJmaW5hbERhdGFUeXBlIiwiZmlyc3REYXRhVHlwZSIsIm1pbWVUeXBlIiwiZ2V0UmVzcG9uc2VIZWFkZXIiLCJjb252ZXJ0ZXJzIiwiYWpheENvbnZlcnQiLCJyZXNwb25zZSIsImlzU3VjY2VzcyIsImNvbnYyIiwiY3VycmVudCIsImNvbnYiLCJyZXNwb25zZUZpZWxkcyIsImRhdGFGaWx0ZXIiLCJ0aHJvd3MiLCJhY3RpdmUiLCJsYXN0TW9kaWZpZWQiLCJldGFnIiwidXJsIiwiaXNMb2NhbCIsInByb3RvY29sIiwicHJvY2Vzc0RhdGEiLCJhc3luYyIsImNvbnRlbnRUeXBlIiwiYWNjZXB0cyIsImpzb24iLCJhamF4U2V0dXAiLCJzZXR0aW5ncyIsImFqYXhQcmVmaWx0ZXIiLCJhamF4VHJhbnNwb3J0IiwiYWpheCIsInRyYW5zcG9ydCIsImNhY2hlVVJMIiwicmVzcG9uc2VIZWFkZXJzU3RyaW5nIiwicmVzcG9uc2VIZWFkZXJzIiwidGltZW91dFRpbWVyIiwidXJsQW5jaG9yIiwiZmlyZUdsb2JhbHMiLCJ1bmNhY2hlZCIsImNhbGxiYWNrQ29udGV4dCIsImdsb2JhbEV2ZW50Q29udGV4dCIsImNvbXBsZXRlRGVmZXJyZWQiLCJzdGF0dXNDb2RlIiwicmVxdWVzdEhlYWRlcnMiLCJyZXF1ZXN0SGVhZGVyc05hbWVzIiwic3RyQWJvcnQiLCJnZXRBbGxSZXNwb25zZUhlYWRlcnMiLCJzZXRSZXF1ZXN0SGVhZGVyIiwib3ZlcnJpZGVNaW1lVHlwZSIsInN0YXR1cyIsImFib3J0Iiwic3RhdHVzVGV4dCIsImZpbmFsVGV4dCIsImNyb3NzRG9tYWluIiwiaG9zdCIsImhhc0NvbnRlbnQiLCJpZk1vZGlmaWVkIiwiaGVhZGVycyIsImJlZm9yZVNlbmQiLCJzdWNjZXNzIiwic2VuZCIsIm5hdGl2ZVN0YXR1c1RleHQiLCJtb2RpZmllZCIsImdldEpTT04iLCJnZXRTY3JpcHQiLCJ3cmFwQWxsIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJ3cmFwSW5uZXIiLCJ1bndyYXAiLCJ2aXNpYmxlIiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsInhoclN1Y2Nlc3NTdGF0dXMiLCJ4aHJTdXBwb3J0ZWQiLCJjb3JzIiwiZXJyb3JDYWxsYmFjayIsIm9wZW4iLCJ1c2VybmFtZSIsInhockZpZWxkcyIsIm9ubG9hZCIsIm9uZXJyb3IiLCJvbmFib3J0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVzcG9uc2VUeXBlIiwicmVzcG9uc2VUZXh0IiwiYmluYXJ5IiwiY2hhcnNldCIsInNjcmlwdENoYXJzZXQiLCJldnQiLCJvbGRDYWxsYmFja3MiLCJyanNvbnAiLCJqc29ucCIsImpzb25wQ2FsbGJhY2siLCJvcmlnaW5hbFNldHRpbmdzIiwiY2FsbGJhY2tOYW1lIiwib3ZlcndyaXR0ZW4iLCJyZXNwb25zZUNvbnRhaW5lciIsImpzb25Qcm9wIiwiY3JlYXRlSFRNTERvY3VtZW50IiwiaW1wbGVtZW50YXRpb24iLCJrZWVwU2NyaXB0cyIsInBhcnNlZCIsInBhcmFtcyIsImFuaW1hdGVkIiwiZ2V0V2luZG93Iiwib2Zmc2V0Iiwic2V0T2Zmc2V0IiwiY3VyUG9zaXRpb24iLCJjdXJMZWZ0IiwiY3VyQ1NTVG9wIiwiY3VyVG9wIiwiY3VyT2Zmc2V0IiwiY3VyQ1NTTGVmdCIsImNhbGN1bGF0ZVBvc2l0aW9uIiwiY3VyRWxlbSIsInVzaW5nIiwid2luIiwicmVjdCIsInBhZ2VZT2Zmc2V0IiwiY2xpZW50VG9wIiwicGFnZVhPZmZzZXQiLCJjbGllbnRMZWZ0Iiwib2Zmc2V0UGFyZW50IiwicGFyZW50T2Zmc2V0Iiwic2Nyb2xsVG8iLCJIZWlnaHQiLCJXaWR0aCIsImRlZmF1bHRFeHRyYSIsImZ1bmNOYW1lIiwiYmluZCIsInVuYmluZCIsImRlbGVnYXRlIiwidW5kZWxlZ2F0ZSIsInBhcnNlSlNPTiIsImRlZmluZSIsImFtZCIsIl9qUXVlcnkiLCJfJCIsIiQiLCJub0NvbmZsaWN0Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7QUFhQSxDQUFFLFVBQVVBLE1BQVYsRUFBa0JDLE9BQWxCLEVBQTRCOztBQUU3Qjs7QUFFQSxLQUFLLFFBQU9D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QUFpQjtBQUNwQyxNQUFLNUUsT0FBT3VuQyxDQUFQLEtBQWExbEMsTUFBbEIsRUFBMkI7QUFDMUI3QixVQUFPdW5DLENBQVAsR0FBV0QsRUFBWDtBQUNBOztBQUVELE1BQUsxaUMsUUFBUTVFLE9BQU82QixNQUFQLEtBQWtCQSxNQUEvQixFQUF3QztBQUN2QzdCLFVBQU82QixNQUFQLEdBQWdCd2xDLE9BQWhCO0FBQ0E7O0FBRUQsU0FBT3hsQyxNQUFQO0FBQ0EsRUFWRDs7QUFZQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLENBQUM1QixRQUFOLEVBQWlCO0FBQ2hCRCxTQUFPNkIsTUFBUCxHQUFnQjdCLE9BQU91bkMsQ0FBUCxHQUFXMWxDLE1BQTNCO0FBQ0E7O0FBTUQsUUFBT0EsTUFBUDtBQUNDLENBOTlURCIsImZpbGUiOiJqcXVlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIGpRdWVyeSBKYXZhU2NyaXB0IExpYnJhcnkgdjMuMS4xXG4gKiBodHRwczovL2pxdWVyeS5jb20vXG4gKlxuICogSW5jbHVkZXMgU2l6emxlLmpzXG4gKiBodHRwczovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2pxdWVyeS5vcmcvbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTYtMDktMjJUMjI6MzBaXG4gKi9cbiggZnVuY3Rpb24oIGdsb2JhbCwgZmFjdG9yeSApIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRpZiAoIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0Ly8gRm9yIENvbW1vbkpTIGFuZCBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB3aGVyZSBhIHByb3BlciBgd2luZG93YFxuXHRcdC8vIGlzIHByZXNlbnQsIGV4ZWN1dGUgdGhlIGZhY3RvcnkgYW5kIGdldCBqUXVlcnkuXG5cdFx0Ly8gRm9yIGVudmlyb25tZW50cyB0aGF0IGRvIG5vdCBoYXZlIGEgYHdpbmRvd2Agd2l0aCBhIGBkb2N1bWVudGBcblx0XHQvLyAoc3VjaCBhcyBOb2RlLmpzKSwgZXhwb3NlIGEgZmFjdG9yeSBhcyBtb2R1bGUuZXhwb3J0cy5cblx0XHQvLyBUaGlzIGFjY2VudHVhdGVzIHRoZSBuZWVkIGZvciB0aGUgY3JlYXRpb24gb2YgYSByZWFsIGB3aW5kb3dgLlxuXHRcdC8vIGUuZy4gdmFyIGpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIikod2luZG93KTtcblx0XHQvLyBTZWUgdGlja2V0ICMxNDU0OSBmb3IgbW9yZSBpbmZvLlxuXHRcdG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLmRvY3VtZW50ID9cblx0XHRcdGZhY3RvcnkoIGdsb2JhbCwgdHJ1ZSApIDpcblx0XHRcdGZ1bmN0aW9uKCB3ICkge1xuXHRcdFx0XHRpZiAoICF3LmRvY3VtZW50ICkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvciggXCJqUXVlcnkgcmVxdWlyZXMgYSB3aW5kb3cgd2l0aCBhIGRvY3VtZW50XCIgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFjdG9yeSggdyApO1xuXHRcdFx0fTtcblx0fSBlbHNlIHtcblx0XHRmYWN0b3J5KCBnbG9iYWwgKTtcblx0fVxuXG4vLyBQYXNzIHRoaXMgaWYgd2luZG93IGlzIG5vdCBkZWZpbmVkIHlldFxufSApKCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24oIHdpbmRvdywgbm9HbG9iYWwgKSB7XG5cbi8vIEVkZ2UgPD0gMTIgLSAxMyssIEZpcmVmb3ggPD0xOCAtIDQ1KywgSUUgMTAgLSAxMSwgU2FmYXJpIDUuMSAtIDkrLCBpT1MgNiAtIDkuMVxuLy8gdGhyb3cgZXhjZXB0aW9ucyB3aGVuIG5vbi1zdHJpY3QgY29kZSAoZS5nLiwgQVNQLk5FVCA0LjUpIGFjY2Vzc2VzIHN0cmljdCBtb2RlXG4vLyBhcmd1bWVudHMuY2FsbGVlLmNhbGxlciAodHJhYy0xMzMzNSkuIEJ1dCBhcyBvZiBqUXVlcnkgMy4wICgyMDE2KSwgc3RyaWN0IG1vZGUgc2hvdWxkIGJlIGNvbW1vblxuLy8gZW5vdWdoIHRoYXQgYWxsIHN1Y2ggYXR0ZW1wdHMgYXJlIGd1YXJkZWQgaW4gYSB0cnkgYmxvY2suXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGFyciA9IFtdO1xuXG52YXIgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG5cbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxudmFyIHNsaWNlID0gYXJyLnNsaWNlO1xuXG52YXIgY29uY2F0ID0gYXJyLmNvbmNhdDtcblxudmFyIHB1c2ggPSBhcnIucHVzaDtcblxudmFyIGluZGV4T2YgPSBhcnIuaW5kZXhPZjtcblxudmFyIGNsYXNzMnR5cGUgPSB7fTtcblxudmFyIHRvU3RyaW5nID0gY2xhc3MydHlwZS50b1N0cmluZztcblxudmFyIGhhc093biA9IGNsYXNzMnR5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBmblRvU3RyaW5nID0gaGFzT3duLnRvU3RyaW5nO1xuXG52YXIgT2JqZWN0RnVuY3Rpb25TdHJpbmcgPSBmblRvU3RyaW5nLmNhbGwoIE9iamVjdCApO1xuXG52YXIgc3VwcG9ydCA9IHt9O1xuXG5cblxuXHRmdW5jdGlvbiBET01FdmFsKCBjb2RlLCBkb2MgKSB7XG5cdFx0ZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuXG5cdFx0dmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KCBcInNjcmlwdFwiICk7XG5cblx0XHRzY3JpcHQudGV4dCA9IGNvZGU7XG5cdFx0ZG9jLmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdCApLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHNjcmlwdCApO1xuXHR9XG4vKiBnbG9iYWwgU3ltYm9sICovXG4vLyBEZWZpbmluZyB0aGlzIGdsb2JhbCBpbiAuZXNsaW50cmMuanNvbiB3b3VsZCBjcmVhdGUgYSBkYW5nZXIgb2YgdXNpbmcgdGhlIGdsb2JhbFxuLy8gdW5ndWFyZGVkIGluIGFub3RoZXIgcGxhY2UsIGl0IHNlZW1zIHNhZmVyIHRvIGRlZmluZSBnbG9iYWwgb25seSBmb3IgdGhpcyBtb2R1bGVcblxuXG5cbnZhclxuXHR2ZXJzaW9uID0gXCIzLjEuMVwiLFxuXG5cdC8vIERlZmluZSBhIGxvY2FsIGNvcHkgb2YgalF1ZXJ5XG5cdGpRdWVyeSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcblxuXHRcdC8vIFRoZSBqUXVlcnkgb2JqZWN0IGlzIGFjdHVhbGx5IGp1c3QgdGhlIGluaXQgY29uc3RydWN0b3IgJ2VuaGFuY2VkJ1xuXHRcdC8vIE5lZWQgaW5pdCBpZiBqUXVlcnkgaXMgY2FsbGVkIChqdXN0IGFsbG93IGVycm9yIHRvIGJlIHRocm93biBpZiBub3QgaW5jbHVkZWQpXG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuZm4uaW5pdCggc2VsZWN0b3IsIGNvbnRleHQgKTtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHlcblx0Ly8gTWFrZSBzdXJlIHdlIHRyaW0gQk9NIGFuZCBOQlNQXG5cdHJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLFxuXG5cdC8vIE1hdGNoZXMgZGFzaGVkIHN0cmluZyBmb3IgY2FtZWxpemluZ1xuXHRybXNQcmVmaXggPSAvXi1tcy0vLFxuXHRyZGFzaEFscGhhID0gLy0oW2Etel0pL2csXG5cblx0Ly8gVXNlZCBieSBqUXVlcnkuY2FtZWxDYXNlIGFzIGNhbGxiYWNrIHRvIHJlcGxhY2UoKVxuXHRmY2FtZWxDYXNlID0gZnVuY3Rpb24oIGFsbCwgbGV0dGVyICkge1xuXHRcdHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcblx0fTtcblxualF1ZXJ5LmZuID0galF1ZXJ5LnByb3RvdHlwZSA9IHtcblxuXHQvLyBUaGUgY3VycmVudCB2ZXJzaW9uIG9mIGpRdWVyeSBiZWluZyB1c2VkXG5cdGpxdWVyeTogdmVyc2lvbixcblxuXHRjb25zdHJ1Y3RvcjogalF1ZXJ5LFxuXG5cdC8vIFRoZSBkZWZhdWx0IGxlbmd0aCBvZiBhIGpRdWVyeSBvYmplY3QgaXMgMFxuXHRsZW5ndGg6IDAsXG5cblx0dG9BcnJheTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHNsaWNlLmNhbGwoIHRoaXMgKTtcblx0fSxcblxuXHQvLyBHZXQgdGhlIE50aCBlbGVtZW50IGluIHRoZSBtYXRjaGVkIGVsZW1lbnQgc2V0IE9SXG5cdC8vIEdldCB0aGUgd2hvbGUgbWF0Y2hlZCBlbGVtZW50IHNldCBhcyBhIGNsZWFuIGFycmF5XG5cdGdldDogZnVuY3Rpb24oIG51bSApIHtcblxuXHRcdC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIGluIGEgY2xlYW4gYXJyYXlcblx0XHRpZiAoIG51bSA9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIHNsaWNlLmNhbGwoIHRoaXMgKTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4ganVzdCB0aGUgb25lIGVsZW1lbnQgZnJvbSB0aGUgc2V0XG5cdFx0cmV0dXJuIG51bSA8IDAgPyB0aGlzWyBudW0gKyB0aGlzLmxlbmd0aCBdIDogdGhpc1sgbnVtIF07XG5cdH0sXG5cblx0Ly8gVGFrZSBhbiBhcnJheSBvZiBlbGVtZW50cyBhbmQgcHVzaCBpdCBvbnRvIHRoZSBzdGFja1xuXHQvLyAocmV0dXJuaW5nIHRoZSBuZXcgbWF0Y2hlZCBlbGVtZW50IHNldClcblx0cHVzaFN0YWNrOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cblx0XHQvLyBCdWlsZCBhIG5ldyBqUXVlcnkgbWF0Y2hlZCBlbGVtZW50IHNldFxuXHRcdHZhciByZXQgPSBqUXVlcnkubWVyZ2UoIHRoaXMuY29uc3RydWN0b3IoKSwgZWxlbXMgKTtcblxuXHRcdC8vIEFkZCB0aGUgb2xkIG9iamVjdCBvbnRvIHRoZSBzdGFjayAoYXMgYSByZWZlcmVuY2UpXG5cdFx0cmV0LnByZXZPYmplY3QgPSB0aGlzO1xuXG5cdFx0Ly8gUmV0dXJuIHRoZSBuZXdseS1mb3JtZWQgZWxlbWVudCBzZXRcblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdC8vIEV4ZWN1dGUgYSBjYWxsYmFjayBmb3IgZXZlcnkgZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBzZXQuXG5cdGVhY2g6IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmVhY2goIHRoaXMsIGNhbGxiYWNrICk7XG5cdH0sXG5cblx0bWFwOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkubWFwKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKCBlbGVtLCBpLCBlbGVtICk7XG5cdFx0fSApICk7XG5cdH0sXG5cblx0c2xpY2U6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggc2xpY2UuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApICk7XG5cdH0sXG5cblx0Zmlyc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAwICk7XG5cdH0sXG5cblx0bGFzdDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZXEoIC0xICk7XG5cdH0sXG5cblx0ZXE6IGZ1bmN0aW9uKCBpICkge1xuXHRcdHZhciBsZW4gPSB0aGlzLmxlbmd0aCxcblx0XHRcdGogPSAraSArICggaSA8IDAgPyBsZW4gOiAwICk7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqID49IDAgJiYgaiA8IGxlbiA/IFsgdGhpc1sgaiBdIF0gOiBbXSApO1xuXHR9LFxuXG5cdGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJldk9iamVjdCB8fCB0aGlzLmNvbnN0cnVjdG9yKCk7XG5cdH0sXG5cblx0Ly8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxuXHQvLyBCZWhhdmVzIGxpa2UgYW4gQXJyYXkncyBtZXRob2QsIG5vdCBsaWtlIGEgalF1ZXJ5IG1ldGhvZC5cblx0cHVzaDogcHVzaCxcblx0c29ydDogYXJyLnNvcnQsXG5cdHNwbGljZTogYXJyLnNwbGljZVxufTtcblxualF1ZXJ5LmV4dGVuZCA9IGpRdWVyeS5mbi5leHRlbmQgPSBmdW5jdGlvbigpIHtcblx0dmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sgMCBdIHx8IHt9LFxuXHRcdGkgPSAxLFxuXHRcdGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0ZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKCB0eXBlb2YgdGFyZ2V0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXG5cdFx0Ly8gU2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sgaSBdIHx8IHt9O1xuXHRcdGkrKztcblx0fVxuXG5cdC8vIEhhbmRsZSBjYXNlIHdoZW4gdGFyZ2V0IGlzIGEgc3RyaW5nIG9yIHNvbWV0aGluZyAocG9zc2libGUgaW4gZGVlcCBjb3B5KVxuXHRpZiAoIHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIgJiYgIWpRdWVyeS5pc0Z1bmN0aW9uKCB0YXJnZXQgKSApIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdC8vIEV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxuXHRpZiAoIGkgPT09IGxlbmd0aCApIHtcblx0XHR0YXJnZXQgPSB0aGlzO1xuXHRcdGktLTtcblx0fVxuXG5cdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmICggKCBvcHRpb25zID0gYXJndW1lbnRzWyBpIF0gKSAhPSBudWxsICkge1xuXG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKCB0YXJnZXQgPT09IGNvcHkgKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0aWYgKCBkZWVwICYmIGNvcHkgJiYgKCBqUXVlcnkuaXNQbGFpbk9iamVjdCggY29weSApIHx8XG5cdFx0XHRcdFx0KCBjb3B5SXNBcnJheSA9IGpRdWVyeS5pc0FycmF5KCBjb3B5ICkgKSApICkge1xuXG5cdFx0XHRcdFx0aWYgKCBjb3B5SXNBcnJheSApIHtcblx0XHRcdFx0XHRcdGNvcHlJc0FycmF5ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNBcnJheSggc3JjICkgPyBzcmMgOiBbXTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdCggc3JjICkgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHR0YXJnZXRbIG5hbWUgXSA9IGpRdWVyeS5leHRlbmQoIGRlZXAsIGNsb25lLCBjb3B5ICk7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBjb3B5ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBjb3B5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBVbmlxdWUgZm9yIGVhY2ggY29weSBvZiBqUXVlcnkgb24gdGhlIHBhZ2Vcblx0ZXhwYW5kbzogXCJqUXVlcnlcIiArICggdmVyc2lvbiArIE1hdGgucmFuZG9tKCkgKS5yZXBsYWNlKCAvXFxEL2csIFwiXCIgKSxcblxuXHQvLyBBc3N1bWUgalF1ZXJ5IGlzIHJlYWR5IHdpdGhvdXQgdGhlIHJlYWR5IG1vZHVsZVxuXHRpc1JlYWR5OiB0cnVlLFxuXG5cdGVycm9yOiBmdW5jdGlvbiggbXNnICkge1xuXHRcdHRocm93IG5ldyBFcnJvciggbXNnICk7XG5cdH0sXG5cblx0bm9vcDogZnVuY3Rpb24oKSB7fSxcblxuXHRpc0Z1bmN0aW9uOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiBqUXVlcnkudHlwZSggb2JqICkgPT09IFwiZnVuY3Rpb25cIjtcblx0fSxcblxuXHRpc0FycmF5OiBBcnJheS5pc0FycmF5LFxuXG5cdGlzV2luZG93OiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmogPT09IG9iai53aW5kb3c7XG5cdH0sXG5cblx0aXNOdW1lcmljOiBmdW5jdGlvbiggb2JqICkge1xuXG5cdFx0Ly8gQXMgb2YgalF1ZXJ5IDMuMCwgaXNOdW1lcmljIGlzIGxpbWl0ZWQgdG9cblx0XHQvLyBzdHJpbmdzIGFuZCBudW1iZXJzIChwcmltaXRpdmVzIG9yIG9iamVjdHMpXG5cdFx0Ly8gdGhhdCBjYW4gYmUgY29lcmNlZCB0byBmaW5pdGUgbnVtYmVycyAoZ2gtMjY2Milcblx0XHR2YXIgdHlwZSA9IGpRdWVyeS50eXBlKCBvYmogKTtcblx0XHRyZXR1cm4gKCB0eXBlID09PSBcIm51bWJlclwiIHx8IHR5cGUgPT09IFwic3RyaW5nXCIgKSAmJlxuXG5cdFx0XHQvLyBwYXJzZUZsb2F0IE5hTnMgbnVtZXJpYy1jYXN0IGZhbHNlIHBvc2l0aXZlcyAoXCJcIilcblx0XHRcdC8vIC4uLmJ1dCBtaXNpbnRlcnByZXRzIGxlYWRpbmctbnVtYmVyIHN0cmluZ3MsIHBhcnRpY3VsYXJseSBoZXggbGl0ZXJhbHMgKFwiMHguLi5cIilcblx0XHRcdC8vIHN1YnRyYWN0aW9uIGZvcmNlcyBpbmZpbml0aWVzIHRvIE5hTlxuXHRcdFx0IWlzTmFOKCBvYmogLSBwYXJzZUZsb2F0KCBvYmogKSApO1xuXHR9LFxuXG5cdGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0dmFyIHByb3RvLCBDdG9yO1xuXG5cdFx0Ly8gRGV0ZWN0IG9idmlvdXMgbmVnYXRpdmVzXG5cdFx0Ly8gVXNlIHRvU3RyaW5nIGluc3RlYWQgb2YgalF1ZXJ5LnR5cGUgdG8gY2F0Y2ggaG9zdCBvYmplY3RzXG5cdFx0aWYgKCAhb2JqIHx8IHRvU3RyaW5nLmNhbGwoIG9iaiApICE9PSBcIltvYmplY3QgT2JqZWN0XVwiICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHByb3RvID0gZ2V0UHJvdG8oIG9iaiApO1xuXG5cdFx0Ly8gT2JqZWN0cyB3aXRoIG5vIHByb3RvdHlwZSAoZS5nLiwgYE9iamVjdC5jcmVhdGUoIG51bGwgKWApIGFyZSBwbGFpblxuXHRcdGlmICggIXByb3RvICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gT2JqZWN0cyB3aXRoIHByb3RvdHlwZSBhcmUgcGxhaW4gaWZmIHRoZXkgd2VyZSBjb25zdHJ1Y3RlZCBieSBhIGdsb2JhbCBPYmplY3QgZnVuY3Rpb25cblx0XHRDdG9yID0gaGFzT3duLmNhbGwoIHByb3RvLCBcImNvbnN0cnVjdG9yXCIgKSAmJiBwcm90by5jb25zdHJ1Y3Rvcjtcblx0XHRyZXR1cm4gdHlwZW9mIEN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBmblRvU3RyaW5nLmNhbGwoIEN0b3IgKSA9PT0gT2JqZWN0RnVuY3Rpb25TdHJpbmc7XG5cdH0sXG5cblx0aXNFbXB0eU9iamVjdDogZnVuY3Rpb24oIG9iaiApIHtcblxuXHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lc2xpbnQvZXNsaW50L2lzc3Vlcy82MTI1XG5cdFx0dmFyIG5hbWU7XG5cblx0XHRmb3IgKCBuYW1lIGluIG9iaiApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cblx0dHlwZTogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRpZiAoIG9iaiA9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIG9iaiArIFwiXCI7XG5cdFx0fVxuXG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTIuMyBvbmx5IChmdW5jdGlvbmlzaCBSZWdFeHApXG5cdFx0cmV0dXJuIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiID9cblx0XHRcdGNsYXNzMnR5cGVbIHRvU3RyaW5nLmNhbGwoIG9iaiApIF0gfHwgXCJvYmplY3RcIiA6XG5cdFx0XHR0eXBlb2Ygb2JqO1xuXHR9LFxuXG5cdC8vIEV2YWx1YXRlcyBhIHNjcmlwdCBpbiBhIGdsb2JhbCBjb250ZXh0XG5cdGdsb2JhbEV2YWw6IGZ1bmN0aW9uKCBjb2RlICkge1xuXHRcdERPTUV2YWwoIGNvZGUgKTtcblx0fSxcblxuXHQvLyBDb252ZXJ0IGRhc2hlZCB0byBjYW1lbENhc2U7IHVzZWQgYnkgdGhlIGNzcyBhbmQgZGF0YSBtb2R1bGVzXG5cdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExLCBFZGdlIDEyIC0gMTNcblx0Ly8gTWljcm9zb2Z0IGZvcmdvdCB0byBodW1wIHRoZWlyIHZlbmRvciBwcmVmaXggKCM5NTcyKVxuXHRjYW1lbENhc2U6IGZ1bmN0aW9uKCBzdHJpbmcgKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKCBybXNQcmVmaXgsIFwibXMtXCIgKS5yZXBsYWNlKCByZGFzaEFscGhhLCBmY2FtZWxDYXNlICk7XG5cdH0sXG5cblx0bm9kZU5hbWU6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHR9LFxuXG5cdGVhY2g6IGZ1bmN0aW9uKCBvYmosIGNhbGxiYWNrICkge1xuXHRcdHZhciBsZW5ndGgsIGkgPSAwO1xuXG5cdFx0aWYgKCBpc0FycmF5TGlrZSggb2JqICkgKSB7XG5cdFx0XHRsZW5ndGggPSBvYmoubGVuZ3RoO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAoIGkgaW4gb2JqICkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmo7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5XG5cdHRyaW06IGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdHJldHVybiB0ZXh0ID09IG51bGwgP1xuXHRcdFx0XCJcIiA6XG5cdFx0XHQoIHRleHQgKyBcIlwiICkucmVwbGFjZSggcnRyaW0sIFwiXCIgKTtcblx0fSxcblxuXHQvLyByZXN1bHRzIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG5cdG1ha2VBcnJheTogZnVuY3Rpb24oIGFyciwgcmVzdWx0cyApIHtcblx0XHR2YXIgcmV0ID0gcmVzdWx0cyB8fCBbXTtcblxuXHRcdGlmICggYXJyICE9IG51bGwgKSB7XG5cdFx0XHRpZiAoIGlzQXJyYXlMaWtlKCBPYmplY3QoIGFyciApICkgKSB7XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggcmV0LFxuXHRcdFx0XHRcdHR5cGVvZiBhcnIgPT09IFwic3RyaW5nXCIgP1xuXHRcdFx0XHRcdFsgYXJyIF0gOiBhcnJcblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHB1c2guY2FsbCggcmV0LCBhcnIgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdGluQXJyYXk6IGZ1bmN0aW9uKCBlbGVtLCBhcnIsIGkgKSB7XG5cdFx0cmV0dXJuIGFyciA9PSBudWxsID8gLTEgOiBpbmRleE9mLmNhbGwoIGFyciwgZWxlbSwgaSApO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdG1lcmdlOiBmdW5jdGlvbiggZmlyc3QsIHNlY29uZCApIHtcblx0XHR2YXIgbGVuID0gK3NlY29uZC5sZW5ndGgsXG5cdFx0XHRqID0gMCxcblx0XHRcdGkgPSBmaXJzdC5sZW5ndGg7XG5cblx0XHRmb3IgKCA7IGogPCBsZW47IGorKyApIHtcblx0XHRcdGZpcnN0WyBpKysgXSA9IHNlY29uZFsgaiBdO1xuXHRcdH1cblxuXHRcdGZpcnN0Lmxlbmd0aCA9IGk7XG5cblx0XHRyZXR1cm4gZmlyc3Q7XG5cdH0sXG5cblx0Z3JlcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgaW52ZXJ0ICkge1xuXHRcdHZhciBjYWxsYmFja0ludmVyc2UsXG5cdFx0XHRtYXRjaGVzID0gW10sXG5cdFx0XHRpID0gMCxcblx0XHRcdGxlbmd0aCA9IGVsZW1zLmxlbmd0aCxcblx0XHRcdGNhbGxiYWNrRXhwZWN0ID0gIWludmVydDtcblxuXHRcdC8vIEdvIHRocm91Z2ggdGhlIGFycmF5LCBvbmx5IHNhdmluZyB0aGUgaXRlbXNcblx0XHQvLyB0aGF0IHBhc3MgdGhlIHZhbGlkYXRvciBmdW5jdGlvblxuXHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0Y2FsbGJhY2tJbnZlcnNlID0gIWNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpICk7XG5cdFx0XHRpZiAoIGNhbGxiYWNrSW52ZXJzZSAhPT0gY2FsbGJhY2tFeHBlY3QgKSB7XG5cdFx0XHRcdG1hdGNoZXMucHVzaCggZWxlbXNbIGkgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBtYXRjaGVzO1xuXHR9LFxuXG5cdC8vIGFyZyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRtYXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGFyZyApIHtcblx0XHR2YXIgbGVuZ3RoLCB2YWx1ZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0cmV0ID0gW107XG5cblx0XHQvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgdHJhbnNsYXRpbmcgZWFjaCBvZiB0aGUgaXRlbXMgdG8gdGhlaXIgbmV3IHZhbHVlc1xuXHRcdGlmICggaXNBcnJheUxpa2UoIGVsZW1zICkgKSB7XG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGg7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBHbyB0aHJvdWdoIGV2ZXJ5IGtleSBvbiB0aGUgb2JqZWN0LFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKCBpIGluIGVsZW1zICkge1xuXHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpLCBhcmcgKTtcblxuXHRcdFx0XHRpZiAoIHZhbHVlICE9IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0LnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG5cdFx0cmV0dXJuIGNvbmNhdC5hcHBseSggW10sIHJldCApO1xuXHR9LFxuXG5cdC8vIEEgZ2xvYmFsIEdVSUQgY291bnRlciBmb3Igb2JqZWN0c1xuXHRndWlkOiAxLFxuXG5cdC8vIEJpbmQgYSBmdW5jdGlvbiB0byBhIGNvbnRleHQsIG9wdGlvbmFsbHkgcGFydGlhbGx5IGFwcGx5aW5nIGFueVxuXHQvLyBhcmd1bWVudHMuXG5cdHByb3h5OiBmdW5jdGlvbiggZm4sIGNvbnRleHQgKSB7XG5cdFx0dmFyIHRtcCwgYXJncywgcHJveHk7XG5cblx0XHRpZiAoIHR5cGVvZiBjb250ZXh0ID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0dG1wID0gZm5bIGNvbnRleHQgXTtcblx0XHRcdGNvbnRleHQgPSBmbjtcblx0XHRcdGZuID0gdG1wO1xuXHRcdH1cblxuXHRcdC8vIFF1aWNrIGNoZWNrIHRvIGRldGVybWluZSBpZiB0YXJnZXQgaXMgY2FsbGFibGUsIGluIHRoZSBzcGVjXG5cdFx0Ly8gdGhpcyB0aHJvd3MgYSBUeXBlRXJyb3IsIGJ1dCB3ZSB3aWxsIGp1c3QgcmV0dXJuIHVuZGVmaW5lZC5cblx0XHRpZiAoICFqUXVlcnkuaXNGdW5jdGlvbiggZm4gKSApIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gU2ltdWxhdGVkIGJpbmRcblx0XHRhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzLCAyICk7XG5cdFx0cHJveHkgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBmbi5hcHBseSggY29udGV4dCB8fCB0aGlzLCBhcmdzLmNvbmNhdCggc2xpY2UuY2FsbCggYXJndW1lbnRzICkgKSApO1xuXHRcdH07XG5cblx0XHQvLyBTZXQgdGhlIGd1aWQgb2YgdW5pcXVlIGhhbmRsZXIgdG8gdGhlIHNhbWUgb2Ygb3JpZ2luYWwgaGFuZGxlciwgc28gaXQgY2FuIGJlIHJlbW92ZWRcblx0XHRwcm94eS5ndWlkID0gZm4uZ3VpZCA9IGZuLmd1aWQgfHwgalF1ZXJ5Lmd1aWQrKztcblxuXHRcdHJldHVybiBwcm94eTtcblx0fSxcblxuXHRub3c6IERhdGUubm93LFxuXG5cdC8vIGpRdWVyeS5zdXBwb3J0IGlzIG5vdCB1c2VkIGluIENvcmUgYnV0IG90aGVyIHByb2plY3RzIGF0dGFjaCB0aGVpclxuXHQvLyBwcm9wZXJ0aWVzIHRvIGl0IHNvIGl0IG5lZWRzIHRvIGV4aXN0LlxuXHRzdXBwb3J0OiBzdXBwb3J0XG59ICk7XG5cbmlmICggdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRqUXVlcnkuZm5bIFN5bWJvbC5pdGVyYXRvciBdID0gYXJyWyBTeW1ib2wuaXRlcmF0b3IgXTtcbn1cblxuLy8gUG9wdWxhdGUgdGhlIGNsYXNzMnR5cGUgbWFwXG5qUXVlcnkuZWFjaCggXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yIFN5bWJvbFwiLnNwbGl0KCBcIiBcIiApLFxuZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xufSApO1xuXG5mdW5jdGlvbiBpc0FycmF5TGlrZSggb2JqICkge1xuXG5cdC8vIFN1cHBvcnQ6IHJlYWwgaU9TIDguMiBvbmx5IChub3QgcmVwcm9kdWNpYmxlIGluIHNpbXVsYXRvcilcblx0Ly8gYGluYCBjaGVjayB1c2VkIHRvIHByZXZlbnQgSklUIGVycm9yIChnaC0yMTQ1KVxuXHQvLyBoYXNPd24gaXNuJ3QgdXNlZCBoZXJlIGR1ZSB0byBmYWxzZSBuZWdhdGl2ZXNcblx0Ly8gcmVnYXJkaW5nIE5vZGVsaXN0IGxlbmd0aCBpbiBJRVxuXHR2YXIgbGVuZ3RoID0gISFvYmogJiYgXCJsZW5ndGhcIiBpbiBvYmogJiYgb2JqLmxlbmd0aCxcblx0XHR0eXBlID0galF1ZXJ5LnR5cGUoIG9iaiApO1xuXG5cdGlmICggdHlwZSA9PT0gXCJmdW5jdGlvblwiIHx8IGpRdWVyeS5pc1dpbmRvdyggb2JqICkgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIHR5cGUgPT09IFwiYXJyYXlcIiB8fCBsZW5ndGggPT09IDAgfHxcblx0XHR0eXBlb2YgbGVuZ3RoID09PSBcIm51bWJlclwiICYmIGxlbmd0aCA+IDAgJiYgKCBsZW5ndGggLSAxICkgaW4gb2JqO1xufVxudmFyIFNpenpsZSA9XG4vKiFcbiAqIFNpenpsZSBDU1MgU2VsZWN0b3IgRW5naW5lIHYyLjMuM1xuICogaHR0cHM6Ly9zaXp6bGVqcy5jb20vXG4gKlxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cDovL2pxdWVyeS5vcmcvbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTYtMDgtMDhcbiAqL1xuKGZ1bmN0aW9uKCB3aW5kb3cgKSB7XG5cbnZhciBpLFxuXHRzdXBwb3J0LFxuXHRFeHByLFxuXHRnZXRUZXh0LFxuXHRpc1hNTCxcblx0dG9rZW5pemUsXG5cdGNvbXBpbGUsXG5cdHNlbGVjdCxcblx0b3V0ZXJtb3N0Q29udGV4dCxcblx0c29ydElucHV0LFxuXHRoYXNEdXBsaWNhdGUsXG5cblx0Ly8gTG9jYWwgZG9jdW1lbnQgdmFyc1xuXHRzZXREb2N1bWVudCxcblx0ZG9jdW1lbnQsXG5cdGRvY0VsZW0sXG5cdGRvY3VtZW50SXNIVE1MLFxuXHRyYnVnZ3lRU0EsXG5cdHJidWdneU1hdGNoZXMsXG5cdG1hdGNoZXMsXG5cdGNvbnRhaW5zLFxuXG5cdC8vIEluc3RhbmNlLXNwZWNpZmljIGRhdGFcblx0ZXhwYW5kbyA9IFwic2l6emxlXCIgKyAxICogbmV3IERhdGUoKSxcblx0cHJlZmVycmVkRG9jID0gd2luZG93LmRvY3VtZW50LFxuXHRkaXJydW5zID0gMCxcblx0ZG9uZSA9IDAsXG5cdGNsYXNzQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHR0b2tlbkNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0Y29tcGlsZXJDYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdHNvcnRPcmRlciA9IGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiAwO1xuXHR9LFxuXG5cdC8vIEluc3RhbmNlIG1ldGhvZHNcblx0aGFzT3duID0gKHt9KS5oYXNPd25Qcm9wZXJ0eSxcblx0YXJyID0gW10sXG5cdHBvcCA9IGFyci5wb3AsXG5cdHB1c2hfbmF0aXZlID0gYXJyLnB1c2gsXG5cdHB1c2ggPSBhcnIucHVzaCxcblx0c2xpY2UgPSBhcnIuc2xpY2UsXG5cdC8vIFVzZSBhIHN0cmlwcGVkLWRvd24gaW5kZXhPZiBhcyBpdCdzIGZhc3RlciB0aGFuIG5hdGl2ZVxuXHQvLyBodHRwczovL2pzcGVyZi5jb20vdGhvci1pbmRleG9mLXZzLWZvci81XG5cdGluZGV4T2YgPSBmdW5jdGlvbiggbGlzdCwgZWxlbSApIHtcblx0XHR2YXIgaSA9IDAsXG5cdFx0XHRsZW4gPSBsaXN0Lmxlbmd0aDtcblx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdGlmICggbGlzdFtpXSA9PT0gZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAtMTtcblx0fSxcblxuXHRib29sZWFucyA9IFwiY2hlY2tlZHxzZWxlY3RlZHxhc3luY3xhdXRvZm9jdXN8YXV0b3BsYXl8Y29udHJvbHN8ZGVmZXJ8ZGlzYWJsZWR8aGlkZGVufGlzbWFwfGxvb3B8bXVsdGlwbGV8b3BlbnxyZWFkb25seXxyZXF1aXJlZHxzY29wZWRcIixcblxuXHQvLyBSZWd1bGFyIGV4cHJlc3Npb25zXG5cblx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zZWxlY3RvcnMvI3doaXRlc3BhY2Vcblx0d2hpdGVzcGFjZSA9IFwiW1xcXFx4MjBcXFxcdFxcXFxyXFxcXG5cXFxcZl1cIixcblxuXHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS9zeW5kYXRhLmh0bWwjdmFsdWUtZGVmLWlkZW50aWZpZXJcblx0aWRlbnRpZmllciA9IFwiKD86XFxcXFxcXFwufFtcXFxcdy1dfFteXFwwLVxcXFx4YTBdKStcIixcblxuXHQvLyBBdHRyaWJ1dGUgc2VsZWN0b3JzOiBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2F0dHJpYnV0ZS1zZWxlY3RvcnNcblx0YXR0cmlidXRlcyA9IFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooXCIgKyBpZGVudGlmaWVyICsgXCIpKD86XCIgKyB3aGl0ZXNwYWNlICtcblx0XHQvLyBPcGVyYXRvciAoY2FwdHVyZSAyKVxuXHRcdFwiKihbKl4kfCF+XT89KVwiICsgd2hpdGVzcGFjZSArXG5cdFx0Ly8gXCJBdHRyaWJ1dGUgdmFsdWVzIG11c3QgYmUgQ1NTIGlkZW50aWZpZXJzIFtjYXB0dXJlIDVdIG9yIHN0cmluZ3MgW2NhcHR1cmUgMyBvciBjYXB0dXJlIDRdXCJcblx0XHRcIiooPzonKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCJ8KFwiICsgaWRlbnRpZmllciArIFwiKSl8KVwiICsgd2hpdGVzcGFjZSArXG5cdFx0XCIqXFxcXF1cIixcblxuXHRwc2V1ZG9zID0gXCI6KFwiICsgaWRlbnRpZmllciArIFwiKSg/OlxcXFwoKFwiICtcblx0XHQvLyBUbyByZWR1Y2UgdGhlIG51bWJlciBvZiBzZWxlY3RvcnMgbmVlZGluZyB0b2tlbml6ZSBpbiB0aGUgcHJlRmlsdGVyLCBwcmVmZXIgYXJndW1lbnRzOlxuXHRcdC8vIDEuIHF1b3RlZCAoY2FwdHVyZSAzOyBjYXB0dXJlIDQgb3IgY2FwdHVyZSA1KVxuXHRcdFwiKCcoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcIil8XCIgK1xuXHRcdC8vIDIuIHNpbXBsZSAoY2FwdHVyZSA2KVxuXHRcdFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKClbXFxcXF1dfFwiICsgYXR0cmlidXRlcyArIFwiKSopfFwiICtcblx0XHQvLyAzLiBhbnl0aGluZyBlbHNlIChjYXB0dXJlIDIpXG5cdFx0XCIuKlwiICtcblx0XHRcIilcXFxcKXwpXCIsXG5cblx0Ly8gTGVhZGluZyBhbmQgbm9uLWVzY2FwZWQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgY2FwdHVyaW5nIHNvbWUgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVycyBwcmVjZWRpbmcgdGhlIGxhdHRlclxuXHRyd2hpdGVzcGFjZSA9IG5ldyBSZWdFeHAoIHdoaXRlc3BhY2UgKyBcIitcIiwgXCJnXCIgKSxcblx0cnRyaW0gPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIit8KCg/Ol58W15cXFxcXFxcXF0pKD86XFxcXFxcXFwuKSopXCIgKyB3aGl0ZXNwYWNlICsgXCIrJFwiLCBcImdcIiApLFxuXG5cdHJjb21tYSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKixcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxuXHRyY29tYmluYXRvcnMgPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIiooWz4rfl18XCIgKyB3aGl0ZXNwYWNlICsgXCIpXCIgKyB3aGl0ZXNwYWNlICsgXCIqXCIgKSxcblxuXHRyYXR0cmlidXRlUXVvdGVzID0gbmV3IFJlZ0V4cCggXCI9XCIgKyB3aGl0ZXNwYWNlICsgXCIqKFteXFxcXF0nXFxcIl0qPylcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcXVwiLCBcImdcIiApLFxuXG5cdHJwc2V1ZG8gPSBuZXcgUmVnRXhwKCBwc2V1ZG9zICksXG5cdHJpZGVudGlmaWVyID0gbmV3IFJlZ0V4cCggXCJeXCIgKyBpZGVudGlmaWVyICsgXCIkXCIgKSxcblxuXHRtYXRjaEV4cHIgPSB7XG5cdFx0XCJJRFwiOiBuZXcgUmVnRXhwKCBcIl4jKFwiICsgaWRlbnRpZmllciArIFwiKVwiICksXG5cdFx0XCJDTEFTU1wiOiBuZXcgUmVnRXhwKCBcIl5cXFxcLihcIiArIGlkZW50aWZpZXIgKyBcIilcIiApLFxuXHRcdFwiVEFHXCI6IG5ldyBSZWdFeHAoIFwiXihcIiArIGlkZW50aWZpZXIgKyBcInxbKl0pXCIgKSxcblx0XHRcIkFUVFJcIjogbmV3IFJlZ0V4cCggXCJeXCIgKyBhdHRyaWJ1dGVzICksXG5cdFx0XCJQU0VVRE9cIjogbmV3IFJlZ0V4cCggXCJeXCIgKyBwc2V1ZG9zICksXG5cdFx0XCJDSElMRFwiOiBuZXcgUmVnRXhwKCBcIl46KG9ubHl8Zmlyc3R8bGFzdHxudGh8bnRoLWxhc3QpLShjaGlsZHxvZi10eXBlKSg/OlxcXFwoXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcdFwiKihldmVufG9kZHwoKFsrLV18KShcXFxcZCopbnwpXCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86KFsrLV18KVwiICsgd2hpdGVzcGFjZSArXG5cdFx0XHRcIiooXFxcXGQrKXwpKVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFwpfClcIiwgXCJpXCIgKSxcblx0XHRcImJvb2xcIjogbmV3IFJlZ0V4cCggXCJeKD86XCIgKyBib29sZWFucyArIFwiKSRcIiwgXCJpXCIgKSxcblx0XHQvLyBGb3IgdXNlIGluIGxpYnJhcmllcyBpbXBsZW1lbnRpbmcgLmlzKClcblx0XHQvLyBXZSB1c2UgdGhpcyBmb3IgUE9TIG1hdGNoaW5nIGluIGBzZWxlY3RgXG5cdFx0XCJuZWVkc0NvbnRleHRcIjogbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqWz4rfl18OihldmVufG9kZHxlcXxndHxsdHxudGh8Zmlyc3R8bGFzdCkoPzpcXFxcKFwiICtcblx0XHRcdHdoaXRlc3BhY2UgKyBcIiooKD86LVxcXFxkKT9cXFxcZCopXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXCl8KSg/PVteLV18JClcIiwgXCJpXCIgKVxuXHR9LFxuXG5cdHJpbnB1dHMgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLFxuXHRyaGVhZGVyID0gL15oXFxkJC9pLFxuXG5cdHJuYXRpdmUgPSAvXltee10rXFx7XFxzKlxcW25hdGl2ZSBcXHcvLFxuXG5cdC8vIEVhc2lseS1wYXJzZWFibGUvcmV0cmlldmFibGUgSUQgb3IgVEFHIG9yIENMQVNTIHNlbGVjdG9yc1xuXHRycXVpY2tFeHByID0gL14oPzojKFtcXHctXSspfChcXHcrKXxcXC4oW1xcdy1dKykpJC8sXG5cblx0cnNpYmxpbmcgPSAvWyt+XS8sXG5cblx0Ly8gQ1NTIGVzY2FwZXNcblx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvc3luZGF0YS5odG1sI2VzY2FwZWQtY2hhcmFjdGVyc1xuXHRydW5lc2NhcGUgPSBuZXcgUmVnRXhwKCBcIlxcXFxcXFxcKFtcXFxcZGEtZl17MSw2fVwiICsgd2hpdGVzcGFjZSArIFwiP3woXCIgKyB3aGl0ZXNwYWNlICsgXCIpfC4pXCIsIFwiaWdcIiApLFxuXHRmdW5lc2NhcGUgPSBmdW5jdGlvbiggXywgZXNjYXBlZCwgZXNjYXBlZFdoaXRlc3BhY2UgKSB7XG5cdFx0dmFyIGhpZ2ggPSBcIjB4XCIgKyBlc2NhcGVkIC0gMHgxMDAwMDtcblx0XHQvLyBOYU4gbWVhbnMgbm9uLWNvZGVwb2ludFxuXHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3g8MjRcblx0XHQvLyBXb3JrYXJvdW5kIGVycm9uZW91cyBudW1lcmljIGludGVycHJldGF0aW9uIG9mICtcIjB4XCJcblx0XHRyZXR1cm4gaGlnaCAhPT0gaGlnaCB8fCBlc2NhcGVkV2hpdGVzcGFjZSA/XG5cdFx0XHRlc2NhcGVkIDpcblx0XHRcdGhpZ2ggPCAwID9cblx0XHRcdFx0Ly8gQk1QIGNvZGVwb2ludFxuXHRcdFx0XHRTdHJpbmcuZnJvbUNoYXJDb2RlKCBoaWdoICsgMHgxMDAwMCApIDpcblx0XHRcdFx0Ly8gU3VwcGxlbWVudGFsIFBsYW5lIGNvZGVwb2ludCAoc3Vycm9nYXRlIHBhaXIpXG5cdFx0XHRcdFN0cmluZy5mcm9tQ2hhckNvZGUoIGhpZ2ggPj4gMTAgfCAweEQ4MDAsIGhpZ2ggJiAweDNGRiB8IDB4REMwMCApO1xuXHR9LFxuXG5cdC8vIENTUyBzdHJpbmcvaWRlbnRpZmllciBzZXJpYWxpemF0aW9uXG5cdC8vIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3NvbS8jY29tbW9uLXNlcmlhbGl6aW5nLWlkaW9tc1xuXHRyY3NzZXNjYXBlID0gLyhbXFwwLVxceDFmXFx4N2ZdfF4tP1xcZCl8Xi0kfFteXFwwLVxceDFmXFx4N2YtXFx1RkZGRlxcdy1dL2csXG5cdGZjc3Nlc2NhcGUgPSBmdW5jdGlvbiggY2gsIGFzQ29kZVBvaW50ICkge1xuXHRcdGlmICggYXNDb2RlUG9pbnQgKSB7XG5cblx0XHRcdC8vIFUrMDAwMCBOVUxMIGJlY29tZXMgVStGRkZEIFJFUExBQ0VNRU5UIENIQVJBQ1RFUlxuXHRcdFx0aWYgKCBjaCA9PT0gXCJcXDBcIiApIHtcblx0XHRcdFx0cmV0dXJuIFwiXFx1RkZGRFwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb250cm9sIGNoYXJhY3RlcnMgYW5kIChkZXBlbmRlbnQgdXBvbiBwb3NpdGlvbikgbnVtYmVycyBnZXQgZXNjYXBlZCBhcyBjb2RlIHBvaW50c1xuXHRcdFx0cmV0dXJuIGNoLnNsaWNlKCAwLCAtMSApICsgXCJcXFxcXCIgKyBjaC5jaGFyQ29kZUF0KCBjaC5sZW5ndGggLSAxICkudG9TdHJpbmcoIDE2ICkgKyBcIiBcIjtcblx0XHR9XG5cblx0XHQvLyBPdGhlciBwb3RlbnRpYWxseS1zcGVjaWFsIEFTQ0lJIGNoYXJhY3RlcnMgZ2V0IGJhY2tzbGFzaC1lc2NhcGVkXG5cdFx0cmV0dXJuIFwiXFxcXFwiICsgY2g7XG5cdH0sXG5cblx0Ly8gVXNlZCBmb3IgaWZyYW1lc1xuXHQvLyBTZWUgc2V0RG9jdW1lbnQoKVxuXHQvLyBSZW1vdmluZyB0aGUgZnVuY3Rpb24gd3JhcHBlciBjYXVzZXMgYSBcIlBlcm1pc3Npb24gRGVuaWVkXCJcblx0Ly8gZXJyb3IgaW4gSUVcblx0dW5sb2FkSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuXHRcdHNldERvY3VtZW50KCk7XG5cdH0sXG5cblx0ZGlzYWJsZWRBbmNlc3RvciA9IGFkZENvbWJpbmF0b3IoXG5cdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gdHJ1ZSAmJiAoXCJmb3JtXCIgaW4gZWxlbSB8fCBcImxhYmVsXCIgaW4gZWxlbSk7XG5cdFx0fSxcblx0XHR7IGRpcjogXCJwYXJlbnROb2RlXCIsIG5leHQ6IFwibGVnZW5kXCIgfVxuXHQpO1xuXG4vLyBPcHRpbWl6ZSBmb3IgcHVzaC5hcHBseSggXywgTm9kZUxpc3QgKVxudHJ5IHtcblx0cHVzaC5hcHBseShcblx0XHQoYXJyID0gc2xpY2UuY2FsbCggcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMgKSksXG5cdFx0cHJlZmVycmVkRG9jLmNoaWxkTm9kZXNcblx0KTtcblx0Ly8gU3VwcG9ydDogQW5kcm9pZDw0LjBcblx0Ly8gRGV0ZWN0IHNpbGVudGx5IGZhaWxpbmcgcHVzaC5hcHBseVxuXHRhcnJbIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzLmxlbmd0aCBdLm5vZGVUeXBlO1xufSBjYXRjaCAoIGUgKSB7XG5cdHB1c2ggPSB7IGFwcGx5OiBhcnIubGVuZ3RoID9cblxuXHRcdC8vIExldmVyYWdlIHNsaWNlIGlmIHBvc3NpYmxlXG5cdFx0ZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuXHRcdFx0cHVzaF9uYXRpdmUuYXBwbHkoIHRhcmdldCwgc2xpY2UuY2FsbChlbHMpICk7XG5cdFx0fSA6XG5cblx0XHQvLyBTdXBwb3J0OiBJRTw5XG5cdFx0Ly8gT3RoZXJ3aXNlIGFwcGVuZCBkaXJlY3RseVxuXHRcdGZ1bmN0aW9uKCB0YXJnZXQsIGVscyApIHtcblx0XHRcdHZhciBqID0gdGFyZ2V0Lmxlbmd0aCxcblx0XHRcdFx0aSA9IDA7XG5cdFx0XHQvLyBDYW4ndCB0cnVzdCBOb2RlTGlzdC5sZW5ndGhcblx0XHRcdHdoaWxlICggKHRhcmdldFtqKytdID0gZWxzW2krK10pICkge31cblx0XHRcdHRhcmdldC5sZW5ndGggPSBqIC0gMTtcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIFNpenpsZSggc2VsZWN0b3IsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKSB7XG5cdHZhciBtLCBpLCBlbGVtLCBuaWQsIG1hdGNoLCBncm91cHMsIG5ld1NlbGVjdG9yLFxuXHRcdG5ld0NvbnRleHQgPSBjb250ZXh0ICYmIGNvbnRleHQub3duZXJEb2N1bWVudCxcblxuXHRcdC8vIG5vZGVUeXBlIGRlZmF1bHRzIHRvIDksIHNpbmNlIGNvbnRleHQgZGVmYXVsdHMgdG8gZG9jdW1lbnRcblx0XHRub2RlVHlwZSA9IGNvbnRleHQgPyBjb250ZXh0Lm5vZGVUeXBlIDogOTtcblxuXHRyZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuXHQvLyBSZXR1cm4gZWFybHkgZnJvbSBjYWxscyB3aXRoIGludmFsaWQgc2VsZWN0b3Igb3IgY29udGV4dFxuXHRpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiB8fCAhc2VsZWN0b3IgfHxcblx0XHRub2RlVHlwZSAhPT0gMSAmJiBub2RlVHlwZSAhPT0gOSAmJiBub2RlVHlwZSAhPT0gMTEgKSB7XG5cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdC8vIFRyeSB0byBzaG9ydGN1dCBmaW5kIG9wZXJhdGlvbnMgKGFzIG9wcG9zZWQgdG8gZmlsdGVycykgaW4gSFRNTCBkb2N1bWVudHNcblx0aWYgKCAhc2VlZCApIHtcblxuXHRcdGlmICggKCBjb250ZXh0ID8gY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgOiBwcmVmZXJyZWREb2MgKSAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0XHRzZXREb2N1bWVudCggY29udGV4dCApO1xuXHRcdH1cblx0XHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcblxuXHRcdGlmICggZG9jdW1lbnRJc0hUTUwgKSB7XG5cblx0XHRcdC8vIElmIHRoZSBzZWxlY3RvciBpcyBzdWZmaWNpZW50bHkgc2ltcGxlLCB0cnkgdXNpbmcgYSBcImdldCpCeSpcIiBET00gbWV0aG9kXG5cdFx0XHQvLyAoZXhjZXB0aW5nIERvY3VtZW50RnJhZ21lbnQgY29udGV4dCwgd2hlcmUgdGhlIG1ldGhvZHMgZG9uJ3QgZXhpc3QpXG5cdFx0XHRpZiAoIG5vZGVUeXBlICE9PSAxMSAmJiAobWF0Y2ggPSBycXVpY2tFeHByLmV4ZWMoIHNlbGVjdG9yICkpICkge1xuXG5cdFx0XHRcdC8vIElEIHNlbGVjdG9yXG5cdFx0XHRcdGlmICggKG0gPSBtYXRjaFsxXSkgKSB7XG5cblx0XHRcdFx0XHQvLyBEb2N1bWVudCBjb250ZXh0XG5cdFx0XHRcdFx0aWYgKCBub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRcdGlmICggKGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBtICkpICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFLCBPcGVyYSwgV2Via2l0XG5cdFx0XHRcdFx0XHRcdC8vIFRPRE86IGlkZW50aWZ5IHZlcnNpb25zXG5cdFx0XHRcdFx0XHRcdC8vIGdldEVsZW1lbnRCeUlkIGNhbiBtYXRjaCBlbGVtZW50cyBieSBuYW1lIGluc3RlYWQgb2YgSURcblx0XHRcdFx0XHRcdFx0aWYgKCBlbGVtLmlkID09PSBtICkge1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIEVsZW1lbnQgY29udGV4dFxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFLCBPcGVyYSwgV2Via2l0XG5cdFx0XHRcdFx0XHQvLyBUT0RPOiBpZGVudGlmeSB2ZXJzaW9uc1xuXHRcdFx0XHRcdFx0Ly8gZ2V0RWxlbWVudEJ5SWQgY2FuIG1hdGNoIGVsZW1lbnRzIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxuXHRcdFx0XHRcdFx0aWYgKCBuZXdDb250ZXh0ICYmIChlbGVtID0gbmV3Q29udGV4dC5nZXRFbGVtZW50QnlJZCggbSApKSAmJlxuXHRcdFx0XHRcdFx0XHRjb250YWlucyggY29udGV4dCwgZWxlbSApICYmXG5cdFx0XHRcdFx0XHRcdGVsZW0uaWQgPT09IG0gKSB7XG5cblx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBUeXBlIHNlbGVjdG9yXG5cdFx0XHRcdH0gZWxzZSBpZiAoIG1hdGNoWzJdICkge1xuXHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHNlbGVjdG9yICkgKTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblxuXHRcdFx0XHQvLyBDbGFzcyBzZWxlY3RvclxuXHRcdFx0XHR9IGVsc2UgaWYgKCAobSA9IG1hdGNoWzNdKSAmJiBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgJiZcblx0XHRcdFx0XHRjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKSB7XG5cblx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIG0gKSApO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRha2UgYWR2YW50YWdlIG9mIHF1ZXJ5U2VsZWN0b3JBbGxcblx0XHRcdGlmICggc3VwcG9ydC5xc2EgJiZcblx0XHRcdFx0IWNvbXBpbGVyQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXSAmJlxuXHRcdFx0XHQoIXJidWdneVFTQSB8fCAhcmJ1Z2d5UVNBLnRlc3QoIHNlbGVjdG9yICkpICkge1xuXG5cdFx0XHRcdGlmICggbm9kZVR5cGUgIT09IDEgKSB7XG5cdFx0XHRcdFx0bmV3Q29udGV4dCA9IGNvbnRleHQ7XG5cdFx0XHRcdFx0bmV3U2VsZWN0b3IgPSBzZWxlY3RvcjtcblxuXHRcdFx0XHQvLyBxU0EgbG9va3Mgb3V0c2lkZSBFbGVtZW50IGNvbnRleHQsIHdoaWNoIGlzIG5vdCB3aGF0IHdlIHdhbnRcblx0XHRcdFx0Ly8gVGhhbmtzIHRvIEFuZHJldyBEdXBvbnQgZm9yIHRoaXMgd29ya2Fyb3VuZCB0ZWNobmlxdWVcblx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD04XG5cdFx0XHRcdC8vIEV4Y2x1ZGUgb2JqZWN0IGVsZW1lbnRzXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGNvbnRleHQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gXCJvYmplY3RcIiApIHtcblxuXHRcdFx0XHRcdC8vIENhcHR1cmUgdGhlIGNvbnRleHQgSUQsIHNldHRpbmcgaXQgZmlyc3QgaWYgbmVjZXNzYXJ5XG5cdFx0XHRcdFx0aWYgKCAobmlkID0gY29udGV4dC5nZXRBdHRyaWJ1dGUoIFwiaWRcIiApKSApIHtcblx0XHRcdFx0XHRcdG5pZCA9IG5pZC5yZXBsYWNlKCByY3NzZXNjYXBlLCBmY3NzZXNjYXBlICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnRleHQuc2V0QXR0cmlidXRlKCBcImlkXCIsIChuaWQgPSBleHBhbmRvKSApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFByZWZpeCBldmVyeSBzZWxlY3RvciBpbiB0aGUgbGlzdFxuXHRcdFx0XHRcdGdyb3VwcyA9IHRva2VuaXplKCBzZWxlY3RvciApO1xuXHRcdFx0XHRcdGkgPSBncm91cHMubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0Z3JvdXBzW2ldID0gXCIjXCIgKyBuaWQgKyBcIiBcIiArIHRvU2VsZWN0b3IoIGdyb3Vwc1tpXSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRuZXdTZWxlY3RvciA9IGdyb3Vwcy5qb2luKCBcIixcIiApO1xuXG5cdFx0XHRcdFx0Ly8gRXhwYW5kIGNvbnRleHQgZm9yIHNpYmxpbmcgc2VsZWN0b3JzXG5cdFx0XHRcdFx0bmV3Q29udGV4dCA9IHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8XG5cdFx0XHRcdFx0XHRjb250ZXh0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCBuZXdTZWxlY3RvciApIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cyxcblx0XHRcdFx0XHRcdFx0bmV3Q29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCBuZXdTZWxlY3RvciApXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0fSBjYXRjaCAoIHFzYUVycm9yICkge1xuXHRcdFx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdFx0XHRpZiAoIG5pZCA9PT0gZXhwYW5kbyApIHtcblx0XHRcdFx0XHRcdFx0Y29udGV4dC5yZW1vdmVBdHRyaWJ1dGUoIFwiaWRcIiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIEFsbCBvdGhlcnNcblx0cmV0dXJuIHNlbGVjdCggc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGtleS12YWx1ZSBjYWNoZXMgb2YgbGltaXRlZCBzaXplXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oc3RyaW5nLCBvYmplY3QpfSBSZXR1cm5zIHRoZSBPYmplY3QgZGF0YSBhZnRlciBzdG9yaW5nIGl0IG9uIGl0c2VsZiB3aXRoXG4gKlx0cHJvcGVydHkgbmFtZSB0aGUgKHNwYWNlLXN1ZmZpeGVkKSBzdHJpbmcgYW5kIChpZiB0aGUgY2FjaGUgaXMgbGFyZ2VyIHRoYW4gRXhwci5jYWNoZUxlbmd0aClcbiAqXHRkZWxldGluZyB0aGUgb2xkZXN0IGVudHJ5XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNhY2hlKCkge1xuXHR2YXIga2V5cyA9IFtdO1xuXG5cdGZ1bmN0aW9uIGNhY2hlKCBrZXksIHZhbHVlICkge1xuXHRcdC8vIFVzZSAoa2V5ICsgXCIgXCIpIHRvIGF2b2lkIGNvbGxpc2lvbiB3aXRoIG5hdGl2ZSBwcm90b3R5cGUgcHJvcGVydGllcyAoc2VlIElzc3VlICMxNTcpXG5cdFx0aWYgKCBrZXlzLnB1c2goIGtleSArIFwiIFwiICkgPiBFeHByLmNhY2hlTGVuZ3RoICkge1xuXHRcdFx0Ly8gT25seSBrZWVwIHRoZSBtb3N0IHJlY2VudCBlbnRyaWVzXG5cdFx0XHRkZWxldGUgY2FjaGVbIGtleXMuc2hpZnQoKSBdO1xuXHRcdH1cblx0XHRyZXR1cm4gKGNhY2hlWyBrZXkgKyBcIiBcIiBdID0gdmFsdWUpO1xuXHR9XG5cdHJldHVybiBjYWNoZTtcbn1cblxuLyoqXG4gKiBNYXJrIGEgZnVuY3Rpb24gZm9yIHNwZWNpYWwgdXNlIGJ5IFNpenpsZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIG1hcmtcbiAqL1xuZnVuY3Rpb24gbWFya0Z1bmN0aW9uKCBmbiApIHtcblx0Zm5bIGV4cGFuZG8gXSA9IHRydWU7XG5cdHJldHVybiBmbjtcbn1cblxuLyoqXG4gKiBTdXBwb3J0IHRlc3RpbmcgdXNpbmcgYW4gZWxlbWVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gUGFzc2VkIHRoZSBjcmVhdGVkIGVsZW1lbnQgYW5kIHJldHVybnMgYSBib29sZWFuIHJlc3VsdFxuICovXG5mdW5jdGlvbiBhc3NlcnQoIGZuICkge1xuXHR2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XG5cblx0dHJ5IHtcblx0XHRyZXR1cm4gISFmbiggZWwgKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSBmaW5hbGx5IHtcblx0XHQvLyBSZW1vdmUgZnJvbSBpdHMgcGFyZW50IGJ5IGRlZmF1bHRcblx0XHRpZiAoIGVsLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBlbCApO1xuXHRcdH1cblx0XHQvLyByZWxlYXNlIG1lbW9yeSBpbiBJRVxuXHRcdGVsID0gbnVsbDtcblx0fVxufVxuXG4vKipcbiAqIEFkZHMgdGhlIHNhbWUgaGFuZGxlciBmb3IgYWxsIG9mIHRoZSBzcGVjaWZpZWQgYXR0cnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRycyBQaXBlLXNlcGFyYXRlZCBsaXN0IG9mIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgVGhlIG1ldGhvZCB0aGF0IHdpbGwgYmUgYXBwbGllZFxuICovXG5mdW5jdGlvbiBhZGRIYW5kbGUoIGF0dHJzLCBoYW5kbGVyICkge1xuXHR2YXIgYXJyID0gYXR0cnMuc3BsaXQoXCJ8XCIpLFxuXHRcdGkgPSBhcnIubGVuZ3RoO1xuXG5cdHdoaWxlICggaS0tICkge1xuXHRcdEV4cHIuYXR0ckhhbmRsZVsgYXJyW2ldIF0gPSBoYW5kbGVyO1xuXHR9XG59XG5cbi8qKlxuICogQ2hlY2tzIGRvY3VtZW50IG9yZGVyIG9mIHR3byBzaWJsaW5nc1xuICogQHBhcmFtIHtFbGVtZW50fSBhXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgbGVzcyB0aGFuIDAgaWYgYSBwcmVjZWRlcyBiLCBncmVhdGVyIHRoYW4gMCBpZiBhIGZvbGxvd3MgYlxuICovXG5mdW5jdGlvbiBzaWJsaW5nQ2hlY2soIGEsIGIgKSB7XG5cdHZhciBjdXIgPSBiICYmIGEsXG5cdFx0ZGlmZiA9IGN1ciAmJiBhLm5vZGVUeXBlID09PSAxICYmIGIubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdGEuc291cmNlSW5kZXggLSBiLnNvdXJjZUluZGV4O1xuXG5cdC8vIFVzZSBJRSBzb3VyY2VJbmRleCBpZiBhdmFpbGFibGUgb24gYm90aCBub2Rlc1xuXHRpZiAoIGRpZmYgKSB7XG5cdFx0cmV0dXJuIGRpZmY7XG5cdH1cblxuXHQvLyBDaGVjayBpZiBiIGZvbGxvd3MgYVxuXHRpZiAoIGN1ciApIHtcblx0XHR3aGlsZSAoIChjdXIgPSBjdXIubmV4dFNpYmxpbmcpICkge1xuXHRcdFx0aWYgKCBjdXIgPT09IGIgKSB7XG5cdFx0XHRcdHJldHVybiAtMTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYSA/IDEgOiAtMTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGlucHV0IHR5cGVzXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICovXG5mdW5jdGlvbiBjcmVhdGVJbnB1dFBzZXVkbyggdHlwZSApIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSB0eXBlO1xuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgYnV0dG9uc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQnV0dG9uUHNldWRvKCB0eXBlICkge1xuXHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0cmV0dXJuIChuYW1lID09PSBcImlucHV0XCIgfHwgbmFtZSA9PT0gXCJidXR0b25cIikgJiYgZWxlbS50eXBlID09PSB0eXBlO1xuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgOmVuYWJsZWQvOmRpc2FibGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGRpc2FibGVkIHRydWUgZm9yIDpkaXNhYmxlZDsgZmFsc2UgZm9yIDplbmFibGVkXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZURpc2FibGVkUHNldWRvKCBkaXNhYmxlZCApIHtcblxuXHQvLyBLbm93biA6ZGlzYWJsZWQgZmFsc2UgcG9zaXRpdmVzOiBmaWVsZHNldFtkaXNhYmxlZF0gPiBsZWdlbmQ6bnRoLW9mLXR5cGUobisyKSA6Y2FuLWRpc2FibGVcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0Ly8gT25seSBjZXJ0YWluIGVsZW1lbnRzIGNhbiBtYXRjaCA6ZW5hYmxlZCBvciA6ZGlzYWJsZWRcblx0XHQvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zY3JpcHRpbmcuaHRtbCNzZWxlY3Rvci1lbmFibGVkXG5cdFx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc2NyaXB0aW5nLmh0bWwjc2VsZWN0b3ItZGlzYWJsZWRcblx0XHRpZiAoIFwiZm9ybVwiIGluIGVsZW0gKSB7XG5cblx0XHRcdC8vIENoZWNrIGZvciBpbmhlcml0ZWQgZGlzYWJsZWRuZXNzIG9uIHJlbGV2YW50IG5vbi1kaXNhYmxlZCBlbGVtZW50czpcblx0XHRcdC8vICogbGlzdGVkIGZvcm0tYXNzb2NpYXRlZCBlbGVtZW50cyBpbiBhIGRpc2FibGVkIGZpZWxkc2V0XG5cdFx0XHQvLyAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjY2F0ZWdvcnktbGlzdGVkXG5cdFx0XHQvLyAgIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm1zLmh0bWwjY29uY2VwdC1mZS1kaXNhYmxlZFxuXHRcdFx0Ly8gKiBvcHRpb24gZWxlbWVudHMgaW4gYSBkaXNhYmxlZCBvcHRncm91cFxuXHRcdFx0Ly8gICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI2NvbmNlcHQtb3B0aW9uLWRpc2FibGVkXG5cdFx0XHQvLyBBbGwgc3VjaCBlbGVtZW50cyBoYXZlIGEgXCJmb3JtXCIgcHJvcGVydHkuXG5cdFx0XHRpZiAoIGVsZW0ucGFyZW50Tm9kZSAmJiBlbGVtLmRpc2FibGVkID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHQvLyBPcHRpb24gZWxlbWVudHMgZGVmZXIgdG8gYSBwYXJlbnQgb3B0Z3JvdXAgaWYgcHJlc2VudFxuXHRcdFx0XHRpZiAoIFwibGFiZWxcIiBpbiBlbGVtICkge1xuXHRcdFx0XHRcdGlmICggXCJsYWJlbFwiIGluIGVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtLnBhcmVudE5vZGUuZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gZGlzYWJsZWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgNiAtIDExXG5cdFx0XHRcdC8vIFVzZSB0aGUgaXNEaXNhYmxlZCBzaG9ydGN1dCBwcm9wZXJ0eSB0byBjaGVjayBmb3IgZGlzYWJsZWQgZmllbGRzZXQgYW5jZXN0b3JzXG5cdFx0XHRcdHJldHVybiBlbGVtLmlzRGlzYWJsZWQgPT09IGRpc2FibGVkIHx8XG5cblx0XHRcdFx0XHQvLyBXaGVyZSB0aGVyZSBpcyBubyBpc0Rpc2FibGVkLCBjaGVjayBtYW51YWxseVxuXHRcdFx0XHRcdC8qIGpzaGludCAtVzAxOCAqL1xuXHRcdFx0XHRcdGVsZW0uaXNEaXNhYmxlZCAhPT0gIWRpc2FibGVkICYmXG5cdFx0XHRcdFx0XHRkaXNhYmxlZEFuY2VzdG9yKCBlbGVtICkgPT09IGRpc2FibGVkO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gZGlzYWJsZWQ7XG5cblx0XHQvLyBUcnkgdG8gd2lubm93IG91dCBlbGVtZW50cyB0aGF0IGNhbid0IGJlIGRpc2FibGVkIGJlZm9yZSB0cnVzdGluZyB0aGUgZGlzYWJsZWQgcHJvcGVydHkuXG5cdFx0Ly8gU29tZSB2aWN0aW1zIGdldCBjYXVnaHQgaW4gb3VyIG5ldCAobGFiZWwsIGxlZ2VuZCwgbWVudSwgdHJhY2spLCBidXQgaXQgc2hvdWxkbid0XG5cdFx0Ly8gZXZlbiBleGlzdCBvbiB0aGVtLCBsZXQgYWxvbmUgaGF2ZSBhIGJvb2xlYW4gdmFsdWUuXG5cdFx0fSBlbHNlIGlmICggXCJsYWJlbFwiIGluIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gZGlzYWJsZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gUmVtYWluaW5nIGVsZW1lbnRzIGFyZSBuZWl0aGVyIDplbmFibGVkIG5vciA6ZGlzYWJsZWRcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBwb3NpdGlvbmFsc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZm4gKSB7XG5cdHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIGFyZ3VtZW50ICkge1xuXHRcdGFyZ3VtZW50ID0gK2FyZ3VtZW50O1xuXHRcdHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMgKSB7XG5cdFx0XHR2YXIgaixcblx0XHRcdFx0bWF0Y2hJbmRleGVzID0gZm4oIFtdLCBzZWVkLmxlbmd0aCwgYXJndW1lbnQgKSxcblx0XHRcdFx0aSA9IG1hdGNoSW5kZXhlcy5sZW5ndGg7XG5cblx0XHRcdC8vIE1hdGNoIGVsZW1lbnRzIGZvdW5kIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXhlc1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggc2VlZFsgKGogPSBtYXRjaEluZGV4ZXNbaV0pIF0gKSB7XG5cdFx0XHRcdFx0c2VlZFtqXSA9ICEobWF0Y2hlc1tqXSA9IHNlZWRbal0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufVxuXG4vKipcbiAqIENoZWNrcyBhIG5vZGUgZm9yIHZhbGlkaXR5IGFzIGEgU2l6emxlIGNvbnRleHRcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3Q9fSBjb250ZXh0XG4gKiBAcmV0dXJucyB7RWxlbWVudHxPYmplY3R8Qm9vbGVhbn0gVGhlIGlucHV0IG5vZGUgaWYgYWNjZXB0YWJsZSwgb3RoZXJ3aXNlIGEgZmFsc3kgdmFsdWVcbiAqL1xuZnVuY3Rpb24gdGVzdENvbnRleHQoIGNvbnRleHQgKSB7XG5cdHJldHVybiBjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnRleHQ7XG59XG5cbi8vIEV4cG9zZSBzdXBwb3J0IHZhcnMgZm9yIGNvbnZlbmllbmNlXG5zdXBwb3J0ID0gU2l6emxlLnN1cHBvcnQgPSB7fTtcblxuLyoqXG4gKiBEZXRlY3RzIFhNTCBub2Rlc1xuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWxlbSBBbiBlbGVtZW50IG9yIGEgZG9jdW1lbnRcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmZiBlbGVtIGlzIGEgbm9uLUhUTUwgWE1MIG5vZGVcbiAqL1xuaXNYTUwgPSBTaXp6bGUuaXNYTUwgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0Ly8gZG9jdW1lbnRFbGVtZW50IGlzIHZlcmlmaWVkIGZvciBjYXNlcyB3aGVyZSBpdCBkb2Vzbid0IHlldCBleGlzdFxuXHQvLyAoc3VjaCBhcyBsb2FkaW5nIGlmcmFtZXMgaW4gSUUgLSAjNDgzMylcblx0dmFyIGRvY3VtZW50RWxlbWVudCA9IGVsZW0gJiYgKGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtKS5kb2N1bWVudEVsZW1lbnQ7XG5cdHJldHVybiBkb2N1bWVudEVsZW1lbnQgPyBkb2N1bWVudEVsZW1lbnQubm9kZU5hbWUgIT09IFwiSFRNTFwiIDogZmFsc2U7XG59O1xuXG4vKipcbiAqIFNldHMgZG9jdW1lbnQtcmVsYXRlZCB2YXJpYWJsZXMgb25jZSBiYXNlZCBvbiB0aGUgY3VycmVudCBkb2N1bWVudFxuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gW2RvY10gQW4gZWxlbWVudCBvciBkb2N1bWVudCBvYmplY3QgdG8gdXNlIHRvIHNldCB0aGUgZG9jdW1lbnRcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGN1cnJlbnQgZG9jdW1lbnRcbiAqL1xuc2V0RG9jdW1lbnQgPSBTaXp6bGUuc2V0RG9jdW1lbnQgPSBmdW5jdGlvbiggbm9kZSApIHtcblx0dmFyIGhhc0NvbXBhcmUsIHN1YldpbmRvdyxcblx0XHRkb2MgPSBub2RlID8gbm9kZS5vd25lckRvY3VtZW50IHx8IG5vZGUgOiBwcmVmZXJyZWREb2M7XG5cblx0Ly8gUmV0dXJuIGVhcmx5IGlmIGRvYyBpcyBpbnZhbGlkIG9yIGFscmVhZHkgc2VsZWN0ZWRcblx0aWYgKCBkb2MgPT09IGRvY3VtZW50IHx8IGRvYy5ub2RlVHlwZSAhPT0gOSB8fCAhZG9jLmRvY3VtZW50RWxlbWVudCApIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQ7XG5cdH1cblxuXHQvLyBVcGRhdGUgZ2xvYmFsIHZhcmlhYmxlc1xuXHRkb2N1bWVudCA9IGRvYztcblx0ZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblx0ZG9jdW1lbnRJc0hUTUwgPSAhaXNYTUwoIGRvY3VtZW50ICk7XG5cblx0Ly8gU3VwcG9ydDogSUUgOS0xMSwgRWRnZVxuXHQvLyBBY2Nlc3NpbmcgaWZyYW1lIGRvY3VtZW50cyBhZnRlciB1bmxvYWQgdGhyb3dzIFwicGVybWlzc2lvbiBkZW5pZWRcIiBlcnJvcnMgKGpRdWVyeSAjMTM5MzYpXG5cdGlmICggcHJlZmVycmVkRG9jICE9PSBkb2N1bWVudCAmJlxuXHRcdChzdWJXaW5kb3cgPSBkb2N1bWVudC5kZWZhdWx0VmlldykgJiYgc3ViV2luZG93LnRvcCAhPT0gc3ViV2luZG93ICkge1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgMTEsIEVkZ2Vcblx0XHRpZiAoIHN1YldpbmRvdy5hZGRFdmVudExpc3RlbmVyICkge1xuXHRcdFx0c3ViV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIFwidW5sb2FkXCIsIHVubG9hZEhhbmRsZXIsIGZhbHNlICk7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA5IC0gMTAgb25seVxuXHRcdH0gZWxzZSBpZiAoIHN1YldpbmRvdy5hdHRhY2hFdmVudCApIHtcblx0XHRcdHN1YldpbmRvdy5hdHRhY2hFdmVudCggXCJvbnVubG9hZFwiLCB1bmxvYWRIYW5kbGVyICk7XG5cdFx0fVxuXHR9XG5cblx0LyogQXR0cmlidXRlc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gU3VwcG9ydDogSUU8OFxuXHQvLyBWZXJpZnkgdGhhdCBnZXRBdHRyaWJ1dGUgcmVhbGx5IHJldHVybnMgYXR0cmlidXRlcyBhbmQgbm90IHByb3BlcnRpZXNcblx0Ly8gKGV4Y2VwdGluZyBJRTggYm9vbGVhbnMpXG5cdHN1cHBvcnQuYXR0cmlidXRlcyA9IGFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdFx0ZWwuY2xhc3NOYW1lID0gXCJpXCI7XG5cdFx0cmV0dXJuICFlbC5nZXRBdHRyaWJ1dGUoXCJjbGFzc05hbWVcIik7XG5cdH0pO1xuXG5cdC8qIGdldEVsZW1lbnQocylCeSpcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIENoZWNrIGlmIGdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSByZXR1cm5zIG9ubHkgZWxlbWVudHNcblx0c3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA9IGFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdFx0ZWwuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCJcIikgKTtcblx0XHRyZXR1cm4gIWVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKS5sZW5ndGg7XG5cdH0pO1xuXG5cdC8vIFN1cHBvcnQ6IElFPDlcblx0c3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gcm5hdGl2ZS50ZXN0KCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICk7XG5cblx0Ly8gU3VwcG9ydDogSUU8MTBcblx0Ly8gQ2hlY2sgaWYgZ2V0RWxlbWVudEJ5SWQgcmV0dXJucyBlbGVtZW50cyBieSBuYW1lXG5cdC8vIFRoZSBicm9rZW4gZ2V0RWxlbWVudEJ5SWQgbWV0aG9kcyBkb24ndCBwaWNrIHVwIHByb2dyYW1tYXRpY2FsbHktc2V0IG5hbWVzLFxuXHQvLyBzbyB1c2UgYSByb3VuZGFib3V0IGdldEVsZW1lbnRzQnlOYW1lIHRlc3Rcblx0c3VwcG9ydC5nZXRCeUlkID0gYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBlbCApLmlkID0gZXhwYW5kbztcblx0XHRyZXR1cm4gIWRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lIHx8ICFkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSggZXhwYW5kbyApLmxlbmd0aDtcblx0fSk7XG5cblx0Ly8gSUQgZmlsdGVyIGFuZCBmaW5kXG5cdGlmICggc3VwcG9ydC5nZXRCeUlkICkge1xuXHRcdEV4cHIuZmlsdGVyW1wiSURcIl0gPSBmdW5jdGlvbiggaWQgKSB7XG5cdFx0XHR2YXIgYXR0cklkID0gaWQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKFwiaWRcIikgPT09IGF0dHJJZDtcblx0XHRcdH07XG5cdFx0fTtcblx0XHRFeHByLmZpbmRbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCwgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRcdHZhciBlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggaWQgKTtcblx0XHRcdFx0cmV0dXJuIGVsZW0gPyBbIGVsZW0gXSA6IFtdO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0RXhwci5maWx0ZXJbXCJJRFwiXSA9ICBmdW5jdGlvbiggaWQgKSB7XG5cdFx0XHR2YXIgYXR0cklkID0gaWQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIG5vZGUgPSB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGVOb2RlICE9PSBcInVuZGVmaW5lZFwiICYmXG5cdFx0XHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIik7XG5cdFx0XHRcdHJldHVybiBub2RlICYmIG5vZGUudmFsdWUgPT09IGF0dHJJZDtcblx0XHRcdH07XG5cdFx0fTtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDYgLSA3IG9ubHlcblx0XHQvLyBnZXRFbGVtZW50QnlJZCBpcyBub3QgcmVsaWFibGUgYXMgYSBmaW5kIHNob3J0Y3V0XG5cdFx0RXhwci5maW5kW1wiSURcIl0gPSBmdW5jdGlvbiggaWQsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRCeUlkICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50SXNIVE1MICkge1xuXHRcdFx0XHR2YXIgbm9kZSwgaSwgZWxlbXMsXG5cdFx0XHRcdFx0ZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIGlkICk7XG5cblx0XHRcdFx0aWYgKCBlbGVtICkge1xuXG5cdFx0XHRcdFx0Ly8gVmVyaWZ5IHRoZSBpZCBhdHRyaWJ1dGVcblx0XHRcdFx0XHRub2RlID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIik7XG5cdFx0XHRcdFx0aWYgKCBub2RlICYmIG5vZGUudmFsdWUgPT09IGlkICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFsgZWxlbSBdO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIEZhbGwgYmFjayBvbiBnZXRFbGVtZW50c0J5TmFtZVxuXHRcdFx0XHRcdGVsZW1zID0gY29udGV4dC5nZXRFbGVtZW50c0J5TmFtZSggaWQgKTtcblx0XHRcdFx0XHRpID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoIChlbGVtID0gZWxlbXNbaSsrXSkgKSB7XG5cdFx0XHRcdFx0XHRub2RlID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIik7XG5cdFx0XHRcdFx0XHRpZiAoIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gaWQgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBbIGVsZW0gXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdC8vIFRhZ1xuXHRFeHByLmZpbmRbXCJUQUdcIl0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID9cblx0XHRmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApO1xuXG5cdFx0XHQvLyBEb2N1bWVudEZyYWdtZW50IG5vZGVzIGRvbid0IGhhdmUgZ0VCVE5cblx0XHRcdH0gZWxzZSBpZiAoIHN1cHBvcnQucXNhICkge1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCB0YWcgKTtcblx0XHRcdH1cblx0XHR9IDpcblxuXHRcdGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XG5cdFx0XHR2YXIgZWxlbSxcblx0XHRcdFx0dG1wID0gW10sXG5cdFx0XHRcdGkgPSAwLFxuXHRcdFx0XHQvLyBCeSBoYXBweSBjb2luY2lkZW5jZSwgYSAoYnJva2VuKSBnRUJUTiBhcHBlYXJzIG9uIERvY3VtZW50RnJhZ21lbnQgbm9kZXMgdG9vXG5cdFx0XHRcdHJlc3VsdHMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcblxuXHRcdFx0Ly8gRmlsdGVyIG91dCBwb3NzaWJsZSBjb21tZW50c1xuXHRcdFx0aWYgKCB0YWcgPT09IFwiKlwiICkge1xuXHRcdFx0XHR3aGlsZSAoIChlbGVtID0gcmVzdWx0c1tpKytdKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHR0bXAucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0bXA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHR9O1xuXG5cdC8vIENsYXNzXG5cdEV4cHIuZmluZFtcIkNMQVNTXCJdID0gc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmIGZ1bmN0aW9uKCBjbGFzc05hbWUsIGNvbnRleHQgKSB7XG5cdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50SXNIVE1MICkge1xuXHRcdFx0cmV0dXJuIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggY2xhc3NOYW1lICk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qIFFTQS9tYXRjaGVzU2VsZWN0b3Jcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIFFTQSBhbmQgbWF0Y2hlc1NlbGVjdG9yIHN1cHBvcnRcblxuXHQvLyBtYXRjaGVzU2VsZWN0b3IoOmFjdGl2ZSkgcmVwb3J0cyBmYWxzZSB3aGVuIHRydWUgKElFOS9PcGVyYSAxMS41KVxuXHRyYnVnZ3lNYXRjaGVzID0gW107XG5cblx0Ly8gcVNhKDpmb2N1cykgcmVwb3J0cyBmYWxzZSB3aGVuIHRydWUgKENocm9tZSAyMSlcblx0Ly8gV2UgYWxsb3cgdGhpcyBiZWNhdXNlIG9mIGEgYnVnIGluIElFOC85IHRoYXQgdGhyb3dzIGFuIGVycm9yXG5cdC8vIHdoZW5ldmVyIGBkb2N1bWVudC5hY3RpdmVFbGVtZW50YCBpcyBhY2Nlc3NlZCBvbiBhbiBpZnJhbWVcblx0Ly8gU28sIHdlIGFsbG93IDpmb2N1cyB0byBwYXNzIHRocm91Z2ggUVNBIGFsbCB0aGUgdGltZSB0byBhdm9pZCB0aGUgSUUgZXJyb3Jcblx0Ly8gU2VlIGh0dHBzOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMzM3OFxuXHRyYnVnZ3lRU0EgPSBbXTtcblxuXHRpZiAoIChzdXBwb3J0LnFzYSA9IHJuYXRpdmUudGVzdCggZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCApKSApIHtcblx0XHQvLyBCdWlsZCBRU0EgcmVnZXhcblx0XHQvLyBSZWdleCBzdHJhdGVneSBhZG9wdGVkIGZyb20gRGllZ28gUGVyaW5pXG5cdFx0YXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0XHRcdC8vIFNlbGVjdCBpcyBzZXQgdG8gZW1wdHkgc3RyaW5nIG9uIHB1cnBvc2Vcblx0XHRcdC8vIFRoaXMgaXMgdG8gdGVzdCBJRSdzIHRyZWF0bWVudCBvZiBub3QgZXhwbGljaXRseVxuXHRcdFx0Ly8gc2V0dGluZyBhIGJvb2xlYW4gY29udGVudCBhdHRyaWJ1dGUsXG5cdFx0XHQvLyBzaW5jZSBpdHMgcHJlc2VuY2Ugc2hvdWxkIGJlIGVub3VnaFxuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMzU5XG5cdFx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBlbCApLmlubmVySFRNTCA9IFwiPGEgaWQ9J1wiICsgZXhwYW5kbyArIFwiJz48L2E+XCIgK1xuXHRcdFx0XHRcIjxzZWxlY3QgaWQ9J1wiICsgZXhwYW5kbyArIFwiLVxcclxcXFwnIG1zYWxsb3djYXB0dXJlPScnPlwiICtcblx0XHRcdFx0XCI8b3B0aW9uIHNlbGVjdGVkPScnPjwvb3B0aW9uPjwvc2VsZWN0PlwiO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRTgsIE9wZXJhIDExLTEyLjE2XG5cdFx0XHQvLyBOb3RoaW5nIHNob3VsZCBiZSBzZWxlY3RlZCB3aGVuIGVtcHR5IHN0cmluZ3MgZm9sbG93IF49IG9yICQ9IG9yICo9XG5cdFx0XHQvLyBUaGUgdGVzdCBhdHRyaWJ1dGUgbXVzdCBiZSB1bmtub3duIGluIE9wZXJhIGJ1dCBcInNhZmVcIiBmb3IgV2luUlRcblx0XHRcdC8vIGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvaGg0NjUzODguYXNweCNhdHRyaWJ1dGVfc2VjdGlvblxuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKFwiW21zYWxsb3djYXB0dXJlXj0nJ11cIikubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJbKl4kXT1cIiArIHdoaXRlc3BhY2UgKyBcIiooPzonJ3xcXFwiXFxcIilcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRThcblx0XHRcdC8vIEJvb2xlYW4gYXR0cmlidXRlcyBhbmQgXCJ2YWx1ZVwiIGFyZSBub3QgdHJlYXRlZCBjb3JyZWN0bHlcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbc2VsZWN0ZWRdXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooPzp2YWx1ZXxcIiArIGJvb2xlYW5zICsgXCIpXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lPDI5LCBBbmRyb2lkPDQuNCwgU2FmYXJpPDcuMCssIGlPUzw3LjArLCBQaGFudG9tSlM8MS45LjgrXG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKCBcIltpZH49XCIgKyBleHBhbmRvICsgXCItXVwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaChcIn49XCIpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBXZWJraXQvT3BlcmEgLSA6Y2hlY2tlZCBzaG91bGQgcmV0dXJuIHNlbGVjdGVkIG9wdGlvbiBlbGVtZW50c1xuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9SRUMtY3NzMy1zZWxlY3RvcnMtMjAxMTA5MjkvI2NoZWNrZWRcblx0XHRcdC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKFwiOmNoZWNrZWRcIikubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaChcIjpjaGVja2VkXCIpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgOCssIGlPUyA4K1xuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNjg1MVxuXHRcdFx0Ly8gSW4tcGFnZSBgc2VsZWN0b3IjaWQgc2libGluZy1jb21iaW5hdG9yIHNlbGVjdG9yYCBmYWlsc1xuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbCggXCJhI1wiICsgZXhwYW5kbyArIFwiKypcIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCIuIy4rWyt+XVwiKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdFx0XHRlbC5pbm5lckhUTUwgPSBcIjxhIGhyZWY9JycgZGlzYWJsZWQ9J2Rpc2FibGVkJz48L2E+XCIgK1xuXHRcdFx0XHRcIjxzZWxlY3QgZGlzYWJsZWQ9J2Rpc2FibGVkJz48b3B0aW9uLz48L3NlbGVjdD5cIjtcblxuXHRcdFx0Ly8gU3VwcG9ydDogV2luZG93cyA4IE5hdGl2ZSBBcHBzXG5cdFx0XHQvLyBUaGUgdHlwZSBhbmQgbmFtZSBhdHRyaWJ1dGVzIGFyZSByZXN0cmljdGVkIGR1cmluZyAuaW5uZXJIVE1MIGFzc2lnbm1lbnRcblx0XHRcdHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0XHRcdGlucHV0LnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIFwiaGlkZGVuXCIgKTtcblx0XHRcdGVsLmFwcGVuZENoaWxkKCBpbnB1dCApLnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwiRFwiICk7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOFxuXHRcdFx0Ly8gRW5mb3JjZSBjYXNlLXNlbnNpdGl2aXR5IG9mIG5hbWUgYXR0cmlidXRlXG5cdFx0XHRpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbmFtZT1kXVwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIm5hbWVcIiArIHdoaXRlc3BhY2UgKyBcIipbKl4kfCF+XT89XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRkYgMy41IC0gOmVuYWJsZWQvOmRpc2FibGVkIGFuZCBoaWRkZW4gZWxlbWVudHMgKGhpZGRlbiBlbGVtZW50cyBhcmUgc3RpbGwgZW5hYmxlZClcblx0XHRcdC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSBhbmQgd2lsbCBub3Qgc2VlIGxhdGVyIHRlc3RzXG5cdFx0XHRpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCI6ZW5hYmxlZFwiKS5sZW5ndGggIT09IDIgKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIjplbmFibGVkXCIsIFwiOmRpc2FibGVkXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU5LTExK1xuXHRcdFx0Ly8gSUUncyA6ZGlzYWJsZWQgc2VsZWN0b3IgZG9lcyBub3QgcGljayB1cCB0aGUgY2hpbGRyZW4gb2YgZGlzYWJsZWQgZmllbGRzZXRzXG5cdFx0XHRkb2NFbGVtLmFwcGVuZENoaWxkKCBlbCApLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbChcIjpkaXNhYmxlZFwiKS5sZW5ndGggIT09IDIgKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIjplbmFibGVkXCIsIFwiOmRpc2FibGVkXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT3BlcmEgMTAtMTEgZG9lcyBub3QgdGhyb3cgb24gcG9zdC1jb21tYSBpbnZhbGlkIHBzZXVkb3Ncblx0XHRcdGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCIqLDp4XCIpO1xuXHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCIsLio6XCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0aWYgKCAoc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgPSBybmF0aXZlLnRlc3QoIChtYXRjaGVzID0gZG9jRWxlbS5tYXRjaGVzIHx8XG5cdFx0ZG9jRWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ub01hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ubXNNYXRjaGVzU2VsZWN0b3IpICkpICkge1xuXG5cdFx0YXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0XHRcdC8vIENoZWNrIHRvIHNlZSBpZiBpdCdzIHBvc3NpYmxlIHRvIGRvIG1hdGNoZXNTZWxlY3RvclxuXHRcdFx0Ly8gb24gYSBkaXNjb25uZWN0ZWQgbm9kZSAoSUUgOSlcblx0XHRcdHN1cHBvcnQuZGlzY29ubmVjdGVkTWF0Y2ggPSBtYXRjaGVzLmNhbGwoIGVsLCBcIipcIiApO1xuXG5cdFx0XHQvLyBUaGlzIHNob3VsZCBmYWlsIHdpdGggYW4gZXhjZXB0aW9uXG5cdFx0XHQvLyBHZWNrbyBkb2VzIG5vdCBlcnJvciwgcmV0dXJucyBmYWxzZSBpbnN0ZWFkXG5cdFx0XHRtYXRjaGVzLmNhbGwoIGVsLCBcIltzIT0nJ106eFwiICk7XG5cdFx0XHRyYnVnZ3lNYXRjaGVzLnB1c2goIFwiIT1cIiwgcHNldWRvcyApO1xuXHRcdH0pO1xuXHR9XG5cblx0cmJ1Z2d5UVNBID0gcmJ1Z2d5UVNBLmxlbmd0aCAmJiBuZXcgUmVnRXhwKCByYnVnZ3lRU0Euam9pbihcInxcIikgKTtcblx0cmJ1Z2d5TWF0Y2hlcyA9IHJidWdneU1hdGNoZXMubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneU1hdGNoZXMuam9pbihcInxcIikgKTtcblxuXHQvKiBDb250YWluc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cdGhhc0NvbXBhcmUgPSBybmF0aXZlLnRlc3QoIGRvY0VsZW0uY29tcGFyZURvY3VtZW50UG9zaXRpb24gKTtcblxuXHQvLyBFbGVtZW50IGNvbnRhaW5zIGFub3RoZXJcblx0Ly8gUHVycG9zZWZ1bGx5IHNlbGYtZXhjbHVzaXZlXG5cdC8vIEFzIGluLCBhbiBlbGVtZW50IGRvZXMgbm90IGNvbnRhaW4gaXRzZWxmXG5cdGNvbnRhaW5zID0gaGFzQ29tcGFyZSB8fCBybmF0aXZlLnRlc3QoIGRvY0VsZW0uY29udGFpbnMgKSA/XG5cdFx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHR2YXIgYWRvd24gPSBhLm5vZGVUeXBlID09PSA5ID8gYS5kb2N1bWVudEVsZW1lbnQgOiBhLFxuXHRcdFx0XHRidXAgPSBiICYmIGIucGFyZW50Tm9kZTtcblx0XHRcdHJldHVybiBhID09PSBidXAgfHwgISEoIGJ1cCAmJiBidXAubm9kZVR5cGUgPT09IDEgJiYgKFxuXHRcdFx0XHRhZG93bi5jb250YWlucyA/XG5cdFx0XHRcdFx0YWRvd24uY29udGFpbnMoIGJ1cCApIDpcblx0XHRcdFx0XHRhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICYmIGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGJ1cCApICYgMTZcblx0XHRcdCkpO1xuXHRcdH0gOlxuXHRcdGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdFx0aWYgKCBiICkge1xuXHRcdFx0XHR3aGlsZSAoIChiID0gYi5wYXJlbnROb2RlKSApIHtcblx0XHRcdFx0XHRpZiAoIGIgPT09IGEgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdC8qIFNvcnRpbmdcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIERvY3VtZW50IG9yZGVyIHNvcnRpbmdcblx0c29ydE9yZGVyID0gaGFzQ29tcGFyZSA/XG5cdGZ1bmN0aW9uKCBhLCBiICkge1xuXG5cdFx0Ly8gRmxhZyBmb3IgZHVwbGljYXRlIHJlbW92YWxcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0Ly8gU29ydCBvbiBtZXRob2QgZXhpc3RlbmNlIGlmIG9ubHkgb25lIGlucHV0IGhhcyBjb21wYXJlRG9jdW1lbnRQb3NpdGlvblxuXHRcdHZhciBjb21wYXJlID0gIWEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gLSAhYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbjtcblx0XHRpZiAoIGNvbXBhcmUgKSB7XG5cdFx0XHRyZXR1cm4gY29tcGFyZTtcblx0XHR9XG5cblx0XHQvLyBDYWxjdWxhdGUgcG9zaXRpb24gaWYgYm90aCBpbnB1dHMgYmVsb25nIHRvIHRoZSBzYW1lIGRvY3VtZW50XG5cdFx0Y29tcGFyZSA9ICggYS5vd25lckRvY3VtZW50IHx8IGEgKSA9PT0gKCBiLm93bmVyRG9jdW1lbnQgfHwgYiApID9cblx0XHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGIgKSA6XG5cblx0XHRcdC8vIE90aGVyd2lzZSB3ZSBrbm93IHRoZXkgYXJlIGRpc2Nvbm5lY3RlZFxuXHRcdFx0MTtcblxuXHRcdC8vIERpc2Nvbm5lY3RlZCBub2Rlc1xuXHRcdGlmICggY29tcGFyZSAmIDEgfHxcblx0XHRcdCghc3VwcG9ydC5zb3J0RGV0YWNoZWQgJiYgYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYSApID09PSBjb21wYXJlKSApIHtcblxuXHRcdFx0Ly8gQ2hvb3NlIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaXMgcmVsYXRlZCB0byBvdXIgcHJlZmVycmVkIGRvY3VtZW50XG5cdFx0XHRpZiAoIGEgPT09IGRvY3VtZW50IHx8IGEub3duZXJEb2N1bWVudCA9PT0gcHJlZmVycmVkRG9jICYmIGNvbnRhaW5zKHByZWZlcnJlZERvYywgYSkgKSB7XG5cdFx0XHRcdHJldHVybiAtMTtcblx0XHRcdH1cblx0XHRcdGlmICggYiA9PT0gZG9jdW1lbnQgfHwgYi5vd25lckRvY3VtZW50ID09PSBwcmVmZXJyZWREb2MgJiYgY29udGFpbnMocHJlZmVycmVkRG9jLCBiKSApIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1haW50YWluIG9yaWdpbmFsIG9yZGVyXG5cdFx0XHRyZXR1cm4gc29ydElucHV0ID9cblx0XHRcdFx0KCBpbmRleE9mKCBzb3J0SW5wdXQsIGEgKSAtIGluZGV4T2YoIHNvcnRJbnB1dCwgYiApICkgOlxuXHRcdFx0XHQwO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb21wYXJlICYgNCA/IC0xIDogMTtcblx0fSA6XG5cdGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdC8vIEV4aXQgZWFybHkgaWYgdGhlIG5vZGVzIGFyZSBpZGVudGljYWxcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0dmFyIGN1cixcblx0XHRcdGkgPSAwLFxuXHRcdFx0YXVwID0gYS5wYXJlbnROb2RlLFxuXHRcdFx0YnVwID0gYi5wYXJlbnROb2RlLFxuXHRcdFx0YXAgPSBbIGEgXSxcblx0XHRcdGJwID0gWyBiIF07XG5cblx0XHQvLyBQYXJlbnRsZXNzIG5vZGVzIGFyZSBlaXRoZXIgZG9jdW1lbnRzIG9yIGRpc2Nvbm5lY3RlZFxuXHRcdGlmICggIWF1cCB8fCAhYnVwICkge1xuXHRcdFx0cmV0dXJuIGEgPT09IGRvY3VtZW50ID8gLTEgOlxuXHRcdFx0XHRiID09PSBkb2N1bWVudCA/IDEgOlxuXHRcdFx0XHRhdXAgPyAtMSA6XG5cdFx0XHRcdGJ1cCA/IDEgOlxuXHRcdFx0XHRzb3J0SW5wdXQgP1xuXHRcdFx0XHQoIGluZGV4T2YoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZiggc29ydElucHV0LCBiICkgKSA6XG5cdFx0XHRcdDA7XG5cblx0XHQvLyBJZiB0aGUgbm9kZXMgYXJlIHNpYmxpbmdzLCB3ZSBjYW4gZG8gYSBxdWljayBjaGVja1xuXHRcdH0gZWxzZSBpZiAoIGF1cCA9PT0gYnVwICkge1xuXHRcdFx0cmV0dXJuIHNpYmxpbmdDaGVjayggYSwgYiApO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyd2lzZSB3ZSBuZWVkIGZ1bGwgbGlzdHMgb2YgdGhlaXIgYW5jZXN0b3JzIGZvciBjb21wYXJpc29uXG5cdFx0Y3VyID0gYTtcblx0XHR3aGlsZSAoIChjdXIgPSBjdXIucGFyZW50Tm9kZSkgKSB7XG5cdFx0XHRhcC51bnNoaWZ0KCBjdXIgKTtcblx0XHR9XG5cdFx0Y3VyID0gYjtcblx0XHR3aGlsZSAoIChjdXIgPSBjdXIucGFyZW50Tm9kZSkgKSB7XG5cdFx0XHRicC51bnNoaWZ0KCBjdXIgKTtcblx0XHR9XG5cblx0XHQvLyBXYWxrIGRvd24gdGhlIHRyZWUgbG9va2luZyBmb3IgYSBkaXNjcmVwYW5jeVxuXHRcdHdoaWxlICggYXBbaV0gPT09IGJwW2ldICkge1xuXHRcdFx0aSsrO1xuXHRcdH1cblxuXHRcdHJldHVybiBpID9cblx0XHRcdC8vIERvIGEgc2libGluZyBjaGVjayBpZiB0aGUgbm9kZXMgaGF2ZSBhIGNvbW1vbiBhbmNlc3RvclxuXHRcdFx0c2libGluZ0NoZWNrKCBhcFtpXSwgYnBbaV0gKSA6XG5cblx0XHRcdC8vIE90aGVyd2lzZSBub2RlcyBpbiBvdXIgZG9jdW1lbnQgc29ydCBmaXJzdFxuXHRcdFx0YXBbaV0gPT09IHByZWZlcnJlZERvYyA/IC0xIDpcblx0XHRcdGJwW2ldID09PSBwcmVmZXJyZWREb2MgPyAxIDpcblx0XHRcdDA7XG5cdH07XG5cblx0cmV0dXJuIGRvY3VtZW50O1xufTtcblxuU2l6emxlLm1hdGNoZXMgPSBmdW5jdGlvbiggZXhwciwgZWxlbWVudHMgKSB7XG5cdHJldHVybiBTaXp6bGUoIGV4cHIsIG51bGwsIG51bGwsIGVsZW1lbnRzICk7XG59O1xuXG5TaXp6bGUubWF0Y2hlc1NlbGVjdG9yID0gZnVuY3Rpb24oIGVsZW0sIGV4cHIgKSB7XG5cdC8vIFNldCBkb2N1bWVudCB2YXJzIGlmIG5lZWRlZFxuXHRpZiAoICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKSAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0c2V0RG9jdW1lbnQoIGVsZW0gKTtcblx0fVxuXG5cdC8vIE1ha2Ugc3VyZSB0aGF0IGF0dHJpYnV0ZSBzZWxlY3RvcnMgYXJlIHF1b3RlZFxuXHRleHByID0gZXhwci5yZXBsYWNlKCByYXR0cmlidXRlUXVvdGVzLCBcIj0nJDEnXVwiICk7XG5cblx0aWYgKCBzdXBwb3J0Lm1hdGNoZXNTZWxlY3RvciAmJiBkb2N1bWVudElzSFRNTCAmJlxuXHRcdCFjb21waWxlckNhY2hlWyBleHByICsgXCIgXCIgXSAmJlxuXHRcdCggIXJidWdneU1hdGNoZXMgfHwgIXJidWdneU1hdGNoZXMudGVzdCggZXhwciApICkgJiZcblx0XHQoICFyYnVnZ3lRU0EgICAgIHx8ICFyYnVnZ3lRU0EudGVzdCggZXhwciApICkgKSB7XG5cblx0XHR0cnkge1xuXHRcdFx0dmFyIHJldCA9IG1hdGNoZXMuY2FsbCggZWxlbSwgZXhwciApO1xuXG5cdFx0XHQvLyBJRSA5J3MgbWF0Y2hlc1NlbGVjdG9yIHJldHVybnMgZmFsc2Ugb24gZGlzY29ubmVjdGVkIG5vZGVzXG5cdFx0XHRpZiAoIHJldCB8fCBzdXBwb3J0LmRpc2Nvbm5lY3RlZE1hdGNoIHx8XG5cdFx0XHRcdFx0Ly8gQXMgd2VsbCwgZGlzY29ubmVjdGVkIG5vZGVzIGFyZSBzYWlkIHRvIGJlIGluIGEgZG9jdW1lbnRcblx0XHRcdFx0XHQvLyBmcmFnbWVudCBpbiBJRSA5XG5cdFx0XHRcdFx0ZWxlbS5kb2N1bWVudCAmJiBlbGVtLmRvY3VtZW50Lm5vZGVUeXBlICE9PSAxMSApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7fVxuXHR9XG5cblx0cmV0dXJuIFNpenpsZSggZXhwciwgZG9jdW1lbnQsIG51bGwsIFsgZWxlbSBdICkubGVuZ3RoID4gMDtcbn07XG5cblNpenpsZS5jb250YWlucyA9IGZ1bmN0aW9uKCBjb250ZXh0LCBlbGVtICkge1xuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0aWYgKCAoIGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0ICkgIT09IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBjb250ZXh0ICk7XG5cdH1cblx0cmV0dXJuIGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICk7XG59O1xuXG5TaXp6bGUuYXR0ciA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0aWYgKCAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtICkgIT09IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBlbGVtICk7XG5cdH1cblxuXHR2YXIgZm4gPSBFeHByLmF0dHJIYW5kbGVbIG5hbWUudG9Mb3dlckNhc2UoKSBdLFxuXHRcdC8vIERvbid0IGdldCBmb29sZWQgYnkgT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzIChqUXVlcnkgIzEzODA3KVxuXHRcdHZhbCA9IGZuICYmIGhhc093bi5jYWxsKCBFeHByLmF0dHJIYW5kbGUsIG5hbWUudG9Mb3dlckNhc2UoKSApID9cblx0XHRcdGZuKCBlbGVtLCBuYW1lLCAhZG9jdW1lbnRJc0hUTUwgKSA6XG5cdFx0XHR1bmRlZmluZWQ7XG5cblx0cmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID9cblx0XHR2YWwgOlxuXHRcdHN1cHBvcnQuYXR0cmlidXRlcyB8fCAhZG9jdW1lbnRJc0hUTUwgP1xuXHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKSA6XG5cdFx0XHQodmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpKSAmJiB2YWwuc3BlY2lmaWVkID9cblx0XHRcdFx0dmFsLnZhbHVlIDpcblx0XHRcdFx0bnVsbDtcbn07XG5cblNpenpsZS5lc2NhcGUgPSBmdW5jdGlvbiggc2VsICkge1xuXHRyZXR1cm4gKHNlbCArIFwiXCIpLnJlcGxhY2UoIHJjc3Nlc2NhcGUsIGZjc3Nlc2NhcGUgKTtcbn07XG5cblNpenpsZS5lcnJvciA9IGZ1bmN0aW9uKCBtc2cgKSB7XG5cdHRocm93IG5ldyBFcnJvciggXCJTeW50YXggZXJyb3IsIHVucmVjb2duaXplZCBleHByZXNzaW9uOiBcIiArIG1zZyApO1xufTtcblxuLyoqXG4gKiBEb2N1bWVudCBzb3J0aW5nIGFuZCByZW1vdmluZyBkdXBsaWNhdGVzXG4gKiBAcGFyYW0ge0FycmF5TGlrZX0gcmVzdWx0c1xuICovXG5TaXp6bGUudW5pcXVlU29ydCA9IGZ1bmN0aW9uKCByZXN1bHRzICkge1xuXHR2YXIgZWxlbSxcblx0XHRkdXBsaWNhdGVzID0gW10sXG5cdFx0aiA9IDAsXG5cdFx0aSA9IDA7XG5cblx0Ly8gVW5sZXNzIHdlICprbm93KiB3ZSBjYW4gZGV0ZWN0IGR1cGxpY2F0ZXMsIGFzc3VtZSB0aGVpciBwcmVzZW5jZVxuXHRoYXNEdXBsaWNhdGUgPSAhc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzO1xuXHRzb3J0SW5wdXQgPSAhc3VwcG9ydC5zb3J0U3RhYmxlICYmIHJlc3VsdHMuc2xpY2UoIDAgKTtcblx0cmVzdWx0cy5zb3J0KCBzb3J0T3JkZXIgKTtcblxuXHRpZiAoIGhhc0R1cGxpY2F0ZSApIHtcblx0XHR3aGlsZSAoIChlbGVtID0gcmVzdWx0c1tpKytdKSApIHtcblx0XHRcdGlmICggZWxlbSA9PT0gcmVzdWx0c1sgaSBdICkge1xuXHRcdFx0XHRqID0gZHVwbGljYXRlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0cmVzdWx0cy5zcGxpY2UoIGR1cGxpY2F0ZXNbIGogXSwgMSApO1xuXHRcdH1cblx0fVxuXG5cdC8vIENsZWFyIGlucHV0IGFmdGVyIHNvcnRpbmcgdG8gcmVsZWFzZSBvYmplY3RzXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L3NpenpsZS9wdWxsLzIyNVxuXHRzb3J0SW5wdXQgPSBudWxsO1xuXG5cdHJldHVybiByZXN1bHRzO1xufTtcblxuLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIGZvciByZXRyaWV2aW5nIHRoZSB0ZXh0IHZhbHVlIG9mIGFuIGFycmF5IG9mIERPTSBub2Rlc1xuICogQHBhcmFtIHtBcnJheXxFbGVtZW50fSBlbGVtXG4gKi9cbmdldFRleHQgPSBTaXp6bGUuZ2V0VGV4dCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHR2YXIgbm9kZSxcblx0XHRyZXQgPSBcIlwiLFxuXHRcdGkgPSAwLFxuXHRcdG5vZGVUeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRpZiAoICFub2RlVHlwZSApIHtcblx0XHQvLyBJZiBubyBub2RlVHlwZSwgdGhpcyBpcyBleHBlY3RlZCB0byBiZSBhbiBhcnJheVxuXHRcdHdoaWxlICggKG5vZGUgPSBlbGVtW2krK10pICkge1xuXHRcdFx0Ly8gRG8gbm90IHRyYXZlcnNlIGNvbW1lbnQgbm9kZXNcblx0XHRcdHJldCArPSBnZXRUZXh0KCBub2RlICk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMSB8fCBub2RlVHlwZSA9PT0gOSB8fCBub2RlVHlwZSA9PT0gMTEgKSB7XG5cdFx0Ly8gVXNlIHRleHRDb250ZW50IGZvciBlbGVtZW50c1xuXHRcdC8vIGlubmVyVGV4dCB1c2FnZSByZW1vdmVkIGZvciBjb25zaXN0ZW5jeSBvZiBuZXcgbGluZXMgKGpRdWVyeSAjMTExNTMpXG5cdFx0aWYgKCB0eXBlb2YgZWxlbS50ZXh0Q29udGVudCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBlbGVtLnRleHRDb250ZW50O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBUcmF2ZXJzZSBpdHMgY2hpbGRyZW5cblx0XHRcdGZvciAoIGVsZW0gPSBlbGVtLmZpcnN0Q2hpbGQ7IGVsZW07IGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nICkge1xuXHRcdFx0XHRyZXQgKz0gZ2V0VGV4dCggZWxlbSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDMgfHwgbm9kZVR5cGUgPT09IDQgKSB7XG5cdFx0cmV0dXJuIGVsZW0ubm9kZVZhbHVlO1xuXHR9XG5cdC8vIERvIG5vdCBpbmNsdWRlIGNvbW1lbnQgb3IgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiBub2Rlc1xuXG5cdHJldHVybiByZXQ7XG59O1xuXG5FeHByID0gU2l6emxlLnNlbGVjdG9ycyA9IHtcblxuXHQvLyBDYW4gYmUgYWRqdXN0ZWQgYnkgdGhlIHVzZXJcblx0Y2FjaGVMZW5ndGg6IDUwLFxuXG5cdGNyZWF0ZVBzZXVkbzogbWFya0Z1bmN0aW9uLFxuXG5cdG1hdGNoOiBtYXRjaEV4cHIsXG5cblx0YXR0ckhhbmRsZToge30sXG5cblx0ZmluZDoge30sXG5cblx0cmVsYXRpdmU6IHtcblx0XHRcIj5cIjogeyBkaXI6IFwicGFyZW50Tm9kZVwiLCBmaXJzdDogdHJ1ZSB9LFxuXHRcdFwiIFwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIgfSxcblx0XHRcIitcIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIsIGZpcnN0OiB0cnVlIH0sXG5cdFx0XCJ+XCI6IHsgZGlyOiBcInByZXZpb3VzU2libGluZ1wiIH1cblx0fSxcblxuXHRwcmVGaWx0ZXI6IHtcblx0XHRcIkFUVFJcIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0bWF0Y2hbMV0gPSBtYXRjaFsxXS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXG5cdFx0XHQvLyBNb3ZlIHRoZSBnaXZlbiB2YWx1ZSB0byBtYXRjaFszXSB3aGV0aGVyIHF1b3RlZCBvciB1bnF1b3RlZFxuXHRcdFx0bWF0Y2hbM10gPSAoIG1hdGNoWzNdIHx8IG1hdGNoWzRdIHx8IG1hdGNoWzVdIHx8IFwiXCIgKS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXG5cdFx0XHRpZiAoIG1hdGNoWzJdID09PSBcIn49XCIgKSB7XG5cdFx0XHRcdG1hdGNoWzNdID0gXCIgXCIgKyBtYXRjaFszXSArIFwiIFwiO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWF0Y2guc2xpY2UoIDAsIDQgKTtcblx0XHR9LFxuXG5cdFx0XCJDSElMRFwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cdFx0XHQvKiBtYXRjaGVzIGZyb20gbWF0Y2hFeHByW1wiQ0hJTERcIl1cblx0XHRcdFx0MSB0eXBlIChvbmx5fG50aHwuLi4pXG5cdFx0XHRcdDIgd2hhdCAoY2hpbGR8b2YtdHlwZSlcblx0XHRcdFx0MyBhcmd1bWVudCAoZXZlbnxvZGR8XFxkKnxcXGQqbihbKy1dXFxkKyk/fC4uLilcblx0XHRcdFx0NCB4bi1jb21wb25lbnQgb2YgeG4reSBhcmd1bWVudCAoWystXT9cXGQqbnwpXG5cdFx0XHRcdDUgc2lnbiBvZiB4bi1jb21wb25lbnRcblx0XHRcdFx0NiB4IG9mIHhuLWNvbXBvbmVudFxuXHRcdFx0XHQ3IHNpZ24gb2YgeS1jb21wb25lbnRcblx0XHRcdFx0OCB5IG9mIHktY29tcG9uZW50XG5cdFx0XHQqL1xuXHRcdFx0bWF0Y2hbMV0gPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHRpZiAoIG1hdGNoWzFdLnNsaWNlKCAwLCAzICkgPT09IFwibnRoXCIgKSB7XG5cdFx0XHRcdC8vIG50aC0qIHJlcXVpcmVzIGFyZ3VtZW50XG5cdFx0XHRcdGlmICggIW1hdGNoWzNdICkge1xuXHRcdFx0XHRcdFNpenpsZS5lcnJvciggbWF0Y2hbMF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIG51bWVyaWMgeCBhbmQgeSBwYXJhbWV0ZXJzIGZvciBFeHByLmZpbHRlci5DSElMRFxuXHRcdFx0XHQvLyByZW1lbWJlciB0aGF0IGZhbHNlL3RydWUgY2FzdCByZXNwZWN0aXZlbHkgdG8gMC8xXG5cdFx0XHRcdG1hdGNoWzRdID0gKyggbWF0Y2hbNF0gPyBtYXRjaFs1XSArIChtYXRjaFs2XSB8fCAxKSA6IDIgKiAoIG1hdGNoWzNdID09PSBcImV2ZW5cIiB8fCBtYXRjaFszXSA9PT0gXCJvZGRcIiApICk7XG5cdFx0XHRcdG1hdGNoWzVdID0gKyggKCBtYXRjaFs3XSArIG1hdGNoWzhdICkgfHwgbWF0Y2hbM10gPT09IFwib2RkXCIgKTtcblxuXHRcdFx0Ly8gb3RoZXIgdHlwZXMgcHJvaGliaXQgYXJndW1lbnRzXG5cdFx0XHR9IGVsc2UgaWYgKCBtYXRjaFszXSApIHtcblx0XHRcdFx0U2l6emxlLmVycm9yKCBtYXRjaFswXSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0fSxcblxuXHRcdFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblx0XHRcdHZhciBleGNlc3MsXG5cdFx0XHRcdHVucXVvdGVkID0gIW1hdGNoWzZdICYmIG1hdGNoWzJdO1xuXG5cdFx0XHRpZiAoIG1hdGNoRXhwcltcIkNISUxEXCJdLnRlc3QoIG1hdGNoWzBdICkgKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBY2NlcHQgcXVvdGVkIGFyZ3VtZW50cyBhcy1pc1xuXHRcdFx0aWYgKCBtYXRjaFszXSApIHtcblx0XHRcdFx0bWF0Y2hbMl0gPSBtYXRjaFs0XSB8fCBtYXRjaFs1XSB8fCBcIlwiO1xuXG5cdFx0XHQvLyBTdHJpcCBleGNlc3MgY2hhcmFjdGVycyBmcm9tIHVucXVvdGVkIGFyZ3VtZW50c1xuXHRcdFx0fSBlbHNlIGlmICggdW5xdW90ZWQgJiYgcnBzZXVkby50ZXN0KCB1bnF1b3RlZCApICYmXG5cdFx0XHRcdC8vIEdldCBleGNlc3MgZnJvbSB0b2tlbml6ZSAocmVjdXJzaXZlbHkpXG5cdFx0XHRcdChleGNlc3MgPSB0b2tlbml6ZSggdW5xdW90ZWQsIHRydWUgKSkgJiZcblx0XHRcdFx0Ly8gYWR2YW5jZSB0byB0aGUgbmV4dCBjbG9zaW5nIHBhcmVudGhlc2lzXG5cdFx0XHRcdChleGNlc3MgPSB1bnF1b3RlZC5pbmRleE9mKCBcIilcIiwgdW5xdW90ZWQubGVuZ3RoIC0gZXhjZXNzICkgLSB1bnF1b3RlZC5sZW5ndGgpICkge1xuXG5cdFx0XHRcdC8vIGV4Y2VzcyBpcyBhIG5lZ2F0aXZlIGluZGV4XG5cdFx0XHRcdG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoIDAsIGV4Y2VzcyApO1xuXHRcdFx0XHRtYXRjaFsyXSA9IHVucXVvdGVkLnNsaWNlKCAwLCBleGNlc3MgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0dXJuIG9ubHkgY2FwdHVyZXMgbmVlZGVkIGJ5IHRoZSBwc2V1ZG8gZmlsdGVyIG1ldGhvZCAodHlwZSBhbmQgYXJndW1lbnQpXG5cdFx0XHRyZXR1cm4gbWF0Y2guc2xpY2UoIDAsIDMgKTtcblx0XHR9XG5cdH0sXG5cblx0ZmlsdGVyOiB7XG5cblx0XHRcIlRBR1wiOiBmdW5jdGlvbiggbm9kZU5hbWVTZWxlY3RvciApIHtcblx0XHRcdHZhciBub2RlTmFtZSA9IG5vZGVOYW1lU2VsZWN0b3IucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIG5vZGVOYW1lU2VsZWN0b3IgPT09IFwiKlwiID9cblx0XHRcdFx0ZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9IDpcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBub2RlTmFtZTtcblx0XHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJDTEFTU1wiOiBmdW5jdGlvbiggY2xhc3NOYW1lICkge1xuXHRcdFx0dmFyIHBhdHRlcm4gPSBjbGFzc0NhY2hlWyBjbGFzc05hbWUgKyBcIiBcIiBdO1xuXG5cdFx0XHRyZXR1cm4gcGF0dGVybiB8fFxuXHRcdFx0XHQocGF0dGVybiA9IG5ldyBSZWdFeHAoIFwiKF58XCIgKyB3aGl0ZXNwYWNlICsgXCIpXCIgKyBjbGFzc05hbWUgKyBcIihcIiArIHdoaXRlc3BhY2UgKyBcInwkKVwiICkpICYmXG5cdFx0XHRcdGNsYXNzQ2FjaGUoIGNsYXNzTmFtZSwgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHBhdHRlcm4udGVzdCggdHlwZW9mIGVsZW0uY2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIGVsZW0uY2xhc3NOYW1lIHx8IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBlbGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIgKTtcblx0XHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdFwiQVRUUlwiOiBmdW5jdGlvbiggbmFtZSwgb3BlcmF0b3IsIGNoZWNrICkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gU2l6emxlLmF0dHIoIGVsZW0sIG5hbWUgKTtcblxuXHRcdFx0XHRpZiAoIHJlc3VsdCA9PSBudWxsICkge1xuXHRcdFx0XHRcdHJldHVybiBvcGVyYXRvciA9PT0gXCIhPVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggIW9wZXJhdG9yICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVzdWx0ICs9IFwiXCI7XG5cblx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yID09PSBcIj1cIiA/IHJlc3VsdCA9PT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIiE9XCIgPyByZXN1bHQgIT09IGNoZWNrIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJePVwiID8gY2hlY2sgJiYgcmVzdWx0LmluZGV4T2YoIGNoZWNrICkgPT09IDAgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIio9XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA+IC0xIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCIkPVwiID8gY2hlY2sgJiYgcmVzdWx0LnNsaWNlKCAtY2hlY2subGVuZ3RoICkgPT09IGNoZWNrIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJ+PVwiID8gKCBcIiBcIiArIHJlc3VsdC5yZXBsYWNlKCByd2hpdGVzcGFjZSwgXCIgXCIgKSArIFwiIFwiICkuaW5kZXhPZiggY2hlY2sgKSA+IC0xIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJ8PVwiID8gcmVzdWx0ID09PSBjaGVjayB8fCByZXN1bHQuc2xpY2UoIDAsIGNoZWNrLmxlbmd0aCArIDEgKSA9PT0gY2hlY2sgKyBcIi1cIiA6XG5cdFx0XHRcdFx0ZmFsc2U7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRcIkNISUxEXCI6IGZ1bmN0aW9uKCB0eXBlLCB3aGF0LCBhcmd1bWVudCwgZmlyc3QsIGxhc3QgKSB7XG5cdFx0XHR2YXIgc2ltcGxlID0gdHlwZS5zbGljZSggMCwgMyApICE9PSBcIm50aFwiLFxuXHRcdFx0XHRmb3J3YXJkID0gdHlwZS5zbGljZSggLTQgKSAhPT0gXCJsYXN0XCIsXG5cdFx0XHRcdG9mVHlwZSA9IHdoYXQgPT09IFwib2YtdHlwZVwiO1xuXG5cdFx0XHRyZXR1cm4gZmlyc3QgPT09IDEgJiYgbGFzdCA9PT0gMCA/XG5cblx0XHRcdFx0Ly8gU2hvcnRjdXQgZm9yIDpudGgtKihuKVxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gISFlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRcdH0gOlxuXG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0dmFyIGNhY2hlLCB1bmlxdWVDYWNoZSwgb3V0ZXJDYWNoZSwgbm9kZSwgbm9kZUluZGV4LCBzdGFydCxcblx0XHRcdFx0XHRcdGRpciA9IHNpbXBsZSAhPT0gZm9yd2FyZCA/IFwibmV4dFNpYmxpbmdcIiA6IFwicHJldmlvdXNTaWJsaW5nXCIsXG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGUsXG5cdFx0XHRcdFx0XHRuYW1lID0gb2ZUeXBlICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRcdHVzZUNhY2hlID0gIXhtbCAmJiAhb2ZUeXBlLFxuXHRcdFx0XHRcdFx0ZGlmZiA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKCBwYXJlbnQgKSB7XG5cblx0XHRcdFx0XHRcdC8vIDooZmlyc3R8bGFzdHxvbmx5KS0oY2hpbGR8b2YtdHlwZSlcblx0XHRcdFx0XHRcdGlmICggc2ltcGxlICkge1xuXHRcdFx0XHRcdFx0XHR3aGlsZSAoIGRpciApIHtcblx0XHRcdFx0XHRcdFx0XHRub2RlID0gZWxlbTtcblx0XHRcdFx0XHRcdFx0XHR3aGlsZSAoIChub2RlID0gbm9kZVsgZGlyIF0pICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBvZlR5cGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID09PSAxICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0Ly8gUmV2ZXJzZSBkaXJlY3Rpb24gZm9yIDpvbmx5LSogKGlmIHdlIGhhdmVuJ3QgeWV0IGRvbmUgc28pXG5cdFx0XHRcdFx0XHRcdFx0c3RhcnQgPSBkaXIgPSB0eXBlID09PSBcIm9ubHlcIiAmJiAhc3RhcnQgJiYgXCJuZXh0U2libGluZ1wiO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzdGFydCA9IFsgZm9yd2FyZCA/IHBhcmVudC5maXJzdENoaWxkIDogcGFyZW50Lmxhc3RDaGlsZCBdO1xuXG5cdFx0XHRcdFx0XHQvLyBub24teG1sIDpudGgtY2hpbGQoLi4uKSBzdG9yZXMgY2FjaGUgZGF0YSBvbiBgcGFyZW50YFxuXHRcdFx0XHRcdFx0aWYgKCBmb3J3YXJkICYmIHVzZUNhY2hlICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFNlZWsgYGVsZW1gIGZyb20gYSBwcmV2aW91c2x5LWNhY2hlZCBpbmRleFxuXG5cdFx0XHRcdFx0XHRcdC8vIC4uLmluIGEgZ3ppcC1mcmllbmRseSB3YXlcblx0XHRcdFx0XHRcdFx0bm9kZSA9IHBhcmVudDtcblx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fCAobm9kZVsgZXhwYW5kbyBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0KG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHRjYWNoZSA9IHVuaXF1ZUNhY2hlWyB0eXBlIF0gfHwgW107XG5cdFx0XHRcdFx0XHRcdG5vZGVJbmRleCA9IGNhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbIDEgXTtcblx0XHRcdFx0XHRcdFx0ZGlmZiA9IG5vZGVJbmRleCAmJiBjYWNoZVsgMiBdO1xuXHRcdFx0XHRcdFx0XHRub2RlID0gbm9kZUluZGV4ICYmIHBhcmVudC5jaGlsZE5vZGVzWyBub2RlSW5kZXggXTtcblxuXHRcdFx0XHRcdFx0XHR3aGlsZSAoIChub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlWyBkaXIgXSB8fFxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gRmFsbGJhY2sgdG8gc2Vla2luZyBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcblx0XHRcdFx0XHRcdFx0XHQoZGlmZiA9IG5vZGVJbmRleCA9IDApIHx8IHN0YXJ0LnBvcCgpKSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIFdoZW4gZm91bmQsIGNhY2hlIGluZGV4ZXMgb24gYHBhcmVudGAgYW5kIGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBub2RlLm5vZGVUeXBlID09PSAxICYmICsrZGlmZiAmJiBub2RlID09PSBlbGVtICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIHR5cGUgXSA9IFsgZGlycnVucywgbm9kZUluZGV4LCBkaWZmIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gVXNlIHByZXZpb3VzbHktY2FjaGVkIGVsZW1lbnQgaW5kZXggaWYgYXZhaWxhYmxlXG5cdFx0XHRcdFx0XHRcdGlmICggdXNlQ2FjaGUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gLi4uaW4gYSBnemlwLWZyaWVuZGx5IHdheVxuXHRcdFx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtO1xuXHRcdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBub2RlWyBleHBhbmRvIF0gfHwgKG5vZGVbIGV4cGFuZG8gXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0KG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHRcdGNhY2hlID0gdW5pcXVlQ2FjaGVbIHR5cGUgXSB8fCBbXTtcblx0XHRcdFx0XHRcdFx0XHRub2RlSW5kZXggPSBjYWNoZVsgMCBdID09PSBkaXJydW5zICYmIGNhY2hlWyAxIF07XG5cdFx0XHRcdFx0XHRcdFx0ZGlmZiA9IG5vZGVJbmRleDtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdC8vIHhtbCA6bnRoLWNoaWxkKC4uLilcblx0XHRcdFx0XHRcdFx0Ly8gb3IgOm50aC1sYXN0LWNoaWxkKC4uLikgb3IgOm50aCgtbGFzdCk/LW9mLXR5cGUoLi4uKVxuXHRcdFx0XHRcdFx0XHRpZiAoIGRpZmYgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIFVzZSB0aGUgc2FtZSBsb29wIGFzIGFib3ZlIHRvIHNlZWsgYGVsZW1gIGZyb20gdGhlIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdChkaWZmID0gbm9kZUluZGV4ID0gMCkgfHwgc3RhcnQucG9wKCkpICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoICggb2ZUeXBlID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9PT0gMSApICYmXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCsrZGlmZiApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBDYWNoZSB0aGUgaW5kZXggb2YgZWFjaCBlbmNvdW50ZXJlZCBlbGVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggdXNlQ2FjaGUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fCAobm9kZVsgZXhwYW5kbyBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQob3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIHR5cGUgXSA9IFsgZGlycnVucywgZGlmZiBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBub2RlID09PSBlbGVtICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEluY29ycG9yYXRlIHRoZSBvZmZzZXQsIHRoZW4gY2hlY2sgYWdhaW5zdCBjeWNsZSBzaXplXG5cdFx0XHRcdFx0XHRkaWZmIC09IGxhc3Q7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZGlmZiA9PT0gZmlyc3QgfHwgKCBkaWZmICUgZmlyc3QgPT09IDAgJiYgZGlmZiAvIGZpcnN0ID49IDAgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBwc2V1ZG8sIGFyZ3VtZW50ICkge1xuXHRcdFx0Ly8gcHNldWRvLWNsYXNzIG5hbWVzIGFyZSBjYXNlLWluc2Vuc2l0aXZlXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI3BzZXVkby1jbGFzc2VzXG5cdFx0XHQvLyBQcmlvcml0aXplIGJ5IGNhc2Ugc2Vuc2l0aXZpdHkgaW4gY2FzZSBjdXN0b20gcHNldWRvcyBhcmUgYWRkZWQgd2l0aCB1cHBlcmNhc2UgbGV0dGVyc1xuXHRcdFx0Ly8gUmVtZW1iZXIgdGhhdCBzZXRGaWx0ZXJzIGluaGVyaXRzIGZyb20gcHNldWRvc1xuXHRcdFx0dmFyIGFyZ3MsXG5cdFx0XHRcdGZuID0gRXhwci5wc2V1ZG9zWyBwc2V1ZG8gXSB8fCBFeHByLnNldEZpbHRlcnNbIHBzZXVkby50b0xvd2VyQ2FzZSgpIF0gfHxcblx0XHRcdFx0XHRTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgcHNldWRvOiBcIiArIHBzZXVkbyApO1xuXG5cdFx0XHQvLyBUaGUgdXNlciBtYXkgdXNlIGNyZWF0ZVBzZXVkbyB0byBpbmRpY2F0ZSB0aGF0XG5cdFx0XHQvLyBhcmd1bWVudHMgYXJlIG5lZWRlZCB0byBjcmVhdGUgdGhlIGZpbHRlciBmdW5jdGlvblxuXHRcdFx0Ly8ganVzdCBhcyBTaXp6bGUgZG9lc1xuXHRcdFx0aWYgKCBmblsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHRyZXR1cm4gZm4oIGFyZ3VtZW50ICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEJ1dCBtYWludGFpbiBzdXBwb3J0IGZvciBvbGQgc2lnbmF0dXJlc1xuXHRcdFx0aWYgKCBmbi5sZW5ndGggPiAxICkge1xuXHRcdFx0XHRhcmdzID0gWyBwc2V1ZG8sIHBzZXVkbywgXCJcIiwgYXJndW1lbnQgXTtcblx0XHRcdFx0cmV0dXJuIEV4cHIuc2V0RmlsdGVycy5oYXNPd25Qcm9wZXJ0eSggcHNldWRvLnRvTG93ZXJDYXNlKCkgKSA/XG5cdFx0XHRcdFx0bWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuXHRcdFx0XHRcdFx0dmFyIGlkeCxcblx0XHRcdFx0XHRcdFx0bWF0Y2hlZCA9IGZuKCBzZWVkLCBhcmd1bWVudCApLFxuXHRcdFx0XHRcdFx0XHRpID0gbWF0Y2hlZC5sZW5ndGg7XG5cdFx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdFx0aWR4ID0gaW5kZXhPZiggc2VlZCwgbWF0Y2hlZFtpXSApO1xuXHRcdFx0XHRcdFx0XHRzZWVkWyBpZHggXSA9ICEoIG1hdGNoZXNbIGlkeCBdID0gbWF0Y2hlZFtpXSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pIDpcblx0XHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbiggZWxlbSwgMCwgYXJncyApO1xuXHRcdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmbjtcblx0XHR9XG5cdH0sXG5cblx0cHNldWRvczoge1xuXHRcdC8vIFBvdGVudGlhbGx5IGNvbXBsZXggcHNldWRvc1xuXHRcdFwibm90XCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0XHQvLyBUcmltIHRoZSBzZWxlY3RvciBwYXNzZWQgdG8gY29tcGlsZVxuXHRcdFx0Ly8gdG8gYXZvaWQgdHJlYXRpbmcgbGVhZGluZyBhbmQgdHJhaWxpbmdcblx0XHRcdC8vIHNwYWNlcyBhcyBjb21iaW5hdG9yc1xuXHRcdFx0dmFyIGlucHV0ID0gW10sXG5cdFx0XHRcdHJlc3VsdHMgPSBbXSxcblx0XHRcdFx0bWF0Y2hlciA9IGNvbXBpbGUoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSApO1xuXG5cdFx0XHRyZXR1cm4gbWF0Y2hlclsgZXhwYW5kbyBdID9cblx0XHRcdFx0bWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0dmFyIGVsZW0sXG5cdFx0XHRcdFx0XHR1bm1hdGNoZWQgPSBtYXRjaGVyKCBzZWVkLCBudWxsLCB4bWwsIFtdICksXG5cdFx0XHRcdFx0XHRpID0gc2VlZC5sZW5ndGg7XG5cblx0XHRcdFx0XHQvLyBNYXRjaCBlbGVtZW50cyB1bm1hdGNoZWQgYnkgYG1hdGNoZXJgXG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRpZiAoIChlbGVtID0gdW5tYXRjaGVkW2ldKSApIHtcblx0XHRcdFx0XHRcdFx0c2VlZFtpXSA9ICEobWF0Y2hlc1tpXSA9IGVsZW0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkgOlxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0XHRcdGlucHV0WzBdID0gZWxlbTtcblx0XHRcdFx0XHRtYXRjaGVyKCBpbnB1dCwgbnVsbCwgeG1sLCByZXN1bHRzICk7XG5cdFx0XHRcdFx0Ly8gRG9uJ3Qga2VlcCB0aGUgZWxlbWVudCAoaXNzdWUgIzI5OSlcblx0XHRcdFx0XHRpbnB1dFswXSA9IG51bGw7XG5cdFx0XHRcdFx0cmV0dXJuICFyZXN1bHRzLnBvcCgpO1xuXHRcdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0XCJoYXNcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIFNpenpsZSggc2VsZWN0b3IsIGVsZW0gKS5sZW5ndGggPiAwO1xuXHRcdFx0fTtcblx0XHR9KSxcblxuXHRcdFwiY29udGFpbnNcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuICggZWxlbS50ZXh0Q29udGVudCB8fCBlbGVtLmlubmVyVGV4dCB8fCBnZXRUZXh0KCBlbGVtICkgKS5pbmRleE9mKCB0ZXh0ICkgPiAtMTtcblx0XHRcdH07XG5cdFx0fSksXG5cblx0XHQvLyBcIldoZXRoZXIgYW4gZWxlbWVudCBpcyByZXByZXNlbnRlZCBieSBhIDpsYW5nKCkgc2VsZWN0b3Jcblx0XHQvLyBpcyBiYXNlZCBzb2xlbHkgb24gdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZVxuXHRcdC8vIGJlaW5nIGVxdWFsIHRvIHRoZSBpZGVudGlmaWVyIEMsXG5cdFx0Ly8gb3IgYmVnaW5uaW5nIHdpdGggdGhlIGlkZW50aWZpZXIgQyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSBcIi1cIi5cblx0XHQvLyBUaGUgbWF0Y2hpbmcgb2YgQyBhZ2FpbnN0IHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UgdmFsdWUgaXMgcGVyZm9ybWVkIGNhc2UtaW5zZW5zaXRpdmVseS5cblx0XHQvLyBUaGUgaWRlbnRpZmllciBDIGRvZXMgbm90IGhhdmUgdG8gYmUgYSB2YWxpZCBsYW5ndWFnZSBuYW1lLlwiXG5cdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNsYW5nLXBzZXVkb1xuXHRcdFwibGFuZ1wiOiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBsYW5nICkge1xuXHRcdFx0Ly8gbGFuZyB2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaWRlbnRpZmllclxuXHRcdFx0aWYgKCAhcmlkZW50aWZpZXIudGVzdChsYW5nIHx8IFwiXCIpICkge1xuXHRcdFx0XHRTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgbGFuZzogXCIgKyBsYW5nICk7XG5cdFx0XHR9XG5cdFx0XHRsYW5nID0gbGFuZy5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciBlbGVtTGFuZztcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdGlmICggKGVsZW1MYW5nID0gZG9jdW1lbnRJc0hUTUwgP1xuXHRcdFx0XHRcdFx0ZWxlbS5sYW5nIDpcblx0XHRcdFx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlKFwieG1sOmxhbmdcIikgfHwgZWxlbS5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpKSApIHtcblxuXHRcdFx0XHRcdFx0ZWxlbUxhbmcgPSBlbGVtTGFuZy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1MYW5nID09PSBsYW5nIHx8IGVsZW1MYW5nLmluZGV4T2YoIGxhbmcgKyBcIi1cIiApID09PSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSB3aGlsZSAoIChlbGVtID0gZWxlbS5wYXJlbnROb2RlKSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH07XG5cdFx0fSksXG5cblx0XHQvLyBNaXNjZWxsYW5lb3VzXG5cdFx0XCJ0YXJnZXRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbiAmJiB3aW5kb3cubG9jYXRpb24uaGFzaDtcblx0XHRcdHJldHVybiBoYXNoICYmIGhhc2guc2xpY2UoIDEgKSA9PT0gZWxlbS5pZDtcblx0XHR9LFxuXG5cdFx0XCJyb290XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGRvY0VsZW07XG5cdFx0fSxcblxuXHRcdFwiZm9jdXNcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAoIWRvY3VtZW50Lmhhc0ZvY3VzIHx8IGRvY3VtZW50Lmhhc0ZvY3VzKCkpICYmICEhKGVsZW0udHlwZSB8fCBlbGVtLmhyZWYgfHwgfmVsZW0udGFiSW5kZXgpO1xuXHRcdH0sXG5cblx0XHQvLyBCb29sZWFuIHByb3BlcnRpZXNcblx0XHRcImVuYWJsZWRcIjogY3JlYXRlRGlzYWJsZWRQc2V1ZG8oIGZhbHNlICksXG5cdFx0XCJkaXNhYmxlZFwiOiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggdHJ1ZSApLFxuXG5cdFx0XCJjaGVja2VkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0Ly8gSW4gQ1NTMywgOmNoZWNrZWQgc2hvdWxkIHJldHVybiBib3RoIGNoZWNrZWQgYW5kIHNlbGVjdGVkIGVsZW1lbnRzXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuXHRcdFx0dmFyIG5vZGVOYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIChub2RlTmFtZSA9PT0gXCJpbnB1dFwiICYmICEhZWxlbS5jaGVja2VkKSB8fCAobm9kZU5hbWUgPT09IFwib3B0aW9uXCIgJiYgISFlbGVtLnNlbGVjdGVkKTtcblx0XHR9LFxuXG5cdFx0XCJzZWxlY3RlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdC8vIEFjY2Vzc2luZyB0aGlzIHByb3BlcnR5IG1ha2VzIHNlbGVjdGVkLWJ5LWRlZmF1bHRcblx0XHRcdC8vIG9wdGlvbnMgaW4gU2FmYXJpIHdvcmsgcHJvcGVybHlcblx0XHRcdGlmICggZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRlbGVtLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGVsZW0uc2VsZWN0ZWQgPT09IHRydWU7XG5cdFx0fSxcblxuXHRcdC8vIENvbnRlbnRzXG5cdFx0XCJlbXB0eVwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jZW1wdHktcHNldWRvXG5cdFx0XHQvLyA6ZW1wdHkgaXMgbmVnYXRlZCBieSBlbGVtZW50ICgxKSBvciBjb250ZW50IG5vZGVzICh0ZXh0OiAzOyBjZGF0YTogNDsgZW50aXR5IHJlZjogNSksXG5cdFx0XHQvLyAgIGJ1dCBub3QgYnkgb3RoZXJzIChjb21tZW50OiA4OyBwcm9jZXNzaW5nIGluc3RydWN0aW9uOiA3OyBldGMuKVxuXHRcdFx0Ly8gbm9kZVR5cGUgPCA2IHdvcmtzIGJlY2F1c2UgYXR0cmlidXRlcyAoMikgZG8gbm90IGFwcGVhciBhcyBjaGlsZHJlblxuXHRcdFx0Zm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA8IDYgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0XCJwYXJlbnRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gIUV4cHIucHNldWRvc1tcImVtcHR5XCJdKCBlbGVtICk7XG5cdFx0fSxcblxuXHRcdC8vIEVsZW1lbnQvaW5wdXQgdHlwZXNcblx0XHRcImhlYWRlclwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiByaGVhZGVyLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcblx0XHR9LFxuXG5cdFx0XCJpbnB1dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiByaW5wdXRzLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcblx0XHR9LFxuXG5cdFx0XCJidXR0b25cIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSBcImJ1dHRvblwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCI7XG5cdFx0fSxcblxuXHRcdFwidGV4dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBhdHRyO1xuXHRcdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICYmXG5cdFx0XHRcdGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCIgJiZcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRTw4XG5cdFx0XHRcdC8vIE5ldyBIVE1MNSBhdHRyaWJ1dGUgdmFsdWVzIChlLmcuLCBcInNlYXJjaFwiKSBhcHBlYXIgd2l0aCBlbGVtLnR5cGUgPT09IFwidGV4dFwiXG5cdFx0XHRcdCggKGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZShcInR5cGVcIikpID09IG51bGwgfHwgYXR0ci50b0xvd2VyQ2FzZSgpID09PSBcInRleHRcIiApO1xuXHRcdH0sXG5cblx0XHQvLyBQb3NpdGlvbi1pbi1jb2xsZWN0aW9uXG5cdFx0XCJmaXJzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIFsgMCBdO1xuXHRcdH0pLFxuXG5cdFx0XCJsYXN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIFsgbGVuZ3RoIC0gMSBdO1xuXHRcdH0pLFxuXG5cdFx0XCJlcVwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gWyBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50IF07XG5cdFx0fSksXG5cblx0XHRcImV2ZW5cIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSksXG5cblx0XHRcIm9kZFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHZhciBpID0gMTtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9KSxcblxuXHRcdFwibHRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0dmFyIGkgPSBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50O1xuXHRcdFx0Zm9yICggOyAtLWkgPj0gMDsgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pLFxuXG5cdFx0XCJndFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHR2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XG5cdFx0XHRmb3IgKCA7ICsraSA8IGxlbmd0aDsgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pXG5cdH1cbn07XG5cbkV4cHIucHNldWRvc1tcIm50aFwiXSA9IEV4cHIucHNldWRvc1tcImVxXCJdO1xuXG4vLyBBZGQgYnV0dG9uL2lucHV0IHR5cGUgcHNldWRvc1xuZm9yICggaSBpbiB7IHJhZGlvOiB0cnVlLCBjaGVja2JveDogdHJ1ZSwgZmlsZTogdHJ1ZSwgcGFzc3dvcmQ6IHRydWUsIGltYWdlOiB0cnVlIH0gKSB7XG5cdEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlSW5wdXRQc2V1ZG8oIGkgKTtcbn1cbmZvciAoIGkgaW4geyBzdWJtaXQ6IHRydWUsIHJlc2V0OiB0cnVlIH0gKSB7XG5cdEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlQnV0dG9uUHNldWRvKCBpICk7XG59XG5cbi8vIEVhc3kgQVBJIGZvciBjcmVhdGluZyBuZXcgc2V0RmlsdGVyc1xuZnVuY3Rpb24gc2V0RmlsdGVycygpIHt9XG5zZXRGaWx0ZXJzLnByb3RvdHlwZSA9IEV4cHIuZmlsdGVycyA9IEV4cHIucHNldWRvcztcbkV4cHIuc2V0RmlsdGVycyA9IG5ldyBzZXRGaWx0ZXJzKCk7XG5cbnRva2VuaXplID0gU2l6emxlLnRva2VuaXplID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBwYXJzZU9ubHkgKSB7XG5cdHZhciBtYXRjaGVkLCBtYXRjaCwgdG9rZW5zLCB0eXBlLFxuXHRcdHNvRmFyLCBncm91cHMsIHByZUZpbHRlcnMsXG5cdFx0Y2FjaGVkID0gdG9rZW5DYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG5cdGlmICggY2FjaGVkICkge1xuXHRcdHJldHVybiBwYXJzZU9ubHkgPyAwIDogY2FjaGVkLnNsaWNlKCAwICk7XG5cdH1cblxuXHRzb0ZhciA9IHNlbGVjdG9yO1xuXHRncm91cHMgPSBbXTtcblx0cHJlRmlsdGVycyA9IEV4cHIucHJlRmlsdGVyO1xuXG5cdHdoaWxlICggc29GYXIgKSB7XG5cblx0XHQvLyBDb21tYSBhbmQgZmlyc3QgcnVuXG5cdFx0aWYgKCAhbWF0Y2hlZCB8fCAobWF0Y2ggPSByY29tbWEuZXhlYyggc29GYXIgKSkgKSB7XG5cdFx0XHRpZiAoIG1hdGNoICkge1xuXHRcdFx0XHQvLyBEb24ndCBjb25zdW1lIHRyYWlsaW5nIGNvbW1hcyBhcyB2YWxpZFxuXHRcdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaFswXS5sZW5ndGggKSB8fCBzb0Zhcjtcblx0XHRcdH1cblx0XHRcdGdyb3Vwcy5wdXNoKCAodG9rZW5zID0gW10pICk7XG5cdFx0fVxuXG5cdFx0bWF0Y2hlZCA9IGZhbHNlO1xuXG5cdFx0Ly8gQ29tYmluYXRvcnNcblx0XHRpZiAoIChtYXRjaCA9IHJjb21iaW5hdG9ycy5leGVjKCBzb0ZhciApKSApIHtcblx0XHRcdG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xuXHRcdFx0dG9rZW5zLnB1c2goe1xuXHRcdFx0XHR2YWx1ZTogbWF0Y2hlZCxcblx0XHRcdFx0Ly8gQ2FzdCBkZXNjZW5kYW50IGNvbWJpbmF0b3JzIHRvIHNwYWNlXG5cdFx0XHRcdHR5cGU6IG1hdGNoWzBdLnJlcGxhY2UoIHJ0cmltLCBcIiBcIiApXG5cdFx0XHR9KTtcblx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0Ly8gRmlsdGVyc1xuXHRcdGZvciAoIHR5cGUgaW4gRXhwci5maWx0ZXIgKSB7XG5cdFx0XHRpZiAoIChtYXRjaCA9IG1hdGNoRXhwclsgdHlwZSBdLmV4ZWMoIHNvRmFyICkpICYmICghcHJlRmlsdGVyc1sgdHlwZSBdIHx8XG5cdFx0XHRcdChtYXRjaCA9IHByZUZpbHRlcnNbIHR5cGUgXSggbWF0Y2ggKSkpICkge1xuXHRcdFx0XHRtYXRjaGVkID0gbWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdHZhbHVlOiBtYXRjaGVkLFxuXHRcdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdFx0bWF0Y2hlczogbWF0Y2hcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCAhbWF0Y2hlZCApIHtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbGVuZ3RoIG9mIHRoZSBpbnZhbGlkIGV4Y2Vzc1xuXHQvLyBpZiB3ZSdyZSBqdXN0IHBhcnNpbmdcblx0Ly8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvciBvciByZXR1cm4gdG9rZW5zXG5cdHJldHVybiBwYXJzZU9ubHkgP1xuXHRcdHNvRmFyLmxlbmd0aCA6XG5cdFx0c29GYXIgP1xuXHRcdFx0U2l6emxlLmVycm9yKCBzZWxlY3RvciApIDpcblx0XHRcdC8vIENhY2hlIHRoZSB0b2tlbnNcblx0XHRcdHRva2VuQ2FjaGUoIHNlbGVjdG9yLCBncm91cHMgKS5zbGljZSggMCApO1xufTtcblxuZnVuY3Rpb24gdG9TZWxlY3RvciggdG9rZW5zICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gdG9rZW5zLmxlbmd0aCxcblx0XHRzZWxlY3RvciA9IFwiXCI7XG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdHNlbGVjdG9yICs9IHRva2Vuc1tpXS52YWx1ZTtcblx0fVxuXHRyZXR1cm4gc2VsZWN0b3I7XG59XG5cbmZ1bmN0aW9uIGFkZENvbWJpbmF0b3IoIG1hdGNoZXIsIGNvbWJpbmF0b3IsIGJhc2UgKSB7XG5cdHZhciBkaXIgPSBjb21iaW5hdG9yLmRpcixcblx0XHRza2lwID0gY29tYmluYXRvci5uZXh0LFxuXHRcdGtleSA9IHNraXAgfHwgZGlyLFxuXHRcdGNoZWNrTm9uRWxlbWVudHMgPSBiYXNlICYmIGtleSA9PT0gXCJwYXJlbnROb2RlXCIsXG5cdFx0ZG9uZU5hbWUgPSBkb25lKys7XG5cblx0cmV0dXJuIGNvbWJpbmF0b3IuZmlyc3QgP1xuXHRcdC8vIENoZWNrIGFnYWluc3QgY2xvc2VzdCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudFxuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRyZXR1cm4gbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IDpcblxuXHRcdC8vIENoZWNrIGFnYWluc3QgYWxsIGFuY2VzdG9yL3ByZWNlZGluZyBlbGVtZW50c1xuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgb2xkQ2FjaGUsIHVuaXF1ZUNhY2hlLCBvdXRlckNhY2hlLFxuXHRcdFx0XHRuZXdDYWNoZSA9IFsgZGlycnVucywgZG9uZU5hbWUgXTtcblxuXHRcdFx0Ly8gV2UgY2FuJ3Qgc2V0IGFyYml0cmFyeSBkYXRhIG9uIFhNTCBub2Rlcywgc28gdGhleSBkb24ndCBiZW5lZml0IGZyb20gY29tYmluYXRvciBjYWNoaW5nXG5cdFx0XHRpZiAoIHhtbCApIHtcblx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBlbGVtWyBleHBhbmRvIF0gfHwgKGVsZW1bIGV4cGFuZG8gXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIGVsZW0udW5pcXVlSUQgXSB8fCAob3V0ZXJDYWNoZVsgZWxlbS51bmlxdWVJRCBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRpZiAoIHNraXAgJiYgc2tpcCA9PT0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICkge1xuXHRcdFx0XHRcdFx0XHRlbGVtID0gZWxlbVsgZGlyIF0gfHwgZWxlbTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIChvbGRDYWNoZSA9IHVuaXF1ZUNhY2hlWyBrZXkgXSkgJiZcblx0XHRcdFx0XHRcdFx0b2xkQ2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBvbGRDYWNoZVsgMSBdID09PSBkb25lTmFtZSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBBc3NpZ24gdG8gbmV3Q2FjaGUgc28gcmVzdWx0cyBiYWNrLXByb3BhZ2F0ZSB0byBwcmV2aW91cyBlbGVtZW50c1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKG5ld0NhY2hlWyAyIF0gPSBvbGRDYWNoZVsgMiBdKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIFJldXNlIG5ld2NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIGtleSBdID0gbmV3Q2FjaGU7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQSBtYXRjaCBtZWFucyB3ZSdyZSBkb25lOyBhIGZhaWwgbWVhbnMgd2UgaGF2ZSB0byBrZWVwIGNoZWNraW5nXG5cdFx0XHRcdFx0XHRcdGlmICggKG5ld0NhY2hlWyAyIF0gPSBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xufVxuXG5mdW5jdGlvbiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSB7XG5cdHJldHVybiBtYXRjaGVycy5sZW5ndGggPiAxID9cblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIGkgPSBtYXRjaGVycy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCAhbWF0Y2hlcnNbaV0oIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSA6XG5cdFx0bWF0Y2hlcnNbMF07XG59XG5cbmZ1bmN0aW9uIG11bHRpcGxlQ29udGV4dHMoIHNlbGVjdG9yLCBjb250ZXh0cywgcmVzdWx0cyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0U2l6emxlKCBzZWxlY3RvciwgY29udGV4dHNbaV0sIHJlc3VsdHMgKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gY29uZGVuc2UoIHVubWF0Y2hlZCwgbWFwLCBmaWx0ZXIsIGNvbnRleHQsIHhtbCApIHtcblx0dmFyIGVsZW0sXG5cdFx0bmV3VW5tYXRjaGVkID0gW10sXG5cdFx0aSA9IDAsXG5cdFx0bGVuID0gdW5tYXRjaGVkLmxlbmd0aCxcblx0XHRtYXBwZWQgPSBtYXAgIT0gbnVsbDtcblxuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRpZiAoIChlbGVtID0gdW5tYXRjaGVkW2ldKSApIHtcblx0XHRcdGlmICggIWZpbHRlciB8fCBmaWx0ZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRuZXdVbm1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdFx0XHRpZiAoIG1hcHBlZCApIHtcblx0XHRcdFx0XHRtYXAucHVzaCggaSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG5ld1VubWF0Y2hlZDtcbn1cblxuZnVuY3Rpb24gc2V0TWF0Y2hlciggcHJlRmlsdGVyLCBzZWxlY3RvciwgbWF0Y2hlciwgcG9zdEZpbHRlciwgcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICkge1xuXHRpZiAoIHBvc3RGaWx0ZXIgJiYgIXBvc3RGaWx0ZXJbIGV4cGFuZG8gXSApIHtcblx0XHRwb3N0RmlsdGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbHRlciApO1xuXHR9XG5cdGlmICggcG9zdEZpbmRlciAmJiAhcG9zdEZpbmRlclsgZXhwYW5kbyBdICkge1xuXHRcdHBvc3RGaW5kZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKTtcblx0fVxuXHRyZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCByZXN1bHRzLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0dmFyIHRlbXAsIGksIGVsZW0sXG5cdFx0XHRwcmVNYXAgPSBbXSxcblx0XHRcdHBvc3RNYXAgPSBbXSxcblx0XHRcdHByZWV4aXN0aW5nID0gcmVzdWx0cy5sZW5ndGgsXG5cblx0XHRcdC8vIEdldCBpbml0aWFsIGVsZW1lbnRzIGZyb20gc2VlZCBvciBjb250ZXh0XG5cdFx0XHRlbGVtcyA9IHNlZWQgfHwgbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IgfHwgXCIqXCIsIGNvbnRleHQubm9kZVR5cGUgPyBbIGNvbnRleHQgXSA6IGNvbnRleHQsIFtdICksXG5cblx0XHRcdC8vIFByZWZpbHRlciB0byBnZXQgbWF0Y2hlciBpbnB1dCwgcHJlc2VydmluZyBhIG1hcCBmb3Igc2VlZC1yZXN1bHRzIHN5bmNocm9uaXphdGlvblxuXHRcdFx0bWF0Y2hlckluID0gcHJlRmlsdGVyICYmICggc2VlZCB8fCAhc2VsZWN0b3IgKSA/XG5cdFx0XHRcdGNvbmRlbnNlKCBlbGVtcywgcHJlTWFwLCBwcmVGaWx0ZXIsIGNvbnRleHQsIHhtbCApIDpcblx0XHRcdFx0ZWxlbXMsXG5cblx0XHRcdG1hdGNoZXJPdXQgPSBtYXRjaGVyID9cblx0XHRcdFx0Ly8gSWYgd2UgaGF2ZSBhIHBvc3RGaW5kZXIsIG9yIGZpbHRlcmVkIHNlZWQsIG9yIG5vbi1zZWVkIHBvc3RGaWx0ZXIgb3IgcHJlZXhpc3RpbmcgcmVzdWx0cyxcblx0XHRcdFx0cG9zdEZpbmRlciB8fCAoIHNlZWQgPyBwcmVGaWx0ZXIgOiBwcmVleGlzdGluZyB8fCBwb3N0RmlsdGVyICkgP1xuXG5cdFx0XHRcdFx0Ly8gLi4uaW50ZXJtZWRpYXRlIHByb2Nlc3NpbmcgaXMgbmVjZXNzYXJ5XG5cdFx0XHRcdFx0W10gOlxuXG5cdFx0XHRcdFx0Ly8gLi4ub3RoZXJ3aXNlIHVzZSByZXN1bHRzIGRpcmVjdGx5XG5cdFx0XHRcdFx0cmVzdWx0cyA6XG5cdFx0XHRcdG1hdGNoZXJJbjtcblxuXHRcdC8vIEZpbmQgcHJpbWFyeSBtYXRjaGVzXG5cdFx0aWYgKCBtYXRjaGVyICkge1xuXHRcdFx0bWF0Y2hlciggbWF0Y2hlckluLCBtYXRjaGVyT3V0LCBjb250ZXh0LCB4bWwgKTtcblx0XHR9XG5cblx0XHQvLyBBcHBseSBwb3N0RmlsdGVyXG5cdFx0aWYgKCBwb3N0RmlsdGVyICkge1xuXHRcdFx0dGVtcCA9IGNvbmRlbnNlKCBtYXRjaGVyT3V0LCBwb3N0TWFwICk7XG5cdFx0XHRwb3N0RmlsdGVyKCB0ZW1wLCBbXSwgY29udGV4dCwgeG1sICk7XG5cblx0XHRcdC8vIFVuLW1hdGNoIGZhaWxpbmcgZWxlbWVudHMgYnkgbW92aW5nIHRoZW0gYmFjayB0byBtYXRjaGVySW5cblx0XHRcdGkgPSB0ZW1wLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoIChlbGVtID0gdGVtcFtpXSkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlck91dFsgcG9zdE1hcFtpXSBdID0gIShtYXRjaGVySW5bIHBvc3RNYXBbaV0gXSA9IGVsZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0aWYgKCBwb3N0RmluZGVyIHx8IHByZUZpbHRlciApIHtcblx0XHRcdFx0aWYgKCBwb3N0RmluZGVyICkge1xuXHRcdFx0XHRcdC8vIEdldCB0aGUgZmluYWwgbWF0Y2hlck91dCBieSBjb25kZW5zaW5nIHRoaXMgaW50ZXJtZWRpYXRlIGludG8gcG9zdEZpbmRlciBjb250ZXh0c1xuXHRcdFx0XHRcdHRlbXAgPSBbXTtcblx0XHRcdFx0XHRpID0gbWF0Y2hlck91dC5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRpZiAoIChlbGVtID0gbWF0Y2hlck91dFtpXSkgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIFJlc3RvcmUgbWF0Y2hlckluIHNpbmNlIGVsZW0gaXMgbm90IHlldCBhIGZpbmFsIG1hdGNoXG5cdFx0XHRcdFx0XHRcdHRlbXAucHVzaCggKG1hdGNoZXJJbltpXSA9IGVsZW0pICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHBvc3RGaW5kZXIoIG51bGwsIChtYXRjaGVyT3V0ID0gW10pLCB0ZW1wLCB4bWwgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE1vdmUgbWF0Y2hlZCBlbGVtZW50cyBmcm9tIHNlZWQgdG8gcmVzdWx0cyB0byBrZWVwIHRoZW0gc3luY2hyb25pemVkXG5cdFx0XHRcdGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0aWYgKCAoZWxlbSA9IG1hdGNoZXJPdXRbaV0pICYmXG5cdFx0XHRcdFx0XHQodGVtcCA9IHBvc3RGaW5kZXIgPyBpbmRleE9mKCBzZWVkLCBlbGVtICkgOiBwcmVNYXBbaV0pID4gLTEgKSB7XG5cblx0XHRcdFx0XHRcdHNlZWRbdGVtcF0gPSAhKHJlc3VsdHNbdGVtcF0gPSBlbGVtKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdC8vIEFkZCBlbGVtZW50cyB0byByZXN1bHRzLCB0aHJvdWdoIHBvc3RGaW5kZXIgaWYgZGVmaW5lZFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXRjaGVyT3V0ID0gY29uZGVuc2UoXG5cdFx0XHRcdG1hdGNoZXJPdXQgPT09IHJlc3VsdHMgP1xuXHRcdFx0XHRcdG1hdGNoZXJPdXQuc3BsaWNlKCBwcmVleGlzdGluZywgbWF0Y2hlck91dC5sZW5ndGggKSA6XG5cdFx0XHRcdFx0bWF0Y2hlck91dFxuXHRcdFx0KTtcblx0XHRcdGlmICggcG9zdEZpbmRlciApIHtcblx0XHRcdFx0cG9zdEZpbmRlciggbnVsbCwgcmVzdWx0cywgbWF0Y2hlck91dCwgeG1sICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBtYXRjaGVyT3V0ICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlckZyb21Ub2tlbnMoIHRva2VucyApIHtcblx0dmFyIGNoZWNrQ29udGV4dCwgbWF0Y2hlciwgaixcblx0XHRsZW4gPSB0b2tlbnMubGVuZ3RoLFxuXHRcdGxlYWRpbmdSZWxhdGl2ZSA9IEV4cHIucmVsYXRpdmVbIHRva2Vuc1swXS50eXBlIF0sXG5cdFx0aW1wbGljaXRSZWxhdGl2ZSA9IGxlYWRpbmdSZWxhdGl2ZSB8fCBFeHByLnJlbGF0aXZlW1wiIFwiXSxcblx0XHRpID0gbGVhZGluZ1JlbGF0aXZlID8gMSA6IDAsXG5cblx0XHQvLyBUaGUgZm91bmRhdGlvbmFsIG1hdGNoZXIgZW5zdXJlcyB0aGF0IGVsZW1lbnRzIGFyZSByZWFjaGFibGUgZnJvbSB0b3AtbGV2ZWwgY29udGV4dChzKVxuXHRcdG1hdGNoQ29udGV4dCA9IGFkZENvbWJpbmF0b3IoIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGNoZWNrQ29udGV4dDtcblx0XHR9LCBpbXBsaWNpdFJlbGF0aXZlLCB0cnVlICksXG5cdFx0bWF0Y2hBbnlDb250ZXh0ID0gYWRkQ29tYmluYXRvciggZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gaW5kZXhPZiggY2hlY2tDb250ZXh0LCBlbGVtICkgPiAtMTtcblx0XHR9LCBpbXBsaWNpdFJlbGF0aXZlLCB0cnVlICksXG5cdFx0bWF0Y2hlcnMgPSBbIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgcmV0ID0gKCAhbGVhZGluZ1JlbGF0aXZlICYmICggeG1sIHx8IGNvbnRleHQgIT09IG91dGVybW9zdENvbnRleHQgKSApIHx8IChcblx0XHRcdFx0KGNoZWNrQ29udGV4dCA9IGNvbnRleHQpLm5vZGVUeXBlID9cblx0XHRcdFx0XHRtYXRjaENvbnRleHQoIGVsZW0sIGNvbnRleHQsIHhtbCApIDpcblx0XHRcdFx0XHRtYXRjaEFueUNvbnRleHQoIGVsZW0sIGNvbnRleHQsIHhtbCApICk7XG5cdFx0XHQvLyBBdm9pZCBoYW5naW5nIG9udG8gZWxlbWVudCAoaXNzdWUgIzI5OSlcblx0XHRcdGNoZWNrQ29udGV4dCA9IG51bGw7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH0gXTtcblxuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRpZiAoIChtYXRjaGVyID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zW2ldLnR5cGUgXSkgKSB7XG5cdFx0XHRtYXRjaGVycyA9IFsgYWRkQ29tYmluYXRvcihlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSwgbWF0Y2hlcikgXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWF0Y2hlciA9IEV4cHIuZmlsdGVyWyB0b2tlbnNbaV0udHlwZSBdLmFwcGx5KCBudWxsLCB0b2tlbnNbaV0ubWF0Y2hlcyApO1xuXG5cdFx0XHQvLyBSZXR1cm4gc3BlY2lhbCB1cG9uIHNlZWluZyBhIHBvc2l0aW9uYWwgbWF0Y2hlclxuXHRcdFx0aWYgKCBtYXRjaGVyWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdC8vIEZpbmQgdGhlIG5leHQgcmVsYXRpdmUgb3BlcmF0b3IgKGlmIGFueSkgZm9yIHByb3BlciBoYW5kbGluZ1xuXHRcdFx0XHRqID0gKytpO1xuXHRcdFx0XHRmb3IgKCA7IGogPCBsZW47IGorKyApIHtcblx0XHRcdFx0XHRpZiAoIEV4cHIucmVsYXRpdmVbIHRva2Vuc1tqXS50eXBlIF0gKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHNldE1hdGNoZXIoXG5cdFx0XHRcdFx0aSA+IDEgJiYgZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICksXG5cdFx0XHRcdFx0aSA+IDEgJiYgdG9TZWxlY3Rvcihcblx0XHRcdFx0XHRcdC8vIElmIHRoZSBwcmVjZWRpbmcgdG9rZW4gd2FzIGEgZGVzY2VuZGFudCBjb21iaW5hdG9yLCBpbnNlcnQgYW4gaW1wbGljaXQgYW55LWVsZW1lbnQgYCpgXG5cdFx0XHRcdFx0XHR0b2tlbnMuc2xpY2UoIDAsIGkgLSAxICkuY29uY2F0KHsgdmFsdWU6IHRva2Vuc1sgaSAtIDIgXS50eXBlID09PSBcIiBcIiA/IFwiKlwiIDogXCJcIiB9KVxuXHRcdFx0XHRcdCkucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLFxuXHRcdFx0XHRcdG1hdGNoZXIsXG5cdFx0XHRcdFx0aSA8IGogJiYgbWF0Y2hlckZyb21Ub2tlbnMoIHRva2Vucy5zbGljZSggaSwgaiApICksXG5cdFx0XHRcdFx0aiA8IGxlbiAmJiBtYXRjaGVyRnJvbVRva2VucyggKHRva2VucyA9IHRva2Vucy5zbGljZSggaiApKSApLFxuXHRcdFx0XHRcdGogPCBsZW4gJiYgdG9TZWxlY3RvciggdG9rZW5zIClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdG1hdGNoZXJzLnB1c2goIG1hdGNoZXIgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXJGcm9tR3JvdXBNYXRjaGVycyggZWxlbWVudE1hdGNoZXJzLCBzZXRNYXRjaGVycyApIHtcblx0dmFyIGJ5U2V0ID0gc2V0TWF0Y2hlcnMubGVuZ3RoID4gMCxcblx0XHRieUVsZW1lbnQgPSBlbGVtZW50TWF0Y2hlcnMubGVuZ3RoID4gMCxcblx0XHRzdXBlck1hdGNoZXIgPSBmdW5jdGlvbiggc2VlZCwgY29udGV4dCwgeG1sLCByZXN1bHRzLCBvdXRlcm1vc3QgKSB7XG5cdFx0XHR2YXIgZWxlbSwgaiwgbWF0Y2hlcixcblx0XHRcdFx0bWF0Y2hlZENvdW50ID0gMCxcblx0XHRcdFx0aSA9IFwiMFwiLFxuXHRcdFx0XHR1bm1hdGNoZWQgPSBzZWVkICYmIFtdLFxuXHRcdFx0XHRzZXRNYXRjaGVkID0gW10sXG5cdFx0XHRcdGNvbnRleHRCYWNrdXAgPSBvdXRlcm1vc3RDb250ZXh0LFxuXHRcdFx0XHQvLyBXZSBtdXN0IGFsd2F5cyBoYXZlIGVpdGhlciBzZWVkIGVsZW1lbnRzIG9yIG91dGVybW9zdCBjb250ZXh0XG5cdFx0XHRcdGVsZW1zID0gc2VlZCB8fCBieUVsZW1lbnQgJiYgRXhwci5maW5kW1wiVEFHXCJdKCBcIipcIiwgb3V0ZXJtb3N0ICksXG5cdFx0XHRcdC8vIFVzZSBpbnRlZ2VyIGRpcnJ1bnMgaWZmIHRoaXMgaXMgdGhlIG91dGVybW9zdCBtYXRjaGVyXG5cdFx0XHRcdGRpcnJ1bnNVbmlxdWUgPSAoZGlycnVucyArPSBjb250ZXh0QmFja3VwID09IG51bGwgPyAxIDogTWF0aC5yYW5kb20oKSB8fCAwLjEpLFxuXHRcdFx0XHRsZW4gPSBlbGVtcy5sZW5ndGg7XG5cblx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dCA9PT0gZG9jdW1lbnQgfHwgY29udGV4dCB8fCBvdXRlcm1vc3Q7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBlbGVtZW50cyBwYXNzaW5nIGVsZW1lbnRNYXRjaGVycyBkaXJlY3RseSB0byByZXN1bHRzXG5cdFx0XHQvLyBTdXBwb3J0OiBJRTw5LCBTYWZhcmlcblx0XHRcdC8vIFRvbGVyYXRlIE5vZGVMaXN0IHByb3BlcnRpZXMgKElFOiBcImxlbmd0aFwiOyBTYWZhcmk6IDxudW1iZXI+KSBtYXRjaGluZyBlbGVtZW50cyBieSBpZFxuXHRcdFx0Zm9yICggOyBpICE9PSBsZW4gJiYgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGJ5RWxlbWVudCAmJiBlbGVtICkge1xuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHRcdGlmICggIWNvbnRleHQgJiYgZWxlbS5vd25lckRvY3VtZW50ICE9PSBkb2N1bWVudCApIHtcblx0XHRcdFx0XHRcdHNldERvY3VtZW50KCBlbGVtICk7XG5cdFx0XHRcdFx0XHR4bWwgPSAhZG9jdW1lbnRJc0hUTUw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHdoaWxlICggKG1hdGNoZXIgPSBlbGVtZW50TWF0Y2hlcnNbaisrXSkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQgfHwgZG9jdW1lbnQsIHhtbCkgKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBvdXRlcm1vc3QgKSB7XG5cdFx0XHRcdFx0XHRkaXJydW5zID0gZGlycnVuc1VuaXF1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBUcmFjayB1bm1hdGNoZWQgZWxlbWVudHMgZm9yIHNldCBmaWx0ZXJzXG5cdFx0XHRcdGlmICggYnlTZXQgKSB7XG5cdFx0XHRcdFx0Ly8gVGhleSB3aWxsIGhhdmUgZ29uZSB0aHJvdWdoIGFsbCBwb3NzaWJsZSBtYXRjaGVyc1xuXHRcdFx0XHRcdGlmICggKGVsZW0gPSAhbWF0Y2hlciAmJiBlbGVtKSApIHtcblx0XHRcdFx0XHRcdG1hdGNoZWRDb3VudC0tO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIExlbmd0aGVuIHRoZSBhcnJheSBmb3IgZXZlcnkgZWxlbWVudCwgbWF0Y2hlZCBvciBub3Rcblx0XHRcdFx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRcdFx0XHR1bm1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBgaWAgaXMgbm93IHRoZSBjb3VudCBvZiBlbGVtZW50cyB2aXNpdGVkIGFib3ZlLCBhbmQgYWRkaW5nIGl0IHRvIGBtYXRjaGVkQ291bnRgXG5cdFx0XHQvLyBtYWtlcyB0aGUgbGF0dGVyIG5vbm5lZ2F0aXZlLlxuXHRcdFx0bWF0Y2hlZENvdW50ICs9IGk7XG5cblx0XHRcdC8vIEFwcGx5IHNldCBmaWx0ZXJzIHRvIHVubWF0Y2hlZCBlbGVtZW50c1xuXHRcdFx0Ly8gTk9URTogVGhpcyBjYW4gYmUgc2tpcHBlZCBpZiB0aGVyZSBhcmUgbm8gdW5tYXRjaGVkIGVsZW1lbnRzIChpLmUuLCBgbWF0Y2hlZENvdW50YFxuXHRcdFx0Ly8gZXF1YWxzIGBpYCksIHVubGVzcyB3ZSBkaWRuJ3QgdmlzaXQgX2FueV8gZWxlbWVudHMgaW4gdGhlIGFib3ZlIGxvb3AgYmVjYXVzZSB3ZSBoYXZlXG5cdFx0XHQvLyBubyBlbGVtZW50IG1hdGNoZXJzIGFuZCBubyBzZWVkLlxuXHRcdFx0Ly8gSW5jcmVtZW50aW5nIGFuIGluaXRpYWxseS1zdHJpbmcgXCIwXCIgYGlgIGFsbG93cyBgaWAgdG8gcmVtYWluIGEgc3RyaW5nIG9ubHkgaW4gdGhhdFxuXHRcdFx0Ly8gY2FzZSwgd2hpY2ggd2lsbCByZXN1bHQgaW4gYSBcIjAwXCIgYG1hdGNoZWRDb3VudGAgdGhhdCBkaWZmZXJzIGZyb20gYGlgIGJ1dCBpcyBhbHNvXG5cdFx0XHQvLyBudW1lcmljYWxseSB6ZXJvLlxuXHRcdFx0aWYgKCBieVNldCAmJiBpICE9PSBtYXRjaGVkQ291bnQgKSB7XG5cdFx0XHRcdGogPSAwO1xuXHRcdFx0XHR3aGlsZSAoIChtYXRjaGVyID0gc2V0TWF0Y2hlcnNbaisrXSkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlciggdW5tYXRjaGVkLCBzZXRNYXRjaGVkLCBjb250ZXh0LCB4bWwgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggc2VlZCApIHtcblx0XHRcdFx0XHQvLyBSZWludGVncmF0ZSBlbGVtZW50IG1hdGNoZXMgdG8gZWxpbWluYXRlIHRoZSBuZWVkIGZvciBzb3J0aW5nXG5cdFx0XHRcdFx0aWYgKCBtYXRjaGVkQ291bnQgPiAwICkge1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggISh1bm1hdGNoZWRbaV0gfHwgc2V0TWF0Y2hlZFtpXSkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0TWF0Y2hlZFtpXSA9IHBvcC5jYWxsKCByZXN1bHRzICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBEaXNjYXJkIGluZGV4IHBsYWNlaG9sZGVyIHZhbHVlcyB0byBnZXQgb25seSBhY3R1YWwgbWF0Y2hlc1xuXHRcdFx0XHRcdHNldE1hdGNoZWQgPSBjb25kZW5zZSggc2V0TWF0Y2hlZCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQWRkIG1hdGNoZXMgdG8gcmVzdWx0c1xuXHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBzZXRNYXRjaGVkICk7XG5cblx0XHRcdFx0Ly8gU2VlZGxlc3Mgc2V0IG1hdGNoZXMgc3VjY2VlZGluZyBtdWx0aXBsZSBzdWNjZXNzZnVsIG1hdGNoZXJzIHN0aXB1bGF0ZSBzb3J0aW5nXG5cdFx0XHRcdGlmICggb3V0ZXJtb3N0ICYmICFzZWVkICYmIHNldE1hdGNoZWQubGVuZ3RoID4gMCAmJlxuXHRcdFx0XHRcdCggbWF0Y2hlZENvdW50ICsgc2V0TWF0Y2hlcnMubGVuZ3RoICkgPiAxICkge1xuXG5cdFx0XHRcdFx0U2l6emxlLnVuaXF1ZVNvcnQoIHJlc3VsdHMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBPdmVycmlkZSBtYW5pcHVsYXRpb24gb2YgZ2xvYmFscyBieSBuZXN0ZWQgbWF0Y2hlcnNcblx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRkaXJydW5zID0gZGlycnVuc1VuaXF1ZTtcblx0XHRcdFx0b3V0ZXJtb3N0Q29udGV4dCA9IGNvbnRleHRCYWNrdXA7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB1bm1hdGNoZWQ7XG5cdFx0fTtcblxuXHRyZXR1cm4gYnlTZXQgP1xuXHRcdG1hcmtGdW5jdGlvbiggc3VwZXJNYXRjaGVyICkgOlxuXHRcdHN1cGVyTWF0Y2hlcjtcbn1cblxuY29tcGlsZSA9IFNpenpsZS5jb21waWxlID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBtYXRjaCAvKiBJbnRlcm5hbCBVc2UgT25seSAqLyApIHtcblx0dmFyIGksXG5cdFx0c2V0TWF0Y2hlcnMgPSBbXSxcblx0XHRlbGVtZW50TWF0Y2hlcnMgPSBbXSxcblx0XHRjYWNoZWQgPSBjb21waWxlckNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF07XG5cblx0aWYgKCAhY2FjaGVkICkge1xuXHRcdC8vIEdlbmVyYXRlIGEgZnVuY3Rpb24gb2YgcmVjdXJzaXZlIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIHRvIGNoZWNrIGVhY2ggZWxlbWVudFxuXHRcdGlmICggIW1hdGNoICkge1xuXHRcdFx0bWF0Y2ggPSB0b2tlbml6ZSggc2VsZWN0b3IgKTtcblx0XHR9XG5cdFx0aSA9IG1hdGNoLmxlbmd0aDtcblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdGNhY2hlZCA9IG1hdGNoZXJGcm9tVG9rZW5zKCBtYXRjaFtpXSApO1xuXHRcdFx0aWYgKCBjYWNoZWRbIGV4cGFuZG8gXSApIHtcblx0XHRcdFx0c2V0TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2FjaGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uXG5cdFx0Y2FjaGVkID0gY29tcGlsZXJDYWNoZSggc2VsZWN0b3IsIG1hdGNoZXJGcm9tR3JvdXBNYXRjaGVycyggZWxlbWVudE1hdGNoZXJzLCBzZXRNYXRjaGVycyApICk7XG5cblx0XHQvLyBTYXZlIHNlbGVjdG9yIGFuZCB0b2tlbml6YXRpb25cblx0XHRjYWNoZWQuc2VsZWN0b3IgPSBzZWxlY3Rvcjtcblx0fVxuXHRyZXR1cm4gY2FjaGVkO1xufTtcblxuLyoqXG4gKiBBIGxvdy1sZXZlbCBzZWxlY3Rpb24gZnVuY3Rpb24gdGhhdCB3b3JrcyB3aXRoIFNpenpsZSdzIGNvbXBpbGVkXG4gKiAgc2VsZWN0b3IgZnVuY3Rpb25zXG4gKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gc2VsZWN0b3IgQSBzZWxlY3RvciBvciBhIHByZS1jb21waWxlZFxuICogIHNlbGVjdG9yIGZ1bmN0aW9uIGJ1aWx0IHdpdGggU2l6emxlLmNvbXBpbGVcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGV4dFxuICogQHBhcmFtIHtBcnJheX0gW3Jlc3VsdHNdXG4gKiBAcGFyYW0ge0FycmF5fSBbc2VlZF0gQSBzZXQgb2YgZWxlbWVudHMgdG8gbWF0Y2ggYWdhaW5zdFxuICovXG5zZWxlY3QgPSBTaXp6bGUuc2VsZWN0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuXHR2YXIgaSwgdG9rZW5zLCB0b2tlbiwgdHlwZSwgZmluZCxcblx0XHRjb21waWxlZCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICYmIHNlbGVjdG9yLFxuXHRcdG1hdGNoID0gIXNlZWQgJiYgdG9rZW5pemUoIChzZWxlY3RvciA9IGNvbXBpbGVkLnNlbGVjdG9yIHx8IHNlbGVjdG9yKSApO1xuXG5cdHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG5cdC8vIFRyeSB0byBtaW5pbWl6ZSBvcGVyYXRpb25zIGlmIHRoZXJlIGlzIG9ubHkgb25lIHNlbGVjdG9yIGluIHRoZSBsaXN0IGFuZCBubyBzZWVkXG5cdC8vICh0aGUgbGF0dGVyIG9mIHdoaWNoIGd1YXJhbnRlZXMgdXMgY29udGV4dClcblx0aWYgKCBtYXRjaC5sZW5ndGggPT09IDEgKSB7XG5cblx0XHQvLyBSZWR1Y2UgY29udGV4dCBpZiB0aGUgbGVhZGluZyBjb21wb3VuZCBzZWxlY3RvciBpcyBhbiBJRFxuXHRcdHRva2VucyA9IG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoIDAgKTtcblx0XHRpZiAoIHRva2Vucy5sZW5ndGggPiAyICYmICh0b2tlbiA9IHRva2Vuc1swXSkudHlwZSA9PT0gXCJJRFwiICYmXG5cdFx0XHRcdGNvbnRleHQubm9kZVR5cGUgPT09IDkgJiYgZG9jdW1lbnRJc0hUTUwgJiYgRXhwci5yZWxhdGl2ZVsgdG9rZW5zWzFdLnR5cGUgXSApIHtcblxuXHRcdFx0Y29udGV4dCA9ICggRXhwci5maW5kW1wiSURcIl0oIHRva2VuLm1hdGNoZXNbMF0ucmVwbGFjZShydW5lc2NhcGUsIGZ1bmVzY2FwZSksIGNvbnRleHQgKSB8fCBbXSApWzBdO1xuXHRcdFx0aWYgKCAhY29udGV4dCApIHtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cblx0XHRcdC8vIFByZWNvbXBpbGVkIG1hdGNoZXJzIHdpbGwgc3RpbGwgdmVyaWZ5IGFuY2VzdHJ5LCBzbyBzdGVwIHVwIGEgbGV2ZWxcblx0XHRcdH0gZWxzZSBpZiAoIGNvbXBpbGVkICkge1xuXHRcdFx0XHRjb250ZXh0ID0gY29udGV4dC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRzZWxlY3RvciA9IHNlbGVjdG9yLnNsaWNlKCB0b2tlbnMuc2hpZnQoKS52YWx1ZS5sZW5ndGggKTtcblx0XHR9XG5cblx0XHQvLyBGZXRjaCBhIHNlZWQgc2V0IGZvciByaWdodC10by1sZWZ0IG1hdGNoaW5nXG5cdFx0aSA9IG1hdGNoRXhwcltcIm5lZWRzQ29udGV4dFwiXS50ZXN0KCBzZWxlY3RvciApID8gMCA6IHRva2Vucy5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHR0b2tlbiA9IHRva2Vuc1tpXTtcblxuXHRcdFx0Ly8gQWJvcnQgaWYgd2UgaGl0IGEgY29tYmluYXRvclxuXHRcdFx0aWYgKCBFeHByLnJlbGF0aXZlWyAodHlwZSA9IHRva2VuLnR5cGUpIF0gKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCAoZmluZCA9IEV4cHIuZmluZFsgdHlwZSBdKSApIHtcblx0XHRcdFx0Ly8gU2VhcmNoLCBleHBhbmRpbmcgY29udGV4dCBmb3IgbGVhZGluZyBzaWJsaW5nIGNvbWJpbmF0b3JzXG5cdFx0XHRcdGlmICggKHNlZWQgPSBmaW5kKFxuXHRcdFx0XHRcdHRva2VuLm1hdGNoZXNbMF0ucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKSxcblx0XHRcdFx0XHRyc2libGluZy50ZXN0KCB0b2tlbnNbMF0udHlwZSApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fCBjb250ZXh0XG5cdFx0XHRcdCkpICkge1xuXG5cdFx0XHRcdFx0Ly8gSWYgc2VlZCBpcyBlbXB0eSBvciBubyB0b2tlbnMgcmVtYWluLCB3ZSBjYW4gcmV0dXJuIGVhcmx5XG5cdFx0XHRcdFx0dG9rZW5zLnNwbGljZSggaSwgMSApO1xuXHRcdFx0XHRcdHNlbGVjdG9yID0gc2VlZC5sZW5ndGggJiYgdG9TZWxlY3RvciggdG9rZW5zICk7XG5cdFx0XHRcdFx0aWYgKCAhc2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBzZWVkICk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIENvbXBpbGUgYW5kIGV4ZWN1dGUgYSBmaWx0ZXJpbmcgZnVuY3Rpb24gaWYgb25lIGlzIG5vdCBwcm92aWRlZFxuXHQvLyBQcm92aWRlIGBtYXRjaGAgdG8gYXZvaWQgcmV0b2tlbml6YXRpb24gaWYgd2UgbW9kaWZpZWQgdGhlIHNlbGVjdG9yIGFib3ZlXG5cdCggY29tcGlsZWQgfHwgY29tcGlsZSggc2VsZWN0b3IsIG1hdGNoICkgKShcblx0XHRzZWVkLFxuXHRcdGNvbnRleHQsXG5cdFx0IWRvY3VtZW50SXNIVE1MLFxuXHRcdHJlc3VsdHMsXG5cdFx0IWNvbnRleHQgfHwgcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHwgY29udGV4dFxuXHQpO1xuXHRyZXR1cm4gcmVzdWx0cztcbn07XG5cbi8vIE9uZS10aW1lIGFzc2lnbm1lbnRzXG5cbi8vIFNvcnQgc3RhYmlsaXR5XG5zdXBwb3J0LnNvcnRTdGFibGUgPSBleHBhbmRvLnNwbGl0KFwiXCIpLnNvcnQoIHNvcnRPcmRlciApLmpvaW4oXCJcIikgPT09IGV4cGFuZG87XG5cbi8vIFN1cHBvcnQ6IENocm9tZSAxNC0zNStcbi8vIEFsd2F5cyBhc3N1bWUgZHVwbGljYXRlcyBpZiB0aGV5IGFyZW4ndCBwYXNzZWQgdG8gdGhlIGNvbXBhcmlzb24gZnVuY3Rpb25cbnN1cHBvcnQuZGV0ZWN0RHVwbGljYXRlcyA9ICEhaGFzRHVwbGljYXRlO1xuXG4vLyBJbml0aWFsaXplIGFnYWluc3QgdGhlIGRlZmF1bHQgZG9jdW1lbnRcbnNldERvY3VtZW50KCk7XG5cbi8vIFN1cHBvcnQ6IFdlYmtpdDw1MzcuMzIgLSBTYWZhcmkgNi4wLjMvQ2hyb21lIDI1IChmaXhlZCBpbiBDaHJvbWUgMjcpXG4vLyBEZXRhY2hlZCBub2RlcyBjb25mb3VuZGluZ2x5IGZvbGxvdyAqZWFjaCBvdGhlcipcbnN1cHBvcnQuc29ydERldGFjaGVkID0gYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0Ly8gU2hvdWxkIHJldHVybiAxLCBidXQgcmV0dXJucyA0IChmb2xsb3dpbmcpXG5cdHJldHVybiBlbC5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpICkgJiAxO1xufSk7XG5cbi8vIFN1cHBvcnQ6IElFPDhcbi8vIFByZXZlbnQgYXR0cmlidXRlL3Byb3BlcnR5IFwiaW50ZXJwb2xhdGlvblwiXG4vLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTM2NDI5JTI4VlMuODUlMjkuYXNweFxuaWYgKCAhYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0ZWwuaW5uZXJIVE1MID0gXCI8YSBocmVmPScjJz48L2E+XCI7XG5cdHJldHVybiBlbC5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcImhyZWZcIikgPT09IFwiI1wiIDtcbn0pICkge1xuXHRhZGRIYW5kbGUoIFwidHlwZXxocmVmfGhlaWdodHx3aWR0aFwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUsIG5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJ0eXBlXCIgPyAxIDogMiApO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBkZWZhdWx0VmFsdWUgaW4gcGxhY2Ugb2YgZ2V0QXR0cmlidXRlKFwidmFsdWVcIilcbmlmICggIXN1cHBvcnQuYXR0cmlidXRlcyB8fCAhYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0ZWwuaW5uZXJIVE1MID0gXCI8aW5wdXQvPlwiO1xuXHRlbC5maXJzdENoaWxkLnNldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiLCBcIlwiICk7XG5cdHJldHVybiBlbC5maXJzdENoaWxkLmdldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiICkgPT09IFwiXCI7XG59KSApIHtcblx0YWRkSGFuZGxlKCBcInZhbHVlXCIsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHRpZiAoICFpc1hNTCAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIiApIHtcblx0XHRcdHJldHVybiBlbGVtLmRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0pO1xufVxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBVc2UgZ2V0QXR0cmlidXRlTm9kZSB0byBmZXRjaCBib29sZWFucyB3aGVuIGdldEF0dHJpYnV0ZSBsaWVzXG5pZiAoICFhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRyZXR1cm4gZWwuZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIikgPT0gbnVsbDtcbn0pICkge1xuXHRhZGRIYW5kbGUoIGJvb2xlYW5zLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0dmFyIHZhbDtcblx0XHRpZiAoICFpc1hNTCApIHtcblx0XHRcdHJldHVybiBlbGVtWyBuYW1lIF0gPT09IHRydWUgPyBuYW1lLnRvTG93ZXJDYXNlKCkgOlxuXHRcdFx0XHRcdCh2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKSkgJiYgdmFsLnNwZWNpZmllZCA/XG5cdFx0XHRcdFx0dmFsLnZhbHVlIDpcblx0XHRcdFx0bnVsbDtcblx0XHR9XG5cdH0pO1xufVxuXG5yZXR1cm4gU2l6emxlO1xuXG59KSggd2luZG93ICk7XG5cblxuXG5qUXVlcnkuZmluZCA9IFNpenpsZTtcbmpRdWVyeS5leHByID0gU2l6emxlLnNlbGVjdG9ycztcblxuLy8gRGVwcmVjYXRlZFxualF1ZXJ5LmV4cHJbIFwiOlwiIF0gPSBqUXVlcnkuZXhwci5wc2V1ZG9zO1xualF1ZXJ5LnVuaXF1ZVNvcnQgPSBqUXVlcnkudW5pcXVlID0gU2l6emxlLnVuaXF1ZVNvcnQ7XG5qUXVlcnkudGV4dCA9IFNpenpsZS5nZXRUZXh0O1xualF1ZXJ5LmlzWE1MRG9jID0gU2l6emxlLmlzWE1MO1xualF1ZXJ5LmNvbnRhaW5zID0gU2l6emxlLmNvbnRhaW5zO1xualF1ZXJ5LmVzY2FwZVNlbGVjdG9yID0gU2l6emxlLmVzY2FwZTtcblxuXG5cblxudmFyIGRpciA9IGZ1bmN0aW9uKCBlbGVtLCBkaXIsIHVudGlsICkge1xuXHR2YXIgbWF0Y2hlZCA9IFtdLFxuXHRcdHRydW5jYXRlID0gdW50aWwgIT09IHVuZGVmaW5lZDtcblxuXHR3aGlsZSAoICggZWxlbSA9IGVsZW1bIGRpciBdICkgJiYgZWxlbS5ub2RlVHlwZSAhPT0gOSApIHtcblx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRpZiAoIHRydW5jYXRlICYmIGpRdWVyeSggZWxlbSApLmlzKCB1bnRpbCApICkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdG1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWF0Y2hlZDtcbn07XG5cblxudmFyIHNpYmxpbmdzID0gZnVuY3Rpb24oIG4sIGVsZW0gKSB7XG5cdHZhciBtYXRjaGVkID0gW107XG5cblx0Zm9yICggOyBuOyBuID0gbi5uZXh0U2libGluZyApIHtcblx0XHRpZiAoIG4ubm9kZVR5cGUgPT09IDEgJiYgbiAhPT0gZWxlbSApIHtcblx0XHRcdG1hdGNoZWQucHVzaCggbiApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBtYXRjaGVkO1xufTtcblxuXG52YXIgcm5lZWRzQ29udGV4dCA9IGpRdWVyeS5leHByLm1hdGNoLm5lZWRzQ29udGV4dDtcblxudmFyIHJzaW5nbGVUYWcgPSAoIC9ePChbYS16XVteXFwvXFwwPjpcXHgyMFxcdFxcclxcblxcZl0qKVtcXHgyMFxcdFxcclxcblxcZl0qXFwvPz4oPzo8XFwvXFwxPnwpJC9pICk7XG5cblxuXG52YXIgcmlzU2ltcGxlID0gL14uW146I1xcW1xcLixdKiQvO1xuXG4vLyBJbXBsZW1lbnQgdGhlIGlkZW50aWNhbCBmdW5jdGlvbmFsaXR5IGZvciBmaWx0ZXIgYW5kIG5vdFxuZnVuY3Rpb24gd2lubm93KCBlbGVtZW50cywgcXVhbGlmaWVyLCBub3QgKSB7XG5cdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHF1YWxpZmllciApICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtLCBpICkge1xuXHRcdFx0cmV0dXJuICEhcXVhbGlmaWVyLmNhbGwoIGVsZW0sIGksIGVsZW0gKSAhPT0gbm90O1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIFNpbmdsZSBlbGVtZW50XG5cdGlmICggcXVhbGlmaWVyLm5vZGVUeXBlICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuICggZWxlbSA9PT0gcXVhbGlmaWVyICkgIT09IG5vdDtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBBcnJheWxpa2Ugb2YgZWxlbWVudHMgKGpRdWVyeSwgYXJndW1lbnRzLCBBcnJheSlcblx0aWYgKCB0eXBlb2YgcXVhbGlmaWVyICE9PSBcInN0cmluZ1wiICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuICggaW5kZXhPZi5jYWxsKCBxdWFsaWZpZXIsIGVsZW0gKSA+IC0xICkgIT09IG5vdDtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBTaW1wbGUgc2VsZWN0b3IgdGhhdCBjYW4gYmUgZmlsdGVyZWQgZGlyZWN0bHksIHJlbW92aW5nIG5vbi1FbGVtZW50c1xuXHRpZiAoIHJpc1NpbXBsZS50ZXN0KCBxdWFsaWZpZXIgKSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmZpbHRlciggcXVhbGlmaWVyLCBlbGVtZW50cywgbm90ICk7XG5cdH1cblxuXHQvLyBDb21wbGV4IHNlbGVjdG9yLCBjb21wYXJlIHRoZSB0d28gc2V0cywgcmVtb3Zpbmcgbm9uLUVsZW1lbnRzXG5cdHF1YWxpZmllciA9IGpRdWVyeS5maWx0ZXIoIHF1YWxpZmllciwgZWxlbWVudHMgKTtcblx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuICggaW5kZXhPZi5jYWxsKCBxdWFsaWZpZXIsIGVsZW0gKSA+IC0xICkgIT09IG5vdCAmJiBlbGVtLm5vZGVUeXBlID09PSAxO1xuXHR9ICk7XG59XG5cbmpRdWVyeS5maWx0ZXIgPSBmdW5jdGlvbiggZXhwciwgZWxlbXMsIG5vdCApIHtcblx0dmFyIGVsZW0gPSBlbGVtc1sgMCBdO1xuXG5cdGlmICggbm90ICkge1xuXHRcdGV4cHIgPSBcIjpub3QoXCIgKyBleHByICsgXCIpXCI7XG5cdH1cblxuXHRpZiAoIGVsZW1zLmxlbmd0aCA9PT0gMSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdHJldHVybiBqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoIGVsZW0sIGV4cHIgKSA/IFsgZWxlbSBdIDogW107XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5LmZpbmQubWF0Y2hlcyggZXhwciwgalF1ZXJ5LmdyZXAoIGVsZW1zLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZWxlbS5ub2RlVHlwZSA9PT0gMTtcblx0fSApICk7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGZpbmQ6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgaSwgcmV0LFxuXHRcdFx0bGVuID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRzZWxmID0gdGhpcztcblxuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkoIHNlbGVjdG9yICkuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0XHRpZiAoIGpRdWVyeS5jb250YWlucyggc2VsZlsgaSBdLCB0aGlzICkgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gKSApO1xuXHRcdH1cblxuXHRcdHJldCA9IHRoaXMucHVzaFN0YWNrKCBbXSApO1xuXG5cdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdGpRdWVyeS5maW5kKCBzZWxlY3Rvciwgc2VsZlsgaSBdLCByZXQgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbGVuID4gMSA/IGpRdWVyeS51bmlxdWVTb3J0KCByZXQgKSA6IHJldDtcblx0fSxcblx0ZmlsdGVyOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3coIHRoaXMsIHNlbGVjdG9yIHx8IFtdLCBmYWxzZSApICk7XG5cdH0sXG5cdG5vdDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggd2lubm93KCB0aGlzLCBzZWxlY3RvciB8fCBbXSwgdHJ1ZSApICk7XG5cdH0sXG5cdGlzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuICEhd2lubm93KFxuXHRcdFx0dGhpcyxcblxuXHRcdFx0Ly8gSWYgdGhpcyBpcyBhIHBvc2l0aW9uYWwvcmVsYXRpdmUgc2VsZWN0b3IsIGNoZWNrIG1lbWJlcnNoaXAgaW4gdGhlIHJldHVybmVkIHNldFxuXHRcdFx0Ly8gc28gJChcInA6Zmlyc3RcIikuaXMoXCJwOmxhc3RcIikgd29uJ3QgcmV0dXJuIHRydWUgZm9yIGEgZG9jIHdpdGggdHdvIFwicFwiLlxuXHRcdFx0dHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICYmIHJuZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3IgKSA/XG5cdFx0XHRcdGpRdWVyeSggc2VsZWN0b3IgKSA6XG5cdFx0XHRcdHNlbGVjdG9yIHx8IFtdLFxuXHRcdFx0ZmFsc2Vcblx0XHQpLmxlbmd0aDtcblx0fVxufSApO1xuXG5cbi8vIEluaXRpYWxpemUgYSBqUXVlcnkgb2JqZWN0XG5cblxuLy8gQSBjZW50cmFsIHJlZmVyZW5jZSB0byB0aGUgcm9vdCBqUXVlcnkoZG9jdW1lbnQpXG52YXIgcm9vdGpRdWVyeSxcblxuXHQvLyBBIHNpbXBsZSB3YXkgdG8gY2hlY2sgZm9yIEhUTUwgc3RyaW5nc1xuXHQvLyBQcmlvcml0aXplICNpZCBvdmVyIDx0YWc+IHRvIGF2b2lkIFhTUyB2aWEgbG9jYXRpb24uaGFzaCAoIzk1MjEpXG5cdC8vIFN0cmljdCBIVE1MIHJlY29nbml0aW9uICgjMTEyOTA6IG11c3Qgc3RhcnQgd2l0aCA8KVxuXHQvLyBTaG9ydGN1dCBzaW1wbGUgI2lkIGNhc2UgZm9yIHNwZWVkXG5cdHJxdWlja0V4cHIgPSAvXig/OlxccyooPFtcXHdcXFddKz4pW14+XSp8IyhbXFx3LV0rKSkkLyxcblxuXHRpbml0ID0galF1ZXJ5LmZuLmluaXQgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQsIHJvb3QgKSB7XG5cdFx0dmFyIG1hdGNoLCBlbGVtO1xuXG5cdFx0Ly8gSEFORExFOiAkKFwiXCIpLCAkKG51bGwpLCAkKHVuZGVmaW5lZCksICQoZmFsc2UpXG5cdFx0aWYgKCAhc2VsZWN0b3IgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHQvLyBNZXRob2QgaW5pdCgpIGFjY2VwdHMgYW4gYWx0ZXJuYXRlIHJvb3RqUXVlcnlcblx0XHQvLyBzbyBtaWdyYXRlIGNhbiBzdXBwb3J0IGpRdWVyeS5zdWIgKGdoLTIxMDEpXG5cdFx0cm9vdCA9IHJvb3QgfHwgcm9vdGpRdWVyeTtcblxuXHRcdC8vIEhhbmRsZSBIVE1MIHN0cmluZ3Ncblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGlmICggc2VsZWN0b3JbIDAgXSA9PT0gXCI8XCIgJiZcblx0XHRcdFx0c2VsZWN0b3JbIHNlbGVjdG9yLmxlbmd0aCAtIDEgXSA9PT0gXCI+XCIgJiZcblx0XHRcdFx0c2VsZWN0b3IubGVuZ3RoID49IDMgKSB7XG5cblx0XHRcdFx0Ly8gQXNzdW1lIHRoYXQgc3RyaW5ncyB0aGF0IHN0YXJ0IGFuZCBlbmQgd2l0aCA8PiBhcmUgSFRNTCBhbmQgc2tpcCB0aGUgcmVnZXggY2hlY2tcblx0XHRcdFx0bWF0Y2ggPSBbIG51bGwsIHNlbGVjdG9yLCBudWxsIF07XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYXRjaCBodG1sIG9yIG1ha2Ugc3VyZSBubyBjb250ZXh0IGlzIHNwZWNpZmllZCBmb3IgI2lkXG5cdFx0XHRpZiAoIG1hdGNoICYmICggbWF0Y2hbIDEgXSB8fCAhY29udGV4dCApICkge1xuXG5cdFx0XHRcdC8vIEhBTkRMRTogJChodG1sKSAtPiAkKGFycmF5KVxuXHRcdFx0XHRpZiAoIG1hdGNoWyAxIF0gKSB7XG5cdFx0XHRcdFx0Y29udGV4dCA9IGNvbnRleHQgaW5zdGFuY2VvZiBqUXVlcnkgPyBjb250ZXh0WyAwIF0gOiBjb250ZXh0O1xuXG5cdFx0XHRcdFx0Ly8gT3B0aW9uIHRvIHJ1biBzY3JpcHRzIGlzIHRydWUgZm9yIGJhY2stY29tcGF0XG5cdFx0XHRcdFx0Ly8gSW50ZW50aW9uYWxseSBsZXQgdGhlIGVycm9yIGJlIHRocm93biBpZiBwYXJzZUhUTUwgaXMgbm90IHByZXNlbnRcblx0XHRcdFx0XHRqUXVlcnkubWVyZ2UoIHRoaXMsIGpRdWVyeS5wYXJzZUhUTUwoXG5cdFx0XHRcdFx0XHRtYXRjaFsgMSBdLFxuXHRcdFx0XHRcdFx0Y29udGV4dCAmJiBjb250ZXh0Lm5vZGVUeXBlID8gY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgOiBkb2N1bWVudCxcblx0XHRcdFx0XHRcdHRydWVcblx0XHRcdFx0XHQpICk7XG5cblx0XHRcdFx0XHQvLyBIQU5ETEU6ICQoaHRtbCwgcHJvcHMpXG5cdFx0XHRcdFx0aWYgKCByc2luZ2xlVGFnLnRlc3QoIG1hdGNoWyAxIF0gKSAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdCggY29udGV4dCApICkge1xuXHRcdFx0XHRcdFx0Zm9yICggbWF0Y2ggaW4gY29udGV4dCApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBQcm9wZXJ0aWVzIG9mIGNvbnRleHQgYXJlIGNhbGxlZCBhcyBtZXRob2RzIGlmIHBvc3NpYmxlXG5cdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHRoaXNbIG1hdGNoIF0gKSApIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzWyBtYXRjaCBdKCBjb250ZXh0WyBtYXRjaCBdICk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gLi4uYW5kIG90aGVyd2lzZSBzZXQgYXMgYXR0cmlidXRlc1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuYXR0ciggbWF0Y2gsIGNvbnRleHRbIG1hdGNoIF0gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHRcdC8vIEhBTkRMRTogJCgjaWQpXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBtYXRjaFsgMiBdICk7XG5cblx0XHRcdFx0XHRpZiAoIGVsZW0gKSB7XG5cblx0XHRcdFx0XHRcdC8vIEluamVjdCB0aGUgZWxlbWVudCBkaXJlY3RseSBpbnRvIHRoZSBqUXVlcnkgb2JqZWN0XG5cdFx0XHRcdFx0XHR0aGlzWyAwIF0gPSBlbGVtO1xuXHRcdFx0XHRcdFx0dGhpcy5sZW5ndGggPSAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBIQU5ETEU6ICQoZXhwciwgJCguLi4pKVxuXHRcdFx0fSBlbHNlIGlmICggIWNvbnRleHQgfHwgY29udGV4dC5qcXVlcnkgKSB7XG5cdFx0XHRcdHJldHVybiAoIGNvbnRleHQgfHwgcm9vdCApLmZpbmQoIHNlbGVjdG9yICk7XG5cblx0XHRcdC8vIEhBTkRMRTogJChleHByLCBjb250ZXh0KVxuXHRcdFx0Ly8gKHdoaWNoIGlzIGp1c3QgZXF1aXZhbGVudCB0bzogJChjb250ZXh0KS5maW5kKGV4cHIpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3RvciggY29udGV4dCApLmZpbmQoIHNlbGVjdG9yICk7XG5cdFx0XHR9XG5cblx0XHQvLyBIQU5ETEU6ICQoRE9NRWxlbWVudClcblx0XHR9IGVsc2UgaWYgKCBzZWxlY3Rvci5ub2RlVHlwZSApIHtcblx0XHRcdHRoaXNbIDAgXSA9IHNlbGVjdG9yO1xuXHRcdFx0dGhpcy5sZW5ndGggPSAxO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHQvLyBIQU5ETEU6ICQoZnVuY3Rpb24pXG5cdFx0Ly8gU2hvcnRjdXQgZm9yIGRvY3VtZW50IHJlYWR5XG5cdFx0fSBlbHNlIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHNlbGVjdG9yICkgKSB7XG5cdFx0XHRyZXR1cm4gcm9vdC5yZWFkeSAhPT0gdW5kZWZpbmVkID9cblx0XHRcdFx0cm9vdC5yZWFkeSggc2VsZWN0b3IgKSA6XG5cblx0XHRcdFx0Ly8gRXhlY3V0ZSBpbW1lZGlhdGVseSBpZiByZWFkeSBpcyBub3QgcHJlc2VudFxuXHRcdFx0XHRzZWxlY3RvciggalF1ZXJ5ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGpRdWVyeS5tYWtlQXJyYXkoIHNlbGVjdG9yLCB0aGlzICk7XG5cdH07XG5cbi8vIEdpdmUgdGhlIGluaXQgZnVuY3Rpb24gdGhlIGpRdWVyeSBwcm90b3R5cGUgZm9yIGxhdGVyIGluc3RhbnRpYXRpb25cbmluaXQucHJvdG90eXBlID0galF1ZXJ5LmZuO1xuXG4vLyBJbml0aWFsaXplIGNlbnRyYWwgcmVmZXJlbmNlXG5yb290alF1ZXJ5ID0galF1ZXJ5KCBkb2N1bWVudCApO1xuXG5cbnZhciBycGFyZW50c3ByZXYgPSAvXig/OnBhcmVudHN8cHJldig/OlVudGlsfEFsbCkpLyxcblxuXHQvLyBNZXRob2RzIGd1YXJhbnRlZWQgdG8gcHJvZHVjZSBhIHVuaXF1ZSBzZXQgd2hlbiBzdGFydGluZyBmcm9tIGEgdW5pcXVlIHNldFxuXHRndWFyYW50ZWVkVW5pcXVlID0ge1xuXHRcdGNoaWxkcmVuOiB0cnVlLFxuXHRcdGNvbnRlbnRzOiB0cnVlLFxuXHRcdG5leHQ6IHRydWUsXG5cdFx0cHJldjogdHJ1ZVxuXHR9O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGhhczogZnVuY3Rpb24oIHRhcmdldCApIHtcblx0XHR2YXIgdGFyZ2V0cyA9IGpRdWVyeSggdGFyZ2V0LCB0aGlzICksXG5cdFx0XHRsID0gdGFyZ2V0cy5sZW5ndGg7XG5cblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGpRdWVyeS5jb250YWlucyggdGhpcywgdGFyZ2V0c1sgaSBdICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0Y2xvc2VzdDogZnVuY3Rpb24oIHNlbGVjdG9ycywgY29udGV4dCApIHtcblx0XHR2YXIgY3VyLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRtYXRjaGVkID0gW10sXG5cdFx0XHR0YXJnZXRzID0gdHlwZW9mIHNlbGVjdG9ycyAhPT0gXCJzdHJpbmdcIiAmJiBqUXVlcnkoIHNlbGVjdG9ycyApO1xuXG5cdFx0Ly8gUG9zaXRpb25hbCBzZWxlY3RvcnMgbmV2ZXIgbWF0Y2gsIHNpbmNlIHRoZXJlJ3Mgbm8gX3NlbGVjdGlvbl8gY29udGV4dFxuXHRcdGlmICggIXJuZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3JzICkgKSB7XG5cdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdGZvciAoIGN1ciA9IHRoaXNbIGkgXTsgY3VyICYmIGN1ciAhPT0gY29udGV4dDsgY3VyID0gY3VyLnBhcmVudE5vZGUgKSB7XG5cblx0XHRcdFx0XHQvLyBBbHdheXMgc2tpcCBkb2N1bWVudCBmcmFnbWVudHNcblx0XHRcdFx0XHRpZiAoIGN1ci5ub2RlVHlwZSA8IDExICYmICggdGFyZ2V0cyA/XG5cdFx0XHRcdFx0XHR0YXJnZXRzLmluZGV4KCBjdXIgKSA+IC0xIDpcblxuXHRcdFx0XHRcdFx0Ly8gRG9uJ3QgcGFzcyBub24tZWxlbWVudHMgdG8gU2l6emxlXG5cdFx0XHRcdFx0XHRjdXIubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdFx0XHRcdFx0alF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBjdXIsIHNlbGVjdG9ycyApICkgKSB7XG5cblx0XHRcdFx0XHRcdG1hdGNoZWQucHVzaCggY3VyICk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQubGVuZ3RoID4gMSA/IGpRdWVyeS51bmlxdWVTb3J0KCBtYXRjaGVkICkgOiBtYXRjaGVkICk7XG5cdH0sXG5cblx0Ly8gRGV0ZXJtaW5lIHRoZSBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IHdpdGhpbiB0aGUgc2V0XG5cdGluZGV4OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIE5vIGFyZ3VtZW50LCByZXR1cm4gaW5kZXggaW4gcGFyZW50XG5cdFx0aWYgKCAhZWxlbSApIHtcblx0XHRcdHJldHVybiAoIHRoaXNbIDAgXSAmJiB0aGlzWyAwIF0ucGFyZW50Tm9kZSApID8gdGhpcy5maXJzdCgpLnByZXZBbGwoKS5sZW5ndGggOiAtMTtcblx0XHR9XG5cblx0XHQvLyBJbmRleCBpbiBzZWxlY3RvclxuXHRcdGlmICggdHlwZW9mIGVsZW0gPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gaW5kZXhPZi5jYWxsKCBqUXVlcnkoIGVsZW0gKSwgdGhpc1sgMCBdICk7XG5cdFx0fVxuXG5cdFx0Ly8gTG9jYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZGVzaXJlZCBlbGVtZW50XG5cdFx0cmV0dXJuIGluZGV4T2YuY2FsbCggdGhpcyxcblxuXHRcdFx0Ly8gSWYgaXQgcmVjZWl2ZXMgYSBqUXVlcnkgb2JqZWN0LCB0aGUgZmlyc3QgZWxlbWVudCBpcyB1c2VkXG5cdFx0XHRlbGVtLmpxdWVyeSA/IGVsZW1bIDAgXSA6IGVsZW1cblx0XHQpO1xuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayhcblx0XHRcdGpRdWVyeS51bmlxdWVTb3J0KFxuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIHRoaXMuZ2V0KCksIGpRdWVyeSggc2VsZWN0b3IsIGNvbnRleHQgKSApXG5cdFx0XHQpXG5cdFx0KTtcblx0fSxcblxuXHRhZGRCYWNrOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMuYWRkKCBzZWxlY3RvciA9PSBudWxsID9cblx0XHRcdHRoaXMucHJldk9iamVjdCA6IHRoaXMucHJldk9iamVjdC5maWx0ZXIoIHNlbGVjdG9yIClcblx0XHQpO1xuXHR9XG59ICk7XG5cbmZ1bmN0aW9uIHNpYmxpbmcoIGN1ciwgZGlyICkge1xuXHR3aGlsZSAoICggY3VyID0gY3VyWyBkaXIgXSApICYmIGN1ci5ub2RlVHlwZSAhPT0gMSApIHt9XG5cdHJldHVybiBjdXI7XG59XG5cbmpRdWVyeS5lYWNoKCB7XG5cdHBhcmVudDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRyZXR1cm4gcGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gMTEgPyBwYXJlbnQgOiBudWxsO1xuXHR9LFxuXHRwYXJlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiApO1xuXHR9LFxuXHRwYXJlbnRzVW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiwgdW50aWwgKTtcblx0fSxcblx0bmV4dDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiApO1xuXHR9LFxuXHRwcmV2OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZyggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiApO1xuXHR9LFxuXHRuZXh0QWxsOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcblx0fSxcblx0cHJldkFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiApO1xuXHR9LFxuXHRuZXh0VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIsIHVudGlsICk7XG5cdH0sXG5cdHByZXZVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIsIHVudGlsICk7XG5cdH0sXG5cdHNpYmxpbmdzOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZ3MoICggZWxlbS5wYXJlbnROb2RlIHx8IHt9ICkuZmlyc3RDaGlsZCwgZWxlbSApO1xuXHR9LFxuXHRjaGlsZHJlbjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmdzKCBlbGVtLmZpcnN0Q2hpbGQgKTtcblx0fSxcblx0Y29udGVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBlbGVtLmNvbnRlbnREb2N1bWVudCB8fCBqUXVlcnkubWVyZ2UoIFtdLCBlbGVtLmNoaWxkTm9kZXMgKTtcblx0fVxufSwgZnVuY3Rpb24oIG5hbWUsIGZuICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCB1bnRpbCwgc2VsZWN0b3IgKSB7XG5cdFx0dmFyIG1hdGNoZWQgPSBqUXVlcnkubWFwKCB0aGlzLCBmbiwgdW50aWwgKTtcblxuXHRcdGlmICggbmFtZS5zbGljZSggLTUgKSAhPT0gXCJVbnRpbFwiICkge1xuXHRcdFx0c2VsZWN0b3IgPSB1bnRpbDtcblx0XHR9XG5cblx0XHRpZiAoIHNlbGVjdG9yICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdG1hdGNoZWQgPSBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgbWF0Y2hlZCApO1xuXHRcdH1cblxuXHRcdGlmICggdGhpcy5sZW5ndGggPiAxICkge1xuXG5cdFx0XHQvLyBSZW1vdmUgZHVwbGljYXRlc1xuXHRcdFx0aWYgKCAhZ3VhcmFudGVlZFVuaXF1ZVsgbmFtZSBdICkge1xuXHRcdFx0XHRqUXVlcnkudW5pcXVlU29ydCggbWF0Y2hlZCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXZlcnNlIG9yZGVyIGZvciBwYXJlbnRzKiBhbmQgcHJldi1kZXJpdmF0aXZlc1xuXHRcdFx0aWYgKCBycGFyZW50c3ByZXYudGVzdCggbmFtZSApICkge1xuXHRcdFx0XHRtYXRjaGVkLnJldmVyc2UoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQgKTtcblx0fTtcbn0gKTtcbnZhciBybm90aHRtbHdoaXRlID0gKCAvW15cXHgyMFxcdFxcclxcblxcZl0rL2cgKTtcblxuXG5cbi8vIENvbnZlcnQgU3RyaW5nLWZvcm1hdHRlZCBvcHRpb25zIGludG8gT2JqZWN0LWZvcm1hdHRlZCBvbmVzXG5mdW5jdGlvbiBjcmVhdGVPcHRpb25zKCBvcHRpb25zICkge1xuXHR2YXIgb2JqZWN0ID0ge307XG5cdGpRdWVyeS5lYWNoKCBvcHRpb25zLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW10sIGZ1bmN0aW9uKCBfLCBmbGFnICkge1xuXHRcdG9iamVjdFsgZmxhZyBdID0gdHJ1ZTtcblx0fSApO1xuXHRyZXR1cm4gb2JqZWN0O1xufVxuXG4vKlxuICogQ3JlYXRlIGEgY2FsbGJhY2sgbGlzdCB1c2luZyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gKlxuICpcdG9wdGlvbnM6IGFuIG9wdGlvbmFsIGxpc3Qgb2Ygc3BhY2Utc2VwYXJhdGVkIG9wdGlvbnMgdGhhdCB3aWxsIGNoYW5nZSBob3dcbiAqXHRcdFx0dGhlIGNhbGxiYWNrIGxpc3QgYmVoYXZlcyBvciBhIG1vcmUgdHJhZGl0aW9uYWwgb3B0aW9uIG9iamVjdFxuICpcbiAqIEJ5IGRlZmF1bHQgYSBjYWxsYmFjayBsaXN0IHdpbGwgYWN0IGxpa2UgYW4gZXZlbnQgY2FsbGJhY2sgbGlzdCBhbmQgY2FuIGJlXG4gKiBcImZpcmVkXCIgbXVsdGlwbGUgdGltZXMuXG4gKlxuICogUG9zc2libGUgb3B0aW9uczpcbiAqXG4gKlx0b25jZTpcdFx0XHR3aWxsIGVuc3VyZSB0aGUgY2FsbGJhY2sgbGlzdCBjYW4gb25seSBiZSBmaXJlZCBvbmNlIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdG1lbW9yeTpcdFx0XHR3aWxsIGtlZXAgdHJhY2sgb2YgcHJldmlvdXMgdmFsdWVzIGFuZCB3aWxsIGNhbGwgYW55IGNhbGxiYWNrIGFkZGVkXG4gKlx0XHRcdFx0XHRhZnRlciB0aGUgbGlzdCBoYXMgYmVlbiBmaXJlZCByaWdodCBhd2F5IHdpdGggdGhlIGxhdGVzdCBcIm1lbW9yaXplZFwiXG4gKlx0XHRcdFx0XHR2YWx1ZXMgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKlx0dW5pcXVlOlx0XHRcdHdpbGwgZW5zdXJlIGEgY2FsbGJhY2sgY2FuIG9ubHkgYmUgYWRkZWQgb25jZSAobm8gZHVwbGljYXRlIGluIHRoZSBsaXN0KVxuICpcbiAqXHRzdG9wT25GYWxzZTpcdGludGVycnVwdCBjYWxsaW5ncyB3aGVuIGEgY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICpcbiAqL1xualF1ZXJ5LkNhbGxiYWNrcyA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdC8vIENvbnZlcnQgb3B0aW9ucyBmcm9tIFN0cmluZy1mb3JtYXR0ZWQgdG8gT2JqZWN0LWZvcm1hdHRlZCBpZiBuZWVkZWRcblx0Ly8gKHdlIGNoZWNrIGluIGNhY2hlIGZpcnN0KVxuXHRvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgP1xuXHRcdGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSA6XG5cdFx0alF1ZXJ5LmV4dGVuZCgge30sIG9wdGlvbnMgKTtcblxuXHR2YXIgLy8gRmxhZyB0byBrbm93IGlmIGxpc3QgaXMgY3VycmVudGx5IGZpcmluZ1xuXHRcdGZpcmluZyxcblxuXHRcdC8vIExhc3QgZmlyZSB2YWx1ZSBmb3Igbm9uLWZvcmdldHRhYmxlIGxpc3RzXG5cdFx0bWVtb3J5LFxuXG5cdFx0Ly8gRmxhZyB0byBrbm93IGlmIGxpc3Qgd2FzIGFscmVhZHkgZmlyZWRcblx0XHRmaXJlZCxcblxuXHRcdC8vIEZsYWcgdG8gcHJldmVudCBmaXJpbmdcblx0XHRsb2NrZWQsXG5cblx0XHQvLyBBY3R1YWwgY2FsbGJhY2sgbGlzdFxuXHRcdGxpc3QgPSBbXSxcblxuXHRcdC8vIFF1ZXVlIG9mIGV4ZWN1dGlvbiBkYXRhIGZvciByZXBlYXRhYmxlIGxpc3RzXG5cdFx0cXVldWUgPSBbXSxcblxuXHRcdC8vIEluZGV4IG9mIGN1cnJlbnRseSBmaXJpbmcgY2FsbGJhY2sgKG1vZGlmaWVkIGJ5IGFkZC9yZW1vdmUgYXMgbmVlZGVkKVxuXHRcdGZpcmluZ0luZGV4ID0gLTEsXG5cblx0XHQvLyBGaXJlIGNhbGxiYWNrc1xuXHRcdGZpcmUgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gRW5mb3JjZSBzaW5nbGUtZmlyaW5nXG5cdFx0XHRsb2NrZWQgPSBvcHRpb25zLm9uY2U7XG5cblx0XHRcdC8vIEV4ZWN1dGUgY2FsbGJhY2tzIGZvciBhbGwgcGVuZGluZyBleGVjdXRpb25zLFxuXHRcdFx0Ly8gcmVzcGVjdGluZyBmaXJpbmdJbmRleCBvdmVycmlkZXMgYW5kIHJ1bnRpbWUgY2hhbmdlc1xuXHRcdFx0ZmlyZWQgPSBmaXJpbmcgPSB0cnVlO1xuXHRcdFx0Zm9yICggOyBxdWV1ZS5sZW5ndGg7IGZpcmluZ0luZGV4ID0gLTEgKSB7XG5cdFx0XHRcdG1lbW9yeSA9IHF1ZXVlLnNoaWZ0KCk7XG5cdFx0XHRcdHdoaWxlICggKytmaXJpbmdJbmRleCA8IGxpc3QubGVuZ3RoICkge1xuXG5cdFx0XHRcdFx0Ly8gUnVuIGNhbGxiYWNrIGFuZCBjaGVjayBmb3IgZWFybHkgdGVybWluYXRpb25cblx0XHRcdFx0XHRpZiAoIGxpc3RbIGZpcmluZ0luZGV4IF0uYXBwbHkoIG1lbW9yeVsgMCBdLCBtZW1vcnlbIDEgXSApID09PSBmYWxzZSAmJlxuXHRcdFx0XHRcdFx0b3B0aW9ucy5zdG9wT25GYWxzZSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSnVtcCB0byBlbmQgYW5kIGZvcmdldCB0aGUgZGF0YSBzbyAuYWRkIGRvZXNuJ3QgcmUtZmlyZVxuXHRcdFx0XHRcdFx0ZmlyaW5nSW5kZXggPSBsaXN0Lmxlbmd0aDtcblx0XHRcdFx0XHRcdG1lbW9yeSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBGb3JnZXQgdGhlIGRhdGEgaWYgd2UncmUgZG9uZSB3aXRoIGl0XG5cdFx0XHRpZiAoICFvcHRpb25zLm1lbW9yeSApIHtcblx0XHRcdFx0bWVtb3J5ID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGZpcmluZyA9IGZhbHNlO1xuXG5cdFx0XHQvLyBDbGVhbiB1cCBpZiB3ZSdyZSBkb25lIGZpcmluZyBmb3IgZ29vZFxuXHRcdFx0aWYgKCBsb2NrZWQgKSB7XG5cblx0XHRcdFx0Ly8gS2VlcCBhbiBlbXB0eSBsaXN0IGlmIHdlIGhhdmUgZGF0YSBmb3IgZnV0dXJlIGFkZCBjYWxsc1xuXHRcdFx0XHRpZiAoIG1lbW9yeSApIHtcblx0XHRcdFx0XHRsaXN0ID0gW107XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCB0aGlzIG9iamVjdCBpcyBzcGVudFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxpc3QgPSBcIlwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIEFjdHVhbCBDYWxsYmFja3Mgb2JqZWN0XG5cdFx0c2VsZiA9IHtcblxuXHRcdFx0Ly8gQWRkIGEgY2FsbGJhY2sgb3IgYSBjb2xsZWN0aW9uIG9mIGNhbGxiYWNrcyB0byB0aGUgbGlzdFxuXHRcdFx0YWRkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBsaXN0ICkge1xuXG5cdFx0XHRcdFx0Ly8gSWYgd2UgaGF2ZSBtZW1vcnkgZnJvbSBhIHBhc3QgcnVuLCB3ZSBzaG91bGQgZmlyZSBhZnRlciBhZGRpbmdcblx0XHRcdFx0XHRpZiAoIG1lbW9yeSAmJiAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyaW5nSW5kZXggPSBsaXN0Lmxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBtZW1vcnkgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQoIGZ1bmN0aW9uIGFkZCggYXJncyApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5lYWNoKCBhcmdzLCBmdW5jdGlvbiggXywgYXJnICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBhcmcgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoICFvcHRpb25zLnVuaXF1ZSB8fCAhc2VsZi5oYXMoIGFyZyApICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIGFyZyAmJiBhcmcubGVuZ3RoICYmIGpRdWVyeS50eXBlKCBhcmcgKSAhPT0gXCJzdHJpbmdcIiApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIEluc3BlY3QgcmVjdXJzaXZlbHlcblx0XHRcdFx0XHRcdFx0XHRhZGQoIGFyZyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0fSApKCBhcmd1bWVudHMgKTtcblxuXHRcdFx0XHRcdGlmICggbWVtb3J5ICYmICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRmaXJlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gUmVtb3ZlIGEgY2FsbGJhY2sgZnJvbSB0aGUgbGlzdFxuXHRcdFx0cmVtb3ZlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0alF1ZXJ5LmVhY2goIGFyZ3VtZW50cywgZnVuY3Rpb24oIF8sIGFyZyApIHtcblx0XHRcdFx0XHR2YXIgaW5kZXg7XG5cdFx0XHRcdFx0d2hpbGUgKCAoIGluZGV4ID0galF1ZXJ5LmluQXJyYXkoIGFyZywgbGlzdCwgaW5kZXggKSApID4gLTEgKSB7XG5cdFx0XHRcdFx0XHRsaXN0LnNwbGljZSggaW5kZXgsIDEgKTtcblxuXHRcdFx0XHRcdFx0Ly8gSGFuZGxlIGZpcmluZyBpbmRleGVzXG5cdFx0XHRcdFx0XHRpZiAoIGluZGV4IDw9IGZpcmluZ0luZGV4ICkge1xuXHRcdFx0XHRcdFx0XHRmaXJpbmdJbmRleC0tO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIENoZWNrIGlmIGEgZ2l2ZW4gY2FsbGJhY2sgaXMgaW4gdGhlIGxpc3QuXG5cdFx0XHQvLyBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgcmV0dXJuIHdoZXRoZXIgb3Igbm90IGxpc3QgaGFzIGNhbGxiYWNrcyBhdHRhY2hlZC5cblx0XHRcdGhhczogZnVuY3Rpb24oIGZuICkge1xuXHRcdFx0XHRyZXR1cm4gZm4gP1xuXHRcdFx0XHRcdGpRdWVyeS5pbkFycmF5KCBmbiwgbGlzdCApID4gLTEgOlxuXHRcdFx0XHRcdGxpc3QubGVuZ3RoID4gMDtcblx0XHRcdH0sXG5cblx0XHRcdC8vIFJlbW92ZSBhbGwgY2FsbGJhY2tzIGZyb20gdGhlIGxpc3Rcblx0XHRcdGVtcHR5OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBsaXN0ICkge1xuXHRcdFx0XHRcdGxpc3QgPSBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIERpc2FibGUgLmZpcmUgYW5kIC5hZGRcblx0XHRcdC8vIEFib3J0IGFueSBjdXJyZW50L3BlbmRpbmcgZXhlY3V0aW9uc1xuXHRcdFx0Ly8gQ2xlYXIgYWxsIGNhbGxiYWNrcyBhbmQgdmFsdWVzXG5cdFx0XHRkaXNhYmxlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0bG9ja2VkID0gcXVldWUgPSBbXTtcblx0XHRcdFx0bGlzdCA9IG1lbW9yeSA9IFwiXCI7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdGRpc2FibGVkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICFsaXN0O1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gRGlzYWJsZSAuZmlyZVxuXHRcdFx0Ly8gQWxzbyBkaXNhYmxlIC5hZGQgdW5sZXNzIHdlIGhhdmUgbWVtb3J5IChzaW5jZSBpdCB3b3VsZCBoYXZlIG5vIGVmZmVjdClcblx0XHRcdC8vIEFib3J0IGFueSBwZW5kaW5nIGV4ZWN1dGlvbnNcblx0XHRcdGxvY2s6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsb2NrZWQgPSBxdWV1ZSA9IFtdO1xuXHRcdFx0XHRpZiAoICFtZW1vcnkgJiYgIWZpcmluZyApIHtcblx0XHRcdFx0XHRsaXN0ID0gbWVtb3J5ID0gXCJcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHRsb2NrZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gISFsb2NrZWQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDYWxsIGFsbCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gY29udGV4dCBhbmQgYXJndW1lbnRzXG5cdFx0XHRmaXJlV2l0aDogZnVuY3Rpb24oIGNvbnRleHQsIGFyZ3MgKSB7XG5cdFx0XHRcdGlmICggIWxvY2tlZCApIHtcblx0XHRcdFx0XHRhcmdzID0gYXJncyB8fCBbXTtcblx0XHRcdFx0XHRhcmdzID0gWyBjb250ZXh0LCBhcmdzLnNsaWNlID8gYXJncy5zbGljZSgpIDogYXJncyBdO1xuXHRcdFx0XHRcdHF1ZXVlLnB1c2goIGFyZ3MgKTtcblx0XHRcdFx0XHRpZiAoICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRmaXJlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2FsbCBhbGwgdGhlIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHNcblx0XHRcdGZpcmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLmZpcmVXaXRoKCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBUbyBrbm93IGlmIHRoZSBjYWxsYmFja3MgaGF2ZSBhbHJlYWR5IGJlZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2Vcblx0XHRcdGZpcmVkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICEhZmlyZWQ7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRyZXR1cm4gc2VsZjtcbn07XG5cblxuZnVuY3Rpb24gSWRlbnRpdHkoIHYgKSB7XG5cdHJldHVybiB2O1xufVxuZnVuY3Rpb24gVGhyb3dlciggZXggKSB7XG5cdHRocm93IGV4O1xufVxuXG5mdW5jdGlvbiBhZG9wdFZhbHVlKCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0ICkge1xuXHR2YXIgbWV0aG9kO1xuXG5cdHRyeSB7XG5cblx0XHQvLyBDaGVjayBmb3IgcHJvbWlzZSBhc3BlY3QgZmlyc3QgdG8gcHJpdmlsZWdlIHN5bmNocm9ub3VzIGJlaGF2aW9yXG5cdFx0aWYgKCB2YWx1ZSAmJiBqUXVlcnkuaXNGdW5jdGlvbiggKCBtZXRob2QgPSB2YWx1ZS5wcm9taXNlICkgKSApIHtcblx0XHRcdG1ldGhvZC5jYWxsKCB2YWx1ZSApLmRvbmUoIHJlc29sdmUgKS5mYWlsKCByZWplY3QgKTtcblxuXHRcdC8vIE90aGVyIHRoZW5hYmxlc1xuXHRcdH0gZWxzZSBpZiAoIHZhbHVlICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCAoIG1ldGhvZCA9IHZhbHVlLnRoZW4gKSApICkge1xuXHRcdFx0bWV0aG9kLmNhbGwoIHZhbHVlLCByZXNvbHZlLCByZWplY3QgKTtcblxuXHRcdC8vIE90aGVyIG5vbi10aGVuYWJsZXNcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCBvbmx5XG5cdFx0XHQvLyBTdHJpY3QgbW9kZSBmdW5jdGlvbnMgaW52b2tlZCB3aXRob3V0IC5jYWxsLy5hcHBseSBnZXQgZ2xvYmFsLW9iamVjdCBjb250ZXh0XG5cdFx0XHRyZXNvbHZlLmNhbGwoIHVuZGVmaW5lZCwgdmFsdWUgKTtcblx0XHR9XG5cblx0Ly8gRm9yIFByb21pc2VzL0ErLCBjb252ZXJ0IGV4Y2VwdGlvbnMgaW50byByZWplY3Rpb25zXG5cdC8vIFNpbmNlIGpRdWVyeS53aGVuIGRvZXNuJ3QgdW53cmFwIHRoZW5hYmxlcywgd2UgY2FuIHNraXAgdGhlIGV4dHJhIGNoZWNrcyBhcHBlYXJpbmcgaW5cblx0Ly8gRGVmZXJyZWQjdGhlbiB0byBjb25kaXRpb25hbGx5IHN1cHByZXNzIHJlamVjdGlvbi5cblx0fSBjYXRjaCAoIHZhbHVlICkge1xuXG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAgb25seVxuXHRcdC8vIFN0cmljdCBtb2RlIGZ1bmN0aW9ucyBpbnZva2VkIHdpdGhvdXQgLmNhbGwvLmFwcGx5IGdldCBnbG9iYWwtb2JqZWN0IGNvbnRleHRcblx0XHRyZWplY3QuY2FsbCggdW5kZWZpbmVkLCB2YWx1ZSApO1xuXHR9XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHREZWZlcnJlZDogZnVuY3Rpb24oIGZ1bmMgKSB7XG5cdFx0dmFyIHR1cGxlcyA9IFtcblxuXHRcdFx0XHQvLyBhY3Rpb24sIGFkZCBsaXN0ZW5lciwgY2FsbGJhY2tzLFxuXHRcdFx0XHQvLyAuLi4gLnRoZW4gaGFuZGxlcnMsIGFyZ3VtZW50IGluZGV4LCBbZmluYWwgc3RhdGVdXG5cdFx0XHRcdFsgXCJub3RpZnlcIiwgXCJwcm9ncmVzc1wiLCBqUXVlcnkuQ2FsbGJhY2tzKCBcIm1lbW9yeVwiICksXG5cdFx0XHRcdFx0alF1ZXJ5LkNhbGxiYWNrcyggXCJtZW1vcnlcIiApLCAyIF0sXG5cdFx0XHRcdFsgXCJyZXNvbHZlXCIsIFwiZG9uZVwiLCBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSxcblx0XHRcdFx0XHRqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSwgMCwgXCJyZXNvbHZlZFwiIF0sXG5cdFx0XHRcdFsgXCJyZWplY3RcIiwgXCJmYWlsXCIsIGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLFxuXHRcdFx0XHRcdGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLCAxLCBcInJlamVjdGVkXCIgXVxuXHRcdFx0XSxcblx0XHRcdHN0YXRlID0gXCJwZW5kaW5nXCIsXG5cdFx0XHRwcm9taXNlID0ge1xuXHRcdFx0XHRzdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhbHdheXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGRlZmVycmVkLmRvbmUoIGFyZ3VtZW50cyApLmZhaWwoIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImNhdGNoXCI6IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRcdFx0XHRyZXR1cm4gcHJvbWlzZS50aGVuKCBudWxsLCBmbiApO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIEtlZXAgcGlwZSBmb3IgYmFjay1jb21wYXRcblx0XHRcdFx0cGlwZTogZnVuY3Rpb24oIC8qIGZuRG9uZSwgZm5GYWlsLCBmblByb2dyZXNzICovICkge1xuXHRcdFx0XHRcdHZhciBmbnMgPSBhcmd1bWVudHM7XG5cblx0XHRcdFx0XHRyZXR1cm4galF1ZXJ5LkRlZmVycmVkKCBmdW5jdGlvbiggbmV3RGVmZXIgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gTWFwIHR1cGxlcyAocHJvZ3Jlc3MsIGRvbmUsIGZhaWwpIHRvIGFyZ3VtZW50cyAoZG9uZSwgZmFpbCwgcHJvZ3Jlc3MpXG5cdFx0XHRcdFx0XHRcdHZhciBmbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCBmbnNbIHR1cGxlWyA0IF0gXSApICYmIGZuc1sgdHVwbGVbIDQgXSBdO1xuXG5cdFx0XHRcdFx0XHRcdC8vIGRlZmVycmVkLnByb2dyZXNzKGZ1bmN0aW9uKCkgeyBiaW5kIHRvIG5ld0RlZmVyIG9yIG5ld0RlZmVyLm5vdGlmeSB9KVxuXHRcdFx0XHRcdFx0XHQvLyBkZWZlcnJlZC5kb25lKGZ1bmN0aW9uKCkgeyBiaW5kIHRvIG5ld0RlZmVyIG9yIG5ld0RlZmVyLnJlc29sdmUgfSlcblx0XHRcdFx0XHRcdFx0Ly8gZGVmZXJyZWQuZmFpbChmdW5jdGlvbigpIHsgYmluZCB0byBuZXdEZWZlciBvciBuZXdEZWZlci5yZWplY3QgfSlcblx0XHRcdFx0XHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAxIF0gXSggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJldHVybmVkID0gZm4gJiYgZm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdFx0XHRcdGlmICggcmV0dXJuZWQgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHJldHVybmVkLnByb21pc2UgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkLnByb21pc2UoKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQucHJvZ3Jlc3MoIG5ld0RlZmVyLm5vdGlmeSApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5kb25lKCBuZXdEZWZlci5yZXNvbHZlIClcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmZhaWwoIG5ld0RlZmVyLnJlamVjdCApO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlclsgdHVwbGVbIDAgXSArIFwiV2l0aFwiIF0oXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZuID8gWyByZXR1cm5lZCBdIDogYXJndW1lbnRzXG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdFx0Zm5zID0gbnVsbDtcblx0XHRcdFx0XHR9ICkucHJvbWlzZSgpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR0aGVuOiBmdW5jdGlvbiggb25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIG9uUHJvZ3Jlc3MgKSB7XG5cdFx0XHRcdFx0dmFyIG1heERlcHRoID0gMDtcblx0XHRcdFx0XHRmdW5jdGlvbiByZXNvbHZlKCBkZXB0aCwgZGVmZXJyZWQsIGhhbmRsZXIsIHNwZWNpYWwgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHZhciB0aGF0ID0gdGhpcyxcblx0XHRcdFx0XHRcdFx0XHRhcmdzID0gYXJndW1lbnRzLFxuXHRcdFx0XHRcdFx0XHRcdG1pZ2h0VGhyb3cgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhciByZXR1cm5lZCwgdGhlbjtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuMy4zLjNcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTU5XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBJZ25vcmUgZG91YmxlLXJlc29sdXRpb24gYXR0ZW1wdHNcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggZGVwdGggPCBtYXhEZXB0aCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5lZCA9IGhhbmRsZXIuYXBwbHkoIHRoYXQsIGFyZ3MgKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuMVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNDhcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggcmV0dXJuZWQgPT09IGRlZmVycmVkLnByb21pc2UoKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggXCJUaGVuYWJsZSBzZWxmLXJlc29sdXRpb25cIiApO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9ucyAyLjMuMy4xLCAzLjVcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTU0XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC03NVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gUmV0cmlldmUgYHRoZW5gIG9ubHkgb25jZVxuXHRcdFx0XHRcdFx0XHRcdFx0dGhlbiA9IHJldHVybmVkICYmXG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuNFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC02NFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBPbmx5IGNoZWNrIG9iamVjdHMgYW5kIGZ1bmN0aW9ucyBmb3IgdGhlbmFiaWxpdHlcblx0XHRcdFx0XHRcdFx0XHRcdFx0KCB0eXBlb2YgcmV0dXJuZWQgPT09IFwib2JqZWN0XCIgfHxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlb2YgcmV0dXJuZWQgPT09IFwiZnVuY3Rpb25cIiApICYmXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkLnRoZW47XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIEhhbmRsZSBhIHJldHVybmVkIHRoZW5hYmxlXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB0aGVuICkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3BlY2lhbCBwcm9jZXNzb3JzIChub3RpZnkpIGp1c3Qgd2FpdCBmb3IgcmVzb2x1dGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHNwZWNpYWwgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhlbi5jYWxsKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCBtYXhEZXB0aCwgZGVmZXJyZWQsIElkZW50aXR5LCBzcGVjaWFsICksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCBtYXhEZXB0aCwgZGVmZXJyZWQsIFRocm93ZXIsIHNwZWNpYWwgKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gTm9ybWFsIHByb2Nlc3NvcnMgKHJlc29sdmUpIGFsc28gaG9vayBpbnRvIHByb2dyZXNzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyAuLi5hbmQgZGlzcmVnYXJkIG9sZGVyIHJlc29sdXRpb24gdmFsdWVzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWF4RGVwdGgrKztcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoZW4uY2FsbChcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBJZGVudGl0eSwgc3BlY2lhbCApLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBUaHJvd2VyLCBzcGVjaWFsICksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCBtYXhEZXB0aCwgZGVmZXJyZWQsIElkZW50aXR5LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZWZlcnJlZC5ub3RpZnlXaXRoIClcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIEhhbmRsZSBhbGwgb3RoZXIgcmV0dXJuZWQgdmFsdWVzXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIE9ubHkgc3Vic3RpdHV0ZSBoYW5kbGVycyBwYXNzIG9uIGNvbnRleHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gYW5kIG11bHRpcGxlIHZhbHVlcyAobm9uLXNwZWMgYmVoYXZpb3IpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggaGFuZGxlciAhPT0gSWRlbnRpdHkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhhdCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhcmdzID0gWyByZXR1cm5lZCBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gUHJvY2VzcyB0aGUgdmFsdWUocylcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRGVmYXVsdCBwcm9jZXNzIGlzIHJlc29sdmVcblx0XHRcdFx0XHRcdFx0XHRcdFx0KCBzcGVjaWFsIHx8IGRlZmVycmVkLnJlc29sdmVXaXRoICkoIHRoYXQsIGFyZ3MgKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBub3JtYWwgcHJvY2Vzc29ycyAocmVzb2x2ZSkgY2F0Y2ggYW5kIHJlamVjdCBleGNlcHRpb25zXG5cdFx0XHRcdFx0XHRcdFx0cHJvY2VzcyA9IHNwZWNpYWwgP1xuXHRcdFx0XHRcdFx0XHRcdFx0bWlnaHRUaHJvdyA6XG5cdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtaWdodFRocm93KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuRGVmZXJyZWQuZXhjZXB0aW9uSG9vayApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5EZWZlcnJlZC5leGNlcHRpb25Ib29rKCBlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzLnN0YWNrVHJhY2UgKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9uIDIuMy4zLjMuNC4xXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNjFcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBJZ25vcmUgcG9zdC1yZXNvbHV0aW9uIGV4Y2VwdGlvbnNcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGRlcHRoICsgMSA+PSBtYXhEZXB0aCApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBzdWJzdGl0dXRlIGhhbmRsZXJzIHBhc3Mgb24gY29udGV4dFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gYW5kIG11bHRpcGxlIHZhbHVlcyAobm9uLXNwZWMgYmVoYXZpb3IpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGhhbmRsZXIgIT09IFRocm93ZXIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoYXQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFyZ3MgPSBbIGUgXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0V2l0aCggdGhhdCwgYXJncyApO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9uIDIuMy4zLjMuMVxuXHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC01N1xuXHRcdFx0XHRcdFx0XHQvLyBSZS1yZXNvbHZlIHByb21pc2VzIGltbWVkaWF0ZWx5IHRvIGRvZGdlIGZhbHNlIHJlamVjdGlvbiBmcm9tXG5cdFx0XHRcdFx0XHRcdC8vIHN1YnNlcXVlbnQgZXJyb3JzXG5cdFx0XHRcdFx0XHRcdGlmICggZGVwdGggKSB7XG5cdFx0XHRcdFx0XHRcdFx0cHJvY2VzcygpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gQ2FsbCBhbiBvcHRpb25hbCBob29rIHRvIHJlY29yZCB0aGUgc3RhY2ssIGluIGNhc2Ugb2YgZXhjZXB0aW9uXG5cdFx0XHRcdFx0XHRcdFx0Ly8gc2luY2UgaXQncyBvdGhlcndpc2UgbG9zdCB3aGVuIGV4ZWN1dGlvbiBnb2VzIGFzeW5jXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuRGVmZXJyZWQuZ2V0U3RhY2tIb29rICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzcy5zdGFja1RyYWNlID0galF1ZXJ5LkRlZmVycmVkLmdldFN0YWNrSG9vaygpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dCggcHJvY2VzcyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBqUXVlcnkuRGVmZXJyZWQoIGZ1bmN0aW9uKCBuZXdEZWZlciApIHtcblxuXHRcdFx0XHRcdFx0Ly8gcHJvZ3Jlc3NfaGFuZGxlcnMuYWRkKCAuLi4gKVxuXHRcdFx0XHRcdFx0dHVwbGVzWyAwIF1bIDMgXS5hZGQoXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoXG5cdFx0XHRcdFx0XHRcdFx0MCxcblx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlcixcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuaXNGdW5jdGlvbiggb25Qcm9ncmVzcyApID9cblx0XHRcdFx0XHRcdFx0XHRcdG9uUHJvZ3Jlc3MgOlxuXHRcdFx0XHRcdFx0XHRcdFx0SWRlbnRpdHksXG5cdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXIubm90aWZ5V2l0aFxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHQvLyBmdWxmaWxsZWRfaGFuZGxlcnMuYWRkKCAuLi4gKVxuXHRcdFx0XHRcdFx0dHVwbGVzWyAxIF1bIDMgXS5hZGQoXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoXG5cdFx0XHRcdFx0XHRcdFx0MCxcblx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlcixcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuaXNGdW5jdGlvbiggb25GdWxmaWxsZWQgKSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRvbkZ1bGZpbGxlZCA6XG5cdFx0XHRcdFx0XHRcdFx0XHRJZGVudGl0eVxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHQvLyByZWplY3RlZF9oYW5kbGVycy5hZGQoIC4uLiApXG5cdFx0XHRcdFx0XHR0dXBsZXNbIDIgXVsgMyBdLmFkZChcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZShcblx0XHRcdFx0XHRcdFx0XHQwLFxuXHRcdFx0XHRcdFx0XHRcdG5ld0RlZmVyLFxuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5pc0Z1bmN0aW9uKCBvblJlamVjdGVkICkgP1xuXHRcdFx0XHRcdFx0XHRcdFx0b25SZWplY3RlZCA6XG5cdFx0XHRcdFx0XHRcdFx0XHRUaHJvd2VyXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSApLnByb21pc2UoKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBHZXQgYSBwcm9taXNlIGZvciB0aGlzIGRlZmVycmVkXG5cdFx0XHRcdC8vIElmIG9iaiBpcyBwcm92aWRlZCwgdGhlIHByb21pc2UgYXNwZWN0IGlzIGFkZGVkIHRvIHRoZSBvYmplY3Rcblx0XHRcdFx0cHJvbWlzZTogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRcdFx0XHRyZXR1cm4gb2JqICE9IG51bGwgPyBqUXVlcnkuZXh0ZW5kKCBvYmosIHByb21pc2UgKSA6IHByb21pc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWZlcnJlZCA9IHt9O1xuXG5cdFx0Ly8gQWRkIGxpc3Qtc3BlY2lmaWMgbWV0aG9kc1xuXHRcdGpRdWVyeS5lYWNoKCB0dXBsZXMsIGZ1bmN0aW9uKCBpLCB0dXBsZSApIHtcblx0XHRcdHZhciBsaXN0ID0gdHVwbGVbIDIgXSxcblx0XHRcdFx0c3RhdGVTdHJpbmcgPSB0dXBsZVsgNSBdO1xuXG5cdFx0XHQvLyBwcm9taXNlLnByb2dyZXNzID0gbGlzdC5hZGRcblx0XHRcdC8vIHByb21pc2UuZG9uZSA9IGxpc3QuYWRkXG5cdFx0XHQvLyBwcm9taXNlLmZhaWwgPSBsaXN0LmFkZFxuXHRcdFx0cHJvbWlzZVsgdHVwbGVbIDEgXSBdID0gbGlzdC5hZGQ7XG5cblx0XHRcdC8vIEhhbmRsZSBzdGF0ZVxuXHRcdFx0aWYgKCBzdGF0ZVN0cmluZyApIHtcblx0XHRcdFx0bGlzdC5hZGQoXG5cdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdC8vIHN0YXRlID0gXCJyZXNvbHZlZFwiIChpLmUuLCBmdWxmaWxsZWQpXG5cdFx0XHRcdFx0XHQvLyBzdGF0ZSA9IFwicmVqZWN0ZWRcIlxuXHRcdFx0XHRcdFx0c3RhdGUgPSBzdGF0ZVN0cmluZztcblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0Ly8gcmVqZWN0ZWRfY2FsbGJhY2tzLmRpc2FibGVcblx0XHRcdFx0XHQvLyBmdWxmaWxsZWRfY2FsbGJhY2tzLmRpc2FibGVcblx0XHRcdFx0XHR0dXBsZXNbIDMgLSBpIF1bIDIgXS5kaXNhYmxlLFxuXG5cdFx0XHRcdFx0Ly8gcHJvZ3Jlc3NfY2FsbGJhY2tzLmxvY2tcblx0XHRcdFx0XHR0dXBsZXNbIDAgXVsgMiBdLmxvY2tcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gcHJvZ3Jlc3NfaGFuZGxlcnMuZmlyZVxuXHRcdFx0Ly8gZnVsZmlsbGVkX2hhbmRsZXJzLmZpcmVcblx0XHRcdC8vIHJlamVjdGVkX2hhbmRsZXJzLmZpcmVcblx0XHRcdGxpc3QuYWRkKCB0dXBsZVsgMyBdLmZpcmUgKTtcblxuXHRcdFx0Ly8gZGVmZXJyZWQubm90aWZ5ID0gZnVuY3Rpb24oKSB7IGRlZmVycmVkLm5vdGlmeVdpdGgoLi4uKSB9XG5cdFx0XHQvLyBkZWZlcnJlZC5yZXNvbHZlID0gZnVuY3Rpb24oKSB7IGRlZmVycmVkLnJlc29sdmVXaXRoKC4uLikgfVxuXHRcdFx0Ly8gZGVmZXJyZWQucmVqZWN0ID0gZnVuY3Rpb24oKSB7IGRlZmVycmVkLnJlamVjdFdpdGgoLi4uKSB9XG5cdFx0XHRkZWZlcnJlZFsgdHVwbGVbIDAgXSBdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRlZmVycmVkWyB0dXBsZVsgMCBdICsgXCJXaXRoXCIgXSggdGhpcyA9PT0gZGVmZXJyZWQgPyB1bmRlZmluZWQgOiB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBkZWZlcnJlZC5ub3RpZnlXaXRoID0gbGlzdC5maXJlV2l0aFxuXHRcdFx0Ly8gZGVmZXJyZWQucmVzb2x2ZVdpdGggPSBsaXN0LmZpcmVXaXRoXG5cdFx0XHQvLyBkZWZlcnJlZC5yZWplY3RXaXRoID0gbGlzdC5maXJlV2l0aFxuXHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAwIF0gKyBcIldpdGhcIiBdID0gbGlzdC5maXJlV2l0aDtcblx0XHR9ICk7XG5cblx0XHQvLyBNYWtlIHRoZSBkZWZlcnJlZCBhIHByb21pc2Vcblx0XHRwcm9taXNlLnByb21pc2UoIGRlZmVycmVkICk7XG5cblx0XHQvLyBDYWxsIGdpdmVuIGZ1bmMgaWYgYW55XG5cdFx0aWYgKCBmdW5jICkge1xuXHRcdFx0ZnVuYy5jYWxsKCBkZWZlcnJlZCwgZGVmZXJyZWQgKTtcblx0XHR9XG5cblx0XHQvLyBBbGwgZG9uZSFcblx0XHRyZXR1cm4gZGVmZXJyZWQ7XG5cdH0sXG5cblx0Ly8gRGVmZXJyZWQgaGVscGVyXG5cdHdoZW46IGZ1bmN0aW9uKCBzaW5nbGVWYWx1ZSApIHtcblx0XHR2YXJcblxuXHRcdFx0Ly8gY291bnQgb2YgdW5jb21wbGV0ZWQgc3Vib3JkaW5hdGVzXG5cdFx0XHRyZW1haW5pbmcgPSBhcmd1bWVudHMubGVuZ3RoLFxuXG5cdFx0XHQvLyBjb3VudCBvZiB1bnByb2Nlc3NlZCBhcmd1bWVudHNcblx0XHRcdGkgPSByZW1haW5pbmcsXG5cblx0XHRcdC8vIHN1Ym9yZGluYXRlIGZ1bGZpbGxtZW50IGRhdGFcblx0XHRcdHJlc29sdmVDb250ZXh0cyA9IEFycmF5KCBpICksXG5cdFx0XHRyZXNvbHZlVmFsdWVzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzICksXG5cblx0XHRcdC8vIHRoZSBtYXN0ZXIgRGVmZXJyZWRcblx0XHRcdG1hc3RlciA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuXG5cdFx0XHQvLyBzdWJvcmRpbmF0ZSBjYWxsYmFjayBmYWN0b3J5XG5cdFx0XHR1cGRhdGVGdW5jID0gZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZUNvbnRleHRzWyBpIF0gPSB0aGlzO1xuXHRcdFx0XHRcdHJlc29sdmVWYWx1ZXNbIGkgXSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gc2xpY2UuY2FsbCggYXJndW1lbnRzICkgOiB2YWx1ZTtcblx0XHRcdFx0XHRpZiAoICEoIC0tcmVtYWluaW5nICkgKSB7XG5cdFx0XHRcdFx0XHRtYXN0ZXIucmVzb2x2ZVdpdGgoIHJlc29sdmVDb250ZXh0cywgcmVzb2x2ZVZhbHVlcyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH07XG5cblx0XHQvLyBTaW5nbGUtIGFuZCBlbXB0eSBhcmd1bWVudHMgYXJlIGFkb3B0ZWQgbGlrZSBQcm9taXNlLnJlc29sdmVcblx0XHRpZiAoIHJlbWFpbmluZyA8PSAxICkge1xuXHRcdFx0YWRvcHRWYWx1ZSggc2luZ2xlVmFsdWUsIG1hc3Rlci5kb25lKCB1cGRhdGVGdW5jKCBpICkgKS5yZXNvbHZlLCBtYXN0ZXIucmVqZWN0ICk7XG5cblx0XHRcdC8vIFVzZSAudGhlbigpIHRvIHVud3JhcCBzZWNvbmRhcnkgdGhlbmFibGVzIChjZi4gZ2gtMzAwMClcblx0XHRcdGlmICggbWFzdGVyLnN0YXRlKCkgPT09IFwicGVuZGluZ1wiIHx8XG5cdFx0XHRcdGpRdWVyeS5pc0Z1bmN0aW9uKCByZXNvbHZlVmFsdWVzWyBpIF0gJiYgcmVzb2x2ZVZhbHVlc1sgaSBdLnRoZW4gKSApIHtcblxuXHRcdFx0XHRyZXR1cm4gbWFzdGVyLnRoZW4oKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBNdWx0aXBsZSBhcmd1bWVudHMgYXJlIGFnZ3JlZ2F0ZWQgbGlrZSBQcm9taXNlLmFsbCBhcnJheSBlbGVtZW50c1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0YWRvcHRWYWx1ZSggcmVzb2x2ZVZhbHVlc1sgaSBdLCB1cGRhdGVGdW5jKCBpICksIG1hc3Rlci5yZWplY3QgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWFzdGVyLnByb21pc2UoKTtcblx0fVxufSApO1xuXG5cbi8vIFRoZXNlIHVzdWFsbHkgaW5kaWNhdGUgYSBwcm9ncmFtbWVyIG1pc3Rha2UgZHVyaW5nIGRldmVsb3BtZW50LFxuLy8gd2FybiBhYm91dCB0aGVtIEFTQVAgcmF0aGVyIHRoYW4gc3dhbGxvd2luZyB0aGVtIGJ5IGRlZmF1bHQuXG52YXIgcmVycm9yTmFtZXMgPSAvXihFdmFsfEludGVybmFsfFJhbmdlfFJlZmVyZW5jZXxTeW50YXh8VHlwZXxVUkkpRXJyb3IkLztcblxualF1ZXJ5LkRlZmVycmVkLmV4Y2VwdGlvbkhvb2sgPSBmdW5jdGlvbiggZXJyb3IsIHN0YWNrICkge1xuXG5cdC8vIFN1cHBvcnQ6IElFIDggLSA5IG9ubHlcblx0Ly8gQ29uc29sZSBleGlzdHMgd2hlbiBkZXYgdG9vbHMgYXJlIG9wZW4sIHdoaWNoIGNhbiBoYXBwZW4gYXQgYW55IHRpbWVcblx0aWYgKCB3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS53YXJuICYmIGVycm9yICYmIHJlcnJvck5hbWVzLnRlc3QoIGVycm9yLm5hbWUgKSApIHtcblx0XHR3aW5kb3cuY29uc29sZS53YXJuKCBcImpRdWVyeS5EZWZlcnJlZCBleGNlcHRpb246IFwiICsgZXJyb3IubWVzc2FnZSwgZXJyb3Iuc3RhY2ssIHN0YWNrICk7XG5cdH1cbn07XG5cblxuXG5cbmpRdWVyeS5yZWFkeUV4Y2VwdGlvbiA9IGZ1bmN0aW9uKCBlcnJvciApIHtcblx0d2luZG93LnNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdHRocm93IGVycm9yO1xuXHR9ICk7XG59O1xuXG5cblxuXG4vLyBUaGUgZGVmZXJyZWQgdXNlZCBvbiBET00gcmVhZHlcbnZhciByZWFkeUxpc3QgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxualF1ZXJ5LmZuLnJlYWR5ID0gZnVuY3Rpb24oIGZuICkge1xuXG5cdHJlYWR5TGlzdFxuXHRcdC50aGVuKCBmbiApXG5cblx0XHQvLyBXcmFwIGpRdWVyeS5yZWFkeUV4Y2VwdGlvbiBpbiBhIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIGxvb2t1cFxuXHRcdC8vIGhhcHBlbnMgYXQgdGhlIHRpbWUgb2YgZXJyb3IgaGFuZGxpbmcgaW5zdGVhZCBvZiBjYWxsYmFja1xuXHRcdC8vIHJlZ2lzdHJhdGlvbi5cblx0XHQuY2F0Y2goIGZ1bmN0aW9uKCBlcnJvciApIHtcblx0XHRcdGpRdWVyeS5yZWFkeUV4Y2VwdGlvbiggZXJyb3IgKTtcblx0XHR9ICk7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0Ly8gSXMgdGhlIERPTSByZWFkeSB0byBiZSB1c2VkPyBTZXQgdG8gdHJ1ZSBvbmNlIGl0IG9jY3Vycy5cblx0aXNSZWFkeTogZmFsc2UsXG5cblx0Ly8gQSBjb3VudGVyIHRvIHRyYWNrIGhvdyBtYW55IGl0ZW1zIHRvIHdhaXQgZm9yIGJlZm9yZVxuXHQvLyB0aGUgcmVhZHkgZXZlbnQgZmlyZXMuIFNlZSAjNjc4MVxuXHRyZWFkeVdhaXQ6IDEsXG5cblx0Ly8gSG9sZCAob3IgcmVsZWFzZSkgdGhlIHJlYWR5IGV2ZW50XG5cdGhvbGRSZWFkeTogZnVuY3Rpb24oIGhvbGQgKSB7XG5cdFx0aWYgKCBob2xkICkge1xuXHRcdFx0alF1ZXJ5LnJlYWR5V2FpdCsrO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRqUXVlcnkucmVhZHkoIHRydWUgKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gSGFuZGxlIHdoZW4gdGhlIERPTSBpcyByZWFkeVxuXHRyZWFkeTogZnVuY3Rpb24oIHdhaXQgKSB7XG5cblx0XHQvLyBBYm9ydCBpZiB0aGVyZSBhcmUgcGVuZGluZyBob2xkcyBvciB3ZSdyZSBhbHJlYWR5IHJlYWR5XG5cdFx0aWYgKCB3YWl0ID09PSB0cnVlID8gLS1qUXVlcnkucmVhZHlXYWl0IDogalF1ZXJ5LmlzUmVhZHkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gUmVtZW1iZXIgdGhhdCB0aGUgRE9NIGlzIHJlYWR5XG5cdFx0alF1ZXJ5LmlzUmVhZHkgPSB0cnVlO1xuXG5cdFx0Ly8gSWYgYSBub3JtYWwgRE9NIFJlYWR5IGV2ZW50IGZpcmVkLCBkZWNyZW1lbnQsIGFuZCB3YWl0IGlmIG5lZWQgYmVcblx0XHRpZiAoIHdhaXQgIT09IHRydWUgJiYgLS1qUXVlcnkucmVhZHlXYWl0ID4gMCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGVyZSBhcmUgZnVuY3Rpb25zIGJvdW5kLCB0byBleGVjdXRlXG5cdFx0cmVhZHlMaXN0LnJlc29sdmVXaXRoKCBkb2N1bWVudCwgWyBqUXVlcnkgXSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5yZWFkeS50aGVuID0gcmVhZHlMaXN0LnRoZW47XG5cbi8vIFRoZSByZWFkeSBldmVudCBoYW5kbGVyIGFuZCBzZWxmIGNsZWFudXAgbWV0aG9kXG5mdW5jdGlvbiBjb21wbGV0ZWQoKSB7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiLCBjb21wbGV0ZWQgKTtcblx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBjb21wbGV0ZWQgKTtcblx0alF1ZXJ5LnJlYWR5KCk7XG59XG5cbi8vIENhdGNoIGNhc2VzIHdoZXJlICQoZG9jdW1lbnQpLnJlYWR5KCkgaXMgY2FsbGVkXG4vLyBhZnRlciB0aGUgYnJvd3NlciBldmVudCBoYXMgYWxyZWFkeSBvY2N1cnJlZC5cbi8vIFN1cHBvcnQ6IElFIDw9OSAtIDEwIG9ubHlcbi8vIE9sZGVyIElFIHNvbWV0aW1lcyBzaWduYWxzIFwiaW50ZXJhY3RpdmVcIiB0b28gc29vblxuaWYgKCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgfHxcblx0KCBkb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIiAmJiAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsICkgKSB7XG5cblx0Ly8gSGFuZGxlIGl0IGFzeW5jaHJvbm91c2x5IHRvIGFsbG93IHNjcmlwdHMgdGhlIG9wcG9ydHVuaXR5IHRvIGRlbGF5IHJlYWR5XG5cdHdpbmRvdy5zZXRUaW1lb3V0KCBqUXVlcnkucmVhZHkgKTtcblxufSBlbHNlIHtcblxuXHQvLyBVc2UgdGhlIGhhbmR5IGV2ZW50IGNhbGxiYWNrXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiLCBjb21wbGV0ZWQgKTtcblxuXHQvLyBBIGZhbGxiYWNrIHRvIHdpbmRvdy5vbmxvYWQsIHRoYXQgd2lsbCBhbHdheXMgd29ya1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCApO1xufVxuXG5cblxuXG4vLyBNdWx0aWZ1bmN0aW9uYWwgbWV0aG9kIHRvIGdldCBhbmQgc2V0IHZhbHVlcyBvZiBhIGNvbGxlY3Rpb25cbi8vIFRoZSB2YWx1ZS9zIGNhbiBvcHRpb25hbGx5IGJlIGV4ZWN1dGVkIGlmIGl0J3MgYSBmdW5jdGlvblxudmFyIGFjY2VzcyA9IGZ1bmN0aW9uKCBlbGVtcywgZm4sIGtleSwgdmFsdWUsIGNoYWluYWJsZSwgZW1wdHlHZXQsIHJhdyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IGVsZW1zLmxlbmd0aCxcblx0XHRidWxrID0ga2V5ID09IG51bGw7XG5cblx0Ly8gU2V0cyBtYW55IHZhbHVlc1xuXHRpZiAoIGpRdWVyeS50eXBlKCBrZXkgKSA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRjaGFpbmFibGUgPSB0cnVlO1xuXHRcdGZvciAoIGkgaW4ga2V5ICkge1xuXHRcdFx0YWNjZXNzKCBlbGVtcywgZm4sIGksIGtleVsgaSBdLCB0cnVlLCBlbXB0eUdldCwgcmF3ICk7XG5cdFx0fVxuXG5cdC8vIFNldHMgb25lIHZhbHVlXG5cdH0gZWxzZSBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0Y2hhaW5hYmxlID0gdHJ1ZTtcblxuXHRcdGlmICggIWpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmF3ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoIGJ1bGsgKSB7XG5cblx0XHRcdC8vIEJ1bGsgb3BlcmF0aW9ucyBydW4gYWdhaW5zdCB0aGUgZW50aXJlIHNldFxuXHRcdFx0aWYgKCByYXcgKSB7XG5cdFx0XHRcdGZuLmNhbGwoIGVsZW1zLCB2YWx1ZSApO1xuXHRcdFx0XHRmbiA9IG51bGw7XG5cblx0XHRcdC8vIC4uLmV4Y2VwdCB3aGVuIGV4ZWN1dGluZyBmdW5jdGlvbiB2YWx1ZXNcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJ1bGsgPSBmbjtcblx0XHRcdFx0Zm4gPSBmdW5jdGlvbiggZWxlbSwga2V5LCB2YWx1ZSApIHtcblx0XHRcdFx0XHRyZXR1cm4gYnVsay5jYWxsKCBqUXVlcnkoIGVsZW0gKSwgdmFsdWUgKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIGZuICkge1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdGZuKFxuXHRcdFx0XHRcdGVsZW1zWyBpIF0sIGtleSwgcmF3ID9cblx0XHRcdFx0XHR2YWx1ZSA6XG5cdFx0XHRcdFx0dmFsdWUuY2FsbCggZWxlbXNbIGkgXSwgaSwgZm4oIGVsZW1zWyBpIF0sIGtleSApIClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZiAoIGNoYWluYWJsZSApIHtcblx0XHRyZXR1cm4gZWxlbXM7XG5cdH1cblxuXHQvLyBHZXRzXG5cdGlmICggYnVsayApIHtcblx0XHRyZXR1cm4gZm4uY2FsbCggZWxlbXMgKTtcblx0fVxuXG5cdHJldHVybiBsZW4gPyBmbiggZWxlbXNbIDAgXSwga2V5ICkgOiBlbXB0eUdldDtcbn07XG52YXIgYWNjZXB0RGF0YSA9IGZ1bmN0aW9uKCBvd25lciApIHtcblxuXHQvLyBBY2NlcHRzIG9ubHk6XG5cdC8vICAtIE5vZGVcblx0Ly8gICAgLSBOb2RlLkVMRU1FTlRfTk9ERVxuXHQvLyAgICAtIE5vZGUuRE9DVU1FTlRfTk9ERVxuXHQvLyAgLSBPYmplY3Rcblx0Ly8gICAgLSBBbnlcblx0cmV0dXJuIG93bmVyLm5vZGVUeXBlID09PSAxIHx8IG93bmVyLm5vZGVUeXBlID09PSA5IHx8ICEoICtvd25lci5ub2RlVHlwZSApO1xufTtcblxuXG5cblxuZnVuY3Rpb24gRGF0YSgpIHtcblx0dGhpcy5leHBhbmRvID0galF1ZXJ5LmV4cGFuZG8gKyBEYXRhLnVpZCsrO1xufVxuXG5EYXRhLnVpZCA9IDE7XG5cbkRhdGEucHJvdG90eXBlID0ge1xuXG5cdGNhY2hlOiBmdW5jdGlvbiggb3duZXIgKSB7XG5cblx0XHQvLyBDaGVjayBpZiB0aGUgb3duZXIgb2JqZWN0IGFscmVhZHkgaGFzIGEgY2FjaGVcblx0XHR2YXIgdmFsdWUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cblx0XHQvLyBJZiBub3QsIGNyZWF0ZSBvbmVcblx0XHRpZiAoICF2YWx1ZSApIHtcblx0XHRcdHZhbHVlID0ge307XG5cblx0XHRcdC8vIFdlIGNhbiBhY2NlcHQgZGF0YSBmb3Igbm9uLWVsZW1lbnQgbm9kZXMgaW4gbW9kZXJuIGJyb3dzZXJzLFxuXHRcdFx0Ly8gYnV0IHdlIHNob3VsZCBub3QsIHNlZSAjODMzNS5cblx0XHRcdC8vIEFsd2F5cyByZXR1cm4gYW4gZW1wdHkgb2JqZWN0LlxuXHRcdFx0aWYgKCBhY2NlcHREYXRhKCBvd25lciApICkge1xuXG5cdFx0XHRcdC8vIElmIGl0IGlzIGEgbm9kZSB1bmxpa2VseSB0byBiZSBzdHJpbmdpZnktZWQgb3IgbG9vcGVkIG92ZXJcblx0XHRcdFx0Ly8gdXNlIHBsYWluIGFzc2lnbm1lbnRcblx0XHRcdFx0aWYgKCBvd25lci5ub2RlVHlwZSApIHtcblx0XHRcdFx0XHRvd25lclsgdGhpcy5leHBhbmRvIF0gPSB2YWx1ZTtcblxuXHRcdFx0XHQvLyBPdGhlcndpc2Ugc2VjdXJlIGl0IGluIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHlcblx0XHRcdFx0Ly8gY29uZmlndXJhYmxlIG11c3QgYmUgdHJ1ZSB0byBhbGxvdyB0aGUgcHJvcGVydHkgdG8gYmVcblx0XHRcdFx0Ly8gZGVsZXRlZCB3aGVuIGRhdGEgaXMgcmVtb3ZlZFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggb3duZXIsIHRoaXMuZXhwYW5kbywge1xuXHRcdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlXG5cdFx0XHRcdFx0fSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKCBvd25lciwgZGF0YSwgdmFsdWUgKSB7XG5cdFx0dmFyIHByb3AsXG5cdFx0XHRjYWNoZSA9IHRoaXMuY2FjaGUoIG93bmVyICk7XG5cblx0XHQvLyBIYW5kbGU6IFsgb3duZXIsIGtleSwgdmFsdWUgXSBhcmdzXG5cdFx0Ly8gQWx3YXlzIHVzZSBjYW1lbENhc2Uga2V5IChnaC0yMjU3KVxuXHRcdGlmICggdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRjYWNoZVsgalF1ZXJ5LmNhbWVsQ2FzZSggZGF0YSApIF0gPSB2YWx1ZTtcblxuXHRcdC8vIEhhbmRsZTogWyBvd25lciwgeyBwcm9wZXJ0aWVzIH0gXSBhcmdzXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gQ29weSB0aGUgcHJvcGVydGllcyBvbmUtYnktb25lIHRvIHRoZSBjYWNoZSBvYmplY3Rcblx0XHRcdGZvciAoIHByb3AgaW4gZGF0YSApIHtcblx0XHRcdFx0Y2FjaGVbIGpRdWVyeS5jYW1lbENhc2UoIHByb3AgKSBdID0gZGF0YVsgcHJvcCBdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gY2FjaGU7XG5cdH0sXG5cdGdldDogZnVuY3Rpb24oIG93bmVyLCBrZXkgKSB7XG5cdFx0cmV0dXJuIGtleSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdHRoaXMuY2FjaGUoIG93bmVyICkgOlxuXG5cdFx0XHQvLyBBbHdheXMgdXNlIGNhbWVsQ2FzZSBrZXkgKGdoLTIyNTcpXG5cdFx0XHRvd25lclsgdGhpcy5leHBhbmRvIF0gJiYgb3duZXJbIHRoaXMuZXhwYW5kbyBdWyBqUXVlcnkuY2FtZWxDYXNlKCBrZXkgKSBdO1xuXHR9LFxuXHRhY2Nlc3M6IGZ1bmN0aW9uKCBvd25lciwga2V5LCB2YWx1ZSApIHtcblxuXHRcdC8vIEluIGNhc2VzIHdoZXJlIGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gTm8ga2V5IHdhcyBzcGVjaWZpZWRcblx0XHQvLyAgIDIuIEEgc3RyaW5nIGtleSB3YXMgc3BlY2lmaWVkLCBidXQgbm8gdmFsdWUgcHJvdmlkZWRcblx0XHQvL1xuXHRcdC8vIFRha2UgdGhlIFwicmVhZFwiIHBhdGggYW5kIGFsbG93IHRoZSBnZXQgbWV0aG9kIHRvIGRldGVybWluZVxuXHRcdC8vIHdoaWNoIHZhbHVlIHRvIHJldHVybiwgcmVzcGVjdGl2ZWx5IGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gVGhlIGVudGlyZSBjYWNoZSBvYmplY3Rcblx0XHQvLyAgIDIuIFRoZSBkYXRhIHN0b3JlZCBhdCB0aGUga2V5XG5cdFx0Ly9cblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdCggKCBrZXkgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiApICYmIHZhbHVlID09PSB1bmRlZmluZWQgKSApIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0KCBvd25lciwga2V5ICk7XG5cdFx0fVxuXG5cdFx0Ly8gV2hlbiB0aGUga2V5IGlzIG5vdCBhIHN0cmluZywgb3IgYm90aCBhIGtleSBhbmQgdmFsdWVcblx0XHQvLyBhcmUgc3BlY2lmaWVkLCBzZXQgb3IgZXh0ZW5kIChleGlzdGluZyBvYmplY3RzKSB3aXRoIGVpdGhlcjpcblx0XHQvL1xuXHRcdC8vICAgMS4gQW4gb2JqZWN0IG9mIHByb3BlcnRpZXNcblx0XHQvLyAgIDIuIEEga2V5IGFuZCB2YWx1ZVxuXHRcdC8vXG5cdFx0dGhpcy5zZXQoIG93bmVyLCBrZXksIHZhbHVlICk7XG5cblx0XHQvLyBTaW5jZSB0aGUgXCJzZXRcIiBwYXRoIGNhbiBoYXZlIHR3byBwb3NzaWJsZSBlbnRyeSBwb2ludHNcblx0XHQvLyByZXR1cm4gdGhlIGV4cGVjdGVkIGRhdGEgYmFzZWQgb24gd2hpY2ggcGF0aCB3YXMgdGFrZW5bKl1cblx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoga2V5O1xuXHR9LFxuXHRyZW1vdmU6IGZ1bmN0aW9uKCBvd25lciwga2V5ICkge1xuXHRcdHZhciBpLFxuXHRcdFx0Y2FjaGUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cblx0XHRpZiAoIGNhY2hlID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCBrZXkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Ly8gU3VwcG9ydCBhcnJheSBvciBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG9mIGtleXNcblx0XHRcdGlmICggalF1ZXJ5LmlzQXJyYXkoIGtleSApICkge1xuXG5cdFx0XHRcdC8vIElmIGtleSBpcyBhbiBhcnJheSBvZiBrZXlzLi4uXG5cdFx0XHRcdC8vIFdlIGFsd2F5cyBzZXQgY2FtZWxDYXNlIGtleXMsIHNvIHJlbW92ZSB0aGF0LlxuXHRcdFx0XHRrZXkgPSBrZXkubWFwKCBqUXVlcnkuY2FtZWxDYXNlICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRrZXkgPSBqUXVlcnkuY2FtZWxDYXNlKCBrZXkgKTtcblxuXHRcdFx0XHQvLyBJZiBhIGtleSB3aXRoIHRoZSBzcGFjZXMgZXhpc3RzLCB1c2UgaXQuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSwgY3JlYXRlIGFuIGFycmF5IGJ5IG1hdGNoaW5nIG5vbi13aGl0ZXNwYWNlXG5cdFx0XHRcdGtleSA9IGtleSBpbiBjYWNoZSA/XG5cdFx0XHRcdFx0WyBrZXkgXSA6XG5cdFx0XHRcdFx0KCBrZXkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXSApO1xuXHRcdFx0fVxuXG5cdFx0XHRpID0ga2V5Lmxlbmd0aDtcblxuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGRlbGV0ZSBjYWNoZVsga2V5WyBpIF0gXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgdGhlIGV4cGFuZG8gaWYgdGhlcmUncyBubyBtb3JlIGRhdGFcblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkIHx8IGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBjYWNoZSApICkge1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWUgPD0zNSAtIDQ1XG5cdFx0XHQvLyBXZWJraXQgJiBCbGluayBwZXJmb3JtYW5jZSBzdWZmZXJzIHdoZW4gZGVsZXRpbmcgcHJvcGVydGllc1xuXHRcdFx0Ly8gZnJvbSBET00gbm9kZXMsIHNvIHNldCB0byB1bmRlZmluZWQgaW5zdGVhZFxuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9Mzc4NjA3IChidWcgcmVzdHJpY3RlZClcblx0XHRcdGlmICggb3duZXIubm9kZVR5cGUgKSB7XG5cdFx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSA9IHVuZGVmaW5lZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlbGV0ZSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRoYXNEYXRhOiBmdW5jdGlvbiggb3duZXIgKSB7XG5cdFx0dmFyIGNhY2hlID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXHRcdHJldHVybiBjYWNoZSAhPT0gdW5kZWZpbmVkICYmICFqUXVlcnkuaXNFbXB0eU9iamVjdCggY2FjaGUgKTtcblx0fVxufTtcbnZhciBkYXRhUHJpdiA9IG5ldyBEYXRhKCk7XG5cbnZhciBkYXRhVXNlciA9IG5ldyBEYXRhKCk7XG5cblxuXG4vL1x0SW1wbGVtZW50YXRpb24gU3VtbWFyeVxuLy9cbi8vXHQxLiBFbmZvcmNlIEFQSSBzdXJmYWNlIGFuZCBzZW1hbnRpYyBjb21wYXRpYmlsaXR5IHdpdGggMS45LnggYnJhbmNoXG4vL1x0Mi4gSW1wcm92ZSB0aGUgbW9kdWxlJ3MgbWFpbnRhaW5hYmlsaXR5IGJ5IHJlZHVjaW5nIHRoZSBzdG9yYWdlXG4vL1x0XHRwYXRocyB0byBhIHNpbmdsZSBtZWNoYW5pc20uXG4vL1x0My4gVXNlIHRoZSBzYW1lIHNpbmdsZSBtZWNoYW5pc20gdG8gc3VwcG9ydCBcInByaXZhdGVcIiBhbmQgXCJ1c2VyXCIgZGF0YS5cbi8vXHQ0LiBfTmV2ZXJfIGV4cG9zZSBcInByaXZhdGVcIiBkYXRhIHRvIHVzZXIgY29kZSAoVE9ETzogRHJvcCBfZGF0YSwgX3JlbW92ZURhdGEpXG4vL1x0NS4gQXZvaWQgZXhwb3NpbmcgaW1wbGVtZW50YXRpb24gZGV0YWlscyBvbiB1c2VyIG9iamVjdHMgKGVnLiBleHBhbmRvIHByb3BlcnRpZXMpXG4vL1x0Ni4gUHJvdmlkZSBhIGNsZWFyIHBhdGggZm9yIGltcGxlbWVudGF0aW9uIHVwZ3JhZGUgdG8gV2Vha01hcCBpbiAyMDE0XG5cbnZhciByYnJhY2UgPSAvXig/Olxce1tcXHdcXFddKlxcfXxcXFtbXFx3XFxXXSpcXF0pJC8sXG5cdHJtdWx0aURhc2ggPSAvW0EtWl0vZztcblxuZnVuY3Rpb24gZ2V0RGF0YSggZGF0YSApIHtcblx0aWYgKCBkYXRhID09PSBcInRydWVcIiApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGlmICggZGF0YSA9PT0gXCJmYWxzZVwiICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGlmICggZGF0YSA9PT0gXCJudWxsXCIgKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvLyBPbmx5IGNvbnZlcnQgdG8gYSBudW1iZXIgaWYgaXQgZG9lc24ndCBjaGFuZ2UgdGhlIHN0cmluZ1xuXHRpZiAoIGRhdGEgPT09ICtkYXRhICsgXCJcIiApIHtcblx0XHRyZXR1cm4gK2RhdGE7XG5cdH1cblxuXHRpZiAoIHJicmFjZS50ZXN0KCBkYXRhICkgKSB7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoIGRhdGEgKTtcblx0fVxuXG5cdHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBkYXRhQXR0ciggZWxlbSwga2V5LCBkYXRhICkge1xuXHR2YXIgbmFtZTtcblxuXHQvLyBJZiBub3RoaW5nIHdhcyBmb3VuZCBpbnRlcm5hbGx5LCB0cnkgdG8gZmV0Y2ggYW55XG5cdC8vIGRhdGEgZnJvbSB0aGUgSFRNTDUgZGF0YS0qIGF0dHJpYnV0ZVxuXHRpZiAoIGRhdGEgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdG5hbWUgPSBcImRhdGEtXCIgKyBrZXkucmVwbGFjZSggcm11bHRpRGFzaCwgXCItJCZcIiApLnRvTG93ZXJDYXNlKCk7XG5cdFx0ZGF0YSA9IGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICk7XG5cblx0XHRpZiAoIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZGF0YSA9IGdldERhdGEoIGRhdGEgKTtcblx0XHRcdH0gY2F0Y2ggKCBlICkge31cblxuXHRcdFx0Ly8gTWFrZSBzdXJlIHdlIHNldCB0aGUgZGF0YSBzbyBpdCBpc24ndCBjaGFuZ2VkIGxhdGVyXG5cdFx0XHRkYXRhVXNlci5zZXQoIGVsZW0sIGtleSwgZGF0YSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZGF0YTtcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXHRoYXNEYXRhOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGF0YVVzZXIuaGFzRGF0YSggZWxlbSApIHx8IGRhdGFQcml2Lmhhc0RhdGEoIGVsZW0gKTtcblx0fSxcblxuXHRkYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gZGF0YVVzZXIuYWNjZXNzKCBlbGVtLCBuYW1lLCBkYXRhICk7XG5cdH0sXG5cblx0cmVtb3ZlRGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0ZGF0YVVzZXIucmVtb3ZlKCBlbGVtLCBuYW1lICk7XG5cdH0sXG5cblx0Ly8gVE9ETzogTm93IHRoYXQgYWxsIGNhbGxzIHRvIF9kYXRhIGFuZCBfcmVtb3ZlRGF0YSBoYXZlIGJlZW4gcmVwbGFjZWRcblx0Ly8gd2l0aCBkaXJlY3QgY2FsbHMgdG8gZGF0YVByaXYgbWV0aG9kcywgdGhlc2UgY2FuIGJlIGRlcHJlY2F0ZWQuXG5cdF9kYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gZGF0YVByaXYuYWNjZXNzKCBlbGVtLCBuYW1lLCBkYXRhICk7XG5cdH0sXG5cblx0X3JlbW92ZURhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdGRhdGFQcml2LnJlbW92ZSggZWxlbSwgbmFtZSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0ZGF0YTogZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG5cdFx0dmFyIGksIG5hbWUsIGRhdGEsXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdLFxuXHRcdFx0YXR0cnMgPSBlbGVtICYmIGVsZW0uYXR0cmlidXRlcztcblxuXHRcdC8vIEdldHMgYWxsIHZhbHVlc1xuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRpZiAoIHRoaXMubGVuZ3RoICkge1xuXHRcdFx0XHRkYXRhID0gZGF0YVVzZXIuZ2V0KCBlbGVtICk7XG5cblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmICFkYXRhUHJpdi5nZXQoIGVsZW0sIFwiaGFzRGF0YUF0dHJzXCIgKSApIHtcblx0XHRcdFx0XHRpID0gYXR0cnMubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSBvbmx5XG5cdFx0XHRcdFx0XHQvLyBUaGUgYXR0cnMgZWxlbWVudHMgY2FuIGJlIG51bGwgKCMxNDg5NClcblx0XHRcdFx0XHRcdGlmICggYXR0cnNbIGkgXSApIHtcblx0XHRcdFx0XHRcdFx0bmFtZSA9IGF0dHJzWyBpIF0ubmFtZTtcblx0XHRcdFx0XHRcdFx0aWYgKCBuYW1lLmluZGV4T2YoIFwiZGF0YS1cIiApID09PSAwICkge1xuXHRcdFx0XHRcdFx0XHRcdG5hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lLnNsaWNlKCA1ICkgKTtcblx0XHRcdFx0XHRcdFx0XHRkYXRhQXR0ciggZWxlbSwgbmFtZSwgZGF0YVsgbmFtZSBdICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGF0YVByaXYuc2V0KCBlbGVtLCBcImhhc0RhdGFBdHRyc1wiLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0cyBtdWx0aXBsZSB2YWx1ZXNcblx0XHRpZiAoIHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZGF0YVVzZXIuc2V0KCB0aGlzLCBrZXkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgZGF0YTtcblxuXHRcdFx0Ly8gVGhlIGNhbGxpbmcgalF1ZXJ5IG9iamVjdCAoZWxlbWVudCBtYXRjaGVzKSBpcyBub3QgZW1wdHlcblx0XHRcdC8vIChhbmQgdGhlcmVmb3JlIGhhcyBhbiBlbGVtZW50IGFwcGVhcnMgYXQgdGhpc1sgMCBdKSBhbmQgdGhlXG5cdFx0XHQvLyBgdmFsdWVgIHBhcmFtZXRlciB3YXMgbm90IHVuZGVmaW5lZC4gQW4gZW1wdHkgalF1ZXJ5IG9iamVjdFxuXHRcdFx0Ly8gd2lsbCByZXN1bHQgaW4gYHVuZGVmaW5lZGAgZm9yIGVsZW0gPSB0aGlzWyAwIF0gd2hpY2ggd2lsbFxuXHRcdFx0Ly8gdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFuIGF0dGVtcHQgdG8gcmVhZCBhIGRhdGEgY2FjaGUgaXMgbWFkZS5cblx0XHRcdGlmICggZWxlbSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdC8vIEF0dGVtcHQgdG8gZ2V0IGRhdGEgZnJvbSB0aGUgY2FjaGVcblx0XHRcdFx0Ly8gVGhlIGtleSB3aWxsIGFsd2F5cyBiZSBjYW1lbENhc2VkIGluIERhdGFcblx0XHRcdFx0ZGF0YSA9IGRhdGFVc2VyLmdldCggZWxlbSwga2V5ICk7XG5cdFx0XHRcdGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQXR0ZW1wdCB0byBcImRpc2NvdmVyXCIgdGhlIGRhdGEgaW5cblx0XHRcdFx0Ly8gSFRNTDUgY3VzdG9tIGRhdGEtKiBhdHRyc1xuXHRcdFx0XHRkYXRhID0gZGF0YUF0dHIoIGVsZW0sIGtleSApO1xuXHRcdFx0XHRpZiAoIGRhdGEgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFdlIHRyaWVkIHJlYWxseSBoYXJkLCBidXQgdGhlIGRhdGEgZG9lc24ndCBleGlzdC5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgdGhlIGRhdGEuLi5cblx0XHRcdHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0Ly8gV2UgYWx3YXlzIHN0b3JlIHRoZSBjYW1lbENhc2VkIGtleVxuXHRcdFx0XHRkYXRhVXNlci5zZXQoIHRoaXMsIGtleSwgdmFsdWUgKTtcblx0XHRcdH0gKTtcblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEsIG51bGwsIHRydWUgKTtcblx0fSxcblxuXHRyZW1vdmVEYXRhOiBmdW5jdGlvbigga2V5ICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZGF0YVVzZXIucmVtb3ZlKCB0aGlzLCBrZXkgKTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdHF1ZXVlOiBmdW5jdGlvbiggZWxlbSwgdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgcXVldWU7XG5cblx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHR0eXBlID0gKCB0eXBlIHx8IFwiZnhcIiApICsgXCJxdWV1ZVwiO1xuXHRcdFx0cXVldWUgPSBkYXRhUHJpdi5nZXQoIGVsZW0sIHR5cGUgKTtcblxuXHRcdFx0Ly8gU3BlZWQgdXAgZGVxdWV1ZSBieSBnZXR0aW5nIG91dCBxdWlja2x5IGlmIHRoaXMgaXMganVzdCBhIGxvb2t1cFxuXHRcdFx0aWYgKCBkYXRhICkge1xuXHRcdFx0XHRpZiAoICFxdWV1ZSB8fCBqUXVlcnkuaXNBcnJheSggZGF0YSApICkge1xuXHRcdFx0XHRcdHF1ZXVlID0gZGF0YVByaXYuYWNjZXNzKCBlbGVtLCB0eXBlLCBqUXVlcnkubWFrZUFycmF5KCBkYXRhICkgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBkYXRhICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBxdWV1ZSB8fCBbXTtcblx0XHR9XG5cdH0sXG5cblx0ZGVxdWV1ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0dmFyIHF1ZXVlID0galF1ZXJ5LnF1ZXVlKCBlbGVtLCB0eXBlICksXG5cdFx0XHRzdGFydExlbmd0aCA9IHF1ZXVlLmxlbmd0aCxcblx0XHRcdGZuID0gcXVldWUuc2hpZnQoKSxcblx0XHRcdGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCB0eXBlICksXG5cdFx0XHRuZXh0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGpRdWVyeS5kZXF1ZXVlKCBlbGVtLCB0eXBlICk7XG5cdFx0XHR9O1xuXG5cdFx0Ly8gSWYgdGhlIGZ4IHF1ZXVlIGlzIGRlcXVldWVkLCBhbHdheXMgcmVtb3ZlIHRoZSBwcm9ncmVzcyBzZW50aW5lbFxuXHRcdGlmICggZm4gPT09IFwiaW5wcm9ncmVzc1wiICkge1xuXHRcdFx0Zm4gPSBxdWV1ZS5zaGlmdCgpO1xuXHRcdFx0c3RhcnRMZW5ndGgtLTtcblx0XHR9XG5cblx0XHRpZiAoIGZuICkge1xuXG5cdFx0XHQvLyBBZGQgYSBwcm9ncmVzcyBzZW50aW5lbCB0byBwcmV2ZW50IHRoZSBmeCBxdWV1ZSBmcm9tIGJlaW5nXG5cdFx0XHQvLyBhdXRvbWF0aWNhbGx5IGRlcXVldWVkXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwiZnhcIiApIHtcblx0XHRcdFx0cXVldWUudW5zaGlmdCggXCJpbnByb2dyZXNzXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2xlYXIgdXAgdGhlIGxhc3QgcXVldWUgc3RvcCBmdW5jdGlvblxuXHRcdFx0ZGVsZXRlIGhvb2tzLnN0b3A7XG5cdFx0XHRmbi5jYWxsKCBlbGVtLCBuZXh0LCBob29rcyApO1xuXHRcdH1cblxuXHRcdGlmICggIXN0YXJ0TGVuZ3RoICYmIGhvb2tzICkge1xuXHRcdFx0aG9va3MuZW1wdHkuZmlyZSgpO1xuXHRcdH1cblx0fSxcblxuXHQvLyBOb3QgcHVibGljIC0gZ2VuZXJhdGUgYSBxdWV1ZUhvb2tzIG9iamVjdCwgb3IgcmV0dXJuIHRoZSBjdXJyZW50IG9uZVxuXHRfcXVldWVIb29rczogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG5cdFx0dmFyIGtleSA9IHR5cGUgKyBcInF1ZXVlSG9va3NcIjtcblx0XHRyZXR1cm4gZGF0YVByaXYuZ2V0KCBlbGVtLCBrZXkgKSB8fCBkYXRhUHJpdi5hY2Nlc3MoIGVsZW0sIGtleSwge1xuXHRcdFx0ZW1wdHk6IGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLmFkZCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRhdGFQcml2LnJlbW92ZSggZWxlbSwgWyB0eXBlICsgXCJxdWV1ZVwiLCBrZXkgXSApO1xuXHRcdFx0fSApXG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0cXVldWU6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHRcdHZhciBzZXR0ZXIgPSAyO1xuXG5cdFx0aWYgKCB0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGRhdGEgPSB0eXBlO1xuXHRcdFx0dHlwZSA9IFwiZnhcIjtcblx0XHRcdHNldHRlci0tO1xuXHRcdH1cblxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCA8IHNldHRlciApIHtcblx0XHRcdHJldHVybiBqUXVlcnkucXVldWUoIHRoaXNbIDAgXSwgdHlwZSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBkYXRhID09PSB1bmRlZmluZWQgP1xuXHRcdFx0dGhpcyA6XG5cdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgcXVldWUgPSBqUXVlcnkucXVldWUoIHRoaXMsIHR5cGUsIGRhdGEgKTtcblxuXHRcdFx0XHQvLyBFbnN1cmUgYSBob29rcyBmb3IgdGhpcyBxdWV1ZVxuXHRcdFx0XHRqUXVlcnkuX3F1ZXVlSG9va3MoIHRoaXMsIHR5cGUgKTtcblxuXHRcdFx0XHRpZiAoIHR5cGUgPT09IFwiZnhcIiAmJiBxdWV1ZVsgMCBdICE9PSBcImlucHJvZ3Jlc3NcIiApIHtcblx0XHRcdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdH0sXG5cdGRlcXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcblx0XHR9ICk7XG5cdH0sXG5cdGNsZWFyUXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlIHx8IFwiZnhcIiwgW10gKTtcblx0fSxcblxuXHQvLyBHZXQgYSBwcm9taXNlIHJlc29sdmVkIHdoZW4gcXVldWVzIG9mIGEgY2VydGFpbiB0eXBlXG5cdC8vIGFyZSBlbXB0aWVkIChmeCBpcyB0aGUgdHlwZSBieSBkZWZhdWx0KVxuXHRwcm9taXNlOiBmdW5jdGlvbiggdHlwZSwgb2JqICkge1xuXHRcdHZhciB0bXAsXG5cdFx0XHRjb3VudCA9IDEsXG5cdFx0XHRkZWZlciA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuXHRcdFx0ZWxlbWVudHMgPSB0aGlzLFxuXHRcdFx0aSA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0cmVzb2x2ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoICEoIC0tY291bnQgKSApIHtcblx0XHRcdFx0XHRkZWZlci5yZXNvbHZlV2l0aCggZWxlbWVudHMsIFsgZWxlbWVudHMgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0aWYgKCB0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdG9iaiA9IHR5cGU7XG5cdFx0XHR0eXBlID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHR0eXBlID0gdHlwZSB8fCBcImZ4XCI7XG5cblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdHRtcCA9IGRhdGFQcml2LmdldCggZWxlbWVudHNbIGkgXSwgdHlwZSArIFwicXVldWVIb29rc1wiICk7XG5cdFx0XHRpZiAoIHRtcCAmJiB0bXAuZW1wdHkgKSB7XG5cdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdHRtcC5lbXB0eS5hZGQoIHJlc29sdmUgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmVzb2x2ZSgpO1xuXHRcdHJldHVybiBkZWZlci5wcm9taXNlKCBvYmogKTtcblx0fVxufSApO1xudmFyIHBudW0gPSAoIC9bKy1dPyg/OlxcZCpcXC58KVxcZCsoPzpbZUVdWystXT9cXGQrfCkvICkuc291cmNlO1xuXG52YXIgcmNzc051bSA9IG5ldyBSZWdFeHAoIFwiXig/OihbKy1dKT18KShcIiArIHBudW0gKyBcIikoW2EteiVdKikkXCIsIFwiaVwiICk7XG5cblxudmFyIGNzc0V4cGFuZCA9IFsgXCJUb3BcIiwgXCJSaWdodFwiLCBcIkJvdHRvbVwiLCBcIkxlZnRcIiBdO1xuXG52YXIgaXNIaWRkZW5XaXRoaW5UcmVlID0gZnVuY3Rpb24oIGVsZW0sIGVsICkge1xuXG5cdFx0Ly8gaXNIaWRkZW5XaXRoaW5UcmVlIG1pZ2h0IGJlIGNhbGxlZCBmcm9tIGpRdWVyeSNmaWx0ZXIgZnVuY3Rpb247XG5cdFx0Ly8gaW4gdGhhdCBjYXNlLCBlbGVtZW50IHdpbGwgYmUgc2Vjb25kIGFyZ3VtZW50XG5cdFx0ZWxlbSA9IGVsIHx8IGVsZW07XG5cblx0XHQvLyBJbmxpbmUgc3R5bGUgdHJ1bXBzIGFsbFxuXHRcdHJldHVybiBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiIHx8XG5cdFx0XHRlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwiXCIgJiZcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlLCBjaGVjayBjb21wdXRlZCBzdHlsZVxuXHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveCA8PTQzIC0gNDVcblx0XHRcdC8vIERpc2Nvbm5lY3RlZCBlbGVtZW50cyBjYW4gaGF2ZSBjb21wdXRlZCBkaXNwbGF5OiBub25lLCBzbyBmaXJzdCBjb25maXJtIHRoYXQgZWxlbSBpc1xuXHRcdFx0Ly8gaW4gdGhlIGRvY3VtZW50LlxuXHRcdFx0alF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKSAmJlxuXG5cdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApID09PSBcIm5vbmVcIjtcblx0fTtcblxudmFyIHN3YXAgPSBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgY2FsbGJhY2ssIGFyZ3MgKSB7XG5cdHZhciByZXQsIG5hbWUsXG5cdFx0b2xkID0ge307XG5cblx0Ly8gUmVtZW1iZXIgdGhlIG9sZCB2YWx1ZXMsIGFuZCBpbnNlcnQgdGhlIG5ldyBvbmVzXG5cdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRvbGRbIG5hbWUgXSA9IGVsZW0uc3R5bGVbIG5hbWUgXTtcblx0XHRlbGVtLnN0eWxlWyBuYW1lIF0gPSBvcHRpb25zWyBuYW1lIF07XG5cdH1cblxuXHRyZXQgPSBjYWxsYmFjay5hcHBseSggZWxlbSwgYXJncyB8fCBbXSApO1xuXG5cdC8vIFJldmVydCB0aGUgb2xkIHZhbHVlc1xuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gb2xkWyBuYW1lIF07XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufTtcblxuXG5cblxuZnVuY3Rpb24gYWRqdXN0Q1NTKCBlbGVtLCBwcm9wLCB2YWx1ZVBhcnRzLCB0d2VlbiApIHtcblx0dmFyIGFkanVzdGVkLFxuXHRcdHNjYWxlID0gMSxcblx0XHRtYXhJdGVyYXRpb25zID0gMjAsXG5cdFx0Y3VycmVudFZhbHVlID0gdHdlZW4gP1xuXHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB0d2Vlbi5jdXIoKTtcblx0XHRcdH0gOlxuXHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBqUXVlcnkuY3NzKCBlbGVtLCBwcm9wLCBcIlwiICk7XG5cdFx0XHR9LFxuXHRcdGluaXRpYWwgPSBjdXJyZW50VmFsdWUoKSxcblx0XHR1bml0ID0gdmFsdWVQYXJ0cyAmJiB2YWx1ZVBhcnRzWyAzIF0gfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gPyBcIlwiIDogXCJweFwiICksXG5cblx0XHQvLyBTdGFydGluZyB2YWx1ZSBjb21wdXRhdGlvbiBpcyByZXF1aXJlZCBmb3IgcG90ZW50aWFsIHVuaXQgbWlzbWF0Y2hlc1xuXHRcdGluaXRpYWxJblVuaXQgPSAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSB8fCB1bml0ICE9PSBcInB4XCIgJiYgK2luaXRpYWwgKSAmJlxuXHRcdFx0cmNzc051bS5leGVjKCBqUXVlcnkuY3NzKCBlbGVtLCBwcm9wICkgKTtcblxuXHRpZiAoIGluaXRpYWxJblVuaXQgJiYgaW5pdGlhbEluVW5pdFsgMyBdICE9PSB1bml0ICkge1xuXG5cdFx0Ly8gVHJ1c3QgdW5pdHMgcmVwb3J0ZWQgYnkgalF1ZXJ5LmNzc1xuXHRcdHVuaXQgPSB1bml0IHx8IGluaXRpYWxJblVuaXRbIDMgXTtcblxuXHRcdC8vIE1ha2Ugc3VyZSB3ZSB1cGRhdGUgdGhlIHR3ZWVuIHByb3BlcnRpZXMgbGF0ZXIgb25cblx0XHR2YWx1ZVBhcnRzID0gdmFsdWVQYXJ0cyB8fCBbXTtcblxuXHRcdC8vIEl0ZXJhdGl2ZWx5IGFwcHJveGltYXRlIGZyb20gYSBub256ZXJvIHN0YXJ0aW5nIHBvaW50XG5cdFx0aW5pdGlhbEluVW5pdCA9ICtpbml0aWFsIHx8IDE7XG5cblx0XHRkbyB7XG5cblx0XHRcdC8vIElmIHByZXZpb3VzIGl0ZXJhdGlvbiB6ZXJvZWQgb3V0LCBkb3VibGUgdW50aWwgd2UgZ2V0ICpzb21ldGhpbmcqLlxuXHRcdFx0Ly8gVXNlIHN0cmluZyBmb3IgZG91Ymxpbmcgc28gd2UgZG9uJ3QgYWNjaWRlbnRhbGx5IHNlZSBzY2FsZSBhcyB1bmNoYW5nZWQgYmVsb3dcblx0XHRcdHNjYWxlID0gc2NhbGUgfHwgXCIuNVwiO1xuXG5cdFx0XHQvLyBBZGp1c3QgYW5kIGFwcGx5XG5cdFx0XHRpbml0aWFsSW5Vbml0ID0gaW5pdGlhbEluVW5pdCAvIHNjYWxlO1xuXHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wLCBpbml0aWFsSW5Vbml0ICsgdW5pdCApO1xuXG5cdFx0Ly8gVXBkYXRlIHNjYWxlLCB0b2xlcmF0aW5nIHplcm8gb3IgTmFOIGZyb20gdHdlZW4uY3VyKClcblx0XHQvLyBCcmVhayB0aGUgbG9vcCBpZiBzY2FsZSBpcyB1bmNoYW5nZWQgb3IgcGVyZmVjdCwgb3IgaWYgd2UndmUganVzdCBoYWQgZW5vdWdoLlxuXHRcdH0gd2hpbGUgKFxuXHRcdFx0c2NhbGUgIT09ICggc2NhbGUgPSBjdXJyZW50VmFsdWUoKSAvIGluaXRpYWwgKSAmJiBzY2FsZSAhPT0gMSAmJiAtLW1heEl0ZXJhdGlvbnNcblx0XHQpO1xuXHR9XG5cblx0aWYgKCB2YWx1ZVBhcnRzICkge1xuXHRcdGluaXRpYWxJblVuaXQgPSAraW5pdGlhbEluVW5pdCB8fCAraW5pdGlhbCB8fCAwO1xuXG5cdFx0Ly8gQXBwbHkgcmVsYXRpdmUgb2Zmc2V0ICgrPS8tPSkgaWYgc3BlY2lmaWVkXG5cdFx0YWRqdXN0ZWQgPSB2YWx1ZVBhcnRzWyAxIF0gP1xuXHRcdFx0aW5pdGlhbEluVW5pdCArICggdmFsdWVQYXJ0c1sgMSBdICsgMSApICogdmFsdWVQYXJ0c1sgMiBdIDpcblx0XHRcdCt2YWx1ZVBhcnRzWyAyIF07XG5cdFx0aWYgKCB0d2VlbiApIHtcblx0XHRcdHR3ZWVuLnVuaXQgPSB1bml0O1xuXHRcdFx0dHdlZW4uc3RhcnQgPSBpbml0aWFsSW5Vbml0O1xuXHRcdFx0dHdlZW4uZW5kID0gYWRqdXN0ZWQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBhZGp1c3RlZDtcbn1cblxuXG52YXIgZGVmYXVsdERpc3BsYXlNYXAgPSB7fTtcblxuZnVuY3Rpb24gZ2V0RGVmYXVsdERpc3BsYXkoIGVsZW0gKSB7XG5cdHZhciB0ZW1wLFxuXHRcdGRvYyA9IGVsZW0ub3duZXJEb2N1bWVudCxcblx0XHRub2RlTmFtZSA9IGVsZW0ubm9kZU5hbWUsXG5cdFx0ZGlzcGxheSA9IGRlZmF1bHREaXNwbGF5TWFwWyBub2RlTmFtZSBdO1xuXG5cdGlmICggZGlzcGxheSApIHtcblx0XHRyZXR1cm4gZGlzcGxheTtcblx0fVxuXG5cdHRlbXAgPSBkb2MuYm9keS5hcHBlbmRDaGlsZCggZG9jLmNyZWF0ZUVsZW1lbnQoIG5vZGVOYW1lICkgKTtcblx0ZGlzcGxheSA9IGpRdWVyeS5jc3MoIHRlbXAsIFwiZGlzcGxheVwiICk7XG5cblx0dGVtcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCB0ZW1wICk7XG5cblx0aWYgKCBkaXNwbGF5ID09PSBcIm5vbmVcIiApIHtcblx0XHRkaXNwbGF5ID0gXCJibG9ja1wiO1xuXHR9XG5cdGRlZmF1bHREaXNwbGF5TWFwWyBub2RlTmFtZSBdID0gZGlzcGxheTtcblxuXHRyZXR1cm4gZGlzcGxheTtcbn1cblxuZnVuY3Rpb24gc2hvd0hpZGUoIGVsZW1lbnRzLCBzaG93ICkge1xuXHR2YXIgZGlzcGxheSwgZWxlbSxcblx0XHR2YWx1ZXMgPSBbXSxcblx0XHRpbmRleCA9IDAsXG5cdFx0bGVuZ3RoID0gZWxlbWVudHMubGVuZ3RoO1xuXG5cdC8vIERldGVybWluZSBuZXcgZGlzcGxheSB2YWx1ZSBmb3IgZWxlbWVudHMgdGhhdCBuZWVkIHRvIGNoYW5nZVxuXHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdGVsZW0gPSBlbGVtZW50c1sgaW5kZXggXTtcblx0XHRpZiAoICFlbGVtLnN0eWxlICkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0ZGlzcGxheSA9IGVsZW0uc3R5bGUuZGlzcGxheTtcblx0XHRpZiAoIHNob3cgKSB7XG5cblx0XHRcdC8vIFNpbmNlIHdlIGZvcmNlIHZpc2liaWxpdHkgdXBvbiBjYXNjYWRlLWhpZGRlbiBlbGVtZW50cywgYW4gaW1tZWRpYXRlIChhbmQgc2xvdylcblx0XHRcdC8vIGNoZWNrIGlzIHJlcXVpcmVkIGluIHRoaXMgZmlyc3QgbG9vcCB1bmxlc3Mgd2UgaGF2ZSBhIG5vbmVtcHR5IGRpc3BsYXkgdmFsdWUgKGVpdGhlclxuXHRcdFx0Ly8gaW5saW5lIG9yIGFib3V0LXRvLWJlLXJlc3RvcmVkKVxuXHRcdFx0aWYgKCBkaXNwbGF5ID09PSBcIm5vbmVcIiApIHtcblx0XHRcdFx0dmFsdWVzWyBpbmRleCBdID0gZGF0YVByaXYuZ2V0KCBlbGVtLCBcImRpc3BsYXlcIiApIHx8IG51bGw7XG5cdFx0XHRcdGlmICggIXZhbHVlc1sgaW5kZXggXSApIHtcblx0XHRcdFx0XHRlbGVtLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJcIiAmJiBpc0hpZGRlbldpdGhpblRyZWUoIGVsZW0gKSApIHtcblx0XHRcdFx0dmFsdWVzWyBpbmRleCBdID0gZ2V0RGVmYXVsdERpc3BsYXkoIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCBkaXNwbGF5ICE9PSBcIm5vbmVcIiApIHtcblx0XHRcdFx0dmFsdWVzWyBpbmRleCBdID0gXCJub25lXCI7XG5cblx0XHRcdFx0Ly8gUmVtZW1iZXIgd2hhdCB3ZSdyZSBvdmVyd3JpdGluZ1xuXHRcdFx0XHRkYXRhUHJpdi5zZXQoIGVsZW0sIFwiZGlzcGxheVwiLCBkaXNwbGF5ICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gU2V0IHRoZSBkaXNwbGF5IG9mIHRoZSBlbGVtZW50cyBpbiBhIHNlY29uZCBsb29wIHRvIGF2b2lkIGNvbnN0YW50IHJlZmxvd1xuXHRmb3IgKCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdGlmICggdmFsdWVzWyBpbmRleCBdICE9IG51bGwgKSB7XG5cdFx0XHRlbGVtZW50c1sgaW5kZXggXS5zdHlsZS5kaXNwbGF5ID0gdmFsdWVzWyBpbmRleCBdO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtZW50cztcbn1cblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRzaG93OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gc2hvd0hpZGUoIHRoaXMsIHRydWUgKTtcblx0fSxcblx0aGlkZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHNob3dIaWRlKCB0aGlzICk7XG5cdH0sXG5cdHRvZ2dsZTogZnVuY3Rpb24oIHN0YXRlICkge1xuXHRcdGlmICggdHlwZW9mIHN0YXRlID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRcdHJldHVybiBzdGF0ZSA/IHRoaXMuc2hvdygpIDogdGhpcy5oaWRlKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIGlzSGlkZGVuV2l0aGluVHJlZSggdGhpcyApICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5zaG93KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9XG59ICk7XG52YXIgcmNoZWNrYWJsZVR5cGUgPSAoIC9eKD86Y2hlY2tib3h8cmFkaW8pJC9pICk7XG5cbnZhciBydGFnTmFtZSA9ICggLzwoW2Etel1bXlxcL1xcMD5cXHgyMFxcdFxcclxcblxcZl0rKS9pICk7XG5cbnZhciByc2NyaXB0VHlwZSA9ICggL14kfFxcLyg/OmphdmF8ZWNtYSlzY3JpcHQvaSApO1xuXG5cblxuLy8gV2UgaGF2ZSB0byBjbG9zZSB0aGVzZSB0YWdzIHRvIHN1cHBvcnQgWEhUTUwgKCMxMzIwMClcbnZhciB3cmFwTWFwID0ge1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG5cdG9wdGlvbjogWyAxLCBcIjxzZWxlY3QgbXVsdGlwbGU9J211bHRpcGxlJz5cIiwgXCI8L3NlbGVjdD5cIiBdLFxuXG5cdC8vIFhIVE1MIHBhcnNlcnMgZG8gbm90IG1hZ2ljYWxseSBpbnNlcnQgZWxlbWVudHMgaW4gdGhlXG5cdC8vIHNhbWUgd2F5IHRoYXQgdGFnIHNvdXAgcGFyc2VycyBkby4gU28gd2UgY2Fubm90IHNob3J0ZW5cblx0Ly8gdGhpcyBieSBvbWl0dGluZyA8dGJvZHk+IG9yIG90aGVyIHJlcXVpcmVkIGVsZW1lbnRzLlxuXHR0aGVhZDogWyAxLCBcIjx0YWJsZT5cIiwgXCI8L3RhYmxlPlwiIF0sXG5cdGNvbDogWyAyLCBcIjx0YWJsZT48Y29sZ3JvdXA+XCIsIFwiPC9jb2xncm91cD48L3RhYmxlPlwiIF0sXG5cdHRyOiBbIDIsIFwiPHRhYmxlPjx0Ym9keT5cIiwgXCI8L3Rib2R5PjwvdGFibGU+XCIgXSxcblx0dGQ6IFsgMywgXCI8dGFibGU+PHRib2R5Pjx0cj5cIiwgXCI8L3RyPjwvdGJvZHk+PC90YWJsZT5cIiBdLFxuXG5cdF9kZWZhdWx0OiBbIDAsIFwiXCIsIFwiXCIgXVxufTtcblxuLy8gU3VwcG9ydDogSUUgPD05IG9ubHlcbndyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcblxud3JhcE1hcC50Ym9keSA9IHdyYXBNYXAudGZvb3QgPSB3cmFwTWFwLmNvbGdyb3VwID0gd3JhcE1hcC5jYXB0aW9uID0gd3JhcE1hcC50aGVhZDtcbndyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG5cbmZ1bmN0aW9uIGdldEFsbCggY29udGV4dCwgdGFnICkge1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExIG9ubHlcblx0Ly8gVXNlIHR5cGVvZiB0byBhdm9pZCB6ZXJvLWFyZ3VtZW50IG1ldGhvZCBpbnZvY2F0aW9uIG9uIGhvc3Qgb2JqZWN0cyAoIzE1MTUxKVxuXHR2YXIgcmV0O1xuXG5cdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0cmV0ID0gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnIHx8IFwiKlwiICk7XG5cblx0fSBlbHNlIGlmICggdHlwZW9mIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRyZXQgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyB8fCBcIipcIiApO1xuXG5cdH0gZWxzZSB7XG5cdFx0cmV0ID0gW107XG5cdH1cblxuXHRpZiAoIHRhZyA9PT0gdW5kZWZpbmVkIHx8IHRhZyAmJiBqUXVlcnkubm9kZU5hbWUoIGNvbnRleHQsIHRhZyApICkge1xuXHRcdHJldHVybiBqUXVlcnkubWVyZ2UoIFsgY29udGV4dCBdLCByZXQgKTtcblx0fVxuXG5cdHJldHVybiByZXQ7XG59XG5cblxuLy8gTWFyayBzY3JpcHRzIGFzIGhhdmluZyBhbHJlYWR5IGJlZW4gZXZhbHVhdGVkXG5mdW5jdGlvbiBzZXRHbG9iYWxFdmFsKCBlbGVtcywgcmVmRWxlbWVudHMgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsID0gZWxlbXMubGVuZ3RoO1xuXG5cdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRkYXRhUHJpdi5zZXQoXG5cdFx0XHRlbGVtc1sgaSBdLFxuXHRcdFx0XCJnbG9iYWxFdmFsXCIsXG5cdFx0XHQhcmVmRWxlbWVudHMgfHwgZGF0YVByaXYuZ2V0KCByZWZFbGVtZW50c1sgaSBdLCBcImdsb2JhbEV2YWxcIiApXG5cdFx0KTtcblx0fVxufVxuXG5cbnZhciByaHRtbCA9IC88fCYjP1xcdys7LztcblxuZnVuY3Rpb24gYnVpbGRGcmFnbWVudCggZWxlbXMsIGNvbnRleHQsIHNjcmlwdHMsIHNlbGVjdGlvbiwgaWdub3JlZCApIHtcblx0dmFyIGVsZW0sIHRtcCwgdGFnLCB3cmFwLCBjb250YWlucywgaixcblx0XHRmcmFnbWVudCA9IGNvbnRleHQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuXHRcdG5vZGVzID0gW10sXG5cdFx0aSA9IDAsXG5cdFx0bCA9IGVsZW1zLmxlbmd0aDtcblxuXHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0ZWxlbSA9IGVsZW1zWyBpIF07XG5cblx0XHRpZiAoIGVsZW0gfHwgZWxlbSA9PT0gMCApIHtcblxuXHRcdFx0Ly8gQWRkIG5vZGVzIGRpcmVjdGx5XG5cdFx0XHRpZiAoIGpRdWVyeS50eXBlKCBlbGVtICkgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5LCBQaGFudG9tSlMgMSBvbmx5XG5cdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCBub2RlcywgZWxlbS5ub2RlVHlwZSA/IFsgZWxlbSBdIDogZWxlbSApO1xuXG5cdFx0XHQvLyBDb252ZXJ0IG5vbi1odG1sIGludG8gYSB0ZXh0IG5vZGVcblx0XHRcdH0gZWxzZSBpZiAoICFyaHRtbC50ZXN0KCBlbGVtICkgKSB7XG5cdFx0XHRcdG5vZGVzLnB1c2goIGNvbnRleHQuY3JlYXRlVGV4dE5vZGUoIGVsZW0gKSApO1xuXG5cdFx0XHQvLyBDb252ZXJ0IGh0bWwgaW50byBET00gbm9kZXNcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRtcCA9IHRtcCB8fCBmcmFnbWVudC5hcHBlbmRDaGlsZCggY29udGV4dC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKTtcblxuXHRcdFx0XHQvLyBEZXNlcmlhbGl6ZSBhIHN0YW5kYXJkIHJlcHJlc2VudGF0aW9uXG5cdFx0XHRcdHRhZyA9ICggcnRhZ05hbWUuZXhlYyggZWxlbSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR3cmFwID0gd3JhcE1hcFsgdGFnIF0gfHwgd3JhcE1hcC5fZGVmYXVsdDtcblx0XHRcdFx0dG1wLmlubmVySFRNTCA9IHdyYXBbIDEgXSArIGpRdWVyeS5odG1sUHJlZmlsdGVyKCBlbGVtICkgKyB3cmFwWyAyIF07XG5cblx0XHRcdFx0Ly8gRGVzY2VuZCB0aHJvdWdoIHdyYXBwZXJzIHRvIHRoZSByaWdodCBjb250ZW50XG5cdFx0XHRcdGogPSB3cmFwWyAwIF07XG5cdFx0XHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0XHRcdHRtcCA9IHRtcC5sYXN0Q2hpbGQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIG5vZGVzLCB0bXAuY2hpbGROb2RlcyApO1xuXG5cdFx0XHRcdC8vIFJlbWVtYmVyIHRoZSB0b3AtbGV2ZWwgY29udGFpbmVyXG5cdFx0XHRcdHRtcCA9IGZyYWdtZW50LmZpcnN0Q2hpbGQ7XG5cblx0XHRcdFx0Ly8gRW5zdXJlIHRoZSBjcmVhdGVkIG5vZGVzIGFyZSBvcnBoYW5lZCAoIzEyMzkyKVxuXHRcdFx0XHR0bXAudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJlbW92ZSB3cmFwcGVyIGZyb20gZnJhZ21lbnRcblx0ZnJhZ21lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG5cdGkgPSAwO1xuXHR3aGlsZSAoICggZWxlbSA9IG5vZGVzWyBpKysgXSApICkge1xuXG5cdFx0Ly8gU2tpcCBlbGVtZW50cyBhbHJlYWR5IGluIHRoZSBjb250ZXh0IGNvbGxlY3Rpb24gKHRyYWMtNDA4Nylcblx0XHRpZiAoIHNlbGVjdGlvbiAmJiBqUXVlcnkuaW5BcnJheSggZWxlbSwgc2VsZWN0aW9uICkgPiAtMSApIHtcblx0XHRcdGlmICggaWdub3JlZCApIHtcblx0XHRcdFx0aWdub3JlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRjb250YWlucyA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cblx0XHQvLyBBcHBlbmQgdG8gZnJhZ21lbnRcblx0XHR0bXAgPSBnZXRBbGwoIGZyYWdtZW50LmFwcGVuZENoaWxkKCBlbGVtICksIFwic2NyaXB0XCIgKTtcblxuXHRcdC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3Rvcnlcblx0XHRpZiAoIGNvbnRhaW5zICkge1xuXHRcdFx0c2V0R2xvYmFsRXZhbCggdG1wICk7XG5cdFx0fVxuXG5cdFx0Ly8gQ2FwdHVyZSBleGVjdXRhYmxlc1xuXHRcdGlmICggc2NyaXB0cyApIHtcblx0XHRcdGogPSAwO1xuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSB0bXBbIGorKyBdICkgKSB7XG5cdFx0XHRcdGlmICggcnNjcmlwdFR5cGUudGVzdCggZWxlbS50eXBlIHx8IFwiXCIgKSApIHtcblx0XHRcdFx0XHRzY3JpcHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmcmFnbWVudDtcbn1cblxuXG4oIGZ1bmN0aW9uKCkge1xuXHR2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG5cdFx0ZGl2ID0gZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApLFxuXHRcdGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAgLSA0LjMgb25seVxuXHQvLyBDaGVjayBzdGF0ZSBsb3N0IGlmIHRoZSBuYW1lIGlzIHNldCAoIzExMjE3KVxuXHQvLyBTdXBwb3J0OiBXaW5kb3dzIFdlYiBBcHBzIChXV0EpXG5cdC8vIGBuYW1lYCBhbmQgYHR5cGVgIG11c3QgdXNlIC5zZXRBdHRyaWJ1dGUgZm9yIFdXQSAoIzE0OTAxKVxuXHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcInJhZGlvXCIgKTtcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcImNoZWNrZWRcIiwgXCJjaGVja2VkXCIgKTtcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJ0XCIgKTtcblxuXHRkaXYuYXBwZW5kQ2hpbGQoIGlucHV0ICk7XG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMSBvbmx5XG5cdC8vIE9sZGVyIFdlYktpdCBkb2Vzbid0IGNsb25lIGNoZWNrZWQgc3RhdGUgY29ycmVjdGx5IGluIGZyYWdtZW50c1xuXHRzdXBwb3J0LmNoZWNrQ2xvbmUgPSBkaXYuY2xvbmVOb2RlKCB0cnVlICkuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmNoZWNrZWQ7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdC8vIE1ha2Ugc3VyZSB0ZXh0YXJlYSAoYW5kIGNoZWNrYm94KSBkZWZhdWx0VmFsdWUgaXMgcHJvcGVybHkgY2xvbmVkXG5cdGRpdi5pbm5lckhUTUwgPSBcIjx0ZXh0YXJlYT54PC90ZXh0YXJlYT5cIjtcblx0c3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCA9ICEhZGl2LmNsb25lTm9kZSggdHJ1ZSApLmxhc3RDaGlsZC5kZWZhdWx0VmFsdWU7XG59ICkoKTtcbnZhciBkb2N1bWVudEVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuXG52YXJcblx0cmtleUV2ZW50ID0gL15rZXkvLFxuXHRybW91c2VFdmVudCA9IC9eKD86bW91c2V8cG9pbnRlcnxjb250ZXh0bWVudXxkcmFnfGRyb3ApfGNsaWNrLyxcblx0cnR5cGVuYW1lc3BhY2UgPSAvXihbXi5dKikoPzpcXC4oLispfCkvO1xuXG5mdW5jdGlvbiByZXR1cm5UcnVlKCkge1xuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmV0dXJuRmFsc2UoKSB7XG5cdHJldHVybiBmYWxzZTtcbn1cblxuLy8gU3VwcG9ydDogSUUgPD05IG9ubHlcbi8vIFNlZSAjMTMzOTMgZm9yIG1vcmUgaW5mb1xuZnVuY3Rpb24gc2FmZUFjdGl2ZUVsZW1lbnQoKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdH0gY2F0Y2ggKCBlcnIgKSB7IH1cbn1cblxuZnVuY3Rpb24gb24oIGVsZW0sIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIG9uZSApIHtcblx0dmFyIG9yaWdGbiwgdHlwZTtcblxuXHQvLyBUeXBlcyBjYW4gYmUgYSBtYXAgb2YgdHlwZXMvaGFuZGxlcnNcblx0aWYgKCB0eXBlb2YgdHlwZXMgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHQvLyAoIHR5cGVzLU9iamVjdCwgc2VsZWN0b3IsIGRhdGEgKVxuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzLU9iamVjdCwgZGF0YSApXG5cdFx0XHRkYXRhID0gZGF0YSB8fCBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRmb3IgKCB0eXBlIGluIHR5cGVzICkge1xuXHRcdFx0b24oIGVsZW0sIHR5cGUsIHNlbGVjdG9yLCBkYXRhLCB0eXBlc1sgdHlwZSBdLCBvbmUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIGVsZW07XG5cdH1cblxuXHRpZiAoIGRhdGEgPT0gbnVsbCAmJiBmbiA9PSBudWxsICkge1xuXG5cdFx0Ly8gKCB0eXBlcywgZm4gKVxuXHRcdGZuID0gc2VsZWN0b3I7XG5cdFx0ZGF0YSA9IHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCBmbiA9PSBudWxsICkge1xuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzLCBzZWxlY3RvciwgZm4gKVxuXHRcdFx0Zm4gPSBkYXRhO1xuXHRcdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyAoIHR5cGVzLCBkYXRhLCBmbiApXG5cdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRkYXRhID0gc2VsZWN0b3I7XG5cdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblx0aWYgKCBmbiA9PT0gZmFsc2UgKSB7XG5cdFx0Zm4gPSByZXR1cm5GYWxzZTtcblx0fSBlbHNlIGlmICggIWZuICkge1xuXHRcdHJldHVybiBlbGVtO1xuXHR9XG5cblx0aWYgKCBvbmUgPT09IDEgKSB7XG5cdFx0b3JpZ0ZuID0gZm47XG5cdFx0Zm4gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0XHRcdC8vIENhbiB1c2UgYW4gZW1wdHkgc2V0LCBzaW5jZSBldmVudCBjb250YWlucyB0aGUgaW5mb1xuXHRcdFx0alF1ZXJ5KCkub2ZmKCBldmVudCApO1xuXHRcdFx0cmV0dXJuIG9yaWdGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0fTtcblxuXHRcdC8vIFVzZSBzYW1lIGd1aWQgc28gY2FsbGVyIGNhbiByZW1vdmUgdXNpbmcgb3JpZ0ZuXG5cdFx0Zm4uZ3VpZCA9IG9yaWdGbi5ndWlkIHx8ICggb3JpZ0ZuLmd1aWQgPSBqUXVlcnkuZ3VpZCsrICk7XG5cdH1cblx0cmV0dXJuIGVsZW0uZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0alF1ZXJ5LmV2ZW50LmFkZCggdGhpcywgdHlwZXMsIGZuLCBkYXRhLCBzZWxlY3RvciApO1xuXHR9ICk7XG59XG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb25zIGZvciBtYW5hZ2luZyBldmVudHMgLS0gbm90IHBhcnQgb2YgdGhlIHB1YmxpYyBpbnRlcmZhY2UuXG4gKiBQcm9wcyB0byBEZWFuIEVkd2FyZHMnIGFkZEV2ZW50IGxpYnJhcnkgZm9yIG1hbnkgb2YgdGhlIGlkZWFzLlxuICovXG5qUXVlcnkuZXZlbnQgPSB7XG5cblx0Z2xvYmFsOiB7fSxcblxuXHRhZGQ6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgZGF0YSwgc2VsZWN0b3IgKSB7XG5cblx0XHR2YXIgaGFuZGxlT2JqSW4sIGV2ZW50SGFuZGxlLCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YVByaXYuZ2V0KCBlbGVtICk7XG5cblx0XHQvLyBEb24ndCBhdHRhY2ggZXZlbnRzIHRvIG5vRGF0YSBvciB0ZXh0L2NvbW1lbnQgbm9kZXMgKGJ1dCBhbGxvdyBwbGFpbiBvYmplY3RzKVxuXHRcdGlmICggIWVsZW1EYXRhICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENhbGxlciBjYW4gcGFzcyBpbiBhbiBvYmplY3Qgb2YgY3VzdG9tIGRhdGEgaW4gbGlldSBvZiB0aGUgaGFuZGxlclxuXHRcdGlmICggaGFuZGxlci5oYW5kbGVyICkge1xuXHRcdFx0aGFuZGxlT2JqSW4gPSBoYW5kbGVyO1xuXHRcdFx0aGFuZGxlciA9IGhhbmRsZU9iakluLmhhbmRsZXI7XG5cdFx0XHRzZWxlY3RvciA9IGhhbmRsZU9iakluLnNlbGVjdG9yO1xuXHRcdH1cblxuXHRcdC8vIEVuc3VyZSB0aGF0IGludmFsaWQgc2VsZWN0b3JzIHRocm93IGV4Y2VwdGlvbnMgYXQgYXR0YWNoIHRpbWVcblx0XHQvLyBFdmFsdWF0ZSBhZ2FpbnN0IGRvY3VtZW50RWxlbWVudCBpbiBjYXNlIGVsZW0gaXMgYSBub24tZWxlbWVudCBub2RlIChlLmcuLCBkb2N1bWVudClcblx0XHRpZiAoIHNlbGVjdG9yICkge1xuXHRcdFx0alF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBkb2N1bWVudEVsZW1lbnQsIHNlbGVjdG9yICk7XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgdGhlIGhhbmRsZXIgaGFzIGEgdW5pcXVlIElELCB1c2VkIHRvIGZpbmQvcmVtb3ZlIGl0IGxhdGVyXG5cdFx0aWYgKCAhaGFuZGxlci5ndWlkICkge1xuXHRcdFx0aGFuZGxlci5ndWlkID0galF1ZXJ5Lmd1aWQrKztcblx0XHR9XG5cblx0XHQvLyBJbml0IHRoZSBlbGVtZW50J3MgZXZlbnQgc3RydWN0dXJlIGFuZCBtYWluIGhhbmRsZXIsIGlmIHRoaXMgaXMgdGhlIGZpcnN0XG5cdFx0aWYgKCAhKCBldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgKSApIHtcblx0XHRcdGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyA9IHt9O1xuXHRcdH1cblx0XHRpZiAoICEoIGV2ZW50SGFuZGxlID0gZWxlbURhdGEuaGFuZGxlICkgKSB7XG5cdFx0XHRldmVudEhhbmRsZSA9IGVsZW1EYXRhLmhhbmRsZSA9IGZ1bmN0aW9uKCBlICkge1xuXG5cdFx0XHRcdC8vIERpc2NhcmQgdGhlIHNlY29uZCBldmVudCBvZiBhIGpRdWVyeS5ldmVudC50cmlnZ2VyKCkgYW5kXG5cdFx0XHRcdC8vIHdoZW4gYW4gZXZlbnQgaXMgY2FsbGVkIGFmdGVyIGEgcGFnZSBoYXMgdW5sb2FkZWRcblx0XHRcdFx0cmV0dXJuIHR5cGVvZiBqUXVlcnkgIT09IFwidW5kZWZpbmVkXCIgJiYgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCAhPT0gZS50eXBlID9cblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQuZGlzcGF0Y2guYXBwbHkoIGVsZW0sIGFyZ3VtZW50cyApIDogdW5kZWZpbmVkO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBIYW5kbGUgbXVsdGlwbGUgZXZlbnRzIHNlcGFyYXRlZCBieSBhIHNwYWNlXG5cdFx0dHlwZXMgPSAoIHR5cGVzIHx8IFwiXCIgKS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1sgdCBdICkgfHwgW107XG5cdFx0XHR0eXBlID0gb3JpZ1R5cGUgPSB0bXBbIDEgXTtcblx0XHRcdG5hbWVzcGFjZXMgPSAoIHRtcFsgMiBdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFRoZXJlICptdXN0KiBiZSBhIHR5cGUsIG5vIGF0dGFjaGluZyBuYW1lc3BhY2Utb25seSBoYW5kbGVyc1xuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGV2ZW50IGNoYW5nZXMgaXRzIHR5cGUsIHVzZSB0aGUgc3BlY2lhbCBldmVudCBoYW5kbGVycyBmb3IgdGhlIGNoYW5nZWQgdHlwZVxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cblx0XHRcdC8vIElmIHNlbGVjdG9yIGRlZmluZWQsIGRldGVybWluZSBzcGVjaWFsIGV2ZW50IGFwaSB0eXBlLCBvdGhlcndpc2UgZ2l2ZW4gdHlwZVxuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBVcGRhdGUgc3BlY2lhbCBiYXNlZCBvbiBuZXdseSByZXNldCB0eXBlXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuXHRcdFx0Ly8gaGFuZGxlT2JqIGlzIHBhc3NlZCB0byBhbGwgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGhhbmRsZU9iaiA9IGpRdWVyeS5leHRlbmQoIHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0b3JpZ1R5cGU6IG9yaWdUeXBlLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHRoYW5kbGVyOiBoYW5kbGVyLFxuXHRcdFx0XHRndWlkOiBoYW5kbGVyLmd1aWQsXG5cdFx0XHRcdHNlbGVjdG9yOiBzZWxlY3Rvcixcblx0XHRcdFx0bmVlZHNDb250ZXh0OiBzZWxlY3RvciAmJiBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3IgKSxcblx0XHRcdFx0bmFtZXNwYWNlOiBuYW1lc3BhY2VzLmpvaW4oIFwiLlwiIClcblx0XHRcdH0sIGhhbmRsZU9iakluICk7XG5cblx0XHRcdC8vIEluaXQgdGhlIGV2ZW50IGhhbmRsZXIgcXVldWUgaWYgd2UncmUgdGhlIGZpcnN0XG5cdFx0XHRpZiAoICEoIGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gKSApIHtcblx0XHRcdFx0aGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSA9IFtdO1xuXHRcdFx0XHRoYW5kbGVycy5kZWxlZ2F0ZUNvdW50ID0gMDtcblxuXHRcdFx0XHQvLyBPbmx5IHVzZSBhZGRFdmVudExpc3RlbmVyIGlmIHRoZSBzcGVjaWFsIGV2ZW50cyBoYW5kbGVyIHJldHVybnMgZmFsc2Vcblx0XHRcdFx0aWYgKCAhc3BlY2lhbC5zZXR1cCB8fFxuXHRcdFx0XHRcdHNwZWNpYWwuc2V0dXAuY2FsbCggZWxlbSwgZGF0YSwgbmFtZXNwYWNlcywgZXZlbnRIYW5kbGUgKSA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdFx0XHRcdGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgZXZlbnRIYW5kbGUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzcGVjaWFsLmFkZCApIHtcblx0XHRcdFx0c3BlY2lhbC5hZGQuY2FsbCggZWxlbSwgaGFuZGxlT2JqICk7XG5cblx0XHRcdFx0aWYgKCAhaGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCApIHtcblx0XHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlci5ndWlkID0gaGFuZGxlci5ndWlkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCB0byB0aGUgZWxlbWVudCdzIGhhbmRsZXIgbGlzdCwgZGVsZWdhdGVzIGluIGZyb250XG5cdFx0XHRpZiAoIHNlbGVjdG9yICkge1xuXHRcdFx0XHRoYW5kbGVycy5zcGxpY2UoIGhhbmRsZXJzLmRlbGVnYXRlQ291bnQrKywgMCwgaGFuZGxlT2JqICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoYW5kbGVycy5wdXNoKCBoYW5kbGVPYmogKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gS2VlcCB0cmFjayBvZiB3aGljaCBldmVudHMgaGF2ZSBldmVyIGJlZW4gdXNlZCwgZm9yIGV2ZW50IG9wdGltaXphdGlvblxuXHRcdFx0alF1ZXJ5LmV2ZW50Lmdsb2JhbFsgdHlwZSBdID0gdHJ1ZTtcblx0XHR9XG5cblx0fSxcblxuXHQvLyBEZXRhY2ggYW4gZXZlbnQgb3Igc2V0IG9mIGV2ZW50cyBmcm9tIGFuIGVsZW1lbnRcblx0cmVtb3ZlOiBmdW5jdGlvbiggZWxlbSwgdHlwZXMsIGhhbmRsZXIsIHNlbGVjdG9yLCBtYXBwZWRUeXBlcyApIHtcblxuXHRcdHZhciBqLCBvcmlnQ291bnQsIHRtcCxcblx0XHRcdGV2ZW50cywgdCwgaGFuZGxlT2JqLFxuXHRcdFx0c3BlY2lhbCwgaGFuZGxlcnMsIHR5cGUsIG5hbWVzcGFjZXMsIG9yaWdUeXBlLFxuXHRcdFx0ZWxlbURhdGEgPSBkYXRhUHJpdi5oYXNEYXRhKCBlbGVtICkgJiYgZGF0YVByaXYuZ2V0KCBlbGVtICk7XG5cblx0XHRpZiAoICFlbGVtRGF0YSB8fCAhKCBldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBPbmNlIGZvciBlYWNoIHR5cGUubmFtZXNwYWNlIGluIHR5cGVzOyB0eXBlIG1heSBiZSBvbWl0dGVkXG5cdFx0dHlwZXMgPSAoIHR5cGVzIHx8IFwiXCIgKS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1sgdCBdICkgfHwgW107XG5cdFx0XHR0eXBlID0gb3JpZ1R5cGUgPSB0bXBbIDEgXTtcblx0XHRcdG5hbWVzcGFjZXMgPSAoIHRtcFsgMiBdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFVuYmluZCBhbGwgZXZlbnRzIChvbiB0aGlzIG5hbWVzcGFjZSwgaWYgcHJvdmlkZWQpIGZvciB0aGUgZWxlbWVudFxuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Zm9yICggdHlwZSBpbiBldmVudHMgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggZWxlbSwgdHlwZSArIHR5cGVzWyB0IF0sIGhhbmRsZXIsIHNlbGVjdG9yLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXHRcdFx0aGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSB8fCBbXTtcblx0XHRcdHRtcCA9IHRtcFsgMiBdICYmXG5cdFx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oIFwiXFxcXC4oPzouKlxcXFwufClcIiApICsgXCIoXFxcXC58JClcIiApO1xuXG5cdFx0XHQvLyBSZW1vdmUgbWF0Y2hpbmcgZXZlbnRzXG5cdFx0XHRvcmlnQ291bnQgPSBqID0gaGFuZGxlcnMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRcdGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBqIF07XG5cblx0XHRcdFx0aWYgKCAoIG1hcHBlZFR5cGVzIHx8IG9yaWdUeXBlID09PSBoYW5kbGVPYmoub3JpZ1R5cGUgKSAmJlxuXHRcdFx0XHRcdCggIWhhbmRsZXIgfHwgaGFuZGxlci5ndWlkID09PSBoYW5kbGVPYmouZ3VpZCApICYmXG5cdFx0XHRcdFx0KCAhdG1wIHx8IHRtcC50ZXN0KCBoYW5kbGVPYmoubmFtZXNwYWNlICkgKSAmJlxuXHRcdFx0XHRcdCggIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBoYW5kbGVPYmouc2VsZWN0b3IgfHxcblx0XHRcdFx0XHRcdHNlbGVjdG9yID09PSBcIioqXCIgJiYgaGFuZGxlT2JqLnNlbGVjdG9yICkgKSB7XG5cdFx0XHRcdFx0aGFuZGxlcnMuc3BsaWNlKCBqLCAxICk7XG5cblx0XHRcdFx0XHRpZiAoIGhhbmRsZU9iai5zZWxlY3RvciApIHtcblx0XHRcdFx0XHRcdGhhbmRsZXJzLmRlbGVnYXRlQ291bnQtLTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBzcGVjaWFsLnJlbW92ZSApIHtcblx0XHRcdFx0XHRcdHNwZWNpYWwucmVtb3ZlLmNhbGwoIGVsZW0sIGhhbmRsZU9iaiApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZW1vdmUgZ2VuZXJpYyBldmVudCBoYW5kbGVyIGlmIHdlIHJlbW92ZWQgc29tZXRoaW5nIGFuZCBubyBtb3JlIGhhbmRsZXJzIGV4aXN0XG5cdFx0XHQvLyAoYXZvaWRzIHBvdGVudGlhbCBmb3IgZW5kbGVzcyByZWN1cnNpb24gZHVyaW5nIHJlbW92YWwgb2Ygc3BlY2lhbCBldmVudCBoYW5kbGVycylcblx0XHRcdGlmICggb3JpZ0NvdW50ICYmICFoYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRcdGlmICggIXNwZWNpYWwudGVhcmRvd24gfHxcblx0XHRcdFx0XHRzcGVjaWFsLnRlYXJkb3duLmNhbGwoIGVsZW0sIG5hbWVzcGFjZXMsIGVsZW1EYXRhLmhhbmRsZSApID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHRcdGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZWxlbURhdGEuaGFuZGxlICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgZXZlbnRzWyB0eXBlIF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIGRhdGEgYW5kIHRoZSBleHBhbmRvIGlmIGl0J3Mgbm8gbG9uZ2VyIHVzZWRcblx0XHRpZiAoIGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBldmVudHMgKSApIHtcblx0XHRcdGRhdGFQcml2LnJlbW92ZSggZWxlbSwgXCJoYW5kbGUgZXZlbnRzXCIgKTtcblx0XHR9XG5cdH0sXG5cblx0ZGlzcGF0Y2g6IGZ1bmN0aW9uKCBuYXRpdmVFdmVudCApIHtcblxuXHRcdC8vIE1ha2UgYSB3cml0YWJsZSBqUXVlcnkuRXZlbnQgZnJvbSB0aGUgbmF0aXZlIGV2ZW50IG9iamVjdFxuXHRcdHZhciBldmVudCA9IGpRdWVyeS5ldmVudC5maXgoIG5hdGl2ZUV2ZW50ICk7XG5cblx0XHR2YXIgaSwgaiwgcmV0LCBtYXRjaGVkLCBoYW5kbGVPYmosIGhhbmRsZXJRdWV1ZSxcblx0XHRcdGFyZ3MgPSBuZXcgQXJyYXkoIGFyZ3VtZW50cy5sZW5ndGggKSxcblx0XHRcdGhhbmRsZXJzID0gKCBkYXRhUHJpdi5nZXQoIHRoaXMsIFwiZXZlbnRzXCIgKSB8fCB7fSApWyBldmVudC50eXBlIF0gfHwgW10sXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGV2ZW50LnR5cGUgXSB8fCB7fTtcblxuXHRcdC8vIFVzZSB0aGUgZml4LWVkIGpRdWVyeS5FdmVudCByYXRoZXIgdGhhbiB0aGUgKHJlYWQtb25seSkgbmF0aXZlIGV2ZW50XG5cdFx0YXJnc1sgMCBdID0gZXZlbnQ7XG5cblx0XHRmb3IgKCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdGFyZ3NbIGkgXSA9IGFyZ3VtZW50c1sgaSBdO1xuXHRcdH1cblxuXHRcdGV2ZW50LmRlbGVnYXRlVGFyZ2V0ID0gdGhpcztcblxuXHRcdC8vIENhbGwgdGhlIHByZURpc3BhdGNoIGhvb2sgZm9yIHRoZSBtYXBwZWQgdHlwZSwgYW5kIGxldCBpdCBiYWlsIGlmIGRlc2lyZWRcblx0XHRpZiAoIHNwZWNpYWwucHJlRGlzcGF0Y2ggJiYgc3BlY2lhbC5wcmVEaXNwYXRjaC5jYWxsKCB0aGlzLCBldmVudCApID09PSBmYWxzZSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBEZXRlcm1pbmUgaGFuZGxlcnNcblx0XHRoYW5kbGVyUXVldWUgPSBqUXVlcnkuZXZlbnQuaGFuZGxlcnMuY2FsbCggdGhpcywgZXZlbnQsIGhhbmRsZXJzICk7XG5cblx0XHQvLyBSdW4gZGVsZWdhdGVzIGZpcnN0OyB0aGV5IG1heSB3YW50IHRvIHN0b3AgcHJvcGFnYXRpb24gYmVuZWF0aCB1c1xuXHRcdGkgPSAwO1xuXHRcdHdoaWxlICggKCBtYXRjaGVkID0gaGFuZGxlclF1ZXVlWyBpKysgXSApICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXHRcdFx0ZXZlbnQuY3VycmVudFRhcmdldCA9IG1hdGNoZWQuZWxlbTtcblxuXHRcdFx0aiA9IDA7XG5cdFx0XHR3aGlsZSAoICggaGFuZGxlT2JqID0gbWF0Y2hlZC5oYW5kbGVyc1sgaisrIF0gKSAmJlxuXHRcdFx0XHQhZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblxuXHRcdFx0XHQvLyBUcmlnZ2VyZWQgZXZlbnQgbXVzdCBlaXRoZXIgMSkgaGF2ZSBubyBuYW1lc3BhY2UsIG9yIDIpIGhhdmUgbmFtZXNwYWNlKHMpXG5cdFx0XHRcdC8vIGEgc3Vic2V0IG9yIGVxdWFsIHRvIHRob3NlIGluIHRoZSBib3VuZCBldmVudCAoYm90aCBjYW4gaGF2ZSBubyBuYW1lc3BhY2UpLlxuXHRcdFx0XHRpZiAoICFldmVudC5ybmFtZXNwYWNlIHx8IGV2ZW50LnJuYW1lc3BhY2UudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkge1xuXG5cdFx0XHRcdFx0ZXZlbnQuaGFuZGxlT2JqID0gaGFuZGxlT2JqO1xuXHRcdFx0XHRcdGV2ZW50LmRhdGEgPSBoYW5kbGVPYmouZGF0YTtcblxuXHRcdFx0XHRcdHJldCA9ICggKCBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgaGFuZGxlT2JqLm9yaWdUeXBlIF0gfHwge30gKS5oYW5kbGUgfHxcblx0XHRcdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyICkuYXBwbHkoIG1hdGNoZWQuZWxlbSwgYXJncyApO1xuXG5cdFx0XHRcdFx0aWYgKCByZXQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdGlmICggKCBldmVudC5yZXN1bHQgPSByZXQgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENhbGwgdGhlIHBvc3REaXNwYXRjaCBob29rIGZvciB0aGUgbWFwcGVkIHR5cGVcblx0XHRpZiAoIHNwZWNpYWwucG9zdERpc3BhdGNoICkge1xuXHRcdFx0c3BlY2lhbC5wb3N0RGlzcGF0Y2guY2FsbCggdGhpcywgZXZlbnQgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnQucmVzdWx0O1xuXHR9LFxuXG5cdGhhbmRsZXJzOiBmdW5jdGlvbiggZXZlbnQsIGhhbmRsZXJzICkge1xuXHRcdHZhciBpLCBoYW5kbGVPYmosIHNlbCwgbWF0Y2hlZEhhbmRsZXJzLCBtYXRjaGVkU2VsZWN0b3JzLFxuXHRcdFx0aGFuZGxlclF1ZXVlID0gW10sXG5cdFx0XHRkZWxlZ2F0ZUNvdW50ID0gaGFuZGxlcnMuZGVsZWdhdGVDb3VudCxcblx0XHRcdGN1ciA9IGV2ZW50LnRhcmdldDtcblxuXHRcdC8vIEZpbmQgZGVsZWdhdGUgaGFuZGxlcnNcblx0XHRpZiAoIGRlbGVnYXRlQ291bnQgJiZcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgPD05XG5cdFx0XHQvLyBCbGFjay1ob2xlIFNWRyA8dXNlPiBpbnN0YW5jZSB0cmVlcyAodHJhYy0xMzE4MClcblx0XHRcdGN1ci5ub2RlVHlwZSAmJlxuXG5cdFx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDw9NDJcblx0XHRcdC8vIFN1cHByZXNzIHNwZWMtdmlvbGF0aW5nIGNsaWNrcyBpbmRpY2F0aW5nIGEgbm9uLXByaW1hcnkgcG9pbnRlciBidXR0b24gKHRyYWMtMzg2MSlcblx0XHRcdC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2V2ZW50LXR5cGUtY2xpY2tcblx0XHRcdC8vIFN1cHBvcnQ6IElFIDExIG9ubHlcblx0XHRcdC8vIC4uLmJ1dCBub3QgYXJyb3cga2V5IFwiY2xpY2tzXCIgb2YgcmFkaW8gaW5wdXRzLCB3aGljaCBjYW4gaGF2ZSBgYnV0dG9uYCAtMSAoZ2gtMjM0Mylcblx0XHRcdCEoIGV2ZW50LnR5cGUgPT09IFwiY2xpY2tcIiAmJiBldmVudC5idXR0b24gPj0gMSApICkge1xuXG5cdFx0XHRmb3IgKCA7IGN1ciAhPT0gdGhpczsgY3VyID0gY3VyLnBhcmVudE5vZGUgfHwgdGhpcyApIHtcblxuXHRcdFx0XHQvLyBEb24ndCBjaGVjayBub24tZWxlbWVudHMgKCMxMzIwOClcblx0XHRcdFx0Ly8gRG9uJ3QgcHJvY2VzcyBjbGlja3Mgb24gZGlzYWJsZWQgZWxlbWVudHMgKCM2OTExLCAjODE2NSwgIzExMzgyLCAjMTE3NjQpXG5cdFx0XHRcdGlmICggY3VyLm5vZGVUeXBlID09PSAxICYmICEoIGV2ZW50LnR5cGUgPT09IFwiY2xpY2tcIiAmJiBjdXIuZGlzYWJsZWQgPT09IHRydWUgKSApIHtcblx0XHRcdFx0XHRtYXRjaGVkSGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRtYXRjaGVkU2VsZWN0b3JzID0ge307XG5cdFx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBkZWxlZ2F0ZUNvdW50OyBpKysgKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVPYmogPSBoYW5kbGVyc1sgaSBdO1xuXG5cdFx0XHRcdFx0XHQvLyBEb24ndCBjb25mbGljdCB3aXRoIE9iamVjdC5wcm90b3R5cGUgcHJvcGVydGllcyAoIzEzMjAzKVxuXHRcdFx0XHRcdFx0c2VsID0gaGFuZGxlT2JqLnNlbGVjdG9yICsgXCIgXCI7XG5cblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlZFNlbGVjdG9yc1sgc2VsIF0gPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdFx0bWF0Y2hlZFNlbGVjdG9yc1sgc2VsIF0gPSBoYW5kbGVPYmoubmVlZHNDb250ZXh0ID9cblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoIHNlbCwgdGhpcyApLmluZGV4KCBjdXIgKSA+IC0xIDpcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuZmluZCggc2VsLCB0aGlzLCBudWxsLCBbIGN1ciBdICkubGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVkU2VsZWN0b3JzWyBzZWwgXSApIHtcblx0XHRcdFx0XHRcdFx0bWF0Y2hlZEhhbmRsZXJzLnB1c2goIGhhbmRsZU9iaiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIG1hdGNoZWRIYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVyUXVldWUucHVzaCggeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBtYXRjaGVkSGFuZGxlcnMgfSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEFkZCB0aGUgcmVtYWluaW5nIChkaXJlY3RseS1ib3VuZCkgaGFuZGxlcnNcblx0XHRjdXIgPSB0aGlzO1xuXHRcdGlmICggZGVsZWdhdGVDb3VudCA8IGhhbmRsZXJzLmxlbmd0aCApIHtcblx0XHRcdGhhbmRsZXJRdWV1ZS5wdXNoKCB7IGVsZW06IGN1ciwgaGFuZGxlcnM6IGhhbmRsZXJzLnNsaWNlKCBkZWxlZ2F0ZUNvdW50ICkgfSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBoYW5kbGVyUXVldWU7XG5cdH0sXG5cblx0YWRkUHJvcDogZnVuY3Rpb24oIG5hbWUsIGhvb2sgKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBqUXVlcnkuRXZlbnQucHJvdG90eXBlLCBuYW1lLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXG5cdFx0XHRnZXQ6IGpRdWVyeS5pc0Z1bmN0aW9uKCBob29rICkgP1xuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGhvb2soIHRoaXMub3JpZ2luYWxFdmVudCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5vcmlnaW5hbEV2ZW50ICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcmlnaW5hbEV2ZW50WyBuYW1lIF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCB0aGlzLCBuYW1lLCB7XG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0Zml4OiBmdW5jdGlvbiggb3JpZ2luYWxFdmVudCApIHtcblx0XHRyZXR1cm4gb3JpZ2luYWxFdmVudFsgalF1ZXJ5LmV4cGFuZG8gXSA/XG5cdFx0XHRvcmlnaW5hbEV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIG9yaWdpbmFsRXZlbnQgKTtcblx0fSxcblxuXHRzcGVjaWFsOiB7XG5cdFx0bG9hZDoge1xuXG5cdFx0XHQvLyBQcmV2ZW50IHRyaWdnZXJlZCBpbWFnZS5sb2FkIGV2ZW50cyBmcm9tIGJ1YmJsaW5nIHRvIHdpbmRvdy5sb2FkXG5cdFx0XHRub0J1YmJsZTogdHJ1ZVxuXHRcdH0sXG5cdFx0Zm9jdXM6IHtcblxuXHRcdFx0Ly8gRmlyZSBuYXRpdmUgZXZlbnQgaWYgcG9zc2libGUgc28gYmx1ci9mb2N1cyBzZXF1ZW5jZSBpcyBjb3JyZWN0XG5cdFx0XHR0cmlnZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCB0aGlzICE9PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuZm9jdXMgKSB7XG5cdFx0XHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c2luXCJcblx0XHR9LFxuXHRcdGJsdXI6IHtcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMgPT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5ibHVyICkge1xuXHRcdFx0XHRcdHRoaXMuYmx1cigpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c291dFwiXG5cdFx0fSxcblx0XHRjbGljazoge1xuXG5cdFx0XHQvLyBGb3IgY2hlY2tib3gsIGZpcmUgbmF0aXZlIGV2ZW50IHNvIGNoZWNrZWQgc3RhdGUgd2lsbCBiZSByaWdodFxuXHRcdFx0dHJpZ2dlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcy50eXBlID09PSBcImNoZWNrYm94XCIgJiYgdGhpcy5jbGljayAmJiBqUXVlcnkubm9kZU5hbWUoIHRoaXMsIFwiaW5wdXRcIiApICkge1xuXHRcdFx0XHRcdHRoaXMuY2xpY2soKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8vIEZvciBjcm9zcy1icm93c2VyIGNvbnNpc3RlbmN5LCBkb24ndCBmaXJlIG5hdGl2ZSAuY2xpY2soKSBvbiBsaW5rc1xuXHRcdFx0X2RlZmF1bHQ6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0cmV0dXJuIGpRdWVyeS5ub2RlTmFtZSggZXZlbnQudGFyZ2V0LCBcImFcIiApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRiZWZvcmV1bmxvYWQ6IHtcblx0XHRcdHBvc3REaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggMjArXG5cdFx0XHRcdC8vIEZpcmVmb3ggZG9lc24ndCBhbGVydCBpZiB0aGUgcmV0dXJuVmFsdWUgZmllbGQgaXMgbm90IHNldC5cblx0XHRcdFx0aWYgKCBldmVudC5yZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5vcmlnaW5hbEV2ZW50ICkge1xuXHRcdFx0XHRcdGV2ZW50Lm9yaWdpbmFsRXZlbnQucmV0dXJuVmFsdWUgPSBldmVudC5yZXN1bHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbmpRdWVyeS5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBoYW5kbGUgKSB7XG5cblx0Ly8gVGhpcyBcImlmXCIgaXMgbmVlZGVkIGZvciBwbGFpbiBvYmplY3RzXG5cdGlmICggZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyICkge1xuXHRcdGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZSwgaGFuZGxlICk7XG5cdH1cbn07XG5cbmpRdWVyeS5FdmVudCA9IGZ1bmN0aW9uKCBzcmMsIHByb3BzICkge1xuXG5cdC8vIEFsbG93IGluc3RhbnRpYXRpb24gd2l0aG91dCB0aGUgJ25ldycga2V5d29yZFxuXHRpZiAoICEoIHRoaXMgaW5zdGFuY2VvZiBqUXVlcnkuRXZlbnQgKSApIHtcblx0XHRyZXR1cm4gbmV3IGpRdWVyeS5FdmVudCggc3JjLCBwcm9wcyApO1xuXHR9XG5cblx0Ly8gRXZlbnQgb2JqZWN0XG5cdGlmICggc3JjICYmIHNyYy50eXBlICkge1xuXHRcdHRoaXMub3JpZ2luYWxFdmVudCA9IHNyYztcblx0XHR0aGlzLnR5cGUgPSBzcmMudHlwZTtcblxuXHRcdC8vIEV2ZW50cyBidWJibGluZyB1cCB0aGUgZG9jdW1lbnQgbWF5IGhhdmUgYmVlbiBtYXJrZWQgYXMgcHJldmVudGVkXG5cdFx0Ly8gYnkgYSBoYW5kbGVyIGxvd2VyIGRvd24gdGhlIHRyZWU7IHJlZmxlY3QgdGhlIGNvcnJlY3QgdmFsdWUuXG5cdFx0dGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQgPSBzcmMuZGVmYXVsdFByZXZlbnRlZCB8fFxuXHRcdFx0XHRzcmMuZGVmYXVsdFByZXZlbnRlZCA9PT0gdW5kZWZpbmVkICYmXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTIuMyBvbmx5XG5cdFx0XHRcdHNyYy5yZXR1cm5WYWx1ZSA9PT0gZmFsc2UgP1xuXHRcdFx0cmV0dXJuVHJ1ZSA6XG5cdFx0XHRyZXR1cm5GYWxzZTtcblxuXHRcdC8vIENyZWF0ZSB0YXJnZXQgcHJvcGVydGllc1xuXHRcdC8vIFN1cHBvcnQ6IFNhZmFyaSA8PTYgLSA3IG9ubHlcblx0XHQvLyBUYXJnZXQgc2hvdWxkIG5vdCBiZSBhIHRleHQgbm9kZSAoIzUwNCwgIzEzMTQzKVxuXHRcdHRoaXMudGFyZ2V0ID0gKCBzcmMudGFyZ2V0ICYmIHNyYy50YXJnZXQubm9kZVR5cGUgPT09IDMgKSA/XG5cdFx0XHRzcmMudGFyZ2V0LnBhcmVudE5vZGUgOlxuXHRcdFx0c3JjLnRhcmdldDtcblxuXHRcdHRoaXMuY3VycmVudFRhcmdldCA9IHNyYy5jdXJyZW50VGFyZ2V0O1xuXHRcdHRoaXMucmVsYXRlZFRhcmdldCA9IHNyYy5yZWxhdGVkVGFyZ2V0O1xuXG5cdC8vIEV2ZW50IHR5cGVcblx0fSBlbHNlIHtcblx0XHR0aGlzLnR5cGUgPSBzcmM7XG5cdH1cblxuXHQvLyBQdXQgZXhwbGljaXRseSBwcm92aWRlZCBwcm9wZXJ0aWVzIG9udG8gdGhlIGV2ZW50IG9iamVjdFxuXHRpZiAoIHByb3BzICkge1xuXHRcdGpRdWVyeS5leHRlbmQoIHRoaXMsIHByb3BzICk7XG5cdH1cblxuXHQvLyBDcmVhdGUgYSB0aW1lc3RhbXAgaWYgaW5jb21pbmcgZXZlbnQgZG9lc24ndCBoYXZlIG9uZVxuXHR0aGlzLnRpbWVTdGFtcCA9IHNyYyAmJiBzcmMudGltZVN0YW1wIHx8IGpRdWVyeS5ub3coKTtcblxuXHQvLyBNYXJrIGl0IGFzIGZpeGVkXG5cdHRoaXNbIGpRdWVyeS5leHBhbmRvIF0gPSB0cnVlO1xufTtcblxuLy8galF1ZXJ5LkV2ZW50IGlzIGJhc2VkIG9uIERPTTMgRXZlbnRzIGFzIHNwZWNpZmllZCBieSB0aGUgRUNNQVNjcmlwdCBMYW5ndWFnZSBCaW5kaW5nXG4vLyBodHRwczovL3d3dy53My5vcmcvVFIvMjAwMy9XRC1ET00tTGV2ZWwtMy1FdmVudHMtMjAwMzAzMzEvZWNtYS1zY3JpcHQtYmluZGluZy5odG1sXG5qUXVlcnkuRXZlbnQucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogalF1ZXJ5LkV2ZW50LFxuXHRpc0RlZmF1bHRQcmV2ZW50ZWQ6IHJldHVybkZhbHNlLFxuXHRpc1Byb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG5cdGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZSxcblx0aXNTaW11bGF0ZWQ6IGZhbHNlLFxuXG5cdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiAhdGhpcy5pc1NpbXVsYXRlZCApIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH0sXG5cdHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdGlmICggZSAmJiAhdGhpcy5pc1NpbXVsYXRlZCApIHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHR9LFxuXHRzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG5cdFx0dGhpcy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH1cbn07XG5cbi8vIEluY2x1ZGVzIGFsbCBjb21tb24gZXZlbnQgcHJvcHMgaW5jbHVkaW5nIEtleUV2ZW50IGFuZCBNb3VzZUV2ZW50IHNwZWNpZmljIHByb3BzXG5qUXVlcnkuZWFjaCgge1xuXHRhbHRLZXk6IHRydWUsXG5cdGJ1YmJsZXM6IHRydWUsXG5cdGNhbmNlbGFibGU6IHRydWUsXG5cdGNoYW5nZWRUb3VjaGVzOiB0cnVlLFxuXHRjdHJsS2V5OiB0cnVlLFxuXHRkZXRhaWw6IHRydWUsXG5cdGV2ZW50UGhhc2U6IHRydWUsXG5cdG1ldGFLZXk6IHRydWUsXG5cdHBhZ2VYOiB0cnVlLFxuXHRwYWdlWTogdHJ1ZSxcblx0c2hpZnRLZXk6IHRydWUsXG5cdHZpZXc6IHRydWUsXG5cdFwiY2hhclwiOiB0cnVlLFxuXHRjaGFyQ29kZTogdHJ1ZSxcblx0a2V5OiB0cnVlLFxuXHRrZXlDb2RlOiB0cnVlLFxuXHRidXR0b246IHRydWUsXG5cdGJ1dHRvbnM6IHRydWUsXG5cdGNsaWVudFg6IHRydWUsXG5cdGNsaWVudFk6IHRydWUsXG5cdG9mZnNldFg6IHRydWUsXG5cdG9mZnNldFk6IHRydWUsXG5cdHBvaW50ZXJJZDogdHJ1ZSxcblx0cG9pbnRlclR5cGU6IHRydWUsXG5cdHNjcmVlblg6IHRydWUsXG5cdHNjcmVlblk6IHRydWUsXG5cdHRhcmdldFRvdWNoZXM6IHRydWUsXG5cdHRvRWxlbWVudDogdHJ1ZSxcblx0dG91Y2hlczogdHJ1ZSxcblxuXHR3aGljaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdHZhciBidXR0b24gPSBldmVudC5idXR0b247XG5cblx0XHQvLyBBZGQgd2hpY2ggZm9yIGtleSBldmVudHNcblx0XHRpZiAoIGV2ZW50LndoaWNoID09IG51bGwgJiYgcmtleUV2ZW50LnRlc3QoIGV2ZW50LnR5cGUgKSApIHtcblx0XHRcdHJldHVybiBldmVudC5jaGFyQ29kZSAhPSBudWxsID8gZXZlbnQuY2hhckNvZGUgOiBldmVudC5rZXlDb2RlO1xuXHRcdH1cblxuXHRcdC8vIEFkZCB3aGljaCBmb3IgY2xpY2s6IDEgPT09IGxlZnQ7IDIgPT09IG1pZGRsZTsgMyA9PT0gcmlnaHRcblx0XHRpZiAoICFldmVudC53aGljaCAmJiBidXR0b24gIT09IHVuZGVmaW5lZCAmJiBybW91c2VFdmVudC50ZXN0KCBldmVudC50eXBlICkgKSB7XG5cdFx0XHRpZiAoIGJ1dHRvbiAmIDEgKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGJ1dHRvbiAmIDIgKSB7XG5cdFx0XHRcdHJldHVybiAzO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGJ1dHRvbiAmIDQgKSB7XG5cdFx0XHRcdHJldHVybiAyO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnQud2hpY2g7XG5cdH1cbn0sIGpRdWVyeS5ldmVudC5hZGRQcm9wICk7XG5cbi8vIENyZWF0ZSBtb3VzZWVudGVyL2xlYXZlIGV2ZW50cyB1c2luZyBtb3VzZW92ZXIvb3V0IGFuZCBldmVudC10aW1lIGNoZWNrc1xuLy8gc28gdGhhdCBldmVudCBkZWxlZ2F0aW9uIHdvcmtzIGluIGpRdWVyeS5cbi8vIERvIHRoZSBzYW1lIGZvciBwb2ludGVyZW50ZXIvcG9pbnRlcmxlYXZlIGFuZCBwb2ludGVyb3Zlci9wb2ludGVyb3V0XG4vL1xuLy8gU3VwcG9ydDogU2FmYXJpIDcgb25seVxuLy8gU2FmYXJpIHNlbmRzIG1vdXNlZW50ZXIgdG9vIG9mdGVuOyBzZWU6XG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NzAyNThcbi8vIGZvciB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGJ1ZyAoaXQgZXhpc3RlZCBpbiBvbGRlciBDaHJvbWUgdmVyc2lvbnMgYXMgd2VsbCkuXG5qUXVlcnkuZWFjaCgge1xuXHRtb3VzZWVudGVyOiBcIm1vdXNlb3ZlclwiLFxuXHRtb3VzZWxlYXZlOiBcIm1vdXNlb3V0XCIsXG5cdHBvaW50ZXJlbnRlcjogXCJwb2ludGVyb3ZlclwiLFxuXHRwb2ludGVybGVhdmU6IFwicG9pbnRlcm91dFwiXG59LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuXHRqUXVlcnkuZXZlbnQuc3BlY2lhbFsgb3JpZyBdID0ge1xuXHRcdGRlbGVnYXRlVHlwZTogZml4LFxuXHRcdGJpbmRUeXBlOiBmaXgsXG5cblx0XHRoYW5kbGU6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdHZhciByZXQsXG5cdFx0XHRcdHRhcmdldCA9IHRoaXMsXG5cdFx0XHRcdHJlbGF0ZWQgPSBldmVudC5yZWxhdGVkVGFyZ2V0LFxuXHRcdFx0XHRoYW5kbGVPYmogPSBldmVudC5oYW5kbGVPYmo7XG5cblx0XHRcdC8vIEZvciBtb3VzZWVudGVyL2xlYXZlIGNhbGwgdGhlIGhhbmRsZXIgaWYgcmVsYXRlZCBpcyBvdXRzaWRlIHRoZSB0YXJnZXQuXG5cdFx0XHQvLyBOQjogTm8gcmVsYXRlZFRhcmdldCBpZiB0aGUgbW91c2UgbGVmdC9lbnRlcmVkIHRoZSBicm93c2VyIHdpbmRvd1xuXHRcdFx0aWYgKCAhcmVsYXRlZCB8fCAoIHJlbGF0ZWQgIT09IHRhcmdldCAmJiAhalF1ZXJ5LmNvbnRhaW5zKCB0YXJnZXQsIHJlbGF0ZWQgKSApICkge1xuXHRcdFx0XHRldmVudC50eXBlID0gaGFuZGxlT2JqLm9yaWdUeXBlO1xuXHRcdFx0XHRyZXQgPSBoYW5kbGVPYmouaGFuZGxlci5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdGV2ZW50LnR5cGUgPSBmaXg7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblx0fTtcbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdG9uOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gb24oIHRoaXMsIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKTtcblx0fSxcblx0b25lOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gb24oIHRoaXMsIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIDEgKTtcblx0fSxcblx0b2ZmOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBmbiApIHtcblx0XHR2YXIgaGFuZGxlT2JqLCB0eXBlO1xuXHRcdGlmICggdHlwZXMgJiYgdHlwZXMucHJldmVudERlZmF1bHQgJiYgdHlwZXMuaGFuZGxlT2JqICkge1xuXG5cdFx0XHQvLyAoIGV2ZW50ICkgIGRpc3BhdGNoZWQgalF1ZXJ5LkV2ZW50XG5cdFx0XHRoYW5kbGVPYmogPSB0eXBlcy5oYW5kbGVPYmo7XG5cdFx0XHRqUXVlcnkoIHR5cGVzLmRlbGVnYXRlVGFyZ2V0ICkub2ZmKFxuXHRcdFx0XHRoYW5kbGVPYmoubmFtZXNwYWNlID9cblx0XHRcdFx0XHRoYW5kbGVPYmoub3JpZ1R5cGUgKyBcIi5cIiArIGhhbmRsZU9iai5uYW1lc3BhY2UgOlxuXHRcdFx0XHRcdGhhbmRsZU9iai5vcmlnVHlwZSxcblx0XHRcdFx0aGFuZGxlT2JqLnNlbGVjdG9yLFxuXHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlclxuXHRcdFx0KTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcy1vYmplY3QgWywgc2VsZWN0b3JdIClcblx0XHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRcdHRoaXMub2ZmKCB0eXBlLCBzZWxlY3RvciwgdHlwZXNbIHR5cGUgXSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggc2VsZWN0b3IgPT09IGZhbHNlIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzIFssIGZuXSApXG5cdFx0XHRmbiA9IHNlbGVjdG9yO1xuXHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmICggZm4gPT09IGZhbHNlICkge1xuXHRcdFx0Zm4gPSByZXR1cm5GYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCB0aGlzLCB0eXBlcywgZm4sIHNlbGVjdG9yICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cblxudmFyXG5cblx0LyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZXNsaW50L2VzbGludC9pc3N1ZXMvMzIyOVxuXHRyeGh0bWxUYWcgPSAvPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbYS16XVteXFwvXFwwPlxceDIwXFx0XFxyXFxuXFxmXSopW14+XSopXFwvPi9naSxcblxuXHQvKiBlc2xpbnQtZW5hYmxlICovXG5cblx0Ly8gU3VwcG9ydDogSUUgPD0xMCAtIDExLCBFZGdlIDEyIC0gMTNcblx0Ly8gSW4gSUUvRWRnZSB1c2luZyByZWdleCBncm91cHMgaGVyZSBjYXVzZXMgc2V2ZXJlIHNsb3dkb3ducy5cblx0Ly8gU2VlIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvMTczNjUxMi9cblx0cm5vSW5uZXJodG1sID0gLzxzY3JpcHR8PHN0eWxlfDxsaW5rL2ksXG5cblx0Ly8gY2hlY2tlZD1cImNoZWNrZWRcIiBvciBjaGVja2VkXG5cdHJjaGVja2VkID0gL2NoZWNrZWRcXHMqKD86W149XXw9XFxzKi5jaGVja2VkLikvaSxcblx0cnNjcmlwdFR5cGVNYXNrZWQgPSAvXnRydWVcXC8oLiopLyxcblx0cmNsZWFuU2NyaXB0ID0gL15cXHMqPCEoPzpcXFtDREFUQVxcW3wtLSl8KD86XFxdXFxdfC0tKT5cXHMqJC9nO1xuXG5mdW5jdGlvbiBtYW5pcHVsYXRpb25UYXJnZXQoIGVsZW0sIGNvbnRlbnQgKSB7XG5cdGlmICggalF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcInRhYmxlXCIgKSAmJlxuXHRcdGpRdWVyeS5ub2RlTmFtZSggY29udGVudC5ub2RlVHlwZSAhPT0gMTEgPyBjb250ZW50IDogY29udGVudC5maXJzdENoaWxkLCBcInRyXCIgKSApIHtcblxuXHRcdHJldHVybiBlbGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcInRib2R5XCIgKVsgMCBdIHx8IGVsZW07XG5cdH1cblxuXHRyZXR1cm4gZWxlbTtcbn1cblxuLy8gUmVwbGFjZS9yZXN0b3JlIHRoZSB0eXBlIGF0dHJpYnV0ZSBvZiBzY3JpcHQgZWxlbWVudHMgZm9yIHNhZmUgRE9NIG1hbmlwdWxhdGlvblxuZnVuY3Rpb24gZGlzYWJsZVNjcmlwdCggZWxlbSApIHtcblx0ZWxlbS50eXBlID0gKCBlbGVtLmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSAhPT0gbnVsbCApICsgXCIvXCIgKyBlbGVtLnR5cGU7XG5cdHJldHVybiBlbGVtO1xufVxuZnVuY3Rpb24gcmVzdG9yZVNjcmlwdCggZWxlbSApIHtcblx0dmFyIG1hdGNoID0gcnNjcmlwdFR5cGVNYXNrZWQuZXhlYyggZWxlbS50eXBlICk7XG5cblx0aWYgKCBtYXRjaCApIHtcblx0XHRlbGVtLnR5cGUgPSBtYXRjaFsgMSBdO1xuXHR9IGVsc2Uge1xuXHRcdGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBcInR5cGVcIiApO1xuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbmZ1bmN0aW9uIGNsb25lQ29weUV2ZW50KCBzcmMsIGRlc3QgKSB7XG5cdHZhciBpLCBsLCB0eXBlLCBwZGF0YU9sZCwgcGRhdGFDdXIsIHVkYXRhT2xkLCB1ZGF0YUN1ciwgZXZlbnRzO1xuXG5cdGlmICggZGVzdC5ub2RlVHlwZSAhPT0gMSApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyAxLiBDb3B5IHByaXZhdGUgZGF0YTogZXZlbnRzLCBoYW5kbGVycywgZXRjLlxuXHRpZiAoIGRhdGFQcml2Lmhhc0RhdGEoIHNyYyApICkge1xuXHRcdHBkYXRhT2xkID0gZGF0YVByaXYuYWNjZXNzKCBzcmMgKTtcblx0XHRwZGF0YUN1ciA9IGRhdGFQcml2LnNldCggZGVzdCwgcGRhdGFPbGQgKTtcblx0XHRldmVudHMgPSBwZGF0YU9sZC5ldmVudHM7XG5cblx0XHRpZiAoIGV2ZW50cyApIHtcblx0XHRcdGRlbGV0ZSBwZGF0YUN1ci5oYW5kbGU7XG5cdFx0XHRwZGF0YUN1ci5ldmVudHMgPSB7fTtcblxuXHRcdFx0Zm9yICggdHlwZSBpbiBldmVudHMgKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwLCBsID0gZXZlbnRzWyB0eXBlIF0ubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5hZGQoIGRlc3QsIHR5cGUsIGV2ZW50c1sgdHlwZSBdWyBpIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIDIuIENvcHkgdXNlciBkYXRhXG5cdGlmICggZGF0YVVzZXIuaGFzRGF0YSggc3JjICkgKSB7XG5cdFx0dWRhdGFPbGQgPSBkYXRhVXNlci5hY2Nlc3MoIHNyYyApO1xuXHRcdHVkYXRhQ3VyID0galF1ZXJ5LmV4dGVuZCgge30sIHVkYXRhT2xkICk7XG5cblx0XHRkYXRhVXNlci5zZXQoIGRlc3QsIHVkYXRhQ3VyICk7XG5cdH1cbn1cblxuLy8gRml4IElFIGJ1Z3MsIHNlZSBzdXBwb3J0IHRlc3RzXG5mdW5jdGlvbiBmaXhJbnB1dCggc3JjLCBkZXN0ICkge1xuXHR2YXIgbm9kZU5hbWUgPSBkZXN0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0Ly8gRmFpbHMgdG8gcGVyc2lzdCB0aGUgY2hlY2tlZCBzdGF0ZSBvZiBhIGNsb25lZCBjaGVja2JveCBvciByYWRpbyBidXR0b24uXG5cdGlmICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiByY2hlY2thYmxlVHlwZS50ZXN0KCBzcmMudHlwZSApICkge1xuXHRcdGRlc3QuY2hlY2tlZCA9IHNyYy5jaGVja2VkO1xuXG5cdC8vIEZhaWxzIHRvIHJldHVybiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRvIHRoZSBkZWZhdWx0IHNlbGVjdGVkIHN0YXRlIHdoZW4gY2xvbmluZyBvcHRpb25zXG5cdH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgfHwgbm9kZU5hbWUgPT09IFwidGV4dGFyZWFcIiApIHtcblx0XHRkZXN0LmRlZmF1bHRWYWx1ZSA9IHNyYy5kZWZhdWx0VmFsdWU7XG5cdH1cbn1cblxuZnVuY3Rpb24gZG9tTWFuaXAoIGNvbGxlY3Rpb24sIGFyZ3MsIGNhbGxiYWNrLCBpZ25vcmVkICkge1xuXG5cdC8vIEZsYXR0ZW4gYW55IG5lc3RlZCBhcnJheXNcblx0YXJncyA9IGNvbmNhdC5hcHBseSggW10sIGFyZ3MgKTtcblxuXHR2YXIgZnJhZ21lbnQsIGZpcnN0LCBzY3JpcHRzLCBoYXNTY3JpcHRzLCBub2RlLCBkb2MsXG5cdFx0aSA9IDAsXG5cdFx0bCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuXHRcdGlOb0Nsb25lID0gbCAtIDEsXG5cdFx0dmFsdWUgPSBhcmdzWyAwIF0sXG5cdFx0aXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApO1xuXG5cdC8vIFdlIGNhbid0IGNsb25lTm9kZSBmcmFnbWVudHMgdGhhdCBjb250YWluIGNoZWNrZWQsIGluIFdlYktpdFxuXHRpZiAoIGlzRnVuY3Rpb24gfHxcblx0XHRcdCggbCA+IDEgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmXG5cdFx0XHRcdCFzdXBwb3J0LmNoZWNrQ2xvbmUgJiYgcmNoZWNrZWQudGVzdCggdmFsdWUgKSApICkge1xuXHRcdHJldHVybiBjb2xsZWN0aW9uLmVhY2goIGZ1bmN0aW9uKCBpbmRleCApIHtcblx0XHRcdHZhciBzZWxmID0gY29sbGVjdGlvbi5lcSggaW5kZXggKTtcblx0XHRcdGlmICggaXNGdW5jdGlvbiApIHtcblx0XHRcdFx0YXJnc1sgMCBdID0gdmFsdWUuY2FsbCggdGhpcywgaW5kZXgsIHNlbGYuaHRtbCgpICk7XG5cdFx0XHR9XG5cdFx0XHRkb21NYW5pcCggc2VsZiwgYXJncywgY2FsbGJhY2ssIGlnbm9yZWQgKTtcblx0XHR9ICk7XG5cdH1cblxuXHRpZiAoIGwgKSB7XG5cdFx0ZnJhZ21lbnQgPSBidWlsZEZyYWdtZW50KCBhcmdzLCBjb2xsZWN0aW9uWyAwIF0ub3duZXJEb2N1bWVudCwgZmFsc2UsIGNvbGxlY3Rpb24sIGlnbm9yZWQgKTtcblx0XHRmaXJzdCA9IGZyYWdtZW50LmZpcnN0Q2hpbGQ7XG5cblx0XHRpZiAoIGZyYWdtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICkge1xuXHRcdFx0ZnJhZ21lbnQgPSBmaXJzdDtcblx0XHR9XG5cblx0XHQvLyBSZXF1aXJlIGVpdGhlciBuZXcgY29udGVudCBvciBhbiBpbnRlcmVzdCBpbiBpZ25vcmVkIGVsZW1lbnRzIHRvIGludm9rZSB0aGUgY2FsbGJhY2tcblx0XHRpZiAoIGZpcnN0IHx8IGlnbm9yZWQgKSB7XG5cdFx0XHRzY3JpcHRzID0galF1ZXJ5Lm1hcCggZ2V0QWxsKCBmcmFnbWVudCwgXCJzY3JpcHRcIiApLCBkaXNhYmxlU2NyaXB0ICk7XG5cdFx0XHRoYXNTY3JpcHRzID0gc2NyaXB0cy5sZW5ndGg7XG5cblx0XHRcdC8vIFVzZSB0aGUgb3JpZ2luYWwgZnJhZ21lbnQgZm9yIHRoZSBsYXN0IGl0ZW1cblx0XHRcdC8vIGluc3RlYWQgb2YgdGhlIGZpcnN0IGJlY2F1c2UgaXQgY2FuIGVuZCB1cFxuXHRcdFx0Ly8gYmVpbmcgZW1wdGllZCBpbmNvcnJlY3RseSBpbiBjZXJ0YWluIHNpdHVhdGlvbnMgKCM4MDcwKS5cblx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0bm9kZSA9IGZyYWdtZW50O1xuXG5cdFx0XHRcdGlmICggaSAhPT0gaU5vQ2xvbmUgKSB7XG5cdFx0XHRcdFx0bm9kZSA9IGpRdWVyeS5jbG9uZSggbm9kZSwgdHJ1ZSwgdHJ1ZSApO1xuXG5cdFx0XHRcdFx0Ly8gS2VlcCByZWZlcmVuY2VzIHRvIGNsb25lZCBzY3JpcHRzIGZvciBsYXRlciByZXN0b3JhdGlvblxuXHRcdFx0XHRcdGlmICggaGFzU2NyaXB0cyApIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5LCBQaGFudG9tSlMgMSBvbmx5XG5cdFx0XHRcdFx0XHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdFx0XHRcdFx0XHRqUXVlcnkubWVyZ2UoIHNjcmlwdHMsIGdldEFsbCggbm9kZSwgXCJzY3JpcHRcIiApICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2FsbGJhY2suY2FsbCggY29sbGVjdGlvblsgaSBdLCBub2RlLCBpICk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggaGFzU2NyaXB0cyApIHtcblx0XHRcdFx0ZG9jID0gc2NyaXB0c1sgc2NyaXB0cy5sZW5ndGggLSAxIF0ub3duZXJEb2N1bWVudDtcblxuXHRcdFx0XHQvLyBSZWVuYWJsZSBzY3JpcHRzXG5cdFx0XHRcdGpRdWVyeS5tYXAoIHNjcmlwdHMsIHJlc3RvcmVTY3JpcHQgKTtcblxuXHRcdFx0XHQvLyBFdmFsdWF0ZSBleGVjdXRhYmxlIHNjcmlwdHMgb24gZmlyc3QgZG9jdW1lbnQgaW5zZXJ0aW9uXG5cdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgaGFzU2NyaXB0czsgaSsrICkge1xuXHRcdFx0XHRcdG5vZGUgPSBzY3JpcHRzWyBpIF07XG5cdFx0XHRcdFx0aWYgKCByc2NyaXB0VHlwZS50ZXN0KCBub2RlLnR5cGUgfHwgXCJcIiApICYmXG5cdFx0XHRcdFx0XHQhZGF0YVByaXYuYWNjZXNzKCBub2RlLCBcImdsb2JhbEV2YWxcIiApICYmXG5cdFx0XHRcdFx0XHRqUXVlcnkuY29udGFpbnMoIGRvYywgbm9kZSApICkge1xuXG5cdFx0XHRcdFx0XHRpZiAoIG5vZGUuc3JjICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIE9wdGlvbmFsIEFKQVggZGVwZW5kZW5jeSwgYnV0IHdvbid0IHJ1biBzY3JpcHRzIGlmIG5vdCBwcmVzZW50XG5cdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5Ll9ldmFsVXJsICkge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5fZXZhbFVybCggbm9kZS5zcmMgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0RE9NRXZhbCggbm9kZS50ZXh0Q29udGVudC5yZXBsYWNlKCByY2xlYW5TY3JpcHQsIFwiXCIgKSwgZG9jICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNvbGxlY3Rpb247XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSggZWxlbSwgc2VsZWN0b3IsIGtlZXBEYXRhICkge1xuXHR2YXIgbm9kZSxcblx0XHRub2RlcyA9IHNlbGVjdG9yID8galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIGVsZW0gKSA6IGVsZW0sXG5cdFx0aSA9IDA7XG5cblx0Zm9yICggOyAoIG5vZGUgPSBub2Rlc1sgaSBdICkgIT0gbnVsbDsgaSsrICkge1xuXHRcdGlmICggIWtlZXBEYXRhICYmIG5vZGUubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIG5vZGUgKSApO1xuXHRcdH1cblxuXHRcdGlmICggbm9kZS5wYXJlbnROb2RlICkge1xuXHRcdFx0aWYgKCBrZWVwRGF0YSAmJiBqUXVlcnkuY29udGFpbnMoIG5vZGUub3duZXJEb2N1bWVudCwgbm9kZSApICkge1xuXHRcdFx0XHRzZXRHbG9iYWxFdmFsKCBnZXRBbGwoIG5vZGUsIFwic2NyaXB0XCIgKSApO1xuXHRcdFx0fVxuXHRcdFx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBub2RlICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0aHRtbFByZWZpbHRlcjogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0cmV0dXJuIGh0bWwucmVwbGFjZSggcnhodG1sVGFnLCBcIjwkMT48LyQyPlwiICk7XG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uKCBlbGVtLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHR2YXIgaSwgbCwgc3JjRWxlbWVudHMsIGRlc3RFbGVtZW50cyxcblx0XHRcdGNsb25lID0gZWxlbS5jbG9uZU5vZGUoIHRydWUgKSxcblx0XHRcdGluUGFnZSA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cblx0XHQvLyBGaXggSUUgY2xvbmluZyBpc3N1ZXNcblx0XHRpZiAoICFzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkICYmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBlbGVtLm5vZGVUeXBlID09PSAxMSApICYmXG5cdFx0XHRcdCFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblxuXHRcdFx0Ly8gV2UgZXNjaGV3IFNpenpsZSBoZXJlIGZvciBwZXJmb3JtYW5jZSByZWFzb25zOiBodHRwczovL2pzcGVyZi5jb20vZ2V0YWxsLXZzLXNpenpsZS8yXG5cdFx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lICk7XG5cdFx0XHRzcmNFbGVtZW50cyA9IGdldEFsbCggZWxlbSApO1xuXG5cdFx0XHRmb3IgKCBpID0gMCwgbCA9IHNyY0VsZW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0Zml4SW5wdXQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ29weSB0aGUgZXZlbnRzIGZyb20gdGhlIG9yaWdpbmFsIHRvIHRoZSBjbG9uZVxuXHRcdGlmICggZGF0YUFuZEV2ZW50cyApIHtcblx0XHRcdGlmICggZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0XHRcdHNyY0VsZW1lbnRzID0gc3JjRWxlbWVudHMgfHwgZ2V0QWxsKCBlbGVtICk7XG5cdFx0XHRcdGRlc3RFbGVtZW50cyA9IGRlc3RFbGVtZW50cyB8fCBnZXRBbGwoIGNsb25lICk7XG5cblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBzcmNFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0Y2xvbmVDb3B5RXZlbnQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNsb25lQ29weUV2ZW50KCBlbGVtLCBjbG9uZSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3Rvcnlcblx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lLCBcInNjcmlwdFwiICk7XG5cdFx0aWYgKCBkZXN0RWxlbWVudHMubGVuZ3RoID4gMCApIHtcblx0XHRcdHNldEdsb2JhbEV2YWwoIGRlc3RFbGVtZW50cywgIWluUGFnZSAmJiBnZXRBbGwoIGVsZW0sIFwic2NyaXB0XCIgKSApO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiB0aGUgY2xvbmVkIHNldFxuXHRcdHJldHVybiBjbG9uZTtcblx0fSxcblxuXHRjbGVhbkRhdGE6IGZ1bmN0aW9uKCBlbGVtcyApIHtcblx0XHR2YXIgZGF0YSwgZWxlbSwgdHlwZSxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbCxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoIGVsZW0gPSBlbGVtc1sgaSBdICkgIT09IHVuZGVmaW5lZDsgaSsrICkge1xuXHRcdFx0aWYgKCBhY2NlcHREYXRhKCBlbGVtICkgKSB7XG5cdFx0XHRcdGlmICggKCBkYXRhID0gZWxlbVsgZGF0YVByaXYuZXhwYW5kbyBdICkgKSB7XG5cdFx0XHRcdFx0aWYgKCBkYXRhLmV2ZW50cyApIHtcblx0XHRcdFx0XHRcdGZvciAoIHR5cGUgaW4gZGF0YS5ldmVudHMgKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggc3BlY2lhbFsgdHlwZSBdICkge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKTtcblxuXHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIGEgc2hvcnRjdXQgdG8gYXZvaWQgalF1ZXJ5LmV2ZW50LnJlbW92ZSdzIG92ZXJoZWFkXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBkYXRhLmhhbmRsZSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9MzUgLSA0NStcblx0XHRcdFx0XHQvLyBBc3NpZ24gdW5kZWZpbmVkIGluc3RlYWQgb2YgdXNpbmcgZGVsZXRlLCBzZWUgRGF0YSNyZW1vdmVcblx0XHRcdFx0XHRlbGVtWyBkYXRhUHJpdi5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBlbGVtWyBkYXRhVXNlci5leHBhbmRvIF0gKSB7XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWUgPD0zNSAtIDQ1K1xuXHRcdFx0XHRcdC8vIEFzc2lnbiB1bmRlZmluZWQgaW5zdGVhZCBvZiB1c2luZyBkZWxldGUsIHNlZSBEYXRhI3JlbW92ZVxuXHRcdFx0XHRcdGVsZW1bIGRhdGFVc2VyLmV4cGFuZG8gXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGRldGFjaDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiByZW1vdmUoIHRoaXMsIHNlbGVjdG9yLCB0cnVlICk7XG5cdH0sXG5cblx0cmVtb3ZlOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHJlbW92ZSggdGhpcywgc2VsZWN0b3IgKTtcblx0fSxcblxuXHR0ZXh0OiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRqUXVlcnkudGV4dCggdGhpcyApIDpcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdFx0dGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH0sXG5cblx0YXBwZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0dmFyIHRhcmdldCA9IG1hbmlwdWxhdGlvblRhcmdldCggdGhpcywgZWxlbSApO1xuXHRcdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0cHJlcGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcblx0XHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZSggZWxlbSwgdGFyZ2V0LmZpcnN0Q2hpbGQgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0YmVmb3JlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0dGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggZWxlbSwgdGhpcyApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRhZnRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMubmV4dFNpYmxpbmcgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0ZW1wdHk6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlbGVtLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7ICggZWxlbSA9IHRoaXNbIGkgXSApICE9IG51bGw7IGkrKyApIHtcblx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG1lbW9yeSBsZWFrc1xuXHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgYW55IHJlbWFpbmluZyBub2Rlc1xuXHRcdFx0XHRlbGVtLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24oIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdGRhdGFBbmRFdmVudHMgPSBkYXRhQW5kRXZlbnRzID09IG51bGwgPyBmYWxzZSA6IGRhdGFBbmRFdmVudHM7XG5cdFx0ZGVlcERhdGFBbmRFdmVudHMgPSBkZWVwRGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZGF0YUFuZEV2ZW50cyA6IGRlZXBEYXRhQW5kRXZlbnRzO1xuXG5cdFx0cmV0dXJuIHRoaXMubWFwKCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBqUXVlcnkuY2xvbmUoIHRoaXMsIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICk7XG5cdFx0fSApO1xuXHR9LFxuXG5cdGh0bWw6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgZWxlbSA9IHRoaXNbIDAgXSB8fCB7fSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdGwgPSB0aGlzLmxlbmd0aDtcblxuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmlubmVySFRNTDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2VlIGlmIHdlIGNhbiB0YWtlIGEgc2hvcnRjdXQgYW5kIGp1c3QgdXNlIGlubmVySFRNTFxuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgIXJub0lubmVyaHRtbC50ZXN0KCB2YWx1ZSApICYmXG5cdFx0XHRcdCF3cmFwTWFwWyAoIHJ0YWdOYW1lLmV4ZWMoIHZhbHVlICkgfHwgWyBcIlwiLCBcIlwiIF0gKVsgMSBdLnRvTG93ZXJDYXNlKCkgXSApIHtcblxuXHRcdFx0XHR2YWx1ZSA9IGpRdWVyeS5odG1sUHJlZmlsdGVyKCB2YWx1ZSApO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdFx0ZWxlbSA9IHRoaXNbIGkgXSB8fCB7fTtcblxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXG5cdFx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuXHRcdFx0XHRcdFx0XHRlbGVtLmlubmVySFRNTCA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVsZW0gPSAwO1xuXG5cdFx0XHRcdC8vIElmIHVzaW5nIGlubmVySFRNTCB0aHJvd3MgYW4gZXhjZXB0aW9uLCB1c2UgdGhlIGZhbGxiYWNrIG1ldGhvZFxuXHRcdFx0XHR9IGNhdGNoICggZSApIHt9XG5cdFx0XHR9XG5cblx0XHRcdGlmICggZWxlbSApIHtcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmFwcGVuZCggdmFsdWUgKTtcblx0XHRcdH1cblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9LFxuXG5cdHJlcGxhY2VXaXRoOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgaWdub3JlZCA9IFtdO1xuXG5cdFx0Ly8gTWFrZSB0aGUgY2hhbmdlcywgcmVwbGFjaW5nIGVhY2ggbm9uLWlnbm9yZWQgY29udGV4dCBlbGVtZW50IHdpdGggdGhlIG5ldyBjb250ZW50XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcblxuXHRcdFx0aWYgKCBqUXVlcnkuaW5BcnJheSggdGhpcywgaWdub3JlZCApIDwgMCApIHtcblx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCB0aGlzICkgKTtcblx0XHRcdFx0aWYgKCBwYXJlbnQgKSB7XG5cdFx0XHRcdFx0cGFyZW50LnJlcGxhY2VDaGlsZCggZWxlbSwgdGhpcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBGb3JjZSBjYWxsYmFjayBpbnZvY2F0aW9uXG5cdFx0fSwgaWdub3JlZCApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCB7XG5cdGFwcGVuZFRvOiBcImFwcGVuZFwiLFxuXHRwcmVwZW5kVG86IFwicHJlcGVuZFwiLFxuXHRpbnNlcnRCZWZvcmU6IFwiYmVmb3JlXCIsXG5cdGluc2VydEFmdGVyOiBcImFmdGVyXCIsXG5cdHJlcGxhY2VBbGw6IFwicmVwbGFjZVdpdGhcIlxufSwgZnVuY3Rpb24oIG5hbWUsIG9yaWdpbmFsICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgZWxlbXMsXG5cdFx0XHRyZXQgPSBbXSxcblx0XHRcdGluc2VydCA9IGpRdWVyeSggc2VsZWN0b3IgKSxcblx0XHRcdGxhc3QgPSBpbnNlcnQubGVuZ3RoIC0gMSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyBpIDw9IGxhc3Q7IGkrKyApIHtcblx0XHRcdGVsZW1zID0gaSA9PT0gbGFzdCA/IHRoaXMgOiB0aGlzLmNsb25lKCB0cnVlICk7XG5cdFx0XHRqUXVlcnkoIGluc2VydFsgaSBdIClbIG9yaWdpbmFsIF0oIGVsZW1zICk7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHRcdFx0Ly8gLmdldCgpIGJlY2F1c2UgcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0cHVzaC5hcHBseSggcmV0LCBlbGVtcy5nZXQoKSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggcmV0ICk7XG5cdH07XG59ICk7XG52YXIgcm1hcmdpbiA9ICggL15tYXJnaW4vICk7XG5cbnZhciBybnVtbm9ucHggPSBuZXcgUmVnRXhwKCBcIl4oXCIgKyBwbnVtICsgXCIpKD8hcHgpW2EteiVdKyRcIiwgXCJpXCIgKTtcblxudmFyIGdldFN0eWxlcyA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5LCBGaXJlZm94IDw9MzAgKCMxNTA5OCwgIzE0MTUwKVxuXHRcdC8vIElFIHRocm93cyBvbiBlbGVtZW50cyBjcmVhdGVkIGluIHBvcHVwc1xuXHRcdC8vIEZGIG1lYW53aGlsZSB0aHJvd3Mgb24gZnJhbWUgZWxlbWVudHMgdGhyb3VnaCBcImRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGVcIlxuXHRcdHZhciB2aWV3ID0gZWxlbS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuXG5cdFx0aWYgKCAhdmlldyB8fCAhdmlldy5vcGVuZXIgKSB7XG5cdFx0XHR2aWV3ID0gd2luZG93O1xuXHRcdH1cblxuXHRcdHJldHVybiB2aWV3LmdldENvbXB1dGVkU3R5bGUoIGVsZW0gKTtcblx0fTtcblxuXG5cbiggZnVuY3Rpb24oKSB7XG5cblx0Ly8gRXhlY3V0aW5nIGJvdGggcGl4ZWxQb3NpdGlvbiAmIGJveFNpemluZ1JlbGlhYmxlIHRlc3RzIHJlcXVpcmUgb25seSBvbmUgbGF5b3V0XG5cdC8vIHNvIHRoZXkncmUgZXhlY3V0ZWQgYXQgdGhlIHNhbWUgdGltZSB0byBzYXZlIHRoZSBzZWNvbmQgY29tcHV0YXRpb24uXG5cdGZ1bmN0aW9uIGNvbXB1dGVTdHlsZVRlc3RzKCkge1xuXG5cdFx0Ly8gVGhpcyBpcyBhIHNpbmdsZXRvbiwgd2UgbmVlZCB0byBleGVjdXRlIGl0IG9ubHkgb25jZVxuXHRcdGlmICggIWRpdiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRkaXYuc3R5bGUuY3NzVGV4dCA9XG5cdFx0XHRcImJveC1zaXppbmc6Ym9yZGVyLWJveDtcIiArXG5cdFx0XHRcInBvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7XCIgK1xuXHRcdFx0XCJtYXJnaW46YXV0bztib3JkZXI6MXB4O3BhZGRpbmc6MXB4O1wiICtcblx0XHRcdFwidG9wOjElO3dpZHRoOjUwJVwiO1xuXHRcdGRpdi5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdGRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZCggY29udGFpbmVyICk7XG5cblx0XHR2YXIgZGl2U3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSggZGl2ICk7XG5cdFx0cGl4ZWxQb3NpdGlvblZhbCA9IGRpdlN0eWxlLnRvcCAhPT0gXCIxJVwiO1xuXG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAgLSA0LjMgb25seSwgRmlyZWZveCA8PTMgLSA0NFxuXHRcdHJlbGlhYmxlTWFyZ2luTGVmdFZhbCA9IGRpdlN0eWxlLm1hcmdpbkxlZnQgPT09IFwiMnB4XCI7XG5cdFx0Ym94U2l6aW5nUmVsaWFibGVWYWwgPSBkaXZTdHlsZS53aWR0aCA9PT0gXCI0cHhcIjtcblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIC0gNC4zIG9ubHlcblx0XHQvLyBTb21lIHN0eWxlcyBjb21lIGJhY2sgd2l0aCBwZXJjZW50YWdlIHZhbHVlcywgZXZlbiB0aG91Z2ggdGhleSBzaG91bGRuJ3Rcblx0XHRkaXYuc3R5bGUubWFyZ2luUmlnaHQgPSBcIjUwJVwiO1xuXHRcdHBpeGVsTWFyZ2luUmlnaHRWYWwgPSBkaXZTdHlsZS5tYXJnaW5SaWdodCA9PT0gXCI0cHhcIjtcblxuXHRcdGRvY3VtZW50RWxlbWVudC5yZW1vdmVDaGlsZCggY29udGFpbmVyICk7XG5cblx0XHQvLyBOdWxsaWZ5IHRoZSBkaXYgc28gaXQgd291bGRuJ3QgYmUgc3RvcmVkIGluIHRoZSBtZW1vcnkgYW5kXG5cdFx0Ly8gaXQgd2lsbCBhbHNvIGJlIGEgc2lnbiB0aGF0IGNoZWNrcyBhbHJlYWR5IHBlcmZvcm1lZFxuXHRcdGRpdiA9IG51bGw7XG5cdH1cblxuXHR2YXIgcGl4ZWxQb3NpdGlvblZhbCwgYm94U2l6aW5nUmVsaWFibGVWYWwsIHBpeGVsTWFyZ2luUmlnaHRWYWwsIHJlbGlhYmxlTWFyZ2luTGVmdFZhbCxcblx0XHRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICksXG5cdFx0ZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuXG5cdC8vIEZpbmlzaCBlYXJseSBpbiBsaW1pdGVkIChub24tYnJvd3NlcikgZW52aXJvbm1lbnRzXG5cdGlmICggIWRpdi5zdHlsZSApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdC8vIFN0eWxlIG9mIGNsb25lZCBlbGVtZW50IGFmZmVjdHMgc291cmNlIGVsZW1lbnQgY2xvbmVkICgjODkwOClcblx0ZGl2LnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJjb250ZW50LWJveFwiO1xuXHRkaXYuY2xvbmVOb2RlKCB0cnVlICkuc3R5bGUuYmFja2dyb3VuZENsaXAgPSBcIlwiO1xuXHRzdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSA9IGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9PT0gXCJjb250ZW50LWJveFwiO1xuXG5cdGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gXCJib3JkZXI6MDt3aWR0aDo4cHg7aGVpZ2h0OjA7dG9wOjA7bGVmdDotOTk5OXB4O1wiICtcblx0XHRcInBhZGRpbmc6MDttYXJnaW4tdG9wOjFweDtwb3NpdGlvbjphYnNvbHV0ZVwiO1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIGRpdiApO1xuXG5cdGpRdWVyeS5leHRlbmQoIHN1cHBvcnQsIHtcblx0XHRwaXhlbFBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gcGl4ZWxQb3NpdGlvblZhbDtcblx0XHR9LFxuXHRcdGJveFNpemluZ1JlbGlhYmxlOiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gYm94U2l6aW5nUmVsaWFibGVWYWw7XG5cdFx0fSxcblx0XHRwaXhlbE1hcmdpblJpZ2h0OiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gcGl4ZWxNYXJnaW5SaWdodFZhbDtcblx0XHR9LFxuXHRcdHJlbGlhYmxlTWFyZ2luTGVmdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIHJlbGlhYmxlTWFyZ2luTGVmdFZhbDtcblx0XHR9XG5cdH0gKTtcbn0gKSgpO1xuXG5cbmZ1bmN0aW9uIGN1ckNTUyggZWxlbSwgbmFtZSwgY29tcHV0ZWQgKSB7XG5cdHZhciB3aWR0aCwgbWluV2lkdGgsIG1heFdpZHRoLCByZXQsXG5cdFx0c3R5bGUgPSBlbGVtLnN0eWxlO1xuXG5cdGNvbXB1dGVkID0gY29tcHV0ZWQgfHwgZ2V0U3R5bGVzKCBlbGVtICk7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD05IG9ubHlcblx0Ly8gZ2V0UHJvcGVydHlWYWx1ZSBpcyBvbmx5IG5lZWRlZCBmb3IgLmNzcygnZmlsdGVyJykgKCMxMjUzNylcblx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRyZXQgPSBjb21wdXRlZC5nZXRQcm9wZXJ0eVZhbHVlKCBuYW1lICkgfHwgY29tcHV0ZWRbIG5hbWUgXTtcblxuXHRcdGlmICggcmV0ID09PSBcIlwiICYmICFqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApICkge1xuXHRcdFx0cmV0ID0galF1ZXJ5LnN0eWxlKCBlbGVtLCBuYW1lICk7XG5cdFx0fVxuXG5cdFx0Ly8gQSB0cmlidXRlIHRvIHRoZSBcImF3ZXNvbWUgaGFjayBieSBEZWFuIEVkd2FyZHNcIlxuXHRcdC8vIEFuZHJvaWQgQnJvd3NlciByZXR1cm5zIHBlcmNlbnRhZ2UgZm9yIHNvbWUgdmFsdWVzLFxuXHRcdC8vIGJ1dCB3aWR0aCBzZWVtcyB0byBiZSByZWxpYWJseSBwaXhlbHMuXG5cdFx0Ly8gVGhpcyBpcyBhZ2FpbnN0IHRoZSBDU1NPTSBkcmFmdCBzcGVjOlxuXHRcdC8vIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3NvbS8jcmVzb2x2ZWQtdmFsdWVzXG5cdFx0aWYgKCAhc3VwcG9ydC5waXhlbE1hcmdpblJpZ2h0KCkgJiYgcm51bW5vbnB4LnRlc3QoIHJldCApICYmIHJtYXJnaW4udGVzdCggbmFtZSApICkge1xuXG5cdFx0XHQvLyBSZW1lbWJlciB0aGUgb3JpZ2luYWwgdmFsdWVzXG5cdFx0XHR3aWR0aCA9IHN0eWxlLndpZHRoO1xuXHRcdFx0bWluV2lkdGggPSBzdHlsZS5taW5XaWR0aDtcblx0XHRcdG1heFdpZHRoID0gc3R5bGUubWF4V2lkdGg7XG5cblx0XHRcdC8vIFB1dCBpbiB0aGUgbmV3IHZhbHVlcyB0byBnZXQgYSBjb21wdXRlZCB2YWx1ZSBvdXRcblx0XHRcdHN0eWxlLm1pbldpZHRoID0gc3R5bGUubWF4V2lkdGggPSBzdHlsZS53aWR0aCA9IHJldDtcblx0XHRcdHJldCA9IGNvbXB1dGVkLndpZHRoO1xuXG5cdFx0XHQvLyBSZXZlcnQgdGhlIGNoYW5nZWQgdmFsdWVzXG5cdFx0XHRzdHlsZS53aWR0aCA9IHdpZHRoO1xuXHRcdFx0c3R5bGUubWluV2lkdGggPSBtaW5XaWR0aDtcblx0XHRcdHN0eWxlLm1heFdpZHRoID0gbWF4V2lkdGg7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJldCAhPT0gdW5kZWZpbmVkID9cblxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExIG9ubHlcblx0XHQvLyBJRSByZXR1cm5zIHpJbmRleCB2YWx1ZSBhcyBhbiBpbnRlZ2VyLlxuXHRcdHJldCArIFwiXCIgOlxuXHRcdHJldDtcbn1cblxuXG5mdW5jdGlvbiBhZGRHZXRIb29rSWYoIGNvbmRpdGlvbkZuLCBob29rRm4gKSB7XG5cblx0Ly8gRGVmaW5lIHRoZSBob29rLCB3ZSdsbCBjaGVjayBvbiB0aGUgZmlyc3QgcnVuIGlmIGl0J3MgcmVhbGx5IG5lZWRlZC5cblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBjb25kaXRpb25GbigpICkge1xuXG5cdFx0XHRcdC8vIEhvb2sgbm90IG5lZWRlZCAob3IgaXQncyBub3QgcG9zc2libGUgdG8gdXNlIGl0IGR1ZVxuXHRcdFx0XHQvLyB0byBtaXNzaW5nIGRlcGVuZGVuY3kpLCByZW1vdmUgaXQuXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmdldDtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBIb29rIG5lZWRlZDsgcmVkZWZpbmUgaXQgc28gdGhhdCB0aGUgc3VwcG9ydCB0ZXN0IGlzIG5vdCBleGVjdXRlZCBhZ2Fpbi5cblx0XHRcdHJldHVybiAoIHRoaXMuZ2V0ID0gaG9va0ZuICkuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdH1cblx0fTtcbn1cblxuXG52YXJcblxuXHQvLyBTd2FwcGFibGUgaWYgZGlzcGxheSBpcyBub25lIG9yIHN0YXJ0cyB3aXRoIHRhYmxlXG5cdC8vIGV4Y2VwdCBcInRhYmxlXCIsIFwidGFibGUtY2VsbFwiLCBvciBcInRhYmxlLWNhcHRpb25cIlxuXHQvLyBTZWUgaGVyZSBmb3IgZGlzcGxheSB2YWx1ZXM6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvQ1NTL2Rpc3BsYXlcblx0cmRpc3BsYXlzd2FwID0gL14obm9uZXx0YWJsZSg/IS1jW2VhXSkuKykvLFxuXHRjc3NTaG93ID0geyBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCB2aXNpYmlsaXR5OiBcImhpZGRlblwiLCBkaXNwbGF5OiBcImJsb2NrXCIgfSxcblx0Y3NzTm9ybWFsVHJhbnNmb3JtID0ge1xuXHRcdGxldHRlclNwYWNpbmc6IFwiMFwiLFxuXHRcdGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0fSxcblxuXHRjc3NQcmVmaXhlcyA9IFsgXCJXZWJraXRcIiwgXCJNb3pcIiwgXCJtc1wiIF0sXG5cdGVtcHR5U3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkuc3R5bGU7XG5cbi8vIFJldHVybiBhIGNzcyBwcm9wZXJ0eSBtYXBwZWQgdG8gYSBwb3RlbnRpYWxseSB2ZW5kb3IgcHJlZml4ZWQgcHJvcGVydHlcbmZ1bmN0aW9uIHZlbmRvclByb3BOYW1lKCBuYW1lICkge1xuXG5cdC8vIFNob3J0Y3V0IGZvciBuYW1lcyB0aGF0IGFyZSBub3QgdmVuZG9yIHByZWZpeGVkXG5cdGlmICggbmFtZSBpbiBlbXB0eVN0eWxlICkge1xuXHRcdHJldHVybiBuYW1lO1xuXHR9XG5cblx0Ly8gQ2hlY2sgZm9yIHZlbmRvciBwcmVmaXhlZCBuYW1lc1xuXHR2YXIgY2FwTmFtZSA9IG5hbWVbIDAgXS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSggMSApLFxuXHRcdGkgPSBjc3NQcmVmaXhlcy5sZW5ndGg7XG5cblx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0bmFtZSA9IGNzc1ByZWZpeGVzWyBpIF0gKyBjYXBOYW1lO1xuXHRcdGlmICggbmFtZSBpbiBlbXB0eVN0eWxlICkge1xuXHRcdFx0cmV0dXJuIG5hbWU7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgc3VidHJhY3QgKSB7XG5cblx0Ly8gQW55IHJlbGF0aXZlICgrLy0pIHZhbHVlcyBoYXZlIGFscmVhZHkgYmVlblxuXHQvLyBub3JtYWxpemVkIGF0IHRoaXMgcG9pbnRcblx0dmFyIG1hdGNoZXMgPSByY3NzTnVtLmV4ZWMoIHZhbHVlICk7XG5cdHJldHVybiBtYXRjaGVzID9cblxuXHRcdC8vIEd1YXJkIGFnYWluc3QgdW5kZWZpbmVkIFwic3VidHJhY3RcIiwgZS5nLiwgd2hlbiB1c2VkIGFzIGluIGNzc0hvb2tzXG5cdFx0TWF0aC5tYXgoIDAsIG1hdGNoZXNbIDIgXSAtICggc3VidHJhY3QgfHwgMCApICkgKyAoIG1hdGNoZXNbIDMgXSB8fCBcInB4XCIgKSA6XG5cdFx0dmFsdWU7XG59XG5cbmZ1bmN0aW9uIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSwgaXNCb3JkZXJCb3gsIHN0eWxlcyApIHtcblx0dmFyIGksXG5cdFx0dmFsID0gMDtcblxuXHQvLyBJZiB3ZSBhbHJlYWR5IGhhdmUgdGhlIHJpZ2h0IG1lYXN1cmVtZW50LCBhdm9pZCBhdWdtZW50YXRpb25cblx0aWYgKCBleHRyYSA9PT0gKCBpc0JvcmRlckJveCA/IFwiYm9yZGVyXCIgOiBcImNvbnRlbnRcIiApICkge1xuXHRcdGkgPSA0O1xuXG5cdC8vIE90aGVyd2lzZSBpbml0aWFsaXplIGZvciBob3Jpem9udGFsIG9yIHZlcnRpY2FsIHByb3BlcnRpZXNcblx0fSBlbHNlIHtcblx0XHRpID0gbmFtZSA9PT0gXCJ3aWR0aFwiID8gMSA6IDA7XG5cdH1cblxuXHRmb3IgKCA7IGkgPCA0OyBpICs9IDIgKSB7XG5cblx0XHQvLyBCb3RoIGJveCBtb2RlbHMgZXhjbHVkZSBtYXJnaW4sIHNvIGFkZCBpdCBpZiB3ZSB3YW50IGl0XG5cdFx0aWYgKCBleHRyYSA9PT0gXCJtYXJnaW5cIiApIHtcblx0XHRcdHZhbCArPSBqUXVlcnkuY3NzKCBlbGVtLCBleHRyYSArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcblx0XHR9XG5cblx0XHRpZiAoIGlzQm9yZGVyQm94ICkge1xuXG5cdFx0XHQvLyBib3JkZXItYm94IGluY2x1ZGVzIHBhZGRpbmcsIHNvIHJlbW92ZSBpdCBpZiB3ZSB3YW50IGNvbnRlbnRcblx0XHRcdGlmICggZXh0cmEgPT09IFwiY29udGVudFwiICkge1xuXHRcdFx0XHR2YWwgLT0galF1ZXJ5LmNzcyggZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGJvcmRlciBub3IgbWFyZ2luLCBzbyByZW1vdmUgYm9yZGVyXG5cdFx0XHRpZiAoIGV4dHJhICE9PSBcIm1hcmdpblwiICkge1xuXHRcdFx0XHR2YWwgLT0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBBdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBjb250ZW50LCBzbyBhZGQgcGFkZGluZ1xuXHRcdFx0dmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXG5cdFx0XHQvLyBBdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBjb250ZW50IG5vciBwYWRkaW5nLCBzbyBhZGQgYm9yZGVyXG5cdFx0XHRpZiAoIGV4dHJhICE9PSBcInBhZGRpbmdcIiApIHtcblx0XHRcdFx0dmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKSB7XG5cblx0Ly8gU3RhcnQgd2l0aCBvZmZzZXQgcHJvcGVydHksIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG8gdGhlIGJvcmRlci1ib3ggdmFsdWVcblx0dmFyIHZhbCxcblx0XHR2YWx1ZUlzQm9yZGVyQm94ID0gdHJ1ZSxcblx0XHRzdHlsZXMgPSBnZXRTdHlsZXMoIGVsZW0gKSxcblx0XHRpc0JvcmRlckJveCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCI7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdC8vIFJ1bm5pbmcgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG9uIGEgZGlzY29ubmVjdGVkIG5vZGVcblx0Ly8gaW4gSUUgdGhyb3dzIGFuIGVycm9yLlxuXHRpZiAoIGVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggKSB7XG5cdFx0dmFsID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVsgbmFtZSBdO1xuXHR9XG5cblx0Ly8gU29tZSBub24taHRtbCBlbGVtZW50cyByZXR1cm4gdW5kZWZpbmVkIGZvciBvZmZzZXRXaWR0aCwgc28gY2hlY2sgZm9yIG51bGwvdW5kZWZpbmVkXG5cdC8vIHN2ZyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY0OTI4NVxuXHQvLyBNYXRoTUwgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD00OTE2Njhcblx0aWYgKCB2YWwgPD0gMCB8fCB2YWwgPT0gbnVsbCApIHtcblxuXHRcdC8vIEZhbGwgYmFjayB0byBjb21wdXRlZCB0aGVuIHVuY29tcHV0ZWQgY3NzIGlmIG5lY2Vzc2FyeVxuXHRcdHZhbCA9IGN1ckNTUyggZWxlbSwgbmFtZSwgc3R5bGVzICk7XG5cdFx0aWYgKCB2YWwgPCAwIHx8IHZhbCA9PSBudWxsICkge1xuXHRcdFx0dmFsID0gZWxlbS5zdHlsZVsgbmFtZSBdO1xuXHRcdH1cblxuXHRcdC8vIENvbXB1dGVkIHVuaXQgaXMgbm90IHBpeGVscy4gU3RvcCBoZXJlIGFuZCByZXR1cm4uXG5cdFx0aWYgKCBybnVtbm9ucHgudGVzdCggdmFsICkgKSB7XG5cdFx0XHRyZXR1cm4gdmFsO1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIGZvciBzdHlsZSBpbiBjYXNlIGEgYnJvd3NlciB3aGljaCByZXR1cm5zIHVucmVsaWFibGUgdmFsdWVzXG5cdFx0Ly8gZm9yIGdldENvbXB1dGVkU3R5bGUgc2lsZW50bHkgZmFsbHMgYmFjayB0byB0aGUgcmVsaWFibGUgZWxlbS5zdHlsZVxuXHRcdHZhbHVlSXNCb3JkZXJCb3ggPSBpc0JvcmRlckJveCAmJlxuXHRcdFx0KCBzdXBwb3J0LmJveFNpemluZ1JlbGlhYmxlKCkgfHwgdmFsID09PSBlbGVtLnN0eWxlWyBuYW1lIF0gKTtcblxuXHRcdC8vIE5vcm1hbGl6ZSBcIlwiLCBhdXRvLCBhbmQgcHJlcGFyZSBmb3IgZXh0cmFcblx0XHR2YWwgPSBwYXJzZUZsb2F0KCB2YWwgKSB8fCAwO1xuXHR9XG5cblx0Ly8gVXNlIHRoZSBhY3RpdmUgYm94LXNpemluZyBtb2RlbCB0byBhZGQvc3VidHJhY3QgaXJyZWxldmFudCBzdHlsZXNcblx0cmV0dXJuICggdmFsICtcblx0XHRhdWdtZW50V2lkdGhPckhlaWdodChcblx0XHRcdGVsZW0sXG5cdFx0XHRuYW1lLFxuXHRcdFx0ZXh0cmEgfHwgKCBpc0JvcmRlckJveCA/IFwiYm9yZGVyXCIgOiBcImNvbnRlbnRcIiApLFxuXHRcdFx0dmFsdWVJc0JvcmRlckJveCxcblx0XHRcdHN0eWxlc1xuXHRcdClcblx0KSArIFwicHhcIjtcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIEFkZCBpbiBzdHlsZSBwcm9wZXJ0eSBob29rcyBmb3Igb3ZlcnJpZGluZyB0aGUgZGVmYXVsdFxuXHQvLyBiZWhhdmlvciBvZiBnZXR0aW5nIGFuZCBzZXR0aW5nIGEgc3R5bGUgcHJvcGVydHlcblx0Y3NzSG9va3M6IHtcblx0XHRvcGFjaXR5OiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblxuXHRcdFx0XHRcdC8vIFdlIHNob3VsZCBhbHdheXMgZ2V0IGEgbnVtYmVyIGJhY2sgZnJvbSBvcGFjaXR5XG5cdFx0XHRcdFx0dmFyIHJldCA9IGN1ckNTUyggZWxlbSwgXCJvcGFjaXR5XCIgKTtcblx0XHRcdFx0XHRyZXR1cm4gcmV0ID09PSBcIlwiID8gXCIxXCIgOiByZXQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Ly8gRG9uJ3QgYXV0b21hdGljYWxseSBhZGQgXCJweFwiIHRvIHRoZXNlIHBvc3NpYmx5LXVuaXRsZXNzIHByb3BlcnRpZXNcblx0Y3NzTnVtYmVyOiB7XG5cdFx0XCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiB0cnVlLFxuXHRcdFwiY29sdW1uQ291bnRcIjogdHJ1ZSxcblx0XHRcImZpbGxPcGFjaXR5XCI6IHRydWUsXG5cdFx0XCJmbGV4R3Jvd1wiOiB0cnVlLFxuXHRcdFwiZmxleFNocmlua1wiOiB0cnVlLFxuXHRcdFwiZm9udFdlaWdodFwiOiB0cnVlLFxuXHRcdFwibGluZUhlaWdodFwiOiB0cnVlLFxuXHRcdFwib3BhY2l0eVwiOiB0cnVlLFxuXHRcdFwib3JkZXJcIjogdHJ1ZSxcblx0XHRcIm9ycGhhbnNcIjogdHJ1ZSxcblx0XHRcIndpZG93c1wiOiB0cnVlLFxuXHRcdFwiekluZGV4XCI6IHRydWUsXG5cdFx0XCJ6b29tXCI6IHRydWVcblx0fSxcblxuXHQvLyBBZGQgaW4gcHJvcGVydGllcyB3aG9zZSBuYW1lcyB5b3Ugd2lzaCB0byBmaXggYmVmb3JlXG5cdC8vIHNldHRpbmcgb3IgZ2V0dGluZyB0aGUgdmFsdWVcblx0Y3NzUHJvcHM6IHtcblx0XHRcImZsb2F0XCI6IFwiY3NzRmxvYXRcIlxuXHR9LFxuXG5cdC8vIEdldCBhbmQgc2V0IHRoZSBzdHlsZSBwcm9wZXJ0eSBvbiBhIERPTSBOb2RlXG5cdHN0eWxlOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUsIGV4dHJhICkge1xuXG5cdFx0Ly8gRG9uJ3Qgc2V0IHN0eWxlcyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCAhZWxlbSB8fCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggfHwgIWVsZW0uc3R5bGUgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lXG5cdFx0dmFyIHJldCwgdHlwZSwgaG9va3MsXG5cdFx0XHRvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKSxcblx0XHRcdHN0eWxlID0gZWxlbS5zdHlsZTtcblxuXHRcdG5hbWUgPSBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gfHxcblx0XHRcdCggalF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdID0gdmVuZG9yUHJvcE5hbWUoIG9yaWdOYW1lICkgfHwgb3JpZ05hbWUgKTtcblxuXHRcdC8vIEdldHMgaG9vayBmb3IgdGhlIHByZWZpeGVkIHZlcnNpb24sIHRoZW4gdW5wcmVmaXhlZCB2ZXJzaW9uXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSB8fCBqUXVlcnkuY3NzSG9va3NbIG9yaWdOYW1lIF07XG5cblx0XHQvLyBDaGVjayBpZiB3ZSdyZSBzZXR0aW5nIGEgdmFsdWVcblx0XHRpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG5cdFx0XHQvLyBDb252ZXJ0IFwiKz1cIiBvciBcIi09XCIgdG8gcmVsYXRpdmUgbnVtYmVycyAoIzczNDUpXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwic3RyaW5nXCIgJiYgKCByZXQgPSByY3NzTnVtLmV4ZWMoIHZhbHVlICkgKSAmJiByZXRbIDEgXSApIHtcblx0XHRcdFx0dmFsdWUgPSBhZGp1c3RDU1MoIGVsZW0sIG5hbWUsIHJldCApO1xuXG5cdFx0XHRcdC8vIEZpeGVzIGJ1ZyAjOTIzN1xuXHRcdFx0XHR0eXBlID0gXCJudW1iZXJcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWFrZSBzdXJlIHRoYXQgbnVsbCBhbmQgTmFOIHZhbHVlcyBhcmVuJ3Qgc2V0ICgjNzExNilcblx0XHRcdGlmICggdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdmFsdWUgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYSBudW1iZXIgd2FzIHBhc3NlZCBpbiwgYWRkIHRoZSB1bml0IChleGNlcHQgZm9yIGNlcnRhaW4gQ1NTIHByb3BlcnRpZXMpXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwibnVtYmVyXCIgKSB7XG5cdFx0XHRcdHZhbHVlICs9IHJldCAmJiByZXRbIDMgXSB8fCAoIGpRdWVyeS5jc3NOdW1iZXJbIG9yaWdOYW1lIF0gPyBcIlwiIDogXCJweFwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGJhY2tncm91bmQtKiBwcm9wcyBhZmZlY3Qgb3JpZ2luYWwgY2xvbmUncyB2YWx1ZXNcblx0XHRcdGlmICggIXN1cHBvcnQuY2xlYXJDbG9uZVN0eWxlICYmIHZhbHVlID09PSBcIlwiICYmIG5hbWUuaW5kZXhPZiggXCJiYWNrZ3JvdW5kXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0c3R5bGVbIG5hbWUgXSA9IFwiaW5oZXJpdFwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkLCB1c2UgdGhhdCB2YWx1ZSwgb3RoZXJ3aXNlIGp1c3Qgc2V0IHRoZSBzcGVjaWZpZWQgdmFsdWVcblx0XHRcdGlmICggIWhvb2tzIHx8ICEoIFwic2V0XCIgaW4gaG9va3MgKSB8fFxuXHRcdFx0XHQoIHZhbHVlID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgZXh0cmEgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0c3R5bGVbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gSWYgYSBob29rIHdhcyBwcm92aWRlZCBnZXQgdGhlIG5vbi1jb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXG5cdFx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiZcblx0XHRcdFx0KCByZXQgPSBob29rcy5nZXQoIGVsZW0sIGZhbHNlLCBleHRyYSApICkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPdGhlcndpc2UganVzdCBnZXQgdGhlIHZhbHVlIGZyb20gdGhlIHN0eWxlIG9iamVjdFxuXHRcdFx0cmV0dXJuIHN0eWxlWyBuYW1lIF07XG5cdFx0fVxuXHR9LFxuXG5cdGNzczogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGV4dHJhLCBzdHlsZXMgKSB7XG5cdFx0dmFyIHZhbCwgbnVtLCBob29rcyxcblx0XHRcdG9yaWdOYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZSApO1xuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lXG5cdFx0bmFtZSA9IGpRdWVyeS5jc3NQcm9wc1sgb3JpZ05hbWUgXSB8fFxuXHRcdFx0KCBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggb3JpZ05hbWUgKSB8fCBvcmlnTmFtZSApO1xuXG5cdFx0Ly8gVHJ5IHByZWZpeGVkIG5hbWUgZm9sbG93ZWQgYnkgdGhlIHVucHJlZml4ZWQgbmFtZVxuXHRcdGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gfHwgalF1ZXJ5LmNzc0hvb2tzWyBvcmlnTmFtZSBdO1xuXG5cdFx0Ly8gSWYgYSBob29rIHdhcyBwcm92aWRlZCBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcblx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgKSB7XG5cdFx0XHR2YWwgPSBob29rcy5nZXQoIGVsZW0sIHRydWUsIGV4dHJhICk7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXJ3aXNlLCBpZiBhIHdheSB0byBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGV4aXN0cywgdXNlIHRoYXRcblx0XHRpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0dmFsID0gY3VyQ1NTKCBlbGVtLCBuYW1lLCBzdHlsZXMgKTtcblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IFwibm9ybWFsXCIgdG8gY29tcHV0ZWQgdmFsdWVcblx0XHRpZiAoIHZhbCA9PT0gXCJub3JtYWxcIiAmJiBuYW1lIGluIGNzc05vcm1hbFRyYW5zZm9ybSApIHtcblx0XHRcdHZhbCA9IGNzc05vcm1hbFRyYW5zZm9ybVsgbmFtZSBdO1xuXHRcdH1cblxuXHRcdC8vIE1ha2UgbnVtZXJpYyBpZiBmb3JjZWQgb3IgYSBxdWFsaWZpZXIgd2FzIHByb3ZpZGVkIGFuZCB2YWwgbG9va3MgbnVtZXJpY1xuXHRcdGlmICggZXh0cmEgPT09IFwiXCIgfHwgZXh0cmEgKSB7XG5cdFx0XHRudW0gPSBwYXJzZUZsb2F0KCB2YWwgKTtcblx0XHRcdHJldHVybiBleHRyYSA9PT0gdHJ1ZSB8fCBpc0Zpbml0ZSggbnVtICkgPyBudW0gfHwgMCA6IHZhbDtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbDtcblx0fVxufSApO1xuXG5qUXVlcnkuZWFjaCggWyBcImhlaWdodFwiLCBcIndpZHRoXCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdID0ge1xuXHRcdGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkLCBleHRyYSApIHtcblx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRcdFx0Ly8gQ2VydGFpbiBlbGVtZW50cyBjYW4gaGF2ZSBkaW1lbnNpb24gaW5mbyBpZiB3ZSBpbnZpc2libHkgc2hvdyB0aGVtXG5cdFx0XHRcdC8vIGJ1dCBpdCBtdXN0IGhhdmUgYSBjdXJyZW50IGRpc3BsYXkgc3R5bGUgdGhhdCB3b3VsZCBiZW5lZml0XG5cdFx0XHRcdHJldHVybiByZGlzcGxheXN3YXAudGVzdCggalF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSApICYmXG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgOCtcblx0XHRcdFx0XHQvLyBUYWJsZSBjb2x1bW5zIGluIFNhZmFyaSBoYXZlIG5vbi16ZXJvIG9mZnNldFdpZHRoICYgemVyb1xuXHRcdFx0XHRcdC8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIHVubGVzcyBkaXNwbGF5IGlzIGNoYW5nZWQuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdFx0XHRcdFx0Ly8gUnVubmluZyBnZXRCb3VuZGluZ0NsaWVudFJlY3Qgb24gYSBkaXNjb25uZWN0ZWQgbm9kZVxuXHRcdFx0XHRcdC8vIGluIElFIHRocm93cyBhbiBlcnJvci5cblx0XHRcdFx0XHQoICFlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoIHx8ICFlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoICkgP1xuXHRcdFx0XHRcdFx0c3dhcCggZWxlbSwgY3NzU2hvdywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSApO1xuXHRcdFx0XHRcdFx0fSApIDpcblx0XHRcdFx0XHRcdGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBleHRyYSApIHtcblx0XHRcdHZhciBtYXRjaGVzLFxuXHRcdFx0XHRzdHlsZXMgPSBleHRyYSAmJiBnZXRTdHlsZXMoIGVsZW0gKSxcblx0XHRcdFx0c3VidHJhY3QgPSBleHRyYSAmJiBhdWdtZW50V2lkdGhPckhlaWdodChcblx0XHRcdFx0XHRlbGVtLFxuXHRcdFx0XHRcdG5hbWUsXG5cdFx0XHRcdFx0ZXh0cmEsXG5cdFx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgXCJib3hTaXppbmdcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImJvcmRlci1ib3hcIixcblx0XHRcdFx0XHRzdHlsZXNcblx0XHRcdFx0KTtcblxuXHRcdFx0Ly8gQ29udmVydCB0byBwaXhlbHMgaWYgdmFsdWUgYWRqdXN0bWVudCBpcyBuZWVkZWRcblx0XHRcdGlmICggc3VidHJhY3QgJiYgKCBtYXRjaGVzID0gcmNzc051bS5leGVjKCB2YWx1ZSApICkgJiZcblx0XHRcdFx0KCBtYXRjaGVzWyAzIF0gfHwgXCJweFwiICkgIT09IFwicHhcIiApIHtcblxuXHRcdFx0XHRlbGVtLnN0eWxlWyBuYW1lIF0gPSB2YWx1ZTtcblx0XHRcdFx0dmFsdWUgPSBqUXVlcnkuY3NzKCBlbGVtLCBuYW1lICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZXRQb3NpdGl2ZU51bWJlciggZWxlbSwgdmFsdWUsIHN1YnRyYWN0ICk7XG5cdFx0fVxuXHR9O1xufSApO1xuXG5qUXVlcnkuY3NzSG9va3MubWFyZ2luTGVmdCA9IGFkZEdldEhvb2tJZiggc3VwcG9ydC5yZWxpYWJsZU1hcmdpbkxlZnQsXG5cdGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdFx0cmV0dXJuICggcGFyc2VGbG9hdCggY3VyQ1NTKCBlbGVtLCBcIm1hcmdpbkxlZnRcIiApICkgfHxcblx0XHRcdFx0ZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC1cblx0XHRcdFx0XHRzd2FwKCBlbGVtLCB7IG1hcmdpbkxlZnQ6IDAgfSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuXHRcdFx0XHRcdH0gKVxuXHRcdFx0XHQpICsgXCJweFwiO1xuXHRcdH1cblx0fVxuKTtcblxuLy8gVGhlc2UgaG9va3MgYXJlIHVzZWQgYnkgYW5pbWF0ZSB0byBleHBhbmQgcHJvcGVydGllc1xualF1ZXJ5LmVhY2goIHtcblx0bWFyZ2luOiBcIlwiLFxuXHRwYWRkaW5nOiBcIlwiLFxuXHRib3JkZXI6IFwiV2lkdGhcIlxufSwgZnVuY3Rpb24oIHByZWZpeCwgc3VmZml4ICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIHByZWZpeCArIHN1ZmZpeCBdID0ge1xuXHRcdGV4cGFuZDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGkgPSAwLFxuXHRcdFx0XHRleHBhbmRlZCA9IHt9LFxuXG5cdFx0XHRcdC8vIEFzc3VtZXMgYSBzaW5nbGUgbnVtYmVyIGlmIG5vdCBhIHN0cmluZ1xuXHRcdFx0XHRwYXJ0cyA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnNwbGl0KCBcIiBcIiApIDogWyB2YWx1ZSBdO1xuXG5cdFx0XHRmb3IgKCA7IGkgPCA0OyBpKysgKSB7XG5cdFx0XHRcdGV4cGFuZGVkWyBwcmVmaXggKyBjc3NFeHBhbmRbIGkgXSArIHN1ZmZpeCBdID1cblx0XHRcdFx0XHRwYXJ0c1sgaSBdIHx8IHBhcnRzWyBpIC0gMiBdIHx8IHBhcnRzWyAwIF07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBleHBhbmRlZDtcblx0XHR9XG5cdH07XG5cblx0aWYgKCAhcm1hcmdpbi50ZXN0KCBwcmVmaXggKSApIHtcblx0XHRqUXVlcnkuY3NzSG9va3NbIHByZWZpeCArIHN1ZmZpeCBdLnNldCA9IHNldFBvc2l0aXZlTnVtYmVyO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0Y3NzOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xuXHRcdFx0dmFyIHN0eWxlcywgbGVuLFxuXHRcdFx0XHRtYXAgPSB7fSxcblx0XHRcdFx0aSA9IDA7XG5cblx0XHRcdGlmICggalF1ZXJ5LmlzQXJyYXkoIG5hbWUgKSApIHtcblx0XHRcdFx0c3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICk7XG5cdFx0XHRcdGxlbiA9IG5hbWUubGVuZ3RoO1xuXG5cdFx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRcdG1hcFsgbmFtZVsgaSBdIF0gPSBqUXVlcnkuY3NzKCBlbGVtLCBuYW1lWyBpIF0sIGZhbHNlLCBzdHlsZXMgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBtYXA7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID9cblx0XHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCBuYW1lLCB2YWx1ZSApIDpcblx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgbmFtZSApO1xuXHRcdH0sIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9XG59ICk7XG5cblxuZnVuY3Rpb24gVHdlZW4oIGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nICkge1xuXHRyZXR1cm4gbmV3IFR3ZWVuLnByb3RvdHlwZS5pbml0KCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyApO1xufVxualF1ZXJ5LlR3ZWVuID0gVHdlZW47XG5cblR3ZWVuLnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IFR3ZWVuLFxuXHRpbml0OiBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcsIHVuaXQgKSB7XG5cdFx0dGhpcy5lbGVtID0gZWxlbTtcblx0XHR0aGlzLnByb3AgPSBwcm9wO1xuXHRcdHRoaXMuZWFzaW5nID0gZWFzaW5nIHx8IGpRdWVyeS5lYXNpbmcuX2RlZmF1bHQ7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0XHR0aGlzLnN0YXJ0ID0gdGhpcy5ub3cgPSB0aGlzLmN1cigpO1xuXHRcdHRoaXMuZW5kID0gZW5kO1xuXHRcdHRoaXMudW5pdCA9IHVuaXQgfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gPyBcIlwiIDogXCJweFwiICk7XG5cdH0sXG5cdGN1cjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGhvb2tzID0gVHdlZW4ucHJvcEhvb2tzWyB0aGlzLnByb3AgXTtcblxuXHRcdHJldHVybiBob29rcyAmJiBob29rcy5nZXQgP1xuXHRcdFx0aG9va3MuZ2V0KCB0aGlzICkgOlxuXHRcdFx0VHdlZW4ucHJvcEhvb2tzLl9kZWZhdWx0LmdldCggdGhpcyApO1xuXHR9LFxuXHRydW46IGZ1bmN0aW9uKCBwZXJjZW50ICkge1xuXHRcdHZhciBlYXNlZCxcblx0XHRcdGhvb2tzID0gVHdlZW4ucHJvcEhvb2tzWyB0aGlzLnByb3AgXTtcblxuXHRcdGlmICggdGhpcy5vcHRpb25zLmR1cmF0aW9uICkge1xuXHRcdFx0dGhpcy5wb3MgPSBlYXNlZCA9IGpRdWVyeS5lYXNpbmdbIHRoaXMuZWFzaW5nIF0oXG5cdFx0XHRcdHBlcmNlbnQsIHRoaXMub3B0aW9ucy5kdXJhdGlvbiAqIHBlcmNlbnQsIDAsIDEsIHRoaXMub3B0aW9ucy5kdXJhdGlvblxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5wb3MgPSBlYXNlZCA9IHBlcmNlbnQ7XG5cdFx0fVxuXHRcdHRoaXMubm93ID0gKCB0aGlzLmVuZCAtIHRoaXMuc3RhcnQgKSAqIGVhc2VkICsgdGhpcy5zdGFydDtcblxuXHRcdGlmICggdGhpcy5vcHRpb25zLnN0ZXAgKSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMuc3RlcC5jYWxsKCB0aGlzLmVsZW0sIHRoaXMubm93LCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBob29rcyAmJiBob29rcy5zZXQgKSB7XG5cdFx0XHRob29rcy5zZXQoIHRoaXMgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0VHdlZW4ucHJvcEhvb2tzLl9kZWZhdWx0LnNldCggdGhpcyApO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcblxuVHdlZW4ucHJvdG90eXBlLmluaXQucHJvdG90eXBlID0gVHdlZW4ucHJvdG90eXBlO1xuXG5Ud2Vlbi5wcm9wSG9va3MgPSB7XG5cdF9kZWZhdWx0OiB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG5cdFx0XHR2YXIgcmVzdWx0O1xuXG5cdFx0XHQvLyBVc2UgYSBwcm9wZXJ0eSBvbiB0aGUgZWxlbWVudCBkaXJlY3RseSB3aGVuIGl0IGlzIG5vdCBhIERPTSBlbGVtZW50LFxuXHRcdFx0Ly8gb3Igd2hlbiB0aGVyZSBpcyBubyBtYXRjaGluZyBzdHlsZSBwcm9wZXJ0eSB0aGF0IGV4aXN0cy5cblx0XHRcdGlmICggdHdlZW4uZWxlbS5ub2RlVHlwZSAhPT0gMSB8fFxuXHRcdFx0XHR0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF0gIT0gbnVsbCAmJiB0d2Vlbi5lbGVtLnN0eWxlWyB0d2Vlbi5wcm9wIF0gPT0gbnVsbCApIHtcblx0XHRcdFx0cmV0dXJuIHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUGFzc2luZyBhbiBlbXB0eSBzdHJpbmcgYXMgYSAzcmQgcGFyYW1ldGVyIHRvIC5jc3Mgd2lsbCBhdXRvbWF0aWNhbGx5XG5cdFx0XHQvLyBhdHRlbXB0IGEgcGFyc2VGbG9hdCBhbmQgZmFsbGJhY2sgdG8gYSBzdHJpbmcgaWYgdGhlIHBhcnNlIGZhaWxzLlxuXHRcdFx0Ly8gU2ltcGxlIHZhbHVlcyBzdWNoIGFzIFwiMTBweFwiIGFyZSBwYXJzZWQgdG8gRmxvYXQ7XG5cdFx0XHQvLyBjb21wbGV4IHZhbHVlcyBzdWNoIGFzIFwicm90YXRlKDFyYWQpXCIgYXJlIHJldHVybmVkIGFzLWlzLlxuXHRcdFx0cmVzdWx0ID0galF1ZXJ5LmNzcyggdHdlZW4uZWxlbSwgdHdlZW4ucHJvcCwgXCJcIiApO1xuXG5cdFx0XHQvLyBFbXB0eSBzdHJpbmdzLCBudWxsLCB1bmRlZmluZWQgYW5kIFwiYXV0b1wiIGFyZSBjb252ZXJ0ZWQgdG8gMC5cblx0XHRcdHJldHVybiAhcmVzdWx0IHx8IHJlc3VsdCA9PT0gXCJhdXRvXCIgPyAwIDogcmVzdWx0O1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG5cblx0XHRcdC8vIFVzZSBzdGVwIGhvb2sgZm9yIGJhY2sgY29tcGF0LlxuXHRcdFx0Ly8gVXNlIGNzc0hvb2sgaWYgaXRzIHRoZXJlLlxuXHRcdFx0Ly8gVXNlIC5zdHlsZSBpZiBhdmFpbGFibGUgYW5kIHVzZSBwbGFpbiBwcm9wZXJ0aWVzIHdoZXJlIGF2YWlsYWJsZS5cblx0XHRcdGlmICggalF1ZXJ5LmZ4LnN0ZXBbIHR3ZWVuLnByb3AgXSApIHtcblx0XHRcdFx0alF1ZXJ5LmZ4LnN0ZXBbIHR3ZWVuLnByb3AgXSggdHdlZW4gKTtcblx0XHRcdH0gZWxzZSBpZiAoIHR3ZWVuLmVsZW0ubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdFx0KCB0d2Vlbi5lbGVtLnN0eWxlWyBqUXVlcnkuY3NzUHJvcHNbIHR3ZWVuLnByb3AgXSBdICE9IG51bGwgfHxcblx0XHRcdFx0XHRqUXVlcnkuY3NzSG9va3NbIHR3ZWVuLnByb3AgXSApICkge1xuXHRcdFx0XHRqUXVlcnkuc3R5bGUoIHR3ZWVuLmVsZW0sIHR3ZWVuLnByb3AsIHR3ZWVuLm5vdyArIHR3ZWVuLnVuaXQgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSA9IHR3ZWVuLm5vdztcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbi8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG4vLyBQYW5pYyBiYXNlZCBhcHByb2FjaCB0byBzZXR0aW5nIHRoaW5ncyBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcblR3ZWVuLnByb3BIb29rcy5zY3JvbGxUb3AgPSBUd2Vlbi5wcm9wSG9va3Muc2Nyb2xsTGVmdCA9IHtcblx0c2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG5cdFx0aWYgKCB0d2Vlbi5lbGVtLm5vZGVUeXBlICYmIHR3ZWVuLmVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSA9IHR3ZWVuLm5vdztcblx0XHR9XG5cdH1cbn07XG5cbmpRdWVyeS5lYXNpbmcgPSB7XG5cdGxpbmVhcjogZnVuY3Rpb24oIHAgKSB7XG5cdFx0cmV0dXJuIHA7XG5cdH0sXG5cdHN3aW5nOiBmdW5jdGlvbiggcCApIHtcblx0XHRyZXR1cm4gMC41IC0gTWF0aC5jb3MoIHAgKiBNYXRoLlBJICkgLyAyO1xuXHR9LFxuXHRfZGVmYXVsdDogXCJzd2luZ1wiXG59O1xuXG5qUXVlcnkuZnggPSBUd2Vlbi5wcm90b3R5cGUuaW5pdDtcblxuLy8gQmFjayBjb21wYXQgPDEuOCBleHRlbnNpb24gcG9pbnRcbmpRdWVyeS5meC5zdGVwID0ge307XG5cblxuXG5cbnZhclxuXHRmeE5vdywgdGltZXJJZCxcblx0cmZ4dHlwZXMgPSAvXig/OnRvZ2dsZXxzaG93fGhpZGUpJC8sXG5cdHJydW4gPSAvcXVldWVIb29rcyQvO1xuXG5mdW5jdGlvbiByYWYoKSB7XG5cdGlmICggdGltZXJJZCApIHtcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCByYWYgKTtcblx0XHRqUXVlcnkuZngudGljaygpO1xuXHR9XG59XG5cbi8vIEFuaW1hdGlvbnMgY3JlYXRlZCBzeW5jaHJvbm91c2x5IHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcbmZ1bmN0aW9uIGNyZWF0ZUZ4Tm93KCkge1xuXHR3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0ZnhOb3cgPSB1bmRlZmluZWQ7XG5cdH0gKTtcblx0cmV0dXJuICggZnhOb3cgPSBqUXVlcnkubm93KCkgKTtcbn1cblxuLy8gR2VuZXJhdGUgcGFyYW1ldGVycyB0byBjcmVhdGUgYSBzdGFuZGFyZCBhbmltYXRpb25cbmZ1bmN0aW9uIGdlbkZ4KCB0eXBlLCBpbmNsdWRlV2lkdGggKSB7XG5cdHZhciB3aGljaCxcblx0XHRpID0gMCxcblx0XHRhdHRycyA9IHsgaGVpZ2h0OiB0eXBlIH07XG5cblx0Ly8gSWYgd2UgaW5jbHVkZSB3aWR0aCwgc3RlcCB2YWx1ZSBpcyAxIHRvIGRvIGFsbCBjc3NFeHBhbmQgdmFsdWVzLFxuXHQvLyBvdGhlcndpc2Ugc3RlcCB2YWx1ZSBpcyAyIHRvIHNraXAgb3ZlciBMZWZ0IGFuZCBSaWdodFxuXHRpbmNsdWRlV2lkdGggPSBpbmNsdWRlV2lkdGggPyAxIDogMDtcblx0Zm9yICggOyBpIDwgNDsgaSArPSAyIC0gaW5jbHVkZVdpZHRoICkge1xuXHRcdHdoaWNoID0gY3NzRXhwYW5kWyBpIF07XG5cdFx0YXR0cnNbIFwibWFyZ2luXCIgKyB3aGljaCBdID0gYXR0cnNbIFwicGFkZGluZ1wiICsgd2hpY2ggXSA9IHR5cGU7XG5cdH1cblxuXHRpZiAoIGluY2x1ZGVXaWR0aCApIHtcblx0XHRhdHRycy5vcGFjaXR5ID0gYXR0cnMud2lkdGggPSB0eXBlO1xuXHR9XG5cblx0cmV0dXJuIGF0dHJzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUd2VlbiggdmFsdWUsIHByb3AsIGFuaW1hdGlvbiApIHtcblx0dmFyIHR3ZWVuLFxuXHRcdGNvbGxlY3Rpb24gPSAoIEFuaW1hdGlvbi50d2VlbmVyc1sgcHJvcCBdIHx8IFtdICkuY29uY2F0KCBBbmltYXRpb24udHdlZW5lcnNbIFwiKlwiIF0gKSxcblx0XHRpbmRleCA9IDAsXG5cdFx0bGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGg7XG5cdGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0aWYgKCAoIHR3ZWVuID0gY29sbGVjdGlvblsgaW5kZXggXS5jYWxsKCBhbmltYXRpb24sIHByb3AsIHZhbHVlICkgKSApIHtcblxuXHRcdFx0Ly8gV2UncmUgZG9uZSB3aXRoIHRoaXMgcHJvcGVydHlcblx0XHRcdHJldHVybiB0d2Vlbjtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVmYXVsdFByZWZpbHRlciggZWxlbSwgcHJvcHMsIG9wdHMgKSB7XG5cdHZhciBwcm9wLCB2YWx1ZSwgdG9nZ2xlLCBob29rcywgb2xkZmlyZSwgcHJvcFR3ZWVuLCByZXN0b3JlRGlzcGxheSwgZGlzcGxheSxcblx0XHRpc0JveCA9IFwid2lkdGhcIiBpbiBwcm9wcyB8fCBcImhlaWdodFwiIGluIHByb3BzLFxuXHRcdGFuaW0gPSB0aGlzLFxuXHRcdG9yaWcgPSB7fSxcblx0XHRzdHlsZSA9IGVsZW0uc3R5bGUsXG5cdFx0aGlkZGVuID0gZWxlbS5ub2RlVHlwZSAmJiBpc0hpZGRlbldpdGhpblRyZWUoIGVsZW0gKSxcblx0XHRkYXRhU2hvdyA9IGRhdGFQcml2LmdldCggZWxlbSwgXCJmeHNob3dcIiApO1xuXG5cdC8vIFF1ZXVlLXNraXBwaW5nIGFuaW1hdGlvbnMgaGlqYWNrIHRoZSBmeCBob29rc1xuXHRpZiAoICFvcHRzLnF1ZXVlICkge1xuXHRcdGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCBcImZ4XCIgKTtcblx0XHRpZiAoIGhvb2tzLnVucXVldWVkID09IG51bGwgKSB7XG5cdFx0XHRob29rcy51bnF1ZXVlZCA9IDA7XG5cdFx0XHRvbGRmaXJlID0gaG9va3MuZW1wdHkuZmlyZTtcblx0XHRcdGhvb2tzLmVtcHR5LmZpcmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCAhaG9va3MudW5xdWV1ZWQgKSB7XG5cdFx0XHRcdFx0b2xkZmlyZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0XHRob29rcy51bnF1ZXVlZCsrO1xuXG5cdFx0YW5pbS5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBFbnN1cmUgdGhlIGNvbXBsZXRlIGhhbmRsZXIgaXMgY2FsbGVkIGJlZm9yZSB0aGlzIGNvbXBsZXRlc1xuXHRcdFx0YW5pbS5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRob29rcy51bnF1ZXVlZC0tO1xuXHRcdFx0XHRpZiAoICFqUXVlcnkucXVldWUoIGVsZW0sIFwiZnhcIiApLmxlbmd0aCApIHtcblx0XHRcdFx0XHRob29rcy5lbXB0eS5maXJlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBEZXRlY3Qgc2hvdy9oaWRlIGFuaW1hdGlvbnNcblx0Zm9yICggcHJvcCBpbiBwcm9wcyApIHtcblx0XHR2YWx1ZSA9IHByb3BzWyBwcm9wIF07XG5cdFx0aWYgKCByZnh0eXBlcy50ZXN0KCB2YWx1ZSApICkge1xuXHRcdFx0ZGVsZXRlIHByb3BzWyBwcm9wIF07XG5cdFx0XHR0b2dnbGUgPSB0b2dnbGUgfHwgdmFsdWUgPT09IFwidG9nZ2xlXCI7XG5cdFx0XHRpZiAoIHZhbHVlID09PSAoIGhpZGRlbiA/IFwiaGlkZVwiIDogXCJzaG93XCIgKSApIHtcblxuXHRcdFx0XHQvLyBQcmV0ZW5kIHRvIGJlIGhpZGRlbiBpZiB0aGlzIGlzIGEgXCJzaG93XCIgYW5kXG5cdFx0XHRcdC8vIHRoZXJlIGlzIHN0aWxsIGRhdGEgZnJvbSBhIHN0b3BwZWQgc2hvdy9oaWRlXG5cdFx0XHRcdGlmICggdmFsdWUgPT09IFwic2hvd1wiICYmIGRhdGFTaG93ICYmIGRhdGFTaG93WyBwcm9wIF0gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRoaWRkZW4gPSB0cnVlO1xuXG5cdFx0XHRcdC8vIElnbm9yZSBhbGwgb3RoZXIgbm8tb3Agc2hvdy9oaWRlIGRhdGFcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0b3JpZ1sgcHJvcCBdID0gZGF0YVNob3cgJiYgZGF0YVNob3dbIHByb3AgXSB8fCBqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBCYWlsIG91dCBpZiB0aGlzIGlzIGEgbm8tb3AgbGlrZSAuaGlkZSgpLmhpZGUoKVxuXHRwcm9wVHdlZW4gPSAhalF1ZXJ5LmlzRW1wdHlPYmplY3QoIHByb3BzICk7XG5cdGlmICggIXByb3BUd2VlbiAmJiBqUXVlcnkuaXNFbXB0eU9iamVjdCggb3JpZyApICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIFJlc3RyaWN0IFwib3ZlcmZsb3dcIiBhbmQgXCJkaXNwbGF5XCIgc3R5bGVzIGR1cmluZyBib3ggYW5pbWF0aW9uc1xuXHRpZiAoIGlzQm94ICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSwgRWRnZSAxMiAtIDEzXG5cdFx0Ly8gUmVjb3JkIGFsbCAzIG92ZXJmbG93IGF0dHJpYnV0ZXMgYmVjYXVzZSBJRSBkb2VzIG5vdCBpbmZlciB0aGUgc2hvcnRoYW5kXG5cdFx0Ly8gZnJvbSBpZGVudGljYWxseS12YWx1ZWQgb3ZlcmZsb3dYIGFuZCBvdmVyZmxvd1lcblx0XHRvcHRzLm92ZXJmbG93ID0gWyBzdHlsZS5vdmVyZmxvdywgc3R5bGUub3ZlcmZsb3dYLCBzdHlsZS5vdmVyZmxvd1kgXTtcblxuXHRcdC8vIElkZW50aWZ5IGEgZGlzcGxheSB0eXBlLCBwcmVmZXJyaW5nIG9sZCBzaG93L2hpZGUgZGF0YSBvdmVyIHRoZSBDU1MgY2FzY2FkZVxuXHRcdHJlc3RvcmVEaXNwbGF5ID0gZGF0YVNob3cgJiYgZGF0YVNob3cuZGlzcGxheTtcblx0XHRpZiAoIHJlc3RvcmVEaXNwbGF5ID09IG51bGwgKSB7XG5cdFx0XHRyZXN0b3JlRGlzcGxheSA9IGRhdGFQcml2LmdldCggZWxlbSwgXCJkaXNwbGF5XCIgKTtcblx0XHR9XG5cdFx0ZGlzcGxheSA9IGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICk7XG5cdFx0aWYgKCBkaXNwbGF5ID09PSBcIm5vbmVcIiApIHtcblx0XHRcdGlmICggcmVzdG9yZURpc3BsYXkgKSB7XG5cdFx0XHRcdGRpc3BsYXkgPSByZXN0b3JlRGlzcGxheTtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gR2V0IG5vbmVtcHR5IHZhbHVlKHMpIGJ5IHRlbXBvcmFyaWx5IGZvcmNpbmcgdmlzaWJpbGl0eVxuXHRcdFx0XHRzaG93SGlkZSggWyBlbGVtIF0sIHRydWUgKTtcblx0XHRcdFx0cmVzdG9yZURpc3BsYXkgPSBlbGVtLnN0eWxlLmRpc3BsYXkgfHwgcmVzdG9yZURpc3BsYXk7XG5cdFx0XHRcdGRpc3BsYXkgPSBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApO1xuXHRcdFx0XHRzaG93SGlkZSggWyBlbGVtIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBBbmltYXRlIGlubGluZSBlbGVtZW50cyBhcyBpbmxpbmUtYmxvY2tcblx0XHRpZiAoIGRpc3BsYXkgPT09IFwiaW5saW5lXCIgfHwgZGlzcGxheSA9PT0gXCJpbmxpbmUtYmxvY2tcIiAmJiByZXN0b3JlRGlzcGxheSAhPSBudWxsICkge1xuXHRcdFx0aWYgKCBqUXVlcnkuY3NzKCBlbGVtLCBcImZsb2F0XCIgKSA9PT0gXCJub25lXCIgKSB7XG5cblx0XHRcdFx0Ly8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgZGlzcGxheSB2YWx1ZSBhdCB0aGUgZW5kIG9mIHB1cmUgc2hvdy9oaWRlIGFuaW1hdGlvbnNcblx0XHRcdFx0aWYgKCAhcHJvcFR3ZWVuICkge1xuXHRcdFx0XHRcdGFuaW0uZG9uZSggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRzdHlsZS5kaXNwbGF5ID0gcmVzdG9yZURpc3BsYXk7XG5cdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdGlmICggcmVzdG9yZURpc3BsYXkgPT0gbnVsbCApIHtcblx0XHRcdFx0XHRcdGRpc3BsYXkgPSBzdHlsZS5kaXNwbGF5O1xuXHRcdFx0XHRcdFx0cmVzdG9yZURpc3BsYXkgPSBkaXNwbGF5ID09PSBcIm5vbmVcIiA/IFwiXCIgOiBkaXNwbGF5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZiAoIG9wdHMub3ZlcmZsb3cgKSB7XG5cdFx0c3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXHRcdGFuaW0uYWx3YXlzKCBmdW5jdGlvbigpIHtcblx0XHRcdHN0eWxlLm92ZXJmbG93ID0gb3B0cy5vdmVyZmxvd1sgMCBdO1xuXHRcdFx0c3R5bGUub3ZlcmZsb3dYID0gb3B0cy5vdmVyZmxvd1sgMSBdO1xuXHRcdFx0c3R5bGUub3ZlcmZsb3dZID0gb3B0cy5vdmVyZmxvd1sgMiBdO1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIEltcGxlbWVudCBzaG93L2hpZGUgYW5pbWF0aW9uc1xuXHRwcm9wVHdlZW4gPSBmYWxzZTtcblx0Zm9yICggcHJvcCBpbiBvcmlnICkge1xuXG5cdFx0Ly8gR2VuZXJhbCBzaG93L2hpZGUgc2V0dXAgZm9yIHRoaXMgZWxlbWVudCBhbmltYXRpb25cblx0XHRpZiAoICFwcm9wVHdlZW4gKSB7XG5cdFx0XHRpZiAoIGRhdGFTaG93ICkge1xuXHRcdFx0XHRpZiAoIFwiaGlkZGVuXCIgaW4gZGF0YVNob3cgKSB7XG5cdFx0XHRcdFx0aGlkZGVuID0gZGF0YVNob3cuaGlkZGVuO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkYXRhU2hvdyA9IGRhdGFQcml2LmFjY2VzcyggZWxlbSwgXCJmeHNob3dcIiwgeyBkaXNwbGF5OiByZXN0b3JlRGlzcGxheSB9ICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN0b3JlIGhpZGRlbi92aXNpYmxlIGZvciB0b2dnbGUgc28gYC5zdG9wKCkudG9nZ2xlKClgIFwicmV2ZXJzZXNcIlxuXHRcdFx0aWYgKCB0b2dnbGUgKSB7XG5cdFx0XHRcdGRhdGFTaG93LmhpZGRlbiA9ICFoaWRkZW47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNob3cgZWxlbWVudHMgYmVmb3JlIGFuaW1hdGluZyB0aGVtXG5cdFx0XHRpZiAoIGhpZGRlbiApIHtcblx0XHRcdFx0c2hvd0hpZGUoIFsgZWxlbSBdLCB0cnVlICk7XG5cdFx0XHR9XG5cblx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuXG5cdFx0XHRhbmltLmRvbmUoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWxvb3AtZnVuYyAqL1xuXG5cdFx0XHRcdC8vIFRoZSBmaW5hbCBzdGVwIG9mIGEgXCJoaWRlXCIgYW5pbWF0aW9uIGlzIGFjdHVhbGx5IGhpZGluZyB0aGUgZWxlbWVudFxuXHRcdFx0XHRpZiAoICFoaWRkZW4gKSB7XG5cdFx0XHRcdFx0c2hvd0hpZGUoIFsgZWxlbSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGF0YVByaXYucmVtb3ZlKCBlbGVtLCBcImZ4c2hvd1wiICk7XG5cdFx0XHRcdGZvciAoIHByb3AgaW4gb3JpZyApIHtcblx0XHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AsIG9yaWdbIHByb3AgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0Ly8gUGVyLXByb3BlcnR5IHNldHVwXG5cdFx0cHJvcFR3ZWVuID0gY3JlYXRlVHdlZW4oIGhpZGRlbiA/IGRhdGFTaG93WyBwcm9wIF0gOiAwLCBwcm9wLCBhbmltICk7XG5cdFx0aWYgKCAhKCBwcm9wIGluIGRhdGFTaG93ICkgKSB7XG5cdFx0XHRkYXRhU2hvd1sgcHJvcCBdID0gcHJvcFR3ZWVuLnN0YXJ0O1xuXHRcdFx0aWYgKCBoaWRkZW4gKSB7XG5cdFx0XHRcdHByb3BUd2Vlbi5lbmQgPSBwcm9wVHdlZW4uc3RhcnQ7XG5cdFx0XHRcdHByb3BUd2Vlbi5zdGFydCA9IDA7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHByb3BGaWx0ZXIoIHByb3BzLCBzcGVjaWFsRWFzaW5nICkge1xuXHR2YXIgaW5kZXgsIG5hbWUsIGVhc2luZywgdmFsdWUsIGhvb2tzO1xuXG5cdC8vIGNhbWVsQ2FzZSwgc3BlY2lhbEVhc2luZyBhbmQgZXhwYW5kIGNzc0hvb2sgcGFzc1xuXHRmb3IgKCBpbmRleCBpbiBwcm9wcyApIHtcblx0XHRuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggaW5kZXggKTtcblx0XHRlYXNpbmcgPSBzcGVjaWFsRWFzaW5nWyBuYW1lIF07XG5cdFx0dmFsdWUgPSBwcm9wc1sgaW5kZXggXTtcblx0XHRpZiAoIGpRdWVyeS5pc0FycmF5KCB2YWx1ZSApICkge1xuXHRcdFx0ZWFzaW5nID0gdmFsdWVbIDEgXTtcblx0XHRcdHZhbHVlID0gcHJvcHNbIGluZGV4IF0gPSB2YWx1ZVsgMCBdO1xuXHRcdH1cblxuXHRcdGlmICggaW5kZXggIT09IG5hbWUgKSB7XG5cdFx0XHRwcm9wc1sgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRkZWxldGUgcHJvcHNbIGluZGV4IF07XG5cdFx0fVxuXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXTtcblx0XHRpZiAoIGhvb2tzICYmIFwiZXhwYW5kXCIgaW4gaG9va3MgKSB7XG5cdFx0XHR2YWx1ZSA9IGhvb2tzLmV4cGFuZCggdmFsdWUgKTtcblx0XHRcdGRlbGV0ZSBwcm9wc1sgbmFtZSBdO1xuXG5cdFx0XHQvLyBOb3QgcXVpdGUgJC5leHRlbmQsIHRoaXMgd29uJ3Qgb3ZlcndyaXRlIGV4aXN0aW5nIGtleXMuXG5cdFx0XHQvLyBSZXVzaW5nICdpbmRleCcgYmVjYXVzZSB3ZSBoYXZlIHRoZSBjb3JyZWN0IFwibmFtZVwiXG5cdFx0XHRmb3IgKCBpbmRleCBpbiB2YWx1ZSApIHtcblx0XHRcdFx0aWYgKCAhKCBpbmRleCBpbiBwcm9wcyApICkge1xuXHRcdFx0XHRcdHByb3BzWyBpbmRleCBdID0gdmFsdWVbIGluZGV4IF07XG5cdFx0XHRcdFx0c3BlY2lhbEVhc2luZ1sgaW5kZXggXSA9IGVhc2luZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzcGVjaWFsRWFzaW5nWyBuYW1lIF0gPSBlYXNpbmc7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIEFuaW1hdGlvbiggZWxlbSwgcHJvcGVydGllcywgb3B0aW9ucyApIHtcblx0dmFyIHJlc3VsdCxcblx0XHRzdG9wcGVkLFxuXHRcdGluZGV4ID0gMCxcblx0XHRsZW5ndGggPSBBbmltYXRpb24ucHJlZmlsdGVycy5sZW5ndGgsXG5cdFx0ZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKS5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBEb24ndCBtYXRjaCBlbGVtIGluIHRoZSA6YW5pbWF0ZWQgc2VsZWN0b3Jcblx0XHRcdGRlbGV0ZSB0aWNrLmVsZW07XG5cdFx0fSApLFxuXHRcdHRpY2sgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggc3RvcHBlZCApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGN1cnJlbnRUaW1lID0gZnhOb3cgfHwgY3JlYXRlRnhOb3coKSxcblx0XHRcdFx0cmVtYWluaW5nID0gTWF0aC5tYXgoIDAsIGFuaW1hdGlvbi5zdGFydFRpbWUgKyBhbmltYXRpb24uZHVyYXRpb24gLSBjdXJyZW50VGltZSApLFxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgMi4zIG9ubHlcblx0XHRcdFx0Ly8gQXJjaGFpYyBjcmFzaCBidWcgd29uJ3QgYWxsb3cgdXMgdG8gdXNlIGAxIC0gKCAwLjUgfHwgMCApYCAoIzEyNDk3KVxuXHRcdFx0XHR0ZW1wID0gcmVtYWluaW5nIC8gYW5pbWF0aW9uLmR1cmF0aW9uIHx8IDAsXG5cdFx0XHRcdHBlcmNlbnQgPSAxIC0gdGVtcCxcblx0XHRcdFx0aW5kZXggPSAwLFxuXHRcdFx0XHRsZW5ndGggPSBhbmltYXRpb24udHdlZW5zLmxlbmd0aDtcblxuXHRcdFx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRcdFx0YW5pbWF0aW9uLnR3ZWVuc1sgaW5kZXggXS5ydW4oIHBlcmNlbnQgKTtcblx0XHRcdH1cblxuXHRcdFx0ZGVmZXJyZWQubm90aWZ5V2l0aCggZWxlbSwgWyBhbmltYXRpb24sIHBlcmNlbnQsIHJlbWFpbmluZyBdICk7XG5cblx0XHRcdGlmICggcGVyY2VudCA8IDEgJiYgbGVuZ3RoICkge1xuXHRcdFx0XHRyZXR1cm4gcmVtYWluaW5nO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uIF0gKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0YW5pbWF0aW9uID0gZGVmZXJyZWQucHJvbWlzZSgge1xuXHRcdFx0ZWxlbTogZWxlbSxcblx0XHRcdHByb3BzOiBqUXVlcnkuZXh0ZW5kKCB7fSwgcHJvcGVydGllcyApLFxuXHRcdFx0b3B0czogalF1ZXJ5LmV4dGVuZCggdHJ1ZSwge1xuXHRcdFx0XHRzcGVjaWFsRWFzaW5nOiB7fSxcblx0XHRcdFx0ZWFzaW5nOiBqUXVlcnkuZWFzaW5nLl9kZWZhdWx0XG5cdFx0XHR9LCBvcHRpb25zICksXG5cdFx0XHRvcmlnaW5hbFByb3BlcnRpZXM6IHByb3BlcnRpZXMsXG5cdFx0XHRvcmlnaW5hbE9wdGlvbnM6IG9wdGlvbnMsXG5cdFx0XHRzdGFydFRpbWU6IGZ4Tm93IHx8IGNyZWF0ZUZ4Tm93KCksXG5cdFx0XHRkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcblx0XHRcdHR3ZWVuczogW10sXG5cdFx0XHRjcmVhdGVUd2VlbjogZnVuY3Rpb24oIHByb3AsIGVuZCApIHtcblx0XHRcdFx0dmFyIHR3ZWVuID0galF1ZXJ5LlR3ZWVuKCBlbGVtLCBhbmltYXRpb24ub3B0cywgcHJvcCwgZW5kLFxuXHRcdFx0XHRcdFx0YW5pbWF0aW9uLm9wdHMuc3BlY2lhbEVhc2luZ1sgcHJvcCBdIHx8IGFuaW1hdGlvbi5vcHRzLmVhc2luZyApO1xuXHRcdFx0XHRhbmltYXRpb24udHdlZW5zLnB1c2goIHR3ZWVuICk7XG5cdFx0XHRcdHJldHVybiB0d2Vlbjtcblx0XHRcdH0sXG5cdFx0XHRzdG9wOiBmdW5jdGlvbiggZ290b0VuZCApIHtcblx0XHRcdFx0dmFyIGluZGV4ID0gMCxcblxuXHRcdFx0XHRcdC8vIElmIHdlIGFyZSBnb2luZyB0byB0aGUgZW5kLCB3ZSB3YW50IHRvIHJ1biBhbGwgdGhlIHR3ZWVuc1xuXHRcdFx0XHRcdC8vIG90aGVyd2lzZSB3ZSBza2lwIHRoaXMgcGFydFxuXHRcdFx0XHRcdGxlbmd0aCA9IGdvdG9FbmQgPyBhbmltYXRpb24udHdlZW5zLmxlbmd0aCA6IDA7XG5cdFx0XHRcdGlmICggc3RvcHBlZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0XHRzdG9wcGVkID0gdHJ1ZTtcblx0XHRcdFx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRcdFx0XHRhbmltYXRpb24udHdlZW5zWyBpbmRleCBdLnJ1biggMSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmVzb2x2ZSB3aGVuIHdlIHBsYXllZCB0aGUgbGFzdCBmcmFtZTsgb3RoZXJ3aXNlLCByZWplY3Rcblx0XHRcdFx0aWYgKCBnb3RvRW5kICkge1xuXHRcdFx0XHRcdGRlZmVycmVkLm5vdGlmeVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCAxLCAwIF0gKTtcblx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggZWxlbSwgWyBhbmltYXRpb24sIGdvdG9FbmQgXSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBnb3RvRW5kIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9ICksXG5cdFx0cHJvcHMgPSBhbmltYXRpb24ucHJvcHM7XG5cblx0cHJvcEZpbHRlciggcHJvcHMsIGFuaW1hdGlvbi5vcHRzLnNwZWNpYWxFYXNpbmcgKTtcblxuXHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdHJlc3VsdCA9IEFuaW1hdGlvbi5wcmVmaWx0ZXJzWyBpbmRleCBdLmNhbGwoIGFuaW1hdGlvbiwgZWxlbSwgcHJvcHMsIGFuaW1hdGlvbi5vcHRzICk7XG5cdFx0aWYgKCByZXN1bHQgKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCByZXN1bHQuc3RvcCApICkge1xuXHRcdFx0XHRqUXVlcnkuX3F1ZXVlSG9va3MoIGFuaW1hdGlvbi5lbGVtLCBhbmltYXRpb24ub3B0cy5xdWV1ZSApLnN0b3AgPVxuXHRcdFx0XHRcdGpRdWVyeS5wcm94eSggcmVzdWx0LnN0b3AsIHJlc3VsdCApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdH1cblxuXHRqUXVlcnkubWFwKCBwcm9wcywgY3JlYXRlVHdlZW4sIGFuaW1hdGlvbiApO1xuXG5cdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIGFuaW1hdGlvbi5vcHRzLnN0YXJ0ICkgKSB7XG5cdFx0YW5pbWF0aW9uLm9wdHMuc3RhcnQuY2FsbCggZWxlbSwgYW5pbWF0aW9uICk7XG5cdH1cblxuXHRqUXVlcnkuZngudGltZXIoXG5cdFx0alF1ZXJ5LmV4dGVuZCggdGljaywge1xuXHRcdFx0ZWxlbTogZWxlbSxcblx0XHRcdGFuaW06IGFuaW1hdGlvbixcblx0XHRcdHF1ZXVlOiBhbmltYXRpb24ub3B0cy5xdWV1ZVxuXHRcdH0gKVxuXHQpO1xuXG5cdC8vIGF0dGFjaCBjYWxsYmFja3MgZnJvbSBvcHRpb25zXG5cdHJldHVybiBhbmltYXRpb24ucHJvZ3Jlc3MoIGFuaW1hdGlvbi5vcHRzLnByb2dyZXNzIClcblx0XHQuZG9uZSggYW5pbWF0aW9uLm9wdHMuZG9uZSwgYW5pbWF0aW9uLm9wdHMuY29tcGxldGUgKVxuXHRcdC5mYWlsKCBhbmltYXRpb24ub3B0cy5mYWlsIClcblx0XHQuYWx3YXlzKCBhbmltYXRpb24ub3B0cy5hbHdheXMgKTtcbn1cblxualF1ZXJ5LkFuaW1hdGlvbiA9IGpRdWVyeS5leHRlbmQoIEFuaW1hdGlvbiwge1xuXG5cdHR3ZWVuZXJzOiB7XG5cdFx0XCIqXCI6IFsgZnVuY3Rpb24oIHByb3AsIHZhbHVlICkge1xuXHRcdFx0dmFyIHR3ZWVuID0gdGhpcy5jcmVhdGVUd2VlbiggcHJvcCwgdmFsdWUgKTtcblx0XHRcdGFkanVzdENTUyggdHdlZW4uZWxlbSwgcHJvcCwgcmNzc051bS5leGVjKCB2YWx1ZSApLCB0d2VlbiApO1xuXHRcdFx0cmV0dXJuIHR3ZWVuO1xuXHRcdH0gXVxuXHR9LFxuXG5cdHR3ZWVuZXI6IGZ1bmN0aW9uKCBwcm9wcywgY2FsbGJhY2sgKSB7XG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcHJvcHMgKSApIHtcblx0XHRcdGNhbGxiYWNrID0gcHJvcHM7XG5cdFx0XHRwcm9wcyA9IFsgXCIqXCIgXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cHJvcHMgPSBwcm9wcy5tYXRjaCggcm5vdGh0bWx3aGl0ZSApO1xuXHRcdH1cblxuXHRcdHZhciBwcm9wLFxuXHRcdFx0aW5kZXggPSAwLFxuXHRcdFx0bGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG5cdFx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRcdHByb3AgPSBwcm9wc1sgaW5kZXggXTtcblx0XHRcdEFuaW1hdGlvbi50d2VlbmVyc1sgcHJvcCBdID0gQW5pbWF0aW9uLnR3ZWVuZXJzWyBwcm9wIF0gfHwgW107XG5cdFx0XHRBbmltYXRpb24udHdlZW5lcnNbIHByb3AgXS51bnNoaWZ0KCBjYWxsYmFjayApO1xuXHRcdH1cblx0fSxcblxuXHRwcmVmaWx0ZXJzOiBbIGRlZmF1bHRQcmVmaWx0ZXIgXSxcblxuXHRwcmVmaWx0ZXI6IGZ1bmN0aW9uKCBjYWxsYmFjaywgcHJlcGVuZCApIHtcblx0XHRpZiAoIHByZXBlbmQgKSB7XG5cdFx0XHRBbmltYXRpb24ucHJlZmlsdGVycy51bnNoaWZ0KCBjYWxsYmFjayApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRBbmltYXRpb24ucHJlZmlsdGVycy5wdXNoKCBjYWxsYmFjayApO1xuXHRcdH1cblx0fVxufSApO1xuXG5qUXVlcnkuc3BlZWQgPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgZm4gKSB7XG5cdHZhciBvcHQgPSBzcGVlZCAmJiB0eXBlb2Ygc3BlZWQgPT09IFwib2JqZWN0XCIgPyBqUXVlcnkuZXh0ZW5kKCB7fSwgc3BlZWQgKSA6IHtcblx0XHRjb21wbGV0ZTogZm4gfHwgIWZuICYmIGVhc2luZyB8fFxuXHRcdFx0alF1ZXJ5LmlzRnVuY3Rpb24oIHNwZWVkICkgJiYgc3BlZWQsXG5cdFx0ZHVyYXRpb246IHNwZWVkLFxuXHRcdGVhc2luZzogZm4gJiYgZWFzaW5nIHx8IGVhc2luZyAmJiAhalF1ZXJ5LmlzRnVuY3Rpb24oIGVhc2luZyApICYmIGVhc2luZ1xuXHR9O1xuXG5cdC8vIEdvIHRvIHRoZSBlbmQgc3RhdGUgaWYgZnggYXJlIG9mZiBvciBpZiBkb2N1bWVudCBpcyBoaWRkZW5cblx0aWYgKCBqUXVlcnkuZngub2ZmIHx8IGRvY3VtZW50LmhpZGRlbiApIHtcblx0XHRvcHQuZHVyYXRpb24gPSAwO1xuXG5cdH0gZWxzZSB7XG5cdFx0aWYgKCB0eXBlb2Ygb3B0LmR1cmF0aW9uICE9PSBcIm51bWJlclwiICkge1xuXHRcdFx0aWYgKCBvcHQuZHVyYXRpb24gaW4galF1ZXJ5LmZ4LnNwZWVkcyApIHtcblx0XHRcdFx0b3B0LmR1cmF0aW9uID0galF1ZXJ5LmZ4LnNwZWVkc1sgb3B0LmR1cmF0aW9uIF07XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9wdC5kdXJhdGlvbiA9IGpRdWVyeS5meC5zcGVlZHMuX2RlZmF1bHQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gTm9ybWFsaXplIG9wdC5xdWV1ZSAtIHRydWUvdW5kZWZpbmVkL251bGwgLT4gXCJmeFwiXG5cdGlmICggb3B0LnF1ZXVlID09IG51bGwgfHwgb3B0LnF1ZXVlID09PSB0cnVlICkge1xuXHRcdG9wdC5xdWV1ZSA9IFwiZnhcIjtcblx0fVxuXG5cdC8vIFF1ZXVlaW5nXG5cdG9wdC5vbGQgPSBvcHQuY29tcGxldGU7XG5cblx0b3B0LmNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggb3B0Lm9sZCApICkge1xuXHRcdFx0b3B0Lm9sZC5jYWxsKCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBvcHQucXVldWUgKSB7XG5cdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgb3B0LnF1ZXVlICk7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiBvcHQ7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGZhZGVUbzogZnVuY3Rpb24oIHNwZWVkLCB0bywgZWFzaW5nLCBjYWxsYmFjayApIHtcblxuXHRcdC8vIFNob3cgYW55IGhpZGRlbiBlbGVtZW50cyBhZnRlciBzZXR0aW5nIG9wYWNpdHkgdG8gMFxuXHRcdHJldHVybiB0aGlzLmZpbHRlciggaXNIaWRkZW5XaXRoaW5UcmVlICkuY3NzKCBcIm9wYWNpdHlcIiwgMCApLnNob3coKVxuXG5cdFx0XHQvLyBBbmltYXRlIHRvIHRoZSB2YWx1ZSBzcGVjaWZpZWRcblx0XHRcdC5lbmQoKS5hbmltYXRlKCB7IG9wYWNpdHk6IHRvIH0sIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICk7XG5cdH0sXG5cdGFuaW1hdGU6IGZ1bmN0aW9uKCBwcm9wLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcblx0XHR2YXIgZW1wdHkgPSBqUXVlcnkuaXNFbXB0eU9iamVjdCggcHJvcCApLFxuXHRcdFx0b3B0YWxsID0galF1ZXJ5LnNwZWVkKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApLFxuXHRcdFx0ZG9BbmltYXRpb24gPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHQvLyBPcGVyYXRlIG9uIGEgY29weSBvZiBwcm9wIHNvIHBlci1wcm9wZXJ0eSBlYXNpbmcgd29uJ3QgYmUgbG9zdFxuXHRcdFx0XHR2YXIgYW5pbSA9IEFuaW1hdGlvbiggdGhpcywgalF1ZXJ5LmV4dGVuZCgge30sIHByb3AgKSwgb3B0YWxsICk7XG5cblx0XHRcdFx0Ly8gRW1wdHkgYW5pbWF0aW9ucywgb3IgZmluaXNoaW5nIHJlc29sdmVzIGltbWVkaWF0ZWx5XG5cdFx0XHRcdGlmICggZW1wdHkgfHwgZGF0YVByaXYuZ2V0KCB0aGlzLCBcImZpbmlzaFwiICkgKSB7XG5cdFx0XHRcdFx0YW5pbS5zdG9wKCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRkb0FuaW1hdGlvbi5maW5pc2ggPSBkb0FuaW1hdGlvbjtcblxuXHRcdHJldHVybiBlbXB0eSB8fCBvcHRhbGwucXVldWUgPT09IGZhbHNlID9cblx0XHRcdHRoaXMuZWFjaCggZG9BbmltYXRpb24gKSA6XG5cdFx0XHR0aGlzLnF1ZXVlKCBvcHRhbGwucXVldWUsIGRvQW5pbWF0aW9uICk7XG5cdH0sXG5cdHN0b3A6IGZ1bmN0aW9uKCB0eXBlLCBjbGVhclF1ZXVlLCBnb3RvRW5kICkge1xuXHRcdHZhciBzdG9wUXVldWUgPSBmdW5jdGlvbiggaG9va3MgKSB7XG5cdFx0XHR2YXIgc3RvcCA9IGhvb2tzLnN0b3A7XG5cdFx0XHRkZWxldGUgaG9va3Muc3RvcDtcblx0XHRcdHN0b3AoIGdvdG9FbmQgKTtcblx0XHR9O1xuXG5cdFx0aWYgKCB0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGdvdG9FbmQgPSBjbGVhclF1ZXVlO1xuXHRcdFx0Y2xlYXJRdWV1ZSA9IHR5cGU7XG5cdFx0XHR0eXBlID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRpZiAoIGNsZWFyUXVldWUgJiYgdHlwZSAhPT0gZmFsc2UgKSB7XG5cdFx0XHR0aGlzLnF1ZXVlKCB0eXBlIHx8IFwiZnhcIiwgW10gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkZXF1ZXVlID0gdHJ1ZSxcblx0XHRcdFx0aW5kZXggPSB0eXBlICE9IG51bGwgJiYgdHlwZSArIFwicXVldWVIb29rc1wiLFxuXHRcdFx0XHR0aW1lcnMgPSBqUXVlcnkudGltZXJzLFxuXHRcdFx0XHRkYXRhID0gZGF0YVByaXYuZ2V0KCB0aGlzICk7XG5cblx0XHRcdGlmICggaW5kZXggKSB7XG5cdFx0XHRcdGlmICggZGF0YVsgaW5kZXggXSAmJiBkYXRhWyBpbmRleCBdLnN0b3AgKSB7XG5cdFx0XHRcdFx0c3RvcFF1ZXVlKCBkYXRhWyBpbmRleCBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAoIGluZGV4IGluIGRhdGEgKSB7XG5cdFx0XHRcdFx0aWYgKCBkYXRhWyBpbmRleCBdICYmIGRhdGFbIGluZGV4IF0uc3RvcCAmJiBycnVuLnRlc3QoIGluZGV4ICkgKSB7XG5cdFx0XHRcdFx0XHRzdG9wUXVldWUoIGRhdGFbIGluZGV4IF0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Zm9yICggaW5kZXggPSB0aW1lcnMubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0aWYgKCB0aW1lcnNbIGluZGV4IF0uZWxlbSA9PT0gdGhpcyAmJlxuXHRcdFx0XHRcdCggdHlwZSA9PSBudWxsIHx8IHRpbWVyc1sgaW5kZXggXS5xdWV1ZSA9PT0gdHlwZSApICkge1xuXG5cdFx0XHRcdFx0dGltZXJzWyBpbmRleCBdLmFuaW0uc3RvcCggZ290b0VuZCApO1xuXHRcdFx0XHRcdGRlcXVldWUgPSBmYWxzZTtcblx0XHRcdFx0XHR0aW1lcnMuc3BsaWNlKCBpbmRleCwgMSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN0YXJ0IHRoZSBuZXh0IGluIHRoZSBxdWV1ZSBpZiB0aGUgbGFzdCBzdGVwIHdhc24ndCBmb3JjZWQuXG5cdFx0XHQvLyBUaW1lcnMgY3VycmVudGx5IHdpbGwgY2FsbCB0aGVpciBjb21wbGV0ZSBjYWxsYmFja3MsIHdoaWNoXG5cdFx0XHQvLyB3aWxsIGRlcXVldWUgYnV0IG9ubHkgaWYgdGhleSB3ZXJlIGdvdG9FbmQuXG5cdFx0XHRpZiAoIGRlcXVldWUgfHwgIWdvdG9FbmQgKSB7XG5cdFx0XHRcdGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXHRmaW5pc2g6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdGlmICggdHlwZSAhPT0gZmFsc2UgKSB7XG5cdFx0XHR0eXBlID0gdHlwZSB8fCBcImZ4XCI7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGluZGV4LFxuXHRcdFx0XHRkYXRhID0gZGF0YVByaXYuZ2V0KCB0aGlzICksXG5cdFx0XHRcdHF1ZXVlID0gZGF0YVsgdHlwZSArIFwicXVldWVcIiBdLFxuXHRcdFx0XHRob29rcyA9IGRhdGFbIHR5cGUgKyBcInF1ZXVlSG9va3NcIiBdLFxuXHRcdFx0XHR0aW1lcnMgPSBqUXVlcnkudGltZXJzLFxuXHRcdFx0XHRsZW5ndGggPSBxdWV1ZSA/IHF1ZXVlLmxlbmd0aCA6IDA7XG5cblx0XHRcdC8vIEVuYWJsZSBmaW5pc2hpbmcgZmxhZyBvbiBwcml2YXRlIGRhdGFcblx0XHRcdGRhdGEuZmluaXNoID0gdHJ1ZTtcblxuXHRcdFx0Ly8gRW1wdHkgdGhlIHF1ZXVlIGZpcnN0XG5cdFx0XHRqUXVlcnkucXVldWUoIHRoaXMsIHR5cGUsIFtdICk7XG5cblx0XHRcdGlmICggaG9va3MgJiYgaG9va3Muc3RvcCApIHtcblx0XHRcdFx0aG9va3Muc3RvcC5jYWxsKCB0aGlzLCB0cnVlICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIExvb2sgZm9yIGFueSBhY3RpdmUgYW5pbWF0aW9ucywgYW5kIGZpbmlzaCB0aGVtXG5cdFx0XHRmb3IgKCBpbmRleCA9IHRpbWVycy5sZW5ndGg7IGluZGV4LS07ICkge1xuXHRcdFx0XHRpZiAoIHRpbWVyc1sgaW5kZXggXS5lbGVtID09PSB0aGlzICYmIHRpbWVyc1sgaW5kZXggXS5xdWV1ZSA9PT0gdHlwZSApIHtcblx0XHRcdFx0XHR0aW1lcnNbIGluZGV4IF0uYW5pbS5zdG9wKCB0cnVlICk7XG5cdFx0XHRcdFx0dGltZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBMb29rIGZvciBhbnkgYW5pbWF0aW9ucyBpbiB0aGUgb2xkIHF1ZXVlIGFuZCBmaW5pc2ggdGhlbVxuXHRcdFx0Zm9yICggaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRcdFx0aWYgKCBxdWV1ZVsgaW5kZXggXSAmJiBxdWV1ZVsgaW5kZXggXS5maW5pc2ggKSB7XG5cdFx0XHRcdFx0cXVldWVbIGluZGV4IF0uZmluaXNoLmNhbGwoIHRoaXMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBUdXJuIG9mZiBmaW5pc2hpbmcgZmxhZ1xuXHRcdFx0ZGVsZXRlIGRhdGEuZmluaXNoO1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZWFjaCggWyBcInRvZ2dsZVwiLCBcInNob3dcIiwgXCJoaWRlXCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdHZhciBjc3NGbiA9IGpRdWVyeS5mblsgbmFtZSBdO1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4gc3BlZWQgPT0gbnVsbCB8fCB0eXBlb2Ygc3BlZWQgPT09IFwiYm9vbGVhblwiID9cblx0XHRcdGNzc0ZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKSA6XG5cdFx0XHR0aGlzLmFuaW1hdGUoIGdlbkZ4KCBuYW1lLCB0cnVlICksIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICk7XG5cdH07XG59ICk7XG5cbi8vIEdlbmVyYXRlIHNob3J0Y3V0cyBmb3IgY3VzdG9tIGFuaW1hdGlvbnNcbmpRdWVyeS5lYWNoKCB7XG5cdHNsaWRlRG93bjogZ2VuRngoIFwic2hvd1wiICksXG5cdHNsaWRlVXA6IGdlbkZ4KCBcImhpZGVcIiApLFxuXHRzbGlkZVRvZ2dsZTogZ2VuRngoIFwidG9nZ2xlXCIgKSxcblx0ZmFkZUluOiB7IG9wYWNpdHk6IFwic2hvd1wiIH0sXG5cdGZhZGVPdXQ6IHsgb3BhY2l0eTogXCJoaWRlXCIgfSxcblx0ZmFkZVRvZ2dsZTogeyBvcGFjaXR5OiBcInRvZ2dsZVwiIH1cbn0sIGZ1bmN0aW9uKCBuYW1lLCBwcm9wcyApIHtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHRoaXMuYW5pbWF0ZSggcHJvcHMsIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICk7XG5cdH07XG59ICk7XG5cbmpRdWVyeS50aW1lcnMgPSBbXTtcbmpRdWVyeS5meC50aWNrID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0aW1lcixcblx0XHRpID0gMCxcblx0XHR0aW1lcnMgPSBqUXVlcnkudGltZXJzO1xuXG5cdGZ4Tm93ID0galF1ZXJ5Lm5vdygpO1xuXG5cdGZvciAoIDsgaSA8IHRpbWVycy5sZW5ndGg7IGkrKyApIHtcblx0XHR0aW1lciA9IHRpbWVyc1sgaSBdO1xuXG5cdFx0Ly8gQ2hlY2tzIHRoZSB0aW1lciBoYXMgbm90IGFscmVhZHkgYmVlbiByZW1vdmVkXG5cdFx0aWYgKCAhdGltZXIoKSAmJiB0aW1lcnNbIGkgXSA9PT0gdGltZXIgKSB7XG5cdFx0XHR0aW1lcnMuc3BsaWNlKCBpLS0sIDEgKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoICF0aW1lcnMubGVuZ3RoICkge1xuXHRcdGpRdWVyeS5meC5zdG9wKCk7XG5cdH1cblx0ZnhOb3cgPSB1bmRlZmluZWQ7XG59O1xuXG5qUXVlcnkuZngudGltZXIgPSBmdW5jdGlvbiggdGltZXIgKSB7XG5cdGpRdWVyeS50aW1lcnMucHVzaCggdGltZXIgKTtcblx0aWYgKCB0aW1lcigpICkge1xuXHRcdGpRdWVyeS5meC5zdGFydCgpO1xuXHR9IGVsc2Uge1xuXHRcdGpRdWVyeS50aW1lcnMucG9wKCk7XG5cdH1cbn07XG5cbmpRdWVyeS5meC5pbnRlcnZhbCA9IDEzO1xualF1ZXJ5LmZ4LnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG5cdGlmICggIXRpbWVySWQgKSB7XG5cdFx0dGltZXJJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgP1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggcmFmICkgOlxuXHRcdFx0d2luZG93LnNldEludGVydmFsKCBqUXVlcnkuZngudGljaywgalF1ZXJ5LmZ4LmludGVydmFsICk7XG5cdH1cbn07XG5cbmpRdWVyeS5meC5zdG9wID0gZnVuY3Rpb24oKSB7XG5cdGlmICggd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lICkge1xuXHRcdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSggdGltZXJJZCApO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGVhckludGVydmFsKCB0aW1lcklkICk7XG5cdH1cblxuXHR0aW1lcklkID0gbnVsbDtcbn07XG5cbmpRdWVyeS5meC5zcGVlZHMgPSB7XG5cdHNsb3c6IDYwMCxcblx0ZmFzdDogMjAwLFxuXG5cdC8vIERlZmF1bHQgc3BlZWRcblx0X2RlZmF1bHQ6IDQwMFxufTtcblxuXG4vLyBCYXNlZCBvZmYgb2YgdGhlIHBsdWdpbiBieSBDbGludCBIZWxmZXJzLCB3aXRoIHBlcm1pc3Npb24uXG4vLyBodHRwczovL3dlYi5hcmNoaXZlLm9yZy93ZWIvMjAxMDAzMjQwMTQ3NDcvaHR0cDovL2JsaW5kc2lnbmFscy5jb20vaW5kZXgucGhwLzIwMDkvMDcvanF1ZXJ5LWRlbGF5L1xualF1ZXJ5LmZuLmRlbGF5ID0gZnVuY3Rpb24oIHRpbWUsIHR5cGUgKSB7XG5cdHRpbWUgPSBqUXVlcnkuZnggPyBqUXVlcnkuZnguc3BlZWRzWyB0aW1lIF0gfHwgdGltZSA6IHRpbWU7XG5cdHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuXHRyZXR1cm4gdGhpcy5xdWV1ZSggdHlwZSwgZnVuY3Rpb24oIG5leHQsIGhvb2tzICkge1xuXHRcdHZhciB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoIG5leHQsIHRpbWUgKTtcblx0XHRob29rcy5zdG9wID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KCB0aW1lb3V0ICk7XG5cdFx0fTtcblx0fSApO1xufTtcblxuXG4oIGZ1bmN0aW9uKCkge1xuXHR2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKSxcblx0XHRzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcInNlbGVjdFwiICksXG5cdFx0b3B0ID0gc2VsZWN0LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcIm9wdGlvblwiICkgKTtcblxuXHRpbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjMgb25seVxuXHQvLyBEZWZhdWx0IHZhbHVlIGZvciBhIGNoZWNrYm94IHNob3VsZCBiZSBcIm9uXCJcblx0c3VwcG9ydC5jaGVja09uID0gaW5wdXQudmFsdWUgIT09IFwiXCI7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdC8vIE11c3QgYWNjZXNzIHNlbGVjdGVkSW5kZXggdG8gbWFrZSBkZWZhdWx0IG9wdGlvbnMgc2VsZWN0XG5cdHN1cHBvcnQub3B0U2VsZWN0ZWQgPSBvcHQuc2VsZWN0ZWQ7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdC8vIEFuIGlucHV0IGxvc2VzIGl0cyB2YWx1ZSBhZnRlciBiZWNvbWluZyBhIHJhZGlvXG5cdGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG5cdGlucHV0LnZhbHVlID0gXCJ0XCI7XG5cdGlucHV0LnR5cGUgPSBcInJhZGlvXCI7XG5cdHN1cHBvcnQucmFkaW9WYWx1ZSA9IGlucHV0LnZhbHVlID09PSBcInRcIjtcbn0gKSgpO1xuXG5cbnZhciBib29sSG9vayxcblx0YXR0ckhhbmRsZSA9IGpRdWVyeS5leHByLmF0dHJIYW5kbGU7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0YXR0cjogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGpRdWVyeS5hdHRyLCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fSxcblxuXHRyZW1vdmVBdHRyOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCB0aGlzLCBuYW1lICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0YXR0cjogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xuXHRcdHZhciByZXQsIGhvb2tzLFxuXHRcdFx0blR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdFx0Ly8gRG9uJ3QgZ2V0L3NldCBhdHRyaWJ1dGVzIG9uIHRleHQsIGNvbW1lbnQgYW5kIGF0dHJpYnV0ZSBub2Rlc1xuXHRcdGlmICggblR5cGUgPT09IDMgfHwgblR5cGUgPT09IDggfHwgblR5cGUgPT09IDIgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRmFsbGJhY2sgdG8gcHJvcCB3aGVuIGF0dHJpYnV0ZXMgYXJlIG5vdCBzdXBwb3J0ZWRcblx0XHRpZiAoIHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZSA9PT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdHJldHVybiBqUXVlcnkucHJvcCggZWxlbSwgbmFtZSwgdmFsdWUgKTtcblx0XHR9XG5cblx0XHQvLyBBdHRyaWJ1dGUgaG9va3MgYXJlIGRldGVybWluZWQgYnkgdGhlIGxvd2VyY2FzZSB2ZXJzaW9uXG5cdFx0Ly8gR3JhYiBuZWNlc3NhcnkgaG9vayBpZiBvbmUgaXMgZGVmaW5lZFxuXHRcdGlmICggblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApICkge1xuXHRcdFx0aG9va3MgPSBqUXVlcnkuYXR0ckhvb2tzWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSB8fFxuXHRcdFx0XHQoIGpRdWVyeS5leHByLm1hdGNoLmJvb2wudGVzdCggbmFtZSApID8gYm9vbEhvb2sgOiB1bmRlZmluZWQgKTtcblx0XHR9XG5cblx0XHRpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRpZiAoIHZhbHVlID09PSBudWxsICkge1xuXHRcdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICggaG9va3MgJiYgXCJzZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHQoIHJldCA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBuYW1lLCB2YWx1ZSArIFwiXCIgKTtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cblx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKCByZXQgPSBob29rcy5nZXQoIGVsZW0sIG5hbWUgKSApICE9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9XG5cblx0XHRyZXQgPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBuYW1lICk7XG5cblx0XHQvLyBOb24tZXhpc3RlbnQgYXR0cmlidXRlcyByZXR1cm4gbnVsbCwgd2Ugbm9ybWFsaXplIHRvIHVuZGVmaW5lZFxuXHRcdHJldHVybiByZXQgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IHJldDtcblx0fSxcblxuXHRhdHRySG9va3M6IHtcblx0XHR0eXBlOiB7XG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdFx0aWYgKCAhc3VwcG9ydC5yYWRpb1ZhbHVlICYmIHZhbHVlID09PSBcInJhZGlvXCIgJiZcblx0XHRcdFx0XHRqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwiaW5wdXRcIiApICkge1xuXHRcdFx0XHRcdHZhciB2YWwgPSBlbGVtLnZhbHVlO1xuXHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgdmFsdWUgKTtcblx0XHRcdFx0XHRpZiAoIHZhbCApIHtcblx0XHRcdFx0XHRcdGVsZW0udmFsdWUgPSB2YWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRyZW1vdmVBdHRyOiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0dmFyIG5hbWUsXG5cdFx0XHRpID0gMCxcblxuXHRcdFx0Ly8gQXR0cmlidXRlIG5hbWVzIGNhbiBjb250YWluIG5vbi1IVE1MIHdoaXRlc3BhY2UgY2hhcmFjdGVyc1xuXHRcdFx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjYXR0cmlidXRlcy0yXG5cdFx0XHRhdHRyTmFtZXMgPSB2YWx1ZSAmJiB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApO1xuXG5cdFx0aWYgKCBhdHRyTmFtZXMgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdHdoaWxlICggKCBuYW1lID0gYXR0ck5hbWVzWyBpKysgXSApICkge1xuXHRcdFx0XHRlbGVtLnJlbW92ZUF0dHJpYnV0ZSggbmFtZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSApO1xuXG4vLyBIb29rcyBmb3IgYm9vbGVhbiBhdHRyaWJ1dGVzXG5ib29sSG9vayA9IHtcblx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgKSB7XG5cdFx0aWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdC8vIFJlbW92ZSBib29sZWFuIGF0dHJpYnV0ZXMgd2hlbiBzZXQgdG8gZmFsc2Vcblx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBuYW1lLCBuYW1lICk7XG5cdFx0fVxuXHRcdHJldHVybiBuYW1lO1xuXHR9XG59O1xuXG5qUXVlcnkuZWFjaCggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC5zb3VyY2UubWF0Y2goIC9cXHcrL2cgKSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdHZhciBnZXR0ZXIgPSBhdHRySGFuZGxlWyBuYW1lIF0gfHwgalF1ZXJ5LmZpbmQuYXR0cjtcblxuXHRhdHRySGFuZGxlWyBuYW1lIF0gPSBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0dmFyIHJldCwgaGFuZGxlLFxuXHRcdFx0bG93ZXJjYXNlTmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblxuXHRcdGlmICggIWlzWE1MICkge1xuXG5cdFx0XHQvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wIGJ5IHRlbXBvcmFyaWx5IHJlbW92aW5nIHRoaXMgZnVuY3Rpb24gZnJvbSB0aGUgZ2V0dGVyXG5cdFx0XHRoYW5kbGUgPSBhdHRySGFuZGxlWyBsb3dlcmNhc2VOYW1lIF07XG5cdFx0XHRhdHRySGFuZGxlWyBsb3dlcmNhc2VOYW1lIF0gPSByZXQ7XG5cdFx0XHRyZXQgPSBnZXR0ZXIoIGVsZW0sIG5hbWUsIGlzWE1MICkgIT0gbnVsbCA/XG5cdFx0XHRcdGxvd2VyY2FzZU5hbWUgOlxuXHRcdFx0XHRudWxsO1xuXHRcdFx0YXR0ckhhbmRsZVsgbG93ZXJjYXNlTmFtZSBdID0gaGFuZGxlO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0O1xuXHR9O1xufSApO1xuXG5cblxuXG52YXIgcmZvY3VzYWJsZSA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksXG5cdHJjbGlja2FibGUgPSAvXig/OmF8YXJlYSkkL2k7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0cHJvcDogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGpRdWVyeS5wcm9wLCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fSxcblxuXHRyZW1vdmVQcm9wOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGRlbGV0ZSB0aGlzWyBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWUgXTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHRwcm9wOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0dmFyIHJldCwgaG9va3MsXG5cdFx0XHRuVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0XHQvLyBEb24ndCBnZXQvc2V0IHByb3BlcnRpZXMgb24gdGV4dCwgY29tbWVudCBhbmQgYXR0cmlidXRlIG5vZGVzXG5cdFx0aWYgKCBuVHlwZSA9PT0gMyB8fCBuVHlwZSA9PT0gOCB8fCBuVHlwZSA9PT0gMiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIG5UeXBlICE9PSAxIHx8ICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblxuXHRcdFx0Ly8gRml4IG5hbWUgYW5kIGF0dGFjaCBob29rc1xuXHRcdFx0bmFtZSA9IGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZTtcblx0XHRcdGhvb2tzID0galF1ZXJ5LnByb3BIb29rc1sgbmFtZSBdO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggaG9va3MgJiYgXCJzZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHQoIHJldCA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoIGVsZW1bIG5hbWUgXSA9IHZhbHVlICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmICggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkgKSAhPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVsZW1bIG5hbWUgXTtcblx0fSxcblxuXHRwcm9wSG9va3M6IHtcblx0XHR0YWJJbmRleDoge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdFx0XHRcdC8vIGVsZW0udGFiSW5kZXggZG9lc24ndCBhbHdheXMgcmV0dXJuIHRoZVxuXHRcdFx0XHQvLyBjb3JyZWN0IHZhbHVlIHdoZW4gaXQgaGFzbid0IGJlZW4gZXhwbGljaXRseSBzZXRcblx0XHRcdFx0Ly8gaHR0cHM6Ly93ZWIuYXJjaGl2ZS5vcmcvd2ViLzIwMTQxMTE2MjMzMzQ3L2h0dHA6Ly9mbHVpZHByb2plY3Qub3JnL2Jsb2cvMjAwOC8wMS8wOS9nZXR0aW5nLXNldHRpbmctYW5kLXJlbW92aW5nLXRhYmluZGV4LXZhbHVlcy13aXRoLWphdmFzY3JpcHQvXG5cdFx0XHRcdC8vIFVzZSBwcm9wZXIgYXR0cmlidXRlIHJldHJpZXZhbCgjMTIwNzIpXG5cdFx0XHRcdHZhciB0YWJpbmRleCA9IGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIFwidGFiaW5kZXhcIiApO1xuXG5cdFx0XHRcdGlmICggdGFiaW5kZXggKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlSW50KCB0YWJpbmRleCwgMTAgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRyZm9jdXNhYmxlLnRlc3QoIGVsZW0ubm9kZU5hbWUgKSB8fFxuXHRcdFx0XHRcdHJjbGlja2FibGUudGVzdCggZWxlbS5ub2RlTmFtZSApICYmXG5cdFx0XHRcdFx0ZWxlbS5ocmVmXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRwcm9wRml4OiB7XG5cdFx0XCJmb3JcIjogXCJodG1sRm9yXCIsXG5cdFx0XCJjbGFzc1wiOiBcImNsYXNzTmFtZVwiXG5cdH1cbn0gKTtcblxuLy8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG4vLyBBY2Nlc3NpbmcgdGhlIHNlbGVjdGVkSW5kZXggcHJvcGVydHlcbi8vIGZvcmNlcyB0aGUgYnJvd3NlciB0byByZXNwZWN0IHNldHRpbmcgc2VsZWN0ZWRcbi8vIG9uIHRoZSBvcHRpb25cbi8vIFRoZSBnZXR0ZXIgZW5zdXJlcyBhIGRlZmF1bHQgb3B0aW9uIGlzIHNlbGVjdGVkXG4vLyB3aGVuIGluIGFuIG9wdGdyb3VwXG4vLyBlc2xpbnQgcnVsZSBcIm5vLXVudXNlZC1leHByZXNzaW9uc1wiIGlzIGRpc2FibGVkIGZvciB0aGlzIGNvZGVcbi8vIHNpbmNlIGl0IGNvbnNpZGVycyBzdWNoIGFjY2Vzc2lvbnMgbm9vcFxuaWYgKCAhc3VwcG9ydC5vcHRTZWxlY3RlZCApIHtcblx0alF1ZXJ5LnByb3BIb29rcy5zZWxlY3RlZCA9IHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHQvKiBlc2xpbnQgbm8tdW51c2VkLWV4cHJlc3Npb25zOiBcIm9mZlwiICovXG5cblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRpZiAoIHBhcmVudCAmJiBwYXJlbnQucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0cGFyZW50LnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0LyogZXNsaW50IG5vLXVudXNlZC1leHByZXNzaW9uczogXCJvZmZcIiAqL1xuXG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0aWYgKCBwYXJlbnQgKSB7XG5cdFx0XHRcdHBhcmVudC5zZWxlY3RlZEluZGV4O1xuXG5cdFx0XHRcdGlmICggcGFyZW50LnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdFx0cGFyZW50LnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxualF1ZXJ5LmVhY2goIFtcblx0XCJ0YWJJbmRleFwiLFxuXHRcInJlYWRPbmx5XCIsXG5cdFwibWF4TGVuZ3RoXCIsXG5cdFwiY2VsbFNwYWNpbmdcIixcblx0XCJjZWxsUGFkZGluZ1wiLFxuXHRcInJvd1NwYW5cIixcblx0XCJjb2xTcGFuXCIsXG5cdFwidXNlTWFwXCIsXG5cdFwiZnJhbWVCb3JkZXJcIixcblx0XCJjb250ZW50RWRpdGFibGVcIlxuXSwgZnVuY3Rpb24oKSB7XG5cdGpRdWVyeS5wcm9wRml4WyB0aGlzLnRvTG93ZXJDYXNlKCkgXSA9IHRoaXM7XG59ICk7XG5cblxuXG5cblx0Ly8gU3RyaXAgYW5kIGNvbGxhcHNlIHdoaXRlc3BhY2UgYWNjb3JkaW5nIHRvIEhUTUwgc3BlY1xuXHQvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmZyYXN0cnVjdHVyZS5odG1sI3N0cmlwLWFuZC1jb2xsYXBzZS13aGl0ZXNwYWNlXG5cdGZ1bmN0aW9uIHN0cmlwQW5kQ29sbGFwc2UoIHZhbHVlICkge1xuXHRcdHZhciB0b2tlbnMgPSB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXHRcdHJldHVybiB0b2tlbnMuam9pbiggXCIgXCIgKTtcblx0fVxuXG5cbmZ1bmN0aW9uIGdldENsYXNzKCBlbGVtICkge1xuXHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUgJiYgZWxlbS5nZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiApIHx8IFwiXCI7XG59XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0YWRkQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjdXJWYWx1ZSwgY2xhenosIGosIGZpbmFsVmFsdWUsXG5cdFx0XHRpID0gMDtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaiApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkuYWRkQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIGdldENsYXNzKCB0aGlzICkgKSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlICkge1xuXHRcdFx0Y2xhc3NlcyA9IHZhbHVlLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW107XG5cblx0XHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0Y3VyVmFsdWUgPSBnZXRDbGFzcyggZWxlbSApO1xuXHRcdFx0XHRjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmICggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBjdXJWYWx1ZSApICsgXCIgXCIgKTtcblxuXHRcdFx0XHRpZiAoIGN1ciApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoICggY2xhenogPSBjbGFzc2VzWyBqKysgXSApICkge1xuXHRcdFx0XHRcdFx0aWYgKCBjdXIuaW5kZXhPZiggXCIgXCIgKyBjbGF6eiArIFwiIFwiICkgPCAwICkge1xuXHRcdFx0XHRcdFx0XHRjdXIgKz0gY2xhenogKyBcIiBcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBPbmx5IGFzc2lnbiBpZiBkaWZmZXJlbnQgdG8gYXZvaWQgdW5uZWVkZWQgcmVuZGVyaW5nLlxuXHRcdFx0XHRcdGZpbmFsVmFsdWUgPSBzdHJpcEFuZENvbGxhcHNlKCBjdXIgKTtcblx0XHRcdFx0XHRpZiAoIGN1clZhbHVlICE9PSBmaW5hbFZhbHVlICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiwgZmluYWxWYWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHJlbW92ZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY3VyVmFsdWUsIGNsYXp6LCBqLCBmaW5hbFZhbHVlLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGogKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLnJlbW92ZUNsYXNzKCB2YWx1ZS5jYWxsKCB0aGlzLCBqLCBnZXRDbGFzcyggdGhpcyApICkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRpZiAoICFhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuYXR0ciggXCJjbGFzc1wiLCBcIlwiICk7XG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUgKSB7XG5cdFx0XHRjbGFzc2VzID0gdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcblxuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSB0aGlzWyBpKysgXSApICkge1xuXHRcdFx0XHRjdXJWYWx1ZSA9IGdldENsYXNzKCBlbGVtICk7XG5cblx0XHRcdFx0Ly8gVGhpcyBleHByZXNzaW9uIGlzIGhlcmUgZm9yIGJldHRlciBjb21wcmVzc2liaWxpdHkgKHNlZSBhZGRDbGFzcylcblx0XHRcdFx0Y3VyID0gZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIFwiIFwiICsgc3RyaXBBbmRDb2xsYXBzZSggY3VyVmFsdWUgKSArIFwiIFwiICk7XG5cblx0XHRcdFx0aWYgKCBjdXIgKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCAoIGNsYXp6ID0gY2xhc3Nlc1sgaisrIF0gKSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlICphbGwqIGluc3RhbmNlc1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBjdXIuaW5kZXhPZiggXCIgXCIgKyBjbGF6eiArIFwiIFwiICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdFx0Y3VyID0gY3VyLnJlcGxhY2UoIFwiIFwiICsgY2xhenogKyBcIiBcIiwgXCIgXCIgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBPbmx5IGFzc2lnbiBpZiBkaWZmZXJlbnQgdG8gYXZvaWQgdW5uZWVkZWQgcmVuZGVyaW5nLlxuXHRcdFx0XHRcdGZpbmFsVmFsdWUgPSBzdHJpcEFuZENvbGxhcHNlKCBjdXIgKTtcblx0XHRcdFx0XHRpZiAoIGN1clZhbHVlICE9PSBmaW5hbFZhbHVlICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiwgZmluYWxWYWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHRvZ2dsZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUsIHN0YXRlVmFsICkge1xuXHRcdHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG5cdFx0aWYgKCB0eXBlb2Ygc3RhdGVWYWwgPT09IFwiYm9vbGVhblwiICYmIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gc3RhdGVWYWwgPyB0aGlzLmFkZENsYXNzKCB2YWx1ZSApIDogdGhpcy5yZW1vdmVDbGFzcyggdmFsdWUgKTtcblx0XHR9XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLnRvZ2dsZUNsYXNzKFxuXHRcdFx0XHRcdHZhbHVlLmNhbGwoIHRoaXMsIGksIGdldENsYXNzKCB0aGlzICksIHN0YXRlVmFsICksXG5cdFx0XHRcdFx0c3RhdGVWYWxcblx0XHRcdFx0KTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBjbGFzc05hbWUsIGksIHNlbGYsIGNsYXNzTmFtZXM7XG5cblx0XHRcdGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcblxuXHRcdFx0XHQvLyBUb2dnbGUgaW5kaXZpZHVhbCBjbGFzcyBuYW1lc1xuXHRcdFx0XHRpID0gMDtcblx0XHRcdFx0c2VsZiA9IGpRdWVyeSggdGhpcyApO1xuXHRcdFx0XHRjbGFzc05hbWVzID0gdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcblxuXHRcdFx0XHR3aGlsZSAoICggY2xhc3NOYW1lID0gY2xhc3NOYW1lc1sgaSsrIF0gKSApIHtcblxuXHRcdFx0XHRcdC8vIENoZWNrIGVhY2ggY2xhc3NOYW1lIGdpdmVuLCBzcGFjZSBzZXBhcmF0ZWQgbGlzdFxuXHRcdFx0XHRcdGlmICggc2VsZi5oYXNDbGFzcyggY2xhc3NOYW1lICkgKSB7XG5cdFx0XHRcdFx0XHRzZWxmLnJlbW92ZUNsYXNzKCBjbGFzc05hbWUgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c2VsZi5hZGRDbGFzcyggY2xhc3NOYW1lICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdC8vIFRvZ2dsZSB3aG9sZSBjbGFzcyBuYW1lXG5cdFx0XHR9IGVsc2UgaWYgKCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGUgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdFx0XHRjbGFzc05hbWUgPSBnZXRDbGFzcyggdGhpcyApO1xuXHRcdFx0XHRpZiAoIGNsYXNzTmFtZSApIHtcblxuXHRcdFx0XHRcdC8vIFN0b3JlIGNsYXNzTmFtZSBpZiBzZXRcblx0XHRcdFx0XHRkYXRhUHJpdi5zZXQoIHRoaXMsIFwiX19jbGFzc05hbWVfX1wiLCBjbGFzc05hbWUgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIElmIHRoZSBlbGVtZW50IGhhcyBhIGNsYXNzIG5hbWUgb3IgaWYgd2UncmUgcGFzc2VkIGBmYWxzZWAsXG5cdFx0XHRcdC8vIHRoZW4gcmVtb3ZlIHRoZSB3aG9sZSBjbGFzc25hbWUgKGlmIHRoZXJlIHdhcyBvbmUsIHRoZSBhYm92ZSBzYXZlZCBpdCkuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSBicmluZyBiYWNrIHdoYXRldmVyIHdhcyBwcmV2aW91c2x5IHNhdmVkIChpZiBhbnl0aGluZyksXG5cdFx0XHRcdC8vIGZhbGxpbmcgYmFjayB0byB0aGUgZW1wdHkgc3RyaW5nIGlmIG5vdGhpbmcgd2FzIHN0b3JlZC5cblx0XHRcdFx0aWYgKCB0aGlzLnNldEF0dHJpYnV0ZSApIHtcblx0XHRcdFx0XHR0aGlzLnNldEF0dHJpYnV0ZSggXCJjbGFzc1wiLFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lIHx8IHZhbHVlID09PSBmYWxzZSA/XG5cdFx0XHRcdFx0XHRcIlwiIDpcblx0XHRcdFx0XHRcdGRhdGFQcml2LmdldCggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIgKSB8fCBcIlwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRoYXNDbGFzczogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHZhciBjbGFzc05hbWUsIGVsZW0sXG5cdFx0XHRpID0gMDtcblxuXHRcdGNsYXNzTmFtZSA9IFwiIFwiICsgc2VsZWN0b3IgKyBcIiBcIjtcblx0XHR3aGlsZSAoICggZWxlbSA9IHRoaXNbIGkrKyBdICkgKSB7XG5cdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdFx0KCBcIiBcIiArIHN0cmlwQW5kQ29sbGFwc2UoIGdldENsYXNzKCBlbGVtICkgKSArIFwiIFwiICkuaW5kZXhPZiggY2xhc3NOYW1lICkgPiAtMSApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn0gKTtcblxuXG5cblxudmFyIHJyZXR1cm4gPSAvXFxyL2c7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0dmFsOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGhvb2tzLCByZXQsIGlzRnVuY3Rpb24sXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdO1xuXG5cdFx0aWYgKCAhYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdGlmICggZWxlbSApIHtcblx0XHRcdFx0aG9va3MgPSBqUXVlcnkudmFsSG9va3NbIGVsZW0udHlwZSBdIHx8XG5cdFx0XHRcdFx0alF1ZXJ5LnZhbEhvb2tzWyBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuXHRcdFx0XHRpZiAoIGhvb2tzICYmXG5cdFx0XHRcdFx0XCJnZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHRcdCggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBcInZhbHVlXCIgKSApICE9PSB1bmRlZmluZWRcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldCA9IGVsZW0udmFsdWU7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIG1vc3QgY29tbW9uIHN0cmluZyBjYXNlc1xuXHRcdFx0XHRpZiAoIHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJldC5yZXBsYWNlKCBycmV0dXJuLCBcIlwiICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBIYW5kbGUgY2FzZXMgd2hlcmUgdmFsdWUgaXMgbnVsbC91bmRlZiBvciBudW1iZXJcblx0XHRcdFx0cmV0dXJuIHJldCA9PSBudWxsID8gXCJcIiA6IHJldDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0dmFyIHZhbDtcblxuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlICE9PSAxICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICggaXNGdW5jdGlvbiApIHtcblx0XHRcdFx0dmFsID0gdmFsdWUuY2FsbCggdGhpcywgaSwgalF1ZXJ5KCB0aGlzICkudmFsKCkgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhbCA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUcmVhdCBudWxsL3VuZGVmaW5lZCBhcyBcIlwiOyBjb252ZXJ0IG51bWJlcnMgdG8gc3RyaW5nXG5cdFx0XHRpZiAoIHZhbCA9PSBudWxsICkge1xuXHRcdFx0XHR2YWwgPSBcIlwiO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICkge1xuXHRcdFx0XHR2YWwgKz0gXCJcIjtcblxuXHRcdFx0fSBlbHNlIGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbCApICkge1xuXHRcdFx0XHR2YWwgPSBqUXVlcnkubWFwKCB2YWwsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSArIFwiXCI7XG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblxuXHRcdFx0aG9va3MgPSBqUXVlcnkudmFsSG9va3NbIHRoaXMudHlwZSBdIHx8IGpRdWVyeS52YWxIb29rc1sgdGhpcy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpIF07XG5cblx0XHRcdC8vIElmIHNldCByZXR1cm5zIHVuZGVmaW5lZCwgZmFsbCBiYWNrIHRvIG5vcm1hbCBzZXR0aW5nXG5cdFx0XHRpZiAoICFob29rcyB8fCAhKCBcInNldFwiIGluIGhvb2tzICkgfHwgaG9va3Muc2V0KCB0aGlzLCB2YWwsIFwidmFsdWVcIiApID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWw7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0dmFsSG9va3M6IHtcblx0XHRvcHRpb246IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdFx0dmFyIHZhbCA9IGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIFwidmFsdWVcIiApO1xuXHRcdFx0XHRyZXR1cm4gdmFsICE9IG51bGwgP1xuXHRcdFx0XHRcdHZhbCA6XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTEwIC0gMTEgb25seVxuXHRcdFx0XHRcdC8vIG9wdGlvbi50ZXh0IHRocm93cyBleGNlcHRpb25zICgjMTQ2ODYsICMxNDg1OClcblx0XHRcdFx0XHQvLyBTdHJpcCBhbmQgY29sbGFwc2Ugd2hpdGVzcGFjZVxuXHRcdFx0XHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvI3N0cmlwLWFuZC1jb2xsYXBzZS13aGl0ZXNwYWNlXG5cdFx0XHRcdFx0c3RyaXBBbmRDb2xsYXBzZSggalF1ZXJ5LnRleHQoIGVsZW0gKSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0c2VsZWN0OiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgdmFsdWUsIG9wdGlvbiwgaSxcblx0XHRcdFx0XHRvcHRpb25zID0gZWxlbS5vcHRpb25zLFxuXHRcdFx0XHRcdGluZGV4ID0gZWxlbS5zZWxlY3RlZEluZGV4LFxuXHRcdFx0XHRcdG9uZSA9IGVsZW0udHlwZSA9PT0gXCJzZWxlY3Qtb25lXCIsXG5cdFx0XHRcdFx0dmFsdWVzID0gb25lID8gbnVsbCA6IFtdLFxuXHRcdFx0XHRcdG1heCA9IG9uZSA/IGluZGV4ICsgMSA6IG9wdGlvbnMubGVuZ3RoO1xuXG5cdFx0XHRcdGlmICggaW5kZXggPCAwICkge1xuXHRcdFx0XHRcdGkgPSBtYXg7XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpID0gb25lID8gaW5kZXggOiAwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGFsbCB0aGUgc2VsZWN0ZWQgb3B0aW9uc1xuXHRcdFx0XHRmb3IgKCA7IGkgPCBtYXg7IGkrKyApIHtcblx0XHRcdFx0XHRvcHRpb24gPSBvcHRpb25zWyBpIF07XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuXHRcdFx0XHRcdC8vIElFOC05IGRvZXNuJ3QgdXBkYXRlIHNlbGVjdGVkIGFmdGVyIGZvcm0gcmVzZXQgKCMyNTUxKVxuXHRcdFx0XHRcdGlmICggKCBvcHRpb24uc2VsZWN0ZWQgfHwgaSA9PT0gaW5kZXggKSAmJlxuXG5cdFx0XHRcdFx0XHRcdC8vIERvbid0IHJldHVybiBvcHRpb25zIHRoYXQgYXJlIGRpc2FibGVkIG9yIGluIGEgZGlzYWJsZWQgb3B0Z3JvdXBcblx0XHRcdFx0XHRcdFx0IW9wdGlvbi5kaXNhYmxlZCAmJlxuXHRcdFx0XHRcdFx0XHQoICFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCB8fFxuXHRcdFx0XHRcdFx0XHRcdCFqUXVlcnkubm9kZU5hbWUoIG9wdGlvbi5wYXJlbnROb2RlLCBcIm9wdGdyb3VwXCIgKSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBHZXQgdGhlIHNwZWNpZmljIHZhbHVlIGZvciB0aGUgb3B0aW9uXG5cdFx0XHRcdFx0XHR2YWx1ZSA9IGpRdWVyeSggb3B0aW9uICkudmFsKCk7XG5cblx0XHRcdFx0XHRcdC8vIFdlIGRvbid0IG5lZWQgYW4gYXJyYXkgZm9yIG9uZSBzZWxlY3RzXG5cdFx0XHRcdFx0XHRpZiAoIG9uZSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBNdWx0aS1TZWxlY3RzIHJldHVybiBhbiBhcnJheVxuXHRcdFx0XHRcdFx0dmFsdWVzLnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHZhbHVlcztcblx0XHRcdH0sXG5cblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHR2YXIgb3B0aW9uU2V0LCBvcHRpb24sXG5cdFx0XHRcdFx0b3B0aW9ucyA9IGVsZW0ub3B0aW9ucyxcblx0XHRcdFx0XHR2YWx1ZXMgPSBqUXVlcnkubWFrZUFycmF5KCB2YWx1ZSApLFxuXHRcdFx0XHRcdGkgPSBvcHRpb25zLmxlbmd0aDtcblxuXHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRvcHRpb24gPSBvcHRpb25zWyBpIF07XG5cblx0XHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuXG5cdFx0XHRcdFx0aWYgKCBvcHRpb24uc2VsZWN0ZWQgPVxuXHRcdFx0XHRcdFx0alF1ZXJ5LmluQXJyYXkoIGpRdWVyeS52YWxIb29rcy5vcHRpb24uZ2V0KCBvcHRpb24gKSwgdmFsdWVzICkgPiAtMVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0b3B0aW9uU2V0ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbmQtYXNzaWduICovXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBGb3JjZSBicm93c2VycyB0byBiZWhhdmUgY29uc2lzdGVudGx5IHdoZW4gbm9uLW1hdGNoaW5nIHZhbHVlIGlzIHNldFxuXHRcdFx0XHRpZiAoICFvcHRpb25TZXQgKSB7XG5cdFx0XHRcdFx0ZWxlbS5zZWxlY3RlZEluZGV4ID0gLTE7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZhbHVlcztcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gKTtcblxuLy8gUmFkaW9zIGFuZCBjaGVja2JveGVzIGdldHRlci9zZXR0ZXJcbmpRdWVyeS5lYWNoKCBbIFwicmFkaW9cIiwgXCJjaGVja2JveFwiIF0sIGZ1bmN0aW9uKCkge1xuXHRqUXVlcnkudmFsSG9va3NbIHRoaXMgXSA9IHtcblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG5cdFx0XHRcdHJldHVybiAoIGVsZW0uY2hlY2tlZCA9IGpRdWVyeS5pbkFycmF5KCBqUXVlcnkoIGVsZW0gKS52YWwoKSwgdmFsdWUgKSA+IC0xICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRpZiAoICFzdXBwb3J0LmNoZWNrT24gKSB7XG5cdFx0alF1ZXJ5LnZhbEhvb2tzWyB0aGlzIF0uZ2V0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiApID09PSBudWxsID8gXCJvblwiIDogZWxlbS52YWx1ZTtcblx0XHR9O1xuXHR9XG59ICk7XG5cblxuXG5cbi8vIFJldHVybiBqUXVlcnkgZm9yIGF0dHJpYnV0ZXMtb25seSBpbmNsdXNpb25cblxuXG52YXIgcmZvY3VzTW9ycGggPSAvXig/OmZvY3VzaW5mb2N1c3xmb2N1c291dGJsdXIpJC87XG5cbmpRdWVyeS5leHRlbmQoIGpRdWVyeS5ldmVudCwge1xuXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKCBldmVudCwgZGF0YSwgZWxlbSwgb25seUhhbmRsZXJzICkge1xuXG5cdFx0dmFyIGksIGN1ciwgdG1wLCBidWJibGVUeXBlLCBvbnR5cGUsIGhhbmRsZSwgc3BlY2lhbCxcblx0XHRcdGV2ZW50UGF0aCA9IFsgZWxlbSB8fCBkb2N1bWVudCBdLFxuXHRcdFx0dHlwZSA9IGhhc093bi5jYWxsKCBldmVudCwgXCJ0eXBlXCIgKSA/IGV2ZW50LnR5cGUgOiBldmVudCxcblx0XHRcdG5hbWVzcGFjZXMgPSBoYXNPd24uY2FsbCggZXZlbnQsIFwibmFtZXNwYWNlXCIgKSA/IGV2ZW50Lm5hbWVzcGFjZS5zcGxpdCggXCIuXCIgKSA6IFtdO1xuXG5cdFx0Y3VyID0gdG1wID0gZWxlbSA9IGVsZW0gfHwgZG9jdW1lbnQ7XG5cblx0XHQvLyBEb24ndCBkbyBldmVudHMgb24gdGV4dCBhbmQgY29tbWVudCBub2Rlc1xuXHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMyB8fCBlbGVtLm5vZGVUeXBlID09PSA4ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIGZvY3VzL2JsdXIgbW9ycGhzIHRvIGZvY3VzaW4vb3V0OyBlbnN1cmUgd2UncmUgbm90IGZpcmluZyB0aGVtIHJpZ2h0IG5vd1xuXHRcdGlmICggcmZvY3VzTW9ycGgudGVzdCggdHlwZSArIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGUuaW5kZXhPZiggXCIuXCIgKSA+IC0xICkge1xuXG5cdFx0XHQvLyBOYW1lc3BhY2VkIHRyaWdnZXI7IGNyZWF0ZSBhIHJlZ2V4cCB0byBtYXRjaCBldmVudCB0eXBlIGluIGhhbmRsZSgpXG5cdFx0XHRuYW1lc3BhY2VzID0gdHlwZS5zcGxpdCggXCIuXCIgKTtcblx0XHRcdHR5cGUgPSBuYW1lc3BhY2VzLnNoaWZ0KCk7XG5cdFx0XHRuYW1lc3BhY2VzLnNvcnQoKTtcblx0XHR9XG5cdFx0b250eXBlID0gdHlwZS5pbmRleE9mKCBcIjpcIiApIDwgMCAmJiBcIm9uXCIgKyB0eXBlO1xuXG5cdFx0Ly8gQ2FsbGVyIGNhbiBwYXNzIGluIGEgalF1ZXJ5LkV2ZW50IG9iamVjdCwgT2JqZWN0LCBvciBqdXN0IGFuIGV2ZW50IHR5cGUgc3RyaW5nXG5cdFx0ZXZlbnQgPSBldmVudFsgalF1ZXJ5LmV4cGFuZG8gXSA/XG5cdFx0XHRldmVudCA6XG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCB0eXBlLCB0eXBlb2YgZXZlbnQgPT09IFwib2JqZWN0XCIgJiYgZXZlbnQgKTtcblxuXHRcdC8vIFRyaWdnZXIgYml0bWFzazogJiAxIGZvciBuYXRpdmUgaGFuZGxlcnM7ICYgMiBmb3IgalF1ZXJ5IChhbHdheXMgdHJ1ZSlcblx0XHRldmVudC5pc1RyaWdnZXIgPSBvbmx5SGFuZGxlcnMgPyAyIDogMztcblx0XHRldmVudC5uYW1lc3BhY2UgPSBuYW1lc3BhY2VzLmpvaW4oIFwiLlwiICk7XG5cdFx0ZXZlbnQucm5hbWVzcGFjZSA9IGV2ZW50Lm5hbWVzcGFjZSA/XG5cdFx0XHRuZXcgUmVnRXhwKCBcIihefFxcXFwuKVwiICsgbmFtZXNwYWNlcy5qb2luKCBcIlxcXFwuKD86LipcXFxcLnwpXCIgKSArIFwiKFxcXFwufCQpXCIgKSA6XG5cdFx0XHRudWxsO1xuXG5cdFx0Ly8gQ2xlYW4gdXAgdGhlIGV2ZW50IGluIGNhc2UgaXQgaXMgYmVpbmcgcmV1c2VkXG5cdFx0ZXZlbnQucmVzdWx0ID0gdW5kZWZpbmVkO1xuXHRcdGlmICggIWV2ZW50LnRhcmdldCApIHtcblx0XHRcdGV2ZW50LnRhcmdldCA9IGVsZW07XG5cdFx0fVxuXG5cdFx0Ly8gQ2xvbmUgYW55IGluY29taW5nIGRhdGEgYW5kIHByZXBlbmQgdGhlIGV2ZW50LCBjcmVhdGluZyB0aGUgaGFuZGxlciBhcmcgbGlzdFxuXHRcdGRhdGEgPSBkYXRhID09IG51bGwgP1xuXHRcdFx0WyBldmVudCBdIDpcblx0XHRcdGpRdWVyeS5tYWtlQXJyYXkoIGRhdGEsIFsgZXZlbnQgXSApO1xuXG5cdFx0Ly8gQWxsb3cgc3BlY2lhbCBldmVudHMgdG8gZHJhdyBvdXRzaWRlIHRoZSBsaW5lc1xuXHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXHRcdGlmICggIW9ubHlIYW5kbGVycyAmJiBzcGVjaWFsLnRyaWdnZXIgJiYgc3BlY2lhbC50cmlnZ2VyLmFwcGx5KCBlbGVtLCBkYXRhICkgPT09IGZhbHNlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIERldGVybWluZSBldmVudCBwcm9wYWdhdGlvbiBwYXRoIGluIGFkdmFuY2UsIHBlciBXM0MgZXZlbnRzIHNwZWMgKCM5OTUxKVxuXHRcdC8vIEJ1YmJsZSB1cCB0byBkb2N1bWVudCwgdGhlbiB0byB3aW5kb3c7IHdhdGNoIGZvciBhIGdsb2JhbCBvd25lckRvY3VtZW50IHZhciAoIzk3MjQpXG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmICFzcGVjaWFsLm5vQnViYmxlICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0YnViYmxlVHlwZSA9IHNwZWNpYWwuZGVsZWdhdGVUeXBlIHx8IHR5cGU7XG5cdFx0XHRpZiAoICFyZm9jdXNNb3JwaC50ZXN0KCBidWJibGVUeXBlICsgdHlwZSApICkge1xuXHRcdFx0XHRjdXIgPSBjdXIucGFyZW50Tm9kZTtcblx0XHRcdH1cblx0XHRcdGZvciAoIDsgY3VyOyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0ZXZlbnRQYXRoLnB1c2goIGN1ciApO1xuXHRcdFx0XHR0bXAgPSBjdXI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE9ubHkgYWRkIHdpbmRvdyBpZiB3ZSBnb3QgdG8gZG9jdW1lbnQgKGUuZy4sIG5vdCBwbGFpbiBvYmogb3IgZGV0YWNoZWQgRE9NKVxuXHRcdFx0aWYgKCB0bXAgPT09ICggZWxlbS5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50ICkgKSB7XG5cdFx0XHRcdGV2ZW50UGF0aC5wdXNoKCB0bXAuZGVmYXVsdFZpZXcgfHwgdG1wLnBhcmVudFdpbmRvdyB8fCB3aW5kb3cgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBGaXJlIGhhbmRsZXJzIG9uIHRoZSBldmVudCBwYXRoXG5cdFx0aSA9IDA7XG5cdFx0d2hpbGUgKCAoIGN1ciA9IGV2ZW50UGF0aFsgaSsrIF0gKSAmJiAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblxuXHRcdFx0ZXZlbnQudHlwZSA9IGkgPiAxID9cblx0XHRcdFx0YnViYmxlVHlwZSA6XG5cdFx0XHRcdHNwZWNpYWwuYmluZFR5cGUgfHwgdHlwZTtcblxuXHRcdFx0Ly8galF1ZXJ5IGhhbmRsZXJcblx0XHRcdGhhbmRsZSA9ICggZGF0YVByaXYuZ2V0KCBjdXIsIFwiZXZlbnRzXCIgKSB8fCB7fSApWyBldmVudC50eXBlIF0gJiZcblx0XHRcdFx0ZGF0YVByaXYuZ2V0KCBjdXIsIFwiaGFuZGxlXCIgKTtcblx0XHRcdGlmICggaGFuZGxlICkge1xuXHRcdFx0XHRoYW5kbGUuYXBwbHkoIGN1ciwgZGF0YSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBOYXRpdmUgaGFuZGxlclxuXHRcdFx0aGFuZGxlID0gb250eXBlICYmIGN1clsgb250eXBlIF07XG5cdFx0XHRpZiAoIGhhbmRsZSAmJiBoYW5kbGUuYXBwbHkgJiYgYWNjZXB0RGF0YSggY3VyICkgKSB7XG5cdFx0XHRcdGV2ZW50LnJlc3VsdCA9IGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHRcdGlmICggZXZlbnQucmVzdWx0ID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGV2ZW50LnR5cGUgPSB0eXBlO1xuXG5cdFx0Ly8gSWYgbm9ib2R5IHByZXZlbnRlZCB0aGUgZGVmYXVsdCBhY3Rpb24sIGRvIGl0IG5vd1xuXHRcdGlmICggIW9ubHlIYW5kbGVycyAmJiAhZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgKSB7XG5cblx0XHRcdGlmICggKCAhc3BlY2lhbC5fZGVmYXVsdCB8fFxuXHRcdFx0XHRzcGVjaWFsLl9kZWZhdWx0LmFwcGx5KCBldmVudFBhdGgucG9wKCksIGRhdGEgKSA9PT0gZmFsc2UgKSAmJlxuXHRcdFx0XHRhY2NlcHREYXRhKCBlbGVtICkgKSB7XG5cblx0XHRcdFx0Ly8gQ2FsbCBhIG5hdGl2ZSBET00gbWV0aG9kIG9uIHRoZSB0YXJnZXQgd2l0aCB0aGUgc2FtZSBuYW1lIGFzIHRoZSBldmVudC5cblx0XHRcdFx0Ly8gRG9uJ3QgZG8gZGVmYXVsdCBhY3Rpb25zIG9uIHdpbmRvdywgdGhhdCdzIHdoZXJlIGdsb2JhbCB2YXJpYWJsZXMgYmUgKCM2MTcwKVxuXHRcdFx0XHRpZiAoIG9udHlwZSAmJiBqUXVlcnkuaXNGdW5jdGlvbiggZWxlbVsgdHlwZSBdICkgJiYgIWpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuXG5cdFx0XHRcdFx0Ly8gRG9uJ3QgcmUtdHJpZ2dlciBhbiBvbkZPTyBldmVudCB3aGVuIHdlIGNhbGwgaXRzIEZPTygpIG1ldGhvZFxuXHRcdFx0XHRcdHRtcCA9IGVsZW1bIG9udHlwZSBdO1xuXG5cdFx0XHRcdFx0aWYgKCB0bXAgKSB7XG5cdFx0XHRcdFx0XHRlbGVtWyBvbnR5cGUgXSA9IG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gUHJldmVudCByZS10cmlnZ2VyaW5nIG9mIHRoZSBzYW1lIGV2ZW50LCBzaW5jZSB3ZSBhbHJlYWR5IGJ1YmJsZWQgaXQgYWJvdmVcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlcmVkID0gdHlwZTtcblx0XHRcdFx0XHRlbGVtWyB0eXBlIF0oKTtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlcmVkID0gdW5kZWZpbmVkO1xuXG5cdFx0XHRcdFx0aWYgKCB0bXAgKSB7XG5cdFx0XHRcdFx0XHRlbGVtWyBvbnR5cGUgXSA9IHRtcDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnQucmVzdWx0O1xuXHR9LFxuXG5cdC8vIFBpZ2d5YmFjayBvbiBhIGRvbm9yIGV2ZW50IHRvIHNpbXVsYXRlIGEgZGlmZmVyZW50IG9uZVxuXHQvLyBVc2VkIG9ubHkgZm9yIGBmb2N1cyhpbiB8IG91dClgIGV2ZW50c1xuXHRzaW11bGF0ZTogZnVuY3Rpb24oIHR5cGUsIGVsZW0sIGV2ZW50ICkge1xuXHRcdHZhciBlID0galF1ZXJ5LmV4dGVuZChcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoKSxcblx0XHRcdGV2ZW50LFxuXHRcdFx0e1xuXHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRpc1NpbXVsYXRlZDogdHJ1ZVxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggZSwgbnVsbCwgZWxlbSApO1xuXHR9XG5cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIHR5cGUsIGRhdGEsIHRoaXMgKTtcblx0XHR9ICk7XG5cdH0sXG5cdHRyaWdnZXJIYW5kbGVyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgZWxlbSA9IHRoaXNbIDAgXTtcblx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LmV2ZW50LnRyaWdnZXIoIHR5cGUsIGRhdGEsIGVsZW0sIHRydWUgKTtcblx0XHR9XG5cdH1cbn0gKTtcblxuXG5qUXVlcnkuZWFjaCggKCBcImJsdXIgZm9jdXMgZm9jdXNpbiBmb2N1c291dCByZXNpemUgc2Nyb2xsIGNsaWNrIGRibGNsaWNrIFwiICtcblx0XCJtb3VzZWRvd24gbW91c2V1cCBtb3VzZW1vdmUgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBcIiArXG5cdFwiY2hhbmdlIHNlbGVjdCBzdWJtaXQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBjb250ZXh0bWVudVwiICkuc3BsaXQoIFwiIFwiICksXG5cdGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXG5cdC8vIEhhbmRsZSBldmVudCBiaW5kaW5nXG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMCA/XG5cdFx0XHR0aGlzLm9uKCBuYW1lLCBudWxsLCBkYXRhLCBmbiApIDpcblx0XHRcdHRoaXMudHJpZ2dlciggbmFtZSApO1xuXHR9O1xufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGhvdmVyOiBmdW5jdGlvbiggZm5PdmVyLCBmbk91dCApIHtcblx0XHRyZXR1cm4gdGhpcy5tb3VzZWVudGVyKCBmbk92ZXIgKS5tb3VzZWxlYXZlKCBmbk91dCB8fCBmbk92ZXIgKTtcblx0fVxufSApO1xuXG5cblxuXG5zdXBwb3J0LmZvY3VzaW4gPSBcIm9uZm9jdXNpblwiIGluIHdpbmRvdztcblxuXG4vLyBTdXBwb3J0OiBGaXJlZm94IDw9NDRcbi8vIEZpcmVmb3ggZG9lc24ndCBoYXZlIGZvY3VzKGluIHwgb3V0KSBldmVudHNcbi8vIFJlbGF0ZWQgdGlja2V0IC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njg3Nzg3XG4vL1xuLy8gU3VwcG9ydDogQ2hyb21lIDw9NDggLSA0OSwgU2FmYXJpIDw9OS4wIC0gOS4xXG4vLyBmb2N1cyhpbiB8IG91dCkgZXZlbnRzIGZpcmUgYWZ0ZXIgZm9jdXMgJiBibHVyIGV2ZW50cyxcbi8vIHdoaWNoIGlzIHNwZWMgdmlvbGF0aW9uIC0gaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLyNldmVudHMtZm9jdXNldmVudC1ldmVudC1vcmRlclxuLy8gUmVsYXRlZCB0aWNrZXQgLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NDk4NTdcbmlmICggIXN1cHBvcnQuZm9jdXNpbiApIHtcblx0alF1ZXJ5LmVhY2goIHsgZm9jdXM6IFwiZm9jdXNpblwiLCBibHVyOiBcImZvY3Vzb3V0XCIgfSwgZnVuY3Rpb24oIG9yaWcsIGZpeCApIHtcblxuXHRcdC8vIEF0dGFjaCBhIHNpbmdsZSBjYXB0dXJpbmcgaGFuZGxlciBvbiB0aGUgZG9jdW1lbnQgd2hpbGUgc29tZW9uZSB3YW50cyBmb2N1c2luL2ZvY3Vzb3V0XG5cdFx0dmFyIGhhbmRsZXIgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQuc2ltdWxhdGUoIGZpeCwgZXZlbnQudGFyZ2V0LCBqUXVlcnkuZXZlbnQuZml4KCBldmVudCApICk7XG5cdFx0fTtcblxuXHRcdGpRdWVyeS5ldmVudC5zcGVjaWFsWyBmaXggXSA9IHtcblx0XHRcdHNldHVwOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGRvYyA9IHRoaXMub3duZXJEb2N1bWVudCB8fCB0aGlzLFxuXHRcdFx0XHRcdGF0dGFjaGVzID0gZGF0YVByaXYuYWNjZXNzKCBkb2MsIGZpeCApO1xuXG5cdFx0XHRcdGlmICggIWF0dGFjaGVzICkge1xuXHRcdFx0XHRcdGRvYy5hZGRFdmVudExpc3RlbmVyKCBvcmlnLCBoYW5kbGVyLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGF0YVByaXYuYWNjZXNzKCBkb2MsIGZpeCwgKCBhdHRhY2hlcyB8fCAwICkgKyAxICk7XG5cdFx0XHR9LFxuXHRcdFx0dGVhcmRvd246IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZG9jID0gdGhpcy5vd25lckRvY3VtZW50IHx8IHRoaXMsXG5cdFx0XHRcdFx0YXR0YWNoZXMgPSBkYXRhUHJpdi5hY2Nlc3MoIGRvYywgZml4ICkgLSAxO1xuXG5cdFx0XHRcdGlmICggIWF0dGFjaGVzICkge1xuXHRcdFx0XHRcdGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCBvcmlnLCBoYW5kbGVyLCB0cnVlICk7XG5cdFx0XHRcdFx0ZGF0YVByaXYucmVtb3ZlKCBkb2MsIGZpeCApO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZGF0YVByaXYuYWNjZXNzKCBkb2MsIGZpeCwgYXR0YWNoZXMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH0gKTtcbn1cbnZhciBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcblxudmFyIG5vbmNlID0galF1ZXJ5Lm5vdygpO1xuXG52YXIgcnF1ZXJ5ID0gKCAvXFw/LyApO1xuXG5cblxuLy8gQ3Jvc3MtYnJvd3NlciB4bWwgcGFyc2luZ1xualF1ZXJ5LnBhcnNlWE1MID0gZnVuY3Rpb24oIGRhdGEgKSB7XG5cdHZhciB4bWw7XG5cdGlmICggIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvLyBTdXBwb3J0OiBJRSA5IC0gMTEgb25seVxuXHQvLyBJRSB0aHJvd3Mgb24gcGFyc2VGcm9tU3RyaW5nIHdpdGggaW52YWxpZCBpbnB1dC5cblx0dHJ5IHtcblx0XHR4bWwgPSAoIG5ldyB3aW5kb3cuRE9NUGFyc2VyKCkgKS5wYXJzZUZyb21TdHJpbmcoIGRhdGEsIFwidGV4dC94bWxcIiApO1xuXHR9IGNhdGNoICggZSApIHtcblx0XHR4bWwgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRpZiAoICF4bWwgfHwgeG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcInBhcnNlcmVycm9yXCIgKS5sZW5ndGggKSB7XG5cdFx0alF1ZXJ5LmVycm9yKCBcIkludmFsaWQgWE1MOiBcIiArIGRhdGEgKTtcblx0fVxuXHRyZXR1cm4geG1sO1xufTtcblxuXG52YXJcblx0cmJyYWNrZXQgPSAvXFxbXFxdJC8sXG5cdHJDUkxGID0gL1xccj9cXG4vZyxcblx0cnN1Ym1pdHRlclR5cGVzID0gL14oPzpzdWJtaXR8YnV0dG9ufGltYWdlfHJlc2V0fGZpbGUpJC9pLFxuXHRyc3VibWl0dGFibGUgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxrZXlnZW4pL2k7XG5cbmZ1bmN0aW9uIGJ1aWxkUGFyYW1zKCBwcmVmaXgsIG9iaiwgdHJhZGl0aW9uYWwsIGFkZCApIHtcblx0dmFyIG5hbWU7XG5cblx0aWYgKCBqUXVlcnkuaXNBcnJheSggb2JqICkgKSB7XG5cblx0XHQvLyBTZXJpYWxpemUgYXJyYXkgaXRlbS5cblx0XHRqUXVlcnkuZWFjaCggb2JqLCBmdW5jdGlvbiggaSwgdiApIHtcblx0XHRcdGlmICggdHJhZGl0aW9uYWwgfHwgcmJyYWNrZXQudGVzdCggcHJlZml4ICkgKSB7XG5cblx0XHRcdFx0Ly8gVHJlYXQgZWFjaCBhcnJheSBpdGVtIGFzIGEgc2NhbGFyLlxuXHRcdFx0XHRhZGQoIHByZWZpeCwgdiApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIEl0ZW0gaXMgbm9uLXNjYWxhciAoYXJyYXkgb3Igb2JqZWN0KSwgZW5jb2RlIGl0cyBudW1lcmljIGluZGV4LlxuXHRcdFx0XHRidWlsZFBhcmFtcyhcblx0XHRcdFx0XHRwcmVmaXggKyBcIltcIiArICggdHlwZW9mIHYgPT09IFwib2JqZWN0XCIgJiYgdiAhPSBudWxsID8gaSA6IFwiXCIgKSArIFwiXVwiLFxuXHRcdFx0XHRcdHYsXG5cdFx0XHRcdFx0dHJhZGl0aW9uYWwsXG5cdFx0XHRcdFx0YWRkXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdH0gZWxzZSBpZiAoICF0cmFkaXRpb25hbCAmJiBqUXVlcnkudHlwZSggb2JqICkgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHQvLyBTZXJpYWxpemUgb2JqZWN0IGl0ZW0uXG5cdFx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cdFx0XHRidWlsZFBhcmFtcyggcHJlZml4ICsgXCJbXCIgKyBuYW1lICsgXCJdXCIsIG9ialsgbmFtZSBdLCB0cmFkaXRpb25hbCwgYWRkICk7XG5cdFx0fVxuXG5cdH0gZWxzZSB7XG5cblx0XHQvLyBTZXJpYWxpemUgc2NhbGFyIGl0ZW0uXG5cdFx0YWRkKCBwcmVmaXgsIG9iaiApO1xuXHR9XG59XG5cbi8vIFNlcmlhbGl6ZSBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzIG9yIGEgc2V0IG9mXG4vLyBrZXkvdmFsdWVzIGludG8gYSBxdWVyeSBzdHJpbmdcbmpRdWVyeS5wYXJhbSA9IGZ1bmN0aW9uKCBhLCB0cmFkaXRpb25hbCApIHtcblx0dmFyIHByZWZpeCxcblx0XHRzID0gW10sXG5cdFx0YWRkID0gZnVuY3Rpb24oIGtleSwgdmFsdWVPckZ1bmN0aW9uICkge1xuXG5cdFx0XHQvLyBJZiB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCBpbnZva2UgaXQgYW5kIHVzZSBpdHMgcmV0dXJuIHZhbHVlXG5cdFx0XHR2YXIgdmFsdWUgPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWVPckZ1bmN0aW9uICkgP1xuXHRcdFx0XHR2YWx1ZU9yRnVuY3Rpb24oKSA6XG5cdFx0XHRcdHZhbHVlT3JGdW5jdGlvbjtcblxuXHRcdFx0c1sgcy5sZW5ndGggXSA9IGVuY29kZVVSSUNvbXBvbmVudCgga2V5ICkgKyBcIj1cIiArXG5cdFx0XHRcdGVuY29kZVVSSUNvbXBvbmVudCggdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSApO1xuXHRcdH07XG5cblx0Ly8gSWYgYW4gYXJyYXkgd2FzIHBhc3NlZCBpbiwgYXNzdW1lIHRoYXQgaXQgaXMgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cy5cblx0aWYgKCBqUXVlcnkuaXNBcnJheSggYSApIHx8ICggYS5qcXVlcnkgJiYgIWpRdWVyeS5pc1BsYWluT2JqZWN0KCBhICkgKSApIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSB0aGUgZm9ybSBlbGVtZW50c1xuXHRcdGpRdWVyeS5lYWNoKCBhLCBmdW5jdGlvbigpIHtcblx0XHRcdGFkZCggdGhpcy5uYW1lLCB0aGlzLnZhbHVlICk7XG5cdFx0fSApO1xuXG5cdH0gZWxzZSB7XG5cblx0XHQvLyBJZiB0cmFkaXRpb25hbCwgZW5jb2RlIHRoZSBcIm9sZFwiIHdheSAodGhlIHdheSAxLjMuMiBvciBvbGRlclxuXHRcdC8vIGRpZCBpdCksIG90aGVyd2lzZSBlbmNvZGUgcGFyYW1zIHJlY3Vyc2l2ZWx5LlxuXHRcdGZvciAoIHByZWZpeCBpbiBhICkge1xuXHRcdFx0YnVpbGRQYXJhbXMoIHByZWZpeCwgYVsgcHJlZml4IF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIHJlc3VsdGluZyBzZXJpYWxpemF0aW9uXG5cdHJldHVybiBzLmpvaW4oIFwiJlwiICk7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHNlcmlhbGl6ZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5wYXJhbSggdGhpcy5zZXJpYWxpemVBcnJheSgpICk7XG5cdH0sXG5cdHNlcmlhbGl6ZUFycmF5OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBDYW4gYWRkIHByb3BIb29rIGZvciBcImVsZW1lbnRzXCIgdG8gZmlsdGVyIG9yIGFkZCBmb3JtIGVsZW1lbnRzXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBqUXVlcnkucHJvcCggdGhpcywgXCJlbGVtZW50c1wiICk7XG5cdFx0XHRyZXR1cm4gZWxlbWVudHMgPyBqUXVlcnkubWFrZUFycmF5KCBlbGVtZW50cyApIDogdGhpcztcblx0XHR9IClcblx0XHQuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0eXBlID0gdGhpcy50eXBlO1xuXG5cdFx0XHQvLyBVc2UgLmlzKCBcIjpkaXNhYmxlZFwiICkgc28gdGhhdCBmaWVsZHNldFtkaXNhYmxlZF0gd29ya3Ncblx0XHRcdHJldHVybiB0aGlzLm5hbWUgJiYgIWpRdWVyeSggdGhpcyApLmlzKCBcIjpkaXNhYmxlZFwiICkgJiZcblx0XHRcdFx0cnN1Ym1pdHRhYmxlLnRlc3QoIHRoaXMubm9kZU5hbWUgKSAmJiAhcnN1Ym1pdHRlclR5cGVzLnRlc3QoIHR5cGUgKSAmJlxuXHRcdFx0XHQoIHRoaXMuY2hlY2tlZCB8fCAhcmNoZWNrYWJsZVR5cGUudGVzdCggdHlwZSApICk7XG5cdFx0fSApXG5cdFx0Lm1hcCggZnVuY3Rpb24oIGksIGVsZW0gKSB7XG5cdFx0XHR2YXIgdmFsID0galF1ZXJ5KCB0aGlzICkudmFsKCk7XG5cblx0XHRcdGlmICggdmFsID09IG51bGwgKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGpRdWVyeS5pc0FycmF5KCB2YWwgKSApIHtcblx0XHRcdFx0cmV0dXJuIGpRdWVyeS5tYXAoIHZhbCwgZnVuY3Rpb24oIHZhbCApIHtcblx0XHRcdFx0XHRyZXR1cm4geyBuYW1lOiBlbGVtLm5hbWUsIHZhbHVlOiB2YWwucmVwbGFjZSggckNSTEYsIFwiXFxyXFxuXCIgKSB9O1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG5cdFx0fSApLmdldCgpO1xuXHR9XG59ICk7XG5cblxudmFyXG5cdHIyMCA9IC8lMjAvZyxcblx0cmhhc2ggPSAvIy4qJC8sXG5cdHJhbnRpQ2FjaGUgPSAvKFs/Jl0pXz1bXiZdKi8sXG5cdHJoZWFkZXJzID0gL14oLio/KTpbIFxcdF0qKFteXFxyXFxuXSopJC9tZyxcblxuXHQvLyAjNzY1MywgIzgxMjUsICM4MTUyOiBsb2NhbCBwcm90b2NvbCBkZXRlY3Rpb25cblx0cmxvY2FsUHJvdG9jb2wgPSAvXig/OmFib3V0fGFwcHxhcHAtc3RvcmFnZXwuKy1leHRlbnNpb258ZmlsZXxyZXN8d2lkZ2V0KTokLyxcblx0cm5vQ29udGVudCA9IC9eKD86R0VUfEhFQUQpJC8sXG5cdHJwcm90b2NvbCA9IC9eXFwvXFwvLyxcblxuXHQvKiBQcmVmaWx0ZXJzXG5cdCAqIDEpIFRoZXkgYXJlIHVzZWZ1bCB0byBpbnRyb2R1Y2UgY3VzdG9tIGRhdGFUeXBlcyAoc2VlIGFqYXgvanNvbnAuanMgZm9yIGFuIGV4YW1wbGUpXG5cdCAqIDIpIFRoZXNlIGFyZSBjYWxsZWQ6XG5cdCAqICAgIC0gQkVGT1JFIGFza2luZyBmb3IgYSB0cmFuc3BvcnRcblx0ICogICAgLSBBRlRFUiBwYXJhbSBzZXJpYWxpemF0aW9uIChzLmRhdGEgaXMgYSBzdHJpbmcgaWYgcy5wcm9jZXNzRGF0YSBpcyB0cnVlKVxuXHQgKiAzKSBrZXkgaXMgdGhlIGRhdGFUeXBlXG5cdCAqIDQpIHRoZSBjYXRjaGFsbCBzeW1ib2wgXCIqXCIgY2FuIGJlIHVzZWRcblx0ICogNSkgZXhlY3V0aW9uIHdpbGwgc3RhcnQgd2l0aCB0cmFuc3BvcnQgZGF0YVR5cGUgYW5kIFRIRU4gY29udGludWUgZG93biB0byBcIipcIiBpZiBuZWVkZWRcblx0ICovXG5cdHByZWZpbHRlcnMgPSB7fSxcblxuXHQvKiBUcmFuc3BvcnRzIGJpbmRpbmdzXG5cdCAqIDEpIGtleSBpcyB0aGUgZGF0YVR5cGVcblx0ICogMikgdGhlIGNhdGNoYWxsIHN5bWJvbCBcIipcIiBjYW4gYmUgdXNlZFxuXHQgKiAzKSBzZWxlY3Rpb24gd2lsbCBzdGFydCB3aXRoIHRyYW5zcG9ydCBkYXRhVHlwZSBhbmQgVEhFTiBnbyB0byBcIipcIiBpZiBuZWVkZWRcblx0ICovXG5cdHRyYW5zcG9ydHMgPSB7fSxcblxuXHQvLyBBdm9pZCBjb21tZW50LXByb2xvZyBjaGFyIHNlcXVlbmNlICgjMTAwOTgpOyBtdXN0IGFwcGVhc2UgbGludCBhbmQgZXZhZGUgY29tcHJlc3Npb25cblx0YWxsVHlwZXMgPSBcIiovXCIuY29uY2F0KCBcIipcIiApLFxuXG5cdC8vIEFuY2hvciB0YWcgZm9yIHBhcnNpbmcgdGhlIGRvY3VtZW50IG9yaWdpblxuXHRvcmlnaW5BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImFcIiApO1xuXHRvcmlnaW5BbmNob3IuaHJlZiA9IGxvY2F0aW9uLmhyZWY7XG5cbi8vIEJhc2UgXCJjb25zdHJ1Y3RvclwiIGZvciBqUXVlcnkuYWpheFByZWZpbHRlciBhbmQgalF1ZXJ5LmFqYXhUcmFuc3BvcnRcbmZ1bmN0aW9uIGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlICkge1xuXG5cdC8vIGRhdGFUeXBlRXhwcmVzc2lvbiBpcyBvcHRpb25hbCBhbmQgZGVmYXVsdHMgdG8gXCIqXCJcblx0cmV0dXJuIGZ1bmN0aW9uKCBkYXRhVHlwZUV4cHJlc3Npb24sIGZ1bmMgKSB7XG5cblx0XHRpZiAoIHR5cGVvZiBkYXRhVHlwZUV4cHJlc3Npb24gIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRmdW5jID0gZGF0YVR5cGVFeHByZXNzaW9uO1xuXHRcdFx0ZGF0YVR5cGVFeHByZXNzaW9uID0gXCIqXCI7XG5cdFx0fVxuXG5cdFx0dmFyIGRhdGFUeXBlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRkYXRhVHlwZXMgPSBkYXRhVHlwZUV4cHJlc3Npb24udG9Mb3dlckNhc2UoKS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggZnVuYyApICkge1xuXG5cdFx0XHQvLyBGb3IgZWFjaCBkYXRhVHlwZSBpbiB0aGUgZGF0YVR5cGVFeHByZXNzaW9uXG5cdFx0XHR3aGlsZSAoICggZGF0YVR5cGUgPSBkYXRhVHlwZXNbIGkrKyBdICkgKSB7XG5cblx0XHRcdFx0Ly8gUHJlcGVuZCBpZiByZXF1ZXN0ZWRcblx0XHRcdFx0aWYgKCBkYXRhVHlwZVsgMCBdID09PSBcIitcIiApIHtcblx0XHRcdFx0XHRkYXRhVHlwZSA9IGRhdGFUeXBlLnNsaWNlKCAxICkgfHwgXCIqXCI7XG5cdFx0XHRcdFx0KCBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gPSBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gfHwgW10gKS51bnNoaWZ0KCBmdW5jICk7XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIGFwcGVuZFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCggc3RydWN0dXJlWyBkYXRhVHlwZSBdID0gc3RydWN0dXJlWyBkYXRhVHlwZSBdIHx8IFtdICkucHVzaCggZnVuYyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuXG4vLyBCYXNlIGluc3BlY3Rpb24gZnVuY3Rpb24gZm9yIHByZWZpbHRlcnMgYW5kIHRyYW5zcG9ydHNcbmZ1bmN0aW9uIGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBzdHJ1Y3R1cmUsIG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywganFYSFIgKSB7XG5cblx0dmFyIGluc3BlY3RlZCA9IHt9LFxuXHRcdHNlZWtpbmdUcmFuc3BvcnQgPSAoIHN0cnVjdHVyZSA9PT0gdHJhbnNwb3J0cyApO1xuXG5cdGZ1bmN0aW9uIGluc3BlY3QoIGRhdGFUeXBlICkge1xuXHRcdHZhciBzZWxlY3RlZDtcblx0XHRpbnNwZWN0ZWRbIGRhdGFUeXBlIF0gPSB0cnVlO1xuXHRcdGpRdWVyeS5lYWNoKCBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0gfHwgW10sIGZ1bmN0aW9uKCBfLCBwcmVmaWx0ZXJPckZhY3RvcnkgKSB7XG5cdFx0XHR2YXIgZGF0YVR5cGVPclRyYW5zcG9ydCA9IHByZWZpbHRlck9yRmFjdG9yeSggb3B0aW9ucywgb3JpZ2luYWxPcHRpb25zLCBqcVhIUiApO1xuXHRcdFx0aWYgKCB0eXBlb2YgZGF0YVR5cGVPclRyYW5zcG9ydCA9PT0gXCJzdHJpbmdcIiAmJlxuXHRcdFx0XHQhc2Vla2luZ1RyYW5zcG9ydCAmJiAhaW5zcGVjdGVkWyBkYXRhVHlwZU9yVHJhbnNwb3J0IF0gKSB7XG5cblx0XHRcdFx0b3B0aW9ucy5kYXRhVHlwZXMudW5zaGlmdCggZGF0YVR5cGVPclRyYW5zcG9ydCApO1xuXHRcdFx0XHRpbnNwZWN0KCBkYXRhVHlwZU9yVHJhbnNwb3J0ICk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZSBpZiAoIHNlZWtpbmdUcmFuc3BvcnQgKSB7XG5cdFx0XHRcdHJldHVybiAhKCBzZWxlY3RlZCA9IGRhdGFUeXBlT3JUcmFuc3BvcnQgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdFx0cmV0dXJuIHNlbGVjdGVkO1xuXHR9XG5cblx0cmV0dXJuIGluc3BlY3QoIG9wdGlvbnMuZGF0YVR5cGVzWyAwIF0gKSB8fCAhaW5zcGVjdGVkWyBcIipcIiBdICYmIGluc3BlY3QoIFwiKlwiICk7XG59XG5cbi8vIEEgc3BlY2lhbCBleHRlbmQgZm9yIGFqYXggb3B0aW9uc1xuLy8gdGhhdCB0YWtlcyBcImZsYXRcIiBvcHRpb25zIChub3QgdG8gYmUgZGVlcCBleHRlbmRlZClcbi8vIEZpeGVzICM5ODg3XG5mdW5jdGlvbiBhamF4RXh0ZW5kKCB0YXJnZXQsIHNyYyApIHtcblx0dmFyIGtleSwgZGVlcCxcblx0XHRmbGF0T3B0aW9ucyA9IGpRdWVyeS5hamF4U2V0dGluZ3MuZmxhdE9wdGlvbnMgfHwge307XG5cblx0Zm9yICgga2V5IGluIHNyYyApIHtcblx0XHRpZiAoIHNyY1sga2V5IF0gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdCggZmxhdE9wdGlvbnNbIGtleSBdID8gdGFyZ2V0IDogKCBkZWVwIHx8ICggZGVlcCA9IHt9ICkgKSApWyBrZXkgXSA9IHNyY1sga2V5IF07XG5cdFx0fVxuXHR9XG5cdGlmICggZGVlcCApIHtcblx0XHRqUXVlcnkuZXh0ZW5kKCB0cnVlLCB0YXJnZXQsIGRlZXAgKTtcblx0fVxuXG5cdHJldHVybiB0YXJnZXQ7XG59XG5cbi8qIEhhbmRsZXMgcmVzcG9uc2VzIHRvIGFuIGFqYXggcmVxdWVzdDpcbiAqIC0gZmluZHMgdGhlIHJpZ2h0IGRhdGFUeXBlIChtZWRpYXRlcyBiZXR3ZWVuIGNvbnRlbnQtdHlwZSBhbmQgZXhwZWN0ZWQgZGF0YVR5cGUpXG4gKiAtIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgcmVzcG9uc2VcbiAqL1xuZnVuY3Rpb24gYWpheEhhbmRsZVJlc3BvbnNlcyggcywganFYSFIsIHJlc3BvbnNlcyApIHtcblxuXHR2YXIgY3QsIHR5cGUsIGZpbmFsRGF0YVR5cGUsIGZpcnN0RGF0YVR5cGUsXG5cdFx0Y29udGVudHMgPSBzLmNvbnRlbnRzLFxuXHRcdGRhdGFUeXBlcyA9IHMuZGF0YVR5cGVzO1xuXG5cdC8vIFJlbW92ZSBhdXRvIGRhdGFUeXBlIGFuZCBnZXQgY29udGVudC10eXBlIGluIHRoZSBwcm9jZXNzXG5cdHdoaWxlICggZGF0YVR5cGVzWyAwIF0gPT09IFwiKlwiICkge1xuXHRcdGRhdGFUeXBlcy5zaGlmdCgpO1xuXHRcdGlmICggY3QgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGN0ID0gcy5taW1lVHlwZSB8fCBqcVhIUi5nZXRSZXNwb25zZUhlYWRlciggXCJDb250ZW50LVR5cGVcIiApO1xuXHRcdH1cblx0fVxuXG5cdC8vIENoZWNrIGlmIHdlJ3JlIGRlYWxpbmcgd2l0aCBhIGtub3duIGNvbnRlbnQtdHlwZVxuXHRpZiAoIGN0ICkge1xuXHRcdGZvciAoIHR5cGUgaW4gY29udGVudHMgKSB7XG5cdFx0XHRpZiAoIGNvbnRlbnRzWyB0eXBlIF0gJiYgY29udGVudHNbIHR5cGUgXS50ZXN0KCBjdCApICkge1xuXHRcdFx0XHRkYXRhVHlwZXMudW5zaGlmdCggdHlwZSApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBDaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBhIHJlc3BvbnNlIGZvciB0aGUgZXhwZWN0ZWQgZGF0YVR5cGVcblx0aWYgKCBkYXRhVHlwZXNbIDAgXSBpbiByZXNwb25zZXMgKSB7XG5cdFx0ZmluYWxEYXRhVHlwZSA9IGRhdGFUeXBlc1sgMCBdO1xuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gVHJ5IGNvbnZlcnRpYmxlIGRhdGFUeXBlc1xuXHRcdGZvciAoIHR5cGUgaW4gcmVzcG9uc2VzICkge1xuXHRcdFx0aWYgKCAhZGF0YVR5cGVzWyAwIF0gfHwgcy5jb252ZXJ0ZXJzWyB0eXBlICsgXCIgXCIgKyBkYXRhVHlwZXNbIDAgXSBdICkge1xuXHRcdFx0XHRmaW5hbERhdGFUeXBlID0gdHlwZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoICFmaXJzdERhdGFUeXBlICkge1xuXHRcdFx0XHRmaXJzdERhdGFUeXBlID0gdHlwZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBPciBqdXN0IHVzZSBmaXJzdCBvbmVcblx0XHRmaW5hbERhdGFUeXBlID0gZmluYWxEYXRhVHlwZSB8fCBmaXJzdERhdGFUeXBlO1xuXHR9XG5cblx0Ly8gSWYgd2UgZm91bmQgYSBkYXRhVHlwZVxuXHQvLyBXZSBhZGQgdGhlIGRhdGFUeXBlIHRvIHRoZSBsaXN0IGlmIG5lZWRlZFxuXHQvLyBhbmQgcmV0dXJuIHRoZSBjb3JyZXNwb25kaW5nIHJlc3BvbnNlXG5cdGlmICggZmluYWxEYXRhVHlwZSApIHtcblx0XHRpZiAoIGZpbmFsRGF0YVR5cGUgIT09IGRhdGFUeXBlc1sgMCBdICkge1xuXHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIGZpbmFsRGF0YVR5cGUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3BvbnNlc1sgZmluYWxEYXRhVHlwZSBdO1xuXHR9XG59XG5cbi8qIENoYWluIGNvbnZlcnNpb25zIGdpdmVuIHRoZSByZXF1ZXN0IGFuZCB0aGUgb3JpZ2luYWwgcmVzcG9uc2VcbiAqIEFsc28gc2V0cyB0aGUgcmVzcG9uc2VYWFggZmllbGRzIG9uIHRoZSBqcVhIUiBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBhamF4Q29udmVydCggcywgcmVzcG9uc2UsIGpxWEhSLCBpc1N1Y2Nlc3MgKSB7XG5cdHZhciBjb252MiwgY3VycmVudCwgY29udiwgdG1wLCBwcmV2LFxuXHRcdGNvbnZlcnRlcnMgPSB7fSxcblxuXHRcdC8vIFdvcmsgd2l0aCBhIGNvcHkgb2YgZGF0YVR5cGVzIGluIGNhc2Ugd2UgbmVlZCB0byBtb2RpZnkgaXQgZm9yIGNvbnZlcnNpb25cblx0XHRkYXRhVHlwZXMgPSBzLmRhdGFUeXBlcy5zbGljZSgpO1xuXG5cdC8vIENyZWF0ZSBjb252ZXJ0ZXJzIG1hcCB3aXRoIGxvd2VyY2FzZWQga2V5c1xuXHRpZiAoIGRhdGFUeXBlc1sgMSBdICkge1xuXHRcdGZvciAoIGNvbnYgaW4gcy5jb252ZXJ0ZXJzICkge1xuXHRcdFx0Y29udmVydGVyc1sgY29udi50b0xvd2VyQ2FzZSgpIF0gPSBzLmNvbnZlcnRlcnNbIGNvbnYgXTtcblx0XHR9XG5cdH1cblxuXHRjdXJyZW50ID0gZGF0YVR5cGVzLnNoaWZ0KCk7XG5cblx0Ly8gQ29udmVydCB0byBlYWNoIHNlcXVlbnRpYWwgZGF0YVR5cGVcblx0d2hpbGUgKCBjdXJyZW50ICkge1xuXG5cdFx0aWYgKCBzLnJlc3BvbnNlRmllbGRzWyBjdXJyZW50IF0gKSB7XG5cdFx0XHRqcVhIUlsgcy5yZXNwb25zZUZpZWxkc1sgY3VycmVudCBdIF0gPSByZXNwb25zZTtcblx0XHR9XG5cblx0XHQvLyBBcHBseSB0aGUgZGF0YUZpbHRlciBpZiBwcm92aWRlZFxuXHRcdGlmICggIXByZXYgJiYgaXNTdWNjZXNzICYmIHMuZGF0YUZpbHRlciApIHtcblx0XHRcdHJlc3BvbnNlID0gcy5kYXRhRmlsdGVyKCByZXNwb25zZSwgcy5kYXRhVHlwZSApO1xuXHRcdH1cblxuXHRcdHByZXYgPSBjdXJyZW50O1xuXHRcdGN1cnJlbnQgPSBkYXRhVHlwZXMuc2hpZnQoKTtcblxuXHRcdGlmICggY3VycmVudCApIHtcblxuXHRcdFx0Ly8gVGhlcmUncyBvbmx5IHdvcmsgdG8gZG8gaWYgY3VycmVudCBkYXRhVHlwZSBpcyBub24tYXV0b1xuXHRcdFx0aWYgKCBjdXJyZW50ID09PSBcIipcIiApIHtcblxuXHRcdFx0XHRjdXJyZW50ID0gcHJldjtcblxuXHRcdFx0Ly8gQ29udmVydCByZXNwb25zZSBpZiBwcmV2IGRhdGFUeXBlIGlzIG5vbi1hdXRvIGFuZCBkaWZmZXJzIGZyb20gY3VycmVudFxuXHRcdFx0fSBlbHNlIGlmICggcHJldiAhPT0gXCIqXCIgJiYgcHJldiAhPT0gY3VycmVudCApIHtcblxuXHRcdFx0XHQvLyBTZWVrIGEgZGlyZWN0IGNvbnZlcnRlclxuXHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgY3VycmVudCBdIHx8IGNvbnZlcnRlcnNbIFwiKiBcIiArIGN1cnJlbnQgXTtcblxuXHRcdFx0XHQvLyBJZiBub25lIGZvdW5kLCBzZWVrIGEgcGFpclxuXHRcdFx0XHRpZiAoICFjb252ICkge1xuXHRcdFx0XHRcdGZvciAoIGNvbnYyIGluIGNvbnZlcnRlcnMgKSB7XG5cblx0XHRcdFx0XHRcdC8vIElmIGNvbnYyIG91dHB1dHMgY3VycmVudFxuXHRcdFx0XHRcdFx0dG1wID0gY29udjIuc3BsaXQoIFwiIFwiICk7XG5cdFx0XHRcdFx0XHRpZiAoIHRtcFsgMSBdID09PSBjdXJyZW50ICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIElmIHByZXYgY2FuIGJlIGNvbnZlcnRlZCB0byBhY2NlcHRlZCBpbnB1dFxuXHRcdFx0XHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgdG1wWyAwIF0gXSB8fFxuXHRcdFx0XHRcdFx0XHRcdGNvbnZlcnRlcnNbIFwiKiBcIiArIHRtcFsgMCBdIF07XG5cdFx0XHRcdFx0XHRcdGlmICggY29udiApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIENvbmRlbnNlIGVxdWl2YWxlbmNlIGNvbnZlcnRlcnNcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGNvbnYgPT09IHRydWUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgY29udjIgXTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIE90aGVyd2lzZSwgaW5zZXJ0IHRoZSBpbnRlcm1lZGlhdGUgZGF0YVR5cGVcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBjb252ZXJ0ZXJzWyBjb252MiBdICE9PSB0cnVlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3VycmVudCA9IHRtcFsgMCBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIHRtcFsgMSBdICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQXBwbHkgY29udmVydGVyIChpZiBub3QgYW4gZXF1aXZhbGVuY2UpXG5cdFx0XHRcdGlmICggY29udiAhPT0gdHJ1ZSApIHtcblxuXHRcdFx0XHRcdC8vIFVubGVzcyBlcnJvcnMgYXJlIGFsbG93ZWQgdG8gYnViYmxlLCBjYXRjaCBhbmQgcmV0dXJuIHRoZW1cblx0XHRcdFx0XHRpZiAoIGNvbnYgJiYgcy50aHJvd3MgKSB7XG5cdFx0XHRcdFx0XHRyZXNwb25zZSA9IGNvbnYoIHJlc3BvbnNlICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gY29udiggcmVzcG9uc2UgKTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdHN0YXRlOiBcInBhcnNlcmVycm9yXCIsXG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGNvbnYgPyBlIDogXCJObyBjb252ZXJzaW9uIGZyb20gXCIgKyBwcmV2ICsgXCIgdG8gXCIgKyBjdXJyZW50XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHsgc3RhdGU6IFwic3VjY2Vzc1wiLCBkYXRhOiByZXNwb25zZSB9O1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0Ly8gQ291bnRlciBmb3IgaG9sZGluZyB0aGUgbnVtYmVyIG9mIGFjdGl2ZSBxdWVyaWVzXG5cdGFjdGl2ZTogMCxcblxuXHQvLyBMYXN0LU1vZGlmaWVkIGhlYWRlciBjYWNoZSBmb3IgbmV4dCByZXF1ZXN0XG5cdGxhc3RNb2RpZmllZDoge30sXG5cdGV0YWc6IHt9LFxuXG5cdGFqYXhTZXR0aW5nczoge1xuXHRcdHVybDogbG9jYXRpb24uaHJlZixcblx0XHR0eXBlOiBcIkdFVFwiLFxuXHRcdGlzTG9jYWw6IHJsb2NhbFByb3RvY29sLnRlc3QoIGxvY2F0aW9uLnByb3RvY29sICksXG5cdFx0Z2xvYmFsOiB0cnVlLFxuXHRcdHByb2Nlc3NEYXRhOiB0cnVlLFxuXHRcdGFzeW5jOiB0cnVlLFxuXHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOFwiLFxuXG5cdFx0Lypcblx0XHR0aW1lb3V0OiAwLFxuXHRcdGRhdGE6IG51bGwsXG5cdFx0ZGF0YVR5cGU6IG51bGwsXG5cdFx0dXNlcm5hbWU6IG51bGwsXG5cdFx0cGFzc3dvcmQ6IG51bGwsXG5cdFx0Y2FjaGU6IG51bGwsXG5cdFx0dGhyb3dzOiBmYWxzZSxcblx0XHR0cmFkaXRpb25hbDogZmFsc2UsXG5cdFx0aGVhZGVyczoge30sXG5cdFx0Ki9cblxuXHRcdGFjY2VwdHM6IHtcblx0XHRcdFwiKlwiOiBhbGxUeXBlcyxcblx0XHRcdHRleHQ6IFwidGV4dC9wbGFpblwiLFxuXHRcdFx0aHRtbDogXCJ0ZXh0L2h0bWxcIixcblx0XHRcdHhtbDogXCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsXG5cdFx0XHRqc29uOiBcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdFwiXG5cdFx0fSxcblxuXHRcdGNvbnRlbnRzOiB7XG5cdFx0XHR4bWw6IC9cXGJ4bWxcXGIvLFxuXHRcdFx0aHRtbDogL1xcYmh0bWwvLFxuXHRcdFx0anNvbjogL1xcYmpzb25cXGIvXG5cdFx0fSxcblxuXHRcdHJlc3BvbnNlRmllbGRzOiB7XG5cdFx0XHR4bWw6IFwicmVzcG9uc2VYTUxcIixcblx0XHRcdHRleHQ6IFwicmVzcG9uc2VUZXh0XCIsXG5cdFx0XHRqc29uOiBcInJlc3BvbnNlSlNPTlwiXG5cdFx0fSxcblxuXHRcdC8vIERhdGEgY29udmVydGVyc1xuXHRcdC8vIEtleXMgc2VwYXJhdGUgc291cmNlIChvciBjYXRjaGFsbCBcIipcIikgYW5kIGRlc3RpbmF0aW9uIHR5cGVzIHdpdGggYSBzaW5nbGUgc3BhY2Vcblx0XHRjb252ZXJ0ZXJzOiB7XG5cblx0XHRcdC8vIENvbnZlcnQgYW55dGhpbmcgdG8gdGV4dFxuXHRcdFx0XCIqIHRleHRcIjogU3RyaW5nLFxuXG5cdFx0XHQvLyBUZXh0IHRvIGh0bWwgKHRydWUgPSBubyB0cmFuc2Zvcm1hdGlvbilcblx0XHRcdFwidGV4dCBodG1sXCI6IHRydWUsXG5cblx0XHRcdC8vIEV2YWx1YXRlIHRleHQgYXMgYSBqc29uIGV4cHJlc3Npb25cblx0XHRcdFwidGV4dCBqc29uXCI6IEpTT04ucGFyc2UsXG5cblx0XHRcdC8vIFBhcnNlIHRleHQgYXMgeG1sXG5cdFx0XHRcInRleHQgeG1sXCI6IGpRdWVyeS5wYXJzZVhNTFxuXHRcdH0sXG5cblx0XHQvLyBGb3Igb3B0aW9ucyB0aGF0IHNob3VsZG4ndCBiZSBkZWVwIGV4dGVuZGVkOlxuXHRcdC8vIHlvdSBjYW4gYWRkIHlvdXIgb3duIGN1c3RvbSBvcHRpb25zIGhlcmUgaWZcblx0XHQvLyBhbmQgd2hlbiB5b3UgY3JlYXRlIG9uZSB0aGF0IHNob3VsZG4ndCBiZVxuXHRcdC8vIGRlZXAgZXh0ZW5kZWQgKHNlZSBhamF4RXh0ZW5kKVxuXHRcdGZsYXRPcHRpb25zOiB7XG5cdFx0XHR1cmw6IHRydWUsXG5cdFx0XHRjb250ZXh0OiB0cnVlXG5cdFx0fVxuXHR9LFxuXG5cdC8vIENyZWF0ZXMgYSBmdWxsIGZsZWRnZWQgc2V0dGluZ3Mgb2JqZWN0IGludG8gdGFyZ2V0XG5cdC8vIHdpdGggYm90aCBhamF4U2V0dGluZ3MgYW5kIHNldHRpbmdzIGZpZWxkcy5cblx0Ly8gSWYgdGFyZ2V0IGlzIG9taXR0ZWQsIHdyaXRlcyBpbnRvIGFqYXhTZXR0aW5ncy5cblx0YWpheFNldHVwOiBmdW5jdGlvbiggdGFyZ2V0LCBzZXR0aW5ncyApIHtcblx0XHRyZXR1cm4gc2V0dGluZ3MgP1xuXG5cdFx0XHQvLyBCdWlsZGluZyBhIHNldHRpbmdzIG9iamVjdFxuXHRcdFx0YWpheEV4dGVuZCggYWpheEV4dGVuZCggdGFyZ2V0LCBqUXVlcnkuYWpheFNldHRpbmdzICksIHNldHRpbmdzICkgOlxuXG5cdFx0XHQvLyBFeHRlbmRpbmcgYWpheFNldHRpbmdzXG5cdFx0XHRhamF4RXh0ZW5kKCBqUXVlcnkuYWpheFNldHRpbmdzLCB0YXJnZXQgKTtcblx0fSxcblxuXHRhamF4UHJlZmlsdGVyOiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHByZWZpbHRlcnMgKSxcblx0YWpheFRyYW5zcG9ydDogYWRkVG9QcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzICksXG5cblx0Ly8gTWFpbiBtZXRob2Rcblx0YWpheDogZnVuY3Rpb24oIHVybCwgb3B0aW9ucyApIHtcblxuXHRcdC8vIElmIHVybCBpcyBhbiBvYmplY3QsIHNpbXVsYXRlIHByZS0xLjUgc2lnbmF0dXJlXG5cdFx0aWYgKCB0eXBlb2YgdXJsID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0b3B0aW9ucyA9IHVybDtcblx0XHRcdHVybCA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHQvLyBGb3JjZSBvcHRpb25zIHRvIGJlIGFuIG9iamVjdFxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0dmFyIHRyYW5zcG9ydCxcblxuXHRcdFx0Ly8gVVJMIHdpdGhvdXQgYW50aS1jYWNoZSBwYXJhbVxuXHRcdFx0Y2FjaGVVUkwsXG5cblx0XHRcdC8vIFJlc3BvbnNlIGhlYWRlcnNcblx0XHRcdHJlc3BvbnNlSGVhZGVyc1N0cmluZyxcblx0XHRcdHJlc3BvbnNlSGVhZGVycyxcblxuXHRcdFx0Ly8gdGltZW91dCBoYW5kbGVcblx0XHRcdHRpbWVvdXRUaW1lcixcblxuXHRcdFx0Ly8gVXJsIGNsZWFudXAgdmFyXG5cdFx0XHR1cmxBbmNob3IsXG5cblx0XHRcdC8vIFJlcXVlc3Qgc3RhdGUgKGJlY29tZXMgZmFsc2UgdXBvbiBzZW5kIGFuZCB0cnVlIHVwb24gY29tcGxldGlvbilcblx0XHRcdGNvbXBsZXRlZCxcblxuXHRcdFx0Ly8gVG8ga25vdyBpZiBnbG9iYWwgZXZlbnRzIGFyZSB0byBiZSBkaXNwYXRjaGVkXG5cdFx0XHRmaXJlR2xvYmFscyxcblxuXHRcdFx0Ly8gTG9vcCB2YXJpYWJsZVxuXHRcdFx0aSxcblxuXHRcdFx0Ly8gdW5jYWNoZWQgcGFydCBvZiB0aGUgdXJsXG5cdFx0XHR1bmNhY2hlZCxcblxuXHRcdFx0Ly8gQ3JlYXRlIHRoZSBmaW5hbCBvcHRpb25zIG9iamVjdFxuXHRcdFx0cyA9IGpRdWVyeS5hamF4U2V0dXAoIHt9LCBvcHRpb25zICksXG5cblx0XHRcdC8vIENhbGxiYWNrcyBjb250ZXh0XG5cdFx0XHRjYWxsYmFja0NvbnRleHQgPSBzLmNvbnRleHQgfHwgcyxcblxuXHRcdFx0Ly8gQ29udGV4dCBmb3IgZ2xvYmFsIGV2ZW50cyBpcyBjYWxsYmFja0NvbnRleHQgaWYgaXQgaXMgYSBET00gbm9kZSBvciBqUXVlcnkgY29sbGVjdGlvblxuXHRcdFx0Z2xvYmFsRXZlbnRDb250ZXh0ID0gcy5jb250ZXh0ICYmXG5cdFx0XHRcdCggY2FsbGJhY2tDb250ZXh0Lm5vZGVUeXBlIHx8IGNhbGxiYWNrQ29udGV4dC5qcXVlcnkgKSA/XG5cdFx0XHRcdFx0alF1ZXJ5KCBjYWxsYmFja0NvbnRleHQgKSA6XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LFxuXG5cdFx0XHQvLyBEZWZlcnJlZHNcblx0XHRcdGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG5cdFx0XHRjb21wbGV0ZURlZmVycmVkID0galF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksXG5cblx0XHRcdC8vIFN0YXR1cy1kZXBlbmRlbnQgY2FsbGJhY2tzXG5cdFx0XHRzdGF0dXNDb2RlID0gcy5zdGF0dXNDb2RlIHx8IHt9LFxuXG5cdFx0XHQvLyBIZWFkZXJzICh0aGV5IGFyZSBzZW50IGFsbCBhdCBvbmNlKVxuXHRcdFx0cmVxdWVzdEhlYWRlcnMgPSB7fSxcblx0XHRcdHJlcXVlc3RIZWFkZXJzTmFtZXMgPSB7fSxcblxuXHRcdFx0Ly8gRGVmYXVsdCBhYm9ydCBtZXNzYWdlXG5cdFx0XHRzdHJBYm9ydCA9IFwiY2FuY2VsZWRcIixcblxuXHRcdFx0Ly8gRmFrZSB4aHJcblx0XHRcdGpxWEhSID0ge1xuXHRcdFx0XHRyZWFkeVN0YXRlOiAwLFxuXG5cdFx0XHRcdC8vIEJ1aWxkcyBoZWFkZXJzIGhhc2h0YWJsZSBpZiBuZWVkZWRcblx0XHRcdFx0Z2V0UmVzcG9uc2VIZWFkZXI6IGZ1bmN0aW9uKCBrZXkgKSB7XG5cdFx0XHRcdFx0dmFyIG1hdGNoO1xuXHRcdFx0XHRcdGlmICggY29tcGxldGVkICkge1xuXHRcdFx0XHRcdFx0aWYgKCAhcmVzcG9uc2VIZWFkZXJzICkge1xuXHRcdFx0XHRcdFx0XHRyZXNwb25zZUhlYWRlcnMgPSB7fTtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKCAoIG1hdGNoID0gcmhlYWRlcnMuZXhlYyggcmVzcG9uc2VIZWFkZXJzU3RyaW5nICkgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZUhlYWRlcnNbIG1hdGNoWyAxIF0udG9Mb3dlckNhc2UoKSBdID0gbWF0Y2hbIDIgXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bWF0Y2ggPSByZXNwb25zZUhlYWRlcnNbIGtleS50b0xvd2VyQ2FzZSgpIF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBtYXRjaCA9PSBudWxsID8gbnVsbCA6IG1hdGNoO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFJhdyBzdHJpbmdcblx0XHRcdFx0Z2V0QWxsUmVzcG9uc2VIZWFkZXJzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gY29tcGxldGVkID8gcmVzcG9uc2VIZWFkZXJzU3RyaW5nIDogbnVsbDtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBDYWNoZXMgdGhlIGhlYWRlclxuXHRcdFx0XHRzZXRSZXF1ZXN0SGVhZGVyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0XHRcdFx0aWYgKCBjb21wbGV0ZWQgPT0gbnVsbCApIHtcblx0XHRcdFx0XHRcdG5hbWUgPSByZXF1ZXN0SGVhZGVyc05hbWVzWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSA9XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RIZWFkZXJzTmFtZXNbIG5hbWUudG9Mb3dlckNhc2UoKSBdIHx8IG5hbWU7XG5cdFx0XHRcdFx0XHRyZXF1ZXN0SGVhZGVyc1sgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIE92ZXJyaWRlcyByZXNwb25zZSBjb250ZW50LXR5cGUgaGVhZGVyXG5cdFx0XHRcdG92ZXJyaWRlTWltZVR5cGU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdFx0XHRcdGlmICggY29tcGxldGVkID09IG51bGwgKSB7XG5cdFx0XHRcdFx0XHRzLm1pbWVUeXBlID0gdHlwZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3Ncblx0XHRcdFx0c3RhdHVzQ29kZTogZnVuY3Rpb24oIG1hcCApIHtcblx0XHRcdFx0XHR2YXIgY29kZTtcblx0XHRcdFx0XHRpZiAoIG1hcCApIHtcblx0XHRcdFx0XHRcdGlmICggY29tcGxldGVkICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIEV4ZWN1dGUgdGhlIGFwcHJvcHJpYXRlIGNhbGxiYWNrc1xuXHRcdFx0XHRcdFx0XHRqcVhIUi5hbHdheXMoIG1hcFsganFYSFIuc3RhdHVzIF0gKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gTGF6eS1hZGQgdGhlIG5ldyBjYWxsYmFja3MgaW4gYSB3YXkgdGhhdCBwcmVzZXJ2ZXMgb2xkIG9uZXNcblx0XHRcdFx0XHRcdFx0Zm9yICggY29kZSBpbiBtYXAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzQ29kZVsgY29kZSBdID0gWyBzdGF0dXNDb2RlWyBjb2RlIF0sIG1hcFsgY29kZSBdIF07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gQ2FuY2VsIHRoZSByZXF1ZXN0XG5cdFx0XHRcdGFib3J0OiBmdW5jdGlvbiggc3RhdHVzVGV4dCApIHtcblx0XHRcdFx0XHR2YXIgZmluYWxUZXh0ID0gc3RhdHVzVGV4dCB8fCBzdHJBYm9ydDtcblx0XHRcdFx0XHRpZiAoIHRyYW5zcG9ydCApIHtcblx0XHRcdFx0XHRcdHRyYW5zcG9ydC5hYm9ydCggZmluYWxUZXh0ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRvbmUoIDAsIGZpbmFsVGV4dCApO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0Ly8gQXR0YWNoIGRlZmVycmVkc1xuXHRcdGRlZmVycmVkLnByb21pc2UoIGpxWEhSICk7XG5cblx0XHQvLyBBZGQgcHJvdG9jb2wgaWYgbm90IHByb3ZpZGVkIChwcmVmaWx0ZXJzIG1pZ2h0IGV4cGVjdCBpdClcblx0XHQvLyBIYW5kbGUgZmFsc3kgdXJsIGluIHRoZSBzZXR0aW5ncyBvYmplY3QgKCMxMDA5MzogY29uc2lzdGVuY3kgd2l0aCBvbGQgc2lnbmF0dXJlKVxuXHRcdC8vIFdlIGFsc28gdXNlIHRoZSB1cmwgcGFyYW1ldGVyIGlmIGF2YWlsYWJsZVxuXHRcdHMudXJsID0gKCAoIHVybCB8fCBzLnVybCB8fCBsb2NhdGlvbi5ocmVmICkgKyBcIlwiIClcblx0XHRcdC5yZXBsYWNlKCBycHJvdG9jb2wsIGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICk7XG5cblx0XHQvLyBBbGlhcyBtZXRob2Qgb3B0aW9uIHRvIHR5cGUgYXMgcGVyIHRpY2tldCAjMTIwMDRcblx0XHRzLnR5cGUgPSBvcHRpb25zLm1ldGhvZCB8fCBvcHRpb25zLnR5cGUgfHwgcy5tZXRob2QgfHwgcy50eXBlO1xuXG5cdFx0Ly8gRXh0cmFjdCBkYXRhVHlwZXMgbGlzdFxuXHRcdHMuZGF0YVR5cGVzID0gKCBzLmRhdGFUeXBlIHx8IFwiKlwiICkudG9Mb3dlckNhc2UoKS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXG5cdFx0Ly8gQSBjcm9zcy1kb21haW4gcmVxdWVzdCBpcyBpbiBvcmRlciB3aGVuIHRoZSBvcmlnaW4gZG9lc24ndCBtYXRjaCB0aGUgY3VycmVudCBvcmlnaW4uXG5cdFx0aWYgKCBzLmNyb3NzRG9tYWluID09IG51bGwgKSB7XG5cdFx0XHR1cmxBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImFcIiApO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTggLSAxMSwgRWRnZSAxMiAtIDEzXG5cdFx0XHQvLyBJRSB0aHJvd3MgZXhjZXB0aW9uIG9uIGFjY2Vzc2luZyB0aGUgaHJlZiBwcm9wZXJ0eSBpZiB1cmwgaXMgbWFsZm9ybWVkLFxuXHRcdFx0Ly8gZS5nLiBodHRwOi8vZXhhbXBsZS5jb206ODB4L1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dXJsQW5jaG9yLmhyZWYgPSBzLnVybDtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTggLSAxMSBvbmx5XG5cdFx0XHRcdC8vIEFuY2hvcidzIGhvc3QgcHJvcGVydHkgaXNuJ3QgY29ycmVjdGx5IHNldCB3aGVuIHMudXJsIGlzIHJlbGF0aXZlXG5cdFx0XHRcdHVybEFuY2hvci5ocmVmID0gdXJsQW5jaG9yLmhyZWY7XG5cdFx0XHRcdHMuY3Jvc3NEb21haW4gPSBvcmlnaW5BbmNob3IucHJvdG9jb2wgKyBcIi8vXCIgKyBvcmlnaW5BbmNob3IuaG9zdCAhPT1cblx0XHRcdFx0XHR1cmxBbmNob3IucHJvdG9jb2wgKyBcIi8vXCIgKyB1cmxBbmNob3IuaG9zdDtcblx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdC8vIElmIHRoZXJlIGlzIGFuIGVycm9yIHBhcnNpbmcgdGhlIFVSTCwgYXNzdW1lIGl0IGlzIGNyb3NzRG9tYWluLFxuXHRcdFx0XHQvLyBpdCBjYW4gYmUgcmVqZWN0ZWQgYnkgdGhlIHRyYW5zcG9ydCBpZiBpdCBpcyBpbnZhbGlkXG5cdFx0XHRcdHMuY3Jvc3NEb21haW4gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENvbnZlcnQgZGF0YSBpZiBub3QgYWxyZWFkeSBhIHN0cmluZ1xuXHRcdGlmICggcy5kYXRhICYmIHMucHJvY2Vzc0RhdGEgJiYgdHlwZW9mIHMuZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHMuZGF0YSA9IGpRdWVyeS5wYXJhbSggcy5kYXRhLCBzLnRyYWRpdGlvbmFsICk7XG5cdFx0fVxuXG5cdFx0Ly8gQXBwbHkgcHJlZmlsdGVyc1xuXHRcdGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCBwcmVmaWx0ZXJzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG5cdFx0Ly8gSWYgcmVxdWVzdCB3YXMgYWJvcnRlZCBpbnNpZGUgYSBwcmVmaWx0ZXIsIHN0b3AgdGhlcmVcblx0XHRpZiAoIGNvbXBsZXRlZCApIHtcblx0XHRcdHJldHVybiBqcVhIUjtcblx0XHR9XG5cblx0XHQvLyBXZSBjYW4gZmlyZSBnbG9iYWwgZXZlbnRzIGFzIG9mIG5vdyBpZiBhc2tlZCB0b1xuXHRcdC8vIERvbid0IGZpcmUgZXZlbnRzIGlmIGpRdWVyeS5ldmVudCBpcyB1bmRlZmluZWQgaW4gYW4gQU1ELXVzYWdlIHNjZW5hcmlvICgjMTUxMTgpXG5cdFx0ZmlyZUdsb2JhbHMgPSBqUXVlcnkuZXZlbnQgJiYgcy5nbG9iYWw7XG5cblx0XHQvLyBXYXRjaCBmb3IgYSBuZXcgc2V0IG9mIHJlcXVlc3RzXG5cdFx0aWYgKCBmaXJlR2xvYmFscyAmJiBqUXVlcnkuYWN0aXZlKysgPT09IDAgKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggXCJhamF4U3RhcnRcIiApO1xuXHRcdH1cblxuXHRcdC8vIFVwcGVyY2FzZSB0aGUgdHlwZVxuXHRcdHMudHlwZSA9IHMudHlwZS50b1VwcGVyQ2FzZSgpO1xuXG5cdFx0Ly8gRGV0ZXJtaW5lIGlmIHJlcXVlc3QgaGFzIGNvbnRlbnRcblx0XHRzLmhhc0NvbnRlbnQgPSAhcm5vQ29udGVudC50ZXN0KCBzLnR5cGUgKTtcblxuXHRcdC8vIFNhdmUgdGhlIFVSTCBpbiBjYXNlIHdlJ3JlIHRveWluZyB3aXRoIHRoZSBJZi1Nb2RpZmllZC1TaW5jZVxuXHRcdC8vIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciBsYXRlciBvblxuXHRcdC8vIFJlbW92ZSBoYXNoIHRvIHNpbXBsaWZ5IHVybCBtYW5pcHVsYXRpb25cblx0XHRjYWNoZVVSTCA9IHMudXJsLnJlcGxhY2UoIHJoYXNoLCBcIlwiICk7XG5cblx0XHQvLyBNb3JlIG9wdGlvbnMgaGFuZGxpbmcgZm9yIHJlcXVlc3RzIHdpdGggbm8gY29udGVudFxuXHRcdGlmICggIXMuaGFzQ29udGVudCApIHtcblxuXHRcdFx0Ly8gUmVtZW1iZXIgdGhlIGhhc2ggc28gd2UgY2FuIHB1dCBpdCBiYWNrXG5cdFx0XHR1bmNhY2hlZCA9IHMudXJsLnNsaWNlKCBjYWNoZVVSTC5sZW5ndGggKTtcblxuXHRcdFx0Ly8gSWYgZGF0YSBpcyBhdmFpbGFibGUsIGFwcGVuZCBkYXRhIHRvIHVybFxuXHRcdFx0aWYgKCBzLmRhdGEgKSB7XG5cdFx0XHRcdGNhY2hlVVJMICs9ICggcnF1ZXJ5LnRlc3QoIGNhY2hlVVJMICkgPyBcIiZcIiA6IFwiP1wiICkgKyBzLmRhdGE7XG5cblx0XHRcdFx0Ly8gIzk2ODI6IHJlbW92ZSBkYXRhIHNvIHRoYXQgaXQncyBub3QgdXNlZCBpbiBhbiBldmVudHVhbCByZXRyeVxuXHRcdFx0XHRkZWxldGUgcy5kYXRhO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgb3IgdXBkYXRlIGFudGktY2FjaGUgcGFyYW0gaWYgbmVlZGVkXG5cdFx0XHRpZiAoIHMuY2FjaGUgPT09IGZhbHNlICkge1xuXHRcdFx0XHRjYWNoZVVSTCA9IGNhY2hlVVJMLnJlcGxhY2UoIHJhbnRpQ2FjaGUsIFwiJDFcIiApO1xuXHRcdFx0XHR1bmNhY2hlZCA9ICggcnF1ZXJ5LnRlc3QoIGNhY2hlVVJMICkgPyBcIiZcIiA6IFwiP1wiICkgKyBcIl89XCIgKyAoIG5vbmNlKysgKSArIHVuY2FjaGVkO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBQdXQgaGFzaCBhbmQgYW50aS1jYWNoZSBvbiB0aGUgVVJMIHRoYXQgd2lsbCBiZSByZXF1ZXN0ZWQgKGdoLTE3MzIpXG5cdFx0XHRzLnVybCA9IGNhY2hlVVJMICsgdW5jYWNoZWQ7XG5cblx0XHQvLyBDaGFuZ2UgJyUyMCcgdG8gJysnIGlmIHRoaXMgaXMgZW5jb2RlZCBmb3JtIGJvZHkgY29udGVudCAoZ2gtMjY1OClcblx0XHR9IGVsc2UgaWYgKCBzLmRhdGEgJiYgcy5wcm9jZXNzRGF0YSAmJlxuXHRcdFx0KCBzLmNvbnRlbnRUeXBlIHx8IFwiXCIgKS5pbmRleE9mKCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiICkgPT09IDAgKSB7XG5cdFx0XHRzLmRhdGEgPSBzLmRhdGEucmVwbGFjZSggcjIwLCBcIitcIiApO1xuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgSWYtTW9kaWZpZWQtU2luY2UgYW5kL29yIElmLU5vbmUtTWF0Y2ggaGVhZGVyLCBpZiBpbiBpZk1vZGlmaWVkIG1vZGUuXG5cdFx0aWYgKCBzLmlmTW9kaWZpZWQgKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5sYXN0TW9kaWZpZWRbIGNhY2hlVVJMIF0gKSB7XG5cdFx0XHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiSWYtTW9kaWZpZWQtU2luY2VcIiwgalF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSApIHtcblx0XHRcdFx0anFYSFIuc2V0UmVxdWVzdEhlYWRlciggXCJJZi1Ob25lLU1hdGNoXCIsIGpRdWVyeS5ldGFnWyBjYWNoZVVSTCBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBjb3JyZWN0IGhlYWRlciwgaWYgZGF0YSBpcyBiZWluZyBzZW50XG5cdFx0aWYgKCBzLmRhdGEgJiYgcy5oYXNDb250ZW50ICYmIHMuY29udGVudFR5cGUgIT09IGZhbHNlIHx8IG9wdGlvbnMuY29udGVudFR5cGUgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIkNvbnRlbnQtVHlwZVwiLCBzLmNvbnRlbnRUeXBlICk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBBY2NlcHRzIGhlYWRlciBmb3IgdGhlIHNlcnZlciwgZGVwZW5kaW5nIG9uIHRoZSBkYXRhVHlwZVxuXHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoXG5cdFx0XHRcIkFjY2VwdFwiLFxuXHRcdFx0cy5kYXRhVHlwZXNbIDAgXSAmJiBzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWyAwIF0gXSA/XG5cdFx0XHRcdHMuYWNjZXB0c1sgcy5kYXRhVHlwZXNbIDAgXSBdICtcblx0XHRcdFx0XHQoIHMuZGF0YVR5cGVzWyAwIF0gIT09IFwiKlwiID8gXCIsIFwiICsgYWxsVHlwZXMgKyBcIjsgcT0wLjAxXCIgOiBcIlwiICkgOlxuXHRcdFx0XHRzLmFjY2VwdHNbIFwiKlwiIF1cblx0XHQpO1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIGhlYWRlcnMgb3B0aW9uXG5cdFx0Zm9yICggaSBpbiBzLmhlYWRlcnMgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBzLmhlYWRlcnNbIGkgXSApO1xuXHRcdH1cblxuXHRcdC8vIEFsbG93IGN1c3RvbSBoZWFkZXJzL21pbWV0eXBlcyBhbmQgZWFybHkgYWJvcnRcblx0XHRpZiAoIHMuYmVmb3JlU2VuZCAmJlxuXHRcdFx0KCBzLmJlZm9yZVNlbmQuY2FsbCggY2FsbGJhY2tDb250ZXh0LCBqcVhIUiwgcyApID09PSBmYWxzZSB8fCBjb21wbGV0ZWQgKSApIHtcblxuXHRcdFx0Ly8gQWJvcnQgaWYgbm90IGRvbmUgYWxyZWFkeSBhbmQgcmV0dXJuXG5cdFx0XHRyZXR1cm4ganFYSFIuYWJvcnQoKTtcblx0XHR9XG5cblx0XHQvLyBBYm9ydGluZyBpcyBubyBsb25nZXIgYSBjYW5jZWxsYXRpb25cblx0XHRzdHJBYm9ydCA9IFwiYWJvcnRcIjtcblxuXHRcdC8vIEluc3RhbGwgY2FsbGJhY2tzIG9uIGRlZmVycmVkc1xuXHRcdGNvbXBsZXRlRGVmZXJyZWQuYWRkKCBzLmNvbXBsZXRlICk7XG5cdFx0anFYSFIuZG9uZSggcy5zdWNjZXNzICk7XG5cdFx0anFYSFIuZmFpbCggcy5lcnJvciApO1xuXG5cdFx0Ly8gR2V0IHRyYW5zcG9ydFxuXHRcdHRyYW5zcG9ydCA9IGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG5cdFx0Ly8gSWYgbm8gdHJhbnNwb3J0LCB3ZSBhdXRvLWFib3J0XG5cdFx0aWYgKCAhdHJhbnNwb3J0ICkge1xuXHRcdFx0ZG9uZSggLTEsIFwiTm8gVHJhbnNwb3J0XCIgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0anFYSFIucmVhZHlTdGF0ZSA9IDE7XG5cblx0XHRcdC8vIFNlbmQgZ2xvYmFsIGV2ZW50XG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4U2VuZFwiLCBbIGpxWEhSLCBzIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgcmVxdWVzdCB3YXMgYWJvcnRlZCBpbnNpZGUgYWpheFNlbmQsIHN0b3AgdGhlcmVcblx0XHRcdGlmICggY29tcGxldGVkICkge1xuXHRcdFx0XHRyZXR1cm4ganFYSFI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRpbWVvdXRcblx0XHRcdGlmICggcy5hc3luYyAmJiBzLnRpbWVvdXQgPiAwICkge1xuXHRcdFx0XHR0aW1lb3V0VGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0anFYSFIuYWJvcnQoIFwidGltZW91dFwiICk7XG5cdFx0XHRcdH0sIHMudGltZW91dCApO1xuXHRcdFx0fVxuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb21wbGV0ZWQgPSBmYWxzZTtcblx0XHRcdFx0dHJhbnNwb3J0LnNlbmQoIHJlcXVlc3RIZWFkZXJzLCBkb25lICk7XG5cdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHQvLyBSZXRocm93IHBvc3QtY29tcGxldGlvbiBleGNlcHRpb25zXG5cdFx0XHRcdGlmICggY29tcGxldGVkICkge1xuXHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBQcm9wYWdhdGUgb3RoZXJzIGFzIHJlc3VsdHNcblx0XHRcdFx0ZG9uZSggLTEsIGUgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWxsYmFjayBmb3Igd2hlbiBldmVyeXRoaW5nIGlzIGRvbmVcblx0XHRmdW5jdGlvbiBkb25lKCBzdGF0dXMsIG5hdGl2ZVN0YXR1c1RleHQsIHJlc3BvbnNlcywgaGVhZGVycyApIHtcblx0XHRcdHZhciBpc1N1Y2Nlc3MsIHN1Y2Nlc3MsIGVycm9yLCByZXNwb25zZSwgbW9kaWZpZWQsXG5cdFx0XHRcdHN0YXR1c1RleHQgPSBuYXRpdmVTdGF0dXNUZXh0O1xuXG5cdFx0XHQvLyBJZ25vcmUgcmVwZWF0IGludm9jYXRpb25zXG5cdFx0XHRpZiAoIGNvbXBsZXRlZCApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb21wbGV0ZWQgPSB0cnVlO1xuXG5cdFx0XHQvLyBDbGVhciB0aW1lb3V0IGlmIGl0IGV4aXN0c1xuXHRcdFx0aWYgKCB0aW1lb3V0VGltZXIgKSB7XG5cdFx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoIHRpbWVvdXRUaW1lciApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBEZXJlZmVyZW5jZSB0cmFuc3BvcnQgZm9yIGVhcmx5IGdhcmJhZ2UgY29sbGVjdGlvblxuXHRcdFx0Ly8gKG5vIG1hdHRlciBob3cgbG9uZyB0aGUganFYSFIgb2JqZWN0IHdpbGwgYmUgdXNlZClcblx0XHRcdHRyYW5zcG9ydCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0Ly8gQ2FjaGUgcmVzcG9uc2UgaGVhZGVyc1xuXHRcdFx0cmVzcG9uc2VIZWFkZXJzU3RyaW5nID0gaGVhZGVycyB8fCBcIlwiO1xuXG5cdFx0XHQvLyBTZXQgcmVhZHlTdGF0ZVxuXHRcdFx0anFYSFIucmVhZHlTdGF0ZSA9IHN0YXR1cyA+IDAgPyA0IDogMDtcblxuXHRcdFx0Ly8gRGV0ZXJtaW5lIGlmIHN1Y2Nlc3NmdWxcblx0XHRcdGlzU3VjY2VzcyA9IHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwIHx8IHN0YXR1cyA9PT0gMzA0O1xuXG5cdFx0XHQvLyBHZXQgcmVzcG9uc2UgZGF0YVxuXHRcdFx0aWYgKCByZXNwb25zZXMgKSB7XG5cdFx0XHRcdHJlc3BvbnNlID0gYWpheEhhbmRsZVJlc3BvbnNlcyggcywganFYSFIsIHJlc3BvbnNlcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb252ZXJ0IG5vIG1hdHRlciB3aGF0ICh0aGF0IHdheSByZXNwb25zZVhYWCBmaWVsZHMgYXJlIGFsd2F5cyBzZXQpXG5cdFx0XHRyZXNwb25zZSA9IGFqYXhDb252ZXJ0KCBzLCByZXNwb25zZSwganFYSFIsIGlzU3VjY2VzcyApO1xuXG5cdFx0XHQvLyBJZiBzdWNjZXNzZnVsLCBoYW5kbGUgdHlwZSBjaGFpbmluZ1xuXHRcdFx0aWYgKCBpc1N1Y2Nlc3MgKSB7XG5cblx0XHRcdFx0Ly8gU2V0IHRoZSBJZi1Nb2RpZmllZC1TaW5jZSBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIsIGlmIGluIGlmTW9kaWZpZWQgbW9kZS5cblx0XHRcdFx0aWYgKCBzLmlmTW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0bW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlciggXCJMYXN0LU1vZGlmaWVkXCIgKTtcblx0XHRcdFx0XHRpZiAoIG1vZGlmaWVkICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5Lmxhc3RNb2RpZmllZFsgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRtb2RpZmllZCA9IGpxWEhSLmdldFJlc3BvbnNlSGVhZGVyKCBcImV0YWdcIiApO1xuXHRcdFx0XHRcdGlmICggbW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZXRhZ1sgY2FjaGVVUkwgXSA9IG1vZGlmaWVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGlmIG5vIGNvbnRlbnRcblx0XHRcdFx0aWYgKCBzdGF0dXMgPT09IDIwNCB8fCBzLnR5cGUgPT09IFwiSEVBRFwiICkge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSBcIm5vY29udGVudFwiO1xuXG5cdFx0XHRcdC8vIGlmIG5vdCBtb2RpZmllZFxuXHRcdFx0XHR9IGVsc2UgaWYgKCBzdGF0dXMgPT09IDMwNCApIHtcblx0XHRcdFx0XHRzdGF0dXNUZXh0ID0gXCJub3Rtb2RpZmllZFwiO1xuXG5cdFx0XHRcdC8vIElmIHdlIGhhdmUgZGF0YSwgbGV0J3MgY29udmVydCBpdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0ZTtcblx0XHRcdFx0XHRzdWNjZXNzID0gcmVzcG9uc2UuZGF0YTtcblx0XHRcdFx0XHRlcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuXHRcdFx0XHRcdGlzU3VjY2VzcyA9ICFlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBFeHRyYWN0IGVycm9yIGZyb20gc3RhdHVzVGV4dCBhbmQgbm9ybWFsaXplIGZvciBub24tYWJvcnRzXG5cdFx0XHRcdGVycm9yID0gc3RhdHVzVGV4dDtcblx0XHRcdFx0aWYgKCBzdGF0dXMgfHwgIXN0YXR1c1RleHQgKSB7XG5cdFx0XHRcdFx0c3RhdHVzVGV4dCA9IFwiZXJyb3JcIjtcblx0XHRcdFx0XHRpZiAoIHN0YXR1cyA8IDAgKSB7XG5cdFx0XHRcdFx0XHRzdGF0dXMgPSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgZGF0YSBmb3IgdGhlIGZha2UgeGhyIG9iamVjdFxuXHRcdFx0anFYSFIuc3RhdHVzID0gc3RhdHVzO1xuXHRcdFx0anFYSFIuc3RhdHVzVGV4dCA9ICggbmF0aXZlU3RhdHVzVGV4dCB8fCBzdGF0dXNUZXh0ICkgKyBcIlwiO1xuXG5cdFx0XHQvLyBTdWNjZXNzL0Vycm9yXG5cdFx0XHRpZiAoIGlzU3VjY2VzcyApIHtcblx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBzdWNjZXNzLCBzdGF0dXNUZXh0LCBqcVhIUiBdICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWZlcnJlZC5yZWplY3RXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQsIGVycm9yIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3Ncblx0XHRcdGpxWEhSLnN0YXR1c0NvZGUoIHN0YXR1c0NvZGUgKTtcblx0XHRcdHN0YXR1c0NvZGUgPSB1bmRlZmluZWQ7XG5cblx0XHRcdGlmICggZmlyZUdsb2JhbHMgKSB7XG5cdFx0XHRcdGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBpc1N1Y2Nlc3MgPyBcImFqYXhTdWNjZXNzXCIgOiBcImFqYXhFcnJvclwiLFxuXHRcdFx0XHRcdFsganFYSFIsIHMsIGlzU3VjY2VzcyA/IHN1Y2Nlc3MgOiBlcnJvciBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbXBsZXRlXG5cdFx0XHRjb21wbGV0ZURlZmVycmVkLmZpcmVXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQgXSApO1xuXG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4Q29tcGxldGVcIiwgWyBqcVhIUiwgcyBdICk7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIHRoZSBnbG9iYWwgQUpBWCBjb3VudGVyXG5cdFx0XHRcdGlmICggISggLS1qUXVlcnkuYWN0aXZlICkgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIFwiYWpheFN0b3BcIiApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGpxWEhSO1xuXHR9LFxuXG5cdGdldEpTT046IGZ1bmN0aW9uKCB1cmwsIGRhdGEsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ2V0KCB1cmwsIGRhdGEsIGNhbGxiYWNrLCBcImpzb25cIiApO1xuXHR9LFxuXG5cdGdldFNjcmlwdDogZnVuY3Rpb24oIHVybCwgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5nZXQoIHVybCwgdW5kZWZpbmVkLCBjYWxsYmFjaywgXCJzY3JpcHRcIiApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCBbIFwiZ2V0XCIsIFwicG9zdFwiIF0sIGZ1bmN0aW9uKCBpLCBtZXRob2QgKSB7XG5cdGpRdWVyeVsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjaywgdHlwZSApIHtcblxuXHRcdC8vIFNoaWZ0IGFyZ3VtZW50cyBpZiBkYXRhIGFyZ3VtZW50IHdhcyBvbWl0dGVkXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggZGF0YSApICkge1xuXHRcdFx0dHlwZSA9IHR5cGUgfHwgY2FsbGJhY2s7XG5cdFx0XHRjYWxsYmFjayA9IGRhdGE7XG5cdFx0XHRkYXRhID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIFRoZSB1cmwgY2FuIGJlIGFuIG9wdGlvbnMgb2JqZWN0ICh3aGljaCB0aGVuIG11c3QgaGF2ZSAudXJsKVxuXHRcdHJldHVybiBqUXVlcnkuYWpheCggalF1ZXJ5LmV4dGVuZCgge1xuXHRcdFx0dXJsOiB1cmwsXG5cdFx0XHR0eXBlOiBtZXRob2QsXG5cdFx0XHRkYXRhVHlwZTogdHlwZSxcblx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRzdWNjZXNzOiBjYWxsYmFja1xuXHRcdH0sIGpRdWVyeS5pc1BsYWluT2JqZWN0KCB1cmwgKSAmJiB1cmwgKSApO1xuXHR9O1xufSApO1xuXG5cbmpRdWVyeS5fZXZhbFVybCA9IGZ1bmN0aW9uKCB1cmwgKSB7XG5cdHJldHVybiBqUXVlcnkuYWpheCgge1xuXHRcdHVybDogdXJsLFxuXG5cdFx0Ly8gTWFrZSB0aGlzIGV4cGxpY2l0LCBzaW5jZSB1c2VyIGNhbiBvdmVycmlkZSB0aGlzIHRocm91Z2ggYWpheFNldHVwICgjMTEyNjQpXG5cdFx0dHlwZTogXCJHRVRcIixcblx0XHRkYXRhVHlwZTogXCJzY3JpcHRcIixcblx0XHRjYWNoZTogdHJ1ZSxcblx0XHRhc3luYzogZmFsc2UsXG5cdFx0Z2xvYmFsOiBmYWxzZSxcblx0XHRcInRocm93c1wiOiB0cnVlXG5cdH0gKTtcbn07XG5cblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHR3cmFwQWxsOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHR2YXIgd3JhcDtcblxuXHRcdGlmICggdGhpc1sgMCBdICkge1xuXHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggaHRtbCApICkge1xuXHRcdFx0XHRodG1sID0gaHRtbC5jYWxsKCB0aGlzWyAwIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVGhlIGVsZW1lbnRzIHRvIHdyYXAgdGhlIHRhcmdldCBhcm91bmRcblx0XHRcdHdyYXAgPSBqUXVlcnkoIGh0bWwsIHRoaXNbIDAgXS5vd25lckRvY3VtZW50ICkuZXEoIDAgKS5jbG9uZSggdHJ1ZSApO1xuXG5cdFx0XHRpZiAoIHRoaXNbIDAgXS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHR3cmFwLmluc2VydEJlZm9yZSggdGhpc1sgMCBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHdyYXAubWFwKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGVsZW0gPSB0aGlzO1xuXG5cdFx0XHRcdHdoaWxlICggZWxlbS5maXJzdEVsZW1lbnRDaGlsZCApIHtcblx0XHRcdFx0XHRlbGVtID0gZWxlbS5maXJzdEVsZW1lbnRDaGlsZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBlbGVtO1xuXHRcdFx0fSApLmFwcGVuZCggdGhpcyApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHdyYXBJbm5lcjogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggaHRtbCApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLndyYXBJbm5lciggaHRtbC5jYWxsKCB0aGlzLCBpICkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBzZWxmID0galF1ZXJ5KCB0aGlzICksXG5cdFx0XHRcdGNvbnRlbnRzID0gc2VsZi5jb250ZW50cygpO1xuXG5cdFx0XHRpZiAoIGNvbnRlbnRzLmxlbmd0aCApIHtcblx0XHRcdFx0Y29udGVudHMud3JhcEFsbCggaHRtbCApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZWxmLmFwcGVuZCggaHRtbCApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHR3cmFwOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHR2YXIgaXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCBodG1sICk7XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdGpRdWVyeSggdGhpcyApLndyYXBBbGwoIGlzRnVuY3Rpb24gPyBodG1sLmNhbGwoIHRoaXMsIGkgKSA6IGh0bWwgKTtcblx0XHR9ICk7XG5cdH0sXG5cblx0dW53cmFwOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dGhpcy5wYXJlbnQoIHNlbGVjdG9yICkubm90KCBcImJvZHlcIiApLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5KCB0aGlzICkucmVwbGFjZVdpdGgoIHRoaXMuY2hpbGROb2RlcyApO1xuXHRcdH0gKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufSApO1xuXG5cbmpRdWVyeS5leHByLnBzZXVkb3MuaGlkZGVuID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdHJldHVybiAhalF1ZXJ5LmV4cHIucHNldWRvcy52aXNpYmxlKCBlbGVtICk7XG59O1xualF1ZXJ5LmV4cHIucHNldWRvcy52aXNpYmxlID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdHJldHVybiAhISggZWxlbS5vZmZzZXRXaWR0aCB8fCBlbGVtLm9mZnNldEhlaWdodCB8fCBlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoICk7XG59O1xuXG5cblxuXG5qUXVlcnkuYWpheFNldHRpbmdzLnhociA9IGZ1bmN0aW9uKCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG5cdH0gY2F0Y2ggKCBlICkge31cbn07XG5cbnZhciB4aHJTdWNjZXNzU3RhdHVzID0ge1xuXG5cdFx0Ly8gRmlsZSBwcm90b2NvbCBhbHdheXMgeWllbGRzIHN0YXR1cyBjb2RlIDAsIGFzc3VtZSAyMDBcblx0XHQwOiAyMDAsXG5cblx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuXHRcdC8vICMxNDUwOiBzb21ldGltZXMgSUUgcmV0dXJucyAxMjIzIHdoZW4gaXQgc2hvdWxkIGJlIDIwNFxuXHRcdDEyMjM6IDIwNFxuXHR9LFxuXHR4aHJTdXBwb3J0ZWQgPSBqUXVlcnkuYWpheFNldHRpbmdzLnhocigpO1xuXG5zdXBwb3J0LmNvcnMgPSAhIXhoclN1cHBvcnRlZCAmJiAoIFwid2l0aENyZWRlbnRpYWxzXCIgaW4geGhyU3VwcG9ydGVkICk7XG5zdXBwb3J0LmFqYXggPSB4aHJTdXBwb3J0ZWQgPSAhIXhoclN1cHBvcnRlZDtcblxualF1ZXJ5LmFqYXhUcmFuc3BvcnQoIGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXHR2YXIgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2s7XG5cblx0Ly8gQ3Jvc3MgZG9tYWluIG9ubHkgYWxsb3dlZCBpZiBzdXBwb3J0ZWQgdGhyb3VnaCBYTUxIdHRwUmVxdWVzdFxuXHRpZiAoIHN1cHBvcnQuY29ycyB8fCB4aHJTdXBwb3J0ZWQgJiYgIW9wdGlvbnMuY3Jvc3NEb21haW4gKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNlbmQ6IGZ1bmN0aW9uKCBoZWFkZXJzLCBjb21wbGV0ZSApIHtcblx0XHRcdFx0dmFyIGksXG5cdFx0XHRcdFx0eGhyID0gb3B0aW9ucy54aHIoKTtcblxuXHRcdFx0XHR4aHIub3Blbihcblx0XHRcdFx0XHRvcHRpb25zLnR5cGUsXG5cdFx0XHRcdFx0b3B0aW9ucy51cmwsXG5cdFx0XHRcdFx0b3B0aW9ucy5hc3luYyxcblx0XHRcdFx0XHRvcHRpb25zLnVzZXJuYW1lLFxuXHRcdFx0XHRcdG9wdGlvbnMucGFzc3dvcmRcblx0XHRcdFx0KTtcblxuXHRcdFx0XHQvLyBBcHBseSBjdXN0b20gZmllbGRzIGlmIHByb3ZpZGVkXG5cdFx0XHRcdGlmICggb3B0aW9ucy54aHJGaWVsZHMgKSB7XG5cdFx0XHRcdFx0Zm9yICggaSBpbiBvcHRpb25zLnhockZpZWxkcyApIHtcblx0XHRcdFx0XHRcdHhoclsgaSBdID0gb3B0aW9ucy54aHJGaWVsZHNbIGkgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBPdmVycmlkZSBtaW1lIHR5cGUgaWYgbmVlZGVkXG5cdFx0XHRcdGlmICggb3B0aW9ucy5taW1lVHlwZSAmJiB4aHIub3ZlcnJpZGVNaW1lVHlwZSApIHtcblx0XHRcdFx0XHR4aHIub3ZlcnJpZGVNaW1lVHlwZSggb3B0aW9ucy5taW1lVHlwZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gWC1SZXF1ZXN0ZWQtV2l0aCBoZWFkZXJcblx0XHRcdFx0Ly8gRm9yIGNyb3NzLWRvbWFpbiByZXF1ZXN0cywgc2VlaW5nIGFzIGNvbmRpdGlvbnMgZm9yIGEgcHJlZmxpZ2h0IGFyZVxuXHRcdFx0XHQvLyBha2luIHRvIGEgamlnc2F3IHB1enpsZSwgd2Ugc2ltcGx5IG5ldmVyIHNldCBpdCB0byBiZSBzdXJlLlxuXHRcdFx0XHQvLyAoaXQgY2FuIGFsd2F5cyBiZSBzZXQgb24gYSBwZXItcmVxdWVzdCBiYXNpcyBvciBldmVuIHVzaW5nIGFqYXhTZXR1cClcblx0XHRcdFx0Ly8gRm9yIHNhbWUtZG9tYWluIHJlcXVlc3RzLCB3b24ndCBjaGFuZ2UgaGVhZGVyIGlmIGFscmVhZHkgcHJvdmlkZWQuXG5cdFx0XHRcdGlmICggIW9wdGlvbnMuY3Jvc3NEb21haW4gJiYgIWhlYWRlcnNbIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiIF0gKSB7XG5cdFx0XHRcdFx0aGVhZGVyc1sgXCJYLVJlcXVlc3RlZC1XaXRoXCIgXSA9IFwiWE1MSHR0cFJlcXVlc3RcIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFNldCBoZWFkZXJzXG5cdFx0XHRcdGZvciAoIGkgaW4gaGVhZGVycyApIHtcblx0XHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlciggaSwgaGVhZGVyc1sgaSBdICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDYWxsYmFja1xuXHRcdFx0XHRjYWxsYmFjayA9IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrID0gZXJyb3JDYWxsYmFjayA9IHhoci5vbmxvYWQgPVxuXHRcdFx0XHRcdFx0XHRcdHhoci5vbmVycm9yID0geGhyLm9uYWJvcnQgPSB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcblxuXHRcdFx0XHRcdFx0XHRpZiAoIHR5cGUgPT09IFwiYWJvcnRcIiApIHtcblx0XHRcdFx0XHRcdFx0XHR4aHIuYWJvcnQoKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggdHlwZSA9PT0gXCJlcnJvclwiICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD05IG9ubHlcblx0XHRcdFx0XHRcdFx0XHQvLyBPbiBhIG1hbnVhbCBuYXRpdmUgYWJvcnQsIElFOSB0aHJvd3Ncblx0XHRcdFx0XHRcdFx0XHQvLyBlcnJvcnMgb24gYW55IHByb3BlcnR5IGFjY2VzcyB0aGF0IGlzIG5vdCByZWFkeVN0YXRlXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCB0eXBlb2YgeGhyLnN0YXR1cyAhPT0gXCJudW1iZXJcIiApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlKCAwLCBcImVycm9yXCIgKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29tcGxldGUoXG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRmlsZTogcHJvdG9jb2wgYWx3YXlzIHlpZWxkcyBzdGF0dXMgMDsgc2VlICM4NjA1LCAjMTQyMDdcblx0XHRcdFx0XHRcdFx0XHRcdFx0eGhyLnN0YXR1cyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0eGhyLnN0YXR1c1RleHRcblx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGNvbXBsZXRlKFxuXHRcdFx0XHRcdFx0XHRcdFx0eGhyU3VjY2Vzc1N0YXR1c1sgeGhyLnN0YXR1cyBdIHx8IHhoci5zdGF0dXMsXG5cdFx0XHRcdFx0XHRcdFx0XHR4aHIuc3RhdHVzVGV4dCxcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD05IG9ubHlcblx0XHRcdFx0XHRcdFx0XHRcdC8vIElFOSBoYXMgbm8gWEhSMiBidXQgdGhyb3dzIG9uIGJpbmFyeSAodHJhYy0xMTQyNilcblx0XHRcdFx0XHRcdFx0XHRcdC8vIEZvciBYSFIyIG5vbi10ZXh0LCBsZXQgdGhlIGNhbGxlciBoYW5kbGUgaXQgKGdoLTI0OTgpXG5cdFx0XHRcdFx0XHRcdFx0XHQoIHhoci5yZXNwb25zZVR5cGUgfHwgXCJ0ZXh0XCIgKSAhPT0gXCJ0ZXh0XCIgIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlb2YgeGhyLnJlc3BvbnNlVGV4dCAhPT0gXCJzdHJpbmdcIiA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHsgYmluYXJ5OiB4aHIucmVzcG9uc2UgfSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHsgdGV4dDogeGhyLnJlc3BvbnNlVGV4dCB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0eGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Ly8gTGlzdGVuIHRvIGV2ZW50c1xuXHRcdFx0XHR4aHIub25sb2FkID0gY2FsbGJhY2soKTtcblx0XHRcdFx0ZXJyb3JDYWxsYmFjayA9IHhoci5vbmVycm9yID0gY2FsbGJhY2soIFwiZXJyb3JcIiApO1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDkgb25seVxuXHRcdFx0XHQvLyBVc2Ugb25yZWFkeXN0YXRlY2hhbmdlIHRvIHJlcGxhY2Ugb25hYm9ydFxuXHRcdFx0XHQvLyB0byBoYW5kbGUgdW5jYXVnaHQgYWJvcnRzXG5cdFx0XHRcdGlmICggeGhyLm9uYWJvcnQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHR4aHIub25hYm9ydCA9IGVycm9yQ2FsbGJhY2s7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHQvLyBDaGVjayByZWFkeVN0YXRlIGJlZm9yZSB0aW1lb3V0IGFzIGl0IGNoYW5nZXNcblx0XHRcdFx0XHRcdGlmICggeGhyLnJlYWR5U3RhdGUgPT09IDQgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQWxsb3cgb25lcnJvciB0byBiZSBjYWxsZWQgZmlyc3QsXG5cdFx0XHRcdFx0XHRcdC8vIGJ1dCB0aGF0IHdpbGwgbm90IGhhbmRsZSBhIG5hdGl2ZSBhYm9ydFxuXHRcdFx0XHRcdFx0XHQvLyBBbHNvLCBzYXZlIGVycm9yQ2FsbGJhY2sgdG8gYSB2YXJpYWJsZVxuXHRcdFx0XHRcdFx0XHQvLyBhcyB4aHIub25lcnJvciBjYW5ub3QgYmUgYWNjZXNzZWRcblx0XHRcdFx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRlcnJvckNhbGxiYWNrKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENyZWF0ZSB0aGUgYWJvcnQgY2FsbGJhY2tcblx0XHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayggXCJhYm9ydFwiICk7XG5cblx0XHRcdFx0dHJ5IHtcblxuXHRcdFx0XHRcdC8vIERvIHNlbmQgdGhlIHJlcXVlc3QgKHRoaXMgbWF5IHJhaXNlIGFuIGV4Y2VwdGlvbilcblx0XHRcdFx0XHR4aHIuc2VuZCggb3B0aW9ucy5oYXNDb250ZW50ICYmIG9wdGlvbnMuZGF0YSB8fCBudWxsICk7XG5cdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdFx0Ly8gIzE0NjgzOiBPbmx5IHJldGhyb3cgaWYgdGhpcyBoYXNuJ3QgYmVlbiBub3RpZmllZCBhcyBhbiBlcnJvciB5ZXRcblx0XHRcdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdGFib3J0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRjYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufSApO1xuXG5cblxuXG4vLyBQcmV2ZW50IGF1dG8tZXhlY3V0aW9uIG9mIHNjcmlwdHMgd2hlbiBubyBleHBsaWNpdCBkYXRhVHlwZSB3YXMgcHJvdmlkZWQgKFNlZSBnaC0yNDMyKVxualF1ZXJ5LmFqYXhQcmVmaWx0ZXIoIGZ1bmN0aW9uKCBzICkge1xuXHRpZiAoIHMuY3Jvc3NEb21haW4gKSB7XG5cdFx0cy5jb250ZW50cy5zY3JpcHQgPSBmYWxzZTtcblx0fVxufSApO1xuXG4vLyBJbnN0YWxsIHNjcmlwdCBkYXRhVHlwZVxualF1ZXJ5LmFqYXhTZXR1cCgge1xuXHRhY2NlcHRzOiB7XG5cdFx0c2NyaXB0OiBcInRleHQvamF2YXNjcmlwdCwgYXBwbGljYXRpb24vamF2YXNjcmlwdCwgXCIgK1xuXHRcdFx0XCJhcHBsaWNhdGlvbi9lY21hc2NyaXB0LCBhcHBsaWNhdGlvbi94LWVjbWFzY3JpcHRcIlxuXHR9LFxuXHRjb250ZW50czoge1xuXHRcdHNjcmlwdDogL1xcYig/OmphdmF8ZWNtYSlzY3JpcHRcXGIvXG5cdH0sXG5cdGNvbnZlcnRlcnM6IHtcblx0XHRcInRleHQgc2NyaXB0XCI6IGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdFx0alF1ZXJ5Lmdsb2JhbEV2YWwoIHRleHQgKTtcblx0XHRcdHJldHVybiB0ZXh0O1xuXHRcdH1cblx0fVxufSApO1xuXG4vLyBIYW5kbGUgY2FjaGUncyBzcGVjaWFsIGNhc2UgYW5kIGNyb3NzRG9tYWluXG5qUXVlcnkuYWpheFByZWZpbHRlciggXCJzY3JpcHRcIiwgZnVuY3Rpb24oIHMgKSB7XG5cdGlmICggcy5jYWNoZSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdHMuY2FjaGUgPSBmYWxzZTtcblx0fVxuXHRpZiAoIHMuY3Jvc3NEb21haW4gKSB7XG5cdFx0cy50eXBlID0gXCJHRVRcIjtcblx0fVxufSApO1xuXG4vLyBCaW5kIHNjcmlwdCB0YWcgaGFjayB0cmFuc3BvcnRcbmpRdWVyeS5hamF4VHJhbnNwb3J0KCBcInNjcmlwdFwiLCBmdW5jdGlvbiggcyApIHtcblxuXHQvLyBUaGlzIHRyYW5zcG9ydCBvbmx5IGRlYWxzIHdpdGggY3Jvc3MgZG9tYWluIHJlcXVlc3RzXG5cdGlmICggcy5jcm9zc0RvbWFpbiApIHtcblx0XHR2YXIgc2NyaXB0LCBjYWxsYmFjaztcblx0XHRyZXR1cm4ge1xuXHRcdFx0c2VuZDogZnVuY3Rpb24oIF8sIGNvbXBsZXRlICkge1xuXHRcdFx0XHRzY3JpcHQgPSBqUXVlcnkoIFwiPHNjcmlwdD5cIiApLnByb3AoIHtcblx0XHRcdFx0XHRjaGFyc2V0OiBzLnNjcmlwdENoYXJzZXQsXG5cdFx0XHRcdFx0c3JjOiBzLnVybFxuXHRcdFx0XHR9ICkub24oXG5cdFx0XHRcdFx0XCJsb2FkIGVycm9yXCIsXG5cdFx0XHRcdFx0Y2FsbGJhY2sgPSBmdW5jdGlvbiggZXZ0ICkge1xuXHRcdFx0XHRcdFx0c2NyaXB0LnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSBudWxsO1xuXHRcdFx0XHRcdFx0aWYgKCBldnQgKSB7XG5cdFx0XHRcdFx0XHRcdGNvbXBsZXRlKCBldnQudHlwZSA9PT0gXCJlcnJvclwiID8gNDA0IDogMjAwLCBldnQudHlwZSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblxuXHRcdFx0XHQvLyBVc2UgbmF0aXZlIERPTSBtYW5pcHVsYXRpb24gdG8gYXZvaWQgb3VyIGRvbU1hbmlwIEFKQVggdHJpY2tlcnlcblx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCggc2NyaXB0WyAwIF0gKTtcblx0XHRcdH0sXG5cdFx0XHRhYm9ydDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2sgKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0gKTtcblxuXG5cblxudmFyIG9sZENhbGxiYWNrcyA9IFtdLFxuXHRyanNvbnAgPSAvKD0pXFw/KD89JnwkKXxcXD9cXD8vO1xuXG4vLyBEZWZhdWx0IGpzb25wIHNldHRpbmdzXG5qUXVlcnkuYWpheFNldHVwKCB7XG5cdGpzb25wOiBcImNhbGxiYWNrXCIsXG5cdGpzb25wQ2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBjYWxsYmFjayA9IG9sZENhbGxiYWNrcy5wb3AoKSB8fCAoIGpRdWVyeS5leHBhbmRvICsgXCJfXCIgKyAoIG5vbmNlKysgKSApO1xuXHRcdHRoaXNbIGNhbGxiYWNrIF0gPSB0cnVlO1xuXHRcdHJldHVybiBjYWxsYmFjaztcblx0fVxufSApO1xuXG4vLyBEZXRlY3QsIG5vcm1hbGl6ZSBvcHRpb25zIGFuZCBpbnN0YWxsIGNhbGxiYWNrcyBmb3IganNvbnAgcmVxdWVzdHNcbmpRdWVyeS5hamF4UHJlZmlsdGVyKCBcImpzb24ganNvbnBcIiwgZnVuY3Rpb24oIHMsIG9yaWdpbmFsU2V0dGluZ3MsIGpxWEhSICkge1xuXG5cdHZhciBjYWxsYmFja05hbWUsIG92ZXJ3cml0dGVuLCByZXNwb25zZUNvbnRhaW5lcixcblx0XHRqc29uUHJvcCA9IHMuanNvbnAgIT09IGZhbHNlICYmICggcmpzb25wLnRlc3QoIHMudXJsICkgP1xuXHRcdFx0XCJ1cmxcIiA6XG5cdFx0XHR0eXBlb2Ygcy5kYXRhID09PSBcInN0cmluZ1wiICYmXG5cdFx0XHRcdCggcy5jb250ZW50VHlwZSB8fCBcIlwiIClcblx0XHRcdFx0XHQuaW5kZXhPZiggXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIiApID09PSAwICYmXG5cdFx0XHRcdHJqc29ucC50ZXN0KCBzLmRhdGEgKSAmJiBcImRhdGFcIlxuXHRcdCk7XG5cblx0Ly8gSGFuZGxlIGlmZiB0aGUgZXhwZWN0ZWQgZGF0YSB0eXBlIGlzIFwianNvbnBcIiBvciB3ZSBoYXZlIGEgcGFyYW1ldGVyIHRvIHNldFxuXHRpZiAoIGpzb25Qcm9wIHx8IHMuZGF0YVR5cGVzWyAwIF0gPT09IFwianNvbnBcIiApIHtcblxuXHRcdC8vIEdldCBjYWxsYmFjayBuYW1lLCByZW1lbWJlcmluZyBwcmVleGlzdGluZyB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggaXRcblx0XHRjYWxsYmFja05hbWUgPSBzLmpzb25wQ2FsbGJhY2sgPSBqUXVlcnkuaXNGdW5jdGlvbiggcy5qc29ucENhbGxiYWNrICkgP1xuXHRcdFx0cy5qc29ucENhbGxiYWNrKCkgOlxuXHRcdFx0cy5qc29ucENhbGxiYWNrO1xuXG5cdFx0Ly8gSW5zZXJ0IGNhbGxiYWNrIGludG8gdXJsIG9yIGZvcm0gZGF0YVxuXHRcdGlmICgganNvblByb3AgKSB7XG5cdFx0XHRzWyBqc29uUHJvcCBdID0gc1sganNvblByb3AgXS5yZXBsYWNlKCByanNvbnAsIFwiJDFcIiArIGNhbGxiYWNrTmFtZSApO1xuXHRcdH0gZWxzZSBpZiAoIHMuanNvbnAgIT09IGZhbHNlICkge1xuXHRcdFx0cy51cmwgKz0gKCBycXVlcnkudGVzdCggcy51cmwgKSA/IFwiJlwiIDogXCI/XCIgKSArIHMuanNvbnAgKyBcIj1cIiArIGNhbGxiYWNrTmFtZTtcblx0XHR9XG5cblx0XHQvLyBVc2UgZGF0YSBjb252ZXJ0ZXIgdG8gcmV0cmlldmUganNvbiBhZnRlciBzY3JpcHQgZXhlY3V0aW9uXG5cdFx0cy5jb252ZXJ0ZXJzWyBcInNjcmlwdCBqc29uXCIgXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAhcmVzcG9uc2VDb250YWluZXIgKSB7XG5cdFx0XHRcdGpRdWVyeS5lcnJvciggY2FsbGJhY2tOYW1lICsgXCIgd2FzIG5vdCBjYWxsZWRcIiApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlQ29udGFpbmVyWyAwIF07XG5cdFx0fTtcblxuXHRcdC8vIEZvcmNlIGpzb24gZGF0YVR5cGVcblx0XHRzLmRhdGFUeXBlc1sgMCBdID0gXCJqc29uXCI7XG5cblx0XHQvLyBJbnN0YWxsIGNhbGxiYWNrXG5cdFx0b3ZlcndyaXR0ZW4gPSB3aW5kb3dbIGNhbGxiYWNrTmFtZSBdO1xuXHRcdHdpbmRvd1sgY2FsbGJhY2tOYW1lIF0gPSBmdW5jdGlvbigpIHtcblx0XHRcdHJlc3BvbnNlQ29udGFpbmVyID0gYXJndW1lbnRzO1xuXHRcdH07XG5cblx0XHQvLyBDbGVhbi11cCBmdW5jdGlvbiAoZmlyZXMgYWZ0ZXIgY29udmVydGVycylcblx0XHRqcVhIUi5hbHdheXMoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBJZiBwcmV2aW91cyB2YWx1ZSBkaWRuJ3QgZXhpc3QgLSByZW1vdmUgaXRcblx0XHRcdGlmICggb3ZlcndyaXR0ZW4gPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0alF1ZXJ5KCB3aW5kb3cgKS5yZW1vdmVQcm9wKCBjYWxsYmFja05hbWUgKTtcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIHJlc3RvcmUgcHJlZXhpc3RpbmcgdmFsdWVcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdpbmRvd1sgY2FsbGJhY2tOYW1lIF0gPSBvdmVyd3JpdHRlbjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2F2ZSBiYWNrIGFzIGZyZWVcblx0XHRcdGlmICggc1sgY2FsbGJhY2tOYW1lIF0gKSB7XG5cblx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoYXQgcmUtdXNpbmcgdGhlIG9wdGlvbnMgZG9lc24ndCBzY3JldyB0aGluZ3MgYXJvdW5kXG5cdFx0XHRcdHMuanNvbnBDYWxsYmFjayA9IG9yaWdpbmFsU2V0dGluZ3MuanNvbnBDYWxsYmFjaztcblxuXHRcdFx0XHQvLyBTYXZlIHRoZSBjYWxsYmFjayBuYW1lIGZvciBmdXR1cmUgdXNlXG5cdFx0XHRcdG9sZENhbGxiYWNrcy5wdXNoKCBjYWxsYmFja05hbWUgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2FsbCBpZiBpdCB3YXMgYSBmdW5jdGlvbiBhbmQgd2UgaGF2ZSBhIHJlc3BvbnNlXG5cdFx0XHRpZiAoIHJlc3BvbnNlQ29udGFpbmVyICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCBvdmVyd3JpdHRlbiApICkge1xuXHRcdFx0XHRvdmVyd3JpdHRlbiggcmVzcG9uc2VDb250YWluZXJbIDAgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXNwb25zZUNvbnRhaW5lciA9IG92ZXJ3cml0dGVuID0gdW5kZWZpbmVkO1xuXHRcdH0gKTtcblxuXHRcdC8vIERlbGVnYXRlIHRvIHNjcmlwdFxuXHRcdHJldHVybiBcInNjcmlwdFwiO1xuXHR9XG59ICk7XG5cblxuXG5cbi8vIFN1cHBvcnQ6IFNhZmFyaSA4IG9ubHlcbi8vIEluIFNhZmFyaSA4IGRvY3VtZW50cyBjcmVhdGVkIHZpYSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnRcbi8vIGNvbGxhcHNlIHNpYmxpbmcgZm9ybXM6IHRoZSBzZWNvbmQgb25lIGJlY29tZXMgYSBjaGlsZCBvZiB0aGUgZmlyc3Qgb25lLlxuLy8gQmVjYXVzZSBvZiB0aGF0LCB0aGlzIHNlY3VyaXR5IG1lYXN1cmUgaGFzIHRvIGJlIGRpc2FibGVkIGluIFNhZmFyaSA4LlxuLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNzMzN1xuc3VwcG9ydC5jcmVhdGVIVE1MRG9jdW1lbnQgPSAoIGZ1bmN0aW9uKCkge1xuXHR2YXIgYm9keSA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCggXCJcIiApLmJvZHk7XG5cdGJvZHkuaW5uZXJIVE1MID0gXCI8Zm9ybT48L2Zvcm0+PGZvcm0+PC9mb3JtPlwiO1xuXHRyZXR1cm4gYm9keS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMjtcbn0gKSgpO1xuXG5cbi8vIEFyZ3VtZW50IFwiZGF0YVwiIHNob3VsZCBiZSBzdHJpbmcgb2YgaHRtbFxuLy8gY29udGV4dCAob3B0aW9uYWwpOiBJZiBzcGVjaWZpZWQsIHRoZSBmcmFnbWVudCB3aWxsIGJlIGNyZWF0ZWQgaW4gdGhpcyBjb250ZXh0LFxuLy8gZGVmYXVsdHMgdG8gZG9jdW1lbnRcbi8vIGtlZXBTY3JpcHRzIChvcHRpb25hbCk6IElmIHRydWUsIHdpbGwgaW5jbHVkZSBzY3JpcHRzIHBhc3NlZCBpbiB0aGUgaHRtbCBzdHJpbmdcbmpRdWVyeS5wYXJzZUhUTUwgPSBmdW5jdGlvbiggZGF0YSwgY29udGV4dCwga2VlcFNjcmlwdHMgKSB7XG5cdGlmICggdHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdGtlZXBTY3JpcHRzID0gY29udGV4dDtcblx0XHRjb250ZXh0ID0gZmFsc2U7XG5cdH1cblxuXHR2YXIgYmFzZSwgcGFyc2VkLCBzY3JpcHRzO1xuXG5cdGlmICggIWNvbnRleHQgKSB7XG5cblx0XHQvLyBTdG9wIHNjcmlwdHMgb3IgaW5saW5lIGV2ZW50IGhhbmRsZXJzIGZyb20gYmVpbmcgZXhlY3V0ZWQgaW1tZWRpYXRlbHlcblx0XHQvLyBieSB1c2luZyBkb2N1bWVudC5pbXBsZW1lbnRhdGlvblxuXHRcdGlmICggc3VwcG9ydC5jcmVhdGVIVE1MRG9jdW1lbnQgKSB7XG5cdFx0XHRjb250ZXh0ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCBcIlwiICk7XG5cblx0XHRcdC8vIFNldCB0aGUgYmFzZSBocmVmIGZvciB0aGUgY3JlYXRlZCBkb2N1bWVudFxuXHRcdFx0Ly8gc28gYW55IHBhcnNlZCBlbGVtZW50cyB3aXRoIFVSTHNcblx0XHRcdC8vIGFyZSBiYXNlZCBvbiB0aGUgZG9jdW1lbnQncyBVUkwgKGdoLTI5NjUpXG5cdFx0XHRiYXNlID0gY29udGV4dC5jcmVhdGVFbGVtZW50KCBcImJhc2VcIiApO1xuXHRcdFx0YmFzZS5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcblx0XHRcdGNvbnRleHQuaGVhZC5hcHBlbmRDaGlsZCggYmFzZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb250ZXh0ID0gZG9jdW1lbnQ7XG5cdFx0fVxuXHR9XG5cblx0cGFyc2VkID0gcnNpbmdsZVRhZy5leGVjKCBkYXRhICk7XG5cdHNjcmlwdHMgPSAha2VlcFNjcmlwdHMgJiYgW107XG5cblx0Ly8gU2luZ2xlIHRhZ1xuXHRpZiAoIHBhcnNlZCApIHtcblx0XHRyZXR1cm4gWyBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIHBhcnNlZFsgMSBdICkgXTtcblx0fVxuXG5cdHBhcnNlZCA9IGJ1aWxkRnJhZ21lbnQoIFsgZGF0YSBdLCBjb250ZXh0LCBzY3JpcHRzICk7XG5cblx0aWYgKCBzY3JpcHRzICYmIHNjcmlwdHMubGVuZ3RoICkge1xuXHRcdGpRdWVyeSggc2NyaXB0cyApLnJlbW92ZSgpO1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeS5tZXJnZSggW10sIHBhcnNlZC5jaGlsZE5vZGVzICk7XG59O1xuXG5cbi8qKlxuICogTG9hZCBhIHVybCBpbnRvIGEgcGFnZVxuICovXG5qUXVlcnkuZm4ubG9hZCA9IGZ1bmN0aW9uKCB1cmwsIHBhcmFtcywgY2FsbGJhY2sgKSB7XG5cdHZhciBzZWxlY3RvciwgdHlwZSwgcmVzcG9uc2UsXG5cdFx0c2VsZiA9IHRoaXMsXG5cdFx0b2ZmID0gdXJsLmluZGV4T2YoIFwiIFwiICk7XG5cblx0aWYgKCBvZmYgPiAtMSApIHtcblx0XHRzZWxlY3RvciA9IHN0cmlwQW5kQ29sbGFwc2UoIHVybC5zbGljZSggb2ZmICkgKTtcblx0XHR1cmwgPSB1cmwuc2xpY2UoIDAsIG9mZiApO1xuXHR9XG5cblx0Ly8gSWYgaXQncyBhIGZ1bmN0aW9uXG5cdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHBhcmFtcyApICkge1xuXG5cdFx0Ly8gV2UgYXNzdW1lIHRoYXQgaXQncyB0aGUgY2FsbGJhY2tcblx0XHRjYWxsYmFjayA9IHBhcmFtcztcblx0XHRwYXJhbXMgPSB1bmRlZmluZWQ7XG5cblx0Ly8gT3RoZXJ3aXNlLCBidWlsZCBhIHBhcmFtIHN0cmluZ1xuXHR9IGVsc2UgaWYgKCBwYXJhbXMgJiYgdHlwZW9mIHBhcmFtcyA9PT0gXCJvYmplY3RcIiApIHtcblx0XHR0eXBlID0gXCJQT1NUXCI7XG5cdH1cblxuXHQvLyBJZiB3ZSBoYXZlIGVsZW1lbnRzIHRvIG1vZGlmeSwgbWFrZSB0aGUgcmVxdWVzdFxuXHRpZiAoIHNlbGYubGVuZ3RoID4gMCApIHtcblx0XHRqUXVlcnkuYWpheCgge1xuXHRcdFx0dXJsOiB1cmwsXG5cblx0XHRcdC8vIElmIFwidHlwZVwiIHZhcmlhYmxlIGlzIHVuZGVmaW5lZCwgdGhlbiBcIkdFVFwiIG1ldGhvZCB3aWxsIGJlIHVzZWQuXG5cdFx0XHQvLyBNYWtlIHZhbHVlIG9mIHRoaXMgZmllbGQgZXhwbGljaXQgc2luY2Vcblx0XHRcdC8vIHVzZXIgY2FuIG92ZXJyaWRlIGl0IHRocm91Z2ggYWpheFNldHVwIG1ldGhvZFxuXHRcdFx0dHlwZTogdHlwZSB8fCBcIkdFVFwiLFxuXHRcdFx0ZGF0YVR5cGU6IFwiaHRtbFwiLFxuXHRcdFx0ZGF0YTogcGFyYW1zXG5cdFx0fSApLmRvbmUoIGZ1bmN0aW9uKCByZXNwb25zZVRleHQgKSB7XG5cblx0XHRcdC8vIFNhdmUgcmVzcG9uc2UgZm9yIHVzZSBpbiBjb21wbGV0ZSBjYWxsYmFja1xuXHRcdFx0cmVzcG9uc2UgPSBhcmd1bWVudHM7XG5cblx0XHRcdHNlbGYuaHRtbCggc2VsZWN0b3IgP1xuXG5cdFx0XHRcdC8vIElmIGEgc2VsZWN0b3Igd2FzIHNwZWNpZmllZCwgbG9jYXRlIHRoZSByaWdodCBlbGVtZW50cyBpbiBhIGR1bW15IGRpdlxuXHRcdFx0XHQvLyBFeGNsdWRlIHNjcmlwdHMgdG8gYXZvaWQgSUUgJ1Blcm1pc3Npb24gRGVuaWVkJyBlcnJvcnNcblx0XHRcdFx0alF1ZXJ5KCBcIjxkaXY+XCIgKS5hcHBlbmQoIGpRdWVyeS5wYXJzZUhUTUwoIHJlc3BvbnNlVGV4dCApICkuZmluZCggc2VsZWN0b3IgKSA6XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIHVzZSB0aGUgZnVsbCByZXN1bHRcblx0XHRcdFx0cmVzcG9uc2VUZXh0ICk7XG5cblx0XHQvLyBJZiB0aGUgcmVxdWVzdCBzdWNjZWVkcywgdGhpcyBmdW5jdGlvbiBnZXRzIFwiZGF0YVwiLCBcInN0YXR1c1wiLCBcImpxWEhSXCJcblx0XHQvLyBidXQgdGhleSBhcmUgaWdub3JlZCBiZWNhdXNlIHJlc3BvbnNlIHdhcyBzZXQgYWJvdmUuXG5cdFx0Ly8gSWYgaXQgZmFpbHMsIHRoaXMgZnVuY3Rpb24gZ2V0cyBcImpxWEhSXCIsIFwic3RhdHVzXCIsIFwiZXJyb3JcIlxuXHRcdH0gKS5hbHdheXMoIGNhbGxiYWNrICYmIGZ1bmN0aW9uKCBqcVhIUiwgc3RhdHVzICkge1xuXHRcdFx0c2VsZi5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y2FsbGJhY2suYXBwbHkoIHRoaXMsIHJlc3BvbnNlIHx8IFsganFYSFIucmVzcG9uc2VUZXh0LCBzdGF0dXMsIGpxWEhSIF0gKTtcblx0XHRcdH0gKTtcblx0XHR9ICk7XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn07XG5cblxuXG5cbi8vIEF0dGFjaCBhIGJ1bmNoIG9mIGZ1bmN0aW9ucyBmb3IgaGFuZGxpbmcgY29tbW9uIEFKQVggZXZlbnRzXG5qUXVlcnkuZWFjaCggW1xuXHRcImFqYXhTdGFydFwiLFxuXHRcImFqYXhTdG9wXCIsXG5cdFwiYWpheENvbXBsZXRlXCIsXG5cdFwiYWpheEVycm9yXCIsXG5cdFwiYWpheFN1Y2Nlc3NcIixcblx0XCJhamF4U2VuZFwiXG5dLCBmdW5jdGlvbiggaSwgdHlwZSApIHtcblx0alF1ZXJ5LmZuWyB0eXBlIF0gPSBmdW5jdGlvbiggZm4gKSB7XG5cdFx0cmV0dXJuIHRoaXMub24oIHR5cGUsIGZuICk7XG5cdH07XG59ICk7XG5cblxuXG5cbmpRdWVyeS5leHByLnBzZXVkb3MuYW5pbWF0ZWQgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0cmV0dXJuIGpRdWVyeS5ncmVwKCBqUXVlcnkudGltZXJzLCBmdW5jdGlvbiggZm4gKSB7XG5cdFx0cmV0dXJuIGVsZW0gPT09IGZuLmVsZW07XG5cdH0gKS5sZW5ndGg7XG59O1xuXG5cblxuXG4vKipcbiAqIEdldHMgYSB3aW5kb3cgZnJvbSBhbiBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGdldFdpbmRvdyggZWxlbSApIHtcblx0cmV0dXJuIGpRdWVyeS5pc1dpbmRvdyggZWxlbSApID8gZWxlbSA6IGVsZW0ubm9kZVR5cGUgPT09IDkgJiYgZWxlbS5kZWZhdWx0Vmlldztcbn1cblxualF1ZXJ5Lm9mZnNldCA9IHtcblx0c2V0T2Zmc2V0OiBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucywgaSApIHtcblx0XHR2YXIgY3VyUG9zaXRpb24sIGN1ckxlZnQsIGN1ckNTU1RvcCwgY3VyVG9wLCBjdXJPZmZzZXQsIGN1ckNTU0xlZnQsIGNhbGN1bGF0ZVBvc2l0aW9uLFxuXHRcdFx0cG9zaXRpb24gPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBvc2l0aW9uXCIgKSxcblx0XHRcdGN1ckVsZW0gPSBqUXVlcnkoIGVsZW0gKSxcblx0XHRcdHByb3BzID0ge307XG5cblx0XHQvLyBTZXQgcG9zaXRpb24gZmlyc3QsIGluLWNhc2UgdG9wL2xlZnQgYXJlIHNldCBldmVuIG9uIHN0YXRpYyBlbGVtXG5cdFx0aWYgKCBwb3NpdGlvbiA9PT0gXCJzdGF0aWNcIiApIHtcblx0XHRcdGVsZW0uc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG5cdFx0fVxuXG5cdFx0Y3VyT2Zmc2V0ID0gY3VyRWxlbS5vZmZzZXQoKTtcblx0XHRjdXJDU1NUb3AgPSBqUXVlcnkuY3NzKCBlbGVtLCBcInRvcFwiICk7XG5cdFx0Y3VyQ1NTTGVmdCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwibGVmdFwiICk7XG5cdFx0Y2FsY3VsYXRlUG9zaXRpb24gPSAoIHBvc2l0aW9uID09PSBcImFic29sdXRlXCIgfHwgcG9zaXRpb24gPT09IFwiZml4ZWRcIiApICYmXG5cdFx0XHQoIGN1ckNTU1RvcCArIGN1ckNTU0xlZnQgKS5pbmRleE9mKCBcImF1dG9cIiApID4gLTE7XG5cblx0XHQvLyBOZWVkIHRvIGJlIGFibGUgdG8gY2FsY3VsYXRlIHBvc2l0aW9uIGlmIGVpdGhlclxuXHRcdC8vIHRvcCBvciBsZWZ0IGlzIGF1dG8gYW5kIHBvc2l0aW9uIGlzIGVpdGhlciBhYnNvbHV0ZSBvciBmaXhlZFxuXHRcdGlmICggY2FsY3VsYXRlUG9zaXRpb24gKSB7XG5cdFx0XHRjdXJQb3NpdGlvbiA9IGN1ckVsZW0ucG9zaXRpb24oKTtcblx0XHRcdGN1clRvcCA9IGN1clBvc2l0aW9uLnRvcDtcblx0XHRcdGN1ckxlZnQgPSBjdXJQb3NpdGlvbi5sZWZ0O1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1clRvcCA9IHBhcnNlRmxvYXQoIGN1ckNTU1RvcCApIHx8IDA7XG5cdFx0XHRjdXJMZWZ0ID0gcGFyc2VGbG9hdCggY3VyQ1NTTGVmdCApIHx8IDA7XG5cdFx0fVxuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggb3B0aW9ucyApICkge1xuXG5cdFx0XHQvLyBVc2UgalF1ZXJ5LmV4dGVuZCBoZXJlIHRvIGFsbG93IG1vZGlmaWNhdGlvbiBvZiBjb29yZGluYXRlcyBhcmd1bWVudCAoZ2gtMTg0OClcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zLmNhbGwoIGVsZW0sIGksIGpRdWVyeS5leHRlbmQoIHt9LCBjdXJPZmZzZXQgKSApO1xuXHRcdH1cblxuXHRcdGlmICggb3B0aW9ucy50b3AgIT0gbnVsbCApIHtcblx0XHRcdHByb3BzLnRvcCA9ICggb3B0aW9ucy50b3AgLSBjdXJPZmZzZXQudG9wICkgKyBjdXJUb3A7XG5cdFx0fVxuXHRcdGlmICggb3B0aW9ucy5sZWZ0ICE9IG51bGwgKSB7XG5cdFx0XHRwcm9wcy5sZWZ0ID0gKCBvcHRpb25zLmxlZnQgLSBjdXJPZmZzZXQubGVmdCApICsgY3VyTGVmdDtcblx0XHR9XG5cblx0XHRpZiAoIFwidXNpbmdcIiBpbiBvcHRpb25zICkge1xuXHRcdFx0b3B0aW9ucy51c2luZy5jYWxsKCBlbGVtLCBwcm9wcyApO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1ckVsZW0uY3NzKCBwcm9wcyApO1xuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRvZmZzZXQ6IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdFx0Ly8gUHJlc2VydmUgY2hhaW5pbmcgZm9yIHNldHRlclxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdHJldHVybiBvcHRpb25zID09PSB1bmRlZmluZWQgP1xuXHRcdFx0XHR0aGlzIDpcblx0XHRcdFx0dGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0XHRqUXVlcnkub2Zmc2V0LnNldE9mZnNldCggdGhpcywgb3B0aW9ucywgaSApO1xuXHRcdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0dmFyIGRvY0VsZW0sIHdpbiwgcmVjdCwgZG9jLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXTtcblxuXHRcdGlmICggIWVsZW0gKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdFx0Ly8gUnVubmluZyBnZXRCb3VuZGluZ0NsaWVudFJlY3Qgb24gYVxuXHRcdC8vIGRpc2Nvbm5lY3RlZCBub2RlIGluIElFIHRocm93cyBhbiBlcnJvclxuXHRcdGlmICggIWVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfTtcblx0XHR9XG5cblx0XHRyZWN0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdC8vIE1ha2Ugc3VyZSBlbGVtZW50IGlzIG5vdCBoaWRkZW4gKGRpc3BsYXk6IG5vbmUpXG5cdFx0aWYgKCByZWN0LndpZHRoIHx8IHJlY3QuaGVpZ2h0ICkge1xuXHRcdFx0ZG9jID0gZWxlbS5vd25lckRvY3VtZW50O1xuXHRcdFx0d2luID0gZ2V0V2luZG93KCBkb2MgKTtcblx0XHRcdGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0b3A6IHJlY3QudG9wICsgd2luLnBhZ2VZT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRUb3AsXG5cdFx0XHRcdGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldCAtIGRvY0VsZW0uY2xpZW50TGVmdFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4gemVyb3MgZm9yIGRpc2Nvbm5lY3RlZCBhbmQgaGlkZGVuIGVsZW1lbnRzIChnaC0yMzEwKVxuXHRcdHJldHVybiByZWN0O1xuXHR9LFxuXG5cdHBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRpZiAoICF0aGlzWyAwIF0gKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIG9mZnNldFBhcmVudCwgb2Zmc2V0LFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRcdHBhcmVudE9mZnNldCA9IHsgdG9wOiAwLCBsZWZ0OiAwIH07XG5cblx0XHQvLyBGaXhlZCBlbGVtZW50cyBhcmUgb2Zmc2V0IGZyb20gd2luZG93IChwYXJlbnRPZmZzZXQgPSB7dG9wOjAsIGxlZnQ6IDB9LFxuXHRcdC8vIGJlY2F1c2UgaXQgaXMgaXRzIG9ubHkgb2Zmc2V0IHBhcmVudFxuXHRcdGlmICggalF1ZXJ5LmNzcyggZWxlbSwgXCJwb3NpdGlvblwiICkgPT09IFwiZml4ZWRcIiApIHtcblxuXHRcdFx0Ly8gQXNzdW1lIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpcyB0aGVyZSB3aGVuIGNvbXB1dGVkIHBvc2l0aW9uIGlzIGZpeGVkXG5cdFx0XHRvZmZzZXQgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gR2V0ICpyZWFsKiBvZmZzZXRQYXJlbnRcblx0XHRcdG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50KCk7XG5cblx0XHRcdC8vIEdldCBjb3JyZWN0IG9mZnNldHNcblx0XHRcdG9mZnNldCA9IHRoaXMub2Zmc2V0KCk7XG5cdFx0XHRpZiAoICFqUXVlcnkubm9kZU5hbWUoIG9mZnNldFBhcmVudFsgMCBdLCBcImh0bWxcIiApICkge1xuXHRcdFx0XHRwYXJlbnRPZmZzZXQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0KCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBvZmZzZXRQYXJlbnQgYm9yZGVyc1xuXHRcdFx0cGFyZW50T2Zmc2V0ID0ge1xuXHRcdFx0XHR0b3A6IHBhcmVudE9mZnNldC50b3AgKyBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnRbIDAgXSwgXCJib3JkZXJUb3BXaWR0aFwiLCB0cnVlICksXG5cdFx0XHRcdGxlZnQ6IHBhcmVudE9mZnNldC5sZWZ0ICsgalF1ZXJ5LmNzcyggb2Zmc2V0UGFyZW50WyAwIF0sIFwiYm9yZGVyTGVmdFdpZHRoXCIsIHRydWUgKVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBTdWJ0cmFjdCBwYXJlbnQgb2Zmc2V0cyBhbmQgZWxlbWVudCBtYXJnaW5zXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRvcDogb2Zmc2V0LnRvcCAtIHBhcmVudE9mZnNldC50b3AgLSBqUXVlcnkuY3NzKCBlbGVtLCBcIm1hcmdpblRvcFwiLCB0cnVlICksXG5cdFx0XHRsZWZ0OiBvZmZzZXQubGVmdCAtIHBhcmVudE9mZnNldC5sZWZ0IC0galF1ZXJ5LmNzcyggZWxlbSwgXCJtYXJnaW5MZWZ0XCIsIHRydWUgKVxuXHRcdH07XG5cdH0sXG5cblx0Ly8gVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gZG9jdW1lbnRFbGVtZW50IGluIHRoZSBmb2xsb3dpbmcgY2FzZXM6XG5cdC8vIDEpIEZvciB0aGUgZWxlbWVudCBpbnNpZGUgdGhlIGlmcmFtZSB3aXRob3V0IG9mZnNldFBhcmVudCwgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm5cblx0Ly8gICAgZG9jdW1lbnRFbGVtZW50IG9mIHRoZSBwYXJlbnQgd2luZG93XG5cdC8vIDIpIEZvciB0aGUgaGlkZGVuIG9yIGRldGFjaGVkIGVsZW1lbnRcblx0Ly8gMykgRm9yIGJvZHkgb3IgaHRtbCBlbGVtZW50LCBpLmUuIGluIGNhc2Ugb2YgdGhlIGh0bWwgbm9kZSAtIGl0IHdpbGwgcmV0dXJuIGl0c2VsZlxuXHQvL1xuXHQvLyBidXQgdGhvc2UgZXhjZXB0aW9ucyB3ZXJlIG5ldmVyIHByZXNlbnRlZCBhcyBhIHJlYWwgbGlmZSB1c2UtY2FzZXNcblx0Ly8gYW5kIG1pZ2h0IGJlIGNvbnNpZGVyZWQgYXMgbW9yZSBwcmVmZXJhYmxlIHJlc3VsdHMuXG5cdC8vXG5cdC8vIFRoaXMgbG9naWMsIGhvd2V2ZXIsIGlzIG5vdCBndWFyYW50ZWVkIGFuZCBjYW4gY2hhbmdlIGF0IGFueSBwb2ludCBpbiB0aGUgZnV0dXJlXG5cdG9mZnNldFBhcmVudDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvZmZzZXRQYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudDtcblxuXHRcdFx0d2hpbGUgKCBvZmZzZXRQYXJlbnQgJiYgalF1ZXJ5LmNzcyggb2Zmc2V0UGFyZW50LCBcInBvc2l0aW9uXCIgKSA9PT0gXCJzdGF0aWNcIiApIHtcblx0XHRcdFx0b2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9mZnNldFBhcmVudCB8fCBkb2N1bWVudEVsZW1lbnQ7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbi8vIENyZWF0ZSBzY3JvbGxMZWZ0IGFuZCBzY3JvbGxUb3AgbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgc2Nyb2xsTGVmdDogXCJwYWdlWE9mZnNldFwiLCBzY3JvbGxUb3A6IFwicGFnZVlPZmZzZXRcIiB9LCBmdW5jdGlvbiggbWV0aG9kLCBwcm9wICkge1xuXHR2YXIgdG9wID0gXCJwYWdlWU9mZnNldFwiID09PSBwcm9wO1xuXG5cdGpRdWVyeS5mblsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdmFsICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBtZXRob2QsIHZhbCApIHtcblx0XHRcdHZhciB3aW4gPSBnZXRXaW5kb3coIGVsZW0gKTtcblxuXHRcdFx0aWYgKCB2YWwgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHdpbiA/IHdpblsgcHJvcCBdIDogZWxlbVsgbWV0aG9kIF07XG5cdFx0XHR9XG5cblx0XHRcdGlmICggd2luICkge1xuXHRcdFx0XHR3aW4uc2Nyb2xsVG8oXG5cdFx0XHRcdFx0IXRvcCA/IHZhbCA6IHdpbi5wYWdlWE9mZnNldCxcblx0XHRcdFx0XHR0b3AgPyB2YWwgOiB3aW4ucGFnZVlPZmZzZXRcblx0XHRcdFx0KTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbVsgbWV0aG9kIF0gPSB2YWw7XG5cdFx0XHR9XG5cdFx0fSwgbWV0aG9kLCB2YWwsIGFyZ3VtZW50cy5sZW5ndGggKTtcblx0fTtcbn0gKTtcblxuLy8gU3VwcG9ydDogU2FmYXJpIDw9NyAtIDkuMSwgQ2hyb21lIDw9MzcgLSA0OVxuLy8gQWRkIHRoZSB0b3AvbGVmdCBjc3NIb29rcyB1c2luZyBqUXVlcnkuZm4ucG9zaXRpb25cbi8vIFdlYmtpdCBidWc6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yOTA4NFxuLy8gQmxpbmsgYnVnOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD01ODkzNDdcbi8vIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBwZXJjZW50IHdoZW4gc3BlY2lmaWVkIGZvciB0b3AvbGVmdC9ib3R0b20vcmlnaHQ7XG4vLyByYXRoZXIgdGhhbiBtYWtlIHRoZSBjc3MgbW9kdWxlIGRlcGVuZCBvbiB0aGUgb2Zmc2V0IG1vZHVsZSwganVzdCBjaGVjayBmb3IgaXQgaGVyZVxualF1ZXJ5LmVhY2goIFsgXCJ0b3BcIiwgXCJsZWZ0XCIgXSwgZnVuY3Rpb24oIGksIHByb3AgKSB7XG5cdGpRdWVyeS5jc3NIb29rc1sgcHJvcCBdID0gYWRkR2V0SG9va0lmKCBzdXBwb3J0LnBpeGVsUG9zaXRpb24sXG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRcdFx0Y29tcHV0ZWQgPSBjdXJDU1MoIGVsZW0sIHByb3AgKTtcblxuXHRcdFx0XHQvLyBJZiBjdXJDU1MgcmV0dXJucyBwZXJjZW50YWdlLCBmYWxsYmFjayB0byBvZmZzZXRcblx0XHRcdFx0cmV0dXJuIHJudW1ub25weC50ZXN0KCBjb21wdXRlZCApID9cblx0XHRcdFx0XHRqUXVlcnkoIGVsZW0gKS5wb3NpdGlvbigpWyBwcm9wIF0gKyBcInB4XCIgOlxuXHRcdFx0XHRcdGNvbXB1dGVkO1xuXHRcdFx0fVxuXHRcdH1cblx0KTtcbn0gKTtcblxuXG4vLyBDcmVhdGUgaW5uZXJIZWlnaHQsIGlubmVyV2lkdGgsIGhlaWdodCwgd2lkdGgsIG91dGVySGVpZ2h0IGFuZCBvdXRlcldpZHRoIG1ldGhvZHNcbmpRdWVyeS5lYWNoKCB7IEhlaWdodDogXCJoZWlnaHRcIiwgV2lkdGg6IFwid2lkdGhcIiB9LCBmdW5jdGlvbiggbmFtZSwgdHlwZSApIHtcblx0alF1ZXJ5LmVhY2goIHsgcGFkZGluZzogXCJpbm5lclwiICsgbmFtZSwgY29udGVudDogdHlwZSwgXCJcIjogXCJvdXRlclwiICsgbmFtZSB9LFxuXHRcdGZ1bmN0aW9uKCBkZWZhdWx0RXh0cmEsIGZ1bmNOYW1lICkge1xuXG5cdFx0Ly8gTWFyZ2luIGlzIG9ubHkgZm9yIG91dGVySGVpZ2h0LCBvdXRlcldpZHRoXG5cdFx0alF1ZXJ5LmZuWyBmdW5jTmFtZSBdID0gZnVuY3Rpb24oIG1hcmdpbiwgdmFsdWUgKSB7XG5cdFx0XHR2YXIgY2hhaW5hYmxlID0gYXJndW1lbnRzLmxlbmd0aCAmJiAoIGRlZmF1bHRFeHRyYSB8fCB0eXBlb2YgbWFyZ2luICE9PSBcImJvb2xlYW5cIiApLFxuXHRcdFx0XHRleHRyYSA9IGRlZmF1bHRFeHRyYSB8fCAoIG1hcmdpbiA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gdHJ1ZSA/IFwibWFyZ2luXCIgOiBcImJvcmRlclwiICk7XG5cblx0XHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCB2YWx1ZSApIHtcblx0XHRcdFx0dmFyIGRvYztcblxuXHRcdFx0XHRpZiAoIGpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuXG5cdFx0XHRcdFx0Ly8gJCggd2luZG93ICkub3V0ZXJXaWR0aC9IZWlnaHQgcmV0dXJuIHcvaCBpbmNsdWRpbmcgc2Nyb2xsYmFycyAoZ2gtMTcyOSlcblx0XHRcdFx0XHRyZXR1cm4gZnVuY05hbWUuaW5kZXhPZiggXCJvdXRlclwiICkgPT09IDAgP1xuXHRcdFx0XHRcdFx0ZWxlbVsgXCJpbm5lclwiICsgbmFtZSBdIDpcblx0XHRcdFx0XHRcdGVsZW0uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50WyBcImNsaWVudFwiICsgbmFtZSBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gR2V0IGRvY3VtZW50IHdpZHRoIG9yIGhlaWdodFxuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdFx0ZG9jID0gZWxlbS5kb2N1bWVudEVsZW1lbnQ7XG5cblx0XHRcdFx0XHQvLyBFaXRoZXIgc2Nyb2xsW1dpZHRoL0hlaWdodF0gb3Igb2Zmc2V0W1dpZHRoL0hlaWdodF0gb3IgY2xpZW50W1dpZHRoL0hlaWdodF0sXG5cdFx0XHRcdFx0Ly8gd2hpY2hldmVyIGlzIGdyZWF0ZXN0XG5cdFx0XHRcdFx0cmV0dXJuIE1hdGgubWF4KFxuXHRcdFx0XHRcdFx0ZWxlbS5ib2R5WyBcInNjcm9sbFwiICsgbmFtZSBdLCBkb2NbIFwic2Nyb2xsXCIgKyBuYW1lIF0sXG5cdFx0XHRcdFx0XHRlbGVtLmJvZHlbIFwib2Zmc2V0XCIgKyBuYW1lIF0sIGRvY1sgXCJvZmZzZXRcIiArIG5hbWUgXSxcblx0XHRcdFx0XHRcdGRvY1sgXCJjbGllbnRcIiArIG5hbWUgXVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/XG5cblx0XHRcdFx0XHQvLyBHZXQgd2lkdGggb3IgaGVpZ2h0IG9uIHRoZSBlbGVtZW50LCByZXF1ZXN0aW5nIGJ1dCBub3QgZm9yY2luZyBwYXJzZUZsb2F0XG5cdFx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgdHlwZSwgZXh0cmEgKSA6XG5cblx0XHRcdFx0XHQvLyBTZXQgd2lkdGggb3IgaGVpZ2h0IG9uIHRoZSBlbGVtZW50XG5cdFx0XHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCB0eXBlLCB2YWx1ZSwgZXh0cmEgKTtcblx0XHRcdH0sIHR5cGUsIGNoYWluYWJsZSA/IG1hcmdpbiA6IHVuZGVmaW5lZCwgY2hhaW5hYmxlICk7XG5cdFx0fTtcblx0fSApO1xufSApO1xuXG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblxuXHRiaW5kOiBmdW5jdGlvbiggdHlwZXMsIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9uKCB0eXBlcywgbnVsbCwgZGF0YSwgZm4gKTtcblx0fSxcblx0dW5iaW5kOiBmdW5jdGlvbiggdHlwZXMsIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9mZiggdHlwZXMsIG51bGwsIGZuICk7XG5cdH0sXG5cblx0ZGVsZWdhdGU6IGZ1bmN0aW9uKCBzZWxlY3RvciwgdHlwZXMsIGRhdGEsIGZuICkge1xuXHRcdHJldHVybiB0aGlzLm9uKCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuICk7XG5cdH0sXG5cdHVuZGVsZWdhdGU6IGZ1bmN0aW9uKCBzZWxlY3RvciwgdHlwZXMsIGZuICkge1xuXG5cdFx0Ly8gKCBuYW1lc3BhY2UgKSBvciAoIHNlbGVjdG9yLCB0eXBlcyBbLCBmbl0gKVxuXHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID9cblx0XHRcdHRoaXMub2ZmKCBzZWxlY3RvciwgXCIqKlwiICkgOlxuXHRcdFx0dGhpcy5vZmYoIHR5cGVzLCBzZWxlY3RvciB8fCBcIioqXCIsIGZuICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LnBhcnNlSlNPTiA9IEpTT04ucGFyc2U7XG5cblxuXG5cbi8vIFJlZ2lzdGVyIGFzIGEgbmFtZWQgQU1EIG1vZHVsZSwgc2luY2UgalF1ZXJ5IGNhbiBiZSBjb25jYXRlbmF0ZWQgd2l0aCBvdGhlclxuLy8gZmlsZXMgdGhhdCBtYXkgdXNlIGRlZmluZSwgYnV0IG5vdCB2aWEgYSBwcm9wZXIgY29uY2F0ZW5hdGlvbiBzY3JpcHQgdGhhdFxuLy8gdW5kZXJzdGFuZHMgYW5vbnltb3VzIEFNRCBtb2R1bGVzLiBBIG5hbWVkIEFNRCBpcyBzYWZlc3QgYW5kIG1vc3Qgcm9idXN0XG4vLyB3YXkgdG8gcmVnaXN0ZXIuIExvd2VyY2FzZSBqcXVlcnkgaXMgdXNlZCBiZWNhdXNlIEFNRCBtb2R1bGUgbmFtZXMgYXJlXG4vLyBkZXJpdmVkIGZyb20gZmlsZSBuYW1lcywgYW5kIGpRdWVyeSBpcyBub3JtYWxseSBkZWxpdmVyZWQgaW4gYSBsb3dlcmNhc2Vcbi8vIGZpbGUgbmFtZS4gRG8gdGhpcyBhZnRlciBjcmVhdGluZyB0aGUgZ2xvYmFsIHNvIHRoYXQgaWYgYW4gQU1EIG1vZHVsZSB3YW50c1xuLy8gdG8gY2FsbCBub0NvbmZsaWN0IHRvIGhpZGUgdGhpcyB2ZXJzaW9uIG9mIGpRdWVyeSwgaXQgd2lsbCB3b3JrLlxuXG4vLyBOb3RlIHRoYXQgZm9yIG1heGltdW0gcG9ydGFiaWxpdHksIGxpYnJhcmllcyB0aGF0IGFyZSBub3QgalF1ZXJ5IHNob3VsZFxuLy8gZGVjbGFyZSB0aGVtc2VsdmVzIGFzIGFub255bW91cyBtb2R1bGVzLCBhbmQgYXZvaWQgc2V0dGluZyBhIGdsb2JhbCBpZiBhblxuLy8gQU1EIGxvYWRlciBpcyBwcmVzZW50LiBqUXVlcnkgaXMgYSBzcGVjaWFsIGNhc2UuIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcmJ1cmtlL3JlcXVpcmVqcy93aWtpL1VwZGF0aW5nLWV4aXN0aW5nLWxpYnJhcmllcyN3aWtpLWFub25cblxuaWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcblx0ZGVmaW5lKCBcImpxdWVyeVwiLCBbXSwgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGpRdWVyeTtcblx0fSApO1xufVxuXG5cblxuXG52YXJcblxuXHQvLyBNYXAgb3ZlciBqUXVlcnkgaW4gY2FzZSBvZiBvdmVyd3JpdGVcblx0X2pRdWVyeSA9IHdpbmRvdy5qUXVlcnksXG5cblx0Ly8gTWFwIG92ZXIgdGhlICQgaW4gY2FzZSBvZiBvdmVyd3JpdGVcblx0XyQgPSB3aW5kb3cuJDtcblxualF1ZXJ5Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiggZGVlcCApIHtcblx0aWYgKCB3aW5kb3cuJCA9PT0galF1ZXJ5ICkge1xuXHRcdHdpbmRvdy4kID0gXyQ7XG5cdH1cblxuXHRpZiAoIGRlZXAgJiYgd2luZG93LmpRdWVyeSA9PT0galF1ZXJ5ICkge1xuXHRcdHdpbmRvdy5qUXVlcnkgPSBfalF1ZXJ5O1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeTtcbn07XG5cbi8vIEV4cG9zZSBqUXVlcnkgYW5kICQgaWRlbnRpZmllcnMsIGV2ZW4gaW4gQU1EXG4vLyAoIzcxMDIjY29tbWVudDoxMCwgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvcHVsbC81NTcpXG4vLyBhbmQgQ29tbW9uSlMgZm9yIGJyb3dzZXIgZW11bGF0b3JzICgjMTM1NjYpXG5pZiAoICFub0dsb2JhbCApIHtcblx0d2luZG93LmpRdWVyeSA9IHdpbmRvdy4kID0galF1ZXJ5O1xufVxuXG5cblxuXG5cbnJldHVybiBqUXVlcnk7XG59ICk7XG4iXX0=