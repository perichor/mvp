'use strict';

var baseSlice = require('./_baseSlice');

/**
 * Gets all but the first element of `array`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.tail([1, 2, 3]);
 * // => [2, 3]
 */
function tail(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice(array, 1, length) : [];
}

module.exports = tail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3RhaWwuanMiXSwibmFtZXMiOlsiYmFzZVNsaWNlIiwicmVxdWlyZSIsInRhaWwiLCJhcnJheSIsImxlbmd0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsWUFBWUMsUUFBUSxjQUFSLENBQWhCOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQWNBLFNBQVNDLElBQVQsQ0FBY0MsS0FBZCxFQUFxQjtBQUNuQixNQUFJQyxTQUFTRCxTQUFTLElBQVQsR0FBZ0IsQ0FBaEIsR0FBb0JBLE1BQU1DLE1BQXZDO0FBQ0EsU0FBT0EsU0FBU0osVUFBVUcsS0FBVixFQUFpQixDQUFqQixFQUFvQkMsTUFBcEIsQ0FBVCxHQUF1QyxFQUE5QztBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCSixJQUFqQiIsImZpbGUiOiJ0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VTbGljZSA9IHJlcXVpcmUoJy4vX2Jhc2VTbGljZScpO1xuXG4vKipcbiAqIEdldHMgYWxsIGJ1dCB0aGUgZmlyc3QgZWxlbWVudCBvZiBgYXJyYXlgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBzbGljZSBvZiBgYXJyYXlgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRhaWwoWzEsIDIsIDNdKTtcbiAqIC8vID0+IFsyLCAzXVxuICovXG5mdW5jdGlvbiB0YWlsKGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcbiAgcmV0dXJuIGxlbmd0aCA/IGJhc2VTbGljZShhcnJheSwgMSwgbGVuZ3RoKSA6IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRhaWw7XG4iXX0=