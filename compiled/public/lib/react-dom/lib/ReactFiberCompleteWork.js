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

var _require = require('./ReactChildFiber'),
    reconcileChildFibers = _require.reconcileChildFibers;

var ReactTypeOfWork = require('./ReactTypeOfWork');
var IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent,
    FunctionalComponent = ReactTypeOfWork.FunctionalComponent,
    ClassComponent = ReactTypeOfWork.ClassComponent,
    HostContainer = ReactTypeOfWork.HostContainer,
    HostComponent = ReactTypeOfWork.HostComponent,
    CoroutineComponent = ReactTypeOfWork.CoroutineComponent,
    CoroutineHandlerPhase = ReactTypeOfWork.CoroutineHandlerPhase,
    YieldComponent = ReactTypeOfWork.YieldComponent;

module.exports = function (config) {

  var createInstance = config.createInstance;
  var prepareUpdate = config.prepareUpdate;

  function markForPreEffect(workInProgress) {
    // Schedule a side-effect on this fiber, BEFORE the children's side-effects.
    if (workInProgress.firstEffect) {
      workInProgress.nextEffect = workInProgress.firstEffect;
      workInProgress.firstEffect = workInProgress;
    } else {
      workInProgress.firstEffect = workInProgress;
      workInProgress.lastEffect = workInProgress;
    }
  }

  // TODO: It's possible this will create layout thrash issues because mutations
  // of the DOM and life-cycles are interleaved. E.g. if a componentDidMount
  // of a sibling reads, then the next sibling updates and reads etc.
  function markForPostEffect(workInProgress) {
    // Schedule a side-effect on this fiber, AFTER the children's side-effects.
    if (workInProgress.lastEffect) {
      workInProgress.lastEffect.nextEffect = workInProgress;
    } else {
      workInProgress.firstEffect = workInProgress;
    }
    workInProgress.lastEffect = workInProgress;
  }

  function transferOutput(child, returnFiber) {
    // If we have a single result, we just pass that through as the output to
    // avoid unnecessary traversal. When we have multiple output, we just pass
    // the linked list of fibers that has the individual output values.
    returnFiber.output = child && !child.sibling ? child.output : child;
    returnFiber.memoizedProps = returnFiber.pendingProps;
  }

  function recursivelyFillYields(yields, output) {
    if (!output) {
      // Ignore nulls etc.
    } else if (output.tag !== undefined) {
      // TODO: Fix this fragile duck test.
      // Detect if this is a fiber, if so it is a fragment result.
      // $FlowFixMe: Refinement issue.
      var item = output;
      do {
        recursivelyFillYields(yields, item.output);
        item = item.sibling;
      } while (item);
    } else {
      // $FlowFixMe: Refinement issue. If it is not a Fiber or null, it is a yield
      yields.push(output);
    }
  }

  function moveCoroutineToHandlerPhase(current, workInProgress) {
    var coroutine = workInProgress.pendingProps;
    if (!coroutine) {
      throw new Error('Should be resolved by now');
    }

    // First step of the coroutine has completed. Now we need to do the second.
    // TODO: It would be nice to have a multi stage coroutine represented by a
    // single component, or at least tail call optimize nested ones. Currently
    // that requires additional fields that we don't want to add to the fiber.
    // So this requires nested handlers.
    // Note: This doesn't mutate the alternate node. I don't think it needs to
    // since this stage is reset for every pass.
    workInProgress.tag = CoroutineHandlerPhase;

    // Build up the yields.
    // TODO: Compare this to a generator or opaque helpers like Children.
    var yields = [];
    var child = workInProgress.child;
    while (child) {
      recursivelyFillYields(yields, child.output);
      child = child.sibling;
    }
    var fn = coroutine.handler;
    var props = coroutine.props;
    var nextChildren = fn(props, yields);

    var currentFirstChild = current ? current.stateNode : null;
    // Inherit the priority of the returnFiber.
    var priority = workInProgress.pendingWorkPriority;
    workInProgress.stateNode = reconcileChildFibers(workInProgress, currentFirstChild, nextChildren, priority);
    return workInProgress.stateNode;
  }

  function completeWork(current, workInProgress) {
    switch (workInProgress.tag) {
      case FunctionalComponent:
        transferOutput(workInProgress.child, workInProgress);
        return null;
      case ClassComponent:
        transferOutput(workInProgress.child, workInProgress);
        // Don't use the state queue to compute the memoized state. We already
        // merged it and assigned it to the instance. Transfer it from there.
        // Also need to transfer the props, because pendingProps will be null
        // in the case of an update
        var _workInProgress$state = workInProgress.stateNode,
            state = _workInProgress$state.state,
            props = _workInProgress$state.props;

        workInProgress.memoizedState = state;
        workInProgress.memoizedProps = props;
        // Transfer update queue to callbackList field so callbacks can be
        // called during commit phase.
        workInProgress.callbackList = workInProgress.updateQueue;
        markForPostEffect(workInProgress);
        return null;
      case HostContainer:
        transferOutput(workInProgress.child, workInProgress);
        // We don't know if a container has updated any children so we always
        // need to update it right now. We schedule this side-effect before
        // all the other side-effects in the subtree. We need to schedule it
        // before so that the entire tree is up-to-date before the life-cycles
        // are invoked.
        markForPreEffect(workInProgress);
        return null;
      case HostComponent:
        var newProps = workInProgress.pendingProps;
        var child = workInProgress.child;
        var children = child && !child.sibling ? child.output : child;
        if (current && workInProgress.stateNode != null) {
          // If we have an alternate, that means this is an update and we need to
          // schedule a side-effect to do the updates.
          var oldProps = current.memoizedProps;
          // If we get updated because one of our children updated, we don't
          // have newProps so we'll have to reuse them.
          // TODO: Split the update API as separate for the props vs. children.
          // Even better would be if children weren't special cased at all tho.
          if (!newProps) {
            newProps = oldProps;
          }
          var instance = workInProgress.stateNode;
          if (prepareUpdate(instance, oldProps, newProps, children)) {
            // This returns true if there was something to update.
            markForPreEffect(workInProgress);
          }
          // TODO: Is this actually ever going to change? Why set it every time?
          workInProgress.output = instance;
        } else {
          if (!newProps) {
            if (workInProgress.stateNode === null) {
              throw new Error('We must have new props for new mounts.');
            } else {
              // This can happen when we abort work.
              return null;
            }
          }
          var _instance = createInstance(workInProgress.type, newProps, children);
          // TODO: This seems like unnecessary duplication.
          workInProgress.stateNode = _instance;
          workInProgress.output = _instance;
        }
        workInProgress.memoizedProps = newProps;
        return null;
      case CoroutineComponent:
        return moveCoroutineToHandlerPhase(current, workInProgress);
      case CoroutineHandlerPhase:
        transferOutput(workInProgress.stateNode, workInProgress);
        // Reset the tag to now be a first phase coroutine.
        workInProgress.tag = CoroutineComponent;
        return null;
      case YieldComponent:
        // Does nothing.
        return null;

      // Error cases
      case IndeterminateComponent:
        throw new Error('An indeterminate component should have become determinate before completing.');
      default:
        throw new Error('Unknown unit of work tag');
    }
  }

  return {
    completeWork: completeWork
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdEZpYmVyQ29tcGxldGVXb3JrLmpzIl0sIm5hbWVzIjpbIl9yZXF1aXJlIiwicmVxdWlyZSIsInJlY29uY2lsZUNoaWxkRmliZXJzIiwiUmVhY3RUeXBlT2ZXb3JrIiwiSW5kZXRlcm1pbmF0ZUNvbXBvbmVudCIsIkZ1bmN0aW9uYWxDb21wb25lbnQiLCJDbGFzc0NvbXBvbmVudCIsIkhvc3RDb250YWluZXIiLCJIb3N0Q29tcG9uZW50IiwiQ29yb3V0aW5lQ29tcG9uZW50IiwiQ29yb3V0aW5lSGFuZGxlclBoYXNlIiwiWWllbGRDb21wb25lbnQiLCJtb2R1bGUiLCJleHBvcnRzIiwiY29uZmlnIiwiY3JlYXRlSW5zdGFuY2UiLCJwcmVwYXJlVXBkYXRlIiwibWFya0ZvclByZUVmZmVjdCIsIndvcmtJblByb2dyZXNzIiwiZmlyc3RFZmZlY3QiLCJuZXh0RWZmZWN0IiwibGFzdEVmZmVjdCIsIm1hcmtGb3JQb3N0RWZmZWN0IiwidHJhbnNmZXJPdXRwdXQiLCJjaGlsZCIsInJldHVybkZpYmVyIiwib3V0cHV0Iiwic2libGluZyIsIm1lbW9pemVkUHJvcHMiLCJwZW5kaW5nUHJvcHMiLCJyZWN1cnNpdmVseUZpbGxZaWVsZHMiLCJ5aWVsZHMiLCJ0YWciLCJ1bmRlZmluZWQiLCJpdGVtIiwicHVzaCIsIm1vdmVDb3JvdXRpbmVUb0hhbmRsZXJQaGFzZSIsImN1cnJlbnQiLCJjb3JvdXRpbmUiLCJFcnJvciIsImZuIiwiaGFuZGxlciIsInByb3BzIiwibmV4dENoaWxkcmVuIiwiY3VycmVudEZpcnN0Q2hpbGQiLCJzdGF0ZU5vZGUiLCJwcmlvcml0eSIsInBlbmRpbmdXb3JrUHJpb3JpdHkiLCJjb21wbGV0ZVdvcmsiLCJfd29ya0luUHJvZ3Jlc3Mkc3RhdGUiLCJzdGF0ZSIsIm1lbW9pemVkU3RhdGUiLCJjYWxsYmFja0xpc3QiLCJ1cGRhdGVRdWV1ZSIsIm5ld1Byb3BzIiwi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LEdBQStCMEIsUUFBL0I7QUFDQSxlQUFPLElBQVA7QUFDRixXQUFLN0Msa0JBQUw7QUFDRSxlQUFPMkIsNEJBQTRCQyxPQUE1QixFQUFxQ25CLGNBQXJDLENBQVA7QUFDRixXQUFLUixxQkFBTDtBQUNFYSx1QkFBZUwsZUFBZTJCLFNBQTlCLEVBQXlDM0IsY0FBekM7QUFDQTtBQUNBQSx1QkFBZWMsR0FBZixHQUFxQnZCLGtCQUFyQjtBQUNBLGVBQU8sSUFBUDtBQUNGLFdBQUtFLGNBQUw7QUFDRTtBQUNBLGVBQU8sSUFBUDs7QUFFRjtBQUNBLFdBQUtQLHNCQUFMO0FBQ0UsY0FBTSxJQUFJbUMsS0FBSixDQUFVLDhFQUFWLENBQU47QUFDRjtBQUNFLGNBQU0sSUFBSUEsS0FBSixDQUFVLDBCQUFWLENBQU47QUFuRko7QUFxRkQ7O0FBRUQsU0FBTztBQUNMUyxrQkFBY0E7QUFEVCxHQUFQO0FBR0QsQ0FwTEQiLCJmaWxlIjoiUmVhY3RGaWJlckNvbXBsZXRlV29yay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi9SZWFjdENoaWxkRmliZXInKSxcbiAgICByZWNvbmNpbGVDaGlsZEZpYmVycyA9IF9yZXF1aXJlLnJlY29uY2lsZUNoaWxkRmliZXJzO1xuXG52YXIgUmVhY3RUeXBlT2ZXb3JrID0gcmVxdWlyZSgnLi9SZWFjdFR5cGVPZldvcmsnKTtcbnZhciBJbmRldGVybWluYXRlQ29tcG9uZW50ID0gUmVhY3RUeXBlT2ZXb3JrLkluZGV0ZXJtaW5hdGVDb21wb25lbnQsXG4gICAgRnVuY3Rpb25hbENvbXBvbmVudCA9IFJlYWN0VHlwZU9mV29yay5GdW5jdGlvbmFsQ29tcG9uZW50LFxuICAgIENsYXNzQ29tcG9uZW50ID0gUmVhY3RUeXBlT2ZXb3JrLkNsYXNzQ29tcG9uZW50LFxuICAgIEhvc3RDb250YWluZXIgPSBSZWFjdFR5cGVPZldvcmsuSG9zdENvbnRhaW5lcixcbiAgICBIb3N0Q29tcG9uZW50ID0gUmVhY3RUeXBlT2ZXb3JrLkhvc3RDb21wb25lbnQsXG4gICAgQ29yb3V0aW5lQ29tcG9uZW50ID0gUmVhY3RUeXBlT2ZXb3JrLkNvcm91dGluZUNvbXBvbmVudCxcbiAgICBDb3JvdXRpbmVIYW5kbGVyUGhhc2UgPSBSZWFjdFR5cGVPZldvcmsuQ29yb3V0aW5lSGFuZGxlclBoYXNlLFxuICAgIFlpZWxkQ29tcG9uZW50ID0gUmVhY3RUeXBlT2ZXb3JrLllpZWxkQ29tcG9uZW50O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNvbmZpZykge1xuXG4gIHZhciBjcmVhdGVJbnN0YW5jZSA9IGNvbmZpZy5jcmVhdGVJbnN0YW5jZTtcbiAgdmFyIHByZXBhcmVVcGRhdGUgPSBjb25maWcucHJlcGFyZVVwZGF0ZTtcblxuICBmdW5jdGlvbiBtYXJrRm9yUHJlRWZmZWN0KHdvcmtJblByb2dyZXNzKSB7XG4gICAgLy8gU2NoZWR1bGUgYSBzaWRlLWVmZmVjdCBvbiB0aGlzIGZpYmVyLCBCRUZPUkUgdGhlIGNoaWxkcmVuJ3Mgc2lkZS1lZmZlY3RzLlxuICAgIGlmICh3b3JrSW5Qcm9ncmVzcy5maXJzdEVmZmVjdCkge1xuICAgICAgd29ya0luUHJvZ3Jlc3MubmV4dEVmZmVjdCA9IHdvcmtJblByb2dyZXNzLmZpcnN0RWZmZWN0O1xuICAgICAgd29ya0luUHJvZ3Jlc3MuZmlyc3RFZmZlY3QgPSB3b3JrSW5Qcm9ncmVzcztcbiAgICB9IGVsc2Uge1xuICAgICAgd29ya0luUHJvZ3Jlc3MuZmlyc3RFZmZlY3QgPSB3b3JrSW5Qcm9ncmVzcztcbiAgICAgIHdvcmtJblByb2dyZXNzLmxhc3RFZmZlY3QgPSB3b3JrSW5Qcm9ncmVzcztcbiAgICB9XG4gIH1cblxuICAvLyBUT0RPOiBJdCdzIHBvc3NpYmxlIHRoaXMgd2lsbCBjcmVhdGUgbGF5b3V0IHRocmFzaCBpc3N1ZXMgYmVjYXVzZSBtdXRhdGlvbnNcbiAgLy8gb2YgdGhlIERPTSBhbmQgbGlmZS1jeWNsZXMgYXJlIGludGVybGVhdmVkLiBFLmcuIGlmIGEgY29tcG9uZW50RGlkTW91bnRcbiAgLy8gb2YgYSBzaWJsaW5nIHJlYWRzLCB0aGVuIHRoZSBuZXh0IHNpYmxpbmcgdXBkYXRlcyBhbmQgcmVhZHMgZXRjLlxuICBmdW5jdGlvbiBtYXJrRm9yUG9zdEVmZmVjdCh3b3JrSW5Qcm9ncmVzcykge1xuICAgIC8vIFNjaGVkdWxlIGEgc2lkZS1lZmZlY3Qgb24gdGhpcyBmaWJlciwgQUZURVIgdGhlIGNoaWxkcmVuJ3Mgc2lkZS1lZmZlY3RzLlxuICAgIGlmICh3b3JrSW5Qcm9ncmVzcy5sYXN0RWZmZWN0KSB7XG4gICAgICB3b3JrSW5Qcm9ncmVzcy5sYXN0RWZmZWN0Lm5leHRFZmZlY3QgPSB3b3JrSW5Qcm9ncmVzcztcbiAgICB9IGVsc2Uge1xuICAgICAgd29ya0luUHJvZ3Jlc3MuZmlyc3RFZmZlY3QgPSB3b3JrSW5Qcm9ncmVzcztcbiAgICB9XG4gICAgd29ya0luUHJvZ3Jlc3MubGFzdEVmZmVjdCA9IHdvcmtJblByb2dyZXNzO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNmZXJPdXRwdXQoY2hpbGQsIHJldHVybkZpYmVyKSB7XG4gICAgLy8gSWYgd2UgaGF2ZSBhIHNpbmdsZSByZXN1bHQsIHdlIGp1c3QgcGFzcyB0aGF0IHRocm91Z2ggYXMgdGhlIG91dHB1dCB0b1xuICAgIC8vIGF2b2lkIHVubmVjZXNzYXJ5IHRyYXZlcnNhbC4gV2hlbiB3ZSBoYXZlIG11bHRpcGxlIG91dHB1dCwgd2UganVzdCBwYXNzXG4gICAgLy8gdGhlIGxpbmtlZCBsaXN0IG9mIGZpYmVycyB0aGF0IGhhcyB0aGUgaW5kaXZpZHVhbCBvdXRwdXQgdmFsdWVzLlxuICAgIHJldHVybkZpYmVyLm91dHB1dCA9IGNoaWxkICYmICFjaGlsZC5zaWJsaW5nID8gY2hpbGQub3V0cHV0IDogY2hpbGQ7XG4gICAgcmV0dXJuRmliZXIubWVtb2l6ZWRQcm9wcyA9IHJldHVybkZpYmVyLnBlbmRpbmdQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY3Vyc2l2ZWx5RmlsbFlpZWxkcyh5aWVsZHMsIG91dHB1dCkge1xuICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAvLyBJZ25vcmUgbnVsbHMgZXRjLlxuICAgIH0gZWxzZSBpZiAob3V0cHV0LnRhZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBUT0RPOiBGaXggdGhpcyBmcmFnaWxlIGR1Y2sgdGVzdC5cbiAgICAgIC8vIERldGVjdCBpZiB0aGlzIGlzIGEgZmliZXIsIGlmIHNvIGl0IGlzIGEgZnJhZ21lbnQgcmVzdWx0LlxuICAgICAgLy8gJEZsb3dGaXhNZTogUmVmaW5lbWVudCBpc3N1ZS5cbiAgICAgIHZhciBpdGVtID0gb3V0cHV0O1xuICAgICAgZG8ge1xuICAgICAgICByZWN1cnNpdmVseUZpbGxZaWVsZHMoeWllbGRzLCBpdGVtLm91dHB1dCk7XG4gICAgICAgIGl0ZW0gPSBpdGVtLnNpYmxpbmc7XG4gICAgICB9IHdoaWxlIChpdGVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gJEZsb3dGaXhNZTogUmVmaW5lbWVudCBpc3N1ZS4gSWYgaXQgaXMgbm90IGEgRmliZXIgb3IgbnVsbCwgaXQgaXMgYSB5aWVsZFxuICAgICAgeWllbGRzLnB1c2gob3V0cHV0KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlQ29yb3V0aW5lVG9IYW5kbGVyUGhhc2UoY3VycmVudCwgd29ya0luUHJvZ3Jlc3MpIHtcbiAgICB2YXIgY29yb3V0aW5lID0gd29ya0luUHJvZ3Jlc3MucGVuZGluZ1Byb3BzO1xuICAgIGlmICghY29yb3V0aW5lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBiZSByZXNvbHZlZCBieSBub3cnKTtcbiAgICB9XG5cbiAgICAvLyBGaXJzdCBzdGVwIG9mIHRoZSBjb3JvdXRpbmUgaGFzIGNvbXBsZXRlZC4gTm93IHdlIG5lZWQgdG8gZG8gdGhlIHNlY29uZC5cbiAgICAvLyBUT0RPOiBJdCB3b3VsZCBiZSBuaWNlIHRvIGhhdmUgYSBtdWx0aSBzdGFnZSBjb3JvdXRpbmUgcmVwcmVzZW50ZWQgYnkgYVxuICAgIC8vIHNpbmdsZSBjb21wb25lbnQsIG9yIGF0IGxlYXN0IHRhaWwgY2FsbCBvcHRpbWl6ZSBuZXN0ZWQgb25lcy4gQ3VycmVudGx5XG4gICAgLy8gdGhhdCByZXF1aXJlcyBhZGRpdGlvbmFsIGZpZWxkcyB0aGF0IHdlIGRvbid0IHdhbnQgdG8gYWRkIHRvIHRoZSBmaWJlci5cbiAgICAvLyBTbyB0aGlzIHJlcXVpcmVzIG5lc3RlZCBoYW5kbGVycy5cbiAgICAvLyBOb3RlOiBUaGlzIGRvZXNuJ3QgbXV0YXRlIHRoZSBhbHRlcm5hdGUgbm9kZS4gSSBkb24ndCB0aGluayBpdCBuZWVkcyB0b1xuICAgIC8vIHNpbmNlIHRoaXMgc3RhZ2UgaXMgcmVzZXQgZm9yIGV2ZXJ5IHBhc3MuXG4gICAgd29ya0luUHJvZ3Jlc3MudGFnID0gQ29yb3V0aW5lSGFuZGxlclBoYXNlO1xuXG4gICAgLy8gQnVpbGQgdXAgdGhlIHlpZWxkcy5cbiAgICAvLyBUT0RPOiBDb21wYXJlIHRoaXMgdG8gYSBnZW5lcmF0b3Igb3Igb3BhcXVlIGhlbHBlcnMgbGlrZSBDaGlsZHJlbi5cbiAgICB2YXIgeWllbGRzID0gW107XG4gICAgdmFyIGNoaWxkID0gd29ya0luUHJvZ3Jlc3MuY2hpbGQ7XG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICByZWN1cnNpdmVseUZpbGxZaWVsZHMoeWllbGRzLCBjaGlsZC5vdXRwdXQpO1xuICAgICAgY2hpbGQgPSBjaGlsZC5zaWJsaW5nO1xuICAgIH1cbiAgICB2YXIgZm4gPSBjb3JvdXRpbmUuaGFuZGxlcjtcbiAgICB2YXIgcHJvcHMgPSBjb3JvdXRpbmUucHJvcHM7XG4gICAgdmFyIG5leHRDaGlsZHJlbiA9IGZuKHByb3BzLCB5aWVsZHMpO1xuXG4gICAgdmFyIGN1cnJlbnRGaXJzdENoaWxkID0gY3VycmVudCA/IGN1cnJlbnQuc3RhdGVOb2RlIDogbnVsbDtcbiAgICAvLyBJbmhlcml0IHRoZSBwcmlvcml0eSBvZiB0aGUgcmV0dXJuRmliZXIuXG4gICAgdmFyIHByaW9yaXR5ID0gd29ya0luUHJvZ3Jlc3MucGVuZGluZ1dvcmtQcmlvcml0eTtcbiAgICB3b3JrSW5Qcm9ncmVzcy5zdGF0ZU5vZGUgPSByZWNvbmNpbGVDaGlsZEZpYmVycyh3b3JrSW5Qcm9ncmVzcywgY3VycmVudEZpcnN0Q2hpbGQsIG5leHRDaGlsZHJlbiwgcHJpb3JpdHkpO1xuICAgIHJldHVybiB3b3JrSW5Qcm9ncmVzcy5zdGF0ZU5vZGU7XG4gIH1cblxuICBmdW5jdGlvbiBjb21wbGV0ZVdvcmsoY3VycmVudCwgd29ya0luUHJvZ3Jlc3MpIHtcbiAgICBzd2l0Y2ggKHdvcmtJblByb2dyZXNzLnRhZykge1xuICAgICAgY2FzZSBGdW5jdGlvbmFsQ29tcG9uZW50OlxuICAgICAgICB0cmFuc2Zlck91dHB1dCh3b3JrSW5Qcm9ncmVzcy5jaGlsZCwgd29ya0luUHJvZ3Jlc3MpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIGNhc2UgQ2xhc3NDb21wb25lbnQ6XG4gICAgICAgIHRyYW5zZmVyT3V0cHV0KHdvcmtJblByb2dyZXNzLmNoaWxkLCB3b3JrSW5Qcm9ncmVzcyk7XG4gICAgICAgIC8vIERvbid0IHVzZSB0aGUgc3RhdGUgcXVldWUgdG8gY29tcHV0ZSB0aGUgbWVtb2l6ZWQgc3RhdGUuIFdlIGFscmVhZHlcbiAgICAgICAgLy8gbWVyZ2VkIGl0IGFuZCBhc3NpZ25lZCBpdCB0byB0aGUgaW5zdGFuY2UuIFRyYW5zZmVyIGl0IGZyb20gdGhlcmUuXG4gICAgICAgIC8vIEFsc28gbmVlZCB0byB0cmFuc2ZlciB0aGUgcHJvcHMsIGJlY2F1c2UgcGVuZGluZ1Byb3BzIHdpbGwgYmUgbnVsbFxuICAgICAgICAvLyBpbiB0aGUgY2FzZSBvZiBhbiB1cGRhdGVcbiAgICAgICAgdmFyIF93b3JrSW5Qcm9ncmVzcyRzdGF0ZSA9IHdvcmtJblByb2dyZXNzLnN0YXRlTm9kZSxcbiAgICAgICAgICAgIHN0YXRlID0gX3dvcmtJblByb2dyZXNzJHN0YXRlLnN0YXRlLFxuICAgICAgICAgICAgcHJvcHMgPSBfd29ya0luUHJvZ3Jlc3Mkc3RhdGUucHJvcHM7XG5cbiAgICAgICAgd29ya0luUHJvZ3Jlc3MubWVtb2l6ZWRTdGF0ZSA9IHN0YXRlO1xuICAgICAgICB3b3JrSW5Qcm9ncmVzcy5tZW1vaXplZFByb3BzID0gcHJvcHM7XG4gICAgICAgIC8vIFRyYW5zZmVyIHVwZGF0ZSBxdWV1ZSB0byBjYWxsYmFja0xpc3QgZmllbGQgc28gY2FsbGJhY2tzIGNhbiBiZVxuICAgICAgICAvLyBjYWxsZWQgZHVyaW5nIGNvbW1pdCBwaGFzZS5cbiAgICAgICAgd29ya0luUHJvZ3Jlc3MuY2FsbGJhY2tMaXN0ID0gd29ya0luUHJvZ3Jlc3MudXBkYXRlUXVldWU7XG4gICAgICAgIG1hcmtGb3JQb3N0RWZmZWN0KHdvcmtJblByb2dyZXNzKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICBjYXNlIEhvc3RDb250YWluZXI6XG4gICAgICAgIHRyYW5zZmVyT3V0cHV0KHdvcmtJblByb2dyZXNzLmNoaWxkLCB3b3JrSW5Qcm9ncmVzcyk7XG4gICAgICAgIC8vIFdlIGRvbid0IGtub3cgaWYgYSBjb250YWluZXIgaGFzIHVwZGF0ZWQgYW55IGNoaWxkcmVuIHNvIHdlIGFsd2F5c1xuICAgICAgICAvLyBuZWVkIHRvIHVwZGF0ZSBpdCByaWdodCBub3cuIFdlIHNjaGVkdWxlIHRoaXMgc2lkZS1lZmZlY3QgYmVmb3JlXG4gICAgICAgIC8vIGFsbCB0aGUgb3RoZXIgc2lkZS1lZmZlY3RzIGluIHRoZSBzdWJ0cmVlLiBXZSBuZWVkIHRvIHNjaGVkdWxlIGl0XG4gICAgICAgIC8vIGJlZm9yZSBzbyB0aGF0IHRoZSBlbnRpcmUgdHJlZSBpcyB1cC10by1kYXRlIGJlZm9yZSB0aGUgbGlmZS1jeWNsZXNcbiAgICAgICAgLy8gYXJlIGludm9rZWQuXG4gICAgICAgIG1hcmtGb3JQcmVFZmZlY3Qod29ya0luUHJvZ3Jlc3MpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIGNhc2UgSG9zdENvbXBvbmVudDpcbiAgICAgICAgdmFyIG5ld1Byb3BzID0gd29ya0luUHJvZ3Jlc3MucGVuZGluZ1Byb3BzO1xuICAgICAgICB2YXIgY2hpbGQgPSB3b3JrSW5Qcm9ncmVzcy5jaGlsZDtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gY2hpbGQgJiYgIWNoaWxkLnNpYmxpbmcgPyBjaGlsZC5vdXRwdXQgOiBjaGlsZDtcbiAgICAgICAgaWYgKGN1cnJlbnQgJiYgd29ya0luUHJvZ3Jlc3Muc3RhdGVOb2RlICE9IG51bGwpIHtcbiAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGFuIGFsdGVybmF0ZSwgdGhhdCBtZWFucyB0aGlzIGlzIGFuIHVwZGF0ZSBhbmQgd2UgbmVlZCB0b1xuICAgICAgICAgIC8vIHNjaGVkdWxlIGEgc2lkZS1lZmZlY3QgdG8gZG8gdGhlIHVwZGF0ZXMuXG4gICAgICAgICAgdmFyIG9sZFByb3BzID0gY3VycmVudC5tZW1vaXplZFByb3BzO1xuICAgICAgICAgIC8vIElmIHdlIGdldCB1cGRhdGVkIGJlY2F1c2Ugb25lIG9mIG91ciBjaGlsZHJlbiB1cGRhdGVkLCB3ZSBkb24ndFxuICAgICAgICAgIC8vIGhhdmUgbmV3UHJvcHMgc28gd2UnbGwgaGF2ZSB0byByZXVzZSB0aGVtLlxuICAgICAgICAgIC8vIFRPRE86IFNwbGl0IHRoZSB1cGRhdGUgQVBJIGFzIHNlcGFyYXRlIGZvciB0aGUgcHJvcHMgdnMuIGNoaWxkcmVuLlxuICAgICAgICAgIC8vIEV2ZW4gYmV0dGVyIHdvdWxkIGJlIGlmIGNoaWxkcmVuIHdlcmVuJ3Qgc3BlY2lhbCBjYXNlZCBhdCBhbGwgdGhvLlxuICAgICAgICAgIGlmICghbmV3UHJvcHMpIHtcbiAgICAgICAgICAgIG5ld1Byb3BzID0gb2xkUHJvcHM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHdvcmtJblByb2dyZXNzLnN0YXRlTm9kZTtcbiAgICAgICAgICBpZiAocHJlcGFyZVVwZGF0ZShpbnN0YW5jZSwgb2xkUHJvcHMsIG5ld1Byb3BzLCBjaGlsZHJlbikpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgcmV0dXJucyB0cnVlIGlmIHRoZXJlIHdhcyBzb21ldGhpbmcgdG8gdXBkYXRlLlxuICAgICAgICAgICAgbWFya0ZvclByZUVmZmVjdCh3b3JrSW5Qcm9ncmVzcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFRPRE86IElzIHRoaXMgYWN0dWFsbHkgZXZlciBnb2luZyB0byBjaGFuZ2U/IFdoeSBzZXQgaXQgZXZlcnkgdGltZT9cbiAgICAgICAgICB3b3JrSW5Qcm9ncmVzcy5vdXRwdXQgPSBpbnN0YW5jZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIW5ld1Byb3BzKSB7XG4gICAgICAgICAgICBpZiAod29ya0luUHJvZ3Jlc3Muc3RhdGVOb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV2UgbXVzdCBoYXZlIG5ldyBwcm9wcyBmb3IgbmV3IG1vdW50cy4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgY2FuIGhhcHBlbiB3aGVuIHdlIGFib3J0IHdvcmsuXG4gICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgX2luc3RhbmNlID0gY3JlYXRlSW5zdGFuY2Uod29ya0luUHJvZ3Jlc3MudHlwZSwgbmV3UHJvcHMsIGNoaWxkcmVuKTtcbiAgICAgICAgICAvLyBUT0RPOiBUaGlzIHNlZW1zIGxpa2UgdW5uZWNlc3NhcnkgZHVwbGljYXRpb24uXG4gICAgICAgICAgd29ya0luUHJvZ3Jlc3Muc3RhdGVOb2RlID0gX2luc3RhbmNlO1xuICAgICAgICAgIHdvcmtJblByb2dyZXNzLm91dHB1dCA9IF9pbnN0YW5jZTtcbiAgICAgICAgfVxuICAgICAgICB3b3JrSW5Qcm9ncmVzcy5tZW1vaXplZFByb3BzID0gbmV3UHJvcHM7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgY2FzZSBDb3JvdXRpbmVDb21wb25lbnQ6XG4gICAgICAgIHJldHVybiBtb3ZlQ29yb3V0aW5lVG9IYW5kbGVyUGhhc2UoY3VycmVudCwgd29ya0luUHJvZ3Jlc3MpO1xuICAgICAgY2FzZSBDb3JvdXRpbmVIYW5kbGVyUGhhc2U6XG4gICAgICAgIHRyYW5zZmVyT3V0cHV0KHdvcmtJblByb2dyZXNzLnN0YXRlTm9kZSwgd29ya0luUHJvZ3Jlc3MpO1xuICAgICAgICAvLyBSZXNldCB0aGUgdGFnIHRvIG5vdyBiZSBhIGZpcnN0IHBoYXNlIGNvcm91dGluZS5cbiAgICAgICAgd29ya0luUHJvZ3Jlc3MudGFnID0gQ29yb3V0aW5lQ29tcG9uZW50O1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIGNhc2UgWWllbGRDb21wb25lbnQ6XG4gICAgICAgIC8vIERvZXMgbm90aGluZy5cbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgIC8vIEVycm9yIGNhc2VzXG4gICAgICBjYXNlIEluZGV0ZXJtaW5hdGVDb21wb25lbnQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW4gaW5kZXRlcm1pbmF0ZSBjb21wb25lbnQgc2hvdWxkIGhhdmUgYmVjb21lIGRldGVybWluYXRlIGJlZm9yZSBjb21wbGV0aW5nLicpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHVuaXQgb2Ygd29yayB0YWcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNvbXBsZXRlV29yazogY29tcGxldGVXb3JrXG4gIH07XG59OyJdfQ==