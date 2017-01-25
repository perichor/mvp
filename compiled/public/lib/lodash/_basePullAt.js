'use strict';

var baseUnset = require('./_baseUnset'),
    isIndex = require('./_isIndex');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * The base implementation of `_.pullAt` without support for individual
 * indexes or capturing the removed elements.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns `array`.
 */
function basePullAt(array, indexes) {
  var length = array ? indexes.length : 0,
      lastIndex = length - 1;

  while (length--) {
    var index = indexes[length];
    if (length == lastIndex || index !== previous) {
      var previous = index;
      if (isIndex(index)) {
        splice.call(array, index, 1);
      } else {
        baseUnset(array, index);
      }
    }
  }
  return array;
}

module.exports = basePullAt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlUHVsbEF0LmpzIl0sIm5hbWVzIjpbImJhc2VVbnNldCIsInJlcXVpcmUiLCJpc0luZGV4IiwiYXJyYXlQcm90byIsIkFycmF5IiwicHJvdG90eXBlIiwic3BsaWNlIiwiYmFzZVB1bGxBdCIsImFycmF5IiwiaW5kZXhlcyIsImxlbmd0aCIsImxhc3RJbmRleCIsImluZGV4IiwicHJldmlvdXMiLCJjYWxsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxZQUFZQyxRQUFRLGNBQVIsQ0FBaEI7QUFBQSxJQUNJQyxVQUFVRCxRQUFRLFlBQVIsQ0FEZDs7QUFHQTtBQUNBLElBQUlFLGFBQWFDLE1BQU1DLFNBQXZCOztBQUVBO0FBQ0EsSUFBSUMsU0FBU0gsV0FBV0csTUFBeEI7O0FBRUE7Ozs7Ozs7OztBQVNBLFNBQVNDLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCQyxPQUEzQixFQUFvQztBQUNsQyxNQUFJQyxTQUFTRixRQUFRQyxRQUFRQyxNQUFoQixHQUF5QixDQUF0QztBQUFBLE1BQ0lDLFlBQVlELFNBQVMsQ0FEekI7O0FBR0EsU0FBT0EsUUFBUCxFQUFpQjtBQUNmLFFBQUlFLFFBQVFILFFBQVFDLE1BQVIsQ0FBWjtBQUNBLFFBQUlBLFVBQVVDLFNBQVYsSUFBdUJDLFVBQVVDLFFBQXJDLEVBQStDO0FBQzdDLFVBQUlBLFdBQVdELEtBQWY7QUFDQSxVQUFJVixRQUFRVSxLQUFSLENBQUosRUFBb0I7QUFDbEJOLGVBQU9RLElBQVAsQ0FBWU4sS0FBWixFQUFtQkksS0FBbkIsRUFBMEIsQ0FBMUI7QUFDRCxPQUZELE1BRU87QUFDTFosa0JBQVVRLEtBQVYsRUFBaUJJLEtBQWpCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsU0FBT0osS0FBUDtBQUNEOztBQUVETyxPQUFPQyxPQUFQLEdBQWlCVCxVQUFqQiIsImZpbGUiOiJfYmFzZVB1bGxBdC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlVW5zZXQgPSByZXF1aXJlKCcuL19iYXNlVW5zZXQnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHVsbEF0YCB3aXRob3V0IHN1cHBvcnQgZm9yIGluZGl2aWR1YWxcbiAqIGluZGV4ZXMgb3IgY2FwdHVyaW5nIHRoZSByZW1vdmVkIGVsZW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtudW1iZXJbXX0gaW5kZXhlcyBUaGUgaW5kZXhlcyBvZiBlbGVtZW50cyB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVB1bGxBdChhcnJheSwgaW5kZXhlcykge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPyBpbmRleGVzLmxlbmd0aCA6IDAsXG4gICAgICBsYXN0SW5kZXggPSBsZW5ndGggLSAxO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhciBpbmRleCA9IGluZGV4ZXNbbGVuZ3RoXTtcbiAgICBpZiAobGVuZ3RoID09IGxhc3RJbmRleCB8fCBpbmRleCAhPT0gcHJldmlvdXMpIHtcbiAgICAgIHZhciBwcmV2aW91cyA9IGluZGV4O1xuICAgICAgaWYgKGlzSW5kZXgoaW5kZXgpKSB7XG4gICAgICAgIHNwbGljZS5jYWxsKGFycmF5LCBpbmRleCwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYXNlVW5zZXQoYXJyYXksIGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VQdWxsQXQ7XG4iXX0=