'use strict';

var defineProperty = require('./_defineProperty');

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlQXNzaWduVmFsdWUuanMiXSwibmFtZXMiOlsiZGVmaW5lUHJvcGVydHkiLCJyZXF1aXJlIiwiYmFzZUFzc2lnblZhbHVlIiwib2JqZWN0Iiwia2V5IiwidmFsdWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGlCQUFpQkMsUUFBUSxtQkFBUixDQUFyQjs7QUFFQTs7Ozs7Ozs7O0FBU0EsU0FBU0MsZUFBVCxDQUF5QkMsTUFBekIsRUFBaUNDLEdBQWpDLEVBQXNDQyxLQUF0QyxFQUE2QztBQUMzQyxNQUFJRCxPQUFPLFdBQVAsSUFBc0JKLGNBQTFCLEVBQTBDO0FBQ3hDQSxtQkFBZUcsTUFBZixFQUF1QkMsR0FBdkIsRUFBNEI7QUFDMUIsc0JBQWdCLElBRFU7QUFFMUIsb0JBQWMsSUFGWTtBQUcxQixlQUFTQyxLQUhpQjtBQUkxQixrQkFBWTtBQUpjLEtBQTVCO0FBTUQsR0FQRCxNQU9PO0FBQ0xGLFdBQU9DLEdBQVAsSUFBY0MsS0FBZDtBQUNEO0FBQ0Y7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUJMLGVBQWpCIiwiZmlsZSI6Il9iYXNlQXNzaWduVmFsdWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19kZWZpbmVQcm9wZXJ0eScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBhc3NpZ25WYWx1ZWAgYW5kIGBhc3NpZ25NZXJnZVZhbHVlYCB3aXRob3V0XG4gKiB2YWx1ZSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5ID09ICdfX3Byb3RvX18nICYmIGRlZmluZVByb3BlcnR5KSB7XG4gICAgZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcbiAgICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICAgJ2VudW1lcmFibGUnOiB0cnVlLFxuICAgICAgJ3ZhbHVlJzogdmFsdWUsXG4gICAgICAnd3JpdGFibGUnOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VBc3NpZ25WYWx1ZTtcbiJdfQ==