'use strict';

var createWrap = require('./_createWrap');

/** Used to compose bitmasks for function metadata. */
var WRAP_FLIP_FLAG = 512;

/**
 * Creates a function that invokes `func` with arguments reversed.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Function
 * @param {Function} func The function to flip arguments for.
 * @returns {Function} Returns the new flipped function.
 * @example
 *
 * var flipped = _.flip(function() {
 *   return _.toArray(arguments);
 * });
 *
 * flipped('a', 'b', 'c', 'd');
 * // => ['d', 'c', 'b', 'a']
 */
function flip(func) {
  return createWrap(func, WRAP_FLIP_FLAG);
}

module.exports = flip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZsaXAuanMiXSwibmFtZXMiOlsiY3JlYXRlV3JhcCIsInJlcXVpcmUiLCJXUkFQX0ZMSVBfRkxBRyIsImZsaXAiLCJmdW5jIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxhQUFhQyxRQUFRLGVBQVIsQ0FBakI7O0FBRUE7QUFDQSxJQUFJQyxpQkFBaUIsR0FBckI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxTQUFTQyxJQUFULENBQWNDLElBQWQsRUFBb0I7QUFDbEIsU0FBT0osV0FBV0ksSUFBWCxFQUFpQkYsY0FBakIsQ0FBUDtBQUNEOztBQUVERyxPQUFPQyxPQUFQLEdBQWlCSCxJQUFqQiIsImZpbGUiOiJmbGlwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNyZWF0ZVdyYXAgPSByZXF1aXJlKCcuL19jcmVhdGVXcmFwJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGZ1bmN0aW9uIG1ldGFkYXRhLiAqL1xudmFyIFdSQVBfRkxJUF9GTEFHID0gNTEyO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggYXJndW1lbnRzIHJldmVyc2VkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZmxpcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZmxpcHBlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGZsaXBwZWQgPSBfLmZsaXAoZnVuY3Rpb24oKSB7XG4gKiAgIHJldHVybiBfLnRvQXJyYXkoYXJndW1lbnRzKTtcbiAqIH0pO1xuICpcbiAqIGZsaXBwZWQoJ2EnLCAnYicsICdjJywgJ2QnKTtcbiAqIC8vID0+IFsnZCcsICdjJywgJ2InLCAnYSddXG4gKi9cbmZ1bmN0aW9uIGZsaXAoZnVuYykge1xuICByZXR1cm4gY3JlYXRlV3JhcChmdW5jLCBXUkFQX0ZMSVBfRkxBRyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmxpcDtcbiJdfQ==