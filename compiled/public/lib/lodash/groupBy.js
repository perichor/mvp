'use strict';

var baseAssignValue = require('./_baseAssignValue'),
    createAggregator = require('./_createAggregator');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The order of grouped values
 * is determined by the order they occur in `collection`. The corresponding
 * value of each key is an array of elements responsible for generating the
 * key. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * _.groupBy([6.1, 4.2, 6.3], Math.floor);
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 *
 * // The `_.property` iteratee shorthand.
 * _.groupBy(['one', 'two', 'three'], 'length');
 * // => { '3': ['one', 'two'], '5': ['three'] }
 */
var groupBy = createAggregator(function (result, value, key) {
  if (hasOwnProperty.call(result, key)) {
    result[key].push(value);
  } else {
    baseAssignValue(result, key, [value]);
  }
});

module.exports = groupBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2dyb3VwQnkuanMiXSwibmFtZXMiOlsiYmFzZUFzc2lnblZhbHVlIiwicmVxdWlyZSIsImNyZWF0ZUFnZ3JlZ2F0b3IiLCJvYmplY3RQcm90byIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiZ3JvdXBCeSIsInJlc3VsdCIsInZhbHVlIiwia2V5IiwiY2FsbCIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGtCQUFrQkMsUUFBUSxvQkFBUixDQUF0QjtBQUFBLElBQ0lDLG1CQUFtQkQsUUFBUSxxQkFBUixDQUR2Qjs7QUFHQTtBQUNBLElBQUlFLGNBQWNDLE9BQU9DLFNBQXpCOztBQUVBO0FBQ0EsSUFBSUMsaUJBQWlCSCxZQUFZRyxjQUFqQzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsSUFBSUMsVUFBVUwsaUJBQWlCLFVBQVNNLE1BQVQsRUFBaUJDLEtBQWpCLEVBQXdCQyxHQUF4QixFQUE2QjtBQUMxRCxNQUFJSixlQUFlSyxJQUFmLENBQW9CSCxNQUFwQixFQUE0QkUsR0FBNUIsQ0FBSixFQUFzQztBQUNwQ0YsV0FBT0UsR0FBUCxFQUFZRSxJQUFaLENBQWlCSCxLQUFqQjtBQUNELEdBRkQsTUFFTztBQUNMVCxvQkFBZ0JRLE1BQWhCLEVBQXdCRSxHQUF4QixFQUE2QixDQUFDRCxLQUFELENBQTdCO0FBQ0Q7QUFDRixDQU5hLENBQWQ7O0FBUUFJLE9BQU9DLE9BQVAsR0FBaUJQLE9BQWpCIiwiZmlsZSI6Imdyb3VwQnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYmFzZUFzc2lnblZhbHVlJyksXG4gICAgY3JlYXRlQWdncmVnYXRvciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUFnZ3JlZ2F0b3InKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCBjb21wb3NlZCBvZiBrZXlzIGdlbmVyYXRlZCBmcm9tIHRoZSByZXN1bHRzIG9mIHJ1bm5pbmdcbiAqIGVhY2ggZWxlbWVudCBvZiBgY29sbGVjdGlvbmAgdGhydSBgaXRlcmF0ZWVgLiBUaGUgb3JkZXIgb2YgZ3JvdXBlZCB2YWx1ZXNcbiAqIGlzIGRldGVybWluZWQgYnkgdGhlIG9yZGVyIHRoZXkgb2NjdXIgaW4gYGNvbGxlY3Rpb25gLiBUaGUgY29ycmVzcG9uZGluZ1xuICogdmFsdWUgb2YgZWFjaCBrZXkgaXMgYW4gYXJyYXkgb2YgZWxlbWVudHMgcmVzcG9uc2libGUgZm9yIGdlbmVyYXRpbmcgdGhlXG4gKiBrZXkuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiAodmFsdWUpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGl0ZXJhdGVlIHRvIHRyYW5zZm9ybSBrZXlzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29tcG9zZWQgYWdncmVnYXRlIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5ncm91cEJ5KFs2LjEsIDQuMiwgNi4zXSwgTWF0aC5mbG9vcik7XG4gKiAvLyA9PiB7ICc0JzogWzQuMl0sICc2JzogWzYuMSwgNi4zXSB9XG4gKlxuICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLmdyb3VwQnkoWydvbmUnLCAndHdvJywgJ3RocmVlJ10sICdsZW5ndGgnKTtcbiAqIC8vID0+IHsgJzMnOiBbJ29uZScsICd0d28nXSwgJzUnOiBbJ3RocmVlJ10gfVxuICovXG52YXIgZ3JvdXBCeSA9IGNyZWF0ZUFnZ3JlZ2F0b3IoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdCwga2V5KSkge1xuICAgIHJlc3VsdFtrZXldLnB1c2godmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIGJhc2VBc3NpZ25WYWx1ZShyZXN1bHQsIGtleSwgW3ZhbHVlXSk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdyb3VwQnk7XG4iXX0=