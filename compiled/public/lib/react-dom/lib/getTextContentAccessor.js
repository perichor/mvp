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

var contentKey = null;

/**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */
function getTextContentAccessor() {
  if (!contentKey && ExecutionEnvironment.canUseDOM) {
    // Prefer textContent to innerText because many browsers support both but
    // SVG <text> elements don't support innerText even when <div> does.
    contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
  }
  return contentKey;
}

module.exports = getTextContentAccessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9nZXRUZXh0Q29udGVudEFjY2Vzc29yLmpzIl0sIm5hbWVzIjpbIkV4ZWN1dGlvbkVudmlyb25tZW50IiwicmVxdWlyZSIsImNvbnRlbnRLZXkiLCJnZXRUZXh0Q29udGVudEFjY2Vzc29yIiwiY2FuVXNlRE9NIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBLElBQUlBLHVCQUF1QkMsUUFBUSwrQkFBUixDQUEzQjs7QUFFQSxJQUFJQyxhQUFhLElBQWpCOztBQUVBOzs7Ozs7QUFNQSxTQUFTQyxzQkFBVCxHQUFrQztBQUNoQyxNQUFJLENBQUNELFVBQUQsSUFBZUYscUJBQXFCSSxTQUF4QyxFQUFtRDtBQUNqRDtBQUNBO0FBQ0FGLGlCQUFhLGlCQUFpQkcsU0FBU0MsZUFBMUIsR0FBNEMsYUFBNUMsR0FBNEQsV0FBekU7QUFDRDtBQUNELFNBQU9KLFVBQVA7QUFDRDs7QUFFREssT0FBT0MsT0FBUCxHQUFpQkwsc0JBQWpCIiwiZmlsZSI6ImdldFRleHRDb250ZW50QWNjZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xuXG52YXIgY29udGVudEtleSA9IG51bGw7XG5cbi8qKlxuICogR2V0cyB0aGUga2V5IHVzZWQgdG8gYWNjZXNzIHRleHQgY29udGVudCBvbiBhIERPTSBub2RlLlxuICpcbiAqIEByZXR1cm4gez9zdHJpbmd9IEtleSB1c2VkIHRvIGFjY2VzcyB0ZXh0IGNvbnRlbnQuXG4gKiBAaW50ZXJuYWxcbiAqL1xuZnVuY3Rpb24gZ2V0VGV4dENvbnRlbnRBY2Nlc3NvcigpIHtcbiAgaWYgKCFjb250ZW50S2V5ICYmIEV4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSkge1xuICAgIC8vIFByZWZlciB0ZXh0Q29udGVudCB0byBpbm5lclRleHQgYmVjYXVzZSBtYW55IGJyb3dzZXJzIHN1cHBvcnQgYm90aCBidXRcbiAgICAvLyBTVkcgPHRleHQ+IGVsZW1lbnRzIGRvbid0IHN1cHBvcnQgaW5uZXJUZXh0IGV2ZW4gd2hlbiA8ZGl2PiBkb2VzLlxuICAgIGNvbnRlbnRLZXkgPSAndGV4dENvbnRlbnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA/ICd0ZXh0Q29udGVudCcgOiAnaW5uZXJUZXh0JztcbiAgfVxuICByZXR1cm4gY29udGVudEtleTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRUZXh0Q29udGVudEFjY2Vzc29yOyJdfQ==