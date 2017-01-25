'use strict';

var arrayShuffle = require('./_arrayShuffle'),
    baseShuffle = require('./_baseShuffle'),
    isArray = require('./isArray');

/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * _.shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 */
function shuffle(collection) {
  var func = isArray(collection) ? arrayShuffle : baseShuffle;
  return func(collection);
}

module.exports = shuffle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NodWZmbGUuanMiXSwibmFtZXMiOlsiYXJyYXlTaHVmZmxlIiwicmVxdWlyZSIsImJhc2VTaHVmZmxlIiwiaXNBcnJheSIsInNodWZmbGUiLCJjb2xsZWN0aW9uIiwiZnVuYyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZUFBZUMsUUFBUSxpQkFBUixDQUFuQjtBQUFBLElBQ0lDLGNBQWNELFFBQVEsZ0JBQVIsQ0FEbEI7QUFBQSxJQUVJRSxVQUFVRixRQUFRLFdBQVIsQ0FGZDs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsU0FBU0csT0FBVCxDQUFpQkMsVUFBakIsRUFBNkI7QUFDM0IsTUFBSUMsT0FBT0gsUUFBUUUsVUFBUixJQUFzQkwsWUFBdEIsR0FBcUNFLFdBQWhEO0FBQ0EsU0FBT0ksS0FBS0QsVUFBTCxDQUFQO0FBQ0Q7O0FBRURFLE9BQU9DLE9BQVAsR0FBaUJKLE9BQWpCIiwiZmlsZSI6InNodWZmbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXJyYXlTaHVmZmxlID0gcmVxdWlyZSgnLi9fYXJyYXlTaHVmZmxlJyksXG4gICAgYmFzZVNodWZmbGUgPSByZXF1aXJlKCcuL19iYXNlU2h1ZmZsZScpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHNodWZmbGVkIHZhbHVlcywgdXNpbmcgYSB2ZXJzaW9uIG9mIHRoZVxuICogW0Zpc2hlci1ZYXRlcyBzaHVmZmxlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaXNoZXItWWF0ZXNfc2h1ZmZsZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIHNodWZmbGUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBzaHVmZmxlZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5zaHVmZmxlKFsxLCAyLCAzLCA0XSk7XG4gKiAvLyA9PiBbNCwgMSwgMywgMl1cbiAqL1xuZnVuY3Rpb24gc2h1ZmZsZShjb2xsZWN0aW9uKSB7XG4gIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5U2h1ZmZsZSA6IGJhc2VTaHVmZmxlO1xuICByZXR1cm4gZnVuYyhjb2xsZWN0aW9uKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaHVmZmxlO1xuIl19