'use strict';

var baseFill = require('./_baseFill'),
    isIterateeCall = require('./_isIterateeCall');

/**
 * Fills elements of `array` with `value` from `start` up to, but not
 * including, `end`.
 *
 * **Note:** This method mutates `array`.
 *
 * @static
 * @memberOf _
 * @since 3.2.0
 * @category Array
 * @param {Array} array The array to fill.
 * @param {*} value The value to fill `array` with.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [1, 2, 3];
 *
 * _.fill(array, 'a');
 * console.log(array);
 * // => ['a', 'a', 'a']
 *
 * _.fill(Array(3), 2);
 * // => [2, 2, 2]
 *
 * _.fill([4, 6, 8, 10], '*', 1, 3);
 * // => [4, '*', '*', 10]
 */
function fill(array, value, start, end) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
    start = 0;
    end = length;
  }
  return baseFill(array, value, start, end);
}

module.exports = fill;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZpbGwuanMiXSwibmFtZXMiOlsiYmFzZUZpbGwiLCJyZXF1aXJlIiwiaXNJdGVyYXRlZUNhbGwiLCJmaWxsIiwiYXJyYXkiLCJ2YWx1ZSIsInN0YXJ0IiwiZW5kIiwibGVuZ3RoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxXQUFXQyxRQUFRLGFBQVIsQ0FBZjtBQUFBLElBQ0lDLGlCQUFpQkQsUUFBUSxtQkFBUixDQURyQjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QkEsU0FBU0UsSUFBVCxDQUFjQyxLQUFkLEVBQXFCQyxLQUFyQixFQUE0QkMsS0FBNUIsRUFBbUNDLEdBQW5DLEVBQXdDO0FBQ3RDLE1BQUlDLFNBQVNKLFNBQVMsSUFBVCxHQUFnQixDQUFoQixHQUFvQkEsTUFBTUksTUFBdkM7QUFDQSxNQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYLFdBQU8sRUFBUDtBQUNEO0FBQ0QsTUFBSUYsU0FBUyxPQUFPQSxLQUFQLElBQWdCLFFBQXpCLElBQXFDSixlQUFlRSxLQUFmLEVBQXNCQyxLQUF0QixFQUE2QkMsS0FBN0IsQ0FBekMsRUFBOEU7QUFDNUVBLFlBQVEsQ0FBUjtBQUNBQyxVQUFNQyxNQUFOO0FBQ0Q7QUFDRCxTQUFPUixTQUFTSSxLQUFULEVBQWdCQyxLQUFoQixFQUF1QkMsS0FBdkIsRUFBOEJDLEdBQTlCLENBQVA7QUFDRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQlAsSUFBakIiLCJmaWxlIjoiZmlsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlRmlsbCA9IHJlcXVpcmUoJy4vX2Jhc2VGaWxsJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL19pc0l0ZXJhdGVlQ2FsbCcpO1xuXG4vKipcbiAqIEZpbGxzIGVsZW1lbnRzIG9mIGBhcnJheWAgd2l0aCBgdmFsdWVgIGZyb20gYHN0YXJ0YCB1cCB0bywgYnV0IG5vdFxuICogaW5jbHVkaW5nLCBgZW5kYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgYXJyYXlgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4yLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZpbGwuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBmaWxsIGBhcnJheWAgd2l0aC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9MF0gVGhlIHN0YXJ0IHBvc2l0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtlbmQ9YXJyYXkubGVuZ3RoXSBUaGUgZW5kIHBvc2l0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheSA9IFsxLCAyLCAzXTtcbiAqXG4gKiBfLmZpbGwoYXJyYXksICdhJyk7XG4gKiBjb25zb2xlLmxvZyhhcnJheSk7XG4gKiAvLyA9PiBbJ2EnLCAnYScsICdhJ11cbiAqXG4gKiBfLmZpbGwoQXJyYXkoMyksIDIpO1xuICogLy8gPT4gWzIsIDIsIDJdXG4gKlxuICogXy5maWxsKFs0LCA2LCA4LCAxMF0sICcqJywgMSwgMyk7XG4gKiAvLyA9PiBbNCwgJyonLCAnKicsIDEwXVxuICovXG5mdW5jdGlvbiBmaWxsKGFycmF5LCB2YWx1ZSwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmIChzdGFydCAmJiB0eXBlb2Ygc3RhcnQgIT0gJ251bWJlcicgJiYgaXNJdGVyYXRlZUNhbGwoYXJyYXksIHZhbHVlLCBzdGFydCkpIHtcbiAgICBzdGFydCA9IDA7XG4gICAgZW5kID0gbGVuZ3RoO1xuICB9XG4gIHJldHVybiBiYXNlRmlsbChhcnJheSwgdmFsdWUsIHN0YXJ0LCBlbmQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbGw7XG4iXX0=