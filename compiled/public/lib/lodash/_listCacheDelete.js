'use strict';

var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19saXN0Q2FjaGVEZWxldGUuanMiXSwibmFtZXMiOlsiYXNzb2NJbmRleE9mIiwicmVxdWlyZSIsImFycmF5UHJvdG8iLCJBcnJheSIsInByb3RvdHlwZSIsInNwbGljZSIsImxpc3RDYWNoZURlbGV0ZSIsImtleSIsImRhdGEiLCJfX2RhdGFfXyIsImluZGV4IiwibGFzdEluZGV4IiwibGVuZ3RoIiwicG9wIiwiY2FsbCIsInNpemUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGVBQWVDLFFBQVEsaUJBQVIsQ0FBbkI7O0FBRUE7QUFDQSxJQUFJQyxhQUFhQyxNQUFNQyxTQUF2Qjs7QUFFQTtBQUNBLElBQUlDLFNBQVNILFdBQVdHLE1BQXhCOztBQUVBOzs7Ozs7Ozs7QUFTQSxTQUFTQyxlQUFULENBQXlCQyxHQUF6QixFQUE4QjtBQUM1QixNQUFJQyxPQUFPLEtBQUtDLFFBQWhCO0FBQUEsTUFDSUMsUUFBUVYsYUFBYVEsSUFBYixFQUFtQkQsR0FBbkIsQ0FEWjs7QUFHQSxNQUFJRyxRQUFRLENBQVosRUFBZTtBQUNiLFdBQU8sS0FBUDtBQUNEO0FBQ0QsTUFBSUMsWUFBWUgsS0FBS0ksTUFBTCxHQUFjLENBQTlCO0FBQ0EsTUFBSUYsU0FBU0MsU0FBYixFQUF3QjtBQUN0QkgsU0FBS0ssR0FBTDtBQUNELEdBRkQsTUFFTztBQUNMUixXQUFPUyxJQUFQLENBQVlOLElBQVosRUFBa0JFLEtBQWxCLEVBQXlCLENBQXpCO0FBQ0Q7QUFDRCxJQUFFLEtBQUtLLElBQVA7QUFDQSxTQUFPLElBQVA7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQlgsZUFBakIiLCJmaWxlIjoiX2xpc3RDYWNoZURlbGV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgLS10aGlzLnNpemU7XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZURlbGV0ZTtcbiJdfQ==