"use strict";

/**
 * This method invokes `interceptor` and returns `value`. The interceptor
 * is invoked with one argument; (value). The purpose of this method is to
 * "tap into" a method chain sequence in order to modify intermediate results.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Seq
 * @param {*} value The value to provide to `interceptor`.
 * @param {Function} interceptor The function to invoke.
 * @returns {*} Returns `value`.
 * @example
 *
 * _([1, 2, 3])
 *  .tap(function(array) {
 *    // Mutate input array.
 *    array.pop();
 *  })
 *  .reverse()
 *  .value();
 * // => [2, 1]
 */
function tap(value, interceptor) {
  interceptor(value);
  return value;
}

module.exports = tap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL3RhcC5qcyJdLCJuYW1lcyI6WyJ0YXAiLCJ2YWx1ZSIsImludGVyY2VwdG9yIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsU0FBU0EsR0FBVCxDQUFhQyxLQUFiLEVBQW9CQyxXQUFwQixFQUFpQztBQUMvQkEsY0FBWUQsS0FBWjtBQUNBLFNBQU9BLEtBQVA7QUFDRDs7QUFFREUsT0FBT0MsT0FBUCxHQUFpQkosR0FBakIiLCJmaWxlIjoidGFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGlzIG1ldGhvZCBpbnZva2VzIGBpbnRlcmNlcHRvcmAgYW5kIHJldHVybnMgYHZhbHVlYC4gVGhlIGludGVyY2VwdG9yXG4gKiBpcyBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OyAodmFsdWUpLiBUaGUgcHVycG9zZSBvZiB0aGlzIG1ldGhvZCBpcyB0b1xuICogXCJ0YXAgaW50b1wiIGEgbWV0aG9kIGNoYWluIHNlcXVlbmNlIGluIG9yZGVyIHRvIG1vZGlmeSBpbnRlcm1lZGlhdGUgcmVzdWx0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgU2VxXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm92aWRlIHRvIGBpbnRlcmNlcHRvcmAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpbnRlcmNlcHRvciBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXyhbMSwgMiwgM10pXG4gKiAgLnRhcChmdW5jdGlvbihhcnJheSkge1xuICogICAgLy8gTXV0YXRlIGlucHV0IGFycmF5LlxuICogICAgYXJyYXkucG9wKCk7XG4gKiAgfSlcbiAqICAucmV2ZXJzZSgpXG4gKiAgLnZhbHVlKCk7XG4gKiAvLyA9PiBbMiwgMV1cbiAqL1xuZnVuY3Rpb24gdGFwKHZhbHVlLCBpbnRlcmNlcHRvcikge1xuICBpbnRlcmNlcHRvcih2YWx1ZSk7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0YXA7XG4iXX0=