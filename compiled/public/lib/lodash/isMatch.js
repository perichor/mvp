'use strict';

var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData');

/**
 * Performs a partial deep comparison between `object` and `source` to
 * determine if `object` contains equivalent property values.
 *
 * **Note:** This method is equivalent to `_.matches` when `source` is
 * partially applied.
 *
 * Partial comparisons will match empty array and empty object `source`
 * values against any array or object value, respectively. See `_.isEqual`
 * for a list of supported value comparisons.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 *
 * _.isMatch(object, { 'b': 2 });
 * // => true
 *
 * _.isMatch(object, { 'b': 1 });
 * // => false
 */
function isMatch(object, source) {
  return object === source || baseIsMatch(object, source, getMatchData(source));
}

module.exports = isMatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2lzTWF0Y2guanMiXSwibmFtZXMiOlsiYmFzZUlzTWF0Y2giLCJyZXF1aXJlIiwiZ2V0TWF0Y2hEYXRhIiwiaXNNYXRjaCIsIm9iamVjdCIsInNvdXJjZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsY0FBY0MsUUFBUSxnQkFBUixDQUFsQjtBQUFBLElBQ0lDLGVBQWVELFFBQVEsaUJBQVIsQ0FEbkI7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsU0FBU0UsT0FBVCxDQUFpQkMsTUFBakIsRUFBeUJDLE1BQXpCLEVBQWlDO0FBQy9CLFNBQU9ELFdBQVdDLE1BQVgsSUFBcUJMLFlBQVlJLE1BQVosRUFBb0JDLE1BQXBCLEVBQTRCSCxhQUFhRyxNQUFiLENBQTVCLENBQTVCO0FBQ0Q7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUJKLE9BQWpCIiwiZmlsZSI6ImlzTWF0Y2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUlzTWF0Y2ggPSByZXF1aXJlKCcuL19iYXNlSXNNYXRjaCcpLFxuICAgIGdldE1hdGNoRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hdGNoRGF0YScpO1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgcGFydGlhbCBkZWVwIGNvbXBhcmlzb24gYmV0d2VlbiBgb2JqZWN0YCBhbmQgYHNvdXJjZWAgdG9cbiAqIGRldGVybWluZSBpZiBgb2JqZWN0YCBjb250YWlucyBlcXVpdmFsZW50IHByb3BlcnR5IHZhbHVlcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgZXF1aXZhbGVudCB0byBgXy5tYXRjaGVzYCB3aGVuIGBzb3VyY2VgIGlzXG4gKiBwYXJ0aWFsbHkgYXBwbGllZC5cbiAqXG4gKiBQYXJ0aWFsIGNvbXBhcmlzb25zIHdpbGwgbWF0Y2ggZW1wdHkgYXJyYXkgYW5kIGVtcHR5IG9iamVjdCBgc291cmNlYFxuICogdmFsdWVzIGFnYWluc3QgYW55IGFycmF5IG9yIG9iamVjdCB2YWx1ZSwgcmVzcGVjdGl2ZWx5LiBTZWUgYF8uaXNFcXVhbGBcbiAqIGZvciBhIGxpc3Qgb2Ygc3VwcG9ydGVkIHZhbHVlIGNvbXBhcmlzb25zLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYG9iamVjdGAgaXMgYSBtYXRjaCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICpcbiAqIF8uaXNNYXRjaChvYmplY3QsIHsgJ2InOiAyIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNNYXRjaChvYmplY3QsIHsgJ2InOiAxIH0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNNYXRjaChvYmplY3QsIHNvdXJjZSkge1xuICByZXR1cm4gb2JqZWN0ID09PSBzb3VyY2UgfHwgYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIGdldE1hdGNoRGF0YShzb3VyY2UpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc01hdGNoO1xuIl19