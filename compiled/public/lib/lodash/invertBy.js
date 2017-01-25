'use strict';

var baseIteratee = require('./_baseIteratee'),
    createInverter = require('./_createInverter');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * This method is like `_.invert` except that the inverted object is generated
 * from the results of running each element of `object` thru `iteratee`. The
 * corresponding inverted value of each inverted key is an array of keys
 * responsible for generating the inverted value. The iteratee is invoked
 * with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.1.0
 * @category Object
 * @param {Object} object The object to invert.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Object} Returns the new inverted object.
 * @example
 *
 * var object = { 'a': 1, 'b': 2, 'c': 1 };
 *
 * _.invertBy(object);
 * // => { '1': ['a', 'c'], '2': ['b'] }
 *
 * _.invertBy(object, function(value) {
 *   return 'group' + value;
 * });
 * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
 */
var invertBy = createInverter(function (result, value, key) {
  if (hasOwnProperty.call(result, value)) {
    result[value].push(key);
  } else {
    result[value] = [key];
  }
}, baseIteratee);

module.exports = invertBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ludmVydEJ5LmpzIl0sIm5hbWVzIjpbImJhc2VJdGVyYXRlZSIsInJlcXVpcmUiLCJjcmVhdGVJbnZlcnRlciIsIm9iamVjdFByb3RvIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJpbnZlcnRCeSIsInJlc3VsdCIsInZhbHVlIiwia2V5IiwiY2FsbCIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGVBQWVDLFFBQVEsaUJBQVIsQ0FBbkI7QUFBQSxJQUNJQyxpQkFBaUJELFFBQVEsbUJBQVIsQ0FEckI7O0FBR0E7QUFDQSxJQUFJRSxjQUFjQyxPQUFPQyxTQUF6Qjs7QUFFQTtBQUNBLElBQUlDLGlCQUFpQkgsWUFBWUcsY0FBakM7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlDLFdBQVdMLGVBQWUsVUFBU00sTUFBVCxFQUFpQkMsS0FBakIsRUFBd0JDLEdBQXhCLEVBQTZCO0FBQ3pELE1BQUlKLGVBQWVLLElBQWYsQ0FBb0JILE1BQXBCLEVBQTRCQyxLQUE1QixDQUFKLEVBQXdDO0FBQ3RDRCxXQUFPQyxLQUFQLEVBQWNHLElBQWQsQ0FBbUJGLEdBQW5CO0FBQ0QsR0FGRCxNQUVPO0FBQ0xGLFdBQU9DLEtBQVAsSUFBZ0IsQ0FBQ0MsR0FBRCxDQUFoQjtBQUNEO0FBQ0YsQ0FOYyxFQU1aVixZQU5ZLENBQWY7O0FBUUFhLE9BQU9DLE9BQVAsR0FBaUJQLFFBQWpCIiwiZmlsZSI6ImludmVydEJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VJdGVyYXRlZSA9IHJlcXVpcmUoJy4vX2Jhc2VJdGVyYXRlZScpLFxuICAgIGNyZWF0ZUludmVydGVyID0gcmVxdWlyZSgnLi9fY3JlYXRlSW52ZXJ0ZXInKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmludmVydGAgZXhjZXB0IHRoYXQgdGhlIGludmVydGVkIG9iamVjdCBpcyBnZW5lcmF0ZWRcbiAqIGZyb20gdGhlIHJlc3VsdHMgb2YgcnVubmluZyBlYWNoIGVsZW1lbnQgb2YgYG9iamVjdGAgdGhydSBgaXRlcmF0ZWVgLiBUaGVcbiAqIGNvcnJlc3BvbmRpbmcgaW52ZXJ0ZWQgdmFsdWUgb2YgZWFjaCBpbnZlcnRlZCBrZXkgaXMgYW4gYXJyYXkgb2Yga2V5c1xuICogcmVzcG9uc2libGUgZm9yIGdlbmVyYXRpbmcgdGhlIGludmVydGVkIHZhbHVlLiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZFxuICogd2l0aCBvbmUgYXJndW1lbnQ6ICh2YWx1ZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGludmVydC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBpbnZlcnRlZCBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDEgfTtcbiAqXG4gKiBfLmludmVydEJ5KG9iamVjdCk7XG4gKiAvLyA9PiB7ICcxJzogWydhJywgJ2MnXSwgJzInOiBbJ2InXSB9XG4gKlxuICogXy5pbnZlcnRCeShvYmplY3QsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gKiAgIHJldHVybiAnZ3JvdXAnICsgdmFsdWU7XG4gKiB9KTtcbiAqIC8vID0+IHsgJ2dyb3VwMSc6IFsnYScsICdjJ10sICdncm91cDInOiBbJ2InXSB9XG4gKi9cbnZhciBpbnZlcnRCeSA9IGNyZWF0ZUludmVydGVyKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQsIHZhbHVlKSkge1xuICAgIHJlc3VsdFt2YWx1ZV0ucHVzaChrZXkpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdFt2YWx1ZV0gPSBba2V5XTtcbiAgfVxufSwgYmFzZUl0ZXJhdGVlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZlcnRCeTtcbiJdfQ==