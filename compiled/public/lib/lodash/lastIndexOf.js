'use strict';

var baseFindIndex = require('./_baseFindIndex'),
    baseIsNaN = require('./_baseIsNaN'),
    strictLastIndexOf = require('./_strictLastIndexOf'),
    toInteger = require('./toInteger');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * This method is like `_.indexOf` except that it iterates over elements of
 * `array` from right to left.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.lastIndexOf([1, 2, 1, 2], 2);
 * // => 3
 *
 * // Search from the `fromIndex`.
 * _.lastIndexOf([1, 2, 1, 2], 2, 2);
 * // => 1
 */
function lastIndexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = length;
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex);
    index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
  }
  return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
}

module.exports = lastIndexOf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2xhc3RJbmRleE9mLmpzIl0sIm5hbWVzIjpbImJhc2VGaW5kSW5kZXgiLCJyZXF1aXJlIiwiYmFzZUlzTmFOIiwic3RyaWN0TGFzdEluZGV4T2YiLCJ0b0ludGVnZXIiLCJuYXRpdmVNYXgiLCJNYXRoIiwibWF4IiwibmF0aXZlTWluIiwibWluIiwibGFzdEluZGV4T2YiLCJhcnJheSIsInZhbHVlIiwiZnJvbUluZGV4IiwibGVuZ3RoIiwiaW5kZXgiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGdCQUFnQkMsUUFBUSxrQkFBUixDQUFwQjtBQUFBLElBQ0lDLFlBQVlELFFBQVEsY0FBUixDQURoQjtBQUFBLElBRUlFLG9CQUFvQkYsUUFBUSxzQkFBUixDQUZ4QjtBQUFBLElBR0lHLFlBQVlILFFBQVEsYUFBUixDQUhoQjs7QUFLQTtBQUNBLElBQUlJLFlBQVlDLEtBQUtDLEdBQXJCO0FBQUEsSUFDSUMsWUFBWUYsS0FBS0csR0FEckI7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxTQUFTQyxXQUFULENBQXFCQyxLQUFyQixFQUE0QkMsS0FBNUIsRUFBbUNDLFNBQW5DLEVBQThDO0FBQzVDLE1BQUlDLFNBQVNILFNBQVMsSUFBVCxHQUFnQixDQUFoQixHQUFvQkEsTUFBTUcsTUFBdkM7QUFDQSxNQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYLFdBQU8sQ0FBQyxDQUFSO0FBQ0Q7QUFDRCxNQUFJQyxRQUFRRCxNQUFaO0FBQ0EsTUFBSUQsY0FBY0csU0FBbEIsRUFBNkI7QUFDM0JELFlBQVFYLFVBQVVTLFNBQVYsQ0FBUjtBQUNBRSxZQUFRQSxRQUFRLENBQVIsR0FBWVYsVUFBVVMsU0FBU0MsS0FBbkIsRUFBMEIsQ0FBMUIsQ0FBWixHQUEyQ1AsVUFBVU8sS0FBVixFQUFpQkQsU0FBUyxDQUExQixDQUFuRDtBQUNEO0FBQ0QsU0FBT0YsVUFBVUEsS0FBVixHQUNIVCxrQkFBa0JRLEtBQWxCLEVBQXlCQyxLQUF6QixFQUFnQ0csS0FBaEMsQ0FERyxHQUVIZixjQUFjVyxLQUFkLEVBQXFCVCxTQUFyQixFQUFnQ2EsS0FBaEMsRUFBdUMsSUFBdkMsQ0FGSjtBQUdEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCUixXQUFqQiIsImZpbGUiOiJsYXN0SW5kZXhPZi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlRmluZEluZGV4ID0gcmVxdWlyZSgnLi9fYmFzZUZpbmRJbmRleCcpLFxuICAgIGJhc2VJc05hTiA9IHJlcXVpcmUoJy4vX2Jhc2VJc05hTicpLFxuICAgIHN0cmljdExhc3RJbmRleE9mID0gcmVxdWlyZSgnLi9fc3RyaWN0TGFzdEluZGV4T2YnKSxcbiAgICB0b0ludGVnZXIgPSByZXF1aXJlKCcuL3RvSW50ZWdlcicpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pbmRleE9mYCBleGNlcHQgdGhhdCBpdCBpdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mXG4gKiBgYXJyYXlgIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZnJvbUluZGV4PWFycmF5Lmxlbmd0aC0xXSBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmxhc3RJbmRleE9mKFsxLCAyLCAxLCAyXSwgMik7XG4gKiAvLyA9PiAzXG4gKlxuICogLy8gU2VhcmNoIGZyb20gdGhlIGBmcm9tSW5kZXhgLlxuICogXy5sYXN0SW5kZXhPZihbMSwgMiwgMSwgMl0sIDIsIDIpO1xuICogLy8gPT4gMVxuICovXG5mdW5jdGlvbiBsYXN0SW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIHZhciBpbmRleCA9IGxlbmd0aDtcbiAgaWYgKGZyb21JbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaW5kZXggPSB0b0ludGVnZXIoZnJvbUluZGV4KTtcbiAgICBpbmRleCA9IGluZGV4IDwgMCA/IG5hdGl2ZU1heChsZW5ndGggKyBpbmRleCwgMCkgOiBuYXRpdmVNaW4oaW5kZXgsIGxlbmd0aCAtIDEpO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWVcbiAgICA/IHN0cmljdExhc3RJbmRleE9mKGFycmF5LCB2YWx1ZSwgaW5kZXgpXG4gICAgOiBiYXNlRmluZEluZGV4KGFycmF5LCBiYXNlSXNOYU4sIGluZGV4LCB0cnVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsYXN0SW5kZXhPZjtcbiJdfQ==