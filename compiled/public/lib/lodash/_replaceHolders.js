'use strict';

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }
  return result;
}

module.exports = replaceHolders;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19yZXBsYWNlSG9sZGVycy5qcyJdLCJuYW1lcyI6WyJQTEFDRUhPTERFUiIsInJlcGxhY2VIb2xkZXJzIiwiYXJyYXkiLCJwbGFjZWhvbGRlciIsImluZGV4IiwibGVuZ3RoIiwicmVzSW5kZXgiLCJyZXN1bHQiLCJ2YWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFJQSxjQUFjLHdCQUFsQjs7QUFFQTs7Ozs7Ozs7O0FBU0EsU0FBU0MsY0FBVCxDQUF3QkMsS0FBeEIsRUFBK0JDLFdBQS9CLEVBQTRDO0FBQzFDLE1BQUlDLFFBQVEsQ0FBQyxDQUFiO0FBQUEsTUFDSUMsU0FBU0gsTUFBTUcsTUFEbkI7QUFBQSxNQUVJQyxXQUFXLENBRmY7QUFBQSxNQUdJQyxTQUFTLEVBSGI7O0FBS0EsU0FBTyxFQUFFSCxLQUFGLEdBQVVDLE1BQWpCLEVBQXlCO0FBQ3ZCLFFBQUlHLFFBQVFOLE1BQU1FLEtBQU4sQ0FBWjtBQUNBLFFBQUlJLFVBQVVMLFdBQVYsSUFBeUJLLFVBQVVSLFdBQXZDLEVBQW9EO0FBQ2xERSxZQUFNRSxLQUFOLElBQWVKLFdBQWY7QUFDQU8sYUFBT0QsVUFBUCxJQUFxQkYsS0FBckI7QUFDRDtBQUNGO0FBQ0QsU0FBT0csTUFBUDtBQUNEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCVCxjQUFqQiIsImZpbGUiOiJfcmVwbGFjZUhvbGRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogVXNlZCBhcyB0aGUgaW50ZXJuYWwgYXJndW1lbnQgcGxhY2Vob2xkZXIuICovXG52YXIgUExBQ0VIT0xERVIgPSAnX19sb2Rhc2hfcGxhY2Vob2xkZXJfXyc7XG5cbi8qKlxuICogUmVwbGFjZXMgYWxsIGBwbGFjZWhvbGRlcmAgZWxlbWVudHMgaW4gYGFycmF5YCB3aXRoIGFuIGludGVybmFsIHBsYWNlaG9sZGVyXG4gKiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiB0aGVpciBpbmRleGVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHsqfSBwbGFjZWhvbGRlciBUaGUgcGxhY2Vob2xkZXIgdG8gcmVwbGFjZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIHBsYWNlaG9sZGVyIGluZGV4ZXMuXG4gKi9cbmZ1bmN0aW9uIHJlcGxhY2VIb2xkZXJzKGFycmF5LCBwbGFjZWhvbGRlcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc0luZGV4ID0gMCxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmICh2YWx1ZSA9PT0gcGxhY2Vob2xkZXIgfHwgdmFsdWUgPT09IFBMQUNFSE9MREVSKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBQTEFDRUhPTERFUjtcbiAgICAgIHJlc3VsdFtyZXNJbmRleCsrXSA9IGluZGV4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcGxhY2VIb2xkZXJzO1xuIl19