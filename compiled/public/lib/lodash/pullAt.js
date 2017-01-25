'use strict';

var arrayMap = require('./_arrayMap'),
    baseAt = require('./_baseAt'),
    basePullAt = require('./_basePullAt'),
    compareAscending = require('./_compareAscending'),
    flatRest = require('./_flatRest'),
    isIndex = require('./_isIndex');

/**
 * Removes elements from `array` corresponding to `indexes` and returns an
 * array of removed elements.
 *
 * **Note:** Unlike `_.at`, this method mutates `array`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...(number|number[])} [indexes] The indexes of elements to remove.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = ['a', 'b', 'c', 'd'];
 * var pulled = _.pullAt(array, [1, 3]);
 *
 * console.log(array);
 * // => ['a', 'c']
 *
 * console.log(pulled);
 * // => ['b', 'd']
 */
var pullAt = flatRest(function (array, indexes) {
    var length = array == null ? 0 : array.length,
        result = baseAt(array, indexes);

    basePullAt(array, arrayMap(indexes, function (index) {
        return isIndex(index, length) ? +index : index;
    }).sort(compareAscending));

    return result;
});

module.exports = pullAt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3B1bGxBdC5qcyJdLCJuYW1lcyI6WyJhcnJheU1hcCIsInJlcXVpcmUiLCJiYXNlQXQiLCJiYXNlUHVsbEF0IiwiY29tcGFyZUFzY2VuZGluZyIsImZsYXRSZXN0IiwiaXNJbmRleCIsInB1bGxBdCIsImFycmF5IiwiaW5kZXhlcyIsImxlbmd0aCIsInJlc3VsdCIsImluZGV4Iiwic29ydCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsV0FBV0MsUUFBUSxhQUFSLENBQWY7QUFBQSxJQUNJQyxTQUFTRCxRQUFRLFdBQVIsQ0FEYjtBQUFBLElBRUlFLGFBQWFGLFFBQVEsZUFBUixDQUZqQjtBQUFBLElBR0lHLG1CQUFtQkgsUUFBUSxxQkFBUixDQUh2QjtBQUFBLElBSUlJLFdBQVdKLFFBQVEsYUFBUixDQUpmO0FBQUEsSUFLSUssVUFBVUwsUUFBUSxZQUFSLENBTGQ7O0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxJQUFJTSxTQUFTRixTQUFTLFVBQVNHLEtBQVQsRUFBZ0JDLE9BQWhCLEVBQXlCO0FBQzdDLFFBQUlDLFNBQVNGLFNBQVMsSUFBVCxHQUFnQixDQUFoQixHQUFvQkEsTUFBTUUsTUFBdkM7QUFBQSxRQUNJQyxTQUFTVCxPQUFPTSxLQUFQLEVBQWNDLE9BQWQsQ0FEYjs7QUFHQU4sZUFBV0ssS0FBWCxFQUFrQlIsU0FBU1MsT0FBVCxFQUFrQixVQUFTRyxLQUFULEVBQWdCO0FBQ2xELGVBQU9OLFFBQVFNLEtBQVIsRUFBZUYsTUFBZixJQUF5QixDQUFDRSxLQUExQixHQUFrQ0EsS0FBekM7QUFDRCxLQUZpQixFQUVmQyxJQUZlLENBRVZULGdCQUZVLENBQWxCOztBQUlBLFdBQU9PLE1BQVA7QUFDRCxDQVRZLENBQWI7O0FBV0FHLE9BQU9DLE9BQVAsR0FBaUJSLE1BQWpCIiwiZmlsZSI6InB1bGxBdC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcnJheU1hcCA9IHJlcXVpcmUoJy4vX2FycmF5TWFwJyksXG4gICAgYmFzZUF0ID0gcmVxdWlyZSgnLi9fYmFzZUF0JyksXG4gICAgYmFzZVB1bGxBdCA9IHJlcXVpcmUoJy4vX2Jhc2VQdWxsQXQnKSxcbiAgICBjb21wYXJlQXNjZW5kaW5nID0gcmVxdWlyZSgnLi9fY29tcGFyZUFzY2VuZGluZycpLFxuICAgIGZsYXRSZXN0ID0gcmVxdWlyZSgnLi9fZmxhdFJlc3QnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpO1xuXG4vKipcbiAqIFJlbW92ZXMgZWxlbWVudHMgZnJvbSBgYXJyYXlgIGNvcnJlc3BvbmRpbmcgdG8gYGluZGV4ZXNgIGFuZCByZXR1cm5zIGFuXG4gKiBhcnJheSBvZiByZW1vdmVkIGVsZW1lbnRzLlxuICpcbiAqICoqTm90ZToqKiBVbmxpa2UgYF8uYXRgLCB0aGlzIG1ldGhvZCBtdXRhdGVzIGBhcnJheWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHsuLi4obnVtYmVyfG51bWJlcltdKX0gW2luZGV4ZXNdIFRoZSBpbmRleGVzIG9mIGVsZW1lbnRzIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIHJlbW92ZWQgZWxlbWVudHMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheSA9IFsnYScsICdiJywgJ2MnLCAnZCddO1xuICogdmFyIHB1bGxlZCA9IF8ucHVsbEF0KGFycmF5LCBbMSwgM10pO1xuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5KTtcbiAqIC8vID0+IFsnYScsICdjJ11cbiAqXG4gKiBjb25zb2xlLmxvZyhwdWxsZWQpO1xuICogLy8gPT4gWydiJywgJ2QnXVxuICovXG52YXIgcHVsbEF0ID0gZmxhdFJlc3QoZnVuY3Rpb24oYXJyYXksIGluZGV4ZXMpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gYmFzZUF0KGFycmF5LCBpbmRleGVzKTtcblxuICBiYXNlUHVsbEF0KGFycmF5LCBhcnJheU1hcChpbmRleGVzLCBmdW5jdGlvbihpbmRleCkge1xuICAgIHJldHVybiBpc0luZGV4KGluZGV4LCBsZW5ndGgpID8gK2luZGV4IDogaW5kZXg7XG4gIH0pLnNvcnQoY29tcGFyZUFzY2VuZGluZykpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBwdWxsQXQ7XG4iXX0=