'use strict';

var baseIteratee = require('./_baseIteratee'),
    basePullAt = require('./_basePullAt');

/**
 * Removes all elements from `array` that `predicate` returns truthy for
 * and returns an array of the removed elements. The predicate is invoked
 * with three arguments: (value, index, array).
 *
 * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
 * to pull elements from an array by value.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = [1, 2, 3, 4];
 * var evens = _.remove(array, function(n) {
 *   return n % 2 == 0;
 * });
 *
 * console.log(array);
 * // => [1, 3]
 *
 * console.log(evens);
 * // => [2, 4]
 */
function remove(array, predicate) {
  var result = [];
  if (!(array && array.length)) {
    return result;
  }
  var index = -1,
      indexes = [],
      length = array.length;

  predicate = baseIteratee(predicate, 3);
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result.push(value);
      indexes.push(index);
    }
  }
  basePullAt(array, indexes);
  return result;
}

module.exports = remove;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3JlbW92ZS5qcyJdLCJuYW1lcyI6WyJiYXNlSXRlcmF0ZWUiLCJyZXF1aXJlIiwiYmFzZVB1bGxBdCIsInJlbW92ZSIsImFycmF5IiwicHJlZGljYXRlIiwicmVzdWx0IiwibGVuZ3RoIiwiaW5kZXgiLCJpbmRleGVzIiwidmFsdWUiLCJwdXNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5CO0FBQUEsSUFDSUMsYUFBYUQsUUFBUSxlQUFSLENBRGpCOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLFNBQVNFLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQXVCQyxTQUF2QixFQUFrQztBQUNoQyxNQUFJQyxTQUFTLEVBQWI7QUFDQSxNQUFJLEVBQUVGLFNBQVNBLE1BQU1HLE1BQWpCLENBQUosRUFBOEI7QUFDNUIsV0FBT0QsTUFBUDtBQUNEO0FBQ0QsTUFBSUUsUUFBUSxDQUFDLENBQWI7QUFBQSxNQUNJQyxVQUFVLEVBRGQ7QUFBQSxNQUVJRixTQUFTSCxNQUFNRyxNQUZuQjs7QUFJQUYsY0FBWUwsYUFBYUssU0FBYixFQUF3QixDQUF4QixDQUFaO0FBQ0EsU0FBTyxFQUFFRyxLQUFGLEdBQVVELE1BQWpCLEVBQXlCO0FBQ3ZCLFFBQUlHLFFBQVFOLE1BQU1JLEtBQU4sQ0FBWjtBQUNBLFFBQUlILFVBQVVLLEtBQVYsRUFBaUJGLEtBQWpCLEVBQXdCSixLQUF4QixDQUFKLEVBQW9DO0FBQ2xDRSxhQUFPSyxJQUFQLENBQVlELEtBQVo7QUFDQUQsY0FBUUUsSUFBUixDQUFhSCxLQUFiO0FBQ0Q7QUFDRjtBQUNETixhQUFXRSxLQUFYLEVBQWtCSyxPQUFsQjtBQUNBLFNBQU9ILE1BQVA7QUFDRDs7QUFFRE0sT0FBT0MsT0FBUCxHQUFpQlYsTUFBakIiLCJmaWxlIjoicmVtb3ZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VJdGVyYXRlZSA9IHJlcXVpcmUoJy4vX2Jhc2VJdGVyYXRlZScpLFxuICAgIGJhc2VQdWxsQXQgPSByZXF1aXJlKCcuL19iYXNlUHVsbEF0Jyk7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwgZWxlbWVudHMgZnJvbSBgYXJyYXlgIHRoYXQgYHByZWRpY2F0ZWAgcmV0dXJucyB0cnV0aHkgZm9yXG4gKiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiB0aGUgcmVtb3ZlZCBlbGVtZW50cy4gVGhlIHByZWRpY2F0ZSBpcyBpbnZva2VkXG4gKiB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleCwgYXJyYXkpLlxuICpcbiAqICoqTm90ZToqKiBVbmxpa2UgYF8uZmlsdGVyYCwgdGhpcyBtZXRob2QgbXV0YXRlcyBgYXJyYXlgLiBVc2UgYF8ucHVsbGBcbiAqIHRvIHB1bGwgZWxlbWVudHMgZnJvbSBhbiBhcnJheSBieSB2YWx1ZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiByZW1vdmVkIGVsZW1lbnRzLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXkgPSBbMSwgMiwgMywgNF07XG4gKiB2YXIgZXZlbnMgPSBfLnJlbW92ZShhcnJheSwgZnVuY3Rpb24obikge1xuICogICByZXR1cm4gbiAlIDIgPT0gMDtcbiAqIH0pO1xuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5KTtcbiAqIC8vID0+IFsxLCAzXVxuICpcbiAqIGNvbnNvbGUubG9nKGV2ZW5zKTtcbiAqIC8vID0+IFsyLCA0XVxuICovXG5mdW5jdGlvbiByZW1vdmUoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmICghKGFycmF5ICYmIGFycmF5Lmxlbmd0aCkpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5kZXhlcyA9IFtdLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHByZWRpY2F0ZSA9IGJhc2VJdGVyYXRlZShwcmVkaWNhdGUsIDMpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICBpbmRleGVzLnB1c2goaW5kZXgpO1xuICAgIH1cbiAgfVxuICBiYXNlUHVsbEF0KGFycmF5LCBpbmRleGVzKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZW1vdmU7XG4iXX0=