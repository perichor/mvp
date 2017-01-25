'use strict';

var createPadding = require('./_createPadding'),
    stringSize = require('./_stringSize'),
    toInteger = require('./toInteger'),
    toString = require('./toString');

/**
 * Pads `string` on the right side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.padEnd('abc', 6);
 * // => 'abc   '
 *
 * _.padEnd('abc', 6, '_-');
 * // => 'abc_-_'
 *
 * _.padEnd('abc', 3);
 * // => 'abc'
 */
function padEnd(string, length, chars) {
    string = toString(string);
    length = toInteger(length);

    var strLength = length ? stringSize(string) : 0;
    return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
}

module.exports = padEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3BhZEVuZC5qcyJdLCJuYW1lcyI6WyJjcmVhdGVQYWRkaW5nIiwicmVxdWlyZSIsInN0cmluZ1NpemUiLCJ0b0ludGVnZXIiLCJ0b1N0cmluZyIsInBhZEVuZCIsInN0cmluZyIsImxlbmd0aCIsImNoYXJzIiwic3RyTGVuZ3RoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxnQkFBZ0JDLFFBQVEsa0JBQVIsQ0FBcEI7QUFBQSxJQUNJQyxhQUFhRCxRQUFRLGVBQVIsQ0FEakI7QUFBQSxJQUVJRSxZQUFZRixRQUFRLGFBQVIsQ0FGaEI7QUFBQSxJQUdJRyxXQUFXSCxRQUFRLFlBQVIsQ0FIZjs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsU0FBU0ksTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0JDLE1BQXhCLEVBQWdDQyxLQUFoQyxFQUF1QztBQUNyQ0YsYUFBU0YsU0FBU0UsTUFBVCxDQUFUO0FBQ0FDLGFBQVNKLFVBQVVJLE1BQVYsQ0FBVDs7QUFFQSxRQUFJRSxZQUFZRixTQUFTTCxXQUFXSSxNQUFYLENBQVQsR0FBOEIsQ0FBOUM7QUFDQSxXQUFRQyxVQUFVRSxZQUFZRixNQUF2QixHQUNGRCxTQUFTTixjQUFjTyxTQUFTRSxTQUF2QixFQUFrQ0QsS0FBbEMsQ0FEUCxHQUVIRixNQUZKO0FBR0Q7O0FBRURJLE9BQU9DLE9BQVAsR0FBaUJOLE1BQWpCIiwiZmlsZSI6InBhZEVuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjcmVhdGVQYWRkaW5nID0gcmVxdWlyZSgnLi9fY3JlYXRlUGFkZGluZycpLFxuICAgIHN0cmluZ1NpemUgPSByZXF1aXJlKCcuL19zdHJpbmdTaXplJyksXG4gICAgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi90b0ludGVnZXInKSxcbiAgICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqXG4gKiBQYWRzIGBzdHJpbmdgIG9uIHRoZSByaWdodCBzaWRlIGlmIGl0J3Mgc2hvcnRlciB0aGFuIGBsZW5ndGhgLiBQYWRkaW5nXG4gKiBjaGFyYWN0ZXJzIGFyZSB0cnVuY2F0ZWQgaWYgdGhleSBleGNlZWQgYGxlbmd0aGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gcGFkLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9MF0gVGhlIHBhZGRpbmcgbGVuZ3RoLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjaGFycz0nICddIFRoZSBzdHJpbmcgdXNlZCBhcyBwYWRkaW5nLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcGFkZGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5wYWRFbmQoJ2FiYycsIDYpO1xuICogLy8gPT4gJ2FiYyAgICdcbiAqXG4gKiBfLnBhZEVuZCgnYWJjJywgNiwgJ18tJyk7XG4gKiAvLyA9PiAnYWJjXy1fJ1xuICpcbiAqIF8ucGFkRW5kKCdhYmMnLCAzKTtcbiAqIC8vID0+ICdhYmMnXG4gKi9cbmZ1bmN0aW9uIHBhZEVuZChzdHJpbmcsIGxlbmd0aCwgY2hhcnMpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgbGVuZ3RoID0gdG9JbnRlZ2VyKGxlbmd0aCk7XG5cbiAgdmFyIHN0ckxlbmd0aCA9IGxlbmd0aCA/IHN0cmluZ1NpemUoc3RyaW5nKSA6IDA7XG4gIHJldHVybiAobGVuZ3RoICYmIHN0ckxlbmd0aCA8IGxlbmd0aClcbiAgICA/IChzdHJpbmcgKyBjcmVhdGVQYWRkaW5nKGxlbmd0aCAtIHN0ckxlbmd0aCwgY2hhcnMpKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhZEVuZDtcbiJdfQ==