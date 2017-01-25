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

var DOMLazyTree = require('./DOMLazyTree');
var DOMProperty = require('./DOMProperty');
var React = require('react/lib/React');
var ReactBrowserEventEmitter = require('./ReactBrowserEventEmitter');
var ReactCurrentOwner = require('react/lib/ReactCurrentOwner');
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
var ReactDOMContainerInfo = require('./ReactDOMContainerInfo');
var ReactDOMFeatureFlags = require('./ReactDOMFeatureFlags');
var ReactFeatureFlags = require('./ReactFeatureFlags');
var ReactInstanceMap = require('./ReactInstanceMap');
var ReactInstrumentation = require('./ReactInstrumentation');
var ReactMarkupChecksum = require('./ReactMarkupChecksum');
var ReactReconciler = require('./ReactReconciler');
var ReactUpdateQueue = require('./ReactUpdateQueue');
var ReactUpdates = require('./ReactUpdates');

var emptyObject = require('fbjs/lib/emptyObject');
var instantiateReactComponent = require('./instantiateReactComponent');
var invariant = require('fbjs/lib/invariant');
var setInnerHTML = require('./setInnerHTML');
var shouldUpdateReactComponent = require('./shouldUpdateReactComponent');
var warning = require('fbjs/lib/warning');

var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
var ROOT_ATTR_NAME = DOMProperty.ROOT_ATTRIBUTE_NAME;

var ELEMENT_NODE_TYPE = 1;
var DOC_NODE_TYPE = 9;
var DOCUMENT_FRAGMENT_NODE_TYPE = 11;

var instancesByReactRootID = {};

/**
 * Finds the index of the first character
 * that's not common between the two given strings.
 *
 * @return {number} the index of the character where the strings diverge
 */
function firstDifferenceIndex(string1, string2) {
  var minLen = Math.min(string1.length, string2.length);
  for (var i = 0; i < minLen; i++) {
    if (string1.charAt(i) !== string2.charAt(i)) {
      return i;
    }
  }
  return string1.length === string2.length ? -1 : minLen;
}

/**
 * @param {DOMElement|DOMDocument} container DOM element that may contain
 * a React component
 * @return {?*} DOM element that may have the reactRoot ID, or null.
 */
function getReactRootElementInContainer(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === DOC_NODE_TYPE) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}

function internalGetID(node) {
  // If node is something like a window, document, or text node, none of
  // which support attributes or a .getAttribute method, gracefully return
  // the empty string, as if the attribute were missing.
  return node.getAttribute && node.getAttribute(ATTR_NAME) || '';
}

/**
 * Mounts this component and inserts it into the DOM.
 *
 * @param {ReactComponent} componentInstance The instance to mount.
 * @param {DOMElement} container DOM element to mount into.
 * @param {ReactReconcileTransaction} transaction
 * @param {boolean} shouldReuseMarkup If true, do not insert markup
 */
function mountComponentIntoNode(wrapperInstance, container, transaction, shouldReuseMarkup, context) {
  var markerName;
  if (ReactFeatureFlags.logTopLevelRenders) {
    var wrappedElement = wrapperInstance._currentElement.props.child;
    var type = wrappedElement.type;
    markerName = 'React mount: ' + (typeof type === 'string' ? type : type.displayName || type.name);
    console.time(markerName);
  }

  var markup = ReactReconciler.mountComponent(wrapperInstance, transaction, null, ReactDOMContainerInfo(wrapperInstance, container), context, 0 /* parentDebugID */
  );

  if (markerName) {
    console.timeEnd(markerName);
  }

  wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance;
  ReactMount._mountImageIntoNode(markup, container, wrapperInstance, shouldReuseMarkup, transaction);
}

/**
 * Batched mount.
 *
 * @param {ReactComponent} componentInstance The instance to mount.
 * @param {DOMElement} container DOM element to mount into.
 * @param {boolean} shouldReuseMarkup If true, do not insert markup
 */
function batchedMountComponentIntoNode(componentInstance, container, shouldReuseMarkup, context) {
  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(
  /* useCreateElement */
  !shouldReuseMarkup && ReactDOMFeatureFlags.useCreateElement);
  transaction.perform(mountComponentIntoNode, null, componentInstance, container, transaction, shouldReuseMarkup, context);
  ReactUpdates.ReactReconcileTransaction.release(transaction);
}

/**
 * Unmounts a component and removes it from the DOM.
 *
 * @param {ReactComponent} instance React component instance.
 * @param {DOMElement} container DOM element to unmount from.
 * @final
 * @internal
 * @see {ReactMount.unmountComponentAtNode}
 */
function unmountComponentFromNode(instance, container, safely) {
  if (process.env.NODE_ENV !== 'production') {
    ReactInstrumentation.debugTool.onBeginFlush();
  }
  ReactReconciler.unmountComponent(instance, safely);
  if (process.env.NODE_ENV !== 'production') {
    ReactInstrumentation.debugTool.onEndFlush();
  }

  if (container.nodeType === DOC_NODE_TYPE) {
    container = container.documentElement;
  }

  // http://jsperf.com/emptying-a-node
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}

/**
 * True if the supplied DOM node has a direct React-rendered child that is
 * not a React root element. Useful for warning in `render`,
 * `unmountComponentAtNode`, etc.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM element contains a direct child that was
 * rendered by React but is not a root element.
 * @internal
 */
function hasNonRootReactChild(container) {
  var rootEl = getReactRootElementInContainer(container);
  if (rootEl) {
    var inst = ReactDOMComponentTree.getInstanceFromNode(rootEl);
    return !!(inst && inst._hostParent);
  }
}

/**
 * True if the supplied DOM node is a React DOM element and
 * it has been rendered by another copy of React.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM has been rendered by another copy of React
 * @internal
 */
function nodeIsRenderedByOtherInstance(container) {
  var rootEl = getReactRootElementInContainer(container);
  return !!(rootEl && isReactNode(rootEl) && !ReactDOMComponentTree.getInstanceFromNode(rootEl));
}

/**
 * True if the supplied DOM node is a valid node element.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM is a valid DOM node.
 * @internal
 */
function isValidContainer(node) {
  return !!(node && (node.nodeType === ELEMENT_NODE_TYPE || node.nodeType === DOC_NODE_TYPE || node.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE));
}

/**
 * True if the supplied DOM node is a valid React node element.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM is a valid React DOM node.
 * @internal
 */
function isReactNode(node) {
  return isValidContainer(node) && (node.hasAttribute(ROOT_ATTR_NAME) || node.hasAttribute(ATTR_NAME));
}

function getHostRootInstanceInContainer(container) {
  var rootEl = getReactRootElementInContainer(container);
  var prevHostInstance = rootEl && ReactDOMComponentTree.getInstanceFromNode(rootEl);
  return prevHostInstance && !prevHostInstance._hostParent ? prevHostInstance : null;
}

function getTopLevelWrapperInContainer(container) {
  var root = getHostRootInstanceInContainer(container);
  return root ? root._hostContainerInfo._topLevelWrapper : null;
}

/**
 * Temporary (?) hack so that we can store all top-level pending updates on
 * composites instead of having to worry about different types of components
 * here.
 */
var topLevelRootCounter = 1;
var TopLevelWrapper = function TopLevelWrapper() {
  this.rootID = topLevelRootCounter++;
};
TopLevelWrapper.prototype.isReactComponent = {};
if (process.env.NODE_ENV !== 'production') {
  TopLevelWrapper.displayName = 'TopLevelWrapper';
}
TopLevelWrapper.prototype.render = function () {
  return this.props.child;
};
TopLevelWrapper.isReactTopLevelWrapper = true;

/**
 * Mounting is the process of initializing a React component by creating its
 * representative DOM elements and inserting them into a supplied `container`.
 * Any prior content inside `container` is destroyed in the process.
 *
 *   ReactMount.render(
 *     component,
 *     document.getElementById('container')
 *   );
 *
 *   <div id="container">                   <-- Supplied `container`.
 *     <div data-reactid=".3">              <-- Rendered reactRoot of React
 *       // ...                                 component.
 *     </div>
 *   </div>
 *
 * Inside of `container`, the first element rendered is the "reactRoot".
 */
var ReactMount = {

  TopLevelWrapper: TopLevelWrapper,

  /**
   * Used by devtools. The keys are not important.
   */
  _instancesByReactRootID: instancesByReactRootID,

  /**
   * This is a hook provided to support rendering React components while
   * ensuring that the apparent scroll position of its `container` does not
   * change.
   *
   * @param {DOMElement} container The `container` being rendered into.
   * @param {function} renderCallback This must be called once to do the render.
   */
  scrollMonitor: function scrollMonitor(container, renderCallback) {
    renderCallback();
  },

  /**
   * Take a component that's already mounted into the DOM and replace its props
   * @param {ReactComponent} prevComponent component instance already in the DOM
   * @param {ReactElement} nextElement component instance to render
   * @param {DOMElement} container container to render into
   * @param {?function} callback function triggered on completion
   */
  _updateRootComponent: function _updateRootComponent(prevComponent, nextElement, nextContext, container, callback) {
    ReactMount.scrollMonitor(container, function () {
      ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement, nextContext);
      if (callback) {
        ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
      }
    });

    return prevComponent;
  },

  /**
   * Render a new component into the DOM. Hooked by hooks!
   *
   * @param {ReactElement} nextElement element to render
   * @param {DOMElement} container container to render into
   * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
   * @return {ReactComponent} nextComponent
   */
  _renderNewRootComponent: function _renderNewRootComponent(nextElement, container, shouldReuseMarkup, context) {
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case.
    process.env.NODE_ENV !== 'production' ? warning(ReactCurrentOwner.current == null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : void 0;

    !isValidContainer(container) ? process.env.NODE_ENV !== 'production' ? invariant(false, '_registerComponent(...): Target container is not a DOM element.') : _prodInvariant('37') : void 0;

    ReactBrowserEventEmitter.ensureScrollValueMonitoring();
    var componentInstance = instantiateReactComponent(nextElement, false);

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.

    ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, container, shouldReuseMarkup, context);

    var wrapperID = componentInstance._instance.rootID;
    instancesByReactRootID[wrapperID] = componentInstance;

    return componentInstance;
  },

  /**
   * Renders a React component into the DOM in the supplied `container`.
   *
   * If the React component was previously rendered into `container`, this will
   * perform an update on it and only mutate the DOM as necessary to reflect the
   * latest React component.
   *
   * @param {ReactComponent} parentComponent The conceptual parent of this render tree.
   * @param {ReactElement} nextElement Component element to render.
   * @param {DOMElement} container DOM element to render into.
   * @param {?function} callback function triggered on completion
   * @return {ReactComponent} Component instance rendered in `container`.
   */
  renderSubtreeIntoContainer: function renderSubtreeIntoContainer(parentComponent, nextElement, container, callback) {
    !(parentComponent != null && ReactInstanceMap.has(parentComponent)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'parentComponent must be a valid React Component') : _prodInvariant('38') : void 0;
    return ReactMount._renderSubtreeIntoContainer(parentComponent, nextElement, container, callback);
  },

  _renderSubtreeIntoContainer: function _renderSubtreeIntoContainer(parentComponent, nextElement, container, callback) {
    ReactUpdateQueue.validateCallback(callback, 'ReactDOM.render');
    !React.isValidElement(nextElement) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactDOM.render(): Invalid component element.%s', typeof nextElement === 'string' ? ' Instead of passing a string like \'div\', pass ' + 'React.createElement(\'div\') or <div />.' : typeof nextElement === 'function' ? ' Instead of passing a class like Foo, pass ' + 'React.createElement(Foo) or <Foo />.' :
    // Check if it quacks like an element
    nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : _prodInvariant('39', typeof nextElement === 'string' ? ' Instead of passing a string like \'div\', pass ' + 'React.createElement(\'div\') or <div />.' : typeof nextElement === 'function' ? ' Instead of passing a class like Foo, pass ' + 'React.createElement(Foo) or <Foo />.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : void 0;

    process.env.NODE_ENV !== 'production' ? warning(!container || !container.tagName || container.tagName.toUpperCase() !== 'BODY', 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.') : void 0;

    var nextWrappedElement = React.createElement(TopLevelWrapper, { child: nextElement });

    var nextContext;
    if (parentComponent) {
      var parentInst = ReactInstanceMap.get(parentComponent);
      nextContext = parentInst._processChildContext(parentInst._context);
    } else {
      nextContext = emptyObject;
    }

    var prevComponent = getTopLevelWrapperInContainer(container);

    if (prevComponent) {
      var prevWrappedElement = prevComponent._currentElement;
      var prevElement = prevWrappedElement.props.child;
      if (shouldUpdateReactComponent(prevElement, nextElement)) {
        var publicInst = prevComponent._renderedComponent.getPublicInstance();
        var updatedCallback = callback && function () {
          callback.call(publicInst);
        };
        ReactMount._updateRootComponent(prevComponent, nextWrappedElement, nextContext, container, updatedCallback);
        return publicInst;
      } else {
        ReactMount.unmountComponentAtNode(container);
      }
    }

    var reactRootElement = getReactRootElementInContainer(container);
    var containerHasReactMarkup = reactRootElement && !!internalGetID(reactRootElement);
    var containerHasNonRootReactChild = hasNonRootReactChild(container);

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!containerHasNonRootReactChild, 'render(...): Replacing React-rendered children with a new root ' + 'component. If you intended to update the children of this node, ' + 'you should instead have the existing children update their state ' + 'and render the new components instead of calling ReactDOM.render.') : void 0;

      if (!containerHasReactMarkup || reactRootElement.nextSibling) {
        var rootElementSibling = reactRootElement;
        while (rootElementSibling) {
          if (internalGetID(rootElementSibling)) {
            process.env.NODE_ENV !== 'production' ? warning(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.') : void 0;
            break;
          }
          rootElementSibling = rootElementSibling.nextSibling;
        }
      }
    }

    var shouldReuseMarkup = containerHasReactMarkup && !prevComponent && !containerHasNonRootReactChild;
    var component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, nextContext)._renderedComponent.getPublicInstance();
    if (callback) {
      callback.call(component);
    }
    return component;
  },

  /**
   * Renders a React component into the DOM in the supplied `container`.
   * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.render
   *
   * If the React component was previously rendered into `container`, this will
   * perform an update on it and only mutate the DOM as necessary to reflect the
   * latest React component.
   *
   * @param {ReactElement} nextElement Component element to render.
   * @param {DOMElement} container DOM element to render into.
   * @param {?function} callback function triggered on completion
   * @return {ReactComponent} Component instance rendered in `container`.
   */
  render: function render(nextElement, container, callback) {
    return ReactMount._renderSubtreeIntoContainer(null, nextElement, container, callback);
  },

  /**
   * Unmounts and destroys the React component rendered in the `container`.
   * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.unmountcomponentatnode
   *
   * @param {DOMElement} container DOM element containing a React component.
   * @return {boolean} True if a component was found in and unmounted from
   *                   `container`
   */
  unmountComponentAtNode: function unmountComponentAtNode(container) {
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case. (Strictly speaking, unmounting won't cause a
    // render but we still don't expect to be in a render call here.)
    process.env.NODE_ENV !== 'production' ? warning(ReactCurrentOwner.current == null, 'unmountComponentAtNode(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from render ' + 'is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : void 0;

    !isValidContainer(container) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : _prodInvariant('40') : void 0;

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!nodeIsRenderedByOtherInstance(container), 'unmountComponentAtNode(): The node you\'re attempting to unmount ' + 'was rendered by another copy of React.') : void 0;
    }

    var prevComponent = getTopLevelWrapperInContainer(container);
    if (!prevComponent) {
      // Check if the node being unmounted was rendered by React, but isn't a
      // root node.
      var containerHasNonRootReactChild = hasNonRootReactChild(container);

      // Check if the container itself is a React root node.
      var isContainerReactRoot = container.nodeType === 1 && container.hasAttribute(ROOT_ATTR_NAME);

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(!containerHasNonRootReactChild, 'unmountComponentAtNode(): The node you\'re attempting to unmount ' + 'was rendered by React and is not a top-level container. %s', isContainerReactRoot ? 'You may have accidentally passed in a React root node instead ' + 'of its container.' : 'Instead, have the parent component update its state and ' + 'rerender in order to remove this component.') : void 0;
      }

      return false;
    }
    delete instancesByReactRootID[prevComponent._instance.rootID];
    ReactUpdates.batchedUpdates(unmountComponentFromNode, prevComponent, container, false);
    return true;
  },

  _mountImageIntoNode: function _mountImageIntoNode(markup, container, instance, shouldReuseMarkup, transaction) {
    !isValidContainer(container) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mountComponentIntoNode(...): Target container is not valid.') : _prodInvariant('41') : void 0;

    if (shouldReuseMarkup) {
      var rootElement = getReactRootElementInContainer(container);
      if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
        ReactDOMComponentTree.precacheNode(instance, rootElement);
        return;
      } else {
        var checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
        rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);

        var rootMarkup = rootElement.outerHTML;
        rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);

        var normalizedMarkup = markup;
        if (process.env.NODE_ENV !== 'production') {
          // because rootMarkup is retrieved from the DOM, various normalizations
          // will have occurred which will not be present in `markup`. Here,
          // insert markup into a <div> or <iframe> depending on the container
          // type to perform the same normalizations before comparing.
          var normalizer;
          if (container.nodeType === ELEMENT_NODE_TYPE) {
            normalizer = document.createElement('div');
            normalizer.innerHTML = markup;
            normalizedMarkup = normalizer.innerHTML;
          } else {
            normalizer = document.createElement('iframe');
            document.body.appendChild(normalizer);
            normalizer.contentDocument.write(markup);
            normalizedMarkup = normalizer.contentDocument.documentElement.outerHTML;
            document.body.removeChild(normalizer);
          }
        }

        var diffIndex = firstDifferenceIndex(normalizedMarkup, rootMarkup);
        var difference = ' (client) ' + normalizedMarkup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);

        !(container.nodeType !== DOC_NODE_TYPE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'You\'re trying to render a component to the document using server rendering but the checksum was invalid. This usually means you rendered a different component type or props on the client from the one on the server, or your render() methods are impure. React cannot handle this case due to cross-browser quirks by rendering at the document root. You should look for environment dependent code in your components and ensure the props are the same client and server side:\n%s', difference) : _prodInvariant('42', difference) : void 0;

        if (process.env.NODE_ENV !== 'production') {
          process.env.NODE_ENV !== 'production' ? warning(false, 'React attempted to reuse markup in a container but the ' + 'checksum was invalid. This generally means that you are ' + 'using server rendering and the markup generated on the ' + 'server was not what the client was expecting. React injected ' + 'new markup to compensate which works but you have lost many ' + 'of the benefits of server rendering. Instead, figure out ' + 'why the markup being generated is different on the client ' + 'or server:\n%s', difference) : void 0;
        }
      }
    }

    !(container.nodeType !== DOC_NODE_TYPE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'You\'re trying to render a component to the document but you didn\'t use server rendering. We can\'t do this without using server rendering due to cross-browser quirks. See ReactDOMServer.renderToString() for server rendering.') : _prodInvariant('43') : void 0;

    if (transaction.useCreateElement) {
      while (container.lastChild) {
        container.removeChild(container.lastChild);
      }
      DOMLazyTree.insertTreeBefore(container, markup, null);
    } else {
      setInnerHTML(container, markup);
      ReactDOMComponentTree.precacheNode(instance, container.firstChild);
    }

    if (process.env.NODE_ENV !== 'production') {
      var hostNode = ReactDOMComponentTree.getInstanceFromNode(container.firstChild);
      if (hostNode._debugID !== 0) {
        ReactInstrumentation.debugTool.onHostOperation({
          instanceID: hostNode._debugID,
          type: 'mount',
          payload: markup.toString()
        });
      }
    }
  }
};

module.exports = ReactMount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdE1vdW50LmpzIl0sIm5hbWVzIjpbIl9wcm9kSW52YXJpYW50IiwicmVxdWlyZSIsIkRPTUxhenlUcmVlIiwiRE9NUHJvcGVydHkiLCJSZWFjdCIsIlJlYWN0QnJvd3NlckV2ZW50RW1pdHRlciIsIlJlYWN0Q3VycmVudE93bmVyIiwiUmVhY3RET01Db21wb25lbnRUcmVlIiwiUmVhY3RET01Db250YWluZXJJbmZvIiwiUmVhY3RET01GZWF0dXJlRmxhZ3MiLCJSZWFjdEZlYXR1cmVGbGFncyIsIlJlYWN0SW5zdGFuY2VNYXAiLCJSZWFjdEluc3RydW1lbnRhdGlvbiIsIlJlYWN0TWFya3VwQ2hlY2tzdW0iLCJSZWFjdFJlY29uY2lsZXIiLCJSZWFjdFVwZGF0ZVF1ZXVlIiwiUmVhY3RVcGRhdGVzIiwiZW1wdHlPYmplY3QiLCJpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50IiwiaW52YXJpYW50Iiwic2V0SW5uZXJIVE1MIiwic2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQiLCJ3YXJuaW5nIiwiQVRUUl9OQU1FIiwiSURfQVRUUklCVVRFX05BTUUiLCJST09UX0FUVFJfTkFNRSIsIlJPT1RfQVRUUklCVVRFX05BTUUiLCJFTEVNRU5UX05PREVfVFlQRSIsIkRPQ19OT0RFX1RZUEUiLCJET0NVTUVOVF9GUkFHTUVOVF9OT0RFX1RZUEUiLCJpbnN0YW5jZXNCeVJlYWN0Um9vdElEIiwiZmlyc3REaWZmZXJlbmNlSW5kZXgiLCJzdHJpbmcxIiwic3RyaW5nMiIsIm1pbkxlbiIsIk1hdGgiLCJtaW4iLCJsZW5ndGgiLCJpIiwiY2hhckF0IiwiZ2V0UmVhY3RSb290RWxlbWVudEluQ29udGFpbmVyIiwiY29udGFpbmVyIiwibm9kZVR5cGUiLCJkb2N1bWVudEVsZW1lbnQiLCJmaXJzdENoaWxkIiwiaW50ZXJuYWxHZXRJRCIsIm5vZGUiLCJnZXRBdHRyaWJ1dGUiLCJtb3VudENvbXBvbmVudEludG9Ob2RlIiwid3JhcHBlckluc3RhbmNlIiwidHJhbnNhY3Rpb24iLCJzaG91bGRSZXVzZU1hcmt1cCIsImNvbnRleHQiLCJtYXJrZXJOYW1lIiwibG9nVG9wTGV2ZWxSZW5kZXJzIiwid3JhcHBlZEVsZW1lbnQiLCJfY3VycmVudEVsZW1lbnQiLCJwcm9wcyIsImNoaWxkIiwidHlwZSIsImRpc3BsYXlOYW1lIiwibmFtZSIsImNvbnNvbGUiLCJ0aW1lIiwibWFya3VwIiwibW91bnRDb21wb25lbnQiLCJ0aW1lRW5kIiwiX3JlbmRlcmVkQ29tcG9uZW50IiwiX3RvcExldmVsV3JhcHBlciIsIlJlYWN0TW91bnQiLCJfbW91bnRJbWFnZUludG9Ob2RlIiwiYmF0Y2hlZE1vdW50Q29tcG9uZW50SW50b05vZGUiLCJjb21wb25lbnRJbnN0YW5jZSIsIlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24iLCJnZXRQb29sZWQiLCJ1c2VDcmVhdGVFbGVtZW50IiwicGVyZm9ybSIsInJlbGVhc2UiLCJ1bm1vdW50Q29tcG9uZW50RnJvbU5vZGUiLCJpbnN0YW5jZSIsInNhZmVseSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImRlYnVnVG9vbCIsIm9uQmVnaW5GbHVzaCIsInVubW91bnRDb21wb25lbnQiLCJvbkVuZEZsdXNoIiwibGFzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJoYXNOb25Sb290UmVhY3RDaGlsZCIsInJvb3RFbCIsImluc3QiLCJnZXRJbnN0YW5jZUZyb21Ob2RlIiwiX2hvc3RQYXJlbnQiLCJub2RlSXNSZW5kZXJlZEJ5T3RoZXJJbnN0YW5jZSIsImlzUmVhY3ROb2RlIiwiaXNWYWxpZENvbnRhaW5lciIsImhhc0F0dHJpYnV0ZSIsImdldEhvc3RSb290SW5zdGFuY2VJbkNvbnRhaW5lciIsInByZXZIb3N0SW5zdGFuY2UiLCJnZXRUb3BMZXZlbFdyYXBwZXJJbkNvbnRhaW5lciIsInJvb3QiLCJfaG9zdENvbnRhaW5lckluZm8iLCJ0b3BMZXZlbFJvb3RDb3VudGVyIiwiVG9wTGV2ZWxXcmFwcGVyIiwicm9vdElEIiwicHJvdG90eXBlIiwiaXNSZWFjdENvbXBvbmVudCIsInJlbmRlciIsImlzUmVhY3RUb3BMZXZlbFdyYXBwZXIiLCJfaW5zdGFuY2VzQnlSZWFjdFJvb3RJRCIsInNjcm9sbE1vbml0b3IiLCJyZW5kZXJDYWxsYmFjayIsIl91cGRhdGVSb290Q29tcG9uZW50IiwicHJldkNvbXBvbmVudCIsIm5leHRFbGVtZW50IiwibmV4dENvbnRleHQiLCJjYWxsYmFjayIsImVucXVldWVFbGVtZW50SW50ZXJuYWwiLCJlbnF1ZXVlQ2FsbGJhY2tJbnRlcm5hbCIsIl9yZW5kZXJOZXdSb290Q29tcG9uZW50IiwiY3VycmVudCIsImdldE5hbWUiLCJlbnN1cmVTY3JvbGxWYWx1ZU1vbml0b3JpbmciLCJiYXRjaGVkVXBkYXRlcyIsIndyYXBwZXJJRCIsIl9pbnN0YW5jZSIsInJlbmRlclN1YnRyZWVJbnRvQ29udGFpbmVyIiwicGFyZW50Q29tcG9uZW50IiwiaGFzIiwiX3JlbmRlclN1YnRyZWVJbnRvQ29udGFpbmVyIiwidmFsaWRhdGVDYWxsYmFjayIsImlzVmFsaWRFbGVtZW50IiwidW5kZWZpbmVkIiwidGFnTmFtZSIsInRvVXBwZXJDYXNlIiwibmV4dFdyYXBwZWRFbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsInBhcmVudEluc3QiLCJnZXQiLCJfcHJvY2Vzc0NoaWxkQ29udGV4dCIsIl9jb250ZXh0IiwicHJldldyYXBwZWRFbGVtZW50IiwicHJldkVsZW1lbnQiLCJwdWJsaWNJbnN0IiwiZ2V0UHVibGljSW5zdGFuY2UiLCJ1cGRhdGVkQ2FsbGJhY2siLCJjYWxsIiwidW5tb3VudENvbXBvbmVudEF0Tm9kZSIsInJlYWN0Um9vdEVsZW1lbnQiLCJjb250YWluZXJIYXNSZWFjdE1hcmt1cCIsImNvbnRhaW5lckhhc05vblJvb3RSZWFjdENoaWxkIiwibmV4dFNpYmxpbmciLCJyb290RWxlbWVudFNpYmxpbmciLCJjb21wb25lbnQiLCJpc0NvbnRhaW5lclJlYWN0Um9vdCIsInJvb3RFbGVtZW50IiwiY2FuUmV1c2VNYXJrdXAiLCJwcmVjYWNoZU5vZGUiLCJjaGVja3N1bSIsIkNIRUNLU1VNX0FUVFJfTkFNRSIsInJlbW92ZUF0dHJpYnV0ZSIsInJvb3RNYXJrdXAiLCJvdXRlckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJub3JtYWxpemVkTWFya3VwIiwibm9ybWFsaXplciIsImRvY3VtZW50IiwiaW5uZXJIVE1MIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY29udGVudERvY3VtZW50Iiwid3JpdGUiLCJkaWZmSW5kZXgiLCJkaWZmZXJlbmNlIiwic3Vic3RyaW5nIiwiaW5zZXJ0VHJlZUJlZm9yZSIsImhvc3ROb2RlIiwiX2RlYnVnSUQiLCJvbkhvc3RPcGVyYXRpb24iLCJpbnN0YW5jZUlEIiwicGF5bG9hZCIsInRvU3RyaW5nIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxJQUFJQSxpQkFBaUJDLFFBQVEsc0JBQVIsQ0FBckI7O0FBRUEsSUFBSUMsY0FBY0QsUUFBUSxlQUFSLENBQWxCO0FBQ0EsSUFBSUUsY0FBY0YsUUFBUSxlQUFSLENBQWxCO0FBQ0EsSUFBSUcsUUFBUUgsUUFBUSxpQkFBUixDQUFaO0FBQ0EsSUFBSUksMkJBQTJCSixRQUFRLDRCQUFSLENBQS9CO0FBQ0EsSUFBSUssb0JBQW9CTCxRQUFRLDZCQUFSLENBQXhCO0FBQ0EsSUFBSU0sd0JBQXdCTixRQUFRLHlCQUFSLENBQTVCO0FBQ0EsSUFBSU8sd0JBQXdCUCxRQUFRLHlCQUFSLENBQTVCO0FBQ0EsSUFBSVEsdUJBQXVCUixRQUFRLHdCQUFSLENBQTNCO0FBQ0EsSUFBSVMsb0JBQW9CVCxRQUFRLHFCQUFSLENBQXhCO0FBQ0EsSUFBSVUsbUJBQW1CVixRQUFRLG9CQUFSLENBQXZCO0FBQ0EsSUFBSVcsdUJBQXVCWCxRQUFRLHdCQUFSLENBQTNCO0FBQ0EsSUFBSVksc0JBQXNCWixRQUFRLHVCQUFSLENBQTFCO0FBQ0EsSUFBSWEsa0JBQWtC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VSxLQUFWLEVBQWlCLG9PQUFqQixDQUF4QyxHQUFpU25CLGVBQWUsSUFBZixDQUEzVSxHQUFrVyxLQUFLLENBQXZXOztBQUVBLFFBQUlrRCxZQUFZeUIsZ0JBQWhCLEVBQWtDO0FBQ2hDLGFBQU9sQyxVQUFVK0MsU0FBakIsRUFBNEI7QUFDMUIvQyxrQkFBVWdELFdBQVYsQ0FBc0JoRCxVQUFVK0MsU0FBaEM7QUFDRDtBQUNEdEYsa0JBQVkrSyxnQkFBWixDQUE2QnhJLFNBQTdCLEVBQXdDdUIsTUFBeEMsRUFBZ0QsSUFBaEQ7QUFDRCxLQUxELE1BS087QUFDTDVDLG1CQUFhcUIsU0FBYixFQUF3QnVCLE1BQXhCO0FBQ0F6RCw0QkFBc0J3SixZQUF0QixDQUFtQ2hGLFFBQW5DLEVBQTZDdEMsVUFBVUcsVUFBdkQ7QUFDRDs7QUFFRCxRQUFJcUMsUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDLFVBQUkrRixXQUFXM0ssc0JBQXNCc0YsbUJBQXRCLENBQTBDcEQsVUFBVUcsVUFBcEQsQ0FBZjtBQUNBLFVBQUlzSSxTQUFTQyxRQUFULEtBQXNCLENBQTFCLEVBQTZCO0FBQzNCdkssNkJBQXFCd0UsU0FBckIsQ0FBK0JnRyxlQUEvQixDQUErQztBQUM3Q0Msc0JBQVlILFNBQVNDLFFBRHdCO0FBRTdDeEgsZ0JBQU0sT0FGdUM7QUFHN0MySCxtQkFBU3RILE9BQU91SCxRQUFQO0FBSG9DLFNBQS9DO0FBS0Q7QUFDRjtBQUNGO0FBcFJjLENBQWpCOztBQXVSQUMsT0FBT0MsT0FBUCxHQUFpQnBILFVBQWpCIiwiZmlsZSI6IlJlYWN0TW91bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgRE9NTGF6eVRyZWUgPSByZXF1aXJlKCcuL0RPTUxhenlUcmVlJyk7XG52YXIgRE9NUHJvcGVydHkgPSByZXF1aXJlKCcuL0RPTVByb3BlcnR5Jyk7XG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3QnKTtcbnZhciBSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuL1JlYWN0QnJvd3NlckV2ZW50RW1pdHRlcicpO1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RET01Db21wb25lbnRUcmVlID0gcmVxdWlyZSgnLi9SZWFjdERPTUNvbXBvbmVudFRyZWUnKTtcbnZhciBSZWFjdERPTUNvbnRhaW5lckluZm8gPSByZXF1aXJlKCcuL1JlYWN0RE9NQ29udGFpbmVySW5mbycpO1xudmFyIFJlYWN0RE9NRmVhdHVyZUZsYWdzID0gcmVxdWlyZSgnLi9SZWFjdERPTUZlYXR1cmVGbGFncycpO1xudmFyIFJlYWN0RmVhdHVyZUZsYWdzID0gcmVxdWlyZSgnLi9SZWFjdEZlYXR1cmVGbGFncycpO1xudmFyIFJlYWN0SW5zdGFuY2VNYXAgPSByZXF1aXJlKCcuL1JlYWN0SW5zdGFuY2VNYXAnKTtcbnZhciBSZWFjdEluc3RydW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vUmVhY3RJbnN0cnVtZW50YXRpb24nKTtcbnZhciBSZWFjdE1hcmt1cENoZWNrc3VtID0gcmVxdWlyZSgnLi9SZWFjdE1hcmt1cENoZWNrc3VtJyk7XG52YXIgUmVhY3RSZWNvbmNpbGVyID0gcmVxdWlyZSgnLi9SZWFjdFJlY29uY2lsZXInKTtcbnZhciBSZWFjdFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdFVwZGF0ZVF1ZXVlJyk7XG52YXIgUmVhY3RVcGRhdGVzID0gcmVxdWlyZSgnLi9SZWFjdFVwZGF0ZXMnKTtcblxudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcbnZhciBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50Jyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgc2V0SW5uZXJIVE1MID0gcmVxdWlyZSgnLi9zZXRJbm5lckhUTUwnKTtcbnZhciBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgQVRUUl9OQU1FID0gRE9NUHJvcGVydHkuSURfQVRUUklCVVRFX05BTUU7XG52YXIgUk9PVF9BVFRSX05BTUUgPSBET01Qcm9wZXJ0eS5ST09UX0FUVFJJQlVURV9OQU1FO1xuXG52YXIgRUxFTUVOVF9OT0RFX1RZUEUgPSAxO1xudmFyIERPQ19OT0RFX1RZUEUgPSA5O1xudmFyIERPQ1VNRU5UX0ZSQUdNRU5UX05PREVfVFlQRSA9IDExO1xuXG52YXIgaW5zdGFuY2VzQnlSZWFjdFJvb3RJRCA9IHt9O1xuXG4vKipcbiAqIEZpbmRzIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgY2hhcmFjdGVyXG4gKiB0aGF0J3Mgbm90IGNvbW1vbiBiZXR3ZWVuIHRoZSB0d28gZ2l2ZW4gc3RyaW5ncy5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBpbmRleCBvZiB0aGUgY2hhcmFjdGVyIHdoZXJlIHRoZSBzdHJpbmdzIGRpdmVyZ2VcbiAqL1xuZnVuY3Rpb24gZmlyc3REaWZmZXJlbmNlSW5kZXgoc3RyaW5nMSwgc3RyaW5nMikge1xuICB2YXIgbWluTGVuID0gTWF0aC5taW4oc3RyaW5nMS5sZW5ndGgsIHN0cmluZzIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaW5MZW47IGkrKykge1xuICAgIGlmIChzdHJpbmcxLmNoYXJBdChpKSAhPT0gc3RyaW5nMi5jaGFyQXQoaSkpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyaW5nMS5sZW5ndGggPT09IHN0cmluZzIubGVuZ3RoID8gLTEgOiBtaW5MZW47XG59XG5cbi8qKlxuICogQHBhcmFtIHtET01FbGVtZW50fERPTURvY3VtZW50fSBjb250YWluZXIgRE9NIGVsZW1lbnQgdGhhdCBtYXkgY29udGFpblxuICogYSBSZWFjdCBjb21wb25lbnRcbiAqIEByZXR1cm4gez8qfSBET00gZWxlbWVudCB0aGF0IG1heSBoYXZlIHRoZSByZWFjdFJvb3QgSUQsIG9yIG51bGwuXG4gKi9cbmZ1bmN0aW9uIGdldFJlYWN0Um9vdEVsZW1lbnRJbkNvbnRhaW5lcihjb250YWluZXIpIHtcbiAgaWYgKCFjb250YWluZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChjb250YWluZXIubm9kZVR5cGUgPT09IERPQ19OT0RFX1RZUEUpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmRvY3VtZW50RWxlbWVudDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmZpcnN0Q2hpbGQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW50ZXJuYWxHZXRJRChub2RlKSB7XG4gIC8vIElmIG5vZGUgaXMgc29tZXRoaW5nIGxpa2UgYSB3aW5kb3csIGRvY3VtZW50LCBvciB0ZXh0IG5vZGUsIG5vbmUgb2ZcbiAgLy8gd2hpY2ggc3VwcG9ydCBhdHRyaWJ1dGVzIG9yIGEgLmdldEF0dHJpYnV0ZSBtZXRob2QsIGdyYWNlZnVsbHkgcmV0dXJuXG4gIC8vIHRoZSBlbXB0eSBzdHJpbmcsIGFzIGlmIHRoZSBhdHRyaWJ1dGUgd2VyZSBtaXNzaW5nLlxuICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoQVRUUl9OQU1FKSB8fCAnJztcbn1cblxuLyoqXG4gKiBNb3VudHMgdGhpcyBjb21wb25lbnQgYW5kIGluc2VydHMgaXQgaW50byB0aGUgRE9NLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNvbXBvbmVudEluc3RhbmNlIFRoZSBpbnN0YW5jZSB0byBtb3VudC5cbiAqIEBwYXJhbSB7RE9NRWxlbWVudH0gY29udGFpbmVyIERPTSBlbGVtZW50IHRvIG1vdW50IGludG8uXG4gKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZFJldXNlTWFya3VwIElmIHRydWUsIGRvIG5vdCBpbnNlcnQgbWFya3VwXG4gKi9cbmZ1bmN0aW9uIG1vdW50Q29tcG9uZW50SW50b05vZGUod3JhcHBlckluc3RhbmNlLCBjb250YWluZXIsIHRyYW5zYWN0aW9uLCBzaG91bGRSZXVzZU1hcmt1cCwgY29udGV4dCkge1xuICB2YXIgbWFya2VyTmFtZTtcbiAgaWYgKFJlYWN0RmVhdHVyZUZsYWdzLmxvZ1RvcExldmVsUmVuZGVycykge1xuICAgIHZhciB3cmFwcGVkRWxlbWVudCA9IHdyYXBwZXJJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQucHJvcHMuY2hpbGQ7XG4gICAgdmFyIHR5cGUgPSB3cmFwcGVkRWxlbWVudC50eXBlO1xuICAgIG1hcmtlck5hbWUgPSAnUmVhY3QgbW91bnQ6ICcgKyAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gdHlwZSA6IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lKTtcbiAgICBjb25zb2xlLnRpbWUobWFya2VyTmFtZSk7XG4gIH1cblxuICB2YXIgbWFya3VwID0gUmVhY3RSZWNvbmNpbGVyLm1vdW50Q29tcG9uZW50KHdyYXBwZXJJbnN0YW5jZSwgdHJhbnNhY3Rpb24sIG51bGwsIFJlYWN0RE9NQ29udGFpbmVySW5mbyh3cmFwcGVySW5zdGFuY2UsIGNvbnRhaW5lciksIGNvbnRleHQsIDAgLyogcGFyZW50RGVidWdJRCAqL1xuICApO1xuXG4gIGlmIChtYXJrZXJOYW1lKSB7XG4gICAgY29uc29sZS50aW1lRW5kKG1hcmtlck5hbWUpO1xuICB9XG5cbiAgd3JhcHBlckluc3RhbmNlLl9yZW5kZXJlZENvbXBvbmVudC5fdG9wTGV2ZWxXcmFwcGVyID0gd3JhcHBlckluc3RhbmNlO1xuICBSZWFjdE1vdW50Ll9tb3VudEltYWdlSW50b05vZGUobWFya3VwLCBjb250YWluZXIsIHdyYXBwZXJJbnN0YW5jZSwgc2hvdWxkUmV1c2VNYXJrdXAsIHRyYW5zYWN0aW9uKTtcbn1cblxuLyoqXG4gKiBCYXRjaGVkIG1vdW50LlxuICpcbiAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNvbXBvbmVudEluc3RhbmNlIFRoZSBpbnN0YW5jZSB0byBtb3VudC5cbiAqIEBwYXJhbSB7RE9NRWxlbWVudH0gY29udGFpbmVyIERPTSBlbGVtZW50IHRvIG1vdW50IGludG8uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZFJldXNlTWFya3VwIElmIHRydWUsIGRvIG5vdCBpbnNlcnQgbWFya3VwXG4gKi9cbmZ1bmN0aW9uIGJhdGNoZWRNb3VudENvbXBvbmVudEludG9Ob2RlKGNvbXBvbmVudEluc3RhbmNlLCBjb250YWluZXIsIHNob3VsZFJldXNlTWFya3VwLCBjb250ZXh0KSB7XG4gIHZhciB0cmFuc2FjdGlvbiA9IFJlYWN0VXBkYXRlcy5SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uLmdldFBvb2xlZChcbiAgLyogdXNlQ3JlYXRlRWxlbWVudCAqL1xuICAhc2hvdWxkUmV1c2VNYXJrdXAgJiYgUmVhY3RET01GZWF0dXJlRmxhZ3MudXNlQ3JlYXRlRWxlbWVudCk7XG4gIHRyYW5zYWN0aW9uLnBlcmZvcm0obW91bnRDb21wb25lbnRJbnRvTm9kZSwgbnVsbCwgY29tcG9uZW50SW5zdGFuY2UsIGNvbnRhaW5lciwgdHJhbnNhY3Rpb24sIHNob3VsZFJldXNlTWFya3VwLCBjb250ZXh0KTtcbiAgUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24ucmVsZWFzZSh0cmFuc2FjdGlvbik7XG59XG5cbi8qKlxuICogVW5tb3VudHMgYSBjb21wb25lbnQgYW5kIHJlbW92ZXMgaXQgZnJvbSB0aGUgRE9NLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGluc3RhbmNlIFJlYWN0IGNvbXBvbmVudCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7RE9NRWxlbWVudH0gY29udGFpbmVyIERPTSBlbGVtZW50IHRvIHVubW91bnQgZnJvbS5cbiAqIEBmaW5hbFxuICogQGludGVybmFsXG4gKiBAc2VlIHtSZWFjdE1vdW50LnVubW91bnRDb21wb25lbnRBdE5vZGV9XG4gKi9cbmZ1bmN0aW9uIHVubW91bnRDb21wb25lbnRGcm9tTm9kZShpbnN0YW5jZSwgY29udGFpbmVyLCBzYWZlbHkpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25CZWdpbkZsdXNoKCk7XG4gIH1cbiAgUmVhY3RSZWNvbmNpbGVyLnVubW91bnRDb21wb25lbnQoaW5zdGFuY2UsIHNhZmVseSk7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uRW5kRmx1c2goKTtcbiAgfVxuXG4gIGlmIChjb250YWluZXIubm9kZVR5cGUgPT09IERPQ19OT0RFX1RZUEUpIHtcbiAgICBjb250YWluZXIgPSBjb250YWluZXIuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgLy8gaHR0cDovL2pzcGVyZi5jb20vZW1wdHlpbmctYS1ub2RlXG4gIHdoaWxlIChjb250YWluZXIubGFzdENoaWxkKSB7XG4gICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGNvbnRhaW5lci5sYXN0Q2hpbGQpO1xuICB9XG59XG5cbi8qKlxuICogVHJ1ZSBpZiB0aGUgc3VwcGxpZWQgRE9NIG5vZGUgaGFzIGEgZGlyZWN0IFJlYWN0LXJlbmRlcmVkIGNoaWxkIHRoYXQgaXNcbiAqIG5vdCBhIFJlYWN0IHJvb3QgZWxlbWVudC4gVXNlZnVsIGZvciB3YXJuaW5nIGluIGByZW5kZXJgLFxuICogYHVubW91bnRDb21wb25lbnRBdE5vZGVgLCBldGMuXG4gKlxuICogQHBhcmFtIHs/RE9NRWxlbWVudH0gbm9kZSBUaGUgY2FuZGlkYXRlIERPTSBub2RlLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgRE9NIGVsZW1lbnQgY29udGFpbnMgYSBkaXJlY3QgY2hpbGQgdGhhdCB3YXNcbiAqIHJlbmRlcmVkIGJ5IFJlYWN0IGJ1dCBpcyBub3QgYSByb290IGVsZW1lbnQuXG4gKiBAaW50ZXJuYWxcbiAqL1xuZnVuY3Rpb24gaGFzTm9uUm9vdFJlYWN0Q2hpbGQoY29udGFpbmVyKSB7XG4gIHZhciByb290RWwgPSBnZXRSZWFjdFJvb3RFbGVtZW50SW5Db250YWluZXIoY29udGFpbmVyKTtcbiAgaWYgKHJvb3RFbCkge1xuICAgIHZhciBpbnN0ID0gUmVhY3RET01Db21wb25lbnRUcmVlLmdldEluc3RhbmNlRnJvbU5vZGUocm9vdEVsKTtcbiAgICByZXR1cm4gISEoaW5zdCAmJiBpbnN0Ll9ob3N0UGFyZW50KTtcbiAgfVxufVxuXG4vKipcbiAqIFRydWUgaWYgdGhlIHN1cHBsaWVkIERPTSBub2RlIGlzIGEgUmVhY3QgRE9NIGVsZW1lbnQgYW5kXG4gKiBpdCBoYXMgYmVlbiByZW5kZXJlZCBieSBhbm90aGVyIGNvcHkgb2YgUmVhY3QuXG4gKlxuICogQHBhcmFtIHs/RE9NRWxlbWVudH0gbm9kZSBUaGUgY2FuZGlkYXRlIERPTSBub2RlLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgRE9NIGhhcyBiZWVuIHJlbmRlcmVkIGJ5IGFub3RoZXIgY29weSBvZiBSZWFjdFxuICogQGludGVybmFsXG4gKi9cbmZ1bmN0aW9uIG5vZGVJc1JlbmRlcmVkQnlPdGhlckluc3RhbmNlKGNvbnRhaW5lcikge1xuICB2YXIgcm9vdEVsID0gZ2V0UmVhY3RSb290RWxlbWVudEluQ29udGFpbmVyKGNvbnRhaW5lcik7XG4gIHJldHVybiAhIShyb290RWwgJiYgaXNSZWFjdE5vZGUocm9vdEVsKSAmJiAhUmVhY3RET01Db21wb25lbnRUcmVlLmdldEluc3RhbmNlRnJvbU5vZGUocm9vdEVsKSk7XG59XG5cbi8qKlxuICogVHJ1ZSBpZiB0aGUgc3VwcGxpZWQgRE9NIG5vZGUgaXMgYSB2YWxpZCBub2RlIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHs/RE9NRWxlbWVudH0gbm9kZSBUaGUgY2FuZGlkYXRlIERPTSBub2RlLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgRE9NIGlzIGEgdmFsaWQgRE9NIG5vZGUuXG4gKiBAaW50ZXJuYWxcbiAqL1xuZnVuY3Rpb24gaXNWYWxpZENvbnRhaW5lcihub2RlKSB7XG4gIHJldHVybiAhIShub2RlICYmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREVfVFlQRSB8fCBub2RlLm5vZGVUeXBlID09PSBET0NfTk9ERV9UWVBFIHx8IG5vZGUubm9kZVR5cGUgPT09IERPQ1VNRU5UX0ZSQUdNRU5UX05PREVfVFlQRSkpO1xufVxuXG4vKipcbiAqIFRydWUgaWYgdGhlIHN1cHBsaWVkIERPTSBub2RlIGlzIGEgdmFsaWQgUmVhY3Qgbm9kZSBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7P0RPTUVsZW1lbnR9IG5vZGUgVGhlIGNhbmRpZGF0ZSBET00gbm9kZS5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIERPTSBpcyBhIHZhbGlkIFJlYWN0IERPTSBub2RlLlxuICogQGludGVybmFsXG4gKi9cbmZ1bmN0aW9uIGlzUmVhY3ROb2RlKG5vZGUpIHtcbiAgcmV0dXJuIGlzVmFsaWRDb250YWluZXIobm9kZSkgJiYgKG5vZGUuaGFzQXR0cmlidXRlKFJPT1RfQVRUUl9OQU1FKSB8fCBub2RlLmhhc0F0dHJpYnV0ZShBVFRSX05BTUUpKTtcbn1cblxuZnVuY3Rpb24gZ2V0SG9zdFJvb3RJbnN0YW5jZUluQ29udGFpbmVyKGNvbnRhaW5lcikge1xuICB2YXIgcm9vdEVsID0gZ2V0UmVhY3RSb290RWxlbWVudEluQ29udGFpbmVyKGNvbnRhaW5lcik7XG4gIHZhciBwcmV2SG9zdEluc3RhbmNlID0gcm9vdEVsICYmIFJlYWN0RE9NQ29tcG9uZW50VHJlZS5nZXRJbnN0YW5jZUZyb21Ob2RlKHJvb3RFbCk7XG4gIHJldHVybiBwcmV2SG9zdEluc3RhbmNlICYmICFwcmV2SG9zdEluc3RhbmNlLl9ob3N0UGFyZW50ID8gcHJldkhvc3RJbnN0YW5jZSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldFRvcExldmVsV3JhcHBlckluQ29udGFpbmVyKGNvbnRhaW5lcikge1xuICB2YXIgcm9vdCA9IGdldEhvc3RSb290SW5zdGFuY2VJbkNvbnRhaW5lcihjb250YWluZXIpO1xuICByZXR1cm4gcm9vdCA/IHJvb3QuX2hvc3RDb250YWluZXJJbmZvLl90b3BMZXZlbFdyYXBwZXIgOiBudWxsO1xufVxuXG4vKipcbiAqIFRlbXBvcmFyeSAoPykgaGFjayBzbyB0aGF0IHdlIGNhbiBzdG9yZSBhbGwgdG9wLWxldmVsIHBlbmRpbmcgdXBkYXRlcyBvblxuICogY29tcG9zaXRlcyBpbnN0ZWFkIG9mIGhhdmluZyB0byB3b3JyeSBhYm91dCBkaWZmZXJlbnQgdHlwZXMgb2YgY29tcG9uZW50c1xuICogaGVyZS5cbiAqL1xudmFyIHRvcExldmVsUm9vdENvdW50ZXIgPSAxO1xudmFyIFRvcExldmVsV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yb290SUQgPSB0b3BMZXZlbFJvb3RDb3VudGVyKys7XG59O1xuVG9wTGV2ZWxXcmFwcGVyLnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ID0ge307XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBUb3BMZXZlbFdyYXBwZXIuZGlzcGxheU5hbWUgPSAnVG9wTGV2ZWxXcmFwcGVyJztcbn1cblRvcExldmVsV3JhcHBlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZDtcbn07XG5Ub3BMZXZlbFdyYXBwZXIuaXNSZWFjdFRvcExldmVsV3JhcHBlciA9IHRydWU7XG5cbi8qKlxuICogTW91bnRpbmcgaXMgdGhlIHByb2Nlc3Mgb2YgaW5pdGlhbGl6aW5nIGEgUmVhY3QgY29tcG9uZW50IGJ5IGNyZWF0aW5nIGl0c1xuICogcmVwcmVzZW50YXRpdmUgRE9NIGVsZW1lbnRzIGFuZCBpbnNlcnRpbmcgdGhlbSBpbnRvIGEgc3VwcGxpZWQgYGNvbnRhaW5lcmAuXG4gKiBBbnkgcHJpb3IgY29udGVudCBpbnNpZGUgYGNvbnRhaW5lcmAgaXMgZGVzdHJveWVkIGluIHRoZSBwcm9jZXNzLlxuICpcbiAqICAgUmVhY3RNb3VudC5yZW5kZXIoXG4gKiAgICAgY29tcG9uZW50LFxuICogICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKVxuICogICApO1xuICpcbiAqICAgPGRpdiBpZD1cImNvbnRhaW5lclwiPiAgICAgICAgICAgICAgICAgICA8LS0gU3VwcGxpZWQgYGNvbnRhaW5lcmAuXG4gKiAgICAgPGRpdiBkYXRhLXJlYWN0aWQ9XCIuM1wiPiAgICAgICAgICAgICAgPC0tIFJlbmRlcmVkIHJlYWN0Um9vdCBvZiBSZWFjdFxuICogICAgICAgLy8gLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LlxuICogICAgIDwvZGl2PlxuICogICA8L2Rpdj5cbiAqXG4gKiBJbnNpZGUgb2YgYGNvbnRhaW5lcmAsIHRoZSBmaXJzdCBlbGVtZW50IHJlbmRlcmVkIGlzIHRoZSBcInJlYWN0Um9vdFwiLlxuICovXG52YXIgUmVhY3RNb3VudCA9IHtcblxuICBUb3BMZXZlbFdyYXBwZXI6IFRvcExldmVsV3JhcHBlcixcblxuICAvKipcbiAgICogVXNlZCBieSBkZXZ0b29scy4gVGhlIGtleXMgYXJlIG5vdCBpbXBvcnRhbnQuXG4gICAqL1xuICBfaW5zdGFuY2VzQnlSZWFjdFJvb3RJRDogaW5zdGFuY2VzQnlSZWFjdFJvb3RJRCxcblxuICAvKipcbiAgICogVGhpcyBpcyBhIGhvb2sgcHJvdmlkZWQgdG8gc3VwcG9ydCByZW5kZXJpbmcgUmVhY3QgY29tcG9uZW50cyB3aGlsZVxuICAgKiBlbnN1cmluZyB0aGF0IHRoZSBhcHBhcmVudCBzY3JvbGwgcG9zaXRpb24gb2YgaXRzIGBjb250YWluZXJgIGRvZXMgbm90XG4gICAqIGNoYW5nZS5cbiAgICpcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSBjb250YWluZXIgVGhlIGBjb250YWluZXJgIGJlaW5nIHJlbmRlcmVkIGludG8uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlbmRlckNhbGxiYWNrIFRoaXMgbXVzdCBiZSBjYWxsZWQgb25jZSB0byBkbyB0aGUgcmVuZGVyLlxuICAgKi9cbiAgc2Nyb2xsTW9uaXRvcjogZnVuY3Rpb24gKGNvbnRhaW5lciwgcmVuZGVyQ2FsbGJhY2spIHtcbiAgICByZW5kZXJDYWxsYmFjaygpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBUYWtlIGEgY29tcG9uZW50IHRoYXQncyBhbHJlYWR5IG1vdW50ZWQgaW50byB0aGUgRE9NIGFuZCByZXBsYWNlIGl0cyBwcm9wc1xuICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBwcmV2Q29tcG9uZW50IGNvbXBvbmVudCBpbnN0YW5jZSBhbHJlYWR5IGluIHRoZSBET01cbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IG5leHRFbGVtZW50IGNvbXBvbmVudCBpbnN0YW5jZSB0byByZW5kZXJcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSBjb250YWluZXIgY29udGFpbmVyIHRvIHJlbmRlciBpbnRvXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbiB0cmlnZ2VyZWQgb24gY29tcGxldGlvblxuICAgKi9cbiAgX3VwZGF0ZVJvb3RDb21wb25lbnQ6IGZ1bmN0aW9uIChwcmV2Q29tcG9uZW50LCBuZXh0RWxlbWVudCwgbmV4dENvbnRleHQsIGNvbnRhaW5lciwgY2FsbGJhY2spIHtcbiAgICBSZWFjdE1vdW50LnNjcm9sbE1vbml0b3IoY29udGFpbmVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICBSZWFjdFVwZGF0ZVF1ZXVlLmVucXVldWVFbGVtZW50SW50ZXJuYWwocHJldkNvbXBvbmVudCwgbmV4dEVsZW1lbnQsIG5leHRDb250ZXh0KTtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBSZWFjdFVwZGF0ZVF1ZXVlLmVucXVldWVDYWxsYmFja0ludGVybmFsKHByZXZDb21wb25lbnQsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBwcmV2Q29tcG9uZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZW5kZXIgYSBuZXcgY29tcG9uZW50IGludG8gdGhlIERPTS4gSG9va2VkIGJ5IGhvb2tzIVxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gbmV4dEVsZW1lbnQgZWxlbWVudCB0byByZW5kZXJcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSBjb250YWluZXIgY29udGFpbmVyIHRvIHJlbmRlciBpbnRvXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkUmV1c2VNYXJrdXAgaWYgd2Ugc2hvdWxkIHNraXAgdGhlIG1hcmt1cCBpbnNlcnRpb25cbiAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9IG5leHRDb21wb25lbnRcbiAgICovXG4gIF9yZW5kZXJOZXdSb290Q29tcG9uZW50OiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIGNvbnRhaW5lciwgc2hvdWxkUmV1c2VNYXJrdXAsIGNvbnRleHQpIHtcbiAgICAvLyBWYXJpb3VzIHBhcnRzIG9mIG91ciBjb2RlIChzdWNoIGFzIFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50J3NcbiAgICAvLyBfcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50KSBhc3N1bWUgdGhhdCBjYWxscyB0byByZW5kZXIgYXJlbid0IG5lc3RlZDtcbiAgICAvLyB2ZXJpZnkgdGhhdCB0aGF0J3MgdGhlIGNhc2UuXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9PSBudWxsLCAnX3JlbmRlck5ld1Jvb3RDb21wb25lbnQoKTogUmVuZGVyIG1ldGhvZHMgc2hvdWxkIGJlIGEgcHVyZSBmdW5jdGlvbiAnICsgJ29mIHByb3BzIGFuZCBzdGF0ZTsgdHJpZ2dlcmluZyBuZXN0ZWQgY29tcG9uZW50IHVwZGF0ZXMgZnJvbSAnICsgJ3JlbmRlciBpcyBub3QgYWxsb3dlZC4gSWYgbmVjZXNzYXJ5LCB0cmlnZ2VyIG5lc3RlZCB1cGRhdGVzIGluICcgKyAnY29tcG9uZW50RGlkVXBkYXRlLiBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiAlcy4nLCBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ICYmIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogdm9pZCAwO1xuXG4gICAgIWlzVmFsaWRDb250YWluZXIoY29udGFpbmVyKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdfcmVnaXN0ZXJDb21wb25lbnQoLi4uKTogVGFyZ2V0IGNvbnRhaW5lciBpcyBub3QgYSBET00gZWxlbWVudC4nKSA6IF9wcm9kSW52YXJpYW50KCczNycpIDogdm9pZCAwO1xuXG4gICAgUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyLmVuc3VyZVNjcm9sbFZhbHVlTW9uaXRvcmluZygpO1xuICAgIHZhciBjb21wb25lbnRJbnN0YW5jZSA9IGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQobmV4dEVsZW1lbnQsIGZhbHNlKTtcblxuICAgIC8vIFRoZSBpbml0aWFsIHJlbmRlciBpcyBzeW5jaHJvbm91cyBidXQgYW55IHVwZGF0ZXMgdGhhdCBoYXBwZW4gZHVyaW5nXG4gICAgLy8gcmVuZGVyaW5nLCBpbiBjb21wb25lbnRXaWxsTW91bnQgb3IgY29tcG9uZW50RGlkTW91bnQsIHdpbGwgYmUgYmF0Y2hlZFxuICAgIC8vIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBiYXRjaGluZyBzdHJhdGVneS5cblxuICAgIFJlYWN0VXBkYXRlcy5iYXRjaGVkVXBkYXRlcyhiYXRjaGVkTW91bnRDb21wb25lbnRJbnRvTm9kZSwgY29tcG9uZW50SW5zdGFuY2UsIGNvbnRhaW5lciwgc2hvdWxkUmV1c2VNYXJrdXAsIGNvbnRleHQpO1xuXG4gICAgdmFyIHdyYXBwZXJJRCA9IGNvbXBvbmVudEluc3RhbmNlLl9pbnN0YW5jZS5yb290SUQ7XG4gICAgaW5zdGFuY2VzQnlSZWFjdFJvb3RJRFt3cmFwcGVySURdID0gY29tcG9uZW50SW5zdGFuY2U7XG5cbiAgICByZXR1cm4gY29tcG9uZW50SW5zdGFuY2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgYSBSZWFjdCBjb21wb25lbnQgaW50byB0aGUgRE9NIGluIHRoZSBzdXBwbGllZCBgY29udGFpbmVyYC5cbiAgICpcbiAgICogSWYgdGhlIFJlYWN0IGNvbXBvbmVudCB3YXMgcHJldmlvdXNseSByZW5kZXJlZCBpbnRvIGBjb250YWluZXJgLCB0aGlzIHdpbGxcbiAgICogcGVyZm9ybSBhbiB1cGRhdGUgb24gaXQgYW5kIG9ubHkgbXV0YXRlIHRoZSBET00gYXMgbmVjZXNzYXJ5IHRvIHJlZmxlY3QgdGhlXG4gICAqIGxhdGVzdCBSZWFjdCBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IHBhcmVudENvbXBvbmVudCBUaGUgY29uY2VwdHVhbCBwYXJlbnQgb2YgdGhpcyByZW5kZXIgdHJlZS5cbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IG5leHRFbGVtZW50IENvbXBvbmVudCBlbGVtZW50IHRvIHJlbmRlci5cbiAgICogQHBhcmFtIHtET01FbGVtZW50fSBjb250YWluZXIgRE9NIGVsZW1lbnQgdG8gcmVuZGVyIGludG8uXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbiB0cmlnZ2VyZWQgb24gY29tcGxldGlvblxuICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH0gQ29tcG9uZW50IGluc3RhbmNlIHJlbmRlcmVkIGluIGBjb250YWluZXJgLlxuICAgKi9cbiAgcmVuZGVyU3VidHJlZUludG9Db250YWluZXI6IGZ1bmN0aW9uIChwYXJlbnRDb21wb25lbnQsIG5leHRFbGVtZW50LCBjb250YWluZXIsIGNhbGxiYWNrKSB7XG4gICAgIShwYXJlbnRDb21wb25lbnQgIT0gbnVsbCAmJiBSZWFjdEluc3RhbmNlTWFwLmhhcyhwYXJlbnRDb21wb25lbnQpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdwYXJlbnRDb21wb25lbnQgbXVzdCBiZSBhIHZhbGlkIFJlYWN0IENvbXBvbmVudCcpIDogX3Byb2RJbnZhcmlhbnQoJzM4JykgOiB2b2lkIDA7XG4gICAgcmV0dXJuIFJlYWN0TW91bnQuX3JlbmRlclN1YnRyZWVJbnRvQ29udGFpbmVyKHBhcmVudENvbXBvbmVudCwgbmV4dEVsZW1lbnQsIGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9LFxuXG4gIF9yZW5kZXJTdWJ0cmVlSW50b0NvbnRhaW5lcjogZnVuY3Rpb24gKHBhcmVudENvbXBvbmVudCwgbmV4dEVsZW1lbnQsIGNvbnRhaW5lciwgY2FsbGJhY2spIHtcbiAgICBSZWFjdFVwZGF0ZVF1ZXVlLnZhbGlkYXRlQ2FsbGJhY2soY2FsbGJhY2ssICdSZWFjdERPTS5yZW5kZXInKTtcbiAgICAhUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV4dEVsZW1lbnQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0RE9NLnJlbmRlcigpOiBJbnZhbGlkIGNvbXBvbmVudCBlbGVtZW50LiVzJywgdHlwZW9mIG5leHRFbGVtZW50ID09PSAnc3RyaW5nJyA/ICcgSW5zdGVhZCBvZiBwYXNzaW5nIGEgc3RyaW5nIGxpa2UgXFwnZGl2XFwnLCBwYXNzICcgKyAnUmVhY3QuY3JlYXRlRWxlbWVudChcXCdkaXZcXCcpIG9yIDxkaXYgLz4uJyA6IHR5cGVvZiBuZXh0RWxlbWVudCA9PT0gJ2Z1bmN0aW9uJyA/ICcgSW5zdGVhZCBvZiBwYXNzaW5nIGEgY2xhc3MgbGlrZSBGb28sIHBhc3MgJyArICdSZWFjdC5jcmVhdGVFbGVtZW50KEZvbykgb3IgPEZvbyAvPi4nIDpcbiAgICAvLyBDaGVjayBpZiBpdCBxdWFja3MgbGlrZSBhbiBlbGVtZW50XG4gICAgbmV4dEVsZW1lbnQgIT0gbnVsbCAmJiBuZXh0RWxlbWVudC5wcm9wcyAhPT0gdW5kZWZpbmVkID8gJyBUaGlzIG1heSBiZSBjYXVzZWQgYnkgdW5pbnRlbnRpb25hbGx5IGxvYWRpbmcgdHdvIGluZGVwZW5kZW50ICcgKyAnY29waWVzIG9mIFJlYWN0LicgOiAnJykgOiBfcHJvZEludmFyaWFudCgnMzknLCB0eXBlb2YgbmV4dEVsZW1lbnQgPT09ICdzdHJpbmcnID8gJyBJbnN0ZWFkIG9mIHBhc3NpbmcgYSBzdHJpbmcgbGlrZSBcXCdkaXZcXCcsIHBhc3MgJyArICdSZWFjdC5jcmVhdGVFbGVtZW50KFxcJ2RpdlxcJykgb3IgPGRpdiAvPi4nIDogdHlwZW9mIG5leHRFbGVtZW50ID09PSAnZnVuY3Rpb24nID8gJyBJbnN0ZWFkIG9mIHBhc3NpbmcgYSBjbGFzcyBsaWtlIEZvbywgcGFzcyAnICsgJ1JlYWN0LmNyZWF0ZUVsZW1lbnQoRm9vKSBvciA8Rm9vIC8+LicgOiBuZXh0RWxlbWVudCAhPSBudWxsICYmIG5leHRFbGVtZW50LnByb3BzICE9PSB1bmRlZmluZWQgPyAnIFRoaXMgbWF5IGJlIGNhdXNlZCBieSB1bmludGVudGlvbmFsbHkgbG9hZGluZyB0d28gaW5kZXBlbmRlbnQgJyArICdjb3BpZXMgb2YgUmVhY3QuJyA6ICcnKSA6IHZvaWQgMDtcblxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFjb250YWluZXIgfHwgIWNvbnRhaW5lci50YWdOYW1lIHx8IGNvbnRhaW5lci50YWdOYW1lLnRvVXBwZXJDYXNlKCkgIT09ICdCT0RZJywgJ3JlbmRlcigpOiBSZW5kZXJpbmcgY29tcG9uZW50cyBkaXJlY3RseSBpbnRvIGRvY3VtZW50LmJvZHkgaXMgJyArICdkaXNjb3VyYWdlZCwgc2luY2UgaXRzIGNoaWxkcmVuIGFyZSBvZnRlbiBtYW5pcHVsYXRlZCBieSB0aGlyZC1wYXJ0eSAnICsgJ3NjcmlwdHMgYW5kIGJyb3dzZXIgZXh0ZW5zaW9ucy4gVGhpcyBtYXkgbGVhZCB0byBzdWJ0bGUgJyArICdyZWNvbmNpbGlhdGlvbiBpc3N1ZXMuIFRyeSByZW5kZXJpbmcgaW50byBhIGNvbnRhaW5lciBlbGVtZW50IGNyZWF0ZWQgJyArICdmb3IgeW91ciBhcHAuJykgOiB2b2lkIDA7XG5cbiAgICB2YXIgbmV4dFdyYXBwZWRFbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChUb3BMZXZlbFdyYXBwZXIsIHsgY2hpbGQ6IG5leHRFbGVtZW50IH0pO1xuXG4gICAgdmFyIG5leHRDb250ZXh0O1xuICAgIGlmIChwYXJlbnRDb21wb25lbnQpIHtcbiAgICAgIHZhciBwYXJlbnRJbnN0ID0gUmVhY3RJbnN0YW5jZU1hcC5nZXQocGFyZW50Q29tcG9uZW50KTtcbiAgICAgIG5leHRDb250ZXh0ID0gcGFyZW50SW5zdC5fcHJvY2Vzc0NoaWxkQ29udGV4dChwYXJlbnRJbnN0Ll9jb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dENvbnRleHQgPSBlbXB0eU9iamVjdDtcbiAgICB9XG5cbiAgICB2YXIgcHJldkNvbXBvbmVudCA9IGdldFRvcExldmVsV3JhcHBlckluQ29udGFpbmVyKGNvbnRhaW5lcik7XG5cbiAgICBpZiAocHJldkNvbXBvbmVudCkge1xuICAgICAgdmFyIHByZXZXcmFwcGVkRWxlbWVudCA9IHByZXZDb21wb25lbnQuX2N1cnJlbnRFbGVtZW50O1xuICAgICAgdmFyIHByZXZFbGVtZW50ID0gcHJldldyYXBwZWRFbGVtZW50LnByb3BzLmNoaWxkO1xuICAgICAgaWYgKHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50KHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCkpIHtcbiAgICAgICAgdmFyIHB1YmxpY0luc3QgPSBwcmV2Q29tcG9uZW50Ll9yZW5kZXJlZENvbXBvbmVudC5nZXRQdWJsaWNJbnN0YW5jZSgpO1xuICAgICAgICB2YXIgdXBkYXRlZENhbGxiYWNrID0gY2FsbGJhY2sgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrLmNhbGwocHVibGljSW5zdCk7XG4gICAgICAgIH07XG4gICAgICAgIFJlYWN0TW91bnQuX3VwZGF0ZVJvb3RDb21wb25lbnQocHJldkNvbXBvbmVudCwgbmV4dFdyYXBwZWRFbGVtZW50LCBuZXh0Q29udGV4dCwgY29udGFpbmVyLCB1cGRhdGVkQ2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gcHVibGljSW5zdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFJlYWN0TW91bnQudW5tb3VudENvbXBvbmVudEF0Tm9kZShjb250YWluZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciByZWFjdFJvb3RFbGVtZW50ID0gZ2V0UmVhY3RSb290RWxlbWVudEluQ29udGFpbmVyKGNvbnRhaW5lcik7XG4gICAgdmFyIGNvbnRhaW5lckhhc1JlYWN0TWFya3VwID0gcmVhY3RSb290RWxlbWVudCAmJiAhIWludGVybmFsR2V0SUQocmVhY3RSb290RWxlbWVudCk7XG4gICAgdmFyIGNvbnRhaW5lckhhc05vblJvb3RSZWFjdENoaWxkID0gaGFzTm9uUm9vdFJlYWN0Q2hpbGQoY29udGFpbmVyKTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghY29udGFpbmVySGFzTm9uUm9vdFJlYWN0Q2hpbGQsICdyZW5kZXIoLi4uKTogUmVwbGFjaW5nIFJlYWN0LXJlbmRlcmVkIGNoaWxkcmVuIHdpdGggYSBuZXcgcm9vdCAnICsgJ2NvbXBvbmVudC4gSWYgeW91IGludGVuZGVkIHRvIHVwZGF0ZSB0aGUgY2hpbGRyZW4gb2YgdGhpcyBub2RlLCAnICsgJ3lvdSBzaG91bGQgaW5zdGVhZCBoYXZlIHRoZSBleGlzdGluZyBjaGlsZHJlbiB1cGRhdGUgdGhlaXIgc3RhdGUgJyArICdhbmQgcmVuZGVyIHRoZSBuZXcgY29tcG9uZW50cyBpbnN0ZWFkIG9mIGNhbGxpbmcgUmVhY3RET00ucmVuZGVyLicpIDogdm9pZCAwO1xuXG4gICAgICBpZiAoIWNvbnRhaW5lckhhc1JlYWN0TWFya3VwIHx8IHJlYWN0Um9vdEVsZW1lbnQubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgdmFyIHJvb3RFbGVtZW50U2libGluZyA9IHJlYWN0Um9vdEVsZW1lbnQ7XG4gICAgICAgIHdoaWxlIChyb290RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICBpZiAoaW50ZXJuYWxHZXRJRChyb290RWxlbWVudFNpYmxpbmcpKSB7XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ3JlbmRlcigpOiBUYXJnZXQgbm9kZSBoYXMgbWFya3VwIHJlbmRlcmVkIGJ5IFJlYWN0LCBidXQgdGhlcmUgJyArICdhcmUgdW5yZWxhdGVkIG5vZGVzIGFzIHdlbGwuIFRoaXMgaXMgbW9zdCBjb21tb25seSBjYXVzZWQgYnkgJyArICd3aGl0ZS1zcGFjZSBpbnNlcnRlZCBhcm91bmQgc2VydmVyLXJlbmRlcmVkIG1hcmt1cC4nKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICByb290RWxlbWVudFNpYmxpbmcgPSByb290RWxlbWVudFNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2hvdWxkUmV1c2VNYXJrdXAgPSBjb250YWluZXJIYXNSZWFjdE1hcmt1cCAmJiAhcHJldkNvbXBvbmVudCAmJiAhY29udGFpbmVySGFzTm9uUm9vdFJlYWN0Q2hpbGQ7XG4gICAgdmFyIGNvbXBvbmVudCA9IFJlYWN0TW91bnQuX3JlbmRlck5ld1Jvb3RDb21wb25lbnQobmV4dFdyYXBwZWRFbGVtZW50LCBjb250YWluZXIsIHNob3VsZFJldXNlTWFya3VwLCBuZXh0Q29udGV4dCkuX3JlbmRlcmVkQ29tcG9uZW50LmdldFB1YmxpY0luc3RhbmNlKCk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKGNvbXBvbmVudCk7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgYSBSZWFjdCBjb21wb25lbnQgaW50byB0aGUgRE9NIGluIHRoZSBzdXBwbGllZCBgY29udGFpbmVyYC5cbiAgICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0ZG9tLnJlbmRlclxuICAgKlxuICAgKiBJZiB0aGUgUmVhY3QgY29tcG9uZW50IHdhcyBwcmV2aW91c2x5IHJlbmRlcmVkIGludG8gYGNvbnRhaW5lcmAsIHRoaXMgd2lsbFxuICAgKiBwZXJmb3JtIGFuIHVwZGF0ZSBvbiBpdCBhbmQgb25seSBtdXRhdGUgdGhlIERPTSBhcyBuZWNlc3NhcnkgdG8gcmVmbGVjdCB0aGVcbiAgICogbGF0ZXN0IFJlYWN0IGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IG5leHRFbGVtZW50IENvbXBvbmVudCBlbGVtZW50IHRvIHJlbmRlci5cbiAgICogQHBhcmFtIHtET01FbGVtZW50fSBjb250YWluZXIgRE9NIGVsZW1lbnQgdG8gcmVuZGVyIGludG8uXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbiB0cmlnZ2VyZWQgb24gY29tcGxldGlvblxuICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH0gQ29tcG9uZW50IGluc3RhbmNlIHJlbmRlcmVkIGluIGBjb250YWluZXJgLlxuICAgKi9cbiAgcmVuZGVyOiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIGNvbnRhaW5lciwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gUmVhY3RNb3VudC5fcmVuZGVyU3VidHJlZUludG9Db250YWluZXIobnVsbCwgbmV4dEVsZW1lbnQsIGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9LFxuXG4gIC8qKlxuICAgKiBVbm1vdW50cyBhbmQgZGVzdHJveXMgdGhlIFJlYWN0IGNvbXBvbmVudCByZW5kZXJlZCBpbiB0aGUgYGNvbnRhaW5lcmAuXG4gICAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdGRvbS51bm1vdW50Y29tcG9uZW50YXRub2RlXG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gY29udGFpbmVyIERPTSBlbGVtZW50IGNvbnRhaW5pbmcgYSBSZWFjdCBjb21wb25lbnQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYSBjb21wb25lbnQgd2FzIGZvdW5kIGluIGFuZCB1bm1vdW50ZWQgZnJvbVxuICAgKiAgICAgICAgICAgICAgICAgICBgY29udGFpbmVyYFxuICAgKi9cbiAgdW5tb3VudENvbXBvbmVudEF0Tm9kZTogZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgIC8vIFZhcmlvdXMgcGFydHMgb2Ygb3VyIGNvZGUgKHN1Y2ggYXMgUmVhY3RDb21wb3NpdGVDb21wb25lbnQnc1xuICAgIC8vIF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQpIGFzc3VtZSB0aGF0IGNhbGxzIHRvIHJlbmRlciBhcmVuJ3QgbmVzdGVkO1xuICAgIC8vIHZlcmlmeSB0aGF0IHRoYXQncyB0aGUgY2FzZS4gKFN0cmljdGx5IHNwZWFraW5nLCB1bm1vdW50aW5nIHdvbid0IGNhdXNlIGFcbiAgICAvLyByZW5kZXIgYnV0IHdlIHN0aWxsIGRvbid0IGV4cGVjdCB0byBiZSBpbiBhIHJlbmRlciBjYWxsIGhlcmUuKVxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPT0gbnVsbCwgJ3VubW91bnRDb21wb25lbnRBdE5vZGUoKTogUmVuZGVyIG1ldGhvZHMgc2hvdWxkIGJlIGEgcHVyZSBmdW5jdGlvbiAnICsgJ29mIHByb3BzIGFuZCBzdGF0ZTsgdHJpZ2dlcmluZyBuZXN0ZWQgY29tcG9uZW50IHVwZGF0ZXMgZnJvbSByZW5kZXIgJyArICdpcyBub3QgYWxsb3dlZC4gSWYgbmVjZXNzYXJ5LCB0cmlnZ2VyIG5lc3RlZCB1cGRhdGVzIGluICcgKyAnY29tcG9uZW50RGlkVXBkYXRlLiBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiAlcy4nLCBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ICYmIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogdm9pZCAwO1xuXG4gICAgIWlzVmFsaWRDb250YWluZXIoY29udGFpbmVyKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1bm1vdW50Q29tcG9uZW50QXROb2RlKC4uLik6IFRhcmdldCBjb250YWluZXIgaXMgbm90IGEgRE9NIGVsZW1lbnQuJykgOiBfcHJvZEludmFyaWFudCgnNDAnKSA6IHZvaWQgMDtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghbm9kZUlzUmVuZGVyZWRCeU90aGVySW5zdGFuY2UoY29udGFpbmVyKSwgJ3VubW91bnRDb21wb25lbnRBdE5vZGUoKTogVGhlIG5vZGUgeW91XFwncmUgYXR0ZW1wdGluZyB0byB1bm1vdW50ICcgKyAnd2FzIHJlbmRlcmVkIGJ5IGFub3RoZXIgY29weSBvZiBSZWFjdC4nKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICB2YXIgcHJldkNvbXBvbmVudCA9IGdldFRvcExldmVsV3JhcHBlckluQ29udGFpbmVyKGNvbnRhaW5lcik7XG4gICAgaWYgKCFwcmV2Q29tcG9uZW50KSB7XG4gICAgICAvLyBDaGVjayBpZiB0aGUgbm9kZSBiZWluZyB1bm1vdW50ZWQgd2FzIHJlbmRlcmVkIGJ5IFJlYWN0LCBidXQgaXNuJ3QgYVxuICAgICAgLy8gcm9vdCBub2RlLlxuICAgICAgdmFyIGNvbnRhaW5lckhhc05vblJvb3RSZWFjdENoaWxkID0gaGFzTm9uUm9vdFJlYWN0Q2hpbGQoY29udGFpbmVyKTtcblxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNvbnRhaW5lciBpdHNlbGYgaXMgYSBSZWFjdCByb290IG5vZGUuXG4gICAgICB2YXIgaXNDb250YWluZXJSZWFjdFJvb3QgPSBjb250YWluZXIubm9kZVR5cGUgPT09IDEgJiYgY29udGFpbmVyLmhhc0F0dHJpYnV0ZShST09UX0FUVFJfTkFNRSk7XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFjb250YWluZXJIYXNOb25Sb290UmVhY3RDaGlsZCwgJ3VubW91bnRDb21wb25lbnRBdE5vZGUoKTogVGhlIG5vZGUgeW91XFwncmUgYXR0ZW1wdGluZyB0byB1bm1vdW50ICcgKyAnd2FzIHJlbmRlcmVkIGJ5IFJlYWN0IGFuZCBpcyBub3QgYSB0b3AtbGV2ZWwgY29udGFpbmVyLiAlcycsIGlzQ29udGFpbmVyUmVhY3RSb290ID8gJ1lvdSBtYXkgaGF2ZSBhY2NpZGVudGFsbHkgcGFzc2VkIGluIGEgUmVhY3Qgcm9vdCBub2RlIGluc3RlYWQgJyArICdvZiBpdHMgY29udGFpbmVyLicgOiAnSW5zdGVhZCwgaGF2ZSB0aGUgcGFyZW50IGNvbXBvbmVudCB1cGRhdGUgaXRzIHN0YXRlIGFuZCAnICsgJ3JlcmVuZGVyIGluIG9yZGVyIHRvIHJlbW92ZSB0aGlzIGNvbXBvbmVudC4nKSA6IHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBkZWxldGUgaW5zdGFuY2VzQnlSZWFjdFJvb3RJRFtwcmV2Q29tcG9uZW50Ll9pbnN0YW5jZS5yb290SURdO1xuICAgIFJlYWN0VXBkYXRlcy5iYXRjaGVkVXBkYXRlcyh1bm1vdW50Q29tcG9uZW50RnJvbU5vZGUsIHByZXZDb21wb25lbnQsIGNvbnRhaW5lciwgZmFsc2UpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIF9tb3VudEltYWdlSW50b05vZGU6IGZ1bmN0aW9uIChtYXJrdXAsIGNvbnRhaW5lciwgaW5zdGFuY2UsIHNob3VsZFJldXNlTWFya3VwLCB0cmFuc2FjdGlvbikge1xuICAgICFpc1ZhbGlkQ29udGFpbmVyKGNvbnRhaW5lcikgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnbW91bnRDb21wb25lbnRJbnRvTm9kZSguLi4pOiBUYXJnZXQgY29udGFpbmVyIGlzIG5vdCB2YWxpZC4nKSA6IF9wcm9kSW52YXJpYW50KCc0MScpIDogdm9pZCAwO1xuXG4gICAgaWYgKHNob3VsZFJldXNlTWFya3VwKSB7XG4gICAgICB2YXIgcm9vdEVsZW1lbnQgPSBnZXRSZWFjdFJvb3RFbGVtZW50SW5Db250YWluZXIoY29udGFpbmVyKTtcbiAgICAgIGlmIChSZWFjdE1hcmt1cENoZWNrc3VtLmNhblJldXNlTWFya3VwKG1hcmt1cCwgcm9vdEVsZW1lbnQpKSB7XG4gICAgICAgIFJlYWN0RE9NQ29tcG9uZW50VHJlZS5wcmVjYWNoZU5vZGUoaW5zdGFuY2UsIHJvb3RFbGVtZW50KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNoZWNrc3VtID0gcm9vdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFJlYWN0TWFya3VwQ2hlY2tzdW0uQ0hFQ0tTVU1fQVRUUl9OQU1FKTtcbiAgICAgICAgcm9vdEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFJlYWN0TWFya3VwQ2hlY2tzdW0uQ0hFQ0tTVU1fQVRUUl9OQU1FKTtcblxuICAgICAgICB2YXIgcm9vdE1hcmt1cCA9IHJvb3RFbGVtZW50Lm91dGVySFRNTDtcbiAgICAgICAgcm9vdEVsZW1lbnQuc2V0QXR0cmlidXRlKFJlYWN0TWFya3VwQ2hlY2tzdW0uQ0hFQ0tTVU1fQVRUUl9OQU1FLCBjaGVja3N1bSk7XG5cbiAgICAgICAgdmFyIG5vcm1hbGl6ZWRNYXJrdXAgPSBtYXJrdXA7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgLy8gYmVjYXVzZSByb290TWFya3VwIGlzIHJldHJpZXZlZCBmcm9tIHRoZSBET00sIHZhcmlvdXMgbm9ybWFsaXphdGlvbnNcbiAgICAgICAgICAvLyB3aWxsIGhhdmUgb2NjdXJyZWQgd2hpY2ggd2lsbCBub3QgYmUgcHJlc2VudCBpbiBgbWFya3VwYC4gSGVyZSxcbiAgICAgICAgICAvLyBpbnNlcnQgbWFya3VwIGludG8gYSA8ZGl2PiBvciA8aWZyYW1lPiBkZXBlbmRpbmcgb24gdGhlIGNvbnRhaW5lclxuICAgICAgICAgIC8vIHR5cGUgdG8gcGVyZm9ybSB0aGUgc2FtZSBub3JtYWxpemF0aW9ucyBiZWZvcmUgY29tcGFyaW5nLlxuICAgICAgICAgIHZhciBub3JtYWxpemVyO1xuICAgICAgICAgIGlmIChjb250YWluZXIubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERV9UWVBFKSB7XG4gICAgICAgICAgICBub3JtYWxpemVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBub3JtYWxpemVyLmlubmVySFRNTCA9IG1hcmt1cDtcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRNYXJrdXAgPSBub3JtYWxpemVyLmlubmVySFRNTDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9ybWFsaXplciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub3JtYWxpemVyKTtcbiAgICAgICAgICAgIG5vcm1hbGl6ZXIuY29udGVudERvY3VtZW50LndyaXRlKG1hcmt1cCk7XG4gICAgICAgICAgICBub3JtYWxpemVkTWFya3VwID0gbm9ybWFsaXplci5jb250ZW50RG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm91dGVySFRNTDtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobm9ybWFsaXplcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRpZmZJbmRleCA9IGZpcnN0RGlmZmVyZW5jZUluZGV4KG5vcm1hbGl6ZWRNYXJrdXAsIHJvb3RNYXJrdXApO1xuICAgICAgICB2YXIgZGlmZmVyZW5jZSA9ICcgKGNsaWVudCkgJyArIG5vcm1hbGl6ZWRNYXJrdXAuc3Vic3RyaW5nKGRpZmZJbmRleCAtIDIwLCBkaWZmSW5kZXggKyAyMCkgKyAnXFxuIChzZXJ2ZXIpICcgKyByb290TWFya3VwLnN1YnN0cmluZyhkaWZmSW5kZXggLSAyMCwgZGlmZkluZGV4ICsgMjApO1xuXG4gICAgICAgICEoY29udGFpbmVyLm5vZGVUeXBlICE9PSBET0NfTk9ERV9UWVBFKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdZb3VcXCdyZSB0cnlpbmcgdG8gcmVuZGVyIGEgY29tcG9uZW50IHRvIHRoZSBkb2N1bWVudCB1c2luZyBzZXJ2ZXIgcmVuZGVyaW5nIGJ1dCB0aGUgY2hlY2tzdW0gd2FzIGludmFsaWQuIFRoaXMgdXN1YWxseSBtZWFucyB5b3UgcmVuZGVyZWQgYSBkaWZmZXJlbnQgY29tcG9uZW50IHR5cGUgb3IgcHJvcHMgb24gdGhlIGNsaWVudCBmcm9tIHRoZSBvbmUgb24gdGhlIHNlcnZlciwgb3IgeW91ciByZW5kZXIoKSBtZXRob2RzIGFyZSBpbXB1cmUuIFJlYWN0IGNhbm5vdCBoYW5kbGUgdGhpcyBjYXNlIGR1ZSB0byBjcm9zcy1icm93c2VyIHF1aXJrcyBieSByZW5kZXJpbmcgYXQgdGhlIGRvY3VtZW50IHJvb3QuIFlvdSBzaG91bGQgbG9vayBmb3IgZW52aXJvbm1lbnQgZGVwZW5kZW50IGNvZGUgaW4geW91ciBjb21wb25lbnRzIGFuZCBlbnN1cmUgdGhlIHByb3BzIGFyZSB0aGUgc2FtZSBjbGllbnQgYW5kIHNlcnZlciBzaWRlOlxcbiVzJywgZGlmZmVyZW5jZSkgOiBfcHJvZEludmFyaWFudCgnNDInLCBkaWZmZXJlbmNlKSA6IHZvaWQgMDtcblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnUmVhY3QgYXR0ZW1wdGVkIHRvIHJldXNlIG1hcmt1cCBpbiBhIGNvbnRhaW5lciBidXQgdGhlICcgKyAnY2hlY2tzdW0gd2FzIGludmFsaWQuIFRoaXMgZ2VuZXJhbGx5IG1lYW5zIHRoYXQgeW91IGFyZSAnICsgJ3VzaW5nIHNlcnZlciByZW5kZXJpbmcgYW5kIHRoZSBtYXJrdXAgZ2VuZXJhdGVkIG9uIHRoZSAnICsgJ3NlcnZlciB3YXMgbm90IHdoYXQgdGhlIGNsaWVudCB3YXMgZXhwZWN0aW5nLiBSZWFjdCBpbmplY3RlZCAnICsgJ25ldyBtYXJrdXAgdG8gY29tcGVuc2F0ZSB3aGljaCB3b3JrcyBidXQgeW91IGhhdmUgbG9zdCBtYW55ICcgKyAnb2YgdGhlIGJlbmVmaXRzIG9mIHNlcnZlciByZW5kZXJpbmcuIEluc3RlYWQsIGZpZ3VyZSBvdXQgJyArICd3aHkgdGhlIG1hcmt1cCBiZWluZyBnZW5lcmF0ZWQgaXMgZGlmZmVyZW50IG9uIHRoZSBjbGllbnQgJyArICdvciBzZXJ2ZXI6XFxuJXMnLCBkaWZmZXJlbmNlKSA6IHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgICEoY29udGFpbmVyLm5vZGVUeXBlICE9PSBET0NfTk9ERV9UWVBFKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdZb3VcXCdyZSB0cnlpbmcgdG8gcmVuZGVyIGEgY29tcG9uZW50IHRvIHRoZSBkb2N1bWVudCBidXQgeW91IGRpZG5cXCd0IHVzZSBzZXJ2ZXIgcmVuZGVyaW5nLiBXZSBjYW5cXCd0IGRvIHRoaXMgd2l0aG91dCB1c2luZyBzZXJ2ZXIgcmVuZGVyaW5nIGR1ZSB0byBjcm9zcy1icm93c2VyIHF1aXJrcy4gU2VlIFJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RyaW5nKCkgZm9yIHNlcnZlciByZW5kZXJpbmcuJykgOiBfcHJvZEludmFyaWFudCgnNDMnKSA6IHZvaWQgMDtcblxuICAgIGlmICh0cmFuc2FjdGlvbi51c2VDcmVhdGVFbGVtZW50KSB7XG4gICAgICB3aGlsZSAoY29udGFpbmVyLmxhc3RDaGlsZCkge1xuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoY29udGFpbmVyLmxhc3RDaGlsZCk7XG4gICAgICB9XG4gICAgICBET01MYXp5VHJlZS5pbnNlcnRUcmVlQmVmb3JlKGNvbnRhaW5lciwgbWFya3VwLCBudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0SW5uZXJIVE1MKGNvbnRhaW5lciwgbWFya3VwKTtcbiAgICAgIFJlYWN0RE9NQ29tcG9uZW50VHJlZS5wcmVjYWNoZU5vZGUoaW5zdGFuY2UsIGNvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIGhvc3ROb2RlID0gUmVhY3RET01Db21wb25lbnRUcmVlLmdldEluc3RhbmNlRnJvbU5vZGUoY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgICAgaWYgKGhvc3ROb2RlLl9kZWJ1Z0lEICE9PSAwKSB7XG4gICAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vbkhvc3RPcGVyYXRpb24oe1xuICAgICAgICAgIGluc3RhbmNlSUQ6IGhvc3ROb2RlLl9kZWJ1Z0lELFxuICAgICAgICAgIHR5cGU6ICdtb3VudCcsXG4gICAgICAgICAgcGF5bG9hZDogbWFya3VwLnRvU3RyaW5nKClcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0TW91bnQ7Il19