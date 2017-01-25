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

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9LZXlFc2NhcGVVdGlscy5qcyJdLCJuYW1lcyI6WyJlc2NhcGUiLCJrZXkiLCJlc2NhcGVSZWdleCIsImVzY2FwZXJMb29rdXAiLCJlc2NhcGVkU3RyaW5nIiwicmVwbGFjZSIsIm1hdGNoIiwidW5lc2NhcGUiLCJ1bmVzY2FwZVJlZ2V4IiwidW5lc2NhcGVyTG9va3VwIiwia2V5U3Vic3RyaW5nIiwic3Vic3RyaW5nIiwiS2V5RXNjYXBlVXRpbHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQTs7Ozs7OztBQU9BLFNBQVNBLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCO0FBQ25CLE1BQUlDLGNBQWMsT0FBbEI7QUFDQSxNQUFJQyxnQkFBZ0I7QUFDbEIsU0FBSyxJQURhO0FBRWxCLFNBQUs7QUFGYSxHQUFwQjtBQUlBLE1BQUlDLGdCQUFnQixDQUFDLEtBQUtILEdBQU4sRUFBV0ksT0FBWCxDQUFtQkgsV0FBbkIsRUFBZ0MsVUFBVUksS0FBVixFQUFpQjtBQUNuRSxXQUFPSCxjQUFjRyxLQUFkLENBQVA7QUFDRCxHQUZtQixDQUFwQjs7QUFJQSxTQUFPLE1BQU1GLGFBQWI7QUFDRDs7QUFFRDs7Ozs7O0FBTUEsU0FBU0csUUFBVCxDQUFrQk4sR0FBbEIsRUFBdUI7QUFDckIsTUFBSU8sZ0JBQWdCLFVBQXBCO0FBQ0EsTUFBSUMsa0JBQWtCO0FBQ3BCLFVBQU0sR0FEYztBQUVwQixVQUFNO0FBRmMsR0FBdEI7QUFJQSxNQUFJQyxlQUFlVCxJQUFJLENBQUosTUFBVyxHQUFYLElBQWtCQSxJQUFJLENBQUosTUFBVyxHQUE3QixHQUFtQ0EsSUFBSVUsU0FBSixDQUFjLENBQWQsQ0FBbkMsR0FBc0RWLElBQUlVLFNBQUosQ0FBYyxDQUFkLENBQXpFOztBQUVBLFNBQU8sQ0FBQyxLQUFLRCxZQUFOLEVBQW9CTCxPQUFwQixDQUE0QkcsYUFBNUIsRUFBMkMsVUFBVUYsS0FBVixFQUFpQjtBQUNqRSxXQUFPRyxnQkFBZ0JILEtBQWhCLENBQVA7QUFDRCxHQUZNLENBQVA7QUFHRDs7QUFFRCxJQUFJTSxpQkFBaUI7QUFDbkJaLFVBQVFBLE1BRFc7QUFFbkJPLFlBQVVBO0FBRlMsQ0FBckI7O0FBS0FNLE9BQU9DLE9BQVAsR0FBaUJGLGNBQWpCIiwiZmlsZSI6IktleUVzY2FwZVV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEVzY2FwZSBhbmQgd3JhcCBrZXkgc28gaXQgaXMgc2FmZSB0byB1c2UgYXMgYSByZWFjdGlkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSB0byBiZSBlc2NhcGVkLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgZXNjYXBlZCBrZXkuXG4gKi9cblxuZnVuY3Rpb24gZXNjYXBlKGtleSkge1xuICB2YXIgZXNjYXBlUmVnZXggPSAvWz06XS9nO1xuICB2YXIgZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPSc6ICc9MCcsXG4gICAgJzonOiAnPTInXG4gIH07XG4gIHZhciBlc2NhcGVkU3RyaW5nID0gKCcnICsga2V5KS5yZXBsYWNlKGVzY2FwZVJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gZXNjYXBlckxvb2t1cFttYXRjaF07XG4gIH0pO1xuXG4gIHJldHVybiAnJCcgKyBlc2NhcGVkU3RyaW5nO1xufVxuXG4vKipcbiAqIFVuZXNjYXBlIGFuZCB1bndyYXAga2V5IGZvciBodW1hbi1yZWFkYWJsZSBkaXNwbGF5XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSB0byB1bmVzY2FwZS5cbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIHVuZXNjYXBlZCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHVuZXNjYXBlKGtleSkge1xuICB2YXIgdW5lc2NhcGVSZWdleCA9IC8oPTB8PTIpL2c7XG4gIHZhciB1bmVzY2FwZXJMb29rdXAgPSB7XG4gICAgJz0wJzogJz0nLFxuICAgICc9Mic6ICc6J1xuICB9O1xuICB2YXIga2V5U3Vic3RyaW5nID0ga2V5WzBdID09PSAnLicgJiYga2V5WzFdID09PSAnJCcgPyBrZXkuc3Vic3RyaW5nKDIpIDoga2V5LnN1YnN0cmluZygxKTtcblxuICByZXR1cm4gKCcnICsga2V5U3Vic3RyaW5nKS5yZXBsYWNlKHVuZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiB1bmVzY2FwZXJMb29rdXBbbWF0Y2hdO1xuICB9KTtcbn1cblxudmFyIEtleUVzY2FwZVV0aWxzID0ge1xuICBlc2NhcGU6IGVzY2FwZSxcbiAgdW5lc2NhcGU6IHVuZXNjYXBlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEtleUVzY2FwZVV0aWxzOyJdfQ==