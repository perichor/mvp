'use strict';

var createWrap = require('./_createWrap');

/** Used to compose bitmasks for function metadata. */
var WRAP_ARY_FLAG = 128;

/**
 * Creates a function that invokes `func`, with up to `n` arguments,
 * ignoring any additional arguments.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} func The function to cap arguments for.
 * @param {number} [n=func.length] The arity cap.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new capped function.
 * @example
 *
 * _.map(['6', '8', '10'], _.ary(parseInt, 1));
 * // => [6, 8, 10]
 */
function ary(func, n, guard) {
  n = guard ? undefined : n;
  n = func && n == null ? func.length : n;
  return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
}

module.exports = ary;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2FyeS5qcyJdLCJuYW1lcyI6WyJjcmVhdGVXcmFwIiwicmVxdWlyZSIsIldSQVBfQVJZX0ZMQUciLCJhcnkiLCJmdW5jIiwibiIsImd1YXJkIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxhQUFhQyxRQUFRLGVBQVIsQ0FBakI7O0FBRUE7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBcEI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLFNBQVNDLEdBQVQsQ0FBYUMsSUFBYixFQUFtQkMsQ0FBbkIsRUFBc0JDLEtBQXRCLEVBQTZCO0FBQzNCRCxNQUFJQyxRQUFRQyxTQUFSLEdBQW9CRixDQUF4QjtBQUNBQSxNQUFLRCxRQUFRQyxLQUFLLElBQWQsR0FBc0JELEtBQUtJLE1BQTNCLEdBQW9DSCxDQUF4QztBQUNBLFNBQU9MLFdBQVdJLElBQVgsRUFBaUJGLGFBQWpCLEVBQWdDSyxTQUFoQyxFQUEyQ0EsU0FBM0MsRUFBc0RBLFNBQXRELEVBQWlFQSxTQUFqRSxFQUE0RUYsQ0FBNUUsQ0FBUDtBQUNEOztBQUVESSxPQUFPQyxPQUFQLEdBQWlCUCxHQUFqQiIsImZpbGUiOiJhcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY3JlYXRlV3JhcCA9IHJlcXVpcmUoJy4vX2NyZWF0ZVdyYXAnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgZnVuY3Rpb24gbWV0YWRhdGEuICovXG52YXIgV1JBUF9BUllfRkxBRyA9IDEyODtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCwgd2l0aCB1cCB0byBgbmAgYXJndW1lbnRzLFxuICogaWdub3JpbmcgYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gW249ZnVuYy5sZW5ndGhdIFRoZSBhcml0eSBjYXAuXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLm1hcChbJzYnLCAnOCcsICcxMCddLCBfLmFyeShwYXJzZUludCwgMSkpO1xuICogLy8gPT4gWzYsIDgsIDEwXVxuICovXG5mdW5jdGlvbiBhcnkoZnVuYywgbiwgZ3VhcmQpIHtcbiAgbiA9IGd1YXJkID8gdW5kZWZpbmVkIDogbjtcbiAgbiA9IChmdW5jICYmIG4gPT0gbnVsbCkgPyBmdW5jLmxlbmd0aCA6IG47XG4gIHJldHVybiBjcmVhdGVXcmFwKGZ1bmMsIFdSQVBfQVJZX0ZMQUcsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJ5O1xuIl19