'use strict';

var baseIndexOf = require('./_baseIndexOf'),
    toInteger = require('./toInteger');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it's used as the
 * offset from the end of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.indexOf([1, 2, 1, 2], 2);
 * // => 1
 *
 * // Search from the `fromIndex`.
 * _.indexOf([1, 2, 1, 2], 2, 2);
 * // => 3
 */
function indexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseIndexOf(array, value, index);
}

module.exports = indexOf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2luZGV4T2YuanMiXSwibmFtZXMiOlsiYmFzZUluZGV4T2YiLCJyZXF1aXJlIiwidG9JbnRlZ2VyIiwibmF0aXZlTWF4IiwiTWF0aCIsIm1heCIsImluZGV4T2YiLCJhcnJheSIsInZhbHVlIiwiZnJvbUluZGV4IiwibGVuZ3RoIiwiaW5kZXgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGNBQWNDLFFBQVEsZ0JBQVIsQ0FBbEI7QUFBQSxJQUNJQyxZQUFZRCxRQUFRLGFBQVIsQ0FEaEI7O0FBR0E7QUFDQSxJQUFJRSxZQUFZQyxLQUFLQyxHQUFyQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsU0FBU0MsT0FBVCxDQUFpQkMsS0FBakIsRUFBd0JDLEtBQXhCLEVBQStCQyxTQUEvQixFQUEwQztBQUN4QyxNQUFJQyxTQUFTSCxTQUFTLElBQVQsR0FBZ0IsQ0FBaEIsR0FBb0JBLE1BQU1HLE1BQXZDO0FBQ0EsTUFBSSxDQUFDQSxNQUFMLEVBQWE7QUFDWCxXQUFPLENBQUMsQ0FBUjtBQUNEO0FBQ0QsTUFBSUMsUUFBUUYsYUFBYSxJQUFiLEdBQW9CLENBQXBCLEdBQXdCUCxVQUFVTyxTQUFWLENBQXBDO0FBQ0EsTUFBSUUsUUFBUSxDQUFaLEVBQWU7QUFDYkEsWUFBUVIsVUFBVU8sU0FBU0MsS0FBbkIsRUFBMEIsQ0FBMUIsQ0FBUjtBQUNEO0FBQ0QsU0FBT1gsWUFBWU8sS0FBWixFQUFtQkMsS0FBbkIsRUFBMEJHLEtBQTFCLENBQVA7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQlAsT0FBakIiLCJmaWxlIjoiaW5kZXhPZi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Jhc2VJbmRleE9mJyksXG4gICAgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi90b0ludGVnZXInKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGB2YWx1ZWAgaXMgZm91bmQgaW4gYGFycmF5YFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy4gSWYgYGZyb21JbmRleGAgaXMgbmVnYXRpdmUsIGl0J3MgdXNlZCBhcyB0aGVcbiAqIG9mZnNldCBmcm9tIHRoZSBlbmQgb2YgYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZnJvbUluZGV4PTBdIFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaW5kZXhPZihbMSwgMiwgMSwgMl0sIDIpO1xuICogLy8gPT4gMVxuICpcbiAqIC8vIFNlYXJjaCBmcm9tIHRoZSBgZnJvbUluZGV4YC5cbiAqIF8uaW5kZXhPZihbMSwgMiwgMSwgMl0sIDIsIDIpO1xuICogLy8gPT4gM1xuICovXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgdmFyIGluZGV4ID0gZnJvbUluZGV4ID09IG51bGwgPyAwIDogdG9JbnRlZ2VyKGZyb21JbmRleCk7XG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBpbmRleCA9IG5hdGl2ZU1heChsZW5ndGggKyBpbmRleCwgMCk7XG4gIH1cbiAgcmV0dXJuIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgaW5kZXgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluZGV4T2Y7XG4iXX0=