'use strict';

var ListCache = require('./_ListCache'),
    stackClear = require('./_stackClear'),
    stackDelete = require('./_stackDelete'),
    stackGet = require('./_stackGet'),
    stackHas = require('./_stackHas'),
    stackSet = require('./_stackSet');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19TdGFjay5qcyJdLCJuYW1lcyI6WyJMaXN0Q2FjaGUiLCJyZXF1aXJlIiwic3RhY2tDbGVhciIsInN0YWNrRGVsZXRlIiwic3RhY2tHZXQiLCJzdGFja0hhcyIsInN0YWNrU2V0IiwiU3RhY2siLCJlbnRyaWVzIiwiZGF0YSIsIl9fZGF0YV9fIiwic2l6ZSIsInByb3RvdHlwZSIsImNsZWFyIiwiZ2V0IiwiaGFzIiwic2V0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxZQUFZQyxRQUFRLGNBQVIsQ0FBaEI7QUFBQSxJQUNJQyxhQUFhRCxRQUFRLGVBQVIsQ0FEakI7QUFBQSxJQUVJRSxjQUFjRixRQUFRLGdCQUFSLENBRmxCO0FBQUEsSUFHSUcsV0FBV0gsUUFBUSxhQUFSLENBSGY7QUFBQSxJQUlJSSxXQUFXSixRQUFRLGFBQVIsQ0FKZjtBQUFBLElBS0lLLFdBQVdMLFFBQVEsYUFBUixDQUxmOztBQU9BOzs7Ozs7O0FBT0EsU0FBU00sS0FBVCxDQUFlQyxPQUFmLEVBQXdCO0FBQ3RCLE1BQUlDLE9BQU8sS0FBS0MsUUFBTCxHQUFnQixJQUFJVixTQUFKLENBQWNRLE9BQWQsQ0FBM0I7QUFDQSxPQUFLRyxJQUFMLEdBQVlGLEtBQUtFLElBQWpCO0FBQ0Q7O0FBRUQ7QUFDQUosTUFBTUssU0FBTixDQUFnQkMsS0FBaEIsR0FBd0JYLFVBQXhCO0FBQ0FLLE1BQU1LLFNBQU4sQ0FBZ0IsUUFBaEIsSUFBNEJULFdBQTVCO0FBQ0FJLE1BQU1LLFNBQU4sQ0FBZ0JFLEdBQWhCLEdBQXNCVixRQUF0QjtBQUNBRyxNQUFNSyxTQUFOLENBQWdCRyxHQUFoQixHQUFzQlYsUUFBdEI7QUFDQUUsTUFBTUssU0FBTixDQUFnQkksR0FBaEIsR0FBc0JWLFFBQXRCOztBQUVBVyxPQUFPQyxPQUFQLEdBQWlCWCxLQUFqQiIsImZpbGUiOiJfU3RhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgTGlzdENhY2hlID0gcmVxdWlyZSgnLi9fTGlzdENhY2hlJyksXG4gICAgc3RhY2tDbGVhciA9IHJlcXVpcmUoJy4vX3N0YWNrQ2xlYXInKSxcbiAgICBzdGFja0RlbGV0ZSA9IHJlcXVpcmUoJy4vX3N0YWNrRGVsZXRlJyksXG4gICAgc3RhY2tHZXQgPSByZXF1aXJlKCcuL19zdGFja0dldCcpLFxuICAgIHN0YWNrSGFzID0gcmVxdWlyZSgnLi9fc3RhY2tIYXMnKSxcbiAgICBzdGFja1NldCA9IHJlcXVpcmUoJy4vX3N0YWNrU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxubW9kdWxlLmV4cG9ydHMgPSBTdGFjaztcbiJdfQ==