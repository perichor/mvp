"use strict";

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19jb3B5QXJyYXkuanMiXSwibmFtZXMiOlsiY29weUFycmF5Iiwic291cmNlIiwiYXJyYXkiLCJpbmRleCIsImxlbmd0aCIsIkFycmF5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7QUFRQSxTQUFTQSxTQUFULENBQW1CQyxNQUFuQixFQUEyQkMsS0FBM0IsRUFBa0M7QUFDaEMsTUFBSUMsUUFBUSxDQUFDLENBQWI7QUFBQSxNQUNJQyxTQUFTSCxPQUFPRyxNQURwQjs7QUFHQUYsWUFBVUEsUUFBUUcsTUFBTUQsTUFBTixDQUFsQjtBQUNBLFNBQU8sRUFBRUQsS0FBRixHQUFVQyxNQUFqQixFQUF5QjtBQUN2QkYsVUFBTUMsS0FBTixJQUFlRixPQUFPRSxLQUFQLENBQWY7QUFDRDtBQUNELFNBQU9ELEtBQVA7QUFDRDs7QUFFREksT0FBT0MsT0FBUCxHQUFpQlAsU0FBakIiLCJmaWxlIjoiX2NvcHlBcnJheS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlBcnJheTtcbiJdfQ==