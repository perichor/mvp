'use strict';

var baseFindIndex = require('./_baseFindIndex'),
    baseIteratee = require('./_baseIteratee'),
    toInteger = require('./toInteger');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * This method is like `_.findIndex` except that it iterates over elements
 * of `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ];
 *
 * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
 * // => 2
 *
 * // The `_.matches` iteratee shorthand.
 * _.findLastIndex(users, { 'user': 'barney', 'active': true });
 * // => 0
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findLastIndex(users, ['active', false]);
 * // => 2
 *
 * // The `_.property` iteratee shorthand.
 * _.findLastIndex(users, 'active');
 * // => 0
 */
function findLastIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = length - 1;
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex);
    index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index, true);
}

module.exports = findLastIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZpbmRMYXN0SW5kZXguanMiXSwibmFtZXMiOlsiYmFzZUZpbmRJbmRleCIsInJlcXVpcmUiLCJiYXNlSXRlcmF0ZWUiLCJ0b0ludGVnZXIiLCJuYXRpdmVNYXgiLCJNYXRoIiwibWF4IiwibmF0aXZlTWluIiwibWluIiwiZmluZExhc3RJbmRleCIsImFycmF5IiwicHJlZGljYXRlIiwiZnJvbUluZGV4IiwibGVuZ3RoIiwiaW5kZXgiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGdCQUFnQkMsUUFBUSxrQkFBUixDQUFwQjtBQUFBLElBQ0lDLGVBQWVELFFBQVEsaUJBQVIsQ0FEbkI7QUFBQSxJQUVJRSxZQUFZRixRQUFRLGFBQVIsQ0FGaEI7O0FBSUE7QUFDQSxJQUFJRyxZQUFZQyxLQUFLQyxHQUFyQjtBQUFBLElBQ0lDLFlBQVlGLEtBQUtHLEdBRHJCOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1DQSxTQUFTQyxhQUFULENBQXVCQyxLQUF2QixFQUE4QkMsU0FBOUIsRUFBeUNDLFNBQXpDLEVBQW9EO0FBQ2xELE1BQUlDLFNBQVNILFNBQVMsSUFBVCxHQUFnQixDQUFoQixHQUFvQkEsTUFBTUcsTUFBdkM7QUFDQSxNQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYLFdBQU8sQ0FBQyxDQUFSO0FBQ0Q7QUFDRCxNQUFJQyxRQUFRRCxTQUFTLENBQXJCO0FBQ0EsTUFBSUQsY0FBY0csU0FBbEIsRUFBNkI7QUFDM0JELFlBQVFYLFVBQVVTLFNBQVYsQ0FBUjtBQUNBRSxZQUFRRixZQUFZLENBQVosR0FDSlIsVUFBVVMsU0FBU0MsS0FBbkIsRUFBMEIsQ0FBMUIsQ0FESSxHQUVKUCxVQUFVTyxLQUFWLEVBQWlCRCxTQUFTLENBQTFCLENBRko7QUFHRDtBQUNELFNBQU9iLGNBQWNVLEtBQWQsRUFBcUJSLGFBQWFTLFNBQWIsRUFBd0IsQ0FBeEIsQ0FBckIsRUFBaURHLEtBQWpELEVBQXdELElBQXhELENBQVA7QUFDRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQlIsYUFBakIiLCJmaWxlIjoiZmluZExhc3RJbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlRmluZEluZGV4ID0gcmVxdWlyZSgnLi9fYmFzZUZpbmRJbmRleCcpLFxuICAgIGJhc2VJdGVyYXRlZSA9IHJlcXVpcmUoJy4vX2Jhc2VJdGVyYXRlZScpLFxuICAgIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vdG9JbnRlZ2VyJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmZpbmRJbmRleGAgZXhjZXB0IHRoYXQgaXQgaXRlcmF0ZXMgb3ZlciBlbGVtZW50c1xuICogb2YgYGNvbGxlY3Rpb25gIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtmcm9tSW5kZXg9YXJyYXkubGVuZ3RoLTFdIFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmb3VuZCBlbGVtZW50LCBlbHNlIGAtMWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAgJ2FjdGl2ZSc6IHRydWUgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAgJ2FjdGl2ZSc6IGZhbHNlIH0sXG4gKiAgIHsgJ3VzZXInOiAncGViYmxlcycsICdhY3RpdmUnOiBmYWxzZSB9XG4gKiBdO1xuICpcbiAqIF8uZmluZExhc3RJbmRleCh1c2VycywgZnVuY3Rpb24obykgeyByZXR1cm4gby51c2VyID09ICdwZWJibGVzJzsgfSk7XG4gKiAvLyA9PiAyXG4gKlxuICogLy8gVGhlIGBfLm1hdGNoZXNgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmluZExhc3RJbmRleCh1c2VycywgeyAndXNlcic6ICdiYXJuZXknLCAnYWN0aXZlJzogdHJ1ZSB9KTtcbiAqIC8vID0+IDBcbiAqXG4gKiAvLyBUaGUgYF8ubWF0Y2hlc1Byb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLmZpbmRMYXN0SW5kZXgodXNlcnMsIFsnYWN0aXZlJywgZmFsc2VdKTtcbiAqIC8vID0+IDJcbiAqXG4gKiAvLyBUaGUgYF8ucHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmluZExhc3RJbmRleCh1c2VycywgJ2FjdGl2ZScpO1xuICogLy8gPT4gMFxuICovXG5mdW5jdGlvbiBmaW5kTGFzdEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21JbmRleCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIHZhciBpbmRleCA9IGxlbmd0aCAtIDE7XG4gIGlmIChmcm9tSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgIGluZGV4ID0gdG9JbnRlZ2VyKGZyb21JbmRleCk7XG4gICAgaW5kZXggPSBmcm9tSW5kZXggPCAwXG4gICAgICA/IG5hdGl2ZU1heChsZW5ndGggKyBpbmRleCwgMClcbiAgICAgIDogbmF0aXZlTWluKGluZGV4LCBsZW5ndGggLSAxKTtcbiAgfVxuICByZXR1cm4gYmFzZUZpbmRJbmRleChhcnJheSwgYmFzZUl0ZXJhdGVlKHByZWRpY2F0ZSwgMyksIGluZGV4LCB0cnVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kTGFzdEluZGV4O1xuIl19