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

var SyntheticUIEvent = require('./SyntheticUIEvent');

/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var FocusEventInterface = {
  relatedTarget: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);

module.exports = SyntheticFocusEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9TeW50aGV0aWNGb2N1c0V2ZW50LmpzIl0sIm5hbWVzIjpbIlN5bnRoZXRpY1VJRXZlbnQiLCJyZXF1aXJlIiwiRm9jdXNFdmVudEludGVyZmFjZSIsInJlbGF0ZWRUYXJnZXQiLCJTeW50aGV0aWNGb2N1c0V2ZW50IiwiZGlzcGF0Y2hDb25maWciLCJkaXNwYXRjaE1hcmtlciIsIm5hdGl2ZUV2ZW50IiwibmF0aXZlRXZlbnRUYXJnZXQiLCJjYWxsIiwiYXVnbWVudENsYXNzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxJQUFJQSxtQkFBbUJDLFFBQVEsb0JBQVIsQ0FBdkI7O0FBRUE7Ozs7QUFJQSxJQUFJQyxzQkFBc0I7QUFDeEJDLGlCQUFlO0FBRFMsQ0FBMUI7O0FBSUE7Ozs7OztBQU1BLFNBQVNDLG1CQUFULENBQTZCQyxjQUE3QixFQUE2Q0MsY0FBN0MsRUFBNkRDLFdBQTdELEVBQTBFQyxpQkFBMUUsRUFBNkY7QUFDM0YsU0FBT1IsaUJBQWlCUyxJQUFqQixDQUFzQixJQUF0QixFQUE0QkosY0FBNUIsRUFBNENDLGNBQTVDLEVBQTREQyxXQUE1RCxFQUF5RUMsaUJBQXpFLENBQVA7QUFDRDs7QUFFRFIsaUJBQWlCVSxZQUFqQixDQUE4Qk4sbUJBQTlCLEVBQW1ERixtQkFBbkQ7O0FBRUFTLE9BQU9DLE9BQVAsR0FBaUJSLG1CQUFqQiIsImZpbGUiOiJTeW50aGV0aWNGb2N1c0V2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFN5bnRoZXRpY1VJRXZlbnQgPSByZXF1aXJlKCcuL1N5bnRoZXRpY1VJRXZlbnQnKTtcblxuLyoqXG4gKiBAaW50ZXJmYWNlIEZvY3VzRXZlbnRcbiAqIEBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzL1xuICovXG52YXIgRm9jdXNFdmVudEludGVyZmFjZSA9IHtcbiAgcmVsYXRlZFRhcmdldDogbnVsbFxufTtcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gZGlzcGF0Y2hDb25maWcgQ29uZmlndXJhdGlvbiB1c2VkIHRvIGRpc3BhdGNoIHRoaXMgZXZlbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGlzcGF0Y2hNYXJrZXIgTWFya2VyIGlkZW50aWZ5aW5nIHRoZSBldmVudCB0YXJnZXQuXG4gKiBAcGFyYW0ge29iamVjdH0gbmF0aXZlRXZlbnQgTmF0aXZlIGJyb3dzZXIgZXZlbnQuXG4gKiBAZXh0ZW5kcyB7U3ludGhldGljVUlFdmVudH1cbiAqL1xuZnVuY3Rpb24gU3ludGhldGljRm9jdXNFdmVudChkaXNwYXRjaENvbmZpZywgZGlzcGF0Y2hNYXJrZXIsIG5hdGl2ZUV2ZW50LCBuYXRpdmVFdmVudFRhcmdldCkge1xuICByZXR1cm4gU3ludGhldGljVUlFdmVudC5jYWxsKHRoaXMsIGRpc3BhdGNoQ29uZmlnLCBkaXNwYXRjaE1hcmtlciwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KTtcbn1cblxuU3ludGhldGljVUlFdmVudC5hdWdtZW50Q2xhc3MoU3ludGhldGljRm9jdXNFdmVudCwgRm9jdXNFdmVudEludGVyZmFjZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ludGhldGljRm9jdXNFdmVudDsiXX0=