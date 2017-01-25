"use strict";

define(["../core", "../event", "./trigger"], function (jQuery) {

	"use strict";

	jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {

		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});

	jQuery.fn.extend({
		hover: function hover(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9ldmVudC9hbGlhcy5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCJqUXVlcnkiLCJlYWNoIiwic3BsaXQiLCJpIiwibmFtZSIsImZuIiwiZGF0YSIsImFyZ3VtZW50cyIsImxlbmd0aCIsIm9uIiwidHJpZ2dlciIsImV4dGVuZCIsImhvdmVyIiwiZm5PdmVyIiwiZm5PdXQiLCJtb3VzZWVudGVyIiwibW91c2VsZWF2ZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsT0FBUSxDQUNQLFNBRE8sRUFHUCxVQUhPLEVBSVAsV0FKTyxDQUFSLEVBS0csVUFBVUMsTUFBVixFQUFtQjs7QUFFdEI7O0FBRUFBLFFBQU9DLElBQVAsQ0FBYSxDQUFFLDhEQUNkLHVFQURjLEdBRWQseURBRlksRUFFZ0RDLEtBRmhELENBRXVELEdBRnZELENBQWIsRUFHQyxVQUFVQyxDQUFWLEVBQWFDLElBQWIsRUFBb0I7O0FBRXBCO0FBQ0FKLFNBQU9LLEVBQVAsQ0FBV0QsSUFBWCxJQUFvQixVQUFVRSxJQUFWLEVBQWdCRCxFQUFoQixFQUFxQjtBQUN4QyxVQUFPRSxVQUFVQyxNQUFWLEdBQW1CLENBQW5CLEdBQ04sS0FBS0MsRUFBTCxDQUFTTCxJQUFULEVBQWUsSUFBZixFQUFxQkUsSUFBckIsRUFBMkJELEVBQTNCLENBRE0sR0FFTixLQUFLSyxPQUFMLENBQWNOLElBQWQsQ0FGRDtBQUdBLEdBSkQ7QUFLQSxFQVhEOztBQWFBSixRQUFPSyxFQUFQLENBQVVNLE1BQVYsQ0FBa0I7QUFDakJDLFNBQU8sZUFBVUMsTUFBVixFQUFrQkMsS0FBbEIsRUFBMEI7QUFDaEMsVUFBTyxLQUFLQyxVQUFMLENBQWlCRixNQUFqQixFQUEwQkcsVUFBMUIsQ0FBc0NGLFNBQVNELE1BQS9DLENBQVA7QUFDQTtBQUhnQixFQUFsQjtBQU1DLENBNUJEIiwiZmlsZSI6ImFsaWFzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKCBbXG5cdFwiLi4vY29yZVwiLFxuXG5cdFwiLi4vZXZlbnRcIixcblx0XCIuL3RyaWdnZXJcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSApIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmpRdWVyeS5lYWNoKCAoIFwiYmx1ciBmb2N1cyBmb2N1c2luIGZvY3Vzb3V0IHJlc2l6ZSBzY3JvbGwgY2xpY2sgZGJsY2xpY2sgXCIgK1xuXHRcIm1vdXNlZG93biBtb3VzZXVwIG1vdXNlbW92ZSBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlIFwiICtcblx0XCJjaGFuZ2Ugc2VsZWN0IHN1Ym1pdCBrZXlkb3duIGtleXByZXNzIGtleXVwIGNvbnRleHRtZW51XCIgKS5zcGxpdCggXCIgXCIgKSxcblx0ZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cblx0Ly8gSGFuZGxlIGV2ZW50IGJpbmRpbmdcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAwID9cblx0XHRcdHRoaXMub24oIG5hbWUsIG51bGwsIGRhdGEsIGZuICkgOlxuXHRcdFx0dGhpcy50cmlnZ2VyKCBuYW1lICk7XG5cdH07XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0aG92ZXI6IGZ1bmN0aW9uKCBmbk92ZXIsIGZuT3V0ICkge1xuXHRcdHJldHVybiB0aGlzLm1vdXNlZW50ZXIoIGZuT3ZlciApLm1vdXNlbGVhdmUoIGZuT3V0IHx8IGZuT3ZlciApO1xuXHR9XG59ICk7XG5cbn0gKTtcbiJdfQ==