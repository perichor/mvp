'use strict';

var memoizeCapped = require('./_memoizeCapped');

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function (string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

module.exports = stringToPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19zdHJpbmdUb1BhdGguanMiXSwibmFtZXMiOlsibWVtb2l6ZUNhcHBlZCIsInJlcXVpcmUiLCJyZUxlYWRpbmdEb3QiLCJyZVByb3BOYW1lIiwicmVFc2NhcGVDaGFyIiwic3RyaW5nVG9QYXRoIiwic3RyaW5nIiwicmVzdWx0IiwidGVzdCIsInB1c2giLCJyZXBsYWNlIiwibWF0Y2giLCJudW1iZXIiLCJxdW90ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZ0JBQWdCQyxRQUFRLGtCQUFSLENBQXBCOztBQUVBO0FBQ0EsSUFBSUMsZUFBZSxLQUFuQjtBQUFBLElBQ0lDLGFBQWEsa0dBRGpCOztBQUdBO0FBQ0EsSUFBSUMsZUFBZSxVQUFuQjs7QUFFQTs7Ozs7OztBQU9BLElBQUlDLGVBQWVMLGNBQWMsVUFBU00sTUFBVCxFQUFpQjtBQUNoRCxNQUFJQyxTQUFTLEVBQWI7QUFDQSxNQUFJTCxhQUFhTSxJQUFiLENBQWtCRixNQUFsQixDQUFKLEVBQStCO0FBQzdCQyxXQUFPRSxJQUFQLENBQVksRUFBWjtBQUNEO0FBQ0RILFNBQU9JLE9BQVAsQ0FBZVAsVUFBZixFQUEyQixVQUFTUSxLQUFULEVBQWdCQyxNQUFoQixFQUF3QkMsS0FBeEIsRUFBK0JQLE1BQS9CLEVBQXVDO0FBQ2hFQyxXQUFPRSxJQUFQLENBQVlJLFFBQVFQLE9BQU9JLE9BQVAsQ0FBZU4sWUFBZixFQUE2QixJQUE3QixDQUFSLEdBQThDUSxVQUFVRCxLQUFwRTtBQUNELEdBRkQ7QUFHQSxTQUFPSixNQUFQO0FBQ0QsQ0FUa0IsQ0FBbkI7O0FBV0FPLE9BQU9DLE9BQVAsR0FBaUJWLFlBQWpCIiwiZmlsZSI6Il9zdHJpbmdUb1BhdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbWVtb2l6ZUNhcHBlZCA9IHJlcXVpcmUoJy4vX21lbW9pemVDYXBwZWQnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlTGVhZGluZ0RvdCA9IC9eXFwuLyxcbiAgICByZVByb3BOYW1lID0gL1teLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCQpKS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG52YXIgc3RyaW5nVG9QYXRoID0gbWVtb2l6ZUNhcHBlZChmdW5jdGlvbihzdHJpbmcpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAocmVMZWFkaW5nRG90LnRlc3Qoc3RyaW5nKSkge1xuICAgIHJlc3VsdC5wdXNoKCcnKTtcbiAgfVxuICBzdHJpbmcucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmluZ1RvUGF0aDtcbiJdfQ==