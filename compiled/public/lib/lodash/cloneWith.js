'use strict';

var baseClone = require('./_baseClone');

/** Used to compose bitmasks for cloning. */
var CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it accepts `customizer` which
 * is invoked to produce the cloned value. If `customizer` returns `undefined`,
 * cloning is handled by the method instead. The `customizer` is invoked with
 * up to four arguments; (value [, index|key, object, stack]).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to clone.
 * @param {Function} [customizer] The function to customize cloning.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeepWith
 * @example
 *
 * function customizer(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(false);
 *   }
 * }
 *
 * var el = _.cloneWith(document.body, customizer);
 *
 * console.log(el === document.body);
 * // => false
 * console.log(el.nodeName);
 * // => 'BODY'
 * console.log(el.childNodes.length);
 * // => 0
 */
function cloneWith(value, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
}

module.exports = cloneWith;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2Nsb25lV2l0aC5qcyJdLCJuYW1lcyI6WyJiYXNlQ2xvbmUiLCJyZXF1aXJlIiwiQ0xPTkVfU1lNQk9MU19GTEFHIiwiY2xvbmVXaXRoIiwidmFsdWUiLCJjdXN0b21pemVyIiwidW5kZWZpbmVkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxZQUFZQyxRQUFRLGNBQVIsQ0FBaEI7O0FBRUE7QUFDQSxJQUFJQyxxQkFBcUIsQ0FBekI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQkEsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEJDLFVBQTFCLEVBQXNDO0FBQ3BDQSxlQUFhLE9BQU9BLFVBQVAsSUFBcUIsVUFBckIsR0FBa0NBLFVBQWxDLEdBQStDQyxTQUE1RDtBQUNBLFNBQU9OLFVBQVVJLEtBQVYsRUFBaUJGLGtCQUFqQixFQUFxQ0csVUFBckMsQ0FBUDtBQUNEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCTCxTQUFqQiIsImZpbGUiOiJjbG9uZVdpdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUNsb25lID0gcmVxdWlyZSgnLi9fYmFzZUNsb25lJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNsb25pbmcuICovXG52YXIgQ0xPTkVfU1lNQk9MU19GTEFHID0gNDtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmNsb25lYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGBjdXN0b21pemVyYCB3aGljaFxuICogaXMgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBjbG9uZWQgdmFsdWUuIElmIGBjdXN0b21pemVyYCByZXR1cm5zIGB1bmRlZmluZWRgLFxuICogY2xvbmluZyBpcyBoYW5kbGVkIGJ5IHRoZSBtZXRob2QgaW5zdGVhZC4gVGhlIGBjdXN0b21pemVyYCBpcyBpbnZva2VkIHdpdGhcbiAqIHVwIHRvIGZvdXIgYXJndW1lbnRzOyAodmFsdWUgWywgaW5kZXh8a2V5LCBvYmplY3QsIHN0YWNrXSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY2xvbmluZy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBjbG9uZWQgdmFsdWUuXG4gKiBAc2VlIF8uY2xvbmVEZWVwV2l0aFxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBjdXN0b21pemVyKHZhbHVlKSB7XG4gKiAgIGlmIChfLmlzRWxlbWVudCh2YWx1ZSkpIHtcbiAqICAgICByZXR1cm4gdmFsdWUuY2xvbmVOb2RlKGZhbHNlKTtcbiAqICAgfVxuICogfVxuICpcbiAqIHZhciBlbCA9IF8uY2xvbmVXaXRoKGRvY3VtZW50LmJvZHksIGN1c3RvbWl6ZXIpO1xuICpcbiAqIGNvbnNvbGUubG9nKGVsID09PSBkb2N1bWVudC5ib2R5KTtcbiAqIC8vID0+IGZhbHNlXG4gKiBjb25zb2xlLmxvZyhlbC5ub2RlTmFtZSk7XG4gKiAvLyA9PiAnQk9EWSdcbiAqIGNvbnNvbGUubG9nKGVsLmNoaWxkTm9kZXMubGVuZ3RoKTtcbiAqIC8vID0+IDBcbiAqL1xuZnVuY3Rpb24gY2xvbmVXaXRoKHZhbHVlLCBjdXN0b21pemVyKSB7XG4gIGN1c3RvbWl6ZXIgPSB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nID8gY3VzdG9taXplciA6IHVuZGVmaW5lZDtcbiAgcmV0dXJuIGJhc2VDbG9uZSh2YWx1ZSwgQ0xPTkVfU1lNQk9MU19GTEFHLCBjdXN0b21pemVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZVdpdGg7XG4iXX0=