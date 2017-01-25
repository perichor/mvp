'use strict';

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3B1YmxpYy9saWIvbG9kYXNoL19zdGFja0RlbGV0ZS5qcyJdLCJuYW1lcyI6WyJzdGFja0RlbGV0ZSIsImtleSIsImRhdGEiLCJfX2RhdGFfXyIsInJlc3VsdCIsInNpemUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7QUFTQSxTQUFTQSxXQUFULENBQXFCQyxHQUFyQixFQUEwQjtBQUN4QixNQUFJQyxPQUFPLEtBQUtDLFFBQWhCO0FBQUEsTUFDSUMsU0FBU0YsS0FBSyxRQUFMLEVBQWVELEdBQWYsQ0FEYjs7QUFHQSxPQUFLSSxJQUFMLEdBQVlILEtBQUtHLElBQWpCO0FBQ0EsU0FBT0QsTUFBUDtBQUNEOztBQUVERSxPQUFPQyxPQUFQLEdBQWlCUCxXQUFqQiIsImZpbGUiOiJfc3RhY2tEZWxldGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgcmVzdWx0ID0gZGF0YVsnZGVsZXRlJ10oa2V5KTtcblxuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tEZWxldGU7XG4iXX0=