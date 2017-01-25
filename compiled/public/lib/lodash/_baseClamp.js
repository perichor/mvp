"use strict";

/**
 * The base implementation of `_.clamp` which doesn't coerce arguments.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

module.exports = baseClamp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlQ2xhbXAuanMiXSwibmFtZXMiOlsiYmFzZUNsYW1wIiwibnVtYmVyIiwibG93ZXIiLCJ1cHBlciIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7OztBQVNBLFNBQVNBLFNBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCQyxLQUEzQixFQUFrQ0MsS0FBbEMsRUFBeUM7QUFDdkMsTUFBSUYsV0FBV0EsTUFBZixFQUF1QjtBQUNyQixRQUFJRSxVQUFVQyxTQUFkLEVBQXlCO0FBQ3ZCSCxlQUFTQSxVQUFVRSxLQUFWLEdBQWtCRixNQUFsQixHQUEyQkUsS0FBcEM7QUFDRDtBQUNELFFBQUlELFVBQVVFLFNBQWQsRUFBeUI7QUFDdkJILGVBQVNBLFVBQVVDLEtBQVYsR0FBa0JELE1BQWxCLEdBQTJCQyxLQUFwQztBQUNEO0FBQ0Y7QUFDRCxTQUFPRCxNQUFQO0FBQ0Q7O0FBRURJLE9BQU9DLE9BQVAsR0FBaUJOLFNBQWpCIiwiZmlsZSI6Il9iYXNlQ2xhbXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNsYW1wYCB3aGljaCBkb2Vzbid0IGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXIgVGhlIG51bWJlciB0byBjbGFtcC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbG93ZXJdIFRoZSBsb3dlciBib3VuZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB1cHBlciBUaGUgdXBwZXIgYm91bmQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjbGFtcGVkIG51bWJlci5cbiAqL1xuZnVuY3Rpb24gYmFzZUNsYW1wKG51bWJlciwgbG93ZXIsIHVwcGVyKSB7XG4gIGlmIChudW1iZXIgPT09IG51bWJlcikge1xuICAgIGlmICh1cHBlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBudW1iZXIgPSBudW1iZXIgPD0gdXBwZXIgPyBudW1iZXIgOiB1cHBlcjtcbiAgICB9XG4gICAgaWYgKGxvd2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG51bWJlciA9IG51bWJlciA+PSBsb3dlciA/IG51bWJlciA6IGxvd2VyO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVtYmVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDbGFtcDtcbiJdfQ==