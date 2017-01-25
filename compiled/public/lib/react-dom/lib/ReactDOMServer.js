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

var ReactDefaultInjection = require('./ReactDefaultInjection');
var ReactServerRendering = require('./ReactServerRendering');
var ReactVersion = require('./ReactVersion');

ReactDefaultInjection.inject();

var ReactDOMServer = {
  renderToString: ReactServerRendering.renderToString,
  renderToStaticMarkup: ReactServerRendering.renderToStaticMarkup,
  version: ReactVersion
};

module.exports = ReactDOMServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdERPTVNlcnZlci5qcyJdLCJuYW1lcyI6WyJSZWFjdERlZmF1bHRJbmplY3Rpb24iLCJyZXF1aXJlIiwiUmVhY3RTZXJ2ZXJSZW5kZXJpbmciLCJSZWFjdFZlcnNpb24iLCJpbmplY3QiLCJSZWFjdERPTVNlcnZlciIsInJlbmRlclRvU3RyaW5nIiwicmVuZGVyVG9TdGF0aWNNYXJrdXAiLCJ2ZXJzaW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxJQUFJQSx3QkFBd0JDLFFBQVEseUJBQVIsQ0FBNUI7QUFDQSxJQUFJQyx1QkFBdUJELFFBQVEsd0JBQVIsQ0FBM0I7QUFDQSxJQUFJRSxlQUFlRixRQUFRLGdCQUFSLENBQW5COztBQUVBRCxzQkFBc0JJLE1BQXRCOztBQUVBLElBQUlDLGlCQUFpQjtBQUNuQkMsa0JBQWdCSixxQkFBcUJJLGNBRGxCO0FBRW5CQyx3QkFBc0JMLHFCQUFxQkssb0JBRnhCO0FBR25CQyxXQUFTTDtBQUhVLENBQXJCOztBQU1BTSxPQUFPQyxPQUFQLEdBQWlCTCxjQUFqQiIsImZpbGUiOiJSZWFjdERPTVNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdERlZmF1bHRJbmplY3Rpb24gPSByZXF1aXJlKCcuL1JlYWN0RGVmYXVsdEluamVjdGlvbicpO1xudmFyIFJlYWN0U2VydmVyUmVuZGVyaW5nID0gcmVxdWlyZSgnLi9SZWFjdFNlcnZlclJlbmRlcmluZycpO1xudmFyIFJlYWN0VmVyc2lvbiA9IHJlcXVpcmUoJy4vUmVhY3RWZXJzaW9uJyk7XG5cblJlYWN0RGVmYXVsdEluamVjdGlvbi5pbmplY3QoKTtcblxudmFyIFJlYWN0RE9NU2VydmVyID0ge1xuICByZW5kZXJUb1N0cmluZzogUmVhY3RTZXJ2ZXJSZW5kZXJpbmcucmVuZGVyVG9TdHJpbmcsXG4gIHJlbmRlclRvU3RhdGljTWFya3VwOiBSZWFjdFNlcnZlclJlbmRlcmluZy5yZW5kZXJUb1N0YXRpY01hcmt1cCxcbiAgdmVyc2lvbjogUmVhY3RWZXJzaW9uXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NU2VydmVyOyJdfQ==