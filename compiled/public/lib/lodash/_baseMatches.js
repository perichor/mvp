'use strict';

var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData'),
    matchesStrictComparable = require('./_matchesStrictComparable');

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function (object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlTWF0Y2hlcy5qcyJdLCJuYW1lcyI6WyJiYXNlSXNNYXRjaCIsInJlcXVpcmUiLCJnZXRNYXRjaERhdGEiLCJtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZSIsImJhc2VNYXRjaGVzIiwic291cmNlIiwibWF0Y2hEYXRhIiwibGVuZ3RoIiwib2JqZWN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxjQUFjQyxRQUFRLGdCQUFSLENBQWxCO0FBQUEsSUFDSUMsZUFBZUQsUUFBUSxpQkFBUixDQURuQjtBQUFBLElBRUlFLDBCQUEwQkYsUUFBUSw0QkFBUixDQUY5Qjs7QUFJQTs7Ozs7OztBQU9BLFNBQVNHLFdBQVQsQ0FBcUJDLE1BQXJCLEVBQTZCO0FBQzNCLE1BQUlDLFlBQVlKLGFBQWFHLE1BQWIsQ0FBaEI7QUFDQSxNQUFJQyxVQUFVQyxNQUFWLElBQW9CLENBQXBCLElBQXlCRCxVQUFVLENBQVYsRUFBYSxDQUFiLENBQTdCLEVBQThDO0FBQzVDLFdBQU9ILHdCQUF3QkcsVUFBVSxDQUFWLEVBQWEsQ0FBYixDQUF4QixFQUF5Q0EsVUFBVSxDQUFWLEVBQWEsQ0FBYixDQUF6QyxDQUFQO0FBQ0Q7QUFDRCxTQUFPLFVBQVNFLE1BQVQsRUFBaUI7QUFDdEIsV0FBT0EsV0FBV0gsTUFBWCxJQUFxQkwsWUFBWVEsTUFBWixFQUFvQkgsTUFBcEIsRUFBNEJDLFNBQTVCLENBQTVCO0FBQ0QsR0FGRDtBQUdEOztBQUVERyxPQUFPQyxPQUFQLEdBQWlCTixXQUFqQiIsImZpbGUiOiJfYmFzZU1hdGNoZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUlzTWF0Y2ggPSByZXF1aXJlKCcuL19iYXNlSXNNYXRjaCcpLFxuICAgIGdldE1hdGNoRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hdGNoRGF0YScpLFxuICAgIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlID0gcmVxdWlyZSgnLi9fbWF0Y2hlc1N0cmljdENvbXBhcmFibGUnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2Vzbid0IGNsb25lIGBzb3VyY2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gIHZhciBtYXRjaERhdGEgPSBnZXRNYXRjaERhdGEoc291cmNlKTtcbiAgaWYgKG1hdGNoRGF0YS5sZW5ndGggPT0gMSAmJiBtYXRjaERhdGFbMF1bMl0pIHtcbiAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUobWF0Y2hEYXRhWzBdWzBdLCBtYXRjaERhdGFbMF1bMV0pO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09PSBzb3VyY2UgfHwgYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1hdGNoZXM7XG4iXX0=