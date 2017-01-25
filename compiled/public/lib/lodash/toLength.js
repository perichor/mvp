'use strict';

var baseClamp = require('./_baseClamp'),
    toInteger = require('./toInteger');

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/**
 * Converts `value` to an integer suitable for use as the length of an
 * array-like object.
 *
 * **Note:** This method is based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toLength(3.2);
 * // => 3
 *
 * _.toLength(Number.MIN_VALUE);
 * // => 0
 *
 * _.toLength(Infinity);
 * // => 4294967295
 *
 * _.toLength('3.2');
 * // => 3
 */
function toLength(value) {
  return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
}

module.exports = toLength;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3RvTGVuZ3RoLmpzIl0sIm5hbWVzIjpbImJhc2VDbGFtcCIsInJlcXVpcmUiLCJ0b0ludGVnZXIiLCJNQVhfQVJSQVlfTEVOR1RIIiwidG9MZW5ndGgiLCJ2YWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsWUFBWUMsUUFBUSxjQUFSLENBQWhCO0FBQUEsSUFDSUMsWUFBWUQsUUFBUSxhQUFSLENBRGhCOztBQUdBO0FBQ0EsSUFBSUUsbUJBQW1CLFVBQXZCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsU0FBU0MsUUFBVCxDQUFrQkMsS0FBbEIsRUFBeUI7QUFDdkIsU0FBT0EsUUFBUUwsVUFBVUUsVUFBVUcsS0FBVixDQUFWLEVBQTRCLENBQTVCLEVBQStCRixnQkFBL0IsQ0FBUixHQUEyRCxDQUFsRTtBQUNEOztBQUVERyxPQUFPQyxPQUFQLEdBQWlCSCxRQUFqQiIsImZpbGUiOiJ0b0xlbmd0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlQ2xhbXAgPSByZXF1aXJlKCcuL19iYXNlQ2xhbXAnKSxcbiAgICB0b0ludGVnZXIgPSByZXF1aXJlKCcuL3RvSW50ZWdlcicpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB0aGUgbWF4aW11bSBsZW5ndGggYW5kIGluZGV4IG9mIGFuIGFycmF5LiAqL1xudmFyIE1BWF9BUlJBWV9MRU5HVEggPSA0Mjk0OTY3Mjk1O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gaW50ZWdlciBzdWl0YWJsZSBmb3IgdXNlIGFzIHRoZSBsZW5ndGggb2YgYW5cbiAqIGFycmF5LWxpa2Ugb2JqZWN0LlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBpbnRlZ2VyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTGVuZ3RoKDMuMik7XG4gKiAvLyA9PiAzXG4gKlxuICogXy50b0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDBcbiAqXG4gKiBfLnRvTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IDQyOTQ5NjcyOTVcbiAqXG4gKiBfLnRvTGVuZ3RoKCczLjInKTtcbiAqIC8vID0+IDNcbiAqL1xuZnVuY3Rpb24gdG9MZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID8gYmFzZUNsYW1wKHRvSW50ZWdlcih2YWx1ZSksIDAsIE1BWF9BUlJBWV9MRU5HVEgpIDogMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b0xlbmd0aDtcbiJdfQ==