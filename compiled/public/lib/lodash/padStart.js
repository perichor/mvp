'use strict';

var createPadding = require('./_createPadding'),
    stringSize = require('./_stringSize'),
    toInteger = require('./toInteger'),
    toString = require('./toString');

/**
 * Pads `string` on the left side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.padStart('abc', 6);
 * // => '   abc'
 *
 * _.padStart('abc', 6, '_-');
 * // => '_-_abc'
 *
 * _.padStart('abc', 3);
 * // => 'abc'
 */
function padStart(string, length, chars) {
    string = toString(string);
    length = toInteger(length);

    var strLength = length ? stringSize(string) : 0;
    return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
}

module.exports = padStart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3BhZFN0YXJ0LmpzIl0sIm5hbWVzIjpbImNyZWF0ZVBhZGRpbmciLCJyZXF1aXJlIiwic3RyaW5nU2l6ZSIsInRvSW50ZWdlciIsInRvU3RyaW5nIiwicGFkU3RhcnQiLCJzdHJpbmciLCJsZW5ndGgiLCJjaGFycyIsInN0ckxlbmd0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZ0JBQWdCQyxRQUFRLGtCQUFSLENBQXBCO0FBQUEsSUFDSUMsYUFBYUQsUUFBUSxlQUFSLENBRGpCO0FBQUEsSUFFSUUsWUFBWUYsUUFBUSxhQUFSLENBRmhCO0FBQUEsSUFHSUcsV0FBV0gsUUFBUSxZQUFSLENBSGY7O0FBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLFNBQVNJLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCQyxNQUExQixFQUFrQ0MsS0FBbEMsRUFBeUM7QUFDdkNGLGFBQVNGLFNBQVNFLE1BQVQsQ0FBVDtBQUNBQyxhQUFTSixVQUFVSSxNQUFWLENBQVQ7O0FBRUEsUUFBSUUsWUFBWUYsU0FBU0wsV0FBV0ksTUFBWCxDQUFULEdBQThCLENBQTlDO0FBQ0EsV0FBUUMsVUFBVUUsWUFBWUYsTUFBdkIsR0FDRlAsY0FBY08sU0FBU0UsU0FBdkIsRUFBa0NELEtBQWxDLElBQTJDRixNQUR6QyxHQUVIQSxNQUZKO0FBR0Q7O0FBRURJLE9BQU9DLE9BQVAsR0FBaUJOLFFBQWpCIiwiZmlsZSI6InBhZFN0YXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNyZWF0ZVBhZGRpbmcgPSByZXF1aXJlKCcuL19jcmVhdGVQYWRkaW5nJyksXG4gICAgc3RyaW5nU2l6ZSA9IHJlcXVpcmUoJy4vX3N0cmluZ1NpemUnKSxcbiAgICB0b0ludGVnZXIgPSByZXF1aXJlKCcuL3RvSW50ZWdlcicpLFxuICAgIHRvU3RyaW5nID0gcmVxdWlyZSgnLi90b1N0cmluZycpO1xuXG4vKipcbiAqIFBhZHMgYHN0cmluZ2Agb24gdGhlIGxlZnQgc2lkZSBpZiBpdCdzIHNob3J0ZXIgdGhhbiBgbGVuZ3RoYC4gUGFkZGluZ1xuICogY2hhcmFjdGVycyBhcmUgdHJ1bmNhdGVkIGlmIHRoZXkgZXhjZWVkIGBsZW5ndGhgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIHBhZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPTBdIFRoZSBwYWRkaW5nIGxlbmd0aC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY2hhcnM9JyAnXSBUaGUgc3RyaW5nIHVzZWQgYXMgcGFkZGluZy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHBhZGRlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ucGFkU3RhcnQoJ2FiYycsIDYpO1xuICogLy8gPT4gJyAgIGFiYydcbiAqXG4gKiBfLnBhZFN0YXJ0KCdhYmMnLCA2LCAnXy0nKTtcbiAqIC8vID0+ICdfLV9hYmMnXG4gKlxuICogXy5wYWRTdGFydCgnYWJjJywgMyk7XG4gKiAvLyA9PiAnYWJjJ1xuICovXG5mdW5jdGlvbiBwYWRTdGFydChzdHJpbmcsIGxlbmd0aCwgY2hhcnMpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgbGVuZ3RoID0gdG9JbnRlZ2VyKGxlbmd0aCk7XG5cbiAgdmFyIHN0ckxlbmd0aCA9IGxlbmd0aCA/IHN0cmluZ1NpemUoc3RyaW5nKSA6IDA7XG4gIHJldHVybiAobGVuZ3RoICYmIHN0ckxlbmd0aCA8IGxlbmd0aClcbiAgICA/IChjcmVhdGVQYWRkaW5nKGxlbmd0aCAtIHN0ckxlbmd0aCwgY2hhcnMpICsgc3RyaW5nKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhZFN0YXJ0O1xuIl19