'use strict';

var baseDelay = require('./_baseDelay'),
    baseRest = require('./_baseRest'),
    toNumber = require('./toNumber');

/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it's invoked.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * _.delay(function(text) {
 *   console.log(text);
 * }, 1000, 'later');
 * // => Logs 'later' after one second.
 */
var delay = baseRest(function (func, wait, args) {
  return baseDelay(func, toNumber(wait) || 0, args);
});

module.exports = delay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2RlbGF5LmpzIl0sIm5hbWVzIjpbImJhc2VEZWxheSIsInJlcXVpcmUiLCJiYXNlUmVzdCIsInRvTnVtYmVyIiwiZGVsYXkiLCJmdW5jIiwid2FpdCIsImFyZ3MiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVlDLFFBQVEsY0FBUixDQUFoQjtBQUFBLElBQ0lDLFdBQVdELFFBQVEsYUFBUixDQURmO0FBQUEsSUFFSUUsV0FBV0YsUUFBUSxZQUFSLENBRmY7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsSUFBSUcsUUFBUUYsU0FBUyxVQUFTRyxJQUFULEVBQWVDLElBQWYsRUFBcUJDLElBQXJCLEVBQTJCO0FBQzlDLFNBQU9QLFVBQVVLLElBQVYsRUFBZ0JGLFNBQVNHLElBQVQsS0FBa0IsQ0FBbEMsRUFBcUNDLElBQXJDLENBQVA7QUFDRCxDQUZXLENBQVo7O0FBSUFDLE9BQU9DLE9BQVAsR0FBaUJMLEtBQWpCIiwiZmlsZSI6ImRlbGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VEZWxheSA9IHJlcXVpcmUoJy4vX2Jhc2VEZWxheScpLFxuICAgIGJhc2VSZXN0ID0gcmVxdWlyZSgnLi9fYmFzZVJlc3QnKSxcbiAgICB0b051bWJlciA9IHJlcXVpcmUoJy4vdG9OdW1iZXInKTtcblxuLyoqXG4gKiBJbnZva2VzIGBmdW5jYCBhZnRlciBgd2FpdGAgbWlsbGlzZWNvbmRzLiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYXJlXG4gKiBwcm92aWRlZCB0byBgZnVuY2Agd2hlbiBpdCdzIGludm9rZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWxheS5cbiAqIEBwYXJhbSB7bnVtYmVyfSB3YWl0IFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5IGludm9jYXRpb24uXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVyIGlkLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlbGF5KGZ1bmN0aW9uKHRleHQpIHtcbiAqICAgY29uc29sZS5sb2codGV4dCk7XG4gKiB9LCAxMDAwLCAnbGF0ZXInKTtcbiAqIC8vID0+IExvZ3MgJ2xhdGVyJyBhZnRlciBvbmUgc2Vjb25kLlxuICovXG52YXIgZGVsYXkgPSBiYXNlUmVzdChmdW5jdGlvbihmdW5jLCB3YWl0LCBhcmdzKSB7XG4gIHJldHVybiBiYXNlRGVsYXkoZnVuYywgdG9OdW1iZXIod2FpdCkgfHwgMCwgYXJncyk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWxheTtcbiJdfQ==