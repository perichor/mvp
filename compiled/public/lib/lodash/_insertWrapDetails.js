'use strict';

/** Used to match wrap detail comments. */
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */
function insertWrapDetails(source, details) {
  var length = details.length;
  if (!length) {
    return source;
  }
  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

module.exports = insertWrapDetails;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19pbnNlcnRXcmFwRGV0YWlscy5qcyJdLCJuYW1lcyI6WyJyZVdyYXBDb21tZW50IiwiaW5zZXJ0V3JhcERldGFpbHMiLCJzb3VyY2UiLCJkZXRhaWxzIiwibGVuZ3RoIiwibGFzdEluZGV4Iiwiam9pbiIsInJlcGxhY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBSUEsZ0JBQWdCLDJDQUFwQjs7QUFFQTs7Ozs7Ozs7QUFRQSxTQUFTQyxpQkFBVCxDQUEyQkMsTUFBM0IsRUFBbUNDLE9BQW5DLEVBQTRDO0FBQzFDLE1BQUlDLFNBQVNELFFBQVFDLE1BQXJCO0FBQ0EsTUFBSSxDQUFDQSxNQUFMLEVBQWE7QUFDWCxXQUFPRixNQUFQO0FBQ0Q7QUFDRCxNQUFJRyxZQUFZRCxTQUFTLENBQXpCO0FBQ0FELFVBQVFFLFNBQVIsSUFBcUIsQ0FBQ0QsU0FBUyxDQUFULEdBQWEsSUFBYixHQUFvQixFQUFyQixJQUEyQkQsUUFBUUUsU0FBUixDQUFoRDtBQUNBRixZQUFVQSxRQUFRRyxJQUFSLENBQWFGLFNBQVMsQ0FBVCxHQUFhLElBQWIsR0FBb0IsR0FBakMsQ0FBVjtBQUNBLFNBQU9GLE9BQU9LLE9BQVAsQ0FBZVAsYUFBZixFQUE4Qix5QkFBeUJHLE9BQXpCLEdBQW1DLFFBQWpFLENBQVA7QUFDRDs7QUFFREssT0FBT0MsT0FBUCxHQUFpQlIsaUJBQWpCIiwiZmlsZSI6Il9pbnNlcnRXcmFwRGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBVc2VkIHRvIG1hdGNoIHdyYXAgZGV0YWlsIGNvbW1lbnRzLiAqL1xudmFyIHJlV3JhcENvbW1lbnQgPSAvXFx7KD86XFxuXFwvXFwqIFxcW3dyYXBwZWQgd2l0aCAuK1xcXSBcXCpcXC8pP1xcbj8vO1xuXG4vKipcbiAqIEluc2VydHMgd3JhcHBlciBgZGV0YWlsc2AgaW4gYSBjb21tZW50IGF0IHRoZSB0b3Agb2YgdGhlIGBzb3VyY2VgIGJvZHkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2UgVGhlIHNvdXJjZSB0byBtb2RpZnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IGRldGFpbHMgVGhlIGRldGFpbHMgdG8gaW5zZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgbW9kaWZpZWQgc291cmNlLlxuICovXG5mdW5jdGlvbiBpbnNlcnRXcmFwRGV0YWlscyhzb3VyY2UsIGRldGFpbHMpIHtcbiAgdmFyIGxlbmd0aCA9IGRldGFpbHMubGVuZ3RoO1xuICBpZiAoIWxlbmd0aCkge1xuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGxlbmd0aCAtIDE7XG4gIGRldGFpbHNbbGFzdEluZGV4XSA9IChsZW5ndGggPiAxID8gJyYgJyA6ICcnKSArIGRldGFpbHNbbGFzdEluZGV4XTtcbiAgZGV0YWlscyA9IGRldGFpbHMuam9pbihsZW5ndGggPiAyID8gJywgJyA6ICcgJyk7XG4gIHJldHVybiBzb3VyY2UucmVwbGFjZShyZVdyYXBDb21tZW50LCAne1xcbi8qIFt3cmFwcGVkIHdpdGggJyArIGRldGFpbHMgKyAnXSAqL1xcbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFdyYXBEZXRhaWxzO1xuIl19