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

var _assign = require('object-assign');

var React = require('./React');

// `version` will be added here by the React module.
var ReactUMDEntry = _assign({
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: require('./ReactCurrentOwner')
  }
}, React);

if (process.env.NODE_ENV !== 'production') {
  _assign(ReactUMDEntry.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // ReactComponentTreeHook should not be included in production.
    ReactComponentTreeHook: require('./ReactComponentTreeHook')
  });
}

module.exports = ReactUMDEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QvbGliL1JlYWN0VU1ERW50cnkuanMiXSwibmFtZXMiOlsiX2Fzc2lnbiIsInJlcXVpcmUiLCJSZWFjdCIsIlJlYWN0VU1ERW50cnkiLCJfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCIsIlJlYWN0Q3VycmVudE93bmVyIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiUmVhY3RDb21wb25lbnRUcmVlSG9vayIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsSUFBSUEsVUFBVUMsUUFBUSxlQUFSLENBQWQ7O0FBRUEsSUFBSUMsUUFBUUQsUUFBUSxTQUFSLENBQVo7O0FBRUE7QUFDQSxJQUFJRSxnQkFBZ0JILFFBQVE7QUFDMUJJLHNEQUFvRDtBQUNsREMsdUJBQW1CSixRQUFRLHFCQUFSO0FBRCtCO0FBRDFCLENBQVIsRUFJakJDLEtBSmlCLENBQXBCOztBQU1BLElBQUlJLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1IsVUFBUUcsY0FBY0Msa0RBQXRCLEVBQTBFO0FBQ3hFO0FBQ0FLLDRCQUF3QlIsUUFBUSwwQkFBUjtBQUZnRCxHQUExRTtBQUlEOztBQUVEUyxPQUFPQyxPQUFQLEdBQWlCUixhQUFqQiIsImZpbGUiOiJSZWFjdFVNREVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJy4vUmVhY3QnKTtcblxuLy8gYHZlcnNpb25gIHdpbGwgYmUgYWRkZWQgaGVyZSBieSB0aGUgUmVhY3QgbW9kdWxlLlxudmFyIFJlYWN0VU1ERW50cnkgPSBfYXNzaWduKHtcbiAgX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ6IHtcbiAgICBSZWFjdEN1cnJlbnRPd25lcjogcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpXG4gIH1cbn0sIFJlYWN0KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgX2Fzc2lnbihSZWFjdFVNREVudHJ5Ll9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVELCB7XG4gICAgLy8gUmVhY3RDb21wb25lbnRUcmVlSG9vayBzaG91bGQgbm90IGJlIGluY2x1ZGVkIGluIHByb2R1Y3Rpb24uXG4gICAgUmVhY3RDb21wb25lbnRUcmVlSG9vazogcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudFRyZWVIb29rJylcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RVTURFbnRyeTsiXX0=