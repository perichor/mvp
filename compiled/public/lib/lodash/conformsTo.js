'use strict';

var baseConformsTo = require('./_baseConformsTo'),
    keys = require('./keys');

/**
 * Checks if `object` conforms to `source` by invoking the predicate
 * properties of `source` with the corresponding property values of `object`.
 *
 * **Note:** This method is equivalent to `_.conforms` when `source` is
 * partially applied.
 *
 * @static
 * @memberOf _
 * @since 4.14.0
 * @category Lang
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 *
 * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
 * // => true
 *
 * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
 * // => false
 */
function conformsTo(object, source) {
  return source == null || baseConformsTo(object, source, keys(source));
}

module.exports = conformsTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2NvbmZvcm1zVG8uanMiXSwibmFtZXMiOlsiYmFzZUNvbmZvcm1zVG8iLCJyZXF1aXJlIiwia2V5cyIsImNvbmZvcm1zVG8iLCJvYmplY3QiLCJzb3VyY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGlCQUFpQkMsUUFBUSxtQkFBUixDQUFyQjtBQUFBLElBQ0lDLE9BQU9ELFFBQVEsUUFBUixDQURYOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsU0FBU0UsVUFBVCxDQUFvQkMsTUFBcEIsRUFBNEJDLE1BQTVCLEVBQW9DO0FBQ2xDLFNBQU9BLFVBQVUsSUFBVixJQUFrQkwsZUFBZUksTUFBZixFQUF1QkMsTUFBdkIsRUFBK0JILEtBQUtHLE1BQUwsQ0FBL0IsQ0FBekI7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQkosVUFBakIiLCJmaWxlIjoiY29uZm9ybXNUby5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlQ29uZm9ybXNUbyA9IHJlcXVpcmUoJy4vX2Jhc2VDb25mb3Jtc1RvJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgb2JqZWN0YCBjb25mb3JtcyB0byBgc291cmNlYCBieSBpbnZva2luZyB0aGUgcHJlZGljYXRlXG4gKiBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgdmFsdWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBlcXVpdmFsZW50IHRvIGBfLmNvbmZvcm1zYCB3aGVuIGBzb3VyY2VgIGlzXG4gKiBwYXJ0aWFsbHkgYXBwbGllZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTQuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHByZWRpY2F0ZXMgdG8gY29uZm9ybSB0by5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgb2JqZWN0YCBjb25mb3JtcywgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICpcbiAqIF8uY29uZm9ybXNUbyhvYmplY3QsIHsgJ2InOiBmdW5jdGlvbihuKSB7IHJldHVybiBuID4gMTsgfSB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmNvbmZvcm1zVG8ob2JqZWN0LCB7ICdiJzogZnVuY3Rpb24obikgeyByZXR1cm4gbiA+IDI7IH0gfSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBjb25mb3Jtc1RvKG9iamVjdCwgc291cmNlKSB7XG4gIHJldHVybiBzb3VyY2UgPT0gbnVsbCB8fCBiYXNlQ29uZm9ybXNUbyhvYmplY3QsIHNvdXJjZSwga2V5cyhzb3VyY2UpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25mb3Jtc1RvO1xuIl19