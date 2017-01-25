'use strict';

var baseRest = require('./_baseRest'),
    unzipWith = require('./unzipWith');

/**
 * This method is like `_.zip` except that it accepts `iteratee` to specify
 * how grouped values should be combined. The iteratee is invoked with the
 * elements of each group: (...group).
 *
 * @static
 * @memberOf _
 * @since 3.8.0
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @param {Function} [iteratee=_.identity] The function to combine
 *  grouped values.
 * @returns {Array} Returns the new array of grouped elements.
 * @example
 *
 * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
 *   return a + b + c;
 * });
 * // => [111, 222]
 */
var zipWith = baseRest(function (arrays) {
    var length = arrays.length,
        iteratee = length > 1 ? arrays[length - 1] : undefined;

    iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
    return unzipWith(arrays, iteratee);
});

module.exports = zipWith;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3ppcFdpdGguanMiXSwibmFtZXMiOlsiYmFzZVJlc3QiLCJyZXF1aXJlIiwidW56aXBXaXRoIiwiemlwV2l0aCIsImFycmF5cyIsImxlbmd0aCIsIml0ZXJhdGVlIiwidW5kZWZpbmVkIiwicG9wIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxXQUFXQyxRQUFRLGFBQVIsQ0FBZjtBQUFBLElBQ0lDLFlBQVlELFFBQVEsYUFBUixDQURoQjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsSUFBSUUsVUFBVUgsU0FBUyxVQUFTSSxNQUFULEVBQWlCO0FBQ3RDLFFBQUlDLFNBQVNELE9BQU9DLE1BQXBCO0FBQUEsUUFDSUMsV0FBV0QsU0FBUyxDQUFULEdBQWFELE9BQU9DLFNBQVMsQ0FBaEIsQ0FBYixHQUFrQ0UsU0FEakQ7O0FBR0FELGVBQVcsT0FBT0EsUUFBUCxJQUFtQixVQUFuQixJQUFpQ0YsT0FBT0ksR0FBUCxJQUFjRixRQUEvQyxJQUEyREMsU0FBdEU7QUFDQSxXQUFPTCxVQUFVRSxNQUFWLEVBQWtCRSxRQUFsQixDQUFQO0FBQ0QsQ0FOYSxDQUFkOztBQVFBRyxPQUFPQyxPQUFQLEdBQWlCUCxPQUFqQiIsImZpbGUiOiJ6aXBXaXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VSZXN0ID0gcmVxdWlyZSgnLi9fYmFzZVJlc3QnKSxcbiAgICB1bnppcFdpdGggPSByZXF1aXJlKCcuL3VuemlwV2l0aCcpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uemlwYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGBpdGVyYXRlZWAgdG8gc3BlY2lmeVxuICogaG93IGdyb3VwZWQgdmFsdWVzIHNob3VsZCBiZSBjb21iaW5lZC4gVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aGVcbiAqIGVsZW1lbnRzIG9mIGVhY2ggZ3JvdXA6ICguLi5ncm91cCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjguMFxuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0gey4uLkFycmF5fSBbYXJyYXlzXSBUaGUgYXJyYXlzIHRvIHByb2Nlc3MuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIHRvIGNvbWJpbmVcbiAqICBncm91cGVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGdyb3VwZWQgZWxlbWVudHMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uemlwV2l0aChbMSwgMl0sIFsxMCwgMjBdLCBbMTAwLCAyMDBdLCBmdW5jdGlvbihhLCBiLCBjKSB7XG4gKiAgIHJldHVybiBhICsgYiArIGM7XG4gKiB9KTtcbiAqIC8vID0+IFsxMTEsIDIyMl1cbiAqL1xudmFyIHppcFdpdGggPSBiYXNlUmVzdChmdW5jdGlvbihhcnJheXMpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5cy5sZW5ndGgsXG4gICAgICBpdGVyYXRlZSA9IGxlbmd0aCA+IDEgPyBhcnJheXNbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG5cbiAgaXRlcmF0ZWUgPSB0eXBlb2YgaXRlcmF0ZWUgPT0gJ2Z1bmN0aW9uJyA/IChhcnJheXMucG9wKCksIGl0ZXJhdGVlKSA6IHVuZGVmaW5lZDtcbiAgcmV0dXJuIHVuemlwV2l0aChhcnJheXMsIGl0ZXJhdGVlKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHppcFdpdGg7XG4iXX0=