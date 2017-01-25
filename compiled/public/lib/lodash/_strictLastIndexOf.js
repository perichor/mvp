"use strict";

/**
 * A specialized version of `_.lastIndexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictLastIndexOf(array, value, fromIndex) {
  var index = fromIndex + 1;
  while (index--) {
    if (array[index] === value) {
      return index;
    }
  }
  return index;
}

module.exports = strictLastIndexOf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19zdHJpY3RMYXN0SW5kZXhPZi5qcyJdLCJuYW1lcyI6WyJzdHJpY3RMYXN0SW5kZXhPZiIsImFycmF5IiwidmFsdWUiLCJmcm9tSW5kZXgiLCJpbmRleCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7QUFVQSxTQUFTQSxpQkFBVCxDQUEyQkMsS0FBM0IsRUFBa0NDLEtBQWxDLEVBQXlDQyxTQUF6QyxFQUFvRDtBQUNsRCxNQUFJQyxRQUFRRCxZQUFZLENBQXhCO0FBQ0EsU0FBT0MsT0FBUCxFQUFnQjtBQUNkLFFBQUlILE1BQU1HLEtBQU4sTUFBaUJGLEtBQXJCLEVBQTRCO0FBQzFCLGFBQU9FLEtBQVA7QUFDRDtBQUNGO0FBQ0QsU0FBT0EsS0FBUDtBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCTixpQkFBakIiLCJmaWxlIjoiX3N0cmljdExhc3RJbmRleE9mLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubGFzdEluZGV4T2ZgIHdoaWNoIHBlcmZvcm1zIHN0cmljdCBlcXVhbGl0eVxuICogY29tcGFyaXNvbnMgb2YgdmFsdWVzLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIHN0cmljdExhc3RJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIHZhciBpbmRleCA9IGZyb21JbmRleCArIDE7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0cmljdExhc3RJbmRleE9mO1xuIl19