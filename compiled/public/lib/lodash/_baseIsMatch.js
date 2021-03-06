'use strict';

var Stack = require('./_Stack'),
    baseIsEqual = require('./_baseIsEqual');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlSXNNYXRjaC5qcyJdLCJuYW1lcyI6WyJTdGFjayIsInJlcXVpcmUiLCJiYXNlSXNFcXVhbCIsIkNPTVBBUkVfUEFSVElBTF9GTEFHIiwiQ09NUEFSRV9VTk9SREVSRURfRkxBRyIsImJhc2VJc01hdGNoIiwib2JqZWN0Iiwic291cmNlIiwibWF0Y2hEYXRhIiwiY3VzdG9taXplciIsImluZGV4IiwibGVuZ3RoIiwibm9DdXN0b21pemVyIiwiT2JqZWN0IiwiZGF0YSIsImtleSIsIm9ialZhbHVlIiwic3JjVmFsdWUiLCJ1bmRlZmluZWQiLCJzdGFjayIsInJlc3VsdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsUUFBUUMsUUFBUSxVQUFSLENBQVo7QUFBQSxJQUNJQyxjQUFjRCxRQUFRLGdCQUFSLENBRGxCOztBQUdBO0FBQ0EsSUFBSUUsdUJBQXVCLENBQTNCO0FBQUEsSUFDSUMseUJBQXlCLENBRDdCOztBQUdBOzs7Ozs7Ozs7O0FBVUEsU0FBU0MsV0FBVCxDQUFxQkMsTUFBckIsRUFBNkJDLE1BQTdCLEVBQXFDQyxTQUFyQyxFQUFnREMsVUFBaEQsRUFBNEQ7QUFDMUQsTUFBSUMsUUFBUUYsVUFBVUcsTUFBdEI7QUFBQSxNQUNJQSxTQUFTRCxLQURiO0FBQUEsTUFFSUUsZUFBZSxDQUFDSCxVQUZwQjs7QUFJQSxNQUFJSCxVQUFVLElBQWQsRUFBb0I7QUFDbEIsV0FBTyxDQUFDSyxNQUFSO0FBQ0Q7QUFDREwsV0FBU08sT0FBT1AsTUFBUCxDQUFUO0FBQ0EsU0FBT0ksT0FBUCxFQUFnQjtBQUNkLFFBQUlJLE9BQU9OLFVBQVVFLEtBQVYsQ0FBWDtBQUNBLFFBQUtFLGdCQUFnQkUsS0FBSyxDQUFMLENBQWpCLEdBQ0lBLEtBQUssQ0FBTCxNQUFZUixPQUFPUSxLQUFLLENBQUwsQ0FBUCxDQURoQixHQUVJLEVBQUVBLEtBQUssQ0FBTCxLQUFXUixNQUFiLENBRlIsRUFHTTtBQUNKLGFBQU8sS0FBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPLEVBQUVJLEtBQUYsR0FBVUMsTUFBakIsRUFBeUI7QUFDdkJHLFdBQU9OLFVBQVVFLEtBQVYsQ0FBUDtBQUNBLFFBQUlLLE1BQU1ELEtBQUssQ0FBTCxDQUFWO0FBQUEsUUFDSUUsV0FBV1YsT0FBT1MsR0FBUCxDQURmO0FBQUEsUUFFSUUsV0FBV0gsS0FBSyxDQUFMLENBRmY7O0FBSUEsUUFBSUYsZ0JBQWdCRSxLQUFLLENBQUwsQ0FBcEIsRUFBNkI7QUFDM0IsVUFBSUUsYUFBYUUsU0FBYixJQUEwQixFQUFFSCxPQUFPVCxNQUFULENBQTlCLEVBQWdEO0FBQzlDLGVBQU8sS0FBUDtBQUNEO0FBQ0YsS0FKRCxNQUlPO0FBQ0wsVUFBSWEsUUFBUSxJQUFJbkIsS0FBSixFQUFaO0FBQ0EsVUFBSVMsVUFBSixFQUFnQjtBQUNkLFlBQUlXLFNBQVNYLFdBQVdPLFFBQVgsRUFBcUJDLFFBQXJCLEVBQStCRixHQUEvQixFQUFvQ1QsTUFBcEMsRUFBNENDLE1BQTVDLEVBQW9EWSxLQUFwRCxDQUFiO0FBQ0Q7QUFDRCxVQUFJLEVBQUVDLFdBQVdGLFNBQVgsR0FDRWhCLFlBQVllLFFBQVosRUFBc0JELFFBQXRCLEVBQWdDYix1QkFBdUJDLHNCQUF2RCxFQUErRUssVUFBL0UsRUFBMkZVLEtBQTNGLENBREYsR0FFRUMsTUFGSixDQUFKLEVBR087QUFDTCxlQUFPLEtBQVA7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxTQUFPLElBQVA7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQmpCLFdBQWpCIiwiZmlsZSI6Il9iYXNlSXNNYXRjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBTdGFjayA9IHJlcXVpcmUoJy4vX1N0YWNrJyksXG4gICAgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCcuL19iYXNlSXNFcXVhbCcpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSBtYXRjaERhdGEgVGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYG9iamVjdGAgaXMgYSBtYXRjaCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhLCBjdXN0b21pemVyKSB7XG4gIHZhciBpbmRleCA9IG1hdGNoRGF0YS5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBpbmRleCxcbiAgICAgIG5vQ3VzdG9taXplciA9ICFjdXN0b21pemVyO1xuXG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiAhbGVuZ3RoO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICBpZiAoKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKVxuICAgICAgICAgID8gZGF0YVsxXSAhPT0gb2JqZWN0W2RhdGFbMF1dXG4gICAgICAgICAgOiAhKGRhdGFbMF0gaW4gb2JqZWN0KVxuICAgICAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICB2YXIga2V5ID0gZGF0YVswXSxcbiAgICAgICAgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgc3JjVmFsdWUgPSBkYXRhWzFdO1xuXG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKSB7XG4gICAgICBpZiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN0YWNrID0gbmV3IFN0YWNrO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlLCBzdGFjayk7XG4gICAgICB9XG4gICAgICBpZiAoIShyZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIENPTVBBUkVfUEFSVElBTF9GTEFHIHwgQ09NUEFSRV9VTk9SREVSRURfRkxBRywgY3VzdG9taXplciwgc3RhY2spXG4gICAgICAgICAgICA6IHJlc3VsdFxuICAgICAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNNYXRjaDtcbiJdfQ==