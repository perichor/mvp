'use strict';

var baseSlice = require('./_baseSlice'),
    isIterateeCall = require('./_isIterateeCall'),
    toInteger = require('./toInteger');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil,
    nativeMax = Math.max;

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * _.chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * _.chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size, guard) {
  if (guard ? isIterateeCall(array, size, guard) : size === undefined) {
    size = 1;
  } else {
    size = nativeMax(toInteger(size), 0);
  }
  var length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  var index = 0,
      resIndex = 0,
      result = Array(nativeCeil(length / size));

  while (index < length) {
    result[resIndex++] = baseSlice(array, index, index += size);
  }
  return result;
}

module.exports = chunk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2NodW5rLmpzIl0sIm5hbWVzIjpbImJhc2VTbGljZSIsInJlcXVpcmUiLCJpc0l0ZXJhdGVlQ2FsbCIsInRvSW50ZWdlciIsIm5hdGl2ZUNlaWwiLCJNYXRoIiwiY2VpbCIsIm5hdGl2ZU1heCIsIm1heCIsImNodW5rIiwiYXJyYXkiLCJzaXplIiwiZ3VhcmQiLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJpbmRleCIsInJlc0luZGV4IiwicmVzdWx0IiwiQXJyYXkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVlDLFFBQVEsY0FBUixDQUFoQjtBQUFBLElBQ0lDLGlCQUFpQkQsUUFBUSxtQkFBUixDQURyQjtBQUFBLElBRUlFLFlBQVlGLFFBQVEsYUFBUixDQUZoQjs7QUFJQTtBQUNBLElBQUlHLGFBQWFDLEtBQUtDLElBQXRCO0FBQUEsSUFDSUMsWUFBWUYsS0FBS0csR0FEckI7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxTQUFTQyxLQUFULENBQWVDLEtBQWYsRUFBc0JDLElBQXRCLEVBQTRCQyxLQUE1QixFQUFtQztBQUNqQyxNQUFLQSxRQUFRVixlQUFlUSxLQUFmLEVBQXNCQyxJQUF0QixFQUE0QkMsS0FBNUIsQ0FBUixHQUE2Q0QsU0FBU0UsU0FBM0QsRUFBdUU7QUFDckVGLFdBQU8sQ0FBUDtBQUNELEdBRkQsTUFFTztBQUNMQSxXQUFPSixVQUFVSixVQUFVUSxJQUFWLENBQVYsRUFBMkIsQ0FBM0IsQ0FBUDtBQUNEO0FBQ0QsTUFBSUcsU0FBU0osU0FBUyxJQUFULEdBQWdCLENBQWhCLEdBQW9CQSxNQUFNSSxNQUF2QztBQUNBLE1BQUksQ0FBQ0EsTUFBRCxJQUFXSCxPQUFPLENBQXRCLEVBQXlCO0FBQ3ZCLFdBQU8sRUFBUDtBQUNEO0FBQ0QsTUFBSUksUUFBUSxDQUFaO0FBQUEsTUFDSUMsV0FBVyxDQURmO0FBQUEsTUFFSUMsU0FBU0MsTUFBTWQsV0FBV1UsU0FBU0gsSUFBcEIsQ0FBTixDQUZiOztBQUlBLFNBQU9JLFFBQVFELE1BQWYsRUFBdUI7QUFDckJHLFdBQU9ELFVBQVAsSUFBcUJoQixVQUFVVSxLQUFWLEVBQWlCSyxLQUFqQixFQUF5QkEsU0FBU0osSUFBbEMsQ0FBckI7QUFDRDtBQUNELFNBQU9NLE1BQVA7QUFDRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQlgsS0FBakIiLCJmaWxlIjoiY2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZVNsaWNlID0gcmVxdWlyZSgnLi9fYmFzZVNsaWNlJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL19pc0l0ZXJhdGVlQ2FsbCcpLFxuICAgIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vdG9JbnRlZ2VyJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVDZWlsID0gTWF0aC5jZWlsLFxuICAgIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgZWxlbWVudHMgc3BsaXQgaW50byBncm91cHMgdGhlIGxlbmd0aCBvZiBgc2l6ZWAuXG4gKiBJZiBgYXJyYXlgIGNhbid0IGJlIHNwbGl0IGV2ZW5seSwgdGhlIGZpbmFsIGNodW5rIHdpbGwgYmUgdGhlIHJlbWFpbmluZ1xuICogZWxlbWVudHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcHJvY2Vzcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc2l6ZT0xXSBUaGUgbGVuZ3RoIG9mIGVhY2ggY2h1bmtcbiAqIEBwYXJhbS0ge09iamVjdH0gW2d1YXJkXSBFbmFibGVzIHVzZSBhcyBhbiBpdGVyYXRlZSBmb3IgbWV0aG9kcyBsaWtlIGBfLm1hcGAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiBjaHVua3MuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uY2h1bmsoWydhJywgJ2InLCAnYycsICdkJ10sIDIpO1xuICogLy8gPT4gW1snYScsICdiJ10sIFsnYycsICdkJ11dXG4gKlxuICogXy5jaHVuayhbJ2EnLCAnYicsICdjJywgJ2QnXSwgMyk7XG4gKiAvLyA9PiBbWydhJywgJ2InLCAnYyddLCBbJ2QnXV1cbiAqL1xuZnVuY3Rpb24gY2h1bmsoYXJyYXksIHNpemUsIGd1YXJkKSB7XG4gIGlmICgoZ3VhcmQgPyBpc0l0ZXJhdGVlQ2FsbChhcnJheSwgc2l6ZSwgZ3VhcmQpIDogc2l6ZSA9PT0gdW5kZWZpbmVkKSkge1xuICAgIHNpemUgPSAxO1xuICB9IGVsc2Uge1xuICAgIHNpemUgPSBuYXRpdmVNYXgodG9JbnRlZ2VyKHNpemUpLCAwKTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gIGlmICghbGVuZ3RoIHx8IHNpemUgPCAxKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHZhciBpbmRleCA9IDAsXG4gICAgICByZXNJbmRleCA9IDAsXG4gICAgICByZXN1bHQgPSBBcnJheShuYXRpdmVDZWlsKGxlbmd0aCAvIHNpemUpKTtcblxuICB3aGlsZSAoaW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbcmVzSW5kZXgrK10gPSBiYXNlU2xpY2UoYXJyYXksIGluZGV4LCAoaW5kZXggKz0gc2l6ZSkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2h1bms7XG4iXX0=