'use strict';

var baseFlatten = require('./_baseFlatten');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Recursively flattens `array`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flattenDeep([1, [2, [3, [4]], 5]]);
 * // => [1, 2, 3, 4, 5]
 */
function flattenDeep(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, INFINITY) : [];
}

module.exports = flattenDeep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZsYXR0ZW5EZWVwLmpzIl0sIm5hbWVzIjpbImJhc2VGbGF0dGVuIiwicmVxdWlyZSIsIklORklOSVRZIiwiZmxhdHRlbkRlZXAiLCJhcnJheSIsImxlbmd0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsY0FBY0MsUUFBUSxnQkFBUixDQUFsQjs7QUFFQTtBQUNBLElBQUlDLFdBQVcsSUFBSSxDQUFuQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxTQUFTQyxXQUFULENBQXFCQyxLQUFyQixFQUE0QjtBQUMxQixNQUFJQyxTQUFTRCxTQUFTLElBQVQsR0FBZ0IsQ0FBaEIsR0FBb0JBLE1BQU1DLE1BQXZDO0FBQ0EsU0FBT0EsU0FBU0wsWUFBWUksS0FBWixFQUFtQkYsUUFBbkIsQ0FBVCxHQUF3QyxFQUEvQztBQUNEOztBQUVESSxPQUFPQyxPQUFQLEdBQWlCSixXQUFqQiIsImZpbGUiOiJmbGF0dGVuRGVlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlRmxhdHRlbiA9IHJlcXVpcmUoJy4vX2Jhc2VGbGF0dGVuJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgZmxhdHRlbnMgYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmZsYXR0ZW5EZWVwKFsxLCBbMiwgWzMsIFs0XV0sIDVdXSk7XG4gKiAvLyA9PiBbMSwgMiwgMywgNCwgNV1cbiAqL1xuZnVuY3Rpb24gZmxhdHRlbkRlZXAoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuICByZXR1cm4gbGVuZ3RoID8gYmFzZUZsYXR0ZW4oYXJyYXksIElORklOSVRZKSA6IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW5EZWVwO1xuIl19