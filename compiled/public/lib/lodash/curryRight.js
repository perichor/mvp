'use strict';

var createWrap = require('./_createWrap');

/** Used to compose bitmasks for function metadata. */
var WRAP_CURRY_RIGHT_FLAG = 16;

/**
 * This method is like `_.curry` except that arguments are applied to `func`
 * in the manner of `_.partialRight` instead of `_.partial`.
 *
 * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
 * builds, may be used as a placeholder for provided arguments.
 *
 * **Note:** This method doesn't set the "length" property of curried functions.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * var abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 *
 * var curried = _.curryRight(abc);
 *
 * curried(3)(2)(1);
 * // => [1, 2, 3]
 *
 * curried(2, 3)(1);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(3)(1, _)(2);
 * // => [1, 2, 3]
 */
function curryRight(func, arity, guard) {
  arity = guard ? undefined : arity;
  var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
  result.placeholder = curryRight.placeholder;
  return result;
}

// Assign default placeholders.
curryRight.placeholder = {};

module.exports = curryRight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2N1cnJ5UmlnaHQuanMiXSwibmFtZXMiOlsiY3JlYXRlV3JhcCIsInJlcXVpcmUiLCJXUkFQX0NVUlJZX1JJR0hUX0ZMQUciLCJjdXJyeVJpZ2h0IiwiZnVuYyIsImFyaXR5IiwiZ3VhcmQiLCJ1bmRlZmluZWQiLCJyZXN1bHQiLCJwbGFjZWhvbGRlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsYUFBYUMsUUFBUSxlQUFSLENBQWpCOztBQUVBO0FBQ0EsSUFBSUMsd0JBQXdCLEVBQTVCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNDQSxTQUFTQyxVQUFULENBQW9CQyxJQUFwQixFQUEwQkMsS0FBMUIsRUFBaUNDLEtBQWpDLEVBQXdDO0FBQ3RDRCxVQUFRQyxRQUFRQyxTQUFSLEdBQW9CRixLQUE1QjtBQUNBLE1BQUlHLFNBQVNSLFdBQVdJLElBQVgsRUFBaUJGLHFCQUFqQixFQUF3Q0ssU0FBeEMsRUFBbURBLFNBQW5ELEVBQThEQSxTQUE5RCxFQUF5RUEsU0FBekUsRUFBb0ZBLFNBQXBGLEVBQStGRixLQUEvRixDQUFiO0FBQ0FHLFNBQU9DLFdBQVAsR0FBcUJOLFdBQVdNLFdBQWhDO0FBQ0EsU0FBT0QsTUFBUDtBQUNEOztBQUVEO0FBQ0FMLFdBQVdNLFdBQVgsR0FBeUIsRUFBekI7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUJSLFVBQWpCIiwiZmlsZSI6ImN1cnJ5UmlnaHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY3JlYXRlV3JhcCA9IHJlcXVpcmUoJy4vX2NyZWF0ZVdyYXAnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgZnVuY3Rpb24gbWV0YWRhdGEuICovXG52YXIgV1JBUF9DVVJSWV9SSUdIVF9GTEFHID0gMTY7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5jdXJyeWAgZXhjZXB0IHRoYXQgYXJndW1lbnRzIGFyZSBhcHBsaWVkIHRvIGBmdW5jYFxuICogaW4gdGhlIG1hbm5lciBvZiBgXy5wYXJ0aWFsUmlnaHRgIGluc3RlYWQgb2YgYF8ucGFydGlhbGAuXG4gKlxuICogVGhlIGBfLmN1cnJ5UmlnaHQucGxhY2Vob2xkZXJgIHZhbHVlLCB3aGljaCBkZWZhdWx0cyB0byBgX2AgaW4gbW9ub2xpdGhpY1xuICogYnVpbGRzLCBtYXkgYmUgdXNlZCBhcyBhIHBsYWNlaG9sZGVyIGZvciBwcm92aWRlZCBhcmd1bWVudHMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGRvZXNuJ3Qgc2V0IHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IG9mIGN1cnJpZWQgZnVuY3Rpb25zLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyaXR5PWZ1bmMubGVuZ3RoXSBUaGUgYXJpdHkgb2YgYGZ1bmNgLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhYmMgPSBmdW5jdGlvbihhLCBiLCBjKSB7XG4gKiAgIHJldHVybiBbYSwgYiwgY107XG4gKiB9O1xuICpcbiAqIHZhciBjdXJyaWVkID0gXy5jdXJyeVJpZ2h0KGFiYyk7XG4gKlxuICogY3VycmllZCgzKSgyKSgxKTtcbiAqIC8vID0+IFsxLCAyLCAzXVxuICpcbiAqIGN1cnJpZWQoMiwgMykoMSk7XG4gKiAvLyA9PiBbMSwgMiwgM11cbiAqXG4gKiBjdXJyaWVkKDEsIDIsIDMpO1xuICogLy8gPT4gWzEsIDIsIDNdXG4gKlxuICogLy8gQ3VycmllZCB3aXRoIHBsYWNlaG9sZGVycy5cbiAqIGN1cnJpZWQoMykoMSwgXykoMik7XG4gKiAvLyA9PiBbMSwgMiwgM11cbiAqL1xuZnVuY3Rpb24gY3VycnlSaWdodChmdW5jLCBhcml0eSwgZ3VhcmQpIHtcbiAgYXJpdHkgPSBndWFyZCA/IHVuZGVmaW5lZCA6IGFyaXR5O1xuICB2YXIgcmVzdWx0ID0gY3JlYXRlV3JhcChmdW5jLCBXUkFQX0NVUlJZX1JJR0hUX0ZMQUcsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBhcml0eSk7XG4gIHJlc3VsdC5wbGFjZWhvbGRlciA9IGN1cnJ5UmlnaHQucGxhY2Vob2xkZXI7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEFzc2lnbiBkZWZhdWx0IHBsYWNlaG9sZGVycy5cbmN1cnJ5UmlnaHQucGxhY2Vob2xkZXIgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBjdXJyeVJpZ2h0O1xuIl19