'use strict';

var baseSet = require('./_baseSet');

/**
 * This method is like `_.set` except that it accepts `customizer` which is
 * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
 * path creation is handled by the method instead. The `customizer` is invoked
 * with three arguments: (nsValue, key, nsObject).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {};
 *
 * _.setWith(object, '[0][1]', 'a', Object);
 * // => { '0': { '1': 'a' } }
 */
function setWith(object, path, value, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return object == null ? object : baseSet(object, path, value, customizer);
}

module.exports = setWith;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NldFdpdGguanMiXSwibmFtZXMiOlsiYmFzZVNldCIsInJlcXVpcmUiLCJzZXRXaXRoIiwib2JqZWN0IiwicGF0aCIsInZhbHVlIiwiY3VzdG9taXplciIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsVUFBVUMsUUFBUSxZQUFSLENBQWQ7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxTQUFTQyxPQUFULENBQWlCQyxNQUFqQixFQUF5QkMsSUFBekIsRUFBK0JDLEtBQS9CLEVBQXNDQyxVQUF0QyxFQUFrRDtBQUNoREEsZUFBYSxPQUFPQSxVQUFQLElBQXFCLFVBQXJCLEdBQWtDQSxVQUFsQyxHQUErQ0MsU0FBNUQ7QUFDQSxTQUFPSixVQUFVLElBQVYsR0FBaUJBLE1BQWpCLEdBQTBCSCxRQUFRRyxNQUFSLEVBQWdCQyxJQUFoQixFQUFzQkMsS0FBdEIsRUFBNkJDLFVBQTdCLENBQWpDO0FBQ0Q7O0FBRURFLE9BQU9DLE9BQVAsR0FBaUJQLE9BQWpCIiwiZmlsZSI6InNldFdpdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZVNldCA9IHJlcXVpcmUoJy4vX2Jhc2VTZXQnKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnNldGAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBgY3VzdG9taXplcmAgd2hpY2ggaXNcbiAqIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgb2JqZWN0cyBvZiBgcGF0aGAuICBJZiBgY3VzdG9taXplcmAgcmV0dXJucyBgdW5kZWZpbmVkYFxuICogcGF0aCBjcmVhdGlvbiBpcyBoYW5kbGVkIGJ5IHRoZSBtZXRob2QgaW5zdGVhZC4gVGhlIGBjdXN0b21pemVyYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRocmVlIGFyZ3VtZW50czogKG5zVmFsdWUsIGtleSwgbnNPYmplY3QpLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHt9O1xuICpcbiAqIF8uc2V0V2l0aChvYmplY3QsICdbMF1bMV0nLCAnYScsIE9iamVjdCk7XG4gKiAvLyA9PiB7ICcwJzogeyAnMSc6ICdhJyB9IH1cbiAqL1xuZnVuY3Rpb24gc2V0V2l0aChvYmplY3QsIHBhdGgsIHZhbHVlLCBjdXN0b21pemVyKSB7XG4gIGN1c3RvbWl6ZXIgPSB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nID8gY3VzdG9taXplciA6IHVuZGVmaW5lZDtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gb2JqZWN0IDogYmFzZVNldChvYmplY3QsIHBhdGgsIHZhbHVlLCBjdXN0b21pemVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRXaXRoO1xuIl19