'use strict';

var toInteger = require('./toInteger'),
    toNumber = require('./toNumber'),
    toString = require('./toString');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Creates a function like `_.round`.
 *
 * @private
 * @param {string} methodName The name of the `Math` method to use when rounding.
 * @returns {Function} Returns the new round function.
 */
function createRound(methodName) {
  var func = Math[methodName];
  return function (number, precision) {
    number = toNumber(number);
    precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      var pair = (toString(number) + 'e').split('e'),
          value = func(pair[0] + 'e' + (+pair[1] + precision));

      pair = (toString(value) + 'e').split('e');
      return +(pair[0] + 'e' + (+pair[1] - precision));
    }
    return func(number);
  };
}

module.exports = createRound;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19jcmVhdGVSb3VuZC5qcyJdLCJuYW1lcyI6WyJ0b0ludGVnZXIiLCJyZXF1aXJlIiwidG9OdW1iZXIiLCJ0b1N0cmluZyIsIm5hdGl2ZU1pbiIsIk1hdGgiLCJtaW4iLCJjcmVhdGVSb3VuZCIsIm1ldGhvZE5hbWUiLCJmdW5jIiwibnVtYmVyIiwicHJlY2lzaW9uIiwicGFpciIsInNwbGl0IiwidmFsdWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFlBQVlDLFFBQVEsYUFBUixDQUFoQjtBQUFBLElBQ0lDLFdBQVdELFFBQVEsWUFBUixDQURmO0FBQUEsSUFFSUUsV0FBV0YsUUFBUSxZQUFSLENBRmY7O0FBSUE7QUFDQSxJQUFJRyxZQUFZQyxLQUFLQyxHQUFyQjs7QUFFQTs7Ozs7OztBQU9BLFNBQVNDLFdBQVQsQ0FBcUJDLFVBQXJCLEVBQWlDO0FBQy9CLE1BQUlDLE9BQU9KLEtBQUtHLFVBQUwsQ0FBWDtBQUNBLFNBQU8sVUFBU0UsTUFBVCxFQUFpQkMsU0FBakIsRUFBNEI7QUFDakNELGFBQVNSLFNBQVNRLE1BQVQsQ0FBVDtBQUNBQyxnQkFBWUEsYUFBYSxJQUFiLEdBQW9CLENBQXBCLEdBQXdCUCxVQUFVSixVQUFVVyxTQUFWLENBQVYsRUFBZ0MsR0FBaEMsQ0FBcEM7QUFDQSxRQUFJQSxTQUFKLEVBQWU7QUFDYjtBQUNBO0FBQ0EsVUFBSUMsT0FBTyxDQUFDVCxTQUFTTyxNQUFULElBQW1CLEdBQXBCLEVBQXlCRyxLQUF6QixDQUErQixHQUEvQixDQUFYO0FBQUEsVUFDSUMsUUFBUUwsS0FBS0csS0FBSyxDQUFMLElBQVUsR0FBVixJQUFpQixDQUFDQSxLQUFLLENBQUwsQ0FBRCxHQUFXRCxTQUE1QixDQUFMLENBRFo7O0FBR0FDLGFBQU8sQ0FBQ1QsU0FBU1csS0FBVCxJQUFrQixHQUFuQixFQUF3QkQsS0FBeEIsQ0FBOEIsR0FBOUIsQ0FBUDtBQUNBLGFBQU8sRUFBRUQsS0FBSyxDQUFMLElBQVUsR0FBVixJQUFpQixDQUFDQSxLQUFLLENBQUwsQ0FBRCxHQUFXRCxTQUE1QixDQUFGLENBQVA7QUFDRDtBQUNELFdBQU9GLEtBQUtDLE1BQUwsQ0FBUDtBQUNELEdBYkQ7QUFjRDs7QUFFREssT0FBT0MsT0FBUCxHQUFpQlQsV0FBakIiLCJmaWxlIjoiX2NyZWF0ZVJvdW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vdG9JbnRlZ2VyJyksXG4gICAgdG9OdW1iZXIgPSByZXF1aXJlKCcuL3RvTnVtYmVyJyksXG4gICAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5yb3VuZGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIFRoZSBuYW1lIG9mIHRoZSBgTWF0aGAgbWV0aG9kIHRvIHVzZSB3aGVuIHJvdW5kaW5nLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgcm91bmQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVJvdW5kKG1ldGhvZE5hbWUpIHtcbiAgdmFyIGZ1bmMgPSBNYXRoW21ldGhvZE5hbWVdO1xuICByZXR1cm4gZnVuY3Rpb24obnVtYmVyLCBwcmVjaXNpb24pIHtcbiAgICBudW1iZXIgPSB0b051bWJlcihudW1iZXIpO1xuICAgIHByZWNpc2lvbiA9IHByZWNpc2lvbiA9PSBudWxsID8gMCA6IG5hdGl2ZU1pbih0b0ludGVnZXIocHJlY2lzaW9uKSwgMjkyKTtcbiAgICBpZiAocHJlY2lzaW9uKSB7XG4gICAgICAvLyBTaGlmdCB3aXRoIGV4cG9uZW50aWFsIG5vdGF0aW9uIHRvIGF2b2lkIGZsb2F0aW5nLXBvaW50IGlzc3Vlcy5cbiAgICAgIC8vIFNlZSBbTUROXShodHRwczovL21kbi5pby9yb3VuZCNFeGFtcGxlcykgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHZhciBwYWlyID0gKHRvU3RyaW5nKG51bWJlcikgKyAnZScpLnNwbGl0KCdlJyksXG4gICAgICAgICAgdmFsdWUgPSBmdW5jKHBhaXJbMF0gKyAnZScgKyAoK3BhaXJbMV0gKyBwcmVjaXNpb24pKTtcblxuICAgICAgcGFpciA9ICh0b1N0cmluZyh2YWx1ZSkgKyAnZScpLnNwbGl0KCdlJyk7XG4gICAgICByZXR1cm4gKyhwYWlyWzBdICsgJ2UnICsgKCtwYWlyWzFdIC0gcHJlY2lzaW9uKSk7XG4gICAgfVxuICAgIHJldHVybiBmdW5jKG51bWJlcik7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUm91bmQ7XG4iXX0=