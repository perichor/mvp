/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var ReactServerBatchingStrategy = {
  isBatchingUpdates: false,
  batchedUpdates: function batchedUpdates(callback) {
    // Don't do anything here. During the server rendering we don't want to
    // schedule any updates. We will simply ignore them.
  }
};

module.exports = ReactServerBatchingStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdFNlcnZlckJhdGNoaW5nU3RyYXRlZ3kuanMiXSwibmFtZXMiOlsiUmVhY3RTZXJ2ZXJCYXRjaGluZ1N0cmF0ZWd5IiwiaXNCYXRjaGluZ1VwZGF0ZXMiLCJiYXRjaGVkVXBkYXRlcyIsImNhbGxiYWNrIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxJQUFJQSw4QkFBOEI7QUFDaENDLHFCQUFtQixLQURhO0FBRWhDQyxrQkFBZ0Isd0JBQVVDLFFBQVYsRUFBb0I7QUFDbEM7QUFDQTtBQUNEO0FBTCtCLENBQWxDOztBQVFBQyxPQUFPQyxPQUFQLEdBQWlCTCwyQkFBakIiLCJmaWxlIjoiUmVhY3RTZXJ2ZXJCYXRjaGluZ1N0cmF0ZWd5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0U2VydmVyQmF0Y2hpbmdTdHJhdGVneSA9IHtcbiAgaXNCYXRjaGluZ1VwZGF0ZXM6IGZhbHNlLFxuICBiYXRjaGVkVXBkYXRlczogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaGVyZS4gRHVyaW5nIHRoZSBzZXJ2ZXIgcmVuZGVyaW5nIHdlIGRvbid0IHdhbnQgdG9cbiAgICAvLyBzY2hlZHVsZSBhbnkgdXBkYXRlcy4gV2Ugd2lsbCBzaW1wbHkgaWdub3JlIHRoZW0uXG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RTZXJ2ZXJCYXRjaGluZ1N0cmF0ZWd5OyJdfQ==