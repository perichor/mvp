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

var EventPluginRegistry = require('./EventPluginRegistry');
var ReactEventEmitterMixin = require('./ReactEventEmitterMixin');
var ViewportMetrics = require('./ViewportMetrics');

var getVendorPrefixedEventName = require('./getVendorPrefixedEventName');
var isEventSupported = require('./isEventSupported');

/**
 * Summary of `ReactBrowserEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap most native browser events. This
 *    may only occur in the main thread and is the responsibility of
 *    ReactEventListener, which is injected and can therefore support pluggable
 *    event sources. This is the only work that occurs in the main thread.
 *
 *  - We normalize and de-duplicate events to account for browser quirks. This
 *    may be done in the worker thread.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */

var hasEventPageXY;
var alreadyListeningTo = {};
var isMonitoringScrollValue = false;
var reactTopListenersCounter = 0;

// For events like 'submit' which don't consistently bubble (which we trap at a
// lower node than `document`), binding at `document` would cause duplicate
// events so we don't include them here
var topEventMapping = {
  topAbort: 'abort',
  topAnimationEnd: getVendorPrefixedEventName('animationend') || 'animationend',
  topAnimationIteration: getVendorPrefixedEventName('animationiteration') || 'animationiteration',
  topAnimationStart: getVendorPrefixedEventName('animationstart') || 'animationstart',
  topBlur: 'blur',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topChange: 'change',
  topClick: 'click',
  topCompositionEnd: 'compositionend',
  topCompositionStart: 'compositionstart',
  topCompositionUpdate: 'compositionupdate',
  topContextMenu: 'contextmenu',
  topCopy: 'copy',
  topCut: 'cut',
  topDoubleClick: 'dblclick',
  topDrag: 'drag',
  topDragEnd: 'dragend',
  topDragEnter: 'dragenter',
  topDragExit: 'dragexit',
  topDragLeave: 'dragleave',
  topDragOver: 'dragover',
  topDragStart: 'dragstart',
  topDrop: 'drop',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topFocus: 'focus',
  topInput: 'input',
  topKeyDown: 'keydown',
  topKeyPress: 'keypress',
  topKeyUp: 'keyup',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topMouseDown: 'mousedown',
  topMouseMove: 'mousemove',
  topMouseOut: 'mouseout',
  topMouseOver: 'mouseover',
  topMouseUp: 'mouseup',
  topPaste: 'paste',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topScroll: 'scroll',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topSelectionChange: 'selectionchange',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTextInput: 'textInput',
  topTimeUpdate: 'timeupdate',
  topTouchCancel: 'touchcancel',
  topTouchEnd: 'touchend',
  topTouchMove: 'touchmove',
  topTouchStart: 'touchstart',
  topTransitionEnd: getVendorPrefixedEventName('transitionend') || 'transitionend',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting',
  topWheel: 'wheel'
};

/**
 * To ensure no conflicts with other potential React instances on the page
 */
var topListenersIDKey = '_reactListenersID' + String(Math.random()).slice(2);

function getListeningForDocument(mountAt) {
  // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
  // directly.
  if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
    mountAt[topListenersIDKey] = reactTopListenersCounter++;
    alreadyListeningTo[mountAt[topListenersIDKey]] = {};
  }
  return alreadyListeningTo[mountAt[topListenersIDKey]];
}

/**
 * `ReactBrowserEventEmitter` is used to attach top-level event listeners. For
 * example:
 *
 *   EventPluginHub.putListener('myID', 'onClick', myFunction);
 *
 * This would allocate a "registration" of `('onClick', myFunction)` on 'myID'.
 *
 * @internal
 */
var ReactBrowserEventEmitter = _assign({}, ReactEventEmitterMixin, {

  /**
   * Injectable event backend
   */
  ReactEventListener: null,

  injection: {
    /**
     * @param {object} ReactEventListener
     */
    injectReactEventListener: function injectReactEventListener(ReactEventListener) {
      ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
      ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
    }
  },

  /**
   * Sets whether or not any created callbacks should be enabled.
   *
   * @param {boolean} enabled True if callbacks should be enabled.
   */
  setEnabled: function setEnabled(enabled) {
    if (ReactBrowserEventEmitter.ReactEventListener) {
      ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
    }
  },

  /**
   * @return {boolean} True if callbacks are enabled.
   */
  isEnabled: function isEnabled() {
    return !!(ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled());
  },

  /**
   * We listen for bubbled touch events on the document object.
   *
   * Firefox v8.01 (and possibly others) exhibited strange behavior when
   * mounting `onmousemove` events at some node that was not the document
   * element. The symptoms were that if your mouse is not moving over something
   * contained within that mount point (for example on the background) the
   * top-level listeners for `onmousemove` won't be called. However, if you
   * register the `mousemove` on the document object, then it will of course
   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
   * top-level listeners to the document object only, at least for these
   * movement types of events and possibly all events.
   *
   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
   *
   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
   * they bubble to document.
   *
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {object} contentDocumentHandle Document which owns the container
   */
  listenTo: function listenTo(registrationName, contentDocumentHandle) {
    var mountAt = contentDocumentHandle;
    var isListening = getListeningForDocument(mountAt);
    var dependencies = EventPluginRegistry.registrationNameDependencies[registrationName];

    for (var i = 0; i < dependencies.length; i++) {
      var dependency = dependencies[i];
      if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
        if (dependency === 'topWheel') {
          if (isEventSupported('wheel')) {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'wheel', mountAt);
          } else if (isEventSupported('mousewheel')) {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'mousewheel', mountAt);
          } else {
            // Firefox needs to capture a different mouse scroll event.
            // @see http://www.quirksmode.org/dom/events/tests/scroll.html
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'DOMMouseScroll', mountAt);
          }
        } else if (dependency === 'topScroll') {

          if (isEventSupported('scroll', true)) {
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topScroll', 'scroll', mountAt);
          } else {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topScroll', 'scroll', ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);
          }
        } else if (dependency === 'topFocus' || dependency === 'topBlur') {

          if (isEventSupported('focus', true)) {
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topFocus', 'focus', mountAt);
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topBlur', 'blur', mountAt);
          } else if (isEventSupported('focusin')) {
            // IE has `focusin` and `focusout` events which bubble.
            // @see http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topFocus', 'focusin', mountAt);
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topBlur', 'focusout', mountAt);
          }

          // to make sure blur and focus event listeners are only attached once
          isListening.topBlur = true;
          isListening.topFocus = true;
        } else if (topEventMapping.hasOwnProperty(dependency)) {
          ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
        }

        isListening[dependency] = true;
      }
    }
  },

  trapBubbledEvent: function trapBubbledEvent(topLevelType, handlerBaseName, handle) {
    return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
  },

  trapCapturedEvent: function trapCapturedEvent(topLevelType, handlerBaseName, handle) {
    return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
  },

  /**
   * Protect against document.createEvent() returning null
   * Some popup blocker extensions appear to do this:
   * https://github.com/facebook/react/issues/6887
   */
  supportsEventPageXY: function supportsEventPageXY() {
    if (!document.createEvent) {
      return false;
    }
    var ev = document.createEvent('MouseEvent');
    return ev != null && 'pageX' in ev;
  },

  /**
   * Listens to window scroll and resize events. We cache scroll values so that
   * application code can access them without triggering reflows.
   *
   * ViewportMetrics is only used by SyntheticMouse/TouchEvent and only when
   * pageX/pageY isn't supported (legacy browsers).
   *
   * NOTE: Scroll events do not bubble.
   *
   * @see http://www.quirksmode.org/dom/events/scroll.html
   */
  ensureScrollValueMonitoring: function ensureScrollValueMonitoring() {
    if (hasEventPageXY === undefined) {
      hasEventPageXY = ReactBrowserEventEmitter.supportsEventPageXY();
    }
    if (!hasEventPageXY && !isMonitoringScrollValue) {
      var refresh = ViewportMetrics.refreshScrollValues;
      ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
      isMonitoringScrollValue = true;
    }
  }

});

module.exports = ReactBrowserEventEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIuanMiXSwibmFtZXMiOlsiX2Fzc2lnbiIsInJlcXVpcmUiLCJFdmVudFBsdWdpblJlZ2lzdHJ5IiwiUmVhY3RFdmVudEVtaXR0ZXJNaXhpbiIsIlZpZXdwb3J0TWV0cmljcyIsImdldFZlbmRvclByZWZpeGVkRXZlbnROYW1lIiwiaXNFdmVudFN1cHBvcnRlZCIsImhhc0V2ZW50UGFnZVhZIiwiYWxyZWFkeUxpc3RlbmluZ1RvIiwiaXNNb25pdG9yaW5nU2Nyb2xsVmFsdWUiLCJyZWFjdFRvcExpc3RlbmVyc0NvdW50ZXIiLCJ0b3BFdmVudE1hcHBpbmciLCJ0b3BBYm9ydCIsInRvcEFuaW1hdGlvbkVuZCIsInRvcEFuaW1hdGlvbkl0ZXJhdGlvbiIsInRvcEFuaW1hdGlvblN0YXJ0IiwidG9wQmx1ciIsInRvcENhblBsYXkiLCJ0b3BDYW5QbGF5VGhyb3VnaCIsInRvcENoYW5nZSIsInRvcENsaWNrIiwidG9wQ29tcG9zaXRpb25FbmQiLCJ0b3BDb21wb3NpdGlvblN0YXJ0IiwidG9wQ29tcG9zaXRpb25VcGRhdGUiLCJ0b3BDb250ZXh0TWVudSIsInRvcENvcHkiLCJ0b3BDdXQiLCJ0b3BEb3VibGVDbGljayIsInRvcERyYWciLCJ0b3BEcmFnRW5kIiwidG9wRHJhZ0VudGVyIiwidG9wRHJhZ0V4aXQiLCJ0b3BEcmFnTGVhdmUiLCJ0b3BEcmFnT3ZlciIsInRvcERyYWdTdGFydCIsInRvcERyb3AiLCJ0b3BEdXJhdGlvbkNoYW5nZSIsInRvcEVtcHRpZWQiLCJ0b3BFbmNyeXB0ZWQiLCJ0b3BFbmRlZCIsInRvcEVycm9yIiwidG9wRm9jdXMiLCJ0b3BJbnB1dCIsInRvcEtleURvd24iLCJ0b3BLZXlQcmVzcyIsInRvcEtleVVwIiwidG9wTG9hZGVkRGF0YSIsInRvcExvYWRlZE1ldGFkYXRhIiwidG9wTG9hZFN0YXJ0IiwidG9wTW91c2VEb3duIiwidG9wTW91c2VNb3ZlIiwidG9wTW91c2VPdXQiLCJ0b3BNb3VzZU92ZXIiLCJ0b3BNb3VzZVVwIiwidG9wUGFzdGUiLCJ0b3BQYXVzZSIsInRvcFBsYXkiLCJ0b3BQbGF5aW5nIiwidG9wUHJvZ3Jlc3MiLCJ0b3BSYXRlQ2hhbmdlIiwidG9wU2Nyb2xsIiwidG9wU2Vla2VkIiwidG9wU2Vla2luZyIsInRvcFNlbGVjdGlvbkNoYW5nZSIsInRvcFN0YWxsZWQiLCJ0b3BTdXNwZW5kIiwidG9wVGV4dElucHV0IiwidG9wVGltZVVwZGF0ZSIsInRvcFRvdWNoQ2FuY2VsIiwidG9wVG91Y2hFbmQiLCJ0b3BUb3VjaE1vdmUiLCJ0b3BUb3VjaFN0YXJ0IiwidG9wVHJhbnNpdGlvbkVuZCIsInRvcFZvbHVtZUNoYW5nZSIsInRvcFdhaXRpbmciLCJ0b3BXaGVlbCIsInRvcExpc3RlbmVyc0lES2V5IiwiU3RyaW5nIiwiTWF0aCIsInJhbmRvbSIsInNsaWNlIiwiZ2V0TGlzdGVuaW5nRm9yRG9jdW1lbnQiLCJtb3VudEF0IiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyIiwiUmVhY3RFdmVudExpc3RlbmVyIiwiaW5qZWN0aW9uIiwiaW5qZWN0UmVhY3RFdmVudExpc3RlbmVyIiwic2V0SGFuZGxlVG9wTGV2ZWwiLCJoYW5kbGVUb3BMZXZlbCIsInNldEVuYWJsZWQiLCJlbmFibGVkIiwiaXNFbmFibGVkIiwibGlzdGVuVG8iLCJyZWdpc3RyYXRpb25OYW1lIiwiY29udGVudERvY3VtZW50SGFuZGxlIiwiaXNMaXN0ZW5pbmciLCJkZXBlbmRlbmNpZXMiLCJyZWdpc3RyYXRpb25OYW1lRGVwZW5kZW5jaWVzIiwiaSIsImxlbmd0aCIsImRlcGVuZGVuY3kiLCJ0cmFwQnViYmxlZEV2ZW50IiwidHJhcENhcHR1cmVkRXZlbnQiLCJXSU5ET1dfSEFORExFIiwidG9wTGV2ZWxUeXBlIiwiaGFuZGxlckJhc2VOYW1lIiwiaGFuZGxlIiwic3VwcG9ydHNFdmVudFBhZ2VYWSIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJldiIsImVuc3VyZVNjcm9sbFZhbHVlTW9uaXRvcmluZyIsInVuZGVmaW5lZCIsInJlZnJlc2giLCJyZWZyZXNoU2Nyb2xsVmFsdWVzIiwibW9uaXRvclNjcm9sbFZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxJQUFJQSxVQUFVQyxRQUFRLGVBQVIsQ0FBZDs7QUFFQSxJQUFJQyxzQkFBc0JELFFBQVEsdUJBQVIsQ0FBMUI7QUFDQSxJQUFJRSx5QkFBeUJGLFFBQVEsMEJBQVIsQ0FBN0I7QUFDQSxJQUFJRyxrQkFBa0JILFFBQVEsbUJBQVIsQ0FBdEI7O0FBRUEsSUFBSUksNkJBQTZCSixRQUFRLDhCQUFSLENBQWpDO0FBQ0EsSUFBSUssbUJBQW1CTCxRQUFRLG9CQUFSLENBQXZCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdURBLElBQUlNLGNBQUo7QUFDQSxJQUFJQyxxQkFBcUIsRUFBekI7QUFDQSxJQUFJQywwQkFBMEIsS0FBOUI7QUFDQSxJQUFJQywyQkFBMkIsQ0FBL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSUMsa0JBQWtCO0FBQ3BCQyxZQUFVLE9BRFU7QUFFcEJDLG1CQUFpQlIsMkJBQTJCLGNBQTNCLEtBQThDLGNBRjNDO0FBR3BCUyx5QkFBdUJULDJCQUEyQixvQkFBM0IsS0FBb0Qsb0JBSHZEO0FBSXBCVSxxQkFBbUJWLDJCQUEyQixnQkFBM0IsS0FBZ0QsZ0JBSi9DO0FBS3BCVyxXQUFTLE1BTFc7QUFNcEJDLGNBQVksU0FOUTtBQU9wQkMscUJBQW1CLGdCQVBDO0FBUXBCQyxhQUFXLFFBUlM7QUFTcEJDLFlBQVUsT0FUVTtBQVVwQkMscUJBQW1CLGdCQVZDO0FBV3BCQyx1QkFBcUIsa0JBWEQ7QUFZcEJDLHdCQUFzQixtQkFaRjtBQWFwQkMsa0JB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IiwiZmlsZSI6IlJlYWN0QnJvd3NlckV2ZW50RW1pdHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgRXZlbnRQbHVnaW5SZWdpc3RyeSA9IHJlcXVpcmUoJy4vRXZlbnRQbHVnaW5SZWdpc3RyeScpO1xudmFyIFJlYWN0RXZlbnRFbWl0dGVyTWl4aW4gPSByZXF1aXJlKCcuL1JlYWN0RXZlbnRFbWl0dGVyTWl4aW4nKTtcbnZhciBWaWV3cG9ydE1ldHJpY3MgPSByZXF1aXJlKCcuL1ZpZXdwb3J0TWV0cmljcycpO1xuXG52YXIgZ2V0VmVuZG9yUHJlZml4ZWRFdmVudE5hbWUgPSByZXF1aXJlKCcuL2dldFZlbmRvclByZWZpeGVkRXZlbnROYW1lJyk7XG52YXIgaXNFdmVudFN1cHBvcnRlZCA9IHJlcXVpcmUoJy4vaXNFdmVudFN1cHBvcnRlZCcpO1xuXG4vKipcbiAqIFN1bW1hcnkgb2YgYFJlYWN0QnJvd3NlckV2ZW50RW1pdHRlcmAgZXZlbnQgaGFuZGxpbmc6XG4gKlxuICogIC0gVG9wLWxldmVsIGRlbGVnYXRpb24gaXMgdXNlZCB0byB0cmFwIG1vc3QgbmF0aXZlIGJyb3dzZXIgZXZlbnRzLiBUaGlzXG4gKiAgICBtYXkgb25seSBvY2N1ciBpbiB0aGUgbWFpbiB0aHJlYWQgYW5kIGlzIHRoZSByZXNwb25zaWJpbGl0eSBvZlxuICogICAgUmVhY3RFdmVudExpc3RlbmVyLCB3aGljaCBpcyBpbmplY3RlZCBhbmQgY2FuIHRoZXJlZm9yZSBzdXBwb3J0IHBsdWdnYWJsZVxuICogICAgZXZlbnQgc291cmNlcy4gVGhpcyBpcyB0aGUgb25seSB3b3JrIHRoYXQgb2NjdXJzIGluIHRoZSBtYWluIHRocmVhZC5cbiAqXG4gKiAgLSBXZSBub3JtYWxpemUgYW5kIGRlLWR1cGxpY2F0ZSBldmVudHMgdG8gYWNjb3VudCBmb3IgYnJvd3NlciBxdWlya3MuIFRoaXNcbiAqICAgIG1heSBiZSBkb25lIGluIHRoZSB3b3JrZXIgdGhyZWFkLlxuICpcbiAqICAtIEZvcndhcmQgdGhlc2UgbmF0aXZlIGV2ZW50cyAod2l0aCB0aGUgYXNzb2NpYXRlZCB0b3AtbGV2ZWwgdHlwZSB1c2VkIHRvXG4gKiAgICB0cmFwIGl0KSB0byBgRXZlbnRQbHVnaW5IdWJgLCB3aGljaCBpbiB0dXJuIHdpbGwgYXNrIHBsdWdpbnMgaWYgdGhleSB3YW50XG4gKiAgICB0byBleHRyYWN0IGFueSBzeW50aGV0aWMgZXZlbnRzLlxuICpcbiAqICAtIFRoZSBgRXZlbnRQbHVnaW5IdWJgIHdpbGwgdGhlbiBwcm9jZXNzIGVhY2ggZXZlbnQgYnkgYW5ub3RhdGluZyB0aGVtIHdpdGhcbiAqICAgIFwiZGlzcGF0Y2hlc1wiLCBhIHNlcXVlbmNlIG9mIGxpc3RlbmVycyBhbmQgSURzIHRoYXQgY2FyZSBhYm91dCB0aGF0IGV2ZW50LlxuICpcbiAqICAtIFRoZSBgRXZlbnRQbHVnaW5IdWJgIHRoZW4gZGlzcGF0Y2hlcyB0aGUgZXZlbnRzLlxuICpcbiAqIE92ZXJ2aWV3IG9mIFJlYWN0IGFuZCB0aGUgZXZlbnQgc3lzdGVtOlxuICpcbiAqICstLS0tLS0tLS0tLS0rICAgIC5cbiAqIHwgICAgRE9NICAgICB8ICAgIC5cbiAqICstLS0tLS0tLS0tLS0rICAgIC5cbiAqICAgICAgIHwgICAgICAgICAgIC5cbiAqICAgICAgIHYgICAgICAgICAgIC5cbiAqICstLS0tLS0tLS0tLS0rICAgIC5cbiAqIHwgUmVhY3RFdmVudCB8ICAgIC5cbiAqIHwgIExpc3RlbmVyICB8ICAgIC5cbiAqICstLS0tLS0tLS0tLS0rICAgIC4gICAgICAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0tLS0tK1xuICogICAgICAgfCAgICAgICAgICAgLiAgICAgICAgICAgICAgICstLS0tLS0tLSt8U2ltcGxlRXZlbnR8XG4gKiAgICAgICB8ICAgICAgICAgICAuICAgICAgICAgICAgICAgfCAgICAgICAgIHxQbHVnaW4gICAgIHxcbiAqICstLS0tLXwtLS0tLS0rICAgIC4gICAgICAgICAgICAgICB2ICAgICAgICAgKy0tLS0tLS0tLS0tK1xuICogfCAgICAgfCAgICAgIHwgICAgLiAgICArLS0tLS0tLS0tLS0tLS0rICAgICAgICAgICAgICAgICAgICArLS0tLS0tLS0tLS0tK1xuICogfCAgICAgKy0tLS0tLS0tLS0tLi0tLT58RXZlbnRQbHVnaW5IdWJ8ICAgICAgICAgICAgICAgICAgICB8ICAgIEV2ZW50ICAgfFxuICogfCAgICAgICAgICAgIHwgICAgLiAgICB8ICAgICAgICAgICAgICB8ICAgICArLS0tLS0tLS0tLS0rICB8IFByb3BhZ2F0b3JzfFxuICogfCBSZWFjdEV2ZW50IHwgICAgLiAgICB8ICAgICAgICAgICAgICB8ICAgICB8VGFwRXZlbnQgICB8ICB8LS0tLS0tLS0tLS0tfFxuICogfCAgRW1pdHRlciAgIHwgICAgLiAgICB8ICAgICAgICAgICAgICB8PC0tLSt8UGx1Z2luICAgICB8ICB8b3RoZXIgcGx1Z2lufFxuICogfCAgICAgICAgICAgIHwgICAgLiAgICB8ICAgICAgICAgICAgICB8ICAgICArLS0tLS0tLS0tLS0rICB8ICB1dGlsaXRpZXMgfFxuICogfCAgICAgKy0tLS0tLS0tLS0tLi0tLT58ICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICArLS0tLS0tLS0tLS0tK1xuICogfCAgICAgfCAgICAgIHwgICAgLiAgICArLS0tLS0tLS0tLS0tLS0rXG4gKiArLS0tLS18LS0tLS0tKyAgICAuICAgICAgICAgICAgICAgIF4gICAgICAgICstLS0tLS0tLS0tLStcbiAqICAgICAgIHwgICAgICAgICAgIC4gICAgICAgICAgICAgICAgfCAgICAgICAgfEVudGVyL0xlYXZlfFxuICogICAgICAgKyAgICAgICAgICAgLiAgICAgICAgICAgICAgICArLS0tLS0tLSt8UGx1Z2luICAgICB8XG4gKiArLS0tLS0tLS0tLS0tLSsgICAuICAgICAgICAgICAgICAgICAgICAgICAgICstLS0tLS0tLS0tLStcbiAqIHwgYXBwbGljYXRpb24gfCAgIC5cbiAqIHwtLS0tLS0tLS0tLS0tfCAgIC5cbiAqIHwgICAgICAgICAgICAgfCAgIC5cbiAqIHwgICAgICAgICAgICAgfCAgIC5cbiAqICstLS0tLS0tLS0tLS0tKyAgIC5cbiAqICAgICAgICAgICAgICAgICAgIC5cbiAqICAgIFJlYWN0IENvcmUgICAgIC4gIEdlbmVyYWwgUHVycG9zZSBFdmVudCBQbHVnaW4gU3lzdGVtXG4gKi9cblxudmFyIGhhc0V2ZW50UGFnZVhZO1xudmFyIGFscmVhZHlMaXN0ZW5pbmdUbyA9IHt9O1xudmFyIGlzTW9uaXRvcmluZ1Njcm9sbFZhbHVlID0gZmFsc2U7XG52YXIgcmVhY3RUb3BMaXN0ZW5lcnNDb3VudGVyID0gMDtcblxuLy8gRm9yIGV2ZW50cyBsaWtlICdzdWJtaXQnIHdoaWNoIGRvbid0IGNvbnNpc3RlbnRseSBidWJibGUgKHdoaWNoIHdlIHRyYXAgYXQgYVxuLy8gbG93ZXIgbm9kZSB0aGFuIGBkb2N1bWVudGApLCBiaW5kaW5nIGF0IGBkb2N1bWVudGAgd291bGQgY2F1c2UgZHVwbGljYXRlXG4vLyBldmVudHMgc28gd2UgZG9uJ3QgaW5jbHVkZSB0aGVtIGhlcmVcbnZhciB0b3BFdmVudE1hcHBpbmcgPSB7XG4gIHRvcEFib3J0OiAnYWJvcnQnLFxuICB0b3BBbmltYXRpb25FbmQ6IGdldFZlbmRvclByZWZpeGVkRXZlbnROYW1lKCdhbmltYXRpb25lbmQnKSB8fCAnYW5pbWF0aW9uZW5kJyxcbiAgdG9wQW5pbWF0aW9uSXRlcmF0aW9uOiBnZXRWZW5kb3JQcmVmaXhlZEV2ZW50TmFtZSgnYW5pbWF0aW9uaXRlcmF0aW9uJykgfHwgJ2FuaW1hdGlvbml0ZXJhdGlvbicsXG4gIHRvcEFuaW1hdGlvblN0YXJ0OiBnZXRWZW5kb3JQcmVmaXhlZEV2ZW50TmFtZSgnYW5pbWF0aW9uc3RhcnQnKSB8fCAnYW5pbWF0aW9uc3RhcnQnLFxuICB0b3BCbHVyOiAnYmx1cicsXG4gIHRvcENhblBsYXk6ICdjYW5wbGF5JyxcbiAgdG9wQ2FuUGxheVRocm91Z2g6ICdjYW5wbGF5dGhyb3VnaCcsXG4gIHRvcENoYW5nZTogJ2NoYW5nZScsXG4gIHRvcENsaWNrOiAnY2xpY2snLFxuICB0b3BDb21wb3NpdGlvbkVuZDogJ2NvbXBvc2l0aW9uZW5kJyxcbiAgdG9wQ29tcG9zaXRpb25TdGFydDogJ2NvbXBvc2l0aW9uc3RhcnQnLFxuICB0b3BDb21wb3NpdGlvblVwZGF0ZTogJ2NvbXBvc2l0aW9udXBkYXRlJyxcbiAgdG9wQ29udGV4dE1lbnU6ICdjb250ZXh0bWVudScsXG4gIHRvcENvcHk6ICdjb3B5JyxcbiAgdG9wQ3V0OiAnY3V0JyxcbiAgdG9wRG91YmxlQ2xpY2s6ICdkYmxjbGljaycsXG4gIHRvcERyYWc6ICdkcmFnJyxcbiAgdG9wRHJhZ0VuZDogJ2RyYWdlbmQnLFxuICB0b3BEcmFnRW50ZXI6ICdkcmFnZW50ZXInLFxuICB0b3BEcmFnRXhpdDogJ2RyYWdleGl0JyxcbiAgdG9wRHJhZ0xlYXZlOiAnZHJhZ2xlYXZlJyxcbiAgdG9wRHJhZ092ZXI6ICdkcmFnb3ZlcicsXG4gIHRvcERyYWdTdGFydDogJ2RyYWdzdGFydCcsXG4gIHRvcERyb3A6ICdkcm9wJyxcbiAgdG9wRHVyYXRpb25DaGFuZ2U6ICdkdXJhdGlvbmNoYW5nZScsXG4gIHRvcEVtcHRpZWQ6ICdlbXB0aWVkJyxcbiAgdG9wRW5jcnlwdGVkOiAnZW5jcnlwdGVkJyxcbiAgdG9wRW5kZWQ6ICdlbmRlZCcsXG4gIHRvcEVycm9yOiAnZXJyb3InLFxuICB0b3BGb2N1czogJ2ZvY3VzJyxcbiAgdG9wSW5wdXQ6ICdpbnB1dCcsXG4gIHRvcEtleURvd246ICdrZXlkb3duJyxcbiAgdG9wS2V5UHJlc3M6ICdrZXlwcmVzcycsXG4gIHRvcEtleVVwOiAna2V5dXAnLFxuICB0b3BMb2FkZWREYXRhOiAnbG9hZGVkZGF0YScsXG4gIHRvcExvYWRlZE1ldGFkYXRhOiAnbG9hZGVkbWV0YWRhdGEnLFxuICB0b3BMb2FkU3RhcnQ6ICdsb2Fkc3RhcnQnLFxuICB0b3BNb3VzZURvd246ICdtb3VzZWRvd24nLFxuICB0b3BNb3VzZU1vdmU6ICdtb3VzZW1vdmUnLFxuICB0b3BNb3VzZU91dDogJ21vdXNlb3V0JyxcbiAgdG9wTW91c2VPdmVyOiAnbW91c2VvdmVyJyxcbiAgdG9wTW91c2VVcDogJ21vdXNldXAnLFxuICB0b3BQYXN0ZTogJ3Bhc3RlJyxcbiAgdG9wUGF1c2U6ICdwYXVzZScsXG4gIHRvcFBsYXk6ICdwbGF5JyxcbiAgdG9wUGxheWluZzogJ3BsYXlpbmcnLFxuICB0b3BQcm9ncmVzczogJ3Byb2dyZXNzJyxcbiAgdG9wUmF0ZUNoYW5nZTogJ3JhdGVjaGFuZ2UnLFxuICB0b3BTY3JvbGw6ICdzY3JvbGwnLFxuICB0b3BTZWVrZWQ6ICdzZWVrZWQnLFxuICB0b3BTZWVraW5nOiAnc2Vla2luZycsXG4gIHRvcFNlbGVjdGlvbkNoYW5nZTogJ3NlbGVjdGlvbmNoYW5nZScsXG4gIHRvcFN0YWxsZWQ6ICdzdGFsbGVkJyxcbiAgdG9wU3VzcGVuZDogJ3N1c3BlbmQnLFxuICB0b3BUZXh0SW5wdXQ6ICd0ZXh0SW5wdXQnLFxuICB0b3BUaW1lVXBkYXRlOiAndGltZXVwZGF0ZScsXG4gIHRvcFRvdWNoQ2FuY2VsOiAndG91Y2hjYW5jZWwnLFxuICB0b3BUb3VjaEVuZDogJ3RvdWNoZW5kJyxcbiAgdG9wVG91Y2hNb3ZlOiAndG91Y2htb3ZlJyxcbiAgdG9wVG91Y2hTdGFydDogJ3RvdWNoc3RhcnQnLFxuICB0b3BUcmFuc2l0aW9uRW5kOiBnZXRWZW5kb3JQcmVmaXhlZEV2ZW50TmFtZSgndHJhbnNpdGlvbmVuZCcpIHx8ICd0cmFuc2l0aW9uZW5kJyxcbiAgdG9wVm9sdW1lQ2hhbmdlOiAndm9sdW1lY2hhbmdlJyxcbiAgdG9wV2FpdGluZzogJ3dhaXRpbmcnLFxuICB0b3BXaGVlbDogJ3doZWVsJ1xufTtcblxuLyoqXG4gKiBUbyBlbnN1cmUgbm8gY29uZmxpY3RzIHdpdGggb3RoZXIgcG90ZW50aWFsIFJlYWN0IGluc3RhbmNlcyBvbiB0aGUgcGFnZVxuICovXG52YXIgdG9wTGlzdGVuZXJzSURLZXkgPSAnX3JlYWN0TGlzdGVuZXJzSUQnICsgU3RyaW5nKE1hdGgucmFuZG9tKCkpLnNsaWNlKDIpO1xuXG5mdW5jdGlvbiBnZXRMaXN0ZW5pbmdGb3JEb2N1bWVudChtb3VudEF0KSB7XG4gIC8vIEluIElFOCwgYG1vdW50QXRgIGlzIGEgaG9zdCBvYmplY3QgYW5kIGRvZXNuJ3QgaGF2ZSBgaGFzT3duUHJvcGVydHlgXG4gIC8vIGRpcmVjdGx5LlxuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3VudEF0LCB0b3BMaXN0ZW5lcnNJREtleSkpIHtcbiAgICBtb3VudEF0W3RvcExpc3RlbmVyc0lES2V5XSA9IHJlYWN0VG9wTGlzdGVuZXJzQ291bnRlcisrO1xuICAgIGFscmVhZHlMaXN0ZW5pbmdUb1ttb3VudEF0W3RvcExpc3RlbmVyc0lES2V5XV0gPSB7fTtcbiAgfVxuICByZXR1cm4gYWxyZWFkeUxpc3RlbmluZ1RvW21vdW50QXRbdG9wTGlzdGVuZXJzSURLZXldXTtcbn1cblxuLyoqXG4gKiBgUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyYCBpcyB1c2VkIHRvIGF0dGFjaCB0b3AtbGV2ZWwgZXZlbnQgbGlzdGVuZXJzLiBGb3JcbiAqIGV4YW1wbGU6XG4gKlxuICogICBFdmVudFBsdWdpbkh1Yi5wdXRMaXN0ZW5lcignbXlJRCcsICdvbkNsaWNrJywgbXlGdW5jdGlvbik7XG4gKlxuICogVGhpcyB3b3VsZCBhbGxvY2F0ZSBhIFwicmVnaXN0cmF0aW9uXCIgb2YgYCgnb25DbGljaycsIG15RnVuY3Rpb24pYCBvbiAnbXlJRCcuXG4gKlxuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIgPSBfYXNzaWduKHt9LCBSZWFjdEV2ZW50RW1pdHRlck1peGluLCB7XG5cbiAgLyoqXG4gICAqIEluamVjdGFibGUgZXZlbnQgYmFja2VuZFxuICAgKi9cbiAgUmVhY3RFdmVudExpc3RlbmVyOiBudWxsLFxuXG4gIGluamVjdGlvbjoge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBSZWFjdEV2ZW50TGlzdGVuZXJcbiAgICAgKi9cbiAgICBpbmplY3RSZWFjdEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIChSZWFjdEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIFJlYWN0RXZlbnRMaXN0ZW5lci5zZXRIYW5kbGVUb3BMZXZlbChSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIuaGFuZGxlVG9wTGV2ZWwpO1xuICAgICAgUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyLlJlYWN0RXZlbnRMaXN0ZW5lciA9IFJlYWN0RXZlbnRMaXN0ZW5lcjtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgd2hldGhlciBvciBub3QgYW55IGNyZWF0ZWQgY2FsbGJhY2tzIHNob3VsZCBiZSBlbmFibGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWQgVHJ1ZSBpZiBjYWxsYmFja3Mgc2hvdWxkIGJlIGVuYWJsZWQuXG4gICAqL1xuICBzZXRFbmFibGVkOiBmdW5jdGlvbiAoZW5hYmxlZCkge1xuICAgIGlmIChSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIuUmVhY3RFdmVudExpc3RlbmVyKSB7XG4gICAgICBSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIuUmVhY3RFdmVudExpc3RlbmVyLnNldEVuYWJsZWQoZW5hYmxlZCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGNhbGxiYWNrcyBhcmUgZW5hYmxlZC5cbiAgICovXG4gIGlzRW5hYmxlZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhIShSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIuUmVhY3RFdmVudExpc3RlbmVyICYmIFJlYWN0QnJvd3NlckV2ZW50RW1pdHRlci5SZWFjdEV2ZW50TGlzdGVuZXIuaXNFbmFibGVkKCkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBXZSBsaXN0ZW4gZm9yIGJ1YmJsZWQgdG91Y2ggZXZlbnRzIG9uIHRoZSBkb2N1bWVudCBvYmplY3QuXG4gICAqXG4gICAqIEZpcmVmb3ggdjguMDEgKGFuZCBwb3NzaWJseSBvdGhlcnMpIGV4aGliaXRlZCBzdHJhbmdlIGJlaGF2aW9yIHdoZW5cbiAgICogbW91bnRpbmcgYG9ubW91c2Vtb3ZlYCBldmVudHMgYXQgc29tZSBub2RlIHRoYXQgd2FzIG5vdCB0aGUgZG9jdW1lbnRcbiAgICogZWxlbWVudC4gVGhlIHN5bXB0b21zIHdlcmUgdGhhdCBpZiB5b3VyIG1vdXNlIGlzIG5vdCBtb3Zpbmcgb3ZlciBzb21ldGhpbmdcbiAgICogY29udGFpbmVkIHdpdGhpbiB0aGF0IG1vdW50IHBvaW50IChmb3IgZXhhbXBsZSBvbiB0aGUgYmFja2dyb3VuZCkgdGhlXG4gICAqIHRvcC1sZXZlbCBsaXN0ZW5lcnMgZm9yIGBvbm1vdXNlbW92ZWAgd29uJ3QgYmUgY2FsbGVkLiBIb3dldmVyLCBpZiB5b3VcbiAgICogcmVnaXN0ZXIgdGhlIGBtb3VzZW1vdmVgIG9uIHRoZSBkb2N1bWVudCBvYmplY3QsIHRoZW4gaXQgd2lsbCBvZiBjb3Vyc2VcbiAgICogY2F0Y2ggYWxsIGBtb3VzZW1vdmVgcy4gVGhpcyBhbG9uZyB3aXRoIGlPUyBxdWlya3MsIGp1c3RpZmllcyByZXN0cmljdGluZ1xuICAgKiB0b3AtbGV2ZWwgbGlzdGVuZXJzIHRvIHRoZSBkb2N1bWVudCBvYmplY3Qgb25seSwgYXQgbGVhc3QgZm9yIHRoZXNlXG4gICAqIG1vdmVtZW50IHR5cGVzIG9mIGV2ZW50cyBhbmQgcG9zc2libHkgYWxsIGV2ZW50cy5cbiAgICpcbiAgICogQHNlZSBodHRwOi8vd3d3LnF1aXJrc21vZGUub3JnL2Jsb2cvYXJjaGl2ZXMvMjAxMC8wOS9jbGlja19ldmVudF9kZWwuaHRtbFxuICAgKlxuICAgKiBBbHNvLCBga2V5dXBgL2BrZXlwcmVzc2AvYGtleWRvd25gIGRvIG5vdCBidWJibGUgdG8gdGhlIHdpbmRvdyBvbiBJRSwgYnV0XG4gICAqIHRoZXkgYnViYmxlIHRvIGRvY3VtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVnaXN0cmF0aW9uTmFtZSBOYW1lIG9mIGxpc3RlbmVyIChlLmcuIGBvbkNsaWNrYCkuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZW50RG9jdW1lbnRIYW5kbGUgRG9jdW1lbnQgd2hpY2ggb3ducyB0aGUgY29udGFpbmVyXG4gICAqL1xuICBsaXN0ZW5UbzogZnVuY3Rpb24gKHJlZ2lzdHJhdGlvbk5hbWUsIGNvbnRlbnREb2N1bWVudEhhbmRsZSkge1xuICAgIHZhciBtb3VudEF0ID0gY29udGVudERvY3VtZW50SGFuZGxlO1xuICAgIHZhciBpc0xpc3RlbmluZyA9IGdldExpc3RlbmluZ0ZvckRvY3VtZW50KG1vdW50QXQpO1xuICAgIHZhciBkZXBlbmRlbmNpZXMgPSBFdmVudFBsdWdpblJlZ2lzdHJ5LnJlZ2lzdHJhdGlvbk5hbWVEZXBlbmRlbmNpZXNbcmVnaXN0cmF0aW9uTmFtZV07XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlcGVuZGVuY3kgPSBkZXBlbmRlbmNpZXNbaV07XG4gICAgICBpZiAoIShpc0xpc3RlbmluZy5oYXNPd25Qcm9wZXJ0eShkZXBlbmRlbmN5KSAmJiBpc0xpc3RlbmluZ1tkZXBlbmRlbmN5XSkpIHtcbiAgICAgICAgaWYgKGRlcGVuZGVuY3kgPT09ICd0b3BXaGVlbCcpIHtcbiAgICAgICAgICBpZiAoaXNFdmVudFN1cHBvcnRlZCgnd2hlZWwnKSkge1xuICAgICAgICAgICAgUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyLlJlYWN0RXZlbnRMaXN0ZW5lci50cmFwQnViYmxlZEV2ZW50KCd0b3BXaGVlbCcsICd3aGVlbCcsIG1vdW50QXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNFdmVudFN1cHBvcnRlZCgnbW91c2V3aGVlbCcpKSB7XG4gICAgICAgICAgICBSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIuUmVhY3RFdmVudExpc3RlbmVyLnRyYXBCdWJibGVkRXZlbnQoJ3RvcFdoZWVsJywgJ21vdXNld2hlZWwnLCBtb3VudEF0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gRmlyZWZveCBuZWVkcyB0byBjYXB0dXJlIGEgZGlmZmVyZW50IG1vdXNlIHNjcm9sbCBldmVudC5cbiAgICAgICAgICAgIC8vIEBzZWUgaHR0cDovL3d3dy5xdWlya3Ntb2RlLm9yZy9kb20vZXZlbnRzL3Rlc3RzL3Njcm9sbC5odG1sXG4gICAgICAgICAgICBSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIuUmVhY3RFdmVudExpc3RlbmVyLnRyYXBCdWJibGVkRXZlbnQoJ3RvcFdoZWVsJywgJ0RPTU1vdXNlU2Nyb2xsJywgbW91bnRBdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGRlcGVuZGVuY3kgPT09ICd0b3BTY3JvbGwnKSB7XG5cbiAgICAgICAgICBpZiAoaXNFdmVudFN1cHBvcnRlZCgnc2Nyb2xsJywgdHJ1ZSkpIHtcbiAgICAgICAgICAgIFJlYWN0QnJvd3NlckV2ZW50RW1pdHRlci5SZWFjdEV2ZW50TGlzdGVuZXIudHJhcENhcHR1cmVkRXZlbnQoJ3RvcFNjcm9sbCcsICdzY3JvbGwnLCBtb3VudEF0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyLlJlYWN0RXZlbnRMaXN0ZW5lci50cmFwQnViYmxlZEV2ZW50KCd0b3BTY3JvbGwnLCAnc2Nyb2xsJywgUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyLlJlYWN0RXZlbnRMaXN0ZW5lci5XSU5ET1dfSEFORExFKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZGVwZW5kZW5jeSA9PT0gJ3RvcEZvY3VzJyB8fCBkZXBlbmRlbmN5ID09PSAndG9wQmx1cicpIHtcblxuICAgICAgICAgIGlmIChpc0V2ZW50U3VwcG9ydGVkKCdmb2N1cycsIHRydWUpKSB7XG4gICAgICAgICAgICBSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIuUmVhY3RFdmVudExpc3RlbmVyLnRyYXBDYXB0dXJlZEV2ZW50KCd0b3BGb2N1cycsICdmb2N1cycsIG1vdW50QXQpO1xuICAgICAgICAgICAgUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyLlJlYWN0RXZlbnRMaXN0ZW5lci50cmFwQ2FwdHVyZWRFdmVudCgndG9wQmx1cicsICdibHVyJywgbW91bnRBdCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc0V2ZW50U3VwcG9ydGVkKCdmb2N1c2luJykpIHtcbiAgICAgICAgICAgIC8vIElFIGhhcyBgZm9jdXNpbmAgYW5kIGBmb2N1c291dGAgZXZlbnRzIHdoaWNoIGJ1YmJsZS5cbiAgICAgICAgICAgIC8vIEBzZWUgaHR0cDovL3d3dy5xdWlya3Ntb2RlLm9yZy9ibG9nL2FyY2hpdmVzLzIwMDgvMDQvZGVsZWdhdGluZ190aGUuaHRtbFxuICAgICAgICAgICAgUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyLlJlYWN0RXZlbnRMaXN0ZW5lci50cmFwQnViYmxlZEV2ZW50KCd0b3BGb2N1cycsICdmb2N1c2luJywgbW91bnRBdCk7XG4gICAgICAgICAgICBSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIuUmVhY3RFdmVudExpc3RlbmVyLnRyYXBCdWJibGVkRXZlbnQoJ3RvcEJsdXInLCAnZm9jdXNvdXQnLCBtb3VudEF0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyB0byBtYWtlIHN1cmUgYmx1ciBhbmQgZm9jdXMgZXZlbnQgbGlzdGVuZXJzIGFyZSBvbmx5IGF0dGFjaGVkIG9uY2VcbiAgICAgICAgICBpc0xpc3RlbmluZy50b3BCbHVyID0gdHJ1ZTtcbiAgICAgICAgICBpc0xpc3RlbmluZy50b3BGb2N1cyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodG9wRXZlbnRNYXBwaW5nLmhhc093blByb3BlcnR5KGRlcGVuZGVuY3kpKSB7XG4gICAgICAgICAgUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyLlJlYWN0RXZlbnRMaXN0ZW5lci50cmFwQnViYmxlZEV2ZW50KGRlcGVuZGVuY3ksIHRvcEV2ZW50TWFwcGluZ1tkZXBlbmRlbmN5XSwgbW91bnRBdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpc0xpc3RlbmluZ1tkZXBlbmRlbmN5XSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHRyYXBCdWJibGVkRXZlbnQ6IGZ1bmN0aW9uICh0b3BMZXZlbFR5cGUsIGhhbmRsZXJCYXNlTmFtZSwgaGFuZGxlKSB7XG4gICAgcmV0dXJuIFJlYWN0QnJvd3NlckV2ZW50RW1pdHRlci5SZWFjdEV2ZW50TGlzdGVuZXIudHJhcEJ1YmJsZWRFdmVudCh0b3BMZXZlbFR5cGUsIGhhbmRsZXJCYXNlTmFtZSwgaGFuZGxlKTtcbiAgfSxcblxuICB0cmFwQ2FwdHVyZWRFdmVudDogZnVuY3Rpb24gKHRvcExldmVsVHlwZSwgaGFuZGxlckJhc2VOYW1lLCBoYW5kbGUpIHtcbiAgICByZXR1cm4gUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyLlJlYWN0RXZlbnRMaXN0ZW5lci50cmFwQ2FwdHVyZWRFdmVudCh0b3BMZXZlbFR5cGUsIGhhbmRsZXJCYXNlTmFtZSwgaGFuZGxlKTtcbiAgfSxcblxuICAvKipcbiAgICogUHJvdGVjdCBhZ2FpbnN0IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCkgcmV0dXJuaW5nIG51bGxcbiAgICogU29tZSBwb3B1cCBibG9ja2VyIGV4dGVuc2lvbnMgYXBwZWFyIHRvIGRvIHRoaXM6XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvNjg4N1xuICAgKi9cbiAgc3VwcG9ydHNFdmVudFBhZ2VYWTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcbiAgICByZXR1cm4gZXYgIT0gbnVsbCAmJiAncGFnZVgnIGluIGV2O1xuICB9LFxuXG4gIC8qKlxuICAgKiBMaXN0ZW5zIHRvIHdpbmRvdyBzY3JvbGwgYW5kIHJlc2l6ZSBldmVudHMuIFdlIGNhY2hlIHNjcm9sbCB2YWx1ZXMgc28gdGhhdFxuICAgKiBhcHBsaWNhdGlvbiBjb2RlIGNhbiBhY2Nlc3MgdGhlbSB3aXRob3V0IHRyaWdnZXJpbmcgcmVmbG93cy5cbiAgICpcbiAgICogVmlld3BvcnRNZXRyaWNzIGlzIG9ubHkgdXNlZCBieSBTeW50aGV0aWNNb3VzZS9Ub3VjaEV2ZW50IGFuZCBvbmx5IHdoZW5cbiAgICogcGFnZVgvcGFnZVkgaXNuJ3Qgc3VwcG9ydGVkIChsZWdhY3kgYnJvd3NlcnMpLlxuICAgKlxuICAgKiBOT1RFOiBTY3JvbGwgZXZlbnRzIGRvIG5vdCBidWJibGUuXG4gICAqXG4gICAqIEBzZWUgaHR0cDovL3d3dy5xdWlya3Ntb2RlLm9yZy9kb20vZXZlbnRzL3Njcm9sbC5odG1sXG4gICAqL1xuICBlbnN1cmVTY3JvbGxWYWx1ZU1vbml0b3Jpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoaGFzRXZlbnRQYWdlWFkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFzRXZlbnRQYWdlWFkgPSBSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIuc3VwcG9ydHNFdmVudFBhZ2VYWSgpO1xuICAgIH1cbiAgICBpZiAoIWhhc0V2ZW50UGFnZVhZICYmICFpc01vbml0b3JpbmdTY3JvbGxWYWx1ZSkge1xuICAgICAgdmFyIHJlZnJlc2ggPSBWaWV3cG9ydE1ldHJpY3MucmVmcmVzaFNjcm9sbFZhbHVlcztcbiAgICAgIFJlYWN0QnJvd3NlckV2ZW50RW1pdHRlci5SZWFjdEV2ZW50TGlzdGVuZXIubW9uaXRvclNjcm9sbFZhbHVlKHJlZnJlc2gpO1xuICAgICAgaXNNb25pdG9yaW5nU2Nyb2xsVmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXI7Il19