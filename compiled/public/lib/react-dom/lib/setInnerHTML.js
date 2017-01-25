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

var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
var DOMNamespaces = require('./DOMNamespaces');

var WHITESPACE_TEST = /^[ \r\n\t\f]/;
var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;

var createMicrosoftUnsafeLocalFunction = require('./createMicrosoftUnsafeLocalFunction');

// SVG temp container for IE lacking innerHTML
var reusableSVGContainer;

/**
 * Set the innerHTML property of a node, ensuring that whitespace is preserved
 * even in IE8.
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */
var setInnerHTML = createMicrosoftUnsafeLocalFunction(function (node, html) {
  // IE does not have innerHTML for SVG nodes, so instead we inject the
  // new markup in a temp node and then move the child nodes across into
  // the target node
  if (node.namespaceURI === DOMNamespaces.svg && !('innerHTML' in node)) {
    reusableSVGContainer = reusableSVGContainer || document.createElement('div');
    reusableSVGContainer.innerHTML = '<svg>' + html + '</svg>';
    var svgNode = reusableSVGContainer.firstChild;
    while (svgNode.firstChild) {
      node.appendChild(svgNode.firstChild);
    }
  } else {
    node.innerHTML = html;
  }
});

if (ExecutionEnvironment.canUseDOM) {
  // IE8: When updating a just created node with innerHTML only leading
  // whitespace is removed. When updating an existing node with innerHTML
  // whitespace in root TextNodes is also collapsed.
  // @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html

  // Feature detection; only IE8 is known to behave improperly like this.
  var testElement = document.createElement('div');
  testElement.innerHTML = ' ';
  if (testElement.innerHTML === '') {
    setInnerHTML = function setInnerHTML(node, html) {
      // Magic theory: IE8 supposedly differentiates between added and updated
      // nodes when processing innerHTML, innerHTML on updated nodes suffers
      // from worse whitespace behavior. Re-adding a node like this triggers
      // the initial and more favorable whitespace behavior.
      // TODO: What to do on a detached node?
      if (node.parentNode) {
        node.parentNode.replaceChild(node, node);
      }

      // We also implement a workaround for non-visible tags disappearing into
      // thin air on IE8, this only happens if there is no visible text
      // in-front of the non-visible tags. Piggyback on the whitespace fix
      // and simply check if any non-visible tags appear in the source.
      if (WHITESPACE_TEST.test(html) || html[0] === '<' && NONVISIBLE_TEST.test(html)) {
        // Recover leading whitespace by temporarily prepending any character.
        // \uFEFF has the potential advantage of being zero-width/invisible.
        // UglifyJS drops U+FEFF chars when parsing, so use String.fromCharCode
        // in hopes that this is preserved even if "\uFEFF" is transformed to
        // the actual Unicode character (by Babel, for example).
        // https://github.com/mishoo/UglifyJS2/blob/v2.4.20/lib/parse.js#L216
        node.innerHTML = String.fromCharCode(0xFEFF) + html;

        // deleteData leaves an empty `TextNode` which offsets the index of all
        // children. Definitely want to avoid this.
        var textNode = node.firstChild;
        if (textNode.data.length === 1) {
          node.removeChild(textNode);
        } else {
          textNode.deleteData(0, 1);
        }
      } else {
        node.innerHTML = html;
      }
    };
  }
  testElement = null;
}

module.exports = setInnerHTML;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9zZXRJbm5lckhUTUwuanMiXSwibmFtZXMiOlsiRXhlY3V0aW9uRW52aXJvbm1lbnQiLCJyZXF1aXJlIiwiRE9NTmFtZXNwYWNlcyIsIldISVRFU1BBQ0VfVEVTVCIsIk5PTlZJU0lCTEVfVEVTVCIsImNyZWF0ZU1pY3Jvc29mdFVuc2FmZUxvY2FsRnVuY3Rpb24iLCJyZXVzYWJsZVNWR0NvbnRhaW5lciIsInNldElubmVySFRNTCIsIm5vZGUiLCJodG1sIiwibmFtZXNwYWNlVVJJIiwic3ZnIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwic3ZnTm9kZSIsImZpcnN0Q2hpbGQiLCJhcHBlbmRDaGlsZCIsImNhblVzZURPTSIsInRlc3RFbGVtZW50IiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsInRlc3QiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ0ZXh0Tm9kZSIsImRhdGEiLCJsZW5ndGgiLCJyZW1vdmVDaGlsZCIsImRlbGV0ZURhdGEiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBLElBQUlBLHVCQUF1QkMsUUFBUSwrQkFBUixDQUEzQjtBQUNBLElBQUlDLGdCQUFnQkQsUUFBUSxpQkFBUixDQUFwQjs7QUFFQSxJQUFJRSxrQkFBa0IsY0FBdEI7QUFDQSxJQUFJQyxrQkFBa0Isc0RBQXRCOztBQUVBLElBQUlDLHFDQUFxQ0osUUFBUSxzQ0FBUixDQUF6Qzs7QUFFQTtBQUNBLElBQUlLLG9CQUFKOztBQUVBOzs7Ozs7OztBQVFBLElBQUlDLGVBQWVGLG1DQUFtQyxVQUFVRyxJQUFWLEVBQWdCQyxJQUFoQixFQUFzQjtBQUMxRTtBQUNBO0FBQ0E7QUFDQSxNQUFJRCxLQUFLRSxZQUFMLEtBQXNCUixjQUFjUyxHQUFwQyxJQUEyQyxFQUFFLGVBQWVILElBQWpCLENBQS9DLEVBQXVFO0FBQ3JFRiwyQkFBdUJBLHdCQUF3Qk0sU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUEvQztBQUNBUCx5QkFBcUJRLFNBQXJCLEdBQWlDLFVBQVVMLElBQVYsR0FBaUIsUUFBbEQ7QUFDQSxRQUFJTSxVQUFVVCxxQkFBcUJVLFVBQW5DO0FBQ0EsV0FBT0QsUUFBUUMsVUFBZixFQUEyQjtBQUN6QlIsV0FBS1MsV0FBTCxDQUFpQkYsUUFBUUMsVUFBekI7QUFDRDtBQUNGLEdBUEQsTUFPTztBQUNMUixTQUFLTSxTQUFMLEdBQWlCTCxJQUFqQjtBQUNEO0FBQ0YsQ0Fka0IsQ0FBbkI7O0FBZ0JBLElBQUlULHFCQUFxQmtCLFNBQXpCLEVBQW9DO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSUMsY0FBY1AsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFsQjtBQUNBTSxjQUFZTCxTQUFaLEdBQXdCLEdBQXhCO0FBQ0EsTUFBSUssWUFBWUwsU0FBWixLQUEwQixFQUE5QixFQUFrQztBQUNoQ1AsbUJBQWUsc0JBQVVDLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFJRCxLQUFLWSxVQUFULEVBQXFCO0FBQ25CWixhQUFLWSxVQUFMLENBQWdCQyxZQUFoQixDQUE2QmIsSUFBN0IsRUFBbUNBLElBQW5DO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFJTCxnQkFBZ0JtQixJQUFoQixDQUFxQmIsSUFBckIsS0FBOEJBLEtBQUssQ0FBTCxNQUFZLEdBQVosSUFBbUJMLGdCQUFnQmtCLElBQWhCLENBQXFCYixJQUFyQixDQUFyRCxFQUFpRjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUQsYUFBS00sU0FBTCxHQUFpQlMsT0FBT0MsWUFBUCxDQUFvQixNQUFwQixJQUE4QmYsSUFBL0M7O0FBRUE7QUFDQTtBQUNBLFlBQUlnQixXQUFXakIsS0FBS1EsVUFBcEI7QUFDQSxZQUFJUyxTQUFTQyxJQUFULENBQWNDLE1BQWQsS0FBeUIsQ0FBN0IsRUFBZ0M7QUFDOUJuQixlQUFLb0IsV0FBTCxDQUFpQkgsUUFBakI7QUFDRCxTQUZELE1BRU87QUFDTEEsbUJBQVNJLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkI7QUFDRDtBQUNGLE9BakJELE1BaUJPO0FBQ0xyQixhQUFLTSxTQUFMLEdBQWlCTCxJQUFqQjtBQUNEO0FBQ0YsS0FsQ0Q7QUFtQ0Q7QUFDRFUsZ0JBQWMsSUFBZDtBQUNEOztBQUVEVyxPQUFPQyxPQUFQLEdBQWlCeEIsWUFBakIiLCJmaWxlIjoic2V0SW5uZXJIVE1MLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEV4ZWN1dGlvbkVudmlyb25tZW50ID0gcmVxdWlyZSgnZmJqcy9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQnKTtcbnZhciBET01OYW1lc3BhY2VzID0gcmVxdWlyZSgnLi9ET01OYW1lc3BhY2VzJyk7XG5cbnZhciBXSElURVNQQUNFX1RFU1QgPSAvXlsgXFxyXFxuXFx0XFxmXS87XG52YXIgTk9OVklTSUJMRV9URVNUID0gLzwoIS0tfGxpbmt8bm9zY3JpcHR8bWV0YXxzY3JpcHR8c3R5bGUpWyBcXHJcXG5cXHRcXGZcXC8+XS87XG5cbnZhciBjcmVhdGVNaWNyb3NvZnRVbnNhZmVMb2NhbEZ1bmN0aW9uID0gcmVxdWlyZSgnLi9jcmVhdGVNaWNyb3NvZnRVbnNhZmVMb2NhbEZ1bmN0aW9uJyk7XG5cbi8vIFNWRyB0ZW1wIGNvbnRhaW5lciBmb3IgSUUgbGFja2luZyBpbm5lckhUTUxcbnZhciByZXVzYWJsZVNWR0NvbnRhaW5lcjtcblxuLyoqXG4gKiBTZXQgdGhlIGlubmVySFRNTCBwcm9wZXJ0eSBvZiBhIG5vZGUsIGVuc3VyaW5nIHRoYXQgd2hpdGVzcGFjZSBpcyBwcmVzZXJ2ZWRcbiAqIGV2ZW4gaW4gSUU4LlxuICpcbiAqIEBwYXJhbSB7RE9NRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgc2V0SW5uZXJIVE1MID0gY3JlYXRlTWljcm9zb2Z0VW5zYWZlTG9jYWxGdW5jdGlvbihmdW5jdGlvbiAobm9kZSwgaHRtbCkge1xuICAvLyBJRSBkb2VzIG5vdCBoYXZlIGlubmVySFRNTCBmb3IgU1ZHIG5vZGVzLCBzbyBpbnN0ZWFkIHdlIGluamVjdCB0aGVcbiAgLy8gbmV3IG1hcmt1cCBpbiBhIHRlbXAgbm9kZSBhbmQgdGhlbiBtb3ZlIHRoZSBjaGlsZCBub2RlcyBhY3Jvc3MgaW50b1xuICAvLyB0aGUgdGFyZ2V0IG5vZGVcbiAgaWYgKG5vZGUubmFtZXNwYWNlVVJJID09PSBET01OYW1lc3BhY2VzLnN2ZyAmJiAhKCdpbm5lckhUTUwnIGluIG5vZGUpKSB7XG4gICAgcmV1c2FibGVTVkdDb250YWluZXIgPSByZXVzYWJsZVNWR0NvbnRhaW5lciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByZXVzYWJsZVNWR0NvbnRhaW5lci5pbm5lckhUTUwgPSAnPHN2Zz4nICsgaHRtbCArICc8L3N2Zz4nO1xuICAgIHZhciBzdmdOb2RlID0gcmV1c2FibGVTVkdDb250YWluZXIuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAoc3ZnTm9kZS5maXJzdENoaWxkKSB7XG4gICAgICBub2RlLmFwcGVuZENoaWxkKHN2Z05vZGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG5vZGUuaW5uZXJIVE1MID0gaHRtbDtcbiAgfVxufSk7XG5cbmlmIChFeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00pIHtcbiAgLy8gSUU4OiBXaGVuIHVwZGF0aW5nIGEganVzdCBjcmVhdGVkIG5vZGUgd2l0aCBpbm5lckhUTUwgb25seSBsZWFkaW5nXG4gIC8vIHdoaXRlc3BhY2UgaXMgcmVtb3ZlZC4gV2hlbiB1cGRhdGluZyBhbiBleGlzdGluZyBub2RlIHdpdGggaW5uZXJIVE1MXG4gIC8vIHdoaXRlc3BhY2UgaW4gcm9vdCBUZXh0Tm9kZXMgaXMgYWxzbyBjb2xsYXBzZWQuXG4gIC8vIEBzZWUgcXVpcmtzbW9kZS5vcmcvYnVncmVwb3J0cy9hcmNoaXZlcy8yMDA0LzExL2lubmVyaHRtbF9hbmRfdC5odG1sXG5cbiAgLy8gRmVhdHVyZSBkZXRlY3Rpb247IG9ubHkgSUU4IGlzIGtub3duIHRvIGJlaGF2ZSBpbXByb3Blcmx5IGxpa2UgdGhpcy5cbiAgdmFyIHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRlc3RFbGVtZW50LmlubmVySFRNTCA9ICcgJztcbiAgaWYgKHRlc3RFbGVtZW50LmlubmVySFRNTCA9PT0gJycpIHtcbiAgICBzZXRJbm5lckhUTUwgPSBmdW5jdGlvbiAobm9kZSwgaHRtbCkge1xuICAgICAgLy8gTWFnaWMgdGhlb3J5OiBJRTggc3VwcG9zZWRseSBkaWZmZXJlbnRpYXRlcyBiZXR3ZWVuIGFkZGVkIGFuZCB1cGRhdGVkXG4gICAgICAvLyBub2RlcyB3aGVuIHByb2Nlc3NpbmcgaW5uZXJIVE1MLCBpbm5lckhUTUwgb24gdXBkYXRlZCBub2RlcyBzdWZmZXJzXG4gICAgICAvLyBmcm9tIHdvcnNlIHdoaXRlc3BhY2UgYmVoYXZpb3IuIFJlLWFkZGluZyBhIG5vZGUgbGlrZSB0aGlzIHRyaWdnZXJzXG4gICAgICAvLyB0aGUgaW5pdGlhbCBhbmQgbW9yZSBmYXZvcmFibGUgd2hpdGVzcGFjZSBiZWhhdmlvci5cbiAgICAgIC8vIFRPRE86IFdoYXQgdG8gZG8gb24gYSBkZXRhY2hlZCBub2RlP1xuICAgICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICBub2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5vZGUsIG5vZGUpO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSBhbHNvIGltcGxlbWVudCBhIHdvcmthcm91bmQgZm9yIG5vbi12aXNpYmxlIHRhZ3MgZGlzYXBwZWFyaW5nIGludG9cbiAgICAgIC8vIHRoaW4gYWlyIG9uIElFOCwgdGhpcyBvbmx5IGhhcHBlbnMgaWYgdGhlcmUgaXMgbm8gdmlzaWJsZSB0ZXh0XG4gICAgICAvLyBpbi1mcm9udCBvZiB0aGUgbm9uLXZpc2libGUgdGFncy4gUGlnZ3liYWNrIG9uIHRoZSB3aGl0ZXNwYWNlIGZpeFxuICAgICAgLy8gYW5kIHNpbXBseSBjaGVjayBpZiBhbnkgbm9uLXZpc2libGUgdGFncyBhcHBlYXIgaW4gdGhlIHNvdXJjZS5cbiAgICAgIGlmIChXSElURVNQQUNFX1RFU1QudGVzdChodG1sKSB8fCBodG1sWzBdID09PSAnPCcgJiYgTk9OVklTSUJMRV9URVNULnRlc3QoaHRtbCkpIHtcbiAgICAgICAgLy8gUmVjb3ZlciBsZWFkaW5nIHdoaXRlc3BhY2UgYnkgdGVtcG9yYXJpbHkgcHJlcGVuZGluZyBhbnkgY2hhcmFjdGVyLlxuICAgICAgICAvLyBcXHVGRUZGIGhhcyB0aGUgcG90ZW50aWFsIGFkdmFudGFnZSBvZiBiZWluZyB6ZXJvLXdpZHRoL2ludmlzaWJsZS5cbiAgICAgICAgLy8gVWdsaWZ5SlMgZHJvcHMgVStGRUZGIGNoYXJzIHdoZW4gcGFyc2luZywgc28gdXNlIFN0cmluZy5mcm9tQ2hhckNvZGVcbiAgICAgICAgLy8gaW4gaG9wZXMgdGhhdCB0aGlzIGlzIHByZXNlcnZlZCBldmVuIGlmIFwiXFx1RkVGRlwiIGlzIHRyYW5zZm9ybWVkIHRvXG4gICAgICAgIC8vIHRoZSBhY3R1YWwgVW5pY29kZSBjaGFyYWN0ZXIgKGJ5IEJhYmVsLCBmb3IgZXhhbXBsZSkuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9taXNob28vVWdsaWZ5SlMyL2Jsb2IvdjIuNC4yMC9saWIvcGFyc2UuanMjTDIxNlxuICAgICAgICBub2RlLmlubmVySFRNTCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRUZGKSArIGh0bWw7XG5cbiAgICAgICAgLy8gZGVsZXRlRGF0YSBsZWF2ZXMgYW4gZW1wdHkgYFRleHROb2RlYCB3aGljaCBvZmZzZXRzIHRoZSBpbmRleCBvZiBhbGxcbiAgICAgICAgLy8gY2hpbGRyZW4uIERlZmluaXRlbHkgd2FudCB0byBhdm9pZCB0aGlzLlxuICAgICAgICB2YXIgdGV4dE5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgIGlmICh0ZXh0Tm9kZS5kYXRhLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQodGV4dE5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRleHROb2RlLmRlbGV0ZURhdGEoMCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIHRlc3RFbGVtZW50ID0gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRJbm5lckhUTUw7Il19