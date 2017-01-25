'use strict';

var basePropertyOf = require('./_basePropertyOf');

/** Used to map HTML entities to characters. */
var htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
};

/**
 * Used by `_.unescape` to convert HTML entities to characters.
 *
 * @private
 * @param {string} chr The matched character to unescape.
 * @returns {string} Returns the unescaped character.
 */
var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

module.exports = unescapeHtmlChar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL191bmVzY2FwZUh0bWxDaGFyLmpzIl0sIm5hbWVzIjpbImJhc2VQcm9wZXJ0eU9mIiwicmVxdWlyZSIsImh0bWxVbmVzY2FwZXMiLCJ1bmVzY2FwZUh0bWxDaGFyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxpQkFBaUJDLFFBQVEsbUJBQVIsQ0FBckI7O0FBRUE7QUFDQSxJQUFJQyxnQkFBZ0I7QUFDbEIsV0FBUyxHQURTO0FBRWxCLFVBQVEsR0FGVTtBQUdsQixVQUFRLEdBSFU7QUFJbEIsWUFBVSxHQUpRO0FBS2xCLFdBQVM7QUFMUyxDQUFwQjs7QUFRQTs7Ozs7OztBQU9BLElBQUlDLG1CQUFtQkgsZUFBZUUsYUFBZixDQUF2Qjs7QUFFQUUsT0FBT0MsT0FBUCxHQUFpQkYsZ0JBQWpCIiwiZmlsZSI6Il91bmVzY2FwZUh0bWxDaGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VQcm9wZXJ0eU9mID0gcmVxdWlyZSgnLi9fYmFzZVByb3BlcnR5T2YnKTtcblxuLyoqIFVzZWQgdG8gbWFwIEhUTUwgZW50aXRpZXMgdG8gY2hhcmFjdGVycy4gKi9cbnZhciBodG1sVW5lc2NhcGVzID0ge1xuICAnJmFtcDsnOiAnJicsXG4gICcmbHQ7JzogJzwnLFxuICAnJmd0Oyc6ICc+JyxcbiAgJyZxdW90Oyc6ICdcIicsXG4gICcmIzM5Oyc6IFwiJ1wiXG59O1xuXG4vKipcbiAqIFVzZWQgYnkgYF8udW5lc2NhcGVgIHRvIGNvbnZlcnQgSFRNTCBlbnRpdGllcyB0byBjaGFyYWN0ZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hyIFRoZSBtYXRjaGVkIGNoYXJhY3RlciB0byB1bmVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHVuZXNjYXBlZCBjaGFyYWN0ZXIuXG4gKi9cbnZhciB1bmVzY2FwZUh0bWxDaGFyID0gYmFzZVByb3BlcnR5T2YoaHRtbFVuZXNjYXBlcyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5lc2NhcGVIdG1sQ2hhcjtcbiJdfQ==