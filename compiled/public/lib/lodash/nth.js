'use strict';

var baseNth = require('./_baseNth'),
    toInteger = require('./toInteger');

/**
 * Gets the element at index `n` of `array`. If `n` is negative, the nth
 * element from the end is returned.
 *
 * @static
 * @memberOf _
 * @since 4.11.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=0] The index of the element to return.
 * @returns {*} Returns the nth element of `array`.
 * @example
 *
 * var array = ['a', 'b', 'c', 'd'];
 *
 * _.nth(array, 1);
 * // => 'b'
 *
 * _.nth(array, -2);
 * // => 'c';
 */
function nth(array, n) {
  return array && array.length ? baseNth(array, toInteger(n)) : undefined;
}

module.exports = nth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL250aC5qcyJdLCJuYW1lcyI6WyJiYXNlTnRoIiwicmVxdWlyZSIsInRvSW50ZWdlciIsIm50aCIsImFycmF5IiwibiIsImxlbmd0aCIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsVUFBVUMsUUFBUSxZQUFSLENBQWQ7QUFBQSxJQUNJQyxZQUFZRCxRQUFRLGFBQVIsQ0FEaEI7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxTQUFTRSxHQUFULENBQWFDLEtBQWIsRUFBb0JDLENBQXBCLEVBQXVCO0FBQ3JCLFNBQVFELFNBQVNBLE1BQU1FLE1BQWhCLEdBQTBCTixRQUFRSSxLQUFSLEVBQWVGLFVBQVVHLENBQVYsQ0FBZixDQUExQixHQUF5REUsU0FBaEU7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQk4sR0FBakIiLCJmaWxlIjoibnRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VOdGggPSByZXF1aXJlKCcuL19iYXNlTnRoJyksXG4gICAgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi90b0ludGVnZXInKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBlbGVtZW50IGF0IGluZGV4IGBuYCBvZiBgYXJyYXlgLiBJZiBgbmAgaXMgbmVnYXRpdmUsIHRoZSBudGhcbiAqIGVsZW1lbnQgZnJvbSB0aGUgZW5kIGlzIHJldHVybmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbj0wXSBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgdG8gcmV0dXJuLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG50aCBlbGVtZW50IG9mIGBhcnJheWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheSA9IFsnYScsICdiJywgJ2MnLCAnZCddO1xuICpcbiAqIF8ubnRoKGFycmF5LCAxKTtcbiAqIC8vID0+ICdiJ1xuICpcbiAqIF8ubnRoKGFycmF5LCAtMik7XG4gKiAvLyA9PiAnYyc7XG4gKi9cbmZ1bmN0aW9uIG50aChhcnJheSwgbikge1xuICByZXR1cm4gKGFycmF5ICYmIGFycmF5Lmxlbmd0aCkgPyBiYXNlTnRoKGFycmF5LCB0b0ludGVnZXIobikpIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG50aDtcbiJdfQ==