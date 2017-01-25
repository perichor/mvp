'use strict';

var toInteger = require('./toInteger'),
    toLength = require('./toLength');

/**
 * The base implementation of `_.fill` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to fill.
 * @param {*} value The value to fill `array` with.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns `array`.
 */
function baseFill(array, value, start, end) {
  var length = array.length;

  start = toInteger(start);
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end === undefined || end > length ? length : toInteger(end);
  if (end < 0) {
    end += length;
  }
  end = start > end ? 0 : toLength(end);
  while (start < end) {
    array[start++] = value;
  }
  return array;
}

module.exports = baseFill;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlRmlsbC5qcyJdLCJuYW1lcyI6WyJ0b0ludGVnZXIiLCJyZXF1aXJlIiwidG9MZW5ndGgiLCJiYXNlRmlsbCIsImFycmF5IiwidmFsdWUiLCJzdGFydCIsImVuZCIsImxlbmd0aCIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsWUFBWUMsUUFBUSxhQUFSLENBQWhCO0FBQUEsSUFDSUMsV0FBV0QsUUFBUSxZQUFSLENBRGY7O0FBR0E7Ozs7Ozs7Ozs7QUFVQSxTQUFTRSxRQUFULENBQWtCQyxLQUFsQixFQUF5QkMsS0FBekIsRUFBZ0NDLEtBQWhDLEVBQXVDQyxHQUF2QyxFQUE0QztBQUMxQyxNQUFJQyxTQUFTSixNQUFNSSxNQUFuQjs7QUFFQUYsVUFBUU4sVUFBVU0sS0FBVixDQUFSO0FBQ0EsTUFBSUEsUUFBUSxDQUFaLEVBQWU7QUFDYkEsWUFBUSxDQUFDQSxLQUFELEdBQVNFLE1BQVQsR0FBa0IsQ0FBbEIsR0FBdUJBLFNBQVNGLEtBQXhDO0FBQ0Q7QUFDREMsUUFBT0EsUUFBUUUsU0FBUixJQUFxQkYsTUFBTUMsTUFBNUIsR0FBc0NBLE1BQXRDLEdBQStDUixVQUFVTyxHQUFWLENBQXJEO0FBQ0EsTUFBSUEsTUFBTSxDQUFWLEVBQWE7QUFDWEEsV0FBT0MsTUFBUDtBQUNEO0FBQ0RELFFBQU1ELFFBQVFDLEdBQVIsR0FBYyxDQUFkLEdBQWtCTCxTQUFTSyxHQUFULENBQXhCO0FBQ0EsU0FBT0QsUUFBUUMsR0FBZixFQUFvQjtBQUNsQkgsVUFBTUUsT0FBTixJQUFpQkQsS0FBakI7QUFDRDtBQUNELFNBQU9ELEtBQVA7QUFDRDs7QUFFRE0sT0FBT0MsT0FBUCxHQUFpQlIsUUFBakIiLCJmaWxlIjoiX2Jhc2VGaWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vdG9JbnRlZ2VyJyksXG4gICAgdG9MZW5ndGggPSByZXF1aXJlKCcuL3RvTGVuZ3RoJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmlsbGAgd2l0aG91dCBhbiBpdGVyYXRlZSBjYWxsIGd1YXJkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gZmlsbC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGZpbGwgYGFycmF5YCB3aXRoLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD0wXSBUaGUgc3RhcnQgcG9zaXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2VuZD1hcnJheS5sZW5ndGhdIFRoZSBlbmQgcG9zaXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbGwoYXJyYXksIHZhbHVlLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgc3RhcnQgPSB0b0ludGVnZXIoc3RhcnQpO1xuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAtc3RhcnQgPiBsZW5ndGggPyAwIDogKGxlbmd0aCArIHN0YXJ0KTtcbiAgfVxuICBlbmQgPSAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gbGVuZ3RoKSA/IGxlbmd0aCA6IHRvSW50ZWdlcihlbmQpO1xuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5ndGg7XG4gIH1cbiAgZW5kID0gc3RhcnQgPiBlbmQgPyAwIDogdG9MZW5ndGgoZW5kKTtcbiAgd2hpbGUgKHN0YXJ0IDwgZW5kKSB7XG4gICAgYXJyYXlbc3RhcnQrK10gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZpbGw7XG4iXX0=