'use strict';

var LazyWrapper = require('./_LazyWrapper'),
    LodashWrapper = require('./_LodashWrapper'),
    baseAt = require('./_baseAt'),
    flatRest = require('./_flatRest'),
    isIndex = require('./_isIndex'),
    thru = require('./thru');

/**
 * This method is the wrapper version of `_.at`.
 *
 * @name at
 * @memberOf _
 * @since 1.0.0
 * @category Seq
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
 *
 * _(object).at(['a[0].b.c', 'a[1]']).value();
 * // => [3, 4]
 */
var wrapperAt = flatRest(function (paths) {
  var length = paths.length,
      start = length ? paths[0] : 0,
      value = this.__wrapped__,
      interceptor = function interceptor(object) {
    return baseAt(object, paths);
  };

  if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
    return this.thru(interceptor);
  }
  value = value.slice(start, +start + (length ? 1 : 0));
  value.__actions__.push({
    'func': thru,
    'args': [interceptor],
    'thisArg': undefined
  });
  return new LodashWrapper(value, this.__chain__).thru(function (array) {
    if (length && !array.length) {
      array.push(undefined);
    }
    return array;
  });
});

module.exports = wrapperAt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3dyYXBwZXJBdC5qcyJdLCJuYW1lcyI6WyJMYXp5V3JhcHBlciIsInJlcXVpcmUiLCJMb2Rhc2hXcmFwcGVyIiwiYmFzZUF0IiwiZmxhdFJlc3QiLCJpc0luZGV4IiwidGhydSIsIndyYXBwZXJBdCIsInBhdGhzIiwibGVuZ3RoIiwic3RhcnQiLCJ2YWx1ZSIsIl9fd3JhcHBlZF9fIiwiaW50ZXJjZXB0b3IiLCJvYmplY3QiLCJfX2FjdGlvbnNfXyIsInNsaWNlIiwicHVzaCIsInVuZGVmaW5lZCIsIl9fY2hhaW5fXyIsImFycmF5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxjQUFjQyxRQUFRLGdCQUFSLENBQWxCO0FBQUEsSUFDSUMsZ0JBQWdCRCxRQUFRLGtCQUFSLENBRHBCO0FBQUEsSUFFSUUsU0FBU0YsUUFBUSxXQUFSLENBRmI7QUFBQSxJQUdJRyxXQUFXSCxRQUFRLGFBQVIsQ0FIZjtBQUFBLElBSUlJLFVBQVVKLFFBQVEsWUFBUixDQUpkO0FBQUEsSUFLSUssT0FBT0wsUUFBUSxRQUFSLENBTFg7O0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsSUFBSU0sWUFBWUgsU0FBUyxVQUFTSSxLQUFULEVBQWdCO0FBQ3ZDLE1BQUlDLFNBQVNELE1BQU1DLE1BQW5CO0FBQUEsTUFDSUMsUUFBUUQsU0FBU0QsTUFBTSxDQUFOLENBQVQsR0FBb0IsQ0FEaEM7QUFBQSxNQUVJRyxRQUFRLEtBQUtDLFdBRmpCO0FBQUEsTUFHSUMsY0FBYyxTQUFkQSxXQUFjLENBQVNDLE1BQVQsRUFBaUI7QUFBRSxXQUFPWCxPQUFPVyxNQUFQLEVBQWVOLEtBQWYsQ0FBUDtBQUErQixHQUhwRTs7QUFLQSxNQUFJQyxTQUFTLENBQVQsSUFBYyxLQUFLTSxXQUFMLENBQWlCTixNQUEvQixJQUNBLEVBQUVFLGlCQUFpQlgsV0FBbkIsQ0FEQSxJQUNtQyxDQUFDSyxRQUFRSyxLQUFSLENBRHhDLEVBQ3dEO0FBQ3RELFdBQU8sS0FBS0osSUFBTCxDQUFVTyxXQUFWLENBQVA7QUFDRDtBQUNERixVQUFRQSxNQUFNSyxLQUFOLENBQVlOLEtBQVosRUFBbUIsQ0FBQ0EsS0FBRCxJQUFVRCxTQUFTLENBQVQsR0FBYSxDQUF2QixDQUFuQixDQUFSO0FBQ0FFLFFBQU1JLFdBQU4sQ0FBa0JFLElBQWxCLENBQXVCO0FBQ3JCLFlBQVFYLElBRGE7QUFFckIsWUFBUSxDQUFDTyxXQUFELENBRmE7QUFHckIsZUFBV0s7QUFIVSxHQUF2QjtBQUtBLFNBQU8sSUFBSWhCLGFBQUosQ0FBa0JTLEtBQWxCLEVBQXlCLEtBQUtRLFNBQTlCLEVBQXlDYixJQUF6QyxDQUE4QyxVQUFTYyxLQUFULEVBQWdCO0FBQ25FLFFBQUlYLFVBQVUsQ0FBQ1csTUFBTVgsTUFBckIsRUFBNkI7QUFDM0JXLFlBQU1ILElBQU4sQ0FBV0MsU0FBWDtBQUNEO0FBQ0QsV0FBT0UsS0FBUDtBQUNELEdBTE0sQ0FBUDtBQU1ELENBdEJlLENBQWhCOztBQXdCQUMsT0FBT0MsT0FBUCxHQUFpQmYsU0FBakIiLCJmaWxlIjoid3JhcHBlckF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIExhenlXcmFwcGVyID0gcmVxdWlyZSgnLi9fTGF6eVdyYXBwZXInKSxcbiAgICBMb2Rhc2hXcmFwcGVyID0gcmVxdWlyZSgnLi9fTG9kYXNoV3JhcHBlcicpLFxuICAgIGJhc2VBdCA9IHJlcXVpcmUoJy4vX2Jhc2VBdCcpLFxuICAgIGZsYXRSZXN0ID0gcmVxdWlyZSgnLi9fZmxhdFJlc3QnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIHRocnUgPSByZXF1aXJlKCcuL3RocnUnKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyB0aGUgd3JhcHBlciB2ZXJzaW9uIG9mIGBfLmF0YC5cbiAqXG4gKiBAbmFtZSBhdFxuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAxLjAuMFxuICogQGNhdGVnb3J5IFNlcVxuICogQHBhcmFtIHsuLi4oc3RyaW5nfHN0cmluZ1tdKX0gW3BhdGhzXSBUaGUgcHJvcGVydHkgcGF0aHMgdG8gcGljay5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBgbG9kYXNoYCB3cmFwcGVyIGluc3RhbmNlLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IFt7ICdiJzogeyAnYyc6IDMgfSB9LCA0XSB9O1xuICpcbiAqIF8ob2JqZWN0KS5hdChbJ2FbMF0uYi5jJywgJ2FbMV0nXSkudmFsdWUoKTtcbiAqIC8vID0+IFszLCA0XVxuICovXG52YXIgd3JhcHBlckF0ID0gZmxhdFJlc3QoZnVuY3Rpb24ocGF0aHMpIHtcbiAgdmFyIGxlbmd0aCA9IHBhdGhzLmxlbmd0aCxcbiAgICAgIHN0YXJ0ID0gbGVuZ3RoID8gcGF0aHNbMF0gOiAwLFxuICAgICAgdmFsdWUgPSB0aGlzLl9fd3JhcHBlZF9fLFxuICAgICAgaW50ZXJjZXB0b3IgPSBmdW5jdGlvbihvYmplY3QpIHsgcmV0dXJuIGJhc2VBdChvYmplY3QsIHBhdGhzKTsgfTtcblxuICBpZiAobGVuZ3RoID4gMSB8fCB0aGlzLl9fYWN0aW9uc19fLmxlbmd0aCB8fFxuICAgICAgISh2YWx1ZSBpbnN0YW5jZW9mIExhenlXcmFwcGVyKSB8fCAhaXNJbmRleChzdGFydCkpIHtcbiAgICByZXR1cm4gdGhpcy50aHJ1KGludGVyY2VwdG9yKTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnNsaWNlKHN0YXJ0LCArc3RhcnQgKyAobGVuZ3RoID8gMSA6IDApKTtcbiAgdmFsdWUuX19hY3Rpb25zX18ucHVzaCh7XG4gICAgJ2Z1bmMnOiB0aHJ1LFxuICAgICdhcmdzJzogW2ludGVyY2VwdG9yXSxcbiAgICAndGhpc0FyZyc6IHVuZGVmaW5lZFxuICB9KTtcbiAgcmV0dXJuIG5ldyBMb2Rhc2hXcmFwcGVyKHZhbHVlLCB0aGlzLl9fY2hhaW5fXykudGhydShmdW5jdGlvbihhcnJheSkge1xuICAgIGlmIChsZW5ndGggJiYgIWFycmF5Lmxlbmd0aCkge1xuICAgICAgYXJyYXkucHVzaCh1bmRlZmluZWQpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG4gIH0pO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gd3JhcHBlckF0O1xuIl19