'use strict';

var baseForOwnRight = require('./_baseForOwnRight'),
    castFunction = require('./_castFunction');

/**
 * This method is like `_.forOwn` except that it iterates over properties of
 * `object` in the opposite order.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forOwn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forOwnRight(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
 */
function forOwnRight(object, iteratee) {
  return object && baseForOwnRight(object, castFunction(iteratee));
}

module.exports = forOwnRight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2Zvck93blJpZ2h0LmpzIl0sIm5hbWVzIjpbImJhc2VGb3JPd25SaWdodCIsInJlcXVpcmUiLCJjYXN0RnVuY3Rpb24iLCJmb3JPd25SaWdodCIsIm9iamVjdCIsIml0ZXJhdGVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxrQkFBa0JDLFFBQVEsb0JBQVIsQ0FBdEI7QUFBQSxJQUNJQyxlQUFlRCxRQUFRLGlCQUFSLENBRG5COztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxTQUFTRSxXQUFULENBQXFCQyxNQUFyQixFQUE2QkMsUUFBN0IsRUFBdUM7QUFDckMsU0FBT0QsVUFBVUosZ0JBQWdCSSxNQUFoQixFQUF3QkYsYUFBYUcsUUFBYixDQUF4QixDQUFqQjtBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCSixXQUFqQiIsImZpbGUiOiJmb3JPd25SaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlRm9yT3duUmlnaHQgPSByZXF1aXJlKCcuL19iYXNlRm9yT3duUmlnaHQnKSxcbiAgICBjYXN0RnVuY3Rpb24gPSByZXF1aXJlKCcuL19jYXN0RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmZvck93bmAgZXhjZXB0IHRoYXQgaXQgaXRlcmF0ZXMgb3ZlciBwcm9wZXJ0aWVzIG9mXG4gKiBgb2JqZWN0YCBpbiB0aGUgb3Bwb3NpdGUgb3JkZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBzZWUgXy5mb3JPd25cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5mb3JPd25SaWdodChuZXcgRm9vLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gKiAgIGNvbnNvbGUubG9nKGtleSk7XG4gKiB9KTtcbiAqIC8vID0+IExvZ3MgJ2InIHRoZW4gJ2EnIGFzc3VtaW5nIGBfLmZvck93bmAgbG9ncyAnYScgdGhlbiAnYicuXG4gKi9cbmZ1bmN0aW9uIGZvck93blJpZ2h0KG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBiYXNlRm9yT3duUmlnaHQob2JqZWN0LCBjYXN0RnVuY3Rpb24oaXRlcmF0ZWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmb3JPd25SaWdodDtcbiJdfQ==