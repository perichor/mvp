"use strict";

define(["./core", "./var/document", "./var/documentElement", "./var/hasOwn", "./var/indexOf"], function (jQuery, document, documentElement, hasOwn, indexOf) {

	"use strict";

	/*
  * Optional (non-Sizzle) selector module for custom builds.
  *
  * Note that this DOES NOT SUPPORT many documented jQuery
  * features in exchange for its smaller size:
  *
  * Attribute not equal selector
  * Positional selectors (:first; :eq(n); :odd; etc.)
  * Type selectors (:input; :checkbox; :button; etc.)
  * State-based selectors (:animated; :visible; :hidden; etc.)
  * :has(selector)
  * :not(complex selector)
  * custom selectors via Sizzle extensions
  * Leading combinators (e.g., $collection.find("> *"))
  * Reliable functionality on XML fragments
  * Requiring all parts of a selector to match elements under context
  *   (e.g., $div.find("div > *") now matches children of $div)
  * Matching against non-elements
  * Reliable sorting of disconnected nodes
  * querySelectorAll bug fixes (e.g., unreliable :focus on WebKit)
  *
  * If any of these are unacceptable tradeoffs, either use Sizzle or
  * customize this stub for the project's specific needs.
  */

	var hasDuplicate,
	    sortInput,
	    sortStable = jQuery.expando.split("").sort(sortOrder).join("") === jQuery.expando,
	    matches = documentElement.matches || documentElement.webkitMatchesSelector || documentElement.mozMatchesSelector || documentElement.oMatchesSelector || documentElement.msMatchesSelector,


	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
	    fcssescape = function fcssescape(ch, asCodePoint) {
		if (asCodePoint) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if (ch === "\0") {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	};

	function sortOrder(a, b) {

		// Flag for duplicate removal
		if (a === b) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if (compare) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

		// Otherwise we know they are disconnected
		1;

		// Disconnected nodes
		if (compare & 1) {

			// Choose the first element that is related to our preferred document
			if (a === document || a.ownerDocument === document && jQuery.contains(document, a)) {
				return -1;
			}
			if (b === document || b.ownerDocument === document && jQuery.contains(document, b)) {
				return 1;
			}

			// Maintain original order
			return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
		}

		return compare & 4 ? -1 : 1;
	}

	function uniqueSort(results) {
		var elem,
		    duplicates = [],
		    j = 0,
		    i = 0;

		hasDuplicate = false;
		sortInput = !sortStable && results.slice(0);
		results.sort(sortOrder);

		if (hasDuplicate) {
			while (elem = results[i++]) {
				if (elem === results[i]) {
					j = duplicates.push(i);
				}
			}
			while (j--) {
				results.splice(duplicates[j], 1);
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	}

	function escape(sel) {
		return (sel + "").replace(rcssescape, fcssescape);
	}

	jQuery.extend({
		uniqueSort: uniqueSort,
		unique: uniqueSort,
		escapeSelector: escape,
		find: function find(selector, context, results, seed) {
			var elem,
			    nodeType,
			    i = 0;

			results = results || [];
			context = context || document;

			// Same basic safeguard as Sizzle
			if (!selector || typeof selector !== "string") {
				return results;
			}

			// Early return if context is not an element or document
			if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
				return [];
			}

			if (seed) {
				while (elem = seed[i++]) {
					if (jQuery.find.matchesSelector(elem, selector)) {
						results.push(elem);
					}
				}
			} else {
				jQuery.merge(results, context.querySelectorAll(selector));
			}

			return results;
		},
		text: function text(elem) {
			var node,
			    ret = "",
			    i = 0,
			    nodeType = elem.nodeType;

			if (!nodeType) {

				// If no nodeType, this is expected to be an array
				while (node = elem[i++]) {

					// Do not traverse comment nodes
					ret += jQuery.text(node);
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {

				// Use textContent for elements
				return elem.textContent;
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue;
			}

			// Do not include comment or processing instruction nodes

			return ret;
		},
		contains: function contains(a, b) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
			    bup = b && b.parentNode;
			return a === bup || !!(bup && bup.nodeType === 1 && adown.contains(bup));
		},
		isXMLDoc: function isXMLDoc(elem) {

			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		},
		expr: {
			attrHandle: {},
			match: {
				bool: new RegExp("^(?:checked|selected|async|autofocus|autoplay|controls|defer" + "|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$", "i"),
				needsContext: /^[\x20\t\r\n\f]*[>+~]/
			}
		}
	});

	jQuery.extend(jQuery.find, {
		matches: function matches(expr, elements) {
			return jQuery.find(expr, null, null, elements);
		},
		matchesSelector: function matchesSelector(elem, expr) {
			return matches.call(elem, expr);
		},
		attr: function attr(elem, name) {
			var fn = jQuery.expr.attrHandle[name.toLowerCase()],


			// Don't get fooled by Object.prototype properties (jQuery #13807)
			value = fn && hasOwn.call(jQuery.expr.attrHandle, name.toLowerCase()) ? fn(elem, name, jQuery.isXMLDoc(elem)) : undefined;
			return value !== undefined ? value : elem.getAttribute(name);
		}
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9zZWxlY3Rvci1uYXRpdmUuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwialF1ZXJ5IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJoYXNPd24iLCJpbmRleE9mIiwiaGFzRHVwbGljYXRlIiwic29ydElucHV0Iiwic29ydFN0YWJsZSIsImV4cGFuZG8iLCJzcGxpdCIsInNvcnQiLCJzb3J0T3JkZXIiLCJqb2luIiwibWF0Y2hlcyIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsIm1vek1hdGNoZXNTZWxlY3RvciIsIm9NYXRjaGVzU2VsZWN0b3IiLCJtc01hdGNoZXNTZWxlY3RvciIsInJjc3Nlc2NhcGUiLCJmY3NzZXNjYXBlIiwiY2giLCJhc0NvZGVQb2ludCIsInNsaWNlIiwiY2hhckNvZGVBdCIsImxlbmd0aCIsInRvU3RyaW5nIiwiYSIsImIiLCJjb21wYXJlIiwiY29tcGFyZURvY3VtZW50UG9zaXRpb24iLCJvd25lckRvY3VtZW50IiwiY29udGFpbnMiLCJjYWxsIiwidW5pcXVlU29ydCIsInJlc3VsdHMiLCJlbGVtIiwiZHVwbGljYXRlcyIsImoiLCJpIiwicHVzaCIsInNwbGljZSIsImVzY2FwZSIsInNlbCIsInJlcGxhY2UiLCJleHRlbmQiLCJ1bmlxdWUiLCJlc2NhcGVTZWxlY3RvciIsImZpbmQiLCJzZWxlY3RvciIsImNvbnRleHQiLCJzZWVkIiwibm9kZVR5cGUiLCJtYXRjaGVzU2VsZWN0b3IiLCJtZXJnZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0ZXh0Iiwibm9kZSIsInJldCIsInRleHRDb250ZW50Iiwibm9kZVZhbHVlIiwiYWRvd24iLCJidXAiLCJwYXJlbnROb2RlIiwiaXNYTUxEb2MiLCJub2RlTmFtZSIsImV4cHIiLCJhdHRySGFuZGxlIiwibWF0Y2giLCJib29sIiwiUmVnRXhwIiwibmVlZHNDb250ZXh0IiwiZWxlbWVudHMiLCJhdHRyIiwibmFtZSIsImZu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SzFFLE9BQU9pRSxJQUFQLENBQVlDLFVBQVosQ0FBd0JPLEtBQUtFLFdBQUwsRUFBeEIsQ0FBVDs7O0FBRUM7QUFDQUMsV0FBUUYsTUFBTXZFLE9BQU82QixJQUFQLENBQWFoQyxPQUFPaUUsSUFBUCxDQUFZQyxVQUF6QixFQUFxQ08sS0FBS0UsV0FBTCxFQUFyQyxDQUFOLEdBQ1BELEdBQUl2QyxJQUFKLEVBQVVzQyxJQUFWLEVBQWdCekUsT0FBTytELFFBQVAsQ0FBaUI1QixJQUFqQixDQUFoQixDQURPLEdBRVAwQyxTQUxGO0FBTUEsVUFBT0QsVUFBVUMsU0FBVixHQUFzQkQsS0FBdEIsR0FBOEJ6QyxLQUFLMkMsWUFBTCxDQUFtQkwsSUFBbkIsQ0FBckM7QUFDQTtBQWYwQixFQUE1QjtBQWtCQyxDQTVPRCIsImZpbGUiOiJzZWxlY3Rvci1uYXRpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuL2NvcmVcIixcblx0XCIuL3Zhci9kb2N1bWVudFwiLFxuXHRcIi4vdmFyL2RvY3VtZW50RWxlbWVudFwiLFxuXHRcIi4vdmFyL2hhc093blwiLFxuXHRcIi4vdmFyL2luZGV4T2ZcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgZG9jdW1lbnQsIGRvY3VtZW50RWxlbWVudCwgaGFzT3duLCBpbmRleE9mICkge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLypcbiAqIE9wdGlvbmFsIChub24tU2l6emxlKSBzZWxlY3RvciBtb2R1bGUgZm9yIGN1c3RvbSBidWlsZHMuXG4gKlxuICogTm90ZSB0aGF0IHRoaXMgRE9FUyBOT1QgU1VQUE9SVCBtYW55IGRvY3VtZW50ZWQgalF1ZXJ5XG4gKiBmZWF0dXJlcyBpbiBleGNoYW5nZSBmb3IgaXRzIHNtYWxsZXIgc2l6ZTpcbiAqXG4gKiBBdHRyaWJ1dGUgbm90IGVxdWFsIHNlbGVjdG9yXG4gKiBQb3NpdGlvbmFsIHNlbGVjdG9ycyAoOmZpcnN0OyA6ZXEobik7IDpvZGQ7IGV0Yy4pXG4gKiBUeXBlIHNlbGVjdG9ycyAoOmlucHV0OyA6Y2hlY2tib3g7IDpidXR0b247IGV0Yy4pXG4gKiBTdGF0ZS1iYXNlZCBzZWxlY3RvcnMgKDphbmltYXRlZDsgOnZpc2libGU7IDpoaWRkZW47IGV0Yy4pXG4gKiA6aGFzKHNlbGVjdG9yKVxuICogOm5vdChjb21wbGV4IHNlbGVjdG9yKVxuICogY3VzdG9tIHNlbGVjdG9ycyB2aWEgU2l6emxlIGV4dGVuc2lvbnNcbiAqIExlYWRpbmcgY29tYmluYXRvcnMgKGUuZy4sICRjb2xsZWN0aW9uLmZpbmQoXCI+ICpcIikpXG4gKiBSZWxpYWJsZSBmdW5jdGlvbmFsaXR5IG9uIFhNTCBmcmFnbWVudHNcbiAqIFJlcXVpcmluZyBhbGwgcGFydHMgb2YgYSBzZWxlY3RvciB0byBtYXRjaCBlbGVtZW50cyB1bmRlciBjb250ZXh0XG4gKiAgIChlLmcuLCAkZGl2LmZpbmQoXCJkaXYgPiAqXCIpIG5vdyBtYXRjaGVzIGNoaWxkcmVuIG9mICRkaXYpXG4gKiBNYXRjaGluZyBhZ2FpbnN0IG5vbi1lbGVtZW50c1xuICogUmVsaWFibGUgc29ydGluZyBvZiBkaXNjb25uZWN0ZWQgbm9kZXNcbiAqIHF1ZXJ5U2VsZWN0b3JBbGwgYnVnIGZpeGVzIChlLmcuLCB1bnJlbGlhYmxlIDpmb2N1cyBvbiBXZWJLaXQpXG4gKlxuICogSWYgYW55IG9mIHRoZXNlIGFyZSB1bmFjY2VwdGFibGUgdHJhZGVvZmZzLCBlaXRoZXIgdXNlIFNpenpsZSBvclxuICogY3VzdG9taXplIHRoaXMgc3R1YiBmb3IgdGhlIHByb2plY3QncyBzcGVjaWZpYyBuZWVkcy5cbiAqL1xuXG52YXIgaGFzRHVwbGljYXRlLCBzb3J0SW5wdXQsXG5cdHNvcnRTdGFibGUgPSBqUXVlcnkuZXhwYW5kby5zcGxpdCggXCJcIiApLnNvcnQoIHNvcnRPcmRlciApLmpvaW4oIFwiXCIgKSA9PT0galF1ZXJ5LmV4cGFuZG8sXG5cdG1hdGNoZXMgPSBkb2N1bWVudEVsZW1lbnQubWF0Y2hlcyB8fFxuXHRcdGRvY3VtZW50RWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2N1bWVudEVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jdW1lbnRFbGVtZW50Lm9NYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRkb2N1bWVudEVsZW1lbnQubXNNYXRjaGVzU2VsZWN0b3IsXG5cblx0Ly8gQ1NTIHN0cmluZy9pZGVudGlmaWVyIHNlcmlhbGl6YXRpb25cblx0Ly8gaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzc29tLyNjb21tb24tc2VyaWFsaXppbmctaWRpb21zXG5cdHJjc3Nlc2NhcGUgPSAvKFtcXDAtXFx4MWZcXHg3Zl18Xi0/XFxkKXxeLSR8W15cXHg4MC1cXHVGRkZGXFx3LV0vZyxcblx0ZmNzc2VzY2FwZSA9IGZ1bmN0aW9uKCBjaCwgYXNDb2RlUG9pbnQgKSB7XG5cdFx0aWYgKCBhc0NvZGVQb2ludCApIHtcblxuXHRcdFx0Ly8gVSswMDAwIE5VTEwgYmVjb21lcyBVK0ZGRkQgUkVQTEFDRU1FTlQgQ0hBUkFDVEVSXG5cdFx0XHRpZiAoIGNoID09PSBcIlxcMFwiICkge1xuXHRcdFx0XHRyZXR1cm4gXCJcXHVGRkZEXCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbnRyb2wgY2hhcmFjdGVycyBhbmQgKGRlcGVuZGVudCB1cG9uIHBvc2l0aW9uKSBudW1iZXJzIGdldCBlc2NhcGVkIGFzIGNvZGUgcG9pbnRzXG5cdFx0XHRyZXR1cm4gY2guc2xpY2UoIDAsIC0xICkgKyBcIlxcXFxcIiArIGNoLmNoYXJDb2RlQXQoIGNoLmxlbmd0aCAtIDEgKS50b1N0cmluZyggMTYgKSArIFwiIFwiO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyIHBvdGVudGlhbGx5LXNwZWNpYWwgQVNDSUkgY2hhcmFjdGVycyBnZXQgYmFja3NsYXNoLWVzY2FwZWRcblx0XHRyZXR1cm4gXCJcXFxcXCIgKyBjaDtcblx0fTtcblxuZnVuY3Rpb24gc29ydE9yZGVyKCBhLCBiICkge1xuXG5cdC8vIEZsYWcgZm9yIGR1cGxpY2F0ZSByZW1vdmFsXG5cdGlmICggYSA9PT0gYiApIHtcblx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0Ly8gU29ydCBvbiBtZXRob2QgZXhpc3RlbmNlIGlmIG9ubHkgb25lIGlucHV0IGhhcyBjb21wYXJlRG9jdW1lbnRQb3NpdGlvblxuXHR2YXIgY29tcGFyZSA9ICFhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIC0gIWIuY29tcGFyZURvY3VtZW50UG9zaXRpb247XG5cdGlmICggY29tcGFyZSApIHtcblx0XHRyZXR1cm4gY29tcGFyZTtcblx0fVxuXG5cdC8vIENhbGN1bGF0ZSBwb3NpdGlvbiBpZiBib3RoIGlucHV0cyBiZWxvbmcgdG8gdGhlIHNhbWUgZG9jdW1lbnRcblx0Y29tcGFyZSA9ICggYS5vd25lckRvY3VtZW50IHx8IGEgKSA9PT0gKCBiLm93bmVyRG9jdW1lbnQgfHwgYiApID9cblx0XHRhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBiICkgOlxuXG5cdFx0Ly8gT3RoZXJ3aXNlIHdlIGtub3cgdGhleSBhcmUgZGlzY29ubmVjdGVkXG5cdFx0MTtcblxuXHQvLyBEaXNjb25uZWN0ZWQgbm9kZXNcblx0aWYgKCBjb21wYXJlICYgMSApIHtcblxuXHRcdC8vIENob29zZSB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIHJlbGF0ZWQgdG8gb3VyIHByZWZlcnJlZCBkb2N1bWVudFxuXHRcdGlmICggYSA9PT0gZG9jdW1lbnQgfHwgYS5vd25lckRvY3VtZW50ID09PSBkb2N1bWVudCAmJlxuXHRcdFx0alF1ZXJ5LmNvbnRhaW5zKCBkb2N1bWVudCwgYSApICkge1xuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH1cblx0XHRpZiAoIGIgPT09IGRvY3VtZW50IHx8IGIub3duZXJEb2N1bWVudCA9PT0gZG9jdW1lbnQgJiZcblx0XHRcdGpRdWVyeS5jb250YWlucyggZG9jdW1lbnQsIGIgKSApIHtcblx0XHRcdHJldHVybiAxO1xuXHRcdH1cblxuXHRcdC8vIE1haW50YWluIG9yaWdpbmFsIG9yZGVyXG5cdFx0cmV0dXJuIHNvcnRJbnB1dCA/XG5cdFx0XHQoIGluZGV4T2YuY2FsbCggc29ydElucHV0LCBhICkgLSBpbmRleE9mLmNhbGwoIHNvcnRJbnB1dCwgYiApICkgOlxuXHRcdFx0MDtcblx0fVxuXG5cdHJldHVybiBjb21wYXJlICYgNCA/IC0xIDogMTtcbn1cblxuZnVuY3Rpb24gdW5pcXVlU29ydCggcmVzdWx0cyApIHtcblx0dmFyIGVsZW0sXG5cdFx0ZHVwbGljYXRlcyA9IFtdLFxuXHRcdGogPSAwLFxuXHRcdGkgPSAwO1xuXG5cdGhhc0R1cGxpY2F0ZSA9IGZhbHNlO1xuXHRzb3J0SW5wdXQgPSAhc29ydFN0YWJsZSAmJiByZXN1bHRzLnNsaWNlKCAwICk7XG5cdHJlc3VsdHMuc29ydCggc29ydE9yZGVyICk7XG5cblx0aWYgKCBoYXNEdXBsaWNhdGUgKSB7XG5cdFx0d2hpbGUgKCAoIGVsZW0gPSByZXN1bHRzWyBpKysgXSApICkge1xuXHRcdFx0aWYgKCBlbGVtID09PSByZXN1bHRzWyBpIF0gKSB7XG5cdFx0XHRcdGogPSBkdXBsaWNhdGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRyZXN1bHRzLnNwbGljZSggZHVwbGljYXRlc1sgaiBdLCAxICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2xlYXIgaW5wdXQgYWZ0ZXIgc29ydGluZyB0byByZWxlYXNlIG9iamVjdHNcblx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvc2l6emxlL3B1bGwvMjI1XG5cdHNvcnRJbnB1dCA9IG51bGw7XG5cblx0cmV0dXJuIHJlc3VsdHM7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZSggc2VsICkge1xuXHRyZXR1cm4gKCBzZWwgKyBcIlwiICkucmVwbGFjZSggcmNzc2VzY2FwZSwgZmNzc2VzY2FwZSApO1xufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdHVuaXF1ZVNvcnQ6IHVuaXF1ZVNvcnQsXG5cdHVuaXF1ZTogdW5pcXVlU29ydCxcblx0ZXNjYXBlU2VsZWN0b3I6IGVzY2FwZSxcblx0ZmluZDogZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuXHRcdHZhciBlbGVtLCBub2RlVHlwZSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cdFx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cblx0XHQvLyBTYW1lIGJhc2ljIHNhZmVndWFyZCBhcyBTaXp6bGVcblx0XHRpZiAoICFzZWxlY3RvciB8fCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHR9XG5cblx0XHQvLyBFYXJseSByZXR1cm4gaWYgY29udGV4dCBpcyBub3QgYW4gZWxlbWVudCBvciBkb2N1bWVudFxuXHRcdGlmICggKCBub2RlVHlwZSA9IGNvbnRleHQubm9kZVR5cGUgKSAhPT0gMSAmJiBub2RlVHlwZSAhPT0gOSApIHtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9XG5cblx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHR3aGlsZSAoICggZWxlbSA9IHNlZWRbIGkrKyBdICkgKSB7XG5cdFx0XHRcdGlmICggalF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBzZWxlY3RvciApICkge1xuXHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGpRdWVyeS5tZXJnZSggcmVzdWx0cywgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCBzZWxlY3RvciApICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdHM7XG5cdH0sXG5cdHRleHQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBub2RlLFxuXHRcdFx0cmV0ID0gXCJcIixcblx0XHRcdGkgPSAwLFxuXHRcdFx0bm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdFx0aWYgKCAhbm9kZVR5cGUgKSB7XG5cblx0XHRcdC8vIElmIG5vIG5vZGVUeXBlLCB0aGlzIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGFycmF5XG5cdFx0XHR3aGlsZSAoICggbm9kZSA9IGVsZW1bIGkrKyBdICkgKSB7XG5cblx0XHRcdFx0Ly8gRG8gbm90IHRyYXZlcnNlIGNvbW1lbnQgbm9kZXNcblx0XHRcdFx0cmV0ICs9IGpRdWVyeS50ZXh0KCBub2RlICk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDEgfHwgbm9kZVR5cGUgPT09IDkgfHwgbm9kZVR5cGUgPT09IDExICkge1xuXG5cdFx0XHQvLyBVc2UgdGV4dENvbnRlbnQgZm9yIGVsZW1lbnRzXG5cdFx0XHRyZXR1cm4gZWxlbS50ZXh0Q29udGVudDtcblx0XHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCApIHtcblx0XHRcdHJldHVybiBlbGVtLm5vZGVWYWx1ZTtcblx0XHR9XG5cblx0XHQvLyBEbyBub3QgaW5jbHVkZSBjb21tZW50IG9yIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb24gbm9kZXNcblxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cdGNvbnRhaW5zOiBmdW5jdGlvbiggYSwgYiApIHtcblx0XHR2YXIgYWRvd24gPSBhLm5vZGVUeXBlID09PSA5ID8gYS5kb2N1bWVudEVsZW1lbnQgOiBhLFxuXHRcdFx0YnVwID0gYiAmJiBiLnBhcmVudE5vZGU7XG5cdFx0cmV0dXJuIGEgPT09IGJ1cCB8fCAhISggYnVwICYmIGJ1cC5ub2RlVHlwZSA9PT0gMSAmJiBhZG93bi5jb250YWlucyggYnVwICkgKTtcblx0fSxcblx0aXNYTUxEb2M6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0Ly8gZG9jdW1lbnRFbGVtZW50IGlzIHZlcmlmaWVkIGZvciBjYXNlcyB3aGVyZSBpdCBkb2Vzbid0IHlldCBleGlzdFxuXHRcdC8vIChzdWNoIGFzIGxvYWRpbmcgaWZyYW1lcyBpbiBJRSAtICM0ODMzKVxuXHRcdHZhciBkb2N1bWVudEVsZW1lbnQgPSBlbGVtICYmICggZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0gKS5kb2N1bWVudEVsZW1lbnQ7XG5cdFx0cmV0dXJuIGRvY3VtZW50RWxlbWVudCA/IGRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIgOiBmYWxzZTtcblx0fSxcblx0ZXhwcjoge1xuXHRcdGF0dHJIYW5kbGU6IHt9LFxuXHRcdG1hdGNoOiB7XG5cdFx0XHRib29sOiBuZXcgUmVnRXhwKCBcIl4oPzpjaGVja2VkfHNlbGVjdGVkfGFzeW5jfGF1dG9mb2N1c3xhdXRvcGxheXxjb250cm9sc3xkZWZlclwiICtcblx0XHRcdFx0XCJ8ZGlzYWJsZWR8aGlkZGVufGlzbWFwfGxvb3B8bXVsdGlwbGV8b3BlbnxyZWFkb25seXxyZXF1aXJlZHxzY29wZWQpJFwiLCBcImlcIiApLFxuXHRcdFx0bmVlZHNDb250ZXh0OiAvXltcXHgyMFxcdFxcclxcblxcZl0qWz4rfl0vXG5cdFx0fVxuXHR9XG59ICk7XG5cbmpRdWVyeS5leHRlbmQoIGpRdWVyeS5maW5kLCB7XG5cdG1hdGNoZXM6IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmZpbmQoIGV4cHIsIG51bGwsIG51bGwsIGVsZW1lbnRzICk7XG5cdH0sXG5cdG1hdGNoZXNTZWxlY3RvcjogZnVuY3Rpb24oIGVsZW0sIGV4cHIgKSB7XG5cdFx0cmV0dXJuIG1hdGNoZXMuY2FsbCggZWxlbSwgZXhwciApO1xuXHR9LFxuXHRhdHRyOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHR2YXIgZm4gPSBqUXVlcnkuZXhwci5hdHRySGFuZGxlWyBuYW1lLnRvTG93ZXJDYXNlKCkgXSxcblxuXHRcdFx0Ly8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKGpRdWVyeSAjMTM4MDcpXG5cdFx0XHR2YWx1ZSA9IGZuICYmIGhhc093bi5jYWxsKCBqUXVlcnkuZXhwci5hdHRySGFuZGxlLCBuYW1lLnRvTG93ZXJDYXNlKCkgKSA/XG5cdFx0XHRcdGZuKCBlbGVtLCBuYW1lLCBqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIDpcblx0XHRcdFx0dW5kZWZpbmVkO1xuXHRcdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApO1xuXHR9XG59ICk7XG5cbn0gKTtcbiJdfQ==