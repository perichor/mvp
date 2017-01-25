'use strict';

var castPath = require('./_castPath'),
    toKey = require('./_toKey');

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : undefined;
}

module.exports = baseGet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlR2V0LmpzIl0sIm5hbWVzIjpbImNhc3RQYXRoIiwicmVxdWlyZSIsInRvS2V5IiwiYmFzZUdldCIsIm9iamVjdCIsInBhdGgiLCJpbmRleCIsImxlbmd0aCIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsV0FBV0MsUUFBUSxhQUFSLENBQWY7QUFBQSxJQUNJQyxRQUFRRCxRQUFRLFVBQVIsQ0FEWjs7QUFHQTs7Ozs7Ozs7QUFRQSxTQUFTRSxPQUFULENBQWlCQyxNQUFqQixFQUF5QkMsSUFBekIsRUFBK0I7QUFDN0JBLFNBQU9MLFNBQVNLLElBQVQsRUFBZUQsTUFBZixDQUFQOztBQUVBLE1BQUlFLFFBQVEsQ0FBWjtBQUFBLE1BQ0lDLFNBQVNGLEtBQUtFLE1BRGxCOztBQUdBLFNBQU9ILFVBQVUsSUFBVixJQUFrQkUsUUFBUUMsTUFBakMsRUFBeUM7QUFDdkNILGFBQVNBLE9BQU9GLE1BQU1HLEtBQUtDLE9BQUwsQ0FBTixDQUFQLENBQVQ7QUFDRDtBQUNELFNBQVFBLFNBQVNBLFNBQVNDLE1BQW5CLEdBQTZCSCxNQUE3QixHQUFzQ0ksU0FBN0M7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQlAsT0FBakIiLCJmaWxlIjoiX2Jhc2VHZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2FzdFBhdGggPSByZXF1aXJlKCcuL19jYXN0UGF0aCcpLFxuICAgIHRvS2V5ID0gcmVxdWlyZSgnLi9fdG9LZXknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5nZXRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVmYXVsdCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXQob2JqZWN0LCBwYXRoKSB7XG4gIHBhdGggPSBjYXN0UGF0aChwYXRoLCBvYmplY3QpO1xuXG4gIHZhciBpbmRleCA9IDAsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAob2JqZWN0ICE9IG51bGwgJiYgaW5kZXggPCBsZW5ndGgpIHtcbiAgICBvYmplY3QgPSBvYmplY3RbdG9LZXkocGF0aFtpbmRleCsrXSldO1xuICB9XG4gIHJldHVybiAoaW5kZXggJiYgaW5kZXggPT0gbGVuZ3RoKSA/IG9iamVjdCA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0O1xuIl19