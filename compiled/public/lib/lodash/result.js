'use strict';

var castPath = require('./_castPath'),
    isFunction = require('./isFunction'),
    toKey = require('./_toKey');

/**
 * This method is like `_.get` except that if the resolved value is a
 * function it's invoked with the `this` binding of its parent object and
 * its result is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to resolve.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
 *
 * _.result(object, 'a[0].b.c1');
 * // => 3
 *
 * _.result(object, 'a[0].b.c2');
 * // => 4
 *
 * _.result(object, 'a[0].b.c3', 'default');
 * // => 'default'
 *
 * _.result(object, 'a[0].b.c3', _.constant('default'));
 * // => 'default'
 */
function result(object, path, defaultValue) {
  path = castPath(path, object);

  var index = -1,
      length = path.length;

  // Ensure the loop is entered when path is empty.
  if (!length) {
    length = 1;
    object = undefined;
  }
  while (++index < length) {
    var value = object == null ? undefined : object[toKey(path[index])];
    if (value === undefined) {
      index = length;
      value = defaultValue;
    }
    object = isFunction(value) ? value.call(object) : value;
  }
  return object;
}

module.exports = result;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3Jlc3VsdC5qcyJdLCJuYW1lcyI6WyJjYXN0UGF0aCIsInJlcXVpcmUiLCJpc0Z1bmN0aW9uIiwidG9LZXkiLCJyZXN1bHQiLCJvYmplY3QiLCJwYXRoIiwiZGVmYXVsdFZhbHVlIiwiaW5kZXgiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsImNhbGwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsYUFBUixDQUFmO0FBQUEsSUFDSUMsYUFBYUQsUUFBUSxjQUFSLENBRGpCO0FBQUEsSUFFSUUsUUFBUUYsUUFBUSxVQUFSLENBRlo7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLFNBQVNHLE1BQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCQyxJQUF4QixFQUE4QkMsWUFBOUIsRUFBNEM7QUFDMUNELFNBQU9OLFNBQVNNLElBQVQsRUFBZUQsTUFBZixDQUFQOztBQUVBLE1BQUlHLFFBQVEsQ0FBQyxDQUFiO0FBQUEsTUFDSUMsU0FBU0gsS0FBS0csTUFEbEI7O0FBR0E7QUFDQSxNQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYQSxhQUFTLENBQVQ7QUFDQUosYUFBU0ssU0FBVDtBQUNEO0FBQ0QsU0FBTyxFQUFFRixLQUFGLEdBQVVDLE1BQWpCLEVBQXlCO0FBQ3ZCLFFBQUlFLFFBQVFOLFVBQVUsSUFBVixHQUFpQkssU0FBakIsR0FBNkJMLE9BQU9GLE1BQU1HLEtBQUtFLEtBQUwsQ0FBTixDQUFQLENBQXpDO0FBQ0EsUUFBSUcsVUFBVUQsU0FBZCxFQUF5QjtBQUN2QkYsY0FBUUMsTUFBUjtBQUNBRSxjQUFRSixZQUFSO0FBQ0Q7QUFDREYsYUFBU0gsV0FBV1MsS0FBWCxJQUFvQkEsTUFBTUMsSUFBTixDQUFXUCxNQUFYLENBQXBCLEdBQXlDTSxLQUFsRDtBQUNEO0FBQ0QsU0FBT04sTUFBUDtBQUNEOztBQUVEUSxPQUFPQyxPQUFQLEdBQWlCVixNQUFqQiIsImZpbGUiOiJyZXN1bHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2FzdFBhdGggPSByZXF1aXJlKCcuL19jYXN0UGF0aCcpLFxuICAgIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICB0b0tleSA9IHJlcXVpcmUoJy4vX3RvS2V5Jyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5nZXRgIGV4Y2VwdCB0aGF0IGlmIHRoZSByZXNvbHZlZCB2YWx1ZSBpcyBhXG4gKiBmdW5jdGlvbiBpdCdzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgaXRzIHBhcmVudCBvYmplY3QgYW5kXG4gKiBpdHMgcmVzdWx0IGlzIHJldHVybmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byByZXNvbHZlLlxuICogQHBhcmFtIHsqfSBbZGVmYXVsdFZhbHVlXSBUaGUgdmFsdWUgcmV0dXJuZWQgZm9yIGB1bmRlZmluZWRgIHJlc29sdmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MxJzogMywgJ2MyJzogXy5jb25zdGFudCg0KSB9IH1dIH07XG4gKlxuICogXy5yZXN1bHQob2JqZWN0LCAnYVswXS5iLmMxJyk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5yZXN1bHQob2JqZWN0LCAnYVswXS5iLmMyJyk7XG4gKiAvLyA9PiA0XG4gKlxuICogXy5yZXN1bHQob2JqZWN0LCAnYVswXS5iLmMzJywgJ2RlZmF1bHQnKTtcbiAqIC8vID0+ICdkZWZhdWx0J1xuICpcbiAqIF8ucmVzdWx0KG9iamVjdCwgJ2FbMF0uYi5jMycsIF8uY29uc3RhbnQoJ2RlZmF1bHQnKSk7XG4gKiAvLyA9PiAnZGVmYXVsdCdcbiAqL1xuZnVuY3Rpb24gcmVzdWx0KG9iamVjdCwgcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIHBhdGggPSBjYXN0UGF0aChwYXRoLCBvYmplY3QpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgLy8gRW5zdXJlIHRoZSBsb29wIGlzIGVudGVyZWQgd2hlbiBwYXRoIGlzIGVtcHR5LlxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IDE7XG4gICAgb2JqZWN0ID0gdW5kZWZpbmVkO1xuICB9XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3RbdG9LZXkocGF0aFtpbmRleF0pXTtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5kZXggPSBsZW5ndGg7XG4gICAgICB2YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgb2JqZWN0ID0gaXNGdW5jdGlvbih2YWx1ZSkgPyB2YWx1ZS5jYWxsKG9iamVjdCkgOiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3VsdDtcbiJdfQ==