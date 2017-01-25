'use strict';

var createAggregator = require('./_createAggregator');

/**
 * Creates an array of elements split into two groups, the first of which
 * contains elements `predicate` returns truthy for, the second of which
 * contains elements `predicate` returns falsey for. The predicate is
 * invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the array of grouped elements.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': false },
 *   { 'user': 'fred',    'age': 40, 'active': true },
 *   { 'user': 'pebbles', 'age': 1,  'active': false }
 * ];
 *
 * _.partition(users, function(o) { return o.active; });
 * // => objects for [['fred'], ['barney', 'pebbles']]
 *
 * // The `_.matches` iteratee shorthand.
 * _.partition(users, { 'age': 1, 'active': false });
 * // => objects for [['pebbles'], ['barney', 'fred']]
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.partition(users, ['active', false]);
 * // => objects for [['barney', 'pebbles'], ['fred']]
 *
 * // The `_.property` iteratee shorthand.
 * _.partition(users, 'active');
 * // => objects for [['fred'], ['barney', 'pebbles']]
 */
var partition = createAggregator(function (result, value, key) {
  result[key ? 0 : 1].push(value);
}, function () {
  return [[], []];
});

module.exports = partition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3BhcnRpdGlvbi5qcyJdLCJuYW1lcyI6WyJjcmVhdGVBZ2dyZWdhdG9yIiwicmVxdWlyZSIsInBhcnRpdGlvbiIsInJlc3VsdCIsInZhbHVlIiwia2V5IiwicHVzaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsbUJBQW1CQyxRQUFRLHFCQUFSLENBQXZCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQ0EsSUFBSUMsWUFBWUYsaUJBQWlCLFVBQVNHLE1BQVQsRUFBaUJDLEtBQWpCLEVBQXdCQyxHQUF4QixFQUE2QjtBQUM1REYsU0FBT0UsTUFBTSxDQUFOLEdBQVUsQ0FBakIsRUFBb0JDLElBQXBCLENBQXlCRixLQUF6QjtBQUNELENBRmUsRUFFYixZQUFXO0FBQUUsU0FBTyxDQUFDLEVBQUQsRUFBSyxFQUFMLENBQVA7QUFBa0IsQ0FGbEIsQ0FBaEI7O0FBSUFHLE9BQU9DLE9BQVAsR0FBaUJOLFNBQWpCIiwiZmlsZSI6InBhcnRpdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjcmVhdGVBZ2dyZWdhdG9yID0gcmVxdWlyZSgnLi9fY3JlYXRlQWdncmVnYXRvcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgZWxlbWVudHMgc3BsaXQgaW50byB0d28gZ3JvdXBzLCB0aGUgZmlyc3Qgb2Ygd2hpY2hcbiAqIGNvbnRhaW5zIGVsZW1lbnRzIGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvciwgdGhlIHNlY29uZCBvZiB3aGljaFxuICogY29udGFpbnMgZWxlbWVudHMgYHByZWRpY2F0ZWAgcmV0dXJucyBmYWxzZXkgZm9yLiBUaGUgcHJlZGljYXRlIGlzXG4gKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiAodmFsdWUpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIGdyb3VwZWQgZWxlbWVudHMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAgJ2FnZSc6IDM2LCAnYWN0aXZlJzogZmFsc2UgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAgJ2FnZSc6IDQwLCAnYWN0aXZlJzogdHJ1ZSB9LFxuICogICB7ICd1c2VyJzogJ3BlYmJsZXMnLCAnYWdlJzogMSwgICdhY3RpdmUnOiBmYWxzZSB9XG4gKiBdO1xuICpcbiAqIF8ucGFydGl0aW9uKHVzZXJzLCBmdW5jdGlvbihvKSB7IHJldHVybiBvLmFjdGl2ZTsgfSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbWydmcmVkJ10sIFsnYmFybmV5JywgJ3BlYmJsZXMnXV1cbiAqXG4gKiAvLyBUaGUgYF8ubWF0Y2hlc2AgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5wYXJ0aXRpb24odXNlcnMsIHsgJ2FnZSc6IDEsICdhY3RpdmUnOiBmYWxzZSB9KTtcbiAqIC8vID0+IG9iamVjdHMgZm9yIFtbJ3BlYmJsZXMnXSwgWydiYXJuZXknLCAnZnJlZCddXVxuICpcbiAqIC8vIFRoZSBgXy5tYXRjaGVzUHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8ucGFydGl0aW9uKHVzZXJzLCBbJ2FjdGl2ZScsIGZhbHNlXSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbWydiYXJuZXknLCAncGViYmxlcyddLCBbJ2ZyZWQnXV1cbiAqXG4gKiAvLyBUaGUgYF8ucHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8ucGFydGl0aW9uKHVzZXJzLCAnYWN0aXZlJyk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbWydmcmVkJ10sIFsnYmFybmV5JywgJ3BlYmJsZXMnXV1cbiAqL1xudmFyIHBhcnRpdGlvbiA9IGNyZWF0ZUFnZ3JlZ2F0b3IoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gIHJlc3VsdFtrZXkgPyAwIDogMV0ucHVzaCh2YWx1ZSk7XG59LCBmdW5jdGlvbigpIHsgcmV0dXJuIFtbXSwgW11dOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJ0aXRpb247XG4iXX0=