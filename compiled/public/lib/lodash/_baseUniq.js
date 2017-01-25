'use strict';

var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    cacheHas = require('./_cacheHas'),
    createSet = require('./_createSet'),
    setToArray = require('./_setToArray');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  } else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache();
  } else {
    seen = iteratee ? [] : result;
  }
  outer: while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = comparator || value !== 0 ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    } else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlVW5pcS5qcyJdLCJuYW1lcyI6WyJTZXRDYWNoZSIsInJlcXVpcmUiLCJhcnJheUluY2x1ZGVzIiwiYXJyYXlJbmNsdWRlc1dpdGgiLCJjYWNoZUhhcyIsImNyZWF0ZVNldCIsInNldFRvQXJyYXkiLCJMQVJHRV9BUlJBWV9TSVpFIiwiYmFzZVVuaXEiLCJhcnJheSIsIml0ZXJhdGVlIiwiY29tcGFyYXRvciIsImluZGV4IiwiaW5jbHVkZXMiLCJsZW5ndGgiLCJpc0NvbW1vbiIsInJlc3VsdCIsInNlZW4iLCJzZXQiLCJvdXRlciIsInZhbHVlIiwiY29tcHV0ZWQiLCJzZWVuSW5kZXgiLCJwdXNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxXQUFXQyxRQUFRLGFBQVIsQ0FBZjtBQUFBLElBQ0lDLGdCQUFnQkQsUUFBUSxrQkFBUixDQURwQjtBQUFBLElBRUlFLG9CQUFvQkYsUUFBUSxzQkFBUixDQUZ4QjtBQUFBLElBR0lHLFdBQVdILFFBQVEsYUFBUixDQUhmO0FBQUEsSUFJSUksWUFBWUosUUFBUSxjQUFSLENBSmhCO0FBQUEsSUFLSUssYUFBYUwsUUFBUSxlQUFSLENBTGpCOztBQU9BO0FBQ0EsSUFBSU0sbUJBQW1CLEdBQXZCOztBQUVBOzs7Ozs7Ozs7QUFTQSxTQUFTQyxRQUFULENBQWtCQyxLQUFsQixFQUF5QkMsUUFBekIsRUFBbUNDLFVBQW5DLEVBQStDO0FBQzdDLE1BQUlDLFFBQVEsQ0FBQyxDQUFiO0FBQUEsTUFDSUMsV0FBV1gsYUFEZjtBQUFBLE1BRUlZLFNBQVNMLE1BQU1LLE1BRm5CO0FBQUEsTUFHSUMsV0FBVyxJQUhmO0FBQUEsTUFJSUMsU0FBUyxFQUpiO0FBQUEsTUFLSUMsT0FBT0QsTUFMWDs7QUFPQSxNQUFJTCxVQUFKLEVBQWdCO0FBQ2RJLGVBQVcsS0FBWDtBQUNBRixlQUFXVixpQkFBWDtBQUNELEdBSEQsTUFJSyxJQUFJVyxVQUFVUCxnQkFBZCxFQUFnQztBQUNuQyxRQUFJVyxNQUFNUixXQUFXLElBQVgsR0FBa0JMLFVBQVVJLEtBQVYsQ0FBNUI7QUFDQSxRQUFJUyxHQUFKLEVBQVM7QUFDUCxhQUFPWixXQUFXWSxHQUFYLENBQVA7QUFDRDtBQUNESCxlQUFXLEtBQVg7QUFDQUYsZUFBV1QsUUFBWDtBQUNBYSxXQUFPLElBQUlqQixRQUFKLEVBQVA7QUFDRCxHQVJJLE1BU0E7QUFDSGlCLFdBQU9QLFdBQVcsRUFBWCxHQUFnQk0sTUFBdkI7QUFDRDtBQUNERyxTQUNBLE9BQU8sRUFBRVAsS0FBRixHQUFVRSxNQUFqQixFQUF5QjtBQUN2QixRQUFJTSxRQUFRWCxNQUFNRyxLQUFOLENBQVo7QUFBQSxRQUNJUyxXQUFXWCxXQUFXQSxTQUFTVSxLQUFULENBQVgsR0FBNkJBLEtBRDVDOztBQUdBQSxZQUFTVCxjQUFjUyxVQUFVLENBQXpCLEdBQThCQSxLQUE5QixHQUFzQyxDQUE5QztBQUNBLFFBQUlMLFlBQVlNLGFBQWFBLFFBQTdCLEVBQXVDO0FBQ3JDLFVBQUlDLFlBQVlMLEtBQUtILE1BQXJCO0FBQ0EsYUFBT1EsV0FBUCxFQUFvQjtBQUNsQixZQUFJTCxLQUFLSyxTQUFMLE1BQW9CRCxRQUF4QixFQUFrQztBQUNoQyxtQkFBU0YsS0FBVDtBQUNEO0FBQ0Y7QUFDRCxVQUFJVCxRQUFKLEVBQWM7QUFDWk8sYUFBS00sSUFBTCxDQUFVRixRQUFWO0FBQ0Q7QUFDREwsYUFBT08sSUFBUCxDQUFZSCxLQUFaO0FBQ0QsS0FYRCxNQVlLLElBQUksQ0FBQ1AsU0FBU0ksSUFBVCxFQUFlSSxRQUFmLEVBQXlCVixVQUF6QixDQUFMLEVBQTJDO0FBQzlDLFVBQUlNLFNBQVNELE1BQWIsRUFBcUI7QUFDbkJDLGFBQUtNLElBQUwsQ0FBVUYsUUFBVjtBQUNEO0FBQ0RMLGFBQU9PLElBQVAsQ0FBWUgsS0FBWjtBQUNEO0FBQ0Y7QUFDRCxTQUFPSixNQUFQO0FBQ0Q7O0FBRURRLE9BQU9DLE9BQVAsR0FBaUJqQixRQUFqQiIsImZpbGUiOiJfYmFzZVVuaXEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgU2V0Q2FjaGUgPSByZXF1aXJlKCcuL19TZXRDYWNoZScpLFxuICAgIGFycmF5SW5jbHVkZXMgPSByZXF1aXJlKCcuL19hcnJheUluY2x1ZGVzJyksXG4gICAgYXJyYXlJbmNsdWRlc1dpdGggPSByZXF1aXJlKCcuL19hcnJheUluY2x1ZGVzV2l0aCcpLFxuICAgIGNhY2hlSGFzID0gcmVxdWlyZSgnLi9fY2FjaGVIYXMnKSxcbiAgICBjcmVhdGVTZXQgPSByZXF1aXJlKCcuL19jcmVhdGVTZXQnKSxcbiAgICBzZXRUb0FycmF5ID0gcmVxdWlyZSgnLi9fc2V0VG9BcnJheScpO1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuaXFCeWAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyYXRvcl0gVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGR1cGxpY2F0ZSBmcmVlIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlVW5pcShhcnJheSwgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXMsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICByZXN1bHQgPSBbXSxcbiAgICAgIHNlZW4gPSByZXN1bHQ7XG5cbiAgaWYgKGNvbXBhcmF0b3IpIHtcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIGluY2x1ZGVzID0gYXJyYXlJbmNsdWRlc1dpdGg7XG4gIH1cbiAgZWxzZSBpZiAobGVuZ3RoID49IExBUkdFX0FSUkFZX1NJWkUpIHtcbiAgICB2YXIgc2V0ID0gaXRlcmF0ZWUgPyBudWxsIDogY3JlYXRlU2V0KGFycmF5KTtcbiAgICBpZiAoc2V0KSB7XG4gICAgICByZXR1cm4gc2V0VG9BcnJheShzZXQpO1xuICAgIH1cbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIGluY2x1ZGVzID0gY2FjaGVIYXM7XG4gICAgc2VlbiA9IG5ldyBTZXRDYWNoZTtcbiAgfVxuICBlbHNlIHtcbiAgICBzZWVuID0gaXRlcmF0ZWUgPyBbXSA6IHJlc3VsdDtcbiAgfVxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIHZhbHVlID0gKGNvbXBhcmF0b3IgfHwgdmFsdWUgIT09IDApID8gdmFsdWUgOiAwO1xuICAgIGlmIChpc0NvbW1vbiAmJiBjb21wdXRlZCA9PT0gY29tcHV0ZWQpIHtcbiAgICAgIHZhciBzZWVuSW5kZXggPSBzZWVuLmxlbmd0aDtcbiAgICAgIHdoaWxlIChzZWVuSW5kZXgtLSkge1xuICAgICAgICBpZiAoc2VlbltzZWVuSW5kZXhdID09PSBjb21wdXRlZCkge1xuICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIWluY2x1ZGVzKHNlZW4sIGNvbXB1dGVkLCBjb21wYXJhdG9yKSkge1xuICAgICAgaWYgKHNlZW4gIT09IHJlc3VsdCkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VVbmlxO1xuIl19