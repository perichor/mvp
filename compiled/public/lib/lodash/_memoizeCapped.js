'use strict';

var memoize = require('./memoize');

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19tZW1vaXplQ2FwcGVkLmpzIl0sIm5hbWVzIjpbIm1lbW9pemUiLCJyZXF1aXJlIiwiTUFYX01FTU9JWkVfU0laRSIsIm1lbW9pemVDYXBwZWQiLCJmdW5jIiwicmVzdWx0Iiwia2V5IiwiY2FjaGUiLCJzaXplIiwiY2xlYXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFVBQVVDLFFBQVEsV0FBUixDQUFkOztBQUVBO0FBQ0EsSUFBSUMsbUJBQW1CLEdBQXZCOztBQUVBOzs7Ozs7OztBQVFBLFNBQVNDLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCO0FBQzNCLE1BQUlDLFNBQVNMLFFBQVFJLElBQVIsRUFBYyxVQUFTRSxHQUFULEVBQWM7QUFDdkMsUUFBSUMsTUFBTUMsSUFBTixLQUFlTixnQkFBbkIsRUFBcUM7QUFDbkNLLFlBQU1FLEtBQU47QUFDRDtBQUNELFdBQU9ILEdBQVA7QUFDRCxHQUxZLENBQWI7O0FBT0EsTUFBSUMsUUFBUUYsT0FBT0UsS0FBbkI7QUFDQSxTQUFPRixNQUFQO0FBQ0Q7O0FBRURLLE9BQU9DLE9BQVAsR0FBaUJSLGFBQWpCIiwiZmlsZSI6Il9tZW1vaXplQ2FwcGVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1lbW9pemUgPSByZXF1aXJlKCcuL21lbW9pemUnKTtcblxuLyoqIFVzZWQgYXMgdGhlIG1heGltdW0gbWVtb2l6ZSBjYWNoZSBzaXplLiAqL1xudmFyIE1BWF9NRU1PSVpFX1NJWkUgPSA1MDA7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1lbW9pemVgIHdoaWNoIGNsZWFycyB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24nc1xuICogY2FjaGUgd2hlbiBpdCBleGNlZWRzIGBNQVhfTUVNT0laRV9TSVpFYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaGF2ZSBpdHMgb3V0cHV0IG1lbW9pemVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG1lbW9pemVDYXBwZWQoZnVuYykge1xuICB2YXIgcmVzdWx0ID0gbWVtb2l6ZShmdW5jLCBmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoY2FjaGUuc2l6ZSA9PT0gTUFYX01FTU9JWkVfU0laRSkge1xuICAgICAgY2FjaGUuY2xlYXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfSk7XG5cbiAgdmFyIGNhY2hlID0gcmVzdWx0LmNhY2hlO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lbW9pemVDYXBwZWQ7XG4iXX0=