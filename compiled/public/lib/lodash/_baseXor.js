'use strict';

var baseDifference = require('./_baseDifference'),
    baseFlatten = require('./_baseFlatten'),
    baseUniq = require('./_baseUniq');

/**
 * The base implementation of methods like `_.xor`, without support for
 * iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of values.
 */
function baseXor(arrays, iteratee, comparator) {
  var length = arrays.length;
  if (length < 2) {
    return length ? baseUniq(arrays[0]) : [];
  }
  var index = -1,
      result = Array(length);

  while (++index < length) {
    var array = arrays[index],
        othIndex = -1;

    while (++othIndex < length) {
      if (othIndex != index) {
        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
      }
    }
  }
  return baseUniq(baseFlatten(result, 1), iteratee, comparator);
}

module.exports = baseXor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlWG9yLmpzIl0sIm5hbWVzIjpbImJhc2VEaWZmZXJlbmNlIiwicmVxdWlyZSIsImJhc2VGbGF0dGVuIiwiYmFzZVVuaXEiLCJiYXNlWG9yIiwiYXJyYXlzIiwiaXRlcmF0ZWUiLCJjb21wYXJhdG9yIiwibGVuZ3RoIiwiaW5kZXgiLCJyZXN1bHQiLCJBcnJheSIsImFycmF5Iiwib3RoSW5kZXgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGlCQUFpQkMsUUFBUSxtQkFBUixDQUFyQjtBQUFBLElBQ0lDLGNBQWNELFFBQVEsZ0JBQVIsQ0FEbEI7QUFBQSxJQUVJRSxXQUFXRixRQUFRLGFBQVIsQ0FGZjs7QUFJQTs7Ozs7Ozs7OztBQVVBLFNBQVNHLE9BQVQsQ0FBaUJDLE1BQWpCLEVBQXlCQyxRQUF6QixFQUFtQ0MsVUFBbkMsRUFBK0M7QUFDN0MsTUFBSUMsU0FBU0gsT0FBT0csTUFBcEI7QUFDQSxNQUFJQSxTQUFTLENBQWIsRUFBZ0I7QUFDZCxXQUFPQSxTQUFTTCxTQUFTRSxPQUFPLENBQVAsQ0FBVCxDQUFULEdBQStCLEVBQXRDO0FBQ0Q7QUFDRCxNQUFJSSxRQUFRLENBQUMsQ0FBYjtBQUFBLE1BQ0lDLFNBQVNDLE1BQU1ILE1BQU4sQ0FEYjs7QUFHQSxTQUFPLEVBQUVDLEtBQUYsR0FBVUQsTUFBakIsRUFBeUI7QUFDdkIsUUFBSUksUUFBUVAsT0FBT0ksS0FBUCxDQUFaO0FBQUEsUUFDSUksV0FBVyxDQUFDLENBRGhCOztBQUdBLFdBQU8sRUFBRUEsUUFBRixHQUFhTCxNQUFwQixFQUE0QjtBQUMxQixVQUFJSyxZQUFZSixLQUFoQixFQUF1QjtBQUNyQkMsZUFBT0QsS0FBUCxJQUFnQlQsZUFBZVUsT0FBT0QsS0FBUCxLQUFpQkcsS0FBaEMsRUFBdUNQLE9BQU9RLFFBQVAsQ0FBdkMsRUFBeURQLFFBQXpELEVBQW1FQyxVQUFuRSxDQUFoQjtBQUNEO0FBQ0Y7QUFDRjtBQUNELFNBQU9KLFNBQVNELFlBQVlRLE1BQVosRUFBb0IsQ0FBcEIsQ0FBVCxFQUFpQ0osUUFBakMsRUFBMkNDLFVBQTNDLENBQVA7QUFDRDs7QUFFRE8sT0FBT0MsT0FBUCxHQUFpQlgsT0FBakIiLCJmaWxlIjoiX2Jhc2VYb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZURpZmZlcmVuY2UgPSByZXF1aXJlKCcuL19iYXNlRGlmZmVyZW5jZScpLFxuICAgIGJhc2VGbGF0dGVuID0gcmVxdWlyZSgnLi9fYmFzZUZsYXR0ZW4nKSxcbiAgICBiYXNlVW5pcSA9IHJlcXVpcmUoJy4vX2Jhc2VVbmlxJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgbWV0aG9kcyBsaWtlIGBfLnhvcmAsIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMsIHRoYXQgYWNjZXB0cyBhbiBhcnJheSBvZiBhcnJheXMgdG8gaW5zcGVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXlzIFRoZSBhcnJheXMgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyYXRvcl0gVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gYmFzZVhvcihhcnJheXMsIGl0ZXJhdGVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheXMubGVuZ3RoO1xuICBpZiAobGVuZ3RoIDwgMikge1xuICAgIHJldHVybiBsZW5ndGggPyBiYXNlVW5pcShhcnJheXNbMF0pIDogW107XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGFycmF5ID0gYXJyYXlzW2luZGV4XSxcbiAgICAgICAgb3RoSW5kZXggPSAtMTtcblxuICAgIHdoaWxlICgrK290aEluZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBpZiAob3RoSW5kZXggIT0gaW5kZXgpIHtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IGJhc2VEaWZmZXJlbmNlKHJlc3VsdFtpbmRleF0gfHwgYXJyYXksIGFycmF5c1tvdGhJbmRleF0sIGl0ZXJhdGVlLCBjb21wYXJhdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJhc2VVbmlxKGJhc2VGbGF0dGVuKHJlc3VsdCwgMSksIGl0ZXJhdGVlLCBjb21wYXJhdG9yKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlWG9yO1xuIl19