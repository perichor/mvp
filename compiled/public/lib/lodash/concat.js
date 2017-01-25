'use strict';

var arrayPush = require('./_arrayPush'),
    baseFlatten = require('./_baseFlatten'),
    copyArray = require('./_copyArray'),
    isArray = require('./isArray');

/**
 * Creates a new array concatenating `array` with any additional arrays
 * and/or values.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to concatenate.
 * @param {...*} [values] The values to concatenate.
 * @returns {Array} Returns the new concatenated array.
 * @example
 *
 * var array = [1];
 * var other = _.concat(array, 2, [3], [[4]]);
 *
 * console.log(other);
 * // => [1, 2, 3, [4]]
 *
 * console.log(array);
 * // => [1]
 */
function concat() {
  var length = arguments.length;
  if (!length) {
    return [];
  }
  var args = Array(length - 1),
      array = arguments[0],
      index = length;

  while (index--) {
    args[index - 1] = arguments[index];
  }
  return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
}

module.exports = concat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2NvbmNhdC5qcyJdLCJuYW1lcyI6WyJhcnJheVB1c2giLCJyZXF1aXJlIiwiYmFzZUZsYXR0ZW4iLCJjb3B5QXJyYXkiLCJpc0FycmF5IiwiY29uY2F0IiwibGVuZ3RoIiwiYXJndW1lbnRzIiwiYXJncyIsIkFycmF5IiwiYXJyYXkiLCJpbmRleCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsWUFBWUMsUUFBUSxjQUFSLENBQWhCO0FBQUEsSUFDSUMsY0FBY0QsUUFBUSxnQkFBUixDQURsQjtBQUFBLElBRUlFLFlBQVlGLFFBQVEsY0FBUixDQUZoQjtBQUFBLElBR0lHLFVBQVVILFFBQVEsV0FBUixDQUhkOztBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLFNBQVNJLE1BQVQsR0FBa0I7QUFDaEIsTUFBSUMsU0FBU0MsVUFBVUQsTUFBdkI7QUFDQSxNQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYLFdBQU8sRUFBUDtBQUNEO0FBQ0QsTUFBSUUsT0FBT0MsTUFBTUgsU0FBUyxDQUFmLENBQVg7QUFBQSxNQUNJSSxRQUFRSCxVQUFVLENBQVYsQ0FEWjtBQUFBLE1BRUlJLFFBQVFMLE1BRlo7O0FBSUEsU0FBT0ssT0FBUCxFQUFnQjtBQUNkSCxTQUFLRyxRQUFRLENBQWIsSUFBa0JKLFVBQVVJLEtBQVYsQ0FBbEI7QUFDRDtBQUNELFNBQU9YLFVBQVVJLFFBQVFNLEtBQVIsSUFBaUJQLFVBQVVPLEtBQVYsQ0FBakIsR0FBb0MsQ0FBQ0EsS0FBRCxDQUE5QyxFQUF1RFIsWUFBWU0sSUFBWixFQUFrQixDQUFsQixDQUF2RCxDQUFQO0FBQ0Q7O0FBRURJLE9BQU9DLE9BQVAsR0FBaUJSLE1BQWpCIiwiZmlsZSI6ImNvbmNhdC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcnJheVB1c2ggPSByZXF1aXJlKCcuL19hcnJheVB1c2gnKSxcbiAgICBiYXNlRmxhdHRlbiA9IHJlcXVpcmUoJy4vX2Jhc2VGbGF0dGVuJyksXG4gICAgY29weUFycmF5ID0gcmVxdWlyZSgnLi9fY29weUFycmF5JyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYXJyYXkgY29uY2F0ZW5hdGluZyBgYXJyYXlgIHdpdGggYW55IGFkZGl0aW9uYWwgYXJyYXlzXG4gKiBhbmQvb3IgdmFsdWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbmNhdGVuYXRlLlxuICogQHBhcmFtIHsuLi4qfSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNvbmNhdGVuYXRlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgY29uY2F0ZW5hdGVkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXkgPSBbMV07XG4gKiB2YXIgb3RoZXIgPSBfLmNvbmNhdChhcnJheSwgMiwgWzNdLCBbWzRdXSk7XG4gKlxuICogY29uc29sZS5sb2cob3RoZXIpO1xuICogLy8gPT4gWzEsIDIsIDMsIFs0XV1cbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheSk7XG4gKiAvLyA9PiBbMV1cbiAqL1xuZnVuY3Rpb24gY29uY2F0KCkge1xuICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgdmFyIGFyZ3MgPSBBcnJheShsZW5ndGggLSAxKSxcbiAgICAgIGFycmF5ID0gYXJndW1lbnRzWzBdLFxuICAgICAgaW5kZXggPSBsZW5ndGg7XG5cbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICBhcmdzW2luZGV4IC0gMV0gPSBhcmd1bWVudHNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheVB1c2goaXNBcnJheShhcnJheSkgPyBjb3B5QXJyYXkoYXJyYXkpIDogW2FycmF5XSwgYmFzZUZsYXR0ZW4oYXJncywgMSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmNhdDtcbiJdfQ==