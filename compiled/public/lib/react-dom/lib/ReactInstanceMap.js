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

/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 */

// TODO: Replace this with ES6: var ReactInstanceMap = new Map();

var ReactInstanceMap = {

  /**
   * This API should be called `delete` but we'd have to make sure to always
   * transform these to strings for IE support. When this transform is fully
   * supported we can rename it.
   */
  remove: function remove(key) {
    key._reactInternalInstance = undefined;
  },

  get: function get(key) {
    return key._reactInternalInstance;
  },

  has: function has(key) {
    return key._reactInternalInstance !== undefined;
  },

  set: function set(key, value) {
    key._reactInternalInstance = value;
  }

};

module.exports = ReactInstanceMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdEluc3RhbmNlTWFwLmpzIl0sIm5hbWVzIjpbIlJlYWN0SW5zdGFuY2VNYXAiLCJyZW1vdmUiLCJrZXkiLCJfcmVhY3RJbnRlcm5hbEluc3RhbmNlIiwidW5kZWZpbmVkIiwiZ2V0IiwiaGFzIiwic2V0IiwidmFsdWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBOzs7Ozs7O0FBT0E7O0FBRUEsSUFBSUEsbUJBQW1COztBQUVyQjs7Ozs7QUFLQUMsVUFBUSxnQkFBVUMsR0FBVixFQUFlO0FBQ3JCQSxRQUFJQyxzQkFBSixHQUE2QkMsU0FBN0I7QUFDRCxHQVRvQjs7QUFXckJDLE9BQUssYUFBVUgsR0FBVixFQUFlO0FBQ2xCLFdBQU9BLElBQUlDLHNCQUFYO0FBQ0QsR0Fib0I7O0FBZXJCRyxPQUFLLGFBQVVKLEdBQVYsRUFBZTtBQUNsQixXQUFPQSxJQUFJQyxzQkFBSixLQUErQkMsU0FBdEM7QUFDRCxHQWpCb0I7O0FBbUJyQkcsT0FBSyxhQUFVTCxHQUFWLEVBQWVNLEtBQWYsRUFBc0I7QUFDekJOLFFBQUlDLHNCQUFKLEdBQTZCSyxLQUE3QjtBQUNEOztBQXJCb0IsQ0FBdkI7O0FBeUJBQyxPQUFPQyxPQUFQLEdBQWlCVixnQkFBakIiLCJmaWxlIjoiUmVhY3RJbnN0YW5jZU1hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogYFJlYWN0SW5zdGFuY2VNYXBgIG1haW50YWlucyBhIG1hcHBpbmcgZnJvbSBhIHB1YmxpYyBmYWNpbmcgc3RhdGVmdWxcbiAqIGluc3RhbmNlIChrZXkpIGFuZCB0aGUgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gKHZhbHVlKS4gVGhpcyBhbGxvd3MgcHVibGljXG4gKiBtZXRob2RzIHRvIGFjY2VwdCB0aGUgdXNlciBmYWNpbmcgaW5zdGFuY2UgYXMgYW4gYXJndW1lbnQgYW5kIG1hcCB0aGVtIGJhY2tcbiAqIHRvIGludGVybmFsIG1ldGhvZHMuXG4gKi9cblxuLy8gVE9ETzogUmVwbGFjZSB0aGlzIHdpdGggRVM2OiB2YXIgUmVhY3RJbnN0YW5jZU1hcCA9IG5ldyBNYXAoKTtcblxudmFyIFJlYWN0SW5zdGFuY2VNYXAgPSB7XG5cbiAgLyoqXG4gICAqIFRoaXMgQVBJIHNob3VsZCBiZSBjYWxsZWQgYGRlbGV0ZWAgYnV0IHdlJ2QgaGF2ZSB0byBtYWtlIHN1cmUgdG8gYWx3YXlzXG4gICAqIHRyYW5zZm9ybSB0aGVzZSB0byBzdHJpbmdzIGZvciBJRSBzdXBwb3J0LiBXaGVuIHRoaXMgdHJhbnNmb3JtIGlzIGZ1bGx5XG4gICAqIHN1cHBvcnRlZCB3ZSBjYW4gcmVuYW1lIGl0LlxuICAgKi9cbiAgcmVtb3ZlOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAga2V5Ll9yZWFjdEludGVybmFsSW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIH0sXG5cbiAgZ2V0OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGtleS5fcmVhY3RJbnRlcm5hbEluc3RhbmNlO1xuICB9LFxuXG4gIGhhczogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBrZXkuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZSAhPT0gdW5kZWZpbmVkO1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICBrZXkuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZSA9IHZhbHVlO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RJbnN0YW5jZU1hcDsiXX0=