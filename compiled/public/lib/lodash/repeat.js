'use strict';

var baseRepeat = require('./_baseRepeat'),
    isIterateeCall = require('./_isIterateeCall'),
    toInteger = require('./toInteger'),
    toString = require('./toString');

/**
 * Repeats the given string `n` times.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to repeat.
 * @param {number} [n=1] The number of times to repeat the string.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the repeated string.
 * @example
 *
 * _.repeat('*', 3);
 * // => '***'
 *
 * _.repeat('abc', 2);
 * // => 'abcabc'
 *
 * _.repeat('abc', 0);
 * // => ''
 */
function repeat(string, n, guard) {
  if (guard ? isIterateeCall(string, n, guard) : n === undefined) {
    n = 1;
  } else {
    n = toInteger(n);
  }
  return baseRepeat(toString(string), n);
}

module.exports = repeat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3JlcGVhdC5qcyJdLCJuYW1lcyI6WyJiYXNlUmVwZWF0IiwicmVxdWlyZSIsImlzSXRlcmF0ZWVDYWxsIiwidG9JbnRlZ2VyIiwidG9TdHJpbmciLCJyZXBlYXQiLCJzdHJpbmciLCJuIiwiZ3VhcmQiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGFBQWFDLFFBQVEsZUFBUixDQUFqQjtBQUFBLElBQ0lDLGlCQUFpQkQsUUFBUSxtQkFBUixDQURyQjtBQUFBLElBRUlFLFlBQVlGLFFBQVEsYUFBUixDQUZoQjtBQUFBLElBR0lHLFdBQVdILFFBQVEsWUFBUixDQUhmOztBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLFNBQVNJLE1BQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCQyxDQUF4QixFQUEyQkMsS0FBM0IsRUFBa0M7QUFDaEMsTUFBS0EsUUFBUU4sZUFBZUksTUFBZixFQUF1QkMsQ0FBdkIsRUFBMEJDLEtBQTFCLENBQVIsR0FBMkNELE1BQU1FLFNBQXRELEVBQWtFO0FBQ2hFRixRQUFJLENBQUo7QUFDRCxHQUZELE1BRU87QUFDTEEsUUFBSUosVUFBVUksQ0FBVixDQUFKO0FBQ0Q7QUFDRCxTQUFPUCxXQUFXSSxTQUFTRSxNQUFULENBQVgsRUFBNkJDLENBQTdCLENBQVA7QUFDRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQk4sTUFBakIiLCJmaWxlIjoicmVwZWF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VSZXBlYXQgPSByZXF1aXJlKCcuL19iYXNlUmVwZWF0JyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL19pc0l0ZXJhdGVlQ2FsbCcpLFxuICAgIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vdG9JbnRlZ2VyJyksXG4gICAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKlxuICogUmVwZWF0cyB0aGUgZ2l2ZW4gc3RyaW5nIGBuYCB0aW1lcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byByZXBlYXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW249MV0gVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHN0cmluZy5cbiAqIEBwYXJhbS0ge09iamVjdH0gW2d1YXJkXSBFbmFibGVzIHVzZSBhcyBhbiBpdGVyYXRlZSBmb3IgbWV0aG9kcyBsaWtlIGBfLm1hcGAuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByZXBlYXRlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ucmVwZWF0KCcqJywgMyk7XG4gKiAvLyA9PiAnKioqJ1xuICpcbiAqIF8ucmVwZWF0KCdhYmMnLCAyKTtcbiAqIC8vID0+ICdhYmNhYmMnXG4gKlxuICogXy5yZXBlYXQoJ2FiYycsIDApO1xuICogLy8gPT4gJydcbiAqL1xuZnVuY3Rpb24gcmVwZWF0KHN0cmluZywgbiwgZ3VhcmQpIHtcbiAgaWYgKChndWFyZCA/IGlzSXRlcmF0ZWVDYWxsKHN0cmluZywgbiwgZ3VhcmQpIDogbiA9PT0gdW5kZWZpbmVkKSkge1xuICAgIG4gPSAxO1xuICB9IGVsc2Uge1xuICAgIG4gPSB0b0ludGVnZXIobik7XG4gIH1cbiAgcmV0dXJuIGJhc2VSZXBlYXQodG9TdHJpbmcoc3RyaW5nKSwgbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVwZWF0O1xuIl19