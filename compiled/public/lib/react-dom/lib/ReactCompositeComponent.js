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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _prodInvariant = require('./reactProdInvariant'),
    _assign = require('object-assign');

var React = require('react/lib/React');
var ReactComponentEnvironment = require('./ReactComponentEnvironment');
var ReactCurrentOwner = require('react/lib/ReactCurrentOwner');
var ReactErrorUtils = require('./ReactErrorUtils');
var ReactInstanceMap = require('./ReactInstanceMap');
var ReactInstrumentation = require('./ReactInstrumentation');
var ReactNodeTypes = require('./ReactNodeTypes');
var ReactReconciler = require('./ReactReconciler');

if (process.env.NODE_ENV !== 'production') {
  var checkReactTypeSpec = require('./checkReactTypeSpec');
}

var emptyObject = require('fbjs/lib/emptyObject');
var invariant = require('fbjs/lib/invariant');
var shallowEqual = require('fbjs/lib/shallowEqual');
var shouldUpdateReactComponent = require('./shouldUpdateReactComponent');
var warning = require('fbjs/lib/warning');

var CompositeTypes = {
  ImpureClass: 0,
  PureClass: 1,
  StatelessFunctional: 2
};

function StatelessComponent(Component) {}
StatelessComponent.prototype.render = function () {
  var Component = ReactInstanceMap.get(this)._currentElement.type;
  var element = Component(this.props, this.context, this.updater);
  warnIfInvalidElement(Component, element);
  return element;
};

function warnIfInvalidElement(Component, element) {
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(element === null || element === false || React.isValidElement(element), '%s(...): A valid React element (or null) must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', Component.displayName || Component.name || 'Component') : void 0;
    process.env.NODE_ENV !== 'production' ? warning(!Component.childContextTypes, '%s(...): childContextTypes cannot be defined on a functional component.', Component.displayName || Component.name || 'Component') : void 0;
  }
}

function shouldConstruct(Component) {
  return !!(Component.prototype && Component.prototype.isReactComponent);
}

function isPureComponent(Component) {
  return !!(Component.prototype && Component.prototype.isPureReactComponent);
}

// Separated into a function to contain deoptimizations caused by try/finally.
function measureLifeCyclePerf(fn, debugID, timerType) {
  if (debugID === 0) {
    // Top-level wrappers (see ReactMount) and empty components (see
    // ReactDOMEmptyComponent) are invisible to hooks and devtools.
    // Both are implementation details that should go away in the future.
    return fn();
  }

  ReactInstrumentation.debugTool.onBeginLifeCycleTimer(debugID, timerType);
  try {
    return fn();
  } finally {
    ReactInstrumentation.debugTool.onEndLifeCycleTimer(debugID, timerType);
  }
}

/**
 * ------------------ The Life-Cycle of a Composite Component ------------------
 *
 * - constructor: Initialization of state. The instance is now retained.
 *   - componentWillMount
 *   - render
 *   - [children's constructors]
 *     - [children's componentWillMount and render]
 *     - [children's componentDidMount]
 *     - componentDidMount
 *
 *       Update Phases:
 *       - componentWillReceiveProps (only called if parent updated)
 *       - shouldComponentUpdate
 *         - componentWillUpdate
 *           - render
 *           - [children's constructors or receive props phases]
 *         - componentDidUpdate
 *
 *     - componentWillUnmount
 *     - [children's componentWillUnmount]
 *   - [children destroyed]
 * - (destroyed): The instance is now blank, released by React and ready for GC.
 *
 * -----------------------------------------------------------------------------
 */

/**
 * An incrementing ID assigned to each component when it is mounted. This is
 * used to enforce the order in which `ReactUpdates` updates dirty components.
 *
 * @private
 */
var nextMountID = 1;

/**
 * @lends {ReactCompositeComponent.prototype}
 */
var ReactCompositeComponent = {

  /**
   * Base constructor for all composite component.
   *
   * @param {ReactElement} element
   * @final
   * @internal
   */
  construct: function construct(element) {
    this._currentElement = element;
    this._rootNodeID = 0;
    this._compositeType = null;
    this._instance = null;
    this._hostParent = null;
    this._hostContainerInfo = null;

    // See ReactUpdateQueue
    this._updateBatchNumber = null;
    this._pendingElement = null;
    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    this._renderedNodeType = null;
    this._renderedComponent = null;
    this._context = null;
    this._mountOrder = 0;
    this._topLevelWrapper = null;

    // See ReactUpdates and ReactUpdateQueue.
    this._pendingCallbacks = null;

    // ComponentWillUnmount shall only be called once
    this._calledComponentWillUnmount = false;

    if (process.env.NODE_ENV !== 'production') {
      this._warnedAboutRefsInRender = false;
    }
  },

  /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {?object} hostParent
   * @param {?object} hostContainerInfo
   * @param {?object} context
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */
  mountComponent: function mountComponent(transaction, hostParent, hostContainerInfo, context) {
    var _this = this;

    this._context = context;
    this._mountOrder = nextMountID++;
    this._hostParent = hostParent;
    this._hostContainerInfo = hostContainerInfo;

    var publicProps = this._currentElement.props;
    var publicContext = this._processContext(context);

    var Component = this._currentElement.type;

    var updateQueue = transaction.getUpdateQueue();

    // Initialize the public class
    var doConstruct = shouldConstruct(Component);
    var inst = this._constructComponent(doConstruct, publicProps, publicContext, updateQueue);
    var renderedElement;

    // Support functional components
    if (!doConstruct && (inst == null || inst.render == null)) {
      renderedElement = inst;
      warnIfInvalidElement(Component, renderedElement);
      !(inst === null || inst === false || React.isValidElement(inst)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s(...): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.', Component.displayName || Component.name || 'Component') : _prodInvariant('105', Component.displayName || Component.name || 'Component') : void 0;
      inst = new StatelessComponent(Component);
      this._compositeType = CompositeTypes.StatelessFunctional;
    } else {
      if (isPureComponent(Component)) {
        this._compositeType = CompositeTypes.PureClass;
      } else {
        this._compositeType = CompositeTypes.ImpureClass;
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      // This will throw later in _renderValidatedComponent, but add an early
      // warning now to help debugging
      if (inst.render == null) {
        process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', Component.displayName || Component.name || 'Component') : void 0;
      }

      var propsMutated = inst.props !== publicProps;
      var componentName = Component.displayName || Component.name || 'Component';

      process.env.NODE_ENV !== 'production' ? warning(inst.props === undefined || !propsMutated, '%s(...): When calling super() in `%s`, make sure to pass ' + 'up the same props that your component\'s constructor was passed.', componentName, componentName) : void 0;
    }

    // These should be set up in the constructor, but as a convenience for
    // simpler class abstractions, we set them up after the fact.
    inst.props = publicProps;
    inst.context = publicContext;
    inst.refs = emptyObject;
    inst.updater = updateQueue;

    this._instance = inst;

    // Store a reference from the instance back to the internal representation
    ReactInstanceMap.set(inst, this);

    if (process.env.NODE_ENV !== 'production') {
      // Since plain JS classes are defined without any special initialization
      // logic, we can not catch common errors early. Therefore, we have to
      // catch them here, at initialization time, instead.
      process.env.NODE_ENV !== 'production' ? warning(!inst.getInitialState || inst.getInitialState.isReactClassApproved || inst.state, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', this.getName() || 'a component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!inst.getDefaultProps || inst.getDefaultProps.isReactClassApproved, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', this.getName() || 'a component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!inst.propTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', this.getName() || 'a component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!inst.contextTypes, 'contextTypes was defined as an instance property on %s. Use a ' + 'static property to define contextTypes instead.', this.getName() || 'a component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentShouldUpdate !== 'function', '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', this.getName() || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentDidUnmount !== 'function', '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', this.getName() || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentWillRecieveProps !== 'function', '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', this.getName() || 'A component') : void 0;
    }

    var initialState = inst.state;
    if (initialState === undefined) {
      inst.state = initialState = null;
    }
    !((typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState)) === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.state: must be set to an object or null', this.getName() || 'ReactCompositeComponent') : _prodInvariant('106', this.getName() || 'ReactCompositeComponent') : void 0;

    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    var markup;
    if (inst.unstable_handleError) {
      markup = this.performInitialMountWithErrorHandling(renderedElement, hostParent, hostContainerInfo, transaction, context);
    } else {
      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
    }

    if (inst.componentDidMount) {
      if (process.env.NODE_ENV !== 'production') {
        transaction.getReactMountReady().enqueue(function () {
          measureLifeCyclePerf(function () {
            return inst.componentDidMount();
          }, _this._debugID, 'componentDidMount');
        });
      } else {
        transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
      }
    }

    return markup;
  },

  _constructComponent: function _constructComponent(doConstruct, publicProps, publicContext, updateQueue) {
    if (process.env.NODE_ENV !== 'production') {
      ReactCurrentOwner.current = this;
      try {
        return this._constructComponentWithoutOwner(doConstruct, publicProps, publicContext, updateQueue);
      } finally {
        ReactCurrentOwner.current = null;
      }
    } else {
      return this._constructComponentWithoutOwner(doConstruct, publicProps, publicContext, updateQueue);
    }
  },

  _constructComponentWithoutOwner: function _constructComponentWithoutOwner(doConstruct, publicProps, publicContext, updateQueue) {
    var Component = this._currentElement.type;

    if (doConstruct) {
      if (process.env.NODE_ENV !== 'production') {
        return measureLifeCyclePerf(function () {
          return new Component(publicProps, publicContext, updateQueue);
        }, this._debugID, 'ctor');
      } else {
        return new Component(publicProps, publicContext, updateQueue);
      }
    }

    // This can still be an instance in case of factory components
    // but we'll count this as time spent rendering as the more common case.
    if (process.env.NODE_ENV !== 'production') {
      return measureLifeCyclePerf(function () {
        return Component(publicProps, publicContext, updateQueue);
      }, this._debugID, 'render');
    } else {
      return Component(publicProps, publicContext, updateQueue);
    }
  },

  performInitialMountWithErrorHandling: function performInitialMountWithErrorHandling(renderedElement, hostParent, hostContainerInfo, transaction, context) {
    var markup;
    var checkpoint = transaction.checkpoint();
    try {
      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
    } catch (e) {
      // Roll back to checkpoint, handle error (which may add items to the transaction), and take a new checkpoint
      transaction.rollback(checkpoint);
      this._instance.unstable_handleError(e);
      if (this._pendingStateQueue) {
        this._instance.state = this._processPendingState(this._instance.props, this._instance.context);
      }
      checkpoint = transaction.checkpoint();

      this._renderedComponent.unmountComponent(true);
      transaction.rollback(checkpoint);

      // Try again - we've informed the component about the error, so they can render an error message this time.
      // If this throws again, the error will bubble up (and can be caught by a higher error boundary).
      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
    }
    return markup;
  },

  performInitialMount: function performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context) {
    var inst = this._instance;

    var debugID = 0;
    if (process.env.NODE_ENV !== 'production') {
      debugID = this._debugID;
    }

    if (inst.componentWillMount) {
      if (process.env.NODE_ENV !== 'production') {
        measureLifeCyclePerf(function () {
          return inst.componentWillMount();
        }, debugID, 'componentWillMount');
      } else {
        inst.componentWillMount();
      }
      // When mounting, calls to `setState` by `componentWillMount` will set
      // `this._pendingStateQueue` without triggering a re-render.
      if (this._pendingStateQueue) {
        inst.state = this._processPendingState(inst.props, inst.context);
      }
    }

    // If not a stateless component, we now render
    if (renderedElement === undefined) {
      renderedElement = this._renderValidatedComponent();
    }

    var nodeType = ReactNodeTypes.getType(renderedElement);
    this._renderedNodeType = nodeType;
    var child = this._instantiateReactComponent(renderedElement, nodeType !== ReactNodeTypes.EMPTY /* shouldHaveDebugID */
    );
    this._renderedComponent = child;

    var markup = ReactReconciler.mountComponent(child, transaction, hostParent, hostContainerInfo, this._processChildContext(context), debugID);

    if (process.env.NODE_ENV !== 'production') {
      if (debugID !== 0) {
        var childDebugIDs = child._debugID !== 0 ? [child._debugID] : [];
        ReactInstrumentation.debugTool.onSetChildren(debugID, childDebugIDs);
      }
    }

    return markup;
  },

  getHostNode: function getHostNode() {
    return ReactReconciler.getHostNode(this._renderedComponent);
  },

  /**
   * Releases any resources allocated by `mountComponent`.
   *
   * @final
   * @internal
   */
  unmountComponent: function unmountComponent(safely) {
    if (!this._renderedComponent) {
      return;
    }

    var inst = this._instance;

    if (inst.componentWillUnmount && !inst._calledComponentWillUnmount) {
      inst._calledComponentWillUnmount = true;

      if (safely) {
        var name = this.getName() + '.componentWillUnmount()';
        ReactErrorUtils.invokeGuardedCallback(name, inst.componentWillUnmount.bind(inst));
      } else {
        if (process.env.NODE_ENV !== 'production') {
          measureLifeCyclePerf(function () {
            return inst.componentWillUnmount();
          }, this._debugID, 'componentWillUnmount');
        } else {
          inst.componentWillUnmount();
        }
      }
    }

    if (this._renderedComponent) {
      ReactReconciler.unmountComponent(this._renderedComponent, safely);
      this._renderedNodeType = null;
      this._renderedComponent = null;
      this._instance = null;
    }

    // Reset pending fields
    // Even if this component is scheduled for another update in ReactUpdates,
    // it would still be ignored because these fields are reset.
    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;
    this._pendingCallbacks = null;
    this._pendingElement = null;

    // These fields do not really need to be reset since this object is no
    // longer accessible.
    this._context = null;
    this._rootNodeID = 0;
    this._topLevelWrapper = null;

    // Delete the reference from the instance to this internal representation
    // which allow the internals to be properly cleaned up even if the user
    // leaks a reference to the public instance.
    ReactInstanceMap.remove(inst);

    // Some existing components rely on inst.props even after they've been
    // destroyed (in event handlers).
    // TODO: inst.props = null;
    // TODO: inst.state = null;
    // TODO: inst.context = null;
  },

  /**
   * Filters the context object to only contain keys specified in
   * `contextTypes`
   *
   * @param {object} context
   * @return {?object}
   * @private
   */
  _maskContext: function _maskContext(context) {
    var Component = this._currentElement.type;
    var contextTypes = Component.contextTypes;
    if (!contextTypes) {
      return emptyObject;
    }
    var maskedContext = {};
    for (var contextName in contextTypes) {
      maskedContext[contextName] = context[contextName];
    }
    return maskedContext;
  },

  /**
   * Filters the context object to only contain keys specified in
   * `contextTypes`, and asserts that they are valid.
   *
   * @param {object} context
   * @return {?object}
   * @private
   */
  _processContext: function _processContext(context) {
    var maskedContext = this._maskContext(context);
    if (process.env.NODE_ENV !== 'production') {
      var Component = this._currentElement.type;
      if (Component.contextTypes) {
        this._checkContextTypes(Component.contextTypes, maskedContext, 'context');
      }
    }
    return maskedContext;
  },

  /**
   * @param {object} currentContext
   * @return {object}
   * @private
   */
  _processChildContext: function _processChildContext(currentContext) {
    var Component = this._currentElement.type;
    var inst = this._instance;
    var childContext;

    if (inst.getChildContext) {
      if (process.env.NODE_ENV !== 'production') {
        ReactInstrumentation.debugTool.onBeginProcessingChildContext();
        try {
          childContext = inst.getChildContext();
        } finally {
          ReactInstrumentation.debugTool.onEndProcessingChildContext();
        }
      } else {
        childContext = inst.getChildContext();
      }
    }

    if (childContext) {
      !(_typeof(Component.childContextTypes) === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().', this.getName() || 'ReactCompositeComponent') : _prodInvariant('107', this.getName() || 'ReactCompositeComponent') : void 0;
      if (process.env.NODE_ENV !== 'production') {
        this._checkContextTypes(Component.childContextTypes, childContext, 'childContext');
      }
      for (var name in childContext) {
        !(name in Component.childContextTypes) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', this.getName() || 'ReactCompositeComponent', name) : _prodInvariant('108', this.getName() || 'ReactCompositeComponent', name) : void 0;
      }
      return _assign({}, currentContext, childContext);
    }
    return currentContext;
  },

  /**
   * Assert that the context types are valid
   *
   * @param {object} typeSpecs Map of context field to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @private
   */
  _checkContextTypes: function _checkContextTypes(typeSpecs, values, location) {
    if (process.env.NODE_ENV !== 'production') {
      checkReactTypeSpec(typeSpecs, values, location, this.getName(), null, this._debugID);
    }
  },

  receiveComponent: function receiveComponent(nextElement, transaction, nextContext) {
    var prevElement = this._currentElement;
    var prevContext = this._context;

    this._pendingElement = null;

    this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
  },

  /**
   * If any of `_pendingElement`, `_pendingStateQueue`, or `_pendingForceUpdate`
   * is set, update the component.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  performUpdateIfNecessary: function performUpdateIfNecessary(transaction) {
    if (this._pendingElement != null) {
      ReactReconciler.receiveComponent(this, this._pendingElement, transaction, this._context);
    } else if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
      this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
    } else {
      this._updateBatchNumber = null;
    }
  },

  /**
   * Perform an update to a mounted component. The componentWillReceiveProps and
   * shouldComponentUpdate methods are called, then (assuming the update isn't
   * skipped) the remaining update lifecycle methods are called and the DOM
   * representation is updated.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {ReactElement} prevParentElement
   * @param {ReactElement} nextParentElement
   * @internal
   * @overridable
   */
  updateComponent: function updateComponent(transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
    var inst = this._instance;
    !(inst != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Attempted to update component `%s` that has already been unmounted (or failed to mount).', this.getName() || 'ReactCompositeComponent') : _prodInvariant('136', this.getName() || 'ReactCompositeComponent') : void 0;

    var willReceive = false;
    var nextContext;

    // Determine if the context has changed or not
    if (this._context === nextUnmaskedContext) {
      nextContext = inst.context;
    } else {
      nextContext = this._processContext(nextUnmaskedContext);
      willReceive = true;
    }

    var prevProps = prevParentElement.props;
    var nextProps = nextParentElement.props;

    // Not a simple state update but a props update
    if (prevParentElement !== nextParentElement) {
      willReceive = true;
    }

    // An update here will schedule an update but immediately set
    // _pendingStateQueue which will ensure that any state updates gets
    // immediately reconciled instead of waiting for the next batch.
    if (willReceive && inst.componentWillReceiveProps) {
      if (process.env.NODE_ENV !== 'production') {
        measureLifeCyclePerf(function () {
          return inst.componentWillReceiveProps(nextProps, nextContext);
        }, this._debugID, 'componentWillReceiveProps');
      } else {
        inst.componentWillReceiveProps(nextProps, nextContext);
      }
    }

    var nextState = this._processPendingState(nextProps, nextContext);
    var shouldUpdate = true;

    if (!this._pendingForceUpdate) {
      if (inst.shouldComponentUpdate) {
        if (process.env.NODE_ENV !== 'production') {
          shouldUpdate = measureLifeCyclePerf(function () {
            return inst.shouldComponentUpdate(nextProps, nextState, nextContext);
          }, this._debugID, 'shouldComponentUpdate');
        } else {
          shouldUpdate = inst.shouldComponentUpdate(nextProps, nextState, nextContext);
        }
      } else {
        if (this._compositeType === CompositeTypes.PureClass) {
          shouldUpdate = !shallowEqual(prevProps, nextProps) || !shallowEqual(inst.state, nextState);
        }
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(shouldUpdate !== undefined, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', this.getName() || 'ReactCompositeComponent') : void 0;
    }

    this._updateBatchNumber = null;
    if (shouldUpdate) {
      this._pendingForceUpdate = false;
      // Will set `this.props`, `this.state` and `this.context`.
      this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
    } else {
      // If it's determined that a component should not update, we still want
      // to set props and state but we shortcut the rest of the update.
      this._currentElement = nextParentElement;
      this._context = nextUnmaskedContext;
      inst.props = nextProps;
      inst.state = nextState;
      inst.context = nextContext;
    }
  },

  _processPendingState: function _processPendingState(props, context) {
    var inst = this._instance;
    var queue = this._pendingStateQueue;
    var replace = this._pendingReplaceState;
    this._pendingReplaceState = false;
    this._pendingStateQueue = null;

    if (!queue) {
      return inst.state;
    }

    if (replace && queue.length === 1) {
      return queue[0];
    }

    var nextState = _assign({}, replace ? queue[0] : inst.state);
    for (var i = replace ? 1 : 0; i < queue.length; i++) {
      var partial = queue[i];
      _assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
    }

    return nextState;
  },

  /**
   * Merges new props and state, notifies delegate methods of update and
   * performs update.
   *
   * @param {ReactElement} nextElement Next element
   * @param {object} nextProps Next public object to set as properties.
   * @param {?object} nextState Next object to set as state.
   * @param {?object} nextContext Next public object to set as context.
   * @param {ReactReconcileTransaction} transaction
   * @param {?object} unmaskedContext
   * @private
   */
  _performComponentUpdate: function _performComponentUpdate(nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
    var _this2 = this;

    var inst = this._instance;

    var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
    var prevProps;
    var prevState;
    var prevContext;
    if (hasComponentDidUpdate) {
      prevProps = inst.props;
      prevState = inst.state;
      prevContext = inst.context;
    }

    if (inst.componentWillUpdate) {
      if (process.env.NODE_ENV !== 'production') {
        measureLifeCyclePerf(function () {
          return inst.componentWillUpdate(nextProps, nextState, nextContext);
        }, this._debugID, 'componentWillUpdate');
      } else {
        inst.componentWillUpdate(nextProps, nextState, nextContext);
      }
    }

    this._currentElement = nextElement;
    this._context = unmaskedContext;
    inst.props = nextProps;
    inst.state = nextState;
    inst.context = nextContext;

    this._updateRenderedComponent(transaction, unmaskedContext);

    if (hasComponentDidUpdate) {
      if (process.env.NODE_ENV !== 'production') {
        transaction.getReactMountReady().enqueue(function () {
          measureLifeCyclePerf(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), _this2._debugID, 'componentDidUpdate');
        });
      } else {
        transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
      }
    }
  },

  /**
   * Call the component's `render` method and update the DOM accordingly.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  _updateRenderedComponent: function _updateRenderedComponent(transaction, context) {
    var prevComponentInstance = this._renderedComponent;
    var prevRenderedElement = prevComponentInstance._currentElement;
    var nextRenderedElement = this._renderValidatedComponent();

    var debugID = 0;
    if (process.env.NODE_ENV !== 'production') {
      debugID = this._debugID;
    }

    if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
      ReactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
    } else {
      var oldHostNode = ReactReconciler.getHostNode(prevComponentInstance);
      ReactReconciler.unmountComponent(prevComponentInstance, false);

      var nodeType = ReactNodeTypes.getType(nextRenderedElement);
      this._renderedNodeType = nodeType;
      var child = this._instantiateReactComponent(nextRenderedElement, nodeType !== ReactNodeTypes.EMPTY /* shouldHaveDebugID */
      );
      this._renderedComponent = child;

      var nextMarkup = ReactReconciler.mountComponent(child, transaction, this._hostParent, this._hostContainerInfo, this._processChildContext(context), debugID);

      if (process.env.NODE_ENV !== 'production') {
        if (debugID !== 0) {
          var childDebugIDs = child._debugID !== 0 ? [child._debugID] : [];
          ReactInstrumentation.debugTool.onSetChildren(debugID, childDebugIDs);
        }
      }

      this._replaceNodeWithMarkup(oldHostNode, nextMarkup, prevComponentInstance);
    }
  },

  /**
   * Overridden in shallow rendering.
   *
   * @protected
   */
  _replaceNodeWithMarkup: function _replaceNodeWithMarkup(oldHostNode, nextMarkup, prevInstance) {
    ReactComponentEnvironment.replaceNodeWithMarkup(oldHostNode, nextMarkup, prevInstance);
  },

  /**
   * @protected
   */
  _renderValidatedComponentWithoutOwnerOrContext: function _renderValidatedComponentWithoutOwnerOrContext() {
    var inst = this._instance;
    var renderedElement;

    if (process.env.NODE_ENV !== 'production') {
      renderedElement = measureLifeCyclePerf(function () {
        return inst.render();
      }, this._debugID, 'render');
    } else {
      renderedElement = inst.render();
    }

    if (process.env.NODE_ENV !== 'production') {
      // We allow auto-mocks to proceed as if they're returning null.
      if (renderedElement === undefined && inst.render._isMockFunction) {
        // This is probably bad practice. Consider warning here and
        // deprecating this convenience.
        renderedElement = null;
      }
    }

    return renderedElement;
  },

  /**
   * @private
   */
  _renderValidatedComponent: function _renderValidatedComponent() {
    var renderedElement;
    if (process.env.NODE_ENV !== 'production' || this._compositeType !== CompositeTypes.StatelessFunctional) {
      ReactCurrentOwner.current = this;
      try {
        renderedElement = this._renderValidatedComponentWithoutOwnerOrContext();
      } finally {
        ReactCurrentOwner.current = null;
      }
    } else {
      renderedElement = this._renderValidatedComponentWithoutOwnerOrContext();
    }
    !(
    // TODO: An `isValidNode` function would probably be more appropriate
    renderedElement === null || renderedElement === false || React.isValidElement(renderedElement)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.render(): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.', this.getName() || 'ReactCompositeComponent') : _prodInvariant('109', this.getName() || 'ReactCompositeComponent') : void 0;

    return renderedElement;
  },

  /**
   * Lazily allocates the refs object and stores `component` as `ref`.
   *
   * @param {string} ref Reference name.
   * @param {component} component Component to store as `ref`.
   * @final
   * @private
   */
  attachRef: function attachRef(ref, component) {
    var inst = this.getPublicInstance();
    !(inst != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Stateless function components cannot have refs.') : _prodInvariant('110') : void 0;
    var publicComponentInstance = component.getPublicInstance();
    if (process.env.NODE_ENV !== 'production') {
      var componentName = component && component.getName ? component.getName() : 'a component';
      process.env.NODE_ENV !== 'production' ? warning(publicComponentInstance != null || component._compositeType !== CompositeTypes.StatelessFunctional, 'Stateless function components cannot be given refs ' + '(See ref "%s" in %s created by %s). ' + 'Attempts to access this ref will fail.', ref, componentName, this.getName()) : void 0;
    }
    var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
    refs[ref] = publicComponentInstance;
  },

  /**
   * Detaches a reference name.
   *
   * @param {string} ref Name to dereference.
   * @final
   * @private
   */
  detachRef: function detachRef(ref) {
    var refs = this.getPublicInstance().refs;
    delete refs[ref];
  },

  /**
   * Get a text description of the component that can be used to identify it
   * in error messages.
   * @return {string} The name or null.
   * @internal
   */
  getName: function getName() {
    var type = this._currentElement.type;
    var constructor = this._instance && this._instance.constructor;
    return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
  },

  /**
   * Get the publicly accessible representation of this component - i.e. what
   * is exposed by refs and returned by render. Can be null for stateless
   * components.
   *
   * @return {ReactComponent} the public component instance.
   * @internal
   */
  getPublicInstance: function getPublicInstance() {
    var inst = this._instance;
    if (this._compositeType === CompositeTypes.StatelessFunctional) {
      return null;
    }
    return inst;
  },

  // Stub
  _instantiateReactComponent: null

};

module.exports = ReactCompositeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdENvbXBvc2l0ZUNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJfcHJvZEludmFyaWFudCIsInJlcXVpcmUiLCJfYXNzaWduIiwiUmVhY3QiLCJSZWFjdENvbXBvbmVudEVudmlyb25tZW50IiwiUmVhY3RDdXJyZW50T3duZXIiLCJSZWFjdEVycm9yVXRpbHMiLCJSZWFjdEluc3RhbmNlTWFwIiwiUmVhY3RJbnN0cnVtZW50YXRpb24iLCJSZWFjdE5vZGVUeXBlcyIsIlJlYWN0UmVjb25jaWxlciIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImNoZWNrUmVhY3RUeXBlU3BlYyIsImVtcHR5T2JqZWN0IiwiaW52YXJpYW50Iiwic2hhbGxvd0VxdWFsIiwic2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQiLCJ3YXJuaW5nIiwiQ29tcG9zaXRlVHlwZXMiLCJJbXB1cmVDbGFzcyIsIlB1cmVDbGFzcyIsIlN0YXRlbGVzc0Z1bmN0aW9uYWwiLCJTdGF0ZWxlc3NDb21wb25lbnQiLCJDb21wb25lbnQiLCJwcm90b3R5cGUiLCJyZW5kZXIiLCJnZXQiLCJfY3VycmVudEVsZW1lbnQiLCJ0eXBlIiwiZWxlbWVudCIsInByb3BzIiwiY29udGV4dCIsInVwZGF0ZXIiLCJ3YXJuSWZJbnZhbGlkRWxlbWVudCIsImlzVmFsaWRFbGVtZW50IiwiZGlzcGxheU5hbWUiLCJuYW1lIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJzaG91bGRDb25zdHJ1Y3QiLCJpc1JlYWN0Q29tcG9uZW50IiwiaXNQdXJlQ29tcG9uZW50IiwiaXNQdXJlUmVhY3RDb21wb25lbnQiLCJtZWFzdXJlTGlmZUN5Y2xlUGVyZiIsImZuIiwiZGVidWdJRCIsInRpbWVyVHlwZSIsImRlYnVnVG9vbCIsIm9uQmVnaW5MaWZlQ3ljbGVUaW1lciIsIm9uRW5kTGlmZUN5Y2xlVGltZXIiLCJuZXh0TW91bnRJRCIsIlJlYWN0Q29tcG9zaXRlQ29tcG9uZW50IiwiY29uc3RydWN0IiwiX3Jvb3ROb2RlSUQiLCJfY29tcG9zaXRlVHlwZSIsIl9pbnN0YW5jZSIsIl9ob3N0UGFyZW50IiwiX2hvc3RDb250YWluZXJJbmZvIiwiX3VwZGF0ZUJhdGNoTnVtYmVyIiwiX3BlbmRpbmdFbGVtZW50IiwiX3BlbmRpbmdTdGF0ZVF1ZXVlIiwiX3BlbmRpbmdSZXBsYWNlU3RhdGUiLCJfcGVuZGluZ0ZvcmNlVXBkYXRlIiwiX3JlbmRlcmVkTm9kZVR5cGUiLCJfcmVuZGVyZWRDb21wb25lbnQiLCJfY29udGV4dCIsIl9tb3VudE9yZGVyIiwiX3RvcExldmVsV3JhcHBlciIsIl9wZW5kaW5nQ2FsbGJhY2tzIiwiX2NhbGxlZENvbXBvbmVudFdpbGxVbm1vdW50IiwiX3dhcm5lZEFib3V0UmVmc0luUmVuZGVyIiwibW91bnRDb21wb25lbnQiLCJ0cmFuc2FjdGlvbiIsImhvc3RQYXJlbnQiLCJob3N0Q29udGFpbmVySW5mbyIsIl90aGlzIiwicHVibGljUHJvcHMiLCJwdWJsaWNDb250ZXh0IiwiX3Byb2Nlc3NDb250ZXh0IiwidXBkYXRlUXVldWUiLCJnZXRVcGRhdGVRdWV1ZSIsImRvQ29uc3RydWN0IiwiaW5zdCIsIl9jb25zdHJ1Y3RDb21wb25lbnQiLCJyZW5kZXJlZEVsZW1lbnQiLCJwcm9wc011dGF0ZWQiLCJjb21wb25lbnROYW1lIiwidW5kZWZpbmVkIiwicmVmcyIsInNldCIsImdldEluaXRpYWxTdGF0ZSIsImlzUmVhY3RDbGFzc0FwcHJvdmVkIiwic3RhdGUiLCJnZXROYW1lIiwiZ2V0RGVmYXVsdFByb3BzIiwicHJvcFR5cGVzIiwiY29udGV4dFR5cGVzIiwiY29tcG9uZW50U2hvdWxkVXBkYXRlIiwiY29tcG9uZW50RGlkVW5tb3VudCIsImNvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMiLCJpbml0aWFsU3RhdGUiLCJBcnJheSIsImlzQXJyYXkiLCJtYXJrdXAiLCJ1bnN0YWJsZV9oYW5kbGVFcnJvciIsInBlcmZvcm1Jbml0aWFsTW91bnRXaXRoRXJyb3JIYW5kbGluZyIsInBlcmZvcm1Jbml0aWFsTW91bnQiLCJjb21wb25lbnREaWRNb3VudCIsImdldFJlYWN0TW91bnRSZWFkeSIsImVucXVldWUiLCJfZGVidWdJRCIsImN1cnJlbnQiLCJfY29uc3RydWN0Q29tcG9uZW50V2l0aG91dE93bmVyIiwiY2hlY2twb2ludCIsImUiLCJyb2xsYmFjayIsIl9wcm9jZXNzUGVuZGluZ1N0YXRlIiwidW5tb3VudENvbXBvbmVudCIsImNvbXBvbmVudFdpbGxNb3VudCIsIl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQiLCJub2RlVHlwZSIsImdldFR5cGUiLCJjaGlsZCIsIl9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50IiwiRU1QVFkiLCJfcHJvY2Vzc0NoaWxkQ29udGV4dCIsImNoaWxkRGVidWdJRHMiLCJvblNldENoaWxkcmVuIiwiZ2V0SG9zdE5vZGUiLCJzYWZlbHkiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImludm9rZUd1YXJkZWRDYWxsYmFjayIsImJpbmQiLCJyZW1vdmUiLCJfbWFza0NvbnRleHQiLCJtYXNrZWRDb250ZXh0IiwiY29udGV4dE5hbWUiLCJfY2hlY2tDb250ZXh0VHlwZXMiLCJjdXJyZW50Q29udGV4dCIsImNoaWxkQ29udGV4dCIsImdldENoaWxkQ29udGV4dCIsIm9uQmVnaW5Qcm9jZXNzaW5nQ2hpbGRDb250ZXh0Iiwib25FbmRQcm9jZXNzaW5nQ2hpbGRDb250ZXh0IiwidHlwZVNwZWNzIiwidmFsdWVzIiwibG9jYXRpb24iLCJyZWNlaXZlQ29tcG9uZW50IiwibmV4dEVsZW1lbnQiLCJuZXh0Q29udGV4dCIsInByZXZFbGVtZW50IiwicHJldkNvbnRleHQiLCJ1cGRhdGVDb21wb25lbnQiLCJwZXJmb3JtVXBkYXRlSWZOZWNlc3NhcnkiLCJwcmV2UGFyZW50RWxlbWVudCIsIm5leHRQYXJlbnRFbGVtZW50IiwicHJldlVubWFza2VkQ29udGV4dCIsIm5leHRVbm1hc2tlZENvbnRleHQiLCJ3aWxsUmVjZWl2ZSIsInByZXZQcm9wcyIsIm5leHRQcm9wcyIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0U3RhdGUiLCJzaG91bGRVcGRhdGUiLCJzaG91bGRDb21wb25lbnRVcGRhdGUiLCJfcGVyZm9ybUNvbXBvbmVudFVwZGF0ZSIsInF1ZXVlIiwicmVwbGFjZSIsImxlbmd0aCIsImkiLCJwYXJ0aWFsIiwiY2FsbCIsInVubWFza2VkQ29udGV4dCIsIl90aGlzMiIsImhhc0NvbXBvbmVudERpZFVwZGF0ZSIsIkJvb2xlYW4iLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2U3RhdGUiLCJjb21wb25lbnRXaWxsVXBkYXRlIiwiX3VwZGF0ZVJlbmRlcmVkQ29tcG9uZW50IiwicHJldkNvbXBvbmVudEluc3RhbmNlIiwicHJldlJlbmRlcmVkRWxlbWVudCIsIm5leHRSZW5kZXJlZEVsZW1lbnQiLCJvbGRIb3N0Tm9kZSIsIm5leHRNYXJrdXAiLCJfcmVwbGFjZU5vZGVXaXRoTWFya3VwIiwicHJldkluc3RhbmNlIiwicmVwbGFjZU5vZGVXaXRoTWFya3VwIiwiX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudFdpdGhvdXRPd25lck9yQ29udGV4dCIsIl9pc01vY2tGdW5jdGlvbiIsImF0dGFjaFJlZiIsInJlZiIsImNvbXBvbmVudCIsImdldFB1YmxpY0luc3RhbmNlIiwicHVibGljQ29tcG9uZW50SW5zdGFuY2UiLCJkZXRhY2hSZWYiLCJjb25zdHJ1Y3RvciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBVUE7Ozs7QUFFQSxJQUFJQSxpQkFBaUJDLFFBQVEsc0JBQVIsQ0FBckI7QUFBQSxJQUNJQyxVQUFVRCxRQUFRLGVBQVIsQ0FEZDs7QUFHQSxJQUFJRSxRQUFRRixRQUFRLGlCQUFSLENBQVo7QUFDQSxJQUFJRyw0QkFBNEJILFFBQVEsNkJBQVIsQ0FBaEM7QUFDQSxJQUFJSSxvQkFBb0JKLFFBQVEsNkJBQVIsQ0FBeEI7QUFDQSxJQUFJSyxrQkFBa0JMLFFB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Q0FBcUJDLElBQWhDO0FBQ0EsUUFBSXNLLGNBQWMsS0FBSzVJLFNBQUwsSUFBa0IsS0FBS0EsU0FBTCxDQUFlNEksV0FBbkQ7QUFDQSxXQUFPdEssS0FBS08sV0FBTCxJQUFvQitKLGVBQWVBLFlBQVkvSixXQUEvQyxJQUE4RFAsS0FBS1EsSUFBbkUsSUFBMkU4SixlQUFlQSxZQUFZOUosSUFBdEcsSUFBOEcsSUFBckg7QUFDRCxHQXZ2QjJCOztBQXl2QjVCOzs7Ozs7OztBQVFBMkoscUJBQW1CLDZCQUFZO0FBQzdCLFFBQUk5RyxPQUFPLEtBQUszQixTQUFoQjtBQUNBLFFBQUksS0FBS0QsY0FBTCxLQUF3Qm5DLGVBQWVHLG1CQUEzQyxFQUFnRTtBQUM5RCxhQUFPLElBQVA7QUFDRDtBQUNELFdBQU80RCxJQUFQO0FBQ0QsR0F2d0IyQjs7QUF5d0I1QjtBQUNBeUMsOEJBQTRCOztBQTF3QkEsQ0FBOUI7O0FBOHdCQXlFLE9BQU9DLE9BQVAsR0FBaUJsSix1QkFBakIiLCJmaWxlIjoiUmVhY3RDb21wb3NpdGVDb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpLFxuICAgIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdCcpO1xudmFyIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQnKTtcbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJlYWN0RXJyb3JVdGlscyA9IHJlcXVpcmUoJy4vUmVhY3RFcnJvclV0aWxzJyk7XG52YXIgUmVhY3RJbnN0YW5jZU1hcCA9IHJlcXVpcmUoJy4vUmVhY3RJbnN0YW5jZU1hcCcpO1xudmFyIFJlYWN0SW5zdHJ1bWVudGF0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xudmFyIFJlYWN0Tm9kZVR5cGVzID0gcmVxdWlyZSgnLi9SZWFjdE5vZGVUeXBlcycpO1xudmFyIFJlYWN0UmVjb25jaWxlciA9IHJlcXVpcmUoJy4vUmVhY3RSZWNvbmNpbGVyJyk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBjaGVja1JlYWN0VHlwZVNwZWMgPSByZXF1aXJlKCcuL2NoZWNrUmVhY3RUeXBlU3BlYycpO1xufVxuXG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHNoYWxsb3dFcXVhbCA9IHJlcXVpcmUoJ2ZianMvbGliL3NoYWxsb3dFcXVhbCcpO1xudmFyIHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9zaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBDb21wb3NpdGVUeXBlcyA9IHtcbiAgSW1wdXJlQ2xhc3M6IDAsXG4gIFB1cmVDbGFzczogMSxcbiAgU3RhdGVsZXNzRnVuY3Rpb25hbDogMlxufTtcblxuZnVuY3Rpb24gU3RhdGVsZXNzQ29tcG9uZW50KENvbXBvbmVudCkge31cblN0YXRlbGVzc0NvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgQ29tcG9uZW50ID0gUmVhY3RJbnN0YW5jZU1hcC5nZXQodGhpcykuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gIHZhciBlbGVtZW50ID0gQ29tcG9uZW50KHRoaXMucHJvcHMsIHRoaXMuY29udGV4dCwgdGhpcy51cGRhdGVyKTtcbiAgd2FybklmSW52YWxpZEVsZW1lbnQoQ29tcG9uZW50LCBlbGVtZW50KTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5mdW5jdGlvbiB3YXJuSWZJbnZhbGlkRWxlbWVudChDb21wb25lbnQsIGVsZW1lbnQpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IGZhbHNlIHx8IFJlYWN0LmlzVmFsaWRFbGVtZW50KGVsZW1lbnQpLCAnJXMoLi4uKTogQSB2YWxpZCBSZWFjdCBlbGVtZW50IChvciBudWxsKSBtdXN0IGJlIHJldHVybmVkLiBZb3UgbWF5IGhhdmUgJyArICdyZXR1cm5lZCB1bmRlZmluZWQsIGFuIGFycmF5IG9yIHNvbWUgb3RoZXIgaW52YWxpZCBvYmplY3QuJywgQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghQ29tcG9uZW50LmNoaWxkQ29udGV4dFR5cGVzLCAnJXMoLi4uKTogY2hpbGRDb250ZXh0VHlwZXMgY2Fubm90IGJlIGRlZmluZWQgb24gYSBmdW5jdGlvbmFsIGNvbXBvbmVudC4nLCBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCcpIDogdm9pZCAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3VsZENvbnN0cnVjdChDb21wb25lbnQpIHtcbiAgcmV0dXJuICEhKENvbXBvbmVudC5wcm90b3R5cGUgJiYgQ29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50KTtcbn1cblxuZnVuY3Rpb24gaXNQdXJlQ29tcG9uZW50KENvbXBvbmVudCkge1xuICByZXR1cm4gISEoQ29tcG9uZW50LnByb3RvdHlwZSAmJiBDb21wb25lbnQucHJvdG90eXBlLmlzUHVyZVJlYWN0Q29tcG9uZW50KTtcbn1cblxuLy8gU2VwYXJhdGVkIGludG8gYSBmdW5jdGlvbiB0byBjb250YWluIGRlb3B0aW1pemF0aW9ucyBjYXVzZWQgYnkgdHJ5L2ZpbmFsbHkuXG5mdW5jdGlvbiBtZWFzdXJlTGlmZUN5Y2xlUGVyZihmbiwgZGVidWdJRCwgdGltZXJUeXBlKSB7XG4gIGlmIChkZWJ1Z0lEID09PSAwKSB7XG4gICAgLy8gVG9wLWxldmVsIHdyYXBwZXJzIChzZWUgUmVhY3RNb3VudCkgYW5kIGVtcHR5IGNvbXBvbmVudHMgKHNlZVxuICAgIC8vIFJlYWN0RE9NRW1wdHlDb21wb25lbnQpIGFyZSBpbnZpc2libGUgdG8gaG9va3MgYW5kIGRldnRvb2xzLlxuICAgIC8vIEJvdGggYXJlIGltcGxlbWVudGF0aW9uIGRldGFpbHMgdGhhdCBzaG91bGQgZ28gYXdheSBpbiB0aGUgZnV0dXJlLlxuICAgIHJldHVybiBmbigpO1xuICB9XG5cbiAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uQmVnaW5MaWZlQ3ljbGVUaW1lcihkZWJ1Z0lELCB0aW1lclR5cGUpO1xuICB0cnkge1xuICAgIHJldHVybiBmbigpO1xuICB9IGZpbmFsbHkge1xuICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vbkVuZExpZmVDeWNsZVRpbWVyKGRlYnVnSUQsIHRpbWVyVHlwZSk7XG4gIH1cbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0gVGhlIExpZmUtQ3ljbGUgb2YgYSBDb21wb3NpdGUgQ29tcG9uZW50IC0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqIC0gY29uc3RydWN0b3I6IEluaXRpYWxpemF0aW9uIG9mIHN0YXRlLiBUaGUgaW5zdGFuY2UgaXMgbm93IHJldGFpbmVkLlxuICogICAtIGNvbXBvbmVudFdpbGxNb3VudFxuICogICAtIHJlbmRlclxuICogICAtIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9yc11cbiAqICAgICAtIFtjaGlsZHJlbidzIGNvbXBvbmVudFdpbGxNb3VudCBhbmQgcmVuZGVyXVxuICogICAgIC0gW2NoaWxkcmVuJ3MgY29tcG9uZW50RGlkTW91bnRdXG4gKiAgICAgLSBjb21wb25lbnREaWRNb3VudFxuICpcbiAqICAgICAgIFVwZGF0ZSBQaGFzZXM6XG4gKiAgICAgICAtIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG9ubHkgY2FsbGVkIGlmIHBhcmVudCB1cGRhdGVkKVxuICogICAgICAgLSBzaG91bGRDb21wb25lbnRVcGRhdGVcbiAqICAgICAgICAgLSBjb21wb25lbnRXaWxsVXBkYXRlXG4gKiAgICAgICAgICAgLSByZW5kZXJcbiAqICAgICAgICAgICAtIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9ycyBvciByZWNlaXZlIHByb3BzIHBoYXNlc11cbiAqICAgICAgICAgLSBjb21wb25lbnREaWRVcGRhdGVcbiAqXG4gKiAgICAgLSBjb21wb25lbnRXaWxsVW5tb3VudFxuICogICAgIC0gW2NoaWxkcmVuJ3MgY29tcG9uZW50V2lsbFVubW91bnRdXG4gKiAgIC0gW2NoaWxkcmVuIGRlc3Ryb3llZF1cbiAqIC0gKGRlc3Ryb3llZCk6IFRoZSBpbnN0YW5jZSBpcyBub3cgYmxhbmssIHJlbGVhc2VkIGJ5IFJlYWN0IGFuZCByZWFkeSBmb3IgR0MuXG4gKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4vKipcbiAqIEFuIGluY3JlbWVudGluZyBJRCBhc3NpZ25lZCB0byBlYWNoIGNvbXBvbmVudCB3aGVuIGl0IGlzIG1vdW50ZWQuIFRoaXMgaXNcbiAqIHVzZWQgdG8gZW5mb3JjZSB0aGUgb3JkZXIgaW4gd2hpY2ggYFJlYWN0VXBkYXRlc2AgdXBkYXRlcyBkaXJ0eSBjb21wb25lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBuZXh0TW91bnRJRCA9IDE7XG5cbi8qKlxuICogQGxlbmRzIHtSZWFjdENvbXBvc2l0ZUNvbXBvbmVudC5wcm90b3R5cGV9XG4gKi9cbnZhciBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCA9IHtcblxuICAvKipcbiAgICogQmFzZSBjb25zdHJ1Y3RvciBmb3IgYWxsIGNvbXBvc2l0ZSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gICAqIEBmaW5hbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5fcm9vdE5vZGVJRCA9IDA7XG4gICAgdGhpcy5fY29tcG9zaXRlVHlwZSA9IG51bGw7XG4gICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuX2hvc3RQYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuX2hvc3RDb250YWluZXJJbmZvID0gbnVsbDtcblxuICAgIC8vIFNlZSBSZWFjdFVwZGF0ZVF1ZXVlXG4gICAgdGhpcy5fdXBkYXRlQmF0Y2hOdW1iZXIgPSBudWxsO1xuICAgIHRoaXMuX3BlbmRpbmdFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSA9IG51bGw7XG4gICAgdGhpcy5fcGVuZGluZ1JlcGxhY2VTdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5fcmVuZGVyZWROb2RlVHlwZSA9IG51bGw7XG4gICAgdGhpcy5fcmVuZGVyZWRDb21wb25lbnQgPSBudWxsO1xuICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuX21vdW50T3JkZXIgPSAwO1xuICAgIHRoaXMuX3RvcExldmVsV3JhcHBlciA9IG51bGw7XG5cbiAgICAvLyBTZWUgUmVhY3RVcGRhdGVzIGFuZCBSZWFjdFVwZGF0ZVF1ZXVlLlxuICAgIHRoaXMuX3BlbmRpbmdDYWxsYmFja3MgPSBudWxsO1xuXG4gICAgLy8gQ29tcG9uZW50V2lsbFVubW91bnQgc2hhbGwgb25seSBiZSBjYWxsZWQgb25jZVxuICAgIHRoaXMuX2NhbGxlZENvbXBvbmVudFdpbGxVbm1vdW50ID0gZmFsc2U7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdGhpcy5fd2FybmVkQWJvdXRSZWZzSW5SZW5kZXIgPSBmYWxzZTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBjb21wb25lbnQsIHJlbmRlcnMgbWFya3VwLCBhbmQgcmVnaXN0ZXJzIGV2ZW50IGxpc3RlbmVycy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufFJlYWN0U2VydmVyUmVuZGVyaW5nVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSB7P29iamVjdH0gaG9zdFBhcmVudFxuICAgKiBAcGFyYW0gez9vYmplY3R9IGhvc3RDb250YWluZXJJbmZvXG4gICAqIEBwYXJhbSB7P29iamVjdH0gY29udGV4dFxuICAgKiBAcmV0dXJuIHs/c3RyaW5nfSBSZW5kZXJlZCBtYXJrdXAgdG8gYmUgaW5zZXJ0ZWQgaW50byB0aGUgRE9NLlxuICAgKiBAZmluYWxcbiAgICogQGludGVybmFsXG4gICAqL1xuICBtb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCBob3N0UGFyZW50LCBob3N0Q29udGFpbmVySW5mbywgY29udGV4dCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLl9tb3VudE9yZGVyID0gbmV4dE1vdW50SUQrKztcbiAgICB0aGlzLl9ob3N0UGFyZW50ID0gaG9zdFBhcmVudDtcbiAgICB0aGlzLl9ob3N0Q29udGFpbmVySW5mbyA9IGhvc3RDb250YWluZXJJbmZvO1xuXG4gICAgdmFyIHB1YmxpY1Byb3BzID0gdGhpcy5fY3VycmVudEVsZW1lbnQucHJvcHM7XG4gICAgdmFyIHB1YmxpY0NvbnRleHQgPSB0aGlzLl9wcm9jZXNzQ29udGV4dChjb250ZXh0KTtcblxuICAgIHZhciBDb21wb25lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuXG4gICAgdmFyIHVwZGF0ZVF1ZXVlID0gdHJhbnNhY3Rpb24uZ2V0VXBkYXRlUXVldWUoKTtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIHB1YmxpYyBjbGFzc1xuICAgIHZhciBkb0NvbnN0cnVjdCA9IHNob3VsZENvbnN0cnVjdChDb21wb25lbnQpO1xuICAgIHZhciBpbnN0ID0gdGhpcy5fY29uc3RydWN0Q29tcG9uZW50KGRvQ29uc3RydWN0LCBwdWJsaWNQcm9wcywgcHVibGljQ29udGV4dCwgdXBkYXRlUXVldWUpO1xuICAgIHZhciByZW5kZXJlZEVsZW1lbnQ7XG5cbiAgICAvLyBTdXBwb3J0IGZ1bmN0aW9uYWwgY29tcG9uZW50c1xuICAgIGlmICghZG9Db25zdHJ1Y3QgJiYgKGluc3QgPT0gbnVsbCB8fCBpbnN0LnJlbmRlciA9PSBudWxsKSkge1xuICAgICAgcmVuZGVyZWRFbGVtZW50ID0gaW5zdDtcbiAgICAgIHdhcm5JZkludmFsaWRFbGVtZW50KENvbXBvbmVudCwgcmVuZGVyZWRFbGVtZW50KTtcbiAgICAgICEoaW5zdCA9PT0gbnVsbCB8fCBpbnN0ID09PSBmYWxzZSB8fCBSZWFjdC5pc1ZhbGlkRWxlbWVudChpbnN0KSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMoLi4uKTogQSB2YWxpZCBSZWFjdCBlbGVtZW50IChvciBudWxsKSBtdXN0IGJlIHJldHVybmVkLiBZb3UgbWF5IGhhdmUgcmV0dXJuZWQgdW5kZWZpbmVkLCBhbiBhcnJheSBvciBzb21lIG90aGVyIGludmFsaWQgb2JqZWN0LicsIENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JykgOiBfcHJvZEludmFyaWFudCgnMTA1JywgQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIGluc3QgPSBuZXcgU3RhdGVsZXNzQ29tcG9uZW50KENvbXBvbmVudCk7XG4gICAgICB0aGlzLl9jb21wb3NpdGVUeXBlID0gQ29tcG9zaXRlVHlwZXMuU3RhdGVsZXNzRnVuY3Rpb25hbDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzUHVyZUNvbXBvbmVudChDb21wb25lbnQpKSB7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZVR5cGUgPSBDb21wb3NpdGVUeXBlcy5QdXJlQ2xhc3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9jb21wb3NpdGVUeXBlID0gQ29tcG9zaXRlVHlwZXMuSW1wdXJlQ2xhc3M7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBsYXRlciBpbiBfcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50LCBidXQgYWRkIGFuIGVhcmx5XG4gICAgICAvLyB3YXJuaW5nIG5vdyB0byBoZWxwIGRlYnVnZ2luZ1xuICAgICAgaWYgKGluc3QucmVuZGVyID09IG51bGwpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pOiBObyBgcmVuZGVyYCBtZXRob2QgZm91bmQgb24gdGhlIHJldHVybmVkIGNvbXBvbmVudCAnICsgJ2luc3RhbmNlOiB5b3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIGRlZmluZSBgcmVuZGVyYC4nLCBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJvcHNNdXRhdGVkID0gaW5zdC5wcm9wcyAhPT0gcHVibGljUHJvcHM7XG4gICAgICB2YXIgY29tcG9uZW50TmFtZSA9IENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JztcblxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoaW5zdC5wcm9wcyA9PT0gdW5kZWZpbmVkIHx8ICFwcm9wc011dGF0ZWQsICclcyguLi4pOiBXaGVuIGNhbGxpbmcgc3VwZXIoKSBpbiBgJXNgLCBtYWtlIHN1cmUgdG8gcGFzcyAnICsgJ3VwIHRoZSBzYW1lIHByb3BzIHRoYXQgeW91ciBjb21wb25lbnRcXCdzIGNvbnN0cnVjdG9yIHdhcyBwYXNzZWQuJywgY29tcG9uZW50TmFtZSwgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gVGhlc2Ugc2hvdWxkIGJlIHNldCB1cCBpbiB0aGUgY29uc3RydWN0b3IsIGJ1dCBhcyBhIGNvbnZlbmllbmNlIGZvclxuICAgIC8vIHNpbXBsZXIgY2xhc3MgYWJzdHJhY3Rpb25zLCB3ZSBzZXQgdGhlbSB1cCBhZnRlciB0aGUgZmFjdC5cbiAgICBpbnN0LnByb3BzID0gcHVibGljUHJvcHM7XG4gICAgaW5zdC5jb250ZXh0ID0gcHVibGljQ29udGV4dDtcbiAgICBpbnN0LnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgICBpbnN0LnVwZGF0ZXIgPSB1cGRhdGVRdWV1ZTtcblxuICAgIHRoaXMuX2luc3RhbmNlID0gaW5zdDtcblxuICAgIC8vIFN0b3JlIGEgcmVmZXJlbmNlIGZyb20gdGhlIGluc3RhbmNlIGJhY2sgdG8gdGhlIGludGVybmFsIHJlcHJlc2VudGF0aW9uXG4gICAgUmVhY3RJbnN0YW5jZU1hcC5zZXQoaW5zdCwgdGhpcyk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gU2luY2UgcGxhaW4gSlMgY2xhc3NlcyBhcmUgZGVmaW5lZCB3aXRob3V0IGFueSBzcGVjaWFsIGluaXRpYWxpemF0aW9uXG4gICAgICAvLyBsb2dpYywgd2UgY2FuIG5vdCBjYXRjaCBjb21tb24gZXJyb3JzIGVhcmx5LiBUaGVyZWZvcmUsIHdlIGhhdmUgdG9cbiAgICAgIC8vIGNhdGNoIHRoZW0gaGVyZSwgYXQgaW5pdGlhbGl6YXRpb24gdGltZSwgaW5zdGVhZC5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFpbnN0LmdldEluaXRpYWxTdGF0ZSB8fCBpbnN0LmdldEluaXRpYWxTdGF0ZS5pc1JlYWN0Q2xhc3NBcHByb3ZlZCB8fCBpbnN0LnN0YXRlLCAnZ2V0SW5pdGlhbFN0YXRlIHdhcyBkZWZpbmVkIG9uICVzLCBhIHBsYWluIEphdmFTY3JpcHQgY2xhc3MuICcgKyAnVGhpcyBpcyBvbmx5IHN1cHBvcnRlZCBmb3IgY2xhc3NlcyBjcmVhdGVkIHVzaW5nIFJlYWN0LmNyZWF0ZUNsYXNzLiAnICsgJ0RpZCB5b3UgbWVhbiB0byBkZWZpbmUgYSBzdGF0ZSBwcm9wZXJ0eSBpbnN0ZWFkPycsIHRoaXMuZ2V0TmFtZSgpIHx8ICdhIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWluc3QuZ2V0RGVmYXVsdFByb3BzIHx8IGluc3QuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkLCAnZ2V0RGVmYXVsdFByb3BzIHdhcyBkZWZpbmVkIG9uICVzLCBhIHBsYWluIEphdmFTY3JpcHQgY2xhc3MuICcgKyAnVGhpcyBpcyBvbmx5IHN1cHBvcnRlZCBmb3IgY2xhc3NlcyBjcmVhdGVkIHVzaW5nIFJlYWN0LmNyZWF0ZUNsYXNzLiAnICsgJ1VzZSBhIHN0YXRpYyBwcm9wZXJ0eSB0byBkZWZpbmUgZGVmYXVsdFByb3BzIGluc3RlYWQuJywgdGhpcy5nZXROYW1lKCkgfHwgJ2EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghaW5zdC5wcm9wVHlwZXMsICdwcm9wVHlwZXMgd2FzIGRlZmluZWQgYXMgYW4gaW5zdGFuY2UgcHJvcGVydHkgb24gJXMuIFVzZSBhIHN0YXRpYyAnICsgJ3Byb3BlcnR5IHRvIGRlZmluZSBwcm9wVHlwZXMgaW5zdGVhZC4nLCB0aGlzLmdldE5hbWUoKSB8fCAnYSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFpbnN0LmNvbnRleHRUeXBlcywgJ2NvbnRleHRUeXBlcyB3YXMgZGVmaW5lZCBhcyBhbiBpbnN0YW5jZSBwcm9wZXJ0eSBvbiAlcy4gVXNlIGEgJyArICdzdGF0aWMgcHJvcGVydHkgdG8gZGVmaW5lIGNvbnRleHRUeXBlcyBpbnN0ZWFkLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdhIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodHlwZW9mIGluc3QuY29tcG9uZW50U2hvdWxkVXBkYXRlICE9PSAnZnVuY3Rpb24nLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFNob3VsZFVwZGF0ZSgpLiBEaWQgeW91IG1lYW4gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCk/ICcgKyAnVGhlIG5hbWUgaXMgcGhyYXNlZCBhcyBhIHF1ZXN0aW9uIGJlY2F1c2UgdGhlIGZ1bmN0aW9uIGlzICcgKyAnZXhwZWN0ZWQgdG8gcmV0dXJuIGEgdmFsdWUuJywgdGhpcy5nZXROYW1lKCkgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgaW5zdC5jb21wb25lbnREaWRVbm1vdW50ICE9PSAnZnVuY3Rpb24nLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudERpZFVubW91bnQoKS4gQnV0IHRoZXJlIGlzIG5vIHN1Y2ggbGlmZWN5Y2xlIG1ldGhvZC4gJyArICdEaWQgeW91IG1lYW4gY29tcG9uZW50V2lsbFVubW91bnQoKT8nLCB0aGlzLmdldE5hbWUoKSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiBpbnN0LmNvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMgIT09ICdmdW5jdGlvbicsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcygpLiBEaWQgeW91IG1lYW4gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpPycsIHRoaXMuZ2V0TmFtZSgpIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIHZhciBpbml0aWFsU3RhdGUgPSBpbnN0LnN0YXRlO1xuICAgIGlmIChpbml0aWFsU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5zdC5zdGF0ZSA9IGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgfVxuICAgICEodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaW5pdGlhbFN0YXRlKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuc3RhdGU6IG11c3QgYmUgc2V0IHRvIGFuIG9iamVjdCBvciBudWxsJywgdGhpcy5nZXROYW1lKCkgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBfcHJvZEludmFyaWFudCgnMTA2JywgdGhpcy5nZXROYW1lKCkgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiB2b2lkIDA7XG5cbiAgICB0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSA9IG51bGw7XG4gICAgdGhpcy5fcGVuZGluZ1JlcGxhY2VTdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgdmFyIG1hcmt1cDtcbiAgICBpZiAoaW5zdC51bnN0YWJsZV9oYW5kbGVFcnJvcikge1xuICAgICAgbWFya3VwID0gdGhpcy5wZXJmb3JtSW5pdGlhbE1vdW50V2l0aEVycm9ySGFuZGxpbmcocmVuZGVyZWRFbGVtZW50LCBob3N0UGFyZW50LCBob3N0Q29udGFpbmVySW5mbywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXJrdXAgPSB0aGlzLnBlcmZvcm1Jbml0aWFsTW91bnQocmVuZGVyZWRFbGVtZW50LCBob3N0UGFyZW50LCBob3N0Q29udGFpbmVySW5mbywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIGlmIChpbnN0LmNvbXBvbmVudERpZE1vdW50KSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB0cmFuc2FjdGlvbi5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBtZWFzdXJlTGlmZUN5Y2xlUGVyZihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5zdC5jb21wb25lbnREaWRNb3VudCgpO1xuICAgICAgICAgIH0sIF90aGlzLl9kZWJ1Z0lELCAnY29tcG9uZW50RGlkTW91bnQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2FjdGlvbi5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGluc3QuY29tcG9uZW50RGlkTW91bnQsIGluc3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXJrdXA7XG4gIH0sXG5cbiAgX2NvbnN0cnVjdENvbXBvbmVudDogZnVuY3Rpb24gKGRvQ29uc3RydWN0LCBwdWJsaWNQcm9wcywgcHVibGljQ29udGV4dCwgdXBkYXRlUXVldWUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IHRoaXM7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uc3RydWN0Q29tcG9uZW50V2l0aG91dE93bmVyKGRvQ29uc3RydWN0LCBwdWJsaWNQcm9wcywgcHVibGljQ29udGV4dCwgdXBkYXRlUXVldWUpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb25zdHJ1Y3RDb21wb25lbnRXaXRob3V0T3duZXIoZG9Db25zdHJ1Y3QsIHB1YmxpY1Byb3BzLCBwdWJsaWNDb250ZXh0LCB1cGRhdGVRdWV1ZSk7XG4gICAgfVxuICB9LFxuXG4gIF9jb25zdHJ1Y3RDb21wb25lbnRXaXRob3V0T3duZXI6IGZ1bmN0aW9uIChkb0NvbnN0cnVjdCwgcHVibGljUHJvcHMsIHB1YmxpY0NvbnRleHQsIHVwZGF0ZVF1ZXVlKSB7XG4gICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG5cbiAgICBpZiAoZG9Db25zdHJ1Y3QpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBtZWFzdXJlTGlmZUN5Y2xlUGVyZihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBDb21wb25lbnQocHVibGljUHJvcHMsIHB1YmxpY0NvbnRleHQsIHVwZGF0ZVF1ZXVlKTtcbiAgICAgICAgfSwgdGhpcy5fZGVidWdJRCwgJ2N0b3InKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29tcG9uZW50KHB1YmxpY1Byb3BzLCBwdWJsaWNDb250ZXh0LCB1cGRhdGVRdWV1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhpcyBjYW4gc3RpbGwgYmUgYW4gaW5zdGFuY2UgaW4gY2FzZSBvZiBmYWN0b3J5IGNvbXBvbmVudHNcbiAgICAvLyBidXQgd2UnbGwgY291bnQgdGhpcyBhcyB0aW1lIHNwZW50IHJlbmRlcmluZyBhcyB0aGUgbW9yZSBjb21tb24gY2FzZS5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcmV0dXJuIG1lYXN1cmVMaWZlQ3ljbGVQZXJmKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIENvbXBvbmVudChwdWJsaWNQcm9wcywgcHVibGljQ29udGV4dCwgdXBkYXRlUXVldWUpO1xuICAgICAgfSwgdGhpcy5fZGVidWdJRCwgJ3JlbmRlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQ29tcG9uZW50KHB1YmxpY1Byb3BzLCBwdWJsaWNDb250ZXh0LCB1cGRhdGVRdWV1ZSk7XG4gICAgfVxuICB9LFxuXG4gIHBlcmZvcm1Jbml0aWFsTW91bnRXaXRoRXJyb3JIYW5kbGluZzogZnVuY3Rpb24gKHJlbmRlcmVkRWxlbWVudCwgaG9zdFBhcmVudCwgaG9zdENvbnRhaW5lckluZm8sIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgdmFyIG1hcmt1cDtcbiAgICB2YXIgY2hlY2twb2ludCA9IHRyYW5zYWN0aW9uLmNoZWNrcG9pbnQoKTtcbiAgICB0cnkge1xuICAgICAgbWFya3VwID0gdGhpcy5wZXJmb3JtSW5pdGlhbE1vdW50KHJlbmRlcmVkRWxlbWVudCwgaG9zdFBhcmVudCwgaG9zdENvbnRhaW5lckluZm8sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBSb2xsIGJhY2sgdG8gY2hlY2twb2ludCwgaGFuZGxlIGVycm9yICh3aGljaCBtYXkgYWRkIGl0ZW1zIHRvIHRoZSB0cmFuc2FjdGlvbiksIGFuZCB0YWtlIGEgbmV3IGNoZWNrcG9pbnRcbiAgICAgIHRyYW5zYWN0aW9uLnJvbGxiYWNrKGNoZWNrcG9pbnQpO1xuICAgICAgdGhpcy5faW5zdGFuY2UudW5zdGFibGVfaGFuZGxlRXJyb3IoZSk7XG4gICAgICBpZiAodGhpcy5fcGVuZGluZ1N0YXRlUXVldWUpIHtcbiAgICAgICAgdGhpcy5faW5zdGFuY2Uuc3RhdGUgPSB0aGlzLl9wcm9jZXNzUGVuZGluZ1N0YXRlKHRoaXMuX2luc3RhbmNlLnByb3BzLCB0aGlzLl9pbnN0YW5jZS5jb250ZXh0KTtcbiAgICAgIH1cbiAgICAgIGNoZWNrcG9pbnQgPSB0cmFuc2FjdGlvbi5jaGVja3BvaW50KCk7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50LnVubW91bnRDb21wb25lbnQodHJ1ZSk7XG4gICAgICB0cmFuc2FjdGlvbi5yb2xsYmFjayhjaGVja3BvaW50KTtcblxuICAgICAgLy8gVHJ5IGFnYWluIC0gd2UndmUgaW5mb3JtZWQgdGhlIGNvbXBvbmVudCBhYm91dCB0aGUgZXJyb3IsIHNvIHRoZXkgY2FuIHJlbmRlciBhbiBlcnJvciBtZXNzYWdlIHRoaXMgdGltZS5cbiAgICAgIC8vIElmIHRoaXMgdGhyb3dzIGFnYWluLCB0aGUgZXJyb3Igd2lsbCBidWJibGUgdXAgKGFuZCBjYW4gYmUgY2F1Z2h0IGJ5IGEgaGlnaGVyIGVycm9yIGJvdW5kYXJ5KS5cbiAgICAgIG1hcmt1cCA9IHRoaXMucGVyZm9ybUluaXRpYWxNb3VudChyZW5kZXJlZEVsZW1lbnQsIGhvc3RQYXJlbnQsIGhvc3RDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBtYXJrdXA7XG4gIH0sXG5cbiAgcGVyZm9ybUluaXRpYWxNb3VudDogZnVuY3Rpb24gKHJlbmRlcmVkRWxlbWVudCwgaG9zdFBhcmVudCwgaG9zdENvbnRhaW5lckluZm8sIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcblxuICAgIHZhciBkZWJ1Z0lEID0gMDtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgZGVidWdJRCA9IHRoaXMuX2RlYnVnSUQ7XG4gICAgfVxuXG4gICAgaWYgKGluc3QuY29tcG9uZW50V2lsbE1vdW50KSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBtZWFzdXJlTGlmZUN5Y2xlUGVyZihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGluc3QuY29tcG9uZW50V2lsbE1vdW50KCk7XG4gICAgICAgIH0sIGRlYnVnSUQsICdjb21wb25lbnRXaWxsTW91bnQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3QuY29tcG9uZW50V2lsbE1vdW50KCk7XG4gICAgICB9XG4gICAgICAvLyBXaGVuIG1vdW50aW5nLCBjYWxscyB0byBgc2V0U3RhdGVgIGJ5IGBjb21wb25lbnRXaWxsTW91bnRgIHdpbGwgc2V0XG4gICAgICAvLyBgdGhpcy5fcGVuZGluZ1N0YXRlUXVldWVgIHdpdGhvdXQgdHJpZ2dlcmluZyBhIHJlLXJlbmRlci5cbiAgICAgIGlmICh0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSkge1xuICAgICAgICBpbnN0LnN0YXRlID0gdGhpcy5fcHJvY2Vzc1BlbmRpbmdTdGF0ZShpbnN0LnByb3BzLCBpbnN0LmNvbnRleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIG5vdCBhIHN0YXRlbGVzcyBjb21wb25lbnQsIHdlIG5vdyByZW5kZXJcbiAgICBpZiAocmVuZGVyZWRFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlbmRlcmVkRWxlbWVudCA9IHRoaXMuX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudCgpO1xuICAgIH1cblxuICAgIHZhciBub2RlVHlwZSA9IFJlYWN0Tm9kZVR5cGVzLmdldFR5cGUocmVuZGVyZWRFbGVtZW50KTtcbiAgICB0aGlzLl9yZW5kZXJlZE5vZGVUeXBlID0gbm9kZVR5cGU7XG4gICAgdmFyIGNoaWxkID0gdGhpcy5faW5zdGFudGlhdGVSZWFjdENvbXBvbmVudChyZW5kZXJlZEVsZW1lbnQsIG5vZGVUeXBlICE9PSBSZWFjdE5vZGVUeXBlcy5FTVBUWSAvKiBzaG91bGRIYXZlRGVidWdJRCAqL1xuICAgICk7XG4gICAgdGhpcy5fcmVuZGVyZWRDb21wb25lbnQgPSBjaGlsZDtcblxuICAgIHZhciBtYXJrdXAgPSBSZWFjdFJlY29uY2lsZXIubW91bnRDb21wb25lbnQoY2hpbGQsIHRyYW5zYWN0aW9uLCBob3N0UGFyZW50LCBob3N0Q29udGFpbmVySW5mbywgdGhpcy5fcHJvY2Vzc0NoaWxkQ29udGV4dChjb250ZXh0KSwgZGVidWdJRCk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGRlYnVnSUQgIT09IDApIHtcbiAgICAgICAgdmFyIGNoaWxkRGVidWdJRHMgPSBjaGlsZC5fZGVidWdJRCAhPT0gMCA/IFtjaGlsZC5fZGVidWdJRF0gOiBbXTtcbiAgICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uU2V0Q2hpbGRyZW4oZGVidWdJRCwgY2hpbGREZWJ1Z0lEcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmt1cDtcbiAgfSxcblxuICBnZXRIb3N0Tm9kZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBSZWFjdFJlY29uY2lsZXIuZ2V0SG9zdE5vZGUodGhpcy5fcmVuZGVyZWRDb21wb25lbnQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyBhbnkgcmVzb3VyY2VzIGFsbG9jYXRlZCBieSBgbW91bnRDb21wb25lbnRgLlxuICAgKlxuICAgKiBAZmluYWxcbiAgICogQGludGVybmFsXG4gICAqL1xuICB1bm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoc2FmZWx5KSB7XG4gICAgaWYgKCF0aGlzLl9yZW5kZXJlZENvbXBvbmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG5cbiAgICBpZiAoaW5zdC5jb21wb25lbnRXaWxsVW5tb3VudCAmJiAhaW5zdC5fY2FsbGVkQ29tcG9uZW50V2lsbFVubW91bnQpIHtcbiAgICAgIGluc3QuX2NhbGxlZENvbXBvbmVudFdpbGxVbm1vdW50ID0gdHJ1ZTtcblxuICAgICAgaWYgKHNhZmVseSkge1xuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpICsgJy5jb21wb25lbnRXaWxsVW5tb3VudCgpJztcbiAgICAgICAgUmVhY3RFcnJvclV0aWxzLmludm9rZUd1YXJkZWRDYWxsYmFjayhuYW1lLCBpbnN0LmNvbXBvbmVudFdpbGxVbm1vdW50LmJpbmQoaW5zdCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBtZWFzdXJlTGlmZUN5Y2xlUGVyZihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5zdC5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuICAgICAgICAgIH0sIHRoaXMuX2RlYnVnSUQsICdjb21wb25lbnRXaWxsVW5tb3VudCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluc3QuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9yZW5kZXJlZENvbXBvbmVudCkge1xuICAgICAgUmVhY3RSZWNvbmNpbGVyLnVubW91bnRDb21wb25lbnQodGhpcy5fcmVuZGVyZWRDb21wb25lbnQsIHNhZmVseSk7XG4gICAgICB0aGlzLl9yZW5kZXJlZE5vZGVUeXBlID0gbnVsbDtcbiAgICAgIHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBSZXNldCBwZW5kaW5nIGZpZWxkc1xuICAgIC8vIEV2ZW4gaWYgdGhpcyBjb21wb25lbnQgaXMgc2NoZWR1bGVkIGZvciBhbm90aGVyIHVwZGF0ZSBpbiBSZWFjdFVwZGF0ZXMsXG4gICAgLy8gaXQgd291bGQgc3RpbGwgYmUgaWdub3JlZCBiZWNhdXNlIHRoZXNlIGZpZWxkcyBhcmUgcmVzZXQuXG4gICAgdGhpcy5fcGVuZGluZ1N0YXRlUXVldWUgPSBudWxsO1xuICAgIHRoaXMuX3BlbmRpbmdSZXBsYWNlU3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUgPSBmYWxzZTtcbiAgICB0aGlzLl9wZW5kaW5nQ2FsbGJhY2tzID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nRWxlbWVudCA9IG51bGw7XG5cbiAgICAvLyBUaGVzZSBmaWVsZHMgZG8gbm90IHJlYWxseSBuZWVkIHRvIGJlIHJlc2V0IHNpbmNlIHRoaXMgb2JqZWN0IGlzIG5vXG4gICAgLy8gbG9uZ2VyIGFjY2Vzc2libGUuXG4gICAgdGhpcy5fY29udGV4dCA9IG51bGw7XG4gICAgdGhpcy5fcm9vdE5vZGVJRCA9IDA7XG4gICAgdGhpcy5fdG9wTGV2ZWxXcmFwcGVyID0gbnVsbDtcblxuICAgIC8vIERlbGV0ZSB0aGUgcmVmZXJlbmNlIGZyb20gdGhlIGluc3RhbmNlIHRvIHRoaXMgaW50ZXJuYWwgcmVwcmVzZW50YXRpb25cbiAgICAvLyB3aGljaCBhbGxvdyB0aGUgaW50ZXJuYWxzIHRvIGJlIHByb3Blcmx5IGNsZWFuZWQgdXAgZXZlbiBpZiB0aGUgdXNlclxuICAgIC8vIGxlYWtzIGEgcmVmZXJlbmNlIHRvIHRoZSBwdWJsaWMgaW5zdGFuY2UuXG4gICAgUmVhY3RJbnN0YW5jZU1hcC5yZW1vdmUoaW5zdCk7XG5cbiAgICAvLyBTb21lIGV4aXN0aW5nIGNvbXBvbmVudHMgcmVseSBvbiBpbnN0LnByb3BzIGV2ZW4gYWZ0ZXIgdGhleSd2ZSBiZWVuXG4gICAgLy8gZGVzdHJveWVkIChpbiBldmVudCBoYW5kbGVycykuXG4gICAgLy8gVE9ETzogaW5zdC5wcm9wcyA9IG51bGw7XG4gICAgLy8gVE9ETzogaW5zdC5zdGF0ZSA9IG51bGw7XG4gICAgLy8gVE9ETzogaW5zdC5jb250ZXh0ID0gbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogRmlsdGVycyB0aGUgY29udGV4dCBvYmplY3QgdG8gb25seSBjb250YWluIGtleXMgc3BlY2lmaWVkIGluXG4gICAqIGBjb250ZXh0VHlwZXNgXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0XG4gICAqIEByZXR1cm4gez9vYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbWFza0NvbnRleHQ6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gICAgdmFyIGNvbnRleHRUeXBlcyA9IENvbXBvbmVudC5jb250ZXh0VHlwZXM7XG4gICAgaWYgKCFjb250ZXh0VHlwZXMpIHtcbiAgICAgIHJldHVybiBlbXB0eU9iamVjdDtcbiAgICB9XG4gICAgdmFyIG1hc2tlZENvbnRleHQgPSB7fTtcbiAgICBmb3IgKHZhciBjb250ZXh0TmFtZSBpbiBjb250ZXh0VHlwZXMpIHtcbiAgICAgIG1hc2tlZENvbnRleHRbY29udGV4dE5hbWVdID0gY29udGV4dFtjb250ZXh0TmFtZV07XG4gICAgfVxuICAgIHJldHVybiBtYXNrZWRDb250ZXh0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBGaWx0ZXJzIHRoZSBjb250ZXh0IG9iamVjdCB0byBvbmx5IGNvbnRhaW4ga2V5cyBzcGVjaWZpZWQgaW5cbiAgICogYGNvbnRleHRUeXBlc2AsIGFuZCBhc3NlcnRzIHRoYXQgdGhleSBhcmUgdmFsaWQuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0XG4gICAqIEByZXR1cm4gez9vYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcHJvY2Vzc0NvbnRleHQ6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgdmFyIG1hc2tlZENvbnRleHQgPSB0aGlzLl9tYXNrQ29udGV4dChjb250ZXh0KTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gICAgICBpZiAoQ29tcG9uZW50LmNvbnRleHRUeXBlcykge1xuICAgICAgICB0aGlzLl9jaGVja0NvbnRleHRUeXBlcyhDb21wb25lbnQuY29udGV4dFR5cGVzLCBtYXNrZWRDb250ZXh0LCAnY29udGV4dCcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFza2VkQ29udGV4dDtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IGN1cnJlbnRDb250ZXh0XG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wcm9jZXNzQ2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoY3VycmVudENvbnRleHQpIHtcbiAgICB2YXIgQ29tcG9uZW50ID0gdGhpcy5fY3VycmVudEVsZW1lbnQudHlwZTtcbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuICAgIHZhciBjaGlsZENvbnRleHQ7XG5cbiAgICBpZiAoaW5zdC5nZXRDaGlsZENvbnRleHQpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vbkJlZ2luUHJvY2Vzc2luZ0NoaWxkQ29udGV4dCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNoaWxkQ29udGV4dCA9IGluc3QuZ2V0Q2hpbGRDb250ZXh0KCk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uRW5kUHJvY2Vzc2luZ0NoaWxkQ29udGV4dCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGlsZENvbnRleHQgPSBpbnN0LmdldENoaWxkQ29udGV4dCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGlsZENvbnRleHQpIHtcbiAgICAgICEodHlwZW9mIENvbXBvbmVudC5jaGlsZENvbnRleHRUeXBlcyA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldENoaWxkQ29udGV4dCgpOiBjaGlsZENvbnRleHRUeXBlcyBtdXN0IGJlIGRlZmluZWQgaW4gb3JkZXIgdG8gdXNlIGdldENoaWxkQ29udGV4dCgpLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogX3Byb2RJbnZhcmlhbnQoJzEwNycsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tDb250ZXh0VHlwZXMoQ29tcG9uZW50LmNoaWxkQ29udGV4dFR5cGVzLCBjaGlsZENvbnRleHQsICdjaGlsZENvbnRleHQnKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIG5hbWUgaW4gY2hpbGRDb250ZXh0KSB7XG4gICAgICAgICEobmFtZSBpbiBDb21wb25lbnQuY2hpbGRDb250ZXh0VHlwZXMpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldENoaWxkQ29udGV4dCgpOiBrZXkgXCIlc1wiIGlzIG5vdCBkZWZpbmVkIGluIGNoaWxkQ29udGV4dFR5cGVzLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzEwOCcsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcsIG5hbWUpIDogdm9pZCAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9hc3NpZ24oe30sIGN1cnJlbnRDb250ZXh0LCBjaGlsZENvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudENvbnRleHQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFzc2VydCB0aGF0IHRoZSBjb250ZXh0IHR5cGVzIGFyZSB2YWxpZFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBjb250ZXh0IGZpZWxkIHRvIGEgUmVhY3RQcm9wVHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2NoZWNrQ29udGV4dFR5cGVzOiBmdW5jdGlvbiAodHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGNoZWNrUmVhY3RUeXBlU3BlYyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIHRoaXMuZ2V0TmFtZSgpLCBudWxsLCB0aGlzLl9kZWJ1Z0lEKTtcbiAgICB9XG4gIH0sXG5cbiAgcmVjZWl2ZUNvbXBvbmVudDogZnVuY3Rpb24gKG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgbmV4dENvbnRleHQpIHtcbiAgICB2YXIgcHJldkVsZW1lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudDtcbiAgICB2YXIgcHJldkNvbnRleHQgPSB0aGlzLl9jb250ZXh0O1xuXG4gICAgdGhpcy5fcGVuZGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgdGhpcy51cGRhdGVDb21wb25lbnQodHJhbnNhY3Rpb24sIHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCwgcHJldkNvbnRleHQsIG5leHRDb250ZXh0KTtcbiAgfSxcblxuICAvKipcbiAgICogSWYgYW55IG9mIGBfcGVuZGluZ0VsZW1lbnRgLCBgX3BlbmRpbmdTdGF0ZVF1ZXVlYCwgb3IgYF9wZW5kaW5nRm9yY2VVcGRhdGVgXG4gICAqIGlzIHNldCwgdXBkYXRlIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqL1xuICBwZXJmb3JtVXBkYXRlSWZOZWNlc3Nhcnk6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xuICAgIGlmICh0aGlzLl9wZW5kaW5nRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBSZWFjdFJlY29uY2lsZXIucmVjZWl2ZUNvbXBvbmVudCh0aGlzLCB0aGlzLl9wZW5kaW5nRWxlbWVudCwgdHJhbnNhY3Rpb24sIHRoaXMuX2NvbnRleHQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcGVuZGluZ1N0YXRlUXVldWUgIT09IG51bGwgfHwgdGhpcy5fcGVuZGluZ0ZvcmNlVXBkYXRlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCh0cmFuc2FjdGlvbiwgdGhpcy5fY3VycmVudEVsZW1lbnQsIHRoaXMuX2N1cnJlbnRFbGVtZW50LCB0aGlzLl9jb250ZXh0LCB0aGlzLl9jb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdXBkYXRlQmF0Y2hOdW1iZXIgPSBudWxsO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogUGVyZm9ybSBhbiB1cGRhdGUgdG8gYSBtb3VudGVkIGNvbXBvbmVudC4gVGhlIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgYW5kXG4gICAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSBtZXRob2RzIGFyZSBjYWxsZWQsIHRoZW4gKGFzc3VtaW5nIHRoZSB1cGRhdGUgaXNuJ3RcbiAgICogc2tpcHBlZCkgdGhlIHJlbWFpbmluZyB1cGRhdGUgbGlmZWN5Y2xlIG1ldGhvZHMgYXJlIGNhbGxlZCBhbmQgdGhlIERPTVxuICAgKiByZXByZXNlbnRhdGlvbiBpcyB1cGRhdGVkLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCB0aGlzIGltcGxlbWVudHMgUmVhY3QncyByZW5kZXJpbmcgYW5kIHJlY29uY2lsaWF0aW9uIGFsZ29yaXRobS5cbiAgICogU29waGlzdGljYXRlZCBjbGllbnRzIG1heSB3aXNoIHRvIG92ZXJyaWRlIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IHByZXZQYXJlbnRFbGVtZW50XG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBuZXh0UGFyZW50RWxlbWVudFxuICAgKiBAaW50ZXJuYWxcbiAgICogQG92ZXJyaWRhYmxlXG4gICAqL1xuICB1cGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgcHJldlBhcmVudEVsZW1lbnQsIG5leHRQYXJlbnRFbGVtZW50LCBwcmV2VW5tYXNrZWRDb250ZXh0LCBuZXh0VW5tYXNrZWRDb250ZXh0KSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICAhKGluc3QgIT0gbnVsbCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnQXR0ZW1wdGVkIHRvIHVwZGF0ZSBjb21wb25lbnQgYCVzYCB0aGF0IGhhcyBhbHJlYWR5IGJlZW4gdW5tb3VudGVkIChvciBmYWlsZWQgdG8gbW91bnQpLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogX3Byb2RJbnZhcmlhbnQoJzEzNicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogdm9pZCAwO1xuXG4gICAgdmFyIHdpbGxSZWNlaXZlID0gZmFsc2U7XG4gICAgdmFyIG5leHRDb250ZXh0O1xuXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBjb250ZXh0IGhhcyBjaGFuZ2VkIG9yIG5vdFxuICAgIGlmICh0aGlzLl9jb250ZXh0ID09PSBuZXh0VW5tYXNrZWRDb250ZXh0KSB7XG4gICAgICBuZXh0Q29udGV4dCA9IGluc3QuY29udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dENvbnRleHQgPSB0aGlzLl9wcm9jZXNzQ29udGV4dChuZXh0VW5tYXNrZWRDb250ZXh0KTtcbiAgICAgIHdpbGxSZWNlaXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgcHJldlByb3BzID0gcHJldlBhcmVudEVsZW1lbnQucHJvcHM7XG4gICAgdmFyIG5leHRQcm9wcyA9IG5leHRQYXJlbnRFbGVtZW50LnByb3BzO1xuXG4gICAgLy8gTm90IGEgc2ltcGxlIHN0YXRlIHVwZGF0ZSBidXQgYSBwcm9wcyB1cGRhdGVcbiAgICBpZiAocHJldlBhcmVudEVsZW1lbnQgIT09IG5leHRQYXJlbnRFbGVtZW50KSB7XG4gICAgICB3aWxsUmVjZWl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQW4gdXBkYXRlIGhlcmUgd2lsbCBzY2hlZHVsZSBhbiB1cGRhdGUgYnV0IGltbWVkaWF0ZWx5IHNldFxuICAgIC8vIF9wZW5kaW5nU3RhdGVRdWV1ZSB3aGljaCB3aWxsIGVuc3VyZSB0aGF0IGFueSBzdGF0ZSB1cGRhdGVzIGdldHNcbiAgICAvLyBpbW1lZGlhdGVseSByZWNvbmNpbGVkIGluc3RlYWQgb2Ygd2FpdGluZyBmb3IgdGhlIG5leHQgYmF0Y2guXG4gICAgaWYgKHdpbGxSZWNlaXZlICYmIGluc3QuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcykge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgbWVhc3VyZUxpZmVDeWNsZVBlcmYoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBpbnN0LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCk7XG4gICAgICAgIH0sIHRoaXMuX2RlYnVnSUQsICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnN0LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG5leHRTdGF0ZSA9IHRoaXMuX3Byb2Nlc3NQZW5kaW5nU3RhdGUobmV4dFByb3BzLCBuZXh0Q29udGV4dCk7XG4gICAgdmFyIHNob3VsZFVwZGF0ZSA9IHRydWU7XG5cbiAgICBpZiAoIXRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZSkge1xuICAgICAgaWYgKGluc3Quc2hvdWxkQ29tcG9uZW50VXBkYXRlKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgc2hvdWxkVXBkYXRlID0gbWVhc3VyZUxpZmVDeWNsZVBlcmYoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGluc3Quc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCk7XG4gICAgICAgICAgfSwgdGhpcy5fZGVidWdJRCwgJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IGluc3Quc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9jb21wb3NpdGVUeXBlID09PSBDb21wb3NpdGVUeXBlcy5QdXJlQ2xhc3MpIHtcbiAgICAgICAgICBzaG91bGRVcGRhdGUgPSAhc2hhbGxvd0VxdWFsKHByZXZQcm9wcywgbmV4dFByb3BzKSB8fCAhc2hhbGxvd0VxdWFsKGluc3Quc3RhdGUsIG5leHRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoc2hvdWxkVXBkYXRlICE9PSB1bmRlZmluZWQsICclcy5zaG91bGRDb21wb25lbnRVcGRhdGUoKTogUmV0dXJuZWQgdW5kZWZpbmVkIGluc3RlYWQgb2YgYSAnICsgJ2Jvb2xlYW4gdmFsdWUuIE1ha2Ugc3VyZSB0byByZXR1cm4gdHJ1ZSBvciBmYWxzZS4nLCB0aGlzLmdldE5hbWUoKSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVCYXRjaE51bWJlciA9IG51bGw7XG4gICAgaWYgKHNob3VsZFVwZGF0ZSkge1xuICAgICAgdGhpcy5fcGVuZGluZ0ZvcmNlVXBkYXRlID0gZmFsc2U7XG4gICAgICAvLyBXaWxsIHNldCBgdGhpcy5wcm9wc2AsIGB0aGlzLnN0YXRlYCBhbmQgYHRoaXMuY29udGV4dGAuXG4gICAgICB0aGlzLl9wZXJmb3JtQ29tcG9uZW50VXBkYXRlKG5leHRQYXJlbnRFbGVtZW50LCBuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQsIHRyYW5zYWN0aW9uLCBuZXh0VW5tYXNrZWRDb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgaXQncyBkZXRlcm1pbmVkIHRoYXQgYSBjb21wb25lbnQgc2hvdWxkIG5vdCB1cGRhdGUsIHdlIHN0aWxsIHdhbnRcbiAgICAgIC8vIHRvIHNldCBwcm9wcyBhbmQgc3RhdGUgYnV0IHdlIHNob3J0Y3V0IHRoZSByZXN0IG9mIHRoZSB1cGRhdGUuXG4gICAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IG5leHRQYXJlbnRFbGVtZW50O1xuICAgICAgdGhpcy5fY29udGV4dCA9IG5leHRVbm1hc2tlZENvbnRleHQ7XG4gICAgICBpbnN0LnByb3BzID0gbmV4dFByb3BzO1xuICAgICAgaW5zdC5zdGF0ZSA9IG5leHRTdGF0ZTtcbiAgICAgIGluc3QuY29udGV4dCA9IG5leHRDb250ZXh0O1xuICAgIH1cbiAgfSxcblxuICBfcHJvY2Vzc1BlbmRpbmdTdGF0ZTogZnVuY3Rpb24gKHByb3BzLCBjb250ZXh0KSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICB2YXIgcXVldWUgPSB0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZTtcbiAgICB2YXIgcmVwbGFjZSA9IHRoaXMuX3BlbmRpbmdSZXBsYWNlU3RhdGU7XG4gICAgdGhpcy5fcGVuZGluZ1JlcGxhY2VTdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlID0gbnVsbDtcblxuICAgIGlmICghcXVldWUpIHtcbiAgICAgIHJldHVybiBpbnN0LnN0YXRlO1xuICAgIH1cblxuICAgIGlmIChyZXBsYWNlICYmIHF1ZXVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHF1ZXVlWzBdO1xuICAgIH1cblxuICAgIHZhciBuZXh0U3RhdGUgPSBfYXNzaWduKHt9LCByZXBsYWNlID8gcXVldWVbMF0gOiBpbnN0LnN0YXRlKTtcbiAgICBmb3IgKHZhciBpID0gcmVwbGFjZSA/IDEgOiAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwYXJ0aWFsID0gcXVldWVbaV07XG4gICAgICBfYXNzaWduKG5leHRTdGF0ZSwgdHlwZW9mIHBhcnRpYWwgPT09ICdmdW5jdGlvbicgPyBwYXJ0aWFsLmNhbGwoaW5zdCwgbmV4dFN0YXRlLCBwcm9wcywgY29udGV4dCkgOiBwYXJ0aWFsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dFN0YXRlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNZXJnZXMgbmV3IHByb3BzIGFuZCBzdGF0ZSwgbm90aWZpZXMgZGVsZWdhdGUgbWV0aG9kcyBvZiB1cGRhdGUgYW5kXG4gICAqIHBlcmZvcm1zIHVwZGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IG5leHRFbGVtZW50IE5leHQgZWxlbWVudFxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzIE5leHQgcHVibGljIG9iamVjdCB0byBzZXQgYXMgcHJvcGVydGllcy5cbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGUgTmV4dCBvYmplY3QgdG8gc2V0IGFzIHN0YXRlLlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRDb250ZXh0IE5leHQgcHVibGljIG9iamVjdCB0byBzZXQgYXMgY29udGV4dC5cbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gez9vYmplY3R9IHVubWFza2VkQ29udGV4dFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3BlcmZvcm1Db21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uIChuZXh0RWxlbWVudCwgbmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0LCB0cmFuc2FjdGlvbiwgdW5tYXNrZWRDb250ZXh0KSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuXG4gICAgdmFyIGhhc0NvbXBvbmVudERpZFVwZGF0ZSA9IEJvb2xlYW4oaW5zdC5jb21wb25lbnREaWRVcGRhdGUpO1xuICAgIHZhciBwcmV2UHJvcHM7XG4gICAgdmFyIHByZXZTdGF0ZTtcbiAgICB2YXIgcHJldkNvbnRleHQ7XG4gICAgaWYgKGhhc0NvbXBvbmVudERpZFVwZGF0ZSkge1xuICAgICAgcHJldlByb3BzID0gaW5zdC5wcm9wcztcbiAgICAgIHByZXZTdGF0ZSA9IGluc3Quc3RhdGU7XG4gICAgICBwcmV2Q29udGV4dCA9IGluc3QuY29udGV4dDtcbiAgICB9XG5cbiAgICBpZiAoaW5zdC5jb21wb25lbnRXaWxsVXBkYXRlKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBtZWFzdXJlTGlmZUN5Y2xlUGVyZihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGluc3QuY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpO1xuICAgICAgICB9LCB0aGlzLl9kZWJ1Z0lELCAnY29tcG9uZW50V2lsbFVwZGF0ZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5zdC5jb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBuZXh0RWxlbWVudDtcbiAgICB0aGlzLl9jb250ZXh0ID0gdW5tYXNrZWRDb250ZXh0O1xuICAgIGluc3QucHJvcHMgPSBuZXh0UHJvcHM7XG4gICAgaW5zdC5zdGF0ZSA9IG5leHRTdGF0ZTtcbiAgICBpbnN0LmNvbnRleHQgPSBuZXh0Q29udGV4dDtcblxuICAgIHRoaXMuX3VwZGF0ZVJlbmRlcmVkQ29tcG9uZW50KHRyYW5zYWN0aW9uLCB1bm1hc2tlZENvbnRleHQpO1xuXG4gICAgaWYgKGhhc0NvbXBvbmVudERpZFVwZGF0ZSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbWVhc3VyZUxpZmVDeWNsZVBlcmYoaW5zdC5jb21wb25lbnREaWRVcGRhdGUuYmluZChpbnN0LCBwcmV2UHJvcHMsIHByZXZTdGF0ZSwgcHJldkNvbnRleHQpLCBfdGhpczIuX2RlYnVnSUQsICdjb21wb25lbnREaWRVcGRhdGUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2FjdGlvbi5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGluc3QuY29tcG9uZW50RGlkVXBkYXRlLmJpbmQoaW5zdCwgcHJldlByb3BzLCBwcmV2U3RhdGUsIHByZXZDb250ZXh0KSwgaW5zdCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDYWxsIHRoZSBjb21wb25lbnQncyBgcmVuZGVyYCBtZXRob2QgYW5kIHVwZGF0ZSB0aGUgRE9NIGFjY29yZGluZ2x5LlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX3VwZGF0ZVJlbmRlcmVkQ29tcG9uZW50OiBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICB2YXIgcHJldkNvbXBvbmVudEluc3RhbmNlID0gdGhpcy5fcmVuZGVyZWRDb21wb25lbnQ7XG4gICAgdmFyIHByZXZSZW5kZXJlZEVsZW1lbnQgPSBwcmV2Q29tcG9uZW50SW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50O1xuICAgIHZhciBuZXh0UmVuZGVyZWRFbGVtZW50ID0gdGhpcy5fcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50KCk7XG5cbiAgICB2YXIgZGVidWdJRCA9IDA7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGRlYnVnSUQgPSB0aGlzLl9kZWJ1Z0lEO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudChwcmV2UmVuZGVyZWRFbGVtZW50LCBuZXh0UmVuZGVyZWRFbGVtZW50KSkge1xuICAgICAgUmVhY3RSZWNvbmNpbGVyLnJlY2VpdmVDb21wb25lbnQocHJldkNvbXBvbmVudEluc3RhbmNlLCBuZXh0UmVuZGVyZWRFbGVtZW50LCB0cmFuc2FjdGlvbiwgdGhpcy5fcHJvY2Vzc0NoaWxkQ29udGV4dChjb250ZXh0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBvbGRIb3N0Tm9kZSA9IFJlYWN0UmVjb25jaWxlci5nZXRIb3N0Tm9kZShwcmV2Q29tcG9uZW50SW5zdGFuY2UpO1xuICAgICAgUmVhY3RSZWNvbmNpbGVyLnVubW91bnRDb21wb25lbnQocHJldkNvbXBvbmVudEluc3RhbmNlLCBmYWxzZSk7XG5cbiAgICAgIHZhciBub2RlVHlwZSA9IFJlYWN0Tm9kZVR5cGVzLmdldFR5cGUobmV4dFJlbmRlcmVkRWxlbWVudCk7XG4gICAgICB0aGlzLl9yZW5kZXJlZE5vZGVUeXBlID0gbm9kZVR5cGU7XG4gICAgICB2YXIgY2hpbGQgPSB0aGlzLl9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KG5leHRSZW5kZXJlZEVsZW1lbnQsIG5vZGVUeXBlICE9PSBSZWFjdE5vZGVUeXBlcy5FTVBUWSAvKiBzaG91bGRIYXZlRGVidWdJRCAqL1xuICAgICAgKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50ID0gY2hpbGQ7XG5cbiAgICAgIHZhciBuZXh0TWFya3VwID0gUmVhY3RSZWNvbmNpbGVyLm1vdW50Q29tcG9uZW50KGNoaWxkLCB0cmFuc2FjdGlvbiwgdGhpcy5faG9zdFBhcmVudCwgdGhpcy5faG9zdENvbnRhaW5lckluZm8sIHRoaXMuX3Byb2Nlc3NDaGlsZENvbnRleHQoY29udGV4dCksIGRlYnVnSUQpO1xuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoZGVidWdJRCAhPT0gMCkge1xuICAgICAgICAgIHZhciBjaGlsZERlYnVnSURzID0gY2hpbGQuX2RlYnVnSUQgIT09IDAgPyBbY2hpbGQuX2RlYnVnSURdIDogW107XG4gICAgICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uU2V0Q2hpbGRyZW4oZGVidWdJRCwgY2hpbGREZWJ1Z0lEcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fcmVwbGFjZU5vZGVXaXRoTWFya3VwKG9sZEhvc3ROb2RlLCBuZXh0TWFya3VwLCBwcmV2Q29tcG9uZW50SW5zdGFuY2UpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogT3ZlcnJpZGRlbiBpbiBzaGFsbG93IHJlbmRlcmluZy5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgX3JlcGxhY2VOb2RlV2l0aE1hcmt1cDogZnVuY3Rpb24gKG9sZEhvc3ROb2RlLCBuZXh0TWFya3VwLCBwcmV2SW5zdGFuY2UpIHtcbiAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnJlcGxhY2VOb2RlV2l0aE1hcmt1cChvbGRIb3N0Tm9kZSwgbmV4dE1hcmt1cCwgcHJldkluc3RhbmNlKTtcbiAgfSxcblxuICAvKipcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudFdpdGhvdXRPd25lck9yQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG4gICAgdmFyIHJlbmRlcmVkRWxlbWVudDtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICByZW5kZXJlZEVsZW1lbnQgPSBtZWFzdXJlTGlmZUN5Y2xlUGVyZihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpbnN0LnJlbmRlcigpO1xuICAgICAgfSwgdGhpcy5fZGVidWdJRCwgJ3JlbmRlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW5kZXJlZEVsZW1lbnQgPSBpbnN0LnJlbmRlcigpO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBXZSBhbGxvdyBhdXRvLW1vY2tzIHRvIHByb2NlZWQgYXMgaWYgdGhleSdyZSByZXR1cm5pbmcgbnVsbC5cbiAgICAgIGlmIChyZW5kZXJlZEVsZW1lbnQgPT09IHVuZGVmaW5lZCAmJiBpbnN0LnJlbmRlci5faXNNb2NrRnVuY3Rpb24pIHtcbiAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgLy8gZGVwcmVjYXRpbmcgdGhpcyBjb252ZW5pZW5jZS5cbiAgICAgICAgcmVuZGVyZWRFbGVtZW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVuZGVyZWRFbGVtZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudDogZnVuY3Rpb24gKCkge1xuICAgIHZhciByZW5kZXJlZEVsZW1lbnQ7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgfHwgdGhpcy5fY29tcG9zaXRlVHlwZSAhPT0gQ29tcG9zaXRlVHlwZXMuU3RhdGVsZXNzRnVuY3Rpb25hbCkge1xuICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IHRoaXM7XG4gICAgICB0cnkge1xuICAgICAgICByZW5kZXJlZEVsZW1lbnQgPSB0aGlzLl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnRXaXRob3V0T3duZXJPckNvbnRleHQoKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZW5kZXJlZEVsZW1lbnQgPSB0aGlzLl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnRXaXRob3V0T3duZXJPckNvbnRleHQoKTtcbiAgICB9XG4gICAgIShcbiAgICAvLyBUT0RPOiBBbiBgaXNWYWxpZE5vZGVgIGZ1bmN0aW9uIHdvdWxkIHByb2JhYmx5IGJlIG1vcmUgYXBwcm9wcmlhdGVcbiAgICByZW5kZXJlZEVsZW1lbnQgPT09IG51bGwgfHwgcmVuZGVyZWRFbGVtZW50ID09PSBmYWxzZSB8fCBSZWFjdC5pc1ZhbGlkRWxlbWVudChyZW5kZXJlZEVsZW1lbnQpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclcy5yZW5kZXIoKTogQSB2YWxpZCBSZWFjdCBlbGVtZW50IChvciBudWxsKSBtdXN0IGJlIHJldHVybmVkLiBZb3UgbWF5IGhhdmUgcmV0dXJuZWQgdW5kZWZpbmVkLCBhbiBhcnJheSBvciBzb21lIG90aGVyIGludmFsaWQgb2JqZWN0LicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogX3Byb2RJbnZhcmlhbnQoJzEwOScsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogdm9pZCAwO1xuXG4gICAgcmV0dXJuIHJlbmRlcmVkRWxlbWVudDtcbiAgfSxcblxuICAvKipcbiAgICogTGF6aWx5IGFsbG9jYXRlcyB0aGUgcmVmcyBvYmplY3QgYW5kIHN0b3JlcyBgY29tcG9uZW50YCBhcyBgcmVmYC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiBSZWZlcmVuY2UgbmFtZS5cbiAgICogQHBhcmFtIHtjb21wb25lbnR9IGNvbXBvbmVudCBDb21wb25lbnQgdG8gc3RvcmUgYXMgYHJlZmAuXG4gICAqIEBmaW5hbFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXR0YWNoUmVmOiBmdW5jdGlvbiAocmVmLCBjb21wb25lbnQpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuZ2V0UHVibGljSW5zdGFuY2UoKTtcbiAgICAhKGluc3QgIT0gbnVsbCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnU3RhdGVsZXNzIGZ1bmN0aW9uIGNvbXBvbmVudHMgY2Fubm90IGhhdmUgcmVmcy4nKSA6IF9wcm9kSW52YXJpYW50KCcxMTAnKSA6IHZvaWQgMDtcbiAgICB2YXIgcHVibGljQ29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnQuZ2V0UHVibGljSW5zdGFuY2UoKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnQgJiYgY29tcG9uZW50LmdldE5hbWUgPyBjb21wb25lbnQuZ2V0TmFtZSgpIDogJ2EgY29tcG9uZW50JztcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHB1YmxpY0NvbXBvbmVudEluc3RhbmNlICE9IG51bGwgfHwgY29tcG9uZW50Ll9jb21wb3NpdGVUeXBlICE9PSBDb21wb3NpdGVUeXBlcy5TdGF0ZWxlc3NGdW5jdGlvbmFsLCAnU3RhdGVsZXNzIGZ1bmN0aW9uIGNvbXBvbmVudHMgY2Fubm90IGJlIGdpdmVuIHJlZnMgJyArICcoU2VlIHJlZiBcIiVzXCIgaW4gJXMgY3JlYXRlZCBieSAlcykuICcgKyAnQXR0ZW1wdHMgdG8gYWNjZXNzIHRoaXMgcmVmIHdpbGwgZmFpbC4nLCByZWYsIGNvbXBvbmVudE5hbWUsIHRoaXMuZ2V0TmFtZSgpKSA6IHZvaWQgMDtcbiAgICB9XG4gICAgdmFyIHJlZnMgPSBpbnN0LnJlZnMgPT09IGVtcHR5T2JqZWN0ID8gaW5zdC5yZWZzID0ge30gOiBpbnN0LnJlZnM7XG4gICAgcmVmc1tyZWZdID0gcHVibGljQ29tcG9uZW50SW5zdGFuY2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERldGFjaGVzIGEgcmVmZXJlbmNlIG5hbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgTmFtZSB0byBkZXJlZmVyZW5jZS5cbiAgICogQGZpbmFsXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZXRhY2hSZWY6IGZ1bmN0aW9uIChyZWYpIHtcbiAgICB2YXIgcmVmcyA9IHRoaXMuZ2V0UHVibGljSW5zdGFuY2UoKS5yZWZzO1xuICAgIGRlbGV0ZSByZWZzW3JlZl07XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCBhIHRleHQgZGVzY3JpcHRpb24gb2YgdGhlIGNvbXBvbmVudCB0aGF0IGNhbiBiZSB1c2VkIHRvIGlkZW50aWZ5IGl0XG4gICAqIGluIGVycm9yIG1lc3NhZ2VzLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBuYW1lIG9yIG51bGwuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZ2V0TmFtZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciB0eXBlID0gdGhpcy5fY3VycmVudEVsZW1lbnQudHlwZTtcbiAgICB2YXIgY29uc3RydWN0b3IgPSB0aGlzLl9pbnN0YW5jZSAmJiB0aGlzLl9pbnN0YW5jZS5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZSB8fCBjb25zdHJ1Y3RvciAmJiBjb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgY29uc3RydWN0b3IgJiYgY29uc3RydWN0b3IubmFtZSB8fCBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHB1YmxpY2x5IGFjY2Vzc2libGUgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBjb21wb25lbnQgLSBpLmUuIHdoYXRcbiAgICogaXMgZXhwb3NlZCBieSByZWZzIGFuZCByZXR1cm5lZCBieSByZW5kZXIuIENhbiBiZSBudWxsIGZvciBzdGF0ZWxlc3NcbiAgICogY29tcG9uZW50cy5cbiAgICpcbiAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9IHRoZSBwdWJsaWMgY29tcG9uZW50IGluc3RhbmNlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGdldFB1YmxpY0luc3RhbmNlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICBpZiAodGhpcy5fY29tcG9zaXRlVHlwZSA9PT0gQ29tcG9zaXRlVHlwZXMuU3RhdGVsZXNzRnVuY3Rpb25hbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBpbnN0O1xuICB9LFxuXG4gIC8vIFN0dWJcbiAgX2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQ6IG51bGxcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudDsiXX0=