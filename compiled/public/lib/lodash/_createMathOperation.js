'use strict';

var baseToNumber = require('./_baseToNumber'),
    baseToString = require('./_baseToString');

/**
 * Creates a function that performs a mathematical operation on two values.
 *
 * @private
 * @param {Function} operator The function to perform the operation.
 * @param {number} [defaultValue] The value used for `undefined` arguments.
 * @returns {Function} Returns the new mathematical operation function.
 */
function createMathOperation(operator, defaultValue) {
  return function (value, other) {
    var result;
    if (value === undefined && other === undefined) {
      return defaultValue;
    }
    if (value !== undefined) {
      result = value;
    }
    if (other !== undefined) {
      if (result === undefined) {
        return other;
      }
      if (typeof value == 'string' || typeof other == 'string') {
        value = baseToString(value);
        other = baseToString(other);
      } else {
        value = baseToNumber(value);
        other = baseToNumber(other);
      }
      result = operator(value, other);
    }
    return result;
  };
}

module.exports = createMathOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19jcmVhdGVNYXRoT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbImJhc2VUb051bWJlciIsInJlcXVpcmUiLCJiYXNlVG9TdHJpbmciLCJjcmVhdGVNYXRoT3BlcmF0aW9uIiwib3BlcmF0b3IiLCJkZWZhdWx0VmFsdWUiLCJ2YWx1ZSIsIm90aGVyIiwicmVzdWx0IiwidW5kZWZpbmVkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5CO0FBQUEsSUFDSUMsZUFBZUQsUUFBUSxpQkFBUixDQURuQjs7QUFHQTs7Ozs7Ozs7QUFRQSxTQUFTRSxtQkFBVCxDQUE2QkMsUUFBN0IsRUFBdUNDLFlBQXZDLEVBQXFEO0FBQ25ELFNBQU8sVUFBU0MsS0FBVCxFQUFnQkMsS0FBaEIsRUFBdUI7QUFDNUIsUUFBSUMsTUFBSjtBQUNBLFFBQUlGLFVBQVVHLFNBQVYsSUFBdUJGLFVBQVVFLFNBQXJDLEVBQWdEO0FBQzlDLGFBQU9KLFlBQVA7QUFDRDtBQUNELFFBQUlDLFVBQVVHLFNBQWQsRUFBeUI7QUFDdkJELGVBQVNGLEtBQVQ7QUFDRDtBQUNELFFBQUlDLFVBQVVFLFNBQWQsRUFBeUI7QUFDdkIsVUFBSUQsV0FBV0MsU0FBZixFQUEwQjtBQUN4QixlQUFPRixLQUFQO0FBQ0Q7QUFDRCxVQUFJLE9BQU9ELEtBQVAsSUFBZ0IsUUFBaEIsSUFBNEIsT0FBT0MsS0FBUCxJQUFnQixRQUFoRCxFQUEwRDtBQUN4REQsZ0JBQVFKLGFBQWFJLEtBQWIsQ0FBUjtBQUNBQyxnQkFBUUwsYUFBYUssS0FBYixDQUFSO0FBQ0QsT0FIRCxNQUdPO0FBQ0xELGdCQUFRTixhQUFhTSxLQUFiLENBQVI7QUFDQUMsZ0JBQVFQLGFBQWFPLEtBQWIsQ0FBUjtBQUNEO0FBQ0RDLGVBQVNKLFNBQVNFLEtBQVQsRUFBZ0JDLEtBQWhCLENBQVQ7QUFDRDtBQUNELFdBQU9DLE1BQVA7QUFDRCxHQXRCRDtBQXVCRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQlIsbUJBQWpCIiwiZmlsZSI6Il9jcmVhdGVNYXRoT3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VUb051bWJlciA9IHJlcXVpcmUoJy4vX2Jhc2VUb051bWJlcicpLFxuICAgIGJhc2VUb1N0cmluZyA9IHJlcXVpcmUoJy4vX2Jhc2VUb1N0cmluZycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHBlcmZvcm1zIGEgbWF0aGVtYXRpY2FsIG9wZXJhdGlvbiBvbiB0d28gdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcGVyYXRvciBUaGUgZnVuY3Rpb24gdG8gcGVyZm9ybSB0aGUgb3BlcmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSB1c2VkIGZvciBgdW5kZWZpbmVkYCBhcmd1bWVudHMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtYXRoZW1hdGljYWwgb3BlcmF0aW9uIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVNYXRoT3BlcmF0aW9uKG9wZXJhdG9yLCBkZWZhdWx0VmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgb3RoZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgIH1cbiAgICBpZiAob3RoZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBvdGhlcjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgdHlwZW9mIG90aGVyID09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhbHVlID0gYmFzZVRvU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgb3RoZXIgPSBiYXNlVG9TdHJpbmcob3RoZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBiYXNlVG9OdW1iZXIodmFsdWUpO1xuICAgICAgICBvdGhlciA9IGJhc2VUb051bWJlcihvdGhlcik7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBvcGVyYXRvcih2YWx1ZSwgb3RoZXIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZU1hdGhPcGVyYXRpb247XG4iXX0=