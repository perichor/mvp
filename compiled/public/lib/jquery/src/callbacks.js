"use strict";

define(["./core", "./var/rnothtmlwhite"], function (jQuery, rnothtmlwhite) {

	"use strict";

	// Convert String-formatted options into Object-formatted ones

	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}

	/*
  * Create a callback list using the following parameters:
  *
  *	options: an optional list of space-separated options that will change how
  *			the callback list behaves or a more traditional option object
  *
  * By default a callback list will act like an event callback list and can be
  * "fired" multiple times.
  *
  * Possible options:
  *
  *	once:			will ensure the callback list can only be fired once (like a Deferred)
  *
  *	memory:			will keep track of previous values and will call any callback added
  *					after the list has been fired right away with the latest "memorized"
  *					values (like a Deferred)
  *
  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
  *
  *	stopOnFalse:	interrupt callings when a callback returns false
  *
  */
	jQuery.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

		var // Flag to know if list is currently firing
		firing,


		// Last fire value for non-forgettable lists
		memory,


		// Flag to know if list was already fired
		_fired,


		// Flag to prevent firing
		_locked,


		// Actual callback list
		list = [],


		// Queue of execution data for repeatable lists
		queue = [],


		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,


		// Fire callbacks
		fire = function fire() {

			// Enforce single-firing
			_locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			_fired = firing = true;
			for (; queue.length; firingIndex = -1) {
				memory = queue.shift();
				while (++firingIndex < list.length) {

					// Run callback and check for early termination
					if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if (!options.memory) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if (_locked) {

				// Keep an empty list if we have data for future add calls
				if (memory) {
					list = [];

					// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},


		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function add() {
				if (list) {

					// If we have memory from a past run, we should fire after adding
					if (memory && !firing) {
						firingIndex = list.length - 1;
						queue.push(memory);
					}

					(function add(args) {
						jQuery.each(args, function (_, arg) {
							if (jQuery.isFunction(arg)) {
								if (!options.unique || !self.has(arg)) {
									list.push(arg);
								}
							} else if (arg && arg.length && jQuery.type(arg) !== "string") {

								// Inspect recursively
								add(arg);
							}
						});
					})(arguments);

					if (memory && !firing) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function remove() {
				jQuery.each(arguments, function (_, arg) {
					var index;
					while ((index = jQuery.inArray(arg, list, index)) > -1) {
						list.splice(index, 1);

						// Handle firing indexes
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function has(fn) {
				return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function empty() {
				if (list) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function disable() {
				_locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function disabled() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function lock() {
				_locked = queue = [];
				if (!memory && !firing) {
					list = memory = "";
				}
				return this;
			},
			locked: function locked() {
				return !!_locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function fireWith(context, args) {
				if (!_locked) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					queue.push(args);
					if (!firing) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function fire() {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function fired() {
				return !!_fired;
			}
		};

		return self;
	};

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9jYWxsYmFja3MuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwialF1ZXJ5Iiwicm5vdGh0bWx3aGl0ZSIsImNyZWF0ZU9wdGlvbnMiLCJvcHRpb25zIiwib2JqZWN0IiwiZWFjaCIsIm1hdGNoIiwiXyIsImZsYWciLCJDYWxsYmFja3MiLCJleHRlbmQiLCJmaXJpbmciLCJtZW1vcnkiLCJmaXJlZCIsImxvY2tlZCIsImxpc3QiLCJxdWV1ZSIsImZpcmluZ0luZGV4IiwiZmlyZSIsIm9uY2UiLCJsZW5ndGgiLCJzaGlmdCIsImFwcGx5Iiwic3RvcE9uRmFsc2UiLCJzZWxmIiwiYWRkIiwicHVzaCIsImFyZ3MiLCJhcmciLCJpc0Z1bmN0aW9uIiwidW5pcXVlIiwiaGFzIiwidHlwZSIsImFyZ3VtZW50cyIsInJlbW92ZSIsImluZGV4IiwiaW5BcnJheSIsInNwbGljZSIsImZuIiwiZW1wdHkiLCJkaXNhYmxlIiwiZGlzYWJsZWQiLCJsb2NrIiwiZmlyZVdpdGgiLCJjb250ZXh0Iiwic2xpY2UiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQVEsQ0FDUCxRQURPLEVBRVAscUJBRk8sQ0FBUixFQUdHLFVBQVVDLE1BQVYsRUFBa0JDLGFBQWxCLEVBQWtDOztBQUVyQzs7QUFFQTs7QUFDQSxVQUFTQyxhQUFULENBQXdCQyxPQUF4QixFQUFrQztBQUNqQyxNQUFJQyxTQUFTLEVBQWI7QUFDQUosU0FBT0ssSUFBUCxDQUFhRixRQUFRRyxLQUFSLENBQWVMLGFBQWYsS0FBa0MsRUFBL0MsRUFBbUQsVUFBVU0sQ0FBVixFQUFhQyxJQUFiLEVBQW9CO0FBQ3RFSixVQUFRSSxJQUFSLElBQWlCLElBQWpCO0FBQ0EsR0FGRDtBQUdBLFNBQU9KLE1BQVA7QUFDQTs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQUosUUFBT1MsU0FBUCxHQUFtQixVQUFVTixPQUFWLEVBQW9COztBQUV0QztBQUNBO0FBQ0FB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TixDQUFZQyxJQUFaO0FBQ0EsU0FBSyxDQUFDaEIsTUFBTixFQUFlO0FBQ2RPO0FBQ0E7QUFDRDtBQUNELFdBQU8sSUFBUDtBQUNBLElBdEdLOztBQXdHTjtBQUNBQSxTQUFNLGdCQUFXO0FBQ2hCTSxTQUFLbUIsUUFBTCxDQUFlLElBQWYsRUFBcUJWLFNBQXJCO0FBQ0EsV0FBTyxJQUFQO0FBQ0EsSUE1R0s7O0FBOEdOO0FBQ0FwQixVQUFPLGlCQUFXO0FBQ2pCLFdBQU8sQ0FBQyxDQUFDQSxNQUFUO0FBQ0E7QUFqSEssR0FuRVI7O0FBdUxBLFNBQU9XLElBQVA7QUFDQSxFQWhNRDs7QUFrTUEsUUFBT3hCLE1BQVA7QUFDQyxDQXpPRCIsImZpbGUiOiJjYWxsYmFja3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoIFtcblx0XCIuL2NvcmVcIixcblx0XCIuL3Zhci9ybm90aHRtbHdoaXRlXCJcbl0sIGZ1bmN0aW9uKCBqUXVlcnksIHJub3RodG1sd2hpdGUgKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBDb252ZXJ0IFN0cmluZy1mb3JtYXR0ZWQgb3B0aW9ucyBpbnRvIE9iamVjdC1mb3JtYXR0ZWQgb25lc1xuZnVuY3Rpb24gY3JlYXRlT3B0aW9ucyggb3B0aW9ucyApIHtcblx0dmFyIG9iamVjdCA9IHt9O1xuXHRqUXVlcnkuZWFjaCggb3B0aW9ucy5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdLCBmdW5jdGlvbiggXywgZmxhZyApIHtcblx0XHRvYmplY3RbIGZsYWcgXSA9IHRydWU7XG5cdH0gKTtcblx0cmV0dXJuIG9iamVjdDtcbn1cblxuLypcbiAqIENyZWF0ZSBhIGNhbGxiYWNrIGxpc3QgdXNpbmcgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICpcbiAqXHRvcHRpb25zOiBhbiBvcHRpb25hbCBsaXN0IG9mIHNwYWNlLXNlcGFyYXRlZCBvcHRpb25zIHRoYXQgd2lsbCBjaGFuZ2UgaG93XG4gKlx0XHRcdHRoZSBjYWxsYmFjayBsaXN0IGJlaGF2ZXMgb3IgYSBtb3JlIHRyYWRpdGlvbmFsIG9wdGlvbiBvYmplY3RcbiAqXG4gKiBCeSBkZWZhdWx0IGEgY2FsbGJhY2sgbGlzdCB3aWxsIGFjdCBsaWtlIGFuIGV2ZW50IGNhbGxiYWNrIGxpc3QgYW5kIGNhbiBiZVxuICogXCJmaXJlZFwiIG11bHRpcGxlIHRpbWVzLlxuICpcbiAqIFBvc3NpYmxlIG9wdGlvbnM6XG4gKlxuICpcdG9uY2U6XHRcdFx0d2lsbCBlbnN1cmUgdGhlIGNhbGxiYWNrIGxpc3QgY2FuIG9ubHkgYmUgZmlyZWQgb25jZSAobGlrZSBhIERlZmVycmVkKVxuICpcbiAqXHRtZW1vcnk6XHRcdFx0d2lsbCBrZWVwIHRyYWNrIG9mIHByZXZpb3VzIHZhbHVlcyBhbmQgd2lsbCBjYWxsIGFueSBjYWxsYmFjayBhZGRlZFxuICpcdFx0XHRcdFx0YWZ0ZXIgdGhlIGxpc3QgaGFzIGJlZW4gZmlyZWQgcmlnaHQgYXdheSB3aXRoIHRoZSBsYXRlc3QgXCJtZW1vcml6ZWRcIlxuICpcdFx0XHRcdFx0dmFsdWVzIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdHVuaXF1ZTpcdFx0XHR3aWxsIGVuc3VyZSBhIGNhbGxiYWNrIGNhbiBvbmx5IGJlIGFkZGVkIG9uY2UgKG5vIGR1cGxpY2F0ZSBpbiB0aGUgbGlzdClcbiAqXG4gKlx0c3RvcE9uRmFsc2U6XHRpbnRlcnJ1cHQgY2FsbGluZ3Mgd2hlbiBhIGNhbGxiYWNrIHJldHVybnMgZmFsc2VcbiAqXG4gKi9cbmpRdWVyeS5DYWxsYmFja3MgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcblxuXHQvLyBDb252ZXJ0IG9wdGlvbnMgZnJvbSBTdHJpbmctZm9ybWF0dGVkIHRvIE9iamVjdC1mb3JtYXR0ZWQgaWYgbmVlZGVkXG5cdC8vICh3ZSBjaGVjayBpbiBjYWNoZSBmaXJzdClcblx0b3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiID9cblx0XHRjcmVhdGVPcHRpb25zKCBvcHRpb25zICkgOlxuXHRcdGpRdWVyeS5leHRlbmQoIHt9LCBvcHRpb25zICk7XG5cblx0dmFyIC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IGlzIGN1cnJlbnRseSBmaXJpbmdcblx0XHRmaXJpbmcsXG5cblx0XHQvLyBMYXN0IGZpcmUgdmFsdWUgZm9yIG5vbi1mb3JnZXR0YWJsZSBsaXN0c1xuXHRcdG1lbW9yeSxcblxuXHRcdC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IHdhcyBhbHJlYWR5IGZpcmVkXG5cdFx0ZmlyZWQsXG5cblx0XHQvLyBGbGFnIHRvIHByZXZlbnQgZmlyaW5nXG5cdFx0bG9ja2VkLFxuXG5cdFx0Ly8gQWN0dWFsIGNhbGxiYWNrIGxpc3Rcblx0XHRsaXN0ID0gW10sXG5cblx0XHQvLyBRdWV1ZSBvZiBleGVjdXRpb24gZGF0YSBmb3IgcmVwZWF0YWJsZSBsaXN0c1xuXHRcdHF1ZXVlID0gW10sXG5cblx0XHQvLyBJbmRleCBvZiBjdXJyZW50bHkgZmlyaW5nIGNhbGxiYWNrIChtb2RpZmllZCBieSBhZGQvcmVtb3ZlIGFzIG5lZWRlZClcblx0XHRmaXJpbmdJbmRleCA9IC0xLFxuXG5cdFx0Ly8gRmlyZSBjYWxsYmFja3Ncblx0XHRmaXJlID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIEVuZm9yY2Ugc2luZ2xlLWZpcmluZ1xuXHRcdFx0bG9ja2VkID0gb3B0aW9ucy5vbmNlO1xuXG5cdFx0XHQvLyBFeGVjdXRlIGNhbGxiYWNrcyBmb3IgYWxsIHBlbmRpbmcgZXhlY3V0aW9ucyxcblx0XHRcdC8vIHJlc3BlY3RpbmcgZmlyaW5nSW5kZXggb3ZlcnJpZGVzIGFuZCBydW50aW1lIGNoYW5nZXNcblx0XHRcdGZpcmVkID0gZmlyaW5nID0gdHJ1ZTtcblx0XHRcdGZvciAoIDsgcXVldWUubGVuZ3RoOyBmaXJpbmdJbmRleCA9IC0xICkge1xuXHRcdFx0XHRtZW1vcnkgPSBxdWV1ZS5zaGlmdCgpO1xuXHRcdFx0XHR3aGlsZSAoICsrZmlyaW5nSW5kZXggPCBsaXN0Lmxlbmd0aCApIHtcblxuXHRcdFx0XHRcdC8vIFJ1biBjYWxsYmFjayBhbmQgY2hlY2sgZm9yIGVhcmx5IHRlcm1pbmF0aW9uXG5cdFx0XHRcdFx0aWYgKCBsaXN0WyBmaXJpbmdJbmRleCBdLmFwcGx5KCBtZW1vcnlbIDAgXSwgbWVtb3J5WyAxIF0gKSA9PT0gZmFsc2UgJiZcblx0XHRcdFx0XHRcdG9wdGlvbnMuc3RvcE9uRmFsc2UgKSB7XG5cblx0XHRcdFx0XHRcdC8vIEp1bXAgdG8gZW5kIGFuZCBmb3JnZXQgdGhlIGRhdGEgc28gLmFkZCBkb2Vzbid0IHJlLWZpcmVcblx0XHRcdFx0XHRcdGZpcmluZ0luZGV4ID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0XHRtZW1vcnkgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gRm9yZ2V0IHRoZSBkYXRhIGlmIHdlJ3JlIGRvbmUgd2l0aCBpdFxuXHRcdFx0aWYgKCAhb3B0aW9ucy5tZW1vcnkgKSB7XG5cdFx0XHRcdG1lbW9yeSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRmaXJpbmcgPSBmYWxzZTtcblxuXHRcdFx0Ly8gQ2xlYW4gdXAgaWYgd2UncmUgZG9uZSBmaXJpbmcgZm9yIGdvb2Rcblx0XHRcdGlmICggbG9ja2VkICkge1xuXG5cdFx0XHRcdC8vIEtlZXAgYW4gZW1wdHkgbGlzdCBpZiB3ZSBoYXZlIGRhdGEgZm9yIGZ1dHVyZSBhZGQgY2FsbHNcblx0XHRcdFx0aWYgKCBtZW1vcnkgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IFtdO1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSwgdGhpcyBvYmplY3QgaXMgc3BlbnRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsaXN0ID0gXCJcIjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBBY3R1YWwgQ2FsbGJhY2tzIG9iamVjdFxuXHRcdHNlbGYgPSB7XG5cblx0XHRcdC8vIEFkZCBhIGNhbGxiYWNrIG9yIGEgY29sbGVjdGlvbiBvZiBjYWxsYmFja3MgdG8gdGhlIGxpc3Rcblx0XHRcdGFkZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggbGlzdCApIHtcblxuXHRcdFx0XHRcdC8vIElmIHdlIGhhdmUgbWVtb3J5IGZyb20gYSBwYXN0IHJ1biwgd2Ugc2hvdWxkIGZpcmUgYWZ0ZXIgYWRkaW5nXG5cdFx0XHRcdFx0aWYgKCBtZW1vcnkgJiYgIWZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmluZ0luZGV4ID0gbGlzdC5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0cXVldWUucHVzaCggbWVtb3J5ICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0KCBmdW5jdGlvbiBhZGQoIGFyZ3MgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZWFjaCggYXJncywgZnVuY3Rpb24oIF8sIGFyZyApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggYXJnICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCAhb3B0aW9ucy51bmlxdWUgfHwgIXNlbGYuaGFzKCBhcmcgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBhcmcgJiYgYXJnLmxlbmd0aCAmJiBqUXVlcnkudHlwZSggYXJnICkgIT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBJbnNwZWN0IHJlY3Vyc2l2ZWx5XG5cdFx0XHRcdFx0XHRcdFx0YWRkKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdH0gKSggYXJndW1lbnRzICk7XG5cblx0XHRcdFx0XHRpZiAoIG1lbW9yeSAmJiAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIFJlbW92ZSBhIGNhbGxiYWNrIGZyb20gdGhlIGxpc3Rcblx0XHRcdHJlbW92ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGpRdWVyeS5lYWNoKCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG5cdFx0XHRcdFx0dmFyIGluZGV4O1xuXHRcdFx0XHRcdHdoaWxlICggKCBpbmRleCA9IGpRdWVyeS5pbkFycmF5KCBhcmcsIGxpc3QsIGluZGV4ICkgKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0bGlzdC5zcGxpY2UoIGluZGV4LCAxICk7XG5cblx0XHRcdFx0XHRcdC8vIEhhbmRsZSBmaXJpbmcgaW5kZXhlc1xuXHRcdFx0XHRcdFx0aWYgKCBpbmRleCA8PSBmaXJpbmdJbmRleCApIHtcblx0XHRcdFx0XHRcdFx0ZmlyaW5nSW5kZXgtLTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDaGVjayBpZiBhIGdpdmVuIGNhbGxiYWNrIGlzIGluIHRoZSBsaXN0LlxuXHRcdFx0Ly8gSWYgbm8gYXJndW1lbnQgaXMgZ2l2ZW4sIHJldHVybiB3aGV0aGVyIG9yIG5vdCBsaXN0IGhhcyBjYWxsYmFja3MgYXR0YWNoZWQuXG5cdFx0XHRoYXM6IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRcdFx0cmV0dXJuIGZuID9cblx0XHRcdFx0XHRqUXVlcnkuaW5BcnJheSggZm4sIGxpc3QgKSA+IC0xIDpcblx0XHRcdFx0XHRsaXN0Lmxlbmd0aCA+IDA7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBSZW1vdmUgYWxsIGNhbGxiYWNrcyBmcm9tIHRoZSBsaXN0XG5cdFx0XHRlbXB0eTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggbGlzdCApIHtcblx0XHRcdFx0XHRsaXN0ID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBEaXNhYmxlIC5maXJlIGFuZCAuYWRkXG5cdFx0XHQvLyBBYm9ydCBhbnkgY3VycmVudC9wZW5kaW5nIGV4ZWN1dGlvbnNcblx0XHRcdC8vIENsZWFyIGFsbCBjYWxsYmFja3MgYW5kIHZhbHVlc1xuXHRcdFx0ZGlzYWJsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxvY2tlZCA9IHF1ZXVlID0gW107XG5cdFx0XHRcdGxpc3QgPSBtZW1vcnkgPSBcIlwiO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHRkaXNhYmxlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhbGlzdDtcblx0XHRcdH0sXG5cblx0XHRcdC8vIERpc2FibGUgLmZpcmVcblx0XHRcdC8vIEFsc28gZGlzYWJsZSAuYWRkIHVubGVzcyB3ZSBoYXZlIG1lbW9yeSAoc2luY2UgaXQgd291bGQgaGF2ZSBubyBlZmZlY3QpXG5cdFx0XHQvLyBBYm9ydCBhbnkgcGVuZGluZyBleGVjdXRpb25zXG5cdFx0XHRsb2NrOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0bG9ja2VkID0gcXVldWUgPSBbXTtcblx0XHRcdFx0aWYgKCAhbWVtb3J5ICYmICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IG1lbW9yeSA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0bG9ja2VkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICEhbG9ja2VkO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2FsbCBhbGwgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGNvbnRleHQgYW5kIGFyZ3VtZW50c1xuXHRcdFx0ZmlyZVdpdGg6IGZ1bmN0aW9uKCBjb250ZXh0LCBhcmdzICkge1xuXHRcdFx0XHRpZiAoICFsb2NrZWQgKSB7XG5cdFx0XHRcdFx0YXJncyA9IGFyZ3MgfHwgW107XG5cdFx0XHRcdFx0YXJncyA9IFsgY29udGV4dCwgYXJncy5zbGljZSA/IGFyZ3Muc2xpY2UoKSA6IGFyZ3MgXTtcblx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBhcmdzICk7XG5cdFx0XHRcdFx0aWYgKCAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIENhbGwgYWxsIHRoZSBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzXG5cdFx0XHRmaXJlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5maXJlV2l0aCggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gVG8ga25vdyBpZiB0aGUgY2FsbGJhY2tzIGhhdmUgYWxyZWFkeSBiZWVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlXG5cdFx0XHRmaXJlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhIWZpcmVkO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0cmV0dXJuIHNlbGY7XG59O1xuXG5yZXR1cm4galF1ZXJ5O1xufSApO1xuIl19