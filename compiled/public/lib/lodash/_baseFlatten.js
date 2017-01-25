'use strict';

var arrayPush = require('./_arrayPush'),
    isFlattenable = require('./_isFlattenable');

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlRmxhdHRlbi5qcyJdLCJuYW1lcyI6WyJhcnJheVB1c2giLCJyZXF1aXJlIiwiaXNGbGF0dGVuYWJsZSIsImJhc2VGbGF0dGVuIiwiYXJyYXkiLCJkZXB0aCIsInByZWRpY2F0ZSIsImlzU3RyaWN0IiwicmVzdWx0IiwiaW5kZXgiLCJsZW5ndGgiLCJ2YWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsWUFBWUMsUUFBUSxjQUFSLENBQWhCO0FBQUEsSUFDSUMsZ0JBQWdCRCxRQUFRLGtCQUFSLENBRHBCOztBQUdBOzs7Ozs7Ozs7OztBQVdBLFNBQVNFLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCQyxLQUE1QixFQUFtQ0MsU0FBbkMsRUFBOENDLFFBQTlDLEVBQXdEQyxNQUF4RCxFQUFnRTtBQUM5RCxNQUFJQyxRQUFRLENBQUMsQ0FBYjtBQUFBLE1BQ0lDLFNBQVNOLE1BQU1NLE1BRG5COztBQUdBSixnQkFBY0EsWUFBWUosYUFBMUI7QUFDQU0sYUFBV0EsU0FBUyxFQUFwQjs7QUFFQSxTQUFPLEVBQUVDLEtBQUYsR0FBVUMsTUFBakIsRUFBeUI7QUFDdkIsUUFBSUMsUUFBUVAsTUFBTUssS0FBTixDQUFaO0FBQ0EsUUFBSUosUUFBUSxDQUFSLElBQWFDLFVBQVVLLEtBQVYsQ0FBakIsRUFBbUM7QUFDakMsVUFBSU4sUUFBUSxDQUFaLEVBQWU7QUFDYjtBQUNBRixvQkFBWVEsS0FBWixFQUFtQk4sUUFBUSxDQUEzQixFQUE4QkMsU0FBOUIsRUFBeUNDLFFBQXpDLEVBQW1EQyxNQUFuRDtBQUNELE9BSEQsTUFHTztBQUNMUixrQkFBVVEsTUFBVixFQUFrQkcsS0FBbEI7QUFDRDtBQUNGLEtBUEQsTUFPTyxJQUFJLENBQUNKLFFBQUwsRUFBZTtBQUNwQkMsYUFBT0EsT0FBT0UsTUFBZCxJQUF3QkMsS0FBeEI7QUFDRDtBQUNGO0FBQ0QsU0FBT0gsTUFBUDtBQUNEOztBQUVESSxPQUFPQyxPQUFQLEdBQWlCVixXQUFqQiIsImZpbGUiOiJfYmFzZUZsYXR0ZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXJyYXlQdXNoID0gcmVxdWlyZSgnLi9fYXJyYXlQdXNoJyksXG4gICAgaXNGbGF0dGVuYWJsZSA9IHJlcXVpcmUoJy4vX2lzRmxhdHRlbmFibGUnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mbGF0dGVuYCB3aXRoIHN1cHBvcnQgZm9yIHJlc3RyaWN0aW5nIGZsYXR0ZW5pbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIFRoZSBtYXhpbXVtIHJlY3Vyc2lvbiBkZXB0aC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ByZWRpY2F0ZT1pc0ZsYXR0ZW5hYmxlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNTdHJpY3RdIFJlc3RyaWN0IHRvIHZhbHVlcyB0aGF0IHBhc3MgYHByZWRpY2F0ZWAgY2hlY2tzLlxuICogQHBhcmFtIHtBcnJheX0gW3Jlc3VsdD1bXV0gVGhlIGluaXRpYWwgcmVzdWx0IHZhbHVlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlRmxhdHRlbihhcnJheSwgZGVwdGgsIHByZWRpY2F0ZSwgaXNTdHJpY3QsIHJlc3VsdCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBwcmVkaWNhdGUgfHwgKHByZWRpY2F0ZSA9IGlzRmxhdHRlbmFibGUpO1xuICByZXN1bHQgfHwgKHJlc3VsdCA9IFtdKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAoZGVwdGggPiAwICYmIHByZWRpY2F0ZSh2YWx1ZSkpIHtcbiAgICAgIGlmIChkZXB0aCA+IDEpIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgZmxhdHRlbiBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgYmFzZUZsYXR0ZW4odmFsdWUsIGRlcHRoIC0gMSwgcHJlZGljYXRlLCBpc1N0cmljdCwgcmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5UHVzaChyZXN1bHQsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc1N0cmljdCkge1xuICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZsYXR0ZW47XG4iXX0=