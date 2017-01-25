'use strict';

var constant = require('./constant'),
    createInverter = require('./_createInverter'),
    identity = require('./identity');

/**
 * Creates an object composed of the inverted keys and values of `object`.
 * If `object` contains duplicate values, subsequent values overwrite
 * property assignments of previous values.
 *
 * @static
 * @memberOf _
 * @since 0.7.0
 * @category Object
 * @param {Object} object The object to invert.
 * @returns {Object} Returns the new inverted object.
 * @example
 *
 * var object = { 'a': 1, 'b': 2, 'c': 1 };
 *
 * _.invert(object);
 * // => { '1': 'c', '2': 'b' }
 */
var invert = createInverter(function (result, value, key) {
  result[value] = key;
}, constant(identity));

module.exports = invert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2ludmVydC5qcyJdLCJuYW1lcyI6WyJjb25zdGFudCIsInJlcXVpcmUiLCJjcmVhdGVJbnZlcnRlciIsImlkZW50aXR5IiwiaW52ZXJ0IiwicmVzdWx0IiwidmFsdWUiLCJrZXkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFdBQVdDLFFBQVEsWUFBUixDQUFmO0FBQUEsSUFDSUMsaUJBQWlCRCxRQUFRLG1CQUFSLENBRHJCO0FBQUEsSUFFSUUsV0FBV0YsUUFBUSxZQUFSLENBRmY7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxJQUFJRyxTQUFTRixlQUFlLFVBQVNHLE1BQVQsRUFBaUJDLEtBQWpCLEVBQXdCQyxHQUF4QixFQUE2QjtBQUN2REYsU0FBT0MsS0FBUCxJQUFnQkMsR0FBaEI7QUFDRCxDQUZZLEVBRVZQLFNBQVNHLFFBQVQsQ0FGVSxDQUFiOztBQUlBSyxPQUFPQyxPQUFQLEdBQWlCTCxNQUFqQiIsImZpbGUiOiJpbnZlcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY29uc3RhbnQgPSByZXF1aXJlKCcuL2NvbnN0YW50JyksXG4gICAgY3JlYXRlSW52ZXJ0ZXIgPSByZXF1aXJlKCcuL19jcmVhdGVJbnZlcnRlcicpLFxuICAgIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBpbnZlcnRlZCBrZXlzIGFuZCB2YWx1ZXMgb2YgYG9iamVjdGAuXG4gKiBJZiBgb2JqZWN0YCBjb250YWlucyBkdXBsaWNhdGUgdmFsdWVzLCBzdWJzZXF1ZW50IHZhbHVlcyBvdmVyd3JpdGVcbiAqIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHZhbHVlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuNy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW52ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IGludmVydGVkIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMSB9O1xuICpcbiAqIF8uaW52ZXJ0KG9iamVjdCk7XG4gKiAvLyA9PiB7ICcxJzogJ2MnLCAnMic6ICdiJyB9XG4gKi9cbnZhciBpbnZlcnQgPSBjcmVhdGVJbnZlcnRlcihmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgcmVzdWx0W3ZhbHVlXSA9IGtleTtcbn0sIGNvbnN0YW50KGlkZW50aXR5KSk7XG5cbm1vZHVsZS5leHBvcnRzID0gaW52ZXJ0O1xuIl19