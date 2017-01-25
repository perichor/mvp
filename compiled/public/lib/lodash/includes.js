'use strict';

var baseIndexOf = require('./_baseIndexOf'),
    isArrayLike = require('./isArrayLike'),
    isString = require('./isString'),
    toInteger = require('./toInteger'),
    values = require('./values');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring of `value`, otherwise
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * is used for equality comparisons. If `fromIndex` is negative, it's used as
 * the offset from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'a': 1, 'b': 2 }, 1);
 * // => true
 *
 * _.includes('abcd', 'bc');
 * // => true
 */
function includes(collection, value, fromIndex, guard) {
  collection = isArrayLike(collection) ? collection : values(collection);
  fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;

  var length = collection.length;
  if (fromIndex < 0) {
    fromIndex = nativeMax(length + fromIndex, 0);
  }
  return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
}

module.exports = includes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2luY2x1ZGVzLmpzIl0sIm5hbWVzIjpbImJhc2VJbmRleE9mIiwicmVxdWlyZSIsImlzQXJyYXlMaWtlIiwiaXNTdHJpbmciLCJ0b0ludGVnZXIiLCJ2YWx1ZXMiLCJuYXRpdmVNYXgiLCJNYXRoIiwibWF4IiwiaW5jbHVkZXMiLCJjb2xsZWN0aW9uIiwidmFsdWUiLCJmcm9tSW5kZXgiLCJndWFyZCIsImxlbmd0aCIsImluZGV4T2YiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGNBQWNDLFFBQVEsZ0JBQVIsQ0FBbEI7QUFBQSxJQUNJQyxjQUFjRCxRQUFRLGVBQVIsQ0FEbEI7QUFBQSxJQUVJRSxXQUFXRixRQUFRLFlBQVIsQ0FGZjtBQUFBLElBR0lHLFlBQVlILFFBQVEsYUFBUixDQUhoQjtBQUFBLElBSUlJLFNBQVNKLFFBQVEsVUFBUixDQUpiOztBQU1BO0FBQ0EsSUFBSUssWUFBWUMsS0FBS0MsR0FBckI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCQSxTQUFTQyxRQUFULENBQWtCQyxVQUFsQixFQUE4QkMsS0FBOUIsRUFBcUNDLFNBQXJDLEVBQWdEQyxLQUFoRCxFQUF1RDtBQUNyREgsZUFBYVIsWUFBWVEsVUFBWixJQUEwQkEsVUFBMUIsR0FBdUNMLE9BQU9LLFVBQVAsQ0FBcEQ7QUFDQUUsY0FBYUEsYUFBYSxDQUFDQyxLQUFmLEdBQXdCVCxVQUFVUSxTQUFWLENBQXhCLEdBQStDLENBQTNEOztBQUVBLE1BQUlFLFNBQVNKLFdBQVdJLE1BQXhCO0FBQ0EsTUFBSUYsWUFBWSxDQUFoQixFQUFtQjtBQUNqQkEsZ0JBQVlOLFVBQVVRLFNBQVNGLFNBQW5CLEVBQThCLENBQTlCLENBQVo7QUFDRDtBQUNELFNBQU9ULFNBQVNPLFVBQVQsSUFDRkUsYUFBYUUsTUFBYixJQUF1QkosV0FBV0ssT0FBWCxDQUFtQkosS0FBbkIsRUFBMEJDLFNBQTFCLElBQXVDLENBQUMsQ0FEN0QsR0FFRixDQUFDLENBQUNFLE1BQUYsSUFBWWQsWUFBWVUsVUFBWixFQUF3QkMsS0FBeEIsRUFBK0JDLFNBQS9CLElBQTRDLENBQUMsQ0FGOUQ7QUFHRDs7QUFFREksT0FBT0MsT0FBUCxHQUFpQlIsUUFBakIiLCJmaWxlIjoiaW5jbHVkZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUluZGV4T2YgPSByZXF1aXJlKCcuL19iYXNlSW5kZXhPZicpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzU3RyaW5nID0gcmVxdWlyZSgnLi9pc1N0cmluZycpLFxuICAgIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vdG9JbnRlZ2VyJyksXG4gICAgdmFsdWVzID0gcmVxdWlyZSgnLi92YWx1ZXMnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIGBjb2xsZWN0aW9uYC4gSWYgYGNvbGxlY3Rpb25gIGlzIGEgc3RyaW5nLCBpdCdzXG4gKiBjaGVja2VkIGZvciBhIHN1YnN0cmluZyBvZiBgdmFsdWVgLCBvdGhlcndpc2VcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBpcyB1c2VkIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy4gSWYgYGZyb21JbmRleGAgaXMgbmVnYXRpdmUsIGl0J3MgdXNlZCBhc1xuICogdGhlIG9mZnNldCBmcm9tIHRoZSBlbmQgb2YgYGNvbGxlY3Rpb25gLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gW2Zyb21JbmRleD0wXSBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5yZWR1Y2VgLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pbmNsdWRlcyhbMSwgMiwgM10sIDEpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaW5jbHVkZXMoWzEsIDIsIDNdLCAxLCAyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pbmNsdWRlcyh7ICdhJzogMSwgJ2InOiAyIH0sIDEpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaW5jbHVkZXMoJ2FiY2QnLCAnYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaW5jbHVkZXMoY29sbGVjdGlvbiwgdmFsdWUsIGZyb21JbmRleCwgZ3VhcmQpIHtcbiAgY29sbGVjdGlvbiA9IGlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pID8gY29sbGVjdGlvbiA6IHZhbHVlcyhjb2xsZWN0aW9uKTtcbiAgZnJvbUluZGV4ID0gKGZyb21JbmRleCAmJiAhZ3VhcmQpID8gdG9JbnRlZ2VyKGZyb21JbmRleCkgOiAwO1xuXG4gIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcbiAgaWYgKGZyb21JbmRleCA8IDApIHtcbiAgICBmcm9tSW5kZXggPSBuYXRpdmVNYXgobGVuZ3RoICsgZnJvbUluZGV4LCAwKTtcbiAgfVxuICByZXR1cm4gaXNTdHJpbmcoY29sbGVjdGlvbilcbiAgICA/IChmcm9tSW5kZXggPD0gbGVuZ3RoICYmIGNvbGxlY3Rpb24uaW5kZXhPZih2YWx1ZSwgZnJvbUluZGV4KSA+IC0xKVxuICAgIDogKCEhbGVuZ3RoICYmIGJhc2VJbmRleE9mKGNvbGxlY3Rpb24sIHZhbHVlLCBmcm9tSW5kZXgpID4gLTEpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluY2x1ZGVzO1xuIl19