'use strict';

var apply = require('./_apply'),
    arrayPush = require('./_arrayPush'),
    baseRest = require('./_baseRest'),
    castSlice = require('./_castSlice'),
    toInteger = require('./toInteger');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * create function and an array of arguments much like
 * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
 *
 * **Note:** This method is based on the
 * [spread operator](https://mdn.io/spread_operator).
 *
 * @static
 * @memberOf _
 * @since 3.2.0
 * @category Function
 * @param {Function} func The function to spread arguments over.
 * @param {number} [start=0] The start position of the spread.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.spread(function(who, what) {
 *   return who + ' says ' + what;
 * });
 *
 * say(['fred', 'hello']);
 * // => 'fred says hello'
 *
 * var numbers = Promise.all([
 *   Promise.resolve(40),
 *   Promise.resolve(36)
 * ]);
 *
 * numbers.then(_.spread(function(x, y) {
 *   return x + y;
 * }));
 * // => a Promise of 76
 */
function spread(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = start == null ? 0 : nativeMax(toInteger(start), 0);
  return baseRest(function (args) {
    var array = args[start],
        otherArgs = castSlice(args, 0, start);

    if (array) {
      arrayPush(otherArgs, array);
    }
    return apply(func, this, otherArgs);
  });
}

module.exports = spread;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NwcmVhZC5qcyJdLCJuYW1lcyI6WyJhcHBseSIsInJlcXVpcmUiLCJhcnJheVB1c2giLCJiYXNlUmVzdCIsImNhc3RTbGljZSIsInRvSW50ZWdlciIsIkZVTkNfRVJST1JfVEVYVCIsIm5hdGl2ZU1heCIsIk1hdGgiLCJtYXgiLCJzcHJlYWQiLCJmdW5jIiwic3RhcnQiLCJUeXBlRXJyb3IiLCJhcmdzIiwiYXJyYXkiLCJvdGhlckFyZ3MiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFFBQVFDLFFBQVEsVUFBUixDQUFaO0FBQUEsSUFDSUMsWUFBWUQsUUFBUSxjQUFSLENBRGhCO0FBQUEsSUFFSUUsV0FBV0YsUUFBUSxhQUFSLENBRmY7QUFBQSxJQUdJRyxZQUFZSCxRQUFRLGNBQVIsQ0FIaEI7QUFBQSxJQUlJSSxZQUFZSixRQUFRLGFBQVIsQ0FKaEI7O0FBTUE7QUFDQSxJQUFJSyxrQkFBa0IscUJBQXRCOztBQUVBO0FBQ0EsSUFBSUMsWUFBWUMsS0FBS0MsR0FBckI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQ0EsU0FBU0MsTUFBVCxDQUFnQkMsSUFBaEIsRUFBc0JDLEtBQXRCLEVBQTZCO0FBQzNCLE1BQUksT0FBT0QsSUFBUCxJQUFlLFVBQW5CLEVBQStCO0FBQzdCLFVBQU0sSUFBSUUsU0FBSixDQUFjUCxlQUFkLENBQU47QUFDRDtBQUNETSxVQUFRQSxTQUFTLElBQVQsR0FBZ0IsQ0FBaEIsR0FBb0JMLFVBQVVGLFVBQVVPLEtBQVYsQ0FBVixFQUE0QixDQUE1QixDQUE1QjtBQUNBLFNBQU9ULFNBQVMsVUFBU1csSUFBVCxFQUFlO0FBQzdCLFFBQUlDLFFBQVFELEtBQUtGLEtBQUwsQ0FBWjtBQUFBLFFBQ0lJLFlBQVlaLFVBQVVVLElBQVYsRUFBZ0IsQ0FBaEIsRUFBbUJGLEtBQW5CLENBRGhCOztBQUdBLFFBQUlHLEtBQUosRUFBVztBQUNUYixnQkFBVWMsU0FBVixFQUFxQkQsS0FBckI7QUFDRDtBQUNELFdBQU9mLE1BQU1XLElBQU4sRUFBWSxJQUFaLEVBQWtCSyxTQUFsQixDQUFQO0FBQ0QsR0FSTSxDQUFQO0FBU0Q7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUJSLE1BQWpCIiwiZmlsZSI6InNwcmVhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHBseSA9IHJlcXVpcmUoJy4vX2FwcGx5JyksXG4gICAgYXJyYXlQdXNoID0gcmVxdWlyZSgnLi9fYXJyYXlQdXNoJyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpLFxuICAgIGNhc3RTbGljZSA9IHJlcXVpcmUoJy4vX2Nhc3RTbGljZScpLFxuICAgIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vdG9JbnRlZ2VyJyk7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGVcbiAqIGNyZWF0ZSBmdW5jdGlvbiBhbmQgYW4gYXJyYXkgb2YgYXJndW1lbnRzIG11Y2ggbGlrZVxuICogW2BGdW5jdGlvbiNhcHBseWBdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1mdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkpLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvbiB0aGVcbiAqIFtzcHJlYWQgb3BlcmF0b3JdKGh0dHBzOi8vbWRuLmlvL3NwcmVhZF9vcGVyYXRvcikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjIuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBzcHJlYWQgYXJndW1lbnRzIG92ZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgc3ByZWFkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBzYXkgPSBfLnNwcmVhZChmdW5jdGlvbih3aG8sIHdoYXQpIHtcbiAqICAgcmV0dXJuIHdobyArICcgc2F5cyAnICsgd2hhdDtcbiAqIH0pO1xuICpcbiAqIHNheShbJ2ZyZWQnLCAnaGVsbG8nXSk7XG4gKiAvLyA9PiAnZnJlZCBzYXlzIGhlbGxvJ1xuICpcbiAqIHZhciBudW1iZXJzID0gUHJvbWlzZS5hbGwoW1xuICogICBQcm9taXNlLnJlc29sdmUoNDApLFxuICogICBQcm9taXNlLnJlc29sdmUoMzYpXG4gKiBdKTtcbiAqXG4gKiBudW1iZXJzLnRoZW4oXy5zcHJlYWQoZnVuY3Rpb24oeCwgeSkge1xuICogICByZXR1cm4geCArIHk7XG4gKiB9KSk7XG4gKiAvLyA9PiBhIFByb21pc2Ugb2YgNzZcbiAqL1xuZnVuY3Rpb24gc3ByZWFkKGZ1bmMsIHN0YXJ0KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHN0YXJ0ID0gc3RhcnQgPT0gbnVsbCA/IDAgOiBuYXRpdmVNYXgodG9JbnRlZ2VyKHN0YXJ0KSwgMCk7XG4gIHJldHVybiBiYXNlUmVzdChmdW5jdGlvbihhcmdzKSB7XG4gICAgdmFyIGFycmF5ID0gYXJnc1tzdGFydF0sXG4gICAgICAgIG90aGVyQXJncyA9IGNhc3RTbGljZShhcmdzLCAwLCBzdGFydCk7XG5cbiAgICBpZiAoYXJyYXkpIHtcbiAgICAgIGFycmF5UHVzaChvdGhlckFyZ3MsIGFycmF5KTtcbiAgICB9XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNwcmVhZDtcbiJdfQ==