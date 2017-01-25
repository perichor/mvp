'use strict';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor;

/**
 * The base implementation of `_.repeat` which doesn't coerce arguments.
 *
 * @private
 * @param {string} string The string to repeat.
 * @param {number} n The number of times to repeat the string.
 * @returns {string} Returns the repeated string.
 */
function baseRepeat(string, n) {
  var result = '';
  if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
    return result;
  }
  // Leverage the exponentiation by squaring algorithm for a faster repeat.
  // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
  do {
    if (n % 2) {
      result += string;
    }
    n = nativeFloor(n / 2);
    if (n) {
      string += string;
    }
  } while (n);

  return result;
}

module.exports = baseRepeat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlUmVwZWF0LmpzIl0sIm5hbWVzIjpbIk1BWF9TQUZFX0lOVEVHRVIiLCJuYXRpdmVGbG9vciIsIk1hdGgiLCJmbG9vciIsImJhc2VSZXBlYXQiLCJzdHJpbmciLCJuIiwicmVzdWx0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQUlBLG1CQUFtQixnQkFBdkI7O0FBRUE7QUFDQSxJQUFJQyxjQUFjQyxLQUFLQyxLQUF2Qjs7QUFFQTs7Ozs7Ozs7QUFRQSxTQUFTQyxVQUFULENBQW9CQyxNQUFwQixFQUE0QkMsQ0FBNUIsRUFBK0I7QUFDN0IsTUFBSUMsU0FBUyxFQUFiO0FBQ0EsTUFBSSxDQUFDRixNQUFELElBQVdDLElBQUksQ0FBZixJQUFvQkEsSUFBSU4sZ0JBQTVCLEVBQThDO0FBQzVDLFdBQU9PLE1BQVA7QUFDRDtBQUNEO0FBQ0E7QUFDQSxLQUFHO0FBQ0QsUUFBSUQsSUFBSSxDQUFSLEVBQVc7QUFDVEMsZ0JBQVVGLE1BQVY7QUFDRDtBQUNEQyxRQUFJTCxZQUFZSyxJQUFJLENBQWhCLENBQUo7QUFDQSxRQUFJQSxDQUFKLEVBQU87QUFDTEQsZ0JBQVVBLE1BQVY7QUFDRDtBQUNGLEdBUkQsUUFRU0MsQ0FSVDs7QUFVQSxTQUFPQyxNQUFQO0FBQ0Q7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUJMLFVBQWpCIiwiZmlsZSI6Il9iYXNlUmVwZWF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVGbG9vciA9IE1hdGguZmxvb3I7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVwZWF0YCB3aGljaCBkb2Vzbid0IGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byByZXBlYXQuXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCB0aGUgc3RyaW5nLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmVwZWF0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlUmVwZWF0KHN0cmluZywgbikge1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIGlmICghc3RyaW5nIHx8IG4gPCAxIHx8IG4gPiBNQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAvLyBMZXZlcmFnZSB0aGUgZXhwb25lbnRpYXRpb24gYnkgc3F1YXJpbmcgYWxnb3JpdGhtIGZvciBhIGZhc3RlciByZXBlYXQuXG4gIC8vIFNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FeHBvbmVudGlhdGlvbl9ieV9zcXVhcmluZyBmb3IgbW9yZSBkZXRhaWxzLlxuICBkbyB7XG4gICAgaWYgKG4gJSAyKSB7XG4gICAgICByZXN1bHQgKz0gc3RyaW5nO1xuICAgIH1cbiAgICBuID0gbmF0aXZlRmxvb3IobiAvIDIpO1xuICAgIGlmIChuKSB7XG4gICAgICBzdHJpbmcgKz0gc3RyaW5nO1xuICAgIH1cbiAgfSB3aGlsZSAobik7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlUmVwZWF0O1xuIl19