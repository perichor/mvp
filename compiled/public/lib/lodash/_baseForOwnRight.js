'use strict';

var baseForRight = require('./_baseForRight'),
    keys = require('./keys');

/**
 * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwnRight(object, iteratee) {
  return object && baseForRight(object, iteratee, keys);
}

module.exports = baseForOwnRight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlRm9yT3duUmlnaHQuanMiXSwibmFtZXMiOlsiYmFzZUZvclJpZ2h0IiwicmVxdWlyZSIsImtleXMiLCJiYXNlRm9yT3duUmlnaHQiLCJvYmplY3QiLCJpdGVyYXRlZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsZUFBZUMsUUFBUSxpQkFBUixDQUFuQjtBQUFBLElBQ0lDLE9BQU9ELFFBQVEsUUFBUixDQURYOztBQUdBOzs7Ozs7OztBQVFBLFNBQVNFLGVBQVQsQ0FBeUJDLE1BQXpCLEVBQWlDQyxRQUFqQyxFQUEyQztBQUN6QyxTQUFPRCxVQUFVSixhQUFhSSxNQUFiLEVBQXFCQyxRQUFyQixFQUErQkgsSUFBL0IsQ0FBakI7QUFDRDs7QUFFREksT0FBT0MsT0FBUCxHQUFpQkosZUFBakIiLCJmaWxlIjoiX2Jhc2VGb3JPd25SaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlRm9yUmlnaHQgPSByZXF1aXJlKCcuL19iYXNlRm9yUmlnaHQnKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duUmlnaHRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duUmlnaHQob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3JSaWdodChvYmplY3QsIGl0ZXJhdGVlLCBrZXlzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRm9yT3duUmlnaHQ7XG4iXX0=