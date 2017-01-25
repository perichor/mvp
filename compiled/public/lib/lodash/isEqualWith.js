'use strict';

var baseIsEqual = require('./_baseIsEqual');

/**
 * This method is like `_.isEqual` except that it accepts `customizer` which
 * is invoked to compare values. If `customizer` returns `undefined`, comparisons
 * are handled by the method instead. The `customizer` is invoked with up to
 * six arguments: (objValue, othValue [, index|key, object, other, stack]).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value);
 * }
 *
 * function customizer(objValue, othValue) {
 *   if (isGreeting(objValue) && isGreeting(othValue)) {
 *     return true;
 *   }
 * }
 *
 * var array = ['hello', 'goodbye'];
 * var other = ['hi', 'goodbye'];
 *
 * _.isEqualWith(array, other, customizer);
 * // => true
 */
function isEqualWith(value, other, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  var result = customizer ? customizer(value, other) : undefined;
  return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
}

module.exports = isEqualWith;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2lzRXF1YWxXaXRoLmpzIl0sIm5hbWVzIjpbImJhc2VJc0VxdWFsIiwicmVxdWlyZSIsImlzRXF1YWxXaXRoIiwidmFsdWUiLCJvdGhlciIsImN1c3RvbWl6ZXIiLCJ1bmRlZmluZWQiLCJyZXN1bHQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGNBQWNDLFFBQVEsZ0JBQVIsQ0FBbEI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NBLFNBQVNDLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCQyxLQUE1QixFQUFtQ0MsVUFBbkMsRUFBK0M7QUFDN0NBLGVBQWEsT0FBT0EsVUFBUCxJQUFxQixVQUFyQixHQUFrQ0EsVUFBbEMsR0FBK0NDLFNBQTVEO0FBQ0EsTUFBSUMsU0FBU0YsYUFBYUEsV0FBV0YsS0FBWCxFQUFrQkMsS0FBbEIsQ0FBYixHQUF3Q0UsU0FBckQ7QUFDQSxTQUFPQyxXQUFXRCxTQUFYLEdBQXVCTixZQUFZRyxLQUFaLEVBQW1CQyxLQUFuQixFQUEwQkUsU0FBMUIsRUFBcUNELFVBQXJDLENBQXZCLEdBQTBFLENBQUMsQ0FBQ0UsTUFBbkY7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQlAsV0FBakIiLCJmaWxlIjoiaXNFcXVhbFdpdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCcuL19iYXNlSXNFcXVhbCcpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNFcXVhbGAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBgY3VzdG9taXplcmAgd2hpY2hcbiAqIGlzIGludm9rZWQgdG8gY29tcGFyZSB2YWx1ZXMuIElmIGBjdXN0b21pemVyYCByZXR1cm5zIGB1bmRlZmluZWRgLCBjb21wYXJpc29uc1xuICogYXJlIGhhbmRsZWQgYnkgdGhlIG1ldGhvZCBpbnN0ZWFkLiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGludm9rZWQgd2l0aCB1cCB0b1xuICogc2l4IGFyZ3VtZW50czogKG9ialZhbHVlLCBvdGhWYWx1ZSBbLCBpbmRleHxrZXksIG9iamVjdCwgb3RoZXIsIHN0YWNrXSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBpc0dyZWV0aW5nKHZhbHVlKSB7XG4gKiAgIHJldHVybiAvXmgoPzppfGVsbG8pJC8udGVzdCh2YWx1ZSk7XG4gKiB9XG4gKlxuICogZnVuY3Rpb24gY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUpIHtcbiAqICAgaWYgKGlzR3JlZXRpbmcob2JqVmFsdWUpICYmIGlzR3JlZXRpbmcob3RoVmFsdWUpKSB7XG4gKiAgICAgcmV0dXJuIHRydWU7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiB2YXIgYXJyYXkgPSBbJ2hlbGxvJywgJ2dvb2RieWUnXTtcbiAqIHZhciBvdGhlciA9IFsnaGknLCAnZ29vZGJ5ZSddO1xuICpcbiAqIF8uaXNFcXVhbFdpdGgoYXJyYXksIG90aGVyLCBjdXN0b21pemVyKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNFcXVhbFdpdGgodmFsdWUsIG90aGVyLCBjdXN0b21pemVyKSB7XG4gIGN1c3RvbWl6ZXIgPSB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nID8gY3VzdG9taXplciA6IHVuZGVmaW5lZDtcbiAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBvdGhlcikgOiB1bmRlZmluZWQ7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgdW5kZWZpbmVkLCBjdXN0b21pemVyKSA6ICEhcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRXF1YWxXaXRoO1xuIl19