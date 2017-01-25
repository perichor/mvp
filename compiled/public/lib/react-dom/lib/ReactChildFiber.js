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

var REACT_ELEMENT_TYPE = require('./ReactElementSymbol');

var _require = require('./ReactCoroutine'),
    REACT_COROUTINE_TYPE = _require.REACT_COROUTINE_TYPE,
    REACT_YIELD_TYPE = _require.REACT_YIELD_TYPE;

var ReactFiber = require('./ReactFiber');
var ReactReifiedYield = require('./ReactReifiedYield');

var cloneFiber = ReactFiber.cloneFiber,
    createFiberFromElement = ReactFiber.createFiberFromElement,
    createFiberFromCoroutine = ReactFiber.createFiberFromCoroutine,
    createFiberFromYield = ReactFiber.createFiberFromYield;
var createReifiedYield = ReactReifiedYield.createReifiedYield;

var isArray = Array.isArray;

function ChildReconciler(shouldClone) {

  function createSubsequentChild(returnFiber, existingChild, previousSibling, newChildren, priority) {
    if ((typeof newChildren === 'undefined' ? 'undefined' : _typeof(newChildren)) !== 'object' || newChildren === null) {
      return previousSibling;
    }

    switch (newChildren.$$typeof) {
      case REACT_ELEMENT_TYPE:
        {
          var element = newChildren;
          if (existingChild && element.type === existingChild.type && element.key === existingChild.key) {
            // TODO: This is not sufficient since previous siblings could be new.
            // Will fix reconciliation properly later.
            var clone = shouldClone ? cloneFiber(existingChild, priority) : existingChild;
            if (!shouldClone) {
              // TODO: This might be lowering the priority of nested unfinished work.
              clone.pendingWorkPriority = priority;
            }
            clone.pendingProps = element.props;
            clone.sibling = null;
            clone['return'] = returnFiber;
            previousSibling.sibling = clone;
            return clone;
          }
          var child = createFiberFromElement(element, priority);
          previousSibling.sibling = child;
          child['return'] = returnFiber;
          return child;
        }

      case REACT_COROUTINE_TYPE:
        {
          var coroutine = newChildren;
          var _child = createFiberFromCoroutine(coroutine, priority);
          previousSibling.sibling = _child;
          _child['return'] = returnFiber;
          return _child;
        }

      case REACT_YIELD_TYPE:
        {
          var yieldNode = newChildren;
          var reifiedYield = createReifiedYield(yieldNode);
          var _child2 = createFiberFromYield(yieldNode, priority);
          _child2.output = reifiedYield;
          previousSibling.sibling = _child2;
          _child2['return'] = returnFiber;
          return _child2;
        }
    }

    if (isArray(newChildren)) {
      var prev = previousSibling;
      var existing = existingChild;
      for (var i = 0; i < newChildren.length; i++) {
        var nextExisting = existing && existing.sibling;
        prev = createSubsequentChild(returnFiber, existing, prev, newChildren[i], priority);
        if (prev && existing) {
          // TODO: This is not correct because there could've been more
          // than one sibling consumed but I don't want to return a tuple.
          existing = nextExisting;
        }
      }
      return prev;
    } else {
      // TODO: Throw for unknown children.
      return previousSibling;
    }
  }

  function createFirstChild(returnFiber, existingChild, newChildren, priority) {
    if ((typeof newChildren === 'undefined' ? 'undefined' : _typeof(newChildren)) !== 'object' || newChildren === null) {
      return null;
    }

    switch (newChildren.$$typeof) {
      case REACT_ELEMENT_TYPE:
        {
          /* $FlowFixMe(>=0.31.0): This is an unsafe cast. Consider adding a type
           *                       annotation to the `newChildren` param of this
           *                       function.
           */
          var element = newChildren;
          if (existingChild && element.type === existingChild.type && element.key === existingChild.key) {
            // Get the clone of the existing fiber.
            var clone = shouldClone ? cloneFiber(existingChild, priority) : existingChild;
            if (!shouldClone) {
              // TODO: This might be lowering the priority of nested unfinished work.
              clone.pendingWorkPriority = priority;
            }
            clone.pendingProps = element.props;
            clone.sibling = null;
            clone['return'] = returnFiber;
            return clone;
          }
          var child = createFiberFromElement(element, priority);
          child['return'] = returnFiber;
          return child;
        }

      case REACT_COROUTINE_TYPE:
        {
          /* $FlowFixMe(>=0.31.0): No 'handler' property found in object type
           */
          var coroutine = newChildren;
          var _child3 = createFiberFromCoroutine(coroutine, priority);
          _child3['return'] = returnFiber;
          return _child3;
        }

      case REACT_YIELD_TYPE:
        {
          // A yield results in a fragment fiber whose output is the continuation.
          // TODO: When there is only a single child, we can optimize this to avoid
          // the fragment.
          /* $FlowFixMe(>=0.31.0): No 'continuation' property found in object
           * type
           */
          var yieldNode = newChildren;
          var reifiedYield = createReifiedYield(yieldNode);
          var _child4 = createFiberFromYield(yieldNode, priority);
          _child4.output = reifiedYield;
          _child4['return'] = returnFiber;
          return _child4;
        }
    }

    if (isArray(newChildren)) {
      var first = null;
      var prev = null;
      var existing = existingChild;
      /* $FlowIssue(>=0.31.0) #12747709
       *
       * `Array.isArray` is matched syntactically for now until predicate
       * support is complete.
       */
      for (var i = 0; i < newChildren.length; i++) {
        var nextExisting = existing && existing.sibling;
        if (prev == null) {
          prev = createFirstChild(returnFiber, existing, newChildren[i], priority);
          first = prev;
        } else {
          prev = createSubsequentChild(returnFiber, existing, prev, newChildren[i], priority);
        }
        if (prev && existing) {
          // TODO: This is not correct because there could've been more
          // than one sibling consumed but I don't want to return a tuple.
          existing = nextExisting;
        }
      }
      return first;
    } else {
      // TODO: Throw for unknown children.
      return null;
    }
  }

  // TODO: This API won't work because we'll need to transfer the side-effects of
  // unmounting children to the returnFiber.
  function reconcileChildFibers(returnFiber, currentFirstChild, newChildren, priority) {
    return createFirstChild(returnFiber, currentFirstChild, newChildren, priority);
  }

  return reconcileChildFibers;
}

exports.reconcileChildFibers = ChildReconciler(true);

exports.reconcileChildFibersInPlace = ChildReconciler(false);

function cloneSiblings(current, workInProgress, returnFiber) {
  workInProgress['return'] = returnFiber;
  while (current.sibling) {
    current = current.sibling;
    workInProgress = workInProgress.sibling = cloneFiber(current, current.pendingWorkPriority);
    workInProgress['return'] = returnFiber;
  }
  workInProgress.sibling = null;
}

exports.cloneChildFibers = function (current, workInProgress) {
  if (!workInProgress.child) {
    return;
  }
  if (current && workInProgress.child === current.child) {
    // We use workInProgress.child since that lets Flow know that it can't be
    // null since we validated that already. However, as the line above suggests
    // they're actually the same thing.
    var currentChild = workInProgress.child;
    // TODO: This used to reset the pending priority. Not sure if that is needed.
    // workInProgress.pendingWorkPriority = current.pendingWorkPriority;
    // TODO: The below priority used to be set to NoWork which would've
    // dropped work. This is currently unobservable but will become
    // observable when the first sibling has lower priority work remaining
    // than the next sibling. At that point we should add tests that catches
    // this.
    var newChild = cloneFiber(currentChild, currentChild.pendingWorkPriority);
    workInProgress.child = newChild;
    cloneSiblings(currentChild, newChild, workInProgress);
  }

  // If there is no alternate, then we don't need to clone the children.
  // If the children of the alternate fiber is a different set, then we don't
  // need to clone. We need to reset the return fiber though since we'll
  // traverse down into them.
  var child = workInProgress.child;
  while (child) {
    child['return'] = workInProgress;
    child = child.sibling;
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdENoaWxkRmliZXIuanMiXSwibmFtZXMiOlsiUkVBQ1RfRUxFTUVOVF9UWVBFIiwicmVxdWlyZSIsIl9yZXF1aXJlIiwiUkVBQ1RfQ09ST1VUSU5FX1RZUEUiLCJSRUFDVF9ZSUVMRF9UWVBFIiwiUmVhY3RGaWJlciIsIlJlYWN0UmVpZmllZFlpZWxkIiwiY2xvbmVGaWJlciIsImNyZWF0ZUZpYmVyRnJvbUVsZW1lbnQiLCJjcmVhdGVGaWJlckZyb21Db3JvdXRpbmUiLCJjcmVhdGVGaWJlckZyb21ZaWVsZCIsImNyZWF0ZVJlaWZpZWRZaWVsZCIsImlzQXJyYXkiLCJBcnJheSIsIkNoaWxkUmVjb25jaWxlciIsInNob3VsZENsb25lIiwiY3JlYXRlU3Vic2VxdWVudENoaWxkIiwicmV0dXJuRmliZXIiLCJleGlzdGluZ0NoaWxkIiwicHJldmlvdXNTaWJsaW5nIiwibmV3Q2hpbGRyZW4iLCJwcmlvcml0eSIsIiQkdHlwZW9mIiwiZWxlbWVudCIsInR5cGUiLCJrZXkiLCJjbG9uZSIsInBlbmRpbmdXb3JrUHJpb3JpdHkiLCJwZW5kaW5nUHJvcHMiLCJwcm9wcyIsInNpYmxpbmciLCJjaGlsZCIsImNvcm91dGluZSIsIl9jaGlsZCIsInlpZWxkTm9kZSIsInJlaWZpZWRZaWVsZCIsIl9jaGlsZDIiLCJvdXRwdXQiLCJwcmV2IiwiZXhpc3RpbmciLCJpIiwibGVuZ3RoIiwibmV4dEV4aXN0aW5nIiwiY3JlYXRlRmlyc3RDaGlsZCIsIl9jaGlsZDMiLCJfY2hpbGQ0IiwiZmlyc3QiLCJyZWNvbmNpbGVDaGlsZEZpYmVycyIsImN1cnJlbnRGaXJzdENoaWxkIiwiZXhwb3J0cyIsInJlY29uY2lsZUNoaWxkRmliZXJzSW5QbGFjZSIsImNsb25lU2libGluZ3MiLCJjdXJyZW50Iiwid29ya0luUHJvZ3Jlc3MiLCJjbG9uZUNoaWxkRmliZXJzIiwiY3VycmVudENoaWxkIiwibmV3Q2hp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QUFJLENBQUNBLGVBQWV0QixLQUFwQixFQUEyQjtBQUN6QjtBQUNEO0FBQ0QsTUFBSXFCLFdBQVdDLGVBQWV0QixLQUFmLEtBQXlCcUIsUUFBUXJCLEtBQWhELEVBQXVEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLFFBQUl3QixlQUFlRixlQUFldEIsS0FBbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQUl5QixXQUFXakQsV0FBV2dELFlBQVgsRUFBeUJBLGFBQWE1QixtQkFBdEMsQ0FBZjtBQUNBMEIsbUJBQWV0QixLQUFmLEdBQXVCeUIsUUFBdkI7QUFDQUwsa0JBQWNJLFlBQWQsRUFBNEJDLFFBQTVCLEVBQXNDSCxjQUF0QztBQUNEOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSXRCLFFBQVFzQixlQUFldEIsS0FBM0I7QUFDQSxTQUFPQSxLQUFQLEVBQWM7QUFDWkEsVUFBTSxRQUFOLElBQWtCc0IsY0FBbEI7QUFDQXRCLFlBQVFBLE1BQU1ELE9BQWQ7QUFDRDtBQUNGLENBOUJEIiwiZmlsZSI6IlJlYWN0Q2hpbGRGaWJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50U3ltYm9sJyk7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vUmVhY3RDb3JvdXRpbmUnKSxcbiAgICBSRUFDVF9DT1JPVVRJTkVfVFlQRSA9IF9yZXF1aXJlLlJFQUNUX0NPUk9VVElORV9UWVBFLFxuICAgIFJFQUNUX1lJRUxEX1RZUEUgPSBfcmVxdWlyZS5SRUFDVF9ZSUVMRF9UWVBFO1xuXG52YXIgUmVhY3RGaWJlciA9IHJlcXVpcmUoJy4vUmVhY3RGaWJlcicpO1xudmFyIFJlYWN0UmVpZmllZFlpZWxkID0gcmVxdWlyZSgnLi9SZWFjdFJlaWZpZWRZaWVsZCcpO1xuXG52YXIgY2xvbmVGaWJlciA9IFJlYWN0RmliZXIuY2xvbmVGaWJlcixcbiAgICBjcmVhdGVGaWJlckZyb21FbGVtZW50ID0gUmVhY3RGaWJlci5jcmVhdGVGaWJlckZyb21FbGVtZW50LFxuICAgIGNyZWF0ZUZpYmVyRnJvbUNvcm91dGluZSA9IFJlYWN0RmliZXIuY3JlYXRlRmliZXJGcm9tQ29yb3V0aW5lLFxuICAgIGNyZWF0ZUZpYmVyRnJvbVlpZWxkID0gUmVhY3RGaWJlci5jcmVhdGVGaWJlckZyb21ZaWVsZDtcbnZhciBjcmVhdGVSZWlmaWVkWWllbGQgPSBSZWFjdFJlaWZpZWRZaWVsZC5jcmVhdGVSZWlmaWVkWWllbGQ7XG5cblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5mdW5jdGlvbiBDaGlsZFJlY29uY2lsZXIoc2hvdWxkQ2xvbmUpIHtcblxuICBmdW5jdGlvbiBjcmVhdGVTdWJzZXF1ZW50Q2hpbGQocmV0dXJuRmliZXIsIGV4aXN0aW5nQ2hpbGQsIHByZXZpb3VzU2libGluZywgbmV3Q2hpbGRyZW4sIHByaW9yaXR5KSB7XG4gICAgaWYgKHR5cGVvZiBuZXdDaGlsZHJlbiAhPT0gJ29iamVjdCcgfHwgbmV3Q2hpbGRyZW4gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBwcmV2aW91c1NpYmxpbmc7XG4gICAgfVxuXG4gICAgc3dpdGNoIChuZXdDaGlsZHJlbi4kJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgZWxlbWVudCA9IG5ld0NoaWxkcmVuO1xuICAgICAgICAgIGlmIChleGlzdGluZ0NoaWxkICYmIGVsZW1lbnQudHlwZSA9PT0gZXhpc3RpbmdDaGlsZC50eXBlICYmIGVsZW1lbnQua2V5ID09PSBleGlzdGluZ0NoaWxkLmtleSkge1xuICAgICAgICAgICAgLy8gVE9ETzogVGhpcyBpcyBub3Qgc3VmZmljaWVudCBzaW5jZSBwcmV2aW91cyBzaWJsaW5ncyBjb3VsZCBiZSBuZXcuXG4gICAgICAgICAgICAvLyBXaWxsIGZpeCByZWNvbmNpbGlhdGlvbiBwcm9wZXJseSBsYXRlci5cbiAgICAgICAgICAgIHZhciBjbG9uZSA9IHNob3VsZENsb25lID8gY2xvbmVGaWJlcihleGlzdGluZ0NoaWxkLCBwcmlvcml0eSkgOiBleGlzdGluZ0NoaWxkO1xuICAgICAgICAgICAgaWYgKCFzaG91bGRDbG9uZSkge1xuICAgICAgICAgICAgICAvLyBUT0RPOiBUaGlzIG1pZ2h0IGJlIGxvd2VyaW5nIHRoZSBwcmlvcml0eSBvZiBuZXN0ZWQgdW5maW5pc2hlZCB3b3JrLlxuICAgICAgICAgICAgICBjbG9uZS5wZW5kaW5nV29ya1ByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbG9uZS5wZW5kaW5nUHJvcHMgPSBlbGVtZW50LnByb3BzO1xuICAgICAgICAgICAgY2xvbmUuc2libGluZyA9IG51bGw7XG4gICAgICAgICAgICBjbG9uZVsncmV0dXJuJ10gPSByZXR1cm5GaWJlcjtcbiAgICAgICAgICAgIHByZXZpb3VzU2libGluZy5zaWJsaW5nID0gY2xvbmU7XG4gICAgICAgICAgICByZXR1cm4gY2xvbmU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjaGlsZCA9IGNyZWF0ZUZpYmVyRnJvbUVsZW1lbnQoZWxlbWVudCwgcHJpb3JpdHkpO1xuICAgICAgICAgIHByZXZpb3VzU2libGluZy5zaWJsaW5nID0gY2hpbGQ7XG4gICAgICAgICAgY2hpbGRbJ3JldHVybiddID0gcmV0dXJuRmliZXI7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG5cbiAgICAgIGNhc2UgUkVBQ1RfQ09ST1VUSU5FX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgY29yb3V0aW5lID0gbmV3Q2hpbGRyZW47XG4gICAgICAgICAgdmFyIF9jaGlsZCA9IGNyZWF0ZUZpYmVyRnJvbUNvcm91dGluZShjb3JvdXRpbmUsIHByaW9yaXR5KTtcbiAgICAgICAgICBwcmV2aW91c1NpYmxpbmcuc2libGluZyA9IF9jaGlsZDtcbiAgICAgICAgICBfY2hpbGRbJ3JldHVybiddID0gcmV0dXJuRmliZXI7XG4gICAgICAgICAgcmV0dXJuIF9jaGlsZDtcbiAgICAgICAgfVxuXG4gICAgICBjYXNlIFJFQUNUX1lJRUxEX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgeWllbGROb2RlID0gbmV3Q2hpbGRyZW47XG4gICAgICAgICAgdmFyIHJlaWZpZWRZaWVsZCA9IGNyZWF0ZVJlaWZpZWRZaWVsZCh5aWVsZE5vZGUpO1xuICAgICAgICAgIHZhciBfY2hpbGQyID0gY3JlYXRlRmliZXJGcm9tWWllbGQoeWllbGROb2RlLCBwcmlvcml0eSk7XG4gICAgICAgICAgX2NoaWxkMi5vdXRwdXQgPSByZWlmaWVkWWllbGQ7XG4gICAgICAgICAgcHJldmlvdXNTaWJsaW5nLnNpYmxpbmcgPSBfY2hpbGQyO1xuICAgICAgICAgIF9jaGlsZDJbJ3JldHVybiddID0gcmV0dXJuRmliZXI7XG4gICAgICAgICAgcmV0dXJuIF9jaGlsZDI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheShuZXdDaGlsZHJlbikpIHtcbiAgICAgIHZhciBwcmV2ID0gcHJldmlvdXNTaWJsaW5nO1xuICAgICAgdmFyIGV4aXN0aW5nID0gZXhpc3RpbmdDaGlsZDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3Q2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG5leHRFeGlzdGluZyA9IGV4aXN0aW5nICYmIGV4aXN0aW5nLnNpYmxpbmc7XG4gICAgICAgIHByZXYgPSBjcmVhdGVTdWJzZXF1ZW50Q2hpbGQocmV0dXJuRmliZXIsIGV4aXN0aW5nLCBwcmV2LCBuZXdDaGlsZHJlbltpXSwgcHJpb3JpdHkpO1xuICAgICAgICBpZiAocHJldiAmJiBleGlzdGluZykge1xuICAgICAgICAgIC8vIFRPRE86IFRoaXMgaXMgbm90IGNvcnJlY3QgYmVjYXVzZSB0aGVyZSBjb3VsZCd2ZSBiZWVuIG1vcmVcbiAgICAgICAgICAvLyB0aGFuIG9uZSBzaWJsaW5nIGNvbnN1bWVkIGJ1dCBJIGRvbid0IHdhbnQgdG8gcmV0dXJuIGEgdHVwbGUuXG4gICAgICAgICAgZXhpc3RpbmcgPSBuZXh0RXhpc3Rpbmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPOiBUaHJvdyBmb3IgdW5rbm93biBjaGlsZHJlbi5cbiAgICAgIHJldHVybiBwcmV2aW91c1NpYmxpbmc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRmlyc3RDaGlsZChyZXR1cm5GaWJlciwgZXhpc3RpbmdDaGlsZCwgbmV3Q2hpbGRyZW4sIHByaW9yaXR5KSB7XG4gICAgaWYgKHR5cGVvZiBuZXdDaGlsZHJlbiAhPT0gJ29iamVjdCcgfHwgbmV3Q2hpbGRyZW4gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHN3aXRjaCAobmV3Q2hpbGRyZW4uJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB7XG4gICAgICAgICAgLyogJEZsb3dGaXhNZSg+PTAuMzEuMCk6IFRoaXMgaXMgYW4gdW5zYWZlIGNhc3QuIENvbnNpZGVyIGFkZGluZyBhIHR5cGVcbiAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbiB0byB0aGUgYG5ld0NoaWxkcmVuYCBwYXJhbSBvZiB0aGlzXG4gICAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uLlxuICAgICAgICAgICAqL1xuICAgICAgICAgIHZhciBlbGVtZW50ID0gbmV3Q2hpbGRyZW47XG4gICAgICAgICAgaWYgKGV4aXN0aW5nQ2hpbGQgJiYgZWxlbWVudC50eXBlID09PSBleGlzdGluZ0NoaWxkLnR5cGUgJiYgZWxlbWVudC5rZXkgPT09IGV4aXN0aW5nQ2hpbGQua2V5KSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGNsb25lIG9mIHRoZSBleGlzdGluZyBmaWJlci5cbiAgICAgICAgICAgIHZhciBjbG9uZSA9IHNob3VsZENsb25lID8gY2xvbmVGaWJlcihleGlzdGluZ0NoaWxkLCBwcmlvcml0eSkgOiBleGlzdGluZ0NoaWxkO1xuICAgICAgICAgICAgaWYgKCFzaG91bGRDbG9uZSkge1xuICAgICAgICAgICAgICAvLyBUT0RPOiBUaGlzIG1pZ2h0IGJlIGxvd2VyaW5nIHRoZSBwcmlvcml0eSBvZiBuZXN0ZWQgdW5maW5pc2hlZCB3b3JrLlxuICAgICAgICAgICAgICBjbG9uZS5wZW5kaW5nV29ya1ByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbG9uZS5wZW5kaW5nUHJvcHMgPSBlbGVtZW50LnByb3BzO1xuICAgICAgICAgICAgY2xvbmUuc2libGluZyA9IG51bGw7XG4gICAgICAgICAgICBjbG9uZVsncmV0dXJuJ10gPSByZXR1cm5GaWJlcjtcbiAgICAgICAgICAgIHJldHVybiBjbG9uZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGNoaWxkID0gY3JlYXRlRmliZXJGcm9tRWxlbWVudChlbGVtZW50LCBwcmlvcml0eSk7XG4gICAgICAgICAgY2hpbGRbJ3JldHVybiddID0gcmV0dXJuRmliZXI7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG5cbiAgICAgIGNhc2UgUkVBQ1RfQ09ST1VUSU5FX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICAvKiAkRmxvd0ZpeE1lKD49MC4zMS4wKTogTm8gJ2hhbmRsZXInIHByb3BlcnR5IGZvdW5kIGluIG9iamVjdCB0eXBlXG4gICAgICAgICAgICovXG4gICAgICAgICAgdmFyIGNvcm91dGluZSA9IG5ld0NoaWxkcmVuO1xuICAgICAgICAgIHZhciBfY2hpbGQzID0gY3JlYXRlRmliZXJGcm9tQ29yb3V0aW5lKGNvcm91dGluZSwgcHJpb3JpdHkpO1xuICAgICAgICAgIF9jaGlsZDNbJ3JldHVybiddID0gcmV0dXJuRmliZXI7XG4gICAgICAgICAgcmV0dXJuIF9jaGlsZDM7XG4gICAgICAgIH1cblxuICAgICAgY2FzZSBSRUFDVF9ZSUVMRF9UWVBFOlxuICAgICAgICB7XG4gICAgICAgICAgLy8gQSB5aWVsZCByZXN1bHRzIGluIGEgZnJhZ21lbnQgZmliZXIgd2hvc2Ugb3V0cHV0IGlzIHRoZSBjb250aW51YXRpb24uXG4gICAgICAgICAgLy8gVE9ETzogV2hlbiB0aGVyZSBpcyBvbmx5IGEgc2luZ2xlIGNoaWxkLCB3ZSBjYW4gb3B0aW1pemUgdGhpcyB0byBhdm9pZFxuICAgICAgICAgIC8vIHRoZSBmcmFnbWVudC5cbiAgICAgICAgICAvKiAkRmxvd0ZpeE1lKD49MC4zMS4wKTogTm8gJ2NvbnRpbnVhdGlvbicgcHJvcGVydHkgZm91bmQgaW4gb2JqZWN0XG4gICAgICAgICAgICogdHlwZVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHZhciB5aWVsZE5vZGUgPSBuZXdDaGlsZHJlbjtcbiAgICAgICAgICB2YXIgcmVpZmllZFlpZWxkID0gY3JlYXRlUmVpZmllZFlpZWxkKHlpZWxkTm9kZSk7XG4gICAgICAgICAgdmFyIF9jaGlsZDQgPSBjcmVhdGVGaWJlckZyb21ZaWVsZCh5aWVsZE5vZGUsIHByaW9yaXR5KTtcbiAgICAgICAgICBfY2hpbGQ0Lm91dHB1dCA9IHJlaWZpZWRZaWVsZDtcbiAgICAgICAgICBfY2hpbGQ0WydyZXR1cm4nXSA9IHJldHVybkZpYmVyO1xuICAgICAgICAgIHJldHVybiBfY2hpbGQ0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkobmV3Q2hpbGRyZW4pKSB7XG4gICAgICB2YXIgZmlyc3QgPSBudWxsO1xuICAgICAgdmFyIHByZXYgPSBudWxsO1xuICAgICAgdmFyIGV4aXN0aW5nID0gZXhpc3RpbmdDaGlsZDtcbiAgICAgIC8qICRGbG93SXNzdWUoPj0wLjMxLjApICMxMjc0NzcwOVxuICAgICAgICpcbiAgICAgICAqIGBBcnJheS5pc0FycmF5YCBpcyBtYXRjaGVkIHN5bnRhY3RpY2FsbHkgZm9yIG5vdyB1bnRpbCBwcmVkaWNhdGVcbiAgICAgICAqIHN1cHBvcnQgaXMgY29tcGxldGUuXG4gICAgICAgKi9cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3Q2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG5leHRFeGlzdGluZyA9IGV4aXN0aW5nICYmIGV4aXN0aW5nLnNpYmxpbmc7XG4gICAgICAgIGlmIChwcmV2ID09IG51bGwpIHtcbiAgICAgICAgICBwcmV2ID0gY3JlYXRlRmlyc3RDaGlsZChyZXR1cm5GaWJlciwgZXhpc3RpbmcsIG5ld0NoaWxkcmVuW2ldLCBwcmlvcml0eSk7XG4gICAgICAgICAgZmlyc3QgPSBwcmV2O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByZXYgPSBjcmVhdGVTdWJzZXF1ZW50Q2hpbGQocmV0dXJuRmliZXIsIGV4aXN0aW5nLCBwcmV2LCBuZXdDaGlsZHJlbltpXSwgcHJpb3JpdHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2ICYmIGV4aXN0aW5nKSB7XG4gICAgICAgICAgLy8gVE9ETzogVGhpcyBpcyBub3QgY29ycmVjdCBiZWNhdXNlIHRoZXJlIGNvdWxkJ3ZlIGJlZW4gbW9yZVxuICAgICAgICAgIC8vIHRoYW4gb25lIHNpYmxpbmcgY29uc3VtZWQgYnV0IEkgZG9uJ3Qgd2FudCB0byByZXR1cm4gYSB0dXBsZS5cbiAgICAgICAgICBleGlzdGluZyA9IG5leHRFeGlzdGluZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZpcnN0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPOiBUaHJvdyBmb3IgdW5rbm93biBjaGlsZHJlbi5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE86IFRoaXMgQVBJIHdvbid0IHdvcmsgYmVjYXVzZSB3ZSdsbCBuZWVkIHRvIHRyYW5zZmVyIHRoZSBzaWRlLWVmZmVjdHMgb2ZcbiAgLy8gdW5tb3VudGluZyBjaGlsZHJlbiB0byB0aGUgcmV0dXJuRmliZXIuXG4gIGZ1bmN0aW9uIHJlY29uY2lsZUNoaWxkRmliZXJzKHJldHVybkZpYmVyLCBjdXJyZW50Rmlyc3RDaGlsZCwgbmV3Q2hpbGRyZW4sIHByaW9yaXR5KSB7XG4gICAgcmV0dXJuIGNyZWF0ZUZpcnN0Q2hpbGQocmV0dXJuRmliZXIsIGN1cnJlbnRGaXJzdENoaWxkLCBuZXdDaGlsZHJlbiwgcHJpb3JpdHkpO1xuICB9XG5cbiAgcmV0dXJuIHJlY29uY2lsZUNoaWxkRmliZXJzO1xufVxuXG5leHBvcnRzLnJlY29uY2lsZUNoaWxkRmliZXJzID0gQ2hpbGRSZWNvbmNpbGVyKHRydWUpO1xuXG5leHBvcnRzLnJlY29uY2lsZUNoaWxkRmliZXJzSW5QbGFjZSA9IENoaWxkUmVjb25jaWxlcihmYWxzZSk7XG5cbmZ1bmN0aW9uIGNsb25lU2libGluZ3MoY3VycmVudCwgd29ya0luUHJvZ3Jlc3MsIHJldHVybkZpYmVyKSB7XG4gIHdvcmtJblByb2dyZXNzWydyZXR1cm4nXSA9IHJldHVybkZpYmVyO1xuICB3aGlsZSAoY3VycmVudC5zaWJsaW5nKSB7XG4gICAgY3VycmVudCA9IGN1cnJlbnQuc2libGluZztcbiAgICB3b3JrSW5Qcm9ncmVzcyA9IHdvcmtJblByb2dyZXNzLnNpYmxpbmcgPSBjbG9uZUZpYmVyKGN1cnJlbnQsIGN1cnJlbnQucGVuZGluZ1dvcmtQcmlvcml0eSk7XG4gICAgd29ya0luUHJvZ3Jlc3NbJ3JldHVybiddID0gcmV0dXJuRmliZXI7XG4gIH1cbiAgd29ya0luUHJvZ3Jlc3Muc2libGluZyA9IG51bGw7XG59XG5cbmV4cG9ydHMuY2xvbmVDaGlsZEZpYmVycyA9IGZ1bmN0aW9uIChjdXJyZW50LCB3b3JrSW5Qcm9ncmVzcykge1xuICBpZiAoIXdvcmtJblByb2dyZXNzLmNoaWxkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjdXJyZW50ICYmIHdvcmtJblByb2dyZXNzLmNoaWxkID09PSBjdXJyZW50LmNoaWxkKSB7XG4gICAgLy8gV2UgdXNlIHdvcmtJblByb2dyZXNzLmNoaWxkIHNpbmNlIHRoYXQgbGV0cyBGbG93IGtub3cgdGhhdCBpdCBjYW4ndCBiZVxuICAgIC8vIG51bGwgc2luY2Ugd2UgdmFsaWRhdGVkIHRoYXQgYWxyZWFkeS4gSG93ZXZlciwgYXMgdGhlIGxpbmUgYWJvdmUgc3VnZ2VzdHNcbiAgICAvLyB0aGV5J3JlIGFjdHVhbGx5IHRoZSBzYW1lIHRoaW5nLlxuICAgIHZhciBjdXJyZW50Q2hpbGQgPSB3b3JrSW5Qcm9ncmVzcy5jaGlsZDtcbiAgICAvLyBUT0RPOiBUaGlzIHVzZWQgdG8gcmVzZXQgdGhlIHBlbmRpbmcgcHJpb3JpdHkuIE5vdCBzdXJlIGlmIHRoYXQgaXMgbmVlZGVkLlxuICAgIC8vIHdvcmtJblByb2dyZXNzLnBlbmRpbmdXb3JrUHJpb3JpdHkgPSBjdXJyZW50LnBlbmRpbmdXb3JrUHJpb3JpdHk7XG4gICAgLy8gVE9ETzogVGhlIGJlbG93IHByaW9yaXR5IHVzZWQgdG8gYmUgc2V0IHRvIE5vV29yayB3aGljaCB3b3VsZCd2ZVxuICAgIC8vIGRyb3BwZWQgd29yay4gVGhpcyBpcyBjdXJyZW50bHkgdW5vYnNlcnZhYmxlIGJ1dCB3aWxsIGJlY29tZVxuICAgIC8vIG9ic2VydmFibGUgd2hlbiB0aGUgZmlyc3Qgc2libGluZyBoYXMgbG93ZXIgcHJpb3JpdHkgd29yayByZW1haW5pbmdcbiAgICAvLyB0aGFuIHRoZSBuZXh0IHNpYmxpbmcuIEF0IHRoYXQgcG9pbnQgd2Ugc2hvdWxkIGFkZCB0ZXN0cyB0aGF0IGNhdGNoZXNcbiAgICAvLyB0aGlzLlxuICAgIHZhciBuZXdDaGlsZCA9IGNsb25lRmliZXIoY3VycmVudENoaWxkLCBjdXJyZW50Q2hpbGQucGVuZGluZ1dvcmtQcmlvcml0eSk7XG4gICAgd29ya0luUHJvZ3Jlc3MuY2hpbGQgPSBuZXdDaGlsZDtcbiAgICBjbG9uZVNpYmxpbmdzKGN1cnJlbnRDaGlsZCwgbmV3Q2hpbGQsIHdvcmtJblByb2dyZXNzKTtcbiAgfVxuXG4gIC8vIElmIHRoZXJlIGlzIG5vIGFsdGVybmF0ZSwgdGhlbiB3ZSBkb24ndCBuZWVkIHRvIGNsb25lIHRoZSBjaGlsZHJlbi5cbiAgLy8gSWYgdGhlIGNoaWxkcmVuIG9mIHRoZSBhbHRlcm5hdGUgZmliZXIgaXMgYSBkaWZmZXJlbnQgc2V0LCB0aGVuIHdlIGRvbid0XG4gIC8vIG5lZWQgdG8gY2xvbmUuIFdlIG5lZWQgdG8gcmVzZXQgdGhlIHJldHVybiBmaWJlciB0aG91Z2ggc2luY2Ugd2UnbGxcbiAgLy8gdHJhdmVyc2UgZG93biBpbnRvIHRoZW0uXG4gIHZhciBjaGlsZCA9IHdvcmtJblByb2dyZXNzLmNoaWxkO1xuICB3aGlsZSAoY2hpbGQpIHtcbiAgICBjaGlsZFsncmV0dXJuJ10gPSB3b3JrSW5Qcm9ncmVzcztcbiAgICBjaGlsZCA9IGNoaWxkLnNpYmxpbmc7XG4gIH1cbn07Il19