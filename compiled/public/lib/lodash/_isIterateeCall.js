'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var eq = require('./eq'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject');

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19pc0l0ZXJhdGVlQ2FsbC5qcyJdLCJuYW1lcyI6WyJlcSIsInJlcXVpcmUiLCJpc0FycmF5TGlrZSIsImlzSW5kZXgiLCJpc09iamVjdCIsImlzSXRlcmF0ZWVDYWxsIiwidmFsdWUiLCJpbmRleCIsIm9iamVjdCIsInR5cGUiLCJsZW5ndGgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBSUEsS0FBS0MsUUFBUSxNQUFSLENBQVQ7QUFBQSxJQUNJQyxjQUFjRCxRQUFRLGVBQVIsQ0FEbEI7QUFBQSxJQUVJRSxVQUFVRixRQUFRLFlBQVIsQ0FGZDtBQUFBLElBR0lHLFdBQVdILFFBQVEsWUFBUixDQUhmOztBQUtBOzs7Ozs7Ozs7O0FBVUEsU0FBU0ksY0FBVCxDQUF3QkMsS0FBeEIsRUFBK0JDLEtBQS9CLEVBQXNDQyxNQUF0QyxFQUE4QztBQUM1QyxNQUFJLENBQUNKLFNBQVNJLE1BQVQsQ0FBTCxFQUF1QjtBQUNyQixXQUFPLEtBQVA7QUFDRDtBQUNELE1BQUlDLGNBQWNGLEtBQWQseUNBQWNBLEtBQWQsQ0FBSjtBQUNBLE1BQUlFLFFBQVEsUUFBUixHQUNLUCxZQUFZTSxNQUFaLEtBQXVCTCxRQUFRSSxLQUFSLEVBQWVDLE9BQU9FLE1BQXRCLENBRDVCLEdBRUtELFFBQVEsUUFBUixJQUFvQkYsU0FBU0MsTUFGdEMsRUFHTTtBQUNKLFdBQU9SLEdBQUdRLE9BQU9ELEtBQVAsQ0FBSCxFQUFrQkQsS0FBbEIsQ0FBUDtBQUNEO0FBQ0QsU0FBTyxLQUFQO0FBQ0Q7O0FBRURLLE9BQU9DLE9BQVAsR0FBaUJQLGNBQWpCIiwiZmlsZSI6Il9pc0l0ZXJhdGVlQ2FsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBlcSA9IHJlcXVpcmUoJy4vZXEnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICAgID8gKGlzQXJyYXlMaWtlKG9iamVjdCkgJiYgaXNJbmRleChpbmRleCwgb2JqZWN0Lmxlbmd0aCkpXG4gICAgICAgIDogKHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0KVxuICAgICAgKSB7XG4gICAgcmV0dXJuIGVxKG9iamVjdFtpbmRleF0sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG4iXX0=