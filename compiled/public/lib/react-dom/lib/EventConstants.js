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

/**
 * Types of raw signals from the browser caught at the top level.
 */

var topLevelTypes = {
  topAbort: null,
  topAnimationEnd: null,
  topAnimationIteration: null,
  topAnimationStart: null,
  topBlur: null,
  topCanPlay: null,
  topCanPlayThrough: null,
  topChange: null,
  topClick: null,
  topCompositionEnd: null,
  topCompositionStart: null,
  topCompositionUpdate: null,
  topContextMenu: null,
  topCopy: null,
  topCut: null,
  topDoubleClick: null,
  topDrag: null,
  topDragEnd: null,
  topDragEnter: null,
  topDragExit: null,
  topDragLeave: null,
  topDragOver: null,
  topDragStart: null,
  topDrop: null,
  topDurationChange: null,
  topEmptied: null,
  topEncrypted: null,
  topEnded: null,
  topError: null,
  topFocus: null,
  topInput: null,
  topInvalid: null,
  topKeyDown: null,
  topKeyPress: null,
  topKeyUp: null,
  topLoad: null,
  topLoadedData: null,
  topLoadedMetadata: null,
  topLoadStart: null,
  topMouseDown: null,
  topMouseMove: null,
  topMouseOut: null,
  topMouseOver: null,
  topMouseUp: null,
  topPaste: null,
  topPause: null,
  topPlay: null,
  topPlaying: null,
  topProgress: null,
  topRateChange: null,
  topReset: null,
  topScroll: null,
  topSeeked: null,
  topSeeking: null,
  topSelectionChange: null,
  topStalled: null,
  topSubmit: null,
  topSuspend: null,
  topTextInput: null,
  topTimeUpdate: null,
  topTouchCancel: null,
  topTouchEnd: null,
  topTouchMove: null,
  topTouchStart: null,
  topTransitionEnd: null,
  topVolumeChange: null,
  topWaiting: null,
  topWheel: null
};

var EventConstants = {
  topLevelTypes: topLevelTypes
};

module.exports = EventConstants;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9FdmVudENvbnN0YW50cy5qcyJdLCJuYW1lcyI6WyJ0b3BMZXZlbFR5cGVzIiwidG9wQWJvcnQiLCJ0b3BBbmltYXRpb25FbmQiLCJ0b3BBbmltYXRpb25JdGVyYXRpb24iLCJ0b3BBbmltYXRpb25TdGFydCIsInRvcEJsdXIiLCJ0b3BDYW5QbGF5IiwidG9wQ2FuUGxheVRocm91Z2giLCJ0b3BDaGFuZ2UiLCJ0b3BDbGljayIsInRvcENvbXBvc2l0aW9uRW5kIiwidG9wQ29tcG9zaXRpb25TdGFydCIsInRvcENvbXBvc2l0aW9uVXBkYXRlIiwidG9wQ29udGV4dE1lbnUiLCJ0b3BDb3B5IiwidG9wQ3V0IiwidG9wRG91YmxlQ2xpY2siLCJ0b3BEcmFnIiwidG9wRHJhZ0VuZCIsInRvcERyYWdFbnRlciIsInRvcERyYWdFeGl0IiwidG9wRHJhZ0xlYXZlIiwidG9wRHJhZ092ZXIiLCJ0b3BEcmFnU3RhcnQiLCJ0b3BEcm9wIiwidG9wRHVyYXRpb25DaGFuZ2UiLCJ0b3BFbXB0aWVkIiwidG9wRW5jcnlwdGVkIiwidG9wRW5kZWQiLCJ0b3BFcnJvciIsInRvcEZvY3VzIiwidG9wSW5wdXQiLCJ0b3BJbnZhbGlkIiwidG9wS2V5RG93biIsInRvcEtleVByZXNzIiwidG9wS2V5VXAiLCJ0b3BMb2FkIiwidG9wTG9hZGVkRGF0YSIsInRvcExvYWRlZE1ldGFkYXRhIiwidG9wTG9hZFN0YXJ0IiwidG9wTW91c2VEb3duIiwidG9wTW91c2VNb3ZlIiwidG9wTW91c2VPdXQiLCJ0b3BNb3VzZU92ZXIiLCJ0b3BNb3VzZVVwIiwidG9wUGFzdGUiLCJ0b3BQYXVzZSIsInRvcFBsYXkiLCJ0b3BQbGF5aW5nIiwidG9wUHJvZ3Jlc3MiLCJ0b3BSYXRlQ2hhbmdlIiwidG9wUmVzZXQiLCJ0b3BTY3JvbGwiLCJ0b3BTZWVrZWQiLCJ0b3BTZWVraW5nIiwidG9wU2VsZWN0aW9uQ2hhbmdlIiwidG9wU3RhbGxlZCIsInRvcFN1Ym1pdCIsInRvcFN1c3BlbmQiLCJ0b3BUZXh0SW5wdXQiLCJ0b3BUaW1lVXBkYXRlIiwidG9wVG91Y2hDYW5jZWwiLCJ0b3BUb3VjaEVuZCIsInRvcFRvdWNoTW92ZSIsInRvcFRvdWNoU3RhcnQiLCJ0b3BUcmFuc2l0aW9uRW5kIiwidG9wVm9sdW1lQ2hhbmdlIiwidG9wV2FpdGluZyIsInRvcFdoZWVsIiwiRXZlbnRDb25zdGFudHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBOzs7O0FBR0EsSUFBSUEsZ0JBQWdCO0FBQ2xCQyxZQUFVLElBRFE7QUFFbEJDLG1CQUFpQixJQUZDO0FBR2xCQyx5QkFBdUIsSUFITDtBQUlsQkMscUJBQW1CLElBSkQ7QUFLbEJDLFdBQVMsSUFMUztBQU1sQkMsY0FBWSxJQU5NO0FBT2xCQyxxQkFBbUIsSUFQRDtBQVFsQkMsYUFBVyxJQVJPO0FBU2xCQyxZQUFVLElBVFE7QUFVbEJDLHFCQUFtQixJQVZEO0FBV2xCQyx1QkFBcUIsSUFYSDtBQVlsQkMsd0JBQXNCLElBWko7QUFhbEJDLGtCQUFnQixJQWJFO0FBY2xCQyxXQUFTLElBZFM7QUFlbEJDLFVBQVEsSUFmVTtBQWdCbEJDLGtCQUFnQixJQWhCRTtBQWlCbEJDLFdBQVMsSUFqQlM7QUFrQmxCQyxjQUFZLElBbEJNO0FBbUJsQkMsZ0JBQWMsSUFuQkk7QUFvQmxCQyxlQUFhLElBcEJLO0FBcUJsQkMsZ0JBQWMsSUFyQkk7QUFzQmxCQyxlQUFhLElBdEJLO0FBdUJsQkMsZ0JBQWMsSUF2Qkk7QUF3QmxCQyxXQUFTLElBeEJTO0FBeUJsQkMscUJBQW1CLElBekJEO0FBMEJsQkMsY0FBWSxJQTFCTTtBQTJCbEJDLGdCQUFjLElBM0JJO0FBNEJsQkMsWUFBVSxJQTVCUTtBQTZCbEJDLFlBQVUsSUE3QlE7QUE4QmxCQyxZQUFVLElBOUJRO0FBK0JsQkMsWUFBVSxJQS9CUTtBQWdDbEJDLGNBQVksSUFoQ007QUFpQ2xCQyxjQUFZLElBakNNO0FBa0NsQkMsZUFBYSxJQWxDSztBQW1DbEJDLFlBQVUsSUFuQ1E7QUFvQ2xCQyxXQUFTLElBcENTO0FBcUNsQkMsaUJBQWUsSUFyQ0c7QUFzQ2xCQyxxQkFBbUIsSUF0Q0Q7QUF1Q2xCQyxnQkFBYyxJQXZDSTtBQXdDbEJDLGdCQUFjLElBeENJO0FBeUNsQkMsZ0JBQWMsSUF6Q0k7QUEwQ2xCQyxlQUFhLElBMUNLO0FBMkNsQkMsZ0JBQWMsSUEzQ0k7QUE0Q2xCQyxjQUFZLElBNUNNO0FBNkNsQkMsWUFBVSxJQTdDUTtBQThDbEJDLFlBQVUsSUE5Q1E7QUErQ2xCQyxXQUFTLElBL0NTO0FBZ0RsQkMsY0FBWSxJQWhETTtBQWlEbEJDLGVBQWEsSUFqREs7QUFrRGxCQyxpQkFBZSxJQWxERztBQW1EbEJDLFlBQVUsSUFuRFE7QUFvRGxCQyxhQUFXLElBcERPO0FBcURsQkMsYUFBVyxJQXJETztBQXNEbEJDLGNBQVksSUF0RE07QUF1RGxCQyxzQkFBb0IsSUF2REY7QUF3RGxCQyxjQUFZLElBeERNO0FBeURsQkMsYUFBVyxJQXpETztBQTBEbEJDLGNBQVksSUExRE07QUEyRGxCQyxnQkFBYyxJQTNESTtBQTREbEJDLGlCQUFlLElBNURHO0FBNkRsQkMsa0JBQWdCLElBN0RFO0FBOERsQkMsZUFBYSxJQTlESztBQStEbEJDLGdCQUFjLElBL0RJO0FBZ0VsQkMsaUJBQWUsSUFoRUc7QUFpRWxCQyxvQkFBa0IsSUFqRUE7QUFrRWxCQyxtQkFBaUIsSUFsRUM7QUFtRWxCQyxjQUFZLElBbkVNO0FBb0VsQkMsWUFBVTtBQXBFUSxDQUFwQjs7QUF1RUEsSUFBSUMsaUJBQWlCO0FBQ25CckUsaUJBQWVBO0FBREksQ0FBckI7O0FBSUFzRSxPQUFPQyxPQUFQLEdBQWlCRixjQUFqQiIsImZpbGUiOiJFdmVudENvbnN0YW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVHlwZXMgb2YgcmF3IHNpZ25hbHMgZnJvbSB0aGUgYnJvd3NlciBjYXVnaHQgYXQgdGhlIHRvcCBsZXZlbC5cbiAqL1xudmFyIHRvcExldmVsVHlwZXMgPSB7XG4gIHRvcEFib3J0OiBudWxsLFxuICB0b3BBbmltYXRpb25FbmQ6IG51bGwsXG4gIHRvcEFuaW1hdGlvbkl0ZXJhdGlvbjogbnVsbCxcbiAgdG9wQW5pbWF0aW9uU3RhcnQ6IG51bGwsXG4gIHRvcEJsdXI6IG51bGwsXG4gIHRvcENhblBsYXk6IG51bGwsXG4gIHRvcENhblBsYXlUaHJvdWdoOiBudWxsLFxuICB0b3BDaGFuZ2U6IG51bGwsXG4gIHRvcENsaWNrOiBudWxsLFxuICB0b3BDb21wb3NpdGlvbkVuZDogbnVsbCxcbiAgdG9wQ29tcG9zaXRpb25TdGFydDogbnVsbCxcbiAgdG9wQ29tcG9zaXRpb25VcGRhdGU6IG51bGwsXG4gIHRvcENvbnRleHRNZW51OiBudWxsLFxuICB0b3BDb3B5OiBudWxsLFxuICB0b3BDdXQ6IG51bGwsXG4gIHRvcERvdWJsZUNsaWNrOiBudWxsLFxuICB0b3BEcmFnOiBudWxsLFxuICB0b3BEcmFnRW5kOiBudWxsLFxuICB0b3BEcmFnRW50ZXI6IG51bGwsXG4gIHRvcERyYWdFeGl0OiBudWxsLFxuICB0b3BEcmFnTGVhdmU6IG51bGwsXG4gIHRvcERyYWdPdmVyOiBudWxsLFxuICB0b3BEcmFnU3RhcnQ6IG51bGwsXG4gIHRvcERyb3A6IG51bGwsXG4gIHRvcER1cmF0aW9uQ2hhbmdlOiBudWxsLFxuICB0b3BFbXB0aWVkOiBudWxsLFxuICB0b3BFbmNyeXB0ZWQ6IG51bGwsXG4gIHRvcEVuZGVkOiBudWxsLFxuICB0b3BFcnJvcjogbnVsbCxcbiAgdG9wRm9jdXM6IG51bGwsXG4gIHRvcElucHV0OiBudWxsLFxuICB0b3BJbnZhbGlkOiBudWxsLFxuICB0b3BLZXlEb3duOiBudWxsLFxuICB0b3BLZXlQcmVzczogbnVsbCxcbiAgdG9wS2V5VXA6IG51bGwsXG4gIHRvcExvYWQ6IG51bGwsXG4gIHRvcExvYWRlZERhdGE6IG51bGwsXG4gIHRvcExvYWRlZE1ldGFkYXRhOiBudWxsLFxuICB0b3BMb2FkU3RhcnQ6IG51bGwsXG4gIHRvcE1vdXNlRG93bjogbnVsbCxcbiAgdG9wTW91c2VNb3ZlOiBudWxsLFxuICB0b3BNb3VzZU91dDogbnVsbCxcbiAgdG9wTW91c2VPdmVyOiBudWxsLFxuICB0b3BNb3VzZVVwOiBudWxsLFxuICB0b3BQYXN0ZTogbnVsbCxcbiAgdG9wUGF1c2U6IG51bGwsXG4gIHRvcFBsYXk6IG51bGwsXG4gIHRvcFBsYXlpbmc6IG51bGwsXG4gIHRvcFByb2dyZXNzOiBudWxsLFxuICB0b3BSYXRlQ2hhbmdlOiBudWxsLFxuICB0b3BSZXNldDogbnVsbCxcbiAgdG9wU2Nyb2xsOiBudWxsLFxuICB0b3BTZWVrZWQ6IG51bGwsXG4gIHRvcFNlZWtpbmc6IG51bGwsXG4gIHRvcFNlbGVjdGlvbkNoYW5nZTogbnVsbCxcbiAgdG9wU3RhbGxlZDogbnVsbCxcbiAgdG9wU3VibWl0OiBudWxsLFxuICB0b3BTdXNwZW5kOiBudWxsLFxuICB0b3BUZXh0SW5wdXQ6IG51bGwsXG4gIHRvcFRpbWVVcGRhdGU6IG51bGwsXG4gIHRvcFRvdWNoQ2FuY2VsOiBudWxsLFxuICB0b3BUb3VjaEVuZDogbnVsbCxcbiAgdG9wVG91Y2hNb3ZlOiBudWxsLFxuICB0b3BUb3VjaFN0YXJ0OiBudWxsLFxuICB0b3BUcmFuc2l0aW9uRW5kOiBudWxsLFxuICB0b3BWb2x1bWVDaGFuZ2U6IG51bGwsXG4gIHRvcFdhaXRpbmc6IG51bGwsXG4gIHRvcFdoZWVsOiBudWxsXG59O1xuXG52YXIgRXZlbnRDb25zdGFudHMgPSB7XG4gIHRvcExldmVsVHlwZXM6IHRvcExldmVsVHlwZXNcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRDb25zdGFudHM7Il19