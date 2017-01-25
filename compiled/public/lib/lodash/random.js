'use strict';

var baseRandom = require('./_baseRandom'),
    isIterateeCall = require('./_isIterateeCall'),
    toFinite = require('./toFinite');

/** Built-in method references without a dependency on `root`. */
var freeParseFloat = parseFloat;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min,
    nativeRandom = Math.random;

/**
 * Produces a random number between the inclusive `lower` and `upper` bounds.
 * If only one argument is provided a number between `0` and the given number
 * is returned. If `floating` is `true`, or either `lower` or `upper` are
 * floats, a floating-point number is returned instead of an integer.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @static
 * @memberOf _
 * @since 0.7.0
 * @category Number
 * @param {number} [lower=0] The lower bound.
 * @param {number} [upper=1] The upper bound.
 * @param {boolean} [floating] Specify returning a floating-point number.
 * @returns {number} Returns the random number.
 * @example
 *
 * _.random(0, 5);
 * // => an integer between 0 and 5
 *
 * _.random(5);
 * // => also an integer between 0 and 5
 *
 * _.random(5, true);
 * // => a floating-point number between 0 and 5
 *
 * _.random(1.2, 5.2);
 * // => a floating-point number between 1.2 and 5.2
 */
function random(lower, upper, floating) {
  if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
    upper = floating = undefined;
  }
  if (floating === undefined) {
    if (typeof upper == 'boolean') {
      floating = upper;
      upper = undefined;
    } else if (typeof lower == 'boolean') {
      floating = lower;
      lower = undefined;
    }
  }
  if (lower === undefined && upper === undefined) {
    lower = 0;
    upper = 1;
  } else {
    lower = toFinite(lower);
    if (upper === undefined) {
      upper = lower;
      lower = 0;
    } else {
      upper = toFinite(upper);
    }
  }
  if (lower > upper) {
    var temp = lower;
    lower = upper;
    upper = temp;
  }
  if (floating || lower % 1 || upper % 1) {
    var rand = nativeRandom();
    return nativeMin(lower + rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1))), upper);
  }
  return baseRandom(lower, upper);
}

module.exports = random;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3JhbmRvbS5qcyJdLCJuYW1lcyI6WyJiYXNlUmFuZG9tIiwicmVxdWlyZSIsImlzSXRlcmF0ZWVDYWxsIiwidG9GaW5pdGUiLCJmcmVlUGFyc2VGbG9hdCIsInBhcnNlRmxvYXQiLCJuYXRpdmVNaW4iLCJNYXRoIiwibWluIiwibmF0aXZlUmFuZG9tIiwicmFuZG9tIiwibG93ZXIiLCJ1cHBlciIsImZsb2F0aW5nIiwidW5kZWZpbmVkIiwidGVtcCIsInJhbmQiLCJsZW5ndGgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGFBQWFDLFFBQVEsZUFBUixDQUFqQjtBQUFBLElBQ0lDLGlCQUFpQkQsUUFBUSxtQkFBUixDQURyQjtBQUFBLElBRUlFLFdBQVdGLFFBQVEsWUFBUixDQUZmOztBQUlBO0FBQ0EsSUFBSUcsaUJBQWlCQyxVQUFyQjs7QUFFQTtBQUNBLElBQUlDLFlBQVlDLEtBQUtDLEdBQXJCO0FBQUEsSUFDSUMsZUFBZUYsS0FBS0csTUFEeEI7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQkEsU0FBU0EsTUFBVCxDQUFnQkMsS0FBaEIsRUFBdUJDLEtBQXZCLEVBQThCQyxRQUE5QixFQUF3QztBQUN0QyxNQUFJQSxZQUFZLE9BQU9BLFFBQVAsSUFBbUIsU0FBL0IsSUFBNENYLGVBQWVTLEtBQWYsRUFBc0JDLEtBQXRCLEVBQTZCQyxRQUE3QixDQUFoRCxFQUF3RjtBQUN0RkQsWUFBUUMsV0FBV0MsU0FBbkI7QUFDRDtBQUNELE1BQUlELGFBQWFDLFNBQWpCLEVBQTRCO0FBQzFCLFFBQUksT0FBT0YsS0FBUCxJQUFnQixTQUFwQixFQUErQjtBQUM3QkMsaUJBQVdELEtBQVg7QUFDQUEsY0FBUUUsU0FBUjtBQUNELEtBSEQsTUFJSyxJQUFJLE9BQU9ILEtBQVAsSUFBZ0IsU0FBcEIsRUFBK0I7QUFDbENFLGlCQUFXRixLQUFYO0FBQ0FBLGNBQVFHLFNBQVI7QUFDRDtBQUNGO0FBQ0QsTUFBSUgsVUFBVUcsU0FBVixJQUF1QkYsVUFBVUUsU0FBckMsRUFBZ0Q7QUFDOUNILFlBQVEsQ0FBUjtBQUNBQyxZQUFRLENBQVI7QUFDRCxHQUhELE1BSUs7QUFDSEQsWUFBUVIsU0FBU1EsS0FBVCxDQUFSO0FBQ0EsUUFBSUMsVUFBVUUsU0FBZCxFQUF5QjtBQUN2QkYsY0FBUUQsS0FBUjtBQUNBQSxjQUFRLENBQVI7QUFDRCxLQUhELE1BR087QUFDTEMsY0FBUVQsU0FBU1MsS0FBVCxDQUFSO0FBQ0Q7QUFDRjtBQUNELE1BQUlELFFBQVFDLEtBQVosRUFBbUI7QUFDakIsUUFBSUcsT0FBT0osS0FBWDtBQUNBQSxZQUFRQyxLQUFSO0FBQ0FBLFlBQVFHLElBQVI7QUFDRDtBQUNELE1BQUlGLFlBQVlGLFFBQVEsQ0FBcEIsSUFBeUJDLFFBQVEsQ0FBckMsRUFBd0M7QUFDdEMsUUFBSUksT0FBT1AsY0FBWDtBQUNBLFdBQU9ILFVBQVVLLFFBQVNLLFFBQVFKLFFBQVFELEtBQVIsR0FBZ0JQLGVBQWUsU0FBUyxDQUFDWSxPQUFPLEVBQVIsRUFBWUMsTUFBWixHQUFxQixDQUE5QixDQUFmLENBQXhCLENBQW5CLEVBQStGTCxLQUEvRixDQUFQO0FBQ0Q7QUFDRCxTQUFPWixXQUFXVyxLQUFYLEVBQWtCQyxLQUFsQixDQUFQO0FBQ0Q7O0FBRURNLE9BQU9DLE9BQVAsR0FBaUJULE1BQWpCIiwiZmlsZSI6InJhbmRvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlUmFuZG9tID0gcmVxdWlyZSgnLi9fYmFzZVJhbmRvbScpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnLi9faXNJdGVyYXRlZUNhbGwnKSxcbiAgICB0b0Zpbml0ZSA9IHJlcXVpcmUoJy4vdG9GaW5pdGUnKTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VGbG9hdCA9IHBhcnNlRmxvYXQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNaW4gPSBNYXRoLm1pbixcbiAgICBuYXRpdmVSYW5kb20gPSBNYXRoLnJhbmRvbTtcblxuLyoqXG4gKiBQcm9kdWNlcyBhIHJhbmRvbSBudW1iZXIgYmV0d2VlbiB0aGUgaW5jbHVzaXZlIGBsb3dlcmAgYW5kIGB1cHBlcmAgYm91bmRzLlxuICogSWYgb25seSBvbmUgYXJndW1lbnQgaXMgcHJvdmlkZWQgYSBudW1iZXIgYmV0d2VlbiBgMGAgYW5kIHRoZSBnaXZlbiBudW1iZXJcbiAqIGlzIHJldHVybmVkLiBJZiBgZmxvYXRpbmdgIGlzIGB0cnVlYCwgb3IgZWl0aGVyIGBsb3dlcmAgb3IgYHVwcGVyYCBhcmVcbiAqIGZsb2F0cywgYSBmbG9hdGluZy1wb2ludCBudW1iZXIgaXMgcmV0dXJuZWQgaW5zdGVhZCBvZiBhbiBpbnRlZ2VyLlxuICpcbiAqICoqTm90ZToqKiBKYXZhU2NyaXB0IGZvbGxvd3MgdGhlIElFRUUtNzU0IHN0YW5kYXJkIGZvciByZXNvbHZpbmdcbiAqIGZsb2F0aW5nLXBvaW50IHZhbHVlcyB3aGljaCBjYW4gcHJvZHVjZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjcuMFxuICogQGNhdGVnb3J5IE51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IFtsb3dlcj0wXSBUaGUgbG93ZXIgYm91bmQuXG4gKiBAcGFyYW0ge251bWJlcn0gW3VwcGVyPTFdIFRoZSB1cHBlciBib3VuZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zsb2F0aW5nXSBTcGVjaWZ5IHJldHVybmluZyBhIGZsb2F0aW5nLXBvaW50IG51bWJlci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHJhbmRvbSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ucmFuZG9tKDAsIDUpO1xuICogLy8gPT4gYW4gaW50ZWdlciBiZXR3ZWVuIDAgYW5kIDVcbiAqXG4gKiBfLnJhbmRvbSg1KTtcbiAqIC8vID0+IGFsc28gYW4gaW50ZWdlciBiZXR3ZWVuIDAgYW5kIDVcbiAqXG4gKiBfLnJhbmRvbSg1LCB0cnVlKTtcbiAqIC8vID0+IGEgZmxvYXRpbmctcG9pbnQgbnVtYmVyIGJldHdlZW4gMCBhbmQgNVxuICpcbiAqIF8ucmFuZG9tKDEuMiwgNS4yKTtcbiAqIC8vID0+IGEgZmxvYXRpbmctcG9pbnQgbnVtYmVyIGJldHdlZW4gMS4yIGFuZCA1LjJcbiAqL1xuZnVuY3Rpb24gcmFuZG9tKGxvd2VyLCB1cHBlciwgZmxvYXRpbmcpIHtcbiAgaWYgKGZsb2F0aW5nICYmIHR5cGVvZiBmbG9hdGluZyAhPSAnYm9vbGVhbicgJiYgaXNJdGVyYXRlZUNhbGwobG93ZXIsIHVwcGVyLCBmbG9hdGluZykpIHtcbiAgICB1cHBlciA9IGZsb2F0aW5nID0gdW5kZWZpbmVkO1xuICB9XG4gIGlmIChmbG9hdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHR5cGVvZiB1cHBlciA9PSAnYm9vbGVhbicpIHtcbiAgICAgIGZsb2F0aW5nID0gdXBwZXI7XG4gICAgICB1cHBlciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGxvd2VyID09ICdib29sZWFuJykge1xuICAgICAgZmxvYXRpbmcgPSBsb3dlcjtcbiAgICAgIGxvd2VyID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuICBpZiAobG93ZXIgPT09IHVuZGVmaW5lZCAmJiB1cHBlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbG93ZXIgPSAwO1xuICAgIHVwcGVyID0gMTtcbiAgfVxuICBlbHNlIHtcbiAgICBsb3dlciA9IHRvRmluaXRlKGxvd2VyKTtcbiAgICBpZiAodXBwZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdXBwZXIgPSBsb3dlcjtcbiAgICAgIGxvd2VyID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBwZXIgPSB0b0Zpbml0ZSh1cHBlcik7XG4gICAgfVxuICB9XG4gIGlmIChsb3dlciA+IHVwcGVyKSB7XG4gICAgdmFyIHRlbXAgPSBsb3dlcjtcbiAgICBsb3dlciA9IHVwcGVyO1xuICAgIHVwcGVyID0gdGVtcDtcbiAgfVxuICBpZiAoZmxvYXRpbmcgfHwgbG93ZXIgJSAxIHx8IHVwcGVyICUgMSkge1xuICAgIHZhciByYW5kID0gbmF0aXZlUmFuZG9tKCk7XG4gICAgcmV0dXJuIG5hdGl2ZU1pbihsb3dlciArIChyYW5kICogKHVwcGVyIC0gbG93ZXIgKyBmcmVlUGFyc2VGbG9hdCgnMWUtJyArICgocmFuZCArICcnKS5sZW5ndGggLSAxKSkpKSwgdXBwZXIpO1xuICB9XG4gIHJldHVybiBiYXNlUmFuZG9tKGxvd2VyLCB1cHBlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZG9tO1xuIl19