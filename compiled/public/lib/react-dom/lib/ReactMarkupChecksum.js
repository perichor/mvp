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

var adler32 = require('./adler32');

var TAG_END = /\/?>/;
var COMMENT_START = /^<\!\-\-/;

var ReactMarkupChecksum = {
  CHECKSUM_ATTR_NAME: 'data-react-checksum',

  /**
   * @param {string} markup Markup string
   * @return {string} Markup string with checksum attribute attached
   */
  addChecksumToMarkup: function addChecksumToMarkup(markup) {
    var checksum = adler32(markup);

    // Add checksum (handle both parent tags, comments and self-closing tags)
    if (COMMENT_START.test(markup)) {
      return markup;
    } else {
      return markup.replace(TAG_END, ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '"$&');
    }
  },

  /**
   * @param {string} markup to use
   * @param {DOMElement} element root React element
   * @returns {boolean} whether or not the markup is the same
   */
  canReuseMarkup: function canReuseMarkup(markup, element) {
    var existingChecksum = element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
    var markupChecksum = adler32(markup);
    return markupChecksum === existingChecksum;
  }
};

module.exports = ReactMarkupChecksum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdE1hcmt1cENoZWNrc3VtLmpzIl0sIm5hbWVzIjpbImFkbGVyMzIiLCJyZXF1aXJlIiwiVEFHX0VORCIsIkNPTU1FTlRfU1RBUlQiLCJSZWFjdE1hcmt1cENoZWNrc3VtIiwiQ0hFQ0tTVU1fQVRUUl9OQU1FIiwiYWRkQ2hlY2tzdW1Ub01hcmt1cCIsIm1hcmt1cCIsImNoZWNrc3VtIiwidGVzdCIsInJlcGxhY2UiLCJjYW5SZXVzZU1hcmt1cCIsImVsZW1lbnQiLCJleGlzdGluZ0NoZWNrc3VtIiwiZ2V0QXR0cmlidXRlIiwicGFyc2VJbnQiLCJtYXJrdXBDaGVja3N1bSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsSUFBSUEsVUFBVUMsUUFBUSxXQUFSLENBQWQ7O0FBRUEsSUFBSUMsVUFBVSxNQUFkO0FBQ0EsSUFBSUMsZ0JBQWdCLFVBQXBCOztBQUVBLElBQUlDLHNCQUFzQjtBQUN4QkMsc0JBQW9CLHFCQURJOztBQUd4Qjs7OztBQUlBQyx1QkFBcUIsNkJBQVVDLE1BQVYsRUFBa0I7QUFDckMsUUFBSUMsV0FBV1IsUUFBUU8sTUFBUixDQUFmOztBQUVBO0FBQ0EsUUFBSUosY0FBY00sSUFBZCxDQUFtQkYsTUFBbkIsQ0FBSixFQUFnQztBQUM5QixhQUFPQSxNQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsYUFBT0EsT0FBT0csT0FBUCxDQUFlUixPQUFmLEVBQXdCLE1BQU1FLG9CQUFvQkMsa0JBQTFCLEdBQStDLElBQS9DLEdBQXNERyxRQUF0RCxHQUFpRSxLQUF6RixDQUFQO0FBQ0Q7QUFDRixHQWhCdUI7O0FBa0J4Qjs7Ozs7QUFLQUcsa0JBQWdCLHdCQUFVSixNQUFWLEVBQWtCSyxPQUFsQixFQUEyQjtBQUN6QyxRQUFJQyxtQkFBbUJELFFBQVFFLFlBQVIsQ0FBcUJWLG9CQUFvQkMsa0JBQXpDLENBQXZCO0FBQ0FRLHVCQUFtQkEsb0JBQW9CRSxTQUFTRixnQkFBVCxFQUEyQixFQUEzQixDQUF2QztBQUNBLFFBQUlHLGlCQUFpQmhCLFFBQVFPLE1BQVIsQ0FBckI7QUFDQSxXQUFPUyxtQkFBbUJILGdCQUExQjtBQUNEO0FBNUJ1QixDQUExQjs7QUErQkFJLE9BQU9DLE9BQVAsR0FBaUJkLG1CQUFqQiIsImZpbGUiOiJSZWFjdE1hcmt1cENoZWNrc3VtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGFkbGVyMzIgPSByZXF1aXJlKCcuL2FkbGVyMzInKTtcblxudmFyIFRBR19FTkQgPSAvXFwvPz4vO1xudmFyIENPTU1FTlRfU1RBUlQgPSAvXjxcXCFcXC1cXC0vO1xuXG52YXIgUmVhY3RNYXJrdXBDaGVja3N1bSA9IHtcbiAgQ0hFQ0tTVU1fQVRUUl9OQU1FOiAnZGF0YS1yZWFjdC1jaGVja3N1bScsXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrdXAgTWFya3VwIHN0cmluZ1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9IE1hcmt1cCBzdHJpbmcgd2l0aCBjaGVja3N1bSBhdHRyaWJ1dGUgYXR0YWNoZWRcbiAgICovXG4gIGFkZENoZWNrc3VtVG9NYXJrdXA6IGZ1bmN0aW9uIChtYXJrdXApIHtcbiAgICB2YXIgY2hlY2tzdW0gPSBhZGxlcjMyKG1hcmt1cCk7XG5cbiAgICAvLyBBZGQgY2hlY2tzdW0gKGhhbmRsZSBib3RoIHBhcmVudCB0YWdzLCBjb21tZW50cyBhbmQgc2VsZi1jbG9zaW5nIHRhZ3MpXG4gICAgaWYgKENPTU1FTlRfU1RBUlQudGVzdChtYXJrdXApKSB7XG4gICAgICByZXR1cm4gbWFya3VwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWFya3VwLnJlcGxhY2UoVEFHX0VORCwgJyAnICsgUmVhY3RNYXJrdXBDaGVja3N1bS5DSEVDS1NVTV9BVFRSX05BTUUgKyAnPVwiJyArIGNoZWNrc3VtICsgJ1wiJCYnKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrdXAgdG8gdXNlXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbWVudCByb290IFJlYWN0IGVsZW1lbnRcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IHRoZSBtYXJrdXAgaXMgdGhlIHNhbWVcbiAgICovXG4gIGNhblJldXNlTWFya3VwOiBmdW5jdGlvbiAobWFya3VwLCBlbGVtZW50KSB7XG4gICAgdmFyIGV4aXN0aW5nQ2hlY2tzdW0gPSBlbGVtZW50LmdldEF0dHJpYnV0ZShSZWFjdE1hcmt1cENoZWNrc3VtLkNIRUNLU1VNX0FUVFJfTkFNRSk7XG4gICAgZXhpc3RpbmdDaGVja3N1bSA9IGV4aXN0aW5nQ2hlY2tzdW0gJiYgcGFyc2VJbnQoZXhpc3RpbmdDaGVja3N1bSwgMTApO1xuICAgIHZhciBtYXJrdXBDaGVja3N1bSA9IGFkbGVyMzIobWFya3VwKTtcbiAgICByZXR1cm4gbWFya3VwQ2hlY2tzdW0gPT09IGV4aXN0aW5nQ2hlY2tzdW07XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RNYXJrdXBDaGVja3N1bTsiXX0=