'use strict';

var castPath = require('./_castPath'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isIndex = require('./_isIndex'),
    isLength = require('./isLength'),
    toKey = require('./_toKey');

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}

module.exports = hasPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19oYXNQYXRoLmpzIl0sIm5hbWVzIjpbImNhc3RQYXRoIiwicmVxdWlyZSIsImlzQXJndW1lbnRzIiwiaXNBcnJheSIsImlzSW5kZXgiLCJpc0xlbmd0aCIsInRvS2V5IiwiaGFzUGF0aCIsIm9iamVjdCIsInBhdGgiLCJoYXNGdW5jIiwiaW5kZXgiLCJsZW5ndGgiLCJyZXN1bHQiLCJrZXkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsYUFBUixDQUFmO0FBQUEsSUFDSUMsY0FBY0QsUUFBUSxlQUFSLENBRGxCO0FBQUEsSUFFSUUsVUFBVUYsUUFBUSxXQUFSLENBRmQ7QUFBQSxJQUdJRyxVQUFVSCxRQUFRLFlBQVIsQ0FIZDtBQUFBLElBSUlJLFdBQVdKLFFBQVEsWUFBUixDQUpmO0FBQUEsSUFLSUssUUFBUUwsUUFBUSxVQUFSLENBTFo7O0FBT0E7Ozs7Ozs7OztBQVNBLFNBQVNNLE9BQVQsQ0FBaUJDLE1BQWpCLEVBQXlCQyxJQUF6QixFQUErQkMsT0FBL0IsRUFBd0M7QUFDdENELFNBQU9ULFNBQVNTLElBQVQsRUFBZUQsTUFBZixDQUFQOztBQUVBLE1BQUlHLFFBQVEsQ0FBQyxDQUFiO0FBQUEsTUFDSUMsU0FBU0gsS0FBS0csTUFEbEI7QUFBQSxNQUVJQyxTQUFTLEtBRmI7O0FBSUEsU0FBTyxFQUFFRixLQUFGLEdBQVVDLE1BQWpCLEVBQXlCO0FBQ3ZCLFFBQUlFLE1BQU1SLE1BQU1HLEtBQUtFLEtBQUwsQ0FBTixDQUFWO0FBQ0EsUUFBSSxFQUFFRSxTQUFTTCxVQUFVLElBQVYsSUFBa0JFLFFBQVFGLE1BQVIsRUFBZ0JNLEdBQWhCLENBQTdCLENBQUosRUFBd0Q7QUFDdEQ7QUFDRDtBQUNETixhQUFTQSxPQUFPTSxHQUFQLENBQVQ7QUFDRDtBQUNELE1BQUlELFVBQVUsRUFBRUYsS0FBRixJQUFXQyxNQUF6QixFQUFpQztBQUMvQixXQUFPQyxNQUFQO0FBQ0Q7QUFDREQsV0FBU0osVUFBVSxJQUFWLEdBQWlCLENBQWpCLEdBQXFCQSxPQUFPSSxNQUFyQztBQUNBLFNBQU8sQ0FBQyxDQUFDQSxNQUFGLElBQVlQLFNBQVNPLE1BQVQsQ0FBWixJQUFnQ1IsUUFBUVUsR0FBUixFQUFhRixNQUFiLENBQWhDLEtBQ0pULFFBQVFLLE1BQVIsS0FBbUJOLFlBQVlNLE1BQVosQ0FEZixDQUFQO0FBRUQ7O0FBRURPLE9BQU9DLE9BQVAsR0FBaUJULE9BQWpCIiwiZmlsZSI6Il9oYXNQYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNhc3RQYXRoID0gcmVxdWlyZSgnLi9fY2FzdFBhdGgnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICB0b0tleSA9IHJlcXVpcmUoJy4vX3RvS2V5Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBwYXRoYCBleGlzdHMgb24gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaGFzRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgcHJvcGVydGllcy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBoYXNGdW5jKSB7XG4gIHBhdGggPSBjYXN0UGF0aChwYXRoLCBvYmplY3QpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBmYWxzZTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSk7XG4gICAgaWYgKCEocmVzdWx0ID0gb2JqZWN0ICE9IG51bGwgJiYgaGFzRnVuYyhvYmplY3QsIGtleSkpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgb2JqZWN0ID0gb2JqZWN0W2tleV07XG4gIH1cbiAgaWYgKHJlc3VsdCB8fCArK2luZGV4ICE9IGxlbmd0aCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgbGVuZ3RoID0gb2JqZWN0ID09IG51bGwgPyAwIDogb2JqZWN0Lmxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiYgaXNJbmRleChrZXksIGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc1BhdGg7XG4iXX0=