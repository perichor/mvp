'use strict';

var baseIteratee = require('./_baseIteratee'),
    baseMean = require('./_baseMean');

/**
 * This method is like `_.mean` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the value to be averaged.
 * The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.7.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {number} Returns the mean.
 * @example
 *
 * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
 *
 * _.meanBy(objects, function(o) { return o.n; });
 * // => 5
 *
 * // The `_.property` iteratee shorthand.
 * _.meanBy(objects, 'n');
 * // => 5
 */
function meanBy(array, iteratee) {
  return baseMean(array, baseIteratee(iteratee, 2));
}

module.exports = meanBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL21lYW5CeS5qcyJdLCJuYW1lcyI6WyJiYXNlSXRlcmF0ZWUiLCJyZXF1aXJlIiwiYmFzZU1lYW4iLCJtZWFuQnkiLCJhcnJheSIsIml0ZXJhdGVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5CO0FBQUEsSUFDSUMsV0FBV0QsUUFBUSxhQUFSLENBRGY7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLFNBQVNFLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQXVCQyxRQUF2QixFQUFpQztBQUMvQixTQUFPSCxTQUFTRSxLQUFULEVBQWdCSixhQUFhSyxRQUFiLEVBQXVCLENBQXZCLENBQWhCLENBQVA7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQkosTUFBakIiLCJmaWxlIjoibWVhbkJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VJdGVyYXRlZSA9IHJlcXVpcmUoJy4vX2Jhc2VJdGVyYXRlZScpLFxuICAgIGJhc2VNZWFuID0gcmVxdWlyZSgnLi9fYmFzZU1lYW4nKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLm1lYW5gIGV4Y2VwdCB0aGF0IGl0IGFjY2VwdHMgYGl0ZXJhdGVlYCB3aGljaCBpc1xuICogaW52b2tlZCBmb3IgZWFjaCBlbGVtZW50IGluIGBhcnJheWAgdG8gZ2VuZXJhdGUgdGhlIHZhbHVlIHRvIGJlIGF2ZXJhZ2VkLlxuICogVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6ICh2YWx1ZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjcuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBtZWFuLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IFt7ICduJzogNCB9LCB7ICduJzogMiB9LCB7ICduJzogOCB9LCB7ICduJzogNiB9XTtcbiAqXG4gKiBfLm1lYW5CeShvYmplY3RzLCBmdW5jdGlvbihvKSB7IHJldHVybiBvLm47IH0pO1xuICogLy8gPT4gNVxuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5tZWFuQnkob2JqZWN0cywgJ24nKTtcbiAqIC8vID0+IDVcbiAqL1xuZnVuY3Rpb24gbWVhbkJ5KGFycmF5LCBpdGVyYXRlZSkge1xuICByZXR1cm4gYmFzZU1lYW4oYXJyYXksIGJhc2VJdGVyYXRlZShpdGVyYXRlZSwgMikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lYW5CeTtcbiJdfQ==