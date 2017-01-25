'use strict';

var baseDifference = require('./_baseDifference'),
    baseFlatten = require('./_baseFlatten'),
    baseRest = require('./_baseRest'),
    isArrayLikeObject = require('./isArrayLikeObject');

/**
 * Creates an array of `array` values not included in the other given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * **Note:** Unlike `_.pullAll`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.without, _.xor
 * @example
 *
 * _.difference([2, 1], [2, 3]);
 * // => [1]
 */
var difference = baseRest(function (array, values) {
    return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : [];
});

module.exports = difference;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2RpZmZlcmVuY2UuanMiXSwibmFtZXMiOlsiYmFzZURpZmZlcmVuY2UiLCJyZXF1aXJlIiwiYmFzZUZsYXR0ZW4iLCJiYXNlUmVzdCIsImlzQXJyYXlMaWtlT2JqZWN0IiwiZGlmZmVyZW5jZSIsImFycmF5IiwidmFsdWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxpQkFBaUJDLFFBQVEsbUJBQVIsQ0FBckI7QUFBQSxJQUNJQyxjQUFjRCxRQUFRLGdCQUFSLENBRGxCO0FBQUEsSUFFSUUsV0FBV0YsUUFBUSxhQUFSLENBRmY7QUFBQSxJQUdJRyxvQkFBb0JILFFBQVEscUJBQVIsQ0FIeEI7O0FBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxJQUFJSSxhQUFhRixTQUFTLFVBQVNHLEtBQVQsRUFBZ0JDLE1BQWhCLEVBQXdCO0FBQ2hELFdBQU9ILGtCQUFrQkUsS0FBbEIsSUFDSE4sZUFBZU0sS0FBZixFQUFzQkosWUFBWUssTUFBWixFQUFvQixDQUFwQixFQUF1QkgsaUJBQXZCLEVBQTBDLElBQTFDLENBQXRCLENBREcsR0FFSCxFQUZKO0FBR0QsQ0FKZ0IsQ0FBakI7O0FBTUFJLE9BQU9DLE9BQVAsR0FBaUJKLFVBQWpCIiwiZmlsZSI6ImRpZmZlcmVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZURpZmZlcmVuY2UgPSByZXF1aXJlKCcuL19iYXNlRGlmZmVyZW5jZScpLFxuICAgIGJhc2VGbGF0dGVuID0gcmVxdWlyZSgnLi9fYmFzZUZsYXR0ZW4nKSxcbiAgICBiYXNlUmVzdCA9IHJlcXVpcmUoJy4vX2Jhc2VSZXN0JyksXG4gICAgaXNBcnJheUxpa2VPYmplY3QgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlT2JqZWN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBgYXJyYXlgIHZhbHVlcyBub3QgaW5jbHVkZWQgaW4gdGhlIG90aGVyIGdpdmVuIGFycmF5c1xuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy4gVGhlIG9yZGVyIGFuZCByZWZlcmVuY2VzIG9mIHJlc3VsdCB2YWx1ZXMgYXJlXG4gKiBkZXRlcm1pbmVkIGJ5IHRoZSBmaXJzdCBhcnJheS5cbiAqXG4gKiAqKk5vdGU6KiogVW5saWtlIGBfLnB1bGxBbGxgLCB0aGlzIG1ldGhvZCByZXR1cm5zIGEgbmV3IGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0gey4uLkFycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGV4Y2x1ZGUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiBmaWx0ZXJlZCB2YWx1ZXMuXG4gKiBAc2VlIF8ud2l0aG91dCwgXy54b3JcbiAqIEBleGFtcGxlXG4gKlxuICogXy5kaWZmZXJlbmNlKFsyLCAxXSwgWzIsIDNdKTtcbiAqIC8vID0+IFsxXVxuICovXG52YXIgZGlmZmVyZW5jZSA9IGJhc2VSZXN0KGZ1bmN0aW9uKGFycmF5LCB2YWx1ZXMpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KGFycmF5KVxuICAgID8gYmFzZURpZmZlcmVuY2UoYXJyYXksIGJhc2VGbGF0dGVuKHZhbHVlcywgMSwgaXNBcnJheUxpa2VPYmplY3QsIHRydWUpKVxuICAgIDogW107XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlO1xuIl19