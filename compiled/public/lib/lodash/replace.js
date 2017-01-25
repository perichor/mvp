'use strict';

var toString = require('./toString');

/**
 * Replaces matches for `pattern` in `string` with `replacement`.
 *
 * **Note:** This method is based on
 * [`String#replace`](https://mdn.io/String/replace).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to modify.
 * @param {RegExp|string} pattern The pattern to replace.
 * @param {Function|string} replacement The match replacement.
 * @returns {string} Returns the modified string.
 * @example
 *
 * _.replace('Hi Fred', 'Fred', 'Barney');
 * // => 'Hi Barney'
 */
function replace() {
  var args = arguments,
      string = toString(args[0]);

  return args.length < 3 ? string : string.replace(args[1], args[2]);
}

module.exports = replace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3JlcGxhY2UuanMiXSwibmFtZXMiOlsidG9TdHJpbmciLCJyZXF1aXJlIiwicmVwbGFjZSIsImFyZ3MiLCJhcmd1bWVudHMiLCJzdHJpbmciLCJsZW5ndGgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsWUFBUixDQUFmOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLFNBQVNDLE9BQVQsR0FBbUI7QUFDakIsTUFBSUMsT0FBT0MsU0FBWDtBQUFBLE1BQ0lDLFNBQVNMLFNBQVNHLEtBQUssQ0FBTCxDQUFULENBRGI7O0FBR0EsU0FBT0EsS0FBS0csTUFBTCxHQUFjLENBQWQsR0FBa0JELE1BQWxCLEdBQTJCQSxPQUFPSCxPQUFQLENBQWVDLEtBQUssQ0FBTCxDQUFmLEVBQXdCQSxLQUFLLENBQUwsQ0FBeEIsQ0FBbEM7QUFDRDs7QUFFREksT0FBT0MsT0FBUCxHQUFpQk4sT0FBakIiLCJmaWxlIjoicmVwbGFjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqXG4gKiBSZXBsYWNlcyBtYXRjaGVzIGZvciBgcGF0dGVybmAgaW4gYHN0cmluZ2Agd2l0aCBgcmVwbGFjZW1lbnRgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvblxuICogW2BTdHJpbmcjcmVwbGFjZWBdKGh0dHBzOi8vbWRuLmlvL1N0cmluZy9yZXBsYWNlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge1JlZ0V4cHxzdHJpbmd9IHBhdHRlcm4gVGhlIHBhdHRlcm4gdG8gcmVwbGFjZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb258c3RyaW5nfSByZXBsYWNlbWVudCBUaGUgbWF0Y2ggcmVwbGFjZW1lbnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBtb2RpZmllZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ucmVwbGFjZSgnSGkgRnJlZCcsICdGcmVkJywgJ0Jhcm5leScpO1xuICogLy8gPT4gJ0hpIEJhcm5leSdcbiAqL1xuZnVuY3Rpb24gcmVwbGFjZSgpIHtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICBzdHJpbmcgPSB0b1N0cmluZyhhcmdzWzBdKTtcblxuICByZXR1cm4gYXJncy5sZW5ndGggPCAzID8gc3RyaW5nIDogc3RyaW5nLnJlcGxhY2UoYXJnc1sxXSwgYXJnc1syXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVwbGFjZTtcbiJdfQ==