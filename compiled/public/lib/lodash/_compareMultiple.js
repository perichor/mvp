'use strict';

var compareAscending = require('./_compareAscending');

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

module.exports = compareMultiple;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19jb21wYXJlTXVsdGlwbGUuanMiXSwibmFtZXMiOlsiY29tcGFyZUFzY2VuZGluZyIsInJlcXVpcmUiLCJjb21wYXJlTXVsdGlwbGUiLCJvYmplY3QiLCJvdGhlciIsIm9yZGVycyIsImluZGV4Iiwib2JqQ3JpdGVyaWEiLCJjcml0ZXJpYSIsIm90aENyaXRlcmlhIiwibGVuZ3RoIiwib3JkZXJzTGVuZ3RoIiwicmVzdWx0Iiwib3JkZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLG1CQUFtQkMsUUFBUSxxQkFBUixDQUF2Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxTQUFTQyxlQUFULENBQXlCQyxNQUF6QixFQUFpQ0MsS0FBakMsRUFBd0NDLE1BQXhDLEVBQWdEO0FBQzlDLE1BQUlDLFFBQVEsQ0FBQyxDQUFiO0FBQUEsTUFDSUMsY0FBY0osT0FBT0ssUUFEekI7QUFBQSxNQUVJQyxjQUFjTCxNQUFNSSxRQUZ4QjtBQUFBLE1BR0lFLFNBQVNILFlBQVlHLE1BSHpCO0FBQUEsTUFJSUMsZUFBZU4sT0FBT0ssTUFKMUI7O0FBTUEsU0FBTyxFQUFFSixLQUFGLEdBQVVJLE1BQWpCLEVBQXlCO0FBQ3ZCLFFBQUlFLFNBQVNaLGlCQUFpQk8sWUFBWUQsS0FBWixDQUFqQixFQUFxQ0csWUFBWUgsS0FBWixDQUFyQyxDQUFiO0FBQ0EsUUFBSU0sTUFBSixFQUFZO0FBQ1YsVUFBSU4sU0FBU0ssWUFBYixFQUEyQjtBQUN6QixlQUFPQyxNQUFQO0FBQ0Q7QUFDRCxVQUFJQyxRQUFRUixPQUFPQyxLQUFQLENBQVo7QUFDQSxhQUFPTSxVQUFVQyxTQUFTLE1BQVQsR0FBa0IsQ0FBQyxDQUFuQixHQUF1QixDQUFqQyxDQUFQO0FBQ0Q7QUFDRjtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBT1YsT0FBT0csS0FBUCxHQUFlRixNQUFNRSxLQUE1QjtBQUNEOztBQUVEUSxPQUFPQyxPQUFQLEdBQWlCYixlQUFqQiIsImZpbGUiOiJfY29tcGFyZU11bHRpcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbXBhcmVBc2NlbmRpbmcgPSByZXF1aXJlKCcuL19jb21wYXJlQXNjZW5kaW5nJyk7XG5cbi8qKlxuICogVXNlZCBieSBgXy5vcmRlckJ5YCB0byBjb21wYXJlIG11bHRpcGxlIHByb3BlcnRpZXMgb2YgYSB2YWx1ZSB0byBhbm90aGVyXG4gKiBhbmQgc3RhYmxlIHNvcnQgdGhlbS5cbiAqXG4gKiBJZiBgb3JkZXJzYCBpcyB1bnNwZWNpZmllZCwgYWxsIHZhbHVlcyBhcmUgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlci4gT3RoZXJ3aXNlLFxuICogc3BlY2lmeSBhbiBvcmRlciBvZiBcImRlc2NcIiBmb3IgZGVzY2VuZGluZyBvciBcImFzY1wiIGZvciBhc2NlbmRpbmcgc29ydCBvcmRlclxuICogb2YgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbltdfHN0cmluZ1tdfSBvcmRlcnMgVGhlIG9yZGVyIHRvIHNvcnQgYnkgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzb3J0IG9yZGVyIGluZGljYXRvciBmb3IgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVNdWx0aXBsZShvYmplY3QsIG90aGVyLCBvcmRlcnMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBvYmpDcml0ZXJpYSA9IG9iamVjdC5jcml0ZXJpYSxcbiAgICAgIG90aENyaXRlcmlhID0gb3RoZXIuY3JpdGVyaWEsXG4gICAgICBsZW5ndGggPSBvYmpDcml0ZXJpYS5sZW5ndGgsXG4gICAgICBvcmRlcnNMZW5ndGggPSBvcmRlcnMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNvbXBhcmVBc2NlbmRpbmcob2JqQ3JpdGVyaWFbaW5kZXhdLCBvdGhDcml0ZXJpYVtpbmRleF0pO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIGlmIChpbmRleCA+PSBvcmRlcnNMZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHZhciBvcmRlciA9IG9yZGVyc1tpbmRleF07XG4gICAgICByZXR1cm4gcmVzdWx0ICogKG9yZGVyID09ICdkZXNjJyA/IC0xIDogMSk7XG4gICAgfVxuICB9XG4gIC8vIEZpeGVzIGFuIGBBcnJheSNzb3J0YCBidWcgaW4gdGhlIEpTIGVuZ2luZSBlbWJlZGRlZCBpbiBBZG9iZSBhcHBsaWNhdGlvbnNcbiAgLy8gdGhhdCBjYXVzZXMgaXQsIHVuZGVyIGNlcnRhaW4gY2lyY3Vtc3RhbmNlcywgdG8gcHJvdmlkZSB0aGUgc2FtZSB2YWx1ZSBmb3JcbiAgLy8gYG9iamVjdGAgYW5kIGBvdGhlcmAuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvcHVsbC8xMjQ3XG4gIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gIC8vXG4gIC8vIFRoaXMgYWxzbyBlbnN1cmVzIGEgc3RhYmxlIHNvcnQgaW4gVjggYW5kIG90aGVyIGVuZ2luZXMuXG4gIC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD05MCBmb3IgbW9yZSBkZXRhaWxzLlxuICByZXR1cm4gb2JqZWN0LmluZGV4IC0gb3RoZXIuaW5kZXg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29tcGFyZU11bHRpcGxlO1xuIl19