"use strict";

define(["../core", "../var/indexOf", "./var/rneedsContext", "../selector"], function (jQuery, indexOf, rneedsContext) {

	"use strict";

	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}

		// Single element
		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return elem === qualifier !== not;
			});
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if (typeof qualifier !== "string") {
			return jQuery.grep(elements, function (elem) {
				return indexOf.call(qualifier, elem) > -1 !== not;
			});
		}

		// Simple selector that can be filtered directly, removing non-Elements
		if (risSimple.test(qualifier)) {
			return jQuery.filter(qualifier, elements, not);
		}

		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter(qualifier, elements);
		return jQuery.grep(elements, function (elem) {
			return indexOf.call(qualifier, elem) > -1 !== not && elem.nodeType === 1;
		});
	}

	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];

		if (not) {
			expr = ":not(" + expr + ")";
		}

		if (elems.length === 1 && elem.nodeType === 1) {
			return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
		}

		return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
			return elem.nodeType === 1;
		}));
	};

	jQuery.fn.extend({
		find: function find(selector) {
			var i,
			    ret,
			    len = this.length,
			    self = this;

			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			ret = this.pushStack([]);

			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}

			return len > 1 ? jQuery.uniqueSort(ret) : ret;
		},
		filter: function filter(selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function not(selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function is(selector) {
			return !!winnow(this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
		}
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy90cmF2ZXJzaW5nL2ZpbmRGaWx0ZXIuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwialF1ZXJ5IiwiaW5kZXhPZiIsInJuZWVkc0NvbnRleHQiLCJyaXNTaW1wbGUiLCJ3aW5ub3ciLCJlbGVtZW50cyIsInF1YWxpZmllciIsIm5vdCIsImlzRnVuY3Rpb24iLCJncmVwIiwiZWxlbSIsImkiLCJjYWxsIiwibm9kZVR5cGUiLCJ0ZXN0IiwiZmlsdGVyIiwiZXhwciIsImVsZW1zIiwibGVuZ3RoIiwiZmluZCIsIm1hdGNoZXNTZWxlY3RvciIsIm1hdGNoZXMiLCJmbiIsImV4dGVuZCIsInNlbGVjdG9yIiwicmV0IiwibGVuIiwic2VsZiIsInB1c2hTdGFjayIsImNvbnRhaW5zIiwidW5pcXVlU29ydCIsImlzIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFRLENBQ1AsU0FETyxFQUVQLGdCQUZPLEVBR1AscUJBSE8sRUFJUCxhQUpPLENBQVIsRUFLRyxVQUFVQyxNQUFWLEVBQWtCQyxPQUFsQixFQUEyQkMsYUFBM0IsRUFBMkM7O0FBRTlDOztBQUVBLEtBQUlDLFlBQVksZ0JBQWhCOztBQUVBO0FBQ0EsVUFBU0MsTUFBVCxDQUFpQkMsUUFBakIsRUFBMkJDLFNBQTNCLEVBQXNDQyxHQUF0QyxFQUE0QztBQUMzQyxNQUFLUCxPQUFPUSxVQUFQLENBQW1CRixTQUFuQixDQUFMLEVBQXNDO0FBQ3JDLFVBQU9OLE9BQU9TLElBQVAsQ0FBYUosUUFBYixFQUF1QixVQUFVSyxJQUFWLEVBQWdCQyxDQUFoQixFQUFvQjtBQUNqRCxXQUFPLENBQUMsQ0FBQ0wsVUFBVU0sSUFBVixDQUFnQkYsSUFBaEIsRUFBc0JDLENBQXRCLEVBQXlCRCxJQUF6QixDQUFGLEtBQXNDSCxHQUE3QztBQUNBLElBRk0sQ0FBUDtBQUdBOztBQUVEO0FBQ0EsTUFBS0QsVUFBVU8sUUFBZixFQUEwQjtBQUN6QixVQUFPYixPQUFP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QUFPOEIsVUFBUCxDQUFtQkwsR0FBbkIsQ0FBVixHQUFxQ0EsR0FBNUM7QUFDQSxHQXZCZ0I7QUF3QmpCVixVQUFRLGdCQUFVUyxRQUFWLEVBQXFCO0FBQzVCLFVBQU8sS0FBS0ksU0FBTCxDQUFnQnhCLE9BQVEsSUFBUixFQUFjb0IsWUFBWSxFQUExQixFQUE4QixLQUE5QixDQUFoQixDQUFQO0FBQ0EsR0ExQmdCO0FBMkJqQmpCLE9BQUssYUFBVWlCLFFBQVYsRUFBcUI7QUFDekIsVUFBTyxLQUFLSSxTQUFMLENBQWdCeEIsT0FBUSxJQUFSLEVBQWNvQixZQUFZLEVBQTFCLEVBQThCLElBQTlCLENBQWhCLENBQVA7QUFDQSxHQTdCZ0I7QUE4QmpCTyxNQUFJLFlBQVVQLFFBQVYsRUFBcUI7QUFDeEIsVUFBTyxDQUFDLENBQUNwQixPQUNSLElBRFE7O0FBR1I7QUFDQTtBQUNBLFVBQU9vQixRQUFQLEtBQW9CLFFBQXBCLElBQWdDdEIsY0FBY1ksSUFBZCxDQUFvQlUsUUFBcEIsQ0FBaEMsR0FDQ3hCLE9BQVF3QixRQUFSLENBREQsR0FFQ0EsWUFBWSxFQVBMLEVBUVIsS0FSUSxFQVNQTixNQVRGO0FBVUE7QUF6Q2dCLEVBQWxCO0FBNENDLENBekdEIiwiZmlsZSI6ImZpbmRGaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuLi9jb3JlXCIsXG5cdFwiLi4vdmFyL2luZGV4T2ZcIixcblx0XCIuL3Zhci9ybmVlZHNDb250ZXh0XCIsXG5cdFwiLi4vc2VsZWN0b3JcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgaW5kZXhPZiwgcm5lZWRzQ29udGV4dCApIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciByaXNTaW1wbGUgPSAvXi5bXjojXFxbXFwuLF0qJC87XG5cbi8vIEltcGxlbWVudCB0aGUgaWRlbnRpY2FsIGZ1bmN0aW9uYWxpdHkgZm9yIGZpbHRlciBhbmQgbm90XG5mdW5jdGlvbiB3aW5ub3coIGVsZW1lbnRzLCBxdWFsaWZpZXIsIG5vdCApIHtcblx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcXVhbGlmaWVyICkgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG5cdFx0XHRyZXR1cm4gISFxdWFsaWZpZXIuY2FsbCggZWxlbSwgaSwgZWxlbSApICE9PSBub3Q7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gU2luZ2xlIGVsZW1lbnRcblx0aWYgKCBxdWFsaWZpZXIubm9kZVR5cGUgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCBlbGVtID09PSBxdWFsaWZpZXIgKSAhPT0gbm90O1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIEFycmF5bGlrZSBvZiBlbGVtZW50cyAoalF1ZXJ5LCBhcmd1bWVudHMsIEFycmF5KVxuXHRpZiAoIHR5cGVvZiBxdWFsaWZpZXIgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCBpbmRleE9mLmNhbGwoIHF1YWxpZmllciwgZWxlbSApID4gLTEgKSAhPT0gbm90O1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIFNpbXBsZSBzZWxlY3RvciB0aGF0IGNhbiBiZSBmaWx0ZXJlZCBkaXJlY3RseSwgcmVtb3Zpbmcgbm9uLUVsZW1lbnRzXG5cdGlmICggcmlzU2ltcGxlLnRlc3QoIHF1YWxpZmllciApICkge1xuXHRcdHJldHVybiBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGVsZW1lbnRzLCBub3QgKTtcblx0fVxuXG5cdC8vIENvbXBsZXggc2VsZWN0b3IsIGNvbXBhcmUgdGhlIHR3byBzZXRzLCByZW1vdmluZyBub24tRWxlbWVudHNcblx0cXVhbGlmaWVyID0galF1ZXJ5LmZpbHRlciggcXVhbGlmaWVyLCBlbGVtZW50cyApO1xuXHRyZXR1cm4galF1ZXJ5LmdyZXAoIGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gKCBpbmRleE9mLmNhbGwoIHF1YWxpZmllciwgZWxlbSApID4gLTEgKSAhPT0gbm90ICYmIGVsZW0ubm9kZVR5cGUgPT09IDE7XG5cdH0gKTtcbn1cblxualF1ZXJ5LmZpbHRlciA9IGZ1bmN0aW9uKCBleHByLCBlbGVtcywgbm90ICkge1xuXHR2YXIgZWxlbSA9IGVsZW1zWyAwIF07XG5cblx0aWYgKCBub3QgKSB7XG5cdFx0ZXhwciA9IFwiOm5vdChcIiArIGV4cHIgKyBcIilcIjtcblx0fVxuXG5cdGlmICggZWxlbXMubGVuZ3RoID09PSAxICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggZWxlbSwgZXhwciApID8gWyBlbGVtIF0gOiBbXTtcblx0fVxuXG5cdHJldHVybiBqUXVlcnkuZmluZC5tYXRjaGVzKCBleHByLCBqUXVlcnkuZ3JlcCggZWxlbXMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBlbGVtLm5vZGVUeXBlID09PSAxO1xuXHR9ICkgKTtcbn07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0ZmluZDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHZhciBpLCByZXQsXG5cdFx0XHRsZW4gPSB0aGlzLmxlbmd0aCxcblx0XHRcdHNlbGYgPSB0aGlzO1xuXG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIGpRdWVyeSggc2VsZWN0b3IgKS5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRcdGlmICggalF1ZXJ5LmNvbnRhaW5zKCBzZWxmWyBpIF0sIHRoaXMgKSApIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSApICk7XG5cdFx0fVxuXG5cdFx0cmV0ID0gdGhpcy5wdXNoU3RhY2soIFtdICk7XG5cblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0alF1ZXJ5LmZpbmQoIHNlbGVjdG9yLCBzZWxmWyBpIF0sIHJldCApO1xuXHRcdH1cblxuXHRcdHJldHVybiBsZW4gPiAxID8galF1ZXJ5LnVuaXF1ZVNvcnQoIHJldCApIDogcmV0O1xuXHR9LFxuXHRmaWx0ZXI6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyggdGhpcywgc2VsZWN0b3IgfHwgW10sIGZhbHNlICkgKTtcblx0fSxcblx0bm90OiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3coIHRoaXMsIHNlbGVjdG9yIHx8IFtdLCB0cnVlICkgKTtcblx0fSxcblx0aXM6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gISF3aW5ub3coXG5cdFx0XHR0aGlzLFxuXG5cdFx0XHQvLyBJZiB0aGlzIGlzIGEgcG9zaXRpb25hbC9yZWxhdGl2ZSBzZWxlY3RvciwgY2hlY2sgbWVtYmVyc2hpcCBpbiB0aGUgcmV0dXJuZWQgc2V0XG5cdFx0XHQvLyBzbyAkKFwicDpmaXJzdFwiKS5pcyhcInA6bGFzdFwiKSB3b24ndCByZXR1cm4gdHJ1ZSBmb3IgYSBkb2Mgd2l0aCB0d28gXCJwXCIuXG5cdFx0XHR0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgJiYgcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvciApID9cblx0XHRcdFx0alF1ZXJ5KCBzZWxlY3RvciApIDpcblx0XHRcdFx0c2VsZWN0b3IgfHwgW10sXG5cdFx0XHRmYWxzZVxuXHRcdCkubGVuZ3RoO1xuXHR9XG59ICk7XG5cbn0gKTtcbiJdfQ==