'use strict';

var apply = require('./_apply'),
    assignInWith = require('./assignInWith'),
    baseRest = require('./_baseRest'),
    customDefaultsAssignIn = require('./_customDefaultsAssignIn');

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults = baseRest(function (args) {
  args.push(undefined, customDefaultsAssignIn);
  return apply(assignInWith, undefined, args);
});

module.exports = defaults;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbImFwcGx5IiwicmVxdWlyZSIsImFzc2lnbkluV2l0aCIsImJhc2VSZXN0IiwiY3VzdG9tRGVmYXVsdHNBc3NpZ25JbiIsImRlZmF1bHRzIiwiYXJncyIsInB1c2giLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFFBQVFDLFFBQVEsVUFBUixDQUFaO0FBQUEsSUFDSUMsZUFBZUQsUUFBUSxnQkFBUixDQURuQjtBQUFBLElBRUlFLFdBQVdGLFFBQVEsYUFBUixDQUZmO0FBQUEsSUFHSUcseUJBQXlCSCxRQUFRLDJCQUFSLENBSDdCOztBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsSUFBSUksV0FBV0YsU0FBUyxVQUFTRyxJQUFULEVBQWU7QUFDckNBLE9BQUtDLElBQUwsQ0FBVUMsU0FBVixFQUFxQkosc0JBQXJCO0FBQ0EsU0FBT0osTUFBTUUsWUFBTixFQUFvQk0sU0FBcEIsRUFBK0JGLElBQS9CLENBQVA7QUFDRCxDQUhjLENBQWY7O0FBS0FHLE9BQU9DLE9BQVAsR0FBaUJMLFFBQWpCIiwiZmlsZSI6ImRlZmF1bHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcGx5ID0gcmVxdWlyZSgnLi9fYXBwbHknKSxcbiAgICBhc3NpZ25JbldpdGggPSByZXF1aXJlKCcuL2Fzc2lnbkluV2l0aCcpLFxuICAgIGJhc2VSZXN0ID0gcmVxdWlyZSgnLi9fYmFzZVJlc3QnKSxcbiAgICBjdXN0b21EZWZhdWx0c0Fzc2lnbkluID0gcmVxdWlyZSgnLi9fY3VzdG9tRGVmYXVsdHNBc3NpZ25JbicpO1xuXG4vKipcbiAqIEFzc2lnbnMgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBzb3VyY2VcbiAqIG9iamVjdHMgdG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdCBmb3IgYWxsIGRlc3RpbmF0aW9uIHByb3BlcnRpZXMgdGhhdFxuICogcmVzb2x2ZSB0byBgdW5kZWZpbmVkYC4gU291cmNlIG9iamVjdHMgYXJlIGFwcGxpZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LlxuICogT25jZSBhIHByb3BlcnR5IGlzIHNldCwgYWRkaXRpb25hbCB2YWx1ZXMgb2YgdGhlIHNhbWUgcHJvcGVydHkgYXJlIGlnbm9yZWQuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQHNlZSBfLmRlZmF1bHRzRGVlcFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmF1bHRzKHsgJ2EnOiAxIH0sIHsgJ2InOiAyIH0sIHsgJ2EnOiAzIH0pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKi9cbnZhciBkZWZhdWx0cyA9IGJhc2VSZXN0KGZ1bmN0aW9uKGFyZ3MpIHtcbiAgYXJncy5wdXNoKHVuZGVmaW5lZCwgY3VzdG9tRGVmYXVsdHNBc3NpZ25Jbik7XG4gIHJldHVybiBhcHBseShhc3NpZ25JbldpdGgsIHVuZGVmaW5lZCwgYXJncyk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiJdfQ==