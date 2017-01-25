"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define(["./core", "./core/access", "./data/var/dataPriv", "./data/var/dataUser"], function (jQuery, access, dataPriv, dataUser) {

	"use strict";

	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function getData(data) {
		if (data === "true") {
			return true;
		}

		if (data === "false") {
			return false;
		}

		if (data === "null") {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if (data === +data + "") {
			return +data;
		}

		if (rbrace.test(data)) {
			return JSON.parse(data);
		}

		return data;
	}

	function dataAttr(elem, key, data) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string") {
				try {
					data = getData(data);
				} catch (e) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function hasData(elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},

		data: function data(elem, name, _data) {
			return dataUser.access(elem, name, _data);
		},

		removeData: function removeData(elem, name) {
			dataUser.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function _data(elem, name, data) {
			return dataPriv.access(elem, name, data);
		},

		_removeData: function _removeData(elem, name) {
			dataPriv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function data(key, value) {
			var i,
			    name,
			    data,
			    elem = this[0],
			    attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);

					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {

							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = jQuery.camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get(elem, key);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, key);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function () {

					// We always store the camelCased key
					dataUser.set(this, key, value);
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function removeData(key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		}
	});

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9kYXRhLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsImpRdWVyeSIsImFjY2VzcyIsImRhdGFQcml2IiwiZGF0YVVzZXIiLCJyYnJhY2UiLCJybXVsdGlEYXNoIiwiZ2V0RGF0YSIsImRhdGEiLCJ0ZXN0IiwiSlNPTiIsInBhcnNlIiwiZGF0YUF0dHIiLCJlbGVtIiwia2V5IiwibmFtZSIsInVuZGVmaW5lZCIsIm5vZGVUeXBlIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwiZ2V0QXR0cmlidXRlIiwiZSIsInNldCIsImV4dGVuZCIsImhhc0RhdGEiLCJyZW1vdmVEYXRhIiwicmVtb3ZlIiwiX2RhdGEiLCJfcmVtb3ZlRGF0YSIsImZuIiwidmFsdWUiLCJpIiwiYXR0cnMiLCJhdHRyaWJ1dGVzIiwibGVuZ3RoIiwiZ2V0IiwiaW5kZXhPZiIsImNhbWVsQ2FzZSIsInNsaWNlIiwiZWFjaCIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBQSxPQUFRLENBQ1AsUUFETyxFQUVQLGVBRk8sRUFHUCxxQkFITyxFQUlQLHFCQUpPLENBQVIsRUFLRyxVQUFVQyxNQUFWLEVBQWtCQyxNQUFsQixFQUEwQkMsUUFBMUIsRUFBb0NDLFFBQXBDLEVBQStDOztBQUVsRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSUMsU0FBUywrQkFBYjtBQUFBLEtBQ0NDLGFBQWEsUUFEZDs7QUFHQSxVQUFTQyxPQUFULENBQWtCQyxJQUFsQixFQUF5QjtBQUN4QixNQUFLQSxTQUFTLE1BQWQsRUFBdUI7QUFDdEIsVUFBTyxJQUFQO0FBQ0E7O0FBRUQsTUFBS0EsU0FBUyxPQUFkLEVBQXdCO0FBQ3ZCLFVBQU8sS0FBUDtBQUNBOztBQUVELE1BQUtBLFNBQVMsTUFBZCxFQUF1QjtBQUN0QixVQUFPLElBQVA7QUFDQTs7QUFFRDtBQUNBLE1BQUtBLFNBQVMsQ0FB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RDtBQUtBLElBbENNLEVBa0NKLElBbENJLEVBa0NFQSxLQWxDRixFQWtDU1UsVUFBVU4sTUFBVixHQUFtQixDQWxDNUIsRUFrQytCLElBbEMvQixFQWtDcUMsSUFsQ3JDLENBQVA7QUFtQ0EsR0ExRWdCOztBQTRFakJULGNBQVksb0JBQVVYLEdBQVYsRUFBZ0I7QUFDM0IsVUFBTyxLQUFLeUIsSUFBTCxDQUFXLFlBQVc7QUFDNUJuQyxhQUFTc0IsTUFBVCxDQUFpQixJQUFqQixFQUF1QlosR0FBdkI7QUFDQSxJQUZNLENBQVA7QUFHQTtBQWhGZ0IsRUFBbEI7O0FBbUZBLFFBQU9iLE1BQVA7QUFDQyxDQWxMRCIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKCBbXG5cdFwiLi9jb3JlXCIsXG5cdFwiLi9jb3JlL2FjY2Vzc1wiLFxuXHRcIi4vZGF0YS92YXIvZGF0YVByaXZcIixcblx0XCIuL2RhdGEvdmFyL2RhdGFVc2VyXCJcbl0sIGZ1bmN0aW9uKCBqUXVlcnksIGFjY2VzcywgZGF0YVByaXYsIGRhdGFVc2VyICkge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLy9cdEltcGxlbWVudGF0aW9uIFN1bW1hcnlcbi8vXG4vL1x0MS4gRW5mb3JjZSBBUEkgc3VyZmFjZSBhbmQgc2VtYW50aWMgY29tcGF0aWJpbGl0eSB3aXRoIDEuOS54IGJyYW5jaFxuLy9cdDIuIEltcHJvdmUgdGhlIG1vZHVsZSdzIG1haW50YWluYWJpbGl0eSBieSByZWR1Y2luZyB0aGUgc3RvcmFnZVxuLy9cdFx0cGF0aHMgdG8gYSBzaW5nbGUgbWVjaGFuaXNtLlxuLy9cdDMuIFVzZSB0aGUgc2FtZSBzaW5nbGUgbWVjaGFuaXNtIHRvIHN1cHBvcnQgXCJwcml2YXRlXCIgYW5kIFwidXNlclwiIGRhdGEuXG4vL1x0NC4gX05ldmVyXyBleHBvc2UgXCJwcml2YXRlXCIgZGF0YSB0byB1c2VyIGNvZGUgKFRPRE86IERyb3AgX2RhdGEsIF9yZW1vdmVEYXRhKVxuLy9cdDUuIEF2b2lkIGV4cG9zaW5nIGltcGxlbWVudGF0aW9uIGRldGFpbHMgb24gdXNlciBvYmplY3RzIChlZy4gZXhwYW5kbyBwcm9wZXJ0aWVzKVxuLy9cdDYuIFByb3ZpZGUgYSBjbGVhciBwYXRoIGZvciBpbXBsZW1lbnRhdGlvbiB1cGdyYWRlIHRvIFdlYWtNYXAgaW4gMjAxNFxuXG52YXIgcmJyYWNlID0gL14oPzpcXHtbXFx3XFxXXSpcXH18XFxbW1xcd1xcV10qXFxdKSQvLFxuXHRybXVsdGlEYXNoID0gL1tBLVpdL2c7XG5cbmZ1bmN0aW9uIGdldERhdGEoIGRhdGEgKSB7XG5cdGlmICggZGF0YSA9PT0gXCJ0cnVlXCIgKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRpZiAoIGRhdGEgPT09IFwiZmFsc2VcIiApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRpZiAoIGRhdGEgPT09IFwibnVsbFwiICkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gT25seSBjb252ZXJ0IHRvIGEgbnVtYmVyIGlmIGl0IGRvZXNuJ3QgY2hhbmdlIHRoZSBzdHJpbmdcblx0aWYgKCBkYXRhID09PSArZGF0YSArIFwiXCIgKSB7XG5cdFx0cmV0dXJuICtkYXRhO1xuXHR9XG5cblx0aWYgKCByYnJhY2UudGVzdCggZGF0YSApICkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKCBkYXRhICk7XG5cdH1cblxuXHRyZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZGF0YUF0dHIoIGVsZW0sIGtleSwgZGF0YSApIHtcblx0dmFyIG5hbWU7XG5cblx0Ly8gSWYgbm90aGluZyB3YXMgZm91bmQgaW50ZXJuYWxseSwgdHJ5IHRvIGZldGNoIGFueVxuXHQvLyBkYXRhIGZyb20gdGhlIEhUTUw1IGRhdGEtKiBhdHRyaWJ1dGVcblx0aWYgKCBkYXRhID09PSB1bmRlZmluZWQgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRuYW1lID0gXCJkYXRhLVwiICsga2V5LnJlcGxhY2UoIHJtdWx0aURhc2gsIFwiLSQmXCIgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGRhdGEgPSBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApO1xuXG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGRhdGEgPSBnZXREYXRhKCBkYXRhICk7XG5cdFx0XHR9IGNhdGNoICggZSApIHt9XG5cblx0XHRcdC8vIE1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGRhdGEgc28gaXQgaXNuJ3QgY2hhbmdlZCBsYXRlclxuXHRcdFx0ZGF0YVVzZXIuc2V0KCBlbGVtLCBrZXksIGRhdGEgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGRhdGE7XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0aGFzRGF0YTogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRhdGFVc2VyLmhhc0RhdGEoIGVsZW0gKSB8fCBkYXRhUHJpdi5oYXNEYXRhKCBlbGVtICk7XG5cdH0sXG5cblx0ZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFVc2VyLmFjY2VzcyggZWxlbSwgbmFtZSwgZGF0YSApO1xuXHR9LFxuXG5cdHJlbW92ZURhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdGRhdGFVc2VyLnJlbW92ZSggZWxlbSwgbmFtZSApO1xuXHR9LFxuXG5cdC8vIFRPRE86IE5vdyB0aGF0IGFsbCBjYWxscyB0byBfZGF0YSBhbmQgX3JlbW92ZURhdGEgaGF2ZSBiZWVuIHJlcGxhY2VkXG5cdC8vIHdpdGggZGlyZWN0IGNhbGxzIHRvIGRhdGFQcml2IG1ldGhvZHMsIHRoZXNlIGNhbiBiZSBkZXByZWNhdGVkLlxuXHRfZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFQcml2LmFjY2VzcyggZWxlbSwgbmFtZSwgZGF0YSApO1xuXHR9LFxuXG5cdF9yZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIG5hbWUgKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGRhdGE6IGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xuXHRcdHZhciBpLCBuYW1lLCBkYXRhLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRcdGF0dHJzID0gZWxlbSAmJiBlbGVtLmF0dHJpYnV0ZXM7XG5cblx0XHQvLyBHZXRzIGFsbCB2YWx1ZXNcblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCB0aGlzLmxlbmd0aCApIHtcblx0XHRcdFx0ZGF0YSA9IGRhdGFVc2VyLmdldCggZWxlbSApO1xuXG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAhZGF0YVByaXYuZ2V0KCBlbGVtLCBcImhhc0RhdGFBdHRyc1wiICkgKSB7XG5cdFx0XHRcdFx0aSA9IGF0dHJzLmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgMTEgb25seVxuXHRcdFx0XHRcdFx0Ly8gVGhlIGF0dHJzIGVsZW1lbnRzIGNhbiBiZSBudWxsICgjMTQ4OTQpXG5cdFx0XHRcdFx0XHRpZiAoIGF0dHJzWyBpIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG5hbWUgPSBhdHRyc1sgaSBdLm5hbWU7XG5cdFx0XHRcdFx0XHRcdGlmICggbmFtZS5pbmRleE9mKCBcImRhdGEtXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0XHRcdFx0XHRuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZS5zbGljZSggNSApICk7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0YUF0dHIoIGVsZW0sIG5hbWUsIGRhdGFbIG5hbWUgXSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRhdGFQcml2LnNldCggZWxlbSwgXCJoYXNEYXRhQXR0cnNcIiwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH1cblxuXHRcdC8vIFNldHMgbXVsdGlwbGUgdmFsdWVzXG5cdFx0aWYgKCB0eXBlb2Yga2V5ID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRhdGFVc2VyLnNldCggdGhpcywga2V5ICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGRhdGE7XG5cblx0XHRcdC8vIFRoZSBjYWxsaW5nIGpRdWVyeSBvYmplY3QgKGVsZW1lbnQgbWF0Y2hlcykgaXMgbm90IGVtcHR5XG5cdFx0XHQvLyAoYW5kIHRoZXJlZm9yZSBoYXMgYW4gZWxlbWVudCBhcHBlYXJzIGF0IHRoaXNbIDAgXSkgYW5kIHRoZVxuXHRcdFx0Ly8gYHZhbHVlYCBwYXJhbWV0ZXIgd2FzIG5vdCB1bmRlZmluZWQuIEFuIGVtcHR5IGpRdWVyeSBvYmplY3Rcblx0XHRcdC8vIHdpbGwgcmVzdWx0IGluIGB1bmRlZmluZWRgIGZvciBlbGVtID0gdGhpc1sgMCBdIHdoaWNoIHdpbGxcblx0XHRcdC8vIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhbiBhdHRlbXB0IHRvIHJlYWQgYSBkYXRhIGNhY2hlIGlzIG1hZGUuXG5cdFx0XHRpZiAoIGVsZW0gJiYgdmFsdWUgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHQvLyBBdHRlbXB0IHRvIGdldCBkYXRhIGZyb20gdGhlIGNhY2hlXG5cdFx0XHRcdC8vIFRoZSBrZXkgd2lsbCBhbHdheXMgYmUgY2FtZWxDYXNlZCBpbiBEYXRhXG5cdFx0XHRcdGRhdGEgPSBkYXRhVXNlci5nZXQoIGVsZW0sIGtleSApO1xuXHRcdFx0XHRpZiAoIGRhdGEgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEF0dGVtcHQgdG8gXCJkaXNjb3ZlclwiIHRoZSBkYXRhIGluXG5cdFx0XHRcdC8vIEhUTUw1IGN1c3RvbSBkYXRhLSogYXR0cnNcblx0XHRcdFx0ZGF0YSA9IGRhdGFBdHRyKCBlbGVtLCBrZXkgKTtcblx0XHRcdFx0aWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBXZSB0cmllZCByZWFsbHkgaGFyZCwgYnV0IHRoZSBkYXRhIGRvZXNuJ3QgZXhpc3QuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IHRoZSBkYXRhLi4uXG5cdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdC8vIFdlIGFsd2F5cyBzdG9yZSB0aGUgY2FtZWxDYXNlZCBrZXlcblx0XHRcdFx0ZGF0YVVzZXIuc2V0KCB0aGlzLCBrZXksIHZhbHVlICk7XG5cdFx0XHR9ICk7XG5cdFx0fSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxLCBudWxsLCB0cnVlICk7XG5cdH0sXG5cblx0cmVtb3ZlRGF0YTogZnVuY3Rpb24oIGtleSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGRhdGFVc2VyLnJlbW92ZSggdGhpcywga2V5ICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbnJldHVybiBqUXVlcnk7XG59ICk7XG4iXX0=