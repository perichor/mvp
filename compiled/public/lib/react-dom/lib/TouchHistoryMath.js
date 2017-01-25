/**
 */

'use strict';

var TouchHistoryMath = {
  /**
   * This code is optimized and not intended to look beautiful. This allows
   * computing of touch centroids that have moved after `touchesChangedAfter`
   * timeStamp. You can compute the current centroid involving all touches
   * moves after `touchesChangedAfter`, or you can compute the previous
   * centroid of all touches that were moved after `touchesChangedAfter`.
   *
   * @param {TouchHistoryMath} touchHistory Standard Responder touch track
   * data.
   * @param {number} touchesChangedAfter timeStamp after which moved touches
   * are considered "actively moving" - not just "active".
   * @param {boolean} isXAxis Consider `x` dimension vs. `y` dimension.
   * @param {boolean} ofCurrent Compute current centroid for actively moving
   * touches vs. previous centroid of now actively moving touches.
   * @return {number} value of centroid in specified dimension.
   */
  centroidDimension: function centroidDimension(touchHistory, touchesChangedAfter, isXAxis, ofCurrent) {
    var touchBank = touchHistory.touchBank;
    var total = 0;
    var count = 0;

    var oneTouchData = touchHistory.numberActiveTouches === 1 ? touchHistory.touchBank[touchHistory.indexOfSingleActiveTouch] : null;

    if (oneTouchData !== null) {
      if (oneTouchData.touchActive && oneTouchData.currentTimeStamp > touchesChangedAfter) {
        total += ofCurrent && isXAxis ? oneTouchData.currentPageX : ofCurrent && !isXAxis ? oneTouchData.currentPageY : !ofCurrent && isXAxis ? oneTouchData.previousPageX : oneTouchData.previousPageY;
        count = 1;
      }
    } else {
      for (var i = 0; i < touchBank.length; i++) {
        var touchTrack = touchBank[i];
        if (touchTrack !== null && touchTrack !== undefined && touchTrack.touchActive && touchTrack.currentTimeStamp >= touchesChangedAfter) {
          var toAdd; // Yuck, program temporarily in invalid state.
          if (ofCurrent && isXAxis) {
            toAdd = touchTrack.currentPageX;
          } else if (ofCurrent && !isXAxis) {
            toAdd = touchTrack.currentPageY;
          } else if (!ofCurrent && isXAxis) {
            toAdd = touchTrack.previousPageX;
          } else {
            toAdd = touchTrack.previousPageY;
          }
          total += toAdd;
          count++;
        }
      }
    }
    return count > 0 ? total / count : TouchHistoryMath.noCentroid;
  },

  currentCentroidXOfTouchesChangedAfter: function currentCentroidXOfTouchesChangedAfter(touchHistory, touchesChangedAfter) {
    return TouchHistoryMath.centroidDimension(touchHistory, touchesChangedAfter, true, // isXAxis
    true // ofCurrent
    );
  },

  currentCentroidYOfTouchesChangedAfter: function currentCentroidYOfTouchesChangedAfter(touchHistory, touchesChangedAfter) {
    return TouchHistoryMath.centroidDimension(touchHistory, touchesChangedAfter, false, // isXAxis
    true // ofCurrent
    );
  },

  previousCentroidXOfTouchesChangedAfter: function previousCentroidXOfTouchesChangedAfter(touchHistory, touchesChangedAfter) {
    return TouchHistoryMath.centroidDimension(touchHistory, touchesChangedAfter, true, // isXAxis
    false // ofCurrent
    );
  },

  previousCentroidYOfTouchesChangedAfter: function previousCentroidYOfTouchesChangedAfter(touchHistory, touchesChangedAfter) {
    return TouchHistoryMath.centroidDimension(touchHistory, touchesChangedAfter, false, // isXAxis
    false // ofCurrent
    );
  },

  currentCentroidX: function currentCentroidX(touchHistory) {
    return TouchHistoryMath.centroidDimension(touchHistory, 0, // touchesChangedAfter
    true, // isXAxis
    true // ofCurrent
    );
  },

  currentCentroidY: function currentCentroidY(touchHistory) {
    return TouchHistoryMath.centroidDimension(touchHistory, 0, // touchesChangedAfter
    false, // isXAxis
    true // ofCurrent
    );
  },

  noCentroid: -1
};

module.exports = TouchHistoryMath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9Ub3VjaEhpc3RvcnlNYXRoLmpzIl0sIm5hbWVzIjpbIlRvdWNoSGlzdG9yeU1hdGgiLCJjZW50cm9pZERpbWVuc2lvbiIsInRvdWNoSGlzdG9yeSIsInRvdWNoZXNDaGFuZ2VkQWZ0ZXIiLCJpc1hBeGlzIiwib2ZDdXJyZW50IiwidG91Y2hCYW5rIiwidG90YWwiLCJjb3VudCIsIm9uZVRvdWNoRGF0YSIsIm51bWJlckFjdGl2ZVRvdWNoZXMiLCJpbmRleE9mU2luZ2xlQWN0aXZlVG91Y2giLCJ0b3VjaEFjdGl2ZSIsImN1cnJlbnRUaW1lU3RhbXAiLCJjdXJyZW50UGFnZVgiLCJjdXJyZW50UGFnZVkiLCJwcmV2aW91c1BhZ2VYIiwicHJldmlvdXNQYWdlWSIsImkiLCJsZW5ndGgiLCJ0b3VjaFRyYWNrIiwidW5kZWZpbmVkIiwidG9BZGQiLCJub0NlbnRyb2lkIiwiY3VycmVudENlbnRyb2lkWE9mVG91Y2hlc0NoYW5nZWRBZnRlciIsImN1cnJlbnRDZW50cm9pZFlPZlRvdWNoZXNDaGFuZ2VkQWZ0ZXIiLCJwcmV2aW91c0NlbnRyb2lkWE9mVG91Y2hlc0NoYW5nZWRBZnRlciIsInByZXZpb3VzQ2VudHJvaWRZT2ZUb3VjaGVzQ2hhbmdlZEFmdGVyIiwiY3VycmVudENlbnRyb2lkWCIsImN1cnJlbnRDZW50cm9pZFkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7O0FBR0E7O0FBRUEsSUFBSUEsbUJBQW1CO0FBQ3JCOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBQyxxQkFBbUIsMkJBQVVDLFlBQVYsRUFBd0JDLG1CQUF4QixFQUE2Q0MsT0FBN0MsRUFBc0RDLFNBQXRELEVBQWlFO0FBQ2xGLFFBQUlDLFlBQVlKLGFBQWFJLFNBQTdCO0FBQ0EsUUFBSUMsUUFBUSxDQUFaO0FBQ0EsUUFBSUMsUUFBUSxDQUFaOztBQUVBLFFBQUlDLGVBQWVQLGFBQWFRLG1CQUFiLEtB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QW5DLEVBQWlELENBQWpELEVBQW9EO0FBQzNELFNBRE8sRUFDQTtBQUNQLFFBRk8sQ0FFRjtBQUZFLEtBQVA7QUFJRCxHQXZGb0I7O0FBeUZyQnFCLGNBQVksQ0FBQztBQXpGUSxDQUF2Qjs7QUE0RkFPLE9BQU9DLE9BQVAsR0FBaUIvQixnQkFBakIiLCJmaWxlIjoiVG91Y2hIaXN0b3J5TWF0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFRvdWNoSGlzdG9yeU1hdGggPSB7XG4gIC8qKlxuICAgKiBUaGlzIGNvZGUgaXMgb3B0aW1pemVkIGFuZCBub3QgaW50ZW5kZWQgdG8gbG9vayBiZWF1dGlmdWwuIFRoaXMgYWxsb3dzXG4gICAqIGNvbXB1dGluZyBvZiB0b3VjaCBjZW50cm9pZHMgdGhhdCBoYXZlIG1vdmVkIGFmdGVyIGB0b3VjaGVzQ2hhbmdlZEFmdGVyYFxuICAgKiB0aW1lU3RhbXAuIFlvdSBjYW4gY29tcHV0ZSB0aGUgY3VycmVudCBjZW50cm9pZCBpbnZvbHZpbmcgYWxsIHRvdWNoZXNcbiAgICogbW92ZXMgYWZ0ZXIgYHRvdWNoZXNDaGFuZ2VkQWZ0ZXJgLCBvciB5b3UgY2FuIGNvbXB1dGUgdGhlIHByZXZpb3VzXG4gICAqIGNlbnRyb2lkIG9mIGFsbCB0b3VjaGVzIHRoYXQgd2VyZSBtb3ZlZCBhZnRlciBgdG91Y2hlc0NoYW5nZWRBZnRlcmAuXG4gICAqXG4gICAqIEBwYXJhbSB7VG91Y2hIaXN0b3J5TWF0aH0gdG91Y2hIaXN0b3J5IFN0YW5kYXJkIFJlc3BvbmRlciB0b3VjaCB0cmFja1xuICAgKiBkYXRhLlxuICAgKiBAcGFyYW0ge251bWJlcn0gdG91Y2hlc0NoYW5nZWRBZnRlciB0aW1lU3RhbXAgYWZ0ZXIgd2hpY2ggbW92ZWQgdG91Y2hlc1xuICAgKiBhcmUgY29uc2lkZXJlZCBcImFjdGl2ZWx5IG1vdmluZ1wiIC0gbm90IGp1c3QgXCJhY3RpdmVcIi5cbiAgICogQHBhcmFtIHtib29sZWFufSBpc1hBeGlzIENvbnNpZGVyIGB4YCBkaW1lbnNpb24gdnMuIGB5YCBkaW1lbnNpb24uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb2ZDdXJyZW50IENvbXB1dGUgY3VycmVudCBjZW50cm9pZCBmb3IgYWN0aXZlbHkgbW92aW5nXG4gICAqIHRvdWNoZXMgdnMuIHByZXZpb3VzIGNlbnRyb2lkIG9mIG5vdyBhY3RpdmVseSBtb3ZpbmcgdG91Y2hlcy5cbiAgICogQHJldHVybiB7bnVtYmVyfSB2YWx1ZSBvZiBjZW50cm9pZCBpbiBzcGVjaWZpZWQgZGltZW5zaW9uLlxuICAgKi9cbiAgY2VudHJvaWREaW1lbnNpb246IGZ1bmN0aW9uICh0b3VjaEhpc3RvcnksIHRvdWNoZXNDaGFuZ2VkQWZ0ZXIsIGlzWEF4aXMsIG9mQ3VycmVudCkge1xuICAgIHZhciB0b3VjaEJhbmsgPSB0b3VjaEhpc3RvcnkudG91Y2hCYW5rO1xuICAgIHZhciB0b3RhbCA9IDA7XG4gICAgdmFyIGNvdW50ID0gMDtcblxuICAgIHZhciBvbmVUb3VjaERhdGEgPSB0b3VjaEhpc3RvcnkubnVtYmVyQWN0aXZlVG91Y2hlcyA9PT0gMSA/IHRvdWNoSGlzdG9yeS50b3VjaEJhbmtbdG91Y2hIaXN0b3J5LmluZGV4T2ZTaW5nbGVBY3RpdmVUb3VjaF0gOiBudWxsO1xuXG4gICAgaWYgKG9uZVRvdWNoRGF0YSAhPT0gbnVsbCkge1xuICAgICAgaWYgKG9uZVRvdWNoRGF0YS50b3VjaEFjdGl2ZSAmJiBvbmVUb3VjaERhdGEuY3VycmVudFRpbWVTdGFtcCA+IHRvdWNoZXNDaGFuZ2VkQWZ0ZXIpIHtcbiAgICAgICAgdG90YWwgKz0gb2ZDdXJyZW50ICYmIGlzWEF4aXMgPyBvbmVUb3VjaERhdGEuY3VycmVudFBhZ2VYIDogb2ZDdXJyZW50ICYmICFpc1hBeGlzID8gb25lVG91Y2hEYXRhLmN1cnJlbnRQYWdlWSA6ICFvZkN1cnJlbnQgJiYgaXNYQXhpcyA/IG9uZVRvdWNoRGF0YS5wcmV2aW91c1BhZ2VYIDogb25lVG91Y2hEYXRhLnByZXZpb3VzUGFnZVk7XG4gICAgICAgIGNvdW50ID0gMTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3VjaEJhbmsubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRvdWNoVHJhY2sgPSB0b3VjaEJhbmtbaV07XG4gICAgICAgIGlmICh0b3VjaFRyYWNrICE9PSBudWxsICYmIHRvdWNoVHJhY2sgIT09IHVuZGVmaW5lZCAmJiB0b3VjaFRyYWNrLnRvdWNoQWN0aXZlICYmIHRvdWNoVHJhY2suY3VycmVudFRpbWVTdGFtcCA+PSB0b3VjaGVzQ2hhbmdlZEFmdGVyKSB7XG4gICAgICAgICAgdmFyIHRvQWRkOyAvLyBZdWNrLCBwcm9ncmFtIHRlbXBvcmFyaWx5IGluIGludmFsaWQgc3RhdGUuXG4gICAgICAgICAgaWYgKG9mQ3VycmVudCAmJiBpc1hBeGlzKSB7XG4gICAgICAgICAgICB0b0FkZCA9IHRvdWNoVHJhY2suY3VycmVudFBhZ2VYO1xuICAgICAgICAgIH0gZWxzZSBpZiAob2ZDdXJyZW50ICYmICFpc1hBeGlzKSB7XG4gICAgICAgICAgICB0b0FkZCA9IHRvdWNoVHJhY2suY3VycmVudFBhZ2VZO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIW9mQ3VycmVudCAmJiBpc1hBeGlzKSB7XG4gICAgICAgICAgICB0b0FkZCA9IHRvdWNoVHJhY2sucHJldmlvdXNQYWdlWDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9BZGQgPSB0b3VjaFRyYWNrLnByZXZpb3VzUGFnZVk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRvdGFsICs9IHRvQWRkO1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50ID4gMCA/IHRvdGFsIC8gY291bnQgOiBUb3VjaEhpc3RvcnlNYXRoLm5vQ2VudHJvaWQ7XG4gIH0sXG5cbiAgY3VycmVudENlbnRyb2lkWE9mVG91Y2hlc0NoYW5nZWRBZnRlcjogZnVuY3Rpb24gKHRvdWNoSGlzdG9yeSwgdG91Y2hlc0NoYW5nZWRBZnRlcikge1xuICAgIHJldHVybiBUb3VjaEhpc3RvcnlNYXRoLmNlbnRyb2lkRGltZW5zaW9uKHRvdWNoSGlzdG9yeSwgdG91Y2hlc0NoYW5nZWRBZnRlciwgdHJ1ZSwgLy8gaXNYQXhpc1xuICAgIHRydWUgLy8gb2ZDdXJyZW50XG4gICAgKTtcbiAgfSxcblxuICBjdXJyZW50Q2VudHJvaWRZT2ZUb3VjaGVzQ2hhbmdlZEFmdGVyOiBmdW5jdGlvbiAodG91Y2hIaXN0b3J5LCB0b3VjaGVzQ2hhbmdlZEFmdGVyKSB7XG4gICAgcmV0dXJuIFRvdWNoSGlzdG9yeU1hdGguY2VudHJvaWREaW1lbnNpb24odG91Y2hIaXN0b3J5LCB0b3VjaGVzQ2hhbmdlZEFmdGVyLCBmYWxzZSwgLy8gaXNYQXhpc1xuICAgIHRydWUgLy8gb2ZDdXJyZW50XG4gICAgKTtcbiAgfSxcblxuICBwcmV2aW91c0NlbnRyb2lkWE9mVG91Y2hlc0NoYW5nZWRBZnRlcjogZnVuY3Rpb24gKHRvdWNoSGlzdG9yeSwgdG91Y2hlc0NoYW5nZWRBZnRlcikge1xuICAgIHJldHVybiBUb3VjaEhpc3RvcnlNYXRoLmNlbnRyb2lkRGltZW5zaW9uKHRvdWNoSGlzdG9yeSwgdG91Y2hlc0NoYW5nZWRBZnRlciwgdHJ1ZSwgLy8gaXNYQXhpc1xuICAgIGZhbHNlIC8vIG9mQ3VycmVudFxuICAgICk7XG4gIH0sXG5cbiAgcHJldmlvdXNDZW50cm9pZFlPZlRvdWNoZXNDaGFuZ2VkQWZ0ZXI6IGZ1bmN0aW9uICh0b3VjaEhpc3RvcnksIHRvdWNoZXNDaGFuZ2VkQWZ0ZXIpIHtcbiAgICByZXR1cm4gVG91Y2hIaXN0b3J5TWF0aC5jZW50cm9pZERpbWVuc2lvbih0b3VjaEhpc3RvcnksIHRvdWNoZXNDaGFuZ2VkQWZ0ZXIsIGZhbHNlLCAvLyBpc1hBeGlzXG4gICAgZmFsc2UgLy8gb2ZDdXJyZW50XG4gICAgKTtcbiAgfSxcblxuICBjdXJyZW50Q2VudHJvaWRYOiBmdW5jdGlvbiAodG91Y2hIaXN0b3J5KSB7XG4gICAgcmV0dXJuIFRvdWNoSGlzdG9yeU1hdGguY2VudHJvaWREaW1lbnNpb24odG91Y2hIaXN0b3J5LCAwLCAvLyB0b3VjaGVzQ2hhbmdlZEFmdGVyXG4gICAgdHJ1ZSwgLy8gaXNYQXhpc1xuICAgIHRydWUgLy8gb2ZDdXJyZW50XG4gICAgKTtcbiAgfSxcblxuICBjdXJyZW50Q2VudHJvaWRZOiBmdW5jdGlvbiAodG91Y2hIaXN0b3J5KSB7XG4gICAgcmV0dXJuIFRvdWNoSGlzdG9yeU1hdGguY2VudHJvaWREaW1lbnNpb24odG91Y2hIaXN0b3J5LCAwLCAvLyB0b3VjaGVzQ2hhbmdlZEFmdGVyXG4gICAgZmFsc2UsIC8vIGlzWEF4aXNcbiAgICB0cnVlIC8vIG9mQ3VycmVudFxuICAgICk7XG4gIH0sXG5cbiAgbm9DZW50cm9pZDogLTFcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVG91Y2hIaXN0b3J5TWF0aDsiXX0=