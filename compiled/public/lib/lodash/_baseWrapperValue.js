'use strict';

var LazyWrapper = require('./_LazyWrapper'),
    arrayPush = require('./_arrayPush'),
    arrayReduce = require('./_arrayReduce');

/**
 * The base implementation of `wrapperValue` which returns the result of
 * performing a sequence of actions on the unwrapped `value`, where each
 * successive action is supplied the return value of the previous.
 *
 * @private
 * @param {*} value The unwrapped value.
 * @param {Array} actions Actions to perform to resolve the unwrapped value.
 * @returns {*} Returns the resolved value.
 */
function baseWrapperValue(value, actions) {
  var result = value;
  if (result instanceof LazyWrapper) {
    result = result.value();
  }
  return arrayReduce(actions, function (result, action) {
    return action.func.apply(action.thisArg, arrayPush([result], action.args));
  }, result);
}

module.exports = baseWrapperValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19iYXNlV3JhcHBlclZhbHVlLmpzIl0sIm5hbWVzIjpbIkxhenlXcmFwcGVyIiwicmVxdWlyZSIsImFycmF5UHVzaCIsImFycmF5UmVkdWNlIiwiYmFzZVdyYXBwZXJWYWx1ZSIsInZhbHVlIiwiYWN0aW9ucyIsInJlc3VsdCIsImFjdGlvbiIsImZ1bmMiLCJhcHBseSIsInRoaXNBcmciLCJhcmdzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxjQUFjQyxRQUFRLGdCQUFSLENBQWxCO0FBQUEsSUFDSUMsWUFBWUQsUUFBUSxjQUFSLENBRGhCO0FBQUEsSUFFSUUsY0FBY0YsUUFBUSxnQkFBUixDQUZsQjs7QUFJQTs7Ozs7Ozs7OztBQVVBLFNBQVNHLGdCQUFULENBQTBCQyxLQUExQixFQUFpQ0MsT0FBakMsRUFBMEM7QUFDeEMsTUFBSUMsU0FBU0YsS0FBYjtBQUNBLE1BQUlFLGtCQUFrQlAsV0FBdEIsRUFBbUM7QUFDakNPLGFBQVNBLE9BQU9GLEtBQVAsRUFBVDtBQUNEO0FBQ0QsU0FBT0YsWUFBWUcsT0FBWixFQUFxQixVQUFTQyxNQUFULEVBQWlCQyxNQUFqQixFQUF5QjtBQUNuRCxXQUFPQSxPQUFPQyxJQUFQLENBQVlDLEtBQVosQ0FBa0JGLE9BQU9HLE9BQXpCLEVBQWtDVCxVQUFVLENBQUNLLE1BQUQsQ0FBVixFQUFvQkMsT0FBT0ksSUFBM0IsQ0FBbEMsQ0FBUDtBQUNELEdBRk0sRUFFSkwsTUFGSSxDQUFQO0FBR0Q7O0FBRURNLE9BQU9DLE9BQVAsR0FBaUJWLGdCQUFqQiIsImZpbGUiOiJfYmFzZVdyYXBwZXJWYWx1ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBMYXp5V3JhcHBlciA9IHJlcXVpcmUoJy4vX0xhenlXcmFwcGVyJyksXG4gICAgYXJyYXlQdXNoID0gcmVxdWlyZSgnLi9fYXJyYXlQdXNoJyksXG4gICAgYXJyYXlSZWR1Y2UgPSByZXF1aXJlKCcuL19hcnJheVJlZHVjZScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGB3cmFwcGVyVmFsdWVgIHdoaWNoIHJldHVybnMgdGhlIHJlc3VsdCBvZlxuICogcGVyZm9ybWluZyBhIHNlcXVlbmNlIG9mIGFjdGlvbnMgb24gdGhlIHVud3JhcHBlZCBgdmFsdWVgLCB3aGVyZSBlYWNoXG4gKiBzdWNjZXNzaXZlIGFjdGlvbiBpcyBzdXBwbGllZCB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBwcmV2aW91cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdW53cmFwcGVkIHZhbHVlLlxuICogQHBhcmFtIHtBcnJheX0gYWN0aW9ucyBBY3Rpb25zIHRvIHBlcmZvcm0gdG8gcmVzb2x2ZSB0aGUgdW53cmFwcGVkIHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlV3JhcHBlclZhbHVlKHZhbHVlLCBhY3Rpb25zKSB7XG4gIHZhciByZXN1bHQgPSB2YWx1ZTtcbiAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIExhenlXcmFwcGVyKSB7XG4gICAgcmVzdWx0ID0gcmVzdWx0LnZhbHVlKCk7XG4gIH1cbiAgcmV0dXJuIGFycmF5UmVkdWNlKGFjdGlvbnMsIGZ1bmN0aW9uKHJlc3VsdCwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi5mdW5jLmFwcGx5KGFjdGlvbi50aGlzQXJnLCBhcnJheVB1c2goW3Jlc3VsdF0sIGFjdGlvbi5hcmdzKSk7XG4gIH0sIHJlc3VsdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVdyYXBwZXJWYWx1ZTtcbiJdfQ==