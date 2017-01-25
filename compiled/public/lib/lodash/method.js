'use strict';

var baseInvoke = require('./_baseInvoke'),
    baseRest = require('./_baseRest');

/**
 * Creates a function that invokes the method at `path` of a given object.
 * Any additional arguments are provided to the invoked method.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Util
 * @param {Array|string} path The path of the method to invoke.
 * @param {...*} [args] The arguments to invoke the method with.
 * @returns {Function} Returns the new invoker function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': _.constant(2) } },
 *   { 'a': { 'b': _.constant(1) } }
 * ];
 *
 * _.map(objects, _.method('a.b'));
 * // => [2, 1]
 *
 * _.map(objects, _.method(['a', 'b']));
 * // => [2, 1]
 */
var method = baseRest(function (path, args) {
  return function (object) {
    return baseInvoke(object, path, args);
  };
});

module.exports = method;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL21ldGhvZC5qcyJdLCJuYW1lcyI6WyJiYXNlSW52b2tlIiwicmVxdWlyZSIsImJhc2VSZXN0IiwibWV0aG9kIiwicGF0aCIsImFyZ3MiLCJvYmplY3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGFBQWFDLFFBQVEsZUFBUixDQUFqQjtBQUFBLElBQ0lDLFdBQVdELFFBQVEsYUFBUixDQURmOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsSUFBSUUsU0FBU0QsU0FBUyxVQUFTRSxJQUFULEVBQWVDLElBQWYsRUFBcUI7QUFDekMsU0FBTyxVQUFTQyxNQUFULEVBQWlCO0FBQ3RCLFdBQU9OLFdBQVdNLE1BQVgsRUFBbUJGLElBQW5CLEVBQXlCQyxJQUF6QixDQUFQO0FBQ0QsR0FGRDtBQUdELENBSlksQ0FBYjs7QUFNQUUsT0FBT0MsT0FBUCxHQUFpQkwsTUFBakIiLCJmaWxlIjoibWV0aG9kLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VJbnZva2UgPSByZXF1aXJlKCcuL19iYXNlSW52b2tlJyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdGhlIG1ldGhvZCBhdCBgcGF0aGAgb2YgYSBnaXZlbiBvYmplY3QuXG4gKiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYXJlIHByb3ZpZGVkIHRvIHRoZSBpbnZva2VkIG1ldGhvZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIG1ldGhvZCB0byBpbnZva2UuXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSBUaGUgYXJndW1lbnRzIHRvIGludm9rZSB0aGUgbWV0aG9kIHdpdGguXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBpbnZva2VyIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IFtcbiAqICAgeyAnYSc6IHsgJ2InOiBfLmNvbnN0YW50KDIpIH0gfSxcbiAqICAgeyAnYSc6IHsgJ2InOiBfLmNvbnN0YW50KDEpIH0gfVxuICogXTtcbiAqXG4gKiBfLm1hcChvYmplY3RzLCBfLm1ldGhvZCgnYS5iJykpO1xuICogLy8gPT4gWzIsIDFdXG4gKlxuICogXy5tYXAob2JqZWN0cywgXy5tZXRob2QoWydhJywgJ2InXSkpO1xuICogLy8gPT4gWzIsIDFdXG4gKi9cbnZhciBtZXRob2QgPSBiYXNlUmVzdChmdW5jdGlvbihwYXRoLCBhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gYmFzZUludm9rZShvYmplY3QsIHBhdGgsIGFyZ3MpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbWV0aG9kO1xuIl19