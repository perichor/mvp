'use strict';

var baseEach = require('./_baseEach');

/**
 * The base implementation of `_.some` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function baseSome(collection, predicate) {
  var result;

  baseEach(collection, function (value, index, collection) {
    result = predicate(value, index, collection);
    return !result;
  });
  return !!result;
}

module.exports = baseSome;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlU29tZS5qcyJdLCJuYW1lcyI6WyJiYXNlRWFjaCIsInJlcXVpcmUiLCJiYXNlU29tZSIsImNvbGxlY3Rpb24iLCJwcmVkaWNhdGUiLCJyZXN1bHQiLCJ2YWx1ZSIsImluZGV4IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxXQUFXQyxRQUFRLGFBQVIsQ0FBZjs7QUFFQTs7Ozs7Ozs7O0FBU0EsU0FBU0MsUUFBVCxDQUFrQkMsVUFBbEIsRUFBOEJDLFNBQTlCLEVBQXlDO0FBQ3ZDLE1BQUlDLE1BQUo7O0FBRUFMLFdBQVNHLFVBQVQsRUFBcUIsVUFBU0csS0FBVCxFQUFnQkMsS0FBaEIsRUFBdUJKLFVBQXZCLEVBQW1DO0FBQ3RERSxhQUFTRCxVQUFVRSxLQUFWLEVBQWlCQyxLQUFqQixFQUF3QkosVUFBeEIsQ0FBVDtBQUNBLFdBQU8sQ0FBQ0UsTUFBUjtBQUNELEdBSEQ7QUFJQSxTQUFPLENBQUMsQ0FBQ0EsTUFBVDtBQUNEOztBQUVERyxPQUFPQyxPQUFQLEdBQWlCUCxRQUFqQiIsImZpbGUiOiJfYmFzZVNvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUVhY2ggPSByZXF1aXJlKCcuL19iYXNlRWFjaCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNvbWVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW55IGVsZW1lbnQgcGFzc2VzIHRoZSBwcmVkaWNhdGUgY2hlY2ssXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlU29tZShjb2xsZWN0aW9uLCBwcmVkaWNhdGUpIHtcbiAgdmFyIHJlc3VsdDtcblxuICBiYXNlRWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICByZXN1bHQgPSBwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICByZXR1cm4gIXJlc3VsdDtcbiAgfSk7XG4gIHJldHVybiAhIXJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU29tZTtcbiJdfQ==