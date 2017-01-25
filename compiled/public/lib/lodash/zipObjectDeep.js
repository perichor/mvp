'use strict';

var baseSet = require('./_baseSet'),
    baseZipObject = require('./_baseZipObject');

/**
 * This method is like `_.zipObject` except that it supports property paths.
 *
 * @static
 * @memberOf _
 * @since 4.1.0
 * @category Array
 * @param {Array} [props=[]] The property identifiers.
 * @param {Array} [values=[]] The property values.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
 * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
 */
function zipObjectDeep(props, values) {
  return baseZipObject(props || [], values || [], baseSet);
}

module.exports = zipObjectDeep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3ppcE9iamVjdERlZXAuanMiXSwibmFtZXMiOlsiYmFzZVNldCIsInJlcXVpcmUiLCJiYXNlWmlwT2JqZWN0IiwiemlwT2JqZWN0RGVlcCIsInByb3BzIiwidmFsdWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxVQUFVQyxRQUFRLFlBQVIsQ0FBZDtBQUFBLElBQ0lDLGdCQUFnQkQsUUFBUSxrQkFBUixDQURwQjs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsU0FBU0UsYUFBVCxDQUF1QkMsS0FBdkIsRUFBOEJDLE1BQTlCLEVBQXNDO0FBQ3BDLFNBQU9ILGNBQWNFLFNBQVMsRUFBdkIsRUFBMkJDLFVBQVUsRUFBckMsRUFBeUNMLE9BQXpDLENBQVA7QUFDRDs7QUFFRE0sT0FBT0MsT0FBUCxHQUFpQkosYUFBakIiLCJmaWxlIjoiemlwT2JqZWN0RGVlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlU2V0ID0gcmVxdWlyZSgnLi9fYmFzZVNldCcpLFxuICAgIGJhc2VaaXBPYmplY3QgPSByZXF1aXJlKCcuL19iYXNlWmlwT2JqZWN0Jyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy56aXBPYmplY3RgIGV4Y2VwdCB0aGF0IGl0IHN1cHBvcnRzIHByb3BlcnR5IHBhdGhzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gW3Byb3BzPVtdXSBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzPVtdXSBUaGUgcHJvcGVydHkgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy56aXBPYmplY3REZWVwKFsnYS5iWzBdLmMnLCAnYS5iWzFdLmQnXSwgWzEsIDJdKTtcbiAqIC8vID0+IHsgJ2EnOiB7ICdiJzogW3sgJ2MnOiAxIH0sIHsgJ2QnOiAyIH1dIH0gfVxuICovXG5mdW5jdGlvbiB6aXBPYmplY3REZWVwKHByb3BzLCB2YWx1ZXMpIHtcbiAgcmV0dXJuIGJhc2VaaXBPYmplY3QocHJvcHMgfHwgW10sIHZhbHVlcyB8fCBbXSwgYmFzZVNldCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gemlwT2JqZWN0RGVlcDtcbiJdfQ==