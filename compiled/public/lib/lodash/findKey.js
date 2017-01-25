'use strict';

var baseFindKey = require('./_baseFindKey'),
    baseForOwn = require('./_baseForOwn'),
    baseIteratee = require('./_baseIteratee');

/**
 * This method is like `_.find` except that it returns the key of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {string|undefined} Returns the key of the matched element,
 *  else `undefined`.
 * @example
 *
 * var users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * };
 *
 * _.findKey(users, function(o) { return o.age < 40; });
 * // => 'barney' (iteration order is not guaranteed)
 *
 * // The `_.matches` iteratee shorthand.
 * _.findKey(users, { 'age': 1, 'active': true });
 * // => 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findKey(users, ['active', false]);
 * // => 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.findKey(users, 'active');
 * // => 'barney'
 */
function findKey(object, predicate) {
  return baseFindKey(object, baseIteratee(predicate, 3), baseForOwn);
}

module.exports = findKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZpbmRLZXkuanMiXSwibmFtZXMiOlsiYmFzZUZpbmRLZXkiLCJyZXF1aXJlIiwiYmFzZUZvck93biIsImJhc2VJdGVyYXRlZSIsImZpbmRLZXkiLCJvYmplY3QiLCJwcmVkaWNhdGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGNBQWNDLFFBQVEsZ0JBQVIsQ0FBbEI7QUFBQSxJQUNJQyxhQUFhRCxRQUFRLGVBQVIsQ0FEakI7QUFBQSxJQUVJRSxlQUFlRixRQUFRLGlCQUFSLENBRm5COztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1DQSxTQUFTRyxPQUFULENBQWlCQyxNQUFqQixFQUF5QkMsU0FBekIsRUFBb0M7QUFDbEMsU0FBT04sWUFBWUssTUFBWixFQUFvQkYsYUFBYUcsU0FBYixFQUF3QixDQUF4QixDQUFwQixFQUFnREosVUFBaEQsQ0FBUDtBQUNEOztBQUVESyxPQUFPQyxPQUFQLEdBQWlCSixPQUFqQiIsImZpbGUiOiJmaW5kS2V5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VGaW5kS2V5ID0gcmVxdWlyZSgnLi9fYmFzZUZpbmRLZXknKSxcbiAgICBiYXNlRm9yT3duID0gcmVxdWlyZSgnLi9fYmFzZUZvck93bicpLFxuICAgIGJhc2VJdGVyYXRlZSA9IHJlcXVpcmUoJy4vX2Jhc2VJdGVyYXRlZScpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uZmluZGAgZXhjZXB0IHRoYXQgaXQgcmV0dXJucyB0aGUga2V5IG9mIHRoZSBmaXJzdFxuICogZWxlbWVudCBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IgaW5zdGVhZCBvZiB0aGUgZWxlbWVudCBpdHNlbGYuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAxLjEuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH0gUmV0dXJucyB0aGUga2V5IG9mIHRoZSBtYXRjaGVkIGVsZW1lbnQsXG4gKiAgZWxzZSBgdW5kZWZpbmVkYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0ge1xuICogICAnYmFybmV5JzogIHsgJ2FnZSc6IDM2LCAnYWN0aXZlJzogdHJ1ZSB9LFxuICogICAnZnJlZCc6ICAgIHsgJ2FnZSc6IDQwLCAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgJ3BlYmJsZXMnOiB7ICdhZ2UnOiAxLCAgJ2FjdGl2ZSc6IHRydWUgfVxuICogfTtcbiAqXG4gKiBfLmZpbmRLZXkodXNlcnMsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8uYWdlIDwgNDA7IH0pO1xuICogLy8gPT4gJ2Jhcm5leScgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiAvLyBUaGUgYF8ubWF0Y2hlc2AgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5maW5kS2V5KHVzZXJzLCB7ICdhZ2UnOiAxLCAnYWN0aXZlJzogdHJ1ZSB9KTtcbiAqIC8vID0+ICdwZWJibGVzJ1xuICpcbiAqIC8vIFRoZSBgXy5tYXRjaGVzUHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmluZEtleSh1c2VycywgWydhY3RpdmUnLCBmYWxzZV0pO1xuICogLy8gPT4gJ2ZyZWQnXG4gKlxuICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLmZpbmRLZXkodXNlcnMsICdhY3RpdmUnKTtcbiAqIC8vID0+ICdiYXJuZXknXG4gKi9cbmZ1bmN0aW9uIGZpbmRLZXkob2JqZWN0LCBwcmVkaWNhdGUpIHtcbiAgcmV0dXJuIGJhc2VGaW5kS2V5KG9iamVjdCwgYmFzZUl0ZXJhdGVlKHByZWRpY2F0ZSwgMyksIGJhc2VGb3JPd24pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbmRLZXk7XG4iXX0=