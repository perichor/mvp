'use strict';

var baseIteratee = require('./_baseIteratee'),
    baseSortedUniq = require('./_baseSortedUniq');

/**
 * This method is like `_.uniqBy` except that it's designed and optimized
 * for sorted arrays.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
 * // => [1.1, 2.3]
 */
function sortedUniqBy(array, iteratee) {
    return array && array.length ? baseSortedUniq(array, baseIteratee(iteratee, 2)) : [];
}

module.exports = sortedUniqBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NvcnRlZFVuaXFCeS5qcyJdLCJuYW1lcyI6WyJiYXNlSXRlcmF0ZWUiLCJyZXF1aXJlIiwiYmFzZVNvcnRlZFVuaXEiLCJzb3J0ZWRVbmlxQnkiLCJhcnJheSIsIml0ZXJhdGVlIiwibGVuZ3RoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5CO0FBQUEsSUFDSUMsaUJBQWlCRCxRQUFRLG1CQUFSLENBRHJCOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBLFNBQVNFLFlBQVQsQ0FBc0JDLEtBQXRCLEVBQTZCQyxRQUE3QixFQUF1QztBQUNyQyxXQUFRRCxTQUFTQSxNQUFNRSxNQUFoQixHQUNISixlQUFlRSxLQUFmLEVBQXNCSixhQUFhSyxRQUFiLEVBQXVCLENBQXZCLENBQXRCLENBREcsR0FFSCxFQUZKO0FBR0Q7O0FBRURFLE9BQU9DLE9BQVAsR0FBaUJMLFlBQWpCIiwiZmlsZSI6InNvcnRlZFVuaXFCeS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlSXRlcmF0ZWUgPSByZXF1aXJlKCcuL19iYXNlSXRlcmF0ZWUnKSxcbiAgICBiYXNlU29ydGVkVW5pcSA9IHJlcXVpcmUoJy4vX2Jhc2VTb3J0ZWRVbmlxJyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy51bmlxQnlgIGV4Y2VwdCB0aGF0IGl0J3MgZGVzaWduZWQgYW5kIG9wdGltaXplZFxuICogZm9yIHNvcnRlZCBhcnJheXMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUgZnJlZSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5zb3J0ZWRVbmlxQnkoWzEuMSwgMS4yLCAyLjMsIDIuNF0sIE1hdGguZmxvb3IpO1xuICogLy8gPT4gWzEuMSwgMi4zXVxuICovXG5mdW5jdGlvbiBzb3J0ZWRVbmlxQnkoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHJldHVybiAoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKVxuICAgID8gYmFzZVNvcnRlZFVuaXEoYXJyYXksIGJhc2VJdGVyYXRlZShpdGVyYXRlZSwgMikpXG4gICAgOiBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0ZWRVbmlxQnk7XG4iXX0=