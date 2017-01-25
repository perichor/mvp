'use strict';

var baseSlice = require('./_baseSlice'),
    isIterateeCall = require('./_isIterateeCall'),
    toInteger = require('./toInteger');

/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function slice(array, start, end) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
    start = 0;
    end = length;
  } else {
    start = start == null ? 0 : toInteger(start);
    end = end === undefined ? length : toInteger(end);
  }
  return baseSlice(array, start, end);
}

module.exports = slice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NsaWNlLmpzIl0sIm5hbWVzIjpbImJhc2VTbGljZSIsInJlcXVpcmUiLCJpc0l0ZXJhdGVlQ2FsbCIsInRvSW50ZWdlciIsInNsaWNlIiwiYXJyYXkiLCJzdGFydCIsImVuZCIsImxlbmd0aCIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsWUFBWUMsUUFBUSxjQUFSLENBQWhCO0FBQUEsSUFDSUMsaUJBQWlCRCxRQUFRLG1CQUFSLENBRHJCO0FBQUEsSUFFSUUsWUFBWUYsUUFBUSxhQUFSLENBRmhCOztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBLFNBQVNHLEtBQVQsQ0FBZUMsS0FBZixFQUFzQkMsS0FBdEIsRUFBNkJDLEdBQTdCLEVBQWtDO0FBQ2hDLE1BQUlDLFNBQVNILFNBQVMsSUFBVCxHQUFnQixDQUFoQixHQUFvQkEsTUFBTUcsTUFBdkM7QUFDQSxNQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYLFdBQU8sRUFBUDtBQUNEO0FBQ0QsTUFBSUQsT0FBTyxPQUFPQSxHQUFQLElBQWMsUUFBckIsSUFBaUNMLGVBQWVHLEtBQWYsRUFBc0JDLEtBQXRCLEVBQTZCQyxHQUE3QixDQUFyQyxFQUF3RTtBQUN0RUQsWUFBUSxDQUFSO0FBQ0FDLFVBQU1DLE1BQU47QUFDRCxHQUhELE1BSUs7QUFDSEYsWUFBUUEsU0FBUyxJQUFULEdBQWdCLENBQWhCLEdBQW9CSCxVQUFVRyxLQUFWLENBQTVCO0FBQ0FDLFVBQU1BLFFBQVFFLFNBQVIsR0FBb0JELE1BQXBCLEdBQTZCTCxVQUFVSSxHQUFWLENBQW5DO0FBQ0Q7QUFDRCxTQUFPUCxVQUFVSyxLQUFWLEVBQWlCQyxLQUFqQixFQUF3QkMsR0FBeEIsQ0FBUDtBQUNEOztBQUVERyxPQUFPQyxPQUFQLEdBQWlCUCxLQUFqQiIsImZpbGUiOiJzbGljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlU2xpY2UgPSByZXF1aXJlKCcuL19iYXNlU2xpY2UnKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJy4vX2lzSXRlcmF0ZWVDYWxsJyksXG4gICAgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi90b0ludGVnZXInKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc2xpY2Ugb2YgYGFycmF5YCBmcm9tIGBzdGFydGAgdXAgdG8sIGJ1dCBub3QgaW5jbHVkaW5nLCBgZW5kYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgdXNlZCBpbnN0ZWFkIG9mXG4gKiBbYEFycmF5I3NsaWNlYF0oaHR0cHM6Ly9tZG4uaW8vQXJyYXkvc2xpY2UpIHRvIGVuc3VyZSBkZW5zZSBhcnJheXMgYXJlXG4gKiByZXR1cm5lZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzbGljZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9MF0gVGhlIHN0YXJ0IHBvc2l0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtlbmQ9YXJyYXkubGVuZ3RoXSBUaGUgZW5kIHBvc2l0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBzbGljZSBvZiBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBzbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmIChlbmQgJiYgdHlwZW9mIGVuZCAhPSAnbnVtYmVyJyAmJiBpc0l0ZXJhdGVlQ2FsbChhcnJheSwgc3RhcnQsIGVuZCkpIHtcbiAgICBzdGFydCA9IDA7XG4gICAgZW5kID0gbGVuZ3RoO1xuICB9XG4gIGVsc2Uge1xuICAgIHN0YXJ0ID0gc3RhcnQgPT0gbnVsbCA/IDAgOiB0b0ludGVnZXIoc3RhcnQpO1xuICAgIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogdG9JbnRlZ2VyKGVuZCk7XG4gIH1cbiAgcmV0dXJuIGJhc2VTbGljZShhcnJheSwgc3RhcnQsIGVuZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2xpY2U7XG4iXX0=