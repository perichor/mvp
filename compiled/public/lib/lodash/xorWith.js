'use strict';

var arrayFilter = require('./_arrayFilter'),
    baseRest = require('./_baseRest'),
    baseXor = require('./_baseXor'),
    isArrayLikeObject = require('./isArrayLikeObject'),
    last = require('./last');

/**
 * This method is like `_.xor` except that it accepts `comparator` which is
 * invoked to compare elements of `arrays`. The order of result values is
 * determined by the order they occur in the arrays. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 *
 * _.xorWith(objects, others, _.isEqual);
 * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 */
var xorWith = baseRest(function (arrays) {
  var comparator = last(arrays);
  comparator = typeof comparator == 'function' ? comparator : undefined;
  return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
});

module.exports = xorWith;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3hvcldpdGguanMiXSwibmFtZXMiOlsiYXJyYXlGaWx0ZXIiLCJyZXF1aXJlIiwiYmFzZVJlc3QiLCJiYXNlWG9yIiwiaXNBcnJheUxpa2VPYmplY3QiLCJsYXN0IiwieG9yV2l0aCIsImFycmF5cyIsImNvbXBhcmF0b3IiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGNBQWNDLFFBQVEsZ0JBQVIsQ0FBbEI7QUFBQSxJQUNJQyxXQUFXRCxRQUFRLGFBQVIsQ0FEZjtBQUFBLElBRUlFLFVBQVVGLFFBQVEsWUFBUixDQUZkO0FBQUEsSUFHSUcsb0JBQW9CSCxRQUFRLHFCQUFSLENBSHhCO0FBQUEsSUFJSUksT0FBT0osUUFBUSxRQUFSLENBSlg7O0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxJQUFJSyxVQUFVSixTQUFTLFVBQVNLLE1BQVQsRUFBaUI7QUFDdEMsTUFBSUMsYUFBYUgsS0FBS0UsTUFBTCxDQUFqQjtBQUNBQyxlQUFhLE9BQU9BLFVBQVAsSUFBcUIsVUFBckIsR0FBa0NBLFVBQWxDLEdBQStDQyxTQUE1RDtBQUNBLFNBQU9OLFFBQVFILFlBQVlPLE1BQVosRUFBb0JILGlCQUFwQixDQUFSLEVBQWdESyxTQUFoRCxFQUEyREQsVUFBM0QsQ0FBUDtBQUNELENBSmEsQ0FBZDs7QUFNQUUsT0FBT0MsT0FBUCxHQUFpQkwsT0FBakIiLCJmaWxlIjoieG9yV2l0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcnJheUZpbHRlciA9IHJlcXVpcmUoJy4vX2FycmF5RmlsdGVyJyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpLFxuICAgIGJhc2VYb3IgPSByZXF1aXJlKCcuL19iYXNlWG9yJyksXG4gICAgaXNBcnJheUxpa2VPYmplY3QgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlT2JqZWN0JyksXG4gICAgbGFzdCA9IHJlcXVpcmUoJy4vbGFzdCcpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8ueG9yYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGBjb21wYXJhdG9yYCB3aGljaCBpc1xuICogaW52b2tlZCB0byBjb21wYXJlIGVsZW1lbnRzIG9mIGBhcnJheXNgLiBUaGUgb3JkZXIgb2YgcmVzdWx0IHZhbHVlcyBpc1xuICogZGV0ZXJtaW5lZCBieSB0aGUgb3JkZXIgdGhleSBvY2N1ciBpbiB0aGUgYXJyYXlzLiBUaGUgY29tcGFyYXRvciBpcyBpbnZva2VkXG4gKiB3aXRoIHR3byBhcmd1bWVudHM6IChhcnJWYWwsIG90aFZhbCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0gey4uLkFycmF5fSBbYXJyYXlzXSBUaGUgYXJyYXlzIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyYXRvcl0gVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGZpbHRlcmVkIHZhbHVlcy5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBbeyAneCc6IDEsICd5JzogMiB9LCB7ICd4JzogMiwgJ3knOiAxIH1dO1xuICogdmFyIG90aGVycyA9IFt7ICd4JzogMSwgJ3knOiAxIH0sIHsgJ3gnOiAxLCAneSc6IDIgfV07XG4gKlxuICogXy54b3JXaXRoKG9iamVjdHMsIG90aGVycywgXy5pc0VxdWFsKTtcbiAqIC8vID0+IFt7ICd4JzogMiwgJ3knOiAxIH0sIHsgJ3gnOiAxLCAneSc6IDEgfV1cbiAqL1xudmFyIHhvcldpdGggPSBiYXNlUmVzdChmdW5jdGlvbihhcnJheXMpIHtcbiAgdmFyIGNvbXBhcmF0b3IgPSBsYXN0KGFycmF5cyk7XG4gIGNvbXBhcmF0b3IgPSB0eXBlb2YgY29tcGFyYXRvciA9PSAnZnVuY3Rpb24nID8gY29tcGFyYXRvciA6IHVuZGVmaW5lZDtcbiAgcmV0dXJuIGJhc2VYb3IoYXJyYXlGaWx0ZXIoYXJyYXlzLCBpc0FycmF5TGlrZU9iamVjdCksIHVuZGVmaW5lZCwgY29tcGFyYXRvcik7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB4b3JXaXRoO1xuIl19