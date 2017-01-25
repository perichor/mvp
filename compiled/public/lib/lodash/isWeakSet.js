'use strict';

var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var weakSetTag = '[object WeakSet]';

/**
 * Checks if `value` is classified as a `WeakSet` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
 * @example
 *
 * _.isWeakSet(new WeakSet);
 * // => true
 *
 * _.isWeakSet(new Set);
 * // => false
 */
function isWeakSet(value) {
  return isObjectLike(value) && baseGetTag(value) == weakSetTag;
}

module.exports = isWeakSet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2lzV2Vha1NldC5qcyJdLCJuYW1lcyI6WyJiYXNlR2V0VGFnIiwicmVxdWlyZSIsImlzT2JqZWN0TGlrZSIsIndlYWtTZXRUYWciLCJpc1dlYWtTZXQiLCJ2YWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsYUFBYUMsUUFBUSxlQUFSLENBQWpCO0FBQUEsSUFDSUMsZUFBZUQsUUFBUSxnQkFBUixDQURuQjs7QUFHQTtBQUNBLElBQUlFLGFBQWEsa0JBQWpCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxTQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUN4QixTQUFPSCxhQUFhRyxLQUFiLEtBQXVCTCxXQUFXSyxLQUFYLEtBQXFCRixVQUFuRDtBQUNEOztBQUVERyxPQUFPQyxPQUFQLEdBQWlCSCxTQUFqQiIsImZpbGUiOiJpc1dlYWtTZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgd2Vha1NldFRhZyA9ICdbb2JqZWN0IFdlYWtTZXRdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFdlYWtTZXRgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHdlYWsgc2V0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNXZWFrU2V0KG5ldyBXZWFrU2V0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzV2Vha1NldChuZXcgU2V0KTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzV2Vha1NldCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSB3ZWFrU2V0VGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzV2Vha1NldDtcbiJdfQ==