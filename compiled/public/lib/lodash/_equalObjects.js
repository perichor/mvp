'use strict';

var getAllKeys = require('./_getAllKeys');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19lcXVhbE9iamVjdHMuanMiXSwibmFtZXMiOlsiZ2V0QWxsS2V5cyIsInJlcXVpcmUiLCJDT01QQVJFX1BBUlRJQUxfRkxBRyIsIm9iamVjdFByb3RvIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJlcXVhbE9iamVjdHMiLCJvYmplY3QiLCJvdGhlciIsImJpdG1hc2siLCJjdXN0b21pemVyIiwiZXF1YWxGdW5jIiwic3RhY2siLCJpc1BhcnRpYWwiLCJvYmpQcm9wcyIsIm9iakxlbmd0aCIsImxlbmd0aCIsIm90aFByb3BzIiwib3RoTGVuZ3RoIiwiaW5kZXgiLCJrZXkiLCJjYWxsIiwic3RhY2tlZCIsImdldCIsInJlc3VsdCIsInNldCIsInNraXBDdG9yIiwib2JqVmFsdWUiLCJvdGhWYWx1ZSIsImNvbXBhcmVkIiwidW5kZWZpbmVkIiwib2JqQ3RvciIsImNvbnN0cnVjdG9yIiwib3RoQ3RvciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsYUFBYUMsUUFBUSxlQUFSLENBQWpCOztBQUVBO0FBQ0EsSUFBSUMsdUJBQXVCLENBQTNCOztBQUVBO0FBQ0EsSUFBSUMsY0FBY0MsT0FBT0MsU0FBekI7O0FBRUE7QUFDQSxJQUFJQyxpQkFBaUJILFlBQVlHLGNBQWpDOztBQUVBOzs7Ozs7Ozs7Ozs7O0FBYUEsU0FBU0MsWUFBVCxDQUFzQkMsTUFBdEIsRUFBOEJDLEtBQTlCLEVBQXFDQyxPQUFyQyxFQUE4Q0MsVUFBOUMsRUFBMERDLFNBQTFELEVBQXFFQyxLQUFyRSxFQUE0RTtBQUMxRSxNQUFJQyxZQUFZSixVQUFVUixvQkFBMUI7QUFBQSxNQUNJYSxXQUFXZixXQUFXUSxNQUFYLENBRGY7QUFBQSxNQUVJUSxZQUFZRCxTQUFTRSxNQUZ6QjtBQUFBLE1BR0lDLFdBQVdsQixXQUFXUyxLQUFYLENBSGY7QUFBQSxNQUlJVSxZQUFZRCxTQUFTRCxNQUp6Qjs7QUFNQSxNQUFJRCxhQUFhRyxTQUFiLElBQTBCLENBQUNMLFNBQS9CLEVBQTBDO0FBQ3hDLFdBQU8sS0FBUDtBQUNEO0FBQ0QsTUFBSU0sUUFBUUosU0FBWjtBQUNBLFNBQU9JLE9BQVAsRUFBZ0I7QUFDZCxRQUFJQyxNQUFNTixTQUFTSyxLQUFULENBQVY7QUFDQSxRQUFJLEVBQUVOLFlBQVlPLE9BQU9aLEtBQW5CLEdBQTJCSCxlQUFlZ0IsSUFBZixDQUFvQmIsS0FBcEIsRUFBMkJZLEdBQTNCLENBQTdCLENBQUosRUFBbUU7QUFDakUsYUFBTyxLQUFQO0FBQ0Q7QUFDRjtBQUNEO0FBQ0EsTUFBSUUsVUFBVVYsTUFBTVcsR0FBTixDQUFVaEIsTUFBVixDQUFkO0FBQ0EsTUFBSWUsV0FBV1YsTUFBTVcsR0FBTixDQUFVZixLQUFWLENBQWYsRUFBaUM7QUFDL0IsV0FBT2MsV0FBV2QsS0FBbEI7QUFDRDtBQUNELE1BQUlnQixTQUFTLElBQWI7QUFDQVosUUFBTWEsR0FBTixDQUFVbEIsTUFBVixFQUFrQkMsS0FBbEI7QUFDQUksUUFBTWEsR0FBTixDQUFVakIsS0FBVixFQUFpQkQsTUFBakI7O0FBRUEsTUFBSW1CLFdBQVdiLFNBQWY7QUFDQSxTQUFPLEVBQUVNLEtBQUYsR0FBVUosU0FBakIsRUFBNEI7QUFDMUJLLFVBQU1OLFNBQVNLLEtBQVQsQ0FBTjtBQUNBLFFBQUlRLFdBQVdwQixPQUFPYSxHQUFQLENBQWY7QUFBQSxRQUNJUSxXQUFXcEIsTUFBTVksR0FBTixDQURmOztBQUdBLFFBQUlWLFVBQUosRUFBZ0I7QUFDZCxVQUFJbUIsV0FBV2hCLFlBQ1hILFdBQVdrQixRQUFYLEVBQXFCRCxRQUFyQixFQUErQlAsR0FBL0IsRUFBb0NaLEtBQXBDLEVBQTJDRCxNQUEzQyxFQUFtREssS0FBbkQsQ0FEVyxHQUVYRixXQUFXaUIsUUFBWCxFQUFxQkMsUUFBckIsRUFBK0JSLEdBQS9CLEVBQW9DYixNQUFwQyxFQUE0Q0MsS0FBNUMsRUFBbURJLEtBQW5ELENBRko7QUFHRDtBQUNEO0FBQ0EsUUFBSSxFQUFFaUIsYUFBYUMsU0FBYixHQUNHSCxhQUFhQyxRQUFiLElBQXlCakIsVUFBVWdCLFFBQVYsRUFBb0JDLFFBQXBCLEVBQThCbkIsT0FBOUIsRUFBdUNDLFVBQXZDLEVBQW1ERSxLQUFuRCxDQUQ1QixHQUVFaUIsUUFGSixDQUFKLEVBR087QUFDTEwsZUFBUyxLQUFUO0FBQ0E7QUFDRDtBQUNERSxpQkFBYUEsV0FBV04sT0FBTyxhQUEvQjtBQUNEO0FBQ0QsTUFBSUksVUFBVSxDQUFDRSxRQUFmLEVBQXlCO0FBQ3ZCLFFBQUlLLFVBQVV4QixPQUFPeUIsV0FBckI7QUFBQSxRQUNJQyxVQUFVekIsTUFBTXdCLFdBRHBCOztBQUdBO0FBQ0EsUUFBSUQsV0FBV0UsT0FBWCxJQUNDLGlCQUFpQjFCLE1BQWpCLElBQTJCLGlCQUFpQkMsS0FEN0MsSUFFQSxFQUFFLE9BQU91QixPQUFQLElBQWtCLFVBQWxCLElBQWdDQSxtQkFBbUJBLE9BQW5ELElBQ0EsT0FBT0UsT0FBUCxJQUFrQixVQURsQixJQUNnQ0EsbUJBQW1CQSxPQURyRCxDQUZKLEVBR21FO0FBQ2pFVCxlQUFTLEtBQVQ7QUFDRDtBQUNGO0FBQ0RaLFFBQU0sUUFBTixFQUFnQkwsTUFBaEI7QUFDQUssUUFBTSxRQUFOLEVBQWdCSixLQUFoQjtBQUNBLFNBQU9nQixNQUFQO0FBQ0Q7O0FBRURVLE9BQU9DLE9BQVAsR0FBaUI3QixZQUFqQiIsImZpbGUiOiJfZXF1YWxPYmplY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGdldEFsbEtleXMgPSByZXF1aXJlKCcuL19nZXRBbGxLZXlzJyk7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRyxcbiAgICAgIG9ialByb3BzID0gZ2V0QWxsS2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBnZXRBbGxLZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzUGFydGlhbCA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgb2JqZWN0KTtcblxuICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSwgb2JqZWN0LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShjb21wYXJlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAob2JqVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSlcbiAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAocmVzdWx0ICYmICFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsT2JqZWN0cztcbiJdfQ==