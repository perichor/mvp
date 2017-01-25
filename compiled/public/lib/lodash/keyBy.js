'use strict';

var baseAssignValue = require('./_baseAssignValue'),
    createAggregator = require('./_createAggregator');

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is the last element responsible for generating the key. The
 * iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * var array = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ];
 *
 * _.keyBy(array, function(o) {
 *   return String.fromCharCode(o.code);
 * });
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 *
 * _.keyBy(array, 'dir');
 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 */
var keyBy = createAggregator(function (result, value, key) {
  baseAssignValue(result, key, value);
});

module.exports = keyBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2tleUJ5LmpzIl0sIm5hbWVzIjpbImJhc2VBc3NpZ25WYWx1ZSIsInJlcXVpcmUiLCJjcmVhdGVBZ2dyZWdhdG9yIiwia2V5QnkiLCJyZXN1bHQiLCJ2YWx1ZSIsImtleSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsa0JBQWtCQyxRQUFRLG9CQUFSLENBQXRCO0FBQUEsSUFDSUMsbUJBQW1CRCxRQUFRLHFCQUFSLENBRHZCOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLElBQUlFLFFBQVFELGlCQUFpQixVQUFTRSxNQUFULEVBQWlCQyxLQUFqQixFQUF3QkMsR0FBeEIsRUFBNkI7QUFDeEROLGtCQUFnQkksTUFBaEIsRUFBd0JFLEdBQXhCLEVBQTZCRCxLQUE3QjtBQUNELENBRlcsQ0FBWjs7QUFJQUUsT0FBT0MsT0FBUCxHQUFpQkwsS0FBakIiLCJmaWxlIjoia2V5QnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYmFzZUFzc2lnblZhbHVlJyksXG4gICAgY3JlYXRlQWdncmVnYXRvciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUFnZ3JlZ2F0b3InKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCBjb21wb3NlZCBvZiBrZXlzIGdlbmVyYXRlZCBmcm9tIHRoZSByZXN1bHRzIG9mIHJ1bm5pbmdcbiAqIGVhY2ggZWxlbWVudCBvZiBgY29sbGVjdGlvbmAgdGhydSBgaXRlcmF0ZWVgLiBUaGUgY29ycmVzcG9uZGluZyB2YWx1ZSBvZlxuICogZWFjaCBrZXkgaXMgdGhlIGxhc3QgZWxlbWVudCByZXNwb25zaWJsZSBmb3IgZ2VuZXJhdGluZyB0aGUga2V5LiBUaGVcbiAqIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6ICh2YWx1ZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgaXRlcmF0ZWUgdG8gdHJhbnNmb3JtIGtleXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb21wb3NlZCBhZ2dyZWdhdGUgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXkgPSBbXG4gKiAgIHsgJ2Rpcic6ICdsZWZ0JywgJ2NvZGUnOiA5NyB9LFxuICogICB7ICdkaXInOiAncmlnaHQnLCAnY29kZSc6IDEwMCB9XG4gKiBdO1xuICpcbiAqIF8ua2V5QnkoYXJyYXksIGZ1bmN0aW9uKG8pIHtcbiAqICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoby5jb2RlKTtcbiAqIH0pO1xuICogLy8gPT4geyAnYSc6IHsgJ2Rpcic6ICdsZWZ0JywgJ2NvZGUnOiA5NyB9LCAnZCc6IHsgJ2Rpcic6ICdyaWdodCcsICdjb2RlJzogMTAwIH0gfVxuICpcbiAqIF8ua2V5QnkoYXJyYXksICdkaXInKTtcbiAqIC8vID0+IHsgJ2xlZnQnOiB7ICdkaXInOiAnbGVmdCcsICdjb2RlJzogOTcgfSwgJ3JpZ2h0JzogeyAnZGlyJzogJ3JpZ2h0JywgJ2NvZGUnOiAxMDAgfSB9XG4gKi9cbnZhciBrZXlCeSA9IGNyZWF0ZUFnZ3JlZ2F0b3IoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gIGJhc2VBc3NpZ25WYWx1ZShyZXN1bHQsIGtleSwgdmFsdWUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5Qnk7XG4iXX0=