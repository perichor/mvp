'use strict';

var getWrapDetails = require('./_getWrapDetails'),
    insertWrapDetails = require('./_insertWrapDetails'),
    setToString = require('./_setToString'),
    updateWrapDetails = require('./_updateWrapDetails');

/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
function setWrapToString(wrapper, reference, bitmask) {
  var source = reference + '';
  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}

module.exports = setWrapToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19zZXRXcmFwVG9TdHJpbmcuanMiXSwibmFtZXMiOlsiZ2V0V3JhcERldGFpbHMiLCJyZXF1aXJlIiwiaW5zZXJ0V3JhcERldGFpbHMiLCJzZXRUb1N0cmluZyIsInVwZGF0ZVdyYXBEZXRhaWxzIiwic2V0V3JhcFRvU3RyaW5nIiwid3JhcHBlciIsInJlZmVyZW5jZSIsImJpdG1hc2siLCJzb3VyY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGlCQUFpQkMsUUFBUSxtQkFBUixDQUFyQjtBQUFBLElBQ0lDLG9CQUFvQkQsUUFBUSxzQkFBUixDQUR4QjtBQUFBLElBRUlFLGNBQWNGLFFBQVEsZ0JBQVIsQ0FGbEI7QUFBQSxJQUdJRyxvQkFBb0JILFFBQVEsc0JBQVIsQ0FIeEI7O0FBS0E7Ozs7Ozs7Ozs7QUFVQSxTQUFTSSxlQUFULENBQXlCQyxPQUF6QixFQUFrQ0MsU0FBbEMsRUFBNkNDLE9BQTdDLEVBQXNEO0FBQ3BELE1BQUlDLFNBQVVGLFlBQVksRUFBMUI7QUFDQSxTQUFPSixZQUFZRyxPQUFaLEVBQXFCSixrQkFBa0JPLE1BQWxCLEVBQTBCTCxrQkFBa0JKLGVBQWVTLE1BQWYsQ0FBbEIsRUFBMENELE9BQTFDLENBQTFCLENBQXJCLENBQVA7QUFDRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQk4sZUFBakIiLCJmaWxlIjoiX3NldFdyYXBUb1N0cmluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBnZXRXcmFwRGV0YWlscyA9IHJlcXVpcmUoJy4vX2dldFdyYXBEZXRhaWxzJyksXG4gICAgaW5zZXJ0V3JhcERldGFpbHMgPSByZXF1aXJlKCcuL19pbnNlcnRXcmFwRGV0YWlscycpLFxuICAgIHNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fc2V0VG9TdHJpbmcnKSxcbiAgICB1cGRhdGVXcmFwRGV0YWlscyA9IHJlcXVpcmUoJy4vX3VwZGF0ZVdyYXBEZXRhaWxzJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgYHRvU3RyaW5nYCBtZXRob2Qgb2YgYHdyYXBwZXJgIHRvIG1pbWljIHRoZSBzb3VyY2Ugb2YgYHJlZmVyZW5jZWBcbiAqIHdpdGggd3JhcHBlciBkZXRhaWxzIGluIGEgY29tbWVudCBhdCB0aGUgdG9wIG9mIHRoZSBzb3VyY2UgYm9keS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gd3JhcHBlciBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVmZXJlbmNlIFRoZSByZWZlcmVuY2UgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBjcmVhdGVXcmFwYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGB3cmFwcGVyYC5cbiAqL1xuZnVuY3Rpb24gc2V0V3JhcFRvU3RyaW5nKHdyYXBwZXIsIHJlZmVyZW5jZSwgYml0bWFzaykge1xuICB2YXIgc291cmNlID0gKHJlZmVyZW5jZSArICcnKTtcbiAgcmV0dXJuIHNldFRvU3RyaW5nKHdyYXBwZXIsIGluc2VydFdyYXBEZXRhaWxzKHNvdXJjZSwgdXBkYXRlV3JhcERldGFpbHMoZ2V0V3JhcERldGFpbHMoc291cmNlKSwgYml0bWFzaykpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRXcmFwVG9TdHJpbmc7XG4iXX0=