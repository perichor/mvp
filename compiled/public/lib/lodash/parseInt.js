'use strict';

var root = require('./_root'),
    toString = require('./toString');

/** Used to match leading and trailing whitespace. */
var reTrimStart = /^\s+/;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeParseInt = root.parseInt;

/**
 * Converts `string` to an integer of the specified radix. If `radix` is
 * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
 * hexadecimal, in which case a `radix` of `16` is used.
 *
 * **Note:** This method aligns with the
 * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category String
 * @param {string} string The string to convert.
 * @param {number} [radix=10] The radix to interpret `value` by.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.parseInt('08');
 * // => 8
 *
 * _.map(['6', '08', '10'], _.parseInt);
 * // => [6, 8, 10]
 */
function parseInt(string, radix, guard) {
  if (guard || radix == null) {
    radix = 0;
  } else if (radix) {
    radix = +radix;
  }
  return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
}

module.exports = parseInt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3BhcnNlSW50LmpzIl0sIm5hbWVzIjpbInJvb3QiLCJyZXF1aXJlIiwidG9TdHJpbmciLCJyZVRyaW1TdGFydCIsIm5hdGl2ZVBhcnNlSW50IiwicGFyc2VJbnQiLCJzdHJpbmciLCJyYWRpeCIsImd1YXJkIiwicmVwbGFjZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsT0FBT0MsUUFBUSxTQUFSLENBQVg7QUFBQSxJQUNJQyxXQUFXRCxRQUFRLFlBQVIsQ0FEZjs7QUFHQTtBQUNBLElBQUlFLGNBQWMsTUFBbEI7O0FBRUE7QUFDQSxJQUFJQyxpQkFBaUJKLEtBQUtLLFFBQTFCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEJDLEtBQTFCLEVBQWlDQyxLQUFqQyxFQUF3QztBQUN0QyxNQUFJQSxTQUFTRCxTQUFTLElBQXRCLEVBQTRCO0FBQzFCQSxZQUFRLENBQVI7QUFDRCxHQUZELE1BRU8sSUFBSUEsS0FBSixFQUFXO0FBQ2hCQSxZQUFRLENBQUNBLEtBQVQ7QUFDRDtBQUNELFNBQU9ILGVBQWVGLFNBQVNJLE1BQVQsRUFBaUJHLE9BQWpCLENBQXlCTixXQUF6QixFQUFzQyxFQUF0QyxDQUFmLEVBQTBESSxTQUFTLENBQW5FLENBQVA7QUFDRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQk4sUUFBakIiLCJmaWxlIjoicGFyc2VJbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKSxcbiAgICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW1TdGFydCA9IC9eXFxzKy87XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVQYXJzZUludCA9IHJvb3QucGFyc2VJbnQ7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYW4gaW50ZWdlciBvZiB0aGUgc3BlY2lmaWVkIHJhZGl4LiBJZiBgcmFkaXhgIGlzXG4gKiBgdW5kZWZpbmVkYCBvciBgMGAsIGEgYHJhZGl4YCBvZiBgMTBgIGlzIHVzZWQgdW5sZXNzIGB2YWx1ZWAgaXMgYVxuICogaGV4YWRlY2ltYWwsIGluIHdoaWNoIGNhc2UgYSBgcmFkaXhgIG9mIGAxNmAgaXMgdXNlZC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgYWxpZ25zIHdpdGggdGhlXG4gKiBbRVM1IGltcGxlbWVudGF0aW9uXShodHRwczovL2VzNS5naXRodWIuaW8vI3gxNS4xLjIuMikgb2YgYHBhcnNlSW50YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDEuMS4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbcmFkaXg9MTBdIFRoZSByYWRpeCB0byBpbnRlcnByZXQgYHZhbHVlYCBieS5cbiAqIEBwYXJhbS0ge09iamVjdH0gW2d1YXJkXSBFbmFibGVzIHVzZSBhcyBhbiBpdGVyYXRlZSBmb3IgbWV0aG9kcyBsaWtlIGBfLm1hcGAuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgaW50ZWdlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5wYXJzZUludCgnMDgnKTtcbiAqIC8vID0+IDhcbiAqXG4gKiBfLm1hcChbJzYnLCAnMDgnLCAnMTAnXSwgXy5wYXJzZUludCk7XG4gKiAvLyA9PiBbNiwgOCwgMTBdXG4gKi9cbmZ1bmN0aW9uIHBhcnNlSW50KHN0cmluZywgcmFkaXgsIGd1YXJkKSB7XG4gIGlmIChndWFyZCB8fCByYWRpeCA9PSBudWxsKSB7XG4gICAgcmFkaXggPSAwO1xuICB9IGVsc2UgaWYgKHJhZGl4KSB7XG4gICAgcmFkaXggPSArcmFkaXg7XG4gIH1cbiAgcmV0dXJuIG5hdGl2ZVBhcnNlSW50KHRvU3RyaW5nKHN0cmluZykucmVwbGFjZShyZVRyaW1TdGFydCwgJycpLCByYWRpeCB8fCAwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZUludDtcbiJdfQ==