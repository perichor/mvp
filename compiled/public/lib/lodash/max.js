'use strict';

var baseExtremum = require('./_baseExtremum'),
    baseGt = require('./_baseGt'),
    identity = require('./identity');

/**
 * Computes the maximum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * _.max([4, 2, 8, 6]);
 * // => 8
 *
 * _.max([]);
 * // => undefined
 */
function max(array) {
    return array && array.length ? baseExtremum(array, identity, baseGt) : undefined;
}

module.exports = max;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL21heC5qcyJdLCJuYW1lcyI6WyJiYXNlRXh0cmVtdW0iLCJyZXF1aXJlIiwiYmFzZUd0IiwiaWRlbnRpdHkiLCJtYXgiLCJhcnJheSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZUFBZUMsUUFBUSxpQkFBUixDQUFuQjtBQUFBLElBQ0lDLFNBQVNELFFBQVEsV0FBUixDQURiO0FBQUEsSUFFSUUsV0FBV0YsUUFBUSxZQUFSLENBRmY7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxTQUFTRyxHQUFULENBQWFDLEtBQWIsRUFBb0I7QUFDbEIsV0FBUUEsU0FBU0EsTUFBTUMsTUFBaEIsR0FDSE4sYUFBYUssS0FBYixFQUFvQkYsUUFBcEIsRUFBOEJELE1BQTlCLENBREcsR0FFSEssU0FGSjtBQUdEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCTCxHQUFqQiIsImZpbGUiOiJtYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUV4dHJlbXVtID0gcmVxdWlyZSgnLi9fYmFzZUV4dHJlbXVtJyksXG4gICAgYmFzZUd0ID0gcmVxdWlyZSgnLi9fYmFzZUd0JyksXG4gICAgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1heGltdW0gdmFsdWUgb2YgYGFycmF5YC4gSWYgYGFycmF5YCBpcyBlbXB0eSBvciBmYWxzZXksXG4gKiBgdW5kZWZpbmVkYCBpcyByZXR1cm5lZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXhpbXVtIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLm1heChbNCwgMiwgOCwgNl0pO1xuICogLy8gPT4gOFxuICpcbiAqIF8ubWF4KFtdKTtcbiAqIC8vID0+IHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBtYXgoYXJyYXkpIHtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpXG4gICAgPyBiYXNlRXh0cmVtdW0oYXJyYXksIGlkZW50aXR5LCBiYXNlR3QpXG4gICAgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWF4O1xuIl19