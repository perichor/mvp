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

var ReactDOMComponentTree = require('./ReactDOMComponentTree');

var focusNode = require('fbjs/lib/focusNode');

var AutoFocusUtils = {
  focusDOMComponent: function focusDOMComponent() {
    focusNode(ReactDOMComponentTree.getNodeFromInstance(this));
  }
};

module.exports = AutoFocusUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9BdXRvRm9jdXNVdGlscy5qcyJdLCJuYW1lcyI6WyJSZWFjdERPTUNvbXBvbmVudFRyZWUiLCJyZXF1aXJlIiwiZm9jdXNOb2RlIiwiQXV0b0ZvY3VzVXRpbHMiLCJmb2N1c0RPTUNvbXBvbmVudCIsImdldE5vZGVGcm9tSW5zdGFuY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBLElBQUlBLHdCQUF3QkMsUUFBUSx5QkFBUixDQUE1Qjs7QUFFQSxJQUFJQyxZQUFZRCxRQUFRLG9CQUFSLENBQWhCOztBQUVBLElBQUlFLGlCQUFpQjtBQUNuQkMscUJBQW1CLDZCQUFZO0FBQzdCRixjQUFVRixzQkFBc0JLLG1CQUF0QixDQUEwQyxJQUExQyxDQUFWO0FBQ0Q7QUFIa0IsQ0FBckI7O0FBTUFDLE9BQU9DLE9BQVAsR0FBaUJKLGNBQWpCIiwiZmlsZSI6IkF1dG9Gb2N1c1V0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RE9NQ29tcG9uZW50VHJlZSA9IHJlcXVpcmUoJy4vUmVhY3RET01Db21wb25lbnRUcmVlJyk7XG5cbnZhciBmb2N1c05vZGUgPSByZXF1aXJlKCdmYmpzL2xpYi9mb2N1c05vZGUnKTtcblxudmFyIEF1dG9Gb2N1c1V0aWxzID0ge1xuICBmb2N1c0RPTUNvbXBvbmVudDogZnVuY3Rpb24gKCkge1xuICAgIGZvY3VzTm9kZShSZWFjdERPTUNvbXBvbmVudFRyZWUuZ2V0Tm9kZUZyb21JbnN0YW5jZSh0aGlzKSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXV0b0ZvY3VzVXRpbHM7Il19