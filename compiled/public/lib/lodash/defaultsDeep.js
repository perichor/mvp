'use strict';

var apply = require('./_apply'),
    baseRest = require('./_baseRest'),
    customDefaultsMerge = require('./_customDefaultsMerge'),
    mergeWith = require('./mergeWith');

/**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaults
 * @example
 *
 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
var defaultsDeep = baseRest(function (args) {
  args.push(undefined, customDefaultsMerge);
  return apply(mergeWith, undefined, args);
});

module.exports = defaultsDeep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2RlZmF1bHRzRGVlcC5qcyJdLCJuYW1lcyI6WyJhcHBseSIsInJlcXVpcmUiLCJiYXNlUmVzdCIsImN1c3RvbURlZmF1bHRzTWVyZ2UiLCJtZXJnZVdpdGgiLCJkZWZhdWx0c0RlZXAiLCJhcmdzIiwicHVzaCIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsUUFBUUMsUUFBUSxVQUFSLENBQVo7QUFBQSxJQUNJQyxXQUFXRCxRQUFRLGFBQVIsQ0FEZjtBQUFBLElBRUlFLHNCQUFzQkYsUUFBUSx3QkFBUixDQUYxQjtBQUFBLElBR0lHLFlBQVlILFFBQVEsYUFBUixDQUhoQjs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxJQUFJSSxlQUFlSCxTQUFTLFVBQVNJLElBQVQsRUFBZTtBQUN6Q0EsT0FBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCTCxtQkFBckI7QUFDQSxTQUFPSCxNQUFNSSxTQUFOLEVBQWlCSSxTQUFqQixFQUE0QkYsSUFBNUIsQ0FBUDtBQUNELENBSGtCLENBQW5COztBQUtBRyxPQUFPQyxPQUFQLEdBQWlCTCxZQUFqQiIsImZpbGUiOiJkZWZhdWx0c0RlZXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwbHkgPSByZXF1aXJlKCcuL19hcHBseScpLFxuICAgIGJhc2VSZXN0ID0gcmVxdWlyZSgnLi9fYmFzZVJlc3QnKSxcbiAgICBjdXN0b21EZWZhdWx0c01lcmdlID0gcmVxdWlyZSgnLi9fY3VzdG9tRGVmYXVsdHNNZXJnZScpLFxuICAgIG1lcmdlV2l0aCA9IHJlcXVpcmUoJy4vbWVyZ2VXaXRoJyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5kZWZhdWx0c2AgZXhjZXB0IHRoYXQgaXQgcmVjdXJzaXZlbHkgYXNzaWduc1xuICogZGVmYXVsdCBwcm9wZXJ0aWVzLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4xMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAc2VlIF8uZGVmYXVsdHNcbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZhdWx0c0RlZXAoeyAnYSc6IHsgJ2InOiAyIH0gfSwgeyAnYSc6IHsgJ2InOiAxLCAnYyc6IDMgfSB9KTtcbiAqIC8vID0+IHsgJ2EnOiB7ICdiJzogMiwgJ2MnOiAzIH0gfVxuICovXG52YXIgZGVmYXVsdHNEZWVwID0gYmFzZVJlc3QoZnVuY3Rpb24oYXJncykge1xuICBhcmdzLnB1c2godW5kZWZpbmVkLCBjdXN0b21EZWZhdWx0c01lcmdlKTtcbiAgcmV0dXJuIGFwcGx5KG1lcmdlV2l0aCwgdW5kZWZpbmVkLCBhcmdzKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzRGVlcDtcbiJdfQ==