"use strict";

define(["../core", "../core/access", "./support", "../var/rnothtmlwhite", "../selector"], function (jQuery, access, support, rnothtmlwhite) {

	"use strict";

	var boolHook,
	    attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function attr(name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr: function removeAttr(name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		}
	});

	jQuery.extend({
		attr: function attr(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}

				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				elem.setAttribute(name, value + "");
				return value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function set(elem, value) {
					if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function removeAttr(elem, value) {
			var name,
			    i = 0,


			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match(rnothtmlwhite);

			if (attrNames && elem.nodeType === 1) {
				while (name = attrNames[i++]) {
					elem.removeAttribute(name);
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function set(elem, value, name) {
			if (value === false) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};

	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (elem, name, isXML) {
			var ret,
			    handle,
			    lowercaseName = name.toLowerCase();

			if (!isXML) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[lowercaseName];
				attrHandle[lowercaseName] = ret;
				ret = getter(elem, name, isXML) != null ? lowercaseName : null;
				attrHandle[lowercaseName] = handle;
			}
			return ret;
		};
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9hdHRyaWJ1dGVzL2F0dHIuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwialF1ZXJ5IiwiYWNjZXNzIiwic3VwcG9ydCIsInJub3RodG1sd2hpdGUiLCJib29sSG9vayIsImF0dHJIYW5kbGUiLCJleHByIiwiZm4iLCJleHRlbmQiLCJhdHRyIiwibmFtZSIsInZhbHVlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwicmVtb3ZlQXR0ciIsImVhY2giLCJlbGVtIiwicmV0IiwiaG9va3MiLCJuVHlwZSIsIm5vZGVUeXBlIiwiZ2V0QXR0cmlidXRlIiwicHJvcCIsImlzWE1MRG9jIiwiYXR0ckhvb2tzIiwidG9Mb3dlckNhc2UiLCJtYXRjaCIsImJvb2wiLCJ0ZXN0IiwidW5kZWZpbmVkIiwic2V0Iiwic2V0QXR0cmlidXRlIiwiZ2V0IiwiZmluZCIsInR5cGUiLCJyYWRpb1ZhbHVlIiwibm9kZU5hbWUiLCJ2YWwiLCJpIiwiYXR0ck5hbWVzIiwicmVtb3ZlQXR0cmlidXRlIiwic291cmNlIiwiZ2V0dGVyIiwiaXNYTUwiLCJoYW5kbGUiLCJsb3dlcmNhc2VOYW1lIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFRLENBQ1AsU0FETyxFQUVQLGdCQUZPLEVBR1AsV0FITyxFQUlQLHNCQUpPLEVBS1AsYUFMTyxDQUFSLEVBTUcsVUFBVUMsTUFBVixFQUFrQkMsTUFBbEIsRUFBMEJDLE9BQTFCLEVBQW1DQyxhQUFuQyxFQUFtRDs7QUFFdEQ7O0FBRUEsS0FBSUMsUUFBSjtBQUFBLEtBQ0NDLGFBQWFMLE9BQU9NLElBQVAsQ0FBWUQsVUFEMUI7O0FBR0FMLFFBQU9PLEVBQVAsQ0FBVUMsTUFBVixDQUFrQjtBQUNqQkMsUUFBTSxjQUFVQyxJQUFWLEVBQWdCQyxLQUFoQixFQUF3QjtBQUM3QixVQUFPVixPQUFRLElBQVIsRUFBY0QsT0FBT1MsSUFBckIsRUFBMkJDLElBQTNCLEVBQWlDQyxLQUFqQyxFQUF3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QUFvQmlDLEtBQXBCLEtBQStCLElBQS9CLEdBQ0xFLGFBREssR0FFTCxJQUZEO0FBR0F4QyxlQUFZd0MsYUFBWixJQUE4QkQsTUFBOUI7QUFDQTtBQUNELFVBQU8zQixHQUFQO0FBQ0EsR0FmRDtBQWdCQSxFQW5CRDtBQXFCQyxDQTNJRCIsImZpbGUiOiJhdHRyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKCBbXG5cdFwiLi4vY29yZVwiLFxuXHRcIi4uL2NvcmUvYWNjZXNzXCIsXG5cdFwiLi9zdXBwb3J0XCIsXG5cdFwiLi4vdmFyL3Jub3RodG1sd2hpdGVcIixcblx0XCIuLi9zZWxlY3RvclwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCBhY2Nlc3MsIHN1cHBvcnQsIHJub3RodG1sd2hpdGUgKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgYm9vbEhvb2ssXG5cdGF0dHJIYW5kbGUgPSBqUXVlcnkuZXhwci5hdHRySGFuZGxlO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGF0dHI6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBqUXVlcnkuYXR0ciwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XG5cdH0sXG5cblx0cmVtb3ZlQXR0cjogZnVuY3Rpb24oIG5hbWUgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggdGhpcywgbmFtZSApO1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdGF0dHI6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcblx0XHR2YXIgcmV0LCBob29rcyxcblx0XHRcdG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRcdC8vIERvbid0IGdldC9zZXQgYXR0cmlidXRlcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcblx0XHRpZiAoIG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEZhbGxiYWNrIHRvIHByb3Agd2hlbiBhdHRyaWJ1dGVzIGFyZSBub3Qgc3VwcG9ydGVkXG5cdFx0aWYgKCB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgPT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LnByb3AoIGVsZW0sIG5hbWUsIHZhbHVlICk7XG5cdFx0fVxuXG5cdFx0Ly8gQXR0cmlidXRlIGhvb2tzIGFyZSBkZXRlcm1pbmVkIGJ5IHRoZSBsb3dlcmNhc2UgdmVyc2lvblxuXHRcdC8vIEdyYWIgbmVjZXNzYXJ5IGhvb2sgaWYgb25lIGlzIGRlZmluZWRcblx0XHRpZiAoIG5UeXBlICE9PSAxIHx8ICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblx0XHRcdGhvb2tzID0galF1ZXJ5LmF0dHJIb29rc1sgbmFtZS50b0xvd2VyQ2FzZSgpIF0gfHxcblx0XHRcdFx0KCBqUXVlcnkuZXhwci5tYXRjaC5ib29sLnRlc3QoIG5hbWUgKSA/IGJvb2xIb29rIDogdW5kZWZpbmVkICk7XG5cdFx0fVxuXG5cdFx0aWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gbnVsbCApIHtcblx0XHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIGVsZW0sIG5hbWUgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGhvb2tzICYmIFwic2V0XCIgaW4gaG9va3MgJiZcblx0XHRcdFx0KCByZXQgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBuYW1lICkgKSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggbmFtZSwgdmFsdWUgKyBcIlwiICk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXG5cdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmICggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkgKSAhPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXG5cdFx0cmV0ID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgbmFtZSApO1xuXG5cdFx0Ly8gTm9uLWV4aXN0ZW50IGF0dHJpYnV0ZXMgcmV0dXJuIG51bGwsIHdlIG5vcm1hbGl6ZSB0byB1bmRlZmluZWRcblx0XHRyZXR1cm4gcmV0ID09IG51bGwgPyB1bmRlZmluZWQgOiByZXQ7XG5cdH0sXG5cblx0YXR0ckhvb2tzOiB7XG5cdFx0dHlwZToge1xuXHRcdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0XHRcdGlmICggIXN1cHBvcnQucmFkaW9WYWx1ZSAmJiB2YWx1ZSA9PT0gXCJyYWRpb1wiICYmXG5cdFx0XHRcdFx0alF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcImlucHV0XCIgKSApIHtcblx0XHRcdFx0XHR2YXIgdmFsID0gZWxlbS52YWx1ZTtcblx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIHZhbHVlICk7XG5cdFx0XHRcdFx0aWYgKCB2YWwgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnZhbHVlID0gdmFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0cmVtb3ZlQXR0cjogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdHZhciBuYW1lLFxuXHRcdFx0aSA9IDAsXG5cblx0XHRcdC8vIEF0dHJpYnV0ZSBuYW1lcyBjYW4gY29udGFpbiBub24tSFRNTCB3aGl0ZXNwYWNlIGNoYXJhY3RlcnNcblx0XHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxuXHRcdFx0YXR0ck5hbWVzID0gdmFsdWUgJiYgdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKTtcblxuXHRcdGlmICggYXR0ck5hbWVzICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHR3aGlsZSAoICggbmFtZSA9IGF0dHJOYW1lc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIG5hbWUgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gKTtcblxuLy8gSG9va3MgZm9yIGJvb2xlYW4gYXR0cmlidXRlc1xuYm9vbEhvb2sgPSB7XG5cdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICkge1xuXHRcdGlmICggdmFsdWUgPT09IGZhbHNlICkge1xuXG5cdFx0XHQvLyBSZW1vdmUgYm9vbGVhbiBhdHRyaWJ1dGVzIHdoZW4gc2V0IHRvIGZhbHNlXG5cdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggbmFtZSwgbmFtZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmFtZTtcblx0fVxufTtcblxualF1ZXJ5LmVhY2goIGpRdWVyeS5leHByLm1hdGNoLmJvb2wuc291cmNlLm1hdGNoKCAvXFx3Ky9nICksIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHR2YXIgZ2V0dGVyID0gYXR0ckhhbmRsZVsgbmFtZSBdIHx8IGpRdWVyeS5maW5kLmF0dHI7XG5cblx0YXR0ckhhbmRsZVsgbmFtZSBdID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdHZhciByZXQsIGhhbmRsZSxcblx0XHRcdGxvd2VyY2FzZU5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRpZiAoICFpc1hNTCApIHtcblxuXHRcdFx0Ly8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcCBieSB0ZW1wb3JhcmlseSByZW1vdmluZyB0aGlzIGZ1bmN0aW9uIGZyb20gdGhlIGdldHRlclxuXHRcdFx0aGFuZGxlID0gYXR0ckhhbmRsZVsgbG93ZXJjYXNlTmFtZSBdO1xuXHRcdFx0YXR0ckhhbmRsZVsgbG93ZXJjYXNlTmFtZSBdID0gcmV0O1xuXHRcdFx0cmV0ID0gZ2V0dGVyKCBlbGVtLCBuYW1lLCBpc1hNTCApICE9IG51bGwgP1xuXHRcdFx0XHRsb3dlcmNhc2VOYW1lIDpcblx0XHRcdFx0bnVsbDtcblx0XHRcdGF0dHJIYW5kbGVbIGxvd2VyY2FzZU5hbWUgXSA9IGhhbmRsZTtcblx0XHR9XG5cdFx0cmV0dXJuIHJldDtcblx0fTtcbn0gKTtcblxufSApO1xuIl19