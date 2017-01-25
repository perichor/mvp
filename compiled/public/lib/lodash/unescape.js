'use strict';

var toString = require('./toString'),
    unescapeHtmlChar = require('./_unescapeHtmlChar');

/** Used to match HTML entities and HTML characters. */
var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
    reHasEscapedHtml = RegExp(reEscapedHtml.source);

/**
 * The inverse of `_.escape`; this method converts the HTML entities
 * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
 * their corresponding characters.
 *
 * **Note:** No other HTML entities are unescaped. To unescape additional
 * HTML entities use a third-party library like [_he_](https://mths.be/he).
 *
 * @static
 * @memberOf _
 * @since 0.6.0
 * @category String
 * @param {string} [string=''] The string to unescape.
 * @returns {string} Returns the unescaped string.
 * @example
 *
 * _.unescape('fred, barney, &amp; pebbles');
 * // => 'fred, barney, & pebbles'
 */
function unescape(string) {
    string = toString(string);
    return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
}

module.exports = unescape;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3VuZXNjYXBlLmpzIl0sIm5hbWVzIjpbInRvU3RyaW5nIiwicmVxdWlyZSIsInVuZXNjYXBlSHRtbENoYXIiLCJyZUVzY2FwZWRIdG1sIiwicmVIYXNFc2NhcGVkSHRtbCIsIlJlZ0V4cCIsInNvdXJjZSIsInVuZXNjYXBlIiwic3RyaW5nIiwidGVzdCIsInJlcGxhY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsWUFBUixDQUFmO0FBQUEsSUFDSUMsbUJBQW1CRCxRQUFRLHFCQUFSLENBRHZCOztBQUdBO0FBQ0EsSUFBSUUsZ0JBQWdCLDJCQUFwQjtBQUFBLElBQ0lDLG1CQUFtQkMsT0FBT0YsY0FBY0csTUFBckIsQ0FEdkI7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsU0FBU0MsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7QUFDeEJBLGFBQVNSLFNBQVNRLE1BQVQsQ0FBVDtBQUNBLFdBQVFBLFVBQVVKLGlCQUFpQkssSUFBakIsQ0FBc0JELE1BQXRCLENBQVgsR0FDSEEsT0FBT0UsT0FBUCxDQUFlUCxhQUFmLEVBQThCRCxnQkFBOUIsQ0FERyxHQUVITSxNQUZKO0FBR0Q7O0FBRURHLE9BQU9DLE9BQVAsR0FBaUJMLFFBQWpCIiwiZmlsZSI6InVuZXNjYXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi90b1N0cmluZycpLFxuICAgIHVuZXNjYXBlSHRtbENoYXIgPSByZXF1aXJlKCcuL191bmVzY2FwZUh0bWxDaGFyJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIEhUTUwgZW50aXRpZXMgYW5kIEhUTUwgY2hhcmFjdGVycy4gKi9cbnZhciByZUVzY2FwZWRIdG1sID0gLyYoPzphbXB8bHR8Z3R8cXVvdHwjMzkpOy9nLFxuICAgIHJlSGFzRXNjYXBlZEh0bWwgPSBSZWdFeHAocmVFc2NhcGVkSHRtbC5zb3VyY2UpO1xuXG4vKipcbiAqIFRoZSBpbnZlcnNlIG9mIGBfLmVzY2FwZWA7IHRoaXMgbWV0aG9kIGNvbnZlcnRzIHRoZSBIVE1MIGVudGl0aWVzXG4gKiBgJmFtcDtgLCBgJmx0O2AsIGAmZ3Q7YCwgYCZxdW90O2AsIGFuZCBgJiMzOTtgIGluIGBzdHJpbmdgIHRvXG4gKiB0aGVpciBjb3JyZXNwb25kaW5nIGNoYXJhY3RlcnMuXG4gKlxuICogKipOb3RlOioqIE5vIG90aGVyIEhUTUwgZW50aXRpZXMgYXJlIHVuZXNjYXBlZC4gVG8gdW5lc2NhcGUgYWRkaXRpb25hbFxuICogSFRNTCBlbnRpdGllcyB1c2UgYSB0aGlyZC1wYXJ0eSBsaWJyYXJ5IGxpa2UgW19oZV9dKGh0dHBzOi8vbXRocy5iZS9oZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjYuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gdW5lc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSB1bmVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnVuZXNjYXBlKCdmcmVkLCBiYXJuZXksICZhbXA7IHBlYmJsZXMnKTtcbiAqIC8vID0+ICdmcmVkLCBiYXJuZXksICYgcGViYmxlcydcbiAqL1xuZnVuY3Rpb24gdW5lc2NhcGUoc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzRXNjYXBlZEh0bWwudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVFc2NhcGVkSHRtbCwgdW5lc2NhcGVIdG1sQ2hhcilcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmVzY2FwZTtcbiJdfQ==