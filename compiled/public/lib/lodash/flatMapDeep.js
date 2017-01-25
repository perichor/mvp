'use strict';

var baseFlatten = require('./_baseFlatten'),
    map = require('./map');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * This method is like `_.flatMap` except that it recursively flattens the
 * mapped results.
 *
 * @static
 * @memberOf _
 * @since 4.7.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * function duplicate(n) {
 *   return [[[n, n]]];
 * }
 *
 * _.flatMapDeep([1, 2], duplicate);
 * // => [1, 1, 2, 2]
 */
function flatMapDeep(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), INFINITY);
}

module.exports = flatMapDeep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZsYXRNYXBEZWVwLmpzIl0sIm5hbWVzIjpbImJhc2VGbGF0dGVuIiwicmVxdWlyZSIsIm1hcCIsIklORklOSVRZIiwiZmxhdE1hcERlZXAiLCJjb2xsZWN0aW9uIiwiaXRlcmF0ZWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGNBQWNDLFFBQVEsZ0JBQVIsQ0FBbEI7QUFBQSxJQUNJQyxNQUFNRCxRQUFRLE9BQVIsQ0FEVjs7QUFHQTtBQUNBLElBQUlFLFdBQVcsSUFBSSxDQUFuQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsU0FBU0MsV0FBVCxDQUFxQkMsVUFBckIsRUFBaUNDLFFBQWpDLEVBQTJDO0FBQ3pDLFNBQU9OLFlBQVlFLElBQUlHLFVBQUosRUFBZ0JDLFFBQWhCLENBQVosRUFBdUNILFFBQXZDLENBQVA7QUFDRDs7QUFFREksT0FBT0MsT0FBUCxHQUFpQkosV0FBakIiLCJmaWxlIjoiZmxhdE1hcERlZXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUZsYXR0ZW4gPSByZXF1aXJlKCcuL19iYXNlRmxhdHRlbicpLFxuICAgIG1hcCA9IHJlcXVpcmUoJy4vbWFwJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5mbGF0TWFwYCBleGNlcHQgdGhhdCBpdCByZWN1cnNpdmVseSBmbGF0dGVucyB0aGVcbiAqIG1hcHBlZCByZXN1bHRzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC43LjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gZHVwbGljYXRlKG4pIHtcbiAqICAgcmV0dXJuIFtbW24sIG5dXV07XG4gKiB9XG4gKlxuICogXy5mbGF0TWFwRGVlcChbMSwgMl0sIGR1cGxpY2F0ZSk7XG4gKiAvLyA9PiBbMSwgMSwgMiwgMl1cbiAqL1xuZnVuY3Rpb24gZmxhdE1hcERlZXAoY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIGJhc2VGbGF0dGVuKG1hcChjb2xsZWN0aW9uLCBpdGVyYXRlZSksIElORklOSVRZKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmbGF0TWFwRGVlcDtcbiJdfQ==