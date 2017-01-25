'use strict';

var baseGet = require('./_baseGet'),
    baseSet = require('./_baseSet'),
    castPath = require('./_castPath');

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
    var index = -1,
        length = paths.length,
        result = {};

    while (++index < length) {
        var path = paths[index],
            value = baseGet(object, path);

        if (predicate(value, path)) {
            baseSet(result, castPath(path, object), value);
        }
    }
    return result;
}

module.exports = basePickBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlUGlja0J5LmpzIl0sIm5hbWVzIjpbImJhc2VHZXQiLCJyZXF1aXJlIiwiYmFzZVNldCIsImNhc3RQYXRoIiwiYmFzZVBpY2tCeSIsIm9iamVjdCIsInBhdGhzIiwicHJlZGljYXRlIiwiaW5kZXgiLCJsZW5ndGgiLCJyZXN1bHQiLCJwYXRoIiwidmFsdWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFVBQVVDLFFBQVEsWUFBUixDQUFkO0FBQUEsSUFDSUMsVUFBVUQsUUFBUSxZQUFSLENBRGQ7QUFBQSxJQUVJRSxXQUFXRixRQUFRLGFBQVIsQ0FGZjs7QUFJQTs7Ozs7Ozs7O0FBU0EsU0FBU0csVUFBVCxDQUFvQkMsTUFBcEIsRUFBNEJDLEtBQTVCLEVBQW1DQyxTQUFuQyxFQUE4QztBQUM1QyxRQUFJQyxRQUFRLENBQUMsQ0FBYjtBQUFBLFFBQ0lDLFNBQVNILE1BQU1HLE1BRG5CO0FBQUEsUUFFSUMsU0FBUyxFQUZiOztBQUlBLFdBQU8sRUFBRUYsS0FBRixHQUFVQyxNQUFqQixFQUF5QjtBQUN2QixZQUFJRSxPQUFPTCxNQUFNRSxLQUFOLENBQVg7QUFBQSxZQUNJSSxRQUFRWixRQUFRSyxNQUFSLEVBQWdCTSxJQUFoQixDQURaOztBQUdBLFlBQUlKLFVBQVVLLEtBQVYsRUFBaUJELElBQWpCLENBQUosRUFBNEI7QUFDMUJULG9CQUFRUSxNQUFSLEVBQWdCUCxTQUFTUSxJQUFULEVBQWVOLE1BQWYsQ0FBaEIsRUFBd0NPLEtBQXhDO0FBQ0Q7QUFDRjtBQUNELFdBQU9GLE1BQVA7QUFDRDs7QUFFREcsT0FBT0MsT0FBUCxHQUFpQlYsVUFBakIiLCJmaWxlIjoiX2Jhc2VQaWNrQnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUdldCA9IHJlcXVpcmUoJy4vX2Jhc2VHZXQnKSxcbiAgICBiYXNlU2V0ID0gcmVxdWlyZSgnLi9fYmFzZVNldCcpLFxuICAgIGNhc3RQYXRoID0gcmVxdWlyZSgnLi9fY2FzdFBhdGgnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiAgYF8ucGlja0J5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwYXRocyBUaGUgcHJvcGVydHkgcGF0aHMgdG8gcGljay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlUGlja0J5KG9iamVjdCwgcGF0aHMsIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGhzLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IHt9O1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHBhdGggPSBwYXRoc1tpbmRleF0sXG4gICAgICAgIHZhbHVlID0gYmFzZUdldChvYmplY3QsIHBhdGgpO1xuXG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgcGF0aCkpIHtcbiAgICAgIGJhc2VTZXQocmVzdWx0LCBjYXN0UGF0aChwYXRoLCBvYmplY3QpLCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVBpY2tCeTtcbiJdfQ==