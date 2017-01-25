'use strict';

var assignValue = require('./_assignValue'),
    castPath = require('./_castPath'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlU2V0LmpzIl0sIm5hbWVzIjpbImFzc2lnblZhbHVlIiwicmVxdWlyZSIsImNhc3RQYXRoIiwiaXNJbmRleCIsImlzT2JqZWN0IiwidG9LZXkiLCJiYXNlU2V0Iiwib2JqZWN0IiwicGF0aCIsInZhbHVlIiwiY3VzdG9taXplciIsImluZGV4IiwibGVuZ3RoIiwibGFzdEluZGV4IiwibmVzdGVkIiwia2V5IiwibmV3VmFsdWUiLCJvYmpWYWx1ZSIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsY0FBY0MsUUFBUSxnQkFBUixDQUFsQjtBQUFBLElBQ0lDLFdBQVdELFFBQVEsYUFBUixDQURmO0FBQUEsSUFFSUUsVUFBVUYsUUFBUSxZQUFSLENBRmQ7QUFBQSxJQUdJRyxXQUFXSCxRQUFRLFlBQVIsQ0FIZjtBQUFBLElBSUlJLFFBQVFKLFFBQVEsVUFBUixDQUpaOztBQU1BOzs7Ozs7Ozs7O0FBVUEsU0FBU0ssT0FBVCxDQUFpQkMsTUFBakIsRUFBeUJDLElBQXpCLEVBQStCQyxLQUEvQixFQUFzQ0MsVUFBdEMsRUFBa0Q7QUFDaEQsTUFBSSxDQUFDTixTQUFTRyxNQUFULENBQUwsRUFBdUI7QUFDckIsV0FBT0EsTUFBUDtBQUNEO0FBQ0RDLFNBQU9OLFNBQVNNLElBQVQsRUFBZUQsTUFBZixDQUFQOztBQUVBLE1BQUlJLFFBQVEsQ0FBQyxDQUFiO0FBQUEsTUFDSUMsU0FBU0osS0FBS0ksTUFEbEI7QUFBQSxNQUVJQyxZQUFZRCxTQUFTLENBRnpCO0FBQUEsTUFHSUUsU0FBU1AsTUFIYjs7QUFLQSxTQUFPTyxVQUFVLElBQVYsSUFBa0IsRUFBRUgsS0FBRixHQUFVQyxNQUFuQyxFQUEyQztBQUN6QyxRQUFJRyxNQUFNVixNQUFNRyxLQUFLRyxLQUFMLENBQU4sQ0FBVjtBQUFBLFFBQ0lLLFdBQVdQLEtBRGY7O0FBR0EsUUFBSUUsU0FBU0UsU0FBYixFQUF3QjtBQUN0QixVQUFJSSxXQUFXSCxPQUFPQyxHQUFQLENBQWY7QUFDQUMsaUJBQVdOLGFBQWFBLFdBQVdPLFFBQVgsRUFBcUJGLEdBQXJCLEVBQTBCRCxNQUExQixDQUFiLEdBQWlESSxTQUE1RDtBQUNBLFVBQUlGLGFBQWFFLFNBQWpCLEVBQTRCO0FBQzFCRixtQkFBV1osU0FBU2EsUUFBVCxJQUNQQSxRQURPLEdBRU5kLFFBQVFLLEtBQUtHLFFBQVEsQ0FBYixDQUFSLElBQTJCLEVBQTNCLEdBQWdDLEVBRnJDO0FBR0Q7QUFDRjtBQUNEWCxnQkFBWWMsTUFBWixFQUFvQkMsR0FBcEIsRUFBeUJDLFFBQXpCO0FBQ0FGLGFBQVNBLE9BQU9DLEdBQVAsQ0FBVDtBQUNEO0FBQ0QsU0FBT1IsTUFBUDtBQUNEOztBQUVEWSxPQUFPQyxPQUFQLEdBQWlCZCxPQUFqQiIsImZpbGUiOiJfYmFzZVNldC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhc3NpZ25WYWx1ZSA9IHJlcXVpcmUoJy4vX2Fzc2lnblZhbHVlJyksXG4gICAgY2FzdFBhdGggPSByZXF1aXJlKCcuL19jYXN0UGF0aCcpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgdG9LZXkgPSByZXF1aXJlKCcuL190b0tleScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNldGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgcGF0aCBjcmVhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTZXQob2JqZWN0LCBwYXRoLCB2YWx1ZSwgY3VzdG9taXplcikge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIHBhdGggPSBjYXN0UGF0aChwYXRoLCBvYmplY3QpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGgsXG4gICAgICBsYXN0SW5kZXggPSBsZW5ndGggLSAxLFxuICAgICAgbmVzdGVkID0gb2JqZWN0O1xuXG4gIHdoaWxlIChuZXN0ZWQgIT0gbnVsbCAmJiArK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHRvS2V5KHBhdGhbaW5kZXhdKSxcbiAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmIChpbmRleCAhPSBsYXN0SW5kZXgpIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG5lc3RlZFtrZXldO1xuICAgICAgbmV3VmFsdWUgPSBjdXN0b21pemVyID8gY3VzdG9taXplcihvYmpWYWx1ZSwga2V5LCBuZXN0ZWQpIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBpc09iamVjdChvYmpWYWx1ZSlcbiAgICAgICAgICA/IG9ialZhbHVlXG4gICAgICAgICAgOiAoaXNJbmRleChwYXRoW2luZGV4ICsgMV0pID8gW10gOiB7fSk7XG4gICAgICB9XG4gICAgfVxuICAgIGFzc2lnblZhbHVlKG5lc3RlZCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgbmVzdGVkID0gbmVzdGVkW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU2V0O1xuIl19