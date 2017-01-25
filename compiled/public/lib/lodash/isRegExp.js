'use strict';

var baseIsRegExp = require('./_baseIsRegExp'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsRegExp = nodeUtil && nodeUtil.isRegExp;

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * _.isRegExp(/abc/);
 * // => true
 *
 * _.isRegExp('/abc/');
 * // => false
 */
var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

module.exports = isRegExp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2lzUmVnRXhwLmpzIl0sIm5hbWVzIjpbImJhc2VJc1JlZ0V4cCIsInJlcXVpcmUiLCJiYXNlVW5hcnkiLCJub2RlVXRpbCIsIm5vZGVJc1JlZ0V4cCIsImlzUmVnRXhwIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5CO0FBQUEsSUFDSUMsWUFBWUQsUUFBUSxjQUFSLENBRGhCO0FBQUEsSUFFSUUsV0FBV0YsUUFBUSxhQUFSLENBRmY7O0FBSUE7QUFDQSxJQUFJRyxlQUFlRCxZQUFZQSxTQUFTRSxRQUF4Qzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsSUFBSUEsV0FBV0QsZUFBZUYsVUFBVUUsWUFBVixDQUFmLEdBQXlDSixZQUF4RDs7QUFFQU0sT0FBT0MsT0FBUCxHQUFpQkYsUUFBakIiLCJmaWxlIjoiaXNSZWdFeHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUlzUmVnRXhwID0gcmVxdWlyZSgnLi9fYmFzZUlzUmVnRXhwJyksXG4gICAgYmFzZVVuYXJ5ID0gcmVxdWlyZSgnLi9fYmFzZVVuYXJ5JyksXG4gICAgbm9kZVV0aWwgPSByZXF1aXJlKCcuL19ub2RlVXRpbCcpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1JlZ0V4cCA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzUmVnRXhwO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgUmVnRXhwYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSByZWdleHAsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1JlZ0V4cCgvYWJjLyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1JlZ0V4cCgnL2FiYy8nKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1JlZ0V4cCA9IG5vZGVJc1JlZ0V4cCA/IGJhc2VVbmFyeShub2RlSXNSZWdFeHApIDogYmFzZUlzUmVnRXhwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUmVnRXhwO1xuIl19