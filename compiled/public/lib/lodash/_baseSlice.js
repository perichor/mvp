"use strict";

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlU2xpY2UuanMiXSwibmFtZXMiOlsiYmFzZVNsaWNlIiwiYXJyYXkiLCJzdGFydCIsImVuZCIsImluZGV4IiwibGVuZ3RoIiwicmVzdWx0IiwiQXJyYXkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7QUFTQSxTQUFTQSxTQUFULENBQW1CQyxLQUFuQixFQUEwQkMsS0FBMUIsRUFBaUNDLEdBQWpDLEVBQXNDO0FBQ3BDLE1BQUlDLFFBQVEsQ0FBQyxDQUFiO0FBQUEsTUFDSUMsU0FBU0osTUFBTUksTUFEbkI7O0FBR0EsTUFBSUgsUUFBUSxDQUFaLEVBQWU7QUFDYkEsWUFBUSxDQUFDQSxLQUFELEdBQVNHLE1BQVQsR0FBa0IsQ0FBbEIsR0FBdUJBLFNBQVNILEtBQXhDO0FBQ0Q7QUFDREMsUUFBTUEsTUFBTUUsTUFBTixHQUFlQSxNQUFmLEdBQXdCRixHQUE5QjtBQUNBLE1BQUlBLE1BQU0sQ0FBVixFQUFhO0FBQ1hBLFdBQU9FLE1BQVA7QUFDRDtBQUNEQSxXQUFTSCxRQUFRQyxHQUFSLEdBQWMsQ0FBZCxHQUFvQkEsTUFBTUQsS0FBUCxLQUFrQixDQUE5QztBQUNBQSxhQUFXLENBQVg7O0FBRUEsTUFBSUksU0FBU0MsTUFBTUYsTUFBTixDQUFiO0FBQ0EsU0FBTyxFQUFFRCxLQUFGLEdBQVVDLE1BQWpCLEVBQXlCO0FBQ3ZCQyxXQUFPRixLQUFQLElBQWdCSCxNQUFNRyxRQUFRRixLQUFkLENBQWhCO0FBQ0Q7QUFDRCxTQUFPSSxNQUFQO0FBQ0Q7O0FBRURFLE9BQU9DLE9BQVAsR0FBaUJULFNBQWpCIiwiZmlsZSI6Il9iYXNlU2xpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNsaWNlYCB3aXRob3V0IGFuIGl0ZXJhdGVlIGNhbGwgZ3VhcmQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzbGljZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9MF0gVGhlIHN0YXJ0IHBvc2l0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtlbmQ9YXJyYXkubGVuZ3RoXSBUaGUgZW5kIHBvc2l0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBzbGljZSBvZiBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBiYXNlU2xpY2UoYXJyYXksIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gLXN0YXJ0ID4gbGVuZ3RoID8gMCA6IChsZW5ndGggKyBzdGFydCk7XG4gIH1cbiAgZW5kID0gZW5kID4gbGVuZ3RoID8gbGVuZ3RoIDogZW5kO1xuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5ndGg7XG4gIH1cbiAgbGVuZ3RoID0gc3RhcnQgPiBlbmQgPyAwIDogKChlbmQgLSBzdGFydCkgPj4+IDApO1xuICBzdGFydCA+Pj49IDA7XG5cbiAgdmFyIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGFycmF5W2luZGV4ICsgc3RhcnRdO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVNsaWNlO1xuIl19