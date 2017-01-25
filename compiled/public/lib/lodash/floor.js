'use strict';

var createRound = require('./_createRound');

/**
 * Computes `number` rounded down to `precision`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Math
 * @param {number} number The number to round down.
 * @param {number} [precision=0] The precision to round down to.
 * @returns {number} Returns the rounded down number.
 * @example
 *
 * _.floor(4.006);
 * // => 4
 *
 * _.floor(0.046, 2);
 * // => 0.04
 *
 * _.floor(4060, -2);
 * // => 4000
 */
var floor = createRound('floor');

module.exports = floor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2Zsb29yLmpzIl0sIm5hbWVzIjpbImNyZWF0ZVJvdW5kIiwicmVxdWlyZSIsImZsb29yIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxjQUFjQyxRQUFRLGdCQUFSLENBQWxCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsSUFBSUMsUUFBUUYsWUFBWSxPQUFaLENBQVo7O0FBRUFHLE9BQU9DLE9BQVAsR0FBaUJGLEtBQWpCIiwiZmlsZSI6ImZsb29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNyZWF0ZVJvdW5kID0gcmVxdWlyZSgnLi9fY3JlYXRlUm91bmQnKTtcblxuLyoqXG4gKiBDb21wdXRlcyBgbnVtYmVyYCByb3VuZGVkIGRvd24gdG8gYHByZWNpc2lvbmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjEwLjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIFRoZSBudW1iZXIgdG8gcm91bmQgZG93bi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbcHJlY2lzaW9uPTBdIFRoZSBwcmVjaXNpb24gdG8gcm91bmQgZG93biB0by5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHJvdW5kZWQgZG93biBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZmxvb3IoNC4wMDYpO1xuICogLy8gPT4gNFxuICpcbiAqIF8uZmxvb3IoMC4wNDYsIDIpO1xuICogLy8gPT4gMC4wNFxuICpcbiAqIF8uZmxvb3IoNDA2MCwgLTIpO1xuICogLy8gPT4gNDAwMFxuICovXG52YXIgZmxvb3IgPSBjcmVhdGVSb3VuZCgnZmxvb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbG9vcjtcbiJdfQ==