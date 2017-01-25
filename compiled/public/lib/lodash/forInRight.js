'use strict';

var baseForRight = require('./_baseForRight'),
    castFunction = require('./_castFunction'),
    keysIn = require('./keysIn');

/**
 * This method is like `_.forIn` except that it iterates over properties of
 * `object` in the opposite order.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forInRight(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
 */
function forInRight(object, iteratee) {
    return object == null ? object : baseForRight(object, castFunction(iteratee), keysIn);
}

module.exports = forInRight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZvckluUmlnaHQuanMiXSwibmFtZXMiOlsiYmFzZUZvclJpZ2h0IiwicmVxdWlyZSIsImNhc3RGdW5jdGlvbiIsImtleXNJbiIsImZvckluUmlnaHQiLCJvYmplY3QiLCJpdGVyYXRlZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZUFBZUMsUUFBUSxpQkFBUixDQUFuQjtBQUFBLElBQ0lDLGVBQWVELFFBQVEsaUJBQVIsQ0FEbkI7QUFBQSxJQUVJRSxTQUFTRixRQUFRLFVBQVIsQ0FGYjs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsU0FBU0csVUFBVCxDQUFvQkMsTUFBcEIsRUFBNEJDLFFBQTVCLEVBQXNDO0FBQ3BDLFdBQU9ELFVBQVUsSUFBVixHQUNIQSxNQURHLEdBRUhMLGFBQWFLLE1BQWIsRUFBcUJILGFBQWFJLFFBQWIsQ0FBckIsRUFBNkNILE1BQTdDLENBRko7QUFHRDs7QUFFREksT0FBT0MsT0FBUCxHQUFpQkosVUFBakIiLCJmaWxlIjoiZm9ySW5SaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlRm9yUmlnaHQgPSByZXF1aXJlKCcuL19iYXNlRm9yUmlnaHQnKSxcbiAgICBjYXN0RnVuY3Rpb24gPSByZXF1aXJlKCcuL19jYXN0RnVuY3Rpb24nKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuL2tleXNJbicpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uZm9ySW5gIGV4Y2VwdCB0aGF0IGl0IGl0ZXJhdGVzIG92ZXIgcHJvcGVydGllcyBvZlxuICogYG9iamVjdGAgaW4gdGhlIG9wcG9zaXRlIG9yZGVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAc2VlIF8uZm9ySW5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5mb3JJblJpZ2h0KG5ldyBGb28sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAqICAgY29uc29sZS5sb2coa2V5KTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyAnYycsICdiJywgdGhlbiAnYScgYXNzdW1pbmcgYF8uZm9ySW5gIGxvZ3MgJ2EnLCAnYicsIHRoZW4gJ2MnLlxuICovXG5mdW5jdGlvbiBmb3JJblJpZ2h0KG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsXG4gICAgPyBvYmplY3RcbiAgICA6IGJhc2VGb3JSaWdodChvYmplY3QsIGNhc3RGdW5jdGlvbihpdGVyYXRlZSksIGtleXNJbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZm9ySW5SaWdodDtcbiJdfQ==