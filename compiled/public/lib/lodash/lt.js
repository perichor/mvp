'use strict';

var baseLt = require('./_baseLt'),
    createRelationalOperation = require('./_createRelationalOperation');

/**
 * Checks if `value` is less than `other`.
 *
 * @static
 * @memberOf _
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than `other`,
 *  else `false`.
 * @see _.gt
 * @example
 *
 * _.lt(1, 3);
 * // => true
 *
 * _.lt(3, 3);
 * // => false
 *
 * _.lt(3, 1);
 * // => false
 */
var lt = createRelationalOperation(baseLt);

module.exports = lt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2x0LmpzIl0sIm5hbWVzIjpbImJhc2VMdCIsInJlcXVpcmUiLCJjcmVhdGVSZWxhdGlvbmFsT3BlcmF0aW9uIiwibHQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFNBQVNDLFFBQVEsV0FBUixDQUFiO0FBQUEsSUFDSUMsNEJBQTRCRCxRQUFRLDhCQUFSLENBRGhDOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxJQUFJRSxLQUFLRCwwQkFBMEJGLE1BQTFCLENBQVQ7O0FBRUFJLE9BQU9DLE9BQVAsR0FBaUJGLEVBQWpCIiwiZmlsZSI6Imx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VMdCA9IHJlcXVpcmUoJy4vX2Jhc2VMdCcpLFxuICAgIGNyZWF0ZVJlbGF0aW9uYWxPcGVyYXRpb24gPSByZXF1aXJlKCcuL19jcmVhdGVSZWxhdGlvbmFsT3BlcmF0aW9uJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGVzcyB0aGFuIGBvdGhlcmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjkuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgbGVzcyB0aGFuIGBvdGhlcmAsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQHNlZSBfLmd0XG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ubHQoMSwgMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5sdCgzLCAzKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5sdCgzLCAxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBsdCA9IGNyZWF0ZVJlbGF0aW9uYWxPcGVyYXRpb24oYmFzZUx0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBsdDtcbiJdfQ==