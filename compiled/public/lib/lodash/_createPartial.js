'use strict';

var apply = require('./_apply'),
    createCtor = require('./_createCtor'),
    root = require('./_root');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = this && this !== root && this instanceof wrapper ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

module.exports = createPartial;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19jcmVhdGVQYXJ0aWFsLmpzIl0sIm5hbWVzIjpbImFwcGx5IiwicmVxdWlyZSIsImNyZWF0ZUN0b3IiLCJyb290IiwiV1JBUF9CSU5EX0ZMQUciLCJjcmVhdGVQYXJ0aWFsIiwiZnVuYyIsImJpdG1hc2siLCJ0aGlzQXJnIiwicGFydGlhbHMiLCJpc0JpbmQiLCJDdG9yIiwid3JhcHBlciIsImFyZ3NJbmRleCIsImFyZ3NMZW5ndGgiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJsZWZ0SW5kZXgiLCJsZWZ0TGVuZ3RoIiwiYXJncyIsIkFycmF5IiwiZm4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFFBQVFDLFFBQVEsVUFBUixDQUFaO0FBQUEsSUFDSUMsYUFBYUQsUUFBUSxlQUFSLENBRGpCO0FBQUEsSUFFSUUsT0FBT0YsUUFBUSxTQUFSLENBRlg7O0FBSUE7QUFDQSxJQUFJRyxpQkFBaUIsQ0FBckI7O0FBRUE7Ozs7Ozs7Ozs7OztBQVlBLFNBQVNDLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCQyxPQUE3QixFQUFzQ0MsT0FBdEMsRUFBK0NDLFFBQS9DLEVBQXlEO0FBQ3ZELE1BQUlDLFNBQVNILFVBQVVILGNBQXZCO0FBQUEsTUFDSU8sT0FBT1QsV0FBV0ksSUFBWCxDQURYOztBQUdBLFdBQVNNLE9BQVQsR0FBbUI7QUFDakIsUUFBSUMsWUFBWSxDQUFDLENBQWpCO0FBQUEsUUFDSUMsYUFBYUMsVUFBVUMsTUFEM0I7QUFBQSxRQUVJQyxZQUFZLENBQUMsQ0FGakI7QUFBQSxRQUdJQyxhQUFhVCxTQUFTTyxNQUgxQjtBQUFBLFFBSUlHLE9BQU9DLE1BQU1GLGFBQWFKLFVBQW5CLENBSlg7QUFBQSxRQUtJTyxLQUFNLFFBQVEsU0FBU2xCLElBQWpCLElBQXlCLGdCQUFnQlMsT0FBMUMsR0FBcURELElBQXJELEdBQTRETCxJQUxyRTs7QUFPQSxXQUFPLEVBQUVXLFNBQUYsR0FBY0MsVUFBckIsRUFBaUM7QUFDL0JDLFdBQUtGLFNBQUwsSUFBa0JSLFNBQVNRLFNBQVQsQ0FBbEI7QUFDRDtBQUNELFdBQU9ILFlBQVAsRUFBcUI7QUFDbkJLLFdBQUtGLFdBQUwsSUFBb0JGLFVBQVUsRUFBRUYsU0FBWixDQUFwQjtBQUNEO0FBQ0QsV0FBT2IsTUFBTXFCLEVBQU4sRUFBVVgsU0FBU0YsT0FBVCxHQUFtQixJQUE3QixFQUFtQ1csSUFBbkMsQ0FBUDtBQUNEO0FBQ0QsU0FBT1AsT0FBUDtBQUNEOztBQUVEVSxPQUFPQyxPQUFQLEdBQWlCbEIsYUFBakIiLCJmaWxlIjoiX2NyZWF0ZVBhcnRpYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwbHkgPSByZXF1aXJlKCcuL19hcHBseScpLFxuICAgIGNyZWF0ZUN0b3IgPSByZXF1aXJlKCcuL19jcmVhdGVDdG9yJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgZnVuY3Rpb24gbWV0YWRhdGEuICovXG52YXIgV1JBUF9CSU5EX0ZMQUcgPSAxO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHdyYXBzIGBmdW5jYCB0byBpbnZva2UgaXQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmdcbiAqIG9mIGB0aGlzQXJnYCBhbmQgYHBhcnRpYWxzYCBwcmVwZW5kZWQgdG8gdGhlIGFyZ3VtZW50cyBpdCByZWNlaXZlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGNyZWF0ZVdyYXBgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhcnRpYWxzIFRoZSBhcmd1bWVudHMgdG8gcHJlcGVuZCB0byB0aG9zZSBwcm92aWRlZCB0b1xuICogIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB3cmFwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVQYXJ0aWFsKGZ1bmMsIGJpdG1hc2ssIHRoaXNBcmcsIHBhcnRpYWxzKSB7XG4gIHZhciBpc0JpbmQgPSBiaXRtYXNrICYgV1JBUF9CSU5EX0ZMQUcsXG4gICAgICBDdG9yID0gY3JlYXRlQ3RvcihmdW5jKTtcblxuICBmdW5jdGlvbiB3cmFwcGVyKCkge1xuICAgIHZhciBhcmdzSW5kZXggPSAtMSxcbiAgICAgICAgYXJnc0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgIGxlZnRJbmRleCA9IC0xLFxuICAgICAgICBsZWZ0TGVuZ3RoID0gcGFydGlhbHMubGVuZ3RoLFxuICAgICAgICBhcmdzID0gQXJyYXkobGVmdExlbmd0aCArIGFyZ3NMZW5ndGgpLFxuICAgICAgICBmbiA9ICh0aGlzICYmIHRoaXMgIT09IHJvb3QgJiYgdGhpcyBpbnN0YW5jZW9mIHdyYXBwZXIpID8gQ3RvciA6IGZ1bmM7XG5cbiAgICB3aGlsZSAoKytsZWZ0SW5kZXggPCBsZWZ0TGVuZ3RoKSB7XG4gICAgICBhcmdzW2xlZnRJbmRleF0gPSBwYXJ0aWFsc1tsZWZ0SW5kZXhdO1xuICAgIH1cbiAgICB3aGlsZSAoYXJnc0xlbmd0aC0tKSB7XG4gICAgICBhcmdzW2xlZnRJbmRleCsrXSA9IGFyZ3VtZW50c1srK2FyZ3NJbmRleF07XG4gICAgfVxuICAgIHJldHVybiBhcHBseShmbiwgaXNCaW5kID8gdGhpc0FyZyA6IHRoaXMsIGFyZ3MpO1xuICB9XG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVBhcnRpYWw7XG4iXX0=