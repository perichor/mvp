'use strict';

var castFunction = require('./_castFunction'),
    partial = require('./partial');

/**
 * Creates a function that provides `value` to `wrapper` as its first
 * argument. Any additional arguments provided to the function are appended
 * to those provided to the `wrapper`. The wrapper is invoked with the `this`
 * binding of the created function.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {*} value The value to wrap.
 * @param {Function} [wrapper=identity] The wrapper function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var p = _.wrap(_.escape, function(func, text) {
 *   return '<p>' + func(text) + '</p>';
 * });
 *
 * p('fred, barney, & pebbles');
 * // => '<p>fred, barney, &amp; pebbles</p>'
 */
function wrap(value, wrapper) {
  return partial(castFunction(wrapper), value);
}

module.exports = wrap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3dyYXAuanMiXSwibmFtZXMiOlsiY2FzdEZ1bmN0aW9uIiwicmVxdWlyZSIsInBhcnRpYWwiLCJ3cmFwIiwidmFsdWUiLCJ3cmFwcGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5CO0FBQUEsSUFDSUMsVUFBVUQsUUFBUSxXQUFSLENBRGQ7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsU0FBU0UsSUFBVCxDQUFjQyxLQUFkLEVBQXFCQyxPQUFyQixFQUE4QjtBQUM1QixTQUFPSCxRQUFRRixhQUFhSyxPQUFiLENBQVIsRUFBK0JELEtBQS9CLENBQVA7QUFDRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQkosSUFBakIiLCJmaWxlIjoid3JhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjYXN0RnVuY3Rpb24gPSByZXF1aXJlKCcuL19jYXN0RnVuY3Rpb24nKSxcbiAgICBwYXJ0aWFsID0gcmVxdWlyZSgnLi9wYXJ0aWFsJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcHJvdmlkZXMgYHZhbHVlYCB0byBgd3JhcHBlcmAgYXMgaXRzIGZpcnN0XG4gKiBhcmd1bWVudC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBmdW5jdGlvbiBhcmUgYXBwZW5kZWRcbiAqIHRvIHRob3NlIHByb3ZpZGVkIHRvIHRoZSBgd3JhcHBlcmAuIFRoZSB3cmFwcGVyIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgXG4gKiBiaW5kaW5nIG9mIHRoZSBjcmVhdGVkIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt3cmFwcGVyPWlkZW50aXR5XSBUaGUgd3JhcHBlciBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgcCA9IF8ud3JhcChfLmVzY2FwZSwgZnVuY3Rpb24oZnVuYywgdGV4dCkge1xuICogICByZXR1cm4gJzxwPicgKyBmdW5jKHRleHQpICsgJzwvcD4nO1xuICogfSk7XG4gKlxuICogcCgnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnKTtcbiAqIC8vID0+ICc8cD5mcmVkLCBiYXJuZXksICZhbXA7IHBlYmJsZXM8L3A+J1xuICovXG5mdW5jdGlvbiB3cmFwKHZhbHVlLCB3cmFwcGVyKSB7XG4gIHJldHVybiBwYXJ0aWFsKGNhc3RGdW5jdGlvbih3cmFwcGVyKSwgdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXA7XG4iXX0=