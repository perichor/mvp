"use strict";

/**
 * Checks `value` to determine whether a default value should be returned in
 * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
 * or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.14.0
 * @category Util
 * @param {*} value The value to check.
 * @param {*} defaultValue The default value.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * _.defaultTo(1, 10);
 * // => 1
 *
 * _.defaultTo(undefined, 10);
 * // => 10
 */
function defaultTo(value, defaultValue) {
  return value == null || value !== value ? defaultValue : value;
}

module.exports = defaultTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2RlZmF1bHRUby5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0VG8iLCJ2YWx1ZSIsImRlZmF1bHRWYWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLFNBQVNBLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCQyxZQUExQixFQUF3QztBQUN0QyxTQUFRRCxTQUFTLElBQVQsSUFBaUJBLFVBQVVBLEtBQTVCLEdBQXFDQyxZQUFyQyxHQUFvREQsS0FBM0Q7QUFDRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQkosU0FBakIiLCJmaWxlIjoiZGVmYXVsdFRvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDaGVja3MgYHZhbHVlYCB0byBkZXRlcm1pbmUgd2hldGhlciBhIGRlZmF1bHQgdmFsdWUgc2hvdWxkIGJlIHJldHVybmVkIGluXG4gKiBpdHMgcGxhY2UuIFRoZSBgZGVmYXVsdFZhbHVlYCBpcyByZXR1cm5lZCBpZiBgdmFsdWVgIGlzIGBOYU5gLCBgbnVsbGAsXG4gKiBvciBgdW5kZWZpbmVkYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgVGhlIGRlZmF1bHQgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmYXVsdFRvKDEsIDEwKTtcbiAqIC8vID0+IDFcbiAqXG4gKiBfLmRlZmF1bHRUbyh1bmRlZmluZWQsIDEwKTtcbiAqIC8vID0+IDEwXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRUbyh2YWx1ZSwgZGVmYXVsdFZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdmFsdWUpID8gZGVmYXVsdFZhbHVlIDogdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdFRvO1xuIl19