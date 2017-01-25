'use strict';

var baseGt = require('./_baseGt'),
    createRelationalOperation = require('./_createRelationalOperation');

/**
 * Checks if `value` is greater than `other`.
 *
 * @static
 * @memberOf _
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`,
 *  else `false`.
 * @see _.lt
 * @example
 *
 * _.gt(3, 1);
 * // => true
 *
 * _.gt(3, 3);
 * // => false
 *
 * _.gt(1, 3);
 * // => false
 */
var gt = createRelationalOperation(baseGt);

module.exports = gt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2d0LmpzIl0sIm5hbWVzIjpbImJhc2VHdCIsInJlcXVpcmUiLCJjcmVhdGVSZWxhdGlvbmFsT3BlcmF0aW9uIiwiZ3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFNBQVNDLFFBQVEsV0FBUixDQUFiO0FBQUEsSUFDSUMsNEJBQTRCRCxRQUFRLDhCQUFSLENBRGhDOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxJQUFJRSxLQUFLRCwwQkFBMEJGLE1BQTFCLENBQVQ7O0FBRUFJLE9BQU9DLE9BQVAsR0FBaUJGLEVBQWpCIiwiZmlsZSI6Imd0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VHdCA9IHJlcXVpcmUoJy4vX2Jhc2VHdCcpLFxuICAgIGNyZWF0ZVJlbGF0aW9uYWxPcGVyYXRpb24gPSByZXF1aXJlKCcuL19jcmVhdGVSZWxhdGlvbmFsT3BlcmF0aW9uJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgZ3JlYXRlciB0aGFuIGBvdGhlcmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjkuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZ3JlYXRlciB0aGFuIGBvdGhlcmAsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQHNlZSBfLmx0XG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZ3QoMywgMSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5ndCgzLCAzKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5ndCgxLCAzKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBndCA9IGNyZWF0ZVJlbGF0aW9uYWxPcGVyYXRpb24oYmFzZUd0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBndDtcbiJdfQ==