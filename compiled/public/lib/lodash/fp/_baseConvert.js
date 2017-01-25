'use strict';

var mapping = require('./_mapping'),
    fallbackHolder = require('./placeholder');

/** Built-in value reference. */
var push = Array.prototype.push;

/**
 * Creates a function, with an arity of `n`, that invokes `func` with the
 * arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} n The arity of the new function.
 * @returns {Function} Returns the new function.
 */
function baseArity(func, n) {
  return n == 2 ? function (a, b) {
    return func.apply(undefined, arguments);
  } : function (a) {
    return func.apply(undefined, arguments);
  };
}

/**
 * Creates a function that invokes `func`, with up to `n` arguments, ignoring
 * any additional arguments.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @param {number} n The arity cap.
 * @returns {Function} Returns the new function.
 */
function baseAry(func, n) {
  return n == 2 ? function (a, b) {
    return func(a, b);
  } : function (a) {
    return func(a);
  };
}

/**
 * Creates a clone of `array`.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the cloned array.
 */
function cloneArray(array) {
  var length = array ? array.length : 0,
      result = Array(length);

  while (length--) {
    result[length] = array[length];
  }
  return result;
}

/**
 * Creates a function that clones a given object using the assignment `func`.
 *
 * @private
 * @param {Function} func The assignment function.
 * @returns {Function} Returns the new cloner function.
 */
function createCloner(func) {
  return function (object) {
    return func({}, object);
  };
}

/**
 * A specialized version of `_.spread` which flattens the spread array into
 * the arguments of the invoked `func`.
 *
 * @private
 * @param {Function} func The function to spread arguments over.
 * @param {number} start The start position of the spread.
 * @returns {Function} Returns the new function.
 */
function flatSpread(func, start) {
  return function () {
    var length = arguments.length,
        lastIndex = length - 1,
        args = Array(length);

    while (length--) {
      args[length] = arguments[length];
    }
    var array = args[start],
        otherArgs = args.slice(0, start);

    if (array) {
      push.apply(otherArgs, array);
    }
    if (start != lastIndex) {
      push.apply(otherArgs, args.slice(start + 1));
    }
    return func.apply(this, otherArgs);
  };
}

/**
 * Creates a function that wraps `func` and uses `cloner` to clone the first
 * argument it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} cloner The function to clone arguments.
 * @returns {Function} Returns the new immutable function.
 */
function wrapImmutable(func, cloner) {
  return function () {
    var length = arguments.length;
    if (!length) {
      return;
    }
    var args = Array(length);
    while (length--) {
      args[length] = arguments[length];
    }
    var result = args[0] = cloner.apply(undefined, args);
    func.apply(undefined, args);
    return result;
  };
}

/**
 * The base implementation of `convert` which accepts a `util` object of methods
 * required to perform conversions.
 *
 * @param {Object} util The util object.
 * @param {string} name The name of the function to convert.
 * @param {Function} func The function to convert.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
 * @param {boolean} [options.curry=true] Specify currying.
 * @param {boolean} [options.fixed=true] Specify fixed arity.
 * @param {boolean} [options.immutable=true] Specify immutable operations.
 * @param {boolean} [options.rearg=true] Specify rearranging arguments.
 * @returns {Function|Object} Returns the converted function or object.
 */
function baseConvert(util, name, func, options) {
  var setPlaceholder,
      isLib = typeof name == 'function',
      isObj = name === Object(name);

  if (isObj) {
    options = func;
    func = name;
    name = undefined;
  }
  if (func == null) {
    throw new TypeError();
  }
  options || (options = {});

  var config = {
    'cap': 'cap' in options ? options.cap : true,
    'curry': 'curry' in options ? options.curry : true,
    'fixed': 'fixed' in options ? options.fixed : true,
    'immutable': 'immutable' in options ? options.immutable : true,
    'rearg': 'rearg' in options ? options.rearg : true
  };

  var forceCurry = 'curry' in options && options.curry,
      forceFixed = 'fixed' in options && options.fixed,
      forceRearg = 'rearg' in options && options.rearg,
      placeholder = isLib ? func : fallbackHolder,
      pristine = isLib ? func.runInContext() : undefined;

  var helpers = isLib ? func : {
    'ary': util.ary,
    'assign': util.assign,
    'clone': util.clone,
    'curry': util.curry,
    'forEach': util.forEach,
    'isArray': util.isArray,
    'isFunction': util.isFunction,
    'iteratee': util.iteratee,
    'keys': util.keys,
    'rearg': util.rearg,
    'toInteger': util.toInteger,
    'toPath': util.toPath
  };

  var ary = helpers.ary,
      assign = helpers.assign,
      clone = helpers.clone,
      curry = helpers.curry,
      each = helpers.forEach,
      isArray = helpers.isArray,
      isFunction = helpers.isFunction,
      keys = helpers.keys,
      rearg = helpers.rearg,
      toInteger = helpers.toInteger,
      toPath = helpers.toPath;

  var aryMethodKeys = keys(mapping.aryMethod);

  var wrappers = {
    'castArray': function castArray(_castArray) {
      return function () {
        var value = arguments[0];
        return isArray(value) ? _castArray(cloneArray(value)) : _castArray.apply(undefined, arguments);
      };
    },
    'iteratee': function iteratee(_iteratee) {
      return function () {
        var func = arguments[0],
            arity = arguments[1],
            result = _iteratee(func, arity),
            length = result.length;

        if (config.cap && typeof arity == 'number') {
          arity = arity > 2 ? arity - 2 : 1;
          return length && length <= arity ? result : baseAry(result, arity);
        }
        return result;
      };
    },
    'mixin': function mixin(_mixin) {
      return function (source) {
        var func = this;
        if (!isFunction(func)) {
          return _mixin(func, Object(source));
        }
        var pairs = [];
        each(keys(source), function (key) {
          if (isFunction(source[key])) {
            pairs.push([key, func.prototype[key]]);
          }
        });

        _mixin(func, Object(source));

        each(pairs, function (pair) {
          var value = pair[1];
          if (isFunction(value)) {
            func.prototype[pair[0]] = value;
          } else {
            delete func.prototype[pair[0]];
          }
        });
        return func;
      };
    },
    'nthArg': function nthArg(_nthArg) {
      return function (n) {
        var arity = n < 0 ? 1 : toInteger(n) + 1;
        return curry(_nthArg(n), arity);
      };
    },
    'rearg': function rearg(_rearg) {
      return function (func, indexes) {
        var arity = indexes ? indexes.length : 0;
        return curry(_rearg(func, indexes), arity);
      };
    },
    'runInContext': function runInContext(_runInContext) {
      return function (context) {
        return baseConvert(util, _runInContext(context), options);
      };
    }
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Casts `func` to a function with an arity capped iteratee if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @returns {Function} Returns the cast function.
   */
  function castCap(name, func) {
    if (config.cap) {
      var indexes = mapping.iterateeRearg[name];
      if (indexes) {
        return iterateeRearg(func, indexes);
      }
      var n = !isLib && mapping.iterateeAry[name];
      if (n) {
        return iterateeAry(func, n);
      }
    }
    return func;
  }

  /**
   * Casts `func` to a curried function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castCurry(name, func, n) {
    return forceCurry || config.curry && n > 1 ? curry(func, n) : func;
  }

  /**
   * Casts `func` to a fixed arity function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the cast function.
   */
  function castFixed(name, func, n) {
    if (config.fixed && (forceFixed || !mapping.skipFixed[name])) {
      var data = mapping.methodSpread[name],
          start = data && data.start;

      return start === undefined ? ary(func, n) : flatSpread(func, start);
    }
    return func;
  }

  /**
   * Casts `func` to an rearged function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castRearg(name, func, n) {
    return config.rearg && n > 1 && (forceRearg || !mapping.skipRearg[name]) ? rearg(func, mapping.methodRearg[name] || mapping.aryRearg[n]) : func;
  }

  /**
   * Creates a clone of `object` by `path`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {Array|string} path The path to clone by.
   * @returns {Object} Returns the cloned object.
   */
  function cloneByPath(object, path) {
    path = toPath(path);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        result = clone(Object(object)),
        nested = result;

    while (nested != null && ++index < length) {
      var key = path[index],
          value = nested[key];

      if (value != null) {
        nested[path[index]] = clone(index == lastIndex ? value : Object(value));
      }
      nested = nested[key];
    }
    return result;
  }

  /**
   * Converts `lodash` to an immutable auto-curried iteratee-first data-last
   * version with conversion `options` applied.
   *
   * @param {Object} [options] The options object. See `baseConvert` for more details.
   * @returns {Function} Returns the converted `lodash`.
   */
  function convertLib(options) {
    return _.runInContext.convert(options)(undefined);
  }

  /**
   * Create a converter function for `func` of `name`.
   *
   * @param {string} name The name of the function to convert.
   * @param {Function} func The function to convert.
   * @returns {Function} Returns the new converter function.
   */
  function createConverter(name, func) {
    var realName = mapping.aliasToReal[name] || name,
        methodName = mapping.remap[realName] || realName,
        oldOptions = options;

    return function (options) {
      var newUtil = isLib ? pristine : helpers,
          newFunc = isLib ? pristine[methodName] : func,
          newOptions = assign(assign({}, oldOptions), options);

      return baseConvert(newUtil, realName, newFunc, newOptions);
    };
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
   * arguments, ignoring any additional arguments.
   *
   * @private
   * @param {Function} func The function to cap iteratee arguments for.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the new function.
   */
  function iterateeAry(func, n) {
    return overArg(func, function (func) {
      return typeof func == 'function' ? baseAry(func, n) : func;
    });
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee with arguments
   * arranged according to the specified `indexes` where the argument value at
   * the first index is provided as the first argument, the argument value at
   * the second index is provided as the second argument, and so on.
   *
   * @private
   * @param {Function} func The function to rearrange iteratee arguments for.
   * @param {number[]} indexes The arranged argument indexes.
   * @returns {Function} Returns the new function.
   */
  function iterateeRearg(func, indexes) {
    return overArg(func, function (func) {
      var n = indexes.length;
      return baseArity(rearg(baseAry(func, n), indexes), n);
    });
  }

  /**
   * Creates a function that invokes `func` with its first argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function () {
      var length = arguments.length;
      if (!length) {
        return func();
      }
      var args = Array(length);
      while (length--) {
        args[length] = arguments[length];
      }
      var index = config.rearg ? 0 : length - 1;
      args[index] = transform(args[index]);
      return func.apply(undefined, args);
    };
  }

  /**
   * Creates a function that wraps `func` and applys the conversions
   * rules by `name`.
   *
   * @private
   * @param {string} name The name of the function to wrap.
   * @param {Function} func The function to wrap.
   * @returns {Function} Returns the converted function.
   */
  function wrap(name, func) {
    var result,
        realName = mapping.aliasToReal[name] || name,
        wrapped = func,
        wrapper = wrappers[realName];

    if (wrapper) {
      wrapped = wrapper(func);
    } else if (config.immutable) {
      if (mapping.mutate.array[realName]) {
        wrapped = wrapImmutable(func, cloneArray);
      } else if (mapping.mutate.object[realName]) {
        wrapped = wrapImmutable(func, createCloner(func));
      } else if (mapping.mutate.set[realName]) {
        wrapped = wrapImmutable(func, cloneByPath);
      }
    }
    each(aryMethodKeys, function (aryKey) {
      each(mapping.aryMethod[aryKey], function (otherName) {
        if (realName == otherName) {
          var data = mapping.methodSpread[realName],
              afterRearg = data && data.afterRearg;

          result = afterRearg ? castFixed(realName, castRearg(realName, wrapped, aryKey), aryKey) : castRearg(realName, castFixed(realName, wrapped, aryKey), aryKey);

          result = castCap(realName, result);
          result = castCurry(realName, result, aryKey);
          return false;
        }
      });
      return !result;
    });

    result || (result = wrapped);
    if (result == func) {
      result = forceCurry ? curry(result, 1) : function () {
        return func.apply(this, arguments);
      };
    }
    result.convert = createConverter(realName, func);
    if (mapping.placeholder[realName]) {
      setPlaceholder = true;
      result.placeholder = func.placeholder = placeholder;
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  if (!isObj) {
    return wrap(name, func);
  }
  var _ = func;

  // Convert methods by ary cap.
  var pairs = [];
  each(aryMethodKeys, function (aryKey) {
    each(mapping.aryMethod[aryKey], function (key) {
      var func = _[mapping.remap[key] || key];
      if (func) {
        pairs.push([key, wrap(key, func)]);
      }
    });
  });

  // Convert remaining methods.
  each(keys(_), function (key) {
    var func = _[key];
    if (typeof func == 'function') {
      var length = pairs.length;
      while (length--) {
        if (pairs[length][0] == key) {
          return;
        }
      }
      func.convert = createConverter(key, func);
      pairs.push([key, func]);
    }
  });

  // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
  each(pairs, function (pair) {
    _[pair[0]] = pair[1];
  });

  _.convert = convertLib;
  if (setPlaceholder) {
    _.placeholder = placeholder;
  }
  // Assign aliases.
  each(keys(_), function (key) {
    each(mapping.realToAlias[key] || [], function (alias) {
      _[alias] = _[key];
    });
  });

  return _;
}

module.exports = baseConvert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ZwL19iYXNlQ29udmVydC5qcyJdLCJuYW1lcyI6WyJtYXBwaW5nIiwicmVxdWlyZSIsImZhbGxiYWNrSG9sZGVyIiwicHVzaCIsIkFycmF5IiwicHJvdG90eXBlIiwiYmFzZUFyaXR5IiwiZnVuYyIsIm4iLCJhIiwiYiIsImFwcGx5IiwidW5kZWZpbmVkIiwiYXJndW1lbnRzIiwiYmFzZUFyeSIsImNsb25lQXJyYXkiLCJhcnJheSIsImxlbmd0aCIsInJlc3VsdCIsImNyZWF0ZUNsb25lciIsIm9iamVjdCIsImZsYXRTcHJlYWQiLCJzdGFydCIsImxhc3RJbmRleCIsImFyZ3MiLCJvdGhlckFyZ3MiLCJzbGljZSIsIndyYXBJbW11dGFibGUiLCJjbG9uZXIiLCJiYXNlQ29udmVydCIsInV0aWwiLCJuYW1lIiwib3B0aW9ucyIsInNldFBsYWNlaG9sZGVyIiwiaXNMaWIiLCJpc09iaiIsIk9iamVjdCIsIlR5cGVFcnJvciIsImNvbmZpZyIsImNhcCIsImN1cnJ5IiwiZml4ZWQiLCJpbW11dGFibGUiLCJyZWFyZyIsImZvcmNlQ3VycnkiLCJmb3JjZUZpeGVkIiwiZm9yY2VSZWFyZyIsInBsYWNlaG9sZGVyIiwicHJpc3RpbmUiLCJydW5JbkNvbnRleHQiLCJoZWxwZXJzIiwiYXJ5IiwiYXNzaWduIiwiY2xvbmUiLCJmb3JFYWNoIiwiaXNBcnJheSIsImlzRnVuY3Rpb24iLCJpdGVyYXRlZSIsImtleXMiLCJ0b0ludGVnZXIiLCJ0b1BhdGgiLCJlYWNoIiwiYXJ5TWV0aG9kS2V5cyIsImFyeU1ldGhvZCIsIndyYXBwZXJzIiwiY2FzdEFycmF5IiwidmFsdWUiLCJhcml0eSIsIm1peGluIiwic291cmNlIiwicGFpcnMiLCJrZXkiLCJwYWlyIiwibnRoQXJnIiwiaW5kZXhlcyIsImNvbnRleHQiLCJjYXN0Q2FwIiwiaXRlcmF0ZWVSZWFyZyIsIml0ZXJhdGVlQXJ5IiwiY2FzdEN1cnJ5IiwiY2FzdEZpeGVkIiwic2tpcEZpeGVkIiwiZGF0YSIsIm1ldGhvZFNwcmVhZCIsImNhc3RSZWFyZyIsInNraXBSZWFyZyIsIm1ldGhvZFJlYXJnIiwiYXJ5UmVhcmciLCJjbG9uZUJ5UGF0aCIsInBhdGgiLCJpbmRleCIsIm5lc3RlZCIsImNvbnZlcnRMaWIiLCJfIiwiY29udmVydCIsImNyZWF0ZUNvbnZlcnRlciIsInJlYWxOYW1lIiwiYWxpYXNUb1JlYWwiLCJtZXRob2ROYW1lIiwicmVtYXAiLCJvbGRPcHRpb25zIiwibmV3VXRpbCIsIm5ld0Z1bmMiLCJuZXdPcHRpb25zIiwib3ZlckFyZyIsInRyYW5zZm9ybSIsIndyYXAiLCJ3cmFwcGVkIiwid3JhcHBlciIsIm11dGF0ZSIsInNldCIsImFyeUtleSIsIm90aGVyTmFtZSIsImFmdGVyUmVhcmciLCJyZWFsVG9BbGlhcyIsImFsaWFzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxVQUFVQyxRQUFRLFlBQVIsQ0FBZDtBQUFBLElBQ0lDLGlCQUFpQkQsUUFBUSxlQUFSLENBRHJCOztBQUdBO0FBQ0EsSUFBSUUsT0FBT0MsTUFBTUMsU0FBTixDQUFnQkYsSUFBM0I7O0FBRUE7Ozs7Ozs7OztBQVNBLFNBQVNHLFNBQVQsQ0FBbUJDLElBQW5CLEVBQXlCQyxDQUF6QixFQUE0QjtBQUMxQixTQUFPQSxLQUFLLENBQUwsR0FDSCxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZTtBQUFFLFdBQU9ILEtBQUtJLEtBQUwsQ0FBV0MsU0FBWCxFQUFzQkMsU0FBdEIsQ0FBUDtBQUEwQyxHQUR4RCxHQUVILFVBQVNKLENBQVQsRUFBWTtBQUFFLFdBQU9GLEtBQUtJLEtBQUwsQ0FBV0MsU0FBWCxFQUFzQkMsU0FBdEIsQ0FBUDtBQUEwQyxHQUY1RDtBQUdEOztBQUVEOzs7Ozs7Ozs7QUFTQSxTQUFTQyxPQUFULENBQWlCUCxJQUFqQixFQUF1QkMsQ0FBdkIsRUFBMEI7QUFDeEIsU0FBT0EsS0FBSyxDQUFMLEdBQ0gsVUFBU0MsQ0FBVCxF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QUFDRCxHQUZEOztBQUlBcUIsSUFBRUMsT0FBRixHQUFZRixVQUFaO0FBQ0EsTUFBSTNELGNBQUosRUFBb0I7QUFDbEI0RCxNQUFFOUMsV0FBRixHQUFnQkEsV0FBaEI7QUFDRDtBQUNEO0FBQ0FjLE9BQUtILEtBQUttQyxDQUFMLENBQUwsRUFBYyxVQUFTdEIsR0FBVCxFQUFjO0FBQzFCVixTQUFLN0QsUUFBUWtILFdBQVIsQ0FBb0IzQyxHQUFwQixLQUE0QixFQUFqQyxFQUFxQyxVQUFTNEMsS0FBVCxFQUFnQjtBQUNuRHRCLFFBQUVzQixLQUFGLElBQVd0QixFQUFFdEIsR0FBRixDQUFYO0FBQ0QsS0FGRDtBQUdELEdBSkQ7O0FBTUEsU0FBT3NCLENBQVA7QUFDRDs7QUFFRHVCLE9BQU9DLE9BQVAsR0FBaUJ4RixXQUFqQiIsImZpbGUiOiJfYmFzZUNvbnZlcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbWFwcGluZyA9IHJlcXVpcmUoJy4vX21hcHBpbmcnKSxcbiAgICBmYWxsYmFja0hvbGRlciA9IHJlcXVpcmUoJy4vcGxhY2Vob2xkZXInKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZS4gKi9cbnZhciBwdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uLCB3aXRoIGFuIGFyaXR5IG9mIGBuYCwgdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIHRoZVxuICogYXJndW1lbnRzIGl0IHJlY2VpdmVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIGFyaXR5IG9mIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZUFyaXR5KGZ1bmMsIG4pIHtcbiAgcmV0dXJuIG4gPT0gMlxuICAgID8gZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7IH1cbiAgICA6IGZ1bmN0aW9uKGEpIHsgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpOyB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgLCB3aXRoIHVwIHRvIGBuYCBhcmd1bWVudHMsIGlnbm9yaW5nXG4gKiBhbnkgYWRkaXRpb25hbCBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIGFyaXR5IGNhcC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlQXJ5KGZ1bmMsIG4pIHtcbiAgcmV0dXJuIG4gPT0gMlxuICAgID8gZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gZnVuYyhhLCBiKTsgfVxuICAgIDogZnVuY3Rpb24oYSkgeyByZXR1cm4gZnVuYyhhKTsgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjbG9uZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQXJyYXkoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgcmVzdWx0W2xlbmd0aF0gPSBhcnJheVtsZW5ndGhdO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgY2xvbmVzIGEgZ2l2ZW4gb2JqZWN0IHVzaW5nIHRoZSBhc3NpZ25tZW50IGBmdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgYXNzaWdubWVudCBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNsb25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2xvbmVyKGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBmdW5jKHt9LCBvYmplY3QpO1xuICB9O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zcHJlYWRgIHdoaWNoIGZsYXR0ZW5zIHRoZSBzcHJlYWQgYXJyYXkgaW50b1xuICogdGhlIGFyZ3VtZW50cyBvZiB0aGUgaW52b2tlZCBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHNwcmVhZCBhcmd1bWVudHMgb3Zlci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHNwcmVhZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBmbGF0U3ByZWFkKGZ1bmMsIHN0YXJ0KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgICAgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMSxcbiAgICAgICAgYXJncyA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIGFyZ3NbbGVuZ3RoXSA9IGFyZ3VtZW50c1tsZW5ndGhdO1xuICAgIH1cbiAgICB2YXIgYXJyYXkgPSBhcmdzW3N0YXJ0XSxcbiAgICAgICAgb3RoZXJBcmdzID0gYXJncy5zbGljZSgwLCBzdGFydCk7XG5cbiAgICBpZiAoYXJyYXkpIHtcbiAgICAgIHB1c2guYXBwbHkob3RoZXJBcmdzLCBhcnJheSk7XG4gICAgfVxuICAgIGlmIChzdGFydCAhPSBsYXN0SW5kZXgpIHtcbiAgICAgIHB1c2guYXBwbHkob3RoZXJBcmdzLCBhcmdzLnNsaWNlKHN0YXJ0ICsgMSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHdyYXBzIGBmdW5jYCBhbmQgdXNlcyBgY2xvbmVyYCB0byBjbG9uZSB0aGUgZmlyc3RcbiAqIGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVyIFRoZSBmdW5jdGlvbiB0byBjbG9uZSBhcmd1bWVudHMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBpbW11dGFibGUgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHdyYXBJbW11dGFibGUoZnVuYywgY2xvbmVyKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYXJncyA9IEFycmF5KGxlbmd0aCk7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICBhcmdzW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGFyZ3NbMF0gPSBjbG9uZXIuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgY29udmVydGAgd2hpY2ggYWNjZXB0cyBhIGB1dGlsYCBvYmplY3Qgb2YgbWV0aG9kc1xuICogcmVxdWlyZWQgdG8gcGVyZm9ybSBjb252ZXJzaW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdXRpbCBUaGUgdXRpbCBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24gdG8gY29udmVydC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuY2FwPXRydWVdIFNwZWNpZnkgY2FwcGluZyBpdGVyYXRlZSBhcmd1bWVudHMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmN1cnJ5PXRydWVdIFNwZWNpZnkgY3VycnlpbmcuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmZpeGVkPXRydWVdIFNwZWNpZnkgZml4ZWQgYXJpdHkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmltbXV0YWJsZT10cnVlXSBTcGVjaWZ5IGltbXV0YWJsZSBvcGVyYXRpb25zLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yZWFyZz10cnVlXSBTcGVjaWZ5IHJlYXJyYW5naW5nIGFyZ3VtZW50cy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbnxPYmplY3R9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBmdW5jdGlvbiBvciBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDb252ZXJ0KHV0aWwsIG5hbWUsIGZ1bmMsIG9wdGlvbnMpIHtcbiAgdmFyIHNldFBsYWNlaG9sZGVyLFxuICAgICAgaXNMaWIgPSB0eXBlb2YgbmFtZSA9PSAnZnVuY3Rpb24nLFxuICAgICAgaXNPYmogPSBuYW1lID09PSBPYmplY3QobmFtZSk7XG5cbiAgaWYgKGlzT2JqKSB7XG4gICAgb3B0aW9ucyA9IGZ1bmM7XG4gICAgZnVuYyA9IG5hbWU7XG4gICAgbmFtZSA9IHVuZGVmaW5lZDtcbiAgfVxuICBpZiAoZnVuYyA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgfVxuICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xuXG4gIHZhciBjb25maWcgPSB7XG4gICAgJ2NhcCc6ICdjYXAnIGluIG9wdGlvbnMgPyBvcHRpb25zLmNhcCA6IHRydWUsXG4gICAgJ2N1cnJ5JzogJ2N1cnJ5JyBpbiBvcHRpb25zID8gb3B0aW9ucy5jdXJyeSA6IHRydWUsXG4gICAgJ2ZpeGVkJzogJ2ZpeGVkJyBpbiBvcHRpb25zID8gb3B0aW9ucy5maXhlZCA6IHRydWUsXG4gICAgJ2ltbXV0YWJsZSc6ICdpbW11dGFibGUnIGluIG9wdGlvbnMgPyBvcHRpb25zLmltbXV0YWJsZSA6IHRydWUsXG4gICAgJ3JlYXJnJzogJ3JlYXJnJyBpbiBvcHRpb25zID8gb3B0aW9ucy5yZWFyZyA6IHRydWVcbiAgfTtcblxuICB2YXIgZm9yY2VDdXJyeSA9ICgnY3VycnknIGluIG9wdGlvbnMpICYmIG9wdGlvbnMuY3VycnksXG4gICAgICBmb3JjZUZpeGVkID0gKCdmaXhlZCcgaW4gb3B0aW9ucykgJiYgb3B0aW9ucy5maXhlZCxcbiAgICAgIGZvcmNlUmVhcmcgPSAoJ3JlYXJnJyBpbiBvcHRpb25zKSAmJiBvcHRpb25zLnJlYXJnLFxuICAgICAgcGxhY2Vob2xkZXIgPSBpc0xpYiA/IGZ1bmMgOiBmYWxsYmFja0hvbGRlcixcbiAgICAgIHByaXN0aW5lID0gaXNMaWIgPyBmdW5jLnJ1bkluQ29udGV4dCgpIDogdW5kZWZpbmVkO1xuXG4gIHZhciBoZWxwZXJzID0gaXNMaWIgPyBmdW5jIDoge1xuICAgICdhcnknOiB1dGlsLmFyeSxcbiAgICAnYXNzaWduJzogdXRpbC5hc3NpZ24sXG4gICAgJ2Nsb25lJzogdXRpbC5jbG9uZSxcbiAgICAnY3VycnknOiB1dGlsLmN1cnJ5LFxuICAgICdmb3JFYWNoJzogdXRpbC5mb3JFYWNoLFxuICAgICdpc0FycmF5JzogdXRpbC5pc0FycmF5LFxuICAgICdpc0Z1bmN0aW9uJzogdXRpbC5pc0Z1bmN0aW9uLFxuICAgICdpdGVyYXRlZSc6IHV0aWwuaXRlcmF0ZWUsXG4gICAgJ2tleXMnOiB1dGlsLmtleXMsXG4gICAgJ3JlYXJnJzogdXRpbC5yZWFyZyxcbiAgICAndG9JbnRlZ2VyJzogdXRpbC50b0ludGVnZXIsXG4gICAgJ3RvUGF0aCc6IHV0aWwudG9QYXRoXG4gIH07XG5cbiAgdmFyIGFyeSA9IGhlbHBlcnMuYXJ5LFxuICAgICAgYXNzaWduID0gaGVscGVycy5hc3NpZ24sXG4gICAgICBjbG9uZSA9IGhlbHBlcnMuY2xvbmUsXG4gICAgICBjdXJyeSA9IGhlbHBlcnMuY3VycnksXG4gICAgICBlYWNoID0gaGVscGVycy5mb3JFYWNoLFxuICAgICAgaXNBcnJheSA9IGhlbHBlcnMuaXNBcnJheSxcbiAgICAgIGlzRnVuY3Rpb24gPSBoZWxwZXJzLmlzRnVuY3Rpb24sXG4gICAgICBrZXlzID0gaGVscGVycy5rZXlzLFxuICAgICAgcmVhcmcgPSBoZWxwZXJzLnJlYXJnLFxuICAgICAgdG9JbnRlZ2VyID0gaGVscGVycy50b0ludGVnZXIsXG4gICAgICB0b1BhdGggPSBoZWxwZXJzLnRvUGF0aDtcblxuICB2YXIgYXJ5TWV0aG9kS2V5cyA9IGtleXMobWFwcGluZy5hcnlNZXRob2QpO1xuXG4gIHZhciB3cmFwcGVycyA9IHtcbiAgICAnY2FzdEFycmF5JzogZnVuY3Rpb24oY2FzdEFycmF5KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkodmFsdWUpXG4gICAgICAgICAgPyBjYXN0QXJyYXkoY2xvbmVBcnJheSh2YWx1ZSkpXG4gICAgICAgICAgOiBjYXN0QXJyYXkuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9LFxuICAgICdpdGVyYXRlZSc6IGZ1bmN0aW9uKGl0ZXJhdGVlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmdW5jID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgYXJpdHkgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICByZXN1bHQgPSBpdGVyYXRlZShmdW5jLCBhcml0eSksXG4gICAgICAgICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gICAgICAgIGlmIChjb25maWcuY2FwICYmIHR5cGVvZiBhcml0eSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgIGFyaXR5ID0gYXJpdHkgPiAyID8gKGFyaXR5IC0gMikgOiAxO1xuICAgICAgICAgIHJldHVybiAobGVuZ3RoICYmIGxlbmd0aCA8PSBhcml0eSkgPyByZXN1bHQgOiBiYXNlQXJ5KHJlc3VsdCwgYXJpdHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9O1xuICAgIH0sXG4gICAgJ21peGluJzogZnVuY3Rpb24obWl4aW4pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgdmFyIGZ1bmMgPSB0aGlzO1xuICAgICAgICBpZiAoIWlzRnVuY3Rpb24oZnVuYykpIHtcbiAgICAgICAgICByZXR1cm4gbWl4aW4oZnVuYywgT2JqZWN0KHNvdXJjZSkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYWlycyA9IFtdO1xuICAgICAgICBlYWNoKGtleXMoc291cmNlKSwgZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgaWYgKGlzRnVuY3Rpb24oc291cmNlW2tleV0pKSB7XG4gICAgICAgICAgICBwYWlycy5wdXNoKFtrZXksIGZ1bmMucHJvdG90eXBlW2tleV1dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1peGluKGZ1bmMsIE9iamVjdChzb3VyY2UpKTtcblxuICAgICAgICBlYWNoKHBhaXJzLCBmdW5jdGlvbihwYWlyKSB7XG4gICAgICAgICAgdmFyIHZhbHVlID0gcGFpclsxXTtcbiAgICAgICAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgICAgIGZ1bmMucHJvdG90eXBlW3BhaXJbMF1dID0gdmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBmdW5jLnByb3RvdHlwZVtwYWlyWzBdXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnVuYztcbiAgICAgIH07XG4gICAgfSxcbiAgICAnbnRoQXJnJzogZnVuY3Rpb24obnRoQXJnKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obikge1xuICAgICAgICB2YXIgYXJpdHkgPSBuIDwgMCA/IDEgOiAodG9JbnRlZ2VyKG4pICsgMSk7XG4gICAgICAgIHJldHVybiBjdXJyeShudGhBcmcobiksIGFyaXR5KTtcbiAgICAgIH07XG4gICAgfSxcbiAgICAncmVhcmcnOiBmdW5jdGlvbihyZWFyZykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGZ1bmMsIGluZGV4ZXMpIHtcbiAgICAgICAgdmFyIGFyaXR5ID0gaW5kZXhlcyA/IGluZGV4ZXMubGVuZ3RoIDogMDtcbiAgICAgICAgcmV0dXJuIGN1cnJ5KHJlYXJnKGZ1bmMsIGluZGV4ZXMpLCBhcml0eSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgJ3J1bkluQ29udGV4dCc6IGZ1bmN0aW9uKHJ1bkluQ29udGV4dCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIGJhc2VDb252ZXJ0KHV0aWwsIHJ1bkluQ29udGV4dChjb250ZXh0KSwgb3B0aW9ucyk7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogQ2FzdHMgYGZ1bmNgIHRvIGEgZnVuY3Rpb24gd2l0aCBhbiBhcml0eSBjYXBwZWQgaXRlcmF0ZWUgaWYgbmVlZGVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24gdG8gaW5zcGVjdC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW5zcGVjdC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYXN0IGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gY2FzdENhcChuYW1lLCBmdW5jKSB7XG4gICAgaWYgKGNvbmZpZy5jYXApIHtcbiAgICAgIHZhciBpbmRleGVzID0gbWFwcGluZy5pdGVyYXRlZVJlYXJnW25hbWVdO1xuICAgICAgaWYgKGluZGV4ZXMpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdGVlUmVhcmcoZnVuYywgaW5kZXhlcyk7XG4gICAgICB9XG4gICAgICB2YXIgbiA9ICFpc0xpYiAmJiBtYXBwaW5nLml0ZXJhdGVlQXJ5W25hbWVdO1xuICAgICAgaWYgKG4pIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdGVlQXJ5KGZ1bmMsIG4pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuYztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXN0cyBgZnVuY2AgdG8gYSBjdXJyaWVkIGZ1bmN0aW9uIGlmIG5lZWRlZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBhcml0eSBvZiBgZnVuY2AuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FzdCBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGNhc3RDdXJyeShuYW1lLCBmdW5jLCBuKSB7XG4gICAgcmV0dXJuIChmb3JjZUN1cnJ5IHx8IChjb25maWcuY3VycnkgJiYgbiA+IDEpKVxuICAgICAgPyBjdXJyeShmdW5jLCBuKVxuICAgICAgOiBmdW5jO1xuICB9XG5cbiAgLyoqXG4gICAqIENhc3RzIGBmdW5jYCB0byBhIGZpeGVkIGFyaXR5IGZ1bmN0aW9uIGlmIG5lZWRlZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBhcml0eSBjYXAuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FzdCBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGNhc3RGaXhlZChuYW1lLCBmdW5jLCBuKSB7XG4gICAgaWYgKGNvbmZpZy5maXhlZCAmJiAoZm9yY2VGaXhlZCB8fCAhbWFwcGluZy5za2lwRml4ZWRbbmFtZV0pKSB7XG4gICAgICB2YXIgZGF0YSA9IG1hcHBpbmcubWV0aG9kU3ByZWFkW25hbWVdLFxuICAgICAgICAgIHN0YXJ0ID0gZGF0YSAmJiBkYXRhLnN0YXJ0O1xuXG4gICAgICByZXR1cm4gc3RhcnQgID09PSB1bmRlZmluZWQgPyBhcnkoZnVuYywgbikgOiBmbGF0U3ByZWFkKGZ1bmMsIHN0YXJ0KTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cblxuICAvKipcbiAgICogQ2FzdHMgYGZ1bmNgIHRvIGFuIHJlYXJnZWQgZnVuY3Rpb24gaWYgbmVlZGVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24gdG8gaW5zcGVjdC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW5zcGVjdC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIGFyaXR5IG9mIGBmdW5jYC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYXN0IGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gY2FzdFJlYXJnKG5hbWUsIGZ1bmMsIG4pIHtcbiAgICByZXR1cm4gKGNvbmZpZy5yZWFyZyAmJiBuID4gMSAmJiAoZm9yY2VSZWFyZyB8fCAhbWFwcGluZy5za2lwUmVhcmdbbmFtZV0pKVxuICAgICAgPyByZWFyZyhmdW5jLCBtYXBwaW5nLm1ldGhvZFJlYXJnW25hbWVdIHx8IG1hcHBpbmcuYXJ5UmVhcmdbbl0pXG4gICAgICA6IGZ1bmM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNsb25lIG9mIGBvYmplY3RgIGJ5IGBwYXRoYC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICAgKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjbG9uZSBieS5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIG9iamVjdC5cbiAgICovXG4gIGZ1bmN0aW9uIGNsb25lQnlQYXRoKG9iamVjdCwgcGF0aCkge1xuICAgIHBhdGggPSB0b1BhdGgocGF0aCk7XG5cbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGgsXG4gICAgICAgIGxhc3RJbmRleCA9IGxlbmd0aCAtIDEsXG4gICAgICAgIHJlc3VsdCA9IGNsb25lKE9iamVjdChvYmplY3QpKSxcbiAgICAgICAgbmVzdGVkID0gcmVzdWx0O1xuXG4gICAgd2hpbGUgKG5lc3RlZCAhPSBudWxsICYmICsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBrZXkgPSBwYXRoW2luZGV4XSxcbiAgICAgICAgICB2YWx1ZSA9IG5lc3RlZFtrZXldO1xuXG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICBuZXN0ZWRbcGF0aFtpbmRleF1dID0gY2xvbmUoaW5kZXggPT0gbGFzdEluZGV4ID8gdmFsdWUgOiBPYmplY3QodmFsdWUpKTtcbiAgICAgIH1cbiAgICAgIG5lc3RlZCA9IG5lc3RlZFtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGBsb2Rhc2hgIHRvIGFuIGltbXV0YWJsZSBhdXRvLWN1cnJpZWQgaXRlcmF0ZWUtZmlyc3QgZGF0YS1sYXN0XG4gICAqIHZlcnNpb24gd2l0aCBjb252ZXJzaW9uIGBvcHRpb25zYCBhcHBsaWVkLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb25zIG9iamVjdC4gU2VlIGBiYXNlQ29udmVydGAgZm9yIG1vcmUgZGV0YWlscy5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYGxvZGFzaGAuXG4gICAqL1xuICBmdW5jdGlvbiBjb252ZXJ0TGliKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gXy5ydW5JbkNvbnRleHQuY29udmVydChvcHRpb25zKSh1bmRlZmluZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGNvbnZlcnRlciBmdW5jdGlvbiBmb3IgYGZ1bmNgIG9mIGBuYW1lYC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbnZlcnRlciBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbnZlcnRlcihuYW1lLCBmdW5jKSB7XG4gICAgdmFyIHJlYWxOYW1lID0gbWFwcGluZy5hbGlhc1RvUmVhbFtuYW1lXSB8fCBuYW1lLFxuICAgICAgICBtZXRob2ROYW1lID0gbWFwcGluZy5yZW1hcFtyZWFsTmFtZV0gfHwgcmVhbE5hbWUsXG4gICAgICAgIG9sZE9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHZhciBuZXdVdGlsID0gaXNMaWIgPyBwcmlzdGluZSA6IGhlbHBlcnMsXG4gICAgICAgICAgbmV3RnVuYyA9IGlzTGliID8gcHJpc3RpbmVbbWV0aG9kTmFtZV0gOiBmdW5jLFxuICAgICAgICAgIG5ld09wdGlvbnMgPSBhc3NpZ24oYXNzaWduKHt9LCBvbGRPcHRpb25zKSwgb3B0aW9ucyk7XG5cbiAgICAgIHJldHVybiBiYXNlQ29udmVydChuZXdVdGlsLCByZWFsTmFtZSwgbmV3RnVuYywgbmV3T3B0aW9ucyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgdG8gaW52b2tlIGl0cyBpdGVyYXRlZSwgd2l0aCB1cCB0byBgbmBcbiAgICogYXJndW1lbnRzLCBpZ25vcmluZyBhbnkgYWRkaXRpb25hbCBhcmd1bWVudHMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBpdGVyYXRlZSBhcmd1bWVudHMgZm9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgYXJpdHkgY2FwLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGl0ZXJhdGVlQXJ5KGZ1bmMsIG4pIHtcbiAgICByZXR1cm4gb3ZlckFyZyhmdW5jLCBmdW5jdGlvbihmdW5jKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGZ1bmMgPT0gJ2Z1bmN0aW9uJyA/IGJhc2VBcnkoZnVuYywgbikgOiBmdW5jO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHdyYXBzIGBmdW5jYCB0byBpbnZva2UgaXRzIGl0ZXJhdGVlIHdpdGggYXJndW1lbnRzXG4gICAqIGFycmFuZ2VkIGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIGBpbmRleGVzYCB3aGVyZSB0aGUgYXJndW1lbnQgdmFsdWUgYXRcbiAgICogdGhlIGZpcnN0IGluZGV4IGlzIHByb3ZpZGVkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCwgdGhlIGFyZ3VtZW50IHZhbHVlIGF0XG4gICAqIHRoZSBzZWNvbmQgaW5kZXggaXMgcHJvdmlkZWQgYXMgdGhlIHNlY29uZCBhcmd1bWVudCwgYW5kIHNvIG9uLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byByZWFycmFuZ2UgaXRlcmF0ZWUgYXJndW1lbnRzIGZvci5cbiAgICogQHBhcmFtIHtudW1iZXJbXX0gaW5kZXhlcyBUaGUgYXJyYW5nZWQgYXJndW1lbnQgaW5kZXhlcy5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBpdGVyYXRlZVJlYXJnKGZ1bmMsIGluZGV4ZXMpIHtcbiAgICByZXR1cm4gb3ZlckFyZyhmdW5jLCBmdW5jdGlvbihmdW5jKSB7XG4gICAgICB2YXIgbiA9IGluZGV4ZXMubGVuZ3RoO1xuICAgICAgcmV0dXJuIGJhc2VBcml0eShyZWFyZyhiYXNlQXJ5KGZ1bmMsIG4pLCBpbmRleGVzKSwgbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgZmlyc3QgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZnVuYygpO1xuICAgICAgfVxuICAgICAgdmFyIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGFyZ3NbbGVuZ3RoXSA9IGFyZ3VtZW50c1tsZW5ndGhdO1xuICAgICAgfVxuICAgICAgdmFyIGluZGV4ID0gY29uZmlnLnJlYXJnID8gMCA6IChsZW5ndGggLSAxKTtcbiAgICAgIGFyZ3NbaW5kZXhdID0gdHJhbnNmb3JtKGFyZ3NbaW5kZXhdKTtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCB3cmFwcyBgZnVuY2AgYW5kIGFwcGx5cyB0aGUgY29udmVyc2lvbnNcbiAgICogcnVsZXMgYnkgYG5hbWVgLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiB3cmFwKG5hbWUsIGZ1bmMpIHtcbiAgICB2YXIgcmVzdWx0LFxuICAgICAgICByZWFsTmFtZSA9IG1hcHBpbmcuYWxpYXNUb1JlYWxbbmFtZV0gfHwgbmFtZSxcbiAgICAgICAgd3JhcHBlZCA9IGZ1bmMsXG4gICAgICAgIHdyYXBwZXIgPSB3cmFwcGVyc1tyZWFsTmFtZV07XG5cbiAgICBpZiAod3JhcHBlcikge1xuICAgICAgd3JhcHBlZCA9IHdyYXBwZXIoZnVuYyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbmZpZy5pbW11dGFibGUpIHtcbiAgICAgIGlmIChtYXBwaW5nLm11dGF0ZS5hcnJheVtyZWFsTmFtZV0pIHtcbiAgICAgICAgd3JhcHBlZCA9IHdyYXBJbW11dGFibGUoZnVuYywgY2xvbmVBcnJheSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChtYXBwaW5nLm11dGF0ZS5vYmplY3RbcmVhbE5hbWVdKSB7XG4gICAgICAgIHdyYXBwZWQgPSB3cmFwSW1tdXRhYmxlKGZ1bmMsIGNyZWF0ZUNsb25lcihmdW5jKSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChtYXBwaW5nLm11dGF0ZS5zZXRbcmVhbE5hbWVdKSB7XG4gICAgICAgIHdyYXBwZWQgPSB3cmFwSW1tdXRhYmxlKGZ1bmMsIGNsb25lQnlQYXRoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWFjaChhcnlNZXRob2RLZXlzLCBmdW5jdGlvbihhcnlLZXkpIHtcbiAgICAgIGVhY2gobWFwcGluZy5hcnlNZXRob2RbYXJ5S2V5XSwgZnVuY3Rpb24ob3RoZXJOYW1lKSB7XG4gICAgICAgIGlmIChyZWFsTmFtZSA9PSBvdGhlck5hbWUpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IG1hcHBpbmcubWV0aG9kU3ByZWFkW3JlYWxOYW1lXSxcbiAgICAgICAgICAgICAgYWZ0ZXJSZWFyZyA9IGRhdGEgJiYgZGF0YS5hZnRlclJlYXJnO1xuXG4gICAgICAgICAgcmVzdWx0ID0gYWZ0ZXJSZWFyZ1xuICAgICAgICAgICAgPyBjYXN0Rml4ZWQocmVhbE5hbWUsIGNhc3RSZWFyZyhyZWFsTmFtZSwgd3JhcHBlZCwgYXJ5S2V5KSwgYXJ5S2V5KVxuICAgICAgICAgICAgOiBjYXN0UmVhcmcocmVhbE5hbWUsIGNhc3RGaXhlZChyZWFsTmFtZSwgd3JhcHBlZCwgYXJ5S2V5KSwgYXJ5S2V5KTtcblxuICAgICAgICAgIHJlc3VsdCA9IGNhc3RDYXAocmVhbE5hbWUsIHJlc3VsdCk7XG4gICAgICAgICAgcmVzdWx0ID0gY2FzdEN1cnJ5KHJlYWxOYW1lLCByZXN1bHQsIGFyeUtleSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAhcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgcmVzdWx0IHx8IChyZXN1bHQgPSB3cmFwcGVkKTtcbiAgICBpZiAocmVzdWx0ID09IGZ1bmMpIHtcbiAgICAgIHJlc3VsdCA9IGZvcmNlQ3VycnkgPyBjdXJyeShyZXN1bHQsIDEpIDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXN1bHQuY29udmVydCA9IGNyZWF0ZUNvbnZlcnRlcihyZWFsTmFtZSwgZnVuYyk7XG4gICAgaWYgKG1hcHBpbmcucGxhY2Vob2xkZXJbcmVhbE5hbWVdKSB7XG4gICAgICBzZXRQbGFjZWhvbGRlciA9IHRydWU7XG4gICAgICByZXN1bHQucGxhY2Vob2xkZXIgPSBmdW5jLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICBpZiAoIWlzT2JqKSB7XG4gICAgcmV0dXJuIHdyYXAobmFtZSwgZnVuYyk7XG4gIH1cbiAgdmFyIF8gPSBmdW5jO1xuXG4gIC8vIENvbnZlcnQgbWV0aG9kcyBieSBhcnkgY2FwLlxuICB2YXIgcGFpcnMgPSBbXTtcbiAgZWFjaChhcnlNZXRob2RLZXlzLCBmdW5jdGlvbihhcnlLZXkpIHtcbiAgICBlYWNoKG1hcHBpbmcuYXJ5TWV0aG9kW2FyeUtleV0sIGZ1bmN0aW9uKGtleSkge1xuICAgICAgdmFyIGZ1bmMgPSBfW21hcHBpbmcucmVtYXBba2V5XSB8fCBrZXldO1xuICAgICAgaWYgKGZ1bmMpIHtcbiAgICAgICAgcGFpcnMucHVzaChba2V5LCB3cmFwKGtleSwgZnVuYyldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gQ29udmVydCByZW1haW5pbmcgbWV0aG9kcy5cbiAgZWFjaChrZXlzKF8pLCBmdW5jdGlvbihrZXkpIHtcbiAgICB2YXIgZnVuYyA9IF9ba2V5XTtcbiAgICBpZiAodHlwZW9mIGZ1bmMgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIGxlbmd0aCA9IHBhaXJzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBpZiAocGFpcnNbbGVuZ3RoXVswXSA9PSBrZXkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmMuY29udmVydCA9IGNyZWF0ZUNvbnZlcnRlcihrZXksIGZ1bmMpO1xuICAgICAgcGFpcnMucHVzaChba2V5LCBmdW5jXSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBBc3NpZ24gdG8gYF9gIGxlYXZpbmcgYF8ucHJvdG90eXBlYCB1bmNoYW5nZWQgdG8gYWxsb3cgY2hhaW5pbmcuXG4gIGVhY2gocGFpcnMsIGZ1bmN0aW9uKHBhaXIpIHtcbiAgICBfW3BhaXJbMF1dID0gcGFpclsxXTtcbiAgfSk7XG5cbiAgXy5jb252ZXJ0ID0gY29udmVydExpYjtcbiAgaWYgKHNldFBsYWNlaG9sZGVyKSB7XG4gICAgXy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICB9XG4gIC8vIEFzc2lnbiBhbGlhc2VzLlxuICBlYWNoKGtleXMoXyksIGZ1bmN0aW9uKGtleSkge1xuICAgIGVhY2gobWFwcGluZy5yZWFsVG9BbGlhc1trZXldIHx8IFtdLCBmdW5jdGlvbihhbGlhcykge1xuICAgICAgX1thbGlhc10gPSBfW2tleV07XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBfO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDb252ZXJ0O1xuIl19