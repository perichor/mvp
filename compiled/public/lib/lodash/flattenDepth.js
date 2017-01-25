'use strict';

var baseFlatten = require('./_baseFlatten'),
    toInteger = require('./toInteger');

/**
 * Recursively flatten `array` up to `depth` times.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @param {number} [depth=1] The maximum recursion depth.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * var array = [1, [2, [3, [4]], 5]];
 *
 * _.flattenDepth(array, 1);
 * // => [1, 2, [3, [4]], 5]
 *
 * _.flattenDepth(array, 2);
 * // => [1, 2, 3, [4], 5]
 */
function flattenDepth(array, depth) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  depth = depth === undefined ? 1 : toInteger(depth);
  return baseFlatten(array, depth);
}

module.exports = flattenDepth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZsYXR0ZW5EZXB0aC5qcyJdLCJuYW1lcyI6WyJiYXNlRmxhdHRlbiIsInJlcXVpcmUiLCJ0b0ludGVnZXIiLCJmbGF0dGVuRGVwdGgiLCJhcnJheSIsImRlcHRoIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxjQUFjQyxRQUFRLGdCQUFSLENBQWxCO0FBQUEsSUFDSUMsWUFBWUQsUUFBUSxhQUFSLENBRGhCOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxTQUFTRSxZQUFULENBQXNCQyxLQUF0QixFQUE2QkMsS0FBN0IsRUFBb0M7QUFDbEMsTUFBSUMsU0FBU0YsU0FBUyxJQUFULEdBQWdCLENBQWhCLEdBQW9CQSxNQUFNRSxNQUF2QztBQUNBLE1BQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1gsV0FBTyxFQUFQO0FBQ0Q7QUFDREQsVUFBUUEsVUFBVUUsU0FBVixHQUFzQixDQUF0QixHQUEwQkwsVUFBVUcsS0FBVixDQUFsQztBQUNBLFNBQU9MLFlBQVlJLEtBQVosRUFBbUJDLEtBQW5CLENBQVA7QUFDRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQk4sWUFBakIiLCJmaWxlIjoiZmxhdHRlbkRlcHRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VGbGF0dGVuID0gcmVxdWlyZSgnLi9fYmFzZUZsYXR0ZW4nKSxcbiAgICB0b0ludGVnZXIgPSByZXF1aXJlKCcuL3RvSW50ZWdlcicpO1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IGZsYXR0ZW4gYGFycmF5YCB1cCB0byBgZGVwdGhgIHRpbWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC40LjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZsYXR0ZW4uXG4gKiBAcGFyYW0ge251bWJlcn0gW2RlcHRoPTFdIFRoZSBtYXhpbXVtIHJlY3Vyc2lvbiBkZXB0aC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGFycmF5ID0gWzEsIFsyLCBbMywgWzRdXSwgNV1dO1xuICpcbiAqIF8uZmxhdHRlbkRlcHRoKGFycmF5LCAxKTtcbiAqIC8vID0+IFsxLCAyLCBbMywgWzRdXSwgNV1cbiAqXG4gKiBfLmZsYXR0ZW5EZXB0aChhcnJheSwgMik7XG4gKiAvLyA9PiBbMSwgMiwgMywgWzRdLCA1XVxuICovXG5mdW5jdGlvbiBmbGF0dGVuRGVwdGgoYXJyYXksIGRlcHRoKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgZGVwdGggPSBkZXB0aCA9PT0gdW5kZWZpbmVkID8gMSA6IHRvSW50ZWdlcihkZXB0aCk7XG4gIHJldHVybiBiYXNlRmxhdHRlbihhcnJheSwgZGVwdGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW5EZXB0aDtcbiJdfQ==