'use strict';

var baseEach = require('./_baseEach');

/**
 * Aggregates elements of `collection` on `accumulator` with keys transformed
 * by `iteratee` and values set by `setter`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */
function baseAggregator(collection, setter, iteratee, accumulator) {
  baseEach(collection, function (value, key, collection) {
    setter(accumulator, value, iteratee(value), collection);
  });
  return accumulator;
}

module.exports = baseAggregator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlQWdncmVnYXRvci5qcyJdLCJuYW1lcyI6WyJiYXNlRWFjaCIsInJlcXVpcmUiLCJiYXNlQWdncmVnYXRvciIsImNvbGxlY3Rpb24iLCJzZXR0ZXIiLCJpdGVyYXRlZSIsImFjY3VtdWxhdG9yIiwidmFsdWUiLCJrZXkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsYUFBUixDQUFmOztBQUVBOzs7Ozs7Ozs7OztBQVdBLFNBQVNDLGNBQVQsQ0FBd0JDLFVBQXhCLEVBQW9DQyxNQUFwQyxFQUE0Q0MsUUFBNUMsRUFBc0RDLFdBQXRELEVBQW1FO0FBQ2pFTixXQUFTRyxVQUFULEVBQXFCLFVBQVNJLEtBQVQsRUFBZ0JDLEdBQWhCLEVBQXFCTCxVQUFyQixFQUFpQztBQUNwREMsV0FBT0UsV0FBUCxFQUFvQkMsS0FBcEIsRUFBMkJGLFNBQVNFLEtBQVQsQ0FBM0IsRUFBNENKLFVBQTVDO0FBQ0QsR0FGRDtBQUdBLFNBQU9HLFdBQVA7QUFDRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQlIsY0FBakIiLCJmaWxlIjoiX2Jhc2VBZ2dyZWdhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VFYWNoID0gcmVxdWlyZSgnLi9fYmFzZUVhY2gnKTtcblxuLyoqXG4gKiBBZ2dyZWdhdGVzIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYCBvbiBgYWNjdW11bGF0b3JgIHdpdGgga2V5cyB0cmFuc2Zvcm1lZFxuICogYnkgYGl0ZXJhdGVlYCBhbmQgdmFsdWVzIHNldCBieSBgc2V0dGVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc2V0dGVyIFRoZSBmdW5jdGlvbiB0byBzZXQgYGFjY3VtdWxhdG9yYCB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgaXRlcmF0ZWUgdG8gdHJhbnNmb3JtIGtleXMuXG4gKiBAcGFyYW0ge09iamVjdH0gYWNjdW11bGF0b3IgVGhlIGluaXRpYWwgYWdncmVnYXRlZCBvYmplY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGFjY3VtdWxhdG9yYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUFnZ3JlZ2F0b3IoY29sbGVjdGlvbiwgc2V0dGVyLCBpdGVyYXRlZSwgYWNjdW11bGF0b3IpIHtcbiAgYmFzZUVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGtleSwgY29sbGVjdGlvbikge1xuICAgIHNldHRlcihhY2N1bXVsYXRvciwgdmFsdWUsIGl0ZXJhdGVlKHZhbHVlKSwgY29sbGVjdGlvbik7XG4gIH0pO1xuICByZXR1cm4gYWNjdW11bGF0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFnZ3JlZ2F0b3I7XG4iXX0=