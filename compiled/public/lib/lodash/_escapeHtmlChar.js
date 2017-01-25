'use strict';

var basePropertyOf = require('./_basePropertyOf');

/** Used to map characters to HTML entities. */
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

/**
 * Used by `_.escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
var escapeHtmlChar = basePropertyOf(htmlEscapes);

module.exports = escapeHtmlChar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19lc2NhcGVIdG1sQ2hhci5qcyJdLCJuYW1lcyI6WyJiYXNlUHJvcGVydHlPZiIsInJlcXVpcmUiLCJodG1sRXNjYXBlcyIsImVzY2FwZUh0bWxDaGFyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxpQkFBaUJDLFFBQVEsbUJBQVIsQ0FBckI7O0FBRUE7QUFDQSxJQUFJQyxjQUFjO0FBQ2hCLE9BQUssT0FEVztBQUVoQixPQUFLLE1BRlc7QUFHaEIsT0FBSyxNQUhXO0FBSWhCLE9BQUssUUFKVztBQUtoQixPQUFLO0FBTFcsQ0FBbEI7O0FBUUE7Ozs7Ozs7QUFPQSxJQUFJQyxpQkFBaUJILGVBQWVFLFdBQWYsQ0FBckI7O0FBRUFFLE9BQU9DLE9BQVAsR0FBaUJGLGNBQWpCIiwiZmlsZSI6Il9lc2NhcGVIdG1sQ2hhci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlUHJvcGVydHlPZiA9IHJlcXVpcmUoJy4vX2Jhc2VQcm9wZXJ0eU9mJyk7XG5cbi8qKiBVc2VkIHRvIG1hcCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXMuICovXG52YXIgaHRtbEVzY2FwZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmIzM5Oydcbn07XG5cbi8qKlxuICogVXNlZCBieSBgXy5lc2NhcGVgIHRvIGNvbnZlcnQgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hyIFRoZSBtYXRjaGVkIGNoYXJhY3RlciB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAqL1xudmFyIGVzY2FwZUh0bWxDaGFyID0gYmFzZVByb3BlcnR5T2YoaHRtbEVzY2FwZXMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZUh0bWxDaGFyO1xuIl19