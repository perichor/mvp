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

/**
 * CSS properties which accept numbers but are not in units of "px".
 */

var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundAttachment: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundRepeat: true
  },
  backgroundPosition: {
    backgroundPositionX: true,
    backgroundPositionY: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  },
  outline: {
    outlineWidth: true,
    outlineStyle: true,
    outlineColor: true
  }
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

module.exports = CSSProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9DU1NQcm9wZXJ0eS5qcyJdLCJuYW1lcyI6WyJpc1VuaXRsZXNzTnVtYmVyIiwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQiLCJib3JkZXJJbWFnZU91dHNldCIsImJvcmRlckltYWdlU2xpY2UiLCJib3JkZXJJbWFnZVdpZHRoIiwiYm94RmxleCIsImJveEZsZXhHcm91cCIsImJveE9yZGluYWxHcm91cCIsImNvbHVtbkNvdW50IiwiZmxleCIsImZsZXhHcm93IiwiZmxleFBvc2l0aXZlIiwiZmxleFNocmluayIsImZsZXhOZWdhdGl2ZSIsImZsZXhPcmRlciIsImdyaWRSb3ciLCJncmlkQ29sdW1uIiwiZm9udFdlaWdodCIsImxpbmVDbGFtcCIsImxpbmVIZWlnaHQiLCJvcGFjaXR5Iiwib3JkZXIiLCJvcnBoYW5zIiwidGFiU2l6ZSIsIndpZG93cyIsInpJbmRleCIsInpvb20iLCJmaWxsT3BhY2l0eSIsImZsb29kT3BhY2l0eSIsInN0b3BPcGFjaXR5Iiwic3Ryb2tlRGFzaGFycmF5Iiwic3Ryb2tlRGFzaG9mZnNldCIsInN0cm9rZU1pdGVybGltaXQiLCJzdHJva2VPcGFjaXR5Iiwic3Ryb2tlV2lkdGgiLCJwcmVmaXhLZXkiLCJwcmVmaXgiLCJrZXkiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsInByZWZpeGVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJwcm9wIiwic2hvcnRoYW5kUHJvcGVydHlFeHBhbnNpb25zIiwiYmFja2dyb3VuZCIsImJhY2tncm91bmRBdHRhY2htZW50IiwiYmFja2dyb3VuZENvbG9yIiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZFBvc2l0aW9uWCIsImJhY2tncm91bmRQb3NpdGlvblkiLCJiYWNrZ3JvdW5kUmVwZWF0IiwiYmFja2dyb3VuZFBvc2l0aW9uIiwiYm9yZGVyIiwiYm9yZGVyV2lkdGgiLCJib3JkZXJTdHlsZSIsImJvcmRlckNvbG9yIiwiYm9yZGVyQm90dG9tIiwiYm9yZGVyQm90dG9tV2lkdGgiLCJib3JkZXJCb3R0b21TdHlsZSIsImJvcmRlckJvdHRvbUNvbG9yIiwiYm9yZGVyTGVmdCIsImJvcmRlckxlZnRXaWR0aCIsImJvcmRlckxlZnRTdHlsZSIsImJvcmRlckxlZnRDb2xvciIsImJvcmRlclJpZ2h0IiwiYm9yZGVyUmlnaHRXaWR0aCIsImJvcmRlclJpZ2h0U3R5bGUiLCJib3JkZXJSaWdodENvbG9yIiwiYm9yZGVyVG9wIiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJUb3BTdHlsZSIsImJvcmRlclRvcENvbG9yIiwiZm9udCIsImZvbnRTdHlsZSIsImZvbnRWYXJpYW50IiwiZm9udFNpemUiLCJmb250RmFtaWx5Iiwib3V0bGluZSIsIm91dGxpbmVXaWR0aCIsIm91dGxpbmVTdHlsZSIsIm91dGxpbmVDb2xvciIsIkNTU1Byb3BlcnR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7QUFFQTs7OztBQUlBLElBQUlBLG1CQUFtQjtBQUNyQkMsMkJBQXlCLElBREo7QUFFckJDLHFCQUFtQixJQUZFO0FBR3JCQyxvQkFBa0IsSUFIRztBQUlyQkMsb0JBQWtCLElBSkc7QUFLckJDLFdBQVMsSUFMWTtBQU1yQkMsZ0JBQWMsSUFOTztBQU9yQkMsbUJBQWlCLElBUEk7QUFRckJDLGVBQWEsSUFSUTtBQVNyQkMsUUFBTSxJQVRlO0FBVXJCQyxZQUFVLElBVlc7QUFXckJDLGdCQUFjLElBWE87QUFZckJDLGNBQVksSUFaUztBQWFyQkMsZ0JBQWMsSUFiTztBQWNyQkMsYUFBVyxJQWRVO0FBZXJCQyxXQUFTLElBZlk7QUFnQnJCQyxjQUFZLElBaEJTO0FBaUJyQkMsY0FBWSxJQWpCUztBQWtCckJDLGFBQVcsSUFsQlU7QUFtQnJCQyxjQUFZLElBbkJTO0FBb0JyQkMsV0FBUyxJQXBCWTtBQXFCckJDLFNBQU8sSUFyQmM7QUFzQnJCQyxXQUFTLElBdEJZO0FBdUJyQkMsV0FBUyxJQXZCWTtBQXdCckJDLFVBQVEsSUF4QmE7QUF5QnJCQyxVQUFRLElBekJhO0FBMEJyQkMsUUFBTSxJQTFCZTs7QUE0QnJCO0FBQ0FDLGVBQWEsSUE3QlE7QUE4QnJCQyxnQkFBYyxJQTlCTztBQStCckJDLGVBQWEsSUEvQlE7QUFnQ3JCQyxtQkFBaUIsSUFoQ0k7QUFpQ3JCQyxvQkFBa0IsSUFqQ0c7QUFrQ3JCQyxvQkFBa0IsSUFsQ0c7QUFtQ3JCQyxpQkFBZSxJQW5DTTtBQW9DckJDLGVBQWE7QUFwQ1EsQ0FBdkI7O0FBdUNBOzs7Ozs7QUFNQSxTQUFTQyxTQUFULENBQW1CQyxNQUFuQixFQUEyQkMsR0FBM0IsRUFBZ0M7QUFDOUIsU0FBT0QsU0FBU0MsSUFBSUMsTUFBSixDQUFXLENBQVgsRUFBY0MsV0FBZCxFQUFULEdBQXVDRixJQUFJRyxTQUFKLENBQWMsQ0FBZCxDQUE5QztBQUNEOztBQUVEOzs7O0FBSUEsSUFBSUMsV0FBVyxDQUFDLFFBQUQsRUFBVyxJQUFYLEVBQWlCLEtBQWpCLEVBQXdCLEdBQXhCLENBQWY7O0FBRUE7QUFDQTtBQUNBQyxPQUFPQyxJQUFQLENBQVkzQyxnQkFBWixFQUE4QjRDLE9BQTlCLENBQXNDLFVBQVVDLElBQVYsRUFBZ0I7QUFDcERKLFdBQVNHLE9BQVQsQ0FBaUIsVUFBVVIsTUFBVixFQUFrQjtBQUNqQ3BDLHFCQUFpQm1DLFVBQVVDLE1BQVYsRUFBa0JTLElBQWxCLENBQWpCLElBQTRDN0MsaUJBQWlCNkMsSUFBakIsQ0FBNUM7QUFDRCxHQUZEO0FBR0QsQ0FKRDs7QUFNQTs7Ozs7Ozs7O0FBU0EsSUFBSUMsOEJBQThCO0FBQ2hDQyxjQUFZO0FBQ1ZDLDBCQUFzQixJQURaO0FBRVZDLHFCQUFpQixJQUZQO0FBR1ZDLHFCQUFpQixJQUhQO0FBSVZDLHlCQUFxQixJQUpYO0FBS1ZDLHlCQUFxQixJQUxYO0FBTVZDLHNCQUFrQjtBQU5SLEdBRG9CO0FBU2hDQyxzQkFBb0I7QUFDbEJILHlCQUFxQixJQURIO0FBRWxCQyx5QkFBcUI7QUFGSCxHQVRZO0FBYWhDRyxVQUFRO0FBQ05DLGlCQUFhLElBRFA7QUFFTkMsaUJBQWEsSUFGUDtBQUdOQyxpQkFBYTtBQUhQLEdBYndCO0FBa0JoQ0MsZ0JBQWM7QUFDWkMsdUJBQW1CLElBRFA7QUFFWkMsdUJBQW1CLElBRlA7QUFHWkMsdUJBQW1CO0FBSFAsR0FsQmtCO0FBdUJoQ0MsY0FBWTtBQUNWQyxxQkFBaUIsSUFEUDtBQUVWQyxxQkFBaUIsSUFGUDtBQUdWQyxxQkFBaUI7QUFIUCxHQXZCb0I7QUE0QmhDQyxlQUFhO0FBQ1hDLHNCQUFrQixJQURQO0FBRVhDLHNCQUFrQixJQUZQO0FBR1hDLHNCQUFrQjtBQUhQLEdBNUJtQjtBQWlDaENDLGFBQVc7QUFDVEMsb0JBQWdCLElBRFA7QUFFVEMsb0JBQWdCLElBRlA7QUFHVEMsb0JBQWdCO0FBSFAsR0FqQ3FCO0FBc0NoQ0MsUUFBTTtBQUNKQyxlQUFXLElBRFA7QUFFSkMsaUJBQWEsSUFGVDtBQUdKNUQsZ0JBQVksSUFIUjtBQUlKNkQsY0FBVSxJQUpOO0FBS0ozRCxnQkFBWSxJQUxSO0FBTUo0RCxnQkFBWTtBQU5SLEdBdEMwQjtBQThDaENDLFdBQVM7QUFDUEMsa0JBQWMsSUFEUDtBQUVQQyxrQkFBYyxJQUZQO0FBR1BDLGtCQUFjO0FBSFA7QUE5Q3VCLENBQWxDOztBQXFEQSxJQUFJQyxjQUFjO0FBQ2hCcEYsb0JBQWtCQSxnQkFERjtBQUVoQjhDLCtCQUE2QkE7QUFGYixDQUFsQjs7QUFLQXVDLE9BQU9DLE9BQVAsR0FBaUJGLFdBQWpCIiwiZmlsZSI6IkNTU1Byb3BlcnR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDU1MgcHJvcGVydGllcyB3aGljaCBhY2NlcHQgbnVtYmVycyBidXQgYXJlIG5vdCBpbiB1bml0cyBvZiBcInB4XCIuXG4gKi9cblxudmFyIGlzVW5pdGxlc3NOdW1iZXIgPSB7XG4gIGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiB0cnVlLFxuICBib3JkZXJJbWFnZU91dHNldDogdHJ1ZSxcbiAgYm9yZGVySW1hZ2VTbGljZTogdHJ1ZSxcbiAgYm9yZGVySW1hZ2VXaWR0aDogdHJ1ZSxcbiAgYm94RmxleDogdHJ1ZSxcbiAgYm94RmxleEdyb3VwOiB0cnVlLFxuICBib3hPcmRpbmFsR3JvdXA6IHRydWUsXG4gIGNvbHVtbkNvdW50OiB0cnVlLFxuICBmbGV4OiB0cnVlLFxuICBmbGV4R3JvdzogdHJ1ZSxcbiAgZmxleFBvc2l0aXZlOiB0cnVlLFxuICBmbGV4U2hyaW5rOiB0cnVlLFxuICBmbGV4TmVnYXRpdmU6IHRydWUsXG4gIGZsZXhPcmRlcjogdHJ1ZSxcbiAgZ3JpZFJvdzogdHJ1ZSxcbiAgZ3JpZENvbHVtbjogdHJ1ZSxcbiAgZm9udFdlaWdodDogdHJ1ZSxcbiAgbGluZUNsYW1wOiB0cnVlLFxuICBsaW5lSGVpZ2h0OiB0cnVlLFxuICBvcGFjaXR5OiB0cnVlLFxuICBvcmRlcjogdHJ1ZSxcbiAgb3JwaGFuczogdHJ1ZSxcbiAgdGFiU2l6ZTogdHJ1ZSxcbiAgd2lkb3dzOiB0cnVlLFxuICB6SW5kZXg6IHRydWUsXG4gIHpvb206IHRydWUsXG5cbiAgLy8gU1ZHLXJlbGF0ZWQgcHJvcGVydGllc1xuICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgZmxvb2RPcGFjaXR5OiB0cnVlLFxuICBzdG9wT3BhY2l0eTogdHJ1ZSxcbiAgc3Ryb2tlRGFzaGFycmF5OiB0cnVlLFxuICBzdHJva2VEYXNob2Zmc2V0OiB0cnVlLFxuICBzdHJva2VNaXRlcmxpbWl0OiB0cnVlLFxuICBzdHJva2VPcGFjaXR5OiB0cnVlLFxuICBzdHJva2VXaWR0aDogdHJ1ZVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IHZlbmRvci1zcGVjaWZpYyBwcmVmaXgsIGVnOiBXZWJraXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgc3R5bGUgbmFtZSwgZWc6IHRyYW5zaXRpb25EdXJhdGlvblxuICogQHJldHVybiB7c3RyaW5nfSBzdHlsZSBuYW1lIHByZWZpeGVkIHdpdGggYHByZWZpeGAsIHByb3Blcmx5IGNhbWVsQ2FzZWQsIGVnOlxuICogV2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHByZWZpeEtleShwcmVmaXgsIGtleSkge1xuICByZXR1cm4gcHJlZml4ICsga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnN1YnN0cmluZygxKTtcbn1cblxuLyoqXG4gKiBTdXBwb3J0IHN0eWxlIG5hbWVzIHRoYXQgbWF5IGNvbWUgcGFzc2VkIGluIHByZWZpeGVkIGJ5IGFkZGluZyBwZXJtdXRhdGlvbnNcbiAqIG9mIHZlbmRvciBwcmVmaXhlcy5cbiAqL1xudmFyIHByZWZpeGVzID0gWydXZWJraXQnLCAnbXMnLCAnTW96JywgJ08nXTtcblxuLy8gVXNpbmcgT2JqZWN0LmtleXMgaGVyZSwgb3IgZWxzZSB0aGUgdmFuaWxsYSBmb3ItaW4gbG9vcCBtYWtlcyBJRTggZ28gaW50byBhblxuLy8gaW5maW5pdGUgbG9vcCwgYmVjYXVzZSBpdCBpdGVyYXRlcyBvdmVyIHRoZSBuZXdseSBhZGRlZCBwcm9wcyB0b28uXG5PYmplY3Qua2V5cyhpc1VuaXRsZXNzTnVtYmVyKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gIHByZWZpeGVzLmZvckVhY2goZnVuY3Rpb24gKHByZWZpeCkge1xuICAgIGlzVW5pdGxlc3NOdW1iZXJbcHJlZml4S2V5KHByZWZpeCwgcHJvcCldID0gaXNVbml0bGVzc051bWJlcltwcm9wXTtcbiAgfSk7XG59KTtcblxuLyoqXG4gKiBNb3N0IHN0eWxlIHByb3BlcnRpZXMgY2FuIGJlIHVuc2V0IGJ5IGRvaW5nIC5zdHlsZVtwcm9wXSA9ICcnIGJ1dCBJRThcbiAqIGRvZXNuJ3QgbGlrZSBkb2luZyB0aGF0IHdpdGggc2hvcnRoYW5kIHByb3BlcnRpZXMgc28gZm9yIHRoZSBwcm9wZXJ0aWVzIHRoYXRcbiAqIElFOCBicmVha3Mgb24sIHdoaWNoIGFyZSBsaXN0ZWQgaGVyZSwgd2UgaW5zdGVhZCB1bnNldCBlYWNoIG9mIHRoZVxuICogaW5kaXZpZHVhbCBwcm9wZXJ0aWVzLiBTZWUgaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTIzODUuXG4gKiBUaGUgNC12YWx1ZSAnY2xvY2snIHByb3BlcnRpZXMgbGlrZSBtYXJnaW4sIHBhZGRpbmcsIGJvcmRlci13aWR0aCBzZWVtIHRvXG4gKiBiZWhhdmUgd2l0aG91dCBhbnkgcHJvYmxlbXMuIEN1cmlvdXNseSwgbGlzdC1zdHlsZSB3b3JrcyB0b28gd2l0aG91dCBhbnlcbiAqIHNwZWNpYWwgcHJvZGRpbmcuXG4gKi9cbnZhciBzaG9ydGhhbmRQcm9wZXJ0eUV4cGFuc2lvbnMgPSB7XG4gIGJhY2tncm91bmQ6IHtcbiAgICBiYWNrZ3JvdW5kQXR0YWNobWVudDogdHJ1ZSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHRydWUsXG4gICAgYmFja2dyb3VuZEltYWdlOiB0cnVlLFxuICAgIGJhY2tncm91bmRQb3NpdGlvblg6IHRydWUsXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uWTogdHJ1ZSxcbiAgICBiYWNrZ3JvdW5kUmVwZWF0OiB0cnVlXG4gIH0sXG4gIGJhY2tncm91bmRQb3NpdGlvbjoge1xuICAgIGJhY2tncm91bmRQb3NpdGlvblg6IHRydWUsXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uWTogdHJ1ZVxuICB9LFxuICBib3JkZXI6IHtcbiAgICBib3JkZXJXaWR0aDogdHJ1ZSxcbiAgICBib3JkZXJTdHlsZTogdHJ1ZSxcbiAgICBib3JkZXJDb2xvcjogdHJ1ZVxuICB9LFxuICBib3JkZXJCb3R0b206IHtcbiAgICBib3JkZXJCb3R0b21XaWR0aDogdHJ1ZSxcbiAgICBib3JkZXJCb3R0b21TdHlsZTogdHJ1ZSxcbiAgICBib3JkZXJCb3R0b21Db2xvcjogdHJ1ZVxuICB9LFxuICBib3JkZXJMZWZ0OiB7XG4gICAgYm9yZGVyTGVmdFdpZHRoOiB0cnVlLFxuICAgIGJvcmRlckxlZnRTdHlsZTogdHJ1ZSxcbiAgICBib3JkZXJMZWZ0Q29sb3I6IHRydWVcbiAgfSxcbiAgYm9yZGVyUmlnaHQ6IHtcbiAgICBib3JkZXJSaWdodFdpZHRoOiB0cnVlLFxuICAgIGJvcmRlclJpZ2h0U3R5bGU6IHRydWUsXG4gICAgYm9yZGVyUmlnaHRDb2xvcjogdHJ1ZVxuICB9LFxuICBib3JkZXJUb3A6IHtcbiAgICBib3JkZXJUb3BXaWR0aDogdHJ1ZSxcbiAgICBib3JkZXJUb3BTdHlsZTogdHJ1ZSxcbiAgICBib3JkZXJUb3BDb2xvcjogdHJ1ZVxuICB9LFxuICBmb250OiB7XG4gICAgZm9udFN0eWxlOiB0cnVlLFxuICAgIGZvbnRWYXJpYW50OiB0cnVlLFxuICAgIGZvbnRXZWlnaHQ6IHRydWUsXG4gICAgZm9udFNpemU6IHRydWUsXG4gICAgbGluZUhlaWdodDogdHJ1ZSxcbiAgICBmb250RmFtaWx5OiB0cnVlXG4gIH0sXG4gIG91dGxpbmU6IHtcbiAgICBvdXRsaW5lV2lkdGg6IHRydWUsXG4gICAgb3V0bGluZVN0eWxlOiB0cnVlLFxuICAgIG91dGxpbmVDb2xvcjogdHJ1ZVxuICB9XG59O1xuXG52YXIgQ1NTUHJvcGVydHkgPSB7XG4gIGlzVW5pdGxlc3NOdW1iZXI6IGlzVW5pdGxlc3NOdW1iZXIsXG4gIHNob3J0aGFuZFByb3BlcnR5RXhwYW5zaW9uczogc2hvcnRoYW5kUHJvcGVydHlFeHBhbnNpb25zXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENTU1Byb3BlcnR5OyJdfQ==