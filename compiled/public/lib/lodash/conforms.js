'use strict';

var baseClone = require('./_baseClone'),
    baseConforms = require('./_baseConforms');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a function that invokes the predicate properties of `source` with
 * the corresponding property values of a given object, returning `true` if
 * all predicates return truthy, else `false`.
 *
 * **Note:** The created function is equivalent to `_.conformsTo` with
 * `source` partially applied.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new spec function.
 * @example
 *
 * var objects = [
 *   { 'a': 2, 'b': 1 },
 *   { 'a': 1, 'b': 2 }
 * ];
 *
 * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
 * // => [{ 'a': 1, 'b': 2 }]
 */
function conforms(source) {
  return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
}

module.exports = conforms;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2NvbmZvcm1zLmpzIl0sIm5hbWVzIjpbImJhc2VDbG9uZSIsInJlcXVpcmUiLCJiYXNlQ29uZm9ybXMiLCJDTE9ORV9ERUVQX0ZMQUciLCJjb25mb3JtcyIsInNvdXJjZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsWUFBWUMsUUFBUSxjQUFSLENBQWhCO0FBQUEsSUFDSUMsZUFBZUQsUUFBUSxpQkFBUixDQURuQjs7QUFHQTtBQUNBLElBQUlFLGtCQUFrQixDQUF0Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLFNBQVNDLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0FBQ3hCLFNBQU9ILGFBQWFGLFVBQVVLLE1BQVYsRUFBa0JGLGVBQWxCLENBQWIsQ0FBUDtBQUNEOztBQUVERyxPQUFPQyxPQUFQLEdBQWlCSCxRQUFqQiIsImZpbGUiOiJjb25mb3Jtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlQ2xvbmUgPSByZXF1aXJlKCcuL19iYXNlQ2xvbmUnKSxcbiAgICBiYXNlQ29uZm9ybXMgPSByZXF1aXJlKCcuL19iYXNlQ29uZm9ybXMnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY2xvbmluZy4gKi9cbnZhciBDTE9ORV9ERUVQX0ZMQUcgPSAxO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdGhlIHByZWRpY2F0ZSBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHdpdGhcbiAqIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnR5IHZhbHVlcyBvZiBhIGdpdmVuIG9iamVjdCwgcmV0dXJuaW5nIGB0cnVlYCBpZlxuICogYWxsIHByZWRpY2F0ZXMgcmV0dXJuIHRydXRoeSwgZWxzZSBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBUaGUgY3JlYXRlZCBmdW5jdGlvbiBpcyBlcXVpdmFsZW50IHRvIGBfLmNvbmZvcm1zVG9gIHdpdGhcbiAqIGBzb3VyY2VgIHBhcnRpYWxseSBhcHBsaWVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgcHJlZGljYXRlcyB0byBjb25mb3JtIHRvLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBbXG4gKiAgIHsgJ2EnOiAyLCAnYic6IDEgfSxcbiAqICAgeyAnYSc6IDEsICdiJzogMiB9XG4gKiBdO1xuICpcbiAqIF8uZmlsdGVyKG9iamVjdHMsIF8uY29uZm9ybXMoeyAnYic6IGZ1bmN0aW9uKG4pIHsgcmV0dXJuIG4gPiAxOyB9IH0pKTtcbiAqIC8vID0+IFt7ICdhJzogMSwgJ2InOiAyIH1dXG4gKi9cbmZ1bmN0aW9uIGNvbmZvcm1zKHNvdXJjZSkge1xuICByZXR1cm4gYmFzZUNvbmZvcm1zKGJhc2VDbG9uZShzb3VyY2UsIENMT05FX0RFRVBfRkxBRykpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmZvcm1zO1xuIl19