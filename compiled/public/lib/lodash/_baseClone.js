'use strict';

var Stack = require('./_Stack'),
    arrayEach = require('./_arrayEach'),
    assignValue = require('./_assignValue'),
    baseAssign = require('./_baseAssign'),
    baseAssignIn = require('./_baseAssignIn'),
    cloneBuffer = require('./_cloneBuffer'),
    copyArray = require('./_copyArray'),
    copySymbols = require('./_copySymbols'),
    copySymbolsIn = require('./_copySymbolsIn'),
    getAllKeys = require('./_getAllKeys'),
    getAllKeysIn = require('./_getAllKeysIn'),
    getTag = require('./_getTag'),
    initCloneArray = require('./_initCloneArray'),
    initCloneByTag = require('./_initCloneByTag'),
    initCloneObject = require('./_initCloneObject'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isObject = require('./isObject'),
    keys = require('./keys');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlQ2xvbmUuanMiXSwibmFtZXMiOlsiU3RhY2siLCJyZXF1aXJlIiwiYXJyYXlFYWNoIiwiYXNzaWduVmFsdWUiLCJiYXNlQXNzaWduIiwiYmFzZUFzc2lnbkluIiwiY2xvbmVCdWZmZXIiLCJjb3B5QXJyYXkiLCJjb3B5U3ltYm9scyIsImNvcHlTeW1ib2xzSW4iLCJnZXRBbGxLZXlzIiwiZ2V0QWxsS2V5c0luIiwiZ2V0VGFnIiwiaW5pdENsb25lQXJyYXkiLCJpbml0Q2xvbmVCeVRhZyIsImluaXRDbG9uZU9iamVjdCIsImlzQXJyYXkiLCJpc0J1ZmZlciIsImlzT2JqZWN0Iiwia2V5cyIsIkNMT05FX0RFRVBfRkxBRyIsIkNMT05FX0ZMQVRfRkxBRyIsIkNMT05FX1NZTUJPTFNfRkxBRyIsImFyZ3NUYWciLCJhcnJheVRhZyIsImJvb2xUYWciLCJkYXRlVGFnIiwiZXJyb3JUYWciLCJmdW5jVGFnIiwiZ2VuVGFnIiwibWFwVGFnIiwibnVtYmVyVGFnIiwib2JqZWN0VGFnIiwicmVnZXhwVGFnIiwic2V0VGFnIiwic3RyaW5nVGFnIiwic3ltYm9sVGFnIiwid2Vha01hcFRhZyIsImFycmF5QnVmZmVyVGFnIiwiZGF0YVZpZXdUYWciLCJmbG9hdDMyVGFnIiwiZmxvYXQ2NFRhZyIsImludDhUYWciLCJpbnQxNlRhZyIsImludDMyVGFnIiwidWludDhUYWciLCJ1aW50OENsYW1wZWRUYWciLCJ1aW50MTZUYWciLCJ1aW50MzJUYWciLCJjbG9uZWFibGVUYWdzIiwiYmFzZUNsb25lIiwidmFsdWUiLCJiaXRtYXNrIiwiY3VzdG9taXplciIsImtleSIsIm9iamVjdCIsInN0YWNrIiwicmVzdWx0IiwiaXNEZWVwIiwiaXNGbGF0IiwiaXNGdWxsIiwidW5kZWZpbmVkIiwiaXNBcnIiLCJ0YWciLCJpc0Z1bmMiLCJzdGFja2VkIiwiZ2V0Iiwic2V0Iiwia2V5c0Z1bmMiLCJrZXlzSW4iLCJwcm9wcyIs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aUJBQVdwQixNQUFNRyxHQUFOLENBQVg7QUFDRDtBQUNEO0FBQ0FuRCxnQkFBWXNELE1BQVosRUFBb0JILEdBQXBCLEVBQXlCSixVQUFVcUIsUUFBVixFQUFvQm5CLE9BQXBCLEVBQTZCQyxVQUE3QixFQUF5Q0MsR0FBekMsRUFBOENILEtBQTlDLEVBQXFESyxLQUFyRCxDQUF6QjtBQUNELEdBUEQ7QUFRQSxTQUFPQyxNQUFQO0FBQ0Q7O0FBRURlLE9BQU9DLE9BQVAsR0FBaUJ2QixTQUFqQiIsImZpbGUiOiJfYmFzZUNsb25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFN0YWNrID0gcmVxdWlyZSgnLi9fU3RhY2snKSxcbiAgICBhcnJheUVhY2ggPSByZXF1aXJlKCcuL19hcnJheUVhY2gnKSxcbiAgICBhc3NpZ25WYWx1ZSA9IHJlcXVpcmUoJy4vX2Fzc2lnblZhbHVlJyksXG4gICAgYmFzZUFzc2lnbiA9IHJlcXVpcmUoJy4vX2Jhc2VBc3NpZ24nKSxcbiAgICBiYXNlQXNzaWduSW4gPSByZXF1aXJlKCcuL19iYXNlQXNzaWduSW4nKSxcbiAgICBjbG9uZUJ1ZmZlciA9IHJlcXVpcmUoJy4vX2Nsb25lQnVmZmVyJyksXG4gICAgY29weUFycmF5ID0gcmVxdWlyZSgnLi9fY29weUFycmF5JyksXG4gICAgY29weVN5bWJvbHMgPSByZXF1aXJlKCcuL19jb3B5U3ltYm9scycpLFxuICAgIGNvcHlTeW1ib2xzSW4gPSByZXF1aXJlKCcuL19jb3B5U3ltYm9sc0luJyksXG4gICAgZ2V0QWxsS2V5cyA9IHJlcXVpcmUoJy4vX2dldEFsbEtleXMnKSxcbiAgICBnZXRBbGxLZXlzSW4gPSByZXF1aXJlKCcuL19nZXRBbGxLZXlzSW4nKSxcbiAgICBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpbml0Q2xvbmVBcnJheSA9IHJlcXVpcmUoJy4vX2luaXRDbG9uZUFycmF5JyksXG4gICAgaW5pdENsb25lQnlUYWcgPSByZXF1aXJlKCcuL19pbml0Q2xvbmVCeVRhZycpLFxuICAgIGluaXRDbG9uZU9iamVjdCA9IHJlcXVpcmUoJy4vX2luaXRDbG9uZU9iamVjdCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJy4vaXNCdWZmZXInKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNsb25pbmcuICovXG52YXIgQ0xPTkVfREVFUF9GTEFHID0gMSxcbiAgICBDTE9ORV9GTEFUX0ZMQUcgPSAyLFxuICAgIENMT05FX1NZTUJPTFNfRkxBRyA9IDQ7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgc3VwcG9ydGVkIGJ5IGBfLmNsb25lYC4gKi9cbnZhciBjbG9uZWFibGVUYWdzID0ge307XG5jbG9uZWFibGVUYWdzW2FyZ3NUYWddID0gY2xvbmVhYmxlVGFnc1thcnJheVRhZ10gPVxuY2xvbmVhYmxlVGFnc1thcnJheUJ1ZmZlclRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGFWaWV3VGFnXSA9XG5jbG9uZWFibGVUYWdzW2Jvb2xUYWddID0gY2xvbmVhYmxlVGFnc1tkYXRlVGFnXSA9XG5jbG9uZWFibGVUYWdzW2Zsb2F0MzJUYWddID0gY2xvbmVhYmxlVGFnc1tmbG9hdDY0VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDhUYWddID0gY2xvbmVhYmxlVGFnc1tpbnQxNlRhZ10gPVxuY2xvbmVhYmxlVGFnc1tpbnQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW21hcFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tudW1iZXJUYWddID0gY2xvbmVhYmxlVGFnc1tvYmplY3RUYWddID1cbmNsb25lYWJsZVRhZ3NbcmVnZXhwVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc2V0VGFnXSA9XG5jbG9uZWFibGVUYWdzW3N0cmluZ1RhZ10gPSBjbG9uZWFibGVUYWdzW3N5bWJvbFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50MTZUYWddID0gY2xvbmVhYmxlVGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbmNsb25lYWJsZVRhZ3NbZXJyb3JUYWddID0gY2xvbmVhYmxlVGFnc1tmdW5jVGFnXSA9XG5jbG9uZWFibGVUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY2xvbmVgIGFuZCBgXy5jbG9uZURlZXBgIHdoaWNoIHRyYWNrc1xuICogdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLlxuICogIDEgLSBEZWVwIGNsb25lXG4gKiAgMiAtIEZsYXR0ZW4gaW5oZXJpdGVkIHByb3BlcnRpZXNcbiAqICA0IC0gQ2xvbmUgc3ltYm9sc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY2xvbmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBba2V5XSBUaGUga2V5IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIHBhcmVudCBvYmplY3Qgb2YgYHZhbHVlYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBhbmQgdGhlaXIgY2xvbmUgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGNsb25lZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUNsb25lKHZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBrZXksIG9iamVjdCwgc3RhY2spIHtcbiAgdmFyIHJlc3VsdCxcbiAgICAgIGlzRGVlcCA9IGJpdG1hc2sgJiBDTE9ORV9ERUVQX0ZMQUcsXG4gICAgICBpc0ZsYXQgPSBiaXRtYXNrICYgQ0xPTkVfRkxBVF9GTEFHLFxuICAgICAgaXNGdWxsID0gYml0bWFzayAmIENMT05FX1NZTUJPTFNfRkxBRztcblxuICBpZiAoY3VzdG9taXplcikge1xuICAgIHJlc3VsdCA9IG9iamVjdCA/IGN1c3RvbWl6ZXIodmFsdWUsIGtleSwgb2JqZWN0LCBzdGFjaykgOiBjdXN0b21pemVyKHZhbHVlKTtcbiAgfVxuICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpO1xuICBpZiAoaXNBcnIpIHtcbiAgICByZXN1bHQgPSBpbml0Q2xvbmVBcnJheSh2YWx1ZSk7XG4gICAgaWYgKCFpc0RlZXApIHtcbiAgICAgIHJldHVybiBjb3B5QXJyYXkodmFsdWUsIHJlc3VsdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgICBpc0Z1bmMgPSB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xuXG4gICAgaWYgKGlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGNsb25lQnVmZmVyKHZhbHVlLCBpc0RlZXApO1xuICAgIH1cbiAgICBpZiAodGFnID09IG9iamVjdFRhZyB8fCB0YWcgPT0gYXJnc1RhZyB8fCAoaXNGdW5jICYmICFvYmplY3QpKSB7XG4gICAgICByZXN1bHQgPSAoaXNGbGF0IHx8IGlzRnVuYykgPyB7fSA6IGluaXRDbG9uZU9iamVjdCh2YWx1ZSk7XG4gICAgICBpZiAoIWlzRGVlcCkge1xuICAgICAgICByZXR1cm4gaXNGbGF0XG4gICAgICAgICAgPyBjb3B5U3ltYm9sc0luKHZhbHVlLCBiYXNlQXNzaWduSW4ocmVzdWx0LCB2YWx1ZSkpXG4gICAgICAgICAgOiBjb3B5U3ltYm9scyh2YWx1ZSwgYmFzZUFzc2lnbihyZXN1bHQsIHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghY2xvbmVhYmxlVGFnc1t0YWddKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPyB2YWx1ZSA6IHt9O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gaW5pdENsb25lQnlUYWcodmFsdWUsIHRhZywgYmFzZUNsb25lLCBpc0RlZXApO1xuICAgIH1cbiAgfVxuICAvLyBDaGVjayBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlcyBhbmQgcmV0dXJuIGl0cyBjb3JyZXNwb25kaW5nIGNsb25lLlxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldCh2YWx1ZSk7XG4gIGlmIChzdGFja2VkKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQ7XG4gIH1cbiAgc3RhY2suc2V0KHZhbHVlLCByZXN1bHQpO1xuXG4gIHZhciBrZXlzRnVuYyA9IGlzRnVsbFxuICAgID8gKGlzRmxhdCA/IGdldEFsbEtleXNJbiA6IGdldEFsbEtleXMpXG4gICAgOiAoaXNGbGF0ID8ga2V5c0luIDoga2V5cyk7XG5cbiAgdmFyIHByb3BzID0gaXNBcnIgPyB1bmRlZmluZWQgOiBrZXlzRnVuYyh2YWx1ZSk7XG4gIGFycmF5RWFjaChwcm9wcyB8fCB2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3ViVmFsdWU7XG4gICAgICBzdWJWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IHBvcHVsYXRlIGNsb25lIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgYXNzaWduVmFsdWUocmVzdWx0LCBrZXksIGJhc2VDbG9uZShzdWJWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwga2V5LCB2YWx1ZSwgc3RhY2spKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNsb25lO1xuIl19