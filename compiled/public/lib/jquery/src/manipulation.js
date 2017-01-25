"use strict";

define(["./core", "./var/concat", "./var/push", "./core/access", "./manipulation/var/rcheckableType", "./manipulation/var/rtagName", "./manipulation/var/rscriptType", "./manipulation/wrapMap", "./manipulation/getAll", "./manipulation/setGlobalEval", "./manipulation/buildFragment", "./manipulation/support", "./data/var/dataPriv", "./data/var/dataUser", "./data/var/acceptData", "./core/DOMEval", "./core/init", "./traversing", "./selector", "./event"], function (jQuery, concat, push, access, rcheckableType, rtagName, rscriptType, wrapMap, getAll, setGlobalEval, buildFragment, support, dataPriv, dataUser, acceptData, DOMEval) {

	"use strict";

	var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,


	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,


	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    rscriptTypeMasked = /^true\/(.*)/,
	    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	function manipulationTarget(elem, content) {
		if (jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

			return elem.getElementsByTagName("tbody")[0] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);

		if (match) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip(collection, args, callback, ignored) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var fragment,
		    first,
		    scripts,
		    hasScripts,
		    node,
		    doc,
		    i = 0,
		    l = collection.length,
		    iNoClone = l - 1,
		    value = args[0],
		    isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
			return collection.each(function (index) {
				var self = collection.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

							if (node.src) {

								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								DOMEval(node.textContent.replace(rcleanScript, ""), doc);
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function _remove(elem, selector, keepData) {
		var node,
		    nodes = selector ? jQuery.filter(selector, elem) : elem,
		    i = 0;

		for (; (node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}

		return elem;
	}

	jQuery.extend({
		htmlPrefilter: function htmlPrefilter(html) {
			return html.replace(rxhtmlTag, "<$1></$2>");
		},

		clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
			var i,
			    l,
			    srcElements,
			    destElements,
			    clone = elem.cloneNode(true),
			    inPage = jQuery.contains(elem.ownerDocument, elem);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function cleanData(elems) {
			var data,
			    elem,
			    type,
			    special = jQuery.event.special,
			    i = 0;

			for (; (elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if (data = elem[dataPriv.expando]) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});

	jQuery.fn.extend({
		detach: function detach(selector) {
			return _remove(this, selector, true);
		},

		remove: function remove(selector) {
			return _remove(this, selector);
		},

		text: function text(value) {
			return access(this, function (value) {
				return value === undefined ? jQuery.text(this) : this.empty().each(function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value;
					}
				});
			}, null, value, arguments.length);
		},

		append: function append() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function prepend() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function before() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function after() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		empty: function empty() {
			var elem,
			    i = 0;

			for (; (elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {

					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function clone(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function html(value) {
			return access(this, function (value) {
				var elem = this[0] || {},
				    i = 0,
				    l = this.length;

				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) {}
				}

				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function replaceWith() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (elem) {
				var parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}

				// Force callback invocation
			}, ignored);
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (name, original) {
		jQuery.fn[name] = function (selector) {
			var elems,
			    ret = [],
			    insert = jQuery(selector),
			    last = insert.length - 1,
			    i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9tYW5pcHVsYXRpb24uanMiXSwibmFtZXMiOlsiZGVmaW5lIiwialF1ZXJ5IiwiY29uY2F0IiwicHVzaCIsImFjY2VzcyIsInJjaGVja2FibGVUeXBlIiwicnRhZ05hbWUiLCJyc2NyaXB0VHlwZSIsIndyYXBNYXAiLCJnZXRBbGwiLCJzZXRHbG9iYWxFdmFsIiwiYnVpbGRGcmFnbWVudCIsInN1cHBvcnQiLCJkYXRhUHJpdiIsImRhdGFVc2VyIiwiYWNjZXB0RGF0YSIsIkRPTUV2YWwiLCJyeGh0bWxUYWciLCJybm9Jbm5lcmh0bWwiLCJyY2hlY2tlZCIsInJzY3JpcHRUeXBlTWFza2VkIiwicmNsZWFuU2NyaXB0IiwibWFuaXB1bGF0aW9uVGFyZ2V0IiwiZWxlbSIsImNvbnRlbnQiLCJub2RlTmFtZSIsIm5vZGVUeXBlIiwiZmlyc3RDaGlsZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZGlzYWJsZVNjcmlwdCIsInR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJyZXN0b3JlU2NyaXB0IiwibWF0Y2giLCJleGVjIiwicmVtb3ZlQXR0cmlidXRlIiwiY2xvbmVDb3B5RXZlbnQiLCJzcmMiLCJkZXN0IiwiaSIsImwiLCJwZGF0YU9sZCIsInBkYXRhQ3VyIiwidWRhdGFPbGQiLCJ1ZGF0YUN1ciIsImV2ZW50cyIsImhhc0RhdGEiLCJzZXQiLCJoYW5kbGUiLCJsZW5ndGgiLCJldmVudCIsImFkZCIsImV4dGVuZCIsImZpeElucHV0IiwidG9Mb3dlckNhc2UiLCJ0ZXN0IiwiY2hlY2tlZCIsImRlZmF1bHRWYWx1ZSIsImRvbU1hbmlwIiwiY29sbGVjdGlvbiIsImFyZ3MiLCJjYWxsYmFjayIsImlnbm9yZWQiLCJhcHBseSIsImZyYWdtZW50IiwiZmlyc3QiLCJzY3JpcHRzIiwiaGFzU2NyaXB0cyIsIm5vZGUiLCJkb2MiLCJpTm9DbG9uZSIsInZhbHVlIiwiaXNGdW5jdGlvbiIsImNoZWNrQ2xvbmUiLCJlYWNoIiwiaW5kZXgiLCJzZWxmIiwiZXEiLCJjYWxsIiwiaHRtbCIsIm93bmVyRG9jdW1lbnQiLCJjaGlsZE5vZGVzIiwibWFwIiwiY2xvbmUiLCJtZXJnZSIsImNvbnRhaW5zIiwiX2V2YWxVcmwiLCJ0ZXh0Q29udGVudCIsInJlcGxhY2UiLCJyZW1vdmUiLCJzZWxlY3RvciIsImtlZXBEYXRhIiwibm9kZXMiLCJmaWx0ZXIiLCJjbGVhbkRhdGEiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJodG1sUHJlZmlsdGVyIiwiZGF0YUFuZEV2ZW50cyIsImRlZXBEYXRhQW5kRXZlbnRzIiwic3JjRWxlbWVudHMiLCJkZXN0RWxlbWVudHMiLCJjbG9uZU5vZGUiLCJpblBhZ2UiLCJub0Nsb25lQ2hlY2tlZCIsImlzWE1MRG9jIiwiZWxlbXMiLCJkYXRhIiwic3BlY2lhbCIsInVuZGVmaW5lZCIsImV4cGFuZG8iLCJyZW1vdmVFdmVudCIsImZuIiwiZGV0YWNoIiwidGV4dCIsImVtcHR5IiwiYXJndW1lbnRzIiwiYXBwZW5kIiwidGFyZ2V0IiwiYXBwZW5kQ2hpbGQiLCJwcmVwZW5kIiwiaW5zZXJ0QmVmb3JlIiwiYmVmb3JlIiwiYWZ0ZXIiLCJuZXh0U2libGluZyIsImlubmVySFRNTCIsImUiLCJyZXBsYWNlV2l0aCIsInBhcmVudCIsImluQXJyYXkiLCJyZXBsYWNlQ2hpbGQiLCJhcHBlbmRUbyIsInByZXBlbmRUbyIsImluc2VydEFmdGVyIiwicmVwbGFjZUFsbCIsIm5hbWUiLCJvcmlnaW5hbCIsInJldCIsImluc2VydCIsImxhc3QiLCJnZXQiLCJwdXNoU3RhY2siXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQVEsQ0FDUCxRQURPLEVBRVAsY0FGTyxFQUdQLFlBSE8sRUFJUCxlQUpPLEVBS1AsbUNBTE8sRUFNUCw2QkFOTyxFQU9QLGdDQVBPLEVBUVAsd0JBUk8sRUFTUCx1QkFUTyxFQVVQLDhCQVZPLEVBV1AsOEJBWE8sRUFZUCx3QkFaTyxFQWNQLHFCQWRPLEVBZVAscUJBZk8sRUFnQlAsdUJBaEJPLEVBaUJQLGdCQWpCTyxFQW1CUCxhQW5CTyxFQW9CUCxjQXBCTyxFQXFCUCxZQXJCTyxFQXNCUCxTQXRCTyxDQUFSLEVBdUJHLFVBQVVDLE1BQVYsRUFBa0JDLE1BQWxCLEVBQTBCQyxJQUExQixFQUFnQ0MsTUFBaEMsRUFDRkMsY0FERSxFQUNjQyxRQURkLEVBQ3dCQyxXQUR4QixFQUVGQyxPQUZFLEVBRU9DLE1BRlAsRUFFZUMsYUFGZixFQUU4QkMsYUFGOUIsRUFFNkNDLE9BRjdDLEVBR0ZDLFFBSEUsRUFHUUMsUUFIUixFQUdrQkMsVUFIbEIsRUFHOEJDLE9BSDlCLEVBR3dDOztBQUUzQzs7QUFFQTs7QUFFQzs7QUFFQTtBQUNBQyxhQUFZLDZGQUxiOzs7QUFPQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQUMsZ0JBQWUsdUJBWmhCOzs7QUFjQztBQUNBQyxZQUFXLG1DQWZaO0FBQUEsS0FnQkNDLG9CQUFvQixhQWhCckI7QUFBQSxLQWlCQ0MsZUFBZSwwQ0FqQmhCOztBQW1CQSxVQUFTQyxrQkFBVCxDQUE2QkMsSUFBN0IsRUFBbUNDLE9BQW5DLEVBQTZDO0FBQzVDLE1BQUt2QixPQUFPd0IsUUFBUCxDQUFpQkYsSUFBakIsRUFBdUIsT0FBdkIsS0FDSnRCLE9BQU93QixRQUFQLENBQWlCRCxRQUFRRSxRQUFSLEtBQXFCLEVBQXJCLEdBQTBCRixPQUExQixHQUFvQ0EsUUFBUUcsVUFBN0QsRUFBeUUsSUFBekUsQ0FERCxFQUNtRjs7QUFFbEYsVUFBT0osS0FBS0ssb0JBQUwsQ0FBMkIsT0FBM0IsRUFBc0MsQ0FBdEMsS0FBNkNMLElBQXBEO0FBQ0E7O0FBRUQsU0FBT0EsSUFBUDtBQUNBOztBQUVEO0FBQ0EsVUFBU00sYUFBVCxDQUF3Qk4sSUFBeEIsRUFBK0I7QUFDOUJBLE9BQUtPLElBQUwsR0FBWSxDQUFFUCxLQUFLUSxZQUFMLENBQW1CLE1BQW5CLE1BQWdDLElBQWxDLElBQTJDLEdBQTNDLEdBQWlEUixLQUFLTyxJQUFsRTtBQUNBLFNBQU9QLElBQVA7QUFDQTtBQUNELFVBQVNTLGFBQVQsQ0FBd0JULElBQXhCLEVBQStCO0FBQzlCLE1BQUlVLFFBQVFiLGtCQUFrQmMsSUFBbEIsQ0FBd0JYLEtBQUtPLElBQTdCLENBQVo7O0FBRUEsTUFBS0csS0FBTCxFQUFhO0FBQ1pWLFFBQUtPLElBQUwsR0FBWUcsTUFBTyxDQUFQLENBQVo7QUFDQSxHQUZELE1BRU87QUFDTlYsUUFBS1ksZUFBTCxDQUFzQixNQUF0QjtBQUNBOztBQUVELFNBQU9aLElBQVA7QUFDQTs7QUFFRCxVQUFTYSxjQUFULENBQXlCQyxHQUF6QixFQUE4QkMsSUFBOUIsRUFBcUM7QUFDcEMsTUFBSUMsQ0FBSixFQUFPQyxDQUFQLEVBQVVWLElBQVYsRUFBZ0JXLFFBQWhCLEVBQTBCQyxRQUExQixFQUFvQ0MsUUFBcEMsRUFBOENDLFFBQTlDLEVBQXdEQyxNQUF4RDs7QUFFQSxNQUFLUCxLQUFLWixRQUFMLEtBQWtCLENBQXZCLEVBQTJCO0FBQzFCO0FBQ0E7O0FBRUQ7QUFDQSxNQUFLYixTQUFTaUMsT0FBVCxDQUFrQlQsR0FBbEIsQ0FBTCxFQUErQjtBQUM5QkksY0FBVzVCLFNBQVNULE1BQVQsQ0FBaUJpQyxHQUFqQixDQUFYO0FBQ0FLLGNBQVc3QixTQUFTa0MsR0FBVCxDQUFjVCxJQUFkLEVBQW9CRyxRQUFwQixDQUFYO0FBQ0FJLFlBQVNKLFNBQVNJLE1BQWxCOztBQUVBLE9BQUtBLE1BQUwsRUFBYztBQUNiLFdBQU9ILFNBQVNNLE1BQWhCO0FBQ0FOLGFBQVNHLE1BQVQsR0FBa0IsRUFBbEI7O0FBRUEsU0FBTWYsSUFBTixJQUFjZSxNQUFkLEVBQXVCO0FBQ3RCLFVBQU1OLElBQUksQ0FBSixFQUFPQyxJQUFJSyxPQUFRZixJQUFSLEVBQWVtQixNQUFoQyxFQUF3Q1YsSUFBSUMsQ0FBNUMsRUFBK0NELEdBQS9DLEVBQXFEO0FBQ3BEdEMsYUFBT2lELEtBQVAsQ0FBYUMsR0FBYixDQUFrQmIsSUFBbEIsRUFBd0JSLElBQXhCLEVBQThCZSxPQUFRZixJQUFSLEVBQWdCUyxDQUFoQixDQUE5QjtBQUNBO0FBQ0Q7QUFDRDtBQUNEOztBQUVEO0FBQ0EsTUFBS3pCLFNBQVNnQyxPQUFULENBQWtCVCxHQUFsQixDQUFMLEVBQStCO0FBQzlCTSxjQUFXN0IsU0FBU1YsTUFBVCxDQUFpQmlDLEdBQWpCLENBQVg7QUFDQU8sY0FBVzNDLE9BQU9tRCxNQUFQLENBQWUsRUFBZixFQUFtQlQsUUFBbkIsQ0FBWDs7QUFFQTdCLFlBQVNpQyxHQUFULENBQWNULElBQWQsRUFBb0JNLFFBQXBCO0FBQ0E7QUFDRDs7QUFFRDtBQUNBLFVBQVNTLFFBQVQsQ0FBbUJoQixHQUFuQixFQUF3QkMsSUFBeEIsRUFBK0I7QUFDOUIsTUFBSWIsV0FBV2EsS0FBS2IsUUFBTCxDQUFjNkIsV0FBZCxFQUFmOztBQUVBO0FBQ0EsTUFBSzdCLGFBQWEsT0FBYixJQUF3QnBCLGVBQWVrRCxJQUFmLENBQXFCbEIsSUFBSVAsSUFBekIsQ0FBN0IsRUFBK0Q7QUFDOURRLFFBQUtrQixPQUFMLEdBQWVuQixJQUFJbUIsT0FBbkI7O0FBRUQ7QUFDQyxHQUpELE1BSU8sSUFBSy9CLGFBQWEsT0FBYixJQUF3QkEsYUFBYSxVQUExQyxFQUF1RDtBQUM3RGEsUUFBS21CLFlBQUwsR0FBb0JwQixJQUFJb0IsWUFBeEI7QUFDQTtBQUNEOztBQUVELFVBQVNDLFFBQVQsQ0FBbUJDLFVBQW5CLEVBQStCQyxJQUEvQixFQUFxQ0MsUUFBckMsRUFBK0NDLE9BQS9DLEVBQXlEOztBQUV4RDtBQUNBRixTQUFPMUQsT0FBTzZELEtBQVAsQ0FBYyxFQUFkLEVBQWtCSCxJQUFsQixDQUFQOztBQUVBLE1BQUlJLFFBQUo7QUFBQSxNQUFjQyxLQUFkO0FBQUEsTUFBcUJDLE9BQXJCO0FBQUEsTUFBOEJDLFVBQTlCO0FBQUEsTUFBMENDLElBQTFDO0FBQUEsTUFBZ0RDLEdBQWhEO0FBQUEsTUFDQzlCLElBQUksQ0FETDtBQUFBLE1BRUNDLElBQUltQixXQUFXVixNQUZoQjtBQUFBLE1BR0NxQixXQUFXOUIsSUFBSSxDQUhoQjtBQUFBLE1BSUMrQixRQUFRWCxLQUFNLENBQU4sQ0FKVDtBQUFBLE1BS0NZLGFBQWF2RSxPQUFPdUUsVUFBUCxDQUFtQkQsS0FBbkIsQ0FMZDs7QUFPQTtBQUNBLE1BQUtDLGNBQ0RoQyxJQUFJLENBQUosSUFBUyxPQUFPK0IsS0FBUCxLQUFpQixRQUExQixJQUNELENBQUMzRCxRQUFRNkQsVUFEUixJQUNzQnRELFNBQVNvQyxJQUFULENBQWVnQixLQUFmLENBRjFCLEVBRXFEO0FBQ3BELFVBQU9aLFdBQVdlLElBQVgsQ0FBaUIsVUFBVUMsS0FBVixFQUFrQjtBQUN6QyxRQUFJQyxPQUFPakIsV0FBV2tCLEVBQVgsQ0FBZUYsS0FBZixDQUFYO0FBQ0EsUUFBS0gsVUFBTCxFQUFrQjtBQUNqQlosVUFBTSxDQUFOLElBQVlXLE1BQU1PLElBQU4sQ0FBWSxJQUFaLEVBQWtCSCxLQUFsQixFQUF5QkMsS0FBS0csSUFBTCxFQUF6QixDQUFaO0FBQ0E7QUFDRHJCLGFBQVVrQixJQUFWLEVBQWdCaEIsSUFBaEIsRUFBc0JDLFFBQXRCLEVBQWdDQyxPQUFoQztBQUNBLElBTk0sQ0FBUDtBQU9BOztBQUVELE1BQUt0QixDQUFMLEVBQVM7QUFDUndCLGNBQVdyRCxjQUFlaUQsSUFBZixFQUFxQkQsV0FBWSxDQUFaLEVBQWdCcUIsYUFBckMsRUFBb0QsS0FBcEQsRUFBMkRyQixVQUEzRCxFQUF1RUcsT0FBdkUsQ0FBWDtBQUNBRyxXQUFRRCxTQUFTckMsVUFBakI7O0FBRUEsT0FBS3FDLFNBQVNpQixVQUFULENBQW9CaEMsTUFBcEIsS0FBK0IsQ0FBcEMsRUFBd0M7QUFDdkNlLGVBQVdDLEtBQVg7QUFDQTs7QUFFRDtBQUNBLE9BQUtBLFNBQVNILE9BQWQsRUFBd0I7QUFDdkJJLGNBQVVqRSxPQUFPaUYsR0FBUCxDQUFZekUsT0FBUXVELFFBQVIsRUFBa0IsUUFBbEIsQ0FBWixFQUEwQ25DLGFBQTFDLENBQVY7QUFDQXNDLGlCQUFhRCxRQUFRakIsTUFBckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBUVYsSUFBSUMsQ0FBWixFQUFlRCxHQUFmLEVBQXFCO0FBQ3BCNkIsWUFBT0osUUFBUDs7QUFFQSxTQUFLekIsTUFBTStCLFFBQVgsRUFBc0I7QUFDckJGLGFBQU9uRSxPQUFPa0YsS0FBUCxDQUFjZixJQUFkLEVBQW9CLElBQXBCLEVBQTBCLElBQTFCLENBQVA7O0FBRUE7QUFDQSxVQUFLRCxVQUFMLEVBQWtCOztBQUVqQjtBQUNBO0FBQ0FsRSxjQUFPbUYsS0FBUCxDQUFjbEIsT0FBZCxFQUF1QnpELE9BQVEyRCxJQUFSLEVBQWMsUUFBZCxDQUF2QjtBQUNBO0FBQ0Q7O0FBRURQLGNBQVNpQixJQUFULENBQWVuQixXQUFZcEIsQ0FBWixDQUFmLEVBQWdDNkIsSUFBaEMsRUFBc0M3QixDQUF0QztBQUNBOztBQUVELFFBQUs0QixVQUFMLEVBQWtCO0FBQ2pCRSxXQUFNSCxRQUFTQSxRQUFRakIsTUFBUixHQUFpQixDQUExQixFQUE4QitCLGFBQXBDOztBQUVBO0FBQ0EvRSxZQUFPaUYsR0FBUCxDQUFZaEIsT0FBWixFQUFxQmxDLGFBQXJCOztBQUVBO0FBQ0EsVUFBTU8sSUFBSSxDQUFWLEVBQWFBLElBQUk0QixVQUFqQixFQUE2QjVCLEdBQTdCLEVBQW1DO0FBQ2xDNkIsYUFBT0YsUUFBUzNCLENBQVQsQ0FBUDtBQUNBLFVBQUtoQyxZQUFZZ0QsSUFBWixDQUFrQmEsS0FBS3RDLElBQUwsSUFBYSxFQUEvQixLQUNKLENBQUNqQixTQUFTVCxNQUFULENBQWlCZ0UsSUFBakIsRUFBdUIsWUFBdkIsQ0FERyxJQUVKbkUsT0FBT29GLFFBQVAsQ0FBaUJoQixHQUFqQixFQUFzQkQsSUFBdEIsQ0FGRCxFQUVnQzs7QUFFL0IsV0FBS0EsS0FBSy9CLEdBQVYsRUFBZ0I7O0FBRWY7QUFDQSxZQUFLcEMsT0FBT3FGLFFBQVosRUFBdUI7QUFDdEJyRixnQkFBT3FGLFFBQVAsQ0FBaUJsQixLQUFLL0IsR0FBdEI7QUFDQTtBQUNELFFBTkQsTUFNTztBQUNOckIsZ0JBQVNvRCxLQUFLbUIsV0FBTCxDQUFpQkMsT0FBakIsQ0FBMEJuRSxZQUExQixFQUF3QyxFQUF4QyxDQUFULEVBQXVEZ0QsR0FBdkQ7QUFDQTtBQUNEO0FBQ0Q7QUFDRDtBQUNEO0FBQ0Q7O0FBRUQsU0FBT1YsVUFBUDtBQUNBOztBQUVELFVBQVM4QixPQUFULENBQWlCbEUsSUFBakIsRUFBdUJtRSxRQUF2QixFQUFpQ0MsUUFBakMsRUFBNEM7QUFDM0MsTUFBSXZCLElBQUo7QUFBQSxNQUNDd0IsUUFBUUYsV0FBV3pGLE9BQU80RixNQUFQLENBQWVILFFBQWYsRUFBeUJuRSxJQUF6QixDQUFYLEdBQTZDQSxJQUR0RDtBQUFBLE1BRUNnQixJQUFJLENBRkw7O0FBSUEsU0FBUSxDQUFFNkIsT0FBT3dCLE1BQU9yRCxDQUFQLENBQVQsS0FBeUIsSUFBakMsRUFBdUNBLEdBQXZDLEVBQTZDO0FBQzVDLE9BQUssQ0FBQ29ELFFBQUQsSUFBYXZCLEtBQUsxQyxRQUFMLEtBQWtCLENBQXBDLEVBQXdDO0FBQ3ZDekIsV0FBTzZGLFNBQVAsQ0FBa0JyRixPQUFRMkQsSUFBUixDQUFsQjtBQUNBOztBQUVELE9BQUtBLEtBQUsyQixVQUFWLEVBQXVCO0FBQ3RCLFFBQUtKLFlBQVkxRixPQUFPb0YsUUFBUCxDQUFpQmpCLEtBQUtZLGFBQXRCLEVBQXFDWixJQUFyQyxDQUFqQixFQUErRDtBQUM5RDFELG1CQUFlRCxPQUFRMkQsSUFBUixFQUFjLFFBQWQsQ0FBZjtBQUNBO0FBQ0RBLFNBQUsyQixVQUFMLENBQWdCQyxXQUFoQixDQUE2QjVCLElBQTdCO0FBQ0E7QUFDRDs7QUFFRCxTQUFPN0MsSUFBUDtBQUNBOztBQUVEdEIsUUFBT21ELE1BQVAsQ0FBZTtBQUNkNkMsaUJBQWUsdUJBQVVsQixJQUFWLEVBQWlCO0FBQy9CLFVBQU9BLEtBQUtTLE9BQUwsQ0FBY3ZFLFNBQWQsRUFBeUIsV0FBekIsQ0FBUDtBQUNBLEdBSGE7O0FBS2RrRSxTQUFPLGVBQVU1RCxJQUFWLEVBQWdCMkUsYUFBaEIsRUFBK0JDLGlCQUEvQixFQUFtRDtBQUN6RCxPQUFJNUQsQ0FBSjtBQUFBLE9BQU9DLENBQVA7QUFBQSxPQUFVNEQsV0FBVjtBQUFBLE9BQXVCQyxZQUF2QjtBQUFBLE9BQ0NsQixRQUFRNUQsS0FBSytFLFNBQUwsQ0FBZ0IsSUFBaEIsQ0FEVDtBQUFBLE9BRUNDLFNBQVN0RyxPQUFPb0YsUUFBUCxDQUFpQjlELEtBQUt5RCxhQUF0QixFQUFxQ3pELElBQXJDLENBRlY7O0FBSUE7QUFDQSxPQUFLLENBQUNYLFFBQVE0RixjQUFULEtBQTZCakYsS0FBS0csUUFBTCxLQUFrQixDQUFsQixJQUF1QkgsS0FBS0csUUFBTCxLQUFrQixFQUF0RSxLQUNILENBQUN6QixPQUFPd0csUUFBUCxDQUFpQmxGLElBQWpCLENBREgsRUFDNkI7O0FBRTVCO0FBQ0E4RSxtQkFBZTVGLE9BQVEwRSxLQUFSLENBQWY7QUFDQWlCLGtCQUFjM0YsT0FBUWMsSUFBUixDQUFkOztBQUVBLFNBQU1nQixJQUFJLENBQUosRUFBT0MsSUFBSTRELFlBQVluRCxNQUE3QixFQUFxQ1YsSUFBSUMsQ0FBekMsRUFBNENELEdBQTVDLEVBQWtEO0FBQ2pEYyxjQUFVK0MsWUFBYTdELENBQWIsQ0FBVixFQUE0QjhELGFBQWM5RCxDQUFkLENBQTVCO0FBQ0E7QUFDRDs7QUFFRDtBQUNBLE9BQUsyRCxhQUFMLEVBQXFCO0FBQ3BCLFFBQUtDLGlCQUFMLEVBQXlCO0FBQ3hCQyxtQkFBY0EsZUFBZTNGLE9BQVFjLElBQVIsQ0FBN0I7QUFDQThFLG9CQUFlQSxnQkFBZ0I1RixPQUFRMEUsS0FBUixDQUEvQjs7QUFFQSxVQUFNNUMsSUFBSSxDQUFKLEVBQU9DLElBQUk0RCxZQUFZbkQsTUFBN0IsRUFBcUNWLElBQUlDLENBQXpDLEVBQTRDRCxHQUE1QyxFQUFrRDtBQUNqREgscUJBQWdCZ0UsWUFBYTdELENBQWIsQ0FBaEIsRUFBa0M4RCxhQUFjOUQsQ0FBZCxDQUFsQztBQUNBO0FBQ0QsS0FQRCxNQU9PO0FBQ05ILG9CQUFnQmIsSUFBaEIsRUFBc0I0RCxLQUF0QjtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQWtCLGtCQUFlNUYsT0FBUTBFLEtBQVIsRUFBZSxRQUFmLENBQWY7QUFDQSxPQUFLa0IsYUFBYXBELE1BQWIsR0FBc0IsQ0FBM0IsRUFBK0I7QUFDOUJ2QyxrQkFBZTJGLFlBQWYsRUFBNkIsQ0FBQ0UsTUFBRCxJQUFXOUYsT0FBUWMsSUFBUixFQUFjLFFBQWQsQ0FBeEM7QUFDQTs7QUFFRDtBQUNBLFVBQU80RCxLQUFQO0FBQ0EsR0E3Q2E7O0FBK0NkVyxhQUFXLG1CQUFVWSxLQUFWLEVBQWtCO0FBQzVCLE9BQUlDLElBQUo7QUFBQSxPQUFVcEYsSUFBVjtBQUFBLE9BQWdCTyxJQUFoQjtBQUFBLE9BQ0M4RSxVQUFVM0csT0FBT2lELEtBQVAsQ0FBYTBELE9BRHhCO0FBQUEsT0FFQ3JFLElBQUksQ0FGTDs7QUFJQSxVQUFRLENBQUVoQixPQUFPbUYsTUFBT25FLENBQVAsQ0FBVCxNQUEwQnNFLFNBQWxDLEVBQTZDdEUsR0FBN0MsRUFBbUQ7QUFDbEQsUUFBS3hCLFdBQVlRLElBQVosQ0FBTCxFQUEwQjtBQUN6QixTQUFPb0YsT0FBT3BGLEtBQU1WLFNBQVNpRyxPQUFmLENBQWQsRUFBMkM7QUFDMUMsVUFBS0gsS0FBSzlELE1BQVYsRUFBbUI7QUFDbEIsWUFBTWYsSUFBTixJQUFjNkUsS0FBSzlELE1BQW5CLEVBQTRCO0FBQzNCLFlBQUsrRCxRQUFTOUUsSUFBVCxDQUFMLEVBQXVCO0FBQ3RCN0IsZ0JBQU9pRCxLQUFQLENBQWF1QyxNQUFiLENBQXFCbEUsSUFBckIsRUFBMkJPLElBQTNCOztBQUVEO0FBQ0MsU0FKRCxNQUlPO0FBQ043QixnQkFBTzhHLFdBQVAsQ0FBb0J4RixJQUFwQixFQUEwQk8sSUFBMUIsRUFBZ0M2RSxLQUFLM0QsTUFBckM7QUFDQTtBQUNEO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBekIsV0FBTVYsU0FBU2lHLE9BQWYsSUFBMkJELFNBQTNCO0FBQ0E7QUFDRCxTQUFLdEYsS0FBTVQsU0FBU2dHLE9BQWYsQ0FBTCxFQUFnQzs7QUFFL0I7QUFDQTtBQUNBdkYsV0FBTVQsU0FBU2dHLE9BQWYsSUFBMkJELFNBQTNCO0FBQ0E7QUFDRDtBQUNEO0FBQ0Q7QUEvRWEsRUFBZjs7QUFrRkE1RyxRQUFPK0csRUFBUCxDQUFVNUQsTUFBVixDQUFrQjtBQUNqQjZELFVBQVEsZ0JBQVV2QixRQUFWLEVBQXFCO0FBQzVCLFVBQU9ELFFBQVEsSUFBUixFQUFjQyxRQUFkLEVBQXdCLElBQXhCLENBQVA7QUFDQSxHQUhnQjs7QUFLakJELFVBQVEsZ0JBQVVDLFFBQVYsRUFBcUI7QUFDNUIsVUFBT0QsUUFBUSxJQUFSLEVBQWNDLFFBQWQsQ0FBUDtBQUNBLEdBUGdCOztBQVNqQndCLFFBQU0sY0FBVTNDLEtBQVYsRUFBa0I7QUFDdkIsVUFBT25FLE9BQVEsSUFBUixFQUFjLFVBQVVtRSxLQUFWLEVBQWtCO0FBQ3RDLFdBQU9BLFVBQVVzQyxTQUFWLEdBQ041RyxPQUFPaUgsSUFBUCxDQUFhLElBQWIsQ0FETSxHQUVOLEtBQUtDLEtBQUwsR0FBYXpDLElBQWIsQ0FBbUIsWUFBVztBQUM3QixTQUFLLEtBQUtoRCxRQUFMLEtBQWtCLENBQWxCLElBQXVCLEtBQUtBLFFBQUwsS0FBa0IsRUFBekMsSUFBK0MsS0FBS0EsUUFBTCxLQUFrQixDQUF0RSxFQUEwRTtBQUN6RSxXQUFLNkQsV0FBTCxHQUFtQmhCLEtBQW5CO0FBQ0E7QUFDRCxLQUpELENBRkQ7QUFPQSxJQVJNLEVBUUosSUFSSSxFQVFFQSxLQVJGLEVBUVM2QyxVQUFVbkUsTUFSbkIsQ0FBUDtBQVNBLEdBbkJnQjs7QUFxQmpCb0UsVUFBUSxrQkFBVztBQUNsQixVQUFPM0QsU0FBVSxJQUFWLEVBQWdCMEQsU0FBaEIsRUFBMkIsVUFBVTdGLElBQVYsRUFBaUI7QUFDbEQsUUFBSyxLQUFLRyxRQUFMLEtBQWtCLENBQWxCLElBQXVCLEtBQUtBLFFBQUwsS0FBa0IsRUFBekMsSUFBK0MsS0FBS0EsUUFBTCxLQUFrQixDQUF0RSxFQUEwRTtBQUN6RSxTQUFJNEYsU0FBU2hHLG1CQUFvQixJQUFwQixFQUEwQkMsSUFBMUIsQ0FBYjtBQUNBK0YsWUFBT0MsV0FBUCxDQUFvQmhHLElBQXBCO0FBQ0E7QUFDRCxJQUxNLENBQVA7QUFNQSxHQTVCZ0I7O0FBOEJqQmlHLFdBQVMsbUJBQVc7QUFDbkIsVUFBTzlELFNBQVUsSUFBVixFQUFnQjBELFNBQWhCLEVBQTJCLFVBQVU3RixJQUFWLEVBQWlCO0FBQ2xELFFBQUssS0FBS0csUUFBTCxLQUFrQixDQUFsQixJQUF1QixLQUFLQSxRQUFMLEtBQWtCLEVBQXpDLElBQStDLEtBQUtBLFFBQUwsS0FBa0IsQ0FBdEUsRUFBMEU7QUFDekUsU0FBSTRGLFNBQVNoRyxtQkFBb0IsSUFBcEIsRUFBMEJDLElBQTFCLENBQWI7QUFDQStGLFlBQU9HLFlBQVAsQ0FBcUJsRyxJQUFyQixFQUEyQitGLE9BQU8zRixVQUFsQztBQUNBO0FBQ0QsSUFMTSxDQUFQO0FBTUEsR0FyQ2dCOztBQXVDakIrRixVQUFRLGtCQUFXO0FBQ2xCLFVBQU9oRSxTQUFVLElBQVYsRUFBZ0IwRCxTQUFoQixFQUEyQixVQUFVN0YsSUFBVixFQUFpQjtBQUNsRCxRQUFLLEtBQUt3RSxVQUFWLEVBQXVCO0FBQ3RCLFVBQUtBLFVBQUwsQ0FBZ0IwQixZQUFoQixDQUE4QmxHLElBQTlCLEVBQW9DLElBQXBDO0FBQ0E7QUFDRCxJQUpNLENBQVA7QUFLQSxHQTdDZ0I7O0FBK0NqQm9HLFNBQU8saUJBQVc7QUFDakIsVUFBT2pFLFNBQVUsSUFBVixFQUFnQjBELFNBQWhCLEVBQTJCLFVBQVU3RixJQUFWLEVBQWlCO0FBQ2xELFFBQUssS0FBS3dFLFVBQVYsRUFBdUI7QUFDdEIsVUFBS0EsVUFBTCxDQUFnQjBCLFlBQWhCLENBQThCbEcsSUFBOUIsRUFBb0MsS0FBS3FHLFdBQXpDO0FBQ0E7QUFDRCxJQUpNLENBQVA7QUFLQSxHQXJEZ0I7O0FBdURqQlQsU0FBTyxpQkFBVztBQUNqQixPQUFJNUYsSUFBSjtBQUFBLE9BQ0NnQixJQUFJLENBREw7O0FBR0EsVUFBUSxDQUFFaEIsT0FBTyxLQUFNZ0IsQ0FBTixDQUFULEtBQXdCLElBQWhDLEVBQXNDQSxHQUF0QyxFQUE0QztBQUMzQyxRQUFLaEIsS0FBS0csUUFBTCxLQUFrQixDQUF2QixFQUEyQjs7QUFFMUI7QUFDQXpCLFlBQU82RixTQUFQLENBQWtCckYsT0FBUWMsSUFBUixFQUFjLEtBQWQsQ0FBbEI7O0FBRUE7QUFDQUEsVUFBS2dFLFdBQUwsR0FBbUIsRUFBbkI7QUFDQTtBQUNEOztBQUVELFVBQU8sSUFBUDtBQUNBLEdBdkVnQjs7QUF5RWpCSixTQUFPLGVBQVVlLGFBQVYsRUFBeUJDLGlCQUF6QixFQUE2QztBQUNuREQsbUJBQWdCQSxpQkFBaUIsSUFBakIsR0FBd0IsS0FBeEIsR0FBZ0NBLGFBQWhEO0FBQ0FDLHVCQUFvQkEscUJBQXFCLElBQXJCLEdBQTRCRCxhQUE1QixHQUE0Q0MsaUJBQWhFOztBQUVBLFVBQU8sS0FBS2pCLEdBQUwsQ0FBVSxZQUFXO0FBQzNCLFdBQU9qRixPQUFPa0YsS0FBUCxDQUFjLElBQWQsRUFBb0JlLGFBQXBCLEVBQW1DQyxpQkFBbkMsQ0FBUDtBQUNBLElBRk0sQ0FBUDtBQUdBLEdBaEZnQjs7QUFrRmpCcEIsUUFBTSxjQUFVUixLQUFWLEVBQWtCO0FBQ3ZCLFVBQU9uRSxPQUFRLElBQVIsRUFBYyxVQUFVbUUsS0FBVixFQUFrQjtBQUN0QyxRQUFJaEQsT0FBTyxLQUFNLENBQU4sS0FBYSxFQUF4QjtBQUFBLFFBQ0NnQixJQUFJLENBREw7QUFBQSxRQUVDQyxJQUFJLEtBQUtTLE1BRlY7O0FBSUEsUUFBS3NCLFVBQVVzQyxTQUFWLElBQXVCdEYsS0FBS0csUUFBTCxLQUFrQixDQUE5QyxFQUFrRDtBQUNqRCxZQUFPSCxLQUFLc0csU0FBWjtBQUNBOztBQUVEO0FBQ0EsUUFBSyxPQUFPdEQsS0FBUCxLQUFpQixRQUFqQixJQUE2QixDQUFDckQsYUFBYXFDLElBQWIsQ0FBbUJnQixLQUFuQixDQUE5QixJQUNKLENBQUMvRCxRQUFTLENBQUVGLFNBQVM0QixJQUFULENBQWVxQyxLQUFmLEtBQTBCLENBQUUsRUFBRixFQUFNLEVBQU4sQ0FBNUIsRUFBMEMsQ0FBMUMsRUFBOENqQixXQUE5QyxFQUFULENBREYsRUFDMkU7O0FBRTFFaUIsYUFBUXRFLE9BQU9nRyxhQUFQLENBQXNCMUIsS0FBdEIsQ0FBUjs7QUFFQSxTQUFJO0FBQ0gsYUFBUWhDLElBQUlDLENBQVosRUFBZUQsR0FBZixFQUFxQjtBQUNwQmhCLGNBQU8sS0FBTWdCLENBQU4sS0FBYSxFQUFwQjs7QUFFQTtBQUNBLFdBQUtoQixLQUFLRyxRQUFMLEtBQWtCLENBQXZCLEVBQTJCO0FBQzFCekIsZUFBTzZGLFNBQVAsQ0FBa0JyRixPQUFRYyxJQUFSLEVBQWMsS0FBZCxDQUFsQjtBQUNBQSxhQUFLc0csU0FBTCxHQUFpQnRELEtBQWpCO0FBQ0E7QUFDRDs7QUFFRGhELGFBQU8sQ0FBUDs7QUFFRDtBQUNDLE1BZEQsQ0FjRSxPQUFRdUcsQ0FBUixFQUFZLENBQUU7QUFDaEI7O0FBRUQsUUFBS3ZHLElBQUwsRUFBWTtBQUNYLFVBQUs0RixLQUFMLEdBQWFFLE1BQWIsQ0FBcUI5QyxLQUFyQjtBQUNBO0FBQ0QsSUFuQ00sRUFtQ0osSUFuQ0ksRUFtQ0VBLEtBbkNGLEVBbUNTNkMsVUFBVW5FLE1BbkNuQixDQUFQO0FBb0NBLEdBdkhnQjs7QUF5SGpCOEUsZUFBYSx1QkFBVztBQUN2QixPQUFJakUsVUFBVSxFQUFkOztBQUVBO0FBQ0EsVUFBT0osU0FBVSxJQUFWLEVBQWdCMEQsU0FBaEIsRUFBMkIsVUFBVTdGLElBQVYsRUFBaUI7QUFDbEQsUUFBSXlHLFNBQVMsS0FBS2pDLFVBQWxCOztBQUVBLFFBQUs5RixPQUFPZ0ksT0FBUCxDQUFnQixJQUFoQixFQUFzQm5FLE9BQXRCLElBQWtDLENBQXZDLEVBQTJDO0FBQzFDN0QsWUFBTzZGLFNBQVAsQ0FBa0JyRixPQUFRLElBQVIsQ0FBbEI7QUFDQSxTQUFLdUgsTUFBTCxFQUFjO0FBQ2JBLGFBQU9FLFlBQVAsQ0FBcUIzRyxJQUFyQixFQUEyQixJQUEzQjtBQUNBO0FBQ0Q7O0FBRUY7QUFDQyxJQVhNLEVBV0p1QyxPQVhJLENBQVA7QUFZQTtBQXpJZ0IsRUFBbEI7O0FBNElBN0QsUUFBT3lFLElBQVAsQ0FBYTtBQUNaeUQsWUFBVSxRQURFO0FBRVpDLGFBQVcsU0FGQztBQUdaWCxnQkFBYyxRQUhGO0FBSVpZLGVBQWEsT0FKRDtBQUtaQyxjQUFZO0FBTEEsRUFBYixFQU1HLFVBQVVDLElBQVYsRUFBZ0JDLFFBQWhCLEVBQTJCO0FBQzdCdkksU0FBTytHLEVBQVAsQ0FBV3VCLElBQVgsSUFBb0IsVUFBVTdDLFFBQVYsRUFBcUI7QUFDeEMsT0FBSWdCLEtBQUo7QUFBQSxPQUNDK0IsTUFBTSxFQURQO0FBQUEsT0FFQ0MsU0FBU3pJLE9BQVF5RixRQUFSLENBRlY7QUFBQSxPQUdDaUQsT0FBT0QsT0FBT3pGLE1BQVAsR0FBZ0IsQ0FIeEI7QUFBQSxPQUlDVixJQUFJLENBSkw7O0FBTUEsVUFBUUEsS0FBS29HLElBQWIsRUFBbUJwRyxHQUFuQixFQUF5QjtBQUN4Qm1FLFlBQVFuRSxNQUFNb0csSUFBTixHQUFhLElBQWIsR0FBb0IsS0FBS3hELEtBQUwsQ0FBWSxJQUFaLENBQTVCO0FBQ0FsRixXQUFReUksT0FBUW5HLENBQVIsQ0FBUixFQUF1QmlHLFFBQXZCLEVBQW1DOUIsS0FBbkM7O0FBRUE7QUFDQTtBQUNBdkcsU0FBSzRELEtBQUwsQ0FBWTBFLEdBQVosRUFBaUIvQixNQUFNa0MsR0FBTixFQUFqQjtBQUNBOztBQUVELFVBQU8sS0FBS0MsU0FBTCxDQUFnQkosR0FBaEIsQ0FBUDtBQUNBLEdBakJEO0FBa0JBLEVBekJEOztBQTJCQSxRQUFPeEksTUFBUDtBQUNDLENBcmVEIiwiZmlsZSI6Im1hbmlwdWxhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZSggW1xuXHRcIi4vY29yZVwiLFxuXHRcIi4vdmFyL2NvbmNhdFwiLFxuXHRcIi4vdmFyL3B1c2hcIixcblx0XCIuL2NvcmUvYWNjZXNzXCIsXG5cdFwiLi9tYW5pcHVsYXRpb24vdmFyL3JjaGVja2FibGVUeXBlXCIsXG5cdFwiLi9tYW5pcHVsYXRpb24vdmFyL3J0YWdOYW1lXCIsXG5cdFwiLi9tYW5pcHVsYXRpb24vdmFyL3JzY3JpcHRUeXBlXCIsXG5cdFwiLi9tYW5pcHVsYXRpb24vd3JhcE1hcFwiLFxuXHRcIi4vbWFuaXB1bGF0aW9uL2dldEFsbFwiLFxuXHRcIi4vbWFuaXB1bGF0aW9uL3NldEdsb2JhbEV2YWxcIixcblx0XCIuL21hbmlwdWxhdGlvbi9idWlsZEZyYWdtZW50XCIsXG5cdFwiLi9tYW5pcHVsYXRpb24vc3VwcG9ydFwiLFxuXG5cdFwiLi9kYXRhL3Zhci9kYXRhUHJpdlwiLFxuXHRcIi4vZGF0YS92YXIvZGF0YVVzZXJcIixcblx0XCIuL2RhdGEvdmFyL2FjY2VwdERhdGFcIixcblx0XCIuL2NvcmUvRE9NRXZhbFwiLFxuXG5cdFwiLi9jb3JlL2luaXRcIixcblx0XCIuL3RyYXZlcnNpbmdcIixcblx0XCIuL3NlbGVjdG9yXCIsXG5cdFwiLi9ldmVudFwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCBjb25jYXQsIHB1c2gsIGFjY2Vzcyxcblx0cmNoZWNrYWJsZVR5cGUsIHJ0YWdOYW1lLCByc2NyaXB0VHlwZSxcblx0d3JhcE1hcCwgZ2V0QWxsLCBzZXRHbG9iYWxFdmFsLCBidWlsZEZyYWdtZW50LCBzdXBwb3J0LFxuXHRkYXRhUHJpdiwgZGF0YVVzZXIsIGFjY2VwdERhdGEsIERPTUV2YWwgKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXJcblxuXHQvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5cblx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lc2xpbnQvZXNsaW50L2lzc3Vlcy8zMjI5XG5cdHJ4aHRtbFRhZyA9IC88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFthLXpdW15cXC9cXDA+XFx4MjBcXHRcXHJcXG5cXGZdKilbXj5dKilcXC8+L2dpLFxuXG5cdC8qIGVzbGludC1lbmFibGUgKi9cblxuXHQvLyBTdXBwb3J0OiBJRSA8PTEwIC0gMTEsIEVkZ2UgMTIgLSAxM1xuXHQvLyBJbiBJRS9FZGdlIHVzaW5nIHJlZ2V4IGdyb3VwcyBoZXJlIGNhdXNlcyBzZXZlcmUgc2xvd2Rvd25zLlxuXHQvLyBTZWUgaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy8xNzM2NTEyL1xuXHRybm9Jbm5lcmh0bWwgPSAvPHNjcmlwdHw8c3R5bGV8PGxpbmsvaSxcblxuXHQvLyBjaGVja2VkPVwiY2hlY2tlZFwiIG9yIGNoZWNrZWRcblx0cmNoZWNrZWQgPSAvY2hlY2tlZFxccyooPzpbXj1dfD1cXHMqLmNoZWNrZWQuKS9pLFxuXHRyc2NyaXB0VHlwZU1hc2tlZCA9IC9edHJ1ZVxcLyguKikvLFxuXHRyY2xlYW5TY3JpcHQgPSAvXlxccyo8ISg/OlxcW0NEQVRBXFxbfC0tKXwoPzpcXF1cXF18LS0pPlxccyokL2c7XG5cbmZ1bmN0aW9uIG1hbmlwdWxhdGlvblRhcmdldCggZWxlbSwgY29udGVudCApIHtcblx0aWYgKCBqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwidGFibGVcIiApICYmXG5cdFx0alF1ZXJ5Lm5vZGVOYW1lKCBjb250ZW50Lm5vZGVUeXBlICE9PSAxMSA/IGNvbnRlbnQgOiBjb250ZW50LmZpcnN0Q2hpbGQsIFwidHJcIiApICkge1xuXG5cdFx0cmV0dXJuIGVsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwidGJvZHlcIiApWyAwIF0gfHwgZWxlbTtcblx0fVxuXG5cdHJldHVybiBlbGVtO1xufVxuXG4vLyBSZXBsYWNlL3Jlc3RvcmUgdGhlIHR5cGUgYXR0cmlidXRlIG9mIHNjcmlwdCBlbGVtZW50cyBmb3Igc2FmZSBET00gbWFuaXB1bGF0aW9uXG5mdW5jdGlvbiBkaXNhYmxlU2NyaXB0KCBlbGVtICkge1xuXHRlbGVtLnR5cGUgPSAoIGVsZW0uZ2V0QXR0cmlidXRlKCBcInR5cGVcIiApICE9PSBudWxsICkgKyBcIi9cIiArIGVsZW0udHlwZTtcblx0cmV0dXJuIGVsZW07XG59XG5mdW5jdGlvbiByZXN0b3JlU2NyaXB0KCBlbGVtICkge1xuXHR2YXIgbWF0Y2ggPSByc2NyaXB0VHlwZU1hc2tlZC5leGVjKCBlbGVtLnR5cGUgKTtcblxuXHRpZiAoIG1hdGNoICkge1xuXHRcdGVsZW0udHlwZSA9IG1hdGNoWyAxIF07XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIFwidHlwZVwiICk7XG5cdH1cblxuXHRyZXR1cm4gZWxlbTtcbn1cblxuZnVuY3Rpb24gY2xvbmVDb3B5RXZlbnQoIHNyYywgZGVzdCApIHtcblx0dmFyIGksIGwsIHR5cGUsIHBkYXRhT2xkLCBwZGF0YUN1ciwgdWRhdGFPbGQsIHVkYXRhQ3VyLCBldmVudHM7XG5cblx0aWYgKCBkZXN0Lm5vZGVUeXBlICE9PSAxICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIDEuIENvcHkgcHJpdmF0ZSBkYXRhOiBldmVudHMsIGhhbmRsZXJzLCBldGMuXG5cdGlmICggZGF0YVByaXYuaGFzRGF0YSggc3JjICkgKSB7XG5cdFx0cGRhdGFPbGQgPSBkYXRhUHJpdi5hY2Nlc3MoIHNyYyApO1xuXHRcdHBkYXRhQ3VyID0gZGF0YVByaXYuc2V0KCBkZXN0LCBwZGF0YU9sZCApO1xuXHRcdGV2ZW50cyA9IHBkYXRhT2xkLmV2ZW50cztcblxuXHRcdGlmICggZXZlbnRzICkge1xuXHRcdFx0ZGVsZXRlIHBkYXRhQ3VyLmhhbmRsZTtcblx0XHRcdHBkYXRhQ3VyLmV2ZW50cyA9IHt9O1xuXG5cdFx0XHRmb3IgKCB0eXBlIGluIGV2ZW50cyApIHtcblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBldmVudHNbIHR5cGUgXS5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmFkZCggZGVzdCwgdHlwZSwgZXZlbnRzWyB0eXBlIF1bIGkgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gMi4gQ29weSB1c2VyIGRhdGFcblx0aWYgKCBkYXRhVXNlci5oYXNEYXRhKCBzcmMgKSApIHtcblx0XHR1ZGF0YU9sZCA9IGRhdGFVc2VyLmFjY2Vzcyggc3JjICk7XG5cdFx0dWRhdGFDdXIgPSBqUXVlcnkuZXh0ZW5kKCB7fSwgdWRhdGFPbGQgKTtcblxuXHRcdGRhdGFVc2VyLnNldCggZGVzdCwgdWRhdGFDdXIgKTtcblx0fVxufVxuXG4vLyBGaXggSUUgYnVncywgc2VlIHN1cHBvcnQgdGVzdHNcbmZ1bmN0aW9uIGZpeElucHV0KCBzcmMsIGRlc3QgKSB7XG5cdHZhciBub2RlTmFtZSA9IGRlc3Qubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblxuXHQvLyBGYWlscyB0byBwZXJzaXN0IHRoZSBjaGVja2VkIHN0YXRlIG9mIGEgY2xvbmVkIGNoZWNrYm94IG9yIHJhZGlvIGJ1dHRvbi5cblx0aWYgKCBub2RlTmFtZSA9PT0gXCJpbnB1dFwiICYmIHJjaGVja2FibGVUeXBlLnRlc3QoIHNyYy50eXBlICkgKSB7XG5cdFx0ZGVzdC5jaGVja2VkID0gc3JjLmNoZWNrZWQ7XG5cblx0Ly8gRmFpbHMgdG8gcmV0dXJuIHRoZSBzZWxlY3RlZCBvcHRpb24gdG8gdGhlIGRlZmF1bHQgc2VsZWN0ZWQgc3RhdGUgd2hlbiBjbG9uaW5nIG9wdGlvbnNcblx0fSBlbHNlIGlmICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiB8fCBub2RlTmFtZSA9PT0gXCJ0ZXh0YXJlYVwiICkge1xuXHRcdGRlc3QuZGVmYXVsdFZhbHVlID0gc3JjLmRlZmF1bHRWYWx1ZTtcblx0fVxufVxuXG5mdW5jdGlvbiBkb21NYW5pcCggY29sbGVjdGlvbiwgYXJncywgY2FsbGJhY2ssIGlnbm9yZWQgKSB7XG5cblx0Ly8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuXHRhcmdzID0gY29uY2F0LmFwcGx5KCBbXSwgYXJncyApO1xuXG5cdHZhciBmcmFnbWVudCwgZmlyc3QsIHNjcmlwdHMsIGhhc1NjcmlwdHMsIG5vZGUsIGRvYyxcblx0XHRpID0gMCxcblx0XHRsID0gY29sbGVjdGlvbi5sZW5ndGgsXG5cdFx0aU5vQ2xvbmUgPSBsIC0gMSxcblx0XHR2YWx1ZSA9IGFyZ3NbIDAgXSxcblx0XHRpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICk7XG5cblx0Ly8gV2UgY2FuJ3QgY2xvbmVOb2RlIGZyYWdtZW50cyB0aGF0IGNvbnRhaW4gY2hlY2tlZCwgaW4gV2ViS2l0XG5cdGlmICggaXNGdW5jdGlvbiB8fFxuXHRcdFx0KCBsID4gMSAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiZcblx0XHRcdFx0IXN1cHBvcnQuY2hlY2tDbG9uZSAmJiByY2hlY2tlZC50ZXN0KCB2YWx1ZSApICkgKSB7XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb24uZWFjaCggZnVuY3Rpb24oIGluZGV4ICkge1xuXHRcdFx0dmFyIHNlbGYgPSBjb2xsZWN0aW9uLmVxKCBpbmRleCApO1xuXHRcdFx0aWYgKCBpc0Z1bmN0aW9uICkge1xuXHRcdFx0XHRhcmdzWyAwIF0gPSB2YWx1ZS5jYWxsKCB0aGlzLCBpbmRleCwgc2VsZi5odG1sKCkgKTtcblx0XHRcdH1cblx0XHRcdGRvbU1hbmlwKCBzZWxmLCBhcmdzLCBjYWxsYmFjaywgaWdub3JlZCApO1xuXHRcdH0gKTtcblx0fVxuXG5cdGlmICggbCApIHtcblx0XHRmcmFnbWVudCA9IGJ1aWxkRnJhZ21lbnQoIGFyZ3MsIGNvbGxlY3Rpb25bIDAgXS5vd25lckRvY3VtZW50LCBmYWxzZSwgY29sbGVjdGlvbiwgaWdub3JlZCApO1xuXHRcdGZpcnN0ID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuXHRcdGlmICggZnJhZ21lbnQuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgKSB7XG5cdFx0XHRmcmFnbWVudCA9IGZpcnN0O1xuXHRcdH1cblxuXHRcdC8vIFJlcXVpcmUgZWl0aGVyIG5ldyBjb250ZW50IG9yIGFuIGludGVyZXN0IGluIGlnbm9yZWQgZWxlbWVudHMgdG8gaW52b2tlIHRoZSBjYWxsYmFja1xuXHRcdGlmICggZmlyc3QgfHwgaWdub3JlZCApIHtcblx0XHRcdHNjcmlwdHMgPSBqUXVlcnkubWFwKCBnZXRBbGwoIGZyYWdtZW50LCBcInNjcmlwdFwiICksIGRpc2FibGVTY3JpcHQgKTtcblx0XHRcdGhhc1NjcmlwdHMgPSBzY3JpcHRzLmxlbmd0aDtcblxuXHRcdFx0Ly8gVXNlIHRoZSBvcmlnaW5hbCBmcmFnbWVudCBmb3IgdGhlIGxhc3QgaXRlbVxuXHRcdFx0Ly8gaW5zdGVhZCBvZiB0aGUgZmlyc3QgYmVjYXVzZSBpdCBjYW4gZW5kIHVwXG5cdFx0XHQvLyBiZWluZyBlbXB0aWVkIGluY29ycmVjdGx5IGluIGNlcnRhaW4gc2l0dWF0aW9ucyAoIzgwNzApLlxuXHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRub2RlID0gZnJhZ21lbnQ7XG5cblx0XHRcdFx0aWYgKCBpICE9PSBpTm9DbG9uZSApIHtcblx0XHRcdFx0XHRub2RlID0galF1ZXJ5LmNsb25lKCBub2RlLCB0cnVlLCB0cnVlICk7XG5cblx0XHRcdFx0XHQvLyBLZWVwIHJlZmVyZW5jZXMgdG8gY2xvbmVkIHNjcmlwdHMgZm9yIGxhdGVyIHJlc3RvcmF0aW9uXG5cdFx0XHRcdFx0aWYgKCBoYXNTY3JpcHRzICkge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggc2NyaXB0cywgZ2V0QWxsKCBub2RlLCBcInNjcmlwdFwiICkgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYWxsYmFjay5jYWxsKCBjb2xsZWN0aW9uWyBpIF0sIG5vZGUsIGkgKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBoYXNTY3JpcHRzICkge1xuXHRcdFx0XHRkb2MgPSBzY3JpcHRzWyBzY3JpcHRzLmxlbmd0aCAtIDEgXS5vd25lckRvY3VtZW50O1xuXG5cdFx0XHRcdC8vIFJlZW5hYmxlIHNjcmlwdHNcblx0XHRcdFx0alF1ZXJ5Lm1hcCggc2NyaXB0cywgcmVzdG9yZVNjcmlwdCApO1xuXG5cdFx0XHRcdC8vIEV2YWx1YXRlIGV4ZWN1dGFibGUgc2NyaXB0cyBvbiBmaXJzdCBkb2N1bWVudCBpbnNlcnRpb25cblx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBoYXNTY3JpcHRzOyBpKysgKSB7XG5cdFx0XHRcdFx0bm9kZSA9IHNjcmlwdHNbIGkgXTtcblx0XHRcdFx0XHRpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIG5vZGUudHlwZSB8fCBcIlwiICkgJiZcblx0XHRcdFx0XHRcdCFkYXRhUHJpdi5hY2Nlc3MoIG5vZGUsIFwiZ2xvYmFsRXZhbFwiICkgJiZcblx0XHRcdFx0XHRcdGpRdWVyeS5jb250YWlucyggZG9jLCBub2RlICkgKSB7XG5cblx0XHRcdFx0XHRcdGlmICggbm9kZS5zcmMgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gT3B0aW9uYWwgQUpBWCBkZXBlbmRlbmN5LCBidXQgd29uJ3QgcnVuIHNjcmlwdHMgaWYgbm90IHByZXNlbnRcblx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuX2V2YWxVcmwgKSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5Ll9ldmFsVXJsKCBub2RlLnNyYyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRET01FdmFsKCBub2RlLnRleHRDb250ZW50LnJlcGxhY2UoIHJjbGVhblNjcmlwdCwgXCJcIiApLCBkb2MgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY29sbGVjdGlvbjtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKCBlbGVtLCBzZWxlY3Rvciwga2VlcERhdGEgKSB7XG5cdHZhciBub2RlLFxuXHRcdG5vZGVzID0gc2VsZWN0b3IgPyBqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgZWxlbSApIDogZWxlbSxcblx0XHRpID0gMDtcblxuXHRmb3IgKCA7ICggbm9kZSA9IG5vZGVzWyBpIF0gKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0aWYgKCAha2VlcERhdGEgJiYgbm9kZS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggbm9kZSApICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBub2RlLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRpZiAoIGtlZXBEYXRhICYmIGpRdWVyeS5jb250YWlucyggbm9kZS5vd25lckRvY3VtZW50LCBub2RlICkgKSB7XG5cdFx0XHRcdHNldEdsb2JhbEV2YWwoIGdldEFsbCggbm9kZSwgXCJzY3JpcHRcIiApICk7XG5cdFx0XHR9XG5cdFx0XHRub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIG5vZGUgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZWxlbTtcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXHRodG1sUHJlZmlsdGVyOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHRyZXR1cm4gaHRtbC5yZXBsYWNlKCByeGh0bWxUYWcsIFwiPCQxPjwvJDI+XCIgKTtcblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24oIGVsZW0sIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdHZhciBpLCBsLCBzcmNFbGVtZW50cywgZGVzdEVsZW1lbnRzLFxuXHRcdFx0Y2xvbmUgPSBlbGVtLmNsb25lTm9kZSggdHJ1ZSApLFxuXHRcdFx0aW5QYWdlID0galF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKTtcblxuXHRcdC8vIEZpeCBJRSBjbG9uaW5nIGlzc3Vlc1xuXHRcdGlmICggIXN1cHBvcnQubm9DbG9uZUNoZWNrZWQgJiYgKCBlbGVtLm5vZGVUeXBlID09PSAxIHx8IGVsZW0ubm9kZVR5cGUgPT09IDExICkgJiZcblx0XHRcdFx0IWpRdWVyeS5pc1hNTERvYyggZWxlbSApICkge1xuXG5cdFx0XHQvLyBXZSBlc2NoZXcgU2l6emxlIGhlcmUgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnM6IGh0dHBzOi8vanNwZXJmLmNvbS9nZXRhbGwtdnMtc2l6emxlLzJcblx0XHRcdGRlc3RFbGVtZW50cyA9IGdldEFsbCggY2xvbmUgKTtcblx0XHRcdHNyY0VsZW1lbnRzID0gZ2V0QWxsKCBlbGVtICk7XG5cblx0XHRcdGZvciAoIGkgPSAwLCBsID0gc3JjRWxlbWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRmaXhJbnB1dCggc3JjRWxlbWVudHNbIGkgXSwgZGVzdEVsZW1lbnRzWyBpIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDb3B5IHRoZSBldmVudHMgZnJvbSB0aGUgb3JpZ2luYWwgdG8gdGhlIGNsb25lXG5cdFx0aWYgKCBkYXRhQW5kRXZlbnRzICkge1xuXHRcdFx0aWYgKCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHRcdFx0c3JjRWxlbWVudHMgPSBzcmNFbGVtZW50cyB8fCBnZXRBbGwoIGVsZW0gKTtcblx0XHRcdFx0ZGVzdEVsZW1lbnRzID0gZGVzdEVsZW1lbnRzIHx8IGdldEFsbCggY2xvbmUgKTtcblxuXHRcdFx0XHRmb3IgKCBpID0gMCwgbCA9IHNyY0VsZW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRjbG9uZUNvcHlFdmVudCggc3JjRWxlbWVudHNbIGkgXSwgZGVzdEVsZW1lbnRzWyBpIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2xvbmVDb3B5RXZlbnQoIGVsZW0sIGNsb25lICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUHJlc2VydmUgc2NyaXB0IGV2YWx1YXRpb24gaGlzdG9yeVxuXHRcdGRlc3RFbGVtZW50cyA9IGdldEFsbCggY2xvbmUsIFwic2NyaXB0XCIgKTtcblx0XHRpZiAoIGRlc3RFbGVtZW50cy5sZW5ndGggPiAwICkge1xuXHRcdFx0c2V0R2xvYmFsRXZhbCggZGVzdEVsZW1lbnRzLCAhaW5QYWdlICYmIGdldEFsbCggZWxlbSwgXCJzY3JpcHRcIiApICk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIHRoZSBjbG9uZWQgc2V0XG5cdFx0cmV0dXJuIGNsb25lO1xuXHR9LFxuXG5cdGNsZWFuRGF0YTogZnVuY3Rpb24oIGVsZW1zICkge1xuXHRcdHZhciBkYXRhLCBlbGVtLCB0eXBlLFxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7ICggZWxlbSA9IGVsZW1zWyBpIF0gKSAhPT0gdW5kZWZpbmVkOyBpKysgKSB7XG5cdFx0XHRpZiAoIGFjY2VwdERhdGEoIGVsZW0gKSApIHtcblx0XHRcdFx0aWYgKCAoIGRhdGEgPSBlbGVtWyBkYXRhUHJpdi5leHBhbmRvIF0gKSApIHtcblx0XHRcdFx0XHRpZiAoIGRhdGEuZXZlbnRzICkge1xuXHRcdFx0XHRcdFx0Zm9yICggdHlwZSBpbiBkYXRhLmV2ZW50cyApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCBzcGVjaWFsWyB0eXBlIF0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggZWxlbSwgdHlwZSApO1xuXG5cdFx0XHRcdFx0XHRcdC8vIFRoaXMgaXMgYSBzaG9ydGN1dCB0byBhdm9pZCBqUXVlcnkuZXZlbnQucmVtb3ZlJ3Mgb3ZlcmhlYWRcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkucmVtb3ZlRXZlbnQoIGVsZW0sIHR5cGUsIGRhdGEuaGFuZGxlICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWUgPD0zNSAtIDQ1K1xuXHRcdFx0XHRcdC8vIEFzc2lnbiB1bmRlZmluZWQgaW5zdGVhZCBvZiB1c2luZyBkZWxldGUsIHNlZSBEYXRhI3JlbW92ZVxuXHRcdFx0XHRcdGVsZW1bIGRhdGFQcml2LmV4cGFuZG8gXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGVsZW1bIGRhdGFVc2VyLmV4cGFuZG8gXSApIHtcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZSA8PTM1IC0gNDUrXG5cdFx0XHRcdFx0Ly8gQXNzaWduIHVuZGVmaW5lZCBpbnN0ZWFkIG9mIHVzaW5nIGRlbGV0ZSwgc2VlIERhdGEjcmVtb3ZlXG5cdFx0XHRcdFx0ZWxlbVsgZGF0YVVzZXIuZXhwYW5kbyBdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0ZGV0YWNoOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHJlbW92ZSggdGhpcywgc2VsZWN0b3IsIHRydWUgKTtcblx0fSxcblxuXHRyZW1vdmU6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gcmVtb3ZlKCB0aGlzLCBzZWxlY3RvciApO1xuXHR9LFxuXG5cdHRleHQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdGpRdWVyeS50ZXh0KCB0aGlzICkgOlxuXHRcdFx0XHR0aGlzLmVtcHR5KCkuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0fSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggKTtcblx0fSxcblxuXHRhcHBlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KCB0aGlzLCBlbGVtICk7XG5cdFx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZCggZWxlbSApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRwcmVwZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0dmFyIHRhcmdldCA9IG1hbmlwdWxhdGlvblRhcmdldCggdGhpcywgZWxlbSApO1xuXHRcdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0YXJnZXQuZmlyc3RDaGlsZCApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRiZWZvcmU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5wYXJlbnROb2RlICkge1xuXHRcdFx0XHR0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGFmdGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0dGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggZWxlbSwgdGhpcy5uZXh0U2libGluZyApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRlbXB0eTogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGVsZW0sXG5cdFx0XHRpID0gMDtcblxuXHRcdGZvciAoIDsgKCBlbGVtID0gdGhpc1sgaSBdICkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbWVtb3J5IGxlYWtzXG5cdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuXG5cdFx0XHRcdC8vIFJlbW92ZSBhbnkgcmVtYWluaW5nIG5vZGVzXG5cdFx0XHRcdGVsZW0udGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGNsb25lOiBmdW5jdGlvbiggZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0ZGF0YUFuZEV2ZW50cyA9IGRhdGFBbmRFdmVudHMgPT0gbnVsbCA/IGZhbHNlIDogZGF0YUFuZEV2ZW50cztcblx0XHRkZWVwRGF0YUFuZEV2ZW50cyA9IGRlZXBEYXRhQW5kRXZlbnRzID09IG51bGwgPyBkYXRhQW5kRXZlbnRzIDogZGVlcERhdGFBbmRFdmVudHM7XG5cblx0XHRyZXR1cm4gdGhpcy5tYXAoIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5jbG9uZSggdGhpcywgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKTtcblx0XHR9ICk7XG5cdH0sXG5cblx0aHRtbDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBlbGVtID0gdGhpc1sgMCBdIHx8IHt9LFxuXHRcdFx0XHRpID0gMCxcblx0XHRcdFx0bCA9IHRoaXMubGVuZ3RoO1xuXG5cdFx0XHRpZiAoIHZhbHVlID09PSB1bmRlZmluZWQgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0cmV0dXJuIGVsZW0uaW5uZXJIVE1MO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZWUgaWYgd2UgY2FuIHRha2UgYSBzaG9ydGN1dCBhbmQganVzdCB1c2UgaW5uZXJIVE1MXG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiAhcm5vSW5uZXJodG1sLnRlc3QoIHZhbHVlICkgJiZcblx0XHRcdFx0IXdyYXBNYXBbICggcnRhZ05hbWUuZXhlYyggdmFsdWUgKSB8fCBbIFwiXCIsIFwiXCIgXSApWyAxIF0udG9Mb3dlckNhc2UoKSBdICkge1xuXG5cdFx0XHRcdHZhbHVlID0galF1ZXJ5Lmh0bWxQcmVmaWx0ZXIoIHZhbHVlICk7XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0XHRlbGVtID0gdGhpc1sgaSBdIHx8IHt9O1xuXG5cdFx0XHRcdFx0XHQvLyBSZW1vdmUgZWxlbWVudCBub2RlcyBhbmQgcHJldmVudCBtZW1vcnkgbGVha3Ncblx0XHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBlbGVtLCBmYWxzZSApICk7XG5cdFx0XHRcdFx0XHRcdGVsZW0uaW5uZXJIVE1MID0gdmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZWxlbSA9IDA7XG5cblx0XHRcdFx0Ly8gSWYgdXNpbmcgaW5uZXJIVE1MIHRocm93cyBhbiBleGNlcHRpb24sIHVzZSB0aGUgZmFsbGJhY2sgbWV0aG9kXG5cdFx0XHRcdH0gY2F0Y2ggKCBlICkge31cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0XHR0aGlzLmVtcHR5KCkuYXBwZW5kKCB2YWx1ZSApO1xuXHRcdFx0fVxuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH0sXG5cblx0cmVwbGFjZVdpdGg6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBpZ25vcmVkID0gW107XG5cblx0XHQvLyBNYWtlIHRoZSBjaGFuZ2VzLCByZXBsYWNpbmcgZWFjaCBub24taWdub3JlZCBjb250ZXh0IGVsZW1lbnQgd2l0aCB0aGUgbmV3IGNvbnRlbnRcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuXG5cdFx0XHRpZiAoIGpRdWVyeS5pbkFycmF5KCB0aGlzLCBpZ25vcmVkICkgPCAwICkge1xuXHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIHRoaXMgKSApO1xuXHRcdFx0XHRpZiAoIHBhcmVudCApIHtcblx0XHRcdFx0XHRwYXJlbnQucmVwbGFjZUNoaWxkKCBlbGVtLCB0aGlzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdC8vIEZvcmNlIGNhbGxiYWNrIGludm9jYXRpb25cblx0XHR9LCBpZ25vcmVkICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmVhY2goIHtcblx0YXBwZW5kVG86IFwiYXBwZW5kXCIsXG5cdHByZXBlbmRUbzogXCJwcmVwZW5kXCIsXG5cdGluc2VydEJlZm9yZTogXCJiZWZvcmVcIixcblx0aW5zZXJ0QWZ0ZXI6IFwiYWZ0ZXJcIixcblx0cmVwbGFjZUFsbDogXCJyZXBsYWNlV2l0aFwiXG59LCBmdW5jdGlvbiggbmFtZSwgb3JpZ2luYWwgKSB7XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHZhciBlbGVtcyxcblx0XHRcdHJldCA9IFtdLFxuXHRcdFx0aW5zZXJ0ID0galF1ZXJ5KCBzZWxlY3RvciApLFxuXHRcdFx0bGFzdCA9IGluc2VydC5sZW5ndGggLSAxLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7IGkgPD0gbGFzdDsgaSsrICkge1xuXHRcdFx0ZWxlbXMgPSBpID09PSBsYXN0ID8gdGhpcyA6IHRoaXMuY2xvbmUoIHRydWUgKTtcblx0XHRcdGpRdWVyeSggaW5zZXJ0WyBpIF0gKVsgb3JpZ2luYWwgXSggZWxlbXMgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5LCBQaGFudG9tSlMgMSBvbmx5XG5cdFx0XHQvLyAuZ2V0KCkgYmVjYXVzZSBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdFx0XHRwdXNoLmFwcGx5KCByZXQsIGVsZW1zLmdldCgpICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCByZXQgKTtcblx0fTtcbn0gKTtcblxucmV0dXJuIGpRdWVyeTtcbn0gKTtcbiJdfQ==