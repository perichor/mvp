'use strict';

var toNumber = require('./toNumber');

/**
 * Creates a function that performs a relational operation on two values.
 *
 * @private
 * @param {Function} operator The function to perform the operation.
 * @returns {Function} Returns the new relational operation function.
 */
function createRelationalOperation(operator) {
  return function (value, other) {
    if (!(typeof value == 'string' && typeof other == 'string')) {
      value = toNumber(value);
      other = toNumber(other);
    }
    return operator(value, other);
  };
}

module.exports = createRelationalOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19jcmVhdGVSZWxhdGlvbmFsT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbInRvTnVtYmVyIiwicmVxdWlyZSIsImNyZWF0ZVJlbGF0aW9uYWxPcGVyYXRpb24iLCJvcGVyYXRvciIsInZhbHVlIiwib3RoZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsWUFBUixDQUFmOztBQUVBOzs7Ozs7O0FBT0EsU0FBU0MseUJBQVQsQ0FBbUNDLFFBQW5DLEVBQTZDO0FBQzNDLFNBQU8sVUFBU0MsS0FBVCxFQUFnQkMsS0FBaEIsRUFBdUI7QUFDNUIsUUFBSSxFQUFFLE9BQU9ELEtBQVAsSUFBZ0IsUUFBaEIsSUFBNEIsT0FBT0MsS0FBUCxJQUFnQixRQUE5QyxDQUFKLEVBQTZEO0FBQzNERCxjQUFRSixTQUFTSSxLQUFULENBQVI7QUFDQUMsY0FBUUwsU0FBU0ssS0FBVCxDQUFSO0FBQ0Q7QUFDRCxXQUFPRixTQUFTQyxLQUFULEVBQWdCQyxLQUFoQixDQUFQO0FBQ0QsR0FORDtBQU9EOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCTCx5QkFBakIiLCJmaWxlIjoiX2NyZWF0ZVJlbGF0aW9uYWxPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdG9OdW1iZXIgPSByZXF1aXJlKCcuL3RvTnVtYmVyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcGVyZm9ybXMgYSByZWxhdGlvbmFsIG9wZXJhdGlvbiBvbiB0d28gdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcGVyYXRvciBUaGUgZnVuY3Rpb24gdG8gcGVyZm9ybSB0aGUgb3BlcmF0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgcmVsYXRpb25hbCBvcGVyYXRpb24gZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVJlbGF0aW9uYWxPcGVyYXRpb24ob3BlcmF0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICAgIGlmICghKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyAmJiB0eXBlb2Ygb3RoZXIgPT0gJ3N0cmluZycpKSB7XG4gICAgICB2YWx1ZSA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgICAgIG90aGVyID0gdG9OdW1iZXIob3RoZXIpO1xuICAgIH1cbiAgICByZXR1cm4gb3BlcmF0b3IodmFsdWUsIG90aGVyKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVSZWxhdGlvbmFsT3BlcmF0aW9uO1xuIl19