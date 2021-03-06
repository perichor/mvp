'use strict';

var baseIndexOf = require('./_baseIndexOf');

/**
 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */
function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1,
      length = strSymbols.length;

  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

module.exports = charsStartIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19jaGFyc1N0YXJ0SW5kZXguanMiXSwibmFtZXMiOlsiYmFzZUluZGV4T2YiLCJyZXF1aXJlIiwiY2hhcnNTdGFydEluZGV4Iiwic3RyU3ltYm9scyIsImNoclN5bWJvbHMiLCJpbmRleCIsImxlbmd0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsY0FBY0MsUUFBUSxnQkFBUixDQUFsQjs7QUFFQTs7Ozs7Ozs7O0FBU0EsU0FBU0MsZUFBVCxDQUF5QkMsVUFBekIsRUFBcUNDLFVBQXJDLEVBQWlEO0FBQy9DLE1BQUlDLFFBQVEsQ0FBQyxDQUFiO0FBQUEsTUFDSUMsU0FBU0gsV0FBV0csTUFEeEI7O0FBR0EsU0FBTyxFQUFFRCxLQUFGLEdBQVVDLE1BQVYsSUFBb0JOLFlBQVlJLFVBQVosRUFBd0JELFdBQVdFLEtBQVgsQ0FBeEIsRUFBMkMsQ0FBM0MsSUFBZ0QsQ0FBQyxDQUE1RSxFQUErRSxDQUFFO0FBQ2pGLFNBQU9BLEtBQVA7QUFDRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQk4sZUFBakIiLCJmaWxlIjoiX2NoYXJzU3RhcnRJbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Jhc2VJbmRleE9mJyk7XG5cbi8qKlxuICogVXNlZCBieSBgXy50cmltYCBhbmQgYF8udHJpbVN0YXJ0YCB0byBnZXQgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBzdHJpbmcgc3ltYm9sXG4gKiB0aGF0IGlzIG5vdCBmb3VuZCBpbiB0aGUgY2hhcmFjdGVyIHN5bWJvbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHN0clN5bWJvbHMgVGhlIHN0cmluZyBzeW1ib2xzIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBjaHJTeW1ib2xzIFRoZSBjaGFyYWN0ZXIgc3ltYm9scyB0byBmaW5kLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IHVubWF0Y2hlZCBzdHJpbmcgc3ltYm9sLlxuICovXG5mdW5jdGlvbiBjaGFyc1N0YXJ0SW5kZXgoc3RyU3ltYm9scywgY2hyU3ltYm9scykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHN0clN5bWJvbHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoICYmIGJhc2VJbmRleE9mKGNoclN5bWJvbHMsIHN0clN5bWJvbHNbaW5kZXhdLCAwKSA+IC0xKSB7fVxuICByZXR1cm4gaW5kZXg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhcnNTdGFydEluZGV4O1xuIl19