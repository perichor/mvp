"use strict";

define(["../core", "../core/access", "./support", "../selector"], function (jQuery, access, support) {

	"use strict";

	var rfocusable = /^(?:input|select|textarea|button)$/i,
	    rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function prop(name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp: function removeProp(name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});

	jQuery.extend({
		prop: function prop(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				return elem[name] = value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			return elem[name];
		},

		propHooks: {
			tabIndex: {
				get: function get(elem) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");

					if (tabindex) {
						return parseInt(tabindex, 10);
					}

					if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
						return 0;
					}

					return -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function get(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function set(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;

					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9hdHRyaWJ1dGVzL3Byb3AuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwialF1ZXJ5IiwiYWNjZXNzIiwic3VwcG9ydCIsInJmb2N1c2FibGUiLCJyY2xpY2thYmxlIiwiZm4iLCJleHRlbmQiLCJwcm9wIiwibmFtZSIsInZhbHVlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwicmVtb3ZlUHJvcCIsImVhY2giLCJwcm9wRml4IiwiZWxlbSIsInJldCIsImhvb2tzIiwiblR5cGUiLCJub2RlVHlwZSIsImlzWE1MRG9jIiwicHJvcEhvb2tzIiwidW5kZWZpbmVkIiwic2V0IiwiZ2V0IiwidGFiSW5kZXgiLCJ0YWJpbmRleCIsImZpbmQiLCJhdHRyIiwicGFyc2VJbnQiLCJ0ZXN0Iiwibm9kZU5hbWUiLCJocmVmIiwib3B0U2VsZWN0ZWQiLCJzZWxlY3RlZCIsInBhcmVudCIsInBhcmVudE5vZGUiLCJzZWxlY3RlZEluZGV4IiwidG9Mb3dlckNhc2UiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQVEsQ0FDUCxTQURPLEVBRVAsZ0JBRk8sRUFHUCxXQUhPLEVBSVAsYUFKTyxDQUFSLEVBS0csVUFBVUMsTUFBVixFQUFrQkMsTUFBbEIsRUFBMEJDLE9BQTFCLEVBQW9DOztBQUV2Qzs7QUFFQSxLQUFJQyxhQUFhLHFDQUFqQjtBQUFBLEtBQ0NDLGFBQWEsZUFEZDs7QUFHQUosUUFBT0ssRUFBUCxDQUFVQyxNQUFWLENBQWtCO0FBQ2pCQyxRQUFNLGNBQVVDLElBQVYsRUFBZ0JDLEtBQWhCLEVBQXdCO0FBQzdCLFVBQU9SLE9BQVEsSUFBUixFQUFjRCxPQUFPTyxJQUFyQixFQUEyQkMsSUFBM0IsRUFBaUNDLEtBQWpDLEVBQXdDQyxVQUFVQyxNQUFWLEdBQW1CLENBQTNELENBQVA7QUFDQSxHQUhnQjs7QUFLakJDLGNBQVksb0JBQVVKLElBQVYsRUFBaUI7QUFDNUIsVUFBTyxLQUFLSyxJQUFMLENBQVcs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YSxJQUFQLENBQWEsQ0FDWixVQURZLEVBRVosVUFGWSxFQUdaLFdBSFksRUFJWixhQUpZLEVBS1osYUFMWSxFQU1aLFNBTlksRUFPWixTQVBZLEVBUVosUUFSWSxFQVNaLGFBVFksRUFVWixpQkFWWSxDQUFiLEVBV0csWUFBVztBQUNiYixTQUFPYyxPQUFQLENBQWdCLEtBQUt3QixXQUFMLEVBQWhCLElBQXVDLElBQXZDO0FBQ0EsRUFiRDtBQWVDLENBOUlEIiwiZmlsZSI6InByb3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuLi9jb3JlXCIsXG5cdFwiLi4vY29yZS9hY2Nlc3NcIixcblx0XCIuL3N1cHBvcnRcIixcblx0XCIuLi9zZWxlY3RvclwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCBhY2Nlc3MsIHN1cHBvcnQgKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgcmZvY3VzYWJsZSA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksXG5cdHJjbGlja2FibGUgPSAvXig/OmF8YXJlYSkkL2k7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0cHJvcDogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGpRdWVyeS5wcm9wLCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fSxcblxuXHRyZW1vdmVQcm9wOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGRlbGV0ZSB0aGlzWyBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWUgXTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHRwcm9wOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0dmFyIHJldCwgaG9va3MsXG5cdFx0XHRuVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0XHQvLyBEb24ndCBnZXQvc2V0IHByb3BlcnRpZXMgb24gdGV4dCwgY29tbWVudCBhbmQgYXR0cmlidXRlIG5vZGVzXG5cdFx0aWYgKCBuVHlwZSA9PT0gMyB8fCBuVHlwZSA9PT0gOCB8fCBuVHlwZSA9PT0gMiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIG5UeXBlICE9PSAxIHx8ICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblxuXHRcdFx0Ly8gRml4IG5hbWUgYW5kIGF0dGFjaCBob29rc1xuXHRcdFx0bmFtZSA9IGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZTtcblx0XHRcdGhvb2tzID0galF1ZXJ5LnByb3BIb29rc1sgbmFtZSBdO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggaG9va3MgJiYgXCJzZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHQoIHJldCA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoIGVsZW1bIG5hbWUgXSA9IHZhbHVlICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmICggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkgKSAhPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVsZW1bIG5hbWUgXTtcblx0fSxcblxuXHRwcm9wSG9va3M6IHtcblx0XHR0YWJJbmRleDoge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdFx0XHRcdC8vIGVsZW0udGFiSW5kZXggZG9lc24ndCBhbHdheXMgcmV0dXJuIHRoZVxuXHRcdFx0XHQvLyBjb3JyZWN0IHZhbHVlIHdoZW4gaXQgaGFzbid0IGJlZW4gZXhwbGljaXRseSBzZXRcblx0XHRcdFx0Ly8gaHR0cHM6Ly93ZWIuYXJjaGl2ZS5vcmcvd2ViLzIwMTQxMTE2MjMzMzQ3L2h0dHA6Ly9mbHVpZHByb2plY3Qub3JnL2Jsb2cvMjAwOC8wMS8wOS9nZXR0aW5nLXNldHRpbmctYW5kLXJlbW92aW5nLXRhYmluZGV4LXZhbHVlcy13aXRoLWphdmFzY3JpcHQvXG5cdFx0XHRcdC8vIFVzZSBwcm9wZXIgYXR0cmlidXRlIHJldHJpZXZhbCgjMTIwNzIpXG5cdFx0XHRcdHZhciB0YWJpbmRleCA9IGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIFwidGFiaW5kZXhcIiApO1xuXG5cdFx0XHRcdGlmICggdGFiaW5kZXggKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlSW50KCB0YWJpbmRleCwgMTAgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRyZm9jdXNhYmxlLnRlc3QoIGVsZW0ubm9kZU5hbWUgKSB8fFxuXHRcdFx0XHRcdHJjbGlja2FibGUudGVzdCggZWxlbS5ub2RlTmFtZSApICYmXG5cdFx0XHRcdFx0ZWxlbS5ocmVmXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRwcm9wRml4OiB7XG5cdFx0XCJmb3JcIjogXCJodG1sRm9yXCIsXG5cdFx0XCJjbGFzc1wiOiBcImNsYXNzTmFtZVwiXG5cdH1cbn0gKTtcblxuLy8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG4vLyBBY2Nlc3NpbmcgdGhlIHNlbGVjdGVkSW5kZXggcHJvcGVydHlcbi8vIGZvcmNlcyB0aGUgYnJvd3NlciB0byByZXNwZWN0IHNldHRpbmcgc2VsZWN0ZWRcbi8vIG9uIHRoZSBvcHRpb25cbi8vIFRoZSBnZXR0ZXIgZW5zdXJlcyBhIGRlZmF1bHQgb3B0aW9uIGlzIHNlbGVjdGVkXG4vLyB3aGVuIGluIGFuIG9wdGdyb3VwXG4vLyBlc2xpbnQgcnVsZSBcIm5vLXVudXNlZC1leHByZXNzaW9uc1wiIGlzIGRpc2FibGVkIGZvciB0aGlzIGNvZGVcbi8vIHNpbmNlIGl0IGNvbnNpZGVycyBzdWNoIGFjY2Vzc2lvbnMgbm9vcFxuaWYgKCAhc3VwcG9ydC5vcHRTZWxlY3RlZCApIHtcblx0alF1ZXJ5LnByb3BIb29rcy5zZWxlY3RlZCA9IHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0XHQvKiBlc2xpbnQgbm8tdW51c2VkLWV4cHJlc3Npb25zOiBcIm9mZlwiICovXG5cblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRpZiAoIHBhcmVudCAmJiBwYXJlbnQucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0cGFyZW50LnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0LyogZXNsaW50IG5vLXVudXNlZC1leHByZXNzaW9uczogXCJvZmZcIiAqL1xuXG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0aWYgKCBwYXJlbnQgKSB7XG5cdFx0XHRcdHBhcmVudC5zZWxlY3RlZEluZGV4O1xuXG5cdFx0XHRcdGlmICggcGFyZW50LnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdFx0cGFyZW50LnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxualF1ZXJ5LmVhY2goIFtcblx0XCJ0YWJJbmRleFwiLFxuXHRcInJlYWRPbmx5XCIsXG5cdFwibWF4TGVuZ3RoXCIsXG5cdFwiY2VsbFNwYWNpbmdcIixcblx0XCJjZWxsUGFkZGluZ1wiLFxuXHRcInJvd1NwYW5cIixcblx0XCJjb2xTcGFuXCIsXG5cdFwidXNlTWFwXCIsXG5cdFwiZnJhbWVCb3JkZXJcIixcblx0XCJjb250ZW50RWRpdGFibGVcIlxuXSwgZnVuY3Rpb24oKSB7XG5cdGpRdWVyeS5wcm9wRml4WyB0aGlzLnRvTG93ZXJDYXNlKCkgXSA9IHRoaXM7XG59ICk7XG5cbn0gKTtcbiJdfQ==