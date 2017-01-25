'use strict';

var baseIteratee = require('./_baseIteratee'),
    baseWhile = require('./_baseWhile');

/**
 * Creates a slice of `array` with elements taken from the end. Elements are
 * taken until `predicate` returns falsey. The predicate is invoked with
 * three arguments: (value, index, array).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ];
 *
 * _.takeRightWhile(users, function(o) { return !o.active; });
 * // => objects for ['fred', 'pebbles']
 *
 * // The `_.matches` iteratee shorthand.
 * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
 * // => objects for ['pebbles']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.takeRightWhile(users, ['active', false]);
 * // => objects for ['fred', 'pebbles']
 *
 * // The `_.property` iteratee shorthand.
 * _.takeRightWhile(users, 'active');
 * // => []
 */
function takeRightWhile(array, predicate) {
    return array && array.length ? baseWhile(array, baseIteratee(predicate, 3), false, true) : [];
}

module.exports = takeRightWhile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3Rha2VSaWdodFdoaWxlLmpzIl0sIm5hbWVzIjpbImJhc2VJdGVyYXRlZSIsInJlcXVpcmUiLCJiYXNlV2hpbGUiLCJ0YWtlUmlnaHRXaGlsZSIsImFycmF5IiwicHJlZGljYXRlIiwibGVuZ3RoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5CO0FBQUEsSUFDSUMsWUFBWUQsUUFBUSxjQUFSLENBRGhCOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1DQSxTQUFTRSxjQUFULENBQXdCQyxLQUF4QixFQUErQkMsU0FBL0IsRUFBMEM7QUFDeEMsV0FBUUQsU0FBU0EsTUFBTUUsTUFBaEIsR0FDSEosVUFBVUUsS0FBVixFQUFpQkosYUFBYUssU0FBYixFQUF3QixDQUF4QixDQUFqQixFQUE2QyxLQUE3QyxFQUFvRCxJQUFwRCxDQURHLEdBRUgsRUFGSjtBQUdEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCTCxjQUFqQiIsImZpbGUiOiJ0YWtlUmlnaHRXaGlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlSXRlcmF0ZWUgPSByZXF1aXJlKCcuL19iYXNlSXRlcmF0ZWUnKSxcbiAgICBiYXNlV2hpbGUgPSByZXF1aXJlKCcuL19iYXNlV2hpbGUnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc2xpY2Ugb2YgYGFycmF5YCB3aXRoIGVsZW1lbnRzIHRha2VuIGZyb20gdGhlIGVuZC4gRWxlbWVudHMgYXJlXG4gKiB0YWtlbiB1bnRpbCBgcHJlZGljYXRlYCByZXR1cm5zIGZhbHNleS4gVGhlIHByZWRpY2F0ZSBpcyBpbnZva2VkIHdpdGhcbiAqIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleCwgYXJyYXkpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBzbGljZSBvZiBgYXJyYXlgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhY3RpdmUnOiB0cnVlIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgICdhY3RpdmUnOiBmYWxzZSB9LFxuICogICB7ICd1c2VyJzogJ3BlYmJsZXMnLCAnYWN0aXZlJzogZmFsc2UgfVxuICogXTtcbiAqXG4gKiBfLnRha2VSaWdodFdoaWxlKHVzZXJzLCBmdW5jdGlvbihvKSB7IHJldHVybiAhby5hY3RpdmU7IH0pO1xuICogLy8gPT4gb2JqZWN0cyBmb3IgWydmcmVkJywgJ3BlYmJsZXMnXVxuICpcbiAqIC8vIFRoZSBgXy5tYXRjaGVzYCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLnRha2VSaWdodFdoaWxlKHVzZXJzLCB7ICd1c2VyJzogJ3BlYmJsZXMnLCAnYWN0aXZlJzogZmFsc2UgfSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbJ3BlYmJsZXMnXVxuICpcbiAqIC8vIFRoZSBgXy5tYXRjaGVzUHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8udGFrZVJpZ2h0V2hpbGUodXNlcnMsIFsnYWN0aXZlJywgZmFsc2VdKTtcbiAqIC8vID0+IG9iamVjdHMgZm9yIFsnZnJlZCcsICdwZWJibGVzJ11cbiAqXG4gKiAvLyBUaGUgYF8ucHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8udGFrZVJpZ2h0V2hpbGUodXNlcnMsICdhY3RpdmUnKTtcbiAqIC8vID0+IFtdXG4gKi9cbmZ1bmN0aW9uIHRha2VSaWdodFdoaWxlKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpXG4gICAgPyBiYXNlV2hpbGUoYXJyYXksIGJhc2VJdGVyYXRlZShwcmVkaWNhdGUsIDMpLCBmYWxzZSwgdHJ1ZSlcbiAgICA6IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRha2VSaWdodFdoaWxlO1xuIl19