'use strict';

var arrayFilter = require('./_arrayFilter'),
    arrayMap = require('./_arrayMap'),
    baseProperty = require('./_baseProperty'),
    baseTimes = require('./_baseTimes'),
    isArrayLikeObject = require('./isArrayLikeObject');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre-zip
 * configuration.
 *
 * @static
 * @memberOf _
 * @since 1.2.0
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @returns {Array} Returns the new array of regrouped elements.
 * @example
 *
 * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 *
 * _.unzip(zipped);
 * // => [['a', 'b'], [1, 2], [true, false]]
 */
function unzip(array) {
  if (!(array && array.length)) {
    return [];
  }
  var length = 0;
  array = arrayFilter(array, function (group) {
    if (isArrayLikeObject(group)) {
      length = nativeMax(group.length, length);
      return true;
    }
  });
  return baseTimes(length, function (index) {
    return arrayMap(array, baseProperty(index));
  });
}

module.exports = unzip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3VuemlwLmpzIl0sIm5hbWVzIjpbImFycmF5RmlsdGVyIiwicmVxdWlyZSIsImFycmF5TWFwIiwiYmFzZVByb3BlcnR5IiwiYmFzZVRpbWVzIiwiaXNBcnJheUxpa2VPYmplY3QiLCJuYXRpdmVNYXgiLCJNYXRoIiwibWF4IiwidW56aXAiLCJhcnJheSIsImxlbmd0aCIsImdyb3VwIiwiaW5kZXgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGNBQWNDLFFBQVEsZ0JBQVIsQ0FBbEI7QUFBQSxJQUNJQyxXQUFXRCxRQUFRLGFBQVIsQ0FEZjtBQUFBLElBRUlFLGVBQWVGLFFBQVEsaUJBQVIsQ0FGbkI7QUFBQSxJQUdJRyxZQUFZSCxRQUFRLGNBQVIsQ0FIaEI7QUFBQSxJQUlJSSxvQkFBb0JKLFFBQVEscUJBQVIsQ0FKeEI7O0FBTUE7QUFDQSxJQUFJSyxZQUFZQyxLQUFLQyxHQUFyQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxTQUFTQyxLQUFULENBQWVDLEtBQWYsRUFBc0I7QUFDcEIsTUFBSSxFQUFFQSxTQUFTQSxNQUFNQyxNQUFqQixDQUFKLEVBQThCO0FBQzVCLFdBQU8sRUFBUDtBQUNEO0FBQ0QsTUFBSUEsU0FBUyxDQUFiO0FBQ0FELFVBQVFWLFlBQVlVLEtBQVosRUFBbUIsVUFBU0UsS0FBVCxFQUFnQjtBQUN6QyxRQUFJUCxrQkFBa0JPLEtBQWxCLENBQUosRUFBOEI7QUFDNUJELGVBQVNMLFVBQVVNLE1BQU1ELE1BQWhCLEVBQXdCQSxNQUF4QixDQUFUO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7QUFDRixHQUxPLENBQVI7QUFNQSxTQUFPUCxVQUFVTyxNQUFWLEVBQWtCLFVBQVNFLEtBQVQsRUFBZ0I7QUFDdkMsV0FBT1gsU0FBU1EsS0FBVCxFQUFnQlAsYUFBYVUsS0FBYixDQUFoQixDQUFQO0FBQ0QsR0FGTSxDQUFQO0FBR0Q7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUJOLEtBQWpCIiwiZmlsZSI6InVuemlwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFycmF5RmlsdGVyID0gcmVxdWlyZSgnLi9fYXJyYXlGaWx0ZXInKSxcbiAgICBhcnJheU1hcCA9IHJlcXVpcmUoJy4vX2FycmF5TWFwJyksXG4gICAgYmFzZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fYmFzZVByb3BlcnR5JyksXG4gICAgYmFzZVRpbWVzID0gcmVxdWlyZSgnLi9fYmFzZVRpbWVzJyksXG4gICAgaXNBcnJheUxpa2VPYmplY3QgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlT2JqZWN0Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnppcGAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBhbiBhcnJheSBvZiBncm91cGVkXG4gKiBlbGVtZW50cyBhbmQgY3JlYXRlcyBhbiBhcnJheSByZWdyb3VwaW5nIHRoZSBlbGVtZW50cyB0byB0aGVpciBwcmUtemlwXG4gKiBjb25maWd1cmF0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMS4yLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IG9mIGdyb3VwZWQgZWxlbWVudHMgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIHJlZ3JvdXBlZCBlbGVtZW50cy5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHppcHBlZCA9IF8uemlwKFsnYScsICdiJ10sIFsxLCAyXSwgW3RydWUsIGZhbHNlXSk7XG4gKiAvLyA9PiBbWydhJywgMSwgdHJ1ZV0sIFsnYicsIDIsIGZhbHNlXV1cbiAqXG4gKiBfLnVuemlwKHppcHBlZCk7XG4gKiAvLyA9PiBbWydhJywgJ2InXSwgWzEsIDJdLCBbdHJ1ZSwgZmFsc2VdXVxuICovXG5mdW5jdGlvbiB1bnppcChhcnJheSkge1xuICBpZiAoIShhcnJheSAmJiBhcnJheS5sZW5ndGgpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHZhciBsZW5ndGggPSAwO1xuICBhcnJheSA9IGFycmF5RmlsdGVyKGFycmF5LCBmdW5jdGlvbihncm91cCkge1xuICAgIGlmIChpc0FycmF5TGlrZU9iamVjdChncm91cCkpIHtcbiAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChncm91cC5sZW5ndGgsIGxlbmd0aCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYmFzZVRpbWVzKGxlbmd0aCwgZnVuY3Rpb24oaW5kZXgpIHtcbiAgICByZXR1cm4gYXJyYXlNYXAoYXJyYXksIGJhc2VQcm9wZXJ0eShpbmRleCkpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bnppcDtcbiJdfQ==