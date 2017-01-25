'use strict';

var baseConformsTo = require('./_baseConformsTo'),
    keys = require('./keys');

/**
 * The base implementation of `_.conforms` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new spec function.
 */
function baseConforms(source) {
  var props = keys(source);
  return function (object) {
    return baseConformsTo(object, source, props);
  };
}

module.exports = baseConforms;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlQ29uZm9ybXMuanMiXSwibmFtZXMiOlsiYmFzZUNvbmZvcm1zVG8iLCJyZXF1aXJlIiwia2V5cyIsImJhc2VDb25mb3JtcyIsInNvdXJjZSIsInByb3BzIiwib2JqZWN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxpQkFBaUJDLFFBQVEsbUJBQVIsQ0FBckI7QUFBQSxJQUNJQyxPQUFPRCxRQUFRLFFBQVIsQ0FEWDs7QUFHQTs7Ozs7OztBQU9BLFNBQVNFLFlBQVQsQ0FBc0JDLE1BQXRCLEVBQThCO0FBQzVCLE1BQUlDLFFBQVFILEtBQUtFLE1BQUwsQ0FBWjtBQUNBLFNBQU8sVUFBU0UsTUFBVCxFQUFpQjtBQUN0QixXQUFPTixlQUFlTSxNQUFmLEVBQXVCRixNQUF2QixFQUErQkMsS0FBL0IsQ0FBUDtBQUNELEdBRkQ7QUFHRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQkwsWUFBakIiLCJmaWxlIjoiX2Jhc2VDb25mb3Jtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlQ29uZm9ybXNUbyA9IHJlcXVpcmUoJy4vX2Jhc2VDb25mb3Jtc1RvJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNvbmZvcm1zYCB3aGljaCBkb2Vzbid0IGNsb25lIGBzb3VyY2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgcHJlZGljYXRlcyB0byBjb25mb3JtIHRvLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZUNvbmZvcm1zKHNvdXJjZSkge1xuICB2YXIgcHJvcHMgPSBrZXlzKHNvdXJjZSk7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gYmFzZUNvbmZvcm1zVG8ob2JqZWN0LCBzb3VyY2UsIHByb3BzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29uZm9ybXM7XG4iXX0=