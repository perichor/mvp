'use strict';

var apply = require('./_apply'),
    arrayMap = require('./_arrayMap'),
    baseIteratee = require('./_baseIteratee'),
    baseRest = require('./_baseRest');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that iterates over `pairs` and invokes the corresponding
 * function of the first predicate to return truthy. The predicate-function
 * pairs are invoked with the `this` binding and arguments of the created
 * function.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {Array} pairs The predicate-function pairs.
 * @returns {Function} Returns the new composite function.
 * @example
 *
 * var func = _.cond([
 *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
 *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
 *   [_.stubTrue,                      _.constant('no match')]
 * ]);
 *
 * func({ 'a': 1, 'b': 2 });
 * // => 'matches A'
 *
 * func({ 'a': 0, 'b': 1 });
 * // => 'matches B'
 *
 * func({ 'a': '1', 'b': '2' });
 * // => 'no match'
 */
function cond(pairs) {
  var length = pairs == null ? 0 : pairs.length,
      toIteratee = baseIteratee;

  pairs = !length ? [] : arrayMap(pairs, function (pair) {
    if (typeof pair[1] != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    return [toIteratee(pair[0]), pair[1]];
  });

  return baseRest(function (args) {
    var index = -1;
    while (++index < length) {
      var pair = pairs[index];
      if (apply(pair[0], this, args)) {
        return apply(pair[1], this, args);
      }
    }
  });
}

module.exports = cond;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2NvbmQuanMiXSwibmFtZXMiOlsiYXBwbHkiLCJyZXF1aXJlIiwiYXJyYXlNYXAiLCJiYXNlSXRlcmF0ZWUiLCJiYXNlUmVzdCIsIkZVTkNfRVJST1JfVEVYVCIsImNvbmQiLCJwYWlycyIsImxlbmd0aCIsInRvSXRlcmF0ZWUiLCJwYWlyIiwiVHlwZUVycm9yIiwiYXJncyIsImluZGV4IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxRQUFRQyxRQUFRLFVBQVIsQ0FBWjtBQUFBLElBQ0lDLFdBQVdELFFBQVEsYUFBUixDQURmO0FBQUEsSUFFSUUsZUFBZUYsUUFBUSxpQkFBUixDQUZuQjtBQUFBLElBR0lHLFdBQVdILFFBQVEsYUFBUixDQUhmOztBQUtBO0FBQ0EsSUFBSUksa0JBQWtCLHFCQUF0Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QkEsU0FBU0MsSUFBVCxDQUFjQyxLQUFkLEVBQXFCO0FBQ25CLE1BQUlDLFNBQVNELFNBQVMsSUFBVCxHQUFnQixDQUFoQixHQUFvQkEsTUFBTUMsTUFBdkM7QUFBQSxNQUNJQyxhQUFhTixZQURqQjs7QUFHQUksVUFBUSxDQUFDQyxNQUFELEdBQVUsRUFBVixHQUFlTixTQUFTSyxLQUFULEVBQWdCLFVBQVNHLElBQVQsRUFBZTtBQUNwRCxRQUFJLE9BQU9BLEtBQUssQ0FBTCxDQUFQLElBQWtCLFVBQXRCLEVBQWtDO0FBQ2hDLFlBQU0sSUFBSUMsU0FBSixDQUFjTixlQUFkLENBQU47QUFDRDtBQUNELFdBQU8sQ0FBQ0ksV0FBV0MsS0FBSyxDQUFMLENBQVgsQ0FBRCxFQUFzQkEsS0FBSyxDQUFMLENBQXRCLENBQVA7QUFDRCxHQUxzQixDQUF2Qjs7QUFPQSxTQUFPTixTQUFTLFVBQVNRLElBQVQsRUFBZTtBQUM3QixRQUFJQyxRQUFRLENBQUMsQ0FBYjtBQUNBLFdBQU8sRUFBRUEsS0FBRixHQUFVTCxNQUFqQixFQUF5QjtBQUN2QixVQUFJRSxPQUFPSCxNQUFNTSxLQUFOLENBQVg7QUFDQSxVQUFJYixNQUFNVSxLQUFLLENBQUwsQ0FBTixFQUFlLElBQWYsRUFBcUJFLElBQXJCLENBQUosRUFBZ0M7QUFDOUIsZUFBT1osTUFBTVUsS0FBSyxDQUFMLENBQU4sRUFBZSxJQUFmLEVBQXFCRSxJQUFyQixDQUFQO0FBQ0Q7QUFDRjtBQUNGLEdBUk0sQ0FBUDtBQVNEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCVCxJQUFqQiIsImZpbGUiOiJjb25kLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcGx5ID0gcmVxdWlyZSgnLi9fYXBwbHknKSxcbiAgICBhcnJheU1hcCA9IHJlcXVpcmUoJy4vX2FycmF5TWFwJyksXG4gICAgYmFzZUl0ZXJhdGVlID0gcmVxdWlyZSgnLi9fYmFzZUl0ZXJhdGVlJyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGl0ZXJhdGVzIG92ZXIgYHBhaXJzYCBhbmQgaW52b2tlcyB0aGUgY29ycmVzcG9uZGluZ1xuICogZnVuY3Rpb24gb2YgdGhlIGZpcnN0IHByZWRpY2F0ZSB0byByZXR1cm4gdHJ1dGh5LiBUaGUgcHJlZGljYXRlLWZ1bmN0aW9uXG4gKiBwYWlycyBhcmUgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBhbmQgYXJndW1lbnRzIG9mIHRoZSBjcmVhdGVkXG4gKiBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHtBcnJheX0gcGFpcnMgVGhlIHByZWRpY2F0ZS1mdW5jdGlvbiBwYWlycy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbXBvc2l0ZSBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGZ1bmMgPSBfLmNvbmQoW1xuICogICBbXy5tYXRjaGVzKHsgJ2EnOiAxIH0pLCAgICAgICAgICAgXy5jb25zdGFudCgnbWF0Y2hlcyBBJyldLFxuICogICBbXy5jb25mb3Jtcyh7ICdiJzogXy5pc051bWJlciB9KSwgXy5jb25zdGFudCgnbWF0Y2hlcyBCJyldLFxuICogICBbXy5zdHViVHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgXy5jb25zdGFudCgnbm8gbWF0Y2gnKV1cbiAqIF0pO1xuICpcbiAqIGZ1bmMoeyAnYSc6IDEsICdiJzogMiB9KTtcbiAqIC8vID0+ICdtYXRjaGVzIEEnXG4gKlxuICogZnVuYyh7ICdhJzogMCwgJ2InOiAxIH0pO1xuICogLy8gPT4gJ21hdGNoZXMgQidcbiAqXG4gKiBmdW5jKHsgJ2EnOiAnMScsICdiJzogJzInIH0pO1xuICogLy8gPT4gJ25vIG1hdGNoJ1xuICovXG5mdW5jdGlvbiBjb25kKHBhaXJzKSB7XG4gIHZhciBsZW5ndGggPSBwYWlycyA9PSBudWxsID8gMCA6IHBhaXJzLmxlbmd0aCxcbiAgICAgIHRvSXRlcmF0ZWUgPSBiYXNlSXRlcmF0ZWU7XG5cbiAgcGFpcnMgPSAhbGVuZ3RoID8gW10gOiBhcnJheU1hcChwYWlycywgZnVuY3Rpb24ocGFpcikge1xuICAgIGlmICh0eXBlb2YgcGFpclsxXSAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gICAgfVxuICAgIHJldHVybiBbdG9JdGVyYXRlZShwYWlyWzBdKSwgcGFpclsxXV07XG4gIH0pO1xuXG4gIHJldHVybiBiYXNlUmVzdChmdW5jdGlvbihhcmdzKSB7XG4gICAgdmFyIGluZGV4ID0gLTE7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBwYWlyID0gcGFpcnNbaW5kZXhdO1xuICAgICAgaWYgKGFwcGx5KHBhaXJbMF0sIHRoaXMsIGFyZ3MpKSB7XG4gICAgICAgIHJldHVybiBhcHBseShwYWlyWzFdLCB0aGlzLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmQ7XG4iXX0=