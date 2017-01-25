'use strict';

var getTag = require('./_getTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var weakMapTag = '[object WeakMap]';

/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
 * @example
 *
 * _.isWeakMap(new WeakMap);
 * // => true
 *
 * _.isWeakMap(new Map);
 * // => false
 */
function isWeakMap(value) {
  return isObjectLike(value) && getTag(value) == weakMapTag;
}

module.exports = isWeakMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2lzV2Vha01hcC5qcyJdLCJuYW1lcyI6WyJnZXRUYWciLCJyZXF1aXJlIiwiaXNPYmplY3RMaWtlIiwid2Vha01hcFRhZyIsImlzV2Vha01hcCIsInZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxTQUFTQyxRQUFRLFdBQVIsQ0FBYjtBQUFBLElBQ0lDLGVBQWVELFFBQVEsZ0JBQVIsQ0FEbkI7O0FBR0E7QUFDQSxJQUFJRSxhQUFhLGtCQUFqQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEI7QUFDeEIsU0FBT0gsYUFBYUcsS0FBYixLQUF1QkwsT0FBT0ssS0FBUCxLQUFpQkYsVUFBL0M7QUFDRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQkgsU0FBakIiLCJmaWxlIjoiaXNXZWFrTWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGdldFRhZyA9IHJlcXVpcmUoJy4vX2dldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgV2Vha01hcGAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgd2VhayBtYXAsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1dlYWtNYXAobmV3IFdlYWtNYXApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNXZWFrTWFwKG5ldyBNYXApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNXZWFrTWFwKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGdldFRhZyh2YWx1ZSkgPT0gd2Vha01hcFRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1dlYWtNYXA7XG4iXX0=