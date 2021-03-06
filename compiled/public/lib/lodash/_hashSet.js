'use strict';

var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19oYXNoU2V0LmpzIl0sIm5hbWVzIjpbIm5hdGl2ZUNyZWF0ZSIsInJlcXVpcmUiLCJIQVNIX1VOREVGSU5FRCIsImhhc2hTZXQiLCJrZXkiLCJ2YWx1ZSIsImRhdGEiLCJfX2RhdGFfXyIsInNpemUiLCJoYXMiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGVBQWVDLFFBQVEsaUJBQVIsQ0FBbkI7O0FBRUE7QUFDQSxJQUFJQyxpQkFBaUIsMkJBQXJCOztBQUVBOzs7Ozs7Ozs7O0FBVUEsU0FBU0MsT0FBVCxDQUFpQkMsR0FBakIsRUFBc0JDLEtBQXRCLEVBQTZCO0FBQzNCLE1BQUlDLE9BQU8sS0FBS0MsUUFBaEI7QUFDQSxPQUFLQyxJQUFMLElBQWEsS0FBS0MsR0FBTCxDQUFTTCxHQUFULElBQWdCLENBQWhCLEdBQW9CLENBQWpDO0FBQ0FFLE9BQUtGLEdBQUwsSUFBYUosZ0JBQWdCSyxVQUFVSyxTQUEzQixHQUF3Q1IsY0FBeEMsR0FBeURHLEtBQXJFO0FBQ0EsU0FBTyxJQUFQO0FBQ0Q7O0FBRURNLE9BQU9DLE9BQVAsR0FBaUJULE9BQWpCIiwiZmlsZSI6Il9oYXNoU2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHRoaXMuc2l6ZSArPSB0aGlzLmhhcyhrZXkpID8gMCA6IDE7XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoU2V0O1xuIl19