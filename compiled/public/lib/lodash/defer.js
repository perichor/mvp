'use strict';

var baseDelay = require('./_baseDelay'),
    baseRest = require('./_baseRest');

/**
 * Defers invoking the `func` until the current call stack has cleared. Any
 * additional arguments are provided to `func` when it's invoked.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to defer.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * _.defer(function(text) {
 *   console.log(text);
 * }, 'deferred');
 * // => Logs 'deferred' after one millisecond.
 */
var defer = baseRest(function (func, args) {
  return baseDelay(func, 1, args);
});

module.exports = defer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2RlZmVyLmpzIl0sIm5hbWVzIjpbImJhc2VEZWxheSIsInJlcXVpcmUiLCJiYXNlUmVzdCIsImRlZmVyIiwiZnVuYyIsImFyZ3MiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVlDLFFBQVEsY0FBUixDQUFoQjtBQUFBLElBQ0lDLFdBQVdELFFBQVEsYUFBUixDQURmOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsSUFBSUUsUUFBUUQsU0FBUyxVQUFTRSxJQUFULEVBQWVDLElBQWYsRUFBcUI7QUFDeEMsU0FBT0wsVUFBVUksSUFBVixFQUFnQixDQUFoQixFQUFtQkMsSUFBbkIsQ0FBUDtBQUNELENBRlcsQ0FBWjs7QUFJQUMsT0FBT0MsT0FBUCxHQUFpQkosS0FBakIiLCJmaWxlIjoiZGVmZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZURlbGF5ID0gcmVxdWlyZSgnLi9fYmFzZURlbGF5JyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpO1xuXG4vKipcbiAqIERlZmVycyBpbnZva2luZyB0aGUgYGZ1bmNgIHVudGlsIHRoZSBjdXJyZW50IGNhbGwgc3RhY2sgaGFzIGNsZWFyZWQuIEFueVxuICogYWRkaXRpb25hbCBhcmd1bWVudHMgYXJlIHByb3ZpZGVkIHRvIGBmdW5jYCB3aGVuIGl0J3MgaW52b2tlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlZmVyLlxuICogQHBhcmFtIHsuLi4qfSBbYXJnc10gVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lciBpZC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbih0ZXh0KSB7XG4gKiAgIGNvbnNvbGUubG9nKHRleHQpO1xuICogfSwgJ2RlZmVycmVkJyk7XG4gKiAvLyA9PiBMb2dzICdkZWZlcnJlZCcgYWZ0ZXIgb25lIG1pbGxpc2Vjb25kLlxuICovXG52YXIgZGVmZXIgPSBiYXNlUmVzdChmdW5jdGlvbihmdW5jLCBhcmdzKSB7XG4gIHJldHVybiBiYXNlRGVsYXkoZnVuYywgMSwgYXJncyk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZlcjtcbiJdfQ==