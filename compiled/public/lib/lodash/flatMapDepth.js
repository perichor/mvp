'use strict';

var baseFlatten = require('./_baseFlatten'),
    map = require('./map'),
    toInteger = require('./toInteger');

/**
 * This method is like `_.flatMap` except that it recursively flattens the
 * mapped results up to `depth` times.
 *
 * @static
 * @memberOf _
 * @since 4.7.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {number} [depth=1] The maximum recursion depth.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * function duplicate(n) {
 *   return [[[n, n]]];
 * }
 *
 * _.flatMapDepth([1, 2], duplicate, 2);
 * // => [[1, 1], [2, 2]]
 */
function flatMapDepth(collection, iteratee, depth) {
  depth = depth === undefined ? 1 : toInteger(depth);
  return baseFlatten(map(collection, iteratee), depth);
}

module.exports = flatMapDepth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZsYXRNYXBEZXB0aC5qcyJdLCJuYW1lcyI6WyJiYXNlRmxhdHRlbiIsInJlcXVpcmUiLCJtYXAiLCJ0b0ludGVnZXIiLCJmbGF0TWFwRGVwdGgiLCJjb2xsZWN0aW9uIiwiaXRlcmF0ZWUiLCJkZXB0aCIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsY0FBY0MsUUFBUSxnQkFBUixDQUFsQjtBQUFBLElBQ0lDLE1BQU1ELFFBQVEsT0FBUixDQURWO0FBQUEsSUFFSUUsWUFBWUYsUUFBUSxhQUFSLENBRmhCOztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsU0FBU0csWUFBVCxDQUFzQkMsVUFBdEIsRUFBa0NDLFFBQWxDLEVBQTRDQyxLQUE1QyxFQUFtRDtBQUNqREEsVUFBUUEsVUFBVUMsU0FBVixHQUFzQixDQUF0QixHQUEwQkwsVUFBVUksS0FBVixDQUFsQztBQUNBLFNBQU9QLFlBQVlFLElBQUlHLFVBQUosRUFBZ0JDLFFBQWhCLENBQVosRUFBdUNDLEtBQXZDLENBQVA7QUFDRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQk4sWUFBakIiLCJmaWxlIjoiZmxhdE1hcERlcHRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VGbGF0dGVuID0gcmVxdWlyZSgnLi9fYmFzZUZsYXR0ZW4nKSxcbiAgICBtYXAgPSByZXF1aXJlKCcuL21hcCcpLFxuICAgIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vdG9JbnRlZ2VyJyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5mbGF0TWFwYCBleGNlcHQgdGhhdCBpdCByZWN1cnNpdmVseSBmbGF0dGVucyB0aGVcbiAqIG1hcHBlZCByZXN1bHRzIHVwIHRvIGBkZXB0aGAgdGltZXMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjcuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtkZXB0aD0xXSBUaGUgbWF4aW11bSByZWN1cnNpb24gZGVwdGguXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIGR1cGxpY2F0ZShuKSB7XG4gKiAgIHJldHVybiBbW1tuLCBuXV1dO1xuICogfVxuICpcbiAqIF8uZmxhdE1hcERlcHRoKFsxLCAyXSwgZHVwbGljYXRlLCAyKTtcbiAqIC8vID0+IFtbMSwgMV0sIFsyLCAyXV1cbiAqL1xuZnVuY3Rpb24gZmxhdE1hcERlcHRoKGNvbGxlY3Rpb24sIGl0ZXJhdGVlLCBkZXB0aCkge1xuICBkZXB0aCA9IGRlcHRoID09PSB1bmRlZmluZWQgPyAxIDogdG9JbnRlZ2VyKGRlcHRoKTtcbiAgcmV0dXJuIGJhc2VGbGF0dGVuKG1hcChjb2xsZWN0aW9uLCBpdGVyYXRlZSksIGRlcHRoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmbGF0TWFwRGVwdGg7XG4iXX0=