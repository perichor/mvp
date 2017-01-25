"use strict";

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeReverse = arrayProto.reverse;

/**
 * Reverses `array` so that the first element becomes the last, the second
 * element becomes the second to last, and so on.
 *
 * **Note:** This method mutates `array` and is based on
 * [`Array#reverse`](https://mdn.io/Array/reverse).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [1, 2, 3];
 *
 * _.reverse(array);
 * // => [3, 2, 1]
 *
 * console.log(array);
 * // => [3, 2, 1]
 */
function reverse(array) {
  return array == null ? array : nativeReverse.call(array);
}

module.exports = reverse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3JldmVyc2UuanMiXSwibmFtZXMiOlsiYXJyYXlQcm90byIsIkFycmF5IiwicHJvdG90eXBlIiwibmF0aXZlUmV2ZXJzZSIsInJldmVyc2UiLCJhcnJheSIsImNhbGwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBSUEsYUFBYUMsTUFBTUMsU0FBdkI7O0FBRUE7QUFDQSxJQUFJQyxnQkFBZ0JILFdBQVdJLE9BQS9COztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxTQUFTQSxPQUFULENBQWlCQyxLQUFqQixFQUF3QjtBQUN0QixTQUFPQSxTQUFTLElBQVQsR0FBZ0JBLEtBQWhCLEdBQXdCRixjQUFjRyxJQUFkLENBQW1CRCxLQUFuQixDQUEvQjtBQUNEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCSixPQUFqQiIsImZpbGUiOiJyZXZlcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVSZXZlcnNlID0gYXJyYXlQcm90by5yZXZlcnNlO1xuXG4vKipcbiAqIFJldmVyc2VzIGBhcnJheWAgc28gdGhhdCB0aGUgZmlyc3QgZWxlbWVudCBiZWNvbWVzIHRoZSBsYXN0LCB0aGUgc2Vjb25kXG4gKiBlbGVtZW50IGJlY29tZXMgdGhlIHNlY29uZCB0byBsYXN0LCBhbmQgc28gb24uXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYGFycmF5YCBhbmQgaXMgYmFzZWQgb25cbiAqIFtgQXJyYXkjcmV2ZXJzZWBdKGh0dHBzOi8vbWRuLmlvL0FycmF5L3JldmVyc2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXkgPSBbMSwgMiwgM107XG4gKlxuICogXy5yZXZlcnNlKGFycmF5KTtcbiAqIC8vID0+IFszLCAyLCAxXVxuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5KTtcbiAqIC8vID0+IFszLCAyLCAxXVxuICovXG5mdW5jdGlvbiByZXZlcnNlKGFycmF5KSB7XG4gIHJldHVybiBhcnJheSA9PSBudWxsID8gYXJyYXkgOiBuYXRpdmVSZXZlcnNlLmNhbGwoYXJyYXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJldmVyc2U7XG4iXX0=