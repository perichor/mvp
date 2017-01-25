"use strict";

define(["./core", "./var/indexOf", "./traversing/var/dir", "./traversing/var/siblings", "./traversing/var/rneedsContext", "./core/init", "./traversing/findFilter", "./selector"], function (jQuery, indexOf, dir, _siblings, rneedsContext) {

	"use strict";

	var rparentsprev = /^(?:parents|prev(?:Until|All))/,


	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

	jQuery.fn.extend({
		has: function has(target) {
			var targets = jQuery(target, this),
			    l = targets.length;

			return this.filter(function () {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest: function closest(selectors, context) {
			var cur,
			    i = 0,
			    l = this.length,
			    matched = [],
			    targets = typeof selectors !== "string" && jQuery(selectors);

			// Positional selectors never match, since there's no _selection_ context
			if (!rneedsContext.test(selectors)) {
				for (; i < l; i++) {
					for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

						// Always skip document fragments
						if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

							matched.push(cur);
							break;
						}
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index: function index(elem) {

			// No argument, return index in parent
			if (!elem) {
				return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem);
		},

		add: function add(selector, context) {
			return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
		},

		addBack: function addBack(selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	jQuery.each({
		parent: function parent(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function parents(elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function parentsUntil(elem, i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function next(elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function prev(elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function nextAll(elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function prevAll(elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function nextUntil(elem, i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function prevUntil(elem, i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function siblings(elem) {
			return _siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function children(elem) {
			return _siblings(elem.firstChild);
		},
		contents: function contents(elem) {
			return elem.contentDocument || jQuery.merge([], elem.childNodes);
		}
	}, function (name, fn) {
		jQuery.fn[name] = function (until, selector) {
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until") {
				selector = until;
			}

			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {

				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy90cmF2ZXJzaW5nLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsImpRdWVyeSIsImluZGV4T2YiLCJkaXIiLCJzaWJsaW5ncyIsInJuZWVkc0NvbnRleHQiLCJycGFyZW50c3ByZXYiLCJndWFyYW50ZWVkVW5pcXVlIiwiY2hpbGRyZW4iLCJjb250ZW50cyIsIm5leHQiLCJwcmV2IiwiZm4iLCJleHRlbmQiLCJoYXMiLCJ0YXJnZXQiLCJ0YXJnZXRzIiwibCIsImxlbmd0aCIsImZpbHRlciIsImkiLCJjb250YWlucyIsImNsb3Nlc3QiLCJzZWxlY3RvcnMiLCJjb250ZXh0IiwiY3VyIiwibWF0Y2hlZCIsInRlc3QiLCJwYXJlbnROb2RlIiwibm9kZVR5cGUiLCJpbmRleCIsImZpbmQiLCJtYXRjaGVzU2VsZWN0b3IiLCJwdXNoIiwicHVzaFN0YWNrIiwidW5pcXVlU29ydCIsImVsZW0iLCJmaXJzdCIsInByZXZBbGwiLCJjYWxsIiwianF1ZXJ5IiwiYWRkIiwic2VsZWN0b3IiLCJtZXJnZSIsImdldCIsImFkZEJhY2siLCJwcmV2T2JqZWN0Iiwic2libGluZyIsImVhY2giLCJwYXJlbnQiLCJwYXJlbnRzIiwicGFyZW50c1VudGlsIiwidW50aWwiLCJuZXh0QWxsIiwibmV4dFVudGlsIiwicHJldlVudGlsIiwiZmlyc3RDaGlsZCIsImNvbnRlbnREb2N1bWVudCIsImNoaWxkTm9kZXMiLCJuYW1lIiwibWFwIiwic2xpY2UiLCJyZXZlcnNlIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFRLENBQ1AsUUFETyxFQUVQLGVBRk8sRUFHUCxzQkFITyxFQUlQLDJCQUpPLEVBS1AsZ0NBTE8sRUFNUCxhQU5PLEVBT1AseUJBUE8sRUFRUCxZQVJPLENBQVIsRUFTRyxVQUFVQyxNQUFWLEVBQWtCQyxPQUFsQixFQUEyQkMsR0FBM0IsRUFBZ0NDLFNBQWhDLEVBQTBDQyxhQUExQyxFQUEwRDs7QUFFN0Q7O0FB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Q0FBZDs7QUFFQSxPQUFLTyxLQUFLRSxLQUFMLENBQVksQ0FBQyxDQUFiLE1BQXFCLE9BQTFCLEVBQW9DO0FBQ25DbkIsZUFBV1UsS0FBWDtBQUNBOztBQUVELE9BQUtWLFlBQVksT0FBT0EsUUFBUCxLQUFvQixRQUFyQyxFQUFnRDtBQUMvQ2hCLGNBQVV6QixPQUFPa0IsTUFBUCxDQUFldUIsUUFBZixFQUF5QmhCLE9BQXpCLENBQVY7QUFDQTs7QUFFRCxPQUFLLEtBQUtSLE1BQUwsR0FBYyxDQUFuQixFQUF1Qjs7QUFFdEI7QUFDQSxRQUFLLENBQUNYLGlCQUFrQm9ELElBQWxCLENBQU4sRUFBaUM7QUFDaEMxRCxZQUFPa0MsVUFBUCxDQUFtQlQsT0FBbkI7QUFDQTs7QUFFRDtBQUNBLFFBQUtwQixhQUFhcUIsSUFBYixDQUFtQmdDLElBQW5CLENBQUwsRUFBaUM7QUFDaENqQyxhQUFRb0MsT0FBUjtBQUNBO0FBQ0Q7O0FBRUQsVUFBTyxLQUFLNUIsU0FBTCxDQUFnQlIsT0FBaEIsQ0FBUDtBQUNBLEdBekJEO0FBMEJBLEVBakVEOztBQW1FQSxRQUFPekIsTUFBUDtBQUNDLENBakxEIiwiZmlsZSI6InRyYXZlcnNpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuL2NvcmVcIixcblx0XCIuL3Zhci9pbmRleE9mXCIsXG5cdFwiLi90cmF2ZXJzaW5nL3Zhci9kaXJcIixcblx0XCIuL3RyYXZlcnNpbmcvdmFyL3NpYmxpbmdzXCIsXG5cdFwiLi90cmF2ZXJzaW5nL3Zhci9ybmVlZHNDb250ZXh0XCIsXG5cdFwiLi9jb3JlL2luaXRcIixcblx0XCIuL3RyYXZlcnNpbmcvZmluZEZpbHRlclwiLFxuXHRcIi4vc2VsZWN0b3JcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgaW5kZXhPZiwgZGlyLCBzaWJsaW5ncywgcm5lZWRzQ29udGV4dCApIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBycGFyZW50c3ByZXYgPSAvXig/OnBhcmVudHN8cHJldig/OlVudGlsfEFsbCkpLyxcblxuXHQvLyBNZXRob2RzIGd1YXJhbnRlZWQgdG8gcHJvZHVjZSBhIHVuaXF1ZSBzZXQgd2hlbiBzdGFydGluZyBmcm9tIGEgdW5pcXVlIHNldFxuXHRndWFyYW50ZWVkVW5pcXVlID0ge1xuXHRcdGNoaWxkcmVuOiB0cnVlLFxuXHRcdGNvbnRlbnRzOiB0cnVlLFxuXHRcdG5leHQ6IHRydWUsXG5cdFx0cHJldjogdHJ1ZVxuXHR9O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGhhczogZnVuY3Rpb24oIHRhcmdldCApIHtcblx0XHR2YXIgdGFyZ2V0cyA9IGpRdWVyeSggdGFyZ2V0LCB0aGlzICksXG5cdFx0XHRsID0gdGFyZ2V0cy5sZW5ndGg7XG5cblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGpRdWVyeS5jb250YWlucyggdGhpcywgdGFyZ2V0c1sgaSBdICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0Y2xvc2VzdDogZnVuY3Rpb24oIHNlbGVjdG9ycywgY29udGV4dCApIHtcblx0XHR2YXIgY3VyLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRtYXRjaGVkID0gW10sXG5cdFx0XHR0YXJnZXRzID0gdHlwZW9mIHNlbGVjdG9ycyAhPT0gXCJzdHJpbmdcIiAmJiBqUXVlcnkoIHNlbGVjdG9ycyApO1xuXG5cdFx0Ly8gUG9zaXRpb25hbCBzZWxlY3RvcnMgbmV2ZXIgbWF0Y2gsIHNpbmNlIHRoZXJlJ3Mgbm8gX3NlbGVjdGlvbl8gY29udGV4dFxuXHRcdGlmICggIXJuZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3JzICkgKSB7XG5cdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdGZvciAoIGN1ciA9IHRoaXNbIGkgXTsgY3VyICYmIGN1ciAhPT0gY29udGV4dDsgY3VyID0gY3VyLnBhcmVudE5vZGUgKSB7XG5cblx0XHRcdFx0XHQvLyBBbHdheXMgc2tpcCBkb2N1bWVudCBmcmFnbWVudHNcblx0XHRcdFx0XHRpZiAoIGN1ci5ub2RlVHlwZSA8IDExICYmICggdGFyZ2V0cyA/XG5cdFx0XHRcdFx0XHR0YXJnZXRzLmluZGV4KCBjdXIgKSA+IC0xIDpcblxuXHRcdFx0XHRcdFx0Ly8gRG9uJ3QgcGFzcyBub24tZWxlbWVudHMgdG8gU2l6emxlXG5cdFx0XHRcdFx0XHRjdXIubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdFx0XHRcdFx0alF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBjdXIsIHNlbGVjdG9ycyApICkgKSB7XG5cblx0XHRcdFx0XHRcdG1hdGNoZWQucHVzaCggY3VyICk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQubGVuZ3RoID4gMSA/IGpRdWVyeS51bmlxdWVTb3J0KCBtYXRjaGVkICkgOiBtYXRjaGVkICk7XG5cdH0sXG5cblx0Ly8gRGV0ZXJtaW5lIHRoZSBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IHdpdGhpbiB0aGUgc2V0XG5cdGluZGV4OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIE5vIGFyZ3VtZW50LCByZXR1cm4gaW5kZXggaW4gcGFyZW50XG5cdFx0aWYgKCAhZWxlbSApIHtcblx0XHRcdHJldHVybiAoIHRoaXNbIDAgXSAmJiB0aGlzWyAwIF0ucGFyZW50Tm9kZSApID8gdGhpcy5maXJzdCgpLnByZXZBbGwoKS5sZW5ndGggOiAtMTtcblx0XHR9XG5cblx0XHQvLyBJbmRleCBpbiBzZWxlY3RvclxuXHRcdGlmICggdHlwZW9mIGVsZW0gPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gaW5kZXhPZi5jYWxsKCBqUXVlcnkoIGVsZW0gKSwgdGhpc1sgMCBdICk7XG5cdFx0fVxuXG5cdFx0Ly8gTG9jYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZGVzaXJlZCBlbGVtZW50XG5cdFx0cmV0dXJuIGluZGV4T2YuY2FsbCggdGhpcyxcblxuXHRcdFx0Ly8gSWYgaXQgcmVjZWl2ZXMgYSBqUXVlcnkgb2JqZWN0LCB0aGUgZmlyc3QgZWxlbWVudCBpcyB1c2VkXG5cdFx0XHRlbGVtLmpxdWVyeSA/IGVsZW1bIDAgXSA6IGVsZW1cblx0XHQpO1xuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayhcblx0XHRcdGpRdWVyeS51bmlxdWVTb3J0KFxuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIHRoaXMuZ2V0KCksIGpRdWVyeSggc2VsZWN0b3IsIGNvbnRleHQgKSApXG5cdFx0XHQpXG5cdFx0KTtcblx0fSxcblxuXHRhZGRCYWNrOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMuYWRkKCBzZWxlY3RvciA9PSBudWxsID9cblx0XHRcdHRoaXMucHJldk9iamVjdCA6IHRoaXMucHJldk9iamVjdC5maWx0ZXIoIHNlbGVjdG9yIClcblx0XHQpO1xuXHR9XG59ICk7XG5cbmZ1bmN0aW9uIHNpYmxpbmcoIGN1ciwgZGlyICkge1xuXHR3aGlsZSAoICggY3VyID0gY3VyWyBkaXIgXSApICYmIGN1ci5ub2RlVHlwZSAhPT0gMSApIHt9XG5cdHJldHVybiBjdXI7XG59XG5cbmpRdWVyeS5lYWNoKCB7XG5cdHBhcmVudDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRyZXR1cm4gcGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gMTEgPyBwYXJlbnQgOiBudWxsO1xuXHR9LFxuXHRwYXJlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiApO1xuXHR9LFxuXHRwYXJlbnRzVW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiwgdW50aWwgKTtcblx0fSxcblx0bmV4dDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiApO1xuXHR9LFxuXHRwcmV2OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZyggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiApO1xuXHR9LFxuXHRuZXh0QWxsOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcblx0fSxcblx0cHJldkFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiApO1xuXHR9LFxuXHRuZXh0VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIsIHVudGlsICk7XG5cdH0sXG5cdHByZXZVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIsIHVudGlsICk7XG5cdH0sXG5cdHNpYmxpbmdzOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZ3MoICggZWxlbS5wYXJlbnROb2RlIHx8IHt9ICkuZmlyc3RDaGlsZCwgZWxlbSApO1xuXHR9LFxuXHRjaGlsZHJlbjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmdzKCBlbGVtLmZpcnN0Q2hpbGQgKTtcblx0fSxcblx0Y29udGVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBlbGVtLmNvbnRlbnREb2N1bWVudCB8fCBqUXVlcnkubWVyZ2UoIFtdLCBlbGVtLmNoaWxkTm9kZXMgKTtcblx0fVxufSwgZnVuY3Rpb24oIG5hbWUsIGZuICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCB1bnRpbCwgc2VsZWN0b3IgKSB7XG5cdFx0dmFyIG1hdGNoZWQgPSBqUXVlcnkubWFwKCB0aGlzLCBmbiwgdW50aWwgKTtcblxuXHRcdGlmICggbmFtZS5zbGljZSggLTUgKSAhPT0gXCJVbnRpbFwiICkge1xuXHRcdFx0c2VsZWN0b3IgPSB1bnRpbDtcblx0XHR9XG5cblx0XHRpZiAoIHNlbGVjdG9yICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdG1hdGNoZWQgPSBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgbWF0Y2hlZCApO1xuXHRcdH1cblxuXHRcdGlmICggdGhpcy5sZW5ndGggPiAxICkge1xuXG5cdFx0XHQvLyBSZW1vdmUgZHVwbGljYXRlc1xuXHRcdFx0aWYgKCAhZ3VhcmFudGVlZFVuaXF1ZVsgbmFtZSBdICkge1xuXHRcdFx0XHRqUXVlcnkudW5pcXVlU29ydCggbWF0Y2hlZCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXZlcnNlIG9yZGVyIGZvciBwYXJlbnRzKiBhbmQgcHJldi1kZXJpdmF0aXZlc1xuXHRcdFx0aWYgKCBycGFyZW50c3ByZXYudGVzdCggbmFtZSApICkge1xuXHRcdFx0XHRtYXRjaGVkLnJldmVyc2UoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQgKTtcblx0fTtcbn0gKTtcblxucmV0dXJuIGpRdWVyeTtcbn0gKTtcbiJdfQ==