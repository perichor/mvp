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

var _prodInvariant = require('./reactProdInvariant');

var EventListener = require('fbjs/lib/EventListener');
var EventPropagators = require('./EventPropagators');
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
var SyntheticAnimationEvent = require('./SyntheticAnimationEvent');
var SyntheticClipboardEvent = require('./SyntheticClipboardEvent');
var SyntheticEvent = require('./SyntheticEvent');
var SyntheticFocusEvent = require('./SyntheticFocusEvent');
var SyntheticKeyboardEvent = require('./SyntheticKeyboardEvent');
var SyntheticMouseEvent = require('./SyntheticMouseEvent');
var SyntheticDragEvent = require('./SyntheticDragEvent');
var SyntheticTouchEvent = require('./SyntheticTouchEvent');
var SyntheticTransitionEvent = require('./SyntheticTransitionEvent');
var SyntheticUIEvent = require('./SyntheticUIEvent');
var SyntheticWheelEvent = require('./SyntheticWheelEvent');

var emptyFunction = require('fbjs/lib/emptyFunction');
var getEventCharCode = require('./getEventCharCode');
var invariant = require('fbjs/lib/invariant');

/**
 * Turns
 * ['abort', ...]
 * into
 * eventTypes = {
 *   'abort': {
 *     phasedRegistrationNames: {
 *       bubbled: 'onAbort',
 *       captured: 'onAbortCapture',
 *     },
 *     dependencies: ['topAbort'],
 *   },
 *   ...
 * };
 * topLevelEventsToDispatchConfig = {
 *   'topAbort': { sameConfig }
 * };
 */
var eventTypes = {};
var topLevelEventsToDispatchConfig = {};
['abort', 'animationEnd', 'animationIteration', 'animationStart', 'blur', 'canPlay', 'canPlayThrough', 'click', 'contextMenu', 'copy', 'cut', 'doubleClick', 'drag', 'dragEnd', 'dragEnter', 'dragExit', 'dragLeave', 'dragOver', 'dragStart', 'drop', 'durationChange', 'emptied', 'encrypted', 'ended', 'error', 'focus', 'input', 'invalid', 'keyDown', 'keyPress', 'keyUp', 'load', 'loadedData', 'loadedMetadata', 'loadStart', 'mouseDown', 'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'paste', 'pause', 'play', 'playing', 'progress', 'rateChange', 'reset', 'scroll', 'seeked', 'seeking', 'stalled', 'submit', 'suspend', 'timeUpdate', 'touchCancel', 'touchEnd', 'touchMove', 'touchStart', 'transitionEnd', 'volumeChange', 'waiting', 'wheel'].forEach(function (event) {
  var capitalizedEvent = event[0].toUpperCase() + event.slice(1);
  var onEvent = 'on' + capitalizedEvent;
  var topEvent = 'top' + capitalizedEvent;

  var type = {
    phasedRegistrationNames: {
      bubbled: onEvent,
      captured: onEvent + 'Capture'
    },
    dependencies: [topEvent]
  };
  eventTypes[event] = type;
  topLevelEventsToDispatchConfig[topEvent] = type;
});

var onClickListeners = {};

function getDictionaryKey(inst) {
  // Prevents V8 performance issue:
  // https://github.com/facebook/react/pull/7232
  return '.' + inst._rootNodeID;
}

function isInteractive(tag) {
  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
}

var SimpleEventPlugin = {

  eventTypes: eventTypes,

  extractEvents: function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
    if (!dispatchConfig) {
      return null;
    }
    var EventConstructor;
    switch (topLevelType) {
      case 'topAbort':
      case 'topCanPlay':
      case 'topCanPlayThrough':
      case 'topDurationChange':
      case 'topEmptied':
      case 'topEncrypted':
      case 'topEnded':
      case 'topError':
      case 'topInput':
      case 'topInvalid':
      case 'topLoad':
      case 'topLoadedData':
      case 'topLoadedMetadata':
      case 'topLoadStart':
      case 'topPause':
      case 'topPlay':
      case 'topPlaying':
      case 'topProgress':
      case 'topRateChange':
      case 'topReset':
      case 'topSeeked':
      case 'topSeeking':
      case 'topStalled':
      case 'topSubmit':
      case 'topSuspend':
      case 'topTimeUpdate':
      case 'topVolumeChange':
      case 'topWaiting':
        // HTML Events
        // @see http://www.w3.org/TR/html5/index.html#events-0
        EventConstructor = SyntheticEvent;
        break;
      case 'topKeyPress':
        // Firefox creates a keypress event for function keys too. This removes
        // the unwanted keypress events. Enter is however both printable and
        // non-printable. One would expect Tab to be as well (but it isn't).
        if (getEventCharCode(nativeEvent) === 0) {
          return null;
        }
      /* falls through */
      case 'topKeyDown':
      case 'topKeyUp':
        EventConstructor = SyntheticKeyboardEvent;
        break;
      case 'topBlur':
      case 'topFocus':
        EventConstructor = SyntheticFocusEvent;
        break;
      case 'topClick':
        // Firefox creates a click event on right mouse clicks. This removes the
        // unwanted click events.
        if (nativeEvent.button === 2) {
          return null;
        }
      /* falls through */
      case 'topDoubleClick':
      case 'topMouseDown':
      case 'topMouseMove':
      case 'topMouseUp':
      // TODO: Disabled elements should not respond to mouse events
      /* falls through */
      case 'topMouseOut':
      case 'topMouseOver':
      case 'topContextMenu':
        EventConstructor = SyntheticMouseEvent;
        break;
      case 'topDrag':
      case 'topDragEnd':
      case 'topDragEnter':
      case 'topDragExit':
      case 'topDragLeave':
      case 'topDragOver':
      case 'topDragStart':
      case 'topDrop':
        EventConstructor = SyntheticDragEvent;
        break;
      case 'topTouchCancel':
      case 'topTouchEnd':
      case 'topTouchMove':
      case 'topTouchStart':
        EventConstructor = SyntheticTouchEvent;
        break;
      case 'topAnimationEnd':
      case 'topAnimationIteration':
      case 'topAnimationStart':
        EventConstructor = SyntheticAnimationEvent;
        break;
      case 'topTransitionEnd':
        EventConstructor = SyntheticTransitionEvent;
        break;
      case 'topScroll':
        EventConstructor = SyntheticUIEvent;
        break;
      case 'topWheel':
        EventConstructor = SyntheticWheelEvent;
        break;
      case 'topCopy':
      case 'topCut':
      case 'topPaste':
        EventConstructor = SyntheticClipboardEvent;
        break;
    }
    !EventConstructor ? process.env.NODE_ENV !== 'production' ? invariant(false, 'SimpleEventPlugin: Unhandled event type, `%s`.', topLevelType) : _prodInvariant('86', topLevelType) : void 0;
    var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  },

  didPutListener: function didPutListener(inst, registrationName, listener) {
    // Mobile Safari does not fire properly bubble click events on
    // non-interactive elements, which means delegated click listeners do not
    // fire. The workaround for this bug involves attaching an empty click
    // listener on the target node.
    // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
    if (registrationName === 'onClick' && !isInteractive(inst._tag)) {
      var key = getDictionaryKey(inst);
      var node = ReactDOMComponentTree.getNodeFromInstance(inst);
      if (!onClickListeners[key]) {
        onClickListeners[key] = EventListener.listen(node, 'click', emptyFunction);
      }
    }
  },

  willDeleteListener: function willDeleteListener(inst, registrationName) {
    if (registrationName === 'onClick' && !isInteractive(inst._tag)) {
      var key = getDictionaryKey(inst);
      onClickListeners[key].remove();
      delete onClickListeners[key];
    }
  }

};

module.exports = SimpleEventPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9TaW1wbGVFdmVudFBsdWdpbi5qcyJdLCJuYW1lcyI6WyJfcHJvZEludmFyaWFudCIsInJlcXVpcmUiLCJFdmVudExpc3RlbmVyIiwiRXZlbnRQcm9wYWdhdG9ycyIsIlJlYWN0RE9NQ29tcG9uZW50VHJlZSIsIlN5bnRoZXRpY0FuaW1hdGlvbkV2ZW50IiwiU3ludGhldGljQ2xpcGJvYXJkRXZlbnQiLCJTeW50aGV0aWNFdmVudCIsIlN5bnRoZXRpY0ZvY3VzRXZlbnQiLCJTeW50aGV0aWNLZXlib2FyZEV2ZW50IiwiU3ludGhldGljTW91c2VFdmVudCIsIlN5bnRoZXRpY0RyYWdFdmVudCIsIlN5bnRoZXRpY1RvdWNoRXZlbnQiLCJTeW50aGV0aWNUcmFuc2l0aW9uRXZlbnQiLCJTeW50aGV0aWNVSUV2ZW50IiwiU3ludGhldGljV2hlZWxFdmVudCIsImVtcHR5RnVuY3Rpb24iLCJnZXRFdmVudENoYXJDb2RlIiwiaW52YXJpYW50IiwiZXZlbnRUeXBlcyIsInRvcExldmVsRXZlbnRzVG9EaXNwYXRjaENvbmZpZyIsImZvckVhY2giLCJldmVudCIsImNhcGl0YWxpemVkRXZlbnQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwib25FdmVudCIsInRvcEV2ZW50IiwidHlwZSIsInBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzIiwiYnViYmxlZCIsImNhcHR1cmVkIiwiZGVwZW5kZW5jaWVzIiwib25DbGlja0xpc3RlbmVycyIsImdldERpY3Rpb25hcnlLZXkiLCJpbnN0IiwiX3Jvb3ROb2RlSUQiLCJpc0ludGVyYWN0aXZlIiwidGFnIiwiU2ltcGxlRXZlbnRQbHVnaW4iLCJleHRyYWN0RXZlbnRzIiwidG9wTGV2ZWxUeXBlIiwidGFyZ2V0SW5zdCIsIm5hdGl2ZUV2ZW50IiwibmF0aXZlRXZlbnRUYXJnZXQiLCJkaXNwYXRjaENvbmZpZyIsIkV2ZW50Q29uc3RydWN0b3IiLCJidXR0b24iLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJnZXRQb29sZWQiLCJhY2N1bXVsYXRlVHdvUGhhc2VEaXNwYXRjaGVzIiwiZGlkUHV0TGlzdGVuZXIiLCJyZWdpc3RyYXRpb25OYW1lIiwibGlzdGVuZXIiLCJfdGFnIiwia2V5Iiwibm9kZSIsImdldE5vZGVGcm9tSW5zdGFuY2UiLCJsaXN0ZW4iLCJ3aWxsRGVsZXRlTGlzdGVuZXIiLCJyZW1vdmUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQSxJQUFJQSxpQkFBaUJDLFFBQVEsc0JBQVIsQ0FBckI7O0FBRUEsSUFBSUMsZ0JBQWdCRCxRQUFRLHdCQUFSLENBQXBCO0FBQ0EsSUFBSUUsbUJBQW1CRixRQUFRLG9CQUFSLENBQXZCO0FBQ0EsSUFBSUcsd0JBQXdCSCxRQUFRLHlCQUFSLENBQTVCO0FBQ0EsSUFBSUksMEJBQTBCSixRQUFRLDJCQUFSLENBQTlCO0FBQ0EsSUFBSUssMEJBQTBCTCxRQUFRLDJCQUFSLENBQTlCO0FBQ0EsSUFBSU0saUJBQWlCTixRQUFRLGtCQUFSLENBQXJCO0FBQ0EsSUFBSU8sc0JBQXNCUCxRQUFRLHVCQUFSLENBQTFCO0FBQ0EsSUFBSVEseUJBQXlCUixRQUFRLDBCQUFSLENBQTdCO0FBQ0EsSUFBSVMsc0JBQXNCVCxRQUFRLHVCQUFSLENBQTFCO0FBQ0EsSUFBSVUscUJBQXFCVixRQUFRLHNCQUFSLENBQXpCO0FBQ0EsSUFBSVcsc0JBQXNCWCxRQUFRLHVCQUFSLENBQTFCO0FBQ0EsSUFBSVksMkJBQTJCWixRQUFRLDRCQUFSLENBQS9CO0FBQ0EsSUFBSWEsbUJBQW1CYixRQUFRLG9CQUFSLENBQXZCO0FBQ0EsSUFBSWMsc0JBQXNCZCxRQUFRLHVCQUFSLENBQTFCOztBQUVBLElBQUllLGdCQUFnQmYsUUFBUSx3QkFBUixDQUFwQjtBQUNBLElBQUlnQixtQkFBbUJoQixRQUFRLG9CQUFSLENBQXZCO0FBQ0EsSUFBSWlCLFlBQVlqQixRQUFRLG9CQUFSLENBQWhC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LE1BQU12QixpQkFBaUJDLElBQWpCLENBQVY7QUFDQSxVQUFJdUIsT0FBT3RELHNCQUFzQnVELG1CQUF0QixDQUEwQ3hCLElBQTFDLENBQVg7QUFDQSxVQUFJLENBQUNGLGlCQUFpQndCLEdBQWpCLENBQUwsRUFBNEI7QUFDMUJ4Qix5QkFBaUJ3QixHQUFqQixJQUF3QnZELGNBQWMwRCxNQUFkLENBQXFCRixJQUFyQixFQUEyQixPQUEzQixFQUFvQzFDLGFBQXBDLENBQXhCO0FBQ0Q7QUFDRjtBQUNGLEdBcElxQjs7QUFzSXRCNkMsc0JBQW9CLDRCQUFVMUIsSUFBVixFQUFnQm1CLGdCQUFoQixFQUFrQztBQUNwRCxRQUFJQSxxQkFBcUIsU0FBckIsSUFBa0MsQ0FBQ2pCLGNBQWNGLEtBQUtxQixJQUFuQixDQUF2QyxFQUFpRTtBQUMvRCxVQUFJQyxNQUFNdkIsaUJBQWlCQyxJQUFqQixDQUFWO0FBQ0FGLHVCQUFpQndCLEdBQWpCLEVBQXNCSyxNQUF0QjtBQUNBLGFBQU83QixpQkFBaUJ3QixHQUFqQixDQUFQO0FBQ0Q7QUFDRjs7QUE1SXFCLENBQXhCOztBQWdKQU0sT0FBT0MsT0FBUCxHQUFpQnpCLGlCQUFqQiIsImZpbGUiOiJTaW1wbGVFdmVudFBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIEV2ZW50TGlzdGVuZXIgPSByZXF1aXJlKCdmYmpzL2xpYi9FdmVudExpc3RlbmVyJyk7XG52YXIgRXZlbnRQcm9wYWdhdG9ycyA9IHJlcXVpcmUoJy4vRXZlbnRQcm9wYWdhdG9ycycpO1xudmFyIFJlYWN0RE9NQ29tcG9uZW50VHJlZSA9IHJlcXVpcmUoJy4vUmVhY3RET01Db21wb25lbnRUcmVlJyk7XG52YXIgU3ludGhldGljQW5pbWF0aW9uRXZlbnQgPSByZXF1aXJlKCcuL1N5bnRoZXRpY0FuaW1hdGlvbkV2ZW50Jyk7XG52YXIgU3ludGhldGljQ2xpcGJvYXJkRXZlbnQgPSByZXF1aXJlKCcuL1N5bnRoZXRpY0NsaXBib2FyZEV2ZW50Jyk7XG52YXIgU3ludGhldGljRXZlbnQgPSByZXF1aXJlKCcuL1N5bnRoZXRpY0V2ZW50Jyk7XG52YXIgU3ludGhldGljRm9jdXNFdmVudCA9IHJlcXVpcmUoJy4vU3ludGhldGljRm9jdXNFdmVudCcpO1xudmFyIFN5bnRoZXRpY0tleWJvYXJkRXZlbnQgPSByZXF1aXJlKCcuL1N5bnRoZXRpY0tleWJvYXJkRXZlbnQnKTtcbnZhciBTeW50aGV0aWNNb3VzZUV2ZW50ID0gcmVxdWlyZSgnLi9TeW50aGV0aWNNb3VzZUV2ZW50Jyk7XG52YXIgU3ludGhldGljRHJhZ0V2ZW50ID0gcmVxdWlyZSgnLi9TeW50aGV0aWNEcmFnRXZlbnQnKTtcbnZhciBTeW50aGV0aWNUb3VjaEV2ZW50ID0gcmVxdWlyZSgnLi9TeW50aGV0aWNUb3VjaEV2ZW50Jyk7XG52YXIgU3ludGhldGljVHJhbnNpdGlvbkV2ZW50ID0gcmVxdWlyZSgnLi9TeW50aGV0aWNUcmFuc2l0aW9uRXZlbnQnKTtcbnZhciBTeW50aGV0aWNVSUV2ZW50ID0gcmVxdWlyZSgnLi9TeW50aGV0aWNVSUV2ZW50Jyk7XG52YXIgU3ludGhldGljV2hlZWxFdmVudCA9IHJlcXVpcmUoJy4vU3ludGhldGljV2hlZWxFdmVudCcpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBnZXRFdmVudENoYXJDb2RlID0gcmVxdWlyZSgnLi9nZXRFdmVudENoYXJDb2RlJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogVHVybnNcbiAqIFsnYWJvcnQnLCAuLi5dXG4gKiBpbnRvXG4gKiBldmVudFR5cGVzID0ge1xuICogICAnYWJvcnQnOiB7XG4gKiAgICAgcGhhc2VkUmVnaXN0cmF0aW9uTmFtZXM6IHtcbiAqICAgICAgIGJ1YmJsZWQ6ICdvbkFib3J0JyxcbiAqICAgICAgIGNhcHR1cmVkOiAnb25BYm9ydENhcHR1cmUnLFxuICogICAgIH0sXG4gKiAgICAgZGVwZW5kZW5jaWVzOiBbJ3RvcEFib3J0J10sXG4gKiAgIH0sXG4gKiAgIC4uLlxuICogfTtcbiAqIHRvcExldmVsRXZlbnRzVG9EaXNwYXRjaENvbmZpZyA9IHtcbiAqICAgJ3RvcEFib3J0JzogeyBzYW1lQ29uZmlnIH1cbiAqIH07XG4gKi9cbnZhciBldmVudFR5cGVzID0ge307XG52YXIgdG9wTGV2ZWxFdmVudHNUb0Rpc3BhdGNoQ29uZmlnID0ge307XG5bJ2Fib3J0JywgJ2FuaW1hdGlvbkVuZCcsICdhbmltYXRpb25JdGVyYXRpb24nLCAnYW5pbWF0aW9uU3RhcnQnLCAnYmx1cicsICdjYW5QbGF5JywgJ2NhblBsYXlUaHJvdWdoJywgJ2NsaWNrJywgJ2NvbnRleHRNZW51JywgJ2NvcHknLCAnY3V0JywgJ2RvdWJsZUNsaWNrJywgJ2RyYWcnLCAnZHJhZ0VuZCcsICdkcmFnRW50ZXInLCAnZHJhZ0V4aXQnLCAnZHJhZ0xlYXZlJywgJ2RyYWdPdmVyJywgJ2RyYWdTdGFydCcsICdkcm9wJywgJ2R1cmF0aW9uQ2hhbmdlJywgJ2VtcHRpZWQnLCAnZW5jcnlwdGVkJywgJ2VuZGVkJywgJ2Vycm9yJywgJ2ZvY3VzJywgJ2lucHV0JywgJ2ludmFsaWQnLCAna2V5RG93bicsICdrZXlQcmVzcycsICdrZXlVcCcsICdsb2FkJywgJ2xvYWRlZERhdGEnLCAnbG9hZGVkTWV0YWRhdGEnLCAnbG9hZFN0YXJ0JywgJ21vdXNlRG93bicsICdtb3VzZU1vdmUnLCAnbW91c2VPdXQnLCAnbW91c2VPdmVyJywgJ21vdXNlVXAnLCAncGFzdGUnLCAncGF1c2UnLCAncGxheScsICdwbGF5aW5nJywgJ3Byb2dyZXNzJywgJ3JhdGVDaGFuZ2UnLCAncmVzZXQnLCAnc2Nyb2xsJywgJ3NlZWtlZCcsICdzZWVraW5nJywgJ3N0YWxsZWQnLCAnc3VibWl0JywgJ3N1c3BlbmQnLCAndGltZVVwZGF0ZScsICd0b3VjaENhbmNlbCcsICd0b3VjaEVuZCcsICd0b3VjaE1vdmUnLCAndG91Y2hTdGFydCcsICd0cmFuc2l0aW9uRW5kJywgJ3ZvbHVtZUNoYW5nZScsICd3YWl0aW5nJywgJ3doZWVsJ10uZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdmFyIGNhcGl0YWxpemVkRXZlbnQgPSBldmVudFswXS50b1VwcGVyQ2FzZSgpICsgZXZlbnQuc2xpY2UoMSk7XG4gIHZhciBvbkV2ZW50ID0gJ29uJyArIGNhcGl0YWxpemVkRXZlbnQ7XG4gIHZhciB0b3BFdmVudCA9ICd0b3AnICsgY2FwaXRhbGl6ZWRFdmVudDtcblxuICB2YXIgdHlwZSA9IHtcbiAgICBwaGFzZWRSZWdpc3RyYXRpb25OYW1lczoge1xuICAgICAgYnViYmxlZDogb25FdmVudCxcbiAgICAgIGNhcHR1cmVkOiBvbkV2ZW50ICsgJ0NhcHR1cmUnXG4gICAgfSxcbiAgICBkZXBlbmRlbmNpZXM6IFt0b3BFdmVudF1cbiAgfTtcbiAgZXZlbnRUeXBlc1tldmVudF0gPSB0eXBlO1xuICB0b3BMZXZlbEV2ZW50c1RvRGlzcGF0Y2hDb25maWdbdG9wRXZlbnRdID0gdHlwZTtcbn0pO1xuXG52YXIgb25DbGlja0xpc3RlbmVycyA9IHt9O1xuXG5mdW5jdGlvbiBnZXREaWN0aW9uYXJ5S2V5KGluc3QpIHtcbiAgLy8gUHJldmVudHMgVjggcGVyZm9ybWFuY2UgaXNzdWU6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzcyMzJcbiAgcmV0dXJuICcuJyArIGluc3QuX3Jvb3ROb2RlSUQ7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZXJhY3RpdmUodGFnKSB7XG4gIHJldHVybiB0YWcgPT09ICdidXR0b24nIHx8IHRhZyA9PT0gJ2lucHV0JyB8fCB0YWcgPT09ICdzZWxlY3QnIHx8IHRhZyA9PT0gJ3RleHRhcmVhJztcbn1cblxudmFyIFNpbXBsZUV2ZW50UGx1Z2luID0ge1xuXG4gIGV2ZW50VHlwZXM6IGV2ZW50VHlwZXMsXG5cbiAgZXh0cmFjdEV2ZW50czogZnVuY3Rpb24gKHRvcExldmVsVHlwZSwgdGFyZ2V0SW5zdCwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KSB7XG4gICAgdmFyIGRpc3BhdGNoQ29uZmlnID0gdG9wTGV2ZWxFdmVudHNUb0Rpc3BhdGNoQ29uZmlnW3RvcExldmVsVHlwZV07XG4gICAgaWYgKCFkaXNwYXRjaENvbmZpZykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBFdmVudENvbnN0cnVjdG9yO1xuICAgIHN3aXRjaCAodG9wTGV2ZWxUeXBlKSB7XG4gICAgICBjYXNlICd0b3BBYm9ydCc6XG4gICAgICBjYXNlICd0b3BDYW5QbGF5JzpcbiAgICAgIGNhc2UgJ3RvcENhblBsYXlUaHJvdWdoJzpcbiAgICAgIGNhc2UgJ3RvcER1cmF0aW9uQ2hhbmdlJzpcbiAgICAgIGNhc2UgJ3RvcEVtcHRpZWQnOlxuICAgICAgY2FzZSAndG9wRW5jcnlwdGVkJzpcbiAgICAgIGNhc2UgJ3RvcEVuZGVkJzpcbiAgICAgIGNhc2UgJ3RvcEVycm9yJzpcbiAgICAgIGNhc2UgJ3RvcElucHV0JzpcbiAgICAgIGNhc2UgJ3RvcEludmFsaWQnOlxuICAgICAgY2FzZSAndG9wTG9hZCc6XG4gICAgICBjYXNlICd0b3BMb2FkZWREYXRhJzpcbiAgICAgIGNhc2UgJ3RvcExvYWRlZE1ldGFkYXRhJzpcbiAgICAgIGNhc2UgJ3RvcExvYWRTdGFydCc6XG4gICAgICBjYXNlICd0b3BQYXVzZSc6XG4gICAgICBjYXNlICd0b3BQbGF5JzpcbiAgICAgIGNhc2UgJ3RvcFBsYXlpbmcnOlxuICAgICAgY2FzZSAndG9wUHJvZ3Jlc3MnOlxuICAgICAgY2FzZSAndG9wUmF0ZUNoYW5nZSc6XG4gICAgICBjYXNlICd0b3BSZXNldCc6XG4gICAgICBjYXNlICd0b3BTZWVrZWQnOlxuICAgICAgY2FzZSAndG9wU2Vla2luZyc6XG4gICAgICBjYXNlICd0b3BTdGFsbGVkJzpcbiAgICAgIGNhc2UgJ3RvcFN1Ym1pdCc6XG4gICAgICBjYXNlICd0b3BTdXNwZW5kJzpcbiAgICAgIGNhc2UgJ3RvcFRpbWVVcGRhdGUnOlxuICAgICAgY2FzZSAndG9wVm9sdW1lQ2hhbmdlJzpcbiAgICAgIGNhc2UgJ3RvcFdhaXRpbmcnOlxuICAgICAgICAvLyBIVE1MIEV2ZW50c1xuICAgICAgICAvLyBAc2VlIGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L2luZGV4Lmh0bWwjZXZlbnRzLTBcbiAgICAgICAgRXZlbnRDb25zdHJ1Y3RvciA9IFN5bnRoZXRpY0V2ZW50O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcEtleVByZXNzJzpcbiAgICAgICAgLy8gRmlyZWZveCBjcmVhdGVzIGEga2V5cHJlc3MgZXZlbnQgZm9yIGZ1bmN0aW9uIGtleXMgdG9vLiBUaGlzIHJlbW92ZXNcbiAgICAgICAgLy8gdGhlIHVud2FudGVkIGtleXByZXNzIGV2ZW50cy4gRW50ZXIgaXMgaG93ZXZlciBib3RoIHByaW50YWJsZSBhbmRcbiAgICAgICAgLy8gbm9uLXByaW50YWJsZS4gT25lIHdvdWxkIGV4cGVjdCBUYWIgdG8gYmUgYXMgd2VsbCAoYnV0IGl0IGlzbid0KS5cbiAgICAgICAgaWYgKGdldEV2ZW50Q2hhckNvZGUobmF0aXZlRXZlbnQpID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgJ3RvcEtleURvd24nOlxuICAgICAgY2FzZSAndG9wS2V5VXAnOlxuICAgICAgICBFdmVudENvbnN0cnVjdG9yID0gU3ludGhldGljS2V5Ym9hcmRFdmVudDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b3BCbHVyJzpcbiAgICAgIGNhc2UgJ3RvcEZvY3VzJzpcbiAgICAgICAgRXZlbnRDb25zdHJ1Y3RvciA9IFN5bnRoZXRpY0ZvY3VzRXZlbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wQ2xpY2snOlxuICAgICAgICAvLyBGaXJlZm94IGNyZWF0ZXMgYSBjbGljayBldmVudCBvbiByaWdodCBtb3VzZSBjbGlja3MuIFRoaXMgcmVtb3ZlcyB0aGVcbiAgICAgICAgLy8gdW53YW50ZWQgY2xpY2sgZXZlbnRzLlxuICAgICAgICBpZiAobmF0aXZlRXZlbnQuYnV0dG9uID09PSAyKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgJ3RvcERvdWJsZUNsaWNrJzpcbiAgICAgIGNhc2UgJ3RvcE1vdXNlRG93bic6XG4gICAgICBjYXNlICd0b3BNb3VzZU1vdmUnOlxuICAgICAgY2FzZSAndG9wTW91c2VVcCc6XG4gICAgICAvLyBUT0RPOiBEaXNhYmxlZCBlbGVtZW50cyBzaG91bGQgbm90IHJlc3BvbmQgdG8gbW91c2UgZXZlbnRzXG4gICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlICd0b3BNb3VzZU91dCc6XG4gICAgICBjYXNlICd0b3BNb3VzZU92ZXInOlxuICAgICAgY2FzZSAndG9wQ29udGV4dE1lbnUnOlxuICAgICAgICBFdmVudENvbnN0cnVjdG9yID0gU3ludGhldGljTW91c2VFdmVudDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b3BEcmFnJzpcbiAgICAgIGNhc2UgJ3RvcERyYWdFbmQnOlxuICAgICAgY2FzZSAndG9wRHJhZ0VudGVyJzpcbiAgICAgIGNhc2UgJ3RvcERyYWdFeGl0JzpcbiAgICAgIGNhc2UgJ3RvcERyYWdMZWF2ZSc6XG4gICAgICBjYXNlICd0b3BEcmFnT3Zlcic6XG4gICAgICBjYXNlICd0b3BEcmFnU3RhcnQnOlxuICAgICAgY2FzZSAndG9wRHJvcCc6XG4gICAgICAgIEV2ZW50Q29uc3RydWN0b3IgPSBTeW50aGV0aWNEcmFnRXZlbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wVG91Y2hDYW5jZWwnOlxuICAgICAgY2FzZSAndG9wVG91Y2hFbmQnOlxuICAgICAgY2FzZSAndG9wVG91Y2hNb3ZlJzpcbiAgICAgIGNhc2UgJ3RvcFRvdWNoU3RhcnQnOlxuICAgICAgICBFdmVudENvbnN0cnVjdG9yID0gU3ludGhldGljVG91Y2hFdmVudDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b3BBbmltYXRpb25FbmQnOlxuICAgICAgY2FzZSAndG9wQW5pbWF0aW9uSXRlcmF0aW9uJzpcbiAgICAgIGNhc2UgJ3RvcEFuaW1hdGlvblN0YXJ0JzpcbiAgICAgICAgRXZlbnRDb25zdHJ1Y3RvciA9IFN5bnRoZXRpY0FuaW1hdGlvbkV2ZW50O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcFRyYW5zaXRpb25FbmQnOlxuICAgICAgICBFdmVudENvbnN0cnVjdG9yID0gU3ludGhldGljVHJhbnNpdGlvbkV2ZW50O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcFNjcm9sbCc6XG4gICAgICAgIEV2ZW50Q29uc3RydWN0b3IgPSBTeW50aGV0aWNVSUV2ZW50O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcFdoZWVsJzpcbiAgICAgICAgRXZlbnRDb25zdHJ1Y3RvciA9IFN5bnRoZXRpY1doZWVsRXZlbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wQ29weSc6XG4gICAgICBjYXNlICd0b3BDdXQnOlxuICAgICAgY2FzZSAndG9wUGFzdGUnOlxuICAgICAgICBFdmVudENvbnN0cnVjdG9yID0gU3ludGhldGljQ2xpcGJvYXJkRXZlbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAhRXZlbnRDb25zdHJ1Y3RvciA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdTaW1wbGVFdmVudFBsdWdpbjogVW5oYW5kbGVkIGV2ZW50IHR5cGUsIGAlc2AuJywgdG9wTGV2ZWxUeXBlKSA6IF9wcm9kSW52YXJpYW50KCc4NicsIHRvcExldmVsVHlwZSkgOiB2b2lkIDA7XG4gICAgdmFyIGV2ZW50ID0gRXZlbnRDb25zdHJ1Y3Rvci5nZXRQb29sZWQoZGlzcGF0Y2hDb25maWcsIHRhcmdldEluc3QsIG5hdGl2ZUV2ZW50LCBuYXRpdmVFdmVudFRhcmdldCk7XG4gICAgRXZlbnRQcm9wYWdhdG9ycy5hY2N1bXVsYXRlVHdvUGhhc2VEaXNwYXRjaGVzKGV2ZW50KTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH0sXG5cbiAgZGlkUHV0TGlzdGVuZXI6IGZ1bmN0aW9uIChpbnN0LCByZWdpc3RyYXRpb25OYW1lLCBsaXN0ZW5lcikge1xuICAgIC8vIE1vYmlsZSBTYWZhcmkgZG9lcyBub3QgZmlyZSBwcm9wZXJseSBidWJibGUgY2xpY2sgZXZlbnRzIG9uXG4gICAgLy8gbm9uLWludGVyYWN0aXZlIGVsZW1lbnRzLCB3aGljaCBtZWFucyBkZWxlZ2F0ZWQgY2xpY2sgbGlzdGVuZXJzIGRvIG5vdFxuICAgIC8vIGZpcmUuIFRoZSB3b3JrYXJvdW5kIGZvciB0aGlzIGJ1ZyBpbnZvbHZlcyBhdHRhY2hpbmcgYW4gZW1wdHkgY2xpY2tcbiAgICAvLyBsaXN0ZW5lciBvbiB0aGUgdGFyZ2V0IG5vZGUuXG4gICAgLy8gaHR0cDovL3d3dy5xdWlya3Ntb2RlLm9yZy9ibG9nL2FyY2hpdmVzLzIwMTAvMDkvY2xpY2tfZXZlbnRfZGVsLmh0bWxcbiAgICBpZiAocmVnaXN0cmF0aW9uTmFtZSA9PT0gJ29uQ2xpY2snICYmICFpc0ludGVyYWN0aXZlKGluc3QuX3RhZykpIHtcbiAgICAgIHZhciBrZXkgPSBnZXREaWN0aW9uYXJ5S2V5KGluc3QpO1xuICAgICAgdmFyIG5vZGUgPSBSZWFjdERPTUNvbXBvbmVudFRyZWUuZ2V0Tm9kZUZyb21JbnN0YW5jZShpbnN0KTtcbiAgICAgIGlmICghb25DbGlja0xpc3RlbmVyc1trZXldKSB7XG4gICAgICAgIG9uQ2xpY2tMaXN0ZW5lcnNba2V5XSA9IEV2ZW50TGlzdGVuZXIubGlzdGVuKG5vZGUsICdjbGljaycsIGVtcHR5RnVuY3Rpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB3aWxsRGVsZXRlTGlzdGVuZXI6IGZ1bmN0aW9uIChpbnN0LCByZWdpc3RyYXRpb25OYW1lKSB7XG4gICAgaWYgKHJlZ2lzdHJhdGlvbk5hbWUgPT09ICdvbkNsaWNrJyAmJiAhaXNJbnRlcmFjdGl2ZShpbnN0Ll90YWcpKSB7XG4gICAgICB2YXIga2V5ID0gZ2V0RGljdGlvbmFyeUtleShpbnN0KTtcbiAgICAgIG9uQ2xpY2tMaXN0ZW5lcnNba2V5XS5yZW1vdmUoKTtcbiAgICAgIGRlbGV0ZSBvbkNsaWNrTGlzdGVuZXJzW2tleV07XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2ltcGxlRXZlbnRQbHVnaW47Il19