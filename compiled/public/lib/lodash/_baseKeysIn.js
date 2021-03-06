'use strict';

var isObject = require('./isObject'),
    isPrototype = require('./_isPrototype'),
    nativeKeysIn = require('./_nativeKeysIn');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlS2V5c0luLmpzIl0sIm5hbWVzIjpbImlzT2JqZWN0IiwicmVxdWlyZSIsImlzUHJvdG90eXBlIiwibmF0aXZlS2V5c0luIiwib2JqZWN0UHJvdG8iLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImJhc2VLZXlzSW4iLCJvYmplY3QiLCJpc1Byb3RvIiwicmVzdWx0Iiwia2V5IiwiY2FsbCIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsWUFBUixDQUFmO0FBQUEsSUFDSUMsY0FBY0QsUUFBUSxnQkFBUixDQURsQjtBQUFBLElBRUlFLGVBQWVGLFFBQVEsaUJBQVIsQ0FGbkI7O0FBSUE7QUFDQSxJQUFJRyxjQUFjQyxPQUFPQyxTQUF6Qjs7QUFFQTtBQUNBLElBQUlDLGlCQUFpQkgsWUFBWUcsY0FBakM7O0FBRUE7Ozs7Ozs7QUFPQSxTQUFTQyxVQUFULENBQW9CQyxNQUFwQixFQUE0QjtBQUMxQixNQUFJLENBQUNULFNBQVNTLE1BQVQsQ0FBTCxFQUF1QjtBQUNyQixXQUFPTixhQUFhTSxNQUFiLENBQVA7QUFDRDtBQUNELE1BQUlDLFVBQVVSLFlBQVlPLE1BQVosQ0FBZDtBQUFBLE1BQ0lFLFNBQVMsRUFEYjs7QUFHQSxPQUFLLElBQUlDLEdBQVQsSUFBZ0JILE1BQWhCLEVBQXdCO0FBQ3RCLFFBQUksRUFBRUcsT0FBTyxhQUFQLEtBQXlCRixXQUFXLENBQUNILGVBQWVNLElBQWYsQ0FBb0JKLE1BQXBCLEVBQTRCRyxHQUE1QixDQUFyQyxDQUFGLENBQUosRUFBK0U7QUFDN0VELGFBQU9HLElBQVAsQ0FBWUYsR0FBWjtBQUNEO0FBQ0Y7QUFDRCxTQUFPRCxNQUFQO0FBQ0Q7O0FBRURJLE9BQU9DLE9BQVAsR0FBaUJSLFVBQWpCIiwiZmlsZSI6Il9iYXNlS2V5c0luLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGlzUHJvdG90eXBlID0gcmVxdWlyZSgnLi9faXNQcm90b3R5cGUnKSxcbiAgICBuYXRpdmVLZXlzSW4gPSByZXF1aXJlKCcuL19uYXRpdmVLZXlzSW4nKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzSW5gIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXNJbihvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXNJbihvYmplY3QpO1xuICB9XG4gIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlS2V5c0luO1xuIl19