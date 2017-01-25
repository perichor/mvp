'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @license
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash core -o ./dist/lodash.core.js`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
;(function () {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '4.17.4';

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG = 1,
      WRAP_PARTIAL_FLAG = 32;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      proxyTag = '[object Proxy]',
      regexpTag = '[object RegExp]',
      stringTag = '[object String]';

  /** Used to match HTML entities and HTML characters. */
  var reUnescapedHtml = /[&<>"']/g,
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Detect free variable `exports`. */
  var freeExports = (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

  /*--------------------------------------------------------------------------*/

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    array.push.apply(array, values);
    return array;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function (object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyOf(object) {
    return function (key) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.reduce` and `_.reduceRight`, without support
   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initAccum Specify using the first or last element of
   *  `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */
  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, function (value, index, collection) {
      accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return baseMap(props, function (key) {
      return object[key];
    });
  }

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  var escapeHtmlChar = basePropertyOf(htmlEscapes);

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }

  /*--------------------------------------------------------------------------*/

  /** Used for built-in method references. */
  var arrayProto = Array.prototype,
      objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to generate unique IDs. */
  var idCounter = 0;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Used to restore the original `_` reference in `_.noConflict`. */
  var oldDash = root._;

  /** Built-in value references. */
  var objectCreate = Object.create,
      propertyIsEnumerable = objectProto.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsFinite = root.isFinite,
      nativeKeys = overArg(Object.keys, Object),
      nativeMax = Math.max;

  /*------------------------------------------------------------------------*/

  /**
   * Creates a `lodash` object which wraps `value` to enable implicit method
   * chain sequences. Methods that operate on and return arrays, collections,
   * and functions can be chained together. Methods that retrieve a single value
   * or may return a primitive value will automatically end the chain sequence
   * and return the unwrapped value. Otherwise, the value must be unwrapped
   * with `_#value`.
   *
   * Explicit chain sequences, which must be unwrapped with `_#value`, may be
   * enabled using `_.chain`.
   *
   * The execution of chained methods is lazy, that is, it's deferred until
   * `_#value` is implicitly or explicitly called.
   *
   * Lazy evaluation allows several methods to support shortcut fusion.
   * Shortcut fusion is an optimization to merge iteratee calls; this avoids
   * the creation of intermediate arrays and can greatly reduce the number of
   * iteratee executions. Sections of a chain sequence qualify for shortcut
   * fusion if the section is applied to an array and iteratees accept only
   * one argument. The heuristic for whether a section qualifies for shortcut
   * fusion is subject to change.
   *
   * Chaining is supported in custom builds as long as the `_#value` method is
   * directly or indirectly included in the build.
   *
   * In addition to lodash methods, wrappers have `Array` and `String` methods.
   *
   * The wrapper `Array` methods are:
   * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
   *
   * The wrapper `String` methods are:
   * `replace` and `split`
   *
   * The wrapper methods that support shortcut fusion are:
   * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
   * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
   * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
   *
   * The chainable wrapper methods are:
   * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
   * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
   * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
   * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
   * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
   * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
   * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
   * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
   * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
   * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
   * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
   * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
   * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
   * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
   * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
   * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
   * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
   * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
   * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
   * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
   * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
   * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
   * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
   * `zipObject`, `zipObjectDeep`, and `zipWith`
   *
   * The wrapper methods that are **not** chainable by default are:
   * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
   * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
   * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
   * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
   * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
   * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
   * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
   * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
   * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
   * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
   * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
   * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
   * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
   * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
   * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
   * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
   * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
   * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
   * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
   * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
   * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
   * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
   * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
   * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
   * `upperFirst`, `value`, and `words`
   *
   * @name _
   * @constructor
   * @category Seq
   * @param {*} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var wrapped = _([1, 2, 3]);
   *
   * // Returns an unwrapped value.
   * wrapped.reduce(_.add);
   * // => 6
   *
   * // Returns a wrapped value.
   * var squares = wrapped.map(square);
   *
   * _.isArray(squares);
   * // => false
   *
   * _.isArray(squares.value());
   * // => true
   */
  function lodash(value) {
    return value instanceof LodashWrapper ? value : new LodashWrapper(value);
  }

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = function () {
    function object() {}
    return function (proto) {
      if (!isObject(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object();
      object.prototype = undefined;
      return result;
    };
  }();

  /**
   * The base constructor for creating `lodash` wrapper objects.
   *
   * @private
   * @param {*} value The value to wrap.
   * @param {boolean} [chainAll] Enable explicit method chain sequences.
   */
  function LodashWrapper(value, chainAll) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__chain__ = !!chainAll;
  }

  LodashWrapper.prototype = baseCreate(lodash.prototype);
  LodashWrapper.prototype.constructor = LodashWrapper;

  /*------------------------------------------------------------------------*/

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    object[key] = value;
  }

  /**
   * The base implementation of `_.delay` and `_.defer` which accepts `args`
   * to provide to `func`.
   *
   * @private
   * @param {Function} func The function to delay.
   * @param {number} wait The number of milliseconds to delay invocation.
   * @param {Array} args The arguments to provide to `func`.
   * @returns {number|Object} Returns the timer id or timeout object.
   */
  function baseDelay(func, wait, args) {
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    return setTimeout(function () {
      func.apply(undefined, args);
    }, wait);
  }

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEach = createBaseEach(baseForOwn);

  /**
   * The base implementation of `_.every` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`
   */
  function baseEvery(collection, predicate) {
    var result = true;
    baseEach(collection, function (value, index, collection) {
      result = !!predicate(value, index, collection);
      return result;
    });
    return result;
  }

  /**
   * The base implementation of methods like `_.max` and `_.min` which accepts a
   * `comparator` to determine the extremum value.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The iteratee invoked per iteration.
   * @param {Function} comparator The comparator used to compare values.
   * @returns {*} Returns the extremum value.
   */
  function baseExtremum(array, iteratee, comparator) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      var value = array[index],
          current = iteratee(value);

      if (current != null && (computed === undefined ? current === current && !false : comparator(current, computed))) {
        var computed = current,
            result = value;
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.filter` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function baseFilter(collection, predicate) {
    var result = [];
    baseEach(collection, function (value, index, collection) {
      if (predicate(value, index, collection)) {
        result.push(value);
      }
    });
    return result;
  }

  /**
   * The base implementation of `_.flatten` with support for restricting flattening.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {number} depth The maximum recursion depth.
   * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
   * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
   * @param {Array} [result=[]] The initial result value.
   * @returns {Array} Returns the new flattened array.
   */
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1,
        length = array.length;

    predicate || (predicate = isFlattenable);
    result || (result = []);

    while (++index < length) {
      var value = array[index];
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          // Recursively flatten arrays (susceptible to call stack limits).
          baseFlatten(value, depth - 1, predicate, isStrict, result);
        } else {
          arrayPush(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = createBaseFor();

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
  }

  /**
   * The base implementation of `_.functions` which creates an array of
   * `object` function property names filtered from `props`.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Array} props The property names to filter.
   * @returns {Array} Returns the function names.
   */
  function baseFunctions(object, props) {
    return baseFilter(props, function (key) {
      return isFunction(object[key]);
    });
  }

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    return objectToString(value);
  }

  /**
   * The base implementation of `_.gt` which doesn't coerce arguments.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if `value` is greater than `other`,
   *  else `false`.
   */
  function baseGt(value, other) {
    return value > other;
  }

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  var baseIsArguments = noop;

  /**
   * The base implementation of `_.isDate` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
   */
  function baseIsDate(value) {
    return isObjectLike(value) && baseGetTag(value) == dateTag;
  }

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object),
        othIsArr = isArray(other),
        objTag = objIsArr ? arrayTag : baseGetTag(object),
        othTag = othIsArr ? arrayTag : baseGetTag(other);

    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;

    var objIsObj = objTag == objectTag,
        othIsObj = othTag == objectTag,
        isSameTag = objTag == othTag;

    stack || (stack = []);
    var objStack = find(stack, function (entry) {
      return entry[0] == object;
    });
    var othStack = find(stack, function (entry) {
      return entry[0] == other;
    });
    if (objStack && othStack) {
      return objStack[1] == other;
    }
    stack.push([object, other]);
    stack.push([other, object]);
    if (isSameTag && !objIsObj) {
      var result = objIsArr ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      stack.pop();
      return result;
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;

        var result = equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        stack.pop();
        return result;
      }
    }
    if (!isSameTag) {
      return false;
    }
    var result = equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    stack.pop();
    return result;
  }

  /**
   * The base implementation of `_.isRegExp` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
   */
  function baseIsRegExp(value) {
    return isObjectLike(value) && baseGetTag(value) == regexpTag;
  }

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */
  function baseIteratee(func) {
    if (typeof func == 'function') {
      return func;
    }
    if (func == null) {
      return identity;
    }
    return ((typeof func === 'undefined' ? 'undefined' : _typeof(func)) == 'object' ? baseMatches : baseProperty)(func);
  }

  /**
   * The base implementation of `_.lt` which doesn't coerce arguments.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if `value` is less than `other`,
   *  else `false`.
   */
  function baseLt(value, other) {
    return value < other;
  }

  /**
   * The base implementation of `_.map` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function baseMap(collection, iteratee) {
    var index = -1,
        result = isArrayLike(collection) ? Array(collection.length) : [];

    baseEach(collection, function (value, key, collection) {
      result[++index] = iteratee(value, key, collection);
    });
    return result;
  }

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatches(source) {
    var props = nativeKeys(source);
    return function (object) {
      var length = props.length;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (length--) {
        var key = props[length];
        if (!(key in object && baseIsEqual(source[key], object[key], COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG))) {
          return false;
        }
      }
      return true;
    };
  }

  /**
   * The base implementation of `_.pick` without support for individual
   * property identifiers.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} paths The property paths to pick.
   * @returns {Object} Returns the new object.
   */
  function basePick(object, props) {
    object = Object(object);
    return reduce(props, function (result, key) {
      if (key in object) {
        result[key] = object[key];
      }
      return result;
    }, {});
  }

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return setToString(overRest(func, start, identity), func + '');
  }

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source) {
    return baseSlice(source, 0, source.length);
  }

  /**
   * The base implementation of `_.some` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function baseSome(collection, predicate) {
    var result;

    baseEach(collection, function (value, index, collection) {
      result = predicate(value, index, collection);
      return !result;
    });
    return !!result;
  }

  /**
   * The base implementation of `wrapperValue` which returns the result of
   * performing a sequence of actions on the unwrapped `value`, where each
   * successive action is supplied the return value of the previous.
   *
   * @private
   * @param {*} value The unwrapped value.
   * @param {Array} actions Actions to perform to resolve the unwrapped value.
   * @returns {*} Returns the resolved value.
   */
  function baseWrapperValue(value, actions) {
    var result = value;
    return reduce(actions, function (result, action) {
      return action.func.apply(action.thisArg, arrayPush([result], action.args));
    }, result);
  }

  /**
   * Compares values to sort them in ascending order.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {number} Returns the sort order indicator for `value`.
   */
  function compareAscending(value, other) {
    if (value !== other) {
      var valIsDefined = value !== undefined,
          valIsNull = value === null,
          valIsReflexive = value === value,
          valIsSymbol = false;

      var othIsDefined = other !== undefined,
          othIsNull = other === null,
          othIsReflexive = other === other,
          othIsSymbol = false;

      if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
        return 1;
      }
      if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
        return -1;
      }
    }
    return 0;
  }

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return baseRest(function (object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined;

      customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach(eachFunc, fromRight) {
    return function (collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length,
          index = fromRight ? length : -1,
          iterable = Object(collection);

      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function (object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  /**
   * Creates a function that produces an instance of `Ctor` regardless of
   * whether it was invoked as part of a `new` expression or by `call` or `apply`.
   *
   * @private
   * @param {Function} Ctor The constructor to wrap.
   * @returns {Function} Returns the new wrapped function.
   */
  function createCtor(Ctor) {
    return function () {
      // Use a `switch` statement to work with class constructors. See
      // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
      // for more details.
      var args = arguments;
      var thisBinding = baseCreate(Ctor.prototype),
          result = Ctor.apply(thisBinding, args);

      // Mimic the constructor's `return` behavior.
      // See https://es5.github.io/#x13.2.2 for more details.
      return isObject(result) ? result : thisBinding;
    };
  }

  /**
   * Creates a `_.find` or `_.findLast` function.
   *
   * @private
   * @param {Function} findIndexFunc The function to find the collection index.
   * @returns {Function} Returns the new find function.
   */
  function createFind(findIndexFunc) {
    return function (collection, predicate, fromIndex) {
      var iterable = Object(collection);
      if (!isArrayLike(collection)) {
        var iteratee = baseIteratee(predicate, 3);
        collection = keys(collection);
        predicate = function predicate(key) {
          return iteratee(iterable[key], key, iterable);
        };
      }
      var index = findIndexFunc(collection, predicate, fromIndex);
      return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
    };
  }

  /**
   * Creates a function that wraps `func` to invoke it with the `this` binding
   * of `thisArg` and `partials` prepended to the arguments it receives.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} partials The arguments to prepend to those provided to
   *  the new function.
   * @returns {Function} Returns the new wrapped function.
   */
  function createPartial(func, bitmask, thisArg, partials) {
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var isBind = bitmask & WRAP_BIND_FLAG,
        Ctor = createCtor(func);

    function wrapper() {
      var argsIndex = -1,
          argsLength = arguments.length,
          leftIndex = -1,
          leftLength = partials.length,
          args = Array(leftLength + argsLength),
          fn = this && this !== root && this instanceof wrapper ? Ctor : func;

      while (++leftIndex < leftLength) {
        args[leftIndex] = partials[leftIndex];
      }
      while (argsLength--) {
        args[leftIndex++] = arguments[++argsIndex];
      }
      return fn.apply(isBind ? thisArg : this, args);
    }
    return wrapper;
  }

  /**
   * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
   * of source objects to the destination object for all destination properties
   * that resolve to `undefined`.
   *
   * @private
   * @param {*} objValue The destination value.
   * @param {*} srcValue The source value.
   * @param {string} key The key of the property to assign.
   * @param {Object} object The parent object of `objValue`.
   * @returns {*} Returns the value to assign.
   */
  function customDefaultsAssignIn(objValue, srcValue, key, object) {
    if (objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
      return srcValue;
    }
    return objValue;
  }

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var index = -1,
        result = true,
        seen = bitmask & COMPARE_UNORDERED_FLAG ? [] : undefined;

    // Ignore non-index properties.
    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      var compared;
      if (compared !== undefined) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      // Recursively compare arrays (susceptible to call stack limits).
      if (seen) {
        if (!baseSome(other, function (othValue, othIndex) {
          if (!indexOf(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    return result;
  }

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {

      case boolTag:
      case dateTag:
      case numberTag:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq(+object, +other);

      case errorTag:
        return object.name == other.name && object.message == other.message;

      case regexpTag:
      case stringTag:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == other + '';

    }
    return false;
  }

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
        objProps = keys(object),
        objLength = objProps.length,
        othProps = keys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
        return false;
      }
    }
    var result = true;

    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      var compared;
      // Recursively compare objects (susceptible to call stack limits).
      if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      // Non `Object` object instances with different constructors are not equal.
      if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    return result;
  }

  /**
   * A specialized version of `baseRest` which flattens the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @returns {Function} Returns the new function.
   */
  function flatRest(func) {
    return setToString(overRest(func, undefined, flatten), func + '');
  }

  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenable(value) {
    return isArray(value) || isArguments(value);
  }

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
    return function () {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return func.apply(this, otherArgs);
    };
  }

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = identity;

  /*------------------------------------------------------------------------*/

  /**
   * Creates an array with all falsey values removed. The values `false`, `null`,
   * `0`, `""`, `undefined`, and `NaN` are falsey.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to compact.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.compact([0, 1, false, 2, '', 3]);
   * // => [1, 2, 3]
   */
  function compact(array) {
    return baseFilter(array, Boolean);
  }

  /**
   * Creates a new array concatenating `array` with any additional arrays
   * and/or values.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to concatenate.
   * @param {...*} [values] The values to concatenate.
   * @returns {Array} Returns the new concatenated array.
   * @example
   *
   * var array = [1];
   * var other = _.concat(array, 2, [3], [[4]]);
   *
   * console.log(other);
   * // => [1, 2, 3, [4]]
   *
   * console.log(array);
   * // => [1]
   */
  function concat() {
    var length = arguments.length;
    if (!length) {
      return [];
    }
    var args = Array(length - 1),
        array = arguments[0],
        index = length;

    while (index--) {
      args[index - 1] = arguments[index];
    }
    return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
  }

  /**
   * This method is like `_.find` except that it returns the index of the first
   * element `predicate` returns truthy for instead of the element itself.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the found element, else `-1`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'active': false },
   *   { 'user': 'fred',    'active': false },
   *   { 'user': 'pebbles', 'active': true }
   * ];
   *
   * _.findIndex(users, function(o) { return o.user == 'barney'; });
   * // => 0
   *
   * // The `_.matches` iteratee shorthand.
   * _.findIndex(users, { 'user': 'fred', 'active': false });
   * // => 1
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.findIndex(users, ['active', false]);
   * // => 0
   *
   * // The `_.property` iteratee shorthand.
   * _.findIndex(users, 'active');
   * // => 2
   */
  function findIndex(array, predicate, fromIndex) {
    var length = array == null ? 0 : array.length;
    if (!length) {
      return -1;
    }
    var index = fromIndex == null ? 0 : toInteger(fromIndex);
    if (index < 0) {
      index = nativeMax(length + index, 0);
    }
    return baseFindIndex(array, baseIteratee(predicate, 3), index);
  }

  /**
   * Flattens `array` a single level deep.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to flatten.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flatten([1, [2, [3, [4]], 5]]);
   * // => [1, 2, [3, [4]], 5]
   */
  function flatten(array) {
    var length = array == null ? 0 : array.length;
    return length ? baseFlatten(array, 1) : [];
  }

  /**
   * Recursively flattens `array`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The array to flatten.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flattenDeep([1, [2, [3, [4]], 5]]);
   * // => [1, 2, 3, 4, 5]
   */
  function flattenDeep(array) {
    var length = array == null ? 0 : array.length;
    return length ? baseFlatten(array, INFINITY) : [];
  }

  /**
   * Gets the first element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias first
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the first element of `array`.
   * @example
   *
   * _.head([1, 2, 3]);
   * // => 1
   *
   * _.head([]);
   * // => undefined
   */
  function head(array) {
    return array && array.length ? array[0] : undefined;
  }

  /**
   * Gets the index at which the first occurrence of `value` is found in `array`
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons. If `fromIndex` is negative, it's used as the
   * offset from the end of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   * @example
   *
   * _.indexOf([1, 2, 1, 2], 2);
   * // => 1
   *
   * // Search from the `fromIndex`.
   * _.indexOf([1, 2, 1, 2], 2, 2);
   * // => 3
   */
  function indexOf(array, value, fromIndex) {
    var length = array == null ? 0 : array.length;
    if (typeof fromIndex == 'number') {
      fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
    } else {
      fromIndex = 0;
    }
    var index = (fromIndex || 0) - 1,
        isReflexive = value === value;

    while (++index < length) {
      var other = array[index];
      if (isReflexive ? other === value : other !== other) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Gets the last element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the last element of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   */
  function last(array) {
    var length = array == null ? 0 : array.length;
    return length ? array[length - 1] : undefined;
  }

  /**
   * Creates a slice of `array` from `start` up to, but not including, `end`.
   *
   * **Note:** This method is used instead of
   * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
   * returned.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function slice(array, start, end) {
    var length = array == null ? 0 : array.length;
    start = start == null ? 0 : +start;
    end = end === undefined ? length : +end;
    return length ? baseSlice(array, start, end) : [];
  }

  /*------------------------------------------------------------------------*/

  /**
   * Creates a `lodash` wrapper instance that wraps `value` with explicit method
   * chain sequences enabled. The result of such sequences must be unwrapped
   * with `_#value`.
   *
   * @static
   * @memberOf _
   * @since 1.3.0
   * @category Seq
   * @param {*} value The value to wrap.
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'age': 36 },
   *   { 'user': 'fred',    'age': 40 },
   *   { 'user': 'pebbles', 'age': 1 }
   * ];
   *
   * var youngest = _
   *   .chain(users)
   *   .sortBy('age')
   *   .map(function(o) {
   *     return o.user + ' is ' + o.age;
   *   })
   *   .head()
   *   .value();
   * // => 'pebbles is 1'
   */
  function chain(value) {
    var result = lodash(value);
    result.__chain__ = true;
    return result;
  }

  /**
   * This method invokes `interceptor` and returns `value`. The interceptor
   * is invoked with one argument; (value). The purpose of this method is to
   * "tap into" a method chain sequence in order to modify intermediate results.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Seq
   * @param {*} value The value to provide to `interceptor`.
   * @param {Function} interceptor The function to invoke.
   * @returns {*} Returns `value`.
   * @example
   *
   * _([1, 2, 3])
   *  .tap(function(array) {
   *    // Mutate input array.
   *    array.pop();
   *  })
   *  .reverse()
   *  .value();
   * // => [2, 1]
   */
  function tap(value, interceptor) {
    interceptor(value);
    return value;
  }

  /**
   * This method is like `_.tap` except that it returns the result of `interceptor`.
   * The purpose of this method is to "pass thru" values replacing intermediate
   * results in a method chain sequence.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Seq
   * @param {*} value The value to provide to `interceptor`.
   * @param {Function} interceptor The function to invoke.
   * @returns {*} Returns the result of `interceptor`.
   * @example
   *
   * _('  abc  ')
   *  .chain()
   *  .trim()
   *  .thru(function(value) {
   *    return [value];
   *  })
   *  .value();
   * // => ['abc']
   */
  function thru(value, interceptor) {
    return interceptor(value);
  }

  /**
   * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
   *
   * @name chain
   * @memberOf _
   * @since 0.1.0
   * @category Seq
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36 },
   *   { 'user': 'fred',   'age': 40 }
   * ];
   *
   * // A sequence without explicit chaining.
   * _(users).head();
   * // => { 'user': 'barney', 'age': 36 }
   *
   * // A sequence with explicit chaining.
   * _(users)
   *   .chain()
   *   .head()
   *   .pick('user')
   *   .value();
   * // => { 'user': 'barney' }
   */
  function wrapperChain() {
    return chain(this);
  }

  /**
   * Executes the chain sequence to resolve the unwrapped value.
   *
   * @name value
   * @memberOf _
   * @since 0.1.0
   * @alias toJSON, valueOf
   * @category Seq
   * @returns {*} Returns the resolved unwrapped value.
   * @example
   *
   * _([1, 2, 3]).value();
   * // => [1, 2, 3]
   */
  function wrapperValue() {
    return baseWrapperValue(this.__wrapped__, this.__actions__);
  }

  /*------------------------------------------------------------------------*/

  /**
   * Checks if `predicate` returns truthy for **all** elements of `collection`.
   * Iteration is stopped once `predicate` returns falsey. The predicate is
   * invoked with three arguments: (value, index|key, collection).
   *
   * **Note:** This method returns `true` for
   * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
   * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
   * elements of empty collections.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   * @example
   *
   * _.every([true, 1, null, 'yes'], Boolean);
   * // => false
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': false },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.every(users, { 'user': 'barney', 'active': false });
   * // => false
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.every(users, ['active', false]);
   * // => true
   *
   * // The `_.property` iteratee shorthand.
   * _.every(users, 'active');
   * // => false
   */
  function every(collection, predicate, guard) {
    predicate = guard ? undefined : predicate;
    return baseEvery(collection, baseIteratee(predicate));
  }

  /**
   * Iterates over elements of `collection`, returning an array of all elements
   * `predicate` returns truthy for. The predicate is invoked with three
   * arguments: (value, index|key, collection).
   *
   * **Note:** Unlike `_.remove`, this method returns a new array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   * @see _.reject
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * _.filter(users, function(o) { return !o.active; });
   * // => objects for ['fred']
   *
   * // The `_.matches` iteratee shorthand.
   * _.filter(users, { 'age': 36, 'active': true });
   * // => objects for ['barney']
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.filter(users, ['active', false]);
   * // => objects for ['fred']
   *
   * // The `_.property` iteratee shorthand.
   * _.filter(users, 'active');
   * // => objects for ['barney']
   */
  function filter(collection, predicate) {
    return baseFilter(collection, baseIteratee(predicate));
  }

  /**
   * Iterates over elements of `collection`, returning the first element
   * `predicate` returns truthy for. The predicate is invoked with three
   * arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {*} Returns the matched element, else `undefined`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'age': 36, 'active': true },
   *   { 'user': 'fred',    'age': 40, 'active': false },
   *   { 'user': 'pebbles', 'age': 1,  'active': true }
   * ];
   *
   * _.find(users, function(o) { return o.age < 40; });
   * // => object for 'barney'
   *
   * // The `_.matches` iteratee shorthand.
   * _.find(users, { 'age': 1, 'active': true });
   * // => object for 'pebbles'
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.find(users, ['active', false]);
   * // => object for 'fred'
   *
   * // The `_.property` iteratee shorthand.
   * _.find(users, 'active');
   * // => object for 'barney'
   */
  var find = createFind(findIndex);

  /**
   * Iterates over elements of `collection` and invokes `iteratee` for each element.
   * The iteratee is invoked with three arguments: (value, index|key, collection).
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * **Note:** As with other "Collections" methods, objects with a "length"
   * property are iterated like arrays. To avoid this behavior use `_.forIn`
   * or `_.forOwn` for object iteration.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias each
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   * @see _.forEachRight
   * @example
   *
   * _.forEach([1, 2], function(value) {
   *   console.log(value);
   * });
   * // => Logs `1` then `2`.
   *
   * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
   *   console.log(key);
   * });
   * // => Logs 'a' then 'b' (iteration order is not guaranteed).
   */
  function forEach(collection, iteratee) {
    return baseEach(collection, baseIteratee(iteratee));
  }

  /**
   * Creates an array of values by running each element in `collection` thru
   * `iteratee`. The iteratee is invoked with three arguments:
   * (value, index|key, collection).
   *
   * Many lodash methods are guarded to work as iteratees for methods like
   * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
   *
   * The guarded methods are:
   * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
   * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
   * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
   * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * _.map([4, 8], square);
   * // => [16, 64]
   *
   * _.map({ 'a': 4, 'b': 8 }, square);
   * // => [16, 64] (iteration order is not guaranteed)
   *
   * var users = [
   *   { 'user': 'barney' },
   *   { 'user': 'fred' }
   * ];
   *
   * // The `_.property` iteratee shorthand.
   * _.map(users, 'user');
   * // => ['barney', 'fred']
   */
  function map(collection, iteratee) {
    return baseMap(collection, baseIteratee(iteratee));
  }

  /**
   * Reduces `collection` to a value which is the accumulated result of running
   * each element in `collection` thru `iteratee`, where each successive
   * invocation is supplied the return value of the previous. If `accumulator`
   * is not given, the first element of `collection` is used as the initial
   * value. The iteratee is invoked with four arguments:
   * (accumulator, value, index|key, collection).
   *
   * Many lodash methods are guarded to work as iteratees for methods like
   * `_.reduce`, `_.reduceRight`, and `_.transform`.
   *
   * The guarded methods are:
   * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
   * and `sortBy`
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @returns {*} Returns the accumulated value.
   * @see _.reduceRight
   * @example
   *
   * _.reduce([1, 2], function(sum, n) {
   *   return sum + n;
   * }, 0);
   * // => 3
   *
   * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
   *   (result[value] || (result[value] = [])).push(key);
   *   return result;
   * }, {});
   * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
   */
  function reduce(collection, iteratee, accumulator) {
    return baseReduce(collection, baseIteratee(iteratee), accumulator, arguments.length < 3, baseEach);
  }

  /**
   * Gets the size of `collection` by returning its length for array-like
   * values or the number of own enumerable string keyed properties for objects.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object|string} collection The collection to inspect.
   * @returns {number} Returns the collection size.
   * @example
   *
   * _.size([1, 2, 3]);
   * // => 3
   *
   * _.size({ 'a': 1, 'b': 2 });
   * // => 2
   *
   * _.size('pebbles');
   * // => 7
   */
  function size(collection) {
    if (collection == null) {
      return 0;
    }
    collection = isArrayLike(collection) ? collection : nativeKeys(collection);
    return collection.length;
  }

  /**
   * Checks if `predicate` returns truthy for **any** element of `collection`.
   * Iteration is stopped once `predicate` returns truthy. The predicate is
   * invoked with three arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   * @example
   *
   * _.some([null, 0, 'yes', false], Boolean);
   * // => true
   *
   * var users = [
   *   { 'user': 'barney', 'active': true },
   *   { 'user': 'fred',   'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.some(users, { 'user': 'barney', 'active': false });
   * // => false
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.some(users, ['active', false]);
   * // => true
   *
   * // The `_.property` iteratee shorthand.
   * _.some(users, 'active');
   * // => true
   */
  function some(collection, predicate, guard) {
    predicate = guard ? undefined : predicate;
    return baseSome(collection, baseIteratee(predicate));
  }

  /**
   * Creates an array of elements, sorted in ascending order by the results of
   * running each element in a collection thru each iteratee. This method
   * performs a stable sort, that is, it preserves the original sort order of
   * equal elements. The iteratees are invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {...(Function|Function[])} [iteratees=[_.identity]]
   *  The iteratees to sort by.
   * @returns {Array} Returns the new sorted array.
   * @example
   *
   * var users = [
   *   { 'user': 'fred',   'age': 48 },
   *   { 'user': 'barney', 'age': 36 },
   *   { 'user': 'fred',   'age': 40 },
   *   { 'user': 'barney', 'age': 34 }
   * ];
   *
   * _.sortBy(users, [function(o) { return o.user; }]);
   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
   *
   * _.sortBy(users, ['user', 'age']);
   * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
   */
  function sortBy(collection, iteratee) {
    var index = 0;
    iteratee = baseIteratee(iteratee);

    return baseMap(baseMap(collection, function (value, key, collection) {
      return { 'value': value, 'index': index++, 'criteria': iteratee(value, key, collection) };
    }).sort(function (object, other) {
      return compareAscending(object.criteria, other.criteria) || object.index - other.index;
    }), baseProperty('value'));
  }

  /*------------------------------------------------------------------------*/

  /**
   * Creates a function that invokes `func`, with the `this` binding and arguments
   * of the created function, while it's called less than `n` times. Subsequent
   * calls to the created function return the result of the last `func` invocation.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Function
   * @param {number} n The number of calls at which `func` is no longer invoked.
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * jQuery(element).on('click', _.before(5, addContactToList));
   * // => Allows adding up to 4 contacts to the list.
   */
  function before(n, func) {
    var result;
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    n = toInteger(n);
    return function () {
      if (--n > 0) {
        result = func.apply(this, arguments);
      }
      if (n <= 1) {
        func = undefined;
      }
      return result;
    };
  }

  /**
   * Creates a function that invokes `func` with the `this` binding of `thisArg`
   * and `partials` prepended to the arguments it receives.
   *
   * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
   * may be used as a placeholder for partially applied arguments.
   *
   * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
   * property of bound functions.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to bind.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {...*} [partials] The arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * function greet(greeting, punctuation) {
   *   return greeting + ' ' + this.user + punctuation;
   * }
   *
   * var object = { 'user': 'fred' };
   *
   * var bound = _.bind(greet, object, 'hi');
   * bound('!');
   * // => 'hi fred!'
   *
   * // Bound with placeholders.
   * var bound = _.bind(greet, object, _, '!');
   * bound('hi');
   * // => 'hi fred!'
   */
  var bind = baseRest(function (func, thisArg, partials) {
    return createPartial(func, WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG, thisArg, partials);
  });

  /**
   * Defers invoking the `func` until the current call stack has cleared. Any
   * additional arguments are provided to `func` when it's invoked.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to defer.
   * @param {...*} [args] The arguments to invoke `func` with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.defer(function(text) {
   *   console.log(text);
   * }, 'deferred');
   * // => Logs 'deferred' after one millisecond.
   */
  var defer = baseRest(function (func, args) {
    return baseDelay(func, 1, args);
  });

  /**
   * Invokes `func` after `wait` milliseconds. Any additional arguments are
   * provided to `func` when it's invoked.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to delay.
   * @param {number} wait The number of milliseconds to delay invocation.
   * @param {...*} [args] The arguments to invoke `func` with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.delay(function(text) {
   *   console.log(text);
   * }, 1000, 'later');
   * // => Logs 'later' after one second.
   */
  var delay = baseRest(function (func, wait, args) {
    return baseDelay(func, toNumber(wait) || 0, args);
  });

  /**
   * Creates a function that negates the result of the predicate `func`. The
   * `func` predicate is invoked with the `this` binding and arguments of the
   * created function.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Function
   * @param {Function} predicate The predicate to negate.
   * @returns {Function} Returns the new negated function.
   * @example
   *
   * function isEven(n) {
   *   return n % 2 == 0;
   * }
   *
   * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
   * // => [1, 3, 5]
   */
  function negate(predicate) {
    if (typeof predicate != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    return function () {
      var args = arguments;
      return !predicate.apply(this, args);
    };
  }

  /**
   * Creates a function that is restricted to invoking `func` once. Repeat calls
   * to the function return the value of the first invocation. The `func` is
   * invoked with the `this` binding and arguments of the created function.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var initialize = _.once(createApplication);
   * initialize();
   * initialize();
   * // => `createApplication` is invoked once
   */
  function once(func) {
    return before(2, func);
  }

  /*------------------------------------------------------------------------*/

  /**
   * Creates a shallow clone of `value`.
   *
   * **Note:** This method is loosely based on the
   * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
   * and supports cloning arrays, array buffers, booleans, date objects, maps,
   * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
   * arrays. The own enumerable properties of `arguments` objects are cloned
   * as plain objects. An empty object is returned for uncloneable values such
   * as error objects, functions, DOM nodes, and WeakMaps.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to clone.
   * @returns {*} Returns the cloned value.
   * @see _.cloneDeep
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var shallow = _.clone(objects);
   * console.log(shallow[0] === objects[0]);
   * // => true
   */
  function clone(value) {
    if (!isObject(value)) {
      return value;
    }
    return isArray(value) ? copyArray(value) : copyObject(value, nativeKeys(value));
  }

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = baseIsArguments(function () {
    return arguments;
  }()) ? baseIsArguments : function (value) {
    return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
  };

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  /**
   * Checks if `value` is classified as a boolean primitive or object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
   * @example
   *
   * _.isBoolean(false);
   * // => true
   *
   * _.isBoolean(null);
   * // => false
   */
  function isBoolean(value) {
    return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
  }

  /**
   * Checks if `value` is classified as a `Date` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
   * @example
   *
   * _.isDate(new Date);
   * // => true
   *
   * _.isDate('Mon April 23 2012');
   * // => false
   */
  var isDate = baseIsDate;

  /**
   * Checks if `value` is an empty object, collection, map, or set.
   *
   * Objects are considered empty if they have no own enumerable string keyed
   * properties.
   *
   * Array-like values such as `arguments` objects, arrays, buffers, strings, or
   * jQuery-like collections are considered empty if they have a `length` of `0`.
   * Similarly, maps and sets are considered empty if they have a `size` of `0`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty(null);
   * // => true
   *
   * _.isEmpty(true);
   * // => true
   *
   * _.isEmpty(1);
   * // => true
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({ 'a': 1 });
   * // => false
   */
  function isEmpty(value) {
    if (isArrayLike(value) && (isArray(value) || isString(value) || isFunction(value.splice) || isArguments(value))) {
      return !value.length;
    }
    return !nativeKeys(value).length;
  }

  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent.
   *
   * **Note:** This method supports comparing arrays, array buffers, booleans,
   * date objects, error objects, maps, numbers, `Object` objects, regexes,
   * sets, strings, symbols, and typed arrays. `Object` objects are compared
   * by their own, not inherited, enumerable properties. Functions and DOM
   * nodes are compared by strict equality, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.isEqual(object, other);
   * // => true
   *
   * object === other;
   * // => false
   */
  function isEqual(value, other) {
    return baseIsEqual(value, other);
  }

  /**
   * Checks if `value` is a finite primitive number.
   *
   * **Note:** This method is based on
   * [`Number.isFinite`](https://mdn.io/Number/isFinite).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
   * @example
   *
   * _.isFinite(3);
   * // => true
   *
   * _.isFinite(Number.MIN_VALUE);
   * // => true
   *
   * _.isFinite(Infinity);
   * // => false
   *
   * _.isFinite('3');
   * // => false
   */
  function isFinite(value) {
    return typeof value == 'number' && nativeIsFinite(value);
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return value != null && (type == 'object' || type == 'function');
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
  }

  /**
   * Checks if `value` is `NaN`.
   *
   * **Note:** This method is based on
   * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
   * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
   * `undefined` and other non-number values.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   * @example
   *
   * _.isNaN(NaN);
   * // => true
   *
   * _.isNaN(new Number(NaN));
   * // => true
   *
   * isNaN(undefined);
   * // => true
   *
   * _.isNaN(undefined);
   * // => false
   */
  function isNaN(value) {
    // An `NaN` primitive is the only value that is not equal to itself.
    // Perform the `toStringTag` check first to avoid errors with some
    // ActiveX objects in IE.
    return isNumber(value) && value != +value;
  }

  /**
   * Checks if `value` is `null`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
   * @example
   *
   * _.isNull(null);
   * // => true
   *
   * _.isNull(void 0);
   * // => false
   */
  function isNull(value) {
    return value === null;
  }

  /**
   * Checks if `value` is classified as a `Number` primitive or object.
   *
   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
   * classified as numbers, use the `_.isFinite` method.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a number, else `false`.
   * @example
   *
   * _.isNumber(3);
   * // => true
   *
   * _.isNumber(Number.MIN_VALUE);
   * // => true
   *
   * _.isNumber(Infinity);
   * // => true
   *
   * _.isNumber('3');
   * // => false
   */
  function isNumber(value) {
    return typeof value == 'number' || isObjectLike(value) && baseGetTag(value) == numberTag;
  }

  /**
   * Checks if `value` is classified as a `RegExp` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
   * @example
   *
   * _.isRegExp(/abc/);
   * // => true
   *
   * _.isRegExp('/abc/');
   * // => false
   */
  var isRegExp = baseIsRegExp;

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
  }

  /**
   * Checks if `value` is `undefined`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
   * @example
   *
   * _.isUndefined(void 0);
   * // => true
   *
   * _.isUndefined(null);
   * // => false
   */
  function isUndefined(value) {
    return value === undefined;
  }

  /**
   * Converts `value` to an array.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Array} Returns the converted array.
   * @example
   *
   * _.toArray({ 'a': 1, 'b': 2 });
   * // => [1, 2]
   *
   * _.toArray('abc');
   * // => ['a', 'b', 'c']
   *
   * _.toArray(1);
   * // => []
   *
   * _.toArray(null);
   * // => []
   */
  function toArray(value) {
    if (!isArrayLike(value)) {
      return values(value);
    }
    return value.length ? copyArray(value) : [];
  }

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */
  var toInteger = Number;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  var toNumber = Number;

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    if (typeof value == 'string') {
      return value;
    }
    return value == null ? '' : value + '';
  }

  /*------------------------------------------------------------------------*/

  /**
   * Assigns own enumerable string keyed properties of source objects to the
   * destination object. Source objects are applied from left to right.
   * Subsequent sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object` and is loosely based on
   * [`Object.assign`](https://mdn.io/Object/assign).
   *
   * @static
   * @memberOf _
   * @since 0.10.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.assignIn
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * function Bar() {
   *   this.c = 3;
   * }
   *
   * Foo.prototype.b = 2;
   * Bar.prototype.d = 4;
   *
   * _.assign({ 'a': 0 }, new Foo, new Bar);
   * // => { 'a': 1, 'c': 3 }
   */
  var assign = createAssigner(function (object, source) {
    copyObject(source, nativeKeys(source), object);
  });

  /**
   * This method is like `_.assign` except that it iterates over own and
   * inherited source properties.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @alias extend
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.assign
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * function Bar() {
   *   this.c = 3;
   * }
   *
   * Foo.prototype.b = 2;
   * Bar.prototype.d = 4;
   *
   * _.assignIn({ 'a': 0 }, new Foo, new Bar);
   * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
   */
  var assignIn = createAssigner(function (object, source) {
    copyObject(source, nativeKeysIn(source), object);
  });

  /**
   * This method is like `_.assignIn` except that it accepts `customizer`
   * which is invoked to produce the assigned values. If `customizer` returns
   * `undefined`, assignment is handled by the method instead. The `customizer`
   * is invoked with five arguments: (objValue, srcValue, key, object, source).
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @alias extendWith
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} sources The source objects.
   * @param {Function} [customizer] The function to customize assigned values.
   * @returns {Object} Returns `object`.
   * @see _.assignWith
   * @example
   *
   * function customizer(objValue, srcValue) {
   *   return _.isUndefined(objValue) ? srcValue : objValue;
   * }
   *
   * var defaults = _.partialRight(_.assignInWith, customizer);
   *
   * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
   * // => { 'a': 1, 'b': 2 }
   */
  var assignInWith = createAssigner(function (object, source, srcIndex, customizer) {
    copyObject(source, keysIn(source), object, customizer);
  });

  /**
   * Creates an object that inherits from the `prototype` object. If a
   * `properties` object is given, its own enumerable string keyed properties
   * are assigned to the created object.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Object
   * @param {Object} prototype The object to inherit from.
   * @param {Object} [properties] The properties to assign to the object.
   * @returns {Object} Returns the new object.
   * @example
   *
   * function Shape() {
   *   this.x = 0;
   *   this.y = 0;
   * }
   *
   * function Circle() {
   *   Shape.call(this);
   * }
   *
   * Circle.prototype = _.create(Shape.prototype, {
   *   'constructor': Circle
   * });
   *
   * var circle = new Circle;
   * circle instanceof Circle;
   * // => true
   *
   * circle instanceof Shape;
   * // => true
   */
  function create(prototype, properties) {
    var result = baseCreate(prototype);
    return properties == null ? result : assign(result, properties);
  }

  /**
   * Assigns own and inherited enumerable string keyed properties of source
   * objects to the destination object for all destination properties that
   * resolve to `undefined`. Source objects are applied from left to right.
   * Once a property is set, additional values of the same property are ignored.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.defaultsDeep
   * @example
   *
   * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
   * // => { 'a': 1, 'b': 2 }
   */
  var defaults = baseRest(function (args) {
    args.push(undefined, customDefaultsAssignIn);
    return assignInWith.apply(undefined, args);
  });

  /**
   * Checks if `path` is a direct property of `object`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = { 'a': { 'b': 2 } };
   * var other = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.has(object, 'a');
   * // => true
   *
   * _.has(object, 'a.b');
   * // => true
   *
   * _.has(object, ['a', 'b']);
   * // => true
   *
   * _.has(other, 'a');
   * // => false
   */
  function has(object, path) {
    return object != null && hasOwnProperty.call(object, path);
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  var keys = nativeKeys;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  var keysIn = nativeKeysIn;

  /**
   * Creates an object composed of the picked `object` properties.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {...(string|string[])} [paths] The property paths to pick.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * _.pick(object, ['a', 'c']);
   * // => { 'a': 1, 'c': 3 }
   */
  var pick = flatRest(function (object, paths) {
    return object == null ? {} : basePick(object, paths);
  });

  /**
   * This method is like `_.get` except that if the resolved value is a
   * function it's invoked with the `this` binding of its parent object and
   * its result is returned.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to resolve.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
   *
   * _.result(object, 'a[0].b.c1');
   * // => 3
   *
   * _.result(object, 'a[0].b.c2');
   * // => 4
   *
   * _.result(object, 'a[0].b.c3', 'default');
   * // => 'default'
   *
   * _.result(object, 'a[0].b.c3', _.constant('default'));
   * // => 'default'
   */
  function result(object, path, defaultValue) {
    var value = object == null ? undefined : object[path];
    if (value === undefined) {
      value = defaultValue;
    }
    return isFunction(value) ? value.call(object) : value;
  }

  /**
   * Creates an array of the own enumerable string keyed property values of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.values(new Foo);
   * // => [1, 2] (iteration order is not guaranteed)
   *
   * _.values('hi');
   * // => ['h', 'i']
   */
  function values(object) {
    return object == null ? [] : baseValues(object, keys(object));
  }

  /*------------------------------------------------------------------------*/

  /**
   * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
   * corresponding HTML entities.
   *
   * **Note:** No other characters are escaped. To escape additional
   * characters use a third-party library like [_he_](https://mths.be/he).
   *
   * Though the ">" character is escaped for symmetry, characters like
   * ">" and "/" don't need escaping in HTML and have no special meaning
   * unless they're part of a tag or unquoted attribute value. See
   * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
   * (under "semi-related fun fact") for more details.
   *
   * When working with HTML you should always
   * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
   * XSS vectors.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to escape.
   * @returns {string} Returns the escaped string.
   * @example
   *
   * _.escape('fred, barney, & pebbles');
   * // => 'fred, barney, &amp; pebbles'
   */
  function escape(string) {
    string = toString(string);
    return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
  }

  /*------------------------------------------------------------------------*/

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * Creates a function that invokes `func` with the arguments of the created
   * function. If `func` is a property name, the created function returns the
   * property value for a given element. If `func` is an array or object, the
   * created function returns `true` for elements that contain the equivalent
   * source properties, otherwise it returns `false`.
   *
   * @static
   * @since 4.0.0
   * @memberOf _
   * @category Util
   * @param {*} [func=_.identity] The value to convert to a callback.
   * @returns {Function} Returns the callback.
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
   * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.filter(users, _.iteratee(['user', 'fred']));
   * // => [{ 'user': 'fred', 'age': 40 }]
   *
   * // The `_.property` iteratee shorthand.
   * _.map(users, _.iteratee('user'));
   * // => ['barney', 'fred']
   *
   * // Create custom iteratee shorthands.
   * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
   *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
   *     return func.test(string);
   *   };
   * });
   *
   * _.filter(['abc', 'def'], /ef/);
   * // => ['def']
   */
  var iteratee = baseIteratee;

  /**
   * Creates a function that performs a partial deep comparison between a given
   * object and `source`, returning `true` if the given object has equivalent
   * property values, else `false`.
   *
   * **Note:** The created function is equivalent to `_.isMatch` with `source`
   * partially applied.
   *
   * Partial comparisons will match empty array and empty object `source`
   * values against any array or object value, respectively. See `_.isEqual`
   * for a list of supported value comparisons.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Util
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   * @example
   *
   * var objects = [
   *   { 'a': 1, 'b': 2, 'c': 3 },
   *   { 'a': 4, 'b': 5, 'c': 6 }
   * ];
   *
   * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
   * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
   */
  function matches(source) {
    return baseMatches(assign({}, source));
  }

  /**
   * Adds all own enumerable string keyed function properties of a source
   * object to the destination object. If `object` is a function, then methods
   * are added to its prototype as well.
   *
   * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
   * avoid conflicts caused by modifying the original.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {Function|Object} [object=lodash] The destination object.
   * @param {Object} source The object of functions to add.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
   * @returns {Function|Object} Returns `object`.
   * @example
   *
   * function vowels(string) {
   *   return _.filter(string, function(v) {
   *     return /[aeiou]/i.test(v);
   *   });
   * }
   *
   * _.mixin({ 'vowels': vowels });
   * _.vowels('fred');
   * // => ['e']
   *
   * _('fred').vowels().value();
   * // => ['e']
   *
   * _.mixin({ 'vowels': vowels }, { 'chain': false });
   * _('fred').vowels();
   * // => ['e']
   */
  function mixin(object, source, options) {
    var props = keys(source),
        methodNames = baseFunctions(source, props);

    if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
      options = source;
      source = object;
      object = this;
      methodNames = baseFunctions(source, keys(source));
    }
    var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
        isFunc = isFunction(object);

    baseEach(methodNames, function (methodName) {
      var func = source[methodName];
      object[methodName] = func;
      if (isFunc) {
        object.prototype[methodName] = function () {
          var chainAll = this.__chain__;
          if (chain || chainAll) {
            var result = object(this.__wrapped__),
                actions = result.__actions__ = copyArray(this.__actions__);

            actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
            result.__chain__ = chainAll;
            return result;
          }
          return func.apply(object, arrayPush([this.value()], arguments));
        };
      }
    });

    return object;
  }

  /**
   * Reverts the `_` variable to its previous value and returns a reference to
   * the `lodash` function.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @returns {Function} Returns the `lodash` function.
   * @example
   *
   * var lodash = _.noConflict();
   */
  function noConflict() {
    if (root._ === this) {
      root._ = oldDash;
    }
    return this;
  }

  /**
   * This method returns `undefined`.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Util
   * @example
   *
   * _.times(2, _.noop);
   * // => [undefined, undefined]
   */
  function noop() {}
  // No operation performed.


  /**
   * Generates a unique ID. If `prefix` is given, the ID is appended to it.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {string} [prefix=''] The value to prefix the ID with.
   * @returns {string} Returns the unique ID.
   * @example
   *
   * _.uniqueId('contact_');
   * // => 'contact_104'
   *
   * _.uniqueId();
   * // => '105'
   */
  function uniqueId(prefix) {
    var id = ++idCounter;
    return toString(prefix) + id;
  }

  /*------------------------------------------------------------------------*/

  /**
   * Computes the maximum value of `array`. If `array` is empty or falsey,
   * `undefined` is returned.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {*} Returns the maximum value.
   * @example
   *
   * _.max([4, 2, 8, 6]);
   * // => 8
   *
   * _.max([]);
   * // => undefined
   */
  function max(array) {
    return array && array.length ? baseExtremum(array, identity, baseGt) : undefined;
  }

  /**
   * Computes the minimum value of `array`. If `array` is empty or falsey,
   * `undefined` is returned.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {*} Returns the minimum value.
   * @example
   *
   * _.min([4, 2, 8, 6]);
   * // => 2
   *
   * _.min([]);
   * // => undefined
   */
  function min(array) {
    return array && array.length ? baseExtremum(array, identity, baseLt) : undefined;
  }

  /*------------------------------------------------------------------------*/

  // Add methods that return wrapped values in chain sequences.
  lodash.assignIn = assignIn;
  lodash.before = before;
  lodash.bind = bind;
  lodash.chain = chain;
  lodash.compact = compact;
  lodash.concat = concat;
  lodash.create = create;
  lodash.defaults = defaults;
  lodash.defer = defer;
  lodash.delay = delay;
  lodash.filter = filter;
  lodash.flatten = flatten;
  lodash.flattenDeep = flattenDeep;
  lodash.iteratee = iteratee;
  lodash.keys = keys;
  lodash.map = map;
  lodash.matches = matches;
  lodash.mixin = mixin;
  lodash.negate = negate;
  lodash.once = once;
  lodash.pick = pick;
  lodash.slice = slice;
  lodash.sortBy = sortBy;
  lodash.tap = tap;
  lodash.thru = thru;
  lodash.toArray = toArray;
  lodash.values = values;

  // Add aliases.
  lodash.extend = assignIn;

  // Add methods to `lodash.prototype`.
  mixin(lodash, lodash);

  /*------------------------------------------------------------------------*/

  // Add methods that return unwrapped values in chain sequences.
  lodash.clone = clone;
  lodash.escape = escape;
  lodash.every = every;
  lodash.find = find;
  lodash.forEach = forEach;
  lodash.has = has;
  lodash.head = head;
  lodash.identity = identity;
  lodash.indexOf = indexOf;
  lodash.isArguments = isArguments;
  lodash.isArray = isArray;
  lodash.isBoolean = isBoolean;
  lodash.isDate = isDate;
  lodash.isEmpty = isEmpty;
  lodash.isEqual = isEqual;
  lodash.isFinite = isFinite;
  lodash.isFunction = isFunction;
  lodash.isNaN = isNaN;
  lodash.isNull = isNull;
  lodash.isNumber = isNumber;
  lodash.isObject = isObject;
  lodash.isRegExp = isRegExp;
  lodash.isString = isString;
  lodash.isUndefined = isUndefined;
  lodash.last = last;
  lodash.max = max;
  lodash.min = min;
  lodash.noConflict = noConflict;
  lodash.noop = noop;
  lodash.reduce = reduce;
  lodash.result = result;
  lodash.size = size;
  lodash.some = some;
  lodash.uniqueId = uniqueId;

  // Add aliases.
  lodash.each = forEach;
  lodash.first = head;

  mixin(lodash, function () {
    var source = {};
    baseForOwn(lodash, function (func, methodName) {
      if (!hasOwnProperty.call(lodash.prototype, methodName)) {
        source[methodName] = func;
      }
    });
    return source;
  }(), { 'chain': false });

  /*------------------------------------------------------------------------*/

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type {string}
   */
  lodash.VERSION = VERSION;

  // Add `Array` methods to `lodash.prototype`.
  baseEach(['pop', 'join', 'replace', 'reverse', 'split', 'push', 'shift', 'sort', 'splice', 'unshift'], function (methodName) {
    var func = (/^(?:replace|split)$/.test(methodName) ? String.prototype : arrayProto)[methodName],
        chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
        retUnwrapped = /^(?:pop|join|replace|shift)$/.test(methodName);

    lodash.prototype[methodName] = function () {
      var args = arguments;
      if (retUnwrapped && !this.__chain__) {
        var value = this.value();
        return func.apply(isArray(value) ? value : [], args);
      }
      return this[chainName](function (value) {
        return func.apply(isArray(value) ? value : [], args);
      });
    };
  });

  // Add chain sequence methods to the `lodash` wrapper.
  lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

  /*--------------------------------------------------------------------------*/

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (typeof define == 'function' && _typeof(define.amd) == 'object' && define.amd) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root._ = lodash;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function () {
      return lodash;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
      // Export for Node.js.
      (freeModule.exports = lodash)._ = lodash;
      // Export for CommonJS support.
      freeExports._ = lodash;
    } else {
      // Export to the global object.
      root._ = lodash;
    }
}).call(undefined);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2NvcmUuanMiXSwibmFtZXMiOlsidW5kZWZpbmVkIiwiVkVSU0lPTiIsIkZVTkNfRVJST1JfVEVYVCIsIkNPTVBBUkVfUEFSVElBTF9GTEFHIiwiQ09NUEFSRV9VTk9SREVSRURfRkxBRyIsIldSQVBfQklORF9GTEFHIiwiV1JBUF9QQVJUSUFMX0ZMQUciLCJJTkZJTklUWSIsIk1BWF9TQUZFX0lOVEVHRVIiLCJhcmdzVGFnIiwiYXJyYXlUYWciLCJhc3luY1RhZyIsImJvb2xUYWciLCJkYXRlVGFnIiwiZXJyb3JUYWciLCJmdW5jVGFnIiwiZ2VuVGFnIiwibnVtYmVyVGFnIiwib2JqZWN0VGFnIiwicHJveHlUYWciLCJyZWdleHBUYWciLCJzdHJpbmdUYWciLCJyZVVuZXNjYXBlZEh0bWwiLCJyZUhhc1VuZXNjYXBlZEh0bWwiLCJSZWdFeHAiLCJzb3VyY2UiLCJodG1sRXNjYXBlcyIsImZyZWVHbG9iYWwiLCJnbG9iYWwiLCJPYmplY3QiLCJmcmVlU2VsZiIsInNlbGYiLCJyb290IiwiRnVuY3Rpb24iLCJmcmVlRXhwb3J0cyIsImV4cG9ydHMiLCJub2RlVHlwZSIsImZyZWVNb2R1bGUiLCJtb2R1bGUiLCJhcnJheVB1c2giLCJhcnJheSIsInZhbHVlcyIsInB1c2giLCJhcHBseSIsImJhc2VGaW5kSW5kZXgiLCJwcmVkaWNhdGUiLCJmcm9tSW5kZXgiLCJmcm9tUmlnaHQiLCJsZW5ndGgiLCJpbmRleCIsImJhc2VQcm9wZXJ0eSIsImtleSIsIm9iamVjdCIsImJhc2VQcm9wZXJ0eU9mIiwiYmFzZVJlZHVjZSIsImNvbGxlY3Rpb24iLCJpdGVyYXRlZSIsImFjY3VtdWxhdG9yIiwiaW5pdEFjY3VtIiwiZWFjaEZ1bmMiLCJ2YWx1ZSIsImJhc2VWYWx1ZXMiLCJwcm9wcyIsImJhc2VNYXAiLCJlc2NhcGVIdG1sQ2hhciIsIm92ZXJBcmciLCJmdW5jIiwidHJhbnNmb3JtIiwiYXJnIiwiYXJyYXlQcm90byIsIkFycmF5IiwicHJvdG90eXBlIiwib2JqZWN0UHJvdG8iLCJoYXNPd25Qcm9wZXJ0eSIsImlkQ291bnRlciIsIm5hdGl2ZU9iamVjdFRvU3RyaW5nIiwidG9TdHJpbmciLCJvbGREYXNoIiwiXyIsIm9iamVjdENyZWF0ZSIsImNyZWF0ZSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwibmF0aXZlSXNGaW5pdGUiLCJpc0Zpbml0ZSIsIm5hdGl2ZUtleXMiLCJrZXlzIiwibmF0aXZlTWF4IiwiTWF0aCIsIm1heCIsImxvZGFzaCIsIkxvZGFzaFdyYXBwZXIiLCJiYXNlQ3JlYXRlIiwicHJvdG8iLCJpc09iamVjdCIsInJlc3VsdCIsImNoYWluQWxsIiwiX193cmFwcGVkX18iLCJfX2FjdGlvbnNfXyIsIl9fY2hhaW5fXyIsImNvbnN0cnVjdG9yIiwiYXNzaWduVmFsdWUiLCJvYmpWYWx1ZSIsImNhbGwiLCJlcSIsImJhc2VBc3NpZ25WYWx1ZSIsImJhc2VEZWxheSIsIndhaXQiLCJhcmdzIiwiVHlwZUVycm9yIiwic2V0VGltZW91dCIsImJhc2VFYWNoIiwiY3JlYXRlQmFzZUVhY2giLCJiYXNlRm9yT3duIiwiYmFzZUV2ZXJ5IiwiYmFzZUV4dHJlbXVtIiwiY29tcGFyYXRvciIsImN1cnJlbnQiLCJjb21wdXRlZCIsImJhc2VGaWx0ZXIiLCJiYXNlRmxhdHRlbiIsImRlcHRoIiwiaXNTdHJpY3QiLCJpc0ZsYXR0ZW5hYmxlIiwiYmFzZUZvciIsImNyZWF0ZUJhc2VGb3IiLCJiYXNlRnVuY3Rpb25zIiwiaXNGdW5jdGlvbiIsImJhc2VHZXRUYWciLCJvYmplY3RUb1N0cmluZyIsImJhc2VHdCIsIm90aGVyIiwiYmFzZUlzQXJndW1lbnRzIiwibm9vcCIsImJhc2VJc0RhdGUiLCJpc09iamVjdExpa2UiLCJiYXNlSXNFcXVhbCIsImJpdG1hc2siLCJjdXN0b21pemVyIiwic3RhY2siLCJiYXNlSXNFcXVhbERlZXAiLCJlcXVhbEZ1bmMiLCJvYmpJc0FyciIsImlzQXJyYXkiLCJvdGhJc0FyciIsIm9ialRhZyIsIm90aFRhZyIsIm9iaklzT2JqIiwib3RoSXNPYmoiLCJpc1NhbWVUYWciLCJvYmpTdGFjayIsImZpbmQiLCJlbnRyeSIsIm90aFN0YWNrIiwiZXF1YWxBcnJheXMiLCJlcXVhbEJ5VGFnIiwicG9wIiwib2JqSXNXcmFwcGVkIiwib3RoSXNXcmFwcGVkIiwib2JqVW53cmFwcGVkIiwib3RoVW53cmFwcGVkIiwiZXF1YWxPYmplY3RzIiwiYmFzZUlzUmVnRXhwIiwiYmFzZUl0ZXJhdGVlIiwiaWRlbnRpdHkiLCJiYXNlTWF0Y2hlcyIsImJhc2VMdCIsImlzQXJyYXlMaWtlIiwiYmFzZVBpY2siLCJyZWR1Y2UiLCJiYXNlUmVzdCIsInN0YXJ0Iiwic2V0VG9TdHJpbmciLCJvdmVyUmVzdCIsImJhc2VTbGljZSIsImVuZCIsImNvcHlBcnJheSIsImJhc2VTb21lIiwiYmFzZVdyYXBwZXJWYWx1ZSIsImFjdGlvbnMiLCJhY3Rpb24iLCJ0aGlzQXJnIiwiY29tcGFyZUFzY2VuZGluZyIsInZhbElzRGVmaW5lZCIsInZhbElzTnVsbCIsInZhbElzUmVmbGV4aXZlIiwidmFsSXNTeW1ib2wiLCJvdGhJc0RlZmluZWQiLCJvdGhJc051bGwiLCJvdGhJc1JlZmxleGl2ZSIsIm90aElzU3ltYm9sIiwiY29weU9iamVjdCIsImlzTmV3IiwibmV3VmFsdWUiLCJjcmVhdGVBc3NpZ25lciIsImFzc2lnbmVyIiwic291cmNlcyIsIml0ZXJhYmxlIiwia2V5c0Z1bmMiLCJjcmVhdGVDdG9yIiwiQ3RvciIsImFyZ3VtZW50cyIsInRoaXNCaW5kaW5nIiwiY3JlYXRlRmluZCIsImZpbmRJbmRleEZ1bmMiLCJjcmVhdGVQYXJ0aWFsIiwicGFydGlhbHMiLCJpc0JpbmQiLCJ3cmFwcGVyIiwiYXJnc0luZGV4IiwiYXJnc0xlbmd0aCIsImxlZnRJbmRleCIsImxlZnRMZW5ndGgiLCJmbiIsImN1c3RvbURlZmF1bHRzQXNzaWduSW4iLCJzcmNWYWx1ZSIsImlzUGFydGlhbCIsImFyckxlbmd0aCIsIm90aExlbmd0aCIsInNlZW4iLCJhcnJWYWx1ZSIsIm90aFZhbHVlIiwiY29tcGFyZWQiLCJvdGhJbmRleCIsImluZGV4T2YiLCJ0YWciLCJuYW1lIiwibWVzc2FnZSIsIm9ialByb3BzIiwib2JqTGVuZ3RoIiwib3RoUHJvcHMiLCJza2lwQ3RvciIsIm9iakN0b3IiLCJvdGhDdG9yIiwiZmxhdFJlc3QiLCJmbGF0dGVuIiwiaXNBcmd1bWVudHMiLCJuYXRpdmVLZXlzSW4iLCJvdGhlckFyZ3MiLCJjb21wYWN0IiwiQm9vbGVhbiIsImNvbmNhdCIsImZpbmRJbmRleCIsInRvSW50ZWdlciIsImZsYXR0ZW5EZWVwIiwiaGVhZCIsImlzUmVmbGV4aXZlIiwibGFzdCIsInNsaWNlIiwiY2hhaW4iLCJ0YXAiLCJpbnRlcmNlcHRvciIsInRocnUiLCJ3cmFwcGVyQ2hhaW4iLCJ3cmFwcGVyVmFsdWUiLCJldmVyeSIsImd1YXJkIiwiZmlsdGVyIiwiZm9yRWFjaCIsIm1hcCIsInNpemUiLCJzb21lIiwic29ydEJ5Iiwic29ydCIsImNyaXRlcmlhIiwiYmVmb3JlIiwibiIsImJpbmQiLCJkZWZlciIsImRlbGF5IiwidG9OdW1iZXIiLCJuZWdhdGUiLCJvbmNlIiwiY2xvbmUiLCJpc0xlbmd0aCIsImlzQm9vbGVhbiIsImlzRGF0ZSIsImlzRW1wdHkiLCJpc1N0cmluZyIsInNwbGljZSIsImlzRXF1YWwiLCJ0eXBlIiwiaXNOYU4iLCJpc051bWJlciIsImlzTnVsbCIsImlzUmVnRXhwIiwiaXNVbmRlZmluZWQiLCJ0b0FycmF5IiwiTnVtYmVyIiwiYXNzaWduIiwiYXNzaWduSW4iLCJhc3NpZ25JbldpdGgiLCJzcmNJbmRleCIsImtleXNJbiIsInByb3BlcnRpZXMiLCJkZWZhdWx0cyIsImhhcyIsInBhdGgiLCJwaWNrIiwicGF0aHMiLCJkZWZhdWx0VmFsdWUiLCJlc2NhcGUiLCJzdHJpbmciLCJ0ZXN0IiwicmVwbGFjZSIsIm1hdGNoZXMiLCJtaXhpbiIsIm9wdGlvbnMiLCJtZXRob2ROYW1lcyIsImlzRnVuYyIsIm1ldGhvZE5hbWUiLCJub0NvbmZsaWN0IiwidW5pcXVlSWQiLCJwcmVmaXgiLCJpZCIsIm1pbiIsImV4dGVuZCIsImVhY2giLCJmaXJzdCIsIlN0cmluZyIsImNoYWluTmFtZSIsInJldFVud3JhcHBlZCIsInRvSlNPTiIsInZhbHVlT2YiLCJkZWZpbmUiLCJhbWQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Ozs7O0FBU0EsQ0FBRSxhQUFXOztBQUVYO0FBQ0EsTUFBSUEsU0FBSjs7QUFFQTtBQUNBLE1BQUlDLFVBQVUsUUFBZDs7QUFFQTtBQUNBLE1BQUlDLGtCQUFrQixxQkFBdEI7O0FBRUE7QUFDQSxNQUFJQyx1QkFBdUIsQ0FBM0I7QUFBQSxNQUNJQyx5QkFBeUIsQ0FEN0I7O0FBR0E7QUFDQSxNQUFJQyxpQkFBaUIsQ0FBckI7QUFBQSxNQUNJQyxvQkFBb0IsRUFEeEI7O0FBR0E7QUFDQSxNQUFJQyxXQUFXLElBQUksQ0FBbkI7QUFBQSxNQUNJQyxtQkFBbUIsZ0JBRHZCOztBQUdBO0FBQ0EsTUFBSUMsVUFBVSxvQkFBZDtBQUFBLE1BQ0lDLFdBQVcsZ0JBRGY7QUFBQSxNQUVJQyxXQUFXLHdCQUZmO0FBQUEsTUFHSUMsVUFBVSxrQkFIZDtBQUFBLE1BSUlDLFVBQVUsZUFKZDtBQUFBLE1BS0lDLFdBQVcsZ0JBTGY7QUFBQSxNQU1JQyxVQUFVLG1CQU5kO0FBQUEsTUFPSUMsU0FBUyw0QkFQYjtBQUFBLE1BUUlDLFlBQVksaUJBUmhCO0FBQUEsTUFTSUMsWUFBWSxpQkFUaEI7QUFBQSxNQVVJQyxXQUFXLGdCQVZmO0FBQUEsTUFXSUMsWUFBWSxpQkFYaEI7QUFBQSxNQVlJQyxZQUFZLGlCQVpoQjs7QUFjQTtBQUNBLE1BQUlDLGtCQUFrQixVQUF0QjtBQUFBLE1BQ0lDLHFCQUFxQkMsT0FBT0YsZ0JBQWdCRyxNQUF2QixDQUR6Qjs7QUFHQTtBQUNBLE1BQUlDLGNBQWM7QUFDaEIsU0FBSyxPQURXO0FBRWhCLFNBQUssTUFGVztBQUdoQixTQUFLLE1BSFc7QUFJaEIsU0FBSyxRQUpXO0FBS2hCLFNBQUs7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QXlCLEVBQXBDLEVBQXdDK0MsSUFBeEMsQ0FBUDtBQUNEO0FBQ0QsYUFBTyxLQUFLb04sU0FBTCxFQUFnQixVQUFTblEsS0FBVCxFQUFnQjtBQUNyQyxlQUFPTSxLQUFLdkIsS0FBTCxDQUFXbUcsUUFBUWxGLEtBQVIsSUFBaUJBLEtBQWpCLEdBQXlCLEVBQXBDLEVBQXdDK0MsSUFBeEMsQ0FBUDtBQUNELE9BRk0sQ0FBUDtBQUdELEtBVEQ7QUFVRCxHQWZEOztBQWlCQTtBQUNBbEIsU0FBT2xCLFNBQVAsQ0FBaUIwUCxNQUFqQixHQUEwQnhPLE9BQU9sQixTQUFQLENBQWlCMlAsT0FBakIsR0FBMkJ6TyxPQUFPbEIsU0FBUCxDQUFpQlgsS0FBakIsR0FBeUJpTSxZQUE5RTs7QUFFQTs7QUFFQTtBQUNBLE1BQUksT0FBT3NFLE1BQVAsSUFBaUIsVUFBakIsSUFBK0IsUUFBT0EsT0FBT0MsR0FBZCxLQUFxQixRQUFwRCxJQUFnRUQsT0FBT0MsR0FBM0UsRUFBZ0Y7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQXBTLFNBQUs4QyxDQUFMLEdBQVNXLE1BQVQ7O0FBRUE7QUFDQTtBQUNBME8sV0FBTyxZQUFXO0FBQ2hCLGFBQU8xTyxNQUFQO0FBQ0QsS0FGRDtBQUdEO0FBQ0Q7QUFiQSxPQWNLLElBQUlwRCxVQUFKLEVBQWdCO0FBQ25CO0FBQ0EsT0FBQ0EsV0FBV0YsT0FBWCxHQUFxQnNELE1BQXRCLEVBQThCWCxDQUE5QixHQUFrQ1csTUFBbEM7QUFDQTtBQUNBdkQsa0JBQVk0QyxDQUFaLEdBQWdCVyxNQUFoQjtBQUNELEtBTEksTUFNQTtBQUNIO0FBQ0F6RCxXQUFLOEMsQ0FBTCxHQUFTVyxNQUFUO0FBQ0Q7QUFDRixDQWx2SEMsRUFrdkhBYSxJQWx2SEEsV0FBRCIsImZpbGUiOiJjb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogTG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggY29yZSAtbyAuL2Rpc3QvbG9kYXNoLmNvcmUuanNgXG4gKiBDb3B5cmlnaHQgSlMgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pzLmZvdW5kYXRpb24vPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG47KGZ1bmN0aW9uKCkge1xuXG4gIC8qKiBVc2VkIGFzIGEgc2FmZSByZWZlcmVuY2UgZm9yIGB1bmRlZmluZWRgIGluIHByZS1FUzUgZW52aXJvbm1lbnRzLiAqL1xuICB2YXIgdW5kZWZpbmVkO1xuXG4gIC8qKiBVc2VkIGFzIHRoZSBzZW1hbnRpYyB2ZXJzaW9uIG51bWJlci4gKi9cbiAgdmFyIFZFUlNJT04gPSAnNC4xNy40JztcblxuICAvKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG4gIHZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbiAgLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG4gIHZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuICAvKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBmdW5jdGlvbiBtZXRhZGF0YS4gKi9cbiAgdmFyIFdSQVBfQklORF9GTEFHID0gMSxcbiAgICAgIFdSQVBfUEFSVElBTF9GTEFHID0gMzI7XG5cbiAgLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG4gIHZhciBJTkZJTklUWSA9IDEgLyAwLFxuICAgICAgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbiAgLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xuICB2YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgICAgYXN5bmNUYWcgPSAnW29iamVjdCBBc3luY0Z1bmN0aW9uXScsXG4gICAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgICBwcm94eVRhZyA9ICdbb2JqZWN0IFByb3h5XScsXG4gICAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXG4gIC8qKiBVc2VkIHRvIG1hdGNoIEhUTUwgZW50aXRpZXMgYW5kIEhUTUwgY2hhcmFjdGVycy4gKi9cbiAgdmFyIHJlVW5lc2NhcGVkSHRtbCA9IC9bJjw+XCInXS9nLFxuICAgICAgcmVIYXNVbmVzY2FwZWRIdG1sID0gUmVnRXhwKHJlVW5lc2NhcGVkSHRtbC5zb3VyY2UpO1xuXG4gIC8qKiBVc2VkIHRvIG1hcCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXMuICovXG4gIHZhciBodG1sRXNjYXBlcyA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmIzM5OydcbiAgfTtcblxuICAvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xuICB2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbiAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbiAgdmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbiAgLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG4gIHZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4gIC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG4gIHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuICAvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG4gIHZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gICAqL1xuICBmdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICAgIGFycmF5LnB1c2guYXBwbHkoYXJyYXksIHZhbHVlcyk7XG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbmRJbmRleGAgYW5kIGBfLmZpbmRMYXN0SW5kZXhgIHdpdGhvdXRcbiAgICogc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAgICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gICAqL1xuICBmdW5jdGlvbiBiYXNlRmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21JbmRleCwgZnJvbVJpZ2h0KSB7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMSA6IC0xKTtcblxuICAgIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eU9mYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBiYXNlUHJvcGVydHlPZihvYmplY3QpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJlZHVjZWAgYW5kIGBfLnJlZHVjZVJpZ2h0YCwgd2l0aG91dCBzdXBwb3J0XG4gICAqIGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLCB3aGljaCBpdGVyYXRlcyBvdmVyIGBjb2xsZWN0aW9uYCB1c2luZyBgZWFjaEZ1bmNgLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAqIEBwYXJhbSB7Kn0gYWNjdW11bGF0b3IgVGhlIGluaXRpYWwgdmFsdWUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5pdEFjY3VtIFNwZWNpZnkgdXNpbmcgdGhlIGZpcnN0IG9yIGxhc3QgZWxlbWVudCBvZlxuICAgKiAgYGNvbGxlY3Rpb25gIGFzIHRoZSBpbml0aWFsIHZhbHVlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlYWNoRnVuYyBUaGUgZnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIGBjb2xsZWN0aW9uYC5cbiAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGFjY3VtdWxhdGVkIHZhbHVlLlxuICAgKi9cbiAgZnVuY3Rpb24gYmFzZVJlZHVjZShjb2xsZWN0aW9uLCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSwgZWFjaEZ1bmMpIHtcbiAgICBlYWNoRnVuYyhjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIGFjY3VtdWxhdG9yID0gaW5pdEFjY3VtXG4gICAgICAgID8gKGluaXRBY2N1bSA9IGZhbHNlLCB2YWx1ZSlcbiAgICAgICAgOiBpdGVyYXRlZShhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udmFsdWVzYCBhbmQgYF8udmFsdWVzSW5gIHdoaWNoIGNyZWF0ZXMgYW5cbiAgICogYXJyYXkgb2YgYG9iamVjdGAgcHJvcGVydHkgdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHByb3BlcnR5IG5hbWVzXG4gICAqIG9mIGBwcm9wc2AuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGdldCB2YWx1ZXMgZm9yLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gICAqL1xuICBmdW5jdGlvbiBiYXNlVmFsdWVzKG9iamVjdCwgcHJvcHMpIHtcbiAgICByZXR1cm4gYmFzZU1hcChwcm9wcywgZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gb2JqZWN0W2tleV07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCBieSBgXy5lc2NhcGVgIHRvIGNvbnZlcnQgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2hyIFRoZSBtYXRjaGVkIGNoYXJhY3RlciB0byBlc2NhcGUuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxuICAgKi9cbiAgdmFyIGVzY2FwZUh0bWxDaGFyID0gYmFzZVByb3BlcnR5T2YoaHRtbEVzY2FwZXMpO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbiAgdmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbiAgLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4gIC8qKiBVc2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBJRHMuICovXG4gIHZhciBpZENvdW50ZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gICAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICAgKiBvZiB2YWx1ZXMuXG4gICAqL1xuICB2YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuICAvKiogVXNlZCB0byByZXN0b3JlIHRoZSBvcmlnaW5hbCBgX2AgcmVmZXJlbmNlIGluIGBfLm5vQ29uZmxpY3RgLiAqL1xuICB2YXIgb2xkRGFzaCA9IHJvb3QuXztcblxuICAvKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbiAgdmFyIG9iamVjdENyZWF0ZSA9IE9iamVjdC5jcmVhdGUsXG4gICAgICBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4gIC8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbiAgdmFyIG5hdGl2ZUlzRmluaXRlID0gcm9vdC5pc0Zpbml0ZSxcbiAgICAgIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpLFxuICAgICAgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgYGxvZGFzaGAgb2JqZWN0IHdoaWNoIHdyYXBzIGB2YWx1ZWAgdG8gZW5hYmxlIGltcGxpY2l0IG1ldGhvZFxuICAgKiBjaGFpbiBzZXF1ZW5jZXMuIE1ldGhvZHMgdGhhdCBvcGVyYXRlIG9uIGFuZCByZXR1cm4gYXJyYXlzLCBjb2xsZWN0aW9ucyxcbiAgICogYW5kIGZ1bmN0aW9ucyBjYW4gYmUgY2hhaW5lZCB0b2dldGhlci4gTWV0aG9kcyB0aGF0IHJldHJpZXZlIGEgc2luZ2xlIHZhbHVlXG4gICAqIG9yIG1heSByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUgd2lsbCBhdXRvbWF0aWNhbGx5IGVuZCB0aGUgY2hhaW4gc2VxdWVuY2VcbiAgICogYW5kIHJldHVybiB0aGUgdW53cmFwcGVkIHZhbHVlLiBPdGhlcndpc2UsIHRoZSB2YWx1ZSBtdXN0IGJlIHVud3JhcHBlZFxuICAgKiB3aXRoIGBfI3ZhbHVlYC5cbiAgICpcbiAgICogRXhwbGljaXQgY2hhaW4gc2VxdWVuY2VzLCB3aGljaCBtdXN0IGJlIHVud3JhcHBlZCB3aXRoIGBfI3ZhbHVlYCwgbWF5IGJlXG4gICAqIGVuYWJsZWQgdXNpbmcgYF8uY2hhaW5gLlxuICAgKlxuICAgKiBUaGUgZXhlY3V0aW9uIG9mIGNoYWluZWQgbWV0aG9kcyBpcyBsYXp5LCB0aGF0IGlzLCBpdCdzIGRlZmVycmVkIHVudGlsXG4gICAqIGBfI3ZhbHVlYCBpcyBpbXBsaWNpdGx5IG9yIGV4cGxpY2l0bHkgY2FsbGVkLlxuICAgKlxuICAgKiBMYXp5IGV2YWx1YXRpb24gYWxsb3dzIHNldmVyYWwgbWV0aG9kcyB0byBzdXBwb3J0IHNob3J0Y3V0IGZ1c2lvbi5cbiAgICogU2hvcnRjdXQgZnVzaW9uIGlzIGFuIG9wdGltaXphdGlvbiB0byBtZXJnZSBpdGVyYXRlZSBjYWxsczsgdGhpcyBhdm9pZHNcbiAgICogdGhlIGNyZWF0aW9uIG9mIGludGVybWVkaWF0ZSBhcnJheXMgYW5kIGNhbiBncmVhdGx5IHJlZHVjZSB0aGUgbnVtYmVyIG9mXG4gICAqIGl0ZXJhdGVlIGV4ZWN1dGlvbnMuIFNlY3Rpb25zIG9mIGEgY2hhaW4gc2VxdWVuY2UgcXVhbGlmeSBmb3Igc2hvcnRjdXRcbiAgICogZnVzaW9uIGlmIHRoZSBzZWN0aW9uIGlzIGFwcGxpZWQgdG8gYW4gYXJyYXkgYW5kIGl0ZXJhdGVlcyBhY2NlcHQgb25seVxuICAgKiBvbmUgYXJndW1lbnQuIFRoZSBoZXVyaXN0aWMgZm9yIHdoZXRoZXIgYSBzZWN0aW9uIHF1YWxpZmllcyBmb3Igc2hvcnRjdXRcbiAgICogZnVzaW9uIGlzIHN1YmplY3QgdG8gY2hhbmdlLlxuICAgKlxuICAgKiBDaGFpbmluZyBpcyBzdXBwb3J0ZWQgaW4gY3VzdG9tIGJ1aWxkcyBhcyBsb25nIGFzIHRoZSBgXyN2YWx1ZWAgbWV0aG9kIGlzXG4gICAqIGRpcmVjdGx5IG9yIGluZGlyZWN0bHkgaW5jbHVkZWQgaW4gdGhlIGJ1aWxkLlxuICAgKlxuICAgKiBJbiBhZGRpdGlvbiB0byBsb2Rhc2ggbWV0aG9kcywgd3JhcHBlcnMgaGF2ZSBgQXJyYXlgIGFuZCBgU3RyaW5nYCBtZXRob2RzLlxuICAgKlxuICAgKiBUaGUgd3JhcHBlciBgQXJyYXlgIG1ldGhvZHMgYXJlOlxuICAgKiBgY29uY2F0YCwgYGpvaW5gLCBgcG9wYCwgYHB1c2hgLCBgc2hpZnRgLCBgc29ydGAsIGBzcGxpY2VgLCBhbmQgYHVuc2hpZnRgXG4gICAqXG4gICAqIFRoZSB3cmFwcGVyIGBTdHJpbmdgIG1ldGhvZHMgYXJlOlxuICAgKiBgcmVwbGFjZWAgYW5kIGBzcGxpdGBcbiAgICpcbiAgICogVGhlIHdyYXBwZXIgbWV0aG9kcyB0aGF0IHN1cHBvcnQgc2hvcnRjdXQgZnVzaW9uIGFyZTpcbiAgICogYGF0YCwgYGNvbXBhY3RgLCBgZHJvcGAsIGBkcm9wUmlnaHRgLCBgZHJvcFdoaWxlYCwgYGZpbHRlcmAsIGBmaW5kYCxcbiAgICogYGZpbmRMYXN0YCwgYGhlYWRgLCBgaW5pdGlhbGAsIGBsYXN0YCwgYG1hcGAsIGByZWplY3RgLCBgcmV2ZXJzZWAsIGBzbGljZWAsXG4gICAqIGB0YWlsYCwgYHRha2VgLCBgdGFrZVJpZ2h0YCwgYHRha2VSaWdodFdoaWxlYCwgYHRha2VXaGlsZWAsIGFuZCBgdG9BcnJheWBcbiAgICpcbiAgICogVGhlIGNoYWluYWJsZSB3cmFwcGVyIG1ldGhvZHMgYXJlOlxuICAgKiBgYWZ0ZXJgLCBgYXJ5YCwgYGFzc2lnbmAsIGBhc3NpZ25JbmAsIGBhc3NpZ25JbldpdGhgLCBgYXNzaWduV2l0aGAsIGBhdGAsXG4gICAqIGBiZWZvcmVgLCBgYmluZGAsIGBiaW5kQWxsYCwgYGJpbmRLZXlgLCBgY2FzdEFycmF5YCwgYGNoYWluYCwgYGNodW5rYCxcbiAgICogYGNvbW1pdGAsIGBjb21wYWN0YCwgYGNvbmNhdGAsIGBjb25mb3Jtc2AsIGBjb25zdGFudGAsIGBjb3VudEJ5YCwgYGNyZWF0ZWAsXG4gICAqIGBjdXJyeWAsIGBkZWJvdW5jZWAsIGBkZWZhdWx0c2AsIGBkZWZhdWx0c0RlZXBgLCBgZGVmZXJgLCBgZGVsYXlgLFxuICAgKiBgZGlmZmVyZW5jZWAsIGBkaWZmZXJlbmNlQnlgLCBgZGlmZmVyZW5jZVdpdGhgLCBgZHJvcGAsIGBkcm9wUmlnaHRgLFxuICAgKiBgZHJvcFJpZ2h0V2hpbGVgLCBgZHJvcFdoaWxlYCwgYGV4dGVuZGAsIGBleHRlbmRXaXRoYCwgYGZpbGxgLCBgZmlsdGVyYCxcbiAgICogYGZsYXRNYXBgLCBgZmxhdE1hcERlZXBgLCBgZmxhdE1hcERlcHRoYCwgYGZsYXR0ZW5gLCBgZmxhdHRlbkRlZXBgLFxuICAgKiBgZmxhdHRlbkRlcHRoYCwgYGZsaXBgLCBgZmxvd2AsIGBmbG93UmlnaHRgLCBgZnJvbVBhaXJzYCwgYGZ1bmN0aW9uc2AsXG4gICAqIGBmdW5jdGlvbnNJbmAsIGBncm91cEJ5YCwgYGluaXRpYWxgLCBgaW50ZXJzZWN0aW9uYCwgYGludGVyc2VjdGlvbkJ5YCxcbiAgICogYGludGVyc2VjdGlvbldpdGhgLCBgaW52ZXJ0YCwgYGludmVydEJ5YCwgYGludm9rZU1hcGAsIGBpdGVyYXRlZWAsIGBrZXlCeWAsXG4gICAqIGBrZXlzYCwgYGtleXNJbmAsIGBtYXBgLCBgbWFwS2V5c2AsIGBtYXBWYWx1ZXNgLCBgbWF0Y2hlc2AsIGBtYXRjaGVzUHJvcGVydHlgLFxuICAgKiBgbWVtb2l6ZWAsIGBtZXJnZWAsIGBtZXJnZVdpdGhgLCBgbWV0aG9kYCwgYG1ldGhvZE9mYCwgYG1peGluYCwgYG5lZ2F0ZWAsXG4gICAqIGBudGhBcmdgLCBgb21pdGAsIGBvbWl0QnlgLCBgb25jZWAsIGBvcmRlckJ5YCwgYG92ZXJgLCBgb3ZlckFyZ3NgLFxuICAgKiBgb3ZlckV2ZXJ5YCwgYG92ZXJTb21lYCwgYHBhcnRpYWxgLCBgcGFydGlhbFJpZ2h0YCwgYHBhcnRpdGlvbmAsIGBwaWNrYCxcbiAgICogYHBpY2tCeWAsIGBwbGFudGAsIGBwcm9wZXJ0eWAsIGBwcm9wZXJ0eU9mYCwgYHB1bGxgLCBgcHVsbEFsbGAsIGBwdWxsQWxsQnlgLFxuICAgKiBgcHVsbEFsbFdpdGhgLCBgcHVsbEF0YCwgYHB1c2hgLCBgcmFuZ2VgLCBgcmFuZ2VSaWdodGAsIGByZWFyZ2AsIGByZWplY3RgLFxuICAgKiBgcmVtb3ZlYCwgYHJlc3RgLCBgcmV2ZXJzZWAsIGBzYW1wbGVTaXplYCwgYHNldGAsIGBzZXRXaXRoYCwgYHNodWZmbGVgLFxuICAgKiBgc2xpY2VgLCBgc29ydGAsIGBzb3J0QnlgLCBgc3BsaWNlYCwgYHNwcmVhZGAsIGB0YWlsYCwgYHRha2VgLCBgdGFrZVJpZ2h0YCxcbiAgICogYHRha2VSaWdodFdoaWxlYCwgYHRha2VXaGlsZWAsIGB0YXBgLCBgdGhyb3R0bGVgLCBgdGhydWAsIGB0b0FycmF5YCxcbiAgICogYHRvUGFpcnNgLCBgdG9QYWlyc0luYCwgYHRvUGF0aGAsIGB0b1BsYWluT2JqZWN0YCwgYHRyYW5zZm9ybWAsIGB1bmFyeWAsXG4gICAqIGB1bmlvbmAsIGB1bmlvbkJ5YCwgYHVuaW9uV2l0aGAsIGB1bmlxYCwgYHVuaXFCeWAsIGB1bmlxV2l0aGAsIGB1bnNldGAsXG4gICAqIGB1bnNoaWZ0YCwgYHVuemlwYCwgYHVuemlwV2l0aGAsIGB1cGRhdGVgLCBgdXBkYXRlV2l0aGAsIGB2YWx1ZXNgLFxuICAgKiBgdmFsdWVzSW5gLCBgd2l0aG91dGAsIGB3cmFwYCwgYHhvcmAsIGB4b3JCeWAsIGB4b3JXaXRoYCwgYHppcGAsXG4gICAqIGB6aXBPYmplY3RgLCBgemlwT2JqZWN0RGVlcGAsIGFuZCBgemlwV2l0aGBcbiAgICpcbiAgICogVGhlIHdyYXBwZXIgbWV0aG9kcyB0aGF0IGFyZSAqKm5vdCoqIGNoYWluYWJsZSBieSBkZWZhdWx0IGFyZTpcbiAgICogYGFkZGAsIGBhdHRlbXB0YCwgYGNhbWVsQ2FzZWAsIGBjYXBpdGFsaXplYCwgYGNlaWxgLCBgY2xhbXBgLCBgY2xvbmVgLFxuICAgKiBgY2xvbmVEZWVwYCwgYGNsb25lRGVlcFdpdGhgLCBgY2xvbmVXaXRoYCwgYGNvbmZvcm1zVG9gLCBgZGVidXJyYCxcbiAgICogYGRlZmF1bHRUb2AsIGBkaXZpZGVgLCBgZWFjaGAsIGBlYWNoUmlnaHRgLCBgZW5kc1dpdGhgLCBgZXFgLCBgZXNjYXBlYCxcbiAgICogYGVzY2FwZVJlZ0V4cGAsIGBldmVyeWAsIGBmaW5kYCwgYGZpbmRJbmRleGAsIGBmaW5kS2V5YCwgYGZpbmRMYXN0YCxcbiAgICogYGZpbmRMYXN0SW5kZXhgLCBgZmluZExhc3RLZXlgLCBgZmlyc3RgLCBgZmxvb3JgLCBgZm9yRWFjaGAsIGBmb3JFYWNoUmlnaHRgLFxuICAgKiBgZm9ySW5gLCBgZm9ySW5SaWdodGAsIGBmb3JPd25gLCBgZm9yT3duUmlnaHRgLCBgZ2V0YCwgYGd0YCwgYGd0ZWAsIGBoYXNgLFxuICAgKiBgaGFzSW5gLCBgaGVhZGAsIGBpZGVudGl0eWAsIGBpbmNsdWRlc2AsIGBpbmRleE9mYCwgYGluUmFuZ2VgLCBgaW52b2tlYCxcbiAgICogYGlzQXJndW1lbnRzYCwgYGlzQXJyYXlgLCBgaXNBcnJheUJ1ZmZlcmAsIGBpc0FycmF5TGlrZWAsIGBpc0FycmF5TGlrZU9iamVjdGAsXG4gICAqIGBpc0Jvb2xlYW5gLCBgaXNCdWZmZXJgLCBgaXNEYXRlYCwgYGlzRWxlbWVudGAsIGBpc0VtcHR5YCwgYGlzRXF1YWxgLFxuICAgKiBgaXNFcXVhbFdpdGhgLCBgaXNFcnJvcmAsIGBpc0Zpbml0ZWAsIGBpc0Z1bmN0aW9uYCwgYGlzSW50ZWdlcmAsIGBpc0xlbmd0aGAsXG4gICAqIGBpc01hcGAsIGBpc01hdGNoYCwgYGlzTWF0Y2hXaXRoYCwgYGlzTmFOYCwgYGlzTmF0aXZlYCwgYGlzTmlsYCwgYGlzTnVsbGAsXG4gICAqIGBpc051bWJlcmAsIGBpc09iamVjdGAsIGBpc09iamVjdExpa2VgLCBgaXNQbGFpbk9iamVjdGAsIGBpc1JlZ0V4cGAsXG4gICAqIGBpc1NhZmVJbnRlZ2VyYCwgYGlzU2V0YCwgYGlzU3RyaW5nYCwgYGlzVW5kZWZpbmVkYCwgYGlzVHlwZWRBcnJheWAsXG4gICAqIGBpc1dlYWtNYXBgLCBgaXNXZWFrU2V0YCwgYGpvaW5gLCBga2ViYWJDYXNlYCwgYGxhc3RgLCBgbGFzdEluZGV4T2ZgLFxuICAgKiBgbG93ZXJDYXNlYCwgYGxvd2VyRmlyc3RgLCBgbHRgLCBgbHRlYCwgYG1heGAsIGBtYXhCeWAsIGBtZWFuYCwgYG1lYW5CeWAsXG4gICAqIGBtaW5gLCBgbWluQnlgLCBgbXVsdGlwbHlgLCBgbm9Db25mbGljdGAsIGBub29wYCwgYG5vd2AsIGBudGhgLCBgcGFkYCxcbiAgICogYHBhZEVuZGAsIGBwYWRTdGFydGAsIGBwYXJzZUludGAsIGBwb3BgLCBgcmFuZG9tYCwgYHJlZHVjZWAsIGByZWR1Y2VSaWdodGAsXG4gICAqIGByZXBlYXRgLCBgcmVzdWx0YCwgYHJvdW5kYCwgYHJ1bkluQ29udGV4dGAsIGBzYW1wbGVgLCBgc2hpZnRgLCBgc2l6ZWAsXG4gICAqIGBzbmFrZUNhc2VgLCBgc29tZWAsIGBzb3J0ZWRJbmRleGAsIGBzb3J0ZWRJbmRleEJ5YCwgYHNvcnRlZExhc3RJbmRleGAsXG4gICAqIGBzb3J0ZWRMYXN0SW5kZXhCeWAsIGBzdGFydENhc2VgLCBgc3RhcnRzV2l0aGAsIGBzdHViQXJyYXlgLCBgc3R1YkZhbHNlYCxcbiAgICogYHN0dWJPYmplY3RgLCBgc3R1YlN0cmluZ2AsIGBzdHViVHJ1ZWAsIGBzdWJ0cmFjdGAsIGBzdW1gLCBgc3VtQnlgLFxuICAgKiBgdGVtcGxhdGVgLCBgdGltZXNgLCBgdG9GaW5pdGVgLCBgdG9JbnRlZ2VyYCwgYHRvSlNPTmAsIGB0b0xlbmd0aGAsXG4gICAqIGB0b0xvd2VyYCwgYHRvTnVtYmVyYCwgYHRvU2FmZUludGVnZXJgLCBgdG9TdHJpbmdgLCBgdG9VcHBlcmAsIGB0cmltYCxcbiAgICogYHRyaW1FbmRgLCBgdHJpbVN0YXJ0YCwgYHRydW5jYXRlYCwgYHVuZXNjYXBlYCwgYHVuaXF1ZUlkYCwgYHVwcGVyQ2FzZWAsXG4gICAqIGB1cHBlckZpcnN0YCwgYHZhbHVlYCwgYW5kIGB3b3Jkc2BcbiAgICpcbiAgICogQG5hbWUgX1xuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGNhdGVnb3J5IFNlcVxuICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byB3cmFwIGluIGEgYGxvZGFzaGAgaW5zdGFuY2UuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBgbG9kYXNoYCB3cmFwcGVyIGluc3RhbmNlLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBmdW5jdGlvbiBzcXVhcmUobikge1xuICAgKiAgIHJldHVybiBuICogbjtcbiAgICogfVxuICAgKlxuICAgKiB2YXIgd3JhcHBlZCA9IF8oWzEsIDIsIDNdKTtcbiAgICpcbiAgICogLy8gUmV0dXJucyBhbiB1bndyYXBwZWQgdmFsdWUuXG4gICAqIHdyYXBwZWQucmVkdWNlKF8uYWRkKTtcbiAgICogLy8gPT4gNlxuICAgKlxuICAgKiAvLyBSZXR1cm5zIGEgd3JhcHBlZCB2YWx1ZS5cbiAgICogdmFyIHNxdWFyZXMgPSB3cmFwcGVkLm1hcChzcXVhcmUpO1xuICAgKlxuICAgKiBfLmlzQXJyYXkoc3F1YXJlcyk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqXG4gICAqIF8uaXNBcnJheShzcXVhcmVzLnZhbHVlKCkpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqL1xuICBmdW5jdGlvbiBsb2Rhc2godmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBMb2Rhc2hXcmFwcGVyXG4gICAgICA/IHZhbHVlXG4gICAgICA6IG5ldyBMb2Rhc2hXcmFwcGVyKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jcmVhdGVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXNzaWduaW5nXG4gICAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvdG8gVGhlIG9iamVjdCB0byBpbmhlcml0IGZyb20uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gICAqL1xuICB2YXIgYmFzZUNyZWF0ZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBvYmplY3QoKSB7fVxuICAgIHJldHVybiBmdW5jdGlvbihwcm90bykge1xuICAgICAgaWYgKCFpc09iamVjdChwcm90bykpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgICAgaWYgKG9iamVjdENyZWF0ZSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0Q3JlYXRlKHByb3RvKTtcbiAgICAgIH1cbiAgICAgIG9iamVjdC5wcm90b3R5cGUgPSBwcm90bztcbiAgICAgIHZhciByZXN1bHQgPSBuZXcgb2JqZWN0O1xuICAgICAgb2JqZWN0LnByb3RvdHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfSgpKTtcblxuICAvKipcbiAgICogVGhlIGJhc2UgY29uc3RydWN0b3IgZm9yIGNyZWF0aW5nIGBsb2Rhc2hgIHdyYXBwZXIgb2JqZWN0cy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gd3JhcC5cbiAgICogQHBhcmFtIHtib29sZWFufSBbY2hhaW5BbGxdIEVuYWJsZSBleHBsaWNpdCBtZXRob2QgY2hhaW4gc2VxdWVuY2VzLlxuICAgKi9cbiAgZnVuY3Rpb24gTG9kYXNoV3JhcHBlcih2YWx1ZSwgY2hhaW5BbGwpIHtcbiAgICB0aGlzLl9fd3JhcHBlZF9fID0gdmFsdWU7XG4gICAgdGhpcy5fX2FjdGlvbnNfXyA9IFtdO1xuICAgIHRoaXMuX19jaGFpbl9fID0gISFjaGFpbkFsbDtcbiAgfVxuXG4gIExvZGFzaFdyYXBwZXIucHJvdG90eXBlID0gYmFzZUNyZWF0ZShsb2Rhc2gucHJvdG90eXBlKTtcbiAgTG9kYXNoV3JhcHBlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2Rhc2hXcmFwcGVyO1xuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICAgKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICAgKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gICAqL1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBhc3NpZ25WYWx1ZWAgYW5kIGBhc3NpZ25NZXJnZVZhbHVlYCB3aXRob3V0XG4gICAqIHZhbHVlIGNoZWNrcy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAgICovXG4gIGZ1bmN0aW9uIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmRlbGF5YCBhbmQgYF8uZGVmZXJgIHdoaWNoIGFjY2VwdHMgYGFyZ3NgXG4gICAqIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWxheS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHdhaXQgVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkgaW52b2NhdGlvbi5cbiAgICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfE9iamVjdH0gUmV0dXJucyB0aGUgdGltZXIgaWQgb3IgdGltZW91dCBvYmplY3QuXG4gICAqL1xuICBmdW5jdGlvbiBiYXNlRGVsYXkoZnVuYywgd2FpdCwgYXJncykge1xuICAgIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gICAgfVxuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7IH0sIHdhaXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckVhY2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAgICovXG4gIHZhciBiYXNlRWFjaCA9IGNyZWF0ZUJhc2VFYWNoKGJhc2VGb3JPd24pO1xuXG4gIC8qKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5ldmVyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYWxsIGVsZW1lbnRzIHBhc3MgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAgICogIGVsc2UgYGZhbHNlYFxuICAgKi9cbiAgZnVuY3Rpb24gYmFzZUV2ZXJ5KGNvbGxlY3Rpb24sIHByZWRpY2F0ZSkge1xuICAgIHZhciByZXN1bHQgPSB0cnVlO1xuICAgIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmVzdWx0ID0gISFwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBtZXRob2RzIGxpa2UgYF8ubWF4YCBhbmQgYF8ubWluYCB3aGljaCBhY2NlcHRzIGFcbiAgICogYGNvbXBhcmF0b3JgIHRvIGRldGVybWluZSB0aGUgZXh0cmVtdW0gdmFsdWUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgVGhlIGNvbXBhcmF0b3IgdXNlZCB0byBjb21wYXJlIHZhbHVlcy5cbiAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGV4dHJlbXVtIHZhbHVlLlxuICAgKi9cbiAgZnVuY3Rpb24gYmFzZUV4dHJlbXVtKGFycmF5LCBpdGVyYXRlZSwgY29tcGFyYXRvcikge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIGN1cnJlbnQgPSBpdGVyYXRlZSh2YWx1ZSk7XG5cbiAgICAgIGlmIChjdXJyZW50ICE9IG51bGwgJiYgKGNvbXB1dGVkID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gKGN1cnJlbnQgPT09IGN1cnJlbnQgJiYgIWZhbHNlKVxuICAgICAgICAgICAgOiBjb21wYXJhdG9yKGN1cnJlbnQsIGNvbXB1dGVkKVxuICAgICAgICAgICkpIHtcbiAgICAgICAgdmFyIGNvbXB1dGVkID0gY3VycmVudCxcbiAgICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbHRlcmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmaWx0ZXJlZCBhcnJheS5cbiAgICovXG4gIGZ1bmN0aW9uIGJhc2VGaWx0ZXIoY29sbGVjdGlvbiwgcHJlZGljYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZsYXR0ZW5gIHdpdGggc3VwcG9ydCBmb3IgcmVzdHJpY3RpbmcgZmxhdHRlbmluZy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZsYXR0ZW4uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCBUaGUgbWF4aW11bSByZWN1cnNpb24gZGVwdGguXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ByZWRpY2F0ZT1pc0ZsYXR0ZW5hYmxlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1N0cmljdF0gUmVzdHJpY3QgdG8gdmFsdWVzIHRoYXQgcGFzcyBgcHJlZGljYXRlYCBjaGVja3MuXG4gICAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHQ9W11dIFRoZSBpbml0aWFsIHJlc3VsdCB2YWx1ZS5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICAgKi9cbiAgZnVuY3Rpb24gYmFzZUZsYXR0ZW4oYXJyYXksIGRlcHRoLCBwcmVkaWNhdGUsIGlzU3RyaWN0LCByZXN1bHQpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgcHJlZGljYXRlIHx8IChwcmVkaWNhdGUgPSBpc0ZsYXR0ZW5hYmxlKTtcbiAgICByZXN1bHQgfHwgKHJlc3VsdCA9IFtdKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgICBpZiAoZGVwdGggPiAwICYmIHByZWRpY2F0ZSh2YWx1ZSkpIHtcbiAgICAgICAgaWYgKGRlcHRoID4gMSkge1xuICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGZsYXR0ZW4gYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgICAgYmFzZUZsYXR0ZW4odmFsdWUsIGRlcHRoIC0gMSwgcHJlZGljYXRlLCBpc1N0cmljdCwgcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnJheVB1c2gocmVzdWx0LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIWlzU3RyaWN0KSB7XG4gICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlcyBvdmVyIGBvYmplY3RgXG4gICAqIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIHByb3BlcnR5LlxuICAgKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gICAqL1xuICB2YXIgYmFzZUZvciA9IGNyZWF0ZUJhc2VGb3IoKTtcblxuICAvKipcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gICAqL1xuICBmdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZnVuY3Rpb25zYCB3aGljaCBjcmVhdGVzIGFuIGFycmF5IG9mXG4gICAqIGBvYmplY3RgIGZ1bmN0aW9uIHByb3BlcnR5IG5hbWVzIGZpbHRlcmVkIGZyb20gYHByb3BzYC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBmaWx0ZXIuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgZnVuY3Rpb24gbmFtZXMuXG4gICAqL1xuICBmdW5jdGlvbiBiYXNlRnVuY3Rpb25zKG9iamVjdCwgcHJvcHMpIHtcbiAgICByZXR1cm4gYmFzZUZpbHRlcihwcm9wcywgZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gaXNGdW5jdGlvbihvYmplY3Rba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gICAqL1xuICBmdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5ndGAgd2hpY2ggZG9lc24ndCBjb2VyY2UgYXJndW1lbnRzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICAgKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBncmVhdGVyIHRoYW4gYG90aGVyYCxcbiAgICogIGVsc2UgYGZhbHNlYC5cbiAgICovXG4gIGZ1bmN0aW9uIGJhc2VHdCh2YWx1ZSwgb3RoZXIpIHtcbiAgICByZXR1cm4gdmFsdWUgPiBvdGhlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0FyZ3VtZW50c2AuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gICAqL1xuICB2YXIgYmFzZUlzQXJndW1lbnRzID0gbm9vcDtcblxuICAvKipcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNEYXRlYCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZGF0ZSBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAgICovXG4gIGZ1bmN0aW9uIGJhc2VJc0RhdGUodmFsdWUpIHtcbiAgICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBkYXRlVGFnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdoaWNoIHN1cHBvcnRzIHBhcnRpYWwgY29tcGFyaXNvbnNcbiAgICogYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAgICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLlxuICAgKiAgMSAtIFVub3JkZXJlZCBjb21wYXJpc29uXG4gICAqICAyIC0gUGFydGlhbCBjb21wYXJpc29uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAgICovXG4gIGZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgICBpZiAodmFsdWUgPT09IG90aGVyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCB8fCAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgIWlzT2JqZWN0TGlrZShvdGhlcikpKSB7XG4gICAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgICB9XG4gICAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGJhc2VJc0VxdWFsLCBzdGFjayk7XG4gIH1cblxuICAvKipcbiAgICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICAgKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gICAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gICAqL1xuICBmdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICAgIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgICAgb3RoSXNBcnIgPSBpc0FycmF5KG90aGVyKSxcbiAgICAgICAgb2JqVGFnID0gb2JqSXNBcnIgPyBhcnJheVRhZyA6IGJhc2VHZXRUYWcob2JqZWN0KSxcbiAgICAgICAgb3RoVGFnID0gb3RoSXNBcnIgPyBhcnJheVRhZyA6IGJhc2VHZXRUYWcob3RoZXIpO1xuXG4gICAgb2JqVGFnID0gb2JqVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvYmpUYWc7XG4gICAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvdGhUYWc7XG5cbiAgICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgICBvdGhJc09iaiA9IG90aFRhZyA9PSBvYmplY3RUYWcsXG4gICAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgICBzdGFjayB8fCAoc3RhY2sgPSBbXSk7XG4gICAgdmFyIG9ialN0YWNrID0gZmluZChzdGFjaywgZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHJldHVybiBlbnRyeVswXSA9PSBvYmplY3Q7XG4gICAgfSk7XG4gICAgdmFyIG90aFN0YWNrID0gZmluZChzdGFjaywgZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHJldHVybiBlbnRyeVswXSA9PSBvdGhlcjtcbiAgICB9KTtcbiAgICBpZiAob2JqU3RhY2sgJiYgb3RoU3RhY2spIHtcbiAgICAgIHJldHVybiBvYmpTdGFja1sxXSA9PSBvdGhlcjtcbiAgICB9XG4gICAgc3RhY2sucHVzaChbb2JqZWN0LCBvdGhlcl0pO1xuICAgIHN0YWNrLnB1c2goW290aGVyLCBvYmplY3RdKTtcbiAgICBpZiAoaXNTYW1lVGFnICYmICFvYmpJc09iaikge1xuICAgICAgdmFyIHJlc3VsdCA9IChvYmpJc0FycilcbiAgICAgICAgPyBlcXVhbEFycmF5cyhvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKVxuICAgICAgICA6IGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbiAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaWYgKCEoYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHKSkge1xuICAgICAgdmFyIG9iaklzV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgICAgaWYgKG9iaklzV3JhcHBlZCB8fCBvdGhJc1dyYXBwZWQpIHtcbiAgICAgICAgdmFyIG9ialVud3JhcHBlZCA9IG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LFxuICAgICAgICAgICAgb3RoVW53cmFwcGVkID0gb3RoSXNXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyO1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBlcXVhbEZ1bmMob2JqVW53cmFwcGVkLCBvdGhVbndyYXBwZWQsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghaXNTYW1lVGFnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjayk7XG4gICAgc3RhY2sucG9wKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1JlZ0V4cGAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHJlZ2V4cCwgZWxzZSBgZmFsc2VgLlxuICAgKi9cbiAgZnVuY3Rpb24gYmFzZUlzUmVnRXhwKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gcmVnZXhwVGFnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLml0ZXJhdGVlYC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHsqfSBbdmFsdWU9Xy5pZGVudGl0eV0gVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYW4gaXRlcmF0ZWUuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgaXRlcmF0ZWUuXG4gICAqL1xuICBmdW5jdGlvbiBiYXNlSXRlcmF0ZWUoZnVuYykge1xuICAgIGlmICh0eXBlb2YgZnVuYyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gZnVuYztcbiAgICB9XG4gICAgaWYgKGZ1bmMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGlkZW50aXR5O1xuICAgIH1cbiAgICByZXR1cm4gKHR5cGVvZiBmdW5jID09ICdvYmplY3QnID8gYmFzZU1hdGNoZXMgOiBiYXNlUHJvcGVydHkpKGZ1bmMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmx0YCB3aGljaCBkb2Vzbid0IGNvZXJjZSBhcmd1bWVudHMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gICAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGxlc3MgdGhhbiBgb3RoZXJgLFxuICAgKiAgZWxzZSBgZmFsc2VgLlxuICAgKi9cbiAgZnVuY3Rpb24gYmFzZUx0KHZhbHVlLCBvdGhlcikge1xuICAgIHJldHVybiB2YWx1ZSA8IG90aGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hcGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAgICovXG4gIGZ1bmN0aW9uIGJhc2VNYXAoY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgcmVzdWx0ID0gaXNBcnJheUxpa2UoY29sbGVjdGlvbikgPyBBcnJheShjb2xsZWN0aW9uLmxlbmd0aCkgOiBbXTtcblxuICAgIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJlc3VsdFsrK2luZGV4XSA9IGl0ZXJhdGVlKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc2Agd2hpY2ggZG9lc24ndCBjbG9uZSBgc291cmNlYC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGJhc2VNYXRjaGVzKHNvdXJjZSkge1xuICAgIHZhciBwcm9wcyA9IG5hdGl2ZUtleXMoc291cmNlKTtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICB2YXIgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuICAgICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAhbGVuZ3RoO1xuICAgICAgfVxuICAgICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgdmFyIGtleSA9IHByb3BzW2xlbmd0aF07XG4gICAgICAgIGlmICghKGtleSBpbiBvYmplY3QgJiZcbiAgICAgICAgICAgICAgYmFzZUlzRXF1YWwoc291cmNlW2tleV0sIG9iamVjdFtrZXldLCBDT01QQVJFX1BBUlRJQUxfRkxBRyB8IENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcpXG4gICAgICAgICAgICApKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnBpY2tgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaW5kaXZpZHVhbFxuICAgKiBwcm9wZXJ0eSBpZGVudGlmaWVycy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gcGF0aHMgVGhlIHByb3BlcnR5IHBhdGhzIHRvIHBpY2suXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gICAqL1xuICBmdW5jdGlvbiBiYXNlUGljayhvYmplY3QsIHByb3BzKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgcmV0dXJuIHJlZHVjZShwcm9wcywgZnVuY3Rpb24ocmVzdWx0LCBrZXkpIHtcbiAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gb2JqZWN0W2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBiYXNlUmVzdChmdW5jLCBzdGFydCkge1xuICAgIHJldHVybiBzZXRUb1N0cmluZyhvdmVyUmVzdChmdW5jLCBzdGFydCwgaWRlbnRpdHkpLCBmdW5jICsgJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNsaWNlYCB3aXRob3V0IGFuIGl0ZXJhdGVlIGNhbGwgZ3VhcmQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzbGljZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD0wXSBUaGUgc3RhcnQgcG9zaXRpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kPWFycmF5Lmxlbmd0aF0gVGhlIGVuZCBwb3NpdGlvbi5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBzbGljZSBvZiBgYXJyYXlgLlxuICAgKi9cbiAgZnVuY3Rpb24gYmFzZVNsaWNlKGFycmF5LCBzdGFydCwgZW5kKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICAgIGlmIChzdGFydCA8IDApIHtcbiAgICAgIHN0YXJ0ID0gLXN0YXJ0ID4gbGVuZ3RoID8gMCA6IChsZW5ndGggKyBzdGFydCk7XG4gICAgfVxuICAgIGVuZCA9IGVuZCA+IGxlbmd0aCA/IGxlbmd0aCA6IGVuZDtcbiAgICBpZiAoZW5kIDwgMCkge1xuICAgICAgZW5kICs9IGxlbmd0aDtcbiAgICB9XG4gICAgbGVuZ3RoID0gc3RhcnQgPiBlbmQgPyAwIDogKChlbmQgLSBzdGFydCkgPj4+IDApO1xuICAgIHN0YXJ0ID4+Pj0gMDtcblxuICAgIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICByZXN1bHRbaW5kZXhdID0gYXJyYXlbaW5kZXggKyBzdGFydF07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICAgKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gICAqL1xuICBmdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlKSB7XG4gICAgcmV0dXJuIGJhc2VTbGljZShzb3VyY2UsIDAsIHNvdXJjZS5sZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNvbWVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICAgKiAgZWxzZSBgZmFsc2VgLlxuICAgKi9cbiAgZnVuY3Rpb24gYmFzZVNvbWUoY29sbGVjdGlvbiwgcHJlZGljYXRlKSB7XG4gICAgdmFyIHJlc3VsdDtcblxuICAgIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmVzdWx0ID0gcHJlZGljYXRlKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgICByZXR1cm4gIXJlc3VsdDtcbiAgICB9KTtcbiAgICByZXR1cm4gISFyZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYHdyYXBwZXJWYWx1ZWAgd2hpY2ggcmV0dXJucyB0aGUgcmVzdWx0IG9mXG4gICAqIHBlcmZvcm1pbmcgYSBzZXF1ZW5jZSBvZiBhY3Rpb25zIG9uIHRoZSB1bndyYXBwZWQgYHZhbHVlYCwgd2hlcmUgZWFjaFxuICAgKiBzdWNjZXNzaXZlIGFjdGlvbiBpcyBzdXBwbGllZCB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBwcmV2aW91cy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdW53cmFwcGVkIHZhbHVlLlxuICAgKiBAcGFyYW0ge0FycmF5fSBhY3Rpb25zIEFjdGlvbnMgdG8gcGVyZm9ybSB0byByZXNvbHZlIHRoZSB1bndyYXBwZWQgdmFsdWUuXG4gICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAgICovXG4gIGZ1bmN0aW9uIGJhc2VXcmFwcGVyVmFsdWUodmFsdWUsIGFjdGlvbnMpIHtcbiAgICB2YXIgcmVzdWx0ID0gdmFsdWU7XG4gICAgcmV0dXJuIHJlZHVjZShhY3Rpb25zLCBmdW5jdGlvbihyZXN1bHQsIGFjdGlvbikge1xuICAgICAgcmV0dXJuIGFjdGlvbi5mdW5jLmFwcGx5KGFjdGlvbi50aGlzQXJnLCBhcnJheVB1c2goW3Jlc3VsdF0sIGFjdGlvbi5hcmdzKSk7XG4gICAgfSwgcmVzdWx0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlcyB2YWx1ZXMgdG8gc29ydCB0aGVtIGluIGFzY2VuZGluZyBvcmRlci5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAgICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgc29ydCBvcmRlciBpbmRpY2F0b3IgZm9yIGB2YWx1ZWAuXG4gICAqL1xuICBmdW5jdGlvbiBjb21wYXJlQXNjZW5kaW5nKHZhbHVlLCBvdGhlcikge1xuICAgIGlmICh2YWx1ZSAhPT0gb3RoZXIpIHtcbiAgICAgIHZhciB2YWxJc0RlZmluZWQgPSB2YWx1ZSAhPT0gdW5kZWZpbmVkLFxuICAgICAgICAgIHZhbElzTnVsbCA9IHZhbHVlID09PSBudWxsLFxuICAgICAgICAgIHZhbElzUmVmbGV4aXZlID0gdmFsdWUgPT09IHZhbHVlLFxuICAgICAgICAgIHZhbElzU3ltYm9sID0gZmFsc2U7XG5cbiAgICAgIHZhciBvdGhJc0RlZmluZWQgPSBvdGhlciAhPT0gdW5kZWZpbmVkLFxuICAgICAgICAgIG90aElzTnVsbCA9IG90aGVyID09PSBudWxsLFxuICAgICAgICAgIG90aElzUmVmbGV4aXZlID0gb3RoZXIgPT09IG90aGVyLFxuICAgICAgICAgIG90aElzU3ltYm9sID0gZmFsc2U7XG5cbiAgICAgIGlmICgoIW90aElzTnVsbCAmJiAhb3RoSXNTeW1ib2wgJiYgIXZhbElzU3ltYm9sICYmIHZhbHVlID4gb3RoZXIpIHx8XG4gICAgICAgICAgKHZhbElzU3ltYm9sICYmIG90aElzRGVmaW5lZCAmJiBvdGhJc1JlZmxleGl2ZSAmJiAhb3RoSXNOdWxsICYmICFvdGhJc1N5bWJvbCkgfHxcbiAgICAgICAgICAodmFsSXNOdWxsICYmIG90aElzRGVmaW5lZCAmJiBvdGhJc1JlZmxleGl2ZSkgfHxcbiAgICAgICAgICAoIXZhbElzRGVmaW5lZCAmJiBvdGhJc1JlZmxleGl2ZSkgfHxcbiAgICAgICAgICAhdmFsSXNSZWZsZXhpdmUpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBpZiAoKCF2YWxJc051bGwgJiYgIXZhbElzU3ltYm9sICYmICFvdGhJc1N5bWJvbCAmJiB2YWx1ZSA8IG90aGVyKSB8fFxuICAgICAgICAgIChvdGhJc1N5bWJvbCAmJiB2YWxJc0RlZmluZWQgJiYgdmFsSXNSZWZsZXhpdmUgJiYgIXZhbElzTnVsbCAmJiAhdmFsSXNTeW1ib2wpIHx8XG4gICAgICAgICAgKG90aElzTnVsbCAmJiB2YWxJc0RlZmluZWQgJiYgdmFsSXNSZWZsZXhpdmUpIHx8XG4gICAgICAgICAgKCFvdGhJc0RlZmluZWQgJiYgdmFsSXNSZWZsZXhpdmUpIHx8XG4gICAgICAgICAgIW90aElzUmVmbGV4aXZlKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICAvKipcbiAgICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAgICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIGNvcHkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29waWVkIHZhbHVlcy5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAgICovXG4gIGZ1bmN0aW9uIGNvcHlPYmplY3Qoc291cmNlLCBwcm9wcywgb2JqZWN0LCBjdXN0b21pemVyKSB7XG4gICAgdmFyIGlzTmV3ID0gIW9iamVjdDtcbiAgICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcblxuICAgICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICAgIGlmIChpc05ldykge1xuICAgICAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgICByZXR1cm4gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2VzKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgICBjdXN0b21pemVyID0gbGVuZ3RoID4gMSA/IHNvdXJjZXNbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG5cbiAgICAgIGN1c3RvbWl6ZXIgPSAoYXNzaWduZXIubGVuZ3RoID4gMyAmJiB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKVxuICAgICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgYGJhc2VFYWNoYCBvciBgYmFzZUVhY2hSaWdodGAgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYSBjb2xsZWN0aW9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZUJhc2VFYWNoKGVhY2hGdW5jLCBmcm9tUmlnaHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgICAgIGlmIChjb2xsZWN0aW9uID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgICB9XG4gICAgICBpZiAoIWlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBlYWNoRnVuYyhjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gICAgICB9XG4gICAgICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGgsXG4gICAgICAgICAgaW5kZXggPSBmcm9tUmlnaHQgPyBsZW5ndGggOiAtMSxcbiAgICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChjb2xsZWN0aW9uKTtcblxuICAgICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgbWV0aG9kcyBsaWtlIGBfLmZvckluYCBhbmQgYF8uZm9yT3duYC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgaXRlcmFibGUgPSBPYmplY3Qob2JqZWN0KSxcbiAgICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgdmFyIGtleSA9IHByb3BzW2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdO1xuICAgICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyBhbiBpbnN0YW5jZSBvZiBgQ3RvcmAgcmVnYXJkbGVzcyBvZlxuICAgKiB3aGV0aGVyIGl0IHdhcyBpbnZva2VkIGFzIHBhcnQgb2YgYSBgbmV3YCBleHByZXNzaW9uIG9yIGJ5IGBjYWxsYCBvciBgYXBwbHlgLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBDdG9yIFRoZSBjb25zdHJ1Y3RvciB0byB3cmFwLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB3cmFwcGVkIGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlQ3RvcihDdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgLy8gVXNlIGEgYHN3aXRjaGAgc3RhdGVtZW50IHRvIHdvcmsgd2l0aCBjbGFzcyBjb25zdHJ1Y3RvcnMuIFNlZVxuICAgICAgLy8gaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1mdW5jdGlvbi1vYmplY3RzLWNhbGwtdGhpc2FyZ3VtZW50LWFyZ3VtZW50c2xpc3RcbiAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciB0aGlzQmluZGluZyA9IGJhc2VDcmVhdGUoQ3Rvci5wcm90b3R5cGUpLFxuICAgICAgICAgIHJlc3VsdCA9IEN0b3IuYXBwbHkodGhpc0JpbmRpbmcsIGFyZ3MpO1xuXG4gICAgICAvLyBNaW1pYyB0aGUgY29uc3RydWN0b3IncyBgcmV0dXJuYCBiZWhhdmlvci5cbiAgICAgIC8vIFNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI3gxMy4yLjIgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBpc09iamVjdChyZXN1bHQpID8gcmVzdWx0IDogdGhpc0JpbmRpbmc7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgYF8uZmluZGAgb3IgYF8uZmluZExhc3RgIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmaW5kSW5kZXhGdW5jIFRoZSBmdW5jdGlvbiB0byBmaW5kIHRoZSBjb2xsZWN0aW9uIGluZGV4LlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmaW5kIGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlRmluZChmaW5kSW5kZXhGdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSwgZnJvbUluZGV4KSB7XG4gICAgICB2YXIgaXRlcmFibGUgPSBPYmplY3QoY29sbGVjdGlvbik7XG4gICAgICBpZiAoIWlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHZhciBpdGVyYXRlZSA9IGJhc2VJdGVyYXRlZShwcmVkaWNhdGUsIDMpO1xuICAgICAgICBjb2xsZWN0aW9uID0ga2V5cyhjb2xsZWN0aW9uKTtcbiAgICAgICAgcHJlZGljYXRlID0gZnVuY3Rpb24oa2V5KSB7IHJldHVybiBpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKTsgfTtcbiAgICAgIH1cbiAgICAgIHZhciBpbmRleCA9IGZpbmRJbmRleEZ1bmMoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBmcm9tSW5kZXgpO1xuICAgICAgcmV0dXJuIGluZGV4ID4gLTEgPyBpdGVyYWJsZVtpdGVyYXRlZSA/IGNvbGxlY3Rpb25baW5kZXhdIDogaW5kZXhdIDogdW5kZWZpbmVkO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYGZ1bmNgIHRvIGludm9rZSBpdCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZ1xuICAgKiBvZiBgdGhpc0FyZ2AgYW5kIGBwYXJ0aWFsc2AgcHJlcGVuZGVkIHRvIHRoZSBhcmd1bWVudHMgaXQgcmVjZWl2ZXMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGNyZWF0ZVdyYXBgIGZvciBtb3JlIGRldGFpbHMuXG4gICAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICAgKiBAcGFyYW0ge0FycmF5fSBwYXJ0aWFscyBUaGUgYXJndW1lbnRzIHRvIHByZXBlbmQgdG8gdGhvc2UgcHJvdmlkZWQgdG9cbiAgICogIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHdyYXBwZWQgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVQYXJ0aWFsKGZ1bmMsIGJpdG1hc2ssIHRoaXNBcmcsIHBhcnRpYWxzKSB7XG4gICAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgICB9XG4gICAgdmFyIGlzQmluZCA9IGJpdG1hc2sgJiBXUkFQX0JJTkRfRkxBRyxcbiAgICAgICAgQ3RvciA9IGNyZWF0ZUN0b3IoZnVuYyk7XG5cbiAgICBmdW5jdGlvbiB3cmFwcGVyKCkge1xuICAgICAgdmFyIGFyZ3NJbmRleCA9IC0xLFxuICAgICAgICAgIGFyZ3NMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgICAgIGxlZnRJbmRleCA9IC0xLFxuICAgICAgICAgIGxlZnRMZW5ndGggPSBwYXJ0aWFscy5sZW5ndGgsXG4gICAgICAgICAgYXJncyA9IEFycmF5KGxlZnRMZW5ndGggKyBhcmdzTGVuZ3RoKSxcbiAgICAgICAgICBmbiA9ICh0aGlzICYmIHRoaXMgIT09IHJvb3QgJiYgdGhpcyBpbnN0YW5jZW9mIHdyYXBwZXIpID8gQ3RvciA6IGZ1bmM7XG5cbiAgICAgIHdoaWxlICgrK2xlZnRJbmRleCA8IGxlZnRMZW5ndGgpIHtcbiAgICAgICAgYXJnc1tsZWZ0SW5kZXhdID0gcGFydGlhbHNbbGVmdEluZGV4XTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChhcmdzTGVuZ3RoLS0pIHtcbiAgICAgICAgYXJnc1tsZWZ0SW5kZXgrK10gPSBhcmd1bWVudHNbKythcmdzSW5kZXhdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZuLmFwcGx5KGlzQmluZCA/IHRoaXNBcmcgOiB0aGlzLCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCBieSBgXy5kZWZhdWx0c2AgdG8gY3VzdG9taXplIGl0cyBgXy5hc3NpZ25JbmAgdXNlIHRvIGFzc2lnbiBwcm9wZXJ0aWVzXG4gICAqIG9mIHNvdXJjZSBvYmplY3RzIHRvIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QgZm9yIGFsbCBkZXN0aW5hdGlvbiBwcm9wZXJ0aWVzXG4gICAqIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHsqfSBvYmpWYWx1ZSBUaGUgZGVzdGluYXRpb24gdmFsdWUuXG4gICAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHNvdXJjZSB2YWx1ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHBhcmVudCBvYmplY3Qgb2YgYG9ialZhbHVlYC5cbiAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAgICovXG4gIGZ1bmN0aW9uIGN1c3RvbURlZmF1bHRzQXNzaWduSW4ob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCkge1xuICAgIGlmIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIChlcShvYmpWYWx1ZSwgb2JqZWN0UHJvdG9ba2V5XSkgJiYgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkge1xuICAgICAgcmV0dXJuIHNyY1ZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqVmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICAgKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgYXJyYXlgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gICAqL1xuICBmdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHLFxuICAgICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aDtcblxuICAgIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNQYXJ0aWFsICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIHJlc3VsdCA9IHRydWUsXG4gICAgICAgIHNlZW4gPSAoYml0bWFzayAmIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcpID8gW10gOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gICAgd2hpbGUgKCsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgICAgdmFyIGNvbXBhcmVkO1xuICAgICAgaWYgKGNvbXBhcmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGNvbXBhcmVkKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgIGlmIChzZWVuKSB7XG4gICAgICAgIGlmICghYmFzZVNvbWUob3RoZXIsIGZ1bmN0aW9uKG90aFZhbHVlLCBvdGhJbmRleCkge1xuICAgICAgICAgICAgICBpZiAoIWluZGV4T2Yoc2Vlbiwgb3RoSW5kZXgpICYmXG4gICAgICAgICAgICAgICAgICAoYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2Vlbi5wdXNoKG90aEluZGV4KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghKFxuICAgICAgICAgICAgYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8XG4gICAgICAgICAgICAgIGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKVxuICAgICAgICAgICkpIHtcbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAgICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAgICpcbiAgICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICAgKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhY2sgVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAgICovXG4gIGZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gICAgc3dpdGNoICh0YWcpIHtcblxuICAgICAgY2FzZSBib29sVGFnOlxuICAgICAgY2FzZSBkYXRlVGFnOlxuICAgICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAgIC8vIENvZXJjZSBib29sZWFucyB0byBgMWAgb3IgYDBgIGFuZCBkYXRlcyB0byBtaWxsaXNlY29uZHMuXG4gICAgICAgIC8vIEludmFsaWQgZGF0ZXMgYXJlIGNvZXJjZWQgdG8gYE5hTmAuXG4gICAgICAgIHJldHVybiBlcSgrb2JqZWN0LCArb3RoZXIpO1xuXG4gICAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzLCBwcmltaXRpdmVzIGFuZCBvYmplY3RzLFxuICAgICAgICAvLyBhcyBlcXVhbC4gU2VlIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1yZWdleHAucHJvdG90eXBlLnRvc3RyaW5nXG4gICAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuXG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICAgKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICAgKi9cbiAgZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHLFxuICAgICAgICBvYmpQcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgICBvdGhQcm9wcyA9IGtleXMob3RoZXIpLFxuICAgICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICAgIGlmICghKGlzUGFydGlhbCA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IHRydWU7XG5cbiAgICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gICAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICAgIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgICAgdmFyIGNvbXBhcmVkO1xuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICBpZiAoIShjb21wYXJlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IChvYmpWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spKVxuICAgICAgICAgICAgOiBjb21wYXJlZFxuICAgICAgICAgICkpIHtcbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgc2tpcEN0b3IgfHwgKHNraXBDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICAgIH1cbiAgICBpZiAocmVzdWx0ICYmICFza2lwQ3Rvcikge1xuICAgICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgICAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZVJlc3RgIHdoaWNoIGZsYXR0ZW5zIHRoZSByZXN0IGFycmF5LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGZsYXRSZXN0KGZ1bmMpIHtcbiAgICByZXR1cm4gc2V0VG9TdHJpbmcob3ZlclJlc3QoZnVuYywgdW5kZWZpbmVkLCBmbGF0dGVuKSwgZnVuYyArICcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGZsYXR0ZW5hYmxlIGBhcmd1bWVudHNgIG9iamVjdCBvciBhcnJheS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZsYXR0ZW5hYmxlLCBlbHNlIGBmYWxzZWAuXG4gICAqL1xuICBmdW5jdGlvbiBpc0ZsYXR0ZW5hYmxlKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2VcbiAgICogW2BPYmplY3Qua2V5c2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICAgKiBleGNlcHQgdGhhdCBpdCBpbmNsdWRlcyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gICAqL1xuICBmdW5jdGlvbiBuYXRpdmVLZXlzSW4ob2JqZWN0KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGlmIChvYmplY3QgIT0gbnVsbCkge1xuICAgICAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gICAqL1xuICBmdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VSZXN0YCB3aGljaCB0cmFuc2Zvcm1zIHRoZSByZXN0IGFycmF5LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgcmVzdCBhcnJheSB0cmFuc2Zvcm0uXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gb3ZlclJlc3QoZnVuYywgc3RhcnQsIHRyYW5zZm9ybSkge1xuICAgIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgICBhcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgICB9XG4gICAgICBpbmRleCA9IC0xO1xuICAgICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIG90aGVyQXJnc1tzdGFydF0gPSB0cmFuc2Zvcm0oYXJyYXkpO1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgb3RoZXJBcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGB0b1N0cmluZ2AgbWV0aG9kIG9mIGBmdW5jYCB0byByZXR1cm4gYHN0cmluZ2AuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBmdW5jYC5cbiAgICovXG4gIHZhciBzZXRUb1N0cmluZyA9IGlkZW50aXR5O1xuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhcnJheSB3aXRoIGFsbCBmYWxzZXkgdmFsdWVzIHJlbW92ZWQuIFRoZSB2YWx1ZXMgYGZhbHNlYCwgYG51bGxgLFxuICAgKiBgMGAsIGBcIlwiYCwgYHVuZGVmaW5lZGAsIGFuZCBgTmFOYCBhcmUgZmFsc2V5LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAY2F0ZWdvcnkgQXJyYXlcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhY3QuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGZpbHRlcmVkIHZhbHVlcy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5jb21wYWN0KFswLCAxLCBmYWxzZSwgMiwgJycsIDNdKTtcbiAgICogLy8gPT4gWzEsIDIsIDNdXG4gICAqL1xuICBmdW5jdGlvbiBjb21wYWN0KGFycmF5KSB7XG4gICAgcmV0dXJuIGJhc2VGaWx0ZXIoYXJyYXksIEJvb2xlYW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYXJyYXkgY29uY2F0ZW5hdGluZyBgYXJyYXlgIHdpdGggYW55IGFkZGl0aW9uYWwgYXJyYXlzXG4gICAqIGFuZC9vciB2YWx1ZXMuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDQuMC4wXG4gICAqIEBjYXRlZ29yeSBBcnJheVxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29uY2F0ZW5hdGUuXG4gICAqIEBwYXJhbSB7Li4uKn0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjb25jYXRlbmF0ZS5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgY29uY2F0ZW5hdGVkIGFycmF5LlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgYXJyYXkgPSBbMV07XG4gICAqIHZhciBvdGhlciA9IF8uY29uY2F0KGFycmF5LCAyLCBbM10sIFtbNF1dKTtcbiAgICpcbiAgICogY29uc29sZS5sb2cob3RoZXIpO1xuICAgKiAvLyA9PiBbMSwgMiwgMywgWzRdXVxuICAgKlxuICAgKiBjb25zb2xlLmxvZyhhcnJheSk7XG4gICAqIC8vID0+IFsxXVxuICAgKi9cbiAgZnVuY3Rpb24gY29uY2F0KCkge1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHZhciBhcmdzID0gQXJyYXkobGVuZ3RoIC0gMSksXG4gICAgICAgIGFycmF5ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICBpbmRleCA9IGxlbmd0aDtcblxuICAgIHdoaWxlIChpbmRleC0tKSB7XG4gICAgICBhcmdzW2luZGV4IC0gMV0gPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXlQdXNoKGlzQXJyYXkoYXJyYXkpID8gY29weUFycmF5KGFycmF5KSA6IFthcnJheV0sIGJhc2VGbGF0dGVuKGFyZ3MsIDEpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmZpbmRgIGV4Y2VwdCB0aGF0IGl0IHJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdFxuICAgKiBlbGVtZW50IGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvciBpbnN0ZWFkIG9mIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMS4xLjBcbiAgICogQGNhdGVnb3J5IEFycmF5XG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbZnJvbUluZGV4PTBdIFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZvdW5kIGVsZW1lbnQsIGVsc2UgYC0xYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIHVzZXJzID0gW1xuICAgKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgICdhY3RpdmUnOiBmYWxzZSB9LFxuICAgKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgICdhY3RpdmUnOiBmYWxzZSB9LFxuICAgKiAgIHsgJ3VzZXInOiAncGViYmxlcycsICdhY3RpdmUnOiB0cnVlIH1cbiAgICogXTtcbiAgICpcbiAgICogXy5maW5kSW5kZXgodXNlcnMsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8udXNlciA9PSAnYmFybmV5JzsgfSk7XG4gICAqIC8vID0+IDBcbiAgICpcbiAgICogLy8gVGhlIGBfLm1hdGNoZXNgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAgICogXy5maW5kSW5kZXgodXNlcnMsIHsgJ3VzZXInOiAnZnJlZCcsICdhY3RpdmUnOiBmYWxzZSB9KTtcbiAgICogLy8gPT4gMVxuICAgKlxuICAgKiAvLyBUaGUgYF8ubWF0Y2hlc1Byb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gICAqIF8uZmluZEluZGV4KHVzZXJzLCBbJ2FjdGl2ZScsIGZhbHNlXSk7XG4gICAqIC8vID0+IDBcbiAgICpcbiAgICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gICAqIF8uZmluZEluZGV4KHVzZXJzLCAnYWN0aXZlJyk7XG4gICAqIC8vID0+IDJcbiAgICovXG4gIGZ1bmN0aW9uIGZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgdmFyIGluZGV4ID0gZnJvbUluZGV4ID09IG51bGwgPyAwIDogdG9JbnRlZ2VyKGZyb21JbmRleCk7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgaW5kZXggPSBuYXRpdmVNYXgobGVuZ3RoICsgaW5kZXgsIDApO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZUZpbmRJbmRleChhcnJheSwgYmFzZUl0ZXJhdGVlKHByZWRpY2F0ZSwgMyksIGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGbGF0dGVucyBgYXJyYXlgIGEgc2luZ2xlIGxldmVsIGRlZXAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBjYXRlZ29yeSBBcnJheVxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gZmxhdHRlbi5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmxhdHRlbmVkIGFycmF5LlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmZsYXR0ZW4oWzEsIFsyLCBbMywgWzRdXSwgNV1dKTtcbiAgICogLy8gPT4gWzEsIDIsIFszLCBbNF1dLCA1XVxuICAgKi9cbiAgZnVuY3Rpb24gZmxhdHRlbihhcnJheSkge1xuICAgIHZhciBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcbiAgICByZXR1cm4gbGVuZ3RoID8gYmFzZUZsYXR0ZW4oYXJyYXksIDEpIDogW107XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgZmxhdHRlbnMgYGFycmF5YC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMy4wLjBcbiAgICogQGNhdGVnb3J5IEFycmF5XG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uZmxhdHRlbkRlZXAoWzEsIFsyLCBbMywgWzRdXSwgNV1dKTtcbiAgICogLy8gPT4gWzEsIDIsIDMsIDQsIDVdXG4gICAqL1xuICBmdW5jdGlvbiBmbGF0dGVuRGVlcChhcnJheSkge1xuICAgIHZhciBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcbiAgICByZXR1cm4gbGVuZ3RoID8gYmFzZUZsYXR0ZW4oYXJyYXksIElORklOSVRZKSA6IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQGFsaWFzIGZpcnN0XG4gICAqIEBjYXRlZ29yeSBBcnJheVxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IG9mIGBhcnJheWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaGVhZChbMSwgMiwgM10pO1xuICAgKiAvLyA9PiAxXG4gICAqXG4gICAqIF8uaGVhZChbXSk7XG4gICAqIC8vID0+IHVuZGVmaW5lZFxuICAgKi9cbiAgZnVuY3Rpb24gaGVhZChhcnJheSkge1xuICAgIHJldHVybiAoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKSA/IGFycmF5WzBdIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGB2YWx1ZWAgaXMgZm91bmQgaW4gYGFycmF5YFxuICAgKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICAgKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuIElmIGBmcm9tSW5kZXhgIGlzIG5lZ2F0aXZlLCBpdCdzIHVzZWQgYXMgdGhlXG4gICAqIG9mZnNldCBmcm9tIHRoZSBlbmQgb2YgYGFycmF5YC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQGNhdGVnb3J5IEFycmF5XG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2Zyb21JbmRleD0wXSBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaW5kZXhPZihbMSwgMiwgMSwgMl0sIDIpO1xuICAgKiAvLyA9PiAxXG4gICAqXG4gICAqIC8vIFNlYXJjaCBmcm9tIHRoZSBgZnJvbUluZGV4YC5cbiAgICogXy5pbmRleE9mKFsxLCAyLCAxLCAyXSwgMiwgMik7XG4gICAqIC8vID0+IDNcbiAgICovXG4gIGZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gICAgaWYgKHR5cGVvZiBmcm9tSW5kZXggPT0gJ251bWJlcicpIHtcbiAgICAgIGZyb21JbmRleCA9IGZyb21JbmRleCA8IDAgPyBuYXRpdmVNYXgobGVuZ3RoICsgZnJvbUluZGV4LCAwKSA6IGZyb21JbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgZnJvbUluZGV4ID0gMDtcbiAgICB9XG4gICAgdmFyIGluZGV4ID0gKGZyb21JbmRleCB8fCAwKSAtIDEsXG4gICAgICAgIGlzUmVmbGV4aXZlID0gdmFsdWUgPT09IHZhbHVlO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBvdGhlciA9IGFycmF5W2luZGV4XTtcbiAgICAgIGlmICgoaXNSZWZsZXhpdmUgPyBvdGhlciA9PT0gdmFsdWUgOiBvdGhlciAhPT0gb3RoZXIpKSB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGxhc3QgZWxlbWVudCBvZiBgYXJyYXlgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAY2F0ZWdvcnkgQXJyYXlcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHF1ZXJ5LlxuICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IG9mIGBhcnJheWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8ubGFzdChbMSwgMiwgM10pO1xuICAgKiAvLyA9PiAzXG4gICAqL1xuICBmdW5jdGlvbiBsYXN0KGFycmF5KSB7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuICAgIHJldHVybiBsZW5ndGggPyBhcnJheVtsZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgc2xpY2Ugb2YgYGFycmF5YCBmcm9tIGBzdGFydGAgdXAgdG8sIGJ1dCBub3QgaW5jbHVkaW5nLCBgZW5kYC5cbiAgICpcbiAgICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIHVzZWQgaW5zdGVhZCBvZlxuICAgKiBbYEFycmF5I3NsaWNlYF0oaHR0cHM6Ly9tZG4uaW8vQXJyYXkvc2xpY2UpIHRvIGVuc3VyZSBkZW5zZSBhcnJheXMgYXJlXG4gICAqIHJldHVybmVkLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAzLjAuMFxuICAgKiBAY2F0ZWdvcnkgQXJyYXlcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNsaWNlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtlbmQ9YXJyYXkubGVuZ3RoXSBUaGUgZW5kIHBvc2l0aW9uLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHNsaWNlIG9mIGBhcnJheWAuXG4gICAqL1xuICBmdW5jdGlvbiBzbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICAgIHZhciBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcbiAgICBzdGFydCA9IHN0YXJ0ID09IG51bGwgPyAwIDogK3N0YXJ0O1xuICAgIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogK2VuZDtcbiAgICByZXR1cm4gbGVuZ3RoID8gYmFzZVNsaWNlKGFycmF5LCBzdGFydCwgZW5kKSA6IFtdO1xuICB9XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgYGxvZGFzaGAgd3JhcHBlciBpbnN0YW5jZSB0aGF0IHdyYXBzIGB2YWx1ZWAgd2l0aCBleHBsaWNpdCBtZXRob2RcbiAgICogY2hhaW4gc2VxdWVuY2VzIGVuYWJsZWQuIFRoZSByZXN1bHQgb2Ygc3VjaCBzZXF1ZW5jZXMgbXVzdCBiZSB1bndyYXBwZWRcbiAgICogd2l0aCBgXyN2YWx1ZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDEuMy4wXG4gICAqIEBjYXRlZ29yeSBTZXFcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gd3JhcC5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IGBsb2Rhc2hgIHdyYXBwZXIgaW5zdGFuY2UuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciB1c2VycyA9IFtcbiAgICogICB7ICd1c2VyJzogJ2Jhcm5leScsICAnYWdlJzogMzYgfSxcbiAgICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICAnYWdlJzogNDAgfSxcbiAgICogICB7ICd1c2VyJzogJ3BlYmJsZXMnLCAnYWdlJzogMSB9XG4gICAqIF07XG4gICAqXG4gICAqIHZhciB5b3VuZ2VzdCA9IF9cbiAgICogICAuY2hhaW4odXNlcnMpXG4gICAqICAgLnNvcnRCeSgnYWdlJylcbiAgICogICAubWFwKGZ1bmN0aW9uKG8pIHtcbiAgICogICAgIHJldHVybiBvLnVzZXIgKyAnIGlzICcgKyBvLmFnZTtcbiAgICogICB9KVxuICAgKiAgIC5oZWFkKClcbiAgICogICAudmFsdWUoKTtcbiAgICogLy8gPT4gJ3BlYmJsZXMgaXMgMSdcbiAgICovXG4gIGZ1bmN0aW9uIGNoYWluKHZhbHVlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGxvZGFzaCh2YWx1ZSk7XG4gICAgcmVzdWx0Ll9fY2hhaW5fXyA9IHRydWU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpbnZva2VzIGBpbnRlcmNlcHRvcmAgYW5kIHJldHVybnMgYHZhbHVlYC4gVGhlIGludGVyY2VwdG9yXG4gICAqIGlzIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ7ICh2YWx1ZSkuIFRoZSBwdXJwb3NlIG9mIHRoaXMgbWV0aG9kIGlzIHRvXG4gICAqIFwidGFwIGludG9cIiBhIG1ldGhvZCBjaGFpbiBzZXF1ZW5jZSBpbiBvcmRlciB0byBtb2RpZnkgaW50ZXJtZWRpYXRlIHJlc3VsdHMuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBjYXRlZ29yeSBTZXFcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvdmlkZSB0byBgaW50ZXJjZXB0b3JgLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpbnRlcmNlcHRvciBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfKFsxLCAyLCAzXSlcbiAgICogIC50YXAoZnVuY3Rpb24oYXJyYXkpIHtcbiAgICogICAgLy8gTXV0YXRlIGlucHV0IGFycmF5LlxuICAgKiAgICBhcnJheS5wb3AoKTtcbiAgICogIH0pXG4gICAqICAucmV2ZXJzZSgpXG4gICAqICAudmFsdWUoKTtcbiAgICogLy8gPT4gWzIsIDFdXG4gICAqL1xuICBmdW5jdGlvbiB0YXAodmFsdWUsIGludGVyY2VwdG9yKSB7XG4gICAgaW50ZXJjZXB0b3IodmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLnRhcGAgZXhjZXB0IHRoYXQgaXQgcmV0dXJucyB0aGUgcmVzdWx0IG9mIGBpbnRlcmNlcHRvcmAuXG4gICAqIFRoZSBwdXJwb3NlIG9mIHRoaXMgbWV0aG9kIGlzIHRvIFwicGFzcyB0aHJ1XCIgdmFsdWVzIHJlcGxhY2luZyBpbnRlcm1lZGlhdGVcbiAgICogcmVzdWx0cyBpbiBhIG1ldGhvZCBjaGFpbiBzZXF1ZW5jZS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMy4wLjBcbiAgICogQGNhdGVnb3J5IFNlcVxuICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm92aWRlIHRvIGBpbnRlcmNlcHRvcmAuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGludGVyY2VwdG9yIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGludGVyY2VwdG9yYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXygnICBhYmMgICcpXG4gICAqICAuY2hhaW4oKVxuICAgKiAgLnRyaW0oKVxuICAgKiAgLnRocnUoZnVuY3Rpb24odmFsdWUpIHtcbiAgICogICAgcmV0dXJuIFt2YWx1ZV07XG4gICAqICB9KVxuICAgKiAgLnZhbHVlKCk7XG4gICAqIC8vID0+IFsnYWJjJ11cbiAgICovXG4gIGZ1bmN0aW9uIHRocnUodmFsdWUsIGludGVyY2VwdG9yKSB7XG4gICAgcmV0dXJuIGludGVyY2VwdG9yKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgYGxvZGFzaGAgd3JhcHBlciBpbnN0YW5jZSB3aXRoIGV4cGxpY2l0IG1ldGhvZCBjaGFpbiBzZXF1ZW5jZXMgZW5hYmxlZC5cbiAgICpcbiAgICogQG5hbWUgY2hhaW5cbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBjYXRlZ29yeSBTZXFcbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IGBsb2Rhc2hgIHdyYXBwZXIgaW5zdGFuY2UuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciB1c2VycyA9IFtcbiAgICogICB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9LFxuICAgKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgJ2FnZSc6IDQwIH1cbiAgICogXTtcbiAgICpcbiAgICogLy8gQSBzZXF1ZW5jZSB3aXRob3V0IGV4cGxpY2l0IGNoYWluaW5nLlxuICAgKiBfKHVzZXJzKS5oZWFkKCk7XG4gICAqIC8vID0+IHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2IH1cbiAgICpcbiAgICogLy8gQSBzZXF1ZW5jZSB3aXRoIGV4cGxpY2l0IGNoYWluaW5nLlxuICAgKiBfKHVzZXJzKVxuICAgKiAgIC5jaGFpbigpXG4gICAqICAgLmhlYWQoKVxuICAgKiAgIC5waWNrKCd1c2VyJylcbiAgICogICAudmFsdWUoKTtcbiAgICogLy8gPT4geyAndXNlcic6ICdiYXJuZXknIH1cbiAgICovXG4gIGZ1bmN0aW9uIHdyYXBwZXJDaGFpbigpIHtcbiAgICByZXR1cm4gY2hhaW4odGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgdGhlIGNoYWluIHNlcXVlbmNlIHRvIHJlc29sdmUgdGhlIHVud3JhcHBlZCB2YWx1ZS5cbiAgICpcbiAgICogQG5hbWUgdmFsdWVcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBhbGlhcyB0b0pTT04sIHZhbHVlT2ZcbiAgICogQGNhdGVnb3J5IFNlcVxuICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdW53cmFwcGVkIHZhbHVlLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfKFsxLCAyLCAzXSkudmFsdWUoKTtcbiAgICogLy8gPT4gWzEsIDIsIDNdXG4gICAqL1xuICBmdW5jdGlvbiB3cmFwcGVyVmFsdWUoKSB7XG4gICAgcmV0dXJuIGJhc2VXcmFwcGVyVmFsdWUodGhpcy5fX3dyYXBwZWRfXywgdGhpcy5fX2FjdGlvbnNfXyk7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IgKiphbGwqKiBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAuXG4gICAqIEl0ZXJhdGlvbiBpcyBzdG9wcGVkIG9uY2UgYHByZWRpY2F0ZWAgcmV0dXJucyBmYWxzZXkuIFRoZSBwcmVkaWNhdGUgaXNcbiAgICogaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICAgKlxuICAgKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgcmV0dXJucyBgdHJ1ZWAgZm9yXG4gICAqIFtlbXB0eSBjb2xsZWN0aW9uc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRW1wdHlfc2V0KSBiZWNhdXNlXG4gICAqIFtldmVyeXRoaW5nIGlzIHRydWVdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1ZhY3VvdXNfdHJ1dGgpIG9mXG4gICAqIGVsZW1lbnRzIG9mIGVtcHR5IGNvbGxlY3Rpb25zLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcmVkaWNhdGU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFsbCBlbGVtZW50cyBwYXNzIHRoZSBwcmVkaWNhdGUgY2hlY2ssXG4gICAqICBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uZXZlcnkoW3RydWUsIDEsIG51bGwsICd5ZXMnXSwgQm9vbGVhbik7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqXG4gICAqIHZhciB1c2VycyA9IFtcbiAgICogICB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IGZhbHNlIH0sXG4gICAqICAgeyAndXNlcic6ICdmcmVkJywgICAnYWdlJzogNDAsICdhY3RpdmUnOiBmYWxzZSB9XG4gICAqIF07XG4gICAqXG4gICAqIC8vIFRoZSBgXy5tYXRjaGVzYCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gICAqIF8uZXZlcnkodXNlcnMsIHsgJ3VzZXInOiAnYmFybmV5JywgJ2FjdGl2ZSc6IGZhbHNlIH0pO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKlxuICAgKiAvLyBUaGUgYF8ubWF0Y2hlc1Byb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gICAqIF8uZXZlcnkodXNlcnMsIFsnYWN0aXZlJywgZmFsc2VdKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiAvLyBUaGUgYF8ucHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAgICogXy5ldmVyeSh1c2VycywgJ2FjdGl2ZScpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgZnVuY3Rpb24gZXZlcnkoY29sbGVjdGlvbiwgcHJlZGljYXRlLCBndWFyZCkge1xuICAgIHByZWRpY2F0ZSA9IGd1YXJkID8gdW5kZWZpbmVkIDogcHJlZGljYXRlO1xuICAgIHJldHVybiBiYXNlRXZlcnkoY29sbGVjdGlvbiwgYmFzZUl0ZXJhdGVlKHByZWRpY2F0ZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gLCByZXR1cm5pbmcgYW4gYXJyYXkgb2YgYWxsIGVsZW1lbnRzXG4gICAqIGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvci4gVGhlIHByZWRpY2F0ZSBpcyBpbnZva2VkIHdpdGggdGhyZWVcbiAgICogYXJndW1lbnRzOiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqICoqTm90ZToqKiBVbmxpa2UgYF8ucmVtb3ZlYCwgdGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBhcnJheS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICAgKiBAc2VlIF8ucmVqZWN0XG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciB1c2VycyA9IFtcbiAgICogICB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IHRydWUgfSxcbiAgICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IGZhbHNlIH1cbiAgICogXTtcbiAgICpcbiAgICogXy5maWx0ZXIodXNlcnMsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuICFvLmFjdGl2ZTsgfSk7XG4gICAqIC8vID0+IG9iamVjdHMgZm9yIFsnZnJlZCddXG4gICAqXG4gICAqIC8vIFRoZSBgXy5tYXRjaGVzYCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gICAqIF8uZmlsdGVyKHVzZXJzLCB7ICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IHRydWUgfSk7XG4gICAqIC8vID0+IG9iamVjdHMgZm9yIFsnYmFybmV5J11cbiAgICpcbiAgICogLy8gVGhlIGBfLm1hdGNoZXNQcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICAgKiBfLmZpbHRlcih1c2VycywgWydhY3RpdmUnLCBmYWxzZV0pO1xuICAgKiAvLyA9PiBvYmplY3RzIGZvciBbJ2ZyZWQnXVxuICAgKlxuICAgKiAvLyBUaGUgYF8ucHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAgICogXy5maWx0ZXIodXNlcnMsICdhY3RpdmUnKTtcbiAgICogLy8gPT4gb2JqZWN0cyBmb3IgWydiYXJuZXknXVxuICAgKi9cbiAgZnVuY3Rpb24gZmlsdGVyKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSkge1xuICAgIHJldHVybiBiYXNlRmlsdGVyKGNvbGxlY3Rpb24sIGJhc2VJdGVyYXRlZShwcmVkaWNhdGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYCwgcmV0dXJuaW5nIHRoZSBmaXJzdCBlbGVtZW50XG4gICAqIGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvci4gVGhlIHByZWRpY2F0ZSBpcyBpbnZva2VkIHdpdGggdGhyZWVcbiAgICogYXJndW1lbnRzOiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcmVkaWNhdGU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtmcm9tSW5kZXg9MF0gVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWF0Y2hlZCBlbGVtZW50LCBlbHNlIGB1bmRlZmluZWRgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgdXNlcnMgPSBbXG4gICAqICAgeyAndXNlcic6ICdiYXJuZXknLCAgJ2FnZSc6IDM2LCAnYWN0aXZlJzogdHJ1ZSB9LFxuICAgKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IGZhbHNlIH0sXG4gICAqICAgeyAndXNlcic6ICdwZWJibGVzJywgJ2FnZSc6IDEsICAnYWN0aXZlJzogdHJ1ZSB9XG4gICAqIF07XG4gICAqXG4gICAqIF8uZmluZCh1c2VycywgZnVuY3Rpb24obykgeyByZXR1cm4gby5hZ2UgPCA0MDsgfSk7XG4gICAqIC8vID0+IG9iamVjdCBmb3IgJ2Jhcm5leSdcbiAgICpcbiAgICogLy8gVGhlIGBfLm1hdGNoZXNgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAgICogXy5maW5kKHVzZXJzLCB7ICdhZ2UnOiAxLCAnYWN0aXZlJzogdHJ1ZSB9KTtcbiAgICogLy8gPT4gb2JqZWN0IGZvciAncGViYmxlcydcbiAgICpcbiAgICogLy8gVGhlIGBfLm1hdGNoZXNQcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICAgKiBfLmZpbmQodXNlcnMsIFsnYWN0aXZlJywgZmFsc2VdKTtcbiAgICogLy8gPT4gb2JqZWN0IGZvciAnZnJlZCdcbiAgICpcbiAgICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gICAqIF8uZmluZCh1c2VycywgJ2FjdGl2ZScpO1xuICAgKiAvLyA9PiBvYmplY3QgZm9yICdiYXJuZXknXG4gICAqL1xuICB2YXIgZmluZCA9IGNyZWF0ZUZpbmQoZmluZEluZGV4KTtcblxuICAvKipcbiAgICogSXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBlbGVtZW50LlxuICAgKiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICAgKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gICAqXG4gICAqICoqTm90ZToqKiBBcyB3aXRoIG90aGVyIFwiQ29sbGVjdGlvbnNcIiBtZXRob2RzLCBvYmplY3RzIHdpdGggYSBcImxlbmd0aFwiXG4gICAqIHByb3BlcnR5IGFyZSBpdGVyYXRlZCBsaWtlIGFycmF5cy4gVG8gYXZvaWQgdGhpcyBiZWhhdmlvciB1c2UgYF8uZm9ySW5gXG4gICAqIG9yIGBfLmZvck93bmAgZm9yIG9iamVjdCBpdGVyYXRpb24uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBhbGlhcyBlYWNoXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICAgKiBAc2VlIF8uZm9yRWFjaFJpZ2h0XG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uZm9yRWFjaChbMSwgMl0sIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAqICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgKiB9KTtcbiAgICogLy8gPT4gTG9ncyBgMWAgdGhlbiBgMmAuXG4gICAqXG4gICAqIF8uZm9yRWFjaCh7ICdhJzogMSwgJ2InOiAyIH0sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICogICBjb25zb2xlLmxvZyhrZXkpO1xuICAgKiB9KTtcbiAgICogLy8gPT4gTG9ncyAnYScgdGhlbiAnYicgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZCkuXG4gICAqL1xuICBmdW5jdGlvbiBmb3JFYWNoKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gICAgcmV0dXJuIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGJhc2VJdGVyYXRlZShpdGVyYXRlZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdmFsdWVzIGJ5IHJ1bm5pbmcgZWFjaCBlbGVtZW50IGluIGBjb2xsZWN0aW9uYCB0aHJ1XG4gICAqIGBpdGVyYXRlZWAuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOlxuICAgKiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqIE1hbnkgbG9kYXNoIG1ldGhvZHMgYXJlIGd1YXJkZWQgdG8gd29yayBhcyBpdGVyYXRlZXMgZm9yIG1ldGhvZHMgbGlrZVxuICAgKiBgXy5ldmVyeWAsIGBfLmZpbHRlcmAsIGBfLm1hcGAsIGBfLm1hcFZhbHVlc2AsIGBfLnJlamVjdGAsIGFuZCBgXy5zb21lYC5cbiAgICpcbiAgICogVGhlIGd1YXJkZWQgbWV0aG9kcyBhcmU6XG4gICAqIGBhcnlgLCBgY2h1bmtgLCBgY3VycnlgLCBgY3VycnlSaWdodGAsIGBkcm9wYCwgYGRyb3BSaWdodGAsIGBldmVyeWAsXG4gICAqIGBmaWxsYCwgYGludmVydGAsIGBwYXJzZUludGAsIGByYW5kb21gLCBgcmFuZ2VgLCBgcmFuZ2VSaWdodGAsIGByZXBlYXRgLFxuICAgKiBgc2FtcGxlU2l6ZWAsIGBzbGljZWAsIGBzb21lYCwgYHNvcnRCeWAsIGBzcGxpdGAsIGB0YWtlYCwgYHRha2VSaWdodGAsXG4gICAqIGB0ZW1wbGF0ZWAsIGB0cmltYCwgYHRyaW1FbmRgLCBgdHJpbVN0YXJ0YCwgYW5kIGB3b3Jkc2BcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBmdW5jdGlvbiBzcXVhcmUobikge1xuICAgKiAgIHJldHVybiBuICogbjtcbiAgICogfVxuICAgKlxuICAgKiBfLm1hcChbNCwgOF0sIHNxdWFyZSk7XG4gICAqIC8vID0+IFsxNiwgNjRdXG4gICAqXG4gICAqIF8ubWFwKHsgJ2EnOiA0LCAnYic6IDggfSwgc3F1YXJlKTtcbiAgICogLy8gPT4gWzE2LCA2NF0gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAgICpcbiAgICogdmFyIHVzZXJzID0gW1xuICAgKiAgIHsgJ3VzZXInOiAnYmFybmV5JyB9LFxuICAgKiAgIHsgJ3VzZXInOiAnZnJlZCcgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyBUaGUgYF8ucHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAgICogXy5tYXAodXNlcnMsICd1c2VyJyk7XG4gICAqIC8vID0+IFsnYmFybmV5JywgJ2ZyZWQnXVxuICAgKi9cbiAgZnVuY3Rpb24gbWFwKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gICAgcmV0dXJuIGJhc2VNYXAoY29sbGVjdGlvbiwgYmFzZUl0ZXJhdGVlKGl0ZXJhdGVlKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVkdWNlcyBgY29sbGVjdGlvbmAgdG8gYSB2YWx1ZSB3aGljaCBpcyB0aGUgYWNjdW11bGF0ZWQgcmVzdWx0IG9mIHJ1bm5pbmdcbiAgICogZWFjaCBlbGVtZW50IGluIGBjb2xsZWN0aW9uYCB0aHJ1IGBpdGVyYXRlZWAsIHdoZXJlIGVhY2ggc3VjY2Vzc2l2ZVxuICAgKiBpbnZvY2F0aW9uIGlzIHN1cHBsaWVkIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIHByZXZpb3VzLiBJZiBgYWNjdW11bGF0b3JgXG4gICAqIGlzIG5vdCBnaXZlbiwgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYGNvbGxlY3Rpb25gIGlzIHVzZWQgYXMgdGhlIGluaXRpYWxcbiAgICogdmFsdWUuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggZm91ciBhcmd1bWVudHM6XG4gICAqIChhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqIE1hbnkgbG9kYXNoIG1ldGhvZHMgYXJlIGd1YXJkZWQgdG8gd29yayBhcyBpdGVyYXRlZXMgZm9yIG1ldGhvZHMgbGlrZVxuICAgKiBgXy5yZWR1Y2VgLCBgXy5yZWR1Y2VSaWdodGAsIGFuZCBgXy50cmFuc2Zvcm1gLlxuICAgKlxuICAgKiBUaGUgZ3VhcmRlZCBtZXRob2RzIGFyZTpcbiAgICogYGFzc2lnbmAsIGBkZWZhdWx0c2AsIGBkZWZhdWx0c0RlZXBgLCBgaW5jbHVkZXNgLCBgbWVyZ2VgLCBgb3JkZXJCeWAsXG4gICAqIGFuZCBgc29ydEJ5YFxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcGFyYW0geyp9IFthY2N1bXVsYXRvcl0gVGhlIGluaXRpYWwgdmFsdWUuXG4gICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAgICogQHNlZSBfLnJlZHVjZVJpZ2h0XG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8ucmVkdWNlKFsxLCAyXSwgZnVuY3Rpb24oc3VtLCBuKSB7XG4gICAqICAgcmV0dXJuIHN1bSArIG47XG4gICAqIH0sIDApO1xuICAgKiAvLyA9PiAzXG4gICAqXG4gICAqIF8ucmVkdWNlKHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMSB9LCBmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICogICAocmVzdWx0W3ZhbHVlXSB8fCAocmVzdWx0W3ZhbHVlXSA9IFtdKSkucHVzaChrZXkpO1xuICAgKiAgIHJldHVybiByZXN1bHQ7XG4gICAqIH0sIHt9KTtcbiAgICogLy8gPT4geyAnMSc6IFsnYScsICdjJ10sICcyJzogWydiJ10gfSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICAgKi9cbiAgZnVuY3Rpb24gcmVkdWNlKGNvbGxlY3Rpb24sIGl0ZXJhdGVlLCBhY2N1bXVsYXRvcikge1xuICAgIHJldHVybiBiYXNlUmVkdWNlKGNvbGxlY3Rpb24sIGJhc2VJdGVyYXRlZShpdGVyYXRlZSksIGFjY3VtdWxhdG9yLCBhcmd1bWVudHMubGVuZ3RoIDwgMywgYmFzZUVhY2gpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNpemUgb2YgYGNvbGxlY3Rpb25gIGJ5IHJldHVybmluZyBpdHMgbGVuZ3RoIGZvciBhcnJheS1saWtlXG4gICAqIHZhbHVlcyBvciB0aGUgbnVtYmVyIG9mIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIGZvciBvYmplY3RzLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaW5zcGVjdC5cbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29sbGVjdGlvbiBzaXplLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnNpemUoWzEsIDIsIDNdKTtcbiAgICogLy8gPT4gM1xuICAgKlxuICAgKiBfLnNpemUoeyAnYSc6IDEsICdiJzogMiB9KTtcbiAgICogLy8gPT4gMlxuICAgKlxuICAgKiBfLnNpemUoJ3BlYmJsZXMnKTtcbiAgICogLy8gPT4gN1xuICAgKi9cbiAgZnVuY3Rpb24gc2l6ZShjb2xsZWN0aW9uKSB7XG4gICAgaWYgKGNvbGxlY3Rpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGNvbGxlY3Rpb24gPSBpc0FycmF5TGlrZShjb2xsZWN0aW9uKSA/IGNvbGxlY3Rpb24gOiBuYXRpdmVLZXlzKGNvbGxlY3Rpb24pO1xuICAgIHJldHVybiBjb2xsZWN0aW9uLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHByZWRpY2F0ZWAgcmV0dXJucyB0cnV0aHkgZm9yICoqYW55KiogZWxlbWVudCBvZiBgY29sbGVjdGlvbmAuXG4gICAqIEl0ZXJhdGlvbiBpcyBzdG9wcGVkIG9uY2UgYHByZWRpY2F0ZWAgcmV0dXJucyB0cnV0aHkuIFRoZSBwcmVkaWNhdGUgaXNcbiAgICogaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcmVkaWNhdGU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICAgKiAgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnNvbWUoW251bGwsIDAsICd5ZXMnLCBmYWxzZV0sIEJvb2xlYW4pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIHZhciB1c2VycyA9IFtcbiAgICogICB7ICd1c2VyJzogJ2Jhcm5leScsICdhY3RpdmUnOiB0cnVlIH0sXG4gICAqICAgeyAndXNlcic6ICdmcmVkJywgICAnYWN0aXZlJzogZmFsc2UgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyBUaGUgYF8ubWF0Y2hlc2AgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICAgKiBfLnNvbWUodXNlcnMsIHsgJ3VzZXInOiAnYmFybmV5JywgJ2FjdGl2ZSc6IGZhbHNlIH0pO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKlxuICAgKiAvLyBUaGUgYF8ubWF0Y2hlc1Byb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gICAqIF8uc29tZSh1c2VycywgWydhY3RpdmUnLCBmYWxzZV0pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICAgKiBfLnNvbWUodXNlcnMsICdhY3RpdmUnKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKi9cbiAgZnVuY3Rpb24gc29tZShjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIGd1YXJkKSB7XG4gICAgcHJlZGljYXRlID0gZ3VhcmQgPyB1bmRlZmluZWQgOiBwcmVkaWNhdGU7XG4gICAgcmV0dXJuIGJhc2VTb21lKGNvbGxlY3Rpb24sIGJhc2VJdGVyYXRlZShwcmVkaWNhdGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIGVsZW1lbnRzLCBzb3J0ZWQgaW4gYXNjZW5kaW5nIG9yZGVyIGJ5IHRoZSByZXN1bHRzIG9mXG4gICAqIHJ1bm5pbmcgZWFjaCBlbGVtZW50IGluIGEgY29sbGVjdGlvbiB0aHJ1IGVhY2ggaXRlcmF0ZWUuIFRoaXMgbWV0aG9kXG4gICAqIHBlcmZvcm1zIGEgc3RhYmxlIHNvcnQsIHRoYXQgaXMsIGl0IHByZXNlcnZlcyB0aGUgb3JpZ2luYWwgc29ydCBvcmRlciBvZlxuICAgKiBlcXVhbCBlbGVtZW50cy4gVGhlIGl0ZXJhdGVlcyBhcmUgaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogKHZhbHVlKS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0gey4uLihGdW5jdGlvbnxGdW5jdGlvbltdKX0gW2l0ZXJhdGVlcz1bXy5pZGVudGl0eV1dXG4gICAqICBUaGUgaXRlcmF0ZWVzIHRvIHNvcnQgYnkuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IHNvcnRlZCBhcnJheS5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIHVzZXJzID0gW1xuICAgKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgJ2FnZSc6IDQ4IH0sXG4gICAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfSxcbiAgICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICdhZ2UnOiA0MCB9LFxuICAgKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM0IH1cbiAgICogXTtcbiAgICpcbiAgICogXy5zb3J0QnkodXNlcnMsIFtmdW5jdGlvbihvKSB7IHJldHVybiBvLnVzZXI7IH1dKTtcbiAgICogLy8gPT4gb2JqZWN0cyBmb3IgW1snYmFybmV5JywgMzZdLCBbJ2Jhcm5leScsIDM0XSwgWydmcmVkJywgNDhdLCBbJ2ZyZWQnLCA0MF1dXG4gICAqXG4gICAqIF8uc29ydEJ5KHVzZXJzLCBbJ3VzZXInLCAnYWdlJ10pO1xuICAgKiAvLyA9PiBvYmplY3RzIGZvciBbWydiYXJuZXknLCAzNF0sIFsnYmFybmV5JywgMzZdLCBbJ2ZyZWQnLCA0MF0sIFsnZnJlZCcsIDQ4XV1cbiAgICovXG4gIGZ1bmN0aW9uIHNvcnRCeShjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgaXRlcmF0ZWUgPSBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUpO1xuXG4gICAgcmV0dXJuIGJhc2VNYXAoYmFzZU1hcChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4geyAndmFsdWUnOiB2YWx1ZSwgJ2luZGV4JzogaW5kZXgrKywgJ2NyaXRlcmlhJzogaXRlcmF0ZWUodmFsdWUsIGtleSwgY29sbGVjdGlvbikgfTtcbiAgICB9KS5zb3J0KGZ1bmN0aW9uKG9iamVjdCwgb3RoZXIpIHtcbiAgICAgIHJldHVybiBjb21wYXJlQXNjZW5kaW5nKG9iamVjdC5jcml0ZXJpYSwgb3RoZXIuY3JpdGVyaWEpIHx8IChvYmplY3QuaW5kZXggLSBvdGhlci5pbmRleCk7XG4gICAgfSksIGJhc2VQcm9wZXJ0eSgndmFsdWUnKSk7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgLCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBhbmQgYXJndW1lbnRzXG4gICAqIG9mIHRoZSBjcmVhdGVkIGZ1bmN0aW9uLCB3aGlsZSBpdCdzIGNhbGxlZCBsZXNzIHRoYW4gYG5gIHRpbWVzLiBTdWJzZXF1ZW50XG4gICAqIGNhbGxzIHRvIHRoZSBjcmVhdGVkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAzLjAuMFxuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBjYWxscyBhdCB3aGljaCBgZnVuY2AgaXMgbm8gbG9uZ2VyIGludm9rZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyByZXN0cmljdGVkIGZ1bmN0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5iZWZvcmUoNSwgYWRkQ29udGFjdFRvTGlzdCkpO1xuICAgKiAvLyA9PiBBbGxvd3MgYWRkaW5nIHVwIHRvIDQgY29udGFjdHMgdG8gdGhlIGxpc3QuXG4gICAqL1xuICBmdW5jdGlvbiBiZWZvcmUobiwgZnVuYykge1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgICB9XG4gICAgbiA9IHRvSW50ZWdlcihuKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoLS1uID4gMCkge1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICBpZiAobiA8PSAxKSB7XG4gICAgICAgIGZ1bmMgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgXG4gICAqIGFuZCBgcGFydGlhbHNgIHByZXBlbmRlZCB0byB0aGUgYXJndW1lbnRzIGl0IHJlY2VpdmVzLlxuICAgKlxuICAgKiBUaGUgYF8uYmluZC5wbGFjZWhvbGRlcmAgdmFsdWUsIHdoaWNoIGRlZmF1bHRzIHRvIGBfYCBpbiBtb25vbGl0aGljIGJ1aWxkcyxcbiAgICogbWF5IGJlIHVzZWQgYXMgYSBwbGFjZWhvbGRlciBmb3IgcGFydGlhbGx5IGFwcGxpZWQgYXJndW1lbnRzLlxuICAgKlxuICAgKiAqKk5vdGU6KiogVW5saWtlIG5hdGl2ZSBgRnVuY3Rpb24jYmluZGAsIHRoaXMgbWV0aG9kIGRvZXNuJ3Qgc2V0IHRoZSBcImxlbmd0aFwiXG4gICAqIHByb3BlcnR5IG9mIGJvdW5kIGZ1bmN0aW9ucy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gICAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICAgKiBAcGFyYW0gey4uLip9IFtwYXJ0aWFsc10gVGhlIGFyZ3VtZW50cyB0byBiZSBwYXJ0aWFsbHkgYXBwbGllZC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYm91bmQgZnVuY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIGZ1bmN0aW9uIGdyZWV0KGdyZWV0aW5nLCBwdW5jdHVhdGlvbikge1xuICAgKiAgIHJldHVybiBncmVldGluZyArICcgJyArIHRoaXMudXNlciArIHB1bmN0dWF0aW9uO1xuICAgKiB9XG4gICAqXG4gICAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gICAqXG4gICAqIHZhciBib3VuZCA9IF8uYmluZChncmVldCwgb2JqZWN0LCAnaGknKTtcbiAgICogYm91bmQoJyEnKTtcbiAgICogLy8gPT4gJ2hpIGZyZWQhJ1xuICAgKlxuICAgKiAvLyBCb3VuZCB3aXRoIHBsYWNlaG9sZGVycy5cbiAgICogdmFyIGJvdW5kID0gXy5iaW5kKGdyZWV0LCBvYmplY3QsIF8sICchJyk7XG4gICAqIGJvdW5kKCdoaScpO1xuICAgKiAvLyA9PiAnaGkgZnJlZCEnXG4gICAqL1xuICB2YXIgYmluZCA9IGJhc2VSZXN0KGZ1bmN0aW9uKGZ1bmMsIHRoaXNBcmcsIHBhcnRpYWxzKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVBhcnRpYWwoZnVuYywgV1JBUF9CSU5EX0ZMQUcgfCBXUkFQX1BBUlRJQUxfRkxBRywgdGhpc0FyZywgcGFydGlhbHMpO1xuICB9KTtcblxuICAvKipcbiAgICogRGVmZXJzIGludm9raW5nIHRoZSBgZnVuY2AgdW50aWwgdGhlIGN1cnJlbnQgY2FsbCBzdGFjayBoYXMgY2xlYXJlZC4gQW55XG4gICAqIGFkZGl0aW9uYWwgYXJndW1lbnRzIGFyZSBwcm92aWRlZCB0byBgZnVuY2Agd2hlbiBpdCdzIGludm9rZWQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWZlci5cbiAgICogQHBhcmFtIHsuLi4qfSBbYXJnc10gVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVyIGlkLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmRlZmVyKGZ1bmN0aW9uKHRleHQpIHtcbiAgICogICBjb25zb2xlLmxvZyh0ZXh0KTtcbiAgICogfSwgJ2RlZmVycmVkJyk7XG4gICAqIC8vID0+IExvZ3MgJ2RlZmVycmVkJyBhZnRlciBvbmUgbWlsbGlzZWNvbmQuXG4gICAqL1xuICB2YXIgZGVmZXIgPSBiYXNlUmVzdChmdW5jdGlvbihmdW5jLCBhcmdzKSB7XG4gICAgcmV0dXJuIGJhc2VEZWxheShmdW5jLCAxLCBhcmdzKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEludm9rZXMgYGZ1bmNgIGFmdGVyIGB3YWl0YCBtaWxsaXNlY29uZHMuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBhcmVcbiAgICogcHJvdmlkZWQgdG8gYGZ1bmNgIHdoZW4gaXQncyBpbnZva2VkLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVsYXkuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3YWl0IFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5IGludm9jYXRpb24uXG4gICAqIEBwYXJhbSB7Li4uKn0gW2FyZ3NdIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lciBpZC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5kZWxheShmdW5jdGlvbih0ZXh0KSB7XG4gICAqICAgY29uc29sZS5sb2codGV4dCk7XG4gICAqIH0sIDEwMDAsICdsYXRlcicpO1xuICAgKiAvLyA9PiBMb2dzICdsYXRlcicgYWZ0ZXIgb25lIHNlY29uZC5cbiAgICovXG4gIHZhciBkZWxheSA9IGJhc2VSZXN0KGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGFyZ3MpIHtcbiAgICByZXR1cm4gYmFzZURlbGF5KGZ1bmMsIHRvTnVtYmVyKHdhaXQpIHx8IDAsIGFyZ3MpO1xuICB9KTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbmVnYXRlcyB0aGUgcmVzdWx0IG9mIHRoZSBwcmVkaWNhdGUgYGZ1bmNgLiBUaGVcbiAgICogYGZ1bmNgIHByZWRpY2F0ZSBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIGFuZCBhcmd1bWVudHMgb2YgdGhlXG4gICAqIGNyZWF0ZWQgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDMuMC4wXG4gICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIHByZWRpY2F0ZSB0byBuZWdhdGUuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG5lZ2F0ZWQgZnVuY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIGZ1bmN0aW9uIGlzRXZlbihuKSB7XG4gICAqICAgcmV0dXJuIG4gJSAyID09IDA7XG4gICAqIH1cbiAgICpcbiAgICogXy5maWx0ZXIoWzEsIDIsIDMsIDQsIDUsIDZdLCBfLm5lZ2F0ZShpc0V2ZW4pKTtcbiAgICogLy8gPT4gWzEsIDMsIDVdXG4gICAqL1xuICBmdW5jdGlvbiBuZWdhdGUocHJlZGljYXRlKSB7XG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHJldHVybiAhcHJlZGljYXRlLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaXMgcmVzdHJpY3RlZCB0byBpbnZva2luZyBgZnVuY2Agb25jZS4gUmVwZWF0IGNhbGxzXG4gICAqIHRvIHRoZSBmdW5jdGlvbiByZXR1cm4gdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBpbnZvY2F0aW9uLiBUaGUgYGZ1bmNgIGlzXG4gICAqIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgYW5kIGFyZ3VtZW50cyBvZiB0aGUgY3JlYXRlZCBmdW5jdGlvbi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyByZXN0cmljdGVkIGZ1bmN0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgaW5pdGlhbGl6ZSA9IF8ub25jZShjcmVhdGVBcHBsaWNhdGlvbik7XG4gICAqIGluaXRpYWxpemUoKTtcbiAgICogaW5pdGlhbGl6ZSgpO1xuICAgKiAvLyA9PiBgY3JlYXRlQXBwbGljYXRpb25gIGlzIGludm9rZWQgb25jZVxuICAgKi9cbiAgZnVuY3Rpb24gb25jZShmdW5jKSB7XG4gICAgcmV0dXJuIGJlZm9yZSgyLCBmdW5jKTtcbiAgfVxuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHNoYWxsb3cgY2xvbmUgb2YgYHZhbHVlYC5cbiAgICpcbiAgICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb24gdGhlXG4gICAqIFtzdHJ1Y3R1cmVkIGNsb25lIGFsZ29yaXRobV0oaHR0cHM6Ly9tZG4uaW8vU3RydWN0dXJlZF9jbG9uZV9hbGdvcml0aG0pXG4gICAqIGFuZCBzdXBwb3J0cyBjbG9uaW5nIGFycmF5cywgYXJyYXkgYnVmZmVycywgYm9vbGVhbnMsIGRhdGUgb2JqZWN0cywgbWFwcyxcbiAgICogbnVtYmVycywgYE9iamVjdGAgb2JqZWN0cywgcmVnZXhlcywgc2V0cywgc3RyaW5ncywgc3ltYm9scywgYW5kIHR5cGVkXG4gICAqIGFycmF5cy4gVGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgYGFyZ3VtZW50c2Agb2JqZWN0cyBhcmUgY2xvbmVkXG4gICAqIGFzIHBsYWluIG9iamVjdHMuIEFuIGVtcHR5IG9iamVjdCBpcyByZXR1cm5lZCBmb3IgdW5jbG9uZWFibGUgdmFsdWVzIHN1Y2hcbiAgICogYXMgZXJyb3Igb2JqZWN0cywgZnVuY3Rpb25zLCBET00gbm9kZXMsIGFuZCBXZWFrTWFwcy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQGNhdGVnb3J5IExhbmdcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2xvbmUuXG4gICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBjbG9uZWQgdmFsdWUuXG4gICAqIEBzZWUgXy5jbG9uZURlZXBcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIG9iamVjdHMgPSBbeyAnYSc6IDEgfSwgeyAnYic6IDIgfV07XG4gICAqXG4gICAqIHZhciBzaGFsbG93ID0gXy5jbG9uZShvYmplY3RzKTtcbiAgICogY29uc29sZS5sb2coc2hhbGxvd1swXSA9PT0gb2JqZWN0c1swXSk7XG4gICAqIC8vID0+IHRydWVcbiAgICovXG4gIGZ1bmN0aW9uIGNsb25lKHZhbHVlKSB7XG4gICAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gY29weUFycmF5KHZhbHVlKSA6IGNvcHlPYmplY3QodmFsdWUsIG5hdGl2ZUtleXModmFsdWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhXG4gICAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gICAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSA0LjAuMFxuICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICAgKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAgICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAgICpcbiAgICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICpcbiAgICogXy5lcSgnYScsICdhJyk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICpcbiAgICogXy5lcShOYU4sIE5hTik7XG4gICAqIC8vID0+IHRydWVcbiAgICovXG4gIGZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBjYXRlZ29yeSBMYW5nXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gICAqICBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgdmFyIGlzQXJndW1lbnRzID0gYmFzZUlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID8gYmFzZUlzQXJndW1lbnRzIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBjYXRlZ29yeSBMYW5nXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqXG4gICAqIF8uaXNBcnJheSgnYWJjJyk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqXG4gICAqIF8uaXNBcnJheShfLm5vb3ApO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gICAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAgICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgNC4wLjBcbiAgICogQGNhdGVnb3J5IExhbmdcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYm9vbGVhbiBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBib29sZWFuLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNCb29sZWFuKGZhbHNlKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzQm9vbGVhbihudWxsKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICovXG4gIGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2UgfHxcbiAgICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IGJvb2xUYWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRGF0ZWAgb2JqZWN0LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBkYXRlIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmlzRGF0ZShuZXcgRGF0ZSk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc0RhdGUoJ01vbiBBcHJpbCAyMyAyMDEyJyk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICB2YXIgaXNEYXRlID0gYmFzZUlzRGF0ZTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYW4gZW1wdHkgb2JqZWN0LCBjb2xsZWN0aW9uLCBtYXAsIG9yIHNldC5cbiAgICpcbiAgICogT2JqZWN0cyBhcmUgY29uc2lkZXJlZCBlbXB0eSBpZiB0aGV5IGhhdmUgbm8gb3duIGVudW1lcmFibGUgc3RyaW5nIGtleWVkXG4gICAqIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIEFycmF5LWxpa2UgdmFsdWVzIHN1Y2ggYXMgYGFyZ3VtZW50c2Agb2JqZWN0cywgYXJyYXlzLCBidWZmZXJzLCBzdHJpbmdzLCBvclxuICAgKiBqUXVlcnktbGlrZSBjb2xsZWN0aW9ucyBhcmUgY29uc2lkZXJlZCBlbXB0eSBpZiB0aGV5IGhhdmUgYSBgbGVuZ3RoYCBvZiBgMGAuXG4gICAqIFNpbWlsYXJseSwgbWFwcyBhbmQgc2V0cyBhcmUgY29uc2lkZXJlZCBlbXB0eSBpZiB0aGV5IGhhdmUgYSBgc2l6ZWAgb2YgYDBgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZW1wdHksIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc0VtcHR5KG51bGwpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaXNFbXB0eSh0cnVlKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzRW1wdHkoMSk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc0VtcHR5KFsxLCAyLCAzXSk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqXG4gICAqIF8uaXNFbXB0eSh7ICdhJzogMSB9KTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICovXG4gIGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgICBpZiAoaXNBcnJheUxpa2UodmFsdWUpICYmXG4gICAgICAgIChpc0FycmF5KHZhbHVlKSB8fCBpc1N0cmluZyh2YWx1ZSkgfHxcbiAgICAgICAgICBpc0Z1bmN0aW9uKHZhbHVlLnNwbGljZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKSkge1xuICAgICAgcmV0dXJuICF2YWx1ZS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiAhbmF0aXZlS2V5cyh2YWx1ZSkubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgZGVlcCBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmVcbiAgICogZXF1aXZhbGVudC5cbiAgICpcbiAgICogKipOb3RlOioqIFRoaXMgbWV0aG9kIHN1cHBvcnRzIGNvbXBhcmluZyBhcnJheXMsIGFycmF5IGJ1ZmZlcnMsIGJvb2xlYW5zLFxuICAgKiBkYXRlIG9iamVjdHMsIGVycm9yIG9iamVjdHMsIG1hcHMsIG51bWJlcnMsIGBPYmplY3RgIG9iamVjdHMsIHJlZ2V4ZXMsXG4gICAqIHNldHMsIHN0cmluZ3MsIHN5bWJvbHMsIGFuZCB0eXBlZCBhcnJheXMuIGBPYmplY3RgIG9iamVjdHMgYXJlIGNvbXBhcmVkXG4gICAqIGJ5IHRoZWlyIG93biwgbm90IGluaGVyaXRlZCwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLiBGdW5jdGlvbnMgYW5kIERPTVxuICAgKiBub2RlcyBhcmUgY29tcGFyZWQgYnkgc3RyaWN0IGVxdWFsaXR5LCBpLmUuIGA9PT1gLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICAgKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAgICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAgICpcbiAgICogXy5pc0VxdWFsKG9iamVjdCwgb3RoZXIpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIG9iamVjdCA9PT0gb3RoZXI7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICBmdW5jdGlvbiBpc0VxdWFsKHZhbHVlLCBvdGhlcikge1xuICAgIHJldHVybiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZmluaXRlIHByaW1pdGl2ZSBudW1iZXIuXG4gICAqXG4gICAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvblxuICAgKiBbYE51bWJlci5pc0Zpbml0ZWBdKGh0dHBzOi8vbWRuLmlvL051bWJlci9pc0Zpbml0ZSkuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBjYXRlZ29yeSBMYW5nXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZpbml0ZSBudW1iZXIsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc0Zpbml0ZSgzKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzRmluaXRlKE51bWJlci5NSU5fVkFMVUUpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaXNGaW5pdGUoSW5maW5pdHkpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKlxuICAgKiBfLmlzRmluaXRlKCczJyk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICBmdW5jdGlvbiBpc0Zpbml0ZSh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgbmF0aXZlSXNGaW5pdGUodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQGNhdGVnb3J5IExhbmdcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc0Z1bmN0aW9uKF8pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gICAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXlzIGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gICAgdmFyIHRhZyA9IGJhc2VHZXRUYWcodmFsdWUpO1xuICAgIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAgICpcbiAgICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAgICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgNC4wLjBcbiAgICogQGNhdGVnb3J5IExhbmdcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNMZW5ndGgoMyk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICpcbiAgICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqXG4gICAqIF8uaXNMZW5ndGgoJzMnKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICovXG4gIGZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICAgKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gICAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQGNhdGVnb3J5IExhbmdcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmlzT2JqZWN0KHt9KTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc09iamVjdChfLm5vb3ApO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaXNPYmplY3QobnVsbCk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICAgIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gICAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgNC4wLjBcbiAgICogQGNhdGVnb3J5IExhbmdcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqXG4gICAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGBOYU5gLlxuICAgKlxuICAgKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgYmFzZWQgb25cbiAgICogW2BOdW1iZXIuaXNOYU5gXShodHRwczovL21kbi5pby9OdW1iZXIvaXNOYU4pIGFuZCBpcyBub3QgdGhlIHNhbWUgYXNcbiAgICogZ2xvYmFsIFtgaXNOYU5gXShodHRwczovL21kbi5pby9pc05hTikgd2hpY2ggcmV0dXJucyBgdHJ1ZWAgZm9yXG4gICAqIGB1bmRlZmluZWRgIGFuZCBvdGhlciBub24tbnVtYmVyIHZhbHVlcy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQGNhdGVnb3J5IExhbmdcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGBOYU5gLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNOYU4oTmFOKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzTmFOKG5ldyBOdW1iZXIoTmFOKSk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogaXNOYU4odW5kZWZpbmVkKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzTmFOKHVuZGVmaW5lZCk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICBmdW5jdGlvbiBpc05hTih2YWx1ZSkge1xuICAgIC8vIEFuIGBOYU5gIHByaW1pdGl2ZSBpcyB0aGUgb25seSB2YWx1ZSB0aGF0IGlzIG5vdCBlcXVhbCB0byBpdHNlbGYuXG4gICAgLy8gUGVyZm9ybSB0aGUgYHRvU3RyaW5nVGFnYCBjaGVjayBmaXJzdCB0byBhdm9pZCBlcnJvcnMgd2l0aCBzb21lXG4gICAgLy8gQWN0aXZlWCBvYmplY3RzIGluIElFLlxuICAgIHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgdmFsdWUgIT0gK3ZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGBudWxsYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQGNhdGVnb3J5IExhbmdcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGBudWxsYCwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmlzTnVsbChudWxsKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzTnVsbCh2b2lkIDApO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNOdWxsKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgTnVtYmVyYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICAgKlxuICAgKiAqKk5vdGU6KiogVG8gZXhjbHVkZSBgSW5maW5pdHlgLCBgLUluZmluaXR5YCwgYW5kIGBOYU5gLCB3aGljaCBhcmVcbiAgICogY2xhc3NpZmllZCBhcyBudW1iZXJzLCB1c2UgdGhlIGBfLmlzRmluaXRlYCBtZXRob2QuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBjYXRlZ29yeSBMYW5nXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG51bWJlciwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmlzTnVtYmVyKDMpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaXNOdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc051bWJlcihJbmZpbml0eSk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc051bWJlcignMycpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8XG4gICAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBudW1iZXJUYWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgUmVnRXhwYCBvYmplY3QuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBjYXRlZ29yeSBMYW5nXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHJlZ2V4cCwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmlzUmVnRXhwKC9hYmMvKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzUmVnRXhwKCcvYWJjLycpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgdmFyIGlzUmVnRXhwID0gYmFzZUlzUmVnRXhwO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN0cmluZ2AgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IExhbmdcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3RyaW5nLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNTdHJpbmcoJ2FiYycpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaXNTdHJpbmcoMSk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHxcbiAgICAgICghaXNBcnJheSh2YWx1ZSkgJiYgaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzdHJpbmdUYWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGB1bmRlZmluZWRgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYHVuZGVmaW5lZGAsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc1VuZGVmaW5lZCh2b2lkIDApO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaXNVbmRlZmluZWQobnVsbCk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gYXJyYXkuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBMYW5nXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnRvQXJyYXkoeyAnYSc6IDEsICdiJzogMiB9KTtcbiAgICogLy8gPT4gWzEsIDJdXG4gICAqXG4gICAqIF8udG9BcnJheSgnYWJjJyk7XG4gICAqIC8vID0+IFsnYScsICdiJywgJ2MnXVxuICAgKlxuICAgKiBfLnRvQXJyYXkoMSk7XG4gICAqIC8vID0+IFtdXG4gICAqXG4gICAqIF8udG9BcnJheShudWxsKTtcbiAgICogLy8gPT4gW11cbiAgICovXG4gIGZ1bmN0aW9uIHRvQXJyYXkodmFsdWUpIHtcbiAgICBpZiAoIWlzQXJyYXlMaWtlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlcyh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPyBjb3B5QXJyYXkodmFsdWUpIDogW107XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBpbnRlZ2VyLlxuICAgKlxuICAgKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICAgKiBbYFRvSW50ZWdlcmBdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2ludGVnZXIpLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSA0LjAuMFxuICAgKiBAY2F0ZWdvcnkgTGFuZ1xuICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgaW50ZWdlci5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy50b0ludGVnZXIoMy4yKTtcbiAgICogLy8gPT4gM1xuICAgKlxuICAgKiBfLnRvSW50ZWdlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAgICogLy8gPT4gMFxuICAgKlxuICAgKiBfLnRvSW50ZWdlcihJbmZpbml0eSk7XG4gICAqIC8vID0+IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gICAqXG4gICAqIF8udG9JbnRlZ2VyKCczLjInKTtcbiAgICogLy8gPT4gM1xuICAgKi9cbiAgdmFyIHRvSW50ZWdlciA9IE51bWJlcjtcblxuICAvKipcbiAgICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgNC4wLjBcbiAgICogQGNhdGVnb3J5IExhbmdcbiAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnRvTnVtYmVyKDMuMik7XG4gICAqIC8vID0+IDMuMlxuICAgKlxuICAgKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICAgKiAvLyA9PiA1ZS0zMjRcbiAgICpcbiAgICogXy50b051bWJlcihJbmZpbml0eSk7XG4gICAqIC8vID0+IEluZmluaXR5XG4gICAqXG4gICAqIF8udG9OdW1iZXIoJzMuMicpO1xuICAgKiAvLyA9PiAzLjJcbiAgICovXG4gIHZhciB0b051bWJlciA9IE51bWJlcjtcblxuICAvKipcbiAgICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAgICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDQuMC4wXG4gICAqIEBjYXRlZ29yeSBMYW5nXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8udG9TdHJpbmcobnVsbCk7XG4gICAqIC8vID0+ICcnXG4gICAqXG4gICAqIF8udG9TdHJpbmcoLTApO1xuICAgKiAvLyA9PiAnLTAnXG4gICAqXG4gICAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAgICogLy8gPT4gJzEsMiwzJ1xuICAgKi9cbiAgZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIEFzc2lnbnMgb3duIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdHMgdG8gdGhlXG4gICAqIGRlc3RpbmF0aW9uIG9iamVjdC4gU291cmNlIG9iamVjdHMgYXJlIGFwcGxpZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LlxuICAgKiBTdWJzZXF1ZW50IHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gICAqXG4gICAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgIGFuZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gICAqIFtgT2JqZWN0LmFzc2lnbmBdKGh0dHBzOi8vbWRuLmlvL09iamVjdC9hc3NpZ24pLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAwLjEwLjBcbiAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gICAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICAgKiBAc2VlIF8uYXNzaWduSW5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogZnVuY3Rpb24gRm9vKCkge1xuICAgKiAgIHRoaXMuYSA9IDE7XG4gICAqIH1cbiAgICpcbiAgICogZnVuY3Rpb24gQmFyKCkge1xuICAgKiAgIHRoaXMuYyA9IDM7XG4gICAqIH1cbiAgICpcbiAgICogRm9vLnByb3RvdHlwZS5iID0gMjtcbiAgICogQmFyLnByb3RvdHlwZS5kID0gNDtcbiAgICpcbiAgICogXy5hc3NpZ24oeyAnYSc6IDAgfSwgbmV3IEZvbywgbmV3IEJhcik7XG4gICAqIC8vID0+IHsgJ2EnOiAxLCAnYyc6IDMgfVxuICAgKi9cbiAgdmFyIGFzc2lnbiA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlKSB7XG4gICAgY29weU9iamVjdChzb3VyY2UsIG5hdGl2ZUtleXMoc291cmNlKSwgb2JqZWN0KTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uYXNzaWduYCBleGNlcHQgdGhhdCBpdCBpdGVyYXRlcyBvdmVyIG93biBhbmRcbiAgICogaW5oZXJpdGVkIHNvdXJjZSBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgNC4wLjBcbiAgICogQGFsaWFzIGV4dGVuZFxuICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAgICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gICAqIEBzZWUgXy5hc3NpZ25cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogZnVuY3Rpb24gRm9vKCkge1xuICAgKiAgIHRoaXMuYSA9IDE7XG4gICAqIH1cbiAgICpcbiAgICogZnVuY3Rpb24gQmFyKCkge1xuICAgKiAgIHRoaXMuYyA9IDM7XG4gICAqIH1cbiAgICpcbiAgICogRm9vLnByb3RvdHlwZS5iID0gMjtcbiAgICogQmFyLnByb3RvdHlwZS5kID0gNDtcbiAgICpcbiAgICogXy5hc3NpZ25Jbih7ICdhJzogMCB9LCBuZXcgRm9vLCBuZXcgQmFyKTtcbiAgICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzLCAnZCc6IDQgfVxuICAgKi9cbiAgdmFyIGFzc2lnbkluID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgICBjb3B5T2JqZWN0KHNvdXJjZSwgbmF0aXZlS2V5c0luKHNvdXJjZSksIG9iamVjdCk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmFzc2lnbkluYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGBjdXN0b21pemVyYFxuICAgKiB3aGljaCBpcyBpbnZva2VkIHRvIHByb2R1Y2UgdGhlIGFzc2lnbmVkIHZhbHVlcy4gSWYgYGN1c3RvbWl6ZXJgIHJldHVybnNcbiAgICogYHVuZGVmaW5lZGAsIGFzc2lnbm1lbnQgaXMgaGFuZGxlZCBieSB0aGUgbWV0aG9kIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmBcbiAgICogaXMgaW52b2tlZCB3aXRoIGZpdmUgYXJndW1lbnRzOiAob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKS5cbiAgICpcbiAgICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDQuMC4wXG4gICAqIEBhbGlhcyBleHRlbmRXaXRoXG4gICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICAgKiBAcGFyYW0gey4uLk9iamVjdH0gc291cmNlcyBUaGUgc291cmNlIG9iamVjdHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAgICogQHNlZSBfLmFzc2lnbldpdGhcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogZnVuY3Rpb24gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUpIHtcbiAgICogICByZXR1cm4gXy5pc1VuZGVmaW5lZChvYmpWYWx1ZSkgPyBzcmNWYWx1ZSA6IG9ialZhbHVlO1xuICAgKiB9XG4gICAqXG4gICAqIHZhciBkZWZhdWx0cyA9IF8ucGFydGlhbFJpZ2h0KF8uYXNzaWduSW5XaXRoLCBjdXN0b21pemVyKTtcbiAgICpcbiAgICogZGVmYXVsdHMoeyAnYSc6IDEgfSwgeyAnYic6IDIgfSwgeyAnYSc6IDMgfSk7XG4gICAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICAgKi9cbiAgdmFyIGFzc2lnbkluV2l0aCA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCwgY3VzdG9taXplcikge1xuICAgIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzSW4oc291cmNlKSwgb2JqZWN0LCBjdXN0b21pemVyKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGUgYHByb3RvdHlwZWAgb2JqZWN0LiBJZiBhXG4gICAqIGBwcm9wZXJ0aWVzYCBvYmplY3QgaXMgZ2l2ZW4sIGl0cyBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllc1xuICAgKiBhcmUgYXNzaWduZWQgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBzaW5jZSAyLjMuMFxuICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b3R5cGUgVGhlIG9iamVjdCB0byBpbmhlcml0IGZyb20uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllc10gVGhlIHByb3BlcnRpZXMgdG8gYXNzaWduIHRvIHRoZSBvYmplY3QuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIGZ1bmN0aW9uIFNoYXBlKCkge1xuICAgKiAgIHRoaXMueCA9IDA7XG4gICAqICAgdGhpcy55ID0gMDtcbiAgICogfVxuICAgKlxuICAgKiBmdW5jdGlvbiBDaXJjbGUoKSB7XG4gICAqICAgU2hhcGUuY2FsbCh0aGlzKTtcbiAgICogfVxuICAgKlxuICAgKiBDaXJjbGUucHJvdG90eXBlID0gXy5jcmVhdGUoU2hhcGUucHJvdG90eXBlLCB7XG4gICAqICAgJ2NvbnN0cnVjdG9yJzogQ2lyY2xlXG4gICAqIH0pO1xuICAgKlxuICAgKiB2YXIgY2lyY2xlID0gbmV3IENpcmNsZTtcbiAgICogY2lyY2xlIGluc3RhbmNlb2YgQ2lyY2xlO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIGNpcmNsZSBpbnN0YW5jZW9mIFNoYXBlO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGUocHJvdG90eXBlLCBwcm9wZXJ0aWVzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGJhc2VDcmVhdGUocHJvdG90eXBlKTtcbiAgICByZXR1cm4gcHJvcGVydGllcyA9PSBudWxsID8gcmVzdWx0IDogYXNzaWduKHJlc3VsdCwgcHJvcGVydGllcyk7XG4gIH1cblxuICAvKipcbiAgICogQXNzaWducyBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZVxuICAgKiBvYmplY3RzIHRvIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QgZm9yIGFsbCBkZXN0aW5hdGlvbiBwcm9wZXJ0aWVzIHRoYXRcbiAgICogcmVzb2x2ZSB0byBgdW5kZWZpbmVkYC4gU291cmNlIG9iamVjdHMgYXJlIGFwcGxpZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LlxuICAgKiBPbmNlIGEgcHJvcGVydHkgaXMgc2V0LCBhZGRpdGlvbmFsIHZhbHVlcyBvZiB0aGUgc2FtZSBwcm9wZXJ0eSBhcmUgaWdub3JlZC5cbiAgICpcbiAgICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICAgKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAgICogQHNlZSBfLmRlZmF1bHRzRGVlcFxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmRlZmF1bHRzKHsgJ2EnOiAxIH0sIHsgJ2InOiAyIH0sIHsgJ2EnOiAzIH0pO1xuICAgKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAgICovXG4gIHZhciBkZWZhdWx0cyA9IGJhc2VSZXN0KGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICBhcmdzLnB1c2godW5kZWZpbmVkLCBjdXN0b21EZWZhdWx0c0Fzc2lnbkluKTtcbiAgICByZXR1cm4gYXNzaWduSW5XaXRoLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHBhdGhgIGlzIGEgZGlyZWN0IHByb3BlcnR5IG9mIGBvYmplY3RgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBvYmplY3QgPSB7ICdhJzogeyAnYic6IDIgfSB9O1xuICAgKiB2YXIgb3RoZXIgPSBfLmNyZWF0ZSh7ICdhJzogXy5jcmVhdGUoeyAnYic6IDIgfSkgfSk7XG4gICAqXG4gICAqIF8uaGFzKG9iamVjdCwgJ2EnKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmhhcyhvYmplY3QsICdhLmInKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmhhcyhvYmplY3QsIFsnYScsICdiJ10pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaGFzKG90aGVyLCAnYScpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgZnVuY3Rpb24gaGFzKG9iamVjdCwgcGF0aCkge1xuICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gICAqXG4gICAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gICAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAgICogZm9yIG1vcmUgZGV0YWlscy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIGZ1bmN0aW9uIEZvbygpIHtcbiAgICogICB0aGlzLmEgPSAxO1xuICAgKiAgIHRoaXMuYiA9IDI7XG4gICAqIH1cbiAgICpcbiAgICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAgICpcbiAgICogXy5rZXlzKG5ldyBGb28pO1xuICAgKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gICAqXG4gICAqIF8ua2V5cygnaGknKTtcbiAgICogLy8gPT4gWycwJywgJzEnXVxuICAgKi9cbiAgdmFyIGtleXMgPSBuYXRpdmVLZXlzO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICAgKlxuICAgKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMy4wLjBcbiAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIGZ1bmN0aW9uIEZvbygpIHtcbiAgICogICB0aGlzLmEgPSAxO1xuICAgKiAgIHRoaXMuYiA9IDI7XG4gICAqIH1cbiAgICpcbiAgICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAgICpcbiAgICogXy5rZXlzSW4obmV3IEZvbyk7XG4gICAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICAgKi9cbiAgdmFyIGtleXNJbiA9IG5hdGl2ZUtleXNJbjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2YgdGhlIHBpY2tlZCBgb2JqZWN0YCBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gICAqIEBwYXJhbSB7Li4uKHN0cmluZ3xzdHJpbmdbXSl9IFtwYXRoc10gVGhlIHByb3BlcnR5IHBhdGhzIHRvIHBpY2suXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAnMicsICdjJzogMyB9O1xuICAgKlxuICAgKiBfLnBpY2sob2JqZWN0LCBbJ2EnLCAnYyddKTtcbiAgICogLy8gPT4geyAnYSc6IDEsICdjJzogMyB9XG4gICAqL1xuICB2YXIgcGljayA9IGZsYXRSZXN0KGZ1bmN0aW9uKG9iamVjdCwgcGF0aHMpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB7fSA6IGJhc2VQaWNrKG9iamVjdCwgcGF0aHMpO1xuICB9KTtcblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5nZXRgIGV4Y2VwdCB0aGF0IGlmIHRoZSByZXNvbHZlZCB2YWx1ZSBpcyBhXG4gICAqIGZ1bmN0aW9uIGl0J3MgaW52b2tlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBpdHMgcGFyZW50IG9iamVjdCBhbmRcbiAgICogaXRzIHJlc3VsdCBpcyByZXR1cm5lZC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byByZXNvbHZlLlxuICAgKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBmb3IgYHVuZGVmaW5lZGAgcmVzb2x2ZWQgdmFsdWVzLlxuICAgKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjMSc6IDMsICdjMic6IF8uY29uc3RhbnQoNCkgfSB9XSB9O1xuICAgKlxuICAgKiBfLnJlc3VsdChvYmplY3QsICdhWzBdLmIuYzEnKTtcbiAgICogLy8gPT4gM1xuICAgKlxuICAgKiBfLnJlc3VsdChvYmplY3QsICdhWzBdLmIuYzInKTtcbiAgICogLy8gPT4gNFxuICAgKlxuICAgKiBfLnJlc3VsdChvYmplY3QsICdhWzBdLmIuYzMnLCAnZGVmYXVsdCcpO1xuICAgKiAvLyA9PiAnZGVmYXVsdCdcbiAgICpcbiAgICogXy5yZXN1bHQob2JqZWN0LCAnYVswXS5iLmMzJywgXy5jb25zdGFudCgnZGVmYXVsdCcpKTtcbiAgICogLy8gPT4gJ2RlZmF1bHQnXG4gICAqL1xuICBmdW5jdGlvbiByZXN1bHQob2JqZWN0LCBwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtwYXRoXTtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBpc0Z1bmN0aW9uKHZhbHVlKSA/IHZhbHVlLmNhbGwob2JqZWN0KSA6IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0eSB2YWx1ZXMgb2YgYG9iamVjdGAuXG4gICAqXG4gICAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIGZ1bmN0aW9uIEZvbygpIHtcbiAgICogICB0aGlzLmEgPSAxO1xuICAgKiAgIHRoaXMuYiA9IDI7XG4gICAqIH1cbiAgICpcbiAgICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAgICpcbiAgICogXy52YWx1ZXMobmV3IEZvbyk7XG4gICAqIC8vID0+IFsxLCAyXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICAgKlxuICAgKiBfLnZhbHVlcygnaGknKTtcbiAgICogLy8gPT4gWydoJywgJ2knXVxuICAgKi9cbiAgZnVuY3Rpb24gdmFsdWVzKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IFtdIDogYmFzZVZhbHVlcyhvYmplY3QsIGtleXMob2JqZWN0KSk7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBjaGFyYWN0ZXJzIFwiJlwiLCBcIjxcIiwgXCI+XCIsICdcIicsIGFuZCBcIidcIiBpbiBgc3RyaW5nYCB0byB0aGVpclxuICAgKiBjb3JyZXNwb25kaW5nIEhUTUwgZW50aXRpZXMuXG4gICAqXG4gICAqICoqTm90ZToqKiBObyBvdGhlciBjaGFyYWN0ZXJzIGFyZSBlc2NhcGVkLiBUbyBlc2NhcGUgYWRkaXRpb25hbFxuICAgKiBjaGFyYWN0ZXJzIHVzZSBhIHRoaXJkLXBhcnR5IGxpYnJhcnkgbGlrZSBbX2hlX10oaHR0cHM6Ly9tdGhzLmJlL2hlKS5cbiAgICpcbiAgICogVGhvdWdoIHRoZSBcIj5cIiBjaGFyYWN0ZXIgaXMgZXNjYXBlZCBmb3Igc3ltbWV0cnksIGNoYXJhY3RlcnMgbGlrZVxuICAgKiBcIj5cIiBhbmQgXCIvXCIgZG9uJ3QgbmVlZCBlc2NhcGluZyBpbiBIVE1MIGFuZCBoYXZlIG5vIHNwZWNpYWwgbWVhbmluZ1xuICAgKiB1bmxlc3MgdGhleSdyZSBwYXJ0IG9mIGEgdGFnIG9yIHVucXVvdGVkIGF0dHJpYnV0ZSB2YWx1ZS4gU2VlXG4gICAqIFtNYXRoaWFzIEJ5bmVucydzIGFydGljbGVdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9hbWJpZ3VvdXMtYW1wZXJzYW5kcylcbiAgICogKHVuZGVyIFwic2VtaS1yZWxhdGVkIGZ1biBmYWN0XCIpIGZvciBtb3JlIGRldGFpbHMuXG4gICAqXG4gICAqIFdoZW4gd29ya2luZyB3aXRoIEhUTUwgeW91IHNob3VsZCBhbHdheXNcbiAgICogW3F1b3RlIGF0dHJpYnV0ZSB2YWx1ZXNdKGh0dHA6Ly93b25rby5jb20vcG9zdC9odG1sLWVzY2FwaW5nKSB0byByZWR1Y2VcbiAgICogWFNTIHZlY3RvcnMuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBTdHJpbmdcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5lc2NhcGUoJ2ZyZWQsIGJhcm5leSwgJiBwZWJibGVzJyk7XG4gICAqIC8vID0+ICdmcmVkLCBiYXJuZXksICZhbXA7IHBlYmJsZXMnXG4gICAqL1xuICBmdW5jdGlvbiBlc2NhcGUoc3RyaW5nKSB7XG4gICAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1VuZXNjYXBlZEh0bWwudGVzdChzdHJpbmcpKVxuICAgICAgPyBzdHJpbmcucmVwbGFjZShyZVVuZXNjYXBlZEh0bWwsIGVzY2FwZUh0bWxDaGFyKVxuICAgICAgOiBzdHJpbmc7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAgICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gICAqXG4gICAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKi9cbiAgZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGUgYXJndW1lbnRzIG9mIHRoZSBjcmVhdGVkXG4gICAqIGZ1bmN0aW9uLiBJZiBgZnVuY2AgaXMgYSBwcm9wZXJ0eSBuYW1lLCB0aGUgY3JlYXRlZCBmdW5jdGlvbiByZXR1cm5zIHRoZVxuICAgKiBwcm9wZXJ0eSB2YWx1ZSBmb3IgYSBnaXZlbiBlbGVtZW50LiBJZiBgZnVuY2AgaXMgYW4gYXJyYXkgb3Igb2JqZWN0LCB0aGVcbiAgICogY3JlYXRlZCBmdW5jdGlvbiByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBjb250YWluIHRoZSBlcXVpdmFsZW50XG4gICAqIHNvdXJjZSBwcm9wZXJ0aWVzLCBvdGhlcndpc2UgaXQgcmV0dXJucyBgZmFsc2VgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBzaW5jZSA0LjAuMFxuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgKiBAcGFyYW0geyp9IFtmdW5jPV8uaWRlbnRpdHldIFRoZSB2YWx1ZSB0byBjb252ZXJ0IHRvIGEgY2FsbGJhY2suXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciB1c2VycyA9IFtcbiAgICogICB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IHRydWUgfSxcbiAgICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IGZhbHNlIH1cbiAgICogXTtcbiAgICpcbiAgICogLy8gVGhlIGBfLm1hdGNoZXNgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAgICogXy5maWx0ZXIodXNlcnMsIF8uaXRlcmF0ZWUoeyAndXNlcic6ICdiYXJuZXknLCAnYWN0aXZlJzogdHJ1ZSB9KSk7XG4gICAqIC8vID0+IFt7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IHRydWUgfV1cbiAgICpcbiAgICogLy8gVGhlIGBfLm1hdGNoZXNQcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICAgKiBfLmZpbHRlcih1c2VycywgXy5pdGVyYXRlZShbJ3VzZXInLCAnZnJlZCddKSk7XG4gICAqIC8vID0+IFt7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfV1cbiAgICpcbiAgICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gICAqIF8ubWFwKHVzZXJzLCBfLml0ZXJhdGVlKCd1c2VyJykpO1xuICAgKiAvLyA9PiBbJ2Jhcm5leScsICdmcmVkJ11cbiAgICpcbiAgICogLy8gQ3JlYXRlIGN1c3RvbSBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICAgKiBfLml0ZXJhdGVlID0gXy53cmFwKF8uaXRlcmF0ZWUsIGZ1bmN0aW9uKGl0ZXJhdGVlLCBmdW5jKSB7XG4gICAqICAgcmV0dXJuICFfLmlzUmVnRXhwKGZ1bmMpID8gaXRlcmF0ZWUoZnVuYykgOiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICogICAgIHJldHVybiBmdW5jLnRlc3Qoc3RyaW5nKTtcbiAgICogICB9O1xuICAgKiB9KTtcbiAgICpcbiAgICogXy5maWx0ZXIoWydhYmMnLCAnZGVmJ10sIC9lZi8pO1xuICAgKiAvLyA9PiBbJ2RlZiddXG4gICAqL1xuICB2YXIgaXRlcmF0ZWUgPSBiYXNlSXRlcmF0ZWU7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHBlcmZvcm1zIGEgcGFydGlhbCBkZWVwIGNvbXBhcmlzb24gYmV0d2VlbiBhIGdpdmVuXG4gICAqIG9iamVjdCBhbmQgYHNvdXJjZWAsIHJldHVybmluZyBgdHJ1ZWAgaWYgdGhlIGdpdmVuIG9iamVjdCBoYXMgZXF1aXZhbGVudFxuICAgKiBwcm9wZXJ0eSB2YWx1ZXMsIGVsc2UgYGZhbHNlYC5cbiAgICpcbiAgICogKipOb3RlOioqIFRoZSBjcmVhdGVkIGZ1bmN0aW9uIGlzIGVxdWl2YWxlbnQgdG8gYF8uaXNNYXRjaGAgd2l0aCBgc291cmNlYFxuICAgKiBwYXJ0aWFsbHkgYXBwbGllZC5cbiAgICpcbiAgICogUGFydGlhbCBjb21wYXJpc29ucyB3aWxsIG1hdGNoIGVtcHR5IGFycmF5IGFuZCBlbXB0eSBvYmplY3QgYHNvdXJjZWBcbiAgICogdmFsdWVzIGFnYWluc3QgYW55IGFycmF5IG9yIG9iamVjdCB2YWx1ZSwgcmVzcGVjdGl2ZWx5LiBTZWUgYF8uaXNFcXVhbGBcbiAgICogZm9yIGEgbGlzdCBvZiBzdXBwb3J0ZWQgdmFsdWUgY29tcGFyaXNvbnMuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHNpbmNlIDMuMC4wXG4gICAqIEBjYXRlZ29yeSBVdGlsXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBvYmplY3RzID0gW1xuICAgKiAgIHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9LFxuICAgKiAgIHsgJ2EnOiA0LCAnYic6IDUsICdjJzogNiB9XG4gICAqIF07XG4gICAqXG4gICAqIF8uZmlsdGVyKG9iamVjdHMsIF8ubWF0Y2hlcyh7ICdhJzogNCwgJ2MnOiA2IH0pKTtcbiAgICogLy8gPT4gW3sgJ2EnOiA0LCAnYic6IDUsICdjJzogNiB9XVxuICAgKi9cbiAgZnVuY3Rpb24gbWF0Y2hlcyhzb3VyY2UpIHtcbiAgICByZXR1cm4gYmFzZU1hdGNoZXMoYXNzaWduKHt9LCBzb3VyY2UpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFsbCBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgZnVuY3Rpb24gcHJvcGVydGllcyBvZiBhIHNvdXJjZVxuICAgKiBvYmplY3QgdG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC4gSWYgYG9iamVjdGAgaXMgYSBmdW5jdGlvbiwgdGhlbiBtZXRob2RzXG4gICAqIGFyZSBhZGRlZCB0byBpdHMgcHJvdG90eXBlIGFzIHdlbGwuXG4gICAqXG4gICAqICoqTm90ZToqKiBVc2UgYF8ucnVuSW5Db250ZXh0YCB0byBjcmVhdGUgYSBwcmlzdGluZSBgbG9kYXNoYCBmdW5jdGlvbiB0b1xuICAgKiBhdm9pZCBjb25mbGljdHMgY2F1c2VkIGJ5IG1vZGlmeWluZyB0aGUgb3JpZ2luYWwuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBVdGlsXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fSBbb2JqZWN0PWxvZGFzaF0gVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIGZ1bmN0aW9ucyB0byBhZGQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmNoYWluPXRydWVdIFNwZWNpZnkgd2hldGhlciBtaXhpbnMgYXJlIGNoYWluYWJsZS5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufE9iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogZnVuY3Rpb24gdm93ZWxzKHN0cmluZykge1xuICAgKiAgIHJldHVybiBfLmZpbHRlcihzdHJpbmcsIGZ1bmN0aW9uKHYpIHtcbiAgICogICAgIHJldHVybiAvW2FlaW91XS9pLnRlc3Qodik7XG4gICAqICAgfSk7XG4gICAqIH1cbiAgICpcbiAgICogXy5taXhpbih7ICd2b3dlbHMnOiB2b3dlbHMgfSk7XG4gICAqIF8udm93ZWxzKCdmcmVkJyk7XG4gICAqIC8vID0+IFsnZSddXG4gICAqXG4gICAqIF8oJ2ZyZWQnKS52b3dlbHMoKS52YWx1ZSgpO1xuICAgKiAvLyA9PiBbJ2UnXVxuICAgKlxuICAgKiBfLm1peGluKHsgJ3Zvd2Vscyc6IHZvd2VscyB9LCB7ICdjaGFpbic6IGZhbHNlIH0pO1xuICAgKiBfKCdmcmVkJykudm93ZWxzKCk7XG4gICAqIC8vID0+IFsnZSddXG4gICAqL1xuICBmdW5jdGlvbiBtaXhpbihvYmplY3QsIHNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBwcm9wcyA9IGtleXMoc291cmNlKSxcbiAgICAgICAgbWV0aG9kTmFtZXMgPSBiYXNlRnVuY3Rpb25zKHNvdXJjZSwgcHJvcHMpO1xuXG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCAmJlxuICAgICAgICAhKGlzT2JqZWN0KHNvdXJjZSkgJiYgKG1ldGhvZE5hbWVzLmxlbmd0aCB8fCAhcHJvcHMubGVuZ3RoKSkpIHtcbiAgICAgIG9wdGlvbnMgPSBzb3VyY2U7XG4gICAgICBzb3VyY2UgPSBvYmplY3Q7XG4gICAgICBvYmplY3QgPSB0aGlzO1xuICAgICAgbWV0aG9kTmFtZXMgPSBiYXNlRnVuY3Rpb25zKHNvdXJjZSwga2V5cyhzb3VyY2UpKTtcbiAgICB9XG4gICAgdmFyIGNoYWluID0gIShpc09iamVjdChvcHRpb25zKSAmJiAnY2hhaW4nIGluIG9wdGlvbnMpIHx8ICEhb3B0aW9ucy5jaGFpbixcbiAgICAgICAgaXNGdW5jID0gaXNGdW5jdGlvbihvYmplY3QpO1xuXG4gICAgYmFzZUVhY2gobWV0aG9kTmFtZXMsIGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICAgIHZhciBmdW5jID0gc291cmNlW21ldGhvZE5hbWVdO1xuICAgICAgb2JqZWN0W21ldGhvZE5hbWVdID0gZnVuYztcbiAgICAgIGlmIChpc0Z1bmMpIHtcbiAgICAgICAgb2JqZWN0LnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBjaGFpbkFsbCA9IHRoaXMuX19jaGFpbl9fO1xuICAgICAgICAgIGlmIChjaGFpbiB8fCBjaGFpbkFsbCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG9iamVjdCh0aGlzLl9fd3JhcHBlZF9fKSxcbiAgICAgICAgICAgICAgICBhY3Rpb25zID0gcmVzdWx0Ll9fYWN0aW9uc19fID0gY29weUFycmF5KHRoaXMuX19hY3Rpb25zX18pO1xuXG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goeyAnZnVuYyc6IGZ1bmMsICdhcmdzJzogYXJndW1lbnRzLCAndGhpc0FyZyc6IG9iamVjdCB9KTtcbiAgICAgICAgICAgIHJlc3VsdC5fX2NoYWluX18gPSBjaGFpbkFsbDtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KG9iamVjdCwgYXJyYXlQdXNoKFt0aGlzLnZhbHVlKCldLCBhcmd1bWVudHMpKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogUmV2ZXJ0cyB0aGUgYF9gIHZhcmlhYmxlIHRvIGl0cyBwcmV2aW91cyB2YWx1ZSBhbmQgcmV0dXJucyBhIHJlZmVyZW5jZSB0b1xuICAgKiB0aGUgYGxvZGFzaGAgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBVdGlsXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgYGxvZGFzaGAgZnVuY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBsb2Rhc2ggPSBfLm5vQ29uZmxpY3QoKTtcbiAgICovXG4gIGZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XG4gICAgaWYgKHJvb3QuXyA9PT0gdGhpcykge1xuICAgICAgcm9vdC5fID0gb2xkRGFzaDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgcmV0dXJucyBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAc2luY2UgMi4zLjBcbiAgICogQGNhdGVnb3J5IFV0aWxcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy50aW1lcygyLCBfLm5vb3ApO1xuICAgKiAvLyA9PiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gICAqL1xuICBmdW5jdGlvbiBub29wKCkge1xuICAgIC8vIE5vIG9wZXJhdGlvbiBwZXJmb3JtZWQuXG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBJZiBgcHJlZml4YCBpcyBnaXZlbiwgdGhlIElEIGlzIGFwcGVuZGVkIHRvIGl0LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBzaW5jZSAwLjEuMFxuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgVXRpbFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3ByZWZpeD0nJ10gVGhlIHZhbHVlIHRvIHByZWZpeCB0aGUgSUQgd2l0aC5cbiAgICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgdW5pcXVlIElELlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnVuaXF1ZUlkKCdjb250YWN0XycpO1xuICAgKiAvLyA9PiAnY29udGFjdF8xMDQnXG4gICAqXG4gICAqIF8udW5pcXVlSWQoKTtcbiAgICogLy8gPT4gJzEwNSdcbiAgICovXG4gIGZ1bmN0aW9uIHVuaXF1ZUlkKHByZWZpeCkge1xuICAgIHZhciBpZCA9ICsraWRDb3VudGVyO1xuICAgIHJldHVybiB0b1N0cmluZyhwcmVmaXgpICsgaWQ7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBtYXhpbXVtIHZhbHVlIG9mIGBhcnJheWAuIElmIGBhcnJheWAgaXMgZW1wdHkgb3IgZmFsc2V5LFxuICAgKiBgdW5kZWZpbmVkYCBpcyByZXR1cm5lZC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAc2luY2UgMC4xLjBcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE1hdGhcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1heGltdW0gdmFsdWUuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8ubWF4KFs0LCAyLCA4LCA2XSk7XG4gICAqIC8vID0+IDhcbiAgICpcbiAgICogXy5tYXgoW10pO1xuICAgKiAvLyA9PiB1bmRlZmluZWRcbiAgICovXG4gIGZ1bmN0aW9uIG1heChhcnJheSkge1xuICAgIHJldHVybiAoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKVxuICAgICAgPyBiYXNlRXh0cmVtdW0oYXJyYXksIGlkZW50aXR5LCBiYXNlR3QpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgbWluaW11bSB2YWx1ZSBvZiBgYXJyYXlgLiBJZiBgYXJyYXlgIGlzIGVtcHR5IG9yIGZhbHNleSxcbiAgICogYHVuZGVmaW5lZGAgaXMgcmV0dXJuZWQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQHNpbmNlIDAuMS4wXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBNYXRoXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtaW5pbXVtIHZhbHVlLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLm1pbihbNCwgMiwgOCwgNl0pO1xuICAgKiAvLyA9PiAyXG4gICAqXG4gICAqIF8ubWluKFtdKTtcbiAgICogLy8gPT4gdW5kZWZpbmVkXG4gICAqL1xuICBmdW5jdGlvbiBtaW4oYXJyYXkpIHtcbiAgICByZXR1cm4gKGFycmF5ICYmIGFycmF5Lmxlbmd0aClcbiAgICAgID8gYmFzZUV4dHJlbXVtKGFycmF5LCBpZGVudGl0eSwgYmFzZUx0KVxuICAgICAgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLy8gQWRkIG1ldGhvZHMgdGhhdCByZXR1cm4gd3JhcHBlZCB2YWx1ZXMgaW4gY2hhaW4gc2VxdWVuY2VzLlxuICBsb2Rhc2guYXNzaWduSW4gPSBhc3NpZ25JbjtcbiAgbG9kYXNoLmJlZm9yZSA9IGJlZm9yZTtcbiAgbG9kYXNoLmJpbmQgPSBiaW5kO1xuICBsb2Rhc2guY2hhaW4gPSBjaGFpbjtcbiAgbG9kYXNoLmNvbXBhY3QgPSBjb21wYWN0O1xuICBsb2Rhc2guY29uY2F0ID0gY29uY2F0O1xuICBsb2Rhc2guY3JlYXRlID0gY3JlYXRlO1xuICBsb2Rhc2guZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgbG9kYXNoLmRlZmVyID0gZGVmZXI7XG4gIGxvZGFzaC5kZWxheSA9IGRlbGF5O1xuICBsb2Rhc2guZmlsdGVyID0gZmlsdGVyO1xuICBsb2Rhc2guZmxhdHRlbiA9IGZsYXR0ZW47XG4gIGxvZGFzaC5mbGF0dGVuRGVlcCA9IGZsYXR0ZW5EZWVwO1xuICBsb2Rhc2guaXRlcmF0ZWUgPSBpdGVyYXRlZTtcbiAgbG9kYXNoLmtleXMgPSBrZXlzO1xuICBsb2Rhc2gubWFwID0gbWFwO1xuICBsb2Rhc2gubWF0Y2hlcyA9IG1hdGNoZXM7XG4gIGxvZGFzaC5taXhpbiA9IG1peGluO1xuICBsb2Rhc2gubmVnYXRlID0gbmVnYXRlO1xuICBsb2Rhc2gub25jZSA9IG9uY2U7XG4gIGxvZGFzaC5waWNrID0gcGljaztcbiAgbG9kYXNoLnNsaWNlID0gc2xpY2U7XG4gIGxvZGFzaC5zb3J0QnkgPSBzb3J0Qnk7XG4gIGxvZGFzaC50YXAgPSB0YXA7XG4gIGxvZGFzaC50aHJ1ID0gdGhydTtcbiAgbG9kYXNoLnRvQXJyYXkgPSB0b0FycmF5O1xuICBsb2Rhc2gudmFsdWVzID0gdmFsdWVzO1xuXG4gIC8vIEFkZCBhbGlhc2VzLlxuICBsb2Rhc2guZXh0ZW5kID0gYXNzaWduSW47XG5cbiAgLy8gQWRkIG1ldGhvZHMgdG8gYGxvZGFzaC5wcm90b3R5cGVgLlxuICBtaXhpbihsb2Rhc2gsIGxvZGFzaCk7XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8vIEFkZCBtZXRob2RzIHRoYXQgcmV0dXJuIHVud3JhcHBlZCB2YWx1ZXMgaW4gY2hhaW4gc2VxdWVuY2VzLlxuICBsb2Rhc2guY2xvbmUgPSBjbG9uZTtcbiAgbG9kYXNoLmVzY2FwZSA9IGVzY2FwZTtcbiAgbG9kYXNoLmV2ZXJ5ID0gZXZlcnk7XG4gIGxvZGFzaC5maW5kID0gZmluZDtcbiAgbG9kYXNoLmZvckVhY2ggPSBmb3JFYWNoO1xuICBsb2Rhc2guaGFzID0gaGFzO1xuICBsb2Rhc2guaGVhZCA9IGhlYWQ7XG4gIGxvZGFzaC5pZGVudGl0eSA9IGlkZW50aXR5O1xuICBsb2Rhc2guaW5kZXhPZiA9IGluZGV4T2Y7XG4gIGxvZGFzaC5pc0FyZ3VtZW50cyA9IGlzQXJndW1lbnRzO1xuICBsb2Rhc2guaXNBcnJheSA9IGlzQXJyYXk7XG4gIGxvZGFzaC5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG4gIGxvZGFzaC5pc0RhdGUgPSBpc0RhdGU7XG4gIGxvZGFzaC5pc0VtcHR5ID0gaXNFbXB0eTtcbiAgbG9kYXNoLmlzRXF1YWwgPSBpc0VxdWFsO1xuICBsb2Rhc2guaXNGaW5pdGUgPSBpc0Zpbml0ZTtcbiAgbG9kYXNoLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuICBsb2Rhc2guaXNOYU4gPSBpc05hTjtcbiAgbG9kYXNoLmlzTnVsbCA9IGlzTnVsbDtcbiAgbG9kYXNoLmlzTnVtYmVyID0gaXNOdW1iZXI7XG4gIGxvZGFzaC5pc09iamVjdCA9IGlzT2JqZWN0O1xuICBsb2Rhc2guaXNSZWdFeHAgPSBpc1JlZ0V4cDtcbiAgbG9kYXNoLmlzU3RyaW5nID0gaXNTdHJpbmc7XG4gIGxvZGFzaC5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuICBsb2Rhc2gubGFzdCA9IGxhc3Q7XG4gIGxvZGFzaC5tYXggPSBtYXg7XG4gIGxvZGFzaC5taW4gPSBtaW47XG4gIGxvZGFzaC5ub0NvbmZsaWN0ID0gbm9Db25mbGljdDtcbiAgbG9kYXNoLm5vb3AgPSBub29wO1xuICBsb2Rhc2gucmVkdWNlID0gcmVkdWNlO1xuICBsb2Rhc2gucmVzdWx0ID0gcmVzdWx0O1xuICBsb2Rhc2guc2l6ZSA9IHNpemU7XG4gIGxvZGFzaC5zb21lID0gc29tZTtcbiAgbG9kYXNoLnVuaXF1ZUlkID0gdW5pcXVlSWQ7XG5cbiAgLy8gQWRkIGFsaWFzZXMuXG4gIGxvZGFzaC5lYWNoID0gZm9yRWFjaDtcbiAgbG9kYXNoLmZpcnN0ID0gaGVhZDtcblxuICBtaXhpbihsb2Rhc2gsIChmdW5jdGlvbigpIHtcbiAgICB2YXIgc291cmNlID0ge307XG4gICAgYmFzZUZvck93bihsb2Rhc2gsIGZ1bmN0aW9uKGZ1bmMsIG1ldGhvZE5hbWUpIHtcbiAgICAgIGlmICghaGFzT3duUHJvcGVydHkuY2FsbChsb2Rhc2gucHJvdG90eXBlLCBtZXRob2ROYW1lKSkge1xuICAgICAgICBzb3VyY2VbbWV0aG9kTmFtZV0gPSBmdW5jO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzb3VyY2U7XG4gIH0oKSksIHsgJ2NoYWluJzogZmFsc2UgfSk7XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKlxuICAgKiBUaGUgc2VtYW50aWMgdmVyc2lvbiBudW1iZXIuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIGxvZGFzaC5WRVJTSU9OID0gVkVSU0lPTjtcblxuICAvLyBBZGQgYEFycmF5YCBtZXRob2RzIHRvIGBsb2Rhc2gucHJvdG90eXBlYC5cbiAgYmFzZUVhY2goWydwb3AnLCAnam9pbicsICdyZXBsYWNlJywgJ3JldmVyc2UnLCAnc3BsaXQnLCAncHVzaCcsICdzaGlmdCcsICdzb3J0JywgJ3NwbGljZScsICd1bnNoaWZ0J10sIGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICB2YXIgZnVuYyA9ICgvXig/OnJlcGxhY2V8c3BsaXQpJC8udGVzdChtZXRob2ROYW1lKSA/IFN0cmluZy5wcm90b3R5cGUgOiBhcnJheVByb3RvKVttZXRob2ROYW1lXSxcbiAgICAgICAgY2hhaW5OYW1lID0gL14oPzpwdXNofHNvcnR8dW5zaGlmdCkkLy50ZXN0KG1ldGhvZE5hbWUpID8gJ3RhcCcgOiAndGhydScsXG4gICAgICAgIHJldFVud3JhcHBlZCA9IC9eKD86cG9wfGpvaW58cmVwbGFjZXxzaGlmdCkkLy50ZXN0KG1ldGhvZE5hbWUpO1xuXG4gICAgbG9kYXNoLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBpZiAocmV0VW53cmFwcGVkICYmICF0aGlzLl9fY2hhaW5fXykge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnZhbHVlKCk7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbXSwgYXJncyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1tjaGFpbk5hbWVdKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbXSwgYXJncyk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBBZGQgY2hhaW4gc2VxdWVuY2UgbWV0aG9kcyB0byB0aGUgYGxvZGFzaGAgd3JhcHBlci5cbiAgbG9kYXNoLnByb3RvdHlwZS50b0pTT04gPSBsb2Rhc2gucHJvdG90eXBlLnZhbHVlT2YgPSBsb2Rhc2gucHJvdG90eXBlLnZhbHVlID0gd3JhcHBlclZhbHVlO1xuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIGNvbmRpdGlvbiBwYXR0ZXJucyBsaWtlOlxuICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBFeHBvc2UgTG9kYXNoIG9uIHRoZSBnbG9iYWwgb2JqZWN0IHRvIHByZXZlbnQgZXJyb3JzIHdoZW4gTG9kYXNoIGlzXG4gICAgLy8gbG9hZGVkIGJ5IGEgc2NyaXB0IHRhZyBpbiB0aGUgcHJlc2VuY2Ugb2YgYW4gQU1EIGxvYWRlci5cbiAgICAvLyBTZWUgaHR0cDovL3JlcXVpcmVqcy5vcmcvZG9jcy9lcnJvcnMuaHRtbCNtaXNtYXRjaCBmb3IgbW9yZSBkZXRhaWxzLlxuICAgIC8vIFVzZSBgXy5ub0NvbmZsaWN0YCB0byByZW1vdmUgTG9kYXNoIGZyb20gdGhlIGdsb2JhbCBvYmplY3QuXG4gICAgcm9vdC5fID0gbG9kYXNoO1xuXG4gICAgLy8gRGVmaW5lIGFzIGFuIGFub255bW91cyBtb2R1bGUgc28sIHRocm91Z2ggcGF0aCBtYXBwaW5nLCBpdCBjYW4gYmVcbiAgICAvLyByZWZlcmVuY2VkIGFzIHRoZSBcInVuZGVyc2NvcmVcIiBtb2R1bGUuXG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGxvZGFzaDtcbiAgICB9KTtcbiAgfVxuICAvLyBDaGVjayBmb3IgYGV4cG9ydHNgIGFmdGVyIGBkZWZpbmVgIGluIGNhc2UgYSBidWlsZCBvcHRpbWl6ZXIgYWRkcyBpdC5cbiAgZWxzZSBpZiAoZnJlZU1vZHVsZSkge1xuICAgIC8vIEV4cG9ydCBmb3IgTm9kZS5qcy5cbiAgICAoZnJlZU1vZHVsZS5leHBvcnRzID0gbG9kYXNoKS5fID0gbG9kYXNoO1xuICAgIC8vIEV4cG9ydCBmb3IgQ29tbW9uSlMgc3VwcG9ydC5cbiAgICBmcmVlRXhwb3J0cy5fID0gbG9kYXNoO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIEV4cG9ydCB0byB0aGUgZ2xvYmFsIG9iamVjdC5cbiAgICByb290Ll8gPSBsb2Rhc2g7XG4gIH1cbn0uY2FsbCh0aGlzKSk7XG4iXX0=