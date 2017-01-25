'use strict';

var baseDifference = require('./_baseDifference'),
    baseFlatten = require('./_baseFlatten'),
    baseRest = require('./_baseRest'),
    isArrayLikeObject = require('./isArrayLikeObject'),
    last = require('./last');

/**
 * This method is like `_.difference` except that it accepts `comparator`
 * which is invoked to compare elements of `array` to `values`. The order and
 * references of result values are determined by the first array. The comparator
 * is invoked with two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 *
 * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
 * // => [{ 'x': 2, 'y': 1 }]
 */
var differenceWith = baseRest(function (array, values) {
  var comparator = last(values);
  if (isArrayLikeObject(comparator)) {
    comparator = undefined;
  }
  return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator) : [];
});

module.exports = differenceWith;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2RpZmZlcmVuY2VXaXRoLmpzIl0sIm5hbWVzIjpbImJhc2VEaWZmZXJlbmNlIiwicmVxdWlyZSIsImJhc2VGbGF0dGVuIiwiYmFzZVJlc3QiLCJpc0FycmF5TGlrZU9iamVjdCIsImxhc3QiLCJkaWZmZXJlbmNlV2l0aCIsImFycmF5IiwidmFsdWVzIiwiY29tcGFyYXRvciIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsaUJBQWlCQyxRQUFRLG1CQUFSLENBQXJCO0FBQUEsSUFDSUMsY0FBY0QsUUFBUSxnQkFBUixDQURsQjtBQUFBLElBRUlFLFdBQVdGLFFBQVEsYUFBUixDQUZmO0FBQUEsSUFHSUcsb0JBQW9CSCxRQUFRLHFCQUFSLENBSHhCO0FBQUEsSUFJSUksT0FBT0osUUFBUSxRQUFSLENBSlg7O0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLElBQUlLLGlCQUFpQkgsU0FBUyxVQUFTSSxLQUFULEVBQWdCQyxNQUFoQixFQUF3QjtBQUNwRCxNQUFJQyxhQUFhSixLQUFLRyxNQUFMLENBQWpCO0FBQ0EsTUFBSUosa0JBQWtCSyxVQUFsQixDQUFKLEVBQW1DO0FBQ2pDQSxpQkFBYUMsU0FBYjtBQUNEO0FBQ0QsU0FBT04sa0JBQWtCRyxLQUFsQixJQUNIUCxlQUFlTyxLQUFmLEVBQXNCTCxZQUFZTSxNQUFaLEVBQW9CLENBQXBCLEVBQXVCSixpQkFBdkIsRUFBMEMsSUFBMUMsQ0FBdEIsRUFBdUVNLFNBQXZFLEVBQWtGRCxVQUFsRixDQURHLEdBRUgsRUFGSjtBQUdELENBUm9CLENBQXJCOztBQVVBRSxPQUFPQyxPQUFQLEdBQWlCTixjQUFqQiIsImZpbGUiOiJkaWZmZXJlbmNlV2l0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlRGlmZmVyZW5jZSA9IHJlcXVpcmUoJy4vX2Jhc2VEaWZmZXJlbmNlJyksXG4gICAgYmFzZUZsYXR0ZW4gPSByZXF1aXJlKCcuL19iYXNlRmxhdHRlbicpLFxuICAgIGJhc2VSZXN0ID0gcmVxdWlyZSgnLi9fYmFzZVJlc3QnKSxcbiAgICBpc0FycmF5TGlrZU9iamVjdCA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2VPYmplY3QnKSxcbiAgICBsYXN0ID0gcmVxdWlyZSgnLi9sYXN0Jyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5kaWZmZXJlbmNlYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGBjb21wYXJhdG9yYFxuICogd2hpY2ggaXMgaW52b2tlZCB0byBjb21wYXJlIGVsZW1lbnRzIG9mIGBhcnJheWAgdG8gYHZhbHVlc2AuIFRoZSBvcmRlciBhbmRcbiAqIHJlZmVyZW5jZXMgb2YgcmVzdWx0IHZhbHVlcyBhcmUgZGV0ZXJtaW5lZCBieSB0aGUgZmlyc3QgYXJyYXkuIFRoZSBjb21wYXJhdG9yXG4gKiBpcyBpbnZva2VkIHdpdGggdHdvIGFyZ3VtZW50czogKGFyclZhbCwgb3RoVmFsKS5cbiAqXG4gKiAqKk5vdGU6KiogVW5saWtlIGBfLnB1bGxBbGxXaXRoYCwgdGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsuLi5BcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBleGNsdWRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmF0b3JdIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiBmaWx0ZXJlZCB2YWx1ZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gW3sgJ3gnOiAxLCAneSc6IDIgfSwgeyAneCc6IDIsICd5JzogMSB9XTtcbiAqXG4gKiBfLmRpZmZlcmVuY2VXaXRoKG9iamVjdHMsIFt7ICd4JzogMSwgJ3knOiAyIH1dLCBfLmlzRXF1YWwpO1xuICogLy8gPT4gW3sgJ3gnOiAyLCAneSc6IDEgfV1cbiAqL1xudmFyIGRpZmZlcmVuY2VXaXRoID0gYmFzZVJlc3QoZnVuY3Rpb24oYXJyYXksIHZhbHVlcykge1xuICB2YXIgY29tcGFyYXRvciA9IGxhc3QodmFsdWVzKTtcbiAgaWYgKGlzQXJyYXlMaWtlT2JqZWN0KGNvbXBhcmF0b3IpKSB7XG4gICAgY29tcGFyYXRvciA9IHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QoYXJyYXkpXG4gICAgPyBiYXNlRGlmZmVyZW5jZShhcnJheSwgYmFzZUZsYXR0ZW4odmFsdWVzLCAxLCBpc0FycmF5TGlrZU9iamVjdCwgdHJ1ZSksIHVuZGVmaW5lZCwgY29tcGFyYXRvcilcbiAgICA6IFtdO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZVdpdGg7XG4iXX0=