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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var React = require('react/lib/React');
var ReactDefaultInjection = require('./ReactDefaultInjection');
var ReactCompositeComponent = require('./ReactCompositeComponent');
var ReactReconciler = require('./ReactReconciler');
var ReactUpdates = require('./ReactUpdates');

var emptyObject = require('fbjs/lib/emptyObject');
var getNextDebugID = require('./getNextDebugID');
var invariant = require('fbjs/lib/invariant');

var NoopInternalComponent = function () {
  function NoopInternalComponent(element) {
    _classCallCheck(this, NoopInternalComponent);

    this._renderedOutput = element;
    this._currentElement = element;

    if (process.env.NODE_ENV !== 'production') {
      this._debugID = getNextDebugID();
    }
  }

  NoopInternalComponent.prototype.mountComponent = function mountComponent() {};

  NoopInternalComponent.prototype.receiveComponent = function receiveComponent(element) {
    this._renderedOutput = element;
    this._currentElement = element;
  };

  NoopInternalComponent.prototype.unmountComponent = function unmountComponent() {};

  NoopInternalComponent.prototype.getHostNode = function getHostNode() {
    return undefined;
  };

  NoopInternalComponent.prototype.getPublicInstance = function getPublicInstance() {
    return null;
  };

  return NoopInternalComponent;
}();

var ShallowComponentWrapper = function ShallowComponentWrapper(element) {
  // TODO: Consolidate with instantiateReactComponent
  if (process.env.NODE_ENV !== 'production') {
    this._debugID = getNextDebugID();
  }

  this.construct(element);
};
_assign(ShallowComponentWrapper.prototype, ReactCompositeComponent, {
  _constructComponent: ReactCompositeComponent._constructComponentWithoutOwner,
  _instantiateReactComponent: function _instantiateReactComponent(element) {
    return new NoopInternalComponent(element);
  },
  _replaceNodeWithMarkup: function _replaceNodeWithMarkup() {},
  _renderValidatedComponent: ReactCompositeComponent._renderValidatedComponentWithoutOwnerOrContext
});

function _batchedRender(renderer, element, context) {
  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(true);
  renderer._render(element, transaction, context);
  ReactUpdates.ReactReconcileTransaction.release(transaction);
}

var ReactShallowRenderer = function () {
  function ReactShallowRenderer() {
    _classCallCheck(this, ReactShallowRenderer);

    this._instance = null;
  }

  ReactShallowRenderer.prototype.getMountedInstance = function getMountedInstance() {
    return this._instance ? this._instance._instance : null;
  };

  ReactShallowRenderer.prototype.render = function render(element, context) {
    // Ensure we've done the default injections. This might not be true in the
    // case of a simple test that only requires React and the TestUtils in
    // conjunction with an inline-requires transform.
    ReactDefaultInjection.inject();

    !React.isValidElement(element) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactShallowRenderer render(): Invalid component element.%s', typeof element === 'function' ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' : '') : _prodInvariant('12', typeof element === 'function' ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' : '') : void 0;
    !(typeof element.type !== 'string') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactShallowRenderer render(): Shallow rendering works only with custom components, not primitives (%s). Instead of calling `.render(el)` and inspecting the rendered output, look at `el.props` directly instead.', element.type) : _prodInvariant('13', element.type) : void 0;

    if (!context) {
      context = emptyObject;
    }
    ReactUpdates.batchedUpdates(_batchedRender, this, element, context);

    return this.getRenderOutput();
  };

  ReactShallowRenderer.prototype.getRenderOutput = function getRenderOutput() {
    return this._instance && this._instance._renderedComponent && this._instance._renderedComponent._renderedOutput || null;
  };

  ReactShallowRenderer.prototype.unmount = function unmount() {
    if (this._instance) {
      ReactReconciler.unmountComponent(this._instance, false);
    }
  };

  ReactShallowRenderer.prototype._render = function _render(element, transaction, context) {
    if (this._instance) {
      ReactReconciler.receiveComponent(this._instance, element, transaction, context);
    } else {
      var instance = new ShallowComponentWrapper(element);
      ReactReconciler.mountComponent(instance, transaction, null, null, context, 0);
      this._instance = instance;
    }
  };

  return ReactShallowRenderer;
}();

module.exports = ReactShallowRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdFNoYWxsb3dSZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJfcHJvZEludmFyaWFudCIsInJlcXVpcmUiLCJfYXNzaWduIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsIlJlYWN0IiwiUmVhY3REZWZhdWx0SW5qZWN0aW9uIiwiUmVhY3RDb21wb3NpdGVDb21wb25lbnQiLCJSZWFjdFJlY29uY2lsZXIiLCJSZWFjdFVwZGF0ZXMiLCJlbXB0eU9iamVjdCIsImdldE5leHREZWJ1Z0lEIiwiaW52YXJpYW50IiwiTm9vcEludGVybmFsQ29tcG9uZW50IiwiZWxlbWVudCIsIl9yZW5kZXJlZE91dHB1dCIsIl9jdXJyZW50RWxlbWVudCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIl9kZWJ1Z0lEIiwicHJvdG90eXBlIiwibW91bnRDb21wb25lbnQiLCJyZWNlaXZlQ29tcG9uZW50IiwidW5tb3VudENvbXBvbmVudCIsImdldEhvc3ROb2RlIiwidW5kZWZpbmVkIiwiZ2V0UHVibGljSW5zdGFuY2UiLCJTaGFsbG93Q29tcG9uZW50V3JhcHBlciIsImNvbnN0cnVjdCIsIl9jb25zdHJ1Y3RDb21wb25lbnQiLCJfY29uc3RydWN0Q29tcG9uZW50V2l0aG91dE93bmVyIiwiX2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQiLCJfcmVwbGFjZU5vZGVXaXRoTWFya3VwIiwiX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudCIsIl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnRXaXRob3V0T3duZXJPckNvbnRleHQiLCJfYmF0Y2hlZFJlbmRlciIsInJlbmRlcmVyIiwiY29udGV4dCIsInRyYW5zYWN0aW9uIiwiUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbiIsImdldFBvb2xlZCIsIl9yZW5kZXIiLCJyZWxlYXNlIiwiUmVhY3RTaGFsbG93UmVuZGVyZXIiLCJfaW5zdGFuY2UiLCJnZXRNb3VudGVkSW5zdGFuY2UiLCJyZW5kZXIiLCJpbmplY3QiLCJpc1ZhbGlkRWxlbWVudCIsInR5cGUiLCJiYXRjaGVkVXBkYXRlcyIsImdldFJlbmRlck91dHB1dCIsIl9yZW5kZXJlZENvbXBvbmVudCIsInVubW91bnQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBLElBQUlBLGlCQUFpQkMsUUFBUSxzQkFBUixDQUFyQjtBQUFBLElBQ0lDLFVBQVVELFFBQVEsZUFBUixDQURkOztBQUdBLFNBQVNFLGVBQVQsQ0FBeUJDLFFBQXpCLEVBQW1DQyxXQUFuQyxFQUFnRDtBQUFFLE1BQUksRUFBRUQsb0JBQW9CQyxXQUF0QixDQUFKLEVBQXdDO0FBQUUsVUFBTSxJQUFJQyxTQUFKLENBQWMsbUNBQWQsQ0FBTjtBQUEyRDtBQUFFOztBQUV6SixJQUFJQyxRQUFRTixRQUFRLGlCQUFSLENBQVo7QUFDQSxJQUFJTyx3QkFBd0JQLFFBQVEseUJBQVIsQ0FBNUI7QUFDQSxJQUFJUSwwQkFBMEJSLFFBQVEsMkJBQVIsQ0FBOUI7QUFDQSxJQUFJUyxrQkFBa0JULFFBQVEsbUJBQVIsQ0FBdEI7QUFDQSxJQUFJVSxlQUFlVixRQUFRLGdCQUFSLENBQW5COztBQUVBLElBQUlXLGNBQWNYLFFBQVEsc0JBQVIsQ0FBbEI7QUFDQSxJQUFJWSxpQkFBaUJaLFFBQVEsa0JBQVIsQ0FBckI7QUFDQSxJQUFJYSxZQUFZYixRQUFRLG9CQUFSLENBQWhCOztBQUVBLElBQUljLHdCQUF3QixZQUFZO0FBQ3RDLFdBQVNBLHFCQUFULENBQStCQyxPQUEvQixFQUF3QztBQUN0Q2Isb0JBQWdCLElBQWhCLEVBQXNCWSxxQkFBdEI7O0FBRUEsU0FBS0UsZUFBTCxHQUF1QkQsT0FBdkI7QUFDQSxTQUFLRSxlQUFMLEdBQXVCRixPQUF2Qjs7QUFFQSxRQUFJRyxRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMs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QWlEL0IsT0FBakQsRUFBMER5QixXQUExRCxFQUF1RUQsT0FBdkU7QUFDRCxLQUZELE1BRU87QUFDTCxVQUFJcEMsV0FBVyxJQUFJMEIsdUJBQUosQ0FBNEJkLE9BQTVCLENBQWY7QUFDQU4sc0JBQWdCYyxjQUFoQixDQUErQnBCLFFBQS9CLEVBQXlDcUMsV0FBekMsRUFBc0QsSUFBdEQsRUFBNEQsSUFBNUQsRUFBa0VELE9BQWxFLEVBQTJFLENBQTNFO0FBQ0EsV0FBS08sU0FBTCxHQUFpQjNDLFFBQWpCO0FBQ0Q7QUFDRixHQVJEOztBQVVBLFNBQU8wQyxvQkFBUDtBQUNELENBakQwQixFQUEzQjs7QUFtREFXLE9BQU9DLE9BQVAsR0FBaUJaLG9CQUFqQiIsImZpbGUiOiJSZWFjdFNoYWxsb3dSZW5kZXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50JyksXG4gICAgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0Jyk7XG52YXIgUmVhY3REZWZhdWx0SW5qZWN0aW9uID0gcmVxdWlyZSgnLi9SZWFjdERlZmF1bHRJbmplY3Rpb24nKTtcbnZhciBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKTtcbnZhciBSZWFjdFJlY29uY2lsZXIgPSByZXF1aXJlKCcuL1JlYWN0UmVjb25jaWxlcicpO1xudmFyIFJlYWN0VXBkYXRlcyA9IHJlcXVpcmUoJy4vUmVhY3RVcGRhdGVzJyk7XG5cbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgZ2V0TmV4dERlYnVnSUQgPSByZXF1aXJlKCcuL2dldE5leHREZWJ1Z0lEJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciBOb29wSW50ZXJuYWxDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE5vb3BJbnRlcm5hbENvbXBvbmVudChlbGVtZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE5vb3BJbnRlcm5hbENvbXBvbmVudCk7XG5cbiAgICB0aGlzLl9yZW5kZXJlZE91dHB1dCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHRoaXMuX2RlYnVnSUQgPSBnZXROZXh0RGVidWdJRCgpO1xuICAgIH1cbiAgfVxuXG4gIE5vb3BJbnRlcm5hbENvbXBvbmVudC5wcm90b3R5cGUubW91bnRDb21wb25lbnQgPSBmdW5jdGlvbiBtb3VudENvbXBvbmVudCgpIHt9O1xuXG4gIE5vb3BJbnRlcm5hbENvbXBvbmVudC5wcm90b3R5cGUucmVjZWl2ZUNvbXBvbmVudCA9IGZ1bmN0aW9uIHJlY2VpdmVDb21wb25lbnQoZWxlbWVudCkge1xuICAgIHRoaXMuX3JlbmRlcmVkT3V0cHV0ID0gZWxlbWVudDtcbiAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQ7XG4gIH07XG5cbiAgTm9vcEludGVybmFsQ29tcG9uZW50LnByb3RvdHlwZS51bm1vdW50Q29tcG9uZW50ID0gZnVuY3Rpb24gdW5tb3VudENvbXBvbmVudCgpIHt9O1xuXG4gIE5vb3BJbnRlcm5hbENvbXBvbmVudC5wcm90b3R5cGUuZ2V0SG9zdE5vZGUgPSBmdW5jdGlvbiBnZXRIb3N0Tm9kZSgpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9O1xuXG4gIE5vb3BJbnRlcm5hbENvbXBvbmVudC5wcm90b3R5cGUuZ2V0UHVibGljSW5zdGFuY2UgPSBmdW5jdGlvbiBnZXRQdWJsaWNJbnN0YW5jZSgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICByZXR1cm4gTm9vcEludGVybmFsQ29tcG9uZW50O1xufSgpO1xuXG52YXIgU2hhbGxvd0NvbXBvbmVudFdyYXBwZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAvLyBUT0RPOiBDb25zb2xpZGF0ZSB3aXRoIGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnRcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB0aGlzLl9kZWJ1Z0lEID0gZ2V0TmV4dERlYnVnSUQoKTtcbiAgfVxuXG4gIHRoaXMuY29uc3RydWN0KGVsZW1lbnQpO1xufTtcbl9hc3NpZ24oU2hhbGxvd0NvbXBvbmVudFdyYXBwZXIucHJvdG90eXBlLCBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCwge1xuICBfY29uc3RydWN0Q29tcG9uZW50OiBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudC5fY29uc3RydWN0Q29tcG9uZW50V2l0aG91dE93bmVyLFxuICBfaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gbmV3IE5vb3BJbnRlcm5hbENvbXBvbmVudChlbGVtZW50KTtcbiAgfSxcbiAgX3JlcGxhY2VOb2RlV2l0aE1hcmt1cDogZnVuY3Rpb24gKCkge30sXG4gIF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQ6IFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50Ll9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnRXaXRob3V0T3duZXJPckNvbnRleHRcbn0pO1xuXG5mdW5jdGlvbiBfYmF0Y2hlZFJlbmRlcihyZW5kZXJlciwgZWxlbWVudCwgY29udGV4dCkge1xuICB2YXIgdHJhbnNhY3Rpb24gPSBSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbi5nZXRQb29sZWQodHJ1ZSk7XG4gIHJlbmRlcmVyLl9yZW5kZXIoZWxlbWVudCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICBSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbi5yZWxlYXNlKHRyYW5zYWN0aW9uKTtcbn1cblxudmFyIFJlYWN0U2hhbGxvd1JlbmRlcmVyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBSZWFjdFNoYWxsb3dSZW5kZXJlcigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVhY3RTaGFsbG93UmVuZGVyZXIpO1xuXG4gICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgUmVhY3RTaGFsbG93UmVuZGVyZXIucHJvdG90eXBlLmdldE1vdW50ZWRJbnN0YW5jZSA9IGZ1bmN0aW9uIGdldE1vdW50ZWRJbnN0YW5jZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgPyB0aGlzLl9pbnN0YW5jZS5faW5zdGFuY2UgOiBudWxsO1xuICB9O1xuXG4gIFJlYWN0U2hhbGxvd1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoZWxlbWVudCwgY29udGV4dCkge1xuICAgIC8vIEVuc3VyZSB3ZSd2ZSBkb25lIHRoZSBkZWZhdWx0IGluamVjdGlvbnMuIFRoaXMgbWlnaHQgbm90IGJlIHRydWUgaW4gdGhlXG4gICAgLy8gY2FzZSBvZiBhIHNpbXBsZSB0ZXN0IHRoYXQgb25seSByZXF1aXJlcyBSZWFjdCBhbmQgdGhlIFRlc3RVdGlscyBpblxuICAgIC8vIGNvbmp1bmN0aW9uIHdpdGggYW4gaW5saW5lLXJlcXVpcmVzIHRyYW5zZm9ybS5cbiAgICBSZWFjdERlZmF1bHRJbmplY3Rpb24uaW5qZWN0KCk7XG5cbiAgICAhUmVhY3QuaXNWYWxpZEVsZW1lbnQoZWxlbWVudCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RTaGFsbG93UmVuZGVyZXIgcmVuZGVyKCk6IEludmFsaWQgY29tcG9uZW50IGVsZW1lbnQuJXMnLCB0eXBlb2YgZWxlbWVudCA9PT0gJ2Z1bmN0aW9uJyA/ICcgSW5zdGVhZCBvZiBwYXNzaW5nIGEgY29tcG9uZW50IGNsYXNzLCBtYWtlIHN1cmUgdG8gaW5zdGFudGlhdGUgJyArICdpdCBieSBwYXNzaW5nIGl0IHRvIFJlYWN0LmNyZWF0ZUVsZW1lbnQuJyA6ICcnKSA6IF9wcm9kSW52YXJpYW50KCcxMicsIHR5cGVvZiBlbGVtZW50ID09PSAnZnVuY3Rpb24nID8gJyBJbnN0ZWFkIG9mIHBhc3NpbmcgYSBjb21wb25lbnQgY2xhc3MsIG1ha2Ugc3VyZSB0byBpbnN0YW50aWF0ZSAnICsgJ2l0IGJ5IHBhc3NpbmcgaXQgdG8gUmVhY3QuY3JlYXRlRWxlbWVudC4nIDogJycpIDogdm9pZCAwO1xuICAgICEodHlwZW9mIGVsZW1lbnQudHlwZSAhPT0gJ3N0cmluZycpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0U2hhbGxvd1JlbmRlcmVyIHJlbmRlcigpOiBTaGFsbG93IHJlbmRlcmluZyB3b3JrcyBvbmx5IHdpdGggY3VzdG9tIGNvbXBvbmVudHMsIG5vdCBwcmltaXRpdmVzICglcykuIEluc3RlYWQgb2YgY2FsbGluZyBgLnJlbmRlcihlbClgIGFuZCBpbnNwZWN0aW5nIHRoZSByZW5kZXJlZCBvdXRwdXQsIGxvb2sgYXQgYGVsLnByb3BzYCBkaXJlY3RseSBpbnN0ZWFkLicsIGVsZW1lbnQudHlwZSkgOiBfcHJvZEludmFyaWFudCgnMTMnLCBlbGVtZW50LnR5cGUpIDogdm9pZCAwO1xuXG4gICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICBjb250ZXh0ID0gZW1wdHlPYmplY3Q7XG4gICAgfVxuICAgIFJlYWN0VXBkYXRlcy5iYXRjaGVkVXBkYXRlcyhfYmF0Y2hlZFJlbmRlciwgdGhpcywgZWxlbWVudCwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gdGhpcy5nZXRSZW5kZXJPdXRwdXQoKTtcbiAgfTtcblxuICBSZWFjdFNoYWxsb3dSZW5kZXJlci5wcm90b3R5cGUuZ2V0UmVuZGVyT3V0cHV0ID0gZnVuY3Rpb24gZ2V0UmVuZGVyT3V0cHV0KCkge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSAmJiB0aGlzLl9pbnN0YW5jZS5fcmVuZGVyZWRDb21wb25lbnQgJiYgdGhpcy5faW5zdGFuY2UuX3JlbmRlcmVkQ29tcG9uZW50Ll9yZW5kZXJlZE91dHB1dCB8fCBudWxsO1xuICB9O1xuXG4gIFJlYWN0U2hhbGxvd1JlbmRlcmVyLnByb3RvdHlwZS51bm1vdW50ID0gZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICBpZiAodGhpcy5faW5zdGFuY2UpIHtcbiAgICAgIFJlYWN0UmVjb25jaWxlci51bm1vdW50Q29tcG9uZW50KHRoaXMuX2luc3RhbmNlLCBmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIFJlYWN0U2hhbGxvd1JlbmRlcmVyLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gX3JlbmRlcihlbGVtZW50LCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIGlmICh0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgUmVhY3RSZWNvbmNpbGVyLnJlY2VpdmVDb21wb25lbnQodGhpcy5faW5zdGFuY2UsIGVsZW1lbnQsIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGluc3RhbmNlID0gbmV3IFNoYWxsb3dDb21wb25lbnRXcmFwcGVyKGVsZW1lbnQpO1xuICAgICAgUmVhY3RSZWNvbmNpbGVyLm1vdW50Q29tcG9uZW50KGluc3RhbmNlLCB0cmFuc2FjdGlvbiwgbnVsbCwgbnVsbCwgY29udGV4dCwgMCk7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gUmVhY3RTaGFsbG93UmVuZGVyZXI7XG59KCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RTaGFsbG93UmVuZGVyZXI7Il19