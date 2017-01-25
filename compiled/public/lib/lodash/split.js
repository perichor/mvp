'use strict';

var baseToString = require('./_baseToString'),
    castSlice = require('./_castSlice'),
    hasUnicode = require('./_hasUnicode'),
    isIterateeCall = require('./_isIterateeCall'),
    isRegExp = require('./isRegExp'),
    stringToArray = require('./_stringToArray'),
    toString = require('./toString');

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/**
 * Splits `string` by `separator`.
 *
 * **Note:** This method is based on
 * [`String#split`](https://mdn.io/String/split).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to split.
 * @param {RegExp|string} separator The separator pattern to split by.
 * @param {number} [limit] The length to truncate results to.
 * @returns {Array} Returns the string segments.
 * @example
 *
 * _.split('a-b-c', '-', 2);
 * // => ['a', 'b']
 */
function split(string, separator, limit) {
  if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
    separator = limit = undefined;
  }
  limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
  if (!limit) {
    return [];
  }
  string = toString(string);
  if (string && (typeof separator == 'string' || separator != null && !isRegExp(separator))) {
    separator = baseToString(separator);
    if (!separator && hasUnicode(string)) {
      return castSlice(stringToArray(string), 0, limit);
    }
  }
  return string.split(separator, limit);
}

module.exports = split;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NwbGl0LmpzIl0sIm5hbWVzIjpbImJhc2VUb1N0cmluZyIsInJlcXVpcmUiLCJjYXN0U2xpY2UiLCJoYXNVbmljb2RlIiwiaXNJdGVyYXRlZUNhbGwiLCJpc1JlZ0V4cCIsInN0cmluZ1RvQXJyYXkiLCJ0b1N0cmluZyIsIk1BWF9BUlJBWV9MRU5HVEgiLCJzcGxpdCIsInN0cmluZyIsInNlcGFyYXRvciIsImxpbWl0IiwidW5kZWZpbmVkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5CO0FBQUEsSUFDSUMsWUFBWUQsUUFBUSxjQUFSLENBRGhCO0FBQUEsSUFFSUUsYUFBYUYsUUFBUSxlQUFSLENBRmpCO0FBQUEsSUFHSUcsaUJBQWlCSCxRQUFRLG1CQUFSLENBSHJCO0FBQUEsSUFJSUksV0FBV0osUUFBUSxZQUFSLENBSmY7QUFBQSxJQUtJSyxnQkFBZ0JMLFFBQVEsa0JBQVIsQ0FMcEI7QUFBQSxJQU1JTSxXQUFXTixRQUFRLFlBQVIsQ0FOZjs7QUFRQTtBQUNBLElBQUlPLG1CQUFtQixVQUF2Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxTQUFTQyxLQUFULENBQWVDLE1BQWYsRUFBdUJDLFNBQXZCLEVBQWtDQyxLQUFsQyxFQUF5QztBQUN2QyxNQUFJQSxTQUFTLE9BQU9BLEtBQVAsSUFBZ0IsUUFBekIsSUFBcUNSLGVBQWVNLE1BQWYsRUFBdUJDLFNBQXZCLEVBQWtDQyxLQUFsQyxDQUF6QyxFQUFtRjtBQUNqRkQsZ0JBQVlDLFFBQVFDLFNBQXBCO0FBQ0Q7QUFDREQsVUFBUUEsVUFBVUMsU0FBVixHQUFzQkwsZ0JBQXRCLEdBQXlDSSxVQUFVLENBQTNEO0FBQ0EsTUFBSSxDQUFDQSxLQUFMLEVBQVk7QUFDVixXQUFPLEVBQVA7QUFDRDtBQUNERixXQUFTSCxTQUFTRyxNQUFULENBQVQ7QUFDQSxNQUFJQSxXQUNFLE9BQU9DLFNBQVAsSUFBb0IsUUFBcEIsSUFDQ0EsYUFBYSxJQUFiLElBQXFCLENBQUNOLFNBQVNNLFNBQVQsQ0FGekIsQ0FBSixFQUdPO0FBQ0xBLGdCQUFZWCxhQUFhVyxTQUFiLENBQVo7QUFDQSxRQUFJLENBQUNBLFNBQUQsSUFBY1IsV0FBV08sTUFBWCxDQUFsQixFQUFzQztBQUNwQyxhQUFPUixVQUFVSSxjQUFjSSxNQUFkLENBQVYsRUFBaUMsQ0FBakMsRUFBb0NFLEtBQXBDLENBQVA7QUFDRDtBQUNGO0FBQ0QsU0FBT0YsT0FBT0QsS0FBUCxDQUFhRSxTQUFiLEVBQXdCQyxLQUF4QixDQUFQO0FBQ0Q7O0FBRURFLE9BQU9DLE9BQVAsR0FBaUJOLEtBQWpCIiwiZmlsZSI6InNwbGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VUb1N0cmluZyA9IHJlcXVpcmUoJy4vX2Jhc2VUb1N0cmluZycpLFxuICAgIGNhc3RTbGljZSA9IHJlcXVpcmUoJy4vX2Nhc3RTbGljZScpLFxuICAgIGhhc1VuaWNvZGUgPSByZXF1aXJlKCcuL19oYXNVbmljb2RlJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL19pc0l0ZXJhdGVlQ2FsbCcpLFxuICAgIGlzUmVnRXhwID0gcmVxdWlyZSgnLi9pc1JlZ0V4cCcpLFxuICAgIHN0cmluZ1RvQXJyYXkgPSByZXF1aXJlKCcuL19zdHJpbmdUb0FycmF5JyksXG4gICAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHRoZSBtYXhpbXVtIGxlbmd0aCBhbmQgaW5kZXggb2YgYW4gYXJyYXkuICovXG52YXIgTUFYX0FSUkFZX0xFTkdUSCA9IDQyOTQ5NjcyOTU7XG5cbi8qKlxuICogU3BsaXRzIGBzdHJpbmdgIGJ5IGBzZXBhcmF0b3JgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvblxuICogW2BTdHJpbmcjc3BsaXRgXShodHRwczovL21kbi5pby9TdHJpbmcvc3BsaXQpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIHNwbGl0LlxuICogQHBhcmFtIHtSZWdFeHB8c3RyaW5nfSBzZXBhcmF0b3IgVGhlIHNlcGFyYXRvciBwYXR0ZXJuIHRvIHNwbGl0IGJ5LlxuICogQHBhcmFtIHtudW1iZXJ9IFtsaW1pdF0gVGhlIGxlbmd0aCB0byB0cnVuY2F0ZSByZXN1bHRzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBzdHJpbmcgc2VnbWVudHMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uc3BsaXQoJ2EtYi1jJywgJy0nLCAyKTtcbiAqIC8vID0+IFsnYScsICdiJ11cbiAqL1xuZnVuY3Rpb24gc3BsaXQoc3RyaW5nLCBzZXBhcmF0b3IsIGxpbWl0KSB7XG4gIGlmIChsaW1pdCAmJiB0eXBlb2YgbGltaXQgIT0gJ251bWJlcicgJiYgaXNJdGVyYXRlZUNhbGwoc3RyaW5nLCBzZXBhcmF0b3IsIGxpbWl0KSkge1xuICAgIHNlcGFyYXRvciA9IGxpbWl0ID0gdW5kZWZpbmVkO1xuICB9XG4gIGxpbWl0ID0gbGltaXQgPT09IHVuZGVmaW5lZCA/IE1BWF9BUlJBWV9MRU5HVEggOiBsaW1pdCA+Pj4gMDtcbiAgaWYgKCFsaW1pdCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICBpZiAoc3RyaW5nICYmIChcbiAgICAgICAgdHlwZW9mIHNlcGFyYXRvciA9PSAnc3RyaW5nJyB8fFxuICAgICAgICAoc2VwYXJhdG9yICE9IG51bGwgJiYgIWlzUmVnRXhwKHNlcGFyYXRvcikpXG4gICAgICApKSB7XG4gICAgc2VwYXJhdG9yID0gYmFzZVRvU3RyaW5nKHNlcGFyYXRvcik7XG4gICAgaWYgKCFzZXBhcmF0b3IgJiYgaGFzVW5pY29kZShzdHJpbmcpKSB7XG4gICAgICByZXR1cm4gY2FzdFNsaWNlKHN0cmluZ1RvQXJyYXkoc3RyaW5nKSwgMCwgbGltaXQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyaW5nLnNwbGl0KHNlcGFyYXRvciwgbGltaXQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNwbGl0O1xuIl19