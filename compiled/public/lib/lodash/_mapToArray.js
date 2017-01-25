"use strict";

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19tYXBUb0FycmF5LmpzIl0sIm5hbWVzIjpbIm1hcFRvQXJyYXkiLCJtYXAiLCJpbmRleCIsInJlc3VsdCIsIkFycmF5Iiwic2l6ZSIsImZvckVhY2giLCJ2YWx1ZSIsImtleSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7QUFPQSxTQUFTQSxVQUFULENBQW9CQyxHQUFwQixFQUF5QjtBQUN2QixNQUFJQyxRQUFRLENBQUMsQ0FBYjtBQUFBLE1BQ0lDLFNBQVNDLE1BQU1ILElBQUlJLElBQVYsQ0FEYjs7QUFHQUosTUFBSUssT0FBSixDQUFZLFVBQVNDLEtBQVQsRUFBZ0JDLEdBQWhCLEVBQXFCO0FBQy9CTCxXQUFPLEVBQUVELEtBQVQsSUFBa0IsQ0FBQ00sR0FBRCxFQUFNRCxLQUFOLENBQWxCO0FBQ0QsR0FGRDtBQUdBLFNBQU9KLE1BQVA7QUFDRDs7QUFFRE0sT0FBT0MsT0FBUCxHQUFpQlYsVUFBakIiLCJmaWxlIjoiX21hcFRvQXJyYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcFRvQXJyYXk7XG4iXX0=