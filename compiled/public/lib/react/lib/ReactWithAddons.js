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

var LinkedStateMixin = require('./LinkedStateMixin');
var React = require('./React');
var ReactAddonsDOMDependencies = require('./ReactAddonsDOMDependencies');
var ReactComponentWithPureRenderMixin = require('./ReactComponentWithPureRenderMixin');
var ReactCSSTransitionGroup = require('./ReactCSSTransitionGroup');
var ReactFragment = require('./ReactFragment');
var ReactTransitionGroup = require('./ReactTransitionGroup');

var shallowCompare = require('./shallowCompare');
var update = require('./update');

React.addons = {
  CSSTransitionGroup: ReactCSSTransitionGroup,
  LinkedStateMixin: LinkedStateMixin,
  PureRenderMixin: ReactComponentWithPureRenderMixin,
  TransitionGroup: ReactTransitionGroup,

  createFragment: ReactFragment.create,
  shallowCompare: shallowCompare,
  update: update
};

if (process.env.NODE_ENV !== 'production') {
  // For the UMD build we get these lazily from the global since they're tied
  // to the DOM renderer and it hasn't loaded yet.
  Object.defineProperty(React.addons, 'Perf', {
    enumerable: true,
    get: function get() {
      return ReactAddonsDOMDependencies.getReactPerf();
    }
  });
  Object.defineProperty(React.addons, 'TestUtils', {
    enumerable: true,
    get: function get() {
      return ReactAddonsDOMDependencies.getReactTestUtils();
    }
  });
}

module.exports = React;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QvbGliL1JlYWN0V2l0aEFkZG9ucy5qcyJdLCJuYW1lcyI6WyJMaW5rZWRTdGF0ZU1peGluIiwicmVxdWlyZSIsIlJlYWN0IiwiUmVhY3RBZGRvbnNET01EZXBlbmRlbmNpZXMiLCJSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4iLCJSZWFjdENTU1RyYW5zaXRpb25Hcm91cCIsIlJlYWN0RnJhZ21lbnQiLCJSZWFjdFRyYW5zaXRpb25Hcm91cCIsInNoYWxsb3dDb21wYXJlIiwidXBkYXRlIiwiYWRkb25zIiwiQ1NTVHJhbnNpdGlvbkdyb3VwIiwiUHVyZVJlbmRlck1peGluIiwiVHJhbnNpdGlvbkdyb3VwIiwiY3JlYXRlRnJhZ21lbnQiLCJjcmVhdGUiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJnZXRSZWFjdFBlcmYiLCJnZXRSZWFjdFRlc3RVdGlscyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsSUFBSUEsbUJBQW1CQyxRQUFRLG9CQUFSLENBQXZCO0FBQ0EsSUFBSUMsUUFBUUQsUUFBUSxTQUFSLENBQVo7QUFDQSxJQUFJRSw2QkFBNkJGLFFBQVEsOEJBQVIsQ0FBakM7QUFDQSxJQUFJRyxvQ0FBb0NILFFBQVEscUNBQVIsQ0FBeEM7QUFDQSxJQUFJSSwwQkFBMEJKLFFBQVEsMkJBQVIsQ0FBOUI7QUFDQSxJQUFJSyxnQkFBZ0JMLFFBQVEsaUJBQVIsQ0FBcEI7QUFDQSxJQUFJTSx1QkFBdUJOLFFBQVEsd0JBQVIsQ0FBM0I7O0FBRUEsSUFBSU8saUJBQWlCUCxRQUFRLGtCQUFSLENBQXJCO0FBQ0EsSUFBSVEsU0FBU1IsUUFBUSxVQUFSLENBQWI7O0FBRUFDLE1BQU1RLE1BQU4sR0FBZTtBQUNiQyxzQkFBb0JOLHVCQURQO0FBRWJMLG9CQUFrQkEsZ0JBRkw7QUFHYlksbUJBQWlCUixpQ0FISjtBQUliUyxtQkFBaUJOLG9CQUpKOztBQU1iTyxrQkFBZ0JSLGNBQWNTLE1BTmpCO0FBT2JQLGtCQUFnQkEsY0FQSDtBQVFiQyxVQUFRQTtBQVJLLENBQWY7O0FBV0EsSUFBSU8sUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDO0FBQ0E7QUFDQUMsU0FBT0MsY0FBUCxDQUFzQmxCLE1BQU1RLE1BQTVCLEVBQW9DLE1BQXBDLEVBQTRDO0FBQzFDVyxnQkFBWSxJQUQ4QjtBQUUxQ0MsU0FBSyxlQUFZO0FBQ2YsYUFBT25CLDJCQUEyQm9CLFlBQTNCLEVBQVA7QUFDRDtBQUp5QyxHQUE1QztBQU1BSixTQUFPQyxjQUFQLENBQXNCbEIsTUFBTVEsTUFBNUIsRUFBb0MsV0FBcEMsRUFBaUQ7QUFDL0NXLGdCQUFZLElBRG1DO0FBRS9DQyxTQUFLLGVBQVk7QUFDZixhQUFPbkIsMkJBQTJCcUIsaUJBQTNCLEVBQVA7QUFDRDtBQUo4QyxHQUFqRDtBQU1EOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCeEIsS0FBakIiLCJmaWxlIjoiUmVhY3RXaXRoQWRkb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpbmtlZFN0YXRlTWl4aW4gPSByZXF1aXJlKCcuL0xpbmtlZFN0YXRlTWl4aW4nKTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoJy4vUmVhY3QnKTtcbnZhciBSZWFjdEFkZG9uc0RPTURlcGVuZGVuY2llcyA9IHJlcXVpcmUoJy4vUmVhY3RBZGRvbnNET01EZXBlbmRlbmNpZXMnKTtcbnZhciBSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4gPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpbicpO1xudmFyIFJlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwID0gcmVxdWlyZSgnLi9SZWFjdENTU1RyYW5zaXRpb25Hcm91cCcpO1xudmFyIFJlYWN0RnJhZ21lbnQgPSByZXF1aXJlKCcuL1JlYWN0RnJhZ21lbnQnKTtcbnZhciBSZWFjdFRyYW5zaXRpb25Hcm91cCA9IHJlcXVpcmUoJy4vUmVhY3RUcmFuc2l0aW9uR3JvdXAnKTtcblxudmFyIHNoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgnLi9zaGFsbG93Q29tcGFyZScpO1xudmFyIHVwZGF0ZSA9IHJlcXVpcmUoJy4vdXBkYXRlJyk7XG5cblJlYWN0LmFkZG9ucyA9IHtcbiAgQ1NTVHJhbnNpdGlvbkdyb3VwOiBSZWFjdENTU1RyYW5zaXRpb25Hcm91cCxcbiAgTGlua2VkU3RhdGVNaXhpbjogTGlua2VkU3RhdGVNaXhpbixcbiAgUHVyZVJlbmRlck1peGluOiBSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4sXG4gIFRyYW5zaXRpb25Hcm91cDogUmVhY3RUcmFuc2l0aW9uR3JvdXAsXG5cbiAgY3JlYXRlRnJhZ21lbnQ6IFJlYWN0RnJhZ21lbnQuY3JlYXRlLFxuICBzaGFsbG93Q29tcGFyZTogc2hhbGxvd0NvbXBhcmUsXG4gIHVwZGF0ZTogdXBkYXRlXG59O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAvLyBGb3IgdGhlIFVNRCBidWlsZCB3ZSBnZXQgdGhlc2UgbGF6aWx5IGZyb20gdGhlIGdsb2JhbCBzaW5jZSB0aGV5J3JlIHRpZWRcbiAgLy8gdG8gdGhlIERPTSByZW5kZXJlciBhbmQgaXQgaGFzbid0IGxvYWRlZCB5ZXQuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFjdC5hZGRvbnMsICdQZXJmJywge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gUmVhY3RBZGRvbnNET01EZXBlbmRlbmNpZXMuZ2V0UmVhY3RQZXJmKCk7XG4gICAgfVxuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWN0LmFkZG9ucywgJ1Rlc3RVdGlscycsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFJlYWN0QWRkb25zRE9NRGVwZW5kZW5jaWVzLmdldFJlYWN0VGVzdFV0aWxzKCk7XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDsiXX0=