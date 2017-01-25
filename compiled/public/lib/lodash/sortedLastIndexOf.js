'use strict';

var baseSortedIndex = require('./_baseSortedIndex'),
    eq = require('./eq');

/**
 * This method is like `_.lastIndexOf` except that it performs a binary
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
 * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
 * // => 3
 */
function sortedLastIndexOf(array, value) {
  var length = array == null ? 0 : array.length;
  if (length) {
    var index = baseSortedIndex(array, value, true) - 1;
    if (eq(array[index], value)) {
      return index;
    }
  }
  return -1;
}

module.exports = sortedLastIndexOf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NvcnRlZExhc3RJbmRleE9mLmpzIl0sIm5hbWVzIjpbImJhc2VTb3J0ZWRJbmRleCIsInJlcXVpcmUiLCJlcSIsInNvcnRlZExhc3RJbmRleE9mIiwiYXJyYXkiLCJ2YWx1ZSIsImxlbmd0aCIsImluZGV4IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxrQkFBa0JDLFFBQVEsb0JBQVIsQ0FBdEI7QUFBQSxJQUNJQyxLQUFLRCxRQUFRLE1BQVIsQ0FEVDs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxTQUFTRSxpQkFBVCxDQUEyQkMsS0FBM0IsRUFBa0NDLEtBQWxDLEVBQXlDO0FBQ3ZDLE1BQUlDLFNBQVNGLFNBQVMsSUFBVCxHQUFnQixDQUFoQixHQUFvQkEsTUFBTUUsTUFBdkM7QUFDQSxNQUFJQSxNQUFKLEVBQVk7QUFDVixRQUFJQyxRQUFRUCxnQkFBZ0JJLEtBQWhCLEVBQXVCQyxLQUF2QixFQUE4QixJQUE5QixJQUFzQyxDQUFsRDtBQUNBLFFBQUlILEdBQUdFLE1BQU1HLEtBQU4sQ0FBSCxFQUFpQkYsS0FBakIsQ0FBSixFQUE2QjtBQUMzQixhQUFPRSxLQUFQO0FBQ0Q7QUFDRjtBQUNELFNBQU8sQ0FBQyxDQUFSO0FBQ0Q7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUJOLGlCQUFqQiIsImZpbGUiOiJzb3J0ZWRMYXN0SW5kZXhPZi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlU29ydGVkSW5kZXggPSByZXF1aXJlKCcuL19iYXNlU29ydGVkSW5kZXgnKSxcbiAgICBlcSA9IHJlcXVpcmUoJy4vZXEnKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmxhc3RJbmRleE9mYCBleGNlcHQgdGhhdCBpdCBwZXJmb3JtcyBhIGJpbmFyeVxuICogc2VhcmNoIG9uIGEgc29ydGVkIGBhcnJheWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnNvcnRlZExhc3RJbmRleE9mKFs0LCA1LCA1LCA1LCA2XSwgNSk7XG4gKiAvLyA9PiAzXG4gKi9cbmZ1bmN0aW9uIHNvcnRlZExhc3RJbmRleE9mKGFycmF5LCB2YWx1ZSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gIGlmIChsZW5ndGgpIHtcbiAgICB2YXIgaW5kZXggPSBiYXNlU29ydGVkSW5kZXgoYXJyYXksIHZhbHVlLCB0cnVlKSAtIDE7XG4gICAgaWYgKGVxKGFycmF5W2luZGV4XSwgdmFsdWUpKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0ZWRMYXN0SW5kZXhPZjtcbiJdfQ==