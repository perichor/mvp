'use strict';

var baseRest = require('./_baseRest'),
    unzip = require('./unzip');

/**
 * Creates an array of grouped elements, the first of which contains the
 * first elements of the given arrays, the second of which contains the
 * second elements of the given arrays, and so on.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @returns {Array} Returns the new array of grouped elements.
 * @example
 *
 * _.zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 */
var zip = baseRest(unzip);

module.exports = zip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3ppcC5qcyJdLCJuYW1lcyI6WyJiYXNlUmVzdCIsInJlcXVpcmUiLCJ1bnppcCIsInppcCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsV0FBV0MsUUFBUSxhQUFSLENBQWY7QUFBQSxJQUNJQyxRQUFRRCxRQUFRLFNBQVIsQ0FEWjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxJQUFJRSxNQUFNSCxTQUFTRSxLQUFULENBQVY7O0FBRUFFLE9BQU9DLE9BQVAsR0FBaUJGLEdBQWpCIiwiZmlsZSI6InppcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlUmVzdCA9IHJlcXVpcmUoJy4vX2Jhc2VSZXN0JyksXG4gICAgdW56aXAgPSByZXF1aXJlKCcuL3VuemlwJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBncm91cGVkIGVsZW1lbnRzLCB0aGUgZmlyc3Qgb2Ygd2hpY2ggY29udGFpbnMgdGhlXG4gKiBmaXJzdCBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gYXJyYXlzLCB0aGUgc2Vjb25kIG9mIHdoaWNoIGNvbnRhaW5zIHRoZVxuICogc2Vjb25kIGVsZW1lbnRzIG9mIHRoZSBnaXZlbiBhcnJheXMsIGFuZCBzbyBvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7Li4uQXJyYXl9IFthcnJheXNdIFRoZSBhcnJheXMgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGdyb3VwZWQgZWxlbWVudHMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uemlwKFsnYScsICdiJ10sIFsxLCAyXSwgW3RydWUsIGZhbHNlXSk7XG4gKiAvLyA9PiBbWydhJywgMSwgdHJ1ZV0sIFsnYicsIDIsIGZhbHNlXV1cbiAqL1xudmFyIHppcCA9IGJhc2VSZXN0KHVuemlwKTtcblxubW9kdWxlLmV4cG9ydHMgPSB6aXA7XG4iXX0=