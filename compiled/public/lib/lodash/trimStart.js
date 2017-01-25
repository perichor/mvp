'use strict';

var baseToString = require('./_baseToString'),
    castSlice = require('./_castSlice'),
    charsStartIndex = require('./_charsStartIndex'),
    stringToArray = require('./_stringToArray'),
    toString = require('./toString');

/** Used to match leading and trailing whitespace. */
var reTrimStart = /^\s+/;

/**
 * Removes leading whitespace or specified characters from `string`.
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
 * _.trimStart('  abc  ');
 * // => 'abc  '
 *
 * _.trimStart('-_-abc-_-', '_-');
 * // => 'abc-_-'
 */
function trimStart(string, chars, guard) {
  string = toString(string);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrimStart, '');
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  var strSymbols = stringToArray(string),
      start = charsStartIndex(strSymbols, stringToArray(chars));

  return castSlice(strSymbols, start).join('');
}

module.exports = trimStart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3RyaW1TdGFydC5qcyJdLCJuYW1lcyI6WyJiYXNlVG9TdHJpbmciLCJyZXF1aXJlIiwiY2FzdFNsaWNlIiwiY2hhcnNTdGFydEluZGV4Iiwic3RyaW5nVG9BcnJheSIsInRvU3RyaW5nIiwicmVUcmltU3RhcnQiLCJ0cmltU3RhcnQiLCJzdHJpbmciLCJjaGFycyIsImd1YXJkIiwidW5kZWZpbmVkIiwicmVwbGFjZSIsInN0clN5bWJvbHMiLCJzdGFydCIsImpvaW4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGVBQWVDLFFBQVEsaUJBQVIsQ0FBbkI7QUFBQSxJQUNJQyxZQUFZRCxRQUFRLGNBQVIsQ0FEaEI7QUFBQSxJQUVJRSxrQkFBa0JGLFFBQVEsb0JBQVIsQ0FGdEI7QUFBQSxJQUdJRyxnQkFBZ0JILFFBQVEsa0JBQVIsQ0FIcEI7QUFBQSxJQUlJSSxXQUFXSixRQUFRLFlBQVIsQ0FKZjs7QUFNQTtBQUNBLElBQUlLLGNBQWMsTUFBbEI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsU0FBU0MsU0FBVCxDQUFtQkMsTUFBbkIsRUFBMkJDLEtBQTNCLEVBQWtDQyxLQUFsQyxFQUF5QztBQUN2Q0YsV0FBU0gsU0FBU0csTUFBVCxDQUFUO0FBQ0EsTUFBSUEsV0FBV0UsU0FBU0QsVUFBVUUsU0FBOUIsQ0FBSixFQUE4QztBQUM1QyxXQUFPSCxPQUFPSSxPQUFQLENBQWVOLFdBQWYsRUFBNEIsRUFBNUIsQ0FBUDtBQUNEO0FBQ0QsTUFBSSxDQUFDRSxNQUFELElBQVcsRUFBRUMsUUFBUVQsYUFBYVMsS0FBYixDQUFWLENBQWYsRUFBK0M7QUFDN0MsV0FBT0QsTUFBUDtBQUNEO0FBQ0QsTUFBSUssYUFBYVQsY0FBY0ksTUFBZCxDQUFqQjtBQUFBLE1BQ0lNLFFBQVFYLGdCQUFnQlUsVUFBaEIsRUFBNEJULGNBQWNLLEtBQWQsQ0FBNUIsQ0FEWjs7QUFHQSxTQUFPUCxVQUFVVyxVQUFWLEVBQXNCQyxLQUF0QixFQUE2QkMsSUFBN0IsQ0FBa0MsRUFBbEMsQ0FBUDtBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCVixTQUFqQiIsImZpbGUiOiJ0cmltU3RhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZVRvU3RyaW5nID0gcmVxdWlyZSgnLi9fYmFzZVRvU3RyaW5nJyksXG4gICAgY2FzdFNsaWNlID0gcmVxdWlyZSgnLi9fY2FzdFNsaWNlJyksXG4gICAgY2hhcnNTdGFydEluZGV4ID0gcmVxdWlyZSgnLi9fY2hhcnNTdGFydEluZGV4JyksXG4gICAgc3RyaW5nVG9BcnJheSA9IHJlcXVpcmUoJy4vX3N0cmluZ1RvQXJyYXknKSxcbiAgICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW1TdGFydCA9IC9eXFxzKy87XG5cbi8qKlxuICogUmVtb3ZlcyBsZWFkaW5nIHdoaXRlc3BhY2Ugb3Igc3BlY2lmaWVkIGNoYXJhY3RlcnMgZnJvbSBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byB0cmltLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjaGFycz13aGl0ZXNwYWNlXSBUaGUgY2hhcmFjdGVycyB0byB0cmltLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHRyaW1tZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRyaW1TdGFydCgnICBhYmMgICcpO1xuICogLy8gPT4gJ2FiYyAgJ1xuICpcbiAqIF8udHJpbVN0YXJ0KCctXy1hYmMtXy0nLCAnXy0nKTtcbiAqIC8vID0+ICdhYmMtXy0nXG4gKi9cbmZ1bmN0aW9uIHRyaW1TdGFydChzdHJpbmcsIGNoYXJzLCBndWFyZCkge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICBpZiAoc3RyaW5nICYmIChndWFyZCB8fCBjaGFycyA9PT0gdW5kZWZpbmVkKSkge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShyZVRyaW1TdGFydCwgJycpO1xuICB9XG4gIGlmICghc3RyaW5nIHx8ICEoY2hhcnMgPSBiYXNlVG9TdHJpbmcoY2hhcnMpKSkge1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cbiAgdmFyIHN0clN5bWJvbHMgPSBzdHJpbmdUb0FycmF5KHN0cmluZyksXG4gICAgICBzdGFydCA9IGNoYXJzU3RhcnRJbmRleChzdHJTeW1ib2xzLCBzdHJpbmdUb0FycmF5KGNoYXJzKSk7XG5cbiAgcmV0dXJuIGNhc3RTbGljZShzdHJTeW1ib2xzLCBzdGFydCkuam9pbignJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdHJpbVN0YXJ0O1xuIl19