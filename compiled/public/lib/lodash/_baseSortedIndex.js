'use strict';

var baseSortedIndexBy = require('./_baseSortedIndexBy'),
    identity = require('./identity'),
    isSymbol = require('./isSymbol');

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295,
    HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

/**
 * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
 * performs a binary search of `array` to determine the index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndex(array, value, retHighest) {
  var low = 0,
      high = array == null ? low : array.length;

  if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      var mid = low + high >>> 1,
          computed = array[mid];

      if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return high;
  }
  return baseSortedIndexBy(array, value, identity, retHighest);
}

module.exports = baseSortedIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlU29ydGVkSW5kZXguanMiXSwibmFtZXMiOlsiYmFzZVNvcnRlZEluZGV4QnkiLCJyZXF1aXJlIiwiaWRlbnRpdHkiLCJpc1N5bWJvbCIsIk1BWF9BUlJBWV9MRU5HVEgiLCJIQUxGX01BWF9BUlJBWV9MRU5HVEgiLCJiYXNlU29ydGVkSW5kZXgiLCJhcnJheSIsInZhbHVlIiwicmV0SGlnaGVzdCIsImxvdyIsImhpZ2giLCJsZW5ndGgiLCJtaWQiLCJjb21wdXRlZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsb0JBQW9CQyxRQUFRLHNCQUFSLENBQXhCO0FBQUEsSUFDSUMsV0FBV0QsUUFBUSxZQUFSLENBRGY7QUFBQSxJQUVJRSxXQUFXRixRQUFRLFlBQVIsQ0FGZjs7QUFJQTtBQUNBLElBQUlHLG1CQUFtQixVQUF2QjtBQUFBLElBQ0lDLHdCQUF3QkQscUJBQXFCLENBRGpEOztBQUdBOzs7Ozs7Ozs7Ozs7QUFZQSxTQUFTRSxlQUFULENBQXlCQyxLQUF6QixFQUFnQ0MsS0FBaEMsRUFBdUNDLFVBQXZDLEVBQW1EO0FBQ2pELE1BQUlDLE1BQU0sQ0FBVjtBQUFBLE1BQ0lDLE9BQU9KLFNBQVMsSUFBVCxHQUFnQkcsR0FBaEIsR0FBc0JILE1BQU1LLE1BRHZDOztBQUdBLE1BQUksT0FBT0osS0FBUCxJQUFnQixRQUFoQixJQUE0QkEsVUFBVUEsS0FBdEMsSUFBK0NHLFFBQVFOLHFCQUEzRCxFQUFrRjtBQUNoRixXQUFPSyxNQUFNQyxJQUFiLEVBQW1CO0FBQ2pCLFVBQUlFLE1BQU9ILE1BQU1DLElBQVAsS0FBaUIsQ0FBM0I7QUFBQSxVQUNJRyxXQUFXUCxNQUFNTSxHQUFOLENBRGY7O0FBR0EsVUFBSUMsYUFBYSxJQUFiLElBQXFCLENBQUNYLFNBQVNXLFFBQVQsQ0FBdEIsS0FDQ0wsYUFBY0ssWUFBWU4sS0FBMUIsR0FBb0NNLFdBQVdOLEtBRGhELENBQUosRUFDNkQ7QUFDM0RFLGNBQU1HLE1BQU0sQ0FBWjtBQUNELE9BSEQsTUFHTztBQUNMRixlQUFPRSxHQUFQO0FBQ0Q7QUFDRjtBQUNELFdBQU9GLElBQVA7QUFDRDtBQUNELFNBQU9YLGtCQUFrQk8sS0FBbEIsRUFBeUJDLEtBQXpCLEVBQWdDTixRQUFoQyxFQUEwQ08sVUFBMUMsQ0FBUDtBQUNEOztBQUVETSxPQUFPQyxPQUFQLEdBQWlCVixlQUFqQiIsImZpbGUiOiJfYmFzZVNvcnRlZEluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VTb3J0ZWRJbmRleEJ5ID0gcmVxdWlyZSgnLi9fYmFzZVNvcnRlZEluZGV4QnknKSxcbiAgICBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdGhlIG1heGltdW0gbGVuZ3RoIGFuZCBpbmRleCBvZiBhbiBhcnJheS4gKi9cbnZhciBNQVhfQVJSQVlfTEVOR1RIID0gNDI5NDk2NzI5NSxcbiAgICBIQUxGX01BWF9BUlJBWV9MRU5HVEggPSBNQVhfQVJSQVlfTEVOR1RIID4+PiAxO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNvcnRlZEluZGV4YCBhbmQgYF8uc29ydGVkTGFzdEluZGV4YCB3aGljaFxuICogcGVyZm9ybXMgYSBiaW5hcnkgc2VhcmNoIG9mIGBhcnJheWAgdG8gZGV0ZXJtaW5lIHRoZSBpbmRleCBhdCB3aGljaCBgdmFsdWVgXG4gKiBzaG91bGQgYmUgaW5zZXJ0ZWQgaW50byBgYXJyYXlgIGluIG9yZGVyIHRvIG1haW50YWluIGl0cyBzb3J0IG9yZGVyLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgc29ydGVkIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBldmFsdWF0ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JldEhpZ2hlc3RdIFNwZWNpZnkgcmV0dXJuaW5nIHRoZSBoaWdoZXN0IHF1YWxpZmllZCBpbmRleC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IGF0IHdoaWNoIGB2YWx1ZWAgc2hvdWxkIGJlIGluc2VydGVkXG4gKiAgaW50byBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBiYXNlU29ydGVkSW5kZXgoYXJyYXksIHZhbHVlLCByZXRIaWdoZXN0KSB7XG4gIHZhciBsb3cgPSAwLFxuICAgICAgaGlnaCA9IGFycmF5ID09IG51bGwgPyBsb3cgOiBhcnJheS5sZW5ndGg7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA9PT0gdmFsdWUgJiYgaGlnaCA8PSBIQUxGX01BWF9BUlJBWV9MRU5HVEgpIHtcbiAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgdmFyIG1pZCA9IChsb3cgKyBoaWdoKSA+Pj4gMSxcbiAgICAgICAgICBjb21wdXRlZCA9IGFycmF5W21pZF07XG5cbiAgICAgIGlmIChjb21wdXRlZCAhPT0gbnVsbCAmJiAhaXNTeW1ib2woY29tcHV0ZWQpICYmXG4gICAgICAgICAgKHJldEhpZ2hlc3QgPyAoY29tcHV0ZWQgPD0gdmFsdWUpIDogKGNvbXB1dGVkIDwgdmFsdWUpKSkge1xuICAgICAgICBsb3cgPSBtaWQgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGlnaCA9IG1pZDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhpZ2g7XG4gIH1cbiAgcmV0dXJuIGJhc2VTb3J0ZWRJbmRleEJ5KGFycmF5LCB2YWx1ZSwgaWRlbnRpdHksIHJldEhpZ2hlc3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VTb3J0ZWRJbmRleDtcbiJdfQ==