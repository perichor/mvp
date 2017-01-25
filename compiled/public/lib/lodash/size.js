'use strict';

var baseKeys = require('./_baseKeys'),
    getTag = require('./_getTag'),
    isArrayLike = require('./isArrayLike'),
    isString = require('./isString'),
    stringSize = require('./_stringSize');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

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
  if (isArrayLike(collection)) {
    return isString(collection) ? stringSize(collection) : collection.length;
  }
  var tag = getTag(collection);
  if (tag == mapTag || tag == setTag) {
    return collection.size;
  }
  return baseKeys(collection).length;
}

module.exports = size;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3NpemUuanMiXSwibmFtZXMiOlsiYmFzZUtleXMiLCJyZXF1aXJlIiwiZ2V0VGFnIiwiaXNBcnJheUxpa2UiLCJpc1N0cmluZyIsInN0cmluZ1NpemUiLCJtYXBUYWciLCJzZXRUYWciLCJzaXplIiwiY29sbGVjdGlvbiIsImxlbmd0aCIsInRhZyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsV0FBV0MsUUFBUSxhQUFSLENBQWY7QUFBQSxJQUNJQyxTQUFTRCxRQUFRLFdBQVIsQ0FEYjtBQUFBLElBRUlFLGNBQWNGLFFBQVEsZUFBUixDQUZsQjtBQUFBLElBR0lHLFdBQVdILFFBQVEsWUFBUixDQUhmO0FBQUEsSUFJSUksYUFBYUosUUFBUSxlQUFSLENBSmpCOztBQU1BO0FBQ0EsSUFBSUssU0FBUyxjQUFiO0FBQUEsSUFDSUMsU0FBUyxjQURiOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsU0FBU0MsSUFBVCxDQUFjQyxVQUFkLEVBQTBCO0FBQ3hCLE1BQUlBLGNBQWMsSUFBbEIsRUFBd0I7QUFDdEIsV0FBTyxDQUFQO0FBQ0Q7QUFDRCxNQUFJTixZQUFZTSxVQUFaLENBQUosRUFBNkI7QUFDM0IsV0FBT0wsU0FBU0ssVUFBVCxJQUF1QkosV0FBV0ksVUFBWCxDQUF2QixHQUFnREEsV0FBV0MsTUFBbEU7QUFDRDtBQUNELE1BQUlDLE1BQU1ULE9BQU9PLFVBQVAsQ0FBVjtBQUNBLE1BQUlFLE9BQU9MLE1BQVAsSUFBaUJLLE9BQU9KLE1BQTVCLEVBQW9DO0FBQ2xDLFdBQU9FLFdBQVdELElBQWxCO0FBQ0Q7QUFDRCxTQUFPUixTQUFTUyxVQUFULEVBQXFCQyxNQUE1QjtBQUNEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCTCxJQUFqQiIsImZpbGUiOiJzaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VLZXlzID0gcmVxdWlyZSgnLi9fYmFzZUtleXMnKSxcbiAgICBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1N0cmluZyA9IHJlcXVpcmUoJy4vaXNTdHJpbmcnKSxcbiAgICBzdHJpbmdTaXplID0gcmVxdWlyZSgnLi9fc3RyaW5nU2l6ZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG5cbi8qKlxuICogR2V0cyB0aGUgc2l6ZSBvZiBgY29sbGVjdGlvbmAgYnkgcmV0dXJuaW5nIGl0cyBsZW5ndGggZm9yIGFycmF5LWxpa2VcbiAqIHZhbHVlcyBvciB0aGUgbnVtYmVyIG9mIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIGZvciBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNvbGxlY3Rpb24gc2l6ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5zaXplKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5zaXplKHsgJ2EnOiAxLCAnYic6IDIgfSk7XG4gKiAvLyA9PiAyXG4gKlxuICogXy5zaXplKCdwZWJibGVzJyk7XG4gKiAvLyA9PiA3XG4gKi9cbmZ1bmN0aW9uIHNpemUoY29sbGVjdGlvbikge1xuICBpZiAoY29sbGVjdGlvbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKGlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pKSB7XG4gICAgcmV0dXJuIGlzU3RyaW5nKGNvbGxlY3Rpb24pID8gc3RyaW5nU2l6ZShjb2xsZWN0aW9uKSA6IGNvbGxlY3Rpb24ubGVuZ3RoO1xuICB9XG4gIHZhciB0YWcgPSBnZXRUYWcoY29sbGVjdGlvbik7XG4gIGlmICh0YWcgPT0gbWFwVGFnIHx8IHRhZyA9PSBzZXRUYWcpIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbi5zaXplO1xuICB9XG4gIHJldHVybiBiYXNlS2V5cyhjb2xsZWN0aW9uKS5sZW5ndGg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2l6ZTtcbiJdfQ==