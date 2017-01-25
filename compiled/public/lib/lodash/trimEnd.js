'use strict';

var baseToString = require('./_baseToString'),
    castSlice = require('./_castSlice'),
    charsEndIndex = require('./_charsEndIndex'),
    stringToArray = require('./_stringToArray'),
    toString = require('./toString');

/** Used to match leading and trailing whitespace. */
var reTrimEnd = /\s+$/;

/**
 * Removes trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trimEnd('  abc  ');
 * // => '  abc'
 *
 * _.trimEnd('-_-abc-_-', '_-');
 * // => '-_-abc'
 */
function trimEnd(string, chars, guard) {
  string = toString(string);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrimEnd, '');
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  var strSymbols = stringToArray(string),
      end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

  return castSlice(strSymbols, 0, end).join('');
}

module.exports = trimEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3RyaW1FbmQuanMiXSwibmFtZXMiOlsiYmFzZVRvU3RyaW5nIiwicmVxdWlyZSIsImNhc3RTbGljZSIsImNoYXJzRW5kSW5kZXgiLCJzdHJpbmdUb0FycmF5IiwidG9TdHJpbmciLCJyZVRyaW1FbmQiLCJ0cmltRW5kIiwic3RyaW5nIiwiY2hhcnMiLCJndWFyZCIsInVuZGVmaW5lZCIsInJlcGxhY2UiLCJzdHJTeW1ib2xzIiwiZW5kIiwiam9pbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZUFBZUMsUUFBUSxpQkFBUixDQUFuQjtBQUFBLElBQ0lDLFlBQVlELFFBQVEsY0FBUixDQURoQjtBQUFBLElBRUlFLGdCQUFnQkYsUUFBUSxrQkFBUixDQUZwQjtBQUFBLElBR0lHLGdCQUFnQkgsUUFBUSxrQkFBUixDQUhwQjtBQUFBLElBSUlJLFdBQVdKLFFBQVEsWUFBUixDQUpmOztBQU1BO0FBQ0EsSUFBSUssWUFBWSxNQUFoQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxTQUFTQyxPQUFULENBQWlCQyxNQUFqQixFQUF5QkMsS0FBekIsRUFBZ0NDLEtBQWhDLEVBQXVDO0FBQ3JDRixXQUFTSCxTQUFTRyxNQUFULENBQVQ7QUFDQSxNQUFJQSxXQUFXRSxTQUFTRCxVQUFVRSxTQUE5QixDQUFKLEVBQThDO0FBQzVDLFdBQU9ILE9BQU9JLE9BQVAsQ0FBZU4sU0FBZixFQUEwQixFQUExQixDQUFQO0FBQ0Q7QUFDRCxNQUFJLENBQUNFLE1BQUQsSUFBVyxFQUFFQyxRQUFRVCxhQUFhUyxLQUFiLENBQVYsQ0FBZixFQUErQztBQUM3QyxXQUFPRCxNQUFQO0FBQ0Q7QUFDRCxNQUFJSyxhQUFhVCxjQUFjSSxNQUFkLENBQWpCO0FBQUEsTUFDSU0sTUFBTVgsY0FBY1UsVUFBZCxFQUEwQlQsY0FBY0ssS0FBZCxDQUExQixJQUFrRCxDQUQ1RDs7QUFHQSxTQUFPUCxVQUFVVyxVQUFWLEVBQXNCLENBQXRCLEVBQXlCQyxHQUF6QixFQUE4QkMsSUFBOUIsQ0FBbUMsRUFBbkMsQ0FBUDtBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCVixPQUFqQiIsImZpbGUiOiJ0cmltRW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VUb1N0cmluZyA9IHJlcXVpcmUoJy4vX2Jhc2VUb1N0cmluZycpLFxuICAgIGNhc3RTbGljZSA9IHJlcXVpcmUoJy4vX2Nhc3RTbGljZScpLFxuICAgIGNoYXJzRW5kSW5kZXggPSByZXF1aXJlKCcuL19jaGFyc0VuZEluZGV4JyksXG4gICAgc3RyaW5nVG9BcnJheSA9IHJlcXVpcmUoJy4vX3N0cmluZ1RvQXJyYXknKSxcbiAgICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW1FbmQgPSAvXFxzKyQvO1xuXG4vKipcbiAqIFJlbW92ZXMgdHJhaWxpbmcgd2hpdGVzcGFjZSBvciBzcGVjaWZpZWQgY2hhcmFjdGVycyBmcm9tIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIHRyaW0uXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NoYXJzPXdoaXRlc3BhY2VdIFRoZSBjaGFyYWN0ZXJzIHRvIHRyaW0uXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgdHJpbW1lZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udHJpbUVuZCgnICBhYmMgICcpO1xuICogLy8gPT4gJyAgYWJjJ1xuICpcbiAqIF8udHJpbUVuZCgnLV8tYWJjLV8tJywgJ18tJyk7XG4gKiAvLyA9PiAnLV8tYWJjJ1xuICovXG5mdW5jdGlvbiB0cmltRW5kKHN0cmluZywgY2hhcnMsIGd1YXJkKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIGlmIChzdHJpbmcgJiYgKGd1YXJkIHx8IGNoYXJzID09PSB1bmRlZmluZWQpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlVHJpbUVuZCwgJycpO1xuICB9XG4gIGlmICghc3RyaW5nIHx8ICEoY2hhcnMgPSBiYXNlVG9TdHJpbmcoY2hhcnMpKSkge1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cbiAgdmFyIHN0clN5bWJvbHMgPSBzdHJpbmdUb0FycmF5KHN0cmluZyksXG4gICAgICBlbmQgPSBjaGFyc0VuZEluZGV4KHN0clN5bWJvbHMsIHN0cmluZ1RvQXJyYXkoY2hhcnMpKSArIDE7XG5cbiAgcmV0dXJuIGNhc3RTbGljZShzdHJTeW1ib2xzLCAwLCBlbmQpLmpvaW4oJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyaW1FbmQ7XG4iXX0=