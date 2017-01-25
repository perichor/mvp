"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define(["../core", "../var/document", "../data/var/dataPriv", "../data/var/acceptData", "../var/hasOwn", "../event"], function (jQuery, document, dataPriv, acceptData, hasOwn) {

	"use strict";

	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend(jQuery.event, {

		trigger: function trigger(event, data, elem, onlyHandlers) {

			var i,
			    cur,
			    tmp,
			    bubbleType,
			    ontype,
			    handle,
			    special,
			    eventPath = [elem || document],
			    type = hasOwn.call(event, "type") ? event.type : event,
			    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.indexOf(".") > -1) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] : jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

				event.type = i > 1 ? bubbleType : special.bindType || type;

				// jQuery handler
				handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {

				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp) {
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;

						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function simulate(type, elem, event) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true
			});

			jQuery.event.trigger(e, null, elem);
		}

	});

	jQuery.fn.extend({

		trigger: function trigger(type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function triggerHandler(type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9ldmVudC90cmlnZ2VyLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsImpRdWVyeSIsImRvY3VtZW50IiwiZGF0YVByaXYiLCJhY2NlcHREYXRhIiwiaGFzT3duIiwicmZvY3VzTW9ycGgiLCJleHRlbmQiLCJldmVudCIsInRyaWdnZXIiLCJkYXRhIiwiZWxlbSIsIm9ubHlIYW5kbGVycyIsImkiLCJjdXIiLCJ0bXAiLCJidWJibGVUeXBlIiwib250eXBlIiwiaGFuZGxlIiwic3BlY2lhbCIsImV2ZW50UGF0aCIsInR5cGUiLCJjYWxsIiwibmFtZXNwYWNlcyIsIm5hbWVzcGFjZSIsInNwbGl0Iiwibm9kZVR5cGUiLCJ0ZXN0IiwidHJpZ2dlcmVkIiwiaW5kZXhPZiIsInNoaWZ0Iiwic29ydCIsImV4cGFuZG8iLCJFdmVudCIsImlzVHJpZ2dlciIsImpvaW4iLCJybmFtZXNwYWNlIiwiUmVnRXhwIiwicmVzdWx0IiwidW5kZWZpbmVkIiwidGFyZ2V0IiwibWFrZUFycmF5IiwiYXBwbHkiLCJub0J1YmJsZSIsImlzV2luZG93IiwiZGVsZWdhdGVUeXBlIiwicGFyZW50Tm9kZSIsInB1c2giLCJvd25lckRvY3VtZW50IiwiZGVmYXVsdFZpZXciLCJwYXJlbnRXaW5kb3ciLCJ3aW5kb3ciLCJpc1Byb3BhZ2F0aW9uU3RvcHBlZCIsImJpbmRUeXBlIiwiZ2V0IiwicHJldmVudERlZmF1bHQiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJfZGVmYXVsdCIsInBvcCIsImlzRnVuY3Rpb24iLCJzaW11bGF0ZSIsImUiLCJpc1NpbXVsYXRlZCIsImZuIiwiZWFjaCIsInRyaWdnZXJIYW5kbGVyIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUFBLE9BQVEsQ0FDUCxTQURPLEVBRVAsaUJBRk8sRUFHUCxzQkFITyxFQUlQLHdCQUpPLEVBS1AsZUFMTyxFQU9QLFVBUE8sQ0FBUixFQVFHLFVBQVVDLE1BQVYsRUFBa0JD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Z0JWLElBQWhCLEVBQXNCSCxLQUF0QixFQUE4QjtBQUN2QyxPQUFJcUQsSUFBSTVELE9BQU9NLE1BQVAsQ0FDUCxJQUFJTixPQUFPZ0MsS0FBWCxFQURPLEVBRVB6QixLQUZPLEVBR1A7QUFDQ2EsVUFBTUEsSUFEUDtBQUVDeUMsaUJBQWE7QUFGZCxJQUhPLENBQVI7O0FBU0E3RCxVQUFPTyxLQUFQLENBQWFDLE9BQWIsQ0FBc0JvRCxDQUF0QixFQUF5QixJQUF6QixFQUErQmxELElBQS9CO0FBQ0E7O0FBdEoyQixFQUE3Qjs7QUEwSkFWLFFBQU84RCxFQUFQLENBQVV4RCxNQUFWLENBQWtCOztBQUVqQkUsV0FBUyxpQkFBVVksSUFBVixFQUFnQlgsSUFBaEIsRUFBdUI7QUFDL0IsVUFBTyxLQUFLc0QsSUFBTCxDQUFXLFlBQVc7QUFDNUIvRCxXQUFPTyxLQUFQLENBQWFDLE9BQWIsQ0FBc0JZLElBQXRCLEVBQTRCWCxJQUE1QixFQUFrQyxJQUFsQztBQUNBLElBRk0sQ0FBUDtBQUdBLEdBTmdCO0FBT2pCdUQsa0JBQWdCLHdCQUFVNUMsSUFBVixFQUFnQlgsSUFBaEIsRUFBdUI7QUFDdEMsT0FBSUMsT0FBTyxLQUFNLENBQU4sQ0FBWDtBQUNBLE9BQUtBLElBQUwsRUFBWTtBQUNYLFdBQU9WLE9BQU9PLEtBQVAsQ0FBYUMsT0FBYixDQUFzQlksSUFBdEIsRUFBNEJYLElBQTVCLEVBQWtDQyxJQUFsQyxFQUF3QyxJQUF4QyxDQUFQO0FBQ0E7QUFDRDtBQVpnQixFQUFsQjs7QUFlQSxRQUFPVixNQUFQO0FBQ0MsQ0F4TEQiLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZSggW1xuXHRcIi4uL2NvcmVcIixcblx0XCIuLi92YXIvZG9jdW1lbnRcIixcblx0XCIuLi9kYXRhL3Zhci9kYXRhUHJpdlwiLFxuXHRcIi4uL2RhdGEvdmFyL2FjY2VwdERhdGFcIixcblx0XCIuLi92YXIvaGFzT3duXCIsXG5cblx0XCIuLi9ldmVudFwiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCBkb2N1bWVudCwgZGF0YVByaXYsIGFjY2VwdERhdGEsIGhhc093biApIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciByZm9jdXNNb3JwaCA9IC9eKD86Zm9jdXNpbmZvY3VzfGZvY3Vzb3V0Ymx1cikkLztcblxualF1ZXJ5LmV4dGVuZCggalF1ZXJ5LmV2ZW50LCB7XG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIGV2ZW50LCBkYXRhLCBlbGVtLCBvbmx5SGFuZGxlcnMgKSB7XG5cblx0XHR2YXIgaSwgY3VyLCB0bXAsIGJ1YmJsZVR5cGUsIG9udHlwZSwgaGFuZGxlLCBzcGVjaWFsLFxuXHRcdFx0ZXZlbnRQYXRoID0gWyBlbGVtIHx8IGRvY3VtZW50IF0sXG5cdFx0XHR0eXBlID0gaGFzT3duLmNhbGwoIGV2ZW50LCBcInR5cGVcIiApID8gZXZlbnQudHlwZSA6IGV2ZW50LFxuXHRcdFx0bmFtZXNwYWNlcyA9IGhhc093bi5jYWxsKCBldmVudCwgXCJuYW1lc3BhY2VcIiApID8gZXZlbnQubmFtZXNwYWNlLnNwbGl0KCBcIi5cIiApIDogW107XG5cblx0XHRjdXIgPSB0bXAgPSBlbGVtID0gZWxlbSB8fCBkb2N1bWVudDtcblxuXHRcdC8vIERvbid0IGRvIGV2ZW50cyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gZm9jdXMvYmx1ciBtb3JwaHMgdG8gZm9jdXNpbi9vdXQ7IGVuc3VyZSB3ZSdyZSBub3QgZmlyaW5nIHRoZW0gcmlnaHQgbm93XG5cdFx0aWYgKCByZm9jdXNNb3JwaC50ZXN0KCB0eXBlICsgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZS5pbmRleE9mKCBcIi5cIiApID4gLTEgKSB7XG5cblx0XHRcdC8vIE5hbWVzcGFjZWQgdHJpZ2dlcjsgY3JlYXRlIGEgcmVnZXhwIHRvIG1hdGNoIGV2ZW50IHR5cGUgaW4gaGFuZGxlKClcblx0XHRcdG5hbWVzcGFjZXMgPSB0eXBlLnNwbGl0KCBcIi5cIiApO1xuXHRcdFx0dHlwZSA9IG5hbWVzcGFjZXMuc2hpZnQoKTtcblx0XHRcdG5hbWVzcGFjZXMuc29ydCgpO1xuXHRcdH1cblx0XHRvbnR5cGUgPSB0eXBlLmluZGV4T2YoIFwiOlwiICkgPCAwICYmIFwib25cIiArIHR5cGU7XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYSBqUXVlcnkuRXZlbnQgb2JqZWN0LCBPYmplY3QsIG9yIGp1c3QgYW4gZXZlbnQgdHlwZSBzdHJpbmdcblx0XHRldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cblx0XHRcdGV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIHR5cGUsIHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIiAmJiBldmVudCApO1xuXG5cdFx0Ly8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxuXHRcdGV2ZW50LmlzVHJpZ2dlciA9IG9ubHlIYW5kbGVycyA/IDIgOiAzO1xuXHRcdGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbiggXCIuXCIgKTtcblx0XHRldmVudC5ybmFtZXNwYWNlID0gZXZlbnQubmFtZXNwYWNlID9cblx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oIFwiXFxcXC4oPzouKlxcXFwufClcIiApICsgXCIoXFxcXC58JClcIiApIDpcblx0XHRcdG51bGw7XG5cblx0XHQvLyBDbGVhbiB1cCB0aGUgZXZlbnQgaW4gY2FzZSBpdCBpcyBiZWluZyByZXVzZWRcblx0XHRldmVudC5yZXN1bHQgPSB1bmRlZmluZWQ7XG5cdFx0aWYgKCAhZXZlbnQudGFyZ2V0ICkge1xuXHRcdFx0ZXZlbnQudGFyZ2V0ID0gZWxlbTtcblx0XHR9XG5cblx0XHQvLyBDbG9uZSBhbnkgaW5jb21pbmcgZGF0YSBhbmQgcHJlcGVuZCB0aGUgZXZlbnQsIGNyZWF0aW5nIHRoZSBoYW5kbGVyIGFyZyBsaXN0XG5cdFx0ZGF0YSA9IGRhdGEgPT0gbnVsbCA/XG5cdFx0XHRbIGV2ZW50IF0gOlxuXHRcdFx0alF1ZXJ5Lm1ha2VBcnJheSggZGF0YSwgWyBldmVudCBdICk7XG5cblx0XHQvLyBBbGxvdyBzcGVjaWFsIGV2ZW50cyB0byBkcmF3IG91dHNpZGUgdGhlIGxpbmVzXG5cdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmIHNwZWNpYWwudHJpZ2dlciAmJiBzcGVjaWFsLnRyaWdnZXIuYXBwbHkoIGVsZW0sIGRhdGEgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZXJtaW5lIGV2ZW50IHByb3BhZ2F0aW9uIHBhdGggaW4gYWR2YW5jZSwgcGVyIFczQyBldmVudHMgc3BlYyAoIzk5NTEpXG5cdFx0Ly8gQnViYmxlIHVwIHRvIGRvY3VtZW50LCB0aGVuIHRvIHdpbmRvdzsgd2F0Y2ggZm9yIGEgZ2xvYmFsIG93bmVyRG9jdW1lbnQgdmFyICgjOTcyNClcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgIXNwZWNpYWwubm9CdWJibGUgJiYgIWpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuXG5cdFx0XHRidWJibGVUeXBlID0gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgfHwgdHlwZTtcblx0XHRcdGlmICggIXJmb2N1c01vcnBoLnRlc3QoIGJ1YmJsZVR5cGUgKyB0eXBlICkgKSB7XG5cdFx0XHRcdGN1ciA9IGN1ci5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICggOyBjdXI7IGN1ciA9IGN1ci5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRldmVudFBhdGgucHVzaCggY3VyICk7XG5cdFx0XHRcdHRtcCA9IGN1cjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT25seSBhZGQgd2luZG93IGlmIHdlIGdvdCB0byBkb2N1bWVudCAoZS5nLiwgbm90IHBsYWluIG9iaiBvciBkZXRhY2hlZCBET00pXG5cdFx0XHRpZiAoIHRtcCA9PT0gKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQgKSApIHtcblx0XHRcdFx0ZXZlbnRQYXRoLnB1c2goIHRtcC5kZWZhdWx0VmlldyB8fCB0bXAucGFyZW50V2luZG93IHx8IHdpbmRvdyApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEZpcmUgaGFuZGxlcnMgb24gdGhlIGV2ZW50IHBhdGhcblx0XHRpID0gMDtcblx0XHR3aGlsZSAoICggY3VyID0gZXZlbnRQYXRoWyBpKysgXSApICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXG5cdFx0XHRldmVudC50eXBlID0gaSA+IDEgP1xuXHRcdFx0XHRidWJibGVUeXBlIDpcblx0XHRcdFx0c3BlY2lhbC5iaW5kVHlwZSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBqUXVlcnkgaGFuZGxlclxuXHRcdFx0aGFuZGxlID0gKCBkYXRhUHJpdi5nZXQoIGN1ciwgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSAmJlxuXHRcdFx0XHRkYXRhUHJpdi5nZXQoIGN1ciwgXCJoYW5kbGVcIiApO1xuXHRcdFx0aWYgKCBoYW5kbGUgKSB7XG5cdFx0XHRcdGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5hdGl2ZSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSBvbnR5cGUgJiYgY3VyWyBvbnR5cGUgXTtcblx0XHRcdGlmICggaGFuZGxlICYmIGhhbmRsZS5hcHBseSAmJiBhY2NlcHREYXRhKCBjdXIgKSApIHtcblx0XHRcdFx0ZXZlbnQucmVzdWx0ID0gaGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcblx0XHRcdFx0aWYgKCBldmVudC5yZXN1bHQgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZXZlbnQudHlwZSA9IHR5cGU7XG5cblx0XHQvLyBJZiBub2JvZHkgcHJldmVudGVkIHRoZSBkZWZhdWx0IGFjdGlvbiwgZG8gaXQgbm93XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSApIHtcblxuXHRcdFx0aWYgKCAoICFzcGVjaWFsLl9kZWZhdWx0IHx8XG5cdFx0XHRcdHNwZWNpYWwuX2RlZmF1bHQuYXBwbHkoIGV2ZW50UGF0aC5wb3AoKSwgZGF0YSApID09PSBmYWxzZSApICYmXG5cdFx0XHRcdGFjY2VwdERhdGEoIGVsZW0gKSApIHtcblxuXHRcdFx0XHQvLyBDYWxsIGEgbmF0aXZlIERPTSBtZXRob2Qgb24gdGhlIHRhcmdldCB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGV2ZW50LlxuXHRcdFx0XHQvLyBEb24ndCBkbyBkZWZhdWx0IGFjdGlvbnMgb24gd2luZG93LCB0aGF0J3Mgd2hlcmUgZ2xvYmFsIHZhcmlhYmxlcyBiZSAoIzYxNzApXG5cdFx0XHRcdGlmICggb250eXBlICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCBlbGVtWyB0eXBlIF0gKSAmJiAhalF1ZXJ5LmlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdFx0XHQvLyBEb24ndCByZS10cmlnZ2VyIGFuIG9uRk9PIGV2ZW50IHdoZW4gd2UgY2FsbCBpdHMgRk9PKCkgbWV0aG9kXG5cdFx0XHRcdFx0dG1wID0gZWxlbVsgb250eXBlIF07XG5cblx0XHRcdFx0XHRpZiAoIHRtcCApIHtcblx0XHRcdFx0XHRcdGVsZW1bIG9udHlwZSBdID0gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBQcmV2ZW50IHJlLXRyaWdnZXJpbmcgb2YgdGhlIHNhbWUgZXZlbnQsIHNpbmNlIHdlIGFscmVhZHkgYnViYmxlZCBpdCBhYm92ZVxuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB0eXBlO1xuXHRcdFx0XHRcdGVsZW1bIHR5cGUgXSgpO1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdFx0XHRpZiAoIHRtcCApIHtcblx0XHRcdFx0XHRcdGVsZW1bIG9udHlwZSBdID0gdG1wO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBldmVudC5yZXN1bHQ7XG5cdH0sXG5cblx0Ly8gUGlnZ3liYWNrIG9uIGEgZG9ub3IgZXZlbnQgdG8gc2ltdWxhdGUgYSBkaWZmZXJlbnQgb25lXG5cdC8vIFVzZWQgb25seSBmb3IgYGZvY3VzKGluIHwgb3V0KWAgZXZlbnRzXG5cdHNpbXVsYXRlOiBmdW5jdGlvbiggdHlwZSwgZWxlbSwgZXZlbnQgKSB7XG5cdFx0dmFyIGUgPSBqUXVlcnkuZXh0ZW5kKFxuXHRcdFx0bmV3IGpRdWVyeS5FdmVudCgpLFxuXHRcdFx0ZXZlbnQsXG5cdFx0XHR7XG5cdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdGlzU2ltdWxhdGVkOiB0cnVlXG5cdFx0XHR9XG5cdFx0KTtcblxuXHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCBlLCBudWxsLCBlbGVtICk7XG5cdH1cblxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgdGhpcyApO1xuXHRcdH0gKTtcblx0fSxcblx0dHJpZ2dlckhhbmRsZXI6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHRcdHZhciBlbGVtID0gdGhpc1sgMCBdO1xuXHRcdGlmICggZWxlbSApIHtcblx0XHRcdHJldHVybiBqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgZWxlbSwgdHJ1ZSApO1xuXHRcdH1cblx0fVxufSApO1xuXG5yZXR1cm4galF1ZXJ5O1xufSApO1xuIl19