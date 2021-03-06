'use strict';

var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var regexpTag = '[object RegExp]';

/**
 * The base implementation of `_.isRegExp` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 */
function baseIsRegExp(value) {
  return isObjectLike(value) && baseGetTag(value) == regexpTag;
}

module.exports = baseIsRegExp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlSXNSZWdFeHAuanMiXSwibmFtZXMiOlsiYmFzZUdldFRhZyIsInJlcXVpcmUiLCJpc09iamVjdExpa2UiLCJyZWdleHBUYWciLCJiYXNlSXNSZWdFeHAiLCJ2YWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsYUFBYUMsUUFBUSxlQUFSLENBQWpCO0FBQUEsSUFDSUMsZUFBZUQsUUFBUSxnQkFBUixDQURuQjs7QUFHQTtBQUNBLElBQUlFLFlBQVksaUJBQWhCOztBQUVBOzs7Ozs7O0FBT0EsU0FBU0MsWUFBVCxDQUFzQkMsS0FBdEIsRUFBNkI7QUFDM0IsU0FBT0gsYUFBYUcsS0FBYixLQUF1QkwsV0FBV0ssS0FBWCxLQUFxQkYsU0FBbkQ7QUFDRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQkgsWUFBakIiLCJmaWxlIjoiX2Jhc2VJc1JlZ0V4cC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1JlZ0V4cGAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSByZWdleHAsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzUmVnRXhwKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHJlZ2V4cFRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNSZWdFeHA7XG4iXX0=