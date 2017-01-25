'use strict';

var isStrictComparable = require('./_isStrictComparable'),
    keys = require('./keys');

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
    var result = keys(object),
        length = result.length;

    while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
}

module.exports = getMatchData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19nZXRNYXRjaERhdGEuanMiXSwibmFtZXMiOlsiaXNTdHJpY3RDb21wYXJhYmxlIiwicmVxdWlyZSIsImtleXMiLCJnZXRNYXRjaERhdGEiLCJvYmplY3QiLCJyZXN1bHQiLCJsZW5ndGgiLCJrZXkiLCJ2YWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEscUJBQXFCQyxRQUFRLHVCQUFSLENBQXpCO0FBQUEsSUFDSUMsT0FBT0QsUUFBUSxRQUFSLENBRFg7O0FBR0E7Ozs7Ozs7QUFPQSxTQUFTRSxZQUFULENBQXNCQyxNQUF0QixFQUE4QjtBQUM1QixRQUFJQyxTQUFTSCxLQUFLRSxNQUFMLENBQWI7QUFBQSxRQUNJRSxTQUFTRCxPQUFPQyxNQURwQjs7QUFHQSxXQUFPQSxRQUFQLEVBQWlCO0FBQ2YsWUFBSUMsTUFBTUYsT0FBT0MsTUFBUCxDQUFWO0FBQUEsWUFDSUUsUUFBUUosT0FBT0csR0FBUCxDQURaOztBQUdBRixlQUFPQyxNQUFQLElBQWlCLENBQUNDLEdBQUQsRUFBTUMsS0FBTixFQUFhUixtQkFBbUJRLEtBQW5CLENBQWIsQ0FBakI7QUFDRDtBQUNELFdBQU9ILE1BQVA7QUFDRDs7QUFFREksT0FBT0MsT0FBUCxHQUFpQlAsWUFBakIiLCJmaWxlIjoiX2dldE1hdGNoRGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBpc1N0cmljdENvbXBhcmFibGUgPSByZXF1aXJlKCcuL19pc1N0cmljdENvbXBhcmFibGUnKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgcHJvcGVydHkgbmFtZXMsIHZhbHVlcywgYW5kIGNvbXBhcmUgZmxhZ3Mgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbWF0Y2ggZGF0YSBvZiBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hEYXRhKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0ga2V5cyhvYmplY3QpLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICB2YXIga2V5ID0gcmVzdWx0W2xlbmd0aF0sXG4gICAgICAgIHZhbHVlID0gb2JqZWN0W2tleV07XG5cbiAgICByZXN1bHRbbGVuZ3RoXSA9IFtrZXksIHZhbHVlLCBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1hdGNoRGF0YTtcbiJdfQ==