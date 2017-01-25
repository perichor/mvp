'use strict';

var createWrap = require('./_createWrap');

/** Used to compose bitmasks for function metadata. */
var WRAP_CURRY_FLAG = 8;

/**
 * Creates a function that accepts arguments of `func` and either invokes
 * `func` returning its result, if at least `arity` number of arguments have
 * been provided, or returns a function that accepts the remaining `func`
 * arguments, and so on. The arity of `func` may be specified if `func.length`
 * is not sufficient.
 *
 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for provided arguments.
 *
 * **Note:** This method doesn't set the "length" property of curried functions.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
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
 * var curried = _.curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(1)(_, 3)(2);
 * // => [1, 2, 3]
 */
function curry(func, arity, guard) {
  arity = guard ? undefined : arity;
  var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
  result.placeholder = curry.placeholder;
  return result;
}

// Assign default placeholders.
curry.placeholder = {};

module.exports = curry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2N1cnJ5LmpzIl0sIm5hbWVzIjpbImNyZWF0ZVdyYXAiLCJyZXF1aXJlIiwiV1JBUF9DVVJSWV9GTEFHIiwiY3VycnkiLCJmdW5jIiwiYXJpdHkiLCJndWFyZCIsInVuZGVmaW5lZCIsInJlc3VsdCIsInBsYWNlaG9sZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxhQUFhQyxRQUFRLGVBQVIsQ0FBakI7O0FBRUE7QUFDQSxJQUFJQyxrQkFBa0IsQ0FBdEI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUNBLFNBQVNDLEtBQVQsQ0FBZUMsSUFBZixFQUFxQkMsS0FBckIsRUFBNEJDLEtBQTVCLEVBQW1DO0FBQ2pDRCxVQUFRQyxRQUFRQyxTQUFSLEdBQW9CRixLQUE1QjtBQUNBLE1BQUlHLFNBQVNSLFdBQVdJLElBQVgsRUFBaUJGLGVBQWpCLEVBQWtDSyxTQUFsQyxFQUE2Q0EsU0FBN0MsRUFBd0RBLFNBQXhELEVBQW1FQSxTQUFuRSxFQUE4RUEsU0FBOUUsRUFBeUZGLEtBQXpGLENBQWI7QUFDQUcsU0FBT0MsV0FBUCxHQUFxQk4sTUFBTU0sV0FBM0I7QUFDQSxTQUFPRCxNQUFQO0FBQ0Q7O0FBRUQ7QUFDQUwsTUFBTU0sV0FBTixHQUFvQixFQUFwQjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQlIsS0FBakIiLCJmaWxlIjoiY3VycnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY3JlYXRlV3JhcCA9IHJlcXVpcmUoJy4vX2NyZWF0ZVdyYXAnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgZnVuY3Rpb24gbWV0YWRhdGEuICovXG52YXIgV1JBUF9DVVJSWV9GTEFHID0gODtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGFyZ3VtZW50cyBvZiBgZnVuY2AgYW5kIGVpdGhlciBpbnZva2VzXG4gKiBgZnVuY2AgcmV0dXJuaW5nIGl0cyByZXN1bHQsIGlmIGF0IGxlYXN0IGBhcml0eWAgbnVtYmVyIG9mIGFyZ3VtZW50cyBoYXZlXG4gKiBiZWVuIHByb3ZpZGVkLCBvciByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIHRoZSByZW1haW5pbmcgYGZ1bmNgXG4gKiBhcmd1bWVudHMsIGFuZCBzbyBvbi4gVGhlIGFyaXR5IG9mIGBmdW5jYCBtYXkgYmUgc3BlY2lmaWVkIGlmIGBmdW5jLmxlbmd0aGBcbiAqIGlzIG5vdCBzdWZmaWNpZW50LlxuICpcbiAqIFRoZSBgXy5jdXJyeS5wbGFjZWhvbGRlcmAgdmFsdWUsIHdoaWNoIGRlZmF1bHRzIHRvIGBfYCBpbiBtb25vbGl0aGljIGJ1aWxkcyxcbiAqIG1heSBiZSB1c2VkIGFzIGEgcGxhY2Vob2xkZXIgZm9yIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgZG9lc24ndCBzZXQgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgb2YgY3VycmllZCBmdW5jdGlvbnMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjAuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJpdHk9ZnVuYy5sZW5ndGhdIFRoZSBhcml0eSBvZiBgZnVuY2AuXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGFiYyA9IGZ1bmN0aW9uKGEsIGIsIGMpIHtcbiAqICAgcmV0dXJuIFthLCBiLCBjXTtcbiAqIH07XG4gKlxuICogdmFyIGN1cnJpZWQgPSBfLmN1cnJ5KGFiYyk7XG4gKlxuICogY3VycmllZCgxKSgyKSgzKTtcbiAqIC8vID0+IFsxLCAyLCAzXVxuICpcbiAqIGN1cnJpZWQoMSwgMikoMyk7XG4gKiAvLyA9PiBbMSwgMiwgM11cbiAqXG4gKiBjdXJyaWVkKDEsIDIsIDMpO1xuICogLy8gPT4gWzEsIDIsIDNdXG4gKlxuICogLy8gQ3VycmllZCB3aXRoIHBsYWNlaG9sZGVycy5cbiAqIGN1cnJpZWQoMSkoXywgMykoMik7XG4gKiAvLyA9PiBbMSwgMiwgM11cbiAqL1xuZnVuY3Rpb24gY3VycnkoZnVuYywgYXJpdHksIGd1YXJkKSB7XG4gIGFyaXR5ID0gZ3VhcmQgPyB1bmRlZmluZWQgOiBhcml0eTtcbiAgdmFyIHJlc3VsdCA9IGNyZWF0ZVdyYXAoZnVuYywgV1JBUF9DVVJSWV9GTEFHLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgYXJpdHkpO1xuICByZXN1bHQucGxhY2Vob2xkZXIgPSBjdXJyeS5wbGFjZWhvbGRlcjtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gQXNzaWduIGRlZmF1bHQgcGxhY2Vob2xkZXJzLlxuY3VycnkucGxhY2Vob2xkZXIgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBjdXJyeTtcbiJdfQ==