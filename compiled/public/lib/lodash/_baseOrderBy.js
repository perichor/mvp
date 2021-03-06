'use strict';

var arrayMap = require('./_arrayMap'),
    baseIteratee = require('./_baseIteratee'),
    baseMap = require('./_baseMap'),
    baseSortBy = require('./_baseSortBy'),
    baseUnary = require('./_baseUnary'),
    compareMultiple = require('./_compareMultiple'),
    identity = require('./identity');

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

  var result = baseMap(collection, function (value, key, collection) {
    var criteria = arrayMap(iteratees, function (iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function (object, other) {
    return compareMultiple(object, other, orders);
  });
}

module.exports = baseOrderBy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlT3JkZXJCeS5qcyJdLCJuYW1lcyI6WyJhcnJheU1hcCIsInJlcXVpcmUiLCJiYXNlSXRlcmF0ZWUiLCJiYXNlTWFwIiwiYmFzZVNvcnRCeSIsImJhc2VVbmFyeSIsImNvbXBhcmVNdWx0aXBsZSIsImlkZW50aXR5IiwiYmFzZU9yZGVyQnkiLCJjb2xsZWN0aW9uIiwiaXRlcmF0ZWVzIiwib3JkZXJzIiwiaW5kZXgiLCJsZW5ndGgiLCJyZXN1bHQiLCJ2YWx1ZSIsImtleSIsImNyaXRlcmlhIiwiaXRlcmF0ZWUiLCJvYmplY3QiLCJvdGhlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsV0FBV0MsUUFBUSxhQUFSLENBQWY7QUFBQSxJQUNJQyxlQUFlRCxRQUFRLGlCQUFSLENBRG5CO0FBQUEsSUFFSUUsVUFBVUYsUUFBUSxZQUFSLENBRmQ7QUFBQSxJQUdJRyxhQUFhSCxRQUFRLGVBQVIsQ0FIakI7QUFBQSxJQUlJSSxZQUFZSixRQUFRLGNBQVIsQ0FKaEI7QUFBQSxJQUtJSyxrQkFBa0JMLFFBQVEsb0JBQVIsQ0FMdEI7QUFBQSxJQU1JTSxXQUFXTixRQUFRLFlBQVIsQ0FOZjs7QUFRQTs7Ozs7Ozs7O0FBU0EsU0FBU08sV0FBVCxDQUFxQkMsVUFBckIsRUFBaUNDLFNBQWpDLEVBQTRDQyxNQUE1QyxFQUFvRDtBQUNsRCxNQUFJQyxRQUFRLENBQUMsQ0FBYjtBQUNBRixjQUFZVixTQUFTVSxVQUFVRyxNQUFWLEdBQW1CSCxTQUFuQixHQUErQixDQUFDSCxRQUFELENBQXhDLEVBQW9ERixVQUFVSCxZQUFWLENBQXBELENBQVo7O0FBRUEsTUFBSVksU0FBU1gsUUFBUU0sVUFBUixFQUFvQixVQUFTTSxLQUFULEVBQWdCQyxHQUFoQixFQUFxQlAsVUFBckIsRUFBaUM7QUFDaEUsUUFBSVEsV0FBV2pCLFNBQVNVLFNBQVQsRUFBb0IsVUFBU1EsUUFBVCxFQUFtQjtBQUNwRCxhQUFPQSxTQUFTSCxLQUFULENBQVA7QUFDRCxLQUZjLENBQWY7QUFHQSxXQUFPLEVBQUUsWUFBWUUsUUFBZCxFQUF3QixTQUFTLEVBQUVMLEtBQW5DLEVBQTBDLFNBQVNHLEtBQW5ELEVBQVA7QUFDRCxHQUxZLENBQWI7O0FBT0EsU0FBT1gsV0FBV1UsTUFBWCxFQUFtQixVQUFTSyxNQUFULEVBQWlCQyxLQUFqQixFQUF3QjtBQUNoRCxXQUFPZCxnQkFBZ0JhLE1BQWhCLEVBQXdCQyxLQUF4QixFQUErQlQsTUFBL0IsQ0FBUDtBQUNELEdBRk0sQ0FBUDtBQUdEOztBQUVEVSxPQUFPQyxPQUFQLEdBQWlCZCxXQUFqQiIsImZpbGUiOiJfYmFzZU9yZGVyQnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXJyYXlNYXAgPSByZXF1aXJlKCcuL19hcnJheU1hcCcpLFxuICAgIGJhc2VJdGVyYXRlZSA9IHJlcXVpcmUoJy4vX2Jhc2VJdGVyYXRlZScpLFxuICAgIGJhc2VNYXAgPSByZXF1aXJlKCcuL19iYXNlTWFwJyksXG4gICAgYmFzZVNvcnRCeSA9IHJlcXVpcmUoJy4vX2Jhc2VTb3J0QnknKSxcbiAgICBiYXNlVW5hcnkgPSByZXF1aXJlKCcuL19iYXNlVW5hcnknKSxcbiAgICBjb21wYXJlTXVsdGlwbGUgPSByZXF1aXJlKCcuL19jb21wYXJlTXVsdGlwbGUnKSxcbiAgICBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5vcmRlckJ5YCB3aXRob3V0IHBhcmFtIGd1YXJkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbltdfE9iamVjdFtdfHN0cmluZ1tdfSBpdGVyYXRlZXMgVGhlIGl0ZXJhdGVlcyB0byBzb3J0IGJ5LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gb3JkZXJzIFRoZSBzb3J0IG9yZGVycyBvZiBgaXRlcmF0ZWVzYC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IHNvcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZU9yZGVyQnkoY29sbGVjdGlvbiwgaXRlcmF0ZWVzLCBvcmRlcnMpIHtcbiAgdmFyIGluZGV4ID0gLTE7XG4gIGl0ZXJhdGVlcyA9IGFycmF5TWFwKGl0ZXJhdGVlcy5sZW5ndGggPyBpdGVyYXRlZXMgOiBbaWRlbnRpdHldLCBiYXNlVW5hcnkoYmFzZUl0ZXJhdGVlKSk7XG5cbiAgdmFyIHJlc3VsdCA9IGJhc2VNYXAoY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGtleSwgY29sbGVjdGlvbikge1xuICAgIHZhciBjcml0ZXJpYSA9IGFycmF5TWFwKGl0ZXJhdGVlcywgZnVuY3Rpb24oaXRlcmF0ZWUpIHtcbiAgICAgIHJldHVybiBpdGVyYXRlZSh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHsgJ2NyaXRlcmlhJzogY3JpdGVyaWEsICdpbmRleCc6ICsraW5kZXgsICd2YWx1ZSc6IHZhbHVlIH07XG4gIH0pO1xuXG4gIHJldHVybiBiYXNlU29ydEJ5KHJlc3VsdCwgZnVuY3Rpb24ob2JqZWN0LCBvdGhlcikge1xuICAgIHJldHVybiBjb21wYXJlTXVsdGlwbGUob2JqZWN0LCBvdGhlciwgb3JkZXJzKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU9yZGVyQnk7XG4iXX0=