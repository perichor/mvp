"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define(["./core", "./var/document", "./var/documentElement", "./var/rnothtmlwhite", "./var/slice", "./data/var/dataPriv", "./core/init", "./selector"], function (jQuery, document, documentElement, rnothtmlwhite, slice, dataPriv) {

	"use strict";

	var rkeyEvent = /^key/,
	    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}

	function _on(elem, types, selector, data, fn, one) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

			// ( types-Object, selector, data )
			if (typeof selector !== "string") {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				_on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}

		if (data == null && fn == null) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}

		if (one === 1) {
			origFn = fn;
			fn = function fn(event) {

				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
  * Helper functions for managing events -- not part of the public interface.
  * Props to Dean Edwards' addEvent library for many of the ideas.
  */
	jQuery.event = {

		global: {},

		add: function add(elem, types, handler, data, selector) {

			var handleObjIn,
			    eventHandle,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if (selector) {
				jQuery.find.matchesSelector(documentElement, selector);
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove: function remove(elem, types, handler, selector, mappedTypes) {

			var j,
			    origCount,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

			if (!elemData || !(events = elemData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);

						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},

		dispatch: function dispatch(nativeEvent) {

			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix(nativeEvent);

			var i,
			    j,
			    ret,
			    matched,
			    handleObj,
			    handlerQueue,
			    args = new Array(arguments.length),
			    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
			    special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;

			for (i = 1; i < arguments.length; i++) {
				args[i] = arguments[i];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function handlers(event, _handlers) {
			var i,
			    handleObj,
			    sel,
			    matchedHandlers,
			    matchedSelectors,
			    handlerQueue = [],
			    delegateCount = _handlers.delegateCount,
			    cur = event.target;

			// Find delegate handlers
			if (delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!(event.type === "click" && event.button >= 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
						matchedHandlers = [];
						matchedSelectors = {};
						for (i = 0; i < delegateCount; i++) {
							handleObj = _handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matchedSelectors[sel] === undefined) {
								matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
							}
							if (matchedSelectors[sel]) {
								matchedHandlers.push(handleObj);
							}
						}
						if (matchedHandlers.length) {
							handlerQueue.push({ elem: cur, handlers: matchedHandlers });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if (delegateCount < _handlers.length) {
				handlerQueue.push({ elem: cur, handlers: _handlers.slice(delegateCount) });
			}

			return handlerQueue;
		},

		addProp: function addProp(name, hook) {
			Object.defineProperty(jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: jQuery.isFunction(hook) ? function () {
					if (this.originalEvent) {
						return hook(this.originalEvent);
					}
				} : function () {
					if (this.originalEvent) {
						return this.originalEvent[name];
					}
				},

				set: function set(value) {
					Object.defineProperty(this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					});
				}
			});
		},

		fix: function fix(originalEvent) {
			return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function trigger() {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function trigger() {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function trigger() {
					if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function _default(event) {
					return jQuery.nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function postDispatch(event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function (elem, type, handle) {

		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

			// Support: Android <=2.3 only
			src.returnValue === false ? returnTrue : returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

			// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function preventDefault() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e && !this.isSimulated) {
				e.preventDefault();
			}
		},
		stopPropagation: function stopPropagation() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function stopImmediatePropagation() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each({
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which: function which(event) {
			var button = event.button;

			// Add which for key events
			if (event.which == null && rkeyEvent.test(event.type)) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
				if (button & 1) {
					return 1;
				}

				if (button & 2) {
					return 3;
				}

				if (button & 4) {
					return 2;
				}

				return 0;
			}

			return event.which;
		}
	}, jQuery.event.addProp);

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function handle(event) {
				var ret,
				    target = this,
				    related = event.relatedTarget,
				    handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || related !== target && !jQuery.contains(target, related)) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	jQuery.fn.extend({

		on: function on(types, selector, data, fn) {
			return _on(this, types, selector, data, fn);
		},
		one: function one(types, selector, data, fn) {
			return _on(this, types, selector, data, fn, 1);
		},
		off: function off(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this;
			}
			if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9ldmVudC5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCJqUXVlcnkiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsInJub3RodG1sd2hpdGUiLCJzbGljZSIsImRhdGFQcml2IiwicmtleUV2ZW50Iiwicm1vdXNlRXZlbnQiLCJydHlwZW5hbWVzcGFjZSIsInJldHVyblRydWUiLCJyZXR1cm5GYWxzZSIsInNhZmVBY3RpdmVFbGVtZW50IiwiYWN0aXZlRWxlbWVudCIsImVyciIsIm9uIiwiZWxlbSIsInR5cGVzIiwic2VsZWN0b3IiLCJkYXRhIiwiZm4iLCJvbmUiLCJvcmlnRm4iLCJ0eXBlIiwidW5kZWZpbmVkIiwiZXZlbnQiLCJvZmYiLCJhcHBseSIsImFyZ3VtZW50cyIsImd1aWQiLCJlYWNoIiwiYWRkIiwiZ2xvYmFsIiwiaGFuZGxlciIsImhhbmRsZU9iakluIiwiZXZlbnRIYW5kbGUiLCJ0bXAiLCJldmVudHMiLCJ0IiwiaGFuZGxlT2JqIiwic3BlY2lhbCIsImhhbmRsZXJzIiwibmFtZXNwYWNlcyIsIm9yaWdUeXBlIiwiZWxlbURhdGEiLCJnZXQiLCJmaW5kIiwibWF0Y2hlc1NlbGVjdG9yIiwiaGFuZGxlIiwiZSIsInRyaWdnZXJlZCIsImRpc3BhdGNoIiwibWF0Y2giLCJsZW5ndGgiLCJleGVjIiwic3BsaXQiLCJzb3J0IiwiZGVsZWdhdGVUeXBlIiwiYmluZFR5cGUiLCJleHRlbmQiLCJuZWVkc0NvbnRleHQiLCJleHByIiwidGVzdCIsIm5hbWVzcGFjZSIsImpvaW4iLCJkZWxlZ2F0ZUNvdW50Iiwic2V0dXAiLCJjYWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNwbGljZSIsInB1c2giLCJyZW1vdmUiLCJtYXBwZWRUeXBlcyIsImoiLCJvcmlnQ291bnQiLCJoYXNEYXRhIiwiUmVnRXhwIiwidGVhcmRvd24iLCJyZW1vdmVFdmVudCIsImlzRW1wdHlPYmplY3QiLCJuYXRpdmVFdmVudCIsImZpeCIsImkiLCJyZXQiLCJtYXRjaGVkIiwiaGFuZGxlclF1ZXVlIiwiYXJncyIsIkFycmF5IiwiZGVsZWdhdGVUYXJnZXQiLCJwcmVEaXNwYXRjaCIsImlzUHJvcGFnYXRpb25TdG9wcGVkIiwiY3VycmVudFRhcmdldCIsImlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkIiwicm5hbWVzcGFjZSIsInJlc3VsdCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwicG9zdERpc3BhdGNoIiwic2VsIiwibWF0Y2hlZEhhbmRsZXJzIiwibWF0Y2hlZFNlbGVjdG9ycyIsImN1ciIsInRhcmdldCIsIm5vZGVUeXBlIiwiYnV0dG9uIiwicGFyZW50Tm9kZSIsImRpc2FibGVkIiwiaW5kZXgiLCJhZGRQcm9wIiwibmFtZSIsImhvb2siLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsIkV2ZW50IiwicHJvdG90eXBlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImlzRnVuY3Rpb24iLCJvcmlnaW5hbEV2ZW50Iiwic2V0IiwidmFsdWUiLCJ3cml0YWJsZSIsImV4cGFuZG8iLCJsb2FkIiwibm9CdWJibGUiLCJmb2N1cyIsInRyaWdnZXIiLCJibHVyIiwiY2xpY2siLCJub2RlTmFtZSIsIl9kZWZhdWx0IiwiYmVmb3JldW5sb2FkIiwicmV0dXJuVmFsdWUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic3JjIiwicHJvcHMiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJkZWZhdWx0UHJldmVudGVkIiwicmVsYXRlZFRhcmdldCIsInRpbWVTdGFtcCIsIm5vdyIsImNvbnN0cnVjdG9yIiwiaXNTaW11bGF0ZWQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJhbHRLZXkiLCJidWJibGVzIiwiY2FuY2VsYWJsZSIsImNoYW5nZWRUb3VjaGVzIiwiY3RybEtleSIsImRldGFpbCIsImV2ZW50UGhhc2UiLCJtZXRhS2V5IiwicGFnZVgiLCJwYWdlWSIsInNoaWZ0S2V5IiwidmlldyIsImNoYXJDb2RlIiwia2V5Iiwia2V5Q29kZSIsImJ1dHRvbnMiLCJjbGllbnRYIiwiY2xpZW50WSIsIm9mZnNldFgiLCJvZmZzZXRZIiwicG9pbnRlcklkIiwicG9pbnRlclR5cGUiLCJzY3JlZW5YIiwic2NyZWVuWSIsInRhcmdldFRvdWNoZXMiLCJ0b0VsZW1lbnQiLCJ0b3VjaGVzIiwid2hpY2giLCJtb3VzZWVudGVyIiwibW91c2VsZWF2ZSIsInBvaW50ZXJlbnRlciIsInBvaW50ZXJsZWF2ZSIsIm9yaWciLCJyZWxhdGVkIiwiY29udGFpbnMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQUEsT0FBUSxDQUNQLFFBRE8sRUFFUCxnQkFGTyxFQUdQLHVCQUhPLEVBSVAscUJBSk8sRUFLUCxhQUxPLEVBTVAscUJBTk8sRUFRUCxhQVJPLEVBU1AsWUFUTyxDQUFSLEVBVUcsVUFBVUMsTUFBVixFQUFrQkMsUUFBbEIsRUFBNEJDLGVBQTVCLEVBQTZDQyxhQUE3QyxFQUE0REMsS0FBNUQsRUFBbUVDLFFBQW5FLEVBQThFOztBQUVqRjs7QUFFQSxLQUNDQyxZQUFZLE1BRGI7QUFBQSxLQUVDQyxjQUFjLGdEQUZmO0FBQUEsS0FHQ0MsaUJBQWlCLHFCQUhsQjs7QUFLQSxVQUFTQyxVQUFULEdBQXNCO0FBQ3JCLFNBQU8sSUFBUDtBQUNBOztBQUVELFVBQVNDLFdBQVQsR0FBdUI7QUFDdEIsU0FBTyxLQUFQO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBLFVBQVNDLGlCQUFULEdBQTZCO0FBQzVCLE1BQUk7QUFDSCxVQUFPVixTQUFTVyxhQUFoQjtBQUNBLEdBRkQsQ0FFRSxPQUFRQyxHQUFSLEVBQWMsQ0FBRztBQUNuQjs7QUFFRCxVQUFTQyxHQUFULENBQWFDLElBQWIsRUFBbUJDLEtBQW5CLEVBQTBCQyxRQUExQixFQUFvQ0MsSUFBcEMsRUFBMENDLEVBQTFDLEVBQThDQyxHQUE5QyxFQUFvRDtBQUNuRCxNQUFJQyxNQUFKLEVBQVlDLElBQVo7O0FBRUE7QUFDQSxNQUFLLFFBQU9OLEtBQVAseUNBQU9BLEtBQVAs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QUFLbUIsSUFBTCxDQUFXLFlBQVc7QUFDNUI3QixXQUFPd0IsS0FBUCxDQUFhOEMsTUFBYixDQUFxQixJQUFyQixFQUEyQnRELEtBQTNCLEVBQWtDRyxFQUFsQyxFQUFzQ0YsUUFBdEM7QUFDQSxJQUZNLENBQVA7QUFHQTtBQTNDZ0IsRUFBbEI7O0FBOENBLFFBQU9qQixNQUFQO0FBQ0MsQ0F4dUJEIiwiZmlsZSI6ImV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKCBbXG5cdFwiLi9jb3JlXCIsXG5cdFwiLi92YXIvZG9jdW1lbnRcIixcblx0XCIuL3Zhci9kb2N1bWVudEVsZW1lbnRcIixcblx0XCIuL3Zhci9ybm90aHRtbHdoaXRlXCIsXG5cdFwiLi92YXIvc2xpY2VcIixcblx0XCIuL2RhdGEvdmFyL2RhdGFQcml2XCIsXG5cblx0XCIuL2NvcmUvaW5pdFwiLFxuXHRcIi4vc2VsZWN0b3JcIlxuXSwgZnVuY3Rpb24oIGpRdWVyeSwgZG9jdW1lbnQsIGRvY3VtZW50RWxlbWVudCwgcm5vdGh0bWx3aGl0ZSwgc2xpY2UsIGRhdGFQcml2ICkge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyXG5cdHJrZXlFdmVudCA9IC9ea2V5Lyxcblx0cm1vdXNlRXZlbnQgPSAvXig/Om1vdXNlfHBvaW50ZXJ8Y29udGV4dG1lbnV8ZHJhZ3xkcm9wKXxjbGljay8sXG5cdHJ0eXBlbmFtZXNwYWNlID0gL14oW14uXSopKD86XFwuKC4rKXwpLztcblxuZnVuY3Rpb24gcmV0dXJuVHJ1ZSgpIHtcblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJldHVybkZhbHNlKCkge1xuXHRyZXR1cm4gZmFsc2U7XG59XG5cbi8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG4vLyBTZWUgIzEzMzkzIGZvciBtb3JlIGluZm9cbmZ1bmN0aW9uIHNhZmVBY3RpdmVFbGVtZW50KCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHR9IGNhdGNoICggZXJyICkgeyB9XG59XG5cbmZ1bmN0aW9uIG9uKCBlbGVtLCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuLCBvbmUgKSB7XG5cdHZhciBvcmlnRm4sIHR5cGU7XG5cblx0Ly8gVHlwZXMgY2FuIGJlIGEgbWFwIG9mIHR5cGVzL2hhbmRsZXJzXG5cdGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0Ly8gKCB0eXBlcy1PYmplY3QsIHNlbGVjdG9yLCBkYXRhIClcblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcy1PYmplY3QsIGRhdGEgKVxuXHRcdFx0ZGF0YSA9IGRhdGEgfHwgc2VsZWN0b3I7XG5cdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0Zm9yICggdHlwZSBpbiB0eXBlcyApIHtcblx0XHRcdG9uKCBlbGVtLCB0eXBlLCBzZWxlY3RvciwgZGF0YSwgdHlwZXNbIHR5cGUgXSwgb25lICk7XG5cdFx0fVxuXHRcdHJldHVybiBlbGVtO1xuXHR9XG5cblx0aWYgKCBkYXRhID09IG51bGwgJiYgZm4gPT0gbnVsbCApIHtcblxuXHRcdC8vICggdHlwZXMsIGZuIClcblx0XHRmbiA9IHNlbGVjdG9yO1xuXHRcdGRhdGEgPSBzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICggZm4gPT0gbnVsbCApIHtcblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcywgc2VsZWN0b3IsIGZuIClcblx0XHRcdGZuID0gZGF0YTtcblx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gKCB0eXBlcywgZGF0YSwgZm4gKVxuXHRcdFx0Zm4gPSBkYXRhO1xuXHRcdFx0ZGF0YSA9IHNlbGVjdG9yO1xuXHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cdGlmICggZm4gPT09IGZhbHNlICkge1xuXHRcdGZuID0gcmV0dXJuRmFsc2U7XG5cdH0gZWxzZSBpZiAoICFmbiApIHtcblx0XHRyZXR1cm4gZWxlbTtcblx0fVxuXG5cdGlmICggb25lID09PSAxICkge1xuXHRcdG9yaWdGbiA9IGZuO1xuXHRcdGZuID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0XHQvLyBDYW4gdXNlIGFuIGVtcHR5IHNldCwgc2luY2UgZXZlbnQgY29udGFpbnMgdGhlIGluZm9cblx0XHRcdGpRdWVyeSgpLm9mZiggZXZlbnQgKTtcblx0XHRcdHJldHVybiBvcmlnRm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdH07XG5cblx0XHQvLyBVc2Ugc2FtZSBndWlkIHNvIGNhbGxlciBjYW4gcmVtb3ZlIHVzaW5nIG9yaWdGblxuXHRcdGZuLmd1aWQgPSBvcmlnRm4uZ3VpZCB8fCAoIG9yaWdGbi5ndWlkID0galF1ZXJ5Lmd1aWQrKyApO1xuXHR9XG5cdHJldHVybiBlbGVtLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIHR5cGVzLCBmbiwgZGF0YSwgc2VsZWN0b3IgKTtcblx0fSApO1xufVxuXG4vKlxuICogSGVscGVyIGZ1bmN0aW9ucyBmb3IgbWFuYWdpbmcgZXZlbnRzIC0tIG5vdCBwYXJ0IG9mIHRoZSBwdWJsaWMgaW50ZXJmYWNlLlxuICogUHJvcHMgdG8gRGVhbiBFZHdhcmRzJyBhZGRFdmVudCBsaWJyYXJ5IGZvciBtYW55IG9mIHRoZSBpZGVhcy5cbiAqL1xualF1ZXJ5LmV2ZW50ID0ge1xuXG5cdGdsb2JhbDoge30sXG5cblx0YWRkOiBmdW5jdGlvbiggZWxlbSwgdHlwZXMsIGhhbmRsZXIsIGRhdGEsIHNlbGVjdG9yICkge1xuXG5cdFx0dmFyIGhhbmRsZU9iakluLCBldmVudEhhbmRsZSwgdG1wLFxuXHRcdFx0ZXZlbnRzLCB0LCBoYW5kbGVPYmosXG5cdFx0XHRzcGVjaWFsLCBoYW5kbGVycywgdHlwZSwgbmFtZXNwYWNlcywgb3JpZ1R5cGUsXG5cdFx0XHRlbGVtRGF0YSA9IGRhdGFQcml2LmdldCggZWxlbSApO1xuXG5cdFx0Ly8gRG9uJ3QgYXR0YWNoIGV2ZW50cyB0byBub0RhdGEgb3IgdGV4dC9jb21tZW50IG5vZGVzIChidXQgYWxsb3cgcGxhaW4gb2JqZWN0cylcblx0XHRpZiAoICFlbGVtRGF0YSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYW4gb2JqZWN0IG9mIGN1c3RvbSBkYXRhIGluIGxpZXUgb2YgdGhlIGhhbmRsZXJcblx0XHRpZiAoIGhhbmRsZXIuaGFuZGxlciApIHtcblx0XHRcdGhhbmRsZU9iakluID0gaGFuZGxlcjtcblx0XHRcdGhhbmRsZXIgPSBoYW5kbGVPYmpJbi5oYW5kbGVyO1xuXHRcdFx0c2VsZWN0b3IgPSBoYW5kbGVPYmpJbi5zZWxlY3Rvcjtcblx0XHR9XG5cblx0XHQvLyBFbnN1cmUgdGhhdCBpbnZhbGlkIHNlbGVjdG9ycyB0aHJvdyBleGNlcHRpb25zIGF0IGF0dGFjaCB0aW1lXG5cdFx0Ly8gRXZhbHVhdGUgYWdhaW5zdCBkb2N1bWVudEVsZW1lbnQgaW4gY2FzZSBlbGVtIGlzIGEgbm9uLWVsZW1lbnQgbm9kZSAoZS5nLiwgZG9jdW1lbnQpXG5cdFx0aWYgKCBzZWxlY3RvciApIHtcblx0XHRcdGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggZG9jdW1lbnRFbGVtZW50LCBzZWxlY3RvciApO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBoYW5kbGVyIGhhcyBhIHVuaXF1ZSBJRCwgdXNlZCB0byBmaW5kL3JlbW92ZSBpdCBsYXRlclxuXHRcdGlmICggIWhhbmRsZXIuZ3VpZCApIHtcblx0XHRcdGhhbmRsZXIuZ3VpZCA9IGpRdWVyeS5ndWlkKys7XG5cdFx0fVxuXG5cdFx0Ly8gSW5pdCB0aGUgZWxlbWVudCdzIGV2ZW50IHN0cnVjdHVyZSBhbmQgbWFpbiBoYW5kbGVyLCBpZiB0aGlzIGlzIHRoZSBmaXJzdFxuXHRcdGlmICggISggZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzICkgKSB7XG5cdFx0XHRldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgPSB7fTtcblx0XHR9XG5cdFx0aWYgKCAhKCBldmVudEhhbmRsZSA9IGVsZW1EYXRhLmhhbmRsZSApICkge1xuXHRcdFx0ZXZlbnRIYW5kbGUgPSBlbGVtRGF0YS5oYW5kbGUgPSBmdW5jdGlvbiggZSApIHtcblxuXHRcdFx0XHQvLyBEaXNjYXJkIHRoZSBzZWNvbmQgZXZlbnQgb2YgYSBqUXVlcnkuZXZlbnQudHJpZ2dlcigpIGFuZFxuXHRcdFx0XHQvLyB3aGVuIGFuIGV2ZW50IGlzIGNhbGxlZCBhZnRlciBhIHBhZ2UgaGFzIHVubG9hZGVkXG5cdFx0XHRcdHJldHVybiB0eXBlb2YgalF1ZXJ5ICE9PSBcInVuZGVmaW5lZFwiICYmIGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgIT09IGUudHlwZSA/XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmRpc3BhdGNoLmFwcGx5KCBlbGVtLCBhcmd1bWVudHMgKSA6IHVuZGVmaW5lZDtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlIG11bHRpcGxlIGV2ZW50cyBzZXBhcmF0ZWQgYnkgYSBzcGFjZVxuXHRcdHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbIFwiXCIgXTtcblx0XHR0ID0gdHlwZXMubGVuZ3RoO1xuXHRcdHdoaWxlICggdC0tICkge1xuXHRcdFx0dG1wID0gcnR5cGVuYW1lc3BhY2UuZXhlYyggdHlwZXNbIHQgXSApIHx8IFtdO1xuXHRcdFx0dHlwZSA9IG9yaWdUeXBlID0gdG1wWyAxIF07XG5cdFx0XHRuYW1lc3BhY2VzID0gKCB0bXBbIDIgXSB8fCBcIlwiICkuc3BsaXQoIFwiLlwiICkuc29ydCgpO1xuXG5cdFx0XHQvLyBUaGVyZSAqbXVzdCogYmUgYSB0eXBlLCBubyBhdHRhY2hpbmcgbmFtZXNwYWNlLW9ubHkgaGFuZGxlcnNcblx0XHRcdGlmICggIXR5cGUgKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBldmVudCBjaGFuZ2VzIGl0cyB0eXBlLCB1c2UgdGhlIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMgZm9yIHRoZSBjaGFuZ2VkIHR5cGVcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXG5cdFx0XHQvLyBJZiBzZWxlY3RvciBkZWZpbmVkLCBkZXRlcm1pbmUgc3BlY2lhbCBldmVudCBhcGkgdHlwZSwgb3RoZXJ3aXNlIGdpdmVuIHR5cGVcblx0XHRcdHR5cGUgPSAoIHNlbGVjdG9yID8gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgOiBzcGVjaWFsLmJpbmRUeXBlICkgfHwgdHlwZTtcblxuXHRcdFx0Ly8gVXBkYXRlIHNwZWNpYWwgYmFzZWQgb24gbmV3bHkgcmVzZXQgdHlwZVxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cblx0XHRcdC8vIGhhbmRsZU9iaiBpcyBwYXNzZWQgdG8gYWxsIGV2ZW50IGhhbmRsZXJzXG5cdFx0XHRoYW5kbGVPYmogPSBqUXVlcnkuZXh0ZW5kKCB7XG5cdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdG9yaWdUeXBlOiBvcmlnVHlwZSxcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0aGFuZGxlcjogaGFuZGxlcixcblx0XHRcdFx0Z3VpZDogaGFuZGxlci5ndWlkLFxuXHRcdFx0XHRzZWxlY3Rvcjogc2VsZWN0b3IsXG5cdFx0XHRcdG5lZWRzQ29udGV4dDogc2VsZWN0b3IgJiYgalF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9yICksXG5cdFx0XHRcdG5hbWVzcGFjZTogbmFtZXNwYWNlcy5qb2luKCBcIi5cIiApXG5cdFx0XHR9LCBoYW5kbGVPYmpJbiApO1xuXG5cdFx0XHQvLyBJbml0IHRoZSBldmVudCBoYW5kbGVyIHF1ZXVlIGlmIHdlJ3JlIHRoZSBmaXJzdFxuXHRcdFx0aWYgKCAhKCBoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdICkgKSB7XG5cdFx0XHRcdGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gPSBbXTtcblx0XHRcdFx0aGFuZGxlcnMuZGVsZWdhdGVDb3VudCA9IDA7XG5cblx0XHRcdFx0Ly8gT25seSB1c2UgYWRkRXZlbnRMaXN0ZW5lciBpZiB0aGUgc3BlY2lhbCBldmVudHMgaGFuZGxlciByZXR1cm5zIGZhbHNlXG5cdFx0XHRcdGlmICggIXNwZWNpYWwuc2V0dXAgfHxcblx0XHRcdFx0XHRzcGVjaWFsLnNldHVwLmNhbGwoIGVsZW0sIGRhdGEsIG5hbWVzcGFjZXMsIGV2ZW50SGFuZGxlICkgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdFx0aWYgKCBlbGVtLmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLmFkZEV2ZW50TGlzdGVuZXIoIHR5cGUsIGV2ZW50SGFuZGxlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICggc3BlY2lhbC5hZGQgKSB7XG5cdFx0XHRcdHNwZWNpYWwuYWRkLmNhbGwoIGVsZW0sIGhhbmRsZU9iaiApO1xuXG5cdFx0XHRcdGlmICggIWhhbmRsZU9iai5oYW5kbGVyLmd1aWQgKSB7XG5cdFx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCA9IGhhbmRsZXIuZ3VpZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgdG8gdGhlIGVsZW1lbnQncyBoYW5kbGVyIGxpc3QsIGRlbGVnYXRlcyBpbiBmcm9udFxuXHRcdFx0aWYgKCBzZWxlY3RvciApIHtcblx0XHRcdFx0aGFuZGxlcnMuc3BsaWNlKCBoYW5kbGVycy5kZWxlZ2F0ZUNvdW50KyssIDAsIGhhbmRsZU9iaiApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGFuZGxlcnMucHVzaCggaGFuZGxlT2JqICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEtlZXAgdHJhY2sgb2Ygd2hpY2ggZXZlbnRzIGhhdmUgZXZlciBiZWVuIHVzZWQsIGZvciBldmVudCBvcHRpbWl6YXRpb25cblx0XHRcdGpRdWVyeS5ldmVudC5nbG9iYWxbIHR5cGUgXSA9IHRydWU7XG5cdFx0fVxuXG5cdH0sXG5cblx0Ly8gRGV0YWNoIGFuIGV2ZW50IG9yIHNldCBvZiBldmVudHMgZnJvbSBhbiBlbGVtZW50XG5cdHJlbW92ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBzZWxlY3RvciwgbWFwcGVkVHlwZXMgKSB7XG5cblx0XHR2YXIgaiwgb3JpZ0NvdW50LCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YVByaXYuaGFzRGF0YSggZWxlbSApICYmIGRhdGFQcml2LmdldCggZWxlbSApO1xuXG5cdFx0aWYgKCAhZWxlbURhdGEgfHwgISggZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzICkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gT25jZSBmb3IgZWFjaCB0eXBlLm5hbWVzcGFjZSBpbiB0eXBlczsgdHlwZSBtYXkgYmUgb21pdHRlZFxuXHRcdHR5cGVzID0gKCB0eXBlcyB8fCBcIlwiICkubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbIFwiXCIgXTtcblx0XHR0ID0gdHlwZXMubGVuZ3RoO1xuXHRcdHdoaWxlICggdC0tICkge1xuXHRcdFx0dG1wID0gcnR5cGVuYW1lc3BhY2UuZXhlYyggdHlwZXNbIHQgXSApIHx8IFtdO1xuXHRcdFx0dHlwZSA9IG9yaWdUeXBlID0gdG1wWyAxIF07XG5cdFx0XHRuYW1lc3BhY2VzID0gKCB0bXBbIDIgXSB8fCBcIlwiICkuc3BsaXQoIFwiLlwiICkuc29ydCgpO1xuXG5cdFx0XHQvLyBVbmJpbmQgYWxsIGV2ZW50cyAob24gdGhpcyBuYW1lc3BhY2UsIGlmIHByb3ZpZGVkKSBmb3IgdGhlIGVsZW1lbnRcblx0XHRcdGlmICggIXR5cGUgKSB7XG5cdFx0XHRcdGZvciAoIHR5cGUgaW4gZXZlbnRzICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKyB0eXBlc1sgdCBdLCBoYW5kbGVyLCBzZWxlY3RvciwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblx0XHRcdHR5cGUgPSAoIHNlbGVjdG9yID8gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgOiBzcGVjaWFsLmJpbmRUeXBlICkgfHwgdHlwZTtcblx0XHRcdGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gfHwgW107XG5cdFx0XHR0bXAgPSB0bXBbIDIgXSAmJlxuXHRcdFx0XHRuZXcgUmVnRXhwKCBcIihefFxcXFwuKVwiICsgbmFtZXNwYWNlcy5qb2luKCBcIlxcXFwuKD86LipcXFxcLnwpXCIgKSArIFwiKFxcXFwufCQpXCIgKTtcblxuXHRcdFx0Ly8gUmVtb3ZlIG1hdGNoaW5nIGV2ZW50c1xuXHRcdFx0b3JpZ0NvdW50ID0gaiA9IGhhbmRsZXJzLmxlbmd0aDtcblx0XHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0XHRoYW5kbGVPYmogPSBoYW5kbGVyc1sgaiBdO1xuXG5cdFx0XHRcdGlmICggKCBtYXBwZWRUeXBlcyB8fCBvcmlnVHlwZSA9PT0gaGFuZGxlT2JqLm9yaWdUeXBlICkgJiZcblx0XHRcdFx0XHQoICFoYW5kbGVyIHx8IGhhbmRsZXIuZ3VpZCA9PT0gaGFuZGxlT2JqLmd1aWQgKSAmJlxuXHRcdFx0XHRcdCggIXRtcCB8fCB0bXAudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkgJiZcblx0XHRcdFx0XHQoICFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gaGFuZGxlT2JqLnNlbGVjdG9yIHx8XG5cdFx0XHRcdFx0XHRzZWxlY3RvciA9PT0gXCIqKlwiICYmIGhhbmRsZU9iai5zZWxlY3RvciApICkge1xuXHRcdFx0XHRcdGhhbmRsZXJzLnNwbGljZSggaiwgMSApO1xuXG5cdFx0XHRcdFx0aWYgKCBoYW5kbGVPYmouc2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVycy5kZWxlZ2F0ZUNvdW50LS07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggc3BlY2lhbC5yZW1vdmUgKSB7XG5cdFx0XHRcdFx0XHRzcGVjaWFsLnJlbW92ZS5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIGdlbmVyaWMgZXZlbnQgaGFuZGxlciBpZiB3ZSByZW1vdmVkIHNvbWV0aGluZyBhbmQgbm8gbW9yZSBoYW5kbGVycyBleGlzdFxuXHRcdFx0Ly8gKGF2b2lkcyBwb3RlbnRpYWwgZm9yIGVuZGxlc3MgcmVjdXJzaW9uIGR1cmluZyByZW1vdmFsIG9mIHNwZWNpYWwgZXZlbnQgaGFuZGxlcnMpXG5cdFx0XHRpZiAoIG9yaWdDb3VudCAmJiAhaGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0XHRpZiAoICFzcGVjaWFsLnRlYXJkb3duIHx8XG5cdFx0XHRcdFx0c3BlY2lhbC50ZWFyZG93bi5jYWxsKCBlbGVtLCBuYW1lc3BhY2VzLCBlbGVtRGF0YS5oYW5kbGUgKSA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0XHRqUXVlcnkucmVtb3ZlRXZlbnQoIGVsZW0sIHR5cGUsIGVsZW1EYXRhLmhhbmRsZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGVsZXRlIGV2ZW50c1sgdHlwZSBdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSBkYXRhIGFuZCB0aGUgZXhwYW5kbyBpZiBpdCdzIG5vIGxvbmdlciB1c2VkXG5cdFx0aWYgKCBqUXVlcnkuaXNFbXB0eU9iamVjdCggZXZlbnRzICkgKSB7XG5cdFx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIFwiaGFuZGxlIGV2ZW50c1wiICk7XG5cdFx0fVxuXHR9LFxuXG5cdGRpc3BhdGNoOiBmdW5jdGlvbiggbmF0aXZlRXZlbnQgKSB7XG5cblx0XHQvLyBNYWtlIGEgd3JpdGFibGUgalF1ZXJ5LkV2ZW50IGZyb20gdGhlIG5hdGl2ZSBldmVudCBvYmplY3Rcblx0XHR2YXIgZXZlbnQgPSBqUXVlcnkuZXZlbnQuZml4KCBuYXRpdmVFdmVudCApO1xuXG5cdFx0dmFyIGksIGosIHJldCwgbWF0Y2hlZCwgaGFuZGxlT2JqLCBoYW5kbGVyUXVldWUsXG5cdFx0XHRhcmdzID0gbmV3IEFycmF5KCBhcmd1bWVudHMubGVuZ3RoICksXG5cdFx0XHRoYW5kbGVycyA9ICggZGF0YVByaXYuZ2V0KCB0aGlzLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdIHx8IFtdLFxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyBldmVudC50eXBlIF0gfHwge307XG5cblx0XHQvLyBVc2UgdGhlIGZpeC1lZCBqUXVlcnkuRXZlbnQgcmF0aGVyIHRoYW4gdGhlIChyZWFkLW9ubHkpIG5hdGl2ZSBldmVudFxuXHRcdGFyZ3NbIDAgXSA9IGV2ZW50O1xuXG5cdFx0Zm9yICggaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRhcmdzWyBpIF0gPSBhcmd1bWVudHNbIGkgXTtcblx0XHR9XG5cblx0XHRldmVudC5kZWxlZ2F0ZVRhcmdldCA9IHRoaXM7XG5cblx0XHQvLyBDYWxsIHRoZSBwcmVEaXNwYXRjaCBob29rIGZvciB0aGUgbWFwcGVkIHR5cGUsIGFuZCBsZXQgaXQgYmFpbCBpZiBkZXNpcmVkXG5cdFx0aWYgKCBzcGVjaWFsLnByZURpc3BhdGNoICYmIHNwZWNpYWwucHJlRGlzcGF0Y2guY2FsbCggdGhpcywgZXZlbnQgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZXJtaW5lIGhhbmRsZXJzXG5cdFx0aGFuZGxlclF1ZXVlID0galF1ZXJ5LmV2ZW50LmhhbmRsZXJzLmNhbGwoIHRoaXMsIGV2ZW50LCBoYW5kbGVycyApO1xuXG5cdFx0Ly8gUnVuIGRlbGVnYXRlcyBmaXJzdDsgdGhleSBtYXkgd2FudCB0byBzdG9wIHByb3BhZ2F0aW9uIGJlbmVhdGggdXNcblx0XHRpID0gMDtcblx0XHR3aGlsZSAoICggbWF0Y2hlZCA9IGhhbmRsZXJRdWV1ZVsgaSsrIF0gKSAmJiAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblx0XHRcdGV2ZW50LmN1cnJlbnRUYXJnZXQgPSBtYXRjaGVkLmVsZW07XG5cblx0XHRcdGogPSAwO1xuXHRcdFx0d2hpbGUgKCAoIGhhbmRsZU9iaiA9IG1hdGNoZWQuaGFuZGxlcnNbIGorKyBdICkgJiZcblx0XHRcdFx0IWV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cblx0XHRcdFx0Ly8gVHJpZ2dlcmVkIGV2ZW50IG11c3QgZWl0aGVyIDEpIGhhdmUgbm8gbmFtZXNwYWNlLCBvciAyKSBoYXZlIG5hbWVzcGFjZShzKVxuXHRcdFx0XHQvLyBhIHN1YnNldCBvciBlcXVhbCB0byB0aG9zZSBpbiB0aGUgYm91bmQgZXZlbnQgKGJvdGggY2FuIGhhdmUgbm8gbmFtZXNwYWNlKS5cblx0XHRcdFx0aWYgKCAhZXZlbnQucm5hbWVzcGFjZSB8fCBldmVudC5ybmFtZXNwYWNlLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApIHtcblxuXHRcdFx0XHRcdGV2ZW50LmhhbmRsZU9iaiA9IGhhbmRsZU9iajtcblx0XHRcdFx0XHRldmVudC5kYXRhID0gaGFuZGxlT2JqLmRhdGE7XG5cblx0XHRcdFx0XHRyZXQgPSAoICggalF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGhhbmRsZU9iai5vcmlnVHlwZSBdIHx8IHt9ICkuaGFuZGxlIHx8XG5cdFx0XHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlciApLmFwcGx5KCBtYXRjaGVkLmVsZW0sIGFyZ3MgKTtcblxuXHRcdFx0XHRcdGlmICggcmV0ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggZXZlbnQucmVzdWx0ID0gcmV0ICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWxsIHRoZSBwb3N0RGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlXG5cdFx0aWYgKCBzcGVjaWFsLnBvc3REaXNwYXRjaCApIHtcblx0XHRcdHNwZWNpYWwucG9zdERpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHRoYW5kbGVyczogZnVuY3Rpb24oIGV2ZW50LCBoYW5kbGVycyApIHtcblx0XHR2YXIgaSwgaGFuZGxlT2JqLCBzZWwsIG1hdGNoZWRIYW5kbGVycywgbWF0Y2hlZFNlbGVjdG9ycyxcblx0XHRcdGhhbmRsZXJRdWV1ZSA9IFtdLFxuXHRcdFx0ZGVsZWdhdGVDb3VudCA9IGhhbmRsZXJzLmRlbGVnYXRlQ291bnQsXG5cdFx0XHRjdXIgPSBldmVudC50YXJnZXQ7XG5cblx0XHQvLyBGaW5kIGRlbGVnYXRlIGhhbmRsZXJzXG5cdFx0aWYgKCBkZWxlZ2F0ZUNvdW50ICYmXG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OVxuXHRcdFx0Ly8gQmxhY2staG9sZSBTVkcgPHVzZT4gaW5zdGFuY2UgdHJlZXMgKHRyYWMtMTMxODApXG5cdFx0XHRjdXIubm9kZVR5cGUgJiZcblxuXHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveCA8PTQyXG5cdFx0XHQvLyBTdXBwcmVzcyBzcGVjLXZpb2xhdGluZyBjbGlja3MgaW5kaWNhdGluZyBhIG5vbi1wcmltYXJ5IHBvaW50ZXIgYnV0dG9uICh0cmFjLTM4NjEpXG5cdFx0XHQvLyBodHRwczovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLyNldmVudC10eXBlLWNsaWNrXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSBvbmx5XG5cdFx0XHQvLyAuLi5idXQgbm90IGFycm93IGtleSBcImNsaWNrc1wiIG9mIHJhZGlvIGlucHV0cywgd2hpY2ggY2FuIGhhdmUgYGJ1dHRvbmAgLTEgKGdoLTIzNDMpXG5cdFx0XHQhKCBldmVudC50eXBlID09PSBcImNsaWNrXCIgJiYgZXZlbnQuYnV0dG9uID49IDEgKSApIHtcblxuXHRcdFx0Zm9yICggOyBjdXIgIT09IHRoaXM7IGN1ciA9IGN1ci5wYXJlbnROb2RlIHx8IHRoaXMgKSB7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgY2hlY2sgbm9uLWVsZW1lbnRzICgjMTMyMDgpXG5cdFx0XHRcdC8vIERvbid0IHByb2Nlc3MgY2xpY2tzIG9uIGRpc2FibGVkIGVsZW1lbnRzICgjNjkxMSwgIzgxNjUsICMxMTM4MiwgIzExNzY0KVxuXHRcdFx0XHRpZiAoIGN1ci5ub2RlVHlwZSA9PT0gMSAmJiAhKCBldmVudC50eXBlID09PSBcImNsaWNrXCIgJiYgY3VyLmRpc2FibGVkID09PSB0cnVlICkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlZEhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0bWF0Y2hlZFNlbGVjdG9ycyA9IHt9O1xuXHRcdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgZGVsZWdhdGVDb3VudDsgaSsrICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlT2JqID0gaGFuZGxlcnNbIGkgXTtcblxuXHRcdFx0XHRcdFx0Ly8gRG9uJ3QgY29uZmxpY3Qgd2l0aCBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKCMxMzIwMylcblx0XHRcdFx0XHRcdHNlbCA9IGhhbmRsZU9iai5zZWxlY3RvciArIFwiIFwiO1xuXG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZWRTZWxlY3RvcnNbIHNlbCBdID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRcdG1hdGNoZWRTZWxlY3RvcnNbIHNlbCBdID0gaGFuZGxlT2JqLm5lZWRzQ29udGV4dCA/XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KCBzZWwsIHRoaXMgKS5pbmRleCggY3VyICkgPiAtMSA6XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmZpbmQoIHNlbCwgdGhpcywgbnVsbCwgWyBjdXIgXSApLmxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlZFNlbGVjdG9yc1sgc2VsIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG1hdGNoZWRIYW5kbGVycy5wdXNoKCBoYW5kbGVPYmogKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBtYXRjaGVkSGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlclF1ZXVlLnB1c2goIHsgZWxlbTogY3VyLCBoYW5kbGVyczogbWF0Y2hlZEhhbmRsZXJzIH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBBZGQgdGhlIHJlbWFpbmluZyAoZGlyZWN0bHktYm91bmQpIGhhbmRsZXJzXG5cdFx0Y3VyID0gdGhpcztcblx0XHRpZiAoIGRlbGVnYXRlQ291bnQgPCBoYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRoYW5kbGVyUXVldWUucHVzaCggeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBoYW5kbGVycy5zbGljZSggZGVsZWdhdGVDb3VudCApIH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlclF1ZXVlO1xuXHR9LFxuXG5cdGFkZFByb3A6IGZ1bmN0aW9uKCBuYW1lLCBob29rICkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggalF1ZXJ5LkV2ZW50LnByb3RvdHlwZSwgbmFtZSwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblxuXHRcdFx0Z2V0OiBqUXVlcnkuaXNGdW5jdGlvbiggaG9vayApID9cblx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLm9yaWdpbmFsRXZlbnQgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBob29rKCB0aGlzLm9yaWdpbmFsRXZlbnQgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gOlxuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMub3JpZ2luYWxFdmVudFsgbmFtZSBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0c2V0OiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggdGhpcywgbmFtZSwge1xuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGZpeDogZnVuY3Rpb24oIG9yaWdpbmFsRXZlbnQgKSB7XG5cdFx0cmV0dXJuIG9yaWdpbmFsRXZlbnRbIGpRdWVyeS5leHBhbmRvIF0gP1xuXHRcdFx0b3JpZ2luYWxFdmVudCA6XG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCBvcmlnaW5hbEV2ZW50ICk7XG5cdH0sXG5cblx0c3BlY2lhbDoge1xuXHRcdGxvYWQ6IHtcblxuXHRcdFx0Ly8gUHJldmVudCB0cmlnZ2VyZWQgaW1hZ2UubG9hZCBldmVudHMgZnJvbSBidWJibGluZyB0byB3aW5kb3cubG9hZFxuXHRcdFx0bm9CdWJibGU6IHRydWVcblx0XHR9LFxuXHRcdGZvY3VzOiB7XG5cblx0XHRcdC8vIEZpcmUgbmF0aXZlIGV2ZW50IGlmIHBvc3NpYmxlIHNvIGJsdXIvZm9jdXMgc2VxdWVuY2UgaXMgY29ycmVjdFxuXHRcdFx0dHJpZ2dlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcyAhPT0gc2FmZUFjdGl2ZUVsZW1lbnQoKSAmJiB0aGlzLmZvY3VzICkge1xuXHRcdFx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWxlZ2F0ZVR5cGU6IFwiZm9jdXNpblwiXG5cdFx0fSxcblx0XHRibHVyOiB7XG5cdFx0XHR0cmlnZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCB0aGlzID09PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuYmx1ciApIHtcblx0XHRcdFx0XHR0aGlzLmJsdXIoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWxlZ2F0ZVR5cGU6IFwiZm9jdXNvdXRcIlxuXHRcdH0sXG5cdFx0Y2xpY2s6IHtcblxuXHRcdFx0Ly8gRm9yIGNoZWNrYm94LCBmaXJlIG5hdGl2ZSBldmVudCBzbyBjaGVja2VkIHN0YXRlIHdpbGwgYmUgcmlnaHRcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMudHlwZSA9PT0gXCJjaGVja2JveFwiICYmIHRoaXMuY2xpY2sgJiYgalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImlucHV0XCIgKSApIHtcblx0XHRcdFx0XHR0aGlzLmNsaWNrKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBGb3IgY3Jvc3MtYnJvd3NlciBjb25zaXN0ZW5jeSwgZG9uJ3QgZmlyZSBuYXRpdmUgLmNsaWNrKCkgb24gbGlua3Ncblx0XHRcdF9kZWZhdWx0OiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdHJldHVybiBqUXVlcnkubm9kZU5hbWUoIGV2ZW50LnRhcmdldCwgXCJhXCIgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YmVmb3JldW5sb2FkOiB7XG5cdFx0XHRwb3N0RGlzcGF0Y2g6IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDIwK1xuXHRcdFx0XHQvLyBGaXJlZm94IGRvZXNuJ3QgYWxlcnQgaWYgdGhlIHJldHVyblZhbHVlIGZpZWxkIGlzIG5vdCBzZXQuXG5cdFx0XHRcdGlmICggZXZlbnQucmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgZXZlbnQub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRldmVudC5vcmlnaW5hbEV2ZW50LnJldHVyblZhbHVlID0gZXZlbnQucmVzdWx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG5qUXVlcnkucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiggZWxlbSwgdHlwZSwgaGFuZGxlICkge1xuXG5cdC8vIFRoaXMgXCJpZlwiIGlzIG5lZWRlZCBmb3IgcGxhaW4gb2JqZWN0c1xuXHRpZiAoIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcblx0XHRlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGUsIGhhbmRsZSApO1xuXHR9XG59O1xuXG5qUXVlcnkuRXZlbnQgPSBmdW5jdGlvbiggc3JjLCBwcm9wcyApIHtcblxuXHQvLyBBbGxvdyBpbnN0YW50aWF0aW9uIHdpdGhvdXQgdGhlICduZXcnIGtleXdvcmRcblx0aWYgKCAhKCB0aGlzIGluc3RhbmNlb2YgalF1ZXJ5LkV2ZW50ICkgKSB7XG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuRXZlbnQoIHNyYywgcHJvcHMgKTtcblx0fVxuXG5cdC8vIEV2ZW50IG9iamVjdFxuXHRpZiAoIHNyYyAmJiBzcmMudHlwZSApIHtcblx0XHR0aGlzLm9yaWdpbmFsRXZlbnQgPSBzcmM7XG5cdFx0dGhpcy50eXBlID0gc3JjLnR5cGU7XG5cblx0XHQvLyBFdmVudHMgYnViYmxpbmcgdXAgdGhlIGRvY3VtZW50IG1heSBoYXZlIGJlZW4gbWFya2VkIGFzIHByZXZlbnRlZFxuXHRcdC8vIGJ5IGEgaGFuZGxlciBsb3dlciBkb3duIHRoZSB0cmVlOyByZWZsZWN0IHRoZSBjb3JyZWN0IHZhbHVlLlxuXHRcdHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gc3JjLmRlZmF1bHRQcmV2ZW50ZWQgfHxcblx0XHRcdFx0c3JjLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHVuZGVmaW5lZCAmJlxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD0yLjMgb25seVxuXHRcdFx0XHRzcmMucmV0dXJuVmFsdWUgPT09IGZhbHNlID9cblx0XHRcdHJldHVyblRydWUgOlxuXHRcdFx0cmV0dXJuRmFsc2U7XG5cblx0XHQvLyBDcmVhdGUgdGFyZ2V0IHByb3BlcnRpZXNcblx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgPD02IC0gNyBvbmx5XG5cdFx0Ly8gVGFyZ2V0IHNob3VsZCBub3QgYmUgYSB0ZXh0IG5vZGUgKCM1MDQsICMxMzE0Mylcblx0XHR0aGlzLnRhcmdldCA9ICggc3JjLnRhcmdldCAmJiBzcmMudGFyZ2V0Lm5vZGVUeXBlID09PSAzICkgP1xuXHRcdFx0c3JjLnRhcmdldC5wYXJlbnROb2RlIDpcblx0XHRcdHNyYy50YXJnZXQ7XG5cblx0XHR0aGlzLmN1cnJlbnRUYXJnZXQgPSBzcmMuY3VycmVudFRhcmdldDtcblx0XHR0aGlzLnJlbGF0ZWRUYXJnZXQgPSBzcmMucmVsYXRlZFRhcmdldDtcblxuXHQvLyBFdmVudCB0eXBlXG5cdH0gZWxzZSB7XG5cdFx0dGhpcy50eXBlID0gc3JjO1xuXHR9XG5cblx0Ly8gUHV0IGV4cGxpY2l0bHkgcHJvdmlkZWQgcHJvcGVydGllcyBvbnRvIHRoZSBldmVudCBvYmplY3Rcblx0aWYgKCBwcm9wcyApIHtcblx0XHRqUXVlcnkuZXh0ZW5kKCB0aGlzLCBwcm9wcyApO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgdGltZXN0YW1wIGlmIGluY29taW5nIGV2ZW50IGRvZXNuJ3QgaGF2ZSBvbmVcblx0dGhpcy50aW1lU3RhbXAgPSBzcmMgJiYgc3JjLnRpbWVTdGFtcCB8fCBqUXVlcnkubm93KCk7XG5cblx0Ly8gTWFyayBpdCBhcyBmaXhlZFxuXHR0aGlzWyBqUXVlcnkuZXhwYW5kbyBdID0gdHJ1ZTtcbn07XG5cbi8vIGpRdWVyeS5FdmVudCBpcyBiYXNlZCBvbiBET00zIEV2ZW50cyBhcyBzcGVjaWZpZWQgYnkgdGhlIEVDTUFTY3JpcHQgTGFuZ3VhZ2UgQmluZGluZ1xuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMDMvV0QtRE9NLUxldmVsLTMtRXZlbnRzLTIwMDMwMzMxL2VjbWEtc2NyaXB0LWJpbmRpbmcuaHRtbFxualF1ZXJ5LkV2ZW50LnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IGpRdWVyeS5FdmVudCxcblx0aXNEZWZhdWx0UHJldmVudGVkOiByZXR1cm5GYWxzZSxcblx0aXNQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxuXHRpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG5cdGlzU2ltdWxhdGVkOiBmYWxzZSxcblxuXHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9LFxuXHRzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG5cdFx0dGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0fSxcblx0c3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5UcnVlO1xuXG5cdFx0aWYgKCBlICYmICF0aGlzLmlzU2ltdWxhdGVkICkge1xuXHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cblx0XHR0aGlzLnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9XG59O1xuXG4vLyBJbmNsdWRlcyBhbGwgY29tbW9uIGV2ZW50IHByb3BzIGluY2x1ZGluZyBLZXlFdmVudCBhbmQgTW91c2VFdmVudCBzcGVjaWZpYyBwcm9wc1xualF1ZXJ5LmVhY2goIHtcblx0YWx0S2V5OiB0cnVlLFxuXHRidWJibGVzOiB0cnVlLFxuXHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRjaGFuZ2VkVG91Y2hlczogdHJ1ZSxcblx0Y3RybEtleTogdHJ1ZSxcblx0ZGV0YWlsOiB0cnVlLFxuXHRldmVudFBoYXNlOiB0cnVlLFxuXHRtZXRhS2V5OiB0cnVlLFxuXHRwYWdlWDogdHJ1ZSxcblx0cGFnZVk6IHRydWUsXG5cdHNoaWZ0S2V5OiB0cnVlLFxuXHR2aWV3OiB0cnVlLFxuXHRcImNoYXJcIjogdHJ1ZSxcblx0Y2hhckNvZGU6IHRydWUsXG5cdGtleTogdHJ1ZSxcblx0a2V5Q29kZTogdHJ1ZSxcblx0YnV0dG9uOiB0cnVlLFxuXHRidXR0b25zOiB0cnVlLFxuXHRjbGllbnRYOiB0cnVlLFxuXHRjbGllbnRZOiB0cnVlLFxuXHRvZmZzZXRYOiB0cnVlLFxuXHRvZmZzZXRZOiB0cnVlLFxuXHRwb2ludGVySWQ6IHRydWUsXG5cdHBvaW50ZXJUeXBlOiB0cnVlLFxuXHRzY3JlZW5YOiB0cnVlLFxuXHRzY3JlZW5ZOiB0cnVlLFxuXHR0YXJnZXRUb3VjaGVzOiB0cnVlLFxuXHR0b0VsZW1lbnQ6IHRydWUsXG5cdHRvdWNoZXM6IHRydWUsXG5cblx0d2hpY2g6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHR2YXIgYnV0dG9uID0gZXZlbnQuYnV0dG9uO1xuXG5cdFx0Ly8gQWRkIHdoaWNoIGZvciBrZXkgZXZlbnRzXG5cdFx0aWYgKCBldmVudC53aGljaCA9PSBudWxsICYmIHJrZXlFdmVudC50ZXN0KCBldmVudC50eXBlICkgKSB7XG5cdFx0XHRyZXR1cm4gZXZlbnQuY2hhckNvZGUgIT0gbnVsbCA/IGV2ZW50LmNoYXJDb2RlIDogZXZlbnQua2V5Q29kZTtcblx0XHR9XG5cblx0XHQvLyBBZGQgd2hpY2ggZm9yIGNsaWNrOiAxID09PSBsZWZ0OyAyID09PSBtaWRkbGU7IDMgPT09IHJpZ2h0XG5cdFx0aWYgKCAhZXZlbnQud2hpY2ggJiYgYnV0dG9uICE9PSB1bmRlZmluZWQgJiYgcm1vdXNlRXZlbnQudGVzdCggZXZlbnQudHlwZSApICkge1xuXHRcdFx0aWYgKCBidXR0b24gJiAxICkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBidXR0b24gJiAyICkge1xuXHRcdFx0XHRyZXR1cm4gMztcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBidXR0b24gJiA0ICkge1xuXHRcdFx0XHRyZXR1cm4gMjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LndoaWNoO1xuXHR9XG59LCBqUXVlcnkuZXZlbnQuYWRkUHJvcCApO1xuXG4vLyBDcmVhdGUgbW91c2VlbnRlci9sZWF2ZSBldmVudHMgdXNpbmcgbW91c2VvdmVyL291dCBhbmQgZXZlbnQtdGltZSBjaGVja3Ncbi8vIHNvIHRoYXQgZXZlbnQgZGVsZWdhdGlvbiB3b3JrcyBpbiBqUXVlcnkuXG4vLyBEbyB0aGUgc2FtZSBmb3IgcG9pbnRlcmVudGVyL3BvaW50ZXJsZWF2ZSBhbmQgcG9pbnRlcm92ZXIvcG9pbnRlcm91dFxuLy9cbi8vIFN1cHBvcnQ6IFNhZmFyaSA3IG9ubHlcbi8vIFNhZmFyaSBzZW5kcyBtb3VzZWVudGVyIHRvbyBvZnRlbjsgc2VlOlxuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDcwMjU4XG4vLyBmb3IgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBidWcgKGl0IGV4aXN0ZWQgaW4gb2xkZXIgQ2hyb21lIHZlcnNpb25zIGFzIHdlbGwpLlxualF1ZXJ5LmVhY2goIHtcblx0bW91c2VlbnRlcjogXCJtb3VzZW92ZXJcIixcblx0bW91c2VsZWF2ZTogXCJtb3VzZW91dFwiLFxuXHRwb2ludGVyZW50ZXI6IFwicG9pbnRlcm92ZXJcIixcblx0cG9pbnRlcmxlYXZlOiBcInBvaW50ZXJvdXRcIlxufSwgZnVuY3Rpb24oIG9yaWcsIGZpeCApIHtcblx0alF1ZXJ5LmV2ZW50LnNwZWNpYWxbIG9yaWcgXSA9IHtcblx0XHRkZWxlZ2F0ZVR5cGU6IGZpeCxcblx0XHRiaW5kVHlwZTogZml4LFxuXG5cdFx0aGFuZGxlOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHR2YXIgcmV0LFxuXHRcdFx0XHR0YXJnZXQgPSB0aGlzLFxuXHRcdFx0XHRyZWxhdGVkID0gZXZlbnQucmVsYXRlZFRhcmdldCxcblx0XHRcdFx0aGFuZGxlT2JqID0gZXZlbnQuaGFuZGxlT2JqO1xuXG5cdFx0XHQvLyBGb3IgbW91c2VlbnRlci9sZWF2ZSBjYWxsIHRoZSBoYW5kbGVyIGlmIHJlbGF0ZWQgaXMgb3V0c2lkZSB0aGUgdGFyZ2V0LlxuXHRcdFx0Ly8gTkI6IE5vIHJlbGF0ZWRUYXJnZXQgaWYgdGhlIG1vdXNlIGxlZnQvZW50ZXJlZCB0aGUgYnJvd3NlciB3aW5kb3dcblx0XHRcdGlmICggIXJlbGF0ZWQgfHwgKCByZWxhdGVkICE9PSB0YXJnZXQgJiYgIWpRdWVyeS5jb250YWlucyggdGFyZ2V0LCByZWxhdGVkICkgKSApIHtcblx0XHRcdFx0ZXZlbnQudHlwZSA9IGhhbmRsZU9iai5vcmlnVHlwZTtcblx0XHRcdFx0cmV0ID0gaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRldmVudC50eXBlID0gZml4O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9XG5cdH07XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblxuXHRvbjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIG9uKCB0aGlzLCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuICk7XG5cdH0sXG5cdG9uZTogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIG9uKCB0aGlzLCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuLCAxICk7XG5cdH0sXG5cdG9mZjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZm4gKSB7XG5cdFx0dmFyIGhhbmRsZU9iaiwgdHlwZTtcblx0XHRpZiAoIHR5cGVzICYmIHR5cGVzLnByZXZlbnREZWZhdWx0ICYmIHR5cGVzLmhhbmRsZU9iaiApIHtcblxuXHRcdFx0Ly8gKCBldmVudCApICBkaXNwYXRjaGVkIGpRdWVyeS5FdmVudFxuXHRcdFx0aGFuZGxlT2JqID0gdHlwZXMuaGFuZGxlT2JqO1xuXHRcdFx0alF1ZXJ5KCB0eXBlcy5kZWxlZ2F0ZVRhcmdldCApLm9mZihcblx0XHRcdFx0aGFuZGxlT2JqLm5hbWVzcGFjZSA/XG5cdFx0XHRcdFx0aGFuZGxlT2JqLm9yaWdUeXBlICsgXCIuXCIgKyBoYW5kbGVPYmoubmFtZXNwYWNlIDpcblx0XHRcdFx0XHRoYW5kbGVPYmoub3JpZ1R5cGUsXG5cdFx0XHRcdGhhbmRsZU9iai5zZWxlY3Rvcixcblx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXJcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdFx0aWYgKCB0eXBlb2YgdHlwZXMgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMtb2JqZWN0IFssIHNlbGVjdG9yXSApXG5cdFx0XHRmb3IgKCB0eXBlIGluIHR5cGVzICkge1xuXHRcdFx0XHR0aGlzLm9mZiggdHlwZSwgc2VsZWN0b3IsIHR5cGVzWyB0eXBlIF0gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRpZiAoIHNlbGVjdG9yID09PSBmYWxzZSB8fCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcyBbLCBmbl0gKVxuXHRcdFx0Zm4gPSBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRpZiAoIGZuID09PSBmYWxzZSApIHtcblx0XHRcdGZuID0gcmV0dXJuRmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggdGhpcywgdHlwZXMsIGZuLCBzZWxlY3RvciApO1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG5yZXR1cm4galF1ZXJ5O1xufSApO1xuIl19