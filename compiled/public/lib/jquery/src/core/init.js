"use strict";

// Initialize a jQuery object
define(["../core", "../var/document", "./var/rsingleTag", "../traversing/findFilter"], function (jQuery, document, rsingleTag) {

	"use strict";

	// A central reference to the root jQuery(document)

	var rootjQuery,


	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	    init = jQuery.fn.init = function (selector, context, root) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if (typeof selector === "string") {
			if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];
			} else {
				match = rquickExpr.exec(selector);
			}

			// Match html or make sure no context is specified for #id
			if (match && (match[1] || !context)) {

				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
						for (match in context) {

							// Properties of context are called as methods if possible
							if (jQuery.isFunction(this[match])) {
								this[match](context[match]);

								// ...and otherwise set as attributes
							} else {
								this.attr(match, context[match]);
							}
						}
					}

					return this;

					// HANDLE: $(#id)
				} else {
					elem = document.getElementById(match[2]);

					if (elem) {

						// Inject the element directly into the jQuery object
						this[0] = elem;
						this.length = 1;
					}
					return this;
				}

				// HANDLE: $(expr, $(...))
			} else if (!context || context.jquery) {
				return (context || root).find(selector);

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor(context).find(selector);
			}

			// HANDLE: $(DOMElement)
		} else if (selector.nodeType) {
			this[0] = selector;
			this.length = 1;
			return this;

			// HANDLE: $(function)
			// Shortcut for document ready
		} else if (jQuery.isFunction(selector)) {
			return root.ready !== undefined ? root.ready(selector) :

			// Execute immediately if ready is not present
			selector(jQuery);
		}

		return jQuery.makeArray(selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	return init;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9jb3JlL2luaXQuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwialF1ZXJ5IiwiZG9jdW1lbnQiLCJyc2luZ2xlVGFnIiwicm9vdGpRdWVyeSIsInJxdWlja0V4cHIiLCJpbml0IiwiZm4iLCJzZWxlY3RvciIsImNvbnRleHQiLCJyb290IiwibWF0Y2giLCJlbGVtIiwibGVuZ3RoIiwiZXhlYyIsIm1lcmdlIiwicGFyc2VIVE1MIiwibm9kZVR5cGUiLCJvd25lckRvY3VtZW50IiwidGVzdCIsImlzUGxhaW5PYmplY3QiLCJpc0Z1bmN0aW9uIiwiYXR0ciIsImdldEVsZW1lbnRCeUlkIiwianF1ZXJ5IiwiZmluZCIsImNvbnN0cnVjdG9yIiwicmVhZHkiLCJ1bmRlZmluZWQiLCJtYWtlQXJyYXkiLCJwcm90b3R5cGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQUEsT0FBUSxDQUNQLFNBRE8sRUFFUCxpQkFGTyxFQUdQLGtCQUhPLEVBSVAsMEJBSk8sQ0FBUixFQUtHLFVBQVVDLE1BQVYsRUFBa0JDLFFBQWxCLEVBQTRCQyxVQUE1QixFQUF5Qzs7QUFFNUM7O0FBRUE7O0FBQ0EsS0FBSUMsVUFBSjs7O0FBRUM7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsY0FBYSxxQ0FOZDtBQUFBLEtBUUNDLE9BQU9MLE9BQU9NLEVBQVAsQ0FBVUQsSUFBVixHQUFpQixVQUFVRSxRQUFWLEVBQW9CQyxPQUFwQixFQUE2QkMsSUFBN0IsRUFBb0M7QUFDM0QsTUFBSUMsS0FBSixFQUFXQyxJQUFYOztBQUVBO0FBQ0EsTUFBSyxDQUFDSixRQUFOLEVBQWlCO0FBQ2hCLFVBQU8sSUFBUDtBQUNBOztBQUVEO0FBQ0E7QUFDQUUsU0FBT0EsUUFBUU4sVUFBZjs7QUFFQTtBQUNBLE1BQUssT0FBT0ksUUFBUCxLQUFvQixRQUF6QixFQUFvQztBQUNuQyxPQUFLQSxTQUFVLENBQVYsTUFBa0IsR0FBbEIsSUFDSkEsU0FBVUEsU0FBU0ssTUFBVCxHQUFrQixDQUE1QixNQUFvQyxHQURoQyxJQUVKTCxTQUFTSyxNQUFULElBQW1CLENBRnBCLEVBRXdCOztBQUV2QjtBQUNBRixZQUFRLENBQUUsSUFBRixFQUFRSCxRQUFSLEVBQWtCLElBQWxCLENBQVI7QUFFQSxJQVBELE1BT087QUFDTkcsWUFBUU4sV0FBV1MsSUFBWCxDQUFpQk4sUUFBakIsQ0FBUjtBQUNBOztBQUVEO0FBQ0EsT0FBS0csVUFBV0EsTUFBTyxDQUFQLEtBQWMsQ0FBQ0YsT0FBMUIsQ0FBTCxFQUEyQzs7QUFFMUM7QUFDQSxRQUFLRSxNQUFPLENBQVAsQ0FBTCxFQUFrQjtBQUNqQkYsZUFBVUEsbUJBQW1CUixNQUFuQixHQUE0QlEsUUFBUyxDQUFULENBQTVCLEdBQTJDQSxPQUFyRDs7QUFFQTtBQUNBO0FBQ0FSLFlBQU9jLEtBQVAsQ0FBYyxJQUFkLEVBQW9CZCxPQUFPZSxTQUFQLENBQ25CTCxNQUFPLENBQVAsQ0FEbUIsRUFFbkJGLFdBQVdBLFFBQVFRLFFBQW5CLEdBQThCUixRQUFRUyxhQUFSLElBQXlCVCxPQUF2RCxHQUFpRVAsUUFGOUMsRUFHbkIsSUFIbUIsQ0FBcEI7O0FBTUE7QUFDQSxTQUFLQyxXQUFXZ0IsSUFBWCxDQUFpQlIsTUFBTyxDQUFQLENBQWpCLEtBQWlDVixPQUFPbUIsYUFBUCxDQUFzQlgsT0FBdEIsQ0FBdEMsRUFBd0U7QUFDdkUsV0FBTUUsS0FBTixJQUFlRixPQUFmLEVBQXlCOztBQUV4QjtBQUNBLFdBQUtSLE9BQU9vQixVQUFQLENBQW1CLEtBQU1WLEtBQU4sQ0FBbkIsQ0FBTCxFQUEwQztBQUN6QyxhQUFNQSxLQUFOLEVBQWVGLFFBQVNFLEtBQVQsQ0FBZjs7QUFFRDtBQUNDLFFBSkQsTUFJTztBQUNOLGFBQUtXLElBQUwsQ0FBV1gsS0FBWCxFQUFrQkYsUUFBU0UsS0FBVCxDQUFsQjtBQUNBO0FBQ0Q7QUFDRDs7QUFFRCxZQUFPLElBQVA7O0FBRUQ7QUFDQyxLQTdCRCxNQTZCTztBQUNOQyxZQUFPVixTQUFTcUIsY0FBVCxDQUF5QlosTUFBTyxDQUFQLENBQXpCLENBQVA7O0FBRUEsU0FBS0MsSUFBTCxFQUFZOztBQUVYO0FBQ0EsV0FBTSxDQUFOLElBQVlBLElBQVo7QUFDQSxXQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBO0FBQ0QsWUFBTyxJQUFQO0FBQ0E7O0FBRUY7QUFDQyxJQTdDRCxNQTZDTyxJQUFLLENBQUNKLE9BQUQsSUFBWUEsUUFBUWUsTUFBekIsRUFBa0M7QUFDeEMsV0FBTyxDQUFFZixXQUFXQyxJQUFiLEVBQW9CZSxJQUFwQixDQUEwQmpCLFFBQTFCLENBQVA7O0FBRUQ7QUFDQTtBQUNDLElBTE0sTUFLQTtBQUNOLFdBQU8sS0FBS2tCLFdBQUwsQ0FBa0JqQixPQUFsQixFQUE0QmdCLElBQTVCLENBQWtDakIsUUFBbEMsQ0FBUDtBQUNBOztBQUVGO0FBQ0MsR0FwRUQsTUFvRU8sSUFBS0EsU0FBU1MsUUFBZCxFQUF5QjtBQUMvQixRQUFNLENBQU4sSUFBWVQsUUFBWjtBQUNBLFFBQUtLLE1BQUwsR0FBYyxDQUFkO0FBQ0EsVUFBTyxJQUFQOztBQUVEO0FBQ0E7QUFDQyxHQVBNLE1BT0EsSUFBS1osT0FBT29CLFVBQVAsQ0FBbUJiLFFBQW5CLENBQUwsRUFBcUM7QUFDM0MsVUFBT0UsS0FBS2lCLEtBQUwsS0FBZUMsU0FBZixHQUNObEIsS0FBS2lCLEtBQUwsQ0FBWW5CLFFBQVosQ0FETTs7QUFHTjtBQUNBQSxZQUFVUCxNQUFWLENBSkQ7QUFLQTs7QUFFRCxTQUFPQSxPQUFPNEIsU0FBUCxDQUFrQnJCLFFBQWxCLEVBQTRCLElBQTVCLENBQVA7QUFDQSxFQXpHRjs7QUEyR0E7QUFDQUYsTUFBS3dCLFNBQUwsR0FBaUI3QixPQUFPTSxFQUF4Qjs7QUFFQTtBQUNBSCxjQUFhSCxPQUFRQyxRQUFSLENBQWI7O0FBRUEsUUFBT0ksSUFBUDtBQUVDLENBN0hEIiwiZmlsZSI6ImluaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbml0aWFsaXplIGEgalF1ZXJ5IG9iamVjdFxuZGVmaW5lKCBbXG5cdFwiLi4vY29yZVwiLFxuXHRcIi4uL3Zhci9kb2N1bWVudFwiLFxuXHRcIi4vdmFyL3JzaW5nbGVUYWdcIixcblx0XCIuLi90cmF2ZXJzaW5nL2ZpbmRGaWx0ZXJcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgZG9jdW1lbnQsIHJzaW5nbGVUYWcgKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBBIGNlbnRyYWwgcmVmZXJlbmNlIHRvIHRoZSByb290IGpRdWVyeShkb2N1bWVudClcbnZhciByb290alF1ZXJ5LFxuXG5cdC8vIEEgc2ltcGxlIHdheSB0byBjaGVjayBmb3IgSFRNTCBzdHJpbmdzXG5cdC8vIFByaW9yaXRpemUgI2lkIG92ZXIgPHRhZz4gdG8gYXZvaWQgWFNTIHZpYSBsb2NhdGlvbi5oYXNoICgjOTUyMSlcblx0Ly8gU3RyaWN0IEhUTUwgcmVjb2duaXRpb24gKCMxMTI5MDogbXVzdCBzdGFydCB3aXRoIDwpXG5cdC8vIFNob3J0Y3V0IHNpbXBsZSAjaWQgY2FzZSBmb3Igc3BlZWRcblx0cnF1aWNrRXhwciA9IC9eKD86XFxzKig8W1xcd1xcV10rPilbXj5dKnwjKFtcXHctXSspKSQvLFxuXG5cdGluaXQgPSBqUXVlcnkuZm4uaW5pdCA9IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCwgcm9vdCApIHtcblx0XHR2YXIgbWF0Y2gsIGVsZW07XG5cblx0XHQvLyBIQU5ETEU6ICQoXCJcIiksICQobnVsbCksICQodW5kZWZpbmVkKSwgJChmYWxzZSlcblx0XHRpZiAoICFzZWxlY3RvciApIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdC8vIE1ldGhvZCBpbml0KCkgYWNjZXB0cyBhbiBhbHRlcm5hdGUgcm9vdGpRdWVyeVxuXHRcdC8vIHNvIG1pZ3JhdGUgY2FuIHN1cHBvcnQgalF1ZXJ5LnN1YiAoZ2gtMjEwMSlcblx0XHRyb290ID0gcm9vdCB8fCByb290alF1ZXJ5O1xuXG5cdFx0Ly8gSGFuZGxlIEhUTUwgc3RyaW5nc1xuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0aWYgKCBzZWxlY3RvclsgMCBdID09PSBcIjxcIiAmJlxuXHRcdFx0XHRzZWxlY3Rvclsgc2VsZWN0b3IubGVuZ3RoIC0gMSBdID09PSBcIj5cIiAmJlxuXHRcdFx0XHRzZWxlY3Rvci5sZW5ndGggPj0gMyApIHtcblxuXHRcdFx0XHQvLyBBc3N1bWUgdGhhdCBzdHJpbmdzIHRoYXQgc3RhcnQgYW5kIGVuZCB3aXRoIDw+IGFyZSBIVE1MIGFuZCBza2lwIHRoZSByZWdleCBjaGVja1xuXHRcdFx0XHRtYXRjaCA9IFsgbnVsbCwgc2VsZWN0b3IsIG51bGwgXTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bWF0Y2ggPSBycXVpY2tFeHByLmV4ZWMoIHNlbGVjdG9yICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1hdGNoIGh0bWwgb3IgbWFrZSBzdXJlIG5vIGNvbnRleHQgaXMgc3BlY2lmaWVkIGZvciAjaWRcblx0XHRcdGlmICggbWF0Y2ggJiYgKCBtYXRjaFsgMSBdIHx8ICFjb250ZXh0ICkgKSB7XG5cblx0XHRcdFx0Ly8gSEFORExFOiAkKGh0bWwpIC0+ICQoYXJyYXkpXG5cdFx0XHRcdGlmICggbWF0Y2hbIDEgXSApIHtcblx0XHRcdFx0XHRjb250ZXh0ID0gY29udGV4dCBpbnN0YW5jZW9mIGpRdWVyeSA/IGNvbnRleHRbIDAgXSA6IGNvbnRleHQ7XG5cblx0XHRcdFx0XHQvLyBPcHRpb24gdG8gcnVuIHNjcmlwdHMgaXMgdHJ1ZSBmb3IgYmFjay1jb21wYXRcblx0XHRcdFx0XHQvLyBJbnRlbnRpb25hbGx5IGxldCB0aGUgZXJyb3IgYmUgdGhyb3duIGlmIHBhcnNlSFRNTCBpcyBub3QgcHJlc2VudFxuXHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggdGhpcywgalF1ZXJ5LnBhcnNlSFRNTChcblx0XHRcdFx0XHRcdG1hdGNoWyAxIF0sXG5cdFx0XHRcdFx0XHRjb250ZXh0ICYmIGNvbnRleHQubm9kZVR5cGUgPyBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCA6IGRvY3VtZW50LFxuXHRcdFx0XHRcdFx0dHJ1ZVxuXHRcdFx0XHRcdCkgKTtcblxuXHRcdFx0XHRcdC8vIEhBTkRMRTogJChodG1sLCBwcm9wcylcblx0XHRcdFx0XHRpZiAoIHJzaW5nbGVUYWcudGVzdCggbWF0Y2hbIDEgXSApICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KCBjb250ZXh0ICkgKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCBtYXRjaCBpbiBjb250ZXh0ICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFByb3BlcnRpZXMgb2YgY29udGV4dCBhcmUgY2FsbGVkIGFzIG1ldGhvZHMgaWYgcG9zc2libGVcblx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdGhpc1sgbWF0Y2ggXSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXNbIG1hdGNoIF0oIGNvbnRleHRbIG1hdGNoIF0gKTtcblxuXHRcdFx0XHRcdFx0XHQvLyAuLi5hbmQgb3RoZXJ3aXNlIHNldCBhcyBhdHRyaWJ1dGVzXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hdHRyKCBtYXRjaCwgY29udGV4dFsgbWF0Y2ggXSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdFx0Ly8gSEFORExFOiAkKCNpZClcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIG1hdGNoWyAyIF0gKTtcblxuXHRcdFx0XHRcdGlmICggZWxlbSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSW5qZWN0IHRoZSBlbGVtZW50IGRpcmVjdGx5IGludG8gdGhlIGpRdWVyeSBvYmplY3Rcblx0XHRcdFx0XHRcdHRoaXNbIDAgXSA9IGVsZW07XG5cdFx0XHRcdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8vIEhBTkRMRTogJChleHByLCAkKC4uLikpXG5cdFx0XHR9IGVsc2UgaWYgKCAhY29udGV4dCB8fCBjb250ZXh0LmpxdWVyeSApIHtcblx0XHRcdFx0cmV0dXJuICggY29udGV4dCB8fCByb290ICkuZmluZCggc2VsZWN0b3IgKTtcblxuXHRcdFx0Ly8gSEFORExFOiAkKGV4cHIsIGNvbnRleHQpXG5cdFx0XHQvLyAod2hpY2ggaXMganVzdCBlcXVpdmFsZW50IHRvOiAkKGNvbnRleHQpLmZpbmQoZXhwcilcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yKCBjb250ZXh0ICkuZmluZCggc2VsZWN0b3IgKTtcblx0XHRcdH1cblxuXHRcdC8vIEhBTkRMRTogJChET01FbGVtZW50KVxuXHRcdH0gZWxzZSBpZiAoIHNlbGVjdG9yLm5vZGVUeXBlICkge1xuXHRcdFx0dGhpc1sgMCBdID0gc2VsZWN0b3I7XG5cdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdC8vIEhBTkRMRTogJChmdW5jdGlvbilcblx0XHQvLyBTaG9ydGN1dCBmb3IgZG9jdW1lbnQgcmVhZHlcblx0XHR9IGVsc2UgaWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggc2VsZWN0b3IgKSApIHtcblx0XHRcdHJldHVybiByb290LnJlYWR5ICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRyb290LnJlYWR5KCBzZWxlY3RvciApIDpcblxuXHRcdFx0XHQvLyBFeGVjdXRlIGltbWVkaWF0ZWx5IGlmIHJlYWR5IGlzIG5vdCBwcmVzZW50XG5cdFx0XHRcdHNlbGVjdG9yKCBqUXVlcnkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4galF1ZXJ5Lm1ha2VBcnJheSggc2VsZWN0b3IsIHRoaXMgKTtcblx0fTtcblxuLy8gR2l2ZSB0aGUgaW5pdCBmdW5jdGlvbiB0aGUgalF1ZXJ5IHByb3RvdHlwZSBmb3IgbGF0ZXIgaW5zdGFudGlhdGlvblxuaW5pdC5wcm90b3R5cGUgPSBqUXVlcnkuZm47XG5cbi8vIEluaXRpYWxpemUgY2VudHJhbCByZWZlcmVuY2VcbnJvb3RqUXVlcnkgPSBqUXVlcnkoIGRvY3VtZW50ICk7XG5cbnJldHVybiBpbml0O1xuXG59ICk7XG4iXX0=