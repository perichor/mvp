'use strict';

var baseAssign = require('./_baseAssign'),
    baseCreate = require('./_baseCreate');

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
  return properties == null ? result : baseAssign(result, properties);
}

module.exports = create;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2NyZWF0ZS5qcyJdLCJuYW1lcyI6WyJiYXNlQXNzaWduIiwicmVxdWlyZSIsImJhc2VDcmVhdGUiLCJjcmVhdGUiLCJwcm90b3R5cGUiLCJwcm9wZXJ0aWVzIiwicmVzdWx0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxhQUFhQyxRQUFRLGVBQVIsQ0FBakI7QUFBQSxJQUNJQyxhQUFhRCxRQUFRLGVBQVIsQ0FEakI7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQ0EsU0FBU0UsTUFBVCxDQUFnQkMsU0FBaEIsRUFBMkJDLFVBQTNCLEVBQXVDO0FBQ3JDLE1BQUlDLFNBQVNKLFdBQVdFLFNBQVgsQ0FBYjtBQUNBLFNBQU9DLGNBQWMsSUFBZCxHQUFxQkMsTUFBckIsR0FBOEJOLFdBQVdNLE1BQVgsRUFBbUJELFVBQW5CLENBQXJDO0FBQ0Q7O0FBRURFLE9BQU9DLE9BQVAsR0FBaUJMLE1BQWpCIiwiZmlsZSI6ImNyZWF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlQXNzaWduID0gcmVxdWlyZSgnLi9fYmFzZUFzc2lnbicpLFxuICAgIGJhc2VDcmVhdGUgPSByZXF1aXJlKCcuL19iYXNlQ3JlYXRlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIHRoZSBgcHJvdG90eXBlYCBvYmplY3QuIElmIGFcbiAqIGBwcm9wZXJ0aWVzYCBvYmplY3QgaXMgZ2l2ZW4sIGl0cyBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllc1xuICogYXJlIGFzc2lnbmVkIHRvIHRoZSBjcmVhdGVkIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuMy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHBhcmFtIHtPYmplY3R9IFtwcm9wZXJ0aWVzXSBUaGUgcHJvcGVydGllcyB0byBhc3NpZ24gdG8gdGhlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIFNoYXBlKCkge1xuICogICB0aGlzLnggPSAwO1xuICogICB0aGlzLnkgPSAwO1xuICogfVxuICpcbiAqIGZ1bmN0aW9uIENpcmNsZSgpIHtcbiAqICAgU2hhcGUuY2FsbCh0aGlzKTtcbiAqIH1cbiAqXG4gKiBDaXJjbGUucHJvdG90eXBlID0gXy5jcmVhdGUoU2hhcGUucHJvdG90eXBlLCB7XG4gKiAgICdjb25zdHJ1Y3Rvcic6IENpcmNsZVxuICogfSk7XG4gKlxuICogdmFyIGNpcmNsZSA9IG5ldyBDaXJjbGU7XG4gKiBjaXJjbGUgaW5zdGFuY2VvZiBDaXJjbGU7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogY2lyY2xlIGluc3RhbmNlb2YgU2hhcGU7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZShwcm90b3R5cGUsIHByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdCA9IGJhc2VDcmVhdGUocHJvdG90eXBlKTtcbiAgcmV0dXJuIHByb3BlcnRpZXMgPT0gbnVsbCA/IHJlc3VsdCA6IGJhc2VBc3NpZ24ocmVzdWx0LCBwcm9wZXJ0aWVzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGU7XG4iXX0=