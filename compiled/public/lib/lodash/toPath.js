'use strict';

var arrayMap = require('./_arrayMap'),
    copyArray = require('./_copyArray'),
    isArray = require('./isArray'),
    isSymbol = require('./isSymbol'),
    stringToPath = require('./_stringToPath'),
    toKey = require('./_toKey'),
    toString = require('./toString');

/**
 * Converts `value` to a property path array.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * _.toPath('a.b.c');
 * // => ['a', 'b', 'c']
 *
 * _.toPath('a[0].b.c');
 * // => ['a', '0', 'b', 'c']
 */
function toPath(value) {
  if (isArray(value)) {
    return arrayMap(value, toKey);
  }
  return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
}

module.exports = toPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3RvUGF0aC5qcyJdLCJuYW1lcyI6WyJhcnJheU1hcCIsInJlcXVpcmUiLCJjb3B5QXJyYXkiLCJpc0FycmF5IiwiaXNTeW1ib2wiLCJzdHJpbmdUb1BhdGgiLCJ0b0tleSIsInRvU3RyaW5nIiwidG9QYXRoIiwidmFsdWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsYUFBUixDQUFmO0FBQUEsSUFDSUMsWUFBWUQsUUFBUSxjQUFSLENBRGhCO0FBQUEsSUFFSUUsVUFBVUYsUUFBUSxXQUFSLENBRmQ7QUFBQSxJQUdJRyxXQUFXSCxRQUFRLFlBQVIsQ0FIZjtBQUFBLElBSUlJLGVBQWVKLFFBQVEsaUJBQVIsQ0FKbkI7QUFBQSxJQUtJSyxRQUFRTCxRQUFRLFVBQVIsQ0FMWjtBQUFBLElBTUlNLFdBQVdOLFFBQVEsWUFBUixDQU5mOztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxTQUFTTyxNQUFULENBQWdCQyxLQUFoQixFQUF1QjtBQUNyQixNQUFJTixRQUFRTSxLQUFSLENBQUosRUFBb0I7QUFDbEIsV0FBT1QsU0FBU1MsS0FBVCxFQUFnQkgsS0FBaEIsQ0FBUDtBQUNEO0FBQ0QsU0FBT0YsU0FBU0ssS0FBVCxJQUFrQixDQUFDQSxLQUFELENBQWxCLEdBQTRCUCxVQUFVRyxhQUFhRSxTQUFTRSxLQUFULENBQWIsQ0FBVixDQUFuQztBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCSCxNQUFqQiIsImZpbGUiOiJ0b1BhdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXJyYXlNYXAgPSByZXF1aXJlKCcuL19hcnJheU1hcCcpLFxuICAgIGNvcHlBcnJheSA9IHJlcXVpcmUoJy4vX2NvcHlBcnJheScpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKSxcbiAgICBzdHJpbmdUb1BhdGggPSByZXF1aXJlKCcuL19zdHJpbmdUb1BhdGgnKSxcbiAgICB0b0tleSA9IHJlcXVpcmUoJy4vX3RvS2V5JyksXG4gICAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvUGF0aCgnYS5iLmMnKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXVxuICpcbiAqIF8udG9QYXRoKCdhWzBdLmIuYycpO1xuICogLy8gPT4gWydhJywgJzAnLCAnYicsICdjJ11cbiAqL1xuZnVuY3Rpb24gdG9QYXRoKHZhbHVlKSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBhcnJheU1hcCh2YWx1ZSwgdG9LZXkpO1xuICB9XG4gIHJldHVybiBpc1N5bWJvbCh2YWx1ZSkgPyBbdmFsdWVdIDogY29weUFycmF5KHN0cmluZ1RvUGF0aCh0b1N0cmluZyh2YWx1ZSkpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1BhdGg7XG4iXX0=