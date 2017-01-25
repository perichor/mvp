'use strict';

var arrayReduceRight = require('./_arrayReduceRight'),
    baseEachRight = require('./_baseEachRight'),
    baseIteratee = require('./_baseIteratee'),
    baseReduce = require('./_baseReduce'),
    isArray = require('./isArray');

/**
 * This method is like `_.reduce` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see _.reduce
 * @example
 *
 * var array = [[0, 1], [2, 3], [4, 5]];
 *
 * _.reduceRight(array, function(flattened, other) {
 *   return flattened.concat(other);
 * }, []);
 * // => [4, 5, 2, 3, 0, 1]
 */
function reduceRight(collection, iteratee, accumulator) {
    var func = isArray(collection) ? arrayReduceRight : baseReduce,
        initAccum = arguments.length < 3;

    return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
}

module.exports = reduceRight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3JlZHVjZVJpZ2h0LmpzIl0sIm5hbWVzIjpbImFycmF5UmVkdWNlUmlnaHQiLCJyZXF1aXJlIiwiYmFzZUVhY2hSaWdodCIsImJhc2VJdGVyYXRlZSIsImJhc2VSZWR1Y2UiLCJpc0FycmF5IiwicmVkdWNlUmlnaHQiLCJjb2xsZWN0aW9uIiwiaXRlcmF0ZWUiLCJhY2N1bXVsYXRvciIsImZ1bmMiLCJpbml0QWNjdW0iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLG1CQUFtQkMsUUFBUSxxQkFBUixDQUF2QjtBQUFBLElBQ0lDLGdCQUFnQkQsUUFBUSxrQkFBUixDQURwQjtBQUFBLElBRUlFLGVBQWVGLFFBQVEsaUJBQVIsQ0FGbkI7QUFBQSxJQUdJRyxhQUFhSCxRQUFRLGVBQVIsQ0FIakI7QUFBQSxJQUlJSSxVQUFVSixRQUFRLFdBQVIsQ0FKZDs7QUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxTQUFTSyxXQUFULENBQXFCQyxVQUFyQixFQUFpQ0MsUUFBakMsRUFBMkNDLFdBQTNDLEVBQXdEO0FBQ3RELFFBQUlDLE9BQU9MLFFBQVFFLFVBQVIsSUFBc0JQLGdCQUF0QixHQUF5Q0ksVUFBcEQ7QUFBQSxRQUNJTyxZQUFZQyxVQUFVQyxNQUFWLEdBQW1CLENBRG5DOztBQUdBLFdBQU9ILEtBQUtILFVBQUwsRUFBaUJKLGFBQWFLLFFBQWIsRUFBdUIsQ0FBdkIsQ0FBakIsRUFBNENDLFdBQTVDLEVBQXlERSxTQUF6RCxFQUFvRVQsYUFBcEUsQ0FBUDtBQUNEOztBQUVEWSxPQUFPQyxPQUFQLEdBQWlCVCxXQUFqQiIsImZpbGUiOiJyZWR1Y2VSaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcnJheVJlZHVjZVJpZ2h0ID0gcmVxdWlyZSgnLi9fYXJyYXlSZWR1Y2VSaWdodCcpLFxuICAgIGJhc2VFYWNoUmlnaHQgPSByZXF1aXJlKCcuL19iYXNlRWFjaFJpZ2h0JyksXG4gICAgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgYmFzZVJlZHVjZSA9IHJlcXVpcmUoJy4vX2Jhc2VSZWR1Y2UnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5Jyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5yZWR1Y2VgIGV4Y2VwdCB0aGF0IGl0IGl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2ZcbiAqIGBjb2xsZWN0aW9uYCBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbYWNjdW11bGF0b3JdIFRoZSBpbml0aWFsIHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGFjY3VtdWxhdGVkIHZhbHVlLlxuICogQHNlZSBfLnJlZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXkgPSBbWzAsIDFdLCBbMiwgM10sIFs0LCA1XV07XG4gKlxuICogXy5yZWR1Y2VSaWdodChhcnJheSwgZnVuY3Rpb24oZmxhdHRlbmVkLCBvdGhlcikge1xuICogICByZXR1cm4gZmxhdHRlbmVkLmNvbmNhdChvdGhlcik7XG4gKiB9LCBbXSk7XG4gKiAvLyA9PiBbNCwgNSwgMiwgMywgMCwgMV1cbiAqL1xuZnVuY3Rpb24gcmVkdWNlUmlnaHQoY29sbGVjdGlvbiwgaXRlcmF0ZWUsIGFjY3VtdWxhdG9yKSB7XG4gIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5UmVkdWNlUmlnaHQgOiBiYXNlUmVkdWNlLFxuICAgICAgaW5pdEFjY3VtID0gYXJndW1lbnRzLmxlbmd0aCA8IDM7XG5cbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgYmFzZUl0ZXJhdGVlKGl0ZXJhdGVlLCA0KSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSwgYmFzZUVhY2hSaWdodCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVkdWNlUmlnaHQ7XG4iXX0=