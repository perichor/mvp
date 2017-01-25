'use strict';

var createMathOperation = require('./_createMathOperation');

/**
 * Adds two numbers.
 *
 * @static
 * @memberOf _
 * @since 3.4.0
 * @category Math
 * @param {number} augend The first number in an addition.
 * @param {number} addend The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * _.add(6, 4);
 * // => 10
 */
var add = createMathOperation(function (augend, addend) {
  return augend + addend;
}, 0);

module.exports = add;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2FkZC5qcyJdLCJuYW1lcyI6WyJjcmVhdGVNYXRoT3BlcmF0aW9uIiwicmVxdWlyZSIsImFkZCIsImF1Z2VuZCIsImFkZGVuZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsc0JBQXNCQyxRQUFRLHdCQUFSLENBQTFCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUFlQSxJQUFJQyxNQUFNRixvQkFBb0IsVUFBU0csTUFBVCxFQUFpQkMsTUFBakIsRUFBeUI7QUFDckQsU0FBT0QsU0FBU0MsTUFBaEI7QUFDRCxDQUZTLEVBRVAsQ0FGTyxDQUFWOztBQUlBQyxPQUFPQyxPQUFQLEdBQWlCSixHQUFqQiIsImZpbGUiOiJhZGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY3JlYXRlTWF0aE9wZXJhdGlvbiA9IHJlcXVpcmUoJy4vX2NyZWF0ZU1hdGhPcGVyYXRpb24nKTtcblxuLyoqXG4gKiBBZGRzIHR3byBudW1iZXJzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy40LjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAcGFyYW0ge251bWJlcn0gYXVnZW5kIFRoZSBmaXJzdCBudW1iZXIgaW4gYW4gYWRkaXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gYWRkZW5kIFRoZSBzZWNvbmQgbnVtYmVyIGluIGFuIGFkZGl0aW9uLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdG90YWwuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uYWRkKDYsIDQpO1xuICogLy8gPT4gMTBcbiAqL1xudmFyIGFkZCA9IGNyZWF0ZU1hdGhPcGVyYXRpb24oZnVuY3Rpb24oYXVnZW5kLCBhZGRlbmQpIHtcbiAgcmV0dXJuIGF1Z2VuZCArIGFkZGVuZDtcbn0sIDApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZDtcbiJdfQ==