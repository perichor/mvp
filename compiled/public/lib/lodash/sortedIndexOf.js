'use strict';

var baseSortedIndex = require('./_baseSortedIndex'),
    eq = require('./eq');

/**
 * This method is like `_.indexOf` except that it performs a binary
 * search on a sorted `array`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
 * // => 1
 */
function sortedIndexOf(array, value) {
  var length = array == null ? 0 : array.length;
  if (length) {
    var index = baseSortedIndex(array, value);
    if (index < length && eq(array[index], value)) {
      return index;
    }
  }
  return -1;
}

module.exports = sortedIndexOf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NvcnRlZEluZGV4T2YuanMiXSwibmFtZXMiOlsiYmFzZVNvcnRlZEluZGV4IiwicmVxdWlyZSIsImVxIiwic29ydGVkSW5kZXhPZiIsImFycmF5IiwidmFsdWUiLCJsZW5ndGgiLCJpbmRleCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsa0JBQWtCQyxRQUFRLG9CQUFSLENBQXRCO0FBQUEsSUFDSUMsS0FBS0QsUUFBUSxNQUFSLENBRFQ7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsU0FBU0UsYUFBVCxDQUF1QkMsS0FBdkIsRUFBOEJDLEtBQTlCLEVBQXFDO0FBQ25DLE1BQUlDLFNBQVNGLFNBQVMsSUFBVCxHQUFnQixDQUFoQixHQUFvQkEsTUFBTUUsTUFBdkM7QUFDQSxNQUFJQSxNQUFKLEVBQVk7QUFDVixRQUFJQyxRQUFRUCxnQkFBZ0JJLEtBQWhCLEVBQXVCQyxLQUF2QixDQUFaO0FBQ0EsUUFBSUUsUUFBUUQsTUFBUixJQUFrQkosR0FBR0UsTUFBTUcsS0FBTixDQUFILEVBQWlCRixLQUFqQixDQUF0QixFQUErQztBQUM3QyxhQUFPRSxLQUFQO0FBQ0Q7QUFDRjtBQUNELFNBQU8sQ0FBQyxDQUFSO0FBQ0Q7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUJOLGFBQWpCIiwiZmlsZSI6InNvcnRlZEluZGV4T2YuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZVNvcnRlZEluZGV4ID0gcmVxdWlyZSgnLi9fYmFzZVNvcnRlZEluZGV4JyksXG4gICAgZXEgPSByZXF1aXJlKCcuL2VxJyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pbmRleE9mYCBleGNlcHQgdGhhdCBpdCBwZXJmb3JtcyBhIGJpbmFyeVxuICogc2VhcmNoIG9uIGEgc29ydGVkIGBhcnJheWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnNvcnRlZEluZGV4T2YoWzQsIDUsIDUsIDUsIDZdLCA1KTtcbiAqIC8vID0+IDFcbiAqL1xuZnVuY3Rpb24gc29ydGVkSW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuICBpZiAobGVuZ3RoKSB7XG4gICAgdmFyIGluZGV4ID0gYmFzZVNvcnRlZEluZGV4KGFycmF5LCB2YWx1ZSk7XG4gICAgaWYgKGluZGV4IDwgbGVuZ3RoICYmIGVxKGFycmF5W2luZGV4XSwgdmFsdWUpKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0ZWRJbmRleE9mO1xuIl19