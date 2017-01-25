'use strict';

var arraySampleSize = require('./_arraySampleSize'),
    baseSampleSize = require('./_baseSampleSize'),
    isArray = require('./isArray'),
    isIterateeCall = require('./_isIterateeCall'),
    toInteger = require('./toInteger');

/**
 * Gets `n` random elements at unique keys from `collection` up to the
 * size of `collection`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to sample.
 * @param {number} [n=1] The number of elements to sample.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the random elements.
 * @example
 *
 * _.sampleSize([1, 2, 3], 2);
 * // => [3, 1]
 *
 * _.sampleSize([1, 2, 3], 4);
 * // => [2, 3, 1]
 */
function sampleSize(collection, n, guard) {
  if (guard ? isIterateeCall(collection, n, guard) : n === undefined) {
    n = 1;
  } else {
    n = toInteger(n);
  }
  var func = isArray(collection) ? arraySampleSize : baseSampleSize;
  return func(collection, n);
}

module.exports = sampleSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NhbXBsZVNpemUuanMiXSwibmFtZXMiOlsiYXJyYXlTYW1wbGVTaXplIiwicmVxdWlyZSIsImJhc2VTYW1wbGVTaXplIiwiaXNBcnJheSIsImlzSXRlcmF0ZWVDYWxsIiwidG9JbnRlZ2VyIiwic2FtcGxlU2l6ZSIsImNvbGxlY3Rpb24iLCJuIiwiZ3VhcmQiLCJ1bmRlZmluZWQiLCJmdW5jIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxrQkFBa0JDLFFBQVEsb0JBQVIsQ0FBdEI7QUFBQSxJQUNJQyxpQkFBaUJELFFBQVEsbUJBQVIsQ0FEckI7QUFBQSxJQUVJRSxVQUFVRixRQUFRLFdBQVIsQ0FGZDtBQUFBLElBR0lHLGlCQUFpQkgsUUFBUSxtQkFBUixDQUhyQjtBQUFBLElBSUlJLFlBQVlKLFFBQVEsYUFBUixDQUpoQjs7QUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsU0FBU0ssVUFBVCxDQUFvQkMsVUFBcEIsRUFBZ0NDLENBQWhDLEVBQW1DQyxLQUFuQyxFQUEwQztBQUN4QyxNQUFLQSxRQUFRTCxlQUFlRyxVQUFmLEVBQTJCQyxDQUEzQixFQUE4QkMsS0FBOUIsQ0FBUixHQUErQ0QsTUFBTUUsU0FBMUQsRUFBc0U7QUFDcEVGLFFBQUksQ0FBSjtBQUNELEdBRkQsTUFFTztBQUNMQSxRQUFJSCxVQUFVRyxDQUFWLENBQUo7QUFDRDtBQUNELE1BQUlHLE9BQU9SLFFBQVFJLFVBQVIsSUFBc0JQLGVBQXRCLEdBQXdDRSxjQUFuRDtBQUNBLFNBQU9TLEtBQUtKLFVBQUwsRUFBaUJDLENBQWpCLENBQVA7QUFDRDs7QUFFREksT0FBT0MsT0FBUCxHQUFpQlAsVUFBakIiLCJmaWxlIjoic2FtcGxlU2l6ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcnJheVNhbXBsZVNpemUgPSByZXF1aXJlKCcuL19hcnJheVNhbXBsZVNpemUnKSxcbiAgICBiYXNlU2FtcGxlU2l6ZSA9IHJlcXVpcmUoJy4vX2Jhc2VTYW1wbGVTaXplJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnLi9faXNJdGVyYXRlZUNhbGwnKSxcbiAgICB0b0ludGVnZXIgPSByZXF1aXJlKCcuL3RvSW50ZWdlcicpO1xuXG4vKipcbiAqIEdldHMgYG5gIHJhbmRvbSBlbGVtZW50cyBhdCB1bmlxdWUga2V5cyBmcm9tIGBjb2xsZWN0aW9uYCB1cCB0byB0aGVcbiAqIHNpemUgb2YgYGNvbGxlY3Rpb25gLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBzYW1wbGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW249MV0gVGhlIG51bWJlciBvZiBlbGVtZW50cyB0byBzYW1wbGUuXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSByYW5kb20gZWxlbWVudHMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uc2FtcGxlU2l6ZShbMSwgMiwgM10sIDIpO1xuICogLy8gPT4gWzMsIDFdXG4gKlxuICogXy5zYW1wbGVTaXplKFsxLCAyLCAzXSwgNCk7XG4gKiAvLyA9PiBbMiwgMywgMV1cbiAqL1xuZnVuY3Rpb24gc2FtcGxlU2l6ZShjb2xsZWN0aW9uLCBuLCBndWFyZCkge1xuICBpZiAoKGd1YXJkID8gaXNJdGVyYXRlZUNhbGwoY29sbGVjdGlvbiwgbiwgZ3VhcmQpIDogbiA9PT0gdW5kZWZpbmVkKSkge1xuICAgIG4gPSAxO1xuICB9IGVsc2Uge1xuICAgIG4gPSB0b0ludGVnZXIobik7XG4gIH1cbiAgdmFyIGZ1bmMgPSBpc0FycmF5KGNvbGxlY3Rpb24pID8gYXJyYXlTYW1wbGVTaXplIDogYmFzZVNhbXBsZVNpemU7XG4gIHJldHVybiBmdW5jKGNvbGxlY3Rpb24sIG4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNhbXBsZVNpemU7XG4iXX0=