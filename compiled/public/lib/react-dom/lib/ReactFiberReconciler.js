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

var _require = require('./ReactFiberRoot'),
    createFiberRoot = _require.createFiberRoot;

var ReactFiberScheduler = require('./ReactFiberScheduler');

module.exports = function (config) {
  var _ReactFiberScheduler = ReactFiberScheduler(config),
      scheduleWork = _ReactFiberScheduler.scheduleWork,
      performWithPriority = _ReactFiberScheduler.performWithPriority;

  return {
    mountContainer: function mountContainer(element, containerInfo) {
      var root = createFiberRoot(containerInfo);
      var container = root.current;
      // TODO: Use pending work/state instead of props.
      // TODO: This should not override the pendingWorkPriority if there is
      // higher priority work in the subtree.
      container.pendingProps = element;

      scheduleWork(root);

      // It may seem strange that we don't return the root here, but that will
      // allow us to have containers that are in the middle of the tree instead
      // of being roots.
      return container;
    },
    updateContainer: function updateContainer(element, container) {
      // TODO: If this is a nested container, this won't be the root.
      var root = container.stateNode;
      // TODO: Use pending work/state instead of props.
      root.current.pendingProps = element;

      scheduleWork(root);
    },
    unmountContainer: function unmountContainer(container) {
      // TODO: If this is a nested container, this won't be the root.
      var root = container.stateNode;
      // TODO: Use pending work/state instead of props.
      root.current.pendingProps = [];

      scheduleWork(root);
    },

    performWithPriority: performWithPriority,

    getPublicRootInstance: function getPublicRootInstance(container) {
      return null;
    }
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdEZpYmVyUmVjb25jaWxlci5qcyJdLCJuYW1lcyI6WyJfcmVxdWlyZSIsInJlcXVpcmUiLCJjcmVhdGVGaWJlclJvb3QiLCJSZWFjdEZpYmVyU2NoZWR1bGVyIiwibW9kdWxlIiwiZXhwb3J0cyIsImNvbmZpZyIsIl9SZWFjdEZpYmVyU2NoZWR1bGVyIiwic2NoZWR1bGVXb3JrIiwicGVyZm9ybVdpdGhQcmlvcml0eSIsIm1vdW50Q29udGFpbmVyIiwiZWxlbWVudCIsImNvbnRhaW5lckluZm8iLCJyb290IiwiY29udGFpbmVyIiwiY3VycmVudCIsInBlbmRpbmdQcm9wcyIsInVwZGF0ZUNvbnRhaW5lciIsInN0YXRlTm9kZSIsInVubW91bnRDb250YWluZXIiLCJnZXRQdWJsaWNSb290SW5zdGFuY2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQVdBOztBQUVBLElBQUlBLFdBQVdDLFFBQVEsa0JBQVIsQ0FBZjtBQUFBLElBQ0lDLGtCQUFrQkYsU0FBU0UsZUFEL0I7O0FBR0EsSUFBSUMsc0JBQXNCRixRQUFRLHVCQUFSLENBQTFCOztBQUVBRyxPQUFPQyxPQUFQLEdBQWlCLFVBQVVDLE1BQVYsRUFBa0I7QUFDakMsTUFBSUMsdUJBQXVCSixvQkFBb0JHLE1BQXBCLENBQTNCO0FBQUEsTUFDSUUsZUFBZUQscUJBQXFCQyxZQUR4QztBQUFBLE1BRUlDLHNCQUFzQkYscUJBQXFCRSxtQkFGL0M7O0FBSUEsU0FBTztBQUNMQyxvQkFBZ0Isd0JBQVVDLE9BQVYsRUFBbUJDLGFBQW5CLEVBQWtDO0FBQ2hELFVBQUlDLE9BQU9YLGdCQUFnQlUsYUFBaEIsQ0FBWDtBQUNBLFVBQUlFLFlBQVlELEtBQUtFLE9BQXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0FELGdCQUFVRSxZQUFWLEdBQXlCTCxPQUF6Qjs7QUFFQUgsbUJBQWFLLElBQWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBT0MsU0FBUDtBQUNELEtBZkk7QUFnQkxHLHFCQUFpQix5QkFBVU4sT0FBVixFQUFtQkcsU0FBbkIsRUFBOEI7QUFDN0M7QUFDQSxVQUFJRCxPQUFPQyxVQUFVSSxTQUFyQjtBQUNBO0FBQ0FMLFdBQUtFLE9BQUwsQ0FBYUMsWUFBYixHQUE0QkwsT0FBNUI7O0FBRUFILG1CQUFhSyxJQUFiO0FBQ0QsS0F2Qkk7QUF3QkxNLHNCQUFrQiwwQkFBVUwsU0FBVixFQUFxQjtBQUNyQztBQUNBLFVBQUlELE9BQU9DLFVBQVVJLFNBQXJCO0FBQ0E7QUFDQUwsV0FBS0UsT0FBTCxDQUFhQyxZQUFiLEdBQTRCLEVBQTVCOztBQUVBUixtQkFBYUssSUFBYjtBQUNELEtBL0JJOztBQWtDTEoseUJBQXFCQSxtQkFsQ2hCOztBQW9DTFcsMkJBQXVCLCtCQUFVTixTQUFWLEVBQXFCO0FBQzFDLGFBQU8sSUFBUDtBQUNEO0FBdENJLEdBQVA7QUF3Q0QsQ0E3Q0QiLCJmaWxlIjoiUmVhY3RGaWJlclJlY29uY2lsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vUmVhY3RGaWJlclJvb3QnKSxcbiAgICBjcmVhdGVGaWJlclJvb3QgPSBfcmVxdWlyZS5jcmVhdGVGaWJlclJvb3Q7XG5cbnZhciBSZWFjdEZpYmVyU2NoZWR1bGVyID0gcmVxdWlyZSgnLi9SZWFjdEZpYmVyU2NoZWR1bGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICB2YXIgX1JlYWN0RmliZXJTY2hlZHVsZXIgPSBSZWFjdEZpYmVyU2NoZWR1bGVyKGNvbmZpZyksXG4gICAgICBzY2hlZHVsZVdvcmsgPSBfUmVhY3RGaWJlclNjaGVkdWxlci5zY2hlZHVsZVdvcmssXG4gICAgICBwZXJmb3JtV2l0aFByaW9yaXR5ID0gX1JlYWN0RmliZXJTY2hlZHVsZXIucGVyZm9ybVdpdGhQcmlvcml0eTtcblxuICByZXR1cm4ge1xuICAgIG1vdW50Q29udGFpbmVyOiBmdW5jdGlvbiAoZWxlbWVudCwgY29udGFpbmVySW5mbykge1xuICAgICAgdmFyIHJvb3QgPSBjcmVhdGVGaWJlclJvb3QoY29udGFpbmVySW5mbyk7XG4gICAgICB2YXIgY29udGFpbmVyID0gcm9vdC5jdXJyZW50O1xuICAgICAgLy8gVE9ETzogVXNlIHBlbmRpbmcgd29yay9zdGF0ZSBpbnN0ZWFkIG9mIHByb3BzLlxuICAgICAgLy8gVE9ETzogVGhpcyBzaG91bGQgbm90IG92ZXJyaWRlIHRoZSBwZW5kaW5nV29ya1ByaW9yaXR5IGlmIHRoZXJlIGlzXG4gICAgICAvLyBoaWdoZXIgcHJpb3JpdHkgd29yayBpbiB0aGUgc3VidHJlZS5cbiAgICAgIGNvbnRhaW5lci5wZW5kaW5nUHJvcHMgPSBlbGVtZW50O1xuXG4gICAgICBzY2hlZHVsZVdvcmsocm9vdCk7XG5cbiAgICAgIC8vIEl0IG1heSBzZWVtIHN0cmFuZ2UgdGhhdCB3ZSBkb24ndCByZXR1cm4gdGhlIHJvb3QgaGVyZSwgYnV0IHRoYXQgd2lsbFxuICAgICAgLy8gYWxsb3cgdXMgdG8gaGF2ZSBjb250YWluZXJzIHRoYXQgYXJlIGluIHRoZSBtaWRkbGUgb2YgdGhlIHRyZWUgaW5zdGVhZFxuICAgICAgLy8gb2YgYmVpbmcgcm9vdHMuXG4gICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH0sXG4gICAgdXBkYXRlQ29udGFpbmVyOiBmdW5jdGlvbiAoZWxlbWVudCwgY29udGFpbmVyKSB7XG4gICAgICAvLyBUT0RPOiBJZiB0aGlzIGlzIGEgbmVzdGVkIGNvbnRhaW5lciwgdGhpcyB3b24ndCBiZSB0aGUgcm9vdC5cbiAgICAgIHZhciByb290ID0gY29udGFpbmVyLnN0YXRlTm9kZTtcbiAgICAgIC8vIFRPRE86IFVzZSBwZW5kaW5nIHdvcmsvc3RhdGUgaW5zdGVhZCBvZiBwcm9wcy5cbiAgICAgIHJvb3QuY3VycmVudC5wZW5kaW5nUHJvcHMgPSBlbGVtZW50O1xuXG4gICAgICBzY2hlZHVsZVdvcmsocm9vdCk7XG4gICAgfSxcbiAgICB1bm1vdW50Q29udGFpbmVyOiBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAvLyBUT0RPOiBJZiB0aGlzIGlzIGEgbmVzdGVkIGNvbnRhaW5lciwgdGhpcyB3b24ndCBiZSB0aGUgcm9vdC5cbiAgICAgIHZhciByb290ID0gY29udGFpbmVyLnN0YXRlTm9kZTtcbiAgICAgIC8vIFRPRE86IFVzZSBwZW5kaW5nIHdvcmsvc3RhdGUgaW5zdGVhZCBvZiBwcm9wcy5cbiAgICAgIHJvb3QuY3VycmVudC5wZW5kaW5nUHJvcHMgPSBbXTtcblxuICAgICAgc2NoZWR1bGVXb3JrKHJvb3QpO1xuICAgIH0sXG5cblxuICAgIHBlcmZvcm1XaXRoUHJpb3JpdHk6IHBlcmZvcm1XaXRoUHJpb3JpdHksXG5cbiAgICBnZXRQdWJsaWNSb290SW5zdGFuY2U6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcbn07Il19