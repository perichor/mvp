'use strict';

var baseRest = require('./_baseRest'),
    createWrap = require('./_createWrap'),
    getHolder = require('./_getHolder'),
    replaceHolders = require('./_replaceHolders');

/** Used to compose bitmasks for function metadata. */
var WRAP_PARTIAL_RIGHT_FLAG = 64;

/**
 * This method is like `_.partial` except that partially applied arguments
 * are appended to the arguments it receives.
 *
 * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
 * builds, may be used as a placeholder for partially applied arguments.
 *
 * **Note:** This method doesn't set the "length" property of partially
 * applied functions.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Function
 * @param {Function} func The function to partially apply arguments to.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new partially applied function.
 * @example
 *
 * function greet(greeting, name) {
 *   return greeting + ' ' + name;
 * }
 *
 * var greetFred = _.partialRight(greet, 'fred');
 * greetFred('hi');
 * // => 'hi fred'
 *
 * // Partially applied with placeholders.
 * var sayHelloTo = _.partialRight(greet, 'hello', _);
 * sayHelloTo('fred');
 * // => 'hello fred'
 */
var partialRight = baseRest(function (func, partials) {
  var holders = replaceHolders(partials, getHolder(partialRight));
  return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
});

// Assign default placeholders.
partialRight.placeholder = {};

module.exports = partialRight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3BhcnRpYWxSaWdodC5qcyJdLCJuYW1lcyI6WyJiYXNlUmVzdCIsInJlcXVpcmUiLCJjcmVhdGVXcmFwIiwiZ2V0SG9sZGVyIiwicmVwbGFjZUhvbGRlcnMiLCJXUkFQX1BBUlRJQUxfUklHSFRfRkxBRyIsInBhcnRpYWxSaWdodCIsImZ1bmMiLCJwYXJ0aWFscyIsImhvbGRlcnMiLCJ1bmRlZmluZWQiLCJwbGFjZWhvbGRlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsV0FBV0MsUUFBUSxhQUFSLENBQWY7QUFBQSxJQUNJQyxhQUFhRCxRQUFRLGVBQVIsQ0FEakI7QUFBQSxJQUVJRSxZQUFZRixRQUFRLGNBQVIsQ0FGaEI7QUFBQSxJQUdJRyxpQkFBaUJILFFBQVEsbUJBQVIsQ0FIckI7O0FBS0E7QUFDQSxJQUFJSSwwQkFBMEIsRUFBOUI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NBLElBQUlDLGVBQWVOLFNBQVMsVUFBU08sSUFBVCxFQUFlQyxRQUFmLEVBQXlCO0FBQ25ELE1BQUlDLFVBQVVMLGVBQWVJLFFBQWYsRUFBeUJMLFVBQVVHLFlBQVYsQ0FBekIsQ0FBZDtBQUNBLFNBQU9KLFdBQVdLLElBQVgsRUFBaUJGLHVCQUFqQixFQUEwQ0ssU0FBMUMsRUFBcURGLFFBQXJELEVBQStEQyxPQUEvRCxDQUFQO0FBQ0QsQ0FIa0IsQ0FBbkI7O0FBS0E7QUFDQUgsYUFBYUssV0FBYixHQUEyQixFQUEzQjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQlAsWUFBakIiLCJmaWxlIjoicGFydGlhbFJpZ2h0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VSZXN0ID0gcmVxdWlyZSgnLi9fYmFzZVJlc3QnKSxcbiAgICBjcmVhdGVXcmFwID0gcmVxdWlyZSgnLi9fY3JlYXRlV3JhcCcpLFxuICAgIGdldEhvbGRlciA9IHJlcXVpcmUoJy4vX2dldEhvbGRlcicpLFxuICAgIHJlcGxhY2VIb2xkZXJzID0gcmVxdWlyZSgnLi9fcmVwbGFjZUhvbGRlcnMnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgZnVuY3Rpb24gbWV0YWRhdGEuICovXG52YXIgV1JBUF9QQVJUSUFMX1JJR0hUX0ZMQUcgPSA2NDtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnBhcnRpYWxgIGV4Y2VwdCB0aGF0IHBhcnRpYWxseSBhcHBsaWVkIGFyZ3VtZW50c1xuICogYXJlIGFwcGVuZGVkIHRvIHRoZSBhcmd1bWVudHMgaXQgcmVjZWl2ZXMuXG4gKlxuICogVGhlIGBfLnBhcnRpYWxSaWdodC5wbGFjZWhvbGRlcmAgdmFsdWUsIHdoaWNoIGRlZmF1bHRzIHRvIGBfYCBpbiBtb25vbGl0aGljXG4gKiBidWlsZHMsIG1heSBiZSB1c2VkIGFzIGEgcGxhY2Vob2xkZXIgZm9yIHBhcnRpYWxseSBhcHBsaWVkIGFyZ3VtZW50cy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgZG9lc24ndCBzZXQgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgb2YgcGFydGlhbGx5XG4gKiBhcHBsaWVkIGZ1bmN0aW9ucy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDEuMC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHBhcnRpYWxseSBhcHBseSBhcmd1bWVudHMgdG8uXG4gKiBAcGFyYW0gey4uLip9IFtwYXJ0aWFsc10gVGhlIGFyZ3VtZW50cyB0byBiZSBwYXJ0aWFsbHkgYXBwbGllZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHBhcnRpYWxseSBhcHBsaWVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBncmVldChncmVldGluZywgbmFtZSkge1xuICogICByZXR1cm4gZ3JlZXRpbmcgKyAnICcgKyBuYW1lO1xuICogfVxuICpcbiAqIHZhciBncmVldEZyZWQgPSBfLnBhcnRpYWxSaWdodChncmVldCwgJ2ZyZWQnKTtcbiAqIGdyZWV0RnJlZCgnaGknKTtcbiAqIC8vID0+ICdoaSBmcmVkJ1xuICpcbiAqIC8vIFBhcnRpYWxseSBhcHBsaWVkIHdpdGggcGxhY2Vob2xkZXJzLlxuICogdmFyIHNheUhlbGxvVG8gPSBfLnBhcnRpYWxSaWdodChncmVldCwgJ2hlbGxvJywgXyk7XG4gKiBzYXlIZWxsb1RvKCdmcmVkJyk7XG4gKiAvLyA9PiAnaGVsbG8gZnJlZCdcbiAqL1xudmFyIHBhcnRpYWxSaWdodCA9IGJhc2VSZXN0KGZ1bmN0aW9uKGZ1bmMsIHBhcnRpYWxzKSB7XG4gIHZhciBob2xkZXJzID0gcmVwbGFjZUhvbGRlcnMocGFydGlhbHMsIGdldEhvbGRlcihwYXJ0aWFsUmlnaHQpKTtcbiAgcmV0dXJuIGNyZWF0ZVdyYXAoZnVuYywgV1JBUF9QQVJUSUFMX1JJR0hUX0ZMQUcsIHVuZGVmaW5lZCwgcGFydGlhbHMsIGhvbGRlcnMpO1xufSk7XG5cbi8vIEFzc2lnbiBkZWZhdWx0IHBsYWNlaG9sZGVycy5cbnBhcnRpYWxSaWdodC5wbGFjZWhvbGRlciA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnRpYWxSaWdodDtcbiJdfQ==