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

var EventPluginUtils = require('./EventPluginUtils');
var EventPropagators = require('./EventPropagators');
var ResponderSyntheticEvent = require('./ResponderSyntheticEvent');
var ResponderTouchHistoryStore = require('./ResponderTouchHistoryStore');

var accumulate = require('./accumulate');

var isStartish = EventPluginUtils.isStartish;
var isMoveish = EventPluginUtils.isMoveish;
var isEndish = EventPluginUtils.isEndish;
var executeDirectDispatch = EventPluginUtils.executeDirectDispatch;
var hasDispatches = EventPluginUtils.hasDispatches;
var executeDispatchesInOrderStopAtTrue = EventPluginUtils.executeDispatchesInOrderStopAtTrue;

/**
 * Instance of element that should respond to touch/move types of interactions,
 * as indicated explicitly by relevant callbacks.
 */
var responderInst = null;

/**
 * Count of current touches. A textInput should become responder iff the
 * selection changes while there is a touch on the screen.
 */
var trackedTouchCount = 0;

/**
 * Last reported number of active touches.
 */
var previousActiveTouches = 0;

var changeResponder = function changeResponder(nextResponderInst, blockHostResponder) {
  var oldResponderInst = responderInst;
  responderInst = nextResponderInst;
  if (ResponderEventPlugin.GlobalResponderHandler !== null) {
    ResponderEventPlugin.GlobalResponderHandler.onChange(oldResponderInst, nextResponderInst, blockHostResponder);
  }
};

var eventTypes = {
  /**
   * On a `touchStart`/`mouseDown`, is it desired that this element become the
   * responder?
   */
  startShouldSetResponder: {
    phasedRegistrationNames: {
      bubbled: 'onStartShouldSetResponder',
      captured: 'onStartShouldSetResponderCapture'
    }
  },

  /**
   * On a `scroll`, is it desired that this element become the responder? This
   * is usually not needed, but should be used to retroactively infer that a
   * `touchStart` had occurred during momentum scroll. During a momentum scroll,
   * a touch start will be immediately followed by a scroll event if the view is
   * currently scrolling.
   *
   * TODO: This shouldn't bubble.
   */
  scrollShouldSetResponder: {
    phasedRegistrationNames: {
      bubbled: 'onScrollShouldSetResponder',
      captured: 'onScrollShouldSetResponderCapture'
    }
  },

  /**
   * On text selection change, should this element become the responder? This
   * is needed for text inputs or other views with native selection, so the
   * JS view can claim the responder.
   *
   * TODO: This shouldn't bubble.
   */
  selectionChangeShouldSetResponder: {
    phasedRegistrationNames: {
      bubbled: 'onSelectionChangeShouldSetResponder',
      captured: 'onSelectionChangeShouldSetResponderCapture'
    }
  },

  /**
   * On a `touchMove`/`mouseMove`, is it desired that this element become the
   * responder?
   */
  moveShouldSetResponder: {
    phasedRegistrationNames: {
      bubbled: 'onMoveShouldSetResponder',
      captured: 'onMoveShouldSetResponderCapture'
    }
  },

  /**
   * Direct responder events dispatched directly to responder. Do not bubble.
   */
  responderStart: { registrationName: 'onResponderStart' },
  responderMove: { registrationName: 'onResponderMove' },
  responderEnd: { registrationName: 'onResponderEnd' },
  responderRelease: { registrationName: 'onResponderRelease' },
  responderTerminationRequest: {
    registrationName: 'onResponderTerminationRequest'
  },
  responderGrant: { registrationName: 'onResponderGrant' },
  responderReject: { registrationName: 'onResponderReject' },
  responderTerminate: { registrationName: 'onResponderTerminate' }
};

/**
 *
 * Responder System:
 * ----------------
 *
 * - A global, solitary "interaction lock" on a view.
 * - If a node becomes the responder, it should convey visual feedback
 *   immediately to indicate so, either by highlighting or moving accordingly.
 * - To be the responder means, that touches are exclusively important to that
 *   responder view, and no other view.
 * - While touches are still occurring, the responder lock can be transferred to
 *   a new view, but only to increasingly "higher" views (meaning ancestors of
 *   the current responder).
 *
 * Responder being granted:
 * ------------------------
 *
 * - Touch starts, moves, and scrolls can cause an ID to become the responder.
 * - We capture/bubble `startShouldSetResponder`/`moveShouldSetResponder` to
 *   the "appropriate place".
 * - If nothing is currently the responder, the "appropriate place" is the
 *   initiating event's `targetID`.
 * - If something *is* already the responder, the "appropriate place" is the
 *   first common ancestor of the event target and the current `responderInst`.
 * - Some negotiation happens: See the timing diagram below.
 * - Scrolled views automatically become responder. The reasoning is that a
 *   platform scroll view that isn't built on top of the responder system has
 *   began scrolling, and the active responder must now be notified that the
 *   interaction is no longer locked to it - the system has taken over.
 *
 * - Responder being released:
 *   As soon as no more touches that *started* inside of descendants of the
 *   *current* responderInst, an `onResponderRelease` event is dispatched to the
 *   current responder, and the responder lock is released.
 *
 * TODO:
 * - on "end", a callback hook for `onResponderEndShouldRemainResponder` that
 *   determines if the responder lock should remain.
 * - If a view shouldn't "remain" the responder, any active touches should by
 *   default be considered "dead" and do not influence future negotiations or
 *   bubble paths. It should be as if those touches do not exist.
 * -- For multitouch: Usually a translate-z will choose to "remain" responder
 *  after one out of many touches ended. For translate-y, usually the view
 *  doesn't wish to "remain" responder after one of many touches end.
 * - Consider building this on top of a `stopPropagation` model similar to
 *   `W3C` events.
 * - Ensure that `onResponderTerminate` is called on touch cancels, whether or
 *   not `onResponderTerminationRequest` returns `true` or `false`.
 *
 */

/*                                             Negotiation Performed
                                             +-----------------------+
                                            /                         \
Process low level events to    +     Current Responder      +   wantsResponderID
determine who to perform negot-|   (if any exists at all)   |
iation/transition              | Otherwise just pass through|
-------------------------------+----------------------------+------------------+
Bubble to find first ID        |                            |
to return true:wantsResponderID|                            |
                               |                            |
     +-------------+           |                            |
     | onTouchStart|           |                            |
     +------+------+     none  |                            |
            |            return|                            |
+-----------v-------------+true| +------------------------+ |
|onStartShouldSetResponder|----->|onResponderStart (cur)  |<-----------+
+-----------+-------------+    | +------------------------+ |          |
            |                  |                            | +--------+-------+
            | returned true for|       false:REJECT +-------->|onResponderReject
            | wantsResponderID |                    |       | +----------------+
            | (now attempt     | +------------------+-----+ |
            |  handoff)        | |   onResponder          | |
            +------------------->|      TerminationRequest| |
                               | +------------------+-----+ |
                               |                    |       | +----------------+
                               |         true:GRANT +-------->|onResponderGrant|
                               |                            | +--------+-------+
                               | +------------------------+ |          |
                               | |   onResponderTerminate |<-----------+
                               | +------------------+-----+ |
                               |                    |       | +----------------+
                               |                    +-------->|onResponderStart|
                               |                            | +----------------+
Bubble to find first ID        |                            |
to return true:wantsResponderID|                            |
                               |                            |
     +-------------+           |                            |
     | onTouchMove |           |                            |
     +------+------+     none  |                            |
            |            return|                            |
+-----------v-------------+true| +------------------------+ |
|onMoveShouldSetResponder |----->|onResponderMove (cur)   |<-----------+
+-----------+-------------+    | +------------------------+ |          |
            |                  |                            | +--------+-------+
            | returned true for|       false:REJECT +-------->|onResponderRejec|
            | wantsResponderID |                    |       | +----------------+
            | (now attempt     | +------------------+-----+ |
            |  handoff)        | |   onResponder          | |
            +------------------->|      TerminationRequest| |
                               | +------------------+-----+ |
                               |                    |       | +----------------+
                               |         true:GRANT +-------->|onResponderGrant|
                               |                            | +--------+-------+
                               | +------------------------+ |          |
                               | |   onResponderTerminate |<-----------+
                               | +------------------+-----+ |
                               |                    |       | +----------------+
                               |                    +-------->|onResponderMove |
                               |                            | +----------------+
                               |                            |
                               |                            |
      Some active touch started|                            |
      inside current responder | +------------------------+ |
      +------------------------->|      onResponderEnd    | |
      |                        | +------------------------+ |
  +---+---------+              |                            |
  | onTouchEnd  |              |                            |
  +---+---------+              |                            |
      |                        | +------------------------+ |
      +------------------------->|     onResponderEnd     | |
      No active touches started| +-----------+------------+ |
      inside current responder |             |              |
                               |             v              |
                               | +------------------------+ |
                               | |    onResponderRelease  | |
                               | +------------------------+ |
                               |                            |
                               +                            + */

/**
 * A note about event ordering in the `EventPluginHub`.
 *
 * Suppose plugins are injected in the following order:
 *
 * `[R, S, C]`
 *
 * To help illustrate the example, assume `S` is `SimpleEventPlugin` (for
 * `onClick` etc) and `R` is `ResponderEventPlugin`.
 *
 * "Deferred-Dispatched Events":
 *
 * - The current event plugin system will traverse the list of injected plugins,
 *   in order, and extract events by collecting the plugin's return value of
 *   `extractEvents()`.
 * - These events that are returned from `extractEvents` are "deferred
 *   dispatched events".
 * - When returned from `extractEvents`, deferred-dispatched events contain an
 *   "accumulation" of deferred dispatches.
 * - These deferred dispatches are accumulated/collected before they are
 *   returned, but processed at a later time by the `EventPluginHub` (hence the
 *   name deferred).
 *
 * In the process of returning their deferred-dispatched events, event plugins
 * themselves can dispatch events on-demand without returning them from
 * `extractEvents`. Plugins might want to do this, so that they can use event
 * dispatching as a tool that helps them decide which events should be extracted
 * in the first place.
 *
 * "On-Demand-Dispatched Events":
 *
 * - On-demand-dispatched events are not returned from `extractEvents`.
 * - On-demand-dispatched events are dispatched during the process of returning
 *   the deferred-dispatched events.
 * - They should not have side effects.
 * - They should be avoided, and/or eventually be replaced with another
 *   abstraction that allows event plugins to perform multiple "rounds" of event
 *   extraction.
 *
 * Therefore, the sequence of event dispatches becomes:
 *
 * - `R`s on-demand events (if any)   (dispatched by `R` on-demand)
 * - `S`s on-demand events (if any)   (dispatched by `S` on-demand)
 * - `C`s on-demand events (if any)   (dispatched by `C` on-demand)
 * - `R`s extracted events (if any)   (dispatched by `EventPluginHub`)
 * - `S`s extracted events (if any)   (dispatched by `EventPluginHub`)
 * - `C`s extracted events (if any)   (dispatched by `EventPluginHub`)
 *
 * In the case of `ResponderEventPlugin`: If the `startShouldSetResponder`
 * on-demand dispatch returns `true` (and some other details are satisfied) the
 * `onResponderGrant` deferred dispatched event is returned from
 * `extractEvents`. The sequence of dispatch executions in this case
 * will appear as follows:
 *
 * - `startShouldSetResponder` (`ResponderEventPlugin` dispatches on-demand)
 * - `touchStartCapture`       (`EventPluginHub` dispatches as usual)
 * - `touchStart`              (`EventPluginHub` dispatches as usual)
 * - `responderGrant/Reject`   (`EventPluginHub` dispatches as usual)
 */

function setResponderAndExtractTransfer(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var shouldSetEventType = isStartish(topLevelType) ? eventTypes.startShouldSetResponder : isMoveish(topLevelType) ? eventTypes.moveShouldSetResponder : topLevelType === 'topSelectionChange' ? eventTypes.selectionChangeShouldSetResponder : eventTypes.scrollShouldSetResponder;

  // TODO: stop one short of the current responder.
  var bubbleShouldSetFrom = !responderInst ? targetInst : EventPluginUtils.getLowestCommonAncestor(responderInst, targetInst);

  // When capturing/bubbling the "shouldSet" event, we want to skip the target
  // (deepest ID) if it happens to be the current responder. The reasoning:
  // It's strange to get an `onMoveShouldSetResponder` when you're *already*
  // the responder.
  var skipOverBubbleShouldSetFrom = bubbleShouldSetFrom === responderInst;
  var shouldSetEvent = ResponderSyntheticEvent.getPooled(shouldSetEventType, bubbleShouldSetFrom, nativeEvent, nativeEventTarget);
  shouldSetEvent.touchHistory = ResponderTouchHistoryStore.touchHistory;
  if (skipOverBubbleShouldSetFrom) {
    EventPropagators.accumulateTwoPhaseDispatchesSkipTarget(shouldSetEvent);
  } else {
    EventPropagators.accumulateTwoPhaseDispatches(shouldSetEvent);
  }
  var wantsResponderInst = executeDispatchesInOrderStopAtTrue(shouldSetEvent);
  if (!shouldSetEvent.isPersistent()) {
    shouldSetEvent.constructor.release(shouldSetEvent);
  }

  if (!wantsResponderInst || wantsResponderInst === responderInst) {
    return null;
  }
  var extracted;
  var grantEvent = ResponderSyntheticEvent.getPooled(eventTypes.responderGrant, wantsResponderInst, nativeEvent, nativeEventTarget);
  grantEvent.touchHistory = ResponderTouchHistoryStore.touchHistory;

  EventPropagators.accumulateDirectDispatches(grantEvent);
  var blockHostResponder = executeDirectDispatch(grantEvent) === true;
  if (responderInst) {

    var terminationRequestEvent = ResponderSyntheticEvent.getPooled(eventTypes.responderTerminationRequest, responderInst, nativeEvent, nativeEventTarget);
    terminationRequestEvent.touchHistory = ResponderTouchHistoryStore.touchHistory;
    EventPropagators.accumulateDirectDispatches(terminationRequestEvent);
    var shouldSwitch = !hasDispatches(terminationRequestEvent) || executeDirectDispatch(terminationRequestEvent);
    if (!terminationRequestEvent.isPersistent()) {
      terminationRequestEvent.constructor.release(terminationRequestEvent);
    }

    if (shouldSwitch) {
      var terminateEvent = ResponderSyntheticEvent.getPooled(eventTypes.responderTerminate, responderInst, nativeEvent, nativeEventTarget);
      terminateEvent.touchHistory = ResponderTouchHistoryStore.touchHistory;
      EventPropagators.accumulateDirectDispatches(terminateEvent);
      extracted = accumulate(extracted, [grantEvent, terminateEvent]);
      changeResponder(wantsResponderInst, blockHostResponder);
    } else {
      var rejectEvent = ResponderSyntheticEvent.getPooled(eventTypes.responderReject, wantsResponderInst, nativeEvent, nativeEventTarget);
      rejectEvent.touchHistory = ResponderTouchHistoryStore.touchHistory;
      EventPropagators.accumulateDirectDispatches(rejectEvent);
      extracted = accumulate(extracted, rejectEvent);
    }
  } else {
    extracted = accumulate(extracted, grantEvent);
    changeResponder(wantsResponderInst, blockHostResponder);
  }
  return extracted;
}

/**
 * A transfer is a negotiation between a currently set responder and the next
 * element to claim responder status. Any start event could trigger a transfer
 * of responderInst. Any move event could trigger a transfer.
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @return {boolean} True if a transfer of responder could possibly occur.
 */
function canTriggerTransfer(topLevelType, topLevelInst, nativeEvent) {
  return topLevelInst && (
  // responderIgnoreScroll: We are trying to migrate away from specifically
  // tracking native scroll events here and responderIgnoreScroll indicates we
  // will send topTouchCancel to handle canceling touch events instead
  topLevelType === 'topScroll' && !nativeEvent.responderIgnoreScroll || trackedTouchCount > 0 && topLevelType === 'topSelectionChange' || isStartish(topLevelType) || isMoveish(topLevelType));
}

/**
 * Returns whether or not this touch end event makes it such that there are no
 * longer any touches that started inside of the current `responderInst`.
 *
 * @param {NativeEvent} nativeEvent Native touch end event.
 * @return {boolean} Whether or not this touch end event ends the responder.
 */
function noResponderTouches(nativeEvent) {
  var touches = nativeEvent.touches;
  if (!touches || touches.length === 0) {
    return true;
  }
  for (var i = 0; i < touches.length; i++) {
    var activeTouch = touches[i];
    var target = activeTouch.target;
    if (target !== null && target !== undefined && target !== 0) {
      // Is the original touch location inside of the current responder?
      var targetInst = EventPluginUtils.getInstanceFromNode(target);
      if (EventPluginUtils.isAncestor(responderInst, targetInst)) {
        return false;
      }
    }
  }
  return true;
}

var ResponderEventPlugin = {

  /* For unit testing only */
  _getResponderID: function _getResponderID() {
    return responderInst ? responderInst._rootNodeID : null;
  },

  eventTypes: eventTypes,

  /**
   * We must be resilient to `targetInst` being `null` on `touchMove` or
   * `touchEnd`. On certain platforms, this means that a native scroll has
   * assumed control and the original touch targets are destroyed.
   */
  extractEvents: function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    if (isStartish(topLevelType)) {
      trackedTouchCount += 1;
    } else if (isEndish(topLevelType)) {
      if (trackedTouchCount >= 0) {
        trackedTouchCount -= 1;
      } else {
        console.error('Ended a touch event which was not counted in `trackedTouchCount`.');
        return null;
      }
    }

    ResponderTouchHistoryStore.recordTouchTrack(topLevelType, nativeEvent);

    var extracted = canTriggerTransfer(topLevelType, targetInst, nativeEvent) ? setResponderAndExtractTransfer(topLevelType, targetInst, nativeEvent, nativeEventTarget) : null;
    // Responder may or may not have transferred on a new touch start/move.
    // Regardless, whoever is the responder after any potential transfer, we
    // direct all touch start/move/ends to them in the form of
    // `onResponderMove/Start/End`. These will be called for *every* additional
    // finger that move/start/end, dispatched directly to whoever is the
    // current responder at that moment, until the responder is "released".
    //
    // These multiple individual change touch events are are always bookended
    // by `onResponderGrant`, and one of
    // (`onResponderRelease/onResponderTerminate`).
    var isResponderTouchStart = responderInst && isStartish(topLevelType);
    var isResponderTouchMove = responderInst && isMoveish(topLevelType);
    var isResponderTouchEnd = responderInst && isEndish(topLevelType);
    var incrementalTouch = isResponderTouchStart ? eventTypes.responderStart : isResponderTouchMove ? eventTypes.responderMove : isResponderTouchEnd ? eventTypes.responderEnd : null;

    if (incrementalTouch) {
      var gesture = ResponderSyntheticEvent.getPooled(incrementalTouch, responderInst, nativeEvent, nativeEventTarget);
      gesture.touchHistory = ResponderTouchHistoryStore.touchHistory;
      EventPropagators.accumulateDirectDispatches(gesture);
      extracted = accumulate(extracted, gesture);
    }

    var isResponderTerminate = responderInst && topLevelType === 'topTouchCancel';
    var isResponderRelease = responderInst && !isResponderTerminate && isEndish(topLevelType) && noResponderTouches(nativeEvent);
    var finalTouch = isResponderTerminate ? eventTypes.responderTerminate : isResponderRelease ? eventTypes.responderRelease : null;
    if (finalTouch) {
      var finalEvent = ResponderSyntheticEvent.getPooled(finalTouch, responderInst, nativeEvent, nativeEventTarget);
      finalEvent.touchHistory = ResponderTouchHistoryStore.touchHistory;
      EventPropagators.accumulateDirectDispatches(finalEvent);
      extracted = accumulate(extracted, finalEvent);
      changeResponder(null);
    }

    var numberActiveTouches = ResponderTouchHistoryStore.touchHistory.numberActiveTouches;
    if (ResponderEventPlugin.GlobalInteractionHandler && numberActiveTouches !== previousActiveTouches) {
      ResponderEventPlugin.GlobalInteractionHandler.onChange(numberActiveTouches);
    }
    previousActiveTouches = numberActiveTouches;

    return extracted;
  },

  GlobalResponderHandler: null,
  GlobalInteractionHandler: null,

  injection: {
    /**
     * @param {{onChange: (ReactID, ReactID) => void} GlobalResponderHandler
     * Object that handles any change in responder. Use this to inject
     * integration with an existing touch handling system etc.
     */
    injectGlobalResponderHandler: function injectGlobalResponderHandler(GlobalResponderHandler) {
      ResponderEventPlugin.GlobalResponderHandler = GlobalResponderHandler;
    },

    /**
     * @param {{onChange: (numberActiveTouches) => void} GlobalInteractionHandler
     * Object that handles any change in the number of active touches.
     */
    injectGlobalInteractionHandler: function injectGlobalInteractionHandler(GlobalInteractionHandler) {
      ResponderEventPlugin.GlobalInteractionHandler = GlobalInteractionHandler;
    }
  }
};

module.exports = ResponderEventPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZXNwb25kZXJFdmVudFBsdWdpbi5qcyJdLCJuYW1lcyI6WyJFdmVudFBsdWdpblV0aWxzIiwicmVxdWlyZSIsIkV2ZW50UHJvcGFnYXRvcnMiLCJSZXNwb25kZXJTeW50aGV0aWNFdmVudCIsIlJlc3BvbmRlclRvdWNoSGlzdG9yeVN0b3JlIiwiYWNjdW11bGF0ZSIsImlzU3RhcnRpc2giLCJpc01vdmVpc2giLCJpc0VuZGlzaCIsImV4ZWN1dGVEaXJlY3REaXNwYXRjaCIsImhhc0Rpc3BhdGNoZXMiLCJleGVjdXRlRGlzcGF0Y2hlc0luT3JkZXJTdG9wQXRUcnVlIiwicmVzcG9uZGVySW5zdCIsInRyYWNrZWRUb3VjaENvdW50IiwicHJldmlvdXNBY3RpdmVUb3VjaGVzIiwiY2hhbmdlUmVzcG9uZGVyIiwibmV4dFJlc3BvbmRlckluc3QiLCJibG9ja0hvc3RSZXNwb25kZXIiLCJvbGRSZXNwb25kZXJJbnN0IiwiUmVzcG9uZGVyRXZlbnRQbHVnaW4iLCJHbG9iYWxSZXNwb25kZXJIYW5kbGVyIiwib25DaGFuZ2UiLCJldmVudFR5cGVzIiwic3RhcnRTaG91bGRTZXRSZXNwb25kZXIiLCJwaGFzZWRSZWdpc3RyYXRpb25OYW1lcyIsImJ1YmJsZWQiLCJjYXB0dXJlZCIsInNjcm9sbFNob3VsZFNldFJlc3BvbmRlciIsInNlbGVjdGlvbkNoYW5nZVNob3VsZFNldFJlc3BvbmRlciIsIm1vdmVTaG91bGRTZXRSZXNwb25kZXIiLCJyZXNwb25kZXJTdGFydCIsInJlZ2lzdHJhdGlvbk5hbWUiLCJyZXNwb25kZXJNb3ZlIiwicmVzcG9uZGVyRW5kIiwicmVzcG9uZGVyUmVsZWFzZSIsInJlc3BvbmRlclRlcm1pbmF0aW9uUmVxdWVzdCIsInJlc3BvbmRlckdyYW50IiwicmVzcG9uZGVyUmVqZWN0IiwicmVzcG9uZGVyVGVybWluYXRlIiwic2V0UmVzcG9uZGVyQW5kRXh0cmFjdFRyYW5zZmVyIiwidG9wTGV2ZWxUeXBlIiwidGFyZ2V0SW5zdCIsIm5hdGl2ZUV2ZW50IiwibmF0aXZlRXZlbnRUYXJnZXQiLCJzaG91bGRTZXRFdmVudFR5cGUiLCJidWJibGVTaG91bGRTZXRGcm9tIiwiZ2V0TG93ZXN0Q29tbW9uQW5jZXN0b3IiLCJza2lwT3ZlckJ1YmJsZVNob3VsZFNldEZyb20iLCJzaG91bGRTZXRFdmVudCIsImdldFBvb2xlZCIsInRvdWNoSGlzdG9yeSIsImFjY3VtdWxhdGVUd29QaGFzZURpc3BhdGNoZXNTa2lwVGFyZ2V0IiwiYWNjdW11bGF0ZVR3b1BoYXNlRGlzcGF0Y2hlcyIsIndhbnRzUmVzcG9uZGVySW5zdCIsImlzUGVyc2lzdGVudCIsImNvbnN0cnVjdG9yIiwicmVsZWFzZSIsImV4dHJhY3RlZCIsImdyYW50RXZlbnQiLCJhY2N1bXVsYXRlRGlyZWN0RGlzcGF0Y2hlcyIsInRlcm1pbmF0aW9uUmVxdWVzdEV2ZW50Iiwic2hvdWxkU3dpdGNoIiwidGVybWluYXRlRXZlbnQiLCJyZWplY3RFdmVudCIsImNhblRyaWdnZXJUcmFuc2ZlciIsInRvcExldmVsSW5zdCIsInJlc3BvbmRlcklnbm9yZVNjcm9sbCIsIm5vUmVzcG9uZGVyVG91Y2hlcyIsInRvdWNoZXMiLCJsZW5ndGgiLCJpIiwiYWN0aXZlVG91Y2giLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJnZXRJbnN0YW5jZUZyb21Ob2RlIiwiaXNBbmNlc3RvciIsIl9nZXRSZXNwb25kZXJJRCIsIl9yb290Tm9kZUlEIiwiZXh0cmFjdEV2ZW50cyIsImNvbnNvbGUiLCJlcnJvciIsInJlY29yZFRvdWNoVHJhY2siLCJpc1Jlc3BvbmRlclRvdWNoU3RhcnQiLCJpc1Jlc3BvbmRlclRvdWNoTW92ZSIsImlzUmVzcG9uZGVyVG91Y2hFbmQiLCJpbmNyZW1lbnRhbFRvdWNoIiwiZ2VzdHVyZSIsImlzUmVzcG9uZGVyVGVybWluYXRlIiwiaXNSZXNwb25kZXJSZWxlYXNlIiwiZmluYWxUb3VjaCIsImZpbmFsRXZlbnQiLCJudW1iZXJBY3RpdmVUb3VjaGVzIiwiR2xvYmFsSW50ZXJhY3Rpb25IYW5kbGVyIiwiaW5qZWN0aW9uIiwiaW5qZWN0R2xvYmFsUmVzcG9uZGVySGFuZGxlciIsImluamVjdEdsb2JhbEludGVyYWN0aW9uSGFuZGxlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsSUFBSUEsbUJBQW1CQyxRQUFRLG9CQUFSLENBQXZCO0FBQ0EsSUFBSUMsbUJBQW1CRCxRQUFRLG9CQUFSLENBQXZCO0FBQ0EsSUFBSUUsMEJBQTBCRixRQUFRLDJCQUFSLENBQTlCO0FBQ0EsSUFBSUcsNkJBQTZCSCxRQUFRLDhCQUFSLENBQWpDOztBQUVBLElBQUlJLGFBQWFKLFFBQVEsY0FBUixDQUFqQjs7QUFFQSxJQUFJSyxhQUFhTixpQkFBaUJNLFVBQWxDO0FBQ0EsSUFBSUMsWUFBWVAsaUJBQWlCTyxTQUFqQztBQUNBLElBQUlDLFdBQVdSLGlCQUFpQlEsUUFBaEM7QUFDQSxJQUFJQyx3QkFBd0JULGlCQUFpQlMscUJBQTdDO0FBQ0EsSUFBSUMsZ0JBQWdCVixpQkFBaUJVLGFBQXJDO0FBQ0EsSUFBSUMscUNBQXFDWCxpQkFBaUJXLGtDQUExRDs7QUFFQTs7OztBQUlBLElBQUlDLGdCQUFnQixJQUFwQjs7QUFFQTs7OztBQUlBLElBQUlDLG9CQUFvQixDQUF4Qjs7QUFFQTs7O0FBR0EsSUFBSUMsd0JBQXdCLENBQTVCOztBQUVBLElBQUlDLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBVUMsaUJBQVYsRUFBNkJDLGtCQUE3QixFQUFpRDtBQUNyRSxNQUFJQyxtQkFBbUJOLGFBQXZCO0FBQ0FBLGtCQUFnQkksaUJBQWhCO0FBQ0EsTUFBSUcscUJBQXFCQyxzQkFBckIsS0FBZ0QsSUFBcEQsRUFBMEQ7QUFDeERELHlCQUFxQkMsc0JBQXJCLENBQTRDQyxRQUE1QyxDQUFxREgsZ0JBQXJELEVBQXVFRixpQkFBdkUsRUFBMEZDLGtCQUExRjtBQUNEO0FBQ0YsQ0FORDs7QUFRQSxJQUFJSyxhQUFhO0FBQ2Y7Ozs7QUFJQUMsMkJBQXlCO0FBQ3ZCQyw2QkFBeUI7QUFDdkJDLGVBQVMsMkJBRGM7QUFFdkJDLGdCQUFVO0FBRmE7QUFERixHQUxWOztBQVlmOzs7Ozs7Ozs7QUFTQUMsNEJBQTBCO0FBQ3hCSCw2QkFBeUI7QUFDdkJDLGVBQVMsNEJBRGM7QUFFdkJDLGdCQUFVO0FBRmE7QUFERCxHQXJCWDs7QUE0QmY7Ozs7Ozs7QUFPQUUscUNBQW1DO0FBQ2pDSiw2QkFBeUI7QUFDdkJDLGVBQVMscUNBRGM7QUFFdkJDLGdCQUFVO0FBRmE7QUFEUSxHQW5DcEI7O0FBMENmOzs7O0FBSUFHLDBCQUF3QjtBQUN0QkwsNkJBQXlCO0FBQ3ZCQyxlQUFTLDBCQURjO0FBRXZCQyxnQkFBVTtBQUZhO0FBREgsR0E5Q1Q7O0FBcURmOzs7QUFHQUksa0JBQWdCLEVBQUVDLGtCQUFrQixrQkFBcEIsRUF4REQ7QUF5RGZDLGlCQUFlLEVBQUVELGtCQUFrQixpQkFBcEIsRUF6REE7QUEwRGZFLGdCQUFjLEVBQUVGLGtCQUFrQixnQkFBcEIsRUExREM7QUEyRGZHLG9CQUFrQixFQUFFSCxrQkFBa0Isb0JBQXBCLEVBM0RIO0FBNERmSSwrQkFBNkI7QUFDM0JKLHNCQUFrQjtBQURTLEdBNURkO0FBK0RmSyxrQkFBZ0IsRUFBRUwsa0JBQWtCLGtCQUFwQixFQS9ERDtBQWdFZk0sbUJBQWlCLEVBQUVOLGtCQUFrQixtQkFBcEIsRUFoRUY7QUFpRWZPLHNCQUFvQixFQUFFUCxrQkFBa0Isc0JBQXBCO0FBakVMLENBQWpCOztBQW9FQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbURBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0VBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0REEsU0FBU1EsOEJBQVQsQ0FBd0NDLFlBQXhDLEVBQXNEQyxVQUF0RCxFQUFrRUMsV0FBbEUsRUFBK0VDLGlCQUEvRSxFQUFrRztBQUNoRyxNQUFJQyxxQkFBcUJ0QyxXQUFXa0MsWUFBWCxJQUEyQmxCLFdBQVdDLHVCQUF0QyxHQUFnRWhCLFVBQVVpQyxZQUFWLElBQTBCbEIsV0FBV08sc0JBQXJDLEdBQThEVyxpQkFBaUIsb0JBQWpCLEdBQXdDbEIsV0FBV00saUNBQW5ELEdBQXVGTixXQUFXSyx3QkFBelA7O0FBRUE7QUFDQSxNQUFJa0Isc0JBQXNCLENBQUNqQyxhQUFELEdBQWlCNkIsVUFBakIsR0FBOEJ6QyxpQkFBaUI4Qyx1QkFBakIsQ0FBeUNsQyxhQUF6QyxFQUF3RDZCLFVBQXhELENBQXhEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSU0sOEJBQThCRix3QkFBd0JqQyxhQUExRDtBQUNBLE1BQUlvQyxpQkFBaUI3Qyx3QkFBd0I4QyxTQUF4QixDQUFrQ0wsa0JBQWxDLEVBQXNEQyxtQkFBdEQsRUFBMkVILFdBQTNFLEVBQXdGQyxpQkFBeEYsQ0FBckI7QUFDQUssaUJBQWVFLFlBQWYsR0FBOEI5QywyQkFBMkI4QyxZQUF6RDtBQUNBLE1BQUlILDJCQUFKLEVBQWlDO0FBQy9CN0MscUJBQWlCaUQsc0NBQWpCLENBQXdESCxjQUF4RDtBQUNELEdBRkQsTUFFTztBQUNMOUMscUJBQWlCa0QsNEJBQWpCLENBQThDSixjQUE5QztBQUNEO0FBQ0QsTUFBSUsscUJBQXFCMUMsbUNBQW1DcUMsY0FBbkMsQ0FBekI7QUFDQSxNQUFJLENBQUNBLGVBQWVNLFlBQWYsRUFBTCxFQUFvQztBQUNsQ04sbUJBQWVPLFdBQWYsQ0FBMkJDLE9BQTNCLENBQW1DUixjQUFuQztBQUNEOztBQUVELE1BQUksQ0FBQ0ssa0JBQUQsSUFBdUJBLHVCQUF1QnpDLGFBQWxELEVBQWlFO0FBQy9ELFdBQU8sSUFBUDtBQUNEO0FBQ0QsTUFBSTZDLFNBQUo7QUFDQSxNQUFJQyxhQUFhdkQsd0JBQXdCOEMsU0FBeEIsQ0FBa0MzQixXQUFXYyxjQUE3QyxFQUE2RGlCLGtCQUE3RCxFQUFpRlgsV0FBakYsRUFBOEZDLGlCQUE5RixDQUFqQjtBQUNBZSxhQUFXUixZQUFYLEdBQTBCOUMsMkJBQTJCOEMsWUFBckQ7O0FBRUFoRCxtQkFBaUJ5RCwwQkFBakIsQ0FBNENELFVBQTVDO0FBQ0EsTUFBSXpDLHFCQUFxQlIsc0JBQXNCaUQsVUFBdEIsTUFBc0MsSUFBL0Q7QUFDQSxNQUFJOUMsYUFBSixFQUFtQjs7QUFFakIsUUFBSWdELDBCQUEwQnpELHdCQUF3QjhDLFNBQXhCLENBQWtDM0IsV0FBV2EsMkJBQTdDLEVBQTBFdkIsYUFBMUUsRUFBeUY4QixXQUF6RixFQUFzR0MsaUJBQXRHLENBQTlCO0FBQ0FpQiw0QkFBd0JWLFlBQXhCLEdBQXVDOUMsMkJBQTJCOEMsWUFBbEU7QUFDQWhELHFCQUFpQnlELDBCQUFqQixDQUE0Q0MsdUJBQTVDO0FBQ0EsUUFBSUMsZUFBZSxDQUFDbkQsY0FBY2tELHVCQUFkLENBQUQsSUFBMkNuRCxzQkFBc0JtRCx1QkFBdEIsQ0FBOUQ7QUFDQSxRQUFJLENBQUNBLHdCQUF3Qk4sWUFBeEIsRUFBTCxFQUE2QztBQUMzQ00sOEJBQXdCTCxXQUF4QixDQUFvQ0MsT0FBcEMsQ0FBNENJLHVCQUE1QztBQUNEOztBQUVELFFBQUlDLFlBQUosRUFBa0I7QUFDaEIsVUFBSUMsaUJBQWlCM0Qsd0JBQXdCOEMsU0FBeEIsQ0FBa0MzQixXQUFXZ0Isa0JBQTdDLEVBQWlFMUIsYUFBakUsRUFBZ0Y4QixXQUFoRixFQUE2RkMsaUJBQTdGLENBQXJCO0FBQ0FtQixxQkFBZVosWUFBZixHQUE4QjlDLDJCQUEyQjhDLFlBQXpEO0FBQ0FoRCx1QkFBaUJ5RCwwQkFBakIsQ0FBNENHLGNBQTVDO0FBQ0FMLGtCQUFZcEQsV0FBV29ELFNBQVgsRUFBc0IsQ0FBQ0MsVUFBRCxFQUFhSSxjQUFiLENBQXRCLENBQVo7QUFDQS9DLHNCQUFnQnNDLGtCQUFoQixFQUFvQ3BDLGtCQUFwQztBQUNELEtBTkQsTUFNTztBQUNMLFVBQUk4QyxjQUFjNUQsd0JBQXdCOEMsU0FBeEIsQ0FBa0MzQixXQUFXZSxlQUE3QyxFQUE4RGdCLGtCQUE5RCxFQUFrRlgsV0FBbEYsRUFBK0ZDLGlCQUEvRixDQUFsQjtBQUNBb0Isa0JBQVliLFlBQVosR0FBMkI5QywyQkFBMkI4QyxZQUF0RDtBQUNBaEQsdUJBQWlCeUQsMEJBQWpCLENBQTRDSSxXQUE1QztBQUNBTixrQkFBWXBELFdBQVdvRCxTQUFYLEVBQXNCTSxXQUF0QixDQUFaO0FBQ0Q7QUFDRixHQXRCRCxNQXNCTztBQUNMTixnQkFBWXBELFdBQVdvRCxTQUFYLEVBQXNCQyxVQUF0QixDQUFaO0FBQ0EzQyxvQkFBZ0JzQyxrQkFBaEIsRUFBb0NwQyxrQkFBcEM7QUFDRDtBQUNELFNBQU93QyxTQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUUEsU0FBU08sa0JBQVQsQ0FBNEJ4QixZQUE1QixFQUEwQ3lCLFlBQTFDLEVBQXdEdkIsV0FBeEQsRUFBcUU7QUFDbkUsU0FBT3VCO0FBQ1A7QUFDQTtBQUNBO0FBQ0F6QixtQkFBaUIsV0FBakIsSUFBZ0MsQ0FBQ0UsWUFBWXdCLHFCQUE3QyxJQUFzRXJELG9CQUFvQixDQUFwQixJQUF5QjJCLGlCQUFpQixvQkFBaEgsSUFBd0lsQyxXQUFXa0MsWUFBWCxDQUF4SSxJQUFvS2pDLFVBQVVpQyxZQUFWLENBSjdKLENBQVA7QUFLRDs7QUFFRDs7Ozs7OztBQU9BLFNBQVMyQixrQkFBVCxDQUE0QnpCLFdBQTVCLEVBQXlDO0FBQ3ZDLE1BQUkwQixVQUFVMUIsWUFBWTBCLE9BQTFCO0FBQ0EsTUFBSSxDQUFDQSxPQUFELElBQVlBLFFBQVFDLE1BQVIsS0FBbUIsQ0FBbkMsRUFBc0M7QUFDcEMsV0FBTyxJQUFQO0FBQ0Q7QUFDRCxPQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsUUFBUUMsTUFBNUIsRUFBb0NDLEdBQXBDLEVBQXlDO0FBQ3ZDLFFBQUlDLGNBQWNILFFBQVFFLENBQVIsQ0FBbEI7QUFDQSxRQUFJRSxTQUFTRCxZQUFZQyxNQUF6QjtBQUNBLFFBQUlBLFdBQVcsSUFBWCxJQUFtQkEsV0FBV0MsU0FBOUIsSUFBMkNELFdBQVcsQ0FBMUQsRUFBNkQ7QUFDM0Q7QUFDQSxVQUFJL0IsYUFBYXpDLGlCQUFpQjBFLG1CQUFqQixDQUFxQ0YsTUFBckMsQ0FBakI7QUFDQSxVQUFJeEUsaUJBQWlCMkUsVUFBakIsQ0FBNEIvRCxhQUE1QixFQUEyQzZCLFVBQTNDLENBQUosRUFBNEQ7QUFDMUQsZUFBTyxLQUFQO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsU0FBTyxJQUFQO0FBQ0Q7O0FBRUQsSUFBSXRCLHVCQUF1Qjs7QUFFekI7QUFDQXlELG1CQUFpQiwyQkFBWTtBQUMzQixXQUFPaEUsZ0JBQWdCQSxjQUFjaUUsV0FBOUIsR0FBNEMsSUFBbkQ7QUFDRCxHQUx3Qjs7QUFPekJ2RCxjQUFZQSxVQVBhOztBQVN6Qjs7Ozs7QUFLQXdELGlCQUFlLHVCQUFVdEMsWUFBVixFQUF3QkMsVUFBeEIsRUFBb0NDLFdBQXBDLEVBQWlEQyxpQkFBakQsRUFBb0U7QUFDakYsUUFBSXJDLFdBQVdrQyxZQUFYLENBQUosRUFBOEI7QUFDNUIzQiwyQkFBcUIsQ0FBckI7QUFDRCxLQUZELE1BRU8sSUFBSUwsU0FBU2dDLFlBQVQsQ0FBSixFQUE0QjtBQUNqQyxVQUFJM0IscUJBQXFCLENBQXpCLEVBQTRCO0FBQzFCQSw2QkFBcUIsQ0FBckI7QUFDRCxPQUZELE1BRU87QUFDTGtFLGdCQUFRQyxLQUFSLENBQWMsbUVBQWQ7QUFDQSxlQUFPLElBQVA7QUFDRDtBQUNGOztBQUVENUUsK0JBQTJCNkUsZ0JBQTNCLENBQTRDekMsWUFBNUMsRUFBMERFLFdBQTFEOztBQUVBLFFBQUllLFlBQVlPLG1CQUFtQnhCLFlBQW5CLEVBQWlDQyxVQUFqQyxFQUE2Q0MsV0FBN0MsSUFBNERILCtCQUErQkMsWUFBL0IsRUFBNkNDLFVBQTdDLEVBQXlEQyxXQUF6RCxFQUFzRUMsaUJBQXRFLENBQTVELEdBQXVKLElBQXZLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFJdUMsd0JBQXdCdEUsaUJBQWlCTixXQUFXa0MsWUFBWCxDQUE3QztBQUNBLFFBQUkyQyx1QkFBdUJ2RSxpQkFBaUJMLFVBQVVpQyxZQUFWLENBQTVDO0FBQ0EsUUFBSTRDLHNCQUFzQnhFLGlCQUFpQkosU0FBU2dDLFlBQVQsQ0FBM0M7QUFDQSxRQUFJNkMsbUJBQW1CSCx3QkFBd0I1RCxXQUFXUSxjQUFuQyxHQUFvRHFELHVCQUF1QjdELFdBQVdVLGFBQWxDLEdBQWtEb0Qsc0JBQXNCOUQsV0FBV1csWUFBakMsR0FBZ0QsSUFBN0s7O0FBRUEsUUFBSW9ELGdCQUFKLEVBQXNCO0FBQ3BCLFVBQUlDLFVBQVVuRix3QkFBd0I4QyxTQUF4QixDQUFrQ29DLGdCQUFsQyxFQUFvRHpFLGFBQXBELEVBQW1FOEIsV0FBbkUsRUFBZ0ZDLGlCQUFoRixDQUFkO0FBQ0EyQyxjQUFRcEMsWUFBUixHQUF1QjlDLDJCQUEyQjhDLFlBQWxEO0FBQ0FoRCx1QkFBaUJ5RCwwQkFBakIsQ0FBNEMyQixPQUE1QztBQUNBN0Isa0JBQVlwRCxXQUFXb0QsU0FBWCxFQUFzQjZCLE9BQXRCLENBQVo7QUFDRDs7QUFFRCxRQUFJQyx1QkFBdUIzRSxpQkFBaUI0QixpQkFBaUIsZ0JBQTdEO0FBQ0EsUUFBSWdELHFCQUFxQjVFLGlCQUFpQixDQUFDMkUsb0JBQWxCLElBQTBDL0UsU0FBU2dDLFlBQVQsQ0FBMUMsSUFBb0UyQixtQkFBbUJ6QixXQUFuQixDQUE3RjtBQUNBLFFBQUkrQyxhQUFhRix1QkFBdUJqRSxXQUFXZ0Isa0JBQWxDLEdBQXVEa0QscUJBQXFCbEUsV0FBV1ksZ0JBQWhDLEdBQW1ELElBQTNIO0FBQ0EsUUFBSXVELFVBQUosRUFBZ0I7QUFDZCxVQUFJQyxhQUFhdkYsd0JBQXdCOEMsU0FBeEIsQ0FBa0N3QyxVQUFsQyxFQUE4QzdFLGFBQTlDLEVBQTZEOEIsV0FBN0QsRUFBMEVDLGlCQUExRSxDQUFqQjtBQUNBK0MsaUJBQVd4QyxZQUFYLEdBQTBCOUMsMkJBQTJCOEMsWUFBckQ7QUFDQWhELHVCQUFpQnlELDBCQUFqQixDQUE0QytCLFVBQTVDO0FBQ0FqQyxrQkFBWXBELFdBQVdvRCxTQUFYLEVBQXNCaUMsVUFBdEIsQ0FBWjtBQUNBM0Usc0JBQWdCLElBQWhCO0FBQ0Q7O0FBRUQsUUFBSTRFLHNCQUFzQnZGLDJCQUEyQjhDLFlBQTNCLENBQXdDeUMsbUJBQWxFO0FBQ0EsUUFBSXhFLHFCQUFxQnlFLHdCQUFyQixJQUFpREQsd0JBQXdCN0UscUJBQTdFLEVBQW9HO0FBQ2xHSywyQkFBcUJ5RSx3QkFBckIsQ0FBOEN2RSxRQUE5QyxDQUF1RHNFLG1CQUF2RDtBQUNEO0FBQ0Q3RSw0QkFBd0I2RSxtQkFBeEI7O0FBRUEsV0FBT2xDLFNBQVA7QUFDRCxHQXJFd0I7O0FBdUV6QnJDLDBCQUF3QixJQXZFQztBQXdFekJ3RSw0QkFBMEIsSUF4RUQ7O0FBMEV6QkMsYUFBVztBQUNUOzs7OztBQUtBQyxrQ0FBOEIsc0NBQVUxRSxzQkFBVixFQUFrQztBQUM5REQsMkJBQXFCQyxzQkFBckIsR0FBOENBLHNCQUE5QztBQUNELEtBUlE7O0FBVVQ7Ozs7QUFJQTJFLG9DQUFnQyx3Q0FBVUgsd0JBQVYsRUFBb0M7QUFDbEV6RSwyQkFBcUJ5RSx3QkFBckIsR0FBZ0RBLHdCQUFoRDtBQUNEO0FBaEJRO0FBMUVjLENBQTNCOztBQThGQUksT0FBT0MsT0FBUCxHQUFpQjlFLG9CQUFqQiIsImZpbGUiOiJSZXNwb25kZXJFdmVudFBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudFBsdWdpblV0aWxzID0gcmVxdWlyZSgnLi9FdmVudFBsdWdpblV0aWxzJyk7XG52YXIgRXZlbnRQcm9wYWdhdG9ycyA9IHJlcXVpcmUoJy4vRXZlbnRQcm9wYWdhdG9ycycpO1xudmFyIFJlc3BvbmRlclN5bnRoZXRpY0V2ZW50ID0gcmVxdWlyZSgnLi9SZXNwb25kZXJTeW50aGV0aWNFdmVudCcpO1xudmFyIFJlc3BvbmRlclRvdWNoSGlzdG9yeVN0b3JlID0gcmVxdWlyZSgnLi9SZXNwb25kZXJUb3VjaEhpc3RvcnlTdG9yZScpO1xuXG52YXIgYWNjdW11bGF0ZSA9IHJlcXVpcmUoJy4vYWNjdW11bGF0ZScpO1xuXG52YXIgaXNTdGFydGlzaCA9IEV2ZW50UGx1Z2luVXRpbHMuaXNTdGFydGlzaDtcbnZhciBpc01vdmVpc2ggPSBFdmVudFBsdWdpblV0aWxzLmlzTW92ZWlzaDtcbnZhciBpc0VuZGlzaCA9IEV2ZW50UGx1Z2luVXRpbHMuaXNFbmRpc2g7XG52YXIgZXhlY3V0ZURpcmVjdERpc3BhdGNoID0gRXZlbnRQbHVnaW5VdGlscy5leGVjdXRlRGlyZWN0RGlzcGF0Y2g7XG52YXIgaGFzRGlzcGF0Y2hlcyA9IEV2ZW50UGx1Z2luVXRpbHMuaGFzRGlzcGF0Y2hlcztcbnZhciBleGVjdXRlRGlzcGF0Y2hlc0luT3JkZXJTdG9wQXRUcnVlID0gRXZlbnRQbHVnaW5VdGlscy5leGVjdXRlRGlzcGF0Y2hlc0luT3JkZXJTdG9wQXRUcnVlO1xuXG4vKipcbiAqIEluc3RhbmNlIG9mIGVsZW1lbnQgdGhhdCBzaG91bGQgcmVzcG9uZCB0byB0b3VjaC9tb3ZlIHR5cGVzIG9mIGludGVyYWN0aW9ucyxcbiAqIGFzIGluZGljYXRlZCBleHBsaWNpdGx5IGJ5IHJlbGV2YW50IGNhbGxiYWNrcy5cbiAqL1xudmFyIHJlc3BvbmRlckluc3QgPSBudWxsO1xuXG4vKipcbiAqIENvdW50IG9mIGN1cnJlbnQgdG91Y2hlcy4gQSB0ZXh0SW5wdXQgc2hvdWxkIGJlY29tZSByZXNwb25kZXIgaWZmIHRoZVxuICogc2VsZWN0aW9uIGNoYW5nZXMgd2hpbGUgdGhlcmUgaXMgYSB0b3VjaCBvbiB0aGUgc2NyZWVuLlxuICovXG52YXIgdHJhY2tlZFRvdWNoQ291bnQgPSAwO1xuXG4vKipcbiAqIExhc3QgcmVwb3J0ZWQgbnVtYmVyIG9mIGFjdGl2ZSB0b3VjaGVzLlxuICovXG52YXIgcHJldmlvdXNBY3RpdmVUb3VjaGVzID0gMDtcblxudmFyIGNoYW5nZVJlc3BvbmRlciA9IGZ1bmN0aW9uIChuZXh0UmVzcG9uZGVySW5zdCwgYmxvY2tIb3N0UmVzcG9uZGVyKSB7XG4gIHZhciBvbGRSZXNwb25kZXJJbnN0ID0gcmVzcG9uZGVySW5zdDtcbiAgcmVzcG9uZGVySW5zdCA9IG5leHRSZXNwb25kZXJJbnN0O1xuICBpZiAoUmVzcG9uZGVyRXZlbnRQbHVnaW4uR2xvYmFsUmVzcG9uZGVySGFuZGxlciAhPT0gbnVsbCkge1xuICAgIFJlc3BvbmRlckV2ZW50UGx1Z2luLkdsb2JhbFJlc3BvbmRlckhhbmRsZXIub25DaGFuZ2Uob2xkUmVzcG9uZGVySW5zdCwgbmV4dFJlc3BvbmRlckluc3QsIGJsb2NrSG9zdFJlc3BvbmRlcik7XG4gIH1cbn07XG5cbnZhciBldmVudFR5cGVzID0ge1xuICAvKipcbiAgICogT24gYSBgdG91Y2hTdGFydGAvYG1vdXNlRG93bmAsIGlzIGl0IGRlc2lyZWQgdGhhdCB0aGlzIGVsZW1lbnQgYmVjb21lIHRoZVxuICAgKiByZXNwb25kZXI/XG4gICAqL1xuICBzdGFydFNob3VsZFNldFJlc3BvbmRlcjoge1xuICAgIHBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzOiB7XG4gICAgICBidWJibGVkOiAnb25TdGFydFNob3VsZFNldFJlc3BvbmRlcicsXG4gICAgICBjYXB0dXJlZDogJ29uU3RhcnRTaG91bGRTZXRSZXNwb25kZXJDYXB0dXJlJ1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogT24gYSBgc2Nyb2xsYCwgaXMgaXQgZGVzaXJlZCB0aGF0IHRoaXMgZWxlbWVudCBiZWNvbWUgdGhlIHJlc3BvbmRlcj8gVGhpc1xuICAgKiBpcyB1c3VhbGx5IG5vdCBuZWVkZWQsIGJ1dCBzaG91bGQgYmUgdXNlZCB0byByZXRyb2FjdGl2ZWx5IGluZmVyIHRoYXQgYVxuICAgKiBgdG91Y2hTdGFydGAgaGFkIG9jY3VycmVkIGR1cmluZyBtb21lbnR1bSBzY3JvbGwuIER1cmluZyBhIG1vbWVudHVtIHNjcm9sbCxcbiAgICogYSB0b3VjaCBzdGFydCB3aWxsIGJlIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IGEgc2Nyb2xsIGV2ZW50IGlmIHRoZSB2aWV3IGlzXG4gICAqIGN1cnJlbnRseSBzY3JvbGxpbmcuXG4gICAqXG4gICAqIFRPRE86IFRoaXMgc2hvdWxkbid0IGJ1YmJsZS5cbiAgICovXG4gIHNjcm9sbFNob3VsZFNldFJlc3BvbmRlcjoge1xuICAgIHBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzOiB7XG4gICAgICBidWJibGVkOiAnb25TY3JvbGxTaG91bGRTZXRSZXNwb25kZXInLFxuICAgICAgY2FwdHVyZWQ6ICdvblNjcm9sbFNob3VsZFNldFJlc3BvbmRlckNhcHR1cmUnXG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBPbiB0ZXh0IHNlbGVjdGlvbiBjaGFuZ2UsIHNob3VsZCB0aGlzIGVsZW1lbnQgYmVjb21lIHRoZSByZXNwb25kZXI/IFRoaXNcbiAgICogaXMgbmVlZGVkIGZvciB0ZXh0IGlucHV0cyBvciBvdGhlciB2aWV3cyB3aXRoIG5hdGl2ZSBzZWxlY3Rpb24sIHNvIHRoZVxuICAgKiBKUyB2aWV3IGNhbiBjbGFpbSB0aGUgcmVzcG9uZGVyLlxuICAgKlxuICAgKiBUT0RPOiBUaGlzIHNob3VsZG4ndCBidWJibGUuXG4gICAqL1xuICBzZWxlY3Rpb25DaGFuZ2VTaG91bGRTZXRSZXNwb25kZXI6IHtcbiAgICBwaGFzZWRSZWdpc3RyYXRpb25OYW1lczoge1xuICAgICAgYnViYmxlZDogJ29uU2VsZWN0aW9uQ2hhbmdlU2hvdWxkU2V0UmVzcG9uZGVyJyxcbiAgICAgIGNhcHR1cmVkOiAnb25TZWxlY3Rpb25DaGFuZ2VTaG91bGRTZXRSZXNwb25kZXJDYXB0dXJlJ1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogT24gYSBgdG91Y2hNb3ZlYC9gbW91c2VNb3ZlYCwgaXMgaXQgZGVzaXJlZCB0aGF0IHRoaXMgZWxlbWVudCBiZWNvbWUgdGhlXG4gICAqIHJlc3BvbmRlcj9cbiAgICovXG4gIG1vdmVTaG91bGRTZXRSZXNwb25kZXI6IHtcbiAgICBwaGFzZWRSZWdpc3RyYXRpb25OYW1lczoge1xuICAgICAgYnViYmxlZDogJ29uTW92ZVNob3VsZFNldFJlc3BvbmRlcicsXG4gICAgICBjYXB0dXJlZDogJ29uTW92ZVNob3VsZFNldFJlc3BvbmRlckNhcHR1cmUnXG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBEaXJlY3QgcmVzcG9uZGVyIGV2ZW50cyBkaXNwYXRjaGVkIGRpcmVjdGx5IHRvIHJlc3BvbmRlci4gRG8gbm90IGJ1YmJsZS5cbiAgICovXG4gIHJlc3BvbmRlclN0YXJ0OiB7IHJlZ2lzdHJhdGlvbk5hbWU6ICdvblJlc3BvbmRlclN0YXJ0JyB9LFxuICByZXNwb25kZXJNb3ZlOiB7IHJlZ2lzdHJhdGlvbk5hbWU6ICdvblJlc3BvbmRlck1vdmUnIH0sXG4gIHJlc3BvbmRlckVuZDogeyByZWdpc3RyYXRpb25OYW1lOiAnb25SZXNwb25kZXJFbmQnIH0sXG4gIHJlc3BvbmRlclJlbGVhc2U6IHsgcmVnaXN0cmF0aW9uTmFtZTogJ29uUmVzcG9uZGVyUmVsZWFzZScgfSxcbiAgcmVzcG9uZGVyVGVybWluYXRpb25SZXF1ZXN0OiB7XG4gICAgcmVnaXN0cmF0aW9uTmFtZTogJ29uUmVzcG9uZGVyVGVybWluYXRpb25SZXF1ZXN0J1xuICB9LFxuICByZXNwb25kZXJHcmFudDogeyByZWdpc3RyYXRpb25OYW1lOiAnb25SZXNwb25kZXJHcmFudCcgfSxcbiAgcmVzcG9uZGVyUmVqZWN0OiB7IHJlZ2lzdHJhdGlvbk5hbWU6ICdvblJlc3BvbmRlclJlamVjdCcgfSxcbiAgcmVzcG9uZGVyVGVybWluYXRlOiB7IHJlZ2lzdHJhdGlvbk5hbWU6ICdvblJlc3BvbmRlclRlcm1pbmF0ZScgfVxufTtcblxuLyoqXG4gKlxuICogUmVzcG9uZGVyIFN5c3RlbTpcbiAqIC0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKiAtIEEgZ2xvYmFsLCBzb2xpdGFyeSBcImludGVyYWN0aW9uIGxvY2tcIiBvbiBhIHZpZXcuXG4gKiAtIElmIGEgbm9kZSBiZWNvbWVzIHRoZSByZXNwb25kZXIsIGl0IHNob3VsZCBjb252ZXkgdmlzdWFsIGZlZWRiYWNrXG4gKiAgIGltbWVkaWF0ZWx5IHRvIGluZGljYXRlIHNvLCBlaXRoZXIgYnkgaGlnaGxpZ2h0aW5nIG9yIG1vdmluZyBhY2NvcmRpbmdseS5cbiAqIC0gVG8gYmUgdGhlIHJlc3BvbmRlciBtZWFucywgdGhhdCB0b3VjaGVzIGFyZSBleGNsdXNpdmVseSBpbXBvcnRhbnQgdG8gdGhhdFxuICogICByZXNwb25kZXIgdmlldywgYW5kIG5vIG90aGVyIHZpZXcuXG4gKiAtIFdoaWxlIHRvdWNoZXMgYXJlIHN0aWxsIG9jY3VycmluZywgdGhlIHJlc3BvbmRlciBsb2NrIGNhbiBiZSB0cmFuc2ZlcnJlZCB0b1xuICogICBhIG5ldyB2aWV3LCBidXQgb25seSB0byBpbmNyZWFzaW5nbHkgXCJoaWdoZXJcIiB2aWV3cyAobWVhbmluZyBhbmNlc3RvcnMgb2ZcbiAqICAgdGhlIGN1cnJlbnQgcmVzcG9uZGVyKS5cbiAqXG4gKiBSZXNwb25kZXIgYmVpbmcgZ3JhbnRlZDpcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqIC0gVG91Y2ggc3RhcnRzLCBtb3ZlcywgYW5kIHNjcm9sbHMgY2FuIGNhdXNlIGFuIElEIHRvIGJlY29tZSB0aGUgcmVzcG9uZGVyLlxuICogLSBXZSBjYXB0dXJlL2J1YmJsZSBgc3RhcnRTaG91bGRTZXRSZXNwb25kZXJgL2Btb3ZlU2hvdWxkU2V0UmVzcG9uZGVyYCB0b1xuICogICB0aGUgXCJhcHByb3ByaWF0ZSBwbGFjZVwiLlxuICogLSBJZiBub3RoaW5nIGlzIGN1cnJlbnRseSB0aGUgcmVzcG9uZGVyLCB0aGUgXCJhcHByb3ByaWF0ZSBwbGFjZVwiIGlzIHRoZVxuICogICBpbml0aWF0aW5nIGV2ZW50J3MgYHRhcmdldElEYC5cbiAqIC0gSWYgc29tZXRoaW5nICppcyogYWxyZWFkeSB0aGUgcmVzcG9uZGVyLCB0aGUgXCJhcHByb3ByaWF0ZSBwbGFjZVwiIGlzIHRoZVxuICogICBmaXJzdCBjb21tb24gYW5jZXN0b3Igb2YgdGhlIGV2ZW50IHRhcmdldCBhbmQgdGhlIGN1cnJlbnQgYHJlc3BvbmRlckluc3RgLlxuICogLSBTb21lIG5lZ290aWF0aW9uIGhhcHBlbnM6IFNlZSB0aGUgdGltaW5nIGRpYWdyYW0gYmVsb3cuXG4gKiAtIFNjcm9sbGVkIHZpZXdzIGF1dG9tYXRpY2FsbHkgYmVjb21lIHJlc3BvbmRlci4gVGhlIHJlYXNvbmluZyBpcyB0aGF0IGFcbiAqICAgcGxhdGZvcm0gc2Nyb2xsIHZpZXcgdGhhdCBpc24ndCBidWlsdCBvbiB0b3Agb2YgdGhlIHJlc3BvbmRlciBzeXN0ZW0gaGFzXG4gKiAgIGJlZ2FuIHNjcm9sbGluZywgYW5kIHRoZSBhY3RpdmUgcmVzcG9uZGVyIG11c3Qgbm93IGJlIG5vdGlmaWVkIHRoYXQgdGhlXG4gKiAgIGludGVyYWN0aW9uIGlzIG5vIGxvbmdlciBsb2NrZWQgdG8gaXQgLSB0aGUgc3lzdGVtIGhhcyB0YWtlbiBvdmVyLlxuICpcbiAqIC0gUmVzcG9uZGVyIGJlaW5nIHJlbGVhc2VkOlxuICogICBBcyBzb29uIGFzIG5vIG1vcmUgdG91Y2hlcyB0aGF0ICpzdGFydGVkKiBpbnNpZGUgb2YgZGVzY2VuZGFudHMgb2YgdGhlXG4gKiAgICpjdXJyZW50KiByZXNwb25kZXJJbnN0LCBhbiBgb25SZXNwb25kZXJSZWxlYXNlYCBldmVudCBpcyBkaXNwYXRjaGVkIHRvIHRoZVxuICogICBjdXJyZW50IHJlc3BvbmRlciwgYW5kIHRoZSByZXNwb25kZXIgbG9jayBpcyByZWxlYXNlZC5cbiAqXG4gKiBUT0RPOlxuICogLSBvbiBcImVuZFwiLCBhIGNhbGxiYWNrIGhvb2sgZm9yIGBvblJlc3BvbmRlckVuZFNob3VsZFJlbWFpblJlc3BvbmRlcmAgdGhhdFxuICogICBkZXRlcm1pbmVzIGlmIHRoZSByZXNwb25kZXIgbG9jayBzaG91bGQgcmVtYWluLlxuICogLSBJZiBhIHZpZXcgc2hvdWxkbid0IFwicmVtYWluXCIgdGhlIHJlc3BvbmRlciwgYW55IGFjdGl2ZSB0b3VjaGVzIHNob3VsZCBieVxuICogICBkZWZhdWx0IGJlIGNvbnNpZGVyZWQgXCJkZWFkXCIgYW5kIGRvIG5vdCBpbmZsdWVuY2UgZnV0dXJlIG5lZ290aWF0aW9ucyBvclxuICogICBidWJibGUgcGF0aHMuIEl0IHNob3VsZCBiZSBhcyBpZiB0aG9zZSB0b3VjaGVzIGRvIG5vdCBleGlzdC5cbiAqIC0tIEZvciBtdWx0aXRvdWNoOiBVc3VhbGx5IGEgdHJhbnNsYXRlLXogd2lsbCBjaG9vc2UgdG8gXCJyZW1haW5cIiByZXNwb25kZXJcbiAqICBhZnRlciBvbmUgb3V0IG9mIG1hbnkgdG91Y2hlcyBlbmRlZC4gRm9yIHRyYW5zbGF0ZS15LCB1c3VhbGx5IHRoZSB2aWV3XG4gKiAgZG9lc24ndCB3aXNoIHRvIFwicmVtYWluXCIgcmVzcG9uZGVyIGFmdGVyIG9uZSBvZiBtYW55IHRvdWNoZXMgZW5kLlxuICogLSBDb25zaWRlciBidWlsZGluZyB0aGlzIG9uIHRvcCBvZiBhIGBzdG9wUHJvcGFnYXRpb25gIG1vZGVsIHNpbWlsYXIgdG9cbiAqICAgYFczQ2AgZXZlbnRzLlxuICogLSBFbnN1cmUgdGhhdCBgb25SZXNwb25kZXJUZXJtaW5hdGVgIGlzIGNhbGxlZCBvbiB0b3VjaCBjYW5jZWxzLCB3aGV0aGVyIG9yXG4gKiAgIG5vdCBgb25SZXNwb25kZXJUZXJtaW5hdGlvblJlcXVlc3RgIHJldHVybnMgYHRydWVgIG9yIGBmYWxzZWAuXG4gKlxuICovXG5cbi8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmVnb3RpYXRpb24gUGVyZm9ybWVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8gICAgICAgICAgICAgICAgICAgICAgICAgXFxcblByb2Nlc3MgbG93IGxldmVsIGV2ZW50cyB0byAgICArICAgICBDdXJyZW50IFJlc3BvbmRlciAgICAgICsgICB3YW50c1Jlc3BvbmRlcklEXG5kZXRlcm1pbmUgd2hvIHRvIHBlcmZvcm0gbmVnb3QtfCAgIChpZiBhbnkgZXhpc3RzIGF0IGFsbCkgICB8XG5pYXRpb24vdHJhbnNpdGlvbiAgICAgICAgICAgICAgfCBPdGhlcndpc2UganVzdCBwYXNzIHRocm91Z2h8XG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tK1xuQnViYmxlIHRvIGZpbmQgZmlyc3QgSUQgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxudG8gcmV0dXJuIHRydWU6d2FudHNSZXNwb25kZXJJRHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgICArLS0tLS0tLS0tLS0tLSsgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgICB8IG9uVG91Y2hTdGFydHwgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgICArLS0tLS0tKy0tLS0tLSsgICAgIG5vbmUgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgICAgICAgICAgfCAgICAgICAgICAgIHJldHVybnwgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuKy0tLS0tLS0tLS0tdi0tLS0tLS0tLS0tLS0rdHJ1ZXwgKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSsgfFxufG9uU3RhcnRTaG91bGRTZXRSZXNwb25kZXJ8LS0tLS0+fG9uUmVzcG9uZGVyU3RhcnQgKGN1cikgIHw8LS0tLS0tLS0tLS0rXG4rLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLSsgICAgfCArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKyB8ICAgICAgICAgIHxcbiAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgKy0tLS0tLS0tKy0tLS0tLS0rXG4gICAgICAgICAgICB8IHJldHVybmVkIHRydWUgZm9yfCAgICAgICBmYWxzZTpSRUpFQ1QgKy0tLS0tLS0tPnxvblJlc3BvbmRlclJlamVjdFxuICAgICAgICAgICAgfCB3YW50c1Jlc3BvbmRlcklEIHwgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfCArLS0tLS0tLS0tLS0tLS0tLStcbiAgICAgICAgICAgIHwgKG5vdyBhdHRlbXB0ICAgICB8ICstLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0rIHxcbiAgICAgICAgICAgIHwgIGhhbmRvZmYpICAgICAgICB8IHwgICBvblJlc3BvbmRlciAgICAgICAgICB8IHxcbiAgICAgICAgICAgICstLS0tLS0tLS0tLS0tLS0tLS0tPnwgICAgICBUZXJtaW5hdGlvblJlcXVlc3R8IHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICstLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0rIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHwgKy0tLS0tLS0tLS0tLS0tLS0rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgIHRydWU6R1JBTlQgKy0tLS0tLS0tPnxvblJlc3BvbmRlckdyYW50fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCArLS0tLS0tLS0rLS0tLS0tLStcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rIHwgICAgICAgICAgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgfCAgIG9uUmVzcG9uZGVyVGVybWluYXRlIHw8LS0tLS0tLS0tLS0rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCArLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tKyB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8ICstLS0tLS0tLS0tLS0tLS0tK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICstLS0tLS0tLT58b25SZXNwb25kZXJTdGFydHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgKy0tLS0tLS0tLS0tLS0tLS0rXG5CdWJibGUgdG8gZmluZCBmaXJzdCBJRCAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG50byByZXR1cm4gdHJ1ZTp3YW50c1Jlc3BvbmRlcklEfCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgICstLS0tLS0tLS0tLS0tKyAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgIHwgb25Ub3VjaE1vdmUgfCAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgICstLS0tLS0rLS0tLS0tKyAgICAgbm9uZSAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gICAgICAgICAgICB8ICAgICAgICAgICAgcmV0dXJufCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4rLS0tLS0tLS0tLS12LS0tLS0tLS0tLS0tLSt0cnVlfCArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKyB8XG58b25Nb3ZlU2hvdWxkU2V0UmVzcG9uZGVyIHwtLS0tLT58b25SZXNwb25kZXJNb3ZlIChjdXIpICAgfDwtLS0tLS0tLS0tLStcbistLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tKyAgICB8ICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rIHwgICAgICAgICAgfFxuICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCArLS0tLS0tLS0rLS0tLS0tLStcbiAgICAgICAgICAgIHwgcmV0dXJuZWQgdHJ1ZSBmb3J8ICAgICAgIGZhbHNlOlJFSkVDVCArLS0tLS0tLS0+fG9uUmVzcG9uZGVyUmVqZWN8XG4gICAgICAgICAgICB8IHdhbnRzUmVzcG9uZGVySUQgfCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8ICstLS0tLS0tLS0tLS0tLS0tK1xuICAgICAgICAgICAgfCAobm93IGF0dGVtcHQgICAgIHwgKy0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLSsgfFxuICAgICAgICAgICAgfCAgaGFuZG9mZikgICAgICAgIHwgfCAgIG9uUmVzcG9uZGVyICAgICAgICAgIHwgfFxuICAgICAgICAgICAgKy0tLS0tLS0tLS0tLS0tLS0tLS0+fCAgICAgIFRlcm1pbmF0aW9uUmVxdWVzdHwgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgKy0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLSsgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfCArLS0tLS0tLS0tLS0tLS0tLStcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgdHJ1ZTpHUkFOVCArLS0tLS0tLS0+fG9uUmVzcG9uZGVyR3JhbnR8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICstLS0tLS0tLSstLS0tLS0tK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSsgfCAgICAgICAgICB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB8ICAgb25SZXNwb25kZXJUZXJtaW5hdGUgfDwtLS0tLS0tLS0tLStcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICstLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0rIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHwgKy0tLS0tLS0tLS0tLS0tLS0rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0tPnxvblJlc3BvbmRlck1vdmUgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCArLS0tLS0tLS0tLS0tLS0tLStcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAgIFNvbWUgYWN0aXZlIHRvdWNoIHN0YXJ0ZWR8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAgIGluc2lkZSBjdXJyZW50IHJlc3BvbmRlciB8ICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rIHxcbiAgICAgICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPnwgICAgICBvblJlc3BvbmRlckVuZCAgICB8IHxcbiAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICB8ICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rIHxcbiAgKy0tLSstLS0tLS0tLS0rICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgfCBvblRvdWNoRW5kICB8ICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgKy0tLSstLS0tLS0tLS0rICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICB8ICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rIHxcbiAgICAgICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPnwgICAgIG9uUmVzcG9uZGVyRW5kICAgICB8IHxcbiAgICAgIE5vIGFjdGl2ZSB0b3VjaGVzIHN0YXJ0ZWR8ICstLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0rIHxcbiAgICAgIGluc2lkZSBjdXJyZW50IHJlc3BvbmRlciB8ICAgICAgICAgICAgIHwgICAgICAgICAgICAgIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgIHYgICAgICAgICAgICAgIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHwgICAgb25SZXNwb25kZXJSZWxlYXNlICB8IHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgKi9cblxuLyoqXG4gKiBBIG5vdGUgYWJvdXQgZXZlbnQgb3JkZXJpbmcgaW4gdGhlIGBFdmVudFBsdWdpbkh1YmAuXG4gKlxuICogU3VwcG9zZSBwbHVnaW5zIGFyZSBpbmplY3RlZCBpbiB0aGUgZm9sbG93aW5nIG9yZGVyOlxuICpcbiAqIGBbUiwgUywgQ11gXG4gKlxuICogVG8gaGVscCBpbGx1c3RyYXRlIHRoZSBleGFtcGxlLCBhc3N1bWUgYFNgIGlzIGBTaW1wbGVFdmVudFBsdWdpbmAgKGZvclxuICogYG9uQ2xpY2tgIGV0YykgYW5kIGBSYCBpcyBgUmVzcG9uZGVyRXZlbnRQbHVnaW5gLlxuICpcbiAqIFwiRGVmZXJyZWQtRGlzcGF0Y2hlZCBFdmVudHNcIjpcbiAqXG4gKiAtIFRoZSBjdXJyZW50IGV2ZW50IHBsdWdpbiBzeXN0ZW0gd2lsbCB0cmF2ZXJzZSB0aGUgbGlzdCBvZiBpbmplY3RlZCBwbHVnaW5zLFxuICogICBpbiBvcmRlciwgYW5kIGV4dHJhY3QgZXZlbnRzIGJ5IGNvbGxlY3RpbmcgdGhlIHBsdWdpbidzIHJldHVybiB2YWx1ZSBvZlxuICogICBgZXh0cmFjdEV2ZW50cygpYC5cbiAqIC0gVGhlc2UgZXZlbnRzIHRoYXQgYXJlIHJldHVybmVkIGZyb20gYGV4dHJhY3RFdmVudHNgIGFyZSBcImRlZmVycmVkXG4gKiAgIGRpc3BhdGNoZWQgZXZlbnRzXCIuXG4gKiAtIFdoZW4gcmV0dXJuZWQgZnJvbSBgZXh0cmFjdEV2ZW50c2AsIGRlZmVycmVkLWRpc3BhdGNoZWQgZXZlbnRzIGNvbnRhaW4gYW5cbiAqICAgXCJhY2N1bXVsYXRpb25cIiBvZiBkZWZlcnJlZCBkaXNwYXRjaGVzLlxuICogLSBUaGVzZSBkZWZlcnJlZCBkaXNwYXRjaGVzIGFyZSBhY2N1bXVsYXRlZC9jb2xsZWN0ZWQgYmVmb3JlIHRoZXkgYXJlXG4gKiAgIHJldHVybmVkLCBidXQgcHJvY2Vzc2VkIGF0IGEgbGF0ZXIgdGltZSBieSB0aGUgYEV2ZW50UGx1Z2luSHViYCAoaGVuY2UgdGhlXG4gKiAgIG5hbWUgZGVmZXJyZWQpLlxuICpcbiAqIEluIHRoZSBwcm9jZXNzIG9mIHJldHVybmluZyB0aGVpciBkZWZlcnJlZC1kaXNwYXRjaGVkIGV2ZW50cywgZXZlbnQgcGx1Z2luc1xuICogdGhlbXNlbHZlcyBjYW4gZGlzcGF0Y2ggZXZlbnRzIG9uLWRlbWFuZCB3aXRob3V0IHJldHVybmluZyB0aGVtIGZyb21cbiAqIGBleHRyYWN0RXZlbnRzYC4gUGx1Z2lucyBtaWdodCB3YW50IHRvIGRvIHRoaXMsIHNvIHRoYXQgdGhleSBjYW4gdXNlIGV2ZW50XG4gKiBkaXNwYXRjaGluZyBhcyBhIHRvb2wgdGhhdCBoZWxwcyB0aGVtIGRlY2lkZSB3aGljaCBldmVudHMgc2hvdWxkIGJlIGV4dHJhY3RlZFxuICogaW4gdGhlIGZpcnN0IHBsYWNlLlxuICpcbiAqIFwiT24tRGVtYW5kLURpc3BhdGNoZWQgRXZlbnRzXCI6XG4gKlxuICogLSBPbi1kZW1hbmQtZGlzcGF0Y2hlZCBldmVudHMgYXJlIG5vdCByZXR1cm5lZCBmcm9tIGBleHRyYWN0RXZlbnRzYC5cbiAqIC0gT24tZGVtYW5kLWRpc3BhdGNoZWQgZXZlbnRzIGFyZSBkaXNwYXRjaGVkIGR1cmluZyB0aGUgcHJvY2VzcyBvZiByZXR1cm5pbmdcbiAqICAgdGhlIGRlZmVycmVkLWRpc3BhdGNoZWQgZXZlbnRzLlxuICogLSBUaGV5IHNob3VsZCBub3QgaGF2ZSBzaWRlIGVmZmVjdHMuXG4gKiAtIFRoZXkgc2hvdWxkIGJlIGF2b2lkZWQsIGFuZC9vciBldmVudHVhbGx5IGJlIHJlcGxhY2VkIHdpdGggYW5vdGhlclxuICogICBhYnN0cmFjdGlvbiB0aGF0IGFsbG93cyBldmVudCBwbHVnaW5zIHRvIHBlcmZvcm0gbXVsdGlwbGUgXCJyb3VuZHNcIiBvZiBldmVudFxuICogICBleHRyYWN0aW9uLlxuICpcbiAqIFRoZXJlZm9yZSwgdGhlIHNlcXVlbmNlIG9mIGV2ZW50IGRpc3BhdGNoZXMgYmVjb21lczpcbiAqXG4gKiAtIGBSYHMgb24tZGVtYW5kIGV2ZW50cyAoaWYgYW55KSAgIChkaXNwYXRjaGVkIGJ5IGBSYCBvbi1kZW1hbmQpXG4gKiAtIGBTYHMgb24tZGVtYW5kIGV2ZW50cyAoaWYgYW55KSAgIChkaXNwYXRjaGVkIGJ5IGBTYCBvbi1kZW1hbmQpXG4gKiAtIGBDYHMgb24tZGVtYW5kIGV2ZW50cyAoaWYgYW55KSAgIChkaXNwYXRjaGVkIGJ5IGBDYCBvbi1kZW1hbmQpXG4gKiAtIGBSYHMgZXh0cmFjdGVkIGV2ZW50cyAoaWYgYW55KSAgIChkaXNwYXRjaGVkIGJ5IGBFdmVudFBsdWdpbkh1YmApXG4gKiAtIGBTYHMgZXh0cmFjdGVkIGV2ZW50cyAoaWYgYW55KSAgIChkaXNwYXRjaGVkIGJ5IGBFdmVudFBsdWdpbkh1YmApXG4gKiAtIGBDYHMgZXh0cmFjdGVkIGV2ZW50cyAoaWYgYW55KSAgIChkaXNwYXRjaGVkIGJ5IGBFdmVudFBsdWdpbkh1YmApXG4gKlxuICogSW4gdGhlIGNhc2Ugb2YgYFJlc3BvbmRlckV2ZW50UGx1Z2luYDogSWYgdGhlIGBzdGFydFNob3VsZFNldFJlc3BvbmRlcmBcbiAqIG9uLWRlbWFuZCBkaXNwYXRjaCByZXR1cm5zIGB0cnVlYCAoYW5kIHNvbWUgb3RoZXIgZGV0YWlscyBhcmUgc2F0aXNmaWVkKSB0aGVcbiAqIGBvblJlc3BvbmRlckdyYW50YCBkZWZlcnJlZCBkaXNwYXRjaGVkIGV2ZW50IGlzIHJldHVybmVkIGZyb21cbiAqIGBleHRyYWN0RXZlbnRzYC4gVGhlIHNlcXVlbmNlIG9mIGRpc3BhdGNoIGV4ZWN1dGlvbnMgaW4gdGhpcyBjYXNlXG4gKiB3aWxsIGFwcGVhciBhcyBmb2xsb3dzOlxuICpcbiAqIC0gYHN0YXJ0U2hvdWxkU2V0UmVzcG9uZGVyYCAoYFJlc3BvbmRlckV2ZW50UGx1Z2luYCBkaXNwYXRjaGVzIG9uLWRlbWFuZClcbiAqIC0gYHRvdWNoU3RhcnRDYXB0dXJlYCAgICAgICAoYEV2ZW50UGx1Z2luSHViYCBkaXNwYXRjaGVzIGFzIHVzdWFsKVxuICogLSBgdG91Y2hTdGFydGAgICAgICAgICAgICAgIChgRXZlbnRQbHVnaW5IdWJgIGRpc3BhdGNoZXMgYXMgdXN1YWwpXG4gKiAtIGByZXNwb25kZXJHcmFudC9SZWplY3RgICAgKGBFdmVudFBsdWdpbkh1YmAgZGlzcGF0Y2hlcyBhcyB1c3VhbClcbiAqL1xuXG5mdW5jdGlvbiBzZXRSZXNwb25kZXJBbmRFeHRyYWN0VHJhbnNmZXIodG9wTGV2ZWxUeXBlLCB0YXJnZXRJbnN0LCBuYXRpdmVFdmVudCwgbmF0aXZlRXZlbnRUYXJnZXQpIHtcbiAgdmFyIHNob3VsZFNldEV2ZW50VHlwZSA9IGlzU3RhcnRpc2godG9wTGV2ZWxUeXBlKSA/IGV2ZW50VHlwZXMuc3RhcnRTaG91bGRTZXRSZXNwb25kZXIgOiBpc01vdmVpc2godG9wTGV2ZWxUeXBlKSA/IGV2ZW50VHlwZXMubW92ZVNob3VsZFNldFJlc3BvbmRlciA6IHRvcExldmVsVHlwZSA9PT0gJ3RvcFNlbGVjdGlvbkNoYW5nZScgPyBldmVudFR5cGVzLnNlbGVjdGlvbkNoYW5nZVNob3VsZFNldFJlc3BvbmRlciA6IGV2ZW50VHlwZXMuc2Nyb2xsU2hvdWxkU2V0UmVzcG9uZGVyO1xuXG4gIC8vIFRPRE86IHN0b3Agb25lIHNob3J0IG9mIHRoZSBjdXJyZW50IHJlc3BvbmRlci5cbiAgdmFyIGJ1YmJsZVNob3VsZFNldEZyb20gPSAhcmVzcG9uZGVySW5zdCA/IHRhcmdldEluc3QgOiBFdmVudFBsdWdpblV0aWxzLmdldExvd2VzdENvbW1vbkFuY2VzdG9yKHJlc3BvbmRlckluc3QsIHRhcmdldEluc3QpO1xuXG4gIC8vIFdoZW4gY2FwdHVyaW5nL2J1YmJsaW5nIHRoZSBcInNob3VsZFNldFwiIGV2ZW50LCB3ZSB3YW50IHRvIHNraXAgdGhlIHRhcmdldFxuICAvLyAoZGVlcGVzdCBJRCkgaWYgaXQgaGFwcGVucyB0byBiZSB0aGUgY3VycmVudCByZXNwb25kZXIuIFRoZSByZWFzb25pbmc6XG4gIC8vIEl0J3Mgc3RyYW5nZSB0byBnZXQgYW4gYG9uTW92ZVNob3VsZFNldFJlc3BvbmRlcmAgd2hlbiB5b3UncmUgKmFscmVhZHkqXG4gIC8vIHRoZSByZXNwb25kZXIuXG4gIHZhciBza2lwT3ZlckJ1YmJsZVNob3VsZFNldEZyb20gPSBidWJibGVTaG91bGRTZXRGcm9tID09PSByZXNwb25kZXJJbnN0O1xuICB2YXIgc2hvdWxkU2V0RXZlbnQgPSBSZXNwb25kZXJTeW50aGV0aWNFdmVudC5nZXRQb29sZWQoc2hvdWxkU2V0RXZlbnRUeXBlLCBidWJibGVTaG91bGRTZXRGcm9tLCBuYXRpdmVFdmVudCwgbmF0aXZlRXZlbnRUYXJnZXQpO1xuICBzaG91bGRTZXRFdmVudC50b3VjaEhpc3RvcnkgPSBSZXNwb25kZXJUb3VjaEhpc3RvcnlTdG9yZS50b3VjaEhpc3Rvcnk7XG4gIGlmIChza2lwT3ZlckJ1YmJsZVNob3VsZFNldEZyb20pIHtcbiAgICBFdmVudFByb3BhZ2F0b3JzLmFjY3VtdWxhdGVUd29QaGFzZURpc3BhdGNoZXNTa2lwVGFyZ2V0KHNob3VsZFNldEV2ZW50KTtcbiAgfSBlbHNlIHtcbiAgICBFdmVudFByb3BhZ2F0b3JzLmFjY3VtdWxhdGVUd29QaGFzZURpc3BhdGNoZXMoc2hvdWxkU2V0RXZlbnQpO1xuICB9XG4gIHZhciB3YW50c1Jlc3BvbmRlckluc3QgPSBleGVjdXRlRGlzcGF0Y2hlc0luT3JkZXJTdG9wQXRUcnVlKHNob3VsZFNldEV2ZW50KTtcbiAgaWYgKCFzaG91bGRTZXRFdmVudC5pc1BlcnNpc3RlbnQoKSkge1xuICAgIHNob3VsZFNldEV2ZW50LmNvbnN0cnVjdG9yLnJlbGVhc2Uoc2hvdWxkU2V0RXZlbnQpO1xuICB9XG5cbiAgaWYgKCF3YW50c1Jlc3BvbmRlckluc3QgfHwgd2FudHNSZXNwb25kZXJJbnN0ID09PSByZXNwb25kZXJJbnN0KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIGV4dHJhY3RlZDtcbiAgdmFyIGdyYW50RXZlbnQgPSBSZXNwb25kZXJTeW50aGV0aWNFdmVudC5nZXRQb29sZWQoZXZlbnRUeXBlcy5yZXNwb25kZXJHcmFudCwgd2FudHNSZXNwb25kZXJJbnN0LCBuYXRpdmVFdmVudCwgbmF0aXZlRXZlbnRUYXJnZXQpO1xuICBncmFudEV2ZW50LnRvdWNoSGlzdG9yeSA9IFJlc3BvbmRlclRvdWNoSGlzdG9yeVN0b3JlLnRvdWNoSGlzdG9yeTtcblxuICBFdmVudFByb3BhZ2F0b3JzLmFjY3VtdWxhdGVEaXJlY3REaXNwYXRjaGVzKGdyYW50RXZlbnQpO1xuICB2YXIgYmxvY2tIb3N0UmVzcG9uZGVyID0gZXhlY3V0ZURpcmVjdERpc3BhdGNoKGdyYW50RXZlbnQpID09PSB0cnVlO1xuICBpZiAocmVzcG9uZGVySW5zdCkge1xuXG4gICAgdmFyIHRlcm1pbmF0aW9uUmVxdWVzdEV2ZW50ID0gUmVzcG9uZGVyU3ludGhldGljRXZlbnQuZ2V0UG9vbGVkKGV2ZW50VHlwZXMucmVzcG9uZGVyVGVybWluYXRpb25SZXF1ZXN0LCByZXNwb25kZXJJbnN0LCBuYXRpdmVFdmVudCwgbmF0aXZlRXZlbnRUYXJnZXQpO1xuICAgIHRlcm1pbmF0aW9uUmVxdWVzdEV2ZW50LnRvdWNoSGlzdG9yeSA9IFJlc3BvbmRlclRvdWNoSGlzdG9yeVN0b3JlLnRvdWNoSGlzdG9yeTtcbiAgICBFdmVudFByb3BhZ2F0b3JzLmFjY3VtdWxhdGVEaXJlY3REaXNwYXRjaGVzKHRlcm1pbmF0aW9uUmVxdWVzdEV2ZW50KTtcbiAgICB2YXIgc2hvdWxkU3dpdGNoID0gIWhhc0Rpc3BhdGNoZXModGVybWluYXRpb25SZXF1ZXN0RXZlbnQpIHx8IGV4ZWN1dGVEaXJlY3REaXNwYXRjaCh0ZXJtaW5hdGlvblJlcXVlc3RFdmVudCk7XG4gICAgaWYgKCF0ZXJtaW5hdGlvblJlcXVlc3RFdmVudC5pc1BlcnNpc3RlbnQoKSkge1xuICAgICAgdGVybWluYXRpb25SZXF1ZXN0RXZlbnQuY29uc3RydWN0b3IucmVsZWFzZSh0ZXJtaW5hdGlvblJlcXVlc3RFdmVudCk7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFN3aXRjaCkge1xuICAgICAgdmFyIHRlcm1pbmF0ZUV2ZW50ID0gUmVzcG9uZGVyU3ludGhldGljRXZlbnQuZ2V0UG9vbGVkKGV2ZW50VHlwZXMucmVzcG9uZGVyVGVybWluYXRlLCByZXNwb25kZXJJbnN0LCBuYXRpdmVFdmVudCwgbmF0aXZlRXZlbnRUYXJnZXQpO1xuICAgICAgdGVybWluYXRlRXZlbnQudG91Y2hIaXN0b3J5ID0gUmVzcG9uZGVyVG91Y2hIaXN0b3J5U3RvcmUudG91Y2hIaXN0b3J5O1xuICAgICAgRXZlbnRQcm9wYWdhdG9ycy5hY2N1bXVsYXRlRGlyZWN0RGlzcGF0Y2hlcyh0ZXJtaW5hdGVFdmVudCk7XG4gICAgICBleHRyYWN0ZWQgPSBhY2N1bXVsYXRlKGV4dHJhY3RlZCwgW2dyYW50RXZlbnQsIHRlcm1pbmF0ZUV2ZW50XSk7XG4gICAgICBjaGFuZ2VSZXNwb25kZXIod2FudHNSZXNwb25kZXJJbnN0LCBibG9ja0hvc3RSZXNwb25kZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcmVqZWN0RXZlbnQgPSBSZXNwb25kZXJTeW50aGV0aWNFdmVudC5nZXRQb29sZWQoZXZlbnRUeXBlcy5yZXNwb25kZXJSZWplY3QsIHdhbnRzUmVzcG9uZGVySW5zdCwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KTtcbiAgICAgIHJlamVjdEV2ZW50LnRvdWNoSGlzdG9yeSA9IFJlc3BvbmRlclRvdWNoSGlzdG9yeVN0b3JlLnRvdWNoSGlzdG9yeTtcbiAgICAgIEV2ZW50UHJvcGFnYXRvcnMuYWNjdW11bGF0ZURpcmVjdERpc3BhdGNoZXMocmVqZWN0RXZlbnQpO1xuICAgICAgZXh0cmFjdGVkID0gYWNjdW11bGF0ZShleHRyYWN0ZWQsIHJlamVjdEV2ZW50KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZXh0cmFjdGVkID0gYWNjdW11bGF0ZShleHRyYWN0ZWQsIGdyYW50RXZlbnQpO1xuICAgIGNoYW5nZVJlc3BvbmRlcih3YW50c1Jlc3BvbmRlckluc3QsIGJsb2NrSG9zdFJlc3BvbmRlcik7XG4gIH1cbiAgcmV0dXJuIGV4dHJhY3RlZDtcbn1cblxuLyoqXG4gKiBBIHRyYW5zZmVyIGlzIGEgbmVnb3RpYXRpb24gYmV0d2VlbiBhIGN1cnJlbnRseSBzZXQgcmVzcG9uZGVyIGFuZCB0aGUgbmV4dFxuICogZWxlbWVudCB0byBjbGFpbSByZXNwb25kZXIgc3RhdHVzLiBBbnkgc3RhcnQgZXZlbnQgY291bGQgdHJpZ2dlciBhIHRyYW5zZmVyXG4gKiBvZiByZXNwb25kZXJJbnN0LiBBbnkgbW92ZSBldmVudCBjb3VsZCB0cmlnZ2VyIGEgdHJhbnNmZXIuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRvcExldmVsVHlwZSBSZWNvcmQgZnJvbSBgRXZlbnRDb25zdGFudHNgLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBhIHRyYW5zZmVyIG9mIHJlc3BvbmRlciBjb3VsZCBwb3NzaWJseSBvY2N1ci5cbiAqL1xuZnVuY3Rpb24gY2FuVHJpZ2dlclRyYW5zZmVyKHRvcExldmVsVHlwZSwgdG9wTGV2ZWxJbnN0LCBuYXRpdmVFdmVudCkge1xuICByZXR1cm4gdG9wTGV2ZWxJbnN0ICYmIChcbiAgLy8gcmVzcG9uZGVySWdub3JlU2Nyb2xsOiBXZSBhcmUgdHJ5aW5nIHRvIG1pZ3JhdGUgYXdheSBmcm9tIHNwZWNpZmljYWxseVxuICAvLyB0cmFja2luZyBuYXRpdmUgc2Nyb2xsIGV2ZW50cyBoZXJlIGFuZCByZXNwb25kZXJJZ25vcmVTY3JvbGwgaW5kaWNhdGVzIHdlXG4gIC8vIHdpbGwgc2VuZCB0b3BUb3VjaENhbmNlbCB0byBoYW5kbGUgY2FuY2VsaW5nIHRvdWNoIGV2ZW50cyBpbnN0ZWFkXG4gIHRvcExldmVsVHlwZSA9PT0gJ3RvcFNjcm9sbCcgJiYgIW5hdGl2ZUV2ZW50LnJlc3BvbmRlcklnbm9yZVNjcm9sbCB8fCB0cmFja2VkVG91Y2hDb3VudCA+IDAgJiYgdG9wTGV2ZWxUeXBlID09PSAndG9wU2VsZWN0aW9uQ2hhbmdlJyB8fCBpc1N0YXJ0aXNoKHRvcExldmVsVHlwZSkgfHwgaXNNb3ZlaXNoKHRvcExldmVsVHlwZSkpO1xufVxuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhpcyB0b3VjaCBlbmQgZXZlbnQgbWFrZXMgaXQgc3VjaCB0aGF0IHRoZXJlIGFyZSBub1xuICogbG9uZ2VyIGFueSB0b3VjaGVzIHRoYXQgc3RhcnRlZCBpbnNpZGUgb2YgdGhlIGN1cnJlbnQgYHJlc3BvbmRlckluc3RgLlxuICpcbiAqIEBwYXJhbSB7TmF0aXZlRXZlbnR9IG5hdGl2ZUV2ZW50IE5hdGl2ZSB0b3VjaCBlbmQgZXZlbnQuXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGlzIHRvdWNoIGVuZCBldmVudCBlbmRzIHRoZSByZXNwb25kZXIuXG4gKi9cbmZ1bmN0aW9uIG5vUmVzcG9uZGVyVG91Y2hlcyhuYXRpdmVFdmVudCkge1xuICB2YXIgdG91Y2hlcyA9IG5hdGl2ZUV2ZW50LnRvdWNoZXM7XG4gIGlmICghdG91Y2hlcyB8fCB0b3VjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBhY3RpdmVUb3VjaCA9IHRvdWNoZXNbaV07XG4gICAgdmFyIHRhcmdldCA9IGFjdGl2ZVRvdWNoLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0ICE9PSBudWxsICYmIHRhcmdldCAhPT0gdW5kZWZpbmVkICYmIHRhcmdldCAhPT0gMCkge1xuICAgICAgLy8gSXMgdGhlIG9yaWdpbmFsIHRvdWNoIGxvY2F0aW9uIGluc2lkZSBvZiB0aGUgY3VycmVudCByZXNwb25kZXI/XG4gICAgICB2YXIgdGFyZ2V0SW5zdCA9IEV2ZW50UGx1Z2luVXRpbHMuZ2V0SW5zdGFuY2VGcm9tTm9kZSh0YXJnZXQpO1xuICAgICAgaWYgKEV2ZW50UGx1Z2luVXRpbHMuaXNBbmNlc3RvcihyZXNwb25kZXJJbnN0LCB0YXJnZXRJbnN0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG52YXIgUmVzcG9uZGVyRXZlbnRQbHVnaW4gPSB7XG5cbiAgLyogRm9yIHVuaXQgdGVzdGluZyBvbmx5ICovXG4gIF9nZXRSZXNwb25kZXJJRDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByZXNwb25kZXJJbnN0ID8gcmVzcG9uZGVySW5zdC5fcm9vdE5vZGVJRCA6IG51bGw7XG4gIH0sXG5cbiAgZXZlbnRUeXBlczogZXZlbnRUeXBlcyxcblxuICAvKipcbiAgICogV2UgbXVzdCBiZSByZXNpbGllbnQgdG8gYHRhcmdldEluc3RgIGJlaW5nIGBudWxsYCBvbiBgdG91Y2hNb3ZlYCBvclxuICAgKiBgdG91Y2hFbmRgLiBPbiBjZXJ0YWluIHBsYXRmb3JtcywgdGhpcyBtZWFucyB0aGF0IGEgbmF0aXZlIHNjcm9sbCBoYXNcbiAgICogYXNzdW1lZCBjb250cm9sIGFuZCB0aGUgb3JpZ2luYWwgdG91Y2ggdGFyZ2V0cyBhcmUgZGVzdHJveWVkLlxuICAgKi9cbiAgZXh0cmFjdEV2ZW50czogZnVuY3Rpb24gKHRvcExldmVsVHlwZSwgdGFyZ2V0SW5zdCwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KSB7XG4gICAgaWYgKGlzU3RhcnRpc2godG9wTGV2ZWxUeXBlKSkge1xuICAgICAgdHJhY2tlZFRvdWNoQ291bnQgKz0gMTtcbiAgICB9IGVsc2UgaWYgKGlzRW5kaXNoKHRvcExldmVsVHlwZSkpIHtcbiAgICAgIGlmICh0cmFja2VkVG91Y2hDb3VudCA+PSAwKSB7XG4gICAgICAgIHRyYWNrZWRUb3VjaENvdW50IC09IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFbmRlZCBhIHRvdWNoIGV2ZW50IHdoaWNoIHdhcyBub3QgY291bnRlZCBpbiBgdHJhY2tlZFRvdWNoQ291bnRgLicpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBSZXNwb25kZXJUb3VjaEhpc3RvcnlTdG9yZS5yZWNvcmRUb3VjaFRyYWNrKHRvcExldmVsVHlwZSwgbmF0aXZlRXZlbnQpO1xuXG4gICAgdmFyIGV4dHJhY3RlZCA9IGNhblRyaWdnZXJUcmFuc2Zlcih0b3BMZXZlbFR5cGUsIHRhcmdldEluc3QsIG5hdGl2ZUV2ZW50KSA/IHNldFJlc3BvbmRlckFuZEV4dHJhY3RUcmFuc2Zlcih0b3BMZXZlbFR5cGUsIHRhcmdldEluc3QsIG5hdGl2ZUV2ZW50LCBuYXRpdmVFdmVudFRhcmdldCkgOiBudWxsO1xuICAgIC8vIFJlc3BvbmRlciBtYXkgb3IgbWF5IG5vdCBoYXZlIHRyYW5zZmVycmVkIG9uIGEgbmV3IHRvdWNoIHN0YXJ0L21vdmUuXG4gICAgLy8gUmVnYXJkbGVzcywgd2hvZXZlciBpcyB0aGUgcmVzcG9uZGVyIGFmdGVyIGFueSBwb3RlbnRpYWwgdHJhbnNmZXIsIHdlXG4gICAgLy8gZGlyZWN0IGFsbCB0b3VjaCBzdGFydC9tb3ZlL2VuZHMgdG8gdGhlbSBpbiB0aGUgZm9ybSBvZlxuICAgIC8vIGBvblJlc3BvbmRlck1vdmUvU3RhcnQvRW5kYC4gVGhlc2Ugd2lsbCBiZSBjYWxsZWQgZm9yICpldmVyeSogYWRkaXRpb25hbFxuICAgIC8vIGZpbmdlciB0aGF0IG1vdmUvc3RhcnQvZW5kLCBkaXNwYXRjaGVkIGRpcmVjdGx5IHRvIHdob2V2ZXIgaXMgdGhlXG4gICAgLy8gY3VycmVudCByZXNwb25kZXIgYXQgdGhhdCBtb21lbnQsIHVudGlsIHRoZSByZXNwb25kZXIgaXMgXCJyZWxlYXNlZFwiLlxuICAgIC8vXG4gICAgLy8gVGhlc2UgbXVsdGlwbGUgaW5kaXZpZHVhbCBjaGFuZ2UgdG91Y2ggZXZlbnRzIGFyZSBhcmUgYWx3YXlzIGJvb2tlbmRlZFxuICAgIC8vIGJ5IGBvblJlc3BvbmRlckdyYW50YCwgYW5kIG9uZSBvZlxuICAgIC8vIChgb25SZXNwb25kZXJSZWxlYXNlL29uUmVzcG9uZGVyVGVybWluYXRlYCkuXG4gICAgdmFyIGlzUmVzcG9uZGVyVG91Y2hTdGFydCA9IHJlc3BvbmRlckluc3QgJiYgaXNTdGFydGlzaCh0b3BMZXZlbFR5cGUpO1xuICAgIHZhciBpc1Jlc3BvbmRlclRvdWNoTW92ZSA9IHJlc3BvbmRlckluc3QgJiYgaXNNb3ZlaXNoKHRvcExldmVsVHlwZSk7XG4gICAgdmFyIGlzUmVzcG9uZGVyVG91Y2hFbmQgPSByZXNwb25kZXJJbnN0ICYmIGlzRW5kaXNoKHRvcExldmVsVHlwZSk7XG4gICAgdmFyIGluY3JlbWVudGFsVG91Y2ggPSBpc1Jlc3BvbmRlclRvdWNoU3RhcnQgPyBldmVudFR5cGVzLnJlc3BvbmRlclN0YXJ0IDogaXNSZXNwb25kZXJUb3VjaE1vdmUgPyBldmVudFR5cGVzLnJlc3BvbmRlck1vdmUgOiBpc1Jlc3BvbmRlclRvdWNoRW5kID8gZXZlbnRUeXBlcy5yZXNwb25kZXJFbmQgOiBudWxsO1xuXG4gICAgaWYgKGluY3JlbWVudGFsVG91Y2gpIHtcbiAgICAgIHZhciBnZXN0dXJlID0gUmVzcG9uZGVyU3ludGhldGljRXZlbnQuZ2V0UG9vbGVkKGluY3JlbWVudGFsVG91Y2gsIHJlc3BvbmRlckluc3QsIG5hdGl2ZUV2ZW50LCBuYXRpdmVFdmVudFRhcmdldCk7XG4gICAgICBnZXN0dXJlLnRvdWNoSGlzdG9yeSA9IFJlc3BvbmRlclRvdWNoSGlzdG9yeVN0b3JlLnRvdWNoSGlzdG9yeTtcbiAgICAgIEV2ZW50UHJvcGFnYXRvcnMuYWNjdW11bGF0ZURpcmVjdERpc3BhdGNoZXMoZ2VzdHVyZSk7XG4gICAgICBleHRyYWN0ZWQgPSBhY2N1bXVsYXRlKGV4dHJhY3RlZCwgZ2VzdHVyZSk7XG4gICAgfVxuXG4gICAgdmFyIGlzUmVzcG9uZGVyVGVybWluYXRlID0gcmVzcG9uZGVySW5zdCAmJiB0b3BMZXZlbFR5cGUgPT09ICd0b3BUb3VjaENhbmNlbCc7XG4gICAgdmFyIGlzUmVzcG9uZGVyUmVsZWFzZSA9IHJlc3BvbmRlckluc3QgJiYgIWlzUmVzcG9uZGVyVGVybWluYXRlICYmIGlzRW5kaXNoKHRvcExldmVsVHlwZSkgJiYgbm9SZXNwb25kZXJUb3VjaGVzKG5hdGl2ZUV2ZW50KTtcbiAgICB2YXIgZmluYWxUb3VjaCA9IGlzUmVzcG9uZGVyVGVybWluYXRlID8gZXZlbnRUeXBlcy5yZXNwb25kZXJUZXJtaW5hdGUgOiBpc1Jlc3BvbmRlclJlbGVhc2UgPyBldmVudFR5cGVzLnJlc3BvbmRlclJlbGVhc2UgOiBudWxsO1xuICAgIGlmIChmaW5hbFRvdWNoKSB7XG4gICAgICB2YXIgZmluYWxFdmVudCA9IFJlc3BvbmRlclN5bnRoZXRpY0V2ZW50LmdldFBvb2xlZChmaW5hbFRvdWNoLCByZXNwb25kZXJJbnN0LCBuYXRpdmVFdmVudCwgbmF0aXZlRXZlbnRUYXJnZXQpO1xuICAgICAgZmluYWxFdmVudC50b3VjaEhpc3RvcnkgPSBSZXNwb25kZXJUb3VjaEhpc3RvcnlTdG9yZS50b3VjaEhpc3Rvcnk7XG4gICAgICBFdmVudFByb3BhZ2F0b3JzLmFjY3VtdWxhdGVEaXJlY3REaXNwYXRjaGVzKGZpbmFsRXZlbnQpO1xuICAgICAgZXh0cmFjdGVkID0gYWNjdW11bGF0ZShleHRyYWN0ZWQsIGZpbmFsRXZlbnQpO1xuICAgICAgY2hhbmdlUmVzcG9uZGVyKG51bGwpO1xuICAgIH1cblxuICAgIHZhciBudW1iZXJBY3RpdmVUb3VjaGVzID0gUmVzcG9uZGVyVG91Y2hIaXN0b3J5U3RvcmUudG91Y2hIaXN0b3J5Lm51bWJlckFjdGl2ZVRvdWNoZXM7XG4gICAgaWYgKFJlc3BvbmRlckV2ZW50UGx1Z2luLkdsb2JhbEludGVyYWN0aW9uSGFuZGxlciAmJiBudW1iZXJBY3RpdmVUb3VjaGVzICE9PSBwcmV2aW91c0FjdGl2ZVRvdWNoZXMpIHtcbiAgICAgIFJlc3BvbmRlckV2ZW50UGx1Z2luLkdsb2JhbEludGVyYWN0aW9uSGFuZGxlci5vbkNoYW5nZShudW1iZXJBY3RpdmVUb3VjaGVzKTtcbiAgICB9XG4gICAgcHJldmlvdXNBY3RpdmVUb3VjaGVzID0gbnVtYmVyQWN0aXZlVG91Y2hlcztcblxuICAgIHJldHVybiBleHRyYWN0ZWQ7XG4gIH0sXG5cbiAgR2xvYmFsUmVzcG9uZGVySGFuZGxlcjogbnVsbCxcbiAgR2xvYmFsSW50ZXJhY3Rpb25IYW5kbGVyOiBudWxsLFxuXG4gIGluamVjdGlvbjoge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e29uQ2hhbmdlOiAoUmVhY3RJRCwgUmVhY3RJRCkgPT4gdm9pZH0gR2xvYmFsUmVzcG9uZGVySGFuZGxlclxuICAgICAqIE9iamVjdCB0aGF0IGhhbmRsZXMgYW55IGNoYW5nZSBpbiByZXNwb25kZXIuIFVzZSB0aGlzIHRvIGluamVjdFxuICAgICAqIGludGVncmF0aW9uIHdpdGggYW4gZXhpc3RpbmcgdG91Y2ggaGFuZGxpbmcgc3lzdGVtIGV0Yy5cbiAgICAgKi9cbiAgICBpbmplY3RHbG9iYWxSZXNwb25kZXJIYW5kbGVyOiBmdW5jdGlvbiAoR2xvYmFsUmVzcG9uZGVySGFuZGxlcikge1xuICAgICAgUmVzcG9uZGVyRXZlbnRQbHVnaW4uR2xvYmFsUmVzcG9uZGVySGFuZGxlciA9IEdsb2JhbFJlc3BvbmRlckhhbmRsZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7e29uQ2hhbmdlOiAobnVtYmVyQWN0aXZlVG91Y2hlcykgPT4gdm9pZH0gR2xvYmFsSW50ZXJhY3Rpb25IYW5kbGVyXG4gICAgICogT2JqZWN0IHRoYXQgaGFuZGxlcyBhbnkgY2hhbmdlIGluIHRoZSBudW1iZXIgb2YgYWN0aXZlIHRvdWNoZXMuXG4gICAgICovXG4gICAgaW5qZWN0R2xvYmFsSW50ZXJhY3Rpb25IYW5kbGVyOiBmdW5jdGlvbiAoR2xvYmFsSW50ZXJhY3Rpb25IYW5kbGVyKSB7XG4gICAgICBSZXNwb25kZXJFdmVudFBsdWdpbi5HbG9iYWxJbnRlcmFjdGlvbkhhbmRsZXIgPSBHbG9iYWxJbnRlcmFjdGlvbkhhbmRsZXI7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3BvbmRlckV2ZW50UGx1Z2luOyJdfQ==