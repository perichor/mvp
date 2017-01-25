'use strict';

var baseIsArrayBuffer = require('./_baseIsArrayBuffer'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer;

/**
 * Checks if `value` is classified as an `ArrayBuffer` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
 * @example
 *
 * _.isArrayBuffer(new ArrayBuffer(2));
 * // => true
 *
 * _.isArrayBuffer(new Array(2));
 * // => false
 */
var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

module.exports = isArrayBuffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2lzQXJyYXlCdWZmZXIuanMiXSwibmFtZXMiOlsiYmFzZUlzQXJyYXlCdWZmZXIiLCJyZXF1aXJlIiwiYmFzZVVuYXJ5Iiwibm9kZVV0aWwiLCJub2RlSXNBcnJheUJ1ZmZlciIsImlzQXJyYXlCdWZmZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLG9CQUFvQkMsUUFBUSxzQkFBUixDQUF4QjtBQUFBLElBQ0lDLFlBQVlELFFBQVEsY0FBUixDQURoQjtBQUFBLElBRUlFLFdBQVdGLFFBQVEsYUFBUixDQUZmOztBQUlBO0FBQ0EsSUFBSUcsb0JBQW9CRCxZQUFZQSxTQUFTRSxhQUE3Qzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsSUFBSUEsZ0JBQWdCRCxvQkFBb0JGLFVBQVVFLGlCQUFWLENBQXBCLEdBQW1ESixpQkFBdkU7O0FBRUFNLE9BQU9DLE9BQVAsR0FBaUJGLGFBQWpCIiwiZmlsZSI6ImlzQXJyYXlCdWZmZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUlzQXJyYXlCdWZmZXIgPSByZXF1aXJlKCcuL19iYXNlSXNBcnJheUJ1ZmZlcicpLFxuICAgIGJhc2VVbmFyeSA9IHJlcXVpcmUoJy4vX2Jhc2VVbmFyeScpLFxuICAgIG5vZGVVdGlsID0gcmVxdWlyZSgnLi9fbm9kZVV0aWwnKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNBcnJheUJ1ZmZlciA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzQXJyYXlCdWZmZXI7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlCdWZmZXJgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5QnVmZmVyKG5ldyBBcnJheUJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5QnVmZmVyKG5ldyBBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheUJ1ZmZlciA9IG5vZGVJc0FycmF5QnVmZmVyID8gYmFzZVVuYXJ5KG5vZGVJc0FycmF5QnVmZmVyKSA6IGJhc2VJc0FycmF5QnVmZmVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXlCdWZmZXI7XG4iXX0=