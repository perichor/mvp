'use strict';

var baseRandom = require('./_baseRandom');

/**
 * A specialized version of `_.sample` for arrays.
 *
 * @private
 * @param {Array} array The array to sample.
 * @returns {*} Returns the random element.
 */
function arraySample(array) {
  var length = array.length;
  return length ? array[baseRandom(0, length - 1)] : undefined;
}

module.exports = arraySample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19hcnJheVNhbXBsZS5qcyJdLCJuYW1lcyI6WyJiYXNlUmFuZG9tIiwicmVxdWlyZSIsImFycmF5U2FtcGxlIiwiYXJyYXkiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGFBQWFDLFFBQVEsZUFBUixDQUFqQjs7QUFFQTs7Ozs7OztBQU9BLFNBQVNDLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQzFCLE1BQUlDLFNBQVNELE1BQU1DLE1BQW5CO0FBQ0EsU0FBT0EsU0FBU0QsTUFBTUgsV0FBVyxDQUFYLEVBQWNJLFNBQVMsQ0FBdkIsQ0FBTixDQUFULEdBQTRDQyxTQUFuRDtBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCTCxXQUFqQiIsImZpbGUiOiJfYXJyYXlTYW1wbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZVJhbmRvbSA9IHJlcXVpcmUoJy4vX2Jhc2VSYW5kb20nKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc2FtcGxlYCBmb3IgYXJyYXlzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2FtcGxlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJhbmRvbSBlbGVtZW50LlxuICovXG5mdW5jdGlvbiBhcnJheVNhbXBsZShhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICByZXR1cm4gbGVuZ3RoID8gYXJyYXlbYmFzZVJhbmRvbSgwLCBsZW5ndGggLSAxKV0gOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlTYW1wbGU7XG4iXX0=