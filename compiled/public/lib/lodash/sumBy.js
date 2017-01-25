'use strict';

var baseIteratee = require('./_baseIteratee'),
    baseSum = require('./_baseSum');

/**
 * This method is like `_.sum` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the value to be summed.
 * The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {number} Returns the sum.
 * @example
 *
 * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
 *
 * _.sumBy(objects, function(o) { return o.n; });
 * // => 20
 *
 * // The `_.property` iteratee shorthand.
 * _.sumBy(objects, 'n');
 * // => 20
 */
function sumBy(array, iteratee) {
    return array && array.length ? baseSum(array, baseIteratee(iteratee, 2)) : 0;
}

module.exports = sumBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3N1bUJ5LmpzIl0sIm5hbWVzIjpbImJhc2VJdGVyYXRlZSIsInJlcXVpcmUiLCJiYXNlU3VtIiwic3VtQnkiLCJhcnJheSIsIml0ZXJhdGVlIiwibGVuZ3RoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5CO0FBQUEsSUFDSUMsVUFBVUQsUUFBUSxZQUFSLENBRGQ7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLFNBQVNFLEtBQVQsQ0FBZUMsS0FBZixFQUFzQkMsUUFBdEIsRUFBZ0M7QUFDOUIsV0FBUUQsU0FBU0EsTUFBTUUsTUFBaEIsR0FDSEosUUFBUUUsS0FBUixFQUFlSixhQUFhSyxRQUFiLEVBQXVCLENBQXZCLENBQWYsQ0FERyxHQUVILENBRko7QUFHRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQkwsS0FBakIiLCJmaWxlIjoic3VtQnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgYmFzZVN1bSA9IHJlcXVpcmUoJy4vX2Jhc2VTdW0nKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnN1bWAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBgaXRlcmF0ZWVgIHdoaWNoIGlzXG4gKiBpbnZva2VkIGZvciBlYWNoIGVsZW1lbnQgaW4gYGFycmF5YCB0byBnZW5lcmF0ZSB0aGUgdmFsdWUgdG8gYmUgc3VtbWVkLlxuICogVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6ICh2YWx1ZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzdW0uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gW3sgJ24nOiA0IH0sIHsgJ24nOiAyIH0sIHsgJ24nOiA4IH0sIHsgJ24nOiA2IH1dO1xuICpcbiAqIF8uc3VtQnkob2JqZWN0cywgZnVuY3Rpb24obykgeyByZXR1cm4gby5uOyB9KTtcbiAqIC8vID0+IDIwXG4gKlxuICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLnN1bUJ5KG9iamVjdHMsICduJyk7XG4gKiAvLyA9PiAyMFxuICovXG5mdW5jdGlvbiBzdW1CeShhcnJheSwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpXG4gICAgPyBiYXNlU3VtKGFycmF5LCBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUsIDIpKVxuICAgIDogMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdW1CeTtcbiJdfQ==