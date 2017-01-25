"use strict";

define(["../core", "../var/rnothtmlwhite", "./var/acceptData"], function (jQuery, rnothtmlwhite, acceptData) {

	"use strict";

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function cache(owner) {

			// Check if the owner object already has a cache
			var value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
						Object.defineProperty(owner, this.expando, {
							value: value,
							configurable: true
						});
					}
				}
			}

			return value;
		},
		set: function set(owner, data, value) {
			var prop,
			    cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if (typeof data === "string") {
				cache[jQuery.camelCase(data)] = value;

				// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for (prop in data) {
					cache[jQuery.camelCase(prop)] = data[prop];
				}
			}
			return cache;
		},
		get: function get(owner, key) {
			return key === undefined ? this.cache(owner) :

			// Always use camelCase key (gh-2257)
			owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
		},
		access: function access(owner, key, value) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined || key && typeof key === "string" && value === undefined) {

				return this.get(owner, key);
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function remove(owner, key) {
			var i,
			    cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key !== undefined) {

				// Support array or space separated string of keys
				if (jQuery.isArray(key)) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map(jQuery.camelCase);
				} else {
					key = jQuery.camelCase(key);

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
				}

				i = key.length;

				while (i--) {
					delete cache[key[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function hasData(owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};

	return Data;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9kYXRhL0RhdGEuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwialF1ZXJ5Iiwicm5vdGh0bWx3aGl0ZSIsImFjY2VwdERhdGEiLCJEYXRhIiwiZXhwYW5kbyIsInVpZCIsInByb3RvdHlwZSIsImNhY2hlIiwib3duZXIiLCJ2YWx1ZSIsIm5vZGVUeXBlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJzZXQiLCJkYXRhIiwicHJvcCIsImNhbWVsQ2FzZSIsImdldCIsImtleSIsInVuZGVmaW5lZCIsImFjY2VzcyIsInJlbW92ZSIsImkiLCJpc0FycmF5IiwibWFwIiwibWF0Y2giLCJsZW5ndGgiLCJpc0VtcHR5T2JqZWN0IiwiaGFzRGF0YSJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsT0FBUSxDQUNQLFNBRE8sRUFFUCxzQkFGTyxFQUdQLGtCQUhPLENBQVIsRUFJRyxVQUFVQyxNQUFWLEVBQWtCQyxhQUFsQixFQUFpQ0MsVUFBakMsRUFBOEM7O0FBRWpEOztBQUVBLFVBQVNDLElBQVQsR0FBZ0I7QUFDZixPQUFLQyxPQUFMLEdBQWVKLE9BQU9JLE9BQVAsR0FBaUJELEtBQUtFLEdBQUwsRUFBaEM7QUFDQTs7QUFFREYsTUFBS0UsR0FBTCxHQUFXLENBQVg7O0FBRUFGLE1BQUtHLFNBQUwsR0FBaUI7O0FBRWhCQyxTQUFPLGVBQVVDLEtBQVYsRUFBa0I7O0FBRXhCO0FBQ0EsT0FBSUMsUUFBUUQsTUFBTyxLQUFLSixPQUFaLENBQVo7O0FBRUE7QUFDQSxPQUFLLENBQUNLLEtBQU4sRUFBYztBQUNiQSxZQUFRLEVBQVI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBS1AsV0FBWU0sS0FBWixDQUFMLEVBQTJCOztBQUUxQjtBQUNBO0FBQ0EsU0FBS0EsTUFBTUUsUUFBWCxFQUFzQjtBQUNyQkYsWUFBTyxLQUFLSixPQUFaLElBQXdCSyxLQUF4Qjs7QUFFRDtBQUNBO0FB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TUFBTUUsUUFBWCxFQUFzQjtBQUNyQkYsV0FBTyxLQUFLSixPQUFaLElBQXdCZ0IsU0FBeEI7QUFDQSxLQUZELE1BRU87QUFDTixZQUFPWixNQUFPLEtBQUtKLE9BQVosQ0FBUDtBQUNBO0FBQ0Q7QUFDRCxHQTFJZTtBQTJJaEJ5QixXQUFTLGlCQUFVckIsS0FBVixFQUFrQjtBQUMxQixPQUFJRCxRQUFRQyxNQUFPLEtBQUtKLE9BQVosQ0FBWjtBQUNBLFVBQU9HLFVBQVVhLFNBQVYsSUFBdUIsQ0FBQ3BCLE9BQU80QixhQUFQLENBQXNCckIsS0FBdEIsQ0FBL0I7QUFDQTtBQTlJZSxFQUFqQjs7QUFpSkEsUUFBT0osSUFBUDtBQUNDLENBaEtEIiwiZmlsZSI6IkRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuLi9jb3JlXCIsXG5cdFwiLi4vdmFyL3Jub3RodG1sd2hpdGVcIixcblx0XCIuL3Zhci9hY2NlcHREYXRhXCJcbl0sIGZ1bmN0aW9uKCBqUXVlcnksIHJub3RodG1sd2hpdGUsIGFjY2VwdERhdGEgKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBEYXRhKCkge1xuXHR0aGlzLmV4cGFuZG8gPSBqUXVlcnkuZXhwYW5kbyArIERhdGEudWlkKys7XG59XG5cbkRhdGEudWlkID0gMTtcblxuRGF0YS5wcm90b3R5cGUgPSB7XG5cblx0Y2FjaGU6IGZ1bmN0aW9uKCBvd25lciApIHtcblxuXHRcdC8vIENoZWNrIGlmIHRoZSBvd25lciBvYmplY3QgYWxyZWFkeSBoYXMgYSBjYWNoZVxuXHRcdHZhciB2YWx1ZSA9IG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblxuXHRcdC8vIElmIG5vdCwgY3JlYXRlIG9uZVxuXHRcdGlmICggIXZhbHVlICkge1xuXHRcdFx0dmFsdWUgPSB7fTtcblxuXHRcdFx0Ly8gV2UgY2FuIGFjY2VwdCBkYXRhIGZvciBub24tZWxlbWVudCBub2RlcyBpbiBtb2Rlcm4gYnJvd3NlcnMsXG5cdFx0XHQvLyBidXQgd2Ugc2hvdWxkIG5vdCwgc2VlICM4MzM1LlxuXHRcdFx0Ly8gQWx3YXlzIHJldHVybiBhbiBlbXB0eSBvYmplY3QuXG5cdFx0XHRpZiAoIGFjY2VwdERhdGEoIG93bmVyICkgKSB7XG5cblx0XHRcdFx0Ly8gSWYgaXQgaXMgYSBub2RlIHVubGlrZWx5IHRvIGJlIHN0cmluZ2lmeS1lZCBvciBsb29wZWQgb3ZlclxuXHRcdFx0XHQvLyB1c2UgcGxhaW4gYXNzaWdubWVudFxuXHRcdFx0XHRpZiAoIG93bmVyLm5vZGVUeXBlICkge1xuXHRcdFx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSA9IHZhbHVlO1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSBzZWN1cmUgaXQgaW4gYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eVxuXHRcdFx0XHQvLyBjb25maWd1cmFibGUgbXVzdCBiZSB0cnVlIHRvIGFsbG93IHRoZSBwcm9wZXJ0eSB0byBiZVxuXHRcdFx0XHQvLyBkZWxldGVkIHdoZW4gZGF0YSBpcyByZW1vdmVkXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBvd25lciwgdGhpcy5leHBhbmRvLCB7XG5cdFx0XHRcdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWVcblx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH0sXG5cdHNldDogZnVuY3Rpb24oIG93bmVyLCBkYXRhLCB2YWx1ZSApIHtcblx0XHR2YXIgcHJvcCxcblx0XHRcdGNhY2hlID0gdGhpcy5jYWNoZSggb3duZXIgKTtcblxuXHRcdC8vIEhhbmRsZTogWyBvd25lciwga2V5LCB2YWx1ZSBdIGFyZ3Ncblx0XHQvLyBBbHdheXMgdXNlIGNhbWVsQ2FzZSBrZXkgKGdoLTIyNTcpXG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGNhY2hlWyBqUXVlcnkuY2FtZWxDYXNlKCBkYXRhICkgXSA9IHZhbHVlO1xuXG5cdFx0Ly8gSGFuZGxlOiBbIG93bmVyLCB7IHByb3BlcnRpZXMgfSBdIGFyZ3Ncblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBDb3B5IHRoZSBwcm9wZXJ0aWVzIG9uZS1ieS1vbmUgdG8gdGhlIGNhY2hlIG9iamVjdFxuXHRcdFx0Zm9yICggcHJvcCBpbiBkYXRhICkge1xuXHRcdFx0XHRjYWNoZVsgalF1ZXJ5LmNhbWVsQ2FzZSggcHJvcCApIF0gPSBkYXRhWyBwcm9wIF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBjYWNoZTtcblx0fSxcblx0Z2V0OiBmdW5jdGlvbiggb3duZXIsIGtleSApIHtcblx0XHRyZXR1cm4ga2V5ID09PSB1bmRlZmluZWQgP1xuXHRcdFx0dGhpcy5jYWNoZSggb3duZXIgKSA6XG5cblx0XHRcdC8vIEFsd2F5cyB1c2UgY2FtZWxDYXNlIGtleSAoZ2gtMjI1Nylcblx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSAmJiBvd25lclsgdGhpcy5leHBhbmRvIF1bIGpRdWVyeS5jYW1lbENhc2UoIGtleSApIF07XG5cdH0sXG5cdGFjY2VzczogZnVuY3Rpb24oIG93bmVyLCBrZXksIHZhbHVlICkge1xuXG5cdFx0Ly8gSW4gY2FzZXMgd2hlcmUgZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBObyBrZXkgd2FzIHNwZWNpZmllZFxuXHRcdC8vICAgMi4gQSBzdHJpbmcga2V5IHdhcyBzcGVjaWZpZWQsIGJ1dCBubyB2YWx1ZSBwcm92aWRlZFxuXHRcdC8vXG5cdFx0Ly8gVGFrZSB0aGUgXCJyZWFkXCIgcGF0aCBhbmQgYWxsb3cgdGhlIGdldCBtZXRob2QgdG8gZGV0ZXJtaW5lXG5cdFx0Ly8gd2hpY2ggdmFsdWUgdG8gcmV0dXJuLCByZXNwZWN0aXZlbHkgZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBUaGUgZW50aXJlIGNhY2hlIG9iamVjdFxuXHRcdC8vICAgMi4gVGhlIGRhdGEgc3RvcmVkIGF0IHRoZSBrZXlcblx0XHQvL1xuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0KCAoIGtleSAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICkgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCApICkge1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXQoIG93bmVyLCBrZXkgKTtcblx0XHR9XG5cblx0XHQvLyBXaGVuIHRoZSBrZXkgaXMgbm90IGEgc3RyaW5nLCBvciBib3RoIGEga2V5IGFuZCB2YWx1ZVxuXHRcdC8vIGFyZSBzcGVjaWZpZWQsIHNldCBvciBleHRlbmQgKGV4aXN0aW5nIG9iamVjdHMpIHdpdGggZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBBbiBvYmplY3Qgb2YgcHJvcGVydGllc1xuXHRcdC8vICAgMi4gQSBrZXkgYW5kIHZhbHVlXG5cdFx0Ly9cblx0XHR0aGlzLnNldCggb3duZXIsIGtleSwgdmFsdWUgKTtcblxuXHRcdC8vIFNpbmNlIHRoZSBcInNldFwiIHBhdGggY2FuIGhhdmUgdHdvIHBvc3NpYmxlIGVudHJ5IHBvaW50c1xuXHRcdC8vIHJldHVybiB0aGUgZXhwZWN0ZWQgZGF0YSBiYXNlZCBvbiB3aGljaCBwYXRoIHdhcyB0YWtlblsqXVxuXHRcdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiBrZXk7XG5cdH0sXG5cdHJlbW92ZTogZnVuY3Rpb24oIG93bmVyLCBrZXkgKSB7XG5cdFx0dmFyIGksXG5cdFx0XHRjYWNoZSA9IG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblxuXHRcdGlmICggY2FjaGUgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIGtleSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHQvLyBTdXBwb3J0IGFycmF5IG9yIHNwYWNlIHNlcGFyYXRlZCBzdHJpbmcgb2Yga2V5c1xuXHRcdFx0aWYgKCBqUXVlcnkuaXNBcnJheSgga2V5ICkgKSB7XG5cblx0XHRcdFx0Ly8gSWYga2V5IGlzIGFuIGFycmF5IG9mIGtleXMuLi5cblx0XHRcdFx0Ly8gV2UgYWx3YXlzIHNldCBjYW1lbENhc2Uga2V5cywgc28gcmVtb3ZlIHRoYXQuXG5cdFx0XHRcdGtleSA9IGtleS5tYXAoIGpRdWVyeS5jYW1lbENhc2UgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGtleSA9IGpRdWVyeS5jYW1lbENhc2UoIGtleSApO1xuXG5cdFx0XHRcdC8vIElmIGEga2V5IHdpdGggdGhlIHNwYWNlcyBleGlzdHMsIHVzZSBpdC5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCBjcmVhdGUgYW4gYXJyYXkgYnkgbWF0Y2hpbmcgbm9uLXdoaXRlc3BhY2Vcblx0XHRcdFx0a2V5ID0ga2V5IGluIGNhY2hlID9cblx0XHRcdFx0XHRbIGtleSBdIDpcblx0XHRcdFx0XHQoIGtleS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdICk7XG5cdFx0XHR9XG5cblx0XHRcdGkgPSBrZXkubGVuZ3RoO1xuXG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0ZGVsZXRlIGNhY2hlWyBrZXlbIGkgXSBdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSB0aGUgZXhwYW5kbyBpZiB0aGVyZSdzIG5vIG1vcmUgZGF0YVxuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgfHwgalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGNhY2hlICkgKSB7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZSA8PTM1IC0gNDVcblx0XHRcdC8vIFdlYmtpdCAmIEJsaW5rIHBlcmZvcm1hbmNlIHN1ZmZlcnMgd2hlbiBkZWxldGluZyBwcm9wZXJ0aWVzXG5cdFx0XHQvLyBmcm9tIERPTSBub2Rlcywgc28gc2V0IHRvIHVuZGVmaW5lZCBpbnN0ZWFkXG5cdFx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0zNzg2MDcgKGJ1ZyByZXN0cmljdGVkKVxuXHRcdFx0aWYgKCBvd25lci5ub2RlVHlwZSApIHtcblx0XHRcdFx0b3duZXJbIHRoaXMuZXhwYW5kbyBdID0gdW5kZWZpbmVkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVsZXRlIG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGhhc0RhdGE6IGZ1bmN0aW9uKCBvd25lciApIHtcblx0XHR2YXIgY2FjaGUgPSBvd25lclsgdGhpcy5leHBhbmRvIF07XG5cdFx0cmV0dXJuIGNhY2hlICE9PSB1bmRlZmluZWQgJiYgIWpRdWVyeS5pc0VtcHR5T2JqZWN0KCBjYWNoZSApO1xuXHR9XG59O1xuXG5yZXR1cm4gRGF0YTtcbn0gKTtcbiJdfQ==