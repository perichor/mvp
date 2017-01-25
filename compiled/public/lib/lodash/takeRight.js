'use strict';

var baseSlice = require('./_baseSlice'),
    toInteger = require('./toInteger');

/**
 * Creates a slice of `array` with `n` elements taken from the end.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to take.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.takeRight([1, 2, 3]);
 * // => [3]
 *
 * _.takeRight([1, 2, 3], 2);
 * // => [2, 3]
 *
 * _.takeRight([1, 2, 3], 5);
 * // => [1, 2, 3]
 *
 * _.takeRight([1, 2, 3], 0);
 * // => []
 */
function takeRight(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = guard || n === undefined ? 1 : toInteger(n);
  n = length - n;
  return baseSlice(array, n < 0 ? 0 : n, length);
}

module.exports = takeRight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3Rha2VSaWdodC5qcyJdLCJuYW1lcyI6WyJiYXNlU2xpY2UiLCJyZXF1aXJlIiwidG9JbnRlZ2VyIiwidGFrZVJpZ2h0IiwiYXJyYXkiLCJuIiwiZ3VhcmQiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVlDLFFBQVEsY0FBUixDQUFoQjtBQUFBLElBQ0lDLFlBQVlELFFBQVEsYUFBUixDQURoQjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxTQUFTRSxTQUFULENBQW1CQyxLQUFuQixFQUEwQkMsQ0FBMUIsRUFBNkJDLEtBQTdCLEVBQW9DO0FBQ2xDLE1BQUlDLFNBQVNILFNBQVMsSUFBVCxHQUFnQixDQUFoQixHQUFvQkEsTUFBTUcsTUFBdkM7QUFDQSxNQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYLFdBQU8sRUFBUDtBQUNEO0FBQ0RGLE1BQUtDLFNBQVNELE1BQU1HLFNBQWhCLEdBQTZCLENBQTdCLEdBQWlDTixVQUFVRyxDQUFWLENBQXJDO0FBQ0FBLE1BQUlFLFNBQVNGLENBQWI7QUFDQSxTQUFPTCxVQUFVSSxLQUFWLEVBQWlCQyxJQUFJLENBQUosR0FBUSxDQUFSLEdBQVlBLENBQTdCLEVBQWdDRSxNQUFoQyxDQUFQO0FBQ0Q7O0FBRURFLE9BQU9DLE9BQVAsR0FBaUJQLFNBQWpCIiwiZmlsZSI6InRha2VSaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlU2xpY2UgPSByZXF1aXJlKCcuL19iYXNlU2xpY2UnKSxcbiAgICB0b0ludGVnZXIgPSByZXF1aXJlKCcuL3RvSW50ZWdlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzbGljZSBvZiBgYXJyYXlgIHdpdGggYG5gIGVsZW1lbnRzIHRha2VuIGZyb20gdGhlIGVuZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbj0xXSBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIHRvIHRha2UuXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBzbGljZSBvZiBgYXJyYXlgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRha2VSaWdodChbMSwgMiwgM10pO1xuICogLy8gPT4gWzNdXG4gKlxuICogXy50YWtlUmlnaHQoWzEsIDIsIDNdLCAyKTtcbiAqIC8vID0+IFsyLCAzXVxuICpcbiAqIF8udGFrZVJpZ2h0KFsxLCAyLCAzXSwgNSk7XG4gKiAvLyA9PiBbMSwgMiwgM11cbiAqXG4gKiBfLnRha2VSaWdodChbMSwgMiwgM10sIDApO1xuICogLy8gPT4gW11cbiAqL1xuZnVuY3Rpb24gdGFrZVJpZ2h0KGFycmF5LCBuLCBndWFyZCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIG4gPSAoZ3VhcmQgfHwgbiA9PT0gdW5kZWZpbmVkKSA/IDEgOiB0b0ludGVnZXIobik7XG4gIG4gPSBsZW5ndGggLSBuO1xuICByZXR1cm4gYmFzZVNsaWNlKGFycmF5LCBuIDwgMCA/IDAgOiBuLCBsZW5ndGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRha2VSaWdodDtcbiJdfQ==