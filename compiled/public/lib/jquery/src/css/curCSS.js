"use strict";

define(["../core", "./var/rnumnonpx", "./var/rmargin", "./var/getStyles", "./support", "../selector" // Get jQuery.contains
], function (jQuery, rnumnonpx, rmargin, getStyles, support) {

	"use strict";

	function curCSS(elem, name, computed) {
		var width,
		    minWidth,
		    maxWidth,
		    ret,
		    style = elem.style;

		computed = computed || getStyles(elem);

		// Support: IE <=9 only
		// getPropertyValue is only needed for .css('filter') (#12537)
		if (computed) {
			ret = computed.getPropertyValue(name) || computed[name];

			if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
				ret = jQuery.style(elem, name);
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" : ret;
	}

	return curCSS;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9jc3MvY3VyQ1NTLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsImpRdWVyeSIsInJudW1ub25weCIsInJtYXJnaW4iLCJnZXRTdHlsZXMiLCJzdXBwb3J0IiwiY3VyQ1NTIiwiZWxlbSIsIm5hbWUiLCJjb21wdXRlZCIsIndpZHRoIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsInJldCIsInN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsImNvbnRhaW5zIiwib3duZXJEb2N1bWVudCIsInBpeGVsTWFyZ2luUmlnaHQiLCJ0ZXN0IiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFRLENBQ1AsU0FETyxFQUVQLGlCQUZPLEVBR1AsZUFITyxFQUlQLGlCQUpPLEVBS1AsV0FMTyxFQU1QLGFBTk8sQ0FNTztBQU5QLENBQVIsRUFPRyxVQUFVQyxNQUFWLEVBQWtCQyxTQUFsQixFQUE2QkMsT0FBN0IsRUFBc0NDLFNBQXRDLEVBQWlEQyxPQUFqRCxFQUEyRDs7QUFFOUQ7O0FBRUEsVUFBU0MsTUFBVCxDQUFpQkMsSUFBakIsRUFBdUJDLElBQXZCLEVBQTZCQyxRQUE3QixFQUF3QztBQUN2QyxNQUFJQyxLQUFKO0FBQUEsTUFBV0MsUUFBWDtBQUFBLE1BQXFCQyxRQUFyQjtBQUFBLE1BQStCQyxHQUEvQjtBQUFBLE1BQ0NDLFFBQVFQLEtBQUtPLEtBRGQ7O0FBR0FMLGFBQVdBLFlBQVlMLFVBQVdHLElBQVgsQ0FBdkI7O0FBRUE7QUFDQTtBQUNBLE1BQUtFLFFBQUwsRUFBZ0I7QUFDZkksU0FBTUosU0FBU00sZ0JBQVQsQ0FBMkJQLElBQTNCLEtBQXFDQyxTQUFVRCxJQUFWLENBQTNDOztBQUVBLE9BQUtLLFFBQVEsRUFBUixJQUFjLENBQUNaLE9BQU9lLFFBQVAsQ0FBaUJULEtBQUtVLGFBQXRCLEVBQXFDVixJQUFyQyxDQUFwQixFQUFrRTtBQUNqRU0sVUFBTVosT0FBT2EsS0FBUCxDQUFjUCxJQUFkLEVBQW9CQyxJQUFwQixDQUFOO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQUssQ0FBQ0gsUUFBUWEsZ0JBQVIsRUFBRCxJQUErQmhCLFVBQVVpQixJQUFWLENBQWdCTixHQUFoQixDQUEvQixJQUF3RFYsUUFBUWdCLElBQVIsQ0FBY1gsSUFBZCxDQUE3RCxFQUFvRjs7QUFFbkY7QUFDQUUsWUFBUUksTUFBTUosS0FBZDtBQUNBQyxlQUFXRyxNQUFNSCxRQUFqQjtBQUNBQyxlQUFXRSxNQUFNRixRQUFqQjs7QUFFQTtBQUNBRSxVQUFNSCxRQUFOLEdBQWlCRyxNQUFNRixRQUFOLEdBQWlCRSxNQUFNSixLQUFOLEdBQWNHLEdBQWhEO0FBQ0FBLFVBQU1KLFNBQVNDLEtBQWY7O0FBRUE7QUFDQUksVUFBTUosS0FBTixHQUFjQSxLQUFkO0FBQ0FJLFVBQU1ILFFBQU4sR0FBaUJBLFFBQWpCO0FBQ0FHLFVBQU1GLFFBQU4sR0FBaUJBLFFBQWpCO0FBQ0E7QUFDRDs7QUFFRCxTQUFPQyxRQUFRTyxTQUFSOztBQUVOO0FBQ0E7QUFDQVAsUUFBTSxFQUpBLEdBS05BLEdBTEQ7QUFNQTs7QUFFRCxRQUFPUCxNQUFQO0FBQ0MsQ0ExREQiLCJmaWxlIjoiY3VyQ1NTLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKCBbXG5cdFwiLi4vY29yZVwiLFxuXHRcIi4vdmFyL3JudW1ub25weFwiLFxuXHRcIi4vdmFyL3JtYXJnaW5cIixcblx0XCIuL3Zhci9nZXRTdHlsZXNcIixcblx0XCIuL3N1cHBvcnRcIixcblx0XCIuLi9zZWxlY3RvclwiIC8vIEdldCBqUXVlcnkuY29udGFpbnNcbl0sIGZ1bmN0aW9uKCBqUXVlcnksIHJudW1ub25weCwgcm1hcmdpbiwgZ2V0U3R5bGVzLCBzdXBwb3J0ICkge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gY3VyQ1NTKCBlbGVtLCBuYW1lLCBjb21wdXRlZCApIHtcblx0dmFyIHdpZHRoLCBtaW5XaWR0aCwgbWF4V2lkdGgsIHJldCxcblx0XHRzdHlsZSA9IGVsZW0uc3R5bGU7XG5cblx0Y29tcHV0ZWQgPSBjb21wdXRlZCB8fCBnZXRTdHlsZXMoIGVsZW0gKTtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuXHQvLyBnZXRQcm9wZXJ0eVZhbHVlIGlzIG9ubHkgbmVlZGVkIGZvciAuY3NzKCdmaWx0ZXInKSAoIzEyNTM3KVxuXHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdHJldCA9IGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUoIG5hbWUgKSB8fCBjb21wdXRlZFsgbmFtZSBdO1xuXG5cdFx0aWYgKCByZXQgPT09IFwiXCIgJiYgIWpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICkgKSB7XG5cdFx0XHRyZXQgPSBqUXVlcnkuc3R5bGUoIGVsZW0sIG5hbWUgKTtcblx0XHR9XG5cblx0XHQvLyBBIHRyaWJ1dGUgdG8gdGhlIFwiYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1wiXG5cdFx0Ly8gQW5kcm9pZCBCcm93c2VyIHJldHVybnMgcGVyY2VudGFnZSBmb3Igc29tZSB2YWx1ZXMsXG5cdFx0Ly8gYnV0IHdpZHRoIHNlZW1zIHRvIGJlIHJlbGlhYmx5IHBpeGVscy5cblx0XHQvLyBUaGlzIGlzIGFnYWluc3QgdGhlIENTU09NIGRyYWZ0IHNwZWM6XG5cdFx0Ly8gaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzc29tLyNyZXNvbHZlZC12YWx1ZXNcblx0XHRpZiAoICFzdXBwb3J0LnBpeGVsTWFyZ2luUmlnaHQoKSAmJiBybnVtbm9ucHgudGVzdCggcmV0ICkgJiYgcm1hcmdpbi50ZXN0KCBuYW1lICkgKSB7XG5cblx0XHRcdC8vIFJlbWVtYmVyIHRoZSBvcmlnaW5hbCB2YWx1ZXNcblx0XHRcdHdpZHRoID0gc3R5bGUud2lkdGg7XG5cdFx0XHRtaW5XaWR0aCA9IHN0eWxlLm1pbldpZHRoO1xuXHRcdFx0bWF4V2lkdGggPSBzdHlsZS5tYXhXaWR0aDtcblxuXHRcdFx0Ly8gUHV0IGluIHRoZSBuZXcgdmFsdWVzIHRvIGdldCBhIGNvbXB1dGVkIHZhbHVlIG91dFxuXHRcdFx0c3R5bGUubWluV2lkdGggPSBzdHlsZS5tYXhXaWR0aCA9IHN0eWxlLndpZHRoID0gcmV0O1xuXHRcdFx0cmV0ID0gY29tcHV0ZWQud2lkdGg7XG5cblx0XHRcdC8vIFJldmVydCB0aGUgY2hhbmdlZCB2YWx1ZXNcblx0XHRcdHN0eWxlLndpZHRoID0gd2lkdGg7XG5cdFx0XHRzdHlsZS5taW5XaWR0aCA9IG1pbldpZHRoO1xuXHRcdFx0c3R5bGUubWF4V2lkdGggPSBtYXhXaWR0aDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmV0ICE9PSB1bmRlZmluZWQgP1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuXHRcdC8vIElFIHJldHVybnMgekluZGV4IHZhbHVlIGFzIGFuIGludGVnZXIuXG5cdFx0cmV0ICsgXCJcIiA6XG5cdFx0cmV0O1xufVxuXG5yZXR1cm4gY3VyQ1NTO1xufSApO1xuIl19