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
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
var SyntheticMouseEvent = require('./SyntheticMouseEvent');

var eventTypes = {
  mouseEnter: {
    registrationName: 'onMouseEnter',
    dependencies: ['topMouseOut', 'topMouseOver']
  },
  mouseLeave: {
    registrationName: 'onMouseLeave',
    dependencies: ['topMouseOut', 'topMouseOver']
  }
};

var EnterLeaveEventPlugin = {

  eventTypes: eventTypes,

  /**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   */
  extractEvents: function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    if (topLevelType === 'topMouseOver' && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
      return null;
    }
    if (topLevelType !== 'topMouseOut' && topLevelType !== 'topMouseOver') {
      // Must not be a mouse in or mouse out - ignoring.
      return null;
    }

    var win;
    if (nativeEventTarget.window === nativeEventTarget) {
      // `nativeEventTarget` is probably a window object.
      win = nativeEventTarget;
    } else {
      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
      var doc = nativeEventTarget.ownerDocument;
      if (doc) {
        win = doc.defaultView || doc.parentWindow;
      } else {
        win = window;
      }
    }

    var from;
    var to;
    if (topLevelType === 'topMouseOut') {
      from = targetInst;
      var related = nativeEvent.relatedTarget || nativeEvent.toElement;
      to = related ? ReactDOMComponentTree.getClosestInstanceFromNode(related) : null;
    } else {
      // Moving to a node from outside the window.
      from = null;
      to = targetInst;
    }

    if (from === to) {
      // Nothing pertains to our managed components.
      return null;
    }

    var fromNode = from == null ? win : ReactDOMComponentTree.getNodeFromInstance(from);
    var toNode = to == null ? win : ReactDOMComponentTree.getNodeFromInstance(to);

    var leave = SyntheticMouseEvent.getPooled(eventTypes.mouseLeave, from, nativeEvent, nativeEventTarget);
    leave.type = 'mouseleave';
    leave.target = fromNode;
    leave.relatedTarget = toNode;

    var enter = SyntheticMouseEvent.getPooled(eventTypes.mouseEnter, to, nativeEvent, nativeEventTarget);
    enter.type = 'mouseenter';
    enter.target = toNode;
    enter.relatedTarget = fromNode;

    EventPropagators.accumulateEnterLeaveDispatches(leave, enter, from, to);

    return [leave, enter];
  }

};

module.exports = EnterLeaveEventPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9FbnRlckxlYXZlRXZlbnRQbHVnaW4uanMiXSwibmFtZXMiOlsiRXZlbnRQcm9wYWdhdG9ycyIsInJlcXVpcmUiLCJSZWFjdERPTUNvbXBvbmVudFRyZWUiLCJTeW50aGV0aWNNb3VzZUV2ZW50IiwiZXZlbnRUeXBlcyIsIm1vdXNlRW50ZXIiLCJyZWdpc3RyYXRpb25OYW1lIiwiZGVwZW5kZW5jaWVzIiwibW91c2VMZWF2ZSIsIkVudGVyTGVhdmVFdmVudFBsdWdpbiIsImV4dHJhY3RFdmVudHMiLCJ0b3BMZXZlbFR5cGUiLCJ0YXJnZXRJbnN0IiwibmF0aXZlRXZlbnQiLCJuYXRpdmVFdmVudFRhcmdldCIsInJlbGF0ZWRUYXJnZXQiLCJmcm9tRWxlbWVudCIsIndpbiIsIndpbmRvdyIsImRvYyIsIm93bmVyRG9jdW1lbnQiLCJkZWZhdWx0VmlldyIsInBhcmVudFdpbmRvdyIsImZyb20iLCJ0byIsInJlbGF0ZWQiLCJ0b0VsZW1lbnQiLCJnZXRDbG9zZXN0SW5zdGFuY2VGcm9tTm9kZSIsImZyb21Ob2RlIiwiZ2V0Tm9kZUZyb21JbnN0YW5jZSIsInRvTm9kZSIsImxlYXZlIiwiZ2V0UG9vbGVkIiwidHlwZSIsInRhcmdldCIsImVudGVyIiwiYWNjdW11bGF0ZUVudGVyTGVhdmVEaXNwYXRjaGVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxJQUFJQSxtQkFBbUJDLFFBQVEsb0JBQVIsQ0FBdkI7QUFDQSxJQUFJQyx3QkFBd0JELFFBQVEseUJBQVIsQ0FBNUI7QUFDQSxJQUFJRSxzQkFBc0JGLFFBQVEsdUJBQVIsQ0FBMUI7O0FBRUEsSUFBSUcsYUFBYTtBQUNmQyxjQUFZO0FBQ1ZDLHNCQUFrQixjQURSO0FBRVZDLGtCQUFjLENBQUMsYUFBRCxFQUFnQixjQUFoQjtBQUZKLEdBREc7QUFLZkMsY0FBWTtBQUNWRixzQkFBa0IsY0FEUjtBQUVWQyxrQkFBYyxDQUFDLGFBQUQsRUFBZ0IsY0FBaEI7QUFGSjtBQUxHLENBQWpCOztBQVdBLElBQUlFLHdCQUF3Qjs7QUFFMUJMLGNBQVlBLFVBRmM7O0FBSTFCOzs7Ozs7O0FBT0FNLGlCQUFlLHVCQUFVQyxZQUFWLEVBQXdCQyxVQUF4QixFQUFvQ0MsV0FBcEMsRUFBaURDLGlCQUFqRCxFQUFvRTtBQUNqRixRQUFJSCxpQkFBaUIsY0FBakIsS0FBb0NFLFlBQVlFLGFBQVosSUFBNkJGLFlBQVlHLFdBQTdFLENBQUosRUFBK0Y7QUFDN0YsYUFBTyxJQUFQO0FBQ0Q7QUFDRCxRQUFJTCxpQkFBaUIsYUFBakIsSUFBa0NBLGlCQUFpQixjQUF2RCxFQUF1RTtBQUNyRTtBQUNBLGFBQU8sSUFBUDtBQUNEOztBQUVELFFBQUlNLEdBQUo7QUFDQSxRQUFJSCxrQkFBa0JJLE1BQWxCLEtBQTZCSixpQkFBakMsRUFBb0Q7QUFDbEQ7QUFDQUcsWUFBTUgsaUJBQU47QUFDRCxLQUhELE1BR087QUFDTDtBQUNBLFVBQUlLLE1BQU1MLGtCQUFrQk0sYUFBNUI7QUFDQSxVQUFJRCxHQUFKLEVBQVM7QUFDUEYsY0FBTUUsSUFBSUUsV0FBSixJQUFtQkYsSUFBSUcsWUFBN0I7QUFDRCxPQUZELE1BRU87QUFDTEwsY0FBTUMsTUFBTjtBQUNEO0FBQ0Y7O0FBRUQsUUFBSUssSUFBSjtBQUNBLFFBQUlDLEVBQUo7QUFDQSxRQUFJYixpQkFBaUIsYUFBckIsRUFBb0M7QUFDbENZLGFBQU9YLFVBQVA7QUFDQSxVQUFJYSxVQUFVWixZQUFZRSxhQUFaLElBQTZCRixZQUFZYSxTQUF2RDtBQUNBRixXQUFLQyxVQUFVdkIsc0JBQXNCeUIsMEJBQXRCLENBQWlERixPQUFqRCxDQUFWLEdBQXNFLElBQTNFO0FBQ0QsS0FKRCxNQUlPO0FBQ0w7QUFDQUYsYUFBTyxJQUFQO0FBQ0FDLFdBQUtaLFVBQUw7QUFDRDs7QUFFRCxRQUFJVyxTQUFTQyxFQUFiLEVBQWlCO0FBQ2Y7QUFDQSxhQUFPLElBQVA7QUFDRDs7QUFFRCxRQUFJSSxXQUFXTCxRQUFRLElBQVIsR0FBZU4sR0FBZixHQUFxQmYsc0JBQXNCMkIsbUJBQXRCLENBQTBDTixJQUExQyxDQUFwQztBQUNBLFFBQUlPLFNBQVNOLE1BQU0sSUFBTixHQUFhUCxHQUFiLEdBQW1CZixzQkFBc0IyQixtQkFBdEIsQ0FBMENMLEVBQTFDLENBQWhDOztBQUVBLFFBQUlPLFFBQVE1QixvQkFBb0I2QixTQUFwQixDQUE4QjVCLFdBQVdJLFVBQXpDLEVBQXFEZSxJQUFyRCxFQUEyRFYsV0FBM0QsRUFBd0VDLGlCQUF4RSxDQUFaO0FBQ0FpQixVQUFNRSxJQUFOLEdBQWEsWUFBYjtBQUNBRixVQUFNRyxNQUFOLEdBQWVOLFFBQWY7QUFDQUcsVUFBTWhCLGFBQU4sR0FBc0JlLE1BQXRCOztBQUVBLFFBQUlLLFFBQVFoQyxvQkFBb0I2QixTQUFwQixDQUE4QjVCLFdBQVdDLFVBQXpDLEVBQXFEbUIsRUFBckQsRUFBeURYLFdBQXpELEVBQXNFQyxpQkFBdEUsQ0FBWjtBQUNBcUIsVUFBTUYsSUFBTixHQUFhLFlBQWI7QUFDQUUsVUFBTUQsTUFBTixHQUFlSixNQUFmO0FBQ0FLLFVBQU1wQixhQUFOLEdBQXNCYSxRQUF0Qjs7QUFFQTVCLHFCQUFpQm9DLDhCQUFqQixDQUFnREwsS0FBaEQsRUFBdURJLEtBQXZELEVBQThEWixJQUE5RCxFQUFvRUMsRUFBcEU7O0FBRUEsV0FBTyxDQUFDTyxLQUFELEVBQVFJLEtBQVIsQ0FBUDtBQUNEOztBQW5FeUIsQ0FBNUI7O0FBdUVBRSxPQUFPQyxPQUFQLEdBQWlCN0IscUJBQWpCIiwiZmlsZSI6IkVudGVyTGVhdmVFdmVudFBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudFByb3BhZ2F0b3JzID0gcmVxdWlyZSgnLi9FdmVudFByb3BhZ2F0b3JzJyk7XG52YXIgUmVhY3RET01Db21wb25lbnRUcmVlID0gcmVxdWlyZSgnLi9SZWFjdERPTUNvbXBvbmVudFRyZWUnKTtcbnZhciBTeW50aGV0aWNNb3VzZUV2ZW50ID0gcmVxdWlyZSgnLi9TeW50aGV0aWNNb3VzZUV2ZW50Jyk7XG5cbnZhciBldmVudFR5cGVzID0ge1xuICBtb3VzZUVudGVyOiB7XG4gICAgcmVnaXN0cmF0aW9uTmFtZTogJ29uTW91c2VFbnRlcicsXG4gICAgZGVwZW5kZW5jaWVzOiBbJ3RvcE1vdXNlT3V0JywgJ3RvcE1vdXNlT3ZlciddXG4gIH0sXG4gIG1vdXNlTGVhdmU6IHtcbiAgICByZWdpc3RyYXRpb25OYW1lOiAnb25Nb3VzZUxlYXZlJyxcbiAgICBkZXBlbmRlbmNpZXM6IFsndG9wTW91c2VPdXQnLCAndG9wTW91c2VPdmVyJ11cbiAgfVxufTtcblxudmFyIEVudGVyTGVhdmVFdmVudFBsdWdpbiA9IHtcblxuICBldmVudFR5cGVzOiBldmVudFR5cGVzLFxuXG4gIC8qKlxuICAgKiBGb3IgYWxtb3N0IGV2ZXJ5IGludGVyYWN0aW9uIHdlIGNhcmUgYWJvdXQsIHRoZXJlIHdpbGwgYmUgYm90aCBhIHRvcC1sZXZlbFxuICAgKiBgbW91c2VvdmVyYCBhbmQgYG1vdXNlb3V0YCBldmVudCB0aGF0IG9jY3Vycy4gT25seSB1c2UgYG1vdXNlb3V0YCBzbyB0aGF0XG4gICAqIHdlIGRvIG5vdCBleHRyYWN0IGR1cGxpY2F0ZSBldmVudHMuIEhvd2V2ZXIsIG1vdmluZyB0aGUgbW91c2UgaW50byB0aGVcbiAgICogYnJvd3NlciBmcm9tIG91dHNpZGUgd2lsbCBub3QgZmlyZSBhIGBtb3VzZW91dGAgZXZlbnQuIEluIHRoaXMgY2FzZSwgd2UgdXNlXG4gICAqIHRoZSBgbW91c2VvdmVyYCB0b3AtbGV2ZWwgZXZlbnQuXG4gICAqL1xuICBleHRyYWN0RXZlbnRzOiBmdW5jdGlvbiAodG9wTGV2ZWxUeXBlLCB0YXJnZXRJbnN0LCBuYXRpdmVFdmVudCwgbmF0aXZlRXZlbnRUYXJnZXQpIHtcbiAgICBpZiAodG9wTGV2ZWxUeXBlID09PSAndG9wTW91c2VPdmVyJyAmJiAobmF0aXZlRXZlbnQucmVsYXRlZFRhcmdldCB8fCBuYXRpdmVFdmVudC5mcm9tRWxlbWVudCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAodG9wTGV2ZWxUeXBlICE9PSAndG9wTW91c2VPdXQnICYmIHRvcExldmVsVHlwZSAhPT0gJ3RvcE1vdXNlT3ZlcicpIHtcbiAgICAgIC8vIE11c3Qgbm90IGJlIGEgbW91c2UgaW4gb3IgbW91c2Ugb3V0IC0gaWdub3JpbmcuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgd2luO1xuICAgIGlmIChuYXRpdmVFdmVudFRhcmdldC53aW5kb3cgPT09IG5hdGl2ZUV2ZW50VGFyZ2V0KSB7XG4gICAgICAvLyBgbmF0aXZlRXZlbnRUYXJnZXRgIGlzIHByb2JhYmx5IGEgd2luZG93IG9iamVjdC5cbiAgICAgIHdpbiA9IG5hdGl2ZUV2ZW50VGFyZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPOiBGaWd1cmUgb3V0IHdoeSBgb3duZXJEb2N1bWVudGAgaXMgc29tZXRpbWVzIHVuZGVmaW5lZCBpbiBJRTguXG4gICAgICB2YXIgZG9jID0gbmF0aXZlRXZlbnRUYXJnZXQub3duZXJEb2N1bWVudDtcbiAgICAgIGlmIChkb2MpIHtcbiAgICAgICAgd2luID0gZG9jLmRlZmF1bHRWaWV3IHx8IGRvYy5wYXJlbnRXaW5kb3c7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW4gPSB3aW5kb3c7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGZyb207XG4gICAgdmFyIHRvO1xuICAgIGlmICh0b3BMZXZlbFR5cGUgPT09ICd0b3BNb3VzZU91dCcpIHtcbiAgICAgIGZyb20gPSB0YXJnZXRJbnN0O1xuICAgICAgdmFyIHJlbGF0ZWQgPSBuYXRpdmVFdmVudC5yZWxhdGVkVGFyZ2V0IHx8IG5hdGl2ZUV2ZW50LnRvRWxlbWVudDtcbiAgICAgIHRvID0gcmVsYXRlZCA/IFJlYWN0RE9NQ29tcG9uZW50VHJlZS5nZXRDbG9zZXN0SW5zdGFuY2VGcm9tTm9kZShyZWxhdGVkKSA6IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE1vdmluZyB0byBhIG5vZGUgZnJvbSBvdXRzaWRlIHRoZSB3aW5kb3cuXG4gICAgICBmcm9tID0gbnVsbDtcbiAgICAgIHRvID0gdGFyZ2V0SW5zdDtcbiAgICB9XG5cbiAgICBpZiAoZnJvbSA9PT0gdG8pIHtcbiAgICAgIC8vIE5vdGhpbmcgcGVydGFpbnMgdG8gb3VyIG1hbmFnZWQgY29tcG9uZW50cy5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBmcm9tTm9kZSA9IGZyb20gPT0gbnVsbCA/IHdpbiA6IFJlYWN0RE9NQ29tcG9uZW50VHJlZS5nZXROb2RlRnJvbUluc3RhbmNlKGZyb20pO1xuICAgIHZhciB0b05vZGUgPSB0byA9PSBudWxsID8gd2luIDogUmVhY3RET01Db21wb25lbnRUcmVlLmdldE5vZGVGcm9tSW5zdGFuY2UodG8pO1xuXG4gICAgdmFyIGxlYXZlID0gU3ludGhldGljTW91c2VFdmVudC5nZXRQb29sZWQoZXZlbnRUeXBlcy5tb3VzZUxlYXZlLCBmcm9tLCBuYXRpdmVFdmVudCwgbmF0aXZlRXZlbnRUYXJnZXQpO1xuICAgIGxlYXZlLnR5cGUgPSAnbW91c2VsZWF2ZSc7XG4gICAgbGVhdmUudGFyZ2V0ID0gZnJvbU5vZGU7XG4gICAgbGVhdmUucmVsYXRlZFRhcmdldCA9IHRvTm9kZTtcblxuICAgIHZhciBlbnRlciA9IFN5bnRoZXRpY01vdXNlRXZlbnQuZ2V0UG9vbGVkKGV2ZW50VHlwZXMubW91c2VFbnRlciwgdG8sIG5hdGl2ZUV2ZW50LCBuYXRpdmVFdmVudFRhcmdldCk7XG4gICAgZW50ZXIudHlwZSA9ICdtb3VzZWVudGVyJztcbiAgICBlbnRlci50YXJnZXQgPSB0b05vZGU7XG4gICAgZW50ZXIucmVsYXRlZFRhcmdldCA9IGZyb21Ob2RlO1xuXG4gICAgRXZlbnRQcm9wYWdhdG9ycy5hY2N1bXVsYXRlRW50ZXJMZWF2ZURpc3BhdGNoZXMobGVhdmUsIGVudGVyLCBmcm9tLCB0byk7XG5cbiAgICByZXR1cm4gW2xlYXZlLCBlbnRlcl07XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRlckxlYXZlRXZlbnRQbHVnaW47Il19