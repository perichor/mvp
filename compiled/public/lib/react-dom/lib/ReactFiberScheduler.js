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

var ReactFiberBeginWork = require('./ReactFiberBeginWork');
var ReactFiberCompleteWork = require('./ReactFiberCompleteWork');
var ReactFiberCommitWork = require('./ReactFiberCommitWork');

var _require = require('./ReactFiber'),
    cloneFiber = _require.cloneFiber;

var _require2 = require('./ReactPriorityLevel'),
    NoWork = _require2.NoWork,
    LowPriority = _require2.LowPriority,
    AnimationPriority = _require2.AnimationPriority,
    SynchronousPriority = _require2.SynchronousPriority;

var timeHeuristicForUnitOfWork = 1;

module.exports = function (config) {
  // Use a closure to circumvent the circular dependency between the scheduler
  // and ReactFiberBeginWork. Don't know if there's a better way to do this.
  var scheduler = void 0;
  function getScheduler() {
    return scheduler;
  }

  var _ReactFiberBeginWork = ReactFiberBeginWork(config, getScheduler),
      beginWork = _ReactFiberBeginWork.beginWork;

  var _ReactFiberCompleteWo = ReactFiberCompleteWork(config),
      completeWork = _ReactFiberCompleteWo.completeWork;

  var _ReactFiberCommitWork = ReactFiberCommitWork(config),
      commitWork = _ReactFiberCommitWork.commitWork;

  var scheduleAnimationCallback = config.scheduleAnimationCallback;
  var scheduleDeferredCallback = config.scheduleDeferredCallback;

  // The default priority to use for updates.
  var defaultPriority = LowPriority;

  // The next work in progress fiber that we're currently working on.
  var nextUnitOfWork = null;
  var nextPriorityLevel = NoWork;

  // Linked list of roots with scheduled work on them.
  var nextScheduledRoot = null;
  var lastScheduledRoot = null;

  function findNextUnitOfWork() {
    // Clear out roots with no more work on them.
    while (nextScheduledRoot && nextScheduledRoot.current.pendingWorkPriority === NoWork) {
      nextScheduledRoot.isScheduled = false;
      if (nextScheduledRoot === lastScheduledRoot) {
        nextScheduledRoot = null;
        lastScheduledRoot = null;
        nextPriorityLevel = NoWork;
        return null;
      }
      nextScheduledRoot = nextScheduledRoot.nextScheduledRoot;
    }
    // TODO: This is scanning one root at a time. It should be scanning all
    // roots for high priority work before moving on to lower priorities.
    var root = nextScheduledRoot;
    var highestPriorityRoot = null;
    var highestPriorityLevel = NoWork;
    while (root) {
      if (highestPriorityLevel === NoWork || highestPriorityLevel > root.current.pendingWorkPriority) {
        highestPriorityLevel = root.current.pendingWorkPriority;
        highestPriorityRoot = root;
      }
      // We didn't find anything to do in this root, so let's try the next one.
      root = root.nextScheduledRoot;
    }
    if (highestPriorityRoot) {
      nextPriorityLevel = highestPriorityLevel;
      return cloneFiber(highestPriorityRoot.current, highestPriorityLevel);
    }

    nextPriorityLevel = NoWork;
    return null;
  }

  function commitAllWork(finishedWork) {
    // Commit all the side-effects within a tree.
    // TODO: Error handling.
    var effectfulFiber = finishedWork.firstEffect;
    while (effectfulFiber) {
      var current = effectfulFiber.alternate;
      commitWork(current, effectfulFiber);
      var next = effectfulFiber.nextEffect;
      // Ensure that we clean these up so that we don't accidentally keep them.
      // I'm not actually sure this matters because we can't reset firstEffect
      // and lastEffect since they're on every node, not just the effectful
      // ones. So we have to clean everything as we reuse nodes anyway.
      effectfulFiber.nextEffect = null;
      effectfulFiber = next;
    }
  }

  function resetWorkPriority(workInProgress) {
    var newPriority = NoWork;
    // progressedChild is going to be the child set with the highest priority.
    // Either it is the same as child, or it just bailed out because it choose
    // not to do the work.
    var child = workInProgress.progressedChild;
    while (child) {
      // Ensure that remaining work priority bubbles up.
      if (child.pendingWorkPriority !== NoWork && (newPriority === NoWork || newPriority > child.pendingWorkPriority)) {
        newPriority = child.pendingWorkPriority;
      }
      child = child.sibling;
    }
    workInProgress.pendingWorkPriority = newPriority;
  }

  function completeUnitOfWork(workInProgress) {
    while (true) {
      // The current, flushed, state of this fiber is the alternate.
      // Ideally nothing should rely on this, but relying on it here
      // means that we don't need an additional field on the work in
      // progress.
      var current = workInProgress.alternate;
      var next = completeWork(current, workInProgress);

      resetWorkPriority(workInProgress);

      // The work is now done. We don't need this anymore. This flags
      // to the system not to redo any work here.
      workInProgress.pendingProps = null;
      workInProgress.updateQueue = null;

      var returnFiber = workInProgress['return'];

      if (returnFiber) {
        // Ensure that the first and last effect of the parent corresponds
        // to the children's first and last effect. This probably relies on
        // children completing in order.
        if (!returnFiber.firstEffect) {
          returnFiber.firstEffect = workInProgress.firstEffect;
        }
        if (workInProgress.lastEffect) {
          if (returnFiber.lastEffect) {
            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          }
          returnFiber.lastEffect = workInProgress.lastEffect;
        }
      }

      if (next) {
        // If completing this work spawned new work, do that next.
        return next;
      } else if (workInProgress.sibling) {
        // If there is more work to do in this returnFiber, do that next.
        return workInProgress.sibling;
      } else if (returnFiber) {
        // If there's no more work in this returnFiber. Complete the returnFiber.
        workInProgress = returnFiber;
        continue;
      } else {
        // If we're at the root, there's no more work to do. We can flush it.
        var _root = workInProgress.stateNode;
        if (_root.current === workInProgress) {
          throw new Error('Cannot commit the same tree as before. This is probably a bug ' + 'related to the return field.');
        }
        _root.current = workInProgress;
        // TODO: We can be smarter here and only look for more work in the
        // "next" scheduled work since we've already scanned passed. That
        // also ensures that work scheduled during reconciliation gets deferred.
        // const hasMoreWork = workInProgress.pendingWorkPriority !== NoWork;
        commitAllWork(workInProgress);
        var nextWork = findNextUnitOfWork();
        // if (!nextWork && hasMoreWork) {
        // TODO: This can happen when some deep work completes and we don't
        // know if this was the last one. We should be able to keep track of
        // the highest priority still in the tree for one pass. But if we
        // terminate an update we don't know.
        // throw new Error('FiberRoots should not have flagged more work if there is none.');
        // }
        return nextWork;
      }
    }
  }

  function performUnitOfWork(workInProgress) {
    // The current, flushed, state of this fiber is the alternate.
    // Ideally nothing should rely on this, but relying on it here
    // means that we don't need an additional field on the work in
    // progress.
    var current = workInProgress.alternate;
    var next = beginWork(current, workInProgress, nextPriorityLevel);

    if (next) {
      // If this spawns new work, do that next.
      return next;
    } else {
      // Otherwise, complete the current work.
      return completeUnitOfWork(workInProgress);
    }
  }

  function performDeferredWork(deadline) {
    if (!nextUnitOfWork) {
      nextUnitOfWork = findNextUnitOfWork();
    }
    while (nextUnitOfWork) {
      if (deadline.timeRemaining() > timeHeuristicForUnitOfWork) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        if (!nextUnitOfWork) {
          // Find more work. We might have time to complete some more.
          nextUnitOfWork = findNextUnitOfWork();
        }
      } else {
        scheduleDeferredCallback(performDeferredWork);
        return;
      }
    }
  }

  function scheduleDeferredWork(root, priority) {
    // We must reset the current unit of work pointer so that we restart the
    // search from the root during the next tick, in case there is now higher
    // priority work somewhere earlier than before.
    if (priority <= nextPriorityLevel) {
      nextUnitOfWork = null;
    }

    // Set the priority on the root, without deprioritizing
    if (root.current.pendingWorkPriority === NoWork || priority <= root.current.pendingWorkPriority) {
      root.current.pendingWorkPriority = priority;
    }

    if (root.isScheduled) {
      // If we're already scheduled, we can bail out.
      return;
    }
    root.isScheduled = true;
    if (lastScheduledRoot) {
      // Schedule ourselves to the end.
      lastScheduledRoot.nextScheduledRoot = root;
      lastScheduledRoot = root;
    } else {
      // We're the only work scheduled.
      nextScheduledRoot = root;
      lastScheduledRoot = root;
      scheduleDeferredCallback(performDeferredWork);
    }
  }

  function performAnimationWork() {
    // Always start from the root
    nextUnitOfWork = findNextUnitOfWork();
    while (nextUnitOfWork && nextPriorityLevel !== NoWork) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      if (!nextUnitOfWork) {
        // Keep searching for animation work until there's no more left
        nextUnitOfWork = findNextUnitOfWork();
      }
      // Stop if the next unit of work is low priority
      if (nextPriorityLevel > AnimationPriority) {
        scheduleDeferredCallback(performDeferredWork);
        return;
      }
    }
  }

  function scheduleAnimationWork(root, priorityLevel) {
    // Set the priority on the root, without deprioritizing
    if (root.current.pendingWorkPriority === NoWork || priorityLevel <= root.current.pendingWorkPriority) {
      root.current.pendingWorkPriority = priorityLevel;
    }

    if (root.isScheduled) {
      // If we're already scheduled, we can bail out.
      return;
    }
    root.isScheduled = true;
    if (lastScheduledRoot) {
      // Schedule ourselves to the end.
      lastScheduledRoot.nextScheduledRoot = root;
      lastScheduledRoot = root;
    } else {
      // We're the only work scheduled.
      nextScheduledRoot = root;
      lastScheduledRoot = root;
      scheduleAnimationCallback(performAnimationWork);
    }
  }

  function scheduleWork(root) {
    if (defaultPriority === SynchronousPriority) {
      throw new Error('Not implemented yet');
    }

    if (defaultPriority === NoWork) {
      return;
    }
    if (defaultPriority > AnimationPriority) {
      scheduleDeferredWork(root, defaultPriority);
      return;
    }
    scheduleAnimationWork(root, defaultPriority);
  }

  function performWithPriority(priorityLevel, fn) {
    var previousDefaultPriority = defaultPriority;
    defaultPriority = priorityLevel;
    try {
      fn();
    } finally {
      defaultPriority = previousDefaultPriority;
    }
  }

  scheduler = {
    scheduleWork: scheduleWork,
    scheduleDeferredWork: scheduleDeferredWork,
    performWithPriority: performWithPriority
  };
  return scheduler;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdEZpYmVyU2NoZWR1bGVyLmpzIl0sIm5hbWVzIjpbIlJlYWN0RmliZXJCZWdpbldvcmsiLCJyZXF1aXJlIiwiUmVhY3RGaWJlckNvbXBsZXRlV29yayIsIlJlYWN0RmliZXJDb21taXRXb3JrIiwiX3JlcXVpcmUiLCJjbG9uZUZpYmVyIiwiX3JlcXVpcmUyIiwiTm9Xb3JrIiwiTG93UHJpb3JpdHkiLCJBbmltYXRpb25Qcmlvcml0eSIsIlN5bmNocm9ub3VzUHJpb3JpdHkiLCJ0aW1lSGV1cmlzdGljRm9yVW5pdE9mV29yayIsIm1vZHVsZSIsImV4cG9ydHMiLCJjb25maWciLCJzY2hlZHVsZXIiLCJnZXRTY2hlZHVsZXIiLCJfUmVhY3RGaWJlckJlZ2luV29yayIsImJlZ2luV29yayIsIl9SZWFjdEZpYmVyQ29tcGxldGVXbyIsImNvbXBsZXRlV29yayIsIl9SZWFjdEZpYmVyQ29tbWl0V29yayIsImNvbW1pdFdvcmsiLCJzY2hlZHVsZUFuaW1hdGlvbkNhbGxiYWNrIiwic2NoZWR1bGVEZWZlcnJlZENhbGxiYWNrIiwiZGVmYXVsdFByaW9yaXR5IiwibmV4dFVuaXRPZldvcmsiLCJuZXh0UHJpb3JpdHlMZXZlbCIsIm5leHRTY2hlZHVsZWRSb290IiwibGFzdFNjaGVkdWxlZFJvb3QiLCJmaW5kTmV4dFVuaXRPZldvcmsiLCJjdXJyZW50IiwicGVuZGluZ1dvcmtQcmlvcml0eSIsImlzU2NoZWR1bGVkIiwicm9vdCIsImhpZ2hlc3RQcmlvcml0eVJvb3QiLCJoaWdoZXN0UHJpb3JpdHlMZXZlbCIsImNvbW1pdEFsbFdvcmsiLCJmaW5pc2hlZFdvcmsiLCJlZmZlY3RmdWxGaWJlciIsImZpcnN0RWZmZWN0IiwiYWx0ZXJuYXRlIiwibmV4dCIsIm5leHRFZmZlY3QiLCJyZXNldFdvcmtQcmlvcml0eSIsIndvcmtJblByb2dyZXNzIiwibmV3UHJpb3JpdHkiLCJjaGlsZCIsInByb2dyZXNzZWRDaGlsZCIsInNpYmxpbmciLCJjb21wbGV0ZVVuaXRPZldvcmsiLCJwZW5kaW5nUHJvcHMiLCJ1cGRhdGVRdWV1ZSIsInJldHVybkZpYmVyIiwibGFzdEVmZmVjdCIsIl9yb290Iiwic3RhdGVOb2RlIiwiRXJyb3IiLCJuZXh0V29yayIsInBlcmZvcm1Vbml0T2ZXb3JrIiwicGVyZm9ybURlZmVycmVkV29yayIsImRlYWRsaW5lIiwidGltZVJlbWFpbmluZyIsInNjaGVkdWxlRGVmZXJyZWRXb3JrIiwicHJpb3JpdHkiLCJwZXJmb3JtQW5pbWF0aW9uV29yayIsInNjaGVkdWxlQW5pbWF0aW9uV29yayIsInByaW9yaXR5TGV2ZWwiLCJzY2hlZHVsZVdvcmsiLCJwZXJmb3JtV2l0aFByaW9yaXR5IiwiZm4iLCJwcmV2aW91c0RlZmF1bHRQcmlvcml0eSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUEsSUFBSUEsc0JBQXNCQyxRQUFRLHVCQUFSLENBQTFCO0FBQ0EsSUFBSUMseUJBQXlCRCxRQUFRLDBCQUFSLENBQTdCO0FBQ0EsSUFBSUUsdUJBQXVCRixRQUFRLHdCQUFSLENBQTNCOztBQUVBLElBQUlHLFdBQVdILFFBQVEsY0FBUixDQUFmO0FBQUEsSUFDSUksYUFBYUQsU0FBU0MsVUFEMUI7O0FBR0EsSUFBSUMsWUFBWUwsUUFBUSxzQkFBUixDQUFoQjtBQUFBLElBQ0lNLFNBQVNELFVBQVVDLE1BRHZCO0FBQUEsSUFFSUMsY0FBY0YsVUFBVUUsV0FGNUI7QUFBQSxJQUdJQyxvQkFBb0JILFVBQVVHLGlCQUhsQztBQUFBLElBSUlDLHNCQUFzQkosVUFBVUksbUJBSnBDOztBQU1BLElBQUlDLDZCQUE2QixDQUFqQzs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQixVQUFVQyxNQUFWLEVBQWtCO0FBQ2pDO0FBQ0E7QUFDQSxNQUFJQyxZQUFZLEtBQUssQ0FBckI7QUFDQSxXQUFTQyxZQUFULEdBQXdCO0FBQ3RCLFdBQU9ELFNBQVA7QUFDRDs7QUFFRCxNQUFJRSx1QkFB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QW9CTSxJQUFwQjtBQUNBTCwwQkFBb0JLLElBQXBCO0FBQ0FYLGdDQUEwQjBDLG9CQUExQjtBQUNEO0FBQ0Y7O0FBRUQsV0FBU0csWUFBVCxDQUFzQmxDLElBQXRCLEVBQTRCO0FBQzFCLFFBQUlULG9CQUFvQmYsbUJBQXhCLEVBQTZDO0FBQzNDLFlBQU0sSUFBSStDLEtBQUosQ0FBVSxxQkFBVixDQUFOO0FBQ0Q7O0FBRUQsUUFBSWhDLG9CQUFvQmxCLE1BQXhCLEVBQWdDO0FBQzlCO0FBQ0Q7QUFDRCxRQUFJa0Isa0JBQWtCaEIsaUJBQXRCLEVBQXlDO0FBQ3ZDc0QsMkJBQXFCN0IsSUFBckIsRUFBMkJULGVBQTNCO0FBQ0E7QUFDRDtBQUNEeUMsMEJBQXNCaEMsSUFBdEIsRUFBNEJULGVBQTVCO0FBQ0Q7O0FBRUQsV0FBUzRDLG1CQUFULENBQTZCRixhQUE3QixFQUE0Q0csRUFBNUMsRUFBZ0Q7QUFDOUMsUUFBSUMsMEJBQTBCOUMsZUFBOUI7QUFDQUEsc0JBQWtCMEMsYUFBbEI7QUFDQSxRQUFJO0FBQ0ZHO0FBQ0QsS0FGRCxTQUVVO0FBQ1I3Qyx3QkFBa0I4Qyx1QkFBbEI7QUFDRDtBQUNGOztBQUVEeEQsY0FBWTtBQUNWcUQsa0JBQWNBLFlBREo7QUFFVkwsMEJBQXNCQSxvQkFGWjtBQUdWTSx5QkFBcUJBO0FBSFgsR0FBWjtBQUtBLFNBQU90RCxTQUFQO0FBQ0QsQ0E5U0QiLCJmaWxlIjoiUmVhY3RGaWJlclNjaGVkdWxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RmliZXJCZWdpbldvcmsgPSByZXF1aXJlKCcuL1JlYWN0RmliZXJCZWdpbldvcmsnKTtcbnZhciBSZWFjdEZpYmVyQ29tcGxldGVXb3JrID0gcmVxdWlyZSgnLi9SZWFjdEZpYmVyQ29tcGxldGVXb3JrJyk7XG52YXIgUmVhY3RGaWJlckNvbW1pdFdvcmsgPSByZXF1aXJlKCcuL1JlYWN0RmliZXJDb21taXRXb3JrJyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vUmVhY3RGaWJlcicpLFxuICAgIGNsb25lRmliZXIgPSBfcmVxdWlyZS5jbG9uZUZpYmVyO1xuXG52YXIgX3JlcXVpcmUyID0gcmVxdWlyZSgnLi9SZWFjdFByaW9yaXR5TGV2ZWwnKSxcbiAgICBOb1dvcmsgPSBfcmVxdWlyZTIuTm9Xb3JrLFxuICAgIExvd1ByaW9yaXR5ID0gX3JlcXVpcmUyLkxvd1ByaW9yaXR5LFxuICAgIEFuaW1hdGlvblByaW9yaXR5ID0gX3JlcXVpcmUyLkFuaW1hdGlvblByaW9yaXR5LFxuICAgIFN5bmNocm9ub3VzUHJpb3JpdHkgPSBfcmVxdWlyZTIuU3luY2hyb25vdXNQcmlvcml0eTtcblxudmFyIHRpbWVIZXVyaXN0aWNGb3JVbml0T2ZXb3JrID0gMTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIC8vIFVzZSBhIGNsb3N1cmUgdG8gY2lyY3VtdmVudCB0aGUgY2lyY3VsYXIgZGVwZW5kZW5jeSBiZXR3ZWVuIHRoZSBzY2hlZHVsZXJcbiAgLy8gYW5kIFJlYWN0RmliZXJCZWdpbldvcmsuIERvbid0IGtub3cgaWYgdGhlcmUncyBhIGJldHRlciB3YXkgdG8gZG8gdGhpcy5cbiAgdmFyIHNjaGVkdWxlciA9IHZvaWQgMDtcbiAgZnVuY3Rpb24gZ2V0U2NoZWR1bGVyKCkge1xuICAgIHJldHVybiBzY2hlZHVsZXI7XG4gIH1cblxuICB2YXIgX1JlYWN0RmliZXJCZWdpbldvcmsgPSBSZWFjdEZpYmVyQmVnaW5Xb3JrKGNvbmZpZywgZ2V0U2NoZWR1bGVyKSxcbiAgICAgIGJlZ2luV29yayA9IF9SZWFjdEZpYmVyQmVnaW5Xb3JrLmJlZ2luV29yaztcblxuICB2YXIgX1JlYWN0RmliZXJDb21wbGV0ZVdvID0gUmVhY3RGaWJlckNvbXBsZXRlV29yayhjb25maWcpLFxuICAgICAgY29tcGxldGVXb3JrID0gX1JlYWN0RmliZXJDb21wbGV0ZVdvLmNvbXBsZXRlV29yaztcblxuICB2YXIgX1JlYWN0RmliZXJDb21taXRXb3JrID0gUmVhY3RGaWJlckNvbW1pdFdvcmsoY29uZmlnKSxcbiAgICAgIGNvbW1pdFdvcmsgPSBfUmVhY3RGaWJlckNvbW1pdFdvcmsuY29tbWl0V29yaztcblxuICB2YXIgc2NoZWR1bGVBbmltYXRpb25DYWxsYmFjayA9IGNvbmZpZy5zY2hlZHVsZUFuaW1hdGlvbkNhbGxiYWNrO1xuICB2YXIgc2NoZWR1bGVEZWZlcnJlZENhbGxiYWNrID0gY29uZmlnLnNjaGVkdWxlRGVmZXJyZWRDYWxsYmFjaztcblxuICAvLyBUaGUgZGVmYXVsdCBwcmlvcml0eSB0byB1c2UgZm9yIHVwZGF0ZXMuXG4gIHZhciBkZWZhdWx0UHJpb3JpdHkgPSBMb3dQcmlvcml0eTtcblxuICAvLyBUaGUgbmV4dCB3b3JrIGluIHByb2dyZXNzIGZpYmVyIHRoYXQgd2UncmUgY3VycmVudGx5IHdvcmtpbmcgb24uXG4gIHZhciBuZXh0VW5pdE9mV29yayA9IG51bGw7XG4gIHZhciBuZXh0UHJpb3JpdHlMZXZlbCA9IE5vV29yaztcblxuICAvLyBMaW5rZWQgbGlzdCBvZiByb290cyB3aXRoIHNjaGVkdWxlZCB3b3JrIG9uIHRoZW0uXG4gIHZhciBuZXh0U2NoZWR1bGVkUm9vdCA9IG51bGw7XG4gIHZhciBsYXN0U2NoZWR1bGVkUm9vdCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gZmluZE5leHRVbml0T2ZXb3JrKCkge1xuICAgIC8vIENsZWFyIG91dCByb290cyB3aXRoIG5vIG1vcmUgd29yayBvbiB0aGVtLlxuICAgIHdoaWxlIChuZXh0U2NoZWR1bGVkUm9vdCAmJiBuZXh0U2NoZWR1bGVkUm9vdC5jdXJyZW50LnBlbmRpbmdXb3JrUHJpb3JpdHkgPT09IE5vV29yaykge1xuICAgICAgbmV4dFNjaGVkdWxlZFJvb3QuaXNTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgIGlmIChuZXh0U2NoZWR1bGVkUm9vdCA9PT0gbGFzdFNjaGVkdWxlZFJvb3QpIHtcbiAgICAgICAgbmV4dFNjaGVkdWxlZFJvb3QgPSBudWxsO1xuICAgICAgICBsYXN0U2NoZWR1bGVkUm9vdCA9IG51bGw7XG4gICAgICAgIG5leHRQcmlvcml0eUxldmVsID0gTm9Xb3JrO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIG5leHRTY2hlZHVsZWRSb290ID0gbmV4dFNjaGVkdWxlZFJvb3QubmV4dFNjaGVkdWxlZFJvb3Q7XG4gICAgfVxuICAgIC8vIFRPRE86IFRoaXMgaXMgc2Nhbm5pbmcgb25lIHJvb3QgYXQgYSB0aW1lLiBJdCBzaG91bGQgYmUgc2Nhbm5pbmcgYWxsXG4gICAgLy8gcm9vdHMgZm9yIGhpZ2ggcHJpb3JpdHkgd29yayBiZWZvcmUgbW92aW5nIG9uIHRvIGxvd2VyIHByaW9yaXRpZXMuXG4gICAgdmFyIHJvb3QgPSBuZXh0U2NoZWR1bGVkUm9vdDtcbiAgICB2YXIgaGlnaGVzdFByaW9yaXR5Um9vdCA9IG51bGw7XG4gICAgdmFyIGhpZ2hlc3RQcmlvcml0eUxldmVsID0gTm9Xb3JrO1xuICAgIHdoaWxlIChyb290KSB7XG4gICAgICBpZiAoaGlnaGVzdFByaW9yaXR5TGV2ZWwgPT09IE5vV29yayB8fCBoaWdoZXN0UHJpb3JpdHlMZXZlbCA+IHJvb3QuY3VycmVudC5wZW5kaW5nV29ya1ByaW9yaXR5KSB7XG4gICAgICAgIGhpZ2hlc3RQcmlvcml0eUxldmVsID0gcm9vdC5jdXJyZW50LnBlbmRpbmdXb3JrUHJpb3JpdHk7XG4gICAgICAgIGhpZ2hlc3RQcmlvcml0eVJvb3QgPSByb290O1xuICAgICAgfVxuICAgICAgLy8gV2UgZGlkbid0IGZpbmQgYW55dGhpbmcgdG8gZG8gaW4gdGhpcyByb290LCBzbyBsZXQncyB0cnkgdGhlIG5leHQgb25lLlxuICAgICAgcm9vdCA9IHJvb3QubmV4dFNjaGVkdWxlZFJvb3Q7XG4gICAgfVxuICAgIGlmIChoaWdoZXN0UHJpb3JpdHlSb290KSB7XG4gICAgICBuZXh0UHJpb3JpdHlMZXZlbCA9IGhpZ2hlc3RQcmlvcml0eUxldmVsO1xuICAgICAgcmV0dXJuIGNsb25lRmliZXIoaGlnaGVzdFByaW9yaXR5Um9vdC5jdXJyZW50LCBoaWdoZXN0UHJpb3JpdHlMZXZlbCk7XG4gICAgfVxuXG4gICAgbmV4dFByaW9yaXR5TGV2ZWwgPSBOb1dvcms7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBjb21taXRBbGxXb3JrKGZpbmlzaGVkV29yaykge1xuICAgIC8vIENvbW1pdCBhbGwgdGhlIHNpZGUtZWZmZWN0cyB3aXRoaW4gYSB0cmVlLlxuICAgIC8vIFRPRE86IEVycm9yIGhhbmRsaW5nLlxuICAgIHZhciBlZmZlY3RmdWxGaWJlciA9IGZpbmlzaGVkV29yay5maXJzdEVmZmVjdDtcbiAgICB3aGlsZSAoZWZmZWN0ZnVsRmliZXIpIHtcbiAgICAgIHZhciBjdXJyZW50ID0gZWZmZWN0ZnVsRmliZXIuYWx0ZXJuYXRlO1xuICAgICAgY29tbWl0V29yayhjdXJyZW50LCBlZmZlY3RmdWxGaWJlcik7XG4gICAgICB2YXIgbmV4dCA9IGVmZmVjdGZ1bEZpYmVyLm5leHRFZmZlY3Q7XG4gICAgICAvLyBFbnN1cmUgdGhhdCB3ZSBjbGVhbiB0aGVzZSB1cCBzbyB0aGF0IHdlIGRvbid0IGFjY2lkZW50YWxseSBrZWVwIHRoZW0uXG4gICAgICAvLyBJJ20gbm90IGFjdHVhbGx5IHN1cmUgdGhpcyBtYXR0ZXJzIGJlY2F1c2Ugd2UgY2FuJ3QgcmVzZXQgZmlyc3RFZmZlY3RcbiAgICAgIC8vIGFuZCBsYXN0RWZmZWN0IHNpbmNlIHRoZXkncmUgb24gZXZlcnkgbm9kZSwgbm90IGp1c3QgdGhlIGVmZmVjdGZ1bFxuICAgICAgLy8gb25lcy4gU28gd2UgaGF2ZSB0byBjbGVhbiBldmVyeXRoaW5nIGFzIHdlIHJldXNlIG5vZGVzIGFueXdheS5cbiAgICAgIGVmZmVjdGZ1bEZpYmVyLm5leHRFZmZlY3QgPSBudWxsO1xuICAgICAgZWZmZWN0ZnVsRmliZXIgPSBuZXh0O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0V29ya1ByaW9yaXR5KHdvcmtJblByb2dyZXNzKSB7XG4gICAgdmFyIG5ld1ByaW9yaXR5ID0gTm9Xb3JrO1xuICAgIC8vIHByb2dyZXNzZWRDaGlsZCBpcyBnb2luZyB0byBiZSB0aGUgY2hpbGQgc2V0IHdpdGggdGhlIGhpZ2hlc3QgcHJpb3JpdHkuXG4gICAgLy8gRWl0aGVyIGl0IGlzIHRoZSBzYW1lIGFzIGNoaWxkLCBvciBpdCBqdXN0IGJhaWxlZCBvdXQgYmVjYXVzZSBpdCBjaG9vc2VcbiAgICAvLyBub3QgdG8gZG8gdGhlIHdvcmsuXG4gICAgdmFyIGNoaWxkID0gd29ya0luUHJvZ3Jlc3MucHJvZ3Jlc3NlZENoaWxkO1xuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgLy8gRW5zdXJlIHRoYXQgcmVtYWluaW5nIHdvcmsgcHJpb3JpdHkgYnViYmxlcyB1cC5cbiAgICAgIGlmIChjaGlsZC5wZW5kaW5nV29ya1ByaW9yaXR5ICE9PSBOb1dvcmsgJiYgKG5ld1ByaW9yaXR5ID09PSBOb1dvcmsgfHwgbmV3UHJpb3JpdHkgPiBjaGlsZC5wZW5kaW5nV29ya1ByaW9yaXR5KSkge1xuICAgICAgICBuZXdQcmlvcml0eSA9IGNoaWxkLnBlbmRpbmdXb3JrUHJpb3JpdHk7XG4gICAgICB9XG4gICAgICBjaGlsZCA9IGNoaWxkLnNpYmxpbmc7XG4gICAgfVxuICAgIHdvcmtJblByb2dyZXNzLnBlbmRpbmdXb3JrUHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXBsZXRlVW5pdE9mV29yayh3b3JrSW5Qcm9ncmVzcykge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAvLyBUaGUgY3VycmVudCwgZmx1c2hlZCwgc3RhdGUgb2YgdGhpcyBmaWJlciBpcyB0aGUgYWx0ZXJuYXRlLlxuICAgICAgLy8gSWRlYWxseSBub3RoaW5nIHNob3VsZCByZWx5IG9uIHRoaXMsIGJ1dCByZWx5aW5nIG9uIGl0IGhlcmVcbiAgICAgIC8vIG1lYW5zIHRoYXQgd2UgZG9uJ3QgbmVlZCBhbiBhZGRpdGlvbmFsIGZpZWxkIG9uIHRoZSB3b3JrIGluXG4gICAgICAvLyBwcm9ncmVzcy5cbiAgICAgIHZhciBjdXJyZW50ID0gd29ya0luUHJvZ3Jlc3MuYWx0ZXJuYXRlO1xuICAgICAgdmFyIG5leHQgPSBjb21wbGV0ZVdvcmsoY3VycmVudCwgd29ya0luUHJvZ3Jlc3MpO1xuXG4gICAgICByZXNldFdvcmtQcmlvcml0eSh3b3JrSW5Qcm9ncmVzcyk7XG5cbiAgICAgIC8vIFRoZSB3b3JrIGlzIG5vdyBkb25lLiBXZSBkb24ndCBuZWVkIHRoaXMgYW55bW9yZS4gVGhpcyBmbGFnc1xuICAgICAgLy8gdG8gdGhlIHN5c3RlbSBub3QgdG8gcmVkbyBhbnkgd29yayBoZXJlLlxuICAgICAgd29ya0luUHJvZ3Jlc3MucGVuZGluZ1Byb3BzID0gbnVsbDtcbiAgICAgIHdvcmtJblByb2dyZXNzLnVwZGF0ZVF1ZXVlID0gbnVsbDtcblxuICAgICAgdmFyIHJldHVybkZpYmVyID0gd29ya0luUHJvZ3Jlc3NbJ3JldHVybiddO1xuXG4gICAgICBpZiAocmV0dXJuRmliZXIpIHtcbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIGZpcnN0IGFuZCBsYXN0IGVmZmVjdCBvZiB0aGUgcGFyZW50IGNvcnJlc3BvbmRzXG4gICAgICAgIC8vIHRvIHRoZSBjaGlsZHJlbidzIGZpcnN0IGFuZCBsYXN0IGVmZmVjdC4gVGhpcyBwcm9iYWJseSByZWxpZXMgb25cbiAgICAgICAgLy8gY2hpbGRyZW4gY29tcGxldGluZyBpbiBvcmRlci5cbiAgICAgICAgaWYgKCFyZXR1cm5GaWJlci5maXJzdEVmZmVjdCkge1xuICAgICAgICAgIHJldHVybkZpYmVyLmZpcnN0RWZmZWN0ID0gd29ya0luUHJvZ3Jlc3MuZmlyc3RFZmZlY3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdvcmtJblByb2dyZXNzLmxhc3RFZmZlY3QpIHtcbiAgICAgICAgICBpZiAocmV0dXJuRmliZXIubGFzdEVmZmVjdCkge1xuICAgICAgICAgICAgcmV0dXJuRmliZXIubGFzdEVmZmVjdC5uZXh0RWZmZWN0ID0gd29ya0luUHJvZ3Jlc3MuZmlyc3RFZmZlY3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybkZpYmVyLmxhc3RFZmZlY3QgPSB3b3JrSW5Qcm9ncmVzcy5sYXN0RWZmZWN0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgIC8vIElmIGNvbXBsZXRpbmcgdGhpcyB3b3JrIHNwYXduZWQgbmV3IHdvcmssIGRvIHRoYXQgbmV4dC5cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9IGVsc2UgaWYgKHdvcmtJblByb2dyZXNzLnNpYmxpbmcpIHtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbW9yZSB3b3JrIHRvIGRvIGluIHRoaXMgcmV0dXJuRmliZXIsIGRvIHRoYXQgbmV4dC5cbiAgICAgICAgcmV0dXJuIHdvcmtJblByb2dyZXNzLnNpYmxpbmc7XG4gICAgICB9IGVsc2UgaWYgKHJldHVybkZpYmVyKSB7XG4gICAgICAgIC8vIElmIHRoZXJlJ3Mgbm8gbW9yZSB3b3JrIGluIHRoaXMgcmV0dXJuRmliZXIuIENvbXBsZXRlIHRoZSByZXR1cm5GaWJlci5cbiAgICAgICAgd29ya0luUHJvZ3Jlc3MgPSByZXR1cm5GaWJlcjtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiB3ZSdyZSBhdCB0aGUgcm9vdCwgdGhlcmUncyBubyBtb3JlIHdvcmsgdG8gZG8uIFdlIGNhbiBmbHVzaCBpdC5cbiAgICAgICAgdmFyIF9yb290ID0gd29ya0luUHJvZ3Jlc3Muc3RhdGVOb2RlO1xuICAgICAgICBpZiAoX3Jvb3QuY3VycmVudCA9PT0gd29ya0luUHJvZ3Jlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjb21taXQgdGhlIHNhbWUgdHJlZSBhcyBiZWZvcmUuIFRoaXMgaXMgcHJvYmFibHkgYSBidWcgJyArICdyZWxhdGVkIHRvIHRoZSByZXR1cm4gZmllbGQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgX3Jvb3QuY3VycmVudCA9IHdvcmtJblByb2dyZXNzO1xuICAgICAgICAvLyBUT0RPOiBXZSBjYW4gYmUgc21hcnRlciBoZXJlIGFuZCBvbmx5IGxvb2sgZm9yIG1vcmUgd29yayBpbiB0aGVcbiAgICAgICAgLy8gXCJuZXh0XCIgc2NoZWR1bGVkIHdvcmsgc2luY2Ugd2UndmUgYWxyZWFkeSBzY2FubmVkIHBhc3NlZC4gVGhhdFxuICAgICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB3b3JrIHNjaGVkdWxlZCBkdXJpbmcgcmVjb25jaWxpYXRpb24gZ2V0cyBkZWZlcnJlZC5cbiAgICAgICAgLy8gY29uc3QgaGFzTW9yZVdvcmsgPSB3b3JrSW5Qcm9ncmVzcy5wZW5kaW5nV29ya1ByaW9yaXR5ICE9PSBOb1dvcms7XG4gICAgICAgIGNvbW1pdEFsbFdvcmsod29ya0luUHJvZ3Jlc3MpO1xuICAgICAgICB2YXIgbmV4dFdvcmsgPSBmaW5kTmV4dFVuaXRPZldvcmsoKTtcbiAgICAgICAgLy8gaWYgKCFuZXh0V29yayAmJiBoYXNNb3JlV29yaykge1xuICAgICAgICAvLyBUT0RPOiBUaGlzIGNhbiBoYXBwZW4gd2hlbiBzb21lIGRlZXAgd29yayBjb21wbGV0ZXMgYW5kIHdlIGRvbid0XG4gICAgICAgIC8vIGtub3cgaWYgdGhpcyB3YXMgdGhlIGxhc3Qgb25lLiBXZSBzaG91bGQgYmUgYWJsZSB0byBrZWVwIHRyYWNrIG9mXG4gICAgICAgIC8vIHRoZSBoaWdoZXN0IHByaW9yaXR5IHN0aWxsIGluIHRoZSB0cmVlIGZvciBvbmUgcGFzcy4gQnV0IGlmIHdlXG4gICAgICAgIC8vIHRlcm1pbmF0ZSBhbiB1cGRhdGUgd2UgZG9uJ3Qga25vdy5cbiAgICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKCdGaWJlclJvb3RzIHNob3VsZCBub3QgaGF2ZSBmbGFnZ2VkIG1vcmUgd29yayBpZiB0aGVyZSBpcyBub25lLicpO1xuICAgICAgICAvLyB9XG4gICAgICAgIHJldHVybiBuZXh0V29yaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwZXJmb3JtVW5pdE9mV29yayh3b3JrSW5Qcm9ncmVzcykge1xuICAgIC8vIFRoZSBjdXJyZW50LCBmbHVzaGVkLCBzdGF0ZSBvZiB0aGlzIGZpYmVyIGlzIHRoZSBhbHRlcm5hdGUuXG4gICAgLy8gSWRlYWxseSBub3RoaW5nIHNob3VsZCByZWx5IG9uIHRoaXMsIGJ1dCByZWx5aW5nIG9uIGl0IGhlcmVcbiAgICAvLyBtZWFucyB0aGF0IHdlIGRvbid0IG5lZWQgYW4gYWRkaXRpb25hbCBmaWVsZCBvbiB0aGUgd29yayBpblxuICAgIC8vIHByb2dyZXNzLlxuICAgIHZhciBjdXJyZW50ID0gd29ya0luUHJvZ3Jlc3MuYWx0ZXJuYXRlO1xuICAgIHZhciBuZXh0ID0gYmVnaW5Xb3JrKGN1cnJlbnQsIHdvcmtJblByb2dyZXNzLCBuZXh0UHJpb3JpdHlMZXZlbCk7XG5cbiAgICBpZiAobmV4dCkge1xuICAgICAgLy8gSWYgdGhpcyBzcGF3bnMgbmV3IHdvcmssIGRvIHRoYXQgbmV4dC5cbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPdGhlcndpc2UsIGNvbXBsZXRlIHRoZSBjdXJyZW50IHdvcmsuXG4gICAgICByZXR1cm4gY29tcGxldGVVbml0T2ZXb3JrKHdvcmtJblByb2dyZXNzKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwZXJmb3JtRGVmZXJyZWRXb3JrKGRlYWRsaW5lKSB7XG4gICAgaWYgKCFuZXh0VW5pdE9mV29yaykge1xuICAgICAgbmV4dFVuaXRPZldvcmsgPSBmaW5kTmV4dFVuaXRPZldvcmsoKTtcbiAgICB9XG4gICAgd2hpbGUgKG5leHRVbml0T2ZXb3JrKSB7XG4gICAgICBpZiAoZGVhZGxpbmUudGltZVJlbWFpbmluZygpID4gdGltZUhldXJpc3RpY0ZvclVuaXRPZldvcmspIHtcbiAgICAgICAgbmV4dFVuaXRPZldvcmsgPSBwZXJmb3JtVW5pdE9mV29yayhuZXh0VW5pdE9mV29yayk7XG4gICAgICAgIGlmICghbmV4dFVuaXRPZldvcmspIHtcbiAgICAgICAgICAvLyBGaW5kIG1vcmUgd29yay4gV2UgbWlnaHQgaGF2ZSB0aW1lIHRvIGNvbXBsZXRlIHNvbWUgbW9yZS5cbiAgICAgICAgICBuZXh0VW5pdE9mV29yayA9IGZpbmROZXh0VW5pdE9mV29yaygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2hlZHVsZURlZmVycmVkQ2FsbGJhY2socGVyZm9ybURlZmVycmVkV29yayk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzY2hlZHVsZURlZmVycmVkV29yayhyb290LCBwcmlvcml0eSkge1xuICAgIC8vIFdlIG11c3QgcmVzZXQgdGhlIGN1cnJlbnQgdW5pdCBvZiB3b3JrIHBvaW50ZXIgc28gdGhhdCB3ZSByZXN0YXJ0IHRoZVxuICAgIC8vIHNlYXJjaCBmcm9tIHRoZSByb290IGR1cmluZyB0aGUgbmV4dCB0aWNrLCBpbiBjYXNlIHRoZXJlIGlzIG5vdyBoaWdoZXJcbiAgICAvLyBwcmlvcml0eSB3b3JrIHNvbWV3aGVyZSBlYXJsaWVyIHRoYW4gYmVmb3JlLlxuICAgIGlmIChwcmlvcml0eSA8PSBuZXh0UHJpb3JpdHlMZXZlbCkge1xuICAgICAgbmV4dFVuaXRPZldvcmsgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNldCB0aGUgcHJpb3JpdHkgb24gdGhlIHJvb3QsIHdpdGhvdXQgZGVwcmlvcml0aXppbmdcbiAgICBpZiAocm9vdC5jdXJyZW50LnBlbmRpbmdXb3JrUHJpb3JpdHkgPT09IE5vV29yayB8fCBwcmlvcml0eSA8PSByb290LmN1cnJlbnQucGVuZGluZ1dvcmtQcmlvcml0eSkge1xuICAgICAgcm9vdC5jdXJyZW50LnBlbmRpbmdXb3JrUHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB9XG5cbiAgICBpZiAocm9vdC5pc1NjaGVkdWxlZCkge1xuICAgICAgLy8gSWYgd2UncmUgYWxyZWFkeSBzY2hlZHVsZWQsIHdlIGNhbiBiYWlsIG91dC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcm9vdC5pc1NjaGVkdWxlZCA9IHRydWU7XG4gICAgaWYgKGxhc3RTY2hlZHVsZWRSb290KSB7XG4gICAgICAvLyBTY2hlZHVsZSBvdXJzZWx2ZXMgdG8gdGhlIGVuZC5cbiAgICAgIGxhc3RTY2hlZHVsZWRSb290Lm5leHRTY2hlZHVsZWRSb290ID0gcm9vdDtcbiAgICAgIGxhc3RTY2hlZHVsZWRSb290ID0gcm9vdDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2UncmUgdGhlIG9ubHkgd29yayBzY2hlZHVsZWQuXG4gICAgICBuZXh0U2NoZWR1bGVkUm9vdCA9IHJvb3Q7XG4gICAgICBsYXN0U2NoZWR1bGVkUm9vdCA9IHJvb3Q7XG4gICAgICBzY2hlZHVsZURlZmVycmVkQ2FsbGJhY2socGVyZm9ybURlZmVycmVkV29yayk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGVyZm9ybUFuaW1hdGlvbldvcmsoKSB7XG4gICAgLy8gQWx3YXlzIHN0YXJ0IGZyb20gdGhlIHJvb3RcbiAgICBuZXh0VW5pdE9mV29yayA9IGZpbmROZXh0VW5pdE9mV29yaygpO1xuICAgIHdoaWxlIChuZXh0VW5pdE9mV29yayAmJiBuZXh0UHJpb3JpdHlMZXZlbCAhPT0gTm9Xb3JrKSB7XG4gICAgICBuZXh0VW5pdE9mV29yayA9IHBlcmZvcm1Vbml0T2ZXb3JrKG5leHRVbml0T2ZXb3JrKTtcbiAgICAgIGlmICghbmV4dFVuaXRPZldvcmspIHtcbiAgICAgICAgLy8gS2VlcCBzZWFyY2hpbmcgZm9yIGFuaW1hdGlvbiB3b3JrIHVudGlsIHRoZXJlJ3Mgbm8gbW9yZSBsZWZ0XG4gICAgICAgIG5leHRVbml0T2ZXb3JrID0gZmluZE5leHRVbml0T2ZXb3JrKCk7XG4gICAgICB9XG4gICAgICAvLyBTdG9wIGlmIHRoZSBuZXh0IHVuaXQgb2Ygd29yayBpcyBsb3cgcHJpb3JpdHlcbiAgICAgIGlmIChuZXh0UHJpb3JpdHlMZXZlbCA+IEFuaW1hdGlvblByaW9yaXR5KSB7XG4gICAgICAgIHNjaGVkdWxlRGVmZXJyZWRDYWxsYmFjayhwZXJmb3JtRGVmZXJyZWRXb3JrKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNjaGVkdWxlQW5pbWF0aW9uV29yayhyb290LCBwcmlvcml0eUxldmVsKSB7XG4gICAgLy8gU2V0IHRoZSBwcmlvcml0eSBvbiB0aGUgcm9vdCwgd2l0aG91dCBkZXByaW9yaXRpemluZ1xuICAgIGlmIChyb290LmN1cnJlbnQucGVuZGluZ1dvcmtQcmlvcml0eSA9PT0gTm9Xb3JrIHx8IHByaW9yaXR5TGV2ZWwgPD0gcm9vdC5jdXJyZW50LnBlbmRpbmdXb3JrUHJpb3JpdHkpIHtcbiAgICAgIHJvb3QuY3VycmVudC5wZW5kaW5nV29ya1ByaW9yaXR5ID0gcHJpb3JpdHlMZXZlbDtcbiAgICB9XG5cbiAgICBpZiAocm9vdC5pc1NjaGVkdWxlZCkge1xuICAgICAgLy8gSWYgd2UncmUgYWxyZWFkeSBzY2hlZHVsZWQsIHdlIGNhbiBiYWlsIG91dC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcm9vdC5pc1NjaGVkdWxlZCA9IHRydWU7XG4gICAgaWYgKGxhc3RTY2hlZHVsZWRSb290KSB7XG4gICAgICAvLyBTY2hlZHVsZSBvdXJzZWx2ZXMgdG8gdGhlIGVuZC5cbiAgICAgIGxhc3RTY2hlZHVsZWRSb290Lm5leHRTY2hlZHVsZWRSb290ID0gcm9vdDtcbiAgICAgIGxhc3RTY2hlZHVsZWRSb290ID0gcm9vdDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2UncmUgdGhlIG9ubHkgd29yayBzY2hlZHVsZWQuXG4gICAgICBuZXh0U2NoZWR1bGVkUm9vdCA9IHJvb3Q7XG4gICAgICBsYXN0U2NoZWR1bGVkUm9vdCA9IHJvb3Q7XG4gICAgICBzY2hlZHVsZUFuaW1hdGlvbkNhbGxiYWNrKHBlcmZvcm1BbmltYXRpb25Xb3JrKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzY2hlZHVsZVdvcmsocm9vdCkge1xuICAgIGlmIChkZWZhdWx0UHJpb3JpdHkgPT09IFN5bmNocm9ub3VzUHJpb3JpdHkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIHlldCcpO1xuICAgIH1cblxuICAgIGlmIChkZWZhdWx0UHJpb3JpdHkgPT09IE5vV29yaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGVmYXVsdFByaW9yaXR5ID4gQW5pbWF0aW9uUHJpb3JpdHkpIHtcbiAgICAgIHNjaGVkdWxlRGVmZXJyZWRXb3JrKHJvb3QsIGRlZmF1bHRQcmlvcml0eSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNjaGVkdWxlQW5pbWF0aW9uV29yayhyb290LCBkZWZhdWx0UHJpb3JpdHkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGVyZm9ybVdpdGhQcmlvcml0eShwcmlvcml0eUxldmVsLCBmbikge1xuICAgIHZhciBwcmV2aW91c0RlZmF1bHRQcmlvcml0eSA9IGRlZmF1bHRQcmlvcml0eTtcbiAgICBkZWZhdWx0UHJpb3JpdHkgPSBwcmlvcml0eUxldmVsO1xuICAgIHRyeSB7XG4gICAgICBmbigpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBkZWZhdWx0UHJpb3JpdHkgPSBwcmV2aW91c0RlZmF1bHRQcmlvcml0eTtcbiAgICB9XG4gIH1cblxuICBzY2hlZHVsZXIgPSB7XG4gICAgc2NoZWR1bGVXb3JrOiBzY2hlZHVsZVdvcmssXG4gICAgc2NoZWR1bGVEZWZlcnJlZFdvcms6IHNjaGVkdWxlRGVmZXJyZWRXb3JrLFxuICAgIHBlcmZvcm1XaXRoUHJpb3JpdHk6IHBlcmZvcm1XaXRoUHJpb3JpdHlcbiAgfTtcbiAgcmV0dXJuIHNjaGVkdWxlcjtcbn07Il19