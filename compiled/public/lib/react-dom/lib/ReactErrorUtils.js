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

var caughtError = null;

/**
 * Call a function while guarding against errors that happens within it.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} a First argument
 * @param {*} b Second argument
 */
function invokeGuardedCallback(name, func, a) {
  try {
    func(a);
  } catch (x) {
    if (caughtError === null) {
      caughtError = x;
    }
  }
}

var ReactErrorUtils = {
  invokeGuardedCallback: invokeGuardedCallback,

  /**
   * Invoked by ReactTestUtils.Simulate so that any errors thrown by the event
   * handler are sure to be rethrown by rethrowCaughtError.
   */
  invokeGuardedCallbackWithCatch: invokeGuardedCallback,

  /**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */
  rethrowCaughtError: function rethrowCaughtError() {
    if (caughtError) {
      var error = caughtError;
      caughtError = null;
      throw error;
    }
  }
};

if (process.env.NODE_ENV !== 'production') {
  /**
   * To help development we can get better devtools integration by simulating a
   * real browser event.
   */
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
    var fakeNode = document.createElement('react');
    ReactErrorUtils.invokeGuardedCallback = function (name, func, a) {
      var boundFunc = func.bind(null, a);
      var evtType = 'react-' + name;
      fakeNode.addEventListener(evtType, boundFunc, false);
      var evt = document.createEvent('Event');
      // $FlowFixMe https://github.com/facebook/flow/issues/2336
      evt.initEvent(evtType, false, false);
      fakeNode.dispatchEvent(evt);
      fakeNode.removeEventListener(evtType, boundFunc, false);
    };
  }
}

module.exports = ReactErrorUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdEVycm9yVXRpbHMuanMiXSwibmFtZXMiOlsiY2F1Z2h0RXJyb3IiLCJpbnZva2VHdWFyZGVkQ2FsbGJhY2siLCJuYW1lIiwiZnVuYyIsImEiLCJ4IiwiUmVhY3RFcnJvclV0aWxzIiwiaW52b2tlR3VhcmRlZENhbGxiYWNrV2l0aENhdGNoIiwicmV0aHJvd0NhdWdodEVycm9yIiwiZXJyb3IiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJ3aW5kb3ciLCJkaXNwYXRjaEV2ZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImZha2VOb2RlIiwiY3JlYXRlRWxlbWVudCIsImJvdW5kRnVuYyIsImJpbmQiLCJldnRUeXBlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2dCIsImluaXRFdmVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQSxJQUFJQSxjQUFjLElBQWxCOztBQUVBOzs7Ozs7OztBQVFBLFNBQVNDLHFCQUFULENBQStCQyxJQUEvQixFQUFxQ0MsSUFBckMsRUFBMkNDLENBQTNDLEVBQThDO0FBQzVDLE1BQUk7QUFDRkQsU0FBS0MsQ0FBTDtBQUNELEdBRkQsQ0FFRSxPQUFPQyxDQUFQLEVBQVU7QUFDVixRQUFJTCxnQkFBZ0IsSUFBcEIsRUFBMEI7QUFDeEJBLG9CQUFjSyxDQUFkO0FBQ0Q7QUFDRjtBQUNGOztBQUVELElBQUlDLGtCQUFrQjtBQUNwQkwseUJBQXVCQSxxQkFESDs7QUFHcEI7Ozs7QUFJQU0sa0NBQWdDTixxQkFQWjs7QUFTcEI7Ozs7QUFJQU8sc0JBQW9CLDhCQUFZO0FBQzlCLFFBQUlSLFdBQUosRUFBaUI7QUFDZixVQUFJUyxRQUFRVCxXQUFaO0FBQ0FBLG9CQUFjLElBQWQ7QUFDQSxZQUFNUyxLQUFOO0FBQ0Q7QUFDRjtBQW5CbUIsQ0FBdEI7O0FBc0JBLElBQUlDLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Qzs7OztBQUlBLE1BQUksT0FBT0MsTUFBUCxLQUFrQixXQUFsQixJQUFpQyxPQUFPQSxPQUFPQyxhQUFkLEtBQWdDLFVBQWpFLElBQStFLE9BQU9DLFFBQVAsS0FBb0IsV0FBbkcsSUFBa0gsT0FBT0EsU0FBU0MsV0FBaEIsS0FBZ0MsVUFBdEosRUFBa0s7QUFDaEssUUFBSUMsV0FBV0YsU0FBU0csYUFBVCxDQUF1QixPQUF2QixDQUFmO0FBQ0FaLG9CQUFnQkwscUJBQWhCLEdBQXdDLFVBQVVDLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCQyxDQUF0QixFQUF5QjtBQUMvRCxVQUFJZSxZQUFZaEIsS0FBS2lCLElBQUwsQ0FBVSxJQUFWLEVBQWdCaEIsQ0FBaEIsQ0FBaEI7QUFDQSxVQUFJaUIsVUFBVSxXQUFXbkIsSUFBekI7QUFDQWUsZUFBU0ssZ0JBQVQsQ0FBMEJELE9BQTFCLEVBQW1DRixTQUFuQyxFQUE4QyxLQUE5QztBQUNBLFVBQUlJLE1BQU1SLFNBQVNDLFdBQVQsQ0FBcUIsT0FBckIsQ0FBVjtBQUNBO0FBQ0FPLFVBQUlDLFNBQUosQ0FBY0gsT0FBZCxFQUF1QixLQUF2QixFQUE4QixLQUE5QjtBQUNBSixlQUFTSCxhQUFULENBQXVCUyxHQUF2QjtBQUNBTixlQUFTUSxtQkFBVCxDQUE2QkosT0FBN0IsRUFBc0NGLFNBQXRDLEVBQWlELEtBQWpEO0FBQ0QsS0FURDtBQVVEO0FBQ0Y7O0FBRURPLE9BQU9DLE9BQVAsR0FBaUJyQixlQUFqQiIsImZpbGUiOiJSZWFjdEVycm9yVXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYXVnaHRFcnJvciA9IG51bGw7XG5cbi8qKlxuICogQ2FsbCBhIGZ1bmN0aW9uIHdoaWxlIGd1YXJkaW5nIGFnYWluc3QgZXJyb3JzIHRoYXQgaGFwcGVucyB3aXRoaW4gaXQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgb2YgdGhlIGd1YXJkIHRvIHVzZSBmb3IgbG9nZ2luZyBvciBkZWJ1Z2dpbmdcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZVxuICogQHBhcmFtIHsqfSBhIEZpcnN0IGFyZ3VtZW50XG4gKiBAcGFyYW0geyp9IGIgU2Vjb25kIGFyZ3VtZW50XG4gKi9cbmZ1bmN0aW9uIGludm9rZUd1YXJkZWRDYWxsYmFjayhuYW1lLCBmdW5jLCBhKSB7XG4gIHRyeSB7XG4gICAgZnVuYyhhKTtcbiAgfSBjYXRjaCAoeCkge1xuICAgIGlmIChjYXVnaHRFcnJvciA9PT0gbnVsbCkge1xuICAgICAgY2F1Z2h0RXJyb3IgPSB4O1xuICAgIH1cbiAgfVxufVxuXG52YXIgUmVhY3RFcnJvclV0aWxzID0ge1xuICBpbnZva2VHdWFyZGVkQ2FsbGJhY2s6IGludm9rZUd1YXJkZWRDYWxsYmFjayxcblxuICAvKipcbiAgICogSW52b2tlZCBieSBSZWFjdFRlc3RVdGlscy5TaW11bGF0ZSBzbyB0aGF0IGFueSBlcnJvcnMgdGhyb3duIGJ5IHRoZSBldmVudFxuICAgKiBoYW5kbGVyIGFyZSBzdXJlIHRvIGJlIHJldGhyb3duIGJ5IHJldGhyb3dDYXVnaHRFcnJvci5cbiAgICovXG4gIGludm9rZUd1YXJkZWRDYWxsYmFja1dpdGhDYXRjaDogaW52b2tlR3VhcmRlZENhbGxiYWNrLFxuXG4gIC8qKlxuICAgKiBEdXJpbmcgZXhlY3V0aW9uIG9mIGd1YXJkZWQgZnVuY3Rpb25zIHdlIHdpbGwgY2FwdHVyZSB0aGUgZmlyc3QgZXJyb3Igd2hpY2hcbiAgICogd2Ugd2lsbCByZXRocm93IHRvIGJlIGhhbmRsZWQgYnkgdGhlIHRvcCBsZXZlbCBlcnJvciBoYW5kbGVyLlxuICAgKi9cbiAgcmV0aHJvd0NhdWdodEVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNhdWdodEVycm9yKSB7XG4gICAgICB2YXIgZXJyb3IgPSBjYXVnaHRFcnJvcjtcbiAgICAgIGNhdWdodEVycm9yID0gbnVsbDtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgLyoqXG4gICAqIFRvIGhlbHAgZGV2ZWxvcG1lbnQgd2UgY2FuIGdldCBiZXR0ZXIgZGV2dG9vbHMgaW50ZWdyYXRpb24gYnkgc2ltdWxhdGluZyBhXG4gICAqIHJlYWwgYnJvd3NlciBldmVudC5cbiAgICovXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmRpc3BhdGNoRXZlbnQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgZmFrZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdyZWFjdCcpO1xuICAgIFJlYWN0RXJyb3JVdGlscy5pbnZva2VHdWFyZGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAobmFtZSwgZnVuYywgYSkge1xuICAgICAgdmFyIGJvdW5kRnVuYyA9IGZ1bmMuYmluZChudWxsLCBhKTtcbiAgICAgIHZhciBldnRUeXBlID0gJ3JlYWN0LScgKyBuYW1lO1xuICAgICAgZmFrZU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBib3VuZEZ1bmMsIGZhbHNlKTtcbiAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgIC8vICRGbG93Rml4TWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzIzMzZcbiAgICAgIGV2dC5pbml0RXZlbnQoZXZ0VHlwZSwgZmFsc2UsIGZhbHNlKTtcbiAgICAgIGZha2VOb2RlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgIGZha2VOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgYm91bmRGdW5jLCBmYWxzZSk7XG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RXJyb3JVdGlsczsiXX0=