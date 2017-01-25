'use strict';

var baseAt = require('./_baseAt'),
    flatRest = require('./_flatRest');

/**
 * Creates an array of values corresponding to `paths` of `object`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Array} Returns the picked values.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
 *
 * _.at(object, ['a[0].b.c', 'a[1]']);
 * // => [3, 4]
 */
var at = flatRest(baseAt);

module.exports = at;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2F0LmpzIl0sIm5hbWVzIjpbImJhc2VBdCIsInJlcXVpcmUiLCJmbGF0UmVzdCIsImF0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxTQUFTQyxRQUFRLFdBQVIsQ0FBYjtBQUFBLElBQ0lDLFdBQVdELFFBQVEsYUFBUixDQURmOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxJQUFJRSxLQUFLRCxTQUFTRixNQUFULENBQVQ7O0FBRUFJLE9BQU9DLE9BQVAsR0FBaUJGLEVBQWpCIiwiZmlsZSI6ImF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VBdCA9IHJlcXVpcmUoJy4vX2Jhc2VBdCcpLFxuICAgIGZsYXRSZXN0ID0gcmVxdWlyZSgnLi9fZmxhdFJlc3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHZhbHVlcyBjb3JyZXNwb25kaW5nIHRvIGBwYXRoc2Agb2YgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAxLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7Li4uKHN0cmluZ3xzdHJpbmdbXSl9IFtwYXRoc10gVGhlIHByb3BlcnR5IHBhdGhzIHRvIHBpY2suXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHBpY2tlZCB2YWx1ZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH0sIDRdIH07XG4gKlxuICogXy5hdChvYmplY3QsIFsnYVswXS5iLmMnLCAnYVsxXSddKTtcbiAqIC8vID0+IFszLCA0XVxuICovXG52YXIgYXQgPSBmbGF0UmVzdChiYXNlQXQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF0O1xuIl19