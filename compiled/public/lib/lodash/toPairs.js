'use strict';

var createToPairs = require('./_createToPairs'),
    keys = require('./keys');

/**
 * Creates an array of own enumerable string keyed-value pairs for `object`
 * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
 * entries are returned.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias entries
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the key-value pairs.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.toPairs(new Foo);
 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
 */
var toPairs = createToPairs(keys);

module.exports = toPairs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3RvUGFpcnMuanMiXSwibmFtZXMiOlsiY3JlYXRlVG9QYWlycyIsInJlcXVpcmUiLCJrZXlzIiwidG9QYWlycyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZ0JBQWdCQyxRQUFRLGtCQUFSLENBQXBCO0FBQUEsSUFDSUMsT0FBT0QsUUFBUSxRQUFSLENBRFg7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxJQUFJRSxVQUFVSCxjQUFjRSxJQUFkLENBQWQ7O0FBRUFFLE9BQU9DLE9BQVAsR0FBaUJGLE9BQWpCIiwiZmlsZSI6InRvUGFpcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY3JlYXRlVG9QYWlycyA9IHJlcXVpcmUoJy4vX2NyZWF0ZVRvUGFpcnMnKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQtdmFsdWUgcGFpcnMgZm9yIGBvYmplY3RgXG4gKiB3aGljaCBjYW4gYmUgY29uc3VtZWQgYnkgYF8uZnJvbVBhaXJzYC4gSWYgYG9iamVjdGAgaXMgYSBtYXAgb3Igc2V0LCBpdHNcbiAqIGVudHJpZXMgYXJlIHJldHVybmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBhbGlhcyBlbnRyaWVzXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGtleS12YWx1ZSBwYWlycy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy50b1BhaXJzKG5ldyBGb28pO1xuICogLy8gPT4gW1snYScsIDFdLCBbJ2InLCAyXV0gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xudmFyIHRvUGFpcnMgPSBjcmVhdGVUb1BhaXJzKGtleXMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRvUGFpcnM7XG4iXX0=