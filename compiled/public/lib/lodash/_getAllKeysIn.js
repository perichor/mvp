'use strict';

var baseGetAllKeys = require('./_baseGetAllKeys'),
    getSymbolsIn = require('./_getSymbolsIn'),
    keysIn = require('./keysIn');

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19nZXRBbGxLZXlzSW4uanMiXSwibmFtZXMiOlsiYmFzZUdldEFsbEtleXMiLCJyZXF1aXJlIiwiZ2V0U3ltYm9sc0luIiwia2V5c0luIiwiZ2V0QWxsS2V5c0luIiwib2JqZWN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxpQkFBaUJDLFFBQVEsbUJBQVIsQ0FBckI7QUFBQSxJQUNJQyxlQUFlRCxRQUFRLGlCQUFSLENBRG5CO0FBQUEsSUFFSUUsU0FBU0YsUUFBUSxVQUFSLENBRmI7O0FBSUE7Ozs7Ozs7O0FBUUEsU0FBU0csWUFBVCxDQUFzQkMsTUFBdEIsRUFBOEI7QUFDNUIsU0FBT0wsZUFBZUssTUFBZixFQUF1QkYsTUFBdkIsRUFBK0JELFlBQS9CLENBQVA7QUFDRDs7QUFFREksT0FBT0MsT0FBUCxHQUFpQkgsWUFBakIiLCJmaWxlIjoiX2dldEFsbEtleXNJbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlR2V0QWxsS2V5cyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRBbGxLZXlzJyksXG4gICAgZ2V0U3ltYm9sc0luID0gcmVxdWlyZSgnLi9fZ2V0U3ltYm9sc0luJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi9rZXlzSW4nKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBnZXRBbGxLZXlzSW4ob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXNJbiwgZ2V0U3ltYm9sc0luKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRBbGxLZXlzSW47XG4iXX0=