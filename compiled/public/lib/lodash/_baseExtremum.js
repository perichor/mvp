'use strict';

var isSymbol = require('./isSymbol');

/**
 * The base implementation of methods like `_.max` and `_.min` which accepts a
 * `comparator` to determine the extremum value.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per iteration.
 * @param {Function} comparator The comparator used to compare values.
 * @returns {*} Returns the extremum value.
 */
function baseExtremum(array, iteratee, comparator) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index],
        current = iteratee(value);

    if (current != null && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
      var computed = current,
          result = value;
    }
  }
  return result;
}

module.exports = baseExtremum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlRXh0cmVtdW0uanMiXSwibmFtZXMiOlsiaXNTeW1ib2wiLCJyZXF1aXJlIiwiYmFzZUV4dHJlbXVtIiwiYXJyYXkiLCJpdGVyYXRlZSIsImNvbXBhcmF0b3IiLCJpbmRleCIsImxlbmd0aCIsInZhbHVlIiwiY3VycmVudCIsImNvbXB1dGVkIiwidW5kZWZpbmVkIiwicmVzdWx0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxXQUFXQyxRQUFRLFlBQVIsQ0FBZjs7QUFFQTs7Ozs7Ozs7OztBQVVBLFNBQVNDLFlBQVQsQ0FBc0JDLEtBQXRCLEVBQTZCQyxRQUE3QixFQUF1Q0MsVUFBdkMsRUFBbUQ7QUFDakQsTUFBSUMsUUFBUSxDQUFDLENBQWI7QUFBQSxNQUNJQyxTQUFTSixNQUFNSSxNQURuQjs7QUFHQSxTQUFPLEVBQUVELEtBQUYsR0FBVUMsTUFBakIsRUFBeUI7QUFDdkIsUUFBSUMsUUFBUUwsTUFBTUcsS0FBTixDQUFaO0FBQUEsUUFDSUcsVUFBVUwsU0FBU0ksS0FBVCxDQURkOztBQUdBLFFBQUlDLFdBQVcsSUFBWCxLQUFvQkMsYUFBYUMsU0FBYixHQUNmRixZQUFZQSxPQUFaLElBQXVCLENBQUNULFNBQVNTLE9BQVQsQ0FEVCxHQUVoQkosV0FBV0ksT0FBWCxFQUFvQkMsUUFBcEIsQ0FGSixDQUFKLEVBR087QUFDTCxVQUFJQSxXQUFXRCxPQUFmO0FBQUEsVUFDSUcsU0FBU0osS0FEYjtBQUVEO0FBQ0Y7QUFDRCxTQUFPSSxNQUFQO0FBQ0Q7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUJaLFlBQWpCIiwiZmlsZSI6Il9iYXNlRXh0cmVtdW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgbWV0aG9kcyBsaWtlIGBfLm1heGAgYW5kIGBfLm1pbmAgd2hpY2ggYWNjZXB0cyBhXG4gKiBgY29tcGFyYXRvcmAgdG8gZGV0ZXJtaW5lIHRoZSBleHRyZW11bSB2YWx1ZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIHVzZWQgdG8gY29tcGFyZSB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZXh0cmVtdW0gdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VFeHRyZW11bShhcnJheSwgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGN1cnJlbnQgPSBpdGVyYXRlZSh2YWx1ZSk7XG5cbiAgICBpZiAoY3VycmVudCAhPSBudWxsICYmIChjb21wdXRlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAoY3VycmVudCA9PT0gY3VycmVudCAmJiAhaXNTeW1ib2woY3VycmVudCkpXG4gICAgICAgICAgOiBjb21wYXJhdG9yKGN1cnJlbnQsIGNvbXB1dGVkKVxuICAgICAgICApKSB7XG4gICAgICB2YXIgY29tcHV0ZWQgPSBjdXJyZW50LFxuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VFeHRyZW11bTtcbiJdfQ==