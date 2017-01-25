'use strict';

var lodash = require('./wrapperLodash');

/**
 * Creates a `lodash` wrapper instance that wraps `value` with explicit method
 * chain sequences enabled. The result of such sequences must be unwrapped
 * with `_#value`.
 *
 * @static
 * @memberOf _
 * @since 1.3.0
 * @category Seq
 * @param {*} value The value to wrap.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36 },
 *   { 'user': 'fred',    'age': 40 },
 *   { 'user': 'pebbles', 'age': 1 }
 * ];
 *
 * var youngest = _
 *   .chain(users)
 *   .sortBy('age')
 *   .map(function(o) {
 *     return o.user + ' is ' + o.age;
 *   })
 *   .head()
 *   .value();
 * // => 'pebbles is 1'
 */
function chain(value) {
  var result = lodash(value);
  result.__chain__ = true;
  return result;
}

module.exports = chain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2NoYWluLmpzIl0sIm5hbWVzIjpbImxvZGFzaCIsInJlcXVpcmUiLCJjaGFpbiIsInZhbHVlIiwicmVzdWx0IiwiX19jaGFpbl9fIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxTQUFTQyxRQUFRLGlCQUFSLENBQWI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLFNBQVNDLEtBQVQsQ0FBZUMsS0FBZixFQUFzQjtBQUNwQixNQUFJQyxTQUFTSixPQUFPRyxLQUFQLENBQWI7QUFDQUMsU0FBT0MsU0FBUCxHQUFtQixJQUFuQjtBQUNBLFNBQU9ELE1BQVA7QUFDRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQkwsS0FBakIiLCJmaWxlIjoiY2hhaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbG9kYXNoID0gcmVxdWlyZSgnLi93cmFwcGVyTG9kYXNoJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBsb2Rhc2hgIHdyYXBwZXIgaW5zdGFuY2UgdGhhdCB3cmFwcyBgdmFsdWVgIHdpdGggZXhwbGljaXQgbWV0aG9kXG4gKiBjaGFpbiBzZXF1ZW5jZXMgZW5hYmxlZC4gVGhlIHJlc3VsdCBvZiBzdWNoIHNlcXVlbmNlcyBtdXN0IGJlIHVud3JhcHBlZFxuICogd2l0aCBgXyN2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAxLjMuMFxuICogQGNhdGVnb3J5IFNlcVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gd3JhcC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBgbG9kYXNoYCB3cmFwcGVyIGluc3RhbmNlLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhZ2UnOiAzNiB9LFxuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICAnYWdlJzogNDAgfSxcbiAqICAgeyAndXNlcic6ICdwZWJibGVzJywgJ2FnZSc6IDEgfVxuICogXTtcbiAqXG4gKiB2YXIgeW91bmdlc3QgPSBfXG4gKiAgIC5jaGFpbih1c2VycylcbiAqICAgLnNvcnRCeSgnYWdlJylcbiAqICAgLm1hcChmdW5jdGlvbihvKSB7XG4gKiAgICAgcmV0dXJuIG8udXNlciArICcgaXMgJyArIG8uYWdlO1xuICogICB9KVxuICogICAuaGVhZCgpXG4gKiAgIC52YWx1ZSgpO1xuICogLy8gPT4gJ3BlYmJsZXMgaXMgMSdcbiAqL1xuZnVuY3Rpb24gY2hhaW4odmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IGxvZGFzaCh2YWx1ZSk7XG4gIHJlc3VsdC5fX2NoYWluX18gPSB0cnVlO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYWluO1xuIl19