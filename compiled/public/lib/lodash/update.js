'use strict';

var baseUpdate = require('./_baseUpdate'),
    castFunction = require('./_castFunction');

/**
 * This method is like `_.set` except that accepts `updater` to produce the
 * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
 * is invoked with one argument: (value).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.6.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {Function} updater The function to produce the updated value.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.update(object, 'a[0].b.c', function(n) { return n * n; });
 * console.log(object.a[0].b.c);
 * // => 9
 *
 * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
 * console.log(object.x[0].y.z);
 * // => 0
 */
function update(object, path, updater) {
  return object == null ? object : baseUpdate(object, path, castFunction(updater));
}

module.exports = update;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3VwZGF0ZS5qcyJdLCJuYW1lcyI6WyJiYXNlVXBkYXRlIiwicmVxdWlyZSIsImNhc3RGdW5jdGlvbiIsInVwZGF0ZSIsIm9iamVjdCIsInBhdGgiLCJ1cGRhdGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxhQUFhQyxRQUFRLGVBQVIsQ0FBakI7QUFBQSxJQUNJQyxlQUFlRCxRQUFRLGlCQUFSLENBRG5COztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsU0FBU0UsTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0JDLElBQXhCLEVBQThCQyxPQUE5QixFQUF1QztBQUNyQyxTQUFPRixVQUFVLElBQVYsR0FBaUJBLE1BQWpCLEdBQTBCSixXQUFXSSxNQUFYLEVBQW1CQyxJQUFuQixFQUF5QkgsYUFBYUksT0FBYixDQUF6QixDQUFqQztBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCTCxNQUFqQiIsImZpbGUiOiJ1cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZVVwZGF0ZSA9IHJlcXVpcmUoJy4vX2Jhc2VVcGRhdGUnKSxcbiAgICBjYXN0RnVuY3Rpb24gPSByZXF1aXJlKCcuL19jYXN0RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnNldGAgZXhjZXB0IHRoYXQgYWNjZXB0cyBgdXBkYXRlcmAgdG8gcHJvZHVjZSB0aGVcbiAqIHZhbHVlIHRvIHNldC4gVXNlIGBfLnVwZGF0ZVdpdGhgIHRvIGN1c3RvbWl6ZSBgcGF0aGAgY3JlYXRpb24uIFRoZSBgdXBkYXRlcmBcbiAqIGlzIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6ICh2YWx1ZSkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjYuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBzZXQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB1cGRhdGVyIFRoZSBmdW5jdGlvbiB0byBwcm9kdWNlIHRoZSB1cGRhdGVkIHZhbHVlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAqXG4gKiBfLnVwZGF0ZShvYmplY3QsICdhWzBdLmIuYycsIGZ1bmN0aW9uKG4pIHsgcmV0dXJuIG4gKiBuOyB9KTtcbiAqIGNvbnNvbGUubG9nKG9iamVjdC5hWzBdLmIuYyk7XG4gKiAvLyA9PiA5XG4gKlxuICogXy51cGRhdGUob2JqZWN0LCAneFswXS55LnonLCBmdW5jdGlvbihuKSB7IHJldHVybiBuID8gbiArIDEgOiAwOyB9KTtcbiAqIGNvbnNvbGUubG9nKG9iamVjdC54WzBdLnkueik7XG4gKiAvLyA9PiAwXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZShvYmplY3QsIHBhdGgsIHVwZGF0ZXIpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gb2JqZWN0IDogYmFzZVVwZGF0ZShvYmplY3QsIHBhdGgsIGNhc3RGdW5jdGlvbih1cGRhdGVyKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXBkYXRlO1xuIl19