'use strict';

var createCtor = require('./_createCtor'),
    root = require('./_root');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

module.exports = createBind;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19jcmVhdGVCaW5kLmpzIl0sIm5hbWVzIjpbImNyZWF0ZUN0b3IiLCJyZXF1aXJlIiwicm9vdCIsIldSQVBfQklORF9GTEFHIiwiY3JlYXRlQmluZCIsImZ1bmMiLCJiaXRtYXNrIiwidGhpc0FyZyIsImlzQmluZCIsIkN0b3IiLCJ3cmFwcGVyIiwiZm4iLCJhcHBseSIsImFyZ3VtZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsYUFBYUMsUUFBUSxlQUFSLENBQWpCO0FBQUEsSUFDSUMsT0FBT0QsUUFBUSxTQUFSLENBRFg7O0FBR0E7QUFDQSxJQUFJRSxpQkFBaUIsQ0FBckI7O0FBRUE7Ozs7Ozs7Ozs7QUFVQSxTQUFTQyxVQUFULENBQW9CQyxJQUFwQixFQUEwQkMsT0FBMUIsRUFBbUNDLE9BQW5DLEVBQTRDO0FBQzFDLE1BQUlDLFNBQVNGLFVBQVVILGNBQXZCO0FBQUEsTUFDSU0sT0FBT1QsV0FBV0ssSUFBWCxDQURYOztBQUdBLFdBQVNLLE9BQVQsR0FBbUI7QUFDakIsUUFBSUMsS0FBTSxRQUFRLFNBQVNULElBQWpCLElBQXlCLGdCQUFnQlEsT0FBMUMsR0FBcURELElBQXJELEdBQTRESixJQUFyRTtBQUNBLFdBQU9NLEdBQUdDLEtBQUgsQ0FBU0osU0FBU0QsT0FBVCxHQUFtQixJQUE1QixFQUFrQ00sU0FBbEMsQ0FBUDtBQUNEO0FBQ0QsU0FBT0gsT0FBUDtBQUNEOztBQUVESSxPQUFPQyxPQUFQLEdBQWlCWCxVQUFqQiIsImZpbGUiOiJfY3JlYXRlQmluZC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjcmVhdGVDdG9yID0gcmVxdWlyZSgnLi9fY3JlYXRlQ3RvcicpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGZ1bmN0aW9uIG1ldGFkYXRhLiAqL1xudmFyIFdSQVBfQklORF9GTEFHID0gMTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgdG8gaW52b2tlIGl0IHdpdGggdGhlIG9wdGlvbmFsIGB0aGlzYFxuICogYmluZGluZyBvZiBgdGhpc0FyZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBjcmVhdGVXcmFwYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHdyYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJpbmQoZnVuYywgYml0bWFzaywgdGhpc0FyZykge1xuICB2YXIgaXNCaW5kID0gYml0bWFzayAmIFdSQVBfQklORF9GTEFHLFxuICAgICAgQ3RvciA9IGNyZWF0ZUN0b3IoZnVuYyk7XG5cbiAgZnVuY3Rpb24gd3JhcHBlcigpIHtcbiAgICB2YXIgZm4gPSAodGhpcyAmJiB0aGlzICE9PSByb290ICYmIHRoaXMgaW5zdGFuY2VvZiB3cmFwcGVyKSA/IEN0b3IgOiBmdW5jO1xuICAgIHJldHVybiBmbi5hcHBseShpc0JpbmQgPyB0aGlzQXJnIDogdGhpcywgYXJndW1lbnRzKTtcbiAgfVxuICByZXR1cm4gd3JhcHBlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVCaW5kO1xuIl19