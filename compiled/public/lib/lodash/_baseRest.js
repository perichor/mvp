'use strict';

var identity = require('./identity'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlUmVzdC5qcyJdLCJuYW1lcyI6WyJpZGVudGl0eSIsInJlcXVpcmUiLCJvdmVyUmVzdCIsInNldFRvU3RyaW5nIiwiYmFzZVJlc3QiLCJmdW5jIiwic3RhcnQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsWUFBUixDQUFmO0FBQUEsSUFDSUMsV0FBV0QsUUFBUSxhQUFSLENBRGY7QUFBQSxJQUVJRSxjQUFjRixRQUFRLGdCQUFSLENBRmxCOztBQUlBOzs7Ozs7OztBQVFBLFNBQVNHLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCQyxLQUF4QixFQUErQjtBQUM3QixTQUFPSCxZQUFZRCxTQUFTRyxJQUFULEVBQWVDLEtBQWYsRUFBc0JOLFFBQXRCLENBQVosRUFBNkNLLE9BQU8sRUFBcEQsQ0FBUDtBQUNEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCSixRQUFqQiIsImZpbGUiOiJfYmFzZVJlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5JyksXG4gICAgb3ZlclJlc3QgPSByZXF1aXJlKCcuL19vdmVyUmVzdCcpLFxuICAgIHNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fc2V0VG9TdHJpbmcnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgcmV0dXJuIHNldFRvU3RyaW5nKG92ZXJSZXN0KGZ1bmMsIHN0YXJ0LCBpZGVudGl0eSksIGZ1bmMgKyAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVJlc3Q7XG4iXX0=