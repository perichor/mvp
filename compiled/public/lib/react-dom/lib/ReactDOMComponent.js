/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/* global hasOwnProperty:true */

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _prodInvariant = require('./reactProdInvariant'),
    _assign = require('object-assign');

var AutoFocusUtils = require('./AutoFocusUtils');
var CSSPropertyOperations = require('./CSSPropertyOperations');
var DOMLazyTree = require('./DOMLazyTree');
var DOMNamespaces = require('./DOMNamespaces');
var DOMProperty = require('./DOMProperty');
var DOMPropertyOperations = require('./DOMPropertyOperations');
var EventPluginHub = require('./EventPluginHub');
var EventPluginRegistry = require('./EventPluginRegistry');
var ReactBrowserEventEmitter = require('./ReactBrowserEventEmitter');
var ReactDOMComponentFlags = require('./ReactDOMComponentFlags');
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
var ReactDOMInput = require('./ReactDOMInput');
var ReactDOMOption = require('./ReactDOMOption');
var ReactDOMSelect = require('./ReactDOMSelect');
var ReactDOMTextarea = require('./ReactDOMTextarea');
var ReactInstrumentation = require('./ReactInstrumentation');
var ReactMultiChild = require('./ReactMultiChild');
var ReactServerRenderingTransaction = require('./ReactServerRenderingTransaction');

var emptyFunction = require('fbjs/lib/emptyFunction');
var escapeTextContentForBrowser = require('./escapeTextContentForBrowser');
var invariant = require('fbjs/lib/invariant');
var isEventSupported = require('./isEventSupported');
var shallowEqual = require('fbjs/lib/shallowEqual');
var validateDOMNesting = require('./validateDOMNesting');
var warning = require('fbjs/lib/warning');

var Flags = ReactDOMComponentFlags;
var deleteListener = EventPluginHub.deleteListener;
var getNode = ReactDOMComponentTree.getNodeFromInstance;
var listenTo = ReactBrowserEventEmitter.listenTo;
var registrationNameModules = EventPluginRegistry.registrationNameModules;

// For quickly matching children type, to test if can be treated as content.
var CONTENT_TYPES = { 'string': true, 'number': true };

var STYLE = 'style';
var HTML = '__html';
var RESERVED_PROPS = {
  children: null,
  dangerouslySetInnerHTML: null,
  suppressContentEditableWarning: null
};

// Node type for document fragments (Node.DOCUMENT_FRAGMENT_NODE).
var DOC_FRAGMENT_TYPE = 11;

function getDeclarationErrorAddendum(internalInstance) {
  if (internalInstance) {
    var owner = internalInstance._currentElement._owner || null;
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' This DOM node was rendered by `' + name + '`.';
      }
    }
  }
  return '';
}

function friendlyStringify(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    if (Array.isArray(obj)) {
      return '[' + obj.map(friendlyStringify).join(', ') + ']';
    } else {
      var pairs = [];
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var keyEscaped = /^[a-z$_][\w$_]*$/i.test(key) ? key : JSON.stringify(key);
          pairs.push(keyEscaped + ': ' + friendlyStringify(obj[key]));
        }
      }
      return '{' + pairs.join(', ') + '}';
    }
  } else if (typeof obj === 'string') {
    return JSON.stringify(obj);
  } else if (typeof obj === 'function') {
    return '[function object]';
  }
  // Differs from JSON.stringify in that undefined because undefined and that
  // inf and nan don't become null
  return String(obj);
}

var styleMutationWarning = {};

function checkAndWarnForMutatedStyle(style1, style2, component) {
  if (style1 == null || style2 == null) {
    return;
  }
  if (shallowEqual(style1, style2)) {
    return;
  }

  var componentName = component._tag;
  var owner = component._currentElement._owner;
  var ownerName;
  if (owner) {
    ownerName = owner.getName();
  }

  var hash = ownerName + '|' + componentName;

  if (styleMutationWarning.hasOwnProperty(hash)) {
    return;
  }

  styleMutationWarning[hash] = true;

  process.env.NODE_ENV !== 'production' ? warning(false, '`%s` was passed a style object that has previously been mutated. ' + 'Mutating `style` is deprecated. Consider cloning it beforehand. Check ' + 'the `render` %s. Previous style: %s. Mutated style: %s.', componentName, owner ? 'of `' + ownerName + '`' : 'using <' + componentName + '>', friendlyStringify(style1), friendlyStringify(style2)) : void 0;
}

/**
 * @param {object} component
 * @param {?object} props
 */
function assertValidProps(component, props) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  if (voidElementTags[component._tag]) {
    !(props.children == null && props.dangerouslySetInnerHTML == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s', component._tag, component._currentElement._owner ? ' Check the render method of ' + component._currentElement._owner.getName() + '.' : '') : _prodInvariant('137', component._tag, component._currentElement._owner ? ' Check the render method of ' + component._currentElement._owner.getName() + '.' : '') : void 0;
  }
  if (props.dangerouslySetInnerHTML != null) {
    !(props.children == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : _prodInvariant('60') : void 0;
    !(_typeof(props.dangerouslySetInnerHTML) === 'object' && HTML in props.dangerouslySetInnerHTML) ? process.env.NODE_ENV !== 'production' ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.') : _prodInvariant('61') : void 0;
  }
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(props.innerHTML == null, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.') : void 0;
    process.env.NODE_ENV !== 'production' ? warning(props.suppressContentEditableWarning || !props.contentEditable || props.children == null, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.') : void 0;
    process.env.NODE_ENV !== 'production' ? warning(props.onFocusIn == null && props.onFocusOut == null, 'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.') : void 0;
  }
  !(props.style == null || _typeof(props.style) === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s', getDeclarationErrorAddendum(component)) : _prodInvariant('62', getDeclarationErrorAddendum(component)) : void 0;
}

function enqueuePutListener(inst, registrationName, listener, transaction) {
  if (transaction instanceof ReactServerRenderingTransaction) {
    return;
  }
  if (process.env.NODE_ENV !== 'production') {
    // IE8 has no API for event capturing and the `onScroll` event doesn't
    // bubble.
    process.env.NODE_ENV !== 'production' ? warning(registrationName !== 'onScroll' || isEventSupported('scroll', true), 'This browser doesn\'t support the `onScroll` event') : void 0;
  }
  var containerInfo = inst._hostContainerInfo;
  var isDocumentFragment = containerInfo._node && containerInfo._node.nodeType === DOC_FRAGMENT_TYPE;
  var doc = isDocumentFragment ? containerInfo._node : containerInfo._ownerDocument;
  listenTo(registrationName, doc);
  transaction.getReactMountReady().enqueue(putListener, {
    inst: inst,
    registrationName: registrationName,
    listener: listener
  });
}

function putListener() {
  var listenerToPut = this;
  EventPluginHub.putListener(listenerToPut.inst, listenerToPut.registrationName, listenerToPut.listener);
}

function inputPostMount() {
  var inst = this;
  ReactDOMInput.postMountWrapper(inst);
}

function textareaPostMount() {
  var inst = this;
  ReactDOMTextarea.postMountWrapper(inst);
}

function optionPostMount() {
  var inst = this;
  ReactDOMOption.postMountWrapper(inst);
}

var setAndValidateContentChildDev = emptyFunction;
if (process.env.NODE_ENV !== 'production') {
  setAndValidateContentChildDev = function setAndValidateContentChildDev(content) {
    var hasExistingContent = this._contentDebugID != null;
    var debugID = this._debugID;
    // This ID represents the inlined child that has no backing instance:
    var contentDebugID = -debugID;

    if (content == null) {
      if (hasExistingContent) {
        ReactInstrumentation.debugTool.onUnmountComponent(this._contentDebugID);
      }
      this._contentDebugID = null;
      return;
    }

    validateDOMNesting(null, String(content), this, this._ancestorInfo);
    this._contentDebugID = contentDebugID;
    if (hasExistingContent) {
      ReactInstrumentation.debugTool.onBeforeUpdateComponent(contentDebugID, content);
      ReactInstrumentation.debugTool.onUpdateComponent(contentDebugID);
    } else {
      ReactInstrumentation.debugTool.onBeforeMountComponent(contentDebugID, content, debugID);
      ReactInstrumentation.debugTool.onMountComponent(contentDebugID);
      ReactInstrumentation.debugTool.onSetChildren(debugID, [contentDebugID]);
    }
  };
}

// There are so many media events, it makes sense to just
// maintain a list rather than create a `trapBubbledEvent` for each
var mediaEvents = {
  topAbort: 'abort',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTimeUpdate: 'timeupdate',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting'
};

function trapBubbledEventsLocal() {
  var inst = this;
  // If a component renders to null or if another component fatals and causes
  // the state of the tree to be corrupted, `node` here can be null.
  !inst._rootNodeID ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Must be mounted to trap events') : _prodInvariant('63') : void 0;
  var node = getNode(inst);
  !node ? process.env.NODE_ENV !== 'production' ? invariant(false, 'trapBubbledEvent(...): Requires node to be rendered.') : _prodInvariant('64') : void 0;

  switch (inst._tag) {
    case 'iframe':
    case 'object':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent('topLoad', 'load', node)];
      break;
    case 'video':
    case 'audio':

      inst._wrapperState.listeners = [];
      // Create listener for each media event
      for (var event in mediaEvents) {
        if (mediaEvents.hasOwnProperty(event)) {
          inst._wrapperState.listeners.push(ReactBrowserEventEmitter.trapBubbledEvent(event, mediaEvents[event], node));
        }
      }
      break;
    case 'source':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent('topError', 'error', node)];
      break;
    case 'img':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent('topError', 'error', node), ReactBrowserEventEmitter.trapBubbledEvent('topLoad', 'load', node)];
      break;
    case 'form':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent('topReset', 'reset', node), ReactBrowserEventEmitter.trapBubbledEvent('topSubmit', 'submit', node)];
      break;
    case 'input':
    case 'select':
    case 'textarea':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent('topInvalid', 'invalid', node)];
      break;
  }
}

function postUpdateSelectWrapper() {
  ReactDOMSelect.postUpdateWrapper(this);
}

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.

var omittedCloseTags = {
  'area': true,
  'base': true,
  'br': true,
  'col': true,
  'embed': true,
  'hr': true,
  'img': true,
  'input': true,
  'keygen': true,
  'link': true,
  'meta': true,
  'param': true,
  'source': true,
  'track': true,
  'wbr': true
};

var newlineEatingTags = {
  'listing': true,
  'pre': true,
  'textarea': true
};

// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.

var voidElementTags = _assign({
  'menuitem': true
}, omittedCloseTags);

// We accept any tag to be rendered but since this gets injected into arbitrary
// HTML, we want to make sure that it's a safe tag.
// http://www.w3.org/TR/REC-xml/#NT-Name

var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset
var validatedTagCache = {};
var hasOwnProperty = {}.hasOwnProperty;

function validateDangerousTag(tag) {
  if (!hasOwnProperty.call(validatedTagCache, tag)) {
    !VALID_TAG_REGEX.test(tag) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Invalid tag: %s', tag) : _prodInvariant('65', tag) : void 0;
    validatedTagCache[tag] = true;
  }
}

function isCustomComponent(tagName, props) {
  return tagName.indexOf('-') >= 0 || props.is != null;
}

var globalIdCounter = 1;

/**
 * Creates a new React class that is idempotent and capable of containing other
 * React components. It accepts event listeners and DOM properties that are
 * valid according to `DOMProperty`.
 *
 *  - Event listeners: `onClick`, `onMouseDown`, etc.
 *  - DOM properties: `className`, `name`, `title`, etc.
 *
 * The `style` property functions differently from the DOM API. It accepts an
 * object mapping of style properties to values.
 *
 * @constructor ReactDOMComponent
 * @extends ReactMultiChild
 */
function ReactDOMComponent(element) {
  var tag = element.type;
  validateDangerousTag(tag);
  this._currentElement = element;
  this._tag = tag.toLowerCase();
  this._namespaceURI = null;
  this._renderedChildren = null;
  this._previousStyle = null;
  this._previousStyleCopy = null;
  this._hostNode = null;
  this._hostParent = null;
  this._rootNodeID = 0;
  this._domID = 0;
  this._hostContainerInfo = null;
  this._wrapperState = null;
  this._topLevelWrapper = null;
  this._flags = 0;
  if (process.env.NODE_ENV !== 'production') {
    this._ancestorInfo = null;
    setAndValidateContentChildDev.call(this, null);
  }
}

ReactDOMComponent.displayName = 'ReactDOMComponent';

ReactDOMComponent.Mixin = {

  /**
   * Generates root tag markup then recurses. This method has side effects and
   * is not idempotent.
   *
   * @internal
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {?ReactDOMComponent} the parent component instance
   * @param {?object} info about the host container
   * @param {object} context
   * @return {string} The computed markup.
   */
  mountComponent: function mountComponent(transaction, hostParent, hostContainerInfo, context) {
    this._rootNodeID = globalIdCounter++;
    this._domID = hostContainerInfo._idCounter++;
    this._hostParent = hostParent;
    this._hostContainerInfo = hostContainerInfo;

    var props = this._currentElement.props;

    switch (this._tag) {
      case 'audio':
      case 'form':
      case 'iframe':
      case 'img':
      case 'link':
      case 'object':
      case 'source':
      case 'video':
        this._wrapperState = {
          listeners: null
        };
        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
        break;
      case 'input':
        ReactDOMInput.mountWrapper(this, props, hostParent);
        props = ReactDOMInput.getHostProps(this, props);
        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
        break;
      case 'option':
        ReactDOMOption.mountWrapper(this, props, hostParent);
        props = ReactDOMOption.getHostProps(this, props);
        break;
      case 'select':
        ReactDOMSelect.mountWrapper(this, props, hostParent);
        props = ReactDOMSelect.getHostProps(this, props);
        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
        break;
      case 'textarea':
        ReactDOMTextarea.mountWrapper(this, props, hostParent);
        props = ReactDOMTextarea.getHostProps(this, props);
        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
        break;
    }

    assertValidProps(this, props);

    // We create tags in the namespace of their parent container, except HTML
    // tags get no namespace.
    var namespaceURI;
    var parentTag;
    if (hostParent != null) {
      namespaceURI = hostParent._namespaceURI;
      parentTag = hostParent._tag;
    } else if (hostContainerInfo._tag) {
      namespaceURI = hostContainerInfo._namespaceURI;
      parentTag = hostContainerInfo._tag;
    }
    if (namespaceURI == null || namespaceURI === DOMNamespaces.svg && parentTag === 'foreignobject') {
      namespaceURI = DOMNamespaces.html;
    }
    if (namespaceURI === DOMNamespaces.html) {
      if (this._tag === 'svg') {
        namespaceURI = DOMNamespaces.svg;
      } else if (this._tag === 'math') {
        namespaceURI = DOMNamespaces.mathml;
      }
    }
    this._namespaceURI = namespaceURI;

    if (process.env.NODE_ENV !== 'production') {
      var parentInfo;
      if (hostParent != null) {
        parentInfo = hostParent._ancestorInfo;
      } else if (hostContainerInfo._tag) {
        parentInfo = hostContainerInfo._ancestorInfo;
      }
      if (parentInfo) {
        // parentInfo should always be present except for the top-level
        // component when server rendering
        validateDOMNesting(this._tag, null, this, parentInfo);
      }
      this._ancestorInfo = validateDOMNesting.updatedAncestorInfo(parentInfo, this._tag, this);
    }

    var mountImage;
    if (transaction.useCreateElement) {
      var ownerDocument = hostContainerInfo._ownerDocument;
      var el;
      if (namespaceURI === DOMNamespaces.html) {
        if (this._tag === 'script') {
          // Create the script via .innerHTML so its "parser-inserted" flag is
          // set to true and it does not execute
          var div = ownerDocument.createElement('div');
          var type = this._currentElement.type;
          div.innerHTML = '<' + type + '></' + type + '>';
          el = div.removeChild(div.firstChild);
        } else if (props.is) {
          el = ownerDocument.createElement(this._currentElement.type, props.is);
        } else {
          // Separate else branch instead of using `props.is || undefined` above becuase of a Firefox bug.
          // See discussion in https://github.com/facebook/react/pull/6896
          // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
          el = ownerDocument.createElement(this._currentElement.type);
        }
      } else {
        el = ownerDocument.createElementNS(namespaceURI, this._currentElement.type);
      }
      ReactDOMComponentTree.precacheNode(this, el);
      this._flags |= Flags.hasCachedChildNodes;
      if (!this._hostParent) {
        DOMPropertyOperations.setAttributeForRoot(el);
      }
      this._updateDOMProperties(null, props, transaction);
      var lazyTree = DOMLazyTree(el);
      this._createInitialChildren(transaction, props, context, lazyTree);
      mountImage = lazyTree;
    } else {
      var tagOpen = this._createOpenTagMarkupAndPutListeners(transaction, props);
      var tagContent = this._createContentMarkup(transaction, props, context);
      if (!tagContent && omittedCloseTags[this._tag]) {
        mountImage = tagOpen + '/>';
      } else {
        mountImage = tagOpen + '>' + tagContent + '</' + this._currentElement.type + '>';
      }
    }

    switch (this._tag) {
      case 'input':
        transaction.getReactMountReady().enqueue(inputPostMount, this);
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
        }
        break;
      case 'textarea':
        transaction.getReactMountReady().enqueue(textareaPostMount, this);
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
        }
        break;
      case 'select':
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
        }
        break;
      case 'button':
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
        }
        break;
      case 'option':
        transaction.getReactMountReady().enqueue(optionPostMount, this);
        break;
    }

    return mountImage;
  },

  /**
   * Creates markup for the open tag and all attributes.
   *
   * This method has side effects because events get registered.
   *
   * Iterating over object properties is faster than iterating over arrays.
   * @see http://jsperf.com/obj-vs-arr-iteration
   *
   * @private
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {object} props
   * @return {string} Markup of opening tag.
   */
  _createOpenTagMarkupAndPutListeners: function _createOpenTagMarkupAndPutListeners(transaction, props) {
    var ret = '<' + this._currentElement.type;

    for (var propKey in props) {
      if (!props.hasOwnProperty(propKey)) {
        continue;
      }
      var propValue = props[propKey];
      if (propValue == null) {
        continue;
      }
      if (registrationNameModules.hasOwnProperty(propKey)) {
        if (propValue) {
          enqueuePutListener(this, propKey, propValue, transaction);
        }
      } else {
        if (propKey === STYLE) {
          if (propValue) {
            if (process.env.NODE_ENV !== 'production') {
              // See `_updateDOMProperties`. style block
              this._previousStyle = propValue;
            }
            propValue = this._previousStyleCopy = _assign({}, props.style);
          }
          propValue = CSSPropertyOperations.createMarkupForStyles(propValue, this);
        }
        var markup = null;
        if (this._tag != null && isCustomComponent(this._tag, props)) {
          if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
            markup = DOMPropertyOperations.createMarkupForCustomAttribute(propKey, propValue);
          }
        } else {
          markup = DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
        }
        if (markup) {
          ret += ' ' + markup;
        }
      }
    }

    // For static pages, no need to put React ID and checksum. Saves lots of
    // bytes.
    if (transaction.renderToStaticMarkup) {
      return ret;
    }

    if (!this._hostParent) {
      ret += ' ' + DOMPropertyOperations.createMarkupForRoot();
    }
    ret += ' ' + DOMPropertyOperations.createMarkupForID(this._domID);
    return ret;
  },

  /**
   * Creates markup for the content between the tags.
   *
   * @private
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {object} props
   * @param {object} context
   * @return {string} Content markup.
   */
  _createContentMarkup: function _createContentMarkup(transaction, props, context) {
    var ret = '';

    // Intentional use of != to avoid catching zero/false.
    var innerHTML = props.dangerouslySetInnerHTML;
    if (innerHTML != null) {
      if (innerHTML.__html != null) {
        ret = innerHTML.__html;
      }
    } else {
      var contentToUse = CONTENT_TYPES[_typeof(props.children)] ? props.children : null;
      var childrenToUse = contentToUse != null ? null : props.children;
      if (contentToUse != null) {
        // TODO: Validate that text is allowed as a child of this node
        ret = escapeTextContentForBrowser(contentToUse);
        if (process.env.NODE_ENV !== 'production') {
          setAndValidateContentChildDev.call(this, contentToUse);
        }
      } else if (childrenToUse != null) {
        var mountImages = this.mountChildren(childrenToUse, transaction, context);
        ret = mountImages.join('');
      }
    }
    if (newlineEatingTags[this._tag] && ret.charAt(0) === '\n') {
      // text/html ignores the first character in these tags if it's a newline
      // Prefer to break application/xml over text/html (for now) by adding
      // a newline specifically to get eaten by the parser. (Alternately for
      // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
      // \r is normalized out by HTMLTextAreaElement#value.)
      // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
      // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
      // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
      // See: Parsing of "textarea" "listing" and "pre" elements
      //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
      return '\n' + ret;
    } else {
      return ret;
    }
  },

  _createInitialChildren: function _createInitialChildren(transaction, props, context, lazyTree) {
    // Intentional use of != to avoid catching zero/false.
    var innerHTML = props.dangerouslySetInnerHTML;
    if (innerHTML != null) {
      if (innerHTML.__html != null) {
        DOMLazyTree.queueHTML(lazyTree, innerHTML.__html);
      }
    } else {
      var contentToUse = CONTENT_TYPES[_typeof(props.children)] ? props.children : null;
      var childrenToUse = contentToUse != null ? null : props.children;
      // TODO: Validate that text is allowed as a child of this node
      if (contentToUse != null) {
        // Avoid setting textContent when the text is empty. In IE11 setting
        // textContent on a text area will cause the placeholder to not
        // show within the textarea until it has been focused and blurred again.
        // https://github.com/facebook/react/issues/6731#issuecomment-254874553
        if (contentToUse !== '') {
          if (process.env.NODE_ENV !== 'production') {
            setAndValidateContentChildDev.call(this, contentToUse);
          }
          DOMLazyTree.queueText(lazyTree, contentToUse);
        }
      } else if (childrenToUse != null) {
        var mountImages = this.mountChildren(childrenToUse, transaction, context);
        for (var i = 0; i < mountImages.length; i++) {
          DOMLazyTree.queueChild(lazyTree, mountImages[i]);
        }
      }
    }
  },

  /**
   * Receives a next element and updates the component.
   *
   * @internal
   * @param {ReactElement} nextElement
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {object} context
   */
  receiveComponent: function receiveComponent(nextElement, transaction, context) {
    var prevElement = this._currentElement;
    this._currentElement = nextElement;
    this.updateComponent(transaction, prevElement, nextElement, context);
  },

  /**
   * Updates a DOM component after it has already been allocated and
   * attached to the DOM. Reconciles the root DOM node, then recurses.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {ReactElement} prevElement
   * @param {ReactElement} nextElement
   * @internal
   * @overridable
   */
  updateComponent: function updateComponent(transaction, prevElement, nextElement, context) {
    var lastProps = prevElement.props;
    var nextProps = this._currentElement.props;

    switch (this._tag) {
      case 'input':
        lastProps = ReactDOMInput.getHostProps(this, lastProps);
        nextProps = ReactDOMInput.getHostProps(this, nextProps);
        break;
      case 'option':
        lastProps = ReactDOMOption.getHostProps(this, lastProps);
        nextProps = ReactDOMOption.getHostProps(this, nextProps);
        break;
      case 'select':
        lastProps = ReactDOMSelect.getHostProps(this, lastProps);
        nextProps = ReactDOMSelect.getHostProps(this, nextProps);
        break;
      case 'textarea':
        lastProps = ReactDOMTextarea.getHostProps(this, lastProps);
        nextProps = ReactDOMTextarea.getHostProps(this, nextProps);
        break;
    }

    assertValidProps(this, nextProps);
    this._updateDOMProperties(lastProps, nextProps, transaction);
    this._updateDOMChildren(lastProps, nextProps, transaction, context);

    switch (this._tag) {
      case 'input':
        // Update the wrapper around inputs *after* updating props. This has to
        // happen after `_updateDOMProperties`. Otherwise HTML5 input validations
        // raise warnings and prevent the new value from being assigned.
        ReactDOMInput.updateWrapper(this);
        break;
      case 'textarea':
        ReactDOMTextarea.updateWrapper(this);
        break;
      case 'select':
        // <select> value update needs to occur after <option> children
        // reconciliation
        transaction.getReactMountReady().enqueue(postUpdateSelectWrapper, this);
        break;
    }
  },

  /**
   * Reconciles the properties by detecting differences in property values and
   * updating the DOM as necessary. This function is probably the single most
   * critical path for performance optimization.
   *
   * TODO: Benchmark whether checking for changed values in memory actually
   *       improves performance (especially statically positioned elements).
   * TODO: Benchmark the effects of putting this at the top since 99% of props
   *       do not change for a given reconciliation.
   * TODO: Benchmark areas that can be improved with caching.
   *
   * @private
   * @param {object} lastProps
   * @param {object} nextProps
   * @param {?DOMElement} node
   */
  _updateDOMProperties: function _updateDOMProperties(lastProps, nextProps, transaction) {
    var propKey;
    var styleName;
    var styleUpdates;
    for (propKey in lastProps) {
      if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
        continue;
      }
      if (propKey === STYLE) {
        var lastStyle = this._previousStyleCopy;
        for (styleName in lastStyle) {
          if (lastStyle.hasOwnProperty(styleName)) {
            styleUpdates = styleUpdates || {};
            styleUpdates[styleName] = '';
          }
        }
        this._previousStyleCopy = null;
      } else if (registrationNameModules.hasOwnProperty(propKey)) {
        if (lastProps[propKey]) {
          // Only call deleteListener if there was a listener previously or
          // else willDeleteListener gets called when there wasn't actually a
          // listener (e.g., onClick={null})
          deleteListener(this, propKey);
        }
      } else if (isCustomComponent(this._tag, lastProps)) {
        if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
          DOMPropertyOperations.deleteValueForAttribute(getNode(this), propKey);
        }
      } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
        DOMPropertyOperations.deleteValueForProperty(getNode(this), propKey);
      }
    }
    for (propKey in nextProps) {
      var nextProp = nextProps[propKey];
      var lastProp = propKey === STYLE ? this._previousStyleCopy : lastProps != null ? lastProps[propKey] : undefined;
      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
        continue;
      }
      if (propKey === STYLE) {
        if (nextProp) {
          if (process.env.NODE_ENV !== 'production') {
            checkAndWarnForMutatedStyle(this._previousStyleCopy, this._previousStyle, this);
            this._previousStyle = nextProp;
          }
          nextProp = this._previousStyleCopy = _assign({}, nextProp);
        } else {
          this._previousStyleCopy = null;
        }
        if (lastProp) {
          // Unset styles on `lastProp` but not on `nextProp`.
          for (styleName in lastProp) {
            if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = '';
            }
          }
          // Update styles that changed since `lastProp`.
          for (styleName in nextProp) {
            if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = nextProp[styleName];
            }
          }
        } else {
          // Relies on `updateStylesByID` not mutating `styleUpdates`.
          styleUpdates = nextProp;
        }
      } else if (registrationNameModules.hasOwnProperty(propKey)) {
        if (nextProp) {
          enqueuePutListener(this, propKey, nextProp, transaction);
        } else if (lastProp) {
          deleteListener(this, propKey);
        }
      } else if (isCustomComponent(this._tag, nextProps)) {
        if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
          DOMPropertyOperations.setValueForAttribute(getNode(this), propKey, nextProp);
        }
      } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
        var node = getNode(this);
        // If we're updating to null or undefined, we should remove the property
        // from the DOM node instead of inadvertently setting to a string. This
        // brings us in line with the same behavior we have on initial render.
        if (nextProp != null) {
          DOMPropertyOperations.setValueForProperty(node, propKey, nextProp);
        } else {
          DOMPropertyOperations.deleteValueForProperty(node, propKey);
        }
      }
    }
    if (styleUpdates) {
      CSSPropertyOperations.setValueForStyles(getNode(this), styleUpdates, this);
    }
  },

  /**
   * Reconciles the children with the various properties that affect the
   * children content.
   *
   * @param {object} lastProps
   * @param {object} nextProps
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   */
  _updateDOMChildren: function _updateDOMChildren(lastProps, nextProps, transaction, context) {
    var lastContent = CONTENT_TYPES[_typeof(lastProps.children)] ? lastProps.children : null;
    var nextContent = CONTENT_TYPES[_typeof(nextProps.children)] ? nextProps.children : null;

    var lastHtml = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html;
    var nextHtml = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html;

    // Note the use of `!=` which checks for null or undefined.
    var lastChildren = lastContent != null ? null : lastProps.children;
    var nextChildren = nextContent != null ? null : nextProps.children;

    // If we're switching from children to content/html or vice versa, remove
    // the old content
    var lastHasContentOrHtml = lastContent != null || lastHtml != null;
    var nextHasContentOrHtml = nextContent != null || nextHtml != null;
    if (lastChildren != null && nextChildren == null) {
      this.updateChildren(null, transaction, context);
    } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
      this.updateTextContent('');
      if (process.env.NODE_ENV !== 'production') {
        ReactInstrumentation.debugTool.onSetChildren(this._debugID, []);
      }
    }

    if (nextContent != null) {
      if (lastContent !== nextContent) {
        this.updateTextContent('' + nextContent);
        if (process.env.NODE_ENV !== 'production') {
          setAndValidateContentChildDev.call(this, nextContent);
        }
      }
    } else if (nextHtml != null) {
      if (lastHtml !== nextHtml) {
        this.updateMarkup('' + nextHtml);
      }
      if (process.env.NODE_ENV !== 'production') {
        ReactInstrumentation.debugTool.onSetChildren(this._debugID, []);
      }
    } else if (nextChildren != null) {
      if (process.env.NODE_ENV !== 'production') {
        setAndValidateContentChildDev.call(this, null);
      }

      this.updateChildren(nextChildren, transaction, context);
    }
  },

  getHostNode: function getHostNode() {
    return getNode(this);
  },

  /**
   * Destroys all event registrations for this instance. Does not remove from
   * the DOM. That must be done by the parent.
   *
   * @internal
   */
  unmountComponent: function unmountComponent(safely) {
    switch (this._tag) {
      case 'audio':
      case 'form':
      case 'iframe':
      case 'img':
      case 'link':
      case 'object':
      case 'source':
      case 'video':
        var listeners = this._wrapperState.listeners;
        if (listeners) {
          for (var i = 0; i < listeners.length; i++) {
            listeners[i].remove();
          }
        }
        break;
      case 'html':
      case 'head':
      case 'body':
        /**
         * Components like <html> <head> and <body> can't be removed or added
         * easily in a cross-browser way, however it's valuable to be able to
         * take advantage of React's reconciliation for styling and <title>
         * management. So we just document it and throw in dangerous cases.
         */
        !false ? process.env.NODE_ENV !== 'production' ? invariant(false, '<%s> tried to unmount. Because of cross-browser quirks it is impossible to unmount some top-level components (eg <html>, <head>, and <body>) reliably and efficiently. To fix this, have a single top-level component that never unmounts render these elements.', this._tag) : _prodInvariant('66', this._tag) : void 0;
        break;
    }

    this.unmountChildren(safely);
    ReactDOMComponentTree.uncacheNode(this);
    EventPluginHub.deleteAllListeners(this);
    this._rootNodeID = 0;
    this._domID = 0;
    this._wrapperState = null;

    if (process.env.NODE_ENV !== 'production') {
      setAndValidateContentChildDev.call(this, null);
    }
  },

  getPublicInstance: function getPublicInstance() {
    return getNode(this);
  }

};

_assign(ReactDOMComponent.prototype, ReactDOMComponent.Mixin, ReactMultiChild.Mixin);

module.exports = ReactDOMComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9SZWFjdERPTUNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJfcHJvZEludmFyaWFudCIsInJlcXVpcmUiLCJfYXNzaWduIiwiQXV0b0ZvY3VzVXRpbHMiLCJDU1NQcm9wZXJ0eU9wZXJhdGlvbnMiLCJET01MYXp5VHJlZSIsIkRPTU5hbWVzcGFjZXMiLCJET01Qcm9wZXJ0eSIsIkRPTVByb3BlcnR5T3BlcmF0aW9ucyIsIkV2ZW50UGx1Z2luSHViIiwiRXZlbnRQbHVnaW5SZWdpc3RyeSIsIlJlYWN0QnJvd3NlckV2ZW50RW1pdHRlciIsIlJlYWN0RE9NQ29tcG9uZW50RmxhZ3MiLCJSZWFjdERPTUNvbXBvbmVudFRyZWUiLCJSZWFjdERPTUlucHV0IiwiUmVhY3RET01PcHRpb24iLCJSZWFjdERPTVNlbGVjdCIsIlJlYWN0RE9NVGV4dGFyZWEiLCJSZWFjdEluc3RydW1lbnRhdGlvbiIsIlJlYWN0TXVsdGlDaGlsZCIsIlJlYWN0U2VydmVyUmVuZGVyaW5nVHJhbnNhY3Rpb24iLCJlbXB0eUZ1bmN0aW9uIiwiZXNjYXBlVGV4dENvbnRlbnRGb3JCcm93c2VyIiwiaW52YXJpYW50IiwiaXNFdmVudFN1cHBvcnRlZCIsInNoYWxsb3dFcXVhbCIsInZhbGlkYXRlRE9NTmVzdGluZyIsIndhcm5pbmciLCJGbGFncyIsImRlbGV0ZUxpc3RlbmVyIiwiZ2V0Tm9kZSIsImdldE5vZGVGcm9tSW5zdGFuY2UiLCJsaXN0ZW5UbyIsInJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzIiwiQ09OVEVOVF9UWVBFUyIsIlNUWUxFIiwiSFRNTCIsIlJFU0VSVkVEX1BST1BTIiwiY2hpbGRyZW4iLCJkYW5nZXJvdXNseVNldElubmVySFRNTCIsInN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZyIsIkRPQ19GUkFHTUVOVF9UWVBFIiwiZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtIiwiaW50ZXJuYWxJbnN0YW5jZSIsIm93bmVyIiwiX2N1cnJlbnRFbGVtZW50IiwiX293bmVyIiwibmFtZSIsImdldE5hbWUiLCJmcmllbmRseVN0cmluZ2lmeSIsIm9iaiIsIkFycmF5IiwiaXNBcnJheSIsIm1hcCIsImpvaW4iLCJwYWlycyIsImtleSIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImtleUVzY2FwZWQiLCJ0ZXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsInB1c2giLCJTdHJpbmciLCJzdHlsZU11dGF0aW9uV2FybmluZyIsImNoZWNrQW5kV2FybkZvck11dGF0ZWRTdHlsZSIsInN0eWxlMSIsInN0eWxlMiIsImNvbXBvbmVudCIsImNvbXBvbmVudE5hbWUiLCJfdGFnIiwib3duZXJOYW1lIiwiaGFzaCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImFzc2VydFZhbGlkUHJvcHMiLCJwcm9wcyIsInZvaWRFbGVtZW50VGFncyIsImlubmVySFRNTCIsImNvbnRlbnRFZGl0YWJsZSIsIm9uRm9jdXNJbiIsIm9uRm9jdXNPdXQiLCJzdHlsZSIsImVucXVldWVQdXRMaXN0ZW5lciIsImluc3QiLCJyZWdpc3RyYXRpb25OYW1lIiwibGlzdGVuZXIiLCJ0cmFuc2FjdGlvbiIsImNvbnRhaW5lckluZm8iLCJfaG9zdENvbnRhaW5lckluZm8iLCJpc0RvY3VtZW50RnJhZ21lbnQiLCJfbm9kZSIsIm5vZGVUeXBlIiwiZG9jIiwiX293bmVyRG9jdW1lbnQiLCJnZXRSZWFjdE1vdW50UmVhZHkiLCJlbnF1ZXVlIiwicHV0TGlzdGVuZXIiLCJsaXN0ZW5lclRvUHV0IiwiaW5wdXRQb3N0TW91bnQiLCJwb3N0TW91bnRXcmFwcGVyIiwidGV4dGFyZWFQb3N0TW91bnQiLCJvcHRpb25Qb3N0TW91bnQiLCJzZXRBbmRWYWxpZGF0ZUNvbnRlbnRDaGlsZERldiIsImNvbnRlbnQiLCJoYXNFeGlzdGluZ0NvbnRlbnQiLCJfY29udGVudERlYnVnSUQiLCJkZWJ1Z0lEIiwiX2RlYnVnSUQiLCJjb250ZW50RGVidWdJRCIsImRlYnVnVG9vbCIsIm9uVW5tb3VudENvbXBvbmVudCIsIl9hbmNlc3RvckluZm8iLCJvbkJlZm9yZVVwZGF0ZUNvbXBvbmVudCIsIm9uVXBkYXRlQ29tcG9uZW50Iiwib25CZWZvcmVNb3VudENvbXBvbmVudCIsIm9uTW91bnRDb21wb25lbnQiLCJvblNldENoaWxkcmVuIiwibWVkaWFFdmVudHMiLCJ0b3BBYm9ydCIsInRvcENhblBsYXkiLCJ0b3BDYW5QbGF5VGhyb3VnaCIsInRvcER1cmF0aW9uQ2hhbmdlIiwidG9wRW1wdGllZCIsInRvcEVuY3J5cHRlZCIsInRvcEVuZGVkIiwidG9wRXJyb3IiLCJ0b3BMb2FkZWREYXRhIiwidG9wTG9hZGVkTWV0YWRhdGEiLCJ0b3BMb2FkU3RhcnQiLCJ0b3BQYXVzZSIsInRvcFBsYXkiLCJ0b3BQbGF5aW5nIiwidG9wUHJvZ3Jlc3MiLCJ0b3BSYXRlQ2hhbmdlIiwidG9wU2Vla2VkIiwidG9wU2Vla2luZyIsInRvcFN0YWxsZWQiLCJ0b3BTdXNwZW5kIiwidG9wVGltZVVwZGF0ZSIsInRvcFZvbHVtZUNoYW5nZSIsInRvcFdhaXRpbmciLCJ0cmFwQnViYmxlZEV2ZW50c0xvY2FsIiwiX3Jvb3ROb2RlSUQiLCJub2RlIiwiX3dyYXBwZXJTdGF0ZSIsImxpc3RlbmVycyIsInRyYXBCdWJibGVkRXZlbnQiLCJldmVudCIsInBvc3RVcGRhdGVTZWxlY3RXcmFwcGVyIiwicG9zdFVwZGF0ZVdyYXBwZXIiLCJvbWl0dGVkQ2xvc2VUYWdzIiwibmV3bGluZUVhdGluZ1RhZ3MiLCJWQUxJRF9UQUdfUkVHRVgiLCJ2YWxpZGF0ZWRUYWdDYWNoZSIsInZhbGlkYXRlRGFuZ2Vyb3VzVGFnIiwidGFnIiwiaXNDdXN0b21Db21wb25lbnQiLCJ0YWdOYW1lIiwiaW5kZXhPZiIsImlzIiwiZ2xvYmFsSWRDb3VudGVyIiwiUmVhY3RET01Db21wb25lbnQiLCJlbGVtZW50IiwidHlwZSIsInRvTG93ZXJDYXNlIiwiX25hbWVzcGFjZVVSSSIsIl9yZW5kZXJlZENoaWxkcmVuIiwiX3ByZXZpb3VzU3R5bGUiLCJfcHJldmlvdXNTdHlsZUNvcHkiLCJfaG9zdE5vZGUiLCJfaG9zdFBhcmVudCIsIl9kb21JRCIsIl90b3BMZXZlbFdyYXBwZXIiLCJfZmxhZ3MiLCJkaXNwbGF5TmFtZSIsIk1peGluIiwibW91bnRDb21wb25lbnQiLCJob3N0UGFyZW50IiwiaG9zdENvbnRhaW5lckluZm8iLCJjb250ZXh0IiwiX2lkQ291bnRlciIsIm1vdW50V3JhcHBlciIsImdldEhvc3RQcm9wcyIsIm5hbWVzcGFjZVVSSSIsInBhcmVudFRhZyIsInN2ZyIsImh0bWwiLCJtYXRobWwiLCJwYXJlbnRJbmZvIiwidXBkYXRlZEFuY2VzdG9ySW5mbyIsIm1vdW50SW1hZ2UiLCJ1c2VDcmVhdGVFbGVtZW50Iiwib3duZXJEb2N1bWVudCIsImVsIiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsInJlbW92ZUNoaWxkIiwiZmlyc3RDaGlsZCIsImNyZWF0ZUVsZW1lbnROUyIsInByZWNhY2hlTm9kZSIsImhhc0NhY2hlZENoaWxkTm9kZXMiLCJzZXRBdHRyaWJ1dGVGb3JSb290IiwiX3VwZGF0ZURPTVByb3BlcnRpZXMiLCJsYXp5VHJlZSIsIl9jcmVhdGVJbml0aWFsQ2hpbGRyZW4iLCJ0YWdPcGVuIiwiX2NyZWF0ZU9wZW5UYWdNYXJrdXBBbmRQdXRMaXN0ZW5lcnMiLCJ0YWdDb250ZW50IiwiX2NyZWF0ZUNvbnRlbnRNYXJrdXAiLCJhdXRvRm9jdXMiLCJmb2N1c0RPTUNvbXBvbmVudCIsInJldCIsInByb3BLZXkiLCJwcm9wVmFsdWUiLCJjcmVhdGVNYXJrdXBGb3JTdHlsZXMiLCJtYXJrdXAiLCJjcmVhdGVNYXJrdXBGb3JDdXN0b21BdHRyaWJ1dGUiLCJjcmVhdGVNYXJrdXBGb3JQcm9wZXJ0eSIsInJlbmRlclRvU3RhdGljTWFya3VwIiwiY3JlYXRlTWFya3VwRm9yUm9vdCIsImNyZWF0ZU1hcmt1cEZvcklEIiwiX19odG1sIiwiY29udGVudFRvVXNlIiwiY2hpbGRyZW5Ub1VzZSIsIm1vdW50SW1hZ2VzIiwibW91bnRDaGlsZHJlbiIsImNoYXJBdCIsInF1ZXVlSFRNTCIsInF1ZXVlVGV4dCIsImkiLCJsZW5ndGgiLCJxdWV1ZUNoaWxkIiwicmVjZWl2ZUNvbXBvbmVudCIsIm5leHRFbGVtZW50IiwicHJldkVsZW1lbnQiLCJ1cGRhdGVDb21wb25lbnQiLCJsYXN0UHJvcHMiLCJuZXh0UHJvcHMiLCJfdXBkYXRlRE9NQ2hpbGRyZW4iLCJ1cGRhdGVXcmFwcGVyIiwic3R5bGVOYW1lIiwic3R5bGVVcGRhdGVzIiwibGFzdFN0eWxlIiwiZGVsZXRlVmFsdWVGb3JBdHRyaWJ1dGUiLCJwcm9wZXJ0aWVzIiwiaXNDdXN0b21BdHRyaWJ1dGUiLCJkZWxldGVWYWx1ZUZvclByb3BlcnR5IiwibmV4dFByb3AiLCJsYXN0UHJvcCIsInVuZGVmaW5lZCIsInNldFZhbHVlRm9yQXR0cmlidXRlIiwic2V0VmFsdWVGb3JQcm9wZXJ0eSIsInNldFZhbHVlRm9yU3R5bGVzIiwibGFzdENvbnRlbnQiLCJuZXh0Q29udGVudCIsImxhc3RIdG1sIiwibmV4dEh0bWwiLCJsYXN0Q2hpbGRyZW4iLCJuZXh0Q2hpbGRyZW4iLCJsYXN0SGFzQ29udGVudE9ySHRtbCIsIm5leHRIYXNDb250ZW50T3JIdG1sIiwidXBkYXRlQ2hpbGRyZW4iLCJ1cGRhdGVUZXh0Q29udGVudCIsInVwZGF0ZU1hcmt1cCIsImdldEhvc3ROb2RlIiwidW5tb3VudENvbXBvbmVudCIsInNhZmVseSIsInJlbW92ZSIsInVubW91bnRDaGlsZHJlbiIsInVuY2FjaGVOb2RlIiwiZGVsZXRlQWxsTGlzdGVuZXJzIiwiZ2V0UHVibGljSW5zdGFuY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBOzs7O0FBRUEsSUFBSUEsaUJBQWlCQyxRQUFRLHNCQUFSLENBQXJCO0FBQUEsSUFDSUMsVUFBVUQsUUFBUSxlQUFSLENBRGQ7O0FBR0EsSUFBSUUsaUJBQWlCRixRQUFRLGtCQUFS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UDtBQUNEOztBQTVsQnVCLENBQTFCOztBQWdtQkE1QixRQUFRb0ssa0JBQWtCNUcsU0FBMUIsRUFBcUM0RyxrQkFBa0JjLEtBQXZELEVBQThEakssZ0JBQWdCaUssS0FBOUU7O0FBRUFpRyxPQUFPQyxPQUFQLEdBQWlCaEgsaUJBQWpCIiwiZmlsZSI6IlJlYWN0RE9NQ29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbi8qIGdsb2JhbCBoYXNPd25Qcm9wZXJ0eTp0cnVlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKSxcbiAgICBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgQXV0b0ZvY3VzVXRpbHMgPSByZXF1aXJlKCcuL0F1dG9Gb2N1c1V0aWxzJyk7XG52YXIgQ1NTUHJvcGVydHlPcGVyYXRpb25zID0gcmVxdWlyZSgnLi9DU1NQcm9wZXJ0eU9wZXJhdGlvbnMnKTtcbnZhciBET01MYXp5VHJlZSA9IHJlcXVpcmUoJy4vRE9NTGF6eVRyZWUnKTtcbnZhciBET01OYW1lc3BhY2VzID0gcmVxdWlyZSgnLi9ET01OYW1lc3BhY2VzJyk7XG52YXIgRE9NUHJvcGVydHkgPSByZXF1aXJlKCcuL0RPTVByb3BlcnR5Jyk7XG52YXIgRE9NUHJvcGVydHlPcGVyYXRpb25zID0gcmVxdWlyZSgnLi9ET01Qcm9wZXJ0eU9wZXJhdGlvbnMnKTtcbnZhciBFdmVudFBsdWdpbkh1YiA9IHJlcXVpcmUoJy4vRXZlbnRQbHVnaW5IdWInKTtcbnZhciBFdmVudFBsdWdpblJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi9FdmVudFBsdWdpblJlZ2lzdHJ5Jyk7XG52YXIgUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnLi9SZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXInKTtcbnZhciBSZWFjdERPTUNvbXBvbmVudEZsYWdzID0gcmVxdWlyZSgnLi9SZWFjdERPTUNvbXBvbmVudEZsYWdzJyk7XG52YXIgUmVhY3RET01Db21wb25lbnRUcmVlID0gcmVxdWlyZSgnLi9SZWFjdERPTUNvbXBvbmVudFRyZWUnKTtcbnZhciBSZWFjdERPTUlucHV0ID0gcmVxdWlyZSgnLi9SZWFjdERPTUlucHV0Jyk7XG52YXIgUmVhY3RET01PcHRpb24gPSByZXF1aXJlKCcuL1JlYWN0RE9NT3B0aW9uJyk7XG52YXIgUmVhY3RET01TZWxlY3QgPSByZXF1aXJlKCcuL1JlYWN0RE9NU2VsZWN0Jyk7XG52YXIgUmVhY3RET01UZXh0YXJlYSA9IHJlcXVpcmUoJy4vUmVhY3RET01UZXh0YXJlYScpO1xudmFyIFJlYWN0SW5zdHJ1bWVudGF0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xudmFyIFJlYWN0TXVsdGlDaGlsZCA9IHJlcXVpcmUoJy4vUmVhY3RNdWx0aUNoaWxkJyk7XG52YXIgUmVhY3RTZXJ2ZXJSZW5kZXJpbmdUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vUmVhY3RTZXJ2ZXJSZW5kZXJpbmdUcmFuc2FjdGlvbicpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBlc2NhcGVUZXh0Q29udGVudEZvckJyb3dzZXIgPSByZXF1aXJlKCcuL2VzY2FwZVRleHRDb250ZW50Rm9yQnJvd3NlcicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIGlzRXZlbnRTdXBwb3J0ZWQgPSByZXF1aXJlKCcuL2lzRXZlbnRTdXBwb3J0ZWQnKTtcbnZhciBzaGFsbG93RXF1YWwgPSByZXF1aXJlKCdmYmpzL2xpYi9zaGFsbG93RXF1YWwnKTtcbnZhciB2YWxpZGF0ZURPTU5lc3RpbmcgPSByZXF1aXJlKCcuL3ZhbGlkYXRlRE9NTmVzdGluZycpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBGbGFncyA9IFJlYWN0RE9NQ29tcG9uZW50RmxhZ3M7XG52YXIgZGVsZXRlTGlzdGVuZXIgPSBFdmVudFBsdWdpbkh1Yi5kZWxldGVMaXN0ZW5lcjtcbnZhciBnZXROb2RlID0gUmVhY3RET01Db21wb25lbnRUcmVlLmdldE5vZGVGcm9tSW5zdGFuY2U7XG52YXIgbGlzdGVuVG8gPSBSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIubGlzdGVuVG87XG52YXIgcmVnaXN0cmF0aW9uTmFtZU1vZHVsZXMgPSBFdmVudFBsdWdpblJlZ2lzdHJ5LnJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzO1xuXG4vLyBGb3IgcXVpY2tseSBtYXRjaGluZyBjaGlsZHJlbiB0eXBlLCB0byB0ZXN0IGlmIGNhbiBiZSB0cmVhdGVkIGFzIGNvbnRlbnQuXG52YXIgQ09OVEVOVF9UWVBFUyA9IHsgJ3N0cmluZyc6IHRydWUsICdudW1iZXInOiB0cnVlIH07XG5cbnZhciBTVFlMRSA9ICdzdHlsZSc7XG52YXIgSFRNTCA9ICdfX2h0bWwnO1xudmFyIFJFU0VSVkVEX1BST1BTID0ge1xuICBjaGlsZHJlbjogbnVsbCxcbiAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IG51bGwsXG4gIHN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZzogbnVsbFxufTtcblxuLy8gTm9kZSB0eXBlIGZvciBkb2N1bWVudCBmcmFnbWVudHMgKE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSkuXG52YXIgRE9DX0ZSQUdNRU5UX1RZUEUgPSAxMTtcblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKGludGVybmFsSW5zdGFuY2UpIHtcbiAgaWYgKGludGVybmFsSW5zdGFuY2UpIHtcbiAgICB2YXIgb3duZXIgPSBpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudC5fb3duZXIgfHwgbnVsbDtcbiAgICBpZiAob3duZXIpIHtcbiAgICAgIHZhciBuYW1lID0gb3duZXIuZ2V0TmFtZSgpO1xuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICcgVGhpcyBET00gbm9kZSB3YXMgcmVuZGVyZWQgYnkgYCcgKyBuYW1lICsgJ2AuJztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBmcmllbmRseVN0cmluZ2lmeShvYmopIHtcbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgcmV0dXJuICdbJyArIG9iai5tYXAoZnJpZW5kbHlTdHJpbmdpZnkpLmpvaW4oJywgJykgKyAnXSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYWlycyA9IFtdO1xuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgIHZhciBrZXlFc2NhcGVkID0gL15bYS16JF9dW1xcdyRfXSokL2kudGVzdChrZXkpID8ga2V5IDogSlNPTi5zdHJpbmdpZnkoa2V5KTtcbiAgICAgICAgICBwYWlycy5wdXNoKGtleUVzY2FwZWQgKyAnOiAnICsgZnJpZW5kbHlTdHJpbmdpZnkob2JqW2tleV0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICd7JyArIHBhaXJzLmpvaW4oJywgJykgKyAnfSc7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiAnW2Z1bmN0aW9uIG9iamVjdF0nO1xuICB9XG4gIC8vIERpZmZlcnMgZnJvbSBKU09OLnN0cmluZ2lmeSBpbiB0aGF0IHVuZGVmaW5lZCBiZWNhdXNlIHVuZGVmaW5lZCBhbmQgdGhhdFxuICAvLyBpbmYgYW5kIG5hbiBkb24ndCBiZWNvbWUgbnVsbFxuICByZXR1cm4gU3RyaW5nKG9iaik7XG59XG5cbnZhciBzdHlsZU11dGF0aW9uV2FybmluZyA9IHt9O1xuXG5mdW5jdGlvbiBjaGVja0FuZFdhcm5Gb3JNdXRhdGVkU3R5bGUoc3R5bGUxLCBzdHlsZTIsIGNvbXBvbmVudCkge1xuICBpZiAoc3R5bGUxID09IG51bGwgfHwgc3R5bGUyID09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHNoYWxsb3dFcXVhbChzdHlsZTEsIHN0eWxlMikpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudC5fdGFnO1xuICB2YXIgb3duZXIgPSBjb21wb25lbnQuX2N1cnJlbnRFbGVtZW50Ll9vd25lcjtcbiAgdmFyIG93bmVyTmFtZTtcbiAgaWYgKG93bmVyKSB7XG4gICAgb3duZXJOYW1lID0gb3duZXIuZ2V0TmFtZSgpO1xuICB9XG5cbiAgdmFyIGhhc2ggPSBvd25lck5hbWUgKyAnfCcgKyBjb21wb25lbnROYW1lO1xuXG4gIGlmIChzdHlsZU11dGF0aW9uV2FybmluZy5oYXNPd25Qcm9wZXJ0eShoYXNoKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHN0eWxlTXV0YXRpb25XYXJuaW5nW2hhc2hdID0gdHJ1ZTtcblxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2Alc2Agd2FzIHBhc3NlZCBhIHN0eWxlIG9iamVjdCB0aGF0IGhhcyBwcmV2aW91c2x5IGJlZW4gbXV0YXRlZC4gJyArICdNdXRhdGluZyBgc3R5bGVgIGlzIGRlcHJlY2F0ZWQuIENvbnNpZGVyIGNsb25pbmcgaXQgYmVmb3JlaGFuZC4gQ2hlY2sgJyArICd0aGUgYHJlbmRlcmAgJXMuIFByZXZpb3VzIHN0eWxlOiAlcy4gTXV0YXRlZCBzdHlsZTogJXMuJywgY29tcG9uZW50TmFtZSwgb3duZXIgPyAnb2YgYCcgKyBvd25lck5hbWUgKyAnYCcgOiAndXNpbmcgPCcgKyBjb21wb25lbnROYW1lICsgJz4nLCBmcmllbmRseVN0cmluZ2lmeShzdHlsZTEpLCBmcmllbmRseVN0cmluZ2lmeShzdHlsZTIpKSA6IHZvaWQgMDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50XG4gKiBAcGFyYW0gez9vYmplY3R9IHByb3BzXG4gKi9cbmZ1bmN0aW9uIGFzc2VydFZhbGlkUHJvcHMoY29tcG9uZW50LCBwcm9wcykge1xuICBpZiAoIXByb3BzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIE5vdGUgdGhlIHVzZSBvZiBgPT1gIHdoaWNoIGNoZWNrcyBmb3IgbnVsbCBvciB1bmRlZmluZWQuXG4gIGlmICh2b2lkRWxlbWVudFRhZ3NbY29tcG9uZW50Ll90YWddKSB7XG4gICAgIShwcm9wcy5jaGlsZHJlbiA9PSBudWxsICYmIHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MID09IG51bGwpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzIGlzIGEgdm9pZCBlbGVtZW50IHRhZyBhbmQgbXVzdCBuZWl0aGVyIGhhdmUgYGNoaWxkcmVuYCBub3IgdXNlIGBkYW5nZXJvdXNseVNldElubmVySFRNTGAuJXMnLCBjb21wb25lbnQuX3RhZywgY29tcG9uZW50Ll9jdXJyZW50RWxlbWVudC5fb3duZXIgPyAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mICcgKyBjb21wb25lbnQuX2N1cnJlbnRFbGVtZW50Ll9vd25lci5nZXROYW1lKCkgKyAnLicgOiAnJykgOiBfcHJvZEludmFyaWFudCgnMTM3JywgY29tcG9uZW50Ll90YWcsIGNvbXBvbmVudC5fY3VycmVudEVsZW1lbnQuX293bmVyID8gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiAnICsgY29tcG9uZW50Ll9jdXJyZW50RWxlbWVudC5fb3duZXIuZ2V0TmFtZSgpICsgJy4nIDogJycpIDogdm9pZCAwO1xuICB9XG4gIGlmIChwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCAhPSBudWxsKSB7XG4gICAgIShwcm9wcy5jaGlsZHJlbiA9PSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdDYW4gb25seSBzZXQgb25lIG9mIGBjaGlsZHJlbmAgb3IgYHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MYC4nKSA6IF9wcm9kSW52YXJpYW50KCc2MCcpIDogdm9pZCAwO1xuICAgICEodHlwZW9mIHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MID09PSAnb2JqZWN0JyAmJiBIVE1MIGluIHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdgcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxgIG11c3QgYmUgaW4gdGhlIGZvcm0gYHtfX2h0bWw6IC4uLn1gLiBQbGVhc2UgdmlzaXQgaHR0cHM6Ly9mYi5tZS9yZWFjdC1pbnZhcmlhbnQtZGFuZ2Vyb3VzbHktc2V0LWlubmVyLWh0bWwgZm9yIG1vcmUgaW5mb3JtYXRpb24uJykgOiBfcHJvZEludmFyaWFudCgnNjEnKSA6IHZvaWQgMDtcbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHByb3BzLmlubmVySFRNTCA9PSBudWxsLCAnRGlyZWN0bHkgc2V0dGluZyBwcm9wZXJ0eSBgaW5uZXJIVE1MYCBpcyBub3QgcGVybWl0dGVkLiAnICsgJ0ZvciBtb3JlIGluZm9ybWF0aW9uLCBsb29rdXAgZG9jdW1lbnRhdGlvbiBvbiBgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxgLicpIDogdm9pZCAwO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHByb3BzLnN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZyB8fCAhcHJvcHMuY29udGVudEVkaXRhYmxlIHx8IHByb3BzLmNoaWxkcmVuID09IG51bGwsICdBIGNvbXBvbmVudCBpcyBgY29udGVudEVkaXRhYmxlYCBhbmQgY29udGFpbnMgYGNoaWxkcmVuYCBtYW5hZ2VkIGJ5ICcgKyAnUmVhY3QuIEl0IGlzIG5vdyB5b3VyIHJlc3BvbnNpYmlsaXR5IHRvIGd1YXJhbnRlZSB0aGF0IG5vbmUgb2YgJyArICd0aG9zZSBub2RlcyBhcmUgdW5leHBlY3RlZGx5IG1vZGlmaWVkIG9yIGR1cGxpY2F0ZWQuIFRoaXMgaXMgJyArICdwcm9iYWJseSBub3QgaW50ZW50aW9uYWwuJykgOiB2b2lkIDA7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcocHJvcHMub25Gb2N1c0luID09IG51bGwgJiYgcHJvcHMub25Gb2N1c091dCA9PSBudWxsLCAnUmVhY3QgdXNlcyBvbkZvY3VzIGFuZCBvbkJsdXIgaW5zdGVhZCBvZiBvbkZvY3VzSW4gYW5kIG9uRm9jdXNPdXQuICcgKyAnQWxsIFJlYWN0IGV2ZW50cyBhcmUgbm9ybWFsaXplZCB0byBidWJibGUsIHNvIG9uRm9jdXNJbiBhbmQgb25Gb2N1c091dCAnICsgJ2FyZSBub3QgbmVlZGVkL3N1cHBvcnRlZCBieSBSZWFjdC4nKSA6IHZvaWQgMDtcbiAgfVxuICAhKHByb3BzLnN0eWxlID09IG51bGwgfHwgdHlwZW9mIHByb3BzLnN0eWxlID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnVGhlIGBzdHlsZWAgcHJvcCBleHBlY3RzIGEgbWFwcGluZyBmcm9tIHN0eWxlIHByb3BlcnRpZXMgdG8gdmFsdWVzLCBub3QgYSBzdHJpbmcuIEZvciBleGFtcGxlLCBzdHlsZT17e21hcmdpblJpZ2h0OiBzcGFjaW5nICsgXFwnZW1cXCd9fSB3aGVuIHVzaW5nIEpTWC4lcycsIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bShjb21wb25lbnQpKSA6IF9wcm9kSW52YXJpYW50KCc2MicsIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bShjb21wb25lbnQpKSA6IHZvaWQgMDtcbn1cblxuZnVuY3Rpb24gZW5xdWV1ZVB1dExpc3RlbmVyKGluc3QsIHJlZ2lzdHJhdGlvbk5hbWUsIGxpc3RlbmVyLCB0cmFuc2FjdGlvbikge1xuICBpZiAodHJhbnNhY3Rpb24gaW5zdGFuY2VvZiBSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gSUU4IGhhcyBubyBBUEkgZm9yIGV2ZW50IGNhcHR1cmluZyBhbmQgdGhlIGBvblNjcm9sbGAgZXZlbnQgZG9lc24ndFxuICAgIC8vIGJ1YmJsZS5cbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhyZWdpc3RyYXRpb25OYW1lICE9PSAnb25TY3JvbGwnIHx8IGlzRXZlbnRTdXBwb3J0ZWQoJ3Njcm9sbCcsIHRydWUpLCAnVGhpcyBicm93c2VyIGRvZXNuXFwndCBzdXBwb3J0IHRoZSBgb25TY3JvbGxgIGV2ZW50JykgOiB2b2lkIDA7XG4gIH1cbiAgdmFyIGNvbnRhaW5lckluZm8gPSBpbnN0Ll9ob3N0Q29udGFpbmVySW5mbztcbiAgdmFyIGlzRG9jdW1lbnRGcmFnbWVudCA9IGNvbnRhaW5lckluZm8uX25vZGUgJiYgY29udGFpbmVySW5mby5fbm9kZS5ub2RlVHlwZSA9PT0gRE9DX0ZSQUdNRU5UX1RZUEU7XG4gIHZhciBkb2MgPSBpc0RvY3VtZW50RnJhZ21lbnQgPyBjb250YWluZXJJbmZvLl9ub2RlIDogY29udGFpbmVySW5mby5fb3duZXJEb2N1bWVudDtcbiAgbGlzdGVuVG8ocmVnaXN0cmF0aW9uTmFtZSwgZG9jKTtcbiAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShwdXRMaXN0ZW5lciwge1xuICAgIGluc3Q6IGluc3QsXG4gICAgcmVnaXN0cmF0aW9uTmFtZTogcmVnaXN0cmF0aW9uTmFtZSxcbiAgICBsaXN0ZW5lcjogbGlzdGVuZXJcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHB1dExpc3RlbmVyKCkge1xuICB2YXIgbGlzdGVuZXJUb1B1dCA9IHRoaXM7XG4gIEV2ZW50UGx1Z2luSHViLnB1dExpc3RlbmVyKGxpc3RlbmVyVG9QdXQuaW5zdCwgbGlzdGVuZXJUb1B1dC5yZWdpc3RyYXRpb25OYW1lLCBsaXN0ZW5lclRvUHV0Lmxpc3RlbmVyKTtcbn1cblxuZnVuY3Rpb24gaW5wdXRQb3N0TW91bnQoKSB7XG4gIHZhciBpbnN0ID0gdGhpcztcbiAgUmVhY3RET01JbnB1dC5wb3N0TW91bnRXcmFwcGVyKGluc3QpO1xufVxuXG5mdW5jdGlvbiB0ZXh0YXJlYVBvc3RNb3VudCgpIHtcbiAgdmFyIGluc3QgPSB0aGlzO1xuICBSZWFjdERPTVRleHRhcmVhLnBvc3RNb3VudFdyYXBwZXIoaW5zdCk7XG59XG5cbmZ1bmN0aW9uIG9wdGlvblBvc3RNb3VudCgpIHtcbiAgdmFyIGluc3QgPSB0aGlzO1xuICBSZWFjdERPTU9wdGlvbi5wb3N0TW91bnRXcmFwcGVyKGluc3QpO1xufVxuXG52YXIgc2V0QW5kVmFsaWRhdGVDb250ZW50Q2hpbGREZXYgPSBlbXB0eUZ1bmN0aW9uO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgc2V0QW5kVmFsaWRhdGVDb250ZW50Q2hpbGREZXYgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICAgIHZhciBoYXNFeGlzdGluZ0NvbnRlbnQgPSB0aGlzLl9jb250ZW50RGVidWdJRCAhPSBudWxsO1xuICAgIHZhciBkZWJ1Z0lEID0gdGhpcy5fZGVidWdJRDtcbiAgICAvLyBUaGlzIElEIHJlcHJlc2VudHMgdGhlIGlubGluZWQgY2hpbGQgdGhhdCBoYXMgbm8gYmFja2luZyBpbnN0YW5jZTpcbiAgICB2YXIgY29udGVudERlYnVnSUQgPSAtZGVidWdJRDtcblxuICAgIGlmIChjb250ZW50ID09IG51bGwpIHtcbiAgICAgIGlmIChoYXNFeGlzdGluZ0NvbnRlbnQpIHtcbiAgICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uVW5tb3VudENvbXBvbmVudCh0aGlzLl9jb250ZW50RGVidWdJRCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9jb250ZW50RGVidWdJRCA9IG51bGw7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFsaWRhdGVET01OZXN0aW5nKG51bGwsIFN0cmluZyhjb250ZW50KSwgdGhpcywgdGhpcy5fYW5jZXN0b3JJbmZvKTtcbiAgICB0aGlzLl9jb250ZW50RGVidWdJRCA9IGNvbnRlbnREZWJ1Z0lEO1xuICAgIGlmIChoYXNFeGlzdGluZ0NvbnRlbnQpIHtcbiAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vbkJlZm9yZVVwZGF0ZUNvbXBvbmVudChjb250ZW50RGVidWdJRCwgY29udGVudCk7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25VcGRhdGVDb21wb25lbnQoY29udGVudERlYnVnSUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25CZWZvcmVNb3VudENvbXBvbmVudChjb250ZW50RGVidWdJRCwgY29udGVudCwgZGVidWdJRCk7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25Nb3VudENvbXBvbmVudChjb250ZW50RGVidWdJRCk7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25TZXRDaGlsZHJlbihkZWJ1Z0lELCBbY29udGVudERlYnVnSURdKTtcbiAgICB9XG4gIH07XG59XG5cbi8vIFRoZXJlIGFyZSBzbyBtYW55IG1lZGlhIGV2ZW50cywgaXQgbWFrZXMgc2Vuc2UgdG8ganVzdFxuLy8gbWFpbnRhaW4gYSBsaXN0IHJhdGhlciB0aGFuIGNyZWF0ZSBhIGB0cmFwQnViYmxlZEV2ZW50YCBmb3IgZWFjaFxudmFyIG1lZGlhRXZlbnRzID0ge1xuICB0b3BBYm9ydDogJ2Fib3J0JyxcbiAgdG9wQ2FuUGxheTogJ2NhbnBsYXknLFxuICB0b3BDYW5QbGF5VGhyb3VnaDogJ2NhbnBsYXl0aHJvdWdoJyxcbiAgdG9wRHVyYXRpb25DaGFuZ2U6ICdkdXJhdGlvbmNoYW5nZScsXG4gIHRvcEVtcHRpZWQ6ICdlbXB0aWVkJyxcbiAgdG9wRW5jcnlwdGVkOiAnZW5jcnlwdGVkJyxcbiAgdG9wRW5kZWQ6ICdlbmRlZCcsXG4gIHRvcEVycm9yOiAnZXJyb3InLFxuICB0b3BMb2FkZWREYXRhOiAnbG9hZGVkZGF0YScsXG4gIHRvcExvYWRlZE1ldGFkYXRhOiAnbG9hZGVkbWV0YWRhdGEnLFxuICB0b3BMb2FkU3RhcnQ6ICdsb2Fkc3RhcnQnLFxuICB0b3BQYXVzZTogJ3BhdXNlJyxcbiAgdG9wUGxheTogJ3BsYXknLFxuICB0b3BQbGF5aW5nOiAncGxheWluZycsXG4gIHRvcFByb2dyZXNzOiAncHJvZ3Jlc3MnLFxuICB0b3BSYXRlQ2hhbmdlOiAncmF0ZWNoYW5nZScsXG4gIHRvcFNlZWtlZDogJ3NlZWtlZCcsXG4gIHRvcFNlZWtpbmc6ICdzZWVraW5nJyxcbiAgdG9wU3RhbGxlZDogJ3N0YWxsZWQnLFxuICB0b3BTdXNwZW5kOiAnc3VzcGVuZCcsXG4gIHRvcFRpbWVVcGRhdGU6ICd0aW1ldXBkYXRlJyxcbiAgdG9wVm9sdW1lQ2hhbmdlOiAndm9sdW1lY2hhbmdlJyxcbiAgdG9wV2FpdGluZzogJ3dhaXRpbmcnXG59O1xuXG5mdW5jdGlvbiB0cmFwQnViYmxlZEV2ZW50c0xvY2FsKCkge1xuICB2YXIgaW5zdCA9IHRoaXM7XG4gIC8vIElmIGEgY29tcG9uZW50IHJlbmRlcnMgdG8gbnVsbCBvciBpZiBhbm90aGVyIGNvbXBvbmVudCBmYXRhbHMgYW5kIGNhdXNlc1xuICAvLyB0aGUgc3RhdGUgb2YgdGhlIHRyZWUgdG8gYmUgY29ycnVwdGVkLCBgbm9kZWAgaGVyZSBjYW4gYmUgbnVsbC5cbiAgIWluc3QuX3Jvb3ROb2RlSUQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnTXVzdCBiZSBtb3VudGVkIHRvIHRyYXAgZXZlbnRzJykgOiBfcHJvZEludmFyaWFudCgnNjMnKSA6IHZvaWQgMDtcbiAgdmFyIG5vZGUgPSBnZXROb2RlKGluc3QpO1xuICAhbm9kZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd0cmFwQnViYmxlZEV2ZW50KC4uLik6IFJlcXVpcmVzIG5vZGUgdG8gYmUgcmVuZGVyZWQuJykgOiBfcHJvZEludmFyaWFudCgnNjQnKSA6IHZvaWQgMDtcblxuICBzd2l0Y2ggKGluc3QuX3RhZykge1xuICAgIGNhc2UgJ2lmcmFtZSc6XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIGluc3QuX3dyYXBwZXJTdGF0ZS5saXN0ZW5lcnMgPSBbUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyLnRyYXBCdWJibGVkRXZlbnQoJ3RvcExvYWQnLCAnbG9hZCcsIG5vZGUpXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3ZpZGVvJzpcbiAgICBjYXNlICdhdWRpbyc6XG5cbiAgICAgIGluc3QuX3dyYXBwZXJTdGF0ZS5saXN0ZW5lcnMgPSBbXTtcbiAgICAgIC8vIENyZWF0ZSBsaXN0ZW5lciBmb3IgZWFjaCBtZWRpYSBldmVudFxuICAgICAgZm9yICh2YXIgZXZlbnQgaW4gbWVkaWFFdmVudHMpIHtcbiAgICAgICAgaWYgKG1lZGlhRXZlbnRzLmhhc093blByb3BlcnR5KGV2ZW50KSkge1xuICAgICAgICAgIGluc3QuX3dyYXBwZXJTdGF0ZS5saXN0ZW5lcnMucHVzaChSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIudHJhcEJ1YmJsZWRFdmVudChldmVudCwgbWVkaWFFdmVudHNbZXZlbnRdLCBub2RlKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NvdXJjZSc6XG4gICAgICBpbnN0Ll93cmFwcGVyU3RhdGUubGlzdGVuZXJzID0gW1JlYWN0QnJvd3NlckV2ZW50RW1pdHRlci50cmFwQnViYmxlZEV2ZW50KCd0b3BFcnJvcicsICdlcnJvcicsIG5vZGUpXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2ltZyc6XG4gICAgICBpbnN0Ll93cmFwcGVyU3RhdGUubGlzdGVuZXJzID0gW1JlYWN0QnJvd3NlckV2ZW50RW1pdHRlci50cmFwQnViYmxlZEV2ZW50KCd0b3BFcnJvcicsICdlcnJvcicsIG5vZGUpLCBSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIudHJhcEJ1YmJsZWRFdmVudCgndG9wTG9hZCcsICdsb2FkJywgbm9kZSldO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZm9ybSc6XG4gICAgICBpbnN0Ll93cmFwcGVyU3RhdGUubGlzdGVuZXJzID0gW1JlYWN0QnJvd3NlckV2ZW50RW1pdHRlci50cmFwQnViYmxlZEV2ZW50KCd0b3BSZXNldCcsICdyZXNldCcsIG5vZGUpLCBSZWFjdEJyb3dzZXJFdmVudEVtaXR0ZXIudHJhcEJ1YmJsZWRFdmVudCgndG9wU3VibWl0JywgJ3N1Ym1pdCcsIG5vZGUpXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2lucHV0JzpcbiAgICBjYXNlICdzZWxlY3QnOlxuICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgIGluc3QuX3dyYXBwZXJTdGF0ZS5saXN0ZW5lcnMgPSBbUmVhY3RCcm93c2VyRXZlbnRFbWl0dGVyLnRyYXBCdWJibGVkRXZlbnQoJ3RvcEludmFsaWQnLCAnaW52YWxpZCcsIG5vZGUpXTtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBvc3RVcGRhdGVTZWxlY3RXcmFwcGVyKCkge1xuICBSZWFjdERPTVNlbGVjdC5wb3N0VXBkYXRlV3JhcHBlcih0aGlzKTtcbn1cblxuLy8gRm9yIEhUTUwsIGNlcnRhaW4gdGFncyBzaG91bGQgb21pdCB0aGVpciBjbG9zZSB0YWcuIFdlIGtlZXAgYSB3aGl0ZWxpc3QgZm9yXG4vLyB0aG9zZSBzcGVjaWFsLWNhc2UgdGFncy5cblxudmFyIG9taXR0ZWRDbG9zZVRhZ3MgPSB7XG4gICdhcmVhJzogdHJ1ZSxcbiAgJ2Jhc2UnOiB0cnVlLFxuICAnYnInOiB0cnVlLFxuICAnY29sJzogdHJ1ZSxcbiAgJ2VtYmVkJzogdHJ1ZSxcbiAgJ2hyJzogdHJ1ZSxcbiAgJ2ltZyc6IHRydWUsXG4gICdpbnB1dCc6IHRydWUsXG4gICdrZXlnZW4nOiB0cnVlLFxuICAnbGluayc6IHRydWUsXG4gICdtZXRhJzogdHJ1ZSxcbiAgJ3BhcmFtJzogdHJ1ZSxcbiAgJ3NvdXJjZSc6IHRydWUsXG4gICd0cmFjayc6IHRydWUsXG4gICd3YnInOiB0cnVlXG59O1xuXG52YXIgbmV3bGluZUVhdGluZ1RhZ3MgPSB7XG4gICdsaXN0aW5nJzogdHJ1ZSxcbiAgJ3ByZSc6IHRydWUsXG4gICd0ZXh0YXJlYSc6IHRydWVcbn07XG5cbi8vIEZvciBIVE1MLCBjZXJ0YWluIHRhZ3MgY2Fubm90IGhhdmUgY2hpbGRyZW4uIFRoaXMgaGFzIHRoZSBzYW1lIHB1cnBvc2UgYXNcbi8vIGBvbWl0dGVkQ2xvc2VUYWdzYCBleGNlcHQgdGhhdCBgbWVudWl0ZW1gIHNob3VsZCBzdGlsbCBoYXZlIGl0cyBjbG9zaW5nIHRhZy5cblxudmFyIHZvaWRFbGVtZW50VGFncyA9IF9hc3NpZ24oe1xuICAnbWVudWl0ZW0nOiB0cnVlXG59LCBvbWl0dGVkQ2xvc2VUYWdzKTtcblxuLy8gV2UgYWNjZXB0IGFueSB0YWcgdG8gYmUgcmVuZGVyZWQgYnV0IHNpbmNlIHRoaXMgZ2V0cyBpbmplY3RlZCBpbnRvIGFyYml0cmFyeVxuLy8gSFRNTCwgd2Ugd2FudCB0byBtYWtlIHN1cmUgdGhhdCBpdCdzIGEgc2FmZSB0YWcuXG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMteG1sLyNOVC1OYW1lXG5cbnZhciBWQUxJRF9UQUdfUkVHRVggPSAvXlthLXpBLVpdW2EtekEtWjpfXFwuXFwtXFxkXSokLzsgLy8gU2ltcGxpZmllZCBzdWJzZXRcbnZhciB2YWxpZGF0ZWRUYWdDYWNoZSA9IHt9O1xudmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRGFuZ2Vyb3VzVGFnKHRhZykge1xuICBpZiAoIWhhc093blByb3BlcnR5LmNhbGwodmFsaWRhdGVkVGFnQ2FjaGUsIHRhZykpIHtcbiAgICAhVkFMSURfVEFHX1JFR0VYLnRlc3QodGFnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdJbnZhbGlkIHRhZzogJXMnLCB0YWcpIDogX3Byb2RJbnZhcmlhbnQoJzY1JywgdGFnKSA6IHZvaWQgMDtcbiAgICB2YWxpZGF0ZWRUYWdDYWNoZVt0YWddID0gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0N1c3RvbUNvbXBvbmVudCh0YWdOYW1lLCBwcm9wcykge1xuICByZXR1cm4gdGFnTmFtZS5pbmRleE9mKCctJykgPj0gMCB8fCBwcm9wcy5pcyAhPSBudWxsO1xufVxuXG52YXIgZ2xvYmFsSWRDb3VudGVyID0gMTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFJlYWN0IGNsYXNzIHRoYXQgaXMgaWRlbXBvdGVudCBhbmQgY2FwYWJsZSBvZiBjb250YWluaW5nIG90aGVyXG4gKiBSZWFjdCBjb21wb25lbnRzLiBJdCBhY2NlcHRzIGV2ZW50IGxpc3RlbmVycyBhbmQgRE9NIHByb3BlcnRpZXMgdGhhdCBhcmVcbiAqIHZhbGlkIGFjY29yZGluZyB0byBgRE9NUHJvcGVydHlgLlxuICpcbiAqICAtIEV2ZW50IGxpc3RlbmVyczogYG9uQ2xpY2tgLCBgb25Nb3VzZURvd25gLCBldGMuXG4gKiAgLSBET00gcHJvcGVydGllczogYGNsYXNzTmFtZWAsIGBuYW1lYCwgYHRpdGxlYCwgZXRjLlxuICpcbiAqIFRoZSBgc3R5bGVgIHByb3BlcnR5IGZ1bmN0aW9ucyBkaWZmZXJlbnRseSBmcm9tIHRoZSBET00gQVBJLiBJdCBhY2NlcHRzIGFuXG4gKiBvYmplY3QgbWFwcGluZyBvZiBzdHlsZSBwcm9wZXJ0aWVzIHRvIHZhbHVlcy5cbiAqXG4gKiBAY29uc3RydWN0b3IgUmVhY3RET01Db21wb25lbnRcbiAqIEBleHRlbmRzIFJlYWN0TXVsdGlDaGlsZFxuICovXG5mdW5jdGlvbiBSZWFjdERPTUNvbXBvbmVudChlbGVtZW50KSB7XG4gIHZhciB0YWcgPSBlbGVtZW50LnR5cGU7XG4gIHZhbGlkYXRlRGFuZ2Vyb3VzVGFnKHRhZyk7XG4gIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gZWxlbWVudDtcbiAgdGhpcy5fdGFnID0gdGFnLnRvTG93ZXJDYXNlKCk7XG4gIHRoaXMuX25hbWVzcGFjZVVSSSA9IG51bGw7XG4gIHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW4gPSBudWxsO1xuICB0aGlzLl9wcmV2aW91c1N0eWxlID0gbnVsbDtcbiAgdGhpcy5fcHJldmlvdXNTdHlsZUNvcHkgPSBudWxsO1xuICB0aGlzLl9ob3N0Tm9kZSA9IG51bGw7XG4gIHRoaXMuX2hvc3RQYXJlbnQgPSBudWxsO1xuICB0aGlzLl9yb290Tm9kZUlEID0gMDtcbiAgdGhpcy5fZG9tSUQgPSAwO1xuICB0aGlzLl9ob3N0Q29udGFpbmVySW5mbyA9IG51bGw7XG4gIHRoaXMuX3dyYXBwZXJTdGF0ZSA9IG51bGw7XG4gIHRoaXMuX3RvcExldmVsV3JhcHBlciA9IG51bGw7XG4gIHRoaXMuX2ZsYWdzID0gMDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB0aGlzLl9hbmNlc3RvckluZm8gPSBudWxsO1xuICAgIHNldEFuZFZhbGlkYXRlQ29udGVudENoaWxkRGV2LmNhbGwodGhpcywgbnVsbCk7XG4gIH1cbn1cblxuUmVhY3RET01Db21wb25lbnQuZGlzcGxheU5hbWUgPSAnUmVhY3RET01Db21wb25lbnQnO1xuXG5SZWFjdERPTUNvbXBvbmVudC5NaXhpbiA9IHtcblxuICAvKipcbiAgICogR2VuZXJhdGVzIHJvb3QgdGFnIG1hcmt1cCB0aGVuIHJlY3Vyc2VzLiBUaGlzIG1ldGhvZCBoYXMgc2lkZSBlZmZlY3RzIGFuZFxuICAgKiBpcyBub3QgaWRlbXBvdGVudC5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbnxSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gez9SZWFjdERPTUNvbXBvbmVudH0gdGhlIHBhcmVudCBjb21wb25lbnQgaW5zdGFuY2VcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBpbmZvIGFib3V0IHRoZSBob3N0IGNvbnRhaW5lclxuICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBjb21wdXRlZCBtYXJrdXAuXG4gICAqL1xuICBtb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCBob3N0UGFyZW50LCBob3N0Q29udGFpbmVySW5mbywgY29udGV4dCkge1xuICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBnbG9iYWxJZENvdW50ZXIrKztcbiAgICB0aGlzLl9kb21JRCA9IGhvc3RDb250YWluZXJJbmZvLl9pZENvdW50ZXIrKztcbiAgICB0aGlzLl9ob3N0UGFyZW50ID0gaG9zdFBhcmVudDtcbiAgICB0aGlzLl9ob3N0Q29udGFpbmVySW5mbyA9IGhvc3RDb250YWluZXJJbmZvO1xuXG4gICAgdmFyIHByb3BzID0gdGhpcy5fY3VycmVudEVsZW1lbnQucHJvcHM7XG5cbiAgICBzd2l0Y2ggKHRoaXMuX3RhZykge1xuICAgICAgY2FzZSAnYXVkaW8nOlxuICAgICAgY2FzZSAnZm9ybSc6XG4gICAgICBjYXNlICdpZnJhbWUnOlxuICAgICAgY2FzZSAnaW1nJzpcbiAgICAgIGNhc2UgJ2xpbmsnOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIGNhc2UgJ3NvdXJjZSc6XG4gICAgICBjYXNlICd2aWRlbyc6XG4gICAgICAgIHRoaXMuX3dyYXBwZXJTdGF0ZSA9IHtcbiAgICAgICAgICBsaXN0ZW5lcnM6IG51bGxcbiAgICAgICAgfTtcbiAgICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZSh0cmFwQnViYmxlZEV2ZW50c0xvY2FsLCB0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdpbnB1dCc6XG4gICAgICAgIFJlYWN0RE9NSW5wdXQubW91bnRXcmFwcGVyKHRoaXMsIHByb3BzLCBob3N0UGFyZW50KTtcbiAgICAgICAgcHJvcHMgPSBSZWFjdERPTUlucHV0LmdldEhvc3RQcm9wcyh0aGlzLCBwcm9wcyk7XG4gICAgICAgIHRyYW5zYWN0aW9uLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUodHJhcEJ1YmJsZWRFdmVudHNMb2NhbCwgdGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb3B0aW9uJzpcbiAgICAgICAgUmVhY3RET01PcHRpb24ubW91bnRXcmFwcGVyKHRoaXMsIHByb3BzLCBob3N0UGFyZW50KTtcbiAgICAgICAgcHJvcHMgPSBSZWFjdERPTU9wdGlvbi5nZXRIb3N0UHJvcHModGhpcywgcHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIFJlYWN0RE9NU2VsZWN0Lm1vdW50V3JhcHBlcih0aGlzLCBwcm9wcywgaG9zdFBhcmVudCk7XG4gICAgICAgIHByb3BzID0gUmVhY3RET01TZWxlY3QuZ2V0SG9zdFByb3BzKHRoaXMsIHByb3BzKTtcbiAgICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZSh0cmFwQnViYmxlZEV2ZW50c0xvY2FsLCB0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0ZXh0YXJlYSc6XG4gICAgICAgIFJlYWN0RE9NVGV4dGFyZWEubW91bnRXcmFwcGVyKHRoaXMsIHByb3BzLCBob3N0UGFyZW50KTtcbiAgICAgICAgcHJvcHMgPSBSZWFjdERPTVRleHRhcmVhLmdldEhvc3RQcm9wcyh0aGlzLCBwcm9wcyk7XG4gICAgICAgIHRyYW5zYWN0aW9uLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUodHJhcEJ1YmJsZWRFdmVudHNMb2NhbCwgdGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGFzc2VydFZhbGlkUHJvcHModGhpcywgcHJvcHMpO1xuXG4gICAgLy8gV2UgY3JlYXRlIHRhZ3MgaW4gdGhlIG5hbWVzcGFjZSBvZiB0aGVpciBwYXJlbnQgY29udGFpbmVyLCBleGNlcHQgSFRNTFxuICAgIC8vIHRhZ3MgZ2V0IG5vIG5hbWVzcGFjZS5cbiAgICB2YXIgbmFtZXNwYWNlVVJJO1xuICAgIHZhciBwYXJlbnRUYWc7XG4gICAgaWYgKGhvc3RQYXJlbnQgIT0gbnVsbCkge1xuICAgICAgbmFtZXNwYWNlVVJJID0gaG9zdFBhcmVudC5fbmFtZXNwYWNlVVJJO1xuICAgICAgcGFyZW50VGFnID0gaG9zdFBhcmVudC5fdGFnO1xuICAgIH0gZWxzZSBpZiAoaG9zdENvbnRhaW5lckluZm8uX3RhZykge1xuICAgICAgbmFtZXNwYWNlVVJJID0gaG9zdENvbnRhaW5lckluZm8uX25hbWVzcGFjZVVSSTtcbiAgICAgIHBhcmVudFRhZyA9IGhvc3RDb250YWluZXJJbmZvLl90YWc7XG4gICAgfVxuICAgIGlmIChuYW1lc3BhY2VVUkkgPT0gbnVsbCB8fCBuYW1lc3BhY2VVUkkgPT09IERPTU5hbWVzcGFjZXMuc3ZnICYmIHBhcmVudFRhZyA9PT0gJ2ZvcmVpZ25vYmplY3QnKSB7XG4gICAgICBuYW1lc3BhY2VVUkkgPSBET01OYW1lc3BhY2VzLmh0bWw7XG4gICAgfVxuICAgIGlmIChuYW1lc3BhY2VVUkkgPT09IERPTU5hbWVzcGFjZXMuaHRtbCkge1xuICAgICAgaWYgKHRoaXMuX3RhZyA9PT0gJ3N2ZycpIHtcbiAgICAgICAgbmFtZXNwYWNlVVJJID0gRE9NTmFtZXNwYWNlcy5zdmc7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3RhZyA9PT0gJ21hdGgnKSB7XG4gICAgICAgIG5hbWVzcGFjZVVSSSA9IERPTU5hbWVzcGFjZXMubWF0aG1sO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9uYW1lc3BhY2VVUkkgPSBuYW1lc3BhY2VVUkk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIHBhcmVudEluZm87XG4gICAgICBpZiAoaG9zdFBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgIHBhcmVudEluZm8gPSBob3N0UGFyZW50Ll9hbmNlc3RvckluZm87XG4gICAgICB9IGVsc2UgaWYgKGhvc3RDb250YWluZXJJbmZvLl90YWcpIHtcbiAgICAgICAgcGFyZW50SW5mbyA9IGhvc3RDb250YWluZXJJbmZvLl9hbmNlc3RvckluZm87XG4gICAgICB9XG4gICAgICBpZiAocGFyZW50SW5mbykge1xuICAgICAgICAvLyBwYXJlbnRJbmZvIHNob3VsZCBhbHdheXMgYmUgcHJlc2VudCBleGNlcHQgZm9yIHRoZSB0b3AtbGV2ZWxcbiAgICAgICAgLy8gY29tcG9uZW50IHdoZW4gc2VydmVyIHJlbmRlcmluZ1xuICAgICAgICB2YWxpZGF0ZURPTU5lc3RpbmcodGhpcy5fdGFnLCBudWxsLCB0aGlzLCBwYXJlbnRJbmZvKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2FuY2VzdG9ySW5mbyA9IHZhbGlkYXRlRE9NTmVzdGluZy51cGRhdGVkQW5jZXN0b3JJbmZvKHBhcmVudEluZm8sIHRoaXMuX3RhZywgdGhpcyk7XG4gICAgfVxuXG4gICAgdmFyIG1vdW50SW1hZ2U7XG4gICAgaWYgKHRyYW5zYWN0aW9uLnVzZUNyZWF0ZUVsZW1lbnQpIHtcbiAgICAgIHZhciBvd25lckRvY3VtZW50ID0gaG9zdENvbnRhaW5lckluZm8uX293bmVyRG9jdW1lbnQ7XG4gICAgICB2YXIgZWw7XG4gICAgICBpZiAobmFtZXNwYWNlVVJJID09PSBET01OYW1lc3BhY2VzLmh0bWwpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RhZyA9PT0gJ3NjcmlwdCcpIHtcbiAgICAgICAgICAvLyBDcmVhdGUgdGhlIHNjcmlwdCB2aWEgLmlubmVySFRNTCBzbyBpdHMgXCJwYXJzZXItaW5zZXJ0ZWRcIiBmbGFnIGlzXG4gICAgICAgICAgLy8gc2V0IHRvIHRydWUgYW5kIGl0IGRvZXMgbm90IGV4ZWN1dGVcbiAgICAgICAgICB2YXIgZGl2ID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICB2YXIgdHlwZSA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gICAgICAgICAgZGl2LmlubmVySFRNTCA9ICc8JyArIHR5cGUgKyAnPjwvJyArIHR5cGUgKyAnPic7XG4gICAgICAgICAgZWwgPSBkaXYucmVtb3ZlQ2hpbGQoZGl2LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BzLmlzKSB7XG4gICAgICAgICAgZWwgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5fY3VycmVudEVsZW1lbnQudHlwZSwgcHJvcHMuaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNlcGFyYXRlIGVsc2UgYnJhbmNoIGluc3RlYWQgb2YgdXNpbmcgYHByb3BzLmlzIHx8IHVuZGVmaW5lZGAgYWJvdmUgYmVjdWFzZSBvZiBhIEZpcmVmb3ggYnVnLlxuICAgICAgICAgIC8vIFNlZSBkaXNjdXNzaW9uIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzY4OTZcbiAgICAgICAgICAvLyBhbmQgZGlzY3Vzc2lvbiBpbiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjc2MjQwXG4gICAgICAgICAgZWwgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5fY3VycmVudEVsZW1lbnQudHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlKTtcbiAgICAgIH1cbiAgICAgIFJlYWN0RE9NQ29tcG9uZW50VHJlZS5wcmVjYWNoZU5vZGUodGhpcywgZWwpO1xuICAgICAgdGhpcy5fZmxhZ3MgfD0gRmxhZ3MuaGFzQ2FjaGVkQ2hpbGROb2RlcztcbiAgICAgIGlmICghdGhpcy5faG9zdFBhcmVudCkge1xuICAgICAgICBET01Qcm9wZXJ0eU9wZXJhdGlvbnMuc2V0QXR0cmlidXRlRm9yUm9vdChlbCk7XG4gICAgICB9XG4gICAgICB0aGlzLl91cGRhdGVET01Qcm9wZXJ0aWVzKG51bGwsIHByb3BzLCB0cmFuc2FjdGlvbik7XG4gICAgICB2YXIgbGF6eVRyZWUgPSBET01MYXp5VHJlZShlbCk7XG4gICAgICB0aGlzLl9jcmVhdGVJbml0aWFsQ2hpbGRyZW4odHJhbnNhY3Rpb24sIHByb3BzLCBjb250ZXh0LCBsYXp5VHJlZSk7XG4gICAgICBtb3VudEltYWdlID0gbGF6eVRyZWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0YWdPcGVuID0gdGhpcy5fY3JlYXRlT3BlblRhZ01hcmt1cEFuZFB1dExpc3RlbmVycyh0cmFuc2FjdGlvbiwgcHJvcHMpO1xuICAgICAgdmFyIHRhZ0NvbnRlbnQgPSB0aGlzLl9jcmVhdGVDb250ZW50TWFya3VwKHRyYW5zYWN0aW9uLCBwcm9wcywgY29udGV4dCk7XG4gICAgICBpZiAoIXRhZ0NvbnRlbnQgJiYgb21pdHRlZENsb3NlVGFnc1t0aGlzLl90YWddKSB7XG4gICAgICAgIG1vdW50SW1hZ2UgPSB0YWdPcGVuICsgJy8+JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vdW50SW1hZ2UgPSB0YWdPcGVuICsgJz4nICsgdGFnQ29udGVudCArICc8LycgKyB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlICsgJz4nO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy5fdGFnKSB7XG4gICAgICBjYXNlICdpbnB1dCc6XG4gICAgICAgIHRyYW5zYWN0aW9uLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUoaW5wdXRQb3N0TW91bnQsIHRoaXMpO1xuICAgICAgICBpZiAocHJvcHMuYXV0b0ZvY3VzKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShBdXRvRm9jdXNVdGlscy5mb2N1c0RPTUNvbXBvbmVudCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0ZXh0YXJlYSc6XG4gICAgICAgIHRyYW5zYWN0aW9uLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUodGV4dGFyZWFQb3N0TW91bnQsIHRoaXMpO1xuICAgICAgICBpZiAocHJvcHMuYXV0b0ZvY3VzKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShBdXRvRm9jdXNVdGlscy5mb2N1c0RPTUNvbXBvbmVudCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICBpZiAocHJvcHMuYXV0b0ZvY3VzKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShBdXRvRm9jdXNVdGlscy5mb2N1c0RPTUNvbXBvbmVudCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdidXR0b24nOlxuICAgICAgICBpZiAocHJvcHMuYXV0b0ZvY3VzKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShBdXRvRm9jdXNVdGlscy5mb2N1c0RPTUNvbXBvbmVudCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdvcHRpb24nOlxuICAgICAgICB0cmFuc2FjdGlvbi5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKG9wdGlvblBvc3RNb3VudCwgdGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBtb3VudEltYWdlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIG1hcmt1cCBmb3IgdGhlIG9wZW4gdGFnIGFuZCBhbGwgYXR0cmlidXRlcy5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaGFzIHNpZGUgZWZmZWN0cyBiZWNhdXNlIGV2ZW50cyBnZXQgcmVnaXN0ZXJlZC5cbiAgICpcbiAgICogSXRlcmF0aW5nIG92ZXIgb2JqZWN0IHByb3BlcnRpZXMgaXMgZmFzdGVyIHRoYW4gaXRlcmF0aW5nIG92ZXIgYXJyYXlzLlxuICAgKiBAc2VlIGh0dHA6Ly9qc3BlcmYuY29tL29iai12cy1hcnItaXRlcmF0aW9uXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbnxSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcHNcbiAgICogQHJldHVybiB7c3RyaW5nfSBNYXJrdXAgb2Ygb3BlbmluZyB0YWcuXG4gICAqL1xuICBfY3JlYXRlT3BlblRhZ01hcmt1cEFuZFB1dExpc3RlbmVyczogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCBwcm9wcykge1xuICAgIHZhciByZXQgPSAnPCcgKyB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuXG4gICAgZm9yICh2YXIgcHJvcEtleSBpbiBwcm9wcykge1xuICAgICAgaWYgKCFwcm9wcy5oYXNPd25Qcm9wZXJ0eShwcm9wS2V5KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wS2V5XTtcbiAgICAgIGlmIChwcm9wVmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChyZWdpc3RyYXRpb25OYW1lTW9kdWxlcy5oYXNPd25Qcm9wZXJ0eShwcm9wS2V5KSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlKSB7XG4gICAgICAgICAgZW5xdWV1ZVB1dExpc3RlbmVyKHRoaXMsIHByb3BLZXksIHByb3BWYWx1ZSwgdHJhbnNhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocHJvcEtleSA9PT0gU1RZTEUpIHtcbiAgICAgICAgICBpZiAocHJvcFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAvLyBTZWUgYF91cGRhdGVET01Qcm9wZXJ0aWVzYC4gc3R5bGUgYmxvY2tcbiAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNTdHlsZSA9IHByb3BWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb3BWYWx1ZSA9IHRoaXMuX3ByZXZpb3VzU3R5bGVDb3B5ID0gX2Fzc2lnbih7fSwgcHJvcHMuc3R5bGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwcm9wVmFsdWUgPSBDU1NQcm9wZXJ0eU9wZXJhdGlvbnMuY3JlYXRlTWFya3VwRm9yU3R5bGVzKHByb3BWYWx1ZSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1hcmt1cCA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLl90YWcgIT0gbnVsbCAmJiBpc0N1c3RvbUNvbXBvbmVudCh0aGlzLl90YWcsIHByb3BzKSkge1xuICAgICAgICAgIGlmICghUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcEtleSkpIHtcbiAgICAgICAgICAgIG1hcmt1cCA9IERPTVByb3BlcnR5T3BlcmF0aW9ucy5jcmVhdGVNYXJrdXBGb3JDdXN0b21BdHRyaWJ1dGUocHJvcEtleSwgcHJvcFZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFya3VwID0gRE9NUHJvcGVydHlPcGVyYXRpb25zLmNyZWF0ZU1hcmt1cEZvclByb3BlcnR5KHByb3BLZXksIHByb3BWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hcmt1cCkge1xuICAgICAgICAgIHJldCArPSAnICcgKyBtYXJrdXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGb3Igc3RhdGljIHBhZ2VzLCBubyBuZWVkIHRvIHB1dCBSZWFjdCBJRCBhbmQgY2hlY2tzdW0uIFNhdmVzIGxvdHMgb2ZcbiAgICAvLyBieXRlcy5cbiAgICBpZiAodHJhbnNhY3Rpb24ucmVuZGVyVG9TdGF0aWNNYXJrdXApIHtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9ob3N0UGFyZW50KSB7XG4gICAgICByZXQgKz0gJyAnICsgRE9NUHJvcGVydHlPcGVyYXRpb25zLmNyZWF0ZU1hcmt1cEZvclJvb3QoKTtcbiAgICB9XG4gICAgcmV0ICs9ICcgJyArIERPTVByb3BlcnR5T3BlcmF0aW9ucy5jcmVhdGVNYXJrdXBGb3JJRCh0aGlzLl9kb21JRCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICAvKipcbiAgICogQ3JlYXRlcyBtYXJrdXAgZm9yIHRoZSBjb250ZW50IGJldHdlZW4gdGhlIHRhZ3MuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbnxSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcHNcbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHRcbiAgICogQHJldHVybiB7c3RyaW5nfSBDb250ZW50IG1hcmt1cC5cbiAgICovXG4gIF9jcmVhdGVDb250ZW50TWFya3VwOiBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIHByb3BzLCBjb250ZXh0KSB7XG4gICAgdmFyIHJldCA9ICcnO1xuXG4gICAgLy8gSW50ZW50aW9uYWwgdXNlIG9mICE9IHRvIGF2b2lkIGNhdGNoaW5nIHplcm8vZmFsc2UuXG4gICAgdmFyIGlubmVySFRNTCA9IHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MO1xuICAgIGlmIChpbm5lckhUTUwgIT0gbnVsbCkge1xuICAgICAgaWYgKGlubmVySFRNTC5fX2h0bWwgIT0gbnVsbCkge1xuICAgICAgICByZXQgPSBpbm5lckhUTUwuX19odG1sO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY29udGVudFRvVXNlID0gQ09OVEVOVF9UWVBFU1t0eXBlb2YgcHJvcHMuY2hpbGRyZW5dID8gcHJvcHMuY2hpbGRyZW4gOiBudWxsO1xuICAgICAgdmFyIGNoaWxkcmVuVG9Vc2UgPSBjb250ZW50VG9Vc2UgIT0gbnVsbCA/IG51bGwgOiBwcm9wcy5jaGlsZHJlbjtcbiAgICAgIGlmIChjb250ZW50VG9Vc2UgIT0gbnVsbCkge1xuICAgICAgICAvLyBUT0RPOiBWYWxpZGF0ZSB0aGF0IHRleHQgaXMgYWxsb3dlZCBhcyBhIGNoaWxkIG9mIHRoaXMgbm9kZVxuICAgICAgICByZXQgPSBlc2NhcGVUZXh0Q29udGVudEZvckJyb3dzZXIoY29udGVudFRvVXNlKTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBzZXRBbmRWYWxpZGF0ZUNvbnRlbnRDaGlsZERldi5jYWxsKHRoaXMsIGNvbnRlbnRUb1VzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2hpbGRyZW5Ub1VzZSAhPSBudWxsKSB7XG4gICAgICAgIHZhciBtb3VudEltYWdlcyA9IHRoaXMubW91bnRDaGlsZHJlbihjaGlsZHJlblRvVXNlLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICAgIHJldCA9IG1vdW50SW1hZ2VzLmpvaW4oJycpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobmV3bGluZUVhdGluZ1RhZ3NbdGhpcy5fdGFnXSAmJiByZXQuY2hhckF0KDApID09PSAnXFxuJykge1xuICAgICAgLy8gdGV4dC9odG1sIGlnbm9yZXMgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGVzZSB0YWdzIGlmIGl0J3MgYSBuZXdsaW5lXG4gICAgICAvLyBQcmVmZXIgdG8gYnJlYWsgYXBwbGljYXRpb24veG1sIG92ZXIgdGV4dC9odG1sIChmb3Igbm93KSBieSBhZGRpbmdcbiAgICAgIC8vIGEgbmV3bGluZSBzcGVjaWZpY2FsbHkgdG8gZ2V0IGVhdGVuIGJ5IHRoZSBwYXJzZXIuIChBbHRlcm5hdGVseSBmb3JcbiAgICAgIC8vIHRleHRhcmVhcywgcmVwbGFjaW5nIFwiXlxcblwiIHdpdGggXCJcXHJcXG5cIiBkb2Vzbid0IGdldCBlYXRlbiwgYW5kIHRoZSBmaXJzdFxuICAgICAgLy8gXFxyIGlzIG5vcm1hbGl6ZWQgb3V0IGJ5IEhUTUxUZXh0QXJlYUVsZW1lbnQjdmFsdWUuKVxuICAgICAgLy8gU2VlOiA8aHR0cDovL3d3dy53My5vcmcvVFIvaHRtbC1wb2x5Z2xvdC8jbmV3bGluZXMtaW4tdGV4dGFyZWEtYW5kLXByZT5cbiAgICAgIC8vIFNlZTogPGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L3N5bnRheC5odG1sI2VsZW1lbnQtcmVzdHJpY3Rpb25zPlxuICAgICAgLy8gU2VlOiA8aHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjbmV3bGluZXM+XG4gICAgICAvLyBTZWU6IFBhcnNpbmcgb2YgXCJ0ZXh0YXJlYVwiIFwibGlzdGluZ1wiIGFuZCBcInByZVwiIGVsZW1lbnRzXG4gICAgICAvLyAgZnJvbSA8aHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjcGFyc2luZy1tYWluLWluYm9keT5cbiAgICAgIHJldHVybiAnXFxuJyArIHJldDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH0sXG5cbiAgX2NyZWF0ZUluaXRpYWxDaGlsZHJlbjogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCBwcm9wcywgY29udGV4dCwgbGF6eVRyZWUpIHtcbiAgICAvLyBJbnRlbnRpb25hbCB1c2Ugb2YgIT0gdG8gYXZvaWQgY2F0Y2hpbmcgemVyby9mYWxzZS5cbiAgICB2YXIgaW5uZXJIVE1MID0gcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw7XG4gICAgaWYgKGlubmVySFRNTCAhPSBudWxsKSB7XG4gICAgICBpZiAoaW5uZXJIVE1MLl9faHRtbCAhPSBudWxsKSB7XG4gICAgICAgIERPTUxhenlUcmVlLnF1ZXVlSFRNTChsYXp5VHJlZSwgaW5uZXJIVE1MLl9faHRtbCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjb250ZW50VG9Vc2UgPSBDT05URU5UX1RZUEVTW3R5cGVvZiBwcm9wcy5jaGlsZHJlbl0gPyBwcm9wcy5jaGlsZHJlbiA6IG51bGw7XG4gICAgICB2YXIgY2hpbGRyZW5Ub1VzZSA9IGNvbnRlbnRUb1VzZSAhPSBudWxsID8gbnVsbCA6IHByb3BzLmNoaWxkcmVuO1xuICAgICAgLy8gVE9ETzogVmFsaWRhdGUgdGhhdCB0ZXh0IGlzIGFsbG93ZWQgYXMgYSBjaGlsZCBvZiB0aGlzIG5vZGVcbiAgICAgIGlmIChjb250ZW50VG9Vc2UgIT0gbnVsbCkge1xuICAgICAgICAvLyBBdm9pZCBzZXR0aW5nIHRleHRDb250ZW50IHdoZW4gdGhlIHRleHQgaXMgZW1wdHkuIEluIElFMTEgc2V0dGluZ1xuICAgICAgICAvLyB0ZXh0Q29udGVudCBvbiBhIHRleHQgYXJlYSB3aWxsIGNhdXNlIHRoZSBwbGFjZWhvbGRlciB0byBub3RcbiAgICAgICAgLy8gc2hvdyB3aXRoaW4gdGhlIHRleHRhcmVhIHVudGlsIGl0IGhhcyBiZWVuIGZvY3VzZWQgYW5kIGJsdXJyZWQgYWdhaW4uXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvNjczMSNpc3N1ZWNvbW1lbnQtMjU0ODc0NTUzXG4gICAgICAgIGlmIChjb250ZW50VG9Vc2UgIT09ICcnKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIHNldEFuZFZhbGlkYXRlQ29udGVudENoaWxkRGV2LmNhbGwodGhpcywgY29udGVudFRvVXNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgRE9NTGF6eVRyZWUucXVldWVUZXh0KGxhenlUcmVlLCBjb250ZW50VG9Vc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGNoaWxkcmVuVG9Vc2UgIT0gbnVsbCkge1xuICAgICAgICB2YXIgbW91bnRJbWFnZXMgPSB0aGlzLm1vdW50Q2hpbGRyZW4oY2hpbGRyZW5Ub1VzZSwgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vdW50SW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgRE9NTGF6eVRyZWUucXVldWVDaGlsZChsYXp5VHJlZSwgbW91bnRJbWFnZXNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBSZWNlaXZlcyBhIG5leHQgZWxlbWVudCBhbmQgdXBkYXRlcyB0aGUgY29tcG9uZW50LlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IG5leHRFbGVtZW50XG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbnxSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICAgKi9cbiAgcmVjZWl2ZUNvbXBvbmVudDogZnVuY3Rpb24gKG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBwcmV2RWxlbWVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50O1xuICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gbmV4dEVsZW1lbnQ7XG4gICAgdGhpcy51cGRhdGVDb21wb25lbnQodHJhbnNhY3Rpb24sIHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCwgY29udGV4dCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYSBET00gY29tcG9uZW50IGFmdGVyIGl0IGhhcyBhbHJlYWR5IGJlZW4gYWxsb2NhdGVkIGFuZFxuICAgKiBhdHRhY2hlZCB0byB0aGUgRE9NLiBSZWNvbmNpbGVzIHRoZSByb290IERPTSBub2RlLCB0aGVuIHJlY3Vyc2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBwcmV2RWxlbWVudFxuICAgKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gbmV4dEVsZW1lbnRcbiAgICogQGludGVybmFsXG4gICAqIEBvdmVycmlkYWJsZVxuICAgKi9cbiAgdXBkYXRlQ29tcG9uZW50OiBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCwgY29udGV4dCkge1xuICAgIHZhciBsYXN0UHJvcHMgPSBwcmV2RWxlbWVudC5wcm9wcztcbiAgICB2YXIgbmV4dFByb3BzID0gdGhpcy5fY3VycmVudEVsZW1lbnQucHJvcHM7XG5cbiAgICBzd2l0Y2ggKHRoaXMuX3RhZykge1xuICAgICAgY2FzZSAnaW5wdXQnOlxuICAgICAgICBsYXN0UHJvcHMgPSBSZWFjdERPTUlucHV0LmdldEhvc3RQcm9wcyh0aGlzLCBsYXN0UHJvcHMpO1xuICAgICAgICBuZXh0UHJvcHMgPSBSZWFjdERPTUlucHV0LmdldEhvc3RQcm9wcyh0aGlzLCBuZXh0UHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29wdGlvbic6XG4gICAgICAgIGxhc3RQcm9wcyA9IFJlYWN0RE9NT3B0aW9uLmdldEhvc3RQcm9wcyh0aGlzLCBsYXN0UHJvcHMpO1xuICAgICAgICBuZXh0UHJvcHMgPSBSZWFjdERPTU9wdGlvbi5nZXRIb3N0UHJvcHModGhpcywgbmV4dFByb3BzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICBsYXN0UHJvcHMgPSBSZWFjdERPTVNlbGVjdC5nZXRIb3N0UHJvcHModGhpcywgbGFzdFByb3BzKTtcbiAgICAgICAgbmV4dFByb3BzID0gUmVhY3RET01TZWxlY3QuZ2V0SG9zdFByb3BzKHRoaXMsIG5leHRQcm9wcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICBsYXN0UHJvcHMgPSBSZWFjdERPTVRleHRhcmVhLmdldEhvc3RQcm9wcyh0aGlzLCBsYXN0UHJvcHMpO1xuICAgICAgICBuZXh0UHJvcHMgPSBSZWFjdERPTVRleHRhcmVhLmdldEhvc3RQcm9wcyh0aGlzLCBuZXh0UHJvcHMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBhc3NlcnRWYWxpZFByb3BzKHRoaXMsIG5leHRQcm9wcyk7XG4gICAgdGhpcy5fdXBkYXRlRE9NUHJvcGVydGllcyhsYXN0UHJvcHMsIG5leHRQcm9wcywgdHJhbnNhY3Rpb24pO1xuICAgIHRoaXMuX3VwZGF0ZURPTUNoaWxkcmVuKGxhc3RQcm9wcywgbmV4dFByb3BzLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG5cbiAgICBzd2l0Y2ggKHRoaXMuX3RhZykge1xuICAgICAgY2FzZSAnaW5wdXQnOlxuICAgICAgICAvLyBVcGRhdGUgdGhlIHdyYXBwZXIgYXJvdW5kIGlucHV0cyAqYWZ0ZXIqIHVwZGF0aW5nIHByb3BzLiBUaGlzIGhhcyB0b1xuICAgICAgICAvLyBoYXBwZW4gYWZ0ZXIgYF91cGRhdGVET01Qcm9wZXJ0aWVzYC4gT3RoZXJ3aXNlIEhUTUw1IGlucHV0IHZhbGlkYXRpb25zXG4gICAgICAgIC8vIHJhaXNlIHdhcm5pbmdzIGFuZCBwcmV2ZW50IHRoZSBuZXcgdmFsdWUgZnJvbSBiZWluZyBhc3NpZ25lZC5cbiAgICAgICAgUmVhY3RET01JbnB1dC51cGRhdGVXcmFwcGVyKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICAgICAgUmVhY3RET01UZXh0YXJlYS51cGRhdGVXcmFwcGVyKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICAgIC8vIDxzZWxlY3Q+IHZhbHVlIHVwZGF0ZSBuZWVkcyB0byBvY2N1ciBhZnRlciA8b3B0aW9uPiBjaGlsZHJlblxuICAgICAgICAvLyByZWNvbmNpbGlhdGlvblxuICAgICAgICB0cmFuc2FjdGlvbi5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKHBvc3RVcGRhdGVTZWxlY3RXcmFwcGVyLCB0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBSZWNvbmNpbGVzIHRoZSBwcm9wZXJ0aWVzIGJ5IGRldGVjdGluZyBkaWZmZXJlbmNlcyBpbiBwcm9wZXJ0eSB2YWx1ZXMgYW5kXG4gICAqIHVwZGF0aW5nIHRoZSBET00gYXMgbmVjZXNzYXJ5LiBUaGlzIGZ1bmN0aW9uIGlzIHByb2JhYmx5IHRoZSBzaW5nbGUgbW9zdFxuICAgKiBjcml0aWNhbCBwYXRoIGZvciBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24uXG4gICAqXG4gICAqIFRPRE86IEJlbmNobWFyayB3aGV0aGVyIGNoZWNraW5nIGZvciBjaGFuZ2VkIHZhbHVlcyBpbiBtZW1vcnkgYWN0dWFsbHlcbiAgICogICAgICAgaW1wcm92ZXMgcGVyZm9ybWFuY2UgKGVzcGVjaWFsbHkgc3RhdGljYWxseSBwb3NpdGlvbmVkIGVsZW1lbnRzKS5cbiAgICogVE9ETzogQmVuY2htYXJrIHRoZSBlZmZlY3RzIG9mIHB1dHRpbmcgdGhpcyBhdCB0aGUgdG9wIHNpbmNlIDk5JSBvZiBwcm9wc1xuICAgKiAgICAgICBkbyBub3QgY2hhbmdlIGZvciBhIGdpdmVuIHJlY29uY2lsaWF0aW9uLlxuICAgKiBUT0RPOiBCZW5jaG1hcmsgYXJlYXMgdGhhdCBjYW4gYmUgaW1wcm92ZWQgd2l0aCBjYWNoaW5nLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge29iamVjdH0gbGFzdFByb3BzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/RE9NRWxlbWVudH0gbm9kZVxuICAgKi9cbiAgX3VwZGF0ZURPTVByb3BlcnRpZXM6IGZ1bmN0aW9uIChsYXN0UHJvcHMsIG5leHRQcm9wcywgdHJhbnNhY3Rpb24pIHtcbiAgICB2YXIgcHJvcEtleTtcbiAgICB2YXIgc3R5bGVOYW1lO1xuICAgIHZhciBzdHlsZVVwZGF0ZXM7XG4gICAgZm9yIChwcm9wS2V5IGluIGxhc3RQcm9wcykge1xuICAgICAgaWYgKG5leHRQcm9wcy5oYXNPd25Qcm9wZXJ0eShwcm9wS2V5KSB8fCAhbGFzdFByb3BzLmhhc093blByb3BlcnR5KHByb3BLZXkpIHx8IGxhc3RQcm9wc1twcm9wS2V5XSA9PSBudWxsKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHByb3BLZXkgPT09IFNUWUxFKSB7XG4gICAgICAgIHZhciBsYXN0U3R5bGUgPSB0aGlzLl9wcmV2aW91c1N0eWxlQ29weTtcbiAgICAgICAgZm9yIChzdHlsZU5hbWUgaW4gbGFzdFN0eWxlKSB7XG4gICAgICAgICAgaWYgKGxhc3RTdHlsZS5oYXNPd25Qcm9wZXJ0eShzdHlsZU5hbWUpKSB7XG4gICAgICAgICAgICBzdHlsZVVwZGF0ZXMgPSBzdHlsZVVwZGF0ZXMgfHwge307XG4gICAgICAgICAgICBzdHlsZVVwZGF0ZXNbc3R5bGVOYW1lXSA9ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcmV2aW91c1N0eWxlQ29weSA9IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKHJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzLmhhc093blByb3BlcnR5KHByb3BLZXkpKSB7XG4gICAgICAgIGlmIChsYXN0UHJvcHNbcHJvcEtleV0pIHtcbiAgICAgICAgICAvLyBPbmx5IGNhbGwgZGVsZXRlTGlzdGVuZXIgaWYgdGhlcmUgd2FzIGEgbGlzdGVuZXIgcHJldmlvdXNseSBvclxuICAgICAgICAgIC8vIGVsc2Ugd2lsbERlbGV0ZUxpc3RlbmVyIGdldHMgY2FsbGVkIHdoZW4gdGhlcmUgd2Fzbid0IGFjdHVhbGx5IGFcbiAgICAgICAgICAvLyBsaXN0ZW5lciAoZS5nLiwgb25DbGljaz17bnVsbH0pXG4gICAgICAgICAgZGVsZXRlTGlzdGVuZXIodGhpcywgcHJvcEtleSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNDdXN0b21Db21wb25lbnQodGhpcy5fdGFnLCBsYXN0UHJvcHMpKSB7XG4gICAgICAgIGlmICghUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcEtleSkpIHtcbiAgICAgICAgICBET01Qcm9wZXJ0eU9wZXJhdGlvbnMuZGVsZXRlVmFsdWVGb3JBdHRyaWJ1dGUoZ2V0Tm9kZSh0aGlzKSwgcHJvcEtleSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoRE9NUHJvcGVydHkucHJvcGVydGllc1twcm9wS2V5XSB8fCBET01Qcm9wZXJ0eS5pc0N1c3RvbUF0dHJpYnV0ZShwcm9wS2V5KSkge1xuICAgICAgICBET01Qcm9wZXJ0eU9wZXJhdGlvbnMuZGVsZXRlVmFsdWVGb3JQcm9wZXJ0eShnZXROb2RlKHRoaXMpLCBwcm9wS2V5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChwcm9wS2V5IGluIG5leHRQcm9wcykge1xuICAgICAgdmFyIG5leHRQcm9wID0gbmV4dFByb3BzW3Byb3BLZXldO1xuICAgICAgdmFyIGxhc3RQcm9wID0gcHJvcEtleSA9PT0gU1RZTEUgPyB0aGlzLl9wcmV2aW91c1N0eWxlQ29weSA6IGxhc3RQcm9wcyAhPSBudWxsID8gbGFzdFByb3BzW3Byb3BLZXldIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKCFuZXh0UHJvcHMuaGFzT3duUHJvcGVydHkocHJvcEtleSkgfHwgbmV4dFByb3AgPT09IGxhc3RQcm9wIHx8IG5leHRQcm9wID09IG51bGwgJiYgbGFzdFByb3AgPT0gbnVsbCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wS2V5ID09PSBTVFlMRSkge1xuICAgICAgICBpZiAobmV4dFByb3ApIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgY2hlY2tBbmRXYXJuRm9yTXV0YXRlZFN0eWxlKHRoaXMuX3ByZXZpb3VzU3R5bGVDb3B5LCB0aGlzLl9wcmV2aW91c1N0eWxlLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzU3R5bGUgPSBuZXh0UHJvcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbmV4dFByb3AgPSB0aGlzLl9wcmV2aW91c1N0eWxlQ29weSA9IF9hc3NpZ24oe30sIG5leHRQcm9wKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9wcmV2aW91c1N0eWxlQ29weSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RQcm9wKSB7XG4gICAgICAgICAgLy8gVW5zZXQgc3R5bGVzIG9uIGBsYXN0UHJvcGAgYnV0IG5vdCBvbiBgbmV4dFByb3BgLlxuICAgICAgICAgIGZvciAoc3R5bGVOYW1lIGluIGxhc3RQcm9wKSB7XG4gICAgICAgICAgICBpZiAobGFzdFByb3AuaGFzT3duUHJvcGVydHkoc3R5bGVOYW1lKSAmJiAoIW5leHRQcm9wIHx8ICFuZXh0UHJvcC5oYXNPd25Qcm9wZXJ0eShzdHlsZU5hbWUpKSkge1xuICAgICAgICAgICAgICBzdHlsZVVwZGF0ZXMgPSBzdHlsZVVwZGF0ZXMgfHwge307XG4gICAgICAgICAgICAgIHN0eWxlVXBkYXRlc1tzdHlsZU5hbWVdID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFVwZGF0ZSBzdHlsZXMgdGhhdCBjaGFuZ2VkIHNpbmNlIGBsYXN0UHJvcGAuXG4gICAgICAgICAgZm9yIChzdHlsZU5hbWUgaW4gbmV4dFByb3ApIHtcbiAgICAgICAgICAgIGlmIChuZXh0UHJvcC5oYXNPd25Qcm9wZXJ0eShzdHlsZU5hbWUpICYmIGxhc3RQcm9wW3N0eWxlTmFtZV0gIT09IG5leHRQcm9wW3N0eWxlTmFtZV0pIHtcbiAgICAgICAgICAgICAgc3R5bGVVcGRhdGVzID0gc3R5bGVVcGRhdGVzIHx8IHt9O1xuICAgICAgICAgICAgICBzdHlsZVVwZGF0ZXNbc3R5bGVOYW1lXSA9IG5leHRQcm9wW3N0eWxlTmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlbGllcyBvbiBgdXBkYXRlU3R5bGVzQnlJRGAgbm90IG11dGF0aW5nIGBzdHlsZVVwZGF0ZXNgLlxuICAgICAgICAgIHN0eWxlVXBkYXRlcyA9IG5leHRQcm9wO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzLmhhc093blByb3BlcnR5KHByb3BLZXkpKSB7XG4gICAgICAgIGlmIChuZXh0UHJvcCkge1xuICAgICAgICAgIGVucXVldWVQdXRMaXN0ZW5lcih0aGlzLCBwcm9wS2V5LCBuZXh0UHJvcCwgdHJhbnNhY3Rpb24pO1xuICAgICAgICB9IGVsc2UgaWYgKGxhc3RQcm9wKSB7XG4gICAgICAgICAgZGVsZXRlTGlzdGVuZXIodGhpcywgcHJvcEtleSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNDdXN0b21Db21wb25lbnQodGhpcy5fdGFnLCBuZXh0UHJvcHMpKSB7XG4gICAgICAgIGlmICghUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcEtleSkpIHtcbiAgICAgICAgICBET01Qcm9wZXJ0eU9wZXJhdGlvbnMuc2V0VmFsdWVGb3JBdHRyaWJ1dGUoZ2V0Tm9kZSh0aGlzKSwgcHJvcEtleSwgbmV4dFByb3ApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKERPTVByb3BlcnR5LnByb3BlcnRpZXNbcHJvcEtleV0gfHwgRE9NUHJvcGVydHkuaXNDdXN0b21BdHRyaWJ1dGUocHJvcEtleSkpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBnZXROb2RlKHRoaXMpO1xuICAgICAgICAvLyBJZiB3ZSdyZSB1cGRhdGluZyB0byBudWxsIG9yIHVuZGVmaW5lZCwgd2Ugc2hvdWxkIHJlbW92ZSB0aGUgcHJvcGVydHlcbiAgICAgICAgLy8gZnJvbSB0aGUgRE9NIG5vZGUgaW5zdGVhZCBvZiBpbmFkdmVydGVudGx5IHNldHRpbmcgdG8gYSBzdHJpbmcuIFRoaXNcbiAgICAgICAgLy8gYnJpbmdzIHVzIGluIGxpbmUgd2l0aCB0aGUgc2FtZSBiZWhhdmlvciB3ZSBoYXZlIG9uIGluaXRpYWwgcmVuZGVyLlxuICAgICAgICBpZiAobmV4dFByb3AgIT0gbnVsbCkge1xuICAgICAgICAgIERPTVByb3BlcnR5T3BlcmF0aW9ucy5zZXRWYWx1ZUZvclByb3BlcnR5KG5vZGUsIHByb3BLZXksIG5leHRQcm9wKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBET01Qcm9wZXJ0eU9wZXJhdGlvbnMuZGVsZXRlVmFsdWVGb3JQcm9wZXJ0eShub2RlLCBwcm9wS2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3R5bGVVcGRhdGVzKSB7XG4gICAgICBDU1NQcm9wZXJ0eU9wZXJhdGlvbnMuc2V0VmFsdWVGb3JTdHlsZXMoZ2V0Tm9kZSh0aGlzKSwgc3R5bGVVcGRhdGVzLCB0aGlzKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlY29uY2lsZXMgdGhlIGNoaWxkcmVuIHdpdGggdGhlIHZhcmlvdXMgcHJvcGVydGllcyB0aGF0IGFmZmVjdCB0aGVcbiAgICogY2hpbGRyZW4gY29udGVudC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGxhc3RQcm9wc1xuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHRcbiAgICovXG4gIF91cGRhdGVET01DaGlsZHJlbjogZnVuY3Rpb24gKGxhc3RQcm9wcywgbmV4dFByb3BzLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBsYXN0Q29udGVudCA9IENPTlRFTlRfVFlQRVNbdHlwZW9mIGxhc3RQcm9wcy5jaGlsZHJlbl0gPyBsYXN0UHJvcHMuY2hpbGRyZW4gOiBudWxsO1xuICAgIHZhciBuZXh0Q29udGVudCA9IENPTlRFTlRfVFlQRVNbdHlwZW9mIG5leHRQcm9wcy5jaGlsZHJlbl0gPyBuZXh0UHJvcHMuY2hpbGRyZW4gOiBudWxsO1xuXG4gICAgdmFyIGxhc3RIdG1sID0gbGFzdFByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MICYmIGxhc3RQcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTC5fX2h0bWw7XG4gICAgdmFyIG5leHRIdG1sID0gbmV4dFByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MICYmIG5leHRQcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTC5fX2h0bWw7XG5cbiAgICAvLyBOb3RlIHRoZSB1c2Ugb2YgYCE9YCB3aGljaCBjaGVja3MgZm9yIG51bGwgb3IgdW5kZWZpbmVkLlxuICAgIHZhciBsYXN0Q2hpbGRyZW4gPSBsYXN0Q29udGVudCAhPSBudWxsID8gbnVsbCA6IGxhc3RQcm9wcy5jaGlsZHJlbjtcbiAgICB2YXIgbmV4dENoaWxkcmVuID0gbmV4dENvbnRlbnQgIT0gbnVsbCA/IG51bGwgOiBuZXh0UHJvcHMuY2hpbGRyZW47XG5cbiAgICAvLyBJZiB3ZSdyZSBzd2l0Y2hpbmcgZnJvbSBjaGlsZHJlbiB0byBjb250ZW50L2h0bWwgb3IgdmljZSB2ZXJzYSwgcmVtb3ZlXG4gICAgLy8gdGhlIG9sZCBjb250ZW50XG4gICAgdmFyIGxhc3RIYXNDb250ZW50T3JIdG1sID0gbGFzdENvbnRlbnQgIT0gbnVsbCB8fCBsYXN0SHRtbCAhPSBudWxsO1xuICAgIHZhciBuZXh0SGFzQ29udGVudE9ySHRtbCA9IG5leHRDb250ZW50ICE9IG51bGwgfHwgbmV4dEh0bWwgIT0gbnVsbDtcbiAgICBpZiAobGFzdENoaWxkcmVuICE9IG51bGwgJiYgbmV4dENoaWxkcmVuID09IG51bGwpIHtcbiAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW4obnVsbCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH0gZWxzZSBpZiAobGFzdEhhc0NvbnRlbnRPckh0bWwgJiYgIW5leHRIYXNDb250ZW50T3JIdG1sKSB7XG4gICAgICB0aGlzLnVwZGF0ZVRleHRDb250ZW50KCcnKTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vblNldENoaWxkcmVuKHRoaXMuX2RlYnVnSUQsIFtdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobmV4dENvbnRlbnQgIT0gbnVsbCkge1xuICAgICAgaWYgKGxhc3RDb250ZW50ICE9PSBuZXh0Q29udGVudCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVRleHRDb250ZW50KCcnICsgbmV4dENvbnRlbnQpO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHNldEFuZFZhbGlkYXRlQ29udGVudENoaWxkRGV2LmNhbGwodGhpcywgbmV4dENvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuZXh0SHRtbCAhPSBudWxsKSB7XG4gICAgICBpZiAobGFzdEh0bWwgIT09IG5leHRIdG1sKSB7XG4gICAgICAgIHRoaXMudXBkYXRlTWFya3VwKCcnICsgbmV4dEh0bWwpO1xuICAgICAgfVxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uU2V0Q2hpbGRyZW4odGhpcy5fZGVidWdJRCwgW10pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobmV4dENoaWxkcmVuICE9IG51bGwpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHNldEFuZFZhbGlkYXRlQ29udGVudENoaWxkRGV2LmNhbGwodGhpcywgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW4obmV4dENoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfVxuICB9LFxuXG4gIGdldEhvc3ROb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdldE5vZGUodGhpcyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIGFsbCBldmVudCByZWdpc3RyYXRpb25zIGZvciB0aGlzIGluc3RhbmNlLiBEb2VzIG5vdCByZW1vdmUgZnJvbVxuICAgKiB0aGUgRE9NLiBUaGF0IG11c3QgYmUgZG9uZSBieSB0aGUgcGFyZW50LlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHVubW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChzYWZlbHkpIHtcbiAgICBzd2l0Y2ggKHRoaXMuX3RhZykge1xuICAgICAgY2FzZSAnYXVkaW8nOlxuICAgICAgY2FzZSAnZm9ybSc6XG4gICAgICBjYXNlICdpZnJhbWUnOlxuICAgICAgY2FzZSAnaW1nJzpcbiAgICAgIGNhc2UgJ2xpbmsnOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIGNhc2UgJ3NvdXJjZSc6XG4gICAgICBjYXNlICd2aWRlbyc6XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl93cmFwcGVyU3RhdGUubGlzdGVuZXJzO1xuICAgICAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpc3RlbmVyc1tpXS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdodG1sJzpcbiAgICAgIGNhc2UgJ2hlYWQnOlxuICAgICAgY2FzZSAnYm9keSc6XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb21wb25lbnRzIGxpa2UgPGh0bWw+IDxoZWFkPiBhbmQgPGJvZHk+IGNhbid0IGJlIHJlbW92ZWQgb3IgYWRkZWRcbiAgICAgICAgICogZWFzaWx5IGluIGEgY3Jvc3MtYnJvd3NlciB3YXksIGhvd2V2ZXIgaXQncyB2YWx1YWJsZSB0byBiZSBhYmxlIHRvXG4gICAgICAgICAqIHRha2UgYWR2YW50YWdlIG9mIFJlYWN0J3MgcmVjb25jaWxpYXRpb24gZm9yIHN0eWxpbmcgYW5kIDx0aXRsZT5cbiAgICAgICAgICogbWFuYWdlbWVudC4gU28gd2UganVzdCBkb2N1bWVudCBpdCBhbmQgdGhyb3cgaW4gZGFuZ2Vyb3VzIGNhc2VzLlxuICAgICAgICAgKi9cbiAgICAgICAgIWZhbHNlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJzwlcz4gdHJpZWQgdG8gdW5tb3VudC4gQmVjYXVzZSBvZiBjcm9zcy1icm93c2VyIHF1aXJrcyBpdCBpcyBpbXBvc3NpYmxlIHRvIHVubW91bnQgc29tZSB0b3AtbGV2ZWwgY29tcG9uZW50cyAoZWcgPGh0bWw+LCA8aGVhZD4sIGFuZCA8Ym9keT4pIHJlbGlhYmx5IGFuZCBlZmZpY2llbnRseS4gVG8gZml4IHRoaXMsIGhhdmUgYSBzaW5nbGUgdG9wLWxldmVsIGNvbXBvbmVudCB0aGF0IG5ldmVyIHVubW91bnRzIHJlbmRlciB0aGVzZSBlbGVtZW50cy4nLCB0aGlzLl90YWcpIDogX3Byb2RJbnZhcmlhbnQoJzY2JywgdGhpcy5fdGFnKSA6IHZvaWQgMDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy51bm1vdW50Q2hpbGRyZW4oc2FmZWx5KTtcbiAgICBSZWFjdERPTUNvbXBvbmVudFRyZWUudW5jYWNoZU5vZGUodGhpcyk7XG4gICAgRXZlbnRQbHVnaW5IdWIuZGVsZXRlQWxsTGlzdGVuZXJzKHRoaXMpO1xuICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSAwO1xuICAgIHRoaXMuX2RvbUlEID0gMDtcbiAgICB0aGlzLl93cmFwcGVyU3RhdGUgPSBudWxsO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHNldEFuZFZhbGlkYXRlQ29udGVudENoaWxkRGV2LmNhbGwodGhpcywgbnVsbCk7XG4gICAgfVxuICB9LFxuXG4gIGdldFB1YmxpY0luc3RhbmNlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdldE5vZGUodGhpcyk7XG4gIH1cblxufTtcblxuX2Fzc2lnbihSZWFjdERPTUNvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0RE9NQ29tcG9uZW50Lk1peGluLCBSZWFjdE11bHRpQ2hpbGQuTWl4aW4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NQ29tcG9uZW50OyJdfQ==