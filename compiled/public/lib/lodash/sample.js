'use strict';

var arraySample = require('./_arraySample'),
    baseSample = require('./_baseSample'),
    isArray = require('./isArray');

/**
 * Gets a random element from `collection`.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to sample.
 * @returns {*} Returns the random element.
 * @example
 *
 * _.sample([1, 2, 3, 4]);
 * // => 2
 */
function sample(collection) {
  var func = isArray(collection) ? arraySample : baseSample;
  return func(collection);
}

module.exports = sample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NhbXBsZS5qcyJdLCJuYW1lcyI6WyJhcnJheVNhbXBsZSIsInJlcXVpcmUiLCJiYXNlU2FtcGxlIiwiaXNBcnJheSIsInNhbXBsZSIsImNvbGxlY3Rpb24iLCJmdW5jIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxjQUFjQyxRQUFRLGdCQUFSLENBQWxCO0FBQUEsSUFDSUMsYUFBYUQsUUFBUSxlQUFSLENBRGpCO0FBQUEsSUFFSUUsVUFBVUYsUUFBUSxXQUFSLENBRmQ7O0FBSUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsU0FBU0csTUFBVCxDQUFnQkMsVUFBaEIsRUFBNEI7QUFDMUIsTUFBSUMsT0FBT0gsUUFBUUUsVUFBUixJQUFzQkwsV0FBdEIsR0FBb0NFLFVBQS9DO0FBQ0EsU0FBT0ksS0FBS0QsVUFBTCxDQUFQO0FBQ0Q7O0FBRURFLE9BQU9DLE9BQVAsR0FBaUJKLE1BQWpCIiwiZmlsZSI6InNhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcnJheVNhbXBsZSA9IHJlcXVpcmUoJy4vX2FycmF5U2FtcGxlJyksXG4gICAgYmFzZVNhbXBsZSA9IHJlcXVpcmUoJy4vX2Jhc2VTYW1wbGUnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5Jyk7XG5cbi8qKlxuICogR2V0cyBhIHJhbmRvbSBlbGVtZW50IGZyb20gYGNvbGxlY3Rpb25gLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi4wLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBzYW1wbGUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmFuZG9tIGVsZW1lbnQuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uc2FtcGxlKFsxLCAyLCAzLCA0XSk7XG4gKiAvLyA9PiAyXG4gKi9cbmZ1bmN0aW9uIHNhbXBsZShjb2xsZWN0aW9uKSB7XG4gIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5U2FtcGxlIDogYmFzZVNhbXBsZTtcbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2FtcGxlO1xuIl19