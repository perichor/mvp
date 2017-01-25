'use strict';

var baseEach = require('./_baseEach');

/**
 * The base implementation of `_.every` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`
 */
function baseEvery(collection, predicate) {
  var result = true;
  baseEach(collection, function (value, index, collection) {
    result = !!predicate(value, index, collection);
    return result;
  });
  return result;
}

module.exports = baseEvery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlRXZlcnkuanMiXSwibmFtZXMiOlsiYmFzZUVhY2giLCJyZXF1aXJlIiwiYmFzZUV2ZXJ5IiwiY29sbGVjdGlvbiIsInByZWRpY2F0ZSIsInJlc3VsdCIsInZhbHVlIiwiaW5kZXgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsYUFBUixDQUFmOztBQUVBOzs7Ozs7Ozs7QUFTQSxTQUFTQyxTQUFULENBQW1CQyxVQUFuQixFQUErQkMsU0FBL0IsRUFBMEM7QUFDeEMsTUFBSUMsU0FBUyxJQUFiO0FBQ0FMLFdBQVNHLFVBQVQsRUFBcUIsVUFBU0csS0FBVCxFQUFnQkMsS0FBaEIsRUFBdUJKLFVBQXZCLEVBQW1DO0FBQ3RERSxhQUFTLENBQUMsQ0FBQ0QsVUFBVUUsS0FBVixFQUFpQkMsS0FBakIsRUFBd0JKLFVBQXhCLENBQVg7QUFDQSxXQUFPRSxNQUFQO0FBQ0QsR0FIRDtBQUlBLFNBQU9BLE1BQVA7QUFDRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQlAsU0FBakIiLCJmaWxlIjoiX2Jhc2VFdmVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlRWFjaCA9IHJlcXVpcmUoJy4vX2Jhc2VFYWNoJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZXZlcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYWxsIGVsZW1lbnRzIHBhc3MgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWBcbiAqL1xuZnVuY3Rpb24gYmFzZUV2ZXJ5KGNvbGxlY3Rpb24sIHByZWRpY2F0ZSkge1xuICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgYmFzZUVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgcmVzdWx0ID0gISFwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRXZlcnk7XG4iXX0=