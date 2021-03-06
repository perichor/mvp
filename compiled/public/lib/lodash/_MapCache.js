'use strict';

var mapCacheClear = require('./_mapCacheClear'),
    mapCacheDelete = require('./_mapCacheDelete'),
    mapCacheGet = require('./_mapCacheGet'),
    mapCacheHas = require('./_mapCacheHas'),
    mapCacheSet = require('./_mapCacheSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19NYXBDYWNoZS5qcyJdLCJuYW1lcyI6WyJtYXBDYWNoZUNsZWFyIiwicmVxdWlyZSIsIm1hcENhY2hlRGVsZXRlIiwibWFwQ2FjaGVHZXQiLCJtYXBDYWNoZUhhcyIsIm1hcENhY2hlU2V0IiwiTWFwQ2FjaGUiLCJlbnRyaWVzIiwiaW5kZXgiLCJsZW5ndGgiLCJjbGVhciIsImVudHJ5Iiwic2V0IiwicHJvdG90eXBlIiwiZ2V0IiwiaGFzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxnQkFBZ0JDLFFBQVEsa0JBQVIsQ0FBcEI7QUFBQSxJQUNJQyxpQkFBaUJELFFBQVEsbUJBQVIsQ0FEckI7QUFBQSxJQUVJRSxjQUFjRixRQUFRLGdCQUFSLENBRmxCO0FBQUEsSUFHSUcsY0FBY0gsUUFBUSxnQkFBUixDQUhsQjtBQUFBLElBSUlJLGNBQWNKLFFBQVEsZ0JBQVIsQ0FKbEI7O0FBTUE7Ozs7Ozs7QUFPQSxTQUFTSyxRQUFULENBQWtCQyxPQUFsQixFQUEyQjtBQUN6QixRQUFJQyxRQUFRLENBQUMsQ0FBYjtBQUFBLFFBQ0lDLFNBQVNGLFdBQVcsSUFBWCxHQUFrQixDQUFsQixHQUFzQkEsUUFBUUUsTUFEM0M7O0FBR0EsU0FBS0MsS0FBTDtBQUNBLFdBQU8sRUFBRUYsS0FBRixHQUFVQyxNQUFqQixFQUF5QjtBQUN2QixZQUFJRSxRQUFRSixRQUFRQyxLQUFSLENBQVo7QUFDQSxhQUFLSSxHQUFMLENBQVNELE1BQU0sQ0FBTixDQUFULEVBQW1CQSxNQUFNLENBQU4sQ0FBbkI7QUFDRDtBQUNGOztBQUVEO0FBQ0FMLFNBQVNPLFNBQVQsQ0FBbUJILEtBQW5CLEdBQTJCVixhQUEzQjtBQUNBTSxTQUFTTyxTQUFULENBQW1CLFFBQW5CLElBQStCWCxjQUEvQjtBQUNBSSxTQUFTTyxTQUFULENBQW1CQyxHQUFuQixHQUF5QlgsV0FBekI7QUFDQUcsU0FBU08sU0FBVCxDQUFtQkUsR0FBbkIsR0FBeUJYLFdBQXpCO0FBQ0FFLFNBQVNPLFNBQVQsQ0FBbUJELEdBQW5CLEdBQXlCUCxXQUF6Qjs7QUFFQVcsT0FBT0MsT0FBUCxHQUFpQlgsUUFBakIiLCJmaWxlIjoiX01hcENhY2hlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1hcENhY2hlQ2xlYXIgPSByZXF1aXJlKCcuL19tYXBDYWNoZUNsZWFyJyksXG4gICAgbWFwQ2FjaGVEZWxldGUgPSByZXF1aXJlKCcuL19tYXBDYWNoZURlbGV0ZScpLFxuICAgIG1hcENhY2hlR2V0ID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVHZXQnKSxcbiAgICBtYXBDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX21hcENhY2hlSGFzJyksXG4gICAgbWFwQ2FjaGVTZXQgPSByZXF1aXJlKCcuL19tYXBDYWNoZVNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXBDYWNoZTtcbiJdfQ==