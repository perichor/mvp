'use strict';

var baseSum = require('./_baseSum'),
    identity = require('./identity');

/**
 * Computes the sum of the values in `array`.
 *
 * @static
 * @memberOf _
 * @since 3.4.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the sum.
 * @example
 *
 * _.sum([4, 2, 8, 6]);
 * // => 20
 */
function sum(array) {
    return array && array.length ? baseSum(array, identity) : 0;
}

module.exports = sum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3N1bS5qcyJdLCJuYW1lcyI6WyJiYXNlU3VtIiwicmVxdWlyZSIsImlkZW50aXR5Iiwic3VtIiwiYXJyYXkiLCJsZW5ndGgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFVBQVVDLFFBQVEsWUFBUixDQUFkO0FBQUEsSUFDSUMsV0FBV0QsUUFBUSxZQUFSLENBRGY7O0FBR0E7Ozs7Ozs7Ozs7Ozs7O0FBY0EsU0FBU0UsR0FBVCxDQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFdBQVFBLFNBQVNBLE1BQU1DLE1BQWhCLEdBQ0hMLFFBQVFJLEtBQVIsRUFBZUYsUUFBZixDQURHLEdBRUgsQ0FGSjtBQUdEOztBQUVESSxPQUFPQyxPQUFQLEdBQWlCSixHQUFqQiIsImZpbGUiOiJzdW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZVN1bSA9IHJlcXVpcmUoJy4vX2Jhc2VTdW0nKSxcbiAgICBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgc3VtIG9mIHRoZSB2YWx1ZXMgaW4gYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNC4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHN1bS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5zdW0oWzQsIDIsIDgsIDZdKTtcbiAqIC8vID0+IDIwXG4gKi9cbmZ1bmN0aW9uIHN1bShhcnJheSkge1xuICByZXR1cm4gKGFycmF5ICYmIGFycmF5Lmxlbmd0aClcbiAgICA/IGJhc2VTdW0oYXJyYXksIGlkZW50aXR5KVxuICAgIDogMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdW07XG4iXX0=