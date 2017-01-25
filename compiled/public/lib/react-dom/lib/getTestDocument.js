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

function getTestDocument(markup) {
  document.open();
  document.write(markup || '<!doctype html><html><meta charset=utf-8><title>test doc</title>');
  document.close();
  return document;
}

module.exports = getTestDocument;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9nZXRUZXN0RG9jdW1lbnQuanMiXSwibmFtZXMiOlsiZ2V0VGVzdERvY3VtZW50IiwibWFya3VwIiwiZG9jdW1lbnQiLCJvcGVuIiwid3JpdGUiLCJjbG9zZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsU0FBU0EsZUFBVCxDQUF5QkMsTUFBekIsRUFBaUM7QUFDL0JDLFdBQVNDLElBQVQ7QUFDQUQsV0FBU0UsS0FBVCxDQUFlSCxVQUFVLGtFQUF6QjtBQUNBQyxXQUFTRyxLQUFUO0FBQ0EsU0FBT0gsUUFBUDtBQUNEOztBQUVESSxPQUFPQyxPQUFQLEdBQWlCUCxlQUFqQiIsImZpbGUiOiJnZXRUZXN0RG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBnZXRUZXN0RG9jdW1lbnQobWFya3VwKSB7XG4gIGRvY3VtZW50Lm9wZW4oKTtcbiAgZG9jdW1lbnQud3JpdGUobWFya3VwIHx8ICc8IWRvY3R5cGUgaHRtbD48aHRtbD48bWV0YSBjaGFyc2V0PXV0Zi04Pjx0aXRsZT50ZXN0IGRvYzwvdGl0bGU+Jyk7XG4gIGRvY3VtZW50LmNsb3NlKCk7XG4gIHJldHVybiBkb2N1bWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRUZXN0RG9jdW1lbnQ7Il19