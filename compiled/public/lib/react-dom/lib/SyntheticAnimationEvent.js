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

var SyntheticEvent = require('./SyntheticEvent');

/**
 * @interface Event
 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
 */
var AnimationEventInterface = {
  animationName: null,
  elapsedTime: null,
  pseudoElement: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticAnimationEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticAnimationEvent, AnimationEventInterface);

module.exports = SyntheticAnimationEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9TeW50aGV0aWNBbmltYXRpb25FdmVudC5qcyJdLCJuYW1lcyI6WyJTeW50aGV0aWNFdmVudCIsInJlcXVpcmUiLCJBbmltYXRpb25FdmVudEludGVyZmFjZSIsImFuaW1hdGlvbk5hbWUiLCJlbGFwc2VkVGltZSIsInBzZXVkb0VsZW1lbnQiLCJTeW50aGV0aWNBbmltYXRpb25FdmVudCIsImRpc3BhdGNoQ29uZmlnIiwiZGlzcGF0Y2hNYXJrZXIiLCJuYXRpdmVFdmVudCIsIm5hdGl2ZUV2ZW50VGFyZ2V0IiwiY2FsbCIsImF1Z21lbnRDbGFzcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsSUFBSUEsaUJBQWlCQyxRQUFRLGtCQUFSLENBQXJCOztBQUVBOzs7OztBQUtBLElBQUlDLDBCQUEwQjtBQUM1QkMsaUJBQWUsSUFEYTtBQUU1QkMsZUFBYSxJQUZlO0FBRzVCQyxpQkFBZTtBQUhhLENBQTlCOztBQU1BOzs7Ozs7QUFNQSxTQUFTQyx1QkFBVCxDQUFpQ0MsY0FBakMsRUFBaURDLGNBQWpELEVBQWlFQyxXQUFqRSxFQUE4RUMsaUJBQTlFLEVBQWlHO0FBQy9GLFNBQU9WLGVBQWVXLElBQWYsQ0FBb0IsSUFBcEIsRUFBMEJKLGNBQTFCLEVBQTBDQyxjQUExQyxFQUEwREMsV0FBMUQsRUFBdUVDLGlCQUF2RSxDQUFQO0FBQ0Q7O0FBRURWLGVBQWVZLFlBQWYsQ0FBNEJOLHVCQUE1QixFQUFxREosdUJBQXJEOztBQUVBVyxPQUFPQyxPQUFQLEdBQWlCUix1QkFBakIiLCJmaWxlIjoiU3ludGhldGljQW5pbWF0aW9uRXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU3ludGhldGljRXZlbnQgPSByZXF1aXJlKCcuL1N5bnRoZXRpY0V2ZW50Jyk7XG5cbi8qKlxuICogQGludGVyZmFjZSBFdmVudFxuICogQHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLWFuaW1hdGlvbnMvI0FuaW1hdGlvbkV2ZW50LWludGVyZmFjZVxuICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQW5pbWF0aW9uRXZlbnRcbiAqL1xudmFyIEFuaW1hdGlvbkV2ZW50SW50ZXJmYWNlID0ge1xuICBhbmltYXRpb25OYW1lOiBudWxsLFxuICBlbGFwc2VkVGltZTogbnVsbCxcbiAgcHNldWRvRWxlbWVudDogbnVsbFxufTtcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gZGlzcGF0Y2hDb25maWcgQ29uZmlndXJhdGlvbiB1c2VkIHRvIGRpc3BhdGNoIHRoaXMgZXZlbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGlzcGF0Y2hNYXJrZXIgTWFya2VyIGlkZW50aWZ5aW5nIHRoZSBldmVudCB0YXJnZXQuXG4gKiBAcGFyYW0ge29iamVjdH0gbmF0aXZlRXZlbnQgTmF0aXZlIGJyb3dzZXIgZXZlbnQuXG4gKiBAZXh0ZW5kcyB7U3ludGhldGljRXZlbnR9XG4gKi9cbmZ1bmN0aW9uIFN5bnRoZXRpY0FuaW1hdGlvbkV2ZW50KGRpc3BhdGNoQ29uZmlnLCBkaXNwYXRjaE1hcmtlciwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KSB7XG4gIHJldHVybiBTeW50aGV0aWNFdmVudC5jYWxsKHRoaXMsIGRpc3BhdGNoQ29uZmlnLCBkaXNwYXRjaE1hcmtlciwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KTtcbn1cblxuU3ludGhldGljRXZlbnQuYXVnbWVudENsYXNzKFN5bnRoZXRpY0FuaW1hdGlvbkV2ZW50LCBBbmltYXRpb25FdmVudEludGVyZmFjZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ludGhldGljQW5pbWF0aW9uRXZlbnQ7Il19