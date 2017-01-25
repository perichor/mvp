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

var _prodInvariant = require('./reactProdInvariant');

var React = require('react/lib/React');
var ReactDOMContainerInfo = require('./ReactDOMContainerInfo');
var ReactDefaultBatchingStrategy = require('./ReactDefaultBatchingStrategy');
var ReactInstrumentation = require('./ReactInstrumentation');
var ReactMarkupChecksum = require('./ReactMarkupChecksum');
var ReactReconciler = require('./ReactReconciler');
var ReactServerBatchingStrategy = require('./ReactServerBatchingStrategy');
var ReactServerRenderingTransaction = require('./ReactServerRenderingTransaction');
var ReactUpdates = require('./ReactUpdates');

var emptyObject = require('fbjs/lib/emptyObject');
var instantiateReactComponent = require('./instantiateReactComponent');
var invariant = require('fbjs/lib/invariant');

var pendingTransactions = 0;

/**
 * @param {ReactElement} element
 * @return {string} the HTML markup
 */
function renderToStringImpl(element, makeStaticMarkup) {
  var transaction;
  try {
    ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);

    transaction = ReactServerRenderingTransaction.getPooled(makeStaticMarkup);

    pendingTransactions++;

    return transaction.perform(function () {
      var componentInstance = instantiateReactComponent(element, true);
      var markup = ReactReconciler.mountComponent(componentInstance, transaction, null, ReactDOMContainerInfo(), emptyObject, 0 /* parentDebugID */
      );
      if (process.env.NODE_ENV !== 'production') {
        ReactInstrumentation.debugTool.onUnmountComponent(componentInstance._debugID);
      }
      if (!makeStaticMarkup) {
        markup = ReactMarkupChecksum.addChecksumToMarkup(markup);
      }
      return markup;
    }, null);
  } finally {
    pendingTransactions--;
    ReactServerRenderingTransaction.release(transaction);
    // Revert to the DOM batching strategy since these two renderers
    // currently share these stateful modules.
    if (!pendingTransactions) {
      ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
    }
  }
}

/**
 * Render a ReactElement to its initial HTML. This should only be used on the
 * server.
 * See https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostring
 */
function renderToString(element) {
  !React.isValidElement(element) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'renderToString(): You must pass a valid ReactElement.') : _prodInvariant('46') : void 0;
  return renderToStringImpl(element, false);
}

/**
 * Similar to renderToString, except this doesn't create extra DOM attributes
 * such as data-react-id that React uses internally.
 * See https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostaticmarkup
 */
function renderToStaticMarkup(element) {
  !React.isValidElement(element) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'renderToStaticMarkup(): You must pass a valid ReactElement.') : _prodInvariant('47') : void 0;
  return renderToStringImpl(element, true);
}

module.exports = {
  renderToString: renderToString,
  renderToStaticMarkup: renderToStaticMarkup
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdFNlcnZlclJlbmRlcmluZy5qcyJdLCJuYW1lcyI6WyJfcHJvZEludmFyaWFudCIsInJlcXVpcmUiLCJSZWFjdCIsIlJlYWN0RE9NQ29udGFpbmVySW5mbyIsIlJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kiLCJSZWFjdEluc3RydW1lbnRhdGlvbiIsIlJlYWN0TWFya3VwQ2hlY2tzdW0iLCJSZWFjdFJlY29uY2lsZXIiLCJSZWFjdFNlcnZlckJhdGNoaW5nU3RyYXRlZ3kiLCJSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9uIiwiUmVhY3RVcGRhdGVzIiwiZW1wdHlPYmplY3QiLCJpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50IiwiaW52YXJpYW50IiwicGVuZGluZ1RyYW5zYWN0aW9ucyIsInJlbmRlclRvU3RyaW5nSW1wbCIsImVsZW1lbnQiLCJtYWtlU3RhdGljTWFya3VwIiwidHJhbnNhY3Rpb24iLCJpbmplY3Rpb24iLCJpbmplY3RCYXRjaGluZ1N0cmF0ZWd5IiwiZ2V0UG9vbGVkIiwicGVyZm9ybSIsImNvbXBvbmVudEluc3RhbmNlIiwibWFya3VwIiwibW91bnRDb21wb25lbnQiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJkZWJ1Z1Rvb2wiLCJvblVubW91bnRDb21wb25lbnQiLCJfZGVidWdJRCIsImFkZENoZWNrc3VtVG9NYXJrdXAiLCJyZWxlYXNlIiwicmVuZGVyVG9TdHJpbmciLCJpc1ZhbGlkRWxlbWVudCIsInJlbmRlclRvU3RhdGljTWFya3VwIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQVNBOztBQUVBLElBQUlBLGlCQUFpQkMsUUFBUSxzQkFBUixDQUFyQjs7QUFFQSxJQUFJQyxRQUFRRCxRQUFRLGlCQUFSLENBQVo7QUFDQSxJQUFJRSx3QkFBd0JGLFFBQVEseUJBQVIsQ0FBNUI7QUFDQSxJ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LyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdCcpO1xudmFyIFJlYWN0RE9NQ29udGFpbmVySW5mbyA9IHJlcXVpcmUoJy4vUmVhY3RET01Db250YWluZXJJbmZvJyk7XG52YXIgUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneSA9IHJlcXVpcmUoJy4vUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneScpO1xudmFyIFJlYWN0SW5zdHJ1bWVudGF0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xudmFyIFJlYWN0TWFya3VwQ2hlY2tzdW0gPSByZXF1aXJlKCcuL1JlYWN0TWFya3VwQ2hlY2tzdW0nKTtcbnZhciBSZWFjdFJlY29uY2lsZXIgPSByZXF1aXJlKCcuL1JlYWN0UmVjb25jaWxlcicpO1xudmFyIFJlYWN0U2VydmVyQmF0Y2hpbmdTdHJhdGVneSA9IHJlcXVpcmUoJy4vUmVhY3RTZXJ2ZXJCYXRjaGluZ1N0cmF0ZWd5Jyk7XG52YXIgUmVhY3RTZXJ2ZXJSZW5kZXJpbmdUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vUmVhY3RTZXJ2ZXJSZW5kZXJpbmdUcmFuc2FjdGlvbicpO1xudmFyIFJlYWN0VXBkYXRlcyA9IHJlcXVpcmUoJy4vUmVhY3RVcGRhdGVzJyk7XG5cbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG52YXIgcGVuZGluZ1RyYW5zYWN0aW9ucyA9IDA7XG5cbi8qKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIEhUTUwgbWFya3VwXG4gKi9cbmZ1bmN0aW9uIHJlbmRlclRvU3RyaW5nSW1wbChlbGVtZW50LCBtYWtlU3RhdGljTWFya3VwKSB7XG4gIHZhciB0cmFuc2FjdGlvbjtcbiAgdHJ5IHtcbiAgICBSZWFjdFVwZGF0ZXMuaW5qZWN0aW9uLmluamVjdEJhdGNoaW5nU3RyYXRlZ3koUmVhY3RTZXJ2ZXJCYXRjaGluZ1N0cmF0ZWd5KTtcblxuICAgIHRyYW5zYWN0aW9uID0gUmVhY3RTZXJ2ZXJSZW5kZXJpbmdUcmFuc2FjdGlvbi5nZXRQb29sZWQobWFrZVN0YXRpY01hcmt1cCk7XG5cbiAgICBwZW5kaW5nVHJhbnNhY3Rpb25zKys7XG5cbiAgICByZXR1cm4gdHJhbnNhY3Rpb24ucGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29tcG9uZW50SW5zdGFuY2UgPSBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KGVsZW1lbnQsIHRydWUpO1xuICAgICAgdmFyIG1hcmt1cCA9IFJlYWN0UmVjb25jaWxlci5tb3VudENvbXBvbmVudChjb21wb25lbnRJbnN0YW5jZSwgdHJhbnNhY3Rpb24sIG51bGwsIFJlYWN0RE9NQ29udGFpbmVySW5mbygpLCBlbXB0eU9iamVjdCwgMCAvKiBwYXJlbnREZWJ1Z0lEICovXG4gICAgICApO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uVW5tb3VudENvbXBvbmVudChjb21wb25lbnRJbnN0YW5jZS5fZGVidWdJRCk7XG4gICAgICB9XG4gICAgICBpZiAoIW1ha2VTdGF0aWNNYXJrdXApIHtcbiAgICAgICAgbWFya3VwID0gUmVhY3RNYXJrdXBDaGVja3N1bS5hZGRDaGVja3N1bVRvTWFya3VwKG1hcmt1cCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWFya3VwO1xuICAgIH0sIG51bGwpO1xuICB9IGZpbmFsbHkge1xuICAgIHBlbmRpbmdUcmFuc2FjdGlvbnMtLTtcbiAgICBSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9uLnJlbGVhc2UodHJhbnNhY3Rpb24pO1xuICAgIC8vIFJldmVydCB0byB0aGUgRE9NIGJhdGNoaW5nIHN0cmF0ZWd5IHNpbmNlIHRoZXNlIHR3byByZW5kZXJlcnNcbiAgICAvLyBjdXJyZW50bHkgc2hhcmUgdGhlc2Ugc3RhdGVmdWwgbW9kdWxlcy5cbiAgICBpZiAoIXBlbmRpbmdUcmFuc2FjdGlvbnMpIHtcbiAgICAgIFJlYWN0VXBkYXRlcy5pbmplY3Rpb24uaW5qZWN0QmF0Y2hpbmdTdHJhdGVneShSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZW5kZXIgYSBSZWFjdEVsZW1lbnQgdG8gaXRzIGluaXRpYWwgSFRNTC4gVGhpcyBzaG91bGQgb25seSBiZSB1c2VkIG9uIHRoZVxuICogc2VydmVyLlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0ZG9tc2VydmVyLnJlbmRlcnRvc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIHJlbmRlclRvU3RyaW5nKGVsZW1lbnQpIHtcbiAgIVJlYWN0LmlzVmFsaWRFbGVtZW50KGVsZW1lbnQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3JlbmRlclRvU3RyaW5nKCk6IFlvdSBtdXN0IHBhc3MgYSB2YWxpZCBSZWFjdEVsZW1lbnQuJykgOiBfcHJvZEludmFyaWFudCgnNDYnKSA6IHZvaWQgMDtcbiAgcmV0dXJuIHJlbmRlclRvU3RyaW5nSW1wbChlbGVtZW50LCBmYWxzZSk7XG59XG5cbi8qKlxuICogU2ltaWxhciB0byByZW5kZXJUb1N0cmluZywgZXhjZXB0IHRoaXMgZG9lc24ndCBjcmVhdGUgZXh0cmEgRE9NIGF0dHJpYnV0ZXNcbiAqIHN1Y2ggYXMgZGF0YS1yZWFjdC1pZCB0aGF0IFJlYWN0IHVzZXMgaW50ZXJuYWxseS5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdGRvbXNlcnZlci5yZW5kZXJ0b3N0YXRpY21hcmt1cFxuICovXG5mdW5jdGlvbiByZW5kZXJUb1N0YXRpY01hcmt1cChlbGVtZW50KSB7XG4gICFSZWFjdC5pc1ZhbGlkRWxlbWVudChlbGVtZW50KSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdyZW5kZXJUb1N0YXRpY01hcmt1cCgpOiBZb3UgbXVzdCBwYXNzIGEgdmFsaWQgUmVhY3RFbGVtZW50LicpIDogX3Byb2RJbnZhcmlhbnQoJzQ3JykgOiB2b2lkIDA7XG4gIHJldHVybiByZW5kZXJUb1N0cmluZ0ltcGwoZWxlbWVudCwgdHJ1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZW5kZXJUb1N0cmluZzogcmVuZGVyVG9TdHJpbmcsXG4gIHJlbmRlclRvU3RhdGljTWFya3VwOiByZW5kZXJUb1N0YXRpY01hcmt1cFxufTsiXX0=