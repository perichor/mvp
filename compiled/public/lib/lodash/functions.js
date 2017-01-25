'use strict';

var baseFunctions = require('./_baseFunctions'),
    keys = require('./keys');

/**
 * Creates an array of function property names from own enumerable properties
 * of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the function names.
 * @see _.functionsIn
 * @example
 *
 * function Foo() {
 *   this.a = _.constant('a');
 *   this.b = _.constant('b');
 * }
 *
 * Foo.prototype.c = _.constant('c');
 *
 * _.functions(new Foo);
 * // => ['a', 'b']
 */
function functions(object) {
  return object == null ? [] : baseFunctions(object, keys(object));
}

module.exports = functions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2Z1bmN0aW9ucy5qcyJdLCJuYW1lcyI6WyJiYXNlRnVuY3Rpb25zIiwicmVxdWlyZSIsImtleXMiLCJmdW5jdGlvbnMiLCJvYmplY3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGdCQUFnQkMsUUFBUSxrQkFBUixDQUFwQjtBQUFBLElBQ0lDLE9BQU9ELFFBQVEsUUFBUixDQURYOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxTQUFTRSxTQUFULENBQW1CQyxNQUFuQixFQUEyQjtBQUN6QixTQUFPQSxVQUFVLElBQVYsR0FBaUIsRUFBakIsR0FBc0JKLGNBQWNJLE1BQWQsRUFBc0JGLEtBQUtFLE1BQUwsQ0FBdEIsQ0FBN0I7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQkgsU0FBakIiLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGJhc2VGdW5jdGlvbnMgPSByZXF1aXJlKCcuL19iYXNlRnVuY3Rpb25zJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgZnVuY3Rpb24gcHJvcGVydHkgbmFtZXMgZnJvbSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzXG4gKiBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgZnVuY3Rpb24gbmFtZXMuXG4gKiBAc2VlIF8uZnVuY3Rpb25zSW5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSBfLmNvbnN0YW50KCdhJyk7XG4gKiAgIHRoaXMuYiA9IF8uY29uc3RhbnQoJ2InKTtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSBfLmNvbnN0YW50KCdjJyk7XG4gKlxuICogXy5mdW5jdGlvbnMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddXG4gKi9cbmZ1bmN0aW9uIGZ1bmN0aW9ucyhvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gW10gOiBiYXNlRnVuY3Rpb25zKG9iamVjdCwga2V5cyhvYmplY3QpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbnM7XG4iXX0=