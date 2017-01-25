'use strict';

var createFlow = require('./_createFlow');

/**
 * This method is like `_.flow` except that it creates a function that
 * invokes the given functions from right to left.
 *
 * @static
 * @since 3.0.0
 * @memberOf _
 * @category Util
 * @param {...(Function|Function[])} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see _.flow
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var addSquare = _.flowRight([square, _.add]);
 * addSquare(1, 2);
 * // => 9
 */
var flowRight = createFlow(true);

module.exports = flowRight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2Zsb3dSaWdodC5qcyJdLCJuYW1lcyI6WyJjcmVhdGVGbG93IiwicmVxdWlyZSIsImZsb3dSaWdodCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsYUFBYUMsUUFBUSxlQUFSLENBQWpCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsSUFBSUMsWUFBWUYsV0FBVyxJQUFYLENBQWhCOztBQUVBRyxPQUFPQyxPQUFQLEdBQWlCRixTQUFqQiIsImZpbGUiOiJmbG93UmlnaHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY3JlYXRlRmxvdyA9IHJlcXVpcmUoJy4vX2NyZWF0ZUZsb3cnKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmZsb3dgIGV4Y2VwdCB0aGF0IGl0IGNyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0XG4gKiBpbnZva2VzIHRoZSBnaXZlbiBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAzLjAuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0gey4uLihGdW5jdGlvbnxGdW5jdGlvbltdKX0gW2Z1bmNzXSBUaGUgZnVuY3Rpb25zIHRvIGludm9rZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbXBvc2l0ZSBmdW5jdGlvbi5cbiAqIEBzZWUgXy5mbG93XG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIHNxdWFyZShuKSB7XG4gKiAgIHJldHVybiBuICogbjtcbiAqIH1cbiAqXG4gKiB2YXIgYWRkU3F1YXJlID0gXy5mbG93UmlnaHQoW3NxdWFyZSwgXy5hZGRdKTtcbiAqIGFkZFNxdWFyZSgxLCAyKTtcbiAqIC8vID0+IDlcbiAqL1xudmFyIGZsb3dSaWdodCA9IGNyZWF0ZUZsb3codHJ1ZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZmxvd1JpZ2h0O1xuIl19