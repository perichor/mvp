"use strict";

/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
function iteratorToArray(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}

module.exports = iteratorToArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19pdGVyYXRvclRvQXJyYXkuanMiXSwibmFtZXMiOlsiaXRlcmF0b3JUb0FycmF5IiwiaXRlcmF0b3IiLCJkYXRhIiwicmVzdWx0IiwibmV4dCIsImRvbmUiLCJwdXNoIiwidmFsdWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBT0EsU0FBU0EsZUFBVCxDQUF5QkMsUUFBekIsRUFBbUM7QUFDakMsTUFBSUMsSUFBSjtBQUFBLE1BQ0lDLFNBQVMsRUFEYjs7QUFHQSxTQUFPLENBQUMsQ0FBQ0QsT0FBT0QsU0FBU0csSUFBVCxFQUFSLEVBQXlCQyxJQUFqQyxFQUF1QztBQUNyQ0YsV0FBT0csSUFBUCxDQUFZSixLQUFLSyxLQUFqQjtBQUNEO0FBQ0QsU0FBT0osTUFBUDtBQUNEOztBQUVESyxPQUFPQyxPQUFQLEdBQWlCVCxlQUFqQiIsImZpbGUiOiJfaXRlcmF0b3JUb0FycmF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb252ZXJ0cyBgaXRlcmF0b3JgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlcmF0b3IgVGhlIGl0ZXJhdG9yIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gaXRlcmF0b3JUb0FycmF5KGl0ZXJhdG9yKSB7XG4gIHZhciBkYXRhLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCEoZGF0YSA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgIHJlc3VsdC5wdXNoKGRhdGEudmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXRlcmF0b3JUb0FycmF5O1xuIl19