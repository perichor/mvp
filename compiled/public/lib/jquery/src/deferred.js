"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define(["./core", "./var/slice", "./callbacks"], function (jQuery, slice) {

	"use strict";

	function Identity(v) {
		return v;
	}
	function Thrower(ex) {
		throw ex;
	}

	function adoptValue(value, resolve, reject) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if (value && jQuery.isFunction(method = value.promise)) {
				method.call(value).done(resolve).fail(reject);

				// Other thenables
			} else if (value && jQuery.isFunction(method = value.then)) {
				method.call(value, resolve, reject);

				// Other non-thenables
			} else {

				// Support: Android 4.0 only
				// Strict mode functions invoked without .call/.apply get global-object context
				resolve.call(undefined, value);
			}

			// For Promises/A+, convert exceptions into rejections
			// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
			// Deferred#then to conditionally suppress rejection.
		} catch (value) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.call(undefined, value);
		}
	}

	jQuery.extend({

		Deferred: function Deferred(func) {
			var tuples = [

			// action, add listener, callbacks,
			// ... .then handlers, argument index, [final state]
			["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
			    _state = "pending",
			    _promise = {
				state: function state() {
					return _state;
				},
				always: function always() {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				"catch": function _catch(fn) {
					return _promise.then(null, fn);
				},

				// Keep pipe for back-compat
				pipe: function pipe() /* fnDone, fnFail, fnProgress */{
					var fns = arguments;

					return jQuery.Deferred(function (newDefer) {
						jQuery.each(tuples, function (i, tuple) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[tuple[1]](function () {
								var returned = fn && fn.apply(this, arguments);
								if (returned && jQuery.isFunction(returned.promise)) {
									returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
								} else {
									newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
								}
							});
						});
						fns = null;
					}).promise();
				},
				then: function then(onFulfilled, onRejected, onProgress) {
					var maxDepth = 0;
					function resolve(depth, deferred, handler, special) {
						return function () {
							var that = this,
							    args = arguments,
							    mightThrow = function mightThrow() {
								var returned, then;

								// Support: Promises/A+ section 2.3.3.3.3
								// https://promisesaplus.com/#point-59
								// Ignore double-resolution attempts
								if (depth < maxDepth) {
									return;
								}

								returned = handler.apply(that, args);

								// Support: Promises/A+ section 2.3.1
								// https://promisesaplus.com/#point-48
								if (returned === deferred.promise()) {
									throw new TypeError("Thenable self-resolution");
								}

								// Support: Promises/A+ sections 2.3.3.1, 3.5
								// https://promisesaplus.com/#point-54
								// https://promisesaplus.com/#point-75
								// Retrieve `then` only once
								then = returned && (

								// Support: Promises/A+ section 2.3.4
								// https://promisesaplus.com/#point-64
								// Only check objects and functions for thenability
								(typeof returned === "undefined" ? "undefined" : _typeof(returned)) === "object" || typeof returned === "function") && returned.then;

								// Handle a returned thenable
								if (jQuery.isFunction(then)) {

									// Special processors (notify) just wait for resolution
									if (special) {
										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));

										// Normal processors (resolve) also hook into progress
									} else {

										// ...and disregard older resolution values
										maxDepth++;

										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
									}

									// Handle all other returned values
								} else {

									// Only substitute handlers pass on context
									// and multiple values (non-spec behavior)
									if (handler !== Identity) {
										that = undefined;
										args = [returned];
									}

									// Process the value(s)
									// Default process is resolve
									(special || deferred.resolveWith)(that, args);
								}
							},


							// Only normal processors (resolve) catch and reject exceptions
							process = special ? mightThrow : function () {
								try {
									mightThrow();
								} catch (e) {

									if (jQuery.Deferred.exceptionHook) {
										jQuery.Deferred.exceptionHook(e, process.stackTrace);
									}

									// Support: Promises/A+ section 2.3.3.3.4.1
									// https://promisesaplus.com/#point-61
									// Ignore post-resolution exceptions
									if (depth + 1 >= maxDepth) {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if (handler !== Thrower) {
											that = undefined;
											args = [e];
										}

										deferred.rejectWith(that, args);
									}
								}
							};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if (depth) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if (jQuery.Deferred.getStackHook) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout(process);
							}
						};
					}

					return jQuery.Deferred(function (newDefer) {

						// progress_handlers.add( ... )
						tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

						// fulfilled_handlers.add( ... )
						tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));

						// rejected_handlers.add( ... )
						tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function promise(obj) {
					return obj != null ? jQuery.extend(obj, _promise) : _promise;
				}
			},
			    deferred = {};

			// Add list-specific methods
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
				    stateString = tuple[5];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				_promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						_state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[3 - i][2].disable,

					// progress_callbacks.lock
					tuples[0][2].lock);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add(tuple[3].fire);

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			_promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function when(singleValue) {
			var

			// count of uncompleted subordinates
			remaining = arguments.length,


			// count of unprocessed arguments
			i = remaining,


			// subordinate fulfillment data
			resolveContexts = Array(i),
			    resolveValues = slice.call(arguments),


			// the master Deferred
			master = jQuery.Deferred(),


			// subordinate callback factory
			updateFunc = function updateFunc(i) {
				return function (value) {
					resolveContexts[i] = this;
					resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
					if (! --remaining) {
						master.resolveWith(resolveContexts, resolveValues);
					}
				};
			};

			// Single- and empty arguments are adopted like Promise.resolve
			if (remaining <= 1) {
				adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject);

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if (master.state() === "pending" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {

					return master.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while (i--) {
				adoptValue(resolveValues[i], updateFunc(i), master.reject);
			}

			return master.promise();
		}
	});

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9kZWZlcnJlZC5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCJqUXVlcnkiLCJzbGljZSIsIklkZW50aXR5IiwidiIsIlRocm93ZXIiLCJleCIsImFkb3B0VmFsdWUiLCJ2YWx1ZSIsInJlc29sdmUiLCJyZWplY3QiLCJtZXRob2QiLCJpc0Z1bmN0aW9uIiwicHJvbWlzZSIsImNhbGwiLCJkb25lIiwiZmFpbCIsInRoZW4iLCJ1bmRlZmluZWQiLCJleHRlbmQiLCJEZWZlcnJlZCIsImZ1bmMiLCJ0dXBsZXMiLCJDYWxsYmFja3MiLCJzdGF0ZSIsImFsd2F5cyIsImRlZmVycmVkIiwiYXJndW1lbnRzIiwiZm4iLCJwaXBlIiwiZm5zIiwibmV3RGVmZXIiLCJlYWNoIiwiaSIsInR1cGxlIiwicmV0dXJuZWQiLCJhcHBseSIsInByb2dyZXNzIiwibm90aWZ5Iiwib25GdWxmaWxsZWQiLCJvblJlamVjdGVkIiwib25Qcm9ncmVzcyIsIm1heERlcHRoIiwiZGVwdGgiLCJoYW5kbGVyIiwic3BlY2lhbCIsInRoYXQiLCJhcmdzIiwibWlnaHRUaHJvdyIsIlR5cGVFcnJvciIsIm5vdGlmeVdpdGgiLCJyZXNvbHZlV2l0aCIsInByb2Nlc3MiLCJlIiwiZXhjZXB0aW9uSG9vayIsInN0YWNrVHJhY2UiLCJyZWplY3RXaXRoIiwiZ2V0U3RhY2tIb29rIiwid2luZG93Iiwic2V0VGltZW91dCIsImFkZCIsIm9iaiIsImxpc3QiLCJzdGF0ZVN0cmluZyIsImRpc2FibGUiLCJsb2NrIiwiZmlyZSIsImZpcmVXaXRoIiwid2hlbiIsInNpbmdsZVZhbHVlIiwicmVtYWluaW5nIiwibGVuZ3RoIiwicmVzb2x2ZUNvbnRleHRzIiwiQXJyYXkiLCJyZXNvbHZlVmFsdWVzIiwibWFzdGVyIiwidXBkYXRlRnVuYyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBQSxPQUFRLENBQ1AsUUFETyxFQUVQLGFBRk8sRUFHUCxhQUhPLENB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QkE7QUFDQSxPQUFLSixhQUFhLENBQWxCLEVBQXNCO0FBQ3JCL0QsZUFBWThELFdBQVosRUFBeUJNLE9BQU81RCxJQUFQLENBQWE2RCxXQUFZM0MsQ0FBWixDQUFiLEVBQStCeEIsT0FBeEQsRUFBaUVrRSxPQUFPakUsTUFBeEU7O0FBRUE7QUFDQSxRQUFLaUUsT0FBT25ELEtBQVAsT0FBbUIsU0FBbkIsSUFDSnZCLE9BQU9XLFVBQVAsQ0FBbUI4RCxjQUFlekMsQ0FBZixLQUFzQnlDLGNBQWV6QyxDQUFmLEVBQW1CaEIsSUFBNUQsQ0FERCxFQUNzRTs7QUFFckUsWUFBTzBELE9BQU8xRCxJQUFQLEVBQVA7QUFDQTtBQUNEOztBQUVEO0FBQ0EsVUFBUWdCLEdBQVIsRUFBYztBQUNiMUIsZUFBWW1FLGNBQWV6QyxDQUFmLENBQVosRUFBZ0MyQyxXQUFZM0MsQ0FBWixDQUFoQyxFQUFpRDBDLE9BQU9qRSxNQUF4RDtBQUNBOztBQUVELFVBQU9pRSxPQUFPOUQsT0FBUCxFQUFQO0FBQ0E7QUFqVmEsRUFBZjs7QUFvVkEsUUFBT1osTUFBUDtBQUNDLENBcFlEIiwiZmlsZSI6ImRlZmVycmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKCBbXG5cdFwiLi9jb3JlXCIsXG5cdFwiLi92YXIvc2xpY2VcIixcblx0XCIuL2NhbGxiYWNrc1wiXG5dLCBmdW5jdGlvbiggalF1ZXJ5LCBzbGljZSApIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIElkZW50aXR5KCB2ICkge1xuXHRyZXR1cm4gdjtcbn1cbmZ1bmN0aW9uIFRocm93ZXIoIGV4ICkge1xuXHR0aHJvdyBleDtcbn1cblxuZnVuY3Rpb24gYWRvcHRWYWx1ZSggdmFsdWUsIHJlc29sdmUsIHJlamVjdCApIHtcblx0dmFyIG1ldGhvZDtcblxuXHR0cnkge1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIHByb21pc2UgYXNwZWN0IGZpcnN0IHRvIHByaXZpbGVnZSBzeW5jaHJvbm91cyBiZWhhdmlvclxuXHRcdGlmICggdmFsdWUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oICggbWV0aG9kID0gdmFsdWUucHJvbWlzZSApICkgKSB7XG5cdFx0XHRtZXRob2QuY2FsbCggdmFsdWUgKS5kb25lKCByZXNvbHZlICkuZmFpbCggcmVqZWN0ICk7XG5cblx0XHQvLyBPdGhlciB0aGVuYWJsZXNcblx0XHR9IGVsc2UgaWYgKCB2YWx1ZSAmJiBqUXVlcnkuaXNGdW5jdGlvbiggKCBtZXRob2QgPSB2YWx1ZS50aGVuICkgKSApIHtcblx0XHRcdG1ldGhvZC5jYWxsKCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0ICk7XG5cblx0XHQvLyBPdGhlciBub24tdGhlbmFibGVzXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAgb25seVxuXHRcdFx0Ly8gU3RyaWN0IG1vZGUgZnVuY3Rpb25zIGludm9rZWQgd2l0aG91dCAuY2FsbC8uYXBwbHkgZ2V0IGdsb2JhbC1vYmplY3QgY29udGV4dFxuXHRcdFx0cmVzb2x2ZS5jYWxsKCB1bmRlZmluZWQsIHZhbHVlICk7XG5cdFx0fVxuXG5cdC8vIEZvciBQcm9taXNlcy9BKywgY29udmVydCBleGNlcHRpb25zIGludG8gcmVqZWN0aW9uc1xuXHQvLyBTaW5jZSBqUXVlcnkud2hlbiBkb2Vzbid0IHVud3JhcCB0aGVuYWJsZXMsIHdlIGNhbiBza2lwIHRoZSBleHRyYSBjaGVja3MgYXBwZWFyaW5nIGluXG5cdC8vIERlZmVycmVkI3RoZW4gdG8gY29uZGl0aW9uYWxseSBzdXBwcmVzcyByZWplY3Rpb24uXG5cdH0gY2F0Y2ggKCB2YWx1ZSApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIG9ubHlcblx0XHQvLyBTdHJpY3QgbW9kZSBmdW5jdGlvbnMgaW52b2tlZCB3aXRob3V0IC5jYWxsLy5hcHBseSBnZXQgZ2xvYmFsLW9iamVjdCBjb250ZXh0XG5cdFx0cmVqZWN0LmNhbGwoIHVuZGVmaW5lZCwgdmFsdWUgKTtcblx0fVxufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0RGVmZXJyZWQ6IGZ1bmN0aW9uKCBmdW5jICkge1xuXHRcdHZhciB0dXBsZXMgPSBbXG5cblx0XHRcdFx0Ly8gYWN0aW9uLCBhZGQgbGlzdGVuZXIsIGNhbGxiYWNrcyxcblx0XHRcdFx0Ly8gLi4uIC50aGVuIGhhbmRsZXJzLCBhcmd1bWVudCBpbmRleCwgW2ZpbmFsIHN0YXRlXVxuXHRcdFx0XHRbIFwibm90aWZ5XCIsIFwicHJvZ3Jlc3NcIiwgalF1ZXJ5LkNhbGxiYWNrcyggXCJtZW1vcnlcIiApLFxuXHRcdFx0XHRcdGpRdWVyeS5DYWxsYmFja3MoIFwibWVtb3J5XCIgKSwgMiBdLFxuXHRcdFx0XHRbIFwicmVzb2x2ZVwiLCBcImRvbmVcIiwgalF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksXG5cdFx0XHRcdFx0alF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksIDAsIFwicmVzb2x2ZWRcIiBdLFxuXHRcdFx0XHRbIFwicmVqZWN0XCIsIFwiZmFpbFwiLCBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSxcblx0XHRcdFx0XHRqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSwgMSwgXCJyZWplY3RlZFwiIF1cblx0XHRcdF0sXG5cdFx0XHRzdGF0ZSA9IFwicGVuZGluZ1wiLFxuXHRcdFx0cHJvbWlzZSA9IHtcblx0XHRcdFx0c3RhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YWx3YXlzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRkZWZlcnJlZC5kb25lKCBhcmd1bWVudHMgKS5mYWlsKCBhcmd1bWVudHMgKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJjYXRjaFwiOiBmdW5jdGlvbiggZm4gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHByb21pc2UudGhlbiggbnVsbCwgZm4gKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBLZWVwIHBpcGUgZm9yIGJhY2stY29tcGF0XG5cdFx0XHRcdHBpcGU6IGZ1bmN0aW9uKCAvKiBmbkRvbmUsIGZuRmFpbCwgZm5Qcm9ncmVzcyAqLyApIHtcblx0XHRcdFx0XHR2YXIgZm5zID0gYXJndW1lbnRzO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGpRdWVyeS5EZWZlcnJlZCggZnVuY3Rpb24oIG5ld0RlZmVyICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmVhY2goIHR1cGxlcywgZnVuY3Rpb24oIGksIHR1cGxlICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIE1hcCB0dXBsZXMgKHByb2dyZXNzLCBkb25lLCBmYWlsKSB0byBhcmd1bWVudHMgKGRvbmUsIGZhaWwsIHByb2dyZXNzKVxuXHRcdFx0XHRcdFx0XHR2YXIgZm4gPSBqUXVlcnkuaXNGdW5jdGlvbiggZm5zWyB0dXBsZVsgNCBdIF0gKSAmJiBmbnNbIHR1cGxlWyA0IF0gXTtcblxuXHRcdFx0XHRcdFx0XHQvLyBkZWZlcnJlZC5wcm9ncmVzcyhmdW5jdGlvbigpIHsgYmluZCB0byBuZXdEZWZlciBvciBuZXdEZWZlci5ub3RpZnkgfSlcblx0XHRcdFx0XHRcdFx0Ly8gZGVmZXJyZWQuZG9uZShmdW5jdGlvbigpIHsgYmluZCB0byBuZXdEZWZlciBvciBuZXdEZWZlci5yZXNvbHZlIH0pXG5cdFx0XHRcdFx0XHRcdC8vIGRlZmVycmVkLmZhaWwoZnVuY3Rpb24oKSB7IGJpbmQgdG8gbmV3RGVmZXIgb3IgbmV3RGVmZXIucmVqZWN0IH0pXG5cdFx0XHRcdFx0XHRcdGRlZmVycmVkWyB0dXBsZVsgMSBdIF0oIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciByZXR1cm5lZCA9IGZuICYmIGZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIHJldHVybmVkICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCByZXR1cm5lZC5wcm9taXNlICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5lZC5wcm9taXNlKClcblx0XHRcdFx0XHRcdFx0XHRcdFx0LnByb2dyZXNzKCBuZXdEZWZlci5ub3RpZnkgKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQuZG9uZSggbmV3RGVmZXIucmVzb2x2ZSApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5mYWlsKCBuZXdEZWZlci5yZWplY3QgKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXJbIHR1cGxlWyAwIF0gKyBcIldpdGhcIiBdKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmbiA/IFsgcmV0dXJuZWQgXSA6IGFyZ3VtZW50c1xuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdGZucyA9IG51bGw7XG5cdFx0XHRcdFx0fSApLnByb21pc2UoKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0dGhlbjogZnVuY3Rpb24oIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBvblByb2dyZXNzICkge1xuXHRcdFx0XHRcdHZhciBtYXhEZXB0aCA9IDA7XG5cdFx0XHRcdFx0ZnVuY3Rpb24gcmVzb2x2ZSggZGVwdGgsIGRlZmVycmVkLCBoYW5kbGVyLCBzcGVjaWFsICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0XHRcdFx0XHRcdFx0YXJncyA9IGFyZ3VtZW50cyxcblx0XHRcdFx0XHRcdFx0XHRtaWdodFRocm93ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgcmV0dXJuZWQsIHRoZW47XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb24gMi4zLjMuMy4zXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC01OVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWdub3JlIGRvdWJsZS1yZXNvbHV0aW9uIGF0dGVtcHRzXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGRlcHRoIDwgbWF4RGVwdGggKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQgPSBoYW5kbGVyLmFwcGx5KCB0aGF0LCBhcmdzICk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb24gMi4zLjFcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTQ4XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHJldHVybmVkID09PSBkZWZlcnJlZC5wcm9taXNlKCkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoIFwiVGhlbmFibGUgc2VsZi1yZXNvbHV0aW9uXCIgKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbnMgMi4zLjMuMSwgMy41XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC01NFxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNzVcblx0XHRcdFx0XHRcdFx0XHRcdC8vIFJldHJpZXZlIGB0aGVuYCBvbmx5IG9uY2Vcblx0XHRcdFx0XHRcdFx0XHRcdHRoZW4gPSByZXR1cm5lZCAmJlxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb24gMi4zLjRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNjRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gT25seSBjaGVjayBvYmplY3RzIGFuZCBmdW5jdGlvbnMgZm9yIHRoZW5hYmlsaXR5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCggdHlwZW9mIHJldHVybmVkID09PSBcIm9iamVjdFwiIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZW9mIHJldHVybmVkID09PSBcImZ1bmN0aW9uXCIgKSAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5lZC50aGVuO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBIYW5kbGUgYSByZXR1cm5lZCB0aGVuYWJsZVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdGhlbiApICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFNwZWNpYWwgcHJvY2Vzc29ycyAobm90aWZ5KSBqdXN0IHdhaXQgZm9yIHJlc29sdXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBzcGVjaWFsICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoZW4uY2FsbChcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBJZGVudGl0eSwgc3BlY2lhbCApLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBUaHJvd2VyLCBzcGVjaWFsIClcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIE5vcm1hbCBwcm9jZXNzb3JzIChyZXNvbHZlKSBhbHNvIGhvb2sgaW50byBwcm9ncmVzc1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gLi4uYW5kIGRpc3JlZ2FyZCBvbGRlciByZXNvbHV0aW9uIHZhbHVlc1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1heERlcHRoKys7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGVuLmNhbGwoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5lZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoIG1heERlcHRoLCBkZWZlcnJlZCwgSWRlbnRpdHksIHNwZWNpYWwgKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoIG1heERlcHRoLCBkZWZlcnJlZCwgVGhyb3dlciwgc3BlY2lhbCApLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBJZGVudGl0eSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmZXJyZWQubm90aWZ5V2l0aCApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBIYW5kbGUgYWxsIG90aGVyIHJldHVybmVkIHZhbHVlc1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBPbmx5IHN1YnN0aXR1dGUgaGFuZGxlcnMgcGFzcyBvbiBjb250ZXh0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGFuZCBtdWx0aXBsZSB2YWx1ZXMgKG5vbi1zcGVjIGJlaGF2aW9yKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGhhbmRsZXIgIT09IElkZW50aXR5ICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoYXQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJncyA9IFsgcmV0dXJuZWQgXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFByb2Nlc3MgdGhlIHZhbHVlKHMpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIERlZmF1bHQgcHJvY2VzcyBpcyByZXNvbHZlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCggc3BlY2lhbCB8fCBkZWZlcnJlZC5yZXNvbHZlV2l0aCApKCB0aGF0LCBhcmdzICk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdFx0XHRcdC8vIE9ubHkgbm9ybWFsIHByb2Nlc3NvcnMgKHJlc29sdmUpIGNhdGNoIGFuZCByZWplY3QgZXhjZXB0aW9uc1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3MgPSBzcGVjaWFsID9cblx0XHRcdFx0XHRcdFx0XHRcdG1pZ2h0VGhyb3cgOlxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWlnaHRUaHJvdygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LkRlZmVycmVkLmV4Y2VwdGlvbkhvb2sgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuRGVmZXJyZWQuZXhjZXB0aW9uSG9vayggZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzcy5zdGFja1RyYWNlICk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuMy4zLjQuMVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTYxXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWdub3JlIHBvc3QtcmVzb2x1dGlvbiBleGNlcHRpb25zXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBkZXB0aCArIDEgPj0gbWF4RGVwdGggKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIE9ubHkgc3Vic3RpdHV0ZSBoYW5kbGVycyBwYXNzIG9uIGNvbnRleHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGFuZCBtdWx0aXBsZSB2YWx1ZXMgKG5vbi1zcGVjIGJlaGF2aW9yKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBoYW5kbGVyICE9PSBUaHJvd2VyICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGF0ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhcmdzID0gWyBlIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoIHRoYXQsIGFyZ3MgKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuMy4zLjFcblx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNTdcblx0XHRcdFx0XHRcdFx0Ly8gUmUtcmVzb2x2ZSBwcm9taXNlcyBpbW1lZGlhdGVseSB0byBkb2RnZSBmYWxzZSByZWplY3Rpb24gZnJvbVxuXHRcdFx0XHRcdFx0XHQvLyBzdWJzZXF1ZW50IGVycm9yc1xuXHRcdFx0XHRcdFx0XHRpZiAoIGRlcHRoICkge1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3MoKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIENhbGwgYW4gb3B0aW9uYWwgaG9vayB0byByZWNvcmQgdGhlIHN0YWNrLCBpbiBjYXNlIG9mIGV4Y2VwdGlvblxuXHRcdFx0XHRcdFx0XHRcdC8vIHNpbmNlIGl0J3Mgb3RoZXJ3aXNlIGxvc3Qgd2hlbiBleGVjdXRpb24gZ29lcyBhc3luY1xuXHRcdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LkRlZmVycmVkLmdldFN0YWNrSG9vayApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3Muc3RhY2tUcmFjZSA9IGpRdWVyeS5EZWZlcnJlZC5nZXRTdGFja0hvb2soKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoIHByb2Nlc3MgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4galF1ZXJ5LkRlZmVycmVkKCBmdW5jdGlvbiggbmV3RGVmZXIgKSB7XG5cblx0XHRcdFx0XHRcdC8vIHByb2dyZXNzX2hhbmRsZXJzLmFkZCggLi4uIClcblx0XHRcdFx0XHRcdHR1cGxlc1sgMCBdWyAzIF0uYWRkKFxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKFxuXHRcdFx0XHRcdFx0XHRcdDAsXG5cdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXIsXG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmlzRnVuY3Rpb24oIG9uUHJvZ3Jlc3MgKSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRvblByb2dyZXNzIDpcblx0XHRcdFx0XHRcdFx0XHRcdElkZW50aXR5LFxuXHRcdFx0XHRcdFx0XHRcdG5ld0RlZmVyLm5vdGlmeVdpdGhcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0Ly8gZnVsZmlsbGVkX2hhbmRsZXJzLmFkZCggLi4uIClcblx0XHRcdFx0XHRcdHR1cGxlc1sgMSBdWyAzIF0uYWRkKFxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKFxuXHRcdFx0XHRcdFx0XHRcdDAsXG5cdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXIsXG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmlzRnVuY3Rpb24oIG9uRnVsZmlsbGVkICkgP1xuXHRcdFx0XHRcdFx0XHRcdFx0b25GdWxmaWxsZWQgOlxuXHRcdFx0XHRcdFx0XHRcdFx0SWRlbnRpdHlcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0Ly8gcmVqZWN0ZWRfaGFuZGxlcnMuYWRkKCAuLi4gKVxuXHRcdFx0XHRcdFx0dHVwbGVzWyAyIF1bIDMgXS5hZGQoXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoXG5cdFx0XHRcdFx0XHRcdFx0MCxcblx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlcixcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuaXNGdW5jdGlvbiggb25SZWplY3RlZCApID9cblx0XHRcdFx0XHRcdFx0XHRcdG9uUmVqZWN0ZWQgOlxuXHRcdFx0XHRcdFx0XHRcdFx0VGhyb3dlclxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0gKS5wcm9taXNlKCk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gR2V0IGEgcHJvbWlzZSBmb3IgdGhpcyBkZWZlcnJlZFxuXHRcdFx0XHQvLyBJZiBvYmogaXMgcHJvdmlkZWQsIHRoZSBwcm9taXNlIGFzcGVjdCBpcyBhZGRlZCB0byB0aGUgb2JqZWN0XG5cdFx0XHRcdHByb21pc2U6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9iaiAhPSBudWxsID8galF1ZXJ5LmV4dGVuZCggb2JqLCBwcm9taXNlICkgOiBwcm9taXNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZGVmZXJyZWQgPSB7fTtcblxuXHRcdC8vIEFkZCBsaXN0LXNwZWNpZmljIG1ldGhvZHNcblx0XHRqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XG5cdFx0XHR2YXIgbGlzdCA9IHR1cGxlWyAyIF0sXG5cdFx0XHRcdHN0YXRlU3RyaW5nID0gdHVwbGVbIDUgXTtcblxuXHRcdFx0Ly8gcHJvbWlzZS5wcm9ncmVzcyA9IGxpc3QuYWRkXG5cdFx0XHQvLyBwcm9taXNlLmRvbmUgPSBsaXN0LmFkZFxuXHRcdFx0Ly8gcHJvbWlzZS5mYWlsID0gbGlzdC5hZGRcblx0XHRcdHByb21pc2VbIHR1cGxlWyAxIF0gXSA9IGxpc3QuYWRkO1xuXG5cdFx0XHQvLyBIYW5kbGUgc3RhdGVcblx0XHRcdGlmICggc3RhdGVTdHJpbmcgKSB7XG5cdFx0XHRcdGxpc3QuYWRkKFxuXHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHQvLyBzdGF0ZSA9IFwicmVzb2x2ZWRcIiAoaS5lLiwgZnVsZmlsbGVkKVxuXHRcdFx0XHRcdFx0Ly8gc3RhdGUgPSBcInJlamVjdGVkXCJcblx0XHRcdFx0XHRcdHN0YXRlID0gc3RhdGVTdHJpbmc7XG5cdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdC8vIHJlamVjdGVkX2NhbGxiYWNrcy5kaXNhYmxlXG5cdFx0XHRcdFx0Ly8gZnVsZmlsbGVkX2NhbGxiYWNrcy5kaXNhYmxlXG5cdFx0XHRcdFx0dHVwbGVzWyAzIC0gaSBdWyAyIF0uZGlzYWJsZSxcblxuXHRcdFx0XHRcdC8vIHByb2dyZXNzX2NhbGxiYWNrcy5sb2NrXG5cdFx0XHRcdFx0dHVwbGVzWyAwIF1bIDIgXS5sb2NrXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHByb2dyZXNzX2hhbmRsZXJzLmZpcmVcblx0XHRcdC8vIGZ1bGZpbGxlZF9oYW5kbGVycy5maXJlXG5cdFx0XHQvLyByZWplY3RlZF9oYW5kbGVycy5maXJlXG5cdFx0XHRsaXN0LmFkZCggdHVwbGVbIDMgXS5maXJlICk7XG5cblx0XHRcdC8vIGRlZmVycmVkLm5vdGlmeSA9IGZ1bmN0aW9uKCkgeyBkZWZlcnJlZC5ub3RpZnlXaXRoKC4uLikgfVxuXHRcdFx0Ly8gZGVmZXJyZWQucmVzb2x2ZSA9IGZ1bmN0aW9uKCkgeyBkZWZlcnJlZC5yZXNvbHZlV2l0aCguLi4pIH1cblx0XHRcdC8vIGRlZmVycmVkLnJlamVjdCA9IGZ1bmN0aW9uKCkgeyBkZWZlcnJlZC5yZWplY3RXaXRoKC4uLikgfVxuXHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAwIF0gXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkZWZlcnJlZFsgdHVwbGVbIDAgXSArIFwiV2l0aFwiIF0oIHRoaXMgPT09IGRlZmVycmVkID8gdW5kZWZpbmVkIDogdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gZGVmZXJyZWQubm90aWZ5V2l0aCA9IGxpc3QuZmlyZVdpdGhcblx0XHRcdC8vIGRlZmVycmVkLnJlc29sdmVXaXRoID0gbGlzdC5maXJlV2l0aFxuXHRcdFx0Ly8gZGVmZXJyZWQucmVqZWN0V2l0aCA9IGxpc3QuZmlyZVdpdGhcblx0XHRcdGRlZmVycmVkWyB0dXBsZVsgMCBdICsgXCJXaXRoXCIgXSA9IGxpc3QuZmlyZVdpdGg7XG5cdFx0fSApO1xuXG5cdFx0Ly8gTWFrZSB0aGUgZGVmZXJyZWQgYSBwcm9taXNlXG5cdFx0cHJvbWlzZS5wcm9taXNlKCBkZWZlcnJlZCApO1xuXG5cdFx0Ly8gQ2FsbCBnaXZlbiBmdW5jIGlmIGFueVxuXHRcdGlmICggZnVuYyApIHtcblx0XHRcdGZ1bmMuY2FsbCggZGVmZXJyZWQsIGRlZmVycmVkICk7XG5cdFx0fVxuXG5cdFx0Ly8gQWxsIGRvbmUhXG5cdFx0cmV0dXJuIGRlZmVycmVkO1xuXHR9LFxuXG5cdC8vIERlZmVycmVkIGhlbHBlclxuXHR3aGVuOiBmdW5jdGlvbiggc2luZ2xlVmFsdWUgKSB7XG5cdFx0dmFyXG5cblx0XHRcdC8vIGNvdW50IG9mIHVuY29tcGxldGVkIHN1Ym9yZGluYXRlc1xuXHRcdFx0cmVtYWluaW5nID0gYXJndW1lbnRzLmxlbmd0aCxcblxuXHRcdFx0Ly8gY291bnQgb2YgdW5wcm9jZXNzZWQgYXJndW1lbnRzXG5cdFx0XHRpID0gcmVtYWluaW5nLFxuXG5cdFx0XHQvLyBzdWJvcmRpbmF0ZSBmdWxmaWxsbWVudCBkYXRhXG5cdFx0XHRyZXNvbHZlQ29udGV4dHMgPSBBcnJheSggaSApLFxuXHRcdFx0cmVzb2x2ZVZhbHVlcyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApLFxuXG5cdFx0XHQvLyB0aGUgbWFzdGVyIERlZmVycmVkXG5cdFx0XHRtYXN0ZXIgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblxuXHRcdFx0Ly8gc3Vib3JkaW5hdGUgY2FsbGJhY2sgZmFjdG9yeVxuXHRcdFx0dXBkYXRlRnVuYyA9IGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRcdHJlc29sdmVDb250ZXh0c1sgaSBdID0gdGhpcztcblx0XHRcdFx0XHRyZXNvbHZlVmFsdWVzWyBpIF0gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApIDogdmFsdWU7XG5cdFx0XHRcdFx0aWYgKCAhKCAtLXJlbWFpbmluZyApICkge1xuXHRcdFx0XHRcdFx0bWFzdGVyLnJlc29sdmVXaXRoKCByZXNvbHZlQ29udGV4dHMsIHJlc29sdmVWYWx1ZXMgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9O1xuXG5cdFx0Ly8gU2luZ2xlLSBhbmQgZW1wdHkgYXJndW1lbnRzIGFyZSBhZG9wdGVkIGxpa2UgUHJvbWlzZS5yZXNvbHZlXG5cdFx0aWYgKCByZW1haW5pbmcgPD0gMSApIHtcblx0XHRcdGFkb3B0VmFsdWUoIHNpbmdsZVZhbHVlLCBtYXN0ZXIuZG9uZSggdXBkYXRlRnVuYyggaSApICkucmVzb2x2ZSwgbWFzdGVyLnJlamVjdCApO1xuXG5cdFx0XHQvLyBVc2UgLnRoZW4oKSB0byB1bndyYXAgc2Vjb25kYXJ5IHRoZW5hYmxlcyAoY2YuIGdoLTMwMDApXG5cdFx0XHRpZiAoIG1hc3Rlci5zdGF0ZSgpID09PSBcInBlbmRpbmdcIiB8fFxuXHRcdFx0XHRqUXVlcnkuaXNGdW5jdGlvbiggcmVzb2x2ZVZhbHVlc1sgaSBdICYmIHJlc29sdmVWYWx1ZXNbIGkgXS50aGVuICkgKSB7XG5cblx0XHRcdFx0cmV0dXJuIG1hc3Rlci50aGVuKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gTXVsdGlwbGUgYXJndW1lbnRzIGFyZSBhZ2dyZWdhdGVkIGxpa2UgUHJvbWlzZS5hbGwgYXJyYXkgZWxlbWVudHNcblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdGFkb3B0VmFsdWUoIHJlc29sdmVWYWx1ZXNbIGkgXSwgdXBkYXRlRnVuYyggaSApLCBtYXN0ZXIucmVqZWN0ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1hc3Rlci5wcm9taXNlKCk7XG5cdH1cbn0gKTtcblxucmV0dXJuIGpRdWVyeTtcbn0gKTtcbiJdfQ==