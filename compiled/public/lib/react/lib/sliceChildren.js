/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var ReactChildren = require('./ReactChildren');

/**
 * Slice children that are typically specified as `props.children`. This version
 * of slice children ignores empty child components.
 *
 * @param {*} children The children set to filter.
 * @param {number} start The first zero-based index to include in the subset.
 * @param {?number} end The non-inclusive last index of the subset.
 * @return {object} mirrored array with mapped children
 */
function sliceChildren(children, start, end) {
  if (children == null) {
    return children;
  }

  var array = ReactChildren.toArray(children);
  return array.slice(start, end);
}

module.exports = sliceChildren;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QvbGliL3NsaWNlQ2hpbGRyZW4uanMiXSwibmFtZXMiOlsiUmVhY3RDaGlsZHJlbiIsInJlcXVpcmUiLCJzbGljZUNoaWxkcmVuIiwiY2hpbGRyZW4iLCJzdGFydCIsImVuZCIsImFycmF5IiwidG9BcnJheSIsInNsaWNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxJQUFJQSxnQkFBZ0JDLFFBQVEsaUJBQVIsQ0FBcEI7O0FBRUE7Ozs7Ozs7OztBQVNBLFNBQVNDLGFBQVQsQ0FBdUJDLFFBQXZCLEVBQWlDQyxLQUFqQyxFQUF3Q0MsR0FBeEMsRUFBNkM7QUFDM0MsTUFBSUYsWUFBWSxJQUFoQixFQUFzQjtBQUNwQixXQUFPQSxRQUFQO0FBQ0Q7O0FBRUQsTUFBSUcsUUFBUU4sY0FBY08sT0FBZCxDQUFzQkosUUFBdEIsQ0FBWjtBQUNBLFNBQU9HLE1BQU1FLEtBQU4sQ0FBWUosS0FBWixFQUFtQkMsR0FBbkIsQ0FBUDtBQUNEOztBQUVESSxPQUFPQyxPQUFQLEdBQWlCUixhQUFqQiIsImZpbGUiOiJzbGljZUNoaWxkcmVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Q2hpbGRyZW4gPSByZXF1aXJlKCcuL1JlYWN0Q2hpbGRyZW4nKTtcblxuLyoqXG4gKiBTbGljZSBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuIFRoaXMgdmVyc2lvblxuICogb2Ygc2xpY2UgY2hpbGRyZW4gaWdub3JlcyBlbXB0eSBjaGlsZCBjb21wb25lbnRzLlxuICpcbiAqIEBwYXJhbSB7Kn0gY2hpbGRyZW4gVGhlIGNoaWxkcmVuIHNldCB0byBmaWx0ZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgVGhlIGZpcnN0IHplcm8tYmFzZWQgaW5kZXggdG8gaW5jbHVkZSBpbiB0aGUgc3Vic2V0LlxuICogQHBhcmFtIHs/bnVtYmVyfSBlbmQgVGhlIG5vbi1pbmNsdXNpdmUgbGFzdCBpbmRleCBvZiB0aGUgc3Vic2V0LlxuICogQHJldHVybiB7b2JqZWN0fSBtaXJyb3JlZCBhcnJheSB3aXRoIG1hcHBlZCBjaGlsZHJlblxuICovXG5mdW5jdGlvbiBzbGljZUNoaWxkcmVuKGNoaWxkcmVuLCBzdGFydCwgZW5kKSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgdmFyIGFycmF5ID0gUmVhY3RDaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKTtcbiAgcmV0dXJuIGFycmF5LnNsaWNlKHN0YXJ0LCBlbmQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNsaWNlQ2hpbGRyZW47Il19