'use strict';

var isInteger = require('./isInteger');

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
 * double precision number which isn't the result of a rounded unsafe integer.
 *
 * **Note:** This method is based on
 * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
 * @example
 *
 * _.isSafeInteger(3);
 * // => true
 *
 * _.isSafeInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isSafeInteger(Infinity);
 * // => false
 *
 * _.isSafeInteger('3');
 * // => false
 */
function isSafeInteger(value) {
  return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
}

module.exports = isSafeInteger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2lzU2FmZUludGVnZXIuanMiXSwibmFtZXMiOlsiaXNJbnRlZ2VyIiwicmVxdWlyZSIsIk1BWF9TQUZFX0lOVEVHRVIiLCJpc1NhZmVJbnRlZ2VyIiwidmFsdWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVlDLFFBQVEsYUFBUixDQUFoQjs7QUFFQTtBQUNBLElBQUlDLG1CQUFtQixnQkFBdkI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxTQUFTQyxhQUFULENBQXVCQyxLQUF2QixFQUE4QjtBQUM1QixTQUFPSixVQUFVSSxLQUFWLEtBQW9CQSxTQUFTLENBQUNGLGdCQUE5QixJQUFrREUsU0FBU0YsZ0JBQWxFO0FBQ0Q7O0FBRURHLE9BQU9DLE9BQVAsR0FBaUJILGFBQWpCIiwiZmlsZSI6ImlzU2FmZUludGVnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaXNJbnRlZ2VyID0gcmVxdWlyZSgnLi9pc0ludGVnZXInKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBzYWZlIGludGVnZXIuIEFuIGludGVnZXIgaXMgc2FmZSBpZiBpdCdzIGFuIElFRUUtNzU0XG4gKiBkb3VibGUgcHJlY2lzaW9uIG51bWJlciB3aGljaCBpc24ndCB0aGUgcmVzdWx0IG9mIGEgcm91bmRlZCB1bnNhZmUgaW50ZWdlci5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgYmFzZWQgb25cbiAqIFtgTnVtYmVyLmlzU2FmZUludGVnZXJgXShodHRwczovL21kbi5pby9OdW1iZXIvaXNTYWZlSW50ZWdlcikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzYWZlIGludGVnZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1NhZmVJbnRlZ2VyKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTYWZlSW50ZWdlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1NhZmVJbnRlZ2VyKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1NhZmVJbnRlZ2VyKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1NhZmVJbnRlZ2VyKHZhbHVlKSB7XG4gIHJldHVybiBpc0ludGVnZXIodmFsdWUpICYmIHZhbHVlID49IC1NQVhfU0FGRV9JTlRFR0VSICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTYWZlSW50ZWdlcjtcbiJdfQ==