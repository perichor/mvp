"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define(["./core", "./var/pnum", "./core/access", "./css/var/rmargin", "./var/document", "./var/rcssNum", "./css/var/rnumnonpx", "./css/var/cssExpand", "./css/var/getStyles", "./css/var/swap", "./css/curCSS", "./css/adjustCSS", "./css/addGetHookIf", "./css/support", "./core/init", "./core/ready", "./selector" // contains
], function (jQuery, pnum, access, rmargin, document, rcssNum, rnumnonpx, cssExpand, getStyles, swap, curCSS, adjustCSS, addGetHookIf, support) {

	"use strict";

	var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	    cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	    cssPrefixes = ["Webkit", "Moz", "ms"],
	    emptyStyle = document.createElement("div").style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {

		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
		    i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	function setPositiveNumber(elem, value, subtract) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i,
		    val = 0;

		// If we already have the right measurement, avoid augmentation
		if (extra === (isBorderBox ? "border" : "content")) {
			i = 4;

			// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === "width" ? 1 : 0;
		}

		for (; i < 4; i += 2) {

			// Both box models exclude margin, so add it if we want it
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox) {

				// border-box includes padding, so remove it if we want content
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// At this point, extra isn't border nor margin, so remove border
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// At this point, extra isn't content nor padding, so add border
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		return val;
	}

	function getWidthOrHeight(elem, name, extra) {

		// Start with offset property, which is equivalent to the border-box value
		var val,
		    valueIsBorderBox = true,
		    styles = getStyles(elem),
		    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

		// Support: IE <=11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if (elem.getClientRects().length) {
			val = elem.getBoundingClientRect()[name];
		}

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if (val <= 0 || val == null) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS(elem, name, styles);
			if (val < 0 || val == null) {
				val = elem.style[name];
			}

			// Computed unit is not pixels. Stop here and return.
			if (rnumnonpx.test(val)) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

			// Normalize "", auto, and prepare for extra
			val = parseFloat(val) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function get(elem, computed) {
					if (computed) {

						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function style(elem, name, value, extra) {

			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			// Make sure that we're working with the right name
			var ret,
			    type,
			    hooks,
			    origName = jQuery.camelCase(name),
			    style = elem.style;

			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value === "undefined" ? "undefined" : _typeof(value);

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === "number") {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}

				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

					style[name] = value;
				}
			} else {

				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function css(elem, name, extra, styles) {
			var val,
			    num,
			    hooks,
			    origName = jQuery.camelCase(name);

			// Make sure that we're working with the right name
			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each(["height", "width"], function (i, name) {
		jQuery.cssHooks[name] = {
			get: function get(elem, computed, extra) {
				if (computed) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) && (

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
						return getWidthOrHeight(elem, name, extra);
					}) : getWidthOrHeight(elem, name, extra);
				}
			},

			set: function set(elem, value, extra) {
				var matches,
				    styles = extra && getStyles(elem),
				    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

					elem.style[name] = value;
					value = jQuery.css(elem, name);
				}

				return setPositiveNumber(elem, value, subtract);
			}
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
		if (computed) {
			return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
				return elem.getBoundingClientRect().left;
			})) + "px";
		}
	});

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function expand(value) {
				var i = 0,
				    expanded = {},


				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function css(name, value) {
			return access(this, function (elem, name, value) {
				var styles,
				    len,
				    map = {},
				    i = 0;

				if (jQuery.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		}
	});

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9jc3MuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwialF1ZXJ5IiwicG51bSIsImFjY2VzcyIsInJtYXJnaW4iLCJkb2N1bWVudCIsInJjc3NOdW0iLCJybnVtbm9ucHgiLCJjc3NFeHBhbmQiLCJnZXRTdHlsZXMiLCJzd2FwIiwiY3VyQ1NTIiwiYWRqdXN0Q1NTIiwiYWRkR2V0SG9va0lmIiwic3VwcG9ydCIsInJkaXNwbGF5c3dhcCIsImNzc1Nob3ciLCJwb3NpdGlvbiIsInZpc2liaWxpdHkiLCJkaXNwbGF5IiwiY3NzTm9ybWFsVHJhbnNmb3JtIiwibGV0dGVyU3BhY2luZyIsImZvbnRXZWlnaHQiLCJjc3NQcmVmaXhlcyIsImVtcHR5U3R5bGUiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJ2ZW5kb3JQcm9wTmFtZSIsIm5hbWUiLCJjYXBOYW1lIiwidG9VcHBlckNhc2UiLCJzbGljZSIsImkiLCJsZW5ndGgiLCJzZXRQb3NpdGl2ZU51bWJlciIsImVsZW0iLCJ2YWx1ZSIsInN1YnRyYWN0IiwibWF0Y2hlcyIsImV4ZWMiLCJNYXRoIiwibWF4IiwiYXVnbWVudFdpZHRoT3JIZWlnaHQiLCJleHRyYSIsImlzQm9yZGVyQm94Iiwic3R5bGVzIiwidmFsIiwiY3NzIiwiZ2V0V2lkdGhPckhlaWdodCIsInZhbHVlSXNCb3JkZXJCb3giLCJnZXRDbGllbnRSZWN0cyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRlc3QiLCJib3hTaXppbmdSZWxpYWJsZSIsInBhcnNlRmxvYXQiLCJleHRlbmQiLCJjc3NIb29rcyIsIm9wYWNpdHkiLCJnZXQiLCJjb21wdXRlZCIsInJldCIsImNzc051bWJlciIsImNzc1Byb3BzIiwibm9kZVR5cGUiLCJ0eXBlIiwiaG9va3MiLCJvcmlnTmFtZSIsImNhbWVsQ2FzZSIsInVuZGVmaW5lZCIsImNsZWFyQ2xvbmVTdHlsZSIsImluZGV4T2YiLCJzZXQiLCJudW0iLCJpc0Zpbml0ZSIsImVhY2giLCJ3aWR0aCIsIm1hcmdpbkxlZnQiLCJyZWxpYWJsZU1hcmdpbkxlZnQiLCJsZWZ0IiwibWFyZ2luIiwicGFkZGluZyIsImJvcmRlciIsInByZWZpeCIsInN1ZmZpeCIsImV4cGFuZCIsImV4cGFuZGVkIiwicGFydHMiLCJzcGxpdCIsImZuIiwibGVuIiwibWFwIiwiaXNBcnJheSIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBQSxPQUFRLENBQ1AsUUFETyxFQUVQLFlBRk8sRUFHUCxlQUhPLEVBSVAsbUJBSk8sRUFLUCxnQkFMTyxFQU1QLGVBTk8sRUFPUCxxQkFQTyxFQVFQLHFCQVJPLEVBU1AscUJBVE8sRUFVUCxnQkFWTyxFQVdQLGNBWE8sRUFZUCxpQkFaTyxFQWFQLG9CQWJPLEVBY1AsZUFkTyxFQWdCUCxhQWhCTyxFQWlCUCxjQWpCTyxFQWtCUCxZQWxCTyxDQWtCTTtBQWxCTixDQUFSLEVBbUJHLFVBQVVDLE1BQVYsRUFBa0JDLElBQWxCLEVBQXdCQyxNQUF4QixFQUFnQ0MsT0FBaEMsRUFBeUNDLFFBQXpDLEVBQW1EQyxPQUFuRCxFQUE0REMsU0FBNUQsRUFBdUVDLFNBQXZFLEVBQ0ZDLFNBREUsRUFDU0MsSUFEVCxFQUNlQyxNQURmLEVBQ3VCQyxTQUR2QixFQUNrQ0MsWUFEbEMsRUFDZ0RDLE9BRGhELEVBQzBEOztBQUU3RDs7QUFFQTs7QUFFQztBQUNBO0FBQ0E7QUFDQUMsZ0JBQWUsMkJBTGhCO0FBQUEsS0FNQ0MsVUFBVSxFQUFFQyxVQUFVLFVBQVosRUFBd0JDLFlBQVksUUFBcEMsRUFBOENDLFNBQVMsT0FBdkQsRUFOWDtBQUFBLEtBT0NDLHFCQUFxQjtBQUNwQkMsaUJBQWUsR0FESztBQUVwQkMsY0FBWTtBQUZRLEVBUHRCO0FBQUEsS0FZQ0MsY0FBYyxDQUFFLFFBQUYsRUFBWSxLQUFaLEVBQW1CLElBQW5CLENBWmY7QUFBQSxLQWFDQyxhQUFhbkIsU0FBU29CLGFBQVQsQ0FBd0IsS0FBeEIsRUFBZ0NDLEtBYjlDOztBQWVBO0FB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S0FBN0IsRUFBb0NhLE1BQXBDLENBQW5CO0FBQ0E7O0FBRUQsWUFBTzZDLEdBQVA7QUFDQTs7QUFFRCxXQUFPdEQsVUFBVWdDLFNBQVYsR0FDTm5FLE9BQU95QixLQUFQLENBQWNTLElBQWQsRUFBb0JQLElBQXBCLEVBQTBCUSxLQUExQixDQURNLEdBRU5uQyxPQUFPOEMsR0FBUCxDQUFZWixJQUFaLEVBQWtCUCxJQUFsQixDQUZEO0FBR0EsSUFuQk0sRUFtQkpBLElBbkJJLEVBbUJFUSxLQW5CRixFQW1CU3dELFVBQVUzRCxNQUFWLEdBQW1CLENBbkI1QixDQUFQO0FBb0JBO0FBdEJnQixFQUFsQjs7QUF5QkEsUUFBT2hDLE1BQVA7QUFDQyxDQXphRCIsImZpbGUiOiJjc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuL2NvcmVcIixcblx0XCIuL3Zhci9wbnVtXCIsXG5cdFwiLi9jb3JlL2FjY2Vzc1wiLFxuXHRcIi4vY3NzL3Zhci9ybWFyZ2luXCIsXG5cdFwiLi92YXIvZG9jdW1lbnRcIixcblx0XCIuL3Zhci9yY3NzTnVtXCIsXG5cdFwiLi9jc3MvdmFyL3JudW1ub25weFwiLFxuXHRcIi4vY3NzL3Zhci9jc3NFeHBhbmRcIixcblx0XCIuL2Nzcy92YXIvZ2V0U3R5bGVzXCIsXG5cdFwiLi9jc3MvdmFyL3N3YXBcIixcblx0XCIuL2Nzcy9jdXJDU1NcIixcblx0XCIuL2Nzcy9hZGp1c3RDU1NcIixcblx0XCIuL2Nzcy9hZGRHZXRIb29rSWZcIixcblx0XCIuL2Nzcy9zdXBwb3J0XCIsXG5cblx0XCIuL2NvcmUvaW5pdFwiLFxuXHRcIi4vY29yZS9yZWFkeVwiLFxuXHRcIi4vc2VsZWN0b3JcIiAvLyBjb250YWluc1xuXSwgZnVuY3Rpb24oIGpRdWVyeSwgcG51bSwgYWNjZXNzLCBybWFyZ2luLCBkb2N1bWVudCwgcmNzc051bSwgcm51bW5vbnB4LCBjc3NFeHBhbmQsXG5cdGdldFN0eWxlcywgc3dhcCwgY3VyQ1NTLCBhZGp1c3RDU1MsIGFkZEdldEhvb2tJZiwgc3VwcG9ydCApIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhclxuXG5cdC8vIFN3YXBwYWJsZSBpZiBkaXNwbGF5IGlzIG5vbmUgb3Igc3RhcnRzIHdpdGggdGFibGVcblx0Ly8gZXhjZXB0IFwidGFibGVcIiwgXCJ0YWJsZS1jZWxsXCIsIG9yIFwidGFibGUtY2FwdGlvblwiXG5cdC8vIFNlZSBoZXJlIGZvciBkaXNwbGF5IHZhbHVlczogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9DU1MvZGlzcGxheVxuXHRyZGlzcGxheXN3YXAgPSAvXihub25lfHRhYmxlKD8hLWNbZWFdKS4rKS8sXG5cdGNzc1Nob3cgPSB7IHBvc2l0aW9uOiBcImFic29sdXRlXCIsIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsIGRpc3BsYXk6IFwiYmxvY2tcIiB9LFxuXHRjc3NOb3JtYWxUcmFuc2Zvcm0gPSB7XG5cdFx0bGV0dGVyU3BhY2luZzogXCIwXCIsXG5cdFx0Zm9udFdlaWdodDogXCI0MDBcIlxuXHR9LFxuXG5cdGNzc1ByZWZpeGVzID0gWyBcIldlYmtpdFwiLCBcIk1velwiLCBcIm1zXCIgXSxcblx0ZW1wdHlTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKS5zdHlsZTtcblxuLy8gUmV0dXJuIGEgY3NzIHByb3BlcnR5IG1hcHBlZCB0byBhIHBvdGVudGlhbGx5IHZlbmRvciBwcmVmaXhlZCBwcm9wZXJ0eVxuZnVuY3Rpb24gdmVuZG9yUHJvcE5hbWUoIG5hbWUgKSB7XG5cblx0Ly8gU2hvcnRjdXQgZm9yIG5hbWVzIHRoYXQgYXJlIG5vdCB2ZW5kb3IgcHJlZml4ZWRcblx0aWYgKCBuYW1lIGluIGVtcHR5U3R5bGUgKSB7XG5cdFx0cmV0dXJuIG5hbWU7XG5cdH1cblxuXHQvLyBDaGVjayBmb3IgdmVuZG9yIHByZWZpeGVkIG5hbWVzXG5cdHZhciBjYXBOYW1lID0gbmFtZVsgMCBdLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKCAxICksXG5cdFx0aSA9IGNzc1ByZWZpeGVzLmxlbmd0aDtcblxuXHR3aGlsZSAoIGktLSApIHtcblx0XHRuYW1lID0gY3NzUHJlZml4ZXNbIGkgXSArIGNhcE5hbWU7XG5cdFx0aWYgKCBuYW1lIGluIGVtcHR5U3R5bGUgKSB7XG5cdFx0XHRyZXR1cm4gbmFtZTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gc2V0UG9zaXRpdmVOdW1iZXIoIGVsZW0sIHZhbHVlLCBzdWJ0cmFjdCApIHtcblxuXHQvLyBBbnkgcmVsYXRpdmUgKCsvLSkgdmFsdWVzIGhhdmUgYWxyZWFkeSBiZWVuXG5cdC8vIG5vcm1hbGl6ZWQgYXQgdGhpcyBwb2ludFxuXHR2YXIgbWF0Y2hlcyA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKTtcblx0cmV0dXJuIG1hdGNoZXMgP1xuXG5cdFx0Ly8gR3VhcmQgYWdhaW5zdCB1bmRlZmluZWQgXCJzdWJ0cmFjdFwiLCBlLmcuLCB3aGVuIHVzZWQgYXMgaW4gY3NzSG9va3Ncblx0XHRNYXRoLm1heCggMCwgbWF0Y2hlc1sgMiBdIC0gKCBzdWJ0cmFjdCB8fCAwICkgKSArICggbWF0Y2hlc1sgMyBdIHx8IFwicHhcIiApIDpcblx0XHR2YWx1ZTtcbn1cblxuZnVuY3Rpb24gYXVnbWVudFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhLCBpc0JvcmRlckJveCwgc3R5bGVzICkge1xuXHR2YXIgaSxcblx0XHR2YWwgPSAwO1xuXG5cdC8vIElmIHdlIGFscmVhZHkgaGF2ZSB0aGUgcmlnaHQgbWVhc3VyZW1lbnQsIGF2b2lkIGF1Z21lbnRhdGlvblxuXHRpZiAoIGV4dHJhID09PSAoIGlzQm9yZGVyQm94ID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiICkgKSB7XG5cdFx0aSA9IDQ7XG5cblx0Ly8gT3RoZXJ3aXNlIGluaXRpYWxpemUgZm9yIGhvcml6b250YWwgb3IgdmVydGljYWwgcHJvcGVydGllc1xuXHR9IGVsc2Uge1xuXHRcdGkgPSBuYW1lID09PSBcIndpZHRoXCIgPyAxIDogMDtcblx0fVxuXG5cdGZvciAoIDsgaSA8IDQ7IGkgKz0gMiApIHtcblxuXHRcdC8vIEJvdGggYm94IG1vZGVscyBleGNsdWRlIG1hcmdpbiwgc28gYWRkIGl0IGlmIHdlIHdhbnQgaXRcblx0XHRpZiAoIGV4dHJhID09PSBcIm1hcmdpblwiICkge1xuXHRcdFx0dmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIGV4dHJhICsgY3NzRXhwYW5kWyBpIF0sIHRydWUsIHN0eWxlcyApO1xuXHRcdH1cblxuXHRcdGlmICggaXNCb3JkZXJCb3ggKSB7XG5cblx0XHRcdC8vIGJvcmRlci1ib3ggaW5jbHVkZXMgcGFkZGluZywgc28gcmVtb3ZlIGl0IGlmIHdlIHdhbnQgY29udGVudFxuXHRcdFx0aWYgKCBleHRyYSA9PT0gXCJjb250ZW50XCIgKSB7XG5cdFx0XHRcdHZhbCAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcInBhZGRpbmdcIiArIGNzc0V4cGFuZFsgaSBdLCB0cnVlLCBzdHlsZXMgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgYm9yZGVyIG5vciBtYXJnaW4sIHNvIHJlbW92ZSBib3JkZXJcblx0XHRcdGlmICggZXh0cmEgIT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHRcdHZhbCAtPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQsIHNvIGFkZCBwYWRkaW5nXG5cdFx0XHR2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQgbm9yIHBhZGRpbmcsIHNvIGFkZCBib3JkZXJcblx0XHRcdGlmICggZXh0cmEgIT09IFwicGFkZGluZ1wiICkge1xuXHRcdFx0XHR2YWwgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdmFsO1xufVxuXG5mdW5jdGlvbiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSApIHtcblxuXHQvLyBTdGFydCB3aXRoIG9mZnNldCBwcm9wZXJ0eSwgd2hpY2ggaXMgZXF1aXZhbGVudCB0byB0aGUgYm9yZGVyLWJveCB2YWx1ZVxuXHR2YXIgdmFsLFxuXHRcdHZhbHVlSXNCb3JkZXJCb3ggPSB0cnVlLFxuXHRcdHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApLFxuXHRcdGlzQm9yZGVyQm94ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3hTaXppbmdcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImJvcmRlci1ib3hcIjtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0Ly8gUnVubmluZyBnZXRCb3VuZGluZ0NsaWVudFJlY3Qgb24gYSBkaXNjb25uZWN0ZWQgbm9kZVxuXHQvLyBpbiBJRSB0aHJvd3MgYW4gZXJyb3IuXG5cdGlmICggZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCApIHtcblx0XHR2YWwgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpWyBuYW1lIF07XG5cdH1cblxuXHQvLyBTb21lIG5vbi1odG1sIGVsZW1lbnRzIHJldHVybiB1bmRlZmluZWQgZm9yIG9mZnNldFdpZHRoLCBzbyBjaGVjayBmb3IgbnVsbC91bmRlZmluZWRcblx0Ly8gc3ZnIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjQ5Mjg1XG5cdC8vIE1hdGhNTCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTQ5MTY2OFxuXHRpZiAoIHZhbCA8PSAwIHx8IHZhbCA9PSBudWxsICkge1xuXG5cdFx0Ly8gRmFsbCBiYWNrIHRvIGNvbXB1dGVkIHRoZW4gdW5jb21wdXRlZCBjc3MgaWYgbmVjZXNzYXJ5XG5cdFx0dmFsID0gY3VyQ1NTKCBlbGVtLCBuYW1lLCBzdHlsZXMgKTtcblx0XHRpZiAoIHZhbCA8IDAgfHwgdmFsID09IG51bGwgKSB7XG5cdFx0XHR2YWwgPSBlbGVtLnN0eWxlWyBuYW1lIF07XG5cdFx0fVxuXG5cdFx0Ly8gQ29tcHV0ZWQgdW5pdCBpcyBub3QgcGl4ZWxzLiBTdG9wIGhlcmUgYW5kIHJldHVybi5cblx0XHRpZiAoIHJudW1ub25weC50ZXN0KCB2YWwgKSApIHtcblx0XHRcdHJldHVybiB2YWw7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgZm9yIHN0eWxlIGluIGNhc2UgYSBicm93c2VyIHdoaWNoIHJldHVybnMgdW5yZWxpYWJsZSB2YWx1ZXNcblx0XHQvLyBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSBzaWxlbnRseSBmYWxscyBiYWNrIHRvIHRoZSByZWxpYWJsZSBlbGVtLnN0eWxlXG5cdFx0dmFsdWVJc0JvcmRlckJveCA9IGlzQm9yZGVyQm94ICYmXG5cdFx0XHQoIHN1cHBvcnQuYm94U2l6aW5nUmVsaWFibGUoKSB8fCB2YWwgPT09IGVsZW0uc3R5bGVbIG5hbWUgXSApO1xuXG5cdFx0Ly8gTm9ybWFsaXplIFwiXCIsIGF1dG8sIGFuZCBwcmVwYXJlIGZvciBleHRyYVxuXHRcdHZhbCA9IHBhcnNlRmxvYXQoIHZhbCApIHx8IDA7XG5cdH1cblxuXHQvLyBVc2UgdGhlIGFjdGl2ZSBib3gtc2l6aW5nIG1vZGVsIHRvIGFkZC9zdWJ0cmFjdCBpcnJlbGV2YW50IHN0eWxlc1xuXHRyZXR1cm4gKCB2YWwgK1xuXHRcdGF1Z21lbnRXaWR0aE9ySGVpZ2h0KFxuXHRcdFx0ZWxlbSxcblx0XHRcdG5hbWUsXG5cdFx0XHRleHRyYSB8fCAoIGlzQm9yZGVyQm94ID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiICksXG5cdFx0XHR2YWx1ZUlzQm9yZGVyQm94LFxuXHRcdFx0c3R5bGVzXG5cdFx0KVxuXHQpICsgXCJweFwiO1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0Ly8gQWRkIGluIHN0eWxlIHByb3BlcnR5IGhvb2tzIGZvciBvdmVycmlkaW5nIHRoZSBkZWZhdWx0XG5cdC8vIGJlaGF2aW9yIG9mIGdldHRpbmcgYW5kIHNldHRpbmcgYSBzdHlsZSBwcm9wZXJ0eVxuXHRjc3NIb29rczoge1xuXHRcdG9wYWNpdHk6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXG5cdFx0XHRcdFx0Ly8gV2Ugc2hvdWxkIGFsd2F5cyBnZXQgYSBudW1iZXIgYmFjayBmcm9tIG9wYWNpdHlcblx0XHRcdFx0XHR2YXIgcmV0ID0gY3VyQ1NTKCBlbGVtLCBcIm9wYWNpdHlcIiApO1xuXHRcdFx0XHRcdHJldHVybiByZXQgPT09IFwiXCIgPyBcIjFcIiA6IHJldDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvLyBEb24ndCBhdXRvbWF0aWNhbGx5IGFkZCBcInB4XCIgdG8gdGhlc2UgcG9zc2libHktdW5pdGxlc3MgcHJvcGVydGllc1xuXHRjc3NOdW1iZXI6IHtcblx0XHRcImFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50XCI6IHRydWUsXG5cdFx0XCJjb2x1bW5Db3VudFwiOiB0cnVlLFxuXHRcdFwiZmlsbE9wYWNpdHlcIjogdHJ1ZSxcblx0XHRcImZsZXhHcm93XCI6IHRydWUsXG5cdFx0XCJmbGV4U2hyaW5rXCI6IHRydWUsXG5cdFx0XCJmb250V2VpZ2h0XCI6IHRydWUsXG5cdFx0XCJsaW5lSGVpZ2h0XCI6IHRydWUsXG5cdFx0XCJvcGFjaXR5XCI6IHRydWUsXG5cdFx0XCJvcmRlclwiOiB0cnVlLFxuXHRcdFwib3JwaGFuc1wiOiB0cnVlLFxuXHRcdFwid2lkb3dzXCI6IHRydWUsXG5cdFx0XCJ6SW5kZXhcIjogdHJ1ZSxcblx0XHRcInpvb21cIjogdHJ1ZVxuXHR9LFxuXG5cdC8vIEFkZCBpbiBwcm9wZXJ0aWVzIHdob3NlIG5hbWVzIHlvdSB3aXNoIHRvIGZpeCBiZWZvcmVcblx0Ly8gc2V0dGluZyBvciBnZXR0aW5nIHRoZSB2YWx1ZVxuXHRjc3NQcm9wczoge1xuXHRcdFwiZmxvYXRcIjogXCJjc3NGbG9hdFwiXG5cdH0sXG5cblx0Ly8gR2V0IGFuZCBzZXQgdGhlIHN0eWxlIHByb3BlcnR5IG9uIGEgRE9NIE5vZGVcblx0c3R5bGU6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSwgZXh0cmEgKSB7XG5cblx0XHQvLyBEb24ndCBzZXQgc3R5bGVzIG9uIHRleHQgYW5kIGNvbW1lbnQgbm9kZXNcblx0XHRpZiAoICFlbGVtIHx8IGVsZW0ubm9kZVR5cGUgPT09IDMgfHwgZWxlbS5ub2RlVHlwZSA9PT0gOCB8fCAhZWxlbS5zdHlsZSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWVcblx0XHR2YXIgcmV0LCB0eXBlLCBob29rcyxcblx0XHRcdG9yaWdOYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZSApLFxuXHRcdFx0c3R5bGUgPSBlbGVtLnN0eWxlO1xuXG5cdFx0bmFtZSA9IGpRdWVyeS5jc3NQcm9wc1sgb3JpZ05hbWUgXSB8fFxuXHRcdFx0KCBqUXVlcnkuY3NzUHJvcHNbIG9yaWdOYW1lIF0gPSB2ZW5kb3JQcm9wTmFtZSggb3JpZ05hbWUgKSB8fCBvcmlnTmFtZSApO1xuXG5cdFx0Ly8gR2V0cyBob29rIGZvciB0aGUgcHJlZml4ZWQgdmVyc2lvbiwgdGhlbiB1bnByZWZpeGVkIHZlcnNpb25cblx0XHRob29rcyA9IGpRdWVyeS5jc3NIb29rc1sgbmFtZSBdIHx8IGpRdWVyeS5jc3NIb29rc1sgb3JpZ05hbWUgXTtcblxuXHRcdC8vIENoZWNrIGlmIHdlJ3JlIHNldHRpbmcgYSB2YWx1ZVxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cblx0XHRcdC8vIENvbnZlcnQgXCIrPVwiIG9yIFwiLT1cIiB0byByZWxhdGl2ZSBudW1iZXJzICgjNzM0NSlcblx0XHRcdGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAoIHJldCA9IHJjc3NOdW0uZXhlYyggdmFsdWUgKSApICYmIHJldFsgMSBdICkge1xuXHRcdFx0XHR2YWx1ZSA9IGFkanVzdENTUyggZWxlbSwgbmFtZSwgcmV0ICk7XG5cblx0XHRcdFx0Ly8gRml4ZXMgYnVnICM5MjM3XG5cdFx0XHRcdHR5cGUgPSBcIm51bWJlclwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCBudWxsIGFuZCBOYU4gdmFsdWVzIGFyZW4ndCBzZXQgKCM3MTE2KVxuXHRcdFx0aWYgKCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlICE9PSB2YWx1ZSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBhIG51bWJlciB3YXMgcGFzc2VkIGluLCBhZGQgdGhlIHVuaXQgKGV4Y2VwdCBmb3IgY2VydGFpbiBDU1MgcHJvcGVydGllcylcblx0XHRcdGlmICggdHlwZSA9PT0gXCJudW1iZXJcIiApIHtcblx0XHRcdFx0dmFsdWUgKz0gcmV0ICYmIHJldFsgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgb3JpZ05hbWUgXSA/IFwiXCIgOiBcInB4XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gYmFja2dyb3VuZC0qIHByb3BzIGFmZmVjdCBvcmlnaW5hbCBjbG9uZSdzIHZhbHVlc1xuXHRcdFx0aWYgKCAhc3VwcG9ydC5jbGVhckNsb25lU3R5bGUgJiYgdmFsdWUgPT09IFwiXCIgJiYgbmFtZS5pbmRleE9mKCBcImJhY2tncm91bmRcIiApID09PSAwICkge1xuXHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gXCJpbmhlcml0XCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQsIHVzZSB0aGF0IHZhbHVlLCBvdGhlcndpc2UganVzdCBzZXQgdGhlIHNwZWNpZmllZCB2YWx1ZVxuXHRcdFx0aWYgKCAhaG9va3MgfHwgISggXCJzZXRcIiBpbiBob29rcyApIHx8XG5cdFx0XHRcdCggdmFsdWUgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBleHRyYSApICkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgbm9uLWNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcblx0XHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHQoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgZmFsc2UsIGV4dHJhICkgKSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE90aGVyd2lzZSBqdXN0IGdldCB0aGUgdmFsdWUgZnJvbSB0aGUgc3R5bGUgb2JqZWN0XG5cdFx0XHRyZXR1cm4gc3R5bGVbIG5hbWUgXTtcblx0XHR9XG5cdH0sXG5cblx0Y3NzOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZXh0cmEsIHN0eWxlcyApIHtcblx0XHR2YXIgdmFsLCBudW0sIGhvb2tzLFxuXHRcdFx0b3JpZ05hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICk7XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWVcblx0XHRuYW1lID0galF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdIHx8XG5cdFx0XHQoIGpRdWVyeS5jc3NQcm9wc1sgb3JpZ05hbWUgXSA9IHZlbmRvclByb3BOYW1lKCBvcmlnTmFtZSApIHx8IG9yaWdOYW1lICk7XG5cblx0XHQvLyBUcnkgcHJlZml4ZWQgbmFtZSBmb2xsb3dlZCBieSB0aGUgdW5wcmVmaXhlZCBuYW1lXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSB8fCBqUXVlcnkuY3NzSG9va3NbIG9yaWdOYW1lIF07XG5cblx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgY29tcHV0ZWQgdmFsdWUgZnJvbSB0aGVyZVxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyApIHtcblx0XHRcdHZhbCA9IGhvb2tzLmdldCggZWxlbSwgdHJ1ZSwgZXh0cmEgKTtcblx0XHR9XG5cblx0XHQvLyBPdGhlcndpc2UsIGlmIGEgd2F5IHRvIGdldCB0aGUgY29tcHV0ZWQgdmFsdWUgZXhpc3RzLCB1c2UgdGhhdFxuXHRcdGlmICggdmFsID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR2YWwgPSBjdXJDU1MoIGVsZW0sIG5hbWUsIHN0eWxlcyApO1xuXHRcdH1cblxuXHRcdC8vIENvbnZlcnQgXCJub3JtYWxcIiB0byBjb21wdXRlZCB2YWx1ZVxuXHRcdGlmICggdmFsID09PSBcIm5vcm1hbFwiICYmIG5hbWUgaW4gY3NzTm9ybWFsVHJhbnNmb3JtICkge1xuXHRcdFx0dmFsID0gY3NzTm9ybWFsVHJhbnNmb3JtWyBuYW1lIF07XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBudW1lcmljIGlmIGZvcmNlZCBvciBhIHF1YWxpZmllciB3YXMgcHJvdmlkZWQgYW5kIHZhbCBsb29rcyBudW1lcmljXG5cdFx0aWYgKCBleHRyYSA9PT0gXCJcIiB8fCBleHRyYSApIHtcblx0XHRcdG51bSA9IHBhcnNlRmxvYXQoIHZhbCApO1xuXHRcdFx0cmV0dXJuIGV4dHJhID09PSB0cnVlIHx8IGlzRmluaXRlKCBudW0gKSA/IG51bSB8fCAwIDogdmFsO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCBbIFwiaGVpZ2h0XCIsIFwid2lkdGhcIiBdLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gPSB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQsIGV4dHJhICkge1xuXHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblxuXHRcdFx0XHQvLyBDZXJ0YWluIGVsZW1lbnRzIGNhbiBoYXZlIGRpbWVuc2lvbiBpbmZvIGlmIHdlIGludmlzaWJseSBzaG93IHRoZW1cblx0XHRcdFx0Ly8gYnV0IGl0IG11c3QgaGF2ZSBhIGN1cnJlbnQgZGlzcGxheSBzdHlsZSB0aGF0IHdvdWxkIGJlbmVmaXRcblx0XHRcdFx0cmV0dXJuIHJkaXNwbGF5c3dhcC50ZXN0KCBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApICkgJiZcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFNhZmFyaSA4K1xuXHRcdFx0XHRcdC8vIFRhYmxlIGNvbHVtbnMgaW4gU2FmYXJpIGhhdmUgbm9uLXplcm8gb2Zmc2V0V2lkdGggJiB6ZXJvXG5cdFx0XHRcdFx0Ly8gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggdW5sZXNzIGRpc3BsYXkgaXMgY2hhbmdlZC5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0XHRcdFx0XHQvLyBSdW5uaW5nIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBvbiBhIGRpc2Nvbm5lY3RlZCBub2RlXG5cdFx0XHRcdFx0Ly8gaW4gSUUgdGhyb3dzIGFuIGVycm9yLlxuXHRcdFx0XHRcdCggIWVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggfHwgIWVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggKSA/XG5cdFx0XHRcdFx0XHRzd2FwKCBlbGVtLCBjc3NTaG93LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIG5hbWUsIGV4dHJhICk7XG5cdFx0XHRcdFx0XHR9ICkgOlxuXHRcdFx0XHRcdFx0Z2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIGV4dHJhICkge1xuXHRcdFx0dmFyIG1hdGNoZXMsXG5cdFx0XHRcdHN0eWxlcyA9IGV4dHJhICYmIGdldFN0eWxlcyggZWxlbSApLFxuXHRcdFx0XHRzdWJ0cmFjdCA9IGV4dHJhICYmIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KFxuXHRcdFx0XHRcdGVsZW0sXG5cdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHRleHRyYSxcblx0XHRcdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiYm9yZGVyLWJveFwiLFxuXHRcdFx0XHRcdHN0eWxlc1xuXHRcdFx0XHQpO1xuXG5cdFx0XHQvLyBDb252ZXJ0IHRvIHBpeGVscyBpZiB2YWx1ZSBhZGp1c3RtZW50IGlzIG5lZWRlZFxuXHRcdFx0aWYgKCBzdWJ0cmFjdCAmJiAoIG1hdGNoZXMgPSByY3NzTnVtLmV4ZWMoIHZhbHVlICkgKSAmJlxuXHRcdFx0XHQoIG1hdGNoZXNbIDMgXSB8fCBcInB4XCIgKSAhPT0gXCJweFwiICkge1xuXG5cdFx0XHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0XHR2YWx1ZSA9IGpRdWVyeS5jc3MoIGVsZW0sIG5hbWUgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgc3VidHJhY3QgKTtcblx0XHR9XG5cdH07XG59ICk7XG5cbmpRdWVyeS5jc3NIb29rcy5tYXJnaW5MZWZ0ID0gYWRkR2V0SG9va0lmKCBzdXBwb3J0LnJlbGlhYmxlTWFyZ2luTGVmdCxcblx0ZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0XHRyZXR1cm4gKCBwYXJzZUZsb2F0KCBjdXJDU1MoIGVsZW0sIFwibWFyZ2luTGVmdFwiICkgKSB8fFxuXHRcdFx0XHRlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLVxuXHRcdFx0XHRcdHN3YXAoIGVsZW0sIHsgbWFyZ2luTGVmdDogMCB9LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG5cdFx0XHRcdFx0fSApXG5cdFx0XHRcdCkgKyBcInB4XCI7XG5cdFx0fVxuXHR9XG4pO1xuXG4vLyBUaGVzZSBob29rcyBhcmUgdXNlZCBieSBhbmltYXRlIHRvIGV4cGFuZCBwcm9wZXJ0aWVzXG5qUXVlcnkuZWFjaCgge1xuXHRtYXJnaW46IFwiXCIsXG5cdHBhZGRpbmc6IFwiXCIsXG5cdGJvcmRlcjogXCJXaWR0aFwiXG59LCBmdW5jdGlvbiggcHJlZml4LCBzdWZmaXggKSB7XG5cdGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0gPSB7XG5cdFx0ZXhwYW5kOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgaSA9IDAsXG5cdFx0XHRcdGV4cGFuZGVkID0ge30sXG5cblx0XHRcdFx0Ly8gQXNzdW1lcyBhIHNpbmdsZSBudW1iZXIgaWYgbm90IGEgc3RyaW5nXG5cdFx0XHRcdHBhcnRzID0gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiID8gdmFsdWUuc3BsaXQoIFwiIFwiICkgOiBbIHZhbHVlIF07XG5cblx0XHRcdGZvciAoIDsgaSA8IDQ7IGkrKyApIHtcblx0XHRcdFx0ZXhwYW5kZWRbIHByZWZpeCArIGNzc0V4cGFuZFsgaSBdICsgc3VmZml4IF0gPVxuXHRcdFx0XHRcdHBhcnRzWyBpIF0gfHwgcGFydHNbIGkgLSAyIF0gfHwgcGFydHNbIDAgXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGV4cGFuZGVkO1xuXHRcdH1cblx0fTtcblxuXHRpZiAoICFybWFyZ2luLnRlc3QoIHByZWZpeCApICkge1xuXHRcdGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0uc2V0ID0gc2V0UG9zaXRpdmVOdW1iZXI7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRjc3M6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0XHR2YXIgc3R5bGVzLCBsZW4sXG5cdFx0XHRcdG1hcCA9IHt9LFxuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0aWYgKCBqUXVlcnkuaXNBcnJheSggbmFtZSApICkge1xuXHRcdFx0XHRzdHlsZXMgPSBnZXRTdHlsZXMoIGVsZW0gKTtcblx0XHRcdFx0bGVuID0gbmFtZS5sZW5ndGg7XG5cblx0XHRcdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdFx0bWFwWyBuYW1lWyBpIF0gXSA9IGpRdWVyeS5jc3MoIGVsZW0sIG5hbWVbIGkgXSwgZmFsc2UsIHN0eWxlcyApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG1hcDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIG5hbWUsIHZhbHVlICkgOlxuXHRcdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCBuYW1lICk7XG5cdFx0fSwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XG5cdH1cbn0gKTtcblxucmV0dXJuIGpRdWVyeTtcbn0gKTtcbiJdfQ==