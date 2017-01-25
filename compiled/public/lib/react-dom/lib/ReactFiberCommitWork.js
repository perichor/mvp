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

var ReactTypeOfWork = require('./ReactTypeOfWork');
var ClassComponent = ReactTypeOfWork.ClassComponent,
    HostContainer = ReactTypeOfWork.HostContainer,
    HostComponent = ReactTypeOfWork.HostComponent;

var _require = require('./ReactFiberUpdateQueue'),
    callCallbacks = _require.callCallbacks;

module.exports = function (config) {

  var updateContainer = config.updateContainer;
  var commitUpdate = config.commitUpdate;

  function commitWork(current, finishedWork) {
    switch (finishedWork.tag) {
      case ClassComponent:
        {
          // Clear updates from current fiber. This must go before the callbacks
          // are reset, in case an update is triggered from inside a callback. Is
          // this safe? Relies on the assumption that work is only committed if
          // the update queue is empty.
          if (finishedWork.alternate) {
            finishedWork.alternate.updateQueue = null;
          }
          if (finishedWork.callbackList) {
            var callbackList = finishedWork.callbackList;

            finishedWork.callbackList = null;
            callCallbacks(callbackList, finishedWork.stateNode);
          }
          // TODO: Fire componentDidMount/componentDidUpdate, update refs
          return;
        }
      case HostContainer:
        {
          // TODO: Attach children to root container.
          var children = finishedWork.output;
          var root = finishedWork.stateNode;
          var containerInfo = root.containerInfo;
          updateContainer(containerInfo, children);
          return;
        }
      case HostComponent:
        {
          if (finishedWork.stateNode == null || !current) {
            throw new Error('This should only be done during updates.');
          }
          // Commit the work prepared earlier.
          var child = finishedWork.child;
          var _children = child && !child.sibling ? child.output : child;
          var newProps = finishedWork.memoizedProps;
          var oldProps = current.memoizedProps;
          var instance = finishedWork.stateNode;
          commitUpdate(instance, oldProps, newProps, _children);
          return;
        }
      default:
        throw new Error('This unit of work tag should not have side-effects.');
    }
  }

  return {
    commitWork: commitWork
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdEZpYmVyQ29tbWl0V29yay5qcyJdLCJuYW1lcyI6WyJSZWFjdFR5cGVPZldvcmsiLCJyZXF1aXJlIiwiQ2xhc3NDb21wb25lbnQiLCJIb3N0Q29udGFpbmVyIiwiSG9zdENvbXBvbmVudCIsIl9yZXF1aXJlIiwiY2FsbENhbGxiYWNrcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJjb25maWciLCJ1cGRhdGVDb250YWluZXIiLCJjb21taXRVcGRhdGUiLCJjb21taXRXb3JrIiwiY3VycmVudCIsImZpbmlzaGVkV29yayIsInRhZyIsImFsdGVybmF0ZSIsInVwZGF0ZVF1ZXVlIiwiY2FsbGJhY2tMaXN0Iiwic3RhdGVOb2RlIiwiY2hpbGRyZW4iLCJvdXRwdXQiLCJyb290IiwiY29udGFpbmVySW5mbyIsIkVycm9yIiwiY2hpbGQiLCJfY2hpbGRyZW4iLCJzaWJsaW5nIiwibmV3UHJvcHMiLCJtZW1vaXplZFByb3BzIiwib2xkUHJvcHMiLCJpbnN0YW5jZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUEsSUFBSUEsa0JBQWtCQyxRQUFRLG1CQUFSLENBQXRCO0FBQ0EsSUFBSUMsaUJBQWlCRixnQkFBZ0JFLGNBQXJDO0FBQUEsSUFDSUMsZ0JBQWdCSCxnQkFBZ0JHLGFBRHBDO0FBQUEsSUFFSUMsZ0JBQWdCSixnQkFBZ0JJLGFBRnBDOztBQUlBLElBQUlDLFdBQVdKLFFBQVEseUJBQVIsQ0FBZjtBQUFBLElBQ0lLLGdCQUFnQkQsU0FBU0MsYUFEN0I7O0FBR0FDLE9BQU9DLE9BQVAsR0FBaUIsVUFBVUMsTUFBVixFQUFrQjs7QUFFakMsTUFBSUMsa0JBQWtCRCxPQUFPQyxlQUE3QjtBQUNBLE1BQUlDLGVBQWVGLE9BQU9FLFlBQTFCOztBQUVBLFdBQVNDLFVBQVQsQ0FBb0JDLE9BQXBCLEVBQTZCQyxZQUE3QixFQUEyQztBQUN6QyxZQUFRQSxhQUFhQyxHQUFyQjtBQUNFLFdBQUtiLGNBQUw7QUFDRTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBSVksYUFBYUUsU0FBakIsRUFBNEI7QUFDMUJGLHlCQUFhRSxTQUFiLENBQXVCQyxXQUF2QixHQUFxQyxJQUFyQztBQUNEO0FBQ0QsY0FBSUgsYUFBYUksWUFBakIsRUFBK0I7QUFDN0IsZ0JBQUlBLGVBQWVKLGFBQWFJLFlBQWhDOztBQUVBSix5QkFBYUksWUFBYixHQUE0QixJQUE1QjtBQUNBWiwwQkFBY1ksWUFBZCxFQUE0QkosYUFBYUssU0FBekM7QUFDRDtBQUNEO0FBQ0E7QUFDRDtBQUNILFdBQUtoQixhQUFMO0FBQ0U7QUFDRTtBQUNBLGNBQUlpQixXQUFXTixhQUFhTyxNQUE1QjtBQUNBLGNBQUlDLE9BQU9SLGFBQWFLLFNBQXhCO0FBQ0EsY0FBSUksZ0JBQWdCRCxLQUFLQyxhQUF6QjtBQUNBYiwwQkFBZ0JhLGFBQWhCLEVBQStCSCxRQUEvQjtBQUNBO0FBQ0Q7QUFDSCxXQUFLaEIsYUFBTDtBQUNFO0FBQ0UsY0FBSVUsYUFBYUssU0FBYixJQUEwQixJQUExQixJQUFrQyxDQUFDTixPQUF2QyxFQUFnRDtBQUM5QyxrQkFBTSxJQUFJVyxLQUFKLENBQVUsMENBQVYsQ0FBTjtBQUNEO0FBQ0Q7QUFDQSxjQUFJQyxRQUFRWCxhQUFhVyxLQUF6QjtBQUNBLGNBQUlDLFlBQVlELFNBQVMsQ0FBQ0EsTUFBTUUsT0FBaEIsR0FBMEJGLE1BQU1KLE1BQWhDLEdBQXlDSSxLQUF6RDtBQUNBLGNBQUlHLFdBQVdkLGFBQWFlLGFBQTVCO0FBQ0EsY0FBSUMsV0FBV2pCLFFBQVFnQixhQUF2QjtBQUNBLGNBQUlFLFdBQVdqQixhQUFhSyxTQUE1QjtBQUNBUix1QkFBYW9CLFFBQWIsRUFBdUJELFFBQXZCLEVBQWlDRixRQUFqQyxFQUEyQ0YsU0FBM0M7QUFDQTtBQUNEO0FBQ0g7QUFDRSxjQUFNLElBQUlGLEtBQUosQ0FBVSxxREFBVixDQUFOO0FBM0NKO0FBNkNEOztBQUVELFNBQU87QUFDTFosZ0JBQVlBO0FBRFAsR0FBUDtBQUdELENBeEREIiwiZmlsZSI6IlJlYWN0RmliZXJDb21taXRXb3JrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RUeXBlT2ZXb3JrID0gcmVxdWlyZSgnLi9SZWFjdFR5cGVPZldvcmsnKTtcbnZhciBDbGFzc0NvbXBvbmVudCA9IFJlYWN0VHlwZU9mV29yay5DbGFzc0NvbXBvbmVudCxcbiAgICBIb3N0Q29udGFpbmVyID0gUmVhY3RUeXBlT2ZXb3JrLkhvc3RDb250YWluZXIsXG4gICAgSG9zdENvbXBvbmVudCA9IFJlYWN0VHlwZU9mV29yay5Ib3N0Q29tcG9uZW50O1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL1JlYWN0RmliZXJVcGRhdGVRdWV1ZScpLFxuICAgIGNhbGxDYWxsYmFja3MgPSBfcmVxdWlyZS5jYWxsQ2FsbGJhY2tzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb25maWcpIHtcblxuICB2YXIgdXBkYXRlQ29udGFpbmVyID0gY29uZmlnLnVwZGF0ZUNvbnRhaW5lcjtcbiAgdmFyIGNvbW1pdFVwZGF0ZSA9IGNvbmZpZy5jb21taXRVcGRhdGU7XG5cbiAgZnVuY3Rpb24gY29tbWl0V29yayhjdXJyZW50LCBmaW5pc2hlZFdvcmspIHtcbiAgICBzd2l0Y2ggKGZpbmlzaGVkV29yay50YWcpIHtcbiAgICAgIGNhc2UgQ2xhc3NDb21wb25lbnQ6XG4gICAgICAgIHtcbiAgICAgICAgICAvLyBDbGVhciB1cGRhdGVzIGZyb20gY3VycmVudCBmaWJlci4gVGhpcyBtdXN0IGdvIGJlZm9yZSB0aGUgY2FsbGJhY2tzXG4gICAgICAgICAgLy8gYXJlIHJlc2V0LCBpbiBjYXNlIGFuIHVwZGF0ZSBpcyB0cmlnZ2VyZWQgZnJvbSBpbnNpZGUgYSBjYWxsYmFjay4gSXNcbiAgICAgICAgICAvLyB0aGlzIHNhZmU/IFJlbGllcyBvbiB0aGUgYXNzdW1wdGlvbiB0aGF0IHdvcmsgaXMgb25seSBjb21taXR0ZWQgaWZcbiAgICAgICAgICAvLyB0aGUgdXBkYXRlIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAgICAgIGlmIChmaW5pc2hlZFdvcmsuYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICBmaW5pc2hlZFdvcmsuYWx0ZXJuYXRlLnVwZGF0ZVF1ZXVlID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZpbmlzaGVkV29yay5jYWxsYmFja0xpc3QpIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFja0xpc3QgPSBmaW5pc2hlZFdvcmsuY2FsbGJhY2tMaXN0O1xuXG4gICAgICAgICAgICBmaW5pc2hlZFdvcmsuY2FsbGJhY2tMaXN0ID0gbnVsbDtcbiAgICAgICAgICAgIGNhbGxDYWxsYmFja3MoY2FsbGJhY2tMaXN0LCBmaW5pc2hlZFdvcmsuc3RhdGVOb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gVE9ETzogRmlyZSBjb21wb25lbnREaWRNb3VudC9jb21wb25lbnREaWRVcGRhdGUsIHVwZGF0ZSByZWZzXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICBjYXNlIEhvc3RDb250YWluZXI6XG4gICAgICAgIHtcbiAgICAgICAgICAvLyBUT0RPOiBBdHRhY2ggY2hpbGRyZW4gdG8gcm9vdCBjb250YWluZXIuXG4gICAgICAgICAgdmFyIGNoaWxkcmVuID0gZmluaXNoZWRXb3JrLm91dHB1dDtcbiAgICAgICAgICB2YXIgcm9vdCA9IGZpbmlzaGVkV29yay5zdGF0ZU5vZGU7XG4gICAgICAgICAgdmFyIGNvbnRhaW5lckluZm8gPSByb290LmNvbnRhaW5lckluZm87XG4gICAgICAgICAgdXBkYXRlQ29udGFpbmVyKGNvbnRhaW5lckluZm8sIGNoaWxkcmVuKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIGNhc2UgSG9zdENvbXBvbmVudDpcbiAgICAgICAge1xuICAgICAgICAgIGlmIChmaW5pc2hlZFdvcmsuc3RhdGVOb2RlID09IG51bGwgfHwgIWN1cnJlbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBzaG91bGQgb25seSBiZSBkb25lIGR1cmluZyB1cGRhdGVzLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBDb21taXQgdGhlIHdvcmsgcHJlcGFyZWQgZWFybGllci5cbiAgICAgICAgICB2YXIgY2hpbGQgPSBmaW5pc2hlZFdvcmsuY2hpbGQ7XG4gICAgICAgICAgdmFyIF9jaGlsZHJlbiA9IGNoaWxkICYmICFjaGlsZC5zaWJsaW5nID8gY2hpbGQub3V0cHV0IDogY2hpbGQ7XG4gICAgICAgICAgdmFyIG5ld1Byb3BzID0gZmluaXNoZWRXb3JrLm1lbW9pemVkUHJvcHM7XG4gICAgICAgICAgdmFyIG9sZFByb3BzID0gY3VycmVudC5tZW1vaXplZFByb3BzO1xuICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGZpbmlzaGVkV29yay5zdGF0ZU5vZGU7XG4gICAgICAgICAgY29tbWl0VXBkYXRlKGluc3RhbmNlLCBvbGRQcm9wcywgbmV3UHJvcHMsIF9jaGlsZHJlbik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgdW5pdCBvZiB3b3JrIHRhZyBzaG91bGQgbm90IGhhdmUgc2lkZS1lZmZlY3RzLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY29tbWl0V29yazogY29tbWl0V29ya1xuICB9O1xufTsiXX0=