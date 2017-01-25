'use strict';

var arrayMap = require('./_arrayMap'),
    baseIteratee = require('./_baseIteratee'),
    basePickBy = require('./_basePickBy'),
    getAllKeysIn = require('./_getAllKeysIn');

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pickBy(object, _.isNumber);
 * // => { 'a': 1, 'c': 3 }
 */
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = arrayMap(getAllKeysIn(object), function (prop) {
    return [prop];
  });
  predicate = baseIteratee(predicate);
  return basePickBy(object, props, function (value, path) {
    return predicate(value, path[0]);
  });
}

module.exports = pickBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3BpY2tCeS5qcyJdLCJuYW1lcyI6WyJhcnJheU1hcCIsInJlcXVpcmUiLCJiYXNlSXRlcmF0ZWUiLCJiYXNlUGlja0J5IiwiZ2V0QWxsS2V5c0luIiwicGlja0J5Iiwib2JqZWN0IiwicHJlZGljYXRlIiwicHJvcHMiLCJwcm9wIiwidmFsdWUiLCJwYXRoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxXQUFXQyxRQUFRLGFBQVIsQ0FBZjtBQUFBLElBQ0lDLGVBQWVELFFBQVEsaUJBQVIsQ0FEbkI7QUFBQSxJQUVJRSxhQUFhRixRQUFRLGVBQVIsQ0FGakI7QUFBQSxJQUdJRyxlQUFlSCxRQUFRLGlCQUFSLENBSG5COztBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsU0FBU0ksTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0JDLFNBQXhCLEVBQW1DO0FBQ2pDLE1BQUlELFVBQVUsSUFBZCxFQUFvQjtBQUNsQixXQUFPLEVBQVA7QUFDRDtBQUNELE1BQUlFLFFBQVFSLFNBQVNJLGFBQWFFLE1BQWIsQ0FBVCxFQUErQixVQUFTRyxJQUFULEVBQWU7QUFDeEQsV0FBTyxDQUFDQSxJQUFELENBQVA7QUFDRCxHQUZXLENBQVo7QUFHQUYsY0FBWUwsYUFBYUssU0FBYixDQUFaO0FBQ0EsU0FBT0osV0FBV0csTUFBWCxFQUFtQkUsS0FBbkIsRUFBMEIsVUFBU0UsS0FBVCxFQUFnQkMsSUFBaEIsRUFBc0I7QUFDckQsV0FBT0osVUFBVUcsS0FBVixFQUFpQkMsS0FBSyxDQUFMLENBQWpCLENBQVA7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQlIsTUFBakIiLCJmaWxlIjoicGlja0J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFycmF5TWFwID0gcmVxdWlyZSgnLi9fYXJyYXlNYXAnKSxcbiAgICBiYXNlSXRlcmF0ZWUgPSByZXF1aXJlKCcuL19iYXNlSXRlcmF0ZWUnKSxcbiAgICBiYXNlUGlja0J5ID0gcmVxdWlyZSgnLi9fYmFzZVBpY2tCeScpLFxuICAgIGdldEFsbEtleXNJbiA9IHJlcXVpcmUoJy4vX2dldEFsbEtleXNJbicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBgb2JqZWN0YCBwcm9wZXJ0aWVzIGBwcmVkaWNhdGVgIHJldHVybnNcbiAqIHRydXRoeSBmb3IuIFRoZSBwcmVkaWNhdGUgaXMgaW52b2tlZCB3aXRoIHR3byBhcmd1bWVudHM6ICh2YWx1ZSwga2V5KS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogJzInLCAnYyc6IDMgfTtcbiAqXG4gKiBfLnBpY2tCeShvYmplY3QsIF8uaXNOdW1iZXIpO1xuICogLy8gPT4geyAnYSc6IDEsICdjJzogMyB9XG4gKi9cbmZ1bmN0aW9uIHBpY2tCeShvYmplY3QsIHByZWRpY2F0ZSkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgdmFyIHByb3BzID0gYXJyYXlNYXAoZ2V0QWxsS2V5c0luKG9iamVjdCksIGZ1bmN0aW9uKHByb3ApIHtcbiAgICByZXR1cm4gW3Byb3BdO1xuICB9KTtcbiAgcHJlZGljYXRlID0gYmFzZUl0ZXJhdGVlKHByZWRpY2F0ZSk7XG4gIHJldHVybiBiYXNlUGlja0J5KG9iamVjdCwgcHJvcHMsIGZ1bmN0aW9uKHZhbHVlLCBwYXRoKSB7XG4gICAgcmV0dXJuIHByZWRpY2F0ZSh2YWx1ZSwgcGF0aFswXSk7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBpY2tCeTtcbiJdfQ==