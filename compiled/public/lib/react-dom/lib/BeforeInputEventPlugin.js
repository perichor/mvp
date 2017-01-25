/**
 * Copyright 2013-present Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var EventPropagators = require('./EventPropagators');
var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
var FallbackCompositionState = require('./FallbackCompositionState');
var SyntheticCompositionEvent = require('./SyntheticCompositionEvent');
var SyntheticInputEvent = require('./SyntheticInputEvent');

var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
var START_KEYCODE = 229;

var canUseCompositionEvent = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;

var documentMode = null;
if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
  documentMode = document.documentMode;
}

// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var canUseTextInputEvent = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto();

// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
var useFallbackCompositionData = ExecutionEnvironment.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);

/**
 * Opera <= 12 includes TextEvent in window, but does not fire
 * text input events. Rely on keypress instead.
 */
function isPresto() {
  var opera = window.opera;
  return (typeof opera === 'undefined' ? 'undefined' : _typeof(opera)) === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
}

var SPACEBAR_CODE = 32;
var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

// Events and their corresponding property names.
var eventTypes = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: 'onBeforeInput',
      captured: 'onBeforeInputCapture'
    },
    dependencies: ['topCompositionEnd', 'topKeyPress', 'topTextInput', 'topPaste']
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionEnd',
      captured: 'onCompositionEndCapture'
    },
    dependencies: ['topBlur', 'topCompositionEnd', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionStart',
      captured: 'onCompositionStartCapture'
    },
    dependencies: ['topBlur', 'topCompositionStart', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionUpdate',
      captured: 'onCompositionUpdateCapture'
    },
    dependencies: ['topBlur', 'topCompositionUpdate', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  }
};

// Track whether we've ever handled a keypress on the space key.
var hasSpaceKeypress = false;

/**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */
function isKeypressCommand(nativeEvent) {
  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
  // ctrlKey && altKey is equivalent to AltGr, and is not a command.
  !(nativeEvent.ctrlKey && nativeEvent.altKey);
}

/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */
function getCompositionEventType(topLevelType) {
  switch (topLevelType) {
    case 'topCompositionStart':
      return eventTypes.compositionStart;
    case 'topCompositionEnd':
      return eventTypes.compositionEnd;
    case 'topCompositionUpdate':
      return eventTypes.compositionUpdate;
  }
}

/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionStart(topLevelType, nativeEvent) {
  return topLevelType === 'topKeyDown' && nativeEvent.keyCode === START_KEYCODE;
}

/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case 'topKeyUp':
      // Command keys insert or clear IME input.
      return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
    case 'topKeyDown':
      // Expect IME keyCode on each keydown. If we get any other
      // code we must have exited earlier.
      return nativeEvent.keyCode !== START_KEYCODE;
    case 'topKeyPress':
    case 'topMouseDown':
    case 'topBlur':
      // Events are not possible without cancelling IME.
      return true;
    default:
      return false;
  }
}

/**
 * Google Input Tools provides composition data via a CustomEvent,
 * with the `data` property populated in the `detail` object. If this
 * is available on the event object, use it. If not, this is a plain
 * composition event and we have nothing special to extract.
 *
 * @param {object} nativeEvent
 * @return {?string}
 */
function getDataFromCustomEvent(nativeEvent) {
  var detail = nativeEvent.detail;
  if ((typeof detail === 'undefined' ? 'undefined' : _typeof(detail)) === 'object' && 'data' in detail) {
    return detail.data;
  }
  return null;
}

// Track the current IME composition fallback object, if any.
var currentComposition = null;

/**
 * @return {?object} A SyntheticCompositionEvent.
 */
function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var eventType;
  var fallbackData;

  if (canUseCompositionEvent) {
    eventType = getCompositionEventType(topLevelType);
  } else if (!currentComposition) {
    if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionStart;
    }
  } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
    eventType = eventTypes.compositionEnd;
  }

  if (!eventType) {
    return null;
  }

  if (useFallbackCompositionData) {
    // The current composition is stored statically and must not be
    // overwritten while composition continues.
    if (!currentComposition && eventType === eventTypes.compositionStart) {
      currentComposition = FallbackCompositionState.getPooled(nativeEventTarget);
    } else if (eventType === eventTypes.compositionEnd) {
      if (currentComposition) {
        fallbackData = currentComposition.getData();
      }
    }
  }

  var event = SyntheticCompositionEvent.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);

  if (fallbackData) {
    // Inject data generated from fallback path into the synthetic event.
    // This matches the property of native CompositionEventInterface.
    event.data = fallbackData;
  } else {
    var customData = getDataFromCustomEvent(nativeEvent);
    if (customData !== null) {
      event.data = customData;
    }
  }

  EventPropagators.accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The string corresponding to this `beforeInput` event.
 */
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case 'topCompositionEnd':
      return getDataFromCustomEvent(nativeEvent);
    case 'topKeyPress':
      /**
       * If native `textInput` events are available, our goal is to make
       * use of them. However, there is a special case: the spacebar key.
       * In Webkit, preventing default on a spacebar `textInput` event
       * cancels character insertion, but it *also* causes the browser
       * to fall back to its default spacebar behavior of scrolling the
       * page.
       *
       * Tracking at:
       * https://code.google.com/p/chromium/issues/detail?id=355103
       *
       * To avoid this issue, use the keypress event as if no `textInput`
       * event is available.
       */
      var which = nativeEvent.which;
      if (which !== SPACEBAR_CODE) {
        return null;
      }

      hasSpaceKeypress = true;
      return SPACEBAR_CHAR;

    case 'topTextInput':
      // Record the characters to be added to the DOM.
      var chars = nativeEvent.data;

      // If it's a spacebar character, assume that we have already handled
      // it at the keypress level and bail immediately. Android Chrome
      // doesn't give us keycodes, so we need to blacklist it.
      if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
        return null;
      }

      return chars;

    default:
      // For other native event types, do nothing.
      return null;
  }
}

/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The fallback string for this `beforeInput` event.
 */
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  // If we are currently composing (IME) and using a fallback to do so,
  // try to extract the composed characters from the fallback object.
  // If composition event is available, we extract a string only at
  // compositionevent, otherwise extract it at fallback events.
  if (currentComposition) {
    if (topLevelType === 'topCompositionEnd' || !canUseCompositionEvent && isFallbackCompositionEnd(topLevelType, nativeEvent)) {
      var chars = currentComposition.getData();
      FallbackCompositionState.release(currentComposition);
      currentComposition = null;
      return chars;
    }
    return null;
  }

  switch (topLevelType) {
    case 'topPaste':
      // If a paste event occurs after a keypress, throw out the input
      // chars. Paste events should not lead to BeforeInput events.
      return null;
    case 'topKeyPress':
      /**
       * As of v27, Firefox may fire keypress events even when no character
       * will be inserted. A few possibilities:
       *
       * - `which` is `0`. Arrow keys, Esc key, etc.
       *
       * - `which` is the pressed key code, but no char is available.
       *   Ex: 'AltGr + d` in Polish. There is no modified character for
       *   this key combination and no character is inserted into the
       *   document, but FF fires the keypress for char code `100` anyway.
       *   No `input` event will occur.
       *
       * - `which` is the pressed key code, but a command combination is
       *   being used. Ex: `Cmd+C`. No character is inserted, and no
       *   `input` event will occur.
       */
      if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
        return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case 'topCompositionEnd':
      return useFallbackCompositionData ? null : nativeEvent.data;
    default:
      return null;
  }
}

/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @return {?object} A SyntheticInputEvent.
 */
function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var chars;

  if (canUseTextInputEvent) {
    chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
  } else {
    chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
  }

  // If no characters are being inserted, no BeforeInput event should
  // be fired.
  if (!chars) {
    return null;
  }

  var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget);

  event.data = chars;
  EventPropagators.accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * Create an `onBeforeInput` event to match
 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
 *
 * This event plugin is based on the native `textInput` event
 * available in Chrome, Safari, Opera, and IE. This event fires after
 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
 *
 * `beforeInput` is spec'd but not implemented in any browsers, and
 * the `input` event does not provide any useful information about what has
 * actually been added, contrary to the spec. Thus, `textInput` is the best
 * available event to identify the characters that have actually been inserted
 * into the target node.
 *
 * This plugin is also responsible for emitting `composition` events, thus
 * allowing us to share composition fallback code for both `beforeInput` and
 * `composition` event types.
 */
var BeforeInputEventPlugin = {

  eventTypes: eventTypes,

  extractEvents: function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    return [extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget), extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget)];
  }
};

module.exports = BeforeInputEventPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9CZWZvcmVJbnB1dEV2ZW50UGx1Z2luLmpzIl0sIm5hbWVzIjpbIkV2ZW50UHJvcGFnYXRvcnMiLCJyZXF1aXJlIiwiRXhlY3V0aW9uRW52aXJvbm1lbnQiLCJGYWxsYmFja0NvbXBvc2l0aW9uU3RhdGUiLCJTeW50aGV0aWNDb21wb3NpdGlvbkV2ZW50IiwiU3ludGhldGljSW5wdXRFdmVudCIsIkVORF9LRVlDT0RFUyIsIlNUQVJUX0tFWUNPREUiLCJjYW5Vc2VDb21wb3NpdGlvbkV2ZW50IiwiY2FuVXNlRE9NIiwid2luZG93IiwiZG9jdW1lbnRNb2RlIiwiZG9jdW1lbnQiLCJjYW5Vc2VUZXh0SW5wdXRFdmVudCIsImlzUHJlc3RvIiwidXNlRmFsbGJhY2tDb21wb3NpdGlvbkRhdGEiLCJvcGVyYSIsInZlcnNpb24iLCJwYXJzZUludCIsIlNQQUNFQkFSX0NPREUiLCJTUEFDRUJBUl9DSEFSIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiZXZlbnRUeXBlcyIsImJlZm9yZUlucHV0IiwicGhhc2VkUmVnaXN0cmF0aW9uTmFtZXMiLCJidWJibGVkIiwiY2FwdHVyZWQiLCJkZXBlbmRlbmNpZXMiLCJjb21wb3NpdGlvbkVuZCIsImNvbXBvc2l0aW9uU3RhcnQiLCJjb21wb3NpdGlvblVwZGF0ZSIsImhhc1NwYWNlS2V5cHJlc3MiLCJpc0tleXByZXNzQ29tbWFuZCIsIm5hdGl2ZUV2ZW50IiwiY3RybEtleSIsImFsdEtleSIsIm1ldGFLZXkiLCJnZXRDb21wb3NpdGlvbkV2ZW50VHlwZSIsInRvcExldmVsVHlwZSIsImlzRmFsbGJhY2tDb21wb3NpdGlvblN0YXJ0Iiwia2V5Q29kZSIsImlzRmFsbGJhY2tDb21wb3NpdGlvbkVuZCIsImluZGV4T2YiLCJnZXREYXRhRnJvbUN1c3RvbUV2ZW50IiwiZGV0YWlsIiwiZGF0YSIsImN1cnJlbnRDb21wb3NpdGlvbiIsImV4dHJhY3RDb21wb3NpdGlvbkV2ZW50IiwidGFyZ2V0SW5zdCIsIm5hdGl2ZUV2ZW50VGFyZ2V0IiwiZXZlbnRUeXBlIiwiZmFsbGJhY2tEYXRhIiwiZ2V0UG9vbGVkIiwiZ2V0RGF0YSIsImV2ZW50IiwiY3VzdG9tRGF0YSIsImFjY3VtdWxhdGVUd29QaGFzZURpc3BhdGNoZXMiLCJnZXROYXRpdmVCZWZvcmVJbnB1dENoYXJzIiwid2hpY2giLCJjaGFycyIsImdldEZhbGxiYWNrQmVmb3JlSW5wdXRDaGFycyIsInJlbGVhc2UiLCJleHRyYWN0QmVmb3JlSW5wdXRFdmVudCIsIkJlZm9yZUlucHV0RXZlbnRQbHVnaW4iLCJleHRyYWN0RXZlbnRzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7OztBQUVBLElBQUlBLG1CQUFtQkMsUUFBUSxvQkFBUixDQUF2QjtBQUNBLElBQUlDLHVCQUF1QkQsUUFBUSwrQkFBUixDQUEzQjtBQUNBLElBQUlFLDJCQUEyQkYsUUFBUSw0QkFBUixDQUEvQjtBQUNBLElBQUlHLDRCQUE0QkgsUUFBUSw2QkFBUixDQUFoQztBQUNBLElBQUlJLHNCQUFzQkosUUFBUSx1QkFBUixDQUExQjs7QUFFQSxJQUFJSyxlQUFlLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixDQUFuQixDLENBQW9DO0FBQ3BDLElBQUlDLGdCQUFnQixHQUFwQjs7QUFFQSxJQUFJQyx5QkFBeUJOLHFCQUFxQk8sU0FBckIsSUFBa0Msc0JBQXNCQyxNQUFyRjs7QUFFQSxJQUFJQyxlQUFlLElBQW5CO0FBQ0EsSUFBSVQscUJBQXFCTyxTQUFyQixJQUFrQyxrQkFBa0JHLFFBQXhELEVBQWtFO0FBQ2hFRCxpQkFBZUMsU0FBU0QsWUFBeEI7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxJQUFJRSx1QkFBdUJYLHFCQUFxQk8sU0FBckIsSUFBa0MsZUFBZUMsTUFBakQsSUFBMkQsQ0FBQ0MsWUFBNUQsSUFBNEUsQ0FBQ0csVUFBeEc7O0FBRUE7QUFD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QUFDMEIsS0FBTCxFQUFZO0FBQ1YsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsTUFBSUwsUUFBUWxELG9CQUFvQmdELFNBQXBCLENBQThCOUIsV0FBV0MsV0FBekMsRUFBc0R5QixVQUF0RCxFQUFrRWYsV0FBbEUsRUFBK0VnQixpQkFBL0UsQ0FBWjs7QUFFQUssUUFBTVQsSUFBTixHQUFhYyxLQUFiO0FBQ0E1RCxtQkFBaUJ5RCw0QkFBakIsQ0FBOENGLEtBQTlDO0FBQ0EsU0FBT0EsS0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsSUFBSVMseUJBQXlCOztBQUUzQnpDLGNBQVlBLFVBRmU7O0FBSTNCMEMsaUJBQWUsdUJBQVUxQixZQUFWLEVBQXdCVSxVQUF4QixFQUFvQ2YsV0FBcEMsRUFBaURnQixpQkFBakQsRUFBb0U7QUFDakYsV0FBTyxDQUFDRix3QkFBd0JULFlBQXhCLEVBQXNDVSxVQUF0QyxFQUFrRGYsV0FBbEQsRUFBK0RnQixpQkFBL0QsQ0FBRCxFQUFvRmEsd0JBQXdCeEIsWUFBeEIsRUFBc0NVLFVBQXRDLEVBQWtEZixXQUFsRCxFQUErRGdCLGlCQUEvRCxDQUFwRixDQUFQO0FBQ0Q7QUFOMEIsQ0FBN0I7O0FBU0FnQixPQUFPQyxPQUFQLEdBQWlCSCxzQkFBakIiLCJmaWxlIjoiQmVmb3JlSW5wdXRFdmVudFBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEV2ZW50UHJvcGFnYXRvcnMgPSByZXF1aXJlKCcuL0V2ZW50UHJvcGFnYXRvcnMnKTtcbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHJlcXVpcmUoJ2ZianMvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50Jyk7XG52YXIgRmFsbGJhY2tDb21wb3NpdGlvblN0YXRlID0gcmVxdWlyZSgnLi9GYWxsYmFja0NvbXBvc2l0aW9uU3RhdGUnKTtcbnZhciBTeW50aGV0aWNDb21wb3NpdGlvbkV2ZW50ID0gcmVxdWlyZSgnLi9TeW50aGV0aWNDb21wb3NpdGlvbkV2ZW50Jyk7XG52YXIgU3ludGhldGljSW5wdXRFdmVudCA9IHJlcXVpcmUoJy4vU3ludGhldGljSW5wdXRFdmVudCcpO1xuXG52YXIgRU5EX0tFWUNPREVTID0gWzksIDEzLCAyNywgMzJdOyAvLyBUYWIsIFJldHVybiwgRXNjLCBTcGFjZVxudmFyIFNUQVJUX0tFWUNPREUgPSAyMjk7XG5cbnZhciBjYW5Vc2VDb21wb3NpdGlvbkV2ZW50ID0gRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NICYmICdDb21wb3NpdGlvbkV2ZW50JyBpbiB3aW5kb3c7XG5cbnZhciBkb2N1bWVudE1vZGUgPSBudWxsO1xuaWYgKEV4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSAmJiAnZG9jdW1lbnRNb2RlJyBpbiBkb2N1bWVudCkge1xuICBkb2N1bWVudE1vZGUgPSBkb2N1bWVudC5kb2N1bWVudE1vZGU7XG59XG5cbi8vIFdlYmtpdCBvZmZlcnMgYSB2ZXJ5IHVzZWZ1bCBgdGV4dElucHV0YCBldmVudCB0aGF0IGNhbiBiZSB1c2VkIHRvXG4vLyBkaXJlY3RseSByZXByZXNlbnQgYGJlZm9yZUlucHV0YC4gVGhlIElFIGB0ZXh0aW5wdXRgIGV2ZW50IGlzIG5vdCBhc1xuLy8gdXNlZnVsLCBzbyB3ZSBkb24ndCB1c2UgaXQuXG52YXIgY2FuVXNlVGV4dElucHV0RXZlbnQgPSBFeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00gJiYgJ1RleHRFdmVudCcgaW4gd2luZG93ICYmICFkb2N1bWVudE1vZGUgJiYgIWlzUHJlc3RvKCk7XG5cbi8vIEluIElFOSssIHdlIGhhdmUgYWNjZXNzIHRvIGNvbXBvc2l0aW9uIGV2ZW50cywgYnV0IHRoZSBkYXRhIHN1cHBsaWVkXG4vLyBieSB0aGUgbmF0aXZlIGNvbXBvc2l0aW9uZW5kIGV2ZW50IG1heSBiZSBpbmNvcnJlY3QuIEphcGFuZXNlIGlkZW9ncmFwaGljXG4vLyBzcGFjZXMsIGZvciBpbnN0YW5jZSAoXFx1MzAwMCkgYXJlIG5vdCByZWNvcmRlZCBjb3JyZWN0bHkuXG52YXIgdXNlRmFsbGJhY2tDb21wb3NpdGlvbkRhdGEgPSBFeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00gJiYgKCFjYW5Vc2VDb21wb3NpdGlvbkV2ZW50IHx8IGRvY3VtZW50TW9kZSAmJiBkb2N1bWVudE1vZGUgPiA4ICYmIGRvY3VtZW50TW9kZSA8PSAxMSk7XG5cbi8qKlxuICogT3BlcmEgPD0gMTIgaW5jbHVkZXMgVGV4dEV2ZW50IGluIHdpbmRvdywgYnV0IGRvZXMgbm90IGZpcmVcbiAqIHRleHQgaW5wdXQgZXZlbnRzLiBSZWx5IG9uIGtleXByZXNzIGluc3RlYWQuXG4gKi9cbmZ1bmN0aW9uIGlzUHJlc3RvKCkge1xuICB2YXIgb3BlcmEgPSB3aW5kb3cub3BlcmE7XG4gIHJldHVybiB0eXBlb2Ygb3BlcmEgPT09ICdvYmplY3QnICYmIHR5cGVvZiBvcGVyYS52ZXJzaW9uID09PSAnZnVuY3Rpb24nICYmIHBhcnNlSW50KG9wZXJhLnZlcnNpb24oKSwgMTApIDw9IDEyO1xufVxuXG52YXIgU1BBQ0VCQVJfQ09ERSA9IDMyO1xudmFyIFNQQUNFQkFSX0NIQVIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFNQQUNFQkFSX0NPREUpO1xuXG4vLyBFdmVudHMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgbmFtZXMuXG52YXIgZXZlbnRUeXBlcyA9IHtcbiAgYmVmb3JlSW5wdXQ6IHtcbiAgICBwaGFzZWRSZWdpc3RyYXRpb25OYW1lczoge1xuICAgICAgYnViYmxlZDogJ29uQmVmb3JlSW5wdXQnLFxuICAgICAgY2FwdHVyZWQ6ICdvbkJlZm9yZUlucHV0Q2FwdHVyZSdcbiAgICB9LFxuICAgIGRlcGVuZGVuY2llczogWyd0b3BDb21wb3NpdGlvbkVuZCcsICd0b3BLZXlQcmVzcycsICd0b3BUZXh0SW5wdXQnLCAndG9wUGFzdGUnXVxuICB9LFxuICBjb21wb3NpdGlvbkVuZDoge1xuICAgIHBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzOiB7XG4gICAgICBidWJibGVkOiAnb25Db21wb3NpdGlvbkVuZCcsXG4gICAgICBjYXB0dXJlZDogJ29uQ29tcG9zaXRpb25FbmRDYXB0dXJlJ1xuICAgIH0sXG4gICAgZGVwZW5kZW5jaWVzOiBbJ3RvcEJsdXInLCAndG9wQ29tcG9zaXRpb25FbmQnLCAndG9wS2V5RG93bicsICd0b3BLZXlQcmVzcycsICd0b3BLZXlVcCcsICd0b3BNb3VzZURvd24nXVxuICB9LFxuICBjb21wb3NpdGlvblN0YXJ0OiB7XG4gICAgcGhhc2VkUmVnaXN0cmF0aW9uTmFtZXM6IHtcbiAgICAgIGJ1YmJsZWQ6ICdvbkNvbXBvc2l0aW9uU3RhcnQnLFxuICAgICAgY2FwdHVyZWQ6ICdvbkNvbXBvc2l0aW9uU3RhcnRDYXB0dXJlJ1xuICAgIH0sXG4gICAgZGVwZW5kZW5jaWVzOiBbJ3RvcEJsdXInLCAndG9wQ29tcG9zaXRpb25TdGFydCcsICd0b3BLZXlEb3duJywgJ3RvcEtleVByZXNzJywgJ3RvcEtleVVwJywgJ3RvcE1vdXNlRG93biddXG4gIH0sXG4gIGNvbXBvc2l0aW9uVXBkYXRlOiB7XG4gICAgcGhhc2VkUmVnaXN0cmF0aW9uTmFtZXM6IHtcbiAgICAgIGJ1YmJsZWQ6ICdvbkNvbXBvc2l0aW9uVXBkYXRlJyxcbiAgICAgIGNhcHR1cmVkOiAnb25Db21wb3NpdGlvblVwZGF0ZUNhcHR1cmUnXG4gICAgfSxcbiAgICBkZXBlbmRlbmNpZXM6IFsndG9wQmx1cicsICd0b3BDb21wb3NpdGlvblVwZGF0ZScsICd0b3BLZXlEb3duJywgJ3RvcEtleVByZXNzJywgJ3RvcEtleVVwJywgJ3RvcE1vdXNlRG93biddXG4gIH1cbn07XG5cbi8vIFRyYWNrIHdoZXRoZXIgd2UndmUgZXZlciBoYW5kbGVkIGEga2V5cHJlc3Mgb24gdGhlIHNwYWNlIGtleS5cbnZhciBoYXNTcGFjZUtleXByZXNzID0gZmFsc2U7XG5cbi8qKlxuICogUmV0dXJuIHdoZXRoZXIgYSBuYXRpdmUga2V5cHJlc3MgZXZlbnQgaXMgYXNzdW1lZCB0byBiZSBhIGNvbW1hbmQuXG4gKiBUaGlzIGlzIHJlcXVpcmVkIGJlY2F1c2UgRmlyZWZveCBmaXJlcyBga2V5cHJlc3NgIGV2ZW50cyBmb3Iga2V5IGNvbW1hbmRzXG4gKiAoY3V0LCBjb3B5LCBzZWxlY3QtYWxsLCBldGMuKSBldmVuIHRob3VnaCBubyBjaGFyYWN0ZXIgaXMgaW5zZXJ0ZWQuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5cHJlc3NDb21tYW5kKG5hdGl2ZUV2ZW50KSB7XG4gIHJldHVybiAobmF0aXZlRXZlbnQuY3RybEtleSB8fCBuYXRpdmVFdmVudC5hbHRLZXkgfHwgbmF0aXZlRXZlbnQubWV0YUtleSkgJiZcbiAgLy8gY3RybEtleSAmJiBhbHRLZXkgaXMgZXF1aXZhbGVudCB0byBBbHRHciwgYW5kIGlzIG5vdCBhIGNvbW1hbmQuXG4gICEobmF0aXZlRXZlbnQuY3RybEtleSAmJiBuYXRpdmVFdmVudC5hbHRLZXkpO1xufVxuXG4vKipcbiAqIFRyYW5zbGF0ZSBuYXRpdmUgdG9wIGxldmVsIGV2ZW50cyBpbnRvIGV2ZW50IHR5cGVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0b3BMZXZlbFR5cGVcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9zaXRpb25FdmVudFR5cGUodG9wTGV2ZWxUeXBlKSB7XG4gIHN3aXRjaCAodG9wTGV2ZWxUeXBlKSB7XG4gICAgY2FzZSAndG9wQ29tcG9zaXRpb25TdGFydCc6XG4gICAgICByZXR1cm4gZXZlbnRUeXBlcy5jb21wb3NpdGlvblN0YXJ0O1xuICAgIGNhc2UgJ3RvcENvbXBvc2l0aW9uRW5kJzpcbiAgICAgIHJldHVybiBldmVudFR5cGVzLmNvbXBvc2l0aW9uRW5kO1xuICAgIGNhc2UgJ3RvcENvbXBvc2l0aW9uVXBkYXRlJzpcbiAgICAgIHJldHVybiBldmVudFR5cGVzLmNvbXBvc2l0aW9uVXBkYXRlO1xuICB9XG59XG5cbi8qKlxuICogRG9lcyBvdXIgZmFsbGJhY2sgYmVzdC1ndWVzcyBtb2RlbCB0aGluayB0aGlzIGV2ZW50IHNpZ25pZmllcyB0aGF0XG4gKiBjb21wb3NpdGlvbiBoYXMgYmVndW4/XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRvcExldmVsVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IG5hdGl2ZUV2ZW50XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZhbGxiYWNrQ29tcG9zaXRpb25TdGFydCh0b3BMZXZlbFR5cGUsIG5hdGl2ZUV2ZW50KSB7XG4gIHJldHVybiB0b3BMZXZlbFR5cGUgPT09ICd0b3BLZXlEb3duJyAmJiBuYXRpdmVFdmVudC5rZXlDb2RlID09PSBTVEFSVF9LRVlDT0RFO1xufVxuXG4vKipcbiAqIERvZXMgb3VyIGZhbGxiYWNrIG1vZGUgdGhpbmsgdGhhdCB0aGlzIGV2ZW50IGlzIHRoZSBlbmQgb2YgY29tcG9zaXRpb24/XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRvcExldmVsVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IG5hdGl2ZUV2ZW50XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZhbGxiYWNrQ29tcG9zaXRpb25FbmQodG9wTGV2ZWxUeXBlLCBuYXRpdmVFdmVudCkge1xuICBzd2l0Y2ggKHRvcExldmVsVHlwZSkge1xuICAgIGNhc2UgJ3RvcEtleVVwJzpcbiAgICAgIC8vIENvbW1hbmQga2V5cyBpbnNlcnQgb3IgY2xlYXIgSU1FIGlucHV0LlxuICAgICAgcmV0dXJuIEVORF9LRVlDT0RFUy5pbmRleE9mKG5hdGl2ZUV2ZW50LmtleUNvZGUpICE9PSAtMTtcbiAgICBjYXNlICd0b3BLZXlEb3duJzpcbiAgICAgIC8vIEV4cGVjdCBJTUUga2V5Q29kZSBvbiBlYWNoIGtleWRvd24uIElmIHdlIGdldCBhbnkgb3RoZXJcbiAgICAgIC8vIGNvZGUgd2UgbXVzdCBoYXZlIGV4aXRlZCBlYXJsaWVyLlxuICAgICAgcmV0dXJuIG5hdGl2ZUV2ZW50LmtleUNvZGUgIT09IFNUQVJUX0tFWUNPREU7XG4gICAgY2FzZSAndG9wS2V5UHJlc3MnOlxuICAgIGNhc2UgJ3RvcE1vdXNlRG93bic6XG4gICAgY2FzZSAndG9wQmx1cic6XG4gICAgICAvLyBFdmVudHMgYXJlIG5vdCBwb3NzaWJsZSB3aXRob3V0IGNhbmNlbGxpbmcgSU1FLlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEdvb2dsZSBJbnB1dCBUb29scyBwcm92aWRlcyBjb21wb3NpdGlvbiBkYXRhIHZpYSBhIEN1c3RvbUV2ZW50LFxuICogd2l0aCB0aGUgYGRhdGFgIHByb3BlcnR5IHBvcHVsYXRlZCBpbiB0aGUgYGRldGFpbGAgb2JqZWN0LiBJZiB0aGlzXG4gKiBpcyBhdmFpbGFibGUgb24gdGhlIGV2ZW50IG9iamVjdCwgdXNlIGl0LiBJZiBub3QsIHRoaXMgaXMgYSBwbGFpblxuICogY29tcG9zaXRpb24gZXZlbnQgYW5kIHdlIGhhdmUgbm90aGluZyBzcGVjaWFsIHRvIGV4dHJhY3QuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG5hdGl2ZUV2ZW50XG4gKiBAcmV0dXJuIHs/c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXREYXRhRnJvbUN1c3RvbUV2ZW50KG5hdGl2ZUV2ZW50KSB7XG4gIHZhciBkZXRhaWwgPSBuYXRpdmVFdmVudC5kZXRhaWw7XG4gIGlmICh0eXBlb2YgZGV0YWlsID09PSAnb2JqZWN0JyAmJiAnZGF0YScgaW4gZGV0YWlsKSB7XG4gICAgcmV0dXJuIGRldGFpbC5kYXRhO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBUcmFjayB0aGUgY3VycmVudCBJTUUgY29tcG9zaXRpb24gZmFsbGJhY2sgb2JqZWN0LCBpZiBhbnkuXG52YXIgY3VycmVudENvbXBvc2l0aW9uID0gbnVsbDtcblxuLyoqXG4gKiBAcmV0dXJuIHs/b2JqZWN0fSBBIFN5bnRoZXRpY0NvbXBvc2l0aW9uRXZlbnQuXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RDb21wb3NpdGlvbkV2ZW50KHRvcExldmVsVHlwZSwgdGFyZ2V0SW5zdCwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KSB7XG4gIHZhciBldmVudFR5cGU7XG4gIHZhciBmYWxsYmFja0RhdGE7XG5cbiAgaWYgKGNhblVzZUNvbXBvc2l0aW9uRXZlbnQpIHtcbiAgICBldmVudFR5cGUgPSBnZXRDb21wb3NpdGlvbkV2ZW50VHlwZSh0b3BMZXZlbFR5cGUpO1xuICB9IGVsc2UgaWYgKCFjdXJyZW50Q29tcG9zaXRpb24pIHtcbiAgICBpZiAoaXNGYWxsYmFja0NvbXBvc2l0aW9uU3RhcnQodG9wTGV2ZWxUeXBlLCBuYXRpdmVFdmVudCkpIHtcbiAgICAgIGV2ZW50VHlwZSA9IGV2ZW50VHlwZXMuY29tcG9zaXRpb25TdGFydDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNGYWxsYmFja0NvbXBvc2l0aW9uRW5kKHRvcExldmVsVHlwZSwgbmF0aXZlRXZlbnQpKSB7XG4gICAgZXZlbnRUeXBlID0gZXZlbnRUeXBlcy5jb21wb3NpdGlvbkVuZDtcbiAgfVxuXG4gIGlmICghZXZlbnRUeXBlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAodXNlRmFsbGJhY2tDb21wb3NpdGlvbkRhdGEpIHtcbiAgICAvLyBUaGUgY3VycmVudCBjb21wb3NpdGlvbiBpcyBzdG9yZWQgc3RhdGljYWxseSBhbmQgbXVzdCBub3QgYmVcbiAgICAvLyBvdmVyd3JpdHRlbiB3aGlsZSBjb21wb3NpdGlvbiBjb250aW51ZXMuXG4gICAgaWYgKCFjdXJyZW50Q29tcG9zaXRpb24gJiYgZXZlbnRUeXBlID09PSBldmVudFR5cGVzLmNvbXBvc2l0aW9uU3RhcnQpIHtcbiAgICAgIGN1cnJlbnRDb21wb3NpdGlvbiA9IEZhbGxiYWNrQ29tcG9zaXRpb25TdGF0ZS5nZXRQb29sZWQobmF0aXZlRXZlbnRUYXJnZXQpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlID09PSBldmVudFR5cGVzLmNvbXBvc2l0aW9uRW5kKSB7XG4gICAgICBpZiAoY3VycmVudENvbXBvc2l0aW9uKSB7XG4gICAgICAgIGZhbGxiYWNrRGF0YSA9IGN1cnJlbnRDb21wb3NpdGlvbi5nZXREYXRhKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIGV2ZW50ID0gU3ludGhldGljQ29tcG9zaXRpb25FdmVudC5nZXRQb29sZWQoZXZlbnRUeXBlLCB0YXJnZXRJbnN0LCBuYXRpdmVFdmVudCwgbmF0aXZlRXZlbnRUYXJnZXQpO1xuXG4gIGlmIChmYWxsYmFja0RhdGEpIHtcbiAgICAvLyBJbmplY3QgZGF0YSBnZW5lcmF0ZWQgZnJvbSBmYWxsYmFjayBwYXRoIGludG8gdGhlIHN5bnRoZXRpYyBldmVudC5cbiAgICAvLyBUaGlzIG1hdGNoZXMgdGhlIHByb3BlcnR5IG9mIG5hdGl2ZSBDb21wb3NpdGlvbkV2ZW50SW50ZXJmYWNlLlxuICAgIGV2ZW50LmRhdGEgPSBmYWxsYmFja0RhdGE7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGN1c3RvbURhdGEgPSBnZXREYXRhRnJvbUN1c3RvbUV2ZW50KG5hdGl2ZUV2ZW50KTtcbiAgICBpZiAoY3VzdG9tRGF0YSAhPT0gbnVsbCkge1xuICAgICAgZXZlbnQuZGF0YSA9IGN1c3RvbURhdGE7XG4gICAgfVxuICB9XG5cbiAgRXZlbnRQcm9wYWdhdG9ycy5hY2N1bXVsYXRlVHdvUGhhc2VEaXNwYXRjaGVzKGV2ZW50KTtcbiAgcmV0dXJuIGV2ZW50O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0b3BMZXZlbFR5cGUgUmVjb3JkIGZyb20gYEV2ZW50Q29uc3RhbnRzYC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBuYXRpdmVFdmVudCBOYXRpdmUgYnJvd3NlciBldmVudC5cbiAqIEByZXR1cm4gez9zdHJpbmd9IFRoZSBzdHJpbmcgY29ycmVzcG9uZGluZyB0byB0aGlzIGBiZWZvcmVJbnB1dGAgZXZlbnQuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZUJlZm9yZUlucHV0Q2hhcnModG9wTGV2ZWxUeXBlLCBuYXRpdmVFdmVudCkge1xuICBzd2l0Y2ggKHRvcExldmVsVHlwZSkge1xuICAgIGNhc2UgJ3RvcENvbXBvc2l0aW9uRW5kJzpcbiAgICAgIHJldHVybiBnZXREYXRhRnJvbUN1c3RvbUV2ZW50KG5hdGl2ZUV2ZW50KTtcbiAgICBjYXNlICd0b3BLZXlQcmVzcyc6XG4gICAgICAvKipcbiAgICAgICAqIElmIG5hdGl2ZSBgdGV4dElucHV0YCBldmVudHMgYXJlIGF2YWlsYWJsZSwgb3VyIGdvYWwgaXMgdG8gbWFrZVxuICAgICAgICogdXNlIG9mIHRoZW0uIEhvd2V2ZXIsIHRoZXJlIGlzIGEgc3BlY2lhbCBjYXNlOiB0aGUgc3BhY2ViYXIga2V5LlxuICAgICAgICogSW4gV2Via2l0LCBwcmV2ZW50aW5nIGRlZmF1bHQgb24gYSBzcGFjZWJhciBgdGV4dElucHV0YCBldmVudFxuICAgICAgICogY2FuY2VscyBjaGFyYWN0ZXIgaW5zZXJ0aW9uLCBidXQgaXQgKmFsc28qIGNhdXNlcyB0aGUgYnJvd3NlclxuICAgICAgICogdG8gZmFsbCBiYWNrIHRvIGl0cyBkZWZhdWx0IHNwYWNlYmFyIGJlaGF2aW9yIG9mIHNjcm9sbGluZyB0aGVcbiAgICAgICAqIHBhZ2UuXG4gICAgICAgKlxuICAgICAgICogVHJhY2tpbmcgYXQ6XG4gICAgICAgKiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MzU1MTAzXG4gICAgICAgKlxuICAgICAgICogVG8gYXZvaWQgdGhpcyBpc3N1ZSwgdXNlIHRoZSBrZXlwcmVzcyBldmVudCBhcyBpZiBubyBgdGV4dElucHV0YFxuICAgICAgICogZXZlbnQgaXMgYXZhaWxhYmxlLlxuICAgICAgICovXG4gICAgICB2YXIgd2hpY2ggPSBuYXRpdmVFdmVudC53aGljaDtcbiAgICAgIGlmICh3aGljaCAhPT0gU1BBQ0VCQVJfQ09ERSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaGFzU3BhY2VLZXlwcmVzcyA9IHRydWU7XG4gICAgICByZXR1cm4gU1BBQ0VCQVJfQ0hBUjtcblxuICAgIGNhc2UgJ3RvcFRleHRJbnB1dCc6XG4gICAgICAvLyBSZWNvcmQgdGhlIGNoYXJhY3RlcnMgdG8gYmUgYWRkZWQgdG8gdGhlIERPTS5cbiAgICAgIHZhciBjaGFycyA9IG5hdGl2ZUV2ZW50LmRhdGE7XG5cbiAgICAgIC8vIElmIGl0J3MgYSBzcGFjZWJhciBjaGFyYWN0ZXIsIGFzc3VtZSB0aGF0IHdlIGhhdmUgYWxyZWFkeSBoYW5kbGVkXG4gICAgICAvLyBpdCBhdCB0aGUga2V5cHJlc3MgbGV2ZWwgYW5kIGJhaWwgaW1tZWRpYXRlbHkuIEFuZHJvaWQgQ2hyb21lXG4gICAgICAvLyBkb2Vzbid0IGdpdmUgdXMga2V5Y29kZXMsIHNvIHdlIG5lZWQgdG8gYmxhY2tsaXN0IGl0LlxuICAgICAgaWYgKGNoYXJzID09PSBTUEFDRUJBUl9DSEFSICYmIGhhc1NwYWNlS2V5cHJlc3MpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGFycztcblxuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBGb3Igb3RoZXIgbmF0aXZlIGV2ZW50IHR5cGVzLCBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBGb3IgYnJvd3NlcnMgdGhhdCBkbyBub3QgcHJvdmlkZSB0aGUgYHRleHRJbnB1dGAgZXZlbnQsIGV4dHJhY3QgdGhlXG4gKiBhcHByb3ByaWF0ZSBzdHJpbmcgdG8gdXNlIGZvciBTeW50aGV0aWNJbnB1dEV2ZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0b3BMZXZlbFR5cGUgUmVjb3JkIGZyb20gYEV2ZW50Q29uc3RhbnRzYC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBuYXRpdmVFdmVudCBOYXRpdmUgYnJvd3NlciBldmVudC5cbiAqIEByZXR1cm4gez9zdHJpbmd9IFRoZSBmYWxsYmFjayBzdHJpbmcgZm9yIHRoaXMgYGJlZm9yZUlucHV0YCBldmVudC5cbiAqL1xuZnVuY3Rpb24gZ2V0RmFsbGJhY2tCZWZvcmVJbnB1dENoYXJzKHRvcExldmVsVHlwZSwgbmF0aXZlRXZlbnQpIHtcbiAgLy8gSWYgd2UgYXJlIGN1cnJlbnRseSBjb21wb3NpbmcgKElNRSkgYW5kIHVzaW5nIGEgZmFsbGJhY2sgdG8gZG8gc28sXG4gIC8vIHRyeSB0byBleHRyYWN0IHRoZSBjb21wb3NlZCBjaGFyYWN0ZXJzIGZyb20gdGhlIGZhbGxiYWNrIG9iamVjdC5cbiAgLy8gSWYgY29tcG9zaXRpb24gZXZlbnQgaXMgYXZhaWxhYmxlLCB3ZSBleHRyYWN0IGEgc3RyaW5nIG9ubHkgYXRcbiAgLy8gY29tcG9zaXRpb25ldmVudCwgb3RoZXJ3aXNlIGV4dHJhY3QgaXQgYXQgZmFsbGJhY2sgZXZlbnRzLlxuICBpZiAoY3VycmVudENvbXBvc2l0aW9uKSB7XG4gICAgaWYgKHRvcExldmVsVHlwZSA9PT0gJ3RvcENvbXBvc2l0aW9uRW5kJyB8fCAhY2FuVXNlQ29tcG9zaXRpb25FdmVudCAmJiBpc0ZhbGxiYWNrQ29tcG9zaXRpb25FbmQodG9wTGV2ZWxUeXBlLCBuYXRpdmVFdmVudCkpIHtcbiAgICAgIHZhciBjaGFycyA9IGN1cnJlbnRDb21wb3NpdGlvbi5nZXREYXRhKCk7XG4gICAgICBGYWxsYmFja0NvbXBvc2l0aW9uU3RhdGUucmVsZWFzZShjdXJyZW50Q29tcG9zaXRpb24pO1xuICAgICAgY3VycmVudENvbXBvc2l0aW9uID0gbnVsbDtcbiAgICAgIHJldHVybiBjaGFycztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzd2l0Y2ggKHRvcExldmVsVHlwZSkge1xuICAgIGNhc2UgJ3RvcFBhc3RlJzpcbiAgICAgIC8vIElmIGEgcGFzdGUgZXZlbnQgb2NjdXJzIGFmdGVyIGEga2V5cHJlc3MsIHRocm93IG91dCB0aGUgaW5wdXRcbiAgICAgIC8vIGNoYXJzLiBQYXN0ZSBldmVudHMgc2hvdWxkIG5vdCBsZWFkIHRvIEJlZm9yZUlucHV0IGV2ZW50cy5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIGNhc2UgJ3RvcEtleVByZXNzJzpcbiAgICAgIC8qKlxuICAgICAgICogQXMgb2YgdjI3LCBGaXJlZm94IG1heSBmaXJlIGtleXByZXNzIGV2ZW50cyBldmVuIHdoZW4gbm8gY2hhcmFjdGVyXG4gICAgICAgKiB3aWxsIGJlIGluc2VydGVkLiBBIGZldyBwb3NzaWJpbGl0aWVzOlxuICAgICAgICpcbiAgICAgICAqIC0gYHdoaWNoYCBpcyBgMGAuIEFycm93IGtleXMsIEVzYyBrZXksIGV0Yy5cbiAgICAgICAqXG4gICAgICAgKiAtIGB3aGljaGAgaXMgdGhlIHByZXNzZWQga2V5IGNvZGUsIGJ1dCBubyBjaGFyIGlzIGF2YWlsYWJsZS5cbiAgICAgICAqICAgRXg6ICdBbHRHciArIGRgIGluIFBvbGlzaC4gVGhlcmUgaXMgbm8gbW9kaWZpZWQgY2hhcmFjdGVyIGZvclxuICAgICAgICogICB0aGlzIGtleSBjb21iaW5hdGlvbiBhbmQgbm8gY2hhcmFjdGVyIGlzIGluc2VydGVkIGludG8gdGhlXG4gICAgICAgKiAgIGRvY3VtZW50LCBidXQgRkYgZmlyZXMgdGhlIGtleXByZXNzIGZvciBjaGFyIGNvZGUgYDEwMGAgYW55d2F5LlxuICAgICAgICogICBObyBgaW5wdXRgIGV2ZW50IHdpbGwgb2NjdXIuXG4gICAgICAgKlxuICAgICAgICogLSBgd2hpY2hgIGlzIHRoZSBwcmVzc2VkIGtleSBjb2RlLCBidXQgYSBjb21tYW5kIGNvbWJpbmF0aW9uIGlzXG4gICAgICAgKiAgIGJlaW5nIHVzZWQuIEV4OiBgQ21kK0NgLiBObyBjaGFyYWN0ZXIgaXMgaW5zZXJ0ZWQsIGFuZCBub1xuICAgICAgICogICBgaW5wdXRgIGV2ZW50IHdpbGwgb2NjdXIuXG4gICAgICAgKi9cbiAgICAgIGlmIChuYXRpdmVFdmVudC53aGljaCAmJiAhaXNLZXlwcmVzc0NvbW1hbmQobmF0aXZlRXZlbnQpKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKG5hdGl2ZUV2ZW50LndoaWNoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIGNhc2UgJ3RvcENvbXBvc2l0aW9uRW5kJzpcbiAgICAgIHJldHVybiB1c2VGYWxsYmFja0NvbXBvc2l0aW9uRGF0YSA/IG51bGwgOiBuYXRpdmVFdmVudC5kYXRhO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIEV4dHJhY3QgYSBTeW50aGV0aWNJbnB1dEV2ZW50IGZvciBgYmVmb3JlSW5wdXRgLCBiYXNlZCBvbiBlaXRoZXIgbmF0aXZlXG4gKiBgdGV4dElucHV0YCBvciBmYWxsYmFjayBiZWhhdmlvci5cbiAqXG4gKiBAcmV0dXJuIHs/b2JqZWN0fSBBIFN5bnRoZXRpY0lucHV0RXZlbnQuXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RCZWZvcmVJbnB1dEV2ZW50KHRvcExldmVsVHlwZSwgdGFyZ2V0SW5zdCwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KSB7XG4gIHZhciBjaGFycztcblxuICBpZiAoY2FuVXNlVGV4dElucHV0RXZlbnQpIHtcbiAgICBjaGFycyA9IGdldE5hdGl2ZUJlZm9yZUlucHV0Q2hhcnModG9wTGV2ZWxUeXBlLCBuYXRpdmVFdmVudCk7XG4gIH0gZWxzZSB7XG4gICAgY2hhcnMgPSBnZXRGYWxsYmFja0JlZm9yZUlucHV0Q2hhcnModG9wTGV2ZWxUeXBlLCBuYXRpdmVFdmVudCk7XG4gIH1cblxuICAvLyBJZiBubyBjaGFyYWN0ZXJzIGFyZSBiZWluZyBpbnNlcnRlZCwgbm8gQmVmb3JlSW5wdXQgZXZlbnQgc2hvdWxkXG4gIC8vIGJlIGZpcmVkLlxuICBpZiAoIWNoYXJzKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgZXZlbnQgPSBTeW50aGV0aWNJbnB1dEV2ZW50LmdldFBvb2xlZChldmVudFR5cGVzLmJlZm9yZUlucHV0LCB0YXJnZXRJbnN0LCBuYXRpdmVFdmVudCwgbmF0aXZlRXZlbnRUYXJnZXQpO1xuXG4gIGV2ZW50LmRhdGEgPSBjaGFycztcbiAgRXZlbnRQcm9wYWdhdG9ycy5hY2N1bXVsYXRlVHdvUGhhc2VEaXNwYXRjaGVzKGV2ZW50KTtcbiAgcmV0dXJuIGV2ZW50O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBgb25CZWZvcmVJbnB1dGAgZXZlbnQgdG8gbWF0Y2hcbiAqIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTMvV0QtRE9NLUxldmVsLTMtRXZlbnRzLTIwMTMxMTA1LyNldmVudHMtaW5wdXRldmVudHMuXG4gKlxuICogVGhpcyBldmVudCBwbHVnaW4gaXMgYmFzZWQgb24gdGhlIG5hdGl2ZSBgdGV4dElucHV0YCBldmVudFxuICogYXZhaWxhYmxlIGluIENocm9tZSwgU2FmYXJpLCBPcGVyYSwgYW5kIElFLiBUaGlzIGV2ZW50IGZpcmVzIGFmdGVyXG4gKiBgb25LZXlQcmVzc2AgYW5kIGBvbkNvbXBvc2l0aW9uRW5kYCwgYnV0IGJlZm9yZSBgb25JbnB1dGAuXG4gKlxuICogYGJlZm9yZUlucHV0YCBpcyBzcGVjJ2QgYnV0IG5vdCBpbXBsZW1lbnRlZCBpbiBhbnkgYnJvd3NlcnMsIGFuZFxuICogdGhlIGBpbnB1dGAgZXZlbnQgZG9lcyBub3QgcHJvdmlkZSBhbnkgdXNlZnVsIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgaGFzXG4gKiBhY3R1YWxseSBiZWVuIGFkZGVkLCBjb250cmFyeSB0byB0aGUgc3BlYy4gVGh1cywgYHRleHRJbnB1dGAgaXMgdGhlIGJlc3RcbiAqIGF2YWlsYWJsZSBldmVudCB0byBpZGVudGlmeSB0aGUgY2hhcmFjdGVycyB0aGF0IGhhdmUgYWN0dWFsbHkgYmVlbiBpbnNlcnRlZFxuICogaW50byB0aGUgdGFyZ2V0IG5vZGUuXG4gKlxuICogVGhpcyBwbHVnaW4gaXMgYWxzbyByZXNwb25zaWJsZSBmb3IgZW1pdHRpbmcgYGNvbXBvc2l0aW9uYCBldmVudHMsIHRodXNcbiAqIGFsbG93aW5nIHVzIHRvIHNoYXJlIGNvbXBvc2l0aW9uIGZhbGxiYWNrIGNvZGUgZm9yIGJvdGggYGJlZm9yZUlucHV0YCBhbmRcbiAqIGBjb21wb3NpdGlvbmAgZXZlbnQgdHlwZXMuXG4gKi9cbnZhciBCZWZvcmVJbnB1dEV2ZW50UGx1Z2luID0ge1xuXG4gIGV2ZW50VHlwZXM6IGV2ZW50VHlwZXMsXG5cbiAgZXh0cmFjdEV2ZW50czogZnVuY3Rpb24gKHRvcExldmVsVHlwZSwgdGFyZ2V0SW5zdCwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KSB7XG4gICAgcmV0dXJuIFtleHRyYWN0Q29tcG9zaXRpb25FdmVudCh0b3BMZXZlbFR5cGUsIHRhcmdldEluc3QsIG5hdGl2ZUV2ZW50LCBuYXRpdmVFdmVudFRhcmdldCksIGV4dHJhY3RCZWZvcmVJbnB1dEV2ZW50KHRvcExldmVsVHlwZSwgdGFyZ2V0SW5zdCwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KV07XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQmVmb3JlSW5wdXRFdmVudFBsdWdpbjsiXX0=