'use strict';

var baseClone = require('./_baseClone'),
    baseMatches = require('./_baseMatches');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a function that performs a partial deep comparison between a given
 * object and `source`, returning `true` if the given object has equivalent
 * property values, else `false`.
 *
 * **Note:** The created function is equivalent to `_.isMatch` with `source`
 * partially applied.
 *
 * Partial comparisons will match empty array and empty object `source`
 * values against any array or object value, respectively. See `_.isEqual`
 * for a list of supported value comparisons.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Util
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 * @example
 *
 * var objects = [
 *   { 'a': 1, 'b': 2, 'c': 3 },
 *   { 'a': 4, 'b': 5, 'c': 6 }
 * ];
 *
 * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
 * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
 */
function matches(source) {
  return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
}

module.exports = matches;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL21hdGNoZXMuanMiXSwibmFtZXMiOlsiYmFzZUNsb25lIiwicmVxdWlyZSIsImJhc2VNYXRjaGVzIiwiQ0xPTkVfREVFUF9GTEFHIiwibWF0Y2hlcyIsInNvdXJjZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsWUFBWUMsUUFBUSxjQUFSLENBQWhCO0FBQUEsSUFDSUMsY0FBY0QsUUFBUSxnQkFBUixDQURsQjs7QUFHQTtBQUNBLElBQUlFLGtCQUFrQixDQUF0Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxTQUFTQyxPQUFULENBQWlCQyxNQUFqQixFQUF5QjtBQUN2QixTQUFPSCxZQUFZRixVQUFVSyxNQUFWLEVBQWtCRixlQUFsQixDQUFaLENBQVA7QUFDRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQkgsT0FBakIiLCJmaWxlIjoibWF0Y2hlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlQ2xvbmUgPSByZXF1aXJlKCcuL19iYXNlQ2xvbmUnKSxcbiAgICBiYXNlTWF0Y2hlcyA9IHJlcXVpcmUoJy4vX2Jhc2VNYXRjaGVzJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIGNsb25pbmcuICovXG52YXIgQ0xPTkVfREVFUF9GTEFHID0gMTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBwZXJmb3JtcyBhIHBhcnRpYWwgZGVlcCBjb21wYXJpc29uIGJldHdlZW4gYSBnaXZlblxuICogb2JqZWN0IGFuZCBgc291cmNlYCwgcmV0dXJuaW5nIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGhhcyBlcXVpdmFsZW50XG4gKiBwcm9wZXJ0eSB2YWx1ZXMsIGVsc2UgYGZhbHNlYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIGNyZWF0ZWQgZnVuY3Rpb24gaXMgZXF1aXZhbGVudCB0byBgXy5pc01hdGNoYCB3aXRoIGBzb3VyY2VgXG4gKiBwYXJ0aWFsbHkgYXBwbGllZC5cbiAqXG4gKiBQYXJ0aWFsIGNvbXBhcmlzb25zIHdpbGwgbWF0Y2ggZW1wdHkgYXJyYXkgYW5kIGVtcHR5IG9iamVjdCBgc291cmNlYFxuICogdmFsdWVzIGFnYWluc3QgYW55IGFycmF5IG9yIG9iamVjdCB2YWx1ZSwgcmVzcGVjdGl2ZWx5LiBTZWUgYF8uaXNFcXVhbGBcbiAqIGZvciBhIGxpc3Qgb2Ygc3VwcG9ydGVkIHZhbHVlIGNvbXBhcmlzb25zLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBbXG4gKiAgIHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9LFxuICogICB7ICdhJzogNCwgJ2InOiA1LCAnYyc6IDYgfVxuICogXTtcbiAqXG4gKiBfLmZpbHRlcihvYmplY3RzLCBfLm1hdGNoZXMoeyAnYSc6IDQsICdjJzogNiB9KSk7XG4gKiAvLyA9PiBbeyAnYSc6IDQsICdiJzogNSwgJ2MnOiA2IH1dXG4gKi9cbmZ1bmN0aW9uIG1hdGNoZXMoc291cmNlKSB7XG4gIHJldHVybiBiYXNlTWF0Y2hlcyhiYXNlQ2xvbmUoc291cmNlLCBDTE9ORV9ERUVQX0ZMQUcpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXRjaGVzO1xuIl19