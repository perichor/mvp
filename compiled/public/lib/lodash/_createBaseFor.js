"use strict";

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19jcmVhdGVCYXNlRm9yLmpzIl0sIm5hbWVzIjpbImNyZWF0ZUJhc2VGb3IiLCJmcm9tUmlnaHQiLCJvYmplY3QiLCJpdGVyYXRlZSIsImtleXNGdW5jIiwiaW5kZXgiLCJpdGVyYWJsZSIsIk9iamVjdCIsInByb3BzIiwibGVuZ3RoIiwia2V5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQU9BLFNBQVNBLGFBQVQsQ0FBdUJDLFNBQXZCLEVBQWtDO0FBQ2hDLFNBQU8sVUFBU0MsTUFBVCxFQUFpQkMsUUFBakIsRUFBMkJDLFFBQTNCLEVBQXFDO0FBQzFDLFFBQUlDLFFBQVEsQ0FBQyxDQUFiO0FBQUEsUUFDSUMsV0FBV0MsT0FBT0wsTUFBUCxDQURmO0FBQUEsUUFFSU0sUUFBUUosU0FBU0YsTUFBVCxDQUZaO0FBQUEsUUFHSU8sU0FBU0QsTUFBTUMsTUFIbkI7O0FBS0EsV0FBT0EsUUFBUCxFQUFpQjtBQUNmLFVBQUlDLE1BQU1GLE1BQU1QLFlBQVlRLE1BQVosR0FBcUIsRUFBRUosS0FBN0IsQ0FBVjtBQUNBLFVBQUlGLFNBQVNHLFNBQVNJLEdBQVQsQ0FBVCxFQUF3QkEsR0FBeEIsRUFBNkJKLFFBQTdCLE1BQTJDLEtBQS9DLEVBQXNEO0FBQ3BEO0FBQ0Q7QUFDRjtBQUNELFdBQU9KLE1BQVA7QUFDRCxHQWJEO0FBY0Q7O0FBRURTLE9BQU9DLE9BQVAsR0FBaUJaLGFBQWpCIiwiZmlsZSI6Il9jcmVhdGVCYXNlRm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgbWV0aG9kcyBsaWtlIGBfLmZvckluYCBhbmQgYF8uZm9yT3duYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tmcm9tUmlnaHQgPyBsZW5ndGggOiArK2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQmFzZUZvcjtcbiJdfQ==