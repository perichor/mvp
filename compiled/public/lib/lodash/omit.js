'use strict';

var arrayMap = require('./_arrayMap'),
    baseClone = require('./_baseClone'),
    baseUnset = require('./_baseUnset'),
    castPath = require('./_castPath'),
    copyObject = require('./_copyObject'),
    customOmitClone = require('./_customOmitClone'),
    flatRest = require('./_flatRest'),
    getAllKeysIn = require('./_getAllKeysIn');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = flatRest(function (object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap(paths, function (path) {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});

module.exports = omit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL29taXQuanMiXSwibmFtZXMiOlsiYXJyYXlNYXAiLCJyZXF1aXJlIiwiYmFzZUNsb25lIiwiYmFzZVVuc2V0IiwiY2FzdFBhdGgiLCJjb3B5T2JqZWN0IiwiY3VzdG9tT21pdENsb25lIiwiZmxhdFJlc3QiLCJnZXRBbGxLZXlzSW4iLCJDTE9ORV9ERUVQX0ZMQUciLCJDTE9ORV9GTEFUX0ZMQUciLCJDTE9ORV9TWU1CT0xTX0ZMQUciLCJvbWl0Iiwib2JqZWN0IiwicGF0aHMiLCJyZXN1bHQiLCJpc0RlZXAiLCJwYXRoIiwibGVuZ3RoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxXQUFXQyxRQUFRLGFBQVIsQ0FBZjtBQUFBLElBQ0lDLFlBQVlELFFBQVEsY0FBUixDQURoQjtBQUFBLElBRUlFLFlBQVlGLFFBQVEsY0FBUixDQUZoQjtBQUFBLElBR0lHLFdBQVdILFFBQVEsYUFBUixDQUhmO0FBQUEsSUFJSUksYUFBYUosUUFBUSxlQUFSLENBSmpCO0FBQUEsSUFLSUssa0JBQWtCTCxRQUFRLG9CQUFSLENBTHRCO0FBQUEsSUFNSU0sV0FBV04sUUFBUSxhQUFSLENBTmY7QUFBQSxJQU9JTyxlQUFlUCxRQUFRLGlCQUFSLENBUG5COztBQVNBO0FBQ0EsSUFBSVEsa0JBQWtCLENBQXRCO0FBQUEsSUFDSUMsa0JBQWtCLENBRHRCO0FBQUEsSUFFSUMscUJBQXFCLENBRnpCOztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxJQUFJQyxPQUFPTCxTQUFTLFVBQVNNLE1BQVQsRUFBaUJDLEtBQWpCLEVBQXdCO0FBQzFDLE1BQUlDLFNBQVMsRUFBYjtBQUNBLE1BQUlGLFVBQVUsSUFBZCxFQUFvQjtBQUNsQixXQUFPRSxNQUFQO0FBQ0Q7QUFDRCxNQUFJQyxTQUFTLEtBQWI7QUFDQUYsVUFBUWQsU0FBU2MsS0FBVCxFQUFnQixVQUFTRyxJQUFULEVBQWU7QUFDckNBLFdBQU9iLFNBQVNhLElBQVQsRUFBZUosTUFBZixDQUFQO0FBQ0FHLGVBQVdBLFNBQVNDLEtBQUtDLE1BQUwsR0FBYyxDQUFsQztBQUNBLFdBQU9ELElBQVA7QUFDRCxHQUpPLENBQVI7QUFLQVosYUFBV1EsTUFBWCxFQUFtQkwsYUFBYUssTUFBYixDQUFuQixFQUF5Q0UsTUFBekM7QUFDQSxNQUFJQyxNQUFKLEVBQVk7QUFDVkQsYUFBU2IsVUFBVWEsTUFBVixFQUFrQk4sa0JBQWtCQyxlQUFsQixHQUFvQ0Msa0JBQXRELEVBQTBFTCxlQUExRSxDQUFUO0FBQ0Q7QUFDRCxNQUFJWSxTQUFTSixNQUFNSSxNQUFuQjtBQUNBLFNBQU9BLFFBQVAsRUFBaUI7QUFDZmYsY0FBVVksTUFBVixFQUFrQkQsTUFBTUksTUFBTixDQUFsQjtBQUNEO0FBQ0QsU0FBT0gsTUFBUDtBQUNELENBcEJVLENBQVg7O0FBc0JBSSxPQUFPQyxPQUFQLEdBQWlCUixJQUFqQiIsImZpbGUiOiJvbWl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFycmF5TWFwID0gcmVxdWlyZSgnLi9fYXJyYXlNYXAnKSxcbiAgICBiYXNlQ2xvbmUgPSByZXF1aXJlKCcuL19iYXNlQ2xvbmUnKSxcbiAgICBiYXNlVW5zZXQgPSByZXF1aXJlKCcuL19iYXNlVW5zZXQnKSxcbiAgICBjYXN0UGF0aCA9IHJlcXVpcmUoJy4vX2Nhc3RQYXRoJyksXG4gICAgY29weU9iamVjdCA9IHJlcXVpcmUoJy4vX2NvcHlPYmplY3QnKSxcbiAgICBjdXN0b21PbWl0Q2xvbmUgPSByZXF1aXJlKCcuL19jdXN0b21PbWl0Q2xvbmUnKSxcbiAgICBmbGF0UmVzdCA9IHJlcXVpcmUoJy4vX2ZsYXRSZXN0JyksXG4gICAgZ2V0QWxsS2V5c0luID0gcmVxdWlyZSgnLi9fZ2V0QWxsS2V5c0luJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNsb25pbmcuICovXG52YXIgQ0xPTkVfREVFUF9GTEFHID0gMSxcbiAgICBDTE9ORV9GTEFUX0ZMQUcgPSAyLFxuICAgIENMT05FX1NZTUJPTFNfRkxBRyA9IDQ7XG5cbi8qKlxuICogVGhlIG9wcG9zaXRlIG9mIGBfLnBpY2tgOyB0aGlzIG1ldGhvZCBjcmVhdGVzIGFuIG9iamVjdCBjb21wb3NlZCBvZiB0aGVcbiAqIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgcGF0aHMgb2YgYG9iamVjdGAgdGhhdCBhcmUgbm90IG9taXR0ZWQuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGNvbnNpZGVyYWJseSBzbG93ZXIgdGhhbiBgXy5waWNrYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHsuLi4oc3RyaW5nfHN0cmluZ1tdKX0gW3BhdGhzXSBUaGUgcHJvcGVydHkgcGF0aHMgdG8gb21pdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAnMicsICdjJzogMyB9O1xuICpcbiAqIF8ub21pdChvYmplY3QsIFsnYScsICdjJ10pO1xuICogLy8gPT4geyAnYic6ICcyJyB9XG4gKi9cbnZhciBvbWl0ID0gZmxhdFJlc3QoZnVuY3Rpb24ob2JqZWN0LCBwYXRocykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgdmFyIGlzRGVlcCA9IGZhbHNlO1xuICBwYXRocyA9IGFycmF5TWFwKHBhdGhzLCBmdW5jdGlvbihwYXRoKSB7XG4gICAgcGF0aCA9IGNhc3RQYXRoKHBhdGgsIG9iamVjdCk7XG4gICAgaXNEZWVwIHx8IChpc0RlZXAgPSBwYXRoLmxlbmd0aCA+IDEpO1xuICAgIHJldHVybiBwYXRoO1xuICB9KTtcbiAgY29weU9iamVjdChvYmplY3QsIGdldEFsbEtleXNJbihvYmplY3QpLCByZXN1bHQpO1xuICBpZiAoaXNEZWVwKSB7XG4gICAgcmVzdWx0ID0gYmFzZUNsb25lKHJlc3VsdCwgQ0xPTkVfREVFUF9GTEFHIHwgQ0xPTkVfRkxBVF9GTEFHIHwgQ0xPTkVfU1lNQk9MU19GTEFHLCBjdXN0b21PbWl0Q2xvbmUpO1xuICB9XG4gIHZhciBsZW5ndGggPSBwYXRocy5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGJhc2VVbnNldChyZXN1bHQsIHBhdGhzW2xlbmd0aF0pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBvbWl0O1xuIl19