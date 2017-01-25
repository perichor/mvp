'use strict';

var baseFlatten = require('./_baseFlatten'),
    baseRest = require('./_baseRest'),
    baseUniq = require('./_baseUniq'),
    isArrayLikeObject = require('./isArrayLikeObject'),
    last = require('./last');

/**
 * This method is like `_.union` except that it accepts `comparator` which
 * is invoked to compare elements of `arrays`. Result values are chosen from
 * the first array in which the value occurs. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 *
 * _.unionWith(objects, others, _.isEqual);
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 */
var unionWith = baseRest(function (arrays) {
  var comparator = last(arrays);
  comparator = typeof comparator == 'function' ? comparator : undefined;
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
});

module.exports = unionWith;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3VuaW9uV2l0aC5qcyJdLCJuYW1lcyI6WyJiYXNlRmxhdHRlbiIsInJlcXVpcmUiLCJiYXNlUmVzdCIsImJhc2VVbmlxIiwiaXNBcnJheUxpa2VPYmplY3QiLCJsYXN0IiwidW5pb25XaXRoIiwiYXJyYXlzIiwiY29tcGFyYXRvciIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsY0FBY0MsUUFBUSxnQkFBUixDQUFsQjtBQUFBLElBQ0lDLFdBQVdELFFBQVEsYUFBUixDQURmO0FBQUEsSUFFSUUsV0FBV0YsUUFBUSxhQUFSLENBRmY7QUFBQSxJQUdJRyxvQkFBb0JILFFBQVEscUJBQVIsQ0FIeEI7QUFBQSxJQUlJSSxPQUFPSixRQUFRLFFBQVIsQ0FKWDs7QUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLElBQUlLLFlBQVlKLFNBQVMsVUFBU0ssTUFBVCxFQUFpQjtBQUN4QyxNQUFJQyxhQUFhSCxLQUFLRSxNQUFMLENBQWpCO0FBQ0FDLGVBQWEsT0FBT0EsVUFBUCxJQUFxQixVQUFyQixHQUFrQ0EsVUFBbEMsR0FBK0NDLFNBQTVEO0FBQ0EsU0FBT04sU0FBU0gsWUFBWU8sTUFBWixFQUFvQixDQUFwQixFQUF1QkgsaUJBQXZCLEVBQTBDLElBQTFDLENBQVQsRUFBMERLLFNBQTFELEVBQXFFRCxVQUFyRSxDQUFQO0FBQ0QsQ0FKZSxDQUFoQjs7QUFNQUUsT0FBT0MsT0FBUCxHQUFpQkwsU0FBakIiLCJmaWxlIjoidW5pb25XaXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VGbGF0dGVuID0gcmVxdWlyZSgnLi9fYmFzZUZsYXR0ZW4nKSxcbiAgICBiYXNlUmVzdCA9IHJlcXVpcmUoJy4vX2Jhc2VSZXN0JyksXG4gICAgYmFzZVVuaXEgPSByZXF1aXJlKCcuL19iYXNlVW5pcScpLFxuICAgIGlzQXJyYXlMaWtlT2JqZWN0ID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZU9iamVjdCcpLFxuICAgIGxhc3QgPSByZXF1aXJlKCcuL2xhc3QnKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnVuaW9uYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGBjb21wYXJhdG9yYCB3aGljaFxuICogaXMgaW52b2tlZCB0byBjb21wYXJlIGVsZW1lbnRzIG9mIGBhcnJheXNgLiBSZXN1bHQgdmFsdWVzIGFyZSBjaG9zZW4gZnJvbVxuICogdGhlIGZpcnN0IGFycmF5IGluIHdoaWNoIHRoZSB2YWx1ZSBvY2N1cnMuIFRoZSBjb21wYXJhdG9yIGlzIGludm9rZWRcbiAqIHdpdGggdHdvIGFyZ3VtZW50czogKGFyclZhbCwgb3RoVmFsKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7Li4uQXJyYXl9IFthcnJheXNdIFRoZSBhcnJheXMgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wYXJhdG9yXSBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgYXJyYXkgb2YgY29tYmluZWQgdmFsdWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IFt7ICd4JzogMSwgJ3knOiAyIH0sIHsgJ3gnOiAyLCAneSc6IDEgfV07XG4gKiB2YXIgb3RoZXJzID0gW3sgJ3gnOiAxLCAneSc6IDEgfSwgeyAneCc6IDEsICd5JzogMiB9XTtcbiAqXG4gKiBfLnVuaW9uV2l0aChvYmplY3RzLCBvdGhlcnMsIF8uaXNFcXVhbCk7XG4gKiAvLyA9PiBbeyAneCc6IDEsICd5JzogMiB9LCB7ICd4JzogMiwgJ3knOiAxIH0sIHsgJ3gnOiAxLCAneSc6IDEgfV1cbiAqL1xudmFyIHVuaW9uV2l0aCA9IGJhc2VSZXN0KGZ1bmN0aW9uKGFycmF5cykge1xuICB2YXIgY29tcGFyYXRvciA9IGxhc3QoYXJyYXlzKTtcbiAgY29tcGFyYXRvciA9IHR5cGVvZiBjb21wYXJhdG9yID09ICdmdW5jdGlvbicgPyBjb21wYXJhdG9yIDogdW5kZWZpbmVkO1xuICByZXR1cm4gYmFzZVVuaXEoYmFzZUZsYXR0ZW4oYXJyYXlzLCAxLCBpc0FycmF5TGlrZU9iamVjdCwgdHJ1ZSksIHVuZGVmaW5lZCwgY29tcGFyYXRvcik7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bmlvbldpdGg7XG4iXX0=