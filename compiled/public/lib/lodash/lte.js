'use strict';

var createRelationalOperation = require('./_createRelationalOperation');

/**
 * Checks if `value` is less than or equal to `other`.
 *
 * @static
 * @memberOf _
 * @since 3.9.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than or equal to
 *  `other`, else `false`.
 * @see _.gte
 * @example
 *
 * _.lte(1, 3);
 * // => true
 *
 * _.lte(3, 3);
 * // => true
 *
 * _.lte(3, 1);
 * // => false
 */
var lte = createRelationalOperation(function (value, other) {
  return value <= other;
});

module.exports = lte;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2x0ZS5qcyJdLCJuYW1lcyI6WyJjcmVhdGVSZWxhdGlvbmFsT3BlcmF0aW9uIiwicmVxdWlyZSIsImx0ZSIsInZhbHVlIiwib3RoZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLDRCQUE0QkMsUUFBUSw4QkFBUixDQUFoQzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsSUFBSUMsTUFBTUYsMEJBQTBCLFVBQVNHLEtBQVQsRUFBZ0JDLEtBQWhCLEVBQXVCO0FBQ3pELFNBQU9ELFNBQVNDLEtBQWhCO0FBQ0QsQ0FGUyxDQUFWOztBQUlBQyxPQUFPQyxPQUFQLEdBQWlCSixHQUFqQiIsImZpbGUiOiJsdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY3JlYXRlUmVsYXRpb25hbE9wZXJhdGlvbiA9IHJlcXVpcmUoJy4vX2NyZWF0ZVJlbGF0aW9uYWxPcGVyYXRpb24nKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYG90aGVyYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuOS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG9cbiAqICBgb3RoZXJgLCBlbHNlIGBmYWxzZWAuXG4gKiBAc2VlIF8uZ3RlXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ubHRlKDEsIDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8ubHRlKDMsIDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8ubHRlKDMsIDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGx0ZSA9IGNyZWF0ZVJlbGF0aW9uYWxPcGVyYXRpb24oZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA8PSBvdGhlcjtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGx0ZTtcbiJdfQ==