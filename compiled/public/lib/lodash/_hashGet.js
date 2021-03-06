'use strict';

var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19oYXNoR2V0LmpzIl0sIm5hbWVzIjpbIm5hdGl2ZUNyZWF0ZSIsInJlcXVpcmUiLCJIQVNIX1VOREVGSU5FRCIsIm9iamVjdFByb3RvIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJoYXNoR2V0Iiwia2V5IiwiZGF0YSIsIl9fZGF0YV9fIiwicmVzdWx0IiwidW5kZWZpbmVkIiwiY2FsbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZUFBZUMsUUFBUSxpQkFBUixDQUFuQjs7QUFFQTtBQUNBLElBQUlDLGlCQUFpQiwyQkFBckI7O0FBRUE7QUFDQSxJQUFJQyxjQUFjQyxPQUFPQyxTQUF6Qjs7QUFFQTtBQUNBLElBQUlDLGlCQUFpQkgsWUFBWUcsY0FBakM7O0FBRUE7Ozs7Ozs7OztBQVNBLFNBQVNDLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCO0FBQ3BCLE1BQUlDLE9BQU8sS0FBS0MsUUFBaEI7QUFDQSxNQUFJVixZQUFKLEVBQWtCO0FBQ2hCLFFBQUlXLFNBQVNGLEtBQUtELEdBQUwsQ0FBYjtBQUNBLFdBQU9HLFdBQVdULGNBQVgsR0FBNEJVLFNBQTVCLEdBQXdDRCxNQUEvQztBQUNEO0FBQ0QsU0FBT0wsZUFBZU8sSUFBZixDQUFvQkosSUFBcEIsRUFBMEJELEdBQTFCLElBQWlDQyxLQUFLRCxHQUFMLENBQWpDLEdBQTZDSSxTQUFwRDtBQUNEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCUixPQUFqQiIsImZpbGUiOiJfaGFzaEdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hHZXQ7XG4iXX0=