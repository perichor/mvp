"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * React (with addons) v15.4.2
 */
(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.React = f();
  }
})(function () {
  var define, module, exports;return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }return s;
  }({ 1: [function (_dereq_, module, exports) {
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

      var ExecutionEnvironment = _dereq_(43);

      /**
       * Generate a mapping of standard vendor prefixes using the defined style property and event name.
       *
       * @param {string} styleProp
       * @param {string} eventName
       * @returns {object}
       */
      function makePrefixMap(styleProp, eventName) {
        var prefixes = {};

        prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
        prefixes['Webkit' + styleProp] = 'webkit' + eventName;
        prefixes['Moz' + styleProp] = 'moz' + eventName;
        prefixes['ms' + styleProp] = 'MS' + eventName;
        prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();

        return prefixes;
      }

      /**
       * A list of event names to a configurable list of vendor prefixes.
       */
      var vendorPrefixes = {
        animationend: makePrefixMap('Animation', 'AnimationEnd'),
        animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
        animationstart: makePrefixMap('Animation', 'AnimationStart'),
        transitionend: makePrefixMap('Transition', 'TransitionEnd')
      };

      /**
       * Event names that have already been detected and prefixed (if applicable).
       */
      var prefixedEventNames = {};

      /**
       * Element to check for prefixes on.
       */
      var style = {};

      /**
       * Bootstrap if a DOM exists.
       */
      if (ExecutionEnvironment.canUseDOM) {
        style = document.createElement('div').style;

        // On some platforms, in particular some releases of Android 4.x,
        // the un-prefixed "animation" and "transition" properties are defined on the
        // style object but the events that fire will still be prefixed, so we need
        // to check if the un-prefixed events are usable, and if not remove them from the map.
        if (!('AnimationEvent' in window)) {
          delete vendorPrefixes.animationend.animation;
          delete vendorPrefixes.animationiteration.animation;
          delete vendorPrefixes.animationstart.animation;
        }

        // Same as above
        if (!('TransitionEvent' in window)) {
          delete vendorPrefixes.transitionend.transition;
        }
      }

      /**
       * Attempts to determine the correct vendor prefixed event name.
       *
       * @param {string} eventName
       * @returns {string}
       */
      function getVendorPrefixedEventName(eventName) {
        if (prefixedEventNames[eventName]) {
          return prefixedEventNames[eventName];
        } else if (!vendorPrefixes[eventName]) {
          return eventName;
        }

        var prefixMap = vendorPrefixes[eventName];

        for (var styleProp in prefixMap) {
          if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
            return prefixedEventNames[eventName] = prefixMap[styleProp];
          }
        }

        return '';
      }

      module.exports = getVendorPrefixedEventName;
    }, { "43": 43 }], 2: [function (_dereq_, module, exports) {
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

      /**
       * Escape and wrap key so it is safe to use as a reactid
       *
       * @param {string} key to be escaped.
       * @return {string} the escaped key.
       */

      function escape(key) {
        var escapeRegex = /[=:]/g;
        var escaperLookup = {
          '=': '=0',
          ':': '=2'
        };
        var escapedString = ('' + key).replace(escapeRegex, function (match) {
          return escaperLookup[match];
        });

        return '$' + escapedString;
      }

      /**
       * Unescape and unwrap key for human-readable display
       *
       * @param {string} key to unescape.
       * @return {string} the unescaped key.
       */
      function unescape(key) {
        var unescapeRegex = /(=0|=2)/g;
        var unescaperLookup = {
          '=0': '=',
          '=2': ':'
        };
        var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

        return ('' + keySubstring).replace(unescapeRegex, function (match) {
          return unescaperLookup[match];
        });
      }

      var KeyEscapeUtils = {
        escape: escape,
        unescape: unescape
      };

      module.exports = KeyEscapeUtils;
    }, {}], 3: [function (_dereq_, module, exports) {
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

      var ReactLink = _dereq_(20);
      var ReactStateSetters = _dereq_(26);

      /**
       * A simple mixin around ReactLink.forState().
       * See https://facebook.github.io/react/docs/two-way-binding-helpers.html
       */
      var LinkedStateMixin = {
        /**
         * Create a ReactLink that's linked to part of this component's state. The
         * ReactLink will have the current value of this.state[key] and will call
         * setState() when a change is requested.
         *
         * @param {string} key state key to update.
         * @return {ReactLink} ReactLink instance linking to the state.
         */
        linkState: function linkState(key) {
          return new ReactLink(this.state[key], ReactStateSetters.createStateKeySetter(this, key));
        }
      };

      module.exports = LinkedStateMixin;
    }, { "20": 20, "26": 26 }], 4: [function (_dereq_, module, exports) {
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

      var _prodInvariant = _dereq_(38);

      var invariant = _dereq_(46);

      /**
       * Static poolers. Several custom versions for each potential number of
       * arguments. A completely generic pooler is easy to implement, but would
       * require accessing the `arguments` object. In each of these, `this` refers to
       * the Class itself, not an instance. If any others are needed, simply add them
       * here, or in their own files.
       */
      var oneArgumentPooler = function oneArgumentPooler(copyFieldsFrom) {
        var Klass = this;
        if (Klass.instancePool.length) {
          var instance = Klass.instancePool.pop();
          Klass.call(instance, copyFieldsFrom);
          return instance;
        } else {
          return new Klass(copyFieldsFrom);
        }
      };

      var twoArgumentPooler = function twoArgumentPooler(a1, a2) {
        var Klass = this;
        if (Klass.instancePool.length) {
          var instance = Klass.instancePool.pop();
          Klass.call(instance, a1, a2);
          return instance;
        } else {
          return new Klass(a1, a2);
        }
      };

      var threeArgumentPooler = function threeArgumentPooler(a1, a2, a3) {
        var Klass = this;
        if (Klass.instancePool.length) {
          var instance = Klass.instancePool.pop();
          Klass.call(instance, a1, a2, a3);
          return instance;
        } else {
          return new Klass(a1, a2, a3);
        }
      };

      var fourArgumentPooler = function fourArgumentPooler(a1, a2, a3, a4) {
        var Klass = this;
        if (Klass.instancePool.length) {
          var instance = Klass.instancePool.pop();
          Klass.call(instance, a1, a2, a3, a4);
          return instance;
        } else {
          return new Klass(a1, a2, a3, a4);
        }
      };

      var standardReleaser = function standardReleaser(instance) {
        var Klass = this;
        !(instance instanceof Klass) ? "development" !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
        instance.destructor();
        if (Klass.instancePool.length < Klass.poolSize) {
          Klass.instancePool.push(instance);
        }
      };

      var DEFAULT_POOL_SIZE = 10;
      var DEFAULT_POOLER = oneArgumentPooler;

      /**
       * Augments `CopyConstructor` to be a poolable class, augmenting only the class
       * itself (statically) not adding any prototypical fields. Any CopyConstructor
       * you give this may have a `poolSize` property, and will look for a
       * prototypical `destructor` on instances.
       *
       * @param {Function} CopyConstructor Constructor that can be used to reset.
       * @param {Function} pooler Customizable pooler.
       */
      var addPoolingTo = function addPoolingTo(CopyConstructor, pooler) {
        // Casting as any so that flow ignores the actual implementation and trusts
        // it to match the type we declared
        var NewKlass = CopyConstructor;
        NewKlass.instancePool = [];
        NewKlass.getPooled = pooler || DEFAULT_POOLER;
        if (!NewKlass.poolSize) {
          NewKlass.poolSize = DEFAULT_POOL_SIZE;
        }
        NewKlass.release = standardReleaser;
        return NewKlass;
      };

      var PooledClass = {
        addPoolingTo: addPoolingTo,
        oneArgumentPooler: oneArgumentPooler,
        twoArgumentPooler: twoArgumentPooler,
        threeArgumentPooler: threeArgumentPooler,
        fourArgumentPooler: fourArgumentPooler
      };

      module.exports = PooledClass;
    }, { "38": 38, "46": 46 }], 5: [function (_dereq_, module, exports) {
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

      var _assign = _dereq_(49);

      var ReactChildren = _dereq_(9);
      var ReactComponent = _dereq_(11);
      var ReactPureComponent = _dereq_(25);
      var ReactClass = _dereq_(10);
      var ReactDOMFactories = _dereq_(15);
      var ReactElement = _dereq_(16);
      var ReactPropTypes = _dereq_(23);
      var ReactVersion = _dereq_(30);

      var onlyChild = _dereq_(37);
      var warning = _dereq_(48);

      var createElement = ReactElement.createElement;
      var createFactory = ReactElement.createFactory;
      var cloneElement = ReactElement.cloneElement;

      if ("development" !== 'production') {
        var ReactElementValidator = _dereq_(18);
        createElement = ReactElementValidator.createElement;
        createFactory = ReactElementValidator.createFactory;
        cloneElement = ReactElementValidator.cloneElement;
      }

      var __spread = _assign;

      if ("development" !== 'production') {
        var warned = false;
        __spread = function __spread() {
          "development" !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
          warned = true;
          return _assign.apply(null, arguments);
        };
      }

      var React = {

        // Modern

        Children: {
          map: ReactChildren.map,
          forEach: ReactChildren.forEach,
          count: ReactChildren.count,
          toArray: ReactChildren.toArray,
          only: onlyChild
        },

        Component: ReactComponent,
        PureComponent: ReactPureComponent,

        createElement: createElement,
        cloneElement: cloneElement,
        isValidElement: ReactElement.isValidElement,

        // Classic

        PropTypes: ReactPropTypes,
        createClass: ReactClass.createClass,
        createFactory: createFactory,
        createMixin: function createMixin(mixin) {
          // Currently a noop. Will be used to validate and trace mixins.
          return mixin;
        },

        // This looks DOM specific but these are actually isomorphic helpers
        // since they are just generating DOM strings.
        DOM: ReactDOMFactories,

        version: ReactVersion,

        // Deprecated hook for JSX spread, don't use this for anything.
        __spread: __spread
      };

      module.exports = React;
    }, { "10": 10, "11": 11, "15": 15, "16": 16, "18": 18, "23": 23, "25": 25, "30": 30, "37": 37, "48": 48, "49": 49, "9": 9 }], 6: [function (_dereq_, module, exports) {
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

      var ReactDOM;

      function getReactDOM() {
        if (!ReactDOM) {
          // This is safe to use because current module only exists in the addons build:
          var ReactWithAddonsUMDEntry = _dereq_(32);
          // This is injected by the ReactDOM UMD build:
          ReactDOM = ReactWithAddonsUMDEntry.__SECRET_INJECTED_REACT_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        }
        return ReactDOM;
      }

      exports.getReactDOM = getReactDOM;

      if ("development" !== 'production') {
        exports.getReactPerf = function () {
          return getReactDOM().__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactPerf;
        };

        exports.getReactTestUtils = function () {
          return getReactDOM().__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactTestUtils;
        };
      }
    }, { "32": 32 }], 7: [function (_dereq_, module, exports) {
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

      var _assign = _dereq_(49);

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var React = _dereq_(5);

      var ReactTransitionGroup = _dereq_(29);
      var ReactCSSTransitionGroupChild = _dereq_(8);

      function createTransitionTimeoutPropValidator(transitionType) {
        var timeoutPropName = 'transition' + transitionType + 'Timeout';
        var enabledPropName = 'transition' + transitionType;

        return function (props) {
          // If the transition is enabled
          if (props[enabledPropName]) {
            // If no timeout duration is provided
            if (props[timeoutPropName] == null) {
              return new Error(timeoutPropName + ' wasn\'t supplied to ReactCSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

              // If the duration isn't a number
            } else if (typeof props[timeoutPropName] !== 'number') {
              return new Error(timeoutPropName + ' must be a number (in milliseconds)');
            }
          }
        };
      }

      /**
       * An easy way to perform CSS transitions and animations when a React component
       * enters or leaves the DOM.
       * See https://facebook.github.io/react/docs/animation.html#high-level-api-reactcsstransitiongroup
       */

      var ReactCSSTransitionGroup = function (_React$Component) {
        _inherits(ReactCSSTransitionGroup, _React$Component);

        function ReactCSSTransitionGroup() {
          var _temp, _this, _ret;

          _classCallCheck(this, ReactCSSTransitionGroup);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._wrapChild = function (child) {
            // We need to provide this childFactory so that
            // ReactCSSTransitionGroupChild can receive updates to name, enter, and
            // leave while it is leaving.
            return React.createElement(ReactCSSTransitionGroupChild, {
              name: _this.props.transitionName,
              appear: _this.props.transitionAppear,
              enter: _this.props.transitionEnter,
              leave: _this.props.transitionLeave,
              appearTimeout: _this.props.transitionAppearTimeout,
              enterTimeout: _this.props.transitionEnterTimeout,
              leaveTimeout: _this.props.transitionLeaveTimeout
            }, child);
          }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        ReactCSSTransitionGroup.prototype.render = function render() {
          return React.createElement(ReactTransitionGroup, _assign({}, this.props, { childFactory: this._wrapChild }));
        };

        return ReactCSSTransitionGroup;
      }(React.Component);

      ReactCSSTransitionGroup.displayName = 'ReactCSSTransitionGroup';
      ReactCSSTransitionGroup.propTypes = {
        transitionName: ReactCSSTransitionGroupChild.propTypes.name,

        transitionAppear: React.PropTypes.bool,
        transitionEnter: React.PropTypes.bool,
        transitionLeave: React.PropTypes.bool,
        transitionAppearTimeout: createTransitionTimeoutPropValidator('Appear'),
        transitionEnterTimeout: createTransitionTimeoutPropValidator('Enter'),
        transitionLeaveTimeout: createTransitionTimeoutPropValidator('Leave')
      };
      ReactCSSTransitionGroup.defaultProps = {
        transitionAppear: false,
        transitionEnter: true,
        transitionLeave: true
      };

      module.exports = ReactCSSTransitionGroup;
    }, { "29": 29, "49": 49, "5": 5, "8": 8 }], 8: [function (_dereq_, module, exports) {
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

      var React = _dereq_(5);
      var ReactAddonsDOMDependencies = _dereq_(6);

      var CSSCore = _dereq_(42);
      var ReactTransitionEvents = _dereq_(28);

      var onlyChild = _dereq_(37);

      var TICK = 17;

      var ReactCSSTransitionGroupChild = React.createClass({
        displayName: 'ReactCSSTransitionGroupChild',

        propTypes: {
          name: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.shape({
            enter: React.PropTypes.string,
            leave: React.PropTypes.string,
            active: React.PropTypes.string
          }), React.PropTypes.shape({
            enter: React.PropTypes.string,
            enterActive: React.PropTypes.string,
            leave: React.PropTypes.string,
            leaveActive: React.PropTypes.string,
            appear: React.PropTypes.string,
            appearActive: React.PropTypes.string
          })]).isRequired,

          // Once we require timeouts to be specified, we can remove the
          // boolean flags (appear etc.) and just accept a number
          // or a bool for the timeout flags (appearTimeout etc.)
          appear: React.PropTypes.bool,
          enter: React.PropTypes.bool,
          leave: React.PropTypes.bool,
          appearTimeout: React.PropTypes.number,
          enterTimeout: React.PropTypes.number,
          leaveTimeout: React.PropTypes.number
        },

        transition: function transition(animationType, finishCallback, userSpecifiedDelay) {
          var node = ReactAddonsDOMDependencies.getReactDOM().findDOMNode(this);

          if (!node) {
            if (finishCallback) {
              finishCallback();
            }
            return;
          }

          var className = this.props.name[animationType] || this.props.name + '-' + animationType;
          var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
          var timeout = null;

          var endListener = function endListener(e) {
            if (e && e.target !== node) {
              return;
            }

            clearTimeout(timeout);

            CSSCore.removeClass(node, className);
            CSSCore.removeClass(node, activeClassName);

            ReactTransitionEvents.removeEndEventListener(node, endListener);

            // Usually this optional callback is used for informing an owner of
            // a leave animation and telling it to remove the child.
            if (finishCallback) {
              finishCallback();
            }
          };

          CSSCore.addClass(node, className);

          // Need to do this to actually trigger a transition.
          this.queueClassAndNode(activeClassName, node);

          // If the user specified a timeout delay.
          if (userSpecifiedDelay) {
            // Clean-up the animation after the specified delay
            timeout = setTimeout(endListener, userSpecifiedDelay);
            this.transitionTimeouts.push(timeout);
          } else {
            // DEPRECATED: this listener will be removed in a future version of react
            ReactTransitionEvents.addEndEventListener(node, endListener);
          }
        },

        queueClassAndNode: function queueClassAndNode(className, node) {
          this.classNameAndNodeQueue.push({
            className: className,
            node: node
          });

          if (!this.timeout) {
            this.timeout = setTimeout(this.flushClassNameAndNodeQueue, TICK);
          }
        },

        flushClassNameAndNodeQueue: function flushClassNameAndNodeQueue() {
          if (this.isMounted()) {
            this.classNameAndNodeQueue.forEach(function (obj) {
              CSSCore.addClass(obj.node, obj.className);
            });
          }
          this.classNameAndNodeQueue.length = 0;
          this.timeout = null;
        },

        componentWillMount: function componentWillMount() {
          this.classNameAndNodeQueue = [];
          this.transitionTimeouts = [];
        },

        componentWillUnmount: function componentWillUnmount() {
          if (this.timeout) {
            clearTimeout(this.timeout);
          }
          this.transitionTimeouts.forEach(function (timeout) {
            clearTimeout(timeout);
          });

          this.classNameAndNodeQueue.length = 0;
        },

        componentWillAppear: function componentWillAppear(done) {
          if (this.props.appear) {
            this.transition('appear', done, this.props.appearTimeout);
          } else {
            done();
          }
        },

        componentWillEnter: function componentWillEnter(done) {
          if (this.props.enter) {
            this.transition('enter', done, this.props.enterTimeout);
          } else {
            done();
          }
        },

        componentWillLeave: function componentWillLeave(done) {
          if (this.props.leave) {
            this.transition('leave', done, this.props.leaveTimeout);
          } else {
            done();
          }
        },

        render: function render() {
          return onlyChild(this.props.children);
        }
      });

      module.exports = ReactCSSTransitionGroupChild;
    }, { "28": 28, "37": 37, "42": 42, "5": 5, "6": 6 }], 9: [function (_dereq_, module, exports) {
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

      var PooledClass = _dereq_(4);
      var ReactElement = _dereq_(16);

      var emptyFunction = _dereq_(44);
      var traverseAllChildren = _dereq_(40);

      var twoArgumentPooler = PooledClass.twoArgumentPooler;
      var fourArgumentPooler = PooledClass.fourArgumentPooler;

      var userProvidedKeyEscapeRegex = /\/+/g;
      function escapeUserProvidedKey(text) {
        return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
      }

      /**
       * PooledClass representing the bookkeeping associated with performing a child
       * traversal. Allows avoiding binding callbacks.
       *
       * @constructor ForEachBookKeeping
       * @param {!function} forEachFunction Function to perform traversal with.
       * @param {?*} forEachContext Context to perform context with.
       */
      function ForEachBookKeeping(forEachFunction, forEachContext) {
        this.func = forEachFunction;
        this.context = forEachContext;
        this.count = 0;
      }
      ForEachBookKeeping.prototype.destructor = function () {
        this.func = null;
        this.context = null;
        this.count = 0;
      };
      PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

      function forEachSingleChild(bookKeeping, child, name) {
        var func = bookKeeping.func,
            context = bookKeeping.context;

        func.call(context, child, bookKeeping.count++);
      }

      /**
       * Iterates through children that are typically specified as `props.children`.
       *
       * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
       *
       * The provided forEachFunc(child, index) will be called for each
       * leaf child.
       *
       * @param {?*} children Children tree container.
       * @param {function(*, int)} forEachFunc
       * @param {*} forEachContext Context for forEachContext.
       */
      function forEachChildren(children, forEachFunc, forEachContext) {
        if (children == null) {
          return children;
        }
        var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
        traverseAllChildren(children, forEachSingleChild, traverseContext);
        ForEachBookKeeping.release(traverseContext);
      }

      /**
       * PooledClass representing the bookkeeping associated with performing a child
       * mapping. Allows avoiding binding callbacks.
       *
       * @constructor MapBookKeeping
       * @param {!*} mapResult Object containing the ordered map of results.
       * @param {!function} mapFunction Function to perform mapping with.
       * @param {?*} mapContext Context to perform mapping with.
       */
      function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
        this.result = mapResult;
        this.keyPrefix = keyPrefix;
        this.func = mapFunction;
        this.context = mapContext;
        this.count = 0;
      }
      MapBookKeeping.prototype.destructor = function () {
        this.result = null;
        this.keyPrefix = null;
        this.func = null;
        this.context = null;
        this.count = 0;
      };
      PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

      function mapSingleChildIntoContext(bookKeeping, child, childKey) {
        var result = bookKeeping.result,
            keyPrefix = bookKeeping.keyPrefix,
            func = bookKeeping.func,
            context = bookKeeping.context;

        var mappedChild = func.call(context, child, bookKeeping.count++);
        if (Array.isArray(mappedChild)) {
          mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
        } else if (mappedChild != null) {
          if (ReactElement.isValidElement(mappedChild)) {
            mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
          }
          result.push(mappedChild);
        }
      }

      function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
        var escapedPrefix = '';
        if (prefix != null) {
          escapedPrefix = escapeUserProvidedKey(prefix) + '/';
        }
        var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
        traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
        MapBookKeeping.release(traverseContext);
      }

      /**
       * Maps children that are typically specified as `props.children`.
       *
       * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
       *
       * The provided mapFunction(child, key, index) will be called for each
       * leaf child.
       *
       * @param {?*} children Children tree container.
       * @param {function(*, int)} func The map function.
       * @param {*} context Context for mapFunction.
       * @return {object} Object containing the ordered map of results.
       */
      function mapChildren(children, func, context) {
        if (children == null) {
          return children;
        }
        var result = [];
        mapIntoWithKeyPrefixInternal(children, result, null, func, context);
        return result;
      }

      function forEachSingleChildDummy(traverseContext, child, name) {
        return null;
      }

      /**
       * Count the number of children that are typically specified as
       * `props.children`.
       *
       * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
       *
       * @param {?*} children Children tree container.
       * @return {number} The number of children.
       */
      function countChildren(children, context) {
        return traverseAllChildren(children, forEachSingleChildDummy, null);
      }

      /**
       * Flatten a children object (typically specified as `props.children`) and
       * return an array with appropriately re-keyed children.
       *
       * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
       */
      function toArray(children) {
        var result = [];
        mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
        return result;
      }

      var ReactChildren = {
        forEach: forEachChildren,
        map: mapChildren,
        mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
        count: countChildren,
        toArray: toArray
      };

      module.exports = ReactChildren;
    }, { "16": 16, "4": 4, "40": 40, "44": 44 }], 10: [function (_dereq_, module, exports) {
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

      var _prodInvariant = _dereq_(38),
          _assign = _dereq_(49);

      var ReactComponent = _dereq_(11);
      var ReactElement = _dereq_(16);
      var ReactPropTypeLocationNames = _dereq_(22);
      var ReactNoopUpdateQueue = _dereq_(21);

      var emptyObject = _dereq_(45);
      var invariant = _dereq_(46);
      var warning = _dereq_(48);

      var MIXINS_KEY = 'mixins';

      // Helper function to allow the creation of anonymous functions which do not
      // have .name set to the name of the variable being assigned to.
      function identity(fn) {
        return fn;
      }

      /**
       * Policies that describe methods in `ReactClassInterface`.
       */

      var injectedMixins = [];

      /**
       * Composite components are higher-level components that compose other composite
       * or host components.
       *
       * To create a new type of `ReactClass`, pass a specification of
       * your new class to `React.createClass`. The only requirement of your class
       * specification is that you implement a `render` method.
       *
       *   var MyComponent = React.createClass({
       *     render: function() {
       *       return <div>Hello World</div>;
       *     }
       *   });
       *
       * The class specification supports a specific protocol of methods that have
       * special meaning (e.g. `render`). See `ReactClassInterface` for
       * more the comprehensive protocol. Any other properties and methods in the
       * class specification will be available on the prototype.
       *
       * @interface ReactClassInterface
       * @internal
       */
      var ReactClassInterface = {

        /**
         * An array of Mixin objects to include when defining your component.
         *
         * @type {array}
         * @optional
         */
        mixins: 'DEFINE_MANY',

        /**
         * An object containing properties and methods that should be defined on
         * the component's constructor instead of its prototype (static methods).
         *
         * @type {object}
         * @optional
         */
        statics: 'DEFINE_MANY',

        /**
         * Definition of prop types for this component.
         *
         * @type {object}
         * @optional
         */
        propTypes: 'DEFINE_MANY',

        /**
         * Definition of context types for this component.
         *
         * @type {object}
         * @optional
         */
        contextTypes: 'DEFINE_MANY',

        /**
         * Definition of context types this component sets for its children.
         *
         * @type {object}
         * @optional
         */
        childContextTypes: 'DEFINE_MANY',

        // ==== Definition methods ====

        /**
         * Invoked when the component is mounted. Values in the mapping will be set on
         * `this.props` if that prop is not specified (i.e. using an `in` check).
         *
         * This method is invoked before `getInitialState` and therefore cannot rely
         * on `this.state` or use `this.setState`.
         *
         * @return {object}
         * @optional
         */
        getDefaultProps: 'DEFINE_MANY_MERGED',

        /**
         * Invoked once before the component is mounted. The return value will be used
         * as the initial value of `this.state`.
         *
         *   getInitialState: function() {
         *     return {
         *       isOn: false,
         *       fooBaz: new BazFoo()
         *     }
         *   }
         *
         * @return {object}
         * @optional
         */
        getInitialState: 'DEFINE_MANY_MERGED',

        /**
         * @return {object}
         * @optional
         */
        getChildContext: 'DEFINE_MANY_MERGED',

        /**
         * Uses props from `this.props` and state from `this.state` to render the
         * structure of the component.
         *
         * No guarantees are made about when or how often this method is invoked, so
         * it must not have side effects.
         *
         *   render: function() {
         *     var name = this.props.name;
         *     return <div>Hello, {name}!</div>;
         *   }
         *
         * @return {ReactComponent}
         * @nosideeffects
         * @required
         */
        render: 'DEFINE_ONCE',

        // ==== Delegate methods ====

        /**
         * Invoked when the component is initially created and about to be mounted.
         * This may have side effects, but any external subscriptions or data created
         * by this method must be cleaned up in `componentWillUnmount`.
         *
         * @optional
         */
        componentWillMount: 'DEFINE_MANY',

        /**
         * Invoked when the component has been mounted and has a DOM representation.
         * However, there is no guarantee that the DOM node is in the document.
         *
         * Use this as an opportunity to operate on the DOM when the component has
         * been mounted (initialized and rendered) for the first time.
         *
         * @param {DOMElement} rootNode DOM element representing the component.
         * @optional
         */
        componentDidMount: 'DEFINE_MANY',

        /**
         * Invoked before the component receives new props.
         *
         * Use this as an opportunity to react to a prop transition by updating the
         * state using `this.setState`. Current props are accessed via `this.props`.
         *
         *   componentWillReceiveProps: function(nextProps, nextContext) {
         *     this.setState({
         *       likesIncreasing: nextProps.likeCount > this.props.likeCount
         *     });
         *   }
         *
         * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
         * transition may cause a state change, but the opposite is not true. If you
         * need it, you are probably looking for `componentWillUpdate`.
         *
         * @param {object} nextProps
         * @optional
         */
        componentWillReceiveProps: 'DEFINE_MANY',

        /**
         * Invoked while deciding if the component should be updated as a result of
         * receiving new props, state and/or context.
         *
         * Use this as an opportunity to `return false` when you're certain that the
         * transition to the new props/state/context will not require a component
         * update.
         *
         *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
         *     return !equal(nextProps, this.props) ||
         *       !equal(nextState, this.state) ||
         *       !equal(nextContext, this.context);
         *   }
         *
         * @param {object} nextProps
         * @param {?object} nextState
         * @param {?object} nextContext
         * @return {boolean} True if the component should update.
         * @optional
         */
        shouldComponentUpdate: 'DEFINE_ONCE',

        /**
         * Invoked when the component is about to update due to a transition from
         * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
         * and `nextContext`.
         *
         * Use this as an opportunity to perform preparation before an update occurs.
         *
         * NOTE: You **cannot** use `this.setState()` in this method.
         *
         * @param {object} nextProps
         * @param {?object} nextState
         * @param {?object} nextContext
         * @param {ReactReconcileTransaction} transaction
         * @optional
         */
        componentWillUpdate: 'DEFINE_MANY',

        /**
         * Invoked when the component's DOM representation has been updated.
         *
         * Use this as an opportunity to operate on the DOM when the component has
         * been updated.
         *
         * @param {object} prevProps
         * @param {?object} prevState
         * @param {?object} prevContext
         * @param {DOMElement} rootNode DOM element representing the component.
         * @optional
         */
        componentDidUpdate: 'DEFINE_MANY',

        /**
         * Invoked when the component is about to be removed from its parent and have
         * its DOM representation destroyed.
         *
         * Use this as an opportunity to deallocate any external resources.
         *
         * NOTE: There is no `componentDidUnmount` since your component will have been
         * destroyed by that point.
         *
         * @optional
         */
        componentWillUnmount: 'DEFINE_MANY',

        // ==== Advanced methods ====

        /**
         * Updates the component's currently mounted DOM representation.
         *
         * By default, this implements React's rendering and reconciliation algorithm.
         * Sophisticated clients may wish to override this.
         *
         * @param {ReactReconcileTransaction} transaction
         * @internal
         * @overridable
         */
        updateComponent: 'OVERRIDE_BASE'

      };

      /**
       * Mapping from class specification keys to special processing functions.
       *
       * Although these are declared like instance properties in the specification
       * when defining classes using `React.createClass`, they are actually static
       * and are accessible on the constructor instead of the prototype. Despite
       * being static, they must be defined outside of the "statics" key under
       * which all other static methods are defined.
       */
      var RESERVED_SPEC_KEYS = {
        displayName: function displayName(Constructor, _displayName) {
          Constructor.displayName = _displayName;
        },
        mixins: function mixins(Constructor, _mixins) {
          if (_mixins) {
            for (var i = 0; i < _mixins.length; i++) {
              mixSpecIntoComponent(Constructor, _mixins[i]);
            }
          }
        },
        childContextTypes: function childContextTypes(Constructor, _childContextTypes) {
          if ("development" !== 'production') {
            validateTypeDef(Constructor, _childContextTypes, 'childContext');
          }
          Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, _childContextTypes);
        },
        contextTypes: function contextTypes(Constructor, _contextTypes) {
          if ("development" !== 'production') {
            validateTypeDef(Constructor, _contextTypes, 'context');
          }
          Constructor.contextTypes = _assign({}, Constructor.contextTypes, _contextTypes);
        },
        /**
         * Special case getDefaultProps which should move into statics but requires
         * automatic merging.
         */
        getDefaultProps: function getDefaultProps(Constructor, _getDefaultProps) {
          if (Constructor.getDefaultProps) {
            Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, _getDefaultProps);
          } else {
            Constructor.getDefaultProps = _getDefaultProps;
          }
        },
        propTypes: function propTypes(Constructor, _propTypes) {
          if ("development" !== 'production') {
            validateTypeDef(Constructor, _propTypes, 'prop');
          }
          Constructor.propTypes = _assign({}, Constructor.propTypes, _propTypes);
        },
        statics: function statics(Constructor, _statics) {
          mixStaticSpecIntoComponent(Constructor, _statics);
        },
        autobind: function autobind() {} };

      function validateTypeDef(Constructor, typeDef, location) {
        for (var propName in typeDef) {
          if (typeDef.hasOwnProperty(propName)) {
            // use a warning instead of an invariant so components
            // don't show up in prod but only in __DEV__
            "development" !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
          }
        }
      }

      function validateMethodOverride(isAlreadyDefined, name) {
        var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

        // Disallow overriding of base class methods unless explicitly allowed.
        if (ReactClassMixin.hasOwnProperty(name)) {
          !(specPolicy === 'OVERRIDE_BASE') ? "development" !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
        }

        // Disallow defining methods more than once unless explicitly allowed.
        if (isAlreadyDefined) {
          !(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED') ? "development" !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
        }
      }

      /**
       * Mixin helper which handles policy validation and reserved
       * specification keys when building React classes.
       */
      function mixSpecIntoComponent(Constructor, spec) {
        if (!spec) {
          if ("development" !== 'production') {
            var typeofSpec = typeof spec === "undefined" ? "undefined" : _typeof(spec);
            var isMixinValid = typeofSpec === 'object' && spec !== null;

            "development" !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
          }

          return;
        }

        !(typeof spec !== 'function') ? "development" !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
        !!ReactElement.isValidElement(spec) ? "development" !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

        var proto = Constructor.prototype;
        var autoBindPairs = proto.__reactAutoBindPairs;

        // By handling mixins before any other properties, we ensure the same
        // chaining order is applied to methods with DEFINE_MANY policy, whether
        // mixins are listed before or after these methods in the spec.
        if (spec.hasOwnProperty(MIXINS_KEY)) {
          RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
        }

        for (var name in spec) {
          if (!spec.hasOwnProperty(name)) {
            continue;
          }

          if (name === MIXINS_KEY) {
            // We have already handled mixins in a special case above.
            continue;
          }

          var property = spec[name];
          var isAlreadyDefined = proto.hasOwnProperty(name);
          validateMethodOverride(isAlreadyDefined, name);

          if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
            RESERVED_SPEC_KEYS[name](Constructor, property);
          } else {
            // Setup methods on prototype:
            // The following member methods should not be automatically bound:
            // 1. Expected ReactClass methods (in the "interface").
            // 2. Overridden methods (that were mixed in).
            var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
            var isFunction = typeof property === 'function';
            var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

            if (shouldAutoBind) {
              autoBindPairs.push(name, property);
              proto[name] = property;
            } else {
              if (isAlreadyDefined) {
                var specPolicy = ReactClassInterface[name];

                // These cases should already be caught by validateMethodOverride.
                !(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY')) ? "development" !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

                // For methods which are defined more than once, call the existing
                // methods before calling the new property, merging if appropriate.
                if (specPolicy === 'DEFINE_MANY_MERGED') {
                  proto[name] = createMergedResultFunction(proto[name], property);
                } else if (specPolicy === 'DEFINE_MANY') {
                  proto[name] = createChainedFunction(proto[name], property);
                }
              } else {
                proto[name] = property;
                if ("development" !== 'production') {
                  // Add verbose displayName to the function, which helps when looking
                  // at profiling tools.
                  if (typeof property === 'function' && spec.displayName) {
                    proto[name].displayName = spec.displayName + '_' + name;
                  }
                }
              }
            }
          }
        }
      }

      function mixStaticSpecIntoComponent(Constructor, statics) {
        if (!statics) {
          return;
        }
        for (var name in statics) {
          var property = statics[name];
          if (!statics.hasOwnProperty(name)) {
            continue;
          }

          var isReserved = name in RESERVED_SPEC_KEYS;
          !!isReserved ? "development" !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

          var isInherited = name in Constructor;
          !!isInherited ? "development" !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
          Constructor[name] = property;
        }
      }

      /**
       * Merge two objects, but throw if both contain the same key.
       *
       * @param {object} one The first object, which is mutated.
       * @param {object} two The second object
       * @return {object} one after it has been mutated to contain everything in two.
       */
      function mergeIntoWithNoDuplicateKeys(one, two) {
        !(one && two && (typeof one === "undefined" ? "undefined" : _typeof(one)) === 'object' && (typeof two === "undefined" ? "undefined" : _typeof(two)) === 'object') ? "development" !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

        for (var key in two) {
          if (two.hasOwnProperty(key)) {
            !(one[key] === undefined) ? "development" !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
            one[key] = two[key];
          }
        }
        return one;
      }

      /**
       * Creates a function that invokes two functions and merges their return values.
       *
       * @param {function} one Function to invoke first.
       * @param {function} two Function to invoke second.
       * @return {function} Function that invokes the two argument functions.
       * @private
       */
      function createMergedResultFunction(one, two) {
        return function mergedResult() {
          var a = one.apply(this, arguments);
          var b = two.apply(this, arguments);
          if (a == null) {
            return b;
          } else if (b == null) {
            return a;
          }
          var c = {};
          mergeIntoWithNoDuplicateKeys(c, a);
          mergeIntoWithNoDuplicateKeys(c, b);
          return c;
        };
      }

      /**
       * Creates a function that invokes two functions and ignores their return vales.
       *
       * @param {function} one Function to invoke first.
       * @param {function} two Function to invoke second.
       * @return {function} Function that invokes the two argument functions.
       * @private
       */
      function createChainedFunction(one, two) {
        return function chainedFunction() {
          one.apply(this, arguments);
          two.apply(this, arguments);
        };
      }

      /**
       * Binds a method to the component.
       *
       * @param {object} component Component whose method is going to be bound.
       * @param {function} method Method to be bound.
       * @return {function} The bound method.
       */
      function bindAutoBindMethod(component, method) {
        var boundMethod = method.bind(component);
        if ("development" !== 'production') {
          boundMethod.__reactBoundContext = component;
          boundMethod.__reactBoundMethod = method;
          boundMethod.__reactBoundArguments = null;
          var componentName = component.constructor.displayName;
          var _bind = boundMethod.bind;
          boundMethod.bind = function (newThis) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            // User is trying to bind() an autobound method; we effectively will
            // ignore the value of "this" that the user is trying to use, so
            // let's warn.
            if (newThis !== component && newThis !== null) {
              "development" !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
            } else if (!args.length) {
              "development" !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
              return boundMethod;
            }
            var reboundMethod = _bind.apply(boundMethod, arguments);
            reboundMethod.__reactBoundContext = component;
            reboundMethod.__reactBoundMethod = method;
            reboundMethod.__reactBoundArguments = args;
            return reboundMethod;
          };
        }
        return boundMethod;
      }

      /**
       * Binds all auto-bound methods in a component.
       *
       * @param {object} component Component whose method is going to be bound.
       */
      function bindAutoBindMethods(component) {
        var pairs = component.__reactAutoBindPairs;
        for (var i = 0; i < pairs.length; i += 2) {
          var autoBindKey = pairs[i];
          var method = pairs[i + 1];
          component[autoBindKey] = bindAutoBindMethod(component, method);
        }
      }

      /**
       * Add more to the ReactClass base class. These are all legacy features and
       * therefore not already part of the modern ReactComponent.
       */
      var ReactClassMixin = {

        /**
         * TODO: This will be deprecated because state should always keep a consistent
         * type signature and the only use case for this, is to avoid that.
         */
        replaceState: function replaceState(newState, callback) {
          this.updater.enqueueReplaceState(this, newState);
          if (callback) {
            this.updater.enqueueCallback(this, callback, 'replaceState');
          }
        },

        /**
         * Checks whether or not this composite component is mounted.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function isMounted() {
          return this.updater.isMounted(this);
        }
      };

      var ReactClassComponent = function ReactClassComponent() {};
      _assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

      /**
       * Module for creating composite components.
       *
       * @class ReactClass
       */
      var ReactClass = {

        /**
         * Creates a composite component class given a class specification.
         * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
         *
         * @param {object} spec Class specification (which must define `render`).
         * @return {function} Component constructor function.
         * @public
         */
        createClass: function createClass(spec) {
          // To keep our warnings more understandable, we'll use a little hack here to
          // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
          // unnecessarily identify a class without displayName as 'Constructor'.
          var Constructor = identity(function (props, context, updater) {
            // This constructor gets overridden by mocks. The argument is used
            // by mocks to assert on what gets mounted.

            if ("development" !== 'production') {
              "development" !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
            }

            // Wire up auto-binding
            if (this.__reactAutoBindPairs.length) {
              bindAutoBindMethods(this);
            }

            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;

            this.state = null;

            // ReactClasses doesn't have constructors. Instead, they use the
            // getInitialState and componentWillMount methods for initialization.

            var initialState = this.getInitialState ? this.getInitialState() : null;
            if ("development" !== 'production') {
              // We allow auto-mocks to proceed as if they're returning null.
              if (initialState === undefined && this.getInitialState._isMockFunction) {
                // This is probably bad practice. Consider warning here and
                // deprecating this convenience.
                initialState = null;
              }
            }
            !((typeof initialState === "undefined" ? "undefined" : _typeof(initialState)) === 'object' && !Array.isArray(initialState)) ? "development" !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

            this.state = initialState;
          });
          Constructor.prototype = new ReactClassComponent();
          Constructor.prototype.constructor = Constructor;
          Constructor.prototype.__reactAutoBindPairs = [];

          injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

          mixSpecIntoComponent(Constructor, spec);

          // Initialize the defaultProps property after all mixins have been merged.
          if (Constructor.getDefaultProps) {
            Constructor.defaultProps = Constructor.getDefaultProps();
          }

          if ("development" !== 'production') {
            // This is a tag to indicate that the use of these method names is ok,
            // since it's used with createClass. If it's not, then it's likely a
            // mistake so we'll warn you to use the static property, property
            // initializer or constructor respectively.
            if (Constructor.getDefaultProps) {
              Constructor.getDefaultProps.isReactClassApproved = {};
            }
            if (Constructor.prototype.getInitialState) {
              Constructor.prototype.getInitialState.isReactClassApproved = {};
            }
          }

          !Constructor.prototype.render ? "development" !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

          if ("development" !== 'production') {
            "development" !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
            "development" !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
          }

          // Reduce time spent doing lookups by setting these on the prototype.
          for (var methodName in ReactClassInterface) {
            if (!Constructor.prototype[methodName]) {
              Constructor.prototype[methodName] = null;
            }
          }

          return Constructor;
        },

        injection: {
          injectMixin: function injectMixin(mixin) {
            injectedMixins.push(mixin);
          }
        }

      };

      module.exports = ReactClass;
    }, { "11": 11, "16": 16, "21": 21, "22": 22, "38": 38, "45": 45, "46": 46, "48": 48, "49": 49 }], 11: [function (_dereq_, module, exports) {
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

      var _prodInvariant = _dereq_(38);

      var ReactNoopUpdateQueue = _dereq_(21);

      var canDefineProperty = _dereq_(33);
      var emptyObject = _dereq_(45);
      var invariant = _dereq_(46);
      var warning = _dereq_(48);

      /**
       * Base class helpers for the updating state of a component.
       */
      function ReactComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        // We initialize the default updater but the real one gets injected by the
        // renderer.
        this.updater = updater || ReactNoopUpdateQueue;
      }

      ReactComponent.prototype.isReactComponent = {};

      /**
       * Sets a subset of the state. Always use this to mutate
       * state. You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * There is no guarantee that calls to `setState` will run synchronously,
       * as they may eventually be batched together.  You can provide an optional
       * callback that will be executed when the call to setState is actually
       * completed.
       *
       * When a function is provided to setState, it will be called at some point in
       * the future (not synchronously). It will be called with the up to date
       * component arguments (state, props, context). These values can be different
       * from this.* because your function may be called after receiveProps but before
       * shouldComponentUpdate, and this new state, props, and context will not yet be
       * assigned to this.
       *
       * @param {object|function} partialState Next partial state or function to
       *        produce next partial state to be merged with current state.
       * @param {?function} callback Called after state is updated.
       * @final
       * @protected
       */
      ReactComponent.prototype.setState = function (partialState, callback) {
        !((typeof partialState === "undefined" ? "undefined" : _typeof(partialState)) === 'object' || typeof partialState === 'function' || partialState == null) ? "development" !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
        this.updater.enqueueSetState(this, partialState);
        if (callback) {
          this.updater.enqueueCallback(this, callback, 'setState');
        }
      };

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {?function} callback Called after update is complete.
       * @final
       * @protected
       */
      ReactComponent.prototype.forceUpdate = function (callback) {
        this.updater.enqueueForceUpdate(this);
        if (callback) {
          this.updater.enqueueCallback(this, callback, 'forceUpdate');
        }
      };

      /**
       * Deprecated APIs. These APIs used to exist on classic React classes but since
       * we would like to deprecate them, we're not going to move them over to this
       * modern base class. Instead, we define a getter that warns if it's accessed.
       */
      if ("development" !== 'production') {
        var deprecatedAPIs = {
          isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
          replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
        };
        var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
          if (canDefineProperty) {
            Object.defineProperty(ReactComponent.prototype, methodName, {
              get: function get() {
                "development" !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
                return undefined;
              }
            });
          }
        };
        for (var fnName in deprecatedAPIs) {
          if (deprecatedAPIs.hasOwnProperty(fnName)) {
            defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
          }
        }
      }

      module.exports = ReactComponent;
    }, { "21": 21, "33": 33, "38": 38, "45": 45, "46": 46, "48": 48 }], 12: [function (_dereq_, module, exports) {
      /**
       * Copyright 2016-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * 
       */

      'use strict';

      var _prodInvariant = _dereq_(38);

      var ReactCurrentOwner = _dereq_(14);

      var invariant = _dereq_(46);
      var warning = _dereq_(48);

      function isNative(fn) {
        // Based on isNative() from Lodash
        var funcToString = Function.prototype.toString;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var reIsNative = RegExp('^' + funcToString
        // Take an example native function source for comparison
        .call(hasOwnProperty)
        // Strip regex characters so we can use it for regex
        .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
        // Remove hasOwnProperty from the template to make it generic
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
        try {
          var source = funcToString.call(fn);
          return reIsNative.test(source);
        } catch (err) {
          return false;
        }
      }

      var canUseCollections =
      // Array.from
      typeof Array.from === 'function' &&
      // Map
      typeof Map === 'function' && isNative(Map) &&
      // Map.prototype.keys
      Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
      // Set
      typeof Set === 'function' && isNative(Set) &&
      // Set.prototype.keys
      Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

      var setItem;
      var getItem;
      var removeItem;
      var getItemIDs;
      var addRoot;
      var removeRoot;
      var getRootIDs;

      if (canUseCollections) {
        var itemMap = new Map();
        var rootIDSet = new Set();

        setItem = function setItem(id, item) {
          itemMap.set(id, item);
        };
        getItem = function getItem(id) {
          return itemMap.get(id);
        };
        removeItem = function removeItem(id) {
          itemMap['delete'](id);
        };
        getItemIDs = function getItemIDs() {
          return Array.from(itemMap.keys());
        };

        addRoot = function addRoot(id) {
          rootIDSet.add(id);
        };
        removeRoot = function removeRoot(id) {
          rootIDSet['delete'](id);
        };
        getRootIDs = function getRootIDs() {
          return Array.from(rootIDSet.keys());
        };
      } else {
        var itemByKey = {};
        var rootByKey = {};

        // Use non-numeric keys to prevent V8 performance issues:
        // https://github.com/facebook/react/pull/7232
        var getKeyFromID = function getKeyFromID(id) {
          return '.' + id;
        };
        var getIDFromKey = function getIDFromKey(key) {
          return parseInt(key.substr(1), 10);
        };

        setItem = function setItem(id, item) {
          var key = getKeyFromID(id);
          itemByKey[key] = item;
        };
        getItem = function getItem(id) {
          var key = getKeyFromID(id);
          return itemByKey[key];
        };
        removeItem = function removeItem(id) {
          var key = getKeyFromID(id);
          delete itemByKey[key];
        };
        getItemIDs = function getItemIDs() {
          return Object.keys(itemByKey).map(getIDFromKey);
        };

        addRoot = function addRoot(id) {
          var key = getKeyFromID(id);
          rootByKey[key] = true;
        };
        removeRoot = function removeRoot(id) {
          var key = getKeyFromID(id);
          delete rootByKey[key];
        };
        getRootIDs = function getRootIDs() {
          return Object.keys(rootByKey).map(getIDFromKey);
        };
      }

      var unmountedIDs = [];

      function purgeDeep(id) {
        var item = getItem(id);
        if (item) {
          var childIDs = item.childIDs;

          removeItem(id);
          childIDs.forEach(purgeDeep);
        }
      }

      function describeComponentFrame(name, source, ownerName) {
        return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
      }

      function _getDisplayName(element) {
        if (element == null) {
          return '#empty';
        } else if (typeof element === 'string' || typeof element === 'number') {
          return '#text';
        } else if (typeof element.type === 'string') {
          return element.type;
        } else {
          return element.type.displayName || element.type.name || 'Unknown';
        }
      }

      function describeID(id) {
        var name = ReactComponentTreeHook.getDisplayName(id);
        var element = ReactComponentTreeHook.getElement(id);
        var ownerID = ReactComponentTreeHook.getOwnerID(id);
        var ownerName;
        if (ownerID) {
          ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
        }
        "development" !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
        return describeComponentFrame(name, element && element._source, ownerName);
      }

      var ReactComponentTreeHook = {
        onSetChildren: function onSetChildren(id, nextChildIDs) {
          var item = getItem(id);
          !item ? "development" !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
          item.childIDs = nextChildIDs;

          for (var i = 0; i < nextChildIDs.length; i++) {
            var nextChildID = nextChildIDs[i];
            var nextChild = getItem(nextChildID);
            !nextChild ? "development" !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
            !(nextChild.childIDs != null || _typeof(nextChild.element) !== 'object' || nextChild.element == null) ? "development" !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
            !nextChild.isMounted ? "development" !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
            if (nextChild.parentID == null) {
              nextChild.parentID = id;
              // TODO: This shouldn't be necessary but mounting a new root during in
              // componentWillMount currently causes not-yet-mounted components to
              // be purged from our tree data so their parent id is missing.
            }
            !(nextChild.parentID === id) ? "development" !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
          }
        },
        onBeforeMountComponent: function onBeforeMountComponent(id, element, parentID) {
          var item = {
            element: element,
            parentID: parentID,
            text: null,
            childIDs: [],
            isMounted: false,
            updateCount: 0
          };
          setItem(id, item);
        },
        onBeforeUpdateComponent: function onBeforeUpdateComponent(id, element) {
          var item = getItem(id);
          if (!item || !item.isMounted) {
            // We may end up here as a result of setState() in componentWillUnmount().
            // In this case, ignore the element.
            return;
          }
          item.element = element;
        },
        onMountComponent: function onMountComponent(id) {
          var item = getItem(id);
          !item ? "development" !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
          item.isMounted = true;
          var isRoot = item.parentID === 0;
          if (isRoot) {
            addRoot(id);
          }
        },
        onUpdateComponent: function onUpdateComponent(id) {
          var item = getItem(id);
          if (!item || !item.isMounted) {
            // We may end up here as a result of setState() in componentWillUnmount().
            // In this case, ignore the element.
            return;
          }
          item.updateCount++;
        },
        onUnmountComponent: function onUnmountComponent(id) {
          var item = getItem(id);
          if (item) {
            // We need to check if it exists.
            // `item` might not exist if it is inside an error boundary, and a sibling
            // error boundary child threw while mounting. Then this instance never
            // got a chance to mount, but it still gets an unmounting event during
            // the error boundary cleanup.
            item.isMounted = false;
            var isRoot = item.parentID === 0;
            if (isRoot) {
              removeRoot(id);
            }
          }
          unmountedIDs.push(id);
        },
        purgeUnmountedComponents: function purgeUnmountedComponents() {
          if (ReactComponentTreeHook._preventPurging) {
            // Should only be used for testing.
            return;
          }

          for (var i = 0; i < unmountedIDs.length; i++) {
            var id = unmountedIDs[i];
            purgeDeep(id);
          }
          unmountedIDs.length = 0;
        },
        isMounted: function isMounted(id) {
          var item = getItem(id);
          return item ? item.isMounted : false;
        },
        getCurrentStackAddendum: function getCurrentStackAddendum(topElement) {
          var info = '';
          if (topElement) {
            var name = _getDisplayName(topElement);
            var owner = topElement._owner;
            info += describeComponentFrame(name, topElement._source, owner && owner.getName());
          }

          var currentOwner = ReactCurrentOwner.current;
          var id = currentOwner && currentOwner._debugID;

          info += ReactComponentTreeHook.getStackAddendumByID(id);
          return info;
        },
        getStackAddendumByID: function getStackAddendumByID(id) {
          var info = '';
          while (id) {
            info += describeID(id);
            id = ReactComponentTreeHook.getParentID(id);
          }
          return info;
        },
        getChildIDs: function getChildIDs(id) {
          var item = getItem(id);
          return item ? item.childIDs : [];
        },
        getDisplayName: function getDisplayName(id) {
          var element = ReactComponentTreeHook.getElement(id);
          if (!element) {
            return null;
          }
          return _getDisplayName(element);
        },
        getElement: function getElement(id) {
          var item = getItem(id);
          return item ? item.element : null;
        },
        getOwnerID: function getOwnerID(id) {
          var element = ReactComponentTreeHook.getElement(id);
          if (!element || !element._owner) {
            return null;
          }
          return element._owner._debugID;
        },
        getParentID: function getParentID(id) {
          var item = getItem(id);
          return item ? item.parentID : null;
        },
        getSource: function getSource(id) {
          var item = getItem(id);
          var element = item ? item.element : null;
          var source = element != null ? element._source : null;
          return source;
        },
        getText: function getText(id) {
          var element = ReactComponentTreeHook.getElement(id);
          if (typeof element === 'string') {
            return element;
          } else if (typeof element === 'number') {
            return '' + element;
          } else {
            return null;
          }
        },
        getUpdateCount: function getUpdateCount(id) {
          var item = getItem(id);
          return item ? item.updateCount : 0;
        },

        getRootIDs: getRootIDs,
        getRegisteredIDs: getItemIDs
      };

      module.exports = ReactComponentTreeHook;
    }, { "14": 14, "38": 38, "46": 46, "48": 48 }], 13: [function (_dereq_, module, exports) {
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

      var shallowCompare = _dereq_(39);

      /**
       * If your React component's render function is "pure", e.g. it will render the
       * same result given the same props and state, provide this mixin for a
       * considerable performance boost.
       *
       * Most React components have pure render functions.
       *
       * Example:
       *
       *   var ReactComponentWithPureRenderMixin =
       *     require('ReactComponentWithPureRenderMixin');
       *   React.createClass({
       *     mixins: [ReactComponentWithPureRenderMixin],
       *
       *     render: function() {
       *       return <div className={this.props.className}>foo</div>;
       *     }
       *   });
       *
       * Note: This only checks shallow equality for props and state. If these contain
       * complex data structures this mixin may have false-negatives for deeper
       * differences. Only mixin to components which have simple props and state, or
       * use `forceUpdate()` when you know deep data structures have changed.
       *
       * See https://facebook.github.io/react/docs/pure-render-mixin.html
       */
      var ReactComponentWithPureRenderMixin = {
        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
          return shallowCompare(this, nextProps, nextState);
        }
      };

      module.exports = ReactComponentWithPureRenderMixin;
    }, { "39": 39 }], 14: [function (_dereq_, module, exports) {
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

      /**
       * Keeps track of the current owner.
       *
       * The current owner is the component who should own any components that are
       * currently being constructed.
       */

      var ReactCurrentOwner = {

        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null

      };

      module.exports = ReactCurrentOwner;
    }, {}], 15: [function (_dereq_, module, exports) {
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

      var ReactElement = _dereq_(16);

      /**
       * Create a factory that creates HTML tag elements.
       *
       * @private
       */
      var createDOMFactory = ReactElement.createFactory;
      if ("development" !== 'production') {
        var ReactElementValidator = _dereq_(18);
        createDOMFactory = ReactElementValidator.createFactory;
      }

      /**
       * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
       * This is also accessible via `React.DOM`.
       *
       * @public
       */
      var ReactDOMFactories = {
        a: createDOMFactory('a'),
        abbr: createDOMFactory('abbr'),
        address: createDOMFactory('address'),
        area: createDOMFactory('area'),
        article: createDOMFactory('article'),
        aside: createDOMFactory('aside'),
        audio: createDOMFactory('audio'),
        b: createDOMFactory('b'),
        base: createDOMFactory('base'),
        bdi: createDOMFactory('bdi'),
        bdo: createDOMFactory('bdo'),
        big: createDOMFactory('big'),
        blockquote: createDOMFactory('blockquote'),
        body: createDOMFactory('body'),
        br: createDOMFactory('br'),
        button: createDOMFactory('button'),
        canvas: createDOMFactory('canvas'),
        caption: createDOMFactory('caption'),
        cite: createDOMFactory('cite'),
        code: createDOMFactory('code'),
        col: createDOMFactory('col'),
        colgroup: createDOMFactory('colgroup'),
        data: createDOMFactory('data'),
        datalist: createDOMFactory('datalist'),
        dd: createDOMFactory('dd'),
        del: createDOMFactory('del'),
        details: createDOMFactory('details'),
        dfn: createDOMFactory('dfn'),
        dialog: createDOMFactory('dialog'),
        div: createDOMFactory('div'),
        dl: createDOMFactory('dl'),
        dt: createDOMFactory('dt'),
        em: createDOMFactory('em'),
        embed: createDOMFactory('embed'),
        fieldset: createDOMFactory('fieldset'),
        figcaption: createDOMFactory('figcaption'),
        figure: createDOMFactory('figure'),
        footer: createDOMFactory('footer'),
        form: createDOMFactory('form'),
        h1: createDOMFactory('h1'),
        h2: createDOMFactory('h2'),
        h3: createDOMFactory('h3'),
        h4: createDOMFactory('h4'),
        h5: createDOMFactory('h5'),
        h6: createDOMFactory('h6'),
        head: createDOMFactory('head'),
        header: createDOMFactory('header'),
        hgroup: createDOMFactory('hgroup'),
        hr: createDOMFactory('hr'),
        html: createDOMFactory('html'),
        i: createDOMFactory('i'),
        iframe: createDOMFactory('iframe'),
        img: createDOMFactory('img'),
        input: createDOMFactory('input'),
        ins: createDOMFactory('ins'),
        kbd: createDOMFactory('kbd'),
        keygen: createDOMFactory('keygen'),
        label: createDOMFactory('label'),
        legend: createDOMFactory('legend'),
        li: createDOMFactory('li'),
        link: createDOMFactory('link'),
        main: createDOMFactory('main'),
        map: createDOMFactory('map'),
        mark: createDOMFactory('mark'),
        menu: createDOMFactory('menu'),
        menuitem: createDOMFactory('menuitem'),
        meta: createDOMFactory('meta'),
        meter: createDOMFactory('meter'),
        nav: createDOMFactory('nav'),
        noscript: createDOMFactory('noscript'),
        object: createDOMFactory('object'),
        ol: createDOMFactory('ol'),
        optgroup: createDOMFactory('optgroup'),
        option: createDOMFactory('option'),
        output: createDOMFactory('output'),
        p: createDOMFactory('p'),
        param: createDOMFactory('param'),
        picture: createDOMFactory('picture'),
        pre: createDOMFactory('pre'),
        progress: createDOMFactory('progress'),
        q: createDOMFactory('q'),
        rp: createDOMFactory('rp'),
        rt: createDOMFactory('rt'),
        ruby: createDOMFactory('ruby'),
        s: createDOMFactory('s'),
        samp: createDOMFactory('samp'),
        script: createDOMFactory('script'),
        section: createDOMFactory('section'),
        select: createDOMFactory('select'),
        small: createDOMFactory('small'),
        source: createDOMFactory('source'),
        span: createDOMFactory('span'),
        strong: createDOMFactory('strong'),
        style: createDOMFactory('style'),
        sub: createDOMFactory('sub'),
        summary: createDOMFactory('summary'),
        sup: createDOMFactory('sup'),
        table: createDOMFactory('table'),
        tbody: createDOMFactory('tbody'),
        td: createDOMFactory('td'),
        textarea: createDOMFactory('textarea'),
        tfoot: createDOMFactory('tfoot'),
        th: createDOMFactory('th'),
        thead: createDOMFactory('thead'),
        time: createDOMFactory('time'),
        title: createDOMFactory('title'),
        tr: createDOMFactory('tr'),
        track: createDOMFactory('track'),
        u: createDOMFactory('u'),
        ul: createDOMFactory('ul'),
        'var': createDOMFactory('var'),
        video: createDOMFactory('video'),
        wbr: createDOMFactory('wbr'),

        // SVG
        circle: createDOMFactory('circle'),
        clipPath: createDOMFactory('clipPath'),
        defs: createDOMFactory('defs'),
        ellipse: createDOMFactory('ellipse'),
        g: createDOMFactory('g'),
        image: createDOMFactory('image'),
        line: createDOMFactory('line'),
        linearGradient: createDOMFactory('linearGradient'),
        mask: createDOMFactory('mask'),
        path: createDOMFactory('path'),
        pattern: createDOMFactory('pattern'),
        polygon: createDOMFactory('polygon'),
        polyline: createDOMFactory('polyline'),
        radialGradient: createDOMFactory('radialGradient'),
        rect: createDOMFactory('rect'),
        stop: createDOMFactory('stop'),
        svg: createDOMFactory('svg'),
        text: createDOMFactory('text'),
        tspan: createDOMFactory('tspan')
      };

      module.exports = ReactDOMFactories;
    }, { "16": 16, "18": 18 }], 16: [function (_dereq_, module, exports) {
      /**
       * Copyright 2014-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       */

      'use strict';

      var _assign = _dereq_(49);

      var ReactCurrentOwner = _dereq_(14);

      var warning = _dereq_(48);
      var canDefineProperty = _dereq_(33);
      var hasOwnProperty = Object.prototype.hasOwnProperty;

      var REACT_ELEMENT_TYPE = _dereq_(17);

      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };

      var specialPropKeyWarningShown, specialPropRefWarningShown;

      function hasValidRef(config) {
        if ("development" !== 'production') {
          if (hasOwnProperty.call(config, 'ref')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== undefined;
      }

      function hasValidKey(config) {
        if ("development" !== 'production') {
          if (hasOwnProperty.call(config, 'key')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== undefined;
      }

      function defineKeyPropWarningGetter(props, displayName) {
        var warnAboutAccessingKey = function warnAboutAccessingKey() {
          if (!specialPropKeyWarningShown) {
            specialPropKeyWarningShown = true;
            "development" !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
          }
        };
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, 'key', {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }

      function defineRefPropWarningGetter(props, displayName) {
        var warnAboutAccessingRef = function warnAboutAccessingRef() {
          if (!specialPropRefWarningShown) {
            specialPropRefWarningShown = true;
            "development" !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
          }
        };
        warnAboutAccessingRef.isReactWarning = true;
        Object.defineProperty(props, 'ref', {
          get: warnAboutAccessingRef,
          configurable: true
        });
      }

      /**
       * Factory method to create a new React element. This no longer adheres to
       * the class pattern, so do not use new to call it. Also, no instanceof check
       * will work. Instead test $$typeof field against Symbol.for('react.element') to check
       * if something is a React Element.
       *
       * @param {*} type
       * @param {*} key
       * @param {string|object} ref
       * @param {*} self A *temporary* helper to detect places where `this` is
       * different from the `owner` when React.createElement is called, so that we
       * can warn. We want to get rid of owner and replace string `ref`s with arrow
       * functions, and as long as `this` and owner are the same, there will be no
       * change in behavior.
       * @param {*} source An annotation object (added by a transpiler or otherwise)
       * indicating filename, line number, and/or other information.
       * @param {*} owner
       * @param {*} props
       * @internal
       */
      var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
        var element = {
          // This tag allow us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,

          // Built-in properties that belong on the element
          type: type,
          key: key,
          ref: ref,
          props: props,

          // Record the component responsible for creating this element.
          _owner: owner
        };

        if ("development" !== 'production') {
          // The validation flag is currently mutative. We put it on
          // an external backing store so that we can freeze the whole object.
          // This can be replaced with a WeakMap once they are implemented in
          // commonly used development environments.
          element._store = {};

          // To make comparing ReactElements easier for testing purposes, we make
          // the validation flag non-enumerable (where possible, which should
          // include every environment we run tests in), so the test framework
          // ignores it.
          if (canDefineProperty) {
            Object.defineProperty(element._store, 'validated', {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            // self and source are DEV only properties.
            Object.defineProperty(element, '_self', {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            // Two elements created in two different places should be considered
            // equal for testing purposes and therefore we hide it from enumeration.
            Object.defineProperty(element, '_source', {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
          } else {
            element._store.validated = false;
            element._self = self;
            element._source = source;
          }
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }

        return element;
      };

      /**
       * Create and return a new ReactElement of the given type.
       * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
       */
      ReactElement.createElement = function (type, config, children) {
        var propName;

        // Reserved names are extracted
        var props = {};

        var key = null;
        var ref = null;
        var self = null;
        var source = null;

        if (config != null) {
          if (hasValidRef(config)) {
            ref = config.ref;
          }
          if (hasValidKey(config)) {
            key = '' + config.key;
          }

          self = config.__self === undefined ? null : config.__self;
          source = config.__source === undefined ? null : config.__source;
          // Remaining properties are added to a new props object
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
        }

        // Children can be more than one argument, and those are transferred onto
        // the newly allocated props object.
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);
          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
          }
          if ("development" !== 'production') {
            if (Object.freeze) {
              Object.freeze(childArray);
            }
          }
          props.children = childArray;
        }

        // Resolve default props
        if (type && type.defaultProps) {
          var defaultProps = type.defaultProps;
          for (propName in defaultProps) {
            if (props[propName] === undefined) {
              props[propName] = defaultProps[propName];
            }
          }
        }
        if ("development" !== 'production') {
          if (key || ref) {
            if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
              var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
          }
        }
        return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
      };

      /**
       * Return a function that produces ReactElements of a given type.
       * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
       */
      ReactElement.createFactory = function (type) {
        var factory = ReactElement.createElement.bind(null, type);
        // Expose the type on the factory and the prototype so that it can be
        // easily accessed on elements. E.g. `<Foo />.type === Foo`.
        // This should not be named `constructor` since this may not be the function
        // that created the element, and it may not even be a constructor.
        // Legacy hook TODO: Warn if this is accessed
        factory.type = type;
        return factory;
      };

      ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
        var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

        return newElement;
      };

      /**
       * Clone and return a new ReactElement using element as the starting point.
       * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
       */
      ReactElement.cloneElement = function (element, config, children) {
        var propName;

        // Original props are copied
        var props = _assign({}, element.props);

        // Reserved names are extracted
        var key = element.key;
        var ref = element.ref;
        // Self is preserved since the owner is preserved.
        var self = element._self;
        // Source is preserved since cloneElement is unlikely to be targeted by a
        // transpiler, and the original source is probably a better indicator of the
        // true owner.
        var source = element._source;

        // Owner will be preserved, unless ref is overridden
        var owner = element._owner;

        if (config != null) {
          if (hasValidRef(config)) {
            // Silently steal the ref from the parent.
            ref = config.ref;
            owner = ReactCurrentOwner.current;
          }
          if (hasValidKey(config)) {
            key = '' + config.key;
          }

          // Remaining properties override existing props
          var defaultProps;
          if (element.type && element.type.defaultProps) {
            defaultProps = element.type.defaultProps;
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              if (config[propName] === undefined && defaultProps !== undefined) {
                // Resolve default props
                props[propName] = defaultProps[propName];
              } else {
                props[propName] = config[propName];
              }
            }
          }
        }

        // Children can be more than one argument, and those are transferred onto
        // the newly allocated props object.
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1) {
          props.children = children;
        } else if (childrenLength > 1) {
          var childArray = Array(childrenLength);
          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
          }
          props.children = childArray;
        }

        return ReactElement(element.type, key, ref, self, source, owner, props);
      };

      /**
       * Verifies the object is a ReactElement.
       * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
       * @param {?object} object
       * @return {boolean} True if `object` is a valid component.
       * @final
       */
      ReactElement.isValidElement = function (object) {
        return (typeof object === "undefined" ? "undefined" : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      };

      module.exports = ReactElement;
    }, { "14": 14, "17": 17, "33": 33, "48": 48, "49": 49 }], 17: [function (_dereq_, module, exports) {
      /**
       * Copyright 2014-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * 
       */

      'use strict';

      // The Symbol used to tag the ReactElement type. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.

      var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

      module.exports = REACT_ELEMENT_TYPE;
    }, {}], 18: [function (_dereq_, module, exports) {
      /**
       * Copyright 2014-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       */

      /**
       * ReactElementValidator provides a wrapper around a element factory
       * which validates the props passed to the element. This is intended to be
       * used only in DEV and could be replaced by a static type checker for languages
       * that support it.
       */

      'use strict';

      var ReactCurrentOwner = _dereq_(14);
      var ReactComponentTreeHook = _dereq_(12);
      var ReactElement = _dereq_(16);

      var checkReactTypeSpec = _dereq_(34);

      var canDefineProperty = _dereq_(33);
      var getIteratorFn = _dereq_(36);
      var warning = _dereq_(48);

      function getDeclarationErrorAddendum() {
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            return ' Check the render method of `' + name + '`.';
          }
        }
        return '';
      }

      /**
       * Warn if there's no key explicitly set on dynamic arrays of children or
       * object keys are not valid. This allows us to keep track of children between
       * updates.
       */
      var ownerHasKeyUseWarning = {};

      function getCurrentComponentErrorInfo(parentType) {
        var info = getDeclarationErrorAddendum();

        if (!info) {
          var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
          if (parentName) {
            info = ' Check the top-level render call using <' + parentName + '>.';
          }
        }
        return info;
      }

      /**
       * Warn if the element doesn't have an explicit key assigned to it.
       * This element is in an array. The array could grow and shrink or be
       * reordered. All children that haven't already been validated are required to
       * have a "key" property assigned to it. Error statuses are cached so a warning
       * will only be shown once.
       *
       * @internal
       * @param {ReactElement} element Element that requires a key.
       * @param {*} parentType element's parent's type.
       */
      function validateExplicitKey(element, parentType) {
        if (!element._store || element._store.validated || element.key != null) {
          return;
        }
        element._store.validated = true;

        var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

        var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
        if (memoizer[currentComponentErrorInfo]) {
          return;
        }
        memoizer[currentComponentErrorInfo] = true;

        // Usually the current owner is the offender, but if it accepts children as a
        // property, it may be the creator of the child that's responsible for
        // assigning it a key.
        var childOwner = '';
        if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
          // Give the component that originally created this child.
          childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
        }

        "development" !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
      }

      /**
       * Ensure that every element either is passed in a static location, in an
       * array with an explicit keys property defined, or in an object literal
       * with valid key property.
       *
       * @internal
       * @param {ReactNode} node Statically passed child of any type.
       * @param {*} parentType node's parent's type.
       */
      function validateChildKeys(node, parentType) {
        if ((typeof node === "undefined" ? "undefined" : _typeof(node)) !== 'object') {
          return;
        }
        if (Array.isArray(node)) {
          for (var i = 0; i < node.length; i++) {
            var child = node[i];
            if (ReactElement.isValidElement(child)) {
              validateExplicitKey(child, parentType);
            }
          }
        } else if (ReactElement.isValidElement(node)) {
          // This element was passed in a valid location.
          if (node._store) {
            node._store.validated = true;
          }
        } else if (node) {
          var iteratorFn = getIteratorFn(node);
          // Entry iterators provide implicit keys.
          if (iteratorFn) {
            if (iteratorFn !== node.entries) {
              var iterator = iteratorFn.call(node);
              var step;
              while (!(step = iterator.next()).done) {
                if (ReactElement.isValidElement(step.value)) {
                  validateExplicitKey(step.value, parentType);
                }
              }
            }
          }
        }
      }

      /**
       * Given an element, validate that its props follow the propTypes definition,
       * provided by the type.
       *
       * @param {ReactElement} element
       */
      function validatePropTypes(element) {
        var componentClass = element.type;
        if (typeof componentClass !== 'function') {
          return;
        }
        var name = componentClass.displayName || componentClass.name;
        if (componentClass.propTypes) {
          checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
        }
        if (typeof componentClass.getDefaultProps === 'function') {
          "development" !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
        }
      }

      var ReactElementValidator = {

        createElement: function createElement(type, props, children) {
          var validType = typeof type === 'string' || typeof type === 'function';
          // We warn in this case but don't throw. We expect the element creation to
          // succeed and there will likely be errors in render.
          if (!validType) {
            if (typeof type !== 'function' && typeof type !== 'string') {
              var info = '';
              if (type === undefined || (typeof type === "undefined" ? "undefined" : _typeof(type)) === 'object' && type !== null && Object.keys(type).length === 0) {
                info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
              }
              info += getDeclarationErrorAddendum();
              "development" !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type === "undefined" ? "undefined" : _typeof(type), info) : void 0;
            }
          }

          var element = ReactElement.createElement.apply(this, arguments);

          // The result can be nullish if a mock or a custom function is used.
          // TODO: Drop this when these are no longer allowed as the type argument.
          if (element == null) {
            return element;
          }

          // Skip key warning if the type isn't valid since our key validation logic
          // doesn't expect a non-string/function type and can throw confusing errors.
          // We don't want exception behavior to differ between dev and prod.
          // (Rendering will throw with a helpful message and as soon as the type is
          // fixed, the key warnings will appear.)
          if (validType) {
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], type);
            }
          }

          validatePropTypes(element);

          return element;
        },

        createFactory: function createFactory(type) {
          var validatedFactory = ReactElementValidator.createElement.bind(null, type);
          // Legacy hook TODO: Warn if this is accessed
          validatedFactory.type = type;

          if ("development" !== 'production') {
            if (canDefineProperty) {
              Object.defineProperty(validatedFactory, 'type', {
                enumerable: false,
                get: function get() {
                  "development" !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
                  Object.defineProperty(this, 'type', {
                    value: type
                  });
                  return type;
                }
              });
            }
          }

          return validatedFactory;
        },

        cloneElement: function cloneElement(element, props, children) {
          var newElement = ReactElement.cloneElement.apply(this, arguments);
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], newElement.type);
          }
          validatePropTypes(newElement);
          return newElement;
        }

      };

      module.exports = ReactElementValidator;
    }, { "12": 12, "14": 14, "16": 16, "33": 33, "34": 34, "36": 36, "48": 48 }], 19: [function (_dereq_, module, exports) {
      /**
       * Copyright 2015-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       */

      'use strict';

      var _prodInvariant = _dereq_(38);

      var ReactChildren = _dereq_(9);
      var ReactElement = _dereq_(16);

      var emptyFunction = _dereq_(44);
      var invariant = _dereq_(46);
      var warning = _dereq_(48);

      /**
       * We used to allow keyed objects to serve as a collection of ReactElements,
       * or nested sets. This allowed us a way to explicitly key a set or fragment of
       * components. This is now being replaced with an opaque data structure.
       * The upgrade path is to call React.addons.createFragment({ key: value }) to
       * create a keyed fragment. The resulting data structure is an array.
       */

      var numericPropertyRegex = /^\d+$/;

      var warnedAboutNumeric = false;

      var ReactFragment = {
        /**
         * Wrap a keyed object in an opaque proxy that warns you if you access any
         * of its properties.
         * See https://facebook.github.io/react/docs/create-fragment.html
         */
        create: function create(object) {
          if ((typeof object === "undefined" ? "undefined" : _typeof(object)) !== 'object' || !object || Array.isArray(object)) {
            "development" !== 'production' ? warning(false, 'React.addons.createFragment only accepts a single object. Got: %s', object) : void 0;
            return object;
          }
          if (ReactElement.isValidElement(object)) {
            "development" !== 'production' ? warning(false, 'React.addons.createFragment does not accept a ReactElement ' + 'without a wrapper object.') : void 0;
            return object;
          }

          !(object.nodeType !== 1) ? "development" !== 'production' ? invariant(false, 'React.addons.createFragment(...): Encountered an invalid child; DOM elements are not valid children of React components.') : _prodInvariant('0') : void 0;

          var result = [];

          for (var key in object) {
            if ("development" !== 'production') {
              if (!warnedAboutNumeric && numericPropertyRegex.test(key)) {
                "development" !== 'production' ? warning(false, 'React.addons.createFragment(...): Child objects should have ' + 'non-numeric keys so ordering is preserved.') : void 0;
                warnedAboutNumeric = true;
              }
            }
            ReactChildren.mapIntoWithKeyPrefixInternal(object[key], result, key, emptyFunction.thatReturnsArgument);
          }

          return result;
        }
      };

      module.exports = ReactFragment;
    }, { "16": 16, "38": 38, "44": 44, "46": 46, "48": 48, "9": 9 }], 20: [function (_dereq_, module, exports) {
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

      /**
       * ReactLink encapsulates a common pattern in which a component wants to modify
       * a prop received from its parent. ReactLink allows the parent to pass down a
       * value coupled with a callback that, when invoked, expresses an intent to
       * modify that value. For example:
       *
       * React.createClass({
       *   getInitialState: function() {
       *     return {value: ''};
       *   },
       *   render: function() {
       *     var valueLink = new ReactLink(this.state.value, this._handleValueChange);
       *     return <input valueLink={valueLink} />;
       *   },
       *   _handleValueChange: function(newValue) {
       *     this.setState({value: newValue});
       *   }
       * });
       *
       * We have provided some sugary mixins to make the creation and
       * consumption of ReactLink easier; see LinkedValueUtils and LinkedStateMixin.
       */

      var React = _dereq_(5);

      /**
       * Deprecated: An an easy way to express two-way binding with React. 
       * See https://facebook.github.io/react/docs/two-way-binding-helpers.html
       *
       * @param {*} value current value of the link
       * @param {function} requestChange callback to request a change
       */
      function ReactLink(value, requestChange) {
        this.value = value;
        this.requestChange = requestChange;
      }

      /**
       * Creates a PropType that enforces the ReactLink API and optionally checks the
       * type of the value being passed inside the link. Example:
       *
       * MyComponent.propTypes = {
       *   tabIndexLink: ReactLink.PropTypes.link(React.PropTypes.number)
       * }
       */
      function createLinkTypeChecker(linkType) {
        var shapes = {
          value: linkType === undefined ? React.PropTypes.any.isRequired : linkType.isRequired,
          requestChange: React.PropTypes.func.isRequired
        };
        return React.PropTypes.shape(shapes);
      }

      ReactLink.PropTypes = {
        link: createLinkTypeChecker
      };

      module.exports = ReactLink;
    }, { "5": 5 }], 21: [function (_dereq_, module, exports) {
      /**
       * Copyright 2015-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       */

      'use strict';

      var warning = _dereq_(48);

      function warnNoop(publicInstance, callerName) {
        if ("development" !== 'production') {
          var constructor = publicInstance.constructor;
          "development" !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
        }
      }

      /**
       * This is the abstract API for an update queue.
       */
      var ReactNoopUpdateQueue = {

        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function isMounted(publicInstance) {
          return false;
        },

        /**
         * Enqueue a callback that will be executed after all the pending updates
         * have processed.
         *
         * @param {ReactClass} publicInstance The instance to use as `this` context.
         * @param {?function} callback Called after state is updated.
         * @internal
         */
        enqueueCallback: function enqueueCallback(publicInstance, callback) {},

        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @internal
         */
        enqueueForceUpdate: function enqueueForceUpdate(publicInstance) {
          warnNoop(publicInstance, 'forceUpdate');
        },

        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @internal
         */
        enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState) {
          warnNoop(publicInstance, 'replaceState');
        },

        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @internal
         */
        enqueueSetState: function enqueueSetState(publicInstance, partialState) {
          warnNoop(publicInstance, 'setState');
        }
      };

      module.exports = ReactNoopUpdateQueue;
    }, { "48": 48 }], 22: [function (_dereq_, module, exports) {
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

      var ReactPropTypeLocationNames = {};

      if ("development" !== 'production') {
        ReactPropTypeLocationNames = {
          prop: 'prop',
          context: 'context',
          childContext: 'child context'
        };
      }

      module.exports = ReactPropTypeLocationNames;
    }, {}], 23: [function (_dereq_, module, exports) {
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

      var ReactElement = _dereq_(16);
      var ReactPropTypeLocationNames = _dereq_(22);
      var ReactPropTypesSecret = _dereq_(24);

      var emptyFunction = _dereq_(44);
      var getIteratorFn = _dereq_(36);
      var warning = _dereq_(48);

      /**
       * Collection of methods that allow declaration and validation of props that are
       * supplied to React components. Example usage:
       *
       *   var Props = require('ReactPropTypes');
       *   var MyArticle = React.createClass({
       *     propTypes: {
       *       // An optional string prop named "description".
       *       description: Props.string,
       *
       *       // A required enum prop named "category".
       *       category: Props.oneOf(['News','Photos']).isRequired,
       *
       *       // A prop named "dialog" that requires an instance of Dialog.
       *       dialog: Props.instanceOf(Dialog).isRequired
       *     },
       *     render: function() { ... }
       *   });
       *
       * A more formal specification of how these methods are used:
       *
       *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
       *   decl := ReactPropTypes.{type}(.isRequired)?
       *
       * Each and every declaration produces a function with the same signature. This
       * allows the creation of custom validation functions. For example:
       *
       *  var MyLink = React.createClass({
       *    propTypes: {
       *      // An optional string or URI prop named "href".
       *      href: function(props, propName, componentName) {
       *        var propValue = props[propName];
       *        if (propValue != null && typeof propValue !== 'string' &&
       *            !(propValue instanceof URI)) {
       *          return new Error(
       *            'Expected a string or an URI for ' + propName + ' in ' +
       *            componentName
       *          );
       *        }
       *      }
       *    },
       *    render: function() {...}
       *  });
       *
       * @internal
       */

      var ANONYMOUS = '<<anonymous>>';

      var ReactPropTypes = {
        array: createPrimitiveTypeChecker('array'),
        bool: createPrimitiveTypeChecker('boolean'),
        func: createPrimitiveTypeChecker('function'),
        number: createPrimitiveTypeChecker('number'),
        object: createPrimitiveTypeChecker('object'),
        string: createPrimitiveTypeChecker('string'),
        symbol: createPrimitiveTypeChecker('symbol'),

        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker
      };

      /**
       * inlined Object.is polyfill to avoid requiring consumers ship their own
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
       */
      /*eslint-disable no-self-compare*/
      function is(x, y) {
        // SameValue algorithm
        if (x === y) {
          // Steps 1-5, 7-10
          // Steps 6.b-6.e: +0 != -0
          return x !== 0 || 1 / x === 1 / y;
        } else {
          // Step 6.a: NaN == NaN
          return x !== x && y !== y;
        }
      }
      /*eslint-enable no-self-compare*/

      /**
       * We use an Error-like object for backward compatibility as people may call
       * PropTypes directly and inspect their output. However we don't use real
       * Errors anymore. We don't inspect their stack anyway, and creating them
       * is prohibitively expensive if they are created too often, such as what
       * happens in oneOfType() for any type before the one that matched.
       */
      function PropTypeError(message) {
        this.message = message;
        this.stack = '';
      }
      // Make `instanceof Error` still work for returned errors.
      PropTypeError.prototype = Error.prototype;

      function createChainableTypeChecker(validate) {
        if ("development" !== 'production') {
          var manualPropTypeCallCache = {};
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if ("development" !== 'production') {
            if (secret !== ReactPropTypesSecret && typeof console !== 'undefined') {
              var cacheKey = componentName + ':' + propName;
              if (!manualPropTypeCallCache[cacheKey]) {
                "development" !== 'production' ? warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will not work in production with the next major version. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName) : void 0;
                manualPropTypeCallCache[cacheKey] = true;
              }
            }
          }
          if (props[propName] == null) {
            var locationName = ReactPropTypeLocationNames[location];
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
              }
              return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }

        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);

        return chainedCheckType;
      }

      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var locationName = ReactPropTypeLocationNames[location];
            // `propValue` being instance of, say, date/regexp, pass the 'object'
            // check, but we can offer a more precise error message here rather than
            // 'of type `object`'.
            var preciseType = getPreciseType(propValue);

            return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunction.thatReturns(null));
      }

      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== 'function') {
            return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var locationName = ReactPropTypeLocationNames[location];
            var propType = getPropType(propValue);
            return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactElement.isValidElement(propValue)) {
            var locationName = ReactPropTypeLocationNames[location];
            var propType = getPropType(propValue);
            return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var locationName = ReactPropTypeLocationNames[location];
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          "development" !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
          return emptyFunction.thatReturnsNull;
        }

        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }

          var locationName = ReactPropTypeLocationNames[location];
          var valuesString = JSON.stringify(expectedValues);
          return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
        }
        return createChainableTypeChecker(validate);
      }

      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== 'function') {
            return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== 'object') {
            var locationName = ReactPropTypeLocationNames[location];
            return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
          }
          for (var key in propValue) {
            if (propValue.hasOwnProperty(key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          "development" !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
          return emptyFunction.thatReturnsNull;
        }

        function validate(props, propName, componentName, location, propFullName) {
          for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
            var checker = arrayOfTypeCheckers[i];
            if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
              return null;
            }
          }

          var locationName = ReactPropTypeLocationNames[location];
          return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
        }
        return createChainableTypeChecker(validate);
      }

      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            var locationName = ReactPropTypeLocationNames[location];
            return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== 'object') {
            var locationName = ReactPropTypeLocationNames[location];
            return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (!checker) {
              continue;
            }
            var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }

      function isNode(propValue) {
        switch (typeof propValue === "undefined" ? "undefined" : _typeof(propValue)) {
          case 'number':
          case 'string':
          case 'undefined':
            return true;
          case 'boolean':
            return !propValue;
          case 'object':
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || ReactElement.isValidElement(propValue)) {
              return true;
            }

            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                // Iterator will provide entry [k,v] tuples rather than values.
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }

            return true;
          default:
            return false;
        }
      }

      function isSymbol(propType, propValue) {
        // Native Symbol.
        if (propType === 'symbol') {
          return true;
        }

        // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
        if (propValue['@@toStringTag'] === 'Symbol') {
          return true;
        }

        // Fallback for non-spec compliant Symbols which are polyfilled.
        if (typeof Symbol === 'function' && propValue instanceof Symbol) {
          return true;
        }

        return false;
      }

      // Equivalent of `typeof` but with special handling for array and regexp.
      function getPropType(propValue) {
        var propType = typeof propValue === "undefined" ? "undefined" : _typeof(propValue);
        if (Array.isArray(propValue)) {
          return 'array';
        }
        if (propValue instanceof RegExp) {
          // Old webkits (at least until Android 4.0) return 'function' rather than
          // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
          // passes PropTypes.object.
          return 'object';
        }
        if (isSymbol(propType, propValue)) {
          return 'symbol';
        }
        return propType;
      }

      // This handles more types than `getPropType`. Only used for error messages.
      // See `createPrimitiveTypeChecker`.
      function getPreciseType(propValue) {
        var propType = getPropType(propValue);
        if (propType === 'object') {
          if (propValue instanceof Date) {
            return 'date';
          } else if (propValue instanceof RegExp) {
            return 'regexp';
          }
        }
        return propType;
      }

      // Returns class name of the object, if any.
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }

      module.exports = ReactPropTypes;
    }, { "16": 16, "22": 22, "24": 24, "36": 36, "44": 44, "48": 48 }], 24: [function (_dereq_, module, exports) {
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

      var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

      module.exports = ReactPropTypesSecret;
    }, {}], 25: [function (_dereq_, module, exports) {
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

      var _assign = _dereq_(49);

      var ReactComponent = _dereq_(11);
      var ReactNoopUpdateQueue = _dereq_(21);

      var emptyObject = _dereq_(45);

      /**
       * Base class helpers for the updating state of a component.
       */
      function ReactPureComponent(props, context, updater) {
        // Duplicated from ReactComponent.
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        // We initialize the default updater but the real one gets injected by the
        // renderer.
        this.updater = updater || ReactNoopUpdateQueue;
      }

      function ComponentDummy() {}
      ComponentDummy.prototype = ReactComponent.prototype;
      ReactPureComponent.prototype = new ComponentDummy();
      ReactPureComponent.prototype.constructor = ReactPureComponent;
      // Avoid an extra prototype jump for these methods.
      _assign(ReactPureComponent.prototype, ReactComponent.prototype);
      ReactPureComponent.prototype.isPureReactComponent = true;

      module.exports = ReactPureComponent;
    }, { "11": 11, "21": 21, "45": 45, "49": 49 }], 26: [function (_dereq_, module, exports) {
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

      var ReactStateSetters = {
        /**
         * Returns a function that calls the provided function, and uses the result
         * of that to set the component's state.
         *
         * @param {ReactCompositeComponent} component
         * @param {function} funcReturningState Returned callback uses this to
         *                                      determine how to update state.
         * @return {function} callback that when invoked uses funcReturningState to
         *                    determined the object literal to setState.
         */
        createStateSetter: function createStateSetter(component, funcReturningState) {
          return function (a, b, c, d, e, f) {
            var partialState = funcReturningState.call(component, a, b, c, d, e, f);
            if (partialState) {
              component.setState(partialState);
            }
          };
        },

        /**
         * Returns a single-argument callback that can be used to update a single
         * key in the component's state.
         *
         * Note: this is memoized function, which makes it inexpensive to call.
         *
         * @param {ReactCompositeComponent} component
         * @param {string} key The key in the state that you should update.
         * @return {function} callback of 1 argument which calls setState() with
         *                    the provided keyName and callback argument.
         */
        createStateKeySetter: function createStateKeySetter(component, key) {
          // Memoize the setters.
          var cache = component.__keySetters || (component.__keySetters = {});
          return cache[key] || (cache[key] = _createStateKeySetter(component, key));
        }
      };

      function _createStateKeySetter(component, key) {
        // Partial state is allocated outside of the function closure so it can be
        // reused with every call, avoiding memory allocation when this function
        // is called.
        var partialState = {};
        return function stateKeySetter(value) {
          partialState[key] = value;
          component.setState(partialState);
        };
      }

      ReactStateSetters.Mixin = {
        /**
         * Returns a function that calls the provided function, and uses the result
         * of that to set the component's state.
         *
         * For example, these statements are equivalent:
         *
         *   this.setState({x: 1});
         *   this.createStateSetter(function(xValue) {
         *     return {x: xValue};
         *   })(1);
         *
         * @param {function} funcReturningState Returned callback uses this to
         *                                      determine how to update state.
         * @return {function} callback that when invoked uses funcReturningState to
         *                    determined the object literal to setState.
         */
        createStateSetter: function createStateSetter(funcReturningState) {
          return ReactStateSetters.createStateSetter(this, funcReturningState);
        },

        /**
         * Returns a single-argument callback that can be used to update a single
         * key in the component's state.
         *
         * For example, these statements are equivalent:
         *
         *   this.setState({x: 1});
         *   this.createStateKeySetter('x')(1);
         *
         * Note: this is memoized function, which makes it inexpensive to call.
         *
         * @param {string} key The key in the state that you should update.
         * @return {function} callback of 1 argument which calls setState() with
         *                    the provided keyName and callback argument.
         */
        createStateKeySetter: function createStateKeySetter(key) {
          return ReactStateSetters.createStateKeySetter(this, key);
        }
      };

      module.exports = ReactStateSetters;
    }, {}], 27: [function (_dereq_, module, exports) {
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

      var flattenChildren = _dereq_(35);

      var ReactTransitionChildMapping = {
        /**
         * Given `this.props.children`, return an object mapping key to child. Just
         * simple syntactic sugar around flattenChildren().
         *
         * @param {*} children `this.props.children`
         * @param {number=} selfDebugID Optional debugID of the current internal instance.
         * @return {object} Mapping of key to child
         */
        getChildMapping: function getChildMapping(children, selfDebugID) {
          if (!children) {
            return children;
          }

          if ("development" !== 'production') {
            return flattenChildren(children, selfDebugID);
          }

          return flattenChildren(children);
        },

        /**
         * When you're adding or removing children some may be added or removed in the
         * same render pass. We want to show *both* since we want to simultaneously
         * animate elements in and out. This function takes a previous set of keys
         * and a new set of keys and merges them with its best guess of the correct
         * ordering. In the future we may expose some of the utilities in
         * ReactMultiChild to make this easy, but for now React itself does not
         * directly have this concept of the union of prevChildren and nextChildren
         * so we implement it here.
         *
         * @param {object} prev prev children as returned from
         * `ReactTransitionChildMapping.getChildMapping()`.
         * @param {object} next next children as returned from
         * `ReactTransitionChildMapping.getChildMapping()`.
         * @return {object} a key set that contains all keys in `prev` and all keys
         * in `next` in a reasonable order.
         */
        mergeChildMappings: function mergeChildMappings(prev, next) {
          prev = prev || {};
          next = next || {};

          function getValueForKey(key) {
            if (next.hasOwnProperty(key)) {
              return next[key];
            } else {
              return prev[key];
            }
          }

          // For each key of `next`, the list of keys to insert before that key in
          // the combined list
          var nextKeysPending = {};

          var pendingKeys = [];
          for (var prevKey in prev) {
            if (next.hasOwnProperty(prevKey)) {
              if (pendingKeys.length) {
                nextKeysPending[prevKey] = pendingKeys;
                pendingKeys = [];
              }
            } else {
              pendingKeys.push(prevKey);
            }
          }

          var i;
          var childMapping = {};
          for (var nextKey in next) {
            if (nextKeysPending.hasOwnProperty(nextKey)) {
              for (i = 0; i < nextKeysPending[nextKey].length; i++) {
                var pendingNextKey = nextKeysPending[nextKey][i];
                childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
              }
            }
            childMapping[nextKey] = getValueForKey(nextKey);
          }

          // Finally, add the keys which didn't appear before any key in `next`
          for (i = 0; i < pendingKeys.length; i++) {
            childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
          }

          return childMapping;
        }
      };

      module.exports = ReactTransitionChildMapping;
    }, { "35": 35 }], 28: [function (_dereq_, module, exports) {
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

      var ExecutionEnvironment = _dereq_(43);

      var getVendorPrefixedEventName = _dereq_(1);

      var endEvents = [];

      function detectEvents() {
        var animEnd = getVendorPrefixedEventName('animationend');
        var transEnd = getVendorPrefixedEventName('transitionend');

        if (animEnd) {
          endEvents.push(animEnd);
        }

        if (transEnd) {
          endEvents.push(transEnd);
        }
      }

      if (ExecutionEnvironment.canUseDOM) {
        detectEvents();
      }

      // We use the raw {add|remove}EventListener() call because EventListener
      // does not know how to remove event listeners and we really should
      // clean up. Also, these events are not triggered in older browsers
      // so we should be A-OK here.

      function addEventListener(node, eventName, eventListener) {
        node.addEventListener(eventName, eventListener, false);
      }

      function removeEventListener(node, eventName, eventListener) {
        node.removeEventListener(eventName, eventListener, false);
      }

      var ReactTransitionEvents = {
        addEndEventListener: function addEndEventListener(node, eventListener) {
          if (endEvents.length === 0) {
            // If CSS transitions are not supported, trigger an "end animation"
            // event immediately.
            window.setTimeout(eventListener, 0);
            return;
          }
          endEvents.forEach(function (endEvent) {
            addEventListener(node, endEvent, eventListener);
          });
        },

        removeEndEventListener: function removeEndEventListener(node, eventListener) {
          if (endEvents.length === 0) {
            return;
          }
          endEvents.forEach(function (endEvent) {
            removeEventListener(node, endEvent, eventListener);
          });
        }
      };

      module.exports = ReactTransitionEvents;
    }, { "1": 1, "43": 43 }], 29: [function (_dereq_, module, exports) {
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

      var _assign = _dereq_(49);

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }

      var React = _dereq_(5);
      var ReactTransitionChildMapping = _dereq_(27);

      var emptyFunction = _dereq_(44);

      /**
       * A basis for animations. When children are declaratively added or removed,
       * special lifecycle hooks are called.
       * See https://facebook.github.io/react/docs/animation.html#low-level-api-reacttransitiongroup
       */

      var ReactTransitionGroup = function (_React$Component) {
        _inherits(ReactTransitionGroup, _React$Component);

        function ReactTransitionGroup() {
          var _temp, _this, _ret;

          _classCallCheck(this, ReactTransitionGroup);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
            // TODO: can we get useful debug information to show at this point?
            children: ReactTransitionChildMapping.getChildMapping(_this.props.children)
          }, _this.performAppear = function (key) {
            _this.currentlyTransitioningKeys[key] = true;

            var component = _this.refs[key];

            if (component.componentWillAppear) {
              component.componentWillAppear(_this._handleDoneAppearing.bind(_this, key));
            } else {
              _this._handleDoneAppearing(key);
            }
          }, _this._handleDoneAppearing = function (key) {
            var component = _this.refs[key];
            if (component.componentDidAppear) {
              component.componentDidAppear();
            }

            delete _this.currentlyTransitioningKeys[key];

            var currentChildMapping = ReactTransitionChildMapping.getChildMapping(_this.props.children);

            if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
              // This was removed before it had fully appeared. Remove it.
              _this.performLeave(key);
            }
          }, _this.performEnter = function (key) {
            _this.currentlyTransitioningKeys[key] = true;

            var component = _this.refs[key];

            if (component.componentWillEnter) {
              component.componentWillEnter(_this._handleDoneEntering.bind(_this, key));
            } else {
              _this._handleDoneEntering(key);
            }
          }, _this._handleDoneEntering = function (key) {
            var component = _this.refs[key];
            if (component.componentDidEnter) {
              component.componentDidEnter();
            }

            delete _this.currentlyTransitioningKeys[key];

            var currentChildMapping = ReactTransitionChildMapping.getChildMapping(_this.props.children);

            if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
              // This was removed before it had fully entered. Remove it.
              _this.performLeave(key);
            }
          }, _this.performLeave = function (key) {
            _this.currentlyTransitioningKeys[key] = true;

            var component = _this.refs[key];
            if (component.componentWillLeave) {
              component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key));
            } else {
              // Note that this is somewhat dangerous b/c it calls setState()
              // again, effectively mutating the component before all the work
              // is done.
              _this._handleDoneLeaving(key);
            }
          }, _this._handleDoneLeaving = function (key) {
            var component = _this.refs[key];

            if (component.componentDidLeave) {
              component.componentDidLeave();
            }

            delete _this.currentlyTransitioningKeys[key];

            var currentChildMapping = ReactTransitionChildMapping.getChildMapping(_this.props.children);

            if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
              // This entered again before it fully left. Add it again.
              _this.performEnter(key);
            } else {
              _this.setState(function (state) {
                var newChildren = _assign({}, state.children);
                delete newChildren[key];
                return { children: newChildren };
              });
            }
          }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        ReactTransitionGroup.prototype.componentWillMount = function componentWillMount() {
          this.currentlyTransitioningKeys = {};
          this.keysToEnter = [];
          this.keysToLeave = [];
        };

        ReactTransitionGroup.prototype.componentDidMount = function componentDidMount() {
          var initialChildMapping = this.state.children;
          for (var key in initialChildMapping) {
            if (initialChildMapping[key]) {
              this.performAppear(key);
            }
          }
        };

        ReactTransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
          var nextChildMapping = ReactTransitionChildMapping.getChildMapping(nextProps.children);
          var prevChildMapping = this.state.children;

          this.setState({
            children: ReactTransitionChildMapping.mergeChildMappings(prevChildMapping, nextChildMapping)
          });

          var key;

          for (key in nextChildMapping) {
            var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
            if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
              this.keysToEnter.push(key);
            }
          }

          for (key in prevChildMapping) {
            var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
            if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
              this.keysToLeave.push(key);
            }
          }

          // If we want to someday check for reordering, we could do it here.
        };

        ReactTransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
          var keysToEnter = this.keysToEnter;
          this.keysToEnter = [];
          keysToEnter.forEach(this.performEnter);

          var keysToLeave = this.keysToLeave;
          this.keysToLeave = [];
          keysToLeave.forEach(this.performLeave);
        };

        ReactTransitionGroup.prototype.render = function render() {
          // TODO: we could get rid of the need for the wrapper node
          // by cloning a single child
          var childrenToRender = [];
          for (var key in this.state.children) {
            var child = this.state.children[key];
            if (child) {
              // You may need to apply reactive updates to a child as it is leaving.
              // The normal React way to do it won't work since the child will have
              // already been removed. In case you need this behavior you can provide
              // a childFactory function to wrap every child, even the ones that are
              // leaving.
              childrenToRender.push(React.cloneElement(this.props.childFactory(child), { ref: key, key: key }));
            }
          }

          // Do not forward ReactTransitionGroup props to primitive DOM nodes
          var props = _assign({}, this.props);
          delete props.transitionLeave;
          delete props.transitionName;
          delete props.transitionAppear;
          delete props.transitionEnter;
          delete props.childFactory;
          delete props.transitionLeaveTimeout;
          delete props.transitionEnterTimeout;
          delete props.transitionAppearTimeout;
          delete props.component;

          return React.createElement(this.props.component, props, childrenToRender);
        };

        return ReactTransitionGroup;
      }(React.Component);

      ReactTransitionGroup.displayName = 'ReactTransitionGroup';
      ReactTransitionGroup.propTypes = {
        component: React.PropTypes.any,
        childFactory: React.PropTypes.func
      };
      ReactTransitionGroup.defaultProps = {
        component: 'span',
        childFactory: emptyFunction.thatReturnsArgument
      };

      module.exports = ReactTransitionGroup;
    }, { "27": 27, "44": 44, "49": 49, "5": 5 }], 30: [function (_dereq_, module, exports) {
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

      module.exports = '15.4.2';
    }, {}], 31: [function (_dereq_, module, exports) {
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

      var LinkedStateMixin = _dereq_(3);
      var React = _dereq_(5);
      var ReactAddonsDOMDependencies = _dereq_(6);
      var ReactComponentWithPureRenderMixin = _dereq_(13);
      var ReactCSSTransitionGroup = _dereq_(7);
      var ReactFragment = _dereq_(19);
      var ReactTransitionGroup = _dereq_(29);

      var shallowCompare = _dereq_(39);
      var update = _dereq_(41);

      React.addons = {
        CSSTransitionGroup: ReactCSSTransitionGroup,
        LinkedStateMixin: LinkedStateMixin,
        PureRenderMixin: ReactComponentWithPureRenderMixin,
        TransitionGroup: ReactTransitionGroup,

        createFragment: ReactFragment.create,
        shallowCompare: shallowCompare,
        update: update
      };

      if ("development" !== 'production') {
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
    }, { "13": 13, "19": 19, "29": 29, "3": 3, "39": 39, "41": 41, "5": 5, "6": 6, "7": 7 }], 32: [function (_dereq_, module, exports) {
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

      var _assign = _dereq_(49);

      var ReactWithAddons = _dereq_(31);

      // `version` will be added here by the React module.
      var ReactWithAddonsUMDEntry = _assign({
        __SECRET_INJECTED_REACT_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: null, // Will be injected by ReactDOM UMD build.
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
          ReactCurrentOwner: _dereq_(14)
        }
      }, ReactWithAddons);

      if ("development" !== 'production') {
        _assign(ReactWithAddonsUMDEntry.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
          // ReactComponentTreeHook should not be included in production.
          ReactComponentTreeHook: _dereq_(12)
        });
      }

      module.exports = ReactWithAddonsUMDEntry;
    }, { "12": 12, "14": 14, "31": 31, "49": 49 }], 33: [function (_dereq_, module, exports) {
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

      var canDefineProperty = false;
      if ("development" !== 'production') {
        try {
          // $FlowFixMe https://github.com/facebook/flow/issues/285
          Object.defineProperty({}, 'x', { get: function get() {} });
          canDefineProperty = true;
        } catch (x) {
          // IE will fail on defineProperty
        }
      }

      module.exports = canDefineProperty;
    }, {}], 34: [function (_dereq_, module, exports) {
      (function (process) {
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

        var _prodInvariant = _dereq_(38);

        var ReactPropTypeLocationNames = _dereq_(22);
        var ReactPropTypesSecret = _dereq_(24);

        var invariant = _dereq_(46);
        var warning = _dereq_(48);

        var ReactComponentTreeHook;

        if (typeof process !== 'undefined' && process.env && "development" === 'test') {
          // Temporary hack.
          // Inline requires don't work well with Jest:
          // https://github.com/facebook/react/issues/7240
          // Remove the inline requires when we don't need them anymore:
          // https://github.com/facebook/react/pull/7178
          ReactComponentTreeHook = _dereq_(12);
        }

        var loggedTypeFailures = {};

        /**
         * Assert that the values match with the type specs.
         * Error messages are memorized and will only be shown once.
         *
         * @param {object} typeSpecs Map of name to a ReactPropType
         * @param {object} values Runtime values that need to be type-checked
         * @param {string} location e.g. "prop", "context", "child context"
         * @param {string} componentName Name of the component for error messages.
         * @param {?object} element The React element that is being type-checked
         * @param {?number} debugID The React component instance that is being type-checked
         * @private
         */
        function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
          for (var typeSpecName in typeSpecs) {
            if (typeSpecs.hasOwnProperty(typeSpecName)) {
              var error;
              // Prop type validation may throw. In case they do, we don't want to
              // fail the render phase where it didn't fail before. So we log it.
              // After these have been cleaned up, we'll let them throw.
              try {
                // This is intentionally an invariant that gets caught. It's the same
                // behavior as without this statement except with a better message.
                !(typeof typeSpecs[typeSpecName] === 'function') ? "development" !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
                error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
              } catch (ex) {
                error = ex;
              }
              "development" !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error === "undefined" ? "undefined" : _typeof(error)) : void 0;
              if (error instanceof Error && !(error.message in loggedTypeFailures)) {
                // Only monitor this failure once because there tends to be a lot of the
                // same error.
                loggedTypeFailures[error.message] = true;

                var componentStackInfo = '';

                if ("development" !== 'production') {
                  if (!ReactComponentTreeHook) {
                    ReactComponentTreeHook = _dereq_(12);
                  }
                  if (debugID !== null) {
                    componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
                  } else if (element !== null) {
                    componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
                  }
                }

                "development" !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
              }
            }
          }
        }

        module.exports = checkReactTypeSpec;
      }).call(this, undefined);
    }, { "12": 12, "22": 22, "24": 24, "38": 38, "46": 46, "48": 48 }], 35: [function (_dereq_, module, exports) {
      (function (process) {
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

        var KeyEscapeUtils = _dereq_(2);
        var traverseAllChildren = _dereq_(40);
        var warning = _dereq_(48);

        var ReactComponentTreeHook;

        if (typeof process !== 'undefined' && process.env && "development" === 'test') {
          // Temporary hack.
          // Inline requires don't work well with Jest:
          // https://github.com/facebook/react/issues/7240
          // Remove the inline requires when we don't need them anymore:
          // https://github.com/facebook/react/pull/7178
          ReactComponentTreeHook = _dereq_(12);
        }

        /**
         * @param {function} traverseContext Context passed through traversal.
         * @param {?ReactComponent} child React child component.
         * @param {!string} name String name of key path to child.
         * @param {number=} selfDebugID Optional debugID of the current internal instance.
         */
        function flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID) {
          // We found a component instance.
          if (traverseContext && (typeof traverseContext === "undefined" ? "undefined" : _typeof(traverseContext)) === 'object') {
            var result = traverseContext;
            var keyUnique = result[name] === undefined;
            if ("development" !== 'production') {
              if (!ReactComponentTreeHook) {
                ReactComponentTreeHook = _dereq_(12);
              }
              if (!keyUnique) {
                "development" !== 'production' ? warning(false, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.%s', KeyEscapeUtils.unescape(name), ReactComponentTreeHook.getStackAddendumByID(selfDebugID)) : void 0;
              }
            }
            if (keyUnique && child != null) {
              result[name] = child;
            }
          }
        }

        /**
         * Flattens children that are typically specified as `props.children`. Any null
         * children will not be included in the resulting object.
         * @return {!object} flattened children keyed by name.
         */
        function flattenChildren(children, selfDebugID) {
          if (children == null) {
            return children;
          }
          var result = {};

          if ("development" !== 'production') {
            traverseAllChildren(children, function (traverseContext, child, name) {
              return flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID);
            }, result);
          } else {
            traverseAllChildren(children, flattenSingleChildIntoContext, result);
          }
          return result;
        }

        module.exports = flattenChildren;
      }).call(this, undefined);
    }, { "12": 12, "2": 2, "40": 40, "48": 48 }], 36: [function (_dereq_, module, exports) {
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

      /* global Symbol */

      var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

      /**
       * Returns the iterator method function contained on the iterable object.
       *
       * Be sure to invoke the function with the iterable as context:
       *
       *     var iteratorFn = getIteratorFn(myIterable);
       *     if (iteratorFn) {
       *       var iterator = iteratorFn.call(myIterable);
       *       ...
       *     }
       *
       * @param {?object} maybeIterable
       * @return {?function}
       */
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === 'function') {
          return iteratorFn;
        }
      }

      module.exports = getIteratorFn;
    }, {}], 37: [function (_dereq_, module, exports) {
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

      var _prodInvariant = _dereq_(38);

      var ReactElement = _dereq_(16);

      var invariant = _dereq_(46);

      /**
       * Returns the first child in a collection of children and verifies that there
       * is only one child in the collection.
       *
       * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
       *
       * The current implementation of this function assumes that a single child gets
       * passed without a wrapper, but the purpose of this helper function is to
       * abstract away the particular structure of children.
       *
       * @param {?object} children Child collection structure.
       * @return {ReactElement} The first and only `ReactElement` contained in the
       * structure.
       */
      function onlyChild(children) {
        !ReactElement.isValidElement(children) ? "development" !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
        return children;
      }

      module.exports = onlyChild;
    }, { "16": 16, "38": 38, "46": 46 }], 38: [function (_dereq_, module, exports) {
      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * 
       */
      'use strict';

      /**
       * WARNING: DO NOT manually require this module.
       * This is a replacement for `invariant(...)` used by the error code system
       * and will _only_ be required by the corresponding babel pass.
       * It always throws.
       */

      function reactProdInvariant(code) {
        var argCount = arguments.length - 1;

        var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

        for (var argIdx = 0; argIdx < argCount; argIdx++) {
          message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
        }

        message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

        var error = new Error(message);
        error.name = 'Invariant Violation';
        error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

        throw error;
      }

      module.exports = reactProdInvariant;
    }, {}], 39: [function (_dereq_, module, exports) {
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

      var shallowEqual = _dereq_(47);

      /**
       * Does a shallow comparison for props and state.
       * See ReactComponentWithPureRenderMixin
       * See also https://facebook.github.io/react/docs/shallow-compare.html
       */
      function shallowCompare(instance, nextProps, nextState) {
        return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
      }

      module.exports = shallowCompare;
    }, { "47": 47 }], 40: [function (_dereq_, module, exports) {
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

      var _prodInvariant = _dereq_(38);

      var ReactCurrentOwner = _dereq_(14);
      var REACT_ELEMENT_TYPE = _dereq_(17);

      var getIteratorFn = _dereq_(36);
      var invariant = _dereq_(46);
      var KeyEscapeUtils = _dereq_(2);
      var warning = _dereq_(48);

      var SEPARATOR = '.';
      var SUBSEPARATOR = ':';

      /**
       * This is inlined from ReactElement since this file is shared between
       * isomorphic and renderers. We could extract this to a
       *
       */

      /**
       * TODO: Test that a single child and an array with one item have the same key
       * pattern.
       */

      var didWarnAboutMaps = false;

      /**
       * Generate a key string that identifies a component within a set.
       *
       * @param {*} component A component that could contain a manual key.
       * @param {number} index Index that is used if a manual key is not provided.
       * @return {string}
       */
      function getComponentKey(component, index) {
        // Do some typechecking here since we call this blindly. We want to ensure
        // that we don't block potential future ES APIs.
        if (component && (typeof component === "undefined" ? "undefined" : _typeof(component)) === 'object' && component.key != null) {
          // Explicit key
          return KeyEscapeUtils.escape(component.key);
        }
        // Implicit key determined by the index in the set
        return index.toString(36);
      }

      /**
       * @param {?*} children Children tree container.
       * @param {!string} nameSoFar Name of the key path so far.
       * @param {!function} callback Callback to invoke with each child found.
       * @param {?*} traverseContext Used to pass information throughout the traversal
       * process.
       * @return {!number} The number of children in this subtree.
       */
      function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
        var type = typeof children === "undefined" ? "undefined" : _typeof(children);

        if (type === 'undefined' || type === 'boolean') {
          // All of the above are perceived as null.
          children = null;
        }

        if (children === null || type === 'string' || type === 'number' ||
        // The following is inlined from ReactElement. This means we can optimize
        // some checks. React Fiber also inlines this logic for similar purposes.
        type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
          callback(traverseContext, children,
          // If it's the only child, treat the name as if it was wrapped in an array
          // so that it's consistent if the number of children grows.
          nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
          return 1;
        }

        var child;
        var nextName;
        var subtreeCount = 0; // Count of children found in the current subtree.
        var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

        if (Array.isArray(children)) {
          for (var i = 0; i < children.length; i++) {
            child = children[i];
            nextName = nextNamePrefix + getComponentKey(child, i);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else {
          var iteratorFn = getIteratorFn(children);
          if (iteratorFn) {
            var iterator = iteratorFn.call(children);
            var step;
            if (iteratorFn !== children.entries) {
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getComponentKey(child, ii++);
                subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
              }
            } else {
              if ("development" !== 'production') {
                var mapsAsChildrenAddendum = '';
                if (ReactCurrentOwner.current) {
                  var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
                  if (mapsAsChildrenOwnerName) {
                    mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
                  }
                }
                "development" !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
                didWarnAboutMaps = true;
              }
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  child = entry[1];
                  nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
                  subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
                }
              }
            }
          } else if (type === 'object') {
            var addendum = '';
            if ("development" !== 'production') {
              addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
              if (children._isReactElement) {
                addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
              }
              if (ReactCurrentOwner.current) {
                var name = ReactCurrentOwner.current.getName();
                if (name) {
                  addendum += ' Check the render method of `' + name + '`.';
                }
              }
            }
            var childrenString = String(children);
            !false ? "development" !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
          }
        }

        return subtreeCount;
      }

      /**
       * Traverses children that are typically specified as `props.children`, but
       * might also be specified through attributes:
       *
       * - `traverseAllChildren(this.props.children, ...)`
       * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
       *
       * The `traverseContext` is an optional argument that is passed through the
       * entire traversal. It can be used to store accumulations or anything else that
       * the callback might find relevant.
       *
       * @param {?*} children Children tree object.
       * @param {!function} callback To invoke upon traversing each child.
       * @param {?*} traverseContext Context for traversal.
       * @return {!number} The number of children in this subtree.
       */
      function traverseAllChildren(children, callback, traverseContext) {
        if (children == null) {
          return 0;
        }

        return traverseAllChildrenImpl(children, '', callback, traverseContext);
      }

      module.exports = traverseAllChildren;
    }, { "14": 14, "17": 17, "2": 2, "36": 36, "38": 38, "46": 46, "48": 48 }], 41: [function (_dereq_, module, exports) {
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

      var _prodInvariant = _dereq_(38),
          _assign = _dereq_(49);

      var invariant = _dereq_(46);
      var hasOwnProperty = {}.hasOwnProperty;

      function shallowCopy(x) {
        if (Array.isArray(x)) {
          return x.concat();
        } else if (x && (typeof x === "undefined" ? "undefined" : _typeof(x)) === 'object') {
          return _assign(new x.constructor(), x);
        } else {
          return x;
        }
      }

      var COMMAND_PUSH = '$push';
      var COMMAND_UNSHIFT = '$unshift';
      var COMMAND_SPLICE = '$splice';
      var COMMAND_SET = '$set';
      var COMMAND_MERGE = '$merge';
      var COMMAND_APPLY = '$apply';

      var ALL_COMMANDS_LIST = [COMMAND_PUSH, COMMAND_UNSHIFT, COMMAND_SPLICE, COMMAND_SET, COMMAND_MERGE, COMMAND_APPLY];

      var ALL_COMMANDS_SET = {};

      ALL_COMMANDS_LIST.forEach(function (command) {
        ALL_COMMANDS_SET[command] = true;
      });

      function invariantArrayCase(value, spec, command) {
        !Array.isArray(value) ? "development" !== 'production' ? invariant(false, 'update(): expected target of %s to be an array; got %s.', command, value) : _prodInvariant('1', command, value) : void 0;
        var specValue = spec[command];
        !Array.isArray(specValue) ? "development" !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array; got %s. Did you forget to wrap your parameter in an array?', command, specValue) : _prodInvariant('2', command, specValue) : void 0;
      }

      /**
       * Returns a updated shallow copy of an object without mutating the original.
       * See https://facebook.github.io/react/docs/update.html for details.
       */
      function update(value, spec) {
        !((typeof spec === "undefined" ? "undefined" : _typeof(spec)) === 'object') ? "development" !== 'production' ? invariant(false, 'update(): You provided a key path to update() that did not contain one of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : _prodInvariant('3', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : void 0;

        if (hasOwnProperty.call(spec, COMMAND_SET)) {
          !(Object.keys(spec).length === 1) ? "development" !== 'production' ? invariant(false, 'Cannot have more than one key in an object with %s', COMMAND_SET) : _prodInvariant('4', COMMAND_SET) : void 0;

          return spec[COMMAND_SET];
        }

        var nextValue = shallowCopy(value);

        if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
          var mergeObj = spec[COMMAND_MERGE];
          !(mergeObj && (typeof mergeObj === "undefined" ? "undefined" : _typeof(mergeObj)) === 'object') ? "development" !== 'production' ? invariant(false, 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : _prodInvariant('5', COMMAND_MERGE, mergeObj) : void 0;
          !(nextValue && (typeof nextValue === "undefined" ? "undefined" : _typeof(nextValue)) === 'object') ? "development" !== 'production' ? invariant(false, 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : _prodInvariant('6', COMMAND_MERGE, nextValue) : void 0;
          _assign(nextValue, spec[COMMAND_MERGE]);
        }

        if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
          invariantArrayCase(value, spec, COMMAND_PUSH);
          spec[COMMAND_PUSH].forEach(function (item) {
            nextValue.push(item);
          });
        }

        if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
          invariantArrayCase(value, spec, COMMAND_UNSHIFT);
          spec[COMMAND_UNSHIFT].forEach(function (item) {
            nextValue.unshift(item);
          });
        }

        if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
          !Array.isArray(value) ? "development" !== 'production' ? invariant(false, 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : _prodInvariant('7', COMMAND_SPLICE, value) : void 0;
          !Array.isArray(spec[COMMAND_SPLICE]) ? "development" !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : _prodInvariant('8', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : void 0;
          spec[COMMAND_SPLICE].forEach(function (args) {
            !Array.isArray(args) ? "development" !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : _prodInvariant('8', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : void 0;
            nextValue.splice.apply(nextValue, args);
          });
        }

        if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
          !(typeof spec[COMMAND_APPLY] === 'function') ? "development" !== 'production' ? invariant(false, 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : _prodInvariant('9', COMMAND_APPLY, spec[COMMAND_APPLY]) : void 0;
          nextValue = spec[COMMAND_APPLY](nextValue);
        }

        for (var k in spec) {
          if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
            nextValue[k] = update(value[k], spec[k]);
          }
        }

        return nextValue;
      }

      module.exports = update;
    }, { "38": 38, "46": 46, "49": 49 }], 42: [function (_dereq_, module, exports) {
      'use strict';

      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * @typechecks
       */

      var invariant = _dereq_(46);

      /**
       * The CSSCore module specifies the API (and implements most of the methods)
       * that should be used when dealing with the display of elements (via their
       * CSS classes and visibility on screen. It is an API focused on mutating the
       * display and not reading it as no logical state should be encoded in the
       * display of elements.
       */

      /* Slow implementation for browsers that don't natively support .matches() */
      function matchesSelector_SLOW(element, selector) {
        var root = element;
        while (root.parentNode) {
          root = root.parentNode;
        }

        var all = root.querySelectorAll(selector);
        return Array.prototype.indexOf.call(all, element) !== -1;
      }

      var CSSCore = {

        /**
         * Adds the class passed in to the element if it doesn't already have it.
         *
         * @param {DOMElement} element the element to set the class on
         * @param {string} className the CSS className
         * @return {DOMElement} the element passed in
         */
        addClass: function addClass(element, className) {
          !!/\s/.test(className) ? "development" !== 'production' ? invariant(false, 'CSSCore.addClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(false) : void 0;

          if (className) {
            if (element.classList) {
              element.classList.add(className);
            } else if (!CSSCore.hasClass(element, className)) {
              element.className = element.className + ' ' + className;
            }
          }
          return element;
        },

        /**
         * Removes the class passed in from the element
         *
         * @param {DOMElement} element the element to set the class on
         * @param {string} className the CSS className
         * @return {DOMElement} the element passed in
         */
        removeClass: function removeClass(element, className) {
          !!/\s/.test(className) ? "development" !== 'production' ? invariant(false, 'CSSCore.removeClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(false) : void 0;

          if (className) {
            if (element.classList) {
              element.classList.remove(className);
            } else if (CSSCore.hasClass(element, className)) {
              element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ') // multiple spaces to one
              .replace(/^\s*|\s*$/g, ''); // trim the ends
            }
          }
          return element;
        },

        /**
         * Helper to add or remove a class from an element based on a condition.
         *
         * @param {DOMElement} element the element to set the class on
         * @param {string} className the CSS className
         * @param {*} bool condition to whether to add or remove the class
         * @return {DOMElement} the element passed in
         */
        conditionClass: function conditionClass(element, className, bool) {
          return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
        },

        /**
         * Tests whether the element has the class specified.
         *
         * @param {DOMNode|DOMWindow} element the element to check the class on
         * @param {string} className the CSS className
         * @return {boolean} true if the element has the class, false if not
         */
        hasClass: function hasClass(element, className) {
          !!/\s/.test(className) ? "development" !== 'production' ? invariant(false, 'CSS.hasClass takes only a single class name.') : invariant(false) : void 0;
          if (element.classList) {
            return !!className && element.classList.contains(className);
          }
          return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
        },

        /**
         * Tests whether the element matches the selector specified
         *
         * @param {DOMNode|DOMWindow} element the element that we are querying
         * @param {string} selector the CSS selector
         * @return {boolean} true if the element matches the selector, false if not
         */
        matchesSelector: function matchesSelector(element, selector) {
          var matchesImpl = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector || function (s) {
            return matchesSelector_SLOW(element, s);
          };
          return matchesImpl.call(element, selector);
        }

      };

      module.exports = CSSCore;
    }, { "46": 46 }], 43: [function (_dereq_, module, exports) {
      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       */

      'use strict';

      var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

      /**
       * Simple, lightweight module assisting with the detection and context of
       * Worker. Helps avoid circular dependencies and allows code to reason about
       * whether or not they are in a Worker, even if they never include the main
       * `ReactWorker` dependency.
       */
      var ExecutionEnvironment = {

        canUseDOM: canUseDOM,

        canUseWorkers: typeof Worker !== 'undefined',

        canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

        canUseViewport: canUseDOM && !!window.screen,

        isInWorker: !canUseDOM // For now, this is true - might change in the future.

      };

      module.exports = ExecutionEnvironment;
    }, {}], 44: [function (_dereq_, module, exports) {
      "use strict";

      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * 
       */

      function makeEmptyFunction(arg) {
        return function () {
          return arg;
        };
      }

      /**
       * This function accepts and discards inputs; it has no side effects. This is
       * primarily useful idiomatically for overridable function endpoints which
       * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
       */
      var emptyFunction = function emptyFunction() {};

      emptyFunction.thatReturns = makeEmptyFunction;
      emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
      emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
      emptyFunction.thatReturnsNull = makeEmptyFunction(null);
      emptyFunction.thatReturnsThis = function () {
        return this;
      };
      emptyFunction.thatReturnsArgument = function (arg) {
        return arg;
      };

      module.exports = emptyFunction;
    }, {}], 45: [function (_dereq_, module, exports) {
      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       */

      'use strict';

      var emptyObject = {};

      if ("development" !== 'production') {
        Object.freeze(emptyObject);
      }

      module.exports = emptyObject;
    }, {}], 46: [function (_dereq_, module, exports) {
      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       */

      'use strict';

      /**
       * Use invariant() to assert state which your program assumes to be true.
       *
       * Provide sprintf-style format (only %s is supported) and arguments
       * to provide information about what broke and what you were
       * expecting.
       *
       * The invariant message will be stripped in production, but the invariant
       * will remain to ensure logic does not differ in production.
       */

      var validateFormat = function validateFormat(format) {};

      if ("development" !== 'production') {
        validateFormat = function validateFormat(format) {
          if (format === undefined) {
            throw new Error('invariant requires an error message argument');
          }
        };
      }

      function invariant(condition, format, a, b, c, d, e, f) {
        validateFormat(format);

        if (!condition) {
          var error;
          if (format === undefined) {
            error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
          } else {
            var args = [a, b, c, d, e, f];
            var argIndex = 0;
            error = new Error(format.replace(/%s/g, function () {
              return args[argIndex++];
            }));
            error.name = 'Invariant Violation';
          }

          error.framesToPop = 1; // we don't care about invariant's own frame
          throw error;
        }
      }

      module.exports = invariant;
    }, {}], 47: [function (_dereq_, module, exports) {
      /**
       * Copyright (c) 2013-present, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       * @typechecks
       * 
       */

      /*eslint-disable no-self-compare */

      'use strict';

      var hasOwnProperty = Object.prototype.hasOwnProperty;

      /**
       * inlined Object.is polyfill to avoid requiring consumers ship their own
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
       */
      function is(x, y) {
        // SameValue algorithm
        if (x === y) {
          // Steps 1-5, 7-10
          // Steps 6.b-6.e: +0 != -0
          // Added the nonzero y check to make Flow happy, but it is redundant
          return x !== 0 || y !== 0 || 1 / x === 1 / y;
        } else {
          // Step 6.a: NaN == NaN
          return x !== x && y !== y;
        }
      }

      /**
       * Performs equality by iterating through keys on an object and returning false
       * when any key has values which are not strictly equal between the arguments.
       * Returns true when the values of all keys are strictly equal.
       */
      function shallowEqual(objA, objB) {
        if (is(objA, objB)) {
          return true;
        }

        if ((typeof objA === "undefined" ? "undefined" : _typeof(objA)) !== 'object' || objA === null || (typeof objB === "undefined" ? "undefined" : _typeof(objB)) !== 'object' || objB === null) {
          return false;
        }

        var keysA = Object.keys(objA);
        var keysB = Object.keys(objB);

        if (keysA.length !== keysB.length) {
          return false;
        }

        // Test for A's keys different from B.
        for (var i = 0; i < keysA.length; i++) {
          if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
          }
        }

        return true;
      }

      module.exports = shallowEqual;
    }, {}], 48: [function (_dereq_, module, exports) {
      /**
       * Copyright 2014-2015, Facebook, Inc.
       * All rights reserved.
       *
       * This source code is licensed under the BSD-style license found in the
       * LICENSE file in the root directory of this source tree. An additional grant
       * of patent rights can be found in the PATENTS file in the same directory.
       *
       */

      'use strict';

      var emptyFunction = _dereq_(44);

      /**
       * Similar to invariant but only logs a warning if the condition is not met.
       * This can be used to log issues in development environments in critical
       * paths. Removing the logging code for production environments will keep the
       * same logic and follow the same code paths.
       */

      var warning = emptyFunction;

      if ("development" !== 'production') {
        (function () {
          var printWarning = function printWarning(format) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            var argIndex = 0;
            var message = 'Warning: ' + format.replace(/%s/g, function () {
              return args[argIndex++];
            });
            if (typeof console !== 'undefined') {
              console.error(message);
            }
            try {
              // --- Welcome to debugging React ---
              // This error was thrown as a convenience so that you can use this stack
              // to find the callsite that caused this warning to fire.
              throw new Error(message);
            } catch (x) {}
          };

          warning = function warning(condition, format) {
            if (format === undefined) {
              throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
            }

            if (format.indexOf('Failed Composite propType: ') === 0) {
              return; // Ignore CompositeComponent proptype check.
            }

            if (!condition) {
              for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                args[_key2 - 2] = arguments[_key2];
              }

              printWarning.apply(undefined, [format].concat(args));
            }
          };
        })();
      }

      module.exports = warning;
    }, { "44": 44 }], 49: [function (_dereq_, module, exports) {
      'use strict';
      /* eslint-disable no-unused-vars */

      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;

      function toObject(val) {
        if (val === null || val === undefined) {
          throw new TypeError('Object.assign cannot be called with null or undefined');
        }

        return Object(val);
      }

      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }

          // Detect buggy property enumeration order in older V8 versions.

          // https://bugs.chromium.org/p/v8/issues/detail?id=4118
          var test1 = new String('abc'); // eslint-disable-line
          test1[5] = 'de';
          if (Object.getOwnPropertyNames(test1)[0] === '5') {
            return false;
          }

          // https://bugs.chromium.org/p/v8/issues/detail?id=3056
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2['_' + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
            return test2[n];
          });
          if (order2.join('') !== '0123456789') {
            return false;
          }

          // https://bugs.chromium.org/p/v8/issues/detail?id=3056
          var test3 = {};
          'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
            return false;
          }

          return true;
        } catch (e) {
          // We don't expect any of the above to throw, but better to be safe.
          return false;
        }
      }

      module.exports = shouldUseNative() ? Object.assign : function (target, source) {
        var from;
        var to = toObject(target);
        var symbols;

        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);

          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }

          if (Object.getOwnPropertySymbols) {
            symbols = Object.getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }

        return to;
      };
    }, {}] }, {}, [32])(32);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QvZGlzdC9yZWFjdC13aXRoLWFkZG9ucy5qcyJdLCJuYW1lcyI6WyJmIiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsImciLCJ3aW5kb3ciLCJnbG9iYWwiLCJzZWxmIiwiUmVhY3QiLCJlIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJpIiwiRXJyb3IiLCJjb2RlIiwibCIsImNhbGwiLCJsZW5ndGgiLCJfZGVyZXFfIiwiRXhlY3V0aW9uRW52aXJvbm1lbnQiLCJtYWtlUHJlZml4TWFwIiwic3R5bGVQcm9wIiwiZXZlbnROYW1lIiwicHJlZml4ZXMiLCJ0b0xvd2VyQ2FzZSIsInZlbmRvclByZWZpeGVzIiwiYW5pbWF0aW9uZW5kIiwiYW5pbWF0aW9uaXRlcmF0aW9uIiwiYW5pbWF0aW9uc3RhcnQiLCJ0cmFuc2l0aW9uZW5kIiwicHJlZml4ZWRFdmVudE5hbWVzIiwic3R5bGUiLCJjYW5Vc2VET00iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhbmltYXRpb24iLCJ0cmFuc2l0aW9uIiwiZ2V0VmVuZG9yUHJlZml4ZWRFdmVudE5hbWUiLCJwcmVmaXhNYXAiLCJoYXNPd25Qcm9wZXJ0eSIsImVzY2FwZSIsImtleSIsImVzY2FwZVJlZ2V4IiwiZXNjYXBlckxvb2t1cCIsImVzY2FwZWRTdHJpbmciLCJyZXBsYWNlIiwibWF0Y2giLCJ1bmVzY2FwZSIsInVuZXNjYXBlUmVnZXgiLCJ1bmVzY2FwZXJMb29rdXAiLCJrZXlTdWJzdHJpbmciLCJzdWJzdHJpbmciLCJLZXlFc2NhcGVVdGlscyIsIlJlYWN0TGluayIsIlJlYWN0U3RhdGVTZXR0ZXJzIiwiTGlua2VkU3RhdGVNaXhpbiIsImxpbmtTdGF0ZSIsInN0YXRlIiwiY3JlYXRlU3RhdGVLZXlTZXR0ZXIiLCJfcHJvZEludmFyaWFudCIsImludmFyaWFudCIsIm9uZUFyZ3VtZW50UG9vbGVyIiwiY29weUZpZWxkc0Zyb20iLCJLbGFzcyIsImluc3RhbmNlUG9vbCIsImluc3RhbmNlIiwicG9wIiwidHdvQXJndW1lbnRQb29sZXIiLCJhMSIsImEyIiwidGhyZWVBcmd1bWVudFBvb2xlciIsImEzIiwiZm91ckFyZ3VtZW50UG9vbGVyIiwiYTQiLCJzdGFuZGFyZFJlbGVhc2VyIiwiZGVzdHJ1Y3RvciIsInBvb2xTaXplIiwicHVzaCIsIkRFRkFVTFRfUE9PTF9TSVpFIiwiREVGQVVMVF9QT09MRVIiLCJhZGRQb29saW5nVG8iLCJDb3B5Q29uc3RydWN0b3IiLCJwb29sZXIiLCJOZXdLbGFzcyIsImdldFBvb2xlZCIsInJlbGVhc2UiLCJQb29sZWRDbGFzcyIsIl9hc3NpZ24iLCJSZWFjdENoaWxkcmVuIiwiUmVhY3RDb21wb25lbnQiLCJSZWFjdFB1cmVDb21wb25lbnQiLCJSZWFjdENsYXNzIiwiUmVhY3RET01GYWN0b3JpZXMiLCJSZWFjdEVsZW1lbnQiLCJSZWFjdFByb3BUeXBlcyIsIlJlYWN0VmVyc2lvbiIsIm9ubHlDaGlsZCIsIndhcm5pbmciLCJjcmVhdGVGYWN0b3J5IiwiY2xvbmVFbGVtZW50IiwiUmVhY3RFbGVtZW50VmFsaWRhdG9yIiwiX19zcHJlYWQiLCJ3YXJuZWQiLCJhcHBseSIsImFyZ3VtZW50cyIsIkNoaWxkcmVuIiwibWFwIiwiZm9yRWFjaCIsImNvdW50IiwidG9BcnJheSIsIm9ubHkiLCJDb21wb25lbnQiLCJQdXJlQ29tcG9uZW50IiwiaXNWYWxpZEVsZW1lbnQiLCJQcm9wVHlwZXMiLCJjcmVhdGVDbGFzcyIsImNyZWF0ZU1peGluIiwibWl4aW4iLCJET00iLCJ2ZXJzaW9uIiwiUmVhY3RET00iLCJnZXRSZWFjdERPTSIsIlJlYWN0V2l0aEFkZG9uc1VNREVudHJ5IiwiX19TRUNSRVRfSU5KRUNURURfUkVBQ1RfRE9NX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQiLCJnZXRSZWFjdFBlcmYiLCJfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCIsIlJlYWN0UGVyZiIsImdldFJlYWN0VGVzdFV0aWxzIiwiUmVhY3RUZXN0VXRpbHMiLCJfY2xhc3NDYWxsQ2hlY2siLCJDb25zdHJ1Y3RvciIsIlR5cGVFcnJvciIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwiUmVmZXJlbmNlRXJyb3IiLCJfaW5oZXJpdHMiLCJzdWJDbGFzcyIsInN1cGVyQ2xhc3MiLCJwcm90b3R5cGUiLCJPYmplY3QiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwiZW51bWVyYWJsZSIsIndyaXRhYmxlIiwiY29uZmlndXJhYmxlIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJSZWFjdFRyYW5zaXRpb25Hcm91cCIsIlJlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwQ2hpbGQiLCJjcmVhdGVUcmFuc2l0aW9uVGltZW91dFByb3BWYWxpZGF0b3IiLCJ0cmFuc2l0aW9uVHlwZSIsInRpbWVvdXRQcm9wTmFtZSIsImVuYWJsZWRQcm9wTmFtZSIsInByb3BzIiwiUmVhY3RDU1NUcmFuc2l0aW9uR3JvdXAiLCJfUmVhY3QkQ29tcG9uZW50IiwiX3RlbXAiLCJfdGhpcyIsIl9yZXQiLCJfbGVuIiwiYXJncyIsIkFycmF5IiwiX2tleSIsImNvbmNhdCIsIl93cmFwQ2hpbGQiLCJjaGlsZCIsIm5hbWUiLCJ0cmFuc2l0aW9uTmFtZSIsImFwcGVhciIsInRyYW5zaXRpb25BcHBlYXIiLCJlbnRlciIsInRyYW5zaXRpb25FbnRlciIsImxlYXZlIiwidHJhbnNpdGlvbkxlYXZlIiwiYXBwZWFyVGltZW91dCIsInRyYW5zaXRpb25BcHBlYXJUaW1lb3V0IiwiZW50ZXJUaW1lb3V0IiwidHJhbnNpdGlvbkVudGVyVGltZW91dCIsImxlYXZlVGltZW91dCIsInRyYW5zaXRpb25MZWF2ZVRpbWVvdXQiLCJyZW5kZXIiLCJjaGlsZEZhY3RvcnkiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImJvb2wiLCJkZWZhdWx0UHJvcHMiLCJSZWFjdEFkZG9uc0RPTURlcGVuZGVuY2llcyIsIkNTU0NvcmUiLCJSZWFjdFRyYW5zaXRpb25FdmVudHMiLCJUSUNLIiwib25lT2ZUeXBlIiwic3RyaW5nIiwic2hhcGUiLCJhY3RpdmUiLCJlbnRlckFjdGl2ZSIsImxlYXZlQWN0aXZlIiwiYXBwZWFyQWN0aXZlIiwiaXNSZXF1aXJlZCIsIm51bWJlciIsImFuaW1hdGlvblR5cGUiLCJmaW5pc2hDYWxsYmFjayIsInVzZXJTcGVjaWZpZWREZWxheSIsIm5vZGUiLCJmaW5kRE9NTm9kZSIsImNsYXNzTmFtZSIsImFjdGl2ZUNsYXNzTmFtZSIsInRpbWVvdXQiLCJlbmRMaXN0ZW5lciIsInRhcmdldCIsImNsZWFyVGltZW91dCIsInJlbW92ZUNsYXNzIiwicmVtb3ZlRW5kRXZlbnRMaXN0ZW5lciIsImFkZENsYXNzIiwicXVldWVDbGFzc0FuZE5vZGUiLCJzZXRUaW1lb3V0IiwidHJhbnNpdGlvblRpbWVvdXRzIiwiYWRkRW5kRXZlbnRMaXN0ZW5lciIsImNsYXNzTmFtZUFuZE5vZGVRdWV1ZSIsImZsdXNoQ2xhc3NOYW1lQW5kTm9kZVF1ZXVlIiwiaXNNb3VudGVkIiwib2JqIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJjb21wb25lbnRXaWxsQXBwZWFyIiwiZG9uZSIsImNvbXBvbmVudFdpbGxFbnRlciIsImNvbXBvbmVudFdpbGxMZWF2ZSIsImNoaWxkcmVuIiwiZW1wdHlGdW5jdGlvbiIsInRyYXZlcnNlQWxsQ2hpbGRyZW4iLCJ1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCIsImVzY2FwZVVzZXJQcm92aWRlZEtleSIsInRleHQiLCJGb3JFYWNoQm9va0tlZXBpbmciLCJmb3JFYWNoRnVuY3Rpb24iLCJmb3JFYWNoQ29udGV4dCIsImZ1bmMiLCJjb250ZXh0IiwiZm9yRWFjaFNpbmdsZUNoaWxkIiwiYm9va0tlZXBpbmciLCJmb3JFYWNoQ2hpbGRyZW4iLCJmb3JFYWNoRnVuYyIsInRyYXZlcnNlQ29udGV4dCIsIk1hcEJvb2tLZWVwaW5nIiwibWFwUmVzdWx0Iiwia2V5UHJlZml4IiwibWFwRnVuY3Rpb24iLCJtYXBDb250ZXh0IiwicmVzdWx0IiwibWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCIsImNoaWxkS2V5IiwibWFwcGVkQ2hpbGQiLCJpc0FycmF5IiwibWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbCIsInRoYXRSZXR1cm5zQXJndW1lbnQiLCJjbG9uZUFuZFJlcGxhY2VLZXkiLCJhcnJheSIsInByZWZpeCIsImVzY2FwZWRQcmVmaXgiLCJtYXBDaGlsZHJlbiIsImZvckVhY2hTaW5nbGVDaGlsZER1bW15IiwiY291bnRDaGlsZHJlbiIsIlJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzIiwiUmVhY3ROb29wVXBkYXRlUXVldWUiLCJlbXB0eU9iamVjdCIsIk1JWElOU19LRVkiLCJpZGVudGl0eSIsImZuIiwiaW5qZWN0ZWRNaXhpbnMiLCJSZWFjdENsYXNzSW50ZXJmYWNlIiwibWl4aW5zIiwic3RhdGljcyIsImNvbnRleHRUeXBlcyIsImNoaWxkQ29udGV4dFR5cGVzIiwiZ2V0RGVmYXVsdFByb3BzIiwiZ2V0SW5pdGlhbFN0YXRlIiwiZ2V0Q2hpbGRDb250ZXh0IiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsImNvbXBvbmVudERpZFVwZGF0ZSIsInVwZGF0ZUNvbXBvbmVudCIsIlJFU0VSVkVEX1NQRUNfS0VZUyIsIm1peFNwZWNJbnRvQ29tcG9uZW50IiwidmFsaWRhdGVUeXBlRGVmIiwiY3JlYXRlTWVyZ2VkUmVzdWx0RnVuY3Rpb24iLCJtaXhTdGF0aWNTcGVjSW50b0NvbXBvbmVudCIsImF1dG9iaW5kIiwidHlwZURlZiIsImxvY2F0aW9uIiwicHJvcE5hbWUiLCJ2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlIiwiaXNBbHJlYWR5RGVmaW5lZCIsInNwZWNQb2xpY3kiLCJSZWFjdENsYXNzTWl4aW4iLCJzcGVjIiwidHlwZW9mU3BlYyIsImlzTWl4aW5WYWxpZCIsInByb3RvIiwiYXV0b0JpbmRQYWlycyIsIl9fcmVhY3RBdXRvQmluZFBhaXJzIiwicHJvcGVydHkiLCJpc1JlYWN0Q2xhc3NNZXRob2QiLCJpc0Z1bmN0aW9uIiwic2hvdWxkQXV0b0JpbmQiLCJjcmVhdGVDaGFpbmVkRnVuY3Rpb24iLCJpc1Jlc2VydmVkIiwiaXNJbmhlcml0ZWQiLCJtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzIiwib25lIiwidHdvIiwidW5kZWZpbmVkIiwibWVyZ2VkUmVzdWx0IiwiYiIsImMiLCJjaGFpbmVkRnVuY3Rpb24iLCJiaW5kQXV0b0JpbmRNZXRob2QiLCJjb21wb25lbnQiLCJtZXRob2QiLCJib3VuZE1ldGhvZCIsImJpbmQiLCJfX3JlYWN0Qm91bmRDb250ZXh0IiwiX19yZWFjdEJvdW5kTWV0aG9kIiwiX19yZWFjdEJvdW5kQXJndW1lbnRzIiwiY29tcG9uZW50TmFtZSIsIl9iaW5kIiwibmV3VGhpcyIsInJlYm91bmRNZXRob2QiLCJiaW5kQXV0b0JpbmRNZXRob2RzIiwicGFpcnMiLCJhdXRvQmluZEtleSIsInJlcGxhY2VTdGF0ZSIsIm5ld1N0YXRlIiwiY2FsbGJhY2siLCJ1cGRhdGVyIiwiZW5xdWV1ZVJlcGxhY2VTdGF0ZSIsImVucXVldWVDYWxsYmFjayIsIlJlYWN0Q2xhc3NDb21wb25lbnQiLCJyZWZzIiwiaW5pdGlhbFN0YXRlIiwiX2lzTW9ja0Z1bmN0aW9uIiwiaXNSZWFjdENsYXNzQXBwcm92ZWQiLCJjb21wb25lbnRTaG91bGRVcGRhdGUiLCJjb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzIiwibWV0aG9kTmFtZSIsImluamVjdGlvbiIsImluamVjdE1peGluIiwiY2FuRGVmaW5lUHJvcGVydHkiLCJpc1JlYWN0Q29tcG9uZW50Iiwic2V0U3RhdGUiLCJwYXJ0aWFsU3RhdGUiLCJlbnF1ZXVlU2V0U3RhdGUiLCJmb3JjZVVwZGF0ZSIsImVucXVldWVGb3JjZVVwZGF0ZSIsImRlcHJlY2F0ZWRBUElzIiwiZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nIiwiaW5mbyIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiZm5OYW1lIiwiUmVhY3RDdXJyZW50T3duZXIiLCJpc05hdGl2ZSIsImZ1bmNUb1N0cmluZyIsIkZ1bmN0aW9uIiwidG9TdHJpbmciLCJyZUlzTmF0aXZlIiwiUmVnRXhwIiwic291cmNlIiwidGVzdCIsImVyciIsImNhblVzZUNvbGxlY3Rpb25zIiwiZnJvbSIsIk1hcCIsImtleXMiLCJTZXQiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJnZXRJdGVtSURzIiwiYWRkUm9vdCIsInJlbW92ZVJvb3QiLCJnZXRSb290SURzIiwiaXRlbU1hcCIsInJvb3RJRFNldCIsImlkIiwiaXRlbSIsInNldCIsImFkZCIsIml0ZW1CeUtleSIsInJvb3RCeUtleSIsImdldEtleUZyb21JRCIsImdldElERnJvbUtleSIsInBhcnNlSW50Iiwic3Vic3RyIiwidW5tb3VudGVkSURzIiwicHVyZ2VEZWVwIiwiY2hpbGRJRHMiLCJkZXNjcmliZUNvbXBvbmVudEZyYW1lIiwib3duZXJOYW1lIiwiZmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiZ2V0RGlzcGxheU5hbWUiLCJlbGVtZW50IiwidHlwZSIsImRlc2NyaWJlSUQiLCJSZWFjdENvbXBvbmVudFRyZWVIb29rIiwiZ2V0RWxlbWVudCIsIm93bmVySUQiLCJnZXRPd25lcklEIiwiX3NvdXJjZSIsIm9uU2V0Q2hpbGRyZW4iLCJuZXh0Q2hpbGRJRHMiLCJuZXh0Q2hpbGRJRCIsIm5leHRDaGlsZCIsInBhcmVudElEIiwib25CZWZvcmVNb3VudENvbXBvbmVudCIsInVwZGF0ZUNvdW50Iiwib25CZWZvcmVVcGRhdGVDb21wb25lbnQiLCJvbk1vdW50Q29tcG9uZW50IiwiaXNSb290Iiwib25VcGRhdGVDb21wb25lbnQiLCJvblVubW91bnRDb21wb25lbnQiLCJwdXJnZVVubW91bnRlZENvbXBvbmVudHMiLCJfcHJldmVudFB1cmdpbmciLCJnZXRDdXJyZW50U3RhY2tBZGRlbmR1bSIsInRvcEVsZW1lbnQiLCJvd25lciIsIl9vd25lciIsImdldE5hbWUiLCJjdXJyZW50T3duZXIiLCJjdXJyZW50IiwiX2RlYnVnSUQiLCJnZXRTdGFja0FkZGVuZHVtQnlJRCIsImdldFBhcmVudElEIiwiZ2V0Q2hpbGRJRHMiLCJnZXRTb3VyY2UiLCJnZXRUZXh0IiwiZ2V0VXBkYXRlQ291bnQiLCJnZXRSZWdpc3RlcmVkSURzIiwic2hhbGxvd0NvbXBhcmUiLCJSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4iLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJjcmVhdGVET01GYWN0b3J5IiwiYWJiciIsImFkZHJlc3MiLCJhcmVhIiwiYXJ0aWNsZSIsImFzaWRlIiwiYXVkaW8iLCJiYXNlIiwiYmRpIiwiYmRvIiwiYmlnIiwiYmxvY2txdW90ZSIsImJvZHkiLCJiciIsImJ1dHRvbiIsImNhbnZhcyIsImNhcHRpb24iLCJjaXRlIiwiY29sIiwiY29sZ3JvdXAiLCJkYXRhIiwiZGF0YWxpc3QiLCJkZCIsImRlbCIsImRldGFpbHMiLCJkZm4iLCJkaWFsb2ciLCJkaXYiLCJkbCIsImR0IiwiZW0iLCJlbWJlZCIsImZpZWxkc2V0IiwiZmlnY2FwdGlvbiIsImZpZ3VyZSIsImZvb3RlciIsImZvcm0iLCJoMSIsImgyIiwiaDMiLCJoNCIsImg1IiwiaDYiLCJoZWFkIiwiaGVhZGVyIiwiaGdyb3VwIiwiaHIiLCJodG1sIiwiaWZyYW1lIiwiaW1nIiwiaW5wdXQiLCJpbnMiLCJrYmQiLCJrZXlnZW4iLCJsYWJlbCIsImxlZ2VuZCIsImxpIiwibGluayIsIm1haW4iLCJtYXJrIiwibWVudSIsIm1lbnVpdGVtIiwibWV0YSIsIm1ldGVyIiwibmF2Iiwibm9zY3JpcHQiLCJvYmplY3QiLCJvbCIsIm9wdGdyb3VwIiwib3B0aW9uIiwib3V0cHV0IiwicCIsInBhcmFtIiwicGljdHVyZSIsInByZSIsInByb2dyZXNzIiwicSIsInJwIiwicnQiLCJydWJ5Iiwic2FtcCIsInNjcmlwdCIsInNlY3Rpb24iLCJzZWxlY3QiLCJzbWFsbCIsInNwYW4iLCJzdHJvbmciLCJzdWIiLCJzdW1tYXJ5Iiwic3VwIiwidGFibGUiLCJ0Ym9keSIsInRkIiwidGV4dGFyZWEiLCJ0Zm9vdCIsInRoIiwidGhlYWQiLCJ0aW1lIiwidGl0bGUiLCJ0ciIsInRyYWNrIiwidWwiLCJ2aWRlbyIsIndiciIsImNpcmNsZSIsImNsaXBQYXRoIiwiZGVmcyIsImVsbGlwc2UiLCJpbWFnZSIsImxpbmUiLCJsaW5lYXJHcmFkaWVudCIsIm1hc2siLCJwYXRoIiwicGF0dGVybiIsInBvbHlnb24iLCJwb2x5bGluZSIsInJhZGlhbEdyYWRpZW50IiwicmVjdCIsInN0b3AiLCJzdmciLCJ0c3BhbiIsIlJFQUNUX0VMRU1FTlRfVFlQRSIsIlJFU0VSVkVEX1BST1BTIiwicmVmIiwiX19zZWxmIiwiX19zb3VyY2UiLCJzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biIsInNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duIiwiaGFzVmFsaWRSZWYiLCJjb25maWciLCJnZXR0ZXIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc1JlYWN0V2FybmluZyIsImhhc1ZhbGlkS2V5IiwiZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIiLCJ3YXJuQWJvdXRBY2Nlc3NpbmdLZXkiLCJkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlciIsIndhcm5BYm91dEFjY2Vzc2luZ1JlZiIsIiQkdHlwZW9mIiwiX3N0b3JlIiwidmFsaWRhdGVkIiwiX3NlbGYiLCJmcmVlemUiLCJjaGlsZHJlbkxlbmd0aCIsImNoaWxkQXJyYXkiLCJmYWN0b3J5Iiwib2xkRWxlbWVudCIsIm5ld0tleSIsIm5ld0VsZW1lbnQiLCJTeW1ib2wiLCJjaGVja1JlYWN0VHlwZVNwZWMiLCJnZXRJdGVyYXRvckZuIiwiZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtIiwib3duZXJIYXNLZXlVc2VXYXJuaW5nIiwiZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyIsInBhcmVudFR5cGUiLCJwYXJlbnROYW1lIiwidmFsaWRhdGVFeHBsaWNpdEtleSIsIm1lbW9pemVyIiwidW5pcXVlS2V5IiwiY3VycmVudENvbXBvbmVudEVycm9ySW5mbyIsImNoaWxkT3duZXIiLCJ2YWxpZGF0ZUNoaWxkS2V5cyIsIml0ZXJhdG9yRm4iLCJlbnRyaWVzIiwiaXRlcmF0b3IiLCJzdGVwIiwibmV4dCIsInZhbGlkYXRlUHJvcFR5cGVzIiwiY29tcG9uZW50Q2xhc3MiLCJ2YWxpZFR5cGUiLCJ2YWxpZGF0ZWRGYWN0b3J5IiwibnVtZXJpY1Byb3BlcnR5UmVnZXgiLCJ3YXJuZWRBYm91dE51bWVyaWMiLCJSZWFjdEZyYWdtZW50Iiwibm9kZVR5cGUiLCJyZXF1ZXN0Q2hhbmdlIiwiY3JlYXRlTGlua1R5cGVDaGVja2VyIiwibGlua1R5cGUiLCJzaGFwZXMiLCJhbnkiLCJ3YXJuTm9vcCIsInB1YmxpY0luc3RhbmNlIiwiY2FsbGVyTmFtZSIsImNvbXBsZXRlU3RhdGUiLCJwcm9wIiwiY2hpbGRDb250ZXh0IiwiUmVhY3RQcm9wVHlwZXNTZWNyZXQiLCJBTk9OWU1PVVMiLCJjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlciIsInN5bWJvbCIsImNyZWF0ZUFueVR5cGVDaGVja2VyIiwiYXJyYXlPZiIsImNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlciIsImNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlciIsImluc3RhbmNlT2YiLCJjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyIiwiY3JlYXRlTm9kZUNoZWNrZXIiLCJvYmplY3RPZiIsImNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIiLCJvbmVPZiIsImNyZWF0ZUVudW1UeXBlQ2hlY2tlciIsImNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIiLCJjcmVhdGVTaGFwZVR5cGVDaGVja2VyIiwiaXMiLCJ4IiwieSIsIlByb3BUeXBlRXJyb3IiLCJtZXNzYWdlIiwic3RhY2siLCJjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlciIsInZhbGlkYXRlIiwibWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUiLCJjaGVja1R5cGUiLCJwcm9wRnVsbE5hbWUiLCJzZWNyZXQiLCJjb25zb2xlIiwiY2FjaGVLZXkiLCJsb2NhdGlvbk5hbWUiLCJjaGFpbmVkQ2hlY2tUeXBlIiwiZXhwZWN0ZWRUeXBlIiwicHJvcFZhbHVlIiwicHJvcFR5cGUiLCJnZXRQcm9wVHlwZSIsInByZWNpc2VUeXBlIiwiZ2V0UHJlY2lzZVR5cGUiLCJ0aGF0UmV0dXJucyIsInR5cGVDaGVja2VyIiwiZXJyb3IiLCJleHBlY3RlZENsYXNzIiwiZXhwZWN0ZWRDbGFzc05hbWUiLCJhY3R1YWxDbGFzc05hbWUiLCJnZXRDbGFzc05hbWUiLCJleHBlY3RlZFZhbHVlcyIsInRoYXRSZXR1cm5zTnVsbCIsInZhbHVlc1N0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJhcnJheU9mVHlwZUNoZWNrZXJzIiwiY2hlY2tlciIsImlzTm9kZSIsInNoYXBlVHlwZXMiLCJldmVyeSIsImVudHJ5IiwiaXNTeW1ib2wiLCJEYXRlIiwiQ29tcG9uZW50RHVtbXkiLCJpc1B1cmVSZWFjdENvbXBvbmVudCIsImNyZWF0ZVN0YXRlU2V0dGVyIiwiZnVuY1JldHVybmluZ1N0YXRlIiwiZCIsImNhY2hlIiwiX19rZXlTZXR0ZXJzIiwic3RhdGVLZXlTZXR0ZXIiLCJNaXhpbiIsImZsYXR0ZW5DaGlsZHJlbiIsIlJlYWN0VHJhbnNpdGlvbkNoaWxkTWFwcGluZyIsImdldENoaWxkTWFwcGluZyIsInNlbGZEZWJ1Z0lEIiwibWVyZ2VDaGlsZE1hcHBpbmdzIiwicHJldiIsImdldFZhbHVlRm9yS2V5IiwibmV4dEtleXNQZW5kaW5nIiwicGVuZGluZ0tleXMiLCJwcmV2S2V5IiwiY2hpbGRNYXBwaW5nIiwibmV4dEtleSIsInBlbmRpbmdOZXh0S2V5IiwiZW5kRXZlbnRzIiwiZGV0ZWN0RXZlbnRzIiwiYW5pbUVuZCIsInRyYW5zRW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZW5kRXZlbnQiLCJwZXJmb3JtQXBwZWFyIiwiY3VycmVudGx5VHJhbnNpdGlvbmluZ0tleXMiLCJfaGFuZGxlRG9uZUFwcGVhcmluZyIsImNvbXBvbmVudERpZEFwcGVhciIsImN1cnJlbnRDaGlsZE1hcHBpbmciLCJwZXJmb3JtTGVhdmUiLCJwZXJmb3JtRW50ZXIiLCJfaGFuZGxlRG9uZUVudGVyaW5nIiwiY29tcG9uZW50RGlkRW50ZXIiLCJfaGFuZGxlRG9uZUxlYXZpbmciLCJjb21wb25lbnREaWRMZWF2ZSIsIm5ld0NoaWxkcmVuIiwia2V5c1RvRW50ZXIiLCJrZXlzVG9MZWF2ZSIsImluaXRpYWxDaGlsZE1hcHBpbmciLCJuZXh0Q2hpbGRNYXBwaW5nIiwicHJldkNoaWxkTWFwcGluZyIsImhhc1ByZXYiLCJoYXNOZXh0IiwiY2hpbGRyZW5Ub1JlbmRlciIsInVwZGF0ZSIsImFkZG9ucyIsIkNTU1RyYW5zaXRpb25Hcm91cCIsIlB1cmVSZW5kZXJNaXhpbiIsIlRyYW5zaXRpb25Hcm91cCIsImNyZWF0ZUZyYWdtZW50IiwiUmVhY3RXaXRoQWRkb25zIiwicHJvY2VzcyIsImVudiIsImxvZ2dlZFR5cGVGYWlsdXJlcyIsInR5cGVTcGVjcyIsInZhbHVlcyIsImRlYnVnSUQiLCJ0eXBlU3BlY05hbWUiLCJleCIsImNvbXBvbmVudFN0YWNrSW5mbyIsImZsYXR0ZW5TaW5nbGVDaGlsZEludG9Db250ZXh0Iiwia2V5VW5pcXVlIiwiSVRFUkFUT1JfU1lNQk9MIiwiRkFVWF9JVEVSQVRPUl9TWU1CT0wiLCJtYXliZUl0ZXJhYmxlIiwicmVhY3RQcm9kSW52YXJpYW50IiwiYXJnQ291bnQiLCJhcmdJZHgiLCJlbmNvZGVVUklDb21wb25lbnQiLCJmcmFtZXNUb1BvcCIsInNoYWxsb3dFcXVhbCIsIlNFUEFSQVRPUiIsIlNVQlNFUEFSQVRPUiIsImRpZFdhcm5BYm91dE1hcHMiLCJnZXRDb21wb25lbnRLZXkiLCJpbmRleCIsInRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsIiwibmFtZVNvRmFyIiwibmV4dE5hbWUiLCJzdWJ0cmVlQ291bnQiLCJuZXh0TmFtZVByZWZpeCIsImlpIiwibWFwc0FzQ2hpbGRyZW5BZGRlbmR1bSIsIm1hcHNBc0NoaWxkcmVuT3duZXJOYW1lIiwiYWRkZW5kdW0iLCJfaXNSZWFjdEVsZW1lbnQiLCJjaGlsZHJlblN0cmluZyIsIlN0cmluZyIsImpvaW4iLCJzaGFsbG93Q29weSIsIkNPTU1BTkRfUFVTSCIsIkNPTU1BTkRfVU5TSElGVCIsIkNPTU1BTkRfU1BMSUNFIiwiQ09NTUFORF9TRVQiLCJDT01NQU5EX01FUkdFIiwiQ09NTUFORF9BUFBMWSIsIkFMTF9DT01NQU5EU19MSVNUIiwiQUxMX0NPTU1BTkRTX1NFVCIsImNvbW1hbmQiLCJpbnZhcmlhbnRBcnJheUNhc2UiLCJzcGVjVmFsdWUiLCJuZXh0VmFsdWUiLCJtZXJnZU9iaiIsInVuc2hpZnQiLCJzcGxpY2UiLCJrIiwibWF0Y2hlc1NlbGVjdG9yX1NMT1ciLCJzZWxlY3RvciIsInJvb3QiLCJwYXJlbnROb2RlIiwiYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsImluZGV4T2YiLCJjbGFzc0xpc3QiLCJoYXNDbGFzcyIsInJlbW92ZSIsImNvbmRpdGlvbkNsYXNzIiwiY29udGFpbnMiLCJtYXRjaGVzU2VsZWN0b3IiLCJtYXRjaGVzSW1wbCIsIm1hdGNoZXMiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJtb3pNYXRjaGVzU2VsZWN0b3IiLCJtc01hdGNoZXNTZWxlY3RvciIsImNhblVzZVdvcmtlcnMiLCJXb3JrZXIiLCJjYW5Vc2VFdmVudExpc3RlbmVycyIsImF0dGFjaEV2ZW50IiwiY2FuVXNlVmlld3BvcnQiLCJzY3JlZW4iLCJpc0luV29ya2VyIiwibWFrZUVtcHR5RnVuY3Rpb24iLCJhcmciLCJ0aGF0UmV0dXJuc0ZhbHNlIiwidGhhdFJldHVybnNUcnVlIiwidGhhdFJldHVybnNUaGlzIiwidmFsaWRhdGVGb3JtYXQiLCJmb3JtYXQiLCJjb25kaXRpb24iLCJhcmdJbmRleCIsIm9iakEiLCJvYmpCIiwia2V5c0EiLCJrZXlzQiIsInByaW50V2FybmluZyIsIl9sZW4yIiwiX2tleTIiLCJwcm9wSXNFbnVtZXJhYmxlIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJ0b09iamVjdCIsInZhbCIsInNob3VsZFVzZU5hdGl2ZSIsImFzc2lnbiIsInRlc3QxIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInRlc3QyIiwiZnJvbUNoYXJDb2RlIiwib3JkZXIyIiwidGVzdDMiLCJzcGxpdCIsImxldHRlciIsInRvIiwic3ltYm9scyIsImdldE93blByb3BlcnR5U3ltYm9scyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFDOzs7QUFHRCxDQUFDLFVBQVNBLENBQVQsRUFBVztBQUFDLE1BQUcsUUFBT0MsT0FBUCx5Q0FBT0EsT0FBUCxPQUFpQixRQUFqQixJQUEyQixPQUFPQyxNQUFQLEtBQWdCLFdBQTlDLEVBQTBEO0FBQUNBLFdBQU9ELE9BQVAsR0FBZUQsR0FBZjtBQUFtQixHQUE5RSxNQUFtRixJQUFHLE9BQU9HLE1BQVAsS0FBZ0IsVUFBaEIsSUFBNEJBLE9BQU9DLEdBQXRDLEVBQTBDO0FBQUNELFdBQU8sRUFBUCxFQUFVSCxDQUFWO0FBQWEsR0FBeEQsTUFBNEQ7QUFBQyxRQUFJSyxDQUFKLENBQU0sSUFBRyxPQUFPQyxNQUFQLEtBQWdCLFdBQW5CLEVBQStCO0FBQUNELFVBQUVDLE1BQUY7QUFBUyxLQUF6QyxNQUE4QyxJQUFHLE9BQU9DLE1BQVAsS0FBZ0IsV0FBbkIsRUFBK0I7QUFBQ0YsVUFBRUUsTUFBRjtBQUFTLEtBQXpDLE1BQThDLElBQUcsT0FBT0MsSUFBUCxLQUFjLFdBQWpCLEVBQTZCO0FBQUNILFVBQUVHLElBQUY7QUFBTyxLQUFyQyxNQUF5QztBQUFDSCxVQUFFLElBQUY7QUFBTyxPQUFFSSxLQUFGLEdBQVVULEdBQVY7QUFBYztBQUFDLENBQS9ULEVBQWlVLFlBQVU7QUFBQyxNQUFJRyxNQUFKLEVBQVdELE1BQVgsRUFBa0JELE9BQWxCLENBQTBCLE9BQVEsU0FBU1MsQ0FBVCxDQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLGFBQVNDLENBQVQsQ0FBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxVQUFHLENBQUNKLEVBQUVHLENBQUYsQ0FBSixFQUFTO0FBQUMsWUFBRyxDQUFDSixFQUFFSSxDQUFGLENBQUosRUFBUztBQUFDLGNBQUlFLElBQUUsT0FBT0MsT0FBUCxJQUFnQixVQUFoQixJQUE0QkEsT0FBbEMsQ0FBMEMsSUFBRyxDQUFDRixDQUFELElBQUlDLENBQVAsRUFBUyxPQUFPQSxFQUFFRixDQUFGLEVBQUksQ0FBQyxDQUFMLENBQVAsQ0FBZSxJQUFHSSxDQUFILEVBQUssT0FBT0EsRUFBRUosQ0FBRixFQUFJLENBQUMsQ0FBTCxDQUFQLENBQWUsSUFBSWYsSUFBRSxJQUFJb0IsS0FBSixDQUFVLHlCQUF1QkwsQ0FBdkIsR0FBeUIsR0FBbkMsQ0FBTixDQUE4QyxNQUFNZixFQUFFcUIsSUFBRixHQUFPLGtCQUFQLEVBQTBCckIsQ0FBaEM7QUFBa0MsYUFBSXNCLElBQUVWLEVBQUVHLENBQUYsSUFBSyxFQUFDZCxTQUFRLEVBQVQsRUFBWCxDQUF3QlUsRUFBRUksQ0FBRixFQUFLLENBQUwsRUFBUVEsSUFBUixDQUFhRCxFQUFFckIsT0FBZixFQUF1QixVQUFTUyxDQUFULEVBQVc7QUFBQyxjQUFJRSxJQUFFRCxFQUFFSSxDQUFGLEVBQUssQ0FBTCxFQUFRTCxDQUFSLENBQU4sQ0FBaUIsT0FBT0ksRUFBRUYsSUFBRUEsQ0FBRixHQUFJRixDQUFOLENBQVA7QUFBZ0IsU0FBcEUsRUFBcUVZLENBQXJFLEVBQXVFQSxFQUFFckIsT0FBekUsRUFBaUZTLENBQWpGLEVBQW1GQyxDQUFuRixFQUFxRkMsQ0FBckYsRUFBdUZDLENBQXZGO0FBQTBGLGNBQU9ELEVBQUVHLENBQUYsRUFBS2QsT0FBWjtBQUFvQixTQUFJa0IsSUFBRSxPQUFPRCxPQUFQLElBQWdCLFVBQWhCLElBQTRCQSxPQUFsQyxDQUEwQyxLQUFJLElBQUlILElBQUUsQ0FBVixFQUFZQSxJQUFFRixFQUFFVyxNQUFoQixFQUF1QlQsR0FBdkI7QUFBMkJELFFBQUVELEVBQUVFLENBQUYsQ0FBRjtBQUEzQixLQUFtQyxPQUFPRCxDQUFQO0FBQVMsR0FBemIsQ0FBMmIsRUFBQyxHQUFFLENBQUMsVUFBU1csT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUM1MEI7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxVQUFJeUIsdUJBQXVCRCxRQUFRLEVBQVIsQ0FBM0I7O0FBRUE7Ozs7Ozs7QUFPQSxlQUFTRSxhQUFULENBQXVCQyxTQUF2QixFQUFrQ0MsU0FBbEMsRUFBNkM7QUFDM0MsWUFBSUMsV0FBVyxFQUFmOztBQUVBQSxpQkFBU0YsVUFBVUcsV0FBVixFQUFULElBQW9DRixVQUFVRSxXQUFWLEVBQXBDO0FBQ0FELGlCQUFTLFdBQVdGLFNBQXBCLElBQWlDLFdBQVdDLFNBQTVDO0FBQ0FDLGlCQUFTLFFBQVFGLFNBQWpCLElBQThCLFFBQVFDLFNBQXRDO0FBQ0FDLGlCQUFTLE9BQU9GLFNBQWhCLElBQTZCLE9BQU9DLFNBQXBDO0FBQ0FDLGlCQUFTLE1BQU1GLFNBQWYsSUFBNEIsTUFBTUMsVUFBVUUsV0FBVixFQUFsQzs7QUFFQSxlQUFPRCxRQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLFVBQUlFLGlCQUFpQjtBQUNuQkMsc0JBQWNOLGNBQWMsV0FBZCxFQUEyQixjQUEzQixDQURLO0FBRW5CTyw0QkFBb0JQLGNBQWMsV0FBZCxFQUEyQixvQkFBM0IsQ0FGRDtBQUduQlEsd0JBQWdCUixjQUFjLFdBQWQsRUFBMkIsZ0JBQTNCLENBSEc7QUFJbkJTLHVCQUFlVCxjQUFjLFlBQWQsRUFBNEIsZUFBNUI7QUFKSSxPQUFyQjs7QUFPQTs7O0FBR0EsVUFBSVUscUJBQXFCLEVBQXpCOztBQUVBOzs7QUFHQSxVQUFJQyxRQUFRLEVBQVo7O0FBRUE7OztBQUdBLFVBQUlaLHFCQUFxQmEsU0FBekIsRUFBb0M7QUFDbENELGdCQUFRRSxTQUFTQyxhQUFULENBQXVCLEtBQXZCLEVBQThCSCxLQUF0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUksRUFBRSxvQkFBb0JoQyxNQUF0QixDQUFKLEVBQW1DO0FBQ2pDLGlCQUFPMEIsZUFBZUMsWUFBZixDQUE0QlMsU0FBbkM7QUFDQSxpQkFBT1YsZUFBZUUsa0JBQWYsQ0FBa0NRLFNBQXpDO0FBQ0EsaUJBQU9WLGVBQWVHLGNBQWYsQ0FBOEJPLFNBQXJDO0FBQ0Q7O0FBRUQ7QUFDQSxZQUFJLEVBQUUscUJBQXFCcEMsTUFBdkIsQ0FBSixFQUFvQztBQUNsQyxpQkFBTzBCLGVBQWVJLGFBQWYsQ0FBNkJPLFVBQXBDO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7O0FBTUEsZUFBU0MsMEJBQVQsQ0FBb0NmLFNBQXBDLEVBQStDO0FBQzdDLFlBQUlRLG1CQUFtQlIsU0FBbkIsQ0FBSixFQUFtQztBQUNqQyxpQkFBT1EsbUJBQW1CUixTQUFuQixDQUFQO0FBQ0QsU0FGRCxNQUVPLElBQUksQ0FBQ0csZUFBZUgsU0FBZixDQUFMLEVBQWdDO0FBQ3JDLGlCQUFPQSxTQUFQO0FBQ0Q7O0FBRUQsWUFBSWdCLFlBQVliLGVBQWVILFNBQWYsQ0FBaEI7O0FBRUEsYUFBSyxJQUFJRCxTQUFULElBQXNCaUIsU0FBdEIsRUFBaUM7QUFDL0IsY0FBSUEsVUFBVUMsY0FBVixDQUF5QmxCLFNBQXpCLEtBQXVDQSxhQUFhVSxLQUF4RCxFQUErRDtBQUM3RCxtQkFBT0QsbUJBQW1CUixTQUFuQixJQUFnQ2dCLFVBQVVqQixTQUFWLENBQXZDO0FBQ0Q7QUFDRjs7QUFFRCxlQUFPLEVBQVA7QUFDRDs7QUFFRDFCLGFBQU9ELE9BQVAsR0FBaUIyQywwQkFBakI7QUFDQyxLQXJHMHlCLEVBcUd6eUIsRUFBQyxNQUFLLEVBQU4sRUFyR3l5QixDQUFILEVBcUczeEIsR0FBRSxDQUFDLFVBQVNuQixPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ2hEOzs7Ozs7Ozs7OztBQVdBOztBQUVBOzs7Ozs7O0FBT0EsZUFBUzhDLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCO0FBQ25CLFlBQUlDLGNBQWMsT0FBbEI7QUFDQSxZQUFJQyxnQkFBZ0I7QUFDbEIsZUFBSyxJQURhO0FBRWxCLGVBQUs7QUFGYSxTQUFwQjtBQUlBLFlBQUlDLGdCQUFnQixDQUFDLEtBQUtILEdBQU4sRUFBV0ksT0FBWCxDQUFtQkgsV0FBbkIsRUFBZ0MsVUFBVUksS0FBVixFQUFpQjtBQUNuRSxpQkFBT0gsY0FBY0csS0FBZCxDQUFQO0FBQ0QsU0FGbUIsQ0FBcEI7O0FBSUEsZUFBTyxNQUFNRixhQUFiO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BLGVBQVNHLFFBQVQsQ0FBa0JOLEdBQWxCLEVBQXVCO0FBQ3JCLFlBQUlPLGdCQUFnQixVQUFwQjtBQUNBLFlBQUlDLGtCQUFrQjtBQUNwQixnQkFBTSxHQURjO0FBRXBCLGdCQUFNO0FBRmMsU0FBdEI7QUFJQSxZQUFJQyxlQUFlVCxJQUFJLENBQUosTUFBVyxHQUFYLElBQWtCQSxJQUFJLENBQUosTUFBVyxHQUE3QixHQUFtQ0EsSUFBSVUsU0FBSixDQUFjLENBQWQsQ0FBbkMsR0FBc0RWLElBQUlVLFNBQUosQ0FBYyxDQUFkLENBQXpFOztBQUVBLGVBQU8sQ0FBQyxLQUFLRCxZQUFOLEVBQW9CTCxPQUFwQixDQUE0QkcsYUFBNUIsRUFBMkMsVUFBVUYsS0FBVixFQUFpQjtBQUNqRSxpQkFBT0csZ0JBQWdCSCxLQUFoQixDQUFQO0FBQ0QsU0FGTSxDQUFQO0FBR0Q7O0FBRUQsVUFBSU0saUJBQWlCO0FBQ25CWixnQkFBUUEsTUFEVztBQUVuQk8sa0JBQVVBO0FBRlMsT0FBckI7O0FBS0FwRCxhQUFPRCxPQUFQLEdBQWlCMEQsY0FBakI7QUFDQyxLQTNEYyxFQTJEYixFQTNEYSxDQXJHeXhCLEVBZ0tseUIsR0FBRSxDQUFDLFVBQVNsQyxPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ3pDOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsVUFBSTJELFlBQVluQyxRQUFRLEVBQVIsQ0FBaEI7QUFDQSxVQUFJb0Msb0JBQW9CcEMsUUFBUSxFQUFSLENBQXhCOztBQUVBOzs7O0FBSUEsVUFBSXFDLG1CQUFtQjtBQUNyQjs7Ozs7Ozs7QUFRQUMsbUJBQVcsbUJBQVVmLEdBQVYsRUFBZTtBQUN4QixpQkFBTyxJQUFJWSxTQUFKLENBQWMsS0FBS0ksS0FBTCxDQUFXaEIsR0FBWCxDQUFkLEVBQStCYSxrQkFBa0JJLG9CQUFsQixDQUF1QyxJQUF2QyxFQUE2Q2pCLEdBQTdDLENBQS9CLENBQVA7QUFDRDtBQVhvQixPQUF2Qjs7QUFjQTlDLGFBQU9ELE9BQVAsR0FBaUI2RCxnQkFBakI7QUFDQyxLQW5DTyxFQW1DTixFQUFDLE1BQUssRUFBTixFQUFTLE1BQUssRUFBZCxFQW5DTSxDQWhLZ3lCLEVBbU1ueEIsR0FBRSxDQUFDLFVBQVNyQyxPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ3hEOzs7Ozs7Ozs7OztBQVdBOztBQUVBLFVBQUlpRSxpQkFBaUJ6QyxRQUFRLEVBQVIsQ0FBckI7O0FBRUEsVUFBSTBDLFlBQVkxQyxRQUFRLEVBQVIsQ0FBaEI7O0FBRUE7Ozs7Ozs7QUFPQSxVQUFJMkMsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBVUMsY0FBVixFQUEwQjtBQUNoRCxZQUFJQyxRQUFRLElBQVo7QUFDQSxZQUFJQSxNQUFNQyxZQUFOLENBQW1CL0MsTUFBdkIsRUFBK0I7QUFDN0IsY0FBSWdELFdBQVdGLE1BQU1DLFlBQU4sQ0FBbUJFLEdBQW5CLEVBQWY7QUFDQUgsZ0JBQU0vQyxJQUFOLENBQVdpRCxRQUFYLEVBQXFCSCxjQUFyQjtBQUNBLGlCQUFPRyxRQUFQO0FBQ0QsU0FKRCxNQUlPO0FBQ0wsaUJBQU8sSUFBSUYsS0FBSixDQUFVRCxjQUFWLENBQVA7QUFDRDtBQUNGLE9BVEQ7O0FBV0EsVUFBSUssb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBVUMsRUFBVixFQUFjQyxFQUFkLEVBQWtCO0FBQ3hDLFlBQUlOLFFBQVEsSUFBWjtBQUNBLFlBQUlBLE1BQU1DLFlBQU4sQ0FBbUIvQyxNQUF2QixFQUErQjtBQUM3QixjQUFJZ0QsV0FBV0YsTUFBTUMsWUFBTixDQUFtQkUsR0FBbkIsRUFBZjtBQUNBSCxnQkFBTS9DLElBQU4sQ0FBV2lELFFBQVgsRUFBcUJHLEVBQXJCLEVBQXlCQyxFQUF6QjtBQUNBLGlCQUFPSixRQUFQO0FBQ0QsU0FKRCxNQUlPO0FBQ0wsaUJBQU8sSUFBSUYsS0FBSixDQUFVSyxFQUFWLEVBQWNDLEVBQWQsQ0FBUDtBQUNEO0FBQ0YsT0FURDs7QUFXQSxVQUFJQyxzQkFBc0IsU0FBdEJBLG1CQUFzQixDQUFVRixFQUFWLEVBQWNDLEVBQWQsRUFBa0JFLEVBQWxCLEVBQXNCO0FBQzlDLFlBQUlSLFFBQVEsSUFBWjtBQUNBLFlBQUlBLE1BQU1DLFlBQU4sQ0FBbUIvQyxNQUF2QixFQUErQjtBQUM3QixjQUFJZ0QsV0FBV0YsTUFBTUMsWUFBTixDQUFtQkUsR0FBbkIsRUFBZjtBQUNBSCxnQkFBTS9DLElBQU4sQ0FBV2lELFFBQVgsRUFBcUJHLEVBQXJCLEVBQXlCQyxFQUF6QixFQUE2QkUsRUFBN0I7QUFDQSxpQkFBT04sUUFBUDtBQUNELFNBSkQsTUFJTztBQUNMLGlCQUFPLElBQUlGLEtBQUosQ0FBVUssRUFBVixFQUFjQyxFQUFkLEVBQWtCRSxFQUFsQixDQUFQO0FBQ0Q7QUFDRixPQVREOztBQVdBLFVBQUlDLHFCQUFxQixTQUFyQkEsa0JBQXFCLENBQVVKLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkUsRUFBbEIsRUFBc0JFLEVBQXRCLEVBQTBCO0FBQ2pELFlBQUlWLFFBQVEsSUFBWjtBQUNBLFlBQUlBLE1BQU1DLFlBQU4sQ0FBbUIvQyxNQUF2QixFQUErQjtBQUM3QixjQUFJZ0QsV0FBV0YsTUFBTUMsWUFBTixDQUFtQkUsR0FBbkIsRUFBZjtBQUNBSCxnQkFBTS9DLElBQU4sQ0FBV2lELFFBQVgsRUFBcUJHLEVBQXJCLEVBQXlCQyxFQUF6QixFQUE2QkUsRUFBN0IsRUFBaUNFLEVBQWpDO0FBQ0EsaUJBQU9SLFFBQVA7QUFDRCxTQUpELE1BSU87QUFDTCxpQkFBTyxJQUFJRixLQUFKLENBQVVLLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkUsRUFBbEIsRUFBc0JFLEVBQXRCLENBQVA7QUFDRDtBQUNGLE9BVEQ7O0FBV0EsVUFBSUMsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBVVQsUUFBVixFQUFvQjtBQUN6QyxZQUFJRixRQUFRLElBQVo7QUFDQSxVQUFFRSxvQkFBb0JGLEtBQXRCLElBQStCLGtCQUFrQixZQUFsQixHQUFpQ0gsVUFBVSxLQUFWLEVBQWlCLGdFQUFqQixDQUFqQyxHQUFzSEQsZUFBZSxJQUFmLENBQXJKLEdBQTRLLEtBQUssQ0FBakw7QUFDQU0saUJBQVNVLFVBQVQ7QUFDQSxZQUFJWixNQUFNQyxZQUFOLENBQW1CL0MsTUFBbkIsR0FBNEI4QyxNQUFNYSxRQUF0QyxFQUFnRDtBQUM5Q2IsZ0JBQU1DLFlBQU4sQ0FBbUJhLElBQW5CLENBQXdCWixRQUF4QjtBQUNEO0FBQ0YsT0FQRDs7QUFTQSxVQUFJYSxvQkFBb0IsRUFBeEI7QUFDQSxVQUFJQyxpQkFBaUJsQixpQkFBckI7O0FBRUE7Ozs7Ozs7OztBQVNBLFVBQUltQixlQUFlLFNBQWZBLFlBQWUsQ0FBVUMsZUFBVixFQUEyQkMsTUFBM0IsRUFBbUM7QUFDcEQ7QUFDQTtBQUNBLFlBQUlDLFdBQVdGLGVBQWY7QUFDQUUsaUJBQVNuQixZQUFULEdBQXdCLEVBQXhCO0FBQ0FtQixpQkFBU0MsU0FBVCxHQUFxQkYsVUFBVUgsY0FBL0I7QUFDQSxZQUFJLENBQUNJLFNBQVNQLFFBQWQsRUFBd0I7QUFDdEJPLG1CQUFTUCxRQUFULEdBQW9CRSxpQkFBcEI7QUFDRDtBQUNESyxpQkFBU0UsT0FBVCxHQUFtQlgsZ0JBQW5CO0FBQ0EsZUFBT1MsUUFBUDtBQUNELE9BWEQ7O0FBYUEsVUFBSUcsY0FBYztBQUNoQk4sc0JBQWNBLFlBREU7QUFFaEJuQiwyQkFBbUJBLGlCQUZIO0FBR2hCTSwyQkFBbUJBLGlCQUhIO0FBSWhCRyw2QkFBcUJBLG1CQUpMO0FBS2hCRSw0QkFBb0JBO0FBTEosT0FBbEI7O0FBUUE3RSxhQUFPRCxPQUFQLEdBQWlCNEYsV0FBakI7QUFDQyxLQWhIc0IsRUFnSHJCLEVBQUMsTUFBSyxFQUFOLEVBQVMsTUFBSyxFQUFkLEVBaEhxQixDQW5NaXhCLEVBbVRueEIsR0FBRSxDQUFDLFVBQVNwRSxPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ3hEOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsVUFBSTZGLFVBQVVyRSxRQUFRLEVBQVIsQ0FBZDs7QUFFQSxVQUFJc0UsZ0JBQWdCdEUsUUFBUSxDQUFSLENBQXBCO0FBQ0EsVUFBSXVFLGlCQUFpQnZFLFFBQVEsRUFBUixDQUFyQjtBQUNBLFVBQUl3RSxxQkFBcUJ4RSxRQUFRLEVBQVIsQ0FBekI7QUFDQSxVQUFJeUUsYUFBYXpFLFFBQVEsRUFBUixDQUFqQjtBQUNBLFVBQUkwRSxvQkFBb0IxRSxRQUFRLEVBQVIsQ0FBeEI7QUFDQSxVQUFJMkUsZUFBZTNFLFFBQVEsRUFBUixDQUFuQjtBQUNBLFVBQUk0RSxpQkFBaUI1RSxRQUFRLEVBQVIsQ0FBckI7QUFDQSxVQUFJNkUsZUFBZTdFLFFBQVEsRUFBUixDQUFuQjs7QUFFQSxVQUFJOEUsWUFBWTlFLFFBQVEsRUFBUixDQUFoQjtBQUNBLFVBQUkrRSxVQUFVL0UsUUFBUSxFQUFSLENBQWQ7O0FBRUEsVUFBSWdCLGdCQUFnQjJELGFBQWEzRCxhQUFqQztBQUNBLFVBQUlnRSxnQkFBZ0JMLGFBQWFLLGFBQWpDO0FBQ0EsVUFBSUMsZUFBZU4sYUFBYU0sWUFBaEM7O0FBRUEsVUFBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbEMsWUFBSUMsd0JBQXdCbEYsUUFBUSxFQUFSLENBQTVCO0FBQ0FnQix3QkFBZ0JrRSxzQkFBc0JsRSxhQUF0QztBQUNBZ0Usd0JBQWdCRSxzQkFBc0JGLGFBQXRDO0FBQ0FDLHVCQUFlQyxzQkFBc0JELFlBQXJDO0FBQ0Q7O0FBRUQsVUFBSUUsV0FBV2QsT0FBZjs7QUFFQSxVQUFJLGtCQUFrQixZQUF0QixFQUFvQztBQUNsQyxZQUFJZSxTQUFTLEtBQWI7QUFDQUQsbUJBQVcsb0JBQVk7QUFDckIsNEJBQWtCLFlBQWxCLEdBQWlDSixRQUFRSyxNQUFSLEVBQWdCLDhEQUE4RCxpRUFBOUQsR0FBa0ksa0VBQWxJLEdBQXVNLDhEQUF2TixDQUFqQyxHQUEwVCxLQUFLLENBQS9UO0FBQ0FBLG1CQUFTLElBQVQ7QUFDQSxpQkFBT2YsUUFBUWdCLEtBQVIsQ0FBYyxJQUFkLEVBQW9CQyxTQUFwQixDQUFQO0FBQ0QsU0FKRDtBQUtEOztBQUVELFVBQUl0RyxRQUFROztBQUVWOztBQUVBdUcsa0JBQVU7QUFDUkMsZUFBS2xCLGNBQWNrQixHQURYO0FBRVJDLG1CQUFTbkIsY0FBY21CLE9BRmY7QUFHUkMsaUJBQU9wQixjQUFjb0IsS0FIYjtBQUlSQyxtQkFBU3JCLGNBQWNxQixPQUpmO0FBS1JDLGdCQUFNZDtBQUxFLFNBSkE7O0FBWVZlLG1CQUFXdEIsY0FaRDtBQWFWdUIsdUJBQWV0QixrQkFiTDs7QUFlVnhELHVCQUFlQSxhQWZMO0FBZ0JWaUUsc0JBQWNBLFlBaEJKO0FBaUJWYyx3QkFBZ0JwQixhQUFhb0IsY0FqQm5COztBQW1CVjs7QUFFQUMsbUJBQVdwQixjQXJCRDtBQXNCVnFCLHFCQUFheEIsV0FBV3dCLFdBdEJkO0FBdUJWakIsdUJBQWVBLGFBdkJMO0FBd0JWa0IscUJBQWEscUJBQVVDLEtBQVYsRUFBaUI7QUFDNUI7QUFDQSxpQkFBT0EsS0FBUDtBQUNELFNBM0JTOztBQTZCVjtBQUNBO0FBQ0FDLGFBQUsxQixpQkEvQks7O0FBaUNWMkIsaUJBQVN4QixZQWpDQzs7QUFtQ1Y7QUFDQU0sa0JBQVVBO0FBcENBLE9BQVo7O0FBdUNBMUcsYUFBT0QsT0FBUCxHQUFpQlEsS0FBakI7QUFDQyxLQXpGc0IsRUF5RnJCLEVBQUMsTUFBSyxFQUFOLEVBQVMsTUFBSyxFQUFkLEVBQWlCLE1BQUssRUFBdEIsRUFBeUIsTUFBSyxFQUE5QixFQUFpQyxNQUFLLEVBQXRDLEVBQXlDLE1BQUssRUFBOUMsRUFBaUQsTUFBSyxFQUF0RCxFQUF5RCxNQUFLLEVBQTlELEVBQWlFLE1BQUssRUFBdEUsRUFBeUUsTUFBSyxFQUE5RSxFQUFpRixNQUFLLEVBQXRGLEVBQXlGLEtBQUksQ0FBN0YsRUF6RnFCLENBblRpeEIsRUE0WXJzQixHQUFFLENBQUMsVUFBU2dCLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDdEk7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxVQUFJOEgsUUFBSjs7QUFFQSxlQUFTQyxXQUFULEdBQXVCO0FBQ3JCLFlBQUksQ0FBQ0QsUUFBTCxFQUFlO0FBQ2I7QUFDQSxjQUFJRSwwQkFBMEJ4RyxRQUFRLEVBQVIsQ0FBOUI7QUFDQTtBQUNBc0cscUJBQVdFLHdCQUF3QkMsMkRBQW5DO0FBQ0Q7QUFDRCxlQUFPSCxRQUFQO0FBQ0Q7O0FBRUQ5SCxjQUFRK0gsV0FBUixHQUFzQkEsV0FBdEI7O0FBRUEsVUFBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbEMvSCxnQkFBUWtJLFlBQVIsR0FBdUIsWUFBWTtBQUNqQyxpQkFBT0gsY0FBY0ksa0RBQWQsQ0FBaUVDLFNBQXhFO0FBQ0QsU0FGRDs7QUFJQXBJLGdCQUFRcUksaUJBQVIsR0FBNEIsWUFBWTtBQUN0QyxpQkFBT04sY0FBY0ksa0RBQWQsQ0FBaUVHLGNBQXhFO0FBQ0QsU0FGRDtBQUdEO0FBQ0EsS0FwQ29HLEVBb0NuRyxFQUFDLE1BQUssRUFBTixFQXBDbUcsQ0E1WW1zQixFQWdiM3hCLEdBQUUsQ0FBQyxVQUFTOUcsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUNoRDs7Ozs7Ozs7OztBQVVBOztBQUVBLFVBQUk2RixVQUFVckUsUUFBUSxFQUFSLENBQWQ7O0FBRUEsZUFBUytHLGVBQVQsQ0FBeUJoRSxRQUF6QixFQUFtQ2lFLFdBQW5DLEVBQWdEO0FBQUUsWUFBSSxFQUFFakUsb0JBQW9CaUUsV0FBdEIsQ0FBSixFQUF3QztBQUFFLGdCQUFNLElBQUlDLFNBQUosQ0FBYyxtQ0FBZCxDQUFOO0FBQTJEO0FBQUU7O0FBRXpKLGVBQVNDLDBCQUFULENBQW9DbkksSUFBcEMsRUFBMENlLElBQTFDLEVBQWdEO0FBQUUsWUFBSSxDQUFDZixJQUFMLEVBQVc7QUFBRSxnQkFBTSxJQUFJb0ksY0FBSixDQUFtQiwyREFBbkIsQ0FBTjtBQUF3RixTQUFDLE9BQU9ySCxTQUFTLFFBQU9BLElBQVAseUNBQU9BLElBQVAsT0FBZ0IsUUFBaEIsSUFBNEIsT0FBT0EsSUFBUCxLQUFnQixVQUFyRCxJQUFtRUEsSUFBbkUsR0FBMEVmLElBQWpGO0FBQXdGOztBQUVoUCxlQUFTcUksU0FBVCxDQUFtQkMsUUFBbkIsRUFBNkJDLFVBQTdCLEVBQXlDO0FBQUUsWUFBSSxPQUFPQSxVQUFQLEtBQXNCLFVBQXRCLElBQW9DQSxlQUFlLElBQXZELEVBQTZEO0FBQUUsZ0JBQU0sSUFBSUwsU0FBSixDQUFjLHFFQUFvRUssVUFBcEUseUNBQW9FQSxVQUFwRSxFQUFkLENBQU47QUFBc0csU0FBQ0QsU0FBU0UsU0FBVCxHQUFxQkMsT0FBT0MsTUFBUCxDQUFjSCxjQUFjQSxXQUFXQyxTQUF2QyxFQUFrRCxFQUFFRyxhQUFhLEVBQUVDLE9BQU9OLFFBQVQsRUFBbUJPLFlBQVksS0FBL0IsRUFBc0NDLFVBQVUsSUFBaEQsRUFBc0RDLGNBQWMsSUFBcEUsRUFBZixFQUFsRCxDQUFyQixDQUFxSyxJQUFJUixVQUFKLEVBQWdCRSxPQUFPTyxjQUFQLEdBQXdCUCxPQUFPTyxjQUFQLENBQXNCVixRQUF0QixFQUFnQ0MsVUFBaEMsQ0FBeEIsR0FBc0VELFNBQVNXLFNBQVQsR0FBcUJWLFVBQTNGO0FBQXdHOztBQUU5ZSxVQUFJdEksUUFBUWdCLFFBQVEsQ0FBUixDQUFaOztBQUVBLFVBQUlpSSx1QkFBdUJqSSxRQUFRLEVBQVIsQ0FBM0I7QUFDQSxVQUFJa0ksK0JBQStCbEksUUFBUSxDQUFSLENBQW5DOztBQUVBLGVBQVNtSSxvQ0FBVCxDQUE4Q0MsY0FBOUMsRUFBOEQ7QUFDNUQsWUFBSUMsa0JBQWtCLGVBQWVELGNBQWYsR0FBZ0MsU0FBdEQ7QUFDQSxZQUFJRSxrQkFBa0IsZUFBZUYsY0FBckM7O0FBRUEsZUFBTyxVQUFVRyxLQUFWLEVBQWlCO0FBQ3RCO0FBQ0EsY0FBSUEsTUFBTUQsZUFBTixDQUFKLEVBQTRCO0FBQzFCO0FBQ0EsZ0JBQUlDLE1BQU1GLGVBQU4sS0FBMEIsSUFBOUIsRUFBb0M7QUFDbEMscUJBQU8sSUFBSTFJLEtBQUosQ0FBVTBJLGtCQUFrQixnREFBbEIsR0FBcUUsa0VBQXJFLEdBQTBJLGlDQUExSSxHQUE4SyxrRUFBOUssR0FBbVAsY0FBN1AsQ0FBUDs7QUFFQTtBQUNELGFBSkQsTUFJTyxJQUFJLE9BQU9FLE1BQU1GLGVBQU4sQ0FBUCxLQUFrQyxRQUF0QyxFQUFnRDtBQUNyRCxxQkFBTyxJQUFJMUksS0FBSixDQUFVMEksa0JBQWtCLHFDQUE1QixDQUFQO0FBQ0Q7QUFDRjtBQUNGLFNBWkQ7QUFhRDs7QUFFRDs7Ozs7O0FBTUEsVUFBSUcsMEJBQTBCLFVBQVVDLGdCQUFWLEVBQTRCO0FBQ3hEckIsa0JBQVVvQix1QkFBVixFQUFtQ0MsZ0JBQW5DOztBQUVBLGlCQUFTRCx1QkFBVCxHQUFtQztBQUNqQyxjQUFJRSxLQUFKLEVBQVdDLEtBQVgsRUFBa0JDLElBQWxCOztBQUVBN0IsMEJBQWdCLElBQWhCLEVBQXNCeUIsdUJBQXRCOztBQUVBLGVBQUssSUFBSUssT0FBT3ZELFVBQVV2RixNQUFyQixFQUE2QitJLE9BQU9DLE1BQU1GLElBQU4sQ0FBcEMsRUFBaURHLE9BQU8sQ0FBN0QsRUFBZ0VBLE9BQU9ILElBQXZFLEVBQTZFRyxNQUE3RSxFQUFxRjtBQUNuRkYsaUJBQUtFLElBQUwsSUFBYTFELFVBQVUwRCxJQUFWLENBQWI7QUFDRDs7QUFFRCxpQkFBT0osUUFBUUYsU0FBU0MsUUFBUXpCLDJCQUEyQixJQUEzQixFQUFpQ3VCLGlCQUFpQjNJLElBQWpCLENBQXNCdUYsS0FBdEIsQ0FBNEJvRCxnQkFBNUIsRUFBOEMsQ0FBQyxJQUFELEVBQU9RLE1BQVAsQ0FBY0gsSUFBZCxDQUE5QyxDQUFqQyxDQUFSLEVBQThHSCxLQUF2SCxHQUErSEEsTUFBTU8sVUFBTixHQUFtQixVQUFVQyxLQUFWLEVBQWlCO0FBQ2hMO0FBQ0E7QUFDQTtBQUNBLG1CQUFPbkssTUFBTWdDLGFBQU4sQ0FBb0JrSCw0QkFBcEIsRUFBa0Q7QUFDdkRrQixvQkFBTVQsTUFBTUosS0FBTixDQUFZYyxjQURxQztBQUV2REMsc0JBQVFYLE1BQU1KLEtBQU4sQ0FBWWdCLGdCQUZtQztBQUd2REMscUJBQU9iLE1BQU1KLEtBQU4sQ0FBWWtCLGVBSG9DO0FBSXZEQyxxQkFBT2YsTUFBTUosS0FBTixDQUFZb0IsZUFKb0M7QUFLdkRDLDZCQUFlakIsTUFBTUosS0FBTixDQUFZc0IsdUJBTDRCO0FBTXZEQyw0QkFBY25CLE1BQU1KLEtBQU4sQ0FBWXdCLHNCQU42QjtBQU92REMsNEJBQWNyQixNQUFNSixLQUFOLENBQVkwQjtBQVA2QixhQUFsRCxFQVFKZCxLQVJJLENBQVA7QUFTRCxXQWJjLEVBYVpULEtBYkksR0FhSXhCLDJCQUEyQnlCLEtBQTNCLEVBQWtDQyxJQUFsQyxDQWJYO0FBY0Q7O0FBRURKLGdDQUF3QmpCLFNBQXhCLENBQWtDMkMsTUFBbEMsR0FBMkMsU0FBU0EsTUFBVCxHQUFrQjtBQUMzRCxpQkFBT2xMLE1BQU1nQyxhQUFOLENBQW9CaUgsb0JBQXBCLEVBQTBDNUQsUUFBUSxFQUFSLEVBQVksS0FBS2tFLEtBQWpCLEVBQXdCLEVBQUU0QixjQUFjLEtBQUtqQixVQUFyQixFQUF4QixDQUExQyxDQUFQO0FBQ0QsU0FGRDs7QUFJQSxlQUFPVix1QkFBUDtBQUNELE9BakM2QixDQWlDNUJ4SixNQUFNNkcsU0FqQ3NCLENBQTlCOztBQW1DQTJDLDhCQUF3QjRCLFdBQXhCLEdBQXNDLHlCQUF0QztBQUNBNUIsOEJBQXdCNkIsU0FBeEIsR0FBb0M7QUFDbENoQix3QkFBZ0JuQiw2QkFBNkJtQyxTQUE3QixDQUF1Q2pCLElBRHJCOztBQUdsQ0csMEJBQWtCdkssTUFBTWdILFNBQU4sQ0FBZ0JzRSxJQUhBO0FBSWxDYix5QkFBaUJ6SyxNQUFNZ0gsU0FBTixDQUFnQnNFLElBSkM7QUFLbENYLHlCQUFpQjNLLE1BQU1nSCxTQUFOLENBQWdCc0UsSUFMQztBQU1sQ1QsaUNBQXlCMUIscUNBQXFDLFFBQXJDLENBTlM7QUFPbEM0QixnQ0FBd0I1QixxQ0FBcUMsT0FBckMsQ0FQVTtBQVFsQzhCLGdDQUF3QjlCLHFDQUFxQyxPQUFyQztBQVJVLE9BQXBDO0FBVUFLLDhCQUF3QitCLFlBQXhCLEdBQXVDO0FBQ3JDaEIsMEJBQWtCLEtBRG1CO0FBRXJDRSx5QkFBaUIsSUFGb0I7QUFHckNFLHlCQUFpQjtBQUhvQixPQUF2Qzs7QUFPQWxMLGFBQU9ELE9BQVAsR0FBaUJnSyx1QkFBakI7QUFDQyxLQXpHYyxFQXlHYixFQUFDLE1BQUssRUFBTixFQUFTLE1BQUssRUFBZCxFQUFpQixLQUFJLENBQXJCLEVBQXVCLEtBQUksQ0FBM0IsRUF6R2EsQ0FoYnl4QixFQXloQnZ3QixHQUFFLENBQUMsVUFBU3hJLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDcEU7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxVQUFJUSxRQUFRZ0IsUUFBUSxDQUFSLENBQVo7QUFDQSxVQUFJd0ssNkJBQTZCeEssUUFBUSxDQUFSLENBQWpDOztBQUVBLFVBQUl5SyxVQUFVekssUUFBUSxFQUFSLENBQWQ7QUFDQSxVQUFJMEssd0JBQXdCMUssUUFBUSxFQUFSLENBQTVCOztBQUVBLFVBQUk4RSxZQUFZOUUsUUFBUSxFQUFSLENBQWhCOztBQUVBLFVBQUkySyxPQUFPLEVBQVg7O0FBRUEsVUFBSXpDLCtCQUErQmxKLE1BQU1pSCxXQUFOLENBQWtCO0FBQ25EbUUscUJBQWEsOEJBRHNDOztBQUduREMsbUJBQVc7QUFDVGpCLGdCQUFNcEssTUFBTWdILFNBQU4sQ0FBZ0I0RSxTQUFoQixDQUEwQixDQUFDNUwsTUFBTWdILFNBQU4sQ0FBZ0I2RSxNQUFqQixFQUF5QjdMLE1BQU1nSCxTQUFOLENBQWdCOEUsS0FBaEIsQ0FBc0I7QUFDN0V0QixtQkFBT3hLLE1BQU1nSCxTQUFOLENBQWdCNkUsTUFEc0Q7QUFFN0VuQixtQkFBTzFLLE1BQU1nSCxTQUFOLENBQWdCNkUsTUFGc0Q7QUFHN0VFLG9CQUFRL0wsTUFBTWdILFNBQU4sQ0FBZ0I2RTtBQUhxRCxXQUF0QixDQUF6QixFQUk1QjdMLE1BQU1nSCxTQUFOLENBQWdCOEUsS0FBaEIsQ0FBc0I7QUFDeEJ0QixtQkFBT3hLLE1BQU1nSCxTQUFOLENBQWdCNkUsTUFEQztBQUV4QkcseUJBQWFoTSxNQUFNZ0gsU0FBTixDQUFnQjZFLE1BRkw7QUFHeEJuQixtQkFBTzFLLE1BQU1nSCxTQUFOLENBQWdCNkUsTUFIQztBQUl4QkkseUJBQWFqTSxNQUFNZ0gsU0FBTixDQUFnQjZFLE1BSkw7QUFLeEJ2QixvQkFBUXRLLE1BQU1nSCxTQUFOLENBQWdCNkUsTUFMQTtBQU14QkssMEJBQWNsTSxNQUFNZ0gsU0FBTixDQUFnQjZFO0FBTk4sV0FBdEIsQ0FKNEIsQ0FBMUIsRUFXRE0sVUFaSTs7QUFjVDtBQUNBO0FBQ0E7QUFDQTdCLGtCQUFRdEssTUFBTWdILFNBQU4sQ0FBZ0JzRSxJQWpCZjtBQWtCVGQsaUJBQU94SyxNQUFNZ0gsU0FBTixDQUFnQnNFLElBbEJkO0FBbUJUWixpQkFBTzFLLE1BQU1nSCxTQUFOLENBQWdCc0UsSUFuQmQ7QUFvQlRWLHlCQUFlNUssTUFBTWdILFNBQU4sQ0FBZ0JvRixNQXBCdEI7QUFxQlR0Qix3QkFBYzlLLE1BQU1nSCxTQUFOLENBQWdCb0YsTUFyQnJCO0FBc0JUcEIsd0JBQWNoTCxNQUFNZ0gsU0FBTixDQUFnQm9GO0FBdEJyQixTQUh3Qzs7QUE0Qm5EbEssb0JBQVksb0JBQVVtSyxhQUFWLEVBQXlCQyxjQUF6QixFQUF5Q0Msa0JBQXpDLEVBQTZEO0FBQ3ZFLGNBQUlDLE9BQU9oQiwyQkFBMkJqRSxXQUEzQixHQUF5Q2tGLFdBQXpDLENBQXFELElBQXJELENBQVg7O0FBRUEsY0FBSSxDQUFDRCxJQUFMLEVBQVc7QUFDVCxnQkFBSUYsY0FBSixFQUFvQjtBQUNsQkE7QUFDRDtBQUNEO0FBQ0Q7O0FBRUQsY0FBSUksWUFBWSxLQUFLbkQsS0FBTCxDQUFXYSxJQUFYLENBQWdCaUMsYUFBaEIsS0FBa0MsS0FBSzlDLEtBQUwsQ0FBV2EsSUFBWCxHQUFrQixHQUFsQixHQUF3QmlDLGFBQTFFO0FBQ0EsY0FBSU0sa0JBQWtCLEtBQUtwRCxLQUFMLENBQVdhLElBQVgsQ0FBZ0JpQyxnQkFBZ0IsUUFBaEMsS0FBNkNLLFlBQVksU0FBL0U7QUFDQSxjQUFJRSxVQUFVLElBQWQ7O0FBRUEsY0FBSUMsY0FBYyxTQUFkQSxXQUFjLENBQVU1TSxDQUFWLEVBQWE7QUFDN0IsZ0JBQUlBLEtBQUtBLEVBQUU2TSxNQUFGLEtBQWFOLElBQXRCLEVBQTRCO0FBQzFCO0FBQ0Q7O0FBRURPLHlCQUFhSCxPQUFiOztBQUVBbkIsb0JBQVF1QixXQUFSLENBQW9CUixJQUFwQixFQUEwQkUsU0FBMUI7QUFDQWpCLG9CQUFRdUIsV0FBUixDQUFvQlIsSUFBcEIsRUFBMEJHLGVBQTFCOztBQUVBakIsa0NBQXNCdUIsc0JBQXRCLENBQTZDVCxJQUE3QyxFQUFtREssV0FBbkQ7O0FBRUE7QUFDQTtBQUNBLGdCQUFJUCxjQUFKLEVBQW9CO0FBQ2xCQTtBQUNEO0FBQ0YsV0FqQkQ7O0FBbUJBYixrQkFBUXlCLFFBQVIsQ0FBaUJWLElBQWpCLEVBQXVCRSxTQUF2Qjs7QUFFQTtBQUNBLGVBQUtTLGlCQUFMLENBQXVCUixlQUF2QixFQUF3Q0gsSUFBeEM7O0FBRUE7QUFDQSxjQUFJRCxrQkFBSixFQUF3QjtBQUN0QjtBQUNBSyxzQkFBVVEsV0FBV1AsV0FBWCxFQUF3Qk4sa0JBQXhCLENBQVY7QUFDQSxpQkFBS2Msa0JBQUwsQ0FBd0IxSSxJQUF4QixDQUE2QmlJLE9BQTdCO0FBQ0QsV0FKRCxNQUlPO0FBQ0w7QUFDQWxCLGtDQUFzQjRCLG1CQUF0QixDQUEwQ2QsSUFBMUMsRUFBZ0RLLFdBQWhEO0FBQ0Q7QUFDRixTQTNFa0Q7O0FBNkVuRE0sMkJBQW1CLDJCQUFVVCxTQUFWLEVBQXFCRixJQUFyQixFQUEyQjtBQUM1QyxlQUFLZSxxQkFBTCxDQUEyQjVJLElBQTNCLENBQWdDO0FBQzlCK0gsdUJBQVdBLFNBRG1CO0FBRTlCRixrQkFBTUE7QUFGd0IsV0FBaEM7O0FBS0EsY0FBSSxDQUFDLEtBQUtJLE9BQVYsRUFBbUI7QUFDakIsaUJBQUtBLE9BQUwsR0FBZVEsV0FBVyxLQUFLSSwwQkFBaEIsRUFBNEM3QixJQUE1QyxDQUFmO0FBQ0Q7QUFDRixTQXRGa0Q7O0FBd0ZuRDZCLG9DQUE0QixzQ0FBWTtBQUN0QyxjQUFJLEtBQUtDLFNBQUwsRUFBSixFQUFzQjtBQUNwQixpQkFBS0YscUJBQUwsQ0FBMkI5RyxPQUEzQixDQUFtQyxVQUFVaUgsR0FBVixFQUFlO0FBQ2hEakMsc0JBQVF5QixRQUFSLENBQWlCUSxJQUFJbEIsSUFBckIsRUFBMkJrQixJQUFJaEIsU0FBL0I7QUFDRCxhQUZEO0FBR0Q7QUFDRCxlQUFLYSxxQkFBTCxDQUEyQnhNLE1BQTNCLEdBQW9DLENBQXBDO0FBQ0EsZUFBSzZMLE9BQUwsR0FBZSxJQUFmO0FBQ0QsU0FoR2tEOztBQWtHbkRlLDRCQUFvQiw4QkFBWTtBQUM5QixlQUFLSixxQkFBTCxHQUE2QixFQUE3QjtBQUNBLGVBQUtGLGtCQUFMLEdBQTBCLEVBQTFCO0FBQ0QsU0FyR2tEOztBQXVHbkRPLDhCQUFzQixnQ0FBWTtBQUNoQyxjQUFJLEtBQUtoQixPQUFULEVBQWtCO0FBQ2hCRyx5QkFBYSxLQUFLSCxPQUFsQjtBQUNEO0FBQ0QsZUFBS1Msa0JBQUwsQ0FBd0I1RyxPQUF4QixDQUFnQyxVQUFVbUcsT0FBVixFQUFtQjtBQUNqREcseUJBQWFILE9BQWI7QUFDRCxXQUZEOztBQUlBLGVBQUtXLHFCQUFMLENBQTJCeE0sTUFBM0IsR0FBb0MsQ0FBcEM7QUFDRCxTQWhIa0Q7O0FBa0huRDhNLDZCQUFxQiw2QkFBVUMsSUFBVixFQUFnQjtBQUNuQyxjQUFJLEtBQUt2RSxLQUFMLENBQVdlLE1BQWYsRUFBdUI7QUFDckIsaUJBQUtwSSxVQUFMLENBQWdCLFFBQWhCLEVBQTBCNEwsSUFBMUIsRUFBZ0MsS0FBS3ZFLEtBQUwsQ0FBV3FCLGFBQTNDO0FBQ0QsV0FGRCxNQUVPO0FBQ0xrRDtBQUNEO0FBQ0YsU0F4SGtEOztBQTBIbkRDLDRCQUFvQiw0QkFBVUQsSUFBVixFQUFnQjtBQUNsQyxjQUFJLEtBQUt2RSxLQUFMLENBQVdpQixLQUFmLEVBQXNCO0FBQ3BCLGlCQUFLdEksVUFBTCxDQUFnQixPQUFoQixFQUF5QjRMLElBQXpCLEVBQStCLEtBQUt2RSxLQUFMLENBQVd1QixZQUExQztBQUNELFdBRkQsTUFFTztBQUNMZ0Q7QUFDRDtBQUNGLFNBaElrRDs7QUFrSW5ERSw0QkFBb0IsNEJBQVVGLElBQVYsRUFBZ0I7QUFDbEMsY0FBSSxLQUFLdkUsS0FBTCxDQUFXbUIsS0FBZixFQUFzQjtBQUNwQixpQkFBS3hJLFVBQUwsQ0FBZ0IsT0FBaEIsRUFBeUI0TCxJQUF6QixFQUErQixLQUFLdkUsS0FBTCxDQUFXeUIsWUFBMUM7QUFDRCxXQUZELE1BRU87QUFDTDhDO0FBQ0Q7QUFDRixTQXhJa0Q7O0FBMEluRDVDLGdCQUFRLGtCQUFZO0FBQ2xCLGlCQUFPcEYsVUFBVSxLQUFLeUQsS0FBTCxDQUFXMEUsUUFBckIsQ0FBUDtBQUNEO0FBNUlrRCxPQUFsQixDQUFuQzs7QUErSUF4TyxhQUFPRCxPQUFQLEdBQWlCMEosNEJBQWpCO0FBQ0MsS0F2S2tDLEVBdUtqQyxFQUFDLE1BQUssRUFBTixFQUFTLE1BQUssRUFBZCxFQUFpQixNQUFLLEVBQXRCLEVBQXlCLEtBQUksQ0FBN0IsRUFBK0IsS0FBSSxDQUFuQyxFQXZLaUMsQ0F6aEJxd0IsRUFnc0IvdkIsR0FBRSxDQUFDLFVBQVNsSSxPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQzVFOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsVUFBSTRGLGNBQWNwRSxRQUFRLENBQVIsQ0FBbEI7QUFDQSxVQUFJMkUsZUFBZTNFLFFBQVEsRUFBUixDQUFuQjs7QUFFQSxVQUFJa04sZ0JBQWdCbE4sUUFBUSxFQUFSLENBQXBCO0FBQ0EsVUFBSW1OLHNCQUFzQm5OLFFBQVEsRUFBUixDQUExQjs7QUFFQSxVQUFJaUQsb0JBQW9CbUIsWUFBWW5CLGlCQUFwQztBQUNBLFVBQUlLLHFCQUFxQmMsWUFBWWQsa0JBQXJDOztBQUVBLFVBQUk4Siw2QkFBNkIsTUFBakM7QUFDQSxlQUFTQyxxQkFBVCxDQUErQkMsSUFBL0IsRUFBcUM7QUFDbkMsZUFBTyxDQUFDLEtBQUtBLElBQU4sRUFBWTNMLE9BQVosQ0FBb0J5TCwwQkFBcEIsRUFBZ0QsS0FBaEQsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7OztBQVFBLGVBQVNHLGtCQUFULENBQTRCQyxlQUE1QixFQUE2Q0MsY0FBN0MsRUFBNkQ7QUFDM0QsYUFBS0MsSUFBTCxHQUFZRixlQUFaO0FBQ0EsYUFBS0csT0FBTCxHQUFlRixjQUFmO0FBQ0EsYUFBSy9ILEtBQUwsR0FBYSxDQUFiO0FBQ0Q7QUFDRDZILHlCQUFtQmhHLFNBQW5CLENBQTZCOUQsVUFBN0IsR0FBMEMsWUFBWTtBQUNwRCxhQUFLaUssSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLGFBQUtqSSxLQUFMLEdBQWEsQ0FBYjtBQUNELE9BSkQ7QUFLQXRCLGtCQUFZTixZQUFaLENBQXlCeUosa0JBQXpCLEVBQTZDdEssaUJBQTdDOztBQUVBLGVBQVMySyxrQkFBVCxDQUE0QkMsV0FBNUIsRUFBeUMxRSxLQUF6QyxFQUFnREMsSUFBaEQsRUFBc0Q7QUFDcEQsWUFBSXNFLE9BQU9HLFlBQVlILElBQXZCO0FBQUEsWUFDSUMsVUFBVUUsWUFBWUYsT0FEMUI7O0FBR0FELGFBQUs1TixJQUFMLENBQVU2TixPQUFWLEVBQW1CeEUsS0FBbkIsRUFBMEIwRSxZQUFZbkksS0FBWixFQUExQjtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7QUFZQSxlQUFTb0ksZUFBVCxDQUF5QmIsUUFBekIsRUFBbUNjLFdBQW5DLEVBQWdETixjQUFoRCxFQUFnRTtBQUM5RCxZQUFJUixZQUFZLElBQWhCLEVBQXNCO0FBQ3BCLGlCQUFPQSxRQUFQO0FBQ0Q7QUFDRCxZQUFJZSxrQkFBa0JULG1CQUFtQnJKLFNBQW5CLENBQTZCNkosV0FBN0IsRUFBMENOLGNBQTFDLENBQXRCO0FBQ0FOLDRCQUFvQkYsUUFBcEIsRUFBOEJXLGtCQUE5QixFQUFrREksZUFBbEQ7QUFDQVQsMkJBQW1CcEosT0FBbkIsQ0FBMkI2SixlQUEzQjtBQUNEOztBQUVEOzs7Ozs7Ozs7QUFTQSxlQUFTQyxjQUFULENBQXdCQyxTQUF4QixFQUFtQ0MsU0FBbkMsRUFBOENDLFdBQTlDLEVBQTJEQyxVQUEzRCxFQUF1RTtBQUNyRSxhQUFLQyxNQUFMLEdBQWNKLFNBQWQ7QUFDQSxhQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLGFBQUtULElBQUwsR0FBWVUsV0FBWjtBQUNBLGFBQUtULE9BQUwsR0FBZVUsVUFBZjtBQUNBLGFBQUszSSxLQUFMLEdBQWEsQ0FBYjtBQUNEO0FBQ0R1SSxxQkFBZTFHLFNBQWYsQ0FBeUI5RCxVQUF6QixHQUFzQyxZQUFZO0FBQ2hELGFBQUs2SyxNQUFMLEdBQWMsSUFBZDtBQUNBLGFBQUtILFNBQUwsR0FBaUIsSUFBakI7QUFDQSxhQUFLVCxJQUFMLEdBQVksSUFBWjtBQUNBLGFBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0EsYUFBS2pJLEtBQUwsR0FBYSxDQUFiO0FBQ0QsT0FORDtBQU9BdEIsa0JBQVlOLFlBQVosQ0FBeUJtSyxjQUF6QixFQUF5QzNLLGtCQUF6Qzs7QUFFQSxlQUFTaUwseUJBQVQsQ0FBbUNWLFdBQW5DLEVBQWdEMUUsS0FBaEQsRUFBdURxRixRQUF2RCxFQUFpRTtBQUMvRCxZQUFJRixTQUFTVCxZQUFZUyxNQUF6QjtBQUFBLFlBQ0lILFlBQVlOLFlBQVlNLFNBRDVCO0FBQUEsWUFFSVQsT0FBT0csWUFBWUgsSUFGdkI7QUFBQSxZQUdJQyxVQUFVRSxZQUFZRixPQUgxQjs7QUFNQSxZQUFJYyxjQUFjZixLQUFLNU4sSUFBTCxDQUFVNk4sT0FBVixFQUFtQnhFLEtBQW5CLEVBQTBCMEUsWUFBWW5JLEtBQVosRUFBMUIsQ0FBbEI7QUFDQSxZQUFJcUQsTUFBTTJGLE9BQU4sQ0FBY0QsV0FBZCxDQUFKLEVBQWdDO0FBQzlCRSx1Q0FBNkJGLFdBQTdCLEVBQTBDSCxNQUExQyxFQUFrREUsUUFBbEQsRUFBNER0QixjQUFjMEIsbUJBQTFFO0FBQ0QsU0FGRCxNQUVPLElBQUlILGVBQWUsSUFBbkIsRUFBeUI7QUFDOUIsY0FBSTlKLGFBQWFvQixjQUFiLENBQTRCMEksV0FBNUIsQ0FBSixFQUE4QztBQUM1Q0EsMEJBQWM5SixhQUFha0ssa0JBQWIsQ0FBZ0NKLFdBQWhDO0FBQ2Q7QUFDQTtBQUNBTix5QkFBYU0sWUFBWWxOLEdBQVosS0FBb0IsQ0FBQzRILEtBQUQsSUFBVUEsTUFBTTVILEdBQU4sS0FBY2tOLFlBQVlsTixHQUF4RCxJQUErRDhMLHNCQUFzQm9CLFlBQVlsTixHQUFsQyxJQUF5QyxHQUF4RyxHQUE4RyxFQUEzSCxJQUFpSWlOLFFBSG5ILENBQWQ7QUFJRDtBQUNERixpQkFBTzNLLElBQVAsQ0FBWThLLFdBQVo7QUFDRDtBQUNGOztBQUVELGVBQVNFLDRCQUFULENBQXNDMUIsUUFBdEMsRUFBZ0Q2QixLQUFoRCxFQUF1REMsTUFBdkQsRUFBK0RyQixJQUEvRCxFQUFxRUMsT0FBckUsRUFBOEU7QUFDNUUsWUFBSXFCLGdCQUFnQixFQUFwQjtBQUNBLFlBQUlELFVBQVUsSUFBZCxFQUFvQjtBQUNsQkMsMEJBQWdCM0Isc0JBQXNCMEIsTUFBdEIsSUFBZ0MsR0FBaEQ7QUFDRDtBQUNELFlBQUlmLGtCQUFrQkMsZUFBZS9KLFNBQWYsQ0FBeUI0SyxLQUF6QixFQUFnQ0UsYUFBaEMsRUFBK0N0QixJQUEvQyxFQUFxREMsT0FBckQsQ0FBdEI7QUFDQVIsNEJBQW9CRixRQUFwQixFQUE4QnNCLHlCQUE5QixFQUF5RFAsZUFBekQ7QUFDQUMsdUJBQWU5SixPQUFmLENBQXVCNkosZUFBdkI7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7OztBQWFBLGVBQVNpQixXQUFULENBQXFCaEMsUUFBckIsRUFBK0JTLElBQS9CLEVBQXFDQyxPQUFyQyxFQUE4QztBQUM1QyxZQUFJVixZQUFZLElBQWhCLEVBQXNCO0FBQ3BCLGlCQUFPQSxRQUFQO0FBQ0Q7QUFDRCxZQUFJcUIsU0FBUyxFQUFiO0FBQ0FLLHFDQUE2QjFCLFFBQTdCLEVBQXVDcUIsTUFBdkMsRUFBK0MsSUFBL0MsRUFBcURaLElBQXJELEVBQTJEQyxPQUEzRDtBQUNBLGVBQU9XLE1BQVA7QUFDRDs7QUFFRCxlQUFTWSx1QkFBVCxDQUFpQ2xCLGVBQWpDLEVBQWtEN0UsS0FBbEQsRUFBeURDLElBQXpELEVBQStEO0FBQzdELGVBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7QUFTQSxlQUFTK0YsYUFBVCxDQUF1QmxDLFFBQXZCLEVBQWlDVSxPQUFqQyxFQUEwQztBQUN4QyxlQUFPUixvQkFBb0JGLFFBQXBCLEVBQThCaUMsdUJBQTlCLEVBQXVELElBQXZELENBQVA7QUFDRDs7QUFFRDs7Ozs7O0FBTUEsZUFBU3ZKLE9BQVQsQ0FBaUJzSCxRQUFqQixFQUEyQjtBQUN6QixZQUFJcUIsU0FBUyxFQUFiO0FBQ0FLLHFDQUE2QjFCLFFBQTdCLEVBQXVDcUIsTUFBdkMsRUFBK0MsSUFBL0MsRUFBcURwQixjQUFjMEIsbUJBQW5FO0FBQ0EsZUFBT04sTUFBUDtBQUNEOztBQUVELFVBQUloSyxnQkFBZ0I7QUFDbEJtQixpQkFBU3FJLGVBRFM7QUFFbEJ0SSxhQUFLeUosV0FGYTtBQUdsQk4sc0NBQThCQSw0QkFIWjtBQUlsQmpKLGVBQU95SixhQUpXO0FBS2xCeEosaUJBQVNBO0FBTFMsT0FBcEI7O0FBUUFsSCxhQUFPRCxPQUFQLEdBQWlCOEYsYUFBakI7QUFDQyxLQS9MMEMsRUErTHpDLEVBQUMsTUFBSyxFQUFOLEVBQVMsS0FBSSxDQUFiLEVBQWUsTUFBSyxFQUFwQixFQUF1QixNQUFLLEVBQTVCLEVBL0x5QyxDQWhzQjZ2QixFQSszQnJ3QixJQUFHLENBQUMsVUFBU3RFLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDdkU7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxVQUFJaUUsaUJBQWlCekMsUUFBUSxFQUFSLENBQXJCO0FBQUEsVUFDSXFFLFVBQVVyRSxRQUFRLEVBQVIsQ0FEZDs7QUFHQSxVQUFJdUUsaUJBQWlCdkUsUUFBUSxFQUFSLENBQXJCO0FBQ0EsVUFBSTJFLGVBQWUzRSxRQUFRLEVBQVIsQ0FBbkI7QUFDQSxVQUFJb1AsNkJBQTZCcFAsUUFBUSxFQUFSLENBQWpDO0FBQ0EsVUFBSXFQLHVCQUF1QnJQLFFBQVEsRUFBUixDQUEzQjs7QUFFQSxVQUFJc1AsY0FBY3RQLFFBQVEsRUFBUixDQUFsQjtBQUNBLFVBQUkwQyxZQUFZMUMsUUFBUSxFQUFSLENBQWhCO0FBQ0EsVUFBSStFLFVBQVUvRSxRQUFRLEVBQVIsQ0FBZDs7QUFFQSxVQUFJdVAsYUFBYSxRQUFqQjs7QUFFQTtBQUNBO0FBQ0EsZUFBU0MsUUFBVCxDQUFrQkMsRUFBbEIsRUFBc0I7QUFDcEIsZUFBT0EsRUFBUDtBQUNEOztBQUVEOzs7O0FBS0EsVUFBSUMsaUJBQWlCLEVBQXJCOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLFVBQUlDLHNCQUFzQjs7QUFFeEI7Ozs7OztBQU1BQyxnQkFBUSxhQVJnQjs7QUFVeEI7Ozs7Ozs7QUFPQUMsaUJBQVMsYUFqQmU7O0FBbUJ4Qjs7Ozs7O0FBTUF4RixtQkFBVyxhQXpCYTs7QUEyQnhCOzs7Ozs7QUFNQXlGLHNCQUFjLGFBakNVOztBQW1DeEI7Ozs7OztBQU1BQywyQkFBbUIsYUF6Q0s7O0FBMkN4Qjs7QUFFQTs7Ozs7Ozs7OztBQVVBQyx5QkFBaUIsb0JBdkRPOztBQXlEeEI7Ozs7Ozs7Ozs7Ozs7O0FBY0FDLHlCQUFpQixvQkF2RU87O0FBeUV4Qjs7OztBQUlBQyx5QkFBaUIsb0JBN0VPOztBQStFeEI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkFoRyxnQkFBUSxhQS9GZ0I7O0FBaUd4Qjs7QUFFQTs7Ozs7OztBQU9BeUMsNEJBQW9CLGFBMUdJOztBQTRHeEI7Ozs7Ozs7Ozs7QUFVQXdELDJCQUFtQixhQXRISzs7QUF3SHhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBQyxtQ0FBMkIsYUEzSUg7O0FBNkl4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkFDLCtCQUF1QixhQWpLQzs7QUFtS3hCOzs7Ozs7Ozs7Ozs7Ozs7QUFlQUMsNkJBQXFCLGFBbExHOztBQW9MeEI7Ozs7Ozs7Ozs7OztBQVlBQyw0QkFBb0IsYUFoTUk7O0FBa014Qjs7Ozs7Ozs7Ozs7QUFXQTNELDhCQUFzQixhQTdNRTs7QUErTXhCOztBQUVBOzs7Ozs7Ozs7O0FBVUE0RCx5QkFBaUI7O0FBM05PLE9BQTFCOztBQStOQTs7Ozs7Ozs7O0FBU0EsVUFBSUMscUJBQXFCO0FBQ3ZCckcscUJBQWEscUJBQVVwRCxXQUFWLEVBQXVCb0QsWUFBdkIsRUFBb0M7QUFDL0NwRCxzQkFBWW9ELFdBQVosR0FBMEJBLFlBQTFCO0FBQ0QsU0FIc0I7QUFJdkJ3RixnQkFBUSxnQkFBVTVJLFdBQVYsRUFBdUI0SSxPQUF2QixFQUErQjtBQUNyQyxjQUFJQSxPQUFKLEVBQVk7QUFDVixpQkFBSyxJQUFJbFEsSUFBSSxDQUFiLEVBQWdCQSxJQUFJa1EsUUFBTzdQLE1BQTNCLEVBQW1DTCxHQUFuQyxFQUF3QztBQUN0Q2dSLG1DQUFxQjFKLFdBQXJCLEVBQWtDNEksUUFBT2xRLENBQVAsQ0FBbEM7QUFDRDtBQUNGO0FBQ0YsU0FWc0I7QUFXdkJxUSwyQkFBbUIsMkJBQVUvSSxXQUFWLEVBQXVCK0ksa0JBQXZCLEVBQTBDO0FBQzNELGNBQUksa0JBQWtCLFlBQXRCLEVBQW9DO0FBQ2xDWSw0QkFBZ0IzSixXQUFoQixFQUE2QitJLGtCQUE3QixFQUFnRCxjQUFoRDtBQUNEO0FBQ0QvSSxzQkFBWStJLGlCQUFaLEdBQWdDMUwsUUFBUSxFQUFSLEVBQVkyQyxZQUFZK0ksaUJBQXhCLEVBQTJDQSxrQkFBM0MsQ0FBaEM7QUFDRCxTQWhCc0I7QUFpQnZCRCxzQkFBYyxzQkFBVTlJLFdBQVYsRUFBdUI4SSxhQUF2QixFQUFxQztBQUNqRCxjQUFJLGtCQUFrQixZQUF0QixFQUFvQztBQUNsQ2EsNEJBQWdCM0osV0FBaEIsRUFBNkI4SSxhQUE3QixFQUEyQyxTQUEzQztBQUNEO0FBQ0Q5SSxzQkFBWThJLFlBQVosR0FBMkJ6TCxRQUFRLEVBQVIsRUFBWTJDLFlBQVk4SSxZQUF4QixFQUFzQ0EsYUFBdEMsQ0FBM0I7QUFDRCxTQXRCc0I7QUF1QnZCOzs7O0FBSUFFLHlCQUFpQix5QkFBVWhKLFdBQVYsRUFBdUJnSixnQkFBdkIsRUFBd0M7QUFDdkQsY0FBSWhKLFlBQVlnSixlQUFoQixFQUFpQztBQUMvQmhKLHdCQUFZZ0osZUFBWixHQUE4QlksMkJBQTJCNUosWUFBWWdKLGVBQXZDLEVBQXdEQSxnQkFBeEQsQ0FBOUI7QUFDRCxXQUZELE1BRU87QUFDTGhKLHdCQUFZZ0osZUFBWixHQUE4QkEsZ0JBQTlCO0FBQ0Q7QUFDRixTQWpDc0I7QUFrQ3ZCM0YsbUJBQVcsbUJBQVVyRCxXQUFWLEVBQXVCcUQsVUFBdkIsRUFBa0M7QUFDM0MsY0FBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbENzRyw0QkFBZ0IzSixXQUFoQixFQUE2QnFELFVBQTdCLEVBQXdDLE1BQXhDO0FBQ0Q7QUFDRHJELHNCQUFZcUQsU0FBWixHQUF3QmhHLFFBQVEsRUFBUixFQUFZMkMsWUFBWXFELFNBQXhCLEVBQW1DQSxVQUFuQyxDQUF4QjtBQUNELFNBdkNzQjtBQXdDdkJ3RixpQkFBUyxpQkFBVTdJLFdBQVYsRUFBdUI2SSxRQUF2QixFQUFnQztBQUN2Q2dCLHFDQUEyQjdKLFdBQTNCLEVBQXdDNkksUUFBeEM7QUFDRCxTQTFDc0I7QUEyQ3ZCaUIsa0JBQVUsb0JBQVksQ0FBRSxDQTNDRCxFQUF6Qjs7QUE2Q0EsZUFBU0gsZUFBVCxDQUF5QjNKLFdBQXpCLEVBQXNDK0osT0FBdEMsRUFBK0NDLFFBQS9DLEVBQXlEO0FBQ3ZELGFBQUssSUFBSUMsUUFBVCxJQUFxQkYsT0FBckIsRUFBOEI7QUFDNUIsY0FBSUEsUUFBUTFQLGNBQVIsQ0FBdUI0UCxRQUF2QixDQUFKLEVBQXNDO0FBQ3BDO0FBQ0E7QUFDQSw4QkFBa0IsWUFBbEIsR0FBaUNsTSxRQUFRLE9BQU9nTSxRQUFRRSxRQUFSLENBQVAsS0FBNkIsVUFBckMsRUFBaUQsc0VBQXNFLGtCQUF2SCxFQUEySWpLLFlBQVlvRCxXQUFaLElBQTJCLFlBQXRLLEVBQW9MZ0YsMkJBQTJCNEIsUUFBM0IsQ0FBcEwsRUFBME5DLFFBQTFOLENBQWpDLEdBQXVRLEtBQUssQ0FBNVE7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsZUFBU0Msc0JBQVQsQ0FBZ0NDLGdCQUFoQyxFQUFrRC9ILElBQWxELEVBQXdEO0FBQ3RELFlBQUlnSSxhQUFhekIsb0JBQW9CdE8sY0FBcEIsQ0FBbUMrSCxJQUFuQyxJQUEyQ3VHLG9CQUFvQnZHLElBQXBCLENBQTNDLEdBQXVFLElBQXhGOztBQUVBO0FBQ0EsWUFBSWlJLGdCQUFnQmhRLGNBQWhCLENBQStCK0gsSUFBL0IsQ0FBSixFQUEwQztBQUN4QyxZQUFFZ0ksZUFBZSxlQUFqQixJQUFvQyxrQkFBa0IsWUFBbEIsR0FBaUMxTyxVQUFVLEtBQVYsRUFBaUIsMEpBQWpCLEVBQTZLMEcsSUFBN0ssQ0FBakMsR0FBc04zRyxlQUFlLElBQWYsRUFBcUIyRyxJQUFyQixDQUExUCxHQUF1UixLQUFLLENBQTVSO0FBQ0Q7O0FBRUQ7QUFDQSxZQUFJK0gsZ0JBQUosRUFBc0I7QUFDcEIsWUFBRUMsZUFBZSxhQUFmLElBQWdDQSxlQUFlLG9CQUFqRCxJQUF5RSxrQkFBa0IsWUFBbEIsR0FBaUMxTyxVQUFVLEtBQVYsRUFBaUIsK0hBQWpCLEVBQWtKMEcsSUFBbEosQ0FBakMsR0FBMkwzRyxlQUFlLElBQWYsRUFBcUIyRyxJQUFyQixDQUFwUSxHQUFpUyxLQUFLLENBQXRTO0FBQ0Q7QUFDRjs7QUFFRDs7OztBQUlBLGVBQVNzSCxvQkFBVCxDQUE4QjFKLFdBQTlCLEVBQTJDc0ssSUFBM0MsRUFBaUQ7QUFDL0MsWUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVCxjQUFJLGtCQUFrQixZQUF0QixFQUFvQztBQUNsQyxnQkFBSUMsb0JBQW9CRCxJQUFwQix5Q0FBb0JBLElBQXBCLENBQUo7QUFDQSxnQkFBSUUsZUFBZUQsZUFBZSxRQUFmLElBQTJCRCxTQUFTLElBQXZEOztBQUVBLDhCQUFrQixZQUFsQixHQUFpQ3ZNLFFBQVF5TSxZQUFSLEVBQXNCLG1FQUFtRSxnRUFBbkUsR0FBc0ksaURBQXRJLEdBQTBMLDZCQUFoTixFQUErT3hLLFlBQVlvRCxXQUFaLElBQTJCLFlBQTFRLEVBQXdSa0gsU0FBUyxJQUFULEdBQWdCLElBQWhCLEdBQXVCQyxVQUEvUyxDQUFqQyxHQUE4VixLQUFLLENBQW5XO0FBQ0Q7O0FBRUQ7QUFDRDs7QUFFRCxVQUFFLE9BQU9ELElBQVAsS0FBZ0IsVUFBbEIsSUFBZ0Msa0JBQWtCLFlBQWxCLEdBQWlDNU8sVUFBVSxLQUFWLEVBQWlCLHFIQUFqQixDQUFqQyxHQUEyS0QsZUFBZSxJQUFmLENBQTNNLEdBQWtPLEtBQUssQ0FBdk87QUFDQSxTQUFDLENBQUNrQyxhQUFhb0IsY0FBYixDQUE0QnVMLElBQTVCLENBQUYsR0FBc0Msa0JBQWtCLFlBQWxCLEdBQWlDNU8sVUFBVSxLQUFWLEVBQWlCLG1HQUFqQixDQUFqQyxHQUF5SkQsZUFBZSxJQUFmLENBQS9MLEdBQXNOLEtBQUssQ0FBM047O0FBRUEsWUFBSWdQLFFBQVF6SyxZQUFZTyxTQUF4QjtBQUNBLFlBQUltSyxnQkFBZ0JELE1BQU1FLG9CQUExQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJTCxLQUFLalEsY0FBTCxDQUFvQmtPLFVBQXBCLENBQUosRUFBcUM7QUFDbkNrQiw2QkFBbUJiLE1BQW5CLENBQTBCNUksV0FBMUIsRUFBdUNzSyxLQUFLMUIsTUFBNUM7QUFDRDs7QUFFRCxhQUFLLElBQUl4RyxJQUFULElBQWlCa0ksSUFBakIsRUFBdUI7QUFDckIsY0FBSSxDQUFDQSxLQUFLalEsY0FBTCxDQUFvQitILElBQXBCLENBQUwsRUFBZ0M7QUFDOUI7QUFDRDs7QUFFRCxjQUFJQSxTQUFTbUcsVUFBYixFQUF5QjtBQUN2QjtBQUNBO0FBQ0Q7O0FBRUQsY0FBSXFDLFdBQVdOLEtBQUtsSSxJQUFMLENBQWY7QUFDQSxjQUFJK0gsbUJBQW1CTSxNQUFNcFEsY0FBTixDQUFxQitILElBQXJCLENBQXZCO0FBQ0E4SCxpQ0FBdUJDLGdCQUF2QixFQUF5Qy9ILElBQXpDOztBQUVBLGNBQUlxSCxtQkFBbUJwUCxjQUFuQixDQUFrQytILElBQWxDLENBQUosRUFBNkM7QUFDM0NxSCwrQkFBbUJySCxJQUFuQixFQUF5QnBDLFdBQXpCLEVBQXNDNEssUUFBdEM7QUFDRCxXQUZELE1BRU87QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFJQyxxQkFBcUJsQyxvQkFBb0J0TyxjQUFwQixDQUFtQytILElBQW5DLENBQXpCO0FBQ0EsZ0JBQUkwSSxhQUFhLE9BQU9GLFFBQVAsS0FBb0IsVUFBckM7QUFDQSxnQkFBSUcsaUJBQWlCRCxjQUFjLENBQUNELGtCQUFmLElBQXFDLENBQUNWLGdCQUF0QyxJQUEwREcsS0FBS1IsUUFBTCxLQUFrQixLQUFqRzs7QUFFQSxnQkFBSWlCLGNBQUosRUFBb0I7QUFDbEJMLDRCQUFjL04sSUFBZCxDQUFtQnlGLElBQW5CLEVBQXlCd0ksUUFBekI7QUFDQUgsb0JBQU1ySSxJQUFOLElBQWN3SSxRQUFkO0FBQ0QsYUFIRCxNQUdPO0FBQ0wsa0JBQUlULGdCQUFKLEVBQXNCO0FBQ3BCLG9CQUFJQyxhQUFhekIsb0JBQW9CdkcsSUFBcEIsQ0FBakI7O0FBRUE7QUFDQSxrQkFBRXlJLHVCQUF1QlQsZUFBZSxvQkFBZixJQUF1Q0EsZUFBZSxhQUE3RSxDQUFGLElBQWlHLGtCQUFrQixZQUFsQixHQUFpQzFPLFVBQVUsS0FBVixFQUFpQixrRkFBakIsRUFBcUcwTyxVQUFyRyxFQUFpSGhJLElBQWpILENBQWpDLEdBQTBKM0csZUFBZSxJQUFmLEVBQXFCMk8sVUFBckIsRUFBaUNoSSxJQUFqQyxDQUEzUCxHQUFvUyxLQUFLLENBQXpTOztBQUVBO0FBQ0E7QUFDQSxvQkFBSWdJLGVBQWUsb0JBQW5CLEVBQXlDO0FBQ3ZDSyx3QkFBTXJJLElBQU4sSUFBY3dILDJCQUEyQmEsTUFBTXJJLElBQU4sQ0FBM0IsRUFBd0N3SSxRQUF4QyxDQUFkO0FBQ0QsaUJBRkQsTUFFTyxJQUFJUixlQUFlLGFBQW5CLEVBQWtDO0FBQ3ZDSyx3QkFBTXJJLElBQU4sSUFBYzRJLHNCQUFzQlAsTUFBTXJJLElBQU4sQ0FBdEIsRUFBbUN3SSxRQUFuQyxDQUFkO0FBQ0Q7QUFDRixlQWJELE1BYU87QUFDTEgsc0JBQU1ySSxJQUFOLElBQWN3SSxRQUFkO0FBQ0Esb0JBQUksa0JBQWtCLFlBQXRCLEVBQW9DO0FBQ2xDO0FBQ0E7QUFDQSxzQkFBSSxPQUFPQSxRQUFQLEtBQW9CLFVBQXBCLElBQWtDTixLQUFLbEgsV0FBM0MsRUFBd0Q7QUFDdERxSCwwQkFBTXJJLElBQU4sRUFBWWdCLFdBQVosR0FBMEJrSCxLQUFLbEgsV0FBTCxHQUFtQixHQUFuQixHQUF5QmhCLElBQW5EO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Y7O0FBRUQsZUFBU3lILDBCQUFULENBQW9DN0osV0FBcEMsRUFBaUQ2SSxPQUFqRCxFQUEwRDtBQUN4RCxZQUFJLENBQUNBLE9BQUwsRUFBYztBQUNaO0FBQ0Q7QUFDRCxhQUFLLElBQUl6RyxJQUFULElBQWlCeUcsT0FBakIsRUFBMEI7QUFDeEIsY0FBSStCLFdBQVcvQixRQUFRekcsSUFBUixDQUFmO0FBQ0EsY0FBSSxDQUFDeUcsUUFBUXhPLGNBQVIsQ0FBdUIrSCxJQUF2QixDQUFMLEVBQW1DO0FBQ2pDO0FBQ0Q7O0FBRUQsY0FBSTZJLGFBQWE3SSxRQUFRcUgsa0JBQXpCO0FBQ0EsV0FBQyxDQUFDd0IsVUFBRixHQUFlLGtCQUFrQixZQUFsQixHQUFpQ3ZQLFVBQVUsS0FBVixFQUFpQix5TUFBakIsRUFBNE4wRyxJQUE1TixDQUFqQyxHQUFxUTNHLGVBQWUsSUFBZixFQUFxQjJHLElBQXJCLENBQXBSLEdBQWlULEtBQUssQ0FBdFQ7O0FBRUEsY0FBSThJLGNBQWM5SSxRQUFRcEMsV0FBMUI7QUFDQSxXQUFDLENBQUNrTCxXQUFGLEdBQWdCLGtCQUFrQixZQUFsQixHQUFpQ3hQLFVBQVUsS0FBVixFQUFpQixzSEFBakIsRUFBeUkwRyxJQUF6SSxDQUFqQyxHQUFrTDNHLGVBQWUsSUFBZixFQUFxQjJHLElBQXJCLENBQWxNLEdBQStOLEtBQUssQ0FBcE87QUFDQXBDLHNCQUFZb0MsSUFBWixJQUFvQndJLFFBQXBCO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7OztBQU9BLGVBQVNPLDRCQUFULENBQXNDQyxHQUF0QyxFQUEyQ0MsR0FBM0MsRUFBZ0Q7QUFDOUMsVUFBRUQsT0FBT0MsR0FBUCxJQUFjLFFBQU9ELEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUE3QixJQUF5QyxRQUFPQyxHQUFQLHlDQUFPQSxHQUFQLE9BQWUsUUFBMUQsSUFBc0Usa0JBQWtCLFlBQWxCLEdBQWlDM1AsVUFBVSxLQUFWLEVBQWlCLDJEQUFqQixDQUFqQyxHQUFpSEQsZUFBZSxJQUFmLENBQXZMLEdBQThNLEtBQUssQ0FBbk47O0FBRUEsYUFBSyxJQUFJbEIsR0FBVCxJQUFnQjhRLEdBQWhCLEVBQXFCO0FBQ25CLGNBQUlBLElBQUloUixjQUFKLENBQW1CRSxHQUFuQixDQUFKLEVBQTZCO0FBQzNCLGNBQUU2USxJQUFJN1EsR0FBSixNQUFhK1EsU0FBZixJQUE0QixrQkFBa0IsWUFBbEIsR0FBaUM1UCxVQUFVLEtBQVYsRUFBaUIsd1BBQWpCLEVBQTJRbkIsR0FBM1EsQ0FBakMsR0FBbVRrQixlQUFlLElBQWYsRUFBcUJsQixHQUFyQixDQUEvVSxHQUEyVyxLQUFLLENBQWhYO0FBQ0E2USxnQkFBSTdRLEdBQUosSUFBVzhRLElBQUk5USxHQUFKLENBQVg7QUFDRDtBQUNGO0FBQ0QsZUFBTzZRLEdBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRQSxlQUFTeEIsMEJBQVQsQ0FBb0N3QixHQUFwQyxFQUF5Q0MsR0FBekMsRUFBOEM7QUFDNUMsZUFBTyxTQUFTRSxZQUFULEdBQXdCO0FBQzdCLGNBQUkvUyxJQUFJNFMsSUFBSS9NLEtBQUosQ0FBVSxJQUFWLEVBQWdCQyxTQUFoQixDQUFSO0FBQ0EsY0FBSWtOLElBQUlILElBQUloTixLQUFKLENBQVUsSUFBVixFQUFnQkMsU0FBaEIsQ0FBUjtBQUNBLGNBQUk5RixLQUFLLElBQVQsRUFBZTtBQUNiLG1CQUFPZ1QsQ0FBUDtBQUNELFdBRkQsTUFFTyxJQUFJQSxLQUFLLElBQVQsRUFBZTtBQUNwQixtQkFBT2hULENBQVA7QUFDRDtBQUNELGNBQUlpVCxJQUFJLEVBQVI7QUFDQU4sdUNBQTZCTSxDQUE3QixFQUFnQ2pULENBQWhDO0FBQ0EyUyx1Q0FBNkJNLENBQTdCLEVBQWdDRCxDQUFoQztBQUNBLGlCQUFPQyxDQUFQO0FBQ0QsU0FaRDtBQWFEOztBQUVEOzs7Ozs7OztBQVFBLGVBQVNULHFCQUFULENBQStCSSxHQUEvQixFQUFvQ0MsR0FBcEMsRUFBeUM7QUFDdkMsZUFBTyxTQUFTSyxlQUFULEdBQTJCO0FBQ2hDTixjQUFJL00sS0FBSixDQUFVLElBQVYsRUFBZ0JDLFNBQWhCO0FBQ0ErTSxjQUFJaE4sS0FBSixDQUFVLElBQVYsRUFBZ0JDLFNBQWhCO0FBQ0QsU0FIRDtBQUlEOztBQUVEOzs7Ozs7O0FBT0EsZUFBU3FOLGtCQUFULENBQTRCQyxTQUE1QixFQUF1Q0MsTUFBdkMsRUFBK0M7QUFDN0MsWUFBSUMsY0FBY0QsT0FBT0UsSUFBUCxDQUFZSCxTQUFaLENBQWxCO0FBQ0EsWUFBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbENFLHNCQUFZRSxtQkFBWixHQUFrQ0osU0FBbEM7QUFDQUUsc0JBQVlHLGtCQUFaLEdBQWlDSixNQUFqQztBQUNBQyxzQkFBWUkscUJBQVosR0FBb0MsSUFBcEM7QUFDQSxjQUFJQyxnQkFBZ0JQLFVBQVVsTCxXQUFWLENBQXNCMEMsV0FBMUM7QUFDQSxjQUFJZ0osUUFBUU4sWUFBWUMsSUFBeEI7QUFDQUQsc0JBQVlDLElBQVosR0FBbUIsVUFBVU0sT0FBVixFQUFtQjtBQUNwQyxpQkFBSyxJQUFJeEssT0FBT3ZELFVBQVV2RixNQUFyQixFQUE2QitJLE9BQU9DLE1BQU1GLE9BQU8sQ0FBUCxHQUFXQSxPQUFPLENBQWxCLEdBQXNCLENBQTVCLENBQXBDLEVBQW9FRyxPQUFPLENBQWhGLEVBQW1GQSxPQUFPSCxJQUExRixFQUFnR0csTUFBaEcsRUFBd0c7QUFDdEdGLG1CQUFLRSxPQUFPLENBQVosSUFBaUIxRCxVQUFVMEQsSUFBVixDQUFqQjtBQUNEOztBQUVEO0FBQ0E7QUFDQTtBQUNBLGdCQUFJcUssWUFBWVQsU0FBWixJQUF5QlMsWUFBWSxJQUF6QyxFQUErQztBQUM3QyxnQ0FBa0IsWUFBbEIsR0FBaUN0TyxRQUFRLEtBQVIsRUFBZSw4REFBOEQsNEJBQTdFLEVBQTJHb08sYUFBM0csQ0FBakMsR0FBNkosS0FBSyxDQUFsSztBQUNELGFBRkQsTUFFTyxJQUFJLENBQUNySyxLQUFLL0ksTUFBVixFQUFrQjtBQUN2QixnQ0FBa0IsWUFBbEIsR0FBaUNnRixRQUFRLEtBQVIsRUFBZSxrRUFBa0UsOERBQWxFLEdBQW1JLGlEQUFsSixFQUFxTW9PLGFBQXJNLENBQWpDLEdBQXVQLEtBQUssQ0FBNVA7QUFDQSxxQkFBT0wsV0FBUDtBQUNEO0FBQ0QsZ0JBQUlRLGdCQUFnQkYsTUFBTS9OLEtBQU4sQ0FBWXlOLFdBQVosRUFBeUJ4TixTQUF6QixDQUFwQjtBQUNBZ08sMEJBQWNOLG1CQUFkLEdBQW9DSixTQUFwQztBQUNBVSwwQkFBY0wsa0JBQWQsR0FBbUNKLE1BQW5DO0FBQ0FTLDBCQUFjSixxQkFBZCxHQUFzQ3BLLElBQXRDO0FBQ0EsbUJBQU93SyxhQUFQO0FBQ0QsV0FuQkQ7QUFvQkQ7QUFDRCxlQUFPUixXQUFQO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsZUFBU1MsbUJBQVQsQ0FBNkJYLFNBQTdCLEVBQXdDO0FBQ3RDLFlBQUlZLFFBQVFaLFVBQVVqQixvQkFBdEI7QUFDQSxhQUFLLElBQUlqUyxJQUFJLENBQWIsRUFBZ0JBLElBQUk4VCxNQUFNelQsTUFBMUIsRUFBa0NMLEtBQUssQ0FBdkMsRUFBMEM7QUFDeEMsY0FBSStULGNBQWNELE1BQU05VCxDQUFOLENBQWxCO0FBQ0EsY0FBSW1ULFNBQVNXLE1BQU05VCxJQUFJLENBQVYsQ0FBYjtBQUNBa1Qsb0JBQVVhLFdBQVYsSUFBeUJkLG1CQUFtQkMsU0FBbkIsRUFBOEJDLE1BQTlCLENBQXpCO0FBQ0Q7QUFDRjs7QUFFRDs7OztBQUlBLFVBQUl4QixrQkFBa0I7O0FBRXBCOzs7O0FBSUFxQyxzQkFBYyxzQkFBVUMsUUFBVixFQUFvQkMsUUFBcEIsRUFBOEI7QUFDMUMsZUFBS0MsT0FBTCxDQUFhQyxtQkFBYixDQUFpQyxJQUFqQyxFQUF1Q0gsUUFBdkM7QUFDQSxjQUFJQyxRQUFKLEVBQWM7QUFDWixpQkFBS0MsT0FBTCxDQUFhRSxlQUFiLENBQTZCLElBQTdCLEVBQW1DSCxRQUFuQyxFQUE2QyxjQUE3QztBQUNEO0FBQ0YsU0FYbUI7O0FBYXBCOzs7Ozs7QUFNQW5ILG1CQUFXLHFCQUFZO0FBQ3JCLGlCQUFPLEtBQUtvSCxPQUFMLENBQWFwSCxTQUFiLENBQXVCLElBQXZCLENBQVA7QUFDRDtBQXJCbUIsT0FBdEI7O0FBd0JBLFVBQUl1SCxzQkFBc0IsU0FBdEJBLG1CQUFzQixHQUFZLENBQUUsQ0FBeEM7QUFDQTNQLGNBQVEyUCxvQkFBb0J6TSxTQUE1QixFQUF1Q2hELGVBQWVnRCxTQUF0RCxFQUFpRThKLGVBQWpFOztBQUVBOzs7OztBQUtBLFVBQUk1TSxhQUFhOztBQUVmOzs7Ozs7OztBQVFBd0IscUJBQWEscUJBQVVxTCxJQUFWLEVBQWdCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLGNBQUl0SyxjQUFjd0ksU0FBUyxVQUFVakgsS0FBVixFQUFpQm9GLE9BQWpCLEVBQTBCa0csT0FBMUIsRUFBbUM7QUFDNUQ7QUFDQTs7QUFFQSxnQkFBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbEMsZ0NBQWtCLFlBQWxCLEdBQWlDOU8sUUFBUSxnQkFBZ0JpQyxXQUF4QixFQUFxQyx1RUFBdUUscURBQTVHLENBQWpDLEdBQXNNLEtBQUssQ0FBM007QUFDRDs7QUFFRDtBQUNBLGdCQUFJLEtBQUsySyxvQkFBTCxDQUEwQjVSLE1BQTlCLEVBQXNDO0FBQ3BDd1Qsa0NBQW9CLElBQXBCO0FBQ0Q7O0FBRUQsaUJBQUtoTCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxpQkFBS29GLE9BQUwsR0FBZUEsT0FBZjtBQUNBLGlCQUFLc0csSUFBTCxHQUFZM0UsV0FBWjtBQUNBLGlCQUFLdUUsT0FBTCxHQUFlQSxXQUFXeEUsb0JBQTFCOztBQUVBLGlCQUFLOU0sS0FBTCxHQUFhLElBQWI7O0FBRUE7QUFDQTs7QUFFQSxnQkFBSTJSLGVBQWUsS0FBS2pFLGVBQUwsR0FBdUIsS0FBS0EsZUFBTCxFQUF2QixHQUFnRCxJQUFuRTtBQUNBLGdCQUFJLGtCQUFrQixZQUF0QixFQUFvQztBQUNsQztBQUNBLGtCQUFJaUUsaUJBQWlCNUIsU0FBakIsSUFBOEIsS0FBS3JDLGVBQUwsQ0FBcUJrRSxlQUF2RCxFQUF3RTtBQUN0RTtBQUNBO0FBQ0FELCtCQUFlLElBQWY7QUFDRDtBQUNGO0FBQ0QsY0FBRSxRQUFPQSxZQUFQLHlDQUFPQSxZQUFQLE9BQXdCLFFBQXhCLElBQW9DLENBQUNuTCxNQUFNMkYsT0FBTixDQUFjd0YsWUFBZCxDQUF2QyxJQUFzRSxrQkFBa0IsWUFBbEIsR0FBaUN4UixVQUFVLEtBQVYsRUFBaUIscURBQWpCLEVBQXdFc0UsWUFBWW9ELFdBQVosSUFBMkIseUJBQW5HLENBQWpDLEdBQWlLM0gsZUFBZSxJQUFmLEVBQXFCdUUsWUFBWW9ELFdBQVosSUFBMkIseUJBQWhELENBQXZPLEdBQW9ULEtBQUssQ0FBelQ7O0FBRUEsaUJBQUs3SCxLQUFMLEdBQWEyUixZQUFiO0FBQ0QsV0FuQ2lCLENBQWxCO0FBb0NBbE4sc0JBQVlPLFNBQVosR0FBd0IsSUFBSXlNLG1CQUFKLEVBQXhCO0FBQ0FoTixzQkFBWU8sU0FBWixDQUFzQkcsV0FBdEIsR0FBb0NWLFdBQXBDO0FBQ0FBLHNCQUFZTyxTQUFaLENBQXNCb0ssb0JBQXRCLEdBQTZDLEVBQTdDOztBQUVBakMseUJBQWVqSyxPQUFmLENBQXVCaUwscUJBQXFCcUMsSUFBckIsQ0FBMEIsSUFBMUIsRUFBZ0MvTCxXQUFoQyxDQUF2Qjs7QUFFQTBKLCtCQUFxQjFKLFdBQXJCLEVBQWtDc0ssSUFBbEM7O0FBRUE7QUFDQSxjQUFJdEssWUFBWWdKLGVBQWhCLEVBQWlDO0FBQy9CaEosd0JBQVl1RCxZQUFaLEdBQTJCdkQsWUFBWWdKLGVBQVosRUFBM0I7QUFDRDs7QUFFRCxjQUFJLGtCQUFrQixZQUF0QixFQUFvQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFJaEosWUFBWWdKLGVBQWhCLEVBQWlDO0FBQy9CaEosMEJBQVlnSixlQUFaLENBQTRCb0Usb0JBQTVCLEdBQW1ELEVBQW5EO0FBQ0Q7QUFDRCxnQkFBSXBOLFlBQVlPLFNBQVosQ0FBc0IwSSxlQUExQixFQUEyQztBQUN6Q2pKLDBCQUFZTyxTQUFaLENBQXNCMEksZUFBdEIsQ0FBc0NtRSxvQkFBdEMsR0FBNkQsRUFBN0Q7QUFDRDtBQUNGOztBQUVELFdBQUNwTixZQUFZTyxTQUFaLENBQXNCMkMsTUFBdkIsR0FBZ0Msa0JBQWtCLFlBQWxCLEdBQWlDeEgsVUFBVSxLQUFWLEVBQWlCLHlFQUFqQixDQUFqQyxHQUErSEQsZUFBZSxJQUFmLENBQS9KLEdBQXNMLEtBQUssQ0FBM0w7O0FBRUEsY0FBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbEMsOEJBQWtCLFlBQWxCLEdBQWlDc0MsUUFBUSxDQUFDaUMsWUFBWU8sU0FBWixDQUFzQjhNLHFCQUEvQixFQUFzRCw0QkFBNEIsaUVBQTVCLEdBQWdHLDREQUFoRyxHQUErSiw2QkFBck4sRUFBb1AvQyxLQUFLbEgsV0FBTCxJQUFvQixhQUF4USxDQUFqQyxHQUEwVCxLQUFLLENBQS9UO0FBQ0EsOEJBQWtCLFlBQWxCLEdBQWlDckYsUUFBUSxDQUFDaUMsWUFBWU8sU0FBWixDQUFzQitNLHlCQUEvQixFQUEwRCw0QkFBNEIsd0VBQXRGLEVBQWdLaEQsS0FBS2xILFdBQUwsSUFBb0IsYUFBcEwsQ0FBakMsR0FBc08sS0FBSyxDQUEzTztBQUNEOztBQUVEO0FBQ0EsZUFBSyxJQUFJbUssVUFBVCxJQUF1QjVFLG1CQUF2QixFQUE0QztBQUMxQyxnQkFBSSxDQUFDM0ksWUFBWU8sU0FBWixDQUFzQmdOLFVBQXRCLENBQUwsRUFBd0M7QUFDdEN2TiwwQkFBWU8sU0FBWixDQUFzQmdOLFVBQXRCLElBQW9DLElBQXBDO0FBQ0Q7QUFDRjs7QUFFRCxpQkFBT3ZOLFdBQVA7QUFDRCxTQTNGYzs7QUE2RmZ3TixtQkFBVztBQUNUQyx1QkFBYSxxQkFBVXRPLEtBQVYsRUFBaUI7QUFDNUJ1SiwyQkFBZS9MLElBQWYsQ0FBb0J3QyxLQUFwQjtBQUNEO0FBSFE7O0FBN0ZJLE9BQWpCOztBQXFHQTFILGFBQU9ELE9BQVAsR0FBaUJpRyxVQUFqQjtBQUNDLEtBN3NCcUMsRUE2c0JwQyxFQUFDLE1BQUssRUFBTixFQUFTLE1BQUssRUFBZCxFQUFpQixNQUFLLEVBQXRCLEVBQXlCLE1BQUssRUFBOUIsRUFBaUMsTUFBSyxFQUF0QyxFQUF5QyxNQUFLLEVBQTlDLEVBQWlELE1BQUssRUFBdEQsRUFBeUQsTUFBSyxFQUE5RCxFQUFpRSxNQUFLLEVBQXRFLEVBN3NCb0MsQ0EvM0Jrd0IsRUE0a0QzdEIsSUFBRyxDQUFDLFVBQVN6RSxPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ2pIOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsVUFBSWlFLGlCQUFpQnpDLFFBQVEsRUFBUixDQUFyQjs7QUFFQSxVQUFJcVAsdUJBQXVCclAsUUFBUSxFQUFSLENBQTNCOztBQUVBLFVBQUkwVSxvQkFBb0IxVSxRQUFRLEVBQVIsQ0FBeEI7QUFDQSxVQUFJc1AsY0FBY3RQLFFBQVEsRUFBUixDQUFsQjtBQUNBLFVBQUkwQyxZQUFZMUMsUUFBUSxFQUFSLENBQWhCO0FBQ0EsVUFBSStFLFVBQVUvRSxRQUFRLEVBQVIsQ0FBZDs7QUFFQTs7O0FBR0EsZUFBU3VFLGNBQVQsQ0FBd0JnRSxLQUF4QixFQUErQm9GLE9BQS9CLEVBQXdDa0csT0FBeEMsRUFBaUQ7QUFDL0MsYUFBS3RMLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtvRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLc0csSUFBTCxHQUFZM0UsV0FBWjtBQUNBO0FBQ0E7QUFDQSxhQUFLdUUsT0FBTCxHQUFlQSxXQUFXeEUsb0JBQTFCO0FBQ0Q7O0FBRUQ5SyxxQkFBZWdELFNBQWYsQ0FBeUJvTixnQkFBekIsR0FBNEMsRUFBNUM7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkFwUSxxQkFBZWdELFNBQWYsQ0FBeUJxTixRQUF6QixHQUFvQyxVQUFVQyxZQUFWLEVBQXdCakIsUUFBeEIsRUFBa0M7QUFDcEUsVUFBRSxRQUFPaUIsWUFBUCx5Q0FBT0EsWUFBUCxPQUF3QixRQUF4QixJQUFvQyxPQUFPQSxZQUFQLEtBQXdCLFVBQTVELElBQTBFQSxnQkFBZ0IsSUFBNUYsSUFBb0csa0JBQWtCLFlBQWxCLEdBQWlDblMsVUFBVSxLQUFWLEVBQWlCLHVIQUFqQixDQUFqQyxHQUE2S0QsZUFBZSxJQUFmLENBQWpSLEdBQXdTLEtBQUssQ0FBN1M7QUFDQSxhQUFLb1IsT0FBTCxDQUFhaUIsZUFBYixDQUE2QixJQUE3QixFQUFtQ0QsWUFBbkM7QUFDQSxZQUFJakIsUUFBSixFQUFjO0FBQ1osZUFBS0MsT0FBTCxDQUFhRSxlQUFiLENBQTZCLElBQTdCLEVBQW1DSCxRQUFuQyxFQUE2QyxVQUE3QztBQUNEO0FBQ0YsT0FORDs7QUFRQTs7Ozs7Ozs7Ozs7Ozs7QUFjQXJQLHFCQUFlZ0QsU0FBZixDQUF5QndOLFdBQXpCLEdBQXVDLFVBQVVuQixRQUFWLEVBQW9CO0FBQ3pELGFBQUtDLE9BQUwsQ0FBYW1CLGtCQUFiLENBQWdDLElBQWhDO0FBQ0EsWUFBSXBCLFFBQUosRUFBYztBQUNaLGVBQUtDLE9BQUwsQ0FBYUUsZUFBYixDQUE2QixJQUE3QixFQUFtQ0gsUUFBbkMsRUFBNkMsYUFBN0M7QUFDRDtBQUNGLE9BTEQ7O0FBT0E7Ozs7O0FBS0EsVUFBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbEMsWUFBSXFCLGlCQUFpQjtBQUNuQnhJLHFCQUFXLENBQUMsV0FBRCxFQUFjLDBFQUEwRSwrQ0FBeEYsQ0FEUTtBQUVuQmlILHdCQUFjLENBQUMsY0FBRCxFQUFpQixxREFBcUQsaURBQXRFO0FBRkssU0FBckI7QUFJQSxZQUFJd0IsMkJBQTJCLFNBQTNCQSx3QkFBMkIsQ0FBVVgsVUFBVixFQUFzQlksSUFBdEIsRUFBNEI7QUFDekQsY0FBSVQsaUJBQUosRUFBdUI7QUFDckJsTixtQkFBTzROLGNBQVAsQ0FBc0I3USxlQUFlZ0QsU0FBckMsRUFBZ0RnTixVQUFoRCxFQUE0RDtBQUMxRGMsbUJBQUssZUFBWTtBQUNmLGtDQUFrQixZQUFsQixHQUFpQ3RRLFFBQVEsS0FBUixFQUFlLDZEQUFmLEVBQThFb1EsS0FBSyxDQUFMLENBQTlFLEVBQXVGQSxLQUFLLENBQUwsQ0FBdkYsQ0FBakMsR0FBbUksS0FBSyxDQUF4STtBQUNBLHVCQUFPN0MsU0FBUDtBQUNEO0FBSnlELGFBQTVEO0FBTUQ7QUFDRixTQVREO0FBVUEsYUFBSyxJQUFJZ0QsTUFBVCxJQUFtQkwsY0FBbkIsRUFBbUM7QUFDakMsY0FBSUEsZUFBZTVULGNBQWYsQ0FBOEJpVSxNQUE5QixDQUFKLEVBQTJDO0FBQ3pDSixxQ0FBeUJJLE1BQXpCLEVBQWlDTCxlQUFlSyxNQUFmLENBQWpDO0FBQ0Q7QUFDRjtBQUNGOztBQUVEN1csYUFBT0QsT0FBUCxHQUFpQitGLGNBQWpCO0FBQ0MsS0F0SCtFLEVBc0g5RSxFQUFDLE1BQUssRUFBTixFQUFTLE1BQUssRUFBZCxFQUFpQixNQUFLLEVBQXRCLEVBQXlCLE1BQUssRUFBOUIsRUFBaUMsTUFBSyxFQUF0QyxFQUF5QyxNQUFLLEVBQTlDLEVBdEg4RSxDQTVrRHd0QixFQWtzRG52QixJQUFHLENBQUMsVUFBU3ZFLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDekY7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUEsVUFBSWlFLGlCQUFpQnpDLFFBQVEsRUFBUixDQUFyQjs7QUFFQSxVQUFJdVYsb0JBQW9CdlYsUUFBUSxFQUFSLENBQXhCOztBQUVBLFVBQUkwQyxZQUFZMUMsUUFBUSxFQUFSLENBQWhCO0FBQ0EsVUFBSStFLFVBQVUvRSxRQUFRLEVBQVIsQ0FBZDs7QUFFQSxlQUFTd1YsUUFBVCxDQUFrQi9GLEVBQWxCLEVBQXNCO0FBQ3BCO0FBQ0EsWUFBSWdHLGVBQWVDLFNBQVNuTyxTQUFULENBQW1Cb08sUUFBdEM7QUFDQSxZQUFJdFUsaUJBQWlCbUcsT0FBT0QsU0FBUCxDQUFpQmxHLGNBQXRDO0FBQ0EsWUFBSXVVLGFBQWFDLE9BQU8sTUFBTUo7QUFDOUI7QUFEOEIsU0FFN0IzVixJQUY2QixDQUV4QnVCLGNBRndCO0FBRzlCO0FBSDhCLFNBSTdCTSxPQUo2QixDQUlyQixxQkFKcUIsRUFJRSxNQUpGO0FBSzlCO0FBTDhCLFNBTTdCQSxPQU42QixDQU1yQix3REFOcUIsRUFNcUMsT0FOckMsQ0FBTixHQU1zRCxHQU43RCxDQUFqQjtBQU9BLFlBQUk7QUFDRixjQUFJbVUsU0FBU0wsYUFBYTNWLElBQWIsQ0FBa0IyUCxFQUFsQixDQUFiO0FBQ0EsaUJBQU9tRyxXQUFXRyxJQUFYLENBQWdCRCxNQUFoQixDQUFQO0FBQ0QsU0FIRCxDQUdFLE9BQU9FLEdBQVAsRUFBWTtBQUNaLGlCQUFPLEtBQVA7QUFDRDtBQUNGOztBQUVELFVBQUlDO0FBQ0o7QUFDQSxhQUFPbE4sTUFBTW1OLElBQWIsS0FBc0IsVUFBdEI7QUFDQTtBQUNBLGFBQU9DLEdBQVAsS0FBZSxVQUZmLElBRTZCWCxTQUFTVyxHQUFULENBRjdCO0FBR0E7QUFDQUEsVUFBSTVPLFNBQUosSUFBaUIsSUFKakIsSUFJeUIsT0FBTzRPLElBQUk1TyxTQUFKLENBQWM2TyxJQUFyQixLQUE4QixVQUp2RCxJQUlxRVosU0FBU1csSUFBSTVPLFNBQUosQ0FBYzZPLElBQXZCLENBSnJFO0FBS0E7QUFDQSxhQUFPQyxHQUFQLEtBQWUsVUFOZixJQU02QmIsU0FBU2EsR0FBVCxDQU43QjtBQU9BO0FBQ0FBLFVBQUk5TyxTQUFKLElBQWlCLElBUmpCLElBUXlCLE9BQU84TyxJQUFJOU8sU0FBSixDQUFjNk8sSUFBckIsS0FBOEIsVUFSdkQsSUFRcUVaLFNBQVNhLElBQUk5TyxTQUFKLENBQWM2TyxJQUF2QixDQVZyRTs7QUFZQSxVQUFJRSxPQUFKO0FBQ0EsVUFBSUMsT0FBSjtBQUNBLFVBQUlDLFVBQUo7QUFDQSxVQUFJQyxVQUFKO0FBQ0EsVUFBSUMsT0FBSjtBQUNBLFVBQUlDLFVBQUo7QUFDQSxVQUFJQyxVQUFKOztBQUVBLFVBQUlYLGlCQUFKLEVBQXVCO0FBQ3JCLFlBQUlZLFVBQVUsSUFBSVYsR0FBSixFQUFkO0FBQ0EsWUFBSVcsWUFBWSxJQUFJVCxHQUFKLEVBQWhCOztBQUVBQyxrQkFBVSxpQkFBVVMsRUFBVixFQUFjQyxJQUFkLEVBQW9CO0FBQzVCSCxrQkFBUUksR0FBUixDQUFZRixFQUFaLEVBQWdCQyxJQUFoQjtBQUNELFNBRkQ7QUFHQVQsa0JBQVUsaUJBQVVRLEVBQVYsRUFBYztBQUN0QixpQkFBT0YsUUFBUXhCLEdBQVIsQ0FBWTBCLEVBQVosQ0FBUDtBQUNELFNBRkQ7QUFHQVAscUJBQWEsb0JBQVVPLEVBQVYsRUFBYztBQUN6QkYsa0JBQVEsUUFBUixFQUFrQkUsRUFBbEI7QUFDRCxTQUZEO0FBR0FOLHFCQUFhLHNCQUFZO0FBQ3ZCLGlCQUFPMU4sTUFBTW1OLElBQU4sQ0FBV1csUUFBUVQsSUFBUixFQUFYLENBQVA7QUFDRCxTQUZEOztBQUlBTSxrQkFBVSxpQkFBVUssRUFBVixFQUFjO0FBQ3RCRCxvQkFBVUksR0FBVixDQUFjSCxFQUFkO0FBQ0QsU0FGRDtBQUdBSixxQkFBYSxvQkFBVUksRUFBVixFQUFjO0FBQ3pCRCxvQkFBVSxRQUFWLEVBQW9CQyxFQUFwQjtBQUNELFNBRkQ7QUFHQUgscUJBQWEsc0JBQVk7QUFDdkIsaUJBQU83TixNQUFNbU4sSUFBTixDQUFXWSxVQUFVVixJQUFWLEVBQVgsQ0FBUDtBQUNELFNBRkQ7QUFHRCxPQTFCRCxNQTBCTztBQUNMLFlBQUllLFlBQVksRUFBaEI7QUFDQSxZQUFJQyxZQUFZLEVBQWhCOztBQUVBO0FBQ0E7QUFDQSxZQUFJQyxlQUFlLFNBQWZBLFlBQWUsQ0FBVU4sRUFBVixFQUFjO0FBQy9CLGlCQUFPLE1BQU1BLEVBQWI7QUFDRCxTQUZEO0FBR0EsWUFBSU8sZUFBZSxTQUFmQSxZQUFlLENBQVUvVixHQUFWLEVBQWU7QUFDaEMsaUJBQU9nVyxTQUFTaFcsSUFBSWlXLE1BQUosQ0FBVyxDQUFYLENBQVQsRUFBd0IsRUFBeEIsQ0FBUDtBQUNELFNBRkQ7O0FBSUFsQixrQkFBVSxpQkFBVVMsRUFBVixFQUFjQyxJQUFkLEVBQW9CO0FBQzVCLGNBQUl6VixNQUFNOFYsYUFBYU4sRUFBYixDQUFWO0FBQ0FJLG9CQUFVNVYsR0FBVixJQUFpQnlWLElBQWpCO0FBQ0QsU0FIRDtBQUlBVCxrQkFBVSxpQkFBVVEsRUFBVixFQUFjO0FBQ3RCLGNBQUl4VixNQUFNOFYsYUFBYU4sRUFBYixDQUFWO0FBQ0EsaUJBQU9JLFVBQVU1VixHQUFWLENBQVA7QUFDRCxTQUhEO0FBSUFpVixxQkFBYSxvQkFBVU8sRUFBVixFQUFjO0FBQ3pCLGNBQUl4VixNQUFNOFYsYUFBYU4sRUFBYixDQUFWO0FBQ0EsaUJBQU9JLFVBQVU1VixHQUFWLENBQVA7QUFDRCxTQUhEO0FBSUFrVixxQkFBYSxzQkFBWTtBQUN2QixpQkFBT2pQLE9BQU80TyxJQUFQLENBQVllLFNBQVosRUFBdUIzUixHQUF2QixDQUEyQjhSLFlBQTNCLENBQVA7QUFDRCxTQUZEOztBQUlBWixrQkFBVSxpQkFBVUssRUFBVixFQUFjO0FBQ3RCLGNBQUl4VixNQUFNOFYsYUFBYU4sRUFBYixDQUFWO0FBQ0FLLG9CQUFVN1YsR0FBVixJQUFpQixJQUFqQjtBQUNELFNBSEQ7QUFJQW9WLHFCQUFhLG9CQUFVSSxFQUFWLEVBQWM7QUFDekIsY0FBSXhWLE1BQU04VixhQUFhTixFQUFiLENBQVY7QUFDQSxpQkFBT0ssVUFBVTdWLEdBQVYsQ0FBUDtBQUNELFNBSEQ7QUFJQXFWLHFCQUFhLHNCQUFZO0FBQ3ZCLGlCQUFPcFAsT0FBTzRPLElBQVAsQ0FBWWdCLFNBQVosRUFBdUI1UixHQUF2QixDQUEyQjhSLFlBQTNCLENBQVA7QUFDRCxTQUZEO0FBR0Q7O0FBRUQsVUFBSUcsZUFBZSxFQUFuQjs7QUFFQSxlQUFTQyxTQUFULENBQW1CWCxFQUFuQixFQUF1QjtBQUNyQixZQUFJQyxPQUFPVCxRQUFRUSxFQUFSLENBQVg7QUFDQSxZQUFJQyxJQUFKLEVBQVU7QUFDUixjQUFJVyxXQUFXWCxLQUFLVyxRQUFwQjs7QUFFQW5CLHFCQUFXTyxFQUFYO0FBQ0FZLG1CQUFTbFMsT0FBVCxDQUFpQmlTLFNBQWpCO0FBQ0Q7QUFDRjs7QUFFRCxlQUFTRSxzQkFBVCxDQUFnQ3hPLElBQWhDLEVBQXNDME0sTUFBdEMsRUFBOEMrQixTQUE5QyxFQUF5RDtBQUN2RCxlQUFPLGVBQWV6TyxRQUFRLFNBQXZCLEtBQXFDME0sU0FBUyxVQUFVQSxPQUFPZ0MsUUFBUCxDQUFnQm5XLE9BQWhCLENBQXdCLFdBQXhCLEVBQXFDLEVBQXJDLENBQVYsR0FBcUQsR0FBckQsR0FBMkRtVSxPQUFPaUMsVUFBbEUsR0FBK0UsR0FBeEYsR0FBOEZGLFlBQVksa0JBQWtCQSxTQUFsQixHQUE4QixHQUExQyxHQUFnRCxFQUFuTCxDQUFQO0FBQ0Q7O0FBRUQsZUFBU0csZUFBVCxDQUF3QkMsT0FBeEIsRUFBaUM7QUFDL0IsWUFBSUEsV0FBVyxJQUFmLEVBQXFCO0FBQ25CLGlCQUFPLFFBQVA7QUFDRCxTQUZELE1BRU8sSUFBSSxPQUFPQSxPQUFQLEtBQW1CLFFBQW5CLElBQStCLE9BQU9BLE9BQVAsS0FBbUIsUUFBdEQsRUFBZ0U7QUFDckUsaUJBQU8sT0FBUDtBQUNELFNBRk0sTUFFQSxJQUFJLE9BQU9BLFFBQVFDLElBQWYsS0FBd0IsUUFBNUIsRUFBc0M7QUFDM0MsaUJBQU9ELFFBQVFDLElBQWY7QUFDRCxTQUZNLE1BRUE7QUFDTCxpQkFBT0QsUUFBUUMsSUFBUixDQUFhOU4sV0FBYixJQUE0QjZOLFFBQVFDLElBQVIsQ0FBYTlPLElBQXpDLElBQWlELFNBQXhEO0FBQ0Q7QUFDRjs7QUFFRCxlQUFTK08sVUFBVCxDQUFvQnBCLEVBQXBCLEVBQXdCO0FBQ3RCLFlBQUkzTixPQUFPZ1AsdUJBQXVCSixjQUF2QixDQUFzQ2pCLEVBQXRDLENBQVg7QUFDQSxZQUFJa0IsVUFBVUcsdUJBQXVCQyxVQUF2QixDQUFrQ3RCLEVBQWxDLENBQWQ7QUFDQSxZQUFJdUIsVUFBVUYsdUJBQXVCRyxVQUF2QixDQUFrQ3hCLEVBQWxDLENBQWQ7QUFDQSxZQUFJYyxTQUFKO0FBQ0EsWUFBSVMsT0FBSixFQUFhO0FBQ1hULHNCQUFZTyx1QkFBdUJKLGNBQXZCLENBQXNDTSxPQUF0QyxDQUFaO0FBQ0Q7QUFDRCwwQkFBa0IsWUFBbEIsR0FBaUN2VCxRQUFRa1QsT0FBUixFQUFpQix1RUFBdUUsZ0JBQXhGLEVBQTBHbEIsRUFBMUcsQ0FBakMsR0FBaUosS0FBSyxDQUF0SjtBQUNBLGVBQU9hLHVCQUF1QnhPLElBQXZCLEVBQTZCNk8sV0FBV0EsUUFBUU8sT0FBaEQsRUFBeURYLFNBQXpELENBQVA7QUFDRDs7QUFFRCxVQUFJTyx5QkFBeUI7QUFDM0JLLHVCQUFlLHVCQUFVMUIsRUFBVixFQUFjMkIsWUFBZCxFQUE0QjtBQUN6QyxjQUFJMUIsT0FBT1QsUUFBUVEsRUFBUixDQUFYO0FBQ0EsV0FBQ0MsSUFBRCxHQUFRLGtCQUFrQixZQUFsQixHQUFpQ3RVLFVBQVUsS0FBVixFQUFpQix5QkFBakIsQ0FBakMsR0FBK0VELGVBQWUsS0FBZixDQUF2RixHQUErRyxLQUFLLENBQXBIO0FBQ0F1VSxlQUFLVyxRQUFMLEdBQWdCZSxZQUFoQjs7QUFFQSxlQUFLLElBQUloWixJQUFJLENBQWIsRUFBZ0JBLElBQUlnWixhQUFhM1ksTUFBakMsRUFBeUNMLEdBQXpDLEVBQThDO0FBQzVDLGdCQUFJaVosY0FBY0QsYUFBYWhaLENBQWIsQ0FBbEI7QUFDQSxnQkFBSWtaLFlBQVlyQyxRQUFRb0MsV0FBUixDQUFoQjtBQUNBLGFBQUNDLFNBQUQsR0FBYSxrQkFBa0IsWUFBbEIsR0FBaUNsVyxVQUFVLEtBQVYsRUFBaUIsOEZBQWpCLENBQWpDLEdBQW9KRCxlQUFlLEtBQWYsQ0FBakssR0FBeUwsS0FBSyxDQUE5TDtBQUNBLGNBQUVtVyxVQUFVakIsUUFBVixJQUFzQixJQUF0QixJQUE4QixRQUFPaUIsVUFBVVgsT0FBakIsTUFBNkIsUUFBM0QsSUFBdUVXLFVBQVVYLE9BQVYsSUFBcUIsSUFBOUYsSUFBc0csa0JBQWtCLFlBQWxCLEdBQWlDdlYsVUFBVSxLQUFWLEVBQWlCLDBHQUFqQixDQUFqQyxHQUFnS0QsZUFBZSxLQUFmLENBQXRRLEdBQThSLEtBQUssQ0FBblM7QUFDQSxhQUFDbVcsVUFBVW5NLFNBQVgsR0FBdUIsa0JBQWtCLFlBQWxCLEdBQWlDL0osVUFBVSxLQUFWLEVBQWlCLHFHQUFqQixDQUFqQyxHQUEySkQsZUFBZSxJQUFmLENBQWxMLEdBQXlNLEtBQUssQ0FBOU07QUFDQSxnQkFBSW1XLFVBQVVDLFFBQVYsSUFBc0IsSUFBMUIsRUFBZ0M7QUFDOUJELHdCQUFVQyxRQUFWLEdBQXFCOUIsRUFBckI7QUFDQTtBQUNBO0FBQ0E7QUFDRDtBQUNELGNBQUU2QixVQUFVQyxRQUFWLEtBQXVCOUIsRUFBekIsSUFBK0Isa0JBQWtCLFlBQWxCLEdBQWlDclUsVUFBVSxLQUFWLEVBQWlCLDJHQUFqQixFQUE4SGlXLFdBQTlILEVBQTJJQyxVQUFVQyxRQUFySixFQUErSjlCLEVBQS9KLENBQWpDLEdBQXNNdFUsZUFBZSxLQUFmLEVBQXNCa1csV0FBdEIsRUFBbUNDLFVBQVVDLFFBQTdDLEVBQXVEOUIsRUFBdkQsQ0FBck8sR0FBa1MsS0FBSyxDQUF2UztBQUNEO0FBQ0YsU0FwQjBCO0FBcUIzQitCLGdDQUF3QixnQ0FBVS9CLEVBQVYsRUFBY2tCLE9BQWQsRUFBdUJZLFFBQXZCLEVBQWlDO0FBQ3ZELGNBQUk3QixPQUFPO0FBQ1RpQixxQkFBU0EsT0FEQTtBQUVUWSxzQkFBVUEsUUFGRDtBQUdUdkwsa0JBQU0sSUFIRztBQUlUcUssc0JBQVUsRUFKRDtBQUtUbEwsdUJBQVcsS0FMRjtBQU1Uc00seUJBQWE7QUFOSixXQUFYO0FBUUF6QyxrQkFBUVMsRUFBUixFQUFZQyxJQUFaO0FBQ0QsU0EvQjBCO0FBZ0MzQmdDLGlDQUF5QixpQ0FBVWpDLEVBQVYsRUFBY2tCLE9BQWQsRUFBdUI7QUFDOUMsY0FBSWpCLE9BQU9ULFFBQVFRLEVBQVIsQ0FBWDtBQUNBLGNBQUksQ0FBQ0MsSUFBRCxJQUFTLENBQUNBLEtBQUt2SyxTQUFuQixFQUE4QjtBQUM1QjtBQUNBO0FBQ0E7QUFDRDtBQUNEdUssZUFBS2lCLE9BQUwsR0FBZUEsT0FBZjtBQUNELFNBeEMwQjtBQXlDM0JnQiwwQkFBa0IsMEJBQVVsQyxFQUFWLEVBQWM7QUFDOUIsY0FBSUMsT0FBT1QsUUFBUVEsRUFBUixDQUFYO0FBQ0EsV0FBQ0MsSUFBRCxHQUFRLGtCQUFrQixZQUFsQixHQUFpQ3RVLFVBQVUsS0FBVixFQUFpQix5QkFBakIsQ0FBakMsR0FBK0VELGVBQWUsS0FBZixDQUF2RixHQUErRyxLQUFLLENBQXBIO0FBQ0F1VSxlQUFLdkssU0FBTCxHQUFpQixJQUFqQjtBQUNBLGNBQUl5TSxTQUFTbEMsS0FBSzZCLFFBQUwsS0FBa0IsQ0FBL0I7QUFDQSxjQUFJSyxNQUFKLEVBQVk7QUFDVnhDLG9CQUFRSyxFQUFSO0FBQ0Q7QUFDRixTQWpEMEI7QUFrRDNCb0MsMkJBQW1CLDJCQUFVcEMsRUFBVixFQUFjO0FBQy9CLGNBQUlDLE9BQU9ULFFBQVFRLEVBQVIsQ0FBWDtBQUNBLGNBQUksQ0FBQ0MsSUFBRCxJQUFTLENBQUNBLEtBQUt2SyxTQUFuQixFQUE4QjtBQUM1QjtBQUNBO0FBQ0E7QUFDRDtBQUNEdUssZUFBSytCLFdBQUw7QUFDRCxTQTFEMEI7QUEyRDNCSyw0QkFBb0IsNEJBQVVyQyxFQUFWLEVBQWM7QUFDaEMsY0FBSUMsT0FBT1QsUUFBUVEsRUFBUixDQUFYO0FBQ0EsY0FBSUMsSUFBSixFQUFVO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxpQkFBS3ZLLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxnQkFBSXlNLFNBQVNsQyxLQUFLNkIsUUFBTCxLQUFrQixDQUEvQjtBQUNBLGdCQUFJSyxNQUFKLEVBQVk7QUFDVnZDLHlCQUFXSSxFQUFYO0FBQ0Q7QUFDRjtBQUNEVSx1QkFBYTlULElBQWIsQ0FBa0JvVCxFQUFsQjtBQUNELFNBMUUwQjtBQTJFM0JzQyxrQ0FBMEIsb0NBQVk7QUFDcEMsY0FBSWpCLHVCQUF1QmtCLGVBQTNCLEVBQTRDO0FBQzFDO0FBQ0E7QUFDRDs7QUFFRCxlQUFLLElBQUk1WixJQUFJLENBQWIsRUFBZ0JBLElBQUkrWCxhQUFhMVgsTUFBakMsRUFBeUNMLEdBQXpDLEVBQThDO0FBQzVDLGdCQUFJcVgsS0FBS1UsYUFBYS9YLENBQWIsQ0FBVDtBQUNBZ1ksc0JBQVVYLEVBQVY7QUFDRDtBQUNEVSx1QkFBYTFYLE1BQWIsR0FBc0IsQ0FBdEI7QUFDRCxTQXRGMEI7QUF1RjNCME0sbUJBQVcsbUJBQVVzSyxFQUFWLEVBQWM7QUFDdkIsY0FBSUMsT0FBT1QsUUFBUVEsRUFBUixDQUFYO0FBQ0EsaUJBQU9DLE9BQU9BLEtBQUt2SyxTQUFaLEdBQXdCLEtBQS9CO0FBQ0QsU0ExRjBCO0FBMkYzQjhNLGlDQUF5QixpQ0FBVUMsVUFBVixFQUFzQjtBQUM3QyxjQUFJckUsT0FBTyxFQUFYO0FBQ0EsY0FBSXFFLFVBQUosRUFBZ0I7QUFDZCxnQkFBSXBRLE9BQU80TyxnQkFBZXdCLFVBQWYsQ0FBWDtBQUNBLGdCQUFJQyxRQUFRRCxXQUFXRSxNQUF2QjtBQUNBdkUsb0JBQVF5Qyx1QkFBdUJ4TyxJQUF2QixFQUE2Qm9RLFdBQVdoQixPQUF4QyxFQUFpRGlCLFNBQVNBLE1BQU1FLE9BQU4sRUFBMUQsQ0FBUjtBQUNEOztBQUVELGNBQUlDLGVBQWVyRSxrQkFBa0JzRSxPQUFyQztBQUNBLGNBQUk5QyxLQUFLNkMsZ0JBQWdCQSxhQUFhRSxRQUF0Qzs7QUFFQTNFLGtCQUFRaUQsdUJBQXVCMkIsb0JBQXZCLENBQTRDaEQsRUFBNUMsQ0FBUjtBQUNBLGlCQUFPNUIsSUFBUDtBQUNELFNBeEcwQjtBQXlHM0I0RSw4QkFBc0IsOEJBQVVoRCxFQUFWLEVBQWM7QUFDbEMsY0FBSTVCLE9BQU8sRUFBWDtBQUNBLGlCQUFPNEIsRUFBUCxFQUFXO0FBQ1Q1QixvQkFBUWdELFdBQVdwQixFQUFYLENBQVI7QUFDQUEsaUJBQUtxQix1QkFBdUI0QixXQUF2QixDQUFtQ2pELEVBQW5DLENBQUw7QUFDRDtBQUNELGlCQUFPNUIsSUFBUDtBQUNELFNBaEgwQjtBQWlIM0I4RSxxQkFBYSxxQkFBVWxELEVBQVYsRUFBYztBQUN6QixjQUFJQyxPQUFPVCxRQUFRUSxFQUFSLENBQVg7QUFDQSxpQkFBT0MsT0FBT0EsS0FBS1csUUFBWixHQUF1QixFQUE5QjtBQUNELFNBcEgwQjtBQXFIM0JLLHdCQUFnQix3QkFBVWpCLEVBQVYsRUFBYztBQUM1QixjQUFJa0IsVUFBVUcsdUJBQXVCQyxVQUF2QixDQUFrQ3RCLEVBQWxDLENBQWQ7QUFDQSxjQUFJLENBQUNrQixPQUFMLEVBQWM7QUFDWixtQkFBTyxJQUFQO0FBQ0Q7QUFDRCxpQkFBT0QsZ0JBQWVDLE9BQWYsQ0FBUDtBQUNELFNBM0gwQjtBQTRIM0JJLG9CQUFZLG9CQUFVdEIsRUFBVixFQUFjO0FBQ3hCLGNBQUlDLE9BQU9ULFFBQVFRLEVBQVIsQ0FBWDtBQUNBLGlCQUFPQyxPQUFPQSxLQUFLaUIsT0FBWixHQUFzQixJQUE3QjtBQUNELFNBL0gwQjtBQWdJM0JNLG9CQUFZLG9CQUFVeEIsRUFBVixFQUFjO0FBQ3hCLGNBQUlrQixVQUFVRyx1QkFBdUJDLFVBQXZCLENBQWtDdEIsRUFBbEMsQ0FBZDtBQUNBLGNBQUksQ0FBQ2tCLE9BQUQsSUFBWSxDQUFDQSxRQUFReUIsTUFBekIsRUFBaUM7QUFDL0IsbUJBQU8sSUFBUDtBQUNEO0FBQ0QsaUJBQU96QixRQUFReUIsTUFBUixDQUFlSSxRQUF0QjtBQUNELFNBdEkwQjtBQXVJM0JFLHFCQUFhLHFCQUFVakQsRUFBVixFQUFjO0FBQ3pCLGNBQUlDLE9BQU9ULFFBQVFRLEVBQVIsQ0FBWDtBQUNBLGlCQUFPQyxPQUFPQSxLQUFLNkIsUUFBWixHQUF1QixJQUE5QjtBQUNELFNBMUkwQjtBQTJJM0JxQixtQkFBVyxtQkFBVW5ELEVBQVYsRUFBYztBQUN2QixjQUFJQyxPQUFPVCxRQUFRUSxFQUFSLENBQVg7QUFDQSxjQUFJa0IsVUFBVWpCLE9BQU9BLEtBQUtpQixPQUFaLEdBQXNCLElBQXBDO0FBQ0EsY0FBSW5DLFNBQVNtQyxXQUFXLElBQVgsR0FBa0JBLFFBQVFPLE9BQTFCLEdBQW9DLElBQWpEO0FBQ0EsaUJBQU8xQyxNQUFQO0FBQ0QsU0FoSjBCO0FBaUozQnFFLGlCQUFTLGlCQUFVcEQsRUFBVixFQUFjO0FBQ3JCLGNBQUlrQixVQUFVRyx1QkFBdUJDLFVBQXZCLENBQWtDdEIsRUFBbEMsQ0FBZDtBQUNBLGNBQUksT0FBT2tCLE9BQVAsS0FBbUIsUUFBdkIsRUFBaUM7QUFDL0IsbUJBQU9BLE9BQVA7QUFDRCxXQUZELE1BRU8sSUFBSSxPQUFPQSxPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQ3RDLG1CQUFPLEtBQUtBLE9BQVo7QUFDRCxXQUZNLE1BRUE7QUFDTCxtQkFBTyxJQUFQO0FBQ0Q7QUFDRixTQTFKMEI7QUEySjNCbUMsd0JBQWdCLHdCQUFVckQsRUFBVixFQUFjO0FBQzVCLGNBQUlDLE9BQU9ULFFBQVFRLEVBQVIsQ0FBWDtBQUNBLGlCQUFPQyxPQUFPQSxLQUFLK0IsV0FBWixHQUEwQixDQUFqQztBQUNELFNBOUowQjs7QUFpSzNCbkMsb0JBQVlBLFVBaktlO0FBa0szQnlELDBCQUFrQjVEO0FBbEtTLE9BQTdCOztBQXFLQWhZLGFBQU9ELE9BQVAsR0FBaUI0WixzQkFBakI7QUFDQyxLQTlVdUQsRUE4VXRELEVBQUMsTUFBSyxFQUFOLEVBQVMsTUFBSyxFQUFkLEVBQWlCLE1BQUssRUFBdEIsRUFBeUIsTUFBSyxFQUE5QixFQTlVc0QsQ0Fsc0RndkIsRUFnaEVud0IsSUFBRyxDQUFDLFVBQVNwWSxPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ3pFOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsVUFBSThiLGlCQUFpQnRhLFFBQVEsRUFBUixDQUFyQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsVUFBSXVhLG9DQUFvQztBQUN0Q2xLLCtCQUF1QiwrQkFBVW1LLFNBQVYsRUFBcUJDLFNBQXJCLEVBQWdDO0FBQ3JELGlCQUFPSCxlQUFlLElBQWYsRUFBcUJFLFNBQXJCLEVBQWdDQyxTQUFoQyxDQUFQO0FBQ0Q7QUFIcUMsT0FBeEM7O0FBTUFoYyxhQUFPRCxPQUFQLEdBQWlCK2IsaUNBQWpCO0FBQ0MsS0FoRHVDLEVBZ0R0QyxFQUFDLE1BQUssRUFBTixFQWhEc0MsQ0FoaEVnd0IsRUFna0UzeEIsSUFBRyxDQUFDLFVBQVN2YSxPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ2pEOzs7Ozs7Ozs7OztBQVdBOztBQUVBOzs7Ozs7O0FBTUEsVUFBSStXLG9CQUFvQjs7QUFFdEI7Ozs7QUFJQXNFLGlCQUFTOztBQU5hLE9BQXhCOztBQVVBcGIsYUFBT0QsT0FBUCxHQUFpQitXLGlCQUFqQjtBQUNDLEtBL0JlLEVBK0JkLEVBL0JjLENBaGtFd3hCLEVBK2xFbHlCLElBQUcsQ0FBQyxVQUFTdlYsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUMxQzs7Ozs7Ozs7OztBQVVBOztBQUVBLFVBQUltRyxlQUFlM0UsUUFBUSxFQUFSLENBQW5COztBQUVBOzs7OztBQUtBLFVBQUkwYSxtQkFBbUIvVixhQUFhSyxhQUFwQztBQUNBLFVBQUksa0JBQWtCLFlBQXRCLEVBQW9DO0FBQ2xDLFlBQUlFLHdCQUF3QmxGLFFBQVEsRUFBUixDQUE1QjtBQUNBMGEsMkJBQW1CeFYsc0JBQXNCRixhQUF6QztBQUNEOztBQUVEOzs7Ozs7QUFNQSxVQUFJTixvQkFBb0I7QUFDdEJsRixXQUFHa2IsaUJBQWlCLEdBQWpCLENBRG1CO0FBRXRCQyxjQUFNRCxpQkFBaUIsTUFBakIsQ0FGZ0I7QUFHdEJFLGlCQUFTRixpQkFBaUIsU0FBakIsQ0FIYTtBQUl0QkcsY0FBTUgsaUJBQWlCLE1BQWpCLENBSmdCO0FBS3RCSSxpQkFBU0osaUJBQWlCLFNBQWpCLENBTGE7QUFNdEJLLGVBQU9MLGlCQUFpQixPQUFqQixDQU5lO0FBT3RCTSxlQUFPTixpQkFBaUIsT0FBakIsQ0FQZTtBQVF0QmxJLFdBQUdrSSxpQkFBaUIsR0FBakIsQ0FSbUI7QUFTdEJPLGNBQU1QLGlCQUFpQixNQUFqQixDQVRnQjtBQVV0QlEsYUFBS1IsaUJBQWlCLEtBQWpCLENBVmlCO0FBV3RCUyxhQUFLVCxpQkFBaUIsS0FBakIsQ0FYaUI7QUFZdEJVLGFBQUtWLGlCQUFpQixLQUFqQixDQVppQjtBQWF0Qlcsb0JBQVlYLGlCQUFpQixZQUFqQixDQWJVO0FBY3RCWSxjQUFNWixpQkFBaUIsTUFBakIsQ0FkZ0I7QUFldEJhLFlBQUliLGlCQUFpQixJQUFqQixDQWZrQjtBQWdCdEJjLGdCQUFRZCxpQkFBaUIsUUFBakIsQ0FoQmM7QUFpQnRCZSxnQkFBUWYsaUJBQWlCLFFBQWpCLENBakJjO0FBa0J0QmdCLGlCQUFTaEIsaUJBQWlCLFNBQWpCLENBbEJhO0FBbUJ0QmlCLGNBQU1qQixpQkFBaUIsTUFBakIsQ0FuQmdCO0FBb0J0QjlhLGNBQU04YSxpQkFBaUIsTUFBakIsQ0FwQmdCO0FBcUJ0QmtCLGFBQUtsQixpQkFBaUIsS0FBakIsQ0FyQmlCO0FBc0J0Qm1CLGtCQUFVbkIsaUJBQWlCLFVBQWpCLENBdEJZO0FBdUJ0Qm9CLGNBQU1wQixpQkFBaUIsTUFBakIsQ0F2QmdCO0FBd0J0QnFCLGtCQUFVckIsaUJBQWlCLFVBQWpCLENBeEJZO0FBeUJ0QnNCLFlBQUl0QixpQkFBaUIsSUFBakIsQ0F6QmtCO0FBMEJ0QnVCLGFBQUt2QixpQkFBaUIsS0FBakIsQ0ExQmlCO0FBMkJ0QndCLGlCQUFTeEIsaUJBQWlCLFNBQWpCLENBM0JhO0FBNEJ0QnlCLGFBQUt6QixpQkFBaUIsS0FBakIsQ0E1QmlCO0FBNkJ0QjBCLGdCQUFRMUIsaUJBQWlCLFFBQWpCLENBN0JjO0FBOEJ0QjJCLGFBQUszQixpQkFBaUIsS0FBakIsQ0E5QmlCO0FBK0J0QjRCLFlBQUk1QixpQkFBaUIsSUFBakIsQ0EvQmtCO0FBZ0N0QjZCLFlBQUk3QixpQkFBaUIsSUFBakIsQ0FoQ2tCO0FBaUN0QjhCLFlBQUk5QixpQkFBaUIsSUFBakIsQ0FqQ2tCO0FBa0N0QitCLGVBQU8vQixpQkFBaUIsT0FBakIsQ0FsQ2U7QUFtQ3RCZ0Msa0JBQVVoQyxpQkFBaUIsVUFBakIsQ0FuQ1k7QUFvQ3RCaUMsb0JBQVlqQyxpQkFBaUIsWUFBakIsQ0FwQ1U7QUFxQ3RCa0MsZ0JBQVFsQyxpQkFBaUIsUUFBakIsQ0FyQ2M7QUFzQ3RCbUMsZ0JBQVFuQyxpQkFBaUIsUUFBakIsQ0F0Q2M7QUF1Q3RCb0MsY0FBTXBDLGlCQUFpQixNQUFqQixDQXZDZ0I7QUF3Q3RCcUMsWUFBSXJDLGlCQUFpQixJQUFqQixDQXhDa0I7QUF5Q3RCc0MsWUFBSXRDLGlCQUFpQixJQUFqQixDQXpDa0I7QUEwQ3RCdUMsWUFBSXZDLGlCQUFpQixJQUFqQixDQTFDa0I7QUEyQ3RCd0MsWUFBSXhDLGlCQUFpQixJQUFqQixDQTNDa0I7QUE0Q3RCeUMsWUFBSXpDLGlCQUFpQixJQUFqQixDQTVDa0I7QUE2Q3RCMEMsWUFBSTFDLGlCQUFpQixJQUFqQixDQTdDa0I7QUE4Q3RCMkMsY0FBTTNDLGlCQUFpQixNQUFqQixDQTlDZ0I7QUErQ3RCNEMsZ0JBQVE1QyxpQkFBaUIsUUFBakIsQ0EvQ2M7QUFnRHRCNkMsZ0JBQVE3QyxpQkFBaUIsUUFBakIsQ0FoRGM7QUFpRHRCOEMsWUFBSTlDLGlCQUFpQixJQUFqQixDQWpEa0I7QUFrRHRCK0MsY0FBTS9DLGlCQUFpQixNQUFqQixDQWxEZ0I7QUFtRHRCaGIsV0FBR2diLGlCQUFpQixHQUFqQixDQW5EbUI7QUFvRHRCZ0QsZ0JBQVFoRCxpQkFBaUIsUUFBakIsQ0FwRGM7QUFxRHRCaUQsYUFBS2pELGlCQUFpQixLQUFqQixDQXJEaUI7QUFzRHRCa0QsZUFBT2xELGlCQUFpQixPQUFqQixDQXREZTtBQXVEdEJtRCxhQUFLbkQsaUJBQWlCLEtBQWpCLENBdkRpQjtBQXdEdEJvRCxhQUFLcEQsaUJBQWlCLEtBQWpCLENBeERpQjtBQXlEdEJxRCxnQkFBUXJELGlCQUFpQixRQUFqQixDQXpEYztBQTBEdEJzRCxlQUFPdEQsaUJBQWlCLE9BQWpCLENBMURlO0FBMkR0QnVELGdCQUFRdkQsaUJBQWlCLFFBQWpCLENBM0RjO0FBNER0QndELFlBQUl4RCxpQkFBaUIsSUFBakIsQ0E1RGtCO0FBNkR0QnlELGNBQU16RCxpQkFBaUIsTUFBakIsQ0E3RGdCO0FBOER0QjBELGNBQU0xRCxpQkFBaUIsTUFBakIsQ0E5RGdCO0FBK0R0QmxWLGFBQUtrVixpQkFBaUIsS0FBakIsQ0EvRGlCO0FBZ0V0QjJELGNBQU0zRCxpQkFBaUIsTUFBakIsQ0FoRWdCO0FBaUV0QjRELGNBQU01RCxpQkFBaUIsTUFBakIsQ0FqRWdCO0FBa0V0QjZELGtCQUFVN0QsaUJBQWlCLFVBQWpCLENBbEVZO0FBbUV0QjhELGNBQU05RCxpQkFBaUIsTUFBakIsQ0FuRWdCO0FBb0V0QitELGVBQU8vRCxpQkFBaUIsT0FBakIsQ0FwRWU7QUFxRXRCZ0UsYUFBS2hFLGlCQUFpQixLQUFqQixDQXJFaUI7QUFzRXRCaUUsa0JBQVVqRSxpQkFBaUIsVUFBakIsQ0F0RVk7QUF1RXRCa0UsZ0JBQVFsRSxpQkFBaUIsUUFBakIsQ0F2RWM7QUF3RXRCbUUsWUFBSW5FLGlCQUFpQixJQUFqQixDQXhFa0I7QUF5RXRCb0Usa0JBQVVwRSxpQkFBaUIsVUFBakIsQ0F6RVk7QUEwRXRCcUUsZ0JBQVFyRSxpQkFBaUIsUUFBakIsQ0ExRWM7QUEyRXRCc0UsZ0JBQVF0RSxpQkFBaUIsUUFBakIsQ0EzRWM7QUE0RXRCdUUsV0FBR3ZFLGlCQUFpQixHQUFqQixDQTVFbUI7QUE2RXRCd0UsZUFBT3hFLGlCQUFpQixPQUFqQixDQTdFZTtBQThFdEJ5RSxpQkFBU3pFLGlCQUFpQixTQUFqQixDQTlFYTtBQStFdEIwRSxhQUFLMUUsaUJBQWlCLEtBQWpCLENBL0VpQjtBQWdGdEIyRSxrQkFBVTNFLGlCQUFpQixVQUFqQixDQWhGWTtBQWlGdEI0RSxXQUFHNUUsaUJBQWlCLEdBQWpCLENBakZtQjtBQWtGdEI2RSxZQUFJN0UsaUJBQWlCLElBQWpCLENBbEZrQjtBQW1GdEI4RSxZQUFJOUUsaUJBQWlCLElBQWpCLENBbkZrQjtBQW9GdEIrRSxjQUFNL0UsaUJBQWlCLE1BQWpCLENBcEZnQjtBQXFGdEJyYixXQUFHcWIsaUJBQWlCLEdBQWpCLENBckZtQjtBQXNGdEJnRixjQUFNaEYsaUJBQWlCLE1BQWpCLENBdEZnQjtBQXVGdEJpRixnQkFBUWpGLGlCQUFpQixRQUFqQixDQXZGYztBQXdGdEJrRixpQkFBU2xGLGlCQUFpQixTQUFqQixDQXhGYTtBQXlGdEJtRixnQkFBUW5GLGlCQUFpQixRQUFqQixDQXpGYztBQTBGdEJvRixlQUFPcEYsaUJBQWlCLE9BQWpCLENBMUZlO0FBMkZ0QjVFLGdCQUFRNEUsaUJBQWlCLFFBQWpCLENBM0ZjO0FBNEZ0QnFGLGNBQU1yRixpQkFBaUIsTUFBakIsQ0E1RmdCO0FBNkZ0QnNGLGdCQUFRdEYsaUJBQWlCLFFBQWpCLENBN0ZjO0FBOEZ0QjdaLGVBQU82WixpQkFBaUIsT0FBakIsQ0E5RmU7QUErRnRCdUYsYUFBS3ZGLGlCQUFpQixLQUFqQixDQS9GaUI7QUFnR3RCd0YsaUJBQVN4RixpQkFBaUIsU0FBakIsQ0FoR2E7QUFpR3RCeUYsYUFBS3pGLGlCQUFpQixLQUFqQixDQWpHaUI7QUFrR3RCMEYsZUFBTzFGLGlCQUFpQixPQUFqQixDQWxHZTtBQW1HdEIyRixlQUFPM0YsaUJBQWlCLE9BQWpCLENBbkdlO0FBb0d0QjRGLFlBQUk1RixpQkFBaUIsSUFBakIsQ0FwR2tCO0FBcUd0QjZGLGtCQUFVN0YsaUJBQWlCLFVBQWpCLENBckdZO0FBc0d0QjhGLGVBQU85RixpQkFBaUIsT0FBakIsQ0F0R2U7QUF1R3RCK0YsWUFBSS9GLGlCQUFpQixJQUFqQixDQXZHa0I7QUF3R3RCZ0csZUFBT2hHLGlCQUFpQixPQUFqQixDQXhHZTtBQXlHdEJpRyxjQUFNakcsaUJBQWlCLE1BQWpCLENBekdnQjtBQTBHdEJrRyxlQUFPbEcsaUJBQWlCLE9BQWpCLENBMUdlO0FBMkd0Qm1HLFlBQUluRyxpQkFBaUIsSUFBakIsQ0EzR2tCO0FBNEd0Qm9HLGVBQU9wRyxpQkFBaUIsT0FBakIsQ0E1R2U7QUE2R3RCbmIsV0FBR21iLGlCQUFpQixHQUFqQixDQTdHbUI7QUE4R3RCcUcsWUFBSXJHLGlCQUFpQixJQUFqQixDQTlHa0I7QUErR3RCLGVBQU9BLGlCQUFpQixLQUFqQixDQS9HZTtBQWdIdEJzRyxlQUFPdEcsaUJBQWlCLE9BQWpCLENBaEhlO0FBaUh0QnVHLGFBQUt2RyxpQkFBaUIsS0FBakIsQ0FqSGlCOztBQW1IdEI7QUFDQXdHLGdCQUFReEcsaUJBQWlCLFFBQWpCLENBcEhjO0FBcUh0QnlHLGtCQUFVekcsaUJBQWlCLFVBQWpCLENBckhZO0FBc0h0QjBHLGNBQU0xRyxpQkFBaUIsTUFBakIsQ0F0SGdCO0FBdUh0QjJHLGlCQUFTM0csaUJBQWlCLFNBQWpCLENBdkhhO0FBd0h0QjliLFdBQUc4YixpQkFBaUIsR0FBakIsQ0F4SG1CO0FBeUh0QjRHLGVBQU81RyxpQkFBaUIsT0FBakIsQ0F6SGU7QUEwSHRCNkcsY0FBTTdHLGlCQUFpQixNQUFqQixDQTFIZ0I7QUEySHRCOEcsd0JBQWdCOUcsaUJBQWlCLGdCQUFqQixDQTNITTtBQTRIdEIrRyxjQUFNL0csaUJBQWlCLE1BQWpCLENBNUhnQjtBQTZIdEJnSCxjQUFNaEgsaUJBQWlCLE1BQWpCLENBN0hnQjtBQThIdEJpSCxpQkFBU2pILGlCQUFpQixTQUFqQixDQTlIYTtBQStIdEJrSCxpQkFBU2xILGlCQUFpQixTQUFqQixDQS9IYTtBQWdJdEJtSCxrQkFBVW5ILGlCQUFpQixVQUFqQixDQWhJWTtBQWlJdEJvSCx3QkFBZ0JwSCxpQkFBaUIsZ0JBQWpCLENBaklNO0FBa0l0QnFILGNBQU1ySCxpQkFBaUIsTUFBakIsQ0FsSWdCO0FBbUl0QnNILGNBQU10SCxpQkFBaUIsTUFBakIsQ0FuSWdCO0FBb0l0QnVILGFBQUt2SCxpQkFBaUIsS0FBakIsQ0FwSWlCO0FBcUl0QnBOLGNBQU1vTixpQkFBaUIsTUFBakIsQ0FySWdCO0FBc0l0QndILGVBQU94SCxpQkFBaUIsT0FBakI7QUF0SWUsT0FBeEI7O0FBeUlBamMsYUFBT0QsT0FBUCxHQUFpQmtHLGlCQUFqQjtBQUNDLEtBMUtRLEVBMEtQLEVBQUMsTUFBSyxFQUFOLEVBQVMsTUFBSyxFQUFkLEVBMUtPLENBL2xFK3hCLEVBeXdFbnhCLElBQUcsQ0FBQyxVQUFTMUUsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUN6RDs7Ozs7Ozs7OztBQVVBOztBQUVBLFVBQUk2RixVQUFVckUsUUFBUSxFQUFSLENBQWQ7O0FBRUEsVUFBSXVWLG9CQUFvQnZWLFFBQVEsRUFBUixDQUF4Qjs7QUFFQSxVQUFJK0UsVUFBVS9FLFFBQVEsRUFBUixDQUFkO0FBQ0EsVUFBSTBVLG9CQUFvQjFVLFFBQVEsRUFBUixDQUF4QjtBQUNBLFVBQUlxQixpQkFBaUJtRyxPQUFPRCxTQUFQLENBQWlCbEcsY0FBdEM7O0FBRUEsVUFBSThnQixxQkFBcUJuaUIsUUFBUSxFQUFSLENBQXpCOztBQUVBLFVBQUlvaUIsaUJBQWlCO0FBQ25CN2dCLGFBQUssSUFEYztBQUVuQjhnQixhQUFLLElBRmM7QUFHbkJDLGdCQUFRLElBSFc7QUFJbkJDLGtCQUFVO0FBSlMsT0FBckI7O0FBT0EsVUFBSUMsMEJBQUosRUFBZ0NDLDBCQUFoQzs7QUFFQSxlQUFTQyxXQUFULENBQXFCQyxNQUFyQixFQUE2QjtBQUMzQixZQUFJLGtCQUFrQixZQUF0QixFQUFvQztBQUNsQyxjQUFJdGhCLGVBQWV2QixJQUFmLENBQW9CNmlCLE1BQXBCLEVBQTRCLEtBQTVCLENBQUosRUFBd0M7QUFDdEMsZ0JBQUlDLFNBQVNwYixPQUFPcWIsd0JBQVAsQ0FBZ0NGLE1BQWhDLEVBQXdDLEtBQXhDLEVBQStDdE4sR0FBNUQ7QUFDQSxnQkFBSXVOLFVBQVVBLE9BQU9FLGNBQXJCLEVBQXFDO0FBQ25DLHFCQUFPLEtBQVA7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxlQUFPSCxPQUFPTixHQUFQLEtBQWUvUCxTQUF0QjtBQUNEOztBQUVELGVBQVN5USxXQUFULENBQXFCSixNQUFyQixFQUE2QjtBQUMzQixZQUFJLGtCQUFrQixZQUF0QixFQUFvQztBQUNsQyxjQUFJdGhCLGVBQWV2QixJQUFmLENBQW9CNmlCLE1BQXBCLEVBQTRCLEtBQTVCLENBQUosRUFBd0M7QUFDdEMsZ0JBQUlDLFNBQVNwYixPQUFPcWIsd0JBQVAsQ0FBZ0NGLE1BQWhDLEVBQXdDLEtBQXhDLEVBQStDdE4sR0FBNUQ7QUFDQSxnQkFBSXVOLFVBQVVBLE9BQU9FLGNBQXJCLEVBQXFDO0FBQ25DLHFCQUFPLEtBQVA7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxlQUFPSCxPQUFPcGhCLEdBQVAsS0FBZStRLFNBQXRCO0FBQ0Q7O0FBRUQsZUFBUzBRLDBCQUFULENBQW9DemEsS0FBcEMsRUFBMkM2QixXQUEzQyxFQUF3RDtBQUN0RCxZQUFJNlksd0JBQXdCLFNBQXhCQSxxQkFBd0IsR0FBWTtBQUN0QyxjQUFJLENBQUNULDBCQUFMLEVBQWlDO0FBQy9CQSx5Q0FBNkIsSUFBN0I7QUFDQSw4QkFBa0IsWUFBbEIsR0FBaUN6ZCxRQUFRLEtBQVIsRUFBZSw4REFBOEQsZ0VBQTlELEdBQWlJLHNFQUFqSSxHQUEwTSwyQ0FBek4sRUFBc1FxRixXQUF0USxDQUFqQyxHQUFzVCxLQUFLLENBQTNUO0FBQ0Q7QUFDRixTQUxEO0FBTUE2WSw4QkFBc0JILGNBQXRCLEdBQXVDLElBQXZDO0FBQ0F0YixlQUFPNE4sY0FBUCxDQUFzQjdNLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DO0FBQ2xDOE0sZUFBSzROLHFCQUQ2QjtBQUVsQ25iLHdCQUFjO0FBRm9CLFNBQXBDO0FBSUQ7O0FBRUQsZUFBU29iLDBCQUFULENBQW9DM2EsS0FBcEMsRUFBMkM2QixXQUEzQyxFQUF3RDtBQUN0RCxZQUFJK1ksd0JBQXdCLFNBQXhCQSxxQkFBd0IsR0FBWTtBQUN0QyxjQUFJLENBQUNWLDBCQUFMLEVBQWlDO0FBQy9CQSx5Q0FBNkIsSUFBN0I7QUFDQSw4QkFBa0IsWUFBbEIsR0FBaUMxZCxRQUFRLEtBQVIsRUFBZSw4REFBOEQsZ0VBQTlELEdBQWlJLHNFQUFqSSxHQUEwTSwyQ0FBek4sRUFBc1FxRixXQUF0USxDQUFqQyxHQUFzVCxLQUFLLENBQTNUO0FBQ0Q7QUFDRixTQUxEO0FBTUErWSw4QkFBc0JMLGNBQXRCLEdBQXVDLElBQXZDO0FBQ0F0YixlQUFPNE4sY0FBUCxDQUFzQjdNLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DO0FBQ2xDOE0sZUFBSzhOLHFCQUQ2QjtBQUVsQ3JiLHdCQUFjO0FBRm9CLFNBQXBDO0FBSUQ7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLFVBQUluRCxlQUFlLFNBQWZBLFlBQWUsQ0FBVXVULElBQVYsRUFBZ0IzVyxHQUFoQixFQUFxQjhnQixHQUFyQixFQUEwQnRqQixJQUExQixFQUFnQytXLE1BQWhDLEVBQXdDMkQsS0FBeEMsRUFBK0NsUixLQUEvQyxFQUFzRDtBQUN2RSxZQUFJMFAsVUFBVTtBQUNaO0FBQ0FtTCxvQkFBVWpCLGtCQUZFOztBQUlaO0FBQ0FqSyxnQkFBTUEsSUFMTTtBQU1aM1csZUFBS0EsR0FOTztBQU9aOGdCLGVBQUtBLEdBUE87QUFRWjlaLGlCQUFPQSxLQVJLOztBQVVaO0FBQ0FtUixrQkFBUUQ7QUFYSSxTQUFkOztBQWNBLFlBQUksa0JBQWtCLFlBQXRCLEVBQW9DO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0F4QixrQkFBUW9MLE1BQVIsR0FBaUIsRUFBakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFJM08saUJBQUosRUFBdUI7QUFDckJsTixtQkFBTzROLGNBQVAsQ0FBc0I2QyxRQUFRb0wsTUFBOUIsRUFBc0MsV0FBdEMsRUFBbUQ7QUFDakR2Yiw0QkFBYyxLQURtQztBQUVqREYsMEJBQVksS0FGcUM7QUFHakRDLHdCQUFVLElBSHVDO0FBSWpERixxQkFBTztBQUowQyxhQUFuRDtBQU1BO0FBQ0FILG1CQUFPNE4sY0FBUCxDQUFzQjZDLE9BQXRCLEVBQStCLE9BQS9CLEVBQXdDO0FBQ3RDblEsNEJBQWMsS0FEd0I7QUFFdENGLDBCQUFZLEtBRjBCO0FBR3RDQyx3QkFBVSxLQUg0QjtBQUl0Q0YscUJBQU81STtBQUorQixhQUF4QztBQU1BO0FBQ0E7QUFDQXlJLG1CQUFPNE4sY0FBUCxDQUFzQjZDLE9BQXRCLEVBQStCLFNBQS9CLEVBQTBDO0FBQ3hDblEsNEJBQWMsS0FEMEI7QUFFeENGLDBCQUFZLEtBRjRCO0FBR3hDQyx3QkFBVSxLQUg4QjtBQUl4Q0YscUJBQU9tTztBQUppQyxhQUExQztBQU1ELFdBdEJELE1Bc0JPO0FBQ0xtQyxvQkFBUW9MLE1BQVIsQ0FBZUMsU0FBZixHQUEyQixLQUEzQjtBQUNBckwsb0JBQVFzTCxLQUFSLEdBQWdCeGtCLElBQWhCO0FBQ0FrWixvQkFBUU8sT0FBUixHQUFrQjFDLE1BQWxCO0FBQ0Q7QUFDRCxjQUFJdE8sT0FBT2djLE1BQVgsRUFBbUI7QUFDakJoYyxtQkFBT2djLE1BQVAsQ0FBY3ZMLFFBQVExUCxLQUF0QjtBQUNBZixtQkFBT2djLE1BQVAsQ0FBY3ZMLE9BQWQ7QUFDRDtBQUNGOztBQUVELGVBQU9BLE9BQVA7QUFDRCxPQTVERDs7QUE4REE7Ozs7QUFJQXRULG1CQUFhM0QsYUFBYixHQUE2QixVQUFVa1gsSUFBVixFQUFnQnlLLE1BQWhCLEVBQXdCMVYsUUFBeEIsRUFBa0M7QUFDN0QsWUFBSWdFLFFBQUo7O0FBRUE7QUFDQSxZQUFJMUksUUFBUSxFQUFaOztBQUVBLFlBQUloSCxNQUFNLElBQVY7QUFDQSxZQUFJOGdCLE1BQU0sSUFBVjtBQUNBLFlBQUl0akIsT0FBTyxJQUFYO0FBQ0EsWUFBSStXLFNBQVMsSUFBYjs7QUFFQSxZQUFJNk0sVUFBVSxJQUFkLEVBQW9CO0FBQ2xCLGNBQUlELFlBQVlDLE1BQVosQ0FBSixFQUF5QjtBQUN2Qk4sa0JBQU1NLE9BQU9OLEdBQWI7QUFDRDtBQUNELGNBQUlVLFlBQVlKLE1BQVosQ0FBSixFQUF5QjtBQUN2QnBoQixrQkFBTSxLQUFLb2hCLE9BQU9waEIsR0FBbEI7QUFDRDs7QUFFRHhDLGlCQUFPNGpCLE9BQU9MLE1BQVAsS0FBa0JoUSxTQUFsQixHQUE4QixJQUE5QixHQUFxQ3FRLE9BQU9MLE1BQW5EO0FBQ0F4TSxtQkFBUzZNLE9BQU9KLFFBQVAsS0FBb0JqUSxTQUFwQixHQUFnQyxJQUFoQyxHQUF1Q3FRLE9BQU9KLFFBQXZEO0FBQ0E7QUFDQSxlQUFLdFIsUUFBTCxJQUFpQjBSLE1BQWpCLEVBQXlCO0FBQ3ZCLGdCQUFJdGhCLGVBQWV2QixJQUFmLENBQW9CNmlCLE1BQXBCLEVBQTRCMVIsUUFBNUIsS0FBeUMsQ0FBQ21SLGVBQWUvZ0IsY0FBZixDQUE4QjRQLFFBQTlCLENBQTlDLEVBQXVGO0FBQ3JGMUksb0JBQU0wSSxRQUFOLElBQWtCMFIsT0FBTzFSLFFBQVAsQ0FBbEI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQ7QUFDQTtBQUNBLFlBQUl3UyxpQkFBaUJuZSxVQUFVdkYsTUFBVixHQUFtQixDQUF4QztBQUNBLFlBQUkwakIsbUJBQW1CLENBQXZCLEVBQTBCO0FBQ3hCbGIsZ0JBQU0wRSxRQUFOLEdBQWlCQSxRQUFqQjtBQUNELFNBRkQsTUFFTyxJQUFJd1csaUJBQWlCLENBQXJCLEVBQXdCO0FBQzdCLGNBQUlDLGFBQWEzYSxNQUFNMGEsY0FBTixDQUFqQjtBQUNBLGVBQUssSUFBSS9qQixJQUFJLENBQWIsRUFBZ0JBLElBQUkrakIsY0FBcEIsRUFBb0MvakIsR0FBcEMsRUFBeUM7QUFDdkNna0IsdUJBQVdoa0IsQ0FBWCxJQUFnQjRGLFVBQVU1RixJQUFJLENBQWQsQ0FBaEI7QUFDRDtBQUNELGNBQUksa0JBQWtCLFlBQXRCLEVBQW9DO0FBQ2xDLGdCQUFJOEgsT0FBT2djLE1BQVgsRUFBbUI7QUFDakJoYyxxQkFBT2djLE1BQVAsQ0FBY0UsVUFBZDtBQUNEO0FBQ0Y7QUFDRG5iLGdCQUFNMEUsUUFBTixHQUFpQnlXLFVBQWpCO0FBQ0Q7O0FBRUQ7QUFDQSxZQUFJeEwsUUFBUUEsS0FBSzNOLFlBQWpCLEVBQStCO0FBQzdCLGNBQUlBLGVBQWUyTixLQUFLM04sWUFBeEI7QUFDQSxlQUFLMEcsUUFBTCxJQUFpQjFHLFlBQWpCLEVBQStCO0FBQzdCLGdCQUFJaEMsTUFBTTBJLFFBQU4sTUFBb0JxQixTQUF4QixFQUFtQztBQUNqQy9KLG9CQUFNMEksUUFBTixJQUFrQjFHLGFBQWEwRyxRQUFiLENBQWxCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsWUFBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbEMsY0FBSTFQLE9BQU84Z0IsR0FBWCxFQUFnQjtBQUNkLGdCQUFJLE9BQU85WixNQUFNNmEsUUFBYixLQUEwQixXQUExQixJQUF5QzdhLE1BQU02YSxRQUFOLEtBQW1CakIsa0JBQWhFLEVBQW9GO0FBQ2xGLGtCQUFJL1gsY0FBYyxPQUFPOE4sSUFBUCxLQUFnQixVQUFoQixHQUE2QkEsS0FBSzlOLFdBQUwsSUFBb0I4TixLQUFLOU8sSUFBekIsSUFBaUMsU0FBOUQsR0FBMEU4TyxJQUE1RjtBQUNBLGtCQUFJM1csR0FBSixFQUFTO0FBQ1B5aEIsMkNBQTJCemEsS0FBM0IsRUFBa0M2QixXQUFsQztBQUNEO0FBQ0Qsa0JBQUlpWSxHQUFKLEVBQVM7QUFDUGEsMkNBQTJCM2EsS0FBM0IsRUFBa0M2QixXQUFsQztBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0QsZUFBT3pGLGFBQWF1VCxJQUFiLEVBQW1CM1csR0FBbkIsRUFBd0I4Z0IsR0FBeEIsRUFBNkJ0akIsSUFBN0IsRUFBbUMrVyxNQUFuQyxFQUEyQ1Asa0JBQWtCc0UsT0FBN0QsRUFBc0V0UixLQUF0RSxDQUFQO0FBQ0QsT0F0RUQ7O0FBd0VBOzs7O0FBSUE1RCxtQkFBYUssYUFBYixHQUE2QixVQUFVa1QsSUFBVixFQUFnQjtBQUMzQyxZQUFJeUwsVUFBVWhmLGFBQWEzRCxhQUFiLENBQTJCK1IsSUFBM0IsQ0FBZ0MsSUFBaEMsRUFBc0NtRixJQUF0QyxDQUFkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBeUwsZ0JBQVF6TCxJQUFSLEdBQWVBLElBQWY7QUFDQSxlQUFPeUwsT0FBUDtBQUNELE9BVEQ7O0FBV0FoZixtQkFBYWtLLGtCQUFiLEdBQWtDLFVBQVUrVSxVQUFWLEVBQXNCQyxNQUF0QixFQUE4QjtBQUM5RCxZQUFJQyxhQUFhbmYsYUFBYWlmLFdBQVcxTCxJQUF4QixFQUE4QjJMLE1BQTlCLEVBQXNDRCxXQUFXdkIsR0FBakQsRUFBc0R1QixXQUFXTCxLQUFqRSxFQUF3RUssV0FBV3BMLE9BQW5GLEVBQTRGb0wsV0FBV2xLLE1BQXZHLEVBQStHa0ssV0FBV3JiLEtBQTFILENBQWpCOztBQUVBLGVBQU91YixVQUFQO0FBQ0QsT0FKRDs7QUFNQTs7OztBQUlBbmYsbUJBQWFNLFlBQWIsR0FBNEIsVUFBVWdULE9BQVYsRUFBbUIwSyxNQUFuQixFQUEyQjFWLFFBQTNCLEVBQXFDO0FBQy9ELFlBQUlnRSxRQUFKOztBQUVBO0FBQ0EsWUFBSTFJLFFBQVFsRSxRQUFRLEVBQVIsRUFBWTRULFFBQVExUCxLQUFwQixDQUFaOztBQUVBO0FBQ0EsWUFBSWhILE1BQU0wVyxRQUFRMVcsR0FBbEI7QUFDQSxZQUFJOGdCLE1BQU1wSyxRQUFRb0ssR0FBbEI7QUFDQTtBQUNBLFlBQUl0akIsT0FBT2taLFFBQVFzTCxLQUFuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUl6TixTQUFTbUMsUUFBUU8sT0FBckI7O0FBRUE7QUFDQSxZQUFJaUIsUUFBUXhCLFFBQVF5QixNQUFwQjs7QUFFQSxZQUFJaUosVUFBVSxJQUFkLEVBQW9CO0FBQ2xCLGNBQUlELFlBQVlDLE1BQVosQ0FBSixFQUF5QjtBQUN2QjtBQUNBTixrQkFBTU0sT0FBT04sR0FBYjtBQUNBNUksb0JBQVFsRSxrQkFBa0JzRSxPQUExQjtBQUNEO0FBQ0QsY0FBSWtKLFlBQVlKLE1BQVosQ0FBSixFQUF5QjtBQUN2QnBoQixrQkFBTSxLQUFLb2hCLE9BQU9waEIsR0FBbEI7QUFDRDs7QUFFRDtBQUNBLGNBQUlnSixZQUFKO0FBQ0EsY0FBSTBOLFFBQVFDLElBQVIsSUFBZ0JELFFBQVFDLElBQVIsQ0FBYTNOLFlBQWpDLEVBQStDO0FBQzdDQSwyQkFBZTBOLFFBQVFDLElBQVIsQ0FBYTNOLFlBQTVCO0FBQ0Q7QUFDRCxlQUFLMEcsUUFBTCxJQUFpQjBSLE1BQWpCLEVBQXlCO0FBQ3ZCLGdCQUFJdGhCLGVBQWV2QixJQUFmLENBQW9CNmlCLE1BQXBCLEVBQTRCMVIsUUFBNUIsS0FBeUMsQ0FBQ21SLGVBQWUvZ0IsY0FBZixDQUE4QjRQLFFBQTlCLENBQTlDLEVBQXVGO0FBQ3JGLGtCQUFJMFIsT0FBTzFSLFFBQVAsTUFBcUJxQixTQUFyQixJQUFrQy9ILGlCQUFpQitILFNBQXZELEVBQWtFO0FBQ2hFO0FBQ0EvSixzQkFBTTBJLFFBQU4sSUFBa0IxRyxhQUFhMEcsUUFBYixDQUFsQjtBQUNELGVBSEQsTUFHTztBQUNMMUksc0JBQU0wSSxRQUFOLElBQWtCMFIsT0FBTzFSLFFBQVAsQ0FBbEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFRDtBQUNBO0FBQ0EsWUFBSXdTLGlCQUFpQm5lLFVBQVV2RixNQUFWLEdBQW1CLENBQXhDO0FBQ0EsWUFBSTBqQixtQkFBbUIsQ0FBdkIsRUFBMEI7QUFDeEJsYixnQkFBTTBFLFFBQU4sR0FBaUJBLFFBQWpCO0FBQ0QsU0FGRCxNQUVPLElBQUl3VyxpQkFBaUIsQ0FBckIsRUFBd0I7QUFDN0IsY0FBSUMsYUFBYTNhLE1BQU0wYSxjQUFOLENBQWpCO0FBQ0EsZUFBSyxJQUFJL2pCLElBQUksQ0FBYixFQUFnQkEsSUFBSStqQixjQUFwQixFQUFvQy9qQixHQUFwQyxFQUF5QztBQUN2Q2drQix1QkFBV2hrQixDQUFYLElBQWdCNEYsVUFBVTVGLElBQUksQ0FBZCxDQUFoQjtBQUNEO0FBQ0Q2SSxnQkFBTTBFLFFBQU4sR0FBaUJ5VyxVQUFqQjtBQUNEOztBQUVELGVBQU8vZSxhQUFhc1QsUUFBUUMsSUFBckIsRUFBMkIzVyxHQUEzQixFQUFnQzhnQixHQUFoQyxFQUFxQ3RqQixJQUFyQyxFQUEyQytXLE1BQTNDLEVBQW1EMkQsS0FBbkQsRUFBMERsUixLQUExRCxDQUFQO0FBQ0QsT0E1REQ7O0FBOERBOzs7Ozs7O0FBT0E1RCxtQkFBYW9CLGNBQWIsR0FBOEIsVUFBVTZZLE1BQVYsRUFBa0I7QUFDOUMsZUFBTyxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCQSxXQUFXLElBQXpDLElBQWlEQSxPQUFPd0UsUUFBUCxLQUFvQmpCLGtCQUE1RTtBQUNELE9BRkQ7O0FBSUExakIsYUFBT0QsT0FBUCxHQUFpQm1HLFlBQWpCO0FBQ0MsS0FyVnVCLEVBcVZ0QixFQUFDLE1BQUssRUFBTixFQUFTLE1BQUssRUFBZCxFQUFpQixNQUFLLEVBQXRCLEVBQXlCLE1BQUssRUFBOUIsRUFBaUMsTUFBSyxFQUF0QyxFQXJWc0IsQ0F6d0VneEIsRUE4bEYzdkIsSUFBRyxDQUFDLFVBQVMzRSxPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ2pGOzs7Ozs7Ozs7OztBQVdBOztBQUVBO0FBQ0E7O0FBRUEsVUFBSTJqQixxQkFBcUIsT0FBTzRCLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE9BQU8sS0FBUCxDQUFoQyxJQUFpREEsT0FBTyxLQUFQLEVBQWMsZUFBZCxDQUFqRCxJQUFtRixNQUE1Rzs7QUFFQXRsQixhQUFPRCxPQUFQLEdBQWlCMmpCLGtCQUFqQjtBQUNDLEtBcEIrQyxFQW9COUMsRUFwQjhDLENBOWxGd3ZCLEVBa25GbHlCLElBQUcsQ0FBQyxVQUFTbmlCLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDMUM7Ozs7Ozs7Ozs7QUFVQTs7Ozs7OztBQU9BOztBQUVBLFVBQUkrVyxvQkFBb0J2VixRQUFRLEVBQVIsQ0FBeEI7QUFDQSxVQUFJb1kseUJBQXlCcFksUUFBUSxFQUFSLENBQTdCO0FBQ0EsVUFBSTJFLGVBQWUzRSxRQUFRLEVBQVIsQ0FBbkI7O0FBRUEsVUFBSWdrQixxQkFBcUJoa0IsUUFBUSxFQUFSLENBQXpCOztBQUVBLFVBQUkwVSxvQkFBb0IxVSxRQUFRLEVBQVIsQ0FBeEI7QUFDQSxVQUFJaWtCLGdCQUFnQmprQixRQUFRLEVBQVIsQ0FBcEI7QUFDQSxVQUFJK0UsVUFBVS9FLFFBQVEsRUFBUixDQUFkOztBQUVBLGVBQVNra0IsMkJBQVQsR0FBdUM7QUFDckMsWUFBSTNPLGtCQUFrQnNFLE9BQXRCLEVBQStCO0FBQzdCLGNBQUl6USxPQUFPbU0sa0JBQWtCc0UsT0FBbEIsQ0FBMEJGLE9BQTFCLEVBQVg7QUFDQSxjQUFJdlEsSUFBSixFQUFVO0FBQ1IsbUJBQU8sa0NBQWtDQSxJQUFsQyxHQUF5QyxJQUFoRDtBQUNEO0FBQ0Y7QUFDRCxlQUFPLEVBQVA7QUFDRDs7QUFFRDs7Ozs7QUFLQSxVQUFJK2Esd0JBQXdCLEVBQTVCOztBQUVBLGVBQVNDLDRCQUFULENBQXNDQyxVQUF0QyxFQUFrRDtBQUNoRCxZQUFJbFAsT0FBTytPLDZCQUFYOztBQUVBLFlBQUksQ0FBQy9PLElBQUwsRUFBVztBQUNULGNBQUltUCxhQUFhLE9BQU9ELFVBQVAsS0FBc0IsUUFBdEIsR0FBaUNBLFVBQWpDLEdBQThDQSxXQUFXamEsV0FBWCxJQUEwQmlhLFdBQVdqYixJQUFwRztBQUNBLGNBQUlrYixVQUFKLEVBQWdCO0FBQ2RuUCxtQkFBTyw2Q0FBNkNtUCxVQUE3QyxHQUEwRCxJQUFqRTtBQUNEO0FBQ0Y7QUFDRCxlQUFPblAsSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7OztBQVdBLGVBQVNvUCxtQkFBVCxDQUE2QnRNLE9BQTdCLEVBQXNDb00sVUFBdEMsRUFBa0Q7QUFDaEQsWUFBSSxDQUFDcE0sUUFBUW9MLE1BQVQsSUFBbUJwTCxRQUFRb0wsTUFBUixDQUFlQyxTQUFsQyxJQUErQ3JMLFFBQVExVyxHQUFSLElBQWUsSUFBbEUsRUFBd0U7QUFDdEU7QUFDRDtBQUNEMFcsZ0JBQVFvTCxNQUFSLENBQWVDLFNBQWYsR0FBMkIsSUFBM0I7O0FBRUEsWUFBSWtCLFdBQVdMLHNCQUFzQk0sU0FBdEIsS0FBb0NOLHNCQUFzQk0sU0FBdEIsR0FBa0MsRUFBdEUsQ0FBZjs7QUFFQSxZQUFJQyw0QkFBNEJOLDZCQUE2QkMsVUFBN0IsQ0FBaEM7QUFDQSxZQUFJRyxTQUFTRSx5QkFBVCxDQUFKLEVBQXlDO0FBQ3ZDO0FBQ0Q7QUFDREYsaUJBQVNFLHlCQUFULElBQXNDLElBQXRDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUlDLGFBQWEsRUFBakI7QUFDQSxZQUFJMU0sV0FBV0EsUUFBUXlCLE1BQW5CLElBQTZCekIsUUFBUXlCLE1BQVIsS0FBbUJuRSxrQkFBa0JzRSxPQUF0RSxFQUErRTtBQUM3RTtBQUNBOEssdUJBQWEsaUNBQWlDMU0sUUFBUXlCLE1BQVIsQ0FBZUMsT0FBZixFQUFqQyxHQUE0RCxHQUF6RTtBQUNEOztBQUVELDBCQUFrQixZQUFsQixHQUFpQzVVLFFBQVEsS0FBUixFQUFlLHdFQUF3RSxtRUFBdkYsRUFBNEoyZix5QkFBNUosRUFBdUxDLFVBQXZMLEVBQW1Ndk0sdUJBQXVCbUIsdUJBQXZCLENBQStDdEIsT0FBL0MsQ0FBbk0sQ0FBakMsR0FBK1IsS0FBSyxDQUFwUztBQUNEOztBQUVEOzs7Ozs7Ozs7QUFTQSxlQUFTMk0saUJBQVQsQ0FBMkJwWixJQUEzQixFQUFpQzZZLFVBQWpDLEVBQTZDO0FBQzNDLFlBQUksUUFBTzdZLElBQVAseUNBQU9BLElBQVAsT0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUI7QUFDRDtBQUNELFlBQUl6QyxNQUFNMkYsT0FBTixDQUFjbEQsSUFBZCxDQUFKLEVBQXlCO0FBQ3ZCLGVBQUssSUFBSTlMLElBQUksQ0FBYixFQUFnQkEsSUFBSThMLEtBQUt6TCxNQUF6QixFQUFpQ0wsR0FBakMsRUFBc0M7QUFDcEMsZ0JBQUl5SixRQUFRcUMsS0FBSzlMLENBQUwsQ0FBWjtBQUNBLGdCQUFJaUYsYUFBYW9CLGNBQWIsQ0FBNEJvRCxLQUE1QixDQUFKLEVBQXdDO0FBQ3RDb2Isa0NBQW9CcGIsS0FBcEIsRUFBMkJrYixVQUEzQjtBQUNEO0FBQ0Y7QUFDRixTQVBELE1BT08sSUFBSTFmLGFBQWFvQixjQUFiLENBQTRCeUYsSUFBNUIsQ0FBSixFQUF1QztBQUM1QztBQUNBLGNBQUlBLEtBQUs2WCxNQUFULEVBQWlCO0FBQ2Y3WCxpQkFBSzZYLE1BQUwsQ0FBWUMsU0FBWixHQUF3QixJQUF4QjtBQUNEO0FBQ0YsU0FMTSxNQUtBLElBQUk5WCxJQUFKLEVBQVU7QUFDZixjQUFJcVosYUFBYVosY0FBY3pZLElBQWQsQ0FBakI7QUFDQTtBQUNBLGNBQUlxWixVQUFKLEVBQWdCO0FBQ2QsZ0JBQUlBLGVBQWVyWixLQUFLc1osT0FBeEIsRUFBaUM7QUFDL0Isa0JBQUlDLFdBQVdGLFdBQVcva0IsSUFBWCxDQUFnQjBMLElBQWhCLENBQWY7QUFDQSxrQkFBSXdaLElBQUo7QUFDQSxxQkFBTyxDQUFDLENBQUNBLE9BQU9ELFNBQVNFLElBQVQsRUFBUixFQUF5Qm5ZLElBQWpDLEVBQXVDO0FBQ3JDLG9CQUFJbkksYUFBYW9CLGNBQWIsQ0FBNEJpZixLQUFLcmQsS0FBakMsQ0FBSixFQUE2QztBQUMzQzRjLHNDQUFvQlMsS0FBS3JkLEtBQXpCLEVBQWdDMGMsVUFBaEM7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Y7O0FBRUQ7Ozs7OztBQU1BLGVBQVNhLGlCQUFULENBQTJCak4sT0FBM0IsRUFBb0M7QUFDbEMsWUFBSWtOLGlCQUFpQmxOLFFBQVFDLElBQTdCO0FBQ0EsWUFBSSxPQUFPaU4sY0FBUCxLQUEwQixVQUE5QixFQUEwQztBQUN4QztBQUNEO0FBQ0QsWUFBSS9iLE9BQU8rYixlQUFlL2EsV0FBZixJQUE4QithLGVBQWUvYixJQUF4RDtBQUNBLFlBQUkrYixlQUFlOWEsU0FBbkIsRUFBOEI7QUFDNUIyWiw2QkFBbUJtQixlQUFlOWEsU0FBbEMsRUFBNkM0TixRQUFRMVAsS0FBckQsRUFBNEQsTUFBNUQsRUFBb0VhLElBQXBFLEVBQTBFNk8sT0FBMUUsRUFBbUYsSUFBbkY7QUFDRDtBQUNELFlBQUksT0FBT2tOLGVBQWVuVixlQUF0QixLQUEwQyxVQUE5QyxFQUEwRDtBQUN4RCw0QkFBa0IsWUFBbEIsR0FBaUNqTCxRQUFRb2dCLGVBQWVuVixlQUFmLENBQStCb0Usb0JBQXZDLEVBQTZELCtEQUErRCxrRUFBNUgsQ0FBakMsR0FBbU8sS0FBSyxDQUF4TztBQUNEO0FBQ0Y7O0FBRUQsVUFBSWxQLHdCQUF3Qjs7QUFFMUJsRSx1QkFBZSx1QkFBVWtYLElBQVYsRUFBZ0IzUCxLQUFoQixFQUF1QjBFLFFBQXZCLEVBQWlDO0FBQzlDLGNBQUltWSxZQUFZLE9BQU9sTixJQUFQLEtBQWdCLFFBQWhCLElBQTRCLE9BQU9BLElBQVAsS0FBZ0IsVUFBNUQ7QUFDQTtBQUNBO0FBQ0EsY0FBSSxDQUFDa04sU0FBTCxFQUFnQjtBQUNkLGdCQUFJLE9BQU9sTixJQUFQLEtBQWdCLFVBQWhCLElBQThCLE9BQU9BLElBQVAsS0FBZ0IsUUFBbEQsRUFBNEQ7QUFDMUQsa0JBQUkvQyxPQUFPLEVBQVg7QUFDQSxrQkFBSStDLFNBQVM1RixTQUFULElBQXNCLFFBQU80RixJQUFQLHlDQUFPQSxJQUFQLE9BQWdCLFFBQWhCLElBQTRCQSxTQUFTLElBQXJDLElBQTZDMVEsT0FBTzRPLElBQVAsQ0FBWThCLElBQVosRUFBa0JuWSxNQUFsQixLQUE2QixDQUFwRyxFQUF1RztBQUNyR29WLHdCQUFRLCtEQUErRCxtQkFBdkU7QUFDRDtBQUNEQSxzQkFBUStPLDZCQUFSO0FBQ0EsZ0NBQWtCLFlBQWxCLEdBQWlDbmYsUUFBUSxLQUFSLEVBQWUsb0VBQW9FLDBEQUFwRSxHQUFpSSw0QkFBaEosRUFBOEttVCxRQUFRLElBQVIsR0FBZUEsSUFBZixVQUE2QkEsSUFBN0IseUNBQTZCQSxJQUE3QixDQUE5SyxFQUFpTi9DLElBQWpOLENBQWpDLEdBQTBQLEtBQUssQ0FBL1A7QUFDRDtBQUNGOztBQUVELGNBQUk4QyxVQUFVdFQsYUFBYTNELGFBQWIsQ0FBMkJxRSxLQUEzQixDQUFpQyxJQUFqQyxFQUF1Q0MsU0FBdkMsQ0FBZDs7QUFFQTtBQUNBO0FBQ0EsY0FBSTJTLFdBQVcsSUFBZixFQUFxQjtBQUNuQixtQkFBT0EsT0FBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFJbU4sU0FBSixFQUFlO0FBQ2IsaUJBQUssSUFBSTFsQixJQUFJLENBQWIsRUFBZ0JBLElBQUk0RixVQUFVdkYsTUFBOUIsRUFBc0NMLEdBQXRDLEVBQTJDO0FBQ3pDa2xCLGdDQUFrQnRmLFVBQVU1RixDQUFWLENBQWxCLEVBQWdDd1ksSUFBaEM7QUFDRDtBQUNGOztBQUVEZ04sNEJBQWtCak4sT0FBbEI7O0FBRUEsaUJBQU9BLE9BQVA7QUFDRCxTQXZDeUI7O0FBeUMxQmpULHVCQUFlLHVCQUFVa1QsSUFBVixFQUFnQjtBQUM3QixjQUFJbU4sbUJBQW1CbmdCLHNCQUFzQmxFLGFBQXRCLENBQW9DK1IsSUFBcEMsQ0FBeUMsSUFBekMsRUFBK0NtRixJQUEvQyxDQUF2QjtBQUNBO0FBQ0FtTiwyQkFBaUJuTixJQUFqQixHQUF3QkEsSUFBeEI7O0FBRUEsY0FBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbEMsZ0JBQUl4RCxpQkFBSixFQUF1QjtBQUNyQmxOLHFCQUFPNE4sY0FBUCxDQUFzQmlRLGdCQUF0QixFQUF3QyxNQUF4QyxFQUFnRDtBQUM5Q3pkLDRCQUFZLEtBRGtDO0FBRTlDeU4scUJBQUssZUFBWTtBQUNmLG9DQUFrQixZQUFsQixHQUFpQ3RRLFFBQVEsS0FBUixFQUFlLDJEQUEyRCxxQ0FBMUUsQ0FBakMsR0FBb0osS0FBSyxDQUF6SjtBQUNBeUMseUJBQU80TixjQUFQLENBQXNCLElBQXRCLEVBQTRCLE1BQTVCLEVBQW9DO0FBQ2xDek4sMkJBQU91UTtBQUQyQixtQkFBcEM7QUFHQSx5QkFBT0EsSUFBUDtBQUNEO0FBUjZDLGVBQWhEO0FBVUQ7QUFDRjs7QUFFRCxpQkFBT21OLGdCQUFQO0FBQ0QsU0E5RHlCOztBQWdFMUJwZ0Isc0JBQWMsc0JBQVVnVCxPQUFWLEVBQW1CMVAsS0FBbkIsRUFBMEIwRSxRQUExQixFQUFvQztBQUNoRCxjQUFJNlcsYUFBYW5mLGFBQWFNLFlBQWIsQ0FBMEJJLEtBQTFCLENBQWdDLElBQWhDLEVBQXNDQyxTQUF0QyxDQUFqQjtBQUNBLGVBQUssSUFBSTVGLElBQUksQ0FBYixFQUFnQkEsSUFBSTRGLFVBQVV2RixNQUE5QixFQUFzQ0wsR0FBdEMsRUFBMkM7QUFDekNrbEIsOEJBQWtCdGYsVUFBVTVGLENBQVYsQ0FBbEIsRUFBZ0Nva0IsV0FBVzVMLElBQTNDO0FBQ0Q7QUFDRGdOLDRCQUFrQnBCLFVBQWxCO0FBQ0EsaUJBQU9BLFVBQVA7QUFDRDs7QUF2RXlCLE9BQTVCOztBQTJFQXJsQixhQUFPRCxPQUFQLEdBQWlCMEcscUJBQWpCO0FBQ0MsS0ExT1EsRUEwT1AsRUFBQyxNQUFLLEVBQU4sRUFBUyxNQUFLLEVBQWQsRUFBaUIsTUFBSyxFQUF0QixFQUF5QixNQUFLLEVBQTlCLEVBQWlDLE1BQUssRUFBdEMsRUFBeUMsTUFBSyxFQUE5QyxFQUFpRCxNQUFLLEVBQXRELEVBMU9PLENBbG5GK3hCLEVBNDFGM3VCLElBQUcsQ0FBQyxVQUFTbEYsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUNqRzs7Ozs7Ozs7OztBQVVBOztBQUVBLFVBQUlpRSxpQkFBaUJ6QyxRQUFRLEVBQVIsQ0FBckI7O0FBRUEsVUFBSXNFLGdCQUFnQnRFLFFBQVEsQ0FBUixDQUFwQjtBQUNBLFVBQUkyRSxlQUFlM0UsUUFBUSxFQUFSLENBQW5COztBQUVBLFVBQUlrTixnQkFBZ0JsTixRQUFRLEVBQVIsQ0FBcEI7QUFDQSxVQUFJMEMsWUFBWTFDLFFBQVEsRUFBUixDQUFoQjtBQUNBLFVBQUkrRSxVQUFVL0UsUUFBUSxFQUFSLENBQWQ7O0FBRUE7Ozs7Ozs7O0FBUUEsVUFBSXNsQix1QkFBdUIsT0FBM0I7O0FBRUEsVUFBSUMscUJBQXFCLEtBQXpCOztBQUVBLFVBQUlDLGdCQUFnQjtBQUNsQjs7Ozs7QUFLQS9kLGdCQUFRLGdCQUFVbVgsTUFBVixFQUFrQjtBQUN4QixjQUFJLFFBQU9BLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBbEIsSUFBOEIsQ0FBQ0EsTUFBL0IsSUFBeUM3VixNQUFNMkYsT0FBTixDQUFja1EsTUFBZCxDQUE3QyxFQUFvRTtBQUNsRSw4QkFBa0IsWUFBbEIsR0FBaUM3WixRQUFRLEtBQVIsRUFBZSxtRUFBZixFQUFvRjZaLE1BQXBGLENBQWpDLEdBQStILEtBQUssQ0FBcEk7QUFDQSxtQkFBT0EsTUFBUDtBQUNEO0FBQ0QsY0FBSWphLGFBQWFvQixjQUFiLENBQTRCNlksTUFBNUIsQ0FBSixFQUF5QztBQUN2Qyw4QkFBa0IsWUFBbEIsR0FBaUM3WixRQUFRLEtBQVIsRUFBZSxnRUFBZ0UsMkJBQS9FLENBQWpDLEdBQStJLEtBQUssQ0FBcEo7QUFDQSxtQkFBTzZaLE1BQVA7QUFDRDs7QUFFRCxZQUFFQSxPQUFPNkcsUUFBUCxLQUFvQixDQUF0QixJQUEyQixrQkFBa0IsWUFBbEIsR0FBaUMvaUIsVUFBVSxLQUFWLEVBQWlCLDBIQUFqQixDQUFqQyxHQUFnTEQsZUFBZSxHQUFmLENBQTNNLEdBQWlPLEtBQUssQ0FBdE87O0FBRUEsY0FBSTZMLFNBQVMsRUFBYjs7QUFFQSxlQUFLLElBQUkvTSxHQUFULElBQWdCcWQsTUFBaEIsRUFBd0I7QUFDdEIsZ0JBQUksa0JBQWtCLFlBQXRCLEVBQW9DO0FBQ2xDLGtCQUFJLENBQUMyRyxrQkFBRCxJQUF1QkQscUJBQXFCdlAsSUFBckIsQ0FBMEJ4VSxHQUExQixDQUEzQixFQUEyRDtBQUN6RCxrQ0FBa0IsWUFBbEIsR0FBaUN3RCxRQUFRLEtBQVIsRUFBZSxpRUFBaUUsNENBQWhGLENBQWpDLEdBQWlLLEtBQUssQ0FBdEs7QUFDQXdnQixxQ0FBcUIsSUFBckI7QUFDRDtBQUNGO0FBQ0RqaEIsMEJBQWNxSyw0QkFBZCxDQUEyQ2lRLE9BQU9yZCxHQUFQLENBQTNDLEVBQXdEK00sTUFBeEQsRUFBZ0UvTSxHQUFoRSxFQUFxRTJMLGNBQWMwQixtQkFBbkY7QUFDRDs7QUFFRCxpQkFBT04sTUFBUDtBQUNEO0FBL0JpQixPQUFwQjs7QUFrQ0E3UCxhQUFPRCxPQUFQLEdBQWlCZ25CLGFBQWpCO0FBQ0MsS0FyRStELEVBcUU5RCxFQUFDLE1BQUssRUFBTixFQUFTLE1BQUssRUFBZCxFQUFpQixNQUFLLEVBQXRCLEVBQXlCLE1BQUssRUFBOUIsRUFBaUMsTUFBSyxFQUF0QyxFQUF5QyxLQUFJLENBQTdDLEVBckU4RCxDQTUxRnd1QixFQWk2RnJ2QixJQUFHLENBQUMsVUFBU3hsQixPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ3ZGOzs7Ozs7Ozs7O0FBVUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLFVBQUlRLFFBQVFnQixRQUFRLENBQVIsQ0FBWjs7QUFFQTs7Ozs7OztBQU9BLGVBQVNtQyxTQUFULENBQW1Cd0YsS0FBbkIsRUFBMEIrZCxhQUExQixFQUF5QztBQUN2QyxhQUFLL2QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBSytkLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUUEsZUFBU0MscUJBQVQsQ0FBK0JDLFFBQS9CLEVBQXlDO0FBQ3ZDLFlBQUlDLFNBQVM7QUFDWGxlLGlCQUFPaWUsYUFBYXRULFNBQWIsR0FBeUJ0VCxNQUFNZ0gsU0FBTixDQUFnQjhmLEdBQWhCLENBQW9CM2EsVUFBN0MsR0FBMER5YSxTQUFTemEsVUFEL0Q7QUFFWHVhLHlCQUFlMW1CLE1BQU1nSCxTQUFOLENBQWdCMEgsSUFBaEIsQ0FBcUJ2QztBQUZ6QixTQUFiO0FBSUEsZUFBT25NLE1BQU1nSCxTQUFOLENBQWdCOEUsS0FBaEIsQ0FBc0IrYSxNQUF0QixDQUFQO0FBQ0Q7O0FBRUQxakIsZ0JBQVU2RCxTQUFWLEdBQXNCO0FBQ3BCbVksY0FBTXdIO0FBRGMsT0FBdEI7O0FBSUFsbkIsYUFBT0QsT0FBUCxHQUFpQjJELFNBQWpCO0FBQ0MsS0F2RXFELEVBdUVwRCxFQUFDLEtBQUksQ0FBTCxFQXZFb0QsQ0FqNkZrdkIsRUF3K0Y3eEIsSUFBRyxDQUFDLFVBQVNuQyxPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQy9DOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsVUFBSXVHLFVBQVUvRSxRQUFRLEVBQVIsQ0FBZDs7QUFFQSxlQUFTK2xCLFFBQVQsQ0FBa0JDLGNBQWxCLEVBQWtDQyxVQUFsQyxFQUE4QztBQUM1QyxZQUFJLGtCQUFrQixZQUF0QixFQUFvQztBQUNsQyxjQUFJdmUsY0FBY3NlLGVBQWV0ZSxXQUFqQztBQUNBLDRCQUFrQixZQUFsQixHQUFpQzNDLFFBQVEsS0FBUixFQUFlLCtEQUErRCxnRUFBL0QsR0FBa0ksOERBQWpKLEVBQWlOa2hCLFVBQWpOLEVBQTZOQSxVQUE3TixFQUF5T3ZlLGdCQUFnQkEsWUFBWTBDLFdBQVosSUFBMkIxQyxZQUFZMEIsSUFBdkQsS0FBZ0UsWUFBelMsQ0FBakMsR0FBMFYsS0FBSyxDQUEvVjtBQUNEO0FBQ0Y7O0FBRUQ7OztBQUdBLFVBQUlpRyx1QkFBdUI7O0FBRXpCOzs7Ozs7O0FBT0E1QyxtQkFBVyxtQkFBVXVaLGNBQVYsRUFBMEI7QUFDbkMsaUJBQU8sS0FBUDtBQUNELFNBWHdCOztBQWF6Qjs7Ozs7Ozs7QUFRQWpTLHlCQUFpQix5QkFBVWlTLGNBQVYsRUFBMEJwUyxRQUExQixFQUFvQyxDQUFFLENBckI5Qjs7QUF1QnpCOzs7Ozs7Ozs7Ozs7O0FBYUFvQiw0QkFBb0IsNEJBQVVnUixjQUFWLEVBQTBCO0FBQzVDRCxtQkFBU0MsY0FBVCxFQUF5QixhQUF6QjtBQUNELFNBdEN3Qjs7QUF3Q3pCOzs7Ozs7Ozs7OztBQVdBbFMsNkJBQXFCLDZCQUFVa1MsY0FBVixFQUEwQkUsYUFBMUIsRUFBeUM7QUFDNURILG1CQUFTQyxjQUFULEVBQXlCLGNBQXpCO0FBQ0QsU0FyRHdCOztBQXVEekI7Ozs7Ozs7Ozs7QUFVQWxSLHlCQUFpQix5QkFBVWtSLGNBQVYsRUFBMEJuUixZQUExQixFQUF3QztBQUN2RGtSLG1CQUFTQyxjQUFULEVBQXlCLFVBQXpCO0FBQ0Q7QUFuRXdCLE9BQTNCOztBQXNFQXZuQixhQUFPRCxPQUFQLEdBQWlCNlEsb0JBQWpCO0FBQ0MsS0FoR2EsRUFnR1osRUFBQyxNQUFLLEVBQU4sRUFoR1ksQ0F4K0YweEIsRUF3a0czeEIsSUFBRyxDQUFDLFVBQVNyUCxPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ2pEOzs7Ozs7Ozs7OztBQVdBOztBQUVBLFVBQUk0USw2QkFBNkIsRUFBakM7O0FBRUEsVUFBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbENBLHFDQUE2QjtBQUMzQitXLGdCQUFNLE1BRHFCO0FBRTNCeFksbUJBQVMsU0FGa0I7QUFHM0J5WSx3QkFBYztBQUhhLFNBQTdCO0FBS0Q7O0FBRUQzbkIsYUFBT0QsT0FBUCxHQUFpQjRRLDBCQUFqQjtBQUNDLEtBekJlLEVBeUJkLEVBekJjLENBeGtHd3hCLEVBaW1HbHlCLElBQUcsQ0FBQyxVQUFTcFAsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUMxQzs7Ozs7Ozs7OztBQVVBOztBQUVBLFVBQUltRyxlQUFlM0UsUUFBUSxFQUFSLENBQW5CO0FBQ0EsVUFBSW9QLDZCQUE2QnBQLFFBQVEsRUFBUixDQUFqQztBQUNBLFVBQUlxbUIsdUJBQXVCcm1CLFFBQVEsRUFBUixDQUEzQjs7QUFFQSxVQUFJa04sZ0JBQWdCbE4sUUFBUSxFQUFSLENBQXBCO0FBQ0EsVUFBSWlrQixnQkFBZ0Jqa0IsUUFBUSxFQUFSLENBQXBCO0FBQ0EsVUFBSStFLFVBQVUvRSxRQUFRLEVBQVIsQ0FBZDs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQ0EsVUFBSXNtQixZQUFZLGVBQWhCOztBQUVBLFVBQUkxaEIsaUJBQWlCO0FBQ25Ca0ssZUFBT3lYLDJCQUEyQixPQUEzQixDQURZO0FBRW5CamMsY0FBTWljLDJCQUEyQixTQUEzQixDQUZhO0FBR25CN1ksY0FBTTZZLDJCQUEyQixVQUEzQixDQUhhO0FBSW5CbmIsZ0JBQVFtYiwyQkFBMkIsUUFBM0IsQ0FKVztBQUtuQjNILGdCQUFRMkgsMkJBQTJCLFFBQTNCLENBTFc7QUFNbkIxYixnQkFBUTBiLDJCQUEyQixRQUEzQixDQU5XO0FBT25CQyxnQkFBUUQsMkJBQTJCLFFBQTNCLENBUFc7O0FBU25CVCxhQUFLVyxzQkFUYztBQVVuQkMsaUJBQVNDLHdCQVZVO0FBV25CMU8saUJBQVMyTywwQkFYVTtBQVluQkMsb0JBQVlDLHlCQVpPO0FBYW5CdGIsY0FBTXViLG1CQWJhO0FBY25CQyxrQkFBVUMseUJBZFM7QUFlbkJDLGVBQU9DLHFCQWZZO0FBZ0JuQnZjLG1CQUFXd2Msc0JBaEJRO0FBaUJuQnRjLGVBQU91YztBQWpCWSxPQUFyQjs7QUFvQkE7Ozs7QUFJQTtBQUNBLGVBQVNDLEVBQVQsQ0FBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCO0FBQ2hCO0FBQ0EsWUFBSUQsTUFBTUMsQ0FBVixFQUFhO0FBQ1g7QUFDQTtBQUNBLGlCQUFPRCxNQUFNLENBQU4sSUFBVyxJQUFJQSxDQUFKLEtBQVUsSUFBSUMsQ0FBaEM7QUFDRCxTQUpELE1BSU87QUFDTDtBQUNBLGlCQUFPRCxNQUFNQSxDQUFOLElBQVdDLE1BQU1BLENBQXhCO0FBQ0Q7QUFDRjtBQUNEOztBQUVBOzs7Ozs7O0FBT0EsZUFBU0MsYUFBVCxDQUF1QkMsT0FBdkIsRUFBZ0M7QUFDOUIsYUFBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFDRDtBQUNEO0FBQ0FGLG9CQUFjbGdCLFNBQWQsR0FBMEI1SCxNQUFNNEgsU0FBaEM7O0FBRUEsZUFBU3FnQiwwQkFBVCxDQUFvQ0MsUUFBcEMsRUFBOEM7QUFDNUMsWUFBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbEMsY0FBSUMsMEJBQTBCLEVBQTlCO0FBQ0Q7QUFDRCxpQkFBU0MsU0FBVCxDQUFtQjVjLFVBQW5CLEVBQStCNUMsS0FBL0IsRUFBc0MwSSxRQUF0QyxFQUFnRGtDLGFBQWhELEVBQStEbkMsUUFBL0QsRUFBeUVnWCxZQUF6RSxFQUF1RkMsTUFBdkYsRUFBK0Y7QUFDN0Y5VSwwQkFBZ0JBLGlCQUFpQm1ULFNBQWpDO0FBQ0EwQix5QkFBZUEsZ0JBQWdCL1csUUFBL0I7QUFDQSxjQUFJLGtCQUFrQixZQUF0QixFQUFvQztBQUNsQyxnQkFBSWdYLFdBQVc1QixvQkFBWCxJQUFtQyxPQUFPNkIsT0FBUCxLQUFtQixXQUExRCxFQUF1RTtBQUNyRSxrQkFBSUMsV0FBV2hWLGdCQUFnQixHQUFoQixHQUFzQmxDLFFBQXJDO0FBQ0Esa0JBQUksQ0FBQzZXLHdCQUF3QkssUUFBeEIsQ0FBTCxFQUF3QztBQUN0QyxrQ0FBa0IsWUFBbEIsR0FBaUNwakIsUUFBUSxLQUFSLEVBQWUsMkRBQTJELHlEQUEzRCxHQUF1SCwrREFBdkgsR0FBeUwsZ0VBQXpMLEdBQTRQLCtEQUE1UCxHQUE4VCxjQUE3VSxFQUE2VmlqQixZQUE3VixFQUEyVzdVLGFBQTNXLENBQWpDLEdBQTZaLEtBQUssQ0FBbGE7QUFDQTJVLHdDQUF3QkssUUFBeEIsSUFBb0MsSUFBcEM7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxjQUFJNWYsTUFBTTBJLFFBQU4sS0FBbUIsSUFBdkIsRUFBNkI7QUFDM0IsZ0JBQUltWCxlQUFlaFosMkJBQTJCNEIsUUFBM0IsQ0FBbkI7QUFDQSxnQkFBSTdGLFVBQUosRUFBZ0I7QUFDZCxrQkFBSTVDLE1BQU0wSSxRQUFOLE1BQW9CLElBQXhCLEVBQThCO0FBQzVCLHVCQUFPLElBQUl3VyxhQUFKLENBQWtCLFNBQVNXLFlBQVQsR0FBd0IsSUFBeEIsR0FBK0JKLFlBQS9CLEdBQThDLDBCQUE5QyxJQUE0RSxTQUFTN1UsYUFBVCxHQUF5Qiw2QkFBckcsQ0FBbEIsQ0FBUDtBQUNEO0FBQ0QscUJBQU8sSUFBSXNVLGFBQUosQ0FBa0IsU0FBU1csWUFBVCxHQUF3QixJQUF4QixHQUErQkosWUFBL0IsR0FBOEMsNkJBQTlDLElBQStFLE1BQU03VSxhQUFOLEdBQXNCLGtDQUFyRyxDQUFsQixDQUFQO0FBQ0Q7QUFDRCxtQkFBTyxJQUFQO0FBQ0QsV0FURCxNQVNPO0FBQ0wsbUJBQU8wVSxTQUFTdGYsS0FBVCxFQUFnQjBJLFFBQWhCLEVBQTBCa0MsYUFBMUIsRUFBeUNuQyxRQUF6QyxFQUFtRGdYLFlBQW5ELENBQVA7QUFDRDtBQUNGOztBQUVELFlBQUlLLG1CQUFtQk4sVUFBVWhWLElBQVYsQ0FBZSxJQUFmLEVBQXFCLEtBQXJCLENBQXZCO0FBQ0FzVix5QkFBaUJsZCxVQUFqQixHQUE4QjRjLFVBQVVoVixJQUFWLENBQWUsSUFBZixFQUFxQixJQUFyQixDQUE5Qjs7QUFFQSxlQUFPc1YsZ0JBQVA7QUFDRDs7QUFFRCxlQUFTOUIsMEJBQVQsQ0FBb0MrQixZQUFwQyxFQUFrRDtBQUNoRCxpQkFBU1QsUUFBVCxDQUFrQnRmLEtBQWxCLEVBQXlCMEksUUFBekIsRUFBbUNrQyxhQUFuQyxFQUFrRG5DLFFBQWxELEVBQTREZ1gsWUFBNUQsRUFBMEVDLE1BQTFFLEVBQWtGO0FBQ2hGLGNBQUlNLFlBQVloZ0IsTUFBTTBJLFFBQU4sQ0FBaEI7QUFDQSxjQUFJdVgsV0FBV0MsWUFBWUYsU0FBWixDQUFmO0FBQ0EsY0FBSUMsYUFBYUYsWUFBakIsRUFBK0I7QUFDN0IsZ0JBQUlGLGVBQWVoWiwyQkFBMkI0QixRQUEzQixDQUFuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFJMFgsY0FBY0MsZUFBZUosU0FBZixDQUFsQjs7QUFFQSxtQkFBTyxJQUFJZCxhQUFKLENBQWtCLGFBQWFXLFlBQWIsR0FBNEIsSUFBNUIsR0FBbUNKLFlBQW5DLEdBQWtELFlBQWxELElBQWtFLE1BQU1VLFdBQU4sR0FBb0IsaUJBQXBCLEdBQXdDdlYsYUFBeEMsR0FBd0QsY0FBMUgsS0FBNkksTUFBTW1WLFlBQU4sR0FBcUIsSUFBbEssQ0FBbEIsQ0FBUDtBQUNEO0FBQ0QsaUJBQU8sSUFBUDtBQUNEO0FBQ0QsZUFBT1YsMkJBQTJCQyxRQUEzQixDQUFQO0FBQ0Q7O0FBRUQsZUFBU3BCLG9CQUFULEdBQWdDO0FBQzlCLGVBQU9tQiwyQkFBMkIxYSxjQUFjMGIsV0FBZCxDQUEwQixJQUExQixDQUEzQixDQUFQO0FBQ0Q7O0FBRUQsZUFBU2pDLHdCQUFULENBQWtDa0MsV0FBbEMsRUFBK0M7QUFDN0MsaUJBQVNoQixRQUFULENBQWtCdGYsS0FBbEIsRUFBeUIwSSxRQUF6QixFQUFtQ2tDLGFBQW5DLEVBQWtEbkMsUUFBbEQsRUFBNERnWCxZQUE1RCxFQUEwRTtBQUN4RSxjQUFJLE9BQU9hLFdBQVAsS0FBdUIsVUFBM0IsRUFBdUM7QUFDckMsbUJBQU8sSUFBSXBCLGFBQUosQ0FBa0IsZUFBZU8sWUFBZixHQUE4QixrQkFBOUIsR0FBbUQ3VSxhQUFuRCxHQUFtRSxpREFBckYsQ0FBUDtBQUNEO0FBQ0QsY0FBSW9WLFlBQVloZ0IsTUFBTTBJLFFBQU4sQ0FBaEI7QUFDQSxjQUFJLENBQUNsSSxNQUFNMkYsT0FBTixDQUFjNlosU0FBZCxDQUFMLEVBQStCO0FBQzdCLGdCQUFJSCxlQUFlaFosMkJBQTJCNEIsUUFBM0IsQ0FBbkI7QUFDQSxnQkFBSXdYLFdBQVdDLFlBQVlGLFNBQVosQ0FBZjtBQUNBLG1CQUFPLElBQUlkLGFBQUosQ0FBa0IsYUFBYVcsWUFBYixHQUE0QixJQUE1QixHQUFtQ0osWUFBbkMsR0FBa0QsWUFBbEQsSUFBa0UsTUFBTVEsUUFBTixHQUFpQixpQkFBakIsR0FBcUNyVixhQUFyQyxHQUFxRCx1QkFBdkgsQ0FBbEIsQ0FBUDtBQUNEO0FBQ0QsZUFBSyxJQUFJelQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJNm9CLFVBQVV4b0IsTUFBOUIsRUFBc0NMLEdBQXRDLEVBQTJDO0FBQ3pDLGdCQUFJb3BCLFFBQVFELFlBQVlOLFNBQVosRUFBdUI3b0IsQ0FBdkIsRUFBMEJ5VCxhQUExQixFQUF5Q25DLFFBQXpDLEVBQW1EZ1gsZUFBZSxHQUFmLEdBQXFCdG9CLENBQXJCLEdBQXlCLEdBQTVFLEVBQWlGMm1CLG9CQUFqRixDQUFaO0FBQ0EsZ0JBQUl5QyxpQkFBaUJucEIsS0FBckIsRUFBNEI7QUFDMUIscUJBQU9tcEIsS0FBUDtBQUNEO0FBQ0Y7QUFDRCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRCxlQUFPbEIsMkJBQTJCQyxRQUEzQixDQUFQO0FBQ0Q7O0FBRUQsZUFBU2pCLHdCQUFULEdBQW9DO0FBQ2xDLGlCQUFTaUIsUUFBVCxDQUFrQnRmLEtBQWxCLEVBQXlCMEksUUFBekIsRUFBbUNrQyxhQUFuQyxFQUFrRG5DLFFBQWxELEVBQTREZ1gsWUFBNUQsRUFBMEU7QUFDeEUsY0FBSU8sWUFBWWhnQixNQUFNMEksUUFBTixDQUFoQjtBQUNBLGNBQUksQ0FBQ3RNLGFBQWFvQixjQUFiLENBQTRCd2lCLFNBQTVCLENBQUwsRUFBNkM7QUFDM0MsZ0JBQUlILGVBQWVoWiwyQkFBMkI0QixRQUEzQixDQUFuQjtBQUNBLGdCQUFJd1gsV0FBV0MsWUFBWUYsU0FBWixDQUFmO0FBQ0EsbUJBQU8sSUFBSWQsYUFBSixDQUFrQixhQUFhVyxZQUFiLEdBQTRCLElBQTVCLEdBQW1DSixZQUFuQyxHQUFrRCxZQUFsRCxJQUFrRSxNQUFNUSxRQUFOLEdBQWlCLGlCQUFqQixHQUFxQ3JWLGFBQXJDLEdBQXFELG9DQUF2SCxDQUFsQixDQUFQO0FBQ0Q7QUFDRCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRCxlQUFPeVUsMkJBQTJCQyxRQUEzQixDQUFQO0FBQ0Q7O0FBRUQsZUFBU2YseUJBQVQsQ0FBbUNpQyxhQUFuQyxFQUFrRDtBQUNoRCxpQkFBU2xCLFFBQVQsQ0FBa0J0ZixLQUFsQixFQUF5QjBJLFFBQXpCLEVBQW1Da0MsYUFBbkMsRUFBa0RuQyxRQUFsRCxFQUE0RGdYLFlBQTVELEVBQTBFO0FBQ3hFLGNBQUksRUFBRXpmLE1BQU0wSSxRQUFOLGFBQTJCOFgsYUFBN0IsQ0FBSixFQUFpRDtBQUMvQyxnQkFBSVgsZUFBZWhaLDJCQUEyQjRCLFFBQTNCLENBQW5CO0FBQ0EsZ0JBQUlnWSxvQkFBb0JELGNBQWMzZixJQUFkLElBQXNCa2QsU0FBOUM7QUFDQSxnQkFBSTJDLGtCQUFrQkMsYUFBYTNnQixNQUFNMEksUUFBTixDQUFiLENBQXRCO0FBQ0EsbUJBQU8sSUFBSXdXLGFBQUosQ0FBa0IsYUFBYVcsWUFBYixHQUE0QixJQUE1QixHQUFtQ0osWUFBbkMsR0FBa0QsWUFBbEQsSUFBa0UsTUFBTWlCLGVBQU4sR0FBd0IsaUJBQXhCLEdBQTRDOVYsYUFBNUMsR0FBNEQsY0FBOUgsS0FBaUosa0JBQWtCNlYsaUJBQWxCLEdBQXNDLElBQXZMLENBQWxCLENBQVA7QUFDRDtBQUNELGlCQUFPLElBQVA7QUFDRDtBQUNELGVBQU9wQiwyQkFBMkJDLFFBQTNCLENBQVA7QUFDRDs7QUFFRCxlQUFTVixxQkFBVCxDQUErQmdDLGNBQS9CLEVBQStDO0FBQzdDLFlBQUksQ0FBQ3BnQixNQUFNMkYsT0FBTixDQUFjeWEsY0FBZCxDQUFMLEVBQW9DO0FBQ2xDLDRCQUFrQixZQUFsQixHQUFpQ3BrQixRQUFRLEtBQVIsRUFBZSxvRUFBZixDQUFqQyxHQUF3SCxLQUFLLENBQTdIO0FBQ0EsaUJBQU9tSSxjQUFja2MsZUFBckI7QUFDRDs7QUFFRCxpQkFBU3ZCLFFBQVQsQ0FBa0J0ZixLQUFsQixFQUF5QjBJLFFBQXpCLEVBQW1Da0MsYUFBbkMsRUFBa0RuQyxRQUFsRCxFQUE0RGdYLFlBQTVELEVBQTBFO0FBQ3hFLGNBQUlPLFlBQVloZ0IsTUFBTTBJLFFBQU4sQ0FBaEI7QUFDQSxlQUFLLElBQUl2UixJQUFJLENBQWIsRUFBZ0JBLElBQUl5cEIsZUFBZXBwQixNQUFuQyxFQUEyQ0wsR0FBM0MsRUFBZ0Q7QUFDOUMsZ0JBQUk0bkIsR0FBR2lCLFNBQUgsRUFBY1ksZUFBZXpwQixDQUFmLENBQWQsQ0FBSixFQUFzQztBQUNwQyxxQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7QUFFRCxjQUFJMG9CLGVBQWVoWiwyQkFBMkI0QixRQUEzQixDQUFuQjtBQUNBLGNBQUlxWSxlQUFlQyxLQUFLQyxTQUFMLENBQWVKLGNBQWYsQ0FBbkI7QUFDQSxpQkFBTyxJQUFJMUIsYUFBSixDQUFrQixhQUFhVyxZQUFiLEdBQTRCLElBQTVCLEdBQW1DSixZQUFuQyxHQUFrRCxjQUFsRCxHQUFtRU8sU0FBbkUsR0FBK0UsSUFBL0UsSUFBdUYsa0JBQWtCcFYsYUFBbEIsR0FBa0MscUJBQWxDLEdBQTBEa1csWUFBMUQsR0FBeUUsR0FBaEssQ0FBbEIsQ0FBUDtBQUNEO0FBQ0QsZUFBT3pCLDJCQUEyQkMsUUFBM0IsQ0FBUDtBQUNEOztBQUVELGVBQVNaLHlCQUFULENBQW1DNEIsV0FBbkMsRUFBZ0Q7QUFDOUMsaUJBQVNoQixRQUFULENBQWtCdGYsS0FBbEIsRUFBeUIwSSxRQUF6QixFQUFtQ2tDLGFBQW5DLEVBQWtEbkMsUUFBbEQsRUFBNERnWCxZQUE1RCxFQUEwRTtBQUN4RSxjQUFJLE9BQU9hLFdBQVAsS0FBdUIsVUFBM0IsRUFBdUM7QUFDckMsbUJBQU8sSUFBSXBCLGFBQUosQ0FBa0IsZUFBZU8sWUFBZixHQUE4QixrQkFBOUIsR0FBbUQ3VSxhQUFuRCxHQUFtRSxrREFBckYsQ0FBUDtBQUNEO0FBQ0QsY0FBSW9WLFlBQVloZ0IsTUFBTTBJLFFBQU4sQ0FBaEI7QUFDQSxjQUFJdVgsV0FBV0MsWUFBWUYsU0FBWixDQUFmO0FBQ0EsY0FBSUMsYUFBYSxRQUFqQixFQUEyQjtBQUN6QixnQkFBSUosZUFBZWhaLDJCQUEyQjRCLFFBQTNCLENBQW5CO0FBQ0EsbUJBQU8sSUFBSXlXLGFBQUosQ0FBa0IsYUFBYVcsWUFBYixHQUE0QixJQUE1QixHQUFtQ0osWUFBbkMsR0FBa0QsWUFBbEQsSUFBa0UsTUFBTVEsUUFBTixHQUFpQixpQkFBakIsR0FBcUNyVixhQUFyQyxHQUFxRCx3QkFBdkgsQ0FBbEIsQ0FBUDtBQUNEO0FBQ0QsZUFBSyxJQUFJNVIsR0FBVCxJQUFnQmduQixTQUFoQixFQUEyQjtBQUN6QixnQkFBSUEsVUFBVWxuQixjQUFWLENBQXlCRSxHQUF6QixDQUFKLEVBQW1DO0FBQ2pDLGtCQUFJdW5CLFFBQVFELFlBQVlOLFNBQVosRUFBdUJobkIsR0FBdkIsRUFBNEI0UixhQUE1QixFQUEyQ25DLFFBQTNDLEVBQXFEZ1gsZUFBZSxHQUFmLEdBQXFCem1CLEdBQTFFLEVBQStFOGtCLG9CQUEvRSxDQUFaO0FBQ0Esa0JBQUl5QyxpQkFBaUJucEIsS0FBckIsRUFBNEI7QUFDMUIsdUJBQU9tcEIsS0FBUDtBQUNEO0FBQ0Y7QUFDRjtBQUNELGlCQUFPLElBQVA7QUFDRDtBQUNELGVBQU9sQiwyQkFBMkJDLFFBQTNCLENBQVA7QUFDRDs7QUFFRCxlQUFTVCxzQkFBVCxDQUFnQ29DLG1CQUFoQyxFQUFxRDtBQUNuRCxZQUFJLENBQUN6Z0IsTUFBTTJGLE9BQU4sQ0FBYzhhLG1CQUFkLENBQUwsRUFBeUM7QUFDdkMsNEJBQWtCLFlBQWxCLEdBQWlDemtCLFFBQVEsS0FBUixFQUFlLHdFQUFmLENBQWpDLEdBQTRILEtBQUssQ0FBakk7QUFDQSxpQkFBT21JLGNBQWNrYyxlQUFyQjtBQUNEOztBQUVELGlCQUFTdkIsUUFBVCxDQUFrQnRmLEtBQWxCLEVBQXlCMEksUUFBekIsRUFBbUNrQyxhQUFuQyxFQUFrRG5DLFFBQWxELEVBQTREZ1gsWUFBNUQsRUFBMEU7QUFDeEUsZUFBSyxJQUFJdG9CLElBQUksQ0FBYixFQUFnQkEsSUFBSThwQixvQkFBb0J6cEIsTUFBeEMsRUFBZ0RMLEdBQWhELEVBQXFEO0FBQ25ELGdCQUFJK3BCLFVBQVVELG9CQUFvQjlwQixDQUFwQixDQUFkO0FBQ0EsZ0JBQUkrcEIsUUFBUWxoQixLQUFSLEVBQWUwSSxRQUFmLEVBQXlCa0MsYUFBekIsRUFBd0NuQyxRQUF4QyxFQUFrRGdYLFlBQWxELEVBQWdFM0Isb0JBQWhFLEtBQXlGLElBQTdGLEVBQW1HO0FBQ2pHLHFCQUFPLElBQVA7QUFDRDtBQUNGOztBQUVELGNBQUkrQixlQUFlaFosMkJBQTJCNEIsUUFBM0IsQ0FBbkI7QUFDQSxpQkFBTyxJQUFJeVcsYUFBSixDQUFrQixhQUFhVyxZQUFiLEdBQTRCLElBQTVCLEdBQW1DSixZQUFuQyxHQUFrRCxnQkFBbEQsSUFBc0UsTUFBTTdVLGFBQU4sR0FBc0IsSUFBNUYsQ0FBbEIsQ0FBUDtBQUNEO0FBQ0QsZUFBT3lVLDJCQUEyQkMsUUFBM0IsQ0FBUDtBQUNEOztBQUVELGVBQVNkLGlCQUFULEdBQTZCO0FBQzNCLGlCQUFTYyxRQUFULENBQWtCdGYsS0FBbEIsRUFBeUIwSSxRQUF6QixFQUFtQ2tDLGFBQW5DLEVBQWtEbkMsUUFBbEQsRUFBNERnWCxZQUE1RCxFQUEwRTtBQUN4RSxjQUFJLENBQUMwQixPQUFPbmhCLE1BQU0wSSxRQUFOLENBQVAsQ0FBTCxFQUE4QjtBQUM1QixnQkFBSW1YLGVBQWVoWiwyQkFBMkI0QixRQUEzQixDQUFuQjtBQUNBLG1CQUFPLElBQUl5VyxhQUFKLENBQWtCLGFBQWFXLFlBQWIsR0FBNEIsSUFBNUIsR0FBbUNKLFlBQW5DLEdBQWtELGdCQUFsRCxJQUFzRSxNQUFNN1UsYUFBTixHQUFzQiwwQkFBNUYsQ0FBbEIsQ0FBUDtBQUNEO0FBQ0QsaUJBQU8sSUFBUDtBQUNEO0FBQ0QsZUFBT3lVLDJCQUEyQkMsUUFBM0IsQ0FBUDtBQUNEOztBQUVELGVBQVNSLHNCQUFULENBQWdDc0MsVUFBaEMsRUFBNEM7QUFDMUMsaUJBQVM5QixRQUFULENBQWtCdGYsS0FBbEIsRUFBeUIwSSxRQUF6QixFQUFtQ2tDLGFBQW5DLEVBQWtEbkMsUUFBbEQsRUFBNERnWCxZQUE1RCxFQUEwRTtBQUN4RSxjQUFJTyxZQUFZaGdCLE1BQU0wSSxRQUFOLENBQWhCO0FBQ0EsY0FBSXVYLFdBQVdDLFlBQVlGLFNBQVosQ0FBZjtBQUNBLGNBQUlDLGFBQWEsUUFBakIsRUFBMkI7QUFDekIsZ0JBQUlKLGVBQWVoWiwyQkFBMkI0QixRQUEzQixDQUFuQjtBQUNBLG1CQUFPLElBQUl5VyxhQUFKLENBQWtCLGFBQWFXLFlBQWIsR0FBNEIsSUFBNUIsR0FBbUNKLFlBQW5DLEdBQWtELGFBQWxELEdBQWtFUSxRQUFsRSxHQUE2RSxJQUE3RSxJQUFxRixrQkFBa0JyVixhQUFsQixHQUFrQyx1QkFBdkgsQ0FBbEIsQ0FBUDtBQUNEO0FBQ0QsZUFBSyxJQUFJNVIsR0FBVCxJQUFnQm9vQixVQUFoQixFQUE0QjtBQUMxQixnQkFBSUYsVUFBVUUsV0FBV3BvQixHQUFYLENBQWQ7QUFDQSxnQkFBSSxDQUFDa29CLE9BQUwsRUFBYztBQUNaO0FBQ0Q7QUFDRCxnQkFBSVgsUUFBUVcsUUFBUWxCLFNBQVIsRUFBbUJobkIsR0FBbkIsRUFBd0I0UixhQUF4QixFQUF1Q25DLFFBQXZDLEVBQWlEZ1gsZUFBZSxHQUFmLEdBQXFCem1CLEdBQXRFLEVBQTJFOGtCLG9CQUEzRSxDQUFaO0FBQ0EsZ0JBQUl5QyxLQUFKLEVBQVc7QUFDVCxxQkFBT0EsS0FBUDtBQUNEO0FBQ0Y7QUFDRCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRCxlQUFPbEIsMkJBQTJCQyxRQUEzQixDQUFQO0FBQ0Q7O0FBRUQsZUFBUzZCLE1BQVQsQ0FBZ0JuQixTQUFoQixFQUEyQjtBQUN6Qix1QkFBZUEsU0FBZix5Q0FBZUEsU0FBZjtBQUNFLGVBQUssUUFBTDtBQUNBLGVBQUssUUFBTDtBQUNBLGVBQUssV0FBTDtBQUNFLG1CQUFPLElBQVA7QUFDRixlQUFLLFNBQUw7QUFDRSxtQkFBTyxDQUFDQSxTQUFSO0FBQ0YsZUFBSyxRQUFMO0FBQ0UsZ0JBQUl4ZixNQUFNMkYsT0FBTixDQUFjNlosU0FBZCxDQUFKLEVBQThCO0FBQzVCLHFCQUFPQSxVQUFVcUIsS0FBVixDQUFnQkYsTUFBaEIsQ0FBUDtBQUNEO0FBQ0QsZ0JBQUluQixjQUFjLElBQWQsSUFBc0I1akIsYUFBYW9CLGNBQWIsQ0FBNEJ3aUIsU0FBNUIsQ0FBMUIsRUFBa0U7QUFDaEUscUJBQU8sSUFBUDtBQUNEOztBQUVELGdCQUFJMUQsYUFBYVosY0FBY3NFLFNBQWQsQ0FBakI7QUFDQSxnQkFBSTFELFVBQUosRUFBZ0I7QUFDZCxrQkFBSUUsV0FBV0YsV0FBVy9rQixJQUFYLENBQWdCeW9CLFNBQWhCLENBQWY7QUFDQSxrQkFBSXZELElBQUo7QUFDQSxrQkFBSUgsZUFBZTBELFVBQVV6RCxPQUE3QixFQUFzQztBQUNwQyx1QkFBTyxDQUFDLENBQUNFLE9BQU9ELFNBQVNFLElBQVQsRUFBUixFQUF5Qm5ZLElBQWpDLEVBQXVDO0FBQ3JDLHNCQUFJLENBQUM0YyxPQUFPMUUsS0FBS3JkLEtBQVosQ0FBTCxFQUF5QjtBQUN2QiwyQkFBTyxLQUFQO0FBQ0Q7QUFDRjtBQUNGLGVBTkQsTUFNTztBQUNMO0FBQ0EsdUJBQU8sQ0FBQyxDQUFDcWQsT0FBT0QsU0FBU0UsSUFBVCxFQUFSLEVBQXlCblksSUFBakMsRUFBdUM7QUFDckMsc0JBQUkrYyxRQUFRN0UsS0FBS3JkLEtBQWpCO0FBQ0Esc0JBQUlraUIsS0FBSixFQUFXO0FBQ1Qsd0JBQUksQ0FBQ0gsT0FBT0csTUFBTSxDQUFOLENBQVAsQ0FBTCxFQUF1QjtBQUNyQiw2QkFBTyxLQUFQO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRixhQXBCRCxNQW9CTztBQUNMLHFCQUFPLEtBQVA7QUFDRDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0Y7QUFDRSxtQkFBTyxLQUFQO0FBMUNKO0FBNENEOztBQUVELGVBQVNDLFFBQVQsQ0FBa0J0QixRQUFsQixFQUE0QkQsU0FBNUIsRUFBdUM7QUFDckM7QUFDQSxZQUFJQyxhQUFhLFFBQWpCLEVBQTJCO0FBQ3pCLGlCQUFPLElBQVA7QUFDRDs7QUFFRDtBQUNBLFlBQUlELFVBQVUsZUFBVixNQUErQixRQUFuQyxFQUE2QztBQUMzQyxpQkFBTyxJQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxZQUFJLE9BQU94RSxNQUFQLEtBQWtCLFVBQWxCLElBQWdDd0UscUJBQXFCeEUsTUFBekQsRUFBaUU7QUFDL0QsaUJBQU8sSUFBUDtBQUNEOztBQUVELGVBQU8sS0FBUDtBQUNEOztBQUVEO0FBQ0EsZUFBUzBFLFdBQVQsQ0FBcUJGLFNBQXJCLEVBQWdDO0FBQzlCLFlBQUlDLGtCQUFrQkQsU0FBbEIseUNBQWtCQSxTQUFsQixDQUFKO0FBQ0EsWUFBSXhmLE1BQU0yRixPQUFOLENBQWM2WixTQUFkLENBQUosRUFBOEI7QUFDNUIsaUJBQU8sT0FBUDtBQUNEO0FBQ0QsWUFBSUEscUJBQXFCMVMsTUFBekIsRUFBaUM7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsaUJBQU8sUUFBUDtBQUNEO0FBQ0QsWUFBSWlVLFNBQVN0QixRQUFULEVBQW1CRCxTQUFuQixDQUFKLEVBQW1DO0FBQ2pDLGlCQUFPLFFBQVA7QUFDRDtBQUNELGVBQU9DLFFBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0EsZUFBU0csY0FBVCxDQUF3QkosU0FBeEIsRUFBbUM7QUFDakMsWUFBSUMsV0FBV0MsWUFBWUYsU0FBWixDQUFmO0FBQ0EsWUFBSUMsYUFBYSxRQUFqQixFQUEyQjtBQUN6QixjQUFJRCxxQkFBcUJ3QixJQUF6QixFQUErQjtBQUM3QixtQkFBTyxNQUFQO0FBQ0QsV0FGRCxNQUVPLElBQUl4QixxQkFBcUIxUyxNQUF6QixFQUFpQztBQUN0QyxtQkFBTyxRQUFQO0FBQ0Q7QUFDRjtBQUNELGVBQU8yUyxRQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxlQUFTVSxZQUFULENBQXNCWCxTQUF0QixFQUFpQztBQUMvQixZQUFJLENBQUNBLFVBQVU3Z0IsV0FBWCxJQUEwQixDQUFDNmdCLFVBQVU3Z0IsV0FBVixDQUFzQjBCLElBQXJELEVBQTJEO0FBQ3pELGlCQUFPa2QsU0FBUDtBQUNEO0FBQ0QsZUFBT2lDLFVBQVU3Z0IsV0FBVixDQUFzQjBCLElBQTdCO0FBQ0Q7O0FBRUQzSyxhQUFPRCxPQUFQLEdBQWlCb0csY0FBakI7QUFDQyxLQWxiUSxFQWtiUCxFQUFDLE1BQUssRUFBTixFQUFTLE1BQUssRUFBZCxFQUFpQixNQUFLLEVBQXRCLEVBQXlCLE1BQUssRUFBOUIsRUFBaUMsTUFBSyxFQUF0QyxFQUF5QyxNQUFLLEVBQTlDLEVBbGJPLENBam1HK3hCLEVBbWhIbnZCLElBQUcsQ0FBQyxVQUFTNUUsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUN6Rjs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQSxVQUFJNm5CLHVCQUF1Qiw4Q0FBM0I7O0FBRUE1bkIsYUFBT0QsT0FBUCxHQUFpQjZuQixvQkFBakI7QUFDQyxLQWpCdUQsRUFpQnRELEVBakJzRCxDQW5oSGd2QixFQW9pSGx5QixJQUFHLENBQUMsVUFBU3JtQixPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQzFDOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsVUFBSTZGLFVBQVVyRSxRQUFRLEVBQVIsQ0FBZDs7QUFFQSxVQUFJdUUsaUJBQWlCdkUsUUFBUSxFQUFSLENBQXJCO0FBQ0EsVUFBSXFQLHVCQUF1QnJQLFFBQVEsRUFBUixDQUEzQjs7QUFFQSxVQUFJc1AsY0FBY3RQLFFBQVEsRUFBUixDQUFsQjs7QUFFQTs7O0FBR0EsZUFBU3dFLGtCQUFULENBQTRCK0QsS0FBNUIsRUFBbUNvRixPQUFuQyxFQUE0Q2tHLE9BQTVDLEVBQXFEO0FBQ25EO0FBQ0EsYUFBS3RMLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtvRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLc0csSUFBTCxHQUFZM0UsV0FBWjtBQUNBO0FBQ0E7QUFDQSxhQUFLdUUsT0FBTCxHQUFlQSxXQUFXeEUsb0JBQTFCO0FBQ0Q7O0FBRUQsZUFBUzJhLGNBQVQsR0FBMEIsQ0FBRTtBQUM1QkEscUJBQWV6aUIsU0FBZixHQUEyQmhELGVBQWVnRCxTQUExQztBQUNBL0MseUJBQW1CK0MsU0FBbkIsR0FBK0IsSUFBSXlpQixjQUFKLEVBQS9CO0FBQ0F4bEIseUJBQW1CK0MsU0FBbkIsQ0FBNkJHLFdBQTdCLEdBQTJDbEQsa0JBQTNDO0FBQ0E7QUFDQUgsY0FBUUcsbUJBQW1CK0MsU0FBM0IsRUFBc0NoRCxlQUFlZ0QsU0FBckQ7QUFDQS9DLHlCQUFtQitDLFNBQW5CLENBQTZCMGlCLG9CQUE3QixHQUFvRCxJQUFwRDs7QUFFQXhyQixhQUFPRCxPQUFQLEdBQWlCZ0csa0JBQWpCO0FBQ0MsS0ExQ1EsRUEwQ1AsRUFBQyxNQUFLLEVBQU4sRUFBUyxNQUFLLEVBQWQsRUFBaUIsTUFBSyxFQUF0QixFQUF5QixNQUFLLEVBQTlCLEVBMUNPLENBcGlIK3hCLEVBOGtIbndCLElBQUcsQ0FBQyxVQUFTeEUsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUN6RTs7Ozs7Ozs7OztBQVVBOztBQUVBLFVBQUk0RCxvQkFBb0I7QUFDdEI7Ozs7Ozs7Ozs7QUFVQThuQiwyQkFBbUIsMkJBQVV0WCxTQUFWLEVBQXFCdVgsa0JBQXJCLEVBQXlDO0FBQzFELGlCQUFPLFVBQVUzcUIsQ0FBVixFQUFhZ1QsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUIyWCxDQUFuQixFQUFzQm5yQixDQUF0QixFQUF5QlYsQ0FBekIsRUFBNEI7QUFDakMsZ0JBQUlzVyxlQUFlc1YsbUJBQW1CcnFCLElBQW5CLENBQXdCOFMsU0FBeEIsRUFBbUNwVCxDQUFuQyxFQUFzQ2dULENBQXRDLEVBQXlDQyxDQUF6QyxFQUE0QzJYLENBQTVDLEVBQStDbnJCLENBQS9DLEVBQWtEVixDQUFsRCxDQUFuQjtBQUNBLGdCQUFJc1csWUFBSixFQUFrQjtBQUNoQmpDLHdCQUFVZ0MsUUFBVixDQUFtQkMsWUFBbkI7QUFDRDtBQUNGLFdBTEQ7QUFNRCxTQWxCcUI7O0FBb0J0Qjs7Ozs7Ozs7Ozs7QUFXQXJTLDhCQUFzQiw4QkFBVW9RLFNBQVYsRUFBcUJyUixHQUFyQixFQUEwQjtBQUM5QztBQUNBLGNBQUk4b0IsUUFBUXpYLFVBQVUwWCxZQUFWLEtBQTJCMVgsVUFBVTBYLFlBQVYsR0FBeUIsRUFBcEQsQ0FBWjtBQUNBLGlCQUFPRCxNQUFNOW9CLEdBQU4sTUFBZThvQixNQUFNOW9CLEdBQU4sSUFBYWlCLHNCQUFxQm9RLFNBQXJCLEVBQWdDclIsR0FBaEMsQ0FBNUIsQ0FBUDtBQUNEO0FBbkNxQixPQUF4Qjs7QUFzQ0EsZUFBU2lCLHFCQUFULENBQThCb1EsU0FBOUIsRUFBeUNyUixHQUF6QyxFQUE4QztBQUM1QztBQUNBO0FBQ0E7QUFDQSxZQUFJc1QsZUFBZSxFQUFuQjtBQUNBLGVBQU8sU0FBUzBWLGNBQVQsQ0FBd0I1aUIsS0FBeEIsRUFBK0I7QUFDcENrTix1QkFBYXRULEdBQWIsSUFBb0JvRyxLQUFwQjtBQUNBaUwsb0JBQVVnQyxRQUFWLENBQW1CQyxZQUFuQjtBQUNELFNBSEQ7QUFJRDs7QUFFRHpTLHdCQUFrQm9vQixLQUFsQixHQUEwQjtBQUN4Qjs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQU4sMkJBQW1CLDJCQUFVQyxrQkFBVixFQUE4QjtBQUMvQyxpQkFBTy9uQixrQkFBa0I4bkIsaUJBQWxCLENBQW9DLElBQXBDLEVBQTBDQyxrQkFBMUMsQ0FBUDtBQUNELFNBbkJ1Qjs7QUFxQnhCOzs7Ozs7Ozs7Ozs7Ozs7QUFlQTNuQiw4QkFBc0IsOEJBQVVqQixHQUFWLEVBQWU7QUFDbkMsaUJBQU9hLGtCQUFrQkksb0JBQWxCLENBQXVDLElBQXZDLEVBQTZDakIsR0FBN0MsQ0FBUDtBQUNEO0FBdEN1QixPQUExQjs7QUF5Q0E5QyxhQUFPRCxPQUFQLEdBQWlCNEQsaUJBQWpCO0FBQ0MsS0F4R3VDLEVBd0d0QyxFQXhHc0MsQ0E5a0hnd0IsRUFzckhseUIsSUFBRyxDQUFDLFVBQVNwQyxPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQzFDOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsVUFBSWlzQixrQkFBa0J6cUIsUUFBUSxFQUFSLENBQXRCOztBQUVBLFVBQUkwcUIsOEJBQThCO0FBQ2hDOzs7Ozs7OztBQVFBQyx5QkFBaUIseUJBQVUxZCxRQUFWLEVBQW9CMmQsV0FBcEIsRUFBaUM7QUFDaEQsY0FBSSxDQUFDM2QsUUFBTCxFQUFlO0FBQ2IsbUJBQU9BLFFBQVA7QUFDRDs7QUFFRCxjQUFJLGtCQUFrQixZQUF0QixFQUFvQztBQUNsQyxtQkFBT3dkLGdCQUFnQnhkLFFBQWhCLEVBQTBCMmQsV0FBMUIsQ0FBUDtBQUNEOztBQUVELGlCQUFPSCxnQkFBZ0J4ZCxRQUFoQixDQUFQO0FBQ0QsU0FuQitCOztBQXFCaEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBNGQsNEJBQW9CLDRCQUFVQyxJQUFWLEVBQWdCN0YsSUFBaEIsRUFBc0I7QUFDeEM2RixpQkFBT0EsUUFBUSxFQUFmO0FBQ0E3RixpQkFBT0EsUUFBUSxFQUFmOztBQUVBLG1CQUFTOEYsY0FBVCxDQUF3QnhwQixHQUF4QixFQUE2QjtBQUMzQixnQkFBSTBqQixLQUFLNWpCLGNBQUwsQ0FBb0JFLEdBQXBCLENBQUosRUFBOEI7QUFDNUIscUJBQU8wakIsS0FBSzFqQixHQUFMLENBQVA7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBT3VwQixLQUFLdnBCLEdBQUwsQ0FBUDtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQTtBQUNBLGNBQUl5cEIsa0JBQWtCLEVBQXRCOztBQUVBLGNBQUlDLGNBQWMsRUFBbEI7QUFDQSxlQUFLLElBQUlDLE9BQVQsSUFBb0JKLElBQXBCLEVBQTBCO0FBQ3hCLGdCQUFJN0YsS0FBSzVqQixjQUFMLENBQW9CNnBCLE9BQXBCLENBQUosRUFBa0M7QUFDaEMsa0JBQUlELFlBQVlsckIsTUFBaEIsRUFBd0I7QUFDdEJpckIsZ0NBQWdCRSxPQUFoQixJQUEyQkQsV0FBM0I7QUFDQUEsOEJBQWMsRUFBZDtBQUNEO0FBQ0YsYUFMRCxNQUtPO0FBQ0xBLDBCQUFZdG5CLElBQVosQ0FBaUJ1bkIsT0FBakI7QUFDRDtBQUNGOztBQUVELGNBQUl4ckIsQ0FBSjtBQUNBLGNBQUl5ckIsZUFBZSxFQUFuQjtBQUNBLGVBQUssSUFBSUMsT0FBVCxJQUFvQm5HLElBQXBCLEVBQTBCO0FBQ3hCLGdCQUFJK0YsZ0JBQWdCM3BCLGNBQWhCLENBQStCK3BCLE9BQS9CLENBQUosRUFBNkM7QUFDM0MsbUJBQUsxckIsSUFBSSxDQUFULEVBQVlBLElBQUlzckIsZ0JBQWdCSSxPQUFoQixFQUF5QnJyQixNQUF6QyxFQUFpREwsR0FBakQsRUFBc0Q7QUFDcEQsb0JBQUkyckIsaUJBQWlCTCxnQkFBZ0JJLE9BQWhCLEVBQXlCMXJCLENBQXpCLENBQXJCO0FBQ0F5ckIsNkJBQWFILGdCQUFnQkksT0FBaEIsRUFBeUIxckIsQ0FBekIsQ0FBYixJQUE0Q3FyQixlQUFlTSxjQUFmLENBQTVDO0FBQ0Q7QUFDRjtBQUNERix5QkFBYUMsT0FBYixJQUF3QkwsZUFBZUssT0FBZixDQUF4QjtBQUNEOztBQUVEO0FBQ0EsZUFBSzFyQixJQUFJLENBQVQsRUFBWUEsSUFBSXVyQixZQUFZbHJCLE1BQTVCLEVBQW9DTCxHQUFwQyxFQUF5QztBQUN2Q3lyQix5QkFBYUYsWUFBWXZyQixDQUFaLENBQWIsSUFBK0JxckIsZUFBZUUsWUFBWXZyQixDQUFaLENBQWYsQ0FBL0I7QUFDRDs7QUFFRCxpQkFBT3lyQixZQUFQO0FBQ0Q7QUFwRitCLE9BQWxDOztBQXVGQTFzQixhQUFPRCxPQUFQLEdBQWlCa3NCLDJCQUFqQjtBQUNDLEtBdkdRLEVBdUdQLEVBQUMsTUFBSyxFQUFOLEVBdkdPLENBdHJIK3hCLEVBNnhIM3hCLElBQUcsQ0FBQyxVQUFTMXFCLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDakQ7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxVQUFJeUIsdUJBQXVCRCxRQUFRLEVBQVIsQ0FBM0I7O0FBRUEsVUFBSW1CLDZCQUE2Qm5CLFFBQVEsQ0FBUixDQUFqQzs7QUFFQSxVQUFJc3JCLFlBQVksRUFBaEI7O0FBRUEsZUFBU0MsWUFBVCxHQUF3QjtBQUN0QixZQUFJQyxVQUFVcnFCLDJCQUEyQixjQUEzQixDQUFkO0FBQ0EsWUFBSXNxQixXQUFXdHFCLDJCQUEyQixlQUEzQixDQUFmOztBQUVBLFlBQUlxcUIsT0FBSixFQUFhO0FBQ1hGLG9CQUFVM25CLElBQVYsQ0FBZTZuQixPQUFmO0FBQ0Q7O0FBRUQsWUFBSUMsUUFBSixFQUFjO0FBQ1pILG9CQUFVM25CLElBQVYsQ0FBZThuQixRQUFmO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJeHJCLHFCQUFxQmEsU0FBekIsRUFBb0M7QUFDbEN5cUI7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFTRyxnQkFBVCxDQUEwQmxnQixJQUExQixFQUFnQ3BMLFNBQWhDLEVBQTJDdXJCLGFBQTNDLEVBQTBEO0FBQ3hEbmdCLGFBQUtrZ0IsZ0JBQUwsQ0FBc0J0ckIsU0FBdEIsRUFBaUN1ckIsYUFBakMsRUFBZ0QsS0FBaEQ7QUFDRDs7QUFFRCxlQUFTQyxtQkFBVCxDQUE2QnBnQixJQUE3QixFQUFtQ3BMLFNBQW5DLEVBQThDdXJCLGFBQTlDLEVBQTZEO0FBQzNEbmdCLGFBQUtvZ0IsbUJBQUwsQ0FBeUJ4ckIsU0FBekIsRUFBb0N1ckIsYUFBcEMsRUFBbUQsS0FBbkQ7QUFDRDs7QUFFRCxVQUFJamhCLHdCQUF3QjtBQUMxQjRCLDZCQUFxQiw2QkFBVWQsSUFBVixFQUFnQm1nQixhQUFoQixFQUErQjtBQUNsRCxjQUFJTCxVQUFVdnJCLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQTtBQUNBbEIsbUJBQU91TixVQUFQLENBQWtCdWYsYUFBbEIsRUFBaUMsQ0FBakM7QUFDQTtBQUNEO0FBQ0RMLG9CQUFVN2xCLE9BQVYsQ0FBa0IsVUFBVW9tQixRQUFWLEVBQW9CO0FBQ3BDSCw2QkFBaUJsZ0IsSUFBakIsRUFBdUJxZ0IsUUFBdkIsRUFBaUNGLGFBQWpDO0FBQ0QsV0FGRDtBQUdELFNBWHlCOztBQWExQjFmLGdDQUF3QixnQ0FBVVQsSUFBVixFQUFnQm1nQixhQUFoQixFQUErQjtBQUNyRCxjQUFJTCxVQUFVdnJCLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUI7QUFDRDtBQUNEdXJCLG9CQUFVN2xCLE9BQVYsQ0FBa0IsVUFBVW9tQixRQUFWLEVBQW9CO0FBQ3BDRCxnQ0FBb0JwZ0IsSUFBcEIsRUFBMEJxZ0IsUUFBMUIsRUFBb0NGLGFBQXBDO0FBQ0QsV0FGRDtBQUdEO0FBcEJ5QixPQUE1Qjs7QUF1QkFsdEIsYUFBT0QsT0FBUCxHQUFpQmtNLHFCQUFqQjtBQUNDLEtBekVlLEVBeUVkLEVBQUMsS0FBSSxDQUFMLEVBQU8sTUFBSyxFQUFaLEVBekVjLENBN3hId3hCLEVBczJIcnhCLElBQUcsQ0FBQyxVQUFTMUssT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUN2RDs7Ozs7Ozs7OztBQVVBOztBQUVBLFVBQUk2RixVQUFVckUsUUFBUSxFQUFSLENBQWQ7O0FBRUEsZUFBUytHLGVBQVQsQ0FBeUJoRSxRQUF6QixFQUFtQ2lFLFdBQW5DLEVBQWdEO0FBQUUsWUFBSSxFQUFFakUsb0JBQW9CaUUsV0FBdEIsQ0FBSixFQUF3QztBQUFFLGdCQUFNLElBQUlDLFNBQUosQ0FBYyxtQ0FBZCxDQUFOO0FBQTJEO0FBQUU7O0FBRXpKLGVBQVNDLDBCQUFULENBQW9DbkksSUFBcEMsRUFBMENlLElBQTFDLEVBQWdEO0FBQUUsWUFBSSxDQUFDZixJQUFMLEVBQVc7QUFBRSxnQkFBTSxJQUFJb0ksY0FBSixDQUFtQiwyREFBbkIsQ0FBTjtBQUF3RixTQUFDLE9BQU9ySCxTQUFTLFFBQU9BLElBQVAseUNBQU9BLElBQVAsT0FBZ0IsUUFBaEIsSUFBNEIsT0FBT0EsSUFBUCxLQUFnQixVQUFyRCxJQUFtRUEsSUFBbkUsR0FBMEVmLElBQWpGO0FBQXdGOztBQUVoUCxlQUFTcUksU0FBVCxDQUFtQkMsUUFBbkIsRUFBNkJDLFVBQTdCLEVBQXlDO0FBQUUsWUFBSSxPQUFPQSxVQUFQLEtBQXNCLFVBQXRCLElBQW9DQSxlQUFlLElBQXZELEVBQTZEO0FBQUUsZ0JBQU0sSUFBSUwsU0FBSixDQUFjLHFFQUFvRUssVUFBcEUseUNBQW9FQSxVQUFwRSxFQUFkLENBQU47QUFBc0csU0FBQ0QsU0FBU0UsU0FBVCxHQUFxQkMsT0FBT0MsTUFBUCxDQUFjSCxjQUFjQSxXQUFXQyxTQUF2QyxFQUFrRCxFQUFFRyxhQUFhLEVBQUVDLE9BQU9OLFFBQVQsRUFBbUJPLFlBQVksS0FBL0IsRUFBc0NDLFVBQVUsSUFBaEQsRUFBc0RDLGNBQWMsSUFBcEUsRUFBZixFQUFsRCxDQUFyQixDQUFxSyxJQUFJUixVQUFKLEVBQWdCRSxPQUFPTyxjQUFQLEdBQXdCUCxPQUFPTyxjQUFQLENBQXNCVixRQUF0QixFQUFnQ0MsVUFBaEMsQ0FBeEIsR0FBc0VELFNBQVNXLFNBQVQsR0FBcUJWLFVBQTNGO0FBQXdHOztBQUU5ZSxVQUFJdEksUUFBUWdCLFFBQVEsQ0FBUixDQUFaO0FBQ0EsVUFBSTBxQiw4QkFBOEIxcUIsUUFBUSxFQUFSLENBQWxDOztBQUVBLFVBQUlrTixnQkFBZ0JsTixRQUFRLEVBQVIsQ0FBcEI7O0FBRUE7Ozs7OztBQU1BLFVBQUlpSSx1QkFBdUIsVUFBVVEsZ0JBQVYsRUFBNEI7QUFDckRyQixrQkFBVWEsb0JBQVYsRUFBZ0NRLGdCQUFoQzs7QUFFQSxpQkFBU1Isb0JBQVQsR0FBZ0M7QUFDOUIsY0FBSVMsS0FBSixFQUFXQyxLQUFYLEVBQWtCQyxJQUFsQjs7QUFFQTdCLDBCQUFnQixJQUFoQixFQUFzQmtCLG9CQUF0Qjs7QUFFQSxlQUFLLElBQUlZLE9BQU92RCxVQUFVdkYsTUFBckIsRUFBNkIrSSxPQUFPQyxNQUFNRixJQUFOLENBQXBDLEVBQWlERyxPQUFPLENBQTdELEVBQWdFQSxPQUFPSCxJQUF2RSxFQUE2RUcsTUFBN0UsRUFBcUY7QUFDbkZGLGlCQUFLRSxJQUFMLElBQWExRCxVQUFVMEQsSUFBVixDQUFiO0FBQ0Q7O0FBRUQsaUJBQU9KLFFBQVFGLFNBQVNDLFFBQVF6QiwyQkFBMkIsSUFBM0IsRUFBaUN1QixpQkFBaUIzSSxJQUFqQixDQUFzQnVGLEtBQXRCLENBQTRCb0QsZ0JBQTVCLEVBQThDLENBQUMsSUFBRCxFQUFPUSxNQUFQLENBQWNILElBQWQsQ0FBOUMsQ0FBakMsQ0FBUixFQUE4R0gsS0FBdkgsR0FBK0hBLE1BQU1wRyxLQUFOLEdBQWM7QUFDMUo7QUFDQTBLLHNCQUFVeWQsNEJBQTRCQyxlQUE1QixDQUE0Q2hpQixNQUFNSixLQUFOLENBQVkwRSxRQUF4RDtBQUZnSixXQUE3SSxFQUdadEUsTUFBTW1qQixhQUFOLEdBQXNCLFVBQVV2cUIsR0FBVixFQUFlO0FBQ3RDb0gsa0JBQU1vakIsMEJBQU4sQ0FBaUN4cUIsR0FBakMsSUFBd0MsSUFBeEM7O0FBRUEsZ0JBQUlxUixZQUFZakssTUFBTXNMLElBQU4sQ0FBVzFTLEdBQVgsQ0FBaEI7O0FBRUEsZ0JBQUlxUixVQUFVL0YsbUJBQWQsRUFBbUM7QUFDakMrRix3QkFBVS9GLG1CQUFWLENBQThCbEUsTUFBTXFqQixvQkFBTixDQUEyQmpaLElBQTNCLENBQWdDcEssS0FBaEMsRUFBdUNwSCxHQUF2QyxDQUE5QjtBQUNELGFBRkQsTUFFTztBQUNMb0gsb0JBQU1xakIsb0JBQU4sQ0FBMkJ6cUIsR0FBM0I7QUFDRDtBQUNGLFdBYmMsRUFhWm9ILE1BQU1xakIsb0JBQU4sR0FBNkIsVUFBVXpxQixHQUFWLEVBQWU7QUFDN0MsZ0JBQUlxUixZQUFZakssTUFBTXNMLElBQU4sQ0FBVzFTLEdBQVgsQ0FBaEI7QUFDQSxnQkFBSXFSLFVBQVVxWixrQkFBZCxFQUFrQztBQUNoQ3JaLHdCQUFVcVosa0JBQVY7QUFDRDs7QUFFRCxtQkFBT3RqQixNQUFNb2pCLDBCQUFOLENBQWlDeHFCLEdBQWpDLENBQVA7O0FBRUEsZ0JBQUkycUIsc0JBQXNCeEIsNEJBQTRCQyxlQUE1QixDQUE0Q2hpQixNQUFNSixLQUFOLENBQVkwRSxRQUF4RCxDQUExQjs7QUFFQSxnQkFBSSxDQUFDaWYsbUJBQUQsSUFBd0IsQ0FBQ0Esb0JBQW9CN3FCLGNBQXBCLENBQW1DRSxHQUFuQyxDQUE3QixFQUFzRTtBQUNwRTtBQUNBb0gsb0JBQU13akIsWUFBTixDQUFtQjVxQixHQUFuQjtBQUNEO0FBQ0YsV0EzQmMsRUEyQlpvSCxNQUFNeWpCLFlBQU4sR0FBcUIsVUFBVTdxQixHQUFWLEVBQWU7QUFDckNvSCxrQkFBTW9qQiwwQkFBTixDQUFpQ3hxQixHQUFqQyxJQUF3QyxJQUF4Qzs7QUFFQSxnQkFBSXFSLFlBQVlqSyxNQUFNc0wsSUFBTixDQUFXMVMsR0FBWCxDQUFoQjs7QUFFQSxnQkFBSXFSLFVBQVU3RixrQkFBZCxFQUFrQztBQUNoQzZGLHdCQUFVN0Ysa0JBQVYsQ0FBNkJwRSxNQUFNMGpCLG1CQUFOLENBQTBCdFosSUFBMUIsQ0FBK0JwSyxLQUEvQixFQUFzQ3BILEdBQXRDLENBQTdCO0FBQ0QsYUFGRCxNQUVPO0FBQ0xvSCxvQkFBTTBqQixtQkFBTixDQUEwQjlxQixHQUExQjtBQUNEO0FBQ0YsV0FyQ2MsRUFxQ1pvSCxNQUFNMGpCLG1CQUFOLEdBQTRCLFVBQVU5cUIsR0FBVixFQUFlO0FBQzVDLGdCQUFJcVIsWUFBWWpLLE1BQU1zTCxJQUFOLENBQVcxUyxHQUFYLENBQWhCO0FBQ0EsZ0JBQUlxUixVQUFVMFosaUJBQWQsRUFBaUM7QUFDL0IxWix3QkFBVTBaLGlCQUFWO0FBQ0Q7O0FBRUQsbUJBQU8zakIsTUFBTW9qQiwwQkFBTixDQUFpQ3hxQixHQUFqQyxDQUFQOztBQUVBLGdCQUFJMnFCLHNCQUFzQnhCLDRCQUE0QkMsZUFBNUIsQ0FBNENoaUIsTUFBTUosS0FBTixDQUFZMEUsUUFBeEQsQ0FBMUI7O0FBRUEsZ0JBQUksQ0FBQ2lmLG1CQUFELElBQXdCLENBQUNBLG9CQUFvQjdxQixjQUFwQixDQUFtQ0UsR0FBbkMsQ0FBN0IsRUFBc0U7QUFDcEU7QUFDQW9ILG9CQUFNd2pCLFlBQU4sQ0FBbUI1cUIsR0FBbkI7QUFDRDtBQUNGLFdBbkRjLEVBbURab0gsTUFBTXdqQixZQUFOLEdBQXFCLFVBQVU1cUIsR0FBVixFQUFlO0FBQ3JDb0gsa0JBQU1vakIsMEJBQU4sQ0FBaUN4cUIsR0FBakMsSUFBd0MsSUFBeEM7O0FBRUEsZ0JBQUlxUixZQUFZakssTUFBTXNMLElBQU4sQ0FBVzFTLEdBQVgsQ0FBaEI7QUFDQSxnQkFBSXFSLFVBQVU1RixrQkFBZCxFQUFrQztBQUNoQzRGLHdCQUFVNUYsa0JBQVYsQ0FBNkJyRSxNQUFNNGpCLGtCQUFOLENBQXlCeFosSUFBekIsQ0FBOEJwSyxLQUE5QixFQUFxQ3BILEdBQXJDLENBQTdCO0FBQ0QsYUFGRCxNQUVPO0FBQ0w7QUFDQTtBQUNBO0FBQ0FvSCxvQkFBTTRqQixrQkFBTixDQUF5QmhyQixHQUF6QjtBQUNEO0FBQ0YsV0EvRGMsRUErRFpvSCxNQUFNNGpCLGtCQUFOLEdBQTJCLFVBQVVockIsR0FBVixFQUFlO0FBQzNDLGdCQUFJcVIsWUFBWWpLLE1BQU1zTCxJQUFOLENBQVcxUyxHQUFYLENBQWhCOztBQUVBLGdCQUFJcVIsVUFBVTRaLGlCQUFkLEVBQWlDO0FBQy9CNVosd0JBQVU0WixpQkFBVjtBQUNEOztBQUVELG1CQUFPN2pCLE1BQU1vakIsMEJBQU4sQ0FBaUN4cUIsR0FBakMsQ0FBUDs7QUFFQSxnQkFBSTJxQixzQkFBc0J4Qiw0QkFBNEJDLGVBQTVCLENBQTRDaGlCLE1BQU1KLEtBQU4sQ0FBWTBFLFFBQXhELENBQTFCOztBQUVBLGdCQUFJaWYsdUJBQXVCQSxvQkFBb0I3cUIsY0FBcEIsQ0FBbUNFLEdBQW5DLENBQTNCLEVBQW9FO0FBQ2xFO0FBQ0FvSCxvQkFBTXlqQixZQUFOLENBQW1CN3FCLEdBQW5CO0FBQ0QsYUFIRCxNQUdPO0FBQ0xvSCxvQkFBTWlNLFFBQU4sQ0FBZSxVQUFVclMsS0FBVixFQUFpQjtBQUM5QixvQkFBSWtxQixjQUFjcG9CLFFBQVEsRUFBUixFQUFZOUIsTUFBTTBLLFFBQWxCLENBQWxCO0FBQ0EsdUJBQU93ZixZQUFZbHJCLEdBQVosQ0FBUDtBQUNBLHVCQUFPLEVBQUUwTCxVQUFVd2YsV0FBWixFQUFQO0FBQ0QsZUFKRDtBQUtEO0FBQ0YsV0FwRmMsRUFvRlovakIsS0FwRkksR0FvRkl4QiwyQkFBMkJ5QixLQUEzQixFQUFrQ0MsSUFBbEMsQ0FwRlg7QUFxRkQ7O0FBRURYLDZCQUFxQlYsU0FBckIsQ0FBK0JvRixrQkFBL0IsR0FBb0QsU0FBU0Esa0JBQVQsR0FBOEI7QUFDaEYsZUFBS29mLDBCQUFMLEdBQWtDLEVBQWxDO0FBQ0EsZUFBS1csV0FBTCxHQUFtQixFQUFuQjtBQUNBLGVBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDRCxTQUpEOztBQU1BMWtCLDZCQUFxQlYsU0FBckIsQ0FBK0I0SSxpQkFBL0IsR0FBbUQsU0FBU0EsaUJBQVQsR0FBNkI7QUFDOUUsY0FBSXljLHNCQUFzQixLQUFLcnFCLEtBQUwsQ0FBVzBLLFFBQXJDO0FBQ0EsZUFBSyxJQUFJMUwsR0FBVCxJQUFnQnFyQixtQkFBaEIsRUFBcUM7QUFDbkMsZ0JBQUlBLG9CQUFvQnJyQixHQUFwQixDQUFKLEVBQThCO0FBQzVCLG1CQUFLdXFCLGFBQUwsQ0FBbUJ2cUIsR0FBbkI7QUFDRDtBQUNGO0FBQ0YsU0FQRDs7QUFTQTBHLDZCQUFxQlYsU0FBckIsQ0FBK0I2SSx5QkFBL0IsR0FBMkQsU0FBU0EseUJBQVQsQ0FBbUNvSyxTQUFuQyxFQUE4QztBQUN2RyxjQUFJcVMsbUJBQW1CbkMsNEJBQTRCQyxlQUE1QixDQUE0Q25RLFVBQVV2TixRQUF0RCxDQUF2QjtBQUNBLGNBQUk2ZixtQkFBbUIsS0FBS3ZxQixLQUFMLENBQVcwSyxRQUFsQzs7QUFFQSxlQUFLMkgsUUFBTCxDQUFjO0FBQ1ozSCxzQkFBVXlkLDRCQUE0Qkcsa0JBQTVCLENBQStDaUMsZ0JBQS9DLEVBQWlFRCxnQkFBakU7QUFERSxXQUFkOztBQUlBLGNBQUl0ckIsR0FBSjs7QUFFQSxlQUFLQSxHQUFMLElBQVlzckIsZ0JBQVosRUFBOEI7QUFDNUIsZ0JBQUlFLFVBQVVELG9CQUFvQkEsaUJBQWlCenJCLGNBQWpCLENBQWdDRSxHQUFoQyxDQUFsQztBQUNBLGdCQUFJc3JCLGlCQUFpQnRyQixHQUFqQixLQUF5QixDQUFDd3JCLE9BQTFCLElBQXFDLENBQUMsS0FBS2hCLDBCQUFMLENBQWdDeHFCLEdBQWhDLENBQTFDLEVBQWdGO0FBQzlFLG1CQUFLbXJCLFdBQUwsQ0FBaUIvb0IsSUFBakIsQ0FBc0JwQyxHQUF0QjtBQUNEO0FBQ0Y7O0FBRUQsZUFBS0EsR0FBTCxJQUFZdXJCLGdCQUFaLEVBQThCO0FBQzVCLGdCQUFJRSxVQUFVSCxvQkFBb0JBLGlCQUFpQnhyQixjQUFqQixDQUFnQ0UsR0FBaEMsQ0FBbEM7QUFDQSxnQkFBSXVyQixpQkFBaUJ2ckIsR0FBakIsS0FBeUIsQ0FBQ3lyQixPQUExQixJQUFxQyxDQUFDLEtBQUtqQiwwQkFBTCxDQUFnQ3hxQixHQUFoQyxDQUExQyxFQUFnRjtBQUM5RSxtQkFBS29yQixXQUFMLENBQWlCaHBCLElBQWpCLENBQXNCcEMsR0FBdEI7QUFDRDtBQUNGOztBQUVEO0FBQ0QsU0F6QkQ7O0FBMkJBMEcsNkJBQXFCVixTQUFyQixDQUErQmdKLGtCQUEvQixHQUFvRCxTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRixjQUFJbWMsY0FBYyxLQUFLQSxXQUF2QjtBQUNBLGVBQUtBLFdBQUwsR0FBbUIsRUFBbkI7QUFDQUEsc0JBQVlqbkIsT0FBWixDQUFvQixLQUFLMm1CLFlBQXpCOztBQUVBLGNBQUlPLGNBQWMsS0FBS0EsV0FBdkI7QUFDQSxlQUFLQSxXQUFMLEdBQW1CLEVBQW5CO0FBQ0FBLHNCQUFZbG5CLE9BQVosQ0FBb0IsS0FBSzBtQixZQUF6QjtBQUNELFNBUkQ7O0FBVUFsa0IsNkJBQXFCVixTQUFyQixDQUErQjJDLE1BQS9CLEdBQXdDLFNBQVNBLE1BQVQsR0FBa0I7QUFDeEQ7QUFDQTtBQUNBLGNBQUkraUIsbUJBQW1CLEVBQXZCO0FBQ0EsZUFBSyxJQUFJMXJCLEdBQVQsSUFBZ0IsS0FBS2dCLEtBQUwsQ0FBVzBLLFFBQTNCLEVBQXFDO0FBQ25DLGdCQUFJOUQsUUFBUSxLQUFLNUcsS0FBTCxDQUFXMEssUUFBWCxDQUFvQjFMLEdBQXBCLENBQVo7QUFDQSxnQkFBSTRILEtBQUosRUFBVztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQThqQiwrQkFBaUJ0cEIsSUFBakIsQ0FBc0IzRSxNQUFNaUcsWUFBTixDQUFtQixLQUFLc0QsS0FBTCxDQUFXNEIsWUFBWCxDQUF3QmhCLEtBQXhCLENBQW5CLEVBQW1ELEVBQUVrWixLQUFLOWdCLEdBQVAsRUFBWUEsS0FBS0EsR0FBakIsRUFBbkQsQ0FBdEI7QUFDRDtBQUNGOztBQUVEO0FBQ0EsY0FBSWdILFFBQVFsRSxRQUFRLEVBQVIsRUFBWSxLQUFLa0UsS0FBakIsQ0FBWjtBQUNBLGlCQUFPQSxNQUFNb0IsZUFBYjtBQUNBLGlCQUFPcEIsTUFBTWMsY0FBYjtBQUNBLGlCQUFPZCxNQUFNZ0IsZ0JBQWI7QUFDQSxpQkFBT2hCLE1BQU1rQixlQUFiO0FBQ0EsaUJBQU9sQixNQUFNNEIsWUFBYjtBQUNBLGlCQUFPNUIsTUFBTTBCLHNCQUFiO0FBQ0EsaUJBQU8xQixNQUFNd0Isc0JBQWI7QUFDQSxpQkFBT3hCLE1BQU1zQix1QkFBYjtBQUNBLGlCQUFPdEIsTUFBTXFLLFNBQWI7O0FBRUEsaUJBQU81VCxNQUFNZ0MsYUFBTixDQUFvQixLQUFLdUgsS0FBTCxDQUFXcUssU0FBL0IsRUFBMENySyxLQUExQyxFQUFpRDBrQixnQkFBakQsQ0FBUDtBQUNELFNBN0JEOztBQStCQSxlQUFPaGxCLG9CQUFQO0FBQ0QsT0F2TDBCLENBdUx6QmpKLE1BQU02RyxTQXZMbUIsQ0FBM0I7O0FBeUxBb0MsMkJBQXFCbUMsV0FBckIsR0FBbUMsc0JBQW5DO0FBQ0FuQywyQkFBcUJvQyxTQUFyQixHQUFpQztBQUMvQnVJLG1CQUFXNVQsTUFBTWdILFNBQU4sQ0FBZ0I4ZixHQURJO0FBRS9CM2Isc0JBQWNuTCxNQUFNZ0gsU0FBTixDQUFnQjBIO0FBRkMsT0FBakM7QUFJQXpGLDJCQUFxQnNDLFlBQXJCLEdBQW9DO0FBQ2xDcUksbUJBQVcsTUFEdUI7QUFFbEN6SSxzQkFBYytDLGNBQWMwQjtBQUZNLE9BQXBDOztBQU1BblEsYUFBT0QsT0FBUCxHQUFpQnlKLG9CQUFqQjtBQUNDLEtBck9xQixFQXFPcEIsRUFBQyxNQUFLLEVBQU4sRUFBUyxNQUFLLEVBQWQsRUFBaUIsTUFBSyxFQUF0QixFQUF5QixLQUFJLENBQTdCLEVBck9vQixDQXQySGt4QixFQTJrSXJ3QixJQUFHLENBQUMsVUFBU2pJLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDdkU7Ozs7Ozs7Ozs7QUFVQTs7QUFFQUMsYUFBT0QsT0FBUCxHQUFpQixRQUFqQjtBQUNDLEtBZHFDLEVBY3BDLEVBZG9DLENBM2tJa3dCLEVBeWxJbHlCLElBQUcsQ0FBQyxVQUFTd0IsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUMxQzs7Ozs7Ozs7OztBQVVBOztBQUVBLFVBQUk2RCxtQkFBbUJyQyxRQUFRLENBQVIsQ0FBdkI7QUFDQSxVQUFJaEIsUUFBUWdCLFFBQVEsQ0FBUixDQUFaO0FBQ0EsVUFBSXdLLDZCQUE2QnhLLFFBQVEsQ0FBUixDQUFqQztBQUNBLFVBQUl1YSxvQ0FBb0N2YSxRQUFRLEVBQVIsQ0FBeEM7QUFDQSxVQUFJd0ksMEJBQTBCeEksUUFBUSxDQUFSLENBQTlCO0FBQ0EsVUFBSXdsQixnQkFBZ0J4bEIsUUFBUSxFQUFSLENBQXBCO0FBQ0EsVUFBSWlJLHVCQUF1QmpJLFFBQVEsRUFBUixDQUEzQjs7QUFFQSxVQUFJc2EsaUJBQWlCdGEsUUFBUSxFQUFSLENBQXJCO0FBQ0EsVUFBSWt0QixTQUFTbHRCLFFBQVEsRUFBUixDQUFiOztBQUVBaEIsWUFBTW11QixNQUFOLEdBQWU7QUFDYkMsNEJBQW9CNWtCLHVCQURQO0FBRWJuRywwQkFBa0JBLGdCQUZMO0FBR2JnckIseUJBQWlCOVMsaUNBSEo7QUFJYitTLHlCQUFpQnJsQixvQkFKSjs7QUFNYnNsQix3QkFBZ0IvSCxjQUFjL2QsTUFOakI7QUFPYjZTLHdCQUFnQkEsY0FQSDtBQVFiNFMsZ0JBQVFBO0FBUkssT0FBZjs7QUFXQSxVQUFJLGtCQUFrQixZQUF0QixFQUFvQztBQUNsQztBQUNBO0FBQ0ExbEIsZUFBTzROLGNBQVAsQ0FBc0JwVyxNQUFNbXVCLE1BQTVCLEVBQW9DLE1BQXBDLEVBQTRDO0FBQzFDdmxCLHNCQUFZLElBRDhCO0FBRTFDeU4sZUFBSyxlQUFZO0FBQ2YsbUJBQU83SywyQkFBMkI5RCxZQUEzQixFQUFQO0FBQ0Q7QUFKeUMsU0FBNUM7QUFNQWMsZUFBTzROLGNBQVAsQ0FBc0JwVyxNQUFNbXVCLE1BQTVCLEVBQW9DLFdBQXBDLEVBQWlEO0FBQy9DdmxCLHNCQUFZLElBRG1DO0FBRS9DeU4sZUFBSyxlQUFZO0FBQ2YsbUJBQU83SywyQkFBMkIzRCxpQkFBM0IsRUFBUDtBQUNEO0FBSjhDLFNBQWpEO0FBTUQ7O0FBRURwSSxhQUFPRCxPQUFQLEdBQWlCUSxLQUFqQjtBQUNDLEtBckRRLEVBcURQLEVBQUMsTUFBSyxFQUFOLEVBQVMsTUFBSyxFQUFkLEVBQWlCLE1BQUssRUFBdEIsRUFBeUIsS0FBSSxDQUE3QixFQUErQixNQUFLLEVBQXBDLEVBQXVDLE1BQUssRUFBNUMsRUFBK0MsS0FBSSxDQUFuRCxFQUFxRCxLQUFJLENBQXpELEVBQTJELEtBQUksQ0FBL0QsRUFyRE8sQ0F6bEkreEIsRUE4b0ludUIsSUFBRyxDQUFDLFVBQVNnQixPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ3pHOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsVUFBSTZGLFVBQVVyRSxRQUFRLEVBQVIsQ0FBZDs7QUFFQSxVQUFJd3RCLGtCQUFrQnh0QixRQUFRLEVBQVIsQ0FBdEI7O0FBRUE7QUFDQSxVQUFJd0csMEJBQTBCbkMsUUFBUTtBQUNwQ29DLHFFQUE2RCxJQUR6QixFQUMrQjtBQUNuRUUsNERBQW9EO0FBQ2xENE8sNkJBQW1CdlYsUUFBUSxFQUFSO0FBRCtCO0FBRmhCLE9BQVIsRUFLM0J3dEIsZUFMMkIsQ0FBOUI7O0FBT0EsVUFBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbENucEIsZ0JBQVFtQyx3QkFBd0JHLGtEQUFoQyxFQUFvRjtBQUNsRjtBQUNBeVIsa0NBQXdCcFksUUFBUSxFQUFSO0FBRjBELFNBQXBGO0FBSUQ7O0FBRUR2QixhQUFPRCxPQUFQLEdBQWlCZ0ksdUJBQWpCO0FBQ0MsS0FqQ3VFLEVBaUN0RSxFQUFDLE1BQUssRUFBTixFQUFTLE1BQUssRUFBZCxFQUFpQixNQUFLLEVBQXRCLEVBQXlCLE1BQUssRUFBOUIsRUFqQ3NFLENBOW9JZ3VCLEVBK3FJbndCLElBQUcsQ0FBQyxVQUFTeEcsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUN6RTs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQSxVQUFJa1csb0JBQW9CLEtBQXhCO0FBQ0EsVUFBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbEMsWUFBSTtBQUNGO0FBQ0FsTixpQkFBTzROLGNBQVAsQ0FBc0IsRUFBdEIsRUFBMEIsR0FBMUIsRUFBK0IsRUFBRUMsS0FBSyxlQUFZLENBQUUsQ0FBckIsRUFBL0I7QUFDQVgsOEJBQW9CLElBQXBCO0FBQ0QsU0FKRCxDQUlFLE9BQU82UyxDQUFQLEVBQVU7QUFDVjtBQUNEO0FBQ0Y7O0FBRUQ5b0IsYUFBT0QsT0FBUCxHQUFpQmtXLGlCQUFqQjtBQUNDLEtBMUJ1QyxFQTBCdEMsRUExQnNDLENBL3FJZ3dCLEVBeXNJbHlCLElBQUcsQ0FBQyxVQUFTMVUsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUMxQyxPQUFDLFVBQVVpdkIsT0FBVixFQUFrQjtBQUNuQjs7Ozs7Ozs7OztBQVVBOztBQUVBLFlBQUlockIsaUJBQWlCekMsUUFBUSxFQUFSLENBQXJCOztBQUVBLFlBQUlvUCw2QkFBNkJwUCxRQUFRLEVBQVIsQ0FBakM7QUFDQSxZQUFJcW1CLHVCQUF1QnJtQixRQUFRLEVBQVIsQ0FBM0I7O0FBRUEsWUFBSTBDLFlBQVkxQyxRQUFRLEVBQVIsQ0FBaEI7QUFDQSxZQUFJK0UsVUFBVS9FLFFBQVEsRUFBUixDQUFkOztBQUVBLFlBQUlvWSxzQkFBSjs7QUFFQSxZQUFJLE9BQU9xVixPQUFQLEtBQW1CLFdBQW5CLElBQWtDQSxRQUFRQyxHQUExQyxJQUFpRCxrQkFBa0IsTUFBdkUsRUFBK0U7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBdFYsbUNBQXlCcFksUUFBUSxFQUFSLENBQXpCO0FBQ0Q7O0FBRUQsWUFBSTJ0QixxQkFBcUIsRUFBekI7O0FBRUE7Ozs7Ozs7Ozs7OztBQVlBLGlCQUFTM0osa0JBQVQsQ0FBNEI0SixTQUE1QixFQUF1Q0MsTUFBdkMsRUFBK0M3YyxRQUEvQyxFQUF5RG1DLGFBQXpELEVBQXdFOEUsT0FBeEUsRUFBaUY2VixPQUFqRixFQUEwRjtBQUN4RixlQUFLLElBQUlDLFlBQVQsSUFBeUJILFNBQXpCLEVBQW9DO0FBQ2xDLGdCQUFJQSxVQUFVdnNCLGNBQVYsQ0FBeUIwc0IsWUFBekIsQ0FBSixFQUE0QztBQUMxQyxrQkFBSWpGLEtBQUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBSTtBQUNGO0FBQ0E7QUFDQSxrQkFBRSxPQUFPOEUsVUFBVUcsWUFBVixDQUFQLEtBQW1DLFVBQXJDLElBQW1ELGtCQUFrQixZQUFsQixHQUFpQ3JyQixVQUFVLEtBQVYsRUFBaUIsbUZBQWpCLEVBQXNHeVEsaUJBQWlCLGFBQXZILEVBQXNJL0QsMkJBQTJCNEIsUUFBM0IsQ0FBdEksRUFBNEsrYyxZQUE1SyxDQUFqQyxHQUE2TnRyQixlQUFlLElBQWYsRUFBcUIwUSxpQkFBaUIsYUFBdEMsRUFBcUQvRCwyQkFBMkI0QixRQUEzQixDQUFyRCxFQUEyRitjLFlBQTNGLENBQWhSLEdBQTJYLEtBQUssQ0FBaFk7QUFDQWpGLHdCQUFROEUsVUFBVUcsWUFBVixFQUF3QkYsTUFBeEIsRUFBZ0NFLFlBQWhDLEVBQThDNWEsYUFBOUMsRUFBNkRuQyxRQUE3RCxFQUF1RSxJQUF2RSxFQUE2RXFWLG9CQUE3RSxDQUFSO0FBQ0QsZUFMRCxDQUtFLE9BQU8ySCxFQUFQLEVBQVc7QUFDWGxGLHdCQUFRa0YsRUFBUjtBQUNEO0FBQ0QsZ0NBQWtCLFlBQWxCLEdBQWlDanBCLFFBQVEsQ0FBQytqQixLQUFELElBQVVBLGlCQUFpQm5wQixLQUFuQyxFQUEwQyxvRUFBb0UsK0RBQXBFLEdBQXNJLGlFQUF0SSxHQUEwTSxnRUFBMU0sR0FBNlEsaUNBQXZULEVBQTBWd1QsaUJBQWlCLGFBQTNXLEVBQTBYL0QsMkJBQTJCNEIsUUFBM0IsQ0FBMVgsRUFBZ2ErYyxZQUFoYSxTQUFxYmpGLEtBQXJiLHlDQUFxYkEsS0FBcmIsRUFBakMsR0FBK2QsS0FBSyxDQUFwZTtBQUNBLGtCQUFJQSxpQkFBaUJucEIsS0FBakIsSUFBMEIsRUFBRW1wQixNQUFNcEIsT0FBTixJQUFpQmlHLGtCQUFuQixDQUE5QixFQUFzRTtBQUNwRTtBQUNBO0FBQ0FBLG1DQUFtQjdFLE1BQU1wQixPQUF6QixJQUFvQyxJQUFwQzs7QUFFQSxvQkFBSXVHLHFCQUFxQixFQUF6Qjs7QUFFQSxvQkFBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbEMsc0JBQUksQ0FBQzdWLHNCQUFMLEVBQTZCO0FBQzNCQSw2Q0FBeUJwWSxRQUFRLEVBQVIsQ0FBekI7QUFDRDtBQUNELHNCQUFJOHRCLFlBQVksSUFBaEIsRUFBc0I7QUFDcEJHLHlDQUFxQjdWLHVCQUF1QjJCLG9CQUF2QixDQUE0QytULE9BQTVDLENBQXJCO0FBQ0QsbUJBRkQsTUFFTyxJQUFJN1YsWUFBWSxJQUFoQixFQUFzQjtBQUMzQmdXLHlDQUFxQjdWLHVCQUF1Qm1CLHVCQUF2QixDQUErQ3RCLE9BQS9DLENBQXJCO0FBQ0Q7QUFDRjs7QUFFRCxrQ0FBa0IsWUFBbEIsR0FBaUNsVCxRQUFRLEtBQVIsRUFBZSxzQkFBZixFQUF1Q2lNLFFBQXZDLEVBQWlEOFgsTUFBTXBCLE9BQXZELEVBQWdFdUcsa0JBQWhFLENBQWpDLEdBQXVILEtBQUssQ0FBNUg7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFRHh2QixlQUFPRCxPQUFQLEdBQWlCd2xCLGtCQUFqQjtBQUNDLE9BdkZELEVBdUZHbGtCLElBdkZILENBdUZRLElBdkZSLEVBdUZhd1MsU0F2RmI7QUF3RkMsS0F6RlEsRUF5RlAsRUFBQyxNQUFLLEVBQU4sRUFBUyxNQUFLLEVBQWQsRUFBaUIsTUFBSyxFQUF0QixFQUF5QixNQUFLLEVBQTlCLEVBQWlDLE1BQUssRUFBdEMsRUFBeUMsTUFBSyxFQUE5QyxFQXpGTyxDQXpzSSt4QixFQWt5SW52QixJQUFHLENBQUMsVUFBU3RTLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDekYsT0FBQyxVQUFVaXZCLE9BQVYsRUFBa0I7QUFDbkI7Ozs7Ozs7Ozs7O0FBV0E7O0FBRUEsWUFBSXZyQixpQkFBaUJsQyxRQUFRLENBQVIsQ0FBckI7QUFDQSxZQUFJbU4sc0JBQXNCbk4sUUFBUSxFQUFSLENBQTFCO0FBQ0EsWUFBSStFLFVBQVUvRSxRQUFRLEVBQVIsQ0FBZDs7QUFFQSxZQUFJb1ksc0JBQUo7O0FBRUEsWUFBSSxPQUFPcVYsT0FBUCxLQUFtQixXQUFuQixJQUFrQ0EsUUFBUUMsR0FBMUMsSUFBaUQsa0JBQWtCLE1BQXZFLEVBQStFO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQXRWLG1DQUF5QnBZLFFBQVEsRUFBUixDQUF6QjtBQUNEOztBQUVEOzs7Ozs7QUFNQSxpQkFBU2t1Qiw2QkFBVCxDQUF1Q2xnQixlQUF2QyxFQUF3RDdFLEtBQXhELEVBQStEQyxJQUEvRCxFQUFxRXdoQixXQUFyRSxFQUFrRjtBQUNoRjtBQUNBLGNBQUk1YyxtQkFBbUIsUUFBT0EsZUFBUCx5Q0FBT0EsZUFBUCxPQUEyQixRQUFsRCxFQUE0RDtBQUMxRCxnQkFBSU0sU0FBU04sZUFBYjtBQUNBLGdCQUFJbWdCLFlBQVk3ZixPQUFPbEYsSUFBUCxNQUFpQmtKLFNBQWpDO0FBQ0EsZ0JBQUksa0JBQWtCLFlBQXRCLEVBQW9DO0FBQ2xDLGtCQUFJLENBQUM4RixzQkFBTCxFQUE2QjtBQUMzQkEseUNBQXlCcFksUUFBUSxFQUFSLENBQXpCO0FBQ0Q7QUFDRCxrQkFBSSxDQUFDbXVCLFNBQUwsRUFBZ0I7QUFDZCxrQ0FBa0IsWUFBbEIsR0FBaUNwcEIsUUFBUSxLQUFSLEVBQWUsdUVBQXVFLHVFQUF2RSxHQUFpSixpQ0FBaEssRUFBbU03QyxlQUFlTCxRQUFmLENBQXdCdUgsSUFBeEIsQ0FBbk0sRUFBa09nUCx1QkFBdUIyQixvQkFBdkIsQ0FBNEM2USxXQUE1QyxDQUFsTyxDQUFqQyxHQUErVCxLQUFLLENBQXBVO0FBQ0Q7QUFDRjtBQUNELGdCQUFJdUQsYUFBYWhsQixTQUFTLElBQTFCLEVBQWdDO0FBQzlCbUYscUJBQU9sRixJQUFQLElBQWVELEtBQWY7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQ7Ozs7O0FBS0EsaUJBQVNzaEIsZUFBVCxDQUF5QnhkLFFBQXpCLEVBQW1DMmQsV0FBbkMsRUFBZ0Q7QUFDOUMsY0FBSTNkLFlBQVksSUFBaEIsRUFBc0I7QUFDcEIsbUJBQU9BLFFBQVA7QUFDRDtBQUNELGNBQUlxQixTQUFTLEVBQWI7O0FBRUEsY0FBSSxrQkFBa0IsWUFBdEIsRUFBb0M7QUFDbENuQixnQ0FBb0JGLFFBQXBCLEVBQThCLFVBQVVlLGVBQVYsRUFBMkI3RSxLQUEzQixFQUFrQ0MsSUFBbEMsRUFBd0M7QUFDcEUscUJBQU84a0IsOEJBQThCbGdCLGVBQTlCLEVBQStDN0UsS0FBL0MsRUFBc0RDLElBQXRELEVBQTREd2hCLFdBQTVELENBQVA7QUFDRCxhQUZELEVBRUd0YyxNQUZIO0FBR0QsV0FKRCxNQUlPO0FBQ0xuQixnQ0FBb0JGLFFBQXBCLEVBQThCaWhCLDZCQUE5QixFQUE2RDVmLE1BQTdEO0FBQ0Q7QUFDRCxpQkFBT0EsTUFBUDtBQUNEOztBQUVEN1AsZUFBT0QsT0FBUCxHQUFpQmlzQixlQUFqQjtBQUNDLE9BNUVELEVBNEVHM3FCLElBNUVILENBNEVRLElBNUVSLEVBNEVhd1MsU0E1RWI7QUE2RUMsS0E5RXVELEVBOEV0RCxFQUFDLE1BQUssRUFBTixFQUFTLEtBQUksQ0FBYixFQUFlLE1BQUssRUFBcEIsRUFBdUIsTUFBSyxFQUE1QixFQTlFc0QsQ0FseUlndkIsRUFnM0lyd0IsSUFBRyxDQUFDLFVBQVN0UyxPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ3ZFOzs7Ozs7Ozs7OztBQVdBOztBQUVBOztBQUVBLFVBQUk0dkIsa0JBQWtCLE9BQU9ySyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDQSxPQUFPZ0IsUUFBN0Q7QUFDQSxVQUFJc0osdUJBQXVCLFlBQTNCLENBakJ1RSxDQWlCOUI7O0FBRXpDOzs7Ozs7Ozs7Ozs7OztBQWNBLGVBQVNwSyxhQUFULENBQXVCcUssYUFBdkIsRUFBc0M7QUFDcEMsWUFBSXpKLGFBQWF5SixrQkFBa0JGLG1CQUFtQkUsY0FBY0YsZUFBZCxDQUFuQixJQUFxREUsY0FBY0Qsb0JBQWQsQ0FBdkUsQ0FBakI7QUFDQSxZQUFJLE9BQU94SixVQUFQLEtBQXNCLFVBQTFCLEVBQXNDO0FBQ3BDLGlCQUFPQSxVQUFQO0FBQ0Q7QUFDRjs7QUFFRHBtQixhQUFPRCxPQUFQLEdBQWlCeWxCLGFBQWpCO0FBQ0MsS0F6Q3FDLEVBeUNwQyxFQXpDb0MsQ0FoM0lrd0IsRUF5NUlseUIsSUFBRyxDQUFDLFVBQVNqa0IsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUMxQzs7Ozs7Ozs7O0FBU0E7O0FBRUEsVUFBSWlFLGlCQUFpQnpDLFFBQVEsRUFBUixDQUFyQjs7QUFFQSxVQUFJMkUsZUFBZTNFLFFBQVEsRUFBUixDQUFuQjs7QUFFQSxVQUFJMEMsWUFBWTFDLFFBQVEsRUFBUixDQUFoQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxlQUFTOEUsU0FBVCxDQUFtQm1JLFFBQW5CLEVBQTZCO0FBQzNCLFNBQUN0SSxhQUFhb0IsY0FBYixDQUE0QmtILFFBQTVCLENBQUQsR0FBeUMsa0JBQWtCLFlBQWxCLEdBQWlDdkssVUFBVSxLQUFWLEVBQWlCLHVFQUFqQixDQUFqQyxHQUE2SEQsZUFBZSxLQUFmLENBQXRLLEdBQThMLEtBQUssQ0FBbk07QUFDQSxlQUFPd0ssUUFBUDtBQUNEOztBQUVEeE8sYUFBT0QsT0FBUCxHQUFpQnNHLFNBQWpCO0FBQ0MsS0F0Q1EsRUFzQ1AsRUFBQyxNQUFLLEVBQU4sRUFBUyxNQUFLLEVBQWQsRUFBaUIsTUFBSyxFQUF0QixFQXRDTyxDQXo1SSt4QixFQSs3STN3QixJQUFHLENBQUMsVUFBUzlFLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDakU7Ozs7Ozs7Ozs7QUFVQTs7QUFFQTs7Ozs7OztBQU9BLGVBQVMrdkIsa0JBQVQsQ0FBNEIzdUIsSUFBNUIsRUFBa0M7QUFDaEMsWUFBSTR1QixXQUFXbHBCLFVBQVV2RixNQUFWLEdBQW1CLENBQWxDOztBQUVBLFlBQUkybkIsVUFBVSwyQkFBMkI5bkIsSUFBM0IsR0FBa0MsVUFBbEMsR0FBK0Msb0VBQS9DLEdBQXNIQSxJQUFwSTs7QUFFQSxhQUFLLElBQUk2dUIsU0FBUyxDQUFsQixFQUFxQkEsU0FBU0QsUUFBOUIsRUFBd0NDLFFBQXhDLEVBQWtEO0FBQ2hEL0cscUJBQVcsYUFBYWdILG1CQUFtQnBwQixVQUFVbXBCLFNBQVMsQ0FBbkIsQ0FBbkIsQ0FBeEI7QUFDRDs7QUFFRC9HLG1CQUFXLGtFQUFrRSxtREFBN0U7O0FBRUEsWUFBSW9CLFFBQVEsSUFBSW5wQixLQUFKLENBQVUrbkIsT0FBVixDQUFaO0FBQ0FvQixjQUFNMWYsSUFBTixHQUFhLHFCQUFiO0FBQ0EwZixjQUFNNkYsV0FBTixHQUFvQixDQUFwQixDQWJnQyxDQWFUOztBQUV2QixjQUFNN0YsS0FBTjtBQUNEOztBQUVEcnFCLGFBQU9ELE9BQVAsR0FBaUIrdkIsa0JBQWpCO0FBQ0MsS0F2QytCLEVBdUM5QixFQXZDOEIsQ0EvN0l3d0IsRUFzK0lseUIsSUFBRyxDQUFDLFVBQVN2dUIsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUMxQzs7Ozs7Ozs7OztBQVVBOztBQUVBLFVBQUlvd0IsZUFBZTV1QixRQUFRLEVBQVIsQ0FBbkI7O0FBRUE7Ozs7O0FBS0EsZUFBU3NhLGNBQVQsQ0FBd0J2WCxRQUF4QixFQUFrQ3lYLFNBQWxDLEVBQTZDQyxTQUE3QyxFQUF3RDtBQUN0RCxlQUFPLENBQUNtVSxhQUFhN3JCLFNBQVN3RixLQUF0QixFQUE2QmlTLFNBQTdCLENBQUQsSUFBNEMsQ0FBQ29VLGFBQWE3ckIsU0FBU1IsS0FBdEIsRUFBNkJrWSxTQUE3QixDQUFwRDtBQUNEOztBQUVEaGMsYUFBT0QsT0FBUCxHQUFpQjhiLGNBQWpCO0FBQ0MsS0F6QlEsRUF5QlAsRUFBQyxNQUFLLEVBQU4sRUF6Qk8sQ0F0K0kreEIsRUErL0kzeEIsSUFBRyxDQUFDLFVBQVN0YSxPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ2pEOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsVUFBSWlFLGlCQUFpQnpDLFFBQVEsRUFBUixDQUFyQjs7QUFFQSxVQUFJdVYsb0JBQW9CdlYsUUFBUSxFQUFSLENBQXhCO0FBQ0EsVUFBSW1pQixxQkFBcUJuaUIsUUFBUSxFQUFSLENBQXpCOztBQUVBLFVBQUlpa0IsZ0JBQWdCamtCLFFBQVEsRUFBUixDQUFwQjtBQUNBLFVBQUkwQyxZQUFZMUMsUUFBUSxFQUFSLENBQWhCO0FBQ0EsVUFBSWtDLGlCQUFpQmxDLFFBQVEsQ0FBUixDQUFyQjtBQUNBLFVBQUkrRSxVQUFVL0UsUUFBUSxFQUFSLENBQWQ7O0FBRUEsVUFBSTZ1QixZQUFZLEdBQWhCO0FBQ0EsVUFBSUMsZUFBZSxHQUFuQjs7QUFFQTs7Ozs7O0FBTUE7Ozs7O0FBS0EsVUFBSUMsbUJBQW1CLEtBQXZCOztBQUVBOzs7Ozs7O0FBT0EsZUFBU0MsZUFBVCxDQUF5QnBjLFNBQXpCLEVBQW9DcWMsS0FBcEMsRUFBMkM7QUFDekM7QUFDQTtBQUNBLFlBQUlyYyxhQUFhLFFBQU9BLFNBQVAseUNBQU9BLFNBQVAsT0FBcUIsUUFBbEMsSUFBOENBLFVBQVVyUixHQUFWLElBQWlCLElBQW5FLEVBQXlFO0FBQ3ZFO0FBQ0EsaUJBQU9XLGVBQWVaLE1BQWYsQ0FBc0JzUixVQUFVclIsR0FBaEMsQ0FBUDtBQUNEO0FBQ0Q7QUFDQSxlQUFPMHRCLE1BQU10WixRQUFOLENBQWUsRUFBZixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUUEsZUFBU3VaLHVCQUFULENBQWlDamlCLFFBQWpDLEVBQTJDa2lCLFNBQTNDLEVBQXNEdmIsUUFBdEQsRUFBZ0U1RixlQUFoRSxFQUFpRjtBQUMvRSxZQUFJa0ssY0FBY2pMLFFBQWQseUNBQWNBLFFBQWQsQ0FBSjs7QUFFQSxZQUFJaUwsU0FBUyxXQUFULElBQXdCQSxTQUFTLFNBQXJDLEVBQWdEO0FBQzlDO0FBQ0FqTCxxQkFBVyxJQUFYO0FBQ0Q7O0FBRUQsWUFBSUEsYUFBYSxJQUFiLElBQXFCaUwsU0FBUyxRQUE5QixJQUEwQ0EsU0FBUyxRQUFuRDtBQUNKO0FBQ0E7QUFDQUEsaUJBQVMsUUFBVCxJQUFxQmpMLFNBQVNtVyxRQUFULEtBQXNCakIsa0JBSDNDLEVBRytEO0FBQzdEdk8sbUJBQVM1RixlQUFULEVBQTBCZixRQUExQjtBQUNBO0FBQ0E7QUFDQWtpQix3QkFBYyxFQUFkLEdBQW1CTixZQUFZRyxnQkFBZ0IvaEIsUUFBaEIsRUFBMEIsQ0FBMUIsQ0FBL0IsR0FBOERraUIsU0FIOUQ7QUFJQSxpQkFBTyxDQUFQO0FBQ0Q7O0FBRUQsWUFBSWhtQixLQUFKO0FBQ0EsWUFBSWltQixRQUFKO0FBQ0EsWUFBSUMsZUFBZSxDQUFuQixDQXJCK0UsQ0FxQnpEO0FBQ3RCLFlBQUlDLGlCQUFpQkgsY0FBYyxFQUFkLEdBQW1CTixTQUFuQixHQUErQk0sWUFBWUwsWUFBaEU7O0FBRUEsWUFBSS9sQixNQUFNMkYsT0FBTixDQUFjekIsUUFBZCxDQUFKLEVBQTZCO0FBQzNCLGVBQUssSUFBSXZOLElBQUksQ0FBYixFQUFnQkEsSUFBSXVOLFNBQVNsTixNQUE3QixFQUFxQ0wsR0FBckMsRUFBMEM7QUFDeEN5SixvQkFBUThELFNBQVN2TixDQUFULENBQVI7QUFDQTB2Qix1QkFBV0UsaUJBQWlCTixnQkFBZ0I3bEIsS0FBaEIsRUFBdUJ6SixDQUF2QixDQUE1QjtBQUNBMnZCLDRCQUFnQkgsd0JBQXdCL2xCLEtBQXhCLEVBQStCaW1CLFFBQS9CLEVBQXlDeGIsUUFBekMsRUFBbUQ1RixlQUFuRCxDQUFoQjtBQUNEO0FBQ0YsU0FORCxNQU1PO0FBQ0wsY0FBSTZXLGFBQWFaLGNBQWNoWCxRQUFkLENBQWpCO0FBQ0EsY0FBSTRYLFVBQUosRUFBZ0I7QUFDZCxnQkFBSUUsV0FBV0YsV0FBVy9rQixJQUFYLENBQWdCbU4sUUFBaEIsQ0FBZjtBQUNBLGdCQUFJK1gsSUFBSjtBQUNBLGdCQUFJSCxlQUFlNVgsU0FBUzZYLE9BQTVCLEVBQXFDO0FBQ25DLGtCQUFJeUssS0FBSyxDQUFUO0FBQ0EscUJBQU8sQ0FBQyxDQUFDdkssT0FBT0QsU0FBU0UsSUFBVCxFQUFSLEVBQXlCblksSUFBakMsRUFBdUM7QUFDckMzRCx3QkFBUTZiLEtBQUtyZCxLQUFiO0FBQ0F5bkIsMkJBQVdFLGlCQUFpQk4sZ0JBQWdCN2xCLEtBQWhCLEVBQXVCb21CLElBQXZCLENBQTVCO0FBQ0FGLGdDQUFnQkgsd0JBQXdCL2xCLEtBQXhCLEVBQStCaW1CLFFBQS9CLEVBQXlDeGIsUUFBekMsRUFBbUQ1RixlQUFuRCxDQUFoQjtBQUNEO0FBQ0YsYUFQRCxNQU9PO0FBQ0wsa0JBQUksa0JBQWtCLFlBQXRCLEVBQW9DO0FBQ2xDLG9CQUFJd2hCLHlCQUF5QixFQUE3QjtBQUNBLG9CQUFJamEsa0JBQWtCc0UsT0FBdEIsRUFBK0I7QUFDN0Isc0JBQUk0ViwwQkFBMEJsYSxrQkFBa0JzRSxPQUFsQixDQUEwQkYsT0FBMUIsRUFBOUI7QUFDQSxzQkFBSThWLHVCQUFKLEVBQTZCO0FBQzNCRCw2Q0FBeUIsa0NBQWtDQyx1QkFBbEMsR0FBNEQsSUFBckY7QUFDRDtBQUNGO0FBQ0Qsa0NBQWtCLFlBQWxCLEdBQWlDMXFCLFFBQVFncUIsZ0JBQVIsRUFBMEIsaUVBQWlFLDhEQUFqRSxHQUFrSSx1REFBNUosRUFBcU5TLHNCQUFyTixDQUFqQyxHQUFnUixLQUFLLENBQXJSO0FBQ0FULG1DQUFtQixJQUFuQjtBQUNEO0FBQ0Q7QUFDQSxxQkFBTyxDQUFDLENBQUMvSixPQUFPRCxTQUFTRSxJQUFULEVBQVIsRUFBeUJuWSxJQUFqQyxFQUF1QztBQUNyQyxvQkFBSStjLFFBQVE3RSxLQUFLcmQsS0FBakI7QUFDQSxvQkFBSWtpQixLQUFKLEVBQVc7QUFDVDFnQiwwQkFBUTBnQixNQUFNLENBQU4sQ0FBUjtBQUNBdUYsNkJBQVdFLGlCQUFpQnB0QixlQUFlWixNQUFmLENBQXNCdW9CLE1BQU0sQ0FBTixDQUF0QixDQUFqQixHQUFtRGlGLFlBQW5ELEdBQWtFRSxnQkFBZ0I3bEIsS0FBaEIsRUFBdUIsQ0FBdkIsQ0FBN0U7QUFDQWttQixrQ0FBZ0JILHdCQUF3Qi9sQixLQUF4QixFQUErQmltQixRQUEvQixFQUF5Q3hiLFFBQXpDLEVBQW1ENUYsZUFBbkQsQ0FBaEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixXQWhDRCxNQWdDTyxJQUFJa0ssU0FBUyxRQUFiLEVBQXVCO0FBQzVCLGdCQUFJd1gsV0FBVyxFQUFmO0FBQ0EsZ0JBQUksa0JBQWtCLFlBQXRCLEVBQW9DO0FBQ2xDQSx5QkFBVyxvRUFBb0UsbUVBQXBFLEdBQTBJLGdCQUFySjtBQUNBLGtCQUFJemlCLFNBQVMwaUIsZUFBYixFQUE4QjtBQUM1QkQsMkJBQVcsb0VBQW9FLDREQUEvRTtBQUNEO0FBQ0Qsa0JBQUluYSxrQkFBa0JzRSxPQUF0QixFQUErQjtBQUM3QixvQkFBSXpRLE9BQU9tTSxrQkFBa0JzRSxPQUFsQixDQUEwQkYsT0FBMUIsRUFBWDtBQUNBLG9CQUFJdlEsSUFBSixFQUFVO0FBQ1JzbUIsOEJBQVksa0NBQWtDdG1CLElBQWxDLEdBQXlDLElBQXJEO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsZ0JBQUl3bUIsaUJBQWlCQyxPQUFPNWlCLFFBQVAsQ0FBckI7QUFDQSxhQUFDLEtBQUQsR0FBUyxrQkFBa0IsWUFBbEIsR0FBaUN2SyxVQUFVLEtBQVYsRUFBaUIsdURBQWpCLEVBQTBFa3RCLG1CQUFtQixpQkFBbkIsR0FBdUMsdUJBQXVCcG9CLE9BQU80TyxJQUFQLENBQVluSixRQUFaLEVBQXNCNmlCLElBQXRCLENBQTJCLElBQTNCLENBQXZCLEdBQTBELEdBQWpHLEdBQXVHRixjQUFqTCxFQUFpTUYsUUFBak0sQ0FBakMsR0FBOE9qdEIsZUFBZSxJQUFmLEVBQXFCbXRCLG1CQUFtQixpQkFBbkIsR0FBdUMsdUJBQXVCcG9CLE9BQU80TyxJQUFQLENBQVluSixRQUFaLEVBQXNCNmlCLElBQXRCLENBQTJCLElBQTNCLENBQXZCLEdBQTBELEdBQWpHLEdBQXVHRixjQUE1SCxFQUE0SUYsUUFBNUksQ0FBdlAsR0FBK1ksS0FBSyxDQUFwWjtBQUNEO0FBQ0Y7O0FBRUQsZUFBT0wsWUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBLGVBQVNsaUIsbUJBQVQsQ0FBNkJGLFFBQTdCLEVBQXVDMkcsUUFBdkMsRUFBaUQ1RixlQUFqRCxFQUFrRTtBQUNoRSxZQUFJZixZQUFZLElBQWhCLEVBQXNCO0FBQ3BCLGlCQUFPLENBQVA7QUFDRDs7QUFFRCxlQUFPaWlCLHdCQUF3QmppQixRQUF4QixFQUFrQyxFQUFsQyxFQUFzQzJHLFFBQXRDLEVBQWdENUYsZUFBaEQsQ0FBUDtBQUNEOztBQUVEdlAsYUFBT0QsT0FBUCxHQUFpQjJPLG1CQUFqQjtBQUNDLEtBaExlLEVBZ0xkLEVBQUMsTUFBSyxFQUFOLEVBQVMsTUFBSyxFQUFkLEVBQWlCLEtBQUksQ0FBckIsRUFBdUIsTUFBSyxFQUE1QixFQUErQixNQUFLLEVBQXBDLEVBQXVDLE1BQUssRUFBNUMsRUFBK0MsTUFBSyxFQUFwRCxFQWhMYyxDQS8vSXd4QixFQStxSjd1QixJQUFHLENBQUMsVUFBU25OLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDL0Y7Ozs7Ozs7Ozs7QUFVQTs7QUFFQTs7QUFFQSxVQUFJaUUsaUJBQWlCekMsUUFBUSxFQUFSLENBQXJCO0FBQUEsVUFDSXFFLFVBQVVyRSxRQUFRLEVBQVIsQ0FEZDs7QUFHQSxVQUFJMEMsWUFBWTFDLFFBQVEsRUFBUixDQUFoQjtBQUNBLFVBQUlxQixpQkFBaUIsR0FBR0EsY0FBeEI7O0FBRUEsZUFBUzB1QixXQUFULENBQXFCeEksQ0FBckIsRUFBd0I7QUFDdEIsWUFBSXhlLE1BQU0yRixPQUFOLENBQWM2WSxDQUFkLENBQUosRUFBc0I7QUFDcEIsaUJBQU9BLEVBQUV0ZSxNQUFGLEVBQVA7QUFDRCxTQUZELE1BRU8sSUFBSXNlLEtBQUssUUFBT0EsQ0FBUCx5Q0FBT0EsQ0FBUCxPQUFhLFFBQXRCLEVBQWdDO0FBQ3JDLGlCQUFPbGpCLFFBQVEsSUFBSWtqQixFQUFFN2YsV0FBTixFQUFSLEVBQTZCNmYsQ0FBN0IsQ0FBUDtBQUNELFNBRk0sTUFFQTtBQUNMLGlCQUFPQSxDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJeUksZUFBZSxPQUFuQjtBQUNBLFVBQUlDLGtCQUFrQixVQUF0QjtBQUNBLFVBQUlDLGlCQUFpQixTQUFyQjtBQUNBLFVBQUlDLGNBQWMsTUFBbEI7QUFDQSxVQUFJQyxnQkFBZ0IsUUFBcEI7QUFDQSxVQUFJQyxnQkFBZ0IsUUFBcEI7O0FBRUEsVUFBSUMsb0JBQW9CLENBQUNOLFlBQUQsRUFBZUMsZUFBZixFQUFnQ0MsY0FBaEMsRUFBZ0RDLFdBQWhELEVBQTZEQyxhQUE3RCxFQUE0RUMsYUFBNUUsQ0FBeEI7O0FBRUEsVUFBSUUsbUJBQW1CLEVBQXZCOztBQUVBRCx3QkFBa0I3cUIsT0FBbEIsQ0FBMEIsVUFBVStxQixPQUFWLEVBQW1CO0FBQzNDRCx5QkFBaUJDLE9BQWpCLElBQTRCLElBQTVCO0FBQ0QsT0FGRDs7QUFJQSxlQUFTQyxrQkFBVCxDQUE0QjlvQixLQUE1QixFQUFtQzJKLElBQW5DLEVBQXlDa2YsT0FBekMsRUFBa0Q7QUFDaEQsU0FBQ3puQixNQUFNMkYsT0FBTixDQUFjL0csS0FBZCxDQUFELEdBQXdCLGtCQUFrQixZQUFsQixHQUFpQ2pGLFVBQVUsS0FBVixFQUFpQix5REFBakIsRUFBNEU4dEIsT0FBNUUsRUFBcUY3b0IsS0FBckYsQ0FBakMsR0FBK0hsRixlQUFlLEdBQWYsRUFBb0IrdEIsT0FBcEIsRUFBNkI3b0IsS0FBN0IsQ0FBdkosR0FBNkwsS0FBSyxDQUFsTTtBQUNBLFlBQUkrb0IsWUFBWXBmLEtBQUtrZixPQUFMLENBQWhCO0FBQ0EsU0FBQ3puQixNQUFNMkYsT0FBTixDQUFjZ2lCLFNBQWQsQ0FBRCxHQUE0QixrQkFBa0IsWUFBbEIsR0FBaUNodUIsVUFBVSxLQUFWLEVBQWlCLDBHQUFqQixFQUE2SDh0QixPQUE3SCxFQUFzSUUsU0FBdEksQ0FBakMsR0FBb0xqdUIsZUFBZSxHQUFmLEVBQW9CK3RCLE9BQXBCLEVBQTZCRSxTQUE3QixDQUFoTixHQUEwUCxLQUFLLENBQS9QO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxlQUFTeEQsTUFBVCxDQUFnQnZsQixLQUFoQixFQUF1QjJKLElBQXZCLEVBQTZCO0FBQzNCLFVBQUUsUUFBT0EsSUFBUCx5Q0FBT0EsSUFBUCxPQUFnQixRQUFsQixJQUE4QixrQkFBa0IsWUFBbEIsR0FBaUM1TyxVQUFVLEtBQVYsRUFBaUIsb0hBQWpCLEVBQXVJNHRCLGtCQUFrQlIsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBdkksRUFBcUtLLFdBQXJLLENBQWpDLEdBQXFOMXRCLGVBQWUsR0FBZixFQUFvQjZ0QixrQkFBa0JSLElBQWxCLENBQXVCLElBQXZCLENBQXBCLEVBQWtESyxXQUFsRCxDQUFuUCxHQUFvVCxLQUFLLENBQXpUOztBQUVBLFlBQUk5dUIsZUFBZXZCLElBQWYsQ0FBb0J3UixJQUFwQixFQUEwQjZlLFdBQTFCLENBQUosRUFBNEM7QUFDMUMsWUFBRTNvQixPQUFPNE8sSUFBUCxDQUFZOUUsSUFBWixFQUFrQnZSLE1BQWxCLEtBQTZCLENBQS9CLElBQW9DLGtCQUFrQixZQUFsQixHQUFpQzJDLFVBQVUsS0FBVixFQUFpQixvREFBakIsRUFBdUV5dEIsV0FBdkUsQ0FBakMsR0FBdUgxdEIsZUFBZSxHQUFmLEVBQW9CMHRCLFdBQXBCLENBQTNKLEdBQThMLEtBQUssQ0FBbk07O0FBRUEsaUJBQU83ZSxLQUFLNmUsV0FBTCxDQUFQO0FBQ0Q7O0FBRUQsWUFBSVEsWUFBWVosWUFBWXBvQixLQUFaLENBQWhCOztBQUVBLFlBQUl0RyxlQUFldkIsSUFBZixDQUFvQndSLElBQXBCLEVBQTBCOGUsYUFBMUIsQ0FBSixFQUE4QztBQUM1QyxjQUFJUSxXQUFXdGYsS0FBSzhlLGFBQUwsQ0FBZjtBQUNBLFlBQUVRLFlBQVksUUFBT0EsUUFBUCx5Q0FBT0EsUUFBUCxPQUFvQixRQUFsQyxJQUE4QyxrQkFBa0IsWUFBbEIsR0FBaUNsdUIsVUFBVSxLQUFWLEVBQWlCLHdEQUFqQixFQUEyRTB0QixhQUEzRSxFQUEwRlEsUUFBMUYsQ0FBakMsR0FBdUludUIsZUFBZSxHQUFmLEVBQW9CMnRCLGFBQXBCLEVBQW1DUSxRQUFuQyxDQUFyTCxHQUFvTyxLQUFLLENBQXpPO0FBQ0EsWUFBRUQsYUFBYSxRQUFPQSxTQUFQLHlDQUFPQSxTQUFQLE9BQXFCLFFBQXBDLElBQWdELGtCQUFrQixZQUFsQixHQUFpQ2p1QixVQUFVLEtBQVYsRUFBaUIsMERBQWpCLEVBQTZFMHRCLGFBQTdFLEVBQTRGTyxTQUE1RixDQUFqQyxHQUEwSWx1QixlQUFlLEdBQWYsRUFBb0IydEIsYUFBcEIsRUFBbUNPLFNBQW5DLENBQTFMLEdBQTBPLEtBQUssQ0FBL087QUFDQXRzQixrQkFBUXNzQixTQUFSLEVBQW1CcmYsS0FBSzhlLGFBQUwsQ0FBbkI7QUFDRDs7QUFFRCxZQUFJL3VCLGVBQWV2QixJQUFmLENBQW9Cd1IsSUFBcEIsRUFBMEIwZSxZQUExQixDQUFKLEVBQTZDO0FBQzNDUyw2QkFBbUI5b0IsS0FBbkIsRUFBMEIySixJQUExQixFQUFnQzBlLFlBQWhDO0FBQ0ExZSxlQUFLMGUsWUFBTCxFQUFtQnZxQixPQUFuQixDQUEyQixVQUFVdVIsSUFBVixFQUFnQjtBQUN6QzJaLHNCQUFVaHRCLElBQVYsQ0FBZXFULElBQWY7QUFDRCxXQUZEO0FBR0Q7O0FBRUQsWUFBSTNWLGVBQWV2QixJQUFmLENBQW9Cd1IsSUFBcEIsRUFBMEIyZSxlQUExQixDQUFKLEVBQWdEO0FBQzlDUSw2QkFBbUI5b0IsS0FBbkIsRUFBMEIySixJQUExQixFQUFnQzJlLGVBQWhDO0FBQ0EzZSxlQUFLMmUsZUFBTCxFQUFzQnhxQixPQUF0QixDQUE4QixVQUFVdVIsSUFBVixFQUFnQjtBQUM1QzJaLHNCQUFVRSxPQUFWLENBQWtCN1osSUFBbEI7QUFDRCxXQUZEO0FBR0Q7O0FBRUQsWUFBSTNWLGVBQWV2QixJQUFmLENBQW9Cd1IsSUFBcEIsRUFBMEI0ZSxjQUExQixDQUFKLEVBQStDO0FBQzdDLFdBQUNubkIsTUFBTTJGLE9BQU4sQ0FBYy9HLEtBQWQsQ0FBRCxHQUF3QixrQkFBa0IsWUFBbEIsR0FBaUNqRixVQUFVLEtBQVYsRUFBaUIsMkNBQWpCLEVBQThEd3RCLGNBQTlELEVBQThFdm9CLEtBQTlFLENBQWpDLEdBQXdIbEYsZUFBZSxHQUFmLEVBQW9CeXRCLGNBQXBCLEVBQW9Ddm9CLEtBQXBDLENBQWhKLEdBQTZMLEtBQUssQ0FBbE07QUFDQSxXQUFDb0IsTUFBTTJGLE9BQU4sQ0FBYzRDLEtBQUs0ZSxjQUFMLENBQWQsQ0FBRCxHQUF1QyxrQkFBa0IsWUFBbEIsR0FBaUN4dEIsVUFBVSxLQUFWLEVBQWlCLHFIQUFqQixFQUF3SXd0QixjQUF4SSxFQUF3SjVlLEtBQUs0ZSxjQUFMLENBQXhKLENBQWpDLEdBQWlOenRCLGVBQWUsR0FBZixFQUFvQnl0QixjQUFwQixFQUFvQzVlLEtBQUs0ZSxjQUFMLENBQXBDLENBQXhQLEdBQW9ULEtBQUssQ0FBelQ7QUFDQTVlLGVBQUs0ZSxjQUFMLEVBQXFCenFCLE9BQXJCLENBQTZCLFVBQVVxRCxJQUFWLEVBQWdCO0FBQzNDLGFBQUNDLE1BQU0yRixPQUFOLENBQWM1RixJQUFkLENBQUQsR0FBdUIsa0JBQWtCLFlBQWxCLEdBQWlDcEcsVUFBVSxLQUFWLEVBQWlCLHFIQUFqQixFQUF3SXd0QixjQUF4SSxFQUF3SjVlLEtBQUs0ZSxjQUFMLENBQXhKLENBQWpDLEdBQWlOenRCLGVBQWUsR0FBZixFQUFvQnl0QixjQUFwQixFQUFvQzVlLEtBQUs0ZSxjQUFMLENBQXBDLENBQXhPLEdBQW9TLEtBQUssQ0FBelM7QUFDQVMsc0JBQVVHLE1BQVYsQ0FBaUJ6ckIsS0FBakIsQ0FBdUJzckIsU0FBdkIsRUFBa0M3bkIsSUFBbEM7QUFDRCxXQUhEO0FBSUQ7O0FBRUQsWUFBSXpILGVBQWV2QixJQUFmLENBQW9Cd1IsSUFBcEIsRUFBMEIrZSxhQUExQixDQUFKLEVBQThDO0FBQzVDLFlBQUUsT0FBTy9lLEtBQUsrZSxhQUFMLENBQVAsS0FBK0IsVUFBakMsSUFBK0Msa0JBQWtCLFlBQWxCLEdBQWlDM3RCLFVBQVUsS0FBVixFQUFpQix5REFBakIsRUFBNEUydEIsYUFBNUUsRUFBMkYvZSxLQUFLK2UsYUFBTCxDQUEzRixDQUFqQyxHQUFtSjV0QixlQUFlLEdBQWYsRUFBb0I0dEIsYUFBcEIsRUFBbUMvZSxLQUFLK2UsYUFBTCxDQUFuQyxDQUFsTSxHQUE0UCxLQUFLLENBQWpRO0FBQ0FNLHNCQUFZcmYsS0FBSytlLGFBQUwsRUFBb0JNLFNBQXBCLENBQVo7QUFDRDs7QUFFRCxhQUFLLElBQUlJLENBQVQsSUFBY3pmLElBQWQsRUFBb0I7QUFDbEIsY0FBSSxFQUFFaWYsaUJBQWlCbHZCLGNBQWpCLENBQWdDMHZCLENBQWhDLEtBQXNDUixpQkFBaUJRLENBQWpCLENBQXhDLENBQUosRUFBa0U7QUFDaEVKLHNCQUFVSSxDQUFWLElBQWU3RCxPQUFPdmxCLE1BQU1vcEIsQ0FBTixDQUFQLEVBQWlCemYsS0FBS3lmLENBQUwsQ0FBakIsQ0FBZjtBQUNEO0FBQ0Y7O0FBRUQsZUFBT0osU0FBUDtBQUNEOztBQUVEbHlCLGFBQU9ELE9BQVAsR0FBaUIwdUIsTUFBakI7QUFDQyxLQWhINkQsRUFnSDVELEVBQUMsTUFBSyxFQUFOLEVBQVMsTUFBSyxFQUFkLEVBQWlCLE1BQUssRUFBdEIsRUFoSDRELENBL3FKMHVCLEVBK3hKM3dCLElBQUcsQ0FBQyxVQUFTbHRCLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDakU7O0FBRUE7Ozs7Ozs7Ozs7O0FBV0EsVUFBSWtFLFlBQVkxQyxRQUFRLEVBQVIsQ0FBaEI7O0FBRUE7Ozs7Ozs7O0FBUUE7QUFDQSxlQUFTZ3hCLG9CQUFULENBQThCL1ksT0FBOUIsRUFBdUNnWixRQUF2QyxFQUFpRDtBQUMvQyxZQUFJQyxPQUFPalosT0FBWDtBQUNBLGVBQU9pWixLQUFLQyxVQUFaLEVBQXdCO0FBQ3RCRCxpQkFBT0EsS0FBS0MsVUFBWjtBQUNEOztBQUVELFlBQUlDLE1BQU1GLEtBQUtHLGdCQUFMLENBQXNCSixRQUF0QixDQUFWO0FBQ0EsZUFBT2xvQixNQUFNeEIsU0FBTixDQUFnQitwQixPQUFoQixDQUF3Qnh4QixJQUF4QixDQUE2QnN4QixHQUE3QixFQUFrQ25aLE9BQWxDLE1BQStDLENBQUMsQ0FBdkQ7QUFDRDs7QUFFRCxVQUFJeE4sVUFBVTs7QUFFWjs7Ozs7OztBQU9BeUIsa0JBQVUsU0FBU0EsUUFBVCxDQUFrQitMLE9BQWxCLEVBQTJCdk0sU0FBM0IsRUFBc0M7QUFDOUMsV0FBQyxDQUFDLEtBQUtxSyxJQUFMLENBQVVySyxTQUFWLENBQUYsR0FBeUIsa0JBQWtCLFlBQWxCLEdBQWlDaEosVUFBVSxLQUFWLEVBQWlCLG9FQUFvRSxtQkFBckYsRUFBMEdnSixTQUExRyxDQUFqQyxHQUF3SmhKLFVBQVUsS0FBVixDQUFqTCxHQUFvTSxLQUFLLENBQXpNOztBQUVBLGNBQUlnSixTQUFKLEVBQWU7QUFDYixnQkFBSXVNLFFBQVFzWixTQUFaLEVBQXVCO0FBQ3JCdFosc0JBQVFzWixTQUFSLENBQWtCcmEsR0FBbEIsQ0FBc0J4TCxTQUF0QjtBQUNELGFBRkQsTUFFTyxJQUFJLENBQUNqQixRQUFRK21CLFFBQVIsQ0FBaUJ2WixPQUFqQixFQUEwQnZNLFNBQTFCLENBQUwsRUFBMkM7QUFDaER1TSxzQkFBUXZNLFNBQVIsR0FBb0J1TSxRQUFRdk0sU0FBUixHQUFvQixHQUFwQixHQUEwQkEsU0FBOUM7QUFDRDtBQUNGO0FBQ0QsaUJBQU91TSxPQUFQO0FBQ0QsU0FwQlc7O0FBc0JaOzs7Ozs7O0FBT0FqTSxxQkFBYSxTQUFTQSxXQUFULENBQXFCaU0sT0FBckIsRUFBOEJ2TSxTQUE5QixFQUF5QztBQUNwRCxXQUFDLENBQUMsS0FBS3FLLElBQUwsQ0FBVXJLLFNBQVYsQ0FBRixHQUF5QixrQkFBa0IsWUFBbEIsR0FBaUNoSixVQUFVLEtBQVYsRUFBaUIsdUVBQXVFLG1CQUF4RixFQUE2R2dKLFNBQTdHLENBQWpDLEdBQTJKaEosVUFBVSxLQUFWLENBQXBMLEdBQXVNLEtBQUssQ0FBNU07O0FBRUEsY0FBSWdKLFNBQUosRUFBZTtBQUNiLGdCQUFJdU0sUUFBUXNaLFNBQVosRUFBdUI7QUFDckJ0WixzQkFBUXNaLFNBQVIsQ0FBa0JFLE1BQWxCLENBQXlCL2xCLFNBQXpCO0FBQ0QsYUFGRCxNQUVPLElBQUlqQixRQUFRK21CLFFBQVIsQ0FBaUJ2WixPQUFqQixFQUEwQnZNLFNBQTFCLENBQUosRUFBMEM7QUFDL0N1TSxzQkFBUXZNLFNBQVIsR0FBb0J1TSxRQUFRdk0sU0FBUixDQUFrQi9KLE9BQWxCLENBQTBCLElBQUlrVSxNQUFKLENBQVcsWUFBWW5LLFNBQVosR0FBd0IsV0FBbkMsRUFBZ0QsR0FBaEQsQ0FBMUIsRUFBZ0YsSUFBaEYsRUFBc0YvSixPQUF0RixDQUE4RixNQUE5RixFQUFzRyxHQUF0RyxFQUEyRztBQUEzRyxlQUNuQkEsT0FEbUIsQ0FDWCxZQURXLEVBQ0csRUFESCxDQUFwQixDQUQrQyxDQUVuQjtBQUM3QjtBQUNGO0FBQ0QsaUJBQU9zVyxPQUFQO0FBQ0QsU0F6Q1c7O0FBMkNaOzs7Ozs7OztBQVFBeVosd0JBQWdCLFNBQVNBLGNBQVQsQ0FBd0J6WixPQUF4QixFQUFpQ3ZNLFNBQWpDLEVBQTRDcEIsSUFBNUMsRUFBa0Q7QUFDaEUsaUJBQU8sQ0FBQ0EsT0FBT0csUUFBUXlCLFFBQWYsR0FBMEJ6QixRQUFRdUIsV0FBbkMsRUFBZ0RpTSxPQUFoRCxFQUF5RHZNLFNBQXpELENBQVA7QUFDRCxTQXJEVzs7QUF1RFo7Ozs7Ozs7QUFPQThsQixrQkFBVSxTQUFTQSxRQUFULENBQWtCdlosT0FBbEIsRUFBMkJ2TSxTQUEzQixFQUFzQztBQUM5QyxXQUFDLENBQUMsS0FBS3FLLElBQUwsQ0FBVXJLLFNBQVYsQ0FBRixHQUF5QixrQkFBa0IsWUFBbEIsR0FBaUNoSixVQUFVLEtBQVYsRUFBaUIsOENBQWpCLENBQWpDLEdBQW9HQSxVQUFVLEtBQVYsQ0FBN0gsR0FBZ0osS0FBSyxDQUFySjtBQUNBLGNBQUl1VixRQUFRc1osU0FBWixFQUF1QjtBQUNyQixtQkFBTyxDQUFDLENBQUM3bEIsU0FBRixJQUFldU0sUUFBUXNaLFNBQVIsQ0FBa0JJLFFBQWxCLENBQTJCam1CLFNBQTNCLENBQXRCO0FBQ0Q7QUFDRCxpQkFBTyxDQUFDLE1BQU11TSxRQUFRdk0sU0FBZCxHQUEwQixHQUEzQixFQUFnQzRsQixPQUFoQyxDQUF3QyxNQUFNNWxCLFNBQU4sR0FBa0IsR0FBMUQsSUFBaUUsQ0FBQyxDQUF6RTtBQUNELFNBcEVXOztBQXNFWjs7Ozs7OztBQU9Ba21CLHlCQUFpQixTQUFTQSxlQUFULENBQXlCM1osT0FBekIsRUFBa0NnWixRQUFsQyxFQUE0QztBQUMzRCxjQUFJWSxjQUFjNVosUUFBUTZaLE9BQVIsSUFBbUI3WixRQUFROFoscUJBQTNCLElBQW9EOVosUUFBUStaLGtCQUE1RCxJQUFrRi9aLFFBQVFnYSxpQkFBMUYsSUFBK0csVUFBVTV5QixDQUFWLEVBQWE7QUFDNUksbUJBQU8yeEIscUJBQXFCL1ksT0FBckIsRUFBOEI1WSxDQUE5QixDQUFQO0FBQ0QsV0FGRDtBQUdBLGlCQUFPd3lCLFlBQVkveEIsSUFBWixDQUFpQm1ZLE9BQWpCLEVBQTBCZ1osUUFBMUIsQ0FBUDtBQUNEOztBQWxGVyxPQUFkOztBQXNGQXh5QixhQUFPRCxPQUFQLEdBQWlCaU0sT0FBakI7QUFDQyxLQTFIK0IsRUEwSDlCLEVBQUMsTUFBSyxFQUFOLEVBMUg4QixDQS94Snd3QixFQXk1SjN4QixJQUFHLENBQUMsVUFBU3pLLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDakQ7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxVQUFJc0MsWUFBWSxDQUFDLEVBQUUsT0FBT2pDLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUNBLE9BQU9rQyxRQUF4QyxJQUFvRGxDLE9BQU9rQyxRQUFQLENBQWdCQyxhQUF0RSxDQUFqQjs7QUFFQTs7Ozs7O0FBTUEsVUFBSWYsdUJBQXVCOztBQUV6QmEsbUJBQVdBLFNBRmM7O0FBSXpCb3hCLHVCQUFlLE9BQU9DLE1BQVAsS0FBa0IsV0FKUjs7QUFNekJDLDhCQUFzQnR4QixhQUFhLENBQUMsRUFBRWpDLE9BQU82c0IsZ0JBQVAsSUFBMkI3c0IsT0FBT3d6QixXQUFwQyxDQU5YOztBQVF6QkMsd0JBQWdCeHhCLGFBQWEsQ0FBQyxDQUFDakMsT0FBTzB6QixNQVJiOztBQVV6QkMsb0JBQVksQ0FBQzF4QixTQVZZLENBVUY7O0FBVkUsT0FBM0I7O0FBY0FyQyxhQUFPRCxPQUFQLEdBQWlCeUIsb0JBQWpCO0FBQ0MsS0FwQ2UsRUFvQ2QsRUFwQ2MsQ0F6NUp3eEIsRUE2N0pseUIsSUFBRyxDQUFDLFVBQVNELE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDMUM7O0FBRUE7Ozs7Ozs7Ozs7O0FBV0EsZUFBU2kwQixpQkFBVCxDQUEyQkMsR0FBM0IsRUFBZ0M7QUFDOUIsZUFBTyxZQUFZO0FBQ2pCLGlCQUFPQSxHQUFQO0FBQ0QsU0FGRDtBQUdEOztBQUVEOzs7OztBQUtBLFVBQUl4bEIsZ0JBQWdCLFNBQVNBLGFBQVQsR0FBeUIsQ0FBRSxDQUEvQzs7QUFFQUEsb0JBQWMwYixXQUFkLEdBQTRCNkosaUJBQTVCO0FBQ0F2bEIsb0JBQWN5bEIsZ0JBQWQsR0FBaUNGLGtCQUFrQixLQUFsQixDQUFqQztBQUNBdmxCLG9CQUFjMGxCLGVBQWQsR0FBZ0NILGtCQUFrQixJQUFsQixDQUFoQztBQUNBdmxCLG9CQUFja2MsZUFBZCxHQUFnQ3FKLGtCQUFrQixJQUFsQixDQUFoQztBQUNBdmxCLG9CQUFjMmxCLGVBQWQsR0FBZ0MsWUFBWTtBQUMxQyxlQUFPLElBQVA7QUFDRCxPQUZEO0FBR0EzbEIsb0JBQWMwQixtQkFBZCxHQUFvQyxVQUFVOGpCLEdBQVYsRUFBZTtBQUNqRCxlQUFPQSxHQUFQO0FBQ0QsT0FGRDs7QUFJQWowQixhQUFPRCxPQUFQLEdBQWlCME8sYUFBakI7QUFDQyxLQXZDUSxFQXVDUCxFQXZDTyxDQTc3Sit4QixFQW8rSmx5QixJQUFHLENBQUMsVUFBU2xOLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDMUM7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxVQUFJOFEsY0FBYyxFQUFsQjs7QUFFQSxVQUFJLGtCQUFrQixZQUF0QixFQUFvQztBQUNsQzlILGVBQU9nYyxNQUFQLENBQWNsVSxXQUFkO0FBQ0Q7O0FBRUQ3USxhQUFPRCxPQUFQLEdBQWlCOFEsV0FBakI7QUFDQyxLQXBCUSxFQW9CUCxFQXBCTyxDQXArSit4QixFQXcvSmx5QixJQUFHLENBQUMsVUFBU3RQLE9BQVQsRUFBaUJ2QixNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDMUM7Ozs7Ozs7Ozs7QUFVQTs7QUFFQTs7Ozs7Ozs7Ozs7QUFXQSxVQUFJczBCLGlCQUFpQixTQUFTQSxjQUFULENBQXdCQyxNQUF4QixFQUFnQyxDQUFFLENBQXZEOztBQUVBLFVBQUksa0JBQWtCLFlBQXRCLEVBQW9DO0FBQ2xDRCx5QkFBaUIsU0FBU0EsY0FBVCxDQUF3QkMsTUFBeEIsRUFBZ0M7QUFDL0MsY0FBSUEsV0FBV3pnQixTQUFmLEVBQTBCO0FBQ3hCLGtCQUFNLElBQUkzUyxLQUFKLENBQVUsOENBQVYsQ0FBTjtBQUNEO0FBQ0YsU0FKRDtBQUtEOztBQUVELGVBQVMrQyxTQUFULENBQW1Cc3dCLFNBQW5CLEVBQThCRCxNQUE5QixFQUFzQ3Z6QixDQUF0QyxFQUF5Q2dULENBQXpDLEVBQTRDQyxDQUE1QyxFQUErQzJYLENBQS9DLEVBQWtEbnJCLENBQWxELEVBQXFEVixDQUFyRCxFQUF3RDtBQUN0RHUwQix1QkFBZUMsTUFBZjs7QUFFQSxZQUFJLENBQUNDLFNBQUwsRUFBZ0I7QUFDZCxjQUFJbEssS0FBSjtBQUNBLGNBQUlpSyxXQUFXemdCLFNBQWYsRUFBMEI7QUFDeEJ3VyxvQkFBUSxJQUFJbnBCLEtBQUosQ0FBVSx1RUFBdUUsNkRBQWpGLENBQVI7QUFDRCxXQUZELE1BRU87QUFDTCxnQkFBSW1KLE9BQU8sQ0FBQ3RKLENBQUQsRUFBSWdULENBQUosRUFBT0MsQ0FBUCxFQUFVMlgsQ0FBVixFQUFhbnJCLENBQWIsRUFBZ0JWLENBQWhCLENBQVg7QUFDQSxnQkFBSTAwQixXQUFXLENBQWY7QUFDQW5LLG9CQUFRLElBQUlucEIsS0FBSixDQUFVb3pCLE9BQU9weEIsT0FBUCxDQUFlLEtBQWYsRUFBc0IsWUFBWTtBQUNsRCxxQkFBT21ILEtBQUttcUIsVUFBTCxDQUFQO0FBQ0QsYUFGaUIsQ0FBVixDQUFSO0FBR0FuSyxrQkFBTTFmLElBQU4sR0FBYSxxQkFBYjtBQUNEOztBQUVEMGYsZ0JBQU02RixXQUFOLEdBQW9CLENBQXBCLENBYmMsQ0FhUztBQUN2QixnQkFBTTdGLEtBQU47QUFDRDtBQUNGOztBQUVEcnFCLGFBQU9ELE9BQVAsR0FBaUJrRSxTQUFqQjtBQUNDLEtBeERRLEVBd0RQLEVBeERPLENBeC9KK3hCLEVBZ2pLbHlCLElBQUcsQ0FBQyxVQUFTMUMsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUMxQzs7Ozs7Ozs7Ozs7O0FBWUE7O0FBRUE7O0FBRUEsVUFBSTZDLGlCQUFpQm1HLE9BQU9ELFNBQVAsQ0FBaUJsRyxjQUF0Qzs7QUFFQTs7OztBQUlBLGVBQVNpbUIsRUFBVCxDQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0I7QUFDaEI7QUFDQSxZQUFJRCxNQUFNQyxDQUFWLEVBQWE7QUFDWDtBQUNBO0FBQ0E7QUFDQSxpQkFBT0QsTUFBTSxDQUFOLElBQVdDLE1BQU0sQ0FBakIsSUFBc0IsSUFBSUQsQ0FBSixLQUFVLElBQUlDLENBQTNDO0FBQ0QsU0FMRCxNQUtPO0FBQ0w7QUFDQSxpQkFBT0QsTUFBTUEsQ0FBTixJQUFXQyxNQUFNQSxDQUF4QjtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7O0FBS0EsZUFBU29ILFlBQVQsQ0FBc0JzRSxJQUF0QixFQUE0QkMsSUFBNUIsRUFBa0M7QUFDaEMsWUFBSTdMLEdBQUc0TCxJQUFILEVBQVNDLElBQVQsQ0FBSixFQUFvQjtBQUNsQixpQkFBTyxJQUFQO0FBQ0Q7O0FBRUQsWUFBSSxRQUFPRCxJQUFQLHlDQUFPQSxJQUFQLE9BQWdCLFFBQWhCLElBQTRCQSxTQUFTLElBQXJDLElBQTZDLFFBQU9DLElBQVAseUNBQU9BLElBQVAsT0FBZ0IsUUFBN0QsSUFBeUVBLFNBQVMsSUFBdEYsRUFBNEY7QUFDMUYsaUJBQU8sS0FBUDtBQUNEOztBQUVELFlBQUlDLFFBQVE1ckIsT0FBTzRPLElBQVAsQ0FBWThjLElBQVosQ0FBWjtBQUNBLFlBQUlHLFFBQVE3ckIsT0FBTzRPLElBQVAsQ0FBWStjLElBQVosQ0FBWjs7QUFFQSxZQUFJQyxNQUFNcnpCLE1BQU4sS0FBaUJzekIsTUFBTXR6QixNQUEzQixFQUFtQztBQUNqQyxpQkFBTyxLQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxhQUFLLElBQUlMLElBQUksQ0FBYixFQUFnQkEsSUFBSTB6QixNQUFNcnpCLE1BQTFCLEVBQWtDTCxHQUFsQyxFQUF1QztBQUNyQyxjQUFJLENBQUMyQixlQUFldkIsSUFBZixDQUFvQnF6QixJQUFwQixFQUEwQkMsTUFBTTF6QixDQUFOLENBQTFCLENBQUQsSUFBd0MsQ0FBQzRuQixHQUFHNEwsS0FBS0UsTUFBTTF6QixDQUFOLENBQUwsQ0FBSCxFQUFtQnl6QixLQUFLQyxNQUFNMXpCLENBQU4sQ0FBTCxDQUFuQixDQUE3QyxFQUFpRjtBQUMvRSxtQkFBTyxLQUFQO0FBQ0Q7QUFDRjs7QUFFRCxlQUFPLElBQVA7QUFDRDs7QUFFRGpCLGFBQU9ELE9BQVAsR0FBaUJvd0IsWUFBakI7QUFDQyxLQXBFUSxFQW9FUCxFQXBFTyxDQWhqSyt4QixFQW9uS2x5QixJQUFHLENBQUMsVUFBUzV1QixPQUFULEVBQWlCdkIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQzFDOzs7Ozs7Ozs7O0FBVUE7O0FBRUEsVUFBSTBPLGdCQUFnQmxOLFFBQVEsRUFBUixDQUFwQjs7QUFFQTs7Ozs7OztBQU9BLFVBQUkrRSxVQUFVbUksYUFBZDs7QUFFQSxVQUFJLGtCQUFrQixZQUF0QixFQUFvQztBQUNsQyxTQUFDLFlBQVk7QUFDWCxjQUFJb21CLGVBQWUsU0FBU0EsWUFBVCxDQUFzQlAsTUFBdEIsRUFBOEI7QUFDL0MsaUJBQUssSUFBSWxxQixPQUFPdkQsVUFBVXZGLE1BQXJCLEVBQTZCK0ksT0FBT0MsTUFBTUYsT0FBTyxDQUFQLEdBQVdBLE9BQU8sQ0FBbEIsR0FBc0IsQ0FBNUIsQ0FBcEMsRUFBb0VHLE9BQU8sQ0FBaEYsRUFBbUZBLE9BQU9ILElBQTFGLEVBQWdHRyxNQUFoRyxFQUF3RztBQUN0R0YsbUJBQUtFLE9BQU8sQ0FBWixJQUFpQjFELFVBQVUwRCxJQUFWLENBQWpCO0FBQ0Q7O0FBRUQsZ0JBQUlpcUIsV0FBVyxDQUFmO0FBQ0EsZ0JBQUl2TCxVQUFVLGNBQWNxTCxPQUFPcHhCLE9BQVAsQ0FBZSxLQUFmLEVBQXNCLFlBQVk7QUFDNUQscUJBQU9tSCxLQUFLbXFCLFVBQUwsQ0FBUDtBQUNELGFBRjJCLENBQTVCO0FBR0EsZ0JBQUksT0FBTy9LLE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbENBLHNCQUFRWSxLQUFSLENBQWNwQixPQUFkO0FBQ0Q7QUFDRCxnQkFBSTtBQUNGO0FBQ0E7QUFDQTtBQUNBLG9CQUFNLElBQUkvbkIsS0FBSixDQUFVK25CLE9BQVYsQ0FBTjtBQUNELGFBTEQsQ0FLRSxPQUFPSCxDQUFQLEVBQVUsQ0FBRTtBQUNmLFdBbEJEOztBQW9CQXhpQixvQkFBVSxTQUFTQSxPQUFULENBQWlCaXVCLFNBQWpCLEVBQTRCRCxNQUE1QixFQUFvQztBQUM1QyxnQkFBSUEsV0FBV3pnQixTQUFmLEVBQTBCO0FBQ3hCLG9CQUFNLElBQUkzUyxLQUFKLENBQVUsOERBQThELGtCQUF4RSxDQUFOO0FBQ0Q7O0FBRUQsZ0JBQUlvekIsT0FBT3pCLE9BQVAsQ0FBZSw2QkFBZixNQUFrRCxDQUF0RCxFQUF5RDtBQUN2RCxxQkFEdUQsQ0FDL0M7QUFDVDs7QUFFRCxnQkFBSSxDQUFDMEIsU0FBTCxFQUFnQjtBQUNkLG1CQUFLLElBQUlPLFFBQVFqdUIsVUFBVXZGLE1BQXRCLEVBQThCK0ksT0FBT0MsTUFBTXdxQixRQUFRLENBQVIsR0FBWUEsUUFBUSxDQUFwQixHQUF3QixDQUE5QixDQUFyQyxFQUF1RUMsUUFBUSxDQUFwRixFQUF1RkEsUUFBUUQsS0FBL0YsRUFBc0dDLE9BQXRHLEVBQStHO0FBQzdHMXFCLHFCQUFLMHFCLFFBQVEsQ0FBYixJQUFrQmx1QixVQUFVa3VCLEtBQVYsQ0FBbEI7QUFDRDs7QUFFREYsMkJBQWFqdUIsS0FBYixDQUFtQmlOLFNBQW5CLEVBQThCLENBQUN5Z0IsTUFBRCxFQUFTOXBCLE1BQVQsQ0FBZ0JILElBQWhCLENBQTlCO0FBQ0Q7QUFDRixXQWhCRDtBQWlCRCxTQXRDRDtBQXVDRDs7QUFFRHJLLGFBQU9ELE9BQVAsR0FBaUJ1RyxPQUFqQjtBQUNDLEtBbkVRLEVBbUVQLEVBQUMsTUFBSyxFQUFOLEVBbkVPLENBcG5LK3hCLEVBdXJLM3hCLElBQUcsQ0FBQyxVQUFTL0UsT0FBVCxFQUFpQnZCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUNqRDtBQUNBOztBQUNBLFVBQUk2QyxpQkFBaUJtRyxPQUFPRCxTQUFQLENBQWlCbEcsY0FBdEM7QUFDQSxVQUFJb3lCLG1CQUFtQmpzQixPQUFPRCxTQUFQLENBQWlCbXNCLG9CQUF4Qzs7QUFFQSxlQUFTQyxRQUFULENBQWtCQyxHQUFsQixFQUF1QjtBQUN0QixZQUFJQSxRQUFRLElBQVIsSUFBZ0JBLFFBQVF0aEIsU0FBNUIsRUFBdUM7QUFDdEMsZ0JBQU0sSUFBSXJMLFNBQUosQ0FBYyx1REFBZCxDQUFOO0FBQ0E7O0FBRUQsZUFBT08sT0FBT29zQixHQUFQLENBQVA7QUFDQTs7QUFFRCxlQUFTQyxlQUFULEdBQTJCO0FBQzFCLFlBQUk7QUFDSCxjQUFJLENBQUNyc0IsT0FBT3NzQixNQUFaLEVBQW9CO0FBQ25CLG1CQUFPLEtBQVA7QUFDQTs7QUFFRDs7QUFFQTtBQUNBLGNBQUlDLFFBQVEsSUFBSWxFLE1BQUosQ0FBVyxLQUFYLENBQVosQ0FSRyxDQVE2QjtBQUNoQ2tFLGdCQUFNLENBQU4sSUFBVyxJQUFYO0FBQ0EsY0FBSXZzQixPQUFPd3NCLG1CQUFQLENBQTJCRCxLQUEzQixFQUFrQyxDQUFsQyxNQUF5QyxHQUE3QyxFQUFrRDtBQUNqRCxtQkFBTyxLQUFQO0FBQ0E7O0FBRUQ7QUFDQSxjQUFJRSxRQUFRLEVBQVo7QUFDQSxlQUFLLElBQUl2MEIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEVBQXBCLEVBQXdCQSxHQUF4QixFQUE2QjtBQUM1QnUwQixrQkFBTSxNQUFNcEUsT0FBT3FFLFlBQVAsQ0FBb0J4MEIsQ0FBcEIsQ0FBWixJQUFzQ0EsQ0FBdEM7QUFDQTtBQUNELGNBQUl5MEIsU0FBUzNzQixPQUFPd3NCLG1CQUFQLENBQTJCQyxLQUEzQixFQUFrQ3p1QixHQUFsQyxDQUFzQyxVQUFVckcsQ0FBVixFQUFhO0FBQy9ELG1CQUFPODBCLE1BQU05MEIsQ0FBTixDQUFQO0FBQ0EsV0FGWSxDQUFiO0FBR0EsY0FBSWcxQixPQUFPckUsSUFBUCxDQUFZLEVBQVosTUFBb0IsWUFBeEIsRUFBc0M7QUFDckMsbUJBQU8sS0FBUDtBQUNBOztBQUVEO0FBQ0EsY0FBSXNFLFFBQVEsRUFBWjtBQUNBLGlDQUF1QkMsS0FBdkIsQ0FBNkIsRUFBN0IsRUFBaUM1dUIsT0FBakMsQ0FBeUMsVUFBVTZ1QixNQUFWLEVBQWtCO0FBQzFERixrQkFBTUUsTUFBTixJQUFnQkEsTUFBaEI7QUFDQSxXQUZEO0FBR0EsY0FBSTlzQixPQUFPNE8sSUFBUCxDQUFZNU8sT0FBT3NzQixNQUFQLENBQWMsRUFBZCxFQUFrQk0sS0FBbEIsQ0FBWixFQUFzQ3RFLElBQXRDLENBQTJDLEVBQTNDLE1BQ0Ysc0JBREYsRUFDMEI7QUFDekIsbUJBQU8sS0FBUDtBQUNBOztBQUVELGlCQUFPLElBQVA7QUFDQSxTQXJDRCxDQXFDRSxPQUFPN3dCLENBQVAsRUFBVTtBQUNYO0FBQ0EsaUJBQU8sS0FBUDtBQUNBO0FBQ0Q7O0FBRURSLGFBQU9ELE9BQVAsR0FBaUJxMUIsb0JBQW9CcnNCLE9BQU9zc0IsTUFBM0IsR0FBb0MsVUFBVWhvQixNQUFWLEVBQWtCZ0ssTUFBbEIsRUFBMEI7QUFDOUUsWUFBSUksSUFBSjtBQUNBLFlBQUlxZSxLQUFLWixTQUFTN25CLE1BQVQsQ0FBVDtBQUNBLFlBQUkwb0IsT0FBSjs7QUFFQSxhQUFLLElBQUluMUIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJaUcsVUFBVXZGLE1BQTlCLEVBQXNDVixHQUF0QyxFQUEyQztBQUMxQzZXLGlCQUFPMU8sT0FBT2xDLFVBQVVqRyxDQUFWLENBQVAsQ0FBUDs7QUFFQSxlQUFLLElBQUlrQyxHQUFULElBQWdCMlUsSUFBaEIsRUFBc0I7QUFDckIsZ0JBQUk3VSxlQUFldkIsSUFBZixDQUFvQm9XLElBQXBCLEVBQTBCM1UsR0FBMUIsQ0FBSixFQUFvQztBQUNuQ2d6QixpQkFBR2h6QixHQUFILElBQVUyVSxLQUFLM1UsR0FBTCxDQUFWO0FBQ0E7QUFDRDs7QUFFRCxjQUFJaUcsT0FBT2l0QixxQkFBWCxFQUFrQztBQUNqQ0Qsc0JBQVVodEIsT0FBT2l0QixxQkFBUCxDQUE2QnZlLElBQTdCLENBQVY7QUFDQSxpQkFBSyxJQUFJeFcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJODBCLFFBQVF6MEIsTUFBNUIsRUFBb0NMLEdBQXBDLEVBQXlDO0FBQ3hDLGtCQUFJK3pCLGlCQUFpQjN6QixJQUFqQixDQUFzQm9XLElBQXRCLEVBQTRCc2UsUUFBUTkwQixDQUFSLENBQTVCLENBQUosRUFBNkM7QUFDNUM2MEIsbUJBQUdDLFFBQVE5MEIsQ0FBUixDQUFILElBQWlCd1csS0FBS3NlLFFBQVE5MEIsQ0FBUixDQUFMLENBQWpCO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7O0FBRUQsZUFBTzYwQixFQUFQO0FBQ0EsT0F6QkQ7QUEyQkMsS0FyRmUsRUFxRmQsRUFyRmMsQ0F2ckt3eEIsRUFBM2IsRUE0d0t0VyxFQTV3S3NXLEVBNHdLblcsQ0FBQyxFQUFELENBNXdLbVcsRUE0d0s3VixFQTV3SzZWLENBQVA7QUE2d0tyVyxDQTd3S0QiLCJmaWxlIjoicmVhY3Qtd2l0aC1hZGRvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgLyoqXG4gICogUmVhY3QgKHdpdGggYWRkb25zKSB2MTUuNC4yXG4gICovXG4oZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5SZWFjdCA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IF9kZXJlcV8oNDMpO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgbWFwcGluZyBvZiBzdGFuZGFyZCB2ZW5kb3IgcHJlZml4ZXMgdXNpbmcgdGhlIGRlZmluZWQgc3R5bGUgcHJvcGVydHkgYW5kIGV2ZW50IG5hbWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0eWxlUHJvcFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuZnVuY3Rpb24gbWFrZVByZWZpeE1hcChzdHlsZVByb3AsIGV2ZW50TmFtZSkge1xuICB2YXIgcHJlZml4ZXMgPSB7fTtcblxuICBwcmVmaXhlc1tzdHlsZVByb3AudG9Mb3dlckNhc2UoKV0gPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgcHJlZml4ZXNbJ1dlYmtpdCcgKyBzdHlsZVByb3BdID0gJ3dlYmtpdCcgKyBldmVudE5hbWU7XG4gIHByZWZpeGVzWydNb3onICsgc3R5bGVQcm9wXSA9ICdtb3onICsgZXZlbnROYW1lO1xuICBwcmVmaXhlc1snbXMnICsgc3R5bGVQcm9wXSA9ICdNUycgKyBldmVudE5hbWU7XG4gIHByZWZpeGVzWydPJyArIHN0eWxlUHJvcF0gPSAnbycgKyBldmVudE5hbWUudG9Mb3dlckNhc2UoKTtcblxuICByZXR1cm4gcHJlZml4ZXM7XG59XG5cbi8qKlxuICogQSBsaXN0IG9mIGV2ZW50IG5hbWVzIHRvIGEgY29uZmlndXJhYmxlIGxpc3Qgb2YgdmVuZG9yIHByZWZpeGVzLlxuICovXG52YXIgdmVuZG9yUHJlZml4ZXMgPSB7XG4gIGFuaW1hdGlvbmVuZDogbWFrZVByZWZpeE1hcCgnQW5pbWF0aW9uJywgJ0FuaW1hdGlvbkVuZCcpLFxuICBhbmltYXRpb25pdGVyYXRpb246IG1ha2VQcmVmaXhNYXAoJ0FuaW1hdGlvbicsICdBbmltYXRpb25JdGVyYXRpb24nKSxcbiAgYW5pbWF0aW9uc3RhcnQ6IG1ha2VQcmVmaXhNYXAoJ0FuaW1hdGlvbicsICdBbmltYXRpb25TdGFydCcpLFxuICB0cmFuc2l0aW9uZW5kOiBtYWtlUHJlZml4TWFwKCdUcmFuc2l0aW9uJywgJ1RyYW5zaXRpb25FbmQnKVxufTtcblxuLyoqXG4gKiBFdmVudCBuYW1lcyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIGRldGVjdGVkIGFuZCBwcmVmaXhlZCAoaWYgYXBwbGljYWJsZSkuXG4gKi9cbnZhciBwcmVmaXhlZEV2ZW50TmFtZXMgPSB7fTtcblxuLyoqXG4gKiBFbGVtZW50IHRvIGNoZWNrIGZvciBwcmVmaXhlcyBvbi5cbiAqL1xudmFyIHN0eWxlID0ge307XG5cbi8qKlxuICogQm9vdHN0cmFwIGlmIGEgRE9NIGV4aXN0cy5cbiAqL1xuaWYgKEV4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSkge1xuICBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlO1xuXG4gIC8vIE9uIHNvbWUgcGxhdGZvcm1zLCBpbiBwYXJ0aWN1bGFyIHNvbWUgcmVsZWFzZXMgb2YgQW5kcm9pZCA0LngsXG4gIC8vIHRoZSB1bi1wcmVmaXhlZCBcImFuaW1hdGlvblwiIGFuZCBcInRyYW5zaXRpb25cIiBwcm9wZXJ0aWVzIGFyZSBkZWZpbmVkIG9uIHRoZVxuICAvLyBzdHlsZSBvYmplY3QgYnV0IHRoZSBldmVudHMgdGhhdCBmaXJlIHdpbGwgc3RpbGwgYmUgcHJlZml4ZWQsIHNvIHdlIG5lZWRcbiAgLy8gdG8gY2hlY2sgaWYgdGhlIHVuLXByZWZpeGVkIGV2ZW50cyBhcmUgdXNhYmxlLCBhbmQgaWYgbm90IHJlbW92ZSB0aGVtIGZyb20gdGhlIG1hcC5cbiAgaWYgKCEoJ0FuaW1hdGlvbkV2ZW50JyBpbiB3aW5kb3cpKSB7XG4gICAgZGVsZXRlIHZlbmRvclByZWZpeGVzLmFuaW1hdGlvbmVuZC5hbmltYXRpb247XG4gICAgZGVsZXRlIHZlbmRvclByZWZpeGVzLmFuaW1hdGlvbml0ZXJhdGlvbi5hbmltYXRpb247XG4gICAgZGVsZXRlIHZlbmRvclByZWZpeGVzLmFuaW1hdGlvbnN0YXJ0LmFuaW1hdGlvbjtcbiAgfVxuXG4gIC8vIFNhbWUgYXMgYWJvdmVcbiAgaWYgKCEoJ1RyYW5zaXRpb25FdmVudCcgaW4gd2luZG93KSkge1xuICAgIGRlbGV0ZSB2ZW5kb3JQcmVmaXhlcy50cmFuc2l0aW9uZW5kLnRyYW5zaXRpb247XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byBkZXRlcm1pbmUgdGhlIGNvcnJlY3QgdmVuZG9yIHByZWZpeGVkIGV2ZW50IG5hbWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0VmVuZG9yUHJlZml4ZWRFdmVudE5hbWUoZXZlbnROYW1lKSB7XG4gIGlmIChwcmVmaXhlZEV2ZW50TmFtZXNbZXZlbnROYW1lXSkge1xuICAgIHJldHVybiBwcmVmaXhlZEV2ZW50TmFtZXNbZXZlbnROYW1lXTtcbiAgfSBlbHNlIGlmICghdmVuZG9yUHJlZml4ZXNbZXZlbnROYW1lXSkge1xuICAgIHJldHVybiBldmVudE5hbWU7XG4gIH1cblxuICB2YXIgcHJlZml4TWFwID0gdmVuZG9yUHJlZml4ZXNbZXZlbnROYW1lXTtcblxuICBmb3IgKHZhciBzdHlsZVByb3AgaW4gcHJlZml4TWFwKSB7XG4gICAgaWYgKHByZWZpeE1hcC5oYXNPd25Qcm9wZXJ0eShzdHlsZVByb3ApICYmIHN0eWxlUHJvcCBpbiBzdHlsZSkge1xuICAgICAgcmV0dXJuIHByZWZpeGVkRXZlbnROYW1lc1tldmVudE5hbWVdID0gcHJlZml4TWFwW3N0eWxlUHJvcF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFZlbmRvclByZWZpeGVkRXZlbnROYW1lO1xufSx7XCI0M1wiOjQzfV0sMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRXNjYXBlIGFuZCB3cmFwIGtleSBzbyBpdCBpcyBzYWZlIHRvIHVzZSBhcyBhIHJlYWN0aWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGJlIGVzY2FwZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBlc2NhcGVkIGtleS5cbiAqL1xuXG5mdW5jdGlvbiBlc2NhcGUoa2V5KSB7XG4gIHZhciBlc2NhcGVSZWdleCA9IC9bPTpdL2c7XG4gIHZhciBlc2NhcGVyTG9va3VwID0ge1xuICAgICc9JzogJz0wJyxcbiAgICAnOic6ICc9MidcbiAgfTtcbiAgdmFyIGVzY2FwZWRTdHJpbmcgPSAoJycgKyBrZXkpLnJlcGxhY2UoZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG5cbiAgcmV0dXJuICckJyArIGVzY2FwZWRTdHJpbmc7XG59XG5cbi8qKlxuICogVW5lc2NhcGUgYW5kIHVud3JhcCBrZXkgZm9yIGh1bWFuLXJlYWRhYmxlIGRpc3BsYXlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIHVuZXNjYXBlLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgdW5lc2NhcGVkIGtleS5cbiAqL1xuZnVuY3Rpb24gdW5lc2NhcGUoa2V5KSB7XG4gIHZhciB1bmVzY2FwZVJlZ2V4ID0gLyg9MHw9MikvZztcbiAgdmFyIHVuZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPTAnOiAnPScsXG4gICAgJz0yJzogJzonXG4gIH07XG4gIHZhciBrZXlTdWJzdHJpbmcgPSBrZXlbMF0gPT09ICcuJyAmJiBrZXlbMV0gPT09ICckJyA/IGtleS5zdWJzdHJpbmcoMikgOiBrZXkuc3Vic3RyaW5nKDEpO1xuXG4gIHJldHVybiAoJycgKyBrZXlTdWJzdHJpbmcpLnJlcGxhY2UodW5lc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIHVuZXNjYXBlckxvb2t1cFttYXRjaF07XG4gIH0pO1xufVxuXG52YXIgS2V5RXNjYXBlVXRpbHMgPSB7XG4gIGVzY2FwZTogZXNjYXBlLFxuICB1bmVzY2FwZTogdW5lc2NhcGVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5RXNjYXBlVXRpbHM7XG59LHt9XSwzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdExpbmsgPSBfZGVyZXFfKDIwKTtcbnZhciBSZWFjdFN0YXRlU2V0dGVycyA9IF9kZXJlcV8oMjYpO1xuXG4vKipcbiAqIEEgc2ltcGxlIG1peGluIGFyb3VuZCBSZWFjdExpbmsuZm9yU3RhdGUoKS5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3R3by13YXktYmluZGluZy1oZWxwZXJzLmh0bWxcbiAqL1xudmFyIExpbmtlZFN0YXRlTWl4aW4gPSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBSZWFjdExpbmsgdGhhdCdzIGxpbmtlZCB0byBwYXJ0IG9mIHRoaXMgY29tcG9uZW50J3Mgc3RhdGUuIFRoZVxuICAgKiBSZWFjdExpbmsgd2lsbCBoYXZlIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoaXMuc3RhdGVba2V5XSBhbmQgd2lsbCBjYWxsXG4gICAqIHNldFN0YXRlKCkgd2hlbiBhIGNoYW5nZSBpcyByZXF1ZXN0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgc3RhdGUga2V5IHRvIHVwZGF0ZS5cbiAgICogQHJldHVybiB7UmVhY3RMaW5rfSBSZWFjdExpbmsgaW5zdGFuY2UgbGlua2luZyB0byB0aGUgc3RhdGUuXG4gICAqL1xuICBsaW5rU3RhdGU6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gbmV3IFJlYWN0TGluayh0aGlzLnN0YXRlW2tleV0sIFJlYWN0U3RhdGVTZXR0ZXJzLmNyZWF0ZVN0YXRlS2V5U2V0dGVyKHRoaXMsIGtleSkpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpbmtlZFN0YXRlTWl4aW47XG59LHtcIjIwXCI6MjAsXCIyNlwiOjI2fV0sNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IF9kZXJlcV8oMzgpO1xuXG52YXIgaW52YXJpYW50ID0gX2RlcmVxXyg0Nik7XG5cbi8qKlxuICogU3RhdGljIHBvb2xlcnMuIFNldmVyYWwgY3VzdG9tIHZlcnNpb25zIGZvciBlYWNoIHBvdGVudGlhbCBudW1iZXIgb2ZcbiAqIGFyZ3VtZW50cy4gQSBjb21wbGV0ZWx5IGdlbmVyaWMgcG9vbGVyIGlzIGVhc3kgdG8gaW1wbGVtZW50LCBidXQgd291bGRcbiAqIHJlcXVpcmUgYWNjZXNzaW5nIHRoZSBgYXJndW1lbnRzYCBvYmplY3QuIEluIGVhY2ggb2YgdGhlc2UsIGB0aGlzYCByZWZlcnMgdG9cbiAqIHRoZSBDbGFzcyBpdHNlbGYsIG5vdCBhbiBpbnN0YW5jZS4gSWYgYW55IG90aGVycyBhcmUgbmVlZGVkLCBzaW1wbHkgYWRkIHRoZW1cbiAqIGhlcmUsIG9yIGluIHRoZWlyIG93biBmaWxlcy5cbiAqL1xudmFyIG9uZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGNvcHlGaWVsZHNGcm9tKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGNvcHlGaWVsZHNGcm9tKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhjb3B5RmllbGRzRnJvbSk7XG4gIH1cbn07XG5cbnZhciB0d29Bcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIpO1xuICB9XG59O1xuXG52YXIgdGhyZWVBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIsIGEzKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMpO1xuICB9XG59O1xuXG52YXIgZm91ckFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMsIGE0KSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMsIGE0KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzLCBhNCk7XG4gIH1cbn07XG5cbnZhciBzdGFuZGFyZFJlbGVhc2VyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gICEoaW5zdGFuY2UgaW5zdGFuY2VvZiBLbGFzcykgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1RyeWluZyB0byByZWxlYXNlIGFuIGluc3RhbmNlIGludG8gYSBwb29sIG9mIGEgZGlmZmVyZW50IHR5cGUuJykgOiBfcHJvZEludmFyaWFudCgnMjUnKSA6IHZvaWQgMDtcbiAgaW5zdGFuY2UuZGVzdHJ1Y3RvcigpO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCA8IEtsYXNzLnBvb2xTaXplKSB7XG4gICAgS2xhc3MuaW5zdGFuY2VQb29sLnB1c2goaW5zdGFuY2UpO1xuICB9XG59O1xuXG52YXIgREVGQVVMVF9QT09MX1NJWkUgPSAxMDtcbnZhciBERUZBVUxUX1BPT0xFUiA9IG9uZUFyZ3VtZW50UG9vbGVyO1xuXG4vKipcbiAqIEF1Z21lbnRzIGBDb3B5Q29uc3RydWN0b3JgIHRvIGJlIGEgcG9vbGFibGUgY2xhc3MsIGF1Z21lbnRpbmcgb25seSB0aGUgY2xhc3NcbiAqIGl0c2VsZiAoc3RhdGljYWxseSkgbm90IGFkZGluZyBhbnkgcHJvdG90eXBpY2FsIGZpZWxkcy4gQW55IENvcHlDb25zdHJ1Y3RvclxuICogeW91IGdpdmUgdGhpcyBtYXkgaGF2ZSBhIGBwb29sU2l6ZWAgcHJvcGVydHksIGFuZCB3aWxsIGxvb2sgZm9yIGFcbiAqIHByb3RvdHlwaWNhbCBgZGVzdHJ1Y3RvcmAgb24gaW5zdGFuY2VzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IENvcHlDb25zdHJ1Y3RvciBDb25zdHJ1Y3RvciB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlc2V0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcG9vbGVyIEN1c3RvbWl6YWJsZSBwb29sZXIuXG4gKi9cbnZhciBhZGRQb29saW5nVG8gPSBmdW5jdGlvbiAoQ29weUNvbnN0cnVjdG9yLCBwb29sZXIpIHtcbiAgLy8gQ2FzdGluZyBhcyBhbnkgc28gdGhhdCBmbG93IGlnbm9yZXMgdGhlIGFjdHVhbCBpbXBsZW1lbnRhdGlvbiBhbmQgdHJ1c3RzXG4gIC8vIGl0IHRvIG1hdGNoIHRoZSB0eXBlIHdlIGRlY2xhcmVkXG4gIHZhciBOZXdLbGFzcyA9IENvcHlDb25zdHJ1Y3RvcjtcbiAgTmV3S2xhc3MuaW5zdGFuY2VQb29sID0gW107XG4gIE5ld0tsYXNzLmdldFBvb2xlZCA9IHBvb2xlciB8fCBERUZBVUxUX1BPT0xFUjtcbiAgaWYgKCFOZXdLbGFzcy5wb29sU2l6ZSkge1xuICAgIE5ld0tsYXNzLnBvb2xTaXplID0gREVGQVVMVF9QT09MX1NJWkU7XG4gIH1cbiAgTmV3S2xhc3MucmVsZWFzZSA9IHN0YW5kYXJkUmVsZWFzZXI7XG4gIHJldHVybiBOZXdLbGFzcztcbn07XG5cbnZhciBQb29sZWRDbGFzcyA9IHtcbiAgYWRkUG9vbGluZ1RvOiBhZGRQb29saW5nVG8sXG4gIG9uZUFyZ3VtZW50UG9vbGVyOiBvbmVBcmd1bWVudFBvb2xlcixcbiAgdHdvQXJndW1lbnRQb29sZXI6IHR3b0FyZ3VtZW50UG9vbGVyLFxuICB0aHJlZUFyZ3VtZW50UG9vbGVyOiB0aHJlZUFyZ3VtZW50UG9vbGVyLFxuICBmb3VyQXJndW1lbnRQb29sZXI6IGZvdXJBcmd1bWVudFBvb2xlclxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb29sZWRDbGFzcztcbn0se1wiMzhcIjozOCxcIjQ2XCI6NDZ9XSw1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gX2RlcmVxXyg0OSk7XG5cbnZhciBSZWFjdENoaWxkcmVuID0gX2RlcmVxXyg5KTtcbnZhciBSZWFjdENvbXBvbmVudCA9IF9kZXJlcV8oMTEpO1xudmFyIFJlYWN0UHVyZUNvbXBvbmVudCA9IF9kZXJlcV8oMjUpO1xudmFyIFJlYWN0Q2xhc3MgPSBfZGVyZXFfKDEwKTtcbnZhciBSZWFjdERPTUZhY3RvcmllcyA9IF9kZXJlcV8oMTUpO1xudmFyIFJlYWN0RWxlbWVudCA9IF9kZXJlcV8oMTYpO1xudmFyIFJlYWN0UHJvcFR5cGVzID0gX2RlcmVxXygyMyk7XG52YXIgUmVhY3RWZXJzaW9uID0gX2RlcmVxXygzMCk7XG5cbnZhciBvbmx5Q2hpbGQgPSBfZGVyZXFfKDM3KTtcbnZhciB3YXJuaW5nID0gX2RlcmVxXyg0OCk7XG5cbnZhciBjcmVhdGVFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQ7XG52YXIgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5O1xudmFyIGNsb25lRWxlbWVudCA9IFJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQ7XG5cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0gX2RlcmVxXygxOCk7XG4gIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRWxlbWVudDtcbiAgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVGYWN0b3J5O1xuICBjbG9uZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY2xvbmVFbGVtZW50O1xufVxuXG52YXIgX19zcHJlYWQgPSBfYXNzaWduO1xuXG5pZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBfX3NwcmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcod2FybmVkLCAnUmVhY3QuX19zcHJlYWQgaXMgZGVwcmVjYXRlZCBhbmQgc2hvdWxkIG5vdCBiZSB1c2VkLiBVc2UgJyArICdPYmplY3QuYXNzaWduIGRpcmVjdGx5IG9yIGFub3RoZXIgaGVscGVyIGZ1bmN0aW9uIHdpdGggc2ltaWxhciAnICsgJ3NlbWFudGljcy4gWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byB5b3VyIGNvbXBpbGVyLiAnICsgJ1NlZSBodHRwczovL2ZiLm1lL3JlYWN0LXNwcmVhZC1kZXByZWNhdGlvbiBmb3IgbW9yZSBkZXRhaWxzLicpIDogdm9pZCAwO1xuICAgIHdhcm5lZCA9IHRydWU7XG4gICAgcmV0dXJuIF9hc3NpZ24uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxudmFyIFJlYWN0ID0ge1xuXG4gIC8vIE1vZGVyblxuXG4gIENoaWxkcmVuOiB7XG4gICAgbWFwOiBSZWFjdENoaWxkcmVuLm1hcCxcbiAgICBmb3JFYWNoOiBSZWFjdENoaWxkcmVuLmZvckVhY2gsXG4gICAgY291bnQ6IFJlYWN0Q2hpbGRyZW4uY291bnQsXG4gICAgdG9BcnJheTogUmVhY3RDaGlsZHJlbi50b0FycmF5LFxuICAgIG9ubHk6IG9ubHlDaGlsZFxuICB9LFxuXG4gIENvbXBvbmVudDogUmVhY3RDb21wb25lbnQsXG4gIFB1cmVDb21wb25lbnQ6IFJlYWN0UHVyZUNvbXBvbmVudCxcblxuICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuICBjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudCxcbiAgaXNWYWxpZEVsZW1lbnQ6IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudCxcblxuICAvLyBDbGFzc2ljXG5cbiAgUHJvcFR5cGVzOiBSZWFjdFByb3BUeXBlcyxcbiAgY3JlYXRlQ2xhc3M6IFJlYWN0Q2xhc3MuY3JlYXRlQ2xhc3MsXG4gIGNyZWF0ZUZhY3Rvcnk6IGNyZWF0ZUZhY3RvcnksXG4gIGNyZWF0ZU1peGluOiBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAvLyBDdXJyZW50bHkgYSBub29wLiBXaWxsIGJlIHVzZWQgdG8gdmFsaWRhdGUgYW5kIHRyYWNlIG1peGlucy5cbiAgICByZXR1cm4gbWl4aW47XG4gIH0sXG5cbiAgLy8gVGhpcyBsb29rcyBET00gc3BlY2lmaWMgYnV0IHRoZXNlIGFyZSBhY3R1YWxseSBpc29tb3JwaGljIGhlbHBlcnNcbiAgLy8gc2luY2UgdGhleSBhcmUganVzdCBnZW5lcmF0aW5nIERPTSBzdHJpbmdzLlxuICBET006IFJlYWN0RE9NRmFjdG9yaWVzLFxuXG4gIHZlcnNpb246IFJlYWN0VmVyc2lvbixcblxuICAvLyBEZXByZWNhdGVkIGhvb2sgZm9yIEpTWCBzcHJlYWQsIGRvbid0IHVzZSB0aGlzIGZvciBhbnl0aGluZy5cbiAgX19zcHJlYWQ6IF9fc3ByZWFkXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xufSx7XCIxMFwiOjEwLFwiMTFcIjoxMSxcIjE1XCI6MTUsXCIxNlwiOjE2LFwiMThcIjoxOCxcIjIzXCI6MjMsXCIyNVwiOjI1LFwiMzBcIjozMCxcIjM3XCI6MzcsXCI0OFwiOjQ4LFwiNDlcIjo0OSxcIjlcIjo5fV0sNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RET007XG5cbmZ1bmN0aW9uIGdldFJlYWN0RE9NKCkge1xuICBpZiAoIVJlYWN0RE9NKSB7XG4gICAgLy8gVGhpcyBpcyBzYWZlIHRvIHVzZSBiZWNhdXNlIGN1cnJlbnQgbW9kdWxlIG9ubHkgZXhpc3RzIGluIHRoZSBhZGRvbnMgYnVpbGQ6XG4gICAgdmFyIFJlYWN0V2l0aEFkZG9uc1VNREVudHJ5ID0gX2RlcmVxXygzMik7XG4gICAgLy8gVGhpcyBpcyBpbmplY3RlZCBieSB0aGUgUmVhY3RET00gVU1EIGJ1aWxkOlxuICAgIFJlYWN0RE9NID0gUmVhY3RXaXRoQWRkb25zVU1ERW50cnkuX19TRUNSRVRfSU5KRUNURURfUkVBQ1RfRE9NX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ7XG4gIH1cbiAgcmV0dXJuIFJlYWN0RE9NO1xufVxuXG5leHBvcnRzLmdldFJlYWN0RE9NID0gZ2V0UmVhY3RET007XG5cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICBleHBvcnRzLmdldFJlYWN0UGVyZiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2V0UmVhY3RET00oKS5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRC5SZWFjdFBlcmY7XG4gIH07XG5cbiAgZXhwb3J0cy5nZXRSZWFjdFRlc3RVdGlscyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2V0UmVhY3RET00oKS5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRC5SZWFjdFRlc3RVdGlscztcbiAgfTtcbn1cbn0se1wiMzJcIjozMn1dLDc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSBfZGVyZXFfKDQ5KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgUmVhY3QgPSBfZGVyZXFfKDUpO1xuXG52YXIgUmVhY3RUcmFuc2l0aW9uR3JvdXAgPSBfZGVyZXFfKDI5KTtcbnZhciBSZWFjdENTU1RyYW5zaXRpb25Hcm91cENoaWxkID0gX2RlcmVxXyg4KTtcblxuZnVuY3Rpb24gY3JlYXRlVHJhbnNpdGlvblRpbWVvdXRQcm9wVmFsaWRhdG9yKHRyYW5zaXRpb25UeXBlKSB7XG4gIHZhciB0aW1lb3V0UHJvcE5hbWUgPSAndHJhbnNpdGlvbicgKyB0cmFuc2l0aW9uVHlwZSArICdUaW1lb3V0JztcbiAgdmFyIGVuYWJsZWRQcm9wTmFtZSA9ICd0cmFuc2l0aW9uJyArIHRyYW5zaXRpb25UeXBlO1xuXG4gIHJldHVybiBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAvLyBJZiB0aGUgdHJhbnNpdGlvbiBpcyBlbmFibGVkXG4gICAgaWYgKHByb3BzW2VuYWJsZWRQcm9wTmFtZV0pIHtcbiAgICAgIC8vIElmIG5vIHRpbWVvdXQgZHVyYXRpb24gaXMgcHJvdmlkZWRcbiAgICAgIGlmIChwcm9wc1t0aW1lb3V0UHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcih0aW1lb3V0UHJvcE5hbWUgKyAnIHdhc25cXCd0IHN1cHBsaWVkIHRvIFJlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwOiAnICsgJ3RoaXMgY2FuIGNhdXNlIHVucmVsaWFibGUgYW5pbWF0aW9ucyBhbmQgd29uXFwndCBiZSBzdXBwb3J0ZWQgaW4gJyArICdhIGZ1dHVyZSB2ZXJzaW9uIG9mIFJlYWN0LiBTZWUgJyArICdodHRwczovL2ZiLm1lL3JlYWN0LWFuaW1hdGlvbi10cmFuc2l0aW9uLWdyb3VwLXRpbWVvdXQgZm9yIG1vcmUgJyArICdpbmZvcm1hdGlvbi4nKTtcblxuICAgICAgICAvLyBJZiB0aGUgZHVyYXRpb24gaXNuJ3QgYSBudW1iZXJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHByb3BzW3RpbWVvdXRQcm9wTmFtZV0gIT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IodGltZW91dFByb3BOYW1lICsgJyBtdXN0IGJlIGEgbnVtYmVyIChpbiBtaWxsaXNlY29uZHMpJyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEFuIGVhc3kgd2F5IHRvIHBlcmZvcm0gQ1NTIHRyYW5zaXRpb25zIGFuZCBhbmltYXRpb25zIHdoZW4gYSBSZWFjdCBjb21wb25lbnRcbiAqIGVudGVycyBvciBsZWF2ZXMgdGhlIERPTS5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2FuaW1hdGlvbi5odG1sI2hpZ2gtbGV2ZWwtYXBpLXJlYWN0Y3NzdHJhbnNpdGlvbmdyb3VwXG4gKi9cblxudmFyIFJlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFJlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBSZWFjdENTU1RyYW5zaXRpb25Hcm91cCgpIHtcbiAgICB2YXIgX3RlbXAsIF90aGlzLCBfcmV0O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1JlYWN0JENvbXBvbmVudC5jYWxsLmFwcGx5KF9SZWFjdCRDb21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5fd3JhcENoaWxkID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIHByb3ZpZGUgdGhpcyBjaGlsZEZhY3Rvcnkgc28gdGhhdFxuICAgICAgLy8gUmVhY3RDU1NUcmFuc2l0aW9uR3JvdXBDaGlsZCBjYW4gcmVjZWl2ZSB1cGRhdGVzIHRvIG5hbWUsIGVudGVyLCBhbmRcbiAgICAgIC8vIGxlYXZlIHdoaWxlIGl0IGlzIGxlYXZpbmcuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdENTU1RyYW5zaXRpb25Hcm91cENoaWxkLCB7XG4gICAgICAgIG5hbWU6IF90aGlzLnByb3BzLnRyYW5zaXRpb25OYW1lLFxuICAgICAgICBhcHBlYXI6IF90aGlzLnByb3BzLnRyYW5zaXRpb25BcHBlYXIsXG4gICAgICAgIGVudGVyOiBfdGhpcy5wcm9wcy50cmFuc2l0aW9uRW50ZXIsXG4gICAgICAgIGxlYXZlOiBfdGhpcy5wcm9wcy50cmFuc2l0aW9uTGVhdmUsXG4gICAgICAgIGFwcGVhclRpbWVvdXQ6IF90aGlzLnByb3BzLnRyYW5zaXRpb25BcHBlYXJUaW1lb3V0LFxuICAgICAgICBlbnRlclRpbWVvdXQ6IF90aGlzLnByb3BzLnRyYW5zaXRpb25FbnRlclRpbWVvdXQsXG4gICAgICAgIGxlYXZlVGltZW91dDogX3RoaXMucHJvcHMudHJhbnNpdGlvbkxlYXZlVGltZW91dFxuICAgICAgfSwgY2hpbGQpO1xuICAgIH0sIF90ZW1wKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICB9XG5cbiAgUmVhY3RDU1NUcmFuc2l0aW9uR3JvdXAucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdFRyYW5zaXRpb25Hcm91cCwgX2Fzc2lnbih7fSwgdGhpcy5wcm9wcywgeyBjaGlsZEZhY3Rvcnk6IHRoaXMuX3dyYXBDaGlsZCB9KSk7XG4gIH07XG5cbiAgcmV0dXJuIFJlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5SZWFjdENTU1RyYW5zaXRpb25Hcm91cC5kaXNwbGF5TmFtZSA9ICdSZWFjdENTU1RyYW5zaXRpb25Hcm91cCc7XG5SZWFjdENTU1RyYW5zaXRpb25Hcm91cC5wcm9wVHlwZXMgPSB7XG4gIHRyYW5zaXRpb25OYW1lOiBSZWFjdENTU1RyYW5zaXRpb25Hcm91cENoaWxkLnByb3BUeXBlcy5uYW1lLFxuXG4gIHRyYW5zaXRpb25BcHBlYXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICB0cmFuc2l0aW9uRW50ZXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICB0cmFuc2l0aW9uTGVhdmU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICB0cmFuc2l0aW9uQXBwZWFyVGltZW91dDogY3JlYXRlVHJhbnNpdGlvblRpbWVvdXRQcm9wVmFsaWRhdG9yKCdBcHBlYXInKSxcbiAgdHJhbnNpdGlvbkVudGVyVGltZW91dDogY3JlYXRlVHJhbnNpdGlvblRpbWVvdXRQcm9wVmFsaWRhdG9yKCdFbnRlcicpLFxuICB0cmFuc2l0aW9uTGVhdmVUaW1lb3V0OiBjcmVhdGVUcmFuc2l0aW9uVGltZW91dFByb3BWYWxpZGF0b3IoJ0xlYXZlJylcbn07XG5SZWFjdENTU1RyYW5zaXRpb25Hcm91cC5kZWZhdWx0UHJvcHMgPSB7XG4gIHRyYW5zaXRpb25BcHBlYXI6IGZhbHNlLFxuICB0cmFuc2l0aW9uRW50ZXI6IHRydWUsXG4gIHRyYW5zaXRpb25MZWF2ZTogdHJ1ZVxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwO1xufSx7XCIyOVwiOjI5LFwiNDlcIjo0OSxcIjVcIjo1LFwiOFwiOjh9XSw4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IF9kZXJlcV8oNSk7XG52YXIgUmVhY3RBZGRvbnNET01EZXBlbmRlbmNpZXMgPSBfZGVyZXFfKDYpO1xuXG52YXIgQ1NTQ29yZSA9IF9kZXJlcV8oNDIpO1xudmFyIFJlYWN0VHJhbnNpdGlvbkV2ZW50cyA9IF9kZXJlcV8oMjgpO1xuXG52YXIgb25seUNoaWxkID0gX2RlcmVxXygzNyk7XG5cbnZhciBUSUNLID0gMTc7XG5cbnZhciBSZWFjdENTU1RyYW5zaXRpb25Hcm91cENoaWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ1JlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwQ2hpbGQnLFxuXG4gIHByb3BUeXBlczoge1xuICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1JlYWN0LlByb3BUeXBlcy5zdHJpbmcsIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBlbnRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGxlYXZlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgYWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfSksIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBlbnRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGVudGVyQWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgbGVhdmU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBsZWF2ZUFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGFwcGVhcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGFwcGVhckFjdGl2ZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0pXSkuaXNSZXF1aXJlZCxcblxuICAgIC8vIE9uY2Ugd2UgcmVxdWlyZSB0aW1lb3V0cyB0byBiZSBzcGVjaWZpZWQsIHdlIGNhbiByZW1vdmUgdGhlXG4gICAgLy8gYm9vbGVhbiBmbGFncyAoYXBwZWFyIGV0Yy4pIGFuZCBqdXN0IGFjY2VwdCBhIG51bWJlclxuICAgIC8vIG9yIGEgYm9vbCBmb3IgdGhlIHRpbWVvdXQgZmxhZ3MgKGFwcGVhclRpbWVvdXQgZXRjLilcbiAgICBhcHBlYXI6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIGVudGVyOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICBsZWF2ZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgYXBwZWFyVGltZW91dDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBlbnRlclRpbWVvdXQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgbGVhdmVUaW1lb3V0OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG4gIH0sXG5cbiAgdHJhbnNpdGlvbjogZnVuY3Rpb24gKGFuaW1hdGlvblR5cGUsIGZpbmlzaENhbGxiYWNrLCB1c2VyU3BlY2lmaWVkRGVsYXkpIHtcbiAgICB2YXIgbm9kZSA9IFJlYWN0QWRkb25zRE9NRGVwZW5kZW5jaWVzLmdldFJlYWN0RE9NKCkuZmluZERPTU5vZGUodGhpcyk7XG5cbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIGlmIChmaW5pc2hDYWxsYmFjaykge1xuICAgICAgICBmaW5pc2hDYWxsYmFjaygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLnByb3BzLm5hbWVbYW5pbWF0aW9uVHlwZV0gfHwgdGhpcy5wcm9wcy5uYW1lICsgJy0nICsgYW5pbWF0aW9uVHlwZTtcbiAgICB2YXIgYWN0aXZlQ2xhc3NOYW1lID0gdGhpcy5wcm9wcy5uYW1lW2FuaW1hdGlvblR5cGUgKyAnQWN0aXZlJ10gfHwgY2xhc3NOYW1lICsgJy1hY3RpdmUnO1xuICAgIHZhciB0aW1lb3V0ID0gbnVsbDtcblxuICAgIHZhciBlbmRMaXN0ZW5lciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZSAmJiBlLnRhcmdldCAhPT0gbm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgQ1NTQ29yZS5yZW1vdmVDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xuICAgICAgQ1NTQ29yZS5yZW1vdmVDbGFzcyhub2RlLCBhY3RpdmVDbGFzc05hbWUpO1xuXG4gICAgICBSZWFjdFRyYW5zaXRpb25FdmVudHMucmVtb3ZlRW5kRXZlbnRMaXN0ZW5lcihub2RlLCBlbmRMaXN0ZW5lcik7XG5cbiAgICAgIC8vIFVzdWFsbHkgdGhpcyBvcHRpb25hbCBjYWxsYmFjayBpcyB1c2VkIGZvciBpbmZvcm1pbmcgYW4gb3duZXIgb2ZcbiAgICAgIC8vIGEgbGVhdmUgYW5pbWF0aW9uIGFuZCB0ZWxsaW5nIGl0IHRvIHJlbW92ZSB0aGUgY2hpbGQuXG4gICAgICBpZiAoZmluaXNoQ2FsbGJhY2spIHtcbiAgICAgICAgZmluaXNoQ2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ1NTQ29yZS5hZGRDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xuXG4gICAgLy8gTmVlZCB0byBkbyB0aGlzIHRvIGFjdHVhbGx5IHRyaWdnZXIgYSB0cmFuc2l0aW9uLlxuICAgIHRoaXMucXVldWVDbGFzc0FuZE5vZGUoYWN0aXZlQ2xhc3NOYW1lLCBub2RlKTtcblxuICAgIC8vIElmIHRoZSB1c2VyIHNwZWNpZmllZCBhIHRpbWVvdXQgZGVsYXkuXG4gICAgaWYgKHVzZXJTcGVjaWZpZWREZWxheSkge1xuICAgICAgLy8gQ2xlYW4tdXAgdGhlIGFuaW1hdGlvbiBhZnRlciB0aGUgc3BlY2lmaWVkIGRlbGF5XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChlbmRMaXN0ZW5lciwgdXNlclNwZWNpZmllZERlbGF5KTtcbiAgICAgIHRoaXMudHJhbnNpdGlvblRpbWVvdXRzLnB1c2godGltZW91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERFUFJFQ0FURUQ6IHRoaXMgbGlzdGVuZXIgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb24gb2YgcmVhY3RcbiAgICAgIFJlYWN0VHJhbnNpdGlvbkV2ZW50cy5hZGRFbmRFdmVudExpc3RlbmVyKG5vZGUsIGVuZExpc3RlbmVyKTtcbiAgICB9XG4gIH0sXG5cbiAgcXVldWVDbGFzc0FuZE5vZGU6IGZ1bmN0aW9uIChjbGFzc05hbWUsIG5vZGUpIHtcbiAgICB0aGlzLmNsYXNzTmFtZUFuZE5vZGVRdWV1ZS5wdXNoKHtcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgbm9kZTogbm9kZVxuICAgIH0pO1xuXG4gICAgaWYgKCF0aGlzLnRpbWVvdXQpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5mbHVzaENsYXNzTmFtZUFuZE5vZGVRdWV1ZSwgVElDSyk7XG4gICAgfVxuICB9LFxuXG4gIGZsdXNoQ2xhc3NOYW1lQW5kTm9kZVF1ZXVlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNNb3VudGVkKCkpIHtcbiAgICAgIHRoaXMuY2xhc3NOYW1lQW5kTm9kZVF1ZXVlLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBDU1NDb3JlLmFkZENsYXNzKG9iai5ub2RlLCBvYmouY2xhc3NOYW1lKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmNsYXNzTmFtZUFuZE5vZGVRdWV1ZS5sZW5ndGggPSAwO1xuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jbGFzc05hbWVBbmROb2RlUXVldWUgPSBbXTtcbiAgICB0aGlzLnRyYW5zaXRpb25UaW1lb3V0cyA9IFtdO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuICAgIHRoaXMudHJhbnNpdGlvblRpbWVvdXRzLmZvckVhY2goZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2xhc3NOYW1lQW5kTm9kZVF1ZXVlLmxlbmd0aCA9IDA7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbEFwcGVhcjogZnVuY3Rpb24gKGRvbmUpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5hcHBlYXIpIHtcbiAgICAgIHRoaXMudHJhbnNpdGlvbignYXBwZWFyJywgZG9uZSwgdGhpcy5wcm9wcy5hcHBlYXJUaW1lb3V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9uZSgpO1xuICAgIH1cbiAgfSxcblxuICBjb21wb25lbnRXaWxsRW50ZXI6IGZ1bmN0aW9uIChkb25lKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZW50ZXIpIHtcbiAgICAgIHRoaXMudHJhbnNpdGlvbignZW50ZXInLCBkb25lLCB0aGlzLnByb3BzLmVudGVyVGltZW91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbExlYXZlOiBmdW5jdGlvbiAoZG9uZSkge1xuICAgIGlmICh0aGlzLnByb3BzLmxlYXZlKSB7XG4gICAgICB0aGlzLnRyYW5zaXRpb24oJ2xlYXZlJywgZG9uZSwgdGhpcy5wcm9wcy5sZWF2ZVRpbWVvdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb25lKCk7XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBvbmx5Q2hpbGQodGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwQ2hpbGQ7XG59LHtcIjI4XCI6MjgsXCIzN1wiOjM3LFwiNDJcIjo0MixcIjVcIjo1LFwiNlwiOjZ9XSw5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBQb29sZWRDbGFzcyA9IF9kZXJlcV8oNCk7XG52YXIgUmVhY3RFbGVtZW50ID0gX2RlcmVxXygxNik7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gX2RlcmVxXyg0NCk7XG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IF9kZXJlcV8oNDApO1xuXG52YXIgdHdvQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy50d29Bcmd1bWVudFBvb2xlcjtcbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy5mb3VyQXJndW1lbnRQb29sZXI7XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8rL2c7XG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogdHJhdmVyc2FsLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIEZvckVhY2hCb29rS2VlcGluZ1xuICogQHBhcmFtIHshZnVuY3Rpb259IGZvckVhY2hGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIHRyYXZlcnNhbCB3aXRoLlxuICogQHBhcmFtIHs/Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIGNvbnRleHQgd2l0aC5cbiAqL1xuZnVuY3Rpb24gRm9yRWFjaEJvb2tLZWVwaW5nKGZvckVhY2hGdW5jdGlvbiwgZm9yRWFjaENvbnRleHQpIHtcbiAgdGhpcy5mdW5jID0gZm9yRWFjaEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBmb3JFYWNoQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5Gb3JFYWNoQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhGb3JFYWNoQm9va0tlZXBpbmcsIHR3b0FyZ3VtZW50UG9vbGVyKTtcblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5mb3JlYWNoXG4gKlxuICogVGhlIHByb3ZpZGVkIGZvckVhY2hGdW5jKGNoaWxkLCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZvckVhY2hGdW5jXG4gKiBAcGFyYW0geyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgZm9yIGZvckVhY2hDb250ZXh0LlxuICovXG5mdW5jdGlvbiBmb3JFYWNoQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gRm9yRWFjaEJvb2tLZWVwaW5nLmdldFBvb2xlZChmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIEZvckVhY2hCb29rS2VlcGluZy5yZWxlYXNlKHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogUG9vbGVkQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBib29ra2VlcGluZyBhc3NvY2lhdGVkIHdpdGggcGVyZm9ybWluZyBhIGNoaWxkXG4gKiBtYXBwaW5nLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIE1hcEJvb2tLZWVwaW5nXG4gKiBAcGFyYW0geyEqfSBtYXBSZXN1bHQgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gbWFwRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKiBAcGFyYW0gez8qfSBtYXBDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKi9cbmZ1bmN0aW9uIE1hcEJvb2tLZWVwaW5nKG1hcFJlc3VsdCwga2V5UHJlZml4LCBtYXBGdW5jdGlvbiwgbWFwQ29udGV4dCkge1xuICB0aGlzLnJlc3VsdCA9IG1hcFJlc3VsdDtcbiAgdGhpcy5rZXlQcmVmaXggPSBrZXlQcmVmaXg7XG4gIHRoaXMuZnVuYyA9IG1hcEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBtYXBDb250ZXh0O1xuICB0aGlzLmNvdW50ID0gMDtcbn1cbk1hcEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlc3VsdCA9IG51bGw7XG4gIHRoaXMua2V5UHJlZml4ID0gbnVsbDtcbiAgdGhpcy5mdW5jID0gbnVsbDtcbiAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgdGhpcy5jb3VudCA9IDA7XG59O1xuUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKE1hcEJvb2tLZWVwaW5nLCBmb3VyQXJndW1lbnRQb29sZXIpO1xuXG5mdW5jdGlvbiBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0KGJvb2tLZWVwaW5nLCBjaGlsZCwgY2hpbGRLZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGJvb2tLZWVwaW5nLnJlc3VsdCxcbiAgICAgIGtleVByZWZpeCA9IGJvb2tLZWVwaW5nLmtleVByZWZpeCxcbiAgICAgIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jLFxuICAgICAgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cblxuICB2YXIgbWFwcGVkQ2hpbGQgPSBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xuICBpZiAoQXJyYXkuaXNBcnJheShtYXBwZWRDaGlsZCkpIHtcbiAgICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKG1hcHBlZENoaWxkLCByZXN1bHQsIGNoaWxkS2V5LCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKG1hcHBlZENoaWxkICE9IG51bGwpIHtcbiAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBSZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5KG1hcHBlZENoaWxkLFxuICAgICAgLy8gS2VlcCBib3RoIHRoZSAobWFwcGVkKSBhbmQgb2xkIGtleXMgaWYgdGhleSBkaWZmZXIsIGp1c3QgYXNcbiAgICAgIC8vIHRyYXZlcnNlQWxsQ2hpbGRyZW4gdXNlZCB0byBkbyBmb3Igb2JqZWN0cyBhcyBjaGlsZHJlblxuICAgICAga2V5UHJlZml4ICsgKG1hcHBlZENoaWxkLmtleSAmJiAoIWNoaWxkIHx8IGNoaWxkLmtleSAhPT0gbWFwcGVkQ2hpbGQua2V5KSA/IGVzY2FwZVVzZXJQcm92aWRlZEtleShtYXBwZWRDaGlsZC5rZXkpICsgJy8nIDogJycpICsgY2hpbGRLZXkpO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChtYXBwZWRDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgYXJyYXksIHByZWZpeCwgZnVuYywgY29udGV4dCkge1xuICB2YXIgZXNjYXBlZFByZWZpeCA9ICcnO1xuICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICBlc2NhcGVkUHJlZml4ID0gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHByZWZpeCkgKyAnLyc7XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IE1hcEJvb2tLZWVwaW5nLmdldFBvb2xlZChhcnJheSwgZXNjYXBlZFByZWZpeCwgZnVuYywgY29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIE1hcEJvb2tLZWVwaW5nLnJlbGVhc2UodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBNYXBzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ubWFwXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBrZXksIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZnVuYyBUaGUgbWFwIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IENvbnRleHQgZm9yIG1hcEZ1bmN0aW9uLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmMsIGNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmMsIGNvbnRleHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGREdW1teSh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkLCBuYW1lKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uY291bnRcbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbiwgY29udGV4dCkge1xuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXksIG51bGwpO1xufVxuXG4vKipcbiAqIEZsYXR0ZW4gYSBjaGlsZHJlbiBvYmplY3QgKHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCkgYW5kXG4gKiByZXR1cm4gYW4gYXJyYXkgd2l0aCBhcHByb3ByaWF0ZWx5IHJlLWtleWVkIGNoaWxkcmVuLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi50b2FycmF5XG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBSZWFjdENoaWxkcmVuID0ge1xuICBmb3JFYWNoOiBmb3JFYWNoQ2hpbGRyZW4sXG4gIG1hcDogbWFwQ2hpbGRyZW4sXG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWw6IG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwsXG4gIGNvdW50OiBjb3VudENoaWxkcmVuLFxuICB0b0FycmF5OiB0b0FycmF5XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2hpbGRyZW47XG59LHtcIjE2XCI6MTYsXCI0XCI6NCxcIjQwXCI6NDAsXCI0NFwiOjQ0fV0sMTA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gX2RlcmVxXygzOCksXG4gICAgX2Fzc2lnbiA9IF9kZXJlcV8oNDkpO1xuXG52YXIgUmVhY3RDb21wb25lbnQgPSBfZGVyZXFfKDExKTtcbnZhciBSZWFjdEVsZW1lbnQgPSBfZGVyZXFfKDE2KTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IF9kZXJlcV8oMjIpO1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gX2RlcmVxXygyMSk7XG5cbnZhciBlbXB0eU9iamVjdCA9IF9kZXJlcV8oNDUpO1xudmFyIGludmFyaWFudCA9IF9kZXJlcV8oNDYpO1xudmFyIHdhcm5pbmcgPSBfZGVyZXFfKDQ4KTtcblxudmFyIE1JWElOU19LRVkgPSAnbWl4aW5zJztcblxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGFsbG93IHRoZSBjcmVhdGlvbiBvZiBhbm9ueW1vdXMgZnVuY3Rpb25zIHdoaWNoIGRvIG5vdFxuLy8gaGF2ZSAubmFtZSBzZXQgdG8gdGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIGJlaW5nIGFzc2lnbmVkIHRvLlxuZnVuY3Rpb24gaWRlbnRpdHkoZm4pIHtcbiAgcmV0dXJuIGZuO1xufVxuXG4vKipcbiAqIFBvbGljaWVzIHRoYXQgZGVzY3JpYmUgbWV0aG9kcyBpbiBgUmVhY3RDbGFzc0ludGVyZmFjZWAuXG4gKi9cblxuXG52YXIgaW5qZWN0ZWRNaXhpbnMgPSBbXTtcblxuLyoqXG4gKiBDb21wb3NpdGUgY29tcG9uZW50cyBhcmUgaGlnaGVyLWxldmVsIGNvbXBvbmVudHMgdGhhdCBjb21wb3NlIG90aGVyIGNvbXBvc2l0ZVxuICogb3IgaG9zdCBjb21wb25lbnRzLlxuICpcbiAqIFRvIGNyZWF0ZSBhIG5ldyB0eXBlIG9mIGBSZWFjdENsYXNzYCwgcGFzcyBhIHNwZWNpZmljYXRpb24gb2ZcbiAqIHlvdXIgbmV3IGNsYXNzIHRvIGBSZWFjdC5jcmVhdGVDbGFzc2AuIFRoZSBvbmx5IHJlcXVpcmVtZW50IG9mIHlvdXIgY2xhc3NcbiAqIHNwZWNpZmljYXRpb24gaXMgdGhhdCB5b3UgaW1wbGVtZW50IGEgYHJlbmRlcmAgbWV0aG9kLlxuICpcbiAqICAgdmFyIE15Q29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gKiAgICAgICByZXR1cm4gPGRpdj5IZWxsbyBXb3JsZDwvZGl2PjtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFRoZSBjbGFzcyBzcGVjaWZpY2F0aW9uIHN1cHBvcnRzIGEgc3BlY2lmaWMgcHJvdG9jb2wgb2YgbWV0aG9kcyB0aGF0IGhhdmVcbiAqIHNwZWNpYWwgbWVhbmluZyAoZS5nLiBgcmVuZGVyYCkuIFNlZSBgUmVhY3RDbGFzc0ludGVyZmFjZWAgZm9yXG4gKiBtb3JlIHRoZSBjb21wcmVoZW5zaXZlIHByb3RvY29sLiBBbnkgb3RoZXIgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBpbiB0aGVcbiAqIGNsYXNzIHNwZWNpZmljYXRpb24gd2lsbCBiZSBhdmFpbGFibGUgb24gdGhlIHByb3RvdHlwZS5cbiAqXG4gKiBAaW50ZXJmYWNlIFJlYWN0Q2xhc3NJbnRlcmZhY2VcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RDbGFzc0ludGVyZmFjZSA9IHtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgTWl4aW4gb2JqZWN0cyB0byBpbmNsdWRlIHdoZW4gZGVmaW5pbmcgeW91ciBjb21wb25lbnQuXG4gICAqXG4gICAqIEB0eXBlIHthcnJheX1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBtaXhpbnM6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEFuIG9iamVjdCBjb250YWluaW5nIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgdGhhdCBzaG91bGQgYmUgZGVmaW5lZCBvblxuICAgKiB0aGUgY29tcG9uZW50J3MgY29uc3RydWN0b3IgaW5zdGVhZCBvZiBpdHMgcHJvdG90eXBlIChzdGF0aWMgbWV0aG9kcykuXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgc3RhdGljczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBwcm9wIHR5cGVzIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBwcm9wVHlwZXM6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgY29udGV4dCB0eXBlcyBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29udGV4dFR5cGVzOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIGNvbnRleHQgdHlwZXMgdGhpcyBjb21wb25lbnQgc2V0cyBmb3IgaXRzIGNoaWxkcmVuLlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNoaWxkQ29udGV4dFR5cGVzOiAnREVGSU5FX01BTlknLFxuXG4gIC8vID09PT0gRGVmaW5pdGlvbiBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC4gVmFsdWVzIGluIHRoZSBtYXBwaW5nIHdpbGwgYmUgc2V0IG9uXG4gICAqIGB0aGlzLnByb3BzYCBpZiB0aGF0IHByb3AgaXMgbm90IHNwZWNpZmllZCAoaS5lLiB1c2luZyBhbiBgaW5gIGNoZWNrKS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgaW52b2tlZCBiZWZvcmUgYGdldEluaXRpYWxTdGF0ZWAgYW5kIHRoZXJlZm9yZSBjYW5ub3QgcmVseVxuICAgKiBvbiBgdGhpcy5zdGF0ZWAgb3IgdXNlIGB0aGlzLnNldFN0YXRlYC5cbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGdldERlZmF1bHRQcm9wczogJ0RFRklORV9NQU5ZX01FUkdFRCcsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgb25jZSBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkLiBUaGUgcmV0dXJuIHZhbHVlIHdpbGwgYmUgdXNlZFxuICAgKiBhcyB0aGUgaW5pdGlhbCB2YWx1ZSBvZiBgdGhpcy5zdGF0ZWAuXG4gICAqXG4gICAqICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICogICAgIHJldHVybiB7XG4gICAqICAgICAgIGlzT246IGZhbHNlLFxuICAgKiAgICAgICBmb29CYXo6IG5ldyBCYXpGb28oKVxuICAgKiAgICAgfVxuICAgKiAgIH1cbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGdldEluaXRpYWxTdGF0ZTogJ0RFRklORV9NQU5ZX01FUkdFRCcsXG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXRDaGlsZENvbnRleHQ6ICdERUZJTkVfTUFOWV9NRVJHRUQnLFxuXG4gIC8qKlxuICAgKiBVc2VzIHByb3BzIGZyb20gYHRoaXMucHJvcHNgIGFuZCBzdGF0ZSBmcm9tIGB0aGlzLnN0YXRlYCB0byByZW5kZXIgdGhlXG4gICAqIHN0cnVjdHVyZSBvZiB0aGUgY29tcG9uZW50LlxuICAgKlxuICAgKiBObyBndWFyYW50ZWVzIGFyZSBtYWRlIGFib3V0IHdoZW4gb3IgaG93IG9mdGVuIHRoaXMgbWV0aG9kIGlzIGludm9rZWQsIHNvXG4gICAqIGl0IG11c3Qgbm90IGhhdmUgc2lkZSBlZmZlY3RzLlxuICAgKlxuICAgKiAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAqICAgICB2YXIgbmFtZSA9IHRoaXMucHJvcHMubmFtZTtcbiAgICogICAgIHJldHVybiA8ZGl2PkhlbGxvLCB7bmFtZX0hPC9kaXY+O1xuICAgKiAgIH1cbiAgICpcbiAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9XG4gICAqIEBub3NpZGVlZmZlY3RzXG4gICAqIEByZXF1aXJlZFxuICAgKi9cbiAgcmVuZGVyOiAnREVGSU5FX09OQ0UnLFxuXG4gIC8vID09PT0gRGVsZWdhdGUgbWV0aG9kcyA9PT09XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxseSBjcmVhdGVkIGFuZCBhYm91dCB0byBiZSBtb3VudGVkLlxuICAgKiBUaGlzIG1heSBoYXZlIHNpZGUgZWZmZWN0cywgYnV0IGFueSBleHRlcm5hbCBzdWJzY3JpcHRpb25zIG9yIGRhdGEgY3JlYXRlZFxuICAgKiBieSB0aGlzIG1ldGhvZCBtdXN0IGJlIGNsZWFuZWQgdXAgaW4gYGNvbXBvbmVudFdpbGxVbm1vdW50YC5cbiAgICpcbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsTW91bnQ6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIG1vdW50ZWQgYW5kIGhhcyBhIERPTSByZXByZXNlbnRhdGlvbi5cbiAgICogSG93ZXZlciwgdGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgdGhlIERPTSBub2RlIGlzIGluIHRoZSBkb2N1bWVudC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gb3BlcmF0ZSBvbiB0aGUgRE9NIHdoZW4gdGhlIGNvbXBvbmVudCBoYXNcbiAgICogYmVlbiBtb3VudGVkIChpbml0aWFsaXplZCBhbmQgcmVuZGVyZWQpIGZvciB0aGUgZmlyc3QgdGltZS5cbiAgICpcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSByb290Tm9kZSBET00gZWxlbWVudCByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudC5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnREaWRNb3VudDogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogSW52b2tlZCBiZWZvcmUgdGhlIGNvbXBvbmVudCByZWNlaXZlcyBuZXcgcHJvcHMuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIHJlYWN0IHRvIGEgcHJvcCB0cmFuc2l0aW9uIGJ5IHVwZGF0aW5nIHRoZVxuICAgKiBzdGF0ZSB1c2luZyBgdGhpcy5zZXRTdGF0ZWAuIEN1cnJlbnQgcHJvcHMgYXJlIGFjY2Vzc2VkIHZpYSBgdGhpcy5wcm9wc2AuXG4gICAqXG4gICAqICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0Q29udGV4dCkge1xuICAgKiAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAqICAgICAgIGxpa2VzSW5jcmVhc2luZzogbmV4dFByb3BzLmxpa2VDb3VudCA+IHRoaXMucHJvcHMubGlrZUNvdW50XG4gICAqICAgICB9KTtcbiAgICogICB9XG4gICAqXG4gICAqIE5PVEU6IFRoZXJlIGlzIG5vIGVxdWl2YWxlbnQgYGNvbXBvbmVudFdpbGxSZWNlaXZlU3RhdGVgLiBBbiBpbmNvbWluZyBwcm9wXG4gICAqIHRyYW5zaXRpb24gbWF5IGNhdXNlIGEgc3RhdGUgY2hhbmdlLCBidXQgdGhlIG9wcG9zaXRlIGlzIG5vdCB0cnVlLiBJZiB5b3VcbiAgICogbmVlZCBpdCwgeW91IGFyZSBwcm9iYWJseSBsb29raW5nIGZvciBgY29tcG9uZW50V2lsbFVwZGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoaWxlIGRlY2lkaW5nIGlmIHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIHVwZGF0ZWQgYXMgYSByZXN1bHQgb2ZcbiAgICogcmVjZWl2aW5nIG5ldyBwcm9wcywgc3RhdGUgYW5kL29yIGNvbnRleHQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIGByZXR1cm4gZmFsc2VgIHdoZW4geW91J3JlIGNlcnRhaW4gdGhhdCB0aGVcbiAgICogdHJhbnNpdGlvbiB0byB0aGUgbmV3IHByb3BzL3N0YXRlL2NvbnRleHQgd2lsbCBub3QgcmVxdWlyZSBhIGNvbXBvbmVudFxuICAgKiB1cGRhdGUuXG4gICAqXG4gICAqICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpIHtcbiAgICogICAgIHJldHVybiAhZXF1YWwobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fFxuICAgKiAgICAgICAhZXF1YWwobmV4dFN0YXRlLCB0aGlzLnN0YXRlKSB8fFxuICAgKiAgICAgICAhZXF1YWwobmV4dENvbnRleHQsIHRoaXMuY29udGV4dCk7XG4gICAqICAgfVxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHRcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgY29tcG9uZW50IHNob3VsZCB1cGRhdGUuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiAnREVGSU5FX09OQ0UnLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhYm91dCB0byB1cGRhdGUgZHVlIHRvIGEgdHJhbnNpdGlvbiBmcm9tXG4gICAqIGB0aGlzLnByb3BzYCwgYHRoaXMuc3RhdGVgIGFuZCBgdGhpcy5jb250ZXh0YCB0byBgbmV4dFByb3BzYCwgYG5leHRTdGF0ZWBcbiAgICogYW5kIGBuZXh0Q29udGV4dGAuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIHBlcmZvcm0gcHJlcGFyYXRpb24gYmVmb3JlIGFuIHVwZGF0ZSBvY2N1cnMuXG4gICAqXG4gICAqIE5PVEU6IFlvdSAqKmNhbm5vdCoqIHVzZSBgdGhpcy5zZXRTdGF0ZSgpYCBpbiB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRDb250ZXh0XG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsVXBkYXRlOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCdzIERPTSByZXByZXNlbnRhdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBvcGVyYXRlIG9uIHRoZSBET00gd2hlbiB0aGUgY29tcG9uZW50IGhhc1xuICAgKiBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcmV2UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBwcmV2U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBwcmV2Q29udGV4dFxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IHJvb3ROb2RlIERPTSBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50LlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgYWJvdXQgdG8gYmUgcmVtb3ZlZCBmcm9tIGl0cyBwYXJlbnQgYW5kIGhhdmVcbiAgICogaXRzIERPTSByZXByZXNlbnRhdGlvbiBkZXN0cm95ZWQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIGRlYWxsb2NhdGUgYW55IGV4dGVybmFsIHJlc291cmNlcy5cbiAgICpcbiAgICogTk9URTogVGhlcmUgaXMgbm8gYGNvbXBvbmVudERpZFVubW91bnRgIHNpbmNlIHlvdXIgY29tcG9uZW50IHdpbGwgaGF2ZSBiZWVuXG4gICAqIGRlc3Ryb3llZCBieSB0aGF0IHBvaW50LlxuICAgKlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiAnREVGSU5FX01BTlknLFxuXG4gIC8vID09PT0gQWR2YW5jZWQgbWV0aG9kcyA9PT09XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGNvbXBvbmVudCdzIGN1cnJlbnRseSBtb3VudGVkIERPTSByZXByZXNlbnRhdGlvbi5cbiAgICpcbiAgICogQnkgZGVmYXVsdCwgdGhpcyBpbXBsZW1lbnRzIFJlYWN0J3MgcmVuZGVyaW5nIGFuZCByZWNvbmNpbGlhdGlvbiBhbGdvcml0aG0uXG4gICAqIFNvcGhpc3RpY2F0ZWQgY2xpZW50cyBtYXkgd2lzaCB0byBvdmVycmlkZSB0aGlzLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAb3ZlcnJpZGFibGVcbiAgICovXG4gIHVwZGF0ZUNvbXBvbmVudDogJ09WRVJSSURFX0JBU0UnXG5cbn07XG5cbi8qKlxuICogTWFwcGluZyBmcm9tIGNsYXNzIHNwZWNpZmljYXRpb24ga2V5cyB0byBzcGVjaWFsIHByb2Nlc3NpbmcgZnVuY3Rpb25zLlxuICpcbiAqIEFsdGhvdWdoIHRoZXNlIGFyZSBkZWNsYXJlZCBsaWtlIGluc3RhbmNlIHByb3BlcnRpZXMgaW4gdGhlIHNwZWNpZmljYXRpb25cbiAqIHdoZW4gZGVmaW5pbmcgY2xhc3NlcyB1c2luZyBgUmVhY3QuY3JlYXRlQ2xhc3NgLCB0aGV5IGFyZSBhY3R1YWxseSBzdGF0aWNcbiAqIGFuZCBhcmUgYWNjZXNzaWJsZSBvbiB0aGUgY29uc3RydWN0b3IgaW5zdGVhZCBvZiB0aGUgcHJvdG90eXBlLiBEZXNwaXRlXG4gKiBiZWluZyBzdGF0aWMsIHRoZXkgbXVzdCBiZSBkZWZpbmVkIG91dHNpZGUgb2YgdGhlIFwic3RhdGljc1wiIGtleSB1bmRlclxuICogd2hpY2ggYWxsIG90aGVyIHN0YXRpYyBtZXRob2RzIGFyZSBkZWZpbmVkLlxuICovXG52YXIgUkVTRVJWRURfU1BFQ19LRVlTID0ge1xuICBkaXNwbGF5TmFtZTogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBkaXNwbGF5TmFtZSkge1xuICAgIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG4gIH0sXG4gIG1peGluczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBtaXhpbnMpIHtcbiAgICBpZiAobWl4aW5zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1peGlucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3RvciwgbWl4aW5zW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNoaWxkQ29udGV4dFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGNoaWxkQ29udGV4dFR5cGVzKSB7XG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIGNoaWxkQ29udGV4dFR5cGVzLCAnY2hpbGRDb250ZXh0Jyk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY2hpbGRDb250ZXh0VHlwZXMsIGNoaWxkQ29udGV4dFR5cGVzKTtcbiAgfSxcbiAgY29udGV4dFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcykge1xuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMsICdjb250ZXh0Jyk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcywgY29udGV4dFR5cGVzKTtcbiAgfSxcbiAgLyoqXG4gICAqIFNwZWNpYWwgY2FzZSBnZXREZWZhdWx0UHJvcHMgd2hpY2ggc2hvdWxkIG1vdmUgaW50byBzdGF0aWNzIGJ1dCByZXF1aXJlc1xuICAgKiBhdXRvbWF0aWMgbWVyZ2luZy5cbiAgICovXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBnZXREZWZhdWx0UHJvcHMpIHtcbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMgPSBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMsIGdldERlZmF1bHRQcm9wcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGdldERlZmF1bHRQcm9wcztcbiAgICB9XG4gIH0sXG4gIHByb3BUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMpIHtcbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhbGlkYXRlVHlwZURlZihDb25zdHJ1Y3RvciwgcHJvcFR5cGVzLCAncHJvcCcpO1xuICAgIH1cbiAgICBDb25zdHJ1Y3Rvci5wcm9wVHlwZXMgPSBfYXNzaWduKHt9LCBDb25zdHJ1Y3Rvci5wcm9wVHlwZXMsIHByb3BUeXBlcyk7XG4gIH0sXG4gIHN0YXRpY3M6IGZ1bmN0aW9uIChDb25zdHJ1Y3Rvciwgc3RhdGljcykge1xuICAgIG1peFN0YXRpY1NwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzdGF0aWNzKTtcbiAgfSxcbiAgYXV0b2JpbmQ6IGZ1bmN0aW9uICgpIHt9IH07XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVHlwZURlZihDb25zdHJ1Y3RvciwgdHlwZURlZiwgbG9jYXRpb24pIHtcbiAgZm9yICh2YXIgcHJvcE5hbWUgaW4gdHlwZURlZikge1xuICAgIGlmICh0eXBlRGVmLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgLy8gdXNlIGEgd2FybmluZyBpbnN0ZWFkIG9mIGFuIGludmFyaWFudCBzbyBjb21wb25lbnRzXG4gICAgICAvLyBkb24ndCBzaG93IHVwIGluIHByb2QgYnV0IG9ubHkgaW4gX19ERVZfX1xuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiB0eXBlRGVmW3Byb3BOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICdSZWFjdC5Qcm9wVHlwZXMuJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHByb3BOYW1lKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVNZXRob2RPdmVycmlkZShpc0FscmVhZHlEZWZpbmVkLCBuYW1lKSB7XG4gIHZhciBzcGVjUG9saWN5ID0gUmVhY3RDbGFzc0ludGVyZmFjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV0gOiBudWxsO1xuXG4gIC8vIERpc2FsbG93IG92ZXJyaWRpbmcgb2YgYmFzZSBjbGFzcyBtZXRob2RzIHVubGVzcyBleHBsaWNpdGx5IGFsbG93ZWQuXG4gIGlmIChSZWFjdENsYXNzTWl4aW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09ICdPVkVSUklERV9CQVNFJykgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBvdmVycmlkZSBgJXNgIGZyb20geW91ciBjbGFzcyBzcGVjaWZpY2F0aW9uLiBFbnN1cmUgdGhhdCB5b3VyIG1ldGhvZCBuYW1lcyBkbyBub3Qgb3ZlcmxhcCB3aXRoIFJlYWN0IG1ldGhvZHMuJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzMnLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxuXG4gIC8vIERpc2FsbG93IGRlZmluaW5nIG1ldGhvZHMgbW9yZSB0aGFuIG9uY2UgdW5sZXNzIGV4cGxpY2l0bHkgYWxsb3dlZC5cbiAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWScgfHwgc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZX01FUkdFRCcpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzSW50ZXJmYWNlOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGAlc2Agb24geW91ciBjb21wb25lbnQgbW9yZSB0aGFuIG9uY2UuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSB0byBhIG1peGluLicsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc0JywgbmFtZSkgOiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiBNaXhpbiBoZWxwZXIgd2hpY2ggaGFuZGxlcyBwb2xpY3kgdmFsaWRhdGlvbiBhbmQgcmVzZXJ2ZWRcbiAqIHNwZWNpZmljYXRpb24ga2V5cyB3aGVuIGJ1aWxkaW5nIFJlYWN0IGNsYXNzZXMuXG4gKi9cbmZ1bmN0aW9uIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzcGVjKSB7XG4gIGlmICghc3BlYykge1xuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIHR5cGVvZlNwZWMgPSB0eXBlb2Ygc3BlYztcbiAgICAgIHZhciBpc01peGluVmFsaWQgPSB0eXBlb2ZTcGVjID09PSAnb2JqZWN0JyAmJiBzcGVjICE9PSBudWxsO1xuXG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoaXNNaXhpblZhbGlkLCAnJXM6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gaW5jbHVkZSBhIG1peGluIHRoYXQgaXMgZWl0aGVyIG51bGwgJyArICdvciBub3QgYW4gb2JqZWN0LiBDaGVjayB0aGUgbWl4aW5zIGluY2x1ZGVkIGJ5IHRoZSBjb21wb25lbnQsICcgKyAnYXMgd2VsbCBhcyBhbnkgbWl4aW5zIHRoZXkgaW5jbHVkZSB0aGVtc2VsdmVzLiAnICsgJ0V4cGVjdGVkIG9iamVjdCBidXQgZ290ICVzLicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENsYXNzJywgc3BlYyA9PT0gbnVsbCA/IG51bGwgOiB0eXBlb2ZTcGVjKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAhKHR5cGVvZiBzcGVjICE9PSAnZnVuY3Rpb24nKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91XFwncmUgYXR0ZW1wdGluZyB0byB1c2UgYSBjb21wb25lbnQgY2xhc3Mgb3IgZnVuY3Rpb24gYXMgYSBtaXhpbi4gSW5zdGVhZCwganVzdCB1c2UgYSByZWd1bGFyIG9iamVjdC4nKSA6IF9wcm9kSW52YXJpYW50KCc3NScpIDogdm9pZCAwO1xuICAhIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChzcGVjKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91XFwncmUgYXR0ZW1wdGluZyB0byB1c2UgYSBjb21wb25lbnQgYXMgYSBtaXhpbi4gSW5zdGVhZCwganVzdCB1c2UgYSByZWd1bGFyIG9iamVjdC4nKSA6IF9wcm9kSW52YXJpYW50KCc3NicpIDogdm9pZCAwO1xuXG4gIHZhciBwcm90byA9IENvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgdmFyIGF1dG9CaW5kUGFpcnMgPSBwcm90by5fX3JlYWN0QXV0b0JpbmRQYWlycztcblxuICAvLyBCeSBoYW5kbGluZyBtaXhpbnMgYmVmb3JlIGFueSBvdGhlciBwcm9wZXJ0aWVzLCB3ZSBlbnN1cmUgdGhlIHNhbWVcbiAgLy8gY2hhaW5pbmcgb3JkZXIgaXMgYXBwbGllZCB0byBtZXRob2RzIHdpdGggREVGSU5FX01BTlkgcG9saWN5LCB3aGV0aGVyXG4gIC8vIG1peGlucyBhcmUgbGlzdGVkIGJlZm9yZSBvciBhZnRlciB0aGVzZSBtZXRob2RzIGluIHRoZSBzcGVjLlxuICBpZiAoc3BlYy5oYXNPd25Qcm9wZXJ0eShNSVhJTlNfS0VZKSkge1xuICAgIFJFU0VSVkVEX1NQRUNfS0VZUy5taXhpbnMoQ29uc3RydWN0b3IsIHNwZWMubWl4aW5zKTtcbiAgfVxuXG4gIGZvciAodmFyIG5hbWUgaW4gc3BlYykge1xuICAgIGlmICghc3BlYy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09IE1JWElOU19LRVkpIHtcbiAgICAgIC8vIFdlIGhhdmUgYWxyZWFkeSBoYW5kbGVkIG1peGlucyBpbiBhIHNwZWNpYWwgY2FzZSBhYm92ZS5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBwcm9wZXJ0eSA9IHNwZWNbbmFtZV07XG4gICAgdmFyIGlzQWxyZWFkeURlZmluZWQgPSBwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlKGlzQWxyZWFkeURlZmluZWQsIG5hbWUpO1xuXG4gICAgaWYgKFJFU0VSVkVEX1NQRUNfS0VZUy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgUkVTRVJWRURfU1BFQ19LRVlTW25hbWVdKENvbnN0cnVjdG9yLCBwcm9wZXJ0eSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldHVwIG1ldGhvZHMgb24gcHJvdG90eXBlOlxuICAgICAgLy8gVGhlIGZvbGxvd2luZyBtZW1iZXIgbWV0aG9kcyBzaG91bGQgbm90IGJlIGF1dG9tYXRpY2FsbHkgYm91bmQ6XG4gICAgICAvLyAxLiBFeHBlY3RlZCBSZWFjdENsYXNzIG1ldGhvZHMgKGluIHRoZSBcImludGVyZmFjZVwiKS5cbiAgICAgIC8vIDIuIE92ZXJyaWRkZW4gbWV0aG9kcyAodGhhdCB3ZXJlIG1peGVkIGluKS5cbiAgICAgIHZhciBpc1JlYWN0Q2xhc3NNZXRob2QgPSBSZWFjdENsYXNzSW50ZXJmYWNlLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgICAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbic7XG4gICAgICB2YXIgc2hvdWxkQXV0b0JpbmQgPSBpc0Z1bmN0aW9uICYmICFpc1JlYWN0Q2xhc3NNZXRob2QgJiYgIWlzQWxyZWFkeURlZmluZWQgJiYgc3BlYy5hdXRvYmluZCAhPT0gZmFsc2U7XG5cbiAgICAgIGlmIChzaG91bGRBdXRvQmluZCkge1xuICAgICAgICBhdXRvQmluZFBhaXJzLnB1c2gobmFtZSwgcHJvcGVydHkpO1xuICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAgICAgICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV07XG5cbiAgICAgICAgICAvLyBUaGVzZSBjYXNlcyBzaG91bGQgYWxyZWFkeSBiZSBjYXVnaHQgYnkgdmFsaWRhdGVNZXRob2RPdmVycmlkZS5cbiAgICAgICAgICAhKGlzUmVhY3RDbGFzc01ldGhvZCAmJiAoc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZX01FUkdFRCcgfHwgc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZJykpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBVbmV4cGVjdGVkIHNwZWMgcG9saWN5ICVzIGZvciBrZXkgJXMgd2hlbiBtaXhpbmcgaW4gY29tcG9uZW50IHNwZWNzLicsIHNwZWNQb2xpY3ksIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc3Jywgc3BlY1BvbGljeSwgbmFtZSkgOiB2b2lkIDA7XG5cbiAgICAgICAgICAvLyBGb3IgbWV0aG9kcyB3aGljaCBhcmUgZGVmaW5lZCBtb3JlIHRoYW4gb25jZSwgY2FsbCB0aGUgZXhpc3RpbmdcbiAgICAgICAgICAvLyBtZXRob2RzIGJlZm9yZSBjYWxsaW5nIHRoZSBuZXcgcHJvcGVydHksIG1lcmdpbmcgaWYgYXBwcm9wcmlhdGUuXG4gICAgICAgICAgaWYgKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWV9NRVJHRUQnKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTlknKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZUNoYWluZWRGdW5jdGlvbihwcm90b1tuYW1lXSwgcHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgLy8gQWRkIHZlcmJvc2UgZGlzcGxheU5hbWUgdG8gdGhlIGZ1bmN0aW9uLCB3aGljaCBoZWxwcyB3aGVuIGxvb2tpbmdcbiAgICAgICAgICAgIC8vIGF0IHByb2ZpbGluZyB0b29scy5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbicgJiYgc3BlYy5kaXNwbGF5TmFtZSkge1xuICAgICAgICAgICAgICBwcm90b1tuYW1lXS5kaXNwbGF5TmFtZSA9IHNwZWMuZGlzcGxheU5hbWUgKyAnXycgKyBuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtaXhTdGF0aWNTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3RhdGljcykge1xuICBpZiAoIXN0YXRpY3MpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9yICh2YXIgbmFtZSBpbiBzdGF0aWNzKSB7XG4gICAgdmFyIHByb3BlcnR5ID0gc3RhdGljc1tuYW1lXTtcbiAgICBpZiAoIXN0YXRpY3MuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBpc1Jlc2VydmVkID0gbmFtZSBpbiBSRVNFUlZFRF9TUEVDX0tFWVM7XG4gICAgISFpc1Jlc2VydmVkID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGEgcmVzZXJ2ZWQgcHJvcGVydHksIGAlc2AsIHRoYXQgc2hvdWxkblxcJ3QgYmUgb24gdGhlIFwic3RhdGljc1wiIGtleS4gRGVmaW5lIGl0IGFzIGFuIGluc3RhbmNlIHByb3BlcnR5IGluc3RlYWQ7IGl0IHdpbGwgc3RpbGwgYmUgYWNjZXNzaWJsZSBvbiB0aGUgY29uc3RydWN0b3IuJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzgnLCBuYW1lKSA6IHZvaWQgMDtcblxuICAgIHZhciBpc0luaGVyaXRlZCA9IG5hbWUgaW4gQ29uc3RydWN0b3I7XG4gICAgISFpc0luaGVyaXRlZCA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgdG8gYSBtaXhpbi4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3OScsIG5hbWUpIDogdm9pZCAwO1xuICAgIENvbnN0cnVjdG9yW25hbWVdID0gcHJvcGVydHk7XG4gIH1cbn1cblxuLyoqXG4gKiBNZXJnZSB0d28gb2JqZWN0cywgYnV0IHRocm93IGlmIGJvdGggY29udGFpbiB0aGUgc2FtZSBrZXkuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9uZSBUaGUgZmlyc3Qgb2JqZWN0LCB3aGljaCBpcyBtdXRhdGVkLlxuICogQHBhcmFtIHtvYmplY3R9IHR3byBUaGUgc2Vjb25kIG9iamVjdFxuICogQHJldHVybiB7b2JqZWN0fSBvbmUgYWZ0ZXIgaXQgaGFzIGJlZW4gbXV0YXRlZCB0byBjb250YWluIGV2ZXJ5dGhpbmcgaW4gdHdvLlxuICovXG5mdW5jdGlvbiBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKG9uZSwgdHdvKSB7XG4gICEob25lICYmIHR3byAmJiB0eXBlb2Ygb25lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHdvID09PSAnb2JqZWN0JykgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ21lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoKTogQ2Fubm90IG1lcmdlIG5vbi1vYmplY3RzLicpIDogX3Byb2RJbnZhcmlhbnQoJzgwJykgOiB2b2lkIDA7XG5cbiAgZm9yICh2YXIga2V5IGluIHR3bykge1xuICAgIGlmICh0d28uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgIShvbmVba2V5XSA9PT0gdW5kZWZpbmVkKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cygpOiBUcmllZCB0byBtZXJnZSB0d28gb2JqZWN0cyB3aXRoIHRoZSBzYW1lIGtleTogYCVzYC4gVGhpcyBjb25mbGljdCBtYXkgYmUgZHVlIHRvIGEgbWl4aW47IGluIHBhcnRpY3VsYXIsIHRoaXMgbWF5IGJlIGNhdXNlZCBieSB0d28gZ2V0SW5pdGlhbFN0YXRlKCkgb3IgZ2V0RGVmYXVsdFByb3BzKCkgbWV0aG9kcyByZXR1cm5pbmcgb2JqZWN0cyB3aXRoIGNsYXNoaW5nIGtleXMuJywga2V5KSA6IF9wcm9kSW52YXJpYW50KCc4MScsIGtleSkgOiB2b2lkIDA7XG4gICAgICBvbmVba2V5XSA9IHR3b1trZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb25lO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgbWVyZ2VzIHRoZWlyIHJldHVybiB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBtZXJnZWRSZXN1bHQoKSB7XG4gICAgdmFyIGEgPSBvbmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgYiA9IHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChhID09IG51bGwpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH0gZWxzZSBpZiAoYiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgdmFyIGMgPSB7fTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGEpO1xuICAgIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoYywgYik7XG4gICAgcmV0dXJuIGM7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0d28gZnVuY3Rpb25zIGFuZCBpZ25vcmVzIHRoZWlyIHJldHVybiB2YWxlcy5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbmUgRnVuY3Rpb24gdG8gaW52b2tlIGZpcnN0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHdvIEZ1bmN0aW9uIHRvIGludm9rZSBzZWNvbmQuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gRnVuY3Rpb24gdGhhdCBpbnZva2VzIHRoZSB0d28gYXJndW1lbnQgZnVuY3Rpb25zLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBjaGFpbmVkRnVuY3Rpb24oKSB7XG4gICAgb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdHdvLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8qKlxuICogQmluZHMgYSBtZXRob2QgdG8gdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2QgTWV0aG9kIHRvIGJlIGJvdW5kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBib3VuZCBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCkge1xuICB2YXIgYm91bmRNZXRob2QgPSBtZXRob2QuYmluZChjb21wb25lbnQpO1xuICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZE1ldGhvZCA9IG1ldGhvZDtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBudWxsO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gY29tcG9uZW50LmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lO1xuICAgIHZhciBfYmluZCA9IGJvdW5kTWV0aG9kLmJpbmQ7XG4gICAgYm91bmRNZXRob2QuYmluZCA9IGZ1bmN0aW9uIChuZXdUaGlzKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIC8vIFVzZXIgaXMgdHJ5aW5nIHRvIGJpbmQoKSBhbiBhdXRvYm91bmQgbWV0aG9kOyB3ZSBlZmZlY3RpdmVseSB3aWxsXG4gICAgICAvLyBpZ25vcmUgdGhlIHZhbHVlIG9mIFwidGhpc1wiIHRoYXQgdGhlIHVzZXIgaXMgdHJ5aW5nIHRvIHVzZSwgc29cbiAgICAgIC8vIGxldCdzIHdhcm4uXG4gICAgICBpZiAobmV3VGhpcyAhPT0gY29tcG9uZW50ICYmIG5ld1RoaXMgIT09IG51bGwpIHtcbiAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYmluZCgpOiBSZWFjdCBjb21wb25lbnQgbWV0aG9kcyBtYXkgb25seSBiZSBib3VuZCB0byB0aGUgJyArICdjb21wb25lbnQgaW5zdGFuY2UuIFNlZSAlcycsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgfSBlbHNlIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYmluZCgpOiBZb3UgYXJlIGJpbmRpbmcgYSBjb21wb25lbnQgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuICcgKyAnUmVhY3QgZG9lcyB0aGlzIGZvciB5b3UgYXV0b21hdGljYWxseSBpbiBhIGhpZ2gtcGVyZm9ybWFuY2UgJyArICd3YXksIHNvIHlvdSBjYW4gc2FmZWx5IHJlbW92ZSB0aGlzIGNhbGwuIFNlZSAlcycsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgICByZXR1cm4gYm91bmRNZXRob2Q7XG4gICAgICB9XG4gICAgICB2YXIgcmVib3VuZE1ldGhvZCA9IF9iaW5kLmFwcGx5KGJvdW5kTWV0aG9kLCBhcmd1bWVudHMpO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRNZXRob2QgPSBtZXRob2Q7XG4gICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IGFyZ3M7XG4gICAgICByZXR1cm4gcmVib3VuZE1ldGhvZDtcbiAgICB9O1xuICB9XG4gIHJldHVybiBib3VuZE1ldGhvZDtcbn1cblxuLyoqXG4gKiBCaW5kcyBhbGwgYXV0by1ib3VuZCBtZXRob2RzIGluIGEgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IHdob3NlIG1ldGhvZCBpcyBnb2luZyB0byBiZSBib3VuZC5cbiAqL1xuZnVuY3Rpb24gYmluZEF1dG9CaW5kTWV0aG9kcyhjb21wb25lbnQpIHtcbiAgdmFyIHBhaXJzID0gY29tcG9uZW50Ll9fcmVhY3RBdXRvQmluZFBhaXJzO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgdmFyIGF1dG9CaW5kS2V5ID0gcGFpcnNbaV07XG4gICAgdmFyIG1ldGhvZCA9IHBhaXJzW2kgKyAxXTtcbiAgICBjb21wb25lbnRbYXV0b0JpbmRLZXldID0gYmluZEF1dG9CaW5kTWV0aG9kKGNvbXBvbmVudCwgbWV0aG9kKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZCBtb3JlIHRvIHRoZSBSZWFjdENsYXNzIGJhc2UgY2xhc3MuIFRoZXNlIGFyZSBhbGwgbGVnYWN5IGZlYXR1cmVzIGFuZFxuICogdGhlcmVmb3JlIG5vdCBhbHJlYWR5IHBhcnQgb2YgdGhlIG1vZGVybiBSZWFjdENvbXBvbmVudC5cbiAqL1xudmFyIFJlYWN0Q2xhc3NNaXhpbiA9IHtcblxuICAvKipcbiAgICogVE9ETzogVGhpcyB3aWxsIGJlIGRlcHJlY2F0ZWQgYmVjYXVzZSBzdGF0ZSBzaG91bGQgYWx3YXlzIGtlZXAgYSBjb25zaXN0ZW50XG4gICAqIHR5cGUgc2lnbmF0dXJlIGFuZCB0aGUgb25seSB1c2UgY2FzZSBmb3IgdGhpcywgaXMgdG8gYXZvaWQgdGhhdC5cbiAgICovXG4gIHJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKG5ld1N0YXRlLCBjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlUmVwbGFjZVN0YXRlKHRoaXMsIG5ld1N0YXRlKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdyZXBsYWNlU3RhdGUnKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGVyLmlzTW91bnRlZCh0aGlzKTtcbiAgfVxufTtcblxudmFyIFJlYWN0Q2xhc3NDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7fTtcbl9hc3NpZ24oUmVhY3RDbGFzc0NvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDbGFzc01peGluKTtcblxuLyoqXG4gKiBNb2R1bGUgZm9yIGNyZWF0aW5nIGNvbXBvc2l0ZSBjb21wb25lbnRzLlxuICpcbiAqIEBjbGFzcyBSZWFjdENsYXNzXG4gKi9cbnZhciBSZWFjdENsYXNzID0ge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY29tcG9zaXRlIGNvbXBvbmVudCBjbGFzcyBnaXZlbiBhIGNsYXNzIHNwZWNpZmljYXRpb24uXG4gICAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jcmVhdGVjbGFzc1xuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3BlYyBDbGFzcyBzcGVjaWZpY2F0aW9uICh3aGljaCBtdXN0IGRlZmluZSBgcmVuZGVyYCkuXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBDb21wb25lbnQgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNyZWF0ZUNsYXNzOiBmdW5jdGlvbiAoc3BlYykge1xuICAgIC8vIFRvIGtlZXAgb3VyIHdhcm5pbmdzIG1vcmUgdW5kZXJzdGFuZGFibGUsIHdlJ2xsIHVzZSBhIGxpdHRsZSBoYWNrIGhlcmUgdG9cbiAgICAvLyBlbnN1cmUgdGhhdCBDb25zdHJ1Y3Rvci5uYW1lICE9PSAnQ29uc3RydWN0b3InLiBUaGlzIG1ha2VzIHN1cmUgd2UgZG9uJ3RcbiAgICAvLyB1bm5lY2Vzc2FyaWx5IGlkZW50aWZ5IGEgY2xhc3Mgd2l0aG91dCBkaXNwbGF5TmFtZSBhcyAnQ29uc3RydWN0b3InLlxuICAgIHZhciBDb25zdHJ1Y3RvciA9IGlkZW50aXR5KGZ1bmN0aW9uIChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAgICAgLy8gVGhpcyBjb25zdHJ1Y3RvciBnZXRzIG92ZXJyaWRkZW4gYnkgbW9ja3MuIFRoZSBhcmd1bWVudCBpcyB1c2VkXG4gICAgICAvLyBieSBtb2NrcyB0byBhc3NlcnQgb24gd2hhdCBnZXRzIG1vdW50ZWQuXG5cbiAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodGhpcyBpbnN0YW5jZW9mIENvbnN0cnVjdG9yLCAnU29tZXRoaW5nIGlzIGNhbGxpbmcgYSBSZWFjdCBjb21wb25lbnQgZGlyZWN0bHkuIFVzZSBhIGZhY3Rvcnkgb3IgJyArICdKU1ggaW5zdGVhZC4gU2VlOiBodHRwczovL2ZiLm1lL3JlYWN0LWxlZ2FjeWZhY3RvcnknKSA6IHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgLy8gV2lyZSB1cCBhdXRvLWJpbmRpbmdcbiAgICAgIGlmICh0aGlzLl9fcmVhY3RBdXRvQmluZFBhaXJzLmxlbmd0aCkge1xuICAgICAgICBiaW5kQXV0b0JpbmRNZXRob2RzKHRoaXMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gICAgICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xuXG4gICAgICB0aGlzLnN0YXRlID0gbnVsbDtcblxuICAgICAgLy8gUmVhY3RDbGFzc2VzIGRvZXNuJ3QgaGF2ZSBjb25zdHJ1Y3RvcnMuIEluc3RlYWQsIHRoZXkgdXNlIHRoZVxuICAgICAgLy8gZ2V0SW5pdGlhbFN0YXRlIGFuZCBjb21wb25lbnRXaWxsTW91bnQgbWV0aG9kcyBmb3IgaW5pdGlhbGl6YXRpb24uXG5cbiAgICAgIHZhciBpbml0aWFsU3RhdGUgPSB0aGlzLmdldEluaXRpYWxTdGF0ZSA/IHRoaXMuZ2V0SW5pdGlhbFN0YXRlKCkgOiBudWxsO1xuICAgICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIC8vIFdlIGFsbG93IGF1dG8tbW9ja3MgdG8gcHJvY2VlZCBhcyBpZiB0aGV5J3JlIHJldHVybmluZyBudWxsLlxuICAgICAgICBpZiAoaW5pdGlhbFN0YXRlID09PSB1bmRlZmluZWQgJiYgdGhpcy5nZXRJbml0aWFsU3RhdGUuX2lzTW9ja0Z1bmN0aW9uKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgICAvLyBkZXByZWNhdGluZyB0aGlzIGNvbnZlbmllbmNlLlxuICAgICAgICAgIGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICEodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaW5pdGlhbFN0YXRlKSkgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldEluaXRpYWxTdGF0ZSgpOiBtdXN0IHJldHVybiBhbiBvYmplY3Qgb3IgbnVsbCcsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogX3Byb2RJbnZhcmlhbnQoJzgyJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiB2b2lkIDA7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgfSk7XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gbmV3IFJlYWN0Q2xhc3NDb21wb25lbnQoKTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuX19yZWFjdEF1dG9CaW5kUGFpcnMgPSBbXTtcblxuICAgIGluamVjdGVkTWl4aW5zLmZvckVhY2gobWl4U3BlY0ludG9Db21wb25lbnQuYmluZChudWxsLCBDb25zdHJ1Y3RvcikpO1xuXG4gICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdFByb3BzIHByb3BlcnR5IGFmdGVyIGFsbCBtaXhpbnMgaGF2ZSBiZWVuIG1lcmdlZC5cbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHMgPSBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMoKTtcbiAgICB9XG5cbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIFRoaXMgaXMgYSB0YWcgdG8gaW5kaWNhdGUgdGhhdCB0aGUgdXNlIG9mIHRoZXNlIG1ldGhvZCBuYW1lcyBpcyBvayxcbiAgICAgIC8vIHNpbmNlIGl0J3MgdXNlZCB3aXRoIGNyZWF0ZUNsYXNzLiBJZiBpdCdzIG5vdCwgdGhlbiBpdCdzIGxpa2VseSBhXG4gICAgICAvLyBtaXN0YWtlIHNvIHdlJ2xsIHdhcm4geW91IHRvIHVzZSB0aGUgc3RhdGljIHByb3BlcnR5LCBwcm9wZXJ0eVxuICAgICAgLy8gaW5pdGlhbGl6ZXIgb3IgY29uc3RydWN0b3IgcmVzcGVjdGl2ZWx5LlxuICAgICAgaWYgKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcykge1xuICAgICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMuaXNSZWFjdENsYXNzQXBwcm92ZWQgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmIChDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUuaXNSZWFjdENsYXNzQXBwcm92ZWQgPSB7fTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAhQ29uc3RydWN0b3IucHJvdG90eXBlLnJlbmRlciA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnY3JlYXRlQ2xhc3MoLi4uKTogQ2xhc3Mgc3BlY2lmaWNhdGlvbiBtdXN0IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC4nKSA6IF9wcm9kSW52YXJpYW50KCc4MycpIDogdm9pZCAwO1xuXG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb21wb25lbnRTaG91bGRVcGRhdGUsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50U2hvdWxkVXBkYXRlKCkuIERpZCB5b3UgbWVhbiBzaG91bGRDb21wb25lbnRVcGRhdGUoKT8gJyArICdUaGUgbmFtZSBpcyBwaHJhc2VkIGFzIGEgcXVlc3Rpb24gYmVjYXVzZSB0aGUgZnVuY3Rpb24gaXMgJyArICdleHBlY3RlZCB0byByZXR1cm4gYSB2YWx1ZS4nLCBzcGVjLmRpc3BsYXlOYW1lIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzKCkuIERpZCB5b3UgbWVhbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCk/Jywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyBSZWR1Y2UgdGltZSBzcGVudCBkb2luZyBsb29rdXBzIGJ5IHNldHRpbmcgdGhlc2Ugb24gdGhlIHByb3RvdHlwZS5cbiAgICBmb3IgKHZhciBtZXRob2ROYW1lIGluIFJlYWN0Q2xhc3NJbnRlcmZhY2UpIHtcbiAgICAgIGlmICghQ29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9LFxuXG4gIGluamVjdGlvbjoge1xuICAgIGluamVjdE1peGluOiBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAgIGluamVjdGVkTWl4aW5zLnB1c2gobWl4aW4pO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2xhc3M7XG59LHtcIjExXCI6MTEsXCIxNlwiOjE2LFwiMjFcIjoyMSxcIjIyXCI6MjIsXCIzOFwiOjM4LFwiNDVcIjo0NSxcIjQ2XCI6NDYsXCI0OFwiOjQ4LFwiNDlcIjo0OX1dLDExOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IF9kZXJlcV8oMzgpO1xuXG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSBfZGVyZXFfKDIxKTtcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gX2RlcmVxXygzMyk7XG52YXIgZW1wdHlPYmplY3QgPSBfZGVyZXFfKDQ1KTtcbnZhciBpbnZhcmlhbnQgPSBfZGVyZXFfKDQ2KTtcbnZhciB3YXJuaW5nID0gX2RlcmVxXyg0OCk7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFJlYWN0Q29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuXG4vKipcbiAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgdG8gbXV0YXRlXG4gKiBzdGF0ZS4gWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAgd2lsbCBydW4gc3luY2hyb25vdXNseSxcbiAqIGFzIHRoZXkgbWF5IGV2ZW50dWFsbHkgYmUgYmF0Y2hlZCB0b2dldGhlci4gIFlvdSBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbFxuICogY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNhbGwgdG8gc2V0U3RhdGUgaXMgYWN0dWFsbHlcbiAqIGNvbXBsZXRlZC5cbiAqXG4gKiBXaGVuIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgdG8gc2V0U3RhdGUsIGl0IHdpbGwgYmUgY2FsbGVkIGF0IHNvbWUgcG9pbnQgaW5cbiAqIHRoZSBmdXR1cmUgKG5vdCBzeW5jaHJvbm91c2x5KS4gSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgdXAgdG8gZGF0ZVxuICogY29tcG9uZW50IGFyZ3VtZW50cyAoc3RhdGUsIHByb3BzLCBjb250ZXh0KS4gVGhlc2UgdmFsdWVzIGNhbiBiZSBkaWZmZXJlbnRcbiAqIGZyb20gdGhpcy4qIGJlY2F1c2UgeW91ciBmdW5jdGlvbiBtYXkgYmUgY2FsbGVkIGFmdGVyIHJlY2VpdmVQcm9wcyBidXQgYmVmb3JlXG4gKiBzaG91bGRDb21wb25lbnRVcGRhdGUsIGFuZCB0aGlzIG5ldyBzdGF0ZSwgcHJvcHMsIGFuZCBjb250ZXh0IHdpbGwgbm90IHlldCBiZVxuICogYXNzaWduZWQgdG8gdGhpcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSBvciBmdW5jdGlvbiB0b1xuICogICAgICAgIHByb2R1Y2UgbmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIGN1cnJlbnQgc3RhdGUuXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgISh0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnZnVuY3Rpb24nIHx8IHBhcnRpYWxTdGF0ZSA9PSBudWxsKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnc2V0U3RhdGUoLi4uKTogdGFrZXMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcyB0byB1cGRhdGUgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMuJykgOiBfcHJvZEludmFyaWFudCgnODUnKSA6IHZvaWQgMDtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnZm9yY2VVcGRhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXByZWNhdGVkIEFQSXMuIFRoZXNlIEFQSXMgdXNlZCB0byBleGlzdCBvbiBjbGFzc2ljIFJlYWN0IGNsYXNzZXMgYnV0IHNpbmNlXG4gKiB3ZSB3b3VsZCBsaWtlIHRvIGRlcHJlY2F0ZSB0aGVtLCB3ZSdyZSBub3QgZ29pbmcgdG8gbW92ZSB0aGVtIG92ZXIgdG8gdGhpc1xuICogbW9kZXJuIGJhc2UgY2xhc3MuIEluc3RlYWQsIHdlIGRlZmluZSBhIGdldHRlciB0aGF0IHdhcm5zIGlmIGl0J3MgYWNjZXNzZWQuXG4gKi9cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgZGVwcmVjYXRlZEFQSXMgPSB7XG4gICAgaXNNb3VudGVkOiBbJ2lzTW91bnRlZCcsICdJbnN0ZWFkLCBtYWtlIHN1cmUgdG8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucyBhbmQgcGVuZGluZyByZXF1ZXN0cyBpbiAnICsgJ2NvbXBvbmVudFdpbGxVbm1vdW50IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLiddLFxuICAgIHJlcGxhY2VTdGF0ZTogWydyZXBsYWNlU3RhdGUnLCAnUmVmYWN0b3IgeW91ciBjb2RlIHRvIHVzZSBzZXRTdGF0ZSBpbnN0ZWFkIChzZWUgJyArICdodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzMyMzYpLiddXG4gIH07XG4gIHZhciBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgaW5mbykge1xuICAgIGlmIChjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSwgbWV0aG9kTmFtZSwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlcycsIGluZm9bMF0sIGluZm9bMV0pIDogdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgZm9yICh2YXIgZm5OYW1lIGluIGRlcHJlY2F0ZWRBUElzKSB7XG4gICAgaWYgKGRlcHJlY2F0ZWRBUElzLmhhc093blByb3BlcnR5KGZuTmFtZSkpIHtcbiAgICAgIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyhmbk5hbWUsIGRlcHJlY2F0ZWRBUElzW2ZuTmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50O1xufSx7XCIyMVwiOjIxLFwiMzNcIjozMyxcIjM4XCI6MzgsXCI0NVwiOjQ1LFwiNDZcIjo0NixcIjQ4XCI6NDh9XSwxMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IF9kZXJlcV8oMzgpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSBfZGVyZXFfKDE0KTtcblxudmFyIGludmFyaWFudCA9IF9kZXJlcV8oNDYpO1xudmFyIHdhcm5pbmcgPSBfZGVyZXFfKDQ4KTtcblxuZnVuY3Rpb24gaXNOYXRpdmUoZm4pIHtcbiAgLy8gQmFzZWQgb24gaXNOYXRpdmUoKSBmcm9tIExvZGFzaFxuICB2YXIgZnVuY1RvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgKyBmdW5jVG9TdHJpbmdcbiAgLy8gVGFrZSBhbiBleGFtcGxlIG5hdGl2ZSBmdW5jdGlvbiBzb3VyY2UgZm9yIGNvbXBhcmlzb25cbiAgLmNhbGwoaGFzT3duUHJvcGVydHkpXG4gIC8vIFN0cmlwIHJlZ2V4IGNoYXJhY3RlcnMgc28gd2UgY2FuIHVzZSBpdCBmb3IgcmVnZXhcbiAgLnJlcGxhY2UoL1tcXFxcXiQuKis/KClbXFxde318XS9nLCAnXFxcXCQmJylcbiAgLy8gUmVtb3ZlIGhhc093blByb3BlcnR5IGZyb20gdGhlIHRlbXBsYXRlIHRvIG1ha2UgaXQgZ2VuZXJpY1xuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCcpO1xuICB0cnkge1xuICAgIHZhciBzb3VyY2UgPSBmdW5jVG9TdHJpbmcuY2FsbChmbik7XG4gICAgcmV0dXJuIHJlSXNOYXRpdmUudGVzdChzb3VyY2UpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxudmFyIGNhblVzZUNvbGxlY3Rpb25zID1cbi8vIEFycmF5LmZyb21cbnR5cGVvZiBBcnJheS5mcm9tID09PSAnZnVuY3Rpb24nICYmXG4vLyBNYXBcbnR5cGVvZiBNYXAgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoTWFwKSAmJlxuLy8gTWFwLnByb3RvdHlwZS5rZXlzXG5NYXAucHJvdG90eXBlICE9IG51bGwgJiYgdHlwZW9mIE1hcC5wcm90b3R5cGUua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShNYXAucHJvdG90eXBlLmtleXMpICYmXG4vLyBTZXRcbnR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoU2V0KSAmJlxuLy8gU2V0LnByb3RvdHlwZS5rZXlzXG5TZXQucHJvdG90eXBlICE9IG51bGwgJiYgdHlwZW9mIFNldC5wcm90b3R5cGUua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShTZXQucHJvdG90eXBlLmtleXMpO1xuXG52YXIgc2V0SXRlbTtcbnZhciBnZXRJdGVtO1xudmFyIHJlbW92ZUl0ZW07XG52YXIgZ2V0SXRlbUlEcztcbnZhciBhZGRSb290O1xudmFyIHJlbW92ZVJvb3Q7XG52YXIgZ2V0Um9vdElEcztcblxuaWYgKGNhblVzZUNvbGxlY3Rpb25zKSB7XG4gIHZhciBpdGVtTWFwID0gbmV3IE1hcCgpO1xuICB2YXIgcm9vdElEU2V0ID0gbmV3IFNldCgpO1xuXG4gIHNldEl0ZW0gPSBmdW5jdGlvbiAoaWQsIGl0ZW0pIHtcbiAgICBpdGVtTWFwLnNldChpZCwgaXRlbSk7XG4gIH07XG4gIGdldEl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gaXRlbU1hcC5nZXQoaWQpO1xuICB9O1xuICByZW1vdmVJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgaXRlbU1hcFsnZGVsZXRlJ10oaWQpO1xuICB9O1xuICBnZXRJdGVtSURzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGl0ZW1NYXAua2V5cygpKTtcbiAgfTtcblxuICBhZGRSb290ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgcm9vdElEU2V0LmFkZChpZCk7XG4gIH07XG4gIHJlbW92ZVJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByb290SURTZXRbJ2RlbGV0ZSddKGlkKTtcbiAgfTtcbiAgZ2V0Um9vdElEcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShyb290SURTZXQua2V5cygpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBpdGVtQnlLZXkgPSB7fTtcbiAgdmFyIHJvb3RCeUtleSA9IHt9O1xuXG4gIC8vIFVzZSBub24tbnVtZXJpYyBrZXlzIHRvIHByZXZlbnQgVjggcGVyZm9ybWFuY2UgaXNzdWVzOlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvcHVsbC83MjMyXG4gIHZhciBnZXRLZXlGcm9tSUQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gJy4nICsgaWQ7XG4gIH07XG4gIHZhciBnZXRJREZyb21LZXkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGtleS5zdWJzdHIoMSksIDEwKTtcbiAgfTtcblxuICBzZXRJdGVtID0gZnVuY3Rpb24gKGlkLCBpdGVtKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgaXRlbUJ5S2V5W2tleV0gPSBpdGVtO1xuICB9O1xuICBnZXRJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgcmV0dXJuIGl0ZW1CeUtleVtrZXldO1xuICB9O1xuICByZW1vdmVJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgZGVsZXRlIGl0ZW1CeUtleVtrZXldO1xuICB9O1xuICBnZXRJdGVtSURzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhpdGVtQnlLZXkpLm1hcChnZXRJREZyb21LZXkpO1xuICB9O1xuXG4gIGFkZFJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICByb290QnlLZXlba2V5XSA9IHRydWU7XG4gIH07XG4gIHJlbW92ZVJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICBkZWxldGUgcm9vdEJ5S2V5W2tleV07XG4gIH07XG4gIGdldFJvb3RJRHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHJvb3RCeUtleSkubWFwKGdldElERnJvbUtleSk7XG4gIH07XG59XG5cbnZhciB1bm1vdW50ZWRJRHMgPSBbXTtcblxuZnVuY3Rpb24gcHVyZ2VEZWVwKGlkKSB7XG4gIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gIGlmIChpdGVtKSB7XG4gICAgdmFyIGNoaWxkSURzID0gaXRlbS5jaGlsZElEcztcblxuICAgIHJlbW92ZUl0ZW0oaWQpO1xuICAgIGNoaWxkSURzLmZvckVhY2gocHVyZ2VEZWVwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKSB7XG4gIHJldHVybiAnXFxuICAgIGluICcgKyAobmFtZSB8fCAnVW5rbm93bicpICsgKHNvdXJjZSA/ICcgKGF0ICcgKyBzb3VyY2UuZmlsZU5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpICsgJzonICsgc291cmNlLmxpbmVOdW1iZXIgKyAnKScgOiBvd25lck5hbWUgPyAnIChjcmVhdGVkIGJ5ICcgKyBvd25lck5hbWUgKyAnKScgOiAnJyk7XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlOYW1lKGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybiAnI2VtcHR5JztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuICcjdGV4dCc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZWxlbWVudC50eXBlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbGVtZW50LnR5cGUuZGlzcGxheU5hbWUgfHwgZWxlbWVudC50eXBlLm5hbWUgfHwgJ1Vua25vd24nO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlSUQoaWQpIHtcbiAgdmFyIG5hbWUgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldERpc3BsYXlOYW1lKGlkKTtcbiAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICB2YXIgb3duZXJJRCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0T3duZXJJRChpZCk7XG4gIHZhciBvd25lck5hbWU7XG4gIGlmIChvd25lcklEKSB7XG4gICAgb3duZXJOYW1lID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXREaXNwbGF5TmFtZShvd25lcklEKTtcbiAgfVxuICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZWxlbWVudCwgJ1JlYWN0Q29tcG9uZW50VHJlZUhvb2s6IE1pc3NpbmcgUmVhY3QgZWxlbWVudCBmb3IgZGVidWdJRCAlcyB3aGVuICcgKyAnYnVpbGRpbmcgc3RhY2snLCBpZCkgOiB2b2lkIDA7XG4gIHJldHVybiBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIGVsZW1lbnQgJiYgZWxlbWVudC5fc291cmNlLCBvd25lck5hbWUpO1xufVxuXG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHtcbiAgb25TZXRDaGlsZHJlbjogZnVuY3Rpb24gKGlkLCBuZXh0Q2hpbGRJRHMpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgICFpdGVtID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdJdGVtIG11c3QgaGF2ZSBiZWVuIHNldCcpIDogX3Byb2RJbnZhcmlhbnQoJzE0NCcpIDogdm9pZCAwO1xuICAgIGl0ZW0uY2hpbGRJRHMgPSBuZXh0Q2hpbGRJRHM7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5leHRDaGlsZElEcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5leHRDaGlsZElEID0gbmV4dENoaWxkSURzW2ldO1xuICAgICAgdmFyIG5leHRDaGlsZCA9IGdldEl0ZW0obmV4dENoaWxkSUQpO1xuICAgICAgIW5leHRDaGlsZCA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgaG9vayBldmVudHMgdG8gZmlyZSBmb3IgdGhlIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDAnKSA6IHZvaWQgMDtcbiAgICAgICEobmV4dENoaWxkLmNoaWxkSURzICE9IG51bGwgfHwgdHlwZW9mIG5leHRDaGlsZC5lbGVtZW50ICE9PSAnb2JqZWN0JyB8fCBuZXh0Q2hpbGQuZWxlbWVudCA9PSBudWxsKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgb25TZXRDaGlsZHJlbigpIHRvIGZpcmUgZm9yIGEgY29udGFpbmVyIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDEnKSA6IHZvaWQgMDtcbiAgICAgICFuZXh0Q2hpbGQuaXNNb3VudGVkID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvbk1vdW50Q29tcG9uZW50KCkgdG8gZmlyZSBmb3IgdGhlIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IF9wcm9kSW52YXJpYW50KCc3MScpIDogdm9pZCAwO1xuICAgICAgaWYgKG5leHRDaGlsZC5wYXJlbnRJRCA9PSBudWxsKSB7XG4gICAgICAgIG5leHRDaGlsZC5wYXJlbnRJRCA9IGlkO1xuICAgICAgICAvLyBUT0RPOiBUaGlzIHNob3VsZG4ndCBiZSBuZWNlc3NhcnkgYnV0IG1vdW50aW5nIGEgbmV3IHJvb3QgZHVyaW5nIGluXG4gICAgICAgIC8vIGNvbXBvbmVudFdpbGxNb3VudCBjdXJyZW50bHkgY2F1c2VzIG5vdC15ZXQtbW91bnRlZCBjb21wb25lbnRzIHRvXG4gICAgICAgIC8vIGJlIHB1cmdlZCBmcm9tIG91ciB0cmVlIGRhdGEgc28gdGhlaXIgcGFyZW50IGlkIGlzIG1pc3NpbmcuXG4gICAgICB9XG4gICAgICAhKG5leHRDaGlsZC5wYXJlbnRJRCA9PT0gaWQpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvbkJlZm9yZU1vdW50Q29tcG9uZW50KCkgcGFyZW50IGFuZCBvblNldENoaWxkcmVuKCkgdG8gYmUgY29uc2lzdGVudCAoJXMgaGFzIHBhcmVudHMgJXMgYW5kICVzKS4nLCBuZXh0Q2hpbGRJRCwgbmV4dENoaWxkLnBhcmVudElELCBpZCkgOiBfcHJvZEludmFyaWFudCgnMTQyJywgbmV4dENoaWxkSUQsIG5leHRDaGlsZC5wYXJlbnRJRCwgaWQpIDogdm9pZCAwO1xuICAgIH1cbiAgfSxcbiAgb25CZWZvcmVNb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkLCBlbGVtZW50LCBwYXJlbnRJRCkge1xuICAgIHZhciBpdGVtID0ge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIHBhcmVudElEOiBwYXJlbnRJRCxcbiAgICAgIHRleHQ6IG51bGwsXG4gICAgICBjaGlsZElEczogW10sXG4gICAgICBpc01vdW50ZWQ6IGZhbHNlLFxuICAgICAgdXBkYXRlQ291bnQ6IDBcbiAgICB9O1xuICAgIHNldEl0ZW0oaWQsIGl0ZW0pO1xuICB9LFxuICBvbkJlZm9yZVVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKGlkLCBlbGVtZW50KSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaXNNb3VudGVkKSB7XG4gICAgICAvLyBXZSBtYXkgZW5kIHVwIGhlcmUgYXMgYSByZXN1bHQgb2Ygc2V0U3RhdGUoKSBpbiBjb21wb25lbnRXaWxsVW5tb3VudCgpLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCBpZ25vcmUgdGhlIGVsZW1lbnQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGl0ZW0uZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH0sXG4gIG9uTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgIWl0ZW0gPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0l0ZW0gbXVzdCBoYXZlIGJlZW4gc2V0JykgOiBfcHJvZEludmFyaWFudCgnMTQ0JykgOiB2b2lkIDA7XG4gICAgaXRlbS5pc01vdW50ZWQgPSB0cnVlO1xuICAgIHZhciBpc1Jvb3QgPSBpdGVtLnBhcmVudElEID09PSAwO1xuICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgIGFkZFJvb3QoaWQpO1xuICAgIH1cbiAgfSxcbiAgb25VcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgaWYgKCFpdGVtIHx8ICFpdGVtLmlzTW91bnRlZCkge1xuICAgICAgLy8gV2UgbWF5IGVuZCB1cCBoZXJlIGFzIGEgcmVzdWx0IG9mIHNldFN0YXRlKCkgaW4gY29tcG9uZW50V2lsbFVubW91bnQoKS5cbiAgICAgIC8vIEluIHRoaXMgY2FzZSwgaWdub3JlIHRoZSBlbGVtZW50LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpdGVtLnVwZGF0ZUNvdW50Kys7XG4gIH0sXG4gIG9uVW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBpZiBpdCBleGlzdHMuXG4gICAgICAvLyBgaXRlbWAgbWlnaHQgbm90IGV4aXN0IGlmIGl0IGlzIGluc2lkZSBhbiBlcnJvciBib3VuZGFyeSwgYW5kIGEgc2libGluZ1xuICAgICAgLy8gZXJyb3IgYm91bmRhcnkgY2hpbGQgdGhyZXcgd2hpbGUgbW91bnRpbmcuIFRoZW4gdGhpcyBpbnN0YW5jZSBuZXZlclxuICAgICAgLy8gZ290IGEgY2hhbmNlIHRvIG1vdW50LCBidXQgaXQgc3RpbGwgZ2V0cyBhbiB1bm1vdW50aW5nIGV2ZW50IGR1cmluZ1xuICAgICAgLy8gdGhlIGVycm9yIGJvdW5kYXJ5IGNsZWFudXAuXG4gICAgICBpdGVtLmlzTW91bnRlZCA9IGZhbHNlO1xuICAgICAgdmFyIGlzUm9vdCA9IGl0ZW0ucGFyZW50SUQgPT09IDA7XG4gICAgICBpZiAoaXNSb290KSB7XG4gICAgICAgIHJlbW92ZVJvb3QoaWQpO1xuICAgICAgfVxuICAgIH1cbiAgICB1bm1vdW50ZWRJRHMucHVzaChpZCk7XG4gIH0sXG4gIHB1cmdlVW5tb3VudGVkQ29tcG9uZW50czogZnVuY3Rpb24gKCkge1xuICAgIGlmIChSZWFjdENvbXBvbmVudFRyZWVIb29rLl9wcmV2ZW50UHVyZ2luZykge1xuICAgICAgLy8gU2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgdGVzdGluZy5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVubW91bnRlZElEcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkID0gdW5tb3VudGVkSURzW2ldO1xuICAgICAgcHVyZ2VEZWVwKGlkKTtcbiAgICB9XG4gICAgdW5tb3VudGVkSURzLmxlbmd0aCA9IDA7XG4gIH0sXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uaXNNb3VudGVkIDogZmFsc2U7XG4gIH0sXG4gIGdldEN1cnJlbnRTdGFja0FkZGVuZHVtOiBmdW5jdGlvbiAodG9wRWxlbWVudCkge1xuICAgIHZhciBpbmZvID0gJyc7XG4gICAgaWYgKHRvcEVsZW1lbnQpIHtcbiAgICAgIHZhciBuYW1lID0gZ2V0RGlzcGxheU5hbWUodG9wRWxlbWVudCk7XG4gICAgICB2YXIgb3duZXIgPSB0b3BFbGVtZW50Ll9vd25lcjtcbiAgICAgIGluZm8gKz0gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lLCB0b3BFbGVtZW50Ll9zb3VyY2UsIG93bmVyICYmIG93bmVyLmdldE5hbWUoKSk7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRPd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgdmFyIGlkID0gY3VycmVudE93bmVyICYmIGN1cnJlbnRPd25lci5fZGVidWdJRDtcblxuICAgIGluZm8gKz0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRTdGFja0FkZGVuZHVtQnlJRChpZCk7XG4gICAgcmV0dXJuIGluZm87XG4gIH0sXG4gIGdldFN0YWNrQWRkZW5kdW1CeUlEOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaW5mbyA9ICcnO1xuICAgIHdoaWxlIChpZCkge1xuICAgICAgaW5mbyArPSBkZXNjcmliZUlEKGlkKTtcbiAgICAgIGlkID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRQYXJlbnRJRChpZCk7XG4gICAgfVxuICAgIHJldHVybiBpbmZvO1xuICB9LFxuICBnZXRDaGlsZElEczogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uY2hpbGRJRHMgOiBbXTtcbiAgfSxcbiAgZ2V0RGlzcGxheU5hbWU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0RGlzcGxheU5hbWUoZWxlbWVudCk7XG4gIH0sXG4gIGdldEVsZW1lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmVsZW1lbnQgOiBudWxsO1xuICB9LFxuICBnZXRPd25lcklEOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gICAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50Ll9vd25lcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50Ll9vd25lci5fZGVidWdJRDtcbiAgfSxcbiAgZ2V0UGFyZW50SUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLnBhcmVudElEIDogbnVsbDtcbiAgfSxcbiAgZ2V0U291cmNlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHZhciBlbGVtZW50ID0gaXRlbSA/IGl0ZW0uZWxlbWVudCA6IG51bGw7XG4gICAgdmFyIHNvdXJjZSA9IGVsZW1lbnQgIT0gbnVsbCA/IGVsZW1lbnQuX3NvdXJjZSA6IG51bGw7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfSxcbiAgZ2V0VGV4dDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJycgKyBlbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG4gIGdldFVwZGF0ZUNvdW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS51cGRhdGVDb3VudCA6IDA7XG4gIH0sXG5cblxuICBnZXRSb290SURzOiBnZXRSb290SURzLFxuICBnZXRSZWdpc3RlcmVkSURzOiBnZXRJdGVtSURzXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2s7XG59LHtcIjE0XCI6MTQsXCIzOFwiOjM4LFwiNDZcIjo0NixcIjQ4XCI6NDh9XSwxMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2hhbGxvd0NvbXBhcmUgPSBfZGVyZXFfKDM5KTtcblxuLyoqXG4gKiBJZiB5b3VyIFJlYWN0IGNvbXBvbmVudCdzIHJlbmRlciBmdW5jdGlvbiBpcyBcInB1cmVcIiwgZS5nLiBpdCB3aWxsIHJlbmRlciB0aGVcbiAqIHNhbWUgcmVzdWx0IGdpdmVuIHRoZSBzYW1lIHByb3BzIGFuZCBzdGF0ZSwgcHJvdmlkZSB0aGlzIG1peGluIGZvciBhXG4gKiBjb25zaWRlcmFibGUgcGVyZm9ybWFuY2UgYm9vc3QuXG4gKlxuICogTW9zdCBSZWFjdCBjb21wb25lbnRzIGhhdmUgcHVyZSByZW5kZXIgZnVuY3Rpb25zLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICB2YXIgUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluID1cbiAqICAgICByZXF1aXJlKCdSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4nKTtcbiAqICAgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIG1peGluczogW1JlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpbl0sXG4gKlxuICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gKiAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfT5mb288L2Rpdj47XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBOb3RlOiBUaGlzIG9ubHkgY2hlY2tzIHNoYWxsb3cgZXF1YWxpdHkgZm9yIHByb3BzIGFuZCBzdGF0ZS4gSWYgdGhlc2UgY29udGFpblxuICogY29tcGxleCBkYXRhIHN0cnVjdHVyZXMgdGhpcyBtaXhpbiBtYXkgaGF2ZSBmYWxzZS1uZWdhdGl2ZXMgZm9yIGRlZXBlclxuICogZGlmZmVyZW5jZXMuIE9ubHkgbWl4aW4gdG8gY29tcG9uZW50cyB3aGljaCBoYXZlIHNpbXBsZSBwcm9wcyBhbmQgc3RhdGUsIG9yXG4gKiB1c2UgYGZvcmNlVXBkYXRlKClgIHdoZW4geW91IGtub3cgZGVlcCBkYXRhIHN0cnVjdHVyZXMgaGF2ZSBjaGFuZ2VkLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3B1cmUtcmVuZGVyLW1peGluLmh0bWxcbiAqL1xudmFyIFJlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpbiA9IHtcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbiAobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICByZXR1cm4gc2hhbGxvd0NvbXBhcmUodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpbjtcbn0se1wiMzlcIjozOX1dLDE0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBvd25lci5cbiAqXG4gKiBUaGUgY3VycmVudCBvd25lciBpcyB0aGUgY29tcG9uZW50IHdobyBzaG91bGQgb3duIGFueSBjb21wb25lbnRzIHRoYXQgYXJlXG4gKiBjdXJyZW50bHkgYmVpbmcgY29uc3RydWN0ZWQuXG4gKi9cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqIEB0eXBlIHtSZWFjdENvbXBvbmVudH1cbiAgICovXG4gIGN1cnJlbnQ6IG51bGxcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEN1cnJlbnRPd25lcjtcbn0se31dLDE1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSBfZGVyZXFfKDE2KTtcblxuLyoqXG4gKiBDcmVhdGUgYSBmYWN0b3J5IHRoYXQgY3JlYXRlcyBIVE1MIHRhZyBlbGVtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgY3JlYXRlRE9NRmFjdG9yeSA9IFJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5O1xuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSBfZGVyZXFfKDE4KTtcbiAgY3JlYXRlRE9NRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVGYWN0b3J5O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXBwaW5nIGZyb20gc3VwcG9ydGVkIEhUTUwgdGFncyB0byBgUmVhY3RET01Db21wb25lbnRgIGNsYXNzZXMuXG4gKiBUaGlzIGlzIGFsc28gYWNjZXNzaWJsZSB2aWEgYFJlYWN0LkRPTWAuXG4gKlxuICogQHB1YmxpY1xuICovXG52YXIgUmVhY3RET01GYWN0b3JpZXMgPSB7XG4gIGE6IGNyZWF0ZURPTUZhY3RvcnkoJ2EnKSxcbiAgYWJicjogY3JlYXRlRE9NRmFjdG9yeSgnYWJicicpLFxuICBhZGRyZXNzOiBjcmVhdGVET01GYWN0b3J5KCdhZGRyZXNzJyksXG4gIGFyZWE6IGNyZWF0ZURPTUZhY3RvcnkoJ2FyZWEnKSxcbiAgYXJ0aWNsZTogY3JlYXRlRE9NRmFjdG9yeSgnYXJ0aWNsZScpLFxuICBhc2lkZTogY3JlYXRlRE9NRmFjdG9yeSgnYXNpZGUnKSxcbiAgYXVkaW86IGNyZWF0ZURPTUZhY3RvcnkoJ2F1ZGlvJyksXG4gIGI6IGNyZWF0ZURPTUZhY3RvcnkoJ2InKSxcbiAgYmFzZTogY3JlYXRlRE9NRmFjdG9yeSgnYmFzZScpLFxuICBiZGk6IGNyZWF0ZURPTUZhY3RvcnkoJ2JkaScpLFxuICBiZG86IGNyZWF0ZURPTUZhY3RvcnkoJ2JkbycpLFxuICBiaWc6IGNyZWF0ZURPTUZhY3RvcnkoJ2JpZycpLFxuICBibG9ja3F1b3RlOiBjcmVhdGVET01GYWN0b3J5KCdibG9ja3F1b3RlJyksXG4gIGJvZHk6IGNyZWF0ZURPTUZhY3RvcnkoJ2JvZHknKSxcbiAgYnI6IGNyZWF0ZURPTUZhY3RvcnkoJ2JyJyksXG4gIGJ1dHRvbjogY3JlYXRlRE9NRmFjdG9yeSgnYnV0dG9uJyksXG4gIGNhbnZhczogY3JlYXRlRE9NRmFjdG9yeSgnY2FudmFzJyksXG4gIGNhcHRpb246IGNyZWF0ZURPTUZhY3RvcnkoJ2NhcHRpb24nKSxcbiAgY2l0ZTogY3JlYXRlRE9NRmFjdG9yeSgnY2l0ZScpLFxuICBjb2RlOiBjcmVhdGVET01GYWN0b3J5KCdjb2RlJyksXG4gIGNvbDogY3JlYXRlRE9NRmFjdG9yeSgnY29sJyksXG4gIGNvbGdyb3VwOiBjcmVhdGVET01GYWN0b3J5KCdjb2xncm91cCcpLFxuICBkYXRhOiBjcmVhdGVET01GYWN0b3J5KCdkYXRhJyksXG4gIGRhdGFsaXN0OiBjcmVhdGVET01GYWN0b3J5KCdkYXRhbGlzdCcpLFxuICBkZDogY3JlYXRlRE9NRmFjdG9yeSgnZGQnKSxcbiAgZGVsOiBjcmVhdGVET01GYWN0b3J5KCdkZWwnKSxcbiAgZGV0YWlsczogY3JlYXRlRE9NRmFjdG9yeSgnZGV0YWlscycpLFxuICBkZm46IGNyZWF0ZURPTUZhY3RvcnkoJ2RmbicpLFxuICBkaWFsb2c6IGNyZWF0ZURPTUZhY3RvcnkoJ2RpYWxvZycpLFxuICBkaXY6IGNyZWF0ZURPTUZhY3RvcnkoJ2RpdicpLFxuICBkbDogY3JlYXRlRE9NRmFjdG9yeSgnZGwnKSxcbiAgZHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2R0JyksXG4gIGVtOiBjcmVhdGVET01GYWN0b3J5KCdlbScpLFxuICBlbWJlZDogY3JlYXRlRE9NRmFjdG9yeSgnZW1iZWQnKSxcbiAgZmllbGRzZXQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2ZpZWxkc2V0JyksXG4gIGZpZ2NhcHRpb246IGNyZWF0ZURPTUZhY3RvcnkoJ2ZpZ2NhcHRpb24nKSxcbiAgZmlndXJlOiBjcmVhdGVET01GYWN0b3J5KCdmaWd1cmUnKSxcbiAgZm9vdGVyOiBjcmVhdGVET01GYWN0b3J5KCdmb290ZXInKSxcbiAgZm9ybTogY3JlYXRlRE9NRmFjdG9yeSgnZm9ybScpLFxuICBoMTogY3JlYXRlRE9NRmFjdG9yeSgnaDEnKSxcbiAgaDI6IGNyZWF0ZURPTUZhY3RvcnkoJ2gyJyksXG4gIGgzOiBjcmVhdGVET01GYWN0b3J5KCdoMycpLFxuICBoNDogY3JlYXRlRE9NRmFjdG9yeSgnaDQnKSxcbiAgaDU6IGNyZWF0ZURPTUZhY3RvcnkoJ2g1JyksXG4gIGg2OiBjcmVhdGVET01GYWN0b3J5KCdoNicpLFxuICBoZWFkOiBjcmVhdGVET01GYWN0b3J5KCdoZWFkJyksXG4gIGhlYWRlcjogY3JlYXRlRE9NRmFjdG9yeSgnaGVhZGVyJyksXG4gIGhncm91cDogY3JlYXRlRE9NRmFjdG9yeSgnaGdyb3VwJyksXG4gIGhyOiBjcmVhdGVET01GYWN0b3J5KCdocicpLFxuICBodG1sOiBjcmVhdGVET01GYWN0b3J5KCdodG1sJyksXG4gIGk6IGNyZWF0ZURPTUZhY3RvcnkoJ2knKSxcbiAgaWZyYW1lOiBjcmVhdGVET01GYWN0b3J5KCdpZnJhbWUnKSxcbiAgaW1nOiBjcmVhdGVET01GYWN0b3J5KCdpbWcnKSxcbiAgaW5wdXQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2lucHV0JyksXG4gIGluczogY3JlYXRlRE9NRmFjdG9yeSgnaW5zJyksXG4gIGtiZDogY3JlYXRlRE9NRmFjdG9yeSgna2JkJyksXG4gIGtleWdlbjogY3JlYXRlRE9NRmFjdG9yeSgna2V5Z2VuJyksXG4gIGxhYmVsOiBjcmVhdGVET01GYWN0b3J5KCdsYWJlbCcpLFxuICBsZWdlbmQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2xlZ2VuZCcpLFxuICBsaTogY3JlYXRlRE9NRmFjdG9yeSgnbGknKSxcbiAgbGluazogY3JlYXRlRE9NRmFjdG9yeSgnbGluaycpLFxuICBtYWluOiBjcmVhdGVET01GYWN0b3J5KCdtYWluJyksXG4gIG1hcDogY3JlYXRlRE9NRmFjdG9yeSgnbWFwJyksXG4gIG1hcms6IGNyZWF0ZURPTUZhY3RvcnkoJ21hcmsnKSxcbiAgbWVudTogY3JlYXRlRE9NRmFjdG9yeSgnbWVudScpLFxuICBtZW51aXRlbTogY3JlYXRlRE9NRmFjdG9yeSgnbWVudWl0ZW0nKSxcbiAgbWV0YTogY3JlYXRlRE9NRmFjdG9yeSgnbWV0YScpLFxuICBtZXRlcjogY3JlYXRlRE9NRmFjdG9yeSgnbWV0ZXInKSxcbiAgbmF2OiBjcmVhdGVET01GYWN0b3J5KCduYXYnKSxcbiAgbm9zY3JpcHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ25vc2NyaXB0JyksXG4gIG9iamVjdDogY3JlYXRlRE9NRmFjdG9yeSgnb2JqZWN0JyksXG4gIG9sOiBjcmVhdGVET01GYWN0b3J5KCdvbCcpLFxuICBvcHRncm91cDogY3JlYXRlRE9NRmFjdG9yeSgnb3B0Z3JvdXAnKSxcbiAgb3B0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdvcHRpb24nKSxcbiAgb3V0cHV0OiBjcmVhdGVET01GYWN0b3J5KCdvdXRwdXQnKSxcbiAgcDogY3JlYXRlRE9NRmFjdG9yeSgncCcpLFxuICBwYXJhbTogY3JlYXRlRE9NRmFjdG9yeSgncGFyYW0nKSxcbiAgcGljdHVyZTogY3JlYXRlRE9NRmFjdG9yeSgncGljdHVyZScpLFxuICBwcmU6IGNyZWF0ZURPTUZhY3RvcnkoJ3ByZScpLFxuICBwcm9ncmVzczogY3JlYXRlRE9NRmFjdG9yeSgncHJvZ3Jlc3MnKSxcbiAgcTogY3JlYXRlRE9NRmFjdG9yeSgncScpLFxuICBycDogY3JlYXRlRE9NRmFjdG9yeSgncnAnKSxcbiAgcnQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3J0JyksXG4gIHJ1Ynk6IGNyZWF0ZURPTUZhY3RvcnkoJ3J1YnknKSxcbiAgczogY3JlYXRlRE9NRmFjdG9yeSgncycpLFxuICBzYW1wOiBjcmVhdGVET01GYWN0b3J5KCdzYW1wJyksXG4gIHNjcmlwdDogY3JlYXRlRE9NRmFjdG9yeSgnc2NyaXB0JyksXG4gIHNlY3Rpb246IGNyZWF0ZURPTUZhY3RvcnkoJ3NlY3Rpb24nKSxcbiAgc2VsZWN0OiBjcmVhdGVET01GYWN0b3J5KCdzZWxlY3QnKSxcbiAgc21hbGw6IGNyZWF0ZURPTUZhY3RvcnkoJ3NtYWxsJyksXG4gIHNvdXJjZTogY3JlYXRlRE9NRmFjdG9yeSgnc291cmNlJyksXG4gIHNwYW46IGNyZWF0ZURPTUZhY3RvcnkoJ3NwYW4nKSxcbiAgc3Ryb25nOiBjcmVhdGVET01GYWN0b3J5KCdzdHJvbmcnKSxcbiAgc3R5bGU6IGNyZWF0ZURPTUZhY3RvcnkoJ3N0eWxlJyksXG4gIHN1YjogY3JlYXRlRE9NRmFjdG9yeSgnc3ViJyksXG4gIHN1bW1hcnk6IGNyZWF0ZURPTUZhY3RvcnkoJ3N1bW1hcnknKSxcbiAgc3VwOiBjcmVhdGVET01GYWN0b3J5KCdzdXAnKSxcbiAgdGFibGU6IGNyZWF0ZURPTUZhY3RvcnkoJ3RhYmxlJyksXG4gIHRib2R5OiBjcmVhdGVET01GYWN0b3J5KCd0Ym9keScpLFxuICB0ZDogY3JlYXRlRE9NRmFjdG9yeSgndGQnKSxcbiAgdGV4dGFyZWE6IGNyZWF0ZURPTUZhY3RvcnkoJ3RleHRhcmVhJyksXG4gIHRmb290OiBjcmVhdGVET01GYWN0b3J5KCd0Zm9vdCcpLFxuICB0aDogY3JlYXRlRE9NRmFjdG9yeSgndGgnKSxcbiAgdGhlYWQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3RoZWFkJyksXG4gIHRpbWU6IGNyZWF0ZURPTUZhY3RvcnkoJ3RpbWUnKSxcbiAgdGl0bGU6IGNyZWF0ZURPTUZhY3RvcnkoJ3RpdGxlJyksXG4gIHRyOiBjcmVhdGVET01GYWN0b3J5KCd0cicpLFxuICB0cmFjazogY3JlYXRlRE9NRmFjdG9yeSgndHJhY2snKSxcbiAgdTogY3JlYXRlRE9NRmFjdG9yeSgndScpLFxuICB1bDogY3JlYXRlRE9NRmFjdG9yeSgndWwnKSxcbiAgJ3Zhcic6IGNyZWF0ZURPTUZhY3RvcnkoJ3ZhcicpLFxuICB2aWRlbzogY3JlYXRlRE9NRmFjdG9yeSgndmlkZW8nKSxcbiAgd2JyOiBjcmVhdGVET01GYWN0b3J5KCd3YnInKSxcblxuICAvLyBTVkdcbiAgY2lyY2xlOiBjcmVhdGVET01GYWN0b3J5KCdjaXJjbGUnKSxcbiAgY2xpcFBhdGg6IGNyZWF0ZURPTUZhY3RvcnkoJ2NsaXBQYXRoJyksXG4gIGRlZnM6IGNyZWF0ZURPTUZhY3RvcnkoJ2RlZnMnKSxcbiAgZWxsaXBzZTogY3JlYXRlRE9NRmFjdG9yeSgnZWxsaXBzZScpLFxuICBnOiBjcmVhdGVET01GYWN0b3J5KCdnJyksXG4gIGltYWdlOiBjcmVhdGVET01GYWN0b3J5KCdpbWFnZScpLFxuICBsaW5lOiBjcmVhdGVET01GYWN0b3J5KCdsaW5lJyksXG4gIGxpbmVhckdyYWRpZW50OiBjcmVhdGVET01GYWN0b3J5KCdsaW5lYXJHcmFkaWVudCcpLFxuICBtYXNrOiBjcmVhdGVET01GYWN0b3J5KCdtYXNrJyksXG4gIHBhdGg6IGNyZWF0ZURPTUZhY3RvcnkoJ3BhdGgnKSxcbiAgcGF0dGVybjogY3JlYXRlRE9NRmFjdG9yeSgncGF0dGVybicpLFxuICBwb2x5Z29uOiBjcmVhdGVET01GYWN0b3J5KCdwb2x5Z29uJyksXG4gIHBvbHlsaW5lOiBjcmVhdGVET01GYWN0b3J5KCdwb2x5bGluZScpLFxuICByYWRpYWxHcmFkaWVudDogY3JlYXRlRE9NRmFjdG9yeSgncmFkaWFsR3JhZGllbnQnKSxcbiAgcmVjdDogY3JlYXRlRE9NRmFjdG9yeSgncmVjdCcpLFxuICBzdG9wOiBjcmVhdGVET01GYWN0b3J5KCdzdG9wJyksXG4gIHN2ZzogY3JlYXRlRE9NRmFjdG9yeSgnc3ZnJyksXG4gIHRleHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3RleHQnKSxcbiAgdHNwYW46IGNyZWF0ZURPTUZhY3RvcnkoJ3RzcGFuJylcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RET01GYWN0b3JpZXM7XG59LHtcIjE2XCI6MTYsXCIxOFwiOjE4fV0sMTY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSBfZGVyZXFfKDQ5KTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gX2RlcmVxXygxNCk7XG5cbnZhciB3YXJuaW5nID0gX2RlcmVxXyg0OCk7XG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSBfZGVyZXFfKDMzKTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBfZGVyZXFfKDE3KTtcblxudmFyIFJFU0VSVkVEX1BST1BTID0ge1xuICBrZXk6IHRydWUsXG4gIHJlZjogdHJ1ZSxcbiAgX19zZWxmOiB0cnVlLFxuICBfX3NvdXJjZTogdHJ1ZVxufTtcblxudmFyIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duLCBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bjtcblxuZnVuY3Rpb24gaGFzVmFsaWRSZWYoY29uZmlnKSB7XG4gIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ3JlZicpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdyZWYnKS5nZXQ7XG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25maWcucmVmICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdrZXknKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLmtleSAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdrZXknLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXksXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ1JlZiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclczogYHJlZmAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdyZWYnLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBSZWFjdCBlbGVtZW50LiBUaGlzIG5vIGxvbmdlciBhZGhlcmVzIHRvXG4gKiB0aGUgY2xhc3MgcGF0dGVybiwgc28gZG8gbm90IHVzZSBuZXcgdG8gY2FsbCBpdC4gQWxzbywgbm8gaW5zdGFuY2VvZiBjaGVja1xuICogd2lsbCB3b3JrLiBJbnN0ZWFkIHRlc3QgJCR0eXBlb2YgZmllbGQgYWdhaW5zdCBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgdG8gY2hlY2tcbiAqIGlmIHNvbWV0aGluZyBpcyBhIFJlYWN0IEVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHsqfSB0eXBlXG4gKiBAcGFyYW0geyp9IGtleVxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZWZcbiAqIEBwYXJhbSB7Kn0gc2VsZiBBICp0ZW1wb3JhcnkqIGhlbHBlciB0byBkZXRlY3QgcGxhY2VzIHdoZXJlIGB0aGlzYCBpc1xuICogZGlmZmVyZW50IGZyb20gdGhlIGBvd25lcmAgd2hlbiBSZWFjdC5jcmVhdGVFbGVtZW50IGlzIGNhbGxlZCwgc28gdGhhdCB3ZVxuICogY2FuIHdhcm4uIFdlIHdhbnQgdG8gZ2V0IHJpZCBvZiBvd25lciBhbmQgcmVwbGFjZSBzdHJpbmcgYHJlZmBzIHdpdGggYXJyb3dcbiAqIGZ1bmN0aW9ucywgYW5kIGFzIGxvbmcgYXMgYHRoaXNgIGFuZCBvd25lciBhcmUgdGhlIHNhbWUsIHRoZXJlIHdpbGwgYmUgbm9cbiAqIGNoYW5nZSBpbiBiZWhhdmlvci5cbiAqIEBwYXJhbSB7Kn0gc291cmNlIEFuIGFubm90YXRpb24gb2JqZWN0IChhZGRlZCBieSBhIHRyYW5zcGlsZXIgb3Igb3RoZXJ3aXNlKVxuICogaW5kaWNhdGluZyBmaWxlbmFtZSwgbGluZSBudW1iZXIsIGFuZC9vciBvdGhlciBpbmZvcm1hdGlvbi5cbiAqIEBwYXJhbSB7Kn0gb3duZXJcbiAqIEBwYXJhbSB7Kn0gcHJvcHNcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcykge1xuICB2YXIgZWxlbWVudCA9IHtcbiAgICAvLyBUaGlzIHRhZyBhbGxvdyB1cyB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzIGFzIGEgUmVhY3QgRWxlbWVudFxuICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG5cbiAgICAvLyBCdWlsdC1pbiBwcm9wZXJ0aWVzIHRoYXQgYmVsb25nIG9uIHRoZSBlbGVtZW50XG4gICAgdHlwZTogdHlwZSxcbiAgICBrZXk6IGtleSxcbiAgICByZWY6IHJlZixcbiAgICBwcm9wczogcHJvcHMsXG5cbiAgICAvLyBSZWNvcmQgdGhlIGNvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhpcyBlbGVtZW50LlxuICAgIF9vd25lcjogb3duZXJcbiAgfTtcblxuICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAvLyBUaGUgdmFsaWRhdGlvbiBmbGFnIGlzIGN1cnJlbnRseSBtdXRhdGl2ZS4gV2UgcHV0IGl0IG9uXG4gICAgLy8gYW4gZXh0ZXJuYWwgYmFja2luZyBzdG9yZSBzbyB0aGF0IHdlIGNhbiBmcmVlemUgdGhlIHdob2xlIG9iamVjdC5cbiAgICAvLyBUaGlzIGNhbiBiZSByZXBsYWNlZCB3aXRoIGEgV2Vha01hcCBvbmNlIHRoZXkgYXJlIGltcGxlbWVudGVkIGluXG4gICAgLy8gY29tbW9ubHkgdXNlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMuXG4gICAgZWxlbWVudC5fc3RvcmUgPSB7fTtcblxuICAgIC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgLy8gdGhlIHZhbGlkYXRpb24gZmxhZyBub24tZW51bWVyYWJsZSAod2hlcmUgcG9zc2libGUsIHdoaWNoIHNob3VsZFxuICAgIC8vIGluY2x1ZGUgZXZlcnkgZW52aXJvbm1lbnQgd2UgcnVuIHRlc3RzIGluKSwgc28gdGhlIHRlc3QgZnJhbWV3b3JrXG4gICAgLy8gaWdub3JlcyBpdC5cbiAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50Ll9zdG9yZSwgJ3ZhbGlkYXRlZCcsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgLy8gc2VsZiBhbmQgc291cmNlIGFyZSBERVYgb25seSBwcm9wZXJ0aWVzLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc2VsZicsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNlbGZcbiAgICAgIH0pO1xuICAgICAgLy8gVHdvIGVsZW1lbnRzIGNyZWF0ZWQgaW4gdHdvIGRpZmZlcmVudCBwbGFjZXMgc2hvdWxkIGJlIGNvbnNpZGVyZWRcbiAgICAgIC8vIGVxdWFsIGZvciB0ZXN0aW5nIHB1cnBvc2VzIGFuZCB0aGVyZWZvcmUgd2UgaGlkZSBpdCBmcm9tIGVudW1lcmF0aW9uLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc291cmNlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogc291cmNlXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICBlbGVtZW50Ll9zZWxmID0gc2VsZjtcbiAgICAgIGVsZW1lbnQuX3NvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudC5wcm9wcyk7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlZWxlbWVudFxuICovXG5SZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBwcm9wcyA9IHt9O1xuXG4gIHZhciBrZXkgPSBudWxsO1xuICB2YXIgcmVmID0gbnVsbDtcbiAgdmFyIHNlbGYgPSBudWxsO1xuICB2YXIgc291cmNlID0gbnVsbDtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICBzZWxmID0gY29uZmlnLl9fc2VsZiA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NlbGY7XG4gICAgc291cmNlID0gY29uZmlnLl9fc291cmNlID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc291cmNlO1xuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgICAgT2JqZWN0LmZyZWV6ZShjaGlsZEFycmF5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xuICAgIGZvciAocHJvcE5hbWUgaW4gZGVmYXVsdFByb3BzKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGtleSB8fCByZWYpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvcHMuJCR0eXBlb2YgPT09ICd1bmRlZmluZWQnIHx8IHByb3BzLiQkdHlwZW9mICE9PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCAnVW5rbm93bicgOiB0eXBlO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVmKSB7XG4gICAgICAgICAgZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyBSZWFjdEVsZW1lbnRzIG9mIGEgZ2l2ZW4gdHlwZS5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jcmVhdGVmYWN0b3J5XG4gKi9cblJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgdmFyIGZhY3RvcnkgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudC5iaW5kKG51bGwsIHR5cGUpO1xuICAvLyBFeHBvc2UgdGhlIHR5cGUgb24gdGhlIGZhY3RvcnkgYW5kIHRoZSBwcm90b3R5cGUgc28gdGhhdCBpdCBjYW4gYmVcbiAgLy8gZWFzaWx5IGFjY2Vzc2VkIG9uIGVsZW1lbnRzLiBFLmcuIGA8Rm9vIC8+LnR5cGUgPT09IEZvb2AuXG4gIC8vIFRoaXMgc2hvdWxkIG5vdCBiZSBuYW1lZCBgY29uc3RydWN0b3JgIHNpbmNlIHRoaXMgbWF5IG5vdCBiZSB0aGUgZnVuY3Rpb25cbiAgLy8gdGhhdCBjcmVhdGVkIHRoZSBlbGVtZW50LCBhbmQgaXQgbWF5IG5vdCBldmVuIGJlIGEgY29uc3RydWN0b3IuXG4gIC8vIExlZ2FjeSBob29rIFRPRE86IFdhcm4gaWYgdGhpcyBpcyBhY2Nlc3NlZFxuICBmYWN0b3J5LnR5cGUgPSB0eXBlO1xuICByZXR1cm4gZmFjdG9yeTtcbn07XG5cblJlYWN0RWxlbWVudC5jbG9uZUFuZFJlcGxhY2VLZXkgPSBmdW5jdGlvbiAob2xkRWxlbWVudCwgbmV3S2V5KSB7XG4gIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50KG9sZEVsZW1lbnQudHlwZSwgbmV3S2V5LCBvbGRFbGVtZW50LnJlZiwgb2xkRWxlbWVudC5fc2VsZiwgb2xkRWxlbWVudC5fc291cmNlLCBvbGRFbGVtZW50Ll9vd25lciwgb2xkRWxlbWVudC5wcm9wcyk7XG5cbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENsb25lIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IHVzaW5nIGVsZW1lbnQgYXMgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNsb25lZWxlbWVudFxuICovXG5SZWFjdEVsZW1lbnQuY2xvbmVFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lO1xuXG4gIC8vIE9yaWdpbmFsIHByb3BzIGFyZSBjb3BpZWRcbiAgdmFyIHByb3BzID0gX2Fzc2lnbih7fSwgZWxlbWVudC5wcm9wcyk7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIga2V5ID0gZWxlbWVudC5rZXk7XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgLy8gU2VsZiBpcyBwcmVzZXJ2ZWQgc2luY2UgdGhlIG93bmVyIGlzIHByZXNlcnZlZC5cbiAgdmFyIHNlbGYgPSBlbGVtZW50Ll9zZWxmO1xuICAvLyBTb3VyY2UgaXMgcHJlc2VydmVkIHNpbmNlIGNsb25lRWxlbWVudCBpcyB1bmxpa2VseSB0byBiZSB0YXJnZXRlZCBieSBhXG4gIC8vIHRyYW5zcGlsZXIsIGFuZCB0aGUgb3JpZ2luYWwgc291cmNlIGlzIHByb2JhYmx5IGEgYmV0dGVyIGluZGljYXRvciBvZiB0aGVcbiAgLy8gdHJ1ZSBvd25lci5cbiAgdmFyIHNvdXJjZSA9IGVsZW1lbnQuX3NvdXJjZTtcblxuICAvLyBPd25lciB3aWxsIGJlIHByZXNlcnZlZCwgdW5sZXNzIHJlZiBpcyBvdmVycmlkZGVuXG4gIHZhciBvd25lciA9IGVsZW1lbnQuX293bmVyO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICAvLyBTaWxlbnRseSBzdGVhbCB0aGUgcmVmIGZyb20gdGhlIHBhcmVudC5cbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgICBvd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgb3ZlcnJpZGUgZXhpc3RpbmcgcHJvcHNcbiAgICB2YXIgZGVmYXVsdFByb3BzO1xuICAgIGlmIChlbGVtZW50LnR5cGUgJiYgZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcykge1xuICAgICAgZGVmYXVsdFByb3BzID0gZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcztcbiAgICB9XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgaWYgKGNvbmZpZ1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBkZWZhdWx0UHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIHJldHVybiBSZWFjdEVsZW1lbnQoZWxlbWVudC50eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpO1xufTtcblxuLyoqXG4gKiBWZXJpZmllcyB0aGUgb2JqZWN0IGlzIGEgUmVhY3RFbGVtZW50LlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmlzdmFsaWRlbGVtZW50XG4gKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBgb2JqZWN0YCBpcyBhIHZhbGlkIGNvbXBvbmVudC5cbiAqIEBmaW5hbFxuICovXG5SZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RWxlbWVudDtcbn0se1wiMTRcIjoxNCxcIjE3XCI6MTcsXCIzM1wiOjMzLFwiNDhcIjo0OCxcIjQ5XCI6NDl9XSwxNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudCB0eXBlLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbFsnZm9yJ10gJiYgU3ltYm9sWydmb3InXSgncmVhY3QuZWxlbWVudCcpIHx8IDB4ZWFjNztcblxubW9kdWxlLmV4cG9ydHMgPSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59LHt9XSwxODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuLyoqXG4gKiBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgcHJvdmlkZXMgYSB3cmFwcGVyIGFyb3VuZCBhIGVsZW1lbnQgZmFjdG9yeVxuICogd2hpY2ggdmFsaWRhdGVzIHRoZSBwcm9wcyBwYXNzZWQgdG8gdGhlIGVsZW1lbnQuIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmVcbiAqIHVzZWQgb25seSBpbiBERVYgYW5kIGNvdWxkIGJlIHJlcGxhY2VkIGJ5IGEgc3RhdGljIHR5cGUgY2hlY2tlciBmb3IgbGFuZ3VhZ2VzXG4gKiB0aGF0IHN1cHBvcnQgaXQuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSBfZGVyZXFfKDE0KTtcbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gX2RlcmVxXygxMik7XG52YXIgUmVhY3RFbGVtZW50ID0gX2RlcmVxXygxNik7XG5cbnZhciBjaGVja1JlYWN0VHlwZVNwZWMgPSBfZGVyZXFfKDM0KTtcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gX2RlcmVxXygzMyk7XG52YXIgZ2V0SXRlcmF0b3JGbiA9IF9kZXJlcV8oMzYpO1xudmFyIHdhcm5pbmcgPSBfZGVyZXFfKDQ4KTtcblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkge1xuICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gKiBvYmplY3Qga2V5cyBhcmUgbm90IHZhbGlkLiBUaGlzIGFsbG93cyB1cyB0byBrZWVwIHRyYWNrIG9mIGNoaWxkcmVuIGJldHdlZW5cbiAqIHVwZGF0ZXMuXG4gKi9cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKSB7XG4gIHZhciBpbmZvID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG5cbiAgaWYgKCFpbmZvKSB7XG4gICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG4gICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgIGluZm8gPSAnIENoZWNrIHRoZSB0b3AtbGV2ZWwgcmVuZGVyIGNhbGwgdXNpbmcgPCcgKyBwYXJlbnROYW1lICsgJz4uJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZm87XG59XG5cbi8qKlxuICogV2FybiBpZiB0aGUgZWxlbWVudCBkb2Vzbid0IGhhdmUgYW4gZXhwbGljaXQga2V5IGFzc2lnbmVkIHRvIGl0LlxuICogVGhpcyBlbGVtZW50IGlzIGluIGFuIGFycmF5LiBUaGUgYXJyYXkgY291bGQgZ3JvdyBhbmQgc2hyaW5rIG9yIGJlXG4gKiByZW9yZGVyZWQuIEFsbCBjaGlsZHJlbiB0aGF0IGhhdmVuJ3QgYWxyZWFkeSBiZWVuIHZhbGlkYXRlZCBhcmUgcmVxdWlyZWQgdG9cbiAqIGhhdmUgYSBcImtleVwiIHByb3BlcnR5IGFzc2lnbmVkIHRvIGl0LiBFcnJvciBzdGF0dXNlcyBhcmUgY2FjaGVkIHNvIGEgd2FybmluZ1xuICogd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlRXhwbGljaXRLZXkoZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICBpZiAoIWVsZW1lbnQuX3N0b3JlIHx8IGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCB8fCBlbGVtZW50LmtleSAhPSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG5cbiAgdmFyIG1lbW9pemVyID0gb3duZXJIYXNLZXlVc2VXYXJuaW5nLnVuaXF1ZUtleSB8fCAob3duZXJIYXNLZXlVc2VXYXJuaW5nLnVuaXF1ZUtleSA9IHt9KTtcblxuICB2YXIgY3VycmVudENvbXBvbmVudEVycm9ySW5mbyA9IGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSk7XG4gIGlmIChtZW1vaXplcltjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSkge1xuICAgIHJldHVybjtcbiAgfVxuICBtZW1vaXplcltjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSA9IHRydWU7XG5cbiAgLy8gVXN1YWxseSB0aGUgY3VycmVudCBvd25lciBpcyB0aGUgb2ZmZW5kZXIsIGJ1dCBpZiBpdCBhY2NlcHRzIGNoaWxkcmVuIGFzIGFcbiAgLy8gcHJvcGVydHksIGl0IG1heSBiZSB0aGUgY3JlYXRvciBvZiB0aGUgY2hpbGQgdGhhdCdzIHJlc3BvbnNpYmxlIGZvclxuICAvLyBhc3NpZ25pbmcgaXQgYSBrZXkuXG4gIHZhciBjaGlsZE93bmVyID0gJyc7XG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuX293bmVyICYmIGVsZW1lbnQuX293bmVyICE9PSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgY2hpbGRPd25lciA9ICcgSXQgd2FzIHBhc3NlZCBhIGNoaWxkIGZyb20gJyArIGVsZW1lbnQuX293bmVyLmdldE5hbWUoKSArICcuJztcbiAgfVxuXG4gIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0VhY2ggY2hpbGQgaW4gYW4gYXJyYXkgb3IgaXRlcmF0b3Igc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJXMnLCBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvLCBjaGlsZE93bmVyLCBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEN1cnJlbnRTdGFja0FkZGVuZHVtKGVsZW1lbnQpKSA6IHZvaWQgMDtcbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhhdCBldmVyeSBlbGVtZW50IGVpdGhlciBpcyBwYXNzZWQgaW4gYSBzdGF0aWMgbG9jYXRpb24sIGluIGFuXG4gKiBhcnJheSB3aXRoIGFuIGV4cGxpY2l0IGtleXMgcHJvcGVydHkgZGVmaW5lZCwgb3IgaW4gYW4gb2JqZWN0IGxpdGVyYWxcbiAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgbm9kZSdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUsIHBhcmVudFR5cGUpIHtcbiAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gbm9kZVtpXTtcbiAgICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQobm9kZSkpIHtcbiAgICAvLyBUaGlzIGVsZW1lbnQgd2FzIHBhc3NlZCBpbiBhIHZhbGlkIGxvY2F0aW9uLlxuICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgbm9kZS5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9kZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihub2RlKTtcbiAgICAvLyBFbnRyeSBpdGVyYXRvcnMgcHJvdmlkZSBpbXBsaWNpdCBrZXlzLlxuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGFuIGVsZW1lbnQsIHZhbGlkYXRlIHRoYXQgaXRzIHByb3BzIGZvbGxvdyB0aGUgcHJvcFR5cGVzIGRlZmluaXRpb24sXG4gKiBwcm92aWRlZCBieSB0aGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KSB7XG4gIHZhciBjb21wb25lbnRDbGFzcyA9IGVsZW1lbnQudHlwZTtcbiAgaWYgKHR5cGVvZiBjb21wb25lbnRDbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSA9IGNvbXBvbmVudENsYXNzLmRpc3BsYXlOYW1lIHx8IGNvbXBvbmVudENsYXNzLm5hbWU7XG4gIGlmIChjb21wb25lbnRDbGFzcy5wcm9wVHlwZXMpIHtcbiAgICBjaGVja1JlYWN0VHlwZVNwZWMoY29tcG9uZW50Q2xhc3MucHJvcFR5cGVzLCBlbGVtZW50LnByb3BzLCAncHJvcCcsIG5hbWUsIGVsZW1lbnQsIG51bGwpO1xuICB9XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgfVxufVxuXG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0ge1xuXG4gIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgdmFsaWRUeXBlID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nO1xuICAgIC8vIFdlIHdhcm4gaW4gdGhpcyBjYXNlIGJ1dCBkb24ndCB0aHJvdy4gV2UgZXhwZWN0IHRoZSBlbGVtZW50IGNyZWF0aW9uIHRvXG4gICAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgICBpZiAoIXZhbGlkVHlwZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgaW5mbyA9ICcnO1xuICAgICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHR5cGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGluZm8gKz0gJyBZb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgZnJvbSB0aGUgZmlsZSAnICsgJ2l0XFwncyBkZWZpbmVkIGluLic7XG4gICAgICAgIH1cbiAgICAgICAgaW5mbyArPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnUmVhY3QuY3JlYXRlRWxlbWVudDogdHlwZSBpcyBpbnZhbGlkIC0tIGV4cGVjdGVkIGEgc3RyaW5nIChmb3IgJyArICdidWlsdC1pbiBjb21wb25lbnRzKSBvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlICcgKyAnY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCB0eXBlID09IG51bGwgPyB0eXBlIDogdHlwZW9mIHR5cGUsIGluZm8pIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBlbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIFRoZSByZXN1bHQgY2FuIGJlIG51bGxpc2ggaWYgYSBtb2NrIG9yIGEgY3VzdG9tIGZ1bmN0aW9uIGlzIHVzZWQuXG4gICAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICAgIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgLy8gZG9lc24ndCBleHBlY3QgYSBub24tc3RyaW5nL2Z1bmN0aW9uIHR5cGUgYW5kIGNhbiB0aHJvdyBjb25mdXNpbmcgZXJyb3JzLlxuICAgIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAgIC8vIGZpeGVkLCB0aGUga2V5IHdhcm5pbmdzIHdpbGwgYXBwZWFyLilcbiAgICBpZiAodmFsaWRUeXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIHR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgY3JlYXRlRmFjdG9yeTogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICB2YXIgdmFsaWRhdGVkRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7XG4gICAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gICAgdmFsaWRhdGVkRmFjdG9yeS50eXBlID0gdHlwZTtcblxuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWxpZGF0ZWRGYWN0b3J5LCAndHlwZScsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhY3RvcnkudHlwZSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdGhlIGNsYXNzIGRpcmVjdGx5ICcgKyAnYmVmb3JlIHBhc3NpbmcgaXQgdG8gY3JlYXRlRmFjdG9yeS4nKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndHlwZScsIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdGVkRmFjdG9yeTtcbiAgfSxcblxuICBjbG9uZUVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCBuZXdFbGVtZW50LnR5cGUpO1xuICAgIH1cbiAgICB2YWxpZGF0ZVByb3BUeXBlcyhuZXdFbGVtZW50KTtcbiAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RWxlbWVudFZhbGlkYXRvcjtcbn0se1wiMTJcIjoxMixcIjE0XCI6MTQsXCIxNlwiOjE2LFwiMzNcIjozMyxcIjM0XCI6MzQsXCIzNlwiOjM2LFwiNDhcIjo0OH1dLDE5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IF9kZXJlcV8oMzgpO1xuXG52YXIgUmVhY3RDaGlsZHJlbiA9IF9kZXJlcV8oOSk7XG52YXIgUmVhY3RFbGVtZW50ID0gX2RlcmVxXygxNik7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gX2RlcmVxXyg0NCk7XG52YXIgaW52YXJpYW50ID0gX2RlcmVxXyg0Nik7XG52YXIgd2FybmluZyA9IF9kZXJlcV8oNDgpO1xuXG4vKipcbiAqIFdlIHVzZWQgdG8gYWxsb3cga2V5ZWQgb2JqZWN0cyB0byBzZXJ2ZSBhcyBhIGNvbGxlY3Rpb24gb2YgUmVhY3RFbGVtZW50cyxcbiAqIG9yIG5lc3RlZCBzZXRzLiBUaGlzIGFsbG93ZWQgdXMgYSB3YXkgdG8gZXhwbGljaXRseSBrZXkgYSBzZXQgb3IgZnJhZ21lbnQgb2ZcbiAqIGNvbXBvbmVudHMuIFRoaXMgaXMgbm93IGJlaW5nIHJlcGxhY2VkIHdpdGggYW4gb3BhcXVlIGRhdGEgc3RydWN0dXJlLlxuICogVGhlIHVwZ3JhZGUgcGF0aCBpcyB0byBjYWxsIFJlYWN0LmFkZG9ucy5jcmVhdGVGcmFnbWVudCh7IGtleTogdmFsdWUgfSkgdG9cbiAqIGNyZWF0ZSBhIGtleWVkIGZyYWdtZW50LiBUaGUgcmVzdWx0aW5nIGRhdGEgc3RydWN0dXJlIGlzIGFuIGFycmF5LlxuICovXG5cbnZhciBudW1lcmljUHJvcGVydHlSZWdleCA9IC9eXFxkKyQvO1xuXG52YXIgd2FybmVkQWJvdXROdW1lcmljID0gZmFsc2U7XG5cbnZhciBSZWFjdEZyYWdtZW50ID0ge1xuICAvKipcbiAgICogV3JhcCBhIGtleWVkIG9iamVjdCBpbiBhbiBvcGFxdWUgcHJveHkgdGhhdCB3YXJucyB5b3UgaWYgeW91IGFjY2VzcyBhbnlcbiAgICogb2YgaXRzIHByb3BlcnRpZXMuXG4gICAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2NyZWF0ZS1mcmFnbWVudC5odG1sXG4gICAqL1xuICBjcmVhdGU6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICBpZiAodHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcgfHwgIW9iamVjdCB8fCBBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcbiAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ1JlYWN0LmFkZG9ucy5jcmVhdGVGcmFnbWVudCBvbmx5IGFjY2VwdHMgYSBzaW5nbGUgb2JqZWN0LiBHb3Q6ICVzJywgb2JqZWN0KSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQob2JqZWN0KSkge1xuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnUmVhY3QuYWRkb25zLmNyZWF0ZUZyYWdtZW50IGRvZXMgbm90IGFjY2VwdCBhIFJlYWN0RWxlbWVudCAnICsgJ3dpdGhvdXQgYSB3cmFwcGVyIG9iamVjdC4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgIShvYmplY3Qubm9kZVR5cGUgIT09IDEpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdC5hZGRvbnMuY3JlYXRlRnJhZ21lbnQoLi4uKTogRW5jb3VudGVyZWQgYW4gaW52YWxpZCBjaGlsZDsgRE9NIGVsZW1lbnRzIGFyZSBub3QgdmFsaWQgY2hpbGRyZW4gb2YgUmVhY3QgY29tcG9uZW50cy4nKSA6IF9wcm9kSW52YXJpYW50KCcwJykgOiB2b2lkIDA7XG5cbiAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKCF3YXJuZWRBYm91dE51bWVyaWMgJiYgbnVtZXJpY1Byb3BlcnR5UmVnZXgudGVzdChrZXkpKSB7XG4gICAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnUmVhY3QuYWRkb25zLmNyZWF0ZUZyYWdtZW50KC4uLik6IENoaWxkIG9iamVjdHMgc2hvdWxkIGhhdmUgJyArICdub24tbnVtZXJpYyBrZXlzIHNvIG9yZGVyaW5nIGlzIHByZXNlcnZlZC4nKSA6IHZvaWQgMDtcbiAgICAgICAgICB3YXJuZWRBYm91dE51bWVyaWMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBSZWFjdENoaWxkcmVuLm1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwob2JqZWN0W2tleV0sIHJlc3VsdCwga2V5LCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RGcmFnbWVudDtcbn0se1wiMTZcIjoxNixcIjM4XCI6MzgsXCI0NFwiOjQ0LFwiNDZcIjo0NixcIjQ4XCI6NDgsXCI5XCI6OX1dLDIwOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmVhY3RMaW5rIGVuY2Fwc3VsYXRlcyBhIGNvbW1vbiBwYXR0ZXJuIGluIHdoaWNoIGEgY29tcG9uZW50IHdhbnRzIHRvIG1vZGlmeVxuICogYSBwcm9wIHJlY2VpdmVkIGZyb20gaXRzIHBhcmVudC4gUmVhY3RMaW5rIGFsbG93cyB0aGUgcGFyZW50IHRvIHBhc3MgZG93biBhXG4gKiB2YWx1ZSBjb3VwbGVkIHdpdGggYSBjYWxsYmFjayB0aGF0LCB3aGVuIGludm9rZWQsIGV4cHJlc3NlcyBhbiBpbnRlbnQgdG9cbiAqIG1vZGlmeSB0aGF0IHZhbHVlLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gKiAgICAgcmV0dXJuIHt2YWx1ZTogJyd9O1xuICogICB9LFxuICogICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICogICAgIHZhciB2YWx1ZUxpbmsgPSBuZXcgUmVhY3RMaW5rKHRoaXMuc3RhdGUudmFsdWUsIHRoaXMuX2hhbmRsZVZhbHVlQ2hhbmdlKTtcbiAqICAgICByZXR1cm4gPGlucHV0IHZhbHVlTGluaz17dmFsdWVMaW5rfSAvPjtcbiAqICAgfSxcbiAqICAgX2hhbmRsZVZhbHVlQ2hhbmdlOiBmdW5jdGlvbihuZXdWYWx1ZSkge1xuICogICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBuZXdWYWx1ZX0pO1xuICogICB9XG4gKiB9KTtcbiAqXG4gKiBXZSBoYXZlIHByb3ZpZGVkIHNvbWUgc3VnYXJ5IG1peGlucyB0byBtYWtlIHRoZSBjcmVhdGlvbiBhbmRcbiAqIGNvbnN1bXB0aW9uIG9mIFJlYWN0TGluayBlYXNpZXI7IHNlZSBMaW5rZWRWYWx1ZVV0aWxzIGFuZCBMaW5rZWRTdGF0ZU1peGluLlxuICovXG5cbnZhciBSZWFjdCA9IF9kZXJlcV8oNSk7XG5cbi8qKlxuICogRGVwcmVjYXRlZDogQW4gYW4gZWFzeSB3YXkgdG8gZXhwcmVzcyB0d28td2F5IGJpbmRpbmcgd2l0aCBSZWFjdC4gXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90d28td2F5LWJpbmRpbmctaGVscGVycy5odG1sXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBsaW5rXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXF1ZXN0Q2hhbmdlIGNhbGxiYWNrIHRvIHJlcXVlc3QgYSBjaGFuZ2VcbiAqL1xuZnVuY3Rpb24gUmVhY3RMaW5rKHZhbHVlLCByZXF1ZXN0Q2hhbmdlKSB7XG4gIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgdGhpcy5yZXF1ZXN0Q2hhbmdlID0gcmVxdWVzdENoYW5nZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgUHJvcFR5cGUgdGhhdCBlbmZvcmNlcyB0aGUgUmVhY3RMaW5rIEFQSSBhbmQgb3B0aW9uYWxseSBjaGVja3MgdGhlXG4gKiB0eXBlIG9mIHRoZSB2YWx1ZSBiZWluZyBwYXNzZWQgaW5zaWRlIHRoZSBsaW5rLiBFeGFtcGxlOlxuICpcbiAqIE15Q29tcG9uZW50LnByb3BUeXBlcyA9IHtcbiAqICAgdGFiSW5kZXhMaW5rOiBSZWFjdExpbmsuUHJvcFR5cGVzLmxpbmsoUmVhY3QuUHJvcFR5cGVzLm51bWJlcilcbiAqIH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlTGlua1R5cGVDaGVja2VyKGxpbmtUeXBlKSB7XG4gIHZhciBzaGFwZXMgPSB7XG4gICAgdmFsdWU6IGxpbmtUeXBlID09PSB1bmRlZmluZWQgPyBSZWFjdC5Qcm9wVHlwZXMuYW55LmlzUmVxdWlyZWQgOiBsaW5rVHlwZS5pc1JlcXVpcmVkLFxuICAgIHJlcXVlc3RDaGFuZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfTtcbiAgcmV0dXJuIFJlYWN0LlByb3BUeXBlcy5zaGFwZShzaGFwZXMpO1xufVxuXG5SZWFjdExpbmsuUHJvcFR5cGVzID0ge1xuICBsaW5rOiBjcmVhdGVMaW5rVHlwZUNoZWNrZXJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RMaW5rO1xufSx7XCI1XCI6NX1dLDIxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB3YXJuaW5nID0gX2RlcmVxXyg0OCk7XG5cbmZ1bmN0aW9uIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCBjYWxsZXJOYW1lKSB7XG4gIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzKC4uLik6IENhbiBvbmx5IHVwZGF0ZSBhIG1vdW50ZWQgb3IgbW91bnRpbmcgY29tcG9uZW50LiAnICsgJ1RoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkICVzKCkgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gJyArICdUaGlzIGlzIGEgbm8tb3AuIFBsZWFzZSBjaGVjayB0aGUgY29kZSBmb3IgdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjYWxsZXJOYW1lLCBjb25zdHJ1Y3RvciAmJiAoY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgY29uc3RydWN0b3IubmFtZSkgfHwgJ1JlYWN0Q2xhc3MnKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGFic3RyYWN0IEFQSSBmb3IgYW4gdXBkYXRlIHF1ZXVlLlxuICovXG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSB7XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2Ugd2Ugd2FudCB0byB0ZXN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHByb3RlY3RlZFxuICAgKiBAZmluYWxcbiAgICovXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBFbnF1ZXVlIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGFmdGVyIGFsbCB0aGUgcGVuZGluZyB1cGRhdGVzXG4gICAqIGhhdmUgcHJvY2Vzc2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0byB1c2UgYXMgYHRoaXNgIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlQ2FsbGJhY2s6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY2FsbGJhY2spIHt9LFxuXG4gIC8qKlxuICAgKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gICAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICAgKlxuICAgKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gICAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gICAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdmb3JjZVVwZGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBhbGwgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgb3IgYHNldFN0YXRlYCB0byBtdXRhdGUgc3RhdGUuXG4gICAqIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wbGV0ZVN0YXRlIE5leHQgc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjb21wbGV0ZVN0YXRlKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVTZXRTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBwYXJ0aWFsU3RhdGUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3ROb29wVXBkYXRlUXVldWU7XG59LHtcIjQ4XCI6NDh9XSwyMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHt9O1xuXG5pZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7XG4gICAgcHJvcDogJ3Byb3AnLFxuICAgIGNvbnRleHQ6ICdjb250ZXh0JyxcbiAgICBjaGlsZENvbnRleHQ6ICdjaGlsZCBjb250ZXh0J1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzO1xufSx7fV0sMjM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IF9kZXJlcV8oMTYpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gX2RlcmVxXygyMik7XG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSBfZGVyZXFfKDI0KTtcblxudmFyIGVtcHR5RnVuY3Rpb24gPSBfZGVyZXFfKDQ0KTtcbnZhciBnZXRJdGVyYXRvckZuID0gX2RlcmVxXygzNik7XG52YXIgd2FybmluZyA9IF9kZXJlcV8oNDgpO1xuXG4vKipcbiAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICBwcm9wVHlwZXM6IHtcbiAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gKlxuICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICpcbiAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICogICAgIH0sXG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAqICAgfSk7XG4gKlxuICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICpcbiAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gKlxuICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICpcbiAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgcHJvcFR5cGVzOiB7XG4gKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gKiAgICAgICAgICApO1xuICogICAgICAgIH1cbiAqICAgICAgfVxuICogICAgfSxcbiAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICogIH0pO1xuICpcbiAqIEBpbnRlcm5hbFxuICovXG5cbnZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbnZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlclxufTtcblxuLyoqXG4gKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAqL1xuLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuZnVuY3Rpb24gaXMoeCwgeSkge1xuICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gIGlmICh4ID09PSB5KSB7XG4gICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG4vKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuLyoqXG4gKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyIHdlIGRvbid0IHVzZSByZWFsXG4gKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gKi9cbmZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB0aGlzLnN0YWNrID0gJyc7XG59XG4vLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG5Qcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gIH1cbiAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0ICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgIGlmICghbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldKSB7XG4gICAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArICdmdW5jdGlvbiBmb3IgdGhlIGAlc2AgcHJvcCBvbiBgJXNgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArICdhbmQgd2lsbCBub3Qgd29yayBpbiBwcm9kdWN0aW9uIHdpdGggdGhlIG5leHQgbWFqb3IgdmVyc2lvbi4gJyArICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgKyAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJywgcHJvcEZ1bGxOYW1lLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMobnVsbCkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICB9XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgaWYgKCFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgcHJvcFZhbHVlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICB9XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgfVxuICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gIC8vIE5hdGl2ZSBTeW1ib2wuXG4gIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbmZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgcmV0dXJuICdhcnJheSc7XG4gIH1cbiAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICByZXR1cm4gJ29iamVjdCc7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgcmV0dXJuICdzeW1ib2wnO1xuICB9XG4gIHJldHVybiBwcm9wVHlwZTtcbn1cblxuLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG5mdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICByZXR1cm4gJ2RhdGUnO1xuICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgfVxuICB9XG4gIHJldHVybiBwcm9wVHlwZTtcbn1cblxuLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbmZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgfVxuICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXM7XG59LHtcIjE2XCI6MTYsXCIyMlwiOjIyLFwiMjRcIjoyNCxcIjM2XCI6MzYsXCI0NFwiOjQ0LFwiNDhcIjo0OH1dLDI0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbn0se31dLDI1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gX2RlcmVxXyg0OSk7XG5cbnZhciBSZWFjdENvbXBvbmVudCA9IF9kZXJlcV8oMTEpO1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gX2RlcmVxXygyMSk7XG5cbnZhciBlbXB0eU9iamVjdCA9IF9kZXJlcV8oNDUpO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgaGVscGVycyBmb3IgdGhlIHVwZGF0aW5nIHN0YXRlIG9mIGEgY29tcG9uZW50LlxuICovXG5mdW5jdGlvbiBSZWFjdFB1cmVDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgLy8gRHVwbGljYXRlZCBmcm9tIFJlYWN0Q29tcG9uZW50LlxuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxuZnVuY3Rpb24gQ29tcG9uZW50RHVtbXkoKSB7fVxuQ29tcG9uZW50RHVtbXkucHJvdG90eXBlID0gUmVhY3RDb21wb25lbnQucHJvdG90eXBlO1xuUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZSA9IG5ldyBDb21wb25lbnREdW1teSgpO1xuUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlYWN0UHVyZUNvbXBvbmVudDtcbi8vIEF2b2lkIGFuIGV4dHJhIHByb3RvdHlwZSBqdW1wIGZvciB0aGVzZSBtZXRob2RzLlxuX2Fzc2lnbihSZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENvbXBvbmVudC5wcm90b3R5cGUpO1xuUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZS5pc1B1cmVSZWFjdENvbXBvbmVudCA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQdXJlQ29tcG9uZW50O1xufSx7XCIxMVwiOjExLFwiMjFcIjoyMSxcIjQ1XCI6NDUsXCI0OVwiOjQ5fV0sMjY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0U3RhdGVTZXR0ZXJzID0ge1xuICAvKipcbiAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLCBhbmQgdXNlcyB0aGUgcmVzdWx0XG4gICAqIG9mIHRoYXQgdG8gc2V0IHRoZSBjb21wb25lbnQncyBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvc2l0ZUNvbXBvbmVudH0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNSZXR1cm5pbmdTdGF0ZSBSZXR1cm5lZCBjYWxsYmFjayB1c2VzIHRoaXMgdG9cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGVybWluZSBob3cgdG8gdXBkYXRlIHN0YXRlLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gY2FsbGJhY2sgdGhhdCB3aGVuIGludm9rZWQgdXNlcyBmdW5jUmV0dXJuaW5nU3RhdGUgdG9cbiAgICogICAgICAgICAgICAgICAgICAgIGRldGVybWluZWQgdGhlIG9iamVjdCBsaXRlcmFsIHRvIHNldFN0YXRlLlxuICAgKi9cbiAgY3JlYXRlU3RhdGVTZXR0ZXI6IGZ1bmN0aW9uIChjb21wb25lbnQsIGZ1bmNSZXR1cm5pbmdTdGF0ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYywgZCwgZSwgZikge1xuICAgICAgdmFyIHBhcnRpYWxTdGF0ZSA9IGZ1bmNSZXR1cm5pbmdTdGF0ZS5jYWxsKGNvbXBvbmVudCwgYSwgYiwgYywgZCwgZSwgZik7XG4gICAgICBpZiAocGFydGlhbFN0YXRlKSB7XG4gICAgICAgIGNvbXBvbmVudC5zZXRTdGF0ZShwYXJ0aWFsU3RhdGUpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzaW5nbGUtYXJndW1lbnQgY2FsbGJhY2sgdGhhdCBjYW4gYmUgdXNlZCB0byB1cGRhdGUgYSBzaW5nbGVcbiAgICoga2V5IGluIHRoZSBjb21wb25lbnQncyBzdGF0ZS5cbiAgICpcbiAgICogTm90ZTogdGhpcyBpcyBtZW1vaXplZCBmdW5jdGlvbiwgd2hpY2ggbWFrZXMgaXQgaW5leHBlbnNpdmUgdG8gY2FsbC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvc2l0ZUNvbXBvbmVudH0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBpbiB0aGUgc3RhdGUgdGhhdCB5b3Ugc2hvdWxkIHVwZGF0ZS5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259IGNhbGxiYWNrIG9mIDEgYXJndW1lbnQgd2hpY2ggY2FsbHMgc2V0U3RhdGUoKSB3aXRoXG4gICAqICAgICAgICAgICAgICAgICAgICB0aGUgcHJvdmlkZWQga2V5TmFtZSBhbmQgY2FsbGJhY2sgYXJndW1lbnQuXG4gICAqL1xuICBjcmVhdGVTdGF0ZUtleVNldHRlcjogZnVuY3Rpb24gKGNvbXBvbmVudCwga2V5KSB7XG4gICAgLy8gTWVtb2l6ZSB0aGUgc2V0dGVycy5cbiAgICB2YXIgY2FjaGUgPSBjb21wb25lbnQuX19rZXlTZXR0ZXJzIHx8IChjb21wb25lbnQuX19rZXlTZXR0ZXJzID0ge30pO1xuICAgIHJldHVybiBjYWNoZVtrZXldIHx8IChjYWNoZVtrZXldID0gY3JlYXRlU3RhdGVLZXlTZXR0ZXIoY29tcG9uZW50LCBrZXkpKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlU3RhdGVLZXlTZXR0ZXIoY29tcG9uZW50LCBrZXkpIHtcbiAgLy8gUGFydGlhbCBzdGF0ZSBpcyBhbGxvY2F0ZWQgb3V0c2lkZSBvZiB0aGUgZnVuY3Rpb24gY2xvc3VyZSBzbyBpdCBjYW4gYmVcbiAgLy8gcmV1c2VkIHdpdGggZXZlcnkgY2FsbCwgYXZvaWRpbmcgbWVtb3J5IGFsbG9jYXRpb24gd2hlbiB0aGlzIGZ1bmN0aW9uXG4gIC8vIGlzIGNhbGxlZC5cbiAgdmFyIHBhcnRpYWxTdGF0ZSA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gc3RhdGVLZXlTZXR0ZXIodmFsdWUpIHtcbiAgICBwYXJ0aWFsU3RhdGVba2V5XSA9IHZhbHVlO1xuICAgIGNvbXBvbmVudC5zZXRTdGF0ZShwYXJ0aWFsU3RhdGUpO1xuICB9O1xufVxuXG5SZWFjdFN0YXRlU2V0dGVycy5NaXhpbiA9IHtcbiAgLyoqXG4gICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNhbGxzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiwgYW5kIHVzZXMgdGhlIHJlc3VsdFxuICAgKiBvZiB0aGF0IHRvIHNldCB0aGUgY29tcG9uZW50J3Mgc3RhdGUuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCB0aGVzZSBzdGF0ZW1lbnRzIGFyZSBlcXVpdmFsZW50OlxuICAgKlxuICAgKiAgIHRoaXMuc2V0U3RhdGUoe3g6IDF9KTtcbiAgICogICB0aGlzLmNyZWF0ZVN0YXRlU2V0dGVyKGZ1bmN0aW9uKHhWYWx1ZSkge1xuICAgKiAgICAgcmV0dXJuIHt4OiB4VmFsdWV9O1xuICAgKiAgIH0pKDEpO1xuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jUmV0dXJuaW5nU3RhdGUgUmV0dXJuZWQgY2FsbGJhY2sgdXNlcyB0aGlzIHRvXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRlcm1pbmUgaG93IHRvIHVwZGF0ZSBzdGF0ZS5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259IGNhbGxiYWNrIHRoYXQgd2hlbiBpbnZva2VkIHVzZXMgZnVuY1JldHVybmluZ1N0YXRlIHRvXG4gICAqICAgICAgICAgICAgICAgICAgICBkZXRlcm1pbmVkIHRoZSBvYmplY3QgbGl0ZXJhbCB0byBzZXRTdGF0ZS5cbiAgICovXG4gIGNyZWF0ZVN0YXRlU2V0dGVyOiBmdW5jdGlvbiAoZnVuY1JldHVybmluZ1N0YXRlKSB7XG4gICAgcmV0dXJuIFJlYWN0U3RhdGVTZXR0ZXJzLmNyZWF0ZVN0YXRlU2V0dGVyKHRoaXMsIGZ1bmNSZXR1cm5pbmdTdGF0ZSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzaW5nbGUtYXJndW1lbnQgY2FsbGJhY2sgdGhhdCBjYW4gYmUgdXNlZCB0byB1cGRhdGUgYSBzaW5nbGVcbiAgICoga2V5IGluIHRoZSBjb21wb25lbnQncyBzdGF0ZS5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIHRoZXNlIHN0YXRlbWVudHMgYXJlIGVxdWl2YWxlbnQ6XG4gICAqXG4gICAqICAgdGhpcy5zZXRTdGF0ZSh7eDogMX0pO1xuICAgKiAgIHRoaXMuY3JlYXRlU3RhdGVLZXlTZXR0ZXIoJ3gnKSgxKTtcbiAgICpcbiAgICogTm90ZTogdGhpcyBpcyBtZW1vaXplZCBmdW5jdGlvbiwgd2hpY2ggbWFrZXMgaXQgaW5leHBlbnNpdmUgdG8gY2FsbC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IGluIHRoZSBzdGF0ZSB0aGF0IHlvdSBzaG91bGQgdXBkYXRlLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gY2FsbGJhY2sgb2YgMSBhcmd1bWVudCB3aGljaCBjYWxscyBzZXRTdGF0ZSgpIHdpdGhcbiAgICogICAgICAgICAgICAgICAgICAgIHRoZSBwcm92aWRlZCBrZXlOYW1lIGFuZCBjYWxsYmFjayBhcmd1bWVudC5cbiAgICovXG4gIGNyZWF0ZVN0YXRlS2V5U2V0dGVyOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIFJlYWN0U3RhdGVTZXR0ZXJzLmNyZWF0ZVN0YXRlS2V5U2V0dGVyKHRoaXMsIGtleSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RTdGF0ZVNldHRlcnM7XG59LHt9XSwyNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmxhdHRlbkNoaWxkcmVuID0gX2RlcmVxXygzNSk7XG5cbnZhciBSZWFjdFRyYW5zaXRpb25DaGlsZE1hcHBpbmcgPSB7XG4gIC8qKlxuICAgKiBHaXZlbiBgdGhpcy5wcm9wcy5jaGlsZHJlbmAsIHJldHVybiBhbiBvYmplY3QgbWFwcGluZyBrZXkgdG8gY2hpbGQuIEp1c3RcbiAgICogc2ltcGxlIHN5bnRhY3RpYyBzdWdhciBhcm91bmQgZmxhdHRlbkNoaWxkcmVuKCkuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gY2hpbGRyZW4gYHRoaXMucHJvcHMuY2hpbGRyZW5gXG4gICAqIEBwYXJhbSB7bnVtYmVyPX0gc2VsZkRlYnVnSUQgT3B0aW9uYWwgZGVidWdJRCBvZiB0aGUgY3VycmVudCBpbnRlcm5hbCBpbnN0YW5jZS5cbiAgICogQHJldHVybiB7b2JqZWN0fSBNYXBwaW5nIG9mIGtleSB0byBjaGlsZFxuICAgKi9cbiAgZ2V0Q2hpbGRNYXBwaW5nOiBmdW5jdGlvbiAoY2hpbGRyZW4sIHNlbGZEZWJ1Z0lEKSB7XG4gICAgaWYgKCFjaGlsZHJlbikge1xuICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cblxuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcmV0dXJuIGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbiwgc2VsZkRlYnVnSUQpO1xuICAgIH1cblxuICAgIHJldHVybiBmbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW4pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBXaGVuIHlvdSdyZSBhZGRpbmcgb3IgcmVtb3ZpbmcgY2hpbGRyZW4gc29tZSBtYXkgYmUgYWRkZWQgb3IgcmVtb3ZlZCBpbiB0aGVcbiAgICogc2FtZSByZW5kZXIgcGFzcy4gV2Ugd2FudCB0byBzaG93ICpib3RoKiBzaW5jZSB3ZSB3YW50IHRvIHNpbXVsdGFuZW91c2x5XG4gICAqIGFuaW1hdGUgZWxlbWVudHMgaW4gYW5kIG91dC4gVGhpcyBmdW5jdGlvbiB0YWtlcyBhIHByZXZpb3VzIHNldCBvZiBrZXlzXG4gICAqIGFuZCBhIG5ldyBzZXQgb2Yga2V5cyBhbmQgbWVyZ2VzIHRoZW0gd2l0aCBpdHMgYmVzdCBndWVzcyBvZiB0aGUgY29ycmVjdFxuICAgKiBvcmRlcmluZy4gSW4gdGhlIGZ1dHVyZSB3ZSBtYXkgZXhwb3NlIHNvbWUgb2YgdGhlIHV0aWxpdGllcyBpblxuICAgKiBSZWFjdE11bHRpQ2hpbGQgdG8gbWFrZSB0aGlzIGVhc3ksIGJ1dCBmb3Igbm93IFJlYWN0IGl0c2VsZiBkb2VzIG5vdFxuICAgKiBkaXJlY3RseSBoYXZlIHRoaXMgY29uY2VwdCBvZiB0aGUgdW5pb24gb2YgcHJldkNoaWxkcmVuIGFuZCBuZXh0Q2hpbGRyZW5cbiAgICogc28gd2UgaW1wbGVtZW50IGl0IGhlcmUuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcmV2IHByZXYgY2hpbGRyZW4gYXMgcmV0dXJuZWQgZnJvbVxuICAgKiBgUmVhY3RUcmFuc2l0aW9uQ2hpbGRNYXBwaW5nLmdldENoaWxkTWFwcGluZygpYC5cbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHQgbmV4dCBjaGlsZHJlbiBhcyByZXR1cm5lZCBmcm9tXG4gICAqIGBSZWFjdFRyYW5zaXRpb25DaGlsZE1hcHBpbmcuZ2V0Q2hpbGRNYXBwaW5nKClgLlxuICAgKiBAcmV0dXJuIHtvYmplY3R9IGEga2V5IHNldCB0aGF0IGNvbnRhaW5zIGFsbCBrZXlzIGluIGBwcmV2YCBhbmQgYWxsIGtleXNcbiAgICogaW4gYG5leHRgIGluIGEgcmVhc29uYWJsZSBvcmRlci5cbiAgICovXG4gIG1lcmdlQ2hpbGRNYXBwaW5nczogZnVuY3Rpb24gKHByZXYsIG5leHQpIHtcbiAgICBwcmV2ID0gcHJldiB8fCB7fTtcbiAgICBuZXh0ID0gbmV4dCB8fCB7fTtcblxuICAgIGZ1bmN0aW9uIGdldFZhbHVlRm9yS2V5KGtleSkge1xuICAgICAgaWYgKG5leHQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICByZXR1cm4gbmV4dFtrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByZXZba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGb3IgZWFjaCBrZXkgb2YgYG5leHRgLCB0aGUgbGlzdCBvZiBrZXlzIHRvIGluc2VydCBiZWZvcmUgdGhhdCBrZXkgaW5cbiAgICAvLyB0aGUgY29tYmluZWQgbGlzdFxuICAgIHZhciBuZXh0S2V5c1BlbmRpbmcgPSB7fTtcblxuICAgIHZhciBwZW5kaW5nS2V5cyA9IFtdO1xuICAgIGZvciAodmFyIHByZXZLZXkgaW4gcHJldikge1xuICAgICAgaWYgKG5leHQuaGFzT3duUHJvcGVydHkocHJldktleSkpIHtcbiAgICAgICAgaWYgKHBlbmRpbmdLZXlzLmxlbmd0aCkge1xuICAgICAgICAgIG5leHRLZXlzUGVuZGluZ1twcmV2S2V5XSA9IHBlbmRpbmdLZXlzO1xuICAgICAgICAgIHBlbmRpbmdLZXlzID0gW107XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBlbmRpbmdLZXlzLnB1c2gocHJldktleSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGk7XG4gICAgdmFyIGNoaWxkTWFwcGluZyA9IHt9O1xuICAgIGZvciAodmFyIG5leHRLZXkgaW4gbmV4dCkge1xuICAgICAgaWYgKG5leHRLZXlzUGVuZGluZy5oYXNPd25Qcm9wZXJ0eShuZXh0S2V5KSkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmV4dEtleXNQZW5kaW5nW25leHRLZXldLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHBlbmRpbmdOZXh0S2V5ID0gbmV4dEtleXNQZW5kaW5nW25leHRLZXldW2ldO1xuICAgICAgICAgIGNoaWxkTWFwcGluZ1tuZXh0S2V5c1BlbmRpbmdbbmV4dEtleV1baV1dID0gZ2V0VmFsdWVGb3JLZXkocGVuZGluZ05leHRLZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjaGlsZE1hcHBpbmdbbmV4dEtleV0gPSBnZXRWYWx1ZUZvcktleShuZXh0S2V5KTtcbiAgICB9XG5cbiAgICAvLyBGaW5hbGx5LCBhZGQgdGhlIGtleXMgd2hpY2ggZGlkbid0IGFwcGVhciBiZWZvcmUgYW55IGtleSBpbiBgbmV4dGBcbiAgICBmb3IgKGkgPSAwOyBpIDwgcGVuZGluZ0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkTWFwcGluZ1twZW5kaW5nS2V5c1tpXV0gPSBnZXRWYWx1ZUZvcktleShwZW5kaW5nS2V5c1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkTWFwcGluZztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFRyYW5zaXRpb25DaGlsZE1hcHBpbmc7XG59LHtcIjM1XCI6MzV9XSwyODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSBfZGVyZXFfKDQzKTtcblxudmFyIGdldFZlbmRvclByZWZpeGVkRXZlbnROYW1lID0gX2RlcmVxXygxKTtcblxudmFyIGVuZEV2ZW50cyA9IFtdO1xuXG5mdW5jdGlvbiBkZXRlY3RFdmVudHMoKSB7XG4gIHZhciBhbmltRW5kID0gZ2V0VmVuZG9yUHJlZml4ZWRFdmVudE5hbWUoJ2FuaW1hdGlvbmVuZCcpO1xuICB2YXIgdHJhbnNFbmQgPSBnZXRWZW5kb3JQcmVmaXhlZEV2ZW50TmFtZSgndHJhbnNpdGlvbmVuZCcpO1xuXG4gIGlmIChhbmltRW5kKSB7XG4gICAgZW5kRXZlbnRzLnB1c2goYW5pbUVuZCk7XG4gIH1cblxuICBpZiAodHJhbnNFbmQpIHtcbiAgICBlbmRFdmVudHMucHVzaCh0cmFuc0VuZCk7XG4gIH1cbn1cblxuaWYgKEV4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSkge1xuICBkZXRlY3RFdmVudHMoKTtcbn1cblxuLy8gV2UgdXNlIHRoZSByYXcge2FkZHxyZW1vdmV9RXZlbnRMaXN0ZW5lcigpIGNhbGwgYmVjYXVzZSBFdmVudExpc3RlbmVyXG4vLyBkb2VzIG5vdCBrbm93IGhvdyB0byByZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGFuZCB3ZSByZWFsbHkgc2hvdWxkXG4vLyBjbGVhbiB1cC4gQWxzbywgdGhlc2UgZXZlbnRzIGFyZSBub3QgdHJpZ2dlcmVkIGluIG9sZGVyIGJyb3dzZXJzXG4vLyBzbyB3ZSBzaG91bGQgYmUgQS1PSyBoZXJlLlxuXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKG5vZGUsIGV2ZW50TmFtZSwgZXZlbnRMaXN0ZW5lcikge1xuICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudExpc3RlbmVyLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIobm9kZSwgZXZlbnROYW1lLCBldmVudExpc3RlbmVyKSB7XG4gIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50TGlzdGVuZXIsIGZhbHNlKTtcbn1cblxudmFyIFJlYWN0VHJhbnNpdGlvbkV2ZW50cyA9IHtcbiAgYWRkRW5kRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKG5vZGUsIGV2ZW50TGlzdGVuZXIpIHtcbiAgICBpZiAoZW5kRXZlbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gSWYgQ1NTIHRyYW5zaXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkLCB0cmlnZ2VyIGFuIFwiZW5kIGFuaW1hdGlvblwiXG4gICAgICAvLyBldmVudCBpbW1lZGlhdGVseS5cbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGV2ZW50TGlzdGVuZXIsIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbmRFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZW5kRXZlbnQpIHtcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIobm9kZSwgZW5kRXZlbnQsIGV2ZW50TGlzdGVuZXIpO1xuICAgIH0pO1xuICB9LFxuXG4gIHJlbW92ZUVuZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIChub2RlLCBldmVudExpc3RlbmVyKSB7XG4gICAgaWYgKGVuZEV2ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZW5kRXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGVuZEV2ZW50KSB7XG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyKG5vZGUsIGVuZEV2ZW50LCBldmVudExpc3RlbmVyKTtcbiAgICB9KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFRyYW5zaXRpb25FdmVudHM7XG59LHtcIjFcIjoxLFwiNDNcIjo0M31dLDI5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gX2RlcmVxXyg0OSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFJlYWN0ID0gX2RlcmVxXyg1KTtcbnZhciBSZWFjdFRyYW5zaXRpb25DaGlsZE1hcHBpbmcgPSBfZGVyZXFfKDI3KTtcblxudmFyIGVtcHR5RnVuY3Rpb24gPSBfZGVyZXFfKDQ0KTtcblxuLyoqXG4gKiBBIGJhc2lzIGZvciBhbmltYXRpb25zLiBXaGVuIGNoaWxkcmVuIGFyZSBkZWNsYXJhdGl2ZWx5IGFkZGVkIG9yIHJlbW92ZWQsXG4gKiBzcGVjaWFsIGxpZmVjeWNsZSBob29rcyBhcmUgY2FsbGVkLlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvYW5pbWF0aW9uLmh0bWwjbG93LWxldmVsLWFwaS1yZWFjdHRyYW5zaXRpb25ncm91cFxuICovXG5cbnZhciBSZWFjdFRyYW5zaXRpb25Hcm91cCA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhSZWFjdFRyYW5zaXRpb25Hcm91cCwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gUmVhY3RUcmFuc2l0aW9uR3JvdXAoKSB7XG4gICAgdmFyIF90ZW1wLCBfdGhpcywgX3JldDtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWFjdFRyYW5zaXRpb25Hcm91cCk7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JldCA9IChfdGVtcCA9IChfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9SZWFjdCRDb21wb25lbnQuY2FsbC5hcHBseShfUmVhY3QkQ29tcG9uZW50LCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAvLyBUT0RPOiBjYW4gd2UgZ2V0IHVzZWZ1bCBkZWJ1ZyBpbmZvcm1hdGlvbiB0byBzaG93IGF0IHRoaXMgcG9pbnQ/XG4gICAgICBjaGlsZHJlbjogUmVhY3RUcmFuc2l0aW9uQ2hpbGRNYXBwaW5nLmdldENoaWxkTWFwcGluZyhfdGhpcy5wcm9wcy5jaGlsZHJlbilcbiAgICB9LCBfdGhpcy5wZXJmb3JtQXBwZWFyID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgX3RoaXMuY3VycmVudGx5VHJhbnNpdGlvbmluZ0tleXNba2V5XSA9IHRydWU7XG5cbiAgICAgIHZhciBjb21wb25lbnQgPSBfdGhpcy5yZWZzW2tleV07XG5cbiAgICAgIGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbEFwcGVhcikge1xuICAgICAgICBjb21wb25lbnQuY29tcG9uZW50V2lsbEFwcGVhcihfdGhpcy5faGFuZGxlRG9uZUFwcGVhcmluZy5iaW5kKF90aGlzLCBrZXkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLl9oYW5kbGVEb25lQXBwZWFyaW5nKGtleSk7XG4gICAgICB9XG4gICAgfSwgX3RoaXMuX2hhbmRsZURvbmVBcHBlYXJpbmcgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gX3RoaXMucmVmc1trZXldO1xuICAgICAgaWYgKGNvbXBvbmVudC5jb21wb25lbnREaWRBcHBlYXIpIHtcbiAgICAgICAgY29tcG9uZW50LmNvbXBvbmVudERpZEFwcGVhcigpO1xuICAgICAgfVxuXG4gICAgICBkZWxldGUgX3RoaXMuY3VycmVudGx5VHJhbnNpdGlvbmluZ0tleXNba2V5XTtcblxuICAgICAgdmFyIGN1cnJlbnRDaGlsZE1hcHBpbmcgPSBSZWFjdFRyYW5zaXRpb25DaGlsZE1hcHBpbmcuZ2V0Q2hpbGRNYXBwaW5nKF90aGlzLnByb3BzLmNoaWxkcmVuKTtcblxuICAgICAgaWYgKCFjdXJyZW50Q2hpbGRNYXBwaW5nIHx8ICFjdXJyZW50Q2hpbGRNYXBwaW5nLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgLy8gVGhpcyB3YXMgcmVtb3ZlZCBiZWZvcmUgaXQgaGFkIGZ1bGx5IGFwcGVhcmVkLiBSZW1vdmUgaXQuXG4gICAgICAgIF90aGlzLnBlcmZvcm1MZWF2ZShrZXkpO1xuICAgICAgfVxuICAgIH0sIF90aGlzLnBlcmZvcm1FbnRlciA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIF90aGlzLmN1cnJlbnRseVRyYW5zaXRpb25pbmdLZXlzW2tleV0gPSB0cnVlO1xuXG4gICAgICB2YXIgY29tcG9uZW50ID0gX3RoaXMucmVmc1trZXldO1xuXG4gICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudFdpbGxFbnRlcikge1xuICAgICAgICBjb21wb25lbnQuY29tcG9uZW50V2lsbEVudGVyKF90aGlzLl9oYW5kbGVEb25lRW50ZXJpbmcuYmluZChfdGhpcywga2V5KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5faGFuZGxlRG9uZUVudGVyaW5nKGtleSk7XG4gICAgICB9XG4gICAgfSwgX3RoaXMuX2hhbmRsZURvbmVFbnRlcmluZyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBfdGhpcy5yZWZzW2tleV07XG4gICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudERpZEVudGVyKSB7XG4gICAgICAgIGNvbXBvbmVudC5jb21wb25lbnREaWRFbnRlcigpO1xuICAgICAgfVxuXG4gICAgICBkZWxldGUgX3RoaXMuY3VycmVudGx5VHJhbnNpdGlvbmluZ0tleXNba2V5XTtcblxuICAgICAgdmFyIGN1cnJlbnRDaGlsZE1hcHBpbmcgPSBSZWFjdFRyYW5zaXRpb25DaGlsZE1hcHBpbmcuZ2V0Q2hpbGRNYXBwaW5nKF90aGlzLnByb3BzLmNoaWxkcmVuKTtcblxuICAgICAgaWYgKCFjdXJyZW50Q2hpbGRNYXBwaW5nIHx8ICFjdXJyZW50Q2hpbGRNYXBwaW5nLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgLy8gVGhpcyB3YXMgcmVtb3ZlZCBiZWZvcmUgaXQgaGFkIGZ1bGx5IGVudGVyZWQuIFJlbW92ZSBpdC5cbiAgICAgICAgX3RoaXMucGVyZm9ybUxlYXZlKGtleSk7XG4gICAgICB9XG4gICAgfSwgX3RoaXMucGVyZm9ybUxlYXZlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgX3RoaXMuY3VycmVudGx5VHJhbnNpdGlvbmluZ0tleXNba2V5XSA9IHRydWU7XG5cbiAgICAgIHZhciBjb21wb25lbnQgPSBfdGhpcy5yZWZzW2tleV07XG4gICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudFdpbGxMZWF2ZSkge1xuICAgICAgICBjb21wb25lbnQuY29tcG9uZW50V2lsbExlYXZlKF90aGlzLl9oYW5kbGVEb25lTGVhdmluZy5iaW5kKF90aGlzLCBrZXkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIGlzIHNvbWV3aGF0IGRhbmdlcm91cyBiL2MgaXQgY2FsbHMgc2V0U3RhdGUoKVxuICAgICAgICAvLyBhZ2FpbiwgZWZmZWN0aXZlbHkgbXV0YXRpbmcgdGhlIGNvbXBvbmVudCBiZWZvcmUgYWxsIHRoZSB3b3JrXG4gICAgICAgIC8vIGlzIGRvbmUuXG4gICAgICAgIF90aGlzLl9oYW5kbGVEb25lTGVhdmluZyhrZXkpO1xuICAgICAgfVxuICAgIH0sIF90aGlzLl9oYW5kbGVEb25lTGVhdmluZyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBfdGhpcy5yZWZzW2tleV07XG5cbiAgICAgIGlmIChjb21wb25lbnQuY29tcG9uZW50RGlkTGVhdmUpIHtcbiAgICAgICAgY29tcG9uZW50LmNvbXBvbmVudERpZExlYXZlKCk7XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSBfdGhpcy5jdXJyZW50bHlUcmFuc2l0aW9uaW5nS2V5c1trZXldO1xuXG4gICAgICB2YXIgY3VycmVudENoaWxkTWFwcGluZyA9IFJlYWN0VHJhbnNpdGlvbkNoaWxkTWFwcGluZy5nZXRDaGlsZE1hcHBpbmcoX3RoaXMucHJvcHMuY2hpbGRyZW4pO1xuXG4gICAgICBpZiAoY3VycmVudENoaWxkTWFwcGluZyAmJiBjdXJyZW50Q2hpbGRNYXBwaW5nLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgLy8gVGhpcyBlbnRlcmVkIGFnYWluIGJlZm9yZSBpdCBmdWxseSBsZWZ0LiBBZGQgaXQgYWdhaW4uXG4gICAgICAgIF90aGlzLnBlcmZvcm1FbnRlcihrZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgdmFyIG5ld0NoaWxkcmVuID0gX2Fzc2lnbih7fSwgc3RhdGUuY2hpbGRyZW4pO1xuICAgICAgICAgIGRlbGV0ZSBuZXdDaGlsZHJlbltrZXldO1xuICAgICAgICAgIHJldHVybiB7IGNoaWxkcmVuOiBuZXdDaGlsZHJlbiB9O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCBfdGVtcCksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgfVxuXG4gIFJlYWN0VHJhbnNpdGlvbkdyb3VwLnByb3RvdHlwZS5jb21wb25lbnRXaWxsTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5jdXJyZW50bHlUcmFuc2l0aW9uaW5nS2V5cyA9IHt9O1xuICAgIHRoaXMua2V5c1RvRW50ZXIgPSBbXTtcbiAgICB0aGlzLmtleXNUb0xlYXZlID0gW107XG4gIH07XG5cbiAgUmVhY3RUcmFuc2l0aW9uR3JvdXAucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdmFyIGluaXRpYWxDaGlsZE1hcHBpbmcgPSB0aGlzLnN0YXRlLmNoaWxkcmVuO1xuICAgIGZvciAodmFyIGtleSBpbiBpbml0aWFsQ2hpbGRNYXBwaW5nKSB7XG4gICAgICBpZiAoaW5pdGlhbENoaWxkTWFwcGluZ1trZXldKSB7XG4gICAgICAgIHRoaXMucGVyZm9ybUFwcGVhcihrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBSZWFjdFRyYW5zaXRpb25Hcm91cC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdmFyIG5leHRDaGlsZE1hcHBpbmcgPSBSZWFjdFRyYW5zaXRpb25DaGlsZE1hcHBpbmcuZ2V0Q2hpbGRNYXBwaW5nKG5leHRQcm9wcy5jaGlsZHJlbik7XG4gICAgdmFyIHByZXZDaGlsZE1hcHBpbmcgPSB0aGlzLnN0YXRlLmNoaWxkcmVuO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjaGlsZHJlbjogUmVhY3RUcmFuc2l0aW9uQ2hpbGRNYXBwaW5nLm1lcmdlQ2hpbGRNYXBwaW5ncyhwcmV2Q2hpbGRNYXBwaW5nLCBuZXh0Q2hpbGRNYXBwaW5nKVxuICAgIH0pO1xuXG4gICAgdmFyIGtleTtcblxuICAgIGZvciAoa2V5IGluIG5leHRDaGlsZE1hcHBpbmcpIHtcbiAgICAgIHZhciBoYXNQcmV2ID0gcHJldkNoaWxkTWFwcGluZyAmJiBwcmV2Q2hpbGRNYXBwaW5nLmhhc093blByb3BlcnR5KGtleSk7XG4gICAgICBpZiAobmV4dENoaWxkTWFwcGluZ1trZXldICYmICFoYXNQcmV2ICYmICF0aGlzLmN1cnJlbnRseVRyYW5zaXRpb25pbmdLZXlzW2tleV0pIHtcbiAgICAgICAgdGhpcy5rZXlzVG9FbnRlci5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChrZXkgaW4gcHJldkNoaWxkTWFwcGluZykge1xuICAgICAgdmFyIGhhc05leHQgPSBuZXh0Q2hpbGRNYXBwaW5nICYmIG5leHRDaGlsZE1hcHBpbmcuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgICAgIGlmIChwcmV2Q2hpbGRNYXBwaW5nW2tleV0gJiYgIWhhc05leHQgJiYgIXRoaXMuY3VycmVudGx5VHJhbnNpdGlvbmluZ0tleXNba2V5XSkge1xuICAgICAgICB0aGlzLmtleXNUb0xlYXZlLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB3ZSB3YW50IHRvIHNvbWVkYXkgY2hlY2sgZm9yIHJlb3JkZXJpbmcsIHdlIGNvdWxkIGRvIGl0IGhlcmUuXG4gIH07XG5cbiAgUmVhY3RUcmFuc2l0aW9uR3JvdXAucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB2YXIga2V5c1RvRW50ZXIgPSB0aGlzLmtleXNUb0VudGVyO1xuICAgIHRoaXMua2V5c1RvRW50ZXIgPSBbXTtcbiAgICBrZXlzVG9FbnRlci5mb3JFYWNoKHRoaXMucGVyZm9ybUVudGVyKTtcblxuICAgIHZhciBrZXlzVG9MZWF2ZSA9IHRoaXMua2V5c1RvTGVhdmU7XG4gICAgdGhpcy5rZXlzVG9MZWF2ZSA9IFtdO1xuICAgIGtleXNUb0xlYXZlLmZvckVhY2godGhpcy5wZXJmb3JtTGVhdmUpO1xuICB9O1xuXG4gIFJlYWN0VHJhbnNpdGlvbkdyb3VwLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgLy8gVE9ETzogd2UgY291bGQgZ2V0IHJpZCBvZiB0aGUgbmVlZCBmb3IgdGhlIHdyYXBwZXIgbm9kZVxuICAgIC8vIGJ5IGNsb25pbmcgYSBzaW5nbGUgY2hpbGRcbiAgICB2YXIgY2hpbGRyZW5Ub1JlbmRlciA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnN0YXRlLmNoaWxkcmVuKSB7XG4gICAgICB2YXIgY2hpbGQgPSB0aGlzLnN0YXRlLmNoaWxkcmVuW2tleV07XG4gICAgICBpZiAoY2hpbGQpIHtcbiAgICAgICAgLy8gWW91IG1heSBuZWVkIHRvIGFwcGx5IHJlYWN0aXZlIHVwZGF0ZXMgdG8gYSBjaGlsZCBhcyBpdCBpcyBsZWF2aW5nLlxuICAgICAgICAvLyBUaGUgbm9ybWFsIFJlYWN0IHdheSB0byBkbyBpdCB3b24ndCB3b3JrIHNpbmNlIHRoZSBjaGlsZCB3aWxsIGhhdmVcbiAgICAgICAgLy8gYWxyZWFkeSBiZWVuIHJlbW92ZWQuIEluIGNhc2UgeW91IG5lZWQgdGhpcyBiZWhhdmlvciB5b3UgY2FuIHByb3ZpZGVcbiAgICAgICAgLy8gYSBjaGlsZEZhY3RvcnkgZnVuY3Rpb24gdG8gd3JhcCBldmVyeSBjaGlsZCwgZXZlbiB0aGUgb25lcyB0aGF0IGFyZVxuICAgICAgICAvLyBsZWF2aW5nLlxuICAgICAgICBjaGlsZHJlblRvUmVuZGVyLnB1c2goUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRGYWN0b3J5KGNoaWxkKSwgeyByZWY6IGtleSwga2V5OiBrZXkgfSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERvIG5vdCBmb3J3YXJkIFJlYWN0VHJhbnNpdGlvbkdyb3VwIHByb3BzIHRvIHByaW1pdGl2ZSBET00gbm9kZXNcbiAgICB2YXIgcHJvcHMgPSBfYXNzaWduKHt9LCB0aGlzLnByb3BzKTtcbiAgICBkZWxldGUgcHJvcHMudHJhbnNpdGlvbkxlYXZlO1xuICAgIGRlbGV0ZSBwcm9wcy50cmFuc2l0aW9uTmFtZTtcbiAgICBkZWxldGUgcHJvcHMudHJhbnNpdGlvbkFwcGVhcjtcbiAgICBkZWxldGUgcHJvcHMudHJhbnNpdGlvbkVudGVyO1xuICAgIGRlbGV0ZSBwcm9wcy5jaGlsZEZhY3Rvcnk7XG4gICAgZGVsZXRlIHByb3BzLnRyYW5zaXRpb25MZWF2ZVRpbWVvdXQ7XG4gICAgZGVsZXRlIHByb3BzLnRyYW5zaXRpb25FbnRlclRpbWVvdXQ7XG4gICAgZGVsZXRlIHByb3BzLnRyYW5zaXRpb25BcHBlYXJUaW1lb3V0O1xuICAgIGRlbGV0ZSBwcm9wcy5jb21wb25lbnQ7XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLmNvbXBvbmVudCwgcHJvcHMsIGNoaWxkcmVuVG9SZW5kZXIpO1xuICB9O1xuXG4gIHJldHVybiBSZWFjdFRyYW5zaXRpb25Hcm91cDtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuUmVhY3RUcmFuc2l0aW9uR3JvdXAuZGlzcGxheU5hbWUgPSAnUmVhY3RUcmFuc2l0aW9uR3JvdXAnO1xuUmVhY3RUcmFuc2l0aW9uR3JvdXAucHJvcFR5cGVzID0ge1xuICBjb21wb25lbnQ6IFJlYWN0LlByb3BUeXBlcy5hbnksXG4gIGNoaWxkRmFjdG9yeTogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbn07XG5SZWFjdFRyYW5zaXRpb25Hcm91cC5kZWZhdWx0UHJvcHMgPSB7XG4gIGNvbXBvbmVudDogJ3NwYW4nLFxuICBjaGlsZEZhY3Rvcnk6IGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudFxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0VHJhbnNpdGlvbkdyb3VwO1xufSx7XCIyN1wiOjI3LFwiNDRcIjo0NCxcIjQ5XCI6NDksXCI1XCI6NX1dLDMwOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gJzE1LjQuMic7XG59LHt9XSwzMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGlua2VkU3RhdGVNaXhpbiA9IF9kZXJlcV8oMyk7XG52YXIgUmVhY3QgPSBfZGVyZXFfKDUpO1xudmFyIFJlYWN0QWRkb25zRE9NRGVwZW5kZW5jaWVzID0gX2RlcmVxXyg2KTtcbnZhciBSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4gPSBfZGVyZXFfKDEzKTtcbnZhciBSZWFjdENTU1RyYW5zaXRpb25Hcm91cCA9IF9kZXJlcV8oNyk7XG52YXIgUmVhY3RGcmFnbWVudCA9IF9kZXJlcV8oMTkpO1xudmFyIFJlYWN0VHJhbnNpdGlvbkdyb3VwID0gX2RlcmVxXygyOSk7XG5cbnZhciBzaGFsbG93Q29tcGFyZSA9IF9kZXJlcV8oMzkpO1xudmFyIHVwZGF0ZSA9IF9kZXJlcV8oNDEpO1xuXG5SZWFjdC5hZGRvbnMgPSB7XG4gIENTU1RyYW5zaXRpb25Hcm91cDogUmVhY3RDU1NUcmFuc2l0aW9uR3JvdXAsXG4gIExpbmtlZFN0YXRlTWl4aW46IExpbmtlZFN0YXRlTWl4aW4sXG4gIFB1cmVSZW5kZXJNaXhpbjogUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluLFxuICBUcmFuc2l0aW9uR3JvdXA6IFJlYWN0VHJhbnNpdGlvbkdyb3VwLFxuXG4gIGNyZWF0ZUZyYWdtZW50OiBSZWFjdEZyYWdtZW50LmNyZWF0ZSxcbiAgc2hhbGxvd0NvbXBhcmU6IHNoYWxsb3dDb21wYXJlLFxuICB1cGRhdGU6IHVwZGF0ZVxufTtcblxuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIC8vIEZvciB0aGUgVU1EIGJ1aWxkIHdlIGdldCB0aGVzZSBsYXppbHkgZnJvbSB0aGUgZ2xvYmFsIHNpbmNlIHRoZXkncmUgdGllZFxuICAvLyB0byB0aGUgRE9NIHJlbmRlcmVyIGFuZCBpdCBoYXNuJ3QgbG9hZGVkIHlldC5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWN0LmFkZG9ucywgJ1BlcmYnLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBSZWFjdEFkZG9uc0RPTURlcGVuZGVuY2llcy5nZXRSZWFjdFBlcmYoKTtcbiAgICB9XG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhY3QuYWRkb25zLCAnVGVzdFV0aWxzJywge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gUmVhY3RBZGRvbnNET01EZXBlbmRlbmNpZXMuZ2V0UmVhY3RUZXN0VXRpbHMoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xufSx7XCIxM1wiOjEzLFwiMTlcIjoxOSxcIjI5XCI6MjksXCIzXCI6MyxcIjM5XCI6MzksXCI0MVwiOjQxLFwiNVwiOjUsXCI2XCI6NixcIjdcIjo3fV0sMzI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSBfZGVyZXFfKDQ5KTtcblxudmFyIFJlYWN0V2l0aEFkZG9ucyA9IF9kZXJlcV8oMzEpO1xuXG4vLyBgdmVyc2lvbmAgd2lsbCBiZSBhZGRlZCBoZXJlIGJ5IHRoZSBSZWFjdCBtb2R1bGUuXG52YXIgUmVhY3RXaXRoQWRkb25zVU1ERW50cnkgPSBfYXNzaWduKHtcbiAgX19TRUNSRVRfSU5KRUNURURfUkVBQ1RfRE9NX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ6IG51bGwsIC8vIFdpbGwgYmUgaW5qZWN0ZWQgYnkgUmVhY3RET00gVU1EIGJ1aWxkLlxuICBfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDoge1xuICAgIFJlYWN0Q3VycmVudE93bmVyOiBfZGVyZXFfKDE0KVxuICB9XG59LCBSZWFjdFdpdGhBZGRvbnMpO1xuXG5pZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgX2Fzc2lnbihSZWFjdFdpdGhBZGRvbnNVTURFbnRyeS5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCwge1xuICAgIC8vIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgc2hvdWxkIG5vdCBiZSBpbmNsdWRlZCBpbiBwcm9kdWN0aW9uLlxuICAgIFJlYWN0Q29tcG9uZW50VHJlZUhvb2s6IF9kZXJlcV8oMTIpXG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0V2l0aEFkZG9uc1VNREVudHJ5O1xufSx7XCIxMlwiOjEyLFwiMTRcIjoxNCxcIjMxXCI6MzEsXCI0OVwiOjQ5fV0sMzM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSBmYWxzZTtcbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICB0cnkge1xuICAgIC8vICRGbG93Rml4TWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzI4NVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3gnLCB7IGdldDogZnVuY3Rpb24gKCkge30gfSk7XG4gICAgY2FuRGVmaW5lUHJvcGVydHkgPSB0cnVlO1xuICB9IGNhdGNoICh4KSB7XG4gICAgLy8gSUUgd2lsbCBmYWlsIG9uIGRlZmluZVByb3BlcnR5XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYW5EZWZpbmVQcm9wZXJ0eTtcbn0se31dLDM0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAocHJvY2Vzcyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSBfZGVyZXFfKDM4KTtcblxudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gX2RlcmVxXygyMik7XG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSBfZGVyZXFfKDI0KTtcblxudmFyIGludmFyaWFudCA9IF9kZXJlcV8oNDYpO1xudmFyIHdhcm5pbmcgPSBfZGVyZXFfKDQ4KTtcblxudmFyIFJlYWN0Q29tcG9uZW50VHJlZUhvb2s7XG5cbmlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnYgJiYgXCJkZXZlbG9wbWVudFwiID09PSAndGVzdCcpIHtcbiAgLy8gVGVtcG9yYXJ5IGhhY2suXG4gIC8vIElubGluZSByZXF1aXJlcyBkb24ndCB3b3JrIHdlbGwgd2l0aCBKZXN0OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzcyNDBcbiAgLy8gUmVtb3ZlIHRoZSBpbmxpbmUgcmVxdWlyZXMgd2hlbiB3ZSBkb24ndCBuZWVkIHRoZW0gYW55bW9yZTpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvNzE3OFxuICBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gX2RlcmVxXygxMik7XG59XG5cbnZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/b2JqZWN0fSBlbGVtZW50IFRoZSBSZWFjdCBlbGVtZW50IHRoYXQgaXMgYmVpbmcgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0gez9udW1iZXJ9IGRlYnVnSUQgVGhlIFJlYWN0IGNvbXBvbmVudCBpbnN0YW5jZSB0aGF0IGlzIGJlaW5nIHR5cGUtY2hlY2tlZFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tSZWFjdFR5cGVTcGVjKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZWxlbWVudCwgZGVidWdJRCkge1xuICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICB2YXIgZXJyb3I7XG4gICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgISh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gPT09ICdmdW5jdGlvbicpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIFJlYWN0LlByb3BUeXBlcy4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgdHlwZVNwZWNOYW1lKSA6IF9wcm9kSW52YXJpYW50KCc4NCcsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCB0eXBlU3BlY05hbWUpIDogdm9pZCAwO1xuICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgIH1cbiAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghZXJyb3IgfHwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciwgJyVzOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJXMgYCVzYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgKyAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJXMuICcgKyAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgKyAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCB0eXBlU3BlY05hbWUsIHR5cGVvZiBlcnJvcikgOiB2b2lkIDA7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICB2YXIgY29tcG9uZW50U3RhY2tJbmZvID0gJyc7XG5cbiAgICAgICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgaWYgKCFSZWFjdENvbXBvbmVudFRyZWVIb29rKSB7XG4gICAgICAgICAgICBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gX2RlcmVxXygxMik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkZWJ1Z0lEICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb21wb25lbnRTdGFja0luZm8gPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFN0YWNrQWRkZW5kdW1CeUlEKGRlYnVnSUQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29tcG9uZW50U3RhY2tJbmZvID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRDdXJyZW50U3RhY2tBZGRlbmR1bShlbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgJXMgdHlwZTogJXMlcycsIGxvY2F0aW9uLCBlcnJvci5tZXNzYWdlLCBjb21wb25lbnRTdGFja0luZm8pIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUmVhY3RUeXBlU3BlYztcbn0pLmNhbGwodGhpcyx1bmRlZmluZWQpXG59LHtcIjEyXCI6MTIsXCIyMlwiOjIyLFwiMjRcIjoyNCxcIjM4XCI6MzgsXCI0NlwiOjQ2LFwiNDhcIjo0OH1dLDM1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAocHJvY2Vzcyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBLZXlFc2NhcGVVdGlscyA9IF9kZXJlcV8oMik7XG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IF9kZXJlcV8oNDApO1xudmFyIHdhcm5pbmcgPSBfZGVyZXFfKDQ4KTtcblxudmFyIFJlYWN0Q29tcG9uZW50VHJlZUhvb2s7XG5cbmlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnYgJiYgXCJkZXZlbG9wbWVudFwiID09PSAndGVzdCcpIHtcbiAgLy8gVGVtcG9yYXJ5IGhhY2suXG4gIC8vIElubGluZSByZXF1aXJlcyBkb24ndCB3b3JrIHdlbGwgd2l0aCBKZXN0OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzcyNDBcbiAgLy8gUmVtb3ZlIHRoZSBpbmxpbmUgcmVxdWlyZXMgd2hlbiB3ZSBkb24ndCBuZWVkIHRoZW0gYW55bW9yZTpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvNzE3OFxuICBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gX2RlcmVxXygxMik7XG59XG5cbi8qKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHJhdmVyc2VDb250ZXh0IENvbnRleHQgcGFzc2VkIHRocm91Z2ggdHJhdmVyc2FsLlxuICogQHBhcmFtIHs/UmVhY3RDb21wb25lbnR9IGNoaWxkIFJlYWN0IGNoaWxkIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZSBTdHJpbmcgbmFtZSBvZiBrZXkgcGF0aCB0byBjaGlsZC5cbiAqIEBwYXJhbSB7bnVtYmVyPX0gc2VsZkRlYnVnSUQgT3B0aW9uYWwgZGVidWdJRCBvZiB0aGUgY3VycmVudCBpbnRlcm5hbCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gZmxhdHRlblNpbmdsZUNoaWxkSW50b0NvbnRleHQodHJhdmVyc2VDb250ZXh0LCBjaGlsZCwgbmFtZSwgc2VsZkRlYnVnSUQpIHtcbiAgLy8gV2UgZm91bmQgYSBjb21wb25lbnQgaW5zdGFuY2UuXG4gIGlmICh0cmF2ZXJzZUNvbnRleHQgJiYgdHlwZW9mIHRyYXZlcnNlQ29udGV4dCA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgcmVzdWx0ID0gdHJhdmVyc2VDb250ZXh0O1xuICAgIHZhciBrZXlVbmlxdWUgPSByZXN1bHRbbmFtZV0gPT09IHVuZGVmaW5lZDtcbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICghUmVhY3RDb21wb25lbnRUcmVlSG9vaykge1xuICAgICAgICBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gX2RlcmVxXygxMik7XG4gICAgICB9XG4gICAgICBpZiAoIWtleVVuaXF1ZSkge1xuICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdmbGF0dGVuQ2hpbGRyZW4oLi4uKTogRW5jb3VudGVyZWQgdHdvIGNoaWxkcmVuIHdpdGggdGhlIHNhbWUga2V5LCAnICsgJ2Alc2AuIENoaWxkIGtleXMgbXVzdCBiZSB1bmlxdWU7IHdoZW4gdHdvIGNoaWxkcmVuIHNoYXJlIGEga2V5LCBvbmx5ICcgKyAndGhlIGZpcnN0IGNoaWxkIHdpbGwgYmUgdXNlZC4lcycsIEtleUVzY2FwZVV0aWxzLnVuZXNjYXBlKG5hbWUpLCBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFN0YWNrQWRkZW5kdW1CeUlEKHNlbGZEZWJ1Z0lEKSkgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChrZXlVbmlxdWUgJiYgY2hpbGQgIT0gbnVsbCkge1xuICAgICAgcmVzdWx0W25hbWVdID0gY2hpbGQ7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRmxhdHRlbnMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLiBBbnkgbnVsbFxuICogY2hpbGRyZW4gd2lsbCBub3QgYmUgaW5jbHVkZWQgaW4gdGhlIHJlc3VsdGluZyBvYmplY3QuXG4gKiBAcmV0dXJuIHshb2JqZWN0fSBmbGF0dGVuZWQgY2hpbGRyZW4ga2V5ZWQgYnkgbmFtZS5cbiAqL1xuZnVuY3Rpb24gZmxhdHRlbkNoaWxkcmVuKGNoaWxkcmVuLCBzZWxmRGVidWdJRCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgcmVzdWx0ID0ge307XG5cbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZnVuY3Rpb24gKHRyYXZlcnNlQ29udGV4dCwgY2hpbGQsIG5hbWUpIHtcbiAgICAgIHJldHVybiBmbGF0dGVuU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkLCBuYW1lLCBzZWxmRGVidWdJRCk7XG4gICAgfSwgcmVzdWx0KTtcbiAgfSBlbHNlIHtcbiAgICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmbGF0dGVuU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCwgcmVzdWx0KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW5DaGlsZHJlbjtcbn0pLmNhbGwodGhpcyx1bmRlZmluZWQpXG59LHtcIjEyXCI6MTIsXCIyXCI6MixcIjQwXCI6NDAsXCI0OFwiOjQ4fV0sMzY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKiBnbG9iYWwgU3ltYm9sICovXG5cbnZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbnZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4vKipcbiAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAqXG4gKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAqXG4gKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gKiAgICAgICAuLi5cbiAqICAgICB9XG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEl0ZXJhdG9yRm47XG59LHt9XSwzNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gX2RlcmVxXygzOCk7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSBfZGVyZXFfKDE2KTtcblxudmFyIGludmFyaWFudCA9IF9kZXJlcV8oNDYpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGNoaWxkIGluIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiBhbmQgdmVyaWZpZXMgdGhhdCB0aGVyZVxuICogaXMgb25seSBvbmUgY2hpbGQgaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLm9ubHlcbiAqXG4gKiBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBhIHNpbmdsZSBjaGlsZCBnZXRzXG4gKiBwYXNzZWQgd2l0aG91dCBhIHdyYXBwZXIsIGJ1dCB0aGUgcHVycG9zZSBvZiB0aGlzIGhlbHBlciBmdW5jdGlvbiBpcyB0b1xuICogYWJzdHJhY3QgYXdheSB0aGUgcGFydGljdWxhciBzdHJ1Y3R1cmUgb2YgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBjaGlsZHJlbiBDaGlsZCBjb2xsZWN0aW9uIHN0cnVjdHVyZS5cbiAqIEByZXR1cm4ge1JlYWN0RWxlbWVudH0gVGhlIGZpcnN0IGFuZCBvbmx5IGBSZWFjdEVsZW1lbnRgIGNvbnRhaW5lZCBpbiB0aGVcbiAqIHN0cnVjdHVyZS5cbiAqL1xuZnVuY3Rpb24gb25seUNoaWxkKGNoaWxkcmVuKSB7XG4gICFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdC5DaGlsZHJlbi5vbmx5IGV4cGVjdGVkIHRvIHJlY2VpdmUgYSBzaW5nbGUgUmVhY3QgZWxlbWVudCBjaGlsZC4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDMnKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9ubHlDaGlsZDtcbn0se1wiMTZcIjoxNixcIjM4XCI6MzgsXCI0NlwiOjQ2fV0sMzg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogV0FSTklORzogRE8gTk9UIG1hbnVhbGx5IHJlcXVpcmUgdGhpcyBtb2R1bGUuXG4gKiBUaGlzIGlzIGEgcmVwbGFjZW1lbnQgZm9yIGBpbnZhcmlhbnQoLi4uKWAgdXNlZCBieSB0aGUgZXJyb3IgY29kZSBzeXN0ZW1cbiAqIGFuZCB3aWxsIF9vbmx5XyBiZSByZXF1aXJlZCBieSB0aGUgY29ycmVzcG9uZGluZyBiYWJlbCBwYXNzLlxuICogSXQgYWx3YXlzIHRocm93cy5cbiAqL1xuXG5mdW5jdGlvbiByZWFjdFByb2RJbnZhcmlhbnQoY29kZSkge1xuICB2YXIgYXJnQ291bnQgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcblxuICB2YXIgbWVzc2FnZSA9ICdNaW5pZmllZCBSZWFjdCBlcnJvciAjJyArIGNvZGUgKyAnOyB2aXNpdCAnICsgJ2h0dHA6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9lcnJvci1kZWNvZGVyLmh0bWw/aW52YXJpYW50PScgKyBjb2RlO1xuXG4gIGZvciAodmFyIGFyZ0lkeCA9IDA7IGFyZ0lkeCA8IGFyZ0NvdW50OyBhcmdJZHgrKykge1xuICAgIG1lc3NhZ2UgKz0gJyZhcmdzW109JyArIGVuY29kZVVSSUNvbXBvbmVudChhcmd1bWVudHNbYXJnSWR4ICsgMV0pO1xuICB9XG5cbiAgbWVzc2FnZSArPSAnIGZvciB0aGUgZnVsbCBtZXNzYWdlIG9yIHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCcgKyAnIGZvciBmdWxsIGVycm9ycyBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLic7XG5cbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgcmVhY3RQcm9kSW52YXJpYW50J3Mgb3duIGZyYW1lXG5cbiAgdGhyb3cgZXJyb3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVhY3RQcm9kSW52YXJpYW50O1xufSx7fV0sMzk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHNoYWxsb3dFcXVhbCA9IF9kZXJlcV8oNDcpO1xuXG4vKipcbiAqIERvZXMgYSBzaGFsbG93IGNvbXBhcmlzb24gZm9yIHByb3BzIGFuZCBzdGF0ZS5cbiAqIFNlZSBSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW5cbiAqIFNlZSBhbHNvIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3Mvc2hhbGxvdy1jb21wYXJlLmh0bWxcbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0NvbXBhcmUoaW5zdGFuY2UsIG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gIHJldHVybiAhc2hhbGxvd0VxdWFsKGluc3RhbmNlLnByb3BzLCBuZXh0UHJvcHMpIHx8ICFzaGFsbG93RXF1YWwoaW5zdGFuY2Uuc3RhdGUsIG5leHRTdGF0ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hhbGxvd0NvbXBhcmU7XG59LHtcIjQ3XCI6NDd9XSw0MDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSBfZGVyZXFfKDM4KTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gX2RlcmVxXygxNCk7XG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gX2RlcmVxXygxNyk7XG5cbnZhciBnZXRJdGVyYXRvckZuID0gX2RlcmVxXygzNik7XG52YXIgaW52YXJpYW50ID0gX2RlcmVxXyg0Nik7XG52YXIgS2V5RXNjYXBlVXRpbHMgPSBfZGVyZXFfKDIpO1xudmFyIHdhcm5pbmcgPSBfZGVyZXFfKDQ4KTtcblxudmFyIFNFUEFSQVRPUiA9ICcuJztcbnZhciBTVUJTRVBBUkFUT1IgPSAnOic7XG5cbi8qKlxuICogVGhpcyBpcyBpbmxpbmVkIGZyb20gUmVhY3RFbGVtZW50IHNpbmNlIHRoaXMgZmlsZSBpcyBzaGFyZWQgYmV0d2VlblxuICogaXNvbW9ycGhpYyBhbmQgcmVuZGVyZXJzLiBXZSBjb3VsZCBleHRyYWN0IHRoaXMgdG8gYVxuICpcbiAqL1xuXG4vKipcbiAqIFRPRE86IFRlc3QgdGhhdCBhIHNpbmdsZSBjaGlsZCBhbmQgYW4gYXJyYXkgd2l0aCBvbmUgaXRlbSBoYXZlIHRoZSBzYW1lIGtleVxuICogcGF0dGVybi5cbiAqL1xuXG52YXIgZGlkV2FybkFib3V0TWFwcyA9IGZhbHNlO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEga2V5IHN0cmluZyB0aGF0IGlkZW50aWZpZXMgYSBjb21wb25lbnQgd2l0aGluIGEgc2V0LlxuICpcbiAqIEBwYXJhbSB7Kn0gY29tcG9uZW50IEEgY29tcG9uZW50IHRoYXQgY291bGQgY29udGFpbiBhIG1hbnVhbCBrZXkuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggdGhhdCBpcyB1c2VkIGlmIGEgbWFudWFsIGtleSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudEtleShjb21wb25lbnQsIGluZGV4KSB7XG4gIC8vIERvIHNvbWUgdHlwZWNoZWNraW5nIGhlcmUgc2luY2Ugd2UgY2FsbCB0aGlzIGJsaW5kbHkuIFdlIHdhbnQgdG8gZW5zdXJlXG4gIC8vIHRoYXQgd2UgZG9uJ3QgYmxvY2sgcG90ZW50aWFsIGZ1dHVyZSBFUyBBUElzLlxuICBpZiAoY29tcG9uZW50ICYmIHR5cGVvZiBjb21wb25lbnQgPT09ICdvYmplY3QnICYmIGNvbXBvbmVudC5rZXkgIT0gbnVsbCkge1xuICAgIC8vIEV4cGxpY2l0IGtleVxuICAgIHJldHVybiBLZXlFc2NhcGVVdGlscy5lc2NhcGUoY29tcG9uZW50LmtleSk7XG4gIH1cbiAgLy8gSW1wbGljaXQga2V5IGRldGVybWluZWQgYnkgdGhlIGluZGV4IGluIHRoZSBzZXRcbiAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZVNvRmFyIE5hbWUgb2YgdGhlIGtleSBwYXRoIHNvIGZhci5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBpbnZva2Ugd2l0aCBlYWNoIGNoaWxkIGZvdW5kLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IFVzZWQgdG8gcGFzcyBpbmZvcm1hdGlvbiB0aHJvdWdob3V0IHRoZSB0cmF2ZXJzYWxcbiAqIHByb2Nlc3MuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sIG5hbWVTb0ZhciwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBjaGlsZHJlbjtcblxuICBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgLy8gQWxsIG9mIHRoZSBhYm92ZSBhcmUgcGVyY2VpdmVkIGFzIG51bGwuXG4gICAgY2hpbGRyZW4gPSBudWxsO1xuICB9XG5cbiAgaWYgKGNoaWxkcmVuID09PSBudWxsIHx8IHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8XG4gIC8vIFRoZSBmb2xsb3dpbmcgaXMgaW5saW5lZCBmcm9tIFJlYWN0RWxlbWVudC4gVGhpcyBtZWFucyB3ZSBjYW4gb3B0aW1pemVcbiAgLy8gc29tZSBjaGVja3MuIFJlYWN0IEZpYmVyIGFsc28gaW5saW5lcyB0aGlzIGxvZ2ljIGZvciBzaW1pbGFyIHB1cnBvc2VzLlxuICB0eXBlID09PSAnb2JqZWN0JyAmJiBjaGlsZHJlbi4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgY2FsbGJhY2sodHJhdmVyc2VDb250ZXh0LCBjaGlsZHJlbixcbiAgICAvLyBJZiBpdCdzIHRoZSBvbmx5IGNoaWxkLCB0cmVhdCB0aGUgbmFtZSBhcyBpZiBpdCB3YXMgd3JhcHBlZCBpbiBhbiBhcnJheVxuICAgIC8vIHNvIHRoYXQgaXQncyBjb25zaXN0ZW50IGlmIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gZ3Jvd3MuXG4gICAgbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiArIGdldENvbXBvbmVudEtleShjaGlsZHJlbiwgMCkgOiBuYW1lU29GYXIpO1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgdmFyIGNoaWxkO1xuICB2YXIgbmV4dE5hbWU7XG4gIHZhciBzdWJ0cmVlQ291bnQgPSAwOyAvLyBDb3VudCBvZiBjaGlsZHJlbiBmb3VuZCBpbiB0aGUgY3VycmVudCBzdWJ0cmVlLlxuICB2YXIgbmV4dE5hbWVQcmVmaXggPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SIDogbmFtZVNvRmFyICsgU1VCU0VQQVJBVE9SO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpKTtcbiAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4oY2hpbGRyZW4pO1xuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwoY2hpbGRyZW4pO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gY2hpbGRyZW4uZW50cmllcykge1xuICAgICAgICB2YXIgaWkgPSAwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICB2YXIgbWFwc0FzQ2hpbGRyZW5BZGRlbmR1bSA9ICcnO1xuICAgICAgICAgIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgICAgICAgICB2YXIgbWFwc0FzQ2hpbGRyZW5Pd25lck5hbWUgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LmdldE5hbWUoKTtcbiAgICAgICAgICAgIGlmIChtYXBzQXNDaGlsZHJlbk93bmVyTmFtZSkge1xuICAgICAgICAgICAgICBtYXBzQXNDaGlsZHJlbkFkZGVuZHVtID0gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG1hcHNBc0NoaWxkcmVuT3duZXJOYW1lICsgJ2AuJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGRpZFdhcm5BYm91dE1hcHMsICdVc2luZyBNYXBzIGFzIGNoaWxkcmVuIGlzIG5vdCB5ZXQgZnVsbHkgc3VwcG9ydGVkLiBJdCBpcyBhbiAnICsgJ2V4cGVyaW1lbnRhbCBmZWF0dXJlIHRoYXQgbWlnaHQgYmUgcmVtb3ZlZC4gQ29udmVydCBpdCB0byBhICcgKyAnc2VxdWVuY2UgLyBpdGVyYWJsZSBvZiBrZXllZCBSZWFjdEVsZW1lbnRzIGluc3RlYWQuJXMnLCBtYXBzQXNDaGlsZHJlbkFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICAgICAgICBkaWRXYXJuQWJvdXRNYXBzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICBjaGlsZCA9IGVudHJ5WzFdO1xuICAgICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIEtleUVzY2FwZVV0aWxzLmVzY2FwZShlbnRyeVswXSkgKyBTVUJTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIDApO1xuICAgICAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGFkZGVuZHVtID0gJyc7XG4gICAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgYWRkZW5kdW0gPSAnIElmIHlvdSBtZWFudCB0byByZW5kZXIgYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuLCB1c2UgYW4gYXJyYXkgJyArICdpbnN0ZWFkIG9yIHdyYXAgdGhlIG9iamVjdCB1c2luZyBjcmVhdGVGcmFnbWVudChvYmplY3QpIGZyb20gdGhlICcgKyAnUmVhY3QgYWRkLW9ucy4nO1xuICAgICAgICBpZiAoY2hpbGRyZW4uX2lzUmVhY3RFbGVtZW50KSB7XG4gICAgICAgICAgYWRkZW5kdW0gPSAnIEl0IGxvb2tzIGxpa2UgeW91XFwncmUgdXNpbmcgYW4gZWxlbWVudCBjcmVhdGVkIGJ5IGEgZGlmZmVyZW50ICcgKyAndmVyc2lvbiBvZiBSZWFjdC4gTWFrZSBzdXJlIHRvIHVzZSBvbmx5IG9uZSBjb3B5IG9mIFJlYWN0Lic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgICAgICB2YXIgbmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICBhZGRlbmR1bSArPSAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGRyZW5TdHJpbmcgPSBTdHJpbmcoY2hpbGRyZW4pO1xuICAgICAgIWZhbHNlID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdPYmplY3RzIGFyZSBub3QgdmFsaWQgYXMgYSBSZWFjdCBjaGlsZCAoZm91bmQ6ICVzKS4lcycsIGNoaWxkcmVuU3RyaW5nID09PSAnW29iamVjdCBPYmplY3RdJyA/ICdvYmplY3Qgd2l0aCBrZXlzIHsnICsgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmpvaW4oJywgJykgKyAnfScgOiBjaGlsZHJlblN0cmluZywgYWRkZW5kdW0pIDogX3Byb2RJbnZhcmlhbnQoJzMxJywgY2hpbGRyZW5TdHJpbmcgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gJ29iamVjdCB3aXRoIGtleXMgeycgKyBPYmplY3Qua2V5cyhjaGlsZHJlbikuam9pbignLCAnKSArICd9JyA6IGNoaWxkcmVuU3RyaW5nLCBhZGRlbmR1bSkgOiB2b2lkIDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN1YnRyZWVDb3VudDtcbn1cblxuLyoqXG4gKiBUcmF2ZXJzZXMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLCBidXRcbiAqIG1pZ2h0IGFsc28gYmUgc3BlY2lmaWVkIHRocm91Z2ggYXR0cmlidXRlczpcbiAqXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMuY2hpbGRyZW4sIC4uLilgXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMubGVmdFBhbmVsQ2hpbGRyZW4sIC4uLilgXG4gKlxuICogVGhlIGB0cmF2ZXJzZUNvbnRleHRgIGlzIGFuIG9wdGlvbmFsIGFyZ3VtZW50IHRoYXQgaXMgcGFzc2VkIHRocm91Z2ggdGhlXG4gKiBlbnRpcmUgdHJhdmVyc2FsLiBJdCBjYW4gYmUgdXNlZCB0byBzdG9yZSBhY2N1bXVsYXRpb25zIG9yIGFueXRoaW5nIGVsc2UgdGhhdFxuICogdGhlIGNhbGxiYWNrIG1pZ2h0IGZpbmQgcmVsZXZhbnQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBvYmplY3QuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgVG8gaW52b2tlIHVwb24gdHJhdmVyc2luZyBlYWNoIGNoaWxkLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IENvbnRleHQgZm9yIHRyYXZlcnNhbC5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sICcnLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0cmF2ZXJzZUFsbENoaWxkcmVuO1xufSx7XCIxNFwiOjE0LFwiMTdcIjoxNyxcIjJcIjoyLFwiMzZcIjozNixcIjM4XCI6MzgsXCI0NlwiOjQ2LFwiNDhcIjo0OH1dLDQxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4vKiBnbG9iYWwgaGFzT3duUHJvcGVydHk6dHJ1ZSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IF9kZXJlcV8oMzgpLFxuICAgIF9hc3NpZ24gPSBfZGVyZXFfKDQ5KTtcblxudmFyIGludmFyaWFudCA9IF9kZXJlcV8oNDYpO1xudmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIHNoYWxsb3dDb3B5KHgpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoeCkpIHtcbiAgICByZXR1cm4geC5jb25jYXQoKTtcbiAgfSBlbHNlIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBfYXNzaWduKG5ldyB4LmNvbnN0cnVjdG9yKCksIHgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB4O1xuICB9XG59XG5cbnZhciBDT01NQU5EX1BVU0ggPSAnJHB1c2gnO1xudmFyIENPTU1BTkRfVU5TSElGVCA9ICckdW5zaGlmdCc7XG52YXIgQ09NTUFORF9TUExJQ0UgPSAnJHNwbGljZSc7XG52YXIgQ09NTUFORF9TRVQgPSAnJHNldCc7XG52YXIgQ09NTUFORF9NRVJHRSA9ICckbWVyZ2UnO1xudmFyIENPTU1BTkRfQVBQTFkgPSAnJGFwcGx5JztcblxudmFyIEFMTF9DT01NQU5EU19MSVNUID0gW0NPTU1BTkRfUFVTSCwgQ09NTUFORF9VTlNISUZULCBDT01NQU5EX1NQTElDRSwgQ09NTUFORF9TRVQsIENPTU1BTkRfTUVSR0UsIENPTU1BTkRfQVBQTFldO1xuXG52YXIgQUxMX0NPTU1BTkRTX1NFVCA9IHt9O1xuXG5BTExfQ09NTUFORFNfTElTVC5mb3JFYWNoKGZ1bmN0aW9uIChjb21tYW5kKSB7XG4gIEFMTF9DT01NQU5EU19TRVRbY29tbWFuZF0gPSB0cnVlO1xufSk7XG5cbmZ1bmN0aW9uIGludmFyaWFudEFycmF5Q2FzZSh2YWx1ZSwgc3BlYywgY29tbWFuZCkge1xuICAhQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCB0YXJnZXQgb2YgJXMgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcy4nLCBjb21tYW5kLCB2YWx1ZSkgOiBfcHJvZEludmFyaWFudCgnMScsIGNvbW1hbmQsIHZhbHVlKSA6IHZvaWQgMDtcbiAgdmFyIHNwZWNWYWx1ZSA9IHNwZWNbY29tbWFuZF07XG4gICFBcnJheS5pc0FycmF5KHNwZWNWYWx1ZSkgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBleHBlY3RlZCBzcGVjIG9mICVzIHRvIGJlIGFuIGFycmF5OyBnb3QgJXMuIERpZCB5b3UgZm9yZ2V0IHRvIHdyYXAgeW91ciBwYXJhbWV0ZXIgaW4gYW4gYXJyYXk/JywgY29tbWFuZCwgc3BlY1ZhbHVlKSA6IF9wcm9kSW52YXJpYW50KCcyJywgY29tbWFuZCwgc3BlY1ZhbHVlKSA6IHZvaWQgMDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgdXBkYXRlZCBzaGFsbG93IGNvcHkgb2YgYW4gb2JqZWN0IHdpdGhvdXQgbXV0YXRpbmcgdGhlIG9yaWdpbmFsLlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdXBkYXRlLmh0bWwgZm9yIGRldGFpbHMuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSwgc3BlYykge1xuICAhKHR5cGVvZiBzcGVjID09PSAnb2JqZWN0JykgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiBZb3UgcHJvdmlkZWQgYSBrZXkgcGF0aCB0byB1cGRhdGUoKSB0aGF0IGRpZCBub3QgY29udGFpbiBvbmUgb2YgJXMuIERpZCB5b3UgZm9yZ2V0IHRvIGluY2x1ZGUgeyVzOiAuLi59PycsIEFMTF9DT01NQU5EU19MSVNULmpvaW4oJywgJyksIENPTU1BTkRfU0VUKSA6IF9wcm9kSW52YXJpYW50KCczJywgQUxMX0NPTU1BTkRTX0xJU1Quam9pbignLCAnKSwgQ09NTUFORF9TRVQpIDogdm9pZCAwO1xuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfU0VUKSkge1xuICAgICEoT2JqZWN0LmtleXMoc3BlYykubGVuZ3RoID09PSAxKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnQ2Fubm90IGhhdmUgbW9yZSB0aGFuIG9uZSBrZXkgaW4gYW4gb2JqZWN0IHdpdGggJXMnLCBDT01NQU5EX1NFVCkgOiBfcHJvZEludmFyaWFudCgnNCcsIENPTU1BTkRfU0VUKSA6IHZvaWQgMDtcblxuICAgIHJldHVybiBzcGVjW0NPTU1BTkRfU0VUXTtcbiAgfVxuXG4gIHZhciBuZXh0VmFsdWUgPSBzaGFsbG93Q29weSh2YWx1ZSk7XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9NRVJHRSkpIHtcbiAgICB2YXIgbWVyZ2VPYmogPSBzcGVjW0NPTU1BTkRfTUVSR0VdO1xuICAgICEobWVyZ2VPYmogJiYgdHlwZW9mIG1lcmdlT2JqID09PSAnb2JqZWN0JykgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZSgpOiAlcyBleHBlY3RzIGEgc3BlYyBvZiB0eXBlIFxcJ29iamVjdFxcJzsgZ290ICVzJywgQ09NTUFORF9NRVJHRSwgbWVyZ2VPYmopIDogX3Byb2RJbnZhcmlhbnQoJzUnLCBDT01NQU5EX01FUkdFLCBtZXJnZU9iaikgOiB2b2lkIDA7XG4gICAgIShuZXh0VmFsdWUgJiYgdHlwZW9mIG5leHRWYWx1ZSA9PT0gJ29iamVjdCcpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogJXMgZXhwZWN0cyBhIHRhcmdldCBvZiB0eXBlIFxcJ29iamVjdFxcJzsgZ290ICVzJywgQ09NTUFORF9NRVJHRSwgbmV4dFZhbHVlKSA6IF9wcm9kSW52YXJpYW50KCc2JywgQ09NTUFORF9NRVJHRSwgbmV4dFZhbHVlKSA6IHZvaWQgMDtcbiAgICBfYXNzaWduKG5leHRWYWx1ZSwgc3BlY1tDT01NQU5EX01FUkdFXSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX1BVU0gpKSB7XG4gICAgaW52YXJpYW50QXJyYXlDYXNlKHZhbHVlLCBzcGVjLCBDT01NQU5EX1BVU0gpO1xuICAgIHNwZWNbQ09NTUFORF9QVVNIXS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBuZXh0VmFsdWUucHVzaChpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNwZWMsIENPTU1BTkRfVU5TSElGVCkpIHtcbiAgICBpbnZhcmlhbnRBcnJheUNhc2UodmFsdWUsIHNwZWMsIENPTU1BTkRfVU5TSElGVCk7XG4gICAgc3BlY1tDT01NQU5EX1VOU0hJRlRdLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIG5leHRWYWx1ZS51bnNoaWZ0KGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc3BlYywgQ09NTUFORF9TUExJQ0UpKSB7XG4gICAgIUFycmF5LmlzQXJyYXkodmFsdWUpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCAlcyB0YXJnZXQgdG8gYmUgYW4gYXJyYXk7IGdvdCAlcycsIENPTU1BTkRfU1BMSUNFLCB2YWx1ZSkgOiBfcHJvZEludmFyaWFudCgnNycsIENPTU1BTkRfU1BMSUNFLCB2YWx1ZSkgOiB2b2lkIDA7XG4gICAgIUFycmF5LmlzQXJyYXkoc3BlY1tDT01NQU5EX1NQTElDRV0pID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhbiBhcnJheSBvZiBhcnJheXM7IGdvdCAlcy4gRGlkIHlvdSBmb3JnZXQgdG8gd3JhcCB5b3VyIHBhcmFtZXRlcnMgaW4gYW4gYXJyYXk/JywgQ09NTUFORF9TUExJQ0UsIHNwZWNbQ09NTUFORF9TUExJQ0VdKSA6IF9wcm9kSW52YXJpYW50KCc4JywgQ09NTUFORF9TUExJQ0UsIHNwZWNbQ09NTUFORF9TUExJQ0VdKSA6IHZvaWQgMDtcbiAgICBzcGVjW0NPTU1BTkRfU1BMSUNFXS5mb3JFYWNoKGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAhQXJyYXkuaXNBcnJheShhcmdzKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlKCk6IGV4cGVjdGVkIHNwZWMgb2YgJXMgdG8gYmUgYW4gYXJyYXkgb2YgYXJyYXlzOyBnb3QgJXMuIERpZCB5b3UgZm9yZ2V0IHRvIHdyYXAgeW91ciBwYXJhbWV0ZXJzIGluIGFuIGFycmF5PycsIENPTU1BTkRfU1BMSUNFLCBzcGVjW0NPTU1BTkRfU1BMSUNFXSkgOiBfcHJvZEludmFyaWFudCgnOCcsIENPTU1BTkRfU1BMSUNFLCBzcGVjW0NPTU1BTkRfU1BMSUNFXSkgOiB2b2lkIDA7XG4gICAgICBuZXh0VmFsdWUuc3BsaWNlLmFwcGx5KG5leHRWYWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzcGVjLCBDT01NQU5EX0FQUExZKSkge1xuICAgICEodHlwZW9mIHNwZWNbQ09NTUFORF9BUFBMWV0gPT09ICdmdW5jdGlvbicpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGUoKTogZXhwZWN0ZWQgc3BlYyBvZiAlcyB0byBiZSBhIGZ1bmN0aW9uOyBnb3QgJXMuJywgQ09NTUFORF9BUFBMWSwgc3BlY1tDT01NQU5EX0FQUExZXSkgOiBfcHJvZEludmFyaWFudCgnOScsIENPTU1BTkRfQVBQTFksIHNwZWNbQ09NTUFORF9BUFBMWV0pIDogdm9pZCAwO1xuICAgIG5leHRWYWx1ZSA9IHNwZWNbQ09NTUFORF9BUFBMWV0obmV4dFZhbHVlKTtcbiAgfVxuXG4gIGZvciAodmFyIGsgaW4gc3BlYykge1xuICAgIGlmICghKEFMTF9DT01NQU5EU19TRVQuaGFzT3duUHJvcGVydHkoaykgJiYgQUxMX0NPTU1BTkRTX1NFVFtrXSkpIHtcbiAgICAgIG5leHRWYWx1ZVtrXSA9IHVwZGF0ZSh2YWx1ZVtrXSwgc3BlY1trXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5leHRWYWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1cGRhdGU7XG59LHtcIjM4XCI6MzgsXCI0NlwiOjQ2LFwiNDlcIjo0OX1dLDQyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEB0eXBlY2hlY2tzXG4gKi9cblxudmFyIGludmFyaWFudCA9IF9kZXJlcV8oNDYpO1xuXG4vKipcbiAqIFRoZSBDU1NDb3JlIG1vZHVsZSBzcGVjaWZpZXMgdGhlIEFQSSAoYW5kIGltcGxlbWVudHMgbW9zdCBvZiB0aGUgbWV0aG9kcylcbiAqIHRoYXQgc2hvdWxkIGJlIHVzZWQgd2hlbiBkZWFsaW5nIHdpdGggdGhlIGRpc3BsYXkgb2YgZWxlbWVudHMgKHZpYSB0aGVpclxuICogQ1NTIGNsYXNzZXMgYW5kIHZpc2liaWxpdHkgb24gc2NyZWVuLiBJdCBpcyBhbiBBUEkgZm9jdXNlZCBvbiBtdXRhdGluZyB0aGVcbiAqIGRpc3BsYXkgYW5kIG5vdCByZWFkaW5nIGl0IGFzIG5vIGxvZ2ljYWwgc3RhdGUgc2hvdWxkIGJlIGVuY29kZWQgaW4gdGhlXG4gKiBkaXNwbGF5IG9mIGVsZW1lbnRzLlxuICovXG5cbi8qIFNsb3cgaW1wbGVtZW50YXRpb24gZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCAubWF0Y2hlcygpICovXG5mdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3JfU0xPVyhlbGVtZW50LCBzZWxlY3Rvcikge1xuICB2YXIgcm9vdCA9IGVsZW1lbnQ7XG4gIHdoaWxlIChyb290LnBhcmVudE5vZGUpIHtcbiAgICByb290ID0gcm9vdC5wYXJlbnROb2RlO1xuICB9XG5cbiAgdmFyIGFsbCA9IHJvb3QucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGFsbCwgZWxlbWVudCkgIT09IC0xO1xufVxuXG52YXIgQ1NTQ29yZSA9IHtcblxuICAvKipcbiAgICogQWRkcyB0aGUgY2xhc3MgcGFzc2VkIGluIHRvIHRoZSBlbGVtZW50IGlmIGl0IGRvZXNuJ3QgYWxyZWFkeSBoYXZlIGl0LlxuICAgKlxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gc2V0IHRoZSBjbGFzcyBvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIHRoZSBDU1MgY2xhc3NOYW1lXG4gICAqIEByZXR1cm4ge0RPTUVsZW1lbnR9IHRoZSBlbGVtZW50IHBhc3NlZCBpblxuICAgKi9cbiAgYWRkQ2xhc3M6IGZ1bmN0aW9uIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICEhL1xccy8udGVzdChjbGFzc05hbWUpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdDU1NDb3JlLmFkZENsYXNzIHRha2VzIG9ubHkgYSBzaW5nbGUgY2xhc3MgbmFtZS4gXCIlc1wiIGNvbnRhaW5zICcgKyAnbXVsdGlwbGUgY2xhc3Nlcy4nLCBjbGFzc05hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAoIUNTU0NvcmUuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnICsgY2xhc3NOYW1lO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY2xhc3MgcGFzc2VkIGluIGZyb20gdGhlIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIHNldCB0aGUgY2xhc3Mgb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSB0aGUgQ1NTIGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtET01FbGVtZW50fSB0aGUgZWxlbWVudCBwYXNzZWQgaW5cbiAgICovXG4gIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICAhIS9cXHMvLnRlc3QoY2xhc3NOYW1lKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnQ1NTQ29yZS5yZW1vdmVDbGFzcyB0YWtlcyBvbmx5IGEgc2luZ2xlIGNsYXNzIG5hbWUuIFwiJXNcIiBjb250YWlucyAnICsgJ211bHRpcGxlIGNsYXNzZXMuJywgY2xhc3NOYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICB9IGVsc2UgaWYgKENTU0NvcmUuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXHMpJyArIGNsYXNzTmFtZSArICcoPzpcXFxcc3wkKScsICdnJyksICckMScpLnJlcGxhY2UoL1xccysvZywgJyAnKSAvLyBtdWx0aXBsZSBzcGFjZXMgdG8gb25lXG4gICAgICAgIC5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJyk7IC8vIHRyaW0gdGhlIGVuZHNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byBhZGQgb3IgcmVtb3ZlIGEgY2xhc3MgZnJvbSBhbiBlbGVtZW50IGJhc2VkIG9uIGEgY29uZGl0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gc2V0IHRoZSBjbGFzcyBvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIHRoZSBDU1MgY2xhc3NOYW1lXG4gICAqIEBwYXJhbSB7Kn0gYm9vbCBjb25kaXRpb24gdG8gd2hldGhlciB0byBhZGQgb3IgcmVtb3ZlIHRoZSBjbGFzc1xuICAgKiBAcmV0dXJuIHtET01FbGVtZW50fSB0aGUgZWxlbWVudCBwYXNzZWQgaW5cbiAgICovXG4gIGNvbmRpdGlvbkNsYXNzOiBmdW5jdGlvbiBjb25kaXRpb25DbGFzcyhlbGVtZW50LCBjbGFzc05hbWUsIGJvb2wpIHtcbiAgICByZXR1cm4gKGJvb2wgPyBDU1NDb3JlLmFkZENsYXNzIDogQ1NTQ29yZS5yZW1vdmVDbGFzcykoZWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgfSxcblxuICAvKipcbiAgICogVGVzdHMgd2hldGhlciB0aGUgZWxlbWVudCBoYXMgdGhlIGNsYXNzIHNwZWNpZmllZC5cbiAgICpcbiAgICogQHBhcmFtIHtET01Ob2RlfERPTVdpbmRvd30gZWxlbWVudCB0aGUgZWxlbWVudCB0byBjaGVjayB0aGUgY2xhc3Mgb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSB0aGUgQ1NTIGNsYXNzTmFtZVxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IGhhcyB0aGUgY2xhc3MsIGZhbHNlIGlmIG5vdFxuICAgKi9cbiAgaGFzQ2xhc3M6IGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICEhL1xccy8udGVzdChjbGFzc05hbWUpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdDU1MuaGFzQ2xhc3MgdGFrZXMgb25seSBhIHNpbmdsZSBjbGFzcyBuYW1lLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgIHJldHVybiAhIWNsYXNzTmFtZSAmJiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gKCcgJyArIGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgJyArIGNsYXNzTmFtZSArICcgJykgPiAtMTtcbiAgfSxcblxuICAvKipcbiAgICogVGVzdHMgd2hldGhlciB0aGUgZWxlbWVudCBtYXRjaGVzIHRoZSBzZWxlY3RvciBzcGVjaWZpZWRcbiAgICpcbiAgICogQHBhcmFtIHtET01Ob2RlfERPTVdpbmRvd30gZWxlbWVudCB0aGUgZWxlbWVudCB0aGF0IHdlIGFyZSBxdWVyeWluZ1xuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgdGhlIENTUyBzZWxlY3RvclxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IG1hdGNoZXMgdGhlIHNlbGVjdG9yLCBmYWxzZSBpZiBub3RcbiAgICovXG4gIG1hdGNoZXNTZWxlY3RvcjogZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgdmFyIG1hdGNoZXNJbXBsID0gZWxlbWVudC5tYXRjaGVzIHx8IGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsZW1lbnQubXNNYXRjaGVzU2VsZWN0b3IgfHwgZnVuY3Rpb24gKHMpIHtcbiAgICAgIHJldHVybiBtYXRjaGVzU2VsZWN0b3JfU0xPVyhlbGVtZW50LCBzKTtcbiAgICB9O1xuICAgIHJldHVybiBtYXRjaGVzSW1wbC5jYWxsKGVsZW1lbnQsIHNlbGVjdG9yKTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENTU0NvcmU7XG59LHtcIjQ2XCI6NDZ9XSw0MzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbi8qKlxuICogU2ltcGxlLCBsaWdodHdlaWdodCBtb2R1bGUgYXNzaXN0aW5nIHdpdGggdGhlIGRldGVjdGlvbiBhbmQgY29udGV4dCBvZlxuICogV29ya2VyLiBIZWxwcyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmNpZXMgYW5kIGFsbG93cyBjb2RlIHRvIHJlYXNvbiBhYm91dFxuICogd2hldGhlciBvciBub3QgdGhleSBhcmUgaW4gYSBXb3JrZXIsIGV2ZW4gaWYgdGhleSBuZXZlciBpbmNsdWRlIHRoZSBtYWluXG4gKiBgUmVhY3RXb3JrZXJgIGRlcGVuZGVuY3kuXG4gKi9cbnZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHtcblxuICBjYW5Vc2VET006IGNhblVzZURPTSxcblxuICBjYW5Vc2VXb3JrZXJzOiB0eXBlb2YgV29ya2VyICE9PSAndW5kZWZpbmVkJyxcblxuICBjYW5Vc2VFdmVudExpc3RlbmVyczogY2FuVXNlRE9NICYmICEhKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIHx8IHdpbmRvdy5hdHRhY2hFdmVudCksXG5cbiAgY2FuVXNlVmlld3BvcnQ6IGNhblVzZURPTSAmJiAhIXdpbmRvdy5zY3JlZW4sXG5cbiAgaXNJbldvcmtlcjogIWNhblVzZURPTSAvLyBGb3Igbm93LCB0aGlzIGlzIHRydWUgLSBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZS5cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeGVjdXRpb25FbnZpcm9ubWVudDtcbn0se31dLDQ0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247XG59LHt9XSw0NTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICBPYmplY3QuZnJlZXplKGVtcHR5T2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eU9iamVjdDtcbn0se31dLDQ2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHt9O1xuXG5pZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpO1xuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcbn0se31dLDQ3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICogXG4gKi9cblxuLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICovXG5mdW5jdGlvbiBpcyh4LCB5KSB7XG4gIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgaWYgKHggPT09IHkpIHtcbiAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIC8vIEFkZGVkIHRoZSBub256ZXJvIHkgY2hlY2sgdG8gbWFrZSBGbG93IGhhcHB5LCBidXQgaXQgaXMgcmVkdW5kYW50XG4gICAgcmV0dXJuIHggIT09IDAgfHwgeSAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG5cbi8qKlxuICogUGVyZm9ybXMgZXF1YWxpdHkgYnkgaXRlcmF0aW5nIHRocm91Z2gga2V5cyBvbiBhbiBvYmplY3QgYW5kIHJldHVybmluZyBmYWxzZVxuICogd2hlbiBhbnkga2V5IGhhcyB2YWx1ZXMgd2hpY2ggYXJlIG5vdCBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSBhcmd1bWVudHMuXG4gKiBSZXR1cm5zIHRydWUgd2hlbiB0aGUgdmFsdWVzIG9mIGFsbCBrZXlzIGFyZSBzdHJpY3RseSBlcXVhbC5cbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0VxdWFsKG9iakEsIG9iakIpIHtcbiAgaWYgKGlzKG9iakEsIG9iakIpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iakEgIT09ICdvYmplY3QnIHx8IG9iakEgPT09IG51bGwgfHwgdHlwZW9mIG9iakIgIT09ICdvYmplY3QnIHx8IG9iakIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMob2JqQik7XG5cbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5c0IubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVGVzdCBmb3IgQSdzIGtleXMgZGlmZmVyZW50IGZyb20gQi5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzQS5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duUHJvcGVydHkuY2FsbChvYmpCLCBrZXlzQVtpXSkgfHwgIWlzKG9iakFba2V5c0FbaV1dLCBvYmpCW2tleXNBW2ldXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGFsbG93RXF1YWw7XG59LHt9XSw0ODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IF9kZXJlcV8oNDQpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0KSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9IGNhdGNoICh4KSB7fVxuICAgIH07XG5cbiAgICB3YXJuaW5nID0gZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCkge1xuICAgICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmb3JtYXQuaW5kZXhPZignRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJykgPT09IDApIHtcbiAgICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgICAgfVxuXG4gICAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xufSx7XCI0NFwiOjQ0fV0sNDk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuXG59LHt9XX0se30sWzMyXSkoMzIpXG59KTsiXX0=