'use strict';

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0;
 * }
 *
 * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
 * // => [1, 3, 5]
 */
function negate(predicate) {
  if (typeof predicate != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function () {
    var args = arguments;
    switch (args.length) {
      case 0:
        return !predicate.call(this);
      case 1:
        return !predicate.call(this, args[0]);
      case 2:
        return !predicate.call(this, args[0], args[1]);
      case 3:
        return !predicate.call(this, args[0], args[1], args[2]);
    }
    return !predicate.apply(this, args);
  };
}

module.exports = negate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL25lZ2F0ZS5qcyJdLCJuYW1lcyI6WyJGVU5DX0VSUk9SX1RFWFQiLCJuZWdhdGUiLCJwcmVkaWNhdGUiLCJUeXBlRXJyb3IiLCJhcmdzIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiY2FsbCIsImFwcGx5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQUlBLGtCQUFrQixxQkFBdEI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLFNBQVNDLE1BQVQsQ0FBZ0JDLFNBQWhCLEVBQTJCO0FBQ3pCLE1BQUksT0FBT0EsU0FBUCxJQUFvQixVQUF4QixFQUFvQztBQUNsQyxVQUFNLElBQUlDLFNBQUosQ0FBY0gsZUFBZCxDQUFOO0FBQ0Q7QUFDRCxTQUFPLFlBQVc7QUFDaEIsUUFBSUksT0FBT0MsU0FBWDtBQUNBLFlBQVFELEtBQUtFLE1BQWI7QUFDRSxXQUFLLENBQUw7QUFBUSxlQUFPLENBQUNKLFVBQVVLLElBQVYsQ0FBZSxJQUFmLENBQVI7QUFDUixXQUFLLENBQUw7QUFBUSxlQUFPLENBQUNMLFVBQVVLLElBQVYsQ0FBZSxJQUFmLEVBQXFCSCxLQUFLLENBQUwsQ0FBckIsQ0FBUjtBQUNSLFdBQUssQ0FBTDtBQUFRLGVBQU8sQ0FBQ0YsVUFBVUssSUFBVixDQUFlLElBQWYsRUFBcUJILEtBQUssQ0FBTCxDQUFyQixFQUE4QkEsS0FBSyxDQUFMLENBQTlCLENBQVI7QUFDUixXQUFLLENBQUw7QUFBUSxlQUFPLENBQUNGLFVBQVVLLElBQVYsQ0FBZSxJQUFmLEVBQXFCSCxLQUFLLENBQUwsQ0FBckIsRUFBOEJBLEtBQUssQ0FBTCxDQUE5QixFQUF1Q0EsS0FBSyxDQUFMLENBQXZDLENBQVI7QUFKVjtBQU1BLFdBQU8sQ0FBQ0YsVUFBVU0sS0FBVixDQUFnQixJQUFoQixFQUFzQkosSUFBdEIsQ0FBUjtBQUNELEdBVEQ7QUFVRDs7QUFFREssT0FBT0MsT0FBUCxHQUFpQlQsTUFBakIiLCJmaWxlIjoibmVnYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBuZWdhdGVzIHRoZSByZXN1bHQgb2YgdGhlIHByZWRpY2F0ZSBgZnVuY2AuIFRoZVxuICogYGZ1bmNgIHByZWRpY2F0ZSBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIGFuZCBhcmd1bWVudHMgb2YgdGhlXG4gKiBjcmVhdGVkIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBwcmVkaWNhdGUgdG8gbmVnYXRlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbmVnYXRlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gaXNFdmVuKG4pIHtcbiAqICAgcmV0dXJuIG4gJSAyID09IDA7XG4gKiB9XG4gKlxuICogXy5maWx0ZXIoWzEsIDIsIDMsIDQsIDUsIDZdLCBfLm5lZ2F0ZShpc0V2ZW4pKTtcbiAqIC8vID0+IFsxLCAzLCA1XVxuICovXG5mdW5jdGlvbiBuZWdhdGUocHJlZGljYXRlKSB7XG4gIGlmICh0eXBlb2YgcHJlZGljYXRlICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDogcmV0dXJuICFwcmVkaWNhdGUuY2FsbCh0aGlzKTtcbiAgICAgIGNhc2UgMTogcmV0dXJuICFwcmVkaWNhdGUuY2FsbCh0aGlzLCBhcmdzWzBdKTtcbiAgICAgIGNhc2UgMjogcmV0dXJuICFwcmVkaWNhdGUuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgIGNhc2UgMzogcmV0dXJuICFwcmVkaWNhdGUuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICB9XG4gICAgcmV0dXJuICFwcmVkaWNhdGUuYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmVnYXRlO1xuIl19