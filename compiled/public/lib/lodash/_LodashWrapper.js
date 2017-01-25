'use strict';

var baseCreate = require('./_baseCreate'),
    baseLodash = require('./_baseLodash');

/**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

module.exports = LodashWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19Mb2Rhc2hXcmFwcGVyLmpzIl0sIm5hbWVzIjpbImJhc2VDcmVhdGUiLCJyZXF1aXJlIiwiYmFzZUxvZGFzaCIsIkxvZGFzaFdyYXBwZXIiLCJ2YWx1ZSIsImNoYWluQWxsIiwiX193cmFwcGVkX18iLCJfX2FjdGlvbnNfXyIsIl9fY2hhaW5fXyIsIl9faW5kZXhfXyIsIl9fdmFsdWVzX18iLCJ1bmRlZmluZWQiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsYUFBYUMsUUFBUSxlQUFSLENBQWpCO0FBQUEsSUFDSUMsYUFBYUQsUUFBUSxlQUFSLENBRGpCOztBQUdBOzs7Ozs7O0FBT0EsU0FBU0UsYUFBVCxDQUF1QkMsS0FBdkIsRUFBOEJDLFFBQTlCLEVBQXdDO0FBQ3RDLE9BQUtDLFdBQUwsR0FBbUJGLEtBQW5CO0FBQ0EsT0FBS0csV0FBTCxHQUFtQixFQUFuQjtBQUNBLE9BQUtDLFNBQUwsR0FBaUIsQ0FBQyxDQUFDSCxRQUFuQjtBQUNBLE9BQUtJLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCQyxTQUFsQjtBQUNEOztBQUVEUixjQUFjUyxTQUFkLEdBQTBCWixXQUFXRSxXQUFXVSxTQUF0QixDQUExQjtBQUNBVCxjQUFjUyxTQUFkLENBQXdCQyxXQUF4QixHQUFzQ1YsYUFBdEM7O0FBRUFXLE9BQU9DLE9BQVAsR0FBaUJaLGFBQWpCIiwiZmlsZSI6Il9Mb2Rhc2hXcmFwcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VDcmVhdGUgPSByZXF1aXJlKCcuL19iYXNlQ3JlYXRlJyksXG4gICAgYmFzZUxvZGFzaCA9IHJlcXVpcmUoJy4vX2Jhc2VMb2Rhc2gnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBjb25zdHJ1Y3RvciBmb3IgY3JlYXRpbmcgYGxvZGFzaGAgd3JhcHBlciBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byB3cmFwLlxuICogQHBhcmFtIHtib29sZWFufSBbY2hhaW5BbGxdIEVuYWJsZSBleHBsaWNpdCBtZXRob2QgY2hhaW4gc2VxdWVuY2VzLlxuICovXG5mdW5jdGlvbiBMb2Rhc2hXcmFwcGVyKHZhbHVlLCBjaGFpbkFsbCkge1xuICB0aGlzLl9fd3JhcHBlZF9fID0gdmFsdWU7XG4gIHRoaXMuX19hY3Rpb25zX18gPSBbXTtcbiAgdGhpcy5fX2NoYWluX18gPSAhIWNoYWluQWxsO1xuICB0aGlzLl9faW5kZXhfXyA9IDA7XG4gIHRoaXMuX192YWx1ZXNfXyA9IHVuZGVmaW5lZDtcbn1cblxuTG9kYXNoV3JhcHBlci5wcm90b3R5cGUgPSBiYXNlQ3JlYXRlKGJhc2VMb2Rhc2gucHJvdG90eXBlKTtcbkxvZGFzaFdyYXBwZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTG9kYXNoV3JhcHBlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBMb2Rhc2hXcmFwcGVyO1xuIl19