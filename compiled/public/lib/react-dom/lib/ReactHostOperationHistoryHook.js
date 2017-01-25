/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var history = [];

var ReactHostOperationHistoryHook = {
  onHostOperation: function onHostOperation(operation) {
    history.push(operation);
  },
  clearHistory: function clearHistory() {
    if (ReactHostOperationHistoryHook._preventClearing) {
      // Should only be used for tests.
      return;
    }

    history = [];
  },
  getHistory: function getHistory() {
    return history;
  }
};

module.exports = ReactHostOperationHistoryHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdEhvc3RPcGVyYXRpb25IaXN0b3J5SG9vay5qcyJdLCJuYW1lcyI6WyJoaXN0b3J5IiwiUmVhY3RIb3N0T3BlcmF0aW9uSGlzdG9yeUhvb2siLCJvbkhvc3RPcGVyYXRpb24iLCJvcGVyYXRpb24iLCJwdXNoIiwiY2xlYXJIaXN0b3J5IiwiX3ByZXZlbnRDbGVhcmluZyIsImdldEhpc3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQSxJQUFJQSxVQUFVLEVBQWQ7O0FBRUEsSUFBSUMsZ0NBQWdDO0FBQ2xDQyxtQkFBaUIseUJBQVVDLFNBQVYsRUFBcUI7QUFDcENILFlBQVFJLElBQVIsQ0FBYUQsU0FBYjtBQUNELEdBSGlDO0FBSWxDRSxnQkFBYyx3QkFBWTtBQUN4QixRQUFJSiw4QkFBOEJLLGdCQUFsQyxFQUFvRDtBQUNsRDtBQUNBO0FBQ0Q7O0FBRUROLGNBQVUsRUFBVjtBQUNELEdBWGlDO0FBWWxDTyxjQUFZLHNCQUFZO0FBQ3RCLFdBQU9QLE9BQVA7QUFDRDtBQWRpQyxDQUFwQzs7QUFpQkFRLE9BQU9DLE9BQVAsR0FBaUJSLDZCQUFqQiIsImZpbGUiOiJSZWFjdEhvc3RPcGVyYXRpb25IaXN0b3J5SG9vay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhpc3RvcnkgPSBbXTtcblxudmFyIFJlYWN0SG9zdE9wZXJhdGlvbkhpc3RvcnlIb29rID0ge1xuICBvbkhvc3RPcGVyYXRpb246IGZ1bmN0aW9uIChvcGVyYXRpb24pIHtcbiAgICBoaXN0b3J5LnB1c2gob3BlcmF0aW9uKTtcbiAgfSxcbiAgY2xlYXJIaXN0b3J5OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFJlYWN0SG9zdE9wZXJhdGlvbkhpc3RvcnlIb29rLl9wcmV2ZW50Q2xlYXJpbmcpIHtcbiAgICAgIC8vIFNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIHRlc3RzLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGhpc3RvcnkgPSBbXTtcbiAgfSxcbiAgZ2V0SGlzdG9yeTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBoaXN0b3J5O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0SG9zdE9wZXJhdGlvbkhpc3RvcnlIb29rOyJdfQ==