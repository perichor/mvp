'use strict';

var LazyWrapper = require('./_LazyWrapper'),
    LodashWrapper = require('./_LodashWrapper'),
    baseLodash = require('./_baseLodash'),
    isArray = require('./isArray'),
    isObjectLike = require('./isObjectLike'),
    wrapperClone = require('./_wrapperClone');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

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
  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty.call(value, '__wrapped__')) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}

// Ensure wrappers are instances of `baseLodash`.
lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;

module.exports = lodash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3dyYXBwZXJMb2Rhc2guanMiXSwibmFtZXMiOlsiTGF6eVdyYXBwZXIiLCJyZXF1aXJlIiwiTG9kYXNoV3JhcHBlciIsImJhc2VMb2Rhc2giLCJpc0FycmF5IiwiaXNPYmplY3RMaWtlIiwid3JhcHBlckNsb25lIiwib2JqZWN0UHJvdG8iLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImxvZGFzaCIsInZhbHVlIiwiY2FsbCIsImNvbnN0cnVjdG9yIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxjQUFjQyxRQUFRLGdCQUFSLENBQWxCO0FBQUEsSUFDSUMsZ0JBQWdCRCxRQUFRLGtCQUFSLENBRHBCO0FBQUEsSUFFSUUsYUFBYUYsUUFBUSxlQUFSLENBRmpCO0FBQUEsSUFHSUcsVUFBVUgsUUFBUSxXQUFSLENBSGQ7QUFBQSxJQUlJSSxlQUFlSixRQUFRLGdCQUFSLENBSm5CO0FBQUEsSUFLSUssZUFBZUwsUUFBUSxpQkFBUixDQUxuQjs7QUFPQTtBQUNBLElBQUlNLGNBQWNDLE9BQU9DLFNBQXpCOztBQUVBO0FBQ0EsSUFBSUMsaUJBQWlCSCxZQUFZRyxjQUFqQzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUhBLFNBQVNDLE1BQVQsQ0FBZ0JDLEtBQWhCLEVBQXVCO0FBQ3JCLE1BQUlQLGFBQWFPLEtBQWIsS0FBdUIsQ0FBQ1IsUUFBUVEsS0FBUixDQUF4QixJQUEwQyxFQUFFQSxpQkFBaUJaLFdBQW5CLENBQTlDLEVBQStFO0FBQzdFLFFBQUlZLGlCQUFpQlYsYUFBckIsRUFBb0M7QUFDbEMsYUFBT1UsS0FBUDtBQUNEO0FBQ0QsUUFBSUYsZUFBZUcsSUFBZixDQUFvQkQsS0FBcEIsRUFBMkIsYUFBM0IsQ0FBSixFQUErQztBQUM3QyxhQUFPTixhQUFhTSxLQUFiLENBQVA7QUFDRDtBQUNGO0FBQ0QsU0FBTyxJQUFJVixhQUFKLENBQWtCVSxLQUFsQixDQUFQO0FBQ0Q7O0FBRUQ7QUFDQUQsT0FBT0YsU0FBUCxHQUFtQk4sV0FBV00sU0FBOUI7QUFDQUUsT0FBT0YsU0FBUCxDQUFpQkssV0FBakIsR0FBK0JILE1BQS9COztBQUVBSSxPQUFPQyxPQUFQLEdBQWlCTCxNQUFqQiIsImZpbGUiOiJ3cmFwcGVyTG9kYXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIExhenlXcmFwcGVyID0gcmVxdWlyZSgnLi9fTGF6eVdyYXBwZXInKSxcbiAgICBMb2Rhc2hXcmFwcGVyID0gcmVxdWlyZSgnLi9fTG9kYXNoV3JhcHBlcicpLFxuICAgIGJhc2VMb2Rhc2ggPSByZXF1aXJlKCcuL19iYXNlTG9kYXNoJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyksXG4gICAgd3JhcHBlckNsb25lID0gcmVxdWlyZSgnLi9fd3JhcHBlckNsb25lJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBsb2Rhc2hgIG9iamVjdCB3aGljaCB3cmFwcyBgdmFsdWVgIHRvIGVuYWJsZSBpbXBsaWNpdCBtZXRob2RcbiAqIGNoYWluIHNlcXVlbmNlcy4gTWV0aG9kcyB0aGF0IG9wZXJhdGUgb24gYW5kIHJldHVybiBhcnJheXMsIGNvbGxlY3Rpb25zLFxuICogYW5kIGZ1bmN0aW9ucyBjYW4gYmUgY2hhaW5lZCB0b2dldGhlci4gTWV0aG9kcyB0aGF0IHJldHJpZXZlIGEgc2luZ2xlIHZhbHVlXG4gKiBvciBtYXkgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlIHdpbGwgYXV0b21hdGljYWxseSBlbmQgdGhlIGNoYWluIHNlcXVlbmNlXG4gKiBhbmQgcmV0dXJuIHRoZSB1bndyYXBwZWQgdmFsdWUuIE90aGVyd2lzZSwgdGhlIHZhbHVlIG11c3QgYmUgdW53cmFwcGVkXG4gKiB3aXRoIGBfI3ZhbHVlYC5cbiAqXG4gKiBFeHBsaWNpdCBjaGFpbiBzZXF1ZW5jZXMsIHdoaWNoIG11c3QgYmUgdW53cmFwcGVkIHdpdGggYF8jdmFsdWVgLCBtYXkgYmVcbiAqIGVuYWJsZWQgdXNpbmcgYF8uY2hhaW5gLlxuICpcbiAqIFRoZSBleGVjdXRpb24gb2YgY2hhaW5lZCBtZXRob2RzIGlzIGxhenksIHRoYXQgaXMsIGl0J3MgZGVmZXJyZWQgdW50aWxcbiAqIGBfI3ZhbHVlYCBpcyBpbXBsaWNpdGx5IG9yIGV4cGxpY2l0bHkgY2FsbGVkLlxuICpcbiAqIExhenkgZXZhbHVhdGlvbiBhbGxvd3Mgc2V2ZXJhbCBtZXRob2RzIHRvIHN1cHBvcnQgc2hvcnRjdXQgZnVzaW9uLlxuICogU2hvcnRjdXQgZnVzaW9uIGlzIGFuIG9wdGltaXphdGlvbiB0byBtZXJnZSBpdGVyYXRlZSBjYWxsczsgdGhpcyBhdm9pZHNcbiAqIHRoZSBjcmVhdGlvbiBvZiBpbnRlcm1lZGlhdGUgYXJyYXlzIGFuZCBjYW4gZ3JlYXRseSByZWR1Y2UgdGhlIG51bWJlciBvZlxuICogaXRlcmF0ZWUgZXhlY3V0aW9ucy4gU2VjdGlvbnMgb2YgYSBjaGFpbiBzZXF1ZW5jZSBxdWFsaWZ5IGZvciBzaG9ydGN1dFxuICogZnVzaW9uIGlmIHRoZSBzZWN0aW9uIGlzIGFwcGxpZWQgdG8gYW4gYXJyYXkgYW5kIGl0ZXJhdGVlcyBhY2NlcHQgb25seVxuICogb25lIGFyZ3VtZW50LiBUaGUgaGV1cmlzdGljIGZvciB3aGV0aGVyIGEgc2VjdGlvbiBxdWFsaWZpZXMgZm9yIHNob3J0Y3V0XG4gKiBmdXNpb24gaXMgc3ViamVjdCB0byBjaGFuZ2UuXG4gKlxuICogQ2hhaW5pbmcgaXMgc3VwcG9ydGVkIGluIGN1c3RvbSBidWlsZHMgYXMgbG9uZyBhcyB0aGUgYF8jdmFsdWVgIG1ldGhvZCBpc1xuICogZGlyZWN0bHkgb3IgaW5kaXJlY3RseSBpbmNsdWRlZCBpbiB0aGUgYnVpbGQuXG4gKlxuICogSW4gYWRkaXRpb24gdG8gbG9kYXNoIG1ldGhvZHMsIHdyYXBwZXJzIGhhdmUgYEFycmF5YCBhbmQgYFN0cmluZ2AgbWV0aG9kcy5cbiAqXG4gKiBUaGUgd3JhcHBlciBgQXJyYXlgIG1ldGhvZHMgYXJlOlxuICogYGNvbmNhdGAsIGBqb2luYCwgYHBvcGAsIGBwdXNoYCwgYHNoaWZ0YCwgYHNvcnRgLCBgc3BsaWNlYCwgYW5kIGB1bnNoaWZ0YFxuICpcbiAqIFRoZSB3cmFwcGVyIGBTdHJpbmdgIG1ldGhvZHMgYXJlOlxuICogYHJlcGxhY2VgIGFuZCBgc3BsaXRgXG4gKlxuICogVGhlIHdyYXBwZXIgbWV0aG9kcyB0aGF0IHN1cHBvcnQgc2hvcnRjdXQgZnVzaW9uIGFyZTpcbiAqIGBhdGAsIGBjb21wYWN0YCwgYGRyb3BgLCBgZHJvcFJpZ2h0YCwgYGRyb3BXaGlsZWAsIGBmaWx0ZXJgLCBgZmluZGAsXG4gKiBgZmluZExhc3RgLCBgaGVhZGAsIGBpbml0aWFsYCwgYGxhc3RgLCBgbWFwYCwgYHJlamVjdGAsIGByZXZlcnNlYCwgYHNsaWNlYCxcbiAqIGB0YWlsYCwgYHRha2VgLCBgdGFrZVJpZ2h0YCwgYHRha2VSaWdodFdoaWxlYCwgYHRha2VXaGlsZWAsIGFuZCBgdG9BcnJheWBcbiAqXG4gKiBUaGUgY2hhaW5hYmxlIHdyYXBwZXIgbWV0aG9kcyBhcmU6XG4gKiBgYWZ0ZXJgLCBgYXJ5YCwgYGFzc2lnbmAsIGBhc3NpZ25JbmAsIGBhc3NpZ25JbldpdGhgLCBgYXNzaWduV2l0aGAsIGBhdGAsXG4gKiBgYmVmb3JlYCwgYGJpbmRgLCBgYmluZEFsbGAsIGBiaW5kS2V5YCwgYGNhc3RBcnJheWAsIGBjaGFpbmAsIGBjaHVua2AsXG4gKiBgY29tbWl0YCwgYGNvbXBhY3RgLCBgY29uY2F0YCwgYGNvbmZvcm1zYCwgYGNvbnN0YW50YCwgYGNvdW50QnlgLCBgY3JlYXRlYCxcbiAqIGBjdXJyeWAsIGBkZWJvdW5jZWAsIGBkZWZhdWx0c2AsIGBkZWZhdWx0c0RlZXBgLCBgZGVmZXJgLCBgZGVsYXlgLFxuICogYGRpZmZlcmVuY2VgLCBgZGlmZmVyZW5jZUJ5YCwgYGRpZmZlcmVuY2VXaXRoYCwgYGRyb3BgLCBgZHJvcFJpZ2h0YCxcbiAqIGBkcm9wUmlnaHRXaGlsZWAsIGBkcm9wV2hpbGVgLCBgZXh0ZW5kYCwgYGV4dGVuZFdpdGhgLCBgZmlsbGAsIGBmaWx0ZXJgLFxuICogYGZsYXRNYXBgLCBgZmxhdE1hcERlZXBgLCBgZmxhdE1hcERlcHRoYCwgYGZsYXR0ZW5gLCBgZmxhdHRlbkRlZXBgLFxuICogYGZsYXR0ZW5EZXB0aGAsIGBmbGlwYCwgYGZsb3dgLCBgZmxvd1JpZ2h0YCwgYGZyb21QYWlyc2AsIGBmdW5jdGlvbnNgLFxuICogYGZ1bmN0aW9uc0luYCwgYGdyb3VwQnlgLCBgaW5pdGlhbGAsIGBpbnRlcnNlY3Rpb25gLCBgaW50ZXJzZWN0aW9uQnlgLFxuICogYGludGVyc2VjdGlvbldpdGhgLCBgaW52ZXJ0YCwgYGludmVydEJ5YCwgYGludm9rZU1hcGAsIGBpdGVyYXRlZWAsIGBrZXlCeWAsXG4gKiBga2V5c2AsIGBrZXlzSW5gLCBgbWFwYCwgYG1hcEtleXNgLCBgbWFwVmFsdWVzYCwgYG1hdGNoZXNgLCBgbWF0Y2hlc1Byb3BlcnR5YCxcbiAqIGBtZW1vaXplYCwgYG1lcmdlYCwgYG1lcmdlV2l0aGAsIGBtZXRob2RgLCBgbWV0aG9kT2ZgLCBgbWl4aW5gLCBgbmVnYXRlYCxcbiAqIGBudGhBcmdgLCBgb21pdGAsIGBvbWl0QnlgLCBgb25jZWAsIGBvcmRlckJ5YCwgYG92ZXJgLCBgb3ZlckFyZ3NgLFxuICogYG92ZXJFdmVyeWAsIGBvdmVyU29tZWAsIGBwYXJ0aWFsYCwgYHBhcnRpYWxSaWdodGAsIGBwYXJ0aXRpb25gLCBgcGlja2AsXG4gKiBgcGlja0J5YCwgYHBsYW50YCwgYHByb3BlcnR5YCwgYHByb3BlcnR5T2ZgLCBgcHVsbGAsIGBwdWxsQWxsYCwgYHB1bGxBbGxCeWAsXG4gKiBgcHVsbEFsbFdpdGhgLCBgcHVsbEF0YCwgYHB1c2hgLCBgcmFuZ2VgLCBgcmFuZ2VSaWdodGAsIGByZWFyZ2AsIGByZWplY3RgLFxuICogYHJlbW92ZWAsIGByZXN0YCwgYHJldmVyc2VgLCBgc2FtcGxlU2l6ZWAsIGBzZXRgLCBgc2V0V2l0aGAsIGBzaHVmZmxlYCxcbiAqIGBzbGljZWAsIGBzb3J0YCwgYHNvcnRCeWAsIGBzcGxpY2VgLCBgc3ByZWFkYCwgYHRhaWxgLCBgdGFrZWAsIGB0YWtlUmlnaHRgLFxuICogYHRha2VSaWdodFdoaWxlYCwgYHRha2VXaGlsZWAsIGB0YXBgLCBgdGhyb3R0bGVgLCBgdGhydWAsIGB0b0FycmF5YCxcbiAqIGB0b1BhaXJzYCwgYHRvUGFpcnNJbmAsIGB0b1BhdGhgLCBgdG9QbGFpbk9iamVjdGAsIGB0cmFuc2Zvcm1gLCBgdW5hcnlgLFxuICogYHVuaW9uYCwgYHVuaW9uQnlgLCBgdW5pb25XaXRoYCwgYHVuaXFgLCBgdW5pcUJ5YCwgYHVuaXFXaXRoYCwgYHVuc2V0YCxcbiAqIGB1bnNoaWZ0YCwgYHVuemlwYCwgYHVuemlwV2l0aGAsIGB1cGRhdGVgLCBgdXBkYXRlV2l0aGAsIGB2YWx1ZXNgLFxuICogYHZhbHVlc0luYCwgYHdpdGhvdXRgLCBgd3JhcGAsIGB4b3JgLCBgeG9yQnlgLCBgeG9yV2l0aGAsIGB6aXBgLFxuICogYHppcE9iamVjdGAsIGB6aXBPYmplY3REZWVwYCwgYW5kIGB6aXBXaXRoYFxuICpcbiAqIFRoZSB3cmFwcGVyIG1ldGhvZHMgdGhhdCBhcmUgKipub3QqKiBjaGFpbmFibGUgYnkgZGVmYXVsdCBhcmU6XG4gKiBgYWRkYCwgYGF0dGVtcHRgLCBgY2FtZWxDYXNlYCwgYGNhcGl0YWxpemVgLCBgY2VpbGAsIGBjbGFtcGAsIGBjbG9uZWAsXG4gKiBgY2xvbmVEZWVwYCwgYGNsb25lRGVlcFdpdGhgLCBgY2xvbmVXaXRoYCwgYGNvbmZvcm1zVG9gLCBgZGVidXJyYCxcbiAqIGBkZWZhdWx0VG9gLCBgZGl2aWRlYCwgYGVhY2hgLCBgZWFjaFJpZ2h0YCwgYGVuZHNXaXRoYCwgYGVxYCwgYGVzY2FwZWAsXG4gKiBgZXNjYXBlUmVnRXhwYCwgYGV2ZXJ5YCwgYGZpbmRgLCBgZmluZEluZGV4YCwgYGZpbmRLZXlgLCBgZmluZExhc3RgLFxuICogYGZpbmRMYXN0SW5kZXhgLCBgZmluZExhc3RLZXlgLCBgZmlyc3RgLCBgZmxvb3JgLCBgZm9yRWFjaGAsIGBmb3JFYWNoUmlnaHRgLFxuICogYGZvckluYCwgYGZvckluUmlnaHRgLCBgZm9yT3duYCwgYGZvck93blJpZ2h0YCwgYGdldGAsIGBndGAsIGBndGVgLCBgaGFzYCxcbiAqIGBoYXNJbmAsIGBoZWFkYCwgYGlkZW50aXR5YCwgYGluY2x1ZGVzYCwgYGluZGV4T2ZgLCBgaW5SYW5nZWAsIGBpbnZva2VgLFxuICogYGlzQXJndW1lbnRzYCwgYGlzQXJyYXlgLCBgaXNBcnJheUJ1ZmZlcmAsIGBpc0FycmF5TGlrZWAsIGBpc0FycmF5TGlrZU9iamVjdGAsXG4gKiBgaXNCb29sZWFuYCwgYGlzQnVmZmVyYCwgYGlzRGF0ZWAsIGBpc0VsZW1lbnRgLCBgaXNFbXB0eWAsIGBpc0VxdWFsYCxcbiAqIGBpc0VxdWFsV2l0aGAsIGBpc0Vycm9yYCwgYGlzRmluaXRlYCwgYGlzRnVuY3Rpb25gLCBgaXNJbnRlZ2VyYCwgYGlzTGVuZ3RoYCxcbiAqIGBpc01hcGAsIGBpc01hdGNoYCwgYGlzTWF0Y2hXaXRoYCwgYGlzTmFOYCwgYGlzTmF0aXZlYCwgYGlzTmlsYCwgYGlzTnVsbGAsXG4gKiBgaXNOdW1iZXJgLCBgaXNPYmplY3RgLCBgaXNPYmplY3RMaWtlYCwgYGlzUGxhaW5PYmplY3RgLCBgaXNSZWdFeHBgLFxuICogYGlzU2FmZUludGVnZXJgLCBgaXNTZXRgLCBgaXNTdHJpbmdgLCBgaXNVbmRlZmluZWRgLCBgaXNUeXBlZEFycmF5YCxcbiAqIGBpc1dlYWtNYXBgLCBgaXNXZWFrU2V0YCwgYGpvaW5gLCBga2ViYWJDYXNlYCwgYGxhc3RgLCBgbGFzdEluZGV4T2ZgLFxuICogYGxvd2VyQ2FzZWAsIGBsb3dlckZpcnN0YCwgYGx0YCwgYGx0ZWAsIGBtYXhgLCBgbWF4QnlgLCBgbWVhbmAsIGBtZWFuQnlgLFxuICogYG1pbmAsIGBtaW5CeWAsIGBtdWx0aXBseWAsIGBub0NvbmZsaWN0YCwgYG5vb3BgLCBgbm93YCwgYG50aGAsIGBwYWRgLFxuICogYHBhZEVuZGAsIGBwYWRTdGFydGAsIGBwYXJzZUludGAsIGBwb3BgLCBgcmFuZG9tYCwgYHJlZHVjZWAsIGByZWR1Y2VSaWdodGAsXG4gKiBgcmVwZWF0YCwgYHJlc3VsdGAsIGByb3VuZGAsIGBydW5JbkNvbnRleHRgLCBgc2FtcGxlYCwgYHNoaWZ0YCwgYHNpemVgLFxuICogYHNuYWtlQ2FzZWAsIGBzb21lYCwgYHNvcnRlZEluZGV4YCwgYHNvcnRlZEluZGV4QnlgLCBgc29ydGVkTGFzdEluZGV4YCxcbiAqIGBzb3J0ZWRMYXN0SW5kZXhCeWAsIGBzdGFydENhc2VgLCBgc3RhcnRzV2l0aGAsIGBzdHViQXJyYXlgLCBgc3R1YkZhbHNlYCxcbiAqIGBzdHViT2JqZWN0YCwgYHN0dWJTdHJpbmdgLCBgc3R1YlRydWVgLCBgc3VidHJhY3RgLCBgc3VtYCwgYHN1bUJ5YCxcbiAqIGB0ZW1wbGF0ZWAsIGB0aW1lc2AsIGB0b0Zpbml0ZWAsIGB0b0ludGVnZXJgLCBgdG9KU09OYCwgYHRvTGVuZ3RoYCxcbiAqIGB0b0xvd2VyYCwgYHRvTnVtYmVyYCwgYHRvU2FmZUludGVnZXJgLCBgdG9TdHJpbmdgLCBgdG9VcHBlcmAsIGB0cmltYCxcbiAqIGB0cmltRW5kYCwgYHRyaW1TdGFydGAsIGB0cnVuY2F0ZWAsIGB1bmVzY2FwZWAsIGB1bmlxdWVJZGAsIGB1cHBlckNhc2VgLFxuICogYHVwcGVyRmlyc3RgLCBgdmFsdWVgLCBhbmQgYHdvcmRzYFxuICpcbiAqIEBuYW1lIF9cbiAqIEBjb25zdHJ1Y3RvclxuICogQGNhdGVnb3J5IFNlcVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gd3JhcCBpbiBhIGBsb2Rhc2hgIGluc3RhbmNlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IGBsb2Rhc2hgIHdyYXBwZXIgaW5zdGFuY2UuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIHNxdWFyZShuKSB7XG4gKiAgIHJldHVybiBuICogbjtcbiAqIH1cbiAqXG4gKiB2YXIgd3JhcHBlZCA9IF8oWzEsIDIsIDNdKTtcbiAqXG4gKiAvLyBSZXR1cm5zIGFuIHVud3JhcHBlZCB2YWx1ZS5cbiAqIHdyYXBwZWQucmVkdWNlKF8uYWRkKTtcbiAqIC8vID0+IDZcbiAqXG4gKiAvLyBSZXR1cm5zIGEgd3JhcHBlZCB2YWx1ZS5cbiAqIHZhciBzcXVhcmVzID0gd3JhcHBlZC5tYXAoc3F1YXJlKTtcbiAqXG4gKiBfLmlzQXJyYXkoc3F1YXJlcyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShzcXVhcmVzLnZhbHVlKCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBsb2Rhc2godmFsdWUpIHtcbiAgaWYgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgIWlzQXJyYXkodmFsdWUpICYmICEodmFsdWUgaW5zdGFuY2VvZiBMYXp5V3JhcHBlcikpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBMb2Rhc2hXcmFwcGVyKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnX193cmFwcGVkX18nKSkge1xuICAgICAgcmV0dXJuIHdyYXBwZXJDbG9uZSh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgTG9kYXNoV3JhcHBlcih2YWx1ZSk7XG59XG5cbi8vIEVuc3VyZSB3cmFwcGVycyBhcmUgaW5zdGFuY2VzIG9mIGBiYXNlTG9kYXNoYC5cbmxvZGFzaC5wcm90b3R5cGUgPSBiYXNlTG9kYXNoLnByb3RvdHlwZTtcbmxvZGFzaC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBsb2Rhc2g7XG5cbm1vZHVsZS5leHBvcnRzID0gbG9kYXNoO1xuIl19