'use strict';

var baseFlatten = require('./_baseFlatten'),
    baseOrderBy = require('./_baseOrderBy'),
    baseRest = require('./_baseRest'),
    isIterateeCall = require('./_isIterateeCall');

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 */
var sortBy = baseRest(function (collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});

module.exports = sortBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NvcnRCeS5qcyJdLCJuYW1lcyI6WyJiYXNlRmxhdHRlbiIsInJlcXVpcmUiLCJiYXNlT3JkZXJCeSIsImJhc2VSZXN0IiwiaXNJdGVyYXRlZUNhbGwiLCJzb3J0QnkiLCJjb2xsZWN0aW9uIiwiaXRlcmF0ZWVzIiwibGVuZ3RoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxjQUFjQyxRQUFRLGdCQUFSLENBQWxCO0FBQUEsSUFDSUMsY0FBY0QsUUFBUSxnQkFBUixDQURsQjtBQUFBLElBRUlFLFdBQVdGLFFBQVEsYUFBUixDQUZmO0FBQUEsSUFHSUcsaUJBQWlCSCxRQUFRLG1CQUFSLENBSHJCOztBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCQSxJQUFJSSxTQUFTRixTQUFTLFVBQVNHLFVBQVQsRUFBcUJDLFNBQXJCLEVBQWdDO0FBQ3BELE1BQUlELGNBQWMsSUFBbEIsRUFBd0I7QUFDdEIsV0FBTyxFQUFQO0FBQ0Q7QUFDRCxNQUFJRSxTQUFTRCxVQUFVQyxNQUF2QjtBQUNBLE1BQUlBLFNBQVMsQ0FBVCxJQUFjSixlQUFlRSxVQUFmLEVBQTJCQyxVQUFVLENBQVYsQ0FBM0IsRUFBeUNBLFVBQVUsQ0FBVixDQUF6QyxDQUFsQixFQUEwRTtBQUN4RUEsZ0JBQVksRUFBWjtBQUNELEdBRkQsTUFFTyxJQUFJQyxTQUFTLENBQVQsSUFBY0osZUFBZUcsVUFBVSxDQUFWLENBQWYsRUFBNkJBLFVBQVUsQ0FBVixDQUE3QixFQUEyQ0EsVUFBVSxDQUFWLENBQTNDLENBQWxCLEVBQTRFO0FBQ2pGQSxnQkFBWSxDQUFDQSxVQUFVLENBQVYsQ0FBRCxDQUFaO0FBQ0Q7QUFDRCxTQUFPTCxZQUFZSSxVQUFaLEVBQXdCTixZQUFZTyxTQUFaLEVBQXVCLENBQXZCLENBQXhCLEVBQW1ELEVBQW5ELENBQVA7QUFDRCxDQVhZLENBQWI7O0FBYUFFLE9BQU9DLE9BQVAsR0FBaUJMLE1BQWpCIiwiZmlsZSI6InNvcnRCeS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlRmxhdHRlbiA9IHJlcXVpcmUoJy4vX2Jhc2VGbGF0dGVuJyksXG4gICAgYmFzZU9yZGVyQnkgPSByZXF1aXJlKCcuL19iYXNlT3JkZXJCeScpLFxuICAgIGJhc2VSZXN0ID0gcmVxdWlyZSgnLi9fYmFzZVJlc3QnKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJy4vX2lzSXRlcmF0ZWVDYWxsJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBlbGVtZW50cywgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlciBieSB0aGUgcmVzdWx0cyBvZlxuICogcnVubmluZyBlYWNoIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uIHRocnUgZWFjaCBpdGVyYXRlZS4gVGhpcyBtZXRob2RcbiAqIHBlcmZvcm1zIGEgc3RhYmxlIHNvcnQsIHRoYXQgaXMsIGl0IHByZXNlcnZlcyB0aGUgb3JpZ2luYWwgc29ydCBvcmRlciBvZlxuICogZXF1YWwgZWxlbWVudHMuIFRoZSBpdGVyYXRlZXMgYXJlIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6ICh2YWx1ZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7Li4uKEZ1bmN0aW9ufEZ1bmN0aW9uW10pfSBbaXRlcmF0ZWVzPVtfLmlkZW50aXR5XV1cbiAqICBUaGUgaXRlcmF0ZWVzIHRvIHNvcnQgYnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBzb3J0ZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAnYWdlJzogNDggfSxcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJywgICAnYWdlJzogNDAgfSxcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzQgfVxuICogXTtcbiAqXG4gKiBfLnNvcnRCeSh1c2VycywgW2Z1bmN0aW9uKG8pIHsgcmV0dXJuIG8udXNlcjsgfV0pO1xuICogLy8gPT4gb2JqZWN0cyBmb3IgW1snYmFybmV5JywgMzZdLCBbJ2Jhcm5leScsIDM0XSwgWydmcmVkJywgNDhdLCBbJ2ZyZWQnLCA0MF1dXG4gKlxuICogXy5zb3J0QnkodXNlcnMsIFsndXNlcicsICdhZ2UnXSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbWydiYXJuZXknLCAzNF0sIFsnYmFybmV5JywgMzZdLCBbJ2ZyZWQnLCA0MF0sIFsnZnJlZCcsIDQ4XV1cbiAqL1xudmFyIHNvcnRCeSA9IGJhc2VSZXN0KGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGl0ZXJhdGVlcykge1xuICBpZiAoY29sbGVjdGlvbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHZhciBsZW5ndGggPSBpdGVyYXRlZXMubGVuZ3RoO1xuICBpZiAobGVuZ3RoID4gMSAmJiBpc0l0ZXJhdGVlQ2FsbChjb2xsZWN0aW9uLCBpdGVyYXRlZXNbMF0sIGl0ZXJhdGVlc1sxXSkpIHtcbiAgICBpdGVyYXRlZXMgPSBbXTtcbiAgfSBlbHNlIGlmIChsZW5ndGggPiAyICYmIGlzSXRlcmF0ZWVDYWxsKGl0ZXJhdGVlc1swXSwgaXRlcmF0ZWVzWzFdLCBpdGVyYXRlZXNbMl0pKSB7XG4gICAgaXRlcmF0ZWVzID0gW2l0ZXJhdGVlc1swXV07XG4gIH1cbiAgcmV0dXJuIGJhc2VPcmRlckJ5KGNvbGxlY3Rpb24sIGJhc2VGbGF0dGVuKGl0ZXJhdGVlcywgMSksIFtdKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRCeTtcbiJdfQ==