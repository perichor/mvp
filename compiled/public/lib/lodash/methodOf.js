'use strict';

var baseInvoke = require('./_baseInvoke'),
    baseRest = require('./_baseRest');

/**
 * The opposite of `_.method`; this method creates a function that invokes
 * the method at a given path of `object`. Any additional arguments are
 * provided to the invoked method.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Util
 * @param {Object} object The object to query.
 * @param {...*} [args] The arguments to invoke the method with.
 * @returns {Function} Returns the new invoker function.
 * @example
 *
 * var array = _.times(3, _.constant),
 *     object = { 'a': array, 'b': array, 'c': array };
 *
 * _.map(['a[2]', 'c[0]'], _.methodOf(object));
 * // => [2, 0]
 *
 * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
 * // => [2, 0]
 */
var methodOf = baseRest(function (object, args) {
  return function (path) {
    return baseInvoke(object, path, args);
  };
});

module.exports = methodOf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL21ldGhvZE9mLmpzIl0sIm5hbWVzIjpbImJhc2VJbnZva2UiLCJyZXF1aXJlIiwiYmFzZVJlc3QiLCJtZXRob2RPZiIsIm9iamVjdCIsImFyZ3MiLCJwYXRoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxhQUFhQyxRQUFRLGVBQVIsQ0FBakI7QUFBQSxJQUNJQyxXQUFXRCxRQUFRLGFBQVIsQ0FEZjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsSUFBSUUsV0FBV0QsU0FBUyxVQUFTRSxNQUFULEVBQWlCQyxJQUFqQixFQUF1QjtBQUM3QyxTQUFPLFVBQVNDLElBQVQsRUFBZTtBQUNwQixXQUFPTixXQUFXSSxNQUFYLEVBQW1CRSxJQUFuQixFQUF5QkQsSUFBekIsQ0FBUDtBQUNELEdBRkQ7QUFHRCxDQUpjLENBQWY7O0FBTUFFLE9BQU9DLE9BQVAsR0FBaUJMLFFBQWpCIiwiZmlsZSI6Im1ldGhvZE9mLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VJbnZva2UgPSByZXF1aXJlKCcuL19iYXNlSW52b2tlJyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpO1xuXG4vKipcbiAqIFRoZSBvcHBvc2l0ZSBvZiBgXy5tZXRob2RgOyB0aGlzIG1ldGhvZCBjcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzXG4gKiB0aGUgbWV0aG9kIGF0IGEgZ2l2ZW4gcGF0aCBvZiBgb2JqZWN0YC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIGFyZVxuICogcHJvdmlkZWQgdG8gdGhlIGludm9rZWQgbWV0aG9kLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy43LjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSBUaGUgYXJndW1lbnRzIHRvIGludm9rZSB0aGUgbWV0aG9kIHdpdGguXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBpbnZva2VyIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXkgPSBfLnRpbWVzKDMsIF8uY29uc3RhbnQpLFxuICogICAgIG9iamVjdCA9IHsgJ2EnOiBhcnJheSwgJ2InOiBhcnJheSwgJ2MnOiBhcnJheSB9O1xuICpcbiAqIF8ubWFwKFsnYVsyXScsICdjWzBdJ10sIF8ubWV0aG9kT2Yob2JqZWN0KSk7XG4gKiAvLyA9PiBbMiwgMF1cbiAqXG4gKiBfLm1hcChbWydhJywgJzInXSwgWydjJywgJzAnXV0sIF8ubWV0aG9kT2Yob2JqZWN0KSk7XG4gKiAvLyA9PiBbMiwgMF1cbiAqL1xudmFyIG1ldGhvZE9mID0gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbihwYXRoKSB7XG4gICAgcmV0dXJuIGJhc2VJbnZva2Uob2JqZWN0LCBwYXRoLCBhcmdzKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1ldGhvZE9mO1xuIl19