'use strict';

var createCaseFirst = require('./_createCaseFirst');

/**
 * Converts the first character of `string` to lower case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.lowerFirst('Fred');
 * // => 'fred'
 *
 * _.lowerFirst('FRED');
 * // => 'fRED'
 */
var lowerFirst = createCaseFirst('toLowerCase');

module.exports = lowerFirst;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2xvd2VyRmlyc3QuanMiXSwibmFtZXMiOlsiY3JlYXRlQ2FzZUZpcnN0IiwicmVxdWlyZSIsImxvd2VyRmlyc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGtCQUFrQkMsUUFBUSxvQkFBUixDQUF0Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsSUFBSUMsYUFBYUYsZ0JBQWdCLGFBQWhCLENBQWpCOztBQUVBRyxPQUFPQyxPQUFQLEdBQWlCRixVQUFqQiIsImZpbGUiOiJsb3dlckZpcnN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNyZWF0ZUNhc2VGaXJzdCA9IHJlcXVpcmUoJy4vX2NyZWF0ZUNhc2VGaXJzdCcpO1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgYHN0cmluZ2AgdG8gbG93ZXIgY2FzZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5sb3dlckZpcnN0KCdGcmVkJyk7XG4gKiAvLyA9PiAnZnJlZCdcbiAqXG4gKiBfLmxvd2VyRmlyc3QoJ0ZSRUQnKTtcbiAqIC8vID0+ICdmUkVEJ1xuICovXG52YXIgbG93ZXJGaXJzdCA9IGNyZWF0ZUNhc2VGaXJzdCgndG9Mb3dlckNhc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb3dlckZpcnN0O1xuIl19