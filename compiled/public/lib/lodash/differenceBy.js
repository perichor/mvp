'use strict';

var baseDifference = require('./_baseDifference'),
    baseFlatten = require('./_baseFlatten'),
    baseIteratee = require('./_baseIteratee'),
    baseRest = require('./_baseRest'),
    isArrayLikeObject = require('./isArrayLikeObject'),
    last = require('./last');

/**
 * This method is like `_.difference` except that it accepts `iteratee` which
 * is invoked for each element of `array` and `values` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
 * // => [1.2]
 *
 * // The `_.property` iteratee shorthand.
 * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
 * // => [{ 'x': 2 }]
 */
var differenceBy = baseRest(function (array, values) {
  var iteratee = last(values);
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined;
  }
  return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), baseIteratee(iteratee, 2)) : [];
});

module.exports = differenceBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2RpZmZlcmVuY2VCeS5qcyJdLCJuYW1lcyI6WyJiYXNlRGlmZmVyZW5jZSIsInJlcXVpcmUiLCJiYXNlRmxhdHRlbiIsImJhc2VJdGVyYXRlZSIsImJhc2VSZXN0IiwiaXNBcnJheUxpa2VPYmplY3QiLCJsYXN0IiwiZGlmZmVyZW5jZUJ5IiwiYXJyYXkiLCJ2YWx1ZXMiLCJpdGVyYXRlZSIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsaUJBQWlCQyxRQUFRLG1CQUFSLENBQXJCO0FBQUEsSUFDSUMsY0FBY0QsUUFBUSxnQkFBUixDQURsQjtBQUFBLElBRUlFLGVBQWVGLFFBQVEsaUJBQVIsQ0FGbkI7QUFBQSxJQUdJRyxXQUFXSCxRQUFRLGFBQVIsQ0FIZjtBQUFBLElBSUlJLG9CQUFvQkosUUFBUSxxQkFBUixDQUp4QjtBQUFBLElBS0lLLE9BQU9MLFFBQVEsUUFBUixDQUxYOztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJTSxlQUFlSCxTQUFTLFVBQVNJLEtBQVQsRUFBZ0JDLE1BQWhCLEVBQXdCO0FBQ2xELE1BQUlDLFdBQVdKLEtBQUtHLE1BQUwsQ0FBZjtBQUNBLE1BQUlKLGtCQUFrQkssUUFBbEIsQ0FBSixFQUFpQztBQUMvQkEsZUFBV0MsU0FBWDtBQUNEO0FBQ0QsU0FBT04sa0JBQWtCRyxLQUFsQixJQUNIUixlQUFlUSxLQUFmLEVBQXNCTixZQUFZTyxNQUFaLEVBQW9CLENBQXBCLEVBQXVCSixpQkFBdkIsRUFBMEMsSUFBMUMsQ0FBdEIsRUFBdUVGLGFBQWFPLFFBQWIsRUFBdUIsQ0FBdkIsQ0FBdkUsQ0FERyxHQUVILEVBRko7QUFHRCxDQVJrQixDQUFuQjs7QUFVQUUsT0FBT0MsT0FBUCxHQUFpQk4sWUFBakIiLCJmaWxlIjoiZGlmZmVyZW5jZUJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VEaWZmZXJlbmNlID0gcmVxdWlyZSgnLi9fYmFzZURpZmZlcmVuY2UnKSxcbiAgICBiYXNlRmxhdHRlbiA9IHJlcXVpcmUoJy4vX2Jhc2VGbGF0dGVuJyksXG4gICAgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpLFxuICAgIGlzQXJyYXlMaWtlT2JqZWN0ID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZU9iamVjdCcpLFxuICAgIGxhc3QgPSByZXF1aXJlKCcuL2xhc3QnKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmRpZmZlcmVuY2VgIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYGl0ZXJhdGVlYCB3aGljaFxuICogaXMgaW52b2tlZCBmb3IgZWFjaCBlbGVtZW50IG9mIGBhcnJheWAgYW5kIGB2YWx1ZXNgIHRvIGdlbmVyYXRlIHRoZSBjcml0ZXJpb25cbiAqIGJ5IHdoaWNoIHRoZXkncmUgY29tcGFyZWQuIFRoZSBvcmRlciBhbmQgcmVmZXJlbmNlcyBvZiByZXN1bHQgdmFsdWVzIGFyZVxuICogZGV0ZXJtaW5lZCBieSB0aGUgZmlyc3QgYXJyYXkuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OlxuICogKHZhbHVlKS5cbiAqXG4gKiAqKk5vdGU6KiogVW5saWtlIGBfLnB1bGxBbGxCeWAsIHRoaXMgbWV0aG9kIHJldHVybnMgYSBuZXcgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Li4uQXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gZXhjbHVkZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGZpbHRlcmVkIHZhbHVlcy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kaWZmZXJlbmNlQnkoWzIuMSwgMS4yXSwgWzIuMywgMy40XSwgTWF0aC5mbG9vcik7XG4gKiAvLyA9PiBbMS4yXVxuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5kaWZmZXJlbmNlQnkoW3sgJ3gnOiAyIH0sIHsgJ3gnOiAxIH1dLCBbeyAneCc6IDEgfV0sICd4Jyk7XG4gKiAvLyA9PiBbeyAneCc6IDIgfV1cbiAqL1xudmFyIGRpZmZlcmVuY2VCeSA9IGJhc2VSZXN0KGZ1bmN0aW9uKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGl0ZXJhdGVlID0gbGFzdCh2YWx1ZXMpO1xuICBpZiAoaXNBcnJheUxpa2VPYmplY3QoaXRlcmF0ZWUpKSB7XG4gICAgaXRlcmF0ZWUgPSB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KGFycmF5KVxuICAgID8gYmFzZURpZmZlcmVuY2UoYXJyYXksIGJhc2VGbGF0dGVuKHZhbHVlcywgMSwgaXNBcnJheUxpa2VPYmplY3QsIHRydWUpLCBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUsIDIpKVxuICAgIDogW107XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlQnk7XG4iXX0=