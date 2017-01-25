'use strict';

var arrayFilter = require('./_arrayFilter'),
    baseIteratee = require('./_baseIteratee'),
    baseRest = require('./_baseRest'),
    baseXor = require('./_baseXor'),
    isArrayLikeObject = require('./isArrayLikeObject'),
    last = require('./last');

/**
 * This method is like `_.xor` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by
 * which by which they're compared. The order of result values is determined
 * by the order they occur in the arrays. The iteratee is invoked with one
 * argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
 * // => [1.2, 3.4]
 *
 * // The `_.property` iteratee shorthand.
 * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 2 }]
 */
var xorBy = baseRest(function (arrays) {
  var iteratee = last(arrays);
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined;
  }
  return baseXor(arrayFilter(arrays, isArrayLikeObject), baseIteratee(iteratee, 2));
});

module.exports = xorBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3hvckJ5LmpzIl0sIm5hbWVzIjpbImFycmF5RmlsdGVyIiwicmVxdWlyZSIsImJhc2VJdGVyYXRlZSIsImJhc2VSZXN0IiwiYmFzZVhvciIsImlzQXJyYXlMaWtlT2JqZWN0IiwibGFzdCIsInhvckJ5IiwiYXJyYXlzIiwiaXRlcmF0ZWUiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGNBQWNDLFFBQVEsZ0JBQVIsQ0FBbEI7QUFBQSxJQUNJQyxlQUFlRCxRQUFRLGlCQUFSLENBRG5CO0FBQUEsSUFFSUUsV0FBV0YsUUFBUSxhQUFSLENBRmY7QUFBQSxJQUdJRyxVQUFVSCxRQUFRLFlBQVIsQ0FIZDtBQUFBLElBSUlJLG9CQUFvQkosUUFBUSxxQkFBUixDQUp4QjtBQUFBLElBS0lLLE9BQU9MLFFBQVEsUUFBUixDQUxYOztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxJQUFJTSxRQUFRSixTQUFTLFVBQVNLLE1BQVQsRUFBaUI7QUFDcEMsTUFBSUMsV0FBV0gsS0FBS0UsTUFBTCxDQUFmO0FBQ0EsTUFBSUgsa0JBQWtCSSxRQUFsQixDQUFKLEVBQWlDO0FBQy9CQSxlQUFXQyxTQUFYO0FBQ0Q7QUFDRCxTQUFPTixRQUFRSixZQUFZUSxNQUFaLEVBQW9CSCxpQkFBcEIsQ0FBUixFQUFnREgsYUFBYU8sUUFBYixFQUF1QixDQUF2QixDQUFoRCxDQUFQO0FBQ0QsQ0FOVyxDQUFaOztBQVFBRSxPQUFPQyxPQUFQLEdBQWlCTCxLQUFqQiIsImZpbGUiOiJ4b3JCeS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcnJheUZpbHRlciA9IHJlcXVpcmUoJy4vX2FycmF5RmlsdGVyJyksXG4gICAgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpLFxuICAgIGJhc2VYb3IgPSByZXF1aXJlKCcuL19iYXNlWG9yJyksXG4gICAgaXNBcnJheUxpa2VPYmplY3QgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlT2JqZWN0JyksXG4gICAgbGFzdCA9IHJlcXVpcmUoJy4vbGFzdCcpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8ueG9yYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGBpdGVyYXRlZWAgd2hpY2ggaXNcbiAqIGludm9rZWQgZm9yIGVhY2ggZWxlbWVudCBvZiBlYWNoIGBhcnJheXNgIHRvIGdlbmVyYXRlIHRoZSBjcml0ZXJpb24gYnlcbiAqIHdoaWNoIGJ5IHdoaWNoIHRoZXkncmUgY29tcGFyZWQuIFRoZSBvcmRlciBvZiByZXN1bHQgdmFsdWVzIGlzIGRldGVybWluZWRcbiAqIGJ5IHRoZSBvcmRlciB0aGV5IG9jY3VyIGluIHRoZSBhcnJheXMuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggb25lXG4gKiBhcmd1bWVudDogKHZhbHVlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7Li4uQXJyYXl9IFthcnJheXNdIFRoZSBhcnJheXMgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGZpbHRlcmVkIHZhbHVlcy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy54b3JCeShbMi4xLCAxLjJdLCBbMi4zLCAzLjRdLCBNYXRoLmZsb29yKTtcbiAqIC8vID0+IFsxLjIsIDMuNF1cbiAqXG4gKiAvLyBUaGUgYF8ucHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8ueG9yQnkoW3sgJ3gnOiAxIH1dLCBbeyAneCc6IDIgfSwgeyAneCc6IDEgfV0sICd4Jyk7XG4gKiAvLyA9PiBbeyAneCc6IDIgfV1cbiAqL1xudmFyIHhvckJ5ID0gYmFzZVJlc3QoZnVuY3Rpb24oYXJyYXlzKSB7XG4gIHZhciBpdGVyYXRlZSA9IGxhc3QoYXJyYXlzKTtcbiAgaWYgKGlzQXJyYXlMaWtlT2JqZWN0KGl0ZXJhdGVlKSkge1xuICAgIGl0ZXJhdGVlID0gdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBiYXNlWG9yKGFycmF5RmlsdGVyKGFycmF5cywgaXNBcnJheUxpa2VPYmplY3QpLCBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUsIDIpKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHhvckJ5O1xuIl19