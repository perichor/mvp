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

var ReactOwner = require('./ReactOwner');

var ReactRef = {};

function attachRef(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(component.getPublicInstance());
  } else {
    // Legacy ref
    ReactOwner.addComponentAsRefTo(component, ref, owner);
  }
}

function detachRef(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(null);
  } else {
    // Legacy ref
    ReactOwner.removeComponentAsRefFrom(component, ref, owner);
  }
}

ReactRef.attachRefs = function (instance, element) {
  if (element === null || (typeof element === 'undefined' ? 'undefined' : _typeof(element)) !== 'object') {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    attachRef(ref, instance, element._owner);
  }
};

ReactRef.shouldUpdateRefs = function (prevElement, nextElement) {
  // If either the owner or a `ref` has changed, make sure the newest owner
  // has stored a reference to `this`, and the previous owner (if different)
  // has forgotten the reference to `this`. We use the element instead
  // of the public this.props because the post processing cannot determine
  // a ref. The ref conceptually lives on the element.

  // TODO: Should this even be possible? The owner cannot change because
  // it's forbidden by shouldUpdateReactComponent. The ref can change
  // if you swap the keys of but not the refs. Reconsider where this check
  // is made. It probably belongs where the key checking and
  // instantiateReactComponent is done.

  var prevRef = null;
  var prevOwner = null;
  if (prevElement !== null && (typeof prevElement === 'undefined' ? 'undefined' : _typeof(prevElement)) === 'object') {
    prevRef = prevElement.ref;
    prevOwner = prevElement._owner;
  }

  var nextRef = null;
  var nextOwner = null;
  if (nextElement !== null && (typeof nextElement === 'undefined' ? 'undefined' : _typeof(nextElement)) === 'object') {
    nextRef = nextElement.ref;
    nextOwner = nextElement._owner;
  }

  return prevRef !== nextRef ||
  // If owner changes but we have an unchanged function ref, don't update refs
  typeof nextRef === 'string' && nextOwner !== prevOwner;
};

ReactRef.detachRefs = function (instance, element) {
  if (element === null || (typeof element === 'undefined' ? 'undefined' : _typeof(element)) !== 'object') {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    detachRef(ref, instance, element._owner);
  }
};

module.exports = ReactRef;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdFJlZi5qcyJdLCJuYW1lcyI6WyJSZWFjdE93bmVyIiwicmVxdWlyZSIsIlJlYWN0UmVmIiwiYXR0YWNoUmVmIiwicmVmIiwiY29tcG9uZW50Iiwib3duZXIiLCJnZXRQdWJsaWNJbnN0YW5jZSIsImFkZENvbXBvbmVudEFzUmVmVG8iLCJkZXRhY2hSZWYiLCJyZW1vdmVDb21wb25lbnRBc1JlZkZyb20iLCJhdHRhY2hSZWZzIiwiaW5zdGFuY2UiLCJlbGVtZW50IiwiX293bmVyIiwic2hvdWxkVXBkYXRlUmVmcyIsInByZXZFbGVtZW50IiwibmV4dEVsZW1lbnQiLCJwcmV2UmVmIiwicHJldk93bmVyIiwibmV4dFJlZiIsIm5leHRPd25lciIsImRldGFjaFJlZnMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTs7OztBQUVBLElBQUlBLGFBQWFDLFFBQVEsY0FBUixDQUFqQjs7QUFFQSxJQUFJQyxXQUFXLEVBQWY7O0FBRUEsU0FBU0MsU0FBVCxDQUFtQkMsR0FBbkIsRUFBd0JDLFNBQXhCLEVBQW1DQyxLQUFuQyxFQUEwQztBQUN4QyxNQUFJLE9BQU9GLEdBQVAsS0FBZSxVQUFuQixFQUErQjtBQUM3QkEsUUFBSUMsVUFBVUUsaUJBQVYsRUFBSjtBQUNELEdBRkQsTUFFTztBQUNMO0FBQ0FQLGVBQVdRLG1CQUFYLENBQStCSCxTQUEvQixFQUEwQ0QsR0FBMUMsRUFBK0NFLEtBQS9DO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTRyxTQUFULENBQW1CTCxHQUFuQixFQUF3QkMsU0FBeEIsRUFBbUNDLEtBQW5DLEVBQTBDO0FBQ3hDLE1BQUksT0FBT0YsR0FBUCxLQUFlLFVBQW5CLEVBQStCO0FBQzdCQSxRQUFJLElBQUo7QUFDRCxHQUZELE1BRU87QUFDTDtBQUNBSixlQUFXVSx3QkFBWCxDQUFvQ0wsU0FBcEMsRUFBK0NELEdBQS9DLEVBQW9ERSxLQUFwRDtBQUNEO0FBQ0Y7O0FBRURKLFNBQVNTLFVBQVQsR0FBc0IsVUFBVUMsUUFBVixFQUFvQkMsT0FBcEIsRUFBNkI7QUFDakQsTUFBSUEsWUFBWSxJQUFaLElBQW9CLFFBQU9BLE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBM0MsRUFBcUQ7QUFDbkQ7QUFDRDtBQUNELE1BQUlULE1BQU1TLFFBQVFULEdBQWxCO0FBQ0EsTUFBSUEsT0FBTyxJQUFYLEVBQWlCO0FBQ2ZELGNBQVVDLEdBQVYsRUFBZVEsUUFBZixFQUF5QkMsUUFBUUMsTUFBakM7QUFDRDtBQUNGLENBUkQ7O0FBVUFaLFNBQVNhLGdCQUFULEdBQTRCLFVBQVVDLFdBQVYsRUFBdUJDLFdBQXZCLEVBQW9DO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFJQyxVQUFVLElBQWQ7QUFDQSxNQUFJQyxZQUFZLElBQWhCO0FBQ0EsTUFBSUgsZ0JBQWdCLElBQWhCLElBQXdCLFFBQU9BLFdBQVAseUNBQU9BLFdBQVAsT0FBdUIsUUFBbkQsRUFBNkQ7QUFDM0RFLGNBQVVGLFlBQVlaLEdBQXRCO0FBQ0FlLGdCQUFZSCxZQUFZRixNQUF4QjtBQUNEOztBQUVELE1BQUlNLFVBQVUsSUFBZDtBQUNBLE1BQUlDLFlBQVksSUFBaEI7QUFDQSxNQUFJSixnQkFBZ0IsSUFBaEIsSUFBd0IsUUFBT0EsV0FBUCx5Q0FBT0EsV0FBUCxPQUF1QixRQUFuRCxFQUE2RDtBQUMzREcsY0FBVUgsWUFBWWIsR0FBdEI7QUFDQWlCLGdCQUFZSixZQUFZSCxNQUF4QjtBQUNEOztBQUVELFNBQU9JLFlBQVlFLE9BQVo7QUFDUDtBQUNBLFNBQU9BLE9BQVAsS0FBbUIsUUFBbkIsSUFBK0JDLGNBQWNGLFNBRjdDO0FBR0QsQ0E5QkQ7O0FBZ0NBakIsU0FBU29CLFVBQVQsR0FBc0IsVUFBVVYsUUFBVixFQUFvQkMsT0FBcEIsRUFBNkI7QUFDakQsTUFBSUEsWUFBWSxJQUFaLElBQW9CLFFBQU9BLE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBM0MsRUFBcUQ7QUFDbkQ7QUFDRDtBQUNELE1BQUlULE1BQU1TLFFBQVFULEdBQWxCO0FBQ0EsTUFBSUEsT0FBTyxJQUFYLEVBQWlCO0FBQ2ZLLGNBQVVMLEdBQVYsRUFBZVEsUUFBZixFQUF5QkMsUUFBUUMsTUFBakM7QUFDRDtBQUNGLENBUkQ7O0FBVUFTLE9BQU9DLE9BQVAsR0FBaUJ0QixRQUFqQiIsImZpbGUiOiJSZWFjdFJlZi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0T3duZXInKTtcblxudmFyIFJlYWN0UmVmID0ge307XG5cbmZ1bmN0aW9uIGF0dGFjaFJlZihyZWYsIGNvbXBvbmVudCwgb3duZXIpIHtcbiAgaWYgKHR5cGVvZiByZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZWYoY29tcG9uZW50LmdldFB1YmxpY0luc3RhbmNlKCkpO1xuICB9IGVsc2Uge1xuICAgIC8vIExlZ2FjeSByZWZcbiAgICBSZWFjdE93bmVyLmFkZENvbXBvbmVudEFzUmVmVG8oY29tcG9uZW50LCByZWYsIG93bmVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZXRhY2hSZWYocmVmLCBjb21wb25lbnQsIG93bmVyKSB7XG4gIGlmICh0eXBlb2YgcmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmVmKG51bGwpO1xuICB9IGVsc2Uge1xuICAgIC8vIExlZ2FjeSByZWZcbiAgICBSZWFjdE93bmVyLnJlbW92ZUNvbXBvbmVudEFzUmVmRnJvbShjb21wb25lbnQsIHJlZiwgb3duZXIpO1xuICB9XG59XG5cblJlYWN0UmVmLmF0dGFjaFJlZnMgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQgPT09IG51bGwgfHwgdHlwZW9mIGVsZW1lbnQgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgaWYgKHJlZiAhPSBudWxsKSB7XG4gICAgYXR0YWNoUmVmKHJlZiwgaW5zdGFuY2UsIGVsZW1lbnQuX293bmVyKTtcbiAgfVxufTtcblxuUmVhY3RSZWYuc2hvdWxkVXBkYXRlUmVmcyA9IGZ1bmN0aW9uIChwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQpIHtcbiAgLy8gSWYgZWl0aGVyIHRoZSBvd25lciBvciBhIGByZWZgIGhhcyBjaGFuZ2VkLCBtYWtlIHN1cmUgdGhlIG5ld2VzdCBvd25lclxuICAvLyBoYXMgc3RvcmVkIGEgcmVmZXJlbmNlIHRvIGB0aGlzYCwgYW5kIHRoZSBwcmV2aW91cyBvd25lciAoaWYgZGlmZmVyZW50KVxuICAvLyBoYXMgZm9yZ290dGVuIHRoZSByZWZlcmVuY2UgdG8gYHRoaXNgLiBXZSB1c2UgdGhlIGVsZW1lbnQgaW5zdGVhZFxuICAvLyBvZiB0aGUgcHVibGljIHRoaXMucHJvcHMgYmVjYXVzZSB0aGUgcG9zdCBwcm9jZXNzaW5nIGNhbm5vdCBkZXRlcm1pbmVcbiAgLy8gYSByZWYuIFRoZSByZWYgY29uY2VwdHVhbGx5IGxpdmVzIG9uIHRoZSBlbGVtZW50LlxuXG4gIC8vIFRPRE86IFNob3VsZCB0aGlzIGV2ZW4gYmUgcG9zc2libGU/IFRoZSBvd25lciBjYW5ub3QgY2hhbmdlIGJlY2F1c2VcbiAgLy8gaXQncyBmb3JiaWRkZW4gYnkgc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQuIFRoZSByZWYgY2FuIGNoYW5nZVxuICAvLyBpZiB5b3Ugc3dhcCB0aGUga2V5cyBvZiBidXQgbm90IHRoZSByZWZzLiBSZWNvbnNpZGVyIHdoZXJlIHRoaXMgY2hlY2tcbiAgLy8gaXMgbWFkZS4gSXQgcHJvYmFibHkgYmVsb25ncyB3aGVyZSB0aGUga2V5IGNoZWNraW5nIGFuZFxuICAvLyBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50IGlzIGRvbmUuXG5cbiAgdmFyIHByZXZSZWYgPSBudWxsO1xuICB2YXIgcHJldk93bmVyID0gbnVsbDtcbiAgaWYgKHByZXZFbGVtZW50ICE9PSBudWxsICYmIHR5cGVvZiBwcmV2RWxlbWVudCA9PT0gJ29iamVjdCcpIHtcbiAgICBwcmV2UmVmID0gcHJldkVsZW1lbnQucmVmO1xuICAgIHByZXZPd25lciA9IHByZXZFbGVtZW50Ll9vd25lcjtcbiAgfVxuXG4gIHZhciBuZXh0UmVmID0gbnVsbDtcbiAgdmFyIG5leHRPd25lciA9IG51bGw7XG4gIGlmIChuZXh0RWxlbWVudCAhPT0gbnVsbCAmJiB0eXBlb2YgbmV4dEVsZW1lbnQgPT09ICdvYmplY3QnKSB7XG4gICAgbmV4dFJlZiA9IG5leHRFbGVtZW50LnJlZjtcbiAgICBuZXh0T3duZXIgPSBuZXh0RWxlbWVudC5fb3duZXI7XG4gIH1cblxuICByZXR1cm4gcHJldlJlZiAhPT0gbmV4dFJlZiB8fFxuICAvLyBJZiBvd25lciBjaGFuZ2VzIGJ1dCB3ZSBoYXZlIGFuIHVuY2hhbmdlZCBmdW5jdGlvbiByZWYsIGRvbid0IHVwZGF0ZSByZWZzXG4gIHR5cGVvZiBuZXh0UmVmID09PSAnc3RyaW5nJyAmJiBuZXh0T3duZXIgIT09IHByZXZPd25lcjtcbn07XG5cblJlYWN0UmVmLmRldGFjaFJlZnMgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQgPT09IG51bGwgfHwgdHlwZW9mIGVsZW1lbnQgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgaWYgKHJlZiAhPSBudWxsKSB7XG4gICAgZGV0YWNoUmVmKHJlZiwgaW5zdGFuY2UsIGVsZW1lbnQuX293bmVyKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFJlZjsiXX0=