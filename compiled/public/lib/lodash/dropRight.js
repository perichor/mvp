'use strict';

var baseSlice = require('./_baseSlice'),
    toInteger = require('./toInteger');

/**
 * Creates a slice of `array` with `n` elements dropped from the end.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to drop.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.dropRight([1, 2, 3]);
 * // => [1, 2]
 *
 * _.dropRight([1, 2, 3], 2);
 * // => [1]
 *
 * _.dropRight([1, 2, 3], 5);
 * // => []
 *
 * _.dropRight([1, 2, 3], 0);
 * // => [1, 2, 3]
 */
function dropRight(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = guard || n === undefined ? 1 : toInteger(n);
  n = length - n;
  return baseSlice(array, 0, n < 0 ? 0 : n);
}

module.exports = dropRight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2Ryb3BSaWdodC5qcyJdLCJuYW1lcyI6WyJiYXNlU2xpY2UiLCJyZXF1aXJlIiwidG9JbnRlZ2VyIiwiZHJvcFJpZ2h0IiwiYXJyYXkiLCJuIiwiZ3VhcmQiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVlDLFFBQVEsY0FBUixDQUFoQjtBQUFBLElBQ0lDLFlBQVlELFFBQVEsYUFBUixDQURoQjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxTQUFTRSxTQUFULENBQW1CQyxLQUFuQixFQUEwQkMsQ0FBMUIsRUFBNkJDLEtBQTdCLEVBQW9DO0FBQ2xDLE1BQUlDLFNBQVNILFNBQVMsSUFBVCxHQUFnQixDQUFoQixHQUFvQkEsTUFBTUcsTUFBdkM7QUFDQSxNQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYLFdBQU8sRUFBUDtBQUNEO0FBQ0RGLE1BQUtDLFNBQVNELE1BQU1HLFNBQWhCLEdBQTZCLENBQTdCLEdBQWlDTixVQUFVRyxDQUFWLENBQXJDO0FBQ0FBLE1BQUlFLFNBQVNGLENBQWI7QUFDQSxTQUFPTCxVQUFVSSxLQUFWLEVBQWlCLENBQWpCLEVBQW9CQyxJQUFJLENBQUosR0FBUSxDQUFSLEdBQVlBLENBQWhDLENBQVA7QUFDRDs7QUFFREksT0FBT0MsT0FBUCxHQUFpQlAsU0FBakIiLCJmaWxlIjoiZHJvcFJpZ2h0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VTbGljZSA9IHJlcXVpcmUoJy4vX2Jhc2VTbGljZScpLFxuICAgIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vdG9JbnRlZ2VyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNsaWNlIG9mIGBhcnJheWAgd2l0aCBgbmAgZWxlbWVudHMgZHJvcHBlZCBmcm9tIHRoZSBlbmQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge251bWJlcn0gW249MV0gVGhlIG51bWJlciBvZiBlbGVtZW50cyB0byBkcm9wLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgc2xpY2Ugb2YgYGFycmF5YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kcm9wUmlnaHQoWzEsIDIsIDNdKTtcbiAqIC8vID0+IFsxLCAyXVxuICpcbiAqIF8uZHJvcFJpZ2h0KFsxLCAyLCAzXSwgMik7XG4gKiAvLyA9PiBbMV1cbiAqXG4gKiBfLmRyb3BSaWdodChbMSwgMiwgM10sIDUpO1xuICogLy8gPT4gW11cbiAqXG4gKiBfLmRyb3BSaWdodChbMSwgMiwgM10sIDApO1xuICogLy8gPT4gWzEsIDIsIDNdXG4gKi9cbmZ1bmN0aW9uIGRyb3BSaWdodChhcnJheSwgbiwgZ3VhcmQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuICBpZiAoIWxlbmd0aCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBuID0gKGd1YXJkIHx8IG4gPT09IHVuZGVmaW5lZCkgPyAxIDogdG9JbnRlZ2VyKG4pO1xuICBuID0gbGVuZ3RoIC0gbjtcbiAgcmV0dXJuIGJhc2VTbGljZShhcnJheSwgMCwgbiA8IDAgPyAwIDogbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZHJvcFJpZ2h0O1xuIl19