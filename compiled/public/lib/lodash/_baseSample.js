'use strict';

var arraySample = require('./_arraySample'),
    values = require('./values');

/**
 * The base implementation of `_.sample`.
 *
 * @private
 * @param {Array|Object} collection The collection to sample.
 * @returns {*} Returns the random element.
 */
function baseSample(collection) {
  return arraySample(values(collection));
}

module.exports = baseSample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlU2FtcGxlLmpzIl0sIm5hbWVzIjpbImFycmF5U2FtcGxlIiwicmVxdWlyZSIsInZhbHVlcyIsImJhc2VTYW1wbGUiLCJjb2xsZWN0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxjQUFjQyxRQUFRLGdCQUFSLENBQWxCO0FBQUEsSUFDSUMsU0FBU0QsUUFBUSxVQUFSLENBRGI7O0FBR0E7Ozs7Ozs7QUFPQSxTQUFTRSxVQUFULENBQW9CQyxVQUFwQixFQUFnQztBQUM5QixTQUFPSixZQUFZRSxPQUFPRSxVQUFQLENBQVosQ0FBUDtBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCSCxVQUFqQiIsImZpbGUiOiJfYmFzZVNhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcnJheVNhbXBsZSA9IHJlcXVpcmUoJy4vX2FycmF5U2FtcGxlJyksXG4gICAgdmFsdWVzID0gcmVxdWlyZSgnLi92YWx1ZXMnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zYW1wbGVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBzYW1wbGUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmFuZG9tIGVsZW1lbnQuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTYW1wbGUoY29sbGVjdGlvbikge1xuICByZXR1cm4gYXJyYXlTYW1wbGUodmFsdWVzKGNvbGxlY3Rpb24pKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU2FtcGxlO1xuIl19