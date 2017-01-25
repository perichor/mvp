"use strict";

/**
 * The base implementation of `_.sum` and `_.sumBy` without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the sum.
 */
function baseSum(array, iteratee) {
  var result,
      index = -1,
      length = array.length;

  while (++index < length) {
    var current = iteratee(array[index]);
    if (current !== undefined) {
      result = result === undefined ? current : result + current;
    }
  }
  return result;
}

module.exports = baseSum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlU3VtLmpzIl0sIm5hbWVzIjpbImJhc2VTdW0iLCJhcnJheSIsIml0ZXJhdGVlIiwicmVzdWx0IiwiaW5kZXgiLCJsZW5ndGgiLCJjdXJyZW50IiwidW5kZWZpbmVkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7O0FBU0EsU0FBU0EsT0FBVCxDQUFpQkMsS0FBakIsRUFBd0JDLFFBQXhCLEVBQWtDO0FBQ2hDLE1BQUlDLE1BQUo7QUFBQSxNQUNJQyxRQUFRLENBQUMsQ0FEYjtBQUFBLE1BRUlDLFNBQVNKLE1BQU1JLE1BRm5COztBQUlBLFNBQU8sRUFBRUQsS0FBRixHQUFVQyxNQUFqQixFQUF5QjtBQUN2QixRQUFJQyxVQUFVSixTQUFTRCxNQUFNRyxLQUFOLENBQVQsQ0FBZDtBQUNBLFFBQUlFLFlBQVlDLFNBQWhCLEVBQTJCO0FBQ3pCSixlQUFTQSxXQUFXSSxTQUFYLEdBQXVCRCxPQUF2QixHQUFrQ0gsU0FBU0csT0FBcEQ7QUFDRDtBQUNGO0FBQ0QsU0FBT0gsTUFBUDtBQUNEOztBQUVESyxPQUFPQyxPQUFQLEdBQWlCVCxPQUFqQiIsImZpbGUiOiJfYmFzZVN1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uc3VtYCBhbmQgYF8uc3VtQnlgIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgc3VtLlxuICovXG5mdW5jdGlvbiBiYXNlU3VtKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgcmVzdWx0LFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBjdXJyZW50ID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdKTtcbiAgICBpZiAoY3VycmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQgPT09IHVuZGVmaW5lZCA/IGN1cnJlbnQgOiAocmVzdWx0ICsgY3VycmVudCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVN1bTtcbiJdfQ==