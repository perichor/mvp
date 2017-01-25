"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jQuery JavaScript Library v3.1.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/animatedSelector,-effects/Tween,-deprecated
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


	var version = "3.1.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/animatedSelector,-effects/Tween,-deprecated",


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L2Rpc3QvanF1ZXJ5LnNsaW0uanMiXSwibmFtZXMiOlsiZ2xvYmFsIiwiZmFjdG9yeSIsIm1vZHVsZSIsImV4cG9ydHMiLCJkb2N1bWVudCIsInciLCJFcnJvciIsIndpbmRvdyIsIm5vR2xvYmFsIiwiYXJyIiwiZ2V0UHJvdG8iLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsInNsaWNlIiwiY29uY2F0IiwicHVzaCIsImluZGV4T2YiLCJjbGFzczJ0eXBlIiwidG9TdHJpbmciLCJoYXNPd24iLCJoYXNPd25Qcm9wZXJ0eSIsImZuVG9TdHJpbmciLCJPYmplY3RGdW5jdGlvblN0cmluZyIsImNhbGwiLCJzdXBwb3J0IiwiRE9NRXZhbCIsImNvZGUiLCJkb2MiLCJzY3JpcHQiLCJjcmVhdGVFbGVtZW50IiwidGV4dCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInZlcnNpb24iLCJqUXVlcnkiLCJzZWxlY3RvciIsImNvbnRleHQiLCJmbiIsImluaXQiLCJydHJpbSIsInJtc1ByZWZpeCIsInJkYXNoQWxwaGEiLCJmY2FtZWxDYXNlIiwiYWxsIiwibGV0dGVyIiwidG9VcHBlckNhc2UiLCJwcm90b3R5cGUiLCJqcXVlcnkiLCJjb25zdHJ1Y3RvciIsImxlbmd0aCIsInRvQXJyYXkiLCJnZXQiLCJudW0iLCJwdXNoU3RhY2siLCJlbGVtcyIsInJldCIsIm1lcmdlIiwicHJldk9iamVjdCIsImVhY2giLCJjYWxsYmFjayIsIm1hcCIsImVsZW0iLCJpIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJmaXJzdCIsImVxIiwibGFzdCIsImxlbiIsImoiLCJlbmQiLCJzb3J0Iiwic3BsaWNlIiwiZXh0ZW5kIiwib3B0aW9ucyIsIm5hbWUiLCJzcmMiLCJjb3B5IiwiY29weUlzQXJyYXkiLCJjbG9uZSIsInRhcmdldCIsImRlZXAiLCJpc0Z1bmN0aW9uIiwiaXNQbGFpbk9iamVjdCIsImlzQXJyYXkiLCJ1bmRlZmluZWQiLCJleHBhbmRvIiwiTWF0aCIsInJhbmRvbSIsInJlcGxhY2UiLCJpc1JlYWR5IiwiZXJyb3IiLCJtc2ciLCJub29wIiwib2JqIiwidHlwZSIsIkFycmF5IiwiaXNXaW5kb3ciLCJpc051bWVyaWMiLCJpc05hTiIsInBhcnNlRmxvYXQiLCJwcm90byIsIkN0b3IiLCJpc0VtcHR5T2JqZWN0IiwiZ2xvYmFsRXZhbCIsImNhbWVsQ2FzZSIsInN0cmluZyIsIm5vZGVOYW1lIiwidG9Mb3dlckNhc2UiLCJpc0FycmF5TGlrZSIsInRyaW0iLCJtYWtlQXJyYXkiLCJyZXN1bHRzIiwiaW5BcnJheSIsInNlY29uZCIsImdyZXAiLCJpbnZlcnQiLCJjYWxsYmFja0ludmVyc2UiLCJtYXRjaGVzIiwiY2FsbGJhY2tFeHBlY3QiLCJhcmciLCJ2YWx1ZSIsImd1aWQiLCJwcm94eSIsInRtcCIsImFyZ3MiLCJub3ciLCJEYXRlIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJzcGxpdCIsIlNpenpsZSIsIkV4cHIiLCJnZXRUZXh0IiwiaXNYTUwiLCJ0b2tlbml6ZSIsImNvbXBpbGUiLCJzZWxlY3QiLCJvdXRlcm1vc3RDb250ZXh0Iiwic29ydElucHV0IiwiaGFzRHVwbGljYXRlIiwic2V0RG9jdW1lbnQiLCJkb2NFbGVtIiwiZG9jdW1lbnRJc0hUTUwiLCJyYnVnZ3lRU0EiLCJyYnVnZ3lNYXRjaGVzIiwiY29udGFpbnMiLCJwcmVmZXJyZWREb2MiLCJkaXJydW5zIiwiZG9uZSIsImNsYXNzQ2FjaGUiLCJjcmVhdGVDYWNoZSIsInRva2VuQ2FjaGUiLCJjb21waWxlckNhY2hlIiwic29ydE9yZGVyIiwiYSIsImIiLCJwb3AiLCJwdXNoX25hdGl2ZSIsImxpc3QiLCJib29sZWFucyIsIndoaXRlc3BhY2UiLCJpZGVudGlmaWVyIiwiYXR0cmlidXRlcyIsInBzZXVkb3MiLCJyd2hpdGVzcGFjZSIsIlJlZ0V4cCIsInJjb21tYSIsInJjb21iaW5hdG9ycyIsInJhdHRyaWJ1dGVRdW90ZXMiLCJycHNldWRvIiwicmlkZW50aWZpZXIiLCJtYXRjaEV4cHIiLCJyaW5wdXRzIiwicmhlYWRlciIsInJuYXRpdmUiLCJycXVpY2tFeHByIiwicnNpYmxpbmciLCJydW5lc2NhcGUiLCJmdW5lc2NhcGUiLCJfIiwiZXNjYXBlZCIsImVzY2FwZWRXaGl0ZXNwYWNlIiwiaGlnaCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInJjc3Nlc2NhcGUiLCJmY3NzZXNjYXBlIiwiY2giLCJhc0NvZGVQb2ludCIsImNoYXJDb2RlQXQiLCJ1bmxvYWRIYW5kbGVyIiwiZGlzYWJsZWRBbmNlc3RvciIsImFkZENvbWJpbmF0b3IiLCJkaXNhYmxlZCIsImRpciIsIm5leHQiLCJjaGlsZE5vZGVzIiwibm9kZVR5cGUiLCJlIiwiZWxzIiwic2VlZCIsIm0iLCJuaWQiLCJtYXRjaCIsImdyb3VwcyIsIm5ld1NlbGVjdG9yIiwibmV3Q29udGV4dCIsIm93bmVyRG9jdW1lbnQiLCJleGVjIiwiZ2V0RWxlbWVudEJ5SWQiLCJpZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInFzYSIsInRlc3QiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJ0b1NlbGVjdG9yIiwiam9pbiIsInRlc3RDb250ZXh0IiwicXVlcnlTZWxlY3RvckFsbCIsInFzYUVycm9yIiwicmVtb3ZlQXR0cmlidXRlIiwia2V5cyIsImNhY2hlIiwia2V5IiwiY2FjaGVMZW5ndGgiLCJzaGlmdCIsIm1hcmtGdW5jdGlvbiIsImFzc2VydCIsImVsIiwiYWRkSGFuZGxlIiwiYXR0cnMiLCJoYW5kbGVyIiwiYXR0ckhhbmRsZSIsInNpYmxpbmdDaGVjayIsImN1ciIsImRpZmYiLCJzb3VyY2VJbmRleCIsIm5leHRTaWJsaW5nIiwiY3JlYXRlSW5wdXRQc2V1ZG8iLCJjcmVhdGVCdXR0b25Qc2V1ZG8iLCJjcmVhdGVEaXNhYmxlZFBzZXVkbyIsImlzRGlzYWJsZWQiLCJjcmVhdGVQb3NpdGlvbmFsUHNldWRvIiwiYXJndW1lbnQiLCJtYXRjaEluZGV4ZXMiLCJkb2N1bWVudEVsZW1lbnQiLCJub2RlIiwiaGFzQ29tcGFyZSIsInN1YldpbmRvdyIsImRlZmF1bHRWaWV3IiwidG9wIiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiY2xhc3NOYW1lIiwiY3JlYXRlQ29tbWVudCIsImdldEJ5SWQiLCJnZXRFbGVtZW50c0J5TmFtZSIsImZpbHRlciIsImF0dHJJZCIsImZpbmQiLCJnZXRBdHRyaWJ1dGVOb2RlIiwidGFnIiwiaW5uZXJIVE1MIiwiaW5wdXQiLCJtYXRjaGVzU2VsZWN0b3IiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJtb3pNYXRjaGVzU2VsZWN0b3IiLCJvTWF0Y2hlc1NlbGVjdG9yIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJkaXNjb25uZWN0ZWRNYXRjaCIsImNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIiwiYWRvd24iLCJidXAiLCJjb21wYXJlIiwic29ydERldGFjaGVkIiwiYXVwIiwiYXAiLCJicCIsInVuc2hpZnQiLCJleHByIiwiZWxlbWVudHMiLCJhdHRyIiwidmFsIiwic3BlY2lmaWVkIiwiZXNjYXBlIiwic2VsIiwidW5pcXVlU29ydCIsImR1cGxpY2F0ZXMiLCJkZXRlY3REdXBsaWNhdGVzIiwic29ydFN0YWJsZSIsInRleHRDb250ZW50IiwiZmlyc3RDaGlsZCIsIm5vZGVWYWx1ZSIsInNlbGVjdG9ycyIsImNyZWF0ZVBzZXVkbyIsInJlbGF0aXZlIiwicHJlRmlsdGVyIiwiZXhjZXNzIiwidW5xdW90ZWQiLCJub2RlTmFtZVNlbGVjdG9yIiwicGF0dGVybiIsIm9wZXJhdG9yIiwiY2hlY2siLCJyZXN1bHQiLCJ3aGF0Iiwic2ltcGxlIiwiZm9yd2FyZCIsIm9mVHlwZSIsInhtbCIsInVuaXF1ZUNhY2hlIiwib3V0ZXJDYWNoZSIsIm5vZGVJbmRleCIsInN0YXJ0IiwicGFyZW50IiwidXNlQ2FjaGUiLCJsYXN0Q2hpbGQiLCJ1bmlxdWVJRCIsInBzZXVkbyIsInNldEZpbHRlcnMiLCJpZHgiLCJtYXRjaGVkIiwibWF0Y2hlciIsInVubWF0Y2hlZCIsImlubmVyVGV4dCIsImxhbmciLCJlbGVtTGFuZyIsImhhc2giLCJsb2NhdGlvbiIsImFjdGl2ZUVsZW1lbnQiLCJoYXNGb2N1cyIsImhyZWYiLCJ0YWJJbmRleCIsImNoZWNrZWQiLCJzZWxlY3RlZCIsInNlbGVjdGVkSW5kZXgiLCJyYWRpbyIsImNoZWNrYm94IiwiZmlsZSIsInBhc3N3b3JkIiwiaW1hZ2UiLCJzdWJtaXQiLCJyZXNldCIsImZpbHRlcnMiLCJwYXJzZU9ubHkiLCJ0b2tlbnMiLCJzb0ZhciIsInByZUZpbHRlcnMiLCJjYWNoZWQiLCJjb21iaW5hdG9yIiwiYmFzZSIsInNraXAiLCJjaGVja05vbkVsZW1lbnRzIiwiZG9uZU5hbWUiLCJvbGRDYWNoZSIsIm5ld0NhY2hlIiwiZWxlbWVudE1hdGNoZXIiLCJtYXRjaGVycyIsIm11bHRpcGxlQ29udGV4dHMiLCJjb250ZXh0cyIsImNvbmRlbnNlIiwibmV3VW5tYXRjaGVkIiwibWFwcGVkIiwic2V0TWF0Y2hlciIsInBvc3RGaWx0ZXIiLCJwb3N0RmluZGVyIiwicG9zdFNlbGVjdG9yIiwidGVtcCIsInByZU1hcCIsInBvc3RNYXAiLCJwcmVleGlzdGluZyIsIm1hdGNoZXJJbiIsIm1hdGNoZXJPdXQiLCJtYXRjaGVyRnJvbVRva2VucyIsImNoZWNrQ29udGV4dCIsImxlYWRpbmdSZWxhdGl2ZSIsImltcGxpY2l0UmVsYXRpdmUiLCJtYXRjaENvbnRleHQiLCJtYXRjaEFueUNvbnRleHQiLCJtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMiLCJlbGVtZW50TWF0Y2hlcnMiLCJzZXRNYXRjaGVycyIsImJ5U2V0IiwiYnlFbGVtZW50Iiwic3VwZXJNYXRjaGVyIiwib3V0ZXJtb3N0IiwibWF0Y2hlZENvdW50Iiwic2V0TWF0Y2hlZCIsImNvbnRleHRCYWNrdXAiLCJkaXJydW5zVW5pcXVlIiwidG9rZW4iLCJjb21waWxlZCIsImRlZmF1bHRWYWx1ZSIsInVuaXF1ZSIsImlzWE1MRG9jIiwiZXNjYXBlU2VsZWN0b3IiLCJ1bnRpbCIsInRydW5jYXRlIiwiaXMiLCJzaWJsaW5ncyIsIm4iLCJybmVlZHNDb250ZXh0IiwibmVlZHNDb250ZXh0IiwicnNpbmdsZVRhZyIsInJpc1NpbXBsZSIsIndpbm5vdyIsInF1YWxpZmllciIsIm5vdCIsInNlbGYiLCJyb290alF1ZXJ5Iiwicm9vdCIsInBhcnNlSFRNTCIsInJlYWR5IiwicnBhcmVudHNwcmV2IiwiZ3VhcmFudGVlZFVuaXF1ZSIsImNoaWxkcmVuIiwiY29udGVudHMiLCJwcmV2IiwiaGFzIiwidGFyZ2V0cyIsImwiLCJjbG9zZXN0IiwiaW5kZXgiLCJwcmV2QWxsIiwiYWRkIiwiYWRkQmFjayIsInNpYmxpbmciLCJwYXJlbnRzIiwicGFyZW50c1VudGlsIiwibmV4dEFsbCIsIm5leHRVbnRpbCIsInByZXZVbnRpbCIsImNvbnRlbnREb2N1bWVudCIsInJldmVyc2UiLCJybm90aHRtbHdoaXRlIiwiY3JlYXRlT3B0aW9ucyIsIm9iamVjdCIsImZsYWciLCJDYWxsYmFja3MiLCJmaXJpbmciLCJtZW1vcnkiLCJmaXJlZCIsImxvY2tlZCIsInF1ZXVlIiwiZmlyaW5nSW5kZXgiLCJmaXJlIiwib25jZSIsInN0b3BPbkZhbHNlIiwicmVtb3ZlIiwiZW1wdHkiLCJkaXNhYmxlIiwibG9jayIsImZpcmVXaXRoIiwiSWRlbnRpdHkiLCJ2IiwiVGhyb3dlciIsImV4IiwiYWRvcHRWYWx1ZSIsInJlc29sdmUiLCJyZWplY3QiLCJtZXRob2QiLCJwcm9taXNlIiwiZmFpbCIsInRoZW4iLCJEZWZlcnJlZCIsImZ1bmMiLCJ0dXBsZXMiLCJzdGF0ZSIsImFsd2F5cyIsImRlZmVycmVkIiwicGlwZSIsImZucyIsIm5ld0RlZmVyIiwidHVwbGUiLCJyZXR1cm5lZCIsInByb2dyZXNzIiwibm90aWZ5Iiwib25GdWxmaWxsZWQiLCJvblJlamVjdGVkIiwib25Qcm9ncmVzcyIsIm1heERlcHRoIiwiZGVwdGgiLCJzcGVjaWFsIiwidGhhdCIsIm1pZ2h0VGhyb3ciLCJUeXBlRXJyb3IiLCJub3RpZnlXaXRoIiwicmVzb2x2ZVdpdGgiLCJwcm9jZXNzIiwiZXhjZXB0aW9uSG9vayIsInN0YWNrVHJhY2UiLCJyZWplY3RXaXRoIiwiZ2V0U3RhY2tIb29rIiwic2V0VGltZW91dCIsInN0YXRlU3RyaW5nIiwid2hlbiIsInNpbmdsZVZhbHVlIiwicmVtYWluaW5nIiwicmVzb2x2ZUNvbnRleHRzIiwicmVzb2x2ZVZhbHVlcyIsIm1hc3RlciIsInVwZGF0ZUZ1bmMiLCJyZXJyb3JOYW1lcyIsInN0YWNrIiwiY29uc29sZSIsIndhcm4iLCJtZXNzYWdlIiwicmVhZHlFeGNlcHRpb24iLCJyZWFkeUxpc3QiLCJjYXRjaCIsInJlYWR5V2FpdCIsImhvbGRSZWFkeSIsImhvbGQiLCJ3YWl0IiwiY29tcGxldGVkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlYWR5U3RhdGUiLCJkb1Njcm9sbCIsImFjY2VzcyIsImNoYWluYWJsZSIsImVtcHR5R2V0IiwicmF3IiwiYnVsayIsImFjY2VwdERhdGEiLCJvd25lciIsIkRhdGEiLCJ1aWQiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsInNldCIsImRhdGEiLCJwcm9wIiwiaGFzRGF0YSIsImRhdGFQcml2IiwiZGF0YVVzZXIiLCJyYnJhY2UiLCJybXVsdGlEYXNoIiwiZ2V0RGF0YSIsIkpTT04iLCJwYXJzZSIsImRhdGFBdHRyIiwicmVtb3ZlRGF0YSIsIl9kYXRhIiwiX3JlbW92ZURhdGEiLCJkZXF1ZXVlIiwic3RhcnRMZW5ndGgiLCJob29rcyIsIl9xdWV1ZUhvb2tzIiwic3RvcCIsInNldHRlciIsImNsZWFyUXVldWUiLCJjb3VudCIsImRlZmVyIiwicG51bSIsInNvdXJjZSIsInJjc3NOdW0iLCJjc3NFeHBhbmQiLCJpc0hpZGRlbldpdGhpblRyZWUiLCJzdHlsZSIsImRpc3BsYXkiLCJjc3MiLCJzd2FwIiwib2xkIiwiYWRqdXN0Q1NTIiwidmFsdWVQYXJ0cyIsInR3ZWVuIiwiYWRqdXN0ZWQiLCJzY2FsZSIsIm1heEl0ZXJhdGlvbnMiLCJjdXJyZW50VmFsdWUiLCJpbml0aWFsIiwidW5pdCIsImNzc051bWJlciIsImluaXRpYWxJblVuaXQiLCJkZWZhdWx0RGlzcGxheU1hcCIsImdldERlZmF1bHREaXNwbGF5IiwiYm9keSIsInNob3dIaWRlIiwic2hvdyIsInZhbHVlcyIsImhpZGUiLCJ0b2dnbGUiLCJyY2hlY2thYmxlVHlwZSIsInJ0YWdOYW1lIiwicnNjcmlwdFR5cGUiLCJ3cmFwTWFwIiwib3B0aW9uIiwidGhlYWQiLCJjb2wiLCJ0ciIsInRkIiwiX2RlZmF1bHQiLCJvcHRncm91cCIsInRib2R5IiwidGZvb3QiLCJjb2xncm91cCIsImNhcHRpb24iLCJ0aCIsImdldEFsbCIsInNldEdsb2JhbEV2YWwiLCJyZWZFbGVtZW50cyIsInJodG1sIiwiYnVpbGRGcmFnbWVudCIsInNjcmlwdHMiLCJzZWxlY3Rpb24iLCJpZ25vcmVkIiwid3JhcCIsImZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsIm5vZGVzIiwiY3JlYXRlVGV4dE5vZGUiLCJodG1sUHJlZmlsdGVyIiwiZGl2IiwiY2hlY2tDbG9uZSIsImNsb25lTm9kZSIsIm5vQ2xvbmVDaGVja2VkIiwicmtleUV2ZW50Iiwicm1vdXNlRXZlbnQiLCJydHlwZW5hbWVzcGFjZSIsInJldHVyblRydWUiLCJyZXR1cm5GYWxzZSIsInNhZmVBY3RpdmVFbGVtZW50IiwiZXJyIiwib24iLCJ0eXBlcyIsIm9uZSIsIm9yaWdGbiIsImV2ZW50Iiwib2ZmIiwiaGFuZGxlT2JqSW4iLCJldmVudEhhbmRsZSIsImV2ZW50cyIsInQiLCJoYW5kbGVPYmoiLCJoYW5kbGVycyIsIm5hbWVzcGFjZXMiLCJvcmlnVHlwZSIsImVsZW1EYXRhIiwiaGFuZGxlIiwidHJpZ2dlcmVkIiwiZGlzcGF0Y2giLCJkZWxlZ2F0ZVR5cGUiLCJiaW5kVHlwZSIsIm5hbWVzcGFjZSIsImRlbGVnYXRlQ291bnQiLCJzZXR1cCIsIm1hcHBlZFR5cGVzIiwib3JpZ0NvdW50IiwidGVhcmRvd24iLCJyZW1vdmVFdmVudCIsIm5hdGl2ZUV2ZW50IiwiZml4IiwiaGFuZGxlclF1ZXVlIiwiZGVsZWdhdGVUYXJnZXQiLCJwcmVEaXNwYXRjaCIsImlzUHJvcGFnYXRpb25TdG9wcGVkIiwiY3VycmVudFRhcmdldCIsImlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkIiwicm5hbWVzcGFjZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwicG9zdERpc3BhdGNoIiwibWF0Y2hlZEhhbmRsZXJzIiwibWF0Y2hlZFNlbGVjdG9ycyIsImJ1dHRvbiIsImFkZFByb3AiLCJob29rIiwiRXZlbnQiLCJlbnVtZXJhYmxlIiwib3JpZ2luYWxFdmVudCIsIndyaXRhYmxlIiwibG9hZCIsIm5vQnViYmxlIiwiZm9jdXMiLCJ0cmlnZ2VyIiwiYmx1ciIsImNsaWNrIiwiYmVmb3JldW5sb2FkIiwicmV0dXJuVmFsdWUiLCJwcm9wcyIsImlzRGVmYXVsdFByZXZlbnRlZCIsImRlZmF1bHRQcmV2ZW50ZWQiLCJyZWxhdGVkVGFyZ2V0IiwidGltZVN0YW1wIiwiaXNTaW11bGF0ZWQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJhbHRLZXkiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsImNoYW5nZWRUb3VjaGVzIiwiY3RybEtleSIsImRldGFpbCIsImV2ZW50UGhhc2UiLCJtZXRhS2V5IiwicGFnZVgiLCJwYWdlWSIsInNoaWZ0S2V5IiwidmlldyIsImNoYXJDb2RlIiwia2V5Q29kZSIsImJ1dHRvbnMiLCJjbGllbnRYIiwiY2xpZW50WSIsIm9mZnNldFgiLCJvZmZzZXRZIiwicG9pbnRlcklkIiwicG9pbnRlclR5cGUiLCJzY3JlZW5YIiwic2NyZWVuWSIsInRhcmdldFRvdWNoZXMiLCJ0b0VsZW1lbnQiLCJ0b3VjaGVzIiwid2hpY2giLCJtb3VzZWVudGVyIiwibW91c2VsZWF2ZSIsInBvaW50ZXJlbnRlciIsInBvaW50ZXJsZWF2ZSIsIm9yaWciLCJyZWxhdGVkIiwicnhodG1sVGFnIiwicm5vSW5uZXJodG1sIiwicmNoZWNrZWQiLCJyc2NyaXB0VHlwZU1hc2tlZCIsInJjbGVhblNjcmlwdCIsIm1hbmlwdWxhdGlvblRhcmdldCIsImNvbnRlbnQiLCJkaXNhYmxlU2NyaXB0IiwicmVzdG9yZVNjcmlwdCIsImNsb25lQ29weUV2ZW50IiwiZGVzdCIsInBkYXRhT2xkIiwicGRhdGFDdXIiLCJ1ZGF0YU9sZCIsInVkYXRhQ3VyIiwiZml4SW5wdXQiLCJkb21NYW5pcCIsImNvbGxlY3Rpb24iLCJoYXNTY3JpcHRzIiwiaU5vQ2xvbmUiLCJodG1sIiwiX2V2YWxVcmwiLCJrZWVwRGF0YSIsImNsZWFuRGF0YSIsImRhdGFBbmRFdmVudHMiLCJkZWVwRGF0YUFuZEV2ZW50cyIsInNyY0VsZW1lbnRzIiwiZGVzdEVsZW1lbnRzIiwiaW5QYWdlIiwiZGV0YWNoIiwiYXBwZW5kIiwicHJlcGVuZCIsImluc2VydEJlZm9yZSIsImJlZm9yZSIsImFmdGVyIiwicmVwbGFjZVdpdGgiLCJyZXBsYWNlQ2hpbGQiLCJhcHBlbmRUbyIsInByZXBlbmRUbyIsImluc2VydEFmdGVyIiwicmVwbGFjZUFsbCIsIm9yaWdpbmFsIiwiaW5zZXJ0Iiwicm1hcmdpbiIsInJudW1ub25weCIsImdldFN0eWxlcyIsIm9wZW5lciIsImdldENvbXB1dGVkU3R5bGUiLCJjb21wdXRlU3R5bGVUZXN0cyIsImNzc1RleHQiLCJjb250YWluZXIiLCJkaXZTdHlsZSIsInBpeGVsUG9zaXRpb25WYWwiLCJyZWxpYWJsZU1hcmdpbkxlZnRWYWwiLCJtYXJnaW5MZWZ0IiwiYm94U2l6aW5nUmVsaWFibGVWYWwiLCJ3aWR0aCIsIm1hcmdpblJpZ2h0IiwicGl4ZWxNYXJnaW5SaWdodFZhbCIsImJhY2tncm91bmRDbGlwIiwiY2xlYXJDbG9uZVN0eWxlIiwicGl4ZWxQb3NpdGlvbiIsImJveFNpemluZ1JlbGlhYmxlIiwicGl4ZWxNYXJnaW5SaWdodCIsInJlbGlhYmxlTWFyZ2luTGVmdCIsImN1ckNTUyIsImNvbXB1dGVkIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsImdldFByb3BlcnR5VmFsdWUiLCJhZGRHZXRIb29rSWYiLCJjb25kaXRpb25GbiIsImhvb2tGbiIsInJkaXNwbGF5c3dhcCIsImNzc1Nob3ciLCJwb3NpdGlvbiIsInZpc2liaWxpdHkiLCJjc3NOb3JtYWxUcmFuc2Zvcm0iLCJsZXR0ZXJTcGFjaW5nIiwiZm9udFdlaWdodCIsImNzc1ByZWZpeGVzIiwiZW1wdHlTdHlsZSIsInZlbmRvclByb3BOYW1lIiwiY2FwTmFtZSIsInNldFBvc2l0aXZlTnVtYmVyIiwic3VidHJhY3QiLCJtYXgiLCJhdWdtZW50V2lkdGhPckhlaWdodCIsImV4dHJhIiwiaXNCb3JkZXJCb3giLCJzdHlsZXMiLCJnZXRXaWR0aE9ySGVpZ2h0IiwidmFsdWVJc0JvcmRlckJveCIsImdldENsaWVudFJlY3RzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY3NzSG9va3MiLCJvcGFjaXR5IiwiY3NzUHJvcHMiLCJvcmlnTmFtZSIsImlzRmluaXRlIiwibGVmdCIsIm1hcmdpbiIsInBhZGRpbmciLCJib3JkZXIiLCJwcmVmaXgiLCJzdWZmaXgiLCJleHBhbmQiLCJleHBhbmRlZCIsInBhcnRzIiwiZGVsYXkiLCJ0aW1lIiwiZngiLCJzcGVlZHMiLCJ0aW1lb3V0IiwiY2xlYXJUaW1lb3V0Iiwib3B0IiwiY2hlY2tPbiIsIm9wdFNlbGVjdGVkIiwicmFkaW9WYWx1ZSIsImJvb2xIb29rIiwicmVtb3ZlQXR0ciIsIm5UeXBlIiwiYXR0ckhvb2tzIiwiYm9vbCIsImF0dHJOYW1lcyIsImdldHRlciIsImxvd2VyY2FzZU5hbWUiLCJyZm9jdXNhYmxlIiwicmNsaWNrYWJsZSIsInJlbW92ZVByb3AiLCJwcm9wRml4IiwicHJvcEhvb2tzIiwidGFiaW5kZXgiLCJwYXJzZUludCIsInN0cmlwQW5kQ29sbGFwc2UiLCJnZXRDbGFzcyIsImFkZENsYXNzIiwiY2xhc3NlcyIsImN1clZhbHVlIiwiY2xhenoiLCJmaW5hbFZhbHVlIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsInN0YXRlVmFsIiwiY2xhc3NOYW1lcyIsImhhc0NsYXNzIiwicnJldHVybiIsInZhbEhvb2tzIiwib3B0aW9uU2V0IiwicmZvY3VzTW9ycGgiLCJvbmx5SGFuZGxlcnMiLCJidWJibGVUeXBlIiwib250eXBlIiwiZXZlbnRQYXRoIiwiaXNUcmlnZ2VyIiwicGFyZW50V2luZG93Iiwic2ltdWxhdGUiLCJ0cmlnZ2VySGFuZGxlciIsImhvdmVyIiwiZm5PdmVyIiwiZm5PdXQiLCJmb2N1c2luIiwiYXR0YWNoZXMiLCJyYnJhY2tldCIsInJDUkxGIiwicnN1Ym1pdHRlclR5cGVzIiwicnN1Ym1pdHRhYmxlIiwiYnVpbGRQYXJhbXMiLCJ0cmFkaXRpb25hbCIsInBhcmFtIiwicyIsInZhbHVlT3JGdW5jdGlvbiIsImVuY29kZVVSSUNvbXBvbmVudCIsInNlcmlhbGl6ZSIsInNlcmlhbGl6ZUFycmF5Iiwid3JhcEFsbCIsImZpcnN0RWxlbWVudENoaWxkIiwid3JhcElubmVyIiwidW53cmFwIiwiaGlkZGVuIiwidmlzaWJsZSIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwiY3JlYXRlSFRNTERvY3VtZW50IiwiaW1wbGVtZW50YXRpb24iLCJrZWVwU2NyaXB0cyIsInBhcnNlZCIsImdldFdpbmRvdyIsIm9mZnNldCIsInNldE9mZnNldCIsImN1clBvc2l0aW9uIiwiY3VyTGVmdCIsImN1ckNTU1RvcCIsImN1clRvcCIsImN1ck9mZnNldCIsImN1ckNTU0xlZnQiLCJjYWxjdWxhdGVQb3NpdGlvbiIsImN1ckVsZW0iLCJ1c2luZyIsIndpbiIsInJlY3QiLCJoZWlnaHQiLCJwYWdlWU9mZnNldCIsImNsaWVudFRvcCIsInBhZ2VYT2Zmc2V0IiwiY2xpZW50TGVmdCIsIm9mZnNldFBhcmVudCIsInBhcmVudE9mZnNldCIsInNjcm9sbExlZnQiLCJzY3JvbGxUb3AiLCJzY3JvbGxUbyIsIkhlaWdodCIsIldpZHRoIiwiZGVmYXVsdEV4dHJhIiwi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TUFBM0I7QUFDQTs7QUFNRCxRQUFPQSxNQUFQO0FBQ0MsQ0E3NVBEIiwiZmlsZSI6ImpxdWVyeS5zbGltLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBqUXVlcnkgSmF2YVNjcmlwdCBMaWJyYXJ5IHYzLjEuMSAtYWpheCwtYWpheC9qc29ucCwtYWpheC9sb2FkLC1hamF4L3BhcnNlWE1MLC1hamF4L3NjcmlwdCwtYWpheC92YXIvbG9jYXRpb24sLWFqYXgvdmFyL25vbmNlLC1hamF4L3Zhci9ycXVlcnksLWFqYXgveGhyLC1tYW5pcHVsYXRpb24vX2V2YWxVcmwsLWV2ZW50L2FqYXgsLWVmZmVjdHMsLWVmZmVjdHMvYW5pbWF0ZWRTZWxlY3RvciwtZWZmZWN0cy9Ud2VlbiwtZGVwcmVjYXRlZFxuICogaHR0cHM6Ly9qcXVlcnkuY29tL1xuICpcbiAqIEluY2x1ZGVzIFNpenpsZS5qc1xuICogaHR0cHM6Ly9zaXp6bGVqcy5jb20vXG4gKlxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDE2LTA5LTIyVDIyOjMwWlxuICovXG4oIGZ1bmN0aW9uKCBnbG9iYWwsIGZhY3RvcnkgKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0aWYgKCB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdC8vIEZvciBDb21tb25KUyBhbmQgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgd2hlcmUgYSBwcm9wZXIgYHdpbmRvd2Bcblx0XHQvLyBpcyBwcmVzZW50LCBleGVjdXRlIHRoZSBmYWN0b3J5IGFuZCBnZXQgalF1ZXJ5LlxuXHRcdC8vIEZvciBlbnZpcm9ubWVudHMgdGhhdCBkbyBub3QgaGF2ZSBhIGB3aW5kb3dgIHdpdGggYSBgZG9jdW1lbnRgXG5cdFx0Ly8gKHN1Y2ggYXMgTm9kZS5qcyksIGV4cG9zZSBhIGZhY3RvcnkgYXMgbW9kdWxlLmV4cG9ydHMuXG5cdFx0Ly8gVGhpcyBhY2NlbnR1YXRlcyB0aGUgbmVlZCBmb3IgdGhlIGNyZWF0aW9uIG9mIGEgcmVhbCBgd2luZG93YC5cblx0XHQvLyBlLmcuIHZhciBqUXVlcnkgPSByZXF1aXJlKFwianF1ZXJ5XCIpKHdpbmRvdyk7XG5cdFx0Ly8gU2VlIHRpY2tldCAjMTQ1NDkgZm9yIG1vcmUgaW5mby5cblx0XHRtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5kb2N1bWVudCA/XG5cdFx0XHRmYWN0b3J5KCBnbG9iYWwsIHRydWUgKSA6XG5cdFx0XHRmdW5jdGlvbiggdyApIHtcblx0XHRcdFx0aWYgKCAhdy5kb2N1bWVudCApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwialF1ZXJ5IHJlcXVpcmVzIGEgd2luZG93IHdpdGggYSBkb2N1bWVudFwiICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhY3RvcnkoIHcgKTtcblx0XHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0ZmFjdG9yeSggZ2xvYmFsICk7XG5cdH1cblxuLy8gUGFzcyB0aGlzIGlmIHdpbmRvdyBpcyBub3QgZGVmaW5lZCB5ZXRcbn0gKSggdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCB3aW5kb3csIG5vR2xvYmFsICkge1xuXG4vLyBFZGdlIDw9IDEyIC0gMTMrLCBGaXJlZm94IDw9MTggLSA0NSssIElFIDEwIC0gMTEsIFNhZmFyaSA1LjEgLSA5KywgaU9TIDYgLSA5LjFcbi8vIHRocm93IGV4Y2VwdGlvbnMgd2hlbiBub24tc3RyaWN0IGNvZGUgKGUuZy4sIEFTUC5ORVQgNC41KSBhY2Nlc3NlcyBzdHJpY3QgbW9kZVxuLy8gYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIgKHRyYWMtMTMzMzUpLiBCdXQgYXMgb2YgalF1ZXJ5IDMuMCAoMjAxNiksIHN0cmljdCBtb2RlIHNob3VsZCBiZSBjb21tb25cbi8vIGVub3VnaCB0aGF0IGFsbCBzdWNoIGF0dGVtcHRzIGFyZSBndWFyZGVkIGluIGEgdHJ5IGJsb2NrLlxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhcnIgPSBbXTtcblxudmFyIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuXG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5cbnZhciBzbGljZSA9IGFyci5zbGljZTtcblxudmFyIGNvbmNhdCA9IGFyci5jb25jYXQ7XG5cbnZhciBwdXNoID0gYXJyLnB1c2g7XG5cbnZhciBpbmRleE9mID0gYXJyLmluZGV4T2Y7XG5cbnZhciBjbGFzczJ0eXBlID0ge307XG5cbnZhciB0b1N0cmluZyA9IGNsYXNzMnR5cGUudG9TdHJpbmc7XG5cbnZhciBoYXNPd24gPSBjbGFzczJ0eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgZm5Ub1N0cmluZyA9IGhhc093bi50b1N0cmluZztcblxudmFyIE9iamVjdEZ1bmN0aW9uU3RyaW5nID0gZm5Ub1N0cmluZy5jYWxsKCBPYmplY3QgKTtcblxudmFyIHN1cHBvcnQgPSB7fTtcblxuXG5cblx0ZnVuY3Rpb24gRE9NRXZhbCggY29kZSwgZG9jICkge1xuXHRcdGRvYyA9IGRvYyB8fCBkb2N1bWVudDtcblxuXHRcdHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudCggXCJzY3JpcHRcIiApO1xuXG5cdFx0c2NyaXB0LnRleHQgPSBjb2RlO1xuXHRcdGRvYy5oZWFkLmFwcGVuZENoaWxkKCBzY3JpcHQgKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBzY3JpcHQgKTtcblx0fVxuLyogZ2xvYmFsIFN5bWJvbCAqL1xuLy8gRGVmaW5pbmcgdGhpcyBnbG9iYWwgaW4gLmVzbGludHJjLmpzb24gd291bGQgY3JlYXRlIGEgZGFuZ2VyIG9mIHVzaW5nIHRoZSBnbG9iYWxcbi8vIHVuZ3VhcmRlZCBpbiBhbm90aGVyIHBsYWNlLCBpdCBzZWVtcyBzYWZlciB0byBkZWZpbmUgZ2xvYmFsIG9ubHkgZm9yIHRoaXMgbW9kdWxlXG5cblxuXG52YXJcblx0dmVyc2lvbiA9IFwiMy4xLjEgLWFqYXgsLWFqYXgvanNvbnAsLWFqYXgvbG9hZCwtYWpheC9wYXJzZVhNTCwtYWpheC9zY3JpcHQsLWFqYXgvdmFyL2xvY2F0aW9uLC1hamF4L3Zhci9ub25jZSwtYWpheC92YXIvcnF1ZXJ5LC1hamF4L3hociwtbWFuaXB1bGF0aW9uL19ldmFsVXJsLC1ldmVudC9hamF4LC1lZmZlY3RzLC1lZmZlY3RzL2FuaW1hdGVkU2VsZWN0b3IsLWVmZmVjdHMvVHdlZW4sLWRlcHJlY2F0ZWRcIixcblxuXHQvLyBEZWZpbmUgYSBsb2NhbCBjb3B5IG9mIGpRdWVyeVxuXHRqUXVlcnkgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG5cblx0XHQvLyBUaGUgalF1ZXJ5IG9iamVjdCBpcyBhY3R1YWxseSBqdXN0IHRoZSBpbml0IGNvbnN0cnVjdG9yICdlbmhhbmNlZCdcblx0XHQvLyBOZWVkIGluaXQgaWYgalF1ZXJ5IGlzIGNhbGxlZCAoanVzdCBhbGxvdyBlcnJvciB0byBiZSB0aHJvd24gaWYgbm90IGluY2x1ZGVkKVxuXHRcdHJldHVybiBuZXcgalF1ZXJ5LmZuLmluaXQoIHNlbGVjdG9yLCBjb250ZXh0ICk7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5XG5cdC8vIE1ha2Ugc3VyZSB3ZSB0cmltIEJPTSBhbmQgTkJTUFxuXHRydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZyxcblxuXHQvLyBNYXRjaGVzIGRhc2hlZCBzdHJpbmcgZm9yIGNhbWVsaXppbmdcblx0cm1zUHJlZml4ID0gL14tbXMtLyxcblx0cmRhc2hBbHBoYSA9IC8tKFthLXpdKS9nLFxuXG5cdC8vIFVzZWQgYnkgalF1ZXJ5LmNhbWVsQ2FzZSBhcyBjYWxsYmFjayB0byByZXBsYWNlKClcblx0ZmNhbWVsQ2FzZSA9IGZ1bmN0aW9uKCBhbGwsIGxldHRlciApIHtcblx0XHRyZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG5cdH07XG5cbmpRdWVyeS5mbiA9IGpRdWVyeS5wcm90b3R5cGUgPSB7XG5cblx0Ly8gVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiBqUXVlcnkgYmVpbmcgdXNlZFxuXHRqcXVlcnk6IHZlcnNpb24sXG5cblx0Y29uc3RydWN0b3I6IGpRdWVyeSxcblxuXHQvLyBUaGUgZGVmYXVsdCBsZW5ndGggb2YgYSBqUXVlcnkgb2JqZWN0IGlzIDBcblx0bGVuZ3RoOiAwLFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG5cdH0sXG5cblx0Ly8gR2V0IHRoZSBOdGggZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBlbGVtZW50IHNldCBPUlxuXHQvLyBHZXQgdGhlIHdob2xlIG1hdGNoZWQgZWxlbWVudCBzZXQgYXMgYSBjbGVhbiBhcnJheVxuXHRnZXQ6IGZ1bmN0aW9uKCBudW0gKSB7XG5cblx0XHQvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBpbiBhIGNsZWFuIGFycmF5XG5cdFx0aWYgKCBudW0gPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIGp1c3QgdGhlIG9uZSBlbGVtZW50IGZyb20gdGhlIHNldFxuXHRcdHJldHVybiBudW0gPCAwID8gdGhpc1sgbnVtICsgdGhpcy5sZW5ndGggXSA6IHRoaXNbIG51bSBdO1xuXHR9LFxuXG5cdC8vIFRha2UgYW4gYXJyYXkgb2YgZWxlbWVudHMgYW5kIHB1c2ggaXQgb250byB0aGUgc3RhY2tcblx0Ly8gKHJldHVybmluZyB0aGUgbmV3IG1hdGNoZWQgZWxlbWVudCBzZXQpXG5cdHB1c2hTdGFjazogZnVuY3Rpb24oIGVsZW1zICkge1xuXG5cdFx0Ly8gQnVpbGQgYSBuZXcgalF1ZXJ5IG1hdGNoZWQgZWxlbWVudCBzZXRcblx0XHR2YXIgcmV0ID0galF1ZXJ5Lm1lcmdlKCB0aGlzLmNvbnN0cnVjdG9yKCksIGVsZW1zICk7XG5cblx0XHQvLyBBZGQgdGhlIG9sZCBvYmplY3Qgb250byB0aGUgc3RhY2sgKGFzIGEgcmVmZXJlbmNlKVxuXHRcdHJldC5wcmV2T2JqZWN0ID0gdGhpcztcblxuXHRcdC8vIFJldHVybiB0aGUgbmV3bHktZm9ybWVkIGVsZW1lbnQgc2V0XG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHQvLyBFeGVjdXRlIGEgY2FsbGJhY2sgZm9yIGV2ZXJ5IGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgc2V0LlxuXHRlYWNoOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5lYWNoKCB0aGlzLCBjYWxsYmFjayApO1xuXHR9LFxuXG5cdG1hcDogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5Lm1hcCggdGhpcywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG5cdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbCggZWxlbSwgaSwgZWxlbSApO1xuXHRcdH0gKSApO1xuXHR9LFxuXG5cdHNsaWNlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHNsaWNlLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKSApO1xuXHR9LFxuXG5cdGZpcnN0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5lcSggMCApO1xuXHR9LFxuXG5cdGxhc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAtMSApO1xuXHR9LFxuXG5cdGVxOiBmdW5jdGlvbiggaSApIHtcblx0XHR2YXIgbGVuID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRqID0gK2kgKyAoIGkgPCAwID8gbGVuIDogMCApO1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggaiA+PSAwICYmIGogPCBsZW4gPyBbIHRoaXNbIGogXSBdIDogW10gKTtcblx0fSxcblxuXHRlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnByZXZPYmplY3QgfHwgdGhpcy5jb25zdHJ1Y3RvcigpO1xuXHR9LFxuXG5cdC8vIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cblx0Ly8gQmVoYXZlcyBsaWtlIGFuIEFycmF5J3MgbWV0aG9kLCBub3QgbGlrZSBhIGpRdWVyeSBtZXRob2QuXG5cdHB1c2g6IHB1c2gsXG5cdHNvcnQ6IGFyci5zb3J0LFxuXHRzcGxpY2U6IGFyci5zcGxpY2Vcbn07XG5cbmpRdWVyeS5leHRlbmQgPSBqUXVlcnkuZm4uZXh0ZW5kID0gZnVuY3Rpb24oKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbIDAgXSB8fCB7fSxcblx0XHRpID0gMSxcblx0XHRsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdGRlZXAgPSBmYWxzZTtcblxuXHQvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG5cdGlmICggdHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblxuXHRcdC8vIFNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbIGkgXSB8fCB7fTtcblx0XHRpKys7XG5cdH1cblxuXHQvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcblx0aWYgKCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmICFqUXVlcnkuaXNGdW5jdGlvbiggdGFyZ2V0ICkgKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdH1cblxuXHQvLyBFeHRlbmQgalF1ZXJ5IGl0c2VsZiBpZiBvbmx5IG9uZSBhcmd1bWVudCBpcyBwYXNzZWRcblx0aWYgKCBpID09PSBsZW5ndGggKSB7XG5cdFx0dGFyZ2V0ID0gdGhpcztcblx0XHRpLS07XG5cdH1cblxuXHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblxuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAoICggb3B0aW9ucyA9IGFyZ3VtZW50c1sgaSBdICkgIT0gbnVsbCApIHtcblxuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBiYXNlIG9iamVjdFxuXHRcdFx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdFx0XHRzcmMgPSB0YXJnZXRbIG5hbWUgXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbIG5hbWUgXTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICggdGFyZ2V0ID09PSBjb3B5ICkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdGlmICggZGVlcCAmJiBjb3B5ICYmICggalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvcHkgKSB8fFxuXHRcdFx0XHRcdCggY29weUlzQXJyYXkgPSBqUXVlcnkuaXNBcnJheSggY29weSApICkgKSApIHtcblxuXHRcdFx0XHRcdGlmICggY29weUlzQXJyYXkgKSB7XG5cdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgalF1ZXJ5LmlzQXJyYXkoIHNyYyApID8gc3JjIDogW107XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIHNyYyApID8gc3JjIDoge307XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBqUXVlcnkuZXh0ZW5kKCBkZWVwLCBjbG9uZSwgY29weSApO1xuXG5cdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0fSBlbHNlIGlmICggY29weSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHRhcmdldFsgbmFtZSBdID0gY29weTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0Ly8gVW5pcXVlIGZvciBlYWNoIGNvcHkgb2YgalF1ZXJ5IG9uIHRoZSBwYWdlXG5cdGV4cGFuZG86IFwialF1ZXJ5XCIgKyAoIHZlcnNpb24gKyBNYXRoLnJhbmRvbSgpICkucmVwbGFjZSggL1xcRC9nLCBcIlwiICksXG5cblx0Ly8gQXNzdW1lIGpRdWVyeSBpcyByZWFkeSB3aXRob3V0IHRoZSByZWFkeSBtb2R1bGVcblx0aXNSZWFkeTogdHJ1ZSxcblxuXHRlcnJvcjogZnVuY3Rpb24oIG1zZyApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIG1zZyApO1xuXHR9LFxuXG5cdG5vb3A6IGZ1bmN0aW9uKCkge30sXG5cblx0aXNGdW5jdGlvbjogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRyZXR1cm4galF1ZXJ5LnR5cGUoIG9iaiApID09PSBcImZ1bmN0aW9uXCI7XG5cdH0sXG5cblx0aXNBcnJheTogQXJyYXkuaXNBcnJheSxcblxuXHRpc1dpbmRvdzogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRyZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09PSBvYmoud2luZG93O1xuXHR9LFxuXG5cdGlzTnVtZXJpYzogZnVuY3Rpb24oIG9iaiApIHtcblxuXHRcdC8vIEFzIG9mIGpRdWVyeSAzLjAsIGlzTnVtZXJpYyBpcyBsaW1pdGVkIHRvXG5cdFx0Ly8gc3RyaW5ncyBhbmQgbnVtYmVycyAocHJpbWl0aXZlcyBvciBvYmplY3RzKVxuXHRcdC8vIHRoYXQgY2FuIGJlIGNvZXJjZWQgdG8gZmluaXRlIG51bWJlcnMgKGdoLTI2NjIpXG5cdFx0dmFyIHR5cGUgPSBqUXVlcnkudHlwZSggb2JqICk7XG5cdFx0cmV0dXJuICggdHlwZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlID09PSBcInN0cmluZ1wiICkgJiZcblxuXHRcdFx0Ly8gcGFyc2VGbG9hdCBOYU5zIG51bWVyaWMtY2FzdCBmYWxzZSBwb3NpdGl2ZXMgKFwiXCIpXG5cdFx0XHQvLyAuLi5idXQgbWlzaW50ZXJwcmV0cyBsZWFkaW5nLW51bWJlciBzdHJpbmdzLCBwYXJ0aWN1bGFybHkgaGV4IGxpdGVyYWxzIChcIjB4Li4uXCIpXG5cdFx0XHQvLyBzdWJ0cmFjdGlvbiBmb3JjZXMgaW5maW5pdGllcyB0byBOYU5cblx0XHRcdCFpc05hTiggb2JqIC0gcGFyc2VGbG9hdCggb2JqICkgKTtcblx0fSxcblxuXHRpc1BsYWluT2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHZhciBwcm90bywgQ3RvcjtcblxuXHRcdC8vIERldGVjdCBvYnZpb3VzIG5lZ2F0aXZlc1xuXHRcdC8vIFVzZSB0b1N0cmluZyBpbnN0ZWFkIG9mIGpRdWVyeS50eXBlIHRvIGNhdGNoIGhvc3Qgb2JqZWN0c1xuXHRcdGlmICggIW9iaiB8fCB0b1N0cmluZy5jYWxsKCBvYmogKSAhPT0gXCJbb2JqZWN0IE9iamVjdF1cIiApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRwcm90byA9IGdldFByb3RvKCBvYmogKTtcblxuXHRcdC8vIE9iamVjdHMgd2l0aCBubyBwcm90b3R5cGUgKGUuZy4sIGBPYmplY3QuY3JlYXRlKCBudWxsIClgKSBhcmUgcGxhaW5cblx0XHRpZiAoICFwcm90byApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIE9iamVjdHMgd2l0aCBwcm90b3R5cGUgYXJlIHBsYWluIGlmZiB0aGV5IHdlcmUgY29uc3RydWN0ZWQgYnkgYSBnbG9iYWwgT2JqZWN0IGZ1bmN0aW9uXG5cdFx0Q3RvciA9IGhhc093bi5jYWxsKCBwcm90bywgXCJjb25zdHJ1Y3RvclwiICkgJiYgcHJvdG8uY29uc3RydWN0b3I7XG5cdFx0cmV0dXJuIHR5cGVvZiBDdG9yID09PSBcImZ1bmN0aW9uXCIgJiYgZm5Ub1N0cmluZy5jYWxsKCBDdG9yICkgPT09IE9iamVjdEZ1bmN0aW9uU3RyaW5nO1xuXHR9LFxuXG5cdGlzRW1wdHlPYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG5cblx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZXNsaW50L2VzbGludC9pc3N1ZXMvNjEyNVxuXHRcdHZhciBuYW1lO1xuXG5cdFx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdHR5cGU6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0aWYgKCBvYmogPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiBvYmogKyBcIlwiO1xuXHRcdH1cblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD0yLjMgb25seSAoZnVuY3Rpb25pc2ggUmVnRXhwKVxuXHRcdHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiA/XG5cdFx0XHRjbGFzczJ0eXBlWyB0b1N0cmluZy5jYWxsKCBvYmogKSBdIHx8IFwib2JqZWN0XCIgOlxuXHRcdFx0dHlwZW9mIG9iajtcblx0fSxcblxuXHQvLyBFdmFsdWF0ZXMgYSBzY3JpcHQgaW4gYSBnbG9iYWwgY29udGV4dFxuXHRnbG9iYWxFdmFsOiBmdW5jdGlvbiggY29kZSApIHtcblx0XHRET01FdmFsKCBjb2RlICk7XG5cdH0sXG5cblx0Ly8gQ29udmVydCBkYXNoZWQgdG8gY2FtZWxDYXNlOyB1c2VkIGJ5IHRoZSBjc3MgYW5kIGRhdGEgbW9kdWxlc1xuXHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSwgRWRnZSAxMiAtIDEzXG5cdC8vIE1pY3Jvc29mdCBmb3Jnb3QgdG8gaHVtcCB0aGVpciB2ZW5kb3IgcHJlZml4ICgjOTU3Milcblx0Y2FtZWxDYXNlOiBmdW5jdGlvbiggc3RyaW5nICkge1xuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSggcm1zUHJlZml4LCBcIm1zLVwiICkucmVwbGFjZSggcmRhc2hBbHBoYSwgZmNhbWVsQ2FzZSApO1xuXHR9LFxuXG5cdG5vZGVOYW1lOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRyZXR1cm4gZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKTtcblx0fSxcblxuXHRlYWNoOiBmdW5jdGlvbiggb2JqLCBjYWxsYmFjayApIHtcblx0XHR2YXIgbGVuZ3RoLCBpID0gMDtcblxuXHRcdGlmICggaXNBcnJheUxpa2UoIG9iaiApICkge1xuXHRcdFx0bGVuZ3RoID0gb2JqLmxlbmd0aDtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKCBpIGluIG9iaiApIHtcblx0XHRcdFx0aWYgKCBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpIF0gKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seVxuXHR0cmltOiBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRyZXR1cm4gdGV4dCA9PSBudWxsID9cblx0XHRcdFwiXCIgOlxuXHRcdFx0KCB0ZXh0ICsgXCJcIiApLnJlcGxhY2UoIHJ0cmltLCBcIlwiICk7XG5cdH0sXG5cblx0Ly8gcmVzdWx0cyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRtYWtlQXJyYXk6IGZ1bmN0aW9uKCBhcnIsIHJlc3VsdHMgKSB7XG5cdFx0dmFyIHJldCA9IHJlc3VsdHMgfHwgW107XG5cblx0XHRpZiAoIGFyciAhPSBudWxsICkge1xuXHRcdFx0aWYgKCBpc0FycmF5TGlrZSggT2JqZWN0KCBhcnIgKSApICkge1xuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIHJldCxcblx0XHRcdFx0XHR0eXBlb2YgYXJyID09PSBcInN0cmluZ1wiID9cblx0XHRcdFx0XHRbIGFyciBdIDogYXJyXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwdXNoLmNhbGwoIHJldCwgYXJyICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHRpbkFycmF5OiBmdW5jdGlvbiggZWxlbSwgYXJyLCBpICkge1xuXHRcdHJldHVybiBhcnIgPT0gbnVsbCA/IC0xIDogaW5kZXhPZi5jYWxsKCBhcnIsIGVsZW0sIGkgKTtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRtZXJnZTogZnVuY3Rpb24oIGZpcnN0LCBzZWNvbmQgKSB7XG5cdFx0dmFyIGxlbiA9ICtzZWNvbmQubGVuZ3RoLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRpID0gZmlyc3QubGVuZ3RoO1xuXG5cdFx0Zm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG5cdFx0XHRmaXJzdFsgaSsrIF0gPSBzZWNvbmRbIGogXTtcblx0XHR9XG5cblx0XHRmaXJzdC5sZW5ndGggPSBpO1xuXG5cdFx0cmV0dXJuIGZpcnN0O1xuXHR9LFxuXG5cdGdyZXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGludmVydCApIHtcblx0XHR2YXIgY2FsbGJhY2tJbnZlcnNlLFxuXHRcdFx0bWF0Y2hlcyA9IFtdLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGgsXG5cdFx0XHRjYWxsYmFja0V4cGVjdCA9ICFpbnZlcnQ7XG5cblx0XHQvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgb25seSBzYXZpbmcgdGhlIGl0ZW1zXG5cdFx0Ly8gdGhhdCBwYXNzIHRoZSB2YWxpZGF0b3IgZnVuY3Rpb25cblx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdGNhbGxiYWNrSW52ZXJzZSA9ICFjYWxsYmFjayggZWxlbXNbIGkgXSwgaSApO1xuXHRcdFx0aWYgKCBjYWxsYmFja0ludmVyc2UgIT09IGNhbGxiYWNrRXhwZWN0ICkge1xuXHRcdFx0XHRtYXRjaGVzLnB1c2goIGVsZW1zWyBpIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbWF0Y2hlcztcblx0fSxcblxuXHQvLyBhcmcgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcblx0bWFwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBhcmcgKSB7XG5cdFx0dmFyIGxlbmd0aCwgdmFsdWUsXG5cdFx0XHRpID0gMCxcblx0XHRcdHJldCA9IFtdO1xuXG5cdFx0Ly8gR28gdGhyb3VnaCB0aGUgYXJyYXksIHRyYW5zbGF0aW5nIGVhY2ggb2YgdGhlIGl0ZW1zIHRvIHRoZWlyIG5ldyB2YWx1ZXNcblx0XHRpZiAoIGlzQXJyYXlMaWtlKCBlbGVtcyApICkge1xuXHRcdFx0bGVuZ3RoID0gZWxlbXMubGVuZ3RoO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG5cdFx0XHRcdGlmICggdmFsdWUgIT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXQucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gR28gdGhyb3VnaCBldmVyeSBrZXkgb24gdGhlIG9iamVjdCxcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICggaSBpbiBlbGVtcyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuXHRcdHJldHVybiBjb25jYXQuYXBwbHkoIFtdLCByZXQgKTtcblx0fSxcblxuXHQvLyBBIGdsb2JhbCBHVUlEIGNvdW50ZXIgZm9yIG9iamVjdHNcblx0Z3VpZDogMSxcblxuXHQvLyBCaW5kIGEgZnVuY3Rpb24gdG8gYSBjb250ZXh0LCBvcHRpb25hbGx5IHBhcnRpYWxseSBhcHBseWluZyBhbnlcblx0Ly8gYXJndW1lbnRzLlxuXHRwcm94eTogZnVuY3Rpb24oIGZuLCBjb250ZXh0ICkge1xuXHRcdHZhciB0bXAsIGFyZ3MsIHByb3h5O1xuXG5cdFx0aWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHRtcCA9IGZuWyBjb250ZXh0IF07XG5cdFx0XHRjb250ZXh0ID0gZm47XG5cdFx0XHRmbiA9IHRtcDtcblx0XHR9XG5cblx0XHQvLyBRdWljayBjaGVjayB0byBkZXRlcm1pbmUgaWYgdGFyZ2V0IGlzIGNhbGxhYmxlLCBpbiB0aGUgc3BlY1xuXHRcdC8vIHRoaXMgdGhyb3dzIGEgVHlwZUVycm9yLCBidXQgd2Ugd2lsbCBqdXN0IHJldHVybiB1bmRlZmluZWQuXG5cdFx0aWYgKCAhalF1ZXJ5LmlzRnVuY3Rpb24oIGZuICkgKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIFNpbXVsYXRlZCBiaW5kXG5cdFx0YXJncyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMiApO1xuXHRcdHByb3h5ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZm4uYXBwbHkoIGNvbnRleHQgfHwgdGhpcywgYXJncy5jb25jYXQoIHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApICkgKTtcblx0XHR9O1xuXG5cdFx0Ly8gU2V0IHRoZSBndWlkIG9mIHVuaXF1ZSBoYW5kbGVyIHRvIHRoZSBzYW1lIG9mIG9yaWdpbmFsIGhhbmRsZXIsIHNvIGl0IGNhbiBiZSByZW1vdmVkXG5cdFx0cHJveHkuZ3VpZCA9IGZuLmd1aWQgPSBmbi5ndWlkIHx8IGpRdWVyeS5ndWlkKys7XG5cblx0XHRyZXR1cm4gcHJveHk7XG5cdH0sXG5cblx0bm93OiBEYXRlLm5vdyxcblxuXHQvLyBqUXVlcnkuc3VwcG9ydCBpcyBub3QgdXNlZCBpbiBDb3JlIGJ1dCBvdGhlciBwcm9qZWN0cyBhdHRhY2ggdGhlaXJcblx0Ly8gcHJvcGVydGllcyB0byBpdCBzbyBpdCBuZWVkcyB0byBleGlzdC5cblx0c3VwcG9ydDogc3VwcG9ydFxufSApO1xuXG5pZiAoIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0alF1ZXJ5LmZuWyBTeW1ib2wuaXRlcmF0b3IgXSA9IGFyclsgU3ltYm9sLml0ZXJhdG9yIF07XG59XG5cbi8vIFBvcHVsYXRlIHRoZSBjbGFzczJ0eXBlIG1hcFxualF1ZXJ5LmVhY2goIFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvciBTeW1ib2xcIi5zcGxpdCggXCIgXCIgKSxcbmZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHRjbGFzczJ0eXBlWyBcIltvYmplY3QgXCIgKyBuYW1lICsgXCJdXCIgXSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbn0gKTtcblxuZnVuY3Rpb24gaXNBcnJheUxpa2UoIG9iaiApIHtcblxuXHQvLyBTdXBwb3J0OiByZWFsIGlPUyA4LjIgb25seSAobm90IHJlcHJvZHVjaWJsZSBpbiBzaW11bGF0b3IpXG5cdC8vIGBpbmAgY2hlY2sgdXNlZCB0byBwcmV2ZW50IEpJVCBlcnJvciAoZ2gtMjE0NSlcblx0Ly8gaGFzT3duIGlzbid0IHVzZWQgaGVyZSBkdWUgdG8gZmFsc2UgbmVnYXRpdmVzXG5cdC8vIHJlZ2FyZGluZyBOb2RlbGlzdCBsZW5ndGggaW4gSUVcblx0dmFyIGxlbmd0aCA9ICEhb2JqICYmIFwibGVuZ3RoXCIgaW4gb2JqICYmIG9iai5sZW5ndGgsXG5cdFx0dHlwZSA9IGpRdWVyeS50eXBlKCBvYmogKTtcblxuXHRpZiAoIHR5cGUgPT09IFwiZnVuY3Rpb25cIiB8fCBqUXVlcnkuaXNXaW5kb3coIG9iaiApICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiB0eXBlID09PSBcImFycmF5XCIgfHwgbGVuZ3RoID09PSAwIHx8XG5cdFx0dHlwZW9mIGxlbmd0aCA9PT0gXCJudW1iZXJcIiAmJiBsZW5ndGggPiAwICYmICggbGVuZ3RoIC0gMSApIGluIG9iajtcbn1cbnZhciBTaXp6bGUgPVxuLyohXG4gKiBTaXp6bGUgQ1NTIFNlbGVjdG9yIEVuZ2luZSB2Mi4zLjNcbiAqIGh0dHBzOi8vc2l6emxlanMuY29tL1xuICpcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDE2LTA4LTA4XG4gKi9cbihmdW5jdGlvbiggd2luZG93ICkge1xuXG52YXIgaSxcblx0c3VwcG9ydCxcblx0RXhwcixcblx0Z2V0VGV4dCxcblx0aXNYTUwsXG5cdHRva2VuaXplLFxuXHRjb21waWxlLFxuXHRzZWxlY3QsXG5cdG91dGVybW9zdENvbnRleHQsXG5cdHNvcnRJbnB1dCxcblx0aGFzRHVwbGljYXRlLFxuXG5cdC8vIExvY2FsIGRvY3VtZW50IHZhcnNcblx0c2V0RG9jdW1lbnQsXG5cdGRvY3VtZW50LFxuXHRkb2NFbGVtLFxuXHRkb2N1bWVudElzSFRNTCxcblx0cmJ1Z2d5UVNBLFxuXHRyYnVnZ3lNYXRjaGVzLFxuXHRtYXRjaGVzLFxuXHRjb250YWlucyxcblxuXHQvLyBJbnN0YW5jZS1zcGVjaWZpYyBkYXRhXG5cdGV4cGFuZG8gPSBcInNpenpsZVwiICsgMSAqIG5ldyBEYXRlKCksXG5cdHByZWZlcnJlZERvYyA9IHdpbmRvdy5kb2N1bWVudCxcblx0ZGlycnVucyA9IDAsXG5cdGRvbmUgPSAwLFxuXHRjbGFzc0NhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0dG9rZW5DYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdGNvbXBpbGVyQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHRzb3J0T3JkZXIgPSBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvLyBJbnN0YW5jZSBtZXRob2RzXG5cdGhhc093biA9ICh7fSkuaGFzT3duUHJvcGVydHksXG5cdGFyciA9IFtdLFxuXHRwb3AgPSBhcnIucG9wLFxuXHRwdXNoX25hdGl2ZSA9IGFyci5wdXNoLFxuXHRwdXNoID0gYXJyLnB1c2gsXG5cdHNsaWNlID0gYXJyLnNsaWNlLFxuXHQvLyBVc2UgYSBzdHJpcHBlZC1kb3duIGluZGV4T2YgYXMgaXQncyBmYXN0ZXIgdGhhbiBuYXRpdmVcblx0Ly8gaHR0cHM6Ly9qc3BlcmYuY29tL3Rob3ItaW5kZXhvZi12cy1mb3IvNVxuXHRpbmRleE9mID0gZnVuY3Rpb24oIGxpc3QsIGVsZW0gKSB7XG5cdFx0dmFyIGkgPSAwLFxuXHRcdFx0bGVuID0gbGlzdC5sZW5ndGg7XG5cdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRpZiAoIGxpc3RbaV0gPT09IGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH0sXG5cblx0Ym9vbGVhbnMgPSBcImNoZWNrZWR8c2VsZWN0ZWR8YXN5bmN8YXV0b2ZvY3VzfGF1dG9wbGF5fGNvbnRyb2xzfGRlZmVyfGRpc2FibGVkfGhpZGRlbnxpc21hcHxsb29wfG11bHRpcGxlfG9wZW58cmVhZG9ubHl8cmVxdWlyZWR8c2NvcGVkXCIsXG5cblx0Ly8gUmVndWxhciBleHByZXNzaW9uc1xuXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyN3aGl0ZXNwYWNlXG5cdHdoaXRlc3BhY2UgPSBcIltcXFxceDIwXFxcXHRcXFxcclxcXFxuXFxcXGZdXCIsXG5cblx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvc3luZGF0YS5odG1sI3ZhbHVlLWRlZi1pZGVudGlmaWVyXG5cdGlkZW50aWZpZXIgPSBcIig/OlxcXFxcXFxcLnxbXFxcXHctXXxbXlxcMC1cXFxceGEwXSkrXCIsXG5cblx0Ly8gQXR0cmlidXRlIHNlbGVjdG9yczogaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNhdHRyaWJ1dGUtc2VsZWN0b3JzXG5cdGF0dHJpYnV0ZXMgPSBcIlxcXFxbXCIgKyB3aGl0ZXNwYWNlICsgXCIqKFwiICsgaWRlbnRpZmllciArIFwiKSg/OlwiICsgd2hpdGVzcGFjZSArXG5cdFx0Ly8gT3BlcmF0b3IgKGNhcHR1cmUgMilcblx0XHRcIiooWypeJHwhfl0/PSlcIiArIHdoaXRlc3BhY2UgK1xuXHRcdC8vIFwiQXR0cmlidXRlIHZhbHVlcyBtdXN0IGJlIENTUyBpZGVudGlmaWVycyBbY2FwdHVyZSA1XSBvciBzdHJpbmdzIFtjYXB0dXJlIDMgb3IgY2FwdHVyZSA0XVwiXG5cdFx0XCIqKD86JygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwifChcIiArIGlkZW50aWZpZXIgKyBcIikpfClcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFwiKlxcXFxdXCIsXG5cblx0cHNldWRvcyA9IFwiOihcIiArIGlkZW50aWZpZXIgKyBcIikoPzpcXFxcKChcIiArXG5cdFx0Ly8gVG8gcmVkdWNlIHRoZSBudW1iZXIgb2Ygc2VsZWN0b3JzIG5lZWRpbmcgdG9rZW5pemUgaW4gdGhlIHByZUZpbHRlciwgcHJlZmVyIGFyZ3VtZW50czpcblx0XHQvLyAxLiBxdW90ZWQgKGNhcHR1cmUgMzsgY2FwdHVyZSA0IG9yIGNhcHR1cmUgNSlcblx0XHRcIignKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcJ10pKiknfFxcXCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFxcXFwiXSkqKVxcXCIpfFwiICtcblx0XHQvLyAyLiBzaW1wbGUgKGNhcHR1cmUgNilcblx0XHRcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpW1xcXFxdXXxcIiArIGF0dHJpYnV0ZXMgKyBcIikqKXxcIiArXG5cdFx0Ly8gMy4gYW55dGhpbmcgZWxzZSAoY2FwdHVyZSAyKVxuXHRcdFwiLipcIiArXG5cdFx0XCIpXFxcXCl8KVwiLFxuXG5cdC8vIExlYWRpbmcgYW5kIG5vbi1lc2NhcGVkIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGNhcHR1cmluZyBzb21lIG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlcnMgcHJlY2VkaW5nIHRoZSBsYXR0ZXJcblx0cndoaXRlc3BhY2UgPSBuZXcgUmVnRXhwKCB3aGl0ZXNwYWNlICsgXCIrXCIsIFwiZ1wiICksXG5cdHJ0cmltID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIrfCgoPzpefFteXFxcXFxcXFxdKSg/OlxcXFxcXFxcLikqKVwiICsgd2hpdGVzcGFjZSArIFwiKyRcIiwgXCJnXCIgKSxcblxuXHRyY29tbWEgPSBuZXcgUmVnRXhwKCBcIl5cIiArIHdoaXRlc3BhY2UgKyBcIiosXCIgKyB3aGl0ZXNwYWNlICsgXCIqXCIgKSxcblx0cmNvbWJpbmF0b3JzID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqKFs+K35dfFwiICsgd2hpdGVzcGFjZSArIFwiKVwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXG5cblx0cmF0dHJpYnV0ZVF1b3RlcyA9IG5ldyBSZWdFeHAoIFwiPVwiICsgd2hpdGVzcGFjZSArIFwiKihbXlxcXFxdJ1xcXCJdKj8pXCIgKyB3aGl0ZXNwYWNlICsgXCIqXFxcXF1cIiwgXCJnXCIgKSxcblxuXHRycHNldWRvID0gbmV3IFJlZ0V4cCggcHNldWRvcyApLFxuXHRyaWRlbnRpZmllciA9IG5ldyBSZWdFeHAoIFwiXlwiICsgaWRlbnRpZmllciArIFwiJFwiICksXG5cblx0bWF0Y2hFeHByID0ge1xuXHRcdFwiSURcIjogbmV3IFJlZ0V4cCggXCJeIyhcIiArIGlkZW50aWZpZXIgKyBcIilcIiApLFxuXHRcdFwiQ0xBU1NcIjogbmV3IFJlZ0V4cCggXCJeXFxcXC4oXCIgKyBpZGVudGlmaWVyICsgXCIpXCIgKSxcblx0XHRcIlRBR1wiOiBuZXcgUmVnRXhwKCBcIl4oXCIgKyBpZGVudGlmaWVyICsgXCJ8WypdKVwiICksXG5cdFx0XCJBVFRSXCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgYXR0cmlidXRlcyApLFxuXHRcdFwiUFNFVURPXCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgcHNldWRvcyApLFxuXHRcdFwiQ0hJTERcIjogbmV3IFJlZ0V4cCggXCJeOihvbmx5fGZpcnN0fGxhc3R8bnRofG50aC1sYXN0KS0oY2hpbGR8b2YtdHlwZSkoPzpcXFxcKFwiICsgd2hpdGVzcGFjZSArXG5cdFx0XHRcIiooZXZlbnxvZGR8KChbKy1dfCkoXFxcXGQqKW58KVwiICsgd2hpdGVzcGFjZSArIFwiKig/OihbKy1dfClcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFx0XCIqKFxcXFxkKyl8KSlcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpXCIsIFwiaVwiICksXG5cdFx0XCJib29sXCI6IG5ldyBSZWdFeHAoIFwiXig/OlwiICsgYm9vbGVhbnMgKyBcIikkXCIsIFwiaVwiICksXG5cdFx0Ly8gRm9yIHVzZSBpbiBsaWJyYXJpZXMgaW1wbGVtZW50aW5nIC5pcygpXG5cdFx0Ly8gV2UgdXNlIHRoaXMgZm9yIFBPUyBtYXRjaGluZyBpbiBgc2VsZWN0YFxuXHRcdFwibmVlZHNDb250ZXh0XCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKls+K35dfDooZXZlbnxvZGR8ZXF8Z3R8bHR8bnRofGZpcnN0fGxhc3QpKD86XFxcXChcIiArXG5cdFx0XHR3aGl0ZXNwYWNlICsgXCIqKCg/Oi1cXFxcZCk/XFxcXGQqKVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFwpfCkoPz1bXi1dfCQpXCIsIFwiaVwiIClcblx0fSxcblxuXHRyaW5wdXRzID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9uKSQvaSxcblx0cmhlYWRlciA9IC9eaFxcZCQvaSxcblxuXHRybmF0aXZlID0gL15bXntdK1xce1xccypcXFtuYXRpdmUgXFx3LyxcblxuXHQvLyBFYXNpbHktcGFyc2VhYmxlL3JldHJpZXZhYmxlIElEIG9yIFRBRyBvciBDTEFTUyBzZWxlY3RvcnNcblx0cnF1aWNrRXhwciA9IC9eKD86IyhbXFx3LV0rKXwoXFx3Kyl8XFwuKFtcXHctXSspKSQvLFxuXG5cdHJzaWJsaW5nID0gL1srfl0vLFxuXG5cdC8vIENTUyBlc2NhcGVzXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCNlc2NhcGVkLWNoYXJhY3RlcnNcblx0cnVuZXNjYXBlID0gbmV3IFJlZ0V4cCggXCJcXFxcXFxcXChbXFxcXGRhLWZdezEsNn1cIiArIHdoaXRlc3BhY2UgKyBcIj98KFwiICsgd2hpdGVzcGFjZSArIFwiKXwuKVwiLCBcImlnXCIgKSxcblx0ZnVuZXNjYXBlID0gZnVuY3Rpb24oIF8sIGVzY2FwZWQsIGVzY2FwZWRXaGl0ZXNwYWNlICkge1xuXHRcdHZhciBoaWdoID0gXCIweFwiICsgZXNjYXBlZCAtIDB4MTAwMDA7XG5cdFx0Ly8gTmFOIG1lYW5zIG5vbi1jb2RlcG9pbnRcblx0XHQvLyBTdXBwb3J0OiBGaXJlZm94PDI0XG5cdFx0Ly8gV29ya2Fyb3VuZCBlcnJvbmVvdXMgbnVtZXJpYyBpbnRlcnByZXRhdGlvbiBvZiArXCIweFwiXG5cdFx0cmV0dXJuIGhpZ2ggIT09IGhpZ2ggfHwgZXNjYXBlZFdoaXRlc3BhY2UgP1xuXHRcdFx0ZXNjYXBlZCA6XG5cdFx0XHRoaWdoIDwgMCA/XG5cdFx0XHRcdC8vIEJNUCBjb2RlcG9pbnRcblx0XHRcdFx0U3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCArIDB4MTAwMDAgKSA6XG5cdFx0XHRcdC8vIFN1cHBsZW1lbnRhbCBQbGFuZSBjb2RlcG9pbnQgKHN1cnJvZ2F0ZSBwYWlyKVxuXHRcdFx0XHRTdHJpbmcuZnJvbUNoYXJDb2RlKCBoaWdoID4+IDEwIHwgMHhEODAwLCBoaWdoICYgMHgzRkYgfCAweERDMDAgKTtcblx0fSxcblxuXHQvLyBDU1Mgc3RyaW5nL2lkZW50aWZpZXIgc2VyaWFsaXphdGlvblxuXHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3Nzb20vI2NvbW1vbi1zZXJpYWxpemluZy1pZGlvbXNcblx0cmNzc2VzY2FwZSA9IC8oW1xcMC1cXHgxZlxceDdmXXxeLT9cXGQpfF4tJHxbXlxcMC1cXHgxZlxceDdmLVxcdUZGRkZcXHctXS9nLFxuXHRmY3NzZXNjYXBlID0gZnVuY3Rpb24oIGNoLCBhc0NvZGVQb2ludCApIHtcblx0XHRpZiAoIGFzQ29kZVBvaW50ICkge1xuXG5cdFx0XHQvLyBVKzAwMDAgTlVMTCBiZWNvbWVzIFUrRkZGRCBSRVBMQUNFTUVOVCBDSEFSQUNURVJcblx0XHRcdGlmICggY2ggPT09IFwiXFwwXCIgKSB7XG5cdFx0XHRcdHJldHVybiBcIlxcdUZGRkRcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29udHJvbCBjaGFyYWN0ZXJzIGFuZCAoZGVwZW5kZW50IHVwb24gcG9zaXRpb24pIG51bWJlcnMgZ2V0IGVzY2FwZWQgYXMgY29kZSBwb2ludHNcblx0XHRcdHJldHVybiBjaC5zbGljZSggMCwgLTEgKSArIFwiXFxcXFwiICsgY2guY2hhckNvZGVBdCggY2gubGVuZ3RoIC0gMSApLnRvU3RyaW5nKCAxNiApICsgXCIgXCI7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXIgcG90ZW50aWFsbHktc3BlY2lhbCBBU0NJSSBjaGFyYWN0ZXJzIGdldCBiYWNrc2xhc2gtZXNjYXBlZFxuXHRcdHJldHVybiBcIlxcXFxcIiArIGNoO1xuXHR9LFxuXG5cdC8vIFVzZWQgZm9yIGlmcmFtZXNcblx0Ly8gU2VlIHNldERvY3VtZW50KClcblx0Ly8gUmVtb3ZpbmcgdGhlIGZ1bmN0aW9uIHdyYXBwZXIgY2F1c2VzIGEgXCJQZXJtaXNzaW9uIERlbmllZFwiXG5cdC8vIGVycm9yIGluIElFXG5cdHVubG9hZEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcblx0XHRzZXREb2N1bWVudCgpO1xuXHR9LFxuXG5cdGRpc2FibGVkQW5jZXN0b3IgPSBhZGRDb21iaW5hdG9yKFxuXHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IHRydWUgJiYgKFwiZm9ybVwiIGluIGVsZW0gfHwgXCJsYWJlbFwiIGluIGVsZW0pO1xuXHRcdH0sXG5cdFx0eyBkaXI6IFwicGFyZW50Tm9kZVwiLCBuZXh0OiBcImxlZ2VuZFwiIH1cblx0KTtcblxuLy8gT3B0aW1pemUgZm9yIHB1c2guYXBwbHkoIF8sIE5vZGVMaXN0IClcbnRyeSB7XG5cdHB1c2guYXBwbHkoXG5cdFx0KGFyciA9IHNsaWNlLmNhbGwoIHByZWZlcnJlZERvYy5jaGlsZE5vZGVzICkpLFxuXHRcdHByZWZlcnJlZERvYy5jaGlsZE5vZGVzXG5cdCk7XG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQ8NC4wXG5cdC8vIERldGVjdCBzaWxlbnRseSBmYWlsaW5nIHB1c2guYXBwbHlcblx0YXJyWyBwcmVmZXJyZWREb2MuY2hpbGROb2Rlcy5sZW5ndGggXS5ub2RlVHlwZTtcbn0gY2F0Y2ggKCBlICkge1xuXHRwdXNoID0geyBhcHBseTogYXJyLmxlbmd0aCA/XG5cblx0XHQvLyBMZXZlcmFnZSBzbGljZSBpZiBwb3NzaWJsZVxuXHRcdGZ1bmN0aW9uKCB0YXJnZXQsIGVscyApIHtcblx0XHRcdHB1c2hfbmF0aXZlLmFwcGx5KCB0YXJnZXQsIHNsaWNlLmNhbGwoZWxzKSApO1xuXHRcdH0gOlxuXG5cdFx0Ly8gU3VwcG9ydDogSUU8OVxuXHRcdC8vIE90aGVyd2lzZSBhcHBlbmQgZGlyZWN0bHlcblx0XHRmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XG5cdFx0XHR2YXIgaiA9IHRhcmdldC5sZW5ndGgsXG5cdFx0XHRcdGkgPSAwO1xuXHRcdFx0Ly8gQ2FuJ3QgdHJ1c3QgTm9kZUxpc3QubGVuZ3RoXG5cdFx0XHR3aGlsZSAoICh0YXJnZXRbaisrXSA9IGVsc1tpKytdKSApIHt9XG5cdFx0XHR0YXJnZXQubGVuZ3RoID0gaiAtIDE7XG5cdFx0fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBTaXp6bGUoIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuXHR2YXIgbSwgaSwgZWxlbSwgbmlkLCBtYXRjaCwgZ3JvdXBzLCBuZXdTZWxlY3Rvcixcblx0XHRuZXdDb250ZXh0ID0gY29udGV4dCAmJiBjb250ZXh0Lm93bmVyRG9jdW1lbnQsXG5cblx0XHQvLyBub2RlVHlwZSBkZWZhdWx0cyB0byA5LCBzaW5jZSBjb250ZXh0IGRlZmF1bHRzIHRvIGRvY3VtZW50XG5cdFx0bm9kZVR5cGUgPSBjb250ZXh0ID8gY29udGV4dC5ub2RlVHlwZSA6IDk7XG5cblx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cblx0Ly8gUmV0dXJuIGVhcmx5IGZyb20gY2FsbHMgd2l0aCBpbnZhbGlkIHNlbGVjdG9yIG9yIGNvbnRleHRcblx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgfHwgIXNlbGVjdG9yIHx8XG5cdFx0bm9kZVR5cGUgIT09IDEgJiYgbm9kZVR5cGUgIT09IDkgJiYgbm9kZVR5cGUgIT09IDExICkge1xuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH1cblxuXHQvLyBUcnkgdG8gc2hvcnRjdXQgZmluZCBvcGVyYXRpb25zIChhcyBvcHBvc2VkIHRvIGZpbHRlcnMpIGluIEhUTUwgZG9jdW1lbnRzXG5cdGlmICggIXNlZWQgKSB7XG5cblx0XHRpZiAoICggY29udGV4dCA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogcHJlZmVycmVkRG9jICkgIT09IGRvY3VtZW50ICkge1xuXHRcdFx0c2V0RG9jdW1lbnQoIGNvbnRleHQgKTtcblx0XHR9XG5cdFx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cblx0XHRpZiAoIGRvY3VtZW50SXNIVE1MICkge1xuXG5cdFx0XHQvLyBJZiB0aGUgc2VsZWN0b3IgaXMgc3VmZmljaWVudGx5IHNpbXBsZSwgdHJ5IHVzaW5nIGEgXCJnZXQqQnkqXCIgRE9NIG1ldGhvZFxuXHRcdFx0Ly8gKGV4Y2VwdGluZyBEb2N1bWVudEZyYWdtZW50IGNvbnRleHQsIHdoZXJlIHRoZSBtZXRob2RzIGRvbid0IGV4aXN0KVxuXHRcdFx0aWYgKCBub2RlVHlwZSAhPT0gMTEgJiYgKG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApKSApIHtcblxuXHRcdFx0XHQvLyBJRCBzZWxlY3RvclxuXHRcdFx0XHRpZiAoIChtID0gbWF0Y2hbMV0pICkge1xuXG5cdFx0XHRcdFx0Ly8gRG9jdW1lbnQgY29udGV4dFxuXHRcdFx0XHRcdGlmICggbm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIChlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggbSApKSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSwgT3BlcmEsIFdlYmtpdFxuXHRcdFx0XHRcdFx0XHQvLyBUT0RPOiBpZGVudGlmeSB2ZXJzaW9uc1xuXHRcdFx0XHRcdFx0XHQvLyBnZXRFbGVtZW50QnlJZCBjYW4gbWF0Y2ggZWxlbWVudHMgYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG5cdFx0XHRcdFx0XHRcdGlmICggZWxlbS5pZCA9PT0gbSApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBFbGVtZW50IGNvbnRleHRcblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSwgT3BlcmEsIFdlYmtpdFxuXHRcdFx0XHRcdFx0Ly8gVE9ETzogaWRlbnRpZnkgdmVyc2lvbnNcblx0XHRcdFx0XHRcdC8vIGdldEVsZW1lbnRCeUlkIGNhbiBtYXRjaCBlbGVtZW50cyBieSBuYW1lIGluc3RlYWQgb2YgSURcblx0XHRcdFx0XHRcdGlmICggbmV3Q29udGV4dCAmJiAoZWxlbSA9IG5ld0NvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIG0gKSkgJiZcblx0XHRcdFx0XHRcdFx0Y29udGFpbnMoIGNvbnRleHQsIGVsZW0gKSAmJlxuXHRcdFx0XHRcdFx0XHRlbGVtLmlkID09PSBtICkge1xuXG5cdFx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVHlwZSBzZWxlY3RvclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBtYXRjaFsyXSApIHtcblx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCBzZWxlY3RvciApICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cblx0XHRcdFx0Ly8gQ2xhc3Mgc2VsZWN0b3Jcblx0XHRcdFx0fSBlbHNlIGlmICggKG0gPSBtYXRjaFszXSkgJiYgc3VwcG9ydC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICYmXG5cdFx0XHRcdFx0Y29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lICkge1xuXG5cdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBtICkgKTtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBUYWtlIGFkdmFudGFnZSBvZiBxdWVyeVNlbGVjdG9yQWxsXG5cdFx0XHRpZiAoIHN1cHBvcnQucXNhICYmXG5cdFx0XHRcdCFjb21waWxlckNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF0gJiZcblx0XHRcdFx0KCFyYnVnZ3lRU0EgfHwgIXJidWdneVFTQS50ZXN0KCBzZWxlY3RvciApKSApIHtcblxuXHRcdFx0XHRpZiAoIG5vZGVUeXBlICE9PSAxICkge1xuXHRcdFx0XHRcdG5ld0NvbnRleHQgPSBjb250ZXh0O1xuXHRcdFx0XHRcdG5ld1NlbGVjdG9yID0gc2VsZWN0b3I7XG5cblx0XHRcdFx0Ly8gcVNBIGxvb2tzIG91dHNpZGUgRWxlbWVudCBjb250ZXh0LCB3aGljaCBpcyBub3Qgd2hhdCB3ZSB3YW50XG5cdFx0XHRcdC8vIFRoYW5rcyB0byBBbmRyZXcgRHVwb250IGZvciB0aGlzIHdvcmthcm91bmQgdGVjaG5pcXVlXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OFxuXHRcdFx0XHQvLyBFeGNsdWRlIG9iamVjdCBlbGVtZW50c1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBjb250ZXh0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHRcdFx0XHQvLyBDYXB0dXJlIHRoZSBjb250ZXh0IElELCBzZXR0aW5nIGl0IGZpcnN0IGlmIG5lY2Vzc2FyeVxuXHRcdFx0XHRcdGlmICggKG5pZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKCBcImlkXCIgKSkgKSB7XG5cdFx0XHRcdFx0XHRuaWQgPSBuaWQucmVwbGFjZSggcmNzc2VzY2FwZSwgZmNzc2VzY2FwZSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb250ZXh0LnNldEF0dHJpYnV0ZSggXCJpZFwiLCAobmlkID0gZXhwYW5kbykgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBQcmVmaXggZXZlcnkgc2VsZWN0b3IgaW4gdGhlIGxpc3Rcblx0XHRcdFx0XHRncm91cHMgPSB0b2tlbml6ZSggc2VsZWN0b3IgKTtcblx0XHRcdFx0XHRpID0gZ3JvdXBzLmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdGdyb3Vwc1tpXSA9IFwiI1wiICsgbmlkICsgXCIgXCIgKyB0b1NlbGVjdG9yKCBncm91cHNbaV0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bmV3U2VsZWN0b3IgPSBncm91cHMuam9pbiggXCIsXCIgKTtcblxuXHRcdFx0XHRcdC8vIEV4cGFuZCBjb250ZXh0IGZvciBzaWJsaW5nIHNlbGVjdG9yc1xuXHRcdFx0XHRcdG5ld0NvbnRleHQgPSByc2libGluZy50ZXN0KCBzZWxlY3RvciApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fFxuXHRcdFx0XHRcdFx0Y29udGV4dDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggbmV3U2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsXG5cdFx0XHRcdFx0XHRcdG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbCggbmV3U2VsZWN0b3IgKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKCBxc2FFcnJvciApIHtcblx0XHRcdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRcdFx0aWYgKCBuaWQgPT09IGV4cGFuZG8gKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRleHQucmVtb3ZlQXR0cmlidXRlKCBcImlkXCIgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBBbGwgb3RoZXJzXG5cdHJldHVybiBzZWxlY3QoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApO1xufVxuXG4vKipcbiAqIENyZWF0ZSBrZXktdmFsdWUgY2FjaGVzIG9mIGxpbWl0ZWQgc2l6ZVxuICogQHJldHVybnMge2Z1bmN0aW9uKHN0cmluZywgb2JqZWN0KX0gUmV0dXJucyB0aGUgT2JqZWN0IGRhdGEgYWZ0ZXIgc3RvcmluZyBpdCBvbiBpdHNlbGYgd2l0aFxuICpcdHByb3BlcnR5IG5hbWUgdGhlIChzcGFjZS1zdWZmaXhlZCkgc3RyaW5nIGFuZCAoaWYgdGhlIGNhY2hlIGlzIGxhcmdlciB0aGFuIEV4cHIuY2FjaGVMZW5ndGgpXG4gKlx0ZGVsZXRpbmcgdGhlIG9sZGVzdCBlbnRyeVxuICovXG5mdW5jdGlvbiBjcmVhdGVDYWNoZSgpIHtcblx0dmFyIGtleXMgPSBbXTtcblxuXHRmdW5jdGlvbiBjYWNoZSgga2V5LCB2YWx1ZSApIHtcblx0XHQvLyBVc2UgKGtleSArIFwiIFwiKSB0byBhdm9pZCBjb2xsaXNpb24gd2l0aCBuYXRpdmUgcHJvdG90eXBlIHByb3BlcnRpZXMgKHNlZSBJc3N1ZSAjMTU3KVxuXHRcdGlmICgga2V5cy5wdXNoKCBrZXkgKyBcIiBcIiApID4gRXhwci5jYWNoZUxlbmd0aCApIHtcblx0XHRcdC8vIE9ubHkga2VlcCB0aGUgbW9zdCByZWNlbnQgZW50cmllc1xuXHRcdFx0ZGVsZXRlIGNhY2hlWyBrZXlzLnNoaWZ0KCkgXTtcblx0XHR9XG5cdFx0cmV0dXJuIChjYWNoZVsga2V5ICsgXCIgXCIgXSA9IHZhbHVlKTtcblx0fVxuXHRyZXR1cm4gY2FjaGU7XG59XG5cbi8qKlxuICogTWFyayBhIGZ1bmN0aW9uIGZvciBzcGVjaWFsIHVzZSBieSBTaXp6bGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBtYXJrXG4gKi9cbmZ1bmN0aW9uIG1hcmtGdW5jdGlvbiggZm4gKSB7XG5cdGZuWyBleHBhbmRvIF0gPSB0cnVlO1xuXHRyZXR1cm4gZm47XG59XG5cbi8qKlxuICogU3VwcG9ydCB0ZXN0aW5nIHVzaW5nIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFBhc3NlZCB0aGUgY3JlYXRlZCBlbGVtZW50IGFuZCByZXR1cm5zIGEgYm9vbGVhbiByZXN1bHRcbiAqL1xuZnVuY3Rpb24gYXNzZXJ0KCBmbiApIHtcblx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO1xuXG5cdHRyeSB7XG5cdFx0cmV0dXJuICEhZm4oIGVsICk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0gZmluYWxseSB7XG5cdFx0Ly8gUmVtb3ZlIGZyb20gaXRzIHBhcmVudCBieSBkZWZhdWx0XG5cdFx0aWYgKCBlbC5wYXJlbnROb2RlICkge1xuXHRcdFx0ZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZWwgKTtcblx0XHR9XG5cdFx0Ly8gcmVsZWFzZSBtZW1vcnkgaW4gSUVcblx0XHRlbCA9IG51bGw7XG5cdH1cbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBzYW1lIGhhbmRsZXIgZm9yIGFsbCBvZiB0aGUgc3BlY2lmaWVkIGF0dHJzXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cnMgUGlwZS1zZXBhcmF0ZWQgbGlzdCBvZiBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIFRoZSBtZXRob2QgdGhhdCB3aWxsIGJlIGFwcGxpZWRcbiAqL1xuZnVuY3Rpb24gYWRkSGFuZGxlKCBhdHRycywgaGFuZGxlciApIHtcblx0dmFyIGFyciA9IGF0dHJzLnNwbGl0KFwifFwiKSxcblx0XHRpID0gYXJyLmxlbmd0aDtcblxuXHR3aGlsZSAoIGktLSApIHtcblx0XHRFeHByLmF0dHJIYW5kbGVbIGFycltpXSBdID0gaGFuZGxlcjtcblx0fVxufVxuXG4vKipcbiAqIENoZWNrcyBkb2N1bWVudCBvcmRlciBvZiB0d28gc2libGluZ3NcbiAqIEBwYXJhbSB7RWxlbWVudH0gYVxuICogQHBhcmFtIHtFbGVtZW50fSBiXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIGxlc3MgdGhhbiAwIGlmIGEgcHJlY2VkZXMgYiwgZ3JlYXRlciB0aGFuIDAgaWYgYSBmb2xsb3dzIGJcbiAqL1xuZnVuY3Rpb24gc2libGluZ0NoZWNrKCBhLCBiICkge1xuXHR2YXIgY3VyID0gYiAmJiBhLFxuXHRcdGRpZmYgPSBjdXIgJiYgYS5ub2RlVHlwZSA9PT0gMSAmJiBiLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRhLnNvdXJjZUluZGV4IC0gYi5zb3VyY2VJbmRleDtcblxuXHQvLyBVc2UgSUUgc291cmNlSW5kZXggaWYgYXZhaWxhYmxlIG9uIGJvdGggbm9kZXNcblx0aWYgKCBkaWZmICkge1xuXHRcdHJldHVybiBkaWZmO1xuXHR9XG5cblx0Ly8gQ2hlY2sgaWYgYiBmb2xsb3dzIGFcblx0aWYgKCBjdXIgKSB7XG5cdFx0d2hpbGUgKCAoY3VyID0gY3VyLm5leHRTaWJsaW5nKSApIHtcblx0XHRcdGlmICggY3VyID09PSBiICkge1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGEgPyAxIDogLTE7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBpbnB1dCB0eXBlc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5wdXRQc2V1ZG8oIHR5cGUgKSB7XG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRyZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGJ1dHRvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvblBzZXVkbyggdHlwZSApIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdHJldHVybiAobmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCIpICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIDplbmFibGVkLzpkaXNhYmxlZFxuICogQHBhcmFtIHtCb29sZWFufSBkaXNhYmxlZCB0cnVlIGZvciA6ZGlzYWJsZWQ7IGZhbHNlIGZvciA6ZW5hYmxlZFxuICovXG5mdW5jdGlvbiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggZGlzYWJsZWQgKSB7XG5cblx0Ly8gS25vd24gOmRpc2FibGVkIGZhbHNlIHBvc2l0aXZlczogZmllbGRzZXRbZGlzYWJsZWRdID4gbGVnZW5kOm50aC1vZi10eXBlKG4rMikgOmNhbi1kaXNhYmxlXG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIE9ubHkgY2VydGFpbiBlbGVtZW50cyBjYW4gbWF0Y2ggOmVuYWJsZWQgb3IgOmRpc2FibGVkXG5cdFx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc2NyaXB0aW5nLmh0bWwjc2VsZWN0b3ItZW5hYmxlZFxuXHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3NjcmlwdGluZy5odG1sI3NlbGVjdG9yLWRpc2FibGVkXG5cdFx0aWYgKCBcImZvcm1cIiBpbiBlbGVtICkge1xuXG5cdFx0XHQvLyBDaGVjayBmb3IgaW5oZXJpdGVkIGRpc2FibGVkbmVzcyBvbiByZWxldmFudCBub24tZGlzYWJsZWQgZWxlbWVudHM6XG5cdFx0XHQvLyAqIGxpc3RlZCBmb3JtLWFzc29jaWF0ZWQgZWxlbWVudHMgaW4gYSBkaXNhYmxlZCBmaWVsZHNldFxuXHRcdFx0Ly8gICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI2NhdGVnb3J5LWxpc3RlZFxuXHRcdFx0Ly8gICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI2NvbmNlcHQtZmUtZGlzYWJsZWRcblx0XHRcdC8vICogb3B0aW9uIGVsZW1lbnRzIGluIGEgZGlzYWJsZWQgb3B0Z3JvdXBcblx0XHRcdC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjb25jZXB0LW9wdGlvbi1kaXNhYmxlZFxuXHRcdFx0Ly8gQWxsIHN1Y2ggZWxlbWVudHMgaGF2ZSBhIFwiZm9ybVwiIHByb3BlcnR5LlxuXHRcdFx0aWYgKCBlbGVtLnBhcmVudE5vZGUgJiYgZWxlbS5kaXNhYmxlZCA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0Ly8gT3B0aW9uIGVsZW1lbnRzIGRlZmVyIHRvIGEgcGFyZW50IG9wdGdyb3VwIGlmIHByZXNlbnRcblx0XHRcdFx0aWYgKCBcImxhYmVsXCIgaW4gZWxlbSApIHtcblx0XHRcdFx0XHRpZiAoIFwibGFiZWxcIiBpbiBlbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbS5wYXJlbnROb2RlLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDYgLSAxMVxuXHRcdFx0XHQvLyBVc2UgdGhlIGlzRGlzYWJsZWQgc2hvcnRjdXQgcHJvcGVydHkgdG8gY2hlY2sgZm9yIGRpc2FibGVkIGZpZWxkc2V0IGFuY2VzdG9yc1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5pc0Rpc2FibGVkID09PSBkaXNhYmxlZCB8fFxuXG5cdFx0XHRcdFx0Ly8gV2hlcmUgdGhlcmUgaXMgbm8gaXNEaXNhYmxlZCwgY2hlY2sgbWFudWFsbHlcblx0XHRcdFx0XHQvKiBqc2hpbnQgLVcwMTggKi9cblx0XHRcdFx0XHRlbGVtLmlzRGlzYWJsZWQgIT09ICFkaXNhYmxlZCAmJlxuXHRcdFx0XHRcdFx0ZGlzYWJsZWRBbmNlc3RvciggZWxlbSApID09PSBkaXNhYmxlZDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXG5cdFx0Ly8gVHJ5IHRvIHdpbm5vdyBvdXQgZWxlbWVudHMgdGhhdCBjYW4ndCBiZSBkaXNhYmxlZCBiZWZvcmUgdHJ1c3RpbmcgdGhlIGRpc2FibGVkIHByb3BlcnR5LlxuXHRcdC8vIFNvbWUgdmljdGltcyBnZXQgY2F1Z2h0IGluIG91ciBuZXQgKGxhYmVsLCBsZWdlbmQsIG1lbnUsIHRyYWNrKSwgYnV0IGl0IHNob3VsZG4ndFxuXHRcdC8vIGV2ZW4gZXhpc3Qgb24gdGhlbSwgbGV0IGFsb25lIGhhdmUgYSBib29sZWFuIHZhbHVlLlxuXHRcdH0gZWxzZSBpZiAoIFwibGFiZWxcIiBpbiBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXHRcdH1cblxuXHRcdC8vIFJlbWFpbmluZyBlbGVtZW50cyBhcmUgbmVpdGhlciA6ZW5hYmxlZCBub3IgOmRpc2FibGVkXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgcG9zaXRpb25hbHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oIGZuICkge1xuXHRyZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBhcmd1bWVudCApIHtcblx0XHRhcmd1bWVudCA9ICthcmd1bWVudDtcblx0XHRyZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuXHRcdFx0dmFyIGosXG5cdFx0XHRcdG1hdGNoSW5kZXhlcyA9IGZuKCBbXSwgc2VlZC5sZW5ndGgsIGFyZ3VtZW50ICksXG5cdFx0XHRcdGkgPSBtYXRjaEluZGV4ZXMubGVuZ3RoO1xuXG5cdFx0XHQvLyBNYXRjaCBlbGVtZW50cyBmb3VuZCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4ZXNcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoIHNlZWRbIChqID0gbWF0Y2hJbmRleGVzW2ldKSBdICkge1xuXHRcdFx0XHRcdHNlZWRbal0gPSAhKG1hdGNoZXNbal0gPSBzZWVkW2pdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgYSBub2RlIGZvciB2YWxpZGl0eSBhcyBhIFNpenpsZSBjb250ZXh0XG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0PX0gY29udGV4dFxuICogQHJldHVybnMge0VsZW1lbnR8T2JqZWN0fEJvb2xlYW59IFRoZSBpbnB1dCBub2RlIGlmIGFjY2VwdGFibGUsIG90aGVyd2lzZSBhIGZhbHN5IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHRlc3RDb250ZXh0KCBjb250ZXh0ICkge1xuXHRyZXR1cm4gY29udGV4dCAmJiB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb250ZXh0O1xufVxuXG4vLyBFeHBvc2Ugc3VwcG9ydCB2YXJzIGZvciBjb252ZW5pZW5jZVxuc3VwcG9ydCA9IFNpenpsZS5zdXBwb3J0ID0ge307XG5cbi8qKlxuICogRGV0ZWN0cyBYTUwgbm9kZXNcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IGVsZW0gQW4gZWxlbWVudCBvciBhIGRvY3VtZW50XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZmYgZWxlbSBpcyBhIG5vbi1IVE1MIFhNTCBub2RlXG4gKi9cbmlzWE1MID0gU2l6emxlLmlzWE1MID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdC8vIGRvY3VtZW50RWxlbWVudCBpcyB2ZXJpZmllZCBmb3IgY2FzZXMgd2hlcmUgaXQgZG9lc24ndCB5ZXQgZXhpc3Rcblx0Ly8gKHN1Y2ggYXMgbG9hZGluZyBpZnJhbWVzIGluIElFIC0gIzQ4MzMpXG5cdHZhciBkb2N1bWVudEVsZW1lbnQgPSBlbGVtICYmIChlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSkuZG9jdW1lbnRFbGVtZW50O1xuXHRyZXR1cm4gZG9jdW1lbnRFbGVtZW50ID8gZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lICE9PSBcIkhUTUxcIiA6IGZhbHNlO1xufTtcblxuLyoqXG4gKiBTZXRzIGRvY3VtZW50LXJlbGF0ZWQgdmFyaWFibGVzIG9uY2UgYmFzZWQgb24gdGhlIGN1cnJlbnQgZG9jdW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3R9IFtkb2NdIEFuIGVsZW1lbnQgb3IgZG9jdW1lbnQgb2JqZWN0IHRvIHVzZSB0byBzZXQgdGhlIGRvY3VtZW50XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKi9cbnNldERvY3VtZW50ID0gU2l6emxlLnNldERvY3VtZW50ID0gZnVuY3Rpb24oIG5vZGUgKSB7XG5cdHZhciBoYXNDb21wYXJlLCBzdWJXaW5kb3csXG5cdFx0ZG9jID0gbm9kZSA/IG5vZGUub3duZXJEb2N1bWVudCB8fCBub2RlIDogcHJlZmVycmVkRG9jO1xuXG5cdC8vIFJldHVybiBlYXJseSBpZiBkb2MgaXMgaW52YWxpZCBvciBhbHJlYWR5IHNlbGVjdGVkXG5cdGlmICggZG9jID09PSBkb2N1bWVudCB8fCBkb2Mubm9kZVR5cGUgIT09IDkgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQgKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50O1xuXHR9XG5cblx0Ly8gVXBkYXRlIGdsb2JhbCB2YXJpYWJsZXNcblx0ZG9jdW1lbnQgPSBkb2M7XG5cdGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cdGRvY3VtZW50SXNIVE1MID0gIWlzWE1MKCBkb2N1bWVudCApO1xuXG5cdC8vIFN1cHBvcnQ6IElFIDktMTEsIEVkZ2Vcblx0Ly8gQWNjZXNzaW5nIGlmcmFtZSBkb2N1bWVudHMgYWZ0ZXIgdW5sb2FkIHRocm93cyBcInBlcm1pc3Npb24gZGVuaWVkXCIgZXJyb3JzIChqUXVlcnkgIzEzOTM2KVxuXHRpZiAoIHByZWZlcnJlZERvYyAhPT0gZG9jdW1lbnQgJiZcblx0XHQoc3ViV2luZG93ID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcpICYmIHN1YldpbmRvdy50b3AgIT09IHN1YldpbmRvdyApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDExLCBFZGdlXG5cdFx0aWYgKCBzdWJXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdHN1YldpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBcInVubG9hZFwiLCB1bmxvYWRIYW5kbGVyLCBmYWxzZSApO1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgOSAtIDEwIG9ubHlcblx0XHR9IGVsc2UgaWYgKCBzdWJXaW5kb3cuYXR0YWNoRXZlbnQgKSB7XG5cdFx0XHRzdWJXaW5kb3cuYXR0YWNoRXZlbnQoIFwib251bmxvYWRcIiwgdW5sb2FkSGFuZGxlciApO1xuXHRcdH1cblx0fVxuXG5cdC8qIEF0dHJpYnV0ZXNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cdC8vIFN1cHBvcnQ6IElFPDhcblx0Ly8gVmVyaWZ5IHRoYXQgZ2V0QXR0cmlidXRlIHJlYWxseSByZXR1cm5zIGF0dHJpYnV0ZXMgYW5kIG5vdCBwcm9wZXJ0aWVzXG5cdC8vIChleGNlcHRpbmcgSUU4IGJvb2xlYW5zKVxuXHRzdXBwb3J0LmF0dHJpYnV0ZXMgPSBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdGVsLmNsYXNzTmFtZSA9IFwiaVwiO1xuXHRcdHJldHVybiAhZWwuZ2V0QXR0cmlidXRlKFwiY2xhc3NOYW1lXCIpO1xuXHR9KTtcblxuXHQvKiBnZXRFbGVtZW50KHMpQnkqXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikgcmV0dXJucyBvbmx5IGVsZW1lbnRzXG5cdHN1cHBvcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPSBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdGVsLmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVDb21tZW50KFwiXCIpICk7XG5cdFx0cmV0dXJuICFlbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikubGVuZ3RoO1xuXHR9KTtcblxuXHQvLyBTdXBwb3J0OiBJRTw5XG5cdHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IHJuYXRpdmUudGVzdCggZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApO1xuXG5cdC8vIFN1cHBvcnQ6IElFPDEwXG5cdC8vIENoZWNrIGlmIGdldEVsZW1lbnRCeUlkIHJldHVybnMgZWxlbWVudHMgYnkgbmFtZVxuXHQvLyBUaGUgYnJva2VuIGdldEVsZW1lbnRCeUlkIG1ldGhvZHMgZG9uJ3QgcGljayB1cCBwcm9ncmFtbWF0aWNhbGx5LXNldCBuYW1lcyxcblx0Ly8gc28gdXNlIGEgcm91bmRhYm91dCBnZXRFbGVtZW50c0J5TmFtZSB0ZXN0XG5cdHN1cHBvcnQuZ2V0QnlJZCA9IGFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZWwgKS5pZCA9IGV4cGFuZG87XG5cdFx0cmV0dXJuICFkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSB8fCAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoIGV4cGFuZG8gKS5sZW5ndGg7XG5cdH0pO1xuXG5cdC8vIElEIGZpbHRlciBhbmQgZmluZFxuXHRpZiAoIHN1cHBvcnQuZ2V0QnlJZCApIHtcblx0XHRFeHByLmZpbHRlcltcIklEXCJdID0gZnVuY3Rpb24oIGlkICkge1xuXHRcdFx0dmFyIGF0dHJJZCA9IGlkLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBhdHRySWQ7XG5cdFx0XHR9O1xuXHRcdH07XG5cdFx0RXhwci5maW5kW1wiSURcIl0gPSBmdW5jdGlvbiggaWQsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRCeUlkICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50SXNIVE1MICkge1xuXHRcdFx0XHR2YXIgZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIGlkICk7XG5cdFx0XHRcdHJldHVybiBlbGVtID8gWyBlbGVtIF0gOiBbXTtcblx0XHRcdH1cblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdEV4cHIuZmlsdGVyW1wiSURcIl0gPSAgZnVuY3Rpb24oIGlkICkge1xuXHRcdFx0dmFyIGF0dHJJZCA9IGlkLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciBub2RlID0gdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlTm9kZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuXHRcdFx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlTm9kZShcImlkXCIpO1xuXHRcdFx0XHRyZXR1cm4gbm9kZSAmJiBub2RlLnZhbHVlID09PSBhdHRySWQ7XG5cdFx0XHR9O1xuXHRcdH07XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA2IC0gNyBvbmx5XG5cdFx0Ly8gZ2V0RWxlbWVudEJ5SWQgaXMgbm90IHJlbGlhYmxlIGFzIGEgZmluZCBzaG9ydGN1dFxuXHRcdEV4cHIuZmluZFtcIklEXCJdID0gZnVuY3Rpb24oIGlkLCBjb250ZXh0ICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50QnlJZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdFx0dmFyIG5vZGUsIGksIGVsZW1zLFxuXHRcdFx0XHRcdGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuXG5cdFx0XHRcdGlmICggZWxlbSApIHtcblxuXHRcdFx0XHRcdC8vIFZlcmlmeSB0aGUgaWQgYXR0cmlidXRlXG5cdFx0XHRcdFx0bm9kZSA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZShcImlkXCIpO1xuXHRcdFx0XHRcdGlmICggbm9kZSAmJiBub2RlLnZhbHVlID09PSBpZCApIHtcblx0XHRcdFx0XHRcdHJldHVybiBbIGVsZW0gXTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBGYWxsIGJhY2sgb24gZ2V0RWxlbWVudHNCeU5hbWVcblx0XHRcdFx0XHRlbGVtcyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeU5hbWUoIGlkICk7XG5cdFx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1zW2krK10pICkge1xuXHRcdFx0XHRcdFx0bm9kZSA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZShcImlkXCIpO1xuXHRcdFx0XHRcdFx0aWYgKCBub2RlICYmIG5vZGUudmFsdWUgPT09IGlkICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gWyBlbGVtIF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHQvLyBUYWdcblx0RXhwci5maW5kW1wiVEFHXCJdID0gc3VwcG9ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSA/XG5cdFx0ZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcblxuXHRcdFx0Ly8gRG9jdW1lbnRGcmFnbWVudCBub2RlcyBkb24ndCBoYXZlIGdFQlROXG5cdFx0XHR9IGVsc2UgaWYgKCBzdXBwb3J0LnFzYSApIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCggdGFnICk7XG5cdFx0XHR9XG5cdFx0fSA6XG5cblx0XHRmdW5jdGlvbiggdGFnLCBjb250ZXh0ICkge1xuXHRcdFx0dmFyIGVsZW0sXG5cdFx0XHRcdHRtcCA9IFtdLFxuXHRcdFx0XHRpID0gMCxcblx0XHRcdFx0Ly8gQnkgaGFwcHkgY29pbmNpZGVuY2UsIGEgKGJyb2tlbikgZ0VCVE4gYXBwZWFycyBvbiBEb2N1bWVudEZyYWdtZW50IG5vZGVzIHRvb1xuXHRcdFx0XHRyZXN1bHRzID0gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cblx0XHRcdC8vIEZpbHRlciBvdXQgcG9zc2libGUgY29tbWVudHNcblx0XHRcdGlmICggdGFnID09PSBcIipcIiApIHtcblx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IHJlc3VsdHNbaSsrXSkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRcdFx0dG1wLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdG1wO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0fTtcblxuXHQvLyBDbGFzc1xuXHRFeHByLmZpbmRbXCJDTEFTU1wiXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJiBmdW5jdGlvbiggY2xhc3NOYW1lLCBjb250ZXh0ICkge1xuXHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdHJldHVybiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIGNsYXNzTmFtZSApO1xuXHRcdH1cblx0fTtcblxuXHQvKiBRU0EvbWF0Y2hlc1NlbGVjdG9yXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBRU0EgYW5kIG1hdGNoZXNTZWxlY3RvciBzdXBwb3J0XG5cblx0Ly8gbWF0Y2hlc1NlbGVjdG9yKDphY3RpdmUpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChJRTkvT3BlcmEgMTEuNSlcblx0cmJ1Z2d5TWF0Y2hlcyA9IFtdO1xuXG5cdC8vIHFTYSg6Zm9jdXMpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChDaHJvbWUgMjEpXG5cdC8vIFdlIGFsbG93IHRoaXMgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBJRTgvOSB0aGF0IHRocm93cyBhbiBlcnJvclxuXHQvLyB3aGVuZXZlciBgZG9jdW1lbnQuYWN0aXZlRWxlbWVudGAgaXMgYWNjZXNzZWQgb24gYW4gaWZyYW1lXG5cdC8vIFNvLCB3ZSBhbGxvdyA6Zm9jdXMgdG8gcGFzcyB0aHJvdWdoIFFTQSBhbGwgdGhlIHRpbWUgdG8gYXZvaWQgdGhlIElFIGVycm9yXG5cdC8vIFNlZSBodHRwczovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTMzNzhcblx0cmJ1Z2d5UVNBID0gW107XG5cblx0aWYgKCAoc3VwcG9ydC5xc2EgPSBybmF0aXZlLnRlc3QoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgKSkgKSB7XG5cdFx0Ly8gQnVpbGQgUVNBIHJlZ2V4XG5cdFx0Ly8gUmVnZXggc3RyYXRlZ3kgYWRvcHRlZCBmcm9tIERpZWdvIFBlcmluaVxuXHRcdGFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdFx0XHQvLyBTZWxlY3QgaXMgc2V0IHRvIGVtcHR5IHN0cmluZyBvbiBwdXJwb3NlXG5cdFx0XHQvLyBUaGlzIGlzIHRvIHRlc3QgSUUncyB0cmVhdG1lbnQgb2Ygbm90IGV4cGxpY2l0bHlcblx0XHRcdC8vIHNldHRpbmcgYSBib29sZWFuIGNvbnRlbnQgYXR0cmlidXRlLFxuXHRcdFx0Ly8gc2luY2UgaXRzIHByZXNlbmNlIHNob3VsZCBiZSBlbm91Z2hcblx0XHRcdC8vIGh0dHBzOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjM1OVxuXHRcdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZWwgKS5pbm5lckhUTUwgPSBcIjxhIGlkPSdcIiArIGV4cGFuZG8gKyBcIic+PC9hPlwiICtcblx0XHRcdFx0XCI8c2VsZWN0IGlkPSdcIiArIGV4cGFuZG8gKyBcIi1cXHJcXFxcJyBtc2FsbG93Y2FwdHVyZT0nJz5cIiArXG5cdFx0XHRcdFwiPG9wdGlvbiBzZWxlY3RlZD0nJz48L29wdGlvbj48L3NlbGVjdD5cIjtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4LCBPcGVyYSAxMS0xMi4xNlxuXHRcdFx0Ly8gTm90aGluZyBzaG91bGQgYmUgc2VsZWN0ZWQgd2hlbiBlbXB0eSBzdHJpbmdzIGZvbGxvdyBePSBvciAkPSBvciAqPVxuXHRcdFx0Ly8gVGhlIHRlc3QgYXR0cmlidXRlIG11c3QgYmUgdW5rbm93biBpbiBPcGVyYSBidXQgXCJzYWZlXCIgZm9yIFdpblJUXG5cdFx0XHQvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2hoNDY1Mzg4LmFzcHgjYXR0cmlidXRlX3NlY3Rpb25cblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbChcIlttc2FsbG93Y2FwdHVyZV49JyddXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiWypeJF09XCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86Jyd8XFxcIlxcXCIpXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4XG5cdFx0XHQvLyBCb29sZWFuIGF0dHJpYnV0ZXMgYW5kIFwidmFsdWVcIiBhcmUgbm90IHRyZWF0ZWQgY29ycmVjdGx5XG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKFwiW3NlbGVjdGVkXVwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIlxcXFxbXCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86dmFsdWV8XCIgKyBib29sZWFucyArIFwiKVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZTwyOSwgQW5kcm9pZDw0LjQsIFNhZmFyaTw3LjArLCBpT1M8Ny4wKywgUGhhbnRvbUpTPDEuOS44K1xuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbCggXCJbaWR+PVwiICsgZXhwYW5kbyArIFwiLV1cIiApLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCJ+PVwiKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV2Via2l0L09wZXJhIC0gOmNoZWNrZWQgc2hvdWxkIHJldHVybiBzZWxlY3RlZCBvcHRpb24gZWxlbWVudHNcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXG5cdFx0XHQvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbChcIjpjaGVja2VkXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCI6Y2hlY2tlZFwiKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3VwcG9ydDogU2FmYXJpIDgrLCBpT1MgOCtcblx0XHRcdC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzY4NTFcblx0XHRcdC8vIEluLXBhZ2UgYHNlbGVjdG9yI2lkIHNpYmxpbmctY29tYmluYXRvciBzZWxlY3RvcmAgZmFpbHNcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiYSNcIiArIGV4cGFuZG8gKyBcIisqXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKFwiLiMuK1srfl1cIik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdFx0ZWwuaW5uZXJIVE1MID0gXCI8YSBocmVmPScnIGRpc2FibGVkPSdkaXNhYmxlZCc+PC9hPlwiICtcblx0XHRcdFx0XCI8c2VsZWN0IGRpc2FibGVkPSdkaXNhYmxlZCc+PG9wdGlvbi8+PC9zZWxlY3Q+XCI7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IFdpbmRvd3MgOCBOYXRpdmUgQXBwc1xuXHRcdFx0Ly8gVGhlIHR5cGUgYW5kIG5hbWUgYXR0cmlidXRlcyBhcmUgcmVzdHJpY3RlZCBkdXJpbmcgLmlubmVySFRNTCBhc3NpZ25tZW50XG5cdFx0XHR2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcImhpZGRlblwiICk7XG5cdFx0XHRlbC5hcHBlbmRDaGlsZCggaW5wdXQgKS5zZXRBdHRyaWJ1dGUoIFwibmFtZVwiLCBcIkRcIiApO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRThcblx0XHRcdC8vIEVuZm9yY2UgY2FzZS1zZW5zaXRpdml0eSBvZiBuYW1lIGF0dHJpYnV0ZVxuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKFwiW25hbWU9ZF1cIikubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJuYW1lXCIgKyB3aGl0ZXNwYWNlICsgXCIqWypeJHwhfl0/PVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZGIDMuNSAtIDplbmFibGVkLzpkaXNhYmxlZCBhbmQgaGlkZGVuIGVsZW1lbnRzIChoaWRkZW4gZWxlbWVudHMgYXJlIHN0aWxsIGVuYWJsZWQpXG5cdFx0XHQvLyBJRTggdGhyb3dzIGVycm9yIGhlcmUgYW5kIHdpbGwgbm90IHNlZSBsYXRlciB0ZXN0c1xuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKFwiOmVuYWJsZWRcIikubGVuZ3RoICE9PSAyICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCI6ZW5hYmxlZFwiLCBcIjpkaXNhYmxlZFwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOS0xMStcblx0XHRcdC8vIElFJ3MgOmRpc2FibGVkIHNlbGVjdG9yIGRvZXMgbm90IHBpY2sgdXAgdGhlIGNoaWxkcmVuIG9mIGRpc2FibGVkIGZpZWxkc2V0c1xuXHRcdFx0ZG9jRWxlbS5hcHBlbmRDaGlsZCggZWwgKS5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCI6ZGlzYWJsZWRcIikubGVuZ3RoICE9PSAyICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCI6ZW5hYmxlZFwiLCBcIjpkaXNhYmxlZFwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE9wZXJhIDEwLTExIGRvZXMgbm90IHRocm93IG9uIHBvc3QtY29tbWEgaW52YWxpZCBwc2V1ZG9zXG5cdFx0XHRlbC5xdWVyeVNlbGVjdG9yQWxsKFwiKiw6eFwiKTtcblx0XHRcdHJidWdneVFTQS5wdXNoKFwiLC4qOlwiKTtcblx0XHR9KTtcblx0fVxuXG5cdGlmICggKHN1cHBvcnQubWF0Y2hlc1NlbGVjdG9yID0gcm5hdGl2ZS50ZXN0KCAobWF0Y2hlcyA9IGRvY0VsZW0ubWF0Y2hlcyB8fFxuXHRcdGRvY0VsZW0ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm9NYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2NFbGVtLm1zTWF0Y2hlc1NlbGVjdG9yKSApKSApIHtcblxuXHRcdGFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdFx0XHQvLyBDaGVjayB0byBzZWUgaWYgaXQncyBwb3NzaWJsZSB0byBkbyBtYXRjaGVzU2VsZWN0b3Jcblx0XHRcdC8vIG9uIGEgZGlzY29ubmVjdGVkIG5vZGUgKElFIDkpXG5cdFx0XHRzdXBwb3J0LmRpc2Nvbm5lY3RlZE1hdGNoID0gbWF0Y2hlcy5jYWxsKCBlbCwgXCIqXCIgKTtcblxuXHRcdFx0Ly8gVGhpcyBzaG91bGQgZmFpbCB3aXRoIGFuIGV4Y2VwdGlvblxuXHRcdFx0Ly8gR2Vja28gZG9lcyBub3QgZXJyb3IsIHJldHVybnMgZmFsc2UgaW5zdGVhZFxuXHRcdFx0bWF0Y2hlcy5jYWxsKCBlbCwgXCJbcyE9JyddOnhcIiApO1xuXHRcdFx0cmJ1Z2d5TWF0Y2hlcy5wdXNoKCBcIiE9XCIsIHBzZXVkb3MgKTtcblx0XHR9KTtcblx0fVxuXG5cdHJidWdneVFTQSA9IHJidWdneVFTQS5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5UVNBLmpvaW4oXCJ8XCIpICk7XG5cdHJidWdneU1hdGNoZXMgPSByYnVnZ3lNYXRjaGVzLmxlbmd0aCAmJiBuZXcgUmVnRXhwKCByYnVnZ3lNYXRjaGVzLmpvaW4oXCJ8XCIpICk7XG5cblx0LyogQ29udGFpbnNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXHRoYXNDb21wYXJlID0gcm5hdGl2ZS50ZXN0KCBkb2NFbGVtLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICk7XG5cblx0Ly8gRWxlbWVudCBjb250YWlucyBhbm90aGVyXG5cdC8vIFB1cnBvc2VmdWxseSBzZWxmLWV4Y2x1c2l2ZVxuXHQvLyBBcyBpbiwgYW4gZWxlbWVudCBkb2VzIG5vdCBjb250YWluIGl0c2VsZlxuXHRjb250YWlucyA9IGhhc0NvbXBhcmUgfHwgcm5hdGl2ZS50ZXN0KCBkb2NFbGVtLmNvbnRhaW5zICkgP1xuXHRcdGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdFx0dmFyIGFkb3duID0gYS5ub2RlVHlwZSA9PT0gOSA/IGEuZG9jdW1lbnRFbGVtZW50IDogYSxcblx0XHRcdFx0YnVwID0gYiAmJiBiLnBhcmVudE5vZGU7XG5cdFx0XHRyZXR1cm4gYSA9PT0gYnVwIHx8ICEhKCBidXAgJiYgYnVwLm5vZGVUeXBlID09PSAxICYmIChcblx0XHRcdFx0YWRvd24uY29udGFpbnMgP1xuXHRcdFx0XHRcdGFkb3duLmNvbnRhaW5zKCBidXAgKSA6XG5cdFx0XHRcdFx0YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAmJiBhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBidXAgKSAmIDE2XG5cdFx0XHQpKTtcblx0XHR9IDpcblx0XHRmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdGlmICggYiApIHtcblx0XHRcdFx0d2hpbGUgKCAoYiA9IGIucGFyZW50Tm9kZSkgKSB7XG5cdFx0XHRcdFx0aWYgKCBiID09PSBhICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHQvKiBTb3J0aW5nXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBEb2N1bWVudCBvcmRlciBzb3J0aW5nXG5cdHNvcnRPcmRlciA9IGhhc0NvbXBhcmUgP1xuXHRmdW5jdGlvbiggYSwgYiApIHtcblxuXHRcdC8vIEZsYWcgZm9yIGR1cGxpY2F0ZSByZW1vdmFsXG5cdFx0aWYgKCBhID09PSBiICkge1xuXHRcdFx0aGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdC8vIFNvcnQgb24gbWV0aG9kIGV4aXN0ZW5jZSBpZiBvbmx5IG9uZSBpbnB1dCBoYXMgY29tcGFyZURvY3VtZW50UG9zaXRpb25cblx0XHR2YXIgY29tcGFyZSA9ICFhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIC0gIWIuY29tcGFyZURvY3VtZW50UG9zaXRpb247XG5cdFx0aWYgKCBjb21wYXJlICkge1xuXHRcdFx0cmV0dXJuIGNvbXBhcmU7XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsY3VsYXRlIHBvc2l0aW9uIGlmIGJvdGggaW5wdXRzIGJlbG9uZyB0byB0aGUgc2FtZSBkb2N1bWVudFxuXHRcdGNvbXBhcmUgPSAoIGEub3duZXJEb2N1bWVudCB8fCBhICkgPT09ICggYi5vd25lckRvY3VtZW50IHx8IGIgKSA/XG5cdFx0XHRhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBiICkgOlxuXG5cdFx0XHQvLyBPdGhlcndpc2Ugd2Uga25vdyB0aGV5IGFyZSBkaXNjb25uZWN0ZWRcblx0XHRcdDE7XG5cblx0XHQvLyBEaXNjb25uZWN0ZWQgbm9kZXNcblx0XHRpZiAoIGNvbXBhcmUgJiAxIHx8XG5cdFx0XHQoIXN1cHBvcnQuc29ydERldGFjaGVkICYmIGIuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGEgKSA9PT0gY29tcGFyZSkgKSB7XG5cblx0XHRcdC8vIENob29zZSB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIHJlbGF0ZWQgdG8gb3VyIHByZWZlcnJlZCBkb2N1bWVudFxuXHRcdFx0aWYgKCBhID09PSBkb2N1bWVudCB8fCBhLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGEpICkge1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGIgPT09IGRvY3VtZW50IHx8IGIub3duZXJEb2N1bWVudCA9PT0gcHJlZmVycmVkRG9jICYmIGNvbnRhaW5zKHByZWZlcnJlZERvYywgYikgKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYWludGFpbiBvcmlnaW5hbCBvcmRlclxuXHRcdFx0cmV0dXJuIHNvcnRJbnB1dCA/XG5cdFx0XHRcdCggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcblx0XHRcdFx0MDtcblx0XHR9XG5cblx0XHRyZXR1cm4gY29tcGFyZSAmIDQgPyAtMSA6IDE7XG5cdH0gOlxuXHRmdW5jdGlvbiggYSwgYiApIHtcblx0XHQvLyBFeGl0IGVhcmx5IGlmIHRoZSBub2RlcyBhcmUgaWRlbnRpY2FsXG5cdFx0aWYgKCBhID09PSBiICkge1xuXHRcdFx0aGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdHZhciBjdXIsXG5cdFx0XHRpID0gMCxcblx0XHRcdGF1cCA9IGEucGFyZW50Tm9kZSxcblx0XHRcdGJ1cCA9IGIucGFyZW50Tm9kZSxcblx0XHRcdGFwID0gWyBhIF0sXG5cdFx0XHRicCA9IFsgYiBdO1xuXG5cdFx0Ly8gUGFyZW50bGVzcyBub2RlcyBhcmUgZWl0aGVyIGRvY3VtZW50cyBvciBkaXNjb25uZWN0ZWRcblx0XHRpZiAoICFhdXAgfHwgIWJ1cCApIHtcblx0XHRcdHJldHVybiBhID09PSBkb2N1bWVudCA/IC0xIDpcblx0XHRcdFx0YiA9PT0gZG9jdW1lbnQgPyAxIDpcblx0XHRcdFx0YXVwID8gLTEgOlxuXHRcdFx0XHRidXAgPyAxIDpcblx0XHRcdFx0c29ydElucHV0ID9cblx0XHRcdFx0KCBpbmRleE9mKCBzb3J0SW5wdXQsIGEgKSAtIGluZGV4T2YoIHNvcnRJbnB1dCwgYiApICkgOlxuXHRcdFx0XHQwO1xuXG5cdFx0Ly8gSWYgdGhlIG5vZGVzIGFyZSBzaWJsaW5ncywgd2UgY2FuIGRvIGEgcXVpY2sgY2hlY2tcblx0XHR9IGVsc2UgaWYgKCBhdXAgPT09IGJ1cCApIHtcblx0XHRcdHJldHVybiBzaWJsaW5nQ2hlY2soIGEsIGIgKTtcblx0XHR9XG5cblx0XHQvLyBPdGhlcndpc2Ugd2UgbmVlZCBmdWxsIGxpc3RzIG9mIHRoZWlyIGFuY2VzdG9ycyBmb3IgY29tcGFyaXNvblxuXHRcdGN1ciA9IGE7XG5cdFx0d2hpbGUgKCAoY3VyID0gY3VyLnBhcmVudE5vZGUpICkge1xuXHRcdFx0YXAudW5zaGlmdCggY3VyICk7XG5cdFx0fVxuXHRcdGN1ciA9IGI7XG5cdFx0d2hpbGUgKCAoY3VyID0gY3VyLnBhcmVudE5vZGUpICkge1xuXHRcdFx0YnAudW5zaGlmdCggY3VyICk7XG5cdFx0fVxuXG5cdFx0Ly8gV2FsayBkb3duIHRoZSB0cmVlIGxvb2tpbmcgZm9yIGEgZGlzY3JlcGFuY3lcblx0XHR3aGlsZSAoIGFwW2ldID09PSBicFtpXSApIHtcblx0XHRcdGkrKztcblx0XHR9XG5cblx0XHRyZXR1cm4gaSA/XG5cdFx0XHQvLyBEbyBhIHNpYmxpbmcgY2hlY2sgaWYgdGhlIG5vZGVzIGhhdmUgYSBjb21tb24gYW5jZXN0b3Jcblx0XHRcdHNpYmxpbmdDaGVjayggYXBbaV0sIGJwW2ldICkgOlxuXG5cdFx0XHQvLyBPdGhlcndpc2Ugbm9kZXMgaW4gb3VyIGRvY3VtZW50IHNvcnQgZmlyc3Rcblx0XHRcdGFwW2ldID09PSBwcmVmZXJyZWREb2MgPyAtMSA6XG5cdFx0XHRicFtpXSA9PT0gcHJlZmVycmVkRG9jID8gMSA6XG5cdFx0XHQwO1xuXHR9O1xuXG5cdHJldHVybiBkb2N1bWVudDtcbn07XG5cblNpenpsZS5tYXRjaGVzID0gZnVuY3Rpb24oIGV4cHIsIGVsZW1lbnRzICkge1xuXHRyZXR1cm4gU2l6emxlKCBleHByLCBudWxsLCBudWxsLCBlbGVtZW50cyApO1xufTtcblxuU2l6emxlLm1hdGNoZXNTZWxlY3RvciA9IGZ1bmN0aW9uKCBlbGVtLCBleHByICkge1xuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0aWYgKCAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtICkgIT09IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBlbGVtICk7XG5cdH1cblxuXHQvLyBNYWtlIHN1cmUgdGhhdCBhdHRyaWJ1dGUgc2VsZWN0b3JzIGFyZSBxdW90ZWRcblx0ZXhwciA9IGV4cHIucmVwbGFjZSggcmF0dHJpYnV0ZVF1b3RlcywgXCI9JyQxJ11cIiApO1xuXG5cdGlmICggc3VwcG9ydC5tYXRjaGVzU2VsZWN0b3IgJiYgZG9jdW1lbnRJc0hUTUwgJiZcblx0XHQhY29tcGlsZXJDYWNoZVsgZXhwciArIFwiIFwiIF0gJiZcblx0XHQoICFyYnVnZ3lNYXRjaGVzIHx8ICFyYnVnZ3lNYXRjaGVzLnRlc3QoIGV4cHIgKSApICYmXG5cdFx0KCAhcmJ1Z2d5UVNBICAgICB8fCAhcmJ1Z2d5UVNBLnRlc3QoIGV4cHIgKSApICkge1xuXG5cdFx0dHJ5IHtcblx0XHRcdHZhciByZXQgPSBtYXRjaGVzLmNhbGwoIGVsZW0sIGV4cHIgKTtcblxuXHRcdFx0Ly8gSUUgOSdzIG1hdGNoZXNTZWxlY3RvciByZXR1cm5zIGZhbHNlIG9uIGRpc2Nvbm5lY3RlZCBub2Rlc1xuXHRcdFx0aWYgKCByZXQgfHwgc3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCB8fFxuXHRcdFx0XHRcdC8vIEFzIHdlbGwsIGRpc2Nvbm5lY3RlZCBub2RlcyBhcmUgc2FpZCB0byBiZSBpbiBhIGRvY3VtZW50XG5cdFx0XHRcdFx0Ly8gZnJhZ21lbnQgaW4gSUUgOVxuXHRcdFx0XHRcdGVsZW0uZG9jdW1lbnQgJiYgZWxlbS5kb2N1bWVudC5ub2RlVHlwZSAhPT0gMTEgKSB7XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge31cblx0fVxuXG5cdHJldHVybiBTaXp6bGUoIGV4cHIsIGRvY3VtZW50LCBudWxsLCBbIGVsZW0gXSApLmxlbmd0aCA+IDA7XG59O1xuXG5TaXp6bGUuY29udGFpbnMgPSBmdW5jdGlvbiggY29udGV4dCwgZWxlbSApIHtcblx0Ly8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG5cdGlmICggKCBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCApICE9PSBkb2N1bWVudCApIHtcblx0XHRzZXREb2N1bWVudCggY29udGV4dCApO1xuXHR9XG5cdHJldHVybiBjb250YWlucyggY29udGV4dCwgZWxlbSApO1xufTtcblxuU2l6emxlLmF0dHIgPSBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0Ly8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG5cdGlmICggKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApICE9PSBkb2N1bWVudCApIHtcblx0XHRzZXREb2N1bWVudCggZWxlbSApO1xuXHR9XG5cblx0dmFyIGZuID0gRXhwci5hdHRySGFuZGxlWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSxcblx0XHQvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IE9iamVjdC5wcm90b3R5cGUgcHJvcGVydGllcyAoalF1ZXJ5ICMxMzgwNylcblx0XHR2YWwgPSBmbiAmJiBoYXNPd24uY2FsbCggRXhwci5hdHRySGFuZGxlLCBuYW1lLnRvTG93ZXJDYXNlKCkgKSA/XG5cdFx0XHRmbiggZWxlbSwgbmFtZSwgIWRvY3VtZW50SXNIVE1MICkgOlxuXHRcdFx0dW5kZWZpbmVkO1xuXG5cdHJldHVybiB2YWwgIT09IHVuZGVmaW5lZCA/XG5cdFx0dmFsIDpcblx0XHRzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWRvY3VtZW50SXNIVE1MID9cblx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICkgOlxuXHRcdFx0KHZhbCA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZShuYW1lKSkgJiYgdmFsLnNwZWNpZmllZCA/XG5cdFx0XHRcdHZhbC52YWx1ZSA6XG5cdFx0XHRcdG51bGw7XG59O1xuXG5TaXp6bGUuZXNjYXBlID0gZnVuY3Rpb24oIHNlbCApIHtcblx0cmV0dXJuIChzZWwgKyBcIlwiKS5yZXBsYWNlKCByY3NzZXNjYXBlLCBmY3NzZXNjYXBlICk7XG59O1xuXG5TaXp6bGUuZXJyb3IgPSBmdW5jdGlvbiggbXNnICkge1xuXHR0aHJvdyBuZXcgRXJyb3IoIFwiU3ludGF4IGVycm9yLCB1bnJlY29nbml6ZWQgZXhwcmVzc2lvbjogXCIgKyBtc2cgKTtcbn07XG5cbi8qKlxuICogRG9jdW1lbnQgc29ydGluZyBhbmQgcmVtb3ZpbmcgZHVwbGljYXRlc1xuICogQHBhcmFtIHtBcnJheUxpa2V9IHJlc3VsdHNcbiAqL1xuU2l6emxlLnVuaXF1ZVNvcnQgPSBmdW5jdGlvbiggcmVzdWx0cyApIHtcblx0dmFyIGVsZW0sXG5cdFx0ZHVwbGljYXRlcyA9IFtdLFxuXHRcdGogPSAwLFxuXHRcdGkgPSAwO1xuXG5cdC8vIFVubGVzcyB3ZSAqa25vdyogd2UgY2FuIGRldGVjdCBkdXBsaWNhdGVzLCBhc3N1bWUgdGhlaXIgcHJlc2VuY2Vcblx0aGFzRHVwbGljYXRlID0gIXN1cHBvcnQuZGV0ZWN0RHVwbGljYXRlcztcblx0c29ydElucHV0ID0gIXN1cHBvcnQuc29ydFN0YWJsZSAmJiByZXN1bHRzLnNsaWNlKCAwICk7XG5cdHJlc3VsdHMuc29ydCggc29ydE9yZGVyICk7XG5cblx0aWYgKCBoYXNEdXBsaWNhdGUgKSB7XG5cdFx0d2hpbGUgKCAoZWxlbSA9IHJlc3VsdHNbaSsrXSkgKSB7XG5cdFx0XHRpZiAoIGVsZW0gPT09IHJlc3VsdHNbIGkgXSApIHtcblx0XHRcdFx0aiA9IGR1cGxpY2F0ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdHJlc3VsdHMuc3BsaWNlKCBkdXBsaWNhdGVzWyBqIF0sIDEgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBDbGVhciBpbnB1dCBhZnRlciBzb3J0aW5nIHRvIHJlbGVhc2Ugb2JqZWN0c1xuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9zaXp6bGUvcHVsbC8yMjVcblx0c29ydElucHV0ID0gbnVsbDtcblxuXHRyZXR1cm4gcmVzdWx0cztcbn07XG5cbi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiBmb3IgcmV0cmlldmluZyB0aGUgdGV4dCB2YWx1ZSBvZiBhbiBhcnJheSBvZiBET00gbm9kZXNcbiAqIEBwYXJhbSB7QXJyYXl8RWxlbWVudH0gZWxlbVxuICovXG5nZXRUZXh0ID0gU2l6emxlLmdldFRleHQgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0dmFyIG5vZGUsXG5cdFx0cmV0ID0gXCJcIixcblx0XHRpID0gMCxcblx0XHRub2RlVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0aWYgKCAhbm9kZVR5cGUgKSB7XG5cdFx0Ly8gSWYgbm8gbm9kZVR5cGUsIHRoaXMgaXMgZXhwZWN0ZWQgdG8gYmUgYW4gYXJyYXlcblx0XHR3aGlsZSAoIChub2RlID0gZWxlbVtpKytdKSApIHtcblx0XHRcdC8vIERvIG5vdCB0cmF2ZXJzZSBjb21tZW50IG5vZGVzXG5cdFx0XHRyZXQgKz0gZ2V0VGV4dCggbm9kZSApO1xuXHRcdH1cblx0fSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDEgfHwgbm9kZVR5cGUgPT09IDkgfHwgbm9kZVR5cGUgPT09IDExICkge1xuXHRcdC8vIFVzZSB0ZXh0Q29udGVudCBmb3IgZWxlbWVudHNcblx0XHQvLyBpbm5lclRleHQgdXNhZ2UgcmVtb3ZlZCBmb3IgY29uc2lzdGVuY3kgb2YgbmV3IGxpbmVzIChqUXVlcnkgIzExMTUzKVxuXHRcdGlmICggdHlwZW9mIGVsZW0udGV4dENvbnRlbnQgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS50ZXh0Q29udGVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gVHJhdmVyc2UgaXRzIGNoaWxkcmVuXG5cdFx0XHRmb3IgKCBlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZyApIHtcblx0XHRcdFx0cmV0ICs9IGdldFRleHQoIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAzIHx8IG5vZGVUeXBlID09PSA0ICkge1xuXHRcdHJldHVybiBlbGVtLm5vZGVWYWx1ZTtcblx0fVxuXHQvLyBEbyBub3QgaW5jbHVkZSBjb21tZW50IG9yIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gbm9kZXNcblxuXHRyZXR1cm4gcmV0O1xufTtcblxuRXhwciA9IFNpenpsZS5zZWxlY3RvcnMgPSB7XG5cblx0Ly8gQ2FuIGJlIGFkanVzdGVkIGJ5IHRoZSB1c2VyXG5cdGNhY2hlTGVuZ3RoOiA1MCxcblxuXHRjcmVhdGVQc2V1ZG86IG1hcmtGdW5jdGlvbixcblxuXHRtYXRjaDogbWF0Y2hFeHByLFxuXG5cdGF0dHJIYW5kbGU6IHt9LFxuXG5cdGZpbmQ6IHt9LFxuXG5cdHJlbGF0aXZlOiB7XG5cdFx0XCI+XCI6IHsgZGlyOiBcInBhcmVudE5vZGVcIiwgZmlyc3Q6IHRydWUgfSxcblx0XHRcIiBcIjogeyBkaXI6IFwicGFyZW50Tm9kZVwiIH0sXG5cdFx0XCIrXCI6IHsgZGlyOiBcInByZXZpb3VzU2libGluZ1wiLCBmaXJzdDogdHJ1ZSB9LFxuXHRcdFwiflwiOiB7IGRpcjogXCJwcmV2aW91c1NpYmxpbmdcIiB9XG5cdH0sXG5cblx0cHJlRmlsdGVyOiB7XG5cdFx0XCJBVFRSXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblx0XHRcdG1hdGNoWzFdID0gbWF0Y2hbMV0ucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblxuXHRcdFx0Ly8gTW92ZSB0aGUgZ2l2ZW4gdmFsdWUgdG8gbWF0Y2hbM10gd2hldGhlciBxdW90ZWQgb3IgdW5xdW90ZWRcblx0XHRcdG1hdGNoWzNdID0gKCBtYXRjaFszXSB8fCBtYXRjaFs0XSB8fCBtYXRjaFs1XSB8fCBcIlwiICkucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblxuXHRcdFx0aWYgKCBtYXRjaFsyXSA9PT0gXCJ+PVwiICkge1xuXHRcdFx0XHRtYXRjaFszXSA9IFwiIFwiICsgbWF0Y2hbM10gKyBcIiBcIjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG1hdGNoLnNsaWNlKCAwLCA0ICk7XG5cdFx0fSxcblxuXHRcdFwiQ0hJTERcIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0LyogbWF0Y2hlcyBmcm9tIG1hdGNoRXhwcltcIkNISUxEXCJdXG5cdFx0XHRcdDEgdHlwZSAob25seXxudGh8Li4uKVxuXHRcdFx0XHQyIHdoYXQgKGNoaWxkfG9mLXR5cGUpXG5cdFx0XHRcdDMgYXJndW1lbnQgKGV2ZW58b2RkfFxcZCp8XFxkKm4oWystXVxcZCspP3wuLi4pXG5cdFx0XHRcdDQgeG4tY29tcG9uZW50IG9mIHhuK3kgYXJndW1lbnQgKFsrLV0/XFxkKm58KVxuXHRcdFx0XHQ1IHNpZ24gb2YgeG4tY29tcG9uZW50XG5cdFx0XHRcdDYgeCBvZiB4bi1jb21wb25lbnRcblx0XHRcdFx0NyBzaWduIG9mIHktY29tcG9uZW50XG5cdFx0XHRcdDggeSBvZiB5LWNvbXBvbmVudFxuXHRcdFx0Ki9cblx0XHRcdG1hdGNoWzFdID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0aWYgKCBtYXRjaFsxXS5zbGljZSggMCwgMyApID09PSBcIm50aFwiICkge1xuXHRcdFx0XHQvLyBudGgtKiByZXF1aXJlcyBhcmd1bWVudFxuXHRcdFx0XHRpZiAoICFtYXRjaFszXSApIHtcblx0XHRcdFx0XHRTaXp6bGUuZXJyb3IoIG1hdGNoWzBdICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBudW1lcmljIHggYW5kIHkgcGFyYW1ldGVycyBmb3IgRXhwci5maWx0ZXIuQ0hJTERcblx0XHRcdFx0Ly8gcmVtZW1iZXIgdGhhdCBmYWxzZS90cnVlIGNhc3QgcmVzcGVjdGl2ZWx5IHRvIDAvMVxuXHRcdFx0XHRtYXRjaFs0XSA9ICsoIG1hdGNoWzRdID8gbWF0Y2hbNV0gKyAobWF0Y2hbNl0gfHwgMSkgOiAyICogKCBtYXRjaFszXSA9PT0gXCJldmVuXCIgfHwgbWF0Y2hbM10gPT09IFwib2RkXCIgKSApO1xuXHRcdFx0XHRtYXRjaFs1XSA9ICsoICggbWF0Y2hbN10gKyBtYXRjaFs4XSApIHx8IG1hdGNoWzNdID09PSBcIm9kZFwiICk7XG5cblx0XHRcdC8vIG90aGVyIHR5cGVzIHByb2hpYml0IGFyZ3VtZW50c1xuXHRcdFx0fSBlbHNlIGlmICggbWF0Y2hbM10gKSB7XG5cdFx0XHRcdFNpenpsZS5lcnJvciggbWF0Y2hbMF0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG1hdGNoO1xuXHRcdH0sXG5cblx0XHRcIlBTRVVET1wiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cdFx0XHR2YXIgZXhjZXNzLFxuXHRcdFx0XHR1bnF1b3RlZCA9ICFtYXRjaFs2XSAmJiBtYXRjaFsyXTtcblxuXHRcdFx0aWYgKCBtYXRjaEV4cHJbXCJDSElMRFwiXS50ZXN0KCBtYXRjaFswXSApICkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWNjZXB0IHF1b3RlZCBhcmd1bWVudHMgYXMtaXNcblx0XHRcdGlmICggbWF0Y2hbM10gKSB7XG5cdFx0XHRcdG1hdGNoWzJdID0gbWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIjtcblxuXHRcdFx0Ly8gU3RyaXAgZXhjZXNzIGNoYXJhY3RlcnMgZnJvbSB1bnF1b3RlZCBhcmd1bWVudHNcblx0XHRcdH0gZWxzZSBpZiAoIHVucXVvdGVkICYmIHJwc2V1ZG8udGVzdCggdW5xdW90ZWQgKSAmJlxuXHRcdFx0XHQvLyBHZXQgZXhjZXNzIGZyb20gdG9rZW5pemUgKHJlY3Vyc2l2ZWx5KVxuXHRcdFx0XHQoZXhjZXNzID0gdG9rZW5pemUoIHVucXVvdGVkLCB0cnVlICkpICYmXG5cdFx0XHRcdC8vIGFkdmFuY2UgdG8gdGhlIG5leHQgY2xvc2luZyBwYXJlbnRoZXNpc1xuXHRcdFx0XHQoZXhjZXNzID0gdW5xdW90ZWQuaW5kZXhPZiggXCIpXCIsIHVucXVvdGVkLmxlbmd0aCAtIGV4Y2VzcyApIC0gdW5xdW90ZWQubGVuZ3RoKSApIHtcblxuXHRcdFx0XHQvLyBleGNlc3MgaXMgYSBuZWdhdGl2ZSBpbmRleFxuXHRcdFx0XHRtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKCAwLCBleGNlc3MgKTtcblx0XHRcdFx0bWF0Y2hbMl0gPSB1bnF1b3RlZC5zbGljZSggMCwgZXhjZXNzICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldHVybiBvbmx5IGNhcHR1cmVzIG5lZWRlZCBieSB0aGUgcHNldWRvIGZpbHRlciBtZXRob2QgKHR5cGUgYW5kIGFyZ3VtZW50KVxuXHRcdFx0cmV0dXJuIG1hdGNoLnNsaWNlKCAwLCAzICk7XG5cdFx0fVxuXHR9LFxuXG5cdGZpbHRlcjoge1xuXG5cdFx0XCJUQUdcIjogZnVuY3Rpb24oIG5vZGVOYW1lU2VsZWN0b3IgKSB7XG5cdFx0XHR2YXIgbm9kZU5hbWUgPSBub2RlTmFtZVNlbGVjdG9yLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICkudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBub2RlTmFtZVNlbGVjdG9yID09PSBcIipcIiA/XG5cdFx0XHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbm9kZU5hbWU7XG5cdFx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiQ0xBU1NcIjogZnVuY3Rpb24oIGNsYXNzTmFtZSApIHtcblx0XHRcdHZhciBwYXR0ZXJuID0gY2xhc3NDYWNoZVsgY2xhc3NOYW1lICsgXCIgXCIgXTtcblxuXHRcdFx0cmV0dXJuIHBhdHRlcm4gfHxcblx0XHRcdFx0KHBhdHRlcm4gPSBuZXcgUmVnRXhwKCBcIihefFwiICsgd2hpdGVzcGFjZSArIFwiKVwiICsgY2xhc3NOYW1lICsgXCIoXCIgKyB3aGl0ZXNwYWNlICsgXCJ8JClcIiApKSAmJlxuXHRcdFx0XHRjbGFzc0NhY2hlKCBjbGFzc05hbWUsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRcdHJldHVybiBwYXR0ZXJuLnRlc3QoIHR5cGVvZiBlbGVtLmNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBlbGVtLmNsYXNzTmFtZSB8fCB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgIT09IFwidW5kZWZpbmVkXCIgJiYgZWxlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiICk7XG5cdFx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRcIkFUVFJcIjogZnVuY3Rpb24oIG5hbWUsIG9wZXJhdG9yLCBjaGVjayApIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IFNpenpsZS5hdHRyKCBlbGVtLCBuYW1lICk7XG5cblx0XHRcdFx0aWYgKCByZXN1bHQgPT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgPT09IFwiIT1cIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoICFvcGVyYXRvciApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdCArPSBcIlwiO1xuXG5cdFx0XHRcdHJldHVybiBvcGVyYXRvciA9PT0gXCI9XCIgPyByZXN1bHQgPT09IGNoZWNrIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCIhPVwiID8gcmVzdWx0ICE9PSBjaGVjayA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiXj1cIiA/IGNoZWNrICYmIHJlc3VsdC5pbmRleE9mKCBjaGVjayApID09PSAwIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCIqPVwiID8gY2hlY2sgJiYgcmVzdWx0LmluZGV4T2YoIGNoZWNrICkgPiAtMSA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwiJD1cIiA/IGNoZWNrICYmIHJlc3VsdC5zbGljZSggLWNoZWNrLmxlbmd0aCApID09PSBjaGVjayA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwifj1cIiA/ICggXCIgXCIgKyByZXN1bHQucmVwbGFjZSggcndoaXRlc3BhY2UsIFwiIFwiICkgKyBcIiBcIiApLmluZGV4T2YoIGNoZWNrICkgPiAtMSA6XG5cdFx0XHRcdFx0b3BlcmF0b3IgPT09IFwifD1cIiA/IHJlc3VsdCA9PT0gY2hlY2sgfHwgcmVzdWx0LnNsaWNlKCAwLCBjaGVjay5sZW5ndGggKyAxICkgPT09IGNoZWNrICsgXCItXCIgOlxuXHRcdFx0XHRcdGZhbHNlO1xuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJDSElMRFwiOiBmdW5jdGlvbiggdHlwZSwgd2hhdCwgYXJndW1lbnQsIGZpcnN0LCBsYXN0ICkge1xuXHRcdFx0dmFyIHNpbXBsZSA9IHR5cGUuc2xpY2UoIDAsIDMgKSAhPT0gXCJudGhcIixcblx0XHRcdFx0Zm9yd2FyZCA9IHR5cGUuc2xpY2UoIC00ICkgIT09IFwibGFzdFwiLFxuXHRcdFx0XHRvZlR5cGUgPSB3aGF0ID09PSBcIm9mLXR5cGVcIjtcblxuXHRcdFx0cmV0dXJuIGZpcnN0ID09PSAxICYmIGxhc3QgPT09IDAgP1xuXG5cdFx0XHRcdC8vIFNob3J0Y3V0IGZvciA6bnRoLSoobilcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuICEhZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0XHR9IDpcblxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0XHRcdHZhciBjYWNoZSwgdW5pcXVlQ2FjaGUsIG91dGVyQ2FjaGUsIG5vZGUsIG5vZGVJbmRleCwgc3RhcnQsXG5cdFx0XHRcdFx0XHRkaXIgPSBzaW1wbGUgIT09IGZvcndhcmQgPyBcIm5leHRTaWJsaW5nXCIgOiBcInByZXZpb3VzU2libGluZ1wiLFxuXHRcdFx0XHRcdFx0cGFyZW50ID0gZWxlbS5wYXJlbnROb2RlLFxuXHRcdFx0XHRcdFx0bmFtZSA9IG9mVHlwZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHR1c2VDYWNoZSA9ICF4bWwgJiYgIW9mVHlwZSxcblx0XHRcdFx0XHRcdGRpZmYgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICggcGFyZW50ICkge1xuXG5cdFx0XHRcdFx0XHQvLyA6KGZpcnN0fGxhc3R8b25seSktKGNoaWxkfG9mLXR5cGUpXG5cdFx0XHRcdFx0XHRpZiAoIHNpbXBsZSApIHtcblx0XHRcdFx0XHRcdFx0d2hpbGUgKCBkaXIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0bm9kZSA9IGVsZW07XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9IG5vZGVbIGRpciBdKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggb2ZUeXBlID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdC8vIFJldmVyc2UgZGlyZWN0aW9uIGZvciA6b25seS0qIChpZiB3ZSBoYXZlbid0IHlldCBkb25lIHNvKVxuXHRcdFx0XHRcdFx0XHRcdHN0YXJ0ID0gZGlyID0gdHlwZSA9PT0gXCJvbmx5XCIgJiYgIXN0YXJ0ICYmIFwibmV4dFNpYmxpbmdcIjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0c3RhcnQgPSBbIGZvcndhcmQgPyBwYXJlbnQuZmlyc3RDaGlsZCA6IHBhcmVudC5sYXN0Q2hpbGQgXTtcblxuXHRcdFx0XHRcdFx0Ly8gbm9uLXhtbCA6bnRoLWNoaWxkKC4uLikgc3RvcmVzIGNhY2hlIGRhdGEgb24gYHBhcmVudGBcblx0XHRcdFx0XHRcdGlmICggZm9yd2FyZCAmJiB1c2VDYWNoZSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBTZWVrIGBlbGVtYCBmcm9tIGEgcHJldmlvdXNseS1jYWNoZWQgaW5kZXhcblxuXHRcdFx0XHRcdFx0XHQvLyAuLi5pbiBhIGd6aXAtZnJpZW5kbHkgd2F5XG5cdFx0XHRcdFx0XHRcdG5vZGUgPSBwYXJlbnQ7XG5cdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBub2RlWyBleHBhbmRvIF0gfHwgKG5vZGVbIGV4cGFuZG8gXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdChvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0Y2FjaGUgPSB1bmlxdWVDYWNoZVsgdHlwZSBdIHx8IFtdO1xuXHRcdFx0XHRcdFx0XHRub2RlSW5kZXggPSBjYWNoZVsgMCBdID09PSBkaXJydW5zICYmIGNhY2hlWyAxIF07XG5cdFx0XHRcdFx0XHRcdGRpZmYgPSBub2RlSW5kZXggJiYgY2FjaGVbIDIgXTtcblx0XHRcdFx0XHRcdFx0bm9kZSA9IG5vZGVJbmRleCAmJiBwYXJlbnQuY2hpbGROb2Rlc1sgbm9kZUluZGV4IF07XG5cblx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblxuXHRcdFx0XHRcdFx0XHRcdC8vIEZhbGxiYWNrIHRvIHNlZWtpbmcgYGVsZW1gIGZyb20gdGhlIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdFx0KGRpZmYgPSBub2RlSW5kZXggPSAwKSB8fCBzdGFydC5wb3AoKSkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBXaGVuIGZvdW5kLCBjYWNoZSBpbmRleGVzIG9uIGBwYXJlbnRgIGFuZCBicmVha1xuXHRcdFx0XHRcdFx0XHRcdGlmICggbm9kZS5ub2RlVHlwZSA9PT0gMSAmJiArK2RpZmYgJiYgbm9kZSA9PT0gZWxlbSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlWyB0eXBlIF0gPSBbIGRpcnJ1bnMsIG5vZGVJbmRleCwgZGlmZiBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIFVzZSBwcmV2aW91c2x5LWNhY2hlZCBlbGVtZW50IGluZGV4IGlmIGF2YWlsYWJsZVxuXHRcdFx0XHRcdFx0XHRpZiAoIHVzZUNhY2hlICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIC4uLmluIGEgZ3ppcC1mcmllbmRseSB3YXlcblx0XHRcdFx0XHRcdFx0XHRub2RlID0gZWxlbTtcblx0XHRcdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gbm9kZVsgZXhwYW5kbyBdIHx8IChub2RlWyBleHBhbmRvIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8OSBvbmx5XG5cdFx0XHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdChvdXRlckNhY2hlWyBub2RlLnVuaXF1ZUlEIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdFx0XHRjYWNoZSA9IHVuaXF1ZUNhY2hlWyB0eXBlIF0gfHwgW107XG5cdFx0XHRcdFx0XHRcdFx0bm9kZUluZGV4ID0gY2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBjYWNoZVsgMSBdO1xuXHRcdFx0XHRcdFx0XHRcdGRpZmYgPSBub2RlSW5kZXg7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyB4bWwgOm50aC1jaGlsZCguLi4pXG5cdFx0XHRcdFx0XHRcdC8vIG9yIDpudGgtbGFzdC1jaGlsZCguLi4pIG9yIDpudGgoLWxhc3QpPy1vZi10eXBlKC4uLilcblx0XHRcdFx0XHRcdFx0aWYgKCBkaWZmID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBVc2UgdGhlIHNhbWUgbG9vcCBhcyBhYm92ZSB0byBzZWVrIGBlbGVtYCBmcm9tIHRoZSBzdGFydFxuXHRcdFx0XHRcdFx0XHRcdHdoaWxlICggKG5vZGUgPSArK25vZGVJbmRleCAmJiBub2RlICYmIG5vZGVbIGRpciBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHQoZGlmZiA9IG5vZGVJbmRleCA9IDApIHx8IHN0YXJ0LnBvcCgpKSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCAoIG9mVHlwZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPT09IDEgKSAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQrK2RpZmYgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gQ2FjaGUgdGhlIGluZGV4IG9mIGVhY2ggZW5jb3VudGVyZWQgZWxlbWVudFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHVzZUNhY2hlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBub2RlWyBleHBhbmRvIF0gfHwgKG5vZGVbIGV4cGFuZG8gXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlWyB0eXBlIF0gPSBbIGRpcnJ1bnMsIGRpZmYgXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggbm9kZSA9PT0gZWxlbSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBJbmNvcnBvcmF0ZSB0aGUgb2Zmc2V0LCB0aGVuIGNoZWNrIGFnYWluc3QgY3ljbGUgc2l6ZVxuXHRcdFx0XHRcdFx0ZGlmZiAtPSBsYXN0O1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRpZmYgPT09IGZpcnN0IHx8ICggZGlmZiAlIGZpcnN0ID09PSAwICYmIGRpZmYgLyBmaXJzdCA+PSAwICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRcIlBTRVVET1wiOiBmdW5jdGlvbiggcHNldWRvLCBhcmd1bWVudCApIHtcblx0XHRcdC8vIHBzZXVkby1jbGFzcyBuYW1lcyBhcmUgY2FzZS1pbnNlbnNpdGl2ZVxuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNwc2V1ZG8tY2xhc3Nlc1xuXHRcdFx0Ly8gUHJpb3JpdGl6ZSBieSBjYXNlIHNlbnNpdGl2aXR5IGluIGNhc2UgY3VzdG9tIHBzZXVkb3MgYXJlIGFkZGVkIHdpdGggdXBwZXJjYXNlIGxldHRlcnNcblx0XHRcdC8vIFJlbWVtYmVyIHRoYXQgc2V0RmlsdGVycyBpbmhlcml0cyBmcm9tIHBzZXVkb3Ncblx0XHRcdHZhciBhcmdzLFxuXHRcdFx0XHRmbiA9IEV4cHIucHNldWRvc1sgcHNldWRvIF0gfHwgRXhwci5zZXRGaWx0ZXJzWyBwc2V1ZG8udG9Mb3dlckNhc2UoKSBdIHx8XG5cdFx0XHRcdFx0U2l6emxlLmVycm9yKCBcInVuc3VwcG9ydGVkIHBzZXVkbzogXCIgKyBwc2V1ZG8gKTtcblxuXHRcdFx0Ly8gVGhlIHVzZXIgbWF5IHVzZSBjcmVhdGVQc2V1ZG8gdG8gaW5kaWNhdGUgdGhhdFxuXHRcdFx0Ly8gYXJndW1lbnRzIGFyZSBuZWVkZWQgdG8gY3JlYXRlIHRoZSBmaWx0ZXIgZnVuY3Rpb25cblx0XHRcdC8vIGp1c3QgYXMgU2l6emxlIGRvZXNcblx0XHRcdGlmICggZm5bIGV4cGFuZG8gXSApIHtcblx0XHRcdFx0cmV0dXJuIGZuKCBhcmd1bWVudCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCdXQgbWFpbnRhaW4gc3VwcG9ydCBmb3Igb2xkIHNpZ25hdHVyZXNcblx0XHRcdGlmICggZm4ubGVuZ3RoID4gMSApIHtcblx0XHRcdFx0YXJncyA9IFsgcHNldWRvLCBwc2V1ZG8sIFwiXCIsIGFyZ3VtZW50IF07XG5cdFx0XHRcdHJldHVybiBFeHByLnNldEZpbHRlcnMuaGFzT3duUHJvcGVydHkoIHBzZXVkby50b0xvd2VyQ2FzZSgpICkgP1xuXHRcdFx0XHRcdG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcyApIHtcblx0XHRcdFx0XHRcdHZhciBpZHgsXG5cdFx0XHRcdFx0XHRcdG1hdGNoZWQgPSBmbiggc2VlZCwgYXJndW1lbnQgKSxcblx0XHRcdFx0XHRcdFx0aSA9IG1hdGNoZWQubGVuZ3RoO1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRcdGlkeCA9IGluZGV4T2YoIHNlZWQsIG1hdGNoZWRbaV0gKTtcblx0XHRcdFx0XHRcdFx0c2VlZFsgaWR4IF0gPSAhKCBtYXRjaGVzWyBpZHggXSA9IG1hdGNoZWRbaV0gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KSA6XG5cdFx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4oIGVsZW0sIDAsIGFyZ3MgKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm47XG5cdFx0fVxuXHR9LFxuXG5cdHBzZXVkb3M6IHtcblx0XHQvLyBQb3RlbnRpYWxseSBjb21wbGV4IHBzZXVkb3Ncblx0XHRcIm5vdFwiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdFx0Ly8gVHJpbSB0aGUgc2VsZWN0b3IgcGFzc2VkIHRvIGNvbXBpbGVcblx0XHRcdC8vIHRvIGF2b2lkIHRyZWF0aW5nIGxlYWRpbmcgYW5kIHRyYWlsaW5nXG5cdFx0XHQvLyBzcGFjZXMgYXMgY29tYmluYXRvcnNcblx0XHRcdHZhciBpbnB1dCA9IFtdLFxuXHRcdFx0XHRyZXN1bHRzID0gW10sXG5cdFx0XHRcdG1hdGNoZXIgPSBjb21waWxlKCBzZWxlY3Rvci5yZXBsYWNlKCBydHJpbSwgXCIkMVwiICkgKTtcblxuXHRcdFx0cmV0dXJuIG1hdGNoZXJbIGV4cGFuZG8gXSA/XG5cdFx0XHRcdG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgbWF0Y2hlcywgY29udGV4dCwgeG1sICkge1xuXHRcdFx0XHRcdHZhciBlbGVtLFxuXHRcdFx0XHRcdFx0dW5tYXRjaGVkID0gbWF0Y2hlciggc2VlZCwgbnVsbCwgeG1sLCBbXSApLFxuXHRcdFx0XHRcdFx0aSA9IHNlZWQubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Ly8gTWF0Y2ggZWxlbWVudHMgdW5tYXRjaGVkIGJ5IGBtYXRjaGVyYFxuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoZWxlbSA9IHVubWF0Y2hlZFtpXSkgKSB7XG5cdFx0XHRcdFx0XHRcdHNlZWRbaV0gPSAhKG1hdGNoZXNbaV0gPSBlbGVtKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pIDpcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdFx0XHRpbnB1dFswXSA9IGVsZW07XG5cdFx0XHRcdFx0bWF0Y2hlciggaW5wdXQsIG51bGwsIHhtbCwgcmVzdWx0cyApO1xuXHRcdFx0XHRcdC8vIERvbid0IGtlZXAgdGhlIGVsZW1lbnQgKGlzc3VlICMyOTkpXG5cdFx0XHRcdFx0aW5wdXRbMF0gPSBudWxsO1xuXHRcdFx0XHRcdHJldHVybiAhcmVzdWx0cy5wb3AoKTtcblx0XHRcdFx0fTtcblx0XHR9KSxcblxuXHRcdFwiaGFzXCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiBTaXp6bGUoIHNlbGVjdG9yLCBlbGVtICkubGVuZ3RoID4gMDtcblx0XHRcdH07XG5cdFx0fSksXG5cblx0XHRcImNvbnRhaW5zXCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiggdGV4dCApIHtcblx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHJldHVybiAoIGVsZW0udGV4dENvbnRlbnQgfHwgZWxlbS5pbm5lclRleHQgfHwgZ2V0VGV4dCggZWxlbSApICkuaW5kZXhPZiggdGV4dCApID4gLTE7XG5cdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0Ly8gXCJXaGV0aGVyIGFuIGVsZW1lbnQgaXMgcmVwcmVzZW50ZWQgYnkgYSA6bGFuZygpIHNlbGVjdG9yXG5cdFx0Ly8gaXMgYmFzZWQgc29sZWx5IG9uIHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UgdmFsdWVcblx0XHQvLyBiZWluZyBlcXVhbCB0byB0aGUgaWRlbnRpZmllciBDLFxuXHRcdC8vIG9yIGJlZ2lubmluZyB3aXRoIHRoZSBpZGVudGlmaWVyIEMgaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgXCItXCIuXG5cdFx0Ly8gVGhlIG1hdGNoaW5nIG9mIEMgYWdhaW5zdCB0aGUgZWxlbWVudCdzIGxhbmd1YWdlIHZhbHVlIGlzIHBlcmZvcm1lZCBjYXNlLWluc2Vuc2l0aXZlbHkuXG5cdFx0Ly8gVGhlIGlkZW50aWZpZXIgQyBkb2VzIG5vdCBoYXZlIHRvIGJlIGEgdmFsaWQgbGFuZ3VhZ2UgbmFtZS5cIlxuXHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jbGFuZy1wc2V1ZG9cblx0XHRcImxhbmdcIjogbWFya0Z1bmN0aW9uKCBmdW5jdGlvbiggbGFuZyApIHtcblx0XHRcdC8vIGxhbmcgdmFsdWUgbXVzdCBiZSBhIHZhbGlkIGlkZW50aWZpZXJcblx0XHRcdGlmICggIXJpZGVudGlmaWVyLnRlc3QobGFuZyB8fCBcIlwiKSApIHtcblx0XHRcdFx0U2l6emxlLmVycm9yKCBcInVuc3VwcG9ydGVkIGxhbmc6IFwiICsgbGFuZyApO1xuXHRcdFx0fVxuXHRcdFx0bGFuZyA9IGxhbmcucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgZWxlbUxhbmc7XG5cdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRpZiAoIChlbGVtTGFuZyA9IGRvY3VtZW50SXNIVE1MID9cblx0XHRcdFx0XHRcdGVsZW0ubGFuZyA6XG5cdFx0XHRcdFx0XHRlbGVtLmdldEF0dHJpYnV0ZShcInhtbDpsYW5nXCIpIHx8IGVsZW0uZ2V0QXR0cmlidXRlKFwibGFuZ1wiKSkgKSB7XG5cblx0XHRcdFx0XHRcdGVsZW1MYW5nID0gZWxlbUxhbmcudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtTGFuZyA9PT0gbGFuZyB8fCBlbGVtTGFuZy5pbmRleE9mKCBsYW5nICsgXCItXCIgKSA9PT0gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gd2hpbGUgKCAoZWxlbSA9IGVsZW0ucGFyZW50Tm9kZSkgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0Ly8gTWlzY2VsbGFuZW91c1xuXHRcdFwidGFyZ2V0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24gJiYgd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cdFx0XHRyZXR1cm4gaGFzaCAmJiBoYXNoLnNsaWNlKCAxICkgPT09IGVsZW0uaWQ7XG5cdFx0fSxcblxuXHRcdFwicm9vdFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBkb2NFbGVtO1xuXHRcdH0sXG5cblx0XHRcImZvY3VzXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKCFkb2N1bWVudC5oYXNGb2N1cyB8fCBkb2N1bWVudC5oYXNGb2N1cygpKSAmJiAhIShlbGVtLnR5cGUgfHwgZWxlbS5ocmVmIHx8IH5lbGVtLnRhYkluZGV4KTtcblx0XHR9LFxuXG5cdFx0Ly8gQm9vbGVhbiBwcm9wZXJ0aWVzXG5cdFx0XCJlbmFibGVkXCI6IGNyZWF0ZURpc2FibGVkUHNldWRvKCBmYWxzZSApLFxuXHRcdFwiZGlzYWJsZWRcIjogY3JlYXRlRGlzYWJsZWRQc2V1ZG8oIHRydWUgKSxcblxuXHRcdFwiY2hlY2tlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdC8vIEluIENTUzMsIDpjaGVja2VkIHNob3VsZCByZXR1cm4gYm90aCBjaGVja2VkIGFuZCBzZWxlY3RlZCBlbGVtZW50c1xuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9SRUMtY3NzMy1zZWxlY3RvcnMtMjAxMTA5MjkvI2NoZWNrZWRcblx0XHRcdHZhciBub2RlTmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiAobm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiAhIWVsZW0uY2hlY2tlZCkgfHwgKG5vZGVOYW1lID09PSBcIm9wdGlvblwiICYmICEhZWxlbS5zZWxlY3RlZCk7XG5cdFx0fSxcblxuXHRcdFwic2VsZWN0ZWRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHQvLyBBY2Nlc3NpbmcgdGhpcyBwcm9wZXJ0eSBtYWtlcyBzZWxlY3RlZC1ieS1kZWZhdWx0XG5cdFx0XHQvLyBvcHRpb25zIGluIFNhZmFyaSB3b3JrIHByb3Blcmx5XG5cdFx0XHRpZiAoIGVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0ZWxlbS5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlbGVtLnNlbGVjdGVkID09PSB0cnVlO1xuXHRcdH0sXG5cblx0XHQvLyBDb250ZW50c1xuXHRcdFwiZW1wdHlcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2VtcHR5LXBzZXVkb1xuXHRcdFx0Ly8gOmVtcHR5IGlzIG5lZ2F0ZWQgYnkgZWxlbWVudCAoMSkgb3IgY29udGVudCBub2RlcyAodGV4dDogMzsgY2RhdGE6IDQ7IGVudGl0eSByZWY6IDUpLFxuXHRcdFx0Ly8gICBidXQgbm90IGJ5IG90aGVycyAoY29tbWVudDogODsgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbjogNzsgZXRjLilcblx0XHRcdC8vIG5vZGVUeXBlIDwgNiB3b3JrcyBiZWNhdXNlIGF0dHJpYnV0ZXMgKDIpIGRvIG5vdCBhcHBlYXIgYXMgY2hpbGRyZW5cblx0XHRcdGZvciAoIGVsZW0gPSBlbGVtLmZpcnN0Q2hpbGQ7IGVsZW07IGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nICkge1xuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPCA2ICkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdFwicGFyZW50XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuICFFeHByLnBzZXVkb3NbXCJlbXB0eVwiXSggZWxlbSApO1xuXHRcdH0sXG5cblx0XHQvLyBFbGVtZW50L2lucHV0IHR5cGVzXG5cdFx0XCJoZWFkZXJcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gcmhlYWRlci50ZXN0KCBlbGVtLm5vZGVOYW1lICk7XG5cdFx0fSxcblxuXHRcdFwiaW5wdXRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gcmlucHV0cy50ZXN0KCBlbGVtLm5vZGVOYW1lICk7XG5cdFx0fSxcblxuXHRcdFwiYnV0dG9uXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gXCJidXR0b25cIiB8fCBuYW1lID09PSBcImJ1dHRvblwiO1xuXHRcdH0sXG5cblx0XHRcInRleHRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgYXR0cjtcblx0XHRcdHJldHVybiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIiAmJlxuXHRcdFx0XHRlbGVtLnR5cGUgPT09IFwidGV4dFwiICYmXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUU8OFxuXHRcdFx0XHQvLyBOZXcgSFRNTDUgYXR0cmlidXRlIHZhbHVlcyAoZS5nLiwgXCJzZWFyY2hcIikgYXBwZWFyIHdpdGggZWxlbS50eXBlID09PSBcInRleHRcIlxuXHRcdFx0XHQoIChhdHRyID0gZWxlbS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpKSA9PSBudWxsIHx8IGF0dHIudG9Mb3dlckNhc2UoKSA9PT0gXCJ0ZXh0XCIgKTtcblx0XHR9LFxuXG5cdFx0Ly8gUG9zaXRpb24taW4tY29sbGVjdGlvblxuXHRcdFwiZmlyc3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBbIDAgXTtcblx0XHR9KSxcblxuXHRcdFwibGFzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHJldHVybiBbIGxlbmd0aCAtIDEgXTtcblx0XHR9KSxcblxuXHRcdFwiZXFcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0cmV0dXJuIFsgYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudCBdO1xuXHRcdH0pLFxuXG5cdFx0XCJldmVuXCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpICs9IDIgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pLFxuXG5cdFx0XCJvZGRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHR2YXIgaSA9IDE7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSksXG5cblx0XHRcImx0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoLCBhcmd1bWVudCApIHtcblx0XHRcdHZhciBpID0gYXJndW1lbnQgPCAwID8gYXJndW1lbnQgKyBsZW5ndGggOiBhcmd1bWVudDtcblx0XHRcdGZvciAoIDsgLS1pID49IDA7ICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9KSxcblxuXHRcdFwiZ3RcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0dmFyIGkgPSBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50O1xuXHRcdFx0Zm9yICggOyArK2kgPCBsZW5ndGg7ICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9KVxuXHR9XG59O1xuXG5FeHByLnBzZXVkb3NbXCJudGhcIl0gPSBFeHByLnBzZXVkb3NbXCJlcVwiXTtcblxuLy8gQWRkIGJ1dHRvbi9pbnB1dCB0eXBlIHBzZXVkb3NcbmZvciAoIGkgaW4geyByYWRpbzogdHJ1ZSwgY2hlY2tib3g6IHRydWUsIGZpbGU6IHRydWUsIHBhc3N3b3JkOiB0cnVlLCBpbWFnZTogdHJ1ZSB9ICkge1xuXHRFeHByLnBzZXVkb3NbIGkgXSA9IGNyZWF0ZUlucHV0UHNldWRvKCBpICk7XG59XG5mb3IgKCBpIGluIHsgc3VibWl0OiB0cnVlLCByZXNldDogdHJ1ZSB9ICkge1xuXHRFeHByLnBzZXVkb3NbIGkgXSA9IGNyZWF0ZUJ1dHRvblBzZXVkbyggaSApO1xufVxuXG4vLyBFYXN5IEFQSSBmb3IgY3JlYXRpbmcgbmV3IHNldEZpbHRlcnNcbmZ1bmN0aW9uIHNldEZpbHRlcnMoKSB7fVxuc2V0RmlsdGVycy5wcm90b3R5cGUgPSBFeHByLmZpbHRlcnMgPSBFeHByLnBzZXVkb3M7XG5FeHByLnNldEZpbHRlcnMgPSBuZXcgc2V0RmlsdGVycygpO1xuXG50b2tlbml6ZSA9IFNpenpsZS50b2tlbml6ZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgcGFyc2VPbmx5ICkge1xuXHR2YXIgbWF0Y2hlZCwgbWF0Y2gsIHRva2VucywgdHlwZSxcblx0XHRzb0ZhciwgZ3JvdXBzLCBwcmVGaWx0ZXJzLFxuXHRcdGNhY2hlZCA9IHRva2VuQ2FjaGVbIHNlbGVjdG9yICsgXCIgXCIgXTtcblxuXHRpZiAoIGNhY2hlZCApIHtcblx0XHRyZXR1cm4gcGFyc2VPbmx5ID8gMCA6IGNhY2hlZC5zbGljZSggMCApO1xuXHR9XG5cblx0c29GYXIgPSBzZWxlY3Rvcjtcblx0Z3JvdXBzID0gW107XG5cdHByZUZpbHRlcnMgPSBFeHByLnByZUZpbHRlcjtcblxuXHR3aGlsZSAoIHNvRmFyICkge1xuXG5cdFx0Ly8gQ29tbWEgYW5kIGZpcnN0IHJ1blxuXHRcdGlmICggIW1hdGNoZWQgfHwgKG1hdGNoID0gcmNvbW1hLmV4ZWMoIHNvRmFyICkpICkge1xuXHRcdFx0aWYgKCBtYXRjaCApIHtcblx0XHRcdFx0Ly8gRG9uJ3QgY29uc3VtZSB0cmFpbGluZyBjb21tYXMgYXMgdmFsaWRcblx0XHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hbMF0ubGVuZ3RoICkgfHwgc29GYXI7XG5cdFx0XHR9XG5cdFx0XHRncm91cHMucHVzaCggKHRva2VucyA9IFtdKSApO1xuXHRcdH1cblxuXHRcdG1hdGNoZWQgPSBmYWxzZTtcblxuXHRcdC8vIENvbWJpbmF0b3JzXG5cdFx0aWYgKCAobWF0Y2ggPSByY29tYmluYXRvcnMuZXhlYyggc29GYXIgKSkgKSB7XG5cdFx0XHRtYXRjaGVkID0gbWF0Y2guc2hpZnQoKTtcblx0XHRcdHRva2Vucy5wdXNoKHtcblx0XHRcdFx0dmFsdWU6IG1hdGNoZWQsXG5cdFx0XHRcdC8vIENhc3QgZGVzY2VuZGFudCBjb21iaW5hdG9ycyB0byBzcGFjZVxuXHRcdFx0XHR0eXBlOiBtYXRjaFswXS5yZXBsYWNlKCBydHJpbSwgXCIgXCIgKVxuXHRcdFx0fSk7XG5cdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaGVkLmxlbmd0aCApO1xuXHRcdH1cblxuXHRcdC8vIEZpbHRlcnNcblx0XHRmb3IgKCB0eXBlIGluIEV4cHIuZmlsdGVyICkge1xuXHRcdFx0aWYgKCAobWF0Y2ggPSBtYXRjaEV4cHJbIHR5cGUgXS5leGVjKCBzb0ZhciApKSAmJiAoIXByZUZpbHRlcnNbIHR5cGUgXSB8fFxuXHRcdFx0XHQobWF0Y2ggPSBwcmVGaWx0ZXJzWyB0eXBlIF0oIG1hdGNoICkpKSApIHtcblx0XHRcdFx0bWF0Y2hlZCA9IG1hdGNoLnNoaWZ0KCk7XG5cdFx0XHRcdHRva2Vucy5wdXNoKHtcblx0XHRcdFx0XHR2YWx1ZTogbWF0Y2hlZCxcblx0XHRcdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0XHRcdG1hdGNoZXM6IG1hdGNoXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaGVkLmxlbmd0aCApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggIW1hdGNoZWQgKSB7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIGxlbmd0aCBvZiB0aGUgaW52YWxpZCBleGNlc3Ncblx0Ly8gaWYgd2UncmUganVzdCBwYXJzaW5nXG5cdC8vIE90aGVyd2lzZSwgdGhyb3cgYW4gZXJyb3Igb3IgcmV0dXJuIHRva2Vuc1xuXHRyZXR1cm4gcGFyc2VPbmx5ID9cblx0XHRzb0Zhci5sZW5ndGggOlxuXHRcdHNvRmFyID9cblx0XHRcdFNpenpsZS5lcnJvciggc2VsZWN0b3IgKSA6XG5cdFx0XHQvLyBDYWNoZSB0aGUgdG9rZW5zXG5cdFx0XHR0b2tlbkNhY2hlKCBzZWxlY3RvciwgZ3JvdXBzICkuc2xpY2UoIDAgKTtcbn07XG5cbmZ1bmN0aW9uIHRvU2VsZWN0b3IoIHRva2VucyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IHRva2Vucy5sZW5ndGgsXG5cdFx0c2VsZWN0b3IgPSBcIlwiO1xuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRzZWxlY3RvciArPSB0b2tlbnNbaV0udmFsdWU7XG5cdH1cblx0cmV0dXJuIHNlbGVjdG9yO1xufVxuXG5mdW5jdGlvbiBhZGRDb21iaW5hdG9yKCBtYXRjaGVyLCBjb21iaW5hdG9yLCBiYXNlICkge1xuXHR2YXIgZGlyID0gY29tYmluYXRvci5kaXIsXG5cdFx0c2tpcCA9IGNvbWJpbmF0b3IubmV4dCxcblx0XHRrZXkgPSBza2lwIHx8IGRpcixcblx0XHRjaGVja05vbkVsZW1lbnRzID0gYmFzZSAmJiBrZXkgPT09IFwicGFyZW50Tm9kZVwiLFxuXHRcdGRvbmVOYW1lID0gZG9uZSsrO1xuXG5cdHJldHVybiBjb21iaW5hdG9yLmZpcnN0ID9cblx0XHQvLyBDaGVjayBhZ2FpbnN0IGNsb3Nlc3QgYW5jZXN0b3IvcHJlY2VkaW5nIGVsZW1lbnRcblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSA6XG5cblx0XHQvLyBDaGVjayBhZ2FpbnN0IGFsbCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudHNcblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIG9sZENhY2hlLCB1bmlxdWVDYWNoZSwgb3V0ZXJDYWNoZSxcblx0XHRcdFx0bmV3Q2FjaGUgPSBbIGRpcnJ1bnMsIGRvbmVOYW1lIF07XG5cblx0XHRcdC8vIFdlIGNhbid0IHNldCBhcmJpdHJhcnkgZGF0YSBvbiBYTUwgbm9kZXMsIHNvIHRoZXkgZG9uJ3QgYmVuZWZpdCBmcm9tIGNvbWJpbmF0b3IgY2FjaGluZ1xuXHRcdFx0aWYgKCB4bWwgKSB7XG5cdFx0XHRcdHdoaWxlICggKGVsZW0gPSBlbGVtWyBkaXIgXSkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdoaWxlICggKGVsZW0gPSBlbGVtWyBkaXIgXSkgKSB7XG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGNoZWNrTm9uRWxlbWVudHMgKSB7XG5cdFx0XHRcdFx0XHRvdXRlckNhY2hlID0gZWxlbVsgZXhwYW5kbyBdIHx8IChlbGVtWyBleHBhbmRvIF0gPSB7fSk7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGUgPSBvdXRlckNhY2hlWyBlbGVtLnVuaXF1ZUlEIF0gfHwgKG91dGVyQ2FjaGVbIGVsZW0udW5pcXVlSUQgXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0aWYgKCBza2lwICYmIHNraXAgPT09IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSApIHtcblx0XHRcdFx0XHRcdFx0ZWxlbSA9IGVsZW1bIGRpciBdIHx8IGVsZW07XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCAob2xkQ2FjaGUgPSB1bmlxdWVDYWNoZVsga2V5IF0pICYmXG5cdFx0XHRcdFx0XHRcdG9sZENhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgb2xkQ2FjaGVbIDEgXSA9PT0gZG9uZU5hbWUgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQXNzaWduIHRvIG5ld0NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChuZXdDYWNoZVsgMiBdID0gb2xkQ2FjaGVbIDIgXSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBSZXVzZSBuZXdjYWNoZSBzbyByZXN1bHRzIGJhY2stcHJvcGFnYXRlIHRvIHByZXZpb3VzIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlWyBrZXkgXSA9IG5ld0NhY2hlO1xuXG5cdFx0XHRcdFx0XHRcdC8vIEEgbWF0Y2ggbWVhbnMgd2UncmUgZG9uZTsgYSBmYWlsIG1lYW5zIHdlIGhhdmUgdG8ga2VlcCBjaGVja2luZ1xuXHRcdFx0XHRcdFx0XHRpZiAoIChuZXdDYWNoZVsgMiBdID0gbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkpICkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcbn1cblxuZnVuY3Rpb24gZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICkge1xuXHRyZXR1cm4gbWF0Y2hlcnMubGVuZ3RoID4gMSA/XG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbnRleHQsIHhtbCApIHtcblx0XHRcdHZhciBpID0gbWF0Y2hlcnMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggIW1hdGNoZXJzW2ldKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gOlxuXHRcdG1hdGNoZXJzWzBdO1xufVxuXG5mdW5jdGlvbiBtdWx0aXBsZUNvbnRleHRzKCBzZWxlY3RvciwgY29udGV4dHMsIHJlc3VsdHMgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSBjb250ZXh0cy5sZW5ndGg7XG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFNpenpsZSggc2VsZWN0b3IsIGNvbnRleHRzW2ldLCByZXN1bHRzICk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIGNvbmRlbnNlKCB1bm1hdGNoZWQsIG1hcCwgZmlsdGVyLCBjb250ZXh0LCB4bWwgKSB7XG5cdHZhciBlbGVtLFxuXHRcdG5ld1VubWF0Y2hlZCA9IFtdLFxuXHRcdGkgPSAwLFxuXHRcdGxlbiA9IHVubWF0Y2hlZC5sZW5ndGgsXG5cdFx0bWFwcGVkID0gbWFwICE9IG51bGw7XG5cblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0aWYgKCAoZWxlbSA9IHVubWF0Y2hlZFtpXSkgKSB7XG5cdFx0XHRpZiAoICFmaWx0ZXIgfHwgZmlsdGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSApIHtcblx0XHRcdFx0bmV3VW5tYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0aWYgKCBtYXBwZWQgKSB7XG5cdFx0XHRcdFx0bWFwLnB1c2goIGkgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBuZXdVbm1hdGNoZWQ7XG59XG5cbmZ1bmN0aW9uIHNldE1hdGNoZXIoIHByZUZpbHRlciwgc2VsZWN0b3IsIG1hdGNoZXIsIHBvc3RGaWx0ZXIsIHBvc3RGaW5kZXIsIHBvc3RTZWxlY3RvciApIHtcblx0aWYgKCBwb3N0RmlsdGVyICYmICFwb3N0RmlsdGVyWyBleHBhbmRvIF0gKSB7XG5cdFx0cG9zdEZpbHRlciA9IHNldE1hdGNoZXIoIHBvc3RGaWx0ZXIgKTtcblx0fVxuXHRpZiAoIHBvc3RGaW5kZXIgJiYgIXBvc3RGaW5kZXJbIGV4cGFuZG8gXSApIHtcblx0XHRwb3N0RmluZGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICk7XG5cdH1cblx0cmV0dXJuIG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VlZCwgcmVzdWx0cywgY29udGV4dCwgeG1sICkge1xuXHRcdHZhciB0ZW1wLCBpLCBlbGVtLFxuXHRcdFx0cHJlTWFwID0gW10sXG5cdFx0XHRwb3N0TWFwID0gW10sXG5cdFx0XHRwcmVleGlzdGluZyA9IHJlc3VsdHMubGVuZ3RoLFxuXG5cdFx0XHQvLyBHZXQgaW5pdGlhbCBlbGVtZW50cyBmcm9tIHNlZWQgb3IgY29udGV4dFxuXHRcdFx0ZWxlbXMgPSBzZWVkIHx8IG11bHRpcGxlQ29udGV4dHMoIHNlbGVjdG9yIHx8IFwiKlwiLCBjb250ZXh0Lm5vZGVUeXBlID8gWyBjb250ZXh0IF0gOiBjb250ZXh0LCBbXSApLFxuXG5cdFx0XHQvLyBQcmVmaWx0ZXIgdG8gZ2V0IG1hdGNoZXIgaW5wdXQsIHByZXNlcnZpbmcgYSBtYXAgZm9yIHNlZWQtcmVzdWx0cyBzeW5jaHJvbml6YXRpb25cblx0XHRcdG1hdGNoZXJJbiA9IHByZUZpbHRlciAmJiAoIHNlZWQgfHwgIXNlbGVjdG9yICkgP1xuXHRcdFx0XHRjb25kZW5zZSggZWxlbXMsIHByZU1hcCwgcHJlRmlsdGVyLCBjb250ZXh0LCB4bWwgKSA6XG5cdFx0XHRcdGVsZW1zLFxuXG5cdFx0XHRtYXRjaGVyT3V0ID0gbWF0Y2hlciA/XG5cdFx0XHRcdC8vIElmIHdlIGhhdmUgYSBwb3N0RmluZGVyLCBvciBmaWx0ZXJlZCBzZWVkLCBvciBub24tc2VlZCBwb3N0RmlsdGVyIG9yIHByZWV4aXN0aW5nIHJlc3VsdHMsXG5cdFx0XHRcdHBvc3RGaW5kZXIgfHwgKCBzZWVkID8gcHJlRmlsdGVyIDogcHJlZXhpc3RpbmcgfHwgcG9zdEZpbHRlciApID9cblxuXHRcdFx0XHRcdC8vIC4uLmludGVybWVkaWF0ZSBwcm9jZXNzaW5nIGlzIG5lY2Vzc2FyeVxuXHRcdFx0XHRcdFtdIDpcblxuXHRcdFx0XHRcdC8vIC4uLm90aGVyd2lzZSB1c2UgcmVzdWx0cyBkaXJlY3RseVxuXHRcdFx0XHRcdHJlc3VsdHMgOlxuXHRcdFx0XHRtYXRjaGVySW47XG5cblx0XHQvLyBGaW5kIHByaW1hcnkgbWF0Y2hlc1xuXHRcdGlmICggbWF0Y2hlciApIHtcblx0XHRcdG1hdGNoZXIoIG1hdGNoZXJJbiwgbWF0Y2hlck91dCwgY29udGV4dCwgeG1sICk7XG5cdFx0fVxuXG5cdFx0Ly8gQXBwbHkgcG9zdEZpbHRlclxuXHRcdGlmICggcG9zdEZpbHRlciApIHtcblx0XHRcdHRlbXAgPSBjb25kZW5zZSggbWF0Y2hlck91dCwgcG9zdE1hcCApO1xuXHRcdFx0cG9zdEZpbHRlciggdGVtcCwgW10sIGNvbnRleHQsIHhtbCApO1xuXG5cdFx0XHQvLyBVbi1tYXRjaCBmYWlsaW5nIGVsZW1lbnRzIGJ5IG1vdmluZyB0aGVtIGJhY2sgdG8gbWF0Y2hlckluXG5cdFx0XHRpID0gdGVtcC5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCAoZWxlbSA9IHRlbXBbaV0pICkge1xuXHRcdFx0XHRcdG1hdGNoZXJPdXRbIHBvc3RNYXBbaV0gXSA9ICEobWF0Y2hlckluWyBwb3N0TWFwW2ldIF0gPSBlbGVtKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggc2VlZCApIHtcblx0XHRcdGlmICggcG9zdEZpbmRlciB8fCBwcmVGaWx0ZXIgKSB7XG5cdFx0XHRcdGlmICggcG9zdEZpbmRlciApIHtcblx0XHRcdFx0XHQvLyBHZXQgdGhlIGZpbmFsIG1hdGNoZXJPdXQgYnkgY29uZGVuc2luZyB0aGlzIGludGVybWVkaWF0ZSBpbnRvIHBvc3RGaW5kZXIgY29udGV4dHNcblx0XHRcdFx0XHR0ZW1wID0gW107XG5cdFx0XHRcdFx0aSA9IG1hdGNoZXJPdXQubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoZWxlbSA9IG1hdGNoZXJPdXRbaV0pICkge1xuXHRcdFx0XHRcdFx0XHQvLyBSZXN0b3JlIG1hdGNoZXJJbiBzaW5jZSBlbGVtIGlzIG5vdCB5ZXQgYSBmaW5hbCBtYXRjaFxuXHRcdFx0XHRcdFx0XHR0ZW1wLnB1c2goIChtYXRjaGVySW5baV0gPSBlbGVtKSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb3N0RmluZGVyKCBudWxsLCAobWF0Y2hlck91dCA9IFtdKSwgdGVtcCwgeG1sICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBNb3ZlIG1hdGNoZWQgZWxlbWVudHMgZnJvbSBzZWVkIHRvIHJlc3VsdHMgdG8ga2VlcCB0aGVtIHN5bmNocm9uaXplZFxuXHRcdFx0XHRpID0gbWF0Y2hlck91dC5sZW5ndGg7XG5cdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdGlmICggKGVsZW0gPSBtYXRjaGVyT3V0W2ldKSAmJlxuXHRcdFx0XHRcdFx0KHRlbXAgPSBwb3N0RmluZGVyID8gaW5kZXhPZiggc2VlZCwgZWxlbSApIDogcHJlTWFwW2ldKSA+IC0xICkge1xuXG5cdFx0XHRcdFx0XHRzZWVkW3RlbXBdID0gIShyZXN1bHRzW3RlbXBdID0gZWxlbSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBBZGQgZWxlbWVudHMgdG8gcmVzdWx0cywgdGhyb3VnaCBwb3N0RmluZGVyIGlmIGRlZmluZWRcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWF0Y2hlck91dCA9IGNvbmRlbnNlKFxuXHRcdFx0XHRtYXRjaGVyT3V0ID09PSByZXN1bHRzID9cblx0XHRcdFx0XHRtYXRjaGVyT3V0LnNwbGljZSggcHJlZXhpc3RpbmcsIG1hdGNoZXJPdXQubGVuZ3RoICkgOlxuXHRcdFx0XHRcdG1hdGNoZXJPdXRcblx0XHRcdCk7XG5cdFx0XHRpZiAoIHBvc3RGaW5kZXIgKSB7XG5cdFx0XHRcdHBvc3RGaW5kZXIoIG51bGwsIHJlc3VsdHMsIG1hdGNoZXJPdXQsIHhtbCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgbWF0Y2hlck91dCApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMgKSB7XG5cdHZhciBjaGVja0NvbnRleHQsIG1hdGNoZXIsIGosXG5cdFx0bGVuID0gdG9rZW5zLmxlbmd0aCxcblx0XHRsZWFkaW5nUmVsYXRpdmUgPSBFeHByLnJlbGF0aXZlWyB0b2tlbnNbMF0udHlwZSBdLFxuXHRcdGltcGxpY2l0UmVsYXRpdmUgPSBsZWFkaW5nUmVsYXRpdmUgfHwgRXhwci5yZWxhdGl2ZVtcIiBcIl0sXG5cdFx0aSA9IGxlYWRpbmdSZWxhdGl2ZSA/IDEgOiAwLFxuXG5cdFx0Ly8gVGhlIGZvdW5kYXRpb25hbCBtYXRjaGVyIGVuc3VyZXMgdGhhdCBlbGVtZW50cyBhcmUgcmVhY2hhYmxlIGZyb20gdG9wLWxldmVsIGNvbnRleHQocylcblx0XHRtYXRjaENvbnRleHQgPSBhZGRDb21iaW5hdG9yKCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtID09PSBjaGVja0NvbnRleHQ7XG5cdFx0fSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuXHRcdG1hdGNoQW55Q29udGV4dCA9IGFkZENvbWJpbmF0b3IoIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGluZGV4T2YoIGNoZWNrQ29udGV4dCwgZWxlbSApID4gLTE7XG5cdFx0fSwgaW1wbGljaXRSZWxhdGl2ZSwgdHJ1ZSApLFxuXHRcdG1hdGNoZXJzID0gWyBmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIHJldCA9ICggIWxlYWRpbmdSZWxhdGl2ZSAmJiAoIHhtbCB8fCBjb250ZXh0ICE9PSBvdXRlcm1vc3RDb250ZXh0ICkgKSB8fCAoXG5cdFx0XHRcdChjaGVja0NvbnRleHQgPSBjb250ZXh0KS5ub2RlVHlwZSA/XG5cdFx0XHRcdFx0bWF0Y2hDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSA6XG5cdFx0XHRcdFx0bWF0Y2hBbnlDb250ZXh0KCBlbGVtLCBjb250ZXh0LCB4bWwgKSApO1xuXHRcdFx0Ly8gQXZvaWQgaGFuZ2luZyBvbnRvIGVsZW1lbnQgKGlzc3VlICMyOTkpXG5cdFx0XHRjaGVja0NvbnRleHQgPSBudWxsO1xuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9IF07XG5cblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0aWYgKCAobWF0Y2hlciA9IEV4cHIucmVsYXRpdmVbIHRva2Vuc1tpXS50eXBlIF0pICkge1xuXHRcdFx0bWF0Y2hlcnMgPSBbIGFkZENvbWJpbmF0b3IoZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICksIG1hdGNoZXIpIF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1hdGNoZXIgPSBFeHByLmZpbHRlclsgdG9rZW5zW2ldLnR5cGUgXS5hcHBseSggbnVsbCwgdG9rZW5zW2ldLm1hdGNoZXMgKTtcblxuXHRcdFx0Ly8gUmV0dXJuIHNwZWNpYWwgdXBvbiBzZWVpbmcgYSBwb3NpdGlvbmFsIG1hdGNoZXJcblx0XHRcdGlmICggbWF0Y2hlclsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHQvLyBGaW5kIHRoZSBuZXh0IHJlbGF0aXZlIG9wZXJhdG9yIChpZiBhbnkpIGZvciBwcm9wZXIgaGFuZGxpbmdcblx0XHRcdFx0aiA9ICsraTtcblx0XHRcdFx0Zm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG5cdFx0XHRcdFx0aWYgKCBFeHByLnJlbGF0aXZlWyB0b2tlbnNbal0udHlwZSBdICkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzZXRNYXRjaGVyKFxuXHRcdFx0XHRcdGkgPiAxICYmIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApLFxuXHRcdFx0XHRcdGkgPiAxICYmIHRvU2VsZWN0b3IoXG5cdFx0XHRcdFx0XHQvLyBJZiB0aGUgcHJlY2VkaW5nIHRva2VuIHdhcyBhIGRlc2NlbmRhbnQgY29tYmluYXRvciwgaW5zZXJ0IGFuIGltcGxpY2l0IGFueS1lbGVtZW50IGAqYFxuXHRcdFx0XHRcdFx0dG9rZW5zLnNsaWNlKCAwLCBpIC0gMSApLmNvbmNhdCh7IHZhbHVlOiB0b2tlbnNbIGkgLSAyIF0udHlwZSA9PT0gXCIgXCIgPyBcIipcIiA6IFwiXCIgfSlcblx0XHRcdFx0XHQpLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSxcblx0XHRcdFx0XHRtYXRjaGVyLFxuXHRcdFx0XHRcdGkgPCBqICYmIG1hdGNoZXJGcm9tVG9rZW5zKCB0b2tlbnMuc2xpY2UoIGksIGogKSApLFxuXHRcdFx0XHRcdGogPCBsZW4gJiYgbWF0Y2hlckZyb21Ub2tlbnMoICh0b2tlbnMgPSB0b2tlbnMuc2xpY2UoIGogKSkgKSxcblx0XHRcdFx0XHRqIDwgbGVuICYmIHRvU2VsZWN0b3IoIHRva2VucyApXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRtYXRjaGVycy5wdXNoKCBtYXRjaGVyICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW1lbnRNYXRjaGVyKCBtYXRjaGVycyApO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSB7XG5cdHZhciBieVNldCA9IHNldE1hdGNoZXJzLmxlbmd0aCA+IDAsXG5cdFx0YnlFbGVtZW50ID0gZWxlbWVudE1hdGNoZXJzLmxlbmd0aCA+IDAsXG5cdFx0c3VwZXJNYXRjaGVyID0gZnVuY3Rpb24oIHNlZWQsIGNvbnRleHQsIHhtbCwgcmVzdWx0cywgb3V0ZXJtb3N0ICkge1xuXHRcdFx0dmFyIGVsZW0sIGosIG1hdGNoZXIsXG5cdFx0XHRcdG1hdGNoZWRDb3VudCA9IDAsXG5cdFx0XHRcdGkgPSBcIjBcIixcblx0XHRcdFx0dW5tYXRjaGVkID0gc2VlZCAmJiBbXSxcblx0XHRcdFx0c2V0TWF0Y2hlZCA9IFtdLFxuXHRcdFx0XHRjb250ZXh0QmFja3VwID0gb3V0ZXJtb3N0Q29udGV4dCxcblx0XHRcdFx0Ly8gV2UgbXVzdCBhbHdheXMgaGF2ZSBlaXRoZXIgc2VlZCBlbGVtZW50cyBvciBvdXRlcm1vc3QgY29udGV4dFxuXHRcdFx0XHRlbGVtcyA9IHNlZWQgfHwgYnlFbGVtZW50ICYmIEV4cHIuZmluZFtcIlRBR1wiXSggXCIqXCIsIG91dGVybW9zdCApLFxuXHRcdFx0XHQvLyBVc2UgaW50ZWdlciBkaXJydW5zIGlmZiB0aGlzIGlzIHRoZSBvdXRlcm1vc3QgbWF0Y2hlclxuXHRcdFx0XHRkaXJydW5zVW5pcXVlID0gKGRpcnJ1bnMgKz0gY29udGV4dEJhY2t1cCA9PSBudWxsID8gMSA6IE1hdGgucmFuZG9tKCkgfHwgMC4xKSxcblx0XHRcdFx0bGVuID0gZWxlbXMubGVuZ3RoO1xuXG5cdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0b3V0ZXJtb3N0Q29udGV4dCA9IGNvbnRleHQgPT09IGRvY3VtZW50IHx8IGNvbnRleHQgfHwgb3V0ZXJtb3N0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgZWxlbWVudHMgcGFzc2luZyBlbGVtZW50TWF0Y2hlcnMgZGlyZWN0bHkgdG8gcmVzdWx0c1xuXHRcdFx0Ly8gU3VwcG9ydDogSUU8OSwgU2FmYXJpXG5cdFx0XHQvLyBUb2xlcmF0ZSBOb2RlTGlzdCBwcm9wZXJ0aWVzIChJRTogXCJsZW5ndGhcIjsgU2FmYXJpOiA8bnVtYmVyPikgbWF0Y2hpbmcgZWxlbWVudHMgYnkgaWRcblx0XHRcdGZvciAoIDsgaSAhPT0gbGVuICYmIChlbGVtID0gZWxlbXNbaV0pICE9IG51bGw7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBieUVsZW1lbnQgJiYgZWxlbSApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHRpZiAoICFjb250ZXh0ICYmIGVsZW0ub3duZXJEb2N1bWVudCAhPT0gZG9jdW1lbnQgKSB7XG5cdFx0XHRcdFx0XHRzZXREb2N1bWVudCggZWxlbSApO1xuXHRcdFx0XHRcdFx0eG1sID0gIWRvY3VtZW50SXNIVE1MO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR3aGlsZSAoIChtYXRjaGVyID0gZWxlbWVudE1hdGNoZXJzW2orK10pICkge1xuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVyKCBlbGVtLCBjb250ZXh0IHx8IGRvY3VtZW50LCB4bWwpICkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRcdFx0ZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVHJhY2sgdW5tYXRjaGVkIGVsZW1lbnRzIGZvciBzZXQgZmlsdGVyc1xuXHRcdFx0XHRpZiAoIGJ5U2V0ICkge1xuXHRcdFx0XHRcdC8vIFRoZXkgd2lsbCBoYXZlIGdvbmUgdGhyb3VnaCBhbGwgcG9zc2libGUgbWF0Y2hlcnNcblx0XHRcdFx0XHRpZiAoIChlbGVtID0gIW1hdGNoZXIgJiYgZWxlbSkgKSB7XG5cdFx0XHRcdFx0XHRtYXRjaGVkQ291bnQtLTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBMZW5ndGhlbiB0aGUgYXJyYXkgZm9yIGV2ZXJ5IGVsZW1lbnQsIG1hdGNoZWQgb3Igbm90XG5cdFx0XHRcdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0XHRcdFx0dW5tYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gYGlgIGlzIG5vdyB0aGUgY291bnQgb2YgZWxlbWVudHMgdmlzaXRlZCBhYm92ZSwgYW5kIGFkZGluZyBpdCB0byBgbWF0Y2hlZENvdW50YFxuXHRcdFx0Ly8gbWFrZXMgdGhlIGxhdHRlciBub25uZWdhdGl2ZS5cblx0XHRcdG1hdGNoZWRDb3VudCArPSBpO1xuXG5cdFx0XHQvLyBBcHBseSBzZXQgZmlsdGVycyB0byB1bm1hdGNoZWQgZWxlbWVudHNcblx0XHRcdC8vIE5PVEU6IFRoaXMgY2FuIGJlIHNraXBwZWQgaWYgdGhlcmUgYXJlIG5vIHVubWF0Y2hlZCBlbGVtZW50cyAoaS5lLiwgYG1hdGNoZWRDb3VudGBcblx0XHRcdC8vIGVxdWFscyBgaWApLCB1bmxlc3Mgd2UgZGlkbid0IHZpc2l0IF9hbnlfIGVsZW1lbnRzIGluIHRoZSBhYm92ZSBsb29wIGJlY2F1c2Ugd2UgaGF2ZVxuXHRcdFx0Ly8gbm8gZWxlbWVudCBtYXRjaGVycyBhbmQgbm8gc2VlZC5cblx0XHRcdC8vIEluY3JlbWVudGluZyBhbiBpbml0aWFsbHktc3RyaW5nIFwiMFwiIGBpYCBhbGxvd3MgYGlgIHRvIHJlbWFpbiBhIHN0cmluZyBvbmx5IGluIHRoYXRcblx0XHRcdC8vIGNhc2UsIHdoaWNoIHdpbGwgcmVzdWx0IGluIGEgXCIwMFwiIGBtYXRjaGVkQ291bnRgIHRoYXQgZGlmZmVycyBmcm9tIGBpYCBidXQgaXMgYWxzb1xuXHRcdFx0Ly8gbnVtZXJpY2FsbHkgemVyby5cblx0XHRcdGlmICggYnlTZXQgJiYgaSAhPT0gbWF0Y2hlZENvdW50ICkge1xuXHRcdFx0XHRqID0gMDtcblx0XHRcdFx0d2hpbGUgKCAobWF0Y2hlciA9IHNldE1hdGNoZXJzW2orK10pICkge1xuXHRcdFx0XHRcdG1hdGNoZXIoIHVubWF0Y2hlZCwgc2V0TWF0Y2hlZCwgY29udGV4dCwgeG1sICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRcdFx0Ly8gUmVpbnRlZ3JhdGUgZWxlbWVudCBtYXRjaGVzIHRvIGVsaW1pbmF0ZSB0aGUgbmVlZCBmb3Igc29ydGluZ1xuXHRcdFx0XHRcdGlmICggbWF0Y2hlZENvdW50ID4gMCApIHtcblx0XHRcdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoICEodW5tYXRjaGVkW2ldIHx8IHNldE1hdGNoZWRbaV0pICkge1xuXHRcdFx0XHRcdFx0XHRcdHNldE1hdGNoZWRbaV0gPSBwb3AuY2FsbCggcmVzdWx0cyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRGlzY2FyZCBpbmRleCBwbGFjZWhvbGRlciB2YWx1ZXMgdG8gZ2V0IG9ubHkgYWN0dWFsIG1hdGNoZXNcblx0XHRcdFx0XHRzZXRNYXRjaGVkID0gY29uZGVuc2UoIHNldE1hdGNoZWQgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFkZCBtYXRjaGVzIHRvIHJlc3VsdHNcblx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgc2V0TWF0Y2hlZCApO1xuXG5cdFx0XHRcdC8vIFNlZWRsZXNzIHNldCBtYXRjaGVzIHN1Y2NlZWRpbmcgbXVsdGlwbGUgc3VjY2Vzc2Z1bCBtYXRjaGVycyBzdGlwdWxhdGUgc29ydGluZ1xuXHRcdFx0XHRpZiAoIG91dGVybW9zdCAmJiAhc2VlZCAmJiBzZXRNYXRjaGVkLmxlbmd0aCA+IDAgJiZcblx0XHRcdFx0XHQoIG1hdGNoZWRDb3VudCArIHNldE1hdGNoZXJzLmxlbmd0aCApID4gMSApIHtcblxuXHRcdFx0XHRcdFNpenpsZS51bmlxdWVTb3J0KCByZXN1bHRzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gT3ZlcnJpZGUgbWFuaXB1bGF0aW9uIG9mIGdsb2JhbHMgYnkgbmVzdGVkIG1hdGNoZXJzXG5cdFx0XHRpZiAoIG91dGVybW9zdCApIHtcblx0XHRcdFx0ZGlycnVucyA9IGRpcnJ1bnNVbmlxdWU7XG5cdFx0XHRcdG91dGVybW9zdENvbnRleHQgPSBjb250ZXh0QmFja3VwO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdW5tYXRjaGVkO1xuXHRcdH07XG5cblx0cmV0dXJuIGJ5U2V0ID9cblx0XHRtYXJrRnVuY3Rpb24oIHN1cGVyTWF0Y2hlciApIDpcblx0XHRzdXBlck1hdGNoZXI7XG59XG5cbmNvbXBpbGUgPSBTaXp6bGUuY29tcGlsZSA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgbWF0Y2ggLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG5cdHZhciBpLFxuXHRcdHNldE1hdGNoZXJzID0gW10sXG5cdFx0ZWxlbWVudE1hdGNoZXJzID0gW10sXG5cdFx0Y2FjaGVkID0gY29tcGlsZXJDYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG5cdGlmICggIWNhY2hlZCApIHtcblx0XHQvLyBHZW5lcmF0ZSBhIGZ1bmN0aW9uIG9mIHJlY3Vyc2l2ZSBmdW5jdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBjaGVjayBlYWNoIGVsZW1lbnRcblx0XHRpZiAoICFtYXRjaCApIHtcblx0XHRcdG1hdGNoID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cdFx0fVxuXHRcdGkgPSBtYXRjaC5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRjYWNoZWQgPSBtYXRjaGVyRnJvbVRva2VucyggbWF0Y2hbaV0gKTtcblx0XHRcdGlmICggY2FjaGVkWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdHNldE1hdGNoZXJzLnB1c2goIGNhY2hlZCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbWVudE1hdGNoZXJzLnB1c2goIGNhY2hlZCApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENhY2hlIHRoZSBjb21waWxlZCBmdW5jdGlvblxuXHRcdGNhY2hlZCA9IGNvbXBpbGVyQ2FjaGUoIHNlbGVjdG9yLCBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIGVsZW1lbnRNYXRjaGVycywgc2V0TWF0Y2hlcnMgKSApO1xuXG5cdFx0Ly8gU2F2ZSBzZWxlY3RvciBhbmQgdG9rZW5pemF0aW9uXG5cdFx0Y2FjaGVkLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cdH1cblx0cmV0dXJuIGNhY2hlZDtcbn07XG5cbi8qKlxuICogQSBsb3ctbGV2ZWwgc2VsZWN0aW9uIGZ1bmN0aW9uIHRoYXQgd29ya3Mgd2l0aCBTaXp6bGUncyBjb21waWxlZFxuICogIHNlbGVjdG9yIGZ1bmN0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHNlbGVjdG9yIEEgc2VsZWN0b3Igb3IgYSBwcmUtY29tcGlsZWRcbiAqICBzZWxlY3RvciBmdW5jdGlvbiBidWlsdCB3aXRoIFNpenpsZS5jb21waWxlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRleHRcbiAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHRzXVxuICogQHBhcmFtIHtBcnJheX0gW3NlZWRdIEEgc2V0IG9mIGVsZW1lbnRzIHRvIG1hdGNoIGFnYWluc3RcbiAqL1xuc2VsZWN0ID0gU2l6emxlLnNlbGVjdCA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcblx0dmFyIGksIHRva2VucywgdG9rZW4sIHR5cGUsIGZpbmQsXG5cdFx0Y29tcGlsZWQgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBzZWxlY3Rvcixcblx0XHRtYXRjaCA9ICFzZWVkICYmIHRva2VuaXplKCAoc2VsZWN0b3IgPSBjb21waWxlZC5zZWxlY3RvciB8fCBzZWxlY3RvcikgKTtcblxuXHRyZXN1bHRzID0gcmVzdWx0cyB8fCBbXTtcblxuXHQvLyBUcnkgdG8gbWluaW1pemUgb3BlcmF0aW9ucyBpZiB0aGVyZSBpcyBvbmx5IG9uZSBzZWxlY3RvciBpbiB0aGUgbGlzdCBhbmQgbm8gc2VlZFxuXHQvLyAodGhlIGxhdHRlciBvZiB3aGljaCBndWFyYW50ZWVzIHVzIGNvbnRleHQpXG5cdGlmICggbWF0Y2gubGVuZ3RoID09PSAxICkge1xuXG5cdFx0Ly8gUmVkdWNlIGNvbnRleHQgaWYgdGhlIGxlYWRpbmcgY29tcG91bmQgc2VsZWN0b3IgaXMgYW4gSURcblx0XHR0b2tlbnMgPSBtYXRjaFswXSA9IG1hdGNoWzBdLnNsaWNlKCAwICk7XG5cdFx0aWYgKCB0b2tlbnMubGVuZ3RoID4gMiAmJiAodG9rZW4gPSB0b2tlbnNbMF0pLnR5cGUgPT09IFwiSURcIiAmJlxuXHRcdFx0XHRjb250ZXh0Lm5vZGVUeXBlID09PSA5ICYmIGRvY3VtZW50SXNIVE1MICYmIEV4cHIucmVsYXRpdmVbIHRva2Vuc1sxXS50eXBlIF0gKSB7XG5cblx0XHRcdGNvbnRleHQgPSAoIEV4cHIuZmluZFtcIklEXCJdKCB0b2tlbi5tYXRjaGVzWzBdLnJlcGxhY2UocnVuZXNjYXBlLCBmdW5lc2NhcGUpLCBjb250ZXh0ICkgfHwgW10gKVswXTtcblx0XHRcdGlmICggIWNvbnRleHQgKSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXG5cdFx0XHQvLyBQcmVjb21waWxlZCBtYXRjaGVycyB3aWxsIHN0aWxsIHZlcmlmeSBhbmNlc3RyeSwgc28gc3RlcCB1cCBhIGxldmVsXG5cdFx0XHR9IGVsc2UgaWYgKCBjb21waWxlZCApIHtcblx0XHRcdFx0Y29udGV4dCA9IGNvbnRleHQucGFyZW50Tm9kZTtcblx0XHRcdH1cblxuXHRcdFx0c2VsZWN0b3IgPSBzZWxlY3Rvci5zbGljZSggdG9rZW5zLnNoaWZ0KCkudmFsdWUubGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0Ly8gRmV0Y2ggYSBzZWVkIHNldCBmb3IgcmlnaHQtdG8tbGVmdCBtYXRjaGluZ1xuXHRcdGkgPSBtYXRjaEV4cHJbXCJuZWVkc0NvbnRleHRcIl0udGVzdCggc2VsZWN0b3IgKSA/IDAgOiB0b2tlbnMubGVuZ3RoO1xuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0dG9rZW4gPSB0b2tlbnNbaV07XG5cblx0XHRcdC8vIEFib3J0IGlmIHdlIGhpdCBhIGNvbWJpbmF0b3Jcblx0XHRcdGlmICggRXhwci5yZWxhdGl2ZVsgKHR5cGUgPSB0b2tlbi50eXBlKSBdICkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICggKGZpbmQgPSBFeHByLmZpbmRbIHR5cGUgXSkgKSB7XG5cdFx0XHRcdC8vIFNlYXJjaCwgZXhwYW5kaW5nIGNvbnRleHQgZm9yIGxlYWRpbmcgc2libGluZyBjb21iaW5hdG9yc1xuXHRcdFx0XHRpZiAoIChzZWVkID0gZmluZChcblx0XHRcdFx0XHR0b2tlbi5tYXRjaGVzWzBdLnJlcGxhY2UoIHJ1bmVzY2FwZSwgZnVuZXNjYXBlICksXG5cdFx0XHRcdFx0cnNpYmxpbmcudGVzdCggdG9rZW5zWzBdLnR5cGUgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHwgY29udGV4dFxuXHRcdFx0XHQpKSApIHtcblxuXHRcdFx0XHRcdC8vIElmIHNlZWQgaXMgZW1wdHkgb3Igbm8gdG9rZW5zIHJlbWFpbiwgd2UgY2FuIHJldHVybiBlYXJseVxuXHRcdFx0XHRcdHRva2Vucy5zcGxpY2UoIGksIDEgKTtcblx0XHRcdFx0XHRzZWxlY3RvciA9IHNlZWQubGVuZ3RoICYmIHRvU2VsZWN0b3IoIHRva2VucyApO1xuXHRcdFx0XHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgc2VlZCApO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBDb21waWxlIGFuZCBleGVjdXRlIGEgZmlsdGVyaW5nIGZ1bmN0aW9uIGlmIG9uZSBpcyBub3QgcHJvdmlkZWRcblx0Ly8gUHJvdmlkZSBgbWF0Y2hgIHRvIGF2b2lkIHJldG9rZW5pemF0aW9uIGlmIHdlIG1vZGlmaWVkIHRoZSBzZWxlY3RvciBhYm92ZVxuXHQoIGNvbXBpbGVkIHx8IGNvbXBpbGUoIHNlbGVjdG9yLCBtYXRjaCApICkoXG5cdFx0c2VlZCxcblx0XHRjb250ZXh0LFxuXHRcdCFkb2N1bWVudElzSFRNTCxcblx0XHRyZXN1bHRzLFxuXHRcdCFjb250ZXh0IHx8IHJzaWJsaW5nLnRlc3QoIHNlbGVjdG9yICkgJiYgdGVzdENvbnRleHQoIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHRcblx0KTtcblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG4vLyBPbmUtdGltZSBhc3NpZ25tZW50c1xuXG4vLyBTb3J0IHN0YWJpbGl0eVxuc3VwcG9ydC5zb3J0U3RhYmxlID0gZXhwYW5kby5zcGxpdChcIlwiKS5zb3J0KCBzb3J0T3JkZXIgKS5qb2luKFwiXCIpID09PSBleHBhbmRvO1xuXG4vLyBTdXBwb3J0OiBDaHJvbWUgMTQtMzUrXG4vLyBBbHdheXMgYXNzdW1lIGR1cGxpY2F0ZXMgaWYgdGhleSBhcmVuJ3QgcGFzc2VkIHRvIHRoZSBjb21wYXJpc29uIGZ1bmN0aW9uXG5zdXBwb3J0LmRldGVjdER1cGxpY2F0ZXMgPSAhIWhhc0R1cGxpY2F0ZTtcblxuLy8gSW5pdGlhbGl6ZSBhZ2FpbnN0IHRoZSBkZWZhdWx0IGRvY3VtZW50XG5zZXREb2N1bWVudCgpO1xuXG4vLyBTdXBwb3J0OiBXZWJraXQ8NTM3LjMyIC0gU2FmYXJpIDYuMC4zL0Nocm9tZSAyNSAoZml4ZWQgaW4gQ2hyb21lIDI3KVxuLy8gRGV0YWNoZWQgbm9kZXMgY29uZm91bmRpbmdseSBmb2xsb3cgKmVhY2ggb3RoZXIqXG5zdXBwb3J0LnNvcnREZXRhY2hlZCA9IGFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdC8vIFNob3VsZCByZXR1cm4gMSwgYnV0IHJldHVybnMgNCAoZm9sbG93aW5nKVxuXHRyZXR1cm4gZWwuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKSApICYgMTtcbn0pO1xuXG4vLyBTdXBwb3J0OiBJRTw4XG4vLyBQcmV2ZW50IGF0dHJpYnV0ZS9wcm9wZXJ0eSBcImludGVycG9sYXRpb25cIlxuLy8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzNjQyOSUyOFZTLjg1JTI5LmFzcHhcbmlmICggIWFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdGVsLmlubmVySFRNTCA9IFwiPGEgaHJlZj0nIyc+PC9hPlwiO1xuXHRyZXR1cm4gZWwuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpID09PSBcIiNcIiA7XG59KSApIHtcblx0YWRkSGFuZGxlKCBcInR5cGV8aHJlZnxoZWlnaHR8d2lkdGhcIiwgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdGlmICggIWlzWE1MICkge1xuXHRcdFx0cmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lLCBuYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwidHlwZVwiID8gMSA6IDIgKTtcblx0XHR9XG5cdH0pO1xufVxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBVc2UgZGVmYXVsdFZhbHVlIGluIHBsYWNlIG9mIGdldEF0dHJpYnV0ZShcInZhbHVlXCIpXG5pZiAoICFzdXBwb3J0LmF0dHJpYnV0ZXMgfHwgIWFzc2VydChmdW5jdGlvbiggZWwgKSB7XG5cdGVsLmlubmVySFRNTCA9IFwiPGlucHV0Lz5cIjtcblx0ZWwuZmlyc3RDaGlsZC5zZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiwgXCJcIiApO1xuXHRyZXR1cm4gZWwuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiApID09PSBcIlwiO1xufSkgKSB7XG5cdGFkZEhhbmRsZSggXCJ2YWx1ZVwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0aWYgKCAhaXNYTUwgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gU3VwcG9ydDogSUU8OVxuLy8gVXNlIGdldEF0dHJpYnV0ZU5vZGUgdG8gZmV0Y2ggYm9vbGVhbnMgd2hlbiBnZXRBdHRyaWJ1dGUgbGllc1xuaWYgKCAhYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0cmV0dXJuIGVsLmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpID09IG51bGw7XG59KSApIHtcblx0YWRkSGFuZGxlKCBib29sZWFucywgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdHZhciB2YWw7XG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbVsgbmFtZSBdID09PSB0cnVlID8gbmFtZS50b0xvd2VyQ2FzZSgpIDpcblx0XHRcdFx0XHQodmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKCBuYW1lICkpICYmIHZhbC5zcGVjaWZpZWQgP1xuXHRcdFx0XHRcdHZhbC52YWx1ZSA6XG5cdFx0XHRcdG51bGw7XG5cdFx0fVxuXHR9KTtcbn1cblxucmV0dXJuIFNpenpsZTtcblxufSkoIHdpbmRvdyApO1xuXG5cblxualF1ZXJ5LmZpbmQgPSBTaXp6bGU7XG5qUXVlcnkuZXhwciA9IFNpenpsZS5zZWxlY3RvcnM7XG5cbi8vIERlcHJlY2F0ZWRcbmpRdWVyeS5leHByWyBcIjpcIiBdID0galF1ZXJ5LmV4cHIucHNldWRvcztcbmpRdWVyeS51bmlxdWVTb3J0ID0galF1ZXJ5LnVuaXF1ZSA9IFNpenpsZS51bmlxdWVTb3J0O1xualF1ZXJ5LnRleHQgPSBTaXp6bGUuZ2V0VGV4dDtcbmpRdWVyeS5pc1hNTERvYyA9IFNpenpsZS5pc1hNTDtcbmpRdWVyeS5jb250YWlucyA9IFNpenpsZS5jb250YWlucztcbmpRdWVyeS5lc2NhcGVTZWxlY3RvciA9IFNpenpsZS5lc2NhcGU7XG5cblxuXG5cbnZhciBkaXIgPSBmdW5jdGlvbiggZWxlbSwgZGlyLCB1bnRpbCApIHtcblx0dmFyIG1hdGNoZWQgPSBbXSxcblx0XHR0cnVuY2F0ZSA9IHVudGlsICE9PSB1bmRlZmluZWQ7XG5cblx0d2hpbGUgKCAoIGVsZW0gPSBlbGVtWyBkaXIgXSApICYmIGVsZW0ubm9kZVR5cGUgIT09IDkgKSB7XG5cdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0aWYgKCB0cnVuY2F0ZSAmJiBqUXVlcnkoIGVsZW0gKS5pcyggdW50aWwgKSApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRtYXRjaGVkLnB1c2goIGVsZW0gKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG1hdGNoZWQ7XG59O1xuXG5cbnZhciBzaWJsaW5ncyA9IGZ1bmN0aW9uKCBuLCBlbGVtICkge1xuXHR2YXIgbWF0Y2hlZCA9IFtdO1xuXG5cdGZvciAoIDsgbjsgbiA9IG4ubmV4dFNpYmxpbmcgKSB7XG5cdFx0aWYgKCBuLm5vZGVUeXBlID09PSAxICYmIG4gIT09IGVsZW0gKSB7XG5cdFx0XHRtYXRjaGVkLnB1c2goIG4gKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbWF0Y2hlZDtcbn07XG5cblxudmFyIHJuZWVkc0NvbnRleHQgPSBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQ7XG5cbnZhciByc2luZ2xlVGFnID0gKCAvXjwoW2Etel1bXlxcL1xcMD46XFx4MjBcXHRcXHJcXG5cXGZdKilbXFx4MjBcXHRcXHJcXG5cXGZdKlxcLz8+KD86PFxcL1xcMT58KSQvaSApO1xuXG5cblxudmFyIHJpc1NpbXBsZSA9IC9eLlteOiNcXFtcXC4sXSokLztcblxuLy8gSW1wbGVtZW50IHRoZSBpZGVudGljYWwgZnVuY3Rpb25hbGl0eSBmb3IgZmlsdGVyIGFuZCBub3RcbmZ1bmN0aW9uIHdpbm5vdyggZWxlbWVudHMsIHF1YWxpZmllciwgbm90ICkge1xuXHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBxdWFsaWZpZXIgKSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdHJldHVybiAhIXF1YWxpZmllci5jYWxsKCBlbGVtLCBpLCBlbGVtICkgIT09IG5vdDtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBTaW5nbGUgZWxlbWVudFxuXHRpZiAoIHF1YWxpZmllci5ub2RlVHlwZSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAoIGVsZW0gPT09IHF1YWxpZmllciApICE9PSBub3Q7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gQXJyYXlsaWtlIG9mIGVsZW1lbnRzIChqUXVlcnksIGFyZ3VtZW50cywgQXJyYXkpXG5cdGlmICggdHlwZW9mIHF1YWxpZmllciAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiAoIGluZGV4T2YuY2FsbCggcXVhbGlmaWVyLCBlbGVtICkgPiAtMSApICE9PSBub3Q7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gU2ltcGxlIHNlbGVjdG9yIHRoYXQgY2FuIGJlIGZpbHRlcmVkIGRpcmVjdGx5LCByZW1vdmluZyBub24tRWxlbWVudHNcblx0aWYgKCByaXNTaW1wbGUudGVzdCggcXVhbGlmaWVyICkgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5maWx0ZXIoIHF1YWxpZmllciwgZWxlbWVudHMsIG5vdCApO1xuXHR9XG5cblx0Ly8gQ29tcGxleCBzZWxlY3RvciwgY29tcGFyZSB0aGUgdHdvIHNldHMsIHJlbW92aW5nIG5vbi1FbGVtZW50c1xuXHRxdWFsaWZpZXIgPSBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzICk7XG5cdHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiAoIGluZGV4T2YuY2FsbCggcXVhbGlmaWVyLCBlbGVtICkgPiAtMSApICE9PSBub3QgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMTtcblx0fSApO1xufVxuXG5qUXVlcnkuZmlsdGVyID0gZnVuY3Rpb24oIGV4cHIsIGVsZW1zLCBub3QgKSB7XG5cdHZhciBlbGVtID0gZWxlbXNbIDAgXTtcblxuXHRpZiAoIG5vdCApIHtcblx0XHRleHByID0gXCI6bm90KFwiICsgZXhwciArIFwiKVwiO1xuXHR9XG5cblx0aWYgKCBlbGVtcy5sZW5ndGggPT09IDEgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBleHByICkgPyBbIGVsZW0gXSA6IFtdO1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeS5maW5kLm1hdGNoZXMoIGV4cHIsIGpRdWVyeS5ncmVwKCBlbGVtcywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGVsZW0ubm9kZVR5cGUgPT09IDE7XG5cdH0gKSApO1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRmaW5kOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGksIHJldCxcblx0XHRcdGxlbiA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5KCBzZWxlY3RvciApLmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdFx0aWYgKCBqUXVlcnkuY29udGFpbnMoIHNlbGZbIGkgXSwgdGhpcyApICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9ICkgKTtcblx0XHR9XG5cblx0XHRyZXQgPSB0aGlzLnB1c2hTdGFjayggW10gKTtcblxuXHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRqUXVlcnkuZmluZCggc2VsZWN0b3IsIHNlbGZbIGkgXSwgcmV0ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGxlbiA+IDEgPyBqUXVlcnkudW5pcXVlU29ydCggcmV0ICkgOiByZXQ7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggd2lubm93KCB0aGlzLCBzZWxlY3RvciB8fCBbXSwgZmFsc2UgKSApO1xuXHR9LFxuXHRub3Q6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyggdGhpcywgc2VsZWN0b3IgfHwgW10sIHRydWUgKSApO1xuXHR9LFxuXHRpczogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiAhIXdpbm5vdyhcblx0XHRcdHRoaXMsXG5cblx0XHRcdC8vIElmIHRoaXMgaXMgYSBwb3NpdGlvbmFsL3JlbGF0aXZlIHNlbGVjdG9yLCBjaGVjayBtZW1iZXJzaGlwIGluIHRoZSByZXR1cm5lZCBzZXRcblx0XHRcdC8vIHNvICQoXCJwOmZpcnN0XCIpLmlzKFwicDpsYXN0XCIpIHdvbid0IHJldHVybiB0cnVlIGZvciBhIGRvYyB3aXRoIHR3byBcInBcIi5cblx0XHRcdHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiAmJiBybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9yICkgP1xuXHRcdFx0XHRqUXVlcnkoIHNlbGVjdG9yICkgOlxuXHRcdFx0XHRzZWxlY3RvciB8fCBbXSxcblx0XHRcdGZhbHNlXG5cdFx0KS5sZW5ndGg7XG5cdH1cbn0gKTtcblxuXG4vLyBJbml0aWFsaXplIGEgalF1ZXJ5IG9iamVjdFxuXG5cbi8vIEEgY2VudHJhbCByZWZlcmVuY2UgdG8gdGhlIHJvb3QgalF1ZXJ5KGRvY3VtZW50KVxudmFyIHJvb3RqUXVlcnksXG5cblx0Ly8gQSBzaW1wbGUgd2F5IHRvIGNoZWNrIGZvciBIVE1MIHN0cmluZ3Ncblx0Ly8gUHJpb3JpdGl6ZSAjaWQgb3ZlciA8dGFnPiB0byBhdm9pZCBYU1MgdmlhIGxvY2F0aW9uLmhhc2ggKCM5NTIxKVxuXHQvLyBTdHJpY3QgSFRNTCByZWNvZ25pdGlvbiAoIzExMjkwOiBtdXN0IHN0YXJ0IHdpdGggPClcblx0Ly8gU2hvcnRjdXQgc2ltcGxlICNpZCBjYXNlIGZvciBzcGVlZFxuXHRycXVpY2tFeHByID0gL14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qfCMoW1xcdy1dKykpJC8sXG5cblx0aW5pdCA9IGpRdWVyeS5mbi5pbml0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByb290ICkge1xuXHRcdHZhciBtYXRjaCwgZWxlbTtcblxuXHRcdC8vIEhBTkRMRTogJChcIlwiKSwgJChudWxsKSwgJCh1bmRlZmluZWQpLCAkKGZhbHNlKVxuXHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0Ly8gTWV0aG9kIGluaXQoKSBhY2NlcHRzIGFuIGFsdGVybmF0ZSByb290alF1ZXJ5XG5cdFx0Ly8gc28gbWlncmF0ZSBjYW4gc3VwcG9ydCBqUXVlcnkuc3ViIChnaC0yMTAxKVxuXHRcdHJvb3QgPSByb290IHx8IHJvb3RqUXVlcnk7XG5cblx0XHQvLyBIYW5kbGUgSFRNTCBzdHJpbmdzXG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRpZiAoIHNlbGVjdG9yWyAwIF0gPT09IFwiPFwiICYmXG5cdFx0XHRcdHNlbGVjdG9yWyBzZWxlY3Rvci5sZW5ndGggLSAxIF0gPT09IFwiPlwiICYmXG5cdFx0XHRcdHNlbGVjdG9yLmxlbmd0aCA+PSAzICkge1xuXG5cdFx0XHRcdC8vIEFzc3VtZSB0aGF0IHN0cmluZ3MgdGhhdCBzdGFydCBhbmQgZW5kIHdpdGggPD4gYXJlIEhUTUwgYW5kIHNraXAgdGhlIHJlZ2V4IGNoZWNrXG5cdFx0XHRcdG1hdGNoID0gWyBudWxsLCBzZWxlY3RvciwgbnVsbCBdO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWF0Y2ggaHRtbCBvciBtYWtlIHN1cmUgbm8gY29udGV4dCBpcyBzcGVjaWZpZWQgZm9yICNpZFxuXHRcdFx0aWYgKCBtYXRjaCAmJiAoIG1hdGNoWyAxIF0gfHwgIWNvbnRleHQgKSApIHtcblxuXHRcdFx0XHQvLyBIQU5ETEU6ICQoaHRtbCkgLT4gJChhcnJheSlcblx0XHRcdFx0aWYgKCBtYXRjaFsgMSBdICkge1xuXHRcdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0IGluc3RhbmNlb2YgalF1ZXJ5ID8gY29udGV4dFsgMCBdIDogY29udGV4dDtcblxuXHRcdFx0XHRcdC8vIE9wdGlvbiB0byBydW4gc2NyaXB0cyBpcyB0cnVlIGZvciBiYWNrLWNvbXBhdFxuXHRcdFx0XHRcdC8vIEludGVudGlvbmFsbHkgbGV0IHRoZSBlcnJvciBiZSB0aHJvd24gaWYgcGFyc2VIVE1MIGlzIG5vdCBwcmVzZW50XG5cdFx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCB0aGlzLCBqUXVlcnkucGFyc2VIVE1MKFxuXHRcdFx0XHRcdFx0bWF0Y2hbIDEgXSxcblx0XHRcdFx0XHRcdGNvbnRleHQgJiYgY29udGV4dC5ub2RlVHlwZSA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogZG9jdW1lbnQsXG5cdFx0XHRcdFx0XHR0cnVlXG5cdFx0XHRcdFx0KSApO1xuXG5cdFx0XHRcdFx0Ly8gSEFORExFOiAkKGh0bWwsIHByb3BzKVxuXHRcdFx0XHRcdGlmICggcnNpbmdsZVRhZy50ZXN0KCBtYXRjaFsgMSBdICkgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvbnRleHQgKSApIHtcblx0XHRcdFx0XHRcdGZvciAoIG1hdGNoIGluIGNvbnRleHQgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gUHJvcGVydGllcyBvZiBjb250ZXh0IGFyZSBjYWxsZWQgYXMgbWV0aG9kcyBpZiBwb3NzaWJsZVxuXHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB0aGlzWyBtYXRjaCBdICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpc1sgbWF0Y2ggXSggY29udGV4dFsgbWF0Y2ggXSApO1xuXG5cdFx0XHRcdFx0XHRcdC8vIC4uLmFuZCBvdGhlcndpc2Ugc2V0IGFzIGF0dHJpYnV0ZXNcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmF0dHIoIG1hdGNoLCBjb250ZXh0WyBtYXRjaCBdICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0XHQvLyBIQU5ETEU6ICQoI2lkKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggbWF0Y2hbIDIgXSApO1xuXG5cdFx0XHRcdFx0aWYgKCBlbGVtICkge1xuXG5cdFx0XHRcdFx0XHQvLyBJbmplY3QgdGhlIGVsZW1lbnQgZGlyZWN0bHkgaW50byB0aGUgalF1ZXJ5IG9iamVjdFxuXHRcdFx0XHRcdFx0dGhpc1sgMCBdID0gZWxlbTtcblx0XHRcdFx0XHRcdHRoaXMubGVuZ3RoID0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gSEFORExFOiAkKGV4cHIsICQoLi4uKSlcblx0XHRcdH0gZWxzZSBpZiAoICFjb250ZXh0IHx8IGNvbnRleHQuanF1ZXJ5ICkge1xuXHRcdFx0XHRyZXR1cm4gKCBjb250ZXh0IHx8IHJvb3QgKS5maW5kKCBzZWxlY3RvciApO1xuXG5cdFx0XHQvLyBIQU5ETEU6ICQoZXhwciwgY29udGV4dClcblx0XHRcdC8vICh3aGljaCBpcyBqdXN0IGVxdWl2YWxlbnQgdG86ICQoY29udGV4dCkuZmluZChleHByKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IoIGNvbnRleHQgKS5maW5kKCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXG5cdFx0Ly8gSEFORExFOiAkKERPTUVsZW1lbnQpXG5cdFx0fSBlbHNlIGlmICggc2VsZWN0b3Iubm9kZVR5cGUgKSB7XG5cdFx0XHR0aGlzWyAwIF0gPSBzZWxlY3Rvcjtcblx0XHRcdHRoaXMubGVuZ3RoID0gMTtcblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0Ly8gSEFORExFOiAkKGZ1bmN0aW9uKVxuXHRcdC8vIFNob3J0Y3V0IGZvciBkb2N1bWVudCByZWFkeVxuXHRcdH0gZWxzZSBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBzZWxlY3RvciApICkge1xuXHRcdFx0cmV0dXJuIHJvb3QucmVhZHkgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdHJvb3QucmVhZHkoIHNlbGVjdG9yICkgOlxuXG5cdFx0XHRcdC8vIEV4ZWN1dGUgaW1tZWRpYXRlbHkgaWYgcmVhZHkgaXMgbm90IHByZXNlbnRcblx0XHRcdFx0c2VsZWN0b3IoIGpRdWVyeSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBqUXVlcnkubWFrZUFycmF5KCBzZWxlY3RvciwgdGhpcyApO1xuXHR9O1xuXG4vLyBHaXZlIHRoZSBpbml0IGZ1bmN0aW9uIHRoZSBqUXVlcnkgcHJvdG90eXBlIGZvciBsYXRlciBpbnN0YW50aWF0aW9uXG5pbml0LnByb3RvdHlwZSA9IGpRdWVyeS5mbjtcblxuLy8gSW5pdGlhbGl6ZSBjZW50cmFsIHJlZmVyZW5jZVxucm9vdGpRdWVyeSA9IGpRdWVyeSggZG9jdW1lbnQgKTtcblxuXG52YXIgcnBhcmVudHNwcmV2ID0gL14oPzpwYXJlbnRzfHByZXYoPzpVbnRpbHxBbGwpKS8sXG5cblx0Ly8gTWV0aG9kcyBndWFyYW50ZWVkIHRvIHByb2R1Y2UgYSB1bmlxdWUgc2V0IHdoZW4gc3RhcnRpbmcgZnJvbSBhIHVuaXF1ZSBzZXRcblx0Z3VhcmFudGVlZFVuaXF1ZSA9IHtcblx0XHRjaGlsZHJlbjogdHJ1ZSxcblx0XHRjb250ZW50czogdHJ1ZSxcblx0XHRuZXh0OiB0cnVlLFxuXHRcdHByZXY6IHRydWVcblx0fTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRoYXM6IGZ1bmN0aW9uKCB0YXJnZXQgKSB7XG5cdFx0dmFyIHRhcmdldHMgPSBqUXVlcnkoIHRhcmdldCwgdGhpcyApLFxuXHRcdFx0bCA9IHRhcmdldHMubGVuZ3RoO1xuXG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpID0gMDtcblx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBqUXVlcnkuY29udGFpbnMoIHRoaXMsIHRhcmdldHNbIGkgXSApICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGNsb3Nlc3Q6IGZ1bmN0aW9uKCBzZWxlY3RvcnMsIGNvbnRleHQgKSB7XG5cdFx0dmFyIGN1cixcblx0XHRcdGkgPSAwLFxuXHRcdFx0bCA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0bWF0Y2hlZCA9IFtdLFxuXHRcdFx0dGFyZ2V0cyA9IHR5cGVvZiBzZWxlY3RvcnMgIT09IFwic3RyaW5nXCIgJiYgalF1ZXJ5KCBzZWxlY3RvcnMgKTtcblxuXHRcdC8vIFBvc2l0aW9uYWwgc2VsZWN0b3JzIG5ldmVyIG1hdGNoLCBzaW5jZSB0aGVyZSdzIG5vIF9zZWxlY3Rpb25fIGNvbnRleHRcblx0XHRpZiAoICFybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9ycyApICkge1xuXHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRmb3IgKCBjdXIgPSB0aGlzWyBpIF07IGN1ciAmJiBjdXIgIT09IGNvbnRleHQ7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuXG5cdFx0XHRcdFx0Ly8gQWx3YXlzIHNraXAgZG9jdW1lbnQgZnJhZ21lbnRzXG5cdFx0XHRcdFx0aWYgKCBjdXIubm9kZVR5cGUgPCAxMSAmJiAoIHRhcmdldHMgP1xuXHRcdFx0XHRcdFx0dGFyZ2V0cy5pbmRleCggY3VyICkgPiAtMSA6XG5cblx0XHRcdFx0XHRcdC8vIERvbid0IHBhc3Mgbm9uLWVsZW1lbnRzIHRvIFNpenpsZVxuXHRcdFx0XHRcdFx0Y3VyLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggY3VyLCBzZWxlY3RvcnMgKSApICkge1xuXG5cdFx0XHRcdFx0XHRtYXRjaGVkLnB1c2goIGN1ciApO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBtYXRjaGVkLmxlbmd0aCA+IDEgPyBqUXVlcnkudW5pcXVlU29ydCggbWF0Y2hlZCApIDogbWF0Y2hlZCApO1xuXHR9LFxuXG5cdC8vIERldGVybWluZSB0aGUgcG9zaXRpb24gb2YgYW4gZWxlbWVudCB3aXRoaW4gdGhlIHNldFxuXHRpbmRleDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHQvLyBObyBhcmd1bWVudCwgcmV0dXJuIGluZGV4IGluIHBhcmVudFxuXHRcdGlmICggIWVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCB0aGlzWyAwIF0gJiYgdGhpc1sgMCBdLnBhcmVudE5vZGUgKSA/IHRoaXMuZmlyc3QoKS5wcmV2QWxsKCkubGVuZ3RoIDogLTE7XG5cdFx0fVxuXG5cdFx0Ly8gSW5kZXggaW4gc2VsZWN0b3Jcblx0XHRpZiAoIHR5cGVvZiBlbGVtID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIGluZGV4T2YuY2FsbCggalF1ZXJ5KCBlbGVtICksIHRoaXNbIDAgXSApO1xuXHRcdH1cblxuXHRcdC8vIExvY2F0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGRlc2lyZWQgZWxlbWVudFxuXHRcdHJldHVybiBpbmRleE9mLmNhbGwoIHRoaXMsXG5cblx0XHRcdC8vIElmIGl0IHJlY2VpdmVzIGEgalF1ZXJ5IG9iamVjdCwgdGhlIGZpcnN0IGVsZW1lbnQgaXMgdXNlZFxuXHRcdFx0ZWxlbS5qcXVlcnkgPyBlbGVtWyAwIF0gOiBlbGVtXG5cdFx0KTtcblx0fSxcblxuXHRhZGQ6IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soXG5cdFx0XHRqUXVlcnkudW5pcXVlU29ydChcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCB0aGlzLmdldCgpLCBqUXVlcnkoIHNlbGVjdG9yLCBjb250ZXh0ICkgKVxuXHRcdFx0KVxuXHRcdCk7XG5cdH0sXG5cblx0YWRkQmFjazogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLmFkZCggc2VsZWN0b3IgPT0gbnVsbCA/XG5cdFx0XHR0aGlzLnByZXZPYmplY3QgOiB0aGlzLnByZXZPYmplY3QuZmlsdGVyKCBzZWxlY3RvciApXG5cdFx0KTtcblx0fVxufSApO1xuXG5mdW5jdGlvbiBzaWJsaW5nKCBjdXIsIGRpciApIHtcblx0d2hpbGUgKCAoIGN1ciA9IGN1clsgZGlyIF0gKSAmJiBjdXIubm9kZVR5cGUgIT09IDEgKSB7fVxuXHRyZXR1cm4gY3VyO1xufVxuXG5qUXVlcnkuZWFjaCgge1xuXHRwYXJlbnQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0cmV0dXJuIHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IDExID8gcGFyZW50IDogbnVsbDtcblx0fSxcblx0cGFyZW50czogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIgKTtcblx0fSxcblx0cGFyZW50c1VudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwYXJlbnROb2RlXCIsIHVudGlsICk7XG5cdH0sXG5cdG5leHQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5nKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcblx0fSxcblx0cHJldjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcblx0fSxcblx0bmV4dEFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG5cdH0sXG5cdHByZXZBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIgKTtcblx0fSxcblx0bmV4dFVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiLCB1bnRpbCApO1xuXHR9LFxuXHRwcmV2VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiLCB1bnRpbCApO1xuXHR9LFxuXHRzaWJsaW5nczogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmdzKCAoIGVsZW0ucGFyZW50Tm9kZSB8fCB7fSApLmZpcnN0Q2hpbGQsIGVsZW0gKTtcblx0fSxcblx0Y2hpbGRyZW46IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5ncyggZWxlbS5maXJzdENoaWxkICk7XG5cdH0sXG5cdGNvbnRlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZWxlbS5jb250ZW50RG9jdW1lbnQgfHwgalF1ZXJ5Lm1lcmdlKCBbXSwgZWxlbS5jaGlsZE5vZGVzICk7XG5cdH1cbn0sIGZ1bmN0aW9uKCBuYW1lLCBmbiApIHtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggdW50aWwsIHNlbGVjdG9yICkge1xuXHRcdHZhciBtYXRjaGVkID0galF1ZXJ5Lm1hcCggdGhpcywgZm4sIHVudGlsICk7XG5cblx0XHRpZiAoIG5hbWUuc2xpY2UoIC01ICkgIT09IFwiVW50aWxcIiApIHtcblx0XHRcdHNlbGVjdG9yID0gdW50aWw7XG5cdFx0fVxuXG5cdFx0aWYgKCBzZWxlY3RvciAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRtYXRjaGVkID0galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIG1hdGNoZWQgKTtcblx0XHR9XG5cblx0XHRpZiAoIHRoaXMubGVuZ3RoID4gMSApIHtcblxuXHRcdFx0Ly8gUmVtb3ZlIGR1cGxpY2F0ZXNcblx0XHRcdGlmICggIWd1YXJhbnRlZWRVbmlxdWVbIG5hbWUgXSApIHtcblx0XHRcdFx0alF1ZXJ5LnVuaXF1ZVNvcnQoIG1hdGNoZWQgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV2ZXJzZSBvcmRlciBmb3IgcGFyZW50cyogYW5kIHByZXYtZGVyaXZhdGl2ZXNcblx0XHRcdGlmICggcnBhcmVudHNwcmV2LnRlc3QoIG5hbWUgKSApIHtcblx0XHRcdFx0bWF0Y2hlZC5yZXZlcnNlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBtYXRjaGVkICk7XG5cdH07XG59ICk7XG52YXIgcm5vdGh0bWx3aGl0ZSA9ICggL1teXFx4MjBcXHRcXHJcXG5cXGZdKy9nICk7XG5cblxuXG4vLyBDb252ZXJ0IFN0cmluZy1mb3JtYXR0ZWQgb3B0aW9ucyBpbnRvIE9iamVjdC1mb3JtYXR0ZWQgb25lc1xuZnVuY3Rpb24gY3JlYXRlT3B0aW9ucyggb3B0aW9ucyApIHtcblx0dmFyIG9iamVjdCA9IHt9O1xuXHRqUXVlcnkuZWFjaCggb3B0aW9ucy5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdLCBmdW5jdGlvbiggXywgZmxhZyApIHtcblx0XHRvYmplY3RbIGZsYWcgXSA9IHRydWU7XG5cdH0gKTtcblx0cmV0dXJuIG9iamVjdDtcbn1cblxuLypcbiAqIENyZWF0ZSBhIGNhbGxiYWNrIGxpc3QgdXNpbmcgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICpcbiAqXHRvcHRpb25zOiBhbiBvcHRpb25hbCBsaXN0IG9mIHNwYWNlLXNlcGFyYXRlZCBvcHRpb25zIHRoYXQgd2lsbCBjaGFuZ2UgaG93XG4gKlx0XHRcdHRoZSBjYWxsYmFjayBsaXN0IGJlaGF2ZXMgb3IgYSBtb3JlIHRyYWRpdGlvbmFsIG9wdGlvbiBvYmplY3RcbiAqXG4gKiBCeSBkZWZhdWx0IGEgY2FsbGJhY2sgbGlzdCB3aWxsIGFjdCBsaWtlIGFuIGV2ZW50IGNhbGxiYWNrIGxpc3QgYW5kIGNhbiBiZVxuICogXCJmaXJlZFwiIG11bHRpcGxlIHRpbWVzLlxuICpcbiAqIFBvc3NpYmxlIG9wdGlvbnM6XG4gKlxuICpcdG9uY2U6XHRcdFx0d2lsbCBlbnN1cmUgdGhlIGNhbGxiYWNrIGxpc3QgY2FuIG9ubHkgYmUgZmlyZWQgb25jZSAobGlrZSBhIERlZmVycmVkKVxuICpcbiAqXHRtZW1vcnk6XHRcdFx0d2lsbCBrZWVwIHRyYWNrIG9mIHByZXZpb3VzIHZhbHVlcyBhbmQgd2lsbCBjYWxsIGFueSBjYWxsYmFjayBhZGRlZFxuICpcdFx0XHRcdFx0YWZ0ZXIgdGhlIGxpc3QgaGFzIGJlZW4gZmlyZWQgcmlnaHQgYXdheSB3aXRoIHRoZSBsYXRlc3QgXCJtZW1vcml6ZWRcIlxuICpcdFx0XHRcdFx0dmFsdWVzIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdHVuaXF1ZTpcdFx0XHR3aWxsIGVuc3VyZSBhIGNhbGxiYWNrIGNhbiBvbmx5IGJlIGFkZGVkIG9uY2UgKG5vIGR1cGxpY2F0ZSBpbiB0aGUgbGlzdClcbiAqXG4gKlx0c3RvcE9uRmFsc2U6XHRpbnRlcnJ1cHQgY2FsbGluZ3Mgd2hlbiBhIGNhbGxiYWNrIHJldHVybnMgZmFsc2VcbiAqXG4gKi9cbmpRdWVyeS5DYWxsYmFja3MgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcblxuXHQvLyBDb252ZXJ0IG9wdGlvbnMgZnJvbSBTdHJpbmctZm9ybWF0dGVkIHRvIE9iamVjdC1mb3JtYXR0ZWQgaWYgbmVlZGVkXG5cdC8vICh3ZSBjaGVjayBpbiBjYWNoZSBmaXJzdClcblx0b3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiID9cblx0XHRjcmVhdGVPcHRpb25zKCBvcHRpb25zICkgOlxuXHRcdGpRdWVyeS5leHRlbmQoIHt9LCBvcHRpb25zICk7XG5cblx0dmFyIC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IGlzIGN1cnJlbnRseSBmaXJpbmdcblx0XHRmaXJpbmcsXG5cblx0XHQvLyBMYXN0IGZpcmUgdmFsdWUgZm9yIG5vbi1mb3JnZXR0YWJsZSBsaXN0c1xuXHRcdG1lbW9yeSxcblxuXHRcdC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IHdhcyBhbHJlYWR5IGZpcmVkXG5cdFx0ZmlyZWQsXG5cblx0XHQvLyBGbGFnIHRvIHByZXZlbnQgZmlyaW5nXG5cdFx0bG9ja2VkLFxuXG5cdFx0Ly8gQWN0dWFsIGNhbGxiYWNrIGxpc3Rcblx0XHRsaXN0ID0gW10sXG5cblx0XHQvLyBRdWV1ZSBvZiBleGVjdXRpb24gZGF0YSBmb3IgcmVwZWF0YWJsZSBsaXN0c1xuXHRcdHF1ZXVlID0gW10sXG5cblx0XHQvLyBJbmRleCBvZiBjdXJyZW50bHkgZmlyaW5nIGNhbGxiYWNrIChtb2RpZmllZCBieSBhZGQvcmVtb3ZlIGFzIG5lZWRlZClcblx0XHRmaXJpbmdJbmRleCA9IC0xLFxuXG5cdFx0Ly8gRmlyZSBjYWxsYmFja3Ncblx0XHRmaXJlID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIEVuZm9yY2Ugc2luZ2xlLWZpcmluZ1xuXHRcdFx0bG9ja2VkID0gb3B0aW9ucy5vbmNlO1xuXG5cdFx0XHQvLyBFeGVjdXRlIGNhbGxiYWNrcyBmb3IgYWxsIHBlbmRpbmcgZXhlY3V0aW9ucyxcblx0XHRcdC8vIHJlc3BlY3RpbmcgZmlyaW5nSW5kZXggb3ZlcnJpZGVzIGFuZCBydW50aW1lIGNoYW5nZXNcblx0XHRcdGZpcmVkID0gZmlyaW5nID0gdHJ1ZTtcblx0XHRcdGZvciAoIDsgcXVldWUubGVuZ3RoOyBmaXJpbmdJbmRleCA9IC0xICkge1xuXHRcdFx0XHRtZW1vcnkgPSBxdWV1ZS5zaGlmdCgpO1xuXHRcdFx0XHR3aGlsZSAoICsrZmlyaW5nSW5kZXggPCBsaXN0Lmxlbmd0aCApIHtcblxuXHRcdFx0XHRcdC8vIFJ1biBjYWxsYmFjayBhbmQgY2hlY2sgZm9yIGVhcmx5IHRlcm1pbmF0aW9uXG5cdFx0XHRcdFx0aWYgKCBsaXN0WyBmaXJpbmdJbmRleCBdLmFwcGx5KCBtZW1vcnlbIDAgXSwgbWVtb3J5WyAxIF0gKSA9PT0gZmFsc2UgJiZcblx0XHRcdFx0XHRcdG9wdGlvbnMuc3RvcE9uRmFsc2UgKSB7XG5cblx0XHRcdFx0XHRcdC8vIEp1bXAgdG8gZW5kIGFuZCBmb3JnZXQgdGhlIGRhdGEgc28gLmFkZCBkb2Vzbid0IHJlLWZpcmVcblx0XHRcdFx0XHRcdGZpcmluZ0luZGV4ID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0XHRtZW1vcnkgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yZ2V0IHRoZSBkYXRhIGlmIHdlJ3JlIGRvbmUgd2l0aCBpdFxuXHRcdFx0aWYgKCAhb3B0aW9ucy5tZW1vcnkgKSB7XG5cdFx0XHRcdG1lbW9yeSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRmaXJpbmcgPSBmYWxzZTtcblxuXHRcdFx0Ly8gQ2xlYW4gdXAgaWYgd2UncmUgZG9uZSBmaXJpbmcgZm9yIGdvb2Rcblx0XHRcdGlmICggbG9ja2VkICkge1xuXG5cdFx0XHRcdC8vIEtlZXAgYW4gZW1wdHkgbGlzdCBpZiB3ZSBoYXZlIGRhdGEgZm9yIGZ1dHVyZSBhZGQgY2FsbHNcblx0XHRcdFx0aWYgKCBtZW1vcnkgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IFtdO1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSwgdGhpcyBvYmplY3QgaXMgc3BlbnRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsaXN0ID0gXCJcIjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBBY3R1YWwgQ2FsbGJhY2tzIG9iamVjdFxuXHRcdHNlbGYgPSB7XG5cblx0XHRcdC8vIEFkZCBhIGNhbGxiYWNrIG9yIGEgY29sbGVjdGlvbiBvZiBjYWxsYmFja3MgdG8gdGhlIGxpc3Rcblx0XHRcdGFkZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggbGlzdCApIHtcblxuXHRcdFx0XHRcdC8vIElmIHdlIGhhdmUgbWVtb3J5IGZyb20gYSBwYXN0IHJ1biwgd2Ugc2hvdWxkIGZpcmUgYWZ0ZXIgYWRkaW5nXG5cdFx0XHRcdFx0aWYgKCBtZW1vcnkgJiYgIWZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmluZ0luZGV4ID0gbGlzdC5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0cXVldWUucHVzaCggbWVtb3J5ICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0KCBmdW5jdGlvbiBhZGQoIGFyZ3MgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZWFjaCggYXJncywgZnVuY3Rpb24oIF8sIGFyZyApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggYXJnICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCAhb3B0aW9ucy51bmlxdWUgfHwgIXNlbGYuaGFzKCBhcmcgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBhcmcgJiYgYXJnLmxlbmd0aCAmJiBqUXVlcnkudHlwZSggYXJnICkgIT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBJbnNwZWN0IHJlY3Vyc2l2ZWx5XG5cdFx0XHRcdFx0XHRcdFx0YWRkKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdH0gKSggYXJndW1lbnRzICk7XG5cblx0XHRcdFx0XHRpZiAoIG1lbW9yeSAmJiAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIFJlbW92ZSBhIGNhbGxiYWNrIGZyb20gdGhlIGxpc3Rcblx0XHRcdHJlbW92ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGpRdWVyeS5lYWNoKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG5cdFx0XHRcdFx0dmFyIGluZGV4O1xuXHRcdFx0XHRcdHdoaWxlICggKCBpbmRleCA9IGpRdWVyeS5pbkFycmF5KCBhcmcsIGxpc3QsIGluZGV4ICkgKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0bGlzdC5zcGxpY2UoIGluZGV4LCAxICk7XG5cblx0XHRcdFx0XHRcdC8vIEhhbmRsZSBmaXJpbmcgaW5kZXhlc1xuXHRcdFx0XHRcdFx0aWYgKCBpbmRleCA8PSBmaXJpbmdJbmRleCApIHtcblx0XHRcdFx0XHRcdFx0ZmlyaW5nSW5kZXgtLTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDaGVjayBpZiBhIGdpdmVuIGNhbGxiYWNrIGlzIGluIHRoZSBsaXN0LlxuXHRcdFx0Ly8gSWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4sIHJldHVybiB3aGV0aGVyIG9yIG5vdCBsaXN0IGhhcyBjYWxsYmFja3MgYXR0YWNoZWQuXG5cdFx0XHRoYXM6IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRcdFx0cmV0dXJuIGZuID9cblx0XHRcdFx0XHRqUXVlcnkuaW5BcnJheSggZm4sIGxpc3QgKSA+IC0xIDpcblx0XHRcdFx0XHRsaXN0Lmxlbmd0aCA+IDA7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBSZW1vdmUgYWxsIGNhbGxiYWNrcyBmcm9tIHRoZSBsaXN0XG5cdFx0XHRlbXB0eTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggbGlzdCApIHtcblx0XHRcdFx0XHRsaXN0ID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBEaXNhYmxlIC5maXJlIGFuZCAuYWRkXG5cdFx0XHQvLyBBYm9ydCBhbnkgY3VycmVudC9wZW5kaW5nIGV4ZWN1dGlvbnNcblx0XHRcdC8vIENsZWFyIGFsbCBjYWxsYmFja3MgYW5kIHZhbHVlc1xuXHRcdFx0ZGlzYWJsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxvY2tlZCA9IHF1ZXVlID0gW107XG5cdFx0XHRcdGxpc3QgPSBtZW1vcnkgPSBcIlwiO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHRkaXNhYmxlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhbGlzdDtcblx0XHRcdH0sXG5cblx0XHRcdC8vIERpc2FibGUgLmZpcmVcblx0XHRcdC8vIEFsc28gZGlzYWJsZSAuYWRkIHVubGVzcyB3ZSBoYXZlIG1lbW9yeSAoc2luY2UgaXQgd291bGQgaGF2ZSBubyBlZmZlY3QpXG5cdFx0XHQvLyBBYm9ydCBhbnkgcGVuZGluZyBleGVjdXRpb25zXG5cdFx0XHRsb2NrOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0bG9ja2VkID0gcXVldWUgPSBbXTtcblx0XHRcdFx0aWYgKCAhbWVtb3J5ICYmICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IG1lbW9yeSA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0bG9ja2VkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICEhbG9ja2VkO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2FsbCBhbGwgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGNvbnRleHQgYW5kIGFyZ3VtZW50c1xuXHRcdFx0ZmlyZVdpdGg6IGZ1bmN0aW9uKCBjb250ZXh0LCBhcmdzICkge1xuXHRcdFx0XHRpZiAoICFsb2NrZWQgKSB7XG5cdFx0XHRcdFx0YXJncyA9IGFyZ3MgfHwgW107XG5cdFx0XHRcdFx0YXJncyA9IFsgY29udGV4dCwgYXJncy5zbGljZSA/IGFyZ3Muc2xpY2UoKSA6IGFyZ3MgXTtcblx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBhcmdzICk7XG5cdFx0XHRcdFx0aWYgKCAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIENhbGwgYWxsIHRoZSBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzXG5cdFx0XHRmaXJlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5maXJlV2l0aCggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gVG8ga25vdyBpZiB0aGUgY2FsbGJhY2tzIGhhdmUgYWxyZWFkeSBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlXG5cdFx0XHRmaXJlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhIWZpcmVkO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0cmV0dXJuIHNlbGY7XG59O1xuXG5cbmZ1bmN0aW9uIElkZW50aXR5KCB2ICkge1xuXHRyZXR1cm4gdjtcbn1cbmZ1bmN0aW9uIFRocm93ZXIoIGV4ICkge1xuXHR0aHJvdyBleDtcbn1cblxuZnVuY3Rpb24gYWRvcHRWYWx1ZSggdmFsdWUsIHJlc29sdmUsIHJlamVjdCApIHtcblx0dmFyIG1ldGhvZDtcblxuXHR0cnkge1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIHByb21pc2UgYXNwZWN0IGZpcnN0IHRvIHByaXZpbGVnZSBzeW5jaHJvbm91cyBiZWhhdmlvclxuXHRcdGlmICggdmFsdWUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oICggbWV0aG9kID0gdmFsdWUucHJvbWlzZSApICkgKSB7XG5cdFx0XHRtZXRob2QuY2FsbCggdmFsdWUgKS5kb25lKCByZXNvbHZlICkuZmFpbCggcmVqZWN0ICk7XG5cblx0XHQvLyBPdGhlciB0aGVuYWJsZXNcblx0XHR9IGVsc2UgaWYgKCB2YWx1ZSAmJiBqUXVlcnkuaXNGdW5jdGlvbiggKCBtZXRob2QgPSB2YWx1ZS50aGVuICkgKSApIHtcblx0XHRcdG1ldGhvZC5jYWxsKCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0ICk7XG5cblx0XHQvLyBPdGhlciBub24tdGhlbmFibGVzXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAgb25seVxuXHRcdFx0Ly8gU3RyaWN0IG1vZGUgZnVuY3Rpb25zIGludm9rZWQgd2l0aG91dCAuY2FsbC8uYXBwbHkgZ2V0IGdsb2JhbC1vYmplY3QgY29udGV4dFxuXHRcdFx0cmVzb2x2ZS5jYWxsKCB1bmRlZmluZWQsIHZhbHVlICk7XG5cdFx0fVxuXG5cdC8vIEZvciBQcm9taXNlcy9BKywgY29udmVydCBleGNlcHRpb25zIGludG8gcmVqZWN0aW9uc1xuXHQvLyBTaW5jZSBqUXVlcnkud2hlbiBkb2Vzbid0IHVud3JhcCB0aGVuYWJsZXMsIHdlIGNhbiBza2lwIHRoZSBleHRyYSBjaGVja3MgYXBwZWFyaW5nIGluXG5cdC8vIERlZmVycmVkI3RoZW4gdG8gY29uZGl0aW9uYWxseSBzdXBwcmVzcyByZWplY3Rpb24uXG5cdH0gY2F0Y2ggKCB2YWx1ZSApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIG9ubHlcblx0XHQvLyBTdHJpY3QgbW9kZSBmdW5jdGlvbnMgaW52b2tlZCB3aXRob3V0IC5jYWxsLy5hcHBseSBnZXQgZ2xvYmFsLW9iamVjdCBjb250ZXh0XG5cdFx0cmVqZWN0LmNhbGwoIHVuZGVmaW5lZCwgdmFsdWUgKTtcblx0fVxufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0RGVmZXJyZWQ6IGZ1bmN0aW9uKCBmdW5jICkge1xuXHRcdHZhciB0dXBsZXMgPSBbXG5cblx0XHRcdFx0Ly8gYWN0aW9uLCBhZGQgbGlzdGVuZXIsIGNhbGxiYWNrcyxcblx0XHRcdFx0Ly8gLi4uIC50aGVuIGhhbmRsZXJzLCBhcmd1bWVudCBpbmRleCwgW2ZpbmFsIHN0YXRlXVxuXHRcdFx0XHRbIFwibm90aWZ5XCIsIFwicHJvZ3Jlc3NcIiwgalF1ZXJ5LkNhbGxiYWNrcyggXCJtZW1vcnlcIiApLFxuXHRcdFx0XHRcdGpRdWVyeS5DYWxsYmFja3MoIFwibWVtb3J5XCIgKSwgMiBdLFxuXHRcdFx0XHRbIFwicmVzb2x2ZVwiLCBcImRvbmVcIiwgalF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksXG5cdFx0XHRcdFx0alF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksIDAsIFwicmVzb2x2ZWRcIiBdLFxuXHRcdFx0XHRbIFwicmVqZWN0XCIsIFwiZmFpbFwiLCBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSxcblx0XHRcdFx0XHRqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSwgMSwgXCJyZWplY3RlZFwiIF1cblx0XHRcdF0sXG5cdFx0XHRzdGF0ZSA9IFwicGVuZGluZ1wiLFxuXHRcdFx0cHJvbWlzZSA9IHtcblx0XHRcdFx0c3RhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YWx3YXlzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRkZWZlcnJlZC5kb25lKCBhcmd1bWVudHMgKS5mYWlsKCBhcmd1bWVudHMgKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJjYXRjaFwiOiBmdW5jdGlvbiggZm4gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHByb21pc2UudGhlbiggbnVsbCwgZm4gKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBLZWVwIHBpcGUgZm9yIGJhY2stY29tcGF0XG5cdFx0XHRcdHBpcGU6IGZ1bmN0aW9uKCAvKiBmbkRvbmUsIGZuRmFpbCwgZm5Qcm9ncmVzcyAqLyApIHtcblx0XHRcdFx0XHR2YXIgZm5zID0gYXJndW1lbnRzO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGpRdWVyeS5EZWZlcnJlZCggZnVuY3Rpb24oIG5ld0RlZmVyICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmVhY2goIHR1cGxlcywgZnVuY3Rpb24oIGksIHR1cGxlICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIE1hcCB0dXBsZXMgKHByb2dyZXNzLCBkb25lLCBmYWlsKSB0byBhcmd1bWVudHMgKGRvbmUsIGZhaWwsIHByb2dyZXNzKVxuXHRcdFx0XHRcdFx0XHR2YXIgZm4gPSBqUXVlcnkuaXNGdW5jdGlvbiggZm5zWyB0dXBsZVsgNCBdIF0gKSAmJiBmbnNbIHR1cGxlWyA0IF0gXTtcblxuXHRcdFx0XHRcdFx0XHQvLyBkZWZlcnJlZC5wcm9ncmVzcyhmdW5jdGlvbigpIHsgYmluZCB0byBuZXdEZWZlciBvciBuZXdEZWZlci5ub3RpZnkgfSlcblx0XHRcdFx0XHRcdFx0Ly8gZGVmZXJyZWQuZG9uZShmdW5jdGlvbigpIHsgYmluZCB0byBuZXdEZWZlciBvciBuZXdEZWZlci5yZXNvbHZlIH0pXG5cdFx0XHRcdFx0XHRcdC8vIGRlZmVycmVkLmZhaWwoZnVuY3Rpb24oKSB7IGJpbmQgdG8gbmV3RGVmZXIgb3IgbmV3RGVmZXIucmVqZWN0IH0pXG5cdFx0XHRcdFx0XHRcdGRlZmVycmVkWyB0dXBsZVsgMSBdIF0oIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciByZXR1cm5lZCA9IGZuICYmIGZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIHJldHVybmVkICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCByZXR1cm5lZC5wcm9taXNlICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5lZC5wcm9taXNlKClcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnByb2dyZXNzKCBuZXdEZWZlci5ub3RpZnkgKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQuZG9uZSggbmV3RGVmZXIucmVzb2x2ZSApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5mYWlsKCBuZXdEZWZlci5yZWplY3QgKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXJbIHR1cGxlWyAwIF0gKyBcIldpdGhcIiBdKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmbiA/IFsgcmV0dXJuZWQgXSA6IGFyZ3VtZW50c1xuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdGZucyA9IG51bGw7XG5cdFx0XHRcdFx0fSApLnByb21pc2UoKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0dGhlbjogZnVuY3Rpb24oIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBvblByb2dyZXNzICkge1xuXHRcdFx0XHRcdHZhciBtYXhEZXB0aCA9IDA7XG5cdFx0XHRcdFx0ZnVuY3Rpb24gcmVzb2x2ZSggZGVwdGgsIGRlZmVycmVkLCBoYW5kbGVyLCBzcGVjaWFsICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0XHRcdFx0XHRcdFx0YXJncyA9IGFyZ3VtZW50cyxcblx0XHRcdFx0XHRcdFx0XHRtaWdodFRocm93ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgcmV0dXJuZWQsIHRoZW47XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb24gMi4zLjMuMy4zXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC01OVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWdub3JlIGRvdWJsZS1yZXNvbHV0aW9uIGF0dGVtcHRzXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGRlcHRoIDwgbWF4RGVwdGggKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQgPSBoYW5kbGVyLmFwcGx5KCB0aGF0LCBhcmdzICk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb24gMi4zLjFcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTQ4XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHJldHVybmVkID09PSBkZWZlcnJlZC5wcm9taXNlKCkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoIFwiVGhlbmFibGUgc2VsZi1yZXNvbHV0aW9uXCIgKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbnMgMi4zLjMuMSwgMy41XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC01NFxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNzVcblx0XHRcdFx0XHRcdFx0XHRcdC8vIFJldHJpZXZlIGB0aGVuYCBvbmx5IG9uY2Vcblx0XHRcdFx0XHRcdFx0XHRcdHRoZW4gPSByZXR1cm5lZCAmJlxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb24gMi4zLjRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNjRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBjaGVjayBvYmplY3RzIGFuZCBmdW5jdGlvbnMgZm9yIHRoZW5hYmlsaXR5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCggdHlwZW9mIHJldHVybmVkID09PSBcIm9iamVjdFwiIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZW9mIHJldHVybmVkID09PSBcImZ1bmN0aW9uXCIgKSAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5lZC50aGVuO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBIYW5kbGUgYSByZXR1cm5lZCB0aGVuYWJsZVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdGhlbiApICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFNwZWNpYWwgcHJvY2Vzc29ycyAobm90aWZ5KSBqdXN0IHdhaXQgZm9yIHJlc29sdXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBzcGVjaWFsICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoZW4uY2FsbChcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBJZGVudGl0eSwgc3BlY2lhbCApLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBUaHJvd2VyLCBzcGVjaWFsIClcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIE5vcm1hbCBwcm9jZXNzb3JzIChyZXNvbHZlKSBhbHNvIGhvb2sgaW50byBwcm9ncmVzc1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gLi4uYW5kIGRpc3JlZ2FyZCBvbGRlciByZXNvbHV0aW9uIHZhbHVlc1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1heERlcHRoKys7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGVuLmNhbGwoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5lZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoIG1heERlcHRoLCBkZWZlcnJlZCwgSWRlbnRpdHksIHNwZWNpYWwgKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoIG1heERlcHRoLCBkZWZlcnJlZCwgVGhyb3dlciwgc3BlY2lhbCApLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBJZGVudGl0eSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmZXJyZWQubm90aWZ5V2l0aCApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBIYW5kbGUgYWxsIG90aGVyIHJldHVybmVkIHZhbHVlc1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBPbmx5IHN1YnN0aXR1dGUgaGFuZGxlcnMgcGFzcyBvbiBjb250ZXh0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGFuZCBtdWx0aXBsZSB2YWx1ZXMgKG5vbi1zcGVjIGJlaGF2aW9yKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGhhbmRsZXIgIT09IElkZW50aXR5ICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoYXQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJncyA9IFsgcmV0dXJuZWQgXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFByb2Nlc3MgdGhlIHZhbHVlKHMpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIERlZmF1bHQgcHJvY2VzcyBpcyByZXNvbHZlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCggc3BlY2lhbCB8fCBkZWZlcnJlZC5yZXNvbHZlV2l0aCApKCB0aGF0LCBhcmdzICk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdFx0XHRcdC8vIE9ubHkgbm9ybWFsIHByb2Nlc3NvcnMgKHJlc29sdmUpIGNhdGNoIGFuZCByZWplY3QgZXhjZXB0aW9uc1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3MgPSBzcGVjaWFsID9cblx0XHRcdFx0XHRcdFx0XHRcdG1pZ2h0VGhyb3cgOlxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWlnaHRUaHJvdygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LkRlZmVycmVkLmV4Y2VwdGlvbkhvb2sgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuRGVmZXJyZWQuZXhjZXB0aW9uSG9vayggZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzcy5zdGFja1RyYWNlICk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuMy4zLjQuMVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTYxXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWdub3JlIHBvc3QtcmVzb2x1dGlvbiBleGNlcHRpb25zXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBkZXB0aCArIDEgPj0gbWF4RGVwdGggKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIE9ubHkgc3Vic3RpdHV0ZSBoYW5kbGVycyBwYXNzIG9uIGNvbnRleHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGFuZCBtdWx0aXBsZSB2YWx1ZXMgKG5vbi1zcGVjIGJlaGF2aW9yKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBoYW5kbGVyICE9PSBUaHJvd2VyICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGF0ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhcmdzID0gWyBlIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoIHRoYXQsIGFyZ3MgKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuMy4zLjFcblx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNTdcblx0XHRcdFx0XHRcdFx0Ly8gUmUtcmVzb2x2ZSBwcm9taXNlcyBpbW1lZGlhdGVseSB0byBkb2RnZSBmYWxzZSByZWplY3Rpb24gZnJvbVxuXHRcdFx0XHRcdFx0XHQvLyBzdWJzZXF1ZW50IGVycm9yc1xuXHRcdFx0XHRcdFx0XHRpZiAoIGRlcHRoICkge1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3MoKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIENhbGwgYW4gb3B0aW9uYWwgaG9vayB0byByZWNvcmQgdGhlIHN0YWNrLCBpbiBjYXNlIG9mIGV4Y2VwdGlvblxuXHRcdFx0XHRcdFx0XHRcdC8vIHNpbmNlIGl0J3Mgb3RoZXJ3aXNlIGxvc3Qgd2hlbiBleGVjdXRpb24gZ29lcyBhc3luY1xuXHRcdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LkRlZmVycmVkLmdldFN0YWNrSG9vayApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3Muc3RhY2tUcmFjZSA9IGpRdWVyeS5EZWZlcnJlZC5nZXRTdGFja0hvb2soKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoIHByb2Nlc3MgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4galF1ZXJ5LkRlZmVycmVkKCBmdW5jdGlvbiggbmV3RGVmZXIgKSB7XG5cblx0XHRcdFx0XHRcdC8vIHByb2dyZXNzX2hhbmRsZXJzLmFkZCggLi4uIClcblx0XHRcdFx0XHRcdHR1cGxlc1sgMCBdWyAzIF0uYWRkKFxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKFxuXHRcdFx0XHRcdFx0XHRcdDAsXG5cdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXIsXG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmlzRnVuY3Rpb24oIG9uUHJvZ3Jlc3MgKSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRvblByb2dyZXNzIDpcblx0XHRcdFx0XHRcdFx0XHRcdElkZW50aXR5LFxuXHRcdFx0XHRcdFx0XHRcdG5ld0RlZmVyLm5vdGlmeVdpdGhcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0Ly8gZnVsZmlsbGVkX2hhbmRsZXJzLmFkZCggLi4uIClcblx0XHRcdFx0XHRcdHR1cGxlc1sgMSBdWyAzIF0uYWRkKFxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKFxuXHRcdFx0XHRcdFx0XHRcdDAsXG5cdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXIsXG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmlzRnVuY3Rpb24oIG9uRnVsZmlsbGVkICkgP1xuXHRcdFx0XHRcdFx0XHRcdFx0b25GdWxmaWxsZWQgOlxuXHRcdFx0XHRcdFx0XHRcdFx0SWRlbnRpdHlcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0Ly8gcmVqZWN0ZWRfaGFuZGxlcnMuYWRkKCAuLi4gKVxuXHRcdFx0XHRcdFx0dHVwbGVzWyAyIF1bIDMgXS5hZGQoXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoXG5cdFx0XHRcdFx0XHRcdFx0MCxcblx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlcixcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuaXNGdW5jdGlvbiggb25SZWplY3RlZCApID9cblx0XHRcdFx0XHRcdFx0XHRcdG9uUmVqZWN0ZWQgOlxuXHRcdFx0XHRcdFx0XHRcdFx0VGhyb3dlclxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0gKS5wcm9taXNlKCk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gR2V0IGEgcHJvbWlzZSBmb3IgdGhpcyBkZWZlcnJlZFxuXHRcdFx0XHQvLyBJZiBvYmogaXMgcHJvdmlkZWQsIHRoZSBwcm9taXNlIGFzcGVjdCBpcyBhZGRlZCB0byB0aGUgb2JqZWN0XG5cdFx0XHRcdHByb21pc2U6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9iaiAhPSBudWxsID8galF1ZXJ5LmV4dGVuZCggb2JqLCBwcm9taXNlICkgOiBwcm9taXNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZGVmZXJyZWQgPSB7fTtcblxuXHRcdC8vIEFkZCBsaXN0LXNwZWNpZmljIG1ldGhvZHNcblx0XHRqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XG5cdFx0XHR2YXIgbGlzdCA9IHR1cGxlWyAyIF0sXG5cdFx0XHRcdHN0YXRlU3RyaW5nID0gdHVwbGVbIDUgXTtcblxuXHRcdFx0Ly8gcHJvbWlzZS5wcm9ncmVzcyA9IGxpc3QuYWRkXG5cdFx0XHQvLyBwcm9taXNlLmRvbmUgPSBsaXN0LmFkZFxuXHRcdFx0Ly8gcHJvbWlzZS5mYWlsID0gbGlzdC5hZGRcblx0XHRcdHByb21pc2VbIHR1cGxlWyAxIF0gXSA9IGxpc3QuYWRkO1xuXG5cdFx0XHQvLyBIYW5kbGUgc3RhdGVcblx0XHRcdGlmICggc3RhdGVTdHJpbmcgKSB7XG5cdFx0XHRcdGxpc3QuYWRkKFxuXHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHQvLyBzdGF0ZSA9IFwicmVzb2x2ZWRcIiAoaS5lLiwgZnVsZmlsbGVkKVxuXHRcdFx0XHRcdFx0Ly8gc3RhdGUgPSBcInJlamVjdGVkXCJcblx0XHRcdFx0XHRcdHN0YXRlID0gc3RhdGVTdHJpbmc7XG5cdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdC8vIHJlamVjdGVkX2NhbGxiYWNrcy5kaXNhYmxlXG5cdFx0XHRcdFx0Ly8gZnVsZmlsbGVkX2NhbGxiYWNrcy5kaXNhYmxlXG5cdFx0XHRcdFx0dHVwbGVzWyAzIC0gaSBdWyAyIF0uZGlzYWJsZSxcblxuXHRcdFx0XHRcdC8vIHByb2dyZXNzX2NhbGxiYWNrcy5sb2NrXG5cdFx0XHRcdFx0dHVwbGVzWyAwIF1bIDIgXS5sb2NrXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHByb2dyZXNzX2hhbmRsZXJzLmZpcmVcblx0XHRcdC8vIGZ1bGZpbGxlZF9oYW5kbGVycy5maXJlXG5cdFx0XHQvLyByZWplY3RlZF9oYW5kbGVycy5maXJlXG5cdFx0XHRsaXN0LmFkZCggdHVwbGVbIDMgXS5maXJlICk7XG5cblx0XHRcdC8vIGRlZmVycmVkLm5vdGlmeSA9IGZ1bmN0aW9uKCkgeyBkZWZlcnJlZC5ub3RpZnlXaXRoKC4uLikgfVxuXHRcdFx0Ly8gZGVmZXJyZWQucmVzb2x2ZSA9IGZ1bmN0aW9uKCkgeyBkZWZlcnJlZC5yZXNvbHZlV2l0aCguLi4pIH1cblx0XHRcdC8vIGRlZmVycmVkLnJlamVjdCA9IGZ1bmN0aW9uKCkgeyBkZWZlcnJlZC5yZWplY3RXaXRoKC4uLikgfVxuXHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAwIF0gXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkZWZlcnJlZFsgdHVwbGVbIDAgXSArIFwiV2l0aFwiIF0oIHRoaXMgPT09IGRlZmVycmVkID8gdW5kZWZpbmVkIDogdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gZGVmZXJyZWQubm90aWZ5V2l0aCA9IGxpc3QuZmlyZVdpdGhcblx0XHRcdC8vIGRlZmVycmVkLnJlc29sdmVXaXRoID0gbGlzdC5maXJlV2l0aFxuXHRcdFx0Ly8gZGVmZXJyZWQucmVqZWN0V2l0aCA9IGxpc3QuZmlyZVdpdGhcblx0XHRcdGRlZmVycmVkWyB0dXBsZVsgMCBdICsgXCJXaXRoXCIgXSA9IGxpc3QuZmlyZVdpdGg7XG5cdFx0fSApO1xuXG5cdFx0Ly8gTWFrZSB0aGUgZGVmZXJyZWQgYSBwcm9taXNlXG5cdFx0cHJvbWlzZS5wcm9taXNlKCBkZWZlcnJlZCApO1xuXG5cdFx0Ly8gQ2FsbCBnaXZlbiBmdW5jIGlmIGFueVxuXHRcdGlmICggZnVuYyApIHtcblx0XHRcdGZ1bmMuY2FsbCggZGVmZXJyZWQsIGRlZmVycmVkICk7XG5cdFx0fVxuXG5cdFx0Ly8gQWxsIGRvbmUhXG5cdFx0cmV0dXJuIGRlZmVycmVkO1xuXHR9LFxuXG5cdC8vIERlZmVycmVkIGhlbHBlclxuXHR3aGVuOiBmdW5jdGlvbiggc2luZ2xlVmFsdWUgKSB7XG5cdFx0dmFyXG5cblx0XHRcdC8vIGNvdW50IG9mIHVuY29tcGxldGVkIHN1Ym9yZGluYXRlc1xuXHRcdFx0cmVtYWluaW5nID0gYXJndW1lbnRzLmxlbmd0aCxcblxuXHRcdFx0Ly8gY291bnQgb2YgdW5wcm9jZXNzZWQgYXJndW1lbnRzXG5cdFx0XHRpID0gcmVtYWluaW5nLFxuXG5cdFx0XHQvLyBzdWJvcmRpbmF0ZSBmdWxmaWxsbWVudCBkYXRhXG5cdFx0XHRyZXNvbHZlQ29udGV4dHMgPSBBcnJheSggaSApLFxuXHRcdFx0cmVzb2x2ZVZhbHVlcyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApLFxuXG5cdFx0XHQvLyB0aGUgbWFzdGVyIERlZmVycmVkXG5cdFx0XHRtYXN0ZXIgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblxuXHRcdFx0Ly8gc3Vib3JkaW5hdGUgY2FsbGJhY2sgZmFjdG9yeVxuXHRcdFx0dXBkYXRlRnVuYyA9IGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRcdHJlc29sdmVDb250ZXh0c1sgaSBdID0gdGhpcztcblx0XHRcdFx0XHRyZXNvbHZlVmFsdWVzWyBpIF0gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApIDogdmFsdWU7XG5cdFx0XHRcdFx0aWYgKCAhKCAtLXJlbWFpbmluZyApICkge1xuXHRcdFx0XHRcdFx0bWFzdGVyLnJlc29sdmVXaXRoKCByZXNvbHZlQ29udGV4dHMsIHJlc29sdmVWYWx1ZXMgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9O1xuXG5cdFx0Ly8gU2luZ2xlLSBhbmQgZW1wdHkgYXJndW1lbnRzIGFyZSBhZG9wdGVkIGxpa2UgUHJvbWlzZS5yZXNvbHZlXG5cdFx0aWYgKCByZW1haW5pbmcgPD0gMSApIHtcblx0XHRcdGFkb3B0VmFsdWUoIHNpbmdsZVZhbHVlLCBtYXN0ZXIuZG9uZSggdXBkYXRlRnVuYyggaSApICkucmVzb2x2ZSwgbWFzdGVyLnJlamVjdCApO1xuXG5cdFx0XHQvLyBVc2UgLnRoZW4oKSB0byB1bndyYXAgc2Vjb25kYXJ5IHRoZW5hYmxlcyAoY2YuIGdoLTMwMDApXG5cdFx0XHRpZiAoIG1hc3Rlci5zdGF0ZSgpID09PSBcInBlbmRpbmdcIiB8fFxuXHRcdFx0XHRqUXVlcnkuaXNGdW5jdGlvbiggcmVzb2x2ZVZhbHVlc1sgaSBdICYmIHJlc29sdmVWYWx1ZXNbIGkgXS50aGVuICkgKSB7XG5cblx0XHRcdFx0cmV0dXJuIG1hc3Rlci50aGVuKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gTXVsdGlwbGUgYXJndW1lbnRzIGFyZSBhZ2dyZWdhdGVkIGxpa2UgUHJvbWlzZS5hbGwgYXJyYXkgZWxlbWVudHNcblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdGFkb3B0VmFsdWUoIHJlc29sdmVWYWx1ZXNbIGkgXSwgdXBkYXRlRnVuYyggaSApLCBtYXN0ZXIucmVqZWN0ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1hc3Rlci5wcm9taXNlKCk7XG5cdH1cbn0gKTtcblxuXG4vLyBUaGVzZSB1c3VhbGx5IGluZGljYXRlIGEgcHJvZ3JhbW1lciBtaXN0YWtlIGR1cmluZyBkZXZlbG9wbWVudCxcbi8vIHdhcm4gYWJvdXQgdGhlbSBBU0FQIHJhdGhlciB0aGFuIHN3YWxsb3dpbmcgdGhlbSBieSBkZWZhdWx0LlxudmFyIHJlcnJvck5hbWVzID0gL14oRXZhbHxJbnRlcm5hbHxSYW5nZXxSZWZlcmVuY2V8U3ludGF4fFR5cGV8VVJJKUVycm9yJC87XG5cbmpRdWVyeS5EZWZlcnJlZC5leGNlcHRpb25Ib29rID0gZnVuY3Rpb24oIGVycm9yLCBzdGFjayApIHtcblxuXHQvLyBTdXBwb3J0OiBJRSA4IC0gOSBvbmx5XG5cdC8vIENvbnNvbGUgZXhpc3RzIHdoZW4gZGV2IHRvb2xzIGFyZSBvcGVuLCB3aGljaCBjYW4gaGFwcGVuIGF0IGFueSB0aW1lXG5cdGlmICggd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUud2FybiAmJiBlcnJvciAmJiByZXJyb3JOYW1lcy50ZXN0KCBlcnJvci5uYW1lICkgKSB7XG5cdFx0d2luZG93LmNvbnNvbGUud2FybiggXCJqUXVlcnkuRGVmZXJyZWQgZXhjZXB0aW9uOiBcIiArIGVycm9yLm1lc3NhZ2UsIGVycm9yLnN0YWNrLCBzdGFjayApO1xuXHR9XG59O1xuXG5cblxuXG5qUXVlcnkucmVhZHlFeGNlcHRpb24gPSBmdW5jdGlvbiggZXJyb3IgKSB7XG5cdHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHR0aHJvdyBlcnJvcjtcblx0fSApO1xufTtcblxuXG5cblxuLy8gVGhlIGRlZmVycmVkIHVzZWQgb24gRE9NIHJlYWR5XG52YXIgcmVhZHlMaXN0ID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbmpRdWVyeS5mbi5yZWFkeSA9IGZ1bmN0aW9uKCBmbiApIHtcblxuXHRyZWFkeUxpc3Rcblx0XHQudGhlbiggZm4gKVxuXG5cdFx0Ly8gV3JhcCBqUXVlcnkucmVhZHlFeGNlcHRpb24gaW4gYSBmdW5jdGlvbiBzbyB0aGF0IHRoZSBsb29rdXBcblx0XHQvLyBoYXBwZW5zIGF0IHRoZSB0aW1lIG9mIGVycm9yIGhhbmRsaW5nIGluc3RlYWQgb2YgY2FsbGJhY2tcblx0XHQvLyByZWdpc3RyYXRpb24uXG5cdFx0LmNhdGNoKCBmdW5jdGlvbiggZXJyb3IgKSB7XG5cdFx0XHRqUXVlcnkucmVhZHlFeGNlcHRpb24oIGVycm9yICk7XG5cdFx0fSApO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIElzIHRoZSBET00gcmVhZHkgdG8gYmUgdXNlZD8gU2V0IHRvIHRydWUgb25jZSBpdCBvY2N1cnMuXG5cdGlzUmVhZHk6IGZhbHNlLFxuXG5cdC8vIEEgY291bnRlciB0byB0cmFjayBob3cgbWFueSBpdGVtcyB0byB3YWl0IGZvciBiZWZvcmVcblx0Ly8gdGhlIHJlYWR5IGV2ZW50IGZpcmVzLiBTZWUgIzY3ODFcblx0cmVhZHlXYWl0OiAxLFxuXG5cdC8vIEhvbGQgKG9yIHJlbGVhc2UpIHRoZSByZWFkeSBldmVudFxuXHRob2xkUmVhZHk6IGZ1bmN0aW9uKCBob2xkICkge1xuXHRcdGlmICggaG9sZCApIHtcblx0XHRcdGpRdWVyeS5yZWFkeVdhaXQrKztcblx0XHR9IGVsc2Uge1xuXHRcdFx0alF1ZXJ5LnJlYWR5KCB0cnVlICk7XG5cdFx0fVxuXHR9LFxuXG5cdC8vIEhhbmRsZSB3aGVuIHRoZSBET00gaXMgcmVhZHlcblx0cmVhZHk6IGZ1bmN0aW9uKCB3YWl0ICkge1xuXG5cdFx0Ly8gQWJvcnQgaWYgdGhlcmUgYXJlIHBlbmRpbmcgaG9sZHMgb3Igd2UncmUgYWxyZWFkeSByZWFkeVxuXHRcdGlmICggd2FpdCA9PT0gdHJ1ZSA/IC0talF1ZXJ5LnJlYWR5V2FpdCA6IGpRdWVyeS5pc1JlYWR5ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFJlbWVtYmVyIHRoYXQgdGhlIERPTSBpcyByZWFkeVxuXHRcdGpRdWVyeS5pc1JlYWR5ID0gdHJ1ZTtcblxuXHRcdC8vIElmIGEgbm9ybWFsIERPTSBSZWFkeSBldmVudCBmaXJlZCwgZGVjcmVtZW50LCBhbmQgd2FpdCBpZiBuZWVkIGJlXG5cdFx0aWYgKCB3YWl0ICE9PSB0cnVlICYmIC0talF1ZXJ5LnJlYWR5V2FpdCA+IDAgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlcmUgYXJlIGZ1bmN0aW9ucyBib3VuZCwgdG8gZXhlY3V0ZVxuXHRcdHJlYWR5TGlzdC5yZXNvbHZlV2l0aCggZG9jdW1lbnQsIFsgalF1ZXJ5IF0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkucmVhZHkudGhlbiA9IHJlYWR5TGlzdC50aGVuO1xuXG4vLyBUaGUgcmVhZHkgZXZlbnQgaGFuZGxlciBhbmQgc2VsZiBjbGVhbnVwIG1ldGhvZFxuZnVuY3Rpb24gY29tcGxldGVkKCkge1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkICk7XG5cdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCBcImxvYWRcIiwgY29tcGxldGVkICk7XG5cdGpRdWVyeS5yZWFkeSgpO1xufVxuXG4vLyBDYXRjaCBjYXNlcyB3aGVyZSAkKGRvY3VtZW50KS5yZWFkeSgpIGlzIGNhbGxlZFxuLy8gYWZ0ZXIgdGhlIGJyb3dzZXIgZXZlbnQgaGFzIGFscmVhZHkgb2NjdXJyZWQuXG4vLyBTdXBwb3J0OiBJRSA8PTkgLSAxMCBvbmx5XG4vLyBPbGRlciBJRSBzb21ldGltZXMgc2lnbmFscyBcImludGVyYWN0aXZlXCIgdG9vIHNvb25cbmlmICggZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiIHx8XG5cdCggZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJsb2FkaW5nXCIgJiYgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbCApICkge1xuXG5cdC8vIEhhbmRsZSBpdCBhc3luY2hyb25vdXNseSB0byBhbGxvdyBzY3JpcHRzIHRoZSBvcHBvcnR1bml0eSB0byBkZWxheSByZWFkeVxuXHR3aW5kb3cuc2V0VGltZW91dCggalF1ZXJ5LnJlYWR5ICk7XG5cbn0gZWxzZSB7XG5cblx0Ly8gVXNlIHRoZSBoYW5keSBldmVudCBjYWxsYmFja1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkICk7XG5cblx0Ly8gQSBmYWxsYmFjayB0byB3aW5kb3cub25sb2FkLCB0aGF0IHdpbGwgYWx3YXlzIHdvcmtcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIFwibG9hZFwiLCBjb21wbGV0ZWQgKTtcbn1cblxuXG5cblxuLy8gTXVsdGlmdW5jdGlvbmFsIG1ldGhvZCB0byBnZXQgYW5kIHNldCB2YWx1ZXMgb2YgYSBjb2xsZWN0aW9uXG4vLyBUaGUgdmFsdWUvcyBjYW4gb3B0aW9uYWxseSBiZSBleGVjdXRlZCBpZiBpdCdzIGEgZnVuY3Rpb25cbnZhciBhY2Nlc3MgPSBmdW5jdGlvbiggZWxlbXMsIGZuLCBrZXksIHZhbHVlLCBjaGFpbmFibGUsIGVtcHR5R2V0LCByYXcgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsZW4gPSBlbGVtcy5sZW5ndGgsXG5cdFx0YnVsayA9IGtleSA9PSBudWxsO1xuXG5cdC8vIFNldHMgbWFueSB2YWx1ZXNcblx0aWYgKCBqUXVlcnkudHlwZSgga2V5ICkgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0Y2hhaW5hYmxlID0gdHJ1ZTtcblx0XHRmb3IgKCBpIGluIGtleSApIHtcblx0XHRcdGFjY2VzcyggZWxlbXMsIGZuLCBpLCBrZXlbIGkgXSwgdHJ1ZSwgZW1wdHlHZXQsIHJhdyApO1xuXHRcdH1cblxuXHQvLyBTZXRzIG9uZSB2YWx1ZVxuXHR9IGVsc2UgaWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdGNoYWluYWJsZSA9IHRydWU7XG5cblx0XHRpZiAoICFqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJhdyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKCBidWxrICkge1xuXG5cdFx0XHQvLyBCdWxrIG9wZXJhdGlvbnMgcnVuIGFnYWluc3QgdGhlIGVudGlyZSBzZXRcblx0XHRcdGlmICggcmF3ICkge1xuXHRcdFx0XHRmbi5jYWxsKCBlbGVtcywgdmFsdWUgKTtcblx0XHRcdFx0Zm4gPSBudWxsO1xuXG5cdFx0XHQvLyAuLi5leGNlcHQgd2hlbiBleGVjdXRpbmcgZnVuY3Rpb24gdmFsdWVzXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRidWxrID0gZm47XG5cdFx0XHRcdGZuID0gZnVuY3Rpb24oIGVsZW0sIGtleSwgdmFsdWUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGJ1bGsuY2FsbCggalF1ZXJ5KCBlbGVtICksIHZhbHVlICk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCBmbiApIHtcblx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRmbihcblx0XHRcdFx0XHRlbGVtc1sgaSBdLCBrZXksIHJhdyA/XG5cdFx0XHRcdFx0dmFsdWUgOlxuXHRcdFx0XHRcdHZhbHVlLmNhbGwoIGVsZW1zWyBpIF0sIGksIGZuKCBlbGVtc1sgaSBdLCBrZXkgKSApXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKCBjaGFpbmFibGUgKSB7XG5cdFx0cmV0dXJuIGVsZW1zO1xuXHR9XG5cblx0Ly8gR2V0c1xuXHRpZiAoIGJ1bGsgKSB7XG5cdFx0cmV0dXJuIGZuLmNhbGwoIGVsZW1zICk7XG5cdH1cblxuXHRyZXR1cm4gbGVuID8gZm4oIGVsZW1zWyAwIF0sIGtleSApIDogZW1wdHlHZXQ7XG59O1xudmFyIGFjY2VwdERhdGEgPSBmdW5jdGlvbiggb3duZXIgKSB7XG5cblx0Ly8gQWNjZXB0cyBvbmx5OlxuXHQvLyAgLSBOb2RlXG5cdC8vICAgIC0gTm9kZS5FTEVNRU5UX05PREVcblx0Ly8gICAgLSBOb2RlLkRPQ1VNRU5UX05PREVcblx0Ly8gIC0gT2JqZWN0XG5cdC8vICAgIC0gQW55XG5cdHJldHVybiBvd25lci5ub2RlVHlwZSA9PT0gMSB8fCBvd25lci5ub2RlVHlwZSA9PT0gOSB8fCAhKCArb3duZXIubm9kZVR5cGUgKTtcbn07XG5cblxuXG5cbmZ1bmN0aW9uIERhdGEoKSB7XG5cdHRoaXMuZXhwYW5kbyA9IGpRdWVyeS5leHBhbmRvICsgRGF0YS51aWQrKztcbn1cblxuRGF0YS51aWQgPSAxO1xuXG5EYXRhLnByb3RvdHlwZSA9IHtcblxuXHRjYWNoZTogZnVuY3Rpb24oIG93bmVyICkge1xuXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIG93bmVyIG9iamVjdCBhbHJlYWR5IGhhcyBhIGNhY2hlXG5cdFx0dmFyIHZhbHVlID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXG5cdFx0Ly8gSWYgbm90LCBjcmVhdGUgb25lXG5cdFx0aWYgKCAhdmFsdWUgKSB7XG5cdFx0XHR2YWx1ZSA9IHt9O1xuXG5cdFx0XHQvLyBXZSBjYW4gYWNjZXB0IGRhdGEgZm9yIG5vbi1lbGVtZW50IG5vZGVzIGluIG1vZGVybiBicm93c2Vycyxcblx0XHRcdC8vIGJ1dCB3ZSBzaG91bGQgbm90LCBzZWUgIzgzMzUuXG5cdFx0XHQvLyBBbHdheXMgcmV0dXJuIGFuIGVtcHR5IG9iamVjdC5cblx0XHRcdGlmICggYWNjZXB0RGF0YSggb3duZXIgKSApIHtcblxuXHRcdFx0XHQvLyBJZiBpdCBpcyBhIG5vZGUgdW5saWtlbHkgdG8gYmUgc3RyaW5naWZ5LWVkIG9yIGxvb3BlZCBvdmVyXG5cdFx0XHRcdC8vIHVzZSBwbGFpbiBhc3NpZ25tZW50XG5cdFx0XHRcdGlmICggb3duZXIubm9kZVR5cGUgKSB7XG5cdFx0XHRcdFx0b3duZXJbIHRoaXMuZXhwYW5kbyBdID0gdmFsdWU7XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIHNlY3VyZSBpdCBpbiBhIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5XG5cdFx0XHRcdC8vIGNvbmZpZ3VyYWJsZSBtdXN0IGJlIHRydWUgdG8gYWxsb3cgdGhlIHByb3BlcnR5IHRvIGJlXG5cdFx0XHRcdC8vIGRlbGV0ZWQgd2hlbiBkYXRhIGlzIHJlbW92ZWRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIG93bmVyLCB0aGlzLmV4cGFuZG8sIHtcblx0XHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZTtcblx0fSxcblx0c2V0OiBmdW5jdGlvbiggb3duZXIsIGRhdGEsIHZhbHVlICkge1xuXHRcdHZhciBwcm9wLFxuXHRcdFx0Y2FjaGUgPSB0aGlzLmNhY2hlKCBvd25lciApO1xuXG5cdFx0Ly8gSGFuZGxlOiBbIG93bmVyLCBrZXksIHZhbHVlIF0gYXJnc1xuXHRcdC8vIEFsd2F5cyB1c2UgY2FtZWxDYXNlIGtleSAoZ2gtMjI1Nylcblx0XHRpZiAoIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0Y2FjaGVbIGpRdWVyeS5jYW1lbENhc2UoIGRhdGEgKSBdID0gdmFsdWU7XG5cblx0XHQvLyBIYW5kbGU6IFsgb3duZXIsIHsgcHJvcGVydGllcyB9IF0gYXJnc1xuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIENvcHkgdGhlIHByb3BlcnRpZXMgb25lLWJ5LW9uZSB0byB0aGUgY2FjaGUgb2JqZWN0XG5cdFx0XHRmb3IgKCBwcm9wIGluIGRhdGEgKSB7XG5cdFx0XHRcdGNhY2hlWyBqUXVlcnkuY2FtZWxDYXNlKCBwcm9wICkgXSA9IGRhdGFbIHByb3AgXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGNhY2hlO1xuXHR9LFxuXHRnZXQ6IGZ1bmN0aW9uKCBvd25lciwga2V5ICkge1xuXHRcdHJldHVybiBrZXkgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHR0aGlzLmNhY2hlKCBvd25lciApIDpcblxuXHRcdFx0Ly8gQWx3YXlzIHVzZSBjYW1lbENhc2Uga2V5IChnaC0yMjU3KVxuXHRcdFx0b3duZXJbIHRoaXMuZXhwYW5kbyBdICYmIG93bmVyWyB0aGlzLmV4cGFuZG8gXVsgalF1ZXJ5LmNhbWVsQ2FzZSgga2V5ICkgXTtcblx0fSxcblx0YWNjZXNzOiBmdW5jdGlvbiggb3duZXIsIGtleSwgdmFsdWUgKSB7XG5cblx0XHQvLyBJbiBjYXNlcyB3aGVyZSBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIE5vIGtleSB3YXMgc3BlY2lmaWVkXG5cdFx0Ly8gICAyLiBBIHN0cmluZyBrZXkgd2FzIHNwZWNpZmllZCwgYnV0IG5vIHZhbHVlIHByb3ZpZGVkXG5cdFx0Ly9cblx0XHQvLyBUYWtlIHRoZSBcInJlYWRcIiBwYXRoIGFuZCBhbGxvdyB0aGUgZ2V0IG1ldGhvZCB0byBkZXRlcm1pbmVcblx0XHQvLyB3aGljaCB2YWx1ZSB0byByZXR1cm4sIHJlc3BlY3RpdmVseSBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIFRoZSBlbnRpcmUgY2FjaGUgb2JqZWN0XG5cdFx0Ly8gICAyLiBUaGUgZGF0YSBzdG9yZWQgYXQgdGhlIGtleVxuXHRcdC8vXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHQoICgga2V5ICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIgKSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkICkgKSB7XG5cblx0XHRcdHJldHVybiB0aGlzLmdldCggb3duZXIsIGtleSApO1xuXHRcdH1cblxuXHRcdC8vIFdoZW4gdGhlIGtleSBpcyBub3QgYSBzdHJpbmcsIG9yIGJvdGggYSBrZXkgYW5kIHZhbHVlXG5cdFx0Ly8gYXJlIHNwZWNpZmllZCwgc2V0IG9yIGV4dGVuZCAoZXhpc3Rpbmcgb2JqZWN0cykgd2l0aCBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIEFuIG9iamVjdCBvZiBwcm9wZXJ0aWVzXG5cdFx0Ly8gICAyLiBBIGtleSBhbmQgdmFsdWVcblx0XHQvL1xuXHRcdHRoaXMuc2V0KCBvd25lciwga2V5LCB2YWx1ZSApO1xuXG5cdFx0Ly8gU2luY2UgdGhlIFwic2V0XCIgcGF0aCBjYW4gaGF2ZSB0d28gcG9zc2libGUgZW50cnkgcG9pbnRzXG5cdFx0Ly8gcmV0dXJuIHRoZSBleHBlY3RlZCBkYXRhIGJhc2VkIG9uIHdoaWNoIHBhdGggd2FzIHRha2VuWypdXG5cdFx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGtleTtcblx0fSxcblx0cmVtb3ZlOiBmdW5jdGlvbiggb3duZXIsIGtleSApIHtcblx0XHR2YXIgaSxcblx0XHRcdGNhY2hlID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXG5cdFx0aWYgKCBjYWNoZSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICgga2V5ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdC8vIFN1cHBvcnQgYXJyYXkgb3Igc3BhY2Ugc2VwYXJhdGVkIHN0cmluZyBvZiBrZXlzXG5cdFx0XHRpZiAoIGpRdWVyeS5pc0FycmF5KCBrZXkgKSApIHtcblxuXHRcdFx0XHQvLyBJZiBrZXkgaXMgYW4gYXJyYXkgb2Yga2V5cy4uLlxuXHRcdFx0XHQvLyBXZSBhbHdheXMgc2V0IGNhbWVsQ2FzZSBrZXlzLCBzbyByZW1vdmUgdGhhdC5cblx0XHRcdFx0a2V5ID0ga2V5Lm1hcCggalF1ZXJ5LmNhbWVsQ2FzZSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0a2V5ID0galF1ZXJ5LmNhbWVsQ2FzZSgga2V5ICk7XG5cblx0XHRcdFx0Ly8gSWYgYSBrZXkgd2l0aCB0aGUgc3BhY2VzIGV4aXN0cywgdXNlIGl0LlxuXHRcdFx0XHQvLyBPdGhlcndpc2UsIGNyZWF0ZSBhbiBhcnJheSBieSBtYXRjaGluZyBub24td2hpdGVzcGFjZVxuXHRcdFx0XHRrZXkgPSBrZXkgaW4gY2FjaGUgP1xuXHRcdFx0XHRcdFsga2V5IF0gOlxuXHRcdFx0XHRcdCgga2V5Lm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW10gKTtcblx0XHRcdH1cblxuXHRcdFx0aSA9IGtleS5sZW5ndGg7XG5cblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRkZWxldGUgY2FjaGVbIGtleVsgaSBdIF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBleHBhbmRvIGlmIHRoZXJlJ3Mgbm8gbW9yZSBkYXRhXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCB8fCBqUXVlcnkuaXNFbXB0eU9iamVjdCggY2FjaGUgKSApIHtcblxuXHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9MzUgLSA0NVxuXHRcdFx0Ly8gV2Via2l0ICYgQmxpbmsgcGVyZm9ybWFuY2Ugc3VmZmVycyB3aGVuIGRlbGV0aW5nIHByb3BlcnRpZXNcblx0XHRcdC8vIGZyb20gRE9NIG5vZGVzLCBzbyBzZXQgdG8gdW5kZWZpbmVkIGluc3RlYWRcblx0XHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM3ODYwNyAoYnVnIHJlc3RyaWN0ZWQpXG5cdFx0XHRpZiAoIG93bmVyLm5vZGVUeXBlICkge1xuXHRcdFx0XHRvd25lclsgdGhpcy5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWxldGUgb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aGFzRGF0YTogZnVuY3Rpb24oIG93bmVyICkge1xuXHRcdHZhciBjYWNoZSA9IG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblx0XHRyZXR1cm4gY2FjaGUgIT09IHVuZGVmaW5lZCAmJiAhalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGNhY2hlICk7XG5cdH1cbn07XG52YXIgZGF0YVByaXYgPSBuZXcgRGF0YSgpO1xuXG52YXIgZGF0YVVzZXIgPSBuZXcgRGF0YSgpO1xuXG5cblxuLy9cdEltcGxlbWVudGF0aW9uIFN1bW1hcnlcbi8vXG4vL1x0MS4gRW5mb3JjZSBBUEkgc3VyZmFjZSBhbmQgc2VtYW50aWMgY29tcGF0aWJpbGl0eSB3aXRoIDEuOS54IGJyYW5jaFxuLy9cdDIuIEltcHJvdmUgdGhlIG1vZHVsZSdzIG1haW50YWluYWJpbGl0eSBieSByZWR1Y2luZyB0aGUgc3RvcmFnZVxuLy9cdFx0cGF0aHMgdG8gYSBzaW5nbGUgbWVjaGFuaXNtLlxuLy9cdDMuIFVzZSB0aGUgc2FtZSBzaW5nbGUgbWVjaGFuaXNtIHRvIHN1cHBvcnQgXCJwcml2YXRlXCIgYW5kIFwidXNlclwiIGRhdGEuXG4vL1x0NC4gX05ldmVyXyBleHBvc2UgXCJwcml2YXRlXCIgZGF0YSB0byB1c2VyIGNvZGUgKFRPRE86IERyb3AgX2RhdGEsIF9yZW1vdmVEYXRhKVxuLy9cdDUuIEF2b2lkIGV4cG9zaW5nIGltcGxlbWVudGF0aW9uIGRldGFpbHMgb24gdXNlciBvYmplY3RzIChlZy4gZXhwYW5kbyBwcm9wZXJ0aWVzKVxuLy9cdDYuIFByb3ZpZGUgYSBjbGVhciBwYXRoIGZvciBpbXBsZW1lbnRhdGlvbiB1cGdyYWRlIHRvIFdlYWtNYXAgaW4gMjAxNFxuXG52YXIgcmJyYWNlID0gL14oPzpcXHtbXFx3XFxXXSpcXH18XFxbW1xcd1xcV10qXFxdKSQvLFxuXHRybXVsdGlEYXNoID0gL1tBLVpdL2c7XG5cbmZ1bmN0aW9uIGdldERhdGEoIGRhdGEgKSB7XG5cdGlmICggZGF0YSA9PT0gXCJ0cnVlXCIgKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRpZiAoIGRhdGEgPT09IFwiZmFsc2VcIiApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRpZiAoIGRhdGEgPT09IFwibnVsbFwiICkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gT25seSBjb252ZXJ0IHRvIGEgbnVtYmVyIGlmIGl0IGRvZXNuJ3QgY2hhbmdlIHRoZSBzdHJpbmdcblx0aWYgKCBkYXRhID09PSArZGF0YSArIFwiXCIgKSB7XG5cdFx0cmV0dXJuICtkYXRhO1xuXHR9XG5cblx0aWYgKCByYnJhY2UudGVzdCggZGF0YSApICkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKCBkYXRhICk7XG5cdH1cblxuXHRyZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZGF0YUF0dHIoIGVsZW0sIGtleSwgZGF0YSApIHtcblx0dmFyIG5hbWU7XG5cblx0Ly8gSWYgbm90aGluZyB3YXMgZm91bmQgaW50ZXJuYWxseSwgdHJ5IHRvIGZldGNoIGFueVxuXHQvLyBkYXRhIGZyb20gdGhlIEhUTUw1IGRhdGEtKiBhdHRyaWJ1dGVcblx0aWYgKCBkYXRhID09PSB1bmRlZmluZWQgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRuYW1lID0gXCJkYXRhLVwiICsga2V5LnJlcGxhY2UoIHJtdWx0aURhc2gsIFwiLSQmXCIgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGRhdGEgPSBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApO1xuXG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGRhdGEgPSBnZXREYXRhKCBkYXRhICk7XG5cdFx0XHR9IGNhdGNoICggZSApIHt9XG5cblx0XHRcdC8vIE1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGRhdGEgc28gaXQgaXNuJ3QgY2hhbmdlZCBsYXRlclxuXHRcdFx0ZGF0YVVzZXIuc2V0KCBlbGVtLCBrZXksIGRhdGEgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGRhdGE7XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0aGFzRGF0YTogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRhdGFVc2VyLmhhc0RhdGEoIGVsZW0gKSB8fCBkYXRhUHJpdi5oYXNEYXRhKCBlbGVtICk7XG5cdH0sXG5cblx0ZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFVc2VyLmFjY2VzcyggZWxlbSwgbmFtZSwgZGF0YSApO1xuXHR9LFxuXG5cdHJlbW92ZURhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdGRhdGFVc2VyLnJlbW92ZSggZWxlbSwgbmFtZSApO1xuXHR9LFxuXG5cdC8vIFRPRE86IE5vdyB0aGF0IGFsbCBjYWxscyB0byBfZGF0YSBhbmQgX3JlbW92ZURhdGEgaGF2ZSBiZWVuIHJlcGxhY2VkXG5cdC8vIHdpdGggZGlyZWN0IGNhbGxzIHRvIGRhdGFQcml2IG1ldGhvZHMsIHRoZXNlIGNhbiBiZSBkZXByZWNhdGVkLlxuXHRfZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFQcml2LmFjY2VzcyggZWxlbSwgbmFtZSwgZGF0YSApO1xuXHR9LFxuXG5cdF9yZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIG5hbWUgKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGRhdGE6IGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xuXHRcdHZhciBpLCBuYW1lLCBkYXRhLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRcdGF0dHJzID0gZWxlbSAmJiBlbGVtLmF0dHJpYnV0ZXM7XG5cblx0XHQvLyBHZXRzIGFsbCB2YWx1ZXNcblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCB0aGlzLmxlbmd0aCApIHtcblx0XHRcdFx0ZGF0YSA9IGRhdGFVc2VyLmdldCggZWxlbSApO1xuXG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAhZGF0YVByaXYuZ2V0KCBlbGVtLCBcImhhc0RhdGFBdHRyc1wiICkgKSB7XG5cdFx0XHRcdFx0aSA9IGF0dHJzLmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgMTEgb25seVxuXHRcdFx0XHRcdFx0Ly8gVGhlIGF0dHJzIGVsZW1lbnRzIGNhbiBiZSBudWxsICgjMTQ4OTQpXG5cdFx0XHRcdFx0XHRpZiAoIGF0dHJzWyBpIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG5hbWUgPSBhdHRyc1sgaSBdLm5hbWU7XG5cdFx0XHRcdFx0XHRcdGlmICggbmFtZS5pbmRleE9mKCBcImRhdGEtXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0XHRcdFx0XHRuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZS5zbGljZSggNSApICk7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0YUF0dHIoIGVsZW0sIG5hbWUsIGRhdGFbIG5hbWUgXSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRhdGFQcml2LnNldCggZWxlbSwgXCJoYXNEYXRhQXR0cnNcIiwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH1cblxuXHRcdC8vIFNldHMgbXVsdGlwbGUgdmFsdWVzXG5cdFx0aWYgKCB0eXBlb2Yga2V5ID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRhdGFVc2VyLnNldCggdGhpcywga2V5ICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGRhdGE7XG5cblx0XHRcdC8vIFRoZSBjYWxsaW5nIGpRdWVyeSBvYmplY3QgKGVsZW1lbnQgbWF0Y2hlcykgaXMgbm90IGVtcHR5XG5cdFx0XHQvLyAoYW5kIHRoZXJlZm9yZSBoYXMgYW4gZWxlbWVudCBhcHBlYXJzIGF0IHRoaXNbIDAgXSkgYW5kIHRoZVxuXHRcdFx0Ly8gYHZhbHVlYCBwYXJhbWV0ZXIgd2FzIG5vdCB1bmRlZmluZWQuIEFuIGVtcHR5IGpRdWVyeSBvYmplY3Rcblx0XHRcdC8vIHdpbGwgcmVzdWx0IGluIGB1bmRlZmluZWRgIGZvciBlbGVtID0gdGhpc1sgMCBdIHdoaWNoIHdpbGxcblx0XHRcdC8vIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhbiBhdHRlbXB0IHRvIHJlYWQgYSBkYXRhIGNhY2hlIGlzIG1hZGUuXG5cdFx0XHRpZiAoIGVsZW0gJiYgdmFsdWUgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHQvLyBBdHRlbXB0IHRvIGdldCBkYXRhIGZyb20gdGhlIGNhY2hlXG5cdFx0XHRcdC8vIFRoZSBrZXkgd2lsbCBhbHdheXMgYmUgY2FtZWxDYXNlZCBpbiBEYXRhXG5cdFx0XHRcdGRhdGEgPSBkYXRhVXNlci5nZXQoIGVsZW0sIGtleSApO1xuXHRcdFx0XHRpZiAoIGRhdGEgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEF0dGVtcHQgdG8gXCJkaXNjb3ZlclwiIHRoZSBkYXRhIGluXG5cdFx0XHRcdC8vIEhUTUw1IGN1c3RvbSBkYXRhLSogYXR0cnNcblx0XHRcdFx0ZGF0YSA9IGRhdGFBdHRyKCBlbGVtLCBrZXkgKTtcblx0XHRcdFx0aWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBXZSB0cmllZCByZWFsbHkgaGFyZCwgYnV0IHRoZSBkYXRhIGRvZXNuJ3QgZXhpc3QuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IHRoZSBkYXRhLi4uXG5cdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdC8vIFdlIGFsd2F5cyBzdG9yZSB0aGUgY2FtZWxDYXNlZCBrZXlcblx0XHRcdFx0ZGF0YVVzZXIuc2V0KCB0aGlzLCBrZXksIHZhbHVlICk7XG5cdFx0XHR9ICk7XG5cdFx0fSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxLCBudWxsLCB0cnVlICk7XG5cdH0sXG5cblx0cmVtb3ZlRGF0YTogZnVuY3Rpb24oIGtleSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGRhdGFVc2VyLnJlbW92ZSggdGhpcywga2V5ICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cblxualF1ZXJ5LmV4dGVuZCgge1xuXHRxdWV1ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIHF1ZXVlO1xuXG5cdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0dHlwZSA9ICggdHlwZSB8fCBcImZ4XCIgKSArIFwicXVldWVcIjtcblx0XHRcdHF1ZXVlID0gZGF0YVByaXYuZ2V0KCBlbGVtLCB0eXBlICk7XG5cblx0XHRcdC8vIFNwZWVkIHVwIGRlcXVldWUgYnkgZ2V0dGluZyBvdXQgcXVpY2tseSBpZiB0aGlzIGlzIGp1c3QgYSBsb29rdXBcblx0XHRcdGlmICggZGF0YSApIHtcblx0XHRcdFx0aWYgKCAhcXVldWUgfHwgalF1ZXJ5LmlzQXJyYXkoIGRhdGEgKSApIHtcblx0XHRcdFx0XHRxdWV1ZSA9IGRhdGFQcml2LmFjY2VzcyggZWxlbSwgdHlwZSwgalF1ZXJ5Lm1ha2VBcnJheSggZGF0YSApICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cXVldWUucHVzaCggZGF0YSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcXVldWUgfHwgW107XG5cdFx0fVxuXHR9LFxuXG5cdGRlcXVldWU6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xuXHRcdHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuXHRcdHZhciBxdWV1ZSA9IGpRdWVyeS5xdWV1ZSggZWxlbSwgdHlwZSApLFxuXHRcdFx0c3RhcnRMZW5ndGggPSBxdWV1ZS5sZW5ndGgsXG5cdFx0XHRmbiA9IHF1ZXVlLnNoaWZ0KCksXG5cdFx0XHRob29rcyA9IGpRdWVyeS5fcXVldWVIb29rcyggZWxlbSwgdHlwZSApLFxuXHRcdFx0bmV4dCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkuZGVxdWV1ZSggZWxlbSwgdHlwZSApO1xuXHRcdFx0fTtcblxuXHRcdC8vIElmIHRoZSBmeCBxdWV1ZSBpcyBkZXF1ZXVlZCwgYWx3YXlzIHJlbW92ZSB0aGUgcHJvZ3Jlc3Mgc2VudGluZWxcblx0XHRpZiAoIGZuID09PSBcImlucHJvZ3Jlc3NcIiApIHtcblx0XHRcdGZuID0gcXVldWUuc2hpZnQoKTtcblx0XHRcdHN0YXJ0TGVuZ3RoLS07XG5cdFx0fVxuXG5cdFx0aWYgKCBmbiApIHtcblxuXHRcdFx0Ly8gQWRkIGEgcHJvZ3Jlc3Mgc2VudGluZWwgdG8gcHJldmVudCB0aGUgZnggcXVldWUgZnJvbSBiZWluZ1xuXHRcdFx0Ly8gYXV0b21hdGljYWxseSBkZXF1ZXVlZFxuXHRcdFx0aWYgKCB0eXBlID09PSBcImZ4XCIgKSB7XG5cdFx0XHRcdHF1ZXVlLnVuc2hpZnQoIFwiaW5wcm9ncmVzc1wiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENsZWFyIHVwIHRoZSBsYXN0IHF1ZXVlIHN0b3AgZnVuY3Rpb25cblx0XHRcdGRlbGV0ZSBob29rcy5zdG9wO1xuXHRcdFx0Zm4uY2FsbCggZWxlbSwgbmV4dCwgaG9va3MgKTtcblx0XHR9XG5cblx0XHRpZiAoICFzdGFydExlbmd0aCAmJiBob29rcyApIHtcblx0XHRcdGhvb2tzLmVtcHR5LmZpcmUoKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gTm90IHB1YmxpYyAtIGdlbmVyYXRlIGEgcXVldWVIb29rcyBvYmplY3QsIG9yIHJldHVybiB0aGUgY3VycmVudCBvbmVcblx0X3F1ZXVlSG9va3M6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlICkge1xuXHRcdHZhciBrZXkgPSB0eXBlICsgXCJxdWV1ZUhvb2tzXCI7XG5cdFx0cmV0dXJuIGRhdGFQcml2LmdldCggZWxlbSwga2V5ICkgfHwgZGF0YVByaXYuYWNjZXNzKCBlbGVtLCBrZXksIHtcblx0XHRcdGVtcHR5OiBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKS5hZGQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIFsgdHlwZSArIFwicXVldWVcIiwga2V5IF0gKTtcblx0XHRcdH0gKVxuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHF1ZXVlOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgc2V0dGVyID0gMjtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRkYXRhID0gdHlwZTtcblx0XHRcdHR5cGUgPSBcImZ4XCI7XG5cdFx0XHRzZXR0ZXItLTtcblx0XHR9XG5cblx0XHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPCBzZXR0ZXIgKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LnF1ZXVlKCB0aGlzWyAwIF0sIHR5cGUgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGF0YSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdHRoaXMgOlxuXHRcdFx0dGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHF1ZXVlID0galF1ZXJ5LnF1ZXVlKCB0aGlzLCB0eXBlLCBkYXRhICk7XG5cblx0XHRcdFx0Ly8gRW5zdXJlIGEgaG9va3MgZm9yIHRoaXMgcXVldWVcblx0XHRcdFx0alF1ZXJ5Ll9xdWV1ZUhvb2tzKCB0aGlzLCB0eXBlICk7XG5cblx0XHRcdFx0aWYgKCB0eXBlID09PSBcImZ4XCIgJiYgcXVldWVbIDAgXSAhPT0gXCJpbnByb2dyZXNzXCIgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHR9LFxuXHRkZXF1ZXVlOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XG5cdFx0fSApO1xuXHR9LFxuXHRjbGVhclF1ZXVlOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRyZXR1cm4gdGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XG5cdH0sXG5cblx0Ly8gR2V0IGEgcHJvbWlzZSByZXNvbHZlZCB3aGVuIHF1ZXVlcyBvZiBhIGNlcnRhaW4gdHlwZVxuXHQvLyBhcmUgZW1wdGllZCAoZnggaXMgdGhlIHR5cGUgYnkgZGVmYXVsdClcblx0cHJvbWlzZTogZnVuY3Rpb24oIHR5cGUsIG9iaiApIHtcblx0XHR2YXIgdG1wLFxuXHRcdFx0Y291bnQgPSAxLFxuXHRcdFx0ZGVmZXIgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblx0XHRcdGVsZW1lbnRzID0gdGhpcyxcblx0XHRcdGkgPSB0aGlzLmxlbmd0aCxcblx0XHRcdHJlc29sdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCAhKCAtLWNvdW50ICkgKSB7XG5cdFx0XHRcdFx0ZGVmZXIucmVzb2x2ZVdpdGgoIGVsZW1lbnRzLCBbIGVsZW1lbnRzIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRvYmogPSB0eXBlO1xuXHRcdFx0dHlwZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHR0bXAgPSBkYXRhUHJpdi5nZXQoIGVsZW1lbnRzWyBpIF0sIHR5cGUgKyBcInF1ZXVlSG9va3NcIiApO1xuXHRcdFx0aWYgKCB0bXAgJiYgdG1wLmVtcHR5ICkge1xuXHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR0bXAuZW1wdHkuYWRkKCByZXNvbHZlICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJlc29sdmUoKTtcblx0XHRyZXR1cm4gZGVmZXIucHJvbWlzZSggb2JqICk7XG5cdH1cbn0gKTtcbnZhciBwbnVtID0gKCAvWystXT8oPzpcXGQqXFwufClcXGQrKD86W2VFXVsrLV0/XFxkK3wpLyApLnNvdXJjZTtcblxudmFyIHJjc3NOdW0gPSBuZXcgUmVnRXhwKCBcIl4oPzooWystXSk9fCkoXCIgKyBwbnVtICsgXCIpKFthLXolXSopJFwiLCBcImlcIiApO1xuXG5cbnZhciBjc3NFeHBhbmQgPSBbIFwiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCIgXTtcblxudmFyIGlzSGlkZGVuV2l0aGluVHJlZSA9IGZ1bmN0aW9uKCBlbGVtLCBlbCApIHtcblxuXHRcdC8vIGlzSGlkZGVuV2l0aGluVHJlZSBtaWdodCBiZSBjYWxsZWQgZnJvbSBqUXVlcnkjZmlsdGVyIGZ1bmN0aW9uO1xuXHRcdC8vIGluIHRoYXQgY2FzZSwgZWxlbWVudCB3aWxsIGJlIHNlY29uZCBhcmd1bWVudFxuXHRcdGVsZW0gPSBlbCB8fCBlbGVtO1xuXG5cdFx0Ly8gSW5saW5lIHN0eWxlIHRydW1wcyBhbGxcblx0XHRyZXR1cm4gZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fFxuXHRcdFx0ZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmXG5cblx0XHRcdC8vIE90aGVyd2lzZSwgY2hlY2sgY29tcHV0ZWQgc3R5bGVcblx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggPD00MyAtIDQ1XG5cdFx0XHQvLyBEaXNjb25uZWN0ZWQgZWxlbWVudHMgY2FuIGhhdmUgY29tcHV0ZWQgZGlzcGxheTogbm9uZSwgc28gZmlyc3QgY29uZmlybSB0aGF0IGVsZW0gaXNcblx0XHRcdC8vIGluIHRoZSBkb2N1bWVudC5cblx0XHRcdGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICkgJiZcblxuXHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSA9PT0gXCJub25lXCI7XG5cdH07XG5cbnZhciBzd2FwID0gZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGNhbGxiYWNrLCBhcmdzICkge1xuXHR2YXIgcmV0LCBuYW1lLFxuXHRcdG9sZCA9IHt9O1xuXG5cdC8vIFJlbWVtYmVyIHRoZSBvbGQgdmFsdWVzLCBhbmQgaW5zZXJ0IHRoZSBuZXcgb25lc1xuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0b2xkWyBuYW1lIF0gPSBlbGVtLnN0eWxlWyBuYW1lIF07XG5cdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gb3B0aW9uc1sgbmFtZSBdO1xuXHR9XG5cblx0cmV0ID0gY2FsbGJhY2suYXBwbHkoIGVsZW0sIGFyZ3MgfHwgW10gKTtcblxuXHQvLyBSZXZlcnQgdGhlIG9sZCB2YWx1ZXNcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9sZFsgbmFtZSBdO1xuXHR9XG5cblx0cmV0dXJuIHJldDtcbn07XG5cblxuXG5cbmZ1bmN0aW9uIGFkanVzdENTUyggZWxlbSwgcHJvcCwgdmFsdWVQYXJ0cywgdHdlZW4gKSB7XG5cdHZhciBhZGp1c3RlZCxcblx0XHRzY2FsZSA9IDEsXG5cdFx0bWF4SXRlcmF0aW9ucyA9IDIwLFxuXHRcdGN1cnJlbnRWYWx1ZSA9IHR3ZWVuID9cblx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdHdlZW4uY3VyKCk7XG5cdFx0XHR9IDpcblx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4galF1ZXJ5LmNzcyggZWxlbSwgcHJvcCwgXCJcIiApO1xuXHRcdFx0fSxcblx0XHRpbml0aWFsID0gY3VycmVudFZhbHVlKCksXG5cdFx0dW5pdCA9IHZhbHVlUGFydHMgJiYgdmFsdWVQYXJ0c1sgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgcHJvcCBdID8gXCJcIiA6IFwicHhcIiApLFxuXG5cdFx0Ly8gU3RhcnRpbmcgdmFsdWUgY29tcHV0YXRpb24gaXMgcmVxdWlyZWQgZm9yIHBvdGVudGlhbCB1bml0IG1pc21hdGNoZXNcblx0XHRpbml0aWFsSW5Vbml0ID0gKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gfHwgdW5pdCAhPT0gXCJweFwiICYmICtpbml0aWFsICkgJiZcblx0XHRcdHJjc3NOdW0uZXhlYyggalF1ZXJ5LmNzcyggZWxlbSwgcHJvcCApICk7XG5cblx0aWYgKCBpbml0aWFsSW5Vbml0ICYmIGluaXRpYWxJblVuaXRbIDMgXSAhPT0gdW5pdCApIHtcblxuXHRcdC8vIFRydXN0IHVuaXRzIHJlcG9ydGVkIGJ5IGpRdWVyeS5jc3Ncblx0XHR1bml0ID0gdW5pdCB8fCBpbml0aWFsSW5Vbml0WyAzIF07XG5cblx0XHQvLyBNYWtlIHN1cmUgd2UgdXBkYXRlIHRoZSB0d2VlbiBwcm9wZXJ0aWVzIGxhdGVyIG9uXG5cdFx0dmFsdWVQYXJ0cyA9IHZhbHVlUGFydHMgfHwgW107XG5cblx0XHQvLyBJdGVyYXRpdmVseSBhcHByb3hpbWF0ZSBmcm9tIGEgbm9uemVybyBzdGFydGluZyBwb2ludFxuXHRcdGluaXRpYWxJblVuaXQgPSAraW5pdGlhbCB8fCAxO1xuXG5cdFx0ZG8ge1xuXG5cdFx0XHQvLyBJZiBwcmV2aW91cyBpdGVyYXRpb24gemVyb2VkIG91dCwgZG91YmxlIHVudGlsIHdlIGdldCAqc29tZXRoaW5nKi5cblx0XHRcdC8vIFVzZSBzdHJpbmcgZm9yIGRvdWJsaW5nIHNvIHdlIGRvbid0IGFjY2lkZW50YWxseSBzZWUgc2NhbGUgYXMgdW5jaGFuZ2VkIGJlbG93XG5cdFx0XHRzY2FsZSA9IHNjYWxlIHx8IFwiLjVcIjtcblxuXHRcdFx0Ly8gQWRqdXN0IGFuZCBhcHBseVxuXHRcdFx0aW5pdGlhbEluVW5pdCA9IGluaXRpYWxJblVuaXQgLyBzY2FsZTtcblx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgcHJvcCwgaW5pdGlhbEluVW5pdCArIHVuaXQgKTtcblxuXHRcdC8vIFVwZGF0ZSBzY2FsZSwgdG9sZXJhdGluZyB6ZXJvIG9yIE5hTiBmcm9tIHR3ZWVuLmN1cigpXG5cdFx0Ly8gQnJlYWsgdGhlIGxvb3AgaWYgc2NhbGUgaXMgdW5jaGFuZ2VkIG9yIHBlcmZlY3QsIG9yIGlmIHdlJ3ZlIGp1c3QgaGFkIGVub3VnaC5cblx0XHR9IHdoaWxlIChcblx0XHRcdHNjYWxlICE9PSAoIHNjYWxlID0gY3VycmVudFZhbHVlKCkgLyBpbml0aWFsICkgJiYgc2NhbGUgIT09IDEgJiYgLS1tYXhJdGVyYXRpb25zXG5cdFx0KTtcblx0fVxuXG5cdGlmICggdmFsdWVQYXJ0cyApIHtcblx0XHRpbml0aWFsSW5Vbml0ID0gK2luaXRpYWxJblVuaXQgfHwgK2luaXRpYWwgfHwgMDtcblxuXHRcdC8vIEFwcGx5IHJlbGF0aXZlIG9mZnNldCAoKz0vLT0pIGlmIHNwZWNpZmllZFxuXHRcdGFkanVzdGVkID0gdmFsdWVQYXJ0c1sgMSBdID9cblx0XHRcdGluaXRpYWxJblVuaXQgKyAoIHZhbHVlUGFydHNbIDEgXSArIDEgKSAqIHZhbHVlUGFydHNbIDIgXSA6XG5cdFx0XHQrdmFsdWVQYXJ0c1sgMiBdO1xuXHRcdGlmICggdHdlZW4gKSB7XG5cdFx0XHR0d2Vlbi51bml0ID0gdW5pdDtcblx0XHRcdHR3ZWVuLnN0YXJ0ID0gaW5pdGlhbEluVW5pdDtcblx0XHRcdHR3ZWVuLmVuZCA9IGFkanVzdGVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gYWRqdXN0ZWQ7XG59XG5cblxudmFyIGRlZmF1bHREaXNwbGF5TWFwID0ge307XG5cbmZ1bmN0aW9uIGdldERlZmF1bHREaXNwbGF5KCBlbGVtICkge1xuXHR2YXIgdGVtcCxcblx0XHRkb2MgPSBlbGVtLm93bmVyRG9jdW1lbnQsXG5cdFx0bm9kZU5hbWUgPSBlbGVtLm5vZGVOYW1lLFxuXHRcdGRpc3BsYXkgPSBkZWZhdWx0RGlzcGxheU1hcFsgbm9kZU5hbWUgXTtcblxuXHRpZiAoIGRpc3BsYXkgKSB7XG5cdFx0cmV0dXJuIGRpc3BsYXk7XG5cdH1cblxuXHR0ZW1wID0gZG9jLmJvZHkuYXBwZW5kQ2hpbGQoIGRvYy5jcmVhdGVFbGVtZW50KCBub2RlTmFtZSApICk7XG5cdGRpc3BsYXkgPSBqUXVlcnkuY3NzKCB0ZW1wLCBcImRpc3BsYXlcIiApO1xuXG5cdHRlbXAucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggdGVtcCApO1xuXG5cdGlmICggZGlzcGxheSA9PT0gXCJub25lXCIgKSB7XG5cdFx0ZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0fVxuXHRkZWZhdWx0RGlzcGxheU1hcFsgbm9kZU5hbWUgXSA9IGRpc3BsYXk7XG5cblx0cmV0dXJuIGRpc3BsYXk7XG59XG5cbmZ1bmN0aW9uIHNob3dIaWRlKCBlbGVtZW50cywgc2hvdyApIHtcblx0dmFyIGRpc3BsYXksIGVsZW0sXG5cdFx0dmFsdWVzID0gW10sXG5cdFx0aW5kZXggPSAwLFxuXHRcdGxlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcblxuXHQvLyBEZXRlcm1pbmUgbmV3IGRpc3BsYXkgdmFsdWUgZm9yIGVsZW1lbnRzIHRoYXQgbmVlZCB0byBjaGFuZ2Vcblx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRlbGVtID0gZWxlbWVudHNbIGluZGV4IF07XG5cdFx0aWYgKCAhZWxlbS5zdHlsZSApIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGRpc3BsYXkgPSBlbGVtLnN0eWxlLmRpc3BsYXk7XG5cdFx0aWYgKCBzaG93ICkge1xuXG5cdFx0XHQvLyBTaW5jZSB3ZSBmb3JjZSB2aXNpYmlsaXR5IHVwb24gY2FzY2FkZS1oaWRkZW4gZWxlbWVudHMsIGFuIGltbWVkaWF0ZSAoYW5kIHNsb3cpXG5cdFx0XHQvLyBjaGVjayBpcyByZXF1aXJlZCBpbiB0aGlzIGZpcnN0IGxvb3AgdW5sZXNzIHdlIGhhdmUgYSBub25lbXB0eSBkaXNwbGF5IHZhbHVlIChlaXRoZXJcblx0XHRcdC8vIGlubGluZSBvciBhYm91dC10by1iZS1yZXN0b3JlZClcblx0XHRcdGlmICggZGlzcGxheSA9PT0gXCJub25lXCIgKSB7XG5cdFx0XHRcdHZhbHVlc1sgaW5kZXggXSA9IGRhdGFQcml2LmdldCggZWxlbSwgXCJkaXNwbGF5XCIgKSB8fCBudWxsO1xuXHRcdFx0XHRpZiAoICF2YWx1ZXNbIGluZGV4IF0gKSB7XG5cdFx0XHRcdFx0ZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwiXCIgJiYgaXNIaWRkZW5XaXRoaW5UcmVlKCBlbGVtICkgKSB7XG5cdFx0XHRcdHZhbHVlc1sgaW5kZXggXSA9IGdldERlZmF1bHREaXNwbGF5KCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICggZGlzcGxheSAhPT0gXCJub25lXCIgKSB7XG5cdFx0XHRcdHZhbHVlc1sgaW5kZXggXSA9IFwibm9uZVwiO1xuXG5cdFx0XHRcdC8vIFJlbWVtYmVyIHdoYXQgd2UncmUgb3ZlcndyaXRpbmdcblx0XHRcdFx0ZGF0YVByaXYuc2V0KCBlbGVtLCBcImRpc3BsYXlcIiwgZGlzcGxheSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFNldCB0aGUgZGlzcGxheSBvZiB0aGUgZWxlbWVudHMgaW4gYSBzZWNvbmQgbG9vcCB0byBhdm9pZCBjb25zdGFudCByZWZsb3dcblx0Zm9yICggaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRpZiAoIHZhbHVlc1sgaW5kZXggXSAhPSBudWxsICkge1xuXHRcdFx0ZWxlbWVudHNbIGluZGV4IF0uc3R5bGUuZGlzcGxheSA9IHZhbHVlc1sgaW5kZXggXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZWxlbWVudHM7XG59XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0c2hvdzogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHNob3dIaWRlKCB0aGlzLCB0cnVlICk7XG5cdH0sXG5cdGhpZGU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzaG93SGlkZSggdGhpcyApO1xuXHR9LFxuXHR0b2dnbGU6IGZ1bmN0aW9uKCBzdGF0ZSApIHtcblx0XHRpZiAoIHR5cGVvZiBzdGF0ZSA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0XHRyZXR1cm4gc3RhdGUgPyB0aGlzLnNob3coKSA6IHRoaXMuaGlkZSgpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBpc0hpZGRlbldpdGhpblRyZWUoIHRoaXMgKSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkuc2hvdygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxufSApO1xudmFyIHJjaGVja2FibGVUeXBlID0gKCAvXig/OmNoZWNrYm94fHJhZGlvKSQvaSApO1xuXG52YXIgcnRhZ05hbWUgPSAoIC88KFthLXpdW15cXC9cXDA+XFx4MjBcXHRcXHJcXG5cXGZdKykvaSApO1xuXG52YXIgcnNjcmlwdFR5cGUgPSAoIC9eJHxcXC8oPzpqYXZhfGVjbWEpc2NyaXB0L2kgKTtcblxuXG5cbi8vIFdlIGhhdmUgdG8gY2xvc2UgdGhlc2UgdGFncyB0byBzdXBwb3J0IFhIVE1MICgjMTMyMDApXG52YXIgd3JhcE1hcCA9IHtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuXHRvcHRpb246IFsgMSwgXCI8c2VsZWN0IG11bHRpcGxlPSdtdWx0aXBsZSc+XCIsIFwiPC9zZWxlY3Q+XCIgXSxcblxuXHQvLyBYSFRNTCBwYXJzZXJzIGRvIG5vdCBtYWdpY2FsbHkgaW5zZXJ0IGVsZW1lbnRzIGluIHRoZVxuXHQvLyBzYW1lIHdheSB0aGF0IHRhZyBzb3VwIHBhcnNlcnMgZG8uIFNvIHdlIGNhbm5vdCBzaG9ydGVuXG5cdC8vIHRoaXMgYnkgb21pdHRpbmcgPHRib2R5PiBvciBvdGhlciByZXF1aXJlZCBlbGVtZW50cy5cblx0dGhlYWQ6IFsgMSwgXCI8dGFibGU+XCIsIFwiPC90YWJsZT5cIiBdLFxuXHRjb2w6IFsgMiwgXCI8dGFibGU+PGNvbGdyb3VwPlwiLCBcIjwvY29sZ3JvdXA+PC90YWJsZT5cIiBdLFxuXHR0cjogWyAyLCBcIjx0YWJsZT48dGJvZHk+XCIsIFwiPC90Ym9keT48L3RhYmxlPlwiIF0sXG5cdHRkOiBbIDMsIFwiPHRhYmxlPjx0Ym9keT48dHI+XCIsIFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCIgXSxcblxuXHRfZGVmYXVsdDogWyAwLCBcIlwiLCBcIlwiIF1cbn07XG5cbi8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG53cmFwTWFwLm9wdGdyb3VwID0gd3JhcE1hcC5vcHRpb247XG5cbndyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG53cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcblxuXG5mdW5jdGlvbiBnZXRBbGwoIGNvbnRleHQsIHRhZyApIHtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdC8vIFVzZSB0eXBlb2YgdG8gYXZvaWQgemVyby1hcmd1bWVudCBtZXRob2QgaW52b2NhdGlvbiBvbiBob3N0IG9iamVjdHMgKCMxNTE1MSlcblx0dmFyIHJldDtcblxuXHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdHJldCA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyB8fCBcIipcIiApO1xuXG5cdH0gZWxzZSBpZiAoIHR5cGVvZiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0cmV0ID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCB0YWcgfHwgXCIqXCIgKTtcblxuXHR9IGVsc2Uge1xuXHRcdHJldCA9IFtdO1xuXHR9XG5cblx0aWYgKCB0YWcgPT09IHVuZGVmaW5lZCB8fCB0YWcgJiYgalF1ZXJ5Lm5vZGVOYW1lKCBjb250ZXh0LCB0YWcgKSApIHtcblx0XHRyZXR1cm4galF1ZXJ5Lm1lcmdlKCBbIGNvbnRleHQgXSwgcmV0ICk7XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufVxuXG5cbi8vIE1hcmsgc2NyaXB0cyBhcyBoYXZpbmcgYWxyZWFkeSBiZWVuIGV2YWx1YXRlZFxuZnVuY3Rpb24gc2V0R2xvYmFsRXZhbCggZWxlbXMsIHJlZkVsZW1lbnRzICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bCA9IGVsZW1zLmxlbmd0aDtcblxuXHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0ZGF0YVByaXYuc2V0KFxuXHRcdFx0ZWxlbXNbIGkgXSxcblx0XHRcdFwiZ2xvYmFsRXZhbFwiLFxuXHRcdFx0IXJlZkVsZW1lbnRzIHx8IGRhdGFQcml2LmdldCggcmVmRWxlbWVudHNbIGkgXSwgXCJnbG9iYWxFdmFsXCIgKVxuXHRcdCk7XG5cdH1cbn1cblxuXG52YXIgcmh0bWwgPSAvPHwmIz9cXHcrOy87XG5cbmZ1bmN0aW9uIGJ1aWxkRnJhZ21lbnQoIGVsZW1zLCBjb250ZXh0LCBzY3JpcHRzLCBzZWxlY3Rpb24sIGlnbm9yZWQgKSB7XG5cdHZhciBlbGVtLCB0bXAsIHRhZywgd3JhcCwgY29udGFpbnMsIGosXG5cdFx0ZnJhZ21lbnQgPSBjb250ZXh0LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcblx0XHRub2RlcyA9IFtdLFxuXHRcdGkgPSAwLFxuXHRcdGwgPSBlbGVtcy5sZW5ndGg7XG5cblx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdGVsZW0gPSBlbGVtc1sgaSBdO1xuXG5cdFx0aWYgKCBlbGVtIHx8IGVsZW0gPT09IDAgKSB7XG5cblx0XHRcdC8vIEFkZCBub2RlcyBkaXJlY3RseVxuXHRcdFx0aWYgKCBqUXVlcnkudHlwZSggZWxlbSApID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHRcdFx0XHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggbm9kZXMsIGVsZW0ubm9kZVR5cGUgPyBbIGVsZW0gXSA6IGVsZW0gKTtcblxuXHRcdFx0Ly8gQ29udmVydCBub24taHRtbCBpbnRvIGEgdGV4dCBub2RlXG5cdFx0XHR9IGVsc2UgaWYgKCAhcmh0bWwudGVzdCggZWxlbSApICkge1xuXHRcdFx0XHRub2Rlcy5wdXNoKCBjb250ZXh0LmNyZWF0ZVRleHROb2RlKCBlbGVtICkgKTtcblxuXHRcdFx0Ly8gQ29udmVydCBodG1sIGludG8gRE9NIG5vZGVzXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0bXAgPSB0bXAgfHwgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGNvbnRleHQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApICk7XG5cblx0XHRcdFx0Ly8gRGVzZXJpYWxpemUgYSBzdGFuZGFyZCByZXByZXNlbnRhdGlvblxuXHRcdFx0XHR0YWcgPSAoIHJ0YWdOYW1lLmV4ZWMoIGVsZW0gKSB8fCBbIFwiXCIsIFwiXCIgXSApWyAxIF0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0d3JhcCA9IHdyYXBNYXBbIHRhZyBdIHx8IHdyYXBNYXAuX2RlZmF1bHQ7XG5cdFx0XHRcdHRtcC5pbm5lckhUTUwgPSB3cmFwWyAxIF0gKyBqUXVlcnkuaHRtbFByZWZpbHRlciggZWxlbSApICsgd3JhcFsgMiBdO1xuXG5cdFx0XHRcdC8vIERlc2NlbmQgdGhyb3VnaCB3cmFwcGVycyB0byB0aGUgcmlnaHQgY29udGVudFxuXHRcdFx0XHRqID0gd3JhcFsgMCBdO1xuXHRcdFx0XHR3aGlsZSAoIGotLSApIHtcblx0XHRcdFx0XHR0bXAgPSB0bXAubGFzdENoaWxkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5LCBQaGFudG9tSlMgMSBvbmx5XG5cdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCBub2RlcywgdG1wLmNoaWxkTm9kZXMgKTtcblxuXHRcdFx0XHQvLyBSZW1lbWJlciB0aGUgdG9wLWxldmVsIGNvbnRhaW5lclxuXHRcdFx0XHR0bXAgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG5cdFx0XHRcdC8vIEVuc3VyZSB0aGUgY3JlYXRlZCBub2RlcyBhcmUgb3JwaGFuZWQgKCMxMjM5Milcblx0XHRcdFx0dG1wLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZW1vdmUgd3JhcHBlciBmcm9tIGZyYWdtZW50XG5cdGZyYWdtZW50LnRleHRDb250ZW50ID0gXCJcIjtcblxuXHRpID0gMDtcblx0d2hpbGUgKCAoIGVsZW0gPSBub2Rlc1sgaSsrIF0gKSApIHtcblxuXHRcdC8vIFNraXAgZWxlbWVudHMgYWxyZWFkeSBpbiB0aGUgY29udGV4dCBjb2xsZWN0aW9uICh0cmFjLTQwODcpXG5cdFx0aWYgKCBzZWxlY3Rpb24gJiYgalF1ZXJ5LmluQXJyYXkoIGVsZW0sIHNlbGVjdGlvbiApID4gLTEgKSB7XG5cdFx0XHRpZiAoIGlnbm9yZWQgKSB7XG5cdFx0XHRcdGlnbm9yZWQucHVzaCggZWxlbSApO1xuXHRcdFx0fVxuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y29udGFpbnMgPSBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXG5cdFx0Ly8gQXBwZW5kIHRvIGZyYWdtZW50XG5cdFx0dG1wID0gZ2V0QWxsKCBmcmFnbWVudC5hcHBlbmRDaGlsZCggZWxlbSApLCBcInNjcmlwdFwiICk7XG5cblx0XHQvLyBQcmVzZXJ2ZSBzY3JpcHQgZXZhbHVhdGlvbiBoaXN0b3J5XG5cdFx0aWYgKCBjb250YWlucyApIHtcblx0XHRcdHNldEdsb2JhbEV2YWwoIHRtcCApO1xuXHRcdH1cblxuXHRcdC8vIENhcHR1cmUgZXhlY3V0YWJsZXNcblx0XHRpZiAoIHNjcmlwdHMgKSB7XG5cdFx0XHRqID0gMDtcblx0XHRcdHdoaWxlICggKCBlbGVtID0gdG1wWyBqKysgXSApICkge1xuXHRcdFx0XHRpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIGVsZW0udHlwZSB8fCBcIlwiICkgKSB7XG5cdFx0XHRcdFx0c2NyaXB0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZnJhZ21lbnQ7XG59XG5cblxuKCBmdW5jdGlvbigpIHtcblx0dmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuXHRcdGRpdiA9IGZyYWdtZW50LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKSxcblx0XHRpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIC0gNC4zIG9ubHlcblx0Ly8gQ2hlY2sgc3RhdGUgbG9zdCBpZiB0aGUgbmFtZSBpcyBzZXQgKCMxMTIxNylcblx0Ly8gU3VwcG9ydDogV2luZG93cyBXZWIgQXBwcyAoV1dBKVxuXHQvLyBgbmFtZWAgYW5kIGB0eXBlYCBtdXN0IHVzZSAuc2V0QXR0cmlidXRlIGZvciBXV0EgKCMxNDkwMSlcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJyYWRpb1wiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJjaGVja2VkXCIsIFwiY2hlY2tlZFwiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwidFwiICk7XG5cblx0ZGl2LmFwcGVuZENoaWxkKCBpbnB1dCApO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjEgb25seVxuXHQvLyBPbGRlciBXZWJLaXQgZG9lc24ndCBjbG9uZSBjaGVja2VkIHN0YXRlIGNvcnJlY3RseSBpbiBmcmFnbWVudHNcblx0c3VwcG9ydC5jaGVja0Nsb25lID0gZGl2LmNsb25lTm9kZSggdHJ1ZSApLmNsb25lTm9kZSggdHJ1ZSApLmxhc3RDaGlsZC5jaGVja2VkO1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuXHQvLyBNYWtlIHN1cmUgdGV4dGFyZWEgKGFuZCBjaGVja2JveCkgZGVmYXVsdFZhbHVlIGlzIHByb3Blcmx5IGNsb25lZFxuXHRkaXYuaW5uZXJIVE1MID0gXCI8dGV4dGFyZWE+eDwvdGV4dGFyZWE+XCI7XG5cdHN1cHBvcnQubm9DbG9uZUNoZWNrZWQgPSAhIWRpdi5jbG9uZU5vZGUoIHRydWUgKS5sYXN0Q2hpbGQuZGVmYXVsdFZhbHVlO1xufSApKCk7XG52YXIgZG9jdW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cblxudmFyXG5cdHJrZXlFdmVudCA9IC9ea2V5Lyxcblx0cm1vdXNlRXZlbnQgPSAvXig/Om1vdXNlfHBvaW50ZXJ8Y29udGV4dG1lbnV8ZHJhZ3xkcm9wKXxjbGljay8sXG5cdHJ0eXBlbmFtZXNwYWNlID0gL14oW14uXSopKD86XFwuKC4rKXwpLztcblxuZnVuY3Rpb24gcmV0dXJuVHJ1ZSgpIHtcblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJldHVybkZhbHNlKCkge1xuXHRyZXR1cm4gZmFsc2U7XG59XG5cbi8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG4vLyBTZWUgIzEzMzkzIGZvciBtb3JlIGluZm9cbmZ1bmN0aW9uIHNhZmVBY3RpdmVFbGVtZW50KCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHR9IGNhdGNoICggZXJyICkgeyB9XG59XG5cbmZ1bmN0aW9uIG9uKCBlbGVtLCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuLCBvbmUgKSB7XG5cdHZhciBvcmlnRm4sIHR5cGU7XG5cblx0Ly8gVHlwZXMgY2FuIGJlIGEgbWFwIG9mIHR5cGVzL2hhbmRsZXJzXG5cdGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0Ly8gKCB0eXBlcy1PYmplY3QsIHNlbGVjdG9yLCBkYXRhIClcblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcy1PYmplY3QsIGRhdGEgKVxuXHRcdFx0ZGF0YSA9IGRhdGEgfHwgc2VsZWN0b3I7XG5cdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0Zm9yICggdHlwZSBpbiB0eXBlcyApIHtcblx0XHRcdG9uKCBlbGVtLCB0eXBlLCBzZWxlY3RvciwgZGF0YSwgdHlwZXNbIHR5cGUgXSwgb25lICk7XG5cdFx0fVxuXHRcdHJldHVybiBlbGVtO1xuXHR9XG5cblx0aWYgKCBkYXRhID09IG51bGwgJiYgZm4gPT0gbnVsbCApIHtcblxuXHRcdC8vICggdHlwZXMsIGZuIClcblx0XHRmbiA9IHNlbGVjdG9yO1xuXHRcdGRhdGEgPSBzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICggZm4gPT0gbnVsbCApIHtcblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcywgc2VsZWN0b3IsIGZuIClcblx0XHRcdGZuID0gZGF0YTtcblx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gKCB0eXBlcywgZGF0YSwgZm4gKVxuXHRcdFx0Zm4gPSBkYXRhO1xuXHRcdFx0ZGF0YSA9IHNlbGVjdG9yO1xuXHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cdGlmICggZm4gPT09IGZhbHNlICkge1xuXHRcdGZuID0gcmV0dXJuRmFsc2U7XG5cdH0gZWxzZSBpZiAoICFmbiApIHtcblx0XHRyZXR1cm4gZWxlbTtcblx0fVxuXG5cdGlmICggb25lID09PSAxICkge1xuXHRcdG9yaWdGbiA9IGZuO1xuXHRcdGZuID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0XHQvLyBDYW4gdXNlIGFuIGVtcHR5IHNldCwgc2luY2UgZXZlbnQgY29udGFpbnMgdGhlIGluZm9cblx0XHRcdGpRdWVyeSgpLm9mZiggZXZlbnQgKTtcblx0XHRcdHJldHVybiBvcmlnRm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdH07XG5cblx0XHQvLyBVc2Ugc2FtZSBndWlkIHNvIGNhbGxlciBjYW4gcmVtb3ZlIHVzaW5nIG9yaWdGblxuXHRcdGZuLmd1aWQgPSBvcmlnRm4uZ3VpZCB8fCAoIG9yaWdGbi5ndWlkID0galF1ZXJ5Lmd1aWQrKyApO1xuXHR9XG5cdHJldHVybiBlbGVtLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIHR5cGVzLCBmbiwgZGF0YSwgc2VsZWN0b3IgKTtcblx0fSApO1xufVxuXG4vKlxuICogSGVscGVyIGZ1bmN0aW9ucyBmb3IgbWFuYWdpbmcgZXZlbnRzIC0tIG5vdCBwYXJ0IG9mIHRoZSBwdWJsaWMgaW50ZXJmYWNlLlxuICogUHJvcHMgdG8gRGVhbiBFZHdhcmRzJyBhZGRFdmVudCBsaWJyYXJ5IGZvciBtYW55IG9mIHRoZSBpZGVhcy5cbiAqL1xualF1ZXJ5LmV2ZW50ID0ge1xuXG5cdGdsb2JhbDoge30sXG5cblx0YWRkOiBmdW5jdGlvbiggZWxlbSwgdHlwZXMsIGhhbmRsZXIsIGRhdGEsIHNlbGVjdG9yICkge1xuXG5cdFx0dmFyIGhhbmRsZU9iakluLCBldmVudEhhbmRsZSwgdG1wLFxuXHRcdFx0ZXZlbnRzLCB0LCBoYW5kbGVPYmosXG5cdFx0XHRzcGVjaWFsLCBoYW5kbGVycywgdHlwZSwgbmFtZXNwYWNlcywgb3JpZ1R5cGUsXG5cdFx0XHRlbGVtRGF0YSA9IGRhdGFQcml2LmdldCggZWxlbSApO1xuXG5cdFx0Ly8gRG9uJ3QgYXR0YWNoIGV2ZW50cyB0byBub0RhdGEgb3IgdGV4dC9jb21tZW50IG5vZGVzIChidXQgYWxsb3cgcGxhaW4gb2JqZWN0cylcblx0XHRpZiAoICFlbGVtRGF0YSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYW4gb2JqZWN0IG9mIGN1c3RvbSBkYXRhIGluIGxpZXUgb2YgdGhlIGhhbmRsZXJcblx0XHRpZiAoIGhhbmRsZXIuaGFuZGxlciApIHtcblx0XHRcdGhhbmRsZU9iakluID0gaGFuZGxlcjtcblx0XHRcdGhhbmRsZXIgPSBoYW5kbGVPYmpJbi5oYW5kbGVyO1xuXHRcdFx0c2VsZWN0b3IgPSBoYW5kbGVPYmpJbi5zZWxlY3Rvcjtcblx0XHR9XG5cblx0XHQvLyBFbnN1cmUgdGhhdCBpbnZhbGlkIHNlbGVjdG9ycyB0aHJvdyBleGNlcHRpb25zIGF0IGF0dGFjaCB0aW1lXG5cdFx0Ly8gRXZhbHVhdGUgYWdhaW5zdCBkb2N1bWVudEVsZW1lbnQgaW4gY2FzZSBlbGVtIGlzIGEgbm9uLWVsZW1lbnQgbm9kZSAoZS5nLiwgZG9jdW1lbnQpXG5cdFx0aWYgKCBzZWxlY3RvciApIHtcblx0XHRcdGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggZG9jdW1lbnRFbGVtZW50LCBzZWxlY3RvciApO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBoYW5kbGVyIGhhcyBhIHVuaXF1ZSBJRCwgdXNlZCB0byBmaW5kL3JlbW92ZSBpdCBsYXRlclxuXHRcdGlmICggIWhhbmRsZXIuZ3VpZCApIHtcblx0XHRcdGhhbmRsZXIuZ3VpZCA9IGpRdWVyeS5ndWlkKys7XG5cdFx0fVxuXG5cdFx0Ly8gSW5pdCB0aGUgZWxlbWVudCdzIGV2ZW50IHN0cnVjdHVyZSBhbmQgbWFpbiBoYW5kbGVyLCBpZiB0aGlzIGlzIHRoZSBmaXJzdFxuXHRcdGlmICggISggZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzICkgKSB7XG5cdFx0XHRldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgPSB7fTtcblx0XHR9XG5cdFx0aWYgKCAhKCBldmVudEhhbmRsZSA9IGVsZW1EYXRhLmhhbmRsZSApICkge1xuXHRcdFx0ZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgPSBmdW5jdGlvbiggZSApIHtcblxuXHRcdFx0XHQvLyBEaXNjYXJkIHRoZSBzZWNvbmQgZXZlbnQgb2YgYSBqUXVlcnkuZXZlbnQudHJpZ2dlcigpIGFuZFxuXHRcdFx0XHQvLyB3aGVuIGFuIGV2ZW50IGlzIGNhbGxlZCBhZnRlciBhIHBhZ2UgaGFzIHVubG9hZGVkXG5cdFx0XHRcdHJldHVybiB0eXBlb2YgalF1ZXJ5ICE9PSBcInVuZGVmaW5lZFwiICYmIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgIT09IGUudHlwZSA/XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmRpc3BhdGNoLmFwcGx5KCBlbGVtLCBhcmd1bWVudHMgKSA6IHVuZGVmaW5lZDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlIG11bHRpcGxlIGV2ZW50cyBzZXBhcmF0ZWQgYnkgYSBzcGFjZVxuXHRcdHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbIFwiXCIgXTtcblx0XHR0ID0gdHlwZXMubGVuZ3RoO1xuXHRcdHdoaWxlICggdC0tICkge1xuXHRcdFx0dG1wID0gcnR5cGVuYW1lc3BhY2UuZXhlYyggdHlwZXNbIHQgXSApIHx8IFtdO1xuXHRcdFx0dHlwZSA9IG9yaWdUeXBlID0gdG1wWyAxIF07XG5cdFx0XHRuYW1lc3BhY2VzID0gKCB0bXBbIDIgXSB8fCBcIlwiICkuc3BsaXQoIFwiLlwiICkuc29ydCgpO1xuXG5cdFx0XHQvLyBUaGVyZSAqbXVzdCogYmUgYSB0eXBlLCBubyBhdHRhY2hpbmcgbmFtZXNwYWNlLW9ubHkgaGFuZGxlcnNcblx0XHRcdGlmICggIXR5cGUgKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBldmVudCBjaGFuZ2VzIGl0cyB0eXBlLCB1c2UgdGhlIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMgZm9yIHRoZSBjaGFuZ2VkIHR5cGVcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXG5cdFx0XHQvLyBJZiBzZWxlY3RvciBkZWZpbmVkLCBkZXRlcm1pbmUgc3BlY2lhbCBldmVudCBhcGkgdHlwZSwgb3RoZXJ3aXNlIGdpdmVuIHR5cGVcblx0XHRcdHR5cGUgPSAoIHNlbGVjdG9yID8gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgOiBzcGVjaWFsLmJpbmRUeXBlICkgfHwgdHlwZTtcblxuXHRcdFx0Ly8gVXBkYXRlIHNwZWNpYWwgYmFzZWQgb24gbmV3bHkgcmVzZXQgdHlwZVxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cblx0XHRcdC8vIGhhbmRsZU9iaiBpcyBwYXNzZWQgdG8gYWxsIGV2ZW50IGhhbmRsZXJzXG5cdFx0XHRoYW5kbGVPYmogPSBqUXVlcnkuZXh0ZW5kKCB7XG5cdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdG9yaWdUeXBlOiBvcmlnVHlwZSxcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0aGFuZGxlcjogaGFuZGxlcixcblx0XHRcdFx0Z3VpZDogaGFuZGxlci5ndWlkLFxuXHRcdFx0XHRzZWxlY3Rvcjogc2VsZWN0b3IsXG5cdFx0XHRcdG5lZWRzQ29udGV4dDogc2VsZWN0b3IgJiYgalF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9yICksXG5cdFx0XHRcdG5hbWVzcGFjZTogbmFtZXNwYWNlcy5qb2luKCBcIi5cIiApXG5cdFx0XHR9LCBoYW5kbGVPYmpJbiApO1xuXG5cdFx0XHQvLyBJbml0IHRoZSBldmVudCBoYW5kbGVyIHF1ZXVlIGlmIHdlJ3JlIHRoZSBmaXJzdFxuXHRcdFx0aWYgKCAhKCBoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdICkgKSB7XG5cdFx0XHRcdGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gPSBbXTtcblx0XHRcdFx0aGFuZGxlcnMuZGVsZWdhdGVDb3VudCA9IDA7XG5cblx0XHRcdFx0Ly8gT25seSB1c2UgYWRkRXZlbnRMaXN0ZW5lciBpZiB0aGUgc3BlY2lhbCBldmVudHMgaGFuZGxlciByZXR1cm5zIGZhbHNlXG5cdFx0XHRcdGlmICggIXNwZWNpYWwuc2V0dXAgfHxcblx0XHRcdFx0XHRzcGVjaWFsLnNldHVwLmNhbGwoIGVsZW0sIGRhdGEsIG5hbWVzcGFjZXMsIGV2ZW50SGFuZGxlICkgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdFx0aWYgKCBlbGVtLmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLmFkZEV2ZW50TGlzdGVuZXIoIHR5cGUsIGV2ZW50SGFuZGxlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICggc3BlY2lhbC5hZGQgKSB7XG5cdFx0XHRcdHNwZWNpYWwuYWRkLmNhbGwoIGVsZW0sIGhhbmRsZU9iaiApO1xuXG5cdFx0XHRcdGlmICggIWhhbmRsZU9iai5oYW5kbGVyLmd1aWQgKSB7XG5cdFx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCA9IGhhbmRsZXIuZ3VpZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgdG8gdGhlIGVsZW1lbnQncyBoYW5kbGVyIGxpc3QsIGRlbGVnYXRlcyBpbiBmcm9udFxuXHRcdFx0aWYgKCBzZWxlY3RvciApIHtcblx0XHRcdFx0aGFuZGxlcnMuc3BsaWNlKCBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50KyssIDAsIGhhbmRsZU9iaiApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGFuZGxlcnMucHVzaCggaGFuZGxlT2JqICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEtlZXAgdHJhY2sgb2Ygd2hpY2ggZXZlbnRzIGhhdmUgZXZlciBiZWVuIHVzZWQsIGZvciBldmVudCBvcHRpbWl6YXRpb25cblx0XHRcdGpRdWVyeS5ldmVudC5nbG9iYWxbIHR5cGUgXSA9IHRydWU7XG5cdFx0fVxuXG5cdH0sXG5cblx0Ly8gRGV0YWNoIGFuIGV2ZW50IG9yIHNldCBvZiBldmVudHMgZnJvbSBhbiBlbGVtZW50XG5cdHJlbW92ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBzZWxlY3RvciwgbWFwcGVkVHlwZXMgKSB7XG5cblx0XHR2YXIgaiwgb3JpZ0NvdW50LCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YVByaXYuaGFzRGF0YSggZWxlbSApICYmIGRhdGFQcml2LmdldCggZWxlbSApO1xuXG5cdFx0aWYgKCAhZWxlbURhdGEgfHwgISggZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzICkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gT25jZSBmb3IgZWFjaCB0eXBlLm5hbWVzcGFjZSBpbiB0eXBlczsgdHlwZSBtYXkgYmUgb21pdHRlZFxuXHRcdHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbIFwiXCIgXTtcblx0XHR0ID0gdHlwZXMubGVuZ3RoO1xuXHRcdHdoaWxlICggdC0tICkge1xuXHRcdFx0dG1wID0gcnR5cGVuYW1lc3BhY2UuZXhlYyggdHlwZXNbIHQgXSApIHx8IFtdO1xuXHRcdFx0dHlwZSA9IG9yaWdUeXBlID0gdG1wWyAxIF07XG5cdFx0XHRuYW1lc3BhY2VzID0gKCB0bXBbIDIgXSB8fCBcIlwiICkuc3BsaXQoIFwiLlwiICkuc29ydCgpO1xuXG5cdFx0XHQvLyBVbmJpbmQgYWxsIGV2ZW50cyAob24gdGhpcyBuYW1lc3BhY2UsIGlmIHByb3ZpZGVkKSBmb3IgdGhlIGVsZW1lbnRcblx0XHRcdGlmICggIXR5cGUgKSB7XG5cdFx0XHRcdGZvciAoIHR5cGUgaW4gZXZlbnRzICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKyB0eXBlc1sgdCBdLCBoYW5kbGVyLCBzZWxlY3RvciwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblx0XHRcdHR5cGUgPSAoIHNlbGVjdG9yID8gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgOiBzcGVjaWFsLmJpbmRUeXBlICkgfHwgdHlwZTtcblx0XHRcdGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gfHwgW107XG5cdFx0XHR0bXAgPSB0bXBbIDIgXSAmJlxuXHRcdFx0XHRuZXcgUmVnRXhwKCBcIihefFxcXFwuKVwiICsgbmFtZXNwYWNlcy5qb2luKCBcIlxcXFwuKD86LipcXFxcLnwpXCIgKSArIFwiKFxcXFwufCQpXCIgKTtcblxuXHRcdFx0Ly8gUmVtb3ZlIG1hdGNoaW5nIGV2ZW50c1xuXHRcdFx0b3JpZ0NvdW50ID0gaiA9IGhhbmRsZXJzLmxlbmd0aDtcblx0XHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0XHRoYW5kbGVPYmogPSBoYW5kbGVyc1sgaiBdO1xuXG5cdFx0XHRcdGlmICggKCBtYXBwZWRUeXBlcyB8fCBvcmlnVHlwZSA9PT0gaGFuZGxlT2JqLm9yaWdUeXBlICkgJiZcblx0XHRcdFx0XHQoICFoYW5kbGVyIHx8IGhhbmRsZXIuZ3VpZCA9PT0gaGFuZGxlT2JqLmd1aWQgKSAmJlxuXHRcdFx0XHRcdCggIXRtcCB8fCB0bXAudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkgJiZcblx0XHRcdFx0XHQoICFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gaGFuZGxlT2JqLnNlbGVjdG9yIHx8XG5cdFx0XHRcdFx0XHRzZWxlY3RvciA9PT0gXCIqKlwiICYmIGhhbmRsZU9iai5zZWxlY3RvciApICkge1xuXHRcdFx0XHRcdGhhbmRsZXJzLnNwbGljZSggaiwgMSApO1xuXG5cdFx0XHRcdFx0aWYgKCBoYW5kbGVPYmouc2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LS07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggc3BlY2lhbC5yZW1vdmUgKSB7XG5cdFx0XHRcdFx0XHRzcGVjaWFsLnJlbW92ZS5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIGdlbmVyaWMgZXZlbnQgaGFuZGxlciBpZiB3ZSByZW1vdmVkIHNvbWV0aGluZyBhbmQgbm8gbW9yZSBoYW5kbGVycyBleGlzdFxuXHRcdFx0Ly8gKGF2b2lkcyBwb3RlbnRpYWwgZm9yIGVuZGxlc3MgcmVjdXJzaW9uIGR1cmluZyByZW1vdmFsIG9mIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMpXG5cdFx0XHRpZiAoIG9yaWdDb3VudCAmJiAhaGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0XHRpZiAoICFzcGVjaWFsLnRlYXJkb3duIHx8XG5cdFx0XHRcdFx0c3BlY2lhbC50ZWFyZG93bi5jYWxsKCBlbGVtLCBuYW1lc3BhY2VzLCBlbGVtRGF0YS5oYW5kbGUgKSA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0XHRqUXVlcnkucmVtb3ZlRXZlbnQoIGVsZW0sIHR5cGUsIGVsZW1EYXRhLmhhbmRsZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGVsZXRlIGV2ZW50c1sgdHlwZSBdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSBkYXRhIGFuZCB0aGUgZXhwYW5kbyBpZiBpdCdzIG5vIGxvbmdlciB1c2VkXG5cdFx0aWYgKCBqUXVlcnkuaXNFbXB0eU9iamVjdCggZXZlbnRzICkgKSB7XG5cdFx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIFwiaGFuZGxlIGV2ZW50c1wiICk7XG5cdFx0fVxuXHR9LFxuXG5cdGRpc3BhdGNoOiBmdW5jdGlvbiggbmF0aXZlRXZlbnQgKSB7XG5cblx0XHQvLyBNYWtlIGEgd3JpdGFibGUgalF1ZXJ5LkV2ZW50IGZyb20gdGhlIG5hdGl2ZSBldmVudCBvYmplY3Rcblx0XHR2YXIgZXZlbnQgPSBqUXVlcnkuZXZlbnQuZml4KCBuYXRpdmVFdmVudCApO1xuXG5cdFx0dmFyIGksIGosIHJldCwgbWF0Y2hlZCwgaGFuZGxlT2JqLCBoYW5kbGVyUXVldWUsXG5cdFx0XHRhcmdzID0gbmV3IEFycmF5KCBhcmd1bWVudHMubGVuZ3RoICksXG5cdFx0XHRoYW5kbGVycyA9ICggZGF0YVByaXYuZ2V0KCB0aGlzLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdIHx8IFtdLFxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyBldmVudC50eXBlIF0gfHwge307XG5cblx0XHQvLyBVc2UgdGhlIGZpeC1lZCBqUXVlcnkuRXZlbnQgcmF0aGVyIHRoYW4gdGhlIChyZWFkLW9ubHkpIG5hdGl2ZSBldmVudFxuXHRcdGFyZ3NbIDAgXSA9IGV2ZW50O1xuXG5cdFx0Zm9yICggaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRhcmdzWyBpIF0gPSBhcmd1bWVudHNbIGkgXTtcblx0XHR9XG5cblx0XHRldmVudC5kZWxlZ2F0ZVRhcmdldCA9IHRoaXM7XG5cblx0XHQvLyBDYWxsIHRoZSBwcmVEaXNwYXRjaCBob29rIGZvciB0aGUgbWFwcGVkIHR5cGUsIGFuZCBsZXQgaXQgYmFpbCBpZiBkZXNpcmVkXG5cdFx0aWYgKCBzcGVjaWFsLnByZURpc3BhdGNoICYmIHNwZWNpYWwucHJlRGlzcGF0Y2guY2FsbCggdGhpcywgZXZlbnQgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZXJtaW5lIGhhbmRsZXJzXG5cdFx0aGFuZGxlclF1ZXVlID0galF1ZXJ5LmV2ZW50LmhhbmRsZXJzLmNhbGwoIHRoaXMsIGV2ZW50LCBoYW5kbGVycyApO1xuXG5cdFx0Ly8gUnVuIGRlbGVnYXRlcyBmaXJzdDsgdGhleSBtYXkgd2FudCB0byBzdG9wIHByb3BhZ2F0aW9uIGJlbmVhdGggdXNcblx0XHRpID0gMDtcblx0XHR3aGlsZSAoICggbWF0Y2hlZCA9IGhhbmRsZXJRdWV1ZVsgaSsrIF0gKSAmJiAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblx0XHRcdGV2ZW50LmN1cnJlbnRUYXJnZXQgPSBtYXRjaGVkLmVsZW07XG5cblx0XHRcdGogPSAwO1xuXHRcdFx0d2hpbGUgKCAoIGhhbmRsZU9iaiA9IG1hdGNoZWQuaGFuZGxlcnNbIGorKyBdICkgJiZcblx0XHRcdFx0IWV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cblx0XHRcdFx0Ly8gVHJpZ2dlcmVkIGV2ZW50IG11c3QgZWl0aGVyIDEpIGhhdmUgbm8gbmFtZXNwYWNlLCBvciAyKSBoYXZlIG5hbWVzcGFjZShzKVxuXHRcdFx0XHQvLyBhIHN1YnNldCBvciBlcXVhbCB0byB0aG9zZSBpbiB0aGUgYm91bmQgZXZlbnQgKGJvdGggY2FuIGhhdmUgbm8gbmFtZXNwYWNlKS5cblx0XHRcdFx0aWYgKCAhZXZlbnQucm5hbWVzcGFjZSB8fCBldmVudC5ybmFtZXNwYWNlLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApIHtcblxuXHRcdFx0XHRcdGV2ZW50LmhhbmRsZU9iaiA9IGhhbmRsZU9iajtcblx0XHRcdFx0XHRldmVudC5kYXRhID0gaGFuZGxlT2JqLmRhdGE7XG5cblx0XHRcdFx0XHRyZXQgPSAoICggalF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGhhbmRsZU9iai5vcmlnVHlwZSBdIHx8IHt9ICkuaGFuZGxlIHx8XG5cdFx0XHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlciApLmFwcGx5KCBtYXRjaGVkLmVsZW0sIGFyZ3MgKTtcblxuXHRcdFx0XHRcdGlmICggcmV0ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggZXZlbnQucmVzdWx0ID0gcmV0ICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWxsIHRoZSBwb3N0RGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlXG5cdFx0aWYgKCBzcGVjaWFsLnBvc3REaXNwYXRjaCApIHtcblx0XHRcdHNwZWNpYWwucG9zdERpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHRoYW5kbGVyczogZnVuY3Rpb24oIGV2ZW50LCBoYW5kbGVycyApIHtcblx0XHR2YXIgaSwgaGFuZGxlT2JqLCBzZWwsIG1hdGNoZWRIYW5kbGVycywgbWF0Y2hlZFNlbGVjdG9ycyxcblx0XHRcdGhhbmRsZXJRdWV1ZSA9IFtdLFxuXHRcdFx0ZGVsZWdhdGVDb3VudCA9IGhhbmRsZXJzLmRlbGVnYXRlQ291bnQsXG5cdFx0XHRjdXIgPSBldmVudC50YXJnZXQ7XG5cblx0XHQvLyBGaW5kIGRlbGVnYXRlIGhhbmRsZXJzXG5cdFx0aWYgKCBkZWxlZ2F0ZUNvdW50ICYmXG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OVxuXHRcdFx0Ly8gQmxhY2staG9sZSBTVkcgPHVzZT4gaW5zdGFuY2UgdHJlZXMgKHRyYWMtMTMxODApXG5cdFx0XHRjdXIubm9kZVR5cGUgJiZcblxuXHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveCA8PTQyXG5cdFx0XHQvLyBTdXBwcmVzcyBzcGVjLXZpb2xhdGluZyBjbGlja3MgaW5kaWNhdGluZyBhIG5vbi1wcmltYXJ5IHBvaW50ZXIgYnV0dG9uICh0cmFjLTM4NjEpXG5cdFx0XHQvLyBodHRwczovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLyNldmVudC10eXBlLWNsaWNrXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSBvbmx5XG5cdFx0XHQvLyAuLi5idXQgbm90IGFycm93IGtleSBcImNsaWNrc1wiIG9mIHJhZGlvIGlucHV0cywgd2hpY2ggY2FuIGhhdmUgYGJ1dHRvbmAgLTEgKGdoLTIzNDMpXG5cdFx0XHQhKCBldmVudC50eXBlID09PSBcImNsaWNrXCIgJiYgZXZlbnQuYnV0dG9uID49IDEgKSApIHtcblxuXHRcdFx0Zm9yICggOyBjdXIgIT09IHRoaXM7IGN1ciA9IGN1ci5wYXJlbnROb2RlIHx8IHRoaXMgKSB7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgY2hlY2sgbm9uLWVsZW1lbnRzICgjMTMyMDgpXG5cdFx0XHRcdC8vIERvbid0IHByb2Nlc3MgY2xpY2tzIG9uIGRpc2FibGVkIGVsZW1lbnRzICgjNjkxMSwgIzgxNjUsICMxMTM4MiwgIzExNzY0KVxuXHRcdFx0XHRpZiAoIGN1ci5ub2RlVHlwZSA9PT0gMSAmJiAhKCBldmVudC50eXBlID09PSBcImNsaWNrXCIgJiYgY3VyLmRpc2FibGVkID09PSB0cnVlICkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlZEhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0bWF0Y2hlZFNlbGVjdG9ycyA9IHt9O1xuXHRcdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgZGVsZWdhdGVDb3VudDsgaSsrICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlT2JqID0gaGFuZGxlcnNbIGkgXTtcblxuXHRcdFx0XHRcdFx0Ly8gRG9uJ3QgY29uZmxpY3Qgd2l0aCBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKCMxMzIwMylcblx0XHRcdFx0XHRcdHNlbCA9IGhhbmRsZU9iai5zZWxlY3RvciArIFwiIFwiO1xuXG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZWRTZWxlY3RvcnNbIHNlbCBdID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRcdG1hdGNoZWRTZWxlY3RvcnNbIHNlbCBdID0gaGFuZGxlT2JqLm5lZWRzQ29udGV4dCA/XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KCBzZWwsIHRoaXMgKS5pbmRleCggY3VyICkgPiAtMSA6XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmZpbmQoIHNlbCwgdGhpcywgbnVsbCwgWyBjdXIgXSApLmxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlZFNlbGVjdG9yc1sgc2VsIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG1hdGNoZWRIYW5kbGVycy5wdXNoKCBoYW5kbGVPYmogKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBtYXRjaGVkSGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlclF1ZXVlLnB1c2goIHsgZWxlbTogY3VyLCBoYW5kbGVyczogbWF0Y2hlZEhhbmRsZXJzIH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBBZGQgdGhlIHJlbWFpbmluZyAoZGlyZWN0bHktYm91bmQpIGhhbmRsZXJzXG5cdFx0Y3VyID0gdGhpcztcblx0XHRpZiAoIGRlbGVnYXRlQ291bnQgPCBoYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRoYW5kbGVyUXVldWUucHVzaCggeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBoYW5kbGVycy5zbGljZSggZGVsZWdhdGVDb3VudCApIH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlclF1ZXVlO1xuXHR9LFxuXG5cdGFkZFByb3A6IGZ1bmN0aW9uKCBuYW1lLCBob29rICkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggalF1ZXJ5LkV2ZW50LnByb3RvdHlwZSwgbmFtZSwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblxuXHRcdFx0Z2V0OiBqUXVlcnkuaXNGdW5jdGlvbiggaG9vayApID9cblx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLm9yaWdpbmFsRXZlbnQgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBob29rKCB0aGlzLm9yaWdpbmFsRXZlbnQgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gOlxuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMub3JpZ2luYWxFdmVudFsgbmFtZSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggdGhpcywgbmFtZSwge1xuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGZpeDogZnVuY3Rpb24oIG9yaWdpbmFsRXZlbnQgKSB7XG5cdFx0cmV0dXJuIG9yaWdpbmFsRXZlbnRbIGpRdWVyeS5leHBhbmRvIF0gP1xuXHRcdFx0b3JpZ2luYWxFdmVudCA6XG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCBvcmlnaW5hbEV2ZW50ICk7XG5cdH0sXG5cblx0c3BlY2lhbDoge1xuXHRcdGxvYWQ6IHtcblxuXHRcdFx0Ly8gUHJldmVudCB0cmlnZ2VyZWQgaW1hZ2UubG9hZCBldmVudHMgZnJvbSBidWJibGluZyB0byB3aW5kb3cubG9hZFxuXHRcdFx0bm9CdWJibGU6IHRydWVcblx0XHR9LFxuXHRcdGZvY3VzOiB7XG5cblx0XHRcdC8vIEZpcmUgbmF0aXZlIGV2ZW50IGlmIHBvc3NpYmxlIHNvIGJsdXIvZm9jdXMgc2VxdWVuY2UgaXMgY29ycmVjdFxuXHRcdFx0dHJpZ2dlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcyAhPT0gc2FmZUFjdGl2ZUVsZW1lbnQoKSAmJiB0aGlzLmZvY3VzICkge1xuXHRcdFx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWxlZ2F0ZVR5cGU6IFwiZm9jdXNpblwiXG5cdFx0fSxcblx0XHRibHVyOiB7XG5cdFx0XHR0cmlnZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCB0aGlzID09PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuYmx1ciApIHtcblx0XHRcdFx0XHR0aGlzLmJsdXIoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWxlZ2F0ZVR5cGU6IFwiZm9jdXNvdXRcIlxuXHRcdH0sXG5cdFx0Y2xpY2s6IHtcblxuXHRcdFx0Ly8gRm9yIGNoZWNrYm94LCBmaXJlIG5hdGl2ZSBldmVudCBzbyBjaGVja2VkIHN0YXRlIHdpbGwgYmUgcmlnaHRcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMudHlwZSA9PT0gXCJjaGVja2JveFwiICYmIHRoaXMuY2xpY2sgJiYgalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImlucHV0XCIgKSApIHtcblx0XHRcdFx0XHR0aGlzLmNsaWNrKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBGb3IgY3Jvc3MtYnJvd3NlciBjb25zaXN0ZW5jeSwgZG9uJ3QgZmlyZSBuYXRpdmUgLmNsaWNrKCkgb24gbGlua3Ncblx0XHRcdF9kZWZhdWx0OiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdHJldHVybiBqUXVlcnkubm9kZU5hbWUoIGV2ZW50LnRhcmdldCwgXCJhXCIgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YmVmb3JldW5sb2FkOiB7XG5cdFx0XHRwb3N0RGlzcGF0Y2g6IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDIwK1xuXHRcdFx0XHQvLyBGaXJlZm94IGRvZXNuJ3QgYWxlcnQgaWYgdGhlIHJldHVyblZhbHVlIGZpZWxkIGlzIG5vdCBzZXQuXG5cdFx0XHRcdGlmICggZXZlbnQucmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgZXZlbnQub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRldmVudC5vcmlnaW5hbEV2ZW50LnJldHVyblZhbHVlID0gZXZlbnQucmVzdWx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG5qUXVlcnkucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiggZWxlbSwgdHlwZSwgaGFuZGxlICkge1xuXG5cdC8vIFRoaXMgXCJpZlwiIGlzIG5lZWRlZCBmb3IgcGxhaW4gb2JqZWN0c1xuXHRpZiAoIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcblx0XHRlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGUsIGhhbmRsZSApO1xuXHR9XG59O1xuXG5qUXVlcnkuRXZlbnQgPSBmdW5jdGlvbiggc3JjLCBwcm9wcyApIHtcblxuXHQvLyBBbGxvdyBpbnN0YW50aWF0aW9uIHdpdGhvdXQgdGhlICduZXcnIGtleXdvcmRcblx0aWYgKCAhKCB0aGlzIGluc3RhbmNlb2YgalF1ZXJ5LkV2ZW50ICkgKSB7XG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuRXZlbnQoIHNyYywgcHJvcHMgKTtcblx0fVxuXG5cdC8vIEV2ZW50IG9iamVjdFxuXHRpZiAoIHNyYyAmJiBzcmMudHlwZSApIHtcblx0XHR0aGlzLm9yaWdpbmFsRXZlbnQgPSBzcmM7XG5cdFx0dGhpcy50eXBlID0gc3JjLnR5cGU7XG5cblx0XHQvLyBFdmVudHMgYnViYmxpbmcgdXAgdGhlIGRvY3VtZW50IG1heSBoYXZlIGJlZW4gbWFya2VkIGFzIHByZXZlbnRlZFxuXHRcdC8vIGJ5IGEgaGFuZGxlciBsb3dlciBkb3duIHRoZSB0cmVlOyByZWZsZWN0IHRoZSBjb3JyZWN0IHZhbHVlLlxuXHRcdHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gc3JjLmRlZmF1bHRQcmV2ZW50ZWQgfHxcblx0XHRcdFx0c3JjLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHVuZGVmaW5lZCAmJlxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD0yLjMgb25seVxuXHRcdFx0XHRzcmMucmV0dXJuVmFsdWUgPT09IGZhbHNlID9cblx0XHRcdHJldHVyblRydWUgOlxuXHRcdFx0cmV0dXJuRmFsc2U7XG5cblx0XHQvLyBDcmVhdGUgdGFyZ2V0IHByb3BlcnRpZXNcblx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgPD02IC0gNyBvbmx5XG5cdFx0Ly8gVGFyZ2V0IHNob3VsZCBub3QgYmUgYSB0ZXh0IG5vZGUgKCM1MDQsICMxMzE0Mylcblx0XHR0aGlzLnRhcmdldCA9ICggc3JjLnRhcmdldCAmJiBzcmMudGFyZ2V0Lm5vZGVUeXBlID09PSAzICkgP1xuXHRcdFx0c3JjLnRhcmdldC5wYXJlbnROb2RlIDpcblx0XHRcdHNyYy50YXJnZXQ7XG5cblx0XHR0aGlzLmN1cnJlbnRUYXJnZXQgPSBzcmMuY3VycmVudFRhcmdldDtcblx0XHR0aGlzLnJlbGF0ZWRUYXJnZXQgPSBzcmMucmVsYXRlZFRhcmdldDtcblxuXHQvLyBFdmVudCB0eXBlXG5cdH0gZWxzZSB7XG5cdFx0dGhpcy50eXBlID0gc3JjO1xuXHR9XG5cblx0Ly8gUHV0IGV4cGxpY2l0bHkgcHJvdmlkZWQgcHJvcGVydGllcyBvbnRvIHRoZSBldmVudCBvYmplY3Rcblx0aWYgKCBwcm9wcyApIHtcblx0XHRqUXVlcnkuZXh0ZW5kKCB0aGlzLCBwcm9wcyApO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgdGltZXN0YW1wIGlmIGluY29taW5nIGV2ZW50IGRvZXNuJ3QgaGF2ZSBvbmVcblx0dGhpcy50aW1lU3RhbXAgPSBzcmMgJiYgc3JjLnRpbWVTdGFtcCB8fCBqUXVlcnkubm93KCk7XG5cblx0Ly8gTWFyayBpdCBhcyBmaXhlZFxuXHR0aGlzWyBqUXVlcnkuZXhwYW5kbyBdID0gdHJ1ZTtcbn07XG5cbi8vIGpRdWVyeS5FdmVudCBpcyBiYXNlZCBvbiBET00zIEV2ZW50cyBhcyBzcGVjaWZpZWQgYnkgdGhlIEVDTUFTY3JpcHQgTGFuZ3VhZ2UgQmluZGluZ1xuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMDMvV0QtRE9NLUxldmVsLTMtRXZlbnRzLTIwMDMwMzMxL2VjbWEtc2NyaXB0LWJpbmRpbmcuaHRtbFxualF1ZXJ5LkV2ZW50LnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IGpRdWVyeS5FdmVudCxcblx0aXNEZWZhdWx0UHJldmVudGVkOiByZXR1cm5GYWxzZSxcblx0aXNQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxuXHRpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG5cdGlzU2ltdWxhdGVkOiBmYWxzZSxcblxuXHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9LFxuXHRzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG5cdFx0dGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0fSxcblx0c3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5UcnVlO1xuXG5cdFx0aWYgKCBlICYmICF0aGlzLmlzU2ltdWxhdGVkICkge1xuXHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cblx0XHR0aGlzLnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9XG59O1xuXG4vLyBJbmNsdWRlcyBhbGwgY29tbW9uIGV2ZW50IHByb3BzIGluY2x1ZGluZyBLZXlFdmVudCBhbmQgTW91c2VFdmVudCBzcGVjaWZpYyBwcm9wc1xualF1ZXJ5LmVhY2goIHtcblx0YWx0S2V5OiB0cnVlLFxuXHRidWJibGVzOiB0cnVlLFxuXHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRjaGFuZ2VkVG91Y2hlczogdHJ1ZSxcblx0Y3RybEtleTogdHJ1ZSxcblx0ZGV0YWlsOiB0cnVlLFxuXHRldmVudFBoYXNlOiB0cnVlLFxuXHRtZXRhS2V5OiB0cnVlLFxuXHRwYWdlWDogdHJ1ZSxcblx0cGFnZVk6IHRydWUsXG5cdHNoaWZ0S2V5OiB0cnVlLFxuXHR2aWV3OiB0cnVlLFxuXHRcImNoYXJcIjogdHJ1ZSxcblx0Y2hhckNvZGU6IHRydWUsXG5cdGtleTogdHJ1ZSxcblx0a2V5Q29kZTogdHJ1ZSxcblx0YnV0dG9uOiB0cnVlLFxuXHRidXR0b25zOiB0cnVlLFxuXHRjbGllbnRYOiB0cnVlLFxuXHRjbGllbnRZOiB0cnVlLFxuXHRvZmZzZXRYOiB0cnVlLFxuXHRvZmZzZXRZOiB0cnVlLFxuXHRwb2ludGVySWQ6IHRydWUsXG5cdHBvaW50ZXJUeXBlOiB0cnVlLFxuXHRzY3JlZW5YOiB0cnVlLFxuXHRzY3JlZW5ZOiB0cnVlLFxuXHR0YXJnZXRUb3VjaGVzOiB0cnVlLFxuXHR0b0VsZW1lbnQ6IHRydWUsXG5cdHRvdWNoZXM6IHRydWUsXG5cblx0d2hpY2g6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHR2YXIgYnV0dG9uID0gZXZlbnQuYnV0dG9uO1xuXG5cdFx0Ly8gQWRkIHdoaWNoIGZvciBrZXkgZXZlbnRzXG5cdFx0aWYgKCBldmVudC53aGljaCA9PSBudWxsICYmIHJrZXlFdmVudC50ZXN0KCBldmVudC50eXBlICkgKSB7XG5cdFx0XHRyZXR1cm4gZXZlbnQuY2hhckNvZGUgIT0gbnVsbCA/IGV2ZW50LmNoYXJDb2RlIDogZXZlbnQua2V5Q29kZTtcblx0XHR9XG5cblx0XHQvLyBBZGQgd2hpY2ggZm9yIGNsaWNrOiAxID09PSBsZWZ0OyAyID09PSBtaWRkbGU7IDMgPT09IHJpZ2h0XG5cdFx0aWYgKCAhZXZlbnQud2hpY2ggJiYgYnV0dG9uICE9PSB1bmRlZmluZWQgJiYgcm1vdXNlRXZlbnQudGVzdCggZXZlbnQudHlwZSApICkge1xuXHRcdFx0aWYgKCBidXR0b24gJiAxICkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBidXR0b24gJiAyICkge1xuXHRcdFx0XHRyZXR1cm4gMztcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBidXR0b24gJiA0ICkge1xuXHRcdFx0XHRyZXR1cm4gMjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LndoaWNoO1xuXHR9XG59LCBqUXVlcnkuZXZlbnQuYWRkUHJvcCApO1xuXG4vLyBDcmVhdGUgbW91c2VlbnRlci9sZWF2ZSBldmVudHMgdXNpbmcgbW91c2VvdmVyL291dCBhbmQgZXZlbnQtdGltZSBjaGVja3Ncbi8vIHNvIHRoYXQgZXZlbnQgZGVsZWdhdGlvbiB3b3JrcyBpbiBqUXVlcnkuXG4vLyBEbyB0aGUgc2FtZSBmb3IgcG9pbnRlcmVudGVyL3BvaW50ZXJsZWF2ZSBhbmQgcG9pbnRlcm92ZXIvcG9pbnRlcm91dFxuLy9cbi8vIFN1cHBvcnQ6IFNhZmFyaSA3IG9ubHlcbi8vIFNhZmFyaSBzZW5kcyBtb3VzZWVudGVyIHRvbyBvZnRlbjsgc2VlOlxuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDcwMjU4XG4vLyBmb3IgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBidWcgKGl0IGV4aXN0ZWQgaW4gb2xkZXIgQ2hyb21lIHZlcnNpb25zIGFzIHdlbGwpLlxualF1ZXJ5LmVhY2goIHtcblx0bW91c2VlbnRlcjogXCJtb3VzZW92ZXJcIixcblx0bW91c2VsZWF2ZTogXCJtb3VzZW91dFwiLFxuXHRwb2ludGVyZW50ZXI6IFwicG9pbnRlcm92ZXJcIixcblx0cG9pbnRlcmxlYXZlOiBcInBvaW50ZXJvdXRcIlxufSwgZnVuY3Rpb24oIG9yaWcsIGZpeCApIHtcblx0alF1ZXJ5LmV2ZW50LnNwZWNpYWxbIG9yaWcgXSA9IHtcblx0XHRkZWxlZ2F0ZVR5cGU6IGZpeCxcblx0XHRiaW5kVHlwZTogZml4LFxuXG5cdFx0aGFuZGxlOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHR2YXIgcmV0LFxuXHRcdFx0XHR0YXJnZXQgPSB0aGlzLFxuXHRcdFx0XHRyZWxhdGVkID0gZXZlbnQucmVsYXRlZFRhcmdldCxcblx0XHRcdFx0aGFuZGxlT2JqID0gZXZlbnQuaGFuZGxlT2JqO1xuXG5cdFx0XHQvLyBGb3IgbW91c2VlbnRlci9sZWF2ZSBjYWxsIHRoZSBoYW5kbGVyIGlmIHJlbGF0ZWQgaXMgb3V0c2lkZSB0aGUgdGFyZ2V0LlxuXHRcdFx0Ly8gTkI6IE5vIHJlbGF0ZWRUYXJnZXQgaWYgdGhlIG1vdXNlIGxlZnQvZW50ZXJlZCB0aGUgYnJvd3NlciB3aW5kb3dcblx0XHRcdGlmICggIXJlbGF0ZWQgfHwgKCByZWxhdGVkICE9PSB0YXJnZXQgJiYgIWpRdWVyeS5jb250YWlucyggdGFyZ2V0LCByZWxhdGVkICkgKSApIHtcblx0XHRcdFx0ZXZlbnQudHlwZSA9IGhhbmRsZU9iai5vcmlnVHlwZTtcblx0XHRcdFx0cmV0ID0gaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRldmVudC50eXBlID0gZml4O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9XG5cdH07XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblxuXHRvbjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIG9uKCB0aGlzLCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuICk7XG5cdH0sXG5cdG9uZTogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIG9uKCB0aGlzLCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuLCAxICk7XG5cdH0sXG5cdG9mZjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZm4gKSB7XG5cdFx0dmFyIGhhbmRsZU9iaiwgdHlwZTtcblx0XHRpZiAoIHR5cGVzICYmIHR5cGVzLnByZXZlbnREZWZhdWx0ICYmIHR5cGVzLmhhbmRsZU9iaiApIHtcblxuXHRcdFx0Ly8gKCBldmVudCApICBkaXNwYXRjaGVkIGpRdWVyeS5FdmVudFxuXHRcdFx0aGFuZGxlT2JqID0gdHlwZXMuaGFuZGxlT2JqO1xuXHRcdFx0alF1ZXJ5KCB0eXBlcy5kZWxlZ2F0ZVRhcmdldCApLm9mZihcblx0XHRcdFx0aGFuZGxlT2JqLm5hbWVzcGFjZSA/XG5cdFx0XHRcdFx0aGFuZGxlT2JqLm9yaWdUeXBlICsgXCIuXCIgKyBoYW5kbGVPYmoubmFtZXNwYWNlIDpcblx0XHRcdFx0XHRoYW5kbGVPYmoub3JpZ1R5cGUsXG5cdFx0XHRcdGhhbmRsZU9iai5zZWxlY3Rvcixcblx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXJcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdFx0aWYgKCB0eXBlb2YgdHlwZXMgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMtb2JqZWN0IFssIHNlbGVjdG9yXSApXG5cdFx0XHRmb3IgKCB0eXBlIGluIHR5cGVzICkge1xuXHRcdFx0XHR0aGlzLm9mZiggdHlwZSwgc2VsZWN0b3IsIHR5cGVzWyB0eXBlIF0gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRpZiAoIHNlbGVjdG9yID09PSBmYWxzZSB8fCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcyBbLCBmbl0gKVxuXHRcdFx0Zm4gPSBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRpZiAoIGZuID09PSBmYWxzZSApIHtcblx0XHRcdGZuID0gcmV0dXJuRmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggdGhpcywgdHlwZXMsIGZuLCBzZWxlY3RvciApO1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG5cbnZhclxuXG5cdC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cblxuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzbGludC9lc2xpbnQvaXNzdWVzLzMyMjlcblx0cnhodG1sVGFnID0gLzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW2Etel1bXlxcL1xcMD5cXHgyMFxcdFxcclxcblxcZl0qKVtePl0qKVxcLz4vZ2ksXG5cblx0LyogZXNsaW50LWVuYWJsZSAqL1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9MTAgLSAxMSwgRWRnZSAxMiAtIDEzXG5cdC8vIEluIElFL0VkZ2UgdXNpbmcgcmVnZXggZ3JvdXBzIGhlcmUgY2F1c2VzIHNldmVyZSBzbG93ZG93bnMuXG5cdC8vIFNlZSBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzE3MzY1MTIvXG5cdHJub0lubmVyaHRtbCA9IC88c2NyaXB0fDxzdHlsZXw8bGluay9pLFxuXG5cdC8vIGNoZWNrZWQ9XCJjaGVja2VkXCIgb3IgY2hlY2tlZFxuXHRyY2hlY2tlZCA9IC9jaGVja2VkXFxzKig/OltePV18PVxccyouY2hlY2tlZC4pL2ksXG5cdHJzY3JpcHRUeXBlTWFza2VkID0gL150cnVlXFwvKC4qKS8sXG5cdHJjbGVhblNjcmlwdCA9IC9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZztcblxuZnVuY3Rpb24gbWFuaXB1bGF0aW9uVGFyZ2V0KCBlbGVtLCBjb250ZW50ICkge1xuXHRpZiAoIGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJ0YWJsZVwiICkgJiZcblx0XHRqUXVlcnkubm9kZU5hbWUoIGNvbnRlbnQubm9kZVR5cGUgIT09IDExID8gY29udGVudCA6IGNvbnRlbnQuZmlyc3RDaGlsZCwgXCJ0clwiICkgKSB7XG5cblx0XHRyZXR1cm4gZWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJ0Ym9keVwiIClbIDAgXSB8fCBlbGVtO1xuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbi8vIFJlcGxhY2UvcmVzdG9yZSB0aGUgdHlwZSBhdHRyaWJ1dGUgb2Ygc2NyaXB0IGVsZW1lbnRzIGZvciBzYWZlIERPTSBtYW5pcHVsYXRpb25cbmZ1bmN0aW9uIGRpc2FibGVTY3JpcHQoIGVsZW0gKSB7XG5cdGVsZW0udHlwZSA9ICggZWxlbS5nZXRBdHRyaWJ1dGUoIFwidHlwZVwiICkgIT09IG51bGwgKSArIFwiL1wiICsgZWxlbS50eXBlO1xuXHRyZXR1cm4gZWxlbTtcbn1cbmZ1bmN0aW9uIHJlc3RvcmVTY3JpcHQoIGVsZW0gKSB7XG5cdHZhciBtYXRjaCA9IHJzY3JpcHRUeXBlTWFza2VkLmV4ZWMoIGVsZW0udHlwZSApO1xuXG5cdGlmICggbWF0Y2ggKSB7XG5cdFx0ZWxlbS50eXBlID0gbWF0Y2hbIDEgXTtcblx0fSBlbHNlIHtcblx0XHRlbGVtLnJlbW92ZUF0dHJpYnV0ZSggXCJ0eXBlXCIgKTtcblx0fVxuXG5cdHJldHVybiBlbGVtO1xufVxuXG5mdW5jdGlvbiBjbG9uZUNvcHlFdmVudCggc3JjLCBkZXN0ICkge1xuXHR2YXIgaSwgbCwgdHlwZSwgcGRhdGFPbGQsIHBkYXRhQ3VyLCB1ZGF0YU9sZCwgdWRhdGFDdXIsIGV2ZW50cztcblxuXHRpZiAoIGRlc3Qubm9kZVR5cGUgIT09IDEgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gMS4gQ29weSBwcml2YXRlIGRhdGE6IGV2ZW50cywgaGFuZGxlcnMsIGV0Yy5cblx0aWYgKCBkYXRhUHJpdi5oYXNEYXRhKCBzcmMgKSApIHtcblx0XHRwZGF0YU9sZCA9IGRhdGFQcml2LmFjY2Vzcyggc3JjICk7XG5cdFx0cGRhdGFDdXIgPSBkYXRhUHJpdi5zZXQoIGRlc3QsIHBkYXRhT2xkICk7XG5cdFx0ZXZlbnRzID0gcGRhdGFPbGQuZXZlbnRzO1xuXG5cdFx0aWYgKCBldmVudHMgKSB7XG5cdFx0XHRkZWxldGUgcGRhdGFDdXIuaGFuZGxlO1xuXHRcdFx0cGRhdGFDdXIuZXZlbnRzID0ge307XG5cblx0XHRcdGZvciAoIHR5cGUgaW4gZXZlbnRzICkge1xuXHRcdFx0XHRmb3IgKCBpID0gMCwgbCA9IGV2ZW50c1sgdHlwZSBdLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQuYWRkKCBkZXN0LCB0eXBlLCBldmVudHNbIHR5cGUgXVsgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyAyLiBDb3B5IHVzZXIgZGF0YVxuXHRpZiAoIGRhdGFVc2VyLmhhc0RhdGEoIHNyYyApICkge1xuXHRcdHVkYXRhT2xkID0gZGF0YVVzZXIuYWNjZXNzKCBzcmMgKTtcblx0XHR1ZGF0YUN1ciA9IGpRdWVyeS5leHRlbmQoIHt9LCB1ZGF0YU9sZCApO1xuXG5cdFx0ZGF0YVVzZXIuc2V0KCBkZXN0LCB1ZGF0YUN1ciApO1xuXHR9XG59XG5cbi8vIEZpeCBJRSBidWdzLCBzZWUgc3VwcG9ydCB0ZXN0c1xuZnVuY3Rpb24gZml4SW5wdXQoIHNyYywgZGVzdCApIHtcblx0dmFyIG5vZGVOYW1lID0gZGVzdC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdC8vIEZhaWxzIHRvIHBlcnNpc3QgdGhlIGNoZWNrZWQgc3RhdGUgb2YgYSBjbG9uZWQgY2hlY2tib3ggb3IgcmFkaW8gYnV0dG9uLlxuXHRpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgJiYgcmNoZWNrYWJsZVR5cGUudGVzdCggc3JjLnR5cGUgKSApIHtcblx0XHRkZXN0LmNoZWNrZWQgPSBzcmMuY2hlY2tlZDtcblxuXHQvLyBGYWlscyB0byByZXR1cm4gdGhlIHNlbGVjdGVkIG9wdGlvbiB0byB0aGUgZGVmYXVsdCBzZWxlY3RlZCBzdGF0ZSB3aGVuIGNsb25pbmcgb3B0aW9uc1xuXHR9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5vZGVOYW1lID09PSBcInRleHRhcmVhXCIgKSB7XG5cdFx0ZGVzdC5kZWZhdWx0VmFsdWUgPSBzcmMuZGVmYXVsdFZhbHVlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGRvbU1hbmlwKCBjb2xsZWN0aW9uLCBhcmdzLCBjYWxsYmFjaywgaWdub3JlZCApIHtcblxuXHQvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG5cdGFyZ3MgPSBjb25jYXQuYXBwbHkoIFtdLCBhcmdzICk7XG5cblx0dmFyIGZyYWdtZW50LCBmaXJzdCwgc2NyaXB0cywgaGFzU2NyaXB0cywgbm9kZSwgZG9jLFxuXHRcdGkgPSAwLFxuXHRcdGwgPSBjb2xsZWN0aW9uLmxlbmd0aCxcblx0XHRpTm9DbG9uZSA9IGwgLSAxLFxuXHRcdHZhbHVlID0gYXJnc1sgMCBdLFxuXHRcdGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuXHQvLyBXZSBjYW4ndCBjbG9uZU5vZGUgZnJhZ21lbnRzIHRoYXQgY29udGFpbiBjaGVja2VkLCBpbiBXZWJLaXRcblx0aWYgKCBpc0Z1bmN0aW9uIHx8XG5cdFx0XHQoIGwgPiAxICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJlxuXHRcdFx0XHQhc3VwcG9ydC5jaGVja0Nsb25lICYmIHJjaGVja2VkLnRlc3QoIHZhbHVlICkgKSApIHtcblx0XHRyZXR1cm4gY29sbGVjdGlvbi5lYWNoKCBmdW5jdGlvbiggaW5kZXggKSB7XG5cdFx0XHR2YXIgc2VsZiA9IGNvbGxlY3Rpb24uZXEoIGluZGV4ICk7XG5cdFx0XHRpZiAoIGlzRnVuY3Rpb24gKSB7XG5cdFx0XHRcdGFyZ3NbIDAgXSA9IHZhbHVlLmNhbGwoIHRoaXMsIGluZGV4LCBzZWxmLmh0bWwoKSApO1xuXHRcdFx0fVxuXHRcdFx0ZG9tTWFuaXAoIHNlbGYsIGFyZ3MsIGNhbGxiYWNrLCBpZ25vcmVkICk7XG5cdFx0fSApO1xuXHR9XG5cblx0aWYgKCBsICkge1xuXHRcdGZyYWdtZW50ID0gYnVpbGRGcmFnbWVudCggYXJncywgY29sbGVjdGlvblsgMCBdLm93bmVyRG9jdW1lbnQsIGZhbHNlLCBjb2xsZWN0aW9uLCBpZ25vcmVkICk7XG5cdFx0Zmlyc3QgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG5cdFx0aWYgKCBmcmFnbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSApIHtcblx0XHRcdGZyYWdtZW50ID0gZmlyc3Q7XG5cdFx0fVxuXG5cdFx0Ly8gUmVxdWlyZSBlaXRoZXIgbmV3IGNvbnRlbnQgb3IgYW4gaW50ZXJlc3QgaW4gaWdub3JlZCBlbGVtZW50cyB0byBpbnZva2UgdGhlIGNhbGxiYWNrXG5cdFx0aWYgKCBmaXJzdCB8fCBpZ25vcmVkICkge1xuXHRcdFx0c2NyaXB0cyA9IGpRdWVyeS5tYXAoIGdldEFsbCggZnJhZ21lbnQsIFwic2NyaXB0XCIgKSwgZGlzYWJsZVNjcmlwdCApO1xuXHRcdFx0aGFzU2NyaXB0cyA9IHNjcmlwdHMubGVuZ3RoO1xuXG5cdFx0XHQvLyBVc2UgdGhlIG9yaWdpbmFsIGZyYWdtZW50IGZvciB0aGUgbGFzdCBpdGVtXG5cdFx0XHQvLyBpbnN0ZWFkIG9mIHRoZSBmaXJzdCBiZWNhdXNlIGl0IGNhbiBlbmQgdXBcblx0XHRcdC8vIGJlaW5nIGVtcHRpZWQgaW5jb3JyZWN0bHkgaW4gY2VydGFpbiBzaXR1YXRpb25zICgjODA3MCkuXG5cdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdG5vZGUgPSBmcmFnbWVudDtcblxuXHRcdFx0XHRpZiAoIGkgIT09IGlOb0Nsb25lICkge1xuXHRcdFx0XHRcdG5vZGUgPSBqUXVlcnkuY2xvbmUoIG5vZGUsIHRydWUsIHRydWUgKTtcblxuXHRcdFx0XHRcdC8vIEtlZXAgcmVmZXJlbmNlcyB0byBjbG9uZWQgc2NyaXB0cyBmb3IgbGF0ZXIgcmVzdG9yYXRpb25cblx0XHRcdFx0XHRpZiAoIGhhc1NjcmlwdHMgKSB7XG5cblx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHRcdFx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCBzY3JpcHRzLCBnZXRBbGwoIG5vZGUsIFwic2NyaXB0XCIgKSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNhbGxiYWNrLmNhbGwoIGNvbGxlY3Rpb25bIGkgXSwgbm9kZSwgaSApO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGhhc1NjcmlwdHMgKSB7XG5cdFx0XHRcdGRvYyA9IHNjcmlwdHNbIHNjcmlwdHMubGVuZ3RoIC0gMSBdLm93bmVyRG9jdW1lbnQ7XG5cblx0XHRcdFx0Ly8gUmVlbmFibGUgc2NyaXB0c1xuXHRcdFx0XHRqUXVlcnkubWFwKCBzY3JpcHRzLCByZXN0b3JlU2NyaXB0ICk7XG5cblx0XHRcdFx0Ly8gRXZhbHVhdGUgZXhlY3V0YWJsZSBzY3JpcHRzIG9uIGZpcnN0IGRvY3VtZW50IGluc2VydGlvblxuXHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGhhc1NjcmlwdHM7IGkrKyApIHtcblx0XHRcdFx0XHRub2RlID0gc2NyaXB0c1sgaSBdO1xuXHRcdFx0XHRcdGlmICggcnNjcmlwdFR5cGUudGVzdCggbm9kZS50eXBlIHx8IFwiXCIgKSAmJlxuXHRcdFx0XHRcdFx0IWRhdGFQcml2LmFjY2Vzcyggbm9kZSwgXCJnbG9iYWxFdmFsXCIgKSAmJlxuXHRcdFx0XHRcdFx0alF1ZXJ5LmNvbnRhaW5zKCBkb2MsIG5vZGUgKSApIHtcblxuXHRcdFx0XHRcdFx0aWYgKCBub2RlLnNyYyApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBPcHRpb25hbCBBSkFYIGRlcGVuZGVuY3ksIGJ1dCB3b24ndCBydW4gc2NyaXB0cyBpZiBub3QgcHJlc2VudFxuXHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5fZXZhbFVybCApIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuX2V2YWxVcmwoIG5vZGUuc3JjICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdERPTUV2YWwoIG5vZGUudGV4dENvbnRlbnQucmVwbGFjZSggcmNsZWFuU2NyaXB0LCBcIlwiICksIGRvYyApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjb2xsZWN0aW9uO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoIGVsZW0sIHNlbGVjdG9yLCBrZWVwRGF0YSApIHtcblx0dmFyIG5vZGUsXG5cdFx0bm9kZXMgPSBzZWxlY3RvciA/IGpRdWVyeS5maWx0ZXIoIHNlbGVjdG9yLCBlbGVtICkgOiBlbGVtLFxuXHRcdGkgPSAwO1xuXG5cdGZvciAoIDsgKCBub2RlID0gbm9kZXNbIGkgXSApICE9IG51bGw7IGkrKyApIHtcblx0XHRpZiAoICFrZWVwRGF0YSAmJiBub2RlLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBub2RlICkgKTtcblx0XHR9XG5cblx0XHRpZiAoIG5vZGUucGFyZW50Tm9kZSApIHtcblx0XHRcdGlmICgga2VlcERhdGEgJiYgalF1ZXJ5LmNvbnRhaW5zKCBub2RlLm93bmVyRG9jdW1lbnQsIG5vZGUgKSApIHtcblx0XHRcdFx0c2V0R2xvYmFsRXZhbCggZ2V0QWxsKCBub2RlLCBcInNjcmlwdFwiICkgKTtcblx0XHRcdH1cblx0XHRcdG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggbm9kZSApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtO1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdGh0bWxQcmVmaWx0ZXI6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHJldHVybiBodG1sLnJlcGxhY2UoIHJ4aHRtbFRhZywgXCI8JDE+PC8kMj5cIiApO1xuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiggZWxlbSwgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0dmFyIGksIGwsIHNyY0VsZW1lbnRzLCBkZXN0RWxlbWVudHMsXG5cdFx0XHRjbG9uZSA9IGVsZW0uY2xvbmVOb2RlKCB0cnVlICksXG5cdFx0XHRpblBhZ2UgPSBqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApO1xuXG5cdFx0Ly8gRml4IElFIGNsb25pbmcgaXNzdWVzXG5cdFx0aWYgKCAhc3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCAmJiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgZWxlbS5ub2RlVHlwZSA9PT0gMTEgKSAmJlxuXHRcdFx0XHQhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cblx0XHRcdC8vIFdlIGVzY2hldyBTaXp6bGUgaGVyZSBmb3IgcGVyZm9ybWFuY2UgcmVhc29uczogaHR0cHM6Ly9qc3BlcmYuY29tL2dldGFsbC12cy1zaXp6bGUvMlxuXHRcdFx0ZGVzdEVsZW1lbnRzID0gZ2V0QWxsKCBjbG9uZSApO1xuXHRcdFx0c3JjRWxlbWVudHMgPSBnZXRBbGwoIGVsZW0gKTtcblxuXHRcdFx0Zm9yICggaSA9IDAsIGwgPSBzcmNFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdGZpeElucHV0KCBzcmNFbGVtZW50c1sgaSBdLCBkZXN0RWxlbWVudHNbIGkgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENvcHkgdGhlIGV2ZW50cyBmcm9tIHRoZSBvcmlnaW5hbCB0byB0aGUgY2xvbmVcblx0XHRpZiAoIGRhdGFBbmRFdmVudHMgKSB7XG5cdFx0XHRpZiAoIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdFx0XHRzcmNFbGVtZW50cyA9IHNyY0VsZW1lbnRzIHx8IGdldEFsbCggZWxlbSApO1xuXHRcdFx0XHRkZXN0RWxlbWVudHMgPSBkZXN0RWxlbWVudHMgfHwgZ2V0QWxsKCBjbG9uZSApO1xuXG5cdFx0XHRcdGZvciAoIGkgPSAwLCBsID0gc3JjRWxlbWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdGNsb25lQ29weUV2ZW50KCBzcmNFbGVtZW50c1sgaSBdLCBkZXN0RWxlbWVudHNbIGkgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjbG9uZUNvcHlFdmVudCggZWxlbSwgY2xvbmUgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBQcmVzZXJ2ZSBzY3JpcHQgZXZhbHVhdGlvbiBoaXN0b3J5XG5cdFx0ZGVzdEVsZW1lbnRzID0gZ2V0QWxsKCBjbG9uZSwgXCJzY3JpcHRcIiApO1xuXHRcdGlmICggZGVzdEVsZW1lbnRzLmxlbmd0aCA+IDAgKSB7XG5cdFx0XHRzZXRHbG9iYWxFdmFsKCBkZXN0RWxlbWVudHMsICFpblBhZ2UgJiYgZ2V0QWxsKCBlbGVtLCBcInNjcmlwdFwiICkgKTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4gdGhlIGNsb25lZCBzZXRcblx0XHRyZXR1cm4gY2xvbmU7XG5cdH0sXG5cblx0Y2xlYW5EYXRhOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cdFx0dmFyIGRhdGEsIGVsZW0sIHR5cGUsXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWwsXG5cdFx0XHRpID0gMDtcblxuXHRcdGZvciAoIDsgKCBlbGVtID0gZWxlbXNbIGkgXSApICE9PSB1bmRlZmluZWQ7IGkrKyApIHtcblx0XHRcdGlmICggYWNjZXB0RGF0YSggZWxlbSApICkge1xuXHRcdFx0XHRpZiAoICggZGF0YSA9IGVsZW1bIGRhdGFQcml2LmV4cGFuZG8gXSApICkge1xuXHRcdFx0XHRcdGlmICggZGF0YS5ldmVudHMgKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCB0eXBlIGluIGRhdGEuZXZlbnRzICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIHNwZWNpYWxbIHR5cGUgXSApIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCBlbGVtLCB0eXBlICk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIHNob3J0Y3V0IHRvIGF2b2lkIGpRdWVyeS5ldmVudC5yZW1vdmUncyBvdmVyaGVhZFxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZGF0YS5oYW5kbGUgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZSA8PTM1IC0gNDUrXG5cdFx0XHRcdFx0Ly8gQXNzaWduIHVuZGVmaW5lZCBpbnN0ZWFkIG9mIHVzaW5nIGRlbGV0ZSwgc2VlIERhdGEjcmVtb3ZlXG5cdFx0XHRcdFx0ZWxlbVsgZGF0YVByaXYuZXhwYW5kbyBdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggZWxlbVsgZGF0YVVzZXIuZXhwYW5kbyBdICkge1xuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9MzUgLSA0NStcblx0XHRcdFx0XHQvLyBBc3NpZ24gdW5kZWZpbmVkIGluc3RlYWQgb2YgdXNpbmcgZGVsZXRlLCBzZWUgRGF0YSNyZW1vdmVcblx0XHRcdFx0XHRlbGVtWyBkYXRhVXNlci5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRkZXRhY2g6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gcmVtb3ZlKCB0aGlzLCBzZWxlY3RvciwgdHJ1ZSApO1xuXHR9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiByZW1vdmUoIHRoaXMsIHNlbGVjdG9yICk7XG5cdH0sXG5cblx0dGV4dDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdFx0alF1ZXJ5LnRleHQoIHRoaXMgKSA6XG5cdFx0XHRcdHRoaXMuZW1wdHkoKS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRcdHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9LFxuXG5cdGFwcGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcblx0XHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdHByZXBlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KCB0aGlzLCBlbGVtICk7XG5cdFx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoIGVsZW0sIHRhcmdldC5maXJzdENoaWxkICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGJlZm9yZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0YWZ0ZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5wYXJlbnROb2RlICkge1xuXHRcdFx0XHR0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzLm5leHRTaWJsaW5nICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGVtcHR5OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZWxlbSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoIGVsZW0gPSB0aGlzWyBpIF0gKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cblx0XHRcdFx0Ly8gUHJldmVudCBtZW1vcnkgbGVha3Ncblx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBlbGVtLCBmYWxzZSApICk7XG5cblx0XHRcdFx0Ly8gUmVtb3ZlIGFueSByZW1haW5pbmcgbm9kZXNcblx0XHRcdFx0ZWxlbS50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uKCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHRkYXRhQW5kRXZlbnRzID0gZGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZmFsc2UgOiBkYXRhQW5kRXZlbnRzO1xuXHRcdGRlZXBEYXRhQW5kRXZlbnRzID0gZGVlcERhdGFBbmRFdmVudHMgPT0gbnVsbCA/IGRhdGFBbmRFdmVudHMgOiBkZWVwRGF0YUFuZEV2ZW50cztcblxuXHRcdHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LmNsb25lKCB0aGlzLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApO1xuXHRcdH0gKTtcblx0fSxcblxuXHRodG1sOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGVsZW0gPSB0aGlzWyAwIF0gfHwge30sXG5cdFx0XHRcdGkgPSAwLFxuXHRcdFx0XHRsID0gdGhpcy5sZW5ndGg7XG5cblx0XHRcdGlmICggdmFsdWUgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5pbm5lckhUTUw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNlZSBpZiB3ZSBjYW4gdGFrZSBhIHNob3J0Y3V0IGFuZCBqdXN0IHVzZSBpbm5lckhUTUxcblx0XHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICFybm9Jbm5lcmh0bWwudGVzdCggdmFsdWUgKSAmJlxuXHRcdFx0XHQhd3JhcE1hcFsgKCBydGFnTmFtZS5leGVjKCB2YWx1ZSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpIF0gKSB7XG5cblx0XHRcdFx0dmFsdWUgPSBqUXVlcnkuaHRtbFByZWZpbHRlciggdmFsdWUgKTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRcdGVsZW0gPSB0aGlzWyBpIF0gfHwge307XG5cblx0XHRcdFx0XHRcdC8vIFJlbW92ZSBlbGVtZW50IG5vZGVzIGFuZCBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuXHRcdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcblx0XHRcdFx0XHRcdFx0ZWxlbS5pbm5lckhUTUwgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlbGVtID0gMDtcblxuXHRcdFx0XHQvLyBJZiB1c2luZyBpbm5lckhUTUwgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgdXNlIHRoZSBmYWxsYmFjayBtZXRob2Rcblx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHRcdHRoaXMuZW1wdHkoKS5hcHBlbmQoIHZhbHVlICk7XG5cdFx0XHR9XG5cdFx0fSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggKTtcblx0fSxcblxuXHRyZXBsYWNlV2l0aDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGlnbm9yZWQgPSBbXTtcblxuXHRcdC8vIE1ha2UgdGhlIGNoYW5nZXMsIHJlcGxhY2luZyBlYWNoIG5vbi1pZ25vcmVkIGNvbnRleHQgZWxlbWVudCB3aXRoIHRoZSBuZXcgY29udGVudFxuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG5cblx0XHRcdGlmICggalF1ZXJ5LmluQXJyYXkoIHRoaXMsIGlnbm9yZWQgKSA8IDAgKSB7XG5cdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggdGhpcyApICk7XG5cdFx0XHRcdGlmICggcGFyZW50ICkge1xuXHRcdFx0XHRcdHBhcmVudC5yZXBsYWNlQ2hpbGQoIGVsZW0sIHRoaXMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gRm9yY2UgY2FsbGJhY2sgaW52b2NhdGlvblxuXHRcdH0sIGlnbm9yZWQgKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZWFjaCgge1xuXHRhcHBlbmRUbzogXCJhcHBlbmRcIixcblx0cHJlcGVuZFRvOiBcInByZXBlbmRcIixcblx0aW5zZXJ0QmVmb3JlOiBcImJlZm9yZVwiLFxuXHRpbnNlcnRBZnRlcjogXCJhZnRlclwiLFxuXHRyZXBsYWNlQWxsOiBcInJlcGxhY2VXaXRoXCJcbn0sIGZ1bmN0aW9uKCBuYW1lLCBvcmlnaW5hbCApIHtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGVsZW1zLFxuXHRcdFx0cmV0ID0gW10sXG5cdFx0XHRpbnNlcnQgPSBqUXVlcnkoIHNlbGVjdG9yICksXG5cdFx0XHRsYXN0ID0gaW5zZXJ0Lmxlbmd0aCAtIDEsXG5cdFx0XHRpID0gMDtcblxuXHRcdGZvciAoIDsgaSA8PSBsYXN0OyBpKysgKSB7XG5cdFx0XHRlbGVtcyA9IGkgPT09IGxhc3QgPyB0aGlzIDogdGhpcy5jbG9uZSggdHJ1ZSApO1xuXHRcdFx0alF1ZXJ5KCBpbnNlcnRbIGkgXSApWyBvcmlnaW5hbCBdKCBlbGVtcyApO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdC8vIC5nZXQoKSBiZWNhdXNlIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdHB1c2guYXBwbHkoIHJldCwgZWxlbXMuZ2V0KCkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHJldCApO1xuXHR9O1xufSApO1xudmFyIHJtYXJnaW4gPSAoIC9ebWFyZ2luLyApO1xuXG52YXIgcm51bW5vbnB4ID0gbmV3IFJlZ0V4cCggXCJeKFwiICsgcG51bSArIFwiKSg/IXB4KVthLXolXSskXCIsIFwiaVwiICk7XG5cbnZhciBnZXRTdHlsZXMgPSBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seSwgRmlyZWZveCA8PTMwICgjMTUwOTgsICMxNDE1MClcblx0XHQvLyBJRSB0aHJvd3Mgb24gZWxlbWVudHMgY3JlYXRlZCBpbiBwb3B1cHNcblx0XHQvLyBGRiBtZWFud2hpbGUgdGhyb3dzIG9uIGZyYW1lIGVsZW1lbnRzIHRocm91Z2ggXCJkZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlXCJcblx0XHR2YXIgdmlldyA9IGVsZW0ub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcblxuXHRcdGlmICggIXZpZXcgfHwgIXZpZXcub3BlbmVyICkge1xuXHRcdFx0dmlldyA9IHdpbmRvdztcblx0XHR9XG5cblx0XHRyZXR1cm4gdmlldy5nZXRDb21wdXRlZFN0eWxlKCBlbGVtICk7XG5cdH07XG5cblxuXG4oIGZ1bmN0aW9uKCkge1xuXG5cdC8vIEV4ZWN1dGluZyBib3RoIHBpeGVsUG9zaXRpb24gJiBib3hTaXppbmdSZWxpYWJsZSB0ZXN0cyByZXF1aXJlIG9ubHkgb25lIGxheW91dFxuXHQvLyBzbyB0aGV5J3JlIGV4ZWN1dGVkIGF0IHRoZSBzYW1lIHRpbWUgdG8gc2F2ZSB0aGUgc2Vjb25kIGNvbXB1dGF0aW9uLlxuXHRmdW5jdGlvbiBjb21wdXRlU3R5bGVUZXN0cygpIHtcblxuXHRcdC8vIFRoaXMgaXMgYSBzaW5nbGV0b24sIHdlIG5lZWQgdG8gZXhlY3V0ZSBpdCBvbmx5IG9uY2Vcblx0XHRpZiAoICFkaXYgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZGl2LnN0eWxlLmNzc1RleHQgPVxuXHRcdFx0XCJib3gtc2l6aW5nOmJvcmRlci1ib3g7XCIgK1xuXHRcdFx0XCJwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO1wiICtcblx0XHRcdFwibWFyZ2luOmF1dG87Ym9yZGVyOjFweDtwYWRkaW5nOjFweDtcIiArXG5cdFx0XHRcInRvcDoxJTt3aWR0aDo1MCVcIjtcblx0XHRkaXYuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRkb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApO1xuXG5cdFx0dmFyIGRpdlN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGRpdiApO1xuXHRcdHBpeGVsUG9zaXRpb25WYWwgPSBkaXZTdHlsZS50b3AgIT09IFwiMSVcIjtcblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIC0gNC4zIG9ubHksIEZpcmVmb3ggPD0zIC0gNDRcblx0XHRyZWxpYWJsZU1hcmdpbkxlZnRWYWwgPSBkaXZTdHlsZS5tYXJnaW5MZWZ0ID09PSBcIjJweFwiO1xuXHRcdGJveFNpemluZ1JlbGlhYmxlVmFsID0gZGl2U3R5bGUud2lkdGggPT09IFwiNHB4XCI7XG5cblx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCAtIDQuMyBvbmx5XG5cdFx0Ly8gU29tZSBzdHlsZXMgY29tZSBiYWNrIHdpdGggcGVyY2VudGFnZSB2YWx1ZXMsIGV2ZW4gdGhvdWdoIHRoZXkgc2hvdWxkbid0XG5cdFx0ZGl2LnN0eWxlLm1hcmdpblJpZ2h0ID0gXCI1MCVcIjtcblx0XHRwaXhlbE1hcmdpblJpZ2h0VmFsID0gZGl2U3R5bGUubWFyZ2luUmlnaHQgPT09IFwiNHB4XCI7XG5cblx0XHRkb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoIGNvbnRhaW5lciApO1xuXG5cdFx0Ly8gTnVsbGlmeSB0aGUgZGl2IHNvIGl0IHdvdWxkbid0IGJlIHN0b3JlZCBpbiB0aGUgbWVtb3J5IGFuZFxuXHRcdC8vIGl0IHdpbGwgYWxzbyBiZSBhIHNpZ24gdGhhdCBjaGVja3MgYWxyZWFkeSBwZXJmb3JtZWRcblx0XHRkaXYgPSBudWxsO1xuXHR9XG5cblx0dmFyIHBpeGVsUG9zaXRpb25WYWwsIGJveFNpemluZ1JlbGlhYmxlVmFsLCBwaXhlbE1hcmdpblJpZ2h0VmFsLCByZWxpYWJsZU1hcmdpbkxlZnRWYWwsXG5cdFx0Y29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApLFxuXHRcdGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcblxuXHQvLyBGaW5pc2ggZWFybHkgaW4gbGltaXRlZCAobm9uLWJyb3dzZXIpIGVudmlyb25tZW50c1xuXHRpZiAoICFkaXYuc3R5bGUgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuXHQvLyBTdHlsZSBvZiBjbG9uZWQgZWxlbWVudCBhZmZlY3RzIHNvdXJjZSBlbGVtZW50IGNsb25lZCAoIzg5MDgpXG5cdGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9IFwiY29udGVudC1ib3hcIjtcblx0ZGl2LmNsb25lTm9kZSggdHJ1ZSApLnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJcIjtcblx0c3VwcG9ydC5jbGVhckNsb25lU3R5bGUgPSBkaXYuc3R5bGUuYmFja2dyb3VuZENsaXAgPT09IFwiY29udGVudC1ib3hcIjtcblxuXHRjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFwiYm9yZGVyOjA7d2lkdGg6OHB4O2hlaWdodDowO3RvcDowO2xlZnQ6LTk5OTlweDtcIiArXG5cdFx0XCJwYWRkaW5nOjA7bWFyZ2luLXRvcDoxcHg7cG9zaXRpb246YWJzb2x1dGVcIjtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBkaXYgKTtcblxuXHRqUXVlcnkuZXh0ZW5kKCBzdXBwb3J0LCB7XG5cdFx0cGl4ZWxQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIHBpeGVsUG9zaXRpb25WYWw7XG5cdFx0fSxcblx0XHRib3hTaXppbmdSZWxpYWJsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIGJveFNpemluZ1JlbGlhYmxlVmFsO1xuXHRcdH0sXG5cdFx0cGl4ZWxNYXJnaW5SaWdodDogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIHBpeGVsTWFyZ2luUmlnaHRWYWw7XG5cdFx0fSxcblx0XHRyZWxpYWJsZU1hcmdpbkxlZnQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdHJldHVybiByZWxpYWJsZU1hcmdpbkxlZnRWYWw7XG5cdFx0fVxuXHR9ICk7XG59ICkoKTtcblxuXG5mdW5jdGlvbiBjdXJDU1MoIGVsZW0sIG5hbWUsIGNvbXB1dGVkICkge1xuXHR2YXIgd2lkdGgsIG1pbldpZHRoLCBtYXhXaWR0aCwgcmV0LFxuXHRcdHN0eWxlID0gZWxlbS5zdHlsZTtcblxuXHRjb21wdXRlZCA9IGNvbXB1dGVkIHx8IGdldFN0eWxlcyggZWxlbSApO1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG5cdC8vIGdldFByb3BlcnR5VmFsdWUgaXMgb25seSBuZWVkZWQgZm9yIC5jc3MoJ2ZpbHRlcicpICgjMTI1MzcpXG5cdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0cmV0ID0gY29tcHV0ZWQuZ2V0UHJvcGVydHlWYWx1ZSggbmFtZSApIHx8IGNvbXB1dGVkWyBuYW1lIF07XG5cblx0XHRpZiAoIHJldCA9PT0gXCJcIiAmJiAhalF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKSApIHtcblx0XHRcdHJldCA9IGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSApO1xuXHRcdH1cblxuXHRcdC8vIEEgdHJpYnV0ZSB0byB0aGUgXCJhd2Vzb21lIGhhY2sgYnkgRGVhbiBFZHdhcmRzXCJcblx0XHQvLyBBbmRyb2lkIEJyb3dzZXIgcmV0dXJucyBwZXJjZW50YWdlIGZvciBzb21lIHZhbHVlcyxcblx0XHQvLyBidXQgd2lkdGggc2VlbXMgdG8gYmUgcmVsaWFibHkgcGl4ZWxzLlxuXHRcdC8vIFRoaXMgaXMgYWdhaW5zdCB0aGUgQ1NTT00gZHJhZnQgc3BlYzpcblx0XHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3Nzb20vI3Jlc29sdmVkLXZhbHVlc1xuXHRcdGlmICggIXN1cHBvcnQucGl4ZWxNYXJnaW5SaWdodCgpICYmIHJudW1ub25weC50ZXN0KCByZXQgKSAmJiBybWFyZ2luLnRlc3QoIG5hbWUgKSApIHtcblxuXHRcdFx0Ly8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIHZhbHVlc1xuXHRcdFx0d2lkdGggPSBzdHlsZS53aWR0aDtcblx0XHRcdG1pbldpZHRoID0gc3R5bGUubWluV2lkdGg7XG5cdFx0XHRtYXhXaWR0aCA9IHN0eWxlLm1heFdpZHRoO1xuXG5cdFx0XHQvLyBQdXQgaW4gdGhlIG5ldyB2YWx1ZXMgdG8gZ2V0IGEgY29tcHV0ZWQgdmFsdWUgb3V0XG5cdFx0XHRzdHlsZS5taW5XaWR0aCA9IHN0eWxlLm1heFdpZHRoID0gc3R5bGUud2lkdGggPSByZXQ7XG5cdFx0XHRyZXQgPSBjb21wdXRlZC53aWR0aDtcblxuXHRcdFx0Ly8gUmV2ZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlc1xuXHRcdFx0c3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdHN0eWxlLm1pbldpZHRoID0gbWluV2lkdGg7XG5cdFx0XHRzdHlsZS5tYXhXaWR0aCA9IG1heFdpZHRoO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXQgIT09IHVuZGVmaW5lZCA/XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdFx0Ly8gSUUgcmV0dXJucyB6SW5kZXggdmFsdWUgYXMgYW4gaW50ZWdlci5cblx0XHRyZXQgKyBcIlwiIDpcblx0XHRyZXQ7XG59XG5cblxuZnVuY3Rpb24gYWRkR2V0SG9va0lmKCBjb25kaXRpb25GbiwgaG9va0ZuICkge1xuXG5cdC8vIERlZmluZSB0aGUgaG9vaywgd2UnbGwgY2hlY2sgb24gdGhlIGZpcnN0IHJ1biBpZiBpdCdzIHJlYWxseSBuZWVkZWQuXG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggY29uZGl0aW9uRm4oKSApIHtcblxuXHRcdFx0XHQvLyBIb29rIG5vdCBuZWVkZWQgKG9yIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBpdCBkdWVcblx0XHRcdFx0Ly8gdG8gbWlzc2luZyBkZXBlbmRlbmN5KSwgcmVtb3ZlIGl0LlxuXHRcdFx0XHRkZWxldGUgdGhpcy5nZXQ7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSG9vayBuZWVkZWQ7IHJlZGVmaW5lIGl0IHNvIHRoYXQgdGhlIHN1cHBvcnQgdGVzdCBpcyBub3QgZXhlY3V0ZWQgYWdhaW4uXG5cdFx0XHRyZXR1cm4gKCB0aGlzLmdldCA9IGhvb2tGbiApLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHR9XG5cdH07XG59XG5cblxudmFyXG5cblx0Ly8gU3dhcHBhYmxlIGlmIGRpc3BsYXkgaXMgbm9uZSBvciBzdGFydHMgd2l0aCB0YWJsZVxuXHQvLyBleGNlcHQgXCJ0YWJsZVwiLCBcInRhYmxlLWNlbGxcIiwgb3IgXCJ0YWJsZS1jYXB0aW9uXCJcblx0Ly8gU2VlIGhlcmUgZm9yIGRpc3BsYXkgdmFsdWVzOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0NTUy9kaXNwbGF5XG5cdHJkaXNwbGF5c3dhcCA9IC9eKG5vbmV8dGFibGUoPyEtY1tlYV0pLispLyxcblx0Y3NzU2hvdyA9IHsgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgdmlzaWJpbGl0eTogXCJoaWRkZW5cIiwgZGlzcGxheTogXCJibG9ja1wiIH0sXG5cdGNzc05vcm1hbFRyYW5zZm9ybSA9IHtcblx0XHRsZXR0ZXJTcGFjaW5nOiBcIjBcIixcblx0XHRmb250V2VpZ2h0OiBcIjQwMFwiXG5cdH0sXG5cblx0Y3NzUHJlZml4ZXMgPSBbIFwiV2Via2l0XCIsIFwiTW96XCIsIFwibXNcIiBdLFxuXHRlbXB0eVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApLnN0eWxlO1xuXG4vLyBSZXR1cm4gYSBjc3MgcHJvcGVydHkgbWFwcGVkIHRvIGEgcG90ZW50aWFsbHkgdmVuZG9yIHByZWZpeGVkIHByb3BlcnR5XG5mdW5jdGlvbiB2ZW5kb3JQcm9wTmFtZSggbmFtZSApIHtcblxuXHQvLyBTaG9ydGN1dCBmb3IgbmFtZXMgdGhhdCBhcmUgbm90IHZlbmRvciBwcmVmaXhlZFxuXHRpZiAoIG5hbWUgaW4gZW1wdHlTdHlsZSApIHtcblx0XHRyZXR1cm4gbmFtZTtcblx0fVxuXG5cdC8vIENoZWNrIGZvciB2ZW5kb3IgcHJlZml4ZWQgbmFtZXNcblx0dmFyIGNhcE5hbWUgPSBuYW1lWyAwIF0udG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoIDEgKSxcblx0XHRpID0gY3NzUHJlZml4ZXMubGVuZ3RoO1xuXG5cdHdoaWxlICggaS0tICkge1xuXHRcdG5hbWUgPSBjc3NQcmVmaXhlc1sgaSBdICsgY2FwTmFtZTtcblx0XHRpZiAoIG5hbWUgaW4gZW1wdHlTdHlsZSApIHtcblx0XHRcdHJldHVybiBuYW1lO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBzZXRQb3NpdGl2ZU51bWJlciggZWxlbSwgdmFsdWUsIHN1YnRyYWN0ICkge1xuXG5cdC8vIEFueSByZWxhdGl2ZSAoKy8tKSB2YWx1ZXMgaGF2ZSBhbHJlYWR5IGJlZW5cblx0Ly8gbm9ybWFsaXplZCBhdCB0aGlzIHBvaW50XG5cdHZhciBtYXRjaGVzID0gcmNzc051bS5leGVjKCB2YWx1ZSApO1xuXHRyZXR1cm4gbWF0Y2hlcyA/XG5cblx0XHQvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBcInN1YnRyYWN0XCIsIGUuZy4sIHdoZW4gdXNlZCBhcyBpbiBjc3NIb29rc1xuXHRcdE1hdGgubWF4KCAwLCBtYXRjaGVzWyAyIF0gLSAoIHN1YnRyYWN0IHx8IDAgKSApICsgKCBtYXRjaGVzWyAzIF0gfHwgXCJweFwiICkgOlxuXHRcdHZhbHVlO1xufVxuXG5mdW5jdGlvbiBhdWdtZW50V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEsIGlzQm9yZGVyQm94LCBzdHlsZXMgKSB7XG5cdHZhciBpLFxuXHRcdHZhbCA9IDA7XG5cblx0Ly8gSWYgd2UgYWxyZWFkeSBoYXZlIHRoZSByaWdodCBtZWFzdXJlbWVudCwgYXZvaWQgYXVnbWVudGF0aW9uXG5cdGlmICggZXh0cmEgPT09ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSApIHtcblx0XHRpID0gNDtcblxuXHQvLyBPdGhlcndpc2UgaW5pdGlhbGl6ZSBmb3IgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBwcm9wZXJ0aWVzXG5cdH0gZWxzZSB7XG5cdFx0aSA9IG5hbWUgPT09IFwid2lkdGhcIiA/IDEgOiAwO1xuXHR9XG5cblx0Zm9yICggOyBpIDwgNDsgaSArPSAyICkge1xuXG5cdFx0Ly8gQm90aCBib3ggbW9kZWxzIGV4Y2x1ZGUgbWFyZ2luLCBzbyBhZGQgaXQgaWYgd2Ugd2FudCBpdFxuXHRcdGlmICggZXh0cmEgPT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHR2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgZXh0cmEgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBpc0JvcmRlckJveCApIHtcblxuXHRcdFx0Ly8gYm9yZGVyLWJveCBpbmNsdWRlcyBwYWRkaW5nLCBzbyByZW1vdmUgaXQgaWYgd2Ugd2FudCBjb250ZW50XG5cdFx0XHRpZiAoIGV4dHJhID09PSBcImNvbnRlbnRcIiApIHtcblx0XHRcdFx0dmFsIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBdCB0aGlzIHBvaW50LCBleHRyYSBpc24ndCBib3JkZXIgbm9yIG1hcmdpbiwgc28gcmVtb3ZlIGJvcmRlclxuXHRcdFx0aWYgKCBleHRyYSAhPT0gXCJtYXJnaW5cIiApIHtcblx0XHRcdFx0dmFsIC09IGpRdWVyeS5jc3MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgY29udGVudCwgc28gYWRkIHBhZGRpbmdcblx0XHRcdHZhbCArPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBhZGRpbmdcIiArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcblxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgY29udGVudCBub3IgcGFkZGluZywgc28gYWRkIGJvcmRlclxuXHRcdFx0aWYgKCBleHRyYSAhPT0gXCJwYWRkaW5nXCIgKSB7XG5cdFx0XHRcdHZhbCArPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB2YWw7XG59XG5cbmZ1bmN0aW9uIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhICkge1xuXG5cdC8vIFN0YXJ0IHdpdGggb2Zmc2V0IHByb3BlcnR5LCB3aGljaCBpcyBlcXVpdmFsZW50IHRvIHRoZSBib3JkZXItYm94IHZhbHVlXG5cdHZhciB2YWwsXG5cdFx0dmFsdWVJc0JvcmRlckJveCA9IHRydWUsXG5cdFx0c3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICksXG5cdFx0aXNCb3JkZXJCb3ggPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiYm9yZGVyLWJveFwiO1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuXHQvLyBSdW5uaW5nIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBvbiBhIGRpc2Nvbm5lY3RlZCBub2RlXG5cdC8vIGluIElFIHRocm93cyBhbiBlcnJvci5cblx0aWYgKCBlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoICkge1xuXHRcdHZhbCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClbIG5hbWUgXTtcblx0fVxuXG5cdC8vIFNvbWUgbm9uLWh0bWwgZWxlbWVudHMgcmV0dXJuIHVuZGVmaW5lZCBmb3Igb2Zmc2V0V2lkdGgsIHNvIGNoZWNrIGZvciBudWxsL3VuZGVmaW5lZFxuXHQvLyBzdmcgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02NDkyODVcblx0Ly8gTWF0aE1MIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NDkxNjY4XG5cdGlmICggdmFsIDw9IDAgfHwgdmFsID09IG51bGwgKSB7XG5cblx0XHQvLyBGYWxsIGJhY2sgdG8gY29tcHV0ZWQgdGhlbiB1bmNvbXB1dGVkIGNzcyBpZiBuZWNlc3Nhcnlcblx0XHR2YWwgPSBjdXJDU1MoIGVsZW0sIG5hbWUsIHN0eWxlcyApO1xuXHRcdGlmICggdmFsIDwgMCB8fCB2YWwgPT0gbnVsbCApIHtcblx0XHRcdHZhbCA9IGVsZW0uc3R5bGVbIG5hbWUgXTtcblx0XHR9XG5cblx0XHQvLyBDb21wdXRlZCB1bml0IGlzIG5vdCBwaXhlbHMuIFN0b3AgaGVyZSBhbmQgcmV0dXJuLlxuXHRcdGlmICggcm51bW5vbnB4LnRlc3QoIHZhbCApICkge1xuXHRcdFx0cmV0dXJuIHZhbDtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBmb3Igc3R5bGUgaW4gY2FzZSBhIGJyb3dzZXIgd2hpY2ggcmV0dXJucyB1bnJlbGlhYmxlIHZhbHVlc1xuXHRcdC8vIGZvciBnZXRDb21wdXRlZFN0eWxlIHNpbGVudGx5IGZhbGxzIGJhY2sgdG8gdGhlIHJlbGlhYmxlIGVsZW0uc3R5bGVcblx0XHR2YWx1ZUlzQm9yZGVyQm94ID0gaXNCb3JkZXJCb3ggJiZcblx0XHRcdCggc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSgpIHx8IHZhbCA9PT0gZWxlbS5zdHlsZVsgbmFtZSBdICk7XG5cblx0XHQvLyBOb3JtYWxpemUgXCJcIiwgYXV0bywgYW5kIHByZXBhcmUgZm9yIGV4dHJhXG5cdFx0dmFsID0gcGFyc2VGbG9hdCggdmFsICkgfHwgMDtcblx0fVxuXG5cdC8vIFVzZSB0aGUgYWN0aXZlIGJveC1zaXppbmcgbW9kZWwgdG8gYWRkL3N1YnRyYWN0IGlycmVsZXZhbnQgc3R5bGVzXG5cdHJldHVybiAoIHZhbCArXG5cdFx0YXVnbWVudFdpZHRoT3JIZWlnaHQoXG5cdFx0XHRlbGVtLFxuXHRcdFx0bmFtZSxcblx0XHRcdGV4dHJhIHx8ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSxcblx0XHRcdHZhbHVlSXNCb3JkZXJCb3gsXG5cdFx0XHRzdHlsZXNcblx0XHQpXG5cdCkgKyBcInB4XCI7XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBBZGQgaW4gc3R5bGUgcHJvcGVydHkgaG9va3MgZm9yIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHRcblx0Ly8gYmVoYXZpb3Igb2YgZ2V0dGluZyBhbmQgc2V0dGluZyBhIHN0eWxlIHByb3BlcnR5XG5cdGNzc0hvb2tzOiB7XG5cdFx0b3BhY2l0eToge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRcdFx0XHQvLyBXZSBzaG91bGQgYWx3YXlzIGdldCBhIG51bWJlciBiYWNrIGZyb20gb3BhY2l0eVxuXHRcdFx0XHRcdHZhciByZXQgPSBjdXJDU1MoIGVsZW0sIFwib3BhY2l0eVwiICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJldCA9PT0gXCJcIiA/IFwiMVwiIDogcmV0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vIERvbid0IGF1dG9tYXRpY2FsbHkgYWRkIFwicHhcIiB0byB0aGVzZSBwb3NzaWJseS11bml0bGVzcyBwcm9wZXJ0aWVzXG5cdGNzc051bWJlcjoge1xuXHRcdFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogdHJ1ZSxcblx0XHRcImNvbHVtbkNvdW50XCI6IHRydWUsXG5cdFx0XCJmaWxsT3BhY2l0eVwiOiB0cnVlLFxuXHRcdFwiZmxleEdyb3dcIjogdHJ1ZSxcblx0XHRcImZsZXhTaHJpbmtcIjogdHJ1ZSxcblx0XHRcImZvbnRXZWlnaHRcIjogdHJ1ZSxcblx0XHRcImxpbmVIZWlnaHRcIjogdHJ1ZSxcblx0XHRcIm9wYWNpdHlcIjogdHJ1ZSxcblx0XHRcIm9yZGVyXCI6IHRydWUsXG5cdFx0XCJvcnBoYW5zXCI6IHRydWUsXG5cdFx0XCJ3aWRvd3NcIjogdHJ1ZSxcblx0XHRcInpJbmRleFwiOiB0cnVlLFxuXHRcdFwiem9vbVwiOiB0cnVlXG5cdH0sXG5cblx0Ly8gQWRkIGluIHByb3BlcnRpZXMgd2hvc2UgbmFtZXMgeW91IHdpc2ggdG8gZml4IGJlZm9yZVxuXHQvLyBzZXR0aW5nIG9yIGdldHRpbmcgdGhlIHZhbHVlXG5cdGNzc1Byb3BzOiB7XG5cdFx0XCJmbG9hdFwiOiBcImNzc0Zsb2F0XCJcblx0fSxcblxuXHQvLyBHZXQgYW5kIHNldCB0aGUgc3R5bGUgcHJvcGVydHkgb24gYSBET00gTm9kZVxuXHRzdHlsZTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlLCBleHRyYSApIHtcblxuXHRcdC8vIERvbid0IHNldCBzdHlsZXMgb24gdGV4dCBhbmQgY29tbWVudCBub2Rlc1xuXHRcdGlmICggIWVsZW0gfHwgZWxlbS5ub2RlVHlwZSA9PT0gMyB8fCBlbGVtLm5vZGVUeXBlID09PSA4IHx8ICFlbGVtLnN0eWxlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZVxuXHRcdHZhciByZXQsIHR5cGUsIGhvb2tzLFxuXHRcdFx0b3JpZ05hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICksXG5cdFx0XHRzdHlsZSA9IGVsZW0uc3R5bGU7XG5cblx0XHRuYW1lID0galF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdIHx8XG5cdFx0XHQoIGpRdWVyeS5jc3NQcm9wc1sgb3JpZ05hbWUgXSA9IHZlbmRvclByb3BOYW1lKCBvcmlnTmFtZSApIHx8IG9yaWdOYW1lICk7XG5cblx0XHQvLyBHZXRzIGhvb2sgZm9yIHRoZSBwcmVmaXhlZCB2ZXJzaW9uLCB0aGVuIHVucHJlZml4ZWQgdmVyc2lvblxuXHRcdGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gfHwgalF1ZXJ5LmNzc0hvb2tzWyBvcmlnTmFtZSBdO1xuXG5cdFx0Ly8gQ2hlY2sgaWYgd2UncmUgc2V0dGluZyBhIHZhbHVlXG5cdFx0aWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0dHlwZSA9IHR5cGVvZiB2YWx1ZTtcblxuXHRcdFx0Ly8gQ29udmVydCBcIis9XCIgb3IgXCItPVwiIHRvIHJlbGF0aXZlIG51bWJlcnMgKCM3MzQ1KVxuXHRcdFx0aWYgKCB0eXBlID09PSBcInN0cmluZ1wiICYmICggcmV0ID0gcmNzc051bS5leGVjKCB2YWx1ZSApICkgJiYgcmV0WyAxIF0gKSB7XG5cdFx0XHRcdHZhbHVlID0gYWRqdXN0Q1NTKCBlbGVtLCBuYW1lLCByZXQgKTtcblxuXHRcdFx0XHQvLyBGaXhlcyBidWcgIzkyMzdcblx0XHRcdFx0dHlwZSA9IFwibnVtYmVyXCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1ha2Ugc3VyZSB0aGF0IG51bGwgYW5kIE5hTiB2YWx1ZXMgYXJlbid0IHNldCAoIzcxMTYpXG5cdFx0XHRpZiAoIHZhbHVlID09IG51bGwgfHwgdmFsdWUgIT09IHZhbHVlICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgbnVtYmVyIHdhcyBwYXNzZWQgaW4sIGFkZCB0aGUgdW5pdCAoZXhjZXB0IGZvciBjZXJ0YWluIENTUyBwcm9wZXJ0aWVzKVxuXHRcdFx0aWYgKCB0eXBlID09PSBcIm51bWJlclwiICkge1xuXHRcdFx0XHR2YWx1ZSArPSByZXQgJiYgcmV0WyAzIF0gfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBvcmlnTmFtZSBdID8gXCJcIiA6IFwicHhcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBiYWNrZ3JvdW5kLSogcHJvcHMgYWZmZWN0IG9yaWdpbmFsIGNsb25lJ3MgdmFsdWVzXG5cdFx0XHRpZiAoICFzdXBwb3J0LmNsZWFyQ2xvbmVTdHlsZSAmJiB2YWx1ZSA9PT0gXCJcIiAmJiBuYW1lLmluZGV4T2YoIFwiYmFja2dyb3VuZFwiICkgPT09IDAgKSB7XG5cdFx0XHRcdHN0eWxlWyBuYW1lIF0gPSBcImluaGVyaXRcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYSBob29rIHdhcyBwcm92aWRlZCwgdXNlIHRoYXQgdmFsdWUsIG90aGVyd2lzZSBqdXN0IHNldCB0aGUgc3BlY2lmaWVkIHZhbHVlXG5cdFx0XHRpZiAoICFob29rcyB8fCAhKCBcInNldFwiIGluIGhvb2tzICkgfHxcblx0XHRcdFx0KCB2YWx1ZSA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIGV4dHJhICkgKSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdHN0eWxlWyBuYW1lIF0gPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBub24tY29tcHV0ZWQgdmFsdWUgZnJvbSB0aGVyZVxuXHRcdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBmYWxzZSwgZXh0cmEgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIGp1c3QgZ2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzdHlsZSBvYmplY3Rcblx0XHRcdHJldHVybiBzdHlsZVsgbmFtZSBdO1xuXHRcdH1cblx0fSxcblxuXHRjc3M6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBleHRyYSwgc3R5bGVzICkge1xuXHRcdHZhciB2YWwsIG51bSwgaG9va3MsXG5cdFx0XHRvcmlnTmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUgKTtcblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZVxuXHRcdG5hbWUgPSBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gfHxcblx0XHRcdCggalF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdID0gdmVuZG9yUHJvcE5hbWUoIG9yaWdOYW1lICkgfHwgb3JpZ05hbWUgKTtcblxuXHRcdC8vIFRyeSBwcmVmaXhlZCBuYW1lIGZvbGxvd2VkIGJ5IHRoZSB1bnByZWZpeGVkIG5hbWVcblx0XHRob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcblxuXHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBmcm9tIHRoZXJlXG5cdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICkge1xuXHRcdFx0dmFsID0gaG9va3MuZ2V0KCBlbGVtLCB0cnVlLCBleHRyYSApO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyd2lzZSwgaWYgYSB3YXkgdG8gZ2V0IHRoZSBjb21wdXRlZCB2YWx1ZSBleGlzdHMsIHVzZSB0aGF0XG5cdFx0aWYgKCB2YWwgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHZhbCA9IGN1ckNTUyggZWxlbSwgbmFtZSwgc3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0Ly8gQ29udmVydCBcIm5vcm1hbFwiIHRvIGNvbXB1dGVkIHZhbHVlXG5cdFx0aWYgKCB2YWwgPT09IFwibm9ybWFsXCIgJiYgbmFtZSBpbiBjc3NOb3JtYWxUcmFuc2Zvcm0gKSB7XG5cdFx0XHR2YWwgPSBjc3NOb3JtYWxUcmFuc2Zvcm1bIG5hbWUgXTtcblx0XHR9XG5cblx0XHQvLyBNYWtlIG51bWVyaWMgaWYgZm9yY2VkIG9yIGEgcXVhbGlmaWVyIHdhcyBwcm92aWRlZCBhbmQgdmFsIGxvb2tzIG51bWVyaWNcblx0XHRpZiAoIGV4dHJhID09PSBcIlwiIHx8IGV4dHJhICkge1xuXHRcdFx0bnVtID0gcGFyc2VGbG9hdCggdmFsICk7XG5cdFx0XHRyZXR1cm4gZXh0cmEgPT09IHRydWUgfHwgaXNGaW5pdGUoIG51bSApID8gbnVtIHx8IDAgOiB2YWw7XG5cdFx0fVxuXHRcdHJldHVybiB2YWw7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmVhY2goIFsgXCJoZWlnaHRcIiwgXCJ3aWR0aFwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSA9IHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCwgZXh0cmEgKSB7XG5cdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXG5cdFx0XHRcdC8vIENlcnRhaW4gZWxlbWVudHMgY2FuIGhhdmUgZGltZW5zaW9uIGluZm8gaWYgd2UgaW52aXNpYmx5IHNob3cgdGhlbVxuXHRcdFx0XHQvLyBidXQgaXQgbXVzdCBoYXZlIGEgY3VycmVudCBkaXNwbGF5IHN0eWxlIHRoYXQgd291bGQgYmVuZWZpdFxuXHRcdFx0XHRyZXR1cm4gcmRpc3BsYXlzd2FwLnRlc3QoIGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkgKSAmJlxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogU2FmYXJpIDgrXG5cdFx0XHRcdFx0Ly8gVGFibGUgY29sdW1ucyBpbiBTYWZhcmkgaGF2ZSBub24temVybyBvZmZzZXRXaWR0aCAmIHplcm9cblx0XHRcdFx0XHQvLyBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCB1bmxlc3MgZGlzcGxheSBpcyBjaGFuZ2VkLlxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuXHRcdFx0XHRcdC8vIFJ1bm5pbmcgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG9uIGEgZGlzY29ubmVjdGVkIG5vZGVcblx0XHRcdFx0XHQvLyBpbiBJRSB0aHJvd3MgYW4gZXJyb3IuXG5cdFx0XHRcdFx0KCAhZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCB8fCAhZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCApID9cblx0XHRcdFx0XHRcdHN3YXAoIGVsZW0sIGNzc1Nob3csIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKTtcblx0XHRcdFx0XHRcdH0gKSA6XG5cdFx0XHRcdFx0XHRnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgZXh0cmEgKSB7XG5cdFx0XHR2YXIgbWF0Y2hlcyxcblx0XHRcdFx0c3R5bGVzID0gZXh0cmEgJiYgZ2V0U3R5bGVzKCBlbGVtICksXG5cdFx0XHRcdHN1YnRyYWN0ID0gZXh0cmEgJiYgYXVnbWVudFdpZHRoT3JIZWlnaHQoXG5cdFx0XHRcdFx0ZWxlbSxcblx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdGV4dHJhLFxuXHRcdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIFwiYm94U2l6aW5nXCIsIGZhbHNlLCBzdHlsZXMgKSA9PT0gXCJib3JkZXItYm94XCIsXG5cdFx0XHRcdFx0c3R5bGVzXG5cdFx0XHRcdCk7XG5cblx0XHRcdC8vIENvbnZlcnQgdG8gcGl4ZWxzIGlmIHZhbHVlIGFkanVzdG1lbnQgaXMgbmVlZGVkXG5cdFx0XHRpZiAoIHN1YnRyYWN0ICYmICggbWF0Y2hlcyA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKSApICYmXG5cdFx0XHRcdCggbWF0Y2hlc1sgMyBdIHx8IFwicHhcIiApICE9PSBcInB4XCIgKSB7XG5cblx0XHRcdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRcdHZhbHVlID0galF1ZXJ5LmNzcyggZWxlbSwgbmFtZSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0UG9zaXRpdmVOdW1iZXIoIGVsZW0sIHZhbHVlLCBzdWJ0cmFjdCApO1xuXHRcdH1cblx0fTtcbn0gKTtcblxualF1ZXJ5LmNzc0hvb2tzLm1hcmdpbkxlZnQgPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucmVsaWFibGVNYXJnaW5MZWZ0LFxuXHRmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRcdHJldHVybiAoIHBhcnNlRmxvYXQoIGN1ckNTUyggZWxlbSwgXCJtYXJnaW5MZWZ0XCIgKSApIHx8XG5cdFx0XHRcdGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtXG5cdFx0XHRcdFx0c3dhcCggZWxlbSwgeyBtYXJnaW5MZWZ0OiAwIH0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcblx0XHRcdFx0XHR9IClcblx0XHRcdFx0KSArIFwicHhcIjtcblx0XHR9XG5cdH1cbik7XG5cbi8vIFRoZXNlIGhvb2tzIGFyZSB1c2VkIGJ5IGFuaW1hdGUgdG8gZXhwYW5kIHByb3BlcnRpZXNcbmpRdWVyeS5lYWNoKCB7XG5cdG1hcmdpbjogXCJcIixcblx0cGFkZGluZzogXCJcIixcblx0Ym9yZGVyOiBcIldpZHRoXCJcbn0sIGZ1bmN0aW9uKCBwcmVmaXgsIHN1ZmZpeCApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXSA9IHtcblx0XHRleHBhbmQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBpID0gMCxcblx0XHRcdFx0ZXhwYW5kZWQgPSB7fSxcblxuXHRcdFx0XHQvLyBBc3N1bWVzIGEgc2luZ2xlIG51bWJlciBpZiBub3QgYSBzdHJpbmdcblx0XHRcdFx0cGFydHMgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS5zcGxpdCggXCIgXCIgKSA6IFsgdmFsdWUgXTtcblxuXHRcdFx0Zm9yICggOyBpIDwgNDsgaSsrICkge1xuXHRcdFx0XHRleHBhbmRlZFsgcHJlZml4ICsgY3NzRXhwYW5kWyBpIF0gKyBzdWZmaXggXSA9XG5cdFx0XHRcdFx0cGFydHNbIGkgXSB8fCBwYXJ0c1sgaSAtIDIgXSB8fCBwYXJ0c1sgMCBdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXhwYW5kZWQ7XG5cdFx0fVxuXHR9O1xuXG5cdGlmICggIXJtYXJnaW4udGVzdCggcHJlZml4ICkgKSB7XG5cdFx0alF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXS5zZXQgPSBzZXRQb3NpdGl2ZU51bWJlcjtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGNzczogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcblx0XHRcdHZhciBzdHlsZXMsIGxlbixcblx0XHRcdFx0bWFwID0ge30sXG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRpZiAoIGpRdWVyeS5pc0FycmF5KCBuYW1lICkgKSB7XG5cdFx0XHRcdHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApO1xuXHRcdFx0XHRsZW4gPSBuYW1lLmxlbmd0aDtcblxuXHRcdFx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0XHRtYXBbIG5hbWVbIGkgXSBdID0galF1ZXJ5LmNzcyggZWxlbSwgbmFtZVsgaSBdLCBmYWxzZSwgc3R5bGVzICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbWFwO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSwgdmFsdWUgKSA6XG5cdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIG5hbWUgKTtcblx0XHR9LCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fVxufSApO1xuXG5cbi8vIEJhc2VkIG9mZiBvZiB0aGUgcGx1Z2luIGJ5IENsaW50IEhlbGZlcnMsIHdpdGggcGVybWlzc2lvbi5cbi8vIGh0dHBzOi8vd2ViLmFyY2hpdmUub3JnL3dlYi8yMDEwMDMyNDAxNDc0Ny9odHRwOi8vYmxpbmRzaWduYWxzLmNvbS9pbmRleC5waHAvMjAwOS8wNy9qcXVlcnktZGVsYXkvXG5qUXVlcnkuZm4uZGVsYXkgPSBmdW5jdGlvbiggdGltZSwgdHlwZSApIHtcblx0dGltZSA9IGpRdWVyeS5meCA/IGpRdWVyeS5meC5zcGVlZHNbIHRpbWUgXSB8fCB0aW1lIDogdGltZTtcblx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlLCBmdW5jdGlvbiggbmV4dCwgaG9va3MgKSB7XG5cdFx0dmFyIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCggbmV4dCwgdGltZSApO1xuXHRcdGhvb2tzLnN0b3AgPSBmdW5jdGlvbigpIHtcblx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcblx0XHR9O1xuXHR9ICk7XG59O1xuXG5cbiggZnVuY3Rpb24oKSB7XG5cdHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApLFxuXHRcdHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwic2VsZWN0XCIgKSxcblx0XHRvcHQgPSBzZWxlY3QuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwib3B0aW9uXCIgKSApO1xuXG5cdGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMyBvbmx5XG5cdC8vIERlZmF1bHQgdmFsdWUgZm9yIGEgY2hlY2tib3ggc2hvdWxkIGJlIFwib25cIlxuXHRzdXBwb3J0LmNoZWNrT24gPSBpbnB1dC52YWx1ZSAhPT0gXCJcIjtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0Ly8gTXVzdCBhY2Nlc3Mgc2VsZWN0ZWRJbmRleCB0byBtYWtlIGRlZmF1bHQgb3B0aW9ucyBzZWxlY3Rcblx0c3VwcG9ydC5vcHRTZWxlY3RlZCA9IG9wdC5zZWxlY3RlZDtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0Ly8gQW4gaW5wdXQgbG9zZXMgaXRzIHZhbHVlIGFmdGVyIGJlY29taW5nIGEgcmFkaW9cblx0aW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKTtcblx0aW5wdXQudmFsdWUgPSBcInRcIjtcblx0aW5wdXQudHlwZSA9IFwicmFkaW9cIjtcblx0c3VwcG9ydC5yYWRpb1ZhbHVlID0gaW5wdXQudmFsdWUgPT09IFwidFwiO1xufSApKCk7XG5cblxudmFyIGJvb2xIb29rLFxuXHRhdHRySGFuZGxlID0galF1ZXJ5LmV4cHIuYXR0ckhhbmRsZTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRhdHRyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LmF0dHIsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9LFxuXG5cdHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBuYW1lICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIHRoaXMsIG5hbWUgKTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHRhdHRyOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0dmFyIHJldCwgaG9va3MsXG5cdFx0XHRuVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0XHQvLyBEb24ndCBnZXQvc2V0IGF0dHJpYnV0ZXMgb24gdGV4dCwgY29tbWVudCBhbmQgYXR0cmlidXRlIG5vZGVzXG5cdFx0aWYgKCBuVHlwZSA9PT0gMyB8fCBuVHlwZSA9PT0gOCB8fCBuVHlwZSA9PT0gMiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBGYWxsYmFjayB0byBwcm9wIHdoZW4gYXR0cmlidXRlcyBhcmUgbm90IHN1cHBvcnRlZFxuXHRcdGlmICggdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlID09PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5wcm9wKCBlbGVtLCBuYW1lLCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdC8vIEF0dHJpYnV0ZSBob29rcyBhcmUgZGV0ZXJtaW5lZCBieSB0aGUgbG93ZXJjYXNlIHZlcnNpb25cblx0XHQvLyBHcmFiIG5lY2Vzc2FyeSBob29rIGlmIG9uZSBpcyBkZWZpbmVkXG5cdFx0aWYgKCBuVHlwZSAhPT0gMSB8fCAhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cdFx0XHRob29rcyA9IGpRdWVyeS5hdHRySG9va3NbIG5hbWUudG9Mb3dlckNhc2UoKSBdIHx8XG5cdFx0XHRcdCggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgPyBib29sSG9vayA6IHVuZGVmaW5lZCApO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggdmFsdWUgPT09IG51bGwgKSB7XG5cdFx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgbmFtZSApICkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIHZhbHVlICsgXCJcIiApO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApICkgIT09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblxuXHRcdHJldCA9IGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIG5hbWUgKTtcblxuXHRcdC8vIE5vbi1leGlzdGVudCBhdHRyaWJ1dGVzIHJldHVybiBudWxsLCB3ZSBub3JtYWxpemUgdG8gdW5kZWZpbmVkXG5cdFx0cmV0dXJuIHJldCA9PSBudWxsID8gdW5kZWZpbmVkIDogcmV0O1xuXHR9LFxuXG5cdGF0dHJIb29rczoge1xuXHRcdHR5cGU6IHtcblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHRpZiAoICFzdXBwb3J0LnJhZGlvVmFsdWUgJiYgdmFsdWUgPT09IFwicmFkaW9cIiAmJlxuXHRcdFx0XHRcdGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJpbnB1dFwiICkgKSB7XG5cdFx0XHRcdFx0dmFyIHZhbCA9IGVsZW0udmFsdWU7XG5cdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCB2YWx1ZSApO1xuXHRcdFx0XHRcdGlmICggdmFsICkge1xuXHRcdFx0XHRcdFx0ZWxlbS52YWx1ZSA9IHZhbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHR2YXIgbmFtZSxcblx0XHRcdGkgPSAwLFxuXG5cdFx0XHQvLyBBdHRyaWJ1dGUgbmFtZXMgY2FuIGNvbnRhaW4gbm9uLUhUTUwgd2hpdGVzcGFjZSBjaGFyYWN0ZXJzXG5cdFx0XHQvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNhdHRyaWJ1dGVzLTJcblx0XHRcdGF0dHJOYW1lcyA9IHZhbHVlICYmIHZhbHVlLm1hdGNoKCBybm90aHRtbHdoaXRlICk7XG5cblx0XHRpZiAoIGF0dHJOYW1lcyAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0d2hpbGUgKCAoIG5hbWUgPSBhdHRyTmFtZXNbIGkrKyBdICkgKSB7XG5cdFx0XHRcdGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBuYW1lICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59ICk7XG5cbi8vIEhvb2tzIGZvciBib29sZWFuIGF0dHJpYnV0ZXNcbmJvb2xIb29rID0ge1xuXHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgbmFtZSApIHtcblx0XHRpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcblxuXHRcdFx0Ly8gUmVtb3ZlIGJvb2xlYW4gYXR0cmlidXRlcyB3aGVuIHNldCB0byBmYWxzZVxuXHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIGVsZW0sIG5hbWUgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIG5hbWUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5hbWU7XG5cdH1cbn07XG5cbmpRdWVyeS5lYWNoKCBqUXVlcnkuZXhwci5tYXRjaC5ib29sLnNvdXJjZS5tYXRjaCggL1xcdysvZyApLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcblx0dmFyIGdldHRlciA9IGF0dHJIYW5kbGVbIG5hbWUgXSB8fCBqUXVlcnkuZmluZC5hdHRyO1xuXG5cdGF0dHJIYW5kbGVbIG5hbWUgXSA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHR2YXIgcmV0LCBoYW5kbGUsXG5cdFx0XHRsb3dlcmNhc2VOYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cblx0XHRcdC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3AgYnkgdGVtcG9yYXJpbHkgcmVtb3ZpbmcgdGhpcyBmdW5jdGlvbiBmcm9tIHRoZSBnZXR0ZXJcblx0XHRcdGhhbmRsZSA9IGF0dHJIYW5kbGVbIGxvd2VyY2FzZU5hbWUgXTtcblx0XHRcdGF0dHJIYW5kbGVbIGxvd2VyY2FzZU5hbWUgXSA9IHJldDtcblx0XHRcdHJldCA9IGdldHRlciggZWxlbSwgbmFtZSwgaXNYTUwgKSAhPSBudWxsID9cblx0XHRcdFx0bG93ZXJjYXNlTmFtZSA6XG5cdFx0XHRcdG51bGw7XG5cdFx0XHRhdHRySGFuZGxlWyBsb3dlcmNhc2VOYW1lIF0gPSBoYW5kbGU7XG5cdFx0fVxuXHRcdHJldHVybiByZXQ7XG5cdH07XG59ICk7XG5cblxuXG5cbnZhciByZm9jdXNhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9uKSQvaSxcblx0cmNsaWNrYWJsZSA9IC9eKD86YXxhcmVhKSQvaTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRwcm9wOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LnByb3AsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9LFxuXG5cdHJlbW92ZVByb3A6IGZ1bmN0aW9uKCBuYW1lICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZGVsZXRlIHRoaXNbIGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZSBdO1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdHByb3A6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcblx0XHR2YXIgcmV0LCBob29rcyxcblx0XHRcdG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRcdC8vIERvbid0IGdldC9zZXQgcHJvcGVydGllcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcblx0XHRpZiAoIG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApICkge1xuXG5cdFx0XHQvLyBGaXggbmFtZSBhbmQgYXR0YWNoIGhvb2tzXG5cdFx0XHRuYW1lID0galF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lO1xuXHRcdFx0aG9va3MgPSBqUXVlcnkucHJvcEhvb2tzWyBuYW1lIF07XG5cdFx0fVxuXG5cdFx0aWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgbmFtZSApICkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuICggZWxlbVsgbmFtZSBdID0gdmFsdWUgKTtcblx0XHR9XG5cblx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgJiYgKCByZXQgPSBob29rcy5nZXQoIGVsZW0sIG5hbWUgKSApICE9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZWxlbVsgbmFtZSBdO1xuXHR9LFxuXG5cdHByb3BIb29rczoge1xuXHRcdHRhYkluZGV4OiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExIG9ubHlcblx0XHRcdFx0Ly8gZWxlbS50YWJJbmRleCBkb2Vzbid0IGFsd2F5cyByZXR1cm4gdGhlXG5cdFx0XHRcdC8vIGNvcnJlY3QgdmFsdWUgd2hlbiBpdCBoYXNuJ3QgYmVlbiBleHBsaWNpdGx5IHNldFxuXHRcdFx0XHQvLyBodHRwczovL3dlYi5hcmNoaXZlLm9yZy93ZWIvMjAxNDExMTYyMzMzNDcvaHR0cDovL2ZsdWlkcHJvamVjdC5vcmcvYmxvZy8yMDA4LzAxLzA5L2dldHRpbmctc2V0dGluZy1hbmQtcmVtb3ZpbmctdGFiaW5kZXgtdmFsdWVzLXdpdGgtamF2YXNjcmlwdC9cblx0XHRcdFx0Ly8gVXNlIHByb3BlciBhdHRyaWJ1dGUgcmV0cmlldmFsKCMxMjA3Milcblx0XHRcdFx0dmFyIHRhYmluZGV4ID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgXCJ0YWJpbmRleFwiICk7XG5cblx0XHRcdFx0aWYgKCB0YWJpbmRleCApIHtcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VJbnQoIHRhYmluZGV4LCAxMCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHJmb2N1c2FibGUudGVzdCggZWxlbS5ub2RlTmFtZSApIHx8XG5cdFx0XHRcdFx0cmNsaWNrYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgJiZcblx0XHRcdFx0XHRlbGVtLmhyZWZcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHByb3BGaXg6IHtcblx0XHRcImZvclwiOiBcImh0bWxGb3JcIixcblx0XHRcImNsYXNzXCI6IFwiY2xhc3NOYW1lXCJcblx0fVxufSApO1xuXG4vLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcbi8vIEFjY2Vzc2luZyB0aGUgc2VsZWN0ZWRJbmRleCBwcm9wZXJ0eVxuLy8gZm9yY2VzIHRoZSBicm93c2VyIHRvIHJlc3BlY3Qgc2V0dGluZyBzZWxlY3RlZFxuLy8gb24gdGhlIG9wdGlvblxuLy8gVGhlIGdldHRlciBlbnN1cmVzIGEgZGVmYXVsdCBvcHRpb24gaXMgc2VsZWN0ZWRcbi8vIHdoZW4gaW4gYW4gb3B0Z3JvdXBcbi8vIGVzbGludCBydWxlIFwibm8tdW51c2VkLWV4cHJlc3Npb25zXCIgaXMgZGlzYWJsZWQgZm9yIHRoaXMgY29kZVxuLy8gc2luY2UgaXQgY29uc2lkZXJzIHN1Y2ggYWNjZXNzaW9ucyBub29wXG5pZiAoICFzdXBwb3J0Lm9wdFNlbGVjdGVkICkge1xuXHRqUXVlcnkucHJvcEhvb2tzLnNlbGVjdGVkID0ge1xuXHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdC8qIGVzbGludCBuby11bnVzZWQtZXhwcmVzc2lvbnM6IFwib2ZmXCIgKi9cblxuXHRcdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdGlmICggcGFyZW50ICYmIHBhcmVudC5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRwYXJlbnQucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHQvKiBlc2xpbnQgbm8tdW51c2VkLWV4cHJlc3Npb25zOiBcIm9mZlwiICovXG5cblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRpZiAoIHBhcmVudCApIHtcblx0XHRcdFx0cGFyZW50LnNlbGVjdGVkSW5kZXg7XG5cblx0XHRcdFx0aWYgKCBwYXJlbnQucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0XHRwYXJlbnQucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuXG5qUXVlcnkuZWFjaCggW1xuXHRcInRhYkluZGV4XCIsXG5cdFwicmVhZE9ubHlcIixcblx0XCJtYXhMZW5ndGhcIixcblx0XCJjZWxsU3BhY2luZ1wiLFxuXHRcImNlbGxQYWRkaW5nXCIsXG5cdFwicm93U3BhblwiLFxuXHRcImNvbFNwYW5cIixcblx0XCJ1c2VNYXBcIixcblx0XCJmcmFtZUJvcmRlclwiLFxuXHRcImNvbnRlbnRFZGl0YWJsZVwiXG5dLCBmdW5jdGlvbigpIHtcblx0alF1ZXJ5LnByb3BGaXhbIHRoaXMudG9Mb3dlckNhc2UoKSBdID0gdGhpcztcbn0gKTtcblxuXG5cblxuXHQvLyBTdHJpcCBhbmQgY29sbGFwc2Ugd2hpdGVzcGFjZSBhY2NvcmRpbmcgdG8gSFRNTCBzcGVjXG5cdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZnJhc3RydWN0dXJlLmh0bWwjc3RyaXAtYW5kLWNvbGxhcHNlLXdoaXRlc3BhY2Vcblx0ZnVuY3Rpb24gc3RyaXBBbmRDb2xsYXBzZSggdmFsdWUgKSB7XG5cdFx0dmFyIHRva2VucyA9IHZhbHVlLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW107XG5cdFx0cmV0dXJuIHRva2Vucy5qb2luKCBcIiBcIiApO1xuXHR9XG5cblxuZnVuY3Rpb24gZ2V0Q2xhc3MoIGVsZW0gKSB7XG5cdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSAmJiBlbGVtLmdldEF0dHJpYnV0ZSggXCJjbGFzc1wiICkgfHwgXCJcIjtcbn1cblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRhZGRDbGFzczogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciBjbGFzc2VzLCBlbGVtLCBjdXIsIGN1clZhbHVlLCBjbGF6eiwgaiwgZmluYWxWYWx1ZSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBqICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5hZGRDbGFzcyggdmFsdWUuY2FsbCggdGhpcywgaiwgZ2V0Q2xhc3MoIHRoaXMgKSApICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUgKSB7XG5cdFx0XHRjbGFzc2VzID0gdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcblxuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSB0aGlzWyBpKysgXSApICkge1xuXHRcdFx0XHRjdXJWYWx1ZSA9IGdldENsYXNzKCBlbGVtICk7XG5cdFx0XHRcdGN1ciA9IGVsZW0ubm9kZVR5cGUgPT09IDEgJiYgKCBcIiBcIiArIHN0cmlwQW5kQ29sbGFwc2UoIGN1clZhbHVlICkgKyBcIiBcIiApO1xuXG5cdFx0XHRcdGlmICggY3VyICkge1xuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggKCBjbGF6eiA9IGNsYXNzZXNbIGorKyBdICkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA8IDAgKSB7XG5cdFx0XHRcdFx0XHRcdGN1ciArPSBjbGF6eiArIFwiIFwiO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE9ubHkgYXNzaWduIGlmIGRpZmZlcmVudCB0byBhdm9pZCB1bm5lZWRlZCByZW5kZXJpbmcuXG5cdFx0XHRcdFx0ZmluYWxWYWx1ZSA9IHN0cmlwQW5kQ29sbGFwc2UoIGN1ciApO1xuXHRcdFx0XHRcdGlmICggY3VyVmFsdWUgIT09IGZpbmFsVmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJjbGFzc1wiLCBmaW5hbFZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0cmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjdXJWYWx1ZSwgY2xhenosIGosIGZpbmFsVmFsdWUsXG5cdFx0XHRpID0gMDtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaiApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkucmVtb3ZlQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIGdldENsYXNzKCB0aGlzICkgKSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hdHRyKCBcImNsYXNzXCIsIFwiXCIgKTtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZSApIHtcblx0XHRcdGNsYXNzZXMgPSB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXG5cdFx0XHR3aGlsZSAoICggZWxlbSA9IHRoaXNbIGkrKyBdICkgKSB7XG5cdFx0XHRcdGN1clZhbHVlID0gZ2V0Q2xhc3MoIGVsZW0gKTtcblxuXHRcdFx0XHQvLyBUaGlzIGV4cHJlc3Npb24gaXMgaGVyZSBmb3IgYmV0dGVyIGNvbXByZXNzaWJpbGl0eSAoc2VlIGFkZENsYXNzKVxuXHRcdFx0XHRjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmICggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBjdXJWYWx1ZSApICsgXCIgXCIgKTtcblxuXHRcdFx0XHRpZiAoIGN1ciApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoICggY2xhenogPSBjbGFzc2VzWyBqKysgXSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBSZW1vdmUgKmFsbCogaW5zdGFuY2VzXG5cdFx0XHRcdFx0XHR3aGlsZSAoIGN1ci5pbmRleE9mKCBcIiBcIiArIGNsYXp6ICsgXCIgXCIgKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0XHRjdXIgPSBjdXIucmVwbGFjZSggXCIgXCIgKyBjbGF6eiArIFwiIFwiLCBcIiBcIiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE9ubHkgYXNzaWduIGlmIGRpZmZlcmVudCB0byBhdm9pZCB1bm5lZWRlZCByZW5kZXJpbmcuXG5cdFx0XHRcdFx0ZmluYWxWYWx1ZSA9IHN0cmlwQW5kQ29sbGFwc2UoIGN1ciApO1xuXHRcdFx0XHRcdGlmICggY3VyVmFsdWUgIT09IGZpbmFsVmFsdWUgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJjbGFzc1wiLCBmaW5hbFZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0dG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSwgc3RhdGVWYWwgKSB7XG5cdFx0dmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cblx0XHRpZiAoIHR5cGVvZiBzdGF0ZVZhbCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBzdGF0ZVZhbCA/IHRoaXMuYWRkQ2xhc3MoIHZhbHVlICkgOiB0aGlzLnJlbW92ZUNsYXNzKCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkudG9nZ2xlQ2xhc3MoXG5cdFx0XHRcdFx0dmFsdWUuY2FsbCggdGhpcywgaSwgZ2V0Q2xhc3MoIHRoaXMgKSwgc3RhdGVWYWwgKSxcblx0XHRcdFx0XHRzdGF0ZVZhbFxuXHRcdFx0XHQpO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGNsYXNzTmFtZSwgaSwgc2VsZiwgY2xhc3NOYW1lcztcblxuXHRcdFx0aWYgKCB0eXBlID09PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHRcdC8vIFRvZ2dsZSBpbmRpdmlkdWFsIGNsYXNzIG5hbWVzXG5cdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRzZWxmID0galF1ZXJ5KCB0aGlzICk7XG5cdFx0XHRcdGNsYXNzTmFtZXMgPSB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXG5cdFx0XHRcdHdoaWxlICggKCBjbGFzc05hbWUgPSBjbGFzc05hbWVzWyBpKysgXSApICkge1xuXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgZWFjaCBjbGFzc05hbWUgZ2l2ZW4sIHNwYWNlIHNlcGFyYXRlZCBsaXN0XG5cdFx0XHRcdFx0aWYgKCBzZWxmLmhhc0NsYXNzKCBjbGFzc05hbWUgKSApIHtcblx0XHRcdFx0XHRcdHNlbGYucmVtb3ZlQ2xhc3MoIGNsYXNzTmFtZSApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzZWxmLmFkZENsYXNzKCBjbGFzc05hbWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gVG9nZ2xlIHdob2xlIGNsYXNzIG5hbWVcblx0XHRcdH0gZWxzZSBpZiAoIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdHlwZSA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0XHRcdGNsYXNzTmFtZSA9IGdldENsYXNzKCB0aGlzICk7XG5cdFx0XHRcdGlmICggY2xhc3NOYW1lICkge1xuXG5cdFx0XHRcdFx0Ly8gU3RvcmUgY2xhc3NOYW1lIGlmIHNldFxuXHRcdFx0XHRcdGRhdGFQcml2LnNldCggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIsIGNsYXNzTmFtZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSWYgdGhlIGVsZW1lbnQgaGFzIGEgY2xhc3MgbmFtZSBvciBpZiB3ZSdyZSBwYXNzZWQgYGZhbHNlYCxcblx0XHRcdFx0Ly8gdGhlbiByZW1vdmUgdGhlIHdob2xlIGNsYXNzbmFtZSAoaWYgdGhlcmUgd2FzIG9uZSwgdGhlIGFib3ZlIHNhdmVkIGl0KS5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIGJyaW5nIGJhY2sgd2hhdGV2ZXIgd2FzIHByZXZpb3VzbHkgc2F2ZWQgKGlmIGFueXRoaW5nKSxcblx0XHRcdFx0Ly8gZmFsbGluZyBiYWNrIHRvIHRoZSBlbXB0eSBzdHJpbmcgaWYgbm90aGluZyB3YXMgc3RvcmVkLlxuXHRcdFx0XHRpZiAoIHRoaXMuc2V0QXR0cmlidXRlICkge1xuXHRcdFx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKCBcImNsYXNzXCIsXG5cdFx0XHRcdFx0XHRjbGFzc05hbWUgfHwgdmFsdWUgPT09IGZhbHNlID9cblx0XHRcdFx0XHRcdFwiXCIgOlxuXHRcdFx0XHRcdFx0ZGF0YVByaXYuZ2V0KCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiApIHx8IFwiXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGhhc0NsYXNzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGNsYXNzTmFtZSwgZWxlbSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Y2xhc3NOYW1lID0gXCIgXCIgKyBzZWxlY3RvciArIFwiIFwiO1xuXHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHQoIFwiIFwiICsgc3RyaXBBbmRDb2xsYXBzZSggZ2V0Q2xhc3MoIGVsZW0gKSApICsgXCIgXCIgKS5pbmRleE9mKCBjbGFzc05hbWUgKSA+IC0xICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufSApO1xuXG5cblxuXG52YXIgcnJldHVybiA9IC9cXHIvZztcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHR2YWw6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgaG9va3MsIHJldCwgaXNGdW5jdGlvbixcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF07XG5cblx0XHRpZiAoICFhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0XHRob29rcyA9IGpRdWVyeS52YWxIb29rc1sgZWxlbS50eXBlIF0gfHxcblx0XHRcdFx0XHRqUXVlcnkudmFsSG9va3NbIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xuXG5cdFx0XHRcdGlmICggaG9va3MgJiZcblx0XHRcdFx0XHRcImdldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdFx0KCByZXQgPSBob29rcy5nZXQoIGVsZW0sIFwidmFsdWVcIiApICkgIT09IHVuZGVmaW5lZFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0ID0gZWxlbS52YWx1ZTtcblxuXHRcdFx0XHQvLyBIYW5kbGUgbW9zdCBjb21tb24gc3RyaW5nIGNhc2VzXG5cdFx0XHRcdGlmICggdHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0XHRyZXR1cm4gcmV0LnJlcGxhY2UoIHJyZXR1cm4sIFwiXCIgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEhhbmRsZSBjYXNlcyB3aGVyZSB2YWx1ZSBpcyBudWxsL3VuZGVmIG9yIG51bWJlclxuXHRcdFx0XHRyZXR1cm4gcmV0ID09IG51bGwgPyBcIlwiIDogcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApO1xuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHR2YXIgdmFsO1xuXG5cdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgIT09IDEgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBpc0Z1bmN0aW9uICkge1xuXHRcdFx0XHR2YWwgPSB2YWx1ZS5jYWxsKCB0aGlzLCBpLCBqUXVlcnkoIHRoaXMgKS52YWwoKSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFsID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRyZWF0IG51bGwvdW5kZWZpbmVkIGFzIFwiXCI7IGNvbnZlcnQgbnVtYmVycyB0byBzdHJpbmdcblx0XHRcdGlmICggdmFsID09IG51bGwgKSB7XG5cdFx0XHRcdHZhbCA9IFwiXCI7XG5cblx0XHRcdH0gZWxzZSBpZiAoIHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCIgKSB7XG5cdFx0XHRcdHZhbCArPSBcIlwiO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBqUXVlcnkuaXNBcnJheSggdmFsICkgKSB7XG5cdFx0XHRcdHZhbCA9IGpRdWVyeS5tYXAoIHZhbCwgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICsgXCJcIjtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXG5cdFx0XHRob29rcyA9IGpRdWVyeS52YWxIb29rc1sgdGhpcy50eXBlIF0gfHwgalF1ZXJ5LnZhbEhvb2tzWyB0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuXHRcdFx0Ly8gSWYgc2V0IHJldHVybnMgdW5kZWZpbmVkLCBmYWxsIGJhY2sgdG8gbm9ybWFsIHNldHRpbmdcblx0XHRcdGlmICggIWhvb2tzIHx8ICEoIFwic2V0XCIgaW4gaG9va3MgKSB8fCBob29rcy5zZXQoIHRoaXMsIHZhbCwgXCJ2YWx1ZVwiICkgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHZhbDtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHR2YWxIb29rczoge1xuXHRcdG9wdGlvbjoge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0XHR2YXIgdmFsID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgXCJ2YWx1ZVwiICk7XG5cdFx0XHRcdHJldHVybiB2YWwgIT0gbnVsbCA/XG5cdFx0XHRcdFx0dmFsIDpcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9MTAgLSAxMSBvbmx5XG5cdFx0XHRcdFx0Ly8gb3B0aW9uLnRleHQgdGhyb3dzIGV4Y2VwdGlvbnMgKCMxNDY4NiwgIzE0ODU4KVxuXHRcdFx0XHRcdC8vIFN0cmlwIGFuZCBjb2xsYXBzZSB3aGl0ZXNwYWNlXG5cdFx0XHRcdFx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jc3RyaXAtYW5kLWNvbGxhcHNlLXdoaXRlc3BhY2Vcblx0XHRcdFx0XHRzdHJpcEFuZENvbGxhcHNlKCBqUXVlcnkudGV4dCggZWxlbSApICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRzZWxlY3Q6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSwgb3B0aW9uLCBpLFxuXHRcdFx0XHRcdG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG5cdFx0XHRcdFx0aW5kZXggPSBlbGVtLnNlbGVjdGVkSW5kZXgsXG5cdFx0XHRcdFx0b25lID0gZWxlbS50eXBlID09PSBcInNlbGVjdC1vbmVcIixcblx0XHRcdFx0XHR2YWx1ZXMgPSBvbmUgPyBudWxsIDogW10sXG5cdFx0XHRcdFx0bWF4ID0gb25lID8gaW5kZXggKyAxIDogb3B0aW9ucy5sZW5ndGg7XG5cblx0XHRcdFx0aWYgKCBpbmRleCA8IDAgKSB7XG5cdFx0XHRcdFx0aSA9IG1heDtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGkgPSBvbmUgPyBpbmRleCA6IDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBzZWxlY3RlZCBvcHRpb25zXG5cdFx0XHRcdGZvciAoIDsgaSA8IG1heDsgaSsrICkge1xuXHRcdFx0XHRcdG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG5cdFx0XHRcdFx0Ly8gSUU4LTkgZG9lc24ndCB1cGRhdGUgc2VsZWN0ZWQgYWZ0ZXIgZm9ybSByZXNldCAoIzI1NTEpXG5cdFx0XHRcdFx0aWYgKCAoIG9wdGlvbi5zZWxlY3RlZCB8fCBpID09PSBpbmRleCApICYmXG5cblx0XHRcdFx0XHRcdFx0Ly8gRG9uJ3QgcmV0dXJuIG9wdGlvbnMgdGhhdCBhcmUgZGlzYWJsZWQgb3IgaW4gYSBkaXNhYmxlZCBvcHRncm91cFxuXHRcdFx0XHRcdFx0XHQhb3B0aW9uLmRpc2FibGVkICYmXG5cdFx0XHRcdFx0XHRcdCggIW9wdGlvbi5wYXJlbnROb2RlLmRpc2FibGVkIHx8XG5cdFx0XHRcdFx0XHRcdFx0IWpRdWVyeS5ub2RlTmFtZSggb3B0aW9uLnBhcmVudE5vZGUsIFwib3B0Z3JvdXBcIiApICkgKSB7XG5cblx0XHRcdFx0XHRcdC8vIEdldCB0aGUgc3BlY2lmaWMgdmFsdWUgZm9yIHRoZSBvcHRpb25cblx0XHRcdFx0XHRcdHZhbHVlID0galF1ZXJ5KCBvcHRpb24gKS52YWwoKTtcblxuXHRcdFx0XHRcdFx0Ly8gV2UgZG9uJ3QgbmVlZCBhbiBhcnJheSBmb3Igb25lIHNlbGVjdHNcblx0XHRcdFx0XHRcdGlmICggb25lICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIE11bHRpLVNlbGVjdHMgcmV0dXJuIGFuIGFycmF5XG5cdFx0XHRcdFx0XHR2YWx1ZXMucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0XHRcdHZhciBvcHRpb25TZXQsIG9wdGlvbixcblx0XHRcdFx0XHRvcHRpb25zID0gZWxlbS5vcHRpb25zLFxuXHRcdFx0XHRcdHZhbHVlcyA9IGpRdWVyeS5tYWtlQXJyYXkoIHZhbHVlICksXG5cdFx0XHRcdFx0aSA9IG9wdGlvbnMubGVuZ3RoO1xuXG5cdFx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRcdG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuXHRcdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduICovXG5cblx0XHRcdFx0XHRpZiAoIG9wdGlvbi5zZWxlY3RlZCA9XG5cdFx0XHRcdFx0XHRqUXVlcnkuaW5BcnJheSggalF1ZXJ5LnZhbEhvb2tzLm9wdGlvbi5nZXQoIG9wdGlvbiApLCB2YWx1ZXMgKSA+IC0xXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRvcHRpb25TZXQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tY29uZC1hc3NpZ24gKi9cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcmNlIGJyb3dzZXJzIHRvIGJlaGF2ZSBjb25zaXN0ZW50bHkgd2hlbiBub24tbWF0Y2hpbmcgdmFsdWUgaXMgc2V0XG5cdFx0XHRcdGlmICggIW9wdGlvblNldCApIHtcblx0XHRcdFx0XHRlbGVtLnNlbGVjdGVkSW5kZXggPSAtMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSApO1xuXG4vLyBSYWRpb3MgYW5kIGNoZWNrYm94ZXMgZ2V0dGVyL3NldHRlclxualF1ZXJ5LmVhY2goIFsgXCJyYWRpb1wiLCBcImNoZWNrYm94XCIgXSwgZnVuY3Rpb24oKSB7XG5cdGpRdWVyeS52YWxIb29rc1sgdGhpcyBdID0ge1xuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0aWYgKCBqUXVlcnkuaXNBcnJheSggdmFsdWUgKSApIHtcblx0XHRcdFx0cmV0dXJuICggZWxlbS5jaGVja2VkID0galF1ZXJ5LmluQXJyYXkoIGpRdWVyeSggZWxlbSApLnZhbCgpLCB2YWx1ZSApID4gLTEgKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdGlmICggIXN1cHBvcnQuY2hlY2tPbiApIHtcblx0XHRqUXVlcnkudmFsSG9va3NbIHRoaXMgXS5nZXQgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiICkgPT09IG51bGwgPyBcIm9uXCIgOiBlbGVtLnZhbHVlO1xuXHRcdH07XG5cdH1cbn0gKTtcblxuXG5cblxuLy8gUmV0dXJuIGpRdWVyeSBmb3IgYXR0cmlidXRlcy1vbmx5IGluY2x1c2lvblxuXG5cbnZhciByZm9jdXNNb3JwaCA9IC9eKD86Zm9jdXNpbmZvY3VzfGZvY3Vzb3V0Ymx1cikkLztcblxualF1ZXJ5LmV4dGVuZCggalF1ZXJ5LmV2ZW50LCB7XG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIGV2ZW50LCBkYXRhLCBlbGVtLCBvbmx5SGFuZGxlcnMgKSB7XG5cblx0XHR2YXIgaSwgY3VyLCB0bXAsIGJ1YmJsZVR5cGUsIG9udHlwZSwgaGFuZGxlLCBzcGVjaWFsLFxuXHRcdFx0ZXZlbnRQYXRoID0gWyBlbGVtIHx8IGRvY3VtZW50IF0sXG5cdFx0XHR0eXBlID0gaGFzT3duLmNhbGwoIGV2ZW50LCBcInR5cGVcIiApID8gZXZlbnQudHlwZSA6IGV2ZW50LFxuXHRcdFx0bmFtZXNwYWNlcyA9IGhhc093bi5jYWxsKCBldmVudCwgXCJuYW1lc3BhY2VcIiApID8gZXZlbnQubmFtZXNwYWNlLnNwbGl0KCBcIi5cIiApIDogW107XG5cblx0XHRjdXIgPSB0bXAgPSBlbGVtID0gZWxlbSB8fCBkb2N1bWVudDtcblxuXHRcdC8vIERvbid0IGRvIGV2ZW50cyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gZm9jdXMvYmx1ciBtb3JwaHMgdG8gZm9jdXNpbi9vdXQ7IGVuc3VyZSB3ZSdyZSBub3QgZmlyaW5nIHRoZW0gcmlnaHQgbm93XG5cdFx0aWYgKCByZm9jdXNNb3JwaC50ZXN0KCB0eXBlICsgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZS5pbmRleE9mKCBcIi5cIiApID4gLTEgKSB7XG5cblx0XHRcdC8vIE5hbWVzcGFjZWQgdHJpZ2dlcjsgY3JlYXRlIGEgcmVnZXhwIHRvIG1hdGNoIGV2ZW50IHR5cGUgaW4gaGFuZGxlKClcblx0XHRcdG5hbWVzcGFjZXMgPSB0eXBlLnNwbGl0KCBcIi5cIiApO1xuXHRcdFx0dHlwZSA9IG5hbWVzcGFjZXMuc2hpZnQoKTtcblx0XHRcdG5hbWVzcGFjZXMuc29ydCgpO1xuXHRcdH1cblx0XHRvbnR5cGUgPSB0eXBlLmluZGV4T2YoIFwiOlwiICkgPCAwICYmIFwib25cIiArIHR5cGU7XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYSBqUXVlcnkuRXZlbnQgb2JqZWN0LCBPYmplY3QsIG9yIGp1c3QgYW4gZXZlbnQgdHlwZSBzdHJpbmdcblx0XHRldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cblx0XHRcdGV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIHR5cGUsIHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIiAmJiBldmVudCApO1xuXG5cdFx0Ly8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxuXHRcdGV2ZW50LmlzVHJpZ2dlciA9IG9ubHlIYW5kbGVycyA/IDIgOiAzO1xuXHRcdGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbiggXCIuXCIgKTtcblx0XHRldmVudC5ybmFtZXNwYWNlID0gZXZlbnQubmFtZXNwYWNlID9cblx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oIFwiXFxcXC4oPzouKlxcXFwufClcIiApICsgXCIoXFxcXC58JClcIiApIDpcblx0XHRcdG51bGw7XG5cblx0XHQvLyBDbGVhbiB1cCB0aGUgZXZlbnQgaW4gY2FzZSBpdCBpcyBiZWluZyByZXVzZWRcblx0XHRldmVudC5yZXN1bHQgPSB1bmRlZmluZWQ7XG5cdFx0aWYgKCAhZXZlbnQudGFyZ2V0ICkge1xuXHRcdFx0ZXZlbnQudGFyZ2V0ID0gZWxlbTtcblx0XHR9XG5cblx0XHQvLyBDbG9uZSBhbnkgaW5jb21pbmcgZGF0YSBhbmQgcHJlcGVuZCB0aGUgZXZlbnQsIGNyZWF0aW5nIHRoZSBoYW5kbGVyIGFyZyBsaXN0XG5cdFx0ZGF0YSA9IGRhdGEgPT0gbnVsbCA/XG5cdFx0XHRbIGV2ZW50IF0gOlxuXHRcdFx0alF1ZXJ5Lm1ha2VBcnJheSggZGF0YSwgWyBldmVudCBdICk7XG5cblx0XHQvLyBBbGxvdyBzcGVjaWFsIGV2ZW50cyB0byBkcmF3IG91dHNpZGUgdGhlIGxpbmVzXG5cdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmIHNwZWNpYWwudHJpZ2dlciAmJiBzcGVjaWFsLnRyaWdnZXIuYXBwbHkoIGVsZW0sIGRhdGEgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZXJtaW5lIGV2ZW50IHByb3BhZ2F0aW9uIHBhdGggaW4gYWR2YW5jZSwgcGVyIFczQyBldmVudHMgc3BlYyAoIzk5NTEpXG5cdFx0Ly8gQnViYmxlIHVwIHRvIGRvY3VtZW50LCB0aGVuIHRvIHdpbmRvdzsgd2F0Y2ggZm9yIGEgZ2xvYmFsIG93bmVyRG9jdW1lbnQgdmFyICgjOTcyNClcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgIXNwZWNpYWwubm9CdWJibGUgJiYgIWpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuXG5cdFx0XHRidWJibGVUeXBlID0gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgfHwgdHlwZTtcblx0XHRcdGlmICggIXJmb2N1c01vcnBoLnRlc3QoIGJ1YmJsZVR5cGUgKyB0eXBlICkgKSB7XG5cdFx0XHRcdGN1ciA9IGN1ci5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICggOyBjdXI7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRldmVudFBhdGgucHVzaCggY3VyICk7XG5cdFx0XHRcdHRtcCA9IGN1cjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT25seSBhZGQgd2luZG93IGlmIHdlIGdvdCB0byBkb2N1bWVudCAoZS5nLiwgbm90IHBsYWluIG9iaiBvciBkZXRhY2hlZCBET00pXG5cdFx0XHRpZiAoIHRtcCA9PT0gKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQgKSApIHtcblx0XHRcdFx0ZXZlbnRQYXRoLnB1c2goIHRtcC5kZWZhdWx0VmlldyB8fCB0bXAucGFyZW50V2luZG93IHx8IHdpbmRvdyApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEZpcmUgaGFuZGxlcnMgb24gdGhlIGV2ZW50IHBhdGhcblx0XHRpID0gMDtcblx0XHR3aGlsZSAoICggY3VyID0gZXZlbnRQYXRoWyBpKysgXSApICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXG5cdFx0XHRldmVudC50eXBlID0gaSA+IDEgP1xuXHRcdFx0XHRidWJibGVUeXBlIDpcblx0XHRcdFx0c3BlY2lhbC5iaW5kVHlwZSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBqUXVlcnkgaGFuZGxlclxuXHRcdFx0aGFuZGxlID0gKCBkYXRhUHJpdi5nZXQoIGN1ciwgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSAmJlxuXHRcdFx0XHRkYXRhUHJpdi5nZXQoIGN1ciwgXCJoYW5kbGVcIiApO1xuXHRcdFx0aWYgKCBoYW5kbGUgKSB7XG5cdFx0XHRcdGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5hdGl2ZSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSBvbnR5cGUgJiYgY3VyWyBvbnR5cGUgXTtcblx0XHRcdGlmICggaGFuZGxlICYmIGhhbmRsZS5hcHBseSAmJiBhY2NlcHREYXRhKCBjdXIgKSApIHtcblx0XHRcdFx0ZXZlbnQucmVzdWx0ID0gaGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcblx0XHRcdFx0aWYgKCBldmVudC5yZXN1bHQgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZXZlbnQudHlwZSA9IHR5cGU7XG5cblx0XHQvLyBJZiBub2JvZHkgcHJldmVudGVkIHRoZSBkZWZhdWx0IGFjdGlvbiwgZG8gaXQgbm93XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSApIHtcblxuXHRcdFx0aWYgKCAoICFzcGVjaWFsLl9kZWZhdWx0IHx8XG5cdFx0XHRcdHNwZWNpYWwuX2RlZmF1bHQuYXBwbHkoIGV2ZW50UGF0aC5wb3AoKSwgZGF0YSApID09PSBmYWxzZSApICYmXG5cdFx0XHRcdGFjY2VwdERhdGEoIGVsZW0gKSApIHtcblxuXHRcdFx0XHQvLyBDYWxsIGEgbmF0aXZlIERPTSBtZXRob2Qgb24gdGhlIHRhcmdldCB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGV2ZW50LlxuXHRcdFx0XHQvLyBEb24ndCBkbyBkZWZhdWx0IGFjdGlvbnMgb24gd2luZG93LCB0aGF0J3Mgd2hlcmUgZ2xvYmFsIHZhcmlhYmxlcyBiZSAoIzYxNzApXG5cdFx0XHRcdGlmICggb250eXBlICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCBlbGVtWyB0eXBlIF0gKSAmJiAhalF1ZXJ5LmlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdFx0XHQvLyBEb24ndCByZS10cmlnZ2VyIGFuIG9uRk9PIGV2ZW50IHdoZW4gd2UgY2FsbCBpdHMgRk9PKCkgbWV0aG9kXG5cdFx0XHRcdFx0dG1wID0gZWxlbVsgb250eXBlIF07XG5cblx0XHRcdFx0XHRpZiAoIHRtcCApIHtcblx0XHRcdFx0XHRcdGVsZW1bIG9udHlwZSBdID0gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBQcmV2ZW50IHJlLXRyaWdnZXJpbmcgb2YgdGhlIHNhbWUgZXZlbnQsIHNpbmNlIHdlIGFscmVhZHkgYnViYmxlZCBpdCBhYm92ZVxuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB0eXBlO1xuXHRcdFx0XHRcdGVsZW1bIHR5cGUgXSgpO1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdFx0XHRpZiAoIHRtcCApIHtcblx0XHRcdFx0XHRcdGVsZW1bIG9udHlwZSBdID0gdG1wO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBldmVudC5yZXN1bHQ7XG5cdH0sXG5cblx0Ly8gUGlnZ3liYWNrIG9uIGEgZG9ub3IgZXZlbnQgdG8gc2ltdWxhdGUgYSBkaWZmZXJlbnQgb25lXG5cdC8vIFVzZWQgb25seSBmb3IgYGZvY3VzKGluIHwgb3V0KWAgZXZlbnRzXG5cdHNpbXVsYXRlOiBmdW5jdGlvbiggdHlwZSwgZWxlbSwgZXZlbnQgKSB7XG5cdFx0dmFyIGUgPSBqUXVlcnkuZXh0ZW5kKFxuXHRcdFx0bmV3IGpRdWVyeS5FdmVudCgpLFxuXHRcdFx0ZXZlbnQsXG5cdFx0XHR7XG5cdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdGlzU2ltdWxhdGVkOiB0cnVlXG5cdFx0XHR9XG5cdFx0KTtcblxuXHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCBlLCBudWxsLCBlbGVtICk7XG5cdH1cblxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgdGhpcyApO1xuXHRcdH0gKTtcblx0fSxcblx0dHJpZ2dlckhhbmRsZXI6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHRcdHZhciBlbGVtID0gdGhpc1sgMCBdO1xuXHRcdGlmICggZWxlbSApIHtcblx0XHRcdHJldHVybiBqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgZWxlbSwgdHJ1ZSApO1xuXHRcdH1cblx0fVxufSApO1xuXG5cbmpRdWVyeS5lYWNoKCAoIFwiYmx1ciBmb2N1cyBmb2N1c2luIGZvY3Vzb3V0IHJlc2l6ZSBzY3JvbGwgY2xpY2sgZGJsY2xpY2sgXCIgK1xuXHRcIm1vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlIFwiICtcblx0XCJjaGFuZ2Ugc2VsZWN0IHN1Ym1pdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGNvbnRleHRtZW51XCIgKS5zcGxpdCggXCIgXCIgKSxcblx0ZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cblx0Ly8gSGFuZGxlIGV2ZW50IGJpbmRpbmdcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAwID9cblx0XHRcdHRoaXMub24oIG5hbWUsIG51bGwsIGRhdGEsIGZuICkgOlxuXHRcdFx0dGhpcy50cmlnZ2VyKCBuYW1lICk7XG5cdH07XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0aG92ZXI6IGZ1bmN0aW9uKCBmbk92ZXIsIGZuT3V0ICkge1xuXHRcdHJldHVybiB0aGlzLm1vdXNlZW50ZXIoIGZuT3ZlciApLm1vdXNlbGVhdmUoIGZuT3V0IHx8IGZuT3ZlciApO1xuXHR9XG59ICk7XG5cblxuXG5cbnN1cHBvcnQuZm9jdXNpbiA9IFwib25mb2N1c2luXCIgaW4gd2luZG93O1xuXG5cbi8vIFN1cHBvcnQ6IEZpcmVmb3ggPD00NFxuLy8gRmlyZWZveCBkb2Vzbid0IGhhdmUgZm9jdXMoaW4gfCBvdXQpIGV2ZW50c1xuLy8gUmVsYXRlZCB0aWNrZXQgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02ODc3ODdcbi8vXG4vLyBTdXBwb3J0OiBDaHJvbWUgPD00OCAtIDQ5LCBTYWZhcmkgPD05LjAgLSA5LjFcbi8vIGZvY3VzKGluIHwgb3V0KSBldmVudHMgZmlyZSBhZnRlciBmb2N1cyAmIGJsdXIgZXZlbnRzLFxuLy8gd2hpY2ggaXMgc3BlYyB2aW9sYXRpb24gLSBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2V2ZW50cy1mb2N1c2V2ZW50LWV2ZW50LW9yZGVyXG4vLyBSZWxhdGVkIHRpY2tldCAtIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ0OTg1N1xuaWYgKCAhc3VwcG9ydC5mb2N1c2luICkge1xuXHRqUXVlcnkuZWFjaCggeyBmb2N1czogXCJmb2N1c2luXCIsIGJsdXI6IFwiZm9jdXNvdXRcIiB9LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuXG5cdFx0Ly8gQXR0YWNoIGEgc2luZ2xlIGNhcHR1cmluZyBoYW5kbGVyIG9uIHRoZSBkb2N1bWVudCB3aGlsZSBzb21lb25lIHdhbnRzIGZvY3VzaW4vZm9jdXNvdXRcblx0XHR2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdGpRdWVyeS5ldmVudC5zaW11bGF0ZSggZml4LCBldmVudC50YXJnZXQsIGpRdWVyeS5ldmVudC5maXgoIGV2ZW50ICkgKTtcblx0XHR9O1xuXG5cdFx0alF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGZpeCBdID0ge1xuXHRcdFx0c2V0dXA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZG9jID0gdGhpcy5vd25lckRvY3VtZW50IHx8IHRoaXMsXG5cdFx0XHRcdFx0YXR0YWNoZXMgPSBkYXRhUHJpdi5hY2Nlc3MoIGRvYywgZml4ICk7XG5cblx0XHRcdFx0aWYgKCAhYXR0YWNoZXMgKSB7XG5cdFx0XHRcdFx0ZG9jLmFkZEV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkYXRhUHJpdi5hY2Nlc3MoIGRvYywgZml4LCAoIGF0dGFjaGVzIHx8IDAgKSArIDEgKTtcblx0XHRcdH0sXG5cdFx0XHR0ZWFyZG93bjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcblx0XHRcdFx0XHRhdHRhY2hlcyA9IGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXggKSAtIDE7XG5cblx0XHRcdFx0aWYgKCAhYXR0YWNoZXMgKSB7XG5cdFx0XHRcdFx0ZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcblx0XHRcdFx0XHRkYXRhUHJpdi5yZW1vdmUoIGRvYywgZml4ICk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkYXRhUHJpdi5hY2Nlc3MoIGRvYywgZml4LCBhdHRhY2hlcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fSApO1xufVxuXG5cbnZhclxuXHRyYnJhY2tldCA9IC9cXFtcXF0kLyxcblx0ckNSTEYgPSAvXFxyP1xcbi9nLFxuXHRyc3VibWl0dGVyVHlwZXMgPSAvXig/OnN1Ym1pdHxidXR0b258aW1hZ2V8cmVzZXR8ZmlsZSkkL2ksXG5cdHJzdWJtaXR0YWJsZSA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGtleWdlbikvaTtcblxuZnVuY3Rpb24gYnVpbGRQYXJhbXMoIHByZWZpeCwgb2JqLCB0cmFkaXRpb25hbCwgYWRkICkge1xuXHR2YXIgbmFtZTtcblxuXHRpZiAoIGpRdWVyeS5pc0FycmF5KCBvYmogKSApIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSBhcnJheSBpdGVtLlxuXHRcdGpRdWVyeS5lYWNoKCBvYmosIGZ1bmN0aW9uKCBpLCB2ICkge1xuXHRcdFx0aWYgKCB0cmFkaXRpb25hbCB8fCByYnJhY2tldC50ZXN0KCBwcmVmaXggKSApIHtcblxuXHRcdFx0XHQvLyBUcmVhdCBlYWNoIGFycmF5IGl0ZW0gYXMgYSBzY2FsYXIuXG5cdFx0XHRcdGFkZCggcHJlZml4LCB2ICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gSXRlbSBpcyBub24tc2NhbGFyIChhcnJheSBvciBvYmplY3QpLCBlbmNvZGUgaXRzIG51bWVyaWMgaW5kZXguXG5cdFx0XHRcdGJ1aWxkUGFyYW1zKFxuXHRcdFx0XHRcdHByZWZpeCArIFwiW1wiICsgKCB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIiAmJiB2ICE9IG51bGwgPyBpIDogXCJcIiApICsgXCJdXCIsXG5cdFx0XHRcdFx0dixcblx0XHRcdFx0XHR0cmFkaXRpb25hbCxcblx0XHRcdFx0XHRhZGRcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9ICk7XG5cblx0fSBlbHNlIGlmICggIXRyYWRpdGlvbmFsICYmIGpRdWVyeS50eXBlKCBvYmogKSA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSBvYmplY3QgaXRlbS5cblx0XHRmb3IgKCBuYW1lIGluIG9iaiApIHtcblx0XHRcdGJ1aWxkUGFyYW1zKCBwcmVmaXggKyBcIltcIiArIG5hbWUgKyBcIl1cIiwgb2JqWyBuYW1lIF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHR9XG5cblx0fSBlbHNlIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSBzY2FsYXIgaXRlbS5cblx0XHRhZGQoIHByZWZpeCwgb2JqICk7XG5cdH1cbn1cblxuLy8gU2VyaWFsaXplIGFuIGFycmF5IG9mIGZvcm0gZWxlbWVudHMgb3IgYSBzZXQgb2Zcbi8vIGtleS92YWx1ZXMgaW50byBhIHF1ZXJ5IHN0cmluZ1xualF1ZXJ5LnBhcmFtID0gZnVuY3Rpb24oIGEsIHRyYWRpdGlvbmFsICkge1xuXHR2YXIgcHJlZml4LFxuXHRcdHMgPSBbXSxcblx0XHRhZGQgPSBmdW5jdGlvbigga2V5LCB2YWx1ZU9yRnVuY3Rpb24gKSB7XG5cblx0XHRcdC8vIElmIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGludm9rZSBpdCBhbmQgdXNlIGl0cyByZXR1cm4gdmFsdWVcblx0XHRcdHZhciB2YWx1ZSA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZU9yRnVuY3Rpb24gKSA/XG5cdFx0XHRcdHZhbHVlT3JGdW5jdGlvbigpIDpcblx0XHRcdFx0dmFsdWVPckZ1bmN0aW9uO1xuXG5cdFx0XHRzWyBzLmxlbmd0aCBdID0gZW5jb2RlVVJJQ29tcG9uZW50KCBrZXkgKSArIFwiPVwiICtcblx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KCB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICk7XG5cdFx0fTtcblxuXHQvLyBJZiBhbiBhcnJheSB3YXMgcGFzc2VkIGluLCBhc3N1bWUgdGhhdCBpdCBpcyBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzLlxuXHRpZiAoIGpRdWVyeS5pc0FycmF5KCBhICkgfHwgKCBhLmpxdWVyeSAmJiAhalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGEgKSApICkge1xuXG5cdFx0Ly8gU2VyaWFsaXplIHRoZSBmb3JtIGVsZW1lbnRzXG5cdFx0alF1ZXJ5LmVhY2goIGEsIGZ1bmN0aW9uKCkge1xuXHRcdFx0YWRkKCB0aGlzLm5hbWUsIHRoaXMudmFsdWUgKTtcblx0XHR9ICk7XG5cblx0fSBlbHNlIHtcblxuXHRcdC8vIElmIHRyYWRpdGlvbmFsLCBlbmNvZGUgdGhlIFwib2xkXCIgd2F5ICh0aGUgd2F5IDEuMy4yIG9yIG9sZGVyXG5cdFx0Ly8gZGlkIGl0KSwgb3RoZXJ3aXNlIGVuY29kZSBwYXJhbXMgcmVjdXJzaXZlbHkuXG5cdFx0Zm9yICggcHJlZml4IGluIGEgKSB7XG5cdFx0XHRidWlsZFBhcmFtcyggcHJlZml4LCBhWyBwcmVmaXggXSwgdHJhZGl0aW9uYWwsIGFkZCApO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIHNlcmlhbGl6YXRpb25cblx0cmV0dXJuIHMuam9pbiggXCImXCIgKTtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0c2VyaWFsaXplOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4galF1ZXJ5LnBhcmFtKCB0aGlzLnNlcmlhbGl6ZUFycmF5KCkgKTtcblx0fSxcblx0c2VyaWFsaXplQXJyYXk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIENhbiBhZGQgcHJvcEhvb2sgZm9yIFwiZWxlbWVudHNcIiB0byBmaWx0ZXIgb3IgYWRkIGZvcm0gZWxlbWVudHNcblx0XHRcdHZhciBlbGVtZW50cyA9IGpRdWVyeS5wcm9wKCB0aGlzLCBcImVsZW1lbnRzXCIgKTtcblx0XHRcdHJldHVybiBlbGVtZW50cyA/IGpRdWVyeS5tYWtlQXJyYXkoIGVsZW1lbnRzICkgOiB0aGlzO1xuXHRcdH0gKVxuXHRcdC5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHR5cGUgPSB0aGlzLnR5cGU7XG5cblx0XHRcdC8vIFVzZSAuaXMoIFwiOmRpc2FibGVkXCIgKSBzbyB0aGF0IGZpZWxkc2V0W2Rpc2FibGVkXSB3b3Jrc1xuXHRcdFx0cmV0dXJuIHRoaXMubmFtZSAmJiAhalF1ZXJ5KCB0aGlzICkuaXMoIFwiOmRpc2FibGVkXCIgKSAmJlxuXHRcdFx0XHRyc3VibWl0dGFibGUudGVzdCggdGhpcy5ub2RlTmFtZSApICYmICFyc3VibWl0dGVyVHlwZXMudGVzdCggdHlwZSApICYmXG5cdFx0XHRcdCggdGhpcy5jaGVja2VkIHx8ICFyY2hlY2thYmxlVHlwZS50ZXN0KCB0eXBlICkgKTtcblx0XHR9IClcblx0XHQubWFwKCBmdW5jdGlvbiggaSwgZWxlbSApIHtcblx0XHRcdHZhciB2YWwgPSBqUXVlcnkoIHRoaXMgKS52YWwoKTtcblxuXHRcdFx0aWYgKCB2YWwgPT0gbnVsbCApIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbCApICkge1xuXHRcdFx0XHRyZXR1cm4galF1ZXJ5Lm1hcCggdmFsLCBmdW5jdGlvbiggdmFsICkge1xuXHRcdFx0XHRcdHJldHVybiB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHsgbmFtZTogZWxlbS5uYW1lLCB2YWx1ZTogdmFsLnJlcGxhY2UoIHJDUkxGLCBcIlxcclxcblwiICkgfTtcblx0XHR9ICkuZ2V0KCk7XG5cdH1cbn0gKTtcblxuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHdyYXBBbGw6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHZhciB3cmFwO1xuXG5cdFx0aWYgKCB0aGlzWyAwIF0gKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBodG1sICkgKSB7XG5cdFx0XHRcdGh0bWwgPSBodG1sLmNhbGwoIHRoaXNbIDAgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUaGUgZWxlbWVudHMgdG8gd3JhcCB0aGUgdGFyZ2V0IGFyb3VuZFxuXHRcdFx0d3JhcCA9IGpRdWVyeSggaHRtbCwgdGhpc1sgMCBdLm93bmVyRG9jdW1lbnQgKS5lcSggMCApLmNsb25lKCB0cnVlICk7XG5cblx0XHRcdGlmICggdGhpc1sgMCBdLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHdyYXAuaW5zZXJ0QmVmb3JlKCB0aGlzWyAwIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0d3JhcC5tYXAoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZWxlbSA9IHRoaXM7XG5cblx0XHRcdFx0d2hpbGUgKCBlbGVtLmZpcnN0RWxlbWVudENoaWxkICkge1xuXHRcdFx0XHRcdGVsZW0gPSBlbGVtLmZpcnN0RWxlbWVudENoaWxkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGVsZW07XG5cdFx0XHR9ICkuYXBwZW5kKCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0d3JhcElubmVyOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBodG1sICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkud3JhcElubmVyKCBodG1sLmNhbGwoIHRoaXMsIGkgKSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHNlbGYgPSBqUXVlcnkoIHRoaXMgKSxcblx0XHRcdFx0Y29udGVudHMgPSBzZWxmLmNvbnRlbnRzKCk7XG5cblx0XHRcdGlmICggY29udGVudHMubGVuZ3RoICkge1xuXHRcdFx0XHRjb250ZW50cy53cmFwQWxsKCBodG1sICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGYuYXBwZW5kKCBodG1sICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdHdyYXA6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHZhciBpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIGh0bWwgKTtcblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0alF1ZXJ5KCB0aGlzICkud3JhcEFsbCggaXNGdW5jdGlvbiA/IGh0bWwuY2FsbCggdGhpcywgaSApIDogaHRtbCApO1xuXHRcdH0gKTtcblx0fSxcblxuXHR1bndyYXA6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR0aGlzLnBhcmVudCggc2VsZWN0b3IgKS5ub3QoIFwiYm9keVwiICkuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkoIHRoaXMgKS5yZXBsYWNlV2l0aCggdGhpcy5jaGlsZE5vZGVzICk7XG5cdFx0fSApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59ICk7XG5cblxualF1ZXJ5LmV4cHIucHNldWRvcy5oaWRkZW4gPSBmdW5jdGlvbiggZWxlbSApIHtcblx0cmV0dXJuICFqUXVlcnkuZXhwci5wc2V1ZG9zLnZpc2libGUoIGVsZW0gKTtcbn07XG5qUXVlcnkuZXhwci5wc2V1ZG9zLnZpc2libGUgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0cmV0dXJuICEhKCBlbGVtLm9mZnNldFdpZHRoIHx8IGVsZW0ub2Zmc2V0SGVpZ2h0IHx8IGVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggKTtcbn07XG5cblxuXG5cbi8vIFN1cHBvcnQ6IFNhZmFyaSA4IG9ubHlcbi8vIEluIFNhZmFyaSA4IGRvY3VtZW50cyBjcmVhdGVkIHZpYSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnRcbi8vIGNvbGxhcHNlIHNpYmxpbmcgZm9ybXM6IHRoZSBzZWNvbmQgb25lIGJlY29tZXMgYSBjaGlsZCBvZiB0aGUgZmlyc3Qgb25lLlxuLy8gQmVjYXVzZSBvZiB0aGF0LCB0aGlzIHNlY3VyaXR5IG1lYXN1cmUgaGFzIHRvIGJlIGRpc2FibGVkIGluIFNhZmFyaSA4LlxuLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNzMzN1xuc3VwcG9ydC5jcmVhdGVIVE1MRG9jdW1lbnQgPSAoIGZ1bmN0aW9uKCkge1xuXHR2YXIgYm9keSA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCggXCJcIiApLmJvZHk7XG5cdGJvZHkuaW5uZXJIVE1MID0gXCI8Zm9ybT48L2Zvcm0+PGZvcm0+PC9mb3JtPlwiO1xuXHRyZXR1cm4gYm9keS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMjtcbn0gKSgpO1xuXG5cbi8vIEFyZ3VtZW50IFwiZGF0YVwiIHNob3VsZCBiZSBzdHJpbmcgb2YgaHRtbFxuLy8gY29udGV4dCAob3B0aW9uYWwpOiBJZiBzcGVjaWZpZWQsIHRoZSBmcmFnbWVudCB3aWxsIGJlIGNyZWF0ZWQgaW4gdGhpcyBjb250ZXh0LFxuLy8gZGVmYXVsdHMgdG8gZG9jdW1lbnRcbi8vIGtlZXBTY3JpcHRzIChvcHRpb25hbCk6IElmIHRydWUsIHdpbGwgaW5jbHVkZSBzY3JpcHRzIHBhc3NlZCBpbiB0aGUgaHRtbCBzdHJpbmdcbmpRdWVyeS5wYXJzZUhUTUwgPSBmdW5jdGlvbiggZGF0YSwgY29udGV4dCwga2VlcFNjcmlwdHMgKSB7XG5cdGlmICggdHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdGtlZXBTY3JpcHRzID0gY29udGV4dDtcblx0XHRjb250ZXh0ID0gZmFsc2U7XG5cdH1cblxuXHR2YXIgYmFzZSwgcGFyc2VkLCBzY3JpcHRzO1xuXG5cdGlmICggIWNvbnRleHQgKSB7XG5cblx0XHQvLyBTdG9wIHNjcmlwdHMgb3IgaW5saW5lIGV2ZW50IGhhbmRsZXJzIGZyb20gYmVpbmcgZXhlY3V0ZWQgaW1tZWRpYXRlbHlcblx0XHQvLyBieSB1c2luZyBkb2N1bWVudC5pbXBsZW1lbnRhdGlvblxuXHRcdGlmICggc3VwcG9ydC5jcmVhdGVIVE1MRG9jdW1lbnQgKSB7XG5cdFx0XHRjb250ZXh0ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCBcIlwiICk7XG5cblx0XHRcdC8vIFNldCB0aGUgYmFzZSBocmVmIGZvciB0aGUgY3JlYXRlZCBkb2N1bWVudFxuXHRcdFx0Ly8gc28gYW55IHBhcnNlZCBlbGVtZW50cyB3aXRoIFVSTHNcblx0XHRcdC8vIGFyZSBiYXNlZCBvbiB0aGUgZG9jdW1lbnQncyBVUkwgKGdoLTI5NjUpXG5cdFx0XHRiYXNlID0gY29udGV4dC5jcmVhdGVFbGVtZW50KCBcImJhc2VcIiApO1xuXHRcdFx0YmFzZS5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcblx0XHRcdGNvbnRleHQuaGVhZC5hcHBlbmRDaGlsZCggYmFzZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb250ZXh0ID0gZG9jdW1lbnQ7XG5cdFx0fVxuXHR9XG5cblx0cGFyc2VkID0gcnNpbmdsZVRhZy5leGVjKCBkYXRhICk7XG5cdHNjcmlwdHMgPSAha2VlcFNjcmlwdHMgJiYgW107XG5cblx0Ly8gU2luZ2xlIHRhZ1xuXHRpZiAoIHBhcnNlZCApIHtcblx0XHRyZXR1cm4gWyBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIHBhcnNlZFsgMSBdICkgXTtcblx0fVxuXG5cdHBhcnNlZCA9IGJ1aWxkRnJhZ21lbnQoIFsgZGF0YSBdLCBjb250ZXh0LCBzY3JpcHRzICk7XG5cblx0aWYgKCBzY3JpcHRzICYmIHNjcmlwdHMubGVuZ3RoICkge1xuXHRcdGpRdWVyeSggc2NyaXB0cyApLnJlbW92ZSgpO1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeS5tZXJnZSggW10sIHBhcnNlZC5jaGlsZE5vZGVzICk7XG59O1xuXG5cbi8qKlxuICogR2V0cyBhIHdpbmRvdyBmcm9tIGFuIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gZ2V0V2luZG93KCBlbGVtICkge1xuXHRyZXR1cm4galF1ZXJ5LmlzV2luZG93KCBlbGVtICkgPyBlbGVtIDogZWxlbS5ub2RlVHlwZSA9PT0gOSAmJiBlbGVtLmRlZmF1bHRWaWV3O1xufVxuXG5qUXVlcnkub2Zmc2V0ID0ge1xuXHRzZXRPZmZzZXQ6IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBpICkge1xuXHRcdHZhciBjdXJQb3NpdGlvbiwgY3VyTGVmdCwgY3VyQ1NTVG9wLCBjdXJUb3AsIGN1ck9mZnNldCwgY3VyQ1NTTGVmdCwgY2FsY3VsYXRlUG9zaXRpb24sXG5cdFx0XHRwb3NpdGlvbiA9IGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApLFxuXHRcdFx0Y3VyRWxlbSA9IGpRdWVyeSggZWxlbSApLFxuXHRcdFx0cHJvcHMgPSB7fTtcblxuXHRcdC8vIFNldCBwb3NpdGlvbiBmaXJzdCwgaW4tY2FzZSB0b3AvbGVmdCBhcmUgc2V0IGV2ZW4gb24gc3RhdGljIGVsZW1cblx0XHRpZiAoIHBvc2l0aW9uID09PSBcInN0YXRpY1wiICkge1xuXHRcdFx0ZWxlbS5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcblx0XHR9XG5cblx0XHRjdXJPZmZzZXQgPSBjdXJFbGVtLm9mZnNldCgpO1xuXHRcdGN1ckNTU1RvcCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwidG9wXCIgKTtcblx0XHRjdXJDU1NMZWZ0ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJsZWZ0XCIgKTtcblx0XHRjYWxjdWxhdGVQb3NpdGlvbiA9ICggcG9zaXRpb24gPT09IFwiYWJzb2x1dGVcIiB8fCBwb3NpdGlvbiA9PT0gXCJmaXhlZFwiICkgJiZcblx0XHRcdCggY3VyQ1NTVG9wICsgY3VyQ1NTTGVmdCApLmluZGV4T2YoIFwiYXV0b1wiICkgPiAtMTtcblxuXHRcdC8vIE5lZWQgdG8gYmUgYWJsZSB0byBjYWxjdWxhdGUgcG9zaXRpb24gaWYgZWl0aGVyXG5cdFx0Ly8gdG9wIG9yIGxlZnQgaXMgYXV0byBhbmQgcG9zaXRpb24gaXMgZWl0aGVyIGFic29sdXRlIG9yIGZpeGVkXG5cdFx0aWYgKCBjYWxjdWxhdGVQb3NpdGlvbiApIHtcblx0XHRcdGN1clBvc2l0aW9uID0gY3VyRWxlbS5wb3NpdGlvbigpO1xuXHRcdFx0Y3VyVG9wID0gY3VyUG9zaXRpb24udG9wO1xuXHRcdFx0Y3VyTGVmdCA9IGN1clBvc2l0aW9uLmxlZnQ7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VyVG9wID0gcGFyc2VGbG9hdCggY3VyQ1NTVG9wICkgfHwgMDtcblx0XHRcdGN1ckxlZnQgPSBwYXJzZUZsb2F0KCBjdXJDU1NMZWZ0ICkgfHwgMDtcblx0XHR9XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBvcHRpb25zICkgKSB7XG5cblx0XHRcdC8vIFVzZSBqUXVlcnkuZXh0ZW5kIGhlcmUgdG8gYWxsb3cgbW9kaWZpY2F0aW9uIG9mIGNvb3JkaW5hdGVzIGFyZ3VtZW50IChnaC0xODQ4KVxuXHRcdFx0b3B0aW9ucyA9IG9wdGlvbnMuY2FsbCggZWxlbSwgaSwgalF1ZXJ5LmV4dGVuZCgge30sIGN1ck9mZnNldCApICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBvcHRpb25zLnRvcCAhPSBudWxsICkge1xuXHRcdFx0cHJvcHMudG9wID0gKCBvcHRpb25zLnRvcCAtIGN1ck9mZnNldC50b3AgKSArIGN1clRvcDtcblx0XHR9XG5cdFx0aWYgKCBvcHRpb25zLmxlZnQgIT0gbnVsbCApIHtcblx0XHRcdHByb3BzLmxlZnQgPSAoIG9wdGlvbnMubGVmdCAtIGN1ck9mZnNldC5sZWZ0ICkgKyBjdXJMZWZ0O1xuXHRcdH1cblxuXHRcdGlmICggXCJ1c2luZ1wiIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRvcHRpb25zLnVzaW5nLmNhbGwoIGVsZW0sIHByb3BzICk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VyRWxlbS5jc3MoIHByb3BzICk7XG5cdFx0fVxuXHR9XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdG9mZnNldDogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cblx0XHQvLyBQcmVzZXJ2ZSBjaGFpbmluZyBmb3Igc2V0dGVyXG5cdFx0aWYgKCBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdHRoaXMgOlxuXHRcdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRcdGpRdWVyeS5vZmZzZXQuc2V0T2Zmc2V0KCB0aGlzLCBvcHRpb25zLCBpICk7XG5cdFx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHR2YXIgZG9jRWxlbSwgd2luLCByZWN0LCBkb2MsXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdO1xuXG5cdFx0aWYgKCAhZWxlbSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0XHQvLyBSdW5uaW5nIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBvbiBhXG5cdFx0Ly8gZGlzY29ubmVjdGVkIG5vZGUgaW4gSUUgdGhyb3dzIGFuIGVycm9yXG5cdFx0aWYgKCAhZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCApIHtcblx0XHRcdHJldHVybiB7IHRvcDogMCwgbGVmdDogMCB9O1xuXHRcdH1cblxuXHRcdHJlY3QgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0Ly8gTWFrZSBzdXJlIGVsZW1lbnQgaXMgbm90IGhpZGRlbiAoZGlzcGxheTogbm9uZSlcblx0XHRpZiAoIHJlY3Qud2lkdGggfHwgcmVjdC5oZWlnaHQgKSB7XG5cdFx0XHRkb2MgPSBlbGVtLm93bmVyRG9jdW1lbnQ7XG5cdFx0XHR3aW4gPSBnZXRXaW5kb3coIGRvYyApO1xuXHRcdFx0ZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQgLSBkb2NFbGVtLmNsaWVudFRvcCxcblx0XHRcdFx0bGVmdDogcmVjdC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRMZWZ0XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiB6ZXJvcyBmb3IgZGlzY29ubmVjdGVkIGFuZCBoaWRkZW4gZWxlbWVudHMgKGdoLTIzMTApXG5cdFx0cmV0dXJuIHJlY3Q7XG5cdH0sXG5cblx0cG9zaXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggIXRoaXNbIDAgXSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgb2Zmc2V0UGFyZW50LCBvZmZzZXQsXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdLFxuXHRcdFx0cGFyZW50T2Zmc2V0ID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcblxuXHRcdC8vIEZpeGVkIGVsZW1lbnRzIGFyZSBvZmZzZXQgZnJvbSB3aW5kb3cgKHBhcmVudE9mZnNldCA9IHt0b3A6MCwgbGVmdDogMH0sXG5cdFx0Ly8gYmVjYXVzZSBpdCBpcyBpdHMgb25seSBvZmZzZXQgcGFyZW50XG5cdFx0aWYgKCBqUXVlcnkuY3NzKCBlbGVtLCBcInBvc2l0aW9uXCIgKSA9PT0gXCJmaXhlZFwiICkge1xuXG5cdFx0XHQvLyBBc3N1bWUgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlzIHRoZXJlIHdoZW4gY29tcHV0ZWQgcG9zaXRpb24gaXMgZml4ZWRcblx0XHRcdG9mZnNldCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBHZXQgKnJlYWwqIG9mZnNldFBhcmVudFxuXHRcdFx0b2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQoKTtcblxuXHRcdFx0Ly8gR2V0IGNvcnJlY3Qgb2Zmc2V0c1xuXHRcdFx0b2Zmc2V0ID0gdGhpcy5vZmZzZXQoKTtcblx0XHRcdGlmICggIWpRdWVyeS5ub2RlTmFtZSggb2Zmc2V0UGFyZW50WyAwIF0sIFwiaHRtbFwiICkgKSB7XG5cdFx0XHRcdHBhcmVudE9mZnNldCA9IG9mZnNldFBhcmVudC5vZmZzZXQoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIG9mZnNldFBhcmVudCBib3JkZXJzXG5cdFx0XHRwYXJlbnRPZmZzZXQgPSB7XG5cdFx0XHRcdHRvcDogcGFyZW50T2Zmc2V0LnRvcCArIGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudFsgMCBdLCBcImJvcmRlclRvcFdpZHRoXCIsIHRydWUgKSxcblx0XHRcdFx0bGVmdDogcGFyZW50T2Zmc2V0LmxlZnQgKyBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnRbIDAgXSwgXCJib3JkZXJMZWZ0V2lkdGhcIiwgdHJ1ZSApXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIFN1YnRyYWN0IHBhcmVudCBvZmZzZXRzIGFuZCBlbGVtZW50IG1hcmdpbnNcblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiBvZmZzZXQudG9wIC0gcGFyZW50T2Zmc2V0LnRvcCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luVG9wXCIsIHRydWUgKSxcblx0XHRcdGxlZnQ6IG9mZnNldC5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnQgLSBqUXVlcnkuY3NzKCBlbGVtLCBcIm1hcmdpbkxlZnRcIiwgdHJ1ZSApXG5cdFx0fTtcblx0fSxcblxuXHQvLyBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBkb2N1bWVudEVsZW1lbnQgaW4gdGhlIGZvbGxvd2luZyBjYXNlczpcblx0Ly8gMSkgRm9yIHRoZSBlbGVtZW50IGluc2lkZSB0aGUgaWZyYW1lIHdpdGhvdXQgb2Zmc2V0UGFyZW50LCB0aGlzIG1ldGhvZCB3aWxsIHJldHVyblxuXHQvLyAgICBkb2N1bWVudEVsZW1lbnQgb2YgdGhlIHBhcmVudCB3aW5kb3dcblx0Ly8gMikgRm9yIHRoZSBoaWRkZW4gb3IgZGV0YWNoZWQgZWxlbWVudFxuXHQvLyAzKSBGb3IgYm9keSBvciBodG1sIGVsZW1lbnQsIGkuZS4gaW4gY2FzZSBvZiB0aGUgaHRtbCBub2RlIC0gaXQgd2lsbCByZXR1cm4gaXRzZWxmXG5cdC8vXG5cdC8vIGJ1dCB0aG9zZSBleGNlcHRpb25zIHdlcmUgbmV2ZXIgcHJlc2VudGVkIGFzIGEgcmVhbCBsaWZlIHVzZS1jYXNlc1xuXHQvLyBhbmQgbWlnaHQgYmUgY29uc2lkZXJlZCBhcyBtb3JlIHByZWZlcmFibGUgcmVzdWx0cy5cblx0Ly9cblx0Ly8gVGhpcyBsb2dpYywgaG93ZXZlciwgaXMgbm90IGd1YXJhbnRlZWQgYW5kIGNhbiBjaGFuZ2UgYXQgYW55IHBvaW50IGluIHRoZSBmdXR1cmVcblx0b2Zmc2V0UGFyZW50OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50O1xuXG5cdFx0XHR3aGlsZSAoIG9mZnNldFBhcmVudCAmJiBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwicG9zaXRpb25cIiApID09PSBcInN0YXRpY1wiICkge1xuXHRcdFx0XHRvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb2Zmc2V0UGFyZW50IHx8IGRvY3VtZW50RWxlbWVudDtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxuLy8gQ3JlYXRlIHNjcm9sbExlZnQgYW5kIHNjcm9sbFRvcCBtZXRob2RzXG5qUXVlcnkuZWFjaCggeyBzY3JvbGxMZWZ0OiBcInBhZ2VYT2Zmc2V0XCIsIHNjcm9sbFRvcDogXCJwYWdlWU9mZnNldFwiIH0sIGZ1bmN0aW9uKCBtZXRob2QsIHByb3AgKSB7XG5cdHZhciB0b3AgPSBcInBhZ2VZT2Zmc2V0XCIgPT09IHByb3A7XG5cblx0alF1ZXJ5LmZuWyBtZXRob2QgXSA9IGZ1bmN0aW9uKCB2YWwgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIG1ldGhvZCwgdmFsICkge1xuXHRcdFx0dmFyIHdpbiA9IGdldFdpbmRvdyggZWxlbSApO1xuXG5cdFx0XHRpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gd2luID8gd2luWyBwcm9wIF0gOiBlbGVtWyBtZXRob2QgXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB3aW4gKSB7XG5cdFx0XHRcdHdpbi5zY3JvbGxUbyhcblx0XHRcdFx0XHQhdG9wID8gdmFsIDogd2luLnBhZ2VYT2Zmc2V0LFxuXHRcdFx0XHRcdHRvcCA/IHZhbCA6IHdpbi5wYWdlWU9mZnNldFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtWyBtZXRob2QgXSA9IHZhbDtcblx0XHRcdH1cblx0XHR9LCBtZXRob2QsIHZhbCwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9O1xufSApO1xuXG4vLyBTdXBwb3J0OiBTYWZhcmkgPD03IC0gOS4xLCBDaHJvbWUgPD0zNyAtIDQ5XG4vLyBBZGQgdGhlIHRvcC9sZWZ0IGNzc0hvb2tzIHVzaW5nIGpRdWVyeS5mbi5wb3NpdGlvblxuLy8gV2Via2l0IGJ1ZzogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTI5MDg0XG4vLyBCbGluayBidWc6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTU4OTM0N1xuLy8gZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIHBlcmNlbnQgd2hlbiBzcGVjaWZpZWQgZm9yIHRvcC9sZWZ0L2JvdHRvbS9yaWdodDtcbi8vIHJhdGhlciB0aGFuIG1ha2UgdGhlIGNzcyBtb2R1bGUgZGVwZW5kIG9uIHRoZSBvZmZzZXQgbW9kdWxlLCBqdXN0IGNoZWNrIGZvciBpdCBoZXJlXG5qUXVlcnkuZWFjaCggWyBcInRvcFwiLCBcImxlZnRcIiBdLCBmdW5jdGlvbiggaSwgcHJvcCApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBwcm9wIF0gPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucGl4ZWxQb3NpdGlvbixcblx0XHRmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdFx0XHRjb21wdXRlZCA9IGN1ckNTUyggZWxlbSwgcHJvcCApO1xuXG5cdFx0XHRcdC8vIElmIGN1ckNTUyByZXR1cm5zIHBlcmNlbnRhZ2UsIGZhbGxiYWNrIHRvIG9mZnNldFxuXHRcdFx0XHRyZXR1cm4gcm51bW5vbnB4LnRlc3QoIGNvbXB1dGVkICkgP1xuXHRcdFx0XHRcdGpRdWVyeSggZWxlbSApLnBvc2l0aW9uKClbIHByb3AgXSArIFwicHhcIiA6XG5cdFx0XHRcdFx0Y29tcHV0ZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXHQpO1xufSApO1xuXG5cbi8vIENyZWF0ZSBpbm5lckhlaWdodCwgaW5uZXJXaWR0aCwgaGVpZ2h0LCB3aWR0aCwgb3V0ZXJIZWlnaHQgYW5kIG91dGVyV2lkdGggbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgSGVpZ2h0OiBcImhlaWdodFwiLCBXaWR0aDogXCJ3aWR0aFwiIH0sIGZ1bmN0aW9uKCBuYW1lLCB0eXBlICkge1xuXHRqUXVlcnkuZWFjaCggeyBwYWRkaW5nOiBcImlubmVyXCIgKyBuYW1lLCBjb250ZW50OiB0eXBlLCBcIlwiOiBcIm91dGVyXCIgKyBuYW1lIH0sXG5cdFx0ZnVuY3Rpb24oIGRlZmF1bHRFeHRyYSwgZnVuY05hbWUgKSB7XG5cblx0XHQvLyBNYXJnaW4gaXMgb25seSBmb3Igb3V0ZXJIZWlnaHQsIG91dGVyV2lkdGhcblx0XHRqUXVlcnkuZm5bIGZ1bmNOYW1lIF0gPSBmdW5jdGlvbiggbWFyZ2luLCB2YWx1ZSApIHtcblx0XHRcdHZhciBjaGFpbmFibGUgPSBhcmd1bWVudHMubGVuZ3RoICYmICggZGVmYXVsdEV4dHJhIHx8IHR5cGVvZiBtYXJnaW4gIT09IFwiYm9vbGVhblwiICksXG5cdFx0XHRcdGV4dHJhID0gZGVmYXVsdEV4dHJhIHx8ICggbWFyZ2luID09PSB0cnVlIHx8IHZhbHVlID09PSB0cnVlID8gXCJtYXJnaW5cIiA6IFwiYm9yZGVyXCIgKTtcblxuXHRcdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIHR5cGUsIHZhbHVlICkge1xuXHRcdFx0XHR2YXIgZG9jO1xuXG5cdFx0XHRcdGlmICggalF1ZXJ5LmlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdFx0XHQvLyAkKCB3aW5kb3cgKS5vdXRlcldpZHRoL0hlaWdodCByZXR1cm4gdy9oIGluY2x1ZGluZyBzY3JvbGxiYXJzIChnaC0xNzI5KVxuXHRcdFx0XHRcdHJldHVybiBmdW5jTmFtZS5pbmRleE9mKCBcIm91dGVyXCIgKSA9PT0gMCA/XG5cdFx0XHRcdFx0XHRlbGVtWyBcImlubmVyXCIgKyBuYW1lIF0gOlxuXHRcdFx0XHRcdFx0ZWxlbS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbIFwiY2xpZW50XCIgKyBuYW1lIF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBHZXQgZG9jdW1lbnQgd2lkdGggb3IgaGVpZ2h0XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRkb2MgPSBlbGVtLmRvY3VtZW50RWxlbWVudDtcblxuXHRcdFx0XHRcdC8vIEVpdGhlciBzY3JvbGxbV2lkdGgvSGVpZ2h0XSBvciBvZmZzZXRbV2lkdGgvSGVpZ2h0XSBvciBjbGllbnRbV2lkdGgvSGVpZ2h0XSxcblx0XHRcdFx0XHQvLyB3aGljaGV2ZXIgaXMgZ3JlYXRlc3Rcblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgoXG5cdFx0XHRcdFx0XHRlbGVtLmJvZHlbIFwic2Nyb2xsXCIgKyBuYW1lIF0sIGRvY1sgXCJzY3JvbGxcIiArIG5hbWUgXSxcblx0XHRcdFx0XHRcdGVsZW0uYm9keVsgXCJvZmZzZXRcIiArIG5hbWUgXSwgZG9jWyBcIm9mZnNldFwiICsgbmFtZSBdLFxuXHRcdFx0XHRcdFx0ZG9jWyBcImNsaWVudFwiICsgbmFtZSBdXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cblxuXHRcdFx0XHRcdC8vIEdldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnQsIHJlcXVlc3RpbmcgYnV0IG5vdCBmb3JjaW5nIHBhcnNlRmxvYXRcblx0XHRcdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCB0eXBlLCBleHRyYSApIDpcblxuXHRcdFx0XHRcdC8vIFNldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnRcblx0XHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIHR5cGUsIHZhbHVlLCBleHRyYSApO1xuXHRcdFx0fSwgdHlwZSwgY2hhaW5hYmxlID8gbWFyZ2luIDogdW5kZWZpbmVkLCBjaGFpbmFibGUgKTtcblx0XHR9O1xuXHR9ICk7XG59ICk7XG5cblxuLy8gUmVnaXN0ZXIgYXMgYSBuYW1lZCBBTUQgbW9kdWxlLCBzaW5jZSBqUXVlcnkgY2FuIGJlIGNvbmNhdGVuYXRlZCB3aXRoIG90aGVyXG4vLyBmaWxlcyB0aGF0IG1heSB1c2UgZGVmaW5lLCBidXQgbm90IHZpYSBhIHByb3BlciBjb25jYXRlbmF0aW9uIHNjcmlwdCB0aGF0XG4vLyB1bmRlcnN0YW5kcyBhbm9ueW1vdXMgQU1EIG1vZHVsZXMuIEEgbmFtZWQgQU1EIGlzIHNhZmVzdCBhbmQgbW9zdCByb2J1c3Rcbi8vIHdheSB0byByZWdpc3Rlci4gTG93ZXJjYXNlIGpxdWVyeSBpcyB1c2VkIGJlY2F1c2UgQU1EIG1vZHVsZSBuYW1lcyBhcmVcbi8vIGRlcml2ZWQgZnJvbSBmaWxlIG5hbWVzLCBhbmQgalF1ZXJ5IGlzIG5vcm1hbGx5IGRlbGl2ZXJlZCBpbiBhIGxvd2VyY2FzZVxuLy8gZmlsZSBuYW1lLiBEbyB0aGlzIGFmdGVyIGNyZWF0aW5nIHRoZSBnbG9iYWwgc28gdGhhdCBpZiBhbiBBTUQgbW9kdWxlIHdhbnRzXG4vLyB0byBjYWxsIG5vQ29uZmxpY3QgdG8gaGlkZSB0aGlzIHZlcnNpb24gb2YgalF1ZXJ5LCBpdCB3aWxsIHdvcmsuXG5cbi8vIE5vdGUgdGhhdCBmb3IgbWF4aW11bSBwb3J0YWJpbGl0eSwgbGlicmFyaWVzIHRoYXQgYXJlIG5vdCBqUXVlcnkgc2hvdWxkXG4vLyBkZWNsYXJlIHRoZW1zZWx2ZXMgYXMgYW5vbnltb3VzIG1vZHVsZXMsIGFuZCBhdm9pZCBzZXR0aW5nIGEgZ2xvYmFsIGlmIGFuXG4vLyBBTUQgbG9hZGVyIGlzIHByZXNlbnQuIGpRdWVyeSBpcyBhIHNwZWNpYWwgY2FzZS4gRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2pyYnVya2UvcmVxdWlyZWpzL3dpa2kvVXBkYXRpbmctZXhpc3RpbmctbGlicmFyaWVzI3dpa2ktYW5vblxuXG5pZiAoIHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kICkge1xuXHRkZWZpbmUoIFwianF1ZXJ5XCIsIFtdLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4galF1ZXJ5O1xuXHR9ICk7XG59XG5cblxuXG5cbnZhclxuXG5cdC8vIE1hcCBvdmVyIGpRdWVyeSBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxuXHRfalF1ZXJ5ID0gd2luZG93LmpRdWVyeSxcblxuXHQvLyBNYXAgb3ZlciB0aGUgJCBpbiBjYXNlIG9mIG92ZXJ3cml0ZVxuXHRfJCA9IHdpbmRvdy4kO1xuXG5qUXVlcnkubm9Db25mbGljdCA9IGZ1bmN0aW9uKCBkZWVwICkge1xuXHRpZiAoIHdpbmRvdy4kID09PSBqUXVlcnkgKSB7XG5cdFx0d2luZG93LiQgPSBfJDtcblx0fVxuXG5cdGlmICggZGVlcCAmJiB3aW5kb3cualF1ZXJ5ID09PSBqUXVlcnkgKSB7XG5cdFx0d2luZG93LmpRdWVyeSA9IF9qUXVlcnk7XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5O1xufTtcblxuLy8gRXhwb3NlIGpRdWVyeSBhbmQgJCBpZGVudGlmaWVycywgZXZlbiBpbiBBTURcbi8vICgjNzEwMiNjb21tZW50OjEwLCBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9wdWxsLzU1Nylcbi8vIGFuZCBDb21tb25KUyBmb3IgYnJvd3NlciBlbXVsYXRvcnMgKCMxMzU2NilcbmlmICggIW5vR2xvYmFsICkge1xuXHR3aW5kb3cualF1ZXJ5ID0gd2luZG93LiQgPSBqUXVlcnk7XG59XG5cblxuXG5cblxucmV0dXJuIGpRdWVyeTtcbn0gKTtcbiJdfQ==