/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var MOD = 65521;

// adler32 is not cryptographically strong, and is only used to sanity check that
// markup generated on the server matches the markup generated on the client.
// This implementation (a modified version of the SheetJS version) has been optimized
// for our use case, at the expense of conforming to the adler32 specification
// for non-ascii inputs.
function adler32(data) {
  var a = 1;
  var b = 0;
  var i = 0;
  var l = data.length;
  var m = l & ~0x3;
  while (i < m) {
    var n = Math.min(i + 4096, m);
    for (; i < n; i += 4) {
      b += (a += data.charCodeAt(i)) + (a += data.charCodeAt(i + 1)) + (a += data.charCodeAt(i + 2)) + (a += data.charCodeAt(i + 3));
    }
    a %= MOD;
    b %= MOD;
  }
  for (; i < l; i++) {
    b += a += data.charCodeAt(i);
  }
  a %= MOD;
  b %= MOD;
  return a | b << 16;
}

module.exports = adler32;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9hZGxlcjMyLmpzIl0sIm5hbWVzIjpbIk1PRCIsImFkbGVyMzIiLCJkYXRhIiwiYSIsImIiLCJpIiwibCIsImxlbmd0aCIsIm0iLCJuIiwiTWF0aCIsIm1pbiIsImNoYXJDb2RlQXQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQSxJQUFJQSxNQUFNLEtBQVY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNDLE9BQVQsQ0FBaUJDLElBQWpCLEVBQXVCO0FBQ3JCLE1BQUlDLElBQUksQ0FBUjtBQUNBLE1BQUlDLElBQUksQ0FBUjtBQUNBLE1BQUlDLElBQUksQ0FBUjtBQUNBLE1BQUlDLElBQUlKLEtBQUtLLE1BQWI7QUFDQSxNQUFJQyxJQUFJRixJQUFJLENBQUMsR0FBYjtBQUNBLFNBQU9ELElBQUlHLENBQVgsRUFBYztBQUNaLFFBQUlDLElBQUlDLEtBQUtDLEdBQUwsQ0FBU04sSUFBSSxJQUFiLEVBQW1CRyxDQUFuQixDQUFSO0FBQ0EsV0FBT0gsSUFBSUksQ0FBWCxFQUFjSixLQUFLLENBQW5CLEVBQXNCO0FBQ3BCRCxXQUFLLENBQUNELEtBQUtELEtBQUtVLFVBQUwsQ0FBZ0JQLENBQWhCLENBQU4sS0FBNkJGLEtBQUtELEtBQUtVLFVBQUwsQ0FBZ0JQLElBQUksQ0FBcEIsQ0FBbEMsS0FBNkRGLEtBQUtELEtBQUtVLFVBQUwsQ0FBZ0JQLElBQUksQ0FBcEIsQ0FBbEUsS0FBNkZGLEtBQUtELEtBQUtVLFVBQUwsQ0FBZ0JQLElBQUksQ0FBcEIsQ0FBbEcsQ0FBTDtBQUNEO0FBQ0RGLFNBQUtILEdBQUw7QUFDQUksU0FBS0osR0FBTDtBQUNEO0FBQ0QsU0FBT0ssSUFBSUMsQ0FBWCxFQUFjRCxHQUFkLEVBQW1CO0FBQ2pCRCxTQUFLRCxLQUFLRCxLQUFLVSxVQUFMLENBQWdCUCxDQUFoQixDQUFWO0FBQ0Q7QUFDREYsT0FBS0gsR0FBTDtBQUNBSSxPQUFLSixHQUFMO0FBQ0EsU0FBT0csSUFBSUMsS0FBSyxFQUFoQjtBQUNEOztBQUVEUyxPQUFPQyxPQUFQLEdBQWlCYixPQUFqQiIsImZpbGUiOiJhZGxlcjMyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTU9EID0gNjU1MjE7XG5cbi8vIGFkbGVyMzIgaXMgbm90IGNyeXB0b2dyYXBoaWNhbGx5IHN0cm9uZywgYW5kIGlzIG9ubHkgdXNlZCB0byBzYW5pdHkgY2hlY2sgdGhhdFxuLy8gbWFya3VwIGdlbmVyYXRlZCBvbiB0aGUgc2VydmVyIG1hdGNoZXMgdGhlIG1hcmt1cCBnZW5lcmF0ZWQgb24gdGhlIGNsaWVudC5cbi8vIFRoaXMgaW1wbGVtZW50YXRpb24gKGEgbW9kaWZpZWQgdmVyc2lvbiBvZiB0aGUgU2hlZXRKUyB2ZXJzaW9uKSBoYXMgYmVlbiBvcHRpbWl6ZWRcbi8vIGZvciBvdXIgdXNlIGNhc2UsIGF0IHRoZSBleHBlbnNlIG9mIGNvbmZvcm1pbmcgdG8gdGhlIGFkbGVyMzIgc3BlY2lmaWNhdGlvblxuLy8gZm9yIG5vbi1hc2NpaSBpbnB1dHMuXG5mdW5jdGlvbiBhZGxlcjMyKGRhdGEpIHtcbiAgdmFyIGEgPSAxO1xuICB2YXIgYiA9IDA7XG4gIHZhciBpID0gMDtcbiAgdmFyIGwgPSBkYXRhLmxlbmd0aDtcbiAgdmFyIG0gPSBsICYgfjB4MztcbiAgd2hpbGUgKGkgPCBtKSB7XG4gICAgdmFyIG4gPSBNYXRoLm1pbihpICsgNDA5NiwgbSk7XG4gICAgZm9yICg7IGkgPCBuOyBpICs9IDQpIHtcbiAgICAgIGIgKz0gKGEgKz0gZGF0YS5jaGFyQ29kZUF0KGkpKSArIChhICs9IGRhdGEuY2hhckNvZGVBdChpICsgMSkpICsgKGEgKz0gZGF0YS5jaGFyQ29kZUF0KGkgKyAyKSkgKyAoYSArPSBkYXRhLmNoYXJDb2RlQXQoaSArIDMpKTtcbiAgICB9XG4gICAgYSAlPSBNT0Q7XG4gICAgYiAlPSBNT0Q7XG4gIH1cbiAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICBiICs9IGEgKz0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIGEgJT0gTU9EO1xuICBiICU9IE1PRDtcbiAgcmV0dXJuIGEgfCBiIDw8IDE2O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkbGVyMzI7Il19