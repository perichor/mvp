'use strict';

var baseIteratee = require('./_baseIteratee'),
    baseSortedIndexBy = require('./_baseSortedIndexBy');

/**
 * This method is like `_.sortedIndex` except that it accepts `iteratee`
 * which is invoked for `value` and each element of `array` to compute their
 * sort ranking. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * var objects = [{ 'x': 4 }, { 'x': 5 }];
 *
 * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
 * // => 0
 */
function sortedIndexBy(array, value, iteratee) {
  return baseSortedIndexBy(array, value, baseIteratee(iteratee, 2));
}

module.exports = sortedIndexBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NvcnRlZEluZGV4QnkuanMiXSwibmFtZXMiOlsiYmFzZUl0ZXJhdGVlIiwicmVxdWlyZSIsImJhc2VTb3J0ZWRJbmRleEJ5Iiwic29ydGVkSW5kZXhCeSIsImFycmF5IiwidmFsdWUiLCJpdGVyYXRlZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZUFBZUMsUUFBUSxpQkFBUixDQUFuQjtBQUFBLElBQ0lDLG9CQUFvQkQsUUFBUSxzQkFBUixDQUR4Qjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxTQUFTRSxhQUFULENBQXVCQyxLQUF2QixFQUE4QkMsS0FBOUIsRUFBcUNDLFFBQXJDLEVBQStDO0FBQzdDLFNBQU9KLGtCQUFrQkUsS0FBbEIsRUFBeUJDLEtBQXpCLEVBQWdDTCxhQUFhTSxRQUFiLEVBQXVCLENBQXZCLENBQWhDLENBQVA7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQkwsYUFBakIiLCJmaWxlIjoic29ydGVkSW5kZXhCeS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlSXRlcmF0ZWUgPSByZXF1aXJlKCcuL19iYXNlSXRlcmF0ZWUnKSxcbiAgICBiYXNlU29ydGVkSW5kZXhCeSA9IHJlcXVpcmUoJy4vX2Jhc2VTb3J0ZWRJbmRleEJ5Jyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5zb3J0ZWRJbmRleGAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBgaXRlcmF0ZWVgXG4gKiB3aGljaCBpcyBpbnZva2VkIGZvciBgdmFsdWVgIGFuZCBlYWNoIGVsZW1lbnQgb2YgYGFycmF5YCB0byBjb21wdXRlIHRoZWlyXG4gKiBzb3J0IHJhbmtpbmcuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiAodmFsdWUpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIHNvcnRlZCBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gZXZhbHVhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBhdCB3aGljaCBgdmFsdWVgIHNob3VsZCBiZSBpbnNlcnRlZFxuICogIGludG8gYGFycmF5YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBbeyAneCc6IDQgfSwgeyAneCc6IDUgfV07XG4gKlxuICogXy5zb3J0ZWRJbmRleEJ5KG9iamVjdHMsIHsgJ3gnOiA0IH0sIGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8ueDsgfSk7XG4gKiAvLyA9PiAwXG4gKlxuICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLnNvcnRlZEluZGV4Qnkob2JqZWN0cywgeyAneCc6IDQgfSwgJ3gnKTtcbiAqIC8vID0+IDBcbiAqL1xuZnVuY3Rpb24gc29ydGVkSW5kZXhCeShhcnJheSwgdmFsdWUsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBiYXNlU29ydGVkSW5kZXhCeShhcnJheSwgdmFsdWUsIGJhc2VJdGVyYXRlZShpdGVyYXRlZSwgMikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRlZEluZGV4Qnk7XG4iXX0=