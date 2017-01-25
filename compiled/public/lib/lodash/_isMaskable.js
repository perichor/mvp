'use strict';

var coreJsData = require('./_coreJsData'),
    isFunction = require('./isFunction'),
    stubFalse = require('./stubFalse');

/**
 * Checks if `func` is capable of being masked.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
 */
var isMaskable = coreJsData ? isFunction : stubFalse;

module.exports = isMaskable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19pc01hc2thYmxlLmpzIl0sIm5hbWVzIjpbImNvcmVKc0RhdGEiLCJyZXF1aXJlIiwiaXNGdW5jdGlvbiIsInN0dWJGYWxzZSIsImlzTWFza2FibGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGFBQWFDLFFBQVEsZUFBUixDQUFqQjtBQUFBLElBQ0lDLGFBQWFELFFBQVEsY0FBUixDQURqQjtBQUFBLElBRUlFLFlBQVlGLFFBQVEsYUFBUixDQUZoQjs7QUFJQTs7Ozs7OztBQU9BLElBQUlHLGFBQWFKLGFBQWFFLFVBQWIsR0FBMEJDLFNBQTNDOztBQUVBRSxPQUFPQyxPQUFQLEdBQWlCRixVQUFqQiIsImZpbGUiOiJfaXNNYXNrYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjb3JlSnNEYXRhID0gcmVxdWlyZSgnLi9fY29yZUpzRGF0YScpLFxuICAgIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBzdHViRmFsc2UgPSByZXF1aXJlKCcuL3N0dWJGYWxzZScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaXMgY2FwYWJsZSBvZiBiZWluZyBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrYWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG52YXIgaXNNYXNrYWJsZSA9IGNvcmVKc0RhdGEgPyBpc0Z1bmN0aW9uIDogc3R1YkZhbHNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTWFza2FibGU7XG4iXX0=