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

var _assign = require('object-assign');

var warning = require('fbjs/lib/warning');

/**
 * This will log a single deprecation notice per function and forward the call
 * on to the new API.
 *
 * @param {string} fnName The name of the function
 * @param {string} newModule The module that fn will exist in
 * @param {string} newPackage The module that fn will exist in
 * @param {*} ctx The context this forwarded call should run in
 * @param {function} fn The function to forward on to
 * @return {function} The function that will warn once and then call fn
 */
function deprecated(fnName, newModule, newPackage, ctx, fn) {
  var warned = false;
  if (process.env.NODE_ENV !== 'production') {
    var newFn = function newFn() {
      process.env.NODE_ENV !== 'production' ? warning(warned,
      /* eslint-disable no-useless-concat */
      // Require examples in this string must be split to prevent React's
      // build tools from mistaking them for real requires.
      // Otherwise the build tools will attempt to build a '%s' module.
      'React.%s is deprecated. Please use %s.%s from require' + '(\'%s\') ' + 'instead.', fnName, newModule, fnName, newPackage) : void 0;
      /* eslint-enable no-useless-concat */
      warned = true;
      return fn.apply(ctx, arguments);
    };
    // We need to make sure all properties of the original fn are copied over.
    // In particular, this is needed to support PropTypes
    _assign(newFn, fn);

    // Flow is not smart enough to figure out that newFn is of the same type as
    // fn. Since we don't want to lose out the type of the function, casting
    // to any and force flow to use T.
    return newFn;
  }

  return fn;
}

module.exports = deprecated;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9kZXByZWNhdGVkLmpzIl0sIm5hbWVzIjpbIl9hc3NpZ24iLCJyZXF1aXJlIiwid2FybmluZyIsImRlcHJlY2F0ZWQiLCJmbk5hbWUiLCJuZXdNb2R1bGUiLCJuZXdQYWNrYWdlIiwiY3R4IiwiZm4iLCJ3YXJuZWQiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJuZXdGbiIsImFwcGx5IiwiYXJndW1lbnRzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUEsSUFBSUEsVUFBVUMsUUFBUSxlQUFSLENBQWQ7O0FBRUEsSUFBSUMsVUFBVUQsUUFBUSxrQkFBUixDQUFkOztBQUVBOzs7Ozs7Ozs7OztBQVdBLFNBQVNFLFVBQVQsQ0FBb0JDLE1BQXBCLEVBQTRCQyxTQUE1QixFQUF1Q0MsVUFBdkMsRUFBbURDLEdBQW5ELEVBQXdEQyxFQUF4RCxFQUE0RDtBQUMxRCxNQUFJQyxTQUFTLEtBQWI7QUFDQSxNQUFJQyxRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMsUUFBSUMsUUFBUSxTQUFSQSxLQUFRLEdBQVk7QUFDdEJILGNBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUF6QixHQUF3Q1YsUUFBUU8sTUFBUjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUEwRCxXQUExRCxHQUF3RSxVQUxoQyxFQUs0Q0wsTUFMNUMsRUFLb0RDLFNBTHBELEVBSytERCxNQUwvRCxFQUt1RUUsVUFMdkUsQ0FBeEMsR0FLNkgsS0FBSyxDQUxsSTtBQU1BO0FBQ0FHLGVBQVMsSUFBVDtBQUNBLGFBQU9ELEdBQUdNLEtBQUgsQ0FBU1AsR0FBVCxFQUFjUSxTQUFkLENBQVA7QUFDRCxLQVZEO0FBV0E7QUFDQTtBQUNBZixZQUFRYSxLQUFSLEVBQWVMLEVBQWY7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBT0ssS0FBUDtBQUNEOztBQUVELFNBQU9MLEVBQVA7QUFDRDs7QUFFRFEsT0FBT0MsT0FBUCxHQUFpQmQsVUFBakIiLCJmaWxlIjoiZGVwcmVjYXRlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG4vKipcbiAqIFRoaXMgd2lsbCBsb2cgYSBzaW5nbGUgZGVwcmVjYXRpb24gbm90aWNlIHBlciBmdW5jdGlvbiBhbmQgZm9yd2FyZCB0aGUgY2FsbFxuICogb24gdG8gdGhlIG5ldyBBUEkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZuTmFtZSBUaGUgbmFtZSBvZiB0aGUgZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuZXdNb2R1bGUgVGhlIG1vZHVsZSB0aGF0IGZuIHdpbGwgZXhpc3QgaW5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuZXdQYWNrYWdlIFRoZSBtb2R1bGUgdGhhdCBmbiB3aWxsIGV4aXN0IGluXG4gKiBAcGFyYW0geyp9IGN0eCBUaGUgY29udGV4dCB0aGlzIGZvcndhcmRlZCBjYWxsIHNob3VsZCBydW4gaW5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBmb3J3YXJkIG9uIHRvXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCB3YXJuIG9uY2UgYW5kIHRoZW4gY2FsbCBmblxuICovXG5mdW5jdGlvbiBkZXByZWNhdGVkKGZuTmFtZSwgbmV3TW9kdWxlLCBuZXdQYWNrYWdlLCBjdHgsIGZuKSB7XG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgbmV3Rm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh3YXJuZWQsXG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbmNhdCAqL1xuICAgICAgLy8gUmVxdWlyZSBleGFtcGxlcyBpbiB0aGlzIHN0cmluZyBtdXN0IGJlIHNwbGl0IHRvIHByZXZlbnQgUmVhY3Qnc1xuICAgICAgLy8gYnVpbGQgdG9vbHMgZnJvbSBtaXN0YWtpbmcgdGhlbSBmb3IgcmVhbCByZXF1aXJlcy5cbiAgICAgIC8vIE90aGVyd2lzZSB0aGUgYnVpbGQgdG9vbHMgd2lsbCBhdHRlbXB0IHRvIGJ1aWxkIGEgJyVzJyBtb2R1bGUuXG4gICAgICAnUmVhY3QuJXMgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSAlcy4lcyBmcm9tIHJlcXVpcmUnICsgJyhcXCclc1xcJykgJyArICdpbnN0ZWFkLicsIGZuTmFtZSwgbmV3TW9kdWxlLCBmbk5hbWUsIG5ld1BhY2thZ2UpIDogdm9pZCAwO1xuICAgICAgLyogZXNsaW50LWVuYWJsZSBuby11c2VsZXNzLWNvbmNhdCAqL1xuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiBmbi5hcHBseShjdHgsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSBhbGwgcHJvcGVydGllcyBvZiB0aGUgb3JpZ2luYWwgZm4gYXJlIGNvcGllZCBvdmVyLlxuICAgIC8vIEluIHBhcnRpY3VsYXIsIHRoaXMgaXMgbmVlZGVkIHRvIHN1cHBvcnQgUHJvcFR5cGVzXG4gICAgX2Fzc2lnbihuZXdGbiwgZm4pO1xuXG4gICAgLy8gRmxvdyBpcyBub3Qgc21hcnQgZW5vdWdoIHRvIGZpZ3VyZSBvdXQgdGhhdCBuZXdGbiBpcyBvZiB0aGUgc2FtZSB0eXBlIGFzXG4gICAgLy8gZm4uIFNpbmNlIHdlIGRvbid0IHdhbnQgdG8gbG9zZSBvdXQgdGhlIHR5cGUgb2YgdGhlIGZ1bmN0aW9uLCBjYXN0aW5nXG4gICAgLy8gdG8gYW55IGFuZCBmb3JjZSBmbG93IHRvIHVzZSBULlxuICAgIHJldHVybiBuZXdGbjtcbiAgfVxuXG4gIHJldHVybiBmbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZXByZWNhdGVkOyJdfQ==