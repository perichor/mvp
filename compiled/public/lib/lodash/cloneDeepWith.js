'use strict';

var baseClone = require('./_baseClone');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.cloneWith` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @param {Function} [customizer] The function to customize cloning.
 * @returns {*} Returns the deep cloned value.
 * @see _.cloneWith
 * @example
 *
 * function customizer(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(true);
 *   }
 * }
 *
 * var el = _.cloneDeepWith(document.body, customizer);
 *
 * console.log(el === document.body);
 * // => false
 * console.log(el.nodeName);
 * // => 'BODY'
 * console.log(el.childNodes.length);
 * // => 20
 */
function cloneDeepWith(value, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
}

module.exports = cloneDeepWith;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2Nsb25lRGVlcFdpdGguanMiXSwibmFtZXMiOlsiYmFzZUNsb25lIiwicmVxdWlyZSIsIkNMT05FX0RFRVBfRkxBRyIsIkNMT05FX1NZTUJPTFNfRkxBRyIsImNsb25lRGVlcFdpdGgiLCJ2YWx1ZSIsImN1c3RvbWl6ZXIiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVlDLFFBQVEsY0FBUixDQUFoQjs7QUFFQTtBQUNBLElBQUlDLGtCQUFrQixDQUF0QjtBQUFBLElBQ0lDLHFCQUFxQixDQUR6Qjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxTQUFTQyxhQUFULENBQXVCQyxLQUF2QixFQUE4QkMsVUFBOUIsRUFBMEM7QUFDeENBLGVBQWEsT0FBT0EsVUFBUCxJQUFxQixVQUFyQixHQUFrQ0EsVUFBbEMsR0FBK0NDLFNBQTVEO0FBQ0EsU0FBT1AsVUFBVUssS0FBVixFQUFpQkgsa0JBQWtCQyxrQkFBbkMsRUFBdURHLFVBQXZELENBQVA7QUFDRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQkwsYUFBakIiLCJmaWxlIjoiY2xvbmVEZWVwV2l0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlQ2xvbmUgPSByZXF1aXJlKCcuL19iYXNlQ2xvbmUnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY2xvbmluZy4gKi9cbnZhciBDTE9ORV9ERUVQX0ZMQUcgPSAxLFxuICAgIENMT05FX1NZTUJPTFNfRkxBRyA9IDQ7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5jbG9uZVdpdGhgIGV4Y2VwdCB0aGF0IGl0IHJlY3Vyc2l2ZWx5IGNsb25lcyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZWN1cnNpdmVseSBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNsb25pbmcuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZGVlcCBjbG9uZWQgdmFsdWUuXG4gKiBAc2VlIF8uY2xvbmVXaXRoXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIGN1c3RvbWl6ZXIodmFsdWUpIHtcbiAqICAgaWYgKF8uaXNFbGVtZW50KHZhbHVlKSkge1xuICogICAgIHJldHVybiB2YWx1ZS5jbG9uZU5vZGUodHJ1ZSk7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiB2YXIgZWwgPSBfLmNsb25lRGVlcFdpdGgoZG9jdW1lbnQuYm9keSwgY3VzdG9taXplcik7XG4gKlxuICogY29uc29sZS5sb2coZWwgPT09IGRvY3VtZW50LmJvZHkpO1xuICogLy8gPT4gZmFsc2VcbiAqIGNvbnNvbGUubG9nKGVsLm5vZGVOYW1lKTtcbiAqIC8vID0+ICdCT0RZJ1xuICogY29uc29sZS5sb2coZWwuY2hpbGROb2Rlcy5sZW5ndGgpO1xuICogLy8gPT4gMjBcbiAqL1xuZnVuY3Rpb24gY2xvbmVEZWVwV2l0aCh2YWx1ZSwgY3VzdG9taXplcikge1xuICBjdXN0b21pemVyID0gdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJyA/IGN1c3RvbWl6ZXIgOiB1bmRlZmluZWQ7XG4gIHJldHVybiBiYXNlQ2xvbmUodmFsdWUsIENMT05FX0RFRVBfRkxBRyB8IENMT05FX1NZTUJPTFNfRkxBRywgY3VzdG9taXplcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvbmVEZWVwV2l0aDtcbiJdfQ==