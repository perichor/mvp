'use strict';

var apply = require('./_apply'),
    arrayMap = require('./_arrayMap'),
    baseIteratee = require('./_baseIteratee'),
    baseRest = require('./_baseRest'),
    baseUnary = require('./_baseUnary'),
    flatRest = require('./_flatRest');

/**
 * Creates a function like `_.over`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over iteratees.
 * @returns {Function} Returns the new over function.
 */
function createOver(arrayFunc) {
  return flatRest(function (iteratees) {
    iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
    return baseRest(function (args) {
      var thisArg = this;
      return arrayFunc(iteratees, function (iteratee) {
        return apply(iteratee, thisArg, args);
      });
    });
  });
}

module.exports = createOver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19jcmVhdGVPdmVyLmpzIl0sIm5hbWVzIjpbImFwcGx5IiwicmVxdWlyZSIsImFycmF5TWFwIiwiYmFzZUl0ZXJhdGVlIiwiYmFzZVJlc3QiLCJiYXNlVW5hcnkiLCJmbGF0UmVzdCIsImNyZWF0ZU92ZXIiLCJhcnJheUZ1bmMiLCJpdGVyYXRlZXMiLCJhcmdzIiwidGhpc0FyZyIsIml0ZXJhdGVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxRQUFRQyxRQUFRLFVBQVIsQ0FBWjtBQUFBLElBQ0lDLFdBQVdELFFBQVEsYUFBUixDQURmO0FBQUEsSUFFSUUsZUFBZUYsUUFBUSxpQkFBUixDQUZuQjtBQUFBLElBR0lHLFdBQVdILFFBQVEsYUFBUixDQUhmO0FBQUEsSUFJSUksWUFBWUosUUFBUSxjQUFSLENBSmhCO0FBQUEsSUFLSUssV0FBV0wsUUFBUSxhQUFSLENBTGY7O0FBT0E7Ozs7Ozs7QUFPQSxTQUFTTSxVQUFULENBQW9CQyxTQUFwQixFQUErQjtBQUM3QixTQUFPRixTQUFTLFVBQVNHLFNBQVQsRUFBb0I7QUFDbENBLGdCQUFZUCxTQUFTTyxTQUFULEVBQW9CSixVQUFVRixZQUFWLENBQXBCLENBQVo7QUFDQSxXQUFPQyxTQUFTLFVBQVNNLElBQVQsRUFBZTtBQUM3QixVQUFJQyxVQUFVLElBQWQ7QUFDQSxhQUFPSCxVQUFVQyxTQUFWLEVBQXFCLFVBQVNHLFFBQVQsRUFBbUI7QUFDN0MsZUFBT1osTUFBTVksUUFBTixFQUFnQkQsT0FBaEIsRUFBeUJELElBQXpCLENBQVA7QUFDRCxPQUZNLENBQVA7QUFHRCxLQUxNLENBQVA7QUFNRCxHQVJNLENBQVA7QUFTRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQlAsVUFBakIiLCJmaWxlIjoiX2NyZWF0ZU92ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwbHkgPSByZXF1aXJlKCcuL19hcHBseScpLFxuICAgIGFycmF5TWFwID0gcmVxdWlyZSgnLi9fYXJyYXlNYXAnKSxcbiAgICBiYXNlSXRlcmF0ZWUgPSByZXF1aXJlKCcuL19iYXNlSXRlcmF0ZWUnKSxcbiAgICBiYXNlUmVzdCA9IHJlcXVpcmUoJy4vX2Jhc2VSZXN0JyksXG4gICAgYmFzZVVuYXJ5ID0gcmVxdWlyZSgnLi9fYmFzZVVuYXJ5JyksXG4gICAgZmxhdFJlc3QgPSByZXF1aXJlKCcuL19mbGF0UmVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLm92ZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhcnJheUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBpdGVyYXRlZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBvdmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVPdmVyKGFycmF5RnVuYykge1xuICByZXR1cm4gZmxhdFJlc3QoZnVuY3Rpb24oaXRlcmF0ZWVzKSB7XG4gICAgaXRlcmF0ZWVzID0gYXJyYXlNYXAoaXRlcmF0ZWVzLCBiYXNlVW5hcnkoYmFzZUl0ZXJhdGVlKSk7XG4gICAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgIHZhciB0aGlzQXJnID0gdGhpcztcbiAgICAgIHJldHVybiBhcnJheUZ1bmMoaXRlcmF0ZWVzLCBmdW5jdGlvbihpdGVyYXRlZSkge1xuICAgICAgICByZXR1cm4gYXBwbHkoaXRlcmF0ZWUsIHRoaXNBcmcsIGFyZ3MpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZU92ZXI7XG4iXX0=