'use strict';

var arraySome = require('./_arraySome'),
    createOver = require('./_createOver');

/**
 * Creates a function that checks if **any** of the `predicates` return
 * truthy when invoked with the arguments it receives.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {...(Function|Function[])} [predicates=[_.identity]]
 *  The predicates to check.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var func = _.overSome([Boolean, isFinite]);
 *
 * func('1');
 * // => true
 *
 * func(null);
 * // => true
 *
 * func(NaN);
 * // => false
 */
var overSome = createOver(arraySome);

module.exports = overSome;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL292ZXJTb21lLmpzIl0sIm5hbWVzIjpbImFycmF5U29tZSIsInJlcXVpcmUiLCJjcmVhdGVPdmVyIiwib3ZlclNvbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVlDLFFBQVEsY0FBUixDQUFoQjtBQUFBLElBQ0lDLGFBQWFELFFBQVEsZUFBUixDQURqQjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLElBQUlFLFdBQVdELFdBQVdGLFNBQVgsQ0FBZjs7QUFFQUksT0FBT0MsT0FBUCxHQUFpQkYsUUFBakIiLCJmaWxlIjoib3ZlclNvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXJyYXlTb21lID0gcmVxdWlyZSgnLi9fYXJyYXlTb21lJyksXG4gICAgY3JlYXRlT3ZlciA9IHJlcXVpcmUoJy4vX2NyZWF0ZU92ZXInKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgKiphbnkqKiBvZiB0aGUgYHByZWRpY2F0ZXNgIHJldHVyblxuICogdHJ1dGh5IHdoZW4gaW52b2tlZCB3aXRoIHRoZSBhcmd1bWVudHMgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Li4uKEZ1bmN0aW9ufEZ1bmN0aW9uW10pfSBbcHJlZGljYXRlcz1bXy5pZGVudGl0eV1dXG4gKiAgVGhlIHByZWRpY2F0ZXMgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGZ1bmMgPSBfLm92ZXJTb21lKFtCb29sZWFuLCBpc0Zpbml0ZV0pO1xuICpcbiAqIGZ1bmMoJzEnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBmdW5jKG51bGwpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIGZ1bmMoTmFOKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBvdmVyU29tZSA9IGNyZWF0ZU92ZXIoYXJyYXlTb21lKTtcblxubW9kdWxlLmV4cG9ydHMgPSBvdmVyU29tZTtcbiJdfQ==