/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Based on the escape-html library, which is used under the MIT License below:
 *
 * Copyright (c) 2012-2013 TJ Holowaychuk
 * Copyright (c) 2015 Andreas Lubbe
 * Copyright (c) 2015 Tiancheng "Timothy" Gu
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

'use strict';

// code copied and modified from escape-html
/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        // "
        escape = '&quot;';
        break;
      case 38:
        // &
        escape = '&amp;';
        break;
      case 39:
        // '
        escape = '&#x27;'; // modified from escape-html; used to be '&#39'
        break;
      case 60:
        // <
        escape = '&lt;';
        break;
      case 62:
        // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
// end code copied and modified from escape-html


/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escapeTextContentForBrowser(text) {
  if (typeof text === 'boolean' || typeof text === 'number') {
    // this shortcircuit helps perf for types that we know will never have
    // special characters, especially given that this function is used often
    // for numeric dom ids.
    return '' + text;
  }
  return escapeHtml(text);
}

module.exports = escapeTextContentForBrowser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9lc2NhcGVUZXh0Q29udGVudEZvckJyb3dzZXIuanMiXSwibmFtZXMiOlsibWF0Y2hIdG1sUmVnRXhwIiwiZXNjYXBlSHRtbCIsInN0cmluZyIsInN0ciIsIm1hdGNoIiwiZXhlYyIsImVzY2FwZSIsImh0bWwiLCJpbmRleCIsImxhc3RJbmRleCIsImxlbmd0aCIsImNoYXJDb2RlQXQiLCJzdWJzdHJpbmciLCJlc2NhcGVUZXh0Q29udGVudEZvckJyb3dzZXIiLCJ0ZXh0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUNBOztBQUVBO0FBQ0E7Ozs7O0FBS0EsSUFBSUEsa0JBQWtCLFNBQXRCOztBQUVBOzs7Ozs7OztBQVFBLFNBQVNDLFVBQVQsQ0FBb0JDLE1BQXBCLEVBQTRCO0FBQzFCLE1BQUlDLE1BQU0sS0FBS0QsTUFBZjtBQUNBLE1BQUlFLFFBQVFKLGdCQUFnQkssSUFBaEIsQ0FBcUJGLEdBQXJCLENBQVo7O0FBRUEsTUFBSSxDQUFDQyxLQUFMLEVBQVk7QUFDVixXQUFPRCxHQUFQO0FBQ0Q7O0FBRUQsTUFBSUcsTUFBSjtBQUNBLE1BQUlDLE9BQU8sRUFBWDtBQUNBLE1BQUlDLFFBQVEsQ0FBWjtBQUNBLE1BQUlDLFlBQVksQ0FBaEI7O0FBRUEsT0FBS0QsUUFBUUosTUFBTUksS0FBbkIsRUFBMEJBLFFBQVFMLElBQUlPLE1BQXRDLEVBQThDRixPQUE5QyxFQUF1RDtBQUNyRCxZQUFRTCxJQUFJUSxVQUFKLENBQWVILEtBQWYsQ0FBUjtBQUNFLFdBQUssRUFBTDtBQUNFO0FBQ0FGLGlCQUFTLFFBQVQ7QUFDQTtBQUNGLFdBQUssRUFBTDtBQUNFO0FBQ0FBLGlCQUFTLE9BQVQ7QUFDQTtBQUNGLFdBQUssRUFBTDtBQUNFO0FBQ0FBLGlCQUFTLFFBQVQsQ0FGRixDQUVxQjtBQUNuQjtBQUNGLFdBQUssRUFBTDtBQUNFO0FBQ0FBLGlCQUFTLE1BQVQ7QUFDQTtBQUNGLFdBQUssRUFBTDtBQUNFO0FBQ0FBLGlCQUFTLE1BQVQ7QUFDQTtBQUNGO0FBQ0U7QUF0Qko7O0FBeUJBLFFBQUlHLGNBQWNELEtBQWxCLEVBQXlCO0FBQ3ZCRCxjQUFRSixJQUFJUyxTQUFKLENBQWNILFNBQWQsRUFBeUJELEtBQXpCLENBQVI7QUFDRDs7QUFFREMsZ0JBQVlELFFBQVEsQ0FBcEI7QUFDQUQsWUFBUUQsTUFBUjtBQUNEOztBQUVELFNBQU9HLGNBQWNELEtBQWQsR0FBc0JELE9BQU9KLElBQUlTLFNBQUosQ0FBY0gsU0FBZCxFQUF5QkQsS0FBekIsQ0FBN0IsR0FBK0RELElBQXRFO0FBQ0Q7QUFDRDs7O0FBR0E7Ozs7OztBQU1BLFNBQVNNLDJCQUFULENBQXFDQyxJQUFyQyxFQUEyQztBQUN6QyxNQUFJLE9BQU9BLElBQVAsS0FBZ0IsU0FBaEIsSUFBNkIsT0FBT0EsSUFBUCxLQUFnQixRQUFqRCxFQUEyRDtBQUN6RDtBQUNBO0FBQ0E7QUFDQSxXQUFPLEtBQUtBLElBQVo7QUFDRDtBQUNELFNBQU9iLFdBQVdhLElBQVgsQ0FBUDtBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCSCwyQkFBakIiLCJmaWxlIjoiZXNjYXBlVGV4dENvbnRlbnRGb3JCcm93c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQmFzZWQgb24gdGhlIGVzY2FwZS1odG1sIGxpYnJhcnksIHdoaWNoIGlzIHVzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIGJlbG93OlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMi0yMDEzIFRKIEhvbG93YXljaHVrXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgQW5kcmVhcyBMdWJiZVxuICogQ29weXJpZ2h0IChjKSAyMDE1IFRpYW5jaGVuZyBcIlRpbW90aHlcIiBHdVxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuICogYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4gKiAnU29mdHdhcmUnKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4gKiB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4gKiBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cbiAqIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0b1xuICogdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gKiBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgJ0FTIElTJywgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbiAqIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuICogTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULlxuICogSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTllcbiAqIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsXG4gKiBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRVxuICogU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gY29kZSBjb3BpZWQgYW5kIG1vZGlmaWVkIGZyb20gZXNjYXBlLWh0bWxcbi8qKlxuICogTW9kdWxlIHZhcmlhYmxlcy5cbiAqIEBwcml2YXRlXG4gKi9cblxudmFyIG1hdGNoSHRtbFJlZ0V4cCA9IC9bXCInJjw+XS87XG5cbi8qKlxuICogRXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGh0bWwuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBlc2NhcGUgZm9yIGluc2VydGluZyBpbnRvIEhUTUxcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cmluZykge1xuICB2YXIgc3RyID0gJycgKyBzdHJpbmc7XG4gIHZhciBtYXRjaCA9IG1hdGNoSHRtbFJlZ0V4cC5leGVjKHN0cik7XG5cbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICB2YXIgZXNjYXBlO1xuICB2YXIgaHRtbCA9ICcnO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEluZGV4ID0gMDtcblxuICBmb3IgKGluZGV4ID0gbWF0Y2guaW5kZXg7IGluZGV4IDwgc3RyLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIHN3aXRjaCAoc3RyLmNoYXJDb2RlQXQoaW5kZXgpKSB7XG4gICAgICBjYXNlIDM0OlxuICAgICAgICAvLyBcIlxuICAgICAgICBlc2NhcGUgPSAnJnF1b3Q7JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM4OlxuICAgICAgICAvLyAmXG4gICAgICAgIGVzY2FwZSA9ICcmYW1wOyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgICAgLy8gJ1xuICAgICAgICBlc2NhcGUgPSAnJiN4Mjc7JzsgLy8gbW9kaWZpZWQgZnJvbSBlc2NhcGUtaHRtbDsgdXNlZCB0byBiZSAnJiMzOSdcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDYwOlxuICAgICAgICAvLyA8XG4gICAgICAgIGVzY2FwZSA9ICcmbHQ7JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDYyOlxuICAgICAgICAvLyA+XG4gICAgICAgIGVzY2FwZSA9ICcmZ3Q7JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAobGFzdEluZGV4ICE9PSBpbmRleCkge1xuICAgICAgaHRtbCArPSBzdHIuc3Vic3RyaW5nKGxhc3RJbmRleCwgaW5kZXgpO1xuICAgIH1cblxuICAgIGxhc3RJbmRleCA9IGluZGV4ICsgMTtcbiAgICBodG1sICs9IGVzY2FwZTtcbiAgfVxuXG4gIHJldHVybiBsYXN0SW5kZXggIT09IGluZGV4ID8gaHRtbCArIHN0ci5zdWJzdHJpbmcobGFzdEluZGV4LCBpbmRleCkgOiBodG1sO1xufVxuLy8gZW5kIGNvZGUgY29waWVkIGFuZCBtb2RpZmllZCBmcm9tIGVzY2FwZS1odG1sXG5cblxuLyoqXG4gKiBFc2NhcGVzIHRleHQgdG8gcHJldmVudCBzY3JpcHRpbmcgYXR0YWNrcy5cbiAqXG4gKiBAcGFyYW0geyp9IHRleHQgVGV4dCB2YWx1ZSB0byBlc2NhcGUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEFuIGVzY2FwZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlc2NhcGVUZXh0Q29udGVudEZvckJyb3dzZXIodGV4dCkge1xuICBpZiAodHlwZW9mIHRleHQgPT09ICdib29sZWFuJyB8fCB0eXBlb2YgdGV4dCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyB0aGlzIHNob3J0Y2lyY3VpdCBoZWxwcyBwZXJmIGZvciB0eXBlcyB0aGF0IHdlIGtub3cgd2lsbCBuZXZlciBoYXZlXG4gICAgLy8gc3BlY2lhbCBjaGFyYWN0ZXJzLCBlc3BlY2lhbGx5IGdpdmVuIHRoYXQgdGhpcyBmdW5jdGlvbiBpcyB1c2VkIG9mdGVuXG4gICAgLy8gZm9yIG51bWVyaWMgZG9tIGlkcy5cbiAgICByZXR1cm4gJycgKyB0ZXh0O1xuICB9XG4gIHJldHVybiBlc2NhcGVIdG1sKHRleHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZVRleHRDb250ZW50Rm9yQnJvd3NlcjsiXX0=