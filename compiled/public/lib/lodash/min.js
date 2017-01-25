'use strict';

var baseExtremum = require('./_baseExtremum'),
    baseLt = require('./_baseLt'),
    identity = require('./identity');

/**
 * Computes the minimum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * _.min([4, 2, 8, 6]);
 * // => 2
 *
 * _.min([]);
 * // => undefined
 */
function min(array) {
    return array && array.length ? baseExtremum(array, identity, baseLt) : undefined;
}

module.exports = min;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL21pbi5qcyJdLCJuYW1lcyI6WyJiYXNlRXh0cmVtdW0iLCJyZXF1aXJlIiwiYmFzZUx0IiwiaWRlbnRpdHkiLCJtaW4iLCJhcnJheSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZUFBZUMsUUFBUSxpQkFBUixDQUFuQjtBQUFBLElBQ0lDLFNBQVNELFFBQVEsV0FBUixDQURiO0FBQUEsSUFFSUUsV0FBV0YsUUFBUSxZQUFSLENBRmY7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxTQUFTRyxHQUFULENBQWFDLEtBQWIsRUFBb0I7QUFDbEIsV0FBUUEsU0FBU0EsTUFBTUMsTUFBaEIsR0FDSE4sYUFBYUssS0FBYixFQUFvQkYsUUFBcEIsRUFBOEJELE1BQTlCLENBREcsR0FFSEssU0FGSjtBQUdEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCTCxHQUFqQiIsImZpbGUiOiJtaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUV4dHJlbXVtID0gcmVxdWlyZSgnLi9fYmFzZUV4dHJlbXVtJyksXG4gICAgYmFzZUx0ID0gcmVxdWlyZSgnLi9fYmFzZUx0JyksXG4gICAgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1pbmltdW0gdmFsdWUgb2YgYGFycmF5YC4gSWYgYGFycmF5YCBpcyBlbXB0eSBvciBmYWxzZXksXG4gKiBgdW5kZWZpbmVkYCBpcyByZXR1cm5lZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtaW5pbXVtIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLm1pbihbNCwgMiwgOCwgNl0pO1xuICogLy8gPT4gMlxuICpcbiAqIF8ubWluKFtdKTtcbiAqIC8vID0+IHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBtaW4oYXJyYXkpIHtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpXG4gICAgPyBiYXNlRXh0cmVtdW0oYXJyYXksIGlkZW50aXR5LCBiYXNlTHQpXG4gICAgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWluO1xuIl19