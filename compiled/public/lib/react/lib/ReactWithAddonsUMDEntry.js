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

var ReactWithAddons = require('./ReactWithAddons');

// `version` will be added here by the React module.
var ReactWithAddonsUMDEntry = _assign({
  __SECRET_INJECTED_REACT_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: null, // Will be injected by ReactDOM UMD build.
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: require('./ReactCurrentOwner')
  }
}, ReactWithAddons);

if (process.env.NODE_ENV !== 'production') {
  _assign(ReactWithAddonsUMDEntry.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // ReactComponentTreeHook should not be included in production.
    ReactComponentTreeHook: require('./ReactComponentTreeHook')
  });
}

module.exports = ReactWithAddonsUMDEntry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QvbGliL1JlYWN0V2l0aEFkZG9uc1VNREVudHJ5LmpzIl0sIm5hbWVzIjpbIl9hc3NpZ24iLCJyZXF1aXJlIiwiUmVhY3RXaXRoQWRkb25zIiwiUmVhY3RXaXRoQWRkb25zVU1ERW50cnkiLCJfX1NFQ1JFVF9JTkpFQ1RFRF9SRUFDVF9ET01fRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCIsIl9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEIiwiUmVhY3RDdXJyZW50T3duZXIiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJSZWFjdENvbXBvbmVudFRyZWVIb29rIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxJQUFJQSxVQUFVQyxRQUFRLGVBQVIsQ0FBZDs7QUFFQSxJQUFJQyxrQkFBa0JELFFBQVEsbUJBQVIsQ0FBdEI7O0FBRUE7QUFDQSxJQUFJRSwwQkFBMEJILFFBQVE7QUFDcENJLCtEQUE2RCxJQUR6QixFQUMrQjtBQUNuRUMsc0RBQW9EO0FBQ2xEQyx1QkFBbUJMLFFBQVEscUJBQVI7QUFEK0I7QUFGaEIsQ0FBUixFQUszQkMsZUFMMkIsQ0FBOUI7O0FBT0EsSUFBSUssUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDVCxVQUFRRyx3QkFBd0JFLGtEQUFoQyxFQUFvRjtBQUNsRjtBQUNBSyw0QkFBd0JULFFBQVEsMEJBQVI7QUFGMEQsR0FBcEY7QUFJRDs7QUFFRFUsT0FBT0MsT0FBUCxHQUFpQlQsdUJBQWpCIiwiZmlsZSI6IlJlYWN0V2l0aEFkZG9uc1VNREVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFdpdGhBZGRvbnMgPSByZXF1aXJlKCcuL1JlYWN0V2l0aEFkZG9ucycpO1xuXG4vLyBgdmVyc2lvbmAgd2lsbCBiZSBhZGRlZCBoZXJlIGJ5IHRoZSBSZWFjdCBtb2R1bGUuXG52YXIgUmVhY3RXaXRoQWRkb25zVU1ERW50cnkgPSBfYXNzaWduKHtcbiAgX19TRUNSRVRfSU5KRUNURURfUkVBQ1RfRE9NX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ6IG51bGwsIC8vIFdpbGwgYmUgaW5qZWN0ZWQgYnkgUmVhY3RET00gVU1EIGJ1aWxkLlxuICBfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDoge1xuICAgIFJlYWN0Q3VycmVudE93bmVyOiByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJylcbiAgfVxufSwgUmVhY3RXaXRoQWRkb25zKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgX2Fzc2lnbihSZWFjdFdpdGhBZGRvbnNVTURFbnRyeS5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCwge1xuICAgIC8vIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgc2hvdWxkIG5vdCBiZSBpbmNsdWRlZCBpbiBwcm9kdWN0aW9uLlxuICAgIFJlYWN0Q29tcG9uZW50VHJlZUhvb2s6IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnRUcmVlSG9vaycpXG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0V2l0aEFkZG9uc1VNREVudHJ5OyJdfQ==