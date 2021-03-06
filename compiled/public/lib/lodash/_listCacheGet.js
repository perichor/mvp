'use strict';

var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19saXN0Q2FjaGVHZXQuanMiXSwibmFtZXMiOlsiYXNzb2NJbmRleE9mIiwicmVxdWlyZSIsImxpc3RDYWNoZUdldCIsImtleSIsImRhdGEiLCJfX2RhdGFfXyIsImluZGV4IiwidW5kZWZpbmVkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxlQUFlQyxRQUFRLGlCQUFSLENBQW5COztBQUVBOzs7Ozs7Ozs7QUFTQSxTQUFTQyxZQUFULENBQXNCQyxHQUF0QixFQUEyQjtBQUN6QixNQUFJQyxPQUFPLEtBQUtDLFFBQWhCO0FBQUEsTUFDSUMsUUFBUU4sYUFBYUksSUFBYixFQUFtQkQsR0FBbkIsQ0FEWjs7QUFHQSxTQUFPRyxRQUFRLENBQVIsR0FBWUMsU0FBWixHQUF3QkgsS0FBS0UsS0FBTCxFQUFZLENBQVosQ0FBL0I7QUFDRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQlAsWUFBakIiLCJmaWxlIjoiX2xpc3RDYWNoZUdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhc3NvY0luZGV4T2YgPSByZXF1aXJlKCcuL19hc3NvY0luZGV4T2YnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVHZXQ7XG4iXX0=