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

var _prodInvariant = require('./reactProdInvariant'),
    _assign = require('object-assign');

var EventConstants = require('./EventConstants');
var EventPluginHub = require('./EventPluginHub');
var EventPluginRegistry = require('./EventPluginRegistry');
var EventPropagators = require('./EventPropagators');
var React = require('react/lib/React');
var ReactDOM = require('./ReactDOM');
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
var ReactBrowserEventEmitter = require('./ReactBrowserEventEmitter');
var ReactInstanceMap = require('./ReactInstanceMap');
var ReactUpdates = require('./ReactUpdates');
var SyntheticEvent = require('./SyntheticEvent');
var ReactShallowRenderer = require('./ReactShallowRenderer');

var findDOMNode = require('./findDOMNode');
var invariant = require('fbjs/lib/invariant');

var topLevelTypes = EventConstants.topLevelTypes;

function Event(suffix) {}

/**
 * @class ReactTestUtils
 */

function findAllInRenderedTreeInternal(inst, test) {
  if (!inst || !inst.getPublicInstance) {
    return [];
  }
  var publicInst = inst.getPublicInstance();
  var ret = test(publicInst) ? [publicInst] : [];
  var currentElement = inst._currentElement;
  if (ReactTestUtils.isDOMComponent(publicInst)) {
    var renderedChildren = inst._renderedChildren;
    var key;
    for (key in renderedChildren) {
      if (!renderedChildren.hasOwnProperty(key)) {
        continue;
      }
      ret = ret.concat(findAllInRenderedTreeInternal(renderedChildren[key], test));
    }
  } else if (React.isValidElement(currentElement) && typeof currentElement.type === 'function') {
    ret = ret.concat(findAllInRenderedTreeInternal(inst._renderedComponent, test));
  }
  return ret;
}

/**
 * Utilities for making it easy to test React components.
 *
 * See https://facebook.github.io/react/docs/test-utils.html
 *
 * Todo: Support the entire DOM.scry query syntax. For now, these simple
 * utilities will suffice for testing purposes.
 * @lends ReactTestUtils
 */
var ReactTestUtils = {
  renderIntoDocument: function renderIntoDocument(element) {
    var div = document.createElement('div');
    // None of our tests actually require attaching the container to the
    // DOM, and doing so creates a mess that we rely on test isolation to
    // clean up, so we're going to stop honoring the name of this method
    // (and probably rename it eventually) if no problems arise.
    // document.documentElement.appendChild(div);
    return ReactDOM.render(element, div);
  },

  isElement: function isElement(element) {
    return React.isValidElement(element);
  },

  isElementOfType: function isElementOfType(inst, convenienceConstructor) {
    return React.isValidElement(inst) && inst.type === convenienceConstructor;
  },

  isDOMComponent: function isDOMComponent(inst) {
    return !!(inst && inst.nodeType === 1 && inst.tagName);
  },

  isDOMComponentElement: function isDOMComponentElement(inst) {
    return !!(inst && React.isValidElement(inst) && !!inst.tagName);
  },

  isCompositeComponent: function isCompositeComponent(inst) {
    if (ReactTestUtils.isDOMComponent(inst)) {
      // Accessing inst.setState warns; just return false as that'll be what
      // this returns when we have DOM nodes as refs directly
      return false;
    }
    return inst != null && typeof inst.render === 'function' && typeof inst.setState === 'function';
  },

  isCompositeComponentWithType: function isCompositeComponentWithType(inst, type) {
    if (!ReactTestUtils.isCompositeComponent(inst)) {
      return false;
    }
    var internalInstance = ReactInstanceMap.get(inst);
    var constructor = internalInstance._currentElement.type;

    return constructor === type;
  },

  isCompositeComponentElement: function isCompositeComponentElement(inst) {
    if (!React.isValidElement(inst)) {
      return false;
    }
    // We check the prototype of the type that will get mounted, not the
    // instance itself. This is a future proof way of duck typing.
    var prototype = inst.type.prototype;
    return typeof prototype.render === 'function' && typeof prototype.setState === 'function';
  },

  isCompositeComponentElementWithType: function isCompositeComponentElementWithType(inst, type) {
    var internalInstance = ReactInstanceMap.get(inst);
    var constructor = internalInstance._currentElement.type;

    return !!(ReactTestUtils.isCompositeComponentElement(inst) && constructor === type);
  },

  getRenderedChildOfCompositeComponent: function getRenderedChildOfCompositeComponent(inst) {
    if (!ReactTestUtils.isCompositeComponent(inst)) {
      return null;
    }
    var internalInstance = ReactInstanceMap.get(inst);
    return internalInstance._renderedComponent.getPublicInstance();
  },

  findAllInRenderedTree: function findAllInRenderedTree(inst, test) {
    if (!inst) {
      return [];
    }
    !ReactTestUtils.isCompositeComponent(inst) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'findAllInRenderedTree(...): instance must be a composite component') : _prodInvariant('10') : void 0;
    return findAllInRenderedTreeInternal(ReactInstanceMap.get(inst), test);
  },

  /**
   * Finds all instance of components in the rendered tree that are DOM
   * components with the class name matching `className`.
   * @return {array} an array of all the matches.
   */
  scryRenderedDOMComponentsWithClass: function scryRenderedDOMComponentsWithClass(root, classNames) {
    return ReactTestUtils.findAllInRenderedTree(root, function (inst) {
      if (ReactTestUtils.isDOMComponent(inst)) {
        var className = inst.className;
        if (typeof className !== 'string') {
          // SVG, probably.
          className = inst.getAttribute('class') || '';
        }
        var classList = className.split(/\s+/);

        if (!Array.isArray(classNames)) {
          !(classNames !== undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'TestUtils.scryRenderedDOMComponentsWithClass expects a className as a second argument.') : _prodInvariant('11') : void 0;
          classNames = classNames.split(/\s+/);
        }
        return classNames.every(function (name) {
          return classList.indexOf(name) !== -1;
        });
      }
      return false;
    });
  },

  /**
   * Like scryRenderedDOMComponentsWithClass but expects there to be one result,
   * and returns that one result, or throws exception if there is any other
   * number of matches besides one.
   * @return {!ReactDOMComponent} The one match.
   */
  findRenderedDOMComponentWithClass: function findRenderedDOMComponentWithClass(root, className) {
    var all = ReactTestUtils.scryRenderedDOMComponentsWithClass(root, className);
    if (all.length !== 1) {
      throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for class:' + className);
    }
    return all[0];
  },

  /**
   * Finds all instance of components in the rendered tree that are DOM
   * components with the tag name matching `tagName`.
   * @return {array} an array of all the matches.
   */
  scryRenderedDOMComponentsWithTag: function scryRenderedDOMComponentsWithTag(root, tagName) {
    return ReactTestUtils.findAllInRenderedTree(root, function (inst) {
      return ReactTestUtils.isDOMComponent(inst) && inst.tagName.toUpperCase() === tagName.toUpperCase();
    });
  },

  /**
   * Like scryRenderedDOMComponentsWithTag but expects there to be one result,
   * and returns that one result, or throws exception if there is any other
   * number of matches besides one.
   * @return {!ReactDOMComponent} The one match.
   */
  findRenderedDOMComponentWithTag: function findRenderedDOMComponentWithTag(root, tagName) {
    var all = ReactTestUtils.scryRenderedDOMComponentsWithTag(root, tagName);
    if (all.length !== 1) {
      throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for tag:' + tagName);
    }
    return all[0];
  },

  /**
   * Finds all instances of components with type equal to `componentType`.
   * @return {array} an array of all the matches.
   */
  scryRenderedComponentsWithType: function scryRenderedComponentsWithType(root, componentType) {
    return ReactTestUtils.findAllInRenderedTree(root, function (inst) {
      return ReactTestUtils.isCompositeComponentWithType(inst, componentType);
    });
  },

  /**
   * Same as `scryRenderedComponentsWithType` but expects there to be one result
   * and returns that one result, or throws exception if there is any other
   * number of matches besides one.
   * @return {!ReactComponent} The one match.
   */
  findRenderedComponentWithType: function findRenderedComponentWithType(root, componentType) {
    var all = ReactTestUtils.scryRenderedComponentsWithType(root, componentType);
    if (all.length !== 1) {
      throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for componentType:' + componentType);
    }
    return all[0];
  },

  /**
   * Pass a mocked component module to this method to augment it with
   * useful methods that allow it to be used as a dummy React component.
   * Instead of rendering as usual, the component will become a simple
   * <div> containing any provided children.
   *
   * @param {object} module the mock function object exported from a
   *                        module that defines the component to be mocked
   * @param {?string} mockTagName optional dummy root tag name to return
   *                              from render method (overrides
   *                              module.mockTagName if provided)
   * @return {object} the ReactTestUtils object (for chaining)
   */
  mockComponent: function mockComponent(module, mockTagName) {
    mockTagName = mockTagName || module.mockTagName || 'div';

    module.prototype.render.mockImplementation(function () {
      return React.createElement(mockTagName, null, this.props.children);
    });

    return this;
  },

  /**
   * Simulates a top level event being dispatched from a raw event that occurred
   * on an `Element` node.
   * @param {Object} topLevelType A type from `EventConstants.topLevelTypes`
   * @param {!Element} node The dom to simulate an event occurring on.
   * @param {?Event} fakeNativeEvent Fake native event to use in SyntheticEvent.
   */
  simulateNativeEventOnNode: function simulateNativeEventOnNode(topLevelType, node, fakeNativeEvent) {
    fakeNativeEvent.target = node;
    ReactBrowserEventEmitter.ReactEventListener.dispatchEvent(topLevelType, fakeNativeEvent);
  },

  /**
   * Simulates a top level event being dispatched from a raw event that occurred
   * on the `ReactDOMComponent` `comp`.
   * @param {Object} topLevelType A type from `EventConstants.topLevelTypes`.
   * @param {!ReactDOMComponent} comp
   * @param {?Event} fakeNativeEvent Fake native event to use in SyntheticEvent.
   */
  simulateNativeEventOnDOMComponent: function simulateNativeEventOnDOMComponent(topLevelType, comp, fakeNativeEvent) {
    ReactTestUtils.simulateNativeEventOnNode(topLevelType, findDOMNode(comp), fakeNativeEvent);
  },

  nativeTouchData: function nativeTouchData(x, y) {
    return {
      touches: [{ pageX: x, pageY: y }]
    };
  },

  createRenderer: function createRenderer() {
    return new ReactShallowRenderer();
  },

  Simulate: null,
  SimulateNative: {}
};

/**
 * Exports:
 *
 * - `ReactTestUtils.Simulate.click(Element/ReactDOMComponent)`
 * - `ReactTestUtils.Simulate.mouseMove(Element/ReactDOMComponent)`
 * - `ReactTestUtils.Simulate.change(Element/ReactDOMComponent)`
 * - ... (All keys from event plugin `eventTypes` objects)
 */
function makeSimulator(eventType) {
  return function (domComponentOrNode, eventData) {
    var node;
    !!React.isValidElement(domComponentOrNode) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'TestUtils.Simulate expects a component instance and not a ReactElement.TestUtils.Simulate will not work if you are using shallow rendering.') : _prodInvariant('14') : void 0;
    if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
      node = findDOMNode(domComponentOrNode);
    } else if (domComponentOrNode.tagName) {
      node = domComponentOrNode;
    }

    var dispatchConfig = EventPluginRegistry.eventNameDispatchConfigs[eventType];

    var fakeNativeEvent = new Event();
    fakeNativeEvent.target = node;
    fakeNativeEvent.type = eventType.toLowerCase();

    // We don't use SyntheticEvent.getPooled in order to not have to worry about
    // properly destroying any properties assigned from `eventData` upon release
    var event = new SyntheticEvent(dispatchConfig, ReactDOMComponentTree.getInstanceFromNode(node), fakeNativeEvent, node);
    // Since we aren't using pooling, always persist the event. This will make
    // sure it's marked and won't warn when setting additional properties.
    event.persist();
    _assign(event, eventData);

    if (dispatchConfig.phasedRegistrationNames) {
      EventPropagators.accumulateTwoPhaseDispatches(event);
    } else {
      EventPropagators.accumulateDirectDispatches(event);
    }

    ReactUpdates.batchedUpdates(function () {
      EventPluginHub.enqueueEvents(event);
      EventPluginHub.processEventQueue(true);
    });
  };
}

function buildSimulators() {
  ReactTestUtils.Simulate = {};

  var eventType;
  for (eventType in EventPluginRegistry.eventNameDispatchConfigs) {
    /**
     * @param {!Element|ReactDOMComponent} domComponentOrNode
     * @param {?object} eventData Fake event data to use in SyntheticEvent.
     */
    ReactTestUtils.Simulate[eventType] = makeSimulator(eventType);
  }
}

// Rebuild ReactTestUtils.Simulate whenever event plugins are injected
var oldInjectEventPluginOrder = EventPluginHub.injection.injectEventPluginOrder;
EventPluginHub.injection.injectEventPluginOrder = function () {
  oldInjectEventPluginOrder.apply(this, arguments);
  buildSimulators();
};
var oldInjectEventPlugins = EventPluginHub.injection.injectEventPluginsByName;
EventPluginHub.injection.injectEventPluginsByName = function () {
  oldInjectEventPlugins.apply(this, arguments);
  buildSimulators();
};

buildSimulators();

/**
 * Exports:
 *
 * - `ReactTestUtils.SimulateNative.click(Element/ReactDOMComponent)`
 * - `ReactTestUtils.SimulateNative.mouseMove(Element/ReactDOMComponent)`
 * - `ReactTestUtils.SimulateNative.mouseIn/ReactDOMComponent)`
 * - `ReactTestUtils.SimulateNative.mouseOut(Element/ReactDOMComponent)`
 * - ... (All keys from `EventConstants.topLevelTypes`)
 *
 * Note: Top level event types are a subset of the entire set of handler types
 * (which include a broader set of "synthetic" events). For example, onDragDone
 * is a synthetic event. Except when testing an event plugin or React's event
 * handling code specifically, you probably want to use ReactTestUtils.Simulate
 * to dispatch synthetic events.
 */

function makeNativeSimulator(eventType) {
  return function (domComponentOrNode, nativeEventData) {
    var fakeNativeEvent = new Event(eventType);
    _assign(fakeNativeEvent, nativeEventData);
    if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
      ReactTestUtils.simulateNativeEventOnDOMComponent(eventType, domComponentOrNode, fakeNativeEvent);
    } else if (domComponentOrNode.tagName) {
      // Will allow on actual dom nodes.
      ReactTestUtils.simulateNativeEventOnNode(eventType, domComponentOrNode, fakeNativeEvent);
    }
  };
}

Object.keys(topLevelTypes).forEach(function (eventType) {
  // Event type is stored as 'topClick' - we transform that to 'click'
  var convenienceName = eventType.indexOf('top') === 0 ? eventType.charAt(3).toLowerCase() + eventType.substr(4) : eventType;
  /**
   * @param {!Element|ReactDOMComponent} domComponentOrNode
   * @param {?Event} nativeEventData Fake native event to use in SyntheticEvent.
   */
  ReactTestUtils.SimulateNative[convenienceName] = makeNativeSimulator(eventType);
});

module.exports = ReactTestUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdFRlc3RVdGlscy5qcyJdLCJuYW1lcyI6WyJfcHJvZEludmFyaWFudCIsInJlcXVpcmUiLCJfYXNzaWduIiwiRXZlbnRDb25zdGFudHMiLCJFdmVudFBsdWdpbkh1YiIsIkV2ZW50UGx1Z2luUmVnaXN0cnkiLCJFdmVudFByb3BhZ2F0b3JzIiwiUmVhY3QiLCJSZWFjdERPTSIsIlJlYWN0RE9NQ29tcG9uZW50VHJlZSIsIlJlYWN0QnJvd3NlckV2ZW50RW1pdHRlciIsIlJlYWN0SW5zdGFuY2VNYXAiLCJSZWFjdFVwZGF0ZXMiLCJTeW50aGV0aWNFdmVudCIsIlJlYWN0U2hhbGxvd1JlbmRlcmVyIiwiZmluZERPTU5vZGUiLCJpbnZhcmlhbnQiLCJ0b3BMZXZlbFR5cGVzIiwiRXZlbnQiLCJzdWZmaXgiLCJmaW5kQWxsSW5SZW5kZXJlZFRyZWVJbnRlcm5hbCIsImluc3QiLCJ0ZXN0IiwiZ2V0UHVibGljSW5zdGFuY2UiLCJwdWJsaWNJbnN0IiwicmV0IiwiY3VycmVudEVsZW1lbnQiLCJfY3VycmVudEVsZW1lbnQiLCJSZWFjdFRlc3RVdGlscyIsImlzRE9NQ29tcG9uZW50IiwicmVuZGVyZWRDaGlsZHJlbiIsIl9yZW5kZXJlZENoaWxkcmVuIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJjb25jYXQiLCJpc1ZhbGlkRWxlbWVudCIsInR5cGUiLCJfcmVuZGVyZWRDb21wb25lbnQiLCJyZW5kZXJJbnRvRG9jdW1lbnQiLCJlbGVtZW50IiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicmVuZGVyIiwiaXNFbGVtZW50IiwiaXNFbGVtZW50T2ZUeXBlIiwiY29udmVuaWVuY2VDb25zdHJ1Y3RvciIsIm5vZGVUeXBlIiwidGFnTmFtZSIsImlzRE9NQ29tcG9uZW50RWxlbWVudCIsImlzQ29tcG9zaXRlQ29tcG9uZW50Iiwic2V0U3RhdGUiLCJpc0NvbXBvc2l0ZUNvbXBvbmVudFdpdGhUeXBlIiwiaW50ZXJuYWxJbnN0YW5jZSIsImdldCIsImNvbnN0cnVjdG9yIiwiaXNDb21wb3NpdGVDb21wb25lbnRFbGVtZW50IiwicHJvdG90eXBlIiwiaXNDb21wb3NpdGVDb21wb25lbnRFbGVtZW50V2l0aFR5cGUiLCJnZXRSZW5kZXJlZENoaWxkT2ZDb21wb3NpdGVDb21wb25lbnQiLCJmaW5kQWxsSW5SZW5kZXJlZFRyZWUiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJzY3J5UmVuZGVyZWRET01Db21wb25lbnRzV2l0aENsYXNzIiwicm9vdCIsImNsYXNzTmFtZXMiLCJjbGFzc05hbWUiLCJnZXRBdHRyaWJ1dGUiLCJjbGFzc0xpc3QiLCJzcGxpdCIsIkFycmF5IiwiaXNBcnJheSIsInVuZGVmaW5lZCIsImV2ZXJ5IiwibmFtZSIsImluZGV4T2YiLCJmaW5kUmVuZGVyZWRET01Db21wb25lbnRXaXRoQ2xhc3MiLCJhbGwiLCJsZW5ndGgiLCJFcnJvciIsInNjcnlSZW5kZXJlZERPTUNvbXBvbmVudHNXaXRoVGFnIiwidG9VcHBlckNhc2UiLCJmaW5kUmVuZGVyZWRET01Db21wb25lbnRXaXRoVGFnIiwic2NyeVJlbmRlcmVkQ29tcG9uZW50c1dpdGhUeXBlIiwiY29tcG9uZW50VHlwZSIsImZpbmRSZW5kZXJlZENvbXBvbmVudFdpdGhUeXBlIiwibW9ja0NvbXBvbmVudCIsIm1vZHVsZSIsIm1vY2tUYWdOYW1lIiwibW9ja0ltcGxlbWVudGF0aW9uIiwicHJvcHMiLCJjaGlsZHJlbiIsInNpbXVsYXRlTmF0aXZlRXZlbnRPbk5vZGUiLCJ0b3BMZXZlbFR5cGUiLCJub2RlIiwiZmFrZU5hdGl2ZUV2ZW50IiwidGFyZ2V0IiwiUmVhY3RFdmVudExpc3RlbmVyIiwiZGlzcGF0Y2hFdmVudCIsInNpbXVsYXRlTmF0aXZlRXZlbnRPbkRPTUNvbXBvbmVudCIsImNvbXAiLCJuYXRpdmVUb3VjaERhdGEiLCJ4IiwieSIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiY3JlYXRlUmVuZGVyZXIiLCJTaW11bGF0ZSIsIlNpbXVsYXRlTmF0aXZlIiwibWFrZVNpbXVsYXRvciIsImV2ZW50VHlwZSIsImRvbUNvbXBvbmVudE9yTm9kZSIsImV2ZW50RGF0YSIsImRpc3BhdGNoQ29uZmlnIiwiZXZlbnROYW1lRGlzcGF0Y2hDb25maWdzIiwidG9Mb3dlckNhc2UiLCJldmVudCIsImdldEluc3RhbmNlRnJvbU5vZGUiLCJwZXJzaXN0IiwicGhhc2VkUmVnaXN0cmF0aW9uTmFtZXMiLCJhY2N1bXVsYXRlVHdvUGhhc2VEaXNwYXRjaGVzIiwiYWNjdW11bGF0ZURpcmVjdERpc3BhdGNoZXMiLCJiYXRjaGVkVXBkYXRlcyIsImVucXVldWVFdmVudHMiLCJwcm9jZXNzRXZlbnRRdWV1ZSIsImJ1aWxkU2ltdWxhdG9ycyIsIm9sZEluamVjdEV2ZW50UGx1Z2luT3JkZXIiLCJpbmplY3Rpb24iLCJpbmplY3RFdmVudFBsdWdpbk9yZGVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJvbGRJbmplY3RFdmVudFBsdWdpbnMiLCJpbmplY3RFdmVudFBsdWdpbnNCeU5hbWUiLCJtYWtlTmF0aXZlU2ltdWxhdG9yIiwibmF0aXZlRXZlbnREYXRhIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJjb252ZW5pZW5jZU5hbWUiLCJjaGFyQXQiLCJzdWJzdHIiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBLElBQUlBLGlCQUFpQkMsUUFBUSxzQkFBUixDQUFyQjtBQUFBLElBQ0lDLFVBQVVELFFBQVEsZUFBUixDQURkOztBQUdBLElBQUlFLGlCQUFpQkYsUUFBUSxrQkFBUixDQUFyQjtBQUNBLElBQUlHLGlCQUFpQkgsUUFBUSxrQkFBUixDQUFyQjtBQUNBLElBQUlJLHNCQUFzQkosUUFBUSx1QkFBUixDQUExQjtBQUNBLElBQUlLLG1CQUFtQkwsUUFBUSxvQkFBUixDQUF2QjtBQUNBLElBQUlNLFFBQVFOLFFBQVEsaUJBQVIsQ0FBWjtBQUNBLElBQUlPLFdBQVdQ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QTREQyxrQkFBNUQsRUFBZ0ZqQixlQUFoRjtBQUNELEtBRkQsTUFFTyxJQUFJaUIsbUJBQW1CakUsT0FBdkIsRUFBZ0M7QUFDckM7QUFDQXBCLHFCQUFlaUUseUJBQWYsQ0FBeUNtQixTQUF6QyxFQUFvREMsa0JBQXBELEVBQXdFakIsZUFBeEU7QUFDRDtBQUNGLEdBVEQ7QUFVRDs7QUFFRHlDLE9BQU9DLElBQVAsQ0FBWXpILGFBQVosRUFBMkIwSCxPQUEzQixDQUFtQyxVQUFVM0IsU0FBVixFQUFxQjtBQUN0RDtBQUNBLE1BQUk0QixrQkFBa0I1QixVQUFVcEMsT0FBVixDQUFrQixLQUFsQixNQUE2QixDQUE3QixHQUFpQ29DLFVBQVU2QixNQUFWLENBQWlCLENBQWpCLEVBQW9CeEIsV0FBcEIsS0FBb0NMLFVBQVU4QixNQUFWLENBQWlCLENBQWpCLENBQXJFLEdBQTJGOUIsU0FBakg7QUFDQTs7OztBQUlBcEYsaUJBQWVrRixjQUFmLENBQThCOEIsZUFBOUIsSUFBaURMLG9CQUFvQnZCLFNBQXBCLENBQWpEO0FBQ0QsQ0FSRDs7QUFVQXhCLE9BQU91RCxPQUFQLEdBQWlCbkgsY0FBakIiLCJmaWxlIjoiUmVhY3RUZXN0VXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpLFxuICAgIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBFdmVudENvbnN0YW50cyA9IHJlcXVpcmUoJy4vRXZlbnRDb25zdGFudHMnKTtcbnZhciBFdmVudFBsdWdpbkh1YiA9IHJlcXVpcmUoJy4vRXZlbnRQbHVnaW5IdWInKTtcbnZhciBFdmVudFBsdWdpblJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi9FdmVudFBsdWdpblJlZ2lzdHJ5Jyk7XG52YXIgRXZlbnRQcm9wYWdhdG9ycyA9IHJlcXVpcmUoJy4vRXZlbnRQcm9wYWdhdG9ycycpO1xudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0Jyk7XG52YXIgUmVhY3RET00gPSByZXF1aXJlKCcuL1JlYWN0RE9NJyk7XG52YXIgUmVhY3RET01Db21wb25lbnRUcmVlID0gcmVxdWlyZSgnLi9SZWFjdERPTUNvbXBvbmVudFRyZWUnKTtcbnZhciBSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuL1JlYWN0QnJvd3NlckV2ZW50RW1pdHRlcicpO1xudmFyIFJlYWN0SW5zdGFuY2VNYXAgPSByZXF1aXJlKCcuL1JlYWN0SW5zdGFuY2VNYXAnKTtcbnZhciBSZWFjdFVwZGF0ZXMgPSByZXF1aXJlKCcuL1JlYWN0VXBkYXRlcycpO1xudmFyIFN5bnRoZXRpY0V2ZW50ID0gcmVxdWlyZSgnLi9TeW50aGV0aWNFdmVudCcpO1xudmFyIFJlYWN0U2hhbGxvd1JlbmRlcmVyID0gcmVxdWlyZSgnLi9SZWFjdFNoYWxsb3dSZW5kZXJlcicpO1xuXG52YXIgZmluZERPTU5vZGUgPSByZXF1aXJlKCcuL2ZpbmRET01Ob2RlJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciB0b3BMZXZlbFR5cGVzID0gRXZlbnRDb25zdGFudHMudG9wTGV2ZWxUeXBlcztcblxuZnVuY3Rpb24gRXZlbnQoc3VmZml4KSB7fVxuXG4vKipcbiAqIEBjbGFzcyBSZWFjdFRlc3RVdGlsc1xuICovXG5cbmZ1bmN0aW9uIGZpbmRBbGxJblJlbmRlcmVkVHJlZUludGVybmFsKGluc3QsIHRlc3QpIHtcbiAgaWYgKCFpbnN0IHx8ICFpbnN0LmdldFB1YmxpY0luc3RhbmNlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHZhciBwdWJsaWNJbnN0ID0gaW5zdC5nZXRQdWJsaWNJbnN0YW5jZSgpO1xuICB2YXIgcmV0ID0gdGVzdChwdWJsaWNJbnN0KSA/IFtwdWJsaWNJbnN0XSA6IFtdO1xuICB2YXIgY3VycmVudEVsZW1lbnQgPSBpbnN0Ll9jdXJyZW50RWxlbWVudDtcbiAgaWYgKFJlYWN0VGVzdFV0aWxzLmlzRE9NQ29tcG9uZW50KHB1YmxpY0luc3QpKSB7XG4gICAgdmFyIHJlbmRlcmVkQ2hpbGRyZW4gPSBpbnN0Ll9yZW5kZXJlZENoaWxkcmVuO1xuICAgIHZhciBrZXk7XG4gICAgZm9yIChrZXkgaW4gcmVuZGVyZWRDaGlsZHJlbikge1xuICAgICAgaWYgKCFyZW5kZXJlZENoaWxkcmVuLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXQgPSByZXQuY29uY2F0KGZpbmRBbGxJblJlbmRlcmVkVHJlZUludGVybmFsKHJlbmRlcmVkQ2hpbGRyZW5ba2V5XSwgdGVzdCkpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudChjdXJyZW50RWxlbWVudCkgJiYgdHlwZW9mIGN1cnJlbnRFbGVtZW50LnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXQgPSByZXQuY29uY2F0KGZpbmRBbGxJblJlbmRlcmVkVHJlZUludGVybmFsKGluc3QuX3JlbmRlcmVkQ29tcG9uZW50LCB0ZXN0KSk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuLyoqXG4gKiBVdGlsaXRpZXMgZm9yIG1ha2luZyBpdCBlYXN5IHRvIHRlc3QgUmVhY3QgY29tcG9uZW50cy5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90ZXN0LXV0aWxzLmh0bWxcbiAqXG4gKiBUb2RvOiBTdXBwb3J0IHRoZSBlbnRpcmUgRE9NLnNjcnkgcXVlcnkgc3ludGF4LiBGb3Igbm93LCB0aGVzZSBzaW1wbGVcbiAqIHV0aWxpdGllcyB3aWxsIHN1ZmZpY2UgZm9yIHRlc3RpbmcgcHVycG9zZXMuXG4gKiBAbGVuZHMgUmVhY3RUZXN0VXRpbHNcbiAqL1xudmFyIFJlYWN0VGVzdFV0aWxzID0ge1xuICByZW5kZXJJbnRvRG9jdW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIC8vIE5vbmUgb2Ygb3VyIHRlc3RzIGFjdHVhbGx5IHJlcXVpcmUgYXR0YWNoaW5nIHRoZSBjb250YWluZXIgdG8gdGhlXG4gICAgLy8gRE9NLCBhbmQgZG9pbmcgc28gY3JlYXRlcyBhIG1lc3MgdGhhdCB3ZSByZWx5IG9uIHRlc3QgaXNvbGF0aW9uIHRvXG4gICAgLy8gY2xlYW4gdXAsIHNvIHdlJ3JlIGdvaW5nIHRvIHN0b3AgaG9ub3JpbmcgdGhlIG5hbWUgb2YgdGhpcyBtZXRob2RcbiAgICAvLyAoYW5kIHByb2JhYmx5IHJlbmFtZSBpdCBldmVudHVhbGx5KSBpZiBubyBwcm9ibGVtcyBhcmlzZS5cbiAgICAvLyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKGVsZW1lbnQsIGRpdik7XG4gIH0sXG5cbiAgaXNFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHJldHVybiBSZWFjdC5pc1ZhbGlkRWxlbWVudChlbGVtZW50KTtcbiAgfSxcblxuICBpc0VsZW1lbnRPZlR5cGU6IGZ1bmN0aW9uIChpbnN0LCBjb252ZW5pZW5jZUNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIFJlYWN0LmlzVmFsaWRFbGVtZW50KGluc3QpICYmIGluc3QudHlwZSA9PT0gY29udmVuaWVuY2VDb25zdHJ1Y3RvcjtcbiAgfSxcblxuICBpc0RPTUNvbXBvbmVudDogZnVuY3Rpb24gKGluc3QpIHtcbiAgICByZXR1cm4gISEoaW5zdCAmJiBpbnN0Lm5vZGVUeXBlID09PSAxICYmIGluc3QudGFnTmFtZSk7XG4gIH0sXG5cbiAgaXNET01Db21wb25lbnRFbGVtZW50OiBmdW5jdGlvbiAoaW5zdCkge1xuICAgIHJldHVybiAhIShpbnN0ICYmIFJlYWN0LmlzVmFsaWRFbGVtZW50KGluc3QpICYmICEhaW5zdC50YWdOYW1lKTtcbiAgfSxcblxuICBpc0NvbXBvc2l0ZUNvbXBvbmVudDogZnVuY3Rpb24gKGluc3QpIHtcbiAgICBpZiAoUmVhY3RUZXN0VXRpbHMuaXNET01Db21wb25lbnQoaW5zdCkpIHtcbiAgICAgIC8vIEFjY2Vzc2luZyBpbnN0LnNldFN0YXRlIHdhcm5zOyBqdXN0IHJldHVybiBmYWxzZSBhcyB0aGF0J2xsIGJlIHdoYXRcbiAgICAgIC8vIHRoaXMgcmV0dXJucyB3aGVuIHdlIGhhdmUgRE9NIG5vZGVzIGFzIHJlZnMgZGlyZWN0bHlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGluc3QgIT0gbnVsbCAmJiB0eXBlb2YgaW5zdC5yZW5kZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGluc3Quc2V0U3RhdGUgPT09ICdmdW5jdGlvbic7XG4gIH0sXG5cbiAgaXNDb21wb3NpdGVDb21wb25lbnRXaXRoVHlwZTogZnVuY3Rpb24gKGluc3QsIHR5cGUpIHtcbiAgICBpZiAoIVJlYWN0VGVzdFV0aWxzLmlzQ29tcG9zaXRlQ29tcG9uZW50KGluc3QpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBpbnRlcm5hbEluc3RhbmNlID0gUmVhY3RJbnN0YW5jZU1hcC5nZXQoaW5zdCk7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gaW50ZXJuYWxJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQudHlwZTtcblxuICAgIHJldHVybiBjb25zdHJ1Y3RvciA9PT0gdHlwZTtcbiAgfSxcblxuICBpc0NvbXBvc2l0ZUNvbXBvbmVudEVsZW1lbnQ6IGZ1bmN0aW9uIChpbnN0KSB7XG4gICAgaWYgKCFSZWFjdC5pc1ZhbGlkRWxlbWVudChpbnN0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBXZSBjaGVjayB0aGUgcHJvdG90eXBlIG9mIHRoZSB0eXBlIHRoYXQgd2lsbCBnZXQgbW91bnRlZCwgbm90IHRoZVxuICAgIC8vIGluc3RhbmNlIGl0c2VsZi4gVGhpcyBpcyBhIGZ1dHVyZSBwcm9vZiB3YXkgb2YgZHVjayB0eXBpbmcuXG4gICAgdmFyIHByb3RvdHlwZSA9IGluc3QudHlwZS5wcm90b3R5cGU7XG4gICAgcmV0dXJuIHR5cGVvZiBwcm90b3R5cGUucmVuZGVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBwcm90b3R5cGUuc2V0U3RhdGUgPT09ICdmdW5jdGlvbic7XG4gIH0sXG5cbiAgaXNDb21wb3NpdGVDb21wb25lbnRFbGVtZW50V2l0aFR5cGU6IGZ1bmN0aW9uIChpbnN0LCB0eXBlKSB7XG4gICAgdmFyIGludGVybmFsSW5zdGFuY2UgPSBSZWFjdEluc3RhbmNlTWFwLmdldChpbnN0KTtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudC50eXBlO1xuXG4gICAgcmV0dXJuICEhKFJlYWN0VGVzdFV0aWxzLmlzQ29tcG9zaXRlQ29tcG9uZW50RWxlbWVudChpbnN0KSAmJiBjb25zdHJ1Y3RvciA9PT0gdHlwZSk7XG4gIH0sXG5cbiAgZ2V0UmVuZGVyZWRDaGlsZE9mQ29tcG9zaXRlQ29tcG9uZW50OiBmdW5jdGlvbiAoaW5zdCkge1xuICAgIGlmICghUmVhY3RUZXN0VXRpbHMuaXNDb21wb3NpdGVDb21wb25lbnQoaW5zdCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgaW50ZXJuYWxJbnN0YW5jZSA9IFJlYWN0SW5zdGFuY2VNYXAuZ2V0KGluc3QpO1xuICAgIHJldHVybiBpbnRlcm5hbEluc3RhbmNlLl9yZW5kZXJlZENvbXBvbmVudC5nZXRQdWJsaWNJbnN0YW5jZSgpO1xuICB9LFxuXG4gIGZpbmRBbGxJblJlbmRlcmVkVHJlZTogZnVuY3Rpb24gKGluc3QsIHRlc3QpIHtcbiAgICBpZiAoIWluc3QpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgIVJlYWN0VGVzdFV0aWxzLmlzQ29tcG9zaXRlQ29tcG9uZW50KGluc3QpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ2ZpbmRBbGxJblJlbmRlcmVkVHJlZSguLi4pOiBpbnN0YW5jZSBtdXN0IGJlIGEgY29tcG9zaXRlIGNvbXBvbmVudCcpIDogX3Byb2RJbnZhcmlhbnQoJzEwJykgOiB2b2lkIDA7XG4gICAgcmV0dXJuIGZpbmRBbGxJblJlbmRlcmVkVHJlZUludGVybmFsKFJlYWN0SW5zdGFuY2VNYXAuZ2V0KGluc3QpLCB0ZXN0KTtcbiAgfSxcblxuICAvKipcbiAgICogRmluZHMgYWxsIGluc3RhbmNlIG9mIGNvbXBvbmVudHMgaW4gdGhlIHJlbmRlcmVkIHRyZWUgdGhhdCBhcmUgRE9NXG4gICAqIGNvbXBvbmVudHMgd2l0aCB0aGUgY2xhc3MgbmFtZSBtYXRjaGluZyBgY2xhc3NOYW1lYC5cbiAgICogQHJldHVybiB7YXJyYXl9IGFuIGFycmF5IG9mIGFsbCB0aGUgbWF0Y2hlcy5cbiAgICovXG4gIHNjcnlSZW5kZXJlZERPTUNvbXBvbmVudHNXaXRoQ2xhc3M6IGZ1bmN0aW9uIChyb290LCBjbGFzc05hbWVzKSB7XG4gICAgcmV0dXJuIFJlYWN0VGVzdFV0aWxzLmZpbmRBbGxJblJlbmRlcmVkVHJlZShyb290LCBmdW5jdGlvbiAoaW5zdCkge1xuICAgICAgaWYgKFJlYWN0VGVzdFV0aWxzLmlzRE9NQ29tcG9uZW50KGluc3QpKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSBpbnN0LmNsYXNzTmFtZTtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgLy8gU1ZHLCBwcm9iYWJseS5cbiAgICAgICAgICBjbGFzc05hbWUgPSBpbnN0LmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xhc3NMaXN0ID0gY2xhc3NOYW1lLnNwbGl0KC9cXHMrLyk7XG5cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNsYXNzTmFtZXMpKSB7XG4gICAgICAgICAgIShjbGFzc05hbWVzICE9PSB1bmRlZmluZWQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1Rlc3RVdGlscy5zY3J5UmVuZGVyZWRET01Db21wb25lbnRzV2l0aENsYXNzIGV4cGVjdHMgYSBjbGFzc05hbWUgYXMgYSBzZWNvbmQgYXJndW1lbnQuJykgOiBfcHJvZEludmFyaWFudCgnMTEnKSA6IHZvaWQgMDtcbiAgICAgICAgICBjbGFzc05hbWVzID0gY2xhc3NOYW1lcy5zcGxpdCgvXFxzKy8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbGFzc05hbWVzLmV2ZXJ5KGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGNsYXNzTGlzdC5pbmRleE9mKG5hbWUpICE9PSAtMTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIExpa2Ugc2NyeVJlbmRlcmVkRE9NQ29tcG9uZW50c1dpdGhDbGFzcyBidXQgZXhwZWN0cyB0aGVyZSB0byBiZSBvbmUgcmVzdWx0LFxuICAgKiBhbmQgcmV0dXJucyB0aGF0IG9uZSByZXN1bHQsIG9yIHRocm93cyBleGNlcHRpb24gaWYgdGhlcmUgaXMgYW55IG90aGVyXG4gICAqIG51bWJlciBvZiBtYXRjaGVzIGJlc2lkZXMgb25lLlxuICAgKiBAcmV0dXJuIHshUmVhY3RET01Db21wb25lbnR9IFRoZSBvbmUgbWF0Y2guXG4gICAqL1xuICBmaW5kUmVuZGVyZWRET01Db21wb25lbnRXaXRoQ2xhc3M6IGZ1bmN0aW9uIChyb290LCBjbGFzc05hbWUpIHtcbiAgICB2YXIgYWxsID0gUmVhY3RUZXN0VXRpbHMuc2NyeVJlbmRlcmVkRE9NQ29tcG9uZW50c1dpdGhDbGFzcyhyb290LCBjbGFzc05hbWUpO1xuICAgIGlmIChhbGwubGVuZ3RoICE9PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RpZCBub3QgZmluZCBleGFjdGx5IG9uZSBtYXRjaCAoZm91bmQ6ICcgKyBhbGwubGVuZ3RoICsgJykgJyArICdmb3IgY2xhc3M6JyArIGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBhbGxbMF07XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpbmRzIGFsbCBpbnN0YW5jZSBvZiBjb21wb25lbnRzIGluIHRoZSByZW5kZXJlZCB0cmVlIHRoYXQgYXJlIERPTVxuICAgKiBjb21wb25lbnRzIHdpdGggdGhlIHRhZyBuYW1lIG1hdGNoaW5nIGB0YWdOYW1lYC5cbiAgICogQHJldHVybiB7YXJyYXl9IGFuIGFycmF5IG9mIGFsbCB0aGUgbWF0Y2hlcy5cbiAgICovXG4gIHNjcnlSZW5kZXJlZERPTUNvbXBvbmVudHNXaXRoVGFnOiBmdW5jdGlvbiAocm9vdCwgdGFnTmFtZSkge1xuICAgIHJldHVybiBSZWFjdFRlc3RVdGlscy5maW5kQWxsSW5SZW5kZXJlZFRyZWUocm9vdCwgZnVuY3Rpb24gKGluc3QpIHtcbiAgICAgIHJldHVybiBSZWFjdFRlc3RVdGlscy5pc0RPTUNvbXBvbmVudChpbnN0KSAmJiBpbnN0LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gdGFnTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBMaWtlIHNjcnlSZW5kZXJlZERPTUNvbXBvbmVudHNXaXRoVGFnIGJ1dCBleHBlY3RzIHRoZXJlIHRvIGJlIG9uZSByZXN1bHQsXG4gICAqIGFuZCByZXR1cm5zIHRoYXQgb25lIHJlc3VsdCwgb3IgdGhyb3dzIGV4Y2VwdGlvbiBpZiB0aGVyZSBpcyBhbnkgb3RoZXJcbiAgICogbnVtYmVyIG9mIG1hdGNoZXMgYmVzaWRlcyBvbmUuXG4gICAqIEByZXR1cm4geyFSZWFjdERPTUNvbXBvbmVudH0gVGhlIG9uZSBtYXRjaC5cbiAgICovXG4gIGZpbmRSZW5kZXJlZERPTUNvbXBvbmVudFdpdGhUYWc6IGZ1bmN0aW9uIChyb290LCB0YWdOYW1lKSB7XG4gICAgdmFyIGFsbCA9IFJlYWN0VGVzdFV0aWxzLnNjcnlSZW5kZXJlZERPTUNvbXBvbmVudHNXaXRoVGFnKHJvb3QsIHRhZ05hbWUpO1xuICAgIGlmIChhbGwubGVuZ3RoICE9PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RpZCBub3QgZmluZCBleGFjdGx5IG9uZSBtYXRjaCAoZm91bmQ6ICcgKyBhbGwubGVuZ3RoICsgJykgJyArICdmb3IgdGFnOicgKyB0YWdOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGFsbFswXTtcbiAgfSxcblxuICAvKipcbiAgICogRmluZHMgYWxsIGluc3RhbmNlcyBvZiBjb21wb25lbnRzIHdpdGggdHlwZSBlcXVhbCB0byBgY29tcG9uZW50VHlwZWAuXG4gICAqIEByZXR1cm4ge2FycmF5fSBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXMuXG4gICAqL1xuICBzY3J5UmVuZGVyZWRDb21wb25lbnRzV2l0aFR5cGU6IGZ1bmN0aW9uIChyb290LCBjb21wb25lbnRUeXBlKSB7XG4gICAgcmV0dXJuIFJlYWN0VGVzdFV0aWxzLmZpbmRBbGxJblJlbmRlcmVkVHJlZShyb290LCBmdW5jdGlvbiAoaW5zdCkge1xuICAgICAgcmV0dXJuIFJlYWN0VGVzdFV0aWxzLmlzQ29tcG9zaXRlQ29tcG9uZW50V2l0aFR5cGUoaW5zdCwgY29tcG9uZW50VHlwZSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNhbWUgYXMgYHNjcnlSZW5kZXJlZENvbXBvbmVudHNXaXRoVHlwZWAgYnV0IGV4cGVjdHMgdGhlcmUgdG8gYmUgb25lIHJlc3VsdFxuICAgKiBhbmQgcmV0dXJucyB0aGF0IG9uZSByZXN1bHQsIG9yIHRocm93cyBleGNlcHRpb24gaWYgdGhlcmUgaXMgYW55IG90aGVyXG4gICAqIG51bWJlciBvZiBtYXRjaGVzIGJlc2lkZXMgb25lLlxuICAgKiBAcmV0dXJuIHshUmVhY3RDb21wb25lbnR9IFRoZSBvbmUgbWF0Y2guXG4gICAqL1xuICBmaW5kUmVuZGVyZWRDb21wb25lbnRXaXRoVHlwZTogZnVuY3Rpb24gKHJvb3QsIGNvbXBvbmVudFR5cGUpIHtcbiAgICB2YXIgYWxsID0gUmVhY3RUZXN0VXRpbHMuc2NyeVJlbmRlcmVkQ29tcG9uZW50c1dpdGhUeXBlKHJvb3QsIGNvbXBvbmVudFR5cGUpO1xuICAgIGlmIChhbGwubGVuZ3RoICE9PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RpZCBub3QgZmluZCBleGFjdGx5IG9uZSBtYXRjaCAoZm91bmQ6ICcgKyBhbGwubGVuZ3RoICsgJykgJyArICdmb3IgY29tcG9uZW50VHlwZTonICsgY29tcG9uZW50VHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBhbGxbMF07XG4gIH0sXG5cbiAgLyoqXG4gICAqIFBhc3MgYSBtb2NrZWQgY29tcG9uZW50IG1vZHVsZSB0byB0aGlzIG1ldGhvZCB0byBhdWdtZW50IGl0IHdpdGhcbiAgICogdXNlZnVsIG1ldGhvZHMgdGhhdCBhbGxvdyBpdCB0byBiZSB1c2VkIGFzIGEgZHVtbXkgUmVhY3QgY29tcG9uZW50LlxuICAgKiBJbnN0ZWFkIG9mIHJlbmRlcmluZyBhcyB1c3VhbCwgdGhlIGNvbXBvbmVudCB3aWxsIGJlY29tZSBhIHNpbXBsZVxuICAgKiA8ZGl2PiBjb250YWluaW5nIGFueSBwcm92aWRlZCBjaGlsZHJlbi5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG1vZHVsZSB0aGUgbW9jayBmdW5jdGlvbiBvYmplY3QgZXhwb3J0ZWQgZnJvbSBhXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlIHRoYXQgZGVmaW5lcyB0aGUgY29tcG9uZW50IHRvIGJlIG1vY2tlZFxuICAgKiBAcGFyYW0gez9zdHJpbmd9IG1vY2tUYWdOYW1lIG9wdGlvbmFsIGR1bW15IHJvb3QgdGFnIG5hbWUgdG8gcmV0dXJuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSByZW5kZXIgbWV0aG9kIChvdmVycmlkZXNcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUubW9ja1RhZ05hbWUgaWYgcHJvdmlkZWQpXG4gICAqIEByZXR1cm4ge29iamVjdH0gdGhlIFJlYWN0VGVzdFV0aWxzIG9iamVjdCAoZm9yIGNoYWluaW5nKVxuICAgKi9cbiAgbW9ja0NvbXBvbmVudDogZnVuY3Rpb24gKG1vZHVsZSwgbW9ja1RhZ05hbWUpIHtcbiAgICBtb2NrVGFnTmFtZSA9IG1vY2tUYWdOYW1lIHx8IG1vZHVsZS5tb2NrVGFnTmFtZSB8fCAnZGl2JztcblxuICAgIG1vZHVsZS5wcm90b3R5cGUucmVuZGVyLm1vY2tJbXBsZW1lbnRhdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChtb2NrVGFnTmFtZSwgbnVsbCwgdGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvKipcbiAgICogU2ltdWxhdGVzIGEgdG9wIGxldmVsIGV2ZW50IGJlaW5nIGRpc3BhdGNoZWQgZnJvbSBhIHJhdyBldmVudCB0aGF0IG9jY3VycmVkXG4gICAqIG9uIGFuIGBFbGVtZW50YCBub2RlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9wTGV2ZWxUeXBlIEEgdHlwZSBmcm9tIGBFdmVudENvbnN0YW50cy50b3BMZXZlbFR5cGVzYFxuICAgKiBAcGFyYW0geyFFbGVtZW50fSBub2RlIFRoZSBkb20gdG8gc2ltdWxhdGUgYW4gZXZlbnQgb2NjdXJyaW5nIG9uLlxuICAgKiBAcGFyYW0gez9FdmVudH0gZmFrZU5hdGl2ZUV2ZW50IEZha2UgbmF0aXZlIGV2ZW50IHRvIHVzZSBpbiBTeW50aGV0aWNFdmVudC5cbiAgICovXG4gIHNpbXVsYXRlTmF0aXZlRXZlbnRPbk5vZGU6IGZ1bmN0aW9uICh0b3BMZXZlbFR5cGUsIG5vZGUsIGZha2VOYXRpdmVFdmVudCkge1xuICAgIGZha2VOYXRpdmVFdmVudC50YXJnZXQgPSBub2RlO1xuICAgIFJlYWN0QnJvd3NlckV2ZW50RW1pdHRlci5SZWFjdEV2ZW50TGlzdGVuZXIuZGlzcGF0Y2hFdmVudCh0b3BMZXZlbFR5cGUsIGZha2VOYXRpdmVFdmVudCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNpbXVsYXRlcyBhIHRvcCBsZXZlbCBldmVudCBiZWluZyBkaXNwYXRjaGVkIGZyb20gYSByYXcgZXZlbnQgdGhhdCBvY2N1cnJlZFxuICAgKiBvbiB0aGUgYFJlYWN0RE9NQ29tcG9uZW50YCBgY29tcGAuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b3BMZXZlbFR5cGUgQSB0eXBlIGZyb20gYEV2ZW50Q29uc3RhbnRzLnRvcExldmVsVHlwZXNgLlxuICAgKiBAcGFyYW0geyFSZWFjdERPTUNvbXBvbmVudH0gY29tcFxuICAgKiBAcGFyYW0gez9FdmVudH0gZmFrZU5hdGl2ZUV2ZW50IEZha2UgbmF0aXZlIGV2ZW50IHRvIHVzZSBpbiBTeW50aGV0aWNFdmVudC5cbiAgICovXG4gIHNpbXVsYXRlTmF0aXZlRXZlbnRPbkRPTUNvbXBvbmVudDogZnVuY3Rpb24gKHRvcExldmVsVHlwZSwgY29tcCwgZmFrZU5hdGl2ZUV2ZW50KSB7XG4gICAgUmVhY3RUZXN0VXRpbHMuc2ltdWxhdGVOYXRpdmVFdmVudE9uTm9kZSh0b3BMZXZlbFR5cGUsIGZpbmRET01Ob2RlKGNvbXApLCBmYWtlTmF0aXZlRXZlbnQpO1xuICB9LFxuXG4gIG5hdGl2ZVRvdWNoRGF0YTogZnVuY3Rpb24gKHgsIHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdG91Y2hlczogW3sgcGFnZVg6IHgsIHBhZ2VZOiB5IH1dXG4gICAgfTtcbiAgfSxcblxuICBjcmVhdGVSZW5kZXJlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBuZXcgUmVhY3RTaGFsbG93UmVuZGVyZXIoKTtcbiAgfSxcblxuICBTaW11bGF0ZTogbnVsbCxcbiAgU2ltdWxhdGVOYXRpdmU6IHt9XG59O1xuXG4vKipcbiAqIEV4cG9ydHM6XG4gKlxuICogLSBgUmVhY3RUZXN0VXRpbHMuU2ltdWxhdGUuY2xpY2soRWxlbWVudC9SZWFjdERPTUNvbXBvbmVudClgXG4gKiAtIGBSZWFjdFRlc3RVdGlscy5TaW11bGF0ZS5tb3VzZU1vdmUoRWxlbWVudC9SZWFjdERPTUNvbXBvbmVudClgXG4gKiAtIGBSZWFjdFRlc3RVdGlscy5TaW11bGF0ZS5jaGFuZ2UoRWxlbWVudC9SZWFjdERPTUNvbXBvbmVudClgXG4gKiAtIC4uLiAoQWxsIGtleXMgZnJvbSBldmVudCBwbHVnaW4gYGV2ZW50VHlwZXNgIG9iamVjdHMpXG4gKi9cbmZ1bmN0aW9uIG1ha2VTaW11bGF0b3IoZXZlbnRUeXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZG9tQ29tcG9uZW50T3JOb2RlLCBldmVudERhdGEpIHtcbiAgICB2YXIgbm9kZTtcbiAgICAhIVJlYWN0LmlzVmFsaWRFbGVtZW50KGRvbUNvbXBvbmVudE9yTm9kZSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnVGVzdFV0aWxzLlNpbXVsYXRlIGV4cGVjdHMgYSBjb21wb25lbnQgaW5zdGFuY2UgYW5kIG5vdCBhIFJlYWN0RWxlbWVudC5UZXN0VXRpbHMuU2ltdWxhdGUgd2lsbCBub3Qgd29yayBpZiB5b3UgYXJlIHVzaW5nIHNoYWxsb3cgcmVuZGVyaW5nLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0JykgOiB2b2lkIDA7XG4gICAgaWYgKFJlYWN0VGVzdFV0aWxzLmlzRE9NQ29tcG9uZW50KGRvbUNvbXBvbmVudE9yTm9kZSkpIHtcbiAgICAgIG5vZGUgPSBmaW5kRE9NTm9kZShkb21Db21wb25lbnRPck5vZGUpO1xuICAgIH0gZWxzZSBpZiAoZG9tQ29tcG9uZW50T3JOb2RlLnRhZ05hbWUpIHtcbiAgICAgIG5vZGUgPSBkb21Db21wb25lbnRPck5vZGU7XG4gICAgfVxuXG4gICAgdmFyIGRpc3BhdGNoQ29uZmlnID0gRXZlbnRQbHVnaW5SZWdpc3RyeS5ldmVudE5hbWVEaXNwYXRjaENvbmZpZ3NbZXZlbnRUeXBlXTtcblxuICAgIHZhciBmYWtlTmF0aXZlRXZlbnQgPSBuZXcgRXZlbnQoKTtcbiAgICBmYWtlTmF0aXZlRXZlbnQudGFyZ2V0ID0gbm9kZTtcbiAgICBmYWtlTmF0aXZlRXZlbnQudHlwZSA9IGV2ZW50VHlwZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gV2UgZG9uJ3QgdXNlIFN5bnRoZXRpY0V2ZW50LmdldFBvb2xlZCBpbiBvcmRlciB0byBub3QgaGF2ZSB0byB3b3JyeSBhYm91dFxuICAgIC8vIHByb3Blcmx5IGRlc3Ryb3lpbmcgYW55IHByb3BlcnRpZXMgYXNzaWduZWQgZnJvbSBgZXZlbnREYXRhYCB1cG9uIHJlbGVhc2VcbiAgICB2YXIgZXZlbnQgPSBuZXcgU3ludGhldGljRXZlbnQoZGlzcGF0Y2hDb25maWcsIFJlYWN0RE9NQ29tcG9uZW50VHJlZS5nZXRJbnN0YW5jZUZyb21Ob2RlKG5vZGUpLCBmYWtlTmF0aXZlRXZlbnQsIG5vZGUpO1xuICAgIC8vIFNpbmNlIHdlIGFyZW4ndCB1c2luZyBwb29saW5nLCBhbHdheXMgcGVyc2lzdCB0aGUgZXZlbnQuIFRoaXMgd2lsbCBtYWtlXG4gICAgLy8gc3VyZSBpdCdzIG1hcmtlZCBhbmQgd29uJ3Qgd2FybiB3aGVuIHNldHRpbmcgYWRkaXRpb25hbCBwcm9wZXJ0aWVzLlxuICAgIGV2ZW50LnBlcnNpc3QoKTtcbiAgICBfYXNzaWduKGV2ZW50LCBldmVudERhdGEpO1xuXG4gICAgaWYgKGRpc3BhdGNoQ29uZmlnLnBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzKSB7XG4gICAgICBFdmVudFByb3BhZ2F0b3JzLmFjY3VtdWxhdGVUd29QaGFzZURpc3BhdGNoZXMoZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBFdmVudFByb3BhZ2F0b3JzLmFjY3VtdWxhdGVEaXJlY3REaXNwYXRjaGVzKGV2ZW50KTtcbiAgICB9XG5cbiAgICBSZWFjdFVwZGF0ZXMuYmF0Y2hlZFVwZGF0ZXMoZnVuY3Rpb24gKCkge1xuICAgICAgRXZlbnRQbHVnaW5IdWIuZW5xdWV1ZUV2ZW50cyhldmVudCk7XG4gICAgICBFdmVudFBsdWdpbkh1Yi5wcm9jZXNzRXZlbnRRdWV1ZSh0cnVlKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYnVpbGRTaW11bGF0b3JzKCkge1xuICBSZWFjdFRlc3RVdGlscy5TaW11bGF0ZSA9IHt9O1xuXG4gIHZhciBldmVudFR5cGU7XG4gIGZvciAoZXZlbnRUeXBlIGluIEV2ZW50UGx1Z2luUmVnaXN0cnkuZXZlbnROYW1lRGlzcGF0Y2hDb25maWdzKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHshRWxlbWVudHxSZWFjdERPTUNvbXBvbmVudH0gZG9tQ29tcG9uZW50T3JOb2RlXG4gICAgICogQHBhcmFtIHs/b2JqZWN0fSBldmVudERhdGEgRmFrZSBldmVudCBkYXRhIHRvIHVzZSBpbiBTeW50aGV0aWNFdmVudC5cbiAgICAgKi9cbiAgICBSZWFjdFRlc3RVdGlscy5TaW11bGF0ZVtldmVudFR5cGVdID0gbWFrZVNpbXVsYXRvcihldmVudFR5cGUpO1xuICB9XG59XG5cbi8vIFJlYnVpbGQgUmVhY3RUZXN0VXRpbHMuU2ltdWxhdGUgd2hlbmV2ZXIgZXZlbnQgcGx1Z2lucyBhcmUgaW5qZWN0ZWRcbnZhciBvbGRJbmplY3RFdmVudFBsdWdpbk9yZGVyID0gRXZlbnRQbHVnaW5IdWIuaW5qZWN0aW9uLmluamVjdEV2ZW50UGx1Z2luT3JkZXI7XG5FdmVudFBsdWdpbkh1Yi5pbmplY3Rpb24uaW5qZWN0RXZlbnRQbHVnaW5PcmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgb2xkSW5qZWN0RXZlbnRQbHVnaW5PcmRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICBidWlsZFNpbXVsYXRvcnMoKTtcbn07XG52YXIgb2xkSW5qZWN0RXZlbnRQbHVnaW5zID0gRXZlbnRQbHVnaW5IdWIuaW5qZWN0aW9uLmluamVjdEV2ZW50UGx1Z2luc0J5TmFtZTtcbkV2ZW50UGx1Z2luSHViLmluamVjdGlvbi5pbmplY3RFdmVudFBsdWdpbnNCeU5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gIG9sZEluamVjdEV2ZW50UGx1Z2lucy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICBidWlsZFNpbXVsYXRvcnMoKTtcbn07XG5cbmJ1aWxkU2ltdWxhdG9ycygpO1xuXG4vKipcbiAqIEV4cG9ydHM6XG4gKlxuICogLSBgUmVhY3RUZXN0VXRpbHMuU2ltdWxhdGVOYXRpdmUuY2xpY2soRWxlbWVudC9SZWFjdERPTUNvbXBvbmVudClgXG4gKiAtIGBSZWFjdFRlc3RVdGlscy5TaW11bGF0ZU5hdGl2ZS5tb3VzZU1vdmUoRWxlbWVudC9SZWFjdERPTUNvbXBvbmVudClgXG4gKiAtIGBSZWFjdFRlc3RVdGlscy5TaW11bGF0ZU5hdGl2ZS5tb3VzZUluL1JlYWN0RE9NQ29tcG9uZW50KWBcbiAqIC0gYFJlYWN0VGVzdFV0aWxzLlNpbXVsYXRlTmF0aXZlLm1vdXNlT3V0KEVsZW1lbnQvUmVhY3RET01Db21wb25lbnQpYFxuICogLSAuLi4gKEFsbCBrZXlzIGZyb20gYEV2ZW50Q29uc3RhbnRzLnRvcExldmVsVHlwZXNgKVxuICpcbiAqIE5vdGU6IFRvcCBsZXZlbCBldmVudCB0eXBlcyBhcmUgYSBzdWJzZXQgb2YgdGhlIGVudGlyZSBzZXQgb2YgaGFuZGxlciB0eXBlc1xuICogKHdoaWNoIGluY2x1ZGUgYSBicm9hZGVyIHNldCBvZiBcInN5bnRoZXRpY1wiIGV2ZW50cykuIEZvciBleGFtcGxlLCBvbkRyYWdEb25lXG4gKiBpcyBhIHN5bnRoZXRpYyBldmVudC4gRXhjZXB0IHdoZW4gdGVzdGluZyBhbiBldmVudCBwbHVnaW4gb3IgUmVhY3QncyBldmVudFxuICogaGFuZGxpbmcgY29kZSBzcGVjaWZpY2FsbHksIHlvdSBwcm9iYWJseSB3YW50IHRvIHVzZSBSZWFjdFRlc3RVdGlscy5TaW11bGF0ZVxuICogdG8gZGlzcGF0Y2ggc3ludGhldGljIGV2ZW50cy5cbiAqL1xuXG5mdW5jdGlvbiBtYWtlTmF0aXZlU2ltdWxhdG9yKGV2ZW50VHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGRvbUNvbXBvbmVudE9yTm9kZSwgbmF0aXZlRXZlbnREYXRhKSB7XG4gICAgdmFyIGZha2VOYXRpdmVFdmVudCA9IG5ldyBFdmVudChldmVudFR5cGUpO1xuICAgIF9hc3NpZ24oZmFrZU5hdGl2ZUV2ZW50LCBuYXRpdmVFdmVudERhdGEpO1xuICAgIGlmIChSZWFjdFRlc3RVdGlscy5pc0RPTUNvbXBvbmVudChkb21Db21wb25lbnRPck5vZGUpKSB7XG4gICAgICBSZWFjdFRlc3RVdGlscy5zaW11bGF0ZU5hdGl2ZUV2ZW50T25ET01Db21wb25lbnQoZXZlbnRUeXBlLCBkb21Db21wb25lbnRPck5vZGUsIGZha2VOYXRpdmVFdmVudCk7XG4gICAgfSBlbHNlIGlmIChkb21Db21wb25lbnRPck5vZGUudGFnTmFtZSkge1xuICAgICAgLy8gV2lsbCBhbGxvdyBvbiBhY3R1YWwgZG9tIG5vZGVzLlxuICAgICAgUmVhY3RUZXN0VXRpbHMuc2ltdWxhdGVOYXRpdmVFdmVudE9uTm9kZShldmVudFR5cGUsIGRvbUNvbXBvbmVudE9yTm9kZSwgZmFrZU5hdGl2ZUV2ZW50KTtcbiAgICB9XG4gIH07XG59XG5cbk9iamVjdC5rZXlzKHRvcExldmVsVHlwZXMpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50VHlwZSkge1xuICAvLyBFdmVudCB0eXBlIGlzIHN0b3JlZCBhcyAndG9wQ2xpY2snIC0gd2UgdHJhbnNmb3JtIHRoYXQgdG8gJ2NsaWNrJ1xuICB2YXIgY29udmVuaWVuY2VOYW1lID0gZXZlbnRUeXBlLmluZGV4T2YoJ3RvcCcpID09PSAwID8gZXZlbnRUeXBlLmNoYXJBdCgzKS50b0xvd2VyQ2FzZSgpICsgZXZlbnRUeXBlLnN1YnN0cig0KSA6IGV2ZW50VHlwZTtcbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR8UmVhY3RET01Db21wb25lbnR9IGRvbUNvbXBvbmVudE9yTm9kZVxuICAgKiBAcGFyYW0gez9FdmVudH0gbmF0aXZlRXZlbnREYXRhIEZha2UgbmF0aXZlIGV2ZW50IHRvIHVzZSBpbiBTeW50aGV0aWNFdmVudC5cbiAgICovXG4gIFJlYWN0VGVzdFV0aWxzLlNpbXVsYXRlTmF0aXZlW2NvbnZlbmllbmNlTmFtZV0gPSBtYWtlTmF0aXZlU2ltdWxhdG9yKGV2ZW50VHlwZSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFRlc3RVdGlsczsiXX0=