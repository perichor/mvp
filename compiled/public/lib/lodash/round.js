'use strict';

var createRound = require('./_createRound');

/**
 * Computes `number` rounded to `precision`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Math
 * @param {number} number The number to round.
 * @param {number} [precision=0] The precision to round to.
 * @returns {number} Returns the rounded number.
 * @example
 *
 * _.round(4.006);
 * // => 4
 *
 * _.round(4.006, 2);
 * // => 4.01
 *
 * _.round(4060, -2);
 * // => 4100
 */
var round = createRound('round');

module.exports = round;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3JvdW5kLmpzIl0sIm5hbWVzIjpbImNyZWF0ZVJvdW5kIiwicmVxdWlyZSIsInJvdW5kIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxjQUFjQyxRQUFRLGdCQUFSLENBQWxCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsSUFBSUMsUUFBUUYsWUFBWSxPQUFaLENBQVo7O0FBRUFHLE9BQU9DLE9BQVAsR0FBaUJGLEtBQWpCIiwiZmlsZSI6InJvdW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNyZWF0ZVJvdW5kID0gcmVxdWlyZSgnLi9fY3JlYXRlUm91bmQnKTtcblxuLyoqXG4gKiBDb21wdXRlcyBgbnVtYmVyYCByb3VuZGVkIHRvIGBwcmVjaXNpb25gLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4xMC4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciBUaGUgbnVtYmVyIHRvIHJvdW5kLlxuICogQHBhcmFtIHtudW1iZXJ9IFtwcmVjaXNpb249MF0gVGhlIHByZWNpc2lvbiB0byByb3VuZCB0by5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHJvdW5kZWQgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnJvdW5kKDQuMDA2KTtcbiAqIC8vID0+IDRcbiAqXG4gKiBfLnJvdW5kKDQuMDA2LCAyKTtcbiAqIC8vID0+IDQuMDFcbiAqXG4gKiBfLnJvdW5kKDQwNjAsIC0yKTtcbiAqIC8vID0+IDQxMDBcbiAqL1xudmFyIHJvdW5kID0gY3JlYXRlUm91bmQoJ3JvdW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm91bmQ7XG4iXX0=