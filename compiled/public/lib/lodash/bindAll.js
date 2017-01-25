'use strict';

var arrayEach = require('./_arrayEach'),
    baseAssignValue = require('./_baseAssignValue'),
    bind = require('./bind'),
    flatRest = require('./_flatRest'),
    toKey = require('./_toKey');

/**
 * Binds methods of an object to the object itself, overwriting the existing
 * method.
 *
 * **Note:** This method doesn't set the "length" property of bound functions.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {Object} object The object to bind and assign the bound methods to.
 * @param {...(string|string[])} methodNames The object method names to bind.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var view = {
 *   'label': 'docs',
 *   'click': function() {
 *     console.log('clicked ' + this.label);
 *   }
 * };
 *
 * _.bindAll(view, ['click']);
 * jQuery(element).on('click', view.click);
 * // => Logs 'clicked docs' when clicked.
 */
var bindAll = flatRest(function (object, methodNames) {
  arrayEach(methodNames, function (key) {
    key = toKey(key);
    baseAssignValue(object, key, bind(object[key], object));
  });
  return object;
});

module.exports = bindAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL2JpbmRBbGwuanMiXSwibmFtZXMiOlsiYXJyYXlFYWNoIiwicmVxdWlyZSIsImJhc2VBc3NpZ25WYWx1ZSIsImJpbmQiLCJmbGF0UmVzdCIsInRvS2V5IiwiYmluZEFsbCIsIm9iamVjdCIsIm1ldGhvZE5hbWVzIiwia2V5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxZQUFZQyxRQUFRLGNBQVIsQ0FBaEI7QUFBQSxJQUNJQyxrQkFBa0JELFFBQVEsb0JBQVIsQ0FEdEI7QUFBQSxJQUVJRSxPQUFPRixRQUFRLFFBQVIsQ0FGWDtBQUFBLElBR0lHLFdBQVdILFFBQVEsYUFBUixDQUhmO0FBQUEsSUFJSUksUUFBUUosUUFBUSxVQUFSLENBSlo7O0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlLLFVBQVVGLFNBQVMsVUFBU0csTUFBVCxFQUFpQkMsV0FBakIsRUFBOEI7QUFDbkRSLFlBQVVRLFdBQVYsRUFBdUIsVUFBU0MsR0FBVCxFQUFjO0FBQ25DQSxVQUFNSixNQUFNSSxHQUFOLENBQU47QUFDQVAsb0JBQWdCSyxNQUFoQixFQUF3QkUsR0FBeEIsRUFBNkJOLEtBQUtJLE9BQU9FLEdBQVAsQ0FBTCxFQUFrQkYsTUFBbEIsQ0FBN0I7QUFDRCxHQUhEO0FBSUEsU0FBT0EsTUFBUDtBQUNELENBTmEsQ0FBZDs7QUFRQUcsT0FBT0MsT0FBUCxHQUFpQkwsT0FBakIiLCJmaWxlIjoiYmluZEFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcnJheUVhY2ggPSByZXF1aXJlKCcuL19hcnJheUVhY2gnKSxcbiAgICBiYXNlQXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19iYXNlQXNzaWduVmFsdWUnKSxcbiAgICBiaW5kID0gcmVxdWlyZSgnLi9iaW5kJyksXG4gICAgZmxhdFJlc3QgPSByZXF1aXJlKCcuL19mbGF0UmVzdCcpLFxuICAgIHRvS2V5ID0gcmVxdWlyZSgnLi9fdG9LZXknKTtcblxuLyoqXG4gKiBCaW5kcyBtZXRob2RzIG9mIGFuIG9iamVjdCB0byB0aGUgb2JqZWN0IGl0c2VsZiwgb3ZlcndyaXRpbmcgdGhlIGV4aXN0aW5nXG4gKiBtZXRob2QuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGRvZXNuJ3Qgc2V0IHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IG9mIGJvdW5kIGZ1bmN0aW9ucy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJpbmQgYW5kIGFzc2lnbiB0aGUgYm91bmQgbWV0aG9kcyB0by5cbiAqIEBwYXJhbSB7Li4uKHN0cmluZ3xzdHJpbmdbXSl9IG1ldGhvZE5hbWVzIFRoZSBvYmplY3QgbWV0aG9kIG5hbWVzIHRvIGJpbmQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdmlldyA9IHtcbiAqICAgJ2xhYmVsJzogJ2RvY3MnLFxuICogICAnY2xpY2snOiBmdW5jdGlvbigpIHtcbiAqICAgICBjb25zb2xlLmxvZygnY2xpY2tlZCAnICsgdGhpcy5sYWJlbCk7XG4gKiAgIH1cbiAqIH07XG4gKlxuICogXy5iaW5kQWxsKHZpZXcsIFsnY2xpY2snXSk7XG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgdmlldy5jbGljayk7XG4gKiAvLyA9PiBMb2dzICdjbGlja2VkIGRvY3MnIHdoZW4gY2xpY2tlZC5cbiAqL1xudmFyIGJpbmRBbGwgPSBmbGF0UmVzdChmdW5jdGlvbihvYmplY3QsIG1ldGhvZE5hbWVzKSB7XG4gIGFycmF5RWFjaChtZXRob2ROYW1lcywgZnVuY3Rpb24oa2V5KSB7XG4gICAga2V5ID0gdG9LZXkoa2V5KTtcbiAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIGJpbmQob2JqZWN0W2tleV0sIG9iamVjdCkpO1xuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRBbGw7XG4iXX0=