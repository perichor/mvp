'use strict';

var toInteger = require('./toInteger');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * The opposite of `_.before`; this method creates a function that invokes
 * `func` once it's called `n` or more times.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {number} n The number of calls before `func` is invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var saves = ['profile', 'settings'];
 *
 * var done = _.after(saves.length, function() {
 *   console.log('done saving!');
 * });
 *
 * _.forEach(saves, function(type) {
 *   asyncSave({ 'type': type, 'complete': done });
 * });
 * // => Logs 'done saving!' after the two async saves have completed.
 */
function after(n, func) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = toInteger(n);
  return function () {
    if (--n < 1) {
      return func.apply(this, arguments);
    }
  };
}

module.exports = after;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2FmdGVyLmpzIl0sIm5hbWVzIjpbInRvSW50ZWdlciIsInJlcXVpcmUiLCJGVU5DX0VSUk9SX1RFWFQiLCJhZnRlciIsIm4iLCJmdW5jIiwiVHlwZUVycm9yIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVlDLFFBQVEsYUFBUixDQUFoQjs7QUFFQTtBQUNBLElBQUlDLGtCQUFrQixxQkFBdEI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxTQUFTQyxLQUFULENBQWVDLENBQWYsRUFBa0JDLElBQWxCLEVBQXdCO0FBQ3RCLE1BQUksT0FBT0EsSUFBUCxJQUFlLFVBQW5CLEVBQStCO0FBQzdCLFVBQU0sSUFBSUMsU0FBSixDQUFjSixlQUFkLENBQU47QUFDRDtBQUNERSxNQUFJSixVQUFVSSxDQUFWLENBQUo7QUFDQSxTQUFPLFlBQVc7QUFDaEIsUUFBSSxFQUFFQSxDQUFGLEdBQU0sQ0FBVixFQUFhO0FBQ1gsYUFBT0MsS0FBS0UsS0FBTCxDQUFXLElBQVgsRUFBaUJDLFNBQWpCLENBQVA7QUFDRDtBQUNGLEdBSkQ7QUFLRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQlAsS0FBakIiLCJmaWxlIjoiYWZ0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi90b0ludGVnZXInKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBUaGUgb3Bwb3NpdGUgb2YgYF8uYmVmb3JlYDsgdGhpcyBtZXRob2QgY3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlc1xuICogYGZ1bmNgIG9uY2UgaXQncyBjYWxsZWQgYG5gIG9yIG1vcmUgdGltZXMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGNhbGxzIGJlZm9yZSBgZnVuY2AgaXMgaW52b2tlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgcmVzdHJpY3RlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHNhdmVzID0gWydwcm9maWxlJywgJ3NldHRpbmdzJ107XG4gKlxuICogdmFyIGRvbmUgPSBfLmFmdGVyKHNhdmVzLmxlbmd0aCwgZnVuY3Rpb24oKSB7XG4gKiAgIGNvbnNvbGUubG9nKCdkb25lIHNhdmluZyEnKTtcbiAqIH0pO1xuICpcbiAqIF8uZm9yRWFjaChzYXZlcywgZnVuY3Rpb24odHlwZSkge1xuICogICBhc3luY1NhdmUoeyAndHlwZSc6IHR5cGUsICdjb21wbGV0ZSc6IGRvbmUgfSk7XG4gKiB9KTtcbiAqIC8vID0+IExvZ3MgJ2RvbmUgc2F2aW5nIScgYWZ0ZXIgdGhlIHR3byBhc3luYyBzYXZlcyBoYXZlIGNvbXBsZXRlZC5cbiAqL1xuZnVuY3Rpb24gYWZ0ZXIobiwgZnVuYykge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBuID0gdG9JbnRlZ2VyKG4pO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKC0tbiA8IDEpIHtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFmdGVyO1xuIl19