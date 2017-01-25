'use strict';

var baseSlice = require('./_baseSlice');

/**
 * Gets all but the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.initial([1, 2, 3]);
 * // => [1, 2]
 */
function initial(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice(array, 0, -1) : [];
}

module.exports = initial;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2luaXRpYWwuanMiXSwibmFtZXMiOlsiYmFzZVNsaWNlIiwicmVxdWlyZSIsImluaXRpYWwiLCJhcnJheSIsImxlbmd0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsWUFBWUMsUUFBUSxjQUFSLENBQWhCOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQWNBLFNBQVNDLE9BQVQsQ0FBaUJDLEtBQWpCLEVBQXdCO0FBQ3RCLE1BQUlDLFNBQVNELFNBQVMsSUFBVCxHQUFnQixDQUFoQixHQUFvQkEsTUFBTUMsTUFBdkM7QUFDQSxTQUFPQSxTQUFTSixVQUFVRyxLQUFWLEVBQWlCLENBQWpCLEVBQW9CLENBQUMsQ0FBckIsQ0FBVCxHQUFtQyxFQUExQztBQUNEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCSixPQUFqQiIsImZpbGUiOiJpbml0aWFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VTbGljZSA9IHJlcXVpcmUoJy4vX2Jhc2VTbGljZScpO1xuXG4vKipcbiAqIEdldHMgYWxsIGJ1dCB0aGUgbGFzdCBlbGVtZW50IG9mIGBhcnJheWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHNsaWNlIG9mIGBhcnJheWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaW5pdGlhbChbMSwgMiwgM10pO1xuICogLy8gPT4gWzEsIDJdXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWwoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuICByZXR1cm4gbGVuZ3RoID8gYmFzZVNsaWNlKGFycmF5LCAwLCAtMSkgOiBbXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbml0aWFsO1xuIl19