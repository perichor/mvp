'use strict';

var baseInRange = require('./_baseInRange'),
    toFinite = require('./toFinite'),
    toNumber = require('./toNumber');

/**
 * Checks if `n` is between `start` and up to, but not including, `end`. If
 * `end` is not specified, it's set to `start` with `start` then set to `0`.
 * If `start` is greater than `end` the params are swapped to support
 * negative ranges.
 *
 * @static
 * @memberOf _
 * @since 3.3.0
 * @category Number
 * @param {number} number The number to check.
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
 * @see _.range, _.rangeRight
 * @example
 *
 * _.inRange(3, 2, 4);
 * // => true
 *
 * _.inRange(4, 8);
 * // => true
 *
 * _.inRange(4, 2);
 * // => false
 *
 * _.inRange(2, 2);
 * // => false
 *
 * _.inRange(1.2, 2);
 * // => true
 *
 * _.inRange(5.2, 4);
 * // => false
 *
 * _.inRange(-3, -2, -6);
 * // => true
 */
function inRange(number, start, end) {
  start = toFinite(start);
  if (end === undefined) {
    end = start;
    start = 0;
  } else {
    end = toFinite(end);
  }
  number = toNumber(number);
  return baseInRange(number, start, end);
}

module.exports = inRange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2luUmFuZ2UuanMiXSwibmFtZXMiOlsiYmFzZUluUmFuZ2UiLCJyZXF1aXJlIiwidG9GaW5pdGUiLCJ0b051bWJlciIsImluUmFuZ2UiLCJudW1iZXIiLCJzdGFydCIsImVuZCIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsY0FBY0MsUUFBUSxnQkFBUixDQUFsQjtBQUFBLElBQ0lDLFdBQVdELFFBQVEsWUFBUixDQURmO0FBQUEsSUFFSUUsV0FBV0YsUUFBUSxZQUFSLENBRmY7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0NBLFNBQVNHLE9BQVQsQ0FBaUJDLE1BQWpCLEVBQXlCQyxLQUF6QixFQUFnQ0MsR0FBaEMsRUFBcUM7QUFDbkNELFVBQVFKLFNBQVNJLEtBQVQsQ0FBUjtBQUNBLE1BQUlDLFFBQVFDLFNBQVosRUFBdUI7QUFDckJELFVBQU1ELEtBQU47QUFDQUEsWUFBUSxDQUFSO0FBQ0QsR0FIRCxNQUdPO0FBQ0xDLFVBQU1MLFNBQVNLLEdBQVQsQ0FBTjtBQUNEO0FBQ0RGLFdBQVNGLFNBQVNFLE1BQVQsQ0FBVDtBQUNBLFNBQU9MLFlBQVlLLE1BQVosRUFBb0JDLEtBQXBCLEVBQTJCQyxHQUEzQixDQUFQO0FBQ0Q7O0FBRURFLE9BQU9DLE9BQVAsR0FBaUJOLE9BQWpCIiwiZmlsZSI6ImluUmFuZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUluUmFuZ2UgPSByZXF1aXJlKCcuL19iYXNlSW5SYW5nZScpLFxuICAgIHRvRmluaXRlID0gcmVxdWlyZSgnLi90b0Zpbml0ZScpLFxuICAgIHRvTnVtYmVyID0gcmVxdWlyZSgnLi90b051bWJlcicpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgbmAgaXMgYmV0d2VlbiBgc3RhcnRgIGFuZCB1cCB0bywgYnV0IG5vdCBpbmNsdWRpbmcsIGBlbmRgLiBJZlxuICogYGVuZGAgaXMgbm90IHNwZWNpZmllZCwgaXQncyBzZXQgdG8gYHN0YXJ0YCB3aXRoIGBzdGFydGAgdGhlbiBzZXQgdG8gYDBgLlxuICogSWYgYHN0YXJ0YCBpcyBncmVhdGVyIHRoYW4gYGVuZGAgdGhlIHBhcmFtcyBhcmUgc3dhcHBlZCB0byBzdXBwb3J0XG4gKiBuZWdhdGl2ZSByYW5nZXMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjMuMFxuICogQGNhdGVnb3J5IE51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciBUaGUgbnVtYmVyIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD0wXSBUaGUgc3RhcnQgb2YgdGhlIHJhbmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBUaGUgZW5kIG9mIHRoZSByYW5nZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgbnVtYmVyYCBpcyBpbiB0aGUgcmFuZ2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBzZWUgXy5yYW5nZSwgXy5yYW5nZVJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaW5SYW5nZSgzLCAyLCA0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmluUmFuZ2UoNCwgOCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pblJhbmdlKDQsIDIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmluUmFuZ2UoMiwgMik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaW5SYW5nZSgxLjIsIDIpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaW5SYW5nZSg1LjIsIDQpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmluUmFuZ2UoLTMsIC0yLCAtNik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGluUmFuZ2UobnVtYmVyLCBzdGFydCwgZW5kKSB7XG4gIHN0YXJ0ID0gdG9GaW5pdGUoc3RhcnQpO1xuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSBzdGFydDtcbiAgICBzdGFydCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgZW5kID0gdG9GaW5pdGUoZW5kKTtcbiAgfVxuICBudW1iZXIgPSB0b051bWJlcihudW1iZXIpO1xuICByZXR1cm4gYmFzZUluUmFuZ2UobnVtYmVyLCBzdGFydCwgZW5kKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpblJhbmdlO1xuIl19