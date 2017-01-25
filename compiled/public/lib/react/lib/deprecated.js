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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QvbGliL2RlcHJlY2F0ZWQuanMiXSwibmFtZXMiOlsiX2Fzc2lnbiIsInJlcXVpcmUiLCJ3YXJuaW5nIiwiZGVwcmVjYXRlZCIsImZuTmFtZSIsIm5ld01vZHVsZSIsIm5ld1BhY2thZ2UiLCJjdHgiLCJmbiIsIndhcm5lZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIm5ld0ZuIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQSxJQUFJQSxVQUFVQyxRQUFRLGVBQVIsQ0FBZDs7QUFFQSxJQUFJQyxVQUFVRCxRQUFRLGtCQUFSLENBQWQ7O0FBRUE7Ozs7Ozs7Ozs7O0FBV0EsU0FBU0UsVUFBVCxDQUFvQkMsTUFBcEIsRUFBNEJDLFNBQTVCLEVBQXVDQyxVQUF2QyxFQUFtREMsR0FBbkQsRUFBd0RDLEVBQXhELEVBQTREO0FBQzFELE1BQUlDLFNBQVMsS0FBYjtBQUNBLE1BQUlDLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QyxRQUFJQyxRQUFRLFNBQVJBLEtBQVEsR0FBWTtBQUN0QkgsY0FBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQXpCLEdBQXdDVixRQUFRTyxNQUFSO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQTBELFdBQTFELEdBQXdFLFVBTGhDLEVBSzRDTCxNQUw1QyxFQUtvREMsU0FMcEQsRUFLK0RELE1BTC9ELEVBS3VFRSxVQUx2RSxDQUF4QyxHQUs2SCxLQUFLLENBTGxJO0FBTUE7QUFDQUcsZUFBUyxJQUFUO0FBQ0EsYUFBT0QsR0FBR00sS0FBSCxDQUFTUCxHQUFULEVBQWNRLFNBQWQsQ0FBUDtBQUNELEtBVkQ7QUFXQTtBQUNBO0FBQ0FmLFlBQVFhLEtBQVIsRUFBZUwsRUFBZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFPSyxLQUFQO0FBQ0Q7O0FBRUQsU0FBT0wsRUFBUDtBQUNEOztBQUVEUSxPQUFPQyxPQUFQLEdBQWlCZCxVQUFqQiIsImZpbGUiOiJkZXByZWNhdGVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8qKlxuICogVGhpcyB3aWxsIGxvZyBhIHNpbmdsZSBkZXByZWNhdGlvbiBub3RpY2UgcGVyIGZ1bmN0aW9uIGFuZCBmb3J3YXJkIHRoZSBjYWxsXG4gKiBvbiB0byB0aGUgbmV3IEFQSS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm5OYW1lIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5ld01vZHVsZSBUaGUgbW9kdWxlIHRoYXQgZm4gd2lsbCBleGlzdCBpblxuICogQHBhcmFtIHtzdHJpbmd9IG5ld1BhY2thZ2UgVGhlIG1vZHVsZSB0aGF0IGZuIHdpbGwgZXhpc3QgaW5cbiAqIEBwYXJhbSB7Kn0gY3R4IFRoZSBjb250ZXh0IHRoaXMgZm9yd2FyZGVkIGNhbGwgc2hvdWxkIHJ1biBpblxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGZvcndhcmQgb24gdG9cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgZnVuY3Rpb24gdGhhdCB3aWxsIHdhcm4gb25jZSBhbmQgdGhlbiBjYWxsIGZuXG4gKi9cbmZ1bmN0aW9uIGRlcHJlY2F0ZWQoZm5OYW1lLCBuZXdNb2R1bGUsIG5ld1BhY2thZ2UsIGN0eCwgZm4pIHtcbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciBuZXdGbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHdhcm5lZCxcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uY2F0ICovXG4gICAgICAvLyBSZXF1aXJlIGV4YW1wbGVzIGluIHRoaXMgc3RyaW5nIG11c3QgYmUgc3BsaXQgdG8gcHJldmVudCBSZWFjdCdzXG4gICAgICAvLyBidWlsZCB0b29scyBmcm9tIG1pc3Rha2luZyB0aGVtIGZvciByZWFsIHJlcXVpcmVzLlxuICAgICAgLy8gT3RoZXJ3aXNlIHRoZSBidWlsZCB0b29scyB3aWxsIGF0dGVtcHQgdG8gYnVpbGQgYSAnJXMnIG1vZHVsZS5cbiAgICAgICdSZWFjdC4lcyBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlICVzLiVzIGZyb20gcmVxdWlyZScgKyAnKFxcJyVzXFwnKSAnICsgJ2luc3RlYWQuJywgZm5OYW1lLCBuZXdNb2R1bGUsIGZuTmFtZSwgbmV3UGFja2FnZSkgOiB2b2lkIDA7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVzZWxlc3MtY29uY2F0ICovXG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KGN0eCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICAgIC8vIFdlIG5lZWQgdG8gbWFrZSBzdXJlIGFsbCBwcm9wZXJ0aWVzIG9mIHRoZSBvcmlnaW5hbCBmbiBhcmUgY29waWVkIG92ZXIuXG4gICAgLy8gSW4gcGFydGljdWxhciwgdGhpcyBpcyBuZWVkZWQgdG8gc3VwcG9ydCBQcm9wVHlwZXNcbiAgICBfYXNzaWduKG5ld0ZuLCBmbik7XG5cbiAgICAvLyBGbG93IGlzIG5vdCBzbWFydCBlbm91Z2ggdG8gZmlndXJlIG91dCB0aGF0IG5ld0ZuIGlzIG9mIHRoZSBzYW1lIHR5cGUgYXNcbiAgICAvLyBmbi4gU2luY2Ugd2UgZG9uJ3Qgd2FudCB0byBsb3NlIG91dCB0aGUgdHlwZSBvZiB0aGUgZnVuY3Rpb24sIGNhc3RpbmdcbiAgICAvLyB0byBhbnkgYW5kIGZvcmNlIGZsb3cgdG8gdXNlIFQuXG4gICAgcmV0dXJuIG5ld0ZuO1xuICB9XG5cbiAgcmV0dXJuIGZuO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlcHJlY2F0ZWQ7Il19