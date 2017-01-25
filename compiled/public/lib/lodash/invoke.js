'use strict';

var baseInvoke = require('./_baseInvoke'),
    baseRest = require('./_baseRest');

/**
 * Invokes the method at `path` of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the method to invoke.
 * @param {...*} [args] The arguments to invoke the method with.
 * @returns {*} Returns the result of the invoked method.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
 *
 * _.invoke(object, 'a[0].b.c.slice', 1, 3);
 * // => [2, 3]
 */
var invoke = baseRest(baseInvoke);

module.exports = invoke;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ludm9rZS5qcyJdLCJuYW1lcyI6WyJiYXNlSW52b2tlIiwicmVxdWlyZSIsImJhc2VSZXN0IiwiaW52b2tlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxhQUFhQyxRQUFRLGVBQVIsQ0FBakI7QUFBQSxJQUNJQyxXQUFXRCxRQUFRLGFBQVIsQ0FEZjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLElBQUlFLFNBQVNELFNBQVNGLFVBQVQsQ0FBYjs7QUFFQUksT0FBT0MsT0FBUCxHQUFpQkYsTUFBakIiLCJmaWxlIjoiaW52b2tlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VJbnZva2UgPSByZXF1aXJlKCcuL19iYXNlSW52b2tlJyksXG4gICAgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpO1xuXG4vKipcbiAqIEludm9rZXMgdGhlIG1ldGhvZCBhdCBgcGF0aGAgb2YgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIG1ldGhvZCB0byBpbnZva2UuXG4gKiBAcGFyYW0gey4uLip9IFthcmdzXSBUaGUgYXJndW1lbnRzIHRvIGludm9rZSB0aGUgbWV0aG9kIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIHRoZSBpbnZva2VkIG1ldGhvZC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiBbMSwgMiwgMywgNF0gfSB9XSB9O1xuICpcbiAqIF8uaW52b2tlKG9iamVjdCwgJ2FbMF0uYi5jLnNsaWNlJywgMSwgMyk7XG4gKiAvLyA9PiBbMiwgM11cbiAqL1xudmFyIGludm9rZSA9IGJhc2VSZXN0KGJhc2VJbnZva2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludm9rZTtcbiJdfQ==