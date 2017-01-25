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

var EventPropagators = require('./EventPropagators');
var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
var ReactInputSelection = require('./ReactInputSelection');
var SyntheticEvent = require('./SyntheticEvent');

var getActiveElement = require('fbjs/lib/getActiveElement');
var isTextInputElement = require('./isTextInputElement');
var shallowEqual = require('fbjs/lib/shallowEqual');

var skipSelectionChangeEvent = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;

var eventTypes = {
  select: {
    phasedRegistrationNames: {
      bubbled: 'onSelect',
      captured: 'onSelectCapture'
    },
    dependencies: ['topBlur', 'topContextMenu', 'topFocus', 'topKeyDown', 'topKeyUp', 'topMouseDown', 'topMouseUp', 'topSelectionChange']
  }
};

var activeElement = null;
var activeElementInst = null;
var lastSelection = null;
var mouseDown = false;

// Track whether a listener exists for this plugin. If none exist, we do
// not extract events. See #3639.
var hasListener = false;

/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @return {object}
 */
function getSelection(node) {
  if ('selectionStart' in node && ReactInputSelection.hasSelectionCapabilities(node)) {
    return {
      start: node.selectionStart,
      end: node.selectionEnd
    };
  } else if (window.getSelection) {
    var selection = window.getSelection();
    return {
      anchorNode: selection.anchorNode,
      anchorOffset: selection.anchorOffset,
      focusNode: selection.focusNode,
      focusOffset: selection.focusOffset
    };
  } else if (document.selection) {
    var range = document.selection.createRange();
    return {
      parentElement: range.parentElement(),
      text: range.text,
      top: range.boundingTop,
      left: range.boundingLeft
    };
  }
}

/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @return {?SyntheticEvent}
 */
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  // Ensure we have the right element, and that the user is not dragging a
  // selection (this matches native `select` event behavior). In HTML5, select
  // fires only on input and textarea thus if there's no focused element we
  // won't dispatch.
  if (mouseDown || activeElement == null || activeElement !== getActiveElement()) {
    return null;
  }

  // Only fire when selection has actually changed.
  var currentSelection = getSelection(activeElement);
  if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
    lastSelection = currentSelection;

    var syntheticEvent = SyntheticEvent.getPooled(eventTypes.select, activeElementInst, nativeEvent, nativeEventTarget);

    syntheticEvent.type = 'select';
    syntheticEvent.target = activeElement;

    EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);

    return syntheticEvent;
  }

  return null;
}

/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */
var SelectEventPlugin = {

  eventTypes: eventTypes,

  extractEvents: function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    if (!hasListener) {
      return null;
    }

    var targetNode = targetInst ? ReactDOMComponentTree.getNodeFromInstance(targetInst) : window;

    switch (topLevelType) {
      // Track the input node that has focus.
      case 'topFocus':
        if (isTextInputElement(targetNode) || targetNode.contentEditable === 'true') {
          activeElement = targetNode;
          activeElementInst = targetInst;
          lastSelection = null;
        }
        break;
      case 'topBlur':
        activeElement = null;
        activeElementInst = null;
        lastSelection = null;
        break;

      // Don't fire the event while the user is dragging. This matches the
      // semantics of the native select event.
      case 'topMouseDown':
        mouseDown = true;
        break;
      case 'topContextMenu':
      case 'topMouseUp':
        mouseDown = false;
        return constructSelectEvent(nativeEvent, nativeEventTarget);

      // Chrome and IE fire non-standard event when selection is changed (and
      // sometimes when it hasn't). IE's event fires out of order with respect
      // to key and input events on deletion, so we discard it.
      //
      // Firefox doesn't support selectionchange, so check selection status
      // after each key entry. The selection changes after keydown and before
      // keyup, but we check on keydown as well in the case of holding down a
      // key, when multiple keydown events are fired but only one keyup is.
      // This is also our approach for IE handling, for the reason above.
      case 'topSelectionChange':
        if (skipSelectionChangeEvent) {
          break;
        }
      // falls through
      case 'topKeyDown':
      case 'topKeyUp':
        return constructSelectEvent(nativeEvent, nativeEventTarget);
    }

    return null;
  },

  didPutListener: function didPutListener(inst, registrationName, listener) {
    if (registrationName === 'onSelect') {
      hasListener = true;
    }
  }
};

module.exports = SelectEventPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9TZWxlY3RFdmVudFBsdWdpbi5qcyJdLCJuYW1lcyI6WyJFdmVudFByb3BhZ2F0b3JzIiwicmVxdWlyZSIsIkV4ZWN1dGlvbkVudmlyb25tZW50IiwiUmVhY3RET01Db21wb25lbnRUcmVlIiwiUmVhY3RJbnB1dFNlbGVjdGlvbiIsIlN5bnRoZXRpY0V2ZW50IiwiZ2V0QWN0aXZlRWxlbWVudCIsImlzVGV4dElucHV0RWxlbWVudCIsInNoYWxsb3dFcXVhbCIsInNraXBTZWxlY3Rpb25DaGFuZ2VFdmVudCIsImNhblVzZURPTSIsImRvY3VtZW50IiwiZG9jdW1lbnRNb2RlIiwiZXZlbnRUeXBlcyIsInNlbGVjdCIsInBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzIiwiYnViYmxlZCIsImNhcHR1cmVkIiwiZGVwZW5kZW5jaWVzIiwiYWN0aXZlRWxlbWVudCIsImFjdGl2ZUVsZW1lbnRJbnN0IiwibGFzdFNlbGVjdGlvbiIsIm1vdXNlRG93biIsImhhc0xpc3RlbmVyIiwiZ2V0U2VsZWN0aW9uIiwibm9kZSIsImhhc1NlbGVjdGlvbkNhcGFiaWxpdGllcyIsInN0YXJ0Iiwic2VsZWN0aW9uU3RhcnQiLCJlbmQiLCJzZWxlY3Rpb25FbmQiLCJ3aW5kb3ciLCJzZWxlY3Rpb24iLCJhbmNob3JOb2RlIiwiYW5jaG9yT2Zmc2V0IiwiZm9jdXNOb2RlIiwiZm9jdXNPZmZzZXQiLCJyYW5nZSIsImNyZWF0ZVJhbmdlIiwicGFyZW50RWxlbWVudCIsInRleHQiLCJ0b3AiLCJib3VuZGluZ1RvcCIsImxlZnQiLCJib3VuZGluZ0xlZnQiLCJjb25zdHJ1Y3RTZWxlY3RFdmVudCIsIm5hdGl2ZUV2ZW50IiwibmF0aXZlRXZlbnRUYXJnZXQiLCJjdXJyZW50U2VsZWN0aW9uIiwic3ludGhldGljRXZlbnQiLCJnZXRQb29sZWQiLCJ0eXBlIiwidGFyZ2V0IiwiYWNjdW11bGF0ZVR3b1BoYXNlRGlzcGF0Y2hlcyIsIlNlbGVjdEV2ZW50UGx1Z2luIiwiZXh0cmFjdEV2ZW50cyIsInRvcExldmVsVHlwZSIsInRhcmdldEluc3QiLCJ0YXJnZXROb2RlIiwiZ2V0Tm9kZUZyb21JbnN0YW5jZSIsImNvbnRlbnRFZGl0YWJsZSIsImRpZFB1dExpc3RlbmVyIiwiaW5zdCIsInJlZ2lzdHJhdGlvbk5hbWUiLCJsaXN0ZW5lciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsSUFBSUEsbUJBQW1CQyxRQUFRLG9CQUFSLENBQXZCO0FBQ0EsSUFBSUMsdUJBQXVCRCxRQUFRLCtCQUFSLENBQTNCO0FBQ0EsSUFBSUUsd0JBQXdCRixRQUFRLHlCQUFSLENBQTVCO0FBQ0EsSUFBSUcsc0JBQXNCSCxRQUFRLHVCQUFSLENBQTFCO0FBQ0EsSUFBSUksaUJBQWlCSixRQUFRLGtCQUFSLENBQXJCOztBQUVBLElBQUlLLG1CQUFtQkwsUUFBUSwyQkFBUixDQUF2QjtBQUNBLElBQUlNLHFCQUFxQk4sUUFBUSxzQkFBUixDQUF6QjtBQUNBLElBQUlPLGVBQWVQLFFBQVEsdUJBQVIsQ0FBbkI7O0FBRUEsSUFBSVEsMkJBQTJCUCxxQkFBcUJRLFNBQXJCLElBQWtDLGtCQUFrQkMsUUFBcEQsSUFBZ0VBLFNBQVNDLFlBQVQsSUFBeUIsRUFBeEg7O0FBRUEsSUFBSUMsYUFBYTtBQUNmQyxVQUFRO0FBQ05DLDZCQUF5QjtBQUN2QkMsZUFBUyxVQURjO0FBRXZCQyxnQkFBVTtBQUZhLEtBRG5CO0FBS05DLGtCQUFjLENBQUMsU0FBRCxFQUFZLGdCQUFaLEVBQThCLFVBQTlCLEVBQTBDLFlBQTFDLEVBQXdELFVBQXhELEVBQW9FLGNBQXBFLEVBQW9GLFlBQXBGLEVBQWtHLG9CQUFsRztBQUxSO0FBRE8sQ0FBakI7O0FBVUEsSUFBSUMsZ0JBQWdCLElBQXBCO0FBQ0EsSUFBSUMsb0JBQW9CLElBQXhCO0FBQ0EsSUFBSUMsZ0JBQWdCLElBQXBCO0FBQ0EsSUFBSUMsWUFBWSxLQUFoQjs7QUFF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QyxDQUFQOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUssb0JBQUw7QUFDRSxZQUFJdEMsd0JBQUosRUFBOEI7QUFDNUI7QUFDRDtBQUNIO0FBQ0EsV0FBSyxZQUFMO0FBQ0EsV0FBSyxVQUFMO0FBQ0UsZUFBT29DLHFCQUFxQkMsV0FBckIsRUFBa0NDLGlCQUFsQyxDQUFQO0FBekNKOztBQTRDQSxXQUFPLElBQVA7QUFDRCxHQXhEcUI7O0FBMER0QmMsa0JBQWdCLHdCQUFVQyxJQUFWLEVBQWdCQyxnQkFBaEIsRUFBa0NDLFFBQWxDLEVBQTRDO0FBQzFELFFBQUlELHFCQUFxQixVQUF6QixFQUFxQztBQUNuQ3hDLG9CQUFjLElBQWQ7QUFDRDtBQUNGO0FBOURxQixDQUF4Qjs7QUFpRUEwQyxPQUFPQyxPQUFQLEdBQWlCWixpQkFBakIiLCJmaWxlIjoiU2VsZWN0RXZlbnRQbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRXZlbnRQcm9wYWdhdG9ycyA9IHJlcXVpcmUoJy4vRXZlbnRQcm9wYWdhdG9ycycpO1xudmFyIEV4ZWN1dGlvbkVudmlyb25tZW50ID0gcmVxdWlyZSgnZmJqcy9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQnKTtcbnZhciBSZWFjdERPTUNvbXBvbmVudFRyZWUgPSByZXF1aXJlKCcuL1JlYWN0RE9NQ29tcG9uZW50VHJlZScpO1xudmFyIFJlYWN0SW5wdXRTZWxlY3Rpb24gPSByZXF1aXJlKCcuL1JlYWN0SW5wdXRTZWxlY3Rpb24nKTtcbnZhciBTeW50aGV0aWNFdmVudCA9IHJlcXVpcmUoJy4vU3ludGhldGljRXZlbnQnKTtcblxudmFyIGdldEFjdGl2ZUVsZW1lbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9nZXRBY3RpdmVFbGVtZW50Jyk7XG52YXIgaXNUZXh0SW5wdXRFbGVtZW50ID0gcmVxdWlyZSgnLi9pc1RleHRJbnB1dEVsZW1lbnQnKTtcbnZhciBzaGFsbG93RXF1YWwgPSByZXF1aXJlKCdmYmpzL2xpYi9zaGFsbG93RXF1YWwnKTtcblxudmFyIHNraXBTZWxlY3Rpb25DaGFuZ2VFdmVudCA9IEV4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSAmJiAnZG9jdW1lbnRNb2RlJyBpbiBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudE1vZGUgPD0gMTE7XG5cbnZhciBldmVudFR5cGVzID0ge1xuICBzZWxlY3Q6IHtcbiAgICBwaGFzZWRSZWdpc3RyYXRpb25OYW1lczoge1xuICAgICAgYnViYmxlZDogJ29uU2VsZWN0JyxcbiAgICAgIGNhcHR1cmVkOiAnb25TZWxlY3RDYXB0dXJlJ1xuICAgIH0sXG4gICAgZGVwZW5kZW5jaWVzOiBbJ3RvcEJsdXInLCAndG9wQ29udGV4dE1lbnUnLCAndG9wRm9jdXMnLCAndG9wS2V5RG93bicsICd0b3BLZXlVcCcsICd0b3BNb3VzZURvd24nLCAndG9wTW91c2VVcCcsICd0b3BTZWxlY3Rpb25DaGFuZ2UnXVxuICB9XG59O1xuXG52YXIgYWN0aXZlRWxlbWVudCA9IG51bGw7XG52YXIgYWN0aXZlRWxlbWVudEluc3QgPSBudWxsO1xudmFyIGxhc3RTZWxlY3Rpb24gPSBudWxsO1xudmFyIG1vdXNlRG93biA9IGZhbHNlO1xuXG4vLyBUcmFjayB3aGV0aGVyIGEgbGlzdGVuZXIgZXhpc3RzIGZvciB0aGlzIHBsdWdpbi4gSWYgbm9uZSBleGlzdCwgd2UgZG9cbi8vIG5vdCBleHRyYWN0IGV2ZW50cy4gU2VlICMzNjM5LlxudmFyIGhhc0xpc3RlbmVyID0gZmFsc2U7XG5cbi8qKlxuICogR2V0IGFuIG9iamVjdCB3aGljaCBpcyBhIHVuaXF1ZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb24uXG4gKlxuICogVGhlIHJldHVybiB2YWx1ZSB3aWxsIG5vdCBiZSBjb25zaXN0ZW50IGFjcm9zcyBub2RlcyBvciBicm93c2VycywgYnV0XG4gKiB0d28gaWRlbnRpY2FsIHNlbGVjdGlvbnMgb24gdGhlIHNhbWUgbm9kZSB3aWxsIHJldHVybiBpZGVudGljYWwgb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0ge0RPTUVsZW1lbnR9IG5vZGVcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuZnVuY3Rpb24gZ2V0U2VsZWN0aW9uKG5vZGUpIHtcbiAgaWYgKCdzZWxlY3Rpb25TdGFydCcgaW4gbm9kZSAmJiBSZWFjdElucHV0U2VsZWN0aW9uLmhhc1NlbGVjdGlvbkNhcGFiaWxpdGllcyhub2RlKSkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGFydDogbm9kZS5zZWxlY3Rpb25TdGFydCxcbiAgICAgIGVuZDogbm9kZS5zZWxlY3Rpb25FbmRcbiAgICB9O1xuICB9IGVsc2UgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICB2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIHJldHVybiB7XG4gICAgICBhbmNob3JOb2RlOiBzZWxlY3Rpb24uYW5jaG9yTm9kZSxcbiAgICAgIGFuY2hvck9mZnNldDogc2VsZWN0aW9uLmFuY2hvck9mZnNldCxcbiAgICAgIGZvY3VzTm9kZTogc2VsZWN0aW9uLmZvY3VzTm9kZSxcbiAgICAgIGZvY3VzT2Zmc2V0OiBzZWxlY3Rpb24uZm9jdXNPZmZzZXRcbiAgICB9O1xuICB9IGVsc2UgaWYgKGRvY3VtZW50LnNlbGVjdGlvbikge1xuICAgIHZhciByYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICAgIHJldHVybiB7XG4gICAgICBwYXJlbnRFbGVtZW50OiByYW5nZS5wYXJlbnRFbGVtZW50KCksXG4gICAgICB0ZXh0OiByYW5nZS50ZXh0LFxuICAgICAgdG9wOiByYW5nZS5ib3VuZGluZ1RvcCxcbiAgICAgIGxlZnQ6IHJhbmdlLmJvdW5kaW5nTGVmdFxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBQb2xsIHNlbGVjdGlvbiB0byBzZWUgd2hldGhlciBpdCdzIGNoYW5nZWQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG5hdGl2ZUV2ZW50XG4gKiBAcmV0dXJuIHs/U3ludGhldGljRXZlbnR9XG4gKi9cbmZ1bmN0aW9uIGNvbnN0cnVjdFNlbGVjdEV2ZW50KG5hdGl2ZUV2ZW50LCBuYXRpdmVFdmVudFRhcmdldCkge1xuICAvLyBFbnN1cmUgd2UgaGF2ZSB0aGUgcmlnaHQgZWxlbWVudCwgYW5kIHRoYXQgdGhlIHVzZXIgaXMgbm90IGRyYWdnaW5nIGFcbiAgLy8gc2VsZWN0aW9uICh0aGlzIG1hdGNoZXMgbmF0aXZlIGBzZWxlY3RgIGV2ZW50IGJlaGF2aW9yKS4gSW4gSFRNTDUsIHNlbGVjdFxuICAvLyBmaXJlcyBvbmx5IG9uIGlucHV0IGFuZCB0ZXh0YXJlYSB0aHVzIGlmIHRoZXJlJ3Mgbm8gZm9jdXNlZCBlbGVtZW50IHdlXG4gIC8vIHdvbid0IGRpc3BhdGNoLlxuICBpZiAobW91c2VEb3duIHx8IGFjdGl2ZUVsZW1lbnQgPT0gbnVsbCB8fCBhY3RpdmVFbGVtZW50ICE9PSBnZXRBY3RpdmVFbGVtZW50KCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIE9ubHkgZmlyZSB3aGVuIHNlbGVjdGlvbiBoYXMgYWN0dWFsbHkgY2hhbmdlZC5cbiAgdmFyIGN1cnJlbnRTZWxlY3Rpb24gPSBnZXRTZWxlY3Rpb24oYWN0aXZlRWxlbWVudCk7XG4gIGlmICghbGFzdFNlbGVjdGlvbiB8fCAhc2hhbGxvd0VxdWFsKGxhc3RTZWxlY3Rpb24sIGN1cnJlbnRTZWxlY3Rpb24pKSB7XG4gICAgbGFzdFNlbGVjdGlvbiA9IGN1cnJlbnRTZWxlY3Rpb247XG5cbiAgICB2YXIgc3ludGhldGljRXZlbnQgPSBTeW50aGV0aWNFdmVudC5nZXRQb29sZWQoZXZlbnRUeXBlcy5zZWxlY3QsIGFjdGl2ZUVsZW1lbnRJbnN0LCBuYXRpdmVFdmVudCwgbmF0aXZlRXZlbnRUYXJnZXQpO1xuXG4gICAgc3ludGhldGljRXZlbnQudHlwZSA9ICdzZWxlY3QnO1xuICAgIHN5bnRoZXRpY0V2ZW50LnRhcmdldCA9IGFjdGl2ZUVsZW1lbnQ7XG5cbiAgICBFdmVudFByb3BhZ2F0b3JzLmFjY3VtdWxhdGVUd29QaGFzZURpc3BhdGNoZXMoc3ludGhldGljRXZlbnQpO1xuXG4gICAgcmV0dXJuIHN5bnRoZXRpY0V2ZW50O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogVGhpcyBwbHVnaW4gY3JlYXRlcyBhbiBgb25TZWxlY3RgIGV2ZW50IHRoYXQgbm9ybWFsaXplcyBzZWxlY3QgZXZlbnRzXG4gKiBhY3Jvc3MgZm9ybSBlbGVtZW50cy5cbiAqXG4gKiBTdXBwb3J0ZWQgZWxlbWVudHMgYXJlOlxuICogLSBpbnB1dCAoc2VlIGBpc1RleHRJbnB1dEVsZW1lbnRgKVxuICogLSB0ZXh0YXJlYVxuICogLSBjb250ZW50RWRpdGFibGVcbiAqXG4gKiBUaGlzIGRpZmZlcnMgZnJvbSBuYXRpdmUgYnJvd3NlciBpbXBsZW1lbnRhdGlvbnMgaW4gdGhlIGZvbGxvd2luZyB3YXlzOlxuICogLSBGaXJlcyBvbiBjb250ZW50RWRpdGFibGUgZmllbGRzIGFzIHdlbGwgYXMgaW5wdXRzLlxuICogLSBGaXJlcyBmb3IgY29sbGFwc2VkIHNlbGVjdGlvbi5cbiAqIC0gRmlyZXMgYWZ0ZXIgdXNlciBpbnB1dC5cbiAqL1xudmFyIFNlbGVjdEV2ZW50UGx1Z2luID0ge1xuXG4gIGV2ZW50VHlwZXM6IGV2ZW50VHlwZXMsXG5cbiAgZXh0cmFjdEV2ZW50czogZnVuY3Rpb24gKHRvcExldmVsVHlwZSwgdGFyZ2V0SW5zdCwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KSB7XG4gICAgaWYgKCFoYXNMaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldE5vZGUgPSB0YXJnZXRJbnN0ID8gUmVhY3RET01Db21wb25lbnRUcmVlLmdldE5vZGVGcm9tSW5zdGFuY2UodGFyZ2V0SW5zdCkgOiB3aW5kb3c7XG5cbiAgICBzd2l0Y2ggKHRvcExldmVsVHlwZSkge1xuICAgICAgLy8gVHJhY2sgdGhlIGlucHV0IG5vZGUgdGhhdCBoYXMgZm9jdXMuXG4gICAgICBjYXNlICd0b3BGb2N1cyc6XG4gICAgICAgIGlmIChpc1RleHRJbnB1dEVsZW1lbnQodGFyZ2V0Tm9kZSkgfHwgdGFyZ2V0Tm9kZS5jb250ZW50RWRpdGFibGUgPT09ICd0cnVlJykge1xuICAgICAgICAgIGFjdGl2ZUVsZW1lbnQgPSB0YXJnZXROb2RlO1xuICAgICAgICAgIGFjdGl2ZUVsZW1lbnRJbnN0ID0gdGFyZ2V0SW5zdDtcbiAgICAgICAgICBsYXN0U2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcEJsdXInOlxuICAgICAgICBhY3RpdmVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgYWN0aXZlRWxlbWVudEluc3QgPSBudWxsO1xuICAgICAgICBsYXN0U2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8vIERvbid0IGZpcmUgdGhlIGV2ZW50IHdoaWxlIHRoZSB1c2VyIGlzIGRyYWdnaW5nLiBUaGlzIG1hdGNoZXMgdGhlXG4gICAgICAvLyBzZW1hbnRpY3Mgb2YgdGhlIG5hdGl2ZSBzZWxlY3QgZXZlbnQuXG4gICAgICBjYXNlICd0b3BNb3VzZURvd24nOlxuICAgICAgICBtb3VzZURvd24gPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcENvbnRleHRNZW51JzpcbiAgICAgIGNhc2UgJ3RvcE1vdXNlVXAnOlxuICAgICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGNvbnN0cnVjdFNlbGVjdEV2ZW50KG5hdGl2ZUV2ZW50LCBuYXRpdmVFdmVudFRhcmdldCk7XG5cbiAgICAgIC8vIENocm9tZSBhbmQgSUUgZmlyZSBub24tc3RhbmRhcmQgZXZlbnQgd2hlbiBzZWxlY3Rpb24gaXMgY2hhbmdlZCAoYW5kXG4gICAgICAvLyBzb21ldGltZXMgd2hlbiBpdCBoYXNuJ3QpLiBJRSdzIGV2ZW50IGZpcmVzIG91dCBvZiBvcmRlciB3aXRoIHJlc3BlY3RcbiAgICAgIC8vIHRvIGtleSBhbmQgaW5wdXQgZXZlbnRzIG9uIGRlbGV0aW9uLCBzbyB3ZSBkaXNjYXJkIGl0LlxuICAgICAgLy9cbiAgICAgIC8vIEZpcmVmb3ggZG9lc24ndCBzdXBwb3J0IHNlbGVjdGlvbmNoYW5nZSwgc28gY2hlY2sgc2VsZWN0aW9uIHN0YXR1c1xuICAgICAgLy8gYWZ0ZXIgZWFjaCBrZXkgZW50cnkuIFRoZSBzZWxlY3Rpb24gY2hhbmdlcyBhZnRlciBrZXlkb3duIGFuZCBiZWZvcmVcbiAgICAgIC8vIGtleXVwLCBidXQgd2UgY2hlY2sgb24ga2V5ZG93biBhcyB3ZWxsIGluIHRoZSBjYXNlIG9mIGhvbGRpbmcgZG93biBhXG4gICAgICAvLyBrZXksIHdoZW4gbXVsdGlwbGUga2V5ZG93biBldmVudHMgYXJlIGZpcmVkIGJ1dCBvbmx5IG9uZSBrZXl1cCBpcy5cbiAgICAgIC8vIFRoaXMgaXMgYWxzbyBvdXIgYXBwcm9hY2ggZm9yIElFIGhhbmRsaW5nLCBmb3IgdGhlIHJlYXNvbiBhYm92ZS5cbiAgICAgIGNhc2UgJ3RvcFNlbGVjdGlvbkNoYW5nZSc6XG4gICAgICAgIGlmIChza2lwU2VsZWN0aW9uQ2hhbmdlRXZlbnQpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgY2FzZSAndG9wS2V5RG93bic6XG4gICAgICBjYXNlICd0b3BLZXlVcCc6XG4gICAgICAgIHJldHVybiBjb25zdHJ1Y3RTZWxlY3RFdmVudChuYXRpdmVFdmVudCwgbmF0aXZlRXZlbnRUYXJnZXQpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIGRpZFB1dExpc3RlbmVyOiBmdW5jdGlvbiAoaW5zdCwgcmVnaXN0cmF0aW9uTmFtZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAocmVnaXN0cmF0aW9uTmFtZSA9PT0gJ29uU2VsZWN0Jykge1xuICAgICAgaGFzTGlzdGVuZXIgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RFdmVudFBsdWdpbjsiXX0=