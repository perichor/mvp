'use strict';

var _Symbol = require('./_Symbol'),
    copyArray = require('./_copyArray'),
    getTag = require('./_getTag'),
    isArrayLike = require('./isArrayLike'),
    isString = require('./isString'),
    iteratorToArray = require('./_iteratorToArray'),
    mapToArray = require('./_mapToArray'),
    setToArray = require('./_setToArray'),
    stringToArray = require('./_stringToArray'),
    values = require('./values');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Built-in value references. */
var symIterator = _Symbol ? _Symbol.iterator : undefined;

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
  if (!value) {
    return [];
  }
  if (isArrayLike(value)) {
    return isString(value) ? stringToArray(value) : copyArray(value);
  }
  if (symIterator && value[symIterator]) {
    return iteratorToArray(value[symIterator]());
  }
  var tag = getTag(value),
      func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;

  return func(value);
}

module.exports = toArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3RvQXJyYXkuanMiXSwibmFtZXMiOlsiU3ltYm9sIiwicmVxdWlyZSIsImNvcHlBcnJheSIsImdldFRhZyIsImlzQXJyYXlMaWtlIiwiaXNTdHJpbmciLCJpdGVyYXRvclRvQXJyYXkiLCJtYXBUb0FycmF5Iiwic2V0VG9BcnJheSIsInN0cmluZ1RvQXJyYXkiLCJ2YWx1ZXMiLCJtYXBUYWciLCJzZXRUYWciLCJzeW1JdGVyYXRvciIsIml0ZXJhdG9yIiwidW5kZWZpbmVkIiwidG9BcnJheSIsInZhbHVlIiwidGFnIiwiZnVuYyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsVUFBU0MsUUFBUSxXQUFSLENBQWI7QUFBQSxJQUNJQyxZQUFZRCxRQUFRLGNBQVIsQ0FEaEI7QUFBQSxJQUVJRSxTQUFTRixRQUFRLFdBQVIsQ0FGYjtBQUFBLElBR0lHLGNBQWNILFFBQVEsZUFBUixDQUhsQjtBQUFBLElBSUlJLFdBQVdKLFFBQVEsWUFBUixDQUpmO0FBQUEsSUFLSUssa0JBQWtCTCxRQUFRLG9CQUFSLENBTHRCO0FBQUEsSUFNSU0sYUFBYU4sUUFBUSxlQUFSLENBTmpCO0FBQUEsSUFPSU8sYUFBYVAsUUFBUSxlQUFSLENBUGpCO0FBQUEsSUFRSVEsZ0JBQWdCUixRQUFRLGtCQUFSLENBUnBCO0FBQUEsSUFTSVMsU0FBU1QsUUFBUSxVQUFSLENBVGI7O0FBV0E7QUFDQSxJQUFJVSxTQUFTLGNBQWI7QUFBQSxJQUNJQyxTQUFTLGNBRGI7O0FBR0E7QUFDQSxJQUFJQyxjQUFjYixVQUFTQSxRQUFPYyxRQUFoQixHQUEyQkMsU0FBN0M7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLFNBQVNDLE9BQVQsQ0FBaUJDLEtBQWpCLEVBQXdCO0FBQ3RCLE1BQUksQ0FBQ0EsS0FBTCxFQUFZO0FBQ1YsV0FBTyxFQUFQO0FBQ0Q7QUFDRCxNQUFJYixZQUFZYSxLQUFaLENBQUosRUFBd0I7QUFDdEIsV0FBT1osU0FBU1ksS0FBVCxJQUFrQlIsY0FBY1EsS0FBZCxDQUFsQixHQUF5Q2YsVUFBVWUsS0FBVixDQUFoRDtBQUNEO0FBQ0QsTUFBSUosZUFBZUksTUFBTUosV0FBTixDQUFuQixFQUF1QztBQUNyQyxXQUFPUCxnQkFBZ0JXLE1BQU1KLFdBQU4sR0FBaEIsQ0FBUDtBQUNEO0FBQ0QsTUFBSUssTUFBTWYsT0FBT2MsS0FBUCxDQUFWO0FBQUEsTUFDSUUsT0FBT0QsT0FBT1AsTUFBUCxHQUFnQkosVUFBaEIsR0FBOEJXLE9BQU9OLE1BQVAsR0FBZ0JKLFVBQWhCLEdBQTZCRSxNQUR0RTs7QUFHQSxTQUFPUyxLQUFLRixLQUFMLENBQVA7QUFDRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQkwsT0FBakIiLCJmaWxlIjoidG9BcnJheS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBjb3B5QXJyYXkgPSByZXF1aXJlKCcuL19jb3B5QXJyYXknKSxcbiAgICBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1N0cmluZyA9IHJlcXVpcmUoJy4vaXNTdHJpbmcnKSxcbiAgICBpdGVyYXRvclRvQXJyYXkgPSByZXF1aXJlKCcuL19pdGVyYXRvclRvQXJyYXknKSxcbiAgICBtYXBUb0FycmF5ID0gcmVxdWlyZSgnLi9fbWFwVG9BcnJheScpLFxuICAgIHNldFRvQXJyYXkgPSByZXF1aXJlKCcuL19zZXRUb0FycmF5JyksXG4gICAgc3RyaW5nVG9BcnJheSA9IHJlcXVpcmUoJy4vX3N0cmluZ1RvQXJyYXknKSxcbiAgICB2YWx1ZXMgPSByZXF1aXJlKCcuL3ZhbHVlcycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bUl0ZXJhdG9yID0gU3ltYm9sID8gU3ltYm9sLml0ZXJhdG9yIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0FycmF5KHsgJ2EnOiAxLCAnYic6IDIgfSk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiBfLnRvQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddXG4gKlxuICogXy50b0FycmF5KDEpO1xuICogLy8gPT4gW11cbiAqXG4gKiBfLnRvQXJyYXkobnVsbCk7XG4gKiAvLyA9PiBbXVxuICovXG5mdW5jdGlvbiB0b0FycmF5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKGlzQXJyYXlMaWtlKHZhbHVlKSkge1xuICAgIHJldHVybiBpc1N0cmluZyh2YWx1ZSkgPyBzdHJpbmdUb0FycmF5KHZhbHVlKSA6IGNvcHlBcnJheSh2YWx1ZSk7XG4gIH1cbiAgaWYgKHN5bUl0ZXJhdG9yICYmIHZhbHVlW3N5bUl0ZXJhdG9yXSkge1xuICAgIHJldHVybiBpdGVyYXRvclRvQXJyYXkodmFsdWVbc3ltSXRlcmF0b3JdKCkpO1xuICB9XG4gIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgZnVuYyA9IHRhZyA9PSBtYXBUYWcgPyBtYXBUb0FycmF5IDogKHRhZyA9PSBzZXRUYWcgPyBzZXRUb0FycmF5IDogdmFsdWVzKTtcblxuICByZXR1cm4gZnVuYyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9BcnJheTtcbiJdfQ==