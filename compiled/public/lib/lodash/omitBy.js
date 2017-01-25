'use strict';

var baseIteratee = require('./_baseIteratee'),
    negate = require('./negate'),
    pickBy = require('./pickBy');

/**
 * The opposite of `_.pickBy`; this method creates an object composed of
 * the own and inherited enumerable string keyed properties of `object` that
 * `predicate` doesn't return truthy for. The predicate is invoked with two
 * arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omitBy(object, _.isNumber);
 * // => { 'b': '2' }
 */
function omitBy(object, predicate) {
  return pickBy(object, negate(baseIteratee(predicate)));
}

module.exports = omitBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL29taXRCeS5qcyJdLCJuYW1lcyI6WyJiYXNlSXRlcmF0ZWUiLCJyZXF1aXJlIiwibmVnYXRlIiwicGlja0J5Iiwib21pdEJ5Iiwib2JqZWN0IiwicHJlZGljYXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5CO0FBQUEsSUFDSUMsU0FBU0QsUUFBUSxVQUFSLENBRGI7QUFBQSxJQUVJRSxTQUFTRixRQUFRLFVBQVIsQ0FGYjs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsU0FBU0csTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0JDLFNBQXhCLEVBQW1DO0FBQ2pDLFNBQU9ILE9BQU9FLE1BQVAsRUFBZUgsT0FBT0YsYUFBYU0sU0FBYixDQUFQLENBQWYsQ0FBUDtBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCSixNQUFqQiIsImZpbGUiOiJvbWl0QnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgbmVnYXRlID0gcmVxdWlyZSgnLi9uZWdhdGUnKSxcbiAgICBwaWNrQnkgPSByZXF1aXJlKCcuL3BpY2tCeScpO1xuXG4vKipcbiAqIFRoZSBvcHBvc2l0ZSBvZiBgXy5waWNrQnlgOyB0aGlzIG1ldGhvZCBjcmVhdGVzIGFuIG9iamVjdCBjb21wb3NlZCBvZlxuICogdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2YgYG9iamVjdGAgdGhhdFxuICogYHByZWRpY2F0ZWAgZG9lc24ndCByZXR1cm4gdHJ1dGh5IGZvci4gVGhlIHByZWRpY2F0ZSBpcyBpbnZva2VkIHdpdGggdHdvXG4gKiBhcmd1bWVudHM6ICh2YWx1ZSwga2V5KS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogJzInLCAnYyc6IDMgfTtcbiAqXG4gKiBfLm9taXRCeShvYmplY3QsIF8uaXNOdW1iZXIpO1xuICogLy8gPT4geyAnYic6ICcyJyB9XG4gKi9cbmZ1bmN0aW9uIG9taXRCeShvYmplY3QsIHByZWRpY2F0ZSkge1xuICByZXR1cm4gcGlja0J5KG9iamVjdCwgbmVnYXRlKGJhc2VJdGVyYXRlZShwcmVkaWNhdGUpKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb21pdEJ5O1xuIl19