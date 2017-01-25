'use strict';

var _Symbol = require('./_Symbol'),
    Uint8Array = require('./_Uint8Array'),
    eq = require('./eq'),
    equalArrays = require('./_equalArrays'),
    mapToArray = require('./_mapToArray'),
    setToArray = require('./_setToArray');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19lcXVhbEJ5VGFnLmpzIl0sIm5hbWVzIjpbIlN5bWJvbCIsInJlcXVpcmUiLCJVaW50OEFycmF5IiwiZXEiLCJlcXVhbEFycmF5cyIsIm1hcFRvQXJyYXkiLCJzZXRUb0FycmF5IiwiQ09NUEFSRV9QQVJUSUFMX0ZMQUciLCJDT01QQVJFX1VOT1JERVJFRF9GTEFHIiwiYm9vbFRhZyIsImRhdGVUYWciLCJlcnJvclRhZyIsIm1hcFRhZyIsIm51bWJlclRhZyIsInJlZ2V4cFRhZyIsInNldFRhZyIsInN0cmluZ1RhZyIsInN5bWJvbFRhZyIsImFycmF5QnVmZmVyVGFnIiwiZGF0YVZpZXdUYWciLCJzeW1ib2xQcm90byIsInByb3RvdHlwZSIsInVuZGVmaW5lZCIsInN5bWJvbFZhbHVlT2YiLCJ2YWx1ZU9mIiwiZXF1YWxCeVRhZyIsIm9iamVjdCIsIm90aGVyIiwidGFnIiwiYml0bWFzayIsImN1c3RvbWl6ZXIiLCJlcXVhbEZ1bmMiLCJzdGFjayIsImJ5dGVMZW5ndGgiLCJieXRlT2Zmc2V0IiwiYnVmZmVyIiwibmFtZSIsIm1lc3NhZ2UiLCJjb252ZXJ0IiwiaXNQYXJ0aWFsIiwic2l6ZSIsInN0YWNrZWQiLCJnZXQiLCJzZXQiLCJyZXN1bHQiLCJjYWxsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxVQUFTQyxRQUFRLFdBQVIsQ0FBYjtBQUFBLElBQ0lDLGFBQWFELFFBQVEsZUFBUixDQURqQjtBQUFBLElBRUlFLEtBQUtGLFFBQVEsTUFBUixDQUZUO0FBQUEsSUFHSUcsY0FBY0gsUUFBUSxnQkFBUixDQUhsQjtBQUFBLElBSUlJLGFBQWFKLFFBQVEsZUFBUixDQUpqQjtBQUFBLElBS0lLLGFBQWFMLFFBQVEsZUFBUixDQUxqQjs7QUFPQTtBQUNBLElBQUlNLHVCQUF1QixDQUEzQjtBQUFBLElBQ0lDLHlCQUF5QixDQUQ3Qjs7QUFHQTtBQUNBLElBQUlDLFVB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NkRBLFNBQU8sS0FBUDtBQUNEOztBQUVEbUIsT0FBT0MsT0FBUCxHQUFpQnRCLFVBQWpCIiwiZmlsZSI6Il9lcXVhbEJ5VGFnLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIFVpbnQ4QXJyYXkgPSByZXF1aXJlKCcuL19VaW50OEFycmF5JyksXG4gICAgZXEgPSByZXF1aXJlKCcuL2VxJyksXG4gICAgZXF1YWxBcnJheXMgPSByZXF1aXJlKCcuL19lcXVhbEFycmF5cycpLFxuICAgIG1hcFRvQXJyYXkgPSByZXF1aXJlKCcuL19tYXBUb0FycmF5JyksXG4gICAgc2V0VG9BcnJheSA9IHJlcXVpcmUoJy4vX3NldFRvQXJyYXknKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XSc7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZywgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgKG9iamVjdC5ieXRlT2Zmc2V0ICE9IG90aGVyLmJ5dGVPZmZzZXQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG9iamVjdCA9IG9iamVjdC5idWZmZXI7XG4gICAgICBvdGhlciA9IG90aGVyLmJ1ZmZlcjtcblxuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgIWVxdWFsRnVuYyhuZXcgVWludDhBcnJheShvYmplY3QpLCBuZXcgVWludDhBcnJheShvdGhlcikpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIENvZXJjZSBib29sZWFucyB0byBgMWAgb3IgYDBgIGFuZCBkYXRlcyB0byBtaWxsaXNlY29uZHMuXG4gICAgICAvLyBJbnZhbGlkIGRhdGVzIGFyZSBjb2VyY2VkIHRvIGBOYU5gLlxuICAgICAgcmV0dXJuIGVxKCtvYmplY3QsICtvdGhlcik7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncywgcHJpbWl0aXZlcyBhbmQgb2JqZWN0cyxcbiAgICAgIC8vIGFzIGVxdWFsLiBTZWUgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbiAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgdmFyIGNvbnZlcnQgPSBtYXBUb0FycmF5O1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHO1xuICAgICAgY29udmVydCB8fCAoY29udmVydCA9IHNldFRvQXJyYXkpO1xuXG4gICAgICBpZiAob2JqZWN0LnNpemUgIT0gb3RoZXIuc2l6ZSAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gICAgICBpZiAoc3RhY2tlZCkge1xuICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgIH1cbiAgICAgIGJpdG1hc2sgfD0gQ09NUEFSRV9VTk9SREVSRURfRkxBRztcblxuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gICAgICB2YXIgcmVzdWx0ID0gZXF1YWxBcnJheXMoY29udmVydChvYmplY3QpLCBjb252ZXJ0KG90aGVyKSwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjayk7XG4gICAgICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIGlmIChzeW1ib2xWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBzeW1ib2xWYWx1ZU9mLmNhbGwob2JqZWN0KSA9PSBzeW1ib2xWYWx1ZU9mLmNhbGwob3RoZXIpO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcXVhbEJ5VGFnO1xuIl19