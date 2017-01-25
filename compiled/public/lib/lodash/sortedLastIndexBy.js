'use strict';

var baseIteratee = require('./_baseIteratee'),
    baseSortedIndexBy = require('./_baseSortedIndexBy');

/**
 * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
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
 * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
 * // => 1
 *
 * // The `_.property` iteratee shorthand.
 * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
 * // => 1
 */
function sortedLastIndexBy(array, value, iteratee) {
  return baseSortedIndexBy(array, value, baseIteratee(iteratee, 2), true);
}

module.exports = sortedLastIndexBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NvcnRlZExhc3RJbmRleEJ5LmpzIl0sIm5hbWVzIjpbImJhc2VJdGVyYXRlZSIsInJlcXVpcmUiLCJiYXNlU29ydGVkSW5kZXhCeSIsInNvcnRlZExhc3RJbmRleEJ5IiwiYXJyYXkiLCJ2YWx1ZSIsIml0ZXJhdGVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5CO0FBQUEsSUFDSUMsb0JBQW9CRCxRQUFRLHNCQUFSLENBRHhCOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLFNBQVNFLGlCQUFULENBQTJCQyxLQUEzQixFQUFrQ0MsS0FBbEMsRUFBeUNDLFFBQXpDLEVBQW1EO0FBQ2pELFNBQU9KLGtCQUFrQkUsS0FBbEIsRUFBeUJDLEtBQXpCLEVBQWdDTCxhQUFhTSxRQUFiLEVBQXVCLENBQXZCLENBQWhDLEVBQTJELElBQTNELENBQVA7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQkwsaUJBQWpCIiwiZmlsZSI6InNvcnRlZExhc3RJbmRleEJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VJdGVyYXRlZSA9IHJlcXVpcmUoJy4vX2Jhc2VJdGVyYXRlZScpLFxuICAgIGJhc2VTb3J0ZWRJbmRleEJ5ID0gcmVxdWlyZSgnLi9fYmFzZVNvcnRlZEluZGV4QnknKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnNvcnRlZExhc3RJbmRleGAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBgaXRlcmF0ZWVgXG4gKiB3aGljaCBpcyBpbnZva2VkIGZvciBgdmFsdWVgIGFuZCBlYWNoIGVsZW1lbnQgb2YgYGFycmF5YCB0byBjb21wdXRlIHRoZWlyXG4gKiBzb3J0IHJhbmtpbmcuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiAodmFsdWUpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIHNvcnRlZCBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gZXZhbHVhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBhdCB3aGljaCBgdmFsdWVgIHNob3VsZCBiZSBpbnNlcnRlZFxuICogIGludG8gYGFycmF5YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBbeyAneCc6IDQgfSwgeyAneCc6IDUgfV07XG4gKlxuICogXy5zb3J0ZWRMYXN0SW5kZXhCeShvYmplY3RzLCB7ICd4JzogNCB9LCBmdW5jdGlvbihvKSB7IHJldHVybiBvLng7IH0pO1xuICogLy8gPT4gMVxuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5zb3J0ZWRMYXN0SW5kZXhCeShvYmplY3RzLCB7ICd4JzogNCB9LCAneCcpO1xuICogLy8gPT4gMVxuICovXG5mdW5jdGlvbiBzb3J0ZWRMYXN0SW5kZXhCeShhcnJheSwgdmFsdWUsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBiYXNlU29ydGVkSW5kZXhCeShhcnJheSwgdmFsdWUsIGJhc2VJdGVyYXRlZShpdGVyYXRlZSwgMiksIHRydWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRlZExhc3RJbmRleEJ5O1xuIl19