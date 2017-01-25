'use strict';

var baseClone = require('./_baseClone'),
    baseMatchesProperty = require('./_baseMatchesProperty');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a function that performs a partial deep comparison between the
 * value at `path` of a given object to `srcValue`, returning `true` if the
 * object value is equivalent, else `false`.
 *
 * **Note:** Partial comparisons will match empty array and empty object
 * `srcValue` values against any array or object value, respectively. See
 * `_.isEqual` for a list of supported value comparisons.
 *
 * @static
 * @memberOf _
 * @since 3.2.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 * @example
 *
 * var objects = [
 *   { 'a': 1, 'b': 2, 'c': 3 },
 *   { 'a': 4, 'b': 5, 'c': 6 }
 * ];
 *
 * _.find(objects, _.matchesProperty('a', 4));
 * // => { 'a': 4, 'b': 5, 'c': 6 }
 */
function matchesProperty(path, srcValue) {
  return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
}

module.exports = matchesProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL21hdGNoZXNQcm9wZXJ0eS5qcyJdLCJuYW1lcyI6WyJiYXNlQ2xvbmUiLCJyZXF1aXJlIiwiYmFzZU1hdGNoZXNQcm9wZXJ0eSIsIkNMT05FX0RFRVBfRkxBRyIsIm1hdGNoZXNQcm9wZXJ0eSIsInBhdGgiLCJzcmNWYWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsWUFBWUMsUUFBUSxjQUFSLENBQWhCO0FBQUEsSUFDSUMsc0JBQXNCRCxRQUFRLHdCQUFSLENBRDFCOztBQUdBO0FBQ0EsSUFBSUUsa0JBQWtCLENBQXRCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxTQUFTQyxlQUFULENBQXlCQyxJQUF6QixFQUErQkMsUUFBL0IsRUFBeUM7QUFDdkMsU0FBT0osb0JBQW9CRyxJQUFwQixFQUEwQkwsVUFBVU0sUUFBVixFQUFvQkgsZUFBcEIsQ0FBMUIsQ0FBUDtBQUNEOztBQUVESSxPQUFPQyxPQUFQLEdBQWlCSixlQUFqQiIsImZpbGUiOiJtYXRjaGVzUHJvcGVydHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUNsb25lID0gcmVxdWlyZSgnLi9fYmFzZUNsb25lJyksXG4gICAgYmFzZU1hdGNoZXNQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2Jhc2VNYXRjaGVzUHJvcGVydHknKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY2xvbmluZy4gKi9cbnZhciBDTE9ORV9ERUVQX0ZMQUcgPSAxO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHBlcmZvcm1zIGEgcGFydGlhbCBkZWVwIGNvbXBhcmlzb24gYmV0d2VlbiB0aGVcbiAqIHZhbHVlIGF0IGBwYXRoYCBvZiBhIGdpdmVuIG9iamVjdCB0byBgc3JjVmFsdWVgLCByZXR1cm5pbmcgYHRydWVgIGlmIHRoZVxuICogb2JqZWN0IHZhbHVlIGlzIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqXG4gKiAqKk5vdGU6KiogUGFydGlhbCBjb21wYXJpc29ucyB3aWxsIG1hdGNoIGVtcHR5IGFycmF5IGFuZCBlbXB0eSBvYmplY3RcbiAqIGBzcmNWYWx1ZWAgdmFsdWVzIGFnYWluc3QgYW55IGFycmF5IG9yIG9iamVjdCB2YWx1ZSwgcmVzcGVjdGl2ZWx5LiBTZWVcbiAqIGBfLmlzRXF1YWxgIGZvciBhIGxpc3Qgb2Ygc3VwcG9ydGVkIHZhbHVlIGNvbXBhcmlzb25zLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4yLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IFtcbiAqICAgeyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH0sXG4gKiAgIHsgJ2EnOiA0LCAnYic6IDUsICdjJzogNiB9XG4gKiBdO1xuICpcbiAqIF8uZmluZChvYmplY3RzLCBfLm1hdGNoZXNQcm9wZXJ0eSgnYScsIDQpKTtcbiAqIC8vID0+IHsgJ2EnOiA0LCAnYic6IDUsICdjJzogNiB9XG4gKi9cbmZ1bmN0aW9uIG1hdGNoZXNQcm9wZXJ0eShwYXRoLCBzcmNWYWx1ZSkge1xuICByZXR1cm4gYmFzZU1hdGNoZXNQcm9wZXJ0eShwYXRoLCBiYXNlQ2xvbmUoc3JjVmFsdWUsIENMT05FX0RFRVBfRkxBRykpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hdGNoZXNQcm9wZXJ0eTtcbiJdfQ==