'use strict';

var baseTimes = require('./_baseTimes'),
    castFunction = require('./_castFunction'),
    toInteger = require('./toInteger');

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Invokes the iteratee `n` times, returning an array of the results of
 * each invocation. The iteratee is invoked with one argument; (index).
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * _.times(3, String);
 * // => ['0', '1', '2']
 *
 *  _.times(4, _.constant(0));
 * // => [0, 0, 0, 0]
 */
function times(n, iteratee) {
  n = toInteger(n);
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return [];
  }
  var index = MAX_ARRAY_LENGTH,
      length = nativeMin(n, MAX_ARRAY_LENGTH);

  iteratee = castFunction(iteratee);
  n -= MAX_ARRAY_LENGTH;

  var result = baseTimes(length, iteratee);
  while (++index < n) {
    iteratee(index);
  }
  return result;
}

module.exports = times;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3RpbWVzLmpzIl0sIm5hbWVzIjpbImJhc2VUaW1lcyIsInJlcXVpcmUiLCJjYXN0RnVuY3Rpb24iLCJ0b0ludGVnZXIiLCJNQVhfU0FGRV9JTlRFR0VSIiwiTUFYX0FSUkFZX0xFTkdUSCIsIm5hdGl2ZU1pbiIsIk1hdGgiLCJtaW4iLCJ0aW1lcyIsIm4iLCJpdGVyYXRlZSIsImluZGV4IiwibGVuZ3RoIiwicmVzdWx0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxZQUFZQyxRQUFRLGNBQVIsQ0FBaEI7QUFBQSxJQUNJQyxlQUFlRCxRQUFRLGlCQUFSLENBRG5CO0FBQUEsSUFFSUUsWUFBWUYsUUFBUSxhQUFSLENBRmhCOztBQUlBO0FBQ0EsSUFBSUcsbUJBQW1CLGdCQUF2Qjs7QUFFQTtBQUNBLElBQUlDLG1CQUFtQixVQUF2Qjs7QUFFQTtBQUNBLElBQUlDLFlBQVlDLEtBQUtDLEdBQXJCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLFNBQVNDLEtBQVQsQ0FBZUMsQ0FBZixFQUFrQkMsUUFBbEIsRUFBNEI7QUFDMUJELE1BQUlQLFVBQVVPLENBQVYsQ0FBSjtBQUNBLE1BQUlBLElBQUksQ0FBSixJQUFTQSxJQUFJTixnQkFBakIsRUFBbUM7QUFDakMsV0FBTyxFQUFQO0FBQ0Q7QUFDRCxNQUFJUSxRQUFRUCxnQkFBWjtBQUFBLE1BQ0lRLFNBQVNQLFVBQVVJLENBQVYsRUFBYUwsZ0JBQWIsQ0FEYjs7QUFHQU0sYUFBV1QsYUFBYVMsUUFBYixDQUFYO0FBQ0FELE9BQUtMLGdCQUFMOztBQUVBLE1BQUlTLFNBQVNkLFVBQVVhLE1BQVYsRUFBa0JGLFFBQWxCLENBQWI7QUFDQSxTQUFPLEVBQUVDLEtBQUYsR0FBVUYsQ0FBakIsRUFBb0I7QUFDbEJDLGFBQVNDLEtBQVQ7QUFDRDtBQUNELFNBQU9FLE1BQVA7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQlAsS0FBakIiLCJmaWxlIjoidGltZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZVRpbWVzID0gcmVxdWlyZSgnLi9fYmFzZVRpbWVzJyksXG4gICAgY2FzdEZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fY2FzdEZ1bmN0aW9uJyksXG4gICAgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi90b0ludGVnZXInKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHRoZSBtYXhpbXVtIGxlbmd0aCBhbmQgaW5kZXggb2YgYW4gYXJyYXkuICovXG52YXIgTUFYX0FSUkFZX0xFTkdUSCA9IDQyOTQ5NjcyOTU7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBJbnZva2VzIHRoZSBpdGVyYXRlZSBgbmAgdGltZXMsIHJldHVybmluZyBhbiBhcnJheSBvZiB0aGUgcmVzdWx0cyBvZlxuICogZWFjaCBpbnZvY2F0aW9uLiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDsgKGluZGV4KS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDMsIFN0cmluZyk7XG4gKiAvLyA9PiBbJzAnLCAnMScsICcyJ11cbiAqXG4gKiAgXy50aW1lcyg0LCBfLmNvbnN0YW50KDApKTtcbiAqIC8vID0+IFswLCAwLCAwLCAwXVxuICovXG5mdW5jdGlvbiB0aW1lcyhuLCBpdGVyYXRlZSkge1xuICBuID0gdG9JbnRlZ2VyKG4pO1xuICBpZiAobiA8IDEgfHwgbiA+IE1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgdmFyIGluZGV4ID0gTUFYX0FSUkFZX0xFTkdUSCxcbiAgICAgIGxlbmd0aCA9IG5hdGl2ZU1pbihuLCBNQVhfQVJSQVlfTEVOR1RIKTtcblxuICBpdGVyYXRlZSA9IGNhc3RGdW5jdGlvbihpdGVyYXRlZSk7XG4gIG4gLT0gTUFYX0FSUkFZX0xFTkdUSDtcblxuICB2YXIgcmVzdWx0ID0gYmFzZVRpbWVzKGxlbmd0aCwgaXRlcmF0ZWUpO1xuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aW1lcztcbiJdfQ==