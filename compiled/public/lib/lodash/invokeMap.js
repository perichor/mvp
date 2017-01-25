'use strict';

var apply = require('./_apply'),
    baseEach = require('./_baseEach'),
    baseInvoke = require('./_baseInvoke'),
    baseRest = require('./_baseRest'),
    isArrayLike = require('./isArrayLike');

/**
 * Invokes the method at `path` of each element in `collection`, returning
 * an array of the results of each invoked method. Any additional arguments
 * are provided to each invoked method. If `path` is a function, it's invoked
 * for, and `this` bound to, each element in `collection`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array|Function|string} path The path of the method to invoke or
 *  the function invoked per iteration.
 * @param {...*} [args] The arguments to invoke each method with.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
 * // => [[1, 5, 7], [1, 2, 3]]
 *
 * _.invokeMap([123, 456], String.prototype.split, '');
 * // => [['1', '2', '3'], ['4', '5', '6']]
 */
var invokeMap = baseRest(function (collection, path, args) {
    var index = -1,
        isFunc = typeof path == 'function',
        result = isArrayLike(collection) ? Array(collection.length) : [];

    baseEach(collection, function (value) {
        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
    });
    return result;
});

module.exports = invokeMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ludm9rZU1hcC5qcyJdLCJuYW1lcyI6WyJhcHBseSIsInJlcXVpcmUiLCJiYXNlRWFjaCIsImJhc2VJbnZva2UiLCJiYXNlUmVzdCIsImlzQXJyYXlMaWtlIiwiaW52b2tlTWFwIiwiY29sbGVjdGlvbiIsInBhdGgiLCJhcmdzIiwiaW5kZXgiLCJpc0Z1bmMiLCJyZXN1bHQiLCJBcnJheSIsImxlbmd0aCIsInZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxRQUFRQyxRQUFRLFVBQVIsQ0FBWjtBQUFBLElBQ0lDLFdBQVdELFFBQVEsYUFBUixDQURmO0FBQUEsSUFFSUUsYUFBYUYsUUFBUSxlQUFSLENBRmpCO0FBQUEsSUFHSUcsV0FBV0gsUUFBUSxhQUFSLENBSGY7QUFBQSxJQUlJSSxjQUFjSixRQUFRLGVBQVIsQ0FKbEI7O0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLElBQUlLLFlBQVlGLFNBQVMsVUFBU0csVUFBVCxFQUFxQkMsSUFBckIsRUFBMkJDLElBQTNCLEVBQWlDO0FBQ3hELFFBQUlDLFFBQVEsQ0FBQyxDQUFiO0FBQUEsUUFDSUMsU0FBUyxPQUFPSCxJQUFQLElBQWUsVUFENUI7QUFBQSxRQUVJSSxTQUFTUCxZQUFZRSxVQUFaLElBQTBCTSxNQUFNTixXQUFXTyxNQUFqQixDQUExQixHQUFxRCxFQUZsRTs7QUFJQVosYUFBU0ssVUFBVCxFQUFxQixVQUFTUSxLQUFULEVBQWdCO0FBQ25DSCxlQUFPLEVBQUVGLEtBQVQsSUFBa0JDLFNBQVNYLE1BQU1RLElBQU4sRUFBWU8sS0FBWixFQUFtQk4sSUFBbkIsQ0FBVCxHQUFvQ04sV0FBV1ksS0FBWCxFQUFrQlAsSUFBbEIsRUFBd0JDLElBQXhCLENBQXREO0FBQ0QsS0FGRDtBQUdBLFdBQU9HLE1BQVA7QUFDRCxDQVRlLENBQWhCOztBQVdBSSxPQUFPQyxPQUFQLEdBQWlCWCxTQUFqQiIsImZpbGUiOiJpbnZva2VNYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwbHkgPSByZXF1aXJlKCcuL19hcHBseScpLFxuICAgIGJhc2VFYWNoID0gcmVxdWlyZSgnLi9fYmFzZUVhY2gnKSxcbiAgICBiYXNlSW52b2tlID0gcmVxdWlyZSgnLi9fYmFzZUludm9rZScpLFxuICAgIGJhc2VSZXN0ID0gcmVxdWlyZSgnLi9fYmFzZVJlc3QnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKTtcblxuLyoqXG4gKiBJbnZva2VzIHRoZSBtZXRob2QgYXQgYHBhdGhgIG9mIGVhY2ggZWxlbWVudCBpbiBgY29sbGVjdGlvbmAsIHJldHVybmluZ1xuICogYW4gYXJyYXkgb2YgdGhlIHJlc3VsdHMgb2YgZWFjaCBpbnZva2VkIG1ldGhvZC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzXG4gKiBhcmUgcHJvdmlkZWQgdG8gZWFjaCBpbnZva2VkIG1ldGhvZC4gSWYgYHBhdGhgIGlzIGEgZnVuY3Rpb24sIGl0J3MgaW52b2tlZFxuICogZm9yLCBhbmQgYHRoaXNgIGJvdW5kIHRvLCBlYWNoIGVsZW1lbnQgaW4gYGNvbGxlY3Rpb25gLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgbWV0aG9kIHRvIGludm9rZSBvclxuICogIHRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBlYWNoIG1ldGhvZCB3aXRoLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmludm9rZU1hcChbWzUsIDEsIDddLCBbMywgMiwgMV1dLCAnc29ydCcpO1xuICogLy8gPT4gW1sxLCA1LCA3XSwgWzEsIDIsIDNdXVxuICpcbiAqIF8uaW52b2tlTWFwKFsxMjMsIDQ1Nl0sIFN0cmluZy5wcm90b3R5cGUuc3BsaXQsICcnKTtcbiAqIC8vID0+IFtbJzEnLCAnMicsICczJ10sIFsnNCcsICc1JywgJzYnXV1cbiAqL1xudmFyIGludm9rZU1hcCA9IGJhc2VSZXN0KGZ1bmN0aW9uKGNvbGxlY3Rpb24sIHBhdGgsIGFyZ3MpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpc0Z1bmMgPSB0eXBlb2YgcGF0aCA9PSAnZnVuY3Rpb24nLFxuICAgICAgcmVzdWx0ID0gaXNBcnJheUxpa2UoY29sbGVjdGlvbikgPyBBcnJheShjb2xsZWN0aW9uLmxlbmd0aCkgOiBbXTtcblxuICBiYXNlRWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IGlzRnVuYyA/IGFwcGx5KHBhdGgsIHZhbHVlLCBhcmdzKSA6IGJhc2VJbnZva2UodmFsdWUsIHBhdGgsIGFyZ3MpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludm9rZU1hcDtcbiJdfQ==