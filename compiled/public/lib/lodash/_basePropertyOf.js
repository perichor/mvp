"use strict";

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}

module.exports = basePropertyOf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlUHJvcGVydHlPZi5qcyJdLCJuYW1lcyI6WyJiYXNlUHJvcGVydHlPZiIsIm9iamVjdCIsImtleSIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7QUFPQSxTQUFTQSxjQUFULENBQXdCQyxNQUF4QixFQUFnQztBQUM5QixTQUFPLFVBQVNDLEdBQVQsRUFBYztBQUNuQixXQUFPRCxVQUFVLElBQVYsR0FBaUJFLFNBQWpCLEdBQTZCRixPQUFPQyxHQUFQLENBQXBDO0FBQ0QsR0FGRDtBQUdEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCTCxjQUFqQiIsImZpbGUiOiJfYmFzZVByb3BlcnR5T2YuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5T2ZgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eU9mKG9iamVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVByb3BlcnR5T2Y7XG4iXX0=