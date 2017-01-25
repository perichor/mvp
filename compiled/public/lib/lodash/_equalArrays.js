'use strict';

var SetCache = require('./_SetCache'),
    arraySome = require('./_arraySome'),
    cacheHas = require('./_cacheHas');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function (othValue, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19lcXVhbEFycmF5cy5qcyJdLCJuYW1lcyI6WyJTZXRDYWNoZSIsInJlcXVpcmUiLCJhcnJheVNvbWUiLCJjYWNoZUhhcyIsIkNPTVBBUkVfUEFSVElBTF9GTEFHIiwiQ09NUEFSRV9VTk9SREVSRURfRkxBRyIsImVxdWFsQXJyYXlzIiwiYXJyYXkiLCJvdGhlciIsImJpdG1hc2siLCJjdXN0b21pemVyIiwiZXF1YWxGdW5jIiwic3RhY2siLCJpc1BhcnRpYWwiLCJhcnJMZW5ndGgiLCJsZW5ndGgiLCJvdGhMZW5ndGgiLCJzdGFja2VkIiwiZ2V0IiwiaW5kZXgiLCJyZXN1bHQiLCJzZWVuIiwidW5kZWZpbmVkIiwic2V0IiwiYXJyVmFsdWUiLCJvdGhWYWx1ZSIsImNvbXBhcmVkIiwib3RoSW5kZXgiLCJwdXNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxXQUFXQyxRQUFRLGFBQVIsQ0FBZjtBQUFBLElBQ0lDLFlBQVlELFFBQVEsY0FBUixDQURoQjtBQUFBLElBRUlFLFdBQVdGLFFBQVEsYUFBUixDQUZmOztBQUlBO0FBQ0EsSUFBSUcsdUJBQXVCLENBQTNCO0FBQUEsSUFDSUMseUJBQXlCLENBRDdCOztBQUdBOzs7Ozs7Ozs7Ozs7O0FBYUEsU0FBU0MsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEJDLEtBQTVCLEVBQW1DQyxPQUFuQyxFQUE0Q0MsVUFBNUMsRUFBd0RDLFNBQXhELEVBQW1FQyxLQUFuRSxFQUEwRTtBQUN4RSxNQUFJQyxZQUFZSixVQUFVTCxvQkFBMUI7QUFBQSxNQUNJVSxZQUFZUCxNQUFNUSxNQUR0QjtBQUFBLE1BRUlDLFlBQVlSLE1BQU1PLE1BRnRCOztBQUlBLE1BQUlELGFBQWFFLFNBQWIsSUFBMEIsRUFBRUgsYUFBYUcsWUFBWUYsU0FBM0IsQ0FBOUIsRUFBcUU7QUFDbkUsV0FBTyxLQUFQO0FBQ0Q7QUFDRDtBQUNBLE1BQUlHLFVBQVVMLE1BQU1NLEdBQU4sQ0FBVVgsS0FBVixDQUFkO0FBQ0EsTUFBSVUsV0FBV0wsTUFBTU0sR0FBTixDQUFVVixLQUFWLENBQWYsRUFBaUM7QUFDL0IsV0FBT1MsV0FBV1QsS0FBbEI7QUFDRDtBQUNELE1BQUlXLFFBQVEsQ0FBQyxDQUFiO0FBQUEsTUFDSUMsU0FBUyxJQURiO0FBQUEsTUFFSUMsT0FBUVosVUFBVUosc0JBQVgsR0FBcUMsSUFBSUwsUUFBSixFQUFyQyxHQUFvRHNCLFNBRi9EOztBQUlBVixRQUFNVyxHQUFOLENBQVVoQixLQUFWLEVBQWlCQyxLQUFqQjtBQUNBSSxRQUFNVyxHQUFOLENBQVVmLEtBQVYsRUFBaUJELEtBQWpCOztBQUVBO0FBQ0EsU0FBTyxFQUFFWSxLQUFGLEdBQVVMLFNBQWpCLEVBQTRCO0FBQzFCLFFBQUlVLFdBQVdqQixNQUFNWSxLQUFOLENBQWY7QUFBQSxRQUNJTSxXQUFXakIsTUFBTVcsS0FBTixDQURmOztBQUdBLFFBQUlULFVBQUosRUFBZ0I7QUFDZCxVQUFJZ0IsV0FBV2IsWUFDWEgsV0FBV2UsUUFBWCxFQUFxQkQsUUFBckIsRUFBK0JMLEtBQS9CLEVBQXNDWCxLQUF0QyxFQUE2Q0QsS0FBN0MsRUFBb0RLLEtBQXBELENBRFcsR0FFWEYsV0FBV2MsUUFBWCxFQUFxQkMsUUFBckIsRUFBK0JOLEtBQS9CLEVBQXNDWixLQUF0QyxFQUE2Q0MsS0FBN0MsRUFBb0RJLEtBQXBELENBRko7QUFHRDtBQUNELFFBQUljLGFBQWFKLFNBQWpCLEVBQTRCO0FBQzFCLFVBQUlJLFFBQUosRUFBYztBQUNaO0FBQ0Q7QUFDRE4sZUFBUyxLQUFUO0FBQ0E7QUFDRDtBQUNEO0FBQ0EsUUFBSUMsSUFBSixFQUFVO0FBQ1IsVUFBSSxDQUFDbkIsVUFBVU0sS0FBVixFQUFpQixVQUFTaUIsUUFBVCxFQUFtQkUsUUFBbkIsRUFBNkI7QUFDN0MsWUFBSSxDQUFDeEIsU0FBU2tCLElBQVQsRUFBZU0sUUFBZixDQUFELEtBQ0NILGFBQWFDLFFBQWIsSUFBeUJkLFVBQVVhLFFBQVYsRUFBb0JDLFFBQXBCLEVBQThCaEIsT0FBOUIsRUFBdUNDLFVBQXZDLEVBQW1ERSxLQUFuRCxDQUQxQixDQUFKLEVBQzBGO0FBQ3hGLGlCQUFPUyxLQUFLTyxJQUFMLENBQVVELFFBQVYsQ0FBUDtBQUNEO0FBQ0YsT0FMQSxDQUFMLEVBS1E7QUFDTlAsaUJBQVMsS0FBVDtBQUNBO0FBQ0Q7QUFDRixLQVZELE1BVU8sSUFBSSxFQUNMSSxhQUFhQyxRQUFiLElBQ0VkLFVBQVVhLFFBQVYsRUFBb0JDLFFBQXBCLEVBQThCaEIsT0FBOUIsRUFBdUNDLFVBQXZDLEVBQW1ERSxLQUFuRCxDQUZHLENBQUosRUFHQTtBQUNMUSxlQUFTLEtBQVQ7QUFDQTtBQUNEO0FBQ0Y7QUFDRFIsUUFBTSxRQUFOLEVBQWdCTCxLQUFoQjtBQUNBSyxRQUFNLFFBQU4sRUFBZ0JKLEtBQWhCO0FBQ0EsU0FBT1ksTUFBUDtBQUNEOztBQUVEUyxPQUFPQyxPQUFQLEdBQWlCeEIsV0FBakIiLCJmaWxlIjoiX2VxdWFsQXJyYXlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFNldENhY2hlID0gcmVxdWlyZSgnLi9fU2V0Q2FjaGUnKSxcbiAgICBhcnJheVNvbWUgPSByZXF1aXJlKCcuL19hcnJheVNvbWUnKSxcbiAgICBjYWNoZUhhcyA9IHJlcXVpcmUoJy4vX2NhY2hlSGFzJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBhcnJheWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoO1xuXG4gIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNQYXJ0aWFsICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChhcnJheSk7XG4gIGlmIChzdGFja2VkICYmIHN0YWNrLmdldChvdGhlcikpIHtcbiAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IHRydWUsXG4gICAgICBzZWVuID0gKGJpdG1hc2sgJiBDT01QQVJFX1VOT1JERVJFRF9GTEFHKSA/IG5ldyBTZXRDYWNoZSA6IHVuZGVmaW5lZDtcblxuICBzdGFjay5zZXQoYXJyYXksIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBhcnJheSk7XG5cbiAgLy8gSWdub3JlIG5vbi1pbmRleCBwcm9wZXJ0aWVzLlxuICB3aGlsZSAoKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4LCBvdGhlciwgYXJyYXksIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCwgYXJyYXksIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIGlmIChjb21wYXJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY29tcGFyZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmIChzZWVuKSB7XG4gICAgICBpZiAoIWFycmF5U29tZShvdGhlciwgZnVuY3Rpb24ob3RoVmFsdWUsIG90aEluZGV4KSB7XG4gICAgICAgICAgICBpZiAoIWNhY2hlSGFzKHNlZW4sIG90aEluZGV4KSAmJlxuICAgICAgICAgICAgICAgIChhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2Vlbi5wdXNoKG90aEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSkge1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghKFxuICAgICAgICAgIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fFxuICAgICAgICAgICAgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShhcnJheSk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxBcnJheXM7XG4iXX0=