'use strict';

var arrayMap = require('./_arrayMap'),
    baseIntersection = require('./_baseIntersection'),
    baseIteratee = require('./_baseIteratee'),
    baseRest = require('./_baseRest'),
    castArrayLikeObject = require('./_castArrayLikeObject'),
    last = require('./last');

/**
 * This method is like `_.intersection` except that it accepts `iteratee`
 * which is invoked for each element of each `arrays` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
 * // => [2.1]
 *
 * // The `_.property` iteratee shorthand.
 * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }]
 */
var intersectionBy = baseRest(function (arrays) {
  var iteratee = last(arrays),
      mapped = arrayMap(arrays, castArrayLikeObject);

  if (iteratee === last(mapped)) {
    iteratee = undefined;
  } else {
    mapped.pop();
  }
  return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, baseIteratee(iteratee, 2)) : [];
});

module.exports = intersectionBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ludGVyc2VjdGlvbkJ5LmpzIl0sIm5hbWVzIjpbImFycmF5TWFwIiwicmVxdWlyZSIsImJhc2VJbnRlcnNlY3Rpb24iLCJiYXNlSXRlcmF0ZWUiLCJiYXNlUmVzdCIsImNhc3RBcnJheUxpa2VPYmplY3QiLCJsYXN0IiwiaW50ZXJzZWN0aW9uQnkiLCJhcnJheXMiLCJpdGVyYXRlZSIsIm1hcHBlZCIsInVuZGVmaW5lZCIsInBvcCIsImxlbmd0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsV0FBV0MsUUFBUSxhQUFSLENBQWY7QUFBQSxJQUNJQyxtQkFBbUJELFFBQVEscUJBQVIsQ0FEdkI7QUFBQSxJQUVJRSxlQUFlRixRQUFRLGlCQUFSLENBRm5CO0FBQUEsSUFHSUcsV0FBV0gsUUFBUSxhQUFSLENBSGY7QUFBQSxJQUlJSSxzQkFBc0JKLFFBQVEsd0JBQVIsQ0FKMUI7QUFBQSxJQUtJSyxPQUFPTCxRQUFRLFFBQVIsQ0FMWDs7QUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsSUFBSU0saUJBQWlCSCxTQUFTLFVBQVNJLE1BQVQsRUFBaUI7QUFDN0MsTUFBSUMsV0FBV0gsS0FBS0UsTUFBTCxDQUFmO0FBQUEsTUFDSUUsU0FBU1YsU0FBU1EsTUFBVCxFQUFpQkgsbUJBQWpCLENBRGI7O0FBR0EsTUFBSUksYUFBYUgsS0FBS0ksTUFBTCxDQUFqQixFQUErQjtBQUM3QkQsZUFBV0UsU0FBWDtBQUNELEdBRkQsTUFFTztBQUNMRCxXQUFPRSxHQUFQO0FBQ0Q7QUFDRCxTQUFRRixPQUFPRyxNQUFQLElBQWlCSCxPQUFPLENBQVAsTUFBY0YsT0FBTyxDQUFQLENBQWhDLEdBQ0hOLGlCQUFpQlEsTUFBakIsRUFBeUJQLGFBQWFNLFFBQWIsRUFBdUIsQ0FBdkIsQ0FBekIsQ0FERyxHQUVILEVBRko7QUFHRCxDQVpvQixDQUFyQjs7QUFjQUssT0FBT0MsT0FBUCxHQUFpQlIsY0FBakIiLCJmaWxlIjoiaW50ZXJzZWN0aW9uQnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXJyYXlNYXAgPSByZXF1aXJlKCcuL19hcnJheU1hcCcpLFxuICAgIGJhc2VJbnRlcnNlY3Rpb24gPSByZXF1aXJlKCcuL19iYXNlSW50ZXJzZWN0aW9uJyksXG4gICAgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpLFxuICAgIGNhc3RBcnJheUxpa2VPYmplY3QgPSByZXF1aXJlKCcuL19jYXN0QXJyYXlMaWtlT2JqZWN0JyksXG4gICAgbGFzdCA9IHJlcXVpcmUoJy4vbGFzdCcpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaW50ZXJzZWN0aW9uYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGBpdGVyYXRlZWBcbiAqIHdoaWNoIGlzIGludm9rZWQgZm9yIGVhY2ggZWxlbWVudCBvZiBlYWNoIGBhcnJheXNgIHRvIGdlbmVyYXRlIHRoZSBjcml0ZXJpb25cbiAqIGJ5IHdoaWNoIHRoZXkncmUgY29tcGFyZWQuIFRoZSBvcmRlciBhbmQgcmVmZXJlbmNlcyBvZiByZXN1bHQgdmFsdWVzIGFyZVxuICogZGV0ZXJtaW5lZCBieSB0aGUgZmlyc3QgYXJyYXkuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OlxuICogKHZhbHVlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7Li4uQXJyYXl9IFthcnJheXNdIFRoZSBhcnJheXMgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGludGVyc2VjdGluZyB2YWx1ZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaW50ZXJzZWN0aW9uQnkoWzIuMSwgMS4yXSwgWzIuMywgMy40XSwgTWF0aC5mbG9vcik7XG4gKiAvLyA9PiBbMi4xXVxuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5pbnRlcnNlY3Rpb25CeShbeyAneCc6IDEgfV0sIFt7ICd4JzogMiB9LCB7ICd4JzogMSB9XSwgJ3gnKTtcbiAqIC8vID0+IFt7ICd4JzogMSB9XVxuICovXG52YXIgaW50ZXJzZWN0aW9uQnkgPSBiYXNlUmVzdChmdW5jdGlvbihhcnJheXMpIHtcbiAgdmFyIGl0ZXJhdGVlID0gbGFzdChhcnJheXMpLFxuICAgICAgbWFwcGVkID0gYXJyYXlNYXAoYXJyYXlzLCBjYXN0QXJyYXlMaWtlT2JqZWN0KTtcblxuICBpZiAoaXRlcmF0ZWUgPT09IGxhc3QobWFwcGVkKSkge1xuICAgIGl0ZXJhdGVlID0gdW5kZWZpbmVkO1xuICB9IGVsc2Uge1xuICAgIG1hcHBlZC5wb3AoKTtcbiAgfVxuICByZXR1cm4gKG1hcHBlZC5sZW5ndGggJiYgbWFwcGVkWzBdID09PSBhcnJheXNbMF0pXG4gICAgPyBiYXNlSW50ZXJzZWN0aW9uKG1hcHBlZCwgYmFzZUl0ZXJhdGVlKGl0ZXJhdGVlLCAyKSlcbiAgICA6IFtdO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gaW50ZXJzZWN0aW9uQnk7XG4iXX0=