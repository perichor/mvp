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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = require('./ReactChildFiber'),
    reconcileChildFibers = _require.reconcileChildFibers,
    reconcileChildFibersInPlace = _require.reconcileChildFibersInPlace,
    cloneChildFibers = _require.cloneChildFibers;

var _require2 = require('./ReactPriorityLevel'),
    LowPriority = _require2.LowPriority;

var ReactTypeOfWork = require('./ReactTypeOfWork');
var IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent,
    FunctionalComponent = ReactTypeOfWork.FunctionalComponent,
    ClassComponent = ReactTypeOfWork.ClassComponent,
    HostContainer = ReactTypeOfWork.HostContainer,
    HostComponent = ReactTypeOfWork.HostComponent,
    CoroutineComponent = ReactTypeOfWork.CoroutineComponent,
    CoroutineHandlerPhase = ReactTypeOfWork.CoroutineHandlerPhase,
    YieldComponent = ReactTypeOfWork.YieldComponent;

var _require3 = require('./ReactPriorityLevel'),
    NoWork = _require3.NoWork,
    OffscreenPriority = _require3.OffscreenPriority;

var _require4 = require('./ReactFiberUpdateQueue'),
    createUpdateQueue = _require4.createUpdateQueue,
    addToQueue = _require4.addToQueue,
    addCallbackToQueue = _require4.addCallbackToQueue,
    mergeUpdateQueue = _require4.mergeUpdateQueue;

var ReactInstanceMap = require('./ReactInstanceMap');

module.exports = function (config, getScheduler) {

  function markChildAsProgressed(current, workInProgress, priorityLevel) {
    // We now have clones. Let's store them as the currently progressed work.
    workInProgress.progressedChild = workInProgress.child;
    workInProgress.progressedPriority = priorityLevel;
    if (current) {
      // We also store it on the current. When the alternate swaps in we can
      // continue from this point.
      current.progressedChild = workInProgress.progressedChild;
      current.progressedPriority = workInProgress.progressedPriority;
    }
  }

  function reconcileChildren(current, workInProgress, nextChildren) {
    var priorityLevel = workInProgress.pendingWorkPriority;
    reconcileChildrenAtPriority(current, workInProgress, nextChildren, priorityLevel);
  }

  function reconcileChildrenAtPriority(current, workInProgress, nextChildren, priorityLevel) {
    // At this point any memoization is no longer valid since we'll have changed
    // the children.
    workInProgress.memoizedProps = null;
    if (current && current.child === workInProgress.child) {
      // If the current child is the same as the work in progress, it means that
      // we haven't yet started any work on these children. Therefore, we use
      // the clone algorithm to create a copy of all the current children.
      workInProgress.child = reconcileChildFibers(workInProgress, workInProgress.child, nextChildren, priorityLevel);
    } else {
      // If, on the other hand, we don't have a current fiber or if it is
      // already using a clone, that means we've already begun some work on this
      // tree and we can continue where we left off by reconciling against the
      // existing children.
      workInProgress.child = reconcileChildFibersInPlace(workInProgress, workInProgress.child, nextChildren, priorityLevel);
    }
    markChildAsProgressed(current, workInProgress, priorityLevel);
  }

  function updateFunctionalComponent(current, workInProgress) {
    var fn = workInProgress.type;
    var props = workInProgress.pendingProps;

    // TODO: Disable this before release, since it is not part of the public API
    // I use this for testing to compare the relative overhead of classes.
    if (typeof fn.shouldComponentUpdate === 'function') {
      if (workInProgress.memoizedProps !== null) {
        if (!fn.shouldComponentUpdate(workInProgress.memoizedProps, props)) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }
      }
    }

    var nextChildren = fn(props);
    reconcileChildren(current, workInProgress, nextChildren);
    return workInProgress.child;
  }

  function scheduleUpdate(fiber, updateQueue, priorityLevel) {
    var _getScheduler = getScheduler(),
        scheduleDeferredWork = _getScheduler.scheduleDeferredWork;

    fiber.updateQueue = updateQueue;
    // Schedule update on the alternate as well, since we don't know which tree
    // is current.
    if (fiber.alternate) {
      fiber.alternate.updateQueue = updateQueue;
    }
    while (true) {
      if (fiber.pendingWorkPriority === NoWork || fiber.pendingWorkPriority >= priorityLevel) {
        fiber.pendingWorkPriority = priorityLevel;
      }
      if (fiber.alternate) {
        if (fiber.alternate.pendingWorkPriority === NoWork || fiber.alternate.pendingWorkPriority >= priorityLevel) {
          fiber.alternate.pendingWorkPriority = priorityLevel;
        }
      }
      // Duck type root
      if (fiber.stateNode && fiber.stateNode.containerInfo) {
        var root = fiber.stateNode;
        scheduleDeferredWork(root, priorityLevel);
        return;
      }
      if (!fiber['return']) {
        throw new Error('No root!');
      }
      fiber = fiber['return'];
    }
  }

  // Class component state updater
  var updater = {
    enqueueSetState: function enqueueSetState(instance, partialState) {
      var fiber = ReactInstanceMap.get(instance);
      var updateQueue = fiber.updateQueue ? addToQueue(fiber.updateQueue, partialState) : createUpdateQueue(partialState);
      scheduleUpdate(fiber, updateQueue, LowPriority);
    },
    enqueueReplaceState: function enqueueReplaceState(instance, state) {
      var fiber = ReactInstanceMap.get(instance);
      var updateQueue = createUpdateQueue(state);
      updateQueue.isReplace = true;
      scheduleUpdate(fiber, updateQueue, LowPriority);
    },
    enqueueForceUpdate: function enqueueForceUpdate(instance) {
      var fiber = ReactInstanceMap.get(instance);
      var updateQueue = fiber.updateQueue || createUpdateQueue(null);
      updateQueue.isForced = true;
      scheduleUpdate(fiber, updateQueue, LowPriority);
    },
    enqueueCallback: function enqueueCallback(instance, callback) {
      var fiber = ReactInstanceMap.get(instance);
      var updateQueue = fiber.updateQueue ? fiber.updateQueue : createUpdateQueue(null);
      addCallbackToQueue(updateQueue, callback);
      fiber.updateQueue = updateQueue;
      if (fiber.alternate) {
        fiber.alternate.updateQueue = updateQueue;
      }
    }
  };

  function updateClassComponent(current, workInProgress) {
    // A class component update is the result of either new props or new state.
    // Account for the possibly of missing pending props by falling back to the
    // memoized props.
    var props = workInProgress.pendingProps;
    if (!props && current) {
      props = current.memoizedProps;
    }
    // Compute the state using the memoized state and the update queue.
    var updateQueue = workInProgress.updateQueue;
    var previousState = current ? current.memoizedState : null;
    var state = updateQueue ? mergeUpdateQueue(updateQueue, previousState, props) : previousState;

    var instance = workInProgress.stateNode;
    if (!instance) {
      var ctor = workInProgress.type;
      workInProgress.stateNode = instance = new ctor(props);
      state = instance.state || null;
      // The initial state must be added to the update queue in case
      // setState is called before the initial render.
      if (state !== null) {
        workInProgress.updateQueue = createUpdateQueue(state);
      }
      // The instance needs access to the fiber so that it can schedule updates
      ReactInstanceMap.set(instance, workInProgress);
      instance.updater = updater;
    } else if (typeof instance.shouldComponentUpdate === 'function' && !(updateQueue && updateQueue.isForced)) {
      if (workInProgress.memoizedProps !== null) {
        // Reset the props, in case this is a ping-pong case rather than a
        // completed update case. For the completed update case, the instance
        // props will already be the memoizedProps.
        instance.props = workInProgress.memoizedProps;
        instance.state = workInProgress.memoizedState;
        if (!instance.shouldComponentUpdate(props, state)) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }
      }
    }

    instance.props = props;
    instance.state = state;
    var nextChildren = instance.render();
    reconcileChildren(current, workInProgress, nextChildren);

    return workInProgress.child;
  }

  function updateHostComponent(current, workInProgress) {
    var nextChildren = workInProgress.pendingProps.children;
    if (workInProgress.pendingProps.hidden && workInProgress.pendingWorkPriority !== OffscreenPriority) {
      // If this host component is hidden, we can bail out on the children.
      // We'll rerender the children later at the lower priority.

      // It is unfortunate that we have to do the reconciliation of these
      // children already since that will add them to the tree even though
      // they are not actually done yet. If this is a large set it is also
      // confusing that this takes time to do right now instead of later.

      if (workInProgress.progressedPriority === OffscreenPriority) {
        // If we already made some progress on the offscreen priority before,
        // then we should continue from where we left off.
        workInProgress.child = workInProgress.progressedChild;
      }

      // Reconcile the children and stash them for later work.
      reconcileChildrenAtPriority(current, workInProgress, nextChildren, OffscreenPriority);
      workInProgress.child = current ? current.child : null;
      // Abort and don't process children yet.
      return null;
    } else {
      reconcileChildren(current, workInProgress, nextChildren);
      return workInProgress.child;
    }
  }

  function mountIndeterminateComponent(current, workInProgress) {
    var fn = workInProgress.type;
    var props = workInProgress.pendingProps;
    var value = fn(props);
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value && typeof value.render === 'function') {
      // Proceed under the assumption that this is a class instance
      workInProgress.tag = ClassComponent;
      if (current) {
        current.tag = ClassComponent;
      }
      value = value.render();
    } else {
      // Proceed under the assumption that this is a functional component
      workInProgress.tag = FunctionalComponent;
      if (current) {
        current.tag = FunctionalComponent;
      }
    }
    reconcileChildren(current, workInProgress, value);
    return workInProgress.child;
  }

  function updateCoroutineComponent(current, workInProgress) {
    var coroutine = workInProgress.pendingProps;
    if (!coroutine) {
      throw new Error('Should be resolved by now');
    }
    reconcileChildren(current, workInProgress, coroutine.children);
  }

  /*
  function reuseChildrenEffects(returnFiber : Fiber, firstChild : Fiber) {
    let child = firstChild;
    do {
      // Ensure that the first and last effect of the parent corresponds
      // to the children's first and last effect.
      if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = child.firstEffect;
      }
      if (child.lastEffect) {
        if (returnFiber.lastEffect) {
          returnFiber.lastEffect.nextEffect = child.firstEffect;
        }
        returnFiber.lastEffect = child.lastEffect;
      }
    } while (child = child.sibling);
  }
  */

  function bailoutOnAlreadyFinishedWork(current, workInProgress) {
    var priorityLevel = workInProgress.pendingWorkPriority;

    // TODO: We should ideally be able to bail out early if the children have no
    // more work to do. However, since we don't have a separation of this
    // Fiber's priority and its children yet - we don't know without doing lots
    // of the same work we do anyway. Once we have that separation we can just
    // bail out here if the children has no more work at this priority level.
    // if (workInProgress.priorityOfChildren <= priorityLevel) {
    //   // If there are side-effects in these children that have not yet been
    //   // committed we need to ensure that they get properly transferred up.
    //   if (current && current.child !== workInProgress.child) {
    //     reuseChildrenEffects(workInProgress, child);
    //   }
    //   return null;
    // }

    cloneChildFibers(current, workInProgress);
    markChildAsProgressed(current, workInProgress, priorityLevel);
    return workInProgress.child;
  }

  function bailoutOnLowPriority(current, workInProgress) {
    if (current) {
      workInProgress.child = current.child;
      workInProgress.memoizedProps = current.memoizedProps;
      workInProgress.output = current.output;
    }
    return null;
  }

  function beginWork(current, workInProgress, priorityLevel) {
    if (workInProgress.pendingWorkPriority === NoWork || workInProgress.pendingWorkPriority > priorityLevel) {
      return bailoutOnLowPriority(current, workInProgress);
    }

    if (workInProgress.progressedPriority === priorityLevel) {
      // If we have progressed work on this priority level already, we can
      // proceed this that as the child.
      workInProgress.child = workInProgress.progressedChild;
    }

    if ((workInProgress.pendingProps === null || workInProgress.memoizedProps !== null && workInProgress.pendingProps === workInProgress.memoizedProps) && workInProgress.updateQueue === null) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    switch (workInProgress.tag) {
      case IndeterminateComponent:
        return mountIndeterminateComponent(current, workInProgress);
      case FunctionalComponent:
        return updateFunctionalComponent(current, workInProgress);
      case ClassComponent:
        return updateClassComponent(current, workInProgress);
      case HostContainer:
        reconcileChildren(current, workInProgress, workInProgress.pendingProps);
        // A yield component is just a placeholder, we can just run through the
        // next one immediately.
        if (workInProgress.child) {
          return beginWork(workInProgress.child.alternate, workInProgress.child, priorityLevel);
        }
        return null;
      case HostComponent:
        if (workInProgress.stateNode && config.beginUpdate) {
          config.beginUpdate(workInProgress.stateNode);
        }
        return updateHostComponent(current, workInProgress);
      case CoroutineHandlerPhase:
        // This is a restart. Reset the tag to the initial phase.
        workInProgress.tag = CoroutineComponent;
      // Intentionally fall through since this is now the same.
      case CoroutineComponent:
        updateCoroutineComponent(current, workInProgress);
        // This doesn't take arbitrary time so we could synchronously just begin
        // eagerly do the work of workInProgress.child as an optimization.
        if (workInProgress.child) {
          return beginWork(workInProgress.child.alternate, workInProgress.child, priorityLevel);
        }
        return workInProgress.child;
      case YieldComponent:
        // A yield component is just a placeholder, we can just run through the
        // next one immediately.
        if (workInProgress.sibling) {
          return beginWork(workInProgress.sibling.alternate, workInProgress.sibling, priorityLevel);
        }
        return null;
      default:
        throw new Error('Unknown unit of work tag');
    }
  }

  return {
    beginWork: beginWork
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdEZpYmVyQmVnaW5Xb3JrLmpzIl0sIm5hbWVzIjpbIl9yZXF1aXJlIiwicmVxdWlyZSIsInJlY29uY2lsZUNoaWxkRmliZXJzIiwicmVjb25jaWxlQ2hpbGRGaWJlcnNJblBsYWNlIiwiY2xvbmVDaGlsZEZpYmVycyIsIl9yZXF1aXJlMiIsIkxvd1ByaW9yaXR5IiwiUmVhY3RUeXBlT2ZXb3JrIiwiSW5kZXRlcm1pbmF0ZUNvbXBvbmVudCIsIkZ1bmN0aW9uYWxDb21wb25lbnQiLCJDbGFzc0NvbXBvbmVudCIsIkhvc3RDb250YWluZXIiLCJIb3N0Q29tcG9uZW50IiwiQ29yb3V0aW5lQ29tcG9uZW50IiwiQ29yb3V0aW5lSGFuZGxlclBoYXNlIiwiWWllbGRDb21wb25lbnQiLCJfcmVxdWlyZTMiLCJOb1dvcmsiLCJPZmZzY3JlZW5Qcmlvcml0eSIsIl9yZXF1aXJlNCIsImNyZWF0ZVVwZGF0ZVF1ZXVlIiwiYWRkVG9RdWV1ZSIsImFkZENhbGxiYWNrVG9RdWV1ZSIsIm1lcmdlVXBkYXRlUXVldWUiLCJSZWFjdEluc3RhbmNlTWFwIiwibW9kdWxlIiwiZXhwb3J0cyIsImNvbmZpZyIsImdldFNjaGVkdWxlciIsIm1hcmtDaGlsZEFzUHJvZ3Jlc3NlZCIsImN1cnJlbnQiLCJ3b3JrSW5Qcm9ncmVzcyIsInByaW9yaXR5TGV2ZWwiLCJwcm9ncmVzc2VkQ2hpbGQiLCJjaGlsZCIsInByb2dyZXNzZWRQcmlvcml0eSIsInJlY29uY2lsZUNoaWxkcmVuIiwibmV4dENoaWxkcmVuIiwicGVuZGluZ1dvcmtQcmlvcml0eSIsInJlY29uY2lsZUNoaWxkcmVuQXRQcmlvcml0eSIsIm1lbW9pemVkUHJvcHMiLCJ1cGRhdGVGdW5jdGlvbmFsQ29tcG9uZW50IiwiZm4iLCJ0eXBlIiwicHJvcHMiLCJwZW5kaW5nUHJvcHMiLCJzaG91bGRDb21wb25lbnRVcGRhdGUiLCJiYWlsb3V0T25BbHJlYWR5RmluaXNoZWRXb3JrIiwic2NoZWR1bGVVcGRhdGUiLCJmaWJlciIsInVwZGF0ZVF1ZXVlIiwiX2dldFNjaGVkdWxlciIsInNjaGVkdWxlRGVmZXJyZWRXb3JrIiwiYWx0ZXJuYXRlIiwic3RhdGVOb2RlIiwiY29udGFpbmVySW5mbyIsInJvb3QiLCJFcnJvciIsInVwZGF0ZXIiLCJlbnF1ZXVlU2V0U3RhdGUiLCJpbnN0YW5jZSIsInBhcnRpYWxTdGF0ZSIsImdldCIsImVucXVldWVSZXBsYWNlU3RhdGUiLCJzdGF0ZSIsImlzUmVwbGFjZSIsImVucXVldWVGb3JjZVVwZGF0ZSIsImlzRm9yY2VkIiwiZW5xdWV1ZUNhbGxiYWNrIiwiY2FsbGJhY2siLCJ1cGRhdGVDbGFzc0NvbXBvbmVudCIsInByZXZpb3VzU3RhdGUiLCJtZW1vaXplZFN0YXRlIiwiY3RvciIsInNldCIsInJlbmRlciIsInVwZGF0ZUhvc3RDb21wb25lbnQiLCJjaGlsZHJlbiIsImhpZGRlbiIsIm1vdW50SW5kZXRlcm1pbmF0ZUNvbXBvbmVudCIsInZhbHVlIiwidGFnIiwidXBkYXRlQ29yb3V0aW5lQ29tcG9uZW50IiwiY29yb3V0aW5lIiwiYmFpbG91dE9uTG93UHJpb3JpdHkiLCJvdXRwdXQiLCJiZWdpbldvcmsiLCJiZWdpblVwZGF0ZSIsInNpYmxpbmciXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQVdBOzs7O0FBRUEsSUFBSUEsV0FBV0MsUUFBUSxtQkFBUixDQUFmO0FBQUEsSUFDSUMsdUJBQXVCRixTQUFTRSxvQkFEcEM7QUFBQSxJQUVJQyw4QkFBOEJILFNBQVNHLDJCQUYzQztBQUFBLElBR0lDLG1CQUFtQkosU0FBU0ksZ0JBSGhDOztBQUtBLElBQUlDLFlBQVlKLFFBQVEsc0JBQVIsQ0FBaEI7QUFBQSxJQUNJSyxjQUFjRCxVQUFVQyxXQUQ1Qjs7QUFHQSxJQUFJQyxrQkFBa0JOLFFBQVEsbUJBQVIsQ0FBdEI7QUFDQSxJQUFJTyx5QkFBeUJELGdCQUFnQkMsc0JBQTdDO0FBQUEsSUFDSUMsc0JBQXNC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dEIsZUFBZUcsS0FBekQsRUFBZ0VGLGFBQWhFLENBQVA7QUFDRDtBQUNELGVBQU9ELGVBQWVHLEtBQXRCO0FBQ0YsV0FBS25CLGNBQUw7QUFDRTtBQUNBO0FBQ0EsWUFBSWdCLGVBQWV5RCxPQUFuQixFQUE0QjtBQUMxQixpQkFBT0YsVUFBVXZELGVBQWV5RCxPQUFmLENBQXVCbkMsU0FBakMsRUFBNEN0QixlQUFleUQsT0FBM0QsRUFBb0V4RCxhQUFwRSxDQUFQO0FBQ0Q7QUFDRCxlQUFPLElBQVA7QUFDRjtBQUNFLGNBQU0sSUFBSXlCLEtBQUosQ0FBVSwwQkFBVixDQUFOO0FBeENKO0FBMENEOztBQUVELFNBQU87QUFDTDZCLGVBQVdBO0FBRE4sR0FBUDtBQUdELENBaFZEIiwiZmlsZSI6IlJlYWN0RmliZXJCZWdpbldvcmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vUmVhY3RDaGlsZEZpYmVyJyksXG4gICAgcmVjb25jaWxlQ2hpbGRGaWJlcnMgPSBfcmVxdWlyZS5yZWNvbmNpbGVDaGlsZEZpYmVycyxcbiAgICByZWNvbmNpbGVDaGlsZEZpYmVyc0luUGxhY2UgPSBfcmVxdWlyZS5yZWNvbmNpbGVDaGlsZEZpYmVyc0luUGxhY2UsXG4gICAgY2xvbmVDaGlsZEZpYmVycyA9IF9yZXF1aXJlLmNsb25lQ2hpbGRGaWJlcnM7XG5cbnZhciBfcmVxdWlyZTIgPSByZXF1aXJlKCcuL1JlYWN0UHJpb3JpdHlMZXZlbCcpLFxuICAgIExvd1ByaW9yaXR5ID0gX3JlcXVpcmUyLkxvd1ByaW9yaXR5O1xuXG52YXIgUmVhY3RUeXBlT2ZXb3JrID0gcmVxdWlyZSgnLi9SZWFjdFR5cGVPZldvcmsnKTtcbnZhciBJbmRldGVybWluYXRlQ29tcG9uZW50ID0gUmVhY3RUeXBlT2ZXb3JrLkluZGV0ZXJtaW5hdGVDb21wb25lbnQsXG4gICAgRnVuY3Rpb25hbENvbXBvbmVudCA9IFJlYWN0VHlwZU9mV29yay5GdW5jdGlvbmFsQ29tcG9uZW50LFxuICAgIENsYXNzQ29tcG9uZW50ID0gUmVhY3RUeXBlT2ZXb3JrLkNsYXNzQ29tcG9uZW50LFxuICAgIEhvc3RDb250YWluZXIgPSBSZWFjdFR5cGVPZldvcmsuSG9zdENvbnRhaW5lcixcbiAgICBIb3N0Q29tcG9uZW50ID0gUmVhY3RUeXBlT2ZXb3JrLkhvc3RDb21wb25lbnQsXG4gICAgQ29yb3V0aW5lQ29tcG9uZW50ID0gUmVhY3RUeXBlT2ZXb3JrLkNvcm91dGluZUNvbXBvbmVudCxcbiAgICBDb3JvdXRpbmVIYW5kbGVyUGhhc2UgPSBSZWFjdFR5cGVPZldvcmsuQ29yb3V0aW5lSGFuZGxlclBoYXNlLFxuICAgIFlpZWxkQ29tcG9uZW50ID0gUmVhY3RUeXBlT2ZXb3JrLllpZWxkQ29tcG9uZW50O1xuXG52YXIgX3JlcXVpcmUzID0gcmVxdWlyZSgnLi9SZWFjdFByaW9yaXR5TGV2ZWwnKSxcbiAgICBOb1dvcmsgPSBfcmVxdWlyZTMuTm9Xb3JrLFxuICAgIE9mZnNjcmVlblByaW9yaXR5ID0gX3JlcXVpcmUzLk9mZnNjcmVlblByaW9yaXR5O1xuXG52YXIgX3JlcXVpcmU0ID0gcmVxdWlyZSgnLi9SZWFjdEZpYmVyVXBkYXRlUXVldWUnKSxcbiAgICBjcmVhdGVVcGRhdGVRdWV1ZSA9IF9yZXF1aXJlNC5jcmVhdGVVcGRhdGVRdWV1ZSxcbiAgICBhZGRUb1F1ZXVlID0gX3JlcXVpcmU0LmFkZFRvUXVldWUsXG4gICAgYWRkQ2FsbGJhY2tUb1F1ZXVlID0gX3JlcXVpcmU0LmFkZENhbGxiYWNrVG9RdWV1ZSxcbiAgICBtZXJnZVVwZGF0ZVF1ZXVlID0gX3JlcXVpcmU0Lm1lcmdlVXBkYXRlUXVldWU7XG5cbnZhciBSZWFjdEluc3RhbmNlTWFwID0gcmVxdWlyZSgnLi9SZWFjdEluc3RhbmNlTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNvbmZpZywgZ2V0U2NoZWR1bGVyKSB7XG5cbiAgZnVuY3Rpb24gbWFya0NoaWxkQXNQcm9ncmVzc2VkKGN1cnJlbnQsIHdvcmtJblByb2dyZXNzLCBwcmlvcml0eUxldmVsKSB7XG4gICAgLy8gV2Ugbm93IGhhdmUgY2xvbmVzLiBMZXQncyBzdG9yZSB0aGVtIGFzIHRoZSBjdXJyZW50bHkgcHJvZ3Jlc3NlZCB3b3JrLlxuICAgIHdvcmtJblByb2dyZXNzLnByb2dyZXNzZWRDaGlsZCA9IHdvcmtJblByb2dyZXNzLmNoaWxkO1xuICAgIHdvcmtJblByb2dyZXNzLnByb2dyZXNzZWRQcmlvcml0eSA9IHByaW9yaXR5TGV2ZWw7XG4gICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgIC8vIFdlIGFsc28gc3RvcmUgaXQgb24gdGhlIGN1cnJlbnQuIFdoZW4gdGhlIGFsdGVybmF0ZSBzd2FwcyBpbiB3ZSBjYW5cbiAgICAgIC8vIGNvbnRpbnVlIGZyb20gdGhpcyBwb2ludC5cbiAgICAgIGN1cnJlbnQucHJvZ3Jlc3NlZENoaWxkID0gd29ya0luUHJvZ3Jlc3MucHJvZ3Jlc3NlZENoaWxkO1xuICAgICAgY3VycmVudC5wcm9ncmVzc2VkUHJpb3JpdHkgPSB3b3JrSW5Qcm9ncmVzcy5wcm9ncmVzc2VkUHJpb3JpdHk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVjb25jaWxlQ2hpbGRyZW4oY3VycmVudCwgd29ya0luUHJvZ3Jlc3MsIG5leHRDaGlsZHJlbikge1xuICAgIHZhciBwcmlvcml0eUxldmVsID0gd29ya0luUHJvZ3Jlc3MucGVuZGluZ1dvcmtQcmlvcml0eTtcbiAgICByZWNvbmNpbGVDaGlsZHJlbkF0UHJpb3JpdHkoY3VycmVudCwgd29ya0luUHJvZ3Jlc3MsIG5leHRDaGlsZHJlbiwgcHJpb3JpdHlMZXZlbCk7XG4gIH1cblxuICBmdW5jdGlvbiByZWNvbmNpbGVDaGlsZHJlbkF0UHJpb3JpdHkoY3VycmVudCwgd29ya0luUHJvZ3Jlc3MsIG5leHRDaGlsZHJlbiwgcHJpb3JpdHlMZXZlbCkge1xuICAgIC8vIEF0IHRoaXMgcG9pbnQgYW55IG1lbW9pemF0aW9uIGlzIG5vIGxvbmdlciB2YWxpZCBzaW5jZSB3ZSdsbCBoYXZlIGNoYW5nZWRcbiAgICAvLyB0aGUgY2hpbGRyZW4uXG4gICAgd29ya0luUHJvZ3Jlc3MubWVtb2l6ZWRQcm9wcyA9IG51bGw7XG4gICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudC5jaGlsZCA9PT0gd29ya0luUHJvZ3Jlc3MuY2hpbGQpIHtcbiAgICAgIC8vIElmIHRoZSBjdXJyZW50IGNoaWxkIGlzIHRoZSBzYW1lIGFzIHRoZSB3b3JrIGluIHByb2dyZXNzLCBpdCBtZWFucyB0aGF0XG4gICAgICAvLyB3ZSBoYXZlbid0IHlldCBzdGFydGVkIGFueSB3b3JrIG9uIHRoZXNlIGNoaWxkcmVuLiBUaGVyZWZvcmUsIHdlIHVzZVxuICAgICAgLy8gdGhlIGNsb25lIGFsZ29yaXRobSB0byBjcmVhdGUgYSBjb3B5IG9mIGFsbCB0aGUgY3VycmVudCBjaGlsZHJlbi5cbiAgICAgIHdvcmtJblByb2dyZXNzLmNoaWxkID0gcmVjb25jaWxlQ2hpbGRGaWJlcnMod29ya0luUHJvZ3Jlc3MsIHdvcmtJblByb2dyZXNzLmNoaWxkLCBuZXh0Q2hpbGRyZW4sIHByaW9yaXR5TGV2ZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiwgb24gdGhlIG90aGVyIGhhbmQsIHdlIGRvbid0IGhhdmUgYSBjdXJyZW50IGZpYmVyIG9yIGlmIGl0IGlzXG4gICAgICAvLyBhbHJlYWR5IHVzaW5nIGEgY2xvbmUsIHRoYXQgbWVhbnMgd2UndmUgYWxyZWFkeSBiZWd1biBzb21lIHdvcmsgb24gdGhpc1xuICAgICAgLy8gdHJlZSBhbmQgd2UgY2FuIGNvbnRpbnVlIHdoZXJlIHdlIGxlZnQgb2ZmIGJ5IHJlY29uY2lsaW5nIGFnYWluc3QgdGhlXG4gICAgICAvLyBleGlzdGluZyBjaGlsZHJlbi5cbiAgICAgIHdvcmtJblByb2dyZXNzLmNoaWxkID0gcmVjb25jaWxlQ2hpbGRGaWJlcnNJblBsYWNlKHdvcmtJblByb2dyZXNzLCB3b3JrSW5Qcm9ncmVzcy5jaGlsZCwgbmV4dENoaWxkcmVuLCBwcmlvcml0eUxldmVsKTtcbiAgICB9XG4gICAgbWFya0NoaWxkQXNQcm9ncmVzc2VkKGN1cnJlbnQsIHdvcmtJblByb2dyZXNzLCBwcmlvcml0eUxldmVsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUZ1bmN0aW9uYWxDb21wb25lbnQoY3VycmVudCwgd29ya0luUHJvZ3Jlc3MpIHtcbiAgICB2YXIgZm4gPSB3b3JrSW5Qcm9ncmVzcy50eXBlO1xuICAgIHZhciBwcm9wcyA9IHdvcmtJblByb2dyZXNzLnBlbmRpbmdQcm9wcztcblxuICAgIC8vIFRPRE86IERpc2FibGUgdGhpcyBiZWZvcmUgcmVsZWFzZSwgc2luY2UgaXQgaXMgbm90IHBhcnQgb2YgdGhlIHB1YmxpYyBBUElcbiAgICAvLyBJIHVzZSB0aGlzIGZvciB0ZXN0aW5nIHRvIGNvbXBhcmUgdGhlIHJlbGF0aXZlIG92ZXJoZWFkIG9mIGNsYXNzZXMuXG4gICAgaWYgKHR5cGVvZiBmbi5zaG91bGRDb21wb25lbnRVcGRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmICh3b3JrSW5Qcm9ncmVzcy5tZW1vaXplZFByb3BzICE9PSBudWxsKSB7XG4gICAgICAgIGlmICghZm4uc2hvdWxkQ29tcG9uZW50VXBkYXRlKHdvcmtJblByb2dyZXNzLm1lbW9pemVkUHJvcHMsIHByb3BzKSkge1xuICAgICAgICAgIHJldHVybiBiYWlsb3V0T25BbHJlYWR5RmluaXNoZWRXb3JrKGN1cnJlbnQsIHdvcmtJblByb2dyZXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBuZXh0Q2hpbGRyZW4gPSBmbihwcm9wcyk7XG4gICAgcmVjb25jaWxlQ2hpbGRyZW4oY3VycmVudCwgd29ya0luUHJvZ3Jlc3MsIG5leHRDaGlsZHJlbik7XG4gICAgcmV0dXJuIHdvcmtJblByb2dyZXNzLmNoaWxkO1xuICB9XG5cbiAgZnVuY3Rpb24gc2NoZWR1bGVVcGRhdGUoZmliZXIsIHVwZGF0ZVF1ZXVlLCBwcmlvcml0eUxldmVsKSB7XG4gICAgdmFyIF9nZXRTY2hlZHVsZXIgPSBnZXRTY2hlZHVsZXIoKSxcbiAgICAgICAgc2NoZWR1bGVEZWZlcnJlZFdvcmsgPSBfZ2V0U2NoZWR1bGVyLnNjaGVkdWxlRGVmZXJyZWRXb3JrO1xuXG4gICAgZmliZXIudXBkYXRlUXVldWUgPSB1cGRhdGVRdWV1ZTtcbiAgICAvLyBTY2hlZHVsZSB1cGRhdGUgb24gdGhlIGFsdGVybmF0ZSBhcyB3ZWxsLCBzaW5jZSB3ZSBkb24ndCBrbm93IHdoaWNoIHRyZWVcbiAgICAvLyBpcyBjdXJyZW50LlxuICAgIGlmIChmaWJlci5hbHRlcm5hdGUpIHtcbiAgICAgIGZpYmVyLmFsdGVybmF0ZS51cGRhdGVRdWV1ZSA9IHVwZGF0ZVF1ZXVlO1xuICAgIH1cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKGZpYmVyLnBlbmRpbmdXb3JrUHJpb3JpdHkgPT09IE5vV29yayB8fCBmaWJlci5wZW5kaW5nV29ya1ByaW9yaXR5ID49IHByaW9yaXR5TGV2ZWwpIHtcbiAgICAgICAgZmliZXIucGVuZGluZ1dvcmtQcmlvcml0eSA9IHByaW9yaXR5TGV2ZWw7XG4gICAgICB9XG4gICAgICBpZiAoZmliZXIuYWx0ZXJuYXRlKSB7XG4gICAgICAgIGlmIChmaWJlci5hbHRlcm5hdGUucGVuZGluZ1dvcmtQcmlvcml0eSA9PT0gTm9Xb3JrIHx8IGZpYmVyLmFsdGVybmF0ZS5wZW5kaW5nV29ya1ByaW9yaXR5ID49IHByaW9yaXR5TGV2ZWwpIHtcbiAgICAgICAgICBmaWJlci5hbHRlcm5hdGUucGVuZGluZ1dvcmtQcmlvcml0eSA9IHByaW9yaXR5TGV2ZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIER1Y2sgdHlwZSByb290XG4gICAgICBpZiAoZmliZXIuc3RhdGVOb2RlICYmIGZpYmVyLnN0YXRlTm9kZS5jb250YWluZXJJbmZvKSB7XG4gICAgICAgIHZhciByb290ID0gZmliZXIuc3RhdGVOb2RlO1xuICAgICAgICBzY2hlZHVsZURlZmVycmVkV29yayhyb290LCBwcmlvcml0eUxldmVsKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFmaWJlclsncmV0dXJuJ10pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyByb290IScpO1xuICAgICAgfVxuICAgICAgZmliZXIgPSBmaWJlclsncmV0dXJuJ107XG4gICAgfVxuICB9XG5cbiAgLy8gQ2xhc3MgY29tcG9uZW50IHN0YXRlIHVwZGF0ZXJcbiAgdmFyIHVwZGF0ZXIgPSB7XG4gICAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAoaW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSkge1xuICAgICAgdmFyIGZpYmVyID0gUmVhY3RJbnN0YW5jZU1hcC5nZXQoaW5zdGFuY2UpO1xuICAgICAgdmFyIHVwZGF0ZVF1ZXVlID0gZmliZXIudXBkYXRlUXVldWUgPyBhZGRUb1F1ZXVlKGZpYmVyLnVwZGF0ZVF1ZXVlLCBwYXJ0aWFsU3RhdGUpIDogY3JlYXRlVXBkYXRlUXVldWUocGFydGlhbFN0YXRlKTtcbiAgICAgIHNjaGVkdWxlVXBkYXRlKGZpYmVyLCB1cGRhdGVRdWV1ZSwgTG93UHJpb3JpdHkpO1xuICAgIH0sXG4gICAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKGluc3RhbmNlLCBzdGF0ZSkge1xuICAgICAgdmFyIGZpYmVyID0gUmVhY3RJbnN0YW5jZU1hcC5nZXQoaW5zdGFuY2UpO1xuICAgICAgdmFyIHVwZGF0ZVF1ZXVlID0gY3JlYXRlVXBkYXRlUXVldWUoc3RhdGUpO1xuICAgICAgdXBkYXRlUXVldWUuaXNSZXBsYWNlID0gdHJ1ZTtcbiAgICAgIHNjaGVkdWxlVXBkYXRlKGZpYmVyLCB1cGRhdGVRdWV1ZSwgTG93UHJpb3JpdHkpO1xuICAgIH0sXG4gICAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgIHZhciBmaWJlciA9IFJlYWN0SW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKTtcbiAgICAgIHZhciB1cGRhdGVRdWV1ZSA9IGZpYmVyLnVwZGF0ZVF1ZXVlIHx8IGNyZWF0ZVVwZGF0ZVF1ZXVlKG51bGwpO1xuICAgICAgdXBkYXRlUXVldWUuaXNGb3JjZWQgPSB0cnVlO1xuICAgICAgc2NoZWR1bGVVcGRhdGUoZmliZXIsIHVwZGF0ZVF1ZXVlLCBMb3dQcmlvcml0eSk7XG4gICAgfSxcbiAgICBlbnF1ZXVlQ2FsbGJhY2s6IGZ1bmN0aW9uIChpbnN0YW5jZSwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBmaWJlciA9IFJlYWN0SW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKTtcbiAgICAgIHZhciB1cGRhdGVRdWV1ZSA9IGZpYmVyLnVwZGF0ZVF1ZXVlID8gZmliZXIudXBkYXRlUXVldWUgOiBjcmVhdGVVcGRhdGVRdWV1ZShudWxsKTtcbiAgICAgIGFkZENhbGxiYWNrVG9RdWV1ZSh1cGRhdGVRdWV1ZSwgY2FsbGJhY2spO1xuICAgICAgZmliZXIudXBkYXRlUXVldWUgPSB1cGRhdGVRdWV1ZTtcbiAgICAgIGlmIChmaWJlci5hbHRlcm5hdGUpIHtcbiAgICAgICAgZmliZXIuYWx0ZXJuYXRlLnVwZGF0ZVF1ZXVlID0gdXBkYXRlUXVldWU7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZUNsYXNzQ29tcG9uZW50KGN1cnJlbnQsIHdvcmtJblByb2dyZXNzKSB7XG4gICAgLy8gQSBjbGFzcyBjb21wb25lbnQgdXBkYXRlIGlzIHRoZSByZXN1bHQgb2YgZWl0aGVyIG5ldyBwcm9wcyBvciBuZXcgc3RhdGUuXG4gICAgLy8gQWNjb3VudCBmb3IgdGhlIHBvc3NpYmx5IG9mIG1pc3NpbmcgcGVuZGluZyBwcm9wcyBieSBmYWxsaW5nIGJhY2sgdG8gdGhlXG4gICAgLy8gbWVtb2l6ZWQgcHJvcHMuXG4gICAgdmFyIHByb3BzID0gd29ya0luUHJvZ3Jlc3MucGVuZGluZ1Byb3BzO1xuICAgIGlmICghcHJvcHMgJiYgY3VycmVudCkge1xuICAgICAgcHJvcHMgPSBjdXJyZW50Lm1lbW9pemVkUHJvcHM7XG4gICAgfVxuICAgIC8vIENvbXB1dGUgdGhlIHN0YXRlIHVzaW5nIHRoZSBtZW1vaXplZCBzdGF0ZSBhbmQgdGhlIHVwZGF0ZSBxdWV1ZS5cbiAgICB2YXIgdXBkYXRlUXVldWUgPSB3b3JrSW5Qcm9ncmVzcy51cGRhdGVRdWV1ZTtcbiAgICB2YXIgcHJldmlvdXNTdGF0ZSA9IGN1cnJlbnQgPyBjdXJyZW50Lm1lbW9pemVkU3RhdGUgOiBudWxsO1xuICAgIHZhciBzdGF0ZSA9IHVwZGF0ZVF1ZXVlID8gbWVyZ2VVcGRhdGVRdWV1ZSh1cGRhdGVRdWV1ZSwgcHJldmlvdXNTdGF0ZSwgcHJvcHMpIDogcHJldmlvdXNTdGF0ZTtcblxuICAgIHZhciBpbnN0YW5jZSA9IHdvcmtJblByb2dyZXNzLnN0YXRlTm9kZTtcbiAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICB2YXIgY3RvciA9IHdvcmtJblByb2dyZXNzLnR5cGU7XG4gICAgICB3b3JrSW5Qcm9ncmVzcy5zdGF0ZU5vZGUgPSBpbnN0YW5jZSA9IG5ldyBjdG9yKHByb3BzKTtcbiAgICAgIHN0YXRlID0gaW5zdGFuY2Uuc3RhdGUgfHwgbnVsbDtcbiAgICAgIC8vIFRoZSBpbml0aWFsIHN0YXRlIG11c3QgYmUgYWRkZWQgdG8gdGhlIHVwZGF0ZSBxdWV1ZSBpbiBjYXNlXG4gICAgICAvLyBzZXRTdGF0ZSBpcyBjYWxsZWQgYmVmb3JlIHRoZSBpbml0aWFsIHJlbmRlci5cbiAgICAgIGlmIChzdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICB3b3JrSW5Qcm9ncmVzcy51cGRhdGVRdWV1ZSA9IGNyZWF0ZVVwZGF0ZVF1ZXVlKHN0YXRlKTtcbiAgICAgIH1cbiAgICAgIC8vIFRoZSBpbnN0YW5jZSBuZWVkcyBhY2Nlc3MgdG8gdGhlIGZpYmVyIHNvIHRoYXQgaXQgY2FuIHNjaGVkdWxlIHVwZGF0ZXNcbiAgICAgIFJlYWN0SW5zdGFuY2VNYXAuc2V0KGluc3RhbmNlLCB3b3JrSW5Qcm9ncmVzcyk7XG4gICAgICBpbnN0YW5jZS51cGRhdGVyID0gdXBkYXRlcjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnN0YW5jZS5zaG91bGRDb21wb25lbnRVcGRhdGUgPT09ICdmdW5jdGlvbicgJiYgISh1cGRhdGVRdWV1ZSAmJiB1cGRhdGVRdWV1ZS5pc0ZvcmNlZCkpIHtcbiAgICAgIGlmICh3b3JrSW5Qcm9ncmVzcy5tZW1vaXplZFByb3BzICE9PSBudWxsKSB7XG4gICAgICAgIC8vIFJlc2V0IHRoZSBwcm9wcywgaW4gY2FzZSB0aGlzIGlzIGEgcGluZy1wb25nIGNhc2UgcmF0aGVyIHRoYW4gYVxuICAgICAgICAvLyBjb21wbGV0ZWQgdXBkYXRlIGNhc2UuIEZvciB0aGUgY29tcGxldGVkIHVwZGF0ZSBjYXNlLCB0aGUgaW5zdGFuY2VcbiAgICAgICAgLy8gcHJvcHMgd2lsbCBhbHJlYWR5IGJlIHRoZSBtZW1vaXplZFByb3BzLlxuICAgICAgICBpbnN0YW5jZS5wcm9wcyA9IHdvcmtJblByb2dyZXNzLm1lbW9pemVkUHJvcHM7XG4gICAgICAgIGluc3RhbmNlLnN0YXRlID0gd29ya0luUHJvZ3Jlc3MubWVtb2l6ZWRTdGF0ZTtcbiAgICAgICAgaWYgKCFpbnN0YW5jZS5zaG91bGRDb21wb25lbnRVcGRhdGUocHJvcHMsIHN0YXRlKSkge1xuICAgICAgICAgIHJldHVybiBiYWlsb3V0T25BbHJlYWR5RmluaXNoZWRXb3JrKGN1cnJlbnQsIHdvcmtJblByb2dyZXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGluc3RhbmNlLnByb3BzID0gcHJvcHM7XG4gICAgaW5zdGFuY2Uuc3RhdGUgPSBzdGF0ZTtcbiAgICB2YXIgbmV4dENoaWxkcmVuID0gaW5zdGFuY2UucmVuZGVyKCk7XG4gICAgcmVjb25jaWxlQ2hpbGRyZW4oY3VycmVudCwgd29ya0luUHJvZ3Jlc3MsIG5leHRDaGlsZHJlbik7XG5cbiAgICByZXR1cm4gd29ya0luUHJvZ3Jlc3MuY2hpbGQ7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVIb3N0Q29tcG9uZW50KGN1cnJlbnQsIHdvcmtJblByb2dyZXNzKSB7XG4gICAgdmFyIG5leHRDaGlsZHJlbiA9IHdvcmtJblByb2dyZXNzLnBlbmRpbmdQcm9wcy5jaGlsZHJlbjtcbiAgICBpZiAod29ya0luUHJvZ3Jlc3MucGVuZGluZ1Byb3BzLmhpZGRlbiAmJiB3b3JrSW5Qcm9ncmVzcy5wZW5kaW5nV29ya1ByaW9yaXR5ICE9PSBPZmZzY3JlZW5Qcmlvcml0eSkge1xuICAgICAgLy8gSWYgdGhpcyBob3N0IGNvbXBvbmVudCBpcyBoaWRkZW4sIHdlIGNhbiBiYWlsIG91dCBvbiB0aGUgY2hpbGRyZW4uXG4gICAgICAvLyBXZSdsbCByZXJlbmRlciB0aGUgY2hpbGRyZW4gbGF0ZXIgYXQgdGhlIGxvd2VyIHByaW9yaXR5LlxuXG4gICAgICAvLyBJdCBpcyB1bmZvcnR1bmF0ZSB0aGF0IHdlIGhhdmUgdG8gZG8gdGhlIHJlY29uY2lsaWF0aW9uIG9mIHRoZXNlXG4gICAgICAvLyBjaGlsZHJlbiBhbHJlYWR5IHNpbmNlIHRoYXQgd2lsbCBhZGQgdGhlbSB0byB0aGUgdHJlZSBldmVuIHRob3VnaFxuICAgICAgLy8gdGhleSBhcmUgbm90IGFjdHVhbGx5IGRvbmUgeWV0LiBJZiB0aGlzIGlzIGEgbGFyZ2Ugc2V0IGl0IGlzIGFsc29cbiAgICAgIC8vIGNvbmZ1c2luZyB0aGF0IHRoaXMgdGFrZXMgdGltZSB0byBkbyByaWdodCBub3cgaW5zdGVhZCBvZiBsYXRlci5cblxuICAgICAgaWYgKHdvcmtJblByb2dyZXNzLnByb2dyZXNzZWRQcmlvcml0eSA9PT0gT2Zmc2NyZWVuUHJpb3JpdHkpIHtcbiAgICAgICAgLy8gSWYgd2UgYWxyZWFkeSBtYWRlIHNvbWUgcHJvZ3Jlc3Mgb24gdGhlIG9mZnNjcmVlbiBwcmlvcml0eSBiZWZvcmUsXG4gICAgICAgIC8vIHRoZW4gd2Ugc2hvdWxkIGNvbnRpbnVlIGZyb20gd2hlcmUgd2UgbGVmdCBvZmYuXG4gICAgICAgIHdvcmtJblByb2dyZXNzLmNoaWxkID0gd29ya0luUHJvZ3Jlc3MucHJvZ3Jlc3NlZENoaWxkO1xuICAgICAgfVxuXG4gICAgICAvLyBSZWNvbmNpbGUgdGhlIGNoaWxkcmVuIGFuZCBzdGFzaCB0aGVtIGZvciBsYXRlciB3b3JrLlxuICAgICAgcmVjb25jaWxlQ2hpbGRyZW5BdFByaW9yaXR5KGN1cnJlbnQsIHdvcmtJblByb2dyZXNzLCBuZXh0Q2hpbGRyZW4sIE9mZnNjcmVlblByaW9yaXR5KTtcbiAgICAgIHdvcmtJblByb2dyZXNzLmNoaWxkID0gY3VycmVudCA/IGN1cnJlbnQuY2hpbGQgOiBudWxsO1xuICAgICAgLy8gQWJvcnQgYW5kIGRvbid0IHByb2Nlc3MgY2hpbGRyZW4geWV0LlxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlY29uY2lsZUNoaWxkcmVuKGN1cnJlbnQsIHdvcmtJblByb2dyZXNzLCBuZXh0Q2hpbGRyZW4pO1xuICAgICAgcmV0dXJuIHdvcmtJblByb2dyZXNzLmNoaWxkO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdW50SW5kZXRlcm1pbmF0ZUNvbXBvbmVudChjdXJyZW50LCB3b3JrSW5Qcm9ncmVzcykge1xuICAgIHZhciBmbiA9IHdvcmtJblByb2dyZXNzLnR5cGU7XG4gICAgdmFyIHByb3BzID0gd29ya0luUHJvZ3Jlc3MucGVuZGluZ1Byb3BzO1xuICAgIHZhciB2YWx1ZSA9IGZuKHByb3BzKTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUucmVuZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBQcm9jZWVkIHVuZGVyIHRoZSBhc3N1bXB0aW9uIHRoYXQgdGhpcyBpcyBhIGNsYXNzIGluc3RhbmNlXG4gICAgICB3b3JrSW5Qcm9ncmVzcy50YWcgPSBDbGFzc0NvbXBvbmVudDtcbiAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgIGN1cnJlbnQudGFnID0gQ2xhc3NDb21wb25lbnQ7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlbmRlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBQcm9jZWVkIHVuZGVyIHRoZSBhc3N1bXB0aW9uIHRoYXQgdGhpcyBpcyBhIGZ1bmN0aW9uYWwgY29tcG9uZW50XG4gICAgICB3b3JrSW5Qcm9ncmVzcy50YWcgPSBGdW5jdGlvbmFsQ29tcG9uZW50O1xuICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgY3VycmVudC50YWcgPSBGdW5jdGlvbmFsQ29tcG9uZW50O1xuICAgICAgfVxuICAgIH1cbiAgICByZWNvbmNpbGVDaGlsZHJlbihjdXJyZW50LCB3b3JrSW5Qcm9ncmVzcywgdmFsdWUpO1xuICAgIHJldHVybiB3b3JrSW5Qcm9ncmVzcy5jaGlsZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUNvcm91dGluZUNvbXBvbmVudChjdXJyZW50LCB3b3JrSW5Qcm9ncmVzcykge1xuICAgIHZhciBjb3JvdXRpbmUgPSB3b3JrSW5Qcm9ncmVzcy5wZW5kaW5nUHJvcHM7XG4gICAgaWYgKCFjb3JvdXRpbmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIGJlIHJlc29sdmVkIGJ5IG5vdycpO1xuICAgIH1cbiAgICByZWNvbmNpbGVDaGlsZHJlbihjdXJyZW50LCB3b3JrSW5Qcm9ncmVzcywgY29yb3V0aW5lLmNoaWxkcmVuKTtcbiAgfVxuXG4gIC8qXG4gIGZ1bmN0aW9uIHJldXNlQ2hpbGRyZW5FZmZlY3RzKHJldHVybkZpYmVyIDogRmliZXIsIGZpcnN0Q2hpbGQgOiBGaWJlcikge1xuICAgIGxldCBjaGlsZCA9IGZpcnN0Q2hpbGQ7XG4gICAgZG8ge1xuICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIGZpcnN0IGFuZCBsYXN0IGVmZmVjdCBvZiB0aGUgcGFyZW50IGNvcnJlc3BvbmRzXG4gICAgICAvLyB0byB0aGUgY2hpbGRyZW4ncyBmaXJzdCBhbmQgbGFzdCBlZmZlY3QuXG4gICAgICBpZiAoIXJldHVybkZpYmVyLmZpcnN0RWZmZWN0KSB7XG4gICAgICAgIHJldHVybkZpYmVyLmZpcnN0RWZmZWN0ID0gY2hpbGQuZmlyc3RFZmZlY3Q7XG4gICAgICB9XG4gICAgICBpZiAoY2hpbGQubGFzdEVmZmVjdCkge1xuICAgICAgICBpZiAocmV0dXJuRmliZXIubGFzdEVmZmVjdCkge1xuICAgICAgICAgIHJldHVybkZpYmVyLmxhc3RFZmZlY3QubmV4dEVmZmVjdCA9IGNoaWxkLmZpcnN0RWZmZWN0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybkZpYmVyLmxhc3RFZmZlY3QgPSBjaGlsZC5sYXN0RWZmZWN0O1xuICAgICAgfVxuICAgIH0gd2hpbGUgKGNoaWxkID0gY2hpbGQuc2libGluZyk7XG4gIH1cbiAgKi9cblxuICBmdW5jdGlvbiBiYWlsb3V0T25BbHJlYWR5RmluaXNoZWRXb3JrKGN1cnJlbnQsIHdvcmtJblByb2dyZXNzKSB7XG4gICAgdmFyIHByaW9yaXR5TGV2ZWwgPSB3b3JrSW5Qcm9ncmVzcy5wZW5kaW5nV29ya1ByaW9yaXR5O1xuXG4gICAgLy8gVE9ETzogV2Ugc2hvdWxkIGlkZWFsbHkgYmUgYWJsZSB0byBiYWlsIG91dCBlYXJseSBpZiB0aGUgY2hpbGRyZW4gaGF2ZSBub1xuICAgIC8vIG1vcmUgd29yayB0byBkby4gSG93ZXZlciwgc2luY2Ugd2UgZG9uJ3QgaGF2ZSBhIHNlcGFyYXRpb24gb2YgdGhpc1xuICAgIC8vIEZpYmVyJ3MgcHJpb3JpdHkgYW5kIGl0cyBjaGlsZHJlbiB5ZXQgLSB3ZSBkb24ndCBrbm93IHdpdGhvdXQgZG9pbmcgbG90c1xuICAgIC8vIG9mIHRoZSBzYW1lIHdvcmsgd2UgZG8gYW55d2F5LiBPbmNlIHdlIGhhdmUgdGhhdCBzZXBhcmF0aW9uIHdlIGNhbiBqdXN0XG4gICAgLy8gYmFpbCBvdXQgaGVyZSBpZiB0aGUgY2hpbGRyZW4gaGFzIG5vIG1vcmUgd29yayBhdCB0aGlzIHByaW9yaXR5IGxldmVsLlxuICAgIC8vIGlmICh3b3JrSW5Qcm9ncmVzcy5wcmlvcml0eU9mQ2hpbGRyZW4gPD0gcHJpb3JpdHlMZXZlbCkge1xuICAgIC8vICAgLy8gSWYgdGhlcmUgYXJlIHNpZGUtZWZmZWN0cyBpbiB0aGVzZSBjaGlsZHJlbiB0aGF0IGhhdmUgbm90IHlldCBiZWVuXG4gICAgLy8gICAvLyBjb21taXR0ZWQgd2UgbmVlZCB0byBlbnN1cmUgdGhhdCB0aGV5IGdldCBwcm9wZXJseSB0cmFuc2ZlcnJlZCB1cC5cbiAgICAvLyAgIGlmIChjdXJyZW50ICYmIGN1cnJlbnQuY2hpbGQgIT09IHdvcmtJblByb2dyZXNzLmNoaWxkKSB7XG4gICAgLy8gICAgIHJldXNlQ2hpbGRyZW5FZmZlY3RzKHdvcmtJblByb2dyZXNzLCBjaGlsZCk7XG4gICAgLy8gICB9XG4gICAgLy8gICByZXR1cm4gbnVsbDtcbiAgICAvLyB9XG5cbiAgICBjbG9uZUNoaWxkRmliZXJzKGN1cnJlbnQsIHdvcmtJblByb2dyZXNzKTtcbiAgICBtYXJrQ2hpbGRBc1Byb2dyZXNzZWQoY3VycmVudCwgd29ya0luUHJvZ3Jlc3MsIHByaW9yaXR5TGV2ZWwpO1xuICAgIHJldHVybiB3b3JrSW5Qcm9ncmVzcy5jaGlsZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJhaWxvdXRPbkxvd1ByaW9yaXR5KGN1cnJlbnQsIHdvcmtJblByb2dyZXNzKSB7XG4gICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgIHdvcmtJblByb2dyZXNzLmNoaWxkID0gY3VycmVudC5jaGlsZDtcbiAgICAgIHdvcmtJblByb2dyZXNzLm1lbW9pemVkUHJvcHMgPSBjdXJyZW50Lm1lbW9pemVkUHJvcHM7XG4gICAgICB3b3JrSW5Qcm9ncmVzcy5vdXRwdXQgPSBjdXJyZW50Lm91dHB1dDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBiZWdpbldvcmsoY3VycmVudCwgd29ya0luUHJvZ3Jlc3MsIHByaW9yaXR5TGV2ZWwpIHtcbiAgICBpZiAod29ya0luUHJvZ3Jlc3MucGVuZGluZ1dvcmtQcmlvcml0eSA9PT0gTm9Xb3JrIHx8IHdvcmtJblByb2dyZXNzLnBlbmRpbmdXb3JrUHJpb3JpdHkgPiBwcmlvcml0eUxldmVsKSB7XG4gICAgICByZXR1cm4gYmFpbG91dE9uTG93UHJpb3JpdHkoY3VycmVudCwgd29ya0luUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmICh3b3JrSW5Qcm9ncmVzcy5wcm9ncmVzc2VkUHJpb3JpdHkgPT09IHByaW9yaXR5TGV2ZWwpIHtcbiAgICAgIC8vIElmIHdlIGhhdmUgcHJvZ3Jlc3NlZCB3b3JrIG9uIHRoaXMgcHJpb3JpdHkgbGV2ZWwgYWxyZWFkeSwgd2UgY2FuXG4gICAgICAvLyBwcm9jZWVkIHRoaXMgdGhhdCBhcyB0aGUgY2hpbGQuXG4gICAgICB3b3JrSW5Qcm9ncmVzcy5jaGlsZCA9IHdvcmtJblByb2dyZXNzLnByb2dyZXNzZWRDaGlsZDtcbiAgICB9XG5cbiAgICBpZiAoKHdvcmtJblByb2dyZXNzLnBlbmRpbmdQcm9wcyA9PT0gbnVsbCB8fCB3b3JrSW5Qcm9ncmVzcy5tZW1vaXplZFByb3BzICE9PSBudWxsICYmIHdvcmtJblByb2dyZXNzLnBlbmRpbmdQcm9wcyA9PT0gd29ya0luUHJvZ3Jlc3MubWVtb2l6ZWRQcm9wcykgJiYgd29ya0luUHJvZ3Jlc3MudXBkYXRlUXVldWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBiYWlsb3V0T25BbHJlYWR5RmluaXNoZWRXb3JrKGN1cnJlbnQsIHdvcmtJblByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHdvcmtJblByb2dyZXNzLnRhZykge1xuICAgICAgY2FzZSBJbmRldGVybWluYXRlQ29tcG9uZW50OlxuICAgICAgICByZXR1cm4gbW91bnRJbmRldGVybWluYXRlQ29tcG9uZW50KGN1cnJlbnQsIHdvcmtJblByb2dyZXNzKTtcbiAgICAgIGNhc2UgRnVuY3Rpb25hbENvbXBvbmVudDpcbiAgICAgICAgcmV0dXJuIHVwZGF0ZUZ1bmN0aW9uYWxDb21wb25lbnQoY3VycmVudCwgd29ya0luUHJvZ3Jlc3MpO1xuICAgICAgY2FzZSBDbGFzc0NvbXBvbmVudDpcbiAgICAgICAgcmV0dXJuIHVwZGF0ZUNsYXNzQ29tcG9uZW50KGN1cnJlbnQsIHdvcmtJblByb2dyZXNzKTtcbiAgICAgIGNhc2UgSG9zdENvbnRhaW5lcjpcbiAgICAgICAgcmVjb25jaWxlQ2hpbGRyZW4oY3VycmVudCwgd29ya0luUHJvZ3Jlc3MsIHdvcmtJblByb2dyZXNzLnBlbmRpbmdQcm9wcyk7XG4gICAgICAgIC8vIEEgeWllbGQgY29tcG9uZW50IGlzIGp1c3QgYSBwbGFjZWhvbGRlciwgd2UgY2FuIGp1c3QgcnVuIHRocm91Z2ggdGhlXG4gICAgICAgIC8vIG5leHQgb25lIGltbWVkaWF0ZWx5LlxuICAgICAgICBpZiAod29ya0luUHJvZ3Jlc3MuY2hpbGQpIHtcbiAgICAgICAgICByZXR1cm4gYmVnaW5Xb3JrKHdvcmtJblByb2dyZXNzLmNoaWxkLmFsdGVybmF0ZSwgd29ya0luUHJvZ3Jlc3MuY2hpbGQsIHByaW9yaXR5TGV2ZWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgY2FzZSBIb3N0Q29tcG9uZW50OlxuICAgICAgICBpZiAod29ya0luUHJvZ3Jlc3Muc3RhdGVOb2RlICYmIGNvbmZpZy5iZWdpblVwZGF0ZSkge1xuICAgICAgICAgIGNvbmZpZy5iZWdpblVwZGF0ZSh3b3JrSW5Qcm9ncmVzcy5zdGF0ZU5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cGRhdGVIb3N0Q29tcG9uZW50KGN1cnJlbnQsIHdvcmtJblByb2dyZXNzKTtcbiAgICAgIGNhc2UgQ29yb3V0aW5lSGFuZGxlclBoYXNlOlxuICAgICAgICAvLyBUaGlzIGlzIGEgcmVzdGFydC4gUmVzZXQgdGhlIHRhZyB0byB0aGUgaW5pdGlhbCBwaGFzZS5cbiAgICAgICAgd29ya0luUHJvZ3Jlc3MudGFnID0gQ29yb3V0aW5lQ29tcG9uZW50O1xuICAgICAgLy8gSW50ZW50aW9uYWxseSBmYWxsIHRocm91Z2ggc2luY2UgdGhpcyBpcyBub3cgdGhlIHNhbWUuXG4gICAgICBjYXNlIENvcm91dGluZUNvbXBvbmVudDpcbiAgICAgICAgdXBkYXRlQ29yb3V0aW5lQ29tcG9uZW50KGN1cnJlbnQsIHdvcmtJblByb2dyZXNzKTtcbiAgICAgICAgLy8gVGhpcyBkb2Vzbid0IHRha2UgYXJiaXRyYXJ5IHRpbWUgc28gd2UgY291bGQgc3luY2hyb25vdXNseSBqdXN0IGJlZ2luXG4gICAgICAgIC8vIGVhZ2VybHkgZG8gdGhlIHdvcmsgb2Ygd29ya0luUHJvZ3Jlc3MuY2hpbGQgYXMgYW4gb3B0aW1pemF0aW9uLlxuICAgICAgICBpZiAod29ya0luUHJvZ3Jlc3MuY2hpbGQpIHtcbiAgICAgICAgICByZXR1cm4gYmVnaW5Xb3JrKHdvcmtJblByb2dyZXNzLmNoaWxkLmFsdGVybmF0ZSwgd29ya0luUHJvZ3Jlc3MuY2hpbGQsIHByaW9yaXR5TGV2ZWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3b3JrSW5Qcm9ncmVzcy5jaGlsZDtcbiAgICAgIGNhc2UgWWllbGRDb21wb25lbnQ6XG4gICAgICAgIC8vIEEgeWllbGQgY29tcG9uZW50IGlzIGp1c3QgYSBwbGFjZWhvbGRlciwgd2UgY2FuIGp1c3QgcnVuIHRocm91Z2ggdGhlXG4gICAgICAgIC8vIG5leHQgb25lIGltbWVkaWF0ZWx5LlxuICAgICAgICBpZiAod29ya0luUHJvZ3Jlc3Muc2libGluZykge1xuICAgICAgICAgIHJldHVybiBiZWdpbldvcmsod29ya0luUHJvZ3Jlc3Muc2libGluZy5hbHRlcm5hdGUsIHdvcmtJblByb2dyZXNzLnNpYmxpbmcsIHByaW9yaXR5TGV2ZWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHVuaXQgb2Ygd29yayB0YWcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJlZ2luV29yazogYmVnaW5Xb3JrXG4gIH07XG59OyJdfQ==