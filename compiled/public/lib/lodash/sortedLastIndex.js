'use strict';

var baseSortedIndex = require('./_baseSortedIndex');

/**
 * This method is like `_.sortedIndex` except that it returns the highest
 * index at which `value` should be inserted into `array` in order to
 * maintain its sort order.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
 * // => 4
 */
function sortedLastIndex(array, value) {
  return baseSortedIndex(array, value, true);
}

module.exports = sortedLastIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NvcnRlZExhc3RJbmRleC5qcyJdLCJuYW1lcyI6WyJiYXNlU29ydGVkSW5kZXgiLCJyZXF1aXJlIiwic29ydGVkTGFzdEluZGV4IiwiYXJyYXkiLCJ2YWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsa0JBQWtCQyxRQUFRLG9CQUFSLENBQXRCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsU0FBU0MsZUFBVCxDQUF5QkMsS0FBekIsRUFBZ0NDLEtBQWhDLEVBQXVDO0FBQ3JDLFNBQU9KLGdCQUFnQkcsS0FBaEIsRUFBdUJDLEtBQXZCLEVBQThCLElBQTlCLENBQVA7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQkosZUFBakIiLCJmaWxlIjoic29ydGVkTGFzdEluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VTb3J0ZWRJbmRleCA9IHJlcXVpcmUoJy4vX2Jhc2VTb3J0ZWRJbmRleCcpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uc29ydGVkSW5kZXhgIGV4Y2VwdCB0aGF0IGl0IHJldHVybnMgdGhlIGhpZ2hlc3RcbiAqIGluZGV4IGF0IHdoaWNoIGB2YWx1ZWAgc2hvdWxkIGJlIGluc2VydGVkIGludG8gYGFycmF5YCBpbiBvcmRlciB0b1xuICogbWFpbnRhaW4gaXRzIHNvcnQgb3JkZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgc29ydGVkIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBldmFsdWF0ZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IGF0IHdoaWNoIGB2YWx1ZWAgc2hvdWxkIGJlIGluc2VydGVkXG4gKiAgaW50byBgYXJyYXlgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnNvcnRlZExhc3RJbmRleChbNCwgNSwgNSwgNSwgNl0sIDUpO1xuICogLy8gPT4gNFxuICovXG5mdW5jdGlvbiBzb3J0ZWRMYXN0SW5kZXgoYXJyYXksIHZhbHVlKSB7XG4gIHJldHVybiBiYXNlU29ydGVkSW5kZXgoYXJyYXksIHZhbHVlLCB0cnVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0ZWRMYXN0SW5kZXg7XG4iXX0=