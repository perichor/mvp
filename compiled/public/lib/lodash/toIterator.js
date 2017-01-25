"use strict";

/**
 * Enables the wrapper to be iterable.
 *
 * @name Symbol.iterator
 * @memberOf _
 * @since 4.0.0
 * @category Seq
 * @returns {Object} Returns the wrapper object.
 * @example
 *
 * var wrapped = _([1, 2]);
 *
 * wrapped[Symbol.iterator]() === wrapped;
 * // => true
 *
 * Array.from(wrapped);
 * // => [1, 2]
 */
function wrapperToIterator() {
  return this;
}

module.exports = wrapperToIterator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3RvSXRlcmF0b3IuanMiXSwibmFtZXMiOlsid3JhcHBlclRvSXRlcmF0b3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsU0FBU0EsaUJBQVQsR0FBNkI7QUFDM0IsU0FBTyxJQUFQO0FBQ0Q7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUJGLGlCQUFqQiIsImZpbGUiOiJ0b0l0ZXJhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFbmFibGVzIHRoZSB3cmFwcGVyIHRvIGJlIGl0ZXJhYmxlLlxuICpcbiAqIEBuYW1lIFN5bWJvbC5pdGVyYXRvclxuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IFNlcVxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgd3JhcHBlciBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB3cmFwcGVkID0gXyhbMSwgMl0pO1xuICpcbiAqIHdyYXBwZWRbU3ltYm9sLml0ZXJhdG9yXSgpID09PSB3cmFwcGVkO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIEFycmF5LmZyb20od3JhcHBlZCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqL1xuZnVuY3Rpb24gd3JhcHBlclRvSXRlcmF0b3IoKSB7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBwZXJUb0l0ZXJhdG9yO1xuIl19