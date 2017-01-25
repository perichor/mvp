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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QvbGliL0tleUVzY2FwZVV0aWxzLmpzIl0sIm5hbWVzIjpbImVzY2FwZSIsImtleSIsImVzY2FwZVJlZ2V4IiwiZXNjYXBlckxvb2t1cCIsImVzY2FwZWRTdHJpbmciLCJyZXBsYWNlIiwibWF0Y2giLCJ1bmVzY2FwZSIsInVuZXNjYXBlUmVnZXgiLCJ1bmVzY2FwZXJMb29rdXAiLCJrZXlTdWJzdHJpbmciLCJzdWJzdHJpbmciLCJLZXlFc2NhcGVVdGlscyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQVdBOztBQUVBOzs7Ozs7O0FBT0EsU0FBU0EsTUFBVCxDQUFnQkMsR0FBaEIsRUFBcUI7QUFDbkIsTUFBSUMsY0FBYyxPQUFsQjtBQUNBLE1BQUlDLGdCQUFnQjtBQUNsQixTQUFLLElBRGE7QUFFbEIsU0FBSztBQUZhLEdBQXBCO0FBSUEsTUFBSUMsZ0JBQWdCLENBQUMsS0FBS0gsR0FBTixFQUFXSSxPQUFYLENBQW1CSCxXQUFuQixFQUFnQyxVQUFVSSxLQUFWLEVBQWlCO0FBQ25FLFdBQU9ILGNBQWNHLEtBQWQsQ0FBUDtBQUNELEdBRm1CLENBQXBCOztBQUlBLFNBQU8sTUFBTUYsYUFBYjtBQUNEOztBQUVEOzs7Ozs7QUFNQSxTQUFTRyxRQUFULENBQWtCTixHQUFsQixFQUF1QjtBQUNyQixNQUFJTyxnQkFBZ0IsVUFBcEI7QUFDQSxNQUFJQyxrQkFBa0I7QUFDcEIsVUFBTSxHQURjO0FBRXBCLFVBQU07QUFGYyxHQUF0QjtBQUlBLE1BQUlDLGVBQWVULElBQUksQ0FBSixNQUFXLEdBQVgsSUFBa0JBLElBQUksQ0FBSixNQUFXLEdBQTdCLEdBQW1DQSxJQUFJVSxTQUFKLENBQWMsQ0FBZCxDQUFuQyxHQUFzRFYsSUFBSVUsU0FBSixDQUFjLENBQWQsQ0FBekU7O0FBRUEsU0FBTyxDQUFDLEtBQUtELFlBQU4sRUFBb0JMLE9BQXBCLENBQTRCRyxhQUE1QixFQUEyQyxVQUFVRixLQUFWLEVBQWlCO0FBQ2pFLFdBQU9HLGdCQUFnQkgsS0FBaEIsQ0FBUDtBQUNELEdBRk0sQ0FBUDtBQUdEOztBQUVELElBQUlNLGlCQUFpQjtBQUNuQlosVUFBUUEsTUFEVztBQUVuQk8sWUFBVUE7QUFGUyxDQUFyQjs7QUFLQU0sT0FBT0MsT0FBUCxHQUFpQkYsY0FBakIiLCJmaWxlIjoiS2V5RXNjYXBlVXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRXNjYXBlIGFuZCB3cmFwIGtleSBzbyBpdCBpcyBzYWZlIHRvIHVzZSBhcyBhIHJlYWN0aWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGJlIGVzY2FwZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBlc2NhcGVkIGtleS5cbiAqL1xuXG5mdW5jdGlvbiBlc2NhcGUoa2V5KSB7XG4gIHZhciBlc2NhcGVSZWdleCA9IC9bPTpdL2c7XG4gIHZhciBlc2NhcGVyTG9va3VwID0ge1xuICAgICc9JzogJz0wJyxcbiAgICAnOic6ICc9MidcbiAgfTtcbiAgdmFyIGVzY2FwZWRTdHJpbmcgPSAoJycgKyBrZXkpLnJlcGxhY2UoZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG5cbiAgcmV0dXJuICckJyArIGVzY2FwZWRTdHJpbmc7XG59XG5cbi8qKlxuICogVW5lc2NhcGUgYW5kIHVud3JhcCBrZXkgZm9yIGh1bWFuLXJlYWRhYmxlIGRpc3BsYXlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIHVuZXNjYXBlLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgdW5lc2NhcGVkIGtleS5cbiAqL1xuZnVuY3Rpb24gdW5lc2NhcGUoa2V5KSB7XG4gIHZhciB1bmVzY2FwZVJlZ2V4ID0gLyg9MHw9MikvZztcbiAgdmFyIHVuZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPTAnOiAnPScsXG4gICAgJz0yJzogJzonXG4gIH07XG4gIHZhciBrZXlTdWJzdHJpbmcgPSBrZXlbMF0gPT09ICcuJyAmJiBrZXlbMV0gPT09ICckJyA/IGtleS5zdWJzdHJpbmcoMikgOiBrZXkuc3Vic3RyaW5nKDEpO1xuXG4gIHJldHVybiAoJycgKyBrZXlTdWJzdHJpbmcpLnJlcGxhY2UodW5lc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIHVuZXNjYXBlckxvb2t1cFttYXRjaF07XG4gIH0pO1xufVxuXG52YXIgS2V5RXNjYXBlVXRpbHMgPSB7XG4gIGVzY2FwZTogZXNjYXBlLFxuICB1bmVzY2FwZTogdW5lc2NhcGVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5RXNjYXBlVXRpbHM7Il19