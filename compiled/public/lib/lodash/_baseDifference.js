'use strict';

var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    arrayMap = require('./_arrayMap'),
    baseUnary = require('./_baseUnary'),
    cacheHas = require('./_cacheHas');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  } else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer: while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = comparator || value !== 0 ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    } else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlRGlmZmVyZW5jZS5qcyJdLCJuYW1lcyI6WyJTZXRDYWNoZSIsInJlcXVpcmUiLCJhcnJheUluY2x1ZGVzIiwiYXJyYXlJbmNsdWRlc1dpdGgiLCJhcnJheU1hcCIsImJhc2VVbmFyeSIsImNhY2hlSGFzIiwiTEFSR0VfQVJSQVlfU0laRSIsImJhc2VEaWZmZXJlbmNlIiwiYXJyYXkiLCJ2YWx1ZXMiLCJpdGVyYXRlZSIsImNvbXBhcmF0b3IiLCJpbmRleCIsImluY2x1ZGVzIiwiaXNDb21tb24iLCJsZW5ndGgiLCJyZXN1bHQiLCJ2YWx1ZXNMZW5ndGgiLCJvdXRlciIsInZhbHVlIiwiY29tcHV0ZWQiLCJ2YWx1ZXNJbmRleCIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsYUFBUixDQUFmO0FBQUEsSUFDSUMsZ0JBQWdCRCxRQUFRLGtCQUFSLENBRHBCO0FBQUEsSUFFSUUsb0JBQW9CRixRQUFRLHNCQUFSLENBRnhCO0FBQUEsSUFHSUcsV0FBV0gsUUFBUSxhQUFSLENBSGY7QUFBQSxJQUlJSSxZQUFZSixRQUFRLGNBQVIsQ0FKaEI7QUFBQSxJQUtJSyxXQUFXTCxRQUFRLGFBQVIsQ0FMZjs7QUFPQTtBQUNBLElBQUlNLG1CQUFtQixHQUF2Qjs7QUFFQTs7Ozs7Ozs7Ozs7QUFXQSxTQUFTQyxjQUFULENBQXdCQyxLQUF4QixFQUErQkMsTUFBL0IsRUFBdUNDLFFBQXZDLEVBQWlEQyxVQUFqRCxFQUE2RDtBQUMzRCxNQUFJQyxRQUFRLENBQUMsQ0FBYjtBQUFBLE1BQ0lDLFdBQVdaLGFBRGY7QUFBQSxNQUVJYSxXQUFXLElBRmY7QUFBQSxNQUdJQyxTQUFTUCxNQUFNTyxNQUhuQjtBQUFBLE1BSUlDLFNBQVMsRUFKYjtBQUFBLE1BS0lDLGVBQWVSLE9BQU9NLE1BTDFCOztBQU9BLE1BQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1gsV0FBT0MsTUFBUDtBQUNEO0FBQ0QsTUFBSU4sUUFBSixFQUFjO0FBQ1pELGFBQVNOLFNBQVNNLE1BQVQsRUFBaUJMLFVBQVVNLFFBQVYsQ0FBakIsQ0FBVDtBQUNEO0FBQ0QsTUFBSUMsVUFBSixFQUFnQjtBQUNkRSxlQUFXWCxpQkFBWDtBQUNBWSxlQUFXLEtBQVg7QUFDRCxHQUhELE1BSUssSUFBSUwsT0FBT00sTUFBUCxJQUFpQlQsZ0JBQXJCLEVBQXVDO0FBQzFDTyxlQUFXUixRQUFYO0FBQ0FTLGVBQVcsS0FBWDtBQUNBTCxhQUFTLElBQUlWLFFBQUosQ0FBYVUsTUFBYixDQUFUO0FBQ0Q7QUFDRFMsU0FDQSxPQUFPLEVBQUVOLEtBQUYsR0FBVUcsTUFBakIsRUFBeUI7QUFDdkIsUUFBSUksUUFBUVgsTUFBTUksS0FBTixDQUFaO0FBQUEsUUFDSVEsV0FBV1YsWUFBWSxJQUFaLEdBQW1CUyxLQUFuQixHQUEyQlQsU0FBU1MsS0FBVCxDQUQxQzs7QUFHQUEsWUFBU1IsY0FBY1EsVUFBVSxDQUF6QixHQUE4QkEsS0FBOUIsR0FBc0MsQ0FBOUM7QUFDQSxRQUFJTCxZQUFZTSxhQUFhQSxRQUE3QixFQUF1QztBQUNyQyxVQUFJQyxjQUFjSixZQUFsQjtBQUNBLGFBQU9JLGFBQVAsRUFBc0I7QUFDcEIsWUFBSVosT0FBT1ksV0FBUCxNQUF3QkQsUUFBNUIsRUFBc0M7QUFDcEMsbUJBQVNGLEtBQVQ7QUFDRDtBQUNGO0FBQ0RGLGFBQU9NLElBQVAsQ0FBWUgsS0FBWjtBQUNELEtBUkQsTUFTSyxJQUFJLENBQUNOLFNBQVNKLE1BQVQsRUFBaUJXLFFBQWpCLEVBQTJCVCxVQUEzQixDQUFMLEVBQTZDO0FBQ2hESyxhQUFPTSxJQUFQLENBQVlILEtBQVo7QUFDRDtBQUNGO0FBQ0QsU0FBT0gsTUFBUDtBQUNEOztBQUVETyxPQUFPQyxPQUFQLEdBQWlCakIsY0FBakIiLCJmaWxlIjoiX2Jhc2VEaWZmZXJlbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFNldENhY2hlID0gcmVxdWlyZSgnLi9fU2V0Q2FjaGUnKSxcbiAgICBhcnJheUluY2x1ZGVzID0gcmVxdWlyZSgnLi9fYXJyYXlJbmNsdWRlcycpLFxuICAgIGFycmF5SW5jbHVkZXNXaXRoID0gcmVxdWlyZSgnLi9fYXJyYXlJbmNsdWRlc1dpdGgnKSxcbiAgICBhcnJheU1hcCA9IHJlcXVpcmUoJy4vX2FycmF5TWFwJyksXG4gICAgYmFzZVVuYXJ5ID0gcmVxdWlyZSgnLi9fYmFzZVVuYXJ5JyksXG4gICAgY2FjaGVIYXMgPSByZXF1aXJlKCcuL19jYWNoZUhhcycpO1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIG1ldGhvZHMgbGlrZSBgXy5kaWZmZXJlbmNlYCB3aXRob3V0IHN1cHBvcnRcbiAqIGZvciBleGNsdWRpbmcgbXVsdGlwbGUgYXJyYXlzIG9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gZXhjbHVkZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyYXRvcl0gVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGZpbHRlcmVkIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gYmFzZURpZmZlcmVuY2UoYXJyYXksIHZhbHVlcywgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXMsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBbXSxcbiAgICAgIHZhbHVlc0xlbmd0aCA9IHZhbHVlcy5sZW5ndGg7XG5cbiAgaWYgKCFsZW5ndGgpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmIChpdGVyYXRlZSkge1xuICAgIHZhbHVlcyA9IGFycmF5TWFwKHZhbHVlcywgYmFzZVVuYXJ5KGl0ZXJhdGVlKSk7XG4gIH1cbiAgaWYgKGNvbXBhcmF0b3IpIHtcbiAgICBpbmNsdWRlcyA9IGFycmF5SW5jbHVkZXNXaXRoO1xuICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gIH1cbiAgZWxzZSBpZiAodmFsdWVzLmxlbmd0aCA+PSBMQVJHRV9BUlJBWV9TSVpFKSB7XG4gICAgaW5jbHVkZXMgPSBjYWNoZUhhcztcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIHZhbHVlcyA9IG5ldyBTZXRDYWNoZSh2YWx1ZXMpO1xuICB9XG4gIG91dGVyOlxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA9PSBudWxsID8gdmFsdWUgOiBpdGVyYXRlZSh2YWx1ZSk7XG5cbiAgICB2YWx1ZSA9IChjb21wYXJhdG9yIHx8IHZhbHVlICE9PSAwKSA/IHZhbHVlIDogMDtcbiAgICBpZiAoaXNDb21tb24gJiYgY29tcHV0ZWQgPT09IGNvbXB1dGVkKSB7XG4gICAgICB2YXIgdmFsdWVzSW5kZXggPSB2YWx1ZXNMZW5ndGg7XG4gICAgICB3aGlsZSAodmFsdWVzSW5kZXgtLSkge1xuICAgICAgICBpZiAodmFsdWVzW3ZhbHVlc0luZGV4XSA9PT0gY29tcHV0ZWQpIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICghaW5jbHVkZXModmFsdWVzLCBjb21wdXRlZCwgY29tcGFyYXRvcikpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRGlmZmVyZW5jZTtcbiJdfQ==