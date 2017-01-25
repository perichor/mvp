'use strict';

var baseIsNative = require('./_baseIsNative'),
    isMaskable = require('./_isMaskable');

/** Error message constants. */
var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.';

/**
 * Checks if `value` is a pristine native function.
 *
 * **Note:** This method can't reliably detect native functions in the presence
 * of the core-js package because core-js circumvents this kind of detection.
 * Despite multiple requests, the core-js maintainer has made it clear: any
 * attempt to fix the detection will be obstructed. As a result, we're left
 * with little choice but to throw an error. Unfortunately, this also affects
 * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
 * which rely on core-js.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (isMaskable(value)) {
    throw new Error(CORE_ERROR_TEXT);
  }
  return baseIsNative(value);
}

module.exports = isNative;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2lzTmF0aXZlLmpzIl0sIm5hbWVzIjpbImJhc2VJc05hdGl2ZSIsInJlcXVpcmUiLCJpc01hc2thYmxlIiwiQ09SRV9FUlJPUl9URVhUIiwiaXNOYXRpdmUiLCJ2YWx1ZSIsIkVycm9yIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5CO0FBQUEsSUFDSUMsYUFBYUQsUUFBUSxlQUFSLENBRGpCOztBQUdBO0FBQ0EsSUFBSUUsa0JBQWtCLGlFQUF0Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsU0FBU0MsUUFBVCxDQUFrQkMsS0FBbEIsRUFBeUI7QUFDdkIsTUFBSUgsV0FBV0csS0FBWCxDQUFKLEVBQXVCO0FBQ3JCLFVBQU0sSUFBSUMsS0FBSixDQUFVSCxlQUFWLENBQU47QUFDRDtBQUNELFNBQU9ILGFBQWFLLEtBQWIsQ0FBUDtBQUNEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCSixRQUFqQiIsImZpbGUiOiJpc05hdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlSXNOYXRpdmUgPSByZXF1aXJlKCcuL19iYXNlSXNOYXRpdmUnKSxcbiAgICBpc01hc2thYmxlID0gcmVxdWlyZSgnLi9faXNNYXNrYWJsZScpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgQ09SRV9FUlJPUl9URVhUID0gJ1Vuc3VwcG9ydGVkIGNvcmUtanMgdXNlLiBUcnkgaHR0cHM6Ly9ucG1zLmlvL3NlYXJjaD9xPXBvbnlmaWxsLic7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwcmlzdGluZSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGNhbid0IHJlbGlhYmx5IGRldGVjdCBuYXRpdmUgZnVuY3Rpb25zIGluIHRoZSBwcmVzZW5jZVxuICogb2YgdGhlIGNvcmUtanMgcGFja2FnZSBiZWNhdXNlIGNvcmUtanMgY2lyY3VtdmVudHMgdGhpcyBraW5kIG9mIGRldGVjdGlvbi5cbiAqIERlc3BpdGUgbXVsdGlwbGUgcmVxdWVzdHMsIHRoZSBjb3JlLWpzIG1haW50YWluZXIgaGFzIG1hZGUgaXQgY2xlYXI6IGFueVxuICogYXR0ZW1wdCB0byBmaXggdGhlIGRldGVjdGlvbiB3aWxsIGJlIG9ic3RydWN0ZWQuIEFzIGEgcmVzdWx0LCB3ZSdyZSBsZWZ0XG4gKiB3aXRoIGxpdHRsZSBjaG9pY2UgYnV0IHRvIHRocm93IGFuIGVycm9yLiBVbmZvcnR1bmF0ZWx5LCB0aGlzIGFsc28gYWZmZWN0c1xuICogcGFja2FnZXMsIGxpa2UgW2JhYmVsLXBvbHlmaWxsXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9iYWJlbC1wb2x5ZmlsbCksXG4gKiB3aGljaCByZWx5IG9uIGNvcmUtanMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKGlzTWFza2FibGUodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKENPUkVfRVJST1JfVEVYVCk7XG4gIH1cbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOYXRpdmU7XG4iXX0=