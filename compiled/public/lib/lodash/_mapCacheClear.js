'use strict';

var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

module.exports = mapCacheClear;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19tYXBDYWNoZUNsZWFyLmpzIl0sIm5hbWVzIjpbIkhhc2giLCJyZXF1aXJlIiwiTGlzdENhY2hlIiwiTWFwIiwibWFwQ2FjaGVDbGVhciIsInNpemUiLCJfX2RhdGFfXyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsT0FBT0MsUUFBUSxTQUFSLENBQVg7QUFBQSxJQUNJQyxZQUFZRCxRQUFRLGNBQVIsQ0FEaEI7QUFBQSxJQUVJRSxNQUFNRixRQUFRLFFBQVIsQ0FGVjs7QUFJQTs7Ozs7OztBQU9BLFNBQVNHLGFBQVQsR0FBeUI7QUFDdkIsT0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxPQUFLQyxRQUFMLEdBQWdCO0FBQ2QsWUFBUSxJQUFJTixJQUFKLEVBRE07QUFFZCxXQUFPLEtBQUtHLE9BQU9ELFNBQVosR0FGTztBQUdkLGNBQVUsSUFBSUYsSUFBSjtBQUhJLEdBQWhCO0FBS0Q7O0FBRURPLE9BQU9DLE9BQVAsR0FBaUJKLGFBQWpCIiwiZmlsZSI6Il9tYXBDYWNoZUNsZWFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEhhc2ggPSByZXF1aXJlKCcuL19IYXNoJyksXG4gICAgTGlzdENhY2hlID0gcmVxdWlyZSgnLi9fTGlzdENhY2hlJyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyk7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuc2l6ZSA9IDA7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZUNsZWFyO1xuIl19