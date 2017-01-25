'use strict';

var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike'),
    isPlainObject = require('./isPlainObject');

/** `Object#toString` result references. */
var domExcTag = '[object DOMException]',
    errorTag = '[object Error]';

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * _.isError(new Error);
 * // => true
 *
 * _.isError(Error);
 * // => false
 */
function isError(value) {
    if (!isObjectLike(value)) {
        return false;
    }
    var tag = baseGetTag(value);
    return tag == errorTag || tag == domExcTag || typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value);
}

module.exports = isError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2lzRXJyb3IuanMiXSwibmFtZXMiOlsiYmFzZUdldFRhZyIsInJlcXVpcmUiLCJpc09iamVjdExpa2UiLCJpc1BsYWluT2JqZWN0IiwiZG9tRXhjVGFnIiwiZXJyb3JUYWciLCJpc0Vycm9yIiwidmFsdWUiLCJ0YWciLCJtZXNzYWdlIiwibmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsYUFBYUMsUUFBUSxlQUFSLENBQWpCO0FBQUEsSUFDSUMsZUFBZUQsUUFBUSxnQkFBUixDQURuQjtBQUFBLElBRUlFLGdCQUFnQkYsUUFBUSxpQkFBUixDQUZwQjs7QUFJQTtBQUNBLElBQUlHLFlBQVksdUJBQWhCO0FBQUEsSUFDSUMsV0FBVyxnQkFEZjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLFNBQVNDLE9BQVQsQ0FBaUJDLEtBQWpCLEVBQXdCO0FBQ3RCLFFBQUksQ0FBQ0wsYUFBYUssS0FBYixDQUFMLEVBQTBCO0FBQ3hCLGVBQU8sS0FBUDtBQUNEO0FBQ0QsUUFBSUMsTUFBTVIsV0FBV08sS0FBWCxDQUFWO0FBQ0EsV0FBT0MsT0FBT0gsUUFBUCxJQUFtQkcsT0FBT0osU0FBMUIsSUFDSixPQUFPRyxNQUFNRSxPQUFiLElBQXdCLFFBQXhCLElBQW9DLE9BQU9GLE1BQU1HLElBQWIsSUFBcUIsUUFBekQsSUFBcUUsQ0FBQ1AsY0FBY0ksS0FBZCxDQUR6RTtBQUVEOztBQUVESSxPQUFPQyxPQUFQLEdBQWlCTixPQUFqQiIsImZpbGUiOiJpc0Vycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKSxcbiAgICBpc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi9pc1BsYWluT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBkb21FeGNUYWcgPSAnW29iamVjdCBET01FeGNlcHRpb25dJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYW4gYEVycm9yYCwgYEV2YWxFcnJvcmAsIGBSYW5nZUVycm9yYCwgYFJlZmVyZW5jZUVycm9yYCxcbiAqIGBTeW50YXhFcnJvcmAsIGBUeXBlRXJyb3JgLCBvciBgVVJJRXJyb3JgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBlcnJvciBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Vycm9yKG5ldyBFcnJvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Vycm9yKEVycm9yKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRXJyb3IodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBlcnJvclRhZyB8fCB0YWcgPT0gZG9tRXhjVGFnIHx8XG4gICAgKHR5cGVvZiB2YWx1ZS5tZXNzYWdlID09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZS5uYW1lID09ICdzdHJpbmcnICYmICFpc1BsYWluT2JqZWN0KHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFcnJvcjtcbiJdfQ==