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

var ReactDOM;

function getReactDOM() {
  if (!ReactDOM) {
    // This is safe to use because current module only exists in the addons build:
    var ReactWithAddonsUMDEntry = require('./ReactWithAddonsUMDEntry');
    // This is injected by the ReactDOM UMD build:
    ReactDOM = ReactWithAddonsUMDEntry.__SECRET_INJECTED_REACT_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  }
  return ReactDOM;
}

exports.getReactDOM = getReactDOM;

if (process.env.NODE_ENV !== 'production') {
  exports.getReactPerf = function () {
    return getReactDOM().__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactPerf;
  };

  exports.getReactTestUtils = function () {
    return getReactDOM().__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactTestUtils;
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QvbGliL1JlYWN0QWRkb25zRE9NRGVwZW5kZW5jaWVzVU1EU2hpbS5qcyJdLCJuYW1lcyI6WyJSZWFjdERPTSIsImdldFJlYWN0RE9NIiwiUmVhY3RXaXRoQWRkb25zVU1ERW50cnkiLCJyZXF1aXJlIiwiX19TRUNSRVRfSU5KRUNURURfUkVBQ1RfRE9NX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQiLCJleHBvcnRzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiZ2V0UmVhY3RQZXJmIiwiX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQiLCJSZWFjdFBlcmYiLCJnZXRSZWFjdFRlc3RVdGlscyIsIlJlYWN0VGVzdFV0aWxzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBLElBQUlBLFFBQUo7O0FBRUEsU0FBU0MsV0FBVCxHQUF1QjtBQUNyQixNQUFJLENBQUNELFFBQUwsRUFBZTtBQUNiO0FBQ0EsUUFBSUUsMEJBQTBCQyxRQUFRLDJCQUFSLENBQTlCO0FBQ0E7QUFDQUgsZUFBV0Usd0JBQXdCRSwyREFBbkM7QUFDRDtBQUNELFNBQU9KLFFBQVA7QUFDRDs7QUFFREssUUFBUUosV0FBUixHQUFzQkEsV0FBdEI7O0FBRUEsSUFBSUssUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDSCxVQUFRSSxZQUFSLEdBQXVCLFlBQVk7QUFDakMsV0FBT1IsY0FBY1Msa0RBQWQsQ0FBaUVDLFNBQXhFO0FBQ0QsR0FGRDs7QUFJQU4sVUFBUU8saUJBQVIsR0FBNEIsWUFBWTtBQUN0QyxXQUFPWCxjQUFjUyxrREFBZCxDQUFpRUcsY0FBeEU7QUFDRCxHQUZEO0FBR0QiLCJmaWxlIjoiUmVhY3RBZGRvbnNET01EZXBlbmRlbmNpZXNVTURTaGltLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RE9NO1xuXG5mdW5jdGlvbiBnZXRSZWFjdERPTSgpIHtcbiAgaWYgKCFSZWFjdERPTSkge1xuICAgIC8vIFRoaXMgaXMgc2FmZSB0byB1c2UgYmVjYXVzZSBjdXJyZW50IG1vZHVsZSBvbmx5IGV4aXN0cyBpbiB0aGUgYWRkb25zIGJ1aWxkOlxuICAgIHZhciBSZWFjdFdpdGhBZGRvbnNVTURFbnRyeSA9IHJlcXVpcmUoJy4vUmVhY3RXaXRoQWRkb25zVU1ERW50cnknKTtcbiAgICAvLyBUaGlzIGlzIGluamVjdGVkIGJ5IHRoZSBSZWFjdERPTSBVTUQgYnVpbGQ6XG4gICAgUmVhY3RET00gPSBSZWFjdFdpdGhBZGRvbnNVTURFbnRyeS5fX1NFQ1JFVF9JTkpFQ1RFRF9SRUFDVF9ET01fRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDtcbiAgfVxuICByZXR1cm4gUmVhY3RET007XG59XG5cbmV4cG9ydHMuZ2V0UmVhY3RET00gPSBnZXRSZWFjdERPTTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgZXhwb3J0cy5nZXRSZWFjdFBlcmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdldFJlYWN0RE9NKCkuX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQuUmVhY3RQZXJmO1xuICB9O1xuXG4gIGV4cG9ydHMuZ2V0UmVhY3RUZXN0VXRpbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdldFJlYWN0RE9NKCkuX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQuUmVhY3RUZXN0VXRpbHM7XG4gIH07XG59Il19