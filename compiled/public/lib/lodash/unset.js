'use strict';

var baseUnset = require('./_baseUnset');

/**
 * Removes the property at `path` of `object`.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 7 } }] };
 * _.unset(object, 'a[0].b.c');
 * // => true
 *
 * console.log(object);
 * // => { 'a': [{ 'b': {} }] };
 *
 * _.unset(object, ['a', '0', 'b', 'c']);
 * // => true
 *
 * console.log(object);
 * // => { 'a': [{ 'b': {} }] };
 */
function unset(object, path) {
  return object == null ? true : baseUnset(object, path);
}

module.exports = unset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3Vuc2V0LmpzIl0sIm5hbWVzIjpbImJhc2VVbnNldCIsInJlcXVpcmUiLCJ1bnNldCIsIm9iamVjdCIsInBhdGgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVlDLFFBQVEsY0FBUixDQUFoQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBLFNBQVNDLEtBQVQsQ0FBZUMsTUFBZixFQUF1QkMsSUFBdkIsRUFBNkI7QUFDM0IsU0FBT0QsVUFBVSxJQUFWLEdBQWlCLElBQWpCLEdBQXdCSCxVQUFVRyxNQUFWLEVBQWtCQyxJQUFsQixDQUEvQjtBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCSixLQUFqQiIsImZpbGUiOiJ1bnNldC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlVW5zZXQgPSByZXF1aXJlKCcuL19iYXNlVW5zZXQnKTtcblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBwcm9wZXJ0eSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byB1bnNldC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgcHJvcGVydHkgaXMgZGVsZXRlZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IFt7ICdiJzogeyAnYyc6IDcgfSB9XSB9O1xuICogXy51bnNldChvYmplY3QsICdhWzBdLmIuYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdCk7XG4gKiAvLyA9PiB7ICdhJzogW3sgJ2InOiB7fSB9XSB9O1xuICpcbiAqIF8udW5zZXQob2JqZWN0LCBbJ2EnLCAnMCcsICdiJywgJ2MnXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0KTtcbiAqIC8vID0+IHsgJ2EnOiBbeyAnYic6IHt9IH1dIH07XG4gKi9cbmZ1bmN0aW9uIHVuc2V0KG9iamVjdCwgcGF0aCkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB0cnVlIDogYmFzZVVuc2V0KG9iamVjdCwgcGF0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdW5zZXQ7XG4iXX0=