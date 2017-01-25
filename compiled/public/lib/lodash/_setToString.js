'use strict';

var baseSetToString = require('./_baseSetToString'),
    shortOut = require('./_shortOut');

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19zZXRUb1N0cmluZy5qcyJdLCJuYW1lcyI6WyJiYXNlU2V0VG9TdHJpbmciLCJyZXF1aXJlIiwic2hvcnRPdXQiLCJzZXRUb1N0cmluZyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsa0JBQWtCQyxRQUFRLG9CQUFSLENBQXRCO0FBQUEsSUFDSUMsV0FBV0QsUUFBUSxhQUFSLENBRGY7O0FBR0E7Ozs7Ozs7O0FBUUEsSUFBSUUsY0FBY0QsU0FBU0YsZUFBVCxDQUFsQjs7QUFFQUksT0FBT0MsT0FBUCxHQUFpQkYsV0FBakIiLCJmaWxlIjoiX3NldFRvU3RyaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VTZXRUb1N0cmluZyA9IHJlcXVpcmUoJy4vX2Jhc2VTZXRUb1N0cmluZycpLFxuICAgIHNob3J0T3V0ID0gcmVxdWlyZSgnLi9fc2hvcnRPdXQnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBgdG9TdHJpbmdgIG1ldGhvZCBvZiBgZnVuY2AgdG8gcmV0dXJuIGBzdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmcgVGhlIGB0b1N0cmluZ2AgcmVzdWx0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBmdW5jYC5cbiAqL1xudmFyIHNldFRvU3RyaW5nID0gc2hvcnRPdXQoYmFzZVNldFRvU3RyaW5nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXRUb1N0cmluZztcbiJdfQ==