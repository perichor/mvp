'use strict';

var baseMean = require('./_baseMean'),
    identity = require('./identity');

/**
 * Computes the mean of the values in `array`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the mean.
 * @example
 *
 * _.mean([4, 2, 8, 6]);
 * // => 5
 */
function mean(array) {
  return baseMean(array, identity);
}

module.exports = mean;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL21lYW4uanMiXSwibmFtZXMiOlsiYmFzZU1lYW4iLCJyZXF1aXJlIiwiaWRlbnRpdHkiLCJtZWFuIiwiYXJyYXkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsYUFBUixDQUFmO0FBQUEsSUFDSUMsV0FBV0QsUUFBUSxZQUFSLENBRGY7O0FBR0E7Ozs7Ozs7Ozs7Ozs7O0FBY0EsU0FBU0UsSUFBVCxDQUFjQyxLQUFkLEVBQXFCO0FBQ25CLFNBQU9KLFNBQVNJLEtBQVQsRUFBZ0JGLFFBQWhCLENBQVA7QUFDRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQkgsSUFBakIiLCJmaWxlIjoibWVhbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlTWVhbiA9IHJlcXVpcmUoJy4vX2Jhc2VNZWFuJyksXG4gICAgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1lYW4gb2YgdGhlIHZhbHVlcyBpbiBgYXJyYXlgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbWVhbi5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5tZWFuKFs0LCAyLCA4LCA2XSk7XG4gKiAvLyA9PiA1XG4gKi9cbmZ1bmN0aW9uIG1lYW4oYXJyYXkpIHtcbiAgcmV0dXJuIGJhc2VNZWFuKGFycmF5LCBpZGVudGl0eSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWVhbjtcbiJdfQ==