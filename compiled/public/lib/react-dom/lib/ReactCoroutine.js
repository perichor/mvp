/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

// The Symbol used to tag the special React types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var REACT_COROUTINE_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.coroutine') || 0xeac8;

var REACT_YIELD_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.yield') || 0xeac9;

exports.createCoroutine = function (children, handler, props) {
  var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var coroutine = {
    // This tag allow us to uniquely identify this as a React Coroutine
    $$typeof: REACT_COROUTINE_TYPE,
    key: key == null ? null : '' + key,
    children: children,
    handler: handler,
    props: props
  };

  if (process.env.NODE_ENV !== 'production') {
    // TODO: Add _store property for marking this as validated.
    if (Object.freeze) {
      Object.freeze(coroutine.props);
      Object.freeze(coroutine);
    }
  }

  return coroutine;
};

exports.createYield = function (props, continuation) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var yieldNode = {
    // This tag allow us to uniquely identify this as a React Yield
    $$typeof: REACT_YIELD_TYPE,
    key: key == null ? null : '' + key,
    props: props,
    continuation: continuation
  };

  if (process.env.NODE_ENV !== 'production') {
    // TODO: Add _store property for marking this as validated.
    if (Object.freeze) {
      Object.freeze(yieldNode.props);
      Object.freeze(yieldNode);
    }
  }

  return yieldNode;
};

/**
 * Verifies the object is a coroutine object.
 */
exports.isCoroutine = function (object) {
  return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_COROUTINE_TYPE;
};

/**
 * Verifies the object is a yield object.
 */
exports.isYield = function (object) {
  return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_YIELD_TYPE;
};

exports.REACT_YIELD_TYPE = REACT_YIELD_TYPE;
exports.REACT_COROUTINE_TYPE = REACT_COROUTINE_TYPE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdENvcm91dGluZS5qcyJdLCJuYW1lcyI6WyJSRUFDVF9DT1JPVVRJTkVfVFlQRSIsIlN5bWJvbCIsIlJFQUNUX1lJRUxEX1RZUEUiLCJleHBvcnRzIiwiY3JlYXRlQ29yb3V0aW5lIiwiY2hpbGRyZW4iLCJoYW5kbGVyIiwicHJvcHMiLCJrZXkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJjb3JvdXRpbmUiLCIkJHR5cGVvZiIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIk9iamVjdCIsImZyZWV6ZSIsImNyZWF0ZVlpZWxkIiwiY29udGludWF0aW9uIiwieWllbGROb2RlIiwiaXNDb3JvdXRpbmUiLCJvYmplY3QiLCJpc1lpZWxkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQTtBQUNBOzs7O0FBQ0EsSUFBSUEsdUJBQXVCLE9BQU9DLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE9BQU8sS0FBUCxDQUFoQyxJQUFpREEsT0FBTyxLQUFQLEVBQWMsaUJBQWQsQ0FBakQsSUFBcUYsTUFBaEg7O0FBRUEsSUFBSUMsbUJBQW1CLE9BQU9ELE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE9BQU8sS0FBUCxDQUFoQyxJQUFpREEsT0FBTyxLQUFQLEVBQWMsYUFBZCxDQUFqRCxJQUFpRixNQUF4Rzs7QUFFQUUsUUFBUUMsZUFBUixHQUEwQixVQUFVQyxRQUFWLEVBQW9CQyxPQUFwQixFQUE2QkMsS0FBN0IsRUFBb0M7QUFDNUQsTUFBSUMsTUFBTUMsVUFBVUMsTUFBVixHQUFtQixDQUFuQixJQUF3QkQsVUFBVSxDQUFWLE1BQWlCRSxTQUF6QyxHQUFxREYsVUFBVSxDQUFWLENBQXJELEdBQW9FLElBQTlFOztBQUVBLE1BQUlHLFlBQVk7QUFDZDtBQUNBQyxjQUFVYixvQkFGSTtBQUdkUSxTQUFLQSxPQUFPLElBQVAsR0FBYyxJQUFkLEdBQXFCLEtBQUtBLEdBSGpCO0FBSWRILGNBQVVBLFFBSkk7QUFLZEMsYUFBU0EsT0FMSztBQU1kQyxXQUFPQTtBQU5PLEdBQWhCOztBQVNBLE1BQUlPLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QztBQUNBLFFBQUlDLE9BQU9DLE1BQVgsRUFBbUI7QUFDakJELGFBQU9DLE1BQVAsQ0FBY04sVUFBVUwsS0FBeEI7QUFDQVUsYUFBT0MsTUFBUCxDQUFjTixTQUFkO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPQSxTQUFQO0FBQ0QsQ0FyQkQ7O0FBdUJBVCxRQUFRZ0IsV0FBUixHQUFzQixVQUFVWixLQUFWLEVBQWlCYSxZQUFqQixFQUErQjtBQUNuRCxNQUFJWixNQUFNQyxVQUFVQyxNQUFWLEdBQW1CLENBQW5CLElBQXdCRCxVQUFVLENBQVYsTUFBaUJFLFNBQXpDLEdBQXFERixVQUFVLENBQVYsQ0FBckQsR0FBb0UsSUFBOUU7O0FBRUEsTUFBSVksWUFBWTtBQUNkO0FBQ0FSLGNBQVVYLGdCQUZJO0FBR2RNLFNBQUtBLE9BQU8sSUFBUCxHQUFjLElBQWQsR0FBcUIsS0FBS0EsR0FIakI7QUFJZEQsV0FBT0EsS0FKTztBQUtkYSxrQkFBY0E7QUFMQSxHQUFoQjs7QUFRQSxNQUFJTixRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekM7QUFDQSxRQUFJQyxPQUFPQyxNQUFYLEVBQW1CO0FBQ2pCRCxhQUFPQyxNQUFQLENBQWNHLFVBQVVkLEtBQXhCO0FBQ0FVLGFBQU9DLE1BQVAsQ0FBY0csU0FBZDtBQUNEO0FBQ0Y7O0FBRUQsU0FBT0EsU0FBUDtBQUNELENBcEJEOztBQXNCQTs7O0FBR0FsQixRQUFRbUIsV0FBUixHQUFzQixVQUFVQyxNQUFWLEVBQWtCO0FBQ3RDLFNBQU8sUUFBT0EsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixJQUE4QkEsV0FBVyxJQUF6QyxJQUFpREEsT0FBT1YsUUFBUCxLQUFvQmIsb0JBQTVFO0FBQ0QsQ0FGRDs7QUFJQTs7O0FBR0FHLFFBQVFxQixPQUFSLEdBQWtCLFVBQVVELE1BQVYsRUFBa0I7QUFDbEMsU0FBTyxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCQSxXQUFXLElBQXpDLElBQWlEQSxPQUFPVixRQUFQLEtBQW9CWCxnQkFBNUU7QUFDRCxDQUZEOztBQUlBQyxRQUFRRCxnQkFBUixHQUEyQkEsZ0JBQTNCO0FBQ0FDLFFBQVFILG9CQUFSLEdBQStCQSxvQkFBL0IiLCJmaWxlIjoiUmVhY3RDb3JvdXRpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIHNwZWNpYWwgUmVhY3QgdHlwZXMuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbnZhciBSRUFDVF9DT1JPVVRJTkVfVFlQRSA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sWydmb3InXSAmJiBTeW1ib2xbJ2ZvciddKCdyZWFjdC5jb3JvdXRpbmUnKSB8fCAweGVhYzg7XG5cbnZhciBSRUFDVF9ZSUVMRF9UWVBFID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2xbJ2ZvciddICYmIFN5bWJvbFsnZm9yJ10oJ3JlYWN0LnlpZWxkJykgfHwgMHhlYWM5O1xuXG5leHBvcnRzLmNyZWF0ZUNvcm91dGluZSA9IGZ1bmN0aW9uIChjaGlsZHJlbiwgaGFuZGxlciwgcHJvcHMpIHtcbiAgdmFyIGtleSA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogbnVsbDtcblxuICB2YXIgY29yb3V0aW5lID0ge1xuICAgIC8vIFRoaXMgdGFnIGFsbG93IHVzIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgYXMgYSBSZWFjdCBDb3JvdXRpbmVcbiAgICAkJHR5cGVvZjogUkVBQ1RfQ09ST1VUSU5FX1RZUEUsXG4gICAga2V5OiBrZXkgPT0gbnVsbCA/IG51bGwgOiAnJyArIGtleSxcbiAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICBwcm9wczogcHJvcHNcbiAgfTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIC8vIFRPRE86IEFkZCBfc3RvcmUgcHJvcGVydHkgZm9yIG1hcmtpbmcgdGhpcyBhcyB2YWxpZGF0ZWQuXG4gICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgIE9iamVjdC5mcmVlemUoY29yb3V0aW5lLnByb3BzKTtcbiAgICAgIE9iamVjdC5mcmVlemUoY29yb3V0aW5lKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29yb3V0aW5lO1xufTtcblxuZXhwb3J0cy5jcmVhdGVZaWVsZCA9IGZ1bmN0aW9uIChwcm9wcywgY29udGludWF0aW9uKSB7XG4gIHZhciBrZXkgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IG51bGw7XG5cbiAgdmFyIHlpZWxkTm9kZSA9IHtcbiAgICAvLyBUaGlzIHRhZyBhbGxvdyB1cyB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzIGFzIGEgUmVhY3QgWWllbGRcbiAgICAkJHR5cGVvZjogUkVBQ1RfWUlFTERfVFlQRSxcbiAgICBrZXk6IGtleSA9PSBudWxsID8gbnVsbCA6ICcnICsga2V5LFxuICAgIHByb3BzOiBwcm9wcyxcbiAgICBjb250aW51YXRpb246IGNvbnRpbnVhdGlvblxuICB9O1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gVE9ETzogQWRkIF9zdG9yZSBwcm9wZXJ0eSBmb3IgbWFya2luZyB0aGlzIGFzIHZhbGlkYXRlZC5cbiAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgT2JqZWN0LmZyZWV6ZSh5aWVsZE5vZGUucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZSh5aWVsZE5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB5aWVsZE5vZGU7XG59O1xuXG4vKipcbiAqIFZlcmlmaWVzIHRoZSBvYmplY3QgaXMgYSBjb3JvdXRpbmUgb2JqZWN0LlxuICovXG5leHBvcnRzLmlzQ29yb3V0aW5lID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09ST1VUSU5FX1RZUEU7XG59O1xuXG4vKipcbiAqIFZlcmlmaWVzIHRoZSBvYmplY3QgaXMgYSB5aWVsZCBvYmplY3QuXG4gKi9cbmV4cG9ydHMuaXNZaWVsZCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX1lJRUxEX1RZUEU7XG59O1xuXG5leHBvcnRzLlJFQUNUX1lJRUxEX1RZUEUgPSBSRUFDVF9ZSUVMRF9UWVBFO1xuZXhwb3J0cy5SRUFDVF9DT1JPVVRJTkVfVFlQRSA9IFJFQUNUX0NPUk9VVElORV9UWVBFOyJdfQ==