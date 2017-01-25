'use strict';

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeJoin = arrayProto.join;

/**
 * Converts all elements in `array` into a string separated by `separator`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to convert.
 * @param {string} [separator=','] The element separator.
 * @returns {string} Returns the joined string.
 * @example
 *
 * _.join(['a', 'b', 'c'], '~');
 * // => 'a~b~c'
 */
function join(array, separator) {
  return array == null ? '' : nativeJoin.call(array, separator);
}

module.exports = join;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2pvaW4uanMiXSwibmFtZXMiOlsiYXJyYXlQcm90byIsIkFycmF5IiwicHJvdG90eXBlIiwibmF0aXZlSm9pbiIsImpvaW4iLCJhcnJheSIsInNlcGFyYXRvciIsImNhbGwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBSUEsYUFBYUMsTUFBTUMsU0FBdkI7O0FBRUE7QUFDQSxJQUFJQyxhQUFhSCxXQUFXSSxJQUE1Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsU0FBU0EsSUFBVCxDQUFjQyxLQUFkLEVBQXFCQyxTQUFyQixFQUFnQztBQUM5QixTQUFPRCxTQUFTLElBQVQsR0FBZ0IsRUFBaEIsR0FBcUJGLFdBQVdJLElBQVgsQ0FBZ0JGLEtBQWhCLEVBQXVCQyxTQUF2QixDQUE1QjtBQUNEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCTCxJQUFqQiIsImZpbGUiOiJqb2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVKb2luID0gYXJyYXlQcm90by5qb2luO1xuXG4vKipcbiAqIENvbnZlcnRzIGFsbCBlbGVtZW50cyBpbiBgYXJyYXlgIGludG8gYSBzdHJpbmcgc2VwYXJhdGVkIGJ5IGBzZXBhcmF0b3JgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbnZlcnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlcGFyYXRvcj0nLCddIFRoZSBlbGVtZW50IHNlcGFyYXRvci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGpvaW5lZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uam9pbihbJ2EnLCAnYicsICdjJ10sICd+Jyk7XG4gKiAvLyA9PiAnYX5ifmMnXG4gKi9cbmZ1bmN0aW9uIGpvaW4oYXJyYXksIHNlcGFyYXRvcikge1xuICByZXR1cm4gYXJyYXkgPT0gbnVsbCA/ICcnIDogbmF0aXZlSm9pbi5jYWxsKGFycmF5LCBzZXBhcmF0b3IpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGpvaW47XG4iXX0=