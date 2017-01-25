'use strict';

var baseClamp = require('./_baseClamp'),
    toNumber = require('./toNumber');

/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Number
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 * @example
 *
 * _.clamp(-10, -5, 5);
 * // => -5
 *
 * _.clamp(10, -5, 5);
 * // => 5
 */
function clamp(number, lower, upper) {
  if (upper === undefined) {
    upper = lower;
    lower = undefined;
  }
  if (upper !== undefined) {
    upper = toNumber(upper);
    upper = upper === upper ? upper : 0;
  }
  if (lower !== undefined) {
    lower = toNumber(lower);
    lower = lower === lower ? lower : 0;
  }
  return baseClamp(toNumber(number), lower, upper);
}

module.exports = clamp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2NsYW1wLmpzIl0sIm5hbWVzIjpbImJhc2VDbGFtcCIsInJlcXVpcmUiLCJ0b051bWJlciIsImNsYW1wIiwibnVtYmVyIiwibG93ZXIiLCJ1cHBlciIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsWUFBWUMsUUFBUSxjQUFSLENBQWhCO0FBQUEsSUFDSUMsV0FBV0QsUUFBUSxZQUFSLENBRGY7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsU0FBU0UsS0FBVCxDQUFlQyxNQUFmLEVBQXVCQyxLQUF2QixFQUE4QkMsS0FBOUIsRUFBcUM7QUFDbkMsTUFBSUEsVUFBVUMsU0FBZCxFQUF5QjtBQUN2QkQsWUFBUUQsS0FBUjtBQUNBQSxZQUFRRSxTQUFSO0FBQ0Q7QUFDRCxNQUFJRCxVQUFVQyxTQUFkLEVBQXlCO0FBQ3ZCRCxZQUFRSixTQUFTSSxLQUFULENBQVI7QUFDQUEsWUFBUUEsVUFBVUEsS0FBVixHQUFrQkEsS0FBbEIsR0FBMEIsQ0FBbEM7QUFDRDtBQUNELE1BQUlELFVBQVVFLFNBQWQsRUFBeUI7QUFDdkJGLFlBQVFILFNBQVNHLEtBQVQsQ0FBUjtBQUNBQSxZQUFRQSxVQUFVQSxLQUFWLEdBQWtCQSxLQUFsQixHQUEwQixDQUFsQztBQUNEO0FBQ0QsU0FBT0wsVUFBVUUsU0FBU0UsTUFBVCxDQUFWLEVBQTRCQyxLQUE1QixFQUFtQ0MsS0FBbkMsQ0FBUDtBQUNEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCTixLQUFqQiIsImZpbGUiOiJjbGFtcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlQ2xhbXAgPSByZXF1aXJlKCcuL19iYXNlQ2xhbXAnKSxcbiAgICB0b051bWJlciA9IHJlcXVpcmUoJy4vdG9OdW1iZXInKTtcblxuLyoqXG4gKiBDbGFtcHMgYG51bWJlcmAgd2l0aGluIHRoZSBpbmNsdXNpdmUgYGxvd2VyYCBhbmQgYHVwcGVyYCBib3VuZHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IE51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciBUaGUgbnVtYmVyIHRvIGNsYW1wLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsb3dlcl0gVGhlIGxvd2VyIGJvdW5kLlxuICogQHBhcmFtIHtudW1iZXJ9IHVwcGVyIFRoZSB1cHBlciBib3VuZC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNsYW1wZWQgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmNsYW1wKC0xMCwgLTUsIDUpO1xuICogLy8gPT4gLTVcbiAqXG4gKiBfLmNsYW1wKDEwLCAtNSwgNSk7XG4gKiAvLyA9PiA1XG4gKi9cbmZ1bmN0aW9uIGNsYW1wKG51bWJlciwgbG93ZXIsIHVwcGVyKSB7XG4gIGlmICh1cHBlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdXBwZXIgPSBsb3dlcjtcbiAgICBsb3dlciA9IHVuZGVmaW5lZDtcbiAgfVxuICBpZiAodXBwZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHVwcGVyID0gdG9OdW1iZXIodXBwZXIpO1xuICAgIHVwcGVyID0gdXBwZXIgPT09IHVwcGVyID8gdXBwZXIgOiAwO1xuICB9XG4gIGlmIChsb3dlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbG93ZXIgPSB0b051bWJlcihsb3dlcik7XG4gICAgbG93ZXIgPSBsb3dlciA9PT0gbG93ZXIgPyBsb3dlciA6IDA7XG4gIH1cbiAgcmV0dXJuIGJhc2VDbGFtcCh0b051bWJlcihudW1iZXIpLCBsb3dlciwgdXBwZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYW1wO1xuIl19