'use strict';

var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    arrayMap = require('./_arrayMap'),
    baseUnary = require('./_baseUnary'),
    cacheHas = require('./_cacheHas');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * The base implementation of methods like `_.intersection`, without support
 * for iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
function baseIntersection(arrays, iteratee, comparator) {
  var includes = comparator ? arrayIncludesWith : arrayIncludes,
      length = arrays[0].length,
      othLength = arrays.length,
      othIndex = othLength,
      caches = Array(othLength),
      maxLength = Infinity,
      result = [];

  while (othIndex--) {
    var array = arrays[othIndex];
    if (othIndex && iteratee) {
      array = arrayMap(array, baseUnary(iteratee));
    }
    maxLength = nativeMin(array.length, maxLength);
    caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined;
  }
  array = arrays[0];

  var index = -1,
      seen = caches[0];

  outer: while (++index < length && result.length < maxLength) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = comparator || value !== 0 ? value : 0;
    if (!(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) {
      othIndex = othLength;
      while (--othIndex) {
        var cache = caches[othIndex];
        if (!(cache ? cacheHas(cache, computed) : includes(arrays[othIndex], computed, comparator))) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseIntersection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlSW50ZXJzZWN0aW9uLmpzIl0sIm5hbWVzIjpbIlNldENhY2hlIiwicmVxdWlyZSIsImFycmF5SW5jbHVkZXMiLCJhcnJheUluY2x1ZGVzV2l0aCIsImFycmF5TWFwIiwiYmFzZVVuYXJ5IiwiY2FjaGVIYXMiLCJuYXRpdmVNaW4iLCJNYXRoIiwibWluIiwiYmFzZUludGVyc2VjdGlvbiIsImFycmF5cyIsIml0ZXJhdGVlIiwiY29tcGFyYXRvciIsImluY2x1ZGVzIiwibGVuZ3RoIiwib3RoTGVuZ3RoIiwib3RoSW5kZXgiLCJjYWNoZXMiLCJBcnJheSIsIm1heExlbmd0aCIsIkluZmluaXR5IiwicmVzdWx0IiwiYXJyYXkiLCJ1bmRlZmluZWQiLCJpbmRleCIsInNlZW4iLCJvdXRlciIsInZhbHVlIiwiY29tcHV0ZWQiLCJjYWNoZSIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsYUFBUixDQUFmO0FBQUEsSUFDSUMsZ0JBQWdCRCxRQUFRLGtCQUFSLENBRHBCO0FBQUEsSUFFSUUsb0JBQW9CRixRQUFRLHNCQUFSLENBRnhCO0FBQUEsSUFHSUcsV0FBV0gsUUFBUSxhQUFSLENBSGY7QUFBQSxJQUlJSSxZQUFZSixRQUFRLGNBQVIsQ0FKaEI7QUFBQSxJQUtJSyxXQUFXTCxRQUFRLGFBQVIsQ0FMZjs7QUFPQTtBQUNBLElBQUlNLFlBQVlDLEtBQUtDLEdBQXJCOztBQUVBOzs7Ozs7Ozs7O0FBVUEsU0FBU0MsZ0JBQVQsQ0FBMEJDLE1BQTFCLEVBQWtDQyxRQUFsQyxFQUE0Q0MsVUFBNUMsRUFBd0Q7QUFDdEQsTUFBSUMsV0FBV0QsYUFBYVYsaUJBQWIsR0FBaUNELGFBQWhEO0FBQUEsTUFDSWEsU0FBU0osT0FBTyxDQUFQLEVBQVVJLE1BRHZCO0FBQUEsTUFFSUMsWUFBWUwsT0FBT0ksTUFGdkI7QUFBQSxNQUdJRSxXQUFXRCxTQUhmO0FBQUEsTUFJSUUsU0FBU0MsTUFBTUgsU0FBTixDQUpiO0FBQUEsTUFLSUksWUFBWUMsUUFMaEI7QUFBQSxNQU1JQyxTQUFTLEVBTmI7O0FBUUEsU0FBT0wsVUFBUCxFQUFtQjtBQUNqQixRQUFJTSxRQUFRWixPQUFPTSxRQUFQLENBQVo7QUFDQSxRQUFJQSxZQUFZTCxRQUFoQixFQUEwQjtBQUN4QlcsY0FBUW5CLFNBQVNtQixLQUFULEVBQWdCbEIsVUFBVU8sUUFBVixDQUFoQixDQUFSO0FBQ0Q7QUFDRFEsZ0JBQVliLFVBQVVnQixNQUFNUixNQUFoQixFQUF3QkssU0FBeEIsQ0FBWjtBQUNBRixXQUFPRCxRQUFQLElBQW1CLENBQUNKLFVBQUQsS0FBZ0JELFlBQWFHLFVBQVUsR0FBVixJQUFpQlEsTUFBTVIsTUFBTixJQUFnQixHQUE5RCxJQUNmLElBQUlmLFFBQUosQ0FBYWlCLFlBQVlNLEtBQXpCLENBRGUsR0FFZkMsU0FGSjtBQUdEO0FBQ0RELFVBQVFaLE9BQU8sQ0FBUCxDQUFSOztBQUVBLE1BQUljLFFBQVEsQ0FBQyxDQUFiO0FBQUEsTUFDSUMsT0FBT1IsT0FBTyxDQUFQLENBRFg7O0FBR0FTLFNBQ0EsT0FBTyxFQUFFRixLQUFGLEdBQVVWLE1BQVYsSUFBb0JPLE9BQU9QLE1BQVAsR0FBZ0JLLFNBQTNDLEVBQXNEO0FBQ3BELFFBQUlRLFFBQVFMLE1BQU1FLEtBQU4sQ0FBWjtBQUFBLFFBQ0lJLFdBQVdqQixXQUFXQSxTQUFTZ0IsS0FBVCxDQUFYLEdBQTZCQSxLQUQ1Qzs7QUFHQUEsWUFBU2YsY0FBY2UsVUFBVSxDQUF6QixHQUE4QkEsS0FBOUIsR0FBc0MsQ0FBOUM7QUFDQSxRQUFJLEVBQUVGLE9BQ0VwQixTQUFTb0IsSUFBVCxFQUFlRyxRQUFmLENBREYsR0FFRWYsU0FBU1EsTUFBVCxFQUFpQk8sUUFBakIsRUFBMkJoQixVQUEzQixDQUZKLENBQUosRUFHTztBQUNMSSxpQkFBV0QsU0FBWDtBQUNBLGFBQU8sRUFBRUMsUUFBVCxFQUFtQjtBQUNqQixZQUFJYSxRQUFRWixPQUFPRCxRQUFQLENBQVo7QUFDQSxZQUFJLEVBQUVhLFFBQ0V4QixTQUFTd0IsS0FBVCxFQUFnQkQsUUFBaEIsQ0FERixHQUVFZixTQUFTSCxPQUFPTSxRQUFQLENBQVQsRUFBMkJZLFFBQTNCLEVBQXFDaEIsVUFBckMsQ0FGSixDQUFKLEVBR007QUFDSixtQkFBU2MsS0FBVDtBQUNEO0FBQ0Y7QUFDRCxVQUFJRCxJQUFKLEVBQVU7QUFDUkEsYUFBS0ssSUFBTCxDQUFVRixRQUFWO0FBQ0Q7QUFDRFAsYUFBT1MsSUFBUCxDQUFZSCxLQUFaO0FBQ0Q7QUFDRjtBQUNELFNBQU9OLE1BQVA7QUFDRDs7QUFFRFUsT0FBT0MsT0FBUCxHQUFpQnZCLGdCQUFqQiIsImZpbGUiOiJfYmFzZUludGVyc2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBTZXRDYWNoZSA9IHJlcXVpcmUoJy4vX1NldENhY2hlJyksXG4gICAgYXJyYXlJbmNsdWRlcyA9IHJlcXVpcmUoJy4vX2FycmF5SW5jbHVkZXMnKSxcbiAgICBhcnJheUluY2x1ZGVzV2l0aCA9IHJlcXVpcmUoJy4vX2FycmF5SW5jbHVkZXNXaXRoJyksXG4gICAgYXJyYXlNYXAgPSByZXF1aXJlKCcuL19hcnJheU1hcCcpLFxuICAgIGJhc2VVbmFyeSA9IHJlcXVpcmUoJy4vX2Jhc2VVbmFyeScpLFxuICAgIGNhY2hlSGFzID0gcmVxdWlyZSgnLi9fY2FjaGVIYXMnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIG1ldGhvZHMgbGlrZSBgXy5pbnRlcnNlY3Rpb25gLCB3aXRob3V0IHN1cHBvcnRcbiAqIGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLCB0aGF0IGFjY2VwdHMgYW4gYXJyYXkgb2YgYXJyYXlzIHRvIGluc3BlY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5cyBUaGUgYXJyYXlzIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmF0b3JdIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiBzaGFyZWQgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBiYXNlSW50ZXJzZWN0aW9uKGFycmF5cywgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluY2x1ZGVzID0gY29tcGFyYXRvciA/IGFycmF5SW5jbHVkZXNXaXRoIDogYXJyYXlJbmNsdWRlcyxcbiAgICAgIGxlbmd0aCA9IGFycmF5c1swXS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBhcnJheXMubGVuZ3RoLFxuICAgICAgb3RoSW5kZXggPSBvdGhMZW5ndGgsXG4gICAgICBjYWNoZXMgPSBBcnJheShvdGhMZW5ndGgpLFxuICAgICAgbWF4TGVuZ3RoID0gSW5maW5pdHksXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAob3RoSW5kZXgtLSkge1xuICAgIHZhciBhcnJheSA9IGFycmF5c1tvdGhJbmRleF07XG4gICAgaWYgKG90aEluZGV4ICYmIGl0ZXJhdGVlKSB7XG4gICAgICBhcnJheSA9IGFycmF5TWFwKGFycmF5LCBiYXNlVW5hcnkoaXRlcmF0ZWUpKTtcbiAgICB9XG4gICAgbWF4TGVuZ3RoID0gbmF0aXZlTWluKGFycmF5Lmxlbmd0aCwgbWF4TGVuZ3RoKTtcbiAgICBjYWNoZXNbb3RoSW5kZXhdID0gIWNvbXBhcmF0b3IgJiYgKGl0ZXJhdGVlIHx8IChsZW5ndGggPj0gMTIwICYmIGFycmF5Lmxlbmd0aCA+PSAxMjApKVxuICAgICAgPyBuZXcgU2V0Q2FjaGUob3RoSW5kZXggJiYgYXJyYXkpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgfVxuICBhcnJheSA9IGFycmF5c1swXTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHNlZW4gPSBjYWNoZXNbMF07XG5cbiAgb3V0ZXI6XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoICYmIHJlc3VsdC5sZW5ndGggPCBtYXhMZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIHZhbHVlID0gKGNvbXBhcmF0b3IgfHwgdmFsdWUgIT09IDApID8gdmFsdWUgOiAwO1xuICAgIGlmICghKHNlZW5cbiAgICAgICAgICA/IGNhY2hlSGFzKHNlZW4sIGNvbXB1dGVkKVxuICAgICAgICAgIDogaW5jbHVkZXMocmVzdWx0LCBjb21wdXRlZCwgY29tcGFyYXRvcilcbiAgICAgICAgKSkge1xuICAgICAgb3RoSW5kZXggPSBvdGhMZW5ndGg7XG4gICAgICB3aGlsZSAoLS1vdGhJbmRleCkge1xuICAgICAgICB2YXIgY2FjaGUgPSBjYWNoZXNbb3RoSW5kZXhdO1xuICAgICAgICBpZiAoIShjYWNoZVxuICAgICAgICAgICAgICA/IGNhY2hlSGFzKGNhY2hlLCBjb21wdXRlZClcbiAgICAgICAgICAgICAgOiBpbmNsdWRlcyhhcnJheXNbb3RoSW5kZXhdLCBjb21wdXRlZCwgY29tcGFyYXRvcikpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNlZW4pIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSW50ZXJzZWN0aW9uO1xuIl19