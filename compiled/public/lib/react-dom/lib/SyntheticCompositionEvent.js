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
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */
var CompositionEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticCompositionEvent, CompositionEventInterface);

module.exports = SyntheticCompositionEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9TeW50aGV0aWNDb21wb3NpdGlvbkV2ZW50LmpzIl0sIm5hbWVzIjpbIlN5bnRoZXRpY0V2ZW50IiwicmVxdWlyZSIsIkNvbXBvc2l0aW9uRXZlbnRJbnRlcmZhY2UiLCJkYXRhIiwiU3ludGhldGljQ29tcG9zaXRpb25FdmVudCIsImRpc3BhdGNoQ29uZmlnIiwiZGlzcGF0Y2hNYXJrZXIiLCJuYXRpdmVFdmVudCIsIm5hdGl2ZUV2ZW50VGFyZ2V0IiwiY2FsbCIsImF1Z21lbnRDbGFzcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsSUFBSUEsaUJBQWlCQyxRQUFRLGtCQUFSLENBQXJCOztBQUVBOzs7O0FBSUEsSUFBSUMsNEJBQTRCO0FBQzlCQyxRQUFNO0FBRHdCLENBQWhDOztBQUlBOzs7Ozs7QUFNQSxTQUFTQyx5QkFBVCxDQUFtQ0MsY0FBbkMsRUFBbURDLGNBQW5ELEVBQW1FQyxXQUFuRSxFQUFnRkMsaUJBQWhGLEVBQW1HO0FBQ2pHLFNBQU9SLGVBQWVTLElBQWYsQ0FBb0IsSUFBcEIsRUFBMEJKLGNBQTFCLEVBQTBDQyxjQUExQyxFQUEwREMsV0FBMUQsRUFBdUVDLGlCQUF2RSxDQUFQO0FBQ0Q7O0FBRURSLGVBQWVVLFlBQWYsQ0FBNEJOLHlCQUE1QixFQUF1REYseUJBQXZEOztBQUVBUyxPQUFPQyxPQUFQLEdBQWlCUix5QkFBakIiLCJmaWxlIjoiU3ludGhldGljQ29tcG9zaXRpb25FdmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTeW50aGV0aWNFdmVudCA9IHJlcXVpcmUoJy4vU3ludGhldGljRXZlbnQnKTtcblxuLyoqXG4gKiBAaW50ZXJmYWNlIEV2ZW50XG4gKiBAc2VlIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnRzLWNvbXBvc2l0aW9uZXZlbnRzXG4gKi9cbnZhciBDb21wb3NpdGlvbkV2ZW50SW50ZXJmYWNlID0ge1xuICBkYXRhOiBudWxsXG59O1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBkaXNwYXRjaENvbmZpZyBDb25maWd1cmF0aW9uIHVzZWQgdG8gZGlzcGF0Y2ggdGhpcyBldmVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXNwYXRjaE1hcmtlciBNYXJrZXIgaWRlbnRpZnlpbmcgdGhlIGV2ZW50IHRhcmdldC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBuYXRpdmVFdmVudCBOYXRpdmUgYnJvd3NlciBldmVudC5cbiAqIEBleHRlbmRzIHtTeW50aGV0aWNVSUV2ZW50fVxuICovXG5mdW5jdGlvbiBTeW50aGV0aWNDb21wb3NpdGlvbkV2ZW50KGRpc3BhdGNoQ29uZmlnLCBkaXNwYXRjaE1hcmtlciwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KSB7XG4gIHJldHVybiBTeW50aGV0aWNFdmVudC5jYWxsKHRoaXMsIGRpc3BhdGNoQ29uZmlnLCBkaXNwYXRjaE1hcmtlciwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KTtcbn1cblxuU3ludGhldGljRXZlbnQuYXVnbWVudENsYXNzKFN5bnRoZXRpY0NvbXBvc2l0aW9uRXZlbnQsIENvbXBvc2l0aW9uRXZlbnRJbnRlcmZhY2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bnRoZXRpY0NvbXBvc2l0aW9uRXZlbnQ7Il19