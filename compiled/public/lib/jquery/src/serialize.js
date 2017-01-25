"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define(["./core", "./manipulation/var/rcheckableType", "./core/init", "./traversing", // filter
"./attributes/prop"], function (jQuery, rcheckableType) {

	"use strict";

	var rbracket = /\[\]$/,
	    rCRLF = /\r?\n/g,
	    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	    rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;

		if (jQuery.isArray(obj)) {

			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {

					// Treat each array item as a scalar.
					add(prefix, v);
				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
				}
			});
		} else if (!traditional && jQuery.type(obj) === "object") {

			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {

			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		var prefix,
		    s = [],
		    add = function add(key, valueOrFunction) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;

			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
		};

		// If an array was passed in, assume that it is an array of form elements.
		if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&");
	};

	jQuery.fn.extend({
		serialize: function serialize() {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function serializeArray() {
			return this.map(function () {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			}).filter(function () {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
			}).map(function (i, elem) {
				var val = jQuery(this).val();

				if (val == null) {
					return null;
				}

				if (jQuery.isArray(val)) {
					return jQuery.map(val, function (val) {
						return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
					});
				}

				return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		}
	});

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9zZXJpYWxpemUuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwialF1ZXJ5IiwicmNoZWNrYWJsZVR5cGUiLCJyYnJhY2tldCIsInJDUkxGIiwicnN1Ym1pdHRlclR5cGVzIiwicnN1Ym1pdHRhYmxlIiwiYnVpbGRQYXJhbXMiLCJwcmVmaXgiLCJvYmoiLCJ0cmFkaXRpb25hbCIsImFkZCIsIm5hbWUiLCJpc0FycmF5IiwiZWFjaCIsImkiLCJ2IiwidGVzdCIsInR5cGUiLCJwYXJhbSIsImEiLCJzIiwia2V5IiwidmFsdWVPckZ1bmN0aW9uIiwidmFsdWUiLCJpc0Z1bmN0aW9uIiwibGVuZ3RoIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwianF1ZXJ5IiwiaXNQbGFpbk9iamVjdCIsImpvaW4iLCJmbiIsImV4dGVuZCIsInNlcmlhbGl6ZSIsInNlcmlhbGl6ZUFycmF5IiwibWFwIiwiZWxlbWVudHMiLCJwcm9wIiwibWFrZUFycmF5IiwiZmlsdGVyIiwiaXMiLCJub2RlTmFtZSIsImNoZWNrZWQiLCJlbGVtIiwidmFsIiwicmVwbGFjZSIsImdldCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBQSxPQUFRLENBQ1AsUUFETyxFQUVQLG1DQUZPLEVBR1AsYUFITyxFQUlQLGNBSk8sRUFJUztBQUNoQixtQkFMTyxDQUFSLEVBTUcsVUFBVUMsTUFBVixFQUFrQkMsY0FBbEIsRUFBbUM7O0FBRXRDOztBQUVBLEtBQ0NDLFdBQVcsT0FEWjtBQUFBLEtBRUNDLFFBQVEsUUFGVDtBQUFBLEtBR0NDLGtCQUFrQix1Q0FIbkI7QUFBQSxLQUlDQyxlQUFlLG9DQUpoQjs7QUFNQSxVQUFTQyxXQUFULENBQXNCQyxNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNDLFdBQW5DLEVBQWdEQyxHQUFoRCxFQUFzRDtBQUNyRCxNQUFJQyxJQUFKOztBQUVBLE1BQUtYLE9BQU9ZLE9BQVAsQ0FBZ0JKLEdBQWhCLENBQUwsRUFBNkI7O0FB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LENBQWQsSUFDTmxDLGFBQWFXLElBQWIsQ0FBbUIsS0FBS3dCLFFBQXhCLENBRE0sSUFDZ0MsQ0FBQ3BDLGdCQUFnQlksSUFBaEIsQ0FBc0JDLElBQXRCLENBRGpDLEtBRUosS0FBS3dCLE9BQUwsSUFBZ0IsQ0FBQ3hDLGVBQWVlLElBQWYsQ0FBcUJDLElBQXJCLENBRmIsQ0FBUDtBQUdBLElBYk0sRUFjTmlCLEdBZE0sQ0FjRCxVQUFVcEIsQ0FBVixFQUFhNEIsSUFBYixFQUFvQjtBQUN6QixRQUFJQyxNQUFNM0MsT0FBUSxJQUFSLEVBQWUyQyxHQUFmLEVBQVY7O0FBRUEsUUFBS0EsT0FBTyxJQUFaLEVBQW1CO0FBQ2xCLFlBQU8sSUFBUDtBQUNBOztBQUVELFFBQUszQyxPQUFPWSxPQUFQLENBQWdCK0IsR0FBaEIsQ0FBTCxFQUE2QjtBQUM1QixZQUFPM0MsT0FBT2tDLEdBQVAsQ0FBWVMsR0FBWixFQUFpQixVQUFVQSxHQUFWLEVBQWdCO0FBQ3ZDLGFBQU8sRUFBRWhDLE1BQU0rQixLQUFLL0IsSUFBYixFQUFtQlksT0FBT29CLElBQUlDLE9BQUosQ0FBYXpDLEtBQWIsRUFBb0IsTUFBcEIsQ0FBMUIsRUFBUDtBQUNBLE1BRk0sQ0FBUDtBQUdBOztBQUVELFdBQU8sRUFBRVEsTUFBTStCLEtBQUsvQixJQUFiLEVBQW1CWSxPQUFPb0IsSUFBSUMsT0FBSixDQUFhekMsS0FBYixFQUFvQixNQUFwQixDQUExQixFQUFQO0FBQ0EsSUE1Qk0sRUE0QkgwQyxHQTVCRyxFQUFQO0FBNkJBO0FBbENnQixFQUFsQjs7QUFxQ0EsUUFBTzdDLE1BQVA7QUFDQyxDQWpJRCIsImZpbGUiOiJzZXJpYWxpemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuL2NvcmVcIixcblx0XCIuL21hbmlwdWxhdGlvbi92YXIvcmNoZWNrYWJsZVR5cGVcIixcblx0XCIuL2NvcmUvaW5pdFwiLFxuXHRcIi4vdHJhdmVyc2luZ1wiLCAvLyBmaWx0ZXJcblx0XCIuL2F0dHJpYnV0ZXMvcHJvcFwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCByY2hlY2thYmxlVHlwZSApIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhclxuXHRyYnJhY2tldCA9IC9cXFtcXF0kLyxcblx0ckNSTEYgPSAvXFxyP1xcbi9nLFxuXHRyc3VibWl0dGVyVHlwZXMgPSAvXig/OnN1Ym1pdHxidXR0b258aW1hZ2V8cmVzZXR8ZmlsZSkkL2ksXG5cdHJzdWJtaXR0YWJsZSA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGtleWdlbikvaTtcblxuZnVuY3Rpb24gYnVpbGRQYXJhbXMoIHByZWZpeCwgb2JqLCB0cmFkaXRpb25hbCwgYWRkICkge1xuXHR2YXIgbmFtZTtcblxuXHRpZiAoIGpRdWVyeS5pc0FycmF5KCBvYmogKSApIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSBhcnJheSBpdGVtLlxuXHRcdGpRdWVyeS5lYWNoKCBvYmosIGZ1bmN0aW9uKCBpLCB2ICkge1xuXHRcdFx0aWYgKCB0cmFkaXRpb25hbCB8fCByYnJhY2tldC50ZXN0KCBwcmVmaXggKSApIHtcblxuXHRcdFx0XHQvLyBUcmVhdCBlYWNoIGFycmF5IGl0ZW0gYXMgYSBzY2FsYXIuXG5cdFx0XHRcdGFkZCggcHJlZml4LCB2ICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gSXRlbSBpcyBub24tc2NhbGFyIChhcnJheSBvciBvYmplY3QpLCBlbmNvZGUgaXRzIG51bWVyaWMgaW5kZXguXG5cdFx0XHRcdGJ1aWxkUGFyYW1zKFxuXHRcdFx0XHRcdHByZWZpeCArIFwiW1wiICsgKCB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIiAmJiB2ICE9IG51bGwgPyBpIDogXCJcIiApICsgXCJdXCIsXG5cdFx0XHRcdFx0dixcblx0XHRcdFx0XHR0cmFkaXRpb25hbCxcblx0XHRcdFx0XHRhZGRcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9ICk7XG5cblx0fSBlbHNlIGlmICggIXRyYWRpdGlvbmFsICYmIGpRdWVyeS50eXBlKCBvYmogKSA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSBvYmplY3QgaXRlbS5cblx0XHRmb3IgKCBuYW1lIGluIG9iaiApIHtcblx0XHRcdGJ1aWxkUGFyYW1zKCBwcmVmaXggKyBcIltcIiArIG5hbWUgKyBcIl1cIiwgb2JqWyBuYW1lIF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHR9XG5cblx0fSBlbHNlIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSBzY2FsYXIgaXRlbS5cblx0XHRhZGQoIHByZWZpeCwgb2JqICk7XG5cdH1cbn1cblxuLy8gU2VyaWFsaXplIGFuIGFycmF5IG9mIGZvcm0gZWxlbWVudHMgb3IgYSBzZXQgb2Zcbi8vIGtleS92YWx1ZXMgaW50byBhIHF1ZXJ5IHN0cmluZ1xualF1ZXJ5LnBhcmFtID0gZnVuY3Rpb24oIGEsIHRyYWRpdGlvbmFsICkge1xuXHR2YXIgcHJlZml4LFxuXHRcdHMgPSBbXSxcblx0XHRhZGQgPSBmdW5jdGlvbigga2V5LCB2YWx1ZU9yRnVuY3Rpb24gKSB7XG5cblx0XHRcdC8vIElmIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGludm9rZSBpdCBhbmQgdXNlIGl0cyByZXR1cm4gdmFsdWVcblx0XHRcdHZhciB2YWx1ZSA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZU9yRnVuY3Rpb24gKSA/XG5cdFx0XHRcdHZhbHVlT3JGdW5jdGlvbigpIDpcblx0XHRcdFx0dmFsdWVPckZ1bmN0aW9uO1xuXG5cdFx0XHRzWyBzLmxlbmd0aCBdID0gZW5jb2RlVVJJQ29tcG9uZW50KCBrZXkgKSArIFwiPVwiICtcblx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KCB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICk7XG5cdFx0fTtcblxuXHQvLyBJZiBhbiBhcnJheSB3YXMgcGFzc2VkIGluLCBhc3N1bWUgdGhhdCBpdCBpcyBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzLlxuXHRpZiAoIGpRdWVyeS5pc0FycmF5KCBhICkgfHwgKCBhLmpxdWVyeSAmJiAhalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGEgKSApICkge1xuXG5cdFx0Ly8gU2VyaWFsaXplIHRoZSBmb3JtIGVsZW1lbnRzXG5cdFx0alF1ZXJ5LmVhY2goIGEsIGZ1bmN0aW9uKCkge1xuXHRcdFx0YWRkKCB0aGlzLm5hbWUsIHRoaXMudmFsdWUgKTtcblx0XHR9ICk7XG5cblx0fSBlbHNlIHtcblxuXHRcdC8vIElmIHRyYWRpdGlvbmFsLCBlbmNvZGUgdGhlIFwib2xkXCIgd2F5ICh0aGUgd2F5IDEuMy4yIG9yIG9sZGVyXG5cdFx0Ly8gZGlkIGl0KSwgb3RoZXJ3aXNlIGVuY29kZSBwYXJhbXMgcmVjdXJzaXZlbHkuXG5cdFx0Zm9yICggcHJlZml4IGluIGEgKSB7XG5cdFx0XHRidWlsZFBhcmFtcyggcHJlZml4LCBhWyBwcmVmaXggXSwgdHJhZGl0aW9uYWwsIGFkZCApO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgcmVzdWx0aW5nIHNlcmlhbGl6YXRpb25cblx0cmV0dXJuIHMuam9pbiggXCImXCIgKTtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0c2VyaWFsaXplOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4galF1ZXJ5LnBhcmFtKCB0aGlzLnNlcmlhbGl6ZUFycmF5KCkgKTtcblx0fSxcblx0c2VyaWFsaXplQXJyYXk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIENhbiBhZGQgcHJvcEhvb2sgZm9yIFwiZWxlbWVudHNcIiB0byBmaWx0ZXIgb3IgYWRkIGZvcm0gZWxlbWVudHNcblx0XHRcdHZhciBlbGVtZW50cyA9IGpRdWVyeS5wcm9wKCB0aGlzLCBcImVsZW1lbnRzXCIgKTtcblx0XHRcdHJldHVybiBlbGVtZW50cyA/IGpRdWVyeS5tYWtlQXJyYXkoIGVsZW1lbnRzICkgOiB0aGlzO1xuXHRcdH0gKVxuXHRcdC5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHR5cGUgPSB0aGlzLnR5cGU7XG5cblx0XHRcdC8vIFVzZSAuaXMoIFwiOmRpc2FibGVkXCIgKSBzbyB0aGF0IGZpZWxkc2V0W2Rpc2FibGVkXSB3b3Jrc1xuXHRcdFx0cmV0dXJuIHRoaXMubmFtZSAmJiAhalF1ZXJ5KCB0aGlzICkuaXMoIFwiOmRpc2FibGVkXCIgKSAmJlxuXHRcdFx0XHRyc3VibWl0dGFibGUudGVzdCggdGhpcy5ub2RlTmFtZSApICYmICFyc3VibWl0dGVyVHlwZXMudGVzdCggdHlwZSApICYmXG5cdFx0XHRcdCggdGhpcy5jaGVja2VkIHx8ICFyY2hlY2thYmxlVHlwZS50ZXN0KCB0eXBlICkgKTtcblx0XHR9IClcblx0XHQubWFwKCBmdW5jdGlvbiggaSwgZWxlbSApIHtcblx0XHRcdHZhciB2YWwgPSBqUXVlcnkoIHRoaXMgKS52YWwoKTtcblxuXHRcdFx0aWYgKCB2YWwgPT0gbnVsbCApIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggalF1ZXJ5LmlzQXJyYXkoIHZhbCApICkge1xuXHRcdFx0XHRyZXR1cm4galF1ZXJ5Lm1hcCggdmFsLCBmdW5jdGlvbiggdmFsICkge1xuXHRcdFx0XHRcdHJldHVybiB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHsgbmFtZTogZWxlbS5uYW1lLCB2YWx1ZTogdmFsLnJlcGxhY2UoIHJDUkxGLCBcIlxcclxcblwiICkgfTtcblx0XHR9ICkuZ2V0KCk7XG5cdH1cbn0gKTtcblxucmV0dXJuIGpRdWVyeTtcbn0gKTtcbiJdfQ==