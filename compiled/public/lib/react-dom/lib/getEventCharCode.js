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
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */

function getEventCharCode(nativeEvent) {
  var charCode;
  var keyCode = nativeEvent.keyCode;

  if ('charCode' in nativeEvent) {
    charCode = nativeEvent.charCode;

    // FF does not set `charCode` for the Enter-key, check against `keyCode`.
    if (charCode === 0 && keyCode === 13) {
      charCode = 13;
    }
  } else {
    // IE8 does not implement `charCode`, but `keyCode` has the correct value.
    charCode = keyCode;
  }

  // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
  // Must not discard the (non-)printable Enter-key.
  if (charCode >= 32 || charCode === 13) {
    return charCode;
  }

  return 0;
}

module.exports = getEventCharCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9nZXRFdmVudENoYXJDb2RlLmpzIl0sIm5hbWVzIjpbImdldEV2ZW50Q2hhckNvZGUiLCJuYXRpdmVFdmVudCIsImNoYXJDb2RlIiwia2V5Q29kZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7O0FBRUE7Ozs7Ozs7Ozs7O0FBV0EsU0FBU0EsZ0JBQVQsQ0FBMEJDLFdBQTFCLEVBQXVDO0FBQ3JDLE1BQUlDLFFBQUo7QUFDQSxNQUFJQyxVQUFVRixZQUFZRSxPQUExQjs7QUFFQSxNQUFJLGNBQWNGLFdBQWxCLEVBQStCO0FBQzdCQyxlQUFXRCxZQUFZQyxRQUF2Qjs7QUFFQTtBQUNBLFFBQUlBLGFBQWEsQ0FBYixJQUFrQkMsWUFBWSxFQUFsQyxFQUFzQztBQUNwQ0QsaUJBQVcsRUFBWDtBQUNEO0FBQ0YsR0FQRCxNQU9PO0FBQ0w7QUFDQUEsZUFBV0MsT0FBWDtBQUNEOztBQUVEO0FBQ0E7QUFDQSxNQUFJRCxZQUFZLEVBQVosSUFBa0JBLGFBQWEsRUFBbkMsRUFBdUM7QUFDckMsV0FBT0EsUUFBUDtBQUNEOztBQUVELFNBQU8sQ0FBUDtBQUNEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCTCxnQkFBakIiLCJmaWxlIjoiZ2V0RXZlbnRDaGFyQ29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogYGNoYXJDb2RlYCByZXByZXNlbnRzIHRoZSBhY3R1YWwgXCJjaGFyYWN0ZXIgY29kZVwiIGFuZCBpcyBzYWZlIHRvIHVzZSB3aXRoXG4gKiBgU3RyaW5nLmZyb21DaGFyQ29kZWAuIEFzIHN1Y2gsIG9ubHkga2V5cyB0aGF0IGNvcnJlc3BvbmQgdG8gcHJpbnRhYmxlXG4gKiBjaGFyYWN0ZXJzIHByb2R1Y2UgYSB2YWxpZCBgY2hhckNvZGVgLCB0aGUgb25seSBleGNlcHRpb24gdG8gdGhpcyBpcyBFbnRlci5cbiAqIFRoZSBUYWIta2V5IGlzIGNvbnNpZGVyZWQgbm9uLXByaW50YWJsZSBhbmQgZG9lcyBub3QgaGF2ZSBhIGBjaGFyQ29kZWAsXG4gKiBwcmVzdW1hYmx5IGJlY2F1c2UgaXQgZG9lcyBub3QgcHJvZHVjZSBhIHRhYi1jaGFyYWN0ZXIgaW4gYnJvd3NlcnMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG5hdGl2ZUV2ZW50IE5hdGl2ZSBicm93c2VyIGV2ZW50LlxuICogQHJldHVybiB7bnVtYmVyfSBOb3JtYWxpemVkIGBjaGFyQ29kZWAgcHJvcGVydHkuXG4gKi9cblxuZnVuY3Rpb24gZ2V0RXZlbnRDaGFyQ29kZShuYXRpdmVFdmVudCkge1xuICB2YXIgY2hhckNvZGU7XG4gIHZhciBrZXlDb2RlID0gbmF0aXZlRXZlbnQua2V5Q29kZTtcblxuICBpZiAoJ2NoYXJDb2RlJyBpbiBuYXRpdmVFdmVudCkge1xuICAgIGNoYXJDb2RlID0gbmF0aXZlRXZlbnQuY2hhckNvZGU7XG5cbiAgICAvLyBGRiBkb2VzIG5vdCBzZXQgYGNoYXJDb2RlYCBmb3IgdGhlIEVudGVyLWtleSwgY2hlY2sgYWdhaW5zdCBga2V5Q29kZWAuXG4gICAgaWYgKGNoYXJDb2RlID09PSAwICYmIGtleUNvZGUgPT09IDEzKSB7XG4gICAgICBjaGFyQ29kZSA9IDEzO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJRTggZG9lcyBub3QgaW1wbGVtZW50IGBjaGFyQ29kZWAsIGJ1dCBga2V5Q29kZWAgaGFzIHRoZSBjb3JyZWN0IHZhbHVlLlxuICAgIGNoYXJDb2RlID0ga2V5Q29kZTtcbiAgfVxuXG4gIC8vIFNvbWUgbm9uLXByaW50YWJsZSBrZXlzIGFyZSByZXBvcnRlZCBpbiBgY2hhckNvZGVgL2BrZXlDb2RlYCwgZGlzY2FyZCB0aGVtLlxuICAvLyBNdXN0IG5vdCBkaXNjYXJkIHRoZSAobm9uLSlwcmludGFibGUgRW50ZXIta2V5LlxuICBpZiAoY2hhckNvZGUgPj0gMzIgfHwgY2hhckNvZGUgPT09IDEzKSB7XG4gICAgcmV0dXJuIGNoYXJDb2RlO1xuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0RXZlbnRDaGFyQ29kZTsiXX0=