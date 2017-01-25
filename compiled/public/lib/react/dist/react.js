"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * React v15.4.2
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
    }, {}], 2: [function (_dereq_, module, exports) {
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

      var _prodInvariant = _dereq_(24);

      var invariant = _dereq_(28);

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
    }, { "24": 24, "28": 28 }], 3: [function (_dereq_, module, exports) {
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

      var _assign = _dereq_(30);

      var ReactChildren = _dereq_(4);
      var ReactComponent = _dereq_(6);
      var ReactPureComponent = _dereq_(17);
      var ReactClass = _dereq_(5);
      var ReactDOMFactories = _dereq_(9);
      var ReactElement = _dereq_(10);
      var ReactPropTypes = _dereq_(15);
      var ReactVersion = _dereq_(19);

      var onlyChild = _dereq_(23);
      var warning = _dereq_(29);

      var createElement = ReactElement.createElement;
      var createFactory = ReactElement.createFactory;
      var cloneElement = ReactElement.cloneElement;

      if ("development" !== 'production') {
        var ReactElementValidator = _dereq_(12);
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
    }, { "10": 10, "12": 12, "15": 15, "17": 17, "19": 19, "23": 23, "29": 29, "30": 30, "4": 4, "5": 5, "6": 6, "9": 9 }], 4: [function (_dereq_, module, exports) {
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

      var PooledClass = _dereq_(2);
      var ReactElement = _dereq_(10);

      var emptyFunction = _dereq_(26);
      var traverseAllChildren = _dereq_(25);

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
    }, { "10": 10, "2": 2, "25": 25, "26": 26 }], 5: [function (_dereq_, module, exports) {
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

      var _prodInvariant = _dereq_(24),
          _assign = _dereq_(30);

      var ReactComponent = _dereq_(6);
      var ReactElement = _dereq_(10);
      var ReactPropTypeLocationNames = _dereq_(14);
      var ReactNoopUpdateQueue = _dereq_(13);

      var emptyObject = _dereq_(27);
      var invariant = _dereq_(28);
      var warning = _dereq_(29);

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
    }, { "10": 10, "13": 13, "14": 14, "24": 24, "27": 27, "28": 28, "29": 29, "30": 30, "6": 6 }], 6: [function (_dereq_, module, exports) {
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

      var _prodInvariant = _dereq_(24);

      var ReactNoopUpdateQueue = _dereq_(13);

      var canDefineProperty = _dereq_(20);
      var emptyObject = _dereq_(27);
      var invariant = _dereq_(28);
      var warning = _dereq_(29);

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
    }, { "13": 13, "20": 20, "24": 24, "27": 27, "28": 28, "29": 29 }], 7: [function (_dereq_, module, exports) {
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

      var _prodInvariant = _dereq_(24);

      var ReactCurrentOwner = _dereq_(8);

      var invariant = _dereq_(28);
      var warning = _dereq_(29);

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
    }, { "24": 24, "28": 28, "29": 29, "8": 8 }], 8: [function (_dereq_, module, exports) {
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
    }, {}], 9: [function (_dereq_, module, exports) {
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

      var ReactElement = _dereq_(10);

      /**
       * Create a factory that creates HTML tag elements.
       *
       * @private
       */
      var createDOMFactory = ReactElement.createFactory;
      if ("development" !== 'production') {
        var ReactElementValidator = _dereq_(12);
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
    }, { "10": 10, "12": 12 }], 10: [function (_dereq_, module, exports) {
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

      var _assign = _dereq_(30);

      var ReactCurrentOwner = _dereq_(8);

      var warning = _dereq_(29);
      var canDefineProperty = _dereq_(20);
      var hasOwnProperty = Object.prototype.hasOwnProperty;

      var REACT_ELEMENT_TYPE = _dereq_(11);

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
    }, { "11": 11, "20": 20, "29": 29, "30": 30, "8": 8 }], 11: [function (_dereq_, module, exports) {
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
    }, {}], 12: [function (_dereq_, module, exports) {
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

      var ReactCurrentOwner = _dereq_(8);
      var ReactComponentTreeHook = _dereq_(7);
      var ReactElement = _dereq_(10);

      var checkReactTypeSpec = _dereq_(21);

      var canDefineProperty = _dereq_(20);
      var getIteratorFn = _dereq_(22);
      var warning = _dereq_(29);

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
    }, { "10": 10, "20": 20, "21": 21, "22": 22, "29": 29, "7": 7, "8": 8 }], 13: [function (_dereq_, module, exports) {
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

      var warning = _dereq_(29);

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
    }, { "29": 29 }], 14: [function (_dereq_, module, exports) {
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

      var ReactElement = _dereq_(10);
      var ReactPropTypeLocationNames = _dereq_(14);
      var ReactPropTypesSecret = _dereq_(16);

      var emptyFunction = _dereq_(26);
      var getIteratorFn = _dereq_(22);
      var warning = _dereq_(29);

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
    }, { "10": 10, "14": 14, "16": 16, "22": 22, "26": 26, "29": 29 }], 16: [function (_dereq_, module, exports) {
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
    }, {}], 17: [function (_dereq_, module, exports) {
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

      var _assign = _dereq_(30);

      var ReactComponent = _dereq_(6);
      var ReactNoopUpdateQueue = _dereq_(13);

      var emptyObject = _dereq_(27);

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
    }, { "13": 13, "27": 27, "30": 30, "6": 6 }], 18: [function (_dereq_, module, exports) {
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

      var _assign = _dereq_(30);

      var React = _dereq_(3);

      // `version` will be added here by the React module.
      var ReactUMDEntry = _assign({
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
          ReactCurrentOwner: _dereq_(8)
        }
      }, React);

      if ("development" !== 'production') {
        _assign(ReactUMDEntry.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
          // ReactComponentTreeHook should not be included in production.
          ReactComponentTreeHook: _dereq_(7)
        });
      }

      module.exports = ReactUMDEntry;
    }, { "3": 3, "30": 30, "7": 7, "8": 8 }], 19: [function (_dereq_, module, exports) {
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
    }, {}], 20: [function (_dereq_, module, exports) {
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
    }, {}], 21: [function (_dereq_, module, exports) {
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

        var _prodInvariant = _dereq_(24);

        var ReactPropTypeLocationNames = _dereq_(14);
        var ReactPropTypesSecret = _dereq_(16);

        var invariant = _dereq_(28);
        var warning = _dereq_(29);

        var ReactComponentTreeHook;

        if (typeof process !== 'undefined' && process.env && "development" === 'test') {
          // Temporary hack.
          // Inline requires don't work well with Jest:
          // https://github.com/facebook/react/issues/7240
          // Remove the inline requires when we don't need them anymore:
          // https://github.com/facebook/react/pull/7178
          ReactComponentTreeHook = _dereq_(7);
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
                    ReactComponentTreeHook = _dereq_(7);
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
    }, { "14": 14, "16": 16, "24": 24, "28": 28, "29": 29, "7": 7 }], 22: [function (_dereq_, module, exports) {
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

      var _prodInvariant = _dereq_(24);

      var ReactElement = _dereq_(10);

      var invariant = _dereq_(28);

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
    }, { "10": 10, "24": 24, "28": 28 }], 24: [function (_dereq_, module, exports) {
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

      var _prodInvariant = _dereq_(24);

      var ReactCurrentOwner = _dereq_(8);
      var REACT_ELEMENT_TYPE = _dereq_(11);

      var getIteratorFn = _dereq_(22);
      var invariant = _dereq_(28);
      var KeyEscapeUtils = _dereq_(1);
      var warning = _dereq_(29);

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
    }, { "1": 1, "11": 11, "22": 22, "24": 24, "28": 28, "29": 29, "8": 8 }], 26: [function (_dereq_, module, exports) {
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
    }, {}], 27: [function (_dereq_, module, exports) {
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
    }, {}], 28: [function (_dereq_, module, exports) {
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
    }, {}], 29: [function (_dereq_, module, exports) {
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

      var emptyFunction = _dereq_(26);

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
    }, { "26": 26 }], 30: [function (_dereq_, module, exports) {
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
    }, {}] }, {}, [18])(18);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QvZGlzdC9yZWFjdC5qcyJdLCJuYW1lcyI6WyJmIiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsImciLCJ3aW5kb3ciLCJnbG9iYWwiLCJzZWxmIiwiUmVhY3QiLCJlIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJpIiwiRXJyb3IiLCJjb2RlIiwibCIsImNhbGwiLCJsZW5ndGgiLCJfZGVyZXFfIiwiZXNjYXBlIiwia2V5IiwiZXNjYXBlUmVnZXgiLCJlc2NhcGVyTG9va3VwIiwiZXNjYXBlZFN0cmluZyIsInJlcGxhY2UiLCJtYXRjaCIsInVuZXNjYXBlIiwidW5lc2NhcGVSZWdleCIsInVuZXNjYXBlckxvb2t1cCIsImtleVN1YnN0cmluZyIsInN1YnN0cmluZyIsIktleUVzY2FwZVV0aWxzIiwiX3Byb2RJbnZhcmlhbnQiLCJpbnZhcmlhbnQiLCJvbmVBcmd1bWVudFBvb2xlciIsImNvcHlGaWVsZHNGcm9tIiwiS2xhc3MiLCJpbnN0YW5jZVBvb2wiLCJpbnN0YW5jZSIsInBvcCIsInR3b0FyZ3VtZW50UG9vbGVyIiwiYTEiLCJhMiIsInRocmVlQXJndW1lbnRQb29sZXIiLCJhMyIsImZvdXJBcmd1bWVudFBvb2xlciIsImE0Iiwic3RhbmRhcmRSZWxlYXNlciIsImRlc3RydWN0b3IiLCJwb29sU2l6ZSIsInB1c2giLCJERUZBVUxUX1BPT0xfU0laRSIsIkRFRkFVTFRfUE9PTEVSIiwiYWRkUG9vbGluZ1RvIiwiQ29weUNvbnN0cnVjdG9yIiwicG9vbGVyIiwiTmV3S2xhc3MiLCJnZXRQb29sZWQiLCJyZWxlYXNlIiwiUG9vbGVkQ2xhc3MiLCJfYXNzaWduIiwiUmVhY3RDaGlsZHJlbiIsIlJlYWN0Q29tcG9uZW50IiwiUmVhY3RQdXJlQ29tcG9uZW50IiwiUmVhY3RDbGFzcyIsIlJlYWN0RE9NRmFjdG9yaWVzIiwiUmVhY3RFbGVtZW50IiwiUmVhY3RQcm9wVHlwZXMiLCJSZWFjdFZlcnNpb24iLCJvbmx5Q2hpbGQiLCJ3YXJuaW5nIiwiY3JlYXRlRWxlbWVudCIsImNyZWF0ZUZhY3RvcnkiLCJjbG9uZUVsZW1lbnQiLCJSZWFjdEVsZW1lbnRWYWxpZGF0b3IiLCJfX3NwcmVhZCIsIndhcm5lZCIsImFwcGx5IiwiYXJndW1lbnRzIiwiQ2hpbGRyZW4iLCJtYXAiLCJmb3JFYWNoIiwiY291bnQiLCJ0b0FycmF5Iiwib25seSIsIkNvbXBvbmVudCIsIlB1cmVDb21wb25lbnQiLCJpc1ZhbGlkRWxlbWVudCIsIlByb3BUeXBlcyIsImNyZWF0ZUNsYXNzIiwiY3JlYXRlTWl4aW4iLCJtaXhpbiIsIkRPTSIsInZlcnNpb24iLCJlbXB0eUZ1bmN0aW9uIiwidHJhdmVyc2VBbGxDaGlsZHJlbiIsInVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4IiwiZXNjYXBlVXNlclByb3ZpZGVkS2V5IiwidGV4dCIsIkZvckVhY2hCb29rS2VlcGluZyIsImZvckVhY2hGdW5jdGlvbiIsImZvckVhY2hDb250ZXh0IiwiZnVuYyIsImNvbnRleHQiLCJwcm90b3R5cGUiLCJmb3JFYWNoU2luZ2xlQ2hpbGQiLCJib29rS2VlcGluZyIsImNoaWxkIiwibmFtZSIsImZvckVhY2hDaGlsZHJlbiIsImNoaWxkcmVuIiwiZm9yRWFjaEZ1bmMiLCJ0cmF2ZXJzZUNvbnRleHQiLCJNYXBCb29rS2VlcGluZyIsIm1hcFJlc3VsdCIsImtleVByZWZpeCIsIm1hcEZ1bmN0aW9uIiwibWFwQ29udGV4dCIsInJlc3VsdCIsIm1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQiLCJjaGlsZEtleSIsIm1hcHBlZENoaWxkIiwiQXJyYXkiLCJpc0FycmF5IiwibWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbCIsInRoYXRSZXR1cm5zQXJndW1lbnQiLCJjbG9uZUFuZFJlcGxhY2VLZXkiLCJhcnJheSIsInByZWZpeCIsImVzY2FwZWRQcmVmaXgiLCJtYXBDaGlsZHJlbiIsImZvckVhY2hTaW5nbGVDaGlsZER1bW15IiwiY291bnRDaGlsZHJlbiIsIlJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzIiwiUmVhY3ROb29wVXBkYXRlUXVldWUiLCJlbXB0eU9iamVjdCIsIk1JWElOU19LRVkiLCJpZGVudGl0eSIsImZuIiwiaW5qZWN0ZWRNaXhpbnMiLCJSZWFjdENsYXNzSW50ZXJmYWNlIiwibWl4aW5zIiwic3RhdGljcyIsInByb3BUeXBlcyIsImNvbnRleHRUeXBlcyIsImNoaWxkQ29udGV4dFR5cGVzIiwiZ2V0RGVmYXVsdFByb3BzIiwiZ2V0SW5pdGlhbFN0YXRlIiwiZ2V0Q2hpbGRDb250ZXh0IiwicmVuZGVyIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwiY29tcG9uZW50V2lsbFVwZGF0ZSIsImNvbXBvbmVudERpZFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwidXBkYXRlQ29tcG9uZW50IiwiUkVTRVJWRURfU1BFQ19LRVlTIiwiZGlzcGxheU5hbWUiLCJDb25zdHJ1Y3RvciIsIm1peFNwZWNJbnRvQ29tcG9uZW50IiwidmFsaWRhdGVUeXBlRGVmIiwiY3JlYXRlTWVyZ2VkUmVzdWx0RnVuY3Rpb24iLCJtaXhTdGF0aWNTcGVjSW50b0NvbXBvbmVudCIsImF1dG9iaW5kIiwidHlwZURlZiIsImxvY2F0aW9uIiwicHJvcE5hbWUiLCJoYXNPd25Qcm9wZXJ0eSIsInZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUiLCJpc0FscmVhZHlEZWZpbmVkIiwic3BlY1BvbGljeSIsIlJlYWN0Q2xhc3NNaXhpbiIsInNwZWMiLCJ0eXBlb2ZTcGVjIiwiaXNNaXhpblZhbGlkIiwicHJvdG8iLCJhdXRvQmluZFBhaXJzIiwiX19yZWFjdEF1dG9CaW5kUGFpcnMiLCJwcm9wZXJ0eSIsImlzUmVhY3RDbGFzc01ldGhvZCIsImlzRnVuY3Rpb24iLCJzaG91bGRBdXRvQmluZCIsImNyZWF0ZUNoYWluZWRGdW5jdGlvbiIsImlzUmVzZXJ2ZWQiLCJpc0luaGVyaXRlZCIsIm1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMiLCJvbmUiLCJ0d28iLCJ1bmRlZmluZWQiLCJtZXJnZWRSZXN1bHQiLCJiIiwiYyIsImNoYWluZWRGdW5jdGlvbiIsImJpbmRBdXRvQmluZE1ldGhvZCIsImNvbXBvbmVudCIsIm1ldGhvZCIsImJvdW5kTWV0aG9kIiwiYmluZCIsIl9fcmVhY3RCb3VuZENvbnRleHQiLCJfX3JlYWN0Qm91bmRNZXRob2QiLCJfX3JlYWN0Qm91bmRBcmd1bWVudHMiLCJjb21wb25lbnROYW1lIiwiY29uc3RydWN0b3IiLCJfYmluZCIsIm5ld1RoaXMiLCJfbGVuIiwiYXJncyIsIl9rZXkiLCJyZWJvdW5kTWV0aG9kIiwiYmluZEF1dG9CaW5kTWV0aG9kcyIsInBhaXJzIiwiYXV0b0JpbmRLZXkiLCJyZXBsYWNlU3RhdGUiLCJuZXdTdGF0ZSIsImNhbGxiYWNrIiwidXBkYXRlciIsImVucXVldWVSZXBsYWNlU3RhdGUiLCJlbnF1ZXVlQ2FsbGJhY2siLCJpc01vdW50ZWQiLCJSZWFjdENsYXNzQ29tcG9uZW50IiwicHJvcHMiLCJyZWZzIiwic3RhdGUiLCJpbml0aWFsU3RhdGUiLCJfaXNNb2NrRnVuY3Rpb24iLCJkZWZhdWx0UHJvcHMiLCJpc1JlYWN0Q2xhc3NBcHByb3ZlZCIsImNvbXBvbmVudFNob3VsZFVwZGF0ZSIsImNvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMiLCJtZXRob2ROYW1lIiwiaW5qZWN0aW9uIiwiaW5qZWN0TWl4aW4iLCJjYW5EZWZpbmVQcm9wZXJ0eSIsImlzUmVhY3RDb21wb25lbnQiLCJzZXRTdGF0ZSIsInBhcnRpYWxTdGF0ZSIsImVucXVldWVTZXRTdGF0ZSIsImZvcmNlVXBkYXRlIiwiZW5xdWV1ZUZvcmNlVXBkYXRlIiwiZGVwcmVjYXRlZEFQSXMiLCJkZWZpbmVEZXByZWNhdGlvbldhcm5pbmciLCJpbmZvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJmbk5hbWUiLCJSZWFjdEN1cnJlbnRPd25lciIsImlzTmF0aXZlIiwiZnVuY1RvU3RyaW5nIiwiRnVuY3Rpb24iLCJ0b1N0cmluZyIsInJlSXNOYXRpdmUiLCJSZWdFeHAiLCJzb3VyY2UiLCJ0ZXN0IiwiZXJyIiwiY2FuVXNlQ29sbGVjdGlvbnMiLCJmcm9tIiwiTWFwIiwia2V5cyIsIlNldCIsInNldEl0ZW0iLCJnZXRJdGVtIiwicmVtb3ZlSXRlbSIsImdldEl0ZW1JRHMiLCJhZGRSb290IiwicmVtb3ZlUm9vdCIsImdldFJvb3RJRHMiLCJpdGVtTWFwIiwicm9vdElEU2V0IiwiaWQiLCJpdGVtIiwic2V0IiwiYWRkIiwiaXRlbUJ5S2V5Iiwicm9vdEJ5S2V5IiwiZ2V0S2V5RnJvbUlEIiwiZ2V0SURGcm9tS2V5IiwicGFyc2VJbnQiLCJzdWJzdHIiLCJ1bm1vdW50ZWRJRHMiLCJwdXJnZURlZXAiLCJjaGlsZElEcyIsImRlc2NyaWJlQ29tcG9uZW50RnJhbWUiLCJvd25lck5hbWUiLCJmaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJnZXREaXNwbGF5TmFtZSIsImVsZW1lbnQiLCJ0eXBlIiwiZGVzY3JpYmVJRCIsIlJlYWN0Q29tcG9uZW50VHJlZUhvb2siLCJnZXRFbGVtZW50Iiwib3duZXJJRCIsImdldE93bmVySUQiLCJfc291cmNlIiwib25TZXRDaGlsZHJlbiIsIm5leHRDaGlsZElEcyIsIm5leHRDaGlsZElEIiwibmV4dENoaWxkIiwicGFyZW50SUQiLCJvbkJlZm9yZU1vdW50Q29tcG9uZW50IiwidXBkYXRlQ291bnQiLCJvbkJlZm9yZVVwZGF0ZUNvbXBvbmVudCIsIm9uTW91bnRDb21wb25lbnQiLCJpc1Jvb3QiLCJvblVwZGF0ZUNvbXBvbmVudCIsIm9uVW5tb3VudENvbXBvbmVudCIsInB1cmdlVW5tb3VudGVkQ29tcG9uZW50cyIsIl9wcmV2ZW50UHVyZ2luZyIsImdldEN1cnJlbnRTdGFja0FkZGVuZHVtIiwidG9wRWxlbWVudCIsIm93bmVyIiwiX293bmVyIiwiZ2V0TmFtZSIsImN1cnJlbnRPd25lciIsImN1cnJlbnQiLCJfZGVidWdJRCIsImdldFN0YWNrQWRkZW5kdW1CeUlEIiwiZ2V0UGFyZW50SUQiLCJnZXRDaGlsZElEcyIsImdldFNvdXJjZSIsImdldFRleHQiLCJnZXRVcGRhdGVDb3VudCIsImdldFJlZ2lzdGVyZWRJRHMiLCJjcmVhdGVET01GYWN0b3J5IiwiYWJiciIsImFkZHJlc3MiLCJhcmVhIiwiYXJ0aWNsZSIsImFzaWRlIiwiYXVkaW8iLCJiYXNlIiwiYmRpIiwiYmRvIiwiYmlnIiwiYmxvY2txdW90ZSIsImJvZHkiLCJiciIsImJ1dHRvbiIsImNhbnZhcyIsImNhcHRpb24iLCJjaXRlIiwiY29sIiwiY29sZ3JvdXAiLCJkYXRhIiwiZGF0YWxpc3QiLCJkZCIsImRlbCIsImRldGFpbHMiLCJkZm4iLCJkaWFsb2ciLCJkaXYiLCJkbCIsImR0IiwiZW0iLCJlbWJlZCIsImZpZWxkc2V0IiwiZmlnY2FwdGlvbiIsImZpZ3VyZSIsImZvb3RlciIsImZvcm0iLCJoMSIsImgyIiwiaDMiLCJoNCIsImg1IiwiaDYiLCJoZWFkIiwiaGVhZGVyIiwiaGdyb3VwIiwiaHIiLCJodG1sIiwiaWZyYW1lIiwiaW1nIiwiaW5wdXQiLCJpbnMiLCJrYmQiLCJrZXlnZW4iLCJsYWJlbCIsImxlZ2VuZCIsImxpIiwibGluayIsIm1haW4iLCJtYXJrIiwibWVudSIsIm1lbnVpdGVtIiwibWV0YSIsIm1ldGVyIiwibmF2Iiwibm9zY3JpcHQiLCJvYmplY3QiLCJvbCIsIm9wdGdyb3VwIiwib3B0aW9uIiwib3V0cHV0IiwicCIsInBhcmFtIiwicGljdHVyZSIsInByZSIsInByb2dyZXNzIiwicSIsInJwIiwicnQiLCJydWJ5Iiwic2FtcCIsInNjcmlwdCIsInNlY3Rpb24iLCJzZWxlY3QiLCJzbWFsbCIsInNwYW4iLCJzdHJvbmciLCJzdHlsZSIsInN1YiIsInN1bW1hcnkiLCJzdXAiLCJ0YWJsZSIsInRib2R5IiwidGQiLCJ0ZXh0YXJlYSIsInRmb290IiwidGgiLCJ0aGVhZCIsInRpbWUiLCJ0aXRsZSIsInRyIiwidHJhY2siLCJ1bCIsInZpZGVvIiwid2JyIiwiY2lyY2xlIiwiY2xpcFBhdGgiLCJkZWZzIiwiZWxsaXBzZSIsImltYWdlIiwibGluZSIsImxpbmVhckdyYWRpZW50IiwibWFzayIsInBhdGgiLCJwYXR0ZXJuIiwicG9seWdvbiIsInBvbHlsaW5lIiwicmFkaWFsR3JhZGllbnQiLCJyZWN0Iiwic3RvcCIsInN2ZyIsInRzcGFuIiwiUkVBQ1RfRUxFTUVOVF9UWVBFIiwiUkVTRVJWRURfUFJPUFMiLCJyZWYiLCJfX3NlbGYiLCJfX3NvdXJjZSIsInNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duIiwic3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24iLCJoYXNWYWxpZFJlZiIsImNvbmZpZyIsImdldHRlciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImlzUmVhY3RXYXJuaW5nIiwiaGFzVmFsaWRLZXkiLCJkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlciIsIndhcm5BYm91dEFjY2Vzc2luZ0tleSIsImNvbmZpZ3VyYWJsZSIsImRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyIiwid2FybkFib3V0QWNjZXNzaW5nUmVmIiwiJCR0eXBlb2YiLCJfc3RvcmUiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJ2YWx1ZSIsInZhbGlkYXRlZCIsIl9zZWxmIiwiZnJlZXplIiwiY2hpbGRyZW5MZW5ndGgiLCJjaGlsZEFycmF5IiwiZmFjdG9yeSIsIm9sZEVsZW1lbnQiLCJuZXdLZXkiLCJuZXdFbGVtZW50IiwiU3ltYm9sIiwiY2hlY2tSZWFjdFR5cGVTcGVjIiwiZ2V0SXRlcmF0b3JGbiIsImdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSIsIm93bmVySGFzS2V5VXNlV2FybmluZyIsImdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8iLCJwYXJlbnRUeXBlIiwicGFyZW50TmFtZSIsInZhbGlkYXRlRXhwbGljaXRLZXkiLCJtZW1vaXplciIsInVuaXF1ZUtleSIsImN1cnJlbnRDb21wb25lbnRFcnJvckluZm8iLCJjaGlsZE93bmVyIiwidmFsaWRhdGVDaGlsZEtleXMiLCJub2RlIiwiaXRlcmF0b3JGbiIsImVudHJpZXMiLCJpdGVyYXRvciIsInN0ZXAiLCJuZXh0IiwiZG9uZSIsInZhbGlkYXRlUHJvcFR5cGVzIiwiY29tcG9uZW50Q2xhc3MiLCJ2YWxpZFR5cGUiLCJ2YWxpZGF0ZWRGYWN0b3J5Iiwid2Fybk5vb3AiLCJwdWJsaWNJbnN0YW5jZSIsImNhbGxlck5hbWUiLCJjb21wbGV0ZVN0YXRlIiwicHJvcCIsImNoaWxkQ29udGV4dCIsIlJlYWN0UHJvcFR5cGVzU2VjcmV0IiwiQU5PTllNT1VTIiwiY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIiLCJib29sIiwibnVtYmVyIiwic3RyaW5nIiwic3ltYm9sIiwiYW55IiwiY3JlYXRlQW55VHlwZUNoZWNrZXIiLCJhcnJheU9mIiwiY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyIiwiY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyIiwiaW5zdGFuY2VPZiIsImNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIiLCJjcmVhdGVOb2RlQ2hlY2tlciIsIm9iamVjdE9mIiwiY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlciIsIm9uZU9mIiwiY3JlYXRlRW51bVR5cGVDaGVja2VyIiwib25lT2ZUeXBlIiwiY3JlYXRlVW5pb25UeXBlQ2hlY2tlciIsInNoYXBlIiwiY3JlYXRlU2hhcGVUeXBlQ2hlY2tlciIsImlzIiwieCIsInkiLCJQcm9wVHlwZUVycm9yIiwibWVzc2FnZSIsInN0YWNrIiwiY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIiLCJ2YWxpZGF0ZSIsIm1hbnVhbFByb3BUeXBlQ2FsbENhY2hlIiwiY2hlY2tUeXBlIiwiaXNSZXF1aXJlZCIsInByb3BGdWxsTmFtZSIsInNlY3JldCIsImNvbnNvbGUiLCJjYWNoZUtleSIsImxvY2F0aW9uTmFtZSIsImNoYWluZWRDaGVja1R5cGUiLCJleHBlY3RlZFR5cGUiLCJwcm9wVmFsdWUiLCJwcm9wVHlwZSIsImdldFByb3BUeXBlIiwicHJlY2lzZVR5cGUiLCJnZXRQcmVjaXNlVHlwZSIsInRoYXRSZXR1cm5zIiwidHlwZUNoZWNrZXIiLCJlcnJvciIsImV4cGVjdGVkQ2xhc3MiLCJleHBlY3RlZENsYXNzTmFtZSIsImFjdHVhbENsYXNzTmFtZSIsImdldENsYXNzTmFtZSIsImV4cGVjdGVkVmFsdWVzIiwidGhhdFJldHVybnNOdWxsIiwidmFsdWVzU3RyaW5nIiwiSlNPTiIsInN0cmluZ2lmeSIsImFycmF5T2ZUeXBlQ2hlY2tlcnMiLCJjaGVja2VyIiwiaXNOb2RlIiwic2hhcGVUeXBlcyIsImV2ZXJ5IiwiZW50cnkiLCJpc1N5bWJvbCIsIkRhdGUiLCJDb21wb25lbnREdW1teSIsImlzUHVyZVJlYWN0Q29tcG9uZW50IiwiUmVhY3RVTURFbnRyeSIsIl9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEIiwicHJvY2VzcyIsImVudiIsImxvZ2dlZFR5cGVGYWlsdXJlcyIsInR5cGVTcGVjcyIsInZhbHVlcyIsImRlYnVnSUQiLCJ0eXBlU3BlY05hbWUiLCJleCIsImNvbXBvbmVudFN0YWNrSW5mbyIsIklURVJBVE9SX1NZTUJPTCIsIkZBVVhfSVRFUkFUT1JfU1lNQk9MIiwibWF5YmVJdGVyYWJsZSIsInJlYWN0UHJvZEludmFyaWFudCIsImFyZ0NvdW50IiwiYXJnSWR4IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZnJhbWVzVG9Qb3AiLCJTRVBBUkFUT1IiLCJTVUJTRVBBUkFUT1IiLCJkaWRXYXJuQWJvdXRNYXBzIiwiZ2V0Q29tcG9uZW50S2V5IiwiaW5kZXgiLCJ0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbCIsIm5hbWVTb0ZhciIsIm5leHROYW1lIiwic3VidHJlZUNvdW50IiwibmV4dE5hbWVQcmVmaXgiLCJpaSIsIm1hcHNBc0NoaWxkcmVuQWRkZW5kdW0iLCJtYXBzQXNDaGlsZHJlbk93bmVyTmFtZSIsImFkZGVuZHVtIiwiX2lzUmVhY3RFbGVtZW50IiwiY2hpbGRyZW5TdHJpbmciLCJTdHJpbmciLCJqb2luIiwibWFrZUVtcHR5RnVuY3Rpb24iLCJhcmciLCJ0aGF0UmV0dXJuc0ZhbHNlIiwidGhhdFJldHVybnNUcnVlIiwidGhhdFJldHVybnNUaGlzIiwidmFsaWRhdGVGb3JtYXQiLCJmb3JtYXQiLCJjb25kaXRpb24iLCJkIiwiYXJnSW5kZXgiLCJwcmludFdhcm5pbmciLCJpbmRleE9mIiwiX2xlbjIiLCJfa2V5MiIsImNvbmNhdCIsInByb3BJc0VudW1lcmFibGUiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsInRvT2JqZWN0IiwidmFsIiwiVHlwZUVycm9yIiwic2hvdWxkVXNlTmF0aXZlIiwiYXNzaWduIiwidGVzdDEiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwidGVzdDIiLCJmcm9tQ2hhckNvZGUiLCJvcmRlcjIiLCJ0ZXN0MyIsInNwbGl0IiwibGV0dGVyIiwidGFyZ2V0IiwidG8iLCJzeW1ib2xzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUM7OztBQUdELENBQUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUMsTUFBRyxRQUFPQyxPQUFQLHlDQUFPQSxPQUFQLE9BQWlCLFFBQWpCLElBQTJCLE9BQU9DLE1BQVAsS0FBZ0IsV0FBOUMsRUFBMEQ7QUFBQ0EsV0FBT0QsT0FBUCxHQUFlRCxHQUFmO0FBQW1CLEdBQTlFLE1BQW1GLElBQUcsT0FBT0csTUFBUCxLQUFnQixVQUFoQixJQUE0QkEsT0FBT0MsR0FBdEMsRUFBMEM7QUFBQ0QsV0FBTyxFQUFQLEVBQVVILENBQVY7QUFBYSxHQUF4RCxNQUE0RDtBQUFDLFFBQUlLLENBQUosQ0FBTSxJQUFHLE9BQU9DLE1BQVAsS0FBZ0IsV0FBbkIsRUFBK0I7QUFBQ0QsVUFBRUMsTUFBRjtBQUFTLEtBQXpDLE1BQThDLElBQUcsT0FBT0MsTUFBUCxLQUFnQixXQUFuQixFQUErQjtBQUFDRixVQUFFRSxNQUFGO0FBQVMsS0FBekMsTUFBOEMsSUFBRyxPQUFP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O0FBRUEsZUFBSyxJQUFJYSxHQUFULElBQWdCK08sSUFBaEIsRUFBc0I7QUFDckIsZ0JBQUkxRixlQUFlekosSUFBZixDQUFvQm1QLElBQXBCLEVBQTBCL08sR0FBMUIsQ0FBSixFQUFvQztBQUNuQ29uQixpQkFBR3BuQixHQUFILElBQVUrTyxLQUFLL08sR0FBTCxDQUFWO0FBQ0E7QUFDRDs7QUFFRCxjQUFJZ08sT0FBT3NaLHFCQUFYLEVBQWtDO0FBQ2pDRCxzQkFBVXJaLE9BQU9zWixxQkFBUCxDQUE2QnZZLElBQTdCLENBQVY7QUFDQSxpQkFBSyxJQUFJdlAsSUFBSSxDQUFiLEVBQWdCQSxJQUFJNm5CLFFBQVF4bkIsTUFBNUIsRUFBb0NMLEdBQXBDLEVBQXlDO0FBQ3hDLGtCQUFJNG1CLGlCQUFpQnhtQixJQUFqQixDQUFzQm1QLElBQXRCLEVBQTRCc1ksUUFBUTduQixDQUFSLENBQTVCLENBQUosRUFBNkM7QUFDNUM0bkIsbUJBQUdDLFFBQVE3bkIsQ0FBUixDQUFILElBQWlCdVAsS0FBS3NZLFFBQVE3bkIsQ0FBUixDQUFMLENBQWpCO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7O0FBRUQsZUFBTzRuQixFQUFQO0FBQ0EsT0F6QkQ7QUEyQkMsS0FyRmUsRUFxRmQsRUFyRmMsQ0FubEh3eEIsRUFBM2IsRUF3cUh0VyxFQXhxSHNXLEVBd3FIblcsQ0FBQyxFQUFELENBeHFIbVcsRUF3cUg3VixFQXhxSDZWLENBQVA7QUF5cUhyVyxDQXpxSEQiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgLyoqXG4gICogUmVhY3QgdjE1LjQuMlxuICAqL1xuKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuUmVhY3QgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRXNjYXBlIGFuZCB3cmFwIGtleSBzbyBpdCBpcyBzYWZlIHRvIHVzZSBhcyBhIHJlYWN0aWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGJlIGVzY2FwZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBlc2NhcGVkIGtleS5cbiAqL1xuXG5mdW5jdGlvbiBlc2NhcGUoa2V5KSB7XG4gIHZhciBlc2NhcGVSZWdleCA9IC9bPTpdL2c7XG4gIHZhciBlc2NhcGVyTG9va3VwID0ge1xuICAgICc9JzogJz0wJyxcbiAgICAnOic6ICc9MidcbiAgfTtcbiAgdmFyIGVzY2FwZWRTdHJpbmcgPSAoJycgKyBrZXkpLnJlcGxhY2UoZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG5cbiAgcmV0dXJuICckJyArIGVzY2FwZWRTdHJpbmc7XG59XG5cbi8qKlxuICogVW5lc2NhcGUgYW5kIHVud3JhcCBrZXkgZm9yIGh1bWFuLXJlYWRhYmxlIGRpc3BsYXlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIHVuZXNjYXBlLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgdW5lc2NhcGVkIGtleS5cbiAqL1xuZnVuY3Rpb24gdW5lc2NhcGUoa2V5KSB7XG4gIHZhciB1bmVzY2FwZVJlZ2V4ID0gLyg9MHw9MikvZztcbiAgdmFyIHVuZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPTAnOiAnPScsXG4gICAgJz0yJzogJzonXG4gIH07XG4gIHZhciBrZXlTdWJzdHJpbmcgPSBrZXlbMF0gPT09ICcuJyAmJiBrZXlbMV0gPT09ICckJyA/IGtleS5zdWJzdHJpbmcoMikgOiBrZXkuc3Vic3RyaW5nKDEpO1xuXG4gIHJldHVybiAoJycgKyBrZXlTdWJzdHJpbmcpLnJlcGxhY2UodW5lc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIHVuZXNjYXBlckxvb2t1cFttYXRjaF07XG4gIH0pO1xufVxuXG52YXIgS2V5RXNjYXBlVXRpbHMgPSB7XG4gIGVzY2FwZTogZXNjYXBlLFxuICB1bmVzY2FwZTogdW5lc2NhcGVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5RXNjYXBlVXRpbHM7XG59LHt9XSwyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gX2RlcmVxXygyNCk7XG5cbnZhciBpbnZhcmlhbnQgPSBfZGVyZXFfKDI4KTtcblxuLyoqXG4gKiBTdGF0aWMgcG9vbGVycy4gU2V2ZXJhbCBjdXN0b20gdmVyc2lvbnMgZm9yIGVhY2ggcG90ZW50aWFsIG51bWJlciBvZlxuICogYXJndW1lbnRzLiBBIGNvbXBsZXRlbHkgZ2VuZXJpYyBwb29sZXIgaXMgZWFzeSB0byBpbXBsZW1lbnQsIGJ1dCB3b3VsZFxuICogcmVxdWlyZSBhY2Nlc3NpbmcgdGhlIGBhcmd1bWVudHNgIG9iamVjdC4gSW4gZWFjaCBvZiB0aGVzZSwgYHRoaXNgIHJlZmVycyB0b1xuICogdGhlIENsYXNzIGl0c2VsZiwgbm90IGFuIGluc3RhbmNlLiBJZiBhbnkgb3RoZXJzIGFyZSBuZWVkZWQsIHNpbXBseSBhZGQgdGhlbVxuICogaGVyZSwgb3IgaW4gdGhlaXIgb3duIGZpbGVzLlxuICovXG52YXIgb25lQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoY29weUZpZWxkc0Zyb20pIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgY29weUZpZWxkc0Zyb20pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGNvcHlGaWVsZHNGcm9tKTtcbiAgfVxufTtcblxudmFyIHR3b0FyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMikge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMik7XG4gIH1cbn07XG5cbnZhciB0aHJlZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMyk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyLCBhMyk7XG4gIH1cbn07XG5cbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyLCBhMywgYTQpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMywgYTQpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMsIGE0KTtcbiAgfVxufTtcblxudmFyIHN0YW5kYXJkUmVsZWFzZXIgPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgIShpbnN0YW5jZSBpbnN0YW5jZW9mIEtsYXNzKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnVHJ5aW5nIHRvIHJlbGVhc2UgYW4gaW5zdGFuY2UgaW50byBhIHBvb2wgb2YgYSBkaWZmZXJlbnQgdHlwZS4nKSA6IF9wcm9kSW52YXJpYW50KCcyNScpIDogdm9pZCAwO1xuICBpbnN0YW5jZS5kZXN0cnVjdG9yKCk7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoIDwgS2xhc3MucG9vbFNpemUpIHtcbiAgICBLbGFzcy5pbnN0YW5jZVBvb2wucHVzaChpbnN0YW5jZSk7XG4gIH1cbn07XG5cbnZhciBERUZBVUxUX1BPT0xfU0laRSA9IDEwO1xudmFyIERFRkFVTFRfUE9PTEVSID0gb25lQXJndW1lbnRQb29sZXI7XG5cbi8qKlxuICogQXVnbWVudHMgYENvcHlDb25zdHJ1Y3RvcmAgdG8gYmUgYSBwb29sYWJsZSBjbGFzcywgYXVnbWVudGluZyBvbmx5IHRoZSBjbGFzc1xuICogaXRzZWxmIChzdGF0aWNhbGx5KSBub3QgYWRkaW5nIGFueSBwcm90b3R5cGljYWwgZmllbGRzLiBBbnkgQ29weUNvbnN0cnVjdG9yXG4gKiB5b3UgZ2l2ZSB0aGlzIG1heSBoYXZlIGEgYHBvb2xTaXplYCBwcm9wZXJ0eSwgYW5kIHdpbGwgbG9vayBmb3IgYVxuICogcHJvdG90eXBpY2FsIGBkZXN0cnVjdG9yYCBvbiBpbnN0YW5jZXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gQ29weUNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVzZXQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwb29sZXIgQ3VzdG9taXphYmxlIHBvb2xlci5cbiAqL1xudmFyIGFkZFBvb2xpbmdUbyA9IGZ1bmN0aW9uIChDb3B5Q29uc3RydWN0b3IsIHBvb2xlcikge1xuICAvLyBDYXN0aW5nIGFzIGFueSBzbyB0aGF0IGZsb3cgaWdub3JlcyB0aGUgYWN0dWFsIGltcGxlbWVudGF0aW9uIGFuZCB0cnVzdHNcbiAgLy8gaXQgdG8gbWF0Y2ggdGhlIHR5cGUgd2UgZGVjbGFyZWRcbiAgdmFyIE5ld0tsYXNzID0gQ29weUNvbnN0cnVjdG9yO1xuICBOZXdLbGFzcy5pbnN0YW5jZVBvb2wgPSBbXTtcbiAgTmV3S2xhc3MuZ2V0UG9vbGVkID0gcG9vbGVyIHx8IERFRkFVTFRfUE9PTEVSO1xuICBpZiAoIU5ld0tsYXNzLnBvb2xTaXplKSB7XG4gICAgTmV3S2xhc3MucG9vbFNpemUgPSBERUZBVUxUX1BPT0xfU0laRTtcbiAgfVxuICBOZXdLbGFzcy5yZWxlYXNlID0gc3RhbmRhcmRSZWxlYXNlcjtcbiAgcmV0dXJuIE5ld0tsYXNzO1xufTtcblxudmFyIFBvb2xlZENsYXNzID0ge1xuICBhZGRQb29saW5nVG86IGFkZFBvb2xpbmdUbyxcbiAgb25lQXJndW1lbnRQb29sZXI6IG9uZUFyZ3VtZW50UG9vbGVyLFxuICB0d29Bcmd1bWVudFBvb2xlcjogdHdvQXJndW1lbnRQb29sZXIsXG4gIHRocmVlQXJndW1lbnRQb29sZXI6IHRocmVlQXJndW1lbnRQb29sZXIsXG4gIGZvdXJBcmd1bWVudFBvb2xlcjogZm91ckFyZ3VtZW50UG9vbGVyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvb2xlZENsYXNzO1xufSx7XCIyNFwiOjI0LFwiMjhcIjoyOH1dLDM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSBfZGVyZXFfKDMwKTtcblxudmFyIFJlYWN0Q2hpbGRyZW4gPSBfZGVyZXFfKDQpO1xudmFyIFJlYWN0Q29tcG9uZW50ID0gX2RlcmVxXyg2KTtcbnZhciBSZWFjdFB1cmVDb21wb25lbnQgPSBfZGVyZXFfKDE3KTtcbnZhciBSZWFjdENsYXNzID0gX2RlcmVxXyg1KTtcbnZhciBSZWFjdERPTUZhY3RvcmllcyA9IF9kZXJlcV8oOSk7XG52YXIgUmVhY3RFbGVtZW50ID0gX2RlcmVxXygxMCk7XG52YXIgUmVhY3RQcm9wVHlwZXMgPSBfZGVyZXFfKDE1KTtcbnZhciBSZWFjdFZlcnNpb24gPSBfZGVyZXFfKDE5KTtcblxudmFyIG9ubHlDaGlsZCA9IF9kZXJlcV8oMjMpO1xudmFyIHdhcm5pbmcgPSBfZGVyZXFfKDI5KTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudDtcbnZhciBjcmVhdGVGYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3Rvcnk7XG52YXIgY2xvbmVFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudDtcblxuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSBfZGVyZXFfKDEyKTtcbiAgY3JlYXRlRWxlbWVudCA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50O1xuICBjcmVhdGVGYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUZhY3Rvcnk7XG4gIGNsb25lRWxlbWVudCA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jbG9uZUVsZW1lbnQ7XG59XG5cbnZhciBfX3NwcmVhZCA9IF9hc3NpZ247XG5cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIF9fc3ByZWFkID0gZnVuY3Rpb24gKCkge1xuICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh3YXJuZWQsICdSZWFjdC5fX3NwcmVhZCBpcyBkZXByZWNhdGVkIGFuZCBzaG91bGQgbm90IGJlIHVzZWQuIFVzZSAnICsgJ09iamVjdC5hc3NpZ24gZGlyZWN0bHkgb3IgYW5vdGhlciBoZWxwZXIgZnVuY3Rpb24gd2l0aCBzaW1pbGFyICcgKyAnc2VtYW50aWNzLiBZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIHlvdXIgY29tcGlsZXIuICcgKyAnU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtc3ByZWFkLWRlcHJlY2F0aW9uIGZvciBtb3JlIGRldGFpbHMuJykgOiB2b2lkIDA7XG4gICAgd2FybmVkID0gdHJ1ZTtcbiAgICByZXR1cm4gX2Fzc2lnbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG52YXIgUmVhY3QgPSB7XG5cbiAgLy8gTW9kZXJuXG5cbiAgQ2hpbGRyZW46IHtcbiAgICBtYXA6IFJlYWN0Q2hpbGRyZW4ubWFwLFxuICAgIGZvckVhY2g6IFJlYWN0Q2hpbGRyZW4uZm9yRWFjaCxcbiAgICBjb3VudDogUmVhY3RDaGlsZHJlbi5jb3VudCxcbiAgICB0b0FycmF5OiBSZWFjdENoaWxkcmVuLnRvQXJyYXksXG4gICAgb25seTogb25seUNoaWxkXG4gIH0sXG5cbiAgQ29tcG9uZW50OiBSZWFjdENvbXBvbmVudCxcbiAgUHVyZUNvbXBvbmVudDogUmVhY3RQdXJlQ29tcG9uZW50LFxuXG4gIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gIGNsb25lRWxlbWVudDogY2xvbmVFbGVtZW50LFxuICBpc1ZhbGlkRWxlbWVudDogUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50LFxuXG4gIC8vIENsYXNzaWNcblxuICBQcm9wVHlwZXM6IFJlYWN0UHJvcFR5cGVzLFxuICBjcmVhdGVDbGFzczogUmVhY3RDbGFzcy5jcmVhdGVDbGFzcyxcbiAgY3JlYXRlRmFjdG9yeTogY3JlYXRlRmFjdG9yeSxcbiAgY3JlYXRlTWl4aW46IGZ1bmN0aW9uIChtaXhpbikge1xuICAgIC8vIEN1cnJlbnRseSBhIG5vb3AuIFdpbGwgYmUgdXNlZCB0byB2YWxpZGF0ZSBhbmQgdHJhY2UgbWl4aW5zLlxuICAgIHJldHVybiBtaXhpbjtcbiAgfSxcblxuICAvLyBUaGlzIGxvb2tzIERPTSBzcGVjaWZpYyBidXQgdGhlc2UgYXJlIGFjdHVhbGx5IGlzb21vcnBoaWMgaGVscGVyc1xuICAvLyBzaW5jZSB0aGV5IGFyZSBqdXN0IGdlbmVyYXRpbmcgRE9NIHN0cmluZ3MuXG4gIERPTTogUmVhY3RET01GYWN0b3JpZXMsXG5cbiAgdmVyc2lvbjogUmVhY3RWZXJzaW9uLFxuXG4gIC8vIERlcHJlY2F0ZWQgaG9vayBmb3IgSlNYIHNwcmVhZCwgZG9uJ3QgdXNlIHRoaXMgZm9yIGFueXRoaW5nLlxuICBfX3NwcmVhZDogX19zcHJlYWRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG59LHtcIjEwXCI6MTAsXCIxMlwiOjEyLFwiMTVcIjoxNSxcIjE3XCI6MTcsXCIxOVwiOjE5LFwiMjNcIjoyMyxcIjI5XCI6MjksXCIzMFwiOjMwLFwiNFwiOjQsXCI1XCI6NSxcIjZcIjo2LFwiOVwiOjl9XSw0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBQb29sZWRDbGFzcyA9IF9kZXJlcV8oMik7XG52YXIgUmVhY3RFbGVtZW50ID0gX2RlcmVxXygxMCk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gX2RlcmVxXygyNik7XG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IF9kZXJlcV8oMjUpO1xuXG52YXIgdHdvQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy50d29Bcmd1bWVudFBvb2xlcjtcbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy5mb3VyQXJndW1lbnRQb29sZXI7XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8rL2c7XG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogdHJhdmVyc2FsLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIEZvckVhY2hCb29rS2VlcGluZ1xuICogQHBhcmFtIHshZnVuY3Rpb259IGZvckVhY2hGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIHRyYXZlcnNhbCB3aXRoLlxuICogQHBhcmFtIHs/Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIGNvbnRleHQgd2l0aC5cbiAqL1xuZnVuY3Rpb24gRm9yRWFjaEJvb2tLZWVwaW5nKGZvckVhY2hGdW5jdGlvbiwgZm9yRWFjaENvbnRleHQpIHtcbiAgdGhpcy5mdW5jID0gZm9yRWFjaEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBmb3JFYWNoQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5Gb3JFYWNoQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhGb3JFYWNoQm9va0tlZXBpbmcsIHR3b0FyZ3VtZW50UG9vbGVyKTtcblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5mb3JlYWNoXG4gKlxuICogVGhlIHByb3ZpZGVkIGZvckVhY2hGdW5jKGNoaWxkLCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZvckVhY2hGdW5jXG4gKiBAcGFyYW0geyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgZm9yIGZvckVhY2hDb250ZXh0LlxuICovXG5mdW5jdGlvbiBmb3JFYWNoQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gRm9yRWFjaEJvb2tLZWVwaW5nLmdldFBvb2xlZChmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIEZvckVhY2hCb29rS2VlcGluZy5yZWxlYXNlKHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogUG9vbGVkQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBib29ra2VlcGluZyBhc3NvY2lhdGVkIHdpdGggcGVyZm9ybWluZyBhIGNoaWxkXG4gKiBtYXBwaW5nLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIE1hcEJvb2tLZWVwaW5nXG4gKiBAcGFyYW0geyEqfSBtYXBSZXN1bHQgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gbWFwRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKiBAcGFyYW0gez8qfSBtYXBDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKi9cbmZ1bmN0aW9uIE1hcEJvb2tLZWVwaW5nKG1hcFJlc3VsdCwga2V5UHJlZml4LCBtYXBGdW5jdGlvbiwgbWFwQ29udGV4dCkge1xuICB0aGlzLnJlc3VsdCA9IG1hcFJlc3VsdDtcbiAgdGhpcy5rZXlQcmVmaXggPSBrZXlQcmVmaXg7XG4gIHRoaXMuZnVuYyA9IG1hcEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBtYXBDb250ZXh0O1xuICB0aGlzLmNvdW50ID0gMDtcbn1cbk1hcEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlc3VsdCA9IG51bGw7XG4gIHRoaXMua2V5UHJlZml4ID0gbnVsbDtcbiAgdGhpcy5mdW5jID0gbnVsbDtcbiAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgdGhpcy5jb3VudCA9IDA7XG59O1xuUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKE1hcEJvb2tLZWVwaW5nLCBmb3VyQXJndW1lbnRQb29sZXIpO1xuXG5mdW5jdGlvbiBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0KGJvb2tLZWVwaW5nLCBjaGlsZCwgY2hpbGRLZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGJvb2tLZWVwaW5nLnJlc3VsdCxcbiAgICAgIGtleVByZWZpeCA9IGJvb2tLZWVwaW5nLmtleVByZWZpeCxcbiAgICAgIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jLFxuICAgICAgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cblxuICB2YXIgbWFwcGVkQ2hpbGQgPSBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xuICBpZiAoQXJyYXkuaXNBcnJheShtYXBwZWRDaGlsZCkpIHtcbiAgICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKG1hcHBlZENoaWxkLCByZXN1bHQsIGNoaWxkS2V5LCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKG1hcHBlZENoaWxkICE9IG51bGwpIHtcbiAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBSZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5KG1hcHBlZENoaWxkLFxuICAgICAgLy8gS2VlcCBib3RoIHRoZSAobWFwcGVkKSBhbmQgb2xkIGtleXMgaWYgdGhleSBkaWZmZXIsIGp1c3QgYXNcbiAgICAgIC8vIHRyYXZlcnNlQWxsQ2hpbGRyZW4gdXNlZCB0byBkbyBmb3Igb2JqZWN0cyBhcyBjaGlsZHJlblxuICAgICAga2V5UHJlZml4ICsgKG1hcHBlZENoaWxkLmtleSAmJiAoIWNoaWxkIHx8IGNoaWxkLmtleSAhPT0gbWFwcGVkQ2hpbGQua2V5KSA/IGVzY2FwZVVzZXJQcm92aWRlZEtleShtYXBwZWRDaGlsZC5rZXkpICsgJy8nIDogJycpICsgY2hpbGRLZXkpO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChtYXBwZWRDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgYXJyYXksIHByZWZpeCwgZnVuYywgY29udGV4dCkge1xuICB2YXIgZXNjYXBlZFByZWZpeCA9ICcnO1xuICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICBlc2NhcGVkUHJlZml4ID0gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHByZWZpeCkgKyAnLyc7XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IE1hcEJvb2tLZWVwaW5nLmdldFBvb2xlZChhcnJheSwgZXNjYXBlZFByZWZpeCwgZnVuYywgY29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIE1hcEJvb2tLZWVwaW5nLnJlbGVhc2UodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBNYXBzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ubWFwXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBrZXksIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZnVuYyBUaGUgbWFwIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IENvbnRleHQgZm9yIG1hcEZ1bmN0aW9uLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmMsIGNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmMsIGNvbnRleHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGREdW1teSh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkLCBuYW1lKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uY291bnRcbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbiwgY29udGV4dCkge1xuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXksIG51bGwpO1xufVxuXG4vKipcbiAqIEZsYXR0ZW4gYSBjaGlsZHJlbiBvYmplY3QgKHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCkgYW5kXG4gKiByZXR1cm4gYW4gYXJyYXkgd2l0aCBhcHByb3ByaWF0ZWx5IHJlLWtleWVkIGNoaWxkcmVuLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi50b2FycmF5XG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBSZWFjdENoaWxkcmVuID0ge1xuICBmb3JFYWNoOiBmb3JFYWNoQ2hpbGRyZW4sXG4gIG1hcDogbWFwQ2hpbGRyZW4sXG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWw6IG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwsXG4gIGNvdW50OiBjb3VudENoaWxkcmVuLFxuICB0b0FycmF5OiB0b0FycmF5XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2hpbGRyZW47XG59LHtcIjEwXCI6MTAsXCIyXCI6MixcIjI1XCI6MjUsXCIyNlwiOjI2fV0sNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSBfZGVyZXFfKDI0KSxcbiAgICBfYXNzaWduID0gX2RlcmVxXygzMCk7XG5cbnZhciBSZWFjdENvbXBvbmVudCA9IF9kZXJlcV8oNik7XG52YXIgUmVhY3RFbGVtZW50ID0gX2RlcmVxXygxMCk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSBfZGVyZXFfKDE0KTtcbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IF9kZXJlcV8oMTMpO1xuXG52YXIgZW1wdHlPYmplY3QgPSBfZGVyZXFfKDI3KTtcbnZhciBpbnZhcmlhbnQgPSBfZGVyZXFfKDI4KTtcbnZhciB3YXJuaW5nID0gX2RlcmVxXygyOSk7XG5cbnZhciBNSVhJTlNfS0VZID0gJ21peGlucyc7XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBhbGxvdyB0aGUgY3JlYXRpb24gb2YgYW5vbnltb3VzIGZ1bmN0aW9ucyB3aGljaCBkbyBub3Rcbi8vIGhhdmUgLm5hbWUgc2V0IHRvIHRoZSBuYW1lIG9mIHRoZSB2YXJpYWJsZSBiZWluZyBhc3NpZ25lZCB0by5cbmZ1bmN0aW9uIGlkZW50aXR5KGZuKSB7XG4gIHJldHVybiBmbjtcbn1cblxuLyoqXG4gKiBQb2xpY2llcyB0aGF0IGRlc2NyaWJlIG1ldGhvZHMgaW4gYFJlYWN0Q2xhc3NJbnRlcmZhY2VgLlxuICovXG5cblxudmFyIGluamVjdGVkTWl4aW5zID0gW107XG5cbi8qKlxuICogQ29tcG9zaXRlIGNvbXBvbmVudHMgYXJlIGhpZ2hlci1sZXZlbCBjb21wb25lbnRzIHRoYXQgY29tcG9zZSBvdGhlciBjb21wb3NpdGVcbiAqIG9yIGhvc3QgY29tcG9uZW50cy5cbiAqXG4gKiBUbyBjcmVhdGUgYSBuZXcgdHlwZSBvZiBgUmVhY3RDbGFzc2AsIHBhc3MgYSBzcGVjaWZpY2F0aW9uIG9mXG4gKiB5b3VyIG5ldyBjbGFzcyB0byBgUmVhY3QuY3JlYXRlQ2xhc3NgLiBUaGUgb25seSByZXF1aXJlbWVudCBvZiB5b3VyIGNsYXNzXG4gKiBzcGVjaWZpY2F0aW9uIGlzIHRoYXQgeW91IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC5cbiAqXG4gKiAgIHZhciBNeUNvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICogICAgICAgcmV0dXJuIDxkaXY+SGVsbG8gV29ybGQ8L2Rpdj47XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBUaGUgY2xhc3Mgc3BlY2lmaWNhdGlvbiBzdXBwb3J0cyBhIHNwZWNpZmljIHByb3RvY29sIG9mIG1ldGhvZHMgdGhhdCBoYXZlXG4gKiBzcGVjaWFsIG1lYW5pbmcgKGUuZy4gYHJlbmRlcmApLiBTZWUgYFJlYWN0Q2xhc3NJbnRlcmZhY2VgIGZvclxuICogbW9yZSB0aGUgY29tcHJlaGVuc2l2ZSBwcm90b2NvbC4gQW55IG90aGVyIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgaW4gdGhlXG4gKiBjbGFzcyBzcGVjaWZpY2F0aW9uIHdpbGwgYmUgYXZhaWxhYmxlIG9uIHRoZSBwcm90b3R5cGUuXG4gKlxuICogQGludGVyZmFjZSBSZWFjdENsYXNzSW50ZXJmYWNlXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0Q2xhc3NJbnRlcmZhY2UgPSB7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIE1peGluIG9iamVjdHMgdG8gaW5jbHVkZSB3aGVuIGRlZmluaW5nIHlvdXIgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7YXJyYXl9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgbWl4aW5zOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIHRoYXQgc2hvdWxkIGJlIGRlZmluZWQgb25cbiAgICogdGhlIGNvbXBvbmVudCdzIGNvbnN0cnVjdG9yIGluc3RlYWQgb2YgaXRzIHByb3RvdHlwZSAoc3RhdGljIG1ldGhvZHMpLlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHN0YXRpY3M6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgcHJvcCB0eXBlcyBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgcHJvcFR5cGVzOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIGNvbnRleHQgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbnRleHRUeXBlczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBjb250ZXh0IHR5cGVzIHRoaXMgY29tcG9uZW50IHNldHMgZm9yIGl0cyBjaGlsZHJlbi5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjaGlsZENvbnRleHRUeXBlczogJ0RFRklORV9NQU5ZJyxcblxuICAvLyA9PT09IERlZmluaXRpb24gbWV0aG9kcyA9PT09XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFZhbHVlcyBpbiB0aGUgbWFwcGluZyB3aWxsIGJlIHNldCBvblxuICAgKiBgdGhpcy5wcm9wc2AgaWYgdGhhdCBwcm9wIGlzIG5vdCBzcGVjaWZpZWQgKGkuZS4gdXNpbmcgYW4gYGluYCBjaGVjaykuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgYmVmb3JlIGBnZXRJbml0aWFsU3RhdGVgIGFuZCB0aGVyZWZvcmUgY2Fubm90IHJlbHlcbiAgICogb24gYHRoaXMuc3RhdGVgIG9yIHVzZSBgdGhpcy5zZXRTdGF0ZWAuXG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXREZWZhdWx0UHJvcHM6ICdERUZJTkVfTUFOWV9NRVJHRUQnLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIG9uY2UgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC4gVGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWRcbiAgICogYXMgdGhlIGluaXRpYWwgdmFsdWUgb2YgYHRoaXMuc3RhdGVgLlxuICAgKlxuICAgKiAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAqICAgICByZXR1cm4ge1xuICAgKiAgICAgICBpc09uOiBmYWxzZSxcbiAgICogICAgICAgZm9vQmF6OiBuZXcgQmF6Rm9vKClcbiAgICogICAgIH1cbiAgICogICB9XG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXRJbml0aWFsU3RhdGU6ICdERUZJTkVfTUFOWV9NRVJHRUQnLFxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0Q2hpbGRDb250ZXh0OiAnREVGSU5FX01BTllfTUVSR0VEJyxcblxuICAvKipcbiAgICogVXNlcyBwcm9wcyBmcm9tIGB0aGlzLnByb3BzYCBhbmQgc3RhdGUgZnJvbSBgdGhpcy5zdGF0ZWAgdG8gcmVuZGVyIHRoZVxuICAgKiBzdHJ1Y3R1cmUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogTm8gZ3VhcmFudGVlcyBhcmUgbWFkZSBhYm91dCB3aGVuIG9yIGhvdyBvZnRlbiB0aGlzIG1ldGhvZCBpcyBpbnZva2VkLCBzb1xuICAgKiBpdCBtdXN0IG5vdCBoYXZlIHNpZGUgZWZmZWN0cy5cbiAgICpcbiAgICogICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLm5hbWU7XG4gICAqICAgICByZXR1cm4gPGRpdj5IZWxsbywge25hbWV9ITwvZGl2PjtcbiAgICogICB9XG4gICAqXG4gICAqIEByZXR1cm4ge1JlYWN0Q29tcG9uZW50fVxuICAgKiBAbm9zaWRlZWZmZWN0c1xuICAgKiBAcmVxdWlyZWRcbiAgICovXG4gIHJlbmRlcjogJ0RFRklORV9PTkNFJyxcblxuICAvLyA9PT09IERlbGVnYXRlIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsbHkgY3JlYXRlZCBhbmQgYWJvdXQgdG8gYmUgbW91bnRlZC5cbiAgICogVGhpcyBtYXkgaGF2ZSBzaWRlIGVmZmVjdHMsIGJ1dCBhbnkgZXh0ZXJuYWwgc3Vic2NyaXB0aW9ucyBvciBkYXRhIGNyZWF0ZWRcbiAgICogYnkgdGhpcyBtZXRob2QgbXVzdCBiZSBjbGVhbmVkIHVwIGluIGBjb21wb25lbnRXaWxsVW5tb3VudGAuXG4gICAqXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50OiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBtb3VudGVkIGFuZCBoYXMgYSBET00gcmVwcmVzZW50YXRpb24uXG4gICAqIEhvd2V2ZXIsIHRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IHRoZSBET00gbm9kZSBpcyBpbiB0aGUgZG9jdW1lbnQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAqIGJlZW4gbW91bnRlZCAoaW5pdGlhbGl6ZWQgYW5kIHJlbmRlcmVkKSBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50RGlkTW91bnQ6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgYmVmb3JlIHRoZSBjb21wb25lbnQgcmVjZWl2ZXMgbmV3IHByb3BzLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byByZWFjdCB0byBhIHByb3AgdHJhbnNpdGlvbiBieSB1cGRhdGluZyB0aGVcbiAgICogc3RhdGUgdXNpbmcgYHRoaXMuc2V0U3RhdGVgLiBDdXJyZW50IHByb3BzIGFyZSBhY2Nlc3NlZCB2aWEgYHRoaXMucHJvcHNgLlxuICAgKlxuICAgKiAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dENvbnRleHQpIHtcbiAgICogICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgKiAgICAgICBsaWtlc0luY3JlYXNpbmc6IG5leHRQcm9wcy5saWtlQ291bnQgPiB0aGlzLnByb3BzLmxpa2VDb3VudFxuICAgKiAgICAgfSk7XG4gICAqICAgfVxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBlcXVpdmFsZW50IGBjb21wb25lbnRXaWxsUmVjZWl2ZVN0YXRlYC4gQW4gaW5jb21pbmcgcHJvcFxuICAgKiB0cmFuc2l0aW9uIG1heSBjYXVzZSBhIHN0YXRlIGNoYW5nZSwgYnV0IHRoZSBvcHBvc2l0ZSBpcyBub3QgdHJ1ZS4gSWYgeW91XG4gICAqIG5lZWQgaXQsIHlvdSBhcmUgcHJvYmFibHkgbG9va2luZyBmb3IgYGNvbXBvbmVudFdpbGxVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGlsZSBkZWNpZGluZyBpZiB0aGUgY29tcG9uZW50IHNob3VsZCBiZSB1cGRhdGVkIGFzIGEgcmVzdWx0IG9mXG4gICAqIHJlY2VpdmluZyBuZXcgcHJvcHMsIHN0YXRlIGFuZC9vciBjb250ZXh0LlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBgcmV0dXJuIGZhbHNlYCB3aGVuIHlvdSdyZSBjZXJ0YWluIHRoYXQgdGhlXG4gICAqIHRyYW5zaXRpb24gdG8gdGhlIG5ldyBwcm9wcy9zdGF0ZS9jb250ZXh0IHdpbGwgbm90IHJlcXVpcmUgYSBjb21wb25lbnRcbiAgICogdXBkYXRlLlxuICAgKlxuICAgKiAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KSB7XG4gICAqICAgICByZXR1cm4gIWVxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHxcbiAgICogICAgICAgIWVxdWFsKG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSkgfHxcbiAgICogICAgICAgIWVxdWFsKG5leHRDb250ZXh0LCB0aGlzLmNvbnRleHQpO1xuICAgKiAgIH1cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRDb250ZXh0XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgdXBkYXRlLlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZTogJ0RFRklORV9PTkNFJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgYWJvdXQgdG8gdXBkYXRlIGR1ZSB0byBhIHRyYW5zaXRpb24gZnJvbVxuICAgKiBgdGhpcy5wcm9wc2AsIGB0aGlzLnN0YXRlYCBhbmQgYHRoaXMuY29udGV4dGAgdG8gYG5leHRQcm9wc2AsIGBuZXh0U3RhdGVgXG4gICAqIGFuZCBgbmV4dENvbnRleHRgLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBwZXJmb3JtIHByZXBhcmF0aW9uIGJlZm9yZSBhbiB1cGRhdGUgb2NjdXJzLlxuICAgKlxuICAgKiBOT1RFOiBZb3UgKipjYW5ub3QqKiB1c2UgYHRoaXMuc2V0U3RhdGUoKWAgaW4gdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVwZGF0ZTogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQncyBET00gcmVwcmVzZW50YXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gb3BlcmF0ZSBvbiB0aGUgRE9NIHdoZW4gdGhlIGNvbXBvbmVudCBoYXNcbiAgICogYmVlbiB1cGRhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJldlByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldlN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldkNvbnRleHRcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSByb290Tm9kZSBET00gZWxlbWVudCByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudC5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnREaWRVcGRhdGU6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIGJlIHJlbW92ZWQgZnJvbSBpdHMgcGFyZW50IGFuZCBoYXZlXG4gICAqIGl0cyBET00gcmVwcmVzZW50YXRpb24gZGVzdHJveWVkLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBkZWFsbG9jYXRlIGFueSBleHRlcm5hbCByZXNvdXJjZXMuXG4gICAqXG4gICAqIE5PVEU6IFRoZXJlIGlzIG5vIGBjb21wb25lbnREaWRVbm1vdW50YCBzaW5jZSB5b3VyIGNvbXBvbmVudCB3aWxsIGhhdmUgYmVlblxuICAgKiBkZXN0cm95ZWQgYnkgdGhhdCBwb2ludC5cbiAgICpcbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsVW5tb3VudDogJ0RFRklORV9NQU5ZJyxcblxuICAvLyA9PT09IEFkdmFuY2VkIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjb21wb25lbnQncyBjdXJyZW50bHkgbW91bnRlZCBET00gcmVwcmVzZW50YXRpb24uXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoaXMgaW1wbGVtZW50cyBSZWFjdCdzIHJlbmRlcmluZyBhbmQgcmVjb25jaWxpYXRpb24gYWxnb3JpdGhtLlxuICAgKiBTb3BoaXN0aWNhdGVkIGNsaWVudHMgbWF5IHdpc2ggdG8gb3ZlcnJpZGUgdGhpcy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAaW50ZXJuYWxcbiAgICogQG92ZXJyaWRhYmxlXG4gICAqL1xuICB1cGRhdGVDb21wb25lbnQ6ICdPVkVSUklERV9CQVNFJ1xuXG59O1xuXG4vKipcbiAqIE1hcHBpbmcgZnJvbSBjbGFzcyBzcGVjaWZpY2F0aW9uIGtleXMgdG8gc3BlY2lhbCBwcm9jZXNzaW5nIGZ1bmN0aW9ucy5cbiAqXG4gKiBBbHRob3VnaCB0aGVzZSBhcmUgZGVjbGFyZWQgbGlrZSBpbnN0YW5jZSBwcm9wZXJ0aWVzIGluIHRoZSBzcGVjaWZpY2F0aW9uXG4gKiB3aGVuIGRlZmluaW5nIGNsYXNzZXMgdXNpbmcgYFJlYWN0LmNyZWF0ZUNsYXNzYCwgdGhleSBhcmUgYWN0dWFsbHkgc3RhdGljXG4gKiBhbmQgYXJlIGFjY2Vzc2libGUgb24gdGhlIGNvbnN0cnVjdG9yIGluc3RlYWQgb2YgdGhlIHByb3RvdHlwZS4gRGVzcGl0ZVxuICogYmVpbmcgc3RhdGljLCB0aGV5IG11c3QgYmUgZGVmaW5lZCBvdXRzaWRlIG9mIHRoZSBcInN0YXRpY3NcIiBrZXkgdW5kZXJcbiAqIHdoaWNoIGFsbCBvdGhlciBzdGF0aWMgbWV0aG9kcyBhcmUgZGVmaW5lZC5cbiAqL1xudmFyIFJFU0VSVkVEX1NQRUNfS0VZUyA9IHtcbiAgZGlzcGxheU5hbWU6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgZGlzcGxheU5hbWUpIHtcbiAgICBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICB9LFxuICBtaXhpbnM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgbWl4aW5zKSB7XG4gICAgaWYgKG1peGlucykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaXhpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIG1peGluc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjaGlsZENvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcykge1xuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcywgJ2NoaWxkQ29udGV4dCcpO1xuICAgIH1cbiAgICBDb25zdHJ1Y3Rvci5jaGlsZENvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzLCBjaGlsZENvbnRleHRUeXBlcyk7XG4gIH0sXG4gIGNvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMpIHtcbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhbGlkYXRlVHlwZURlZihDb25zdHJ1Y3RvciwgY29udGV4dFR5cGVzLCAnY29udGV4dCcpO1xuICAgIH1cbiAgICBDb25zdHJ1Y3Rvci5jb250ZXh0VHlwZXMgPSBfYXNzaWduKHt9LCBDb25zdHJ1Y3Rvci5jb250ZXh0VHlwZXMsIGNvbnRleHRUeXBlcyk7XG4gIH0sXG4gIC8qKlxuICAgKiBTcGVjaWFsIGNhc2UgZ2V0RGVmYXVsdFByb3BzIHdoaWNoIHNob3VsZCBtb3ZlIGludG8gc3RhdGljcyBidXQgcmVxdWlyZXNcbiAgICogYXV0b21hdGljIG1lcmdpbmcuXG4gICAqL1xuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgaWYgKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcykge1xuICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzID0gY3JlYXRlTWVyZ2VkUmVzdWx0RnVuY3Rpb24oQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzLCBnZXREZWZhdWx0UHJvcHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMgPSBnZXREZWZhdWx0UHJvcHM7XG4gICAgfVxuICB9LFxuICBwcm9wVHlwZXM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvcFR5cGVzKSB7XG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHByb3BUeXBlcywgJ3Byb3AnKTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IucHJvcFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IucHJvcFR5cGVzLCBwcm9wVHlwZXMpO1xuICB9LFxuICBzdGF0aWNzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHN0YXRpY3MpIHtcbiAgICBtaXhTdGF0aWNTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3RhdGljcyk7XG4gIH0sXG4gIGF1dG9iaW5kOiBmdW5jdGlvbiAoKSB7fSB9O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHR5cGVEZWYsIGxvY2F0aW9uKSB7XG4gIGZvciAodmFyIHByb3BOYW1lIGluIHR5cGVEZWYpIHtcbiAgICBpZiAodHlwZURlZi5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgIC8vIHVzZSBhIHdhcm5pbmcgaW5zdGVhZCBvZiBhbiBpbnZhcmlhbnQgc28gY29tcG9uZW50c1xuICAgICAgLy8gZG9uJ3Qgc2hvdyB1cCBpbiBwcm9kIGJ1dCBvbmx5IGluIF9fREVWX19cbiAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgdHlwZURlZltwcm9wTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAnUmVhY3QuUHJvcFR5cGVzLicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUoaXNBbHJlYWR5RGVmaW5lZCwgbmFtZSkge1xuICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2UuaGFzT3duUHJvcGVydHkobmFtZSkgPyBSZWFjdENsYXNzSW50ZXJmYWNlW25hbWVdIDogbnVsbDtcblxuICAvLyBEaXNhbGxvdyBvdmVycmlkaW5nIG9mIGJhc2UgY2xhc3MgbWV0aG9kcyB1bmxlc3MgZXhwbGljaXRseSBhbGxvd2VkLlxuICBpZiAoUmVhY3RDbGFzc01peGluLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgIShzcGVjUG9saWN5ID09PSAnT1ZFUlJJREVfQkFTRScpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzSW50ZXJmYWNlOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gb3ZlcnJpZGUgYCVzYCBmcm9tIHlvdXIgY2xhc3Mgc3BlY2lmaWNhdGlvbi4gRW5zdXJlIHRoYXQgeW91ciBtZXRob2QgbmFtZXMgZG8gbm90IG92ZXJsYXAgd2l0aCBSZWFjdCBtZXRob2RzLicsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzczJywgbmFtZSkgOiB2b2lkIDA7XG4gIH1cblxuICAvLyBEaXNhbGxvdyBkZWZpbmluZyBtZXRob2RzIG1vcmUgdGhhbiBvbmNlIHVubGVzcyBleHBsaWNpdGx5IGFsbG93ZWQuXG4gIGlmIChpc0FscmVhZHlEZWZpbmVkKSB7XG4gICAgIShzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTlknIHx8IHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWV9NRVJHRUQnKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzc0ludGVyZmFjZTogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgdG8gYSBtaXhpbi4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3NCcsIG5hbWUpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogTWl4aW4gaGVscGVyIHdoaWNoIGhhbmRsZXMgcG9saWN5IHZhbGlkYXRpb24gYW5kIHJlc2VydmVkXG4gKiBzcGVjaWZpY2F0aW9uIGtleXMgd2hlbiBidWlsZGluZyBSZWFjdCBjbGFzc2VzLlxuICovXG5mdW5jdGlvbiBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3BlYykge1xuICBpZiAoIXNwZWMpIHtcbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB0eXBlb2ZTcGVjID0gdHlwZW9mIHNwZWM7XG4gICAgICB2YXIgaXNNaXhpblZhbGlkID0gdHlwZW9mU3BlYyA9PT0gJ29iamVjdCcgJiYgc3BlYyAhPT0gbnVsbDtcblxuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGlzTWl4aW5WYWxpZCwgJyVzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvIGluY2x1ZGUgYSBtaXhpbiB0aGF0IGlzIGVpdGhlciBudWxsICcgKyAnb3Igbm90IGFuIG9iamVjdC4gQ2hlY2sgdGhlIG1peGlucyBpbmNsdWRlZCBieSB0aGUgY29tcG9uZW50LCAnICsgJ2FzIHdlbGwgYXMgYW55IG1peGlucyB0aGV5IGluY2x1ZGUgdGhlbXNlbHZlcy4gJyArICdFeHBlY3RlZCBvYmplY3QgYnV0IGdvdCAlcy4nLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDbGFzcycsIHNwZWMgPT09IG51bGwgPyBudWxsIDogdHlwZW9mU3BlYykgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgISh0eXBlb2Ygc3BlYyAhPT0gJ2Z1bmN0aW9uJykgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gdXNlIGEgY29tcG9uZW50IGNsYXNzIG9yIGZ1bmN0aW9uIGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgcmVndWxhciBvYmplY3QuJykgOiBfcHJvZEludmFyaWFudCgnNzUnKSA6IHZvaWQgMDtcbiAgISFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoc3BlYykgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gdXNlIGEgY29tcG9uZW50IGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgcmVndWxhciBvYmplY3QuJykgOiBfcHJvZEludmFyaWFudCgnNzYnKSA6IHZvaWQgMDtcblxuICB2YXIgcHJvdG8gPSBDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIHZhciBhdXRvQmluZFBhaXJzID0gcHJvdG8uX19yZWFjdEF1dG9CaW5kUGFpcnM7XG5cbiAgLy8gQnkgaGFuZGxpbmcgbWl4aW5zIGJlZm9yZSBhbnkgb3RoZXIgcHJvcGVydGllcywgd2UgZW5zdXJlIHRoZSBzYW1lXG4gIC8vIGNoYWluaW5nIG9yZGVyIGlzIGFwcGxpZWQgdG8gbWV0aG9kcyB3aXRoIERFRklORV9NQU5ZIHBvbGljeSwgd2hldGhlclxuICAvLyBtaXhpbnMgYXJlIGxpc3RlZCBiZWZvcmUgb3IgYWZ0ZXIgdGhlc2UgbWV0aG9kcyBpbiB0aGUgc3BlYy5cbiAgaWYgKHNwZWMuaGFzT3duUHJvcGVydHkoTUlYSU5TX0tFWSkpIHtcbiAgICBSRVNFUlZFRF9TUEVDX0tFWVMubWl4aW5zKENvbnN0cnVjdG9yLCBzcGVjLm1peGlucyk7XG4gIH1cblxuICBmb3IgKHZhciBuYW1lIGluIHNwZWMpIHtcbiAgICBpZiAoIXNwZWMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChuYW1lID09PSBNSVhJTlNfS0VZKSB7XG4gICAgICAvLyBXZSBoYXZlIGFscmVhZHkgaGFuZGxlZCBtaXhpbnMgaW4gYSBzcGVjaWFsIGNhc2UgYWJvdmUuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgcHJvcGVydHkgPSBzcGVjW25hbWVdO1xuICAgIHZhciBpc0FscmVhZHlEZWZpbmVkID0gcHJvdG8uaGFzT3duUHJvcGVydHkobmFtZSk7XG4gICAgdmFsaWRhdGVNZXRob2RPdmVycmlkZShpc0FscmVhZHlEZWZpbmVkLCBuYW1lKTtcblxuICAgIGlmIChSRVNFUlZFRF9TUEVDX0tFWVMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIFJFU0VSVkVEX1NQRUNfS0VZU1tuYW1lXShDb25zdHJ1Y3RvciwgcHJvcGVydHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTZXR1cCBtZXRob2RzIG9uIHByb3RvdHlwZTpcbiAgICAgIC8vIFRoZSBmb2xsb3dpbmcgbWVtYmVyIG1ldGhvZHMgc2hvdWxkIG5vdCBiZSBhdXRvbWF0aWNhbGx5IGJvdW5kOlxuICAgICAgLy8gMS4gRXhwZWN0ZWQgUmVhY3RDbGFzcyBtZXRob2RzIChpbiB0aGUgXCJpbnRlcmZhY2VcIikuXG4gICAgICAvLyAyLiBPdmVycmlkZGVuIG1ldGhvZHMgKHRoYXQgd2VyZSBtaXhlZCBpbikuXG4gICAgICB2YXIgaXNSZWFjdENsYXNzTWV0aG9kID0gUmVhY3RDbGFzc0ludGVyZmFjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICAgIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nO1xuICAgICAgdmFyIHNob3VsZEF1dG9CaW5kID0gaXNGdW5jdGlvbiAmJiAhaXNSZWFjdENsYXNzTWV0aG9kICYmICFpc0FscmVhZHlEZWZpbmVkICYmIHNwZWMuYXV0b2JpbmQgIT09IGZhbHNlO1xuXG4gICAgICBpZiAoc2hvdWxkQXV0b0JpbmQpIHtcbiAgICAgICAgYXV0b0JpbmRQYWlycy5wdXNoKG5hbWUsIHByb3BlcnR5KTtcbiAgICAgICAgcHJvdG9bbmFtZV0gPSBwcm9wZXJ0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc0FscmVhZHlEZWZpbmVkKSB7XG4gICAgICAgICAgdmFyIHNwZWNQb2xpY3kgPSBSZWFjdENsYXNzSW50ZXJmYWNlW25hbWVdO1xuXG4gICAgICAgICAgLy8gVGhlc2UgY2FzZXMgc2hvdWxkIGFscmVhZHkgYmUgY2F1Z2h0IGJ5IHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUuXG4gICAgICAgICAgIShpc1JlYWN0Q2xhc3NNZXRob2QgJiYgKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWV9NRVJHRUQnIHx8IHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWScpKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogVW5leHBlY3RlZCBzcGVjIHBvbGljeSAlcyBmb3Iga2V5ICVzIHdoZW4gbWl4aW5nIGluIGNvbXBvbmVudCBzcGVjcy4nLCBzcGVjUG9saWN5LCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3NycsIHNwZWNQb2xpY3ksIG5hbWUpIDogdm9pZCAwO1xuXG4gICAgICAgICAgLy8gRm9yIG1ldGhvZHMgd2hpY2ggYXJlIGRlZmluZWQgbW9yZSB0aGFuIG9uY2UsIGNhbGwgdGhlIGV4aXN0aW5nXG4gICAgICAgICAgLy8gbWV0aG9kcyBiZWZvcmUgY2FsbGluZyB0aGUgbmV3IHByb3BlcnR5LCBtZXJnaW5nIGlmIGFwcHJvcHJpYXRlLlxuICAgICAgICAgIGlmIChzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTllfTUVSR0VEJykge1xuICAgICAgICAgICAgcHJvdG9bbmFtZV0gPSBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihwcm90b1tuYW1lXSwgcHJvcGVydHkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZJykge1xuICAgICAgICAgICAgcHJvdG9bbmFtZV0gPSBjcmVhdGVDaGFpbmVkRnVuY3Rpb24ocHJvdG9bbmFtZV0sIHByb3BlcnR5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvdG9bbmFtZV0gPSBwcm9wZXJ0eTtcbiAgICAgICAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIC8vIEFkZCB2ZXJib3NlIGRpc3BsYXlOYW1lIHRvIHRoZSBmdW5jdGlvbiwgd2hpY2ggaGVscHMgd2hlbiBsb29raW5nXG4gICAgICAgICAgICAvLyBhdCBwcm9maWxpbmcgdG9vbHMuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nICYmIHNwZWMuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICAgICAgcHJvdG9bbmFtZV0uZGlzcGxheU5hbWUgPSBzcGVjLmRpc3BsYXlOYW1lICsgJ18nICsgbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpIHtcbiAgaWYgKCFzdGF0aWNzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAodmFyIG5hbWUgaW4gc3RhdGljcykge1xuICAgIHZhciBwcm9wZXJ0eSA9IHN0YXRpY3NbbmFtZV07XG4gICAgaWYgKCFzdGF0aWNzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgaXNSZXNlcnZlZCA9IG5hbWUgaW4gUkVTRVJWRURfU1BFQ19LRVlTO1xuICAgICEhaXNSZXNlcnZlZCA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBhIHJlc2VydmVkIHByb3BlcnR5LCBgJXNgLCB0aGF0IHNob3VsZG5cXCd0IGJlIG9uIHRoZSBcInN0YXRpY3NcIiBrZXkuIERlZmluZSBpdCBhcyBhbiBpbnN0YW5jZSBwcm9wZXJ0eSBpbnN0ZWFkOyBpdCB3aWxsIHN0aWxsIGJlIGFjY2Vzc2libGUgb24gdGhlIGNvbnN0cnVjdG9yLicsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc4JywgbmFtZSkgOiB2b2lkIDA7XG5cbiAgICB2YXIgaXNJbmhlcml0ZWQgPSBuYW1lIGluIENvbnN0cnVjdG9yO1xuICAgICEhaXNJbmhlcml0ZWQgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgYCVzYCBvbiB5b3VyIGNvbXBvbmVudCBtb3JlIHRoYW4gb25jZS4gVGhpcyBjb25mbGljdCBtYXkgYmUgZHVlIHRvIGEgbWl4aW4uJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzknLCBuYW1lKSA6IHZvaWQgMDtcbiAgICBDb25zdHJ1Y3RvcltuYW1lXSA9IHByb3BlcnR5O1xuICB9XG59XG5cbi8qKlxuICogTWVyZ2UgdHdvIG9iamVjdHMsIGJ1dCB0aHJvdyBpZiBib3RoIGNvbnRhaW4gdGhlIHNhbWUga2V5LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvbmUgVGhlIGZpcnN0IG9iamVjdCwgd2hpY2ggaXMgbXV0YXRlZC5cbiAqIEBwYXJhbSB7b2JqZWN0fSB0d28gVGhlIHNlY29uZCBvYmplY3RcbiAqIEByZXR1cm4ge29iamVjdH0gb25lIGFmdGVyIGl0IGhhcyBiZWVuIG11dGF0ZWQgdG8gY29udGFpbiBldmVyeXRoaW5nIGluIHR3by5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhvbmUsIHR3bykge1xuICAhKG9uZSAmJiB0d28gJiYgdHlwZW9mIG9uZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHR3byA9PT0gJ29iamVjdCcpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6IENhbm5vdCBtZXJnZSBub24tb2JqZWN0cy4nKSA6IF9wcm9kSW52YXJpYW50KCc4MCcpIDogdm9pZCAwO1xuXG4gIGZvciAodmFyIGtleSBpbiB0d28pIHtcbiAgICBpZiAodHdvLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICEob25lW2tleV0gPT09IHVuZGVmaW5lZCkgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ21lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoKTogVHJpZWQgdG8gbWVyZ2UgdHdvIG9iamVjdHMgd2l0aCB0aGUgc2FtZSBrZXk6IGAlc2AuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSB0byBhIG1peGluOyBpbiBwYXJ0aWN1bGFyLCB0aGlzIG1heSBiZSBjYXVzZWQgYnkgdHdvIGdldEluaXRpYWxTdGF0ZSgpIG9yIGdldERlZmF1bHRQcm9wcygpIG1ldGhvZHMgcmV0dXJuaW5nIG9iamVjdHMgd2l0aCBjbGFzaGluZyBrZXlzLicsIGtleSkgOiBfcHJvZEludmFyaWFudCgnODEnLCBrZXkpIDogdm9pZCAwO1xuICAgICAgb25lW2tleV0gPSB0d29ba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9uZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIHR3byBmdW5jdGlvbnMgYW5kIG1lcmdlcyB0aGVpciByZXR1cm4gdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uZSBGdW5jdGlvbiB0byBpbnZva2UgZmlyc3QuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0d28gRnVuY3Rpb24gdG8gaW52b2tlIHNlY29uZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IGludm9rZXMgdGhlIHR3byBhcmd1bWVudCBmdW5jdGlvbnMuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkUmVzdWx0KCkge1xuICAgIHZhciBhID0gb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIGIgPSB0d28uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoYSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9IGVsc2UgaWYgKGIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIHZhciBjID0ge307XG4gICAgbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhjLCBhKTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGIpO1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgaWdub3JlcyB0aGVpciByZXR1cm4gdmFsZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNoYWluZWRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gY2hhaW5lZEZ1bmN0aW9uKCkge1xuICAgIG9uZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIEJpbmRzIGEgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbXBvbmVudCBDb21wb25lbnQgd2hvc2UgbWV0aG9kIGlzIGdvaW5nIHRvIGJlIGJvdW5kLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kIE1ldGhvZCB0byBiZSBib3VuZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgYm91bmQgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBiaW5kQXV0b0JpbmRNZXRob2QoY29tcG9uZW50LCBtZXRob2QpIHtcbiAgdmFyIGJvdW5kTWV0aG9kID0gbWV0aG9kLmJpbmQoY29tcG9uZW50KTtcbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQ29udGV4dCA9IGNvbXBvbmVudDtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRNZXRob2QgPSBtZXRob2Q7XG4gICAgYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQXJndW1lbnRzID0gbnVsbDtcbiAgICB2YXIgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZTtcbiAgICB2YXIgX2JpbmQgPSBib3VuZE1ldGhvZC5iaW5kO1xuICAgIGJvdW5kTWV0aG9kLmJpbmQgPSBmdW5jdGlvbiAobmV3VGhpcykge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICAvLyBVc2VyIGlzIHRyeWluZyB0byBiaW5kKCkgYW4gYXV0b2JvdW5kIG1ldGhvZDsgd2UgZWZmZWN0aXZlbHkgd2lsbFxuICAgICAgLy8gaWdub3JlIHRoZSB2YWx1ZSBvZiBcInRoaXNcIiB0aGF0IHRoZSB1c2VyIGlzIHRyeWluZyB0byB1c2UsIHNvXG4gICAgICAvLyBsZXQncyB3YXJuLlxuICAgICAgaWYgKG5ld1RoaXMgIT09IGNvbXBvbmVudCAmJiBuZXdUaGlzICE9PSBudWxsKSB7XG4gICAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogUmVhY3QgY29tcG9uZW50IG1ldGhvZHMgbWF5IG9ubHkgYmUgYm91bmQgdG8gdGhlICcgKyAnY29tcG9uZW50IGluc3RhbmNlLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgIH0gZWxzZSBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogWW91IGFyZSBiaW5kaW5nIGEgY29tcG9uZW50IG1ldGhvZCB0byB0aGUgY29tcG9uZW50LiAnICsgJ1JlYWN0IGRvZXMgdGhpcyBmb3IgeW91IGF1dG9tYXRpY2FsbHkgaW4gYSBoaWdoLXBlcmZvcm1hbmNlICcgKyAnd2F5LCBzbyB5b3UgY2FuIHNhZmVseSByZW1vdmUgdGhpcyBjYWxsLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgcmV0dXJuIGJvdW5kTWV0aG9kO1xuICAgICAgfVxuICAgICAgdmFyIHJlYm91bmRNZXRob2QgPSBfYmluZC5hcHBseShib3VuZE1ldGhvZCwgYXJndW1lbnRzKTtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQ29udGV4dCA9IGNvbXBvbmVudDtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBhcmdzO1xuICAgICAgcmV0dXJuIHJlYm91bmRNZXRob2Q7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gYm91bmRNZXRob2Q7XG59XG5cbi8qKlxuICogQmluZHMgYWxsIGF1dG8tYm91bmQgbWV0aG9kcyBpbiBhIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZHMoY29tcG9uZW50KSB7XG4gIHZhciBwYWlycyA9IGNvbXBvbmVudC5fX3JlYWN0QXV0b0JpbmRQYWlycztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHZhciBhdXRvQmluZEtleSA9IHBhaXJzW2ldO1xuICAgIHZhciBtZXRob2QgPSBwYWlyc1tpICsgMV07XG4gICAgY29tcG9uZW50W2F1dG9CaW5kS2V5XSA9IGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGQgbW9yZSB0byB0aGUgUmVhY3RDbGFzcyBiYXNlIGNsYXNzLiBUaGVzZSBhcmUgYWxsIGxlZ2FjeSBmZWF0dXJlcyBhbmRcbiAqIHRoZXJlZm9yZSBub3QgYWxyZWFkeSBwYXJ0IG9mIHRoZSBtb2Rlcm4gUmVhY3RDb21wb25lbnQuXG4gKi9cbnZhciBSZWFjdENsYXNzTWl4aW4gPSB7XG5cbiAgLyoqXG4gICAqIFRPRE86IFRoaXMgd2lsbCBiZSBkZXByZWNhdGVkIGJlY2F1c2Ugc3RhdGUgc2hvdWxkIGFsd2F5cyBrZWVwIGEgY29uc2lzdGVudFxuICAgKiB0eXBlIHNpZ25hdHVyZSBhbmQgdGhlIG9ubHkgdXNlIGNhc2UgZm9yIHRoaXMsIGlzIHRvIGF2b2lkIHRoYXQuXG4gICAqL1xuICByZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChuZXdTdGF0ZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVJlcGxhY2VTdGF0ZSh0aGlzLCBuZXdTdGF0ZSk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAncmVwbGFjZVN0YXRlJyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlci5pc01vdW50ZWQodGhpcyk7XG4gIH1cbn07XG5cbnZhciBSZWFjdENsYXNzQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge307XG5fYXNzaWduKFJlYWN0Q2xhc3NDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q2xhc3NNaXhpbik7XG5cbi8qKlxuICogTW9kdWxlIGZvciBjcmVhdGluZyBjb21wb3NpdGUgY29tcG9uZW50cy5cbiAqXG4gKiBAY2xhc3MgUmVhY3RDbGFzc1xuICovXG52YXIgUmVhY3RDbGFzcyA9IHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvbXBvc2l0ZSBjb21wb25lbnQgY2xhc3MgZ2l2ZW4gYSBjbGFzcyBzcGVjaWZpY2F0aW9uLlxuICAgKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlY2xhc3NcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHNwZWMgQ2xhc3Mgc3BlY2lmaWNhdGlvbiAod2hpY2ggbXVzdCBkZWZpbmUgYHJlbmRlcmApLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gQ29tcG9uZW50IGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBjcmVhdGVDbGFzczogZnVuY3Rpb24gKHNwZWMpIHtcbiAgICAvLyBUbyBrZWVwIG91ciB3YXJuaW5ncyBtb3JlIHVuZGVyc3RhbmRhYmxlLCB3ZSdsbCB1c2UgYSBsaXR0bGUgaGFjayBoZXJlIHRvXG4gICAgLy8gZW5zdXJlIHRoYXQgQ29uc3RydWN0b3IubmFtZSAhPT0gJ0NvbnN0cnVjdG9yJy4gVGhpcyBtYWtlcyBzdXJlIHdlIGRvbid0XG4gICAgLy8gdW5uZWNlc3NhcmlseSBpZGVudGlmeSBhIGNsYXNzIHdpdGhvdXQgZGlzcGxheU5hbWUgYXMgJ0NvbnN0cnVjdG9yJy5cbiAgICB2YXIgQ29uc3RydWN0b3IgPSBpZGVudGl0eShmdW5jdGlvbiAocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgICAgIC8vIFRoaXMgY29uc3RydWN0b3IgZ2V0cyBvdmVycmlkZGVuIGJ5IG1vY2tzLiBUaGUgYXJndW1lbnQgaXMgdXNlZFxuICAgICAgLy8gYnkgbW9ja3MgdG8gYXNzZXJ0IG9uIHdoYXQgZ2V0cyBtb3VudGVkLlxuXG4gICAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvciwgJ1NvbWV0aGluZyBpcyBjYWxsaW5nIGEgUmVhY3QgY29tcG9uZW50IGRpcmVjdGx5LiBVc2UgYSBmYWN0b3J5IG9yICcgKyAnSlNYIGluc3RlYWQuIFNlZTogaHR0cHM6Ly9mYi5tZS9yZWFjdC1sZWdhY3lmYWN0b3J5JykgOiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIC8vIFdpcmUgdXAgYXV0by1iaW5kaW5nXG4gICAgICBpZiAodGhpcy5fX3JlYWN0QXV0b0JpbmRQYWlycy5sZW5ndGgpIHtcbiAgICAgICAgYmluZEF1dG9CaW5kTWV0aG9kcyh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAgICAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcblxuICAgICAgdGhpcy5zdGF0ZSA9IG51bGw7XG5cbiAgICAgIC8vIFJlYWN0Q2xhc3NlcyBkb2Vzbid0IGhhdmUgY29uc3RydWN0b3JzLiBJbnN0ZWFkLCB0aGV5IHVzZSB0aGVcbiAgICAgIC8vIGdldEluaXRpYWxTdGF0ZSBhbmQgY29tcG9uZW50V2lsbE1vdW50IG1ldGhvZHMgZm9yIGluaXRpYWxpemF0aW9uLlxuXG4gICAgICB2YXIgaW5pdGlhbFN0YXRlID0gdGhpcy5nZXRJbml0aWFsU3RhdGUgPyB0aGlzLmdldEluaXRpYWxTdGF0ZSgpIDogbnVsbDtcbiAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAvLyBXZSBhbGxvdyBhdXRvLW1vY2tzIHRvIHByb2NlZWQgYXMgaWYgdGhleSdyZSByZXR1cm5pbmcgbnVsbC5cbiAgICAgICAgaWYgKGluaXRpYWxTdGF0ZSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuZ2V0SW5pdGlhbFN0YXRlLl9pc01vY2tGdW5jdGlvbikge1xuICAgICAgICAgIC8vIFRoaXMgaXMgcHJvYmFibHkgYmFkIHByYWN0aWNlLiBDb25zaWRlciB3YXJuaW5nIGhlcmUgYW5kXG4gICAgICAgICAgLy8gZGVwcmVjYXRpbmcgdGhpcyBjb252ZW5pZW5jZS5cbiAgICAgICAgICBpbml0aWFsU3RhdGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAhKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGluaXRpYWxTdGF0ZSkpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclcy5nZXRJbml0aWFsU3RhdGUoKTogbXVzdCByZXR1cm4gYW4gb2JqZWN0IG9yIG51bGwnLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IF9wcm9kSW52YXJpYW50KCc4MicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogdm9pZCAwO1xuXG4gICAgICB0aGlzLnN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgIH0pO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IG5ldyBSZWFjdENsYXNzQ29tcG9uZW50KCk7XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29uc3RydWN0b3I7XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlLl9fcmVhY3RBdXRvQmluZFBhaXJzID0gW107XG5cbiAgICBpbmplY3RlZE1peGlucy5mb3JFYWNoKG1peFNwZWNJbnRvQ29tcG9uZW50LmJpbmQobnVsbCwgQ29uc3RydWN0b3IpKTtcblxuICAgIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzcGVjKTtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIGRlZmF1bHRQcm9wcyBwcm9wZXJ0eSBhZnRlciBhbGwgbWl4aW5zIGhhdmUgYmVlbiBtZXJnZWQuXG4gICAgaWYgKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcykge1xuICAgICAgQ29uc3RydWN0b3IuZGVmYXVsdFByb3BzID0gQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKCk7XG4gICAgfVxuXG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBUaGlzIGlzIGEgdGFnIHRvIGluZGljYXRlIHRoYXQgdGhlIHVzZSBvZiB0aGVzZSBtZXRob2QgbmFtZXMgaXMgb2ssXG4gICAgICAvLyBzaW5jZSBpdCdzIHVzZWQgd2l0aCBjcmVhdGVDbGFzcy4gSWYgaXQncyBub3QsIHRoZW4gaXQncyBsaWtlbHkgYVxuICAgICAgLy8gbWlzdGFrZSBzbyB3ZSdsbCB3YXJuIHlvdSB0byB1c2UgdGhlIHN0YXRpYyBwcm9wZXJ0eSwgcHJvcGVydHlcbiAgICAgIC8vIGluaXRpYWxpemVyIG9yIGNvbnN0cnVjdG9yIHJlc3BlY3RpdmVseS5cbiAgICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgICBpZiAoQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZSkge1xuICAgICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgfVxuXG4gICAgIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZW5kZXIgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ2NyZWF0ZUNsYXNzKC4uLik6IENsYXNzIHNwZWNpZmljYXRpb24gbXVzdCBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuJykgOiBfcHJvZEludmFyaWFudCgnODMnKSA6IHZvaWQgMDtcblxuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50U2hvdWxkVXBkYXRlLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFNob3VsZFVwZGF0ZSgpLiBEaWQgeW91IG1lYW4gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCk/ICcgKyAnVGhlIG5hbWUgaXMgcGhyYXNlZCBhcyBhIHF1ZXN0aW9uIGJlY2F1c2UgdGhlIGZ1bmN0aW9uIGlzICcgKyAnZXhwZWN0ZWQgdG8gcmV0dXJuIGEgdmFsdWUuJywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcygpLiBEaWQgeW91IG1lYW4gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpPycsIHNwZWMuZGlzcGxheU5hbWUgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gUmVkdWNlIHRpbWUgc3BlbnQgZG9pbmcgbG9va3VwcyBieSBzZXR0aW5nIHRoZXNlIG9uIHRoZSBwcm90b3R5cGUuXG4gICAgZm9yICh2YXIgbWV0aG9kTmFtZSBpbiBSZWFjdENsYXNzSW50ZXJmYWNlKSB7XG4gICAgICBpZiAoIUNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXSkge1xuICAgICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfSxcblxuICBpbmplY3Rpb246IHtcbiAgICBpbmplY3RNaXhpbjogZnVuY3Rpb24gKG1peGluKSB7XG4gICAgICBpbmplY3RlZE1peGlucy5wdXNoKG1peGluKTtcbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENsYXNzO1xufSx7XCIxMFwiOjEwLFwiMTNcIjoxMyxcIjE0XCI6MTQsXCIyNFwiOjI0LFwiMjdcIjoyNyxcIjI4XCI6MjgsXCIyOVwiOjI5LFwiMzBcIjozMCxcIjZcIjo2fV0sNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSBfZGVyZXFfKDI0KTtcblxudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gX2RlcmVxXygxMyk7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IF9kZXJlcV8oMjApO1xudmFyIGVtcHR5T2JqZWN0ID0gX2RlcmVxXygyNyk7XG52YXIgaW52YXJpYW50ID0gX2RlcmVxXygyOCk7XG52YXIgd2FybmluZyA9IF9kZXJlcV8oMjkpO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgaGVscGVycyBmb3IgdGhlIHVwZGF0aW5nIHN0YXRlIG9mIGEgY29tcG9uZW50LlxuICovXG5mdW5jdGlvbiBSZWFjdENvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQgPSB7fTtcblxuLyoqXG4gKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIHRvIG11dGF0ZVxuICogc3RhdGUuIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBjYWxscyB0byBgc2V0U3RhdGVgIHdpbGwgcnVuIHN5bmNocm9ub3VzbHksXG4gKiBhcyB0aGV5IG1heSBldmVudHVhbGx5IGJlIGJhdGNoZWQgdG9nZXRoZXIuICBZb3UgY2FuIHByb3ZpZGUgYW4gb3B0aW9uYWxcbiAqIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIHRoZSBjYWxsIHRvIHNldFN0YXRlIGlzIGFjdHVhbGx5XG4gKiBjb21wbGV0ZWQuXG4gKlxuICogV2hlbiBhIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIHRvIHNldFN0YXRlLCBpdCB3aWxsIGJlIGNhbGxlZCBhdCBzb21lIHBvaW50IGluXG4gKiB0aGUgZnV0dXJlIChub3Qgc3luY2hyb25vdXNseSkuIEl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIHVwIHRvIGRhdGVcbiAqIGNvbXBvbmVudCBhcmd1bWVudHMgKHN0YXRlLCBwcm9wcywgY29udGV4dCkuIFRoZXNlIHZhbHVlcyBjYW4gYmUgZGlmZmVyZW50XG4gKiBmcm9tIHRoaXMuKiBiZWNhdXNlIHlvdXIgZnVuY3Rpb24gbWF5IGJlIGNhbGxlZCBhZnRlciByZWNlaXZlUHJvcHMgYnV0IGJlZm9yZVxuICogc2hvdWxkQ29tcG9uZW50VXBkYXRlLCBhbmQgdGhpcyBuZXcgc3RhdGUsIHByb3BzLCBhbmQgY29udGV4dCB3aWxsIG5vdCB5ZXQgYmVcbiAqIGFzc2lnbmVkIHRvIHRoaXMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgb3IgZnVuY3Rpb24gdG9cbiAqICAgICAgICBwcm9kdWNlIG5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBjdXJyZW50IHN0YXRlLlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrKSB7XG4gICEodHlwZW9mIHBhcnRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHBhcnRpYWxTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyB8fCBwYXJ0aWFsU3RhdGUgPT0gbnVsbCkgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3NldFN0YXRlKC4uLik6IHRha2VzIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMgdG8gdXBkYXRlIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzLicpIDogX3Byb2RJbnZhcmlhbnQoJzg1JykgOiB2b2lkIDA7XG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlU2V0U3RhdGUodGhpcywgcGFydGlhbFN0YXRlKTtcbiAgaWYgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy51cGRhdGVyLmVucXVldWVDYWxsYmFjayh0aGlzLCBjYWxsYmFjaywgJ3NldFN0YXRlJyk7XG4gIH1cbn07XG5cbi8qKlxuICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gKlxuICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gKlxuICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAqXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHVwZGF0ZSBpcyBjb21wbGV0ZS5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVGb3JjZVVwZGF0ZSh0aGlzKTtcbiAgaWYgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy51cGRhdGVyLmVucXVldWVDYWxsYmFjayh0aGlzLCBjYWxsYmFjaywgJ2ZvcmNlVXBkYXRlJyk7XG4gIH1cbn07XG5cbi8qKlxuICogRGVwcmVjYXRlZCBBUElzLiBUaGVzZSBBUElzIHVzZWQgdG8gZXhpc3Qgb24gY2xhc3NpYyBSZWFjdCBjbGFzc2VzIGJ1dCBzaW5jZVxuICogd2Ugd291bGQgbGlrZSB0byBkZXByZWNhdGUgdGhlbSwgd2UncmUgbm90IGdvaW5nIHRvIG1vdmUgdGhlbSBvdmVyIHRvIHRoaXNcbiAqIG1vZGVybiBiYXNlIGNsYXNzLiBJbnN0ZWFkLCB3ZSBkZWZpbmUgYSBnZXR0ZXIgdGhhdCB3YXJucyBpZiBpdCdzIGFjY2Vzc2VkLlxuICovXG5pZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGRlcHJlY2F0ZWRBUElzID0ge1xuICAgIGlzTW91bnRlZDogWydpc01vdW50ZWQnLCAnSW5zdGVhZCwgbWFrZSBzdXJlIHRvIGNsZWFuIHVwIHN1YnNjcmlwdGlvbnMgYW5kIHBlbmRpbmcgcmVxdWVzdHMgaW4gJyArICdjb21wb25lbnRXaWxsVW5tb3VudCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcy4nXSxcbiAgICByZXBsYWNlU3RhdGU6IFsncmVwbGFjZVN0YXRlJywgJ1JlZmFjdG9yIHlvdXIgY29kZSB0byB1c2Ugc2V0U3RhdGUgaW5zdGVhZCAoc2VlICcgKyAnaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMjM2KS4nXVxuICB9O1xuICB2YXIgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIGluZm8pIHtcbiAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIG1ldGhvZE5hbWUsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKSBpcyBkZXByZWNhdGVkIGluIHBsYWluIEphdmFTY3JpcHQgUmVhY3QgY2xhc3Nlcy4gJXMnLCBpbmZvWzBdLCBpbmZvWzFdKSA6IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGZvciAodmFyIGZuTmFtZSBpbiBkZXByZWNhdGVkQVBJcykge1xuICAgIGlmIChkZXByZWNhdGVkQVBJcy5oYXNPd25Qcm9wZXJ0eShmbk5hbWUpKSB7XG4gICAgICBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcoZm5OYW1lLCBkZXByZWNhdGVkQVBJc1tmbk5hbWVdKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENvbXBvbmVudDtcbn0se1wiMTNcIjoxMyxcIjIwXCI6MjAsXCIyNFwiOjI0LFwiMjdcIjoyNyxcIjI4XCI6MjgsXCIyOVwiOjI5fV0sNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IF9kZXJlcV8oMjQpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSBfZGVyZXFfKDgpO1xuXG52YXIgaW52YXJpYW50ID0gX2RlcmVxXygyOCk7XG52YXIgd2FybmluZyA9IF9kZXJlcV8oMjkpO1xuXG5mdW5jdGlvbiBpc05hdGl2ZShmbikge1xuICAvLyBCYXNlZCBvbiBpc05hdGl2ZSgpIGZyb20gTG9kYXNoXG4gIHZhciBmdW5jVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArIGZ1bmNUb1N0cmluZ1xuICAvLyBUYWtlIGFuIGV4YW1wbGUgbmF0aXZlIGZ1bmN0aW9uIHNvdXJjZSBmb3IgY29tcGFyaXNvblxuICAuY2FsbChoYXNPd25Qcm9wZXJ0eSlcbiAgLy8gU3RyaXAgcmVnZXggY2hhcmFjdGVycyBzbyB3ZSBjYW4gdXNlIGl0IGZvciByZWdleFxuICAucmVwbGFjZSgvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2csICdcXFxcJCYnKVxuICAvLyBSZW1vdmUgaGFzT3duUHJvcGVydHkgZnJvbSB0aGUgdGVtcGxhdGUgdG8gbWFrZSBpdCBnZW5lcmljXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJyk7XG4gIHRyeSB7XG4gICAgdmFyIHNvdXJjZSA9IGZ1bmNUb1N0cmluZy5jYWxsKGZuKTtcbiAgICByZXR1cm4gcmVJc05hdGl2ZS50ZXN0KHNvdXJjZSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG52YXIgY2FuVXNlQ29sbGVjdGlvbnMgPVxuLy8gQXJyYXkuZnJvbVxudHlwZW9mIEFycmF5LmZyb20gPT09ICdmdW5jdGlvbicgJiZcbi8vIE1hcFxudHlwZW9mIE1hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShNYXApICYmXG4vLyBNYXAucHJvdG90eXBlLmtleXNcbk1hcC5wcm90b3R5cGUgIT0gbnVsbCAmJiB0eXBlb2YgTWFwLnByb3RvdHlwZS5rZXlzID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKE1hcC5wcm90b3R5cGUua2V5cykgJiZcbi8vIFNldFxudHlwZW9mIFNldCA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShTZXQpICYmXG4vLyBTZXQucHJvdG90eXBlLmtleXNcblNldC5wcm90b3R5cGUgIT0gbnVsbCAmJiB0eXBlb2YgU2V0LnByb3RvdHlwZS5rZXlzID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKFNldC5wcm90b3R5cGUua2V5cyk7XG5cbnZhciBzZXRJdGVtO1xudmFyIGdldEl0ZW07XG52YXIgcmVtb3ZlSXRlbTtcbnZhciBnZXRJdGVtSURzO1xudmFyIGFkZFJvb3Q7XG52YXIgcmVtb3ZlUm9vdDtcbnZhciBnZXRSb290SURzO1xuXG5pZiAoY2FuVXNlQ29sbGVjdGlvbnMpIHtcbiAgdmFyIGl0ZW1NYXAgPSBuZXcgTWFwKCk7XG4gIHZhciByb290SURTZXQgPSBuZXcgU2V0KCk7XG5cbiAgc2V0SXRlbSA9IGZ1bmN0aW9uIChpZCwgaXRlbSkge1xuICAgIGl0ZW1NYXAuc2V0KGlkLCBpdGVtKTtcbiAgfTtcbiAgZ2V0SXRlbSA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJldHVybiBpdGVtTWFwLmdldChpZCk7XG4gIH07XG4gIHJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICBpdGVtTWFwWydkZWxldGUnXShpZCk7XG4gIH07XG4gIGdldEl0ZW1JRHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oaXRlbU1hcC5rZXlzKCkpO1xuICB9O1xuXG4gIGFkZFJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByb290SURTZXQuYWRkKGlkKTtcbiAgfTtcbiAgcmVtb3ZlUm9vdCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJvb3RJRFNldFsnZGVsZXRlJ10oaWQpO1xuICB9O1xuICBnZXRSb290SURzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHJvb3RJRFNldC5rZXlzKCkpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIGl0ZW1CeUtleSA9IHt9O1xuICB2YXIgcm9vdEJ5S2V5ID0ge307XG5cbiAgLy8gVXNlIG5vbi1udW1lcmljIGtleXMgdG8gcHJldmVudCBWOCBwZXJmb3JtYW5jZSBpc3N1ZXM6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzcyMzJcbiAgdmFyIGdldEtleUZyb21JRCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJldHVybiAnLicgKyBpZDtcbiAgfTtcbiAgdmFyIGdldElERnJvbUtleSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoa2V5LnN1YnN0cigxKSwgMTApO1xuICB9O1xuXG4gIHNldEl0ZW0gPSBmdW5jdGlvbiAoaWQsIGl0ZW0pIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICBpdGVtQnlLZXlba2V5XSA9IGl0ZW07XG4gIH07XG4gIGdldEl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICByZXR1cm4gaXRlbUJ5S2V5W2tleV07XG4gIH07XG4gIHJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICBkZWxldGUgaXRlbUJ5S2V5W2tleV07XG4gIH07XG4gIGdldEl0ZW1JRHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGl0ZW1CeUtleSkubWFwKGdldElERnJvbUtleSk7XG4gIH07XG5cbiAgYWRkUm9vdCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIHJvb3RCeUtleVtrZXldID0gdHJ1ZTtcbiAgfTtcbiAgcmVtb3ZlUm9vdCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIGRlbGV0ZSByb290QnlLZXlba2V5XTtcbiAgfTtcbiAgZ2V0Um9vdElEcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocm9vdEJ5S2V5KS5tYXAoZ2V0SURGcm9tS2V5KTtcbiAgfTtcbn1cblxudmFyIHVubW91bnRlZElEcyA9IFtdO1xuXG5mdW5jdGlvbiBwdXJnZURlZXAoaWQpIHtcbiAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgaWYgKGl0ZW0pIHtcbiAgICB2YXIgY2hpbGRJRHMgPSBpdGVtLmNoaWxkSURzO1xuXG4gICAgcmVtb3ZlSXRlbShpZCk7XG4gICAgY2hpbGRJRHMuZm9yRWFjaChwdXJnZURlZXApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUobmFtZSwgc291cmNlLCBvd25lck5hbWUpIHtcbiAgcmV0dXJuICdcXG4gICAgaW4gJyArIChuYW1lIHx8ICdVbmtub3duJykgKyAoc291cmNlID8gJyAoYXQgJyArIHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJykgKyAnOicgKyBzb3VyY2UubGluZU51bWJlciArICcpJyA6IG93bmVyTmFtZSA/ICcgKGNyZWF0ZWQgYnkgJyArIG93bmVyTmFtZSArICcpJyA6ICcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzcGxheU5hbWUoZWxlbWVudCkge1xuICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcjZW1wdHknO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxlbWVudCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gJyN0ZXh0JztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudC50eXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBlbGVtZW50LnR5cGU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsZW1lbnQudHlwZS5kaXNwbGF5TmFtZSB8fCBlbGVtZW50LnR5cGUubmFtZSB8fCAnVW5rbm93bic7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVzY3JpYmVJRChpZCkge1xuICB2YXIgbmFtZSA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RGlzcGxheU5hbWUoaWQpO1xuICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gIHZhciBvd25lcklEID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRPd25lcklEKGlkKTtcbiAgdmFyIG93bmVyTmFtZTtcbiAgaWYgKG93bmVySUQpIHtcbiAgICBvd25lck5hbWUgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldERpc3BsYXlOYW1lKG93bmVySUQpO1xuICB9XG4gIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhlbGVtZW50LCAnUmVhY3RDb21wb25lbnRUcmVlSG9vazogTWlzc2luZyBSZWFjdCBlbGVtZW50IGZvciBkZWJ1Z0lEICVzIHdoZW4gJyArICdidWlsZGluZyBzdGFjaycsIGlkKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUobmFtZSwgZWxlbWVudCAmJiBlbGVtZW50Ll9zb3VyY2UsIG93bmVyTmFtZSk7XG59XG5cbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rID0ge1xuICBvblNldENoaWxkcmVuOiBmdW5jdGlvbiAoaWQsIG5leHRDaGlsZElEcykge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgIWl0ZW0gPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0l0ZW0gbXVzdCBoYXZlIGJlZW4gc2V0JykgOiBfcHJvZEludmFyaWFudCgnMTQ0JykgOiB2b2lkIDA7XG4gICAgaXRlbS5jaGlsZElEcyA9IG5leHRDaGlsZElEcztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV4dENoaWxkSURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmV4dENoaWxkSUQgPSBuZXh0Q2hpbGRJRHNbaV07XG4gICAgICB2YXIgbmV4dENoaWxkID0gZ2V0SXRlbShuZXh0Q2hpbGRJRCk7XG4gICAgICAhbmV4dENoaWxkID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBob29rIGV2ZW50cyB0byBmaXJlIGZvciB0aGUgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0MCcpIDogdm9pZCAwO1xuICAgICAgIShuZXh0Q2hpbGQuY2hpbGRJRHMgIT0gbnVsbCB8fCB0eXBlb2YgbmV4dENoaWxkLmVsZW1lbnQgIT09ICdvYmplY3QnIHx8IG5leHRDaGlsZC5lbGVtZW50ID09IG51bGwpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvblNldENoaWxkcmVuKCkgdG8gZmlyZSBmb3IgYSBjb250YWluZXIgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0MScpIDogdm9pZCAwO1xuICAgICAgIW5leHRDaGlsZC5pc01vdW50ZWQgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkIG9uTW91bnRDb21wb25lbnQoKSB0byBmaXJlIGZvciB0aGUgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogX3Byb2RJbnZhcmlhbnQoJzcxJykgOiB2b2lkIDA7XG4gICAgICBpZiAobmV4dENoaWxkLnBhcmVudElEID09IG51bGwpIHtcbiAgICAgICAgbmV4dENoaWxkLnBhcmVudElEID0gaWQ7XG4gICAgICAgIC8vIFRPRE86IFRoaXMgc2hvdWxkbid0IGJlIG5lY2Vzc2FyeSBidXQgbW91bnRpbmcgYSBuZXcgcm9vdCBkdXJpbmcgaW5cbiAgICAgICAgLy8gY29tcG9uZW50V2lsbE1vdW50IGN1cnJlbnRseSBjYXVzZXMgbm90LXlldC1tb3VudGVkIGNvbXBvbmVudHMgdG9cbiAgICAgICAgLy8gYmUgcHVyZ2VkIGZyb20gb3VyIHRyZWUgZGF0YSBzbyB0aGVpciBwYXJlbnQgaWQgaXMgbWlzc2luZy5cbiAgICAgIH1cbiAgICAgICEobmV4dENoaWxkLnBhcmVudElEID09PSBpZCkgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkIG9uQmVmb3JlTW91bnRDb21wb25lbnQoKSBwYXJlbnQgYW5kIG9uU2V0Q2hpbGRyZW4oKSB0byBiZSBjb25zaXN0ZW50ICglcyBoYXMgcGFyZW50cyAlcyBhbmQgJXMpLicsIG5leHRDaGlsZElELCBuZXh0Q2hpbGQucGFyZW50SUQsIGlkKSA6IF9wcm9kSW52YXJpYW50KCcxNDInLCBuZXh0Q2hpbGRJRCwgbmV4dENoaWxkLnBhcmVudElELCBpZCkgOiB2b2lkIDA7XG4gICAgfVxuICB9LFxuICBvbkJlZm9yZU1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaWQsIGVsZW1lbnQsIHBhcmVudElEKSB7XG4gICAgdmFyIGl0ZW0gPSB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgcGFyZW50SUQ6IHBhcmVudElELFxuICAgICAgdGV4dDogbnVsbCxcbiAgICAgIGNoaWxkSURzOiBbXSxcbiAgICAgIGlzTW91bnRlZDogZmFsc2UsXG4gICAgICB1cGRhdGVDb3VudDogMFxuICAgIH07XG4gICAgc2V0SXRlbShpZCwgaXRlbSk7XG4gIH0sXG4gIG9uQmVmb3JlVXBkYXRlQ29tcG9uZW50OiBmdW5jdGlvbiAoaWQsIGVsZW1lbnQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIGlmICghaXRlbSB8fCAhaXRlbS5pc01vdW50ZWQpIHtcbiAgICAgIC8vIFdlIG1heSBlbmQgdXAgaGVyZSBhcyBhIHJlc3VsdCBvZiBzZXRTdGF0ZSgpIGluIGNvbXBvbmVudFdpbGxVbm1vdW50KCkuXG4gICAgICAvLyBJbiB0aGlzIGNhc2UsIGlnbm9yZSB0aGUgZWxlbWVudC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaXRlbS5lbGVtZW50ID0gZWxlbWVudDtcbiAgfSxcbiAgb25Nb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICAhaXRlbSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnSXRlbSBtdXN0IGhhdmUgYmVlbiBzZXQnKSA6IF9wcm9kSW52YXJpYW50KCcxNDQnKSA6IHZvaWQgMDtcbiAgICBpdGVtLmlzTW91bnRlZCA9IHRydWU7XG4gICAgdmFyIGlzUm9vdCA9IGl0ZW0ucGFyZW50SUQgPT09IDA7XG4gICAgaWYgKGlzUm9vdCkge1xuICAgICAgYWRkUm9vdChpZCk7XG4gICAgfVxuICB9LFxuICBvblVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaXNNb3VudGVkKSB7XG4gICAgICAvLyBXZSBtYXkgZW5kIHVwIGhlcmUgYXMgYSByZXN1bHQgb2Ygc2V0U3RhdGUoKSBpbiBjb21wb25lbnRXaWxsVW5tb3VudCgpLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCBpZ25vcmUgdGhlIGVsZW1lbnQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGl0ZW0udXBkYXRlQ291bnQrKztcbiAgfSxcbiAgb25Vbm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGlmIGl0IGV4aXN0cy5cbiAgICAgIC8vIGBpdGVtYCBtaWdodCBub3QgZXhpc3QgaWYgaXQgaXMgaW5zaWRlIGFuIGVycm9yIGJvdW5kYXJ5LCBhbmQgYSBzaWJsaW5nXG4gICAgICAvLyBlcnJvciBib3VuZGFyeSBjaGlsZCB0aHJldyB3aGlsZSBtb3VudGluZy4gVGhlbiB0aGlzIGluc3RhbmNlIG5ldmVyXG4gICAgICAvLyBnb3QgYSBjaGFuY2UgdG8gbW91bnQsIGJ1dCBpdCBzdGlsbCBnZXRzIGFuIHVubW91bnRpbmcgZXZlbnQgZHVyaW5nXG4gICAgICAvLyB0aGUgZXJyb3IgYm91bmRhcnkgY2xlYW51cC5cbiAgICAgIGl0ZW0uaXNNb3VudGVkID0gZmFsc2U7XG4gICAgICB2YXIgaXNSb290ID0gaXRlbS5wYXJlbnRJRCA9PT0gMDtcbiAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgcmVtb3ZlUm9vdChpZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHVubW91bnRlZElEcy5wdXNoKGlkKTtcbiAgfSxcbiAgcHVyZ2VVbm1vdW50ZWRDb21wb25lbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFJlYWN0Q29tcG9uZW50VHJlZUhvb2suX3ByZXZlbnRQdXJnaW5nKSB7XG4gICAgICAvLyBTaG91bGQgb25seSBiZSB1c2VkIGZvciB0ZXN0aW5nLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdW5tb3VudGVkSURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWQgPSB1bm1vdW50ZWRJRHNbaV07XG4gICAgICBwdXJnZURlZXAoaWQpO1xuICAgIH1cbiAgICB1bm1vdW50ZWRJRHMubGVuZ3RoID0gMDtcbiAgfSxcbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5pc01vdW50ZWQgOiBmYWxzZTtcbiAgfSxcbiAgZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW06IGZ1bmN0aW9uICh0b3BFbGVtZW50KSB7XG4gICAgdmFyIGluZm8gPSAnJztcbiAgICBpZiAodG9wRWxlbWVudCkge1xuICAgICAgdmFyIG5hbWUgPSBnZXREaXNwbGF5TmFtZSh0b3BFbGVtZW50KTtcbiAgICAgIHZhciBvd25lciA9IHRvcEVsZW1lbnQuX293bmVyO1xuICAgICAgaW5mbyArPSBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIHRvcEVsZW1lbnQuX3NvdXJjZSwgb3duZXIgJiYgb3duZXIuZ2V0TmFtZSgpKTtcbiAgICB9XG5cbiAgICB2YXIgY3VycmVudE93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB2YXIgaWQgPSBjdXJyZW50T3duZXIgJiYgY3VycmVudE93bmVyLl9kZWJ1Z0lEO1xuXG4gICAgaW5mbyArPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFN0YWNrQWRkZW5kdW1CeUlEKGlkKTtcbiAgICByZXR1cm4gaW5mbztcbiAgfSxcbiAgZ2V0U3RhY2tBZGRlbmR1bUJ5SUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpbmZvID0gJyc7XG4gICAgd2hpbGUgKGlkKSB7XG4gICAgICBpbmZvICs9IGRlc2NyaWJlSUQoaWQpO1xuICAgICAgaWQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFBhcmVudElEKGlkKTtcbiAgICB9XG4gICAgcmV0dXJuIGluZm87XG4gIH0sXG4gIGdldENoaWxkSURzOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5jaGlsZElEcyA6IFtdO1xuICB9LFxuICBnZXREaXNwbGF5TmFtZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBnZXREaXNwbGF5TmFtZShlbGVtZW50KTtcbiAgfSxcbiAgZ2V0RWxlbWVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uZWxlbWVudCA6IG51bGw7XG4gIH0sXG4gIGdldE93bmVySUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQuX293bmVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQuX293bmVyLl9kZWJ1Z0lEO1xuICB9LFxuICBnZXRQYXJlbnRJRDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0ucGFyZW50SUQgOiBudWxsO1xuICB9LFxuICBnZXRTb3VyY2U6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgdmFyIGVsZW1lbnQgPSBpdGVtID8gaXRlbS5lbGVtZW50IDogbnVsbDtcbiAgICB2YXIgc291cmNlID0gZWxlbWVudCAhPSBudWxsID8gZWxlbWVudC5fc291cmNlIDogbnVsbDtcbiAgICByZXR1cm4gc291cmNlO1xuICB9LFxuICBnZXRUZXh0OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAnJyArIGVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSxcbiAgZ2V0VXBkYXRlQ291bnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLnVwZGF0ZUNvdW50IDogMDtcbiAgfSxcblxuXG4gIGdldFJvb3RJRHM6IGdldFJvb3RJRHMsXG4gIGdldFJlZ2lzdGVyZWRJRHM6IGdldEl0ZW1JRHNcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDb21wb25lbnRUcmVlSG9vaztcbn0se1wiMjRcIjoyNCxcIjI4XCI6MjgsXCIyOVwiOjI5LFwiOFwiOjh9XSw4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBvd25lci5cbiAqXG4gKiBUaGUgY3VycmVudCBvd25lciBpcyB0aGUgY29tcG9uZW50IHdobyBzaG91bGQgb3duIGFueSBjb21wb25lbnRzIHRoYXQgYXJlXG4gKiBjdXJyZW50bHkgYmVpbmcgY29uc3RydWN0ZWQuXG4gKi9cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqIEB0eXBlIHtSZWFjdENvbXBvbmVudH1cbiAgICovXG4gIGN1cnJlbnQ6IG51bGxcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEN1cnJlbnRPd25lcjtcbn0se31dLDk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IF9kZXJlcV8oMTApO1xuXG4vKipcbiAqIENyZWF0ZSBhIGZhY3RvcnkgdGhhdCBjcmVhdGVzIEhUTUwgdGFnIGVsZW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBjcmVhdGVET01GYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3Rvcnk7XG5pZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0RWxlbWVudFZhbGlkYXRvciA9IF9kZXJlcV8oMTIpO1xuICBjcmVhdGVET01GYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUZhY3Rvcnk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcHBpbmcgZnJvbSBzdXBwb3J0ZWQgSFRNTCB0YWdzIHRvIGBSZWFjdERPTUNvbXBvbmVudGAgY2xhc3Nlcy5cbiAqIFRoaXMgaXMgYWxzbyBhY2Nlc3NpYmxlIHZpYSBgUmVhY3QuRE9NYC5cbiAqXG4gKiBAcHVibGljXG4gKi9cbnZhciBSZWFjdERPTUZhY3RvcmllcyA9IHtcbiAgYTogY3JlYXRlRE9NRmFjdG9yeSgnYScpLFxuICBhYmJyOiBjcmVhdGVET01GYWN0b3J5KCdhYmJyJyksXG4gIGFkZHJlc3M6IGNyZWF0ZURPTUZhY3RvcnkoJ2FkZHJlc3MnKSxcbiAgYXJlYTogY3JlYXRlRE9NRmFjdG9yeSgnYXJlYScpLFxuICBhcnRpY2xlOiBjcmVhdGVET01GYWN0b3J5KCdhcnRpY2xlJyksXG4gIGFzaWRlOiBjcmVhdGVET01GYWN0b3J5KCdhc2lkZScpLFxuICBhdWRpbzogY3JlYXRlRE9NRmFjdG9yeSgnYXVkaW8nKSxcbiAgYjogY3JlYXRlRE9NRmFjdG9yeSgnYicpLFxuICBiYXNlOiBjcmVhdGVET01GYWN0b3J5KCdiYXNlJyksXG4gIGJkaTogY3JlYXRlRE9NRmFjdG9yeSgnYmRpJyksXG4gIGJkbzogY3JlYXRlRE9NRmFjdG9yeSgnYmRvJyksXG4gIGJpZzogY3JlYXRlRE9NRmFjdG9yeSgnYmlnJyksXG4gIGJsb2NrcXVvdGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2Jsb2NrcXVvdGUnKSxcbiAgYm9keTogY3JlYXRlRE9NRmFjdG9yeSgnYm9keScpLFxuICBicjogY3JlYXRlRE9NRmFjdG9yeSgnYnInKSxcbiAgYnV0dG9uOiBjcmVhdGVET01GYWN0b3J5KCdidXR0b24nKSxcbiAgY2FudmFzOiBjcmVhdGVET01GYWN0b3J5KCdjYW52YXMnKSxcbiAgY2FwdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnY2FwdGlvbicpLFxuICBjaXRlOiBjcmVhdGVET01GYWN0b3J5KCdjaXRlJyksXG4gIGNvZGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2NvZGUnKSxcbiAgY29sOiBjcmVhdGVET01GYWN0b3J5KCdjb2wnKSxcbiAgY29sZ3JvdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ2NvbGdyb3VwJyksXG4gIGRhdGE6IGNyZWF0ZURPTUZhY3RvcnkoJ2RhdGEnKSxcbiAgZGF0YWxpc3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ2RhdGFsaXN0JyksXG4gIGRkOiBjcmVhdGVET01GYWN0b3J5KCdkZCcpLFxuICBkZWw6IGNyZWF0ZURPTUZhY3RvcnkoJ2RlbCcpLFxuICBkZXRhaWxzOiBjcmVhdGVET01GYWN0b3J5KCdkZXRhaWxzJyksXG4gIGRmbjogY3JlYXRlRE9NRmFjdG9yeSgnZGZuJyksXG4gIGRpYWxvZzogY3JlYXRlRE9NRmFjdG9yeSgnZGlhbG9nJyksXG4gIGRpdjogY3JlYXRlRE9NRmFjdG9yeSgnZGl2JyksXG4gIGRsOiBjcmVhdGVET01GYWN0b3J5KCdkbCcpLFxuICBkdDogY3JlYXRlRE9NRmFjdG9yeSgnZHQnKSxcbiAgZW06IGNyZWF0ZURPTUZhY3RvcnkoJ2VtJyksXG4gIGVtYmVkOiBjcmVhdGVET01GYWN0b3J5KCdlbWJlZCcpLFxuICBmaWVsZHNldDogY3JlYXRlRE9NRmFjdG9yeSgnZmllbGRzZXQnKSxcbiAgZmlnY2FwdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnZmlnY2FwdGlvbicpLFxuICBmaWd1cmU6IGNyZWF0ZURPTUZhY3RvcnkoJ2ZpZ3VyZScpLFxuICBmb290ZXI6IGNyZWF0ZURPTUZhY3RvcnkoJ2Zvb3RlcicpLFxuICBmb3JtOiBjcmVhdGVET01GYWN0b3J5KCdmb3JtJyksXG4gIGgxOiBjcmVhdGVET01GYWN0b3J5KCdoMScpLFxuICBoMjogY3JlYXRlRE9NRmFjdG9yeSgnaDInKSxcbiAgaDM6IGNyZWF0ZURPTUZhY3RvcnkoJ2gzJyksXG4gIGg0OiBjcmVhdGVET01GYWN0b3J5KCdoNCcpLFxuICBoNTogY3JlYXRlRE9NRmFjdG9yeSgnaDUnKSxcbiAgaDY6IGNyZWF0ZURPTUZhY3RvcnkoJ2g2JyksXG4gIGhlYWQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2hlYWQnKSxcbiAgaGVhZGVyOiBjcmVhdGVET01GYWN0b3J5KCdoZWFkZXInKSxcbiAgaGdyb3VwOiBjcmVhdGVET01GYWN0b3J5KCdoZ3JvdXAnKSxcbiAgaHI6IGNyZWF0ZURPTUZhY3RvcnkoJ2hyJyksXG4gIGh0bWw6IGNyZWF0ZURPTUZhY3RvcnkoJ2h0bWwnKSxcbiAgaTogY3JlYXRlRE9NRmFjdG9yeSgnaScpLFxuICBpZnJhbWU6IGNyZWF0ZURPTUZhY3RvcnkoJ2lmcmFtZScpLFxuICBpbWc6IGNyZWF0ZURPTUZhY3RvcnkoJ2ltZycpLFxuICBpbnB1dDogY3JlYXRlRE9NRmFjdG9yeSgnaW5wdXQnKSxcbiAgaW5zOiBjcmVhdGVET01GYWN0b3J5KCdpbnMnKSxcbiAga2JkOiBjcmVhdGVET01GYWN0b3J5KCdrYmQnKSxcbiAga2V5Z2VuOiBjcmVhdGVET01GYWN0b3J5KCdrZXlnZW4nKSxcbiAgbGFiZWw6IGNyZWF0ZURPTUZhY3RvcnkoJ2xhYmVsJyksXG4gIGxlZ2VuZDogY3JlYXRlRE9NRmFjdG9yeSgnbGVnZW5kJyksXG4gIGxpOiBjcmVhdGVET01GYWN0b3J5KCdsaScpLFxuICBsaW5rOiBjcmVhdGVET01GYWN0b3J5KCdsaW5rJyksXG4gIG1haW46IGNyZWF0ZURPTUZhY3RvcnkoJ21haW4nKSxcbiAgbWFwOiBjcmVhdGVET01GYWN0b3J5KCdtYXAnKSxcbiAgbWFyazogY3JlYXRlRE9NRmFjdG9yeSgnbWFyaycpLFxuICBtZW51OiBjcmVhdGVET01GYWN0b3J5KCdtZW51JyksXG4gIG1lbnVpdGVtOiBjcmVhdGVET01GYWN0b3J5KCdtZW51aXRlbScpLFxuICBtZXRhOiBjcmVhdGVET01GYWN0b3J5KCdtZXRhJyksXG4gIG1ldGVyOiBjcmVhdGVET01GYWN0b3J5KCdtZXRlcicpLFxuICBuYXY6IGNyZWF0ZURPTUZhY3RvcnkoJ25hdicpLFxuICBub3NjcmlwdDogY3JlYXRlRE9NRmFjdG9yeSgnbm9zY3JpcHQnKSxcbiAgb2JqZWN0OiBjcmVhdGVET01GYWN0b3J5KCdvYmplY3QnKSxcbiAgb2w6IGNyZWF0ZURPTUZhY3RvcnkoJ29sJyksXG4gIG9wdGdyb3VwOiBjcmVhdGVET01GYWN0b3J5KCdvcHRncm91cCcpLFxuICBvcHRpb246IGNyZWF0ZURPTUZhY3RvcnkoJ29wdGlvbicpLFxuICBvdXRwdXQ6IGNyZWF0ZURPTUZhY3RvcnkoJ291dHB1dCcpLFxuICBwOiBjcmVhdGVET01GYWN0b3J5KCdwJyksXG4gIHBhcmFtOiBjcmVhdGVET01GYWN0b3J5KCdwYXJhbScpLFxuICBwaWN0dXJlOiBjcmVhdGVET01GYWN0b3J5KCdwaWN0dXJlJyksXG4gIHByZTogY3JlYXRlRE9NRmFjdG9yeSgncHJlJyksXG4gIHByb2dyZXNzOiBjcmVhdGVET01GYWN0b3J5KCdwcm9ncmVzcycpLFxuICBxOiBjcmVhdGVET01GYWN0b3J5KCdxJyksXG4gIHJwOiBjcmVhdGVET01GYWN0b3J5KCdycCcpLFxuICBydDogY3JlYXRlRE9NRmFjdG9yeSgncnQnKSxcbiAgcnVieTogY3JlYXRlRE9NRmFjdG9yeSgncnVieScpLFxuICBzOiBjcmVhdGVET01GYWN0b3J5KCdzJyksXG4gIHNhbXA6IGNyZWF0ZURPTUZhY3RvcnkoJ3NhbXAnKSxcbiAgc2NyaXB0OiBjcmVhdGVET01GYWN0b3J5KCdzY3JpcHQnKSxcbiAgc2VjdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnc2VjdGlvbicpLFxuICBzZWxlY3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ3NlbGVjdCcpLFxuICBzbWFsbDogY3JlYXRlRE9NRmFjdG9yeSgnc21hbGwnKSxcbiAgc291cmNlOiBjcmVhdGVET01GYWN0b3J5KCdzb3VyY2UnKSxcbiAgc3BhbjogY3JlYXRlRE9NRmFjdG9yeSgnc3BhbicpLFxuICBzdHJvbmc6IGNyZWF0ZURPTUZhY3RvcnkoJ3N0cm9uZycpLFxuICBzdHlsZTogY3JlYXRlRE9NRmFjdG9yeSgnc3R5bGUnKSxcbiAgc3ViOiBjcmVhdGVET01GYWN0b3J5KCdzdWInKSxcbiAgc3VtbWFyeTogY3JlYXRlRE9NRmFjdG9yeSgnc3VtbWFyeScpLFxuICBzdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ3N1cCcpLFxuICB0YWJsZTogY3JlYXRlRE9NRmFjdG9yeSgndGFibGUnKSxcbiAgdGJvZHk6IGNyZWF0ZURPTUZhY3RvcnkoJ3Rib2R5JyksXG4gIHRkOiBjcmVhdGVET01GYWN0b3J5KCd0ZCcpLFxuICB0ZXh0YXJlYTogY3JlYXRlRE9NRmFjdG9yeSgndGV4dGFyZWEnKSxcbiAgdGZvb3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ3Rmb290JyksXG4gIHRoOiBjcmVhdGVET01GYWN0b3J5KCd0aCcpLFxuICB0aGVhZDogY3JlYXRlRE9NRmFjdG9yeSgndGhlYWQnKSxcbiAgdGltZTogY3JlYXRlRE9NRmFjdG9yeSgndGltZScpLFxuICB0aXRsZTogY3JlYXRlRE9NRmFjdG9yeSgndGl0bGUnKSxcbiAgdHI6IGNyZWF0ZURPTUZhY3RvcnkoJ3RyJyksXG4gIHRyYWNrOiBjcmVhdGVET01GYWN0b3J5KCd0cmFjaycpLFxuICB1OiBjcmVhdGVET01GYWN0b3J5KCd1JyksXG4gIHVsOiBjcmVhdGVET01GYWN0b3J5KCd1bCcpLFxuICAndmFyJzogY3JlYXRlRE9NRmFjdG9yeSgndmFyJyksXG4gIHZpZGVvOiBjcmVhdGVET01GYWN0b3J5KCd2aWRlbycpLFxuICB3YnI6IGNyZWF0ZURPTUZhY3RvcnkoJ3dicicpLFxuXG4gIC8vIFNWR1xuICBjaXJjbGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2NpcmNsZScpLFxuICBjbGlwUGF0aDogY3JlYXRlRE9NRmFjdG9yeSgnY2xpcFBhdGgnKSxcbiAgZGVmczogY3JlYXRlRE9NRmFjdG9yeSgnZGVmcycpLFxuICBlbGxpcHNlOiBjcmVhdGVET01GYWN0b3J5KCdlbGxpcHNlJyksXG4gIGc6IGNyZWF0ZURPTUZhY3RvcnkoJ2cnKSxcbiAgaW1hZ2U6IGNyZWF0ZURPTUZhY3RvcnkoJ2ltYWdlJyksXG4gIGxpbmU6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpbmUnKSxcbiAgbGluZWFyR3JhZGllbnQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpbmVhckdyYWRpZW50JyksXG4gIG1hc2s6IGNyZWF0ZURPTUZhY3RvcnkoJ21hc2snKSxcbiAgcGF0aDogY3JlYXRlRE9NRmFjdG9yeSgncGF0aCcpLFxuICBwYXR0ZXJuOiBjcmVhdGVET01GYWN0b3J5KCdwYXR0ZXJuJyksXG4gIHBvbHlnb246IGNyZWF0ZURPTUZhY3RvcnkoJ3BvbHlnb24nKSxcbiAgcG9seWxpbmU6IGNyZWF0ZURPTUZhY3RvcnkoJ3BvbHlsaW5lJyksXG4gIHJhZGlhbEdyYWRpZW50OiBjcmVhdGVET01GYWN0b3J5KCdyYWRpYWxHcmFkaWVudCcpLFxuICByZWN0OiBjcmVhdGVET01GYWN0b3J5KCdyZWN0JyksXG4gIHN0b3A6IGNyZWF0ZURPTUZhY3RvcnkoJ3N0b3AnKSxcbiAgc3ZnOiBjcmVhdGVET01GYWN0b3J5KCdzdmcnKSxcbiAgdGV4dDogY3JlYXRlRE9NRmFjdG9yeSgndGV4dCcpLFxuICB0c3BhbjogY3JlYXRlRE9NRmFjdG9yeSgndHNwYW4nKVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTUZhY3Rvcmllcztcbn0se1wiMTBcIjoxMCxcIjEyXCI6MTJ9XSwxMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IF9kZXJlcV8oMzApO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSBfZGVyZXFfKDgpO1xuXG52YXIgd2FybmluZyA9IF9kZXJlcV8oMjkpO1xudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gX2RlcmVxXygyMCk7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gX2RlcmVxXygxMSk7XG5cbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAga2V5OiB0cnVlLFxuICByZWY6IHRydWUsXG4gIF9fc2VsZjogdHJ1ZSxcbiAgX19zb3VyY2U6IHRydWVcbn07XG5cbnZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biwgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd247XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkUmVmKGNvbmZpZykge1xuICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdyZWYnKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAncmVmJykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLnJlZiAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBoYXNWYWxpZEtleShjb25maWcpIHtcbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAna2V5JykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ2tleScpLmdldDtcbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmZpZy5rZXkgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bikge1xuICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXM6IGBrZXlgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nS2V5LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bikge1xuICAgICAgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXM6IGByZWZgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nUmVmLmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nUmVmLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVhY3QgZWxlbWVudC4gVGhpcyBubyBsb25nZXIgYWRoZXJlcyB0b1xuICogdGhlIGNsYXNzIHBhdHRlcm4sIHNvIGRvIG5vdCB1c2UgbmV3IHRvIGNhbGwgaXQuIEFsc28sIG5vIGluc3RhbmNlb2YgY2hlY2tcbiAqIHdpbGwgd29yay4gSW5zdGVhZCB0ZXN0ICQkdHlwZW9mIGZpZWxkIGFnYWluc3QgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIHRvIGNoZWNrXG4gKiBpZiBzb21ldGhpbmcgaXMgYSBSZWFjdCBFbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7Kn0gdHlwZVxuICogQHBhcmFtIHsqfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcmVmXG4gKiBAcGFyYW0geyp9IHNlbGYgQSAqdGVtcG9yYXJ5KiBoZWxwZXIgdG8gZGV0ZWN0IHBsYWNlcyB3aGVyZSBgdGhpc2AgaXNcbiAqIGRpZmZlcmVudCBmcm9tIHRoZSBgb3duZXJgIHdoZW4gUmVhY3QuY3JlYXRlRWxlbWVudCBpcyBjYWxsZWQsIHNvIHRoYXQgd2VcbiAqIGNhbiB3YXJuLiBXZSB3YW50IHRvIGdldCByaWQgb2Ygb3duZXIgYW5kIHJlcGxhY2Ugc3RyaW5nIGByZWZgcyB3aXRoIGFycm93XG4gKiBmdW5jdGlvbnMsIGFuZCBhcyBsb25nIGFzIGB0aGlzYCBhbmQgb3duZXIgYXJlIHRoZSBzYW1lLCB0aGVyZSB3aWxsIGJlIG5vXG4gKiBjaGFuZ2UgaW4gYmVoYXZpb3IuXG4gKiBAcGFyYW0geyp9IHNvdXJjZSBBbiBhbm5vdGF0aW9uIG9iamVjdCAoYWRkZWQgYnkgYSB0cmFuc3BpbGVyIG9yIG90aGVyd2lzZSlcbiAqIGluZGljYXRpbmcgZmlsZW5hbWUsIGxpbmUgbnVtYmVyLCBhbmQvb3Igb3RoZXIgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0geyp9IG93bmVyXG4gKiBAcGFyYW0geyp9IHByb3BzXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpIHtcbiAgdmFyIGVsZW1lbnQgPSB7XG4gICAgLy8gVGhpcyB0YWcgYWxsb3cgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgLy8gUmVjb3JkIHRoZSBjb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoaXMgZWxlbWVudC5cbiAgICBfb3duZXI6IG93bmVyXG4gIH07XG5cbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gVGhlIHZhbGlkYXRpb24gZmxhZyBpcyBjdXJyZW50bHkgbXV0YXRpdmUuIFdlIHB1dCBpdCBvblxuICAgIC8vIGFuIGV4dGVybmFsIGJhY2tpbmcgc3RvcmUgc28gdGhhdCB3ZSBjYW4gZnJlZXplIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgLy8gVGhpcyBjYW4gYmUgcmVwbGFjZWQgd2l0aCBhIFdlYWtNYXAgb25jZSB0aGV5IGFyZSBpbXBsZW1lbnRlZCBpblxuICAgIC8vIGNvbW1vbmx5IHVzZWQgZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzLlxuICAgIGVsZW1lbnQuX3N0b3JlID0ge307XG5cbiAgICAvLyBUbyBtYWtlIGNvbXBhcmluZyBSZWFjdEVsZW1lbnRzIGVhc2llciBmb3IgdGVzdGluZyBwdXJwb3Nlcywgd2UgbWFrZVxuICAgIC8vIHRoZSB2YWxpZGF0aW9uIGZsYWcgbm9uLWVudW1lcmFibGUgKHdoZXJlIHBvc3NpYmxlLCB3aGljaCBzaG91bGRcbiAgICAvLyBpbmNsdWRlIGV2ZXJ5IGVudmlyb25tZW50IHdlIHJ1biB0ZXN0cyBpbiksIHNvIHRoZSB0ZXN0IGZyYW1ld29ya1xuICAgIC8vIGlnbm9yZXMgaXQuXG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudC5fc3RvcmUsICd2YWxpZGF0ZWQnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NlbGYnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBzZWxmXG4gICAgICB9KTtcbiAgICAgIC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgICAvLyBlcXVhbCBmb3IgdGVzdGluZyBwdXJwb3NlcyBhbmQgdGhlcmVmb3JlIHdlIGhpZGUgaXQgZnJvbSBlbnVtZXJhdGlvbi5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NvdXJjZScsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNvdXJjZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgZWxlbWVudC5fc2VsZiA9IHNlbGY7XG4gICAgICBlbGVtZW50Ll9zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IG9mIHRoZSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNyZWF0ZWVsZW1lbnRcbiAqL1xuUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWU7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIgcHJvcHMgPSB7fTtcblxuICB2YXIga2V5ID0gbnVsbDtcbiAgdmFyIHJlZiA9IG51bGw7XG4gIHZhciBzZWxmID0gbnVsbDtcbiAgdmFyIHNvdXJjZSA9IG51bGw7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgc2VsZiA9IGNvbmZpZy5fX3NlbGYgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zZWxmO1xuICAgIHNvdXJjZSA9IGNvbmZpZy5fX3NvdXJjZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NvdXJjZTtcbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBhcmUgYWRkZWQgdG8gYSBuZXcgcHJvcHMgb2JqZWN0XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICAgIE9iamVjdC5mcmVlemUoY2hpbGRBcnJheSk7XG4gICAgICB9XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICBpZiAodHlwZSAmJiB0eXBlLmRlZmF1bHRQcm9wcykge1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcbiAgICBmb3IgKHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChrZXkgfHwgcmVmKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3BzLiQkdHlwZW9mID09PSAndW5kZWZpbmVkJyB8fCBwcm9wcy4kJHR5cGVvZiAhPT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgICAgIHZhciBkaXNwbGF5TmFtZSA9IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nID8gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgJ1Vua25vd24nIDogdHlwZTtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZikge1xuICAgICAgICAgIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFJlYWN0RWxlbWVudCh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgUmVhY3RFbGVtZW50cyBvZiBhIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlZmFjdG9yeVxuICovXG5SZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHZhciBmYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYmluZChudWxsLCB0eXBlKTtcbiAgLy8gRXhwb3NlIHRoZSB0eXBlIG9uIHRoZSBmYWN0b3J5IGFuZCB0aGUgcHJvdG90eXBlIHNvIHRoYXQgaXQgY2FuIGJlXG4gIC8vIGVhc2lseSBhY2Nlc3NlZCBvbiBlbGVtZW50cy4gRS5nLiBgPEZvbyAvPi50eXBlID09PSBGb29gLlxuICAvLyBUaGlzIHNob3VsZCBub3QgYmUgbmFtZWQgYGNvbnN0cnVjdG9yYCBzaW5jZSB0aGlzIG1heSBub3QgYmUgdGhlIGZ1bmN0aW9uXG4gIC8vIHRoYXQgY3JlYXRlZCB0aGUgZWxlbWVudCwgYW5kIGl0IG1heSBub3QgZXZlbiBiZSBhIGNvbnN0cnVjdG9yLlxuICAvLyBMZWdhY3kgaG9vayBUT0RPOiBXYXJuIGlmIHRoaXMgaXMgYWNjZXNzZWRcbiAgZmFjdG9yeS50eXBlID0gdHlwZTtcbiAgcmV0dXJuIGZhY3Rvcnk7XG59O1xuXG5SZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5ID0gZnVuY3Rpb24gKG9sZEVsZW1lbnQsIG5ld0tleSkge1xuICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudChvbGRFbGVtZW50LnR5cGUsIG5ld0tleSwgb2xkRWxlbWVudC5yZWYsIG9sZEVsZW1lbnQuX3NlbGYsIG9sZEVsZW1lbnQuX3NvdXJjZSwgb2xkRWxlbWVudC5fb3duZXIsIG9sZEVsZW1lbnQucHJvcHMpO1xuXG4gIHJldHVybiBuZXdFbGVtZW50O1xufTtcblxuLyoqXG4gKiBDbG9uZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCB1c2luZyBlbGVtZW50IGFzIHRoZSBzdGFydGluZyBwb2ludC5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jbG9uZWVsZW1lbnRcbiAqL1xuUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBPcmlnaW5hbCBwcm9wcyBhcmUgY29waWVkXG4gIHZhciBwcm9wcyA9IF9hc3NpZ24oe30sIGVsZW1lbnQucHJvcHMpO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIGtleSA9IGVsZW1lbnQua2V5O1xuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gIC8vIFNlbGYgaXMgcHJlc2VydmVkIHNpbmNlIHRoZSBvd25lciBpcyBwcmVzZXJ2ZWQuXG4gIHZhciBzZWxmID0gZWxlbWVudC5fc2VsZjtcbiAgLy8gU291cmNlIGlzIHByZXNlcnZlZCBzaW5jZSBjbG9uZUVsZW1lbnQgaXMgdW5saWtlbHkgdG8gYmUgdGFyZ2V0ZWQgYnkgYVxuICAvLyB0cmFuc3BpbGVyLCBhbmQgdGhlIG9yaWdpbmFsIHNvdXJjZSBpcyBwcm9iYWJseSBhIGJldHRlciBpbmRpY2F0b3Igb2YgdGhlXG4gIC8vIHRydWUgb3duZXIuXG4gIHZhciBzb3VyY2UgPSBlbGVtZW50Ll9zb3VyY2U7XG5cbiAgLy8gT3duZXIgd2lsbCBiZSBwcmVzZXJ2ZWQsIHVubGVzcyByZWYgaXMgb3ZlcnJpZGRlblxuICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgLy8gU2lsZW50bHkgc3RlYWwgdGhlIHJlZiBmcm9tIHRoZSBwYXJlbnQuXG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgICAgb3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgIH1cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIG92ZXJyaWRlIGV4aXN0aW5nIHByb3BzXG4gICAgdmFyIGRlZmF1bHRQcm9wcztcbiAgICBpZiAoZWxlbWVudC50eXBlICYmIGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICAgIGRlZmF1bHRQcm9wcyA9IGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgfVxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIGlmIChjb25maWdbcHJvcE5hbWVdID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICByZXR1cm4gUmVhY3RFbGVtZW50KGVsZW1lbnQudHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKTtcbn07XG5cbi8qKlxuICogVmVyaWZpZXMgdGhlIG9iamVjdCBpcyBhIFJlYWN0RWxlbWVudC5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5pc3ZhbGlkZWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSB2YWxpZCBjb21wb25lbnQuXG4gKiBAZmluYWxcbiAqL1xuUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVsZW1lbnQ7XG59LHtcIjExXCI6MTEsXCIyMFwiOjIwLFwiMjlcIjoyOSxcIjMwXCI6MzAsXCI4XCI6OH1dLDExOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50IHR5cGUuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sWydmb3InXSAmJiBTeW1ib2xbJ2ZvciddKCdyZWFjdC5lbGVtZW50JykgfHwgMHhlYWM3O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcbn0se31dLDEyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4vKipcbiAqIFJlYWN0RWxlbWVudFZhbGlkYXRvciBwcm92aWRlcyBhIHdyYXBwZXIgYXJvdW5kIGEgZWxlbWVudCBmYWN0b3J5XG4gKiB3aGljaCB2YWxpZGF0ZXMgdGhlIHByb3BzIHBhc3NlZCB0byB0aGUgZWxlbWVudC4gVGhpcyBpcyBpbnRlbmRlZCB0byBiZVxuICogdXNlZCBvbmx5IGluIERFViBhbmQgY291bGQgYmUgcmVwbGFjZWQgYnkgYSBzdGF0aWMgdHlwZSBjaGVja2VyIGZvciBsYW5ndWFnZXNcbiAqIHRoYXQgc3VwcG9ydCBpdC5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IF9kZXJlcV8oOCk7XG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IF9kZXJlcV8oNyk7XG52YXIgUmVhY3RFbGVtZW50ID0gX2RlcmVxXygxMCk7XG5cbnZhciBjaGVja1JlYWN0VHlwZVNwZWMgPSBfZGVyZXFfKDIxKTtcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gX2RlcmVxXygyMCk7XG52YXIgZ2V0SXRlcmF0b3JGbiA9IF9kZXJlcV8oMjIpO1xudmFyIHdhcm5pbmcgPSBfZGVyZXFfKDI5KTtcblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkge1xuICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gKiBvYmplY3Qga2V5cyBhcmUgbm90IHZhbGlkLiBUaGlzIGFsbG93cyB1cyB0byBrZWVwIHRyYWNrIG9mIGNoaWxkcmVuIGJldHdlZW5cbiAqIHVwZGF0ZXMuXG4gKi9cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKSB7XG4gIHZhciBpbmZvID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG5cbiAgaWYgKCFpbmZvKSB7XG4gICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG4gICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgIGluZm8gPSAnIENoZWNrIHRoZSB0b3AtbGV2ZWwgcmVuZGVyIGNhbGwgdXNpbmcgPCcgKyBwYXJlbnROYW1lICsgJz4uJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZm87XG59XG5cbi8qKlxuICogV2FybiBpZiB0aGUgZWxlbWVudCBkb2Vzbid0IGhhdmUgYW4gZXhwbGljaXQga2V5IGFzc2lnbmVkIHRvIGl0LlxuICogVGhpcyBlbGVtZW50IGlzIGluIGFuIGFycmF5LiBUaGUgYXJyYXkgY291bGQgZ3JvdyBhbmQgc2hyaW5rIG9yIGJlXG4gKiByZW9yZGVyZWQuIEFsbCBjaGlsZHJlbiB0aGF0IGhhdmVuJ3QgYWxyZWFkeSBiZWVuIHZhbGlkYXRlZCBhcmUgcmVxdWlyZWQgdG9cbiAqIGhhdmUgYSBcImtleVwiIHByb3BlcnR5IGFzc2lnbmVkIHRvIGl0LiBFcnJvciBzdGF0dXNlcyBhcmUgY2FjaGVkIHNvIGEgd2FybmluZ1xuICogd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlRXhwbGljaXRLZXkoZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICBpZiAoIWVsZW1lbnQuX3N0b3JlIHx8IGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCB8fCBlbGVtZW50LmtleSAhPSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG5cbiAgdmFyIG1lbW9pemVyID0gb3duZXJIYXNLZXlVc2VXYXJuaW5nLnVuaXF1ZUtleSB8fCAob3duZXJIYXNLZXlVc2VXYXJuaW5nLnVuaXF1ZUtleSA9IHt9KTtcblxuICB2YXIgY3VycmVudENvbXBvbmVudEVycm9ySW5mbyA9IGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSk7XG4gIGlmIChtZW1vaXplcltjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSkge1xuICAgIHJldHVybjtcbiAgfVxuICBtZW1vaXplcltjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSA9IHRydWU7XG5cbiAgLy8gVXN1YWxseSB0aGUgY3VycmVudCBvd25lciBpcyB0aGUgb2ZmZW5kZXIsIGJ1dCBpZiBpdCBhY2NlcHRzIGNoaWxkcmVuIGFzIGFcbiAgLy8gcHJvcGVydHksIGl0IG1heSBiZSB0aGUgY3JlYXRvciBvZiB0aGUgY2hpbGQgdGhhdCdzIHJlc3BvbnNpYmxlIGZvclxuICAvLyBhc3NpZ25pbmcgaXQgYSBrZXkuXG4gIHZhciBjaGlsZE93bmVyID0gJyc7XG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuX293bmVyICYmIGVsZW1lbnQuX293bmVyICE9PSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgY2hpbGRPd25lciA9ICcgSXQgd2FzIHBhc3NlZCBhIGNoaWxkIGZyb20gJyArIGVsZW1lbnQuX293bmVyLmdldE5hbWUoKSArICcuJztcbiAgfVxuXG4gIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0VhY2ggY2hpbGQgaW4gYW4gYXJyYXkgb3IgaXRlcmF0b3Igc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJXMnLCBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvLCBjaGlsZE93bmVyLCBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEN1cnJlbnRTdGFja0FkZGVuZHVtKGVsZW1lbnQpKSA6IHZvaWQgMDtcbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhhdCBldmVyeSBlbGVtZW50IGVpdGhlciBpcyBwYXNzZWQgaW4gYSBzdGF0aWMgbG9jYXRpb24sIGluIGFuXG4gKiBhcnJheSB3aXRoIGFuIGV4cGxpY2l0IGtleXMgcHJvcGVydHkgZGVmaW5lZCwgb3IgaW4gYW4gb2JqZWN0IGxpdGVyYWxcbiAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgbm9kZSdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUsIHBhcmVudFR5cGUpIHtcbiAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gbm9kZVtpXTtcbiAgICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQobm9kZSkpIHtcbiAgICAvLyBUaGlzIGVsZW1lbnQgd2FzIHBhc3NlZCBpbiBhIHZhbGlkIGxvY2F0aW9uLlxuICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgbm9kZS5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9kZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihub2RlKTtcbiAgICAvLyBFbnRyeSBpdGVyYXRvcnMgcHJvdmlkZSBpbXBsaWNpdCBrZXlzLlxuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGFuIGVsZW1lbnQsIHZhbGlkYXRlIHRoYXQgaXRzIHByb3BzIGZvbGxvdyB0aGUgcHJvcFR5cGVzIGRlZmluaXRpb24sXG4gKiBwcm92aWRlZCBieSB0aGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KSB7XG4gIHZhciBjb21wb25lbnRDbGFzcyA9IGVsZW1lbnQudHlwZTtcbiAgaWYgKHR5cGVvZiBjb21wb25lbnRDbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSA9IGNvbXBvbmVudENsYXNzLmRpc3BsYXlOYW1lIHx8IGNvbXBvbmVudENsYXNzLm5hbWU7XG4gIGlmIChjb21wb25lbnRDbGFzcy5wcm9wVHlwZXMpIHtcbiAgICBjaGVja1JlYWN0VHlwZVNwZWMoY29tcG9uZW50Q2xhc3MucHJvcFR5cGVzLCBlbGVtZW50LnByb3BzLCAncHJvcCcsIG5hbWUsIGVsZW1lbnQsIG51bGwpO1xuICB9XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgfVxufVxuXG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0ge1xuXG4gIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgdmFsaWRUeXBlID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nO1xuICAgIC8vIFdlIHdhcm4gaW4gdGhpcyBjYXNlIGJ1dCBkb24ndCB0aHJvdy4gV2UgZXhwZWN0IHRoZSBlbGVtZW50IGNyZWF0aW9uIHRvXG4gICAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgICBpZiAoIXZhbGlkVHlwZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgaW5mbyA9ICcnO1xuICAgICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHR5cGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGluZm8gKz0gJyBZb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgZnJvbSB0aGUgZmlsZSAnICsgJ2l0XFwncyBkZWZpbmVkIGluLic7XG4gICAgICAgIH1cbiAgICAgICAgaW5mbyArPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnUmVhY3QuY3JlYXRlRWxlbWVudDogdHlwZSBpcyBpbnZhbGlkIC0tIGV4cGVjdGVkIGEgc3RyaW5nIChmb3IgJyArICdidWlsdC1pbiBjb21wb25lbnRzKSBvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlICcgKyAnY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCB0eXBlID09IG51bGwgPyB0eXBlIDogdHlwZW9mIHR5cGUsIGluZm8pIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBlbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIFRoZSByZXN1bHQgY2FuIGJlIG51bGxpc2ggaWYgYSBtb2NrIG9yIGEgY3VzdG9tIGZ1bmN0aW9uIGlzIHVzZWQuXG4gICAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICAgIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgLy8gZG9lc24ndCBleHBlY3QgYSBub24tc3RyaW5nL2Z1bmN0aW9uIHR5cGUgYW5kIGNhbiB0aHJvdyBjb25mdXNpbmcgZXJyb3JzLlxuICAgIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAgIC8vIGZpeGVkLCB0aGUga2V5IHdhcm5pbmdzIHdpbGwgYXBwZWFyLilcbiAgICBpZiAodmFsaWRUeXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIHR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgY3JlYXRlRmFjdG9yeTogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICB2YXIgdmFsaWRhdGVkRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7XG4gICAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gICAgdmFsaWRhdGVkRmFjdG9yeS50eXBlID0gdHlwZTtcblxuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWxpZGF0ZWRGYWN0b3J5LCAndHlwZScsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhY3RvcnkudHlwZSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdGhlIGNsYXNzIGRpcmVjdGx5ICcgKyAnYmVmb3JlIHBhc3NpbmcgaXQgdG8gY3JlYXRlRmFjdG9yeS4nKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndHlwZScsIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdGVkRmFjdG9yeTtcbiAgfSxcblxuICBjbG9uZUVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCBuZXdFbGVtZW50LnR5cGUpO1xuICAgIH1cbiAgICB2YWxpZGF0ZVByb3BUeXBlcyhuZXdFbGVtZW50KTtcbiAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RWxlbWVudFZhbGlkYXRvcjtcbn0se1wiMTBcIjoxMCxcIjIwXCI6MjAsXCIyMVwiOjIxLFwiMjJcIjoyMixcIjI5XCI6MjksXCI3XCI6NyxcIjhcIjo4fV0sMTM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHdhcm5pbmcgPSBfZGVyZXFfKDI5KTtcblxuZnVuY3Rpb24gd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gcHVibGljSW5zdGFuY2UuY29uc3RydWN0b3I7XG4gICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKTogQ2FuIG9ubHkgdXBkYXRlIGEgbW91bnRlZCBvciBtb3VudGluZyBjb21wb25lbnQuICcgKyAnVGhpcyB1c3VhbGx5IG1lYW5zIHlvdSBjYWxsZWQgJXMoKSBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiAnICsgJ1RoaXMgaXMgYSBuby1vcC4gUGxlYXNlIGNoZWNrIHRoZSBjb2RlIGZvciB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNhbGxlck5hbWUsIGNvbnN0cnVjdG9yICYmIChjb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCBjb25zdHJ1Y3Rvci5uYW1lKSB8fCAnUmVhY3RDbGFzcycpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgYWJzdHJhY3QgQVBJIGZvciBhbiB1cGRhdGUgcXVldWUuXG4gKi9cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVucXVldWUgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgYWxsIHRoZSBwZW5kaW5nIHVwZGF0ZXNcbiAgICogaGF2ZSBwcm9jZXNzZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRvIHVzZSBhcyBgdGhpc2AgY29udGV4dC5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVDYWxsYmFjazogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaykge30sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ2ZvcmNlVXBkYXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGFsbCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyBvciBgc2V0U3RhdGVgIHRvIG11dGF0ZSBzdGF0ZS5cbiAgICogWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICAgKlxuICAgKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICAgKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbXBsZXRlU3RhdGUgTmV4dCBzdGF0ZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3JlcGxhY2VTdGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gVGhpcyBvbmx5IGV4aXN0cyBiZWNhdXNlIF9wZW5kaW5nU3RhdGUgaXNcbiAgICogaW50ZXJuYWwuIFRoaXMgcHJvdmlkZXMgYSBtZXJnaW5nIHN0cmF0ZWd5IHRoYXQgaXMgbm90IGF2YWlsYWJsZSB0byBkZWVwXG4gICAqIHByb3BlcnRpZXMgd2hpY2ggaXMgY29uZnVzaW5nLiBUT0RPOiBFeHBvc2UgcGVuZGluZ1N0YXRlIG9yIGRvbid0IHVzZSBpdFxuICAgKiBkdXJpbmcgdGhlIG1lcmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn0se1wiMjlcIjoyOX1dLDE0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0ge307XG5cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHtcbiAgICBwcm9wOiAncHJvcCcsXG4gICAgY29udGV4dDogJ2NvbnRleHQnLFxuICAgIGNoaWxkQ29udGV4dDogJ2NoaWxkIGNvbnRleHQnXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXM7XG59LHt9XSwxNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gX2RlcmVxXygxMCk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSBfZGVyZXFfKDE0KTtcbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IF9kZXJlcV8oMTYpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IF9kZXJlcV8oMjYpO1xudmFyIGdldEl0ZXJhdG9yRm4gPSBfZGVyZXFfKDIyKTtcbnZhciB3YXJuaW5nID0gX2RlcmVxXygyOSk7XG5cbi8qKlxuICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIHByb3BUeXBlczoge1xuICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAqXG4gKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gKlxuICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gKiAgICAgfSxcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICogICB9KTtcbiAqXG4gKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gKlxuICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAqXG4gKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gKlxuICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICBwcm9wVHlwZXM6IHtcbiAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAqICAgICAgICAgICk7XG4gKiAgICAgICAgfVxuICogICAgICB9XG4gKiAgICB9LFxuICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gKiAgfSk7XG4gKlxuICogQGludGVybmFsXG4gKi9cblxudmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxudmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyXG59O1xuXG4vKipcbiAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICovXG4vKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG5mdW5jdGlvbiBpcyh4LCB5KSB7XG4gIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgaWYgKHggPT09IHkpIHtcbiAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gIH1cbn1cbi8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4vKipcbiAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIgd2UgZG9uJ3QgdXNlIHJlYWxcbiAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAqL1xuZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMuc3RhY2sgPSAnJztcbn1cbi8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cblByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG5mdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgfVxuICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgaWYgKCFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0pIHtcbiAgICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICsgJ2Z1bmN0aW9uIGZvciB0aGUgYCVzYCBwcm9wIG9uIGAlc2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICsgJ2FuZCB3aWxsIG5vdCB3b3JrIGluIHByb2R1Y3Rpb24gd2l0aCB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLiAnICsgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nLCBwcm9wRnVsbE5hbWUsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyhudWxsKSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgIH1cbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICBpZiAoIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcyk7XG4gICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgIH1cbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICB9XG4gICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICByZXR1cm4gJ2FycmF5JztcbiAgfVxuICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfVxuICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICByZXR1cm4gJ3N5bWJvbCc7XG4gIH1cbiAgcmV0dXJuIHByb3BUeXBlO1xufVxuXG4vLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4vLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbmZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHByb3BUeXBlO1xufVxuXG4vLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICByZXR1cm4gQU5PTllNT1VTO1xuICB9XG4gIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlcztcbn0se1wiMTBcIjoxMCxcIjE0XCI6MTQsXCIxNlwiOjE2LFwiMjJcIjoyMixcIjI2XCI6MjYsXCIyOVwiOjI5fV0sMTY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xufSx7fV0sMTc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSBfZGVyZXFfKDMwKTtcblxudmFyIFJlYWN0Q29tcG9uZW50ID0gX2RlcmVxXyg2KTtcbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IF9kZXJlcV8oMTMpO1xuXG52YXIgZW1wdHlPYmplY3QgPSBfZGVyZXFfKDI3KTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGhlbHBlcnMgZm9yIHRoZSB1cGRhdGluZyBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gUmVhY3RQdXJlQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIC8vIER1cGxpY2F0ZWQgZnJvbSBSZWFjdENvbXBvbmVudC5cbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCB1cGRhdGVyIGJ1dCB0aGUgcmVhbCBvbmUgZ2V0cyBpbmplY3RlZCBieSB0aGVcbiAgLy8gcmVuZGVyZXIuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cbmZ1bmN0aW9uIENvbXBvbmVudER1bW15KCkge31cbkNvbXBvbmVudER1bW15LnByb3RvdHlwZSA9IFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUgPSBuZXcgQ29tcG9uZW50RHVtbXkoKTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWFjdFB1cmVDb21wb25lbnQ7XG4vLyBBdm9pZCBhbiBleHRyYSBwcm90b3R5cGUganVtcCBmb3IgdGhlc2UgbWV0aG9kcy5cbl9hc3NpZ24oUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDb21wb25lbnQucHJvdG90eXBlKTtcblJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUuaXNQdXJlUmVhY3RDb21wb25lbnQgPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHVyZUNvbXBvbmVudDtcbn0se1wiMTNcIjoxMyxcIjI3XCI6MjcsXCIzMFwiOjMwLFwiNlwiOjZ9XSwxODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IF9kZXJlcV8oMzApO1xuXG52YXIgUmVhY3QgPSBfZGVyZXFfKDMpO1xuXG4vLyBgdmVyc2lvbmAgd2lsbCBiZSBhZGRlZCBoZXJlIGJ5IHRoZSBSZWFjdCBtb2R1bGUuXG52YXIgUmVhY3RVTURFbnRyeSA9IF9hc3NpZ24oe1xuICBfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDoge1xuICAgIFJlYWN0Q3VycmVudE93bmVyOiBfZGVyZXFfKDgpXG4gIH1cbn0sIFJlYWN0KTtcblxuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIF9hc3NpZ24oUmVhY3RVTURFbnRyeS5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCwge1xuICAgIC8vIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgc2hvdWxkIG5vdCBiZSBpbmNsdWRlZCBpbiBwcm9kdWN0aW9uLlxuICAgIFJlYWN0Q29tcG9uZW50VHJlZUhvb2s6IF9kZXJlcV8oNylcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RVTURFbnRyeTtcbn0se1wiM1wiOjMsXCIzMFwiOjMwLFwiN1wiOjcsXCI4XCI6OH1dLDE5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gJzE1LjQuMic7XG59LHt9XSwyMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHRyeSB7XG4gICAgLy8gJEZsb3dGaXhNZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMjg1XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAneCcsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7fSB9KTtcbiAgICBjYW5EZWZpbmVQcm9wZXJ0eSA9IHRydWU7XG4gIH0gY2F0Y2ggKHgpIHtcbiAgICAvLyBJRSB3aWxsIGZhaWwgb24gZGVmaW5lUHJvcGVydHlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbkRlZmluZVByb3BlcnR5O1xufSx7fV0sMjE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IF9kZXJlcV8oMjQpO1xuXG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSBfZGVyZXFfKDE0KTtcbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IF9kZXJlcV8oMTYpO1xuXG52YXIgaW52YXJpYW50ID0gX2RlcmVxXygyOCk7XG52YXIgd2FybmluZyA9IF9kZXJlcV8oMjkpO1xuXG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vaztcblxuaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVudiAmJiBcImRldmVsb3BtZW50XCIgPT09ICd0ZXN0Jykge1xuICAvLyBUZW1wb3JhcnkgaGFjay5cbiAgLy8gSW5saW5lIHJlcXVpcmVzIGRvbid0IHdvcmsgd2VsbCB3aXRoIEplc3Q6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvNzI0MFxuICAvLyBSZW1vdmUgdGhlIGlubGluZSByZXF1aXJlcyB3aGVuIHdlIGRvbid0IG5lZWQgdGhlbSBhbnltb3JlOlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvcHVsbC83MTc4XG4gIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgPSBfZGVyZXFfKDcpO1xufVxuXG52YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P29iamVjdH0gZWxlbWVudCBUaGUgUmVhY3QgZWxlbWVudCB0aGF0IGlzIGJlaW5nIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHs/bnVtYmVyfSBkZWJ1Z0lEIFRoZSBSZWFjdCBjb21wb25lbnQgaW5zdGFuY2UgdGhhdCBpcyBiZWluZyB0eXBlLWNoZWNrZWRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUmVhY3RUeXBlU3BlYyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGVsZW1lbnQsIGRlYnVnSUQpIHtcbiAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgdmFyIGVycm9yO1xuICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICEodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdID09PSAnZnVuY3Rpb24nKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSBSZWFjdC5Qcm9wVHlwZXMuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHR5cGVTcGVjTmFtZSkgOiBfcHJvZEludmFyaWFudCgnODQnLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgdHlwZVNwZWNOYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGVycm9yID0gZXg7XG4gICAgICB9XG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpIDogdm9pZCAwO1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgdmFyIGNvbXBvbmVudFN0YWNrSW5mbyA9ICcnO1xuXG4gICAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGlmICghUmVhY3RDb21wb25lbnRUcmVlSG9vaykge1xuICAgICAgICAgICAgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IF9kZXJlcV8oNyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkZWJ1Z0lEICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb21wb25lbnRTdGFja0luZm8gPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFN0YWNrQWRkZW5kdW1CeUlEKGRlYnVnSUQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29tcG9uZW50U3RhY2tJbmZvID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRDdXJyZW50U3RhY2tBZGRlbmR1bShlbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgJXMgdHlwZTogJXMlcycsIGxvY2F0aW9uLCBlcnJvci5tZXNzYWdlLCBjb21wb25lbnRTdGFja0luZm8pIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUmVhY3RUeXBlU3BlYztcbn0pLmNhbGwodGhpcyx1bmRlZmluZWQpXG59LHtcIjE0XCI6MTQsXCIxNlwiOjE2LFwiMjRcIjoyNCxcIjI4XCI6MjgsXCIyOVwiOjI5LFwiN1wiOjd9XSwyMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbCBTeW1ib2wgKi9cblxudmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICpcbiAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICpcbiAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAqICAgICAgIC4uLlxuICogICAgIH1cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpdGVyYXRvckZuO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SXRlcmF0b3JGbjtcbn0se31dLDIzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSBfZGVyZXFfKDI0KTtcblxudmFyIFJlYWN0RWxlbWVudCA9IF9kZXJlcV8oMTApO1xuXG52YXIgaW52YXJpYW50ID0gX2RlcmVxXygyOCk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgY2hpbGQgaW4gYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuIGFuZCB2ZXJpZmllcyB0aGF0IHRoZXJlXG4gKiBpcyBvbmx5IG9uZSBjaGlsZCBpbiB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ub25seVxuICpcbiAqIFRoZSBjdXJyZW50IGltcGxlbWVudGF0aW9uIG9mIHRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGEgc2luZ2xlIGNoaWxkIGdldHNcbiAqIHBhc3NlZCB3aXRob3V0IGEgd3JhcHBlciwgYnV0IHRoZSBwdXJwb3NlIG9mIHRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHRvXG4gKiBhYnN0cmFjdCBhd2F5IHRoZSBwYXJ0aWN1bGFyIHN0cnVjdHVyZSBvZiBjaGlsZHJlbi5cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IGNoaWxkcmVuIENoaWxkIGNvbGxlY3Rpb24gc3RydWN0dXJlLlxuICogQHJldHVybiB7UmVhY3RFbGVtZW50fSBUaGUgZmlyc3QgYW5kIG9ubHkgYFJlYWN0RWxlbWVudGAgY29udGFpbmVkIGluIHRoZVxuICogc3RydWN0dXJlLlxuICovXG5mdW5jdGlvbiBvbmx5Q2hpbGQoY2hpbGRyZW4pIHtcbiAgIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbikgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0MycpIDogdm9pZCAwO1xuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb25seUNoaWxkO1xufSx7XCIxMFwiOjEwLFwiMjRcIjoyNCxcIjI4XCI6Mjh9XSwyNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBXQVJOSU5HOiBETyBOT1QgbWFudWFsbHkgcmVxdWlyZSB0aGlzIG1vZHVsZS5cbiAqIFRoaXMgaXMgYSByZXBsYWNlbWVudCBmb3IgYGludmFyaWFudCguLi4pYCB1c2VkIGJ5IHRoZSBlcnJvciBjb2RlIHN5c3RlbVxuICogYW5kIHdpbGwgX29ubHlfIGJlIHJlcXVpcmVkIGJ5IHRoZSBjb3JyZXNwb25kaW5nIGJhYmVsIHBhc3MuXG4gKiBJdCBhbHdheXMgdGhyb3dzLlxuICovXG5cbmZ1bmN0aW9uIHJlYWN0UHJvZEludmFyaWFudChjb2RlKSB7XG4gIHZhciBhcmdDb3VudCA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuXG4gIHZhciBtZXNzYWdlID0gJ01pbmlmaWVkIFJlYWN0IGVycm9yICMnICsgY29kZSArICc7IHZpc2l0ICcgKyAnaHR0cDovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2Vycm9yLWRlY29kZXIuaHRtbD9pbnZhcmlhbnQ9JyArIGNvZGU7XG5cbiAgZm9yICh2YXIgYXJnSWR4ID0gMDsgYXJnSWR4IDwgYXJnQ291bnQ7IGFyZ0lkeCsrKSB7XG4gICAgbWVzc2FnZSArPSAnJmFyZ3NbXT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3VtZW50c1thcmdJZHggKyAxXSk7XG4gIH1cblxuICBtZXNzYWdlICs9ICcgZm9yIHRoZSBmdWxsIG1lc3NhZ2Ugb3IgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50JyArICcgZm9yIGZ1bGwgZXJyb3JzIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJztcblxuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCByZWFjdFByb2RJbnZhcmlhbnQncyBvd24gZnJhbWVcblxuICB0aHJvdyBlcnJvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWFjdFByb2RJbnZhcmlhbnQ7XG59LHt9XSwyNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSBfZGVyZXFfKDI0KTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gX2RlcmVxXyg4KTtcbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBfZGVyZXFfKDExKTtcblxudmFyIGdldEl0ZXJhdG9yRm4gPSBfZGVyZXFfKDIyKTtcbnZhciBpbnZhcmlhbnQgPSBfZGVyZXFfKDI4KTtcbnZhciBLZXlFc2NhcGVVdGlscyA9IF9kZXJlcV8oMSk7XG52YXIgd2FybmluZyA9IF9kZXJlcV8oMjkpO1xuXG52YXIgU0VQQVJBVE9SID0gJy4nO1xudmFyIFNVQlNFUEFSQVRPUiA9ICc6JztcblxuLyoqXG4gKiBUaGlzIGlzIGlubGluZWQgZnJvbSBSZWFjdEVsZW1lbnQgc2luY2UgdGhpcyBmaWxlIGlzIHNoYXJlZCBiZXR3ZWVuXG4gKiBpc29tb3JwaGljIGFuZCByZW5kZXJlcnMuIFdlIGNvdWxkIGV4dHJhY3QgdGhpcyB0byBhXG4gKlxuICovXG5cbi8qKlxuICogVE9ETzogVGVzdCB0aGF0IGEgc2luZ2xlIGNoaWxkIGFuZCBhbiBhcnJheSB3aXRoIG9uZSBpdGVtIGhhdmUgdGhlIHNhbWUga2V5XG4gKiBwYXR0ZXJuLlxuICovXG5cbnZhciBkaWRXYXJuQWJvdXRNYXBzID0gZmFsc2U7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBrZXkgc3RyaW5nIHRoYXQgaWRlbnRpZmllcyBhIGNvbXBvbmVudCB3aXRoaW4gYSBzZXQuXG4gKlxuICogQHBhcmFtIHsqfSBjb21wb25lbnQgQSBjb21wb25lbnQgdGhhdCBjb3VsZCBjb250YWluIGEgbWFudWFsIGtleS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJbmRleCB0aGF0IGlzIHVzZWQgaWYgYSBtYW51YWwga2V5IGlzIG5vdCBwcm92aWRlZC5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50S2V5KGNvbXBvbmVudCwgaW5kZXgpIHtcbiAgLy8gRG8gc29tZSB0eXBlY2hlY2tpbmcgaGVyZSBzaW5jZSB3ZSBjYWxsIHRoaXMgYmxpbmRseS4gV2Ugd2FudCB0byBlbnN1cmVcbiAgLy8gdGhhdCB3ZSBkb24ndCBibG9jayBwb3RlbnRpYWwgZnV0dXJlIEVTIEFQSXMuXG4gIGlmIChjb21wb25lbnQgJiYgdHlwZW9mIGNvbXBvbmVudCA9PT0gJ29iamVjdCcgJiYgY29tcG9uZW50LmtleSAhPSBudWxsKSB7XG4gICAgLy8gRXhwbGljaXQga2V5XG4gICAgcmV0dXJuIEtleUVzY2FwZVV0aWxzLmVzY2FwZShjb21wb25lbnQua2V5KTtcbiAgfVxuICAvLyBJbXBsaWNpdCBrZXkgZGV0ZXJtaW5lZCBieSB0aGUgaW5kZXggaW4gdGhlIHNldFxuICByZXR1cm4gaW5kZXgudG9TdHJpbmcoMzYpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lU29GYXIgTmFtZSBvZiB0aGUga2V5IHBhdGggc28gZmFyLlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGludm9rZSB3aXRoIGVhY2ggY2hpbGQgZm91bmQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgVXNlZCB0byBwYXNzIGluZm9ybWF0aW9uIHRocm91Z2hvdXQgdGhlIHRyYXZlcnNhbFxuICogcHJvY2Vzcy5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgbmFtZVNvRmFyLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGNoaWxkcmVuO1xuXG4gIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAvLyBBbGwgb2YgdGhlIGFib3ZlIGFyZSBwZXJjZWl2ZWQgYXMgbnVsbC5cbiAgICBjaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICBpZiAoY2hpbGRyZW4gPT09IG51bGwgfHwgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ251bWJlcicgfHxcbiAgLy8gVGhlIGZvbGxvd2luZyBpcyBpbmxpbmVkIGZyb20gUmVhY3RFbGVtZW50LiBUaGlzIG1lYW5zIHdlIGNhbiBvcHRpbWl6ZVxuICAvLyBzb21lIGNoZWNrcy4gUmVhY3QgRmliZXIgYWxzbyBpbmxpbmVzIHRoaXMgbG9naWMgZm9yIHNpbWlsYXIgcHVycG9zZXMuXG4gIHR5cGUgPT09ICdvYmplY3QnICYmIGNoaWxkcmVuLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICBjYWxsYmFjayh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkcmVuLFxuICAgIC8vIElmIGl0J3MgdGhlIG9ubHkgY2hpbGQsIHRyZWF0IHRoZSBuYW1lIGFzIGlmIGl0IHdhcyB3cmFwcGVkIGluIGFuIGFycmF5XG4gICAgLy8gc28gdGhhdCBpdCdzIGNvbnNpc3RlbnQgaWYgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBncm93cy5cbiAgICBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkcmVuLCAwKSA6IG5hbWVTb0Zhcik7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICB2YXIgY2hpbGQ7XG4gIHZhciBuZXh0TmFtZTtcbiAgdmFyIHN1YnRyZWVDb3VudCA9IDA7IC8vIENvdW50IG9mIGNoaWxkcmVuIGZvdW5kIGluIHRoZSBjdXJyZW50IHN1YnRyZWUuXG4gIHZhciBuZXh0TmFtZVByZWZpeCA9IG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgOiBuYW1lU29GYXIgKyBTVUJTRVBBUkFUT1I7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGkpO1xuICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihjaGlsZHJlbik7XG4gICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChjaGlsZHJlbik7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIGlmIChpdGVyYXRvckZuICE9PSBjaGlsZHJlbi5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpaSA9IDA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBjaGlsZCA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaWkrKyk7XG4gICAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHZhciBtYXBzQXNDaGlsZHJlbkFkZGVuZHVtID0gJyc7XG4gICAgICAgICAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHZhciBtYXBzQXNDaGlsZHJlbk93bmVyTmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgICAgICAgICAgaWYgKG1hcHNBc0NoaWxkcmVuT3duZXJOYW1lKSB7XG4gICAgICAgICAgICAgIG1hcHNBc0NoaWxkcmVuQWRkZW5kdW0gPSAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbWFwc0FzQ2hpbGRyZW5Pd25lck5hbWUgKyAnYC4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZGlkV2FybkFib3V0TWFwcywgJ1VzaW5nIE1hcHMgYXMgY2hpbGRyZW4gaXMgbm90IHlldCBmdWxseSBzdXBwb3J0ZWQuIEl0IGlzIGFuICcgKyAnZXhwZXJpbWVudGFsIGZlYXR1cmUgdGhhdCBtaWdodCBiZSByZW1vdmVkLiBDb252ZXJ0IGl0IHRvIGEgJyArICdzZXF1ZW5jZSAvIGl0ZXJhYmxlIG9mIGtleWVkIFJlYWN0RWxlbWVudHMgaW5zdGVhZC4lcycsIG1hcHNBc0NoaWxkcmVuQWRkZW5kdW0pIDogdm9pZCAwO1xuICAgICAgICAgIGRpZFdhcm5BYm91dE1hcHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgIGNoaWxkID0gZW50cnlbMV07XG4gICAgICAgICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgS2V5RXNjYXBlVXRpbHMuZXNjYXBlKGVudHJ5WzBdKSArIFNVQlNFUEFSQVRPUiArIGdldENvbXBvbmVudEtleShjaGlsZCwgMCk7XG4gICAgICAgICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgYWRkZW5kdW0gPSAnJztcbiAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBhZGRlbmR1bSA9ICcgSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSAnICsgJ2luc3RlYWQgb3Igd3JhcCB0aGUgb2JqZWN0IHVzaW5nIGNyZWF0ZUZyYWdtZW50KG9iamVjdCkgZnJvbSB0aGUgJyArICdSZWFjdCBhZGQtb25zLic7XG4gICAgICAgIGlmIChjaGlsZHJlbi5faXNSZWFjdEVsZW1lbnQpIHtcbiAgICAgICAgICBhZGRlbmR1bSA9ICcgSXQgbG9va3MgbGlrZSB5b3VcXCdyZSB1c2luZyBhbiBlbGVtZW50IGNyZWF0ZWQgYnkgYSBkaWZmZXJlbnQgJyArICd2ZXJzaW9uIG9mIFJlYWN0LiBNYWtlIHN1cmUgdG8gdXNlIG9ubHkgb25lIGNvcHkgb2YgUmVhY3QuJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgICAgICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIGFkZGVuZHVtICs9ICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZHJlblN0cmluZyA9IFN0cmluZyhjaGlsZHJlbik7XG4gICAgICAhZmFsc2UgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ09iamVjdHMgYXJlIG5vdCB2YWxpZCBhcyBhIFJlYWN0IGNoaWxkIChmb3VuZDogJXMpLiVzJywgY2hpbGRyZW5TdHJpbmcgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gJ29iamVjdCB3aXRoIGtleXMgeycgKyBPYmplY3Qua2V5cyhjaGlsZHJlbikuam9pbignLCAnKSArICd9JyA6IGNoaWxkcmVuU3RyaW5nLCBhZGRlbmR1bSkgOiBfcHJvZEludmFyaWFudCgnMzEnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VidHJlZUNvdW50O1xufVxuXG4vKipcbiAqIFRyYXZlcnNlcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAsIGJ1dFxuICogbWlnaHQgYWxzbyBiZSBzcGVjaWZpZWQgdGhyb3VnaCBhdHRyaWJ1dGVzOlxuICpcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbiwgLi4uKWBcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5sZWZ0UGFuZWxDaGlsZHJlbiwgLi4uKWBcbiAqXG4gKiBUaGUgYHRyYXZlcnNlQ29udGV4dGAgaXMgYW4gb3B0aW9uYWwgYXJndW1lbnQgdGhhdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGVcbiAqIGVudGlyZSB0cmF2ZXJzYWwuIEl0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFjY3VtdWxhdGlvbnMgb3IgYW55dGhpbmcgZWxzZSB0aGF0XG4gKiB0aGUgY2FsbGJhY2sgbWlnaHQgZmluZCByZWxldmFudC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIG9iamVjdC5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBUbyBpbnZva2UgdXBvbiB0cmF2ZXJzaW5nIGVhY2ggY2hpbGQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBmb3IgdHJhdmVyc2FsLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgJycsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyYXZlcnNlQWxsQ2hpbGRyZW47XG59LHtcIjFcIjoxLFwiMTFcIjoxMSxcIjIyXCI6MjIsXCIyNFwiOjI0LFwiMjhcIjoyOCxcIjI5XCI6MjksXCI4XCI6OH1dLDI2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247XG59LHt9XSwyNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICBPYmplY3QuZnJlZXplKGVtcHR5T2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eU9iamVjdDtcbn0se31dLDI4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHt9O1xuXG5pZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpO1xuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcbn0se31dLDI5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gX2RlcmVxXygyNik7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgfTtcblxuICAgIHdhcm5pbmcgPSBmdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgICB9XG5cbiAgICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG59LHtcIjI2XCI6MjZ9XSwzMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG5cbn0se31dfSx7fSxbMThdKSgxOClcbn0pOyJdfQ==