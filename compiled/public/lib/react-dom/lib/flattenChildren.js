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

var KeyEscapeUtils = require('./KeyEscapeUtils');
var traverseAllChildren = require('./traverseAllChildren');
var warning = require('fbjs/lib/warning');

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = require('react/lib/ReactComponentTreeHook');
}

/**
 * @param {function} traverseContext Context passed through traversal.
 * @param {?ReactComponent} child React child component.
 * @param {!string} name String name of key path to child.
 * @param {number=} selfDebugID Optional debugID of the current internal instance.
 */
function flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID) {
  // We found a component instance.
  if (traverseContext && (typeof traverseContext === 'undefined' ? 'undefined' : _typeof(traverseContext)) === 'object') {
    var result = traverseContext;
    var keyUnique = result[name] === undefined;
    if (process.env.NODE_ENV !== 'production') {
      if (!ReactComponentTreeHook) {
        ReactComponentTreeHook = require('react/lib/ReactComponentTreeHook');
      }
      if (!keyUnique) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.%s', KeyEscapeUtils.unescape(name), ReactComponentTreeHook.getStackAddendumByID(selfDebugID)) : void 0;
      }
    }
    if (keyUnique && child != null) {
      result[name] = child;
    }
  }
}

/**
 * Flattens children that are typically specified as `props.children`. Any null
 * children will not be included in the resulting object.
 * @return {!object} flattened children keyed by name.
 */
function flattenChildren(children, selfDebugID) {
  if (children == null) {
    return children;
  }
  var result = {};

  if (process.env.NODE_ENV !== 'production') {
    traverseAllChildren(children, function (traverseContext, child, name) {
      return flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID);
    }, result);
  } else {
    traverseAllChildren(children, flattenSingleChildIntoContext, result);
  }
  return result;
}

module.exports = flattenChildren;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9mbGF0dGVuQ2hpbGRyZW4uanMiXSwibmFtZXMiOlsiS2V5RXNjYXBlVXRpbHMiLCJyZXF1aXJlIiwidHJhdmVyc2VBbGxDaGlsZHJlbiIsIndhcm5pbmciLCJSZWFjdENvbXBvbmVudFRyZWVIb29rIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiZmxhdHRlblNpbmdsZUNoaWxkSW50b0NvbnRleHQiLCJ0cmF2ZXJzZUNvbnRleHQiLCJjaGlsZCIsIm5hbWUiLCJzZWxmRGVidWdJRCIsInJlc3VsdCIsImtleVVuaXF1ZSIsInVuZGVmaW5lZCIsInVuZXNjYXBlIiwiZ2V0U3RhY2tBZGRlbmR1bUJ5SUQiLCJmbGF0dGVuQ2hpbGRyZW4iLCJjaGlsZHJlbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQVdBOzs7O0FBRUEsSUFBSUEsaUJBQWlCQyxRQUFRLGtCQUFSLENBQXJCO0FBQ0EsSUFBSUMsc0JBQXNCRCxRQUFRLHVCQUFSLENBQTFCO0FBQ0EsSUFBSUUsVUFBVUYsUUFBUSxrQkFBUixDQUFkOztBQUVBLElBQUlHLHNCQUFKOztBQUVBLElBQUksT0FBT0MsT0FBUCxLQUFtQixXQUFuQixJQUFrQ0EsUUFBUUMsR0FBMUMsSUFBaURELFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixNQUE5RSxFQUFzRjtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FILDJCQUF5QkgsUUFBUSxrQ0FBUixDQUF6QjtBQUNEOztBQUVEOzs7Ozs7QUFNQSxTQUFTTyw2QkFBVCxDQUF1Q0MsZUFBdkMsRUFBd0RDLEtBQXhELEVBQStEQyxJQUEvRCxFQUFxRUMsV0FBckUsRUFBa0Y7QUFDaEY7QUFDQSxNQUFJSCxtQkFBbUIsUUFBT0EsZUFBUCx5Q0FBT0EsZUFBUCxPQUEyQixRQUFsRCxFQUE0RDtBQUMxRCxRQUFJSSxTQUFTSixlQUFiO0FBQ0EsUUFBSUssWUFBWUQsT0FBT0YsSUFBUCxNQUFpQkksU0FBakM7QUFDQSxRQUFJVixRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMsVUFBSSxDQUFDSCxzQkFBTCxFQUE2QjtBQUMzQkEsaUNBQXlCSCxRQUFRLGtDQUFSLENBQXpCO0FBQ0Q7QUFDRCxVQUFJLENBQUNhLFNBQUwsRUFBZ0I7QUFDZFQsZ0JBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUF6QixHQUF3Q0osUUFBUSxLQUFSLEVBQWUsdUVBQXVFLHVFQUF2RSxHQUFpSixpQ0FBaEssRUFBbU1ILGVBQWVnQixRQUFmLENBQXdCTCxJQUF4QixDQUFuTSxFQUFrT1AsdUJBQXVCYSxvQkFBdkIsQ0FBNENMLFdBQTVDLENBQWxPLENBQXhDLEdBQXNVLEtBQUssQ0FBM1U7QUFDRDtBQUNGO0FBQ0QsUUFBSUUsYUFBYUosU0FBUyxJQUExQixFQUFnQztBQUM5QkcsYUFBT0YsSUFBUCxJQUFlRCxLQUFmO0FBQ0Q7QUFDRjtBQUNGOztBQUVEOzs7OztBQUtBLFNBQVNRLGVBQVQsQ0FBeUJDLFFBQXpCLEVBQW1DUCxXQUFuQyxFQUFnRDtBQUM5QyxNQUFJTyxZQUFZLElBQWhCLEVBQXNCO0FBQ3BCLFdBQU9BLFFBQVA7QUFDRDtBQUNELE1BQUlOLFNBQVMsRUFBYjs7QUFFQSxNQUFJUixRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNMLHdCQUFvQmlCLFFBQXBCLEVBQThCLFVBQVVWLGVBQVYsRUFBMkJDLEtBQTNCLEVBQWtDQyxJQUFsQyxFQUF3QztBQUNwRSxhQUFPSCw4QkFBOEJDLGVBQTlCLEVBQStDQyxLQUEvQyxFQUFzREMsSUFBdEQsRUFBNERDLFdBQTVELENBQVA7QUFDRCxLQUZELEVBRUdDLE1BRkg7QUFHRCxHQUpELE1BSU87QUFDTFgsd0JBQW9CaUIsUUFBcEIsRUFBOEJYLDZCQUE5QixFQUE2REssTUFBN0Q7QUFDRDtBQUNELFNBQU9BLE1BQVA7QUFDRDs7QUFFRE8sT0FBT0MsT0FBUCxHQUFpQkgsZUFBakIiLCJmaWxlIjoiZmxhdHRlbkNoaWxkcmVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgS2V5RXNjYXBlVXRpbHMgPSByZXF1aXJlKCcuL0tleUVzY2FwZVV0aWxzJyk7XG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IHJlcXVpcmUoJy4vdHJhdmVyc2VBbGxDaGlsZHJlbicpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rO1xuXG5pZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcpIHtcbiAgLy8gVGVtcG9yYXJ5IGhhY2suXG4gIC8vIElubGluZSByZXF1aXJlcyBkb24ndCB3b3JrIHdlbGwgd2l0aCBKZXN0OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzcyNDBcbiAgLy8gUmVtb3ZlIHRoZSBpbmxpbmUgcmVxdWlyZXMgd2hlbiB3ZSBkb24ndCBuZWVkIHRoZW0gYW55bW9yZTpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvNzE3OFxuICBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0Q29tcG9uZW50VHJlZUhvb2snKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBwYXNzZWQgdGhyb3VnaCB0cmF2ZXJzYWwuXG4gKiBAcGFyYW0gez9SZWFjdENvbXBvbmVudH0gY2hpbGQgUmVhY3QgY2hpbGQgY29tcG9uZW50LlxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lIFN0cmluZyBuYW1lIG9mIGtleSBwYXRoIHRvIGNoaWxkLlxuICogQHBhcmFtIHtudW1iZXI9fSBzZWxmRGVidWdJRCBPcHRpb25hbCBkZWJ1Z0lEIG9mIHRoZSBjdXJyZW50IGludGVybmFsIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBmbGF0dGVuU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkLCBuYW1lLCBzZWxmRGVidWdJRCkge1xuICAvLyBXZSBmb3VuZCBhIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAgaWYgKHRyYXZlcnNlQ29udGV4dCAmJiB0eXBlb2YgdHJhdmVyc2VDb250ZXh0ID09PSAnb2JqZWN0Jykge1xuICAgIHZhciByZXN1bHQgPSB0cmF2ZXJzZUNvbnRleHQ7XG4gICAgdmFyIGtleVVuaXF1ZSA9IHJlc3VsdFtuYW1lXSA9PT0gdW5kZWZpbmVkO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoIVJlYWN0Q29tcG9uZW50VHJlZUhvb2spIHtcbiAgICAgICAgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudFRyZWVIb29rJyk7XG4gICAgICB9XG4gICAgICBpZiAoIWtleVVuaXF1ZSkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2ZsYXR0ZW5DaGlsZHJlbiguLi4pOiBFbmNvdW50ZXJlZCB0d28gY2hpbGRyZW4gd2l0aCB0aGUgc2FtZSBrZXksICcgKyAnYCVzYC4gQ2hpbGQga2V5cyBtdXN0IGJlIHVuaXF1ZTsgd2hlbiB0d28gY2hpbGRyZW4gc2hhcmUgYSBrZXksIG9ubHkgJyArICd0aGUgZmlyc3QgY2hpbGQgd2lsbCBiZSB1c2VkLiVzJywgS2V5RXNjYXBlVXRpbHMudW5lc2NhcGUobmFtZSksIFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0U3RhY2tBZGRlbmR1bUJ5SUQoc2VsZkRlYnVnSUQpKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGtleVVuaXF1ZSAmJiBjaGlsZCAhPSBudWxsKSB7XG4gICAgICByZXN1bHRbbmFtZV0gPSBjaGlsZDtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBGbGF0dGVucyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuIEFueSBudWxsXG4gKiBjaGlsZHJlbiB3aWxsIG5vdCBiZSBpbmNsdWRlZCBpbiB0aGUgcmVzdWx0aW5nIG9iamVjdC5cbiAqIEByZXR1cm4geyFvYmplY3R9IGZsYXR0ZW5lZCBjaGlsZHJlbiBrZXllZCBieSBuYW1lLlxuICovXG5mdW5jdGlvbiBmbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW4sIHNlbGZEZWJ1Z0lEKSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciByZXN1bHQgPSB7fTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmN0aW9uICh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkLCBuYW1lKSB7XG4gICAgICByZXR1cm4gZmxhdHRlblNpbmdsZUNoaWxkSW50b0NvbnRleHQodHJhdmVyc2VDb250ZXh0LCBjaGlsZCwgbmFtZSwgc2VsZkRlYnVnSUQpO1xuICAgIH0sIHJlc3VsdCk7XG4gIH0gZWxzZSB7XG4gICAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZmxhdHRlblNpbmdsZUNoaWxkSW50b0NvbnRleHQsIHJlc3VsdCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmbGF0dGVuQ2hpbGRyZW47Il19