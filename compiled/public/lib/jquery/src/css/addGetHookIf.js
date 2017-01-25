"use strict";

define(function () {

	"use strict";

	function addGetHookIf(conditionFn, hookFn) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function get() {
				if (conditionFn()) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}

	return addGetHookIf;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9jc3MvYWRkR2V0SG9va0lmLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsImFkZEdldEhvb2tJZiIsImNvbmRpdGlvbkZuIiwiaG9va0ZuIiwiZ2V0IiwiYXBwbHkiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQVEsWUFBVzs7QUFFbkI7O0FBRUEsVUFBU0MsWUFBVCxDQUF1QkMsV0FBdkIsRUFBb0NDLE1BQXBDLEVBQTZDOztBQUU1QztBQUNBLFNBQU87QUFDTkMsUUFBSyxlQUFXO0FBQ2YsUUFBS0YsYUFBTCxFQUFxQjs7QUFFcEI7QUFDQTtBQUNBLFlBQU8sS0FBS0UsR0FBWjtBQUNBO0FBQ0E7O0FBRUQ7QUFDQSxXQUFPLENBQUUsS0FBS0EsR0FBTCxHQUFXRCxNQUFiLEVBQXNCRSxLQUF0QixDQUE2QixJQUE3QixFQUFtQ0MsU0FBbkMsQ0FBUDtBQUNBO0FBWkssR0FBUDtBQWNBOztBQUVELFFBQU9MLFlBQVA7QUFFQyxDQXpCRCIsImZpbGUiOiJhZGRHZXRIb29rSWYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIGZ1bmN0aW9uKCkge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gYWRkR2V0SG9va0lmKCBjb25kaXRpb25GbiwgaG9va0ZuICkge1xuXG5cdC8vIERlZmluZSB0aGUgaG9vaywgd2UnbGwgY2hlY2sgb24gdGhlIGZpcnN0IHJ1biBpZiBpdCdzIHJlYWxseSBuZWVkZWQuXG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggY29uZGl0aW9uRm4oKSApIHtcblxuXHRcdFx0XHQvLyBIb29rIG5vdCBuZWVkZWQgKG9yIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBpdCBkdWVcblx0XHRcdFx0Ly8gdG8gbWlzc2luZyBkZXBlbmRlbmN5KSwgcmVtb3ZlIGl0LlxuXHRcdFx0XHRkZWxldGUgdGhpcy5nZXQ7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSG9vayBuZWVkZWQ7IHJlZGVmaW5lIGl0IHNvIHRoYXQgdGhlIHN1cHBvcnQgdGVzdCBpcyBub3QgZXhlY3V0ZWQgYWdhaW4uXG5cdFx0XHRyZXR1cm4gKCB0aGlzLmdldCA9IGhvb2tGbiApLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHR9XG5cdH07XG59XG5cbnJldHVybiBhZGRHZXRIb29rSWY7XG5cbn0gKTtcbiJdfQ==