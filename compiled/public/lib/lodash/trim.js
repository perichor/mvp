'use strict';

var baseToString = require('./_baseToString'),
    castSlice = require('./_castSlice'),
    charsEndIndex = require('./_charsEndIndex'),
    charsStartIndex = require('./_charsStartIndex'),
    stringToArray = require('./_stringToArray'),
    toString = require('./toString');

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  abc  ');
 * // => 'abc'
 *
 * _.trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * _.map(['  foo  ', '  bar  '], _.trim);
 * // => ['foo', 'bar']
 */
function trim(string, chars, guard) {
  string = toString(string);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrim, '');
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  var strSymbols = stringToArray(string),
      chrSymbols = stringToArray(chars),
      start = charsStartIndex(strSymbols, chrSymbols),
      end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}

module.exports = trim;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3RyaW0uanMiXSwibmFtZXMiOlsiYmFzZVRvU3RyaW5nIiwicmVxdWlyZSIsImNhc3RTbGljZSIsImNoYXJzRW5kSW5kZXgiLCJjaGFyc1N0YXJ0SW5kZXgiLCJzdHJpbmdUb0FycmF5IiwidG9TdHJpbmciLCJyZVRyaW0iLCJ0cmltIiwic3RyaW5nIiwiY2hhcnMiLCJndWFyZCIsInVuZGVmaW5lZCIsInJlcGxhY2UiLCJzdHJTeW1ib2xzIiwiY2hyU3ltYm9scyIsInN0YXJ0IiwiZW5kIiwiam9pbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZUFBZUMsUUFBUSxpQkFBUixDQUFuQjtBQUFBLElBQ0lDLFlBQVlELFFBQVEsY0FBUixDQURoQjtBQUFBLElBRUlFLGdCQUFnQkYsUUFBUSxrQkFBUixDQUZwQjtBQUFBLElBR0lHLGtCQUFrQkgsUUFBUSxvQkFBUixDQUh0QjtBQUFBLElBSUlJLGdCQUFnQkosUUFBUSxrQkFBUixDQUpwQjtBQUFBLElBS0lLLFdBQVdMLFFBQVEsWUFBUixDQUxmOztBQU9BO0FBQ0EsSUFBSU0sU0FBUyxZQUFiOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLFNBQVNDLElBQVQsQ0FBY0MsTUFBZCxFQUFzQkMsS0FBdEIsRUFBNkJDLEtBQTdCLEVBQW9DO0FBQ2xDRixXQUFTSCxTQUFTRyxNQUFULENBQVQ7QUFDQSxNQUFJQSxXQUFXRSxTQUFTRCxVQUFVRSxTQUE5QixDQUFKLEVBQThDO0FBQzVDLFdBQU9ILE9BQU9JLE9BQVAsQ0FBZU4sTUFBZixFQUF1QixFQUF2QixDQUFQO0FBQ0Q7QUFDRCxNQUFJLENBQUNFLE1BQUQsSUFBVyxFQUFFQyxRQUFRVixhQUFhVSxLQUFiLENBQVYsQ0FBZixFQUErQztBQUM3QyxXQUFPRCxNQUFQO0FBQ0Q7QUFDRCxNQUFJSyxhQUFhVCxjQUFjSSxNQUFkLENBQWpCO0FBQUEsTUFDSU0sYUFBYVYsY0FBY0ssS0FBZCxDQURqQjtBQUFBLE1BRUlNLFFBQVFaLGdCQUFnQlUsVUFBaEIsRUFBNEJDLFVBQTVCLENBRlo7QUFBQSxNQUdJRSxNQUFNZCxjQUFjVyxVQUFkLEVBQTBCQyxVQUExQixJQUF3QyxDQUhsRDs7QUFLQSxTQUFPYixVQUFVWSxVQUFWLEVBQXNCRSxLQUF0QixFQUE2QkMsR0FBN0IsRUFBa0NDLElBQWxDLENBQXVDLEVBQXZDLENBQVA7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQlosSUFBakIiLCJmaWxlIjoidHJpbS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlVG9TdHJpbmcgPSByZXF1aXJlKCcuL19iYXNlVG9TdHJpbmcnKSxcbiAgICBjYXN0U2xpY2UgPSByZXF1aXJlKCcuL19jYXN0U2xpY2UnKSxcbiAgICBjaGFyc0VuZEluZGV4ID0gcmVxdWlyZSgnLi9fY2hhcnNFbmRJbmRleCcpLFxuICAgIGNoYXJzU3RhcnRJbmRleCA9IHJlcXVpcmUoJy4vX2NoYXJzU3RhcnRJbmRleCcpLFxuICAgIHN0cmluZ1RvQXJyYXkgPSByZXF1aXJlKCcuL19zdHJpbmdUb0FycmF5JyksXG4gICAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKlxuICogUmVtb3ZlcyBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlIG9yIHNwZWNpZmllZCBjaGFyYWN0ZXJzIGZyb20gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gdHJpbS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY2hhcnM9d2hpdGVzcGFjZV0gVGhlIGNoYXJhY3RlcnMgdG8gdHJpbS5cbiAqIEBwYXJhbS0ge09iamVjdH0gW2d1YXJkXSBFbmFibGVzIHVzZSBhcyBhbiBpdGVyYXRlZSBmb3IgbWV0aG9kcyBsaWtlIGBfLm1hcGAuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSB0cmltbWVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50cmltKCcgIGFiYyAgJyk7XG4gKiAvLyA9PiAnYWJjJ1xuICpcbiAqIF8udHJpbSgnLV8tYWJjLV8tJywgJ18tJyk7XG4gKiAvLyA9PiAnYWJjJ1xuICpcbiAqIF8ubWFwKFsnICBmb28gICcsICcgIGJhciAgJ10sIF8udHJpbSk7XG4gKiAvLyA9PiBbJ2ZvbycsICdiYXInXVxuICovXG5mdW5jdGlvbiB0cmltKHN0cmluZywgY2hhcnMsIGd1YXJkKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIGlmIChzdHJpbmcgJiYgKGd1YXJkIHx8IGNoYXJzID09PSB1bmRlZmluZWQpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB9XG4gIGlmICghc3RyaW5nIHx8ICEoY2hhcnMgPSBiYXNlVG9TdHJpbmcoY2hhcnMpKSkge1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cbiAgdmFyIHN0clN5bWJvbHMgPSBzdHJpbmdUb0FycmF5KHN0cmluZyksXG4gICAgICBjaHJTeW1ib2xzID0gc3RyaW5nVG9BcnJheShjaGFycyksXG4gICAgICBzdGFydCA9IGNoYXJzU3RhcnRJbmRleChzdHJTeW1ib2xzLCBjaHJTeW1ib2xzKSxcbiAgICAgIGVuZCA9IGNoYXJzRW5kSW5kZXgoc3RyU3ltYm9scywgY2hyU3ltYm9scykgKyAxO1xuXG4gIHJldHVybiBjYXN0U2xpY2Uoc3RyU3ltYm9scywgc3RhcnQsIGVuZCkuam9pbignJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdHJpbTtcbiJdfQ==