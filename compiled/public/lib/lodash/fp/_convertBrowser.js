'use strict';

var baseConvert = require('./_baseConvert');

/**
 * Converts `lodash` to an immutable auto-curried iteratee-first data-last
 * version with conversion `options` applied.
 *
 * @param {Function} lodash The lodash function to convert.
 * @param {Object} [options] The options object. See `baseConvert` for more details.
 * @returns {Function} Returns the converted `lodash`.
 */
function browserConvert(lodash, options) {
  return baseConvert(lodash, lodash, options);
}

if (typeof _ == 'function' && typeof _.runInContext == 'function') {
  _ = browserConvert(_.runInContext());
}
module.exports = browserConvert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZwL19jb252ZXJ0QnJvd3Nlci5qcyJdLCJuYW1lcyI6WyJiYXNlQ29udmVydCIsInJlcXVpcmUiLCJicm93c2VyQ29udmVydCIsImxvZGFzaCIsIm9wdGlvbnMiLCJfIiwicnVuSW5Db250ZXh0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxjQUFjQyxRQUFRLGdCQUFSLENBQWxCOztBQUVBOzs7Ozs7OztBQVFBLFNBQVNDLGNBQVQsQ0FBd0JDLE1BQXhCLEVBQWdDQyxPQUFoQyxFQUF5QztBQUN2QyxTQUFPSixZQUFZRyxNQUFaLEVBQW9CQSxNQUFwQixFQUE0QkMsT0FBNUIsQ0FBUDtBQUNEOztBQUVELElBQUksT0FBT0MsQ0FBUCxJQUFZLFVBQVosSUFBMEIsT0FBT0EsRUFBRUMsWUFBVCxJQUF5QixVQUF2RCxFQUFtRTtBQUNqRUQsTUFBSUgsZUFBZUcsRUFBRUMsWUFBRixFQUFmLENBQUo7QUFDRDtBQUNEQyxPQUFPQyxPQUFQLEdBQWlCTixjQUFqQiIsImZpbGUiOiJfY29udmVydEJyb3dzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUNvbnZlcnQgPSByZXF1aXJlKCcuL19iYXNlQ29udmVydCcpO1xuXG4vKipcbiAqIENvbnZlcnRzIGBsb2Rhc2hgIHRvIGFuIGltbXV0YWJsZSBhdXRvLWN1cnJpZWQgaXRlcmF0ZWUtZmlyc3QgZGF0YS1sYXN0XG4gKiB2ZXJzaW9uIHdpdGggY29udmVyc2lvbiBgb3B0aW9uc2AgYXBwbGllZC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBsb2Rhc2ggVGhlIGxvZGFzaCBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBvYmplY3QuIFNlZSBgYmFzZUNvbnZlcnRgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNvbnZlcnRlZCBgbG9kYXNoYC5cbiAqL1xuZnVuY3Rpb24gYnJvd3NlckNvbnZlcnQobG9kYXNoLCBvcHRpb25zKSB7XG4gIHJldHVybiBiYXNlQ29udmVydChsb2Rhc2gsIGxvZGFzaCwgb3B0aW9ucyk7XG59XG5cbmlmICh0eXBlb2YgXyA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBfLnJ1bkluQ29udGV4dCA9PSAnZnVuY3Rpb24nKSB7XG4gIF8gPSBicm93c2VyQ29udmVydChfLnJ1bkluQ29udGV4dCgpKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYnJvd3NlckNvbnZlcnQ7XG4iXX0=