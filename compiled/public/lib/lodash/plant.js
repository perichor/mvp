'use strict';

var baseLodash = require('./_baseLodash'),
    wrapperClone = require('./_wrapperClone');

/**
 * Creates a clone of the chain sequence planting `value` as the wrapped value.
 *
 * @name plant
 * @memberOf _
 * @since 3.2.0
 * @category Seq
 * @param {*} value The value to plant.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var wrapped = _([1, 2]).map(square);
 * var other = wrapped.plant([3, 4]);
 *
 * other.value();
 * // => [9, 16]
 *
 * wrapped.value();
 * // => [1, 4]
 */
function wrapperPlant(value) {
  var result,
      parent = this;

  while (parent instanceof baseLodash) {
    var clone = wrapperClone(parent);
    clone.__index__ = 0;
    clone.__values__ = undefined;
    if (result) {
      previous.__wrapped__ = clone;
    } else {
      result = clone;
    }
    var previous = clone;
    parent = parent.__wrapped__;
  }
  previous.__wrapped__ = value;
  return result;
}

module.exports = wrapperPlant;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3BsYW50LmpzIl0sIm5hbWVzIjpbImJhc2VMb2Rhc2giLCJyZXF1aXJlIiwid3JhcHBlckNsb25lIiwid3JhcHBlclBsYW50IiwidmFsdWUiLCJyZXN1bHQiLCJwYXJlbnQiLCJjbG9uZSIsIl9faW5kZXhfXyIsIl9fdmFsdWVzX18iLCJ1bmRlZmluZWQiLCJwcmV2aW91cyIsIl9fd3JhcHBlZF9fIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxhQUFhQyxRQUFRLGVBQVIsQ0FBakI7QUFBQSxJQUNJQyxlQUFlRCxRQUFRLGlCQUFSLENBRG5COztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsU0FBU0UsWUFBVCxDQUFzQkMsS0FBdEIsRUFBNkI7QUFDM0IsTUFBSUMsTUFBSjtBQUFBLE1BQ0lDLFNBQVMsSUFEYjs7QUFHQSxTQUFPQSxrQkFBa0JOLFVBQXpCLEVBQXFDO0FBQ25DLFFBQUlPLFFBQVFMLGFBQWFJLE1BQWIsQ0FBWjtBQUNBQyxVQUFNQyxTQUFOLEdBQWtCLENBQWxCO0FBQ0FELFVBQU1FLFVBQU4sR0FBbUJDLFNBQW5CO0FBQ0EsUUFBSUwsTUFBSixFQUFZO0FBQ1ZNLGVBQVNDLFdBQVQsR0FBdUJMLEtBQXZCO0FBQ0QsS0FGRCxNQUVPO0FBQ0xGLGVBQVNFLEtBQVQ7QUFDRDtBQUNELFFBQUlJLFdBQVdKLEtBQWY7QUFDQUQsYUFBU0EsT0FBT00sV0FBaEI7QUFDRDtBQUNERCxXQUFTQyxXQUFULEdBQXVCUixLQUF2QjtBQUNBLFNBQU9DLE1BQVA7QUFDRDs7QUFFRFEsT0FBT0MsT0FBUCxHQUFpQlgsWUFBakIiLCJmaWxlIjoicGxhbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUxvZGFzaCA9IHJlcXVpcmUoJy4vX2Jhc2VMb2Rhc2gnKSxcbiAgICB3cmFwcGVyQ2xvbmUgPSByZXF1aXJlKCcuL193cmFwcGVyQ2xvbmUnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhlIGNoYWluIHNlcXVlbmNlIHBsYW50aW5nIGB2YWx1ZWAgYXMgdGhlIHdyYXBwZWQgdmFsdWUuXG4gKlxuICogQG5hbWUgcGxhbnRcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4yLjBcbiAqIEBjYXRlZ29yeSBTZXFcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHBsYW50LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IGBsb2Rhc2hgIHdyYXBwZXIgaW5zdGFuY2UuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIHNxdWFyZShuKSB7XG4gKiAgIHJldHVybiBuICogbjtcbiAqIH1cbiAqXG4gKiB2YXIgd3JhcHBlZCA9IF8oWzEsIDJdKS5tYXAoc3F1YXJlKTtcbiAqIHZhciBvdGhlciA9IHdyYXBwZWQucGxhbnQoWzMsIDRdKTtcbiAqXG4gKiBvdGhlci52YWx1ZSgpO1xuICogLy8gPT4gWzksIDE2XVxuICpcbiAqIHdyYXBwZWQudmFsdWUoKTtcbiAqIC8vID0+IFsxLCA0XVxuICovXG5mdW5jdGlvbiB3cmFwcGVyUGxhbnQodmFsdWUpIHtcbiAgdmFyIHJlc3VsdCxcbiAgICAgIHBhcmVudCA9IHRoaXM7XG5cbiAgd2hpbGUgKHBhcmVudCBpbnN0YW5jZW9mIGJhc2VMb2Rhc2gpIHtcbiAgICB2YXIgY2xvbmUgPSB3cmFwcGVyQ2xvbmUocGFyZW50KTtcbiAgICBjbG9uZS5fX2luZGV4X18gPSAwO1xuICAgIGNsb25lLl9fdmFsdWVzX18gPSB1bmRlZmluZWQ7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcHJldmlvdXMuX193cmFwcGVkX18gPSBjbG9uZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gY2xvbmU7XG4gICAgfVxuICAgIHZhciBwcmV2aW91cyA9IGNsb25lO1xuICAgIHBhcmVudCA9IHBhcmVudC5fX3dyYXBwZWRfXztcbiAgfVxuICBwcmV2aW91cy5fX3dyYXBwZWRfXyA9IHZhbHVlO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBwZXJQbGFudDtcbiJdfQ==