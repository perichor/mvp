'use strict';

var arrayMap = require('./_arrayMap'),
    baseIntersection = require('./_baseIntersection'),
    baseRest = require('./_baseRest'),
    castArrayLikeObject = require('./_castArrayLikeObject'),
    last = require('./last');

/**
 * This method is like `_.intersection` except that it accepts `comparator`
 * which is invoked to compare elements of `arrays`. The order and references
 * of result values are determined by the first array. The comparator is
 * invoked with two arguments: (arrVal, othVal).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 *
 * _.intersectionWith(objects, others, _.isEqual);
 * // => [{ 'x': 1, 'y': 2 }]
 */
var intersectionWith = baseRest(function (arrays) {
    var comparator = last(arrays),
        mapped = arrayMap(arrays, castArrayLikeObject);

    comparator = typeof comparator == 'function' ? comparator : undefined;
    if (comparator) {
        mapped.pop();
    }
    return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined, comparator) : [];
});

module.exports = intersectionWith;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ludGVyc2VjdGlvbldpdGguanMiXSwibmFtZXMiOlsiYXJyYXlNYXAiLCJyZXF1aXJlIiwiYmFzZUludGVyc2VjdGlvbiIsImJhc2VSZXN0IiwiY2FzdEFycmF5TGlrZU9iamVjdCIsImxhc3QiLCJpbnRlcnNlY3Rpb25XaXRoIiwiYXJyYXlzIiwiY29tcGFyYXRvciIsIm1hcHBlZCIsInVuZGVmaW5lZCIsInBvcCIsImxlbmd0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsV0FBV0MsUUFBUSxhQUFSLENBQWY7QUFBQSxJQUNJQyxtQkFBbUJELFFBQVEscUJBQVIsQ0FEdkI7QUFBQSxJQUVJRSxXQUFXRixRQUFRLGFBQVIsQ0FGZjtBQUFBLElBR0lHLHNCQUFzQkgsUUFBUSx3QkFBUixDQUgxQjtBQUFBLElBSUlJLE9BQU9KLFFBQVEsUUFBUixDQUpYOztBQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsSUFBSUssbUJBQW1CSCxTQUFTLFVBQVNJLE1BQVQsRUFBaUI7QUFDL0MsUUFBSUMsYUFBYUgsS0FBS0UsTUFBTCxDQUFqQjtBQUFBLFFBQ0lFLFNBQVNULFNBQVNPLE1BQVQsRUFBaUJILG1CQUFqQixDQURiOztBQUdBSSxpQkFBYSxPQUFPQSxVQUFQLElBQXFCLFVBQXJCLEdBQWtDQSxVQUFsQyxHQUErQ0UsU0FBNUQ7QUFDQSxRQUFJRixVQUFKLEVBQWdCO0FBQ2RDLGVBQU9FLEdBQVA7QUFDRDtBQUNELFdBQVFGLE9BQU9HLE1BQVAsSUFBaUJILE9BQU8sQ0FBUCxNQUFjRixPQUFPLENBQVAsQ0FBaEMsR0FDSEwsaUJBQWlCTyxNQUFqQixFQUF5QkMsU0FBekIsRUFBb0NGLFVBQXBDLENBREcsR0FFSCxFQUZKO0FBR0QsQ0FYc0IsQ0FBdkI7O0FBYUFLLE9BQU9DLE9BQVAsR0FBaUJSLGdCQUFqQiIsImZpbGUiOiJpbnRlcnNlY3Rpb25XaXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFycmF5TWFwID0gcmVxdWlyZSgnLi9fYXJyYXlNYXAnKSxcbiAgICBiYXNlSW50ZXJzZWN0aW9uID0gcmVxdWlyZSgnLi9fYmFzZUludGVyc2VjdGlvbicpLFxuICAgIGJhc2VSZXN0ID0gcmVxdWlyZSgnLi9fYmFzZVJlc3QnKSxcbiAgICBjYXN0QXJyYXlMaWtlT2JqZWN0ID0gcmVxdWlyZSgnLi9fY2FzdEFycmF5TGlrZU9iamVjdCcpLFxuICAgIGxhc3QgPSByZXF1aXJlKCcuL2xhc3QnKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmludGVyc2VjdGlvbmAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBgY29tcGFyYXRvcmBcbiAqIHdoaWNoIGlzIGludm9rZWQgdG8gY29tcGFyZSBlbGVtZW50cyBvZiBgYXJyYXlzYC4gVGhlIG9yZGVyIGFuZCByZWZlcmVuY2VzXG4gKiBvZiByZXN1bHQgdmFsdWVzIGFyZSBkZXRlcm1pbmVkIGJ5IHRoZSBmaXJzdCBhcnJheS4gVGhlIGNvbXBhcmF0b3IgaXNcbiAqIGludm9rZWQgd2l0aCB0d28gYXJndW1lbnRzOiAoYXJyVmFsLCBvdGhWYWwpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHsuLi5BcnJheX0gW2FycmF5c10gVGhlIGFycmF5cyB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBhcmF0b3JdIFRoZSBjb21wYXJhdG9yIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiBpbnRlcnNlY3RpbmcgdmFsdWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IFt7ICd4JzogMSwgJ3knOiAyIH0sIHsgJ3gnOiAyLCAneSc6IDEgfV07XG4gKiB2YXIgb3RoZXJzID0gW3sgJ3gnOiAxLCAneSc6IDEgfSwgeyAneCc6IDEsICd5JzogMiB9XTtcbiAqXG4gKiBfLmludGVyc2VjdGlvbldpdGgob2JqZWN0cywgb3RoZXJzLCBfLmlzRXF1YWwpO1xuICogLy8gPT4gW3sgJ3gnOiAxLCAneSc6IDIgfV1cbiAqL1xudmFyIGludGVyc2VjdGlvbldpdGggPSBiYXNlUmVzdChmdW5jdGlvbihhcnJheXMpIHtcbiAgdmFyIGNvbXBhcmF0b3IgPSBsYXN0KGFycmF5cyksXG4gICAgICBtYXBwZWQgPSBhcnJheU1hcChhcnJheXMsIGNhc3RBcnJheUxpa2VPYmplY3QpO1xuXG4gIGNvbXBhcmF0b3IgPSB0eXBlb2YgY29tcGFyYXRvciA9PSAnZnVuY3Rpb24nID8gY29tcGFyYXRvciA6IHVuZGVmaW5lZDtcbiAgaWYgKGNvbXBhcmF0b3IpIHtcbiAgICBtYXBwZWQucG9wKCk7XG4gIH1cbiAgcmV0dXJuIChtYXBwZWQubGVuZ3RoICYmIG1hcHBlZFswXSA9PT0gYXJyYXlzWzBdKVxuICAgID8gYmFzZUludGVyc2VjdGlvbihtYXBwZWQsIHVuZGVmaW5lZCwgY29tcGFyYXRvcilcbiAgICA6IFtdO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gaW50ZXJzZWN0aW9uV2l0aDtcbiJdfQ==